# -*- coding: utf-8 -*-
import os, sys, json, datetime
sys.path.insert(0, os.path.dirname(__file__))
from data import *
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter
from openpyxl.worksheet.table import Table, TableStyleInfo
from openpyxl.formatting.rule import CellIsRule, ColorScaleRule
from pptx import Presentation
from pptx.enum.shapes import MSO_SHAPE_TYPE
from PIL import Image

SRC = "D:/MavionTech_sales"
OUT = "D:/MavionTech_sales_MavionTech_Transformation/01_Audit_Reports"
NAVY = "0A1F44"; AMBER = "F5A623"
HFONT = Font(bold=True, color="FFFFFF", name="Calibri", size=11)
HFILL = PatternFill("solid", fgColor=NAVY)
WRAP = Alignment(wrap_text=True, vertical="top")
thin = Side(style="thin", color="D0D5DD"); BORDER = Border(left=thin, right=thin, top=thin, bottom=thin)
TODAY = "2026-11-10"

def title_block(ws, title, subtitle, ncols):
    ws["A1"] = title; ws["A1"].font = Font(bold=True, size=16, color=NAVY)
    ws["A2"] = subtitle; ws["A2"].font = Font(italic=True, size=10, color="667085")
    ws.row_dimensions[1].height = 24

def table(ws, headers, rows, widths, start_row=4, name=None, wrap_cols=None):
    for c, h in enumerate(headers, 1):
        cell = ws.cell(row=start_row, column=c, value=h); cell.font = HFONT; cell.fill = HFILL
        cell.alignment = Alignment(wrap_text=True, vertical="center"); cell.border = BORDER
    for r, row in enumerate(rows, start_row + 1):
        for c, v in enumerate(row, 1):
            cell = ws.cell(row=r, column=c, value=v); cell.alignment = WRAP; cell.border = BORDER
            cell.font = Font(name="Calibri", size=10)
    for i, w in enumerate(widths, 1):
        ws.column_dimensions[get_column_letter(i)].width = w
    ws.freeze_panes = ws.cell(row=start_row + 1, column=2)
    end = f"{get_column_letter(len(headers))}{start_row + len(rows)}"
    if name and rows:
        t = Table(displayName=name, ref=f"A{start_row}:{end}")
        t.tableStyleInfo = TableStyleInfo(name="TableStyleLight9", showRowStripes=True)
        ws.add_table(t)
    ws.row_dimensions[start_row].height = 32
    return start_row + len(rows)

def sev_format(ws, col, first, last):
    rng = f"{col}{first}:{col}{last}"
    for val, color in (("Critical", "F8B4B4"), ("High", "FDD9A8"), ("Medium", "FEF0C7"), ("DO NOT USE", "F8B4B4"), ("CLAIMS RISK", "F8B4B4"), ("Weak", "FDD9A8")):
        ws.conditional_formatting.add(rng, CellIsRule(operator="equal", formula=[f'"{val}"'], fill=PatternFill("solid", fgColor=color)))

# ---------- gather deck facts ----------
def walk(shapes):
    for s in shapes:
        if s.shape_type == MSO_SHAPE_TYPE.GROUP: yield from walk(s.shapes)
        else: yield s
