# -*- coding: utf-8 -*-
import sys
sys.path.insert(0, r"C:/Users/santv/AppData/Local/Temp/claude/ceb30a0b29d97199/97aa59f3-2742-4bc8-8bca-ae8a00cd0eaa/scratchpad")
from p2_build import new_doc, cover, table, para, bullets, footer, landscape, portrait
OUT = r"D:/MavionTech_sales_MavionTech_Transformation/Final_Product_Decks/Agastya/Agastya_Change_Log.docx"

d = new_doc("Agastya Change Log")
cover(d, "Agastya — Change Log", "Agastya_Enterprise_Sales_Deck.pptx (32 slides) → Agastya_Final.pptx (32 slides)", "2563EB")

d.add_heading("1. Summary", level=1)
bullets(d, [
 "Rebuilt the entire deck on the approved MavionTech design system:",
 "    Midnight + Amber; the Agastya accent #2563EB; the ring motif; framed screenshots; Calibri; all five slide layouts.",
 "Slide count is unchanged at 32, but the deck is restructured into seven sections: Opening, Platform, Command & governance, Academics, Engagement, Operations & finance, Campus life, Platform & architecture, Value & next steps.",
 "All 19 product modules now appear in the deck. Visible-but-under-explained capabilities from the screenshot audit were added where the interface confirms them.",
 "Uncertain features were left out and recorded in section 6.",
 "Contact details are now the official MavionTech details (maviontech.com). Roadmap items are on their own slide, clearly labelled PLANNED.",
 "The deck is fully editable:",
 "    Native text, shapes and diagrams. Screenshots are the only images. Every slide has speaker notes. Titles and kickers sit in real layout placeholders.",
])

d.add_heading("2. Slide-by-slide mapping", level=1)
rows = [
 (1, "Cover", "1 Cover", "Rebuilt", "New design system cover. Product name and promise in layout placeholders. Two framed screenshots (a01, s01)."),
 (2, "The challenge", "2", "Restyled", "Same four pains as icon cards."),
 (3, "Meet Agastya", "3", "Rewritten", "Title shortened to fit one line. Hero screenshot is now the principal cockpit (r01) instead of a01, to avoid repeating the cover."),
 (4, "At a glance", "4", "Fixed", "Module-count inconsistency fixed ('19 integrated application modules', matching the module map). Source line kept."),
 (5, "Product map", "6", "Rewritten", "Was 18 modules in five pillars; now 19 modules in six pillars. Platform setup & branding and Administration & RBAC added. 'One data model' band added."),
 (6, "Personas", "5", "Restyled", "Eight role cards with icons."),
 (7, "Command center", "7", "Restyled", "Hero screenshot plus feature column."),
 (8, "Role cockpits", "8", "Rewritten", "Principal, teacher and student cockpits (r01, t01, s05). Replaced the accountant and parent dashboards because those screenshots show empty panels."),
 (9, "Configurable by design", "9", "Rewritten", "Builder, permission matrix and feature toggles with numbered callouts. Branding, numbering and custom fields covered in the notes."),
 (10, "Governance & security", "25", "Moved", "Moved forward to the Command & governance section; seven controls shown as chips."),
 (11, "Student lifecycle", "10", "Rewritten", "Five-step lifecycle strip added. Guardian upload links shown with their specifics (7-day validity; SMS, email or WhatsApp; no login)."),
 (12, "Timetable & substitution", "11", "Restyled", "Notes now cover the bell schedule, working days, rooms and teacher assignments."),
 (13, "Attendance", "12", "Rewritten", "Quick-capture screen (a57) is now the hero. Daily registers mentioned."),
 (14, "Homework & classwork", "13", "Restyled", "Two screenshots plus a four-feature row."),
 (15, "Results day", "14", "Rewritten", "Marks entry, progress tracker and exam definitions (a56) with callouts."),
 (16, "Report cards", "15", "Rewritten", "Three columns: printable report card, publish control, family results view."),
 (17, "Portals", "24", "Rewritten", "Four columns: student portal, syllabus, fee ledger, parent feed. Notes state that no mobile screenshots are available."),
 (18, "Communications", "23", "Restyled", "WhatsApp inbox hero. Trigger Engine deliberately not claimed (unconfirmed)."),
 (19, "Fees & billing", "16", "Restyled", "Online parent payment stated in the notes as roadmap only."),
 (20, "Staff operations & HR", "17", "Rewritten", "Directory, leave queue and onboarding. The empty staff-attendance screen (a42) is not used. Biometric sync not claimed."),
 (21, "Transport", "18", "Restyled", "Notes state live GPS tracking is roadmap only."),
 (22, "Library", "19", "Rewritten", "Library reports screen (a54) added."),
 (23, "Hostel, health & discipline", "20", "Restyled", "Three columns."),
 (24, "Inventory & procurement", "21", "Restyled", "Asset register only. Inventory and PO screens show placeholder names, so they are left out."),
 (25, "Front office", "22", "Restyled", "Title shortened to fit one line."),
 (26, "Multi-tenant SaaS", "26", "Rewritten", "Plan screenshot (x03, shows 'Razorpay keys missing') replaced with the create-tenant form (x02)."),
 (27, "Architecture", "27", "Redrawn", "Native-shape diagram in the design system."),
 (28, "Technology", "28", "Restyled", "Dark slide with six cards. The on-premise claim moved to notes as 'confirm before promising'."),
 (29, "Why Agastya", "29", "Rewritten", "Today vs With Agastya table plus four differentiators."),
 (30, "Rollout", "30", "Restyled", "Timeline; 'indicative' label kept and emphasised."),
 (31, "Roadmap", "31", "Restyled", "Each item tagged PLANNED, with a statement that they are not available today."),
 (32, "Close", "32", "Rewritten", "Added the official contact card: communications@maviontech.com, +91 91580 08002, www.maviontech.com, Pune address."),
]
table(d, ["New #", "New slide", "Was", "Change", "Detail"], rows, [1.2, 3.4, 1.4, 2, 9], size=8.5)

