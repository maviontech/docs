# -*- coding: utf-8 -*-
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from p2_build import new_doc, cover, table, para, bullets, footer
OUT = r"D:/MavionTech_sales_MavionTech_Transformation/Final_Product_Decks/MavionLearn/MavionLearn_Change_Log.docx"

d = new_doc("MavionLearn Change Log")
cover(d, "MavionLearn — Change Log", "Sales deck (16 slides) + investor deck (21 slides) → MavionLearn_Final.pptx (23 slides)", "6D4AFF")

d.add_heading("1. Summary", level=1)
bullets(d, [
 "One customer-facing deck built on the approved MavionTech design system, using the MavionLearn accent #6D4AFF and the MavionLearn logo mark taken from the investor deck.",
 "Investment content was deliberately excluded:",
 "    market size, 'why now', revenue model, pre-revenue status, team placeholder and the vision horizons.",
 "    Product facts from the investor deck were used only where they also describe the product: admin console, delegated admins, unified learning, learner home, platform modules and the comparison table.",
 "All 12 modules now appear in the deck, grouped into five capabilities: Learn, Measure, Comply, Report, Govern.",
 "15 real product screenshots are used. The source has no screenshot folder, so every screen was extracted from the two decks, which only hold 800 px images.",
 "Contact details are the official MavionTech details, replacing sales@ and hello@ and the mavionlearn.com domain.",
 "Every slide has speaker notes. All text is editable and all diagrams are native shapes.",
])

d.add_heading("2. Slide-by-slide mapping", level=1)
rows = [
 (1, "Cover", "S1 / I1", "Rebuilt", "MavionLearn mark, promise and three proof chips; admin dashboard plus learner home screenshots."),
 (2, "Problem", "S2 / I2", "Merged", "Six pains: the four from the sales deck plus 'fragmented learning' and 'ROI invisible' from the investor deck."),
 (3, "Solution", "S3", "Restyled", "Three pillars plus a framed admin dashboard."),
 (4, "Who it serves", "—", "Added", "Six personas: L&D/HR admins, delegated admins, compliance leads, managers, learners, IT."),
 (5, "Platform", "S4 / I15", "Rewritten", "12 modules in five capabilities, plus an 'isolated database per customer' band."),
 (6, "Why MavionLearn", "S5", "Rewritten", "Six USPs, each pointing to the slide that proves it."),
 (7, "Catalog & courses", "I7", "Added", "Course admin screenshot; authoring, lifecycle, SCORM and targeted delivery."),
 (8, "Live & on-demand", "S10 / I10", "Rewritten", "The 'layout mockups' were replaced with real screens: the ILT/VILT sessions admin and the learner catalog."),
 (9, "Skill matrix", "S6 / I8", "Restyled", "Flagship slide; 73.6% labelled as demo data."),
 (10, "Grow & development plans", "S9 / I14", "Added", "Grow view screenshot: gaps → recommended courses → development plans."),
 (11, "Compliance campaigns", "S7 / I9", "Rewritten", "Campaign builder plus a six-step workflow (rule → assign → remind → complete → certify → renew)."),
 (12, "Compliance evidence", "I9", "Added", "Compliance report and learner certificates."),
 (13, "Enterprise reporting", "S8 / I11", "Restyled", "Reports workspace with four features."),
 (14, "Cost & ROI", "S11 / I11", "Restyled", "Rs 1,800 labelled as demo data."),
 (15, "Learner experience", "S9 / I14", "Restyled", "My Learning screenshot."),
 (16, "People & administration", "I7 / I12", "Added", "Bulk onboarding, delegated admins, org-driven audiences; native org diagram (department names illustrative)."),
 (17, "Identity & security", "S12 / I12", "Restyled", "SSO settings screenshot."),
 (18, "Standards & integrations", "—", "Added", "OIDC, SAML 2.0, SCIM 2.0, SCORM, LTI 1.3, API, .ics, Cloudflare R2/S3."),
 (19, "Architecture", "S13 / I13", "Redrawn", "Native diagram: users and identity → application controls → per-tenant databases and media → operations."),
 (20, "Operated with confidence", "S13", "Added", "Tenants console plus observability screenshots."),
 (21, "Why MavionLearn (comparison)", "I16", "Moved", "Generic LMS vs MavionLearn (no named competitors)."),
 (22, "Getting started", "S14 / S16", "Rewritten", "Trial → deploy → onboard → first campaign. No price table (see section 4)."),
 (23, "Close", "S16 / I21", "Rewritten", "Trial / demo call to action and the official contact card."),
]
table(d, ["New #", "New slide", "Was (S = sales, I = investor)", "Change", "Detail"], rows, [1.2, 3.4, 2.4, 1.8, 8.2], size=8.5)

d.add_heading("3. Factual integrity decisions", level=1)
bullets(d, [
 "Removed 'Proven multi-tenant architecture — running in production' (sales slide 15). It conflicts with the investor deck's 'pre-revenue'; commercial status is still unconfirmed.",
 "Video player and live-classroom images are not used: the sales deck itself captions them as layout mockups.",
 "Login screen not used: it shows a 'SOC 2-ready' badge, which is unverified.",
 "xAPI is not claimed (it appears only in the investor deck). LTI 1.3 and API are claimed as listed in the sales deck's Premium tier.",
 "Mobile is not claimed: the sales pricing lists 'Mobile' while the investor roadmap lists native apps as 'Next'.",
 "All figures shown (73.6%, 86%, Rs 1,800, Rs 2,23,200) come from the demo tenant and are labelled as demo data.",
 "The generic-LMS comparison describes common patterns and names no competitor.",
])

d.add_heading("4. Open items", level=1)
bullets(d, [
 "Pricing tiers: the sales and investor decks assign SSO, skills and development plans to different tiers. Confirm the price list to add a pricing slide (Trial / Starter Rs 49 / Pro Rs 99 / Premium Rs 199).",
 "Confirm commercial status (in production vs launching) before any customer-count wording.",
 "Supply full-resolution screenshots (at least 1,600 px); current images are 800 px and look soft at large sizes. Real video-player and live-classroom screenshots are also needed.",
 "Confirm that xAPI, LTI 1.3 and the API are live, and the mobile app status.",
 "Supply the MavionLearn logo as a vector file. The mark used here was taken from a raster image in the investor deck.",
])

d.add_heading("5. Quality assurance", level=1)
bullets(d, [
 "Every slide was rendered and inspected in Microsoft PowerPoint; the PDF was exported by PowerPoint.",
 "The first build would not open in PowerPoint: a leftward connector on slide 16 had a negative width, which the schema validator does not catch.",
 "    Fixed with a safe connector helper (flipped lines).",
 "    A scripted check for negative extents now runs on every deck.",
 "Fixes made during PowerPoint review:",
 "    a title wrapping onto content; sidebar crops clipping content on low-resolution screens (full app view is now used); two titles ending in full stops; the close-slide button label; spacing on the getting-started slide.",
 "Final checks:",
 "    Schema validation passed; zero negative extents; no empty placeholders; speaker notes on all 23 slides.",
 "    File size 2.6 MB (PowerPoint) and 1.1 MB (PDF).",
])
footer(d, "MavionTech · MavionLearn Change Log · 10 Nov 2026")
d.save(OUT); print("saved", OUT)