DECK_FILES = [d[0] for d in DECKS]
deckfacts = {}; slide_rows = []
for d in DECK_FILES:
    p = Presentation(os.path.join(SRC, d)); prod = [x[1] for x in DECKS if x[0] == d][0]
    cp = p.core_properties
    nn = 0; pics_total = 0
    for i, sl in enumerate(p.slides, 1):
        texts = []; pics = 0
        for s in walk(sl.shapes):
            if s.shape_type == MSO_SHAPE_TYPE.PICTURE: pics += 1
            if s.has_text_frame:
                t = " ".join(par.text.strip() for par in s.text_frame.paragraphs if par.text.strip())
                if t: texts.append(t)
        notes = sl.has_notes_slide and bool(sl.notes_slide.notes_text_frame.text.strip())
        nn += notes; pics_total += pics
        # heuristic: kicker = first ALL-CAPS short text, title = next text
        boiler = {"VORTEX", "·  YOUR WORKFORCE, IN MOTION", "BY MAVIONTECH", "MavionLearn", "Enterprise Software Solutions"}
        texts = [t for t in texts if t not in boiler and not t.endswith("/ 25")]
        kicker = next((t for t in texts if t.isupper() and len(t) < 70), "")
        cand = [t for t in texts if t != kicker and not t.isdigit() and len(t) > 3 and "MAVIONTECH PRODUCT" not in t and not t.startswith("VORTEX") and "/ 25" not in t]
        title = cand[0] if cand else "(no text - image only)"
        iss = SLIDE_ISSUES.get((d, i))
        slide_rows.append([prod, d, i, kicker[:60], title[:140], pics, "Yes" if notes else "No",
                           len(" ".join(texts)), iss[0] if iss else "", iss[1] if iss else "", iss[2] if iss else ""])
    deckfacts[d] = dict(slides=len(p.slides), notes=nn, pics=pics_total, author=cp.author or "", created=str(cp.created or ""),
                        modified=str(cp.modified or ""), lastby=cp.last_modified_by or "", size=round(os.path.getsize(os.path.join(SRC, d)) / 1048576, 2))

# ---------- source file register ----------
def classify(rel):
    r = rel.replace("\\", "/")
    if r.startswith("Agastya_screenshots/"): return ("Agastya", "Product screenshot (PNG)")
    if r.startswith("screenshots/"): return ("PragyanNxt", "Product screenshot (JPG)")
    if r.startswith("deck-source/"): return ("PragyanNxt", "Deck HTML source (references hosted assets; 'Evalynx' naming inside)")
    if r.startswith("branding/maviontech"): return ("Company", "Company logo")
    if r.startswith("branding/pragyannxt"): return ("PragyanNxt", "Product logo / mark")
    m = {"Agastya_Enterprise_Sales_Deck.pptx": ("Agastya", "Sales deck"), "MavionLearn_Sales_Deck.pptx": ("MavionLearn", "Sales deck"),
         "MavionLearn_Sales_Investor_Deck.pptx": ("MavionLearn", "Investor deck"), "PragyanNxt_Enterprise_Sales_Deck.pptx": ("PragyanNxt", "Sales deck"),
         "Protonnxt_Sales_Demo_Revised.pptx": ("Protonnxt", "Sales / demo deck"), "SalesPulse_CRM_Sales_Deck.pptx": ("SalesPulse CRM", "Sales deck"),
         "vortex-sales-light.pptx": ("Vortex", "Sales deck"), "MavionTech Pvt Ltd_Introduction.pdf": ("Company", "Company introduction (38-page PDF export of a PptxGenJS deck)"),
         "MavionTech_Sales_Deck_Prompt.md": ("Company / process", "Markdown: reusable Claude prompt to generate a product sales deck from a code repo"),
         "README_PragyanNxt_Deck.md": ("PragyanNxt", "Markdown README describing PragyanNxt deck, artifact link, slide order, caveats")}
    return m.get(r, ("Unclassified", "Other"))
files = []
for root, _, fs in os.walk(SRC):
    for f in fs:
        full = os.path.join(root, f); rel = os.path.relpath(full, SRC).replace("\\", "/")
        prod, role = classify(rel); ext = os.path.splitext(f)[1].lower()
        dims = ""
        if ext in (".png", ".jpg", ".jpeg"):
            try: w, h = Image.open(full).size; dims = f"{w}x{h}"
            except Exception: pass
        files.append([rel, os.path.dirname(rel) or "(root)", ext or "(none)", round(os.path.getsize(full) / 1024, 1), dims, prod, role])
files.sort(key=lambda x: x[0].lower())

# =============== 1. Master_Product_Inventory.xlsx ===============
wb = Workbook(); ws = wb.active; ws.title = "Product Inventory"
title_block(ws, "MavionTech - Master Product Inventory", f"Source audit of D:\\MavionTech_sales · generated {TODAY} · read-only audit, no source files modified", 1)
hdr = ["#", "Product", "Category", "One-line purpose", "Source deck(s)", "Slides", "Speaker notes", "Embedded images", "Screenshot folder", "Folder screenshots",
       "Product logo file", "Listed in company PDF?", "Name variants found", "Deck metadata (author / modified)", "Maturity signals", "Primary target buyers", "Audit status"]
