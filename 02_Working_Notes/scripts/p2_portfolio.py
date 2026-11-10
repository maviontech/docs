# -*- coding: utf-8 -*-
import os, sys, importlib
sys.path.insert(0, os.path.dirname(__file__))
from p2_build import new_doc, cover, table, para, bullets, footer, landscape, portrait, OUT, COMPANY, NAVY, GREY
from docx.shared import Pt

d = new_doc("Portfolio Positioning Strategy")
cover(d, "Portfolio Positioning Strategy", "Six products, one MavionTech story", "0A1F44")

d.add_heading("1. Purpose", level=1)
para(d, "This document sets the positioning, brand architecture, messaging rules and storyline framework shared by the six product "
        "presentations (Agastya, MavionLearn, PragyanNxt, ProtonNxt, SalesPulse CRM, Vortex HRMS) and the corporate product catalogue. "
        "The individual Content Architecture documents hold product-level detail and slide blueprints.")

d.add_heading("2. Confirmed company facts (official website, inspected 10 Nov 2026)", level=1)
table(d, ["Item", "Official value", "Source"], [
 ("Brand / entity", "MavionTech · MavionTech Pvt. Ltd. (footer) · MavionTech Private Limited (About)", "maviontech.com"),
 ("Tagline", "Momentum with Vision", "maviontech.com"),
 ("Descriptor", "Enterprise Business Applications", "Home page"),
 ("Address", "Office no. 505, Zen Business Center, Bhumkar Chowk, Wakad, Pune, Maharashtra, India 411057 (visits by appointment)", "Footer / Contact"),
 ("Sales & support", "communications@maviontech.com · +91 91580 08002", "Contact page"),
 ("Careers", "hr@maviontech.com", "Contact page"),
 ("Milestones", "2023 training foundation under Sukrit EnVision Academy → 2024 shift to product development → 2025 launched as an independent product company", "Company page"),
 ("Mission", "Automate and simplify operational workflows with secure, extensible enterprise software that empowers teams to focus on what matters most.", "Company page"),
 ("Vision", "Create intelligent digital ecosystems that help teams move faster, make better decisions, and transform the way organizations operate.", "Company page"),
 ("Promise", "Production-grade UX, predictable performance, and maintainable integrations — built for real teams solving real problems.", "Company page"),
 ("Deployment", "Cloud, private cloud or on-premises; managed hosting; backup & DR (Platform page); on-prem for enterprise (Contact FAQ)", "maviontech.com"),
 ("Verticals", "Staffing & HR; IT companies; EdTech; consulting firms; finance/service providers; MSMEs", "Home page"),
], [3.2, 10.3, 3.5], first_bold=True)
para(d, "Website figures that still need evidence before slide use: 40% manual-work reduction, 2x productivity, 60% visibility, 99.9% uptime, "
        "100+ enterprise users, 24/7 support, 'hundreds of businesses'. Vortex site: 99.99% SLA, 24x7 live support, GDPR-ready, multi-region ready. "
        "These are company-published, but they conflict with each other and are unevidenced. Under the claims policy (section 8) they appear only once confirmed.", italic=True, size=9)

d.add_heading("3. Naming decisions (approved / recommended)", level=1)
table(d, ["Product", "Use this name", "Retire / avoid", "Status"], [
 ("Agastya", "Agastya — Cloud School ERP", "'Agastya System', 'Agastya college' (site image caption)", "Recommended"),
 ("MavionLearn", "MavionLearn", "—", "Recommended"),
 ("PragyanNxt", "PragyanNxt (wordmark 'PRAGYAN NXT')", "Evalynx (old name), on website, company PDF and deck-source", "APPROVED by MavionTech"),
 ("ProtonNxt", "ProtonNxt (ATS)", "Protonnxt, PROTONNXT; domain mvtech.in", "Recommended (matches website)"),
 ("SalesPulse CRM", "SalesPulse CRM", "Entity 'Mavion Technologies Pvt. Ltd.'", "Recommended; catalogue inclusion to confirm"),
 ("Vortex HRMS", "Vortex HRMS (product); VortexGo (employee app); SnapLens (attendance app)", "'HRMS' / 'Mavion HRMS' as a standalone product name", "APPROVED by MavionTech"),
], [2.8, 4.8, 5.4, 4])

