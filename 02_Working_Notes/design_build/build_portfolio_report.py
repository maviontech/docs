# -*- coding: utf-8 -*-
"""Builds 08_Portfolio_Audit/Portfolio_Consistency_Report.pdf (HTML -> Edge headless PDF), styled like the design-system PDFs."""
import io, pathlib, subprocess
B = pathlib.Path(__file__).parent
src = io.open(B / "build_pdfs.py", encoding="utf-8").read()
exec(src[:src.index("# =============== BRAND GUIDELINES")])  # CSS, page(), A, EDGE only
OUTDIR = pathlib.Path("D:/MavionTech_sales_MavionTech_Transformation/08_Portfolio_Audit"); OUTDIR.mkdir(exist_ok=True)
R = pathlib.Path("D:/MavionTech_sales_MavionTech_Transformation/02_Working_Notes/pp_render")
CSS2 = CSS + """
table.m td, table.m th { font-size: 8.6pt; padding: 1.25mm 1.6mm; }
table.m td:first-child { font-weight: 700; color: #0F1B2D; white-space: nowrap; }
.ok { color: #12A150; font-weight: 700; } .fx { color: #A0680A; font-weight: 700; } .nb { color: #5E6E86; }
.pill { display:inline-block; border-radius: 3mm; padding: .5mm 2.2mm; font-size: 8pt; font-weight: 700; }
.pg { background:#E3F4EA; color:#0E7A3E; } .pa { background:#FDF0D9; color:#8A5A08; }
.stat { font-size: 26pt; font-weight: 700; color: #0F1B2D; line-height: 1; }
.statl { font-size: 8.5pt; color: #5E6E86; margin-top: 1.2mm; }
.thumb { width: 100%; border-radius: 1.5mm; border: .3mm solid #DCE3EC; display: block; }
"""
D = "Portfolio Consistency Report"; P = []; n = 1
PR = [("Agastya", "agastya", "2563EB"), ("MavionLearn", "mavionlearn", "6D4AFF"), ("PragyanNxt", "pragyannxt", "1C3F94"),
      ("ProtonNxt", "protonnxt", "0B8282"), ("SalesPulse CRM", "salespulse", "D63B42"), ("Vortex HRMS", "vortex", "4F46E5")]
def nxt(): global n; n += 1; return n
def tbl(head, rows, cls="m", widths=None):
    cg = "".join(f'<col style="width:{w}">' for w in widths) if widths else ""
    return f'<table class="{cls}"><colgroup>{cg}</colgroup><tr>{"".join(f"<th>{h}</th>" for h in head)}</tr>' + "".join("<tr>" + "".join(f"<td>{c}</td>" for c in r) + "</tr>" for r in rows) + "</table>"
OK = '<span class="ok">✓</span>'
def FX(t): return f'<span class="fx">Fixed</span> <span class="nb">{t}</span>'

# 1 COVER
P.append(page(f"""
  <div style="display:flex;align-items:center;gap:3mm"><img src="{A}/maviontech-logo.png" style="height:11mm">
    <div><div style="font-weight:700;font-size:12pt">MavionTech</div><div style="font-size:8.5pt;color:#A9B6C9">Momentum with Vision</div></div></div>
  <div style="position:absolute;top:48mm;left:16mm;width:200mm">
    <p class="kicker">Prompt 5 · Portfolio-wide presentation quality audit</p>
    <div style="font-size:38pt;font-weight:700;line-height:1.05;color:#fff">Portfolio Consistency Report</div>
    <p style="font-size:14pt;margin-top:5mm">Six product decks, 152 slides, checked against one corporate standard in Microsoft PowerPoint.</p></div>
  <div class="foot"><span>MavionTech Pvt. Ltd. · Pune, India · maviontech.com</span><span>For approval · 10 Nov 2026</span></div>""", "dark"))

