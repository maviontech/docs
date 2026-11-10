# -*- coding: utf-8 -*-
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from p2_build import new_doc, cover, table, para, bullets, footer
OUT = r"D:/MavionTech_sales_MavionTech_Transformation/Final_Product_Decks/PragyanNxt/PragyanNxt_Change_Log.docx"

d = new_doc("PragyanNxt Change Log")
cover(d, "PragyanNxt — Change Log", "PragyanNxt_Enterprise_Sales_Deck.pptx (20 slides) → PragyanNxt_Final.pptx (22 slides)", "1C3F94")

d.add_heading("1. Summary", level=1)
bullets(d, [
 "Rebuilt on the approved MavionTech design system:",
 "    The PragyanNxt accent is sapphire #1C3F94, using the PragyanNxt mark from branding/. Its gold harmonises with Mavion Amber.",
 "Naming: 'PragyanNxt' is used throughout. 'Evalynx' (the former name, per your confirmation) appears nowhere on slides; it is mentioned once in the speaker notes for continuity.",
 "All 8 modules are covered. New slides were added for personas, the candidate journey, verification flow, buyer fit, and deployment & integrations.",
 "Proof is thin because 5 of the 11 source screenshots are empty or show test data. Where no populated screenshot exists, the deck uses native diagrams, a native chart and illustrative visuals, and labels them as illustrative.",
 "Contact details are the official MavionTech details, replacing the placeholder CTA and contacts noted in the README.",
])

d.add_heading("2. Slide-by-slide mapping", level=1)
rows = [
 (1, "Cover", "1", "Rebuilt", "Mark, promise and three chips. Dashboard (with the 'verify your email' banner cropped out) plus the question bank."),
 (2, "Problem", "2 + 3", "Merged", "Hiring and academic problem cards plus the three failure modes."),
 (3, "Problems we solve", "4", "Restyled", "Six-row challenge → capability map."),
 (4, "Solution", "5", "Restyled", "Three proof points plus the evaluation dashboard."),
 (5, "Who uses PragyanNxt", "—", "Added", "Platform manager, organisation admin, author, proctor, candidate, verifier."),
 (6, "How it works", "6", "Restyled", "Five-stage loop with Certify highlighted."),
 (7, "Eight modules", "7", "Restyled", "Module grid with Certification highlighted."),
 (8, "Author", "8", "Restyled", "Question bank (1,225 items) hero."),
 (9, "AI-native", "9", "Rewritten", "Three AI cards plus a human-review generation flow and the metering note."),
 (10, "Deliver", "10", "Restyled", "Assessments workspace with four delivery features."),
 (11, "Candidate journey", "—", "Added", "Five steps from invitation to certificate, with the organisation sign-in screen."),
 (12, "Proctor", "11", "Rewritten", "Idle proctoring screenshot removed. Dark capability cards plus AI-flag chips."),
 (13, "Integrity engine", "12", "Rebuilt", "Native bar chart of the signal weights (4.2 / 3.5 / 3.2 / 2.5 / 2.5), risk levels, and an illustrative score of 92."),
 (14, "Score & analyse", "13", "Rewritten", "Empty reports screenshot removed. Funnel shown as an illustrative diagram, plus four features."),
 (15, "Certify", "14", "Restyled", "Six differentiator cards on a dark slide."),
 (16, "How verification works", "—", "Added", "Native flow: pass → signed → shared → verified; LMS write-back and appeals."),
 (17, "Enterprise-grade", "15", "Rewritten", "Empty tenant-manager screenshot replaced with the create-organisation form plus an isolation diagram and controls."),
 (18, "Built for both buyers", "16 + 17", "Merged", "Corporates and academic institutions side by side. The QA-named user screenshot is no longer used."),
 (19, "Why PragyanNxt", "18", "Restyled", "Four USPs."),
 (20, "Packaging", "19", "Restyled", "Allowances only (500 / 5,000 / 25,000 assessments per month), 14-day trial."),
 (21, "Deployment & integrations", "—", "Added", "Cloud / private cloud / on-premise (per maviontech.com); LTI 1.3, Open Badges, verifiable credentials, email invitations."),
 (22, "Close", "20", "Rewritten", "Official contact card; 'Book a demo' and 'Start a trial'."),
]
table(d, ["New #", "New slide", "Was", "Change", "Detail"], rows, [1.2, 3.4, 1.5, 1.8, 9.1], size=8.5)

d.add_heading("3. Screenshots", level=1)
table(d, ["File", "Used?", "Reason"], [
 ("01-login", "Yes (slide 11)", "Organisation-scoped sign-in."),
 ("02-tenant-manager-portal", "No", "Empty: 'No organisations yet'."),
 ("03-create-organization", "Yes (slide 17)", "Shows provisioning fields (admin, plan version, access type, expiry)."),
 ("04-admin-dashboard", "Yes (slides 1, 4)", "'Verify your email' banner cropped out."),
 ("05-question-bank", "Yes (slides 1, 8)", "Populated: 1,225 questions."),
 ("06-subjects", "No", "Shows a 'Subscription QA' test subject."),
 ("07-assessments", "Yes (slide 10)", "Populated; a small 'Subscription QA' label is visible. Recapture recommended."),
 ("08-users", "No", "Test-style names ('Subscription QA Staff')."),
 ("09-reports, 10-proctoring-dashboard, 11-certificates", "No", "Empty states."),
], [5.5, 2.8, 8.7], size=9)
para(d, "All source screenshots are 800×450, so screenshot frames are kept modest in size.", italic=True, size=9)

d.add_heading("4. Factual integrity", level=1)
bullets(d, [
 "Capabilities come only from the source deck, its notes, the README and the product menus visible in the screenshots:",
 "    Bulk Upload, AI Generate, Generate with AI, Public Links, Assign Assessments, Control Room.",
 "Illustrative visuals are labelled as such: the integrity score of 92 and the completion funnel.",
 "The signal weights are the engine values stated in the source deck notes.",
 "Not claimed: SSO, ATS integration and managed proctoring (per the README).",
 "Jitsi, Razorpay, SMTP and webhooks are listed in the company materials for Evalynx. They appear in the speaker notes only, pending confirmation.",
 "Deployment options (Cloud SaaS, private cloud, on-premise) come from the official maviontech.com product page.",
 "No customers, statistics or certifications are claimed.",
])

d.add_heading("5. Open items", level=1)
bullets(d, [
 "Capture populated screens at 1,600 px or more:",
 "    a live proctoring session with AI flags; an integrity report; the results funnel and reports; an issued certificate and the public verification page; an appeal case; the AI generation dialog; the candidate exam view.",
 "Pricing per tier (allowances only today).",
 "Confirm the Jitsi, Razorpay, SMTP and webhook integrations, and the identity-verification feature listed on the website.",
 "Update maviontech.com, which still lists the product as 'Evalynx'.",
])

d.add_heading("6. Quality assurance", level=1)
bullets(d, [
 "Every slide was rendered and inspected in Microsoft PowerPoint; the PDF was exported by PowerPoint.",
 "Fixes made during review:",
 "    cover chips colliding with a screenshot frame; an overflowing module card; a journey step hidden behind a note; a two-line card heading overlapping its body; a crossing diagonal connector; an overprinted section label; a chip touching a screenshot frame; a title ending in a full stop.",
 "Final checks:",
 "    Schema validation passed; zero negative extents; no empty placeholders; speaker notes on all 22 slides.",
 "    File size 2.8 MB (PowerPoint) and 0.7 MB (PDF).",
])
footer(d, "MavionTech · PragyanNxt Change Log · 10 Nov 2026")
d.save(OUT); print("saved", OUT)
