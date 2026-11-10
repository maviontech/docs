# -*- coding: utf-8 -*-
"""Builds MavionTech_Brand_Guidelines.pdf and MavionTech_Presentation_Design_System.pdf (HTML -> Edge headless PDF)."""
import os, subprocess, pathlib
B = pathlib.Path(__file__).parent
A = (B / "assets").as_uri()
OUTDIR = pathlib.Path("D:/MavionTech_sales_MavionTech_Transformation/07_Design_System")
EDGE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

CORE = [("Mavion Midnight", "0B1A30", "Primary dark. Covers, dividers, dark value slides, diagram emphasis.", "white"),
        ("Mavion Amber", "F5A623", "Signature accent from the logo. Fills, numbers on dark, badges, CTA. Never body text on white.", "dark"),
        ("Amber Deep", "A0680A", "Amber for text and kickers on light surfaces (corporate decks).", "white"),
        ("Midnight Raised", "13284A", "Cards and chips on dark surfaces.", "white"),
        ("Ink", "0F1B2D", "Titles and primary text on light.", "white"),
        ("Slate 700", "3A4A63", "Body text on light.", "white"),
        ("Slate 500", "5E6E86", "Captions, footers, labels.", "white"),
        ("Slate 300", "C5CEDB", "Connectors, disabled, dividers on light.", "dark"),
        ("Line", "DCE3EC", "Card and frame borders.", "dark"),
        ("Mist", "EEF2F7", "Placeholders, quiet panels.", "dark"),
        ("Paper", "F6F8FB", "Tinted slide background, cards.", "dark"),
        ("White", "FFFFFF", "Default content background.", "dark")]
SIGNAL = [("Success", "12A150"), ("Warning", "D98E04"), ("Danger", "D64545"), ("Info", "2F6FEB")]
PRODUCTS = [("Agastya", "Cloud School ERP", "2563EB", "Preserved: the app and current deck primary blue.", "Logo file needed"),
            ("MavionLearn", "Enterprise LMS · Skills & Compliance", "6D4AFF", "Refined from #5A4BF0 for clearer separation from Vortex indigo.", "Logo file needed"),
            ("PragyanNxt", "Assessment & Certification", "1C3F94", "Preserved: sapphire from the PragyanNxt logo; its gold harmonises with Mavion Amber.", "Logo + mark available"),
            ("ProtonNxt", "Enterprise ATS", "0B8282", "Preserved: teal from the current deck and app (#1BA6A6), deepened to meet 4.5:1 on white.", "Logo file needed"),
            ("SalesPulse CRM", "India-first Sales CRM", "D63B42", "PROPOSED: coral 'pulse' (4.6:1 on white). The current indigo collides with Vortex/MavionLearn. Needs approval.", "Logo file needed"),
            ("Vortex HRMS", "Unified People Platform", "4F46E5", "Preserved: official mark gradient #4F46E5 → #0891B2 (vortexhrms.com).", "SVG mark available")]

