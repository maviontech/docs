# -*- coding: utf-8 -*-
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from p2_build import new_doc, cover, table, para, bullets, footer
OUT = r"D:/MavionTech_sales_MavionTech_Transformation/Final_Product_Decks/Vortex/Vortex_Change_Log.docx"

d = new_doc("Vortex HRMS Change Log")
cover(d, "Vortex HRMS — Change Log", "vortex-sales-light.pptx (25 slides) → Vortex_Final.pptx (23 slides)", "4F46E5")

d.add_heading("1. Summary", level=1)
bullets(d, [
 "Rebranded as 'Vortex HRMS' (as you confirmed), using the official V mark from vortexhrms.com and the indigo accent #4F46E5. www.vortexhrms.com is named on the cover and close.",
 "Rebuilt on the approved MavionTech design system with a full-strength MavionTech endorsement and the official contact card. The placeholder phone '+91 XXXXX XXXXX' is replaced.",
 "The source deck had no product screenshots, and no app access was available. The deck therefore uses:",
 "    the public sign-in page of vortexhrms.com, captured at 2× resolution and cropped to remove unverified badges;",
 "    native, editable diagrams: a hub, the lifecycle, attendance-to-payroll, the payroll close and approval routing.",
 "    No mock-up screens were invented.",
 "Coverage: all 14 modules, plus the add-ons and the platform layer.",
 "Premium modules that previously had no slides now each have one: Performance; Expense, Assets & Helpdesk; HR Docs & LMS.",
 "New from the published privacy policy: the SnapLens attendance app, the VortexGo background-location feature and its privacy safeguards.",
 "Speaker notes added to every slide; the original had none.",
])

d.add_heading("2. Slide-by-slide mapping", level=1)
rows = [
 (1, "Cover", "1", "Rebuilt", "V mark, promise, chips; vortexhrms.com sign-in tiles and sign-in card (claims cropped out)."),
 (2, "Status quo", "5", "Restyled", ""),
 (3, "One platform, one record", "4 + 6", "Merged", "Native hub diagram plus unified / intelligent / secure."),
 (4, "Built for every people role", "—", "Added", "Six personas."),
 (5, "Product map", "7", "Rewritten", "Base bundle, premium modules, attendance and mobile add-ons, platform layer."),
 (6, "Employee lifecycle", "8", "Rewritten", "Six-stage lifecycle strip plus four capabilities, including secure onboarding uploads."),
 (7, "Smart attendance", "9", "Rewritten", "Six capability cards; InsightFace noted."),
 (8, "Field & mobile workforce", "—", "Added", "VortexGo, SnapLens, location sharing and eight privacy safeguards (from the privacy policy)."),
 (9, "Leave & comp-off", "11", "Rewritten", "Six capability cards."),
 (10, "From attendance to payslip", "—", "Added", "Native input → lock → engine → output diagram."),
 (11, "Payroll engine", "10", "Rewritten", "Five-step close plus six capabilities, including multi-entity payroll."),
 (12, "Approvals & workflows", "13", "Rewritten", "Native routing diagram plus four capabilities."),
 (13, "Employee self-service", "—", "Added", "Base-bundle ESS and company policies."),
 (14, "Performance management", "—", "Added", "Goals → self-appraisal → review → appeals → reports."),
 (15, "Expenses, assets & helpdesk", "12", "Expanded", "Three module cards."),
 (16, "HR documents & learning", "—", "Added", "Includes the Signet / MavionLearn upgrade path (portfolio strategy)."),
 (17, "Security & privacy", "19", "Rewritten", "Verified controls only (see section 3)."),
 (18, "Technology", "15", "Rewritten", "Stack cards. 'SSO ready' is not claimed."),
 (19, "Where Vortex wins", "18", "Restyled", ""),
 (20, "Pricing", "20 + 21", "Merged", "₹45 base plus the premium and add-on price menu (list prices from the source deck)."),
 (21, "Example plans", "22", "Restyled", "Totals re-verified: 45 + 49 + 19 + 19 = 132; full platform = 313."),
 (22, "Roadmap", "23", "Restyled", "Live today / next / later."),
 (23, "Close", "24 + 25", "Merged", "45-minute working session → 30-day pilot; official contacts."),
 ("—", "Deleted", "2, 3, 14, 16, 17", "Removed", "Agenda; 'About MavionTech' (unverified 15+ engineers / global claims); illustrative deployments; savings ranges. Slide 14 is folded into 3 and 19."),
]
table(d, ["New #", "New slide", "Was", "Change", "Detail"], rows, [1.2, 3.6, 2.2, 1.7, 8.3], size=8.5)

d.add_heading("3. Claims removed or held back", level=1)
table(d, ["Claim", "Source", "Decision"], [
 ("99.99% uptime SLA; 24×7 live support", "Old deck slide 19; vortexhrms.com", "Removed and cropped from the screenshots: unverified, and conflicts with 99.9% on maviontech.com"),
 ("AES-256 / end-to-end encryption; multi-region; region of residency", "Old deck; vortexhrms.com", "Held back until evidenced"),
 ("ISO 27001 aligned; SOC 2 in progress; GDPR-ready", "Old deck; vortexhrms.com", "Held back until evidenced"),
 ("Illustrative deployments (8 → 1 tools, 40 offices, 12×)", "Old deck slide 16", "Removed: could be read as customer results"),
 ("Savings ranges (−30–45% vendor cost, −70% audit findings, 1–3% payroll)", "Old deck slide 17", "Removed: unsourced"),
 ("15+ engineers; serving customers globally", "Old deck slide 3", "Removed: unverified"),
 ("SSO ready", "Old deck slide 15", "Not claimed: unclear whether it is live"),
], [6.0, 4.5, 6.5], size=9)
para(d, "Security controls that are shown come from the deck and the published privacy policy: database per customer, company-code sign-in, a separate tenant admin portal, access and IP policies, role-based access, audit logging, and the privacy policy itself.", size=9.5)

d.add_heading("4. Open items", level=1)
bullets(d, [
 "App access or screenshots (at least 1,600 px) for every module, plus the VortexGo and SnapLens apps. This is the single biggest improvement still available for this deck.",
 "Evidence for the SLA, encryption, residency and compliance statements on vortexhrms.com. They should also be reviewed on the website, where they are currently published.",
 "Target segment: 200–20,000 employees (deck) vs SMBs and mid-size enterprises (maviontech.com).",
 "Portfolio overlaps: HR docs vs Signet, LMS vs MavionLearn, and the recruitment roadmap vs ProtonNxt. The deck currently follows the proposed positioning.",
 "SnapLens: confirm its positioning and platform.",
])

d.add_heading("5. Quality assurance", level=1)
bullets(d, [
 "Every slide was rendered and inspected in Microsoft PowerPoint; the PDF was exported by PowerPoint.",
 "Fixes made during review:",
 "    two card headings wrapping into their body text; a two-line title; unused space on the comparison slide; undersized roadmap text.",
 "Final checks:",
 "    Schema validation passed; zero negative extents; no empty placeholders; speaker notes on all 23 slides.",
 "    File size 2.3 MB (PowerPoint) and 0.7 MB (PDF).",
])
footer(d, "MavionTech · Vortex HRMS Change Log · 10 Nov 2026")
d.save(OUT); print("saved", OUT)
