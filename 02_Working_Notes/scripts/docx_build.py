# -*- coding: utf-8 -*-
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
from data import CLAIMS, CONTACTS, ADDITIONAL, DECKS
from docx import Document
from docx.shared import Pt, RGBColor, Inches, Cm
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

OUT = "D:/MavionTech_sales_MavionTech_Transformation/01_Audit_Reports/Company_Profile_Analysis.docx"
NAVY = RGBColor(0x0A, 0x1F, 0x44); AMBER = RGBColor(0xC9, 0x84, 0x0A); GREY = RGBColor(0x66, 0x70, 0x85)

doc = Document()
sec = doc.sections[0]; sec.left_margin = sec.right_margin = Cm(2.2); sec.top_margin = sec.bottom_margin = Cm(2)
st = doc.styles["Normal"]; st.font.name = "Calibri"; st.font.size = Pt(10.5)
st.element.rPr.rFonts.set(qn("w:eastAsia"), "Calibri")
for name, size in (("Heading 1", 16), ("Heading 2", 13), ("Heading 3", 11)):
    s = doc.styles[name]; s.font.name = "Calibri"; s.font.size = Pt(size); s.font.color.rgb = NAVY; s.font.bold = True

def shade(cell, hexcolor):
    tcPr = cell._tc.get_or_add_tcPr(); shd = OxmlElement("w:shd")
    shd.set(qn("w:val"), "clear"); shd.set(qn("w:color"), "auto"); shd.set(qn("w:fill"), hexcolor); tcPr.append(shd)

def tbl(headers, rows, widths=None):
    t = doc.add_table(rows=1, cols=len(headers)); t.style = "Table Grid"; t.alignment = WD_TABLE_ALIGNMENT.CENTER
    for i, h in enumerate(headers):
        c = t.rows[0].cells[i]; c.text = ""; r = c.paragraphs[0].add_run(h); r.bold = True; r.font.color.rgb = RGBColor(255, 255, 255); r.font.size = Pt(9.5)
        shade(c, "0A1F44")
    for row in rows:
        cells = t.add_row().cells
        for i, v in enumerate(row):
            cells[i].text = ""; run = cells[i].paragraphs[0].add_run(str(v)); run.font.size = Pt(9)
    if widths:
        t.autofit = False
        for i, w in enumerate(widths): t.columns[i].width = Cm(w)
        for row in t.rows:
            for i, w in enumerate(widths): row.cells[i].width = Cm(w)
    doc.add_paragraph()
    return t

def para(text, bold=False, italic=False, color=None, size=None):
    p = doc.add_paragraph(); r = p.add_run(text); r.bold = bold; r.italic = italic
    if color: r.font.color.rgb = color
    if size: r.font.size = Pt(size)
    return p

def bullets(items):
    for it in items: doc.add_paragraph(it, style="List Bullet")

# ---- Cover ----
logo = "D:/MavionTech_sales/branding/maviontech-logo.png"
doc.add_picture(logo, width=Cm(2.6))
para("MavionTech Pvt. Ltd.", bold=True, color=NAVY, size=12)
para("Company Profile Analysis", bold=True, color=NAVY, size=26)
para("Source discovery & audit - Prompt 1 of the product presentation transformation", color=GREY, size=12)
para("Prepared 10 November 2026 · Basis: D:\\MavionTech_sales (read-only) · Status: DRAFT for company clarification", italic=True, color=GREY, size=9.5)
p = para("Rule applied throughout: nothing in this document invents history, achievements, clients, partnerships or credentials. "
         "Every statement is attributed to a source file; claims that could not be verified are flagged for confirmation.", italic=True, size=9.5)