CSS = """
@page { size: 297mm 167mm; margin: 0; }
* { box-sizing: border-box; }
body { margin: 0; font-family: Calibri, 'Segoe UI', Arial, sans-serif; color: #0F1B2D; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.page { width: 297mm; height: 167mm; padding: 13mm 16mm 12mm; position: relative; page-break-after: always; overflow: hidden; background: #fff; }
.page.dark { background: #0B1A30 url('A/bg_cover_corporate.png') center/cover; color: #fff; }
.page.tint { background: #F6F8FB; }
.kicker { font-size: 9pt; font-weight: 700; letter-spacing: .22em; text-transform: uppercase; color: #A0680A; margin: 0 0 2.5mm; }
.dark .kicker { color: #F5A623; }
h1 { font-size: 24pt; margin: 0 0 6mm; line-height: 1.1; }
h2 { font-size: 13pt; margin: 0 0 2mm; }
p, li, td { font-size: 10.5pt; line-height: 1.45; color: #3A4A63; }
.dark p, .dark li { color: #A9B6C9; }
.foot { position: absolute; left: 16mm; right: 16mm; bottom: 6mm; display: flex; justify-content: space-between; font-size: 7.5pt; color: #5E6E86; }
.dark .foot { color: #A9B6C9; }
.foot img { height: 3.6mm; vertical-align: -0.8mm; margin-right: 1.5mm; }
.grid { display: grid; gap: 5mm; }
.g2 { grid-template-columns: 1fr 1fr; } .g3 { grid-template-columns: repeat(3, 1fr); } .g4 { grid-template-columns: repeat(4, 1fr); } .g6 { grid-template-columns: repeat(6, 1fr); }
.card { background: #F6F8FB; border: .3mm solid #DCE3EC; border-radius: 3mm; padding: 4.5mm 5mm; }
.tint .card { background: #fff; }
.card p { margin: 0; font-size: 9.5pt; }
.sw { border-radius: 2.5mm; height: 16mm; padding: 2.5mm 3mm; font-size: 8pt; font-weight: 700; display: flex; flex-direction: column; justify-content: flex-end; border: .3mm solid #DCE3EC; }
.swl { font-size: 8.5pt; margin-top: 1.5mm; color: #3A4A63; line-height: 1.35; }
table { border-collapse: collapse; width: 100%; }
th { text-align: left; font-size: 8.5pt; letter-spacing: .12em; text-transform: uppercase; color: #5E6E86; border-bottom: .4mm solid #0F1B2D; padding: 1.6mm 2mm; }
td { border-bottom: .3mm solid #DCE3EC; padding: 1.8mm 2mm; vertical-align: top; font-size: 9.5pt; }
.shot { width: 100%; border-radius: 2mm; border: .3mm solid #DCE3EC; display: block; box-shadow: 0 1.5mm 4mm rgba(11,26,48,.12); }
.cap { font-size: 8.5pt; color: #5E6E86; margin-top: 1.5mm; }
.do { color: #12A150; font-weight: 700; } .dont { color: #D64545; font-weight: 700; }
.big { font-size: 46pt; font-weight: 700; line-height: 1; margin: 0; }
ul { margin: 0; padding-left: 4.5mm; } li { margin-bottom: 1mm; }
.chip { display: inline-block; border-radius: 2.2mm; padding: 2mm; width: 11mm; height: 11mm; }
.spec { font-family: Consolas, monospace; font-size: 8.5pt; color: #0F1B2D; background: #EEF2F7; padding: .3mm 1.2mm; border-radius: 1mm; }
""".replace("A/", A + "/")

def page(body, cls="", n=None, doc=""):
    foot = f'<div class="foot"><span><img src="{A}/maviontech-logo.png">MavionTech · {doc}</span><span>{n:02d}</span></div>' if n else ""
    return f'<section class="page {cls}">{body}{foot}</section>'

def cover(title, sub, version):
    return page(f"""
      <div style="display:flex;align-items:center;gap:3mm"><img src="{A}/maviontech-logo.png" style="height:11mm">
        <div><div style="font-weight:700;font-size:12pt">MavionTech</div><div style="font-size:8.5pt;color:#A9B6C9">Momentum with Vision</div></div></div>
      <div style="position:absolute;top:52mm;left:16mm;width:170mm">
        <p class="kicker">MavionTech brand system · {version}</p>
        <div style="font-size:38pt;font-weight:700;line-height:1.05;color:#fff">{title}</div>
        <p style="font-size:14pt;margin-top:5mm">{sub}</p></div>
      <div class="foot"><span>MavionTech Pvt. Ltd. · Pune, India · maviontech.com</span><span>Draft for approval · 10 Nov 2026</span></div>""", "dark")

def swatch(name, hexv, use, txt):
    color = "#fff" if txt == "white" else "#0F1B2D"
    return f'<div><div class="sw" style="background:#{hexv};color:{color}">{name}<span style="font-weight:400">#{hexv}</span></div><div class="swl">{use}</div></div>'

def write(html_pages, name):
    html = f"<!doctype html><html><head><meta charset='utf-8'><style>{CSS}</style></head><body>{''.join(html_pages)}</body></html>"
    hp = B / f"{name}.html"; hp.write_text(html, encoding="utf-8")
    out = OUTDIR / f"{name}.pdf"
    subprocess.run([EDGE, "--headless", "--disable-gpu", "--no-pdf-header-footer", f"--print-to-pdf={out}", hp.as_uri()], check=True, timeout=180)
    print("written", out)

# =============== BRAND GUIDELINES ===============
D = "Brand Guidelines"; n = 1; P = []
P.append(cover("Brand Guidelines", "One identity for every MavionTech product, presentation and catalogue.", "v1.0"))
n += 1; P.append(page(f"""<p class="kicker">Contents</p><h1>How to use this guide</h1>
<div class="grid g3">
<div class="card"><h2>1 · Foundation</h2><p>Who we are, personality and voice, using only official company statements.</p></div>
<div class="card"><h2>2 · Logo</h2><p>The MavionTech roundel, lockups, clear space, minimum size and misuse.</p></div>
<div class="card"><h2>3 · Colour</h2><p>Core palette, signal colours, usage ratios and contrast rules.</p></div>
<div class="card"><h2>4 · Endorsed brands</h2><p>Six product accents on one corporate system.</p></div>
<div class="card"><h2>5 · Typography</h2><p>Calibri for Office, Inter for web and print, and the hierarchy.</p></div>
<div class="card"><h2>6 · Imagery</h2><p>Iconography, the Orbit motif, screenshot treatment, diagrams, and what we never use.</p></div></div>
<p style="margin-top:6mm">Benchmarks for quality (not templates): Salesforce, Microsoft, SAP, ServiceNow, Stripe and Deloitte. The MavionTech identity is original: <b>Midnight + Amber</b>, real product proof, and quiet precision.</p>""", "", n, D))

