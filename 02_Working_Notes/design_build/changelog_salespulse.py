# -*- coding: utf-8 -*-
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from p2_build import new_doc, cover, table, para, bullets, footer
OUT = r"D:/MavionTech_sales_MavionTech_Transformation/Final_Product_Decks/SalesPulse_CRM/SalesPulse_CRM_Change_Log.docx"

d = new_doc("SalesPulse CRM Change Log")
cover(d, "SalesPulse CRM — Change Log", "SalesPulse_CRM_Sales_Deck.pptx (26 slides) → SalesPulse_CRM_Final.pptx (25 slides)", "D63B42")

d.add_heading("1. Summary", level=1)
bullets(d, [
 "Rebuilt on the approved MavionTech design system with the SalesPulse coral accent #D63B42.",
 "The original pulse glyph is placed on a coral tile as the product mark.",
 "    The in-app icon is indigo; confirm whether the product icon should adopt coral.",
 "Entity name corrected from 'Mavion Technologies Pvt. Ltd.' to MavionTech Pvt. Ltd. The MavionTech endorsement and official contact card are added (previously missing).",
 "All 14 modules are covered.",
 "New slides: personas, a rep's day end to end, the module map, how masking works (a two-way diagram), architecture, a comparison, and how pricing works.",
 "Emoji icons were replaced with the design-system line icons.",
 "The late-added slides (email/WhatsApp, Android, data protection), which had no slide numbers or notes, are now fully integrated.",
 "Every slide has speaker notes.",
])

d.add_heading("2. Slide-by-slide mapping", level=1)
rows = [
 (1, "Cover", "1", "Rebuilt", "Pulse mark, MavionTech endorsement, dashboard plus masked-dialer screenshots."),
 (2, "Problem", "2 + 3", "Merged", "Six problems; the unsourced '5+ hrs lost per rep' figure is removed."),
 (3, "Solution", "4", "Rewritten", "Capture / protect / run / report, plus the director dashboard."),
 (4, "Who uses SalesPulse", "—", "Added", "BDE, Manager, Director, Admin, with row-level access explained."),
 (5, "A rep's day, end to end", "—", "Added", "Five-step workflow: queue → masked call → outcome → follow-up → weekly report."),
 (6, "Product map", "5", "Rewritten", "14 modules in four groups."),
 (7, "My Day", "6", "Restyled", ""),
 (8, "Lead management", "12", "Restyled", ""),
 (9, "Pipeline", "13", "Restyled", ""),
 (10, "Customer 360", "14", "Restyled", "Captioned as the leadership view: reps see masked contact details."),
 (11, "Masked calling (flagship)", "7", "Restyled", ""),
 (12, "How masking works", "—", "Added", "Native outbound and inbound diagram; calling rates; bring-your-own telephony."),
 (13, "In the call and after it", "8 + 9", "Merged", "In-call and after-call screenshots."),
 (14, "Email & WhatsApp", "10 + 11", "Merged", "Six capability cards (no screenshots exist)."),
 (15, "Activity log", "15", "Restyled", ""),
 (16, "Command center", "16", "Restyled", ""),
 (17, "Reports", "17 + 18", "Merged", "Report builder plus weekly reports."),
 (18, "Data protection", "23", "Restyled", "Dark slide with six controls."),
 (19, "Native Android app", "19", "Restyled", "Four cards plus a note; no iOS claim."),
 (20, "Subscriptions & billing", "20", "Rewritten", "Uses the GST invoice screen. The plan-card screen (conflicting prices) is not used."),
 (21, "Security & architecture", "24", "Rewritten", "Native isolation diagram plus a platform control-center screenshot."),
 (22, "Why SalesPulse", "21", "Rewritten", "Generic CRM vs SalesPulse, plus four differentiators."),
 (23, "How pricing works", "22", "Rewritten", "Per-seat software, pay-as-you-go calling and the free trial. The tier table is held back (see section 3)."),
 (24, "Getting started", "25", "Restyled", ""),
 (25, "Close", "26", "Rewritten", "Official contact card."),
]
table(d, ["New #", "New slide", "Was", "Change", "Detail"], rows, [1.2, 3.6, 1.6, 1.8, 8.8], size=8.5)

d.add_heading("3. Pricing conflict (held back)", level=1)
table(d, ["Source", "Basic", "Starter", "Growth", "Enterprise"], [
 ("Original deck, slide 22", "₹980 (2 seats)", "₹559 (5 seats)", "₹1,049 (25 seats)", "₹2,099"),
 ("In-app billing screen, plan cards", "—", "₹799", "₹1,499", "₹2,999"),
 ("In-app billing screen, 'change plan'", "₹980", "₹559", "₹1,049", "—"),
], [5, 2.7, 2.7, 2.9, 2.7], size=9)
para(d, "Because the sources disagree, and Basic costs more per user than Starter, the final deck shows only the pricing model:", size=9.5)
bullets(d, [
 "per-seat software, with GST 18% extra;",
 "calling at ₹0.50 per leg-minute, 30-second pulse;",
 "a 30-day free trial covering 5 seats and 2,000 leads.",
 "Please confirm the price list so the tier slide can be added.",
])

d.add_heading("4. Factual integrity", level=1)
bullets(d, [
 "All screenshots show demo data (for example Orbit Retail, Riverstone Hotels, 'V. Director', Asha Nair).",
 "The platform console is cropped so its tenant list, which includes test tenants such as 'Probe Co', is not shown.",
 "Not claimed: iOS, a named telephony provider, specific verticals, or the unsourced '5+ hrs' statistic.",
 "The comparison describes common generic-CRM patterns and names no competitor.",
 "SalesPulse is not listed on maviontech.com. Its place in the catalogue still needs to be decided.",
])

d.add_heading("5. Open items", level=1)
bullets(d, [
 "Confirm the price list (section 3).",
 "Confirm the telephony partner and DLT/TRAI compliance for masked calling.",
 "Capture full-resolution screens (source images are 800 px) for:",
 "    the email composer, WhatsApp templates, the Android app, the access log and the watermark.",
 "Confirm the product domain (salespulse.maviontech.com), the product icon colour, and whether SalesPulse belongs in the official catalogue.",
])

d.add_heading("6. Quality assurance", level=1)
bullets(d, [
 "Every slide was rendered and inspected in Microsoft PowerPoint; the PDF was exported by PowerPoint.",
 "Fixes made during review:",
 "    a two-line title colliding with a section label; empty space on the Android slide; a note overlapping cards.",
 "Final checks:",
 "    Schema validation passed; zero negative extents; no empty placeholders; speaker notes on all 25 slides.",
 "    File size 2.5 MB (PowerPoint) and 1.0 MB (PDF).",
])
footer(d, "MavionTech · SalesPulse CRM Change Log · 10 Nov 2026")
d.save(OUT); print("saved", OUT)