doc.add_heading("1. Executive summary", level=1)
bullets([
 "MavionTech presents itself as a builder of enterprise software that replaces manual operations with integrated digital workflows (company PDF, p1, p4).",
 "The only company-level source is a 38-page PDF ('MavionTech Pvt Ltd_Introduction.pdf'), exported from a PptxGenJS deck dated 17 June 2026, presenting a portfolio of 12 products.",
 "That portfolio and the 6 products in scope only partly match: ProtonNxt and Evalynx (assumed to be PragyanNxt) appear in both; Agastya, MavionLearn, SalesPulse CRM and Vortex are absent from the company PDF; 10 PDF products have no deck.",
 "Brand execution is fragmented: four legal-name variants, at least six web domains, three sales e-mail addresses, one placeholder phone number, and a different palette and typeface in every deck.",
 "The company PDF and Vortex deck carry high-risk claims (ISO 27001, SOC 2, GDPR badges; 99.9-99.99% SLAs; 300% ROI; '50+ enterprise deployments') with no supporting evidence in the source folder. These must be verified or removed before any redesign reuses them.",
 "The only brand asset supplied is a 359x362 px amber MavionTech logo (PNG). There is no brand guide, vector logo, or product logo files except PragyanNxt.",
])

doc.add_heading("2. Company identity", level=1)
tbl(["Attribute", "Finding", "Source"], [
 ("Brand name", "'MavionTech' (all decks, logo) vs 'Maviontech' (company PDF body text)", "Decks; PDF"),
 ("Legal entity", "'MavionTech Pvt. Ltd.' (Agastya, PragyanNxt, Protonnxt, Vortex); 'Maviontech Private Limited' (PDF cover/metadata); 'Maviontech Pvt Ltd' (MavionLearn investor); 'Mavion Technologies Pvt. Ltd.' (SalesPulse)", "Multiple"),
 ("Tagline", "'Momentum with Vision.' (PDF p1, p38)", "PDF"),
 ("Descriptor", "'Enterprise Software Solutions' (deck covers/footers); 'Enterprise Digitalization' (PDF p1)", "Decks; PDF"),
 ("Standard company line (internal prompt)", "'Crafted by MavionTech Pvt. Ltd. · Enterprise Software Solutions · maviontech.com'", "MavionTech_Sales_Deck_Prompt.md"),
 ("Headquarters", "'Headquartered in India, serving customers globally' - stated only in Vortex deck; no address anywhere", "Vortex slide 3"),
 ("Team size", "'Engineers 15+' - stated only in Vortex deck", "Vortex slide 3"),
 ("Founding year / history / leadership", "Not found in any source", "-"),
], [3.5, 9.5, 3.5])

doc.add_heading("3. Visual identity and logo usage", level=1)
para("Logo asset", bold=True)
bullets([
 "branding/maviontech-logo.png - circular circuit-board roundel enclosing a stylised 'M', single amber colour on transparent background, 359x362 px.",
 "Sampled dominant colour ~#F0A010; the internal deck prompt names 'MavionTech amber F5A623' as the accent colour - consistent.",
 "Resolution is adequate for small header/footer use only. No SVG/vector, horizontal lockup, wordmark, monochrome or reversed variants were supplied.",
])
para("How the logo is currently used", bold=True)
tbl(["Deck", "MavionTech logo use", "Endorsement wording"], [
 ("Agastya", "Cover and close (header lockup)", "'Crafted by MavionTech Pvt. Ltd. · Enterprise Software Solutions · maviontech.com'"),
 ("PragyanNxt", "Cover and close", "'Crafted by MavionTech Pvt. Ltd. Enterprise Software Solutions'"),
 ("Protonnxt", "Cover badge and close", "'A MAVIONTECH PRODUCT' / 'Crafted by MavionTech Pvt. Ltd.' / domain mvtech.in"),
 ("Vortex", "Cover and footer roundel", "'An enterprise product by MavionTech Pvt. Ltd.' / 'BY MAVIONTECH'"),
 ("MavionLearn (sales)", "Not used", "'maviontech.com' text only"),
 ("MavionLearn (investor)", "Not used", "'© Maviontech Pvt Ltd · Investor overview · Confidential'"),
 ("SalesPulse CRM", "Not used", "'A product by Mavion Technologies Pvt. Ltd.'"),
], [3.5, 4.5, 8.5])
para("Colour systems observed (no master palette exists)", bold=True)
tbl(["Source", "Primary / accent colours", "Typeface"], [
 ("Company PDF", "Dark theme with amber accents (PDF render)", "Not determinable from PDF"),
 ("Agastya", "Blue #2563EB, navy #0A1F44, status reds/ambers/greens", "Theme fonts (not set at run level)"),
 ("MavionLearn", "Violet #5A4BF0, magenta #C04BF0, deep #241A46", "Sora + Calibri (sales); Segoe UI (investor)"),
 ("PragyanNxt", "Navy #111C3C / #0B1430, gold accent", "Calibri"),
 ("Protonnxt", "Teal #1BA6A6, navy #0F1D3A, blue #3B82F6", "Georgia + Calibri"),
 ("SalesPulse CRM", "Indigo/violet, teal, light background", "Calibri + Segoe UI Emoji"),
 ("Vortex", "Indigo #4338CA, gold #CA8A04", "Inter"),
], [3.5, 8, 5])