n += 1; P.append(page(f"""<p class="kicker">1 · Brand foundation</p><h1>Momentum with Vision</h1>
<div class="grid g3" style="margin-bottom:5mm">
<div class="card"><h2>Mission</h2><p>Automate and simplify operational workflows with secure, extensible enterprise software that empowers teams to focus on what matters most.</p></div>
<div class="card"><h2>Vision</h2><p>Create intelligent digital ecosystems that help teams move faster, make better decisions, and transform the way organizations operate.</p></div>
<div class="card"><h2>Promise</h2><p>Production-grade UX, predictable performance, and maintainable integrations, built for real teams solving real problems.</p></div></div>
<div class="grid g2"><div><h2>Brand personality</h2><ul>
<li><b>Precise.</b> Specific capabilities, named modules, exact numbers with sources.</li>
<li><b>Calm and confident.</b> Generous space, few colours, no hype.</li>
<li><b>Proven.</b> Real screens with demo data, never mock-ups or stock photos.</li>
<li><b>Practical.</b> Built for Indian enterprises: INR, GST, statutory compliance, WhatsApp.</li></ul></div>
<div><h2>Voice rules</h2><ul>
<li>Titles state outcomes ("Results day in hours, not weeks"), not module names.</li>
<li>One message per slide; sentence case; no full stop at the end of titles.</li>
<li>Never invent customers, statistics, testimonials or certifications. See the Claims Policy in the Portfolio Strategy.</li>
<li>Write the company as <b>MavionTech</b>; legal entity <b>MavionTech Pvt. Ltd.</b></li></ul></div></div>
<p class="cap">Mission, vision, promise and tagline: maviontech.com (Company page), inspected 10 Nov 2026.</p>""", "", n, D))

n += 1; P.append(page(f"""<p class="kicker">2 · Logo</p><h1>The MavionTech roundel</h1>
<div class="grid" style="grid-template-columns:1.1fr 1.1fr 1.3fr">
<div class="card" style="background:#0B1A30;border:none;display:flex;align-items:center;justify-content:center;height:52mm"><div style="display:flex;align-items:center;gap:4mm"><img src="{A}/maviontech-logo.png" style="height:22mm"><div><div style="color:#fff;font-weight:700;font-size:16pt">MavionTech</div><div style="color:#A9B6C9;font-size:9pt">Momentum with Vision</div></div></div></div>
<div class="card" style="background:#fff;display:flex;align-items:center;justify-content:center;height:52mm"><div style="display:flex;align-items:center;gap:4mm"><img src="{A}/maviontech-logo.png" style="height:22mm"><div><div style="color:#0F1B2D;font-weight:700;font-size:16pt">MavionTech</div><div style="color:#5E6E86;font-size:9pt">Momentum with Vision</div></div></div></div>
<div><h2>Rules</h2><ul>
<li><b>Primary:</b> amber roundel on Mavion Midnight. <b>Secondary:</b> on white or Paper.</li>
<li><b>Lockup:</b> roundel + "MavionTech" (bold) + "Momentum with Vision". The wordmark is set in type: no wordmark artwork exists yet.</li>
<li><b>Clear space:</b> at least ¼ of the roundel's diameter on all sides.</li>
<li><b>Minimum size:</b> 0.21 in (5.3 mm) in slide footers; 16 px on screen.</li>
<li><b>Endorsement:</b> every product deck carries the lockup on cover and close, and the small roundel + wordmark in the footer.</li></ul></div></div>
<div class="grid g4" style="margin-top:5mm">
<p><span class="dont">✕</span> Recolour, outline or add effects (glow, bevel, heavy shadow).</p>
<p><span class="dont">✕</span> Stretch, rotate or crop the roundel.</p>
<p><span class="dont">✕</span> Place it on busy screenshots or mid-tone backgrounds.</p>
<p><span class="dont">✕</span> Pair it with a product logo larger than the roundel on the cover.</p></div>
<p class="cap">Action required: the only logo file is a 359 px PNG. A vector (SVG/EPS) master and a monochrome version are needed before print production.</p>""", "", n, D))