d.add_heading("4. Portfolio map", level=1)
table(d, ["Product", "Category", "Primary buyer", "Core promise", "Flagship differentiator"], [
 ("Agastya", "School ERP (K-12)", "School group / owner / principal", "Run every operation, see every school, govern every record", "Database-per-school + self-configurable cockpits + school-owned WhatsApp"),
 ("MavionLearn", "Enterprise LMS / skills & compliance", "CHRO, L&D, Compliance", "Prove capability, not completions", "Living skill matrix vs role targets"),
 ("PragyanNxt", "Assessment, proctoring & certification", "Hiring heads; exam controllers; certification bodies", "Results you can defend, credentials anyone can verify", "Signed, verifiable credentials + camera-free integrity score"),
 ("ProtonNxt", "ATS for recruitment firms & TA teams", "Staffing firm owner; TA head", "Requisition to hire in one structured, AI-assisted pipeline", "Client Engagement Analytics + cross-tenant candidate portal"),
 ("SalesPulse CRM", "India-first sales CRM", "Sales director / business owner", "Reps sell without owning your customers' data", "Two-way privacy-masked calling"),
 ("Vortex HRMS", "HR, attendance & payroll", "CHRO, CFO/payroll, operations", "Hire to retire, attendance to payroll, on one record", "Face-AI attendance feeding policy-first payroll"),
], [2.6, 3, 3.2, 4.2, 4])

d.add_heading("5. What unites the portfolio (the MavionTech platform story)", level=1)
para(d, "Evidence-backed themes that recur across products. Use them in the corporate narrative instead of generic claims:")
table(d, ["Theme", "Agastya", "MavionLearn", "PragyanNxt", "ProtonNxt", "SalesPulse", "Vortex"], [
 ("Database-per-tenant isolation", "Yes", "Yes", "Yes", "Yes", "Yes", "Yes"),
 ("Role-based access & audit trails", "Yes (96 codes, before/after)", "Audit, delegated admin", "RBAC, activity log", "RBAC, append-only audit", "RBAC, access log", "RBAC, audit"),
 ("India-first commercial fit", "INR, UPI, TC/Bonafide", "INR pricing", "INR option", "CTC structure (PF, gratuity)", "GST, Razorpay", "PF/ESI/PT/TDS"),
 ("Self-service configuration", "Dashboards, toggles, fields", "SSO policy, campaigns", "Plans, entitlements", "Custom schema, scoring weights", "Report builder", "No-code workflows, module toggles"),
 ("Mobile", "Student app", "API for mobile (app planned)", "—", "Recruiter app", "Android app", "VortexGo, SnapLens"),
 ("Branded exports", "Report cards, invoices", "Excel + PDF", "Report PDFs, certificates", "Multi-sheet XLSX", "Multi-sheet Excel", "Payslips, 42 letters"),
 ("AI where it helps", "—", "Recommendations (roadmap)", "Generation, summaries, visual proctoring", "GPT/Gemini parsing", "—", "Face-AI"),
], [3.6, 2.2, 2.2, 2.2, 2.4, 2.2, 2.2], size=8)
para(d, "Recommended corporate line: 'MavionTech builds enterprise business applications where every customer's data lives in its own database, "
        "and every operation is role-governed, audited and configurable without code.' Each part is proven by at least five of the six products.", bold=True, size=9.5)

