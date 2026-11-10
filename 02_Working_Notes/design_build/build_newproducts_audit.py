# -*- coding: utf-8 -*-
"""Checkpoint 1 of the portfolio expansion: source audit and content analysis for HeeLIKS and Vyaas AI.
Writes 01_Audit_Reports/HeeLIKS_Vyaas_Source_Audit.pdf (HTML -> Edge headless PDF), same style as the design-system PDFs."""
import io, pathlib, subprocess
B = pathlib.Path(__file__).parent
src = io.open(B / "build_pdfs.py", encoding="utf-8").read()
exec(src[:src.index("# =============== BRAND GUIDELINES")])  # CSS, page(), A, EDGE only
OUTDIR = pathlib.Path("D:/MavionTech_sales_MavionTech_Transformation/01_Audit_Reports")
CS = pathlib.Path("D:/MavionTech_sales_MavionTech_Transformation/04_Contact_Sheets")
CSS2 = CSS + """
table.m td, table.m th { font-size: 7.7pt; padding: .75mm 1.4mm; line-height:1.25; vertical-align: top; }
table.m td:first-child { font-weight: 700; color: #0F1B2D; }
.ok { color: #12A150; font-weight: 700; } .fx { color: #A0680A; font-weight: 700; } .bad { color: #C0352B; font-weight: 700; } .nb { color: #5E6E86; }
.pill { display:inline-block; border-radius: 3mm; padding: .5mm 2.2mm; font-size: 8pt; font-weight: 700; }
.pg { background:#E3F4EA; color:#0E7A3E; } .pa { background:#FDF0D9; color:#8A5A08; } .pr { background:#FBE3E1; color:#A12A20; }
.stat { font-size: 24pt; font-weight: 700; color: #0F1B2D; line-height: 1; } .statl { font-size: 8.3pt; color: #5E6E86; margin-top: 1.2mm; }
.olc li { margin:0 0 .6mm !important; break-inside: avoid; } .thumb { width: 100%; border-radius: 1.5mm; border: .3mm solid #DCE3EC; display: block; }
ul.t li { font-size: 8.2pt; margin-bottom: .5mm; line-height:1.3; } ul.t { margin:1mm 0 0; } .sw { display:inline-block; width:4mm; height:4mm; border-radius:1mm; vertical-align:-0.8mm; margin-right:1.5mm; }
"""
D = "HeeLIKS & Vyaas AI · Source Audit"; P = []; n = 1
def nxt():
    global n; n += 1; return n
def tbl(head, rows, widths=None):
    cg = "".join(f'<col style="width:{w}">' for w in widths) if widths else ""
    return f'<table class="m"><colgroup>{cg}</colgroup><tr>{"".join(f"<th>{h}</th>" for h in head)}</tr>' + "".join("<tr>" + "".join(f"<td>{c}</td>" for c in r) + "</tr>" for r in rows) + "</table>"
def ul(items): return '<ul class="t">' + "".join(f"<li>{i}</li>" for i in items) + "</ul>"
OK = '<span class="ok">✓</span>'; GAP = '<span class="bad">Gap</span>'; PART = '<span class="fx">Partial</span>'

# 1 COVER
P.append(page(f"""
  <div style="display:flex;align-items:center;gap:3mm"><img src="{A}/maviontech-logo.png" style="height:11mm">
    <div><div style="font-weight:700;font-size:12pt">MavionTech</div><div style="font-size:8.5pt;color:#A9B6C9">Momentum with Vision</div></div></div>
  <div style="position:absolute;top:46mm;left:16mm;width:220mm">
    <p class="kicker">Portfolio expansion · Checkpoint 1 · Source audit and content analysis</p>
    <div style="font-size:36pt;font-weight:700;line-height:1.05;color:#fff">HeeLIKS and Vyaas AI</div>
    <p style="font-size:14pt;margin-top:5mm">What the two new products really do, what their source decks get right and wrong, and how they will join the MavionTech portfolio.</p></div>
  <div class="foot"><span>MavionTech Pvt. Ltd. · Pune, India · maviontech.com</span><span>For review · 10 Nov 2026</span></div>""", "dark"))