# 2 EXECUTIVE SUMMARY
P.append(page(f"""<p class="kicker">Executive summary</p><h1>All six decks are ready for external enterprise circulation</h1>
<div class="grid g4" style="margin-bottom:6mm">
<div class="card"><div class="stat">152</div><div class="statl">slides rendered and inspected in PowerPoint</div></div>
<div class="card"><div class="stat">22</div><div class="statl">corrections applied across the portfolio</div></div>
<div class="card"><div class="stat">0</div><div class="statl">text overflows, empty placeholders or off-slide shapes</div></div>
<div class="card"><div class="stat">0</div><div class="statl">unverified uptime, certification, ROI or customer claims</div></div></div>
<div class="grid g2"><div><h2>What we found</h2><ul>
<li>The six decks already shared one system: layouts, Calibri type, Midnight + Amber, footer, contact card and close.</li>
<li>Drift was in the details: section names for the same slide type, closing buttons, demo-data labels, the ₹ symbol, one missing cover mark and one missing architecture diagram.</li>
<li>PowerPoint measurement found 3 text overflows (SalesPulse, Vortex). Three decks had soft screenshots from 800 px sources.</li>
<li>No contradictions between decks on company facts, contact details, claims policy or shared products.</li></ul></div>
<div><h2>What we did</h2><ul>
<li>Fixed every finding at the generator level, rebuilt all six decks and re-exported all six PDFs from PowerPoint.</li>
<li>Re-measured in PowerPoint: zero overflow; minimum type 9 pt; every screenshot now at least 149 effective DPI.</li>
<li>Softened two absolute or comparative lines that could not be evidenced.</li>
<li>Recorded intended product differences (trial length, deployment, pricing visibility) so the catalogue can carry them consistently.</li></ul>
<p style="margin-top:3mm"><span class="pill pg">Verdict</span> Approved for screen and PDF circulation. Print use waits on new screenshots and vector logos (page 11).</p></div></div>""", "", nxt(), D))

# 3 SCOPE & METHOD
P.append(page(f"""<p class="kicker">Scope and method</p><h1>Every slide checked three ways: by script, by measurement and by eye</h1>
<div class="grid g3">
<div class="card"><h2>1 · Content scan</h2><p>Every text run in all six decks (python-pptx): fonts and sizes, banned and legacy names, claims patterns (uptime, SLA, ISO, SOC 2, GDPR, 24×7, ROI, “trusted by”, awards), US spellings, currency notation, demo-data labels, isolation wording, trial lengths, title length and speaker notes.</p></div>
<div class="card"><h2>2 · PowerPoint measurement</h2><p>Each deck opened in Microsoft PowerPoint through automation. For every shape: rendered text height against its box (overflow), position against the slide edge, and empty layout placeholders. Effective resolution of every screenshot: pixels against displayed inches.</p></div>
<div class="card"><h2>3 · Visual review</h2><p>All 152 slides exported from PowerPoint as images and reviewed for clipping, alignment, hierarchy, readability, repetition, screenshot treatment and diagram integrity. Changed slides were re-checked after each rebuild.</p></div></div>
<p class="cap" style="margin:3mm 0 3mm"><b>On every build:</b> Office schema validator (all passed) · no negative shape extents · no empty placeholders · speaker notes on every slide · editable text, shapes and diagrams (no slide flattened into an image). LibreOffice was not used for any check (decision D5).</p>
{tbl(["Product", "Slides", "File size", "Accent", "Final files"], [
 ["Agastya", "32", "9.0 MB", "#2563EB", "Agastya_Final.pptx · .pdf · Change_Log.docx"],
 ["MavionLearn", "23", "3.6 MB", "#6D4AFF", "MavionLearn_Final.pptx · .pdf · Change_Log.docx"],
 ["PragyanNxt", "22", "3.2 MB", "#1C3F94", "PragyanNxt_Final.pptx · .pdf · Change_Log.docx"],
 ["ProtonNxt", "27", "4.5 MB", "#0B8282", "Protonnxt_Final.pptx · .pdf · Change_Log.docx"],
 ["SalesPulse CRM", "25", "3.4 MB", "#D63B42", "SalesPulse_CRM_Final.pptx · .pdf · Change_Log.docx"],
 ["Vortex HRMS", "23", "2.5 MB", "#4F46E5", "Vortex_Final.pptx · .pdf · Change_Log.docx"]], widths=["18%", "8%", "10%", "10%", "54%"])}""", "", nxt(), D))

