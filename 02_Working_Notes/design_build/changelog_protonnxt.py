# -*- coding: utf-8 -*-
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from p2_build import new_doc, cover, table, para, bullets, footer
OUT = r"D:/MavionTech_sales_MavionTech_Transformation/Final_Product_Decks/Protonnxt/Protonnxt_Change_Log.docx"

d = new_doc("ProtonNxt Change Log")
cover(d, "ProtonNxt — Change Log", "Protonnxt_Sales_Demo_Revised.pptx (42 slides, 20.6 MB) → Protonnxt_Final.pptx (27 slides, 4.1 MB)", "0B8282")

d.add_heading("1. Summary", level=1)
bullets(d, [
 "42 slides were consolidated to 27 with no module lost. All 15 modules are covered.",
 "The 'Latest additions' section (vendor management, calendar & video, mobile app) is now part of the main flow.",
 "Rebuilt on the approved MavionTech design system:",
 "    ProtonNxt accent teal #0B8282, with the ProtonNxt atom mark taken from the original deck. Speaker notes added to all slides (the original had none).",
 "Naming standardised to 'ProtonNxt' (as on maviontech.com). The mvtech.in domain and the inconsistent 'Protonnxt' / 'PROTONNXT' casing are removed.",
 "Privacy: six screenshots that appear to contain real tenant data (client companies, candidates and staff) were excluded. Every screenshot used shows demo-tenant data.",
 "Implementation jargon (resume_upload_batches, PUBSUB, show_in_reports) was rewritten in buyer language.",
 "Official MavionTech contact card on the close slide. protonnxt.com is held back until confirmed.",
])

d.add_heading("2. Slide-by-slide mapping", level=1)
rows = [
 (1, "Cover", "1", "Rebuilt", "Atom mark; promise; admin dashboard plus candidate status (demo)."),
 (2, "Where hiring breaks down", "—", "Added", "Six problems, each mapped to a module."),
 (3, "One platform, three experiences", "3 + 4", "Merged", "Three surfaces plus three outcome pillars."),
 (4, "Who uses ProtonNxt", "—", "Added", "Six personas, including vendor users and candidates."),
 (5, "The hiring lifecycle", "—", "Added", "Native lifecycle with module numbers and supporting modules."),
 (6, "Product map", "5 + 6", "Merged", "15 modules in five groups; 'no add-ons'; beta label kept."),
 (7, "Admin dashboard", "7 + 8", "Merged", "Uses the demo-tenant dashboard (slide 7 image). The slide 8 image (possible real clients) is excluded."),
 (8, "Job requisitions", "9", "Restyled", ""),
 (9, "Sourcing & intake", "10 + 11 + 12", "Merged", "Bulk upload screen with sourcing channels and AI parsing."),
 (10, "Applicant tracking", "13 + 16", "Merged", "Uses the demo candidate-status screen. The slide 13 pipeline (real candidate names) is excluded."),
 (11, "Assignment & collaboration", "14 + 15", "Merged", "Uses the demo team screen. The slide 14 assignment screen (real clients and staff) is excluded."),
 (12, "Interviews, calendar & video", "16 + 39", "Merged", "Native flow plus cards; the MavionMeet diagram image is not reused."),
 (13, "Offer management", "17", "Restyled", ""),
 (14, "Vendor management", "38", "Rebuilt", "Native flow plus cards, replacing the diagram image."),
 (15, "Candidate portal", "18 + 35 + 36", "Merged", "Dark cards. The slide 36 screenshot (a real person's details) is excluded."),
 (16, "Reports & analytics", "19 + 20", "Merged", "Candidate reports screen. The slide 19 team-reports image (real staff) is excluded."),
 (17, "Executive summary", "21 + 22", "Merged", "Full-width screen with four numbered callouts."),
 (18, "Search & builder", "23 + 24", "Merged", "Attribute builder plus skill search."),
 (19, "Client engagement analytics (beta)", "25 + 26 + 29", "Merged", "Leaderboard plus segments and explainability."),
 (20, "Compare & tune", "27 + 28 + 30", "Merged", "Compare and settings screens."),
 (21, "Mobile recruiter app", "40", "Rebuilt", "Dark capability cards, replacing the diagram image."),
 (22, "Settings & administration", "31 + 32 + 33", "Merged", "Sessions and subscription. The slide 31 access screen (real staff emails) is excluded."),
 (23, "Custom candidate schema", "34", "Restyled", ""),
 (24, "Architecture & security", "—", "Added", "Native diagram: surfaces → application controls → per-tenant data → integrations."),
 (25, "Integrations", "—", "Added", "OpenAI, Gemini, MavionMeet, Razorpay, email, ICS, XLSX, WhatsApp and calls."),
 (26, "Why ProtonNxt", "41", "Rewritten", "Eight USPs. The claim 'beats every ATS you have evaluated' is removed."),
 (27, "Close", "42", "Rewritten", "Official contacts. 'Proven at enterprise scale' is removed (unverified)."),
 ("—", "Deleted", "2, 37", "Removed", "Section dividers ('Executive overview', 'Latest additions')."),
]
table(d, ["New #", "New slide", "Was", "Change", "Detail"], rows, [1.2, 3.6, 2.0, 1.7, 8.5], size=8.5)

d.add_heading("3. Privacy review of screenshots", level=1)
table(d, ["Original slide", "Content", "Decision"], [
 ("8 · Admin dashboard", "Company names that may be real clients (e.g. CredenTek, SAMS Advanced Climatic Technologies)", "Excluded"),
 ("13 · Candidate pipeline", "Candidate names linked to the same real requisitions (JD417 etc.)", "Excluded"),
 ("14 · JD assignment", "Real client companies and staff team names", "Excluded"),
 ("19 · Team reports", "Staff names matching @simplyfydsolutions.com accounts", "Excluded"),
 ("31 · Access & permissions", "Staff names and @simplyfydsolutions.com emails", "Excluded"),
 ("36 · Candidate portal", "A real person's name, email and phone number", "Excluded"),
 ("All others used", "Demo tenant: TechCorp Solutions, Nova Retail Systems, FinEdge Analytics, Helios Health Labs; demo users such as Aarav Mehta", "Used"),
], [4, 8.5, 4.5], size=9)

d.add_heading("4. Open items", level=1)
bullets(d, [
 "Capture demo-tenant screens for:",
 "    the candidate pipeline cards; JD assignment; team reports; the candidate portal; the vendor portal; the calendar & MavionMeet interview flow; mobile app screens. These modules currently use native diagrams or cards.",
 "Confirm before presenting:",
 "    job-board and LinkedIn integrations (listed on maviontech.com but not in the product deck); the mobile platform (iOS/Android); when Client engagement analytics leaves beta.",
 "Pricing and packaging (none in the source).",
 "Confirm protonnxt.com and protonnxt.com/demo as public domains.",
])

d.add_heading("5. Quality assurance", level=1)
bullets(d, [
 "Every slide was rendered and inspected in Microsoft PowerPoint; the PDF was exported by PowerPoint.",
 "Fixes made during review:",
 "    a two-line group heading on the product map; a caption touching a note on the sourcing slide.",
 "Final checks:",
 "    Schema validation passed; zero negative extents; no empty placeholders; speaker notes on all 27 slides; no titles ending in full stops.",
 "    File size 4.1 MB (PowerPoint), down from 20.6 MB, and 2.0 MB (PDF).",
])
footer(d, "MavionTech · ProtonNxt Change Log · 10 Nov 2026")
d.save(OUT); print("saved", OUT)