doc.add_heading("4. Positioning and corporate messaging (as stated)", level=1)
tbl(["Element", "Statement", "Source"], [
 ("Positioning", "Maviontech builds enterprise software for real teams - production-grade business applications that help organisations move faster, simplify operations and replace manual work with intelligent automation.", "PDF p4"),
 ("Mission", "Empower businesses with intelligent technology that replaces manual processes with seamless digital experiences.", "PDF p4"),
 ("Vision", "A world where organisations operate effortlessly through intelligent, connected digital ecosystems.", "PDF p4"),
 ("Promise", "Production-grade UX, predictable performance and maintainable integrations - built for real teams.", "PDF p4"),
 ("Six commitments", "Workflow-first design; Unified platform; Rapid time to value (4-8 weeks); Enterprise-grade security; Configurable, not custom; White-glove support.", "PDF p6"),
 ("Approach vs legacy", "4-8 week go-live vs 12+ month builds; unified vs fragmented; configurable vs heavy code; production UX; dedicated account team.", "PDF p7"),
 ("Architecture message", "Mobile-first PWAs; microservices, REST, webhooks; AI/ML and GPT-4; real-time pipelines; cloud-native, containerised, auto-scaling.", "PDF p35"),
 ("Implementation", "Discover (wk 1-2), Configure (3-4), Validate (5-6), Go live (7-8).", "PDF p36"),
 ("Why MavionTech", "Real software for real teams; twelve products one platform; fast time to value; enterprise-grade by default; predictable performance; long-term partnership.", "PDF p37"),
 ("Next steps offer", "45-minute demo; free consultation; 30-day single-module pilot; proposal & pricing.", "PDF p38"),
], [3, 10.5, 3])
para("Messaging observations", bold=True)
bullets([
 "The corporate story is generic (applies to any software vendor) and is not anchored in the product-level proof that the strongest decks (Agastya, Protonnxt) already contain - e.g., database-per-tenant isolation, which five of the six products claim, is absent from the company narrative.",
 "'Twelve products, one platform' is asserted, but the products in the decks use separate stacks, domains, logins and brands; no shared platform evidence was found. Database-per-tenant multi-tenancy is the one genuinely recurring architectural theme.",
 "Implementation timelines differ by source: 4-8 weeks (PDF), ~6 weeks first campus (Agastya, labelled indicative), 'days' (SalesPulse), 30-day pilot (Vortex, PDF).",
])

doc.add_heading("5. Contact information found", level=1)
tbl(["Value", "Type", "Where found"], CONTACTS, [6, 3.5, 7])
para("No postal address, CIN/GSTIN, LinkedIn page or verified phone number exists in any source. A single confirmed contact block is required before redesign.", italic=True)