# 4 COVERS gallery
covers = "".join(f'<div><img class="thumb" src="{(R / k / "s01.png").as_uri()}"><div class="cap"><b style="color:#{c}">{nm}</b> · cover</div></div>' for nm, k, c in PR)
P.append(page(f"""<p class="kicker">Corporate consistency · covers</p><h1>One cover system, six product accents</h1>
<div class="grid g3" style="gap:4mm">{covers}</div>
<p class="cap" style="margin-top:3mm">Same lockup, kicker, product mark, name, category line, promise, three proof pills and two framed product screens. Agastya now carries its product mark like the other five.</p>""", "tint", nxt(), D))

# 5 VISUAL CONSISTENCY MATRIX
V = [
 ["Branding", "MavionTech lockup on cover and close; logo + product name in every footer", OK, OK, OK, OK, OK, OK],
 ["Product mark on cover", "0.52 in mark above the kicker", FX("added"), OK, OK, OK, OK, OK],
 ["Typography", "Calibri only; title 28 pt; minimum 9 pt", FX("9 pt"), FX("9 pt"), FX("9 pt"), FX("9 pt"), FX("9 pt"), FX("9 pt")],
 ["Colour", "Midnight + Amber core; one product accent", OK, OK, OK, OK, OK, OK],
 ["Layouts", "MT_COVER · CONTENT · TINT · DARK · CLOSE, placeholders filled", OK, OK, OK, OK, OK, OK],
 ["Spacing & grid", "0.6 in margin, title at 0.78 in, footer at 7.02 in", OK, OK, OK, OK, OK, OK],
 ["Iconography", "Lucide line icons in tinted accent chips", OK, OK, OK, OK, OK, OK],
 ["Screenshots", "Browser frame, URL label, demo-data caption", OK, OK, OK, OK, OK, "n/a¹"],
 ["Diagrams", "Native shapes, slate connectors, numbered steps", OK, OK, OK, OK, OK, OK],
 ["Architecture slide", "Kicker “Architecture”, layered diagram", OK, OK, FX("kicker"), FX("kicker"), FX("kicker"), FX("new slide")],
 ["Product map slide", "Kicker “Product map”", OK, FX("kicker"), FX("kicker"), OK, OK, OK],
 ["Footer & numbering", "Product · category left; logo; number right", OK, OK, OK, OK, OK, OK],
 ["Close", "Book a demo + second action; identical contact card", OK, FX("button"), FX("button"), OK, FX("button"), OK],
]
P.append(page(f"""<p class="kicker">Corporate consistency · visual</p><h1>Visual standard by deck</h1>
{tbl(["Dimension", "Standard", "Agastya", "MavionLearn", "PragyanNxt", "ProtonNxt", "SalesPulse", "Vortex"], V, widths=["15%", "33%", "9%", "9%", "9%", "8%", "8%", "9%"])}
<p class="cap">✓ conforms as built. “Fixed” items were corrected in this audit. ¹ Vortex has no product screenshots in its source; the cover uses the public vortexhrms.com sign-in page and all other slides use native diagrams.</p>""", "", nxt(), D))

# 6 TERMINOLOGY & NAMING
T = [
 ["Product names", "Agastya · MavionLearn · PragyanNxt · ProtonNxt · SalesPulse CRM · Vortex HRMS. No “Evalynx”, “Protonnxt” or “Maviontech” in text (all-caps kickers are styling).", OK],
 ["Company", "MavionTech Pvt. Ltd.; communications@maviontech.com; +91 91580 08002; 505 Zen Business Center, Pune. Identical on all six closes.", OK],
 ["Spelling", "British English in prose (organisation, centre, catalogue). Agastya “command center” → “command centre”. UI labels keep their on-screen spelling: Catalog, Customize, and SalesPulse’s module name Command Center.", FX("1 deck")],
 ["Currency", "₹ with Indian digit grouping. MavionLearn “Rs 1,800” → “₹1,800”.", FX("1 deck")],
 ["Demo data", "Every caption over a screenshot ends “(demo data)”. Five variants (demo tenant/tenants/users/clients/organisation) unified.", FX("4 decks")],
 ["Calls to action", "Primary: “Book a demo”. Second: “Start a free trial” where a trial is offered (MavionLearn, PragyanNxt, SalesPulse), “Plan a pilot” elsewhere (Agastya, ProtonNxt, Vortex). Three wording variants unified.", FX("3 decks")],
 ["Section names", "Same slide type, same kicker: “Product map”, “Architecture”. Five variants unified.", FX("4 decks")],
 ["Isolation wording", "One dedicated database per tenant in every product, named in the buyer’s noun: school (Agastya), customer/tenant (MavionLearn), organisation (PragyanNxt), tenant (ProtonNxt), company (SalesPulse), customer (Vortex). Intentional.", OK],
 ["Status labels", "Planned items are labelled “Planned” (Agastya roadmap) or placed under Next/Later (Vortex). ProtonNxt client engagement analytics is labelled Beta.", OK],
]
P.append(page(f"""<p class="kicker">Corporate consistency · language</p><h1>Naming and terminology</h1>
{tbl(["Area", "Portfolio rule and finding", "Result"], T, widths=["15%", "72%", "13%"])}""", "", nxt(), D))