n += 1; P.append(page(f"""<p class="kicker">3 · Colour</p><h1>Midnight and Amber, with quiet neutrals</h1>
<div class="grid g6">{''.join(swatch(*c) for c in CORE)}</div>
<div class="grid g2" style="margin-top:4mm"><div><h2>Usage ratio</h2><p>White/Paper surfaces ≈ 60% · Midnight ≈ 25% (covers, dividers, one dark slide per act) · product accent ≈ 10% · Amber ≤ 5%, the single sharpest point of attention on a slide.</p></div>
<div><h2>Signal colours</h2><div style="display:flex;gap:3mm">{''.join(f'<div style="flex:1"><div class="sw" style="height:9mm;background:#{h};color:#fff">{nme}</div><div class="swl">#{h}</div></div>' for nme,h in SIGNAL)}</div>
<p class="cap">Signals are for status in charts, tables and UI callouts only, never decoration.</p></div></div>""", "", n, D))

n += 1; P.append(page(f"""<p class="kicker">3 · Colour</p><h1>Contrast and accessibility</h1>
<table><tr><th>Pairing</th><th>Use</th><th>Rule</th></tr>
<tr><td>White on Midnight #0B1A30</td><td>Titles and body on dark slides</td><td><span class="do">✓</span> Excellent contrast (AAA)</td></tr>
<tr><td>#A9B6C9 on Midnight</td><td>Secondary text on dark</td><td><span class="do">✓</span> AA for ≥ 11 pt</td></tr>
<tr><td>Ink #0F1B2D / Slate 700 on White</td><td>Titles and body on light</td><td><span class="do">✓</span> AAA</td></tr>
<tr><td>Amber #F5A623 on White</td><td>Never for text</td><td><span class="dont">✕</span> 2.0:1. Use Amber Deep #A0680A (4.7:1) for kickers on white</td></tr>
<tr><td>Midnight on Amber</td><td>Buttons, numbered badges</td><td><span class="do">✓</span> AAA</td></tr>
<tr><td>Product accent on White</td><td>Kickers, numbers, icons</td><td><span class="do">✓</span> All six accents meet 4.5:1 on white (4.6–9.6:1). On Midnight, use the accent only for fills and icons, never small text.</td></tr>
<tr><td>Product accent at 10–12% tint</td><td>Icon chips, highlight bands</td><td><span class="do">✓</span> Icon drawn in full accent on the tint</td></tr></table>
<p class="cap" style="margin-top:4mm">Body text never goes below 11 pt on slides; captions 11 pt; footer 9 pt.</p>""", "", n, D))

prod_cards = "".join(f"""<div class="card" style="padding:0;overflow:hidden"><div style="background:#0B1A30 url('{A}/bg_cover_{k}.png') center/cover;height:24mm;padding:4mm 5mm">
<div style="color:#fff;font-weight:700;font-size:15pt">{nm}</div><div style="color:#{acc};filter:brightness(1.6);font-size:7.5pt;letter-spacing:.18em;text-transform:uppercase;font-weight:700">{cat}</div></div>
<div style="padding:3.5mm 5mm"><div style="display:flex;align-items:center;gap:2.5mm"><span style="background:#{acc};width:7mm;height:7mm;border-radius:1.5mm;display:inline-block"></span><b style="font-size:10pt">#{acc}</b><span style="font-size:8.5pt;color:#5E6E86;margin-left:auto">{logo}</span></div>
<p style="margin-top:2mm;font-size:8.5pt">{why}</p></div></div>"""
    for (nm, cat, acc, why, logo), k in zip(PRODUCTS, ["agastya", "mavionlearn", "pragyannxt", "protonnxt", "salespulse", "vortex"]))
n += 1; P.append(page(f"""<p class="kicker">4 · Endorsed brand system</p><h1>Six products, one MavionTech identity</h1>
<div class="grid g3">{prod_cards}</div>""", "tint", n, D))

n += 1; P.append(page(f"""<p class="kicker">4 · Endorsed brand system</p><h1>What changes per product, and what never does</h1>
<div class="grid g2"><div class="card"><h2>Product-specific</h2><ul>
<li>Product name, logo/mark and category line</li><li>Accent colour: kickers, numbers, icon chips, numbered pipeline steps, cover glow</li>
<li>Screenshots and product-specific diagrams</li><li>Footer label: "Product · Category"</li></ul></div>
<div class="card"><h2>Always MavionTech</h2><ul>
<li>Midnight backgrounds, Amber signature, neutrals, typography, grid and margins</li>
<li>Cover and close structure, MavionTech lockup and official contact card</li>
<li>Screenshot frame, Orbit motif, icon style, footer and slide numbering</li>
<li>Claims policy and voice</li></ul></div></div>
<h2 style="margin-top:5mm">Naming</h2><p>Agastya · MavionLearn · PragyanNxt (formerly Evalynx; never mention the old name on slides) · ProtonNxt · SalesPulse CRM · Vortex HRMS (apps: VortexGo, SnapLens). Corporate catalogue: "MavionTech — Enterprise Business Applications".</p>""", "", n, D))