d.add_heading("3. Content changes", level=1)
bullets(d, [
 "Module count reconciled: 19 modules, consistent across slides 1, 4 and 5.",
 "Capabilities confirmed in the interface and now covered:",
 "    Guardian upload-link details; daily registers; exam definitions (subject papers, grading scales, admit cards); library reports; timetable foundations (bell schedule, working days, rooms); create-tenant fields (code, timezone, currency, locale, plan).",
 "Roadmap kept separate: online fee payment, payroll, multi-channel broadcast, scheduled reports, live bus GPS, teacher/parent apps.",
 "Speaker notes rewritten for every slide. They include factual caveats (demo environment, roadmap items, items to confirm).",
 "No customer names, testimonials, certifications, uptime figures or ROI numbers were added.",
 "The landing-page claims (65 clients, named schools, 99.9% / 99.997% uptime) are not used.",
])

d.add_heading("4. Screenshots used and excluded", level=1)
para(d, "Used (48 of 79): a01, a03, a04, a05, a07, a08, a11, a14, a15, a16, a17_report_card_pdf, a20, a21, a22, a24, a27, a29, a30, a31, a32, a34, a35, a36, a37, a40, a41, a43, a44, a45, a47, a50, a52, a54, a56, a57, a58, a59, a60, g02, r01, s01, s02, s03, s04, s05, t01, x01, x02.")
table(d, ["Excluded", "Reason"], [
 ("a18_class_summary", "Application error page (Django NameError). App bug to fix before recapture."),
 ("x03_subscriptions", "Shows a 'Razorpay keys missing' warning."),
 ("p01_landing, p02_login", "Carry unverified claims (65 clients, named schools, uptime figures)."),
 ("a06, a10, a42, a53, x04, g01, g03, c01", "Empty states, or panels that contradict the dashboard figures."),
 ("a19_top_performers", "Seed artefact: identical scores for every student."),
 ("a38, a39", "Generic placeholder item and vendor names."),
 ("a17_full, a09, a13, a23, a25, a26, a28, a33, a46, a48, a49, a51, a55, t02", "Not needed: a stronger screenshot covers the same point, or the screen is a sparse form. Available for an extended version."),
], [5.5, 11.5], size=9)
para(d, "Still used but should be recaptured: a44 (audit log) and a45 (login events) show demo labels (SEED_CREATE, demo_* users, 127.0.0.1). They are captioned neutrally; please recapture after realistic activity.", italic=True, size=9)

d.add_heading("5. Design system applied", level=1)
bullets(d, [
 "Layouts: MT_COVER, MT_CONTENT, MT_CONTENT_TINT, MT_DARK and MT_CLOSE. The close-slide layout (MT_CLOSE) was added to the system during this build.",
 "Slide patterns used (no two neighbouring slides share the same layout):",
 "    hero + feature column (mirrored), main + two stacked with numbered callouts, two screenshots + feature row, 3- and 4-column screenshot grids, icon-card grids, stat tiles, native diagrams, dark comparison and roadmap.",
 "Screenshots are cropped by script (sidebar removed for close-ups) and stored as high-quality JPEG. File size fell from 44 MB to 7.5 MB with no visible loss.",
])

d.add_heading("6. Open items (flagged, not on slides)", level=1)
bullets(d, [
 "Confirm before presenting:",
 "    Trigger Engine (Communications); Sync Biometric Hub (staff attendance); the 'Infrastructure' setting; student-portal 'School Online' and 'Time Management'.",
 "Pricing: plans are visible in the app (Starter / Growth / Enterprise) but not approved for external use, so there is no pricing slide.",
 "Student mobile app: no screenshots are available. Supply them to add a mobile slide.",
 "Confirm whether colleges are a target segment (the official site captions Agastya 'college').",
 "On-premise deployment: technically possible per the original deck notes; confirm the commercial offer.",
 "Recapture a44/a45 without demo labels, and fix the class-summary page (a18).",
])

d.add_heading("7. Quality assurance", level=1)
bullets(d, [
 "Rendered and inspected every slide in Microsoft PowerPoint (slide export via automation). LibreOffice was not used for sign-off.",
 "Issue found and fixed:",
 "    The first build showed empty layout placeholders ('Product name', 'One-line promise', title prompts) behind the slide text in PowerPoint.",
 "    All titles, kickers and cover text now fill the layout placeholders. A scripted check confirms there are no empty placeholders on any slide.",
 "Other fixes during QA:",
 "    two titles wrapping onto content; sidebar-dominated cockpit and portal crops; an over-long callout; empty space under the column grids.",
 "File checks: schema validation passed; no folder entries in the zip; opens in PowerPoint with no repair prompt; the PDF was exported by PowerPoint.",
 "The approved design-system decks (prototype and reusable layouts) had the same placeholder issue. Both were corrected, re-checked in PowerPoint, and the design-system PDFs were refreshed from the PowerPoint renders.",
])
footer(d, "MavionTech · Agastya Change Log · 10 Nov 2026")
d.save(OUT); print("saved", OUT)