# 7 CONTENT CONSISTENCY MATRIX
C = [
 ["Positioning", "Cloud school ERP for school groups", "Enterprise LMS, skills & compliance", "Assessment, proctoring & certification", "AI-assisted ATS for recruiters", "India-first sales CRM", "Unified people platform (HRMS)"],
 ["Target customer", "School groups, multi-campus", "L&D, HR, compliance, IT", "Corporates hiring; academic institutions", "Recruitment firms, talent teams", "Indian sales teams", "HR, payroll & finance teams"],
 ["Modules", "19 modules · 8 roles", "12 modules · 5 capabilities", "8 modules", "15 modules", "14 modules", "Base bundle + premium + add-ons"],
 ["Isolation", "Database per school", "Database per tenant", "Database per organisation", "Database per tenant", "Database per company", "Database per customer"],
 ["Deployment", "Multi-tenant SaaS²", "SaaS · private cloud · on-prem", "SaaS · private cloud · on-prem", "Multi-tenant SaaS", "Multi-tenant SaaS + Android", "Multi-tenant cloud + mobile apps"],
 ["Key integrations", "Razorpay, Meta WhatsApp, Twilio, SMTP", "OIDC, SAML 2.0, SCIM, SCORM, LTI 1.3", "LTI 1.3, Open Badges, verifiable credentials", "OpenAI, Gemini, MavionMeet, Razorpay, ICS", "Razorpay, WhatsApp Business, telephony", "REST APIs, biometric devices, access gates"],
 ["Pricing shown", "No (open input)", "Model only, tiers pending", "Allowances; prices pending", "No (open input)", "Calling rate; seat price pending", "Full list prices"],
 ["Trial", "Pilot", "30 days", "14 days", "Pilot", "30 days", "30-day pilot · 30-day trial³"],
 ["Maturity / roadmap", "Roadmap labelled Planned", "Live features only", "Live features only", "One Beta module labelled", "Live features only", "Live / Next / Later"],
 ["Claims", "Codebase metrics, sourced", "None unverified", "None unverified", "None unverified", "None unverified", "None unverified"],
]
P.append(page(f"""<p class="kicker">Content consistency</p><h1>What each deck says, side by side</h1>
{tbl(["", "Agastya", "MavionLearn", "PragyanNxt", "ProtonNxt", "SalesPulse CRM", "Vortex HRMS"], C, widths=["13%", "14.5%", "14.5%", "14.5%", "14.5%", "14.5%", "14.5%"])}
<p class="cap">² Agastya on-premise is mentioned in the source notes only and is not claimed on slides until MavionTech confirms it. ³ The Vortex close offers a 30-day pilot; the pricing slide states a 30-day free trial with no credit card. Both come from the Vortex source and do not conflict.</p>""", "", nxt(), D))