rows = []
shots = {"Agastya": ("Agastya_screenshots/", 79), "PragyanNxt": ("screenshots/", 11)}
for i, prod in enumerate(PRODUCTS, 1):
    dks = [d for d in DECKS if d[1] == prod]
    pr = P[prod]
    rows.append([i, prod, pr["Product category"], pr["Product purpose"],
                 "\n".join(d[0] for d in dks), "\n".join(str(deckfacts[d[0]]["slides"]) for d in dks),
                 "\n".join(f'{deckfacts[d[0]]["notes"]}/{deckfacts[d[0]]["slides"]}' for d in dks),
                 "\n".join(str(deckfacts[d[0]]["pics"]) for d in dks),
                 shots.get(prod, ("None", 0))[0], shots.get(prod, ("", 0))[1],
                 "Yes (branding/)" if prod == "PragyanNxt" else "No (only inside deck/app)",
                 {"Protonnxt": "Yes - 'ProtonNxt' (02/12)", "PragyanNxt": "As 'Evalynx' (11/12) - to confirm", "Vortex": "No - possibly 'HRMS' (01/12)?"}.get(prod, "No"),
                 {"Agastya": "Agastya; Agastya Cloud School ERP; Agastya System", "MavionLearn": "MavionLearn; 'Aurora' brand identity",
                  "PragyanNxt": "PragyanNxt; PRAGYAN NXT; Evalynx", "Protonnxt": "ProtonNxt; Protonnxt; PROTONNXT",
                  "SalesPulse CRM": "SalesPulse CRM; SalesPulse", "Vortex": "Vortex; VortexGo (app)"}[prod],
                 "\n".join(f'{deckfacts[d[0]]["author"] or "(blank)"} / {deckfacts[d[0]]["modified"][:10]}' for d in dks),
                 pr["Product maturity signals"], pr["Target customer segments"], "Audited - awaiting clarifications"])
end = table(ws, hdr, rows, [4, 16, 28, 40, 34, 8, 10, 10, 18, 10, 18, 22, 26, 26, 44, 44, 18], name="ProductInventory")

ws2 = wb.create_sheet("Deck Register")
title_block(ws2, "Source Presentation Register", "One row per source presentation", 1)
hdr = ["Deck file", "Product", "Audience", "Slides", "Slides with notes", "Pictures placed", "File size (MB)", "Core-props author", "Created", "Modified", "Last modified by", "Overall verdict"]
rows = []
for d, prod, sc, verdict in DECKS:
    f = deckfacts[d]
    rows.append([d, prod, "Investors" if "Investor" in d else "Customers / prospects", f["slides"], f["notes"], f["pics"], f["size"], f["author"] or "(blank)",
                 f["created"][:19], f["modified"][:19], f["lastby"] or "(blank)", verdict])
table(ws2, hdr, rows, [40, 16, 20, 8, 10, 10, 10, 26, 20, 20, 22, 60], name="DeckRegister")

ws3 = wb.create_sheet("Source File Register")
title_block(ws3, "Complete Source File Register", f"Recursive listing of D:\\MavionTech_sales - {len(files)} files in 5 folders + root", 1)
table(ws3, ["Relative path", "Folder", "Type", "Size (KB)", "Pixels", "Product", "Role / content"], files, [46, 22, 8, 10, 12, 16, 60], name="FileRegister")

ws4 = wb.create_sheet("Additional Products Found")
title_block(ws4, "Products & Names Beyond the Six-Product Scope", "Discovered in company PDF, deck-source and decks - not modified, for clarification", 1)
table(ws4, ["Name", "Where found", "Category", "Relation to current scope", "Notes / question"], ADDITIONAL, [26, 40, 30, 30, 60], name="Additional")