# 2 SUMMARY
P.append(page(f"""<p class="kicker">Executive summary</p><h1>Two deep, code-verified products; both decks need rebuilding, not polishing</h1>
<div class="grid g4" style="margin-bottom:5mm">
<div class="card"><div class="stat">84</div><div class="statl">source slides rendered in PowerPoint and inspected (54 + 30)</div></div>
<div class="card"><div class="stat">212</div><div class="statl">product screenshots mapped to modules (181 + 31), all 2400 px wide</div></div>
<div class="card"><div class="stat">20 · 14</div><div class="statl">functional modules in HeeLIKS · Vyaas AI, each checked against the code</div></div>
<div class="card"><div class="stat">5</div><div class="statl">source claims to correct or qualify before reuse (pages 6 and 9)</div></div></div>
<div class="grid g2"><div><h2>What we found</h2><ul class="t">
<li><b>HeeLIKS</b> is a multi-tenant inventory, point-of-sale and B2B order-to-cash platform for Indian stock-driven businesses. Its depth (GST, FEFO, ledger, distributor order-to-cash) is fully evidenced by 181 screenshots and a 127-row coverage map.</li>
<li><b>Vyaas AI</b> is an enterprise AI assistant: cited chat over company knowledge, document and image generation, a sandboxed coding agent that opens pull requests, and organisation governance with cost control.</li>
<li>Both source decks were produced in their own visual themes (indigo/lavender, dark navy). Neither follows the locked MavionTech system, and many slides shrink 3–4 screenshots to an illegible size.</li>
<li>Key claims check out against both code repositories (D:\\heeliks, D:\\llm, read-only): test counts, reports, plans, gVisor sandbox, BM25 retrieval, encrypted secrets.</li></ul></div>
<div><h2>What needs a decision before redesign</h2><ul class="t">
<li><b>Product accents.</b> Both brand blues sit almost on top of existing accents (Agastya, PragyanNxt, Vortex). Page 12 proposes two new accents.</li>
<li><b>Catalogue claim.</b> The approved catalogue says “a dedicated database per customer in all six products”. Vyaas isolates at organisation level in a shared database, so the line must be qualified when the catalogue grows to eight.</li>
<li><b>Vyaas evidence gap.</b> No screenshot shows the coding agent's pull request, its headline promise. The capability is verified in code; the deck will say so without a screen unless a capture is supplied.</li>
<li><b>heeliks.com</b> was down during the audit; website copy was read from the site templates in the product repository instead.</li></ul>
<p style="margin-top:2mm"><span class="pill pa">Recommendation</span> Approve the positioning and outlines on pages 10–11 and the accents on page 12; then build both decks.</p></div></div>""", "", nxt(), D))

# 3 SOURCES
P.append(page(f"""<p class="kicker">Sources inspected</p><h1>Every source file opened; three differ from the brief</h1>
{tbl(["Source", "What it is", "Use in this programme"], [
 ["HeeLIKS_Enterprise_Sales_Deck.pptx", "54 slides, own indigo theme; built from the code by the product team", "Content and narrative source; not reused visually"],
 ["HeelIKS_screenshots/ (181)", "18 capture groups A–Z: auth, B2B, catalog, dashboard, exports, inventory, console, import, partners, reports, returns, POS, settings, procurement, personas, website, dark mode, 4 industry workspaces", "Primary product evidence"],
 ["HeeLIKS_coverage.csv <span class='fx'>(brief: .xlsx)</span>", "127 rows: 22 modules, 89 features, 16 USPs; each with persona, URL, screenshot and slide; all marked covered", "Module map and screenshot index"],
 ["HeeLIKS_deck_work/", "product_analysis.md, discovered_inputs.md, capture log (194 captures with URL and HTTP status), coverage, build scripts", "Positioning, buyers, code evidence, roadmap"],
 ["HeeLIKS_exports/ (9)", "Real generated files: sales and GSTR-1 Excel, inventory, AR aging, PO, A4 invoice and challan PDFs", "Proof of document outputs"],
 ["heeliks.com <span class='fx'>(site down)</span>", "Read from templates/site in the repo: home, features, solutions, pricing, contact", "Contacts, add-on pricing, perpetual-licence terms"],
 ["Vyaas_Enterprise_Sales_Deck.pptx", "30 slides, dark navy theme", "Content and narrative source"],
 ["Vyaas_screenshots/ (31)", "Chat (7), knowledge (2), documents, assistants (2), tools, workspaces (4), organisation (5), billing (3), analytics, admin (2), notifications, login", "Primary product evidence"],
 ["deck_work/", "Vyaas product_analysis.md, discovered_inputs.md, coverage.csv (44 rows, never updated: all <i>pending</i>), 30 render PNGs, build scripts", "Positioning and module map"],
 ["Product repositories", "D:\\heeliks (stocksage @ 3b66227) and D:\\llm, read only", "Spot-verification of claims"],
 ["Master_Portfolio_Content.docx", "<span class='fx'>Not present</span> in the transformation folder", "Not created; the brief says “if present”"]], ["27%", "48%", "25%"])}
<p class="cap" style="margin-top:3mm">Naming: the product spells itself <b>HeeLIKS</b> (capital L) in the app, logo, site and code. The brief’s “HeelIKS” paths are the same folders on Windows, which ignores case. Deliverables will use the product's own spelling.</p>""", "", nxt(), D))