# 8 CONTRADICTIONS
X = [
 ["Same slide type named differently across decks", "“Platform”, “Everything in one platform”, “Enterprise-grade”, “Architecture & security”, “Security & architecture”", "Resolved: “Product map” and “Architecture” everywhere"],
 ["Trial offered, but the close said “Plan a pilot” or used three wordings", "MavionLearn, PragyanNxt, SalesPulse", "Resolved: “Start a free trial” on trial products"],
 ["Vortex was the only deck without an architecture diagram", "Vortex slide 18 had technology cards only", "Resolved: layered diagram from the Vortex source (slide 15), without the unverified encryption and multi-region lines"],
 ["Agastya was the only cover without a product mark", "Agastya slide 1", "Resolved: mark added from the Agastya app icon"],
 ["Rupee written two ways", "MavionLearn slide 14 “Rs 1,800”", "Resolved: ₹1,800"],
 ["Absolute or comparative wording that cannot be evidenced", "Vortex “Zero lost laptops at exit”; ProtonNxt “A candidate experience competitors can’t match”", "Resolved: “Assets recovered at exit”; “One candidate login across every employer”"],
 ["Vortex roadmap lists recruitment / applicant tracking (Next)", "Overlaps ProtonNxt, a live ATS", "Open: positioning decision for MavionTech (page 11). Not changed on slides."],
 ["Vortex Learning (LMS) and HR documents", "Overlap MavionLearn and Signet", "Consistent: Vortex slide 16 already directs enterprise needs to MavionLearn and Signet"],
]
P.append(page(f"""<p class="kicker">Contradictions</p><h1>Conflicts found between decks, and how each was settled</h1>
{tbl(["Finding", "Where", "Outcome"], X, widths=["33%", "33%", "34%"])}
<p class="cap" style="margin-top:3mm">No conflicts were found in company facts, contact details, product names, the claims policy, or in how shared capabilities (multi-tenancy, RBAC, audit logging, Razorpay, WhatsApp) are described.</p>""", "", nxt(), D))

# 9 VISUAL QA RESULTS
P.append(page(f"""<p class="kicker">Visual QA · measured in PowerPoint</p><h1>Rendering, overflow and resolution, before and after</h1>
<div class="grid" style="grid-template-columns:1.05fr 1fr;gap:7mm"><div>
<h2>Text fit and structure</h2>
{tbl(["Check", "Before", "After"], [
 ["Text overflowing its box", "3", "<b>0</b>"],
 ["· SalesPulse 21 caption", "1 line over", "Shortened"],
 ["· Vortex 11 card bodies", "2 lines over", "Shortened"],
 ["Empty layout placeholders", "0", "<b>0</b>"],
 ["Shapes off the slide", "0", "<b>0</b>"],
 ["Negative shape extents", "0", "<b>0</b>"],
 ["Smallest type size", "8 pt (frame URL)", "<b>9 pt</b>"],
 ["Fonts other than Calibri", "0", "<b>0</b>"],
 ["Slides without speaker notes", "0", "<b>0</b>"],
 ["Schema validation", "Pass", "<b>Pass</b>"]], widths=["52%", "26%", "22%"])}</div><div>
<h2>Screenshot resolution (effective DPI)</h2>
{tbl(["Deck", "Min before", "Min after", "Median after"], [
 ["Agastya", "241", "241", "396"], ["MavionLearn", "107", "<b>214</b>", "266"], ["PragyanNxt", "89", "<b>178</b>", "214"],
 ["ProtonNxt", "149", "149", "241"], ["SalesPulse CRM", "107", "<b>214</b>", "221"], ["Vortex HRMS", "320", "320", "568"]], widths=["34%", "22%", "22%", "22%"])}
<p class="cap">Sources under 1,200 px are now upscaled 2× with Lanczos resampling and light sharpening. This makes them sharp on projectors and in PDF. It cannot add detail the capture never had, so new captures are still needed for print (page 11).</p></div></div>""", "", nxt(), D))