ws5 = wb.create_sheet("Portfolio Reconciliation")
title_block(ws5, "Company PDF Portfolio vs Decks Provided", "The company PDF presents 12 products; the deck set covers 6 - only 2 overlap", 1)
recon = [
 ("HRMS", "Yes (01)", "No deck", "Possibly superseded by / overlapping Vortex"),
 ("ProtonNxt", "Yes (02)", "Protonnxt_Sales_Demo_Revised.pptx", "Overlap"),
 ("Project Management Planning", "Yes (03)", "No deck", ""),
 ("Signet", "Yes (04)", "No deck", "Overlaps Vortex HR Document Generation"),
 ("Visitor Management", "Yes (05)", "No deck", "Agastya has visitor log"),
 ("Serene", "Yes (06)", "No deck", "Overlaps ProtonNxt AI parsing"),
 ("Trackline", "Yes (07)", "No deck", "Category label inconsistent"),
 ("Inward Logistics", "Yes (08)", "No deck", ""),
 ("Vanguard", "Yes (09)", "No deck", ""),
 ("C2H Resource Management", "Yes (10)", "No deck", ""),
 ("Evalynx", "Yes (11)", "PragyanNxt_Enterprise_Sales_Deck.pptx (assumed same product)", "Confirm rebrand"),
 ("Club & Entertainment", "Yes (12)", "No deck", "PDF calls it a demonstration platform"),
 ("Agastya", "No", "Agastya_Enterprise_Sales_Deck.pptx", "Missing from company PDF"),
 ("MavionLearn", "No", "MavionLearn_Sales_Deck.pptx; MavionLearn_Sales_Investor_Deck.pptx", "Missing from company PDF"),
 ("SalesPulse CRM", "No", "SalesPulse_CRM_Sales_Deck.pptx", "Missing from company PDF"),
 ("Vortex", "No", "vortex-sales-light.pptx", "Missing from company PDF"),
]
table(ws5, ["Product", "In company PDF (position)", "Deck in source folder", "Note"], recon, [30, 22, 56, 46], name="Recon")
wb.save(os.path.join(OUT, "Master_Product_Inventory.xlsx"))

# =============== 2. Product_Content_Audit.xlsx ===============
wb = Workbook(); ws = wb.active; ws.title = "Product Profiles"
title_block(ws, "Product Content Audit - Product Profiles", "Field-by-field profile per product. 'Stated' = as asserted in source materials; technology not verified against code.", 1)
rows = [[f] + [P[p][f] for p in PRODUCTS] for f in PROFILE_FIELDS]
table(ws, ["Field"] + PRODUCTS, rows, [26] + [52] * 6, name="Profiles")
for r in range(5, 5 + len(rows)): ws.cell(row=r, column=1).font = Font(bold=True, size=10, color=NAVY)

ws = wb.create_sheet("Deck Scorecard")
title_block(ws, "Presentation Quality Scorecard (1 = poor, 5 = excellent)", "Auditor's assessment of current decks against enterprise sales-deck standards", 1)
rows = [[d, prod] + sc + [round(sum(sc) / len(sc), 1), verdict] for d, prod, sc, verdict in DECKS]
last = table(ws, ["Deck", "Product"] + SCORE_CRITERIA + ["Average", "Summary"], rows, [36, 14] + [13] * len(SCORE_CRITERIA) + [9, 60], name="Scorecard")
ws.conditional_formatting.add(f"C5:{get_column_letter(2 + len(SCORE_CRITERIA) + 1)}{last}",
    ColorScaleRule(start_type="num", start_value=1, start_color="F8B4B4", mid_type="num", mid_value=3, mid_color="FEF0C7", end_type="num", end_value=5, end_color="B7EBC6"))

ws = wb.create_sheet("Slide Inventory")
title_block(ws, "Slide-by-Slide Inventory of All Source Decks", f"{len(slide_rows)} slides. Kicker/title extracted automatically; issues annotated by auditor.", 1)
last = table(ws, ["Product", "Deck", "Slide", "Kicker", "Title / headline", "Pictures", "Notes?", "Text chars", "Issue found", "Recommendation", "Severity"],
             slide_rows, [14, 30, 6, 26, 56, 8, 7, 8, 56, 40, 10], name="SlideInventory")
sev_format(ws, "K", 5, last)