doc.add_heading("6. Product portfolio reconciliation", level=1)
para("The company PDF lists 12 products. The transformation scope covers 6 products. Overlap and gaps:")
tbl(["Product", "In company PDF", "Deck provided", "Comment"], [
 ("ProtonNxt", "Yes (02)", "Yes", "PDF integrations (job boards, LinkedIn) not shown in deck"),
 ("Evalynx / PragyanNxt", "Yes as Evalynx (11)", "Yes as PragyanNxt", "deck-source still uses 'Evalynx' - confirm rebrand"),
 ("Agastya", "No", "Yes", "Strongest deck; absent from company story"),
 ("MavionLearn", "No", "Yes (sales + investor)", "Investor deck positions a fundraising narrative"),
 ("SalesPulse CRM", "No", "Yes", "Uses 'Mavion Technologies' entity name"),
 ("Vortex", "No", "Yes", "May correspond to PDF 'HRMS' (01)"),
 ("HRMS, Project Mgmt Planning, Signet, Visitor Mgmt, Serene, Trackline, Inward Logistics, Vanguard, C2H, Club & Entertainment", "Yes", "No", "Out of current scope; overlaps noted in Master_Product_Inventory.xlsx"),
], [4, 3, 3.5, 6])
para("Additional names discovered: MavionMeet (video meetings inside ProtonNxt), VortexGo (Vortex mobile app), Agastya student mobile app, SalesPulse Android app.", italic=True)

doc.add_heading("7. Claims requiring verification", level=1)
para("The following company- and product-level claims must not be reused until MavionTech provides evidence. Full list: Product_Content_Audit.xlsx > Claims Register.")
tbl(["Source", "Location", "Claim", "Risk"], [(c[0], c[1], c[2], c[4]) for c in CLAIMS if c[4] in ("Critical", "High")], [3.2, 2, 9.5, 1.8])

doc.add_heading("8. Strengths to build on", level=1)
bullets([
 "Real, working products with deep feature sets - Agastya and Protonnxt decks demonstrate breadth with live screenshots.",
 "A recurring, credible architecture story: database-per-tenant isolation (Agastya, MavionLearn, PragyanNxt, Protonnxt, SalesPulse, Vortex).",
 "India-first commercial fit across products (INR, GST, Razorpay, UPI, WhatsApp, PF/ESI/PT/TDS).",
 "An internal, repeatable deck-production method (MavionTech_Sales_Deck_Prompt.md) that already mandates real screenshots, verified numbers and consistent MavionTech branding.",
 "Distinctive amber MavionTech mark that can serve as a consistent endorsement across product brands.",
])

doc.add_heading("9. Recommendations for the transformation", level=1)
bullets([
 "Confirm one legal name, one brand spelling, one website, one sales e-mail and one phone number.",
 "Adopt a branded-house-with-endorsement model: each product keeps its accent colour and logo; every deck carries the same MavionTech header/footer, amber accent and close slide.",
 "Establish a claims policy: only code-derived, demo-data-labelled or evidence-backed figures; certifications stated exactly as held.",
 "Reconcile the 12-product company portfolio with the 6 products being redesigned and decide how the corporate catalogue presents them.",
 "Commission a vector logo set and a minimal brand guide (palette, type, iconography, screenshot frame) before Prompt 2.",
 "Recapture product screenshots where weak (MavionLearn, PragyanNxt, SalesPulse, Vortex) and redact real-person/real-client data.",
])

doc.add_heading("Appendix - source files used", level=1)
bullets(["MavionTech Pvt Ltd_Introduction.pdf (38 pages)", "branding/maviontech-logo.png", "MavionTech_Sales_Deck_Prompt.md", "README_PragyanNxt_Deck.md",
         "deck-source/deck.json and 20 slide HTML files"] + [d[0] for d in DECKS])

# footer
for s in doc.sections:
    fp = s.footer.paragraphs[0]; fp.text = "MavionTech · Company Profile Analysis · Draft for internal review · 10 Nov 2026"
    fp.runs[0].font.size = Pt(8); fp.runs[0].font.color.rgb = GREY
doc.core_properties.title = "MavionTech Company Profile Analysis"; doc.core_properties.author = "MavionTech Transformation Team"
doc.save(OUT); print("saved", OUT)