n += 1; P.append(page(f"""<p class="kicker">5 · Typography</p><h1>Calibri in Office, Inter on the web</h1>
<div class="grid" style="grid-template-columns:1.2fr 1fr"><div>
<div style="font-size:30pt;font-weight:700;line-height:1.1">Results day in hours, not weeks</div><div class="cap">Title · Calibri Bold 30 pt · Ink</div>
<div style="font-size:11pt;font-weight:700;letter-spacing:.25em;color:#2563EB;margin-top:5mm">EXAMS &amp; REPORT CARDS</div><div class="cap">Kicker · Calibri Bold 11 pt · caps · +3 spacing · accent</div>
<div style="font-size:16pt;font-weight:700;margin-top:4mm">Card heading</div><div class="cap">H3 · Calibri Bold 16 pt</div>
<div style="font-size:14pt;color:#3A4A63;margin-top:3mm">Body copy explains the capability and its benefit in one or two lines.</div><div class="cap">Body · Calibri 14 pt (12.5 pt minimum inside cards) · Slate 700</div>
<div style="font-size:44pt;font-weight:700;color:#2563EB;margin-top:3mm">257</div><div class="cap">Stat · Calibri Bold 44 pt · accent</div></div>
<div><h2>Why Calibri</h2><p>Calibri ships with every Microsoft Office installation on Windows and Mac. Decks therefore render identically for every salesperson and prospect, with no font substitution or text overflow. It is the presentation typeface for all MavionTech decks.</p>
<h2 style="margin-top:4mm">Inter for digital and print</h2><p>Inter (SIL Open Font License) is the companion face for the website, PDF catalogue and documents, chosen for its similar humanist proportions. Fallback: Calibri, Segoe UI, Arial.</p>
<h2 style="margin-top:4mm">Never</h2><p>Decorative or script fonts, more than one typeface in a deck, all-caps sentences (only kickers are caps), centred body text.</p></div></div>""", "", n, D))

n += 1; P.append(page(f"""<p class="kicker">6 · Iconography &amp; illustration</p><h1>Line icons, the Orbit motif, and nothing decorative</h1>
<div class="grid g3"><div class="card"><h2>Icons</h2><p>Lucide line icons, 1.75 stroke, drawn in the product accent on a rounded-square chip of the same accent at 12% tint. On dark slides: white icon on a solid accent chip. One icon per idea; never emoji or clip-art.</p>
<div style="display:flex;gap:3mm;margin-top:3mm">{''.join(f'<span style="background:#{c}1F;border-radius:2.2mm;width:12mm;height:12mm;display:inline-flex;align-items:center;justify-content:center"><img src="{A}/{f}" style="width:6.5mm"></span>' for c,f in [('2563EB','ic_dash_2563EB.png'),('2563EB','ic_shield_2563EB.png'),('2563EB','ic_grad_2563EB.png'),('2563EB','ic_msg_2563EB.png')])}</div></div>
<div class="card"><h2>The Orbit motif</h2><p>Concentric rings with a few amber nodes, drawn from the circuit ring in the MavionTech roundel. It appears only on dark covers, dividers and the close slide, together with one soft glow in the product accent. It is the only illustrative device: no abstract blobs, waves or stock art.</p>
<img src="{A}/bg_divider_corporate.png" class="shot" style="margin-top:3mm;height:22mm;object-fit:cover"></div>
<div class="card"><h2>Imagery</h2><p>Real product screenshots with realistic demo data are the hero imagery. <b>No stock photography of people, offices or handshakes.</b> Diagrams are built with native shapes in the brand palette so they stay editable.</p></div></div>""", "tint", n, D))

n += 1; P.append(page(f"""<p class="kicker">6 · Screenshot treatment</p><h1>The signature frame: real screens, framed with care</h1>
<div class="grid" style="grid-template-columns:1.25fr 1fr"><img src="{A}/renders/Desi_05.png" class="shot">
<div><ul>
<li><b>Frame:</b> white rounded rectangle (radius 0.08 in), 0.75 pt border #DCE3EC, slim chrome bar with three muted window dots and an optional page label, one soft shadow.</li>
<li><b>Crop:</b> top-anchored to the box, never stretched. Hero shots keep the app chrome; close-ups remove the sidebar.</li>
<li><b>Source:</b> at least 1,600 px wide (Agastya captures are 2,400 px).</li>
<li><b>Callouts:</b> numbered amber badges on the screenshot, matched by numbered captions below.</li>
<li><b>Data hygiene:</b> no real people or clients, no "demo"/"seed"/"QA" labels, no empty states, no error pages, no warnings such as "keys missing".</li>
<li><b>Caption</b> every screenshot (11 pt, Slate 500), and mark demo data as demo data.</li></ul></div></div>""", "", n, D))