ws = wb.create_sheet("Claims Register")
title_block(ws, "Claims Requiring Verification", "Statistics, SLAs, certifications and customer claims found in source materials. Do not reuse until verified.", 1)
last = table(ws, ["Source", "Location", "Claim", "Type", "Risk", "Recommended action"], CLAIMS, [24, 16, 70, 18, 10, 30], name="Claims")
sev_format(ws, "E", 5, last)

ws = wb.create_sheet("Cross-Deck Issues")
title_block(ws, "Portfolio-Level Presentation Weaknesses", "Issues that recur across decks and should be solved once in the redesign system", 1)
cross = [
 ("Brand architecture", "Each deck uses a different palette, typeface and footer; MavionTech logo appears in Agastya, PragyanNxt, Protonnxt, Vortex but not MavionLearn or SalesPulse.", "Define a master MavionTech system (amber F5A623 endorsement) with per-product accent colours.", "High"),
 ("Entity & contact data", "4 legal-name variants, 6+ domains, 3 sales emails, placeholder phone.", "Single confirmed contact block used on every close slide.", "Critical"),
 ("Unverified claims", "Company PDF and Vortex carry certifications, SLAs and ROI figures without evidence; Agastya landing page shows client claims.", "Claims policy: only code-, data- or document-verified numbers.", "Critical"),
 ("Screenshot quality", "MavionLearn, SalesPulse, PragyanNxt screenshots are 800px wide; Vortex has none; several empty states and demo labels.", "Recapture at >=1600px with populated, realistic data.", "High"),
 ("Data privacy in visuals", "Protonnxt slides 8 and 36 show possibly real client names and a real person's contact details; Agastya error page exposes local paths.", "Redaction/demo-data rule for all visuals.", "Critical"),
 ("Speaker notes", "MavionLearn sales, Protonnxt and Vortex have none; SalesPulse partial.", "Talk track on every slide.", "Medium"),
 ("Deck length & structure", "16-42 slides; no consistent storyline or executive cut.", "Common storyline + 12-15 slide executive versions.", "Medium"),
 ("File hygiene", "Template metadata (author 'Steve Canny', 2013 dates); Protonnxt 20.6 MB.", "Set document properties; compress images.", "Low"),
 ("Pricing", "Pricing present for MavionLearn, SalesPulse, Vortex, PragyanNxt (allowances); absent for Agastya, Protonnxt; inconsistencies exist.", "Confirmed price books or 'pricing on request' policy.", "High"),
 ("Portfolio overlap", "Vortex LMS/HR docs/recruitment overlap MavionLearn/Signet/ProtonNxt.", "Decide cross-sell messaging.", "Medium"),
]
last = table(ws, ["Theme", "Finding", "Recommendation", "Severity"], cross, [22, 70, 56, 10], name="CrossDeck")
sev_format(ws, "D", 5, last)
wb.save(os.path.join(OUT, "Product_Content_Audit.xlsx"))

# =============== 3. Product_Asset_Mapping.xlsx ===============
wb = Workbook(); ws = wb.active; ws.title = "Agastya Screenshots"
title_block(ws, "Agastya - Screenshot to Module Mapping", "79 screenshots. Prefix: a=School Admin, c=Accountant, g=Guardian/Parent, p=Public, r=Principal, s=Student, t=Teacher, x=Platform Admin. Deck slide = inferred from captions/topics.", 1)
dims = {r[0].split("/")[-1]: r[4] for r in files if r[0].startswith("Agastya_screenshots/")}
rows = [[f, dims.get(f, ""), per, mod, scr, q, n, sl] for f, per, mod, scr, q, n, sl in AG_SHOTS]
last = table(ws, ["File", "Pixels", "Persona", "Module", "Screen", "Quality", "Notes", "Likely deck slide (inferred)"], rows, [26, 11, 22, 26, 44, 13, 60, 14], name="AgastyaShots")
sev_format(ws, "F", 5, last)

