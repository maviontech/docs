# -*- coding: utf-8 -*-
"""Portfolio Consistency Report v2 = approved v1 (12 pages, unchanged) + expansion addendum (HeeLIKS, Vyaas AI, catalogue vNext).
v1 is backed up to 08_Portfolio_Audit/Previous_Versions first."""
import io, os, pathlib, shutil, subprocess, pymupdf
B = pathlib.Path(__file__).parent
src = io.open(B / "build_pdfs.py", encoding="utf-8").read()
exec(src[:src.index("# =============== BRAND GUIDELINES")])  # CSS, page(), A, EDGE
O = pathlib.Path("D:/MavionTech_sales_MavionTech_Transformation/08_Portfolio_Audit"); (O / "Previous_Versions").mkdir(exist_ok=True)
V1 = O / "Previous_Versions/Portfolio_Consistency_Report_v1_2026-11-10.pdf"
if not V1.exists(): shutil.copy2(O / "Portfolio_Consistency_Report.pdf", V1)
R = pathlib.Path("D:/MavionTech_sales_MavionTech_Transformation")
CSS2 = CSS + """
table.m td, table.m th { font-size: 8.2pt; padding: 1mm 1.5mm; vertical-align: top; } table.m td:first-child { font-weight: 700; color: #0F1B2D; }
.ok { color: #12A150; font-weight: 700; } .pill { display:inline-block; border-radius: 3mm; padding: .4mm 2mm; font-size: 7.8pt; font-weight: 700; }
.pf { background:#F5A623; color:#0B1A30; } .pr { background:#FDF0D9; color:#8A5A08; } .pp { background:#EDE4FD; color:#5B21B6; }
.stat { font-size: 24pt; font-weight: 700; color: #0F1B2D; line-height: 1; } .statl { font-size: 8.3pt; color: #5E6E86; margin-top: 1.2mm; }
.thumb { width: 100%; border-radius: 1.5mm; border: .3mm solid #DCE3EC; display: block; } ul.t li { font-size: 8.6pt; margin-bottom: .6mm; }
"""
D = "Portfolio Consistency Report · Expansion addendum"; P = []; n = 12
def nxt():
    global n; n += 1; return n
def tbl(head, rows, widths):
    cg = "".join(f'<col style="width:{w}">' for w in widths)
    return f'<table class="m"><colgroup>{cg}</colgroup><tr>{"".join(f"<th>{h}</th>" for h in head)}</tr>' + "".join("<tr>" + "".join(f"<td>{c}</td>" for c in r) + "</tr>" for r in rows) + "</table>"
OK = '<span class="ok">✓</span>'
F, RD, PM = '<span class="pill pf">Flagship · ready</span>', '<span class="pill pr">Ready · available</span>', '<span class="pill pp">Premium · future</span>'

P.append(page(f"""<p class="kicker">Addendum · Portfolio expansion · 10 Nov 2026</p><h1>Eight products, one standard: HeeLIKS and Vyaas AI join the portfolio</h1>
<div class="grid g4" style="margin-bottom:5mm">
<div class="card"><div class="stat">8</div><div class="statl">product decks on one design system (6 approved + 2 new)</div></div>
<div class="card"><div class="stat">78</div><div class="statl">new deck slides rendered and inspected in PowerPoint (44 + 34)</div></div>
<div class="card"><div class="stat">61</div><div class="statl">catalogue vNext slides, every one re-inspected</div></div>
<div class="card"><div class="stat">0</div><div class="statl">overflows, off-slide shapes, empty placeholders or negative extents</div></div></div>
<div class="grid g2"><div><h2>What changed in the portfolio</h2><ul class="t">
<li>HeeLIKS (inventory, POS and distribution) and Vyaas AI (enterprise AI assistant) were rebuilt on the locked design system. The only additions are two new product accents: Ocean #0369A1 and Iris #7C3AED.</li>
<li>The approved catalogue was extended to vNext (52 → 61 slides). The six existing showcases are preserved; v1 is backed up.</li>
<li>Product status and order were set by MavionTech (flagships first: Vortex HRMS, ProtonNxt, PragyanNxt, Agastya) and are applied consistently in the catalogue and introduction deck:
<br>{F} Vortex HRMS, ProtonNxt, PragyanNxt, Agastya
<br>{RD} MavionLearn, SalesPulse CRM, HeeLIKS
<br>{PM} Vyaas AI</li></ul></div>
<div><h2>Consistency correction</h2><p style="font-size:8.8pt">The v1 claim of “a dedicated database per customer in all six products” would be false for eight: Vyaas AI scopes data per organisation inside one application database. Every isolation statement in the catalogue is now qualified (slides 4, 6, 10, 49, 51 and 60). The Vyaas AI deck states organisation scoping on slides 21, 29 and 30.</p>
<h2 style="margin-top:3mm">Records updated</h2><ul class="t"><li>Master_Product_Inventory.xlsx: two product rows, two deck rows, source files, and a catalogue-status column for all eight products.</li>
<li>Product_Asset_Mapping.xlsx: HeeLIKS (181) and Vyaas AI (31) screenshot-to-module sheets; asset gaps.</li><li>v1 workbooks and this report's v1 are kept in Previous_Versions.</li></ul></div></div>""", "", nxt(), D))