# 4 HEELIKS POSITIONING + MODULES
P.append(page(f"""<p class="kicker">HeeLIKS · Positioning and modules</p><h1>Inventory, POS and distributor order-to-cash on one stock ledger</h1>
<div class="grid g2" style="grid-template-columns:36% 64%"><div>
<h2>Positioning</h2><p style="font-size:8.4pt;line-height:1.35">A multi-tenant inventory, point-of-sale and B2B order-to-cash platform for stock-driven Indian businesses. Every purchase, sale, return, transfer and count posts to one append-only stock ledger, in a database that belongs to that customer alone.</p>
<h2 style="margin-top:3mm">Problem it solves</h2><p style="font-size:8.4pt;line-height:1.35">Spreadsheet stock plus a separate till: stock and sales drift apart, expiry is found too late, GST is rebuilt every month, shared logins leave no trail.</p>
<h2 style="margin-top:3mm">Who buys and uses it</h2>{ul(["<b>Buyer:</b> owner or proprietor of an outlet or chain; MD or finance head of a distributor", "<b>Influencers:</b> store manager, accountant or CA", "<b>Users:</b> Owner/Admin, Manager, Cashier, Store staff, Auditor, plus the HeeLIKS operator", "<b>Verticals:</b> pharmacy, retail and fashion, grocery and kirana, bookstores, industrial spares"])}
<h2 style="margin-top:3mm">Commercials (from code and site)</h2>{ul(["Starter ₹999, Growth ₹2,999, Business ₹5,999 a month; quarterly and yearly cycles", "Perpetual on-premise ₹7.5 L + optional 5% AMC from year two", "Add-ons ₹599/user and ₹699/outlet a month; 14-day trial; Razorpay"])}</div>
<div>{tbl(["Module", "What it does (verified)", "Screens"], [
 ["Point of Sale", "Barcode/SKU search, FEFO batch pick, role-capped discounts, split tender (cash, card, UPI, credit), park, thermal/A4/email receipts", "S, X"],
 ["Registers", "Opening float, counted close, Z-report with variance", "S"],
 ["Returns & notes", "Invoice lookup, restock or write-off, credit notes, s.34 credit/debit notes", "R"],
 ["Catalog", "SKU, HSN, MRP, barcodes, Code128 labels, brands, UoM, tax classes, import", "C"],
 ["Inventory", "Append-only ledger, batches and expiry, adjustments, transfers, counts, locations", "I"],
 ["Procurement", "PO draft → approve → receive, GRN with batch/expiry, supplier returns, reorder → PO", "U"],
 ["Partners", "One party master; GSTIN, credit days and limits, opening balances", "P, B"],
 ["B2B order-to-cash", "Orders reserve stock, invoice from order, challans with LR/e-way ref, POD, receipts, customer ledger, AR aging, order book, collections", "B"],
 ["Dashboard", "Live KPIs, trend, top products, alerts, outlet switcher", "D"],
 ["Reporting", "21 reports + hub; Excel, PDF, CSV", "Q, E"],
 ["GST compliance", "CGST/SGST/IGST, GSTR-1 export, HSN, gapless series audit", "Q"],
 ["Alerts", "Low-stock and expiry alerts, email, auto-resolve", "T"],
 ["Onboarding & import", "Go-live checklist, workbook and Tally XML import, dry-run, commit, undo, reconciliation, history archive", "O"],
 ["Security", "Enforced TOTP, backup codes, lockout, one session per user, idle expiry", "A"],
 ["RBAC & audit", "10 permissions, 5 roles + custom, discount caps, field-level audit diffs", "T, V"],
 ["Settings", "Outlet profile, tax, invoice templates, users, help manual", "T"],
 ["Subscription", "Plans, add-ons, usage meters, trial, grace, suspension gate", "T, W"],
 ["Platform console", "Fleet KPIs, provisioning, lifecycle, module overrides, payments, audit", "M"],
 ["Website & signup", "Self-serve signup → payment → provisioning", "W"],
 ["REST API", "Tenant-scoped, RBAC-checked: products, stock, sales", "T"]], ["21%", "67%", "12%"])}</div></div>""", "", nxt(), D))