ws = wb.create_sheet("Agastya Module Coverage")
title_block(ws, "Agastya - Module Coverage by Screenshots", "Count of usable (Good/Fair) vs weak screenshots per module", 1)
from collections import defaultdict
cov = defaultdict(lambda: [0, 0, 0, []])
for f, per, mod, scr, q, n, sl in AG_SHOTS:
    c = cov[mod]; c[0] += 1; c[3].append(f)
    if q in ("Good", "Fair"): c[1] += 1
    else: c[2] += 1
rows = [[m, c[0], c[1], c[2], ", ".join(c[3]), "Recapture needed" if c[1] < 2 else "Adequate"] for m, c in sorted(cov.items())]
table(ws, ["Module", "Screenshots", "Usable (Good/Fair)", "Weak / unusable", "Files", "Assessment"], rows, [30, 12, 14, 14, 80, 18], name="AgastyaCoverage")

ws = wb.create_sheet("PragyanNxt Screenshots")
title_block(ws, "PragyanNxt - Screenshot to Module Mapping", "11 screenshots in screenshots/ (all 800px wide). Deck slide from README / deck URL captions.", 1)
dims = {r[0].split("/")[-1]: r[4] for r in files if r[0].startswith("screenshots/")}
rows = [[f, dims.get(f, ""), per, mod, scr, q, n, sl] for f, per, mod, scr, q, n, sl in PN_SHOTS]
last = table(ws, ["File", "Pixels", "Persona", "Module", "Screen", "Quality", "Notes", "Deck slide"], rows, [30, 11, 18, 24, 44, 10, 46, 10], name="PragyanShots")
sev_format(ws, "F", 5, last)

ws = wb.create_sheet("Embedded Deck Assets")
title_block(ws, "Visual Assets Embedded in Each Deck", "From ppt/media inspection: screenshot-like images vs icons/logos", 1)
emb = [
 ("Agastya_Enterprise_Sales_Deck.pptx", 172, "~44 screenshot crops at 1700px wide (JPEG) + icons + gradient backgrounds", "High", "Re-use originals from Agastya_screenshots/ (2400px)"),
 ("MavionLearn_Sales_Deck.pptx", 26, "~11 screenshots at 800px + 2 hero renders 2400x1350 + icons", "Low", "No originals available - request full-res captures"),
 ("MavionLearn_Sales_Investor_Deck.pptx", 108, "~17 screenshots at 800px + 1 banner 1800x480; many icon PNGs", "Low", "No originals available"),
 ("PragyanNxt_Enterprise_Sales_Deck.pptx", 12, "8 screenshots at 800px + logos", "Low", "Originals in screenshots/ are also 800px"),
 ("Protonnxt_Sales_Demo_Revised.pptx", 30, "~26 screenshots up to 3360x1920 + 3 diagram images 1400x800", "High", "Extract originals from pptx for reuse; redact slides 8/36 data"),
 ("SalesPulse_CRM_Sales_Deck.pptx", 114, "27 screenshots at 800px + 87 icon PNGs (256px)", "Low", "Request full-res captures"),
 ("vortex-sales-light.pptx", 2, "Logo images only - NO product screenshots", "None", "Full capture required"),
]
table(ws, ["Deck", "Media files", "Content", "Screenshot resolution grade", "Reuse recommendation"], emb, [38, 10, 60, 16, 50], name="Embedded")

ws = wb.create_sheet("Branding Assets")
title_block(ws, "Branding Assets Inventory", "branding/ folder plus brand colours observed in decks", 1)
br = [
 ("branding/maviontech-logo.png", "359x362 RGBA (transparent)", "MavionTech circuit 'M' roundel, amber", "Dominant colour ~#F0A010 (consistent with #F5A623 named in deck prompt)", "Low resolution for large use; no vector/SVG; no wordmark-only or mono variants"),
 ("branding/pragyannxt-logo.png", "1254x1254 RGBA", "PragyanNxt full lockup with 'ASSESS | LEARN | PROGRESS'", "Navy/blue #001040-#003080 + gold", "Square only; no horizontal lockup"),
 ("branding/pragyannxt-mark.png", "1254x1254 RGBA", "PragyanNxt 'P' mark", "Blue + gold", "-"),
 ("(none)", "-", "Agastya logo", "Deck blue #2563EB, navy #0A1F44", "Request logo file"),
 ("(none)", "-", "MavionLearn logo", "Violet #5A4BF0, magenta #C04BF0, dark #241A46", "Request logo file"),
 ("(none)", "-", "ProtonNxt logo (atom)", "Teal #1BA6A6, navy #0F1D3A, blue #3B82F6", "Request logo file"),
 ("(none)", "-", "SalesPulse logo", "Indigo/violet + teal accents", "Request logo file"),
 ("(none)", "-", "Vortex 'V' logo", "Indigo #4338CA, gold #CA8A04", "Request logo file"),
]
table(ws, ["File", "Format", "Content", "Colours", "Gaps"], br, [32, 22, 40, 44, 50], name="Branding")