# 10 FIXES APPLIED + changed slide
P.append(page(f"""<p class="kicker">Corrections applied</p><h1>22 corrections, made in the generators so they hold on every rebuild</h1>
<div class="grid" style="grid-template-columns:1.35fr 1fr;gap:6mm"><div>
{tbl(["Deck", "Corrections"], [
 ["All six", "Frame URL label 8 → 9 pt; sharper rendering of low-resolution screenshots"],
 ["Agastya", "Product mark on cover; “Command centre” kicker and title"],
 ["MavionLearn", "“Product map” kicker; ₹1,800; “Start a free trial”; demo label"],
 ["PragyanNxt", "“Product map” and “Architecture” kickers; “Start a free trial”; demo labels (3)"],
 ["ProtonNxt", "“Architecture” kicker; demo labels (6); candidate-portal title"],
 ["SalesPulse CRM", "“Architecture” kicker; caption overflow; “Start a free trial”; demo label"],
 ["Vortex HRMS", "New architecture slide 18; two card overflows on slide 11; “Assets recovered at exit”"]], widths=["22%", "78%"])}
<p class="cap" style="margin-top:2.5mm">All six PPTX files were rebuilt and copied into Final_Product_Decks, and all six PDFs re-exported from PowerPoint. Slide counts are unchanged.</p></div>
<div><img class="thumb" src="{(R / 'vortex' / 's18.png').as_uri()}"><p class="cap">New Vortex slide 18, as rendered in PowerPoint: edge, application, workflow &amp; security and data layers, the services around them, and the technology stack. Every element comes from the Vortex source deck.</p></div></div>""", "", nxt(), D))

# 11 OPEN ITEMS
P.append(page(f"""<p class="kicker">Open items</p><h1>Nothing blocks digital circulation. These inputs lift the portfolio further.</h1>
{tbl(["Item", "Affects", "Why it matters", "Needed from"], [
 ["New screenshot captures at 1,600 px or more", "PragyanNxt, ProtonNxt, MavionLearn, SalesPulse; Vortex (none exist)", "Sharp print and catalogue reproduction; Vortex product proof", "Product teams / app access"],
 ["Vector logos", "MavionTech, Agastya, MavionLearn, ProtonNxt, SalesPulse", "Print catalogue; the current marks are PNG", "Brand owner"],
 ["External price lists", "Agastya, ProtonNxt, SalesPulse seats, MavionLearn tiers, PragyanNxt tiers", "Pricing pages currently describe the model only", "Commercial"],
 ["Agastya on-premise", "Agastya deployment", "In source notes only, not claimed", "Product owner"],
 ["Vortex ATS roadmap vs ProtonNxt", "Vortex slide 22, ProtonNxt", "Two answers to one buyer question", "Leadership: positioning decision"],
 ["SLA, uptime, support hours, certifications", "All decks and both websites", "Removed until evidenced; websites still show them", "Leadership / compliance"],
 ["SalesPulse CRM in the official catalogue", "Catalogue scope", "Not listed on maviontech.com", "Leadership"]], widths=["25%", "28%", "29%", "18%"])}""", "", nxt(), D))

# 12 READINESS VERDICT
VR = [[nm, f'<span class="pill pg">Ready</span>', w] for nm, w in [
 ("Agastya", "Strongest proof: 51 real screens at 241+ DPI. Price list needed before quoting."),
 ("MavionLearn", "Ready. Tier matrix pending; pricing slide states the model only."),
 ("PragyanNxt", "Ready. Recapture preferred before print (lowest source resolution)."),
 ("ProtonNxt", "Ready. Price list pending; screens at 149+ DPI."),
 ("SalesPulse CRM", "Ready. Seat prices pending; catalogue inclusion to confirm."),
 ("Vortex HRMS", "Ready. Diagram-led by necessity; product screenshots would strengthen it.")]]
P.append(page(f"""<p class="kicker">Readiness</p><h1>Verdict: suitable for external enterprise circulation</h1>
{tbl(["Deck", "Status", "Note"], VR, widths=["18%", "12%", "70%"])}
<div class="card" style="margin-top:5mm"><p><b>Recommendation.</b> Approve the six decks as the circulation set and proceed to the corporate product catalogue. The catalogue can reuse the content matrix on page 7 as its product-comparison spread. It should carry the same rules: one kicker per slide type, “(demo data)” on screens, ₹ notation, and planned items labelled.</p></div>""", "tint", nxt(), D))

html = f"<!doctype html><html><head><meta charset='utf-8'><style>{CSS2}</style></head><body>{''.join(P)}</body></html>"
hp = B / "Portfolio_Consistency_Report.html"; hp.write_text(html, encoding="utf-8")
out = OUTDIR / "Portfolio_Consistency_Report.pdf"
subprocess.run([EDGE, "--headless", "--disable-gpu", "--no-pdf-header-footer", f"--print-to-pdf={out}", hp.as_uri()], check=True, timeout=180)
print("written", out, len(P), "pages")