# 5 HEELIKS SCREEN MAPPING
P.append(page(f"""<p class="kicker">HeeLIKS · Screenshot evidence</p><h1>181 captures cover every module; the coverage map has no gaps</h1>
<div class="grid g2" style="grid-template-columns:44% 56%"><div>
{tbl(["Group", "Module", "Count"], [["A", "Sign-in and two-factor", 6], ["B", "B2B orders, challans, receipts, ledger, AR", 19], ["C", "Catalog and masters", 10], ["D", "Dashboard", 4], ["E", "Exported documents", 7], ["I", "Inventory", 9], ["M", "Platform console", 12], ["O", "Onboarding and import", 9], ["P", "Partners", 2], ["Q", "Reports", 23], ["R", "Returns and notes", 6], ["S", "POS, invoices, registers", 9], ["T", "Settings, audit, API", 10], ["U", "Procurement", 8], ["V", "Role-based views", 8], ["W", "Website and signup", 11], ["X", "Dark mode", 3], ["Z", "Four industry workspaces", 25]], ["12%", "72%", "16%"])}</div>
<div><h2>What the coverage file represents</h2><p style="font-size:8.4pt;line-height:1.35">HeeLIKS_coverage.csv is the product team's traceability matrix. Each row ties a module, feature or USP to a persona, a live URL, the screenshot that proves it and the source-deck slide that shows it. 22 modules, 89 features and 16 USPs, all <i>covered</i>. It is identical to HeeLIKS_deck_work/coverage.csv. We will reuse it as the screenshot index for the new deck and catalogue.</p>
<h2 style="margin-top:3mm">Quality</h2>{ul(["163 of 181 captures are 2400 × 1500; the rest are full-page or A4 exports. All are sharp enough for full-width use.", "All data is a seeded demo: MediCare Pharmacy, Urban Threads, FreshMart, Page Palace Books and Titan Equipment & Spares. These are fictional workspaces and will be labelled “(demo data)”.", "One caution: “Titan” is also a well-known Indian brand. We will caption that workspace as a demo industrial distributor so it is never read as a customer.", "No real personal or client data seen. Demo emails use .local or example domains."])}
<h2 style="margin-top:3mm">Best hero screens</h2><p style="font-size:8.4pt;line-height:1.35">D02 dashboard · S12 POS split tender · I01 stock overview · I02 batches & expiry · U02 PO detail · B06 order with timeline · B12 challan with POD · Q05 GSTR-1 · O01 go-live · T07 audit diff · M03 console · V02 discount cap.</p></div></div>""", "", nxt(), D))

# 6 HEELIKS SOURCE DECK ASSESSMENT
P.append(page(f"""<p class="kicker">HeeLIKS · Source deck assessment</p><h1>Rich, honest content in the wrong system, and too many unreadable thumbnails</h1>
<div class="grid g2" style="grid-template-columns:42% 58%"><div><img class="thumb" src="{(CS/'Deck_HeeLIKS_Enterprise_Sales_Deck_2.jpg').as_uri()}"><p class="cap">Source slides 17–32 as rendered in PowerPoint.</p>
<h2 style="margin-top:3mm">Keep</h2>{ul(["Five-pillar structure (Sell, Stock & Buy, Distribute, Insight & Comply, Govern & Scale)", "Code-counted numbers with a source line; roadmap clearly separated", "Speaker notes with evidence on every slide"])}</div>
<div><h2>Fix</h2>{tbl(["Issue", "Where", "Action"], [
 ["Off-system design", "All 54", "Rebuild on the locked MavionTech layouts, type and Midnight + Amber"],
 ["3–4 screenshots per slide, unreadable", "17, 23, 30, 32, 36, 39, 40, 44, 46", "One hero screen plus at most one inset; crop to the area that proves the point"],
 ["54 slides, much repetition", "10, 31–32, 40, 44, 46, 47", "Merge to about 42 slides without losing module depth"],
 ["No workflow diagrams", "Purchasing, order-to-cash, import", "Add native diagrams: procure-to-stock, order-to-cash, stage → dry-run → commit → undo"],
 ["“Five industry editions”", "4, 7, 45", "Qualify as five verticals configured at signup; not separate editions"],
 ["“Over 1,000 SKUs, perfectly organised”", "14", "Title from capability, not demo data"],
 ["“Live in days” and the 4-week rollout", "33, 34, 52", "Keep, labelled indicative"],
 ["Website: “Uptime engineered”, “Live in 60 seconds”, “Nine modules”", "heeliks.com", "Not reused: no uptime evidence; module count is out of date (code has 16 apps, B2B included)"],
 ["No pricing or deployment slide", "—", "Add plans and the on-premise licence from code"]], ["34%", "22%", "44%"])}
<h2 style="margin-top:3mm">Not available (flag, do not invent)</h2><p style="font-size:8.4pt;line-height:1.35">Customer references, testimonials, certifications, SLA and uptime, implementation fees. Also e-invoice (IRN) and e-way bill <i>generation</i>: today only the e-way bill number is recorded, and both are on the roadmap.</p></div></div>""", "", nxt(), D))