ws = wb.create_sheet("Asset Gaps by Product")
title_block(ws, "Asset Gaps by Product", "What must be supplied or captured before redesign", 1)
gaps = [
 ("Agastya", "Strong (79 full-res). Recapture ~15 weak/empty/demo-labelled shots; a18 error page must be fixed in app; product logo file needed.", "Medium"),
 ("MavionLearn", "No screenshot folder; only 800px embedded images; video screens are mockups; logo file needed.", "High"),
 ("PragyanNxt", "11 low-res screenshots, 5 empty states; no certificate/verification/proctoring-in-action screens.", "High"),
 ("Protonnxt", "High-res images exist only inside pptx; modules 13-15 lack screenshots; privacy redaction needed; logo file needed.", "Medium"),
 ("SalesPulse CRM", "Only 800px embedded images; no mobile/email/WhatsApp screenshots; logo file needed.", "High"),
 ("Vortex", "No screenshots at all; logo file needed.", "Critical"),
 ("Company", "Vector logo, brand guide, photography/iconography rules, approved boilerplate.", "High"),
]
last = table(ws, ["Product", "Gap", "Priority"], gaps, [18, 100, 10], name="Gaps")
sev_format(ws, "C", 5, last)
wb.save(os.path.join(OUT, "Product_Asset_Mapping.xlsx"))

# =============== 5. Missing_Information_Register.xlsx ===============
wb = Workbook(); ws = wb.active; ws.title = "Register"
title_block(ws, "Missing Information & Clarification Register", "Items requiring company clarification before redesign (Prompt 2). Status to be updated by MavionTech.", 1)
rows = [[f"MI-{i:03d}", a, it, why, ev, pr, "", "Open", ""] for i, (a, it, why, ev, pr) in enumerate(MISSING, 1)]
last = table(ws, ["ID", "Area", "Item needed", "Why it matters / conflict", "Evidence", "Priority", "Owner (MavionTech)", "Status", "Response"], rows,
             [9, 14, 40, 60, 26, 10, 18, 10, 40], name="Missing")
sev_format(ws, "F", 5, last)
ws = wb.create_sheet("Contact Variants")
title_block(ws, "Contact Details Found Across Sources", "Confirm which are official", 1)
table(ws, ["Value", "Type", "Where found"], CONTACTS, [44, 18, 60], name="Contacts")
ws = wb.create_sheet("Summary")
title_block(ws, "Register Summary", "", 1)
from collections import Counter
cnt = Counter((m[0], m[4]) for m in MISSING)
areas = sorted(set(m[0] for m in MISSING)); pris = ["Critical", "High", "Medium"]
rows = [[a] + [cnt.get((a, p), 0) for p in pris] + [sum(cnt.get((a, p), 0) for p in pris)] for a in areas]
rows.append(["TOTAL"] + [sum(cnt.get((a, p), 0) for a in areas) for p in pris] + [len(MISSING)])
table(ws, ["Area"] + pris + ["Total"], rows, [18, 10, 10, 10, 10], name="Summary")
wb.save(os.path.join(OUT, "Missing_Information_Register.xlsx"))

json.dump(dict(deckfacts=deckfacts, files=len(files), slides=len(slide_rows)), open(os.path.join(OUT, "..", "02_Working_Notes", "audit_facts.json"), "w"), indent=1)
print("OK", len(files), "files;", len(slide_rows), "slides;", len(MISSING), "missing items;", len(CLAIMS), "claims")