n += 1; P.append(page(f"""<p class="kicker">Applying the identity</p><h1>The six prototype slides</h1>
<div class="grid g3">{''.join(f'<img src="{A}/renders/Desi_0{i}.png" class="shot">' for i in range(1, 7))}</div>
<p class="cap" style="margin-top:3mm">Agastya prototype: cover · overview · module map · architecture · interface showcase · value. Full specification in the Presentation Design System.</p>""", "", n, D))
n += 1; P.append(page(f"""<p class="kicker">Contact standard</p><h1>The same contact card on every close slide</h1>
<div class="card" style="width:120mm;background:#13284A;border-color:#2E4468"><div style="display:flex;gap:3mm;align-items:center"><img src="{A}/maviontech-logo.png" style="height:12mm"><div><div style="color:#fff;font-weight:700;font-size:13pt">MavionTech Pvt. Ltd.</div><div style="color:#A9B6C9;font-size:8.5pt">Momentum with Vision</div></div></div>
<p style="color:#fff;margin-top:3mm">communications@maviontech.com<br>+91 91580 08002<br>www.maviontech.com<br>505 Zen Business Center, Bhumkar Chowk, Wakad, Pune, Maharashtra 411057</p></div>
<p style="margin-top:5mm">Product domains appear only where confirmed (e.g. vortexhrms.com). Retire mvtech.in, sales@ and hello@ addresses, and placeholder phone numbers.</p>""", "dark", n, D))
write(P, "MavionTech_Brand_Guidelines")

# =============== DESIGN SYSTEM ===============
D = "Presentation Design System"; n = 1; P = []
P.append(cover("Presentation Design System", "Canvas, grid, type scale, components and 16 reusable layouts for all six product decks and the corporate catalogue.", "v1.0"))
n += 1; P.append(page(f"""<p class="kicker">1 · Canvas &amp; grid</p><h1>13.333 × 7.5 in widescreen, 0.6 in margins</h1>
<div class="grid" style="grid-template-columns:1.25fr 1fr"><div style="position:relative">
<img src="{A}/renders/Desi_02.png" class="shot">
<div style="position:absolute;inset:0;border-radius:2mm;background:repeating-linear-gradient(90deg,transparent 0,transparent 4.5%,rgba(37,99,235,.06) 4.5%,rgba(37,99,235,.06) 8.3%)"></div></div>
<table><tr><th>Token</th><th>Value</th></tr>
<tr><td>Canvas</td><td><span class="spec">LAYOUT_WIDE</span> 13.333 × 7.5 in</td></tr>
<tr><td>Side margins</td><td>0.6 in (content width 12.13 in)</td></tr>
<tr><td>Kicker</td><td>y 0.50 in</td></tr><tr><td>Title</td><td>y 0.78 in, one line, max width 11.5 in</td></tr>
<tr><td>Content zone</td><td>y 1.72 – 6.75 in</td></tr><tr><td>Footer baseline</td><td>y 7.02 in</td></tr>
<tr><td>Grid</td><td>12 columns, 0.3 in gutter; 2-, 3-, 4- and 5-up splits</td></tr>
<tr><td>Spacing scale</td><td>0.1 · 0.2 · 0.3 (default gap) · 0.5 · 0.75 in</td></tr></table></div>""", "", n, D))

n += 1; P.append(page(f"""<p class="kicker">2 · Type scale</p><h1>Nine styles, one family</h1>
<table><tr><th>Style</th><th>Size / weight</th><th>Colour</th><th>Use</th></tr>
<tr><td>Display</td><td>56 pt Bold</td><td>White</td><td>Product name on cover</td></tr>
<tr><td>Promise</td><td>26 pt Regular</td><td>White</td><td>Cover promise (≤ 2 lines)</td></tr>
<tr><td>Divider title</td><td>40 pt Bold + 72 pt amber number</td><td>White / Amber</td><td>Section dividers</td></tr>
<tr><td>Title</td><td>30 pt Bold</td><td>Ink / White</td><td>Every content slide, one line, outcome-led</td></tr>
<tr><td>Kicker</td><td>11 pt Bold caps, +3 spacing</td><td>Accent / Amber on dark</td><td>Above every title</td></tr>
<tr><td>H3</td><td>16 pt Bold</td><td>Ink</td><td>Card and feature headings</td></tr>
<tr><td>Body</td><td>14 pt (12.5 pt min in cards)</td><td>Slate 700</td><td>Descriptions, lists</td></tr>
<tr><td>Stat</td><td>44 pt Bold (28 pt inline)</td><td>Accent / Amber</td><td>Numbers with a source line</td></tr>
<tr><td>Caption / footer</td><td>11 pt / 9 pt</td><td>Slate 500</td><td>Screenshot captions, sources, footer</td></tr></table>""", "", n, D))