# 7 VYAAS POSITIONING + MODULES
P.append(page(f"""<p class="kicker">Vyaas AI · Positioning and modules</p><h1>Cited answers, finished documents and a coding agent, under organisation governance</h1>
<div class="grid g2" style="grid-template-columns:36% 64%"><div>
<h2>Positioning</h2><p style="font-size:8.4pt;line-height:1.35">An enterprise AI assistant platform. Teams chat with leading models over their own documents, with a citation on every grounded answer. They generate Word, PowerPoint, Excel and images, and hand engineering tasks to a sandboxed coding agent that commits and opens pull requests. All of it runs under organisation policy, audit and a token-optimisation engine. Tagline: <i>“Answers you can cite. Code you can ship.”</i></p>
<h2 style="margin-top:3mm">Problem it solves</h2><p style="font-size:8.4pt;line-height:1.35">AI pilots stall: answers without sources, company data in consumer tools with no policy or audit, copilots that suggest lines but don't ship work, and token bills nobody can predict.</p>
<h2 style="margin-top:3mm">Who buys and uses it</h2>{ul(["<b>Buyer:</b> CTO, Head of Engineering, IT Director", "<b>Users:</b> engineers, analysts and knowledge workers, operations; Owner, Admin and Member roles", "<b>Market:</b> India-origin, priced in INR and USD (Razorpay and Stripe)"])}
<h2 style="margin-top:3mm">Commercials (from code)</h2>{ul(["7 tiers: Guest, Free, Plus, Pro, Max, Team (per seat, minimum 3), Enterprise", "Pro $29 or ₹2,499 a month; Team $25 or ₹2,099 per seat; 2 months free on annual", "Metered in Sonnet-equivalent tokens; GST at checkout"])}</div>
<div>{tbl(["Pillar · Module", "What it does (verified)", "Screens"], [
 ["Converse · Chat", "Streaming chat, extended thinking, attachments, clarifying-question cards, per-chat model, effort and web toggles", "7"],
 ["Converse · Knowledge Base", "Collections, upload and ingestion, BM25 retrieval, numbered citations", "2"],
 ["Converse · Documents", "docx, pptx, xlsx, csv, md, html and images from chat; personal library", "2"],
 ["Converse · Assistants", "Custom assistants with model, tools, knowledge and instructions; templates; sharing", "2"],
 ["Converse · Tools", "Web search, web fetch, code execution; per-user preferences, plan gating", "1"],
 ["Build · Coding Agent", "Resumable agent in a gVisor sandbox, no network by default; files, diff, terminal; 3 run modes with a destructive-command gate; Git import, commit, push, PR (GitHub); Connect companion", "4 (no PR screen)"],
 ["Govern · Organizations", "Owner/Admin/Member, invites, policies, shared assets, audit log", "5"],
 ["Govern · Token Optimisation Engine", "L1–L3 pipeline: tool pruning, history compaction, attachment selection, guarded compression; per-message savings", "via analytics"],
 ["Govern · Model Catalogue", "Provider-agnostic: Claude and OpenAI models, per-plan gating", "composer, policies"],
 ["Govern · Billing & Plans", "Tiers, usage allowance, checkout, credits", "3"],
 ["Govern · Analytics", "Tokens and cost by model, day and member", "2"],
 ["Govern · Admin console", "Platform dashboard, per-user report, grant credits, suspend", "2"],
 ["Govern · Notifications", "Task done, approval needed, document ready, invites, plan events", "1"],
 ["Platform · Accounts", "Email sign-in (allauth), guest trial", "1"]], ["27%", "58%", "15%"])}</div></div>""", "", nxt(), D))