rows = [[nm, OK, OK, OK, OK, OK, OK, q] for nm, q in [
 ("HeeLIKS", "44 slides · min 9 pt · ≥241 DPI"), ("Vyaas AI", "34 slides · min 9 pt · ≥229 DPI"), ("Catalogue vNext", "61 slides · min 9 pt · ≥220 DPI")]]
P.append(page(f"""<p class="kicker">Addendum · Visual and content consistency</p><h1>The new decks pass the same checks as the original six</h1>
{tbl(["Deliverable", "Locked layouts &amp; type", "Midnight + Amber, product accent", "Endorsed footer &amp; contact card", "“(demo data)” on screens", "Notes with sources", "Planned items labelled", "PowerPoint QA"], rows, ["14%", "11%", "13%", "13%", "12%", "11%", "11%", "15%"])}
<div class="grid g2" style="margin-top:5mm">
<div><h2>HeeLIKS · corrections from source</h2><ul class="t"><li>Rebuilt from 54 to 44 slides; all 20 modules kept; five native diagrams added.</li><li>Removed unsupported lines: “intelligent”, “perfectly organised”, “five industry editions”, and the website's uptime and test counts.</li><li>Pages of 3–4 unreadable thumbnails became large, content-fitted screens.</li><li>Prices from the product code; roadmap tagged PLANNED.</li></ul></div>
<div><h2>Vyaas AI · corrections from source</h2><ul class="t"><li>“5 plan tiers” corrected to 7, with prices in INR and USD.</li><li>Isolation qualified as organisation-scoped; overlapping labels and the illegible wordmark fixed.</li><li>New diagrams: cited answers, coding agent, sandbox layers, token optimiser, architecture.</li><li>The PR claim is evidenced by the task rail “Opened PR #42” (demo data).</li></ul></div></div>
<p class="cap" style="margin-top:3mm">Every deck was rendered in Microsoft PowerPoint (COM), measured for text overflow and off-slide shapes, schema-validated, checked for negative extents and empty placeholders, and inspected slide by slide.</p>""", "", nxt(), D))

P.append(page(f"""<p class="kicker">Addendum · Open items</p><h1>What MavionTech should confirm before wider circulation</h1>
{tbl(["Item", "Where", "Effect today", "Owner"], [
 ["HeeLIKS live price list", "HeeLIKS deck slide 41; catalogue slide 58", "Prices from the product code, excluding GST", "Commercial"],
 ["Vyaas AI pricing and launch timing", "Vyaas AI deck slide 26; catalogue slide 58", "Shown as Indicative; Enterprise price on request", "Leadership"],
 ["Vyaas AI 'premium, future' positioning in its own deck", "Vyaas_Final.pptx", "Catalogue carries the label; the deck does not yet", "Marketing"],
 ["heeliks.com public copy", "HeeLIKS close slide; contacts", "Site was down during the audit; repo templates used", "Marketing"],
 ["'Inward Logistics' / 'Trackline' vs HeeLIKS", "Catalogue slide 11", "Names left as they are", "Leadership"],
 ["Vector logos (HeeLIKS, Vyaas AI)", "All decks", "PNG marks, sharp enough for screens", "Brand owner"],
 ["Earlier open items (SLA, certifications, price lists)", "Report v1, page 11", "Unchanged; still excluded", "As in v1"]], ["30%", "28%", "28%", "14%"])}
<div class="card" style="margin-top:5mm"><p><b>Verdict.</b> HeeLIKS, Vyaas AI and the catalogue vNext meet the same MavionTech standard as the six approved decks and are suitable for external circulation, subject to the commercial confirmations above. Vyaas AI must be presented as a premium product envisioned for the future.</p></div>""", "tint", nxt(), D))

html = f"<!doctype html><html><head><meta charset='utf-8'><style>{CSS2}</style></head><body>{''.join(P)}</body></html>"
hp = B / "Portfolio_Addendum.html"; hp.write_text(html, encoding="utf-8")
add = B / "Portfolio_Addendum.pdf"
subprocess.run([EDGE, "--headless", "--disable-gpu", "--no-pdf-header-footer", f"--print-to-pdf={add}", hp.as_uri()], check=True, timeout=180)
import time
for _ in range(30):
    if add.exists() and add.stat().st_size > 0: break
    time.sleep(1)
doc = pymupdf.open(V1); doc.insert_pdf(pymupdf.open(add)); out = O / "Portfolio_Consistency_Report.pdf"
doc.save(out); print("written", out, len(doc), "pages")