comp = [("Kicker + title", "Kicker 0.3 in tall at y 0.50; title at y 0.78. No underline or accent bar beneath titles."),
        ("Card", "Rounded rectangle r 0.10 in, Paper fill (White on tinted slides), 0.75 pt Line border, 0.25 in inner padding. No edge stripes."),
        ("Icon chip", "0.50–0.56 in rounded square, accent at 12% tint, Lucide icon at 52% of the chip in the full accent."),
        ("Screenshot frame", "See Brand Guidelines §6. Chrome 0.26 in, inset 0.04 in, one soft shadow (blur 14, offset 4, 12% opacity)."),
        ("Numbered callout", "0.34 in amber circle, Midnight numeral 11 pt bold; repeated on the screenshot and in the caption row."),
        ("Pill chip", "0.38 in tall full-radius pill; on dark: Midnight Raised fill with #2E4468 border."),
        ("Stat tile", "Number 44 pt + label 14 pt; one dark tile per row for rhythm; source line required."),
        ("Comparison row", "Label / Today (muted) / With product (white or Ink, with amber check); 0.75 pt divider lines only."),
        ("Buttons (close)", "Primary: Amber fill, Midnight text. Secondary: Midnight Raised, white text. 0.5 in tall, full radius."),
        ("Tables", "Header caps 10 pt Slate 500 with Ink rule; rows 0.75 pt Line dividers; no vertical rules or zebra fills."),
        ("Charts", "Native PowerPoint charts. Series: accent, then Slate 500, Slate 300. Signal colours for status only. Calibri, no 3D, no chart borders."),
        ("Diagrams", "Native shapes, r 0.08 in boxes, 1.25 pt Slate 300 connectors with triangle heads; one Midnight block marks the core; amber outline marks the control element.")]
n += 1; P.append(page(f"""<p class="kicker">3 · Components</p><h1>Twelve components cover every slide</h1>
<div class="grid g4" style="gap:4mm">{''.join(f'<div class="card" style="padding:3.5mm 4mm"><h2 style="font-size:11.5pt">{a}</h2><p style="font-size:8.8pt">{b}</p></div>' for a,b in comp)}</div>""", "tint", n, D))

n += 1; P.append(page(f"""<p class="kicker">4 · Header, footer &amp; numbering</p><h1>Quiet chrome, consistent position</h1>
<div class="grid" style="grid-template-columns:1.3fr 1fr"><img src="{A}/renders/Desi_03.png" class="shot"><div><ul>
<li><b>No header bar.</b> The kicker and title are the header.</li>
<li><b>Footer left:</b> "Product · Category", 9 pt Slate 500 (on dark: #A9B6C9).</li>
<li><b>Footer right:</b> MavionTech roundel (0.21 in) + "MavionTech" 9 pt bold, then the slide number.</li>
<li><b>Slide number:</b> plain arabic numeral at the right margin, 9 pt. Not shown on covers and close.</li>
<li><b>Sources:</b> 11 pt caption directly above the footer zone, never inside it.</li>
<li>Footer, logo and number live on the slide layout, never typed on slides.</li></ul></div></div>""", "", n, D))

n += 1; P.append(page(f"""<p class="kicker">5 · Covers &amp; dividers</p><h1>Midnight, one glow, the Orbit, and real product</h1>
<div class="grid g2"><div><img src="{A}/renders/Desi_01.png" class="shot"><p class="cap">Cover · MT_COVER: lockup top-left, kicker, 56 pt product name, category, 26 pt promise, supporting line, three proof pills, two overlapping framed screenshots.</p></div>
<div><img src="{A}/renders/Reus_02.png" class="shot"><p class="cap">Divider · MT_DIVIDER: 72 pt amber section number, 40 pt title, one sentence. Use only in decks over 20 slides, at most one per act.</p></div></div>""", "", n, D))

n += 1; P.append(page(f"""<p class="kicker">6 · Layout library</p><h1>16 reusable layouts (MavionTech_Reusable_Layouts.pptx)</h1>
<div class="grid g4" style="gap:3.5mm">{''.join(f'<div><img src="{A}/renders/Reus_{i:02d}.png" class="shot"><div class="cap">L{i:02d} · {t}</div></div>' for i,t in enumerate(["Cover","Section divider","Problem cards","Hero + feature column","Main + two stacked","Persona columns","Module map","Stat tiles"],1))}</div>""", "", n, D))
n += 1; P.append(page(f"""<p class="kicker">6 · Layout library</p><h1>Layouts 9–16</h1>
<div class="grid g4" style="gap:3.5mm">{''.join(f'<div><img src="{A}/renders/Reus_{i:02d}.png" class="shot"><div class="cap">L{i:02d} · {t}</div></div>' for i,t in enumerate(["Process","Architecture layers","Comparison (dark)","Pricing","Timeline","Roadmap (dark)","Close","Product accents"],9))}</div>""", "", n, D))