# 8 VYAAS SCREEN MAPPING
P.append(page(f"""<p class="kicker">Vyaas AI · Screenshot evidence</p><h1>31 sharp captures; five planned screens were never taken</h1>
<div class="grid g2" style="grid-template-columns:50% 50%"><div><img class="thumb" src="{(CS/'Vyaas_screens_1.jpg').as_uri()}"><p class="cap">25 of the 31 Vyaas captures (all 2400 × 1500, dark theme, demo organisation “Northwind Robotics”).</p></div>
<div>{tbl(["Planned capture (deck_work/coverage.csv)", "Status"], [
 ["Agent session with pull request (w_session)", GAP + " · the headline “Code you can ship” has no screen"],
 ["New workspace / Git import (w_create)", GAP + " · w_index shows the create panel"],
 ["Analyze an attachment (chat_attach)", GAP],
 ["Optimised prompt receipt (chat_optimised)", GAP + " · savings shown only in analytics"],
 ["Global search (search)", GAP],
 ["All other 31 planned captures", OK]], ["58%", "42%"])}
<h2 style="margin-top:3mm">Implications</h2>{ul(["Coding-agent slides will use w_detail (files, diff, terminal, task rail), w_providers and w_connect, plus a native workflow diagram. The PR step is verified in code (apps/workspace/gitops.py) and will be described, not shown.", "Dark screenshots read poorly when shrunk. The new deck will use fewer, larger screens with tight crops.", "Demo users (for example arjun@northwind.io) are fictional seed data and will be labelled demo data.", "The pricing screen lists model names (Sonnet 5.5, Opus 5.5, GPT-5.5). These are correct in the code today but will date, so slides will say “Claude and OpenAI models”."])}
<p style="font-size:9pt;margin-top:2mm"><span class="pill pa">Optional</span> If MavionTech can capture w_session and chat_optimised, the two strongest differentiators gain screen proof. The build does not wait for this.</p></div></div>""", "", nxt(), D))

# 9 VYAAS SOURCE DECK ASSESSMENT
P.append(page(f"""<p class="kicker">Vyaas AI · Source deck assessment</p><h1>A clear story with overlaps, low contrast and one wrong number</h1>
<div class="grid g2" style="grid-template-columns:42% 58%"><div><img class="thumb" src="{(CS/'Deck_Vyaas_Enterprise_Sales_Deck_2.jpg').as_uri()}"><p class="cap">Source slides 17–30 as rendered in PowerPoint.</p>
<h2 style="margin-top:3mm">Keep</h2>{ul(["Three pillars: Converse & Create, Build & Ship, Govern & Scale", "Eight differentiators, each tied to code", "Roadmap kept apart from shipped features"])}</div>
<div><h2>Fix</h2>{tbl(["Issue", "Where", "Action"], [
 ["Off-system dark theme", "All 30", "Rebuild on MavionTech layouts; dark slides only where the system allows"],
 ["Labels overlap screenshots", "13, 17, 25", "Rebuild layouts; PowerPoint overlap check"],
 ["Wordmark “AI” illegible on dark", "1, 30", "Use the mark plus a live-text product name"],
 ["“5 plan tiers”", "4", "<span class='bad'>Wrong.</span> Code has 7 tiers (6 public); correct it"],
 ["Pricing shown as USD only in notes, INR on screen", "22", "Show both, as the product does"],
 ["“Data isolation”", "7, 20, 27", "Qualify: organisation-scoped data, encrypted secrets, self-hostable. Not a database per tenant"],
 ["No workflow diagrams for RAG, agent or optimiser", "10, 16, 23", "Add native diagrams: ingest → retrieve → cite; task → sandbox → approve → PR; L1–L3 pipeline"],
 ["“Live in weeks” rollout; “deploy on your VPS”", "28", "Keep, labelled indicative; the deploy scripts exist (deploy/install.sh)"],
 ["Very small grey body text on dark", "Many", "System minimum: body 11 pt, captions 11 pt"]], ["34%", "16%", "50%"])}
<h2 style="margin-top:3mm">Not available (flag, do not invent)</h2><p style="font-size:8.4pt;line-height:1.35">Customers, testimonials, certifications, measured token savings (the engine reports savings per message, but there is no portfolio-wide %), uptime and SLA, data-residency statement. GitLab, OAuth Git connect, and push/PR from Connect are roadmap.</p></div></div>""", "", nxt(), D))