d.add_heading("6. Overlaps and cross-sell positioning", level=1)
table(d, ["Overlap / adjacency", "Recommended positioning", "Decision owner"], [
 ("Vortex HR Document Generation vs Signet", "Vortex: letters are part of the HR record. Signet: standalone document automation for organisations without Vortex. Do not compare them on slides.", "MavionTech product"),
 ("Vortex Learning (LMS module) vs MavionLearn", "Vortex LMS = basic training & certifications for HR suites. MavionLearn = enterprise skills & compliance cloud. Position MavionLearn as the upgrade path.", "MavionTech product"),
 ("Vortex roadmap 'Recruitment & ATS' vs ProtonNxt", "Present ProtonNxt as the recruitment answer; keep Vortex roadmap wording generic until decided.", "MavionTech product"),
 ("ProtonNxt AI parsing vs Serene", "ProtonNxt = full ATS; Serene = parsing/matching engine. Out of current scope.", "MavionTech product"),
 ("PragyanNxt + ProtonNxt", "Natural cross-sell: screening assessments inside hiring. Mention only as a pairing; no integration claim unless built.", "Sales"),
 ("PragyanNxt + MavionLearn", "Verifiable certification for learning programmes. Pairing only.", "Sales"),
 ("Agastya exams vs PragyanNxt", "Agastya = school internal exams & report cards; PragyanNxt = secure/remote and certifying assessment.", "Sales"),
 ("MavionMeet inside ProtonNxt", "MavionMeet is a separate catalogue product (website). Mention it as the built-in video provider.", "—"),
 ("Agastya visitor log vs Visitor Management", "Agastya's log is a school front-office feature; VMS is the enterprise product.", "—"),
], [4.4, 9.4, 3.2], size=8.5)

d.add_heading("7. Brand architecture direction (for the design phase)", level=1)
bullets(d, [
 "Model: endorsed brands. Each product keeps its name, logo and accent colour. Every deck carries the same MavionTech endorsement ('A MavionTech product'), header lockup on cover and close, footer, typography, grid, screenshot frame and close slide.",
 "MavionTech amber (#F5A623, sampled ~#F0A010 from the logo) is the single shared accent. Product accents: Agastya #2563EB; MavionLearn #5A4BF0; PragyanNxt navy/blue with gold; ProtonNxt #1BA6A6; SalesPulse indigo/teal; Vortex #4F46E5→#0891B2 gradient (official mark).",
 "Assets available: MavionTech logo PNG (359px), PragyanNxt logo and mark, Vortex SVG mark (inspected on vortexhrms.com). Still needed: vector MavionTech logo and logos for Agastya, MavionLearn, ProtonNxt and SalesPulse.",
 "Design system details (type scale, layouts, icon set, chart style) are for the design phase and will be proposed for approval separately.",
])

d.add_heading("8. Messaging & claims policy", level=1)
table(d, ["Claim type", "Rule", "Example"], [
 ("Code-derived metrics", "Allowed with a source line and date.", "Agastya: 19 apps, 128 models, 257 tests (review Nov 2026)"),
 ("Demo-data figures", "Allowed only with a 'demo data' label.", "MavionLearn 73.6% capability match"),
 ("Product capability", "Allowed when visible in a screenshot or stated in product source. UNCERTAIN items need confirmation.", "Agastya Trigger Engine (uncertain)"),
 ("Roadmap", "Allowed only on a clearly labelled roadmap slide.", "Agastya online fee payment"),
 ("Customer names, logos, counts", "Not allowed without written confirmation.", "Agastya landing page '65 clients'"),
 ("Certifications & compliance", "Exact wording of what is held, with evidence.", "ISO 27001 / SOC 2 / GDPR"),
 ("SLA / uptime / support hours", "One confirmed company figure only.", "99.9% vs 99.99% vs 99.997% conflict"),
 ("ROI / savings / productivity %", "Not allowed without a sourced study.", "Vortex −70% audit findings; company 300% ROI"),
 ("Market statistics", "Investor material only, with full citation.", "MavionLearn $27.4B"),
 ("Personal / client data in visuals", "Never. Use demo identities.", "ProtonNxt slides 8, 36"),
], [3.6, 6.4, 7], size=8.5)