n += 1; P.append(page(f"""<p class="kicker">7 · Composition rules</p><h1>How a deck is assembled</h1>
<div class="grid g2"><div><h2>Rhythm</h2><ul>
<li>Sandwich: dark cover → light content → one dark value or roadmap slide per act → dark close.</li>
<li>No two neighbouring slides use the same layout; mirror hero layouts left/right.</li>
<li>Every content slide has a visual: screenshot, diagram, icon cards or stat tiles. No text-only slides.</li>
<li>One message per slide; at most 4 features, 6 cards, 5 process stages.</li></ul>
<h2 style="margin-top:4mm">Text discipline</h2><ul><li>Titles fit on one line at 30 pt (≈ 60 characters).</li><li>Body ≥ 12.5 pt; no text below 9 pt except legal.</li><li>Speaker notes (talk track) on every slide.</li></ul></div>
<div><h2>Slide masters</h2><table><tr><th>Layout</th><th>Use</th></tr>
<tr><td>MT_COVER</td><td>Cover and close</td></tr><tr><td>MT_DIVIDER</td><td>Section dividers</td></tr>
<tr><td>MT_CONTENT</td><td>Default white content</td></tr><tr><td>MT_CONTENT_TINT</td><td>Paper background for card grids</td></tr>
<tr><td>MT_DARK</td><td>Value, comparison, roadmap</td></tr></table>
<p class="cap">Each layout carries editable kicker and title placeholders, the footer, logo and slide number.</p></div></div>""", "tint", n, D))

n += 1; P.append(page(f"""<p class="kicker">8 · Product application</p><h1>Applying the system to each product deck</h1>
<table><tr><th>Product</th><th>Accent</th><th>Cover glow</th><th>Hero screens</th><th>Slides</th><th>Visual gaps before design</th></tr>
<tr><td>Agastya</td><td>#2563EB</td><td>Cobalt</td><td>a01, s01, r01</td><td>32</td><td>Recapture ~15 weak/empty shots; fix a18</td></tr>
<tr><td>MavionLearn</td><td>#6D4AFF</td><td>Violet</td><td>Admin dashboard, skill matrix</td><td>21</td><td>All screens at full resolution; logo</td></tr>
<tr><td>PragyanNxt</td><td>#1C3F94</td><td>Sapphire (lifted)</td><td>Dashboard, proctoring, certificate</td><td>22</td><td>Populated proctoring, reports, certificate, verify page</td></tr>
<tr><td>ProtonNxt</td><td>#0B8282</td><td>Teal</td><td>Admin dashboard, pipeline</td><td>27</td><td>Redact slides 8/36; capture vendor, calendar, mobile</td></tr>
<tr><td>SalesPulse CRM</td><td>#D63B42 (proposed)</td><td>Coral</td><td>My Day, masked dialer</td><td>25</td><td>Full-resolution screens; email, WhatsApp, Android</td></tr>
<tr><td>Vortex HRMS</td><td>#4F46E5</td><td>Indigo</td><td>Employee dashboard, attendance</td><td>23</td><td>Complete capture incl. VortexGo and SnapLens</td></tr></table>
<p style="margin-top:4mm">The corporate catalogue uses the same tokens with Amber Deep as its accent on light pages and Amber on dark.</p>""", "", n, D))

n += 1; P.append(page(f"""<p class="kicker">9 · Production &amp; QA</p><h1>Built as code, checked before it ships</h1>
<div class="grid g2"><div><h2>Build</h2><ul>
<li>Decks are generated with pptxgenjs from shared tokens (<span class="spec">mt.js</span>), so a colour or font change applies everywhere.</li>
<li>Screenshots are cropped by script (top-anchored, sidebar crop for close-ups).</li>
<li>Icons render from Lucide to 256 px PNG in each accent.</li></ul></div>
<div><h2>QA checklist</h2><ul>
<li>Schema validation passes; no folder entries in the zip.</li>
<li>Opens in PowerPoint without a repair prompt (verified by COM automation).</li>
<li>Rendered and inspected slide by slide: overflow, overlaps, one-line titles, contrast, alignment.</li>
<li>Every number has a source; demo data labelled; no unverified claims.</li></ul></div></div>""", "", n, D))
write(P, "MavionTech_Presentation_Design_System")