# 10 PROPOSED OUTLINES
HL = ["Cover", "The problem", "Meet HeeLIKS", "At a glance (code-counted)", "Who it serves", "Product map: 5 pillars, 20 modules", "Differentiators",
      "<b>Sell</b> · divider", "Point of sale", "Counter features: park, receipts, keys", "Registers and Z-report", "Returns and credit notes",
      "<b>Stock & Buy</b> · divider", "Catalog and masters", "Inventory ledger (diagram)", "Batches, FEFO and expiry alerts", "Counts, transfers, adjustments", "Procure-to-stock workflow (diagram)", "Purchase orders and GRN", "Reorder and supplier returns", "Partners",
      "<b>Distribute</b> · divider", "Order-to-cash workflow (diagram)", "Sales orders", "Dispatch, challans and POD", "Receipts, ledger and AR aging",
      "<b>Insight & Comply</b> · divider", "Owner dashboard", "21 reports (matrix)", "GST compliance", "Documents and exports",
      "<b>Govern & Scale</b> · divider", "Go-live and import (diagram)", "Security and sign-in", "Roles, caps and audit", "Subscription and platform console",
      "Architecture: database per tenant", "Integrations and stack", "Five verticals", "Today vs with HeeLIKS", "Plans and deployment", "Indicative rollout", "Roadmap (planned)", "Close"]
VY = ["Cover", "The problem", "Meet Vyaas AI", "At a glance (code-counted)", "Who it's for", "Product map: 3 pillars, 14 modules", "Differentiators",
      "<b>Converse & Create</b> · divider", "Chat", "Cited answers (diagram)", "Knowledge Base", "Documents and images", "Assistants", "Tools",
      "<b>Build & Ship</b> · divider", "Coding agent workflow (diagram)", "Agent workspace", "Safe autonomy: sandbox layers", "Git providers and Connect",
      "<b>Govern & Scale</b> · divider", "Organizations and members", "Policies and audit", "Shared assets", "Token Optimisation Engine (diagram)", "Usage analytics", "Plans and billing (7 tiers)", "Admin console and notifications", "Multi-model catalogue",
      "Architecture", "Security and data handling", "Today vs with Vyaas", "Deployment and indicative rollout", "Roadmap (planned)", "Close"]
def ol2(items, c=2): return f'<ol class="olc" style="font-size:8.6pt;line-height:1.3;margin:0;padding-left:6mm;column-count:{c};column-gap:6mm">' + "".join(f"<li>{i}</li>" for i in items) + "</ol>"
def ol(items, start=1): return f'<ol start="{start}" style="font-size:7.6pt;line-height:1.22;margin:0;padding-left:6mm">' + "".join(f"<li>{i}</li>" for i in items) + "</ol>"
CAPT = '<p class="cap" style="margin-top:3mm">Built with the approved generator (mt.js, deckkit.js), the six-deck layouts, Calibri, Midnight + Amber and the product accent. Every screen is a real capture labelled “(demo data)”; every slide has notes with sources; planned items are labelled. Change log as .docx, as for the six approved decks.</p>'
P.append(page(f"""<p class="kicker">Proposed structure · HeeLIKS</p><h1>{len(HL)} slides: five pillars, with depth matched to 20 modules</h1>
<div class="card">{ol2(HL, 3)}</div>{CAPT}""", "", nxt(), D))
P.append(page(f"""<p class="kicker">Proposed structure · Vyaas AI</p><h1>{len(VY)} slides: three pillars, with diagrams where screens cannot show the mechanism</h1>
<div class="card">{ol2(VY, 3)}</div>{CAPT}""", "", nxt(), D))