d.add_heading("9. Storyline framework", level=1)
para(d, "All decks follow one narrative arc, but the number and depth of slides scale with product complexity:")
table(d, ["Act", "Purpose", "Typical slides"], [
 ("1. Why change", "Problem in buyer language, without invented statistics", "Cover, problem, (cost of status quo)"),
 ("2. Meet the product", "Promise, personas, module map, USPs", "Solution, personas, workflow, module map"),
 ("3. Proof, module by module", "Real screenshots and specific capabilities, one outcome-led title per slide", "Majority of the deck"),
 ("4. Trust & fit", "Security, architecture, integrations, deployment", "Governance, architecture, tech, integrations"),
 ("5. Commercials & next step", "Packaging (if confirmed), rollout, roadmap, close with official contacts", "Pricing, rollout, roadmap, close"),
], [3.4, 8, 5.6])
table(d, ["Product", "Proposed slides", "Modules covered", "Why this length"], [
 ("Agastya", "32", "19", "Widest product: 19 modules, 8 personas, a SaaS console"),
 ("ProtonNxt", "27 (from 42)", "16", "Deep, but the current deck repeats itself; consolidated"),
 ("SalesPulse CRM", "25", "14", "Flagship USP needs a three-slide proof sequence"),
 ("Vortex HRMS", "23", "14", "Premium modules were missing; field-attendance and payroll flow added"),
 ("PragyanNxt", "22", "8", "Fewer modules, but certification and integrity need proof slides"),
 ("MavionLearn", "21", "12", "Sales narrative only; investor content excluded"),
], [3.2, 3, 3, 7.8])
para(d, "Each product will also get a 12–15 slide executive cut in the design phase.", italic=True, size=9)

d.add_heading("10. Corporate product catalogue — recommended structure", level=1)
bullets(d, [
 "Front matter: MavionTech identity (official facts only), the platform story (section 5), verticals served, how to engage (demo → pilot → proposal).",
 "Product sections grouped by buyer: Education (Agastya, PragyanNxt); People & Talent (Vortex HRMS, ProtonNxt, MavionLearn); Revenue (SalesPulse CRM).",
 "Each product gets a 2–4 page spread: positioning, module map, 3–4 hero screenshots, USPs, deployment and integrations, contact.",
 "Other catalogue products on the website (MPP, MavionMeet, Signet, Visitor Management, SETU, Trackline, Serene, Inward Logistics, Vanguard, C2H, Club & Entertainment): include a one-line index page only if MavionTech wants the full catalogue. Decision needed.",
])

d.add_heading("11. Decisions requested before design", level=1)
bullets(d, [
 "Approve the six slide architectures (see the product documents and the summary below).",
 "Approve the endorsed-brand model and the claims policy.",
 "Confirm SalesPulse CRM's place in the catalogue (not on the website).",
 "Choose catalogue scope: the six products only, or the six plus an index of other products.",
 "Supply missing logos and screenshots or app access (Vortex in particular), and confirm the UNCERTAIN Agastya features.",
 "Confirm which pricing may appear externally (Agastya, MavionLearn, SalesPulse, PragyanNxt allowances, Vortex).",
])

landscape(d)
d.add_heading("Appendix — Slide architecture summary for all six products", level=1)
mods = ["p2_agastya", "p2_mavionlearn", "p2_pragyannxt", "p2_protonnxt", "p2_salespulse", "p2_vortex"]
loaded = [importlib.import_module(x) for x in mods]
maxn = max(len(m.SLIDES) for m in loaded)
rows = []
for i in range(maxn):
    rows.append([i + 1] + [(m.SLIDES[i][0] if i < len(m.SLIDES) else "") for m in loaded])
table(d, ["#"] + [m.NAME for m in loaded], rows, [0.7, 4.3, 4, 4, 4.3, 4, 4], size=7)
portrait(d)
para(d, COMPANY, size=8, color=GREY)
footer(d, "MavionTech · Portfolio Positioning Strategy · Draft for approval · 10 Nov 2026")
d.save(os.path.join(OUT, "Portfolio_Positioning_Strategy.docx")); print("saved")