# 11 DESIGN + CATALOGUE IMPACT
SW = lambda c: f'<span class="sw" style="background:#{c}"></span>#{c}'
P.append(page(f"""<p class="kicker">Design system and catalogue impact</p><h1>Two new accents inside the locked system; eight targeted catalogue edits</h1>
<div class="grid g2"><div><h2>Product accents (the only permitted variation)</h2>
{tbl(["Product", "Own brand colour", "Clash", "Proposed accent"], [
 ["HeeLIKS", SW("1E40AF") + " brand", "PragyanNxt " + SW("1C3F94"), SW("0369A1") + " <b>Ocean</b>, from HeeLIKS sky " + SW("0EA5E9") + "; 5.9:1 on white"],
 ["Vyaas AI", SW("3048F0") + " mark", "Agastya " + SW("2563EB") + ", Vortex " + SW("4F46E5"), SW("7C3AED") + " <b>Iris</b>, from the violet in the Vyaas logo and UI; 5.7:1 on white"]], ["16%", "22%", "26%", "36%"])}
<p style="font-size:8.6pt;margin-top:2mm">Both proposals meet the Brand Guidelines' 4.5:1 rule and are traceable to each product's own palette. Iris sits near MavionLearn's violet (#6D4AFF), but the two never share a buyer domain. Alternative for Vyaas: keep its own blue #3048F0 and accept closeness to Agastya.</p>
<h2 style="margin-top:3mm">Category placement</h2>{ul(["<b>HeeLIKS:</b> a new “Commerce & operations” domain (inventory, POS, distribution)", "<b>Vyaas AI:</b> a new “AI & engineering productivity” domain", "Existing domains (education, people and talent, revenue) stay unchanged"])}</div>
<div><h2>Catalogue changes (CHECKPOINT 3)</h2>{tbl(["Slide", "Change"], [
 ["Back up", "Copy the approved Final PPTX and PDF to Corporate_Catalogue/Previous_Versions/"],
 ["1, 2, 3, 4", "“Six” → “Eight”; catalogue brief adds two rows; milestones line"],
 ["5–7", "Technology focus and problems: add evidence lines for the two products where true (AI, GST)"],
 ["9–13", "Portfolio overview, ecosystem map, categories, capability matrix and industries extended to eight"],
 ["New", "HeeLIKS showcase (5 slides) and Vyaas AI showcase (4 slides) after SalesPulse, same templates as the existing six"],
 ["41 Security", "<span class='bad'>Qualify</span> “dedicated database per customer in all six”: true for HeeLIKS, not for Vyaas"],
 ["46–51", "Achievements, opportunities, commercial models, why MavionTech: add the new products' verified facts"],
 ["All", "Page references, footer numbering, PowerPoint QA on all ~61 slides"]], ["18%", "82%"])}
<p class="cap" style="margin-top:2mm">The existing six showcases are not touched. “Inward Logistics” and “Trackline” in the “Also in the portfolio” line may overlap with HeeLIKS; their names stay as they are, flagged for MavionTech.</p></div></div>""", "", nxt(), D))

# 12 MISSING INFO
P.append(page(f"""<p class="kicker">Open items</p><h1>What MavionTech can supply to strengthen both products</h1>
{tbl(["Item", "Product", "Effect today", "Owner"], [
 ["Customer references, testimonials, case studies", "Both", "None claimed; slides use capability proof only", "Sales"],
 ["Pull-request and optimised-prompt screenshots", "Vyaas AI", "Agent PR shown by diagram and text", "Product"],
 ["Live heeliks.com check", "HeeLIKS", "Site down during audit; copy taken from repo templates", "Marketing"],
 ["Uptime, SLA, support hours, certifications", "Both", "Not claimed (website's “uptime engineered” dropped)", "Leadership"],
 ["Data residency and hosting region for cloud", "Both", "Deployment described without region", "Product"],
 ["Measured token savings (portfolio %)", "Vyaas AI", "Described qualitatively; per-message receipts only", "Product"],
 ["e-Invoice (IRN) and e-way bill generation dates", "HeeLIKS", "Roadmap, no dates", "Product"],
 ["Vector logos", "Both", "PNG marks (1254 px, 640 px) are sharp enough for decks", "Brand owner"],
 ["Product relationship to “Inward Logistics” and “Trackline”", "HeeLIKS", "Names left as they are in the catalogue", "Leadership"],
 ["Accent approval", "Both", "Proposed on page 12", "This review"]], ["34%", "13%", "38%", "15%"])}
<div class="card" style="margin-top:5mm"><p><b>Recommendation.</b> Approve the positioning (pages 4 and 7), the outlines (pages 10–11) and the accents (page 12). The two decks will then be built and QA'd in PowerPoint and presented together at Checkpoint 2. None of the open items blocks the build.</p></div>""", "tint", nxt(), D))

html = f"<!doctype html><html><head><meta charset='utf-8'><style>{CSS2}</style></head><body>{''.join(P)}</body></html>"
hp = B / "HeeLIKS_Vyaas_Source_Audit.html"; hp.write_text(html, encoding="utf-8")
out = OUTDIR / "HeeLIKS_Vyaas_Source_Audit.pdf"
subprocess.run([EDGE, "--headless", "--disable-gpu", "--no-pdf-header-footer", f"--print-to-pdf={out}", hp.as_uri()], check=True, timeout=180)
print("written", out, len(P), "pages")
