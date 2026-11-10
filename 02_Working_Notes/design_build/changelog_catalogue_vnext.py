# -*- coding: utf-8 -*-
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from p2_build import new_doc, cover, table, para, bullets, footer
OUT = r"D:/MavionTech_sales_MavionTech_Transformation/Corporate_Catalogue/MavionTech_Catalogue_Update_Log.docx"

d = new_doc("MavionTech Catalogue Update Log")
cover(d, "Corporate Product Catalogue — Update Log (vNext)", "MavionTech_Corporate_Product_Catalogue_Final.pptx (52 slides, approved 10 Nov 2026) → MavionTech_Corporate_Product_Catalogue_vNext.pptx (61 slides)", "F5A623")

d.add_heading("1. Summary", level=1)
bullets(d, [
 "The approved catalogue is extended, not replaced. Two products are added: HeeLIKS (Commerce & Operations) and Vyaas AI (AI & Productivity).",
 "The six existing product showcases are preserved word for word. Their only change is a status badge on each opener.",
 "Product status badges follow MavionTech's instruction of 10 Nov 2026:",
 "    FLAGSHIP · READY for Agastya, PragyanNxt, Vortex HRMS and ProtonNxt;",
 "    READY · AVAILABLE for MavionLearn, SalesPulse CRM and HeeLIKS;",
 "    PREMIUM · FUTURE for Vyaas AI.",
 "Product order (MavionTech rule, 10 Nov 2026) is applied throughout: Vortex HRMS → ProtonNxt → PragyanNxt → Agastya → MavionLearn → SalesPulse CRM → HeeLIKS → Vyaas AI.",
 "    This covers the cover, brief, overview, ecosystem map (People & Talent first), tables, matrix columns, evidence dots and the showcase sequence.",
 "    The approved original-order vNext is kept in Previous_Versions.",
 "New slides: HeeLIKS showcase (5 slides, from slide 39) and Vyaas AI showcase (4 slides, from slide 44).",
 "Backups of the approved v1 PPTX, PDF and generator: Corporate_Catalogue/Previous_Versions/. The approved Final files also remain in place, unchanged.",
 "Generator: build_catalogue_vnext.js, derived from the approved build_catalogue.js by make_catalogue_vnext.py, so every edit is reviewable. The approved generator is untouched.",
])

d.add_heading("2. Slide-by-slide changes", level=1)
rows = [
 ("1", "Cover", "Updated", "'Six platforms' → 'Eight platforms'; subtitle adds commerce and AI; eight product marks."),
 ("2", "Catalogue brief", "Updated", "Eight product cards (2 × 4) with status badges; page references recomputed (HeeLIKS p. 39, Vyaas AI p. 44)."),
 ("3", "About", "Updated", "Portfolio line and 'Today' milestone reflect eight platforms, seven of them ready."),
 ("4", "Company introduction", "Corrected", "'At least five of our six' → 'at least seven of our eight; Vyaas AI scopes data per organisation'."),
 ("5", "Vision and mission", "Unchanged", ""),
 ("6", "Technology focus", "Updated", "Eight evidence dots per principle; isolation principle qualified (seven products); AI principle adds Vyaas AI."),
 ("7", "Business problems", "Updated", "Two problems added (stock/GST books; AI pilots), rows tightened."),
 ("8", "Divider 02", "Updated", "'Eight platforms across five buyer domains'."),
 ("9", "Portfolio overview", "Updated", "Eight cards (4 × 2) with status badges."),
 ("10", "Ecosystem map", "Rebuilt", "Five domains in two rows; foundation pill 'Database per customer' → 'Tenant isolation', 'Mobile & APIs' → 'APIs & integrations'."),
 ("11", "Product categories", "Updated", "Two rows added; rows tightened; 'Also in the portfolio' line unchanged."),
 ("12", "Technology capabilities", "Updated", "Two columns added (eight in total), with code-verified cells."),
 ("13", "Industries and segments", "Updated", "Two segment rows added."),
 ("14", "Divider 03", "Updated", "Eight showcase entries."),
 ("15–38", "Six existing showcases", "Preserved, re-sequenced", "Content unchanged; status badge added; order Vortex HRMS (15), ProtonNxt (19), PragyanNxt (23), Agastya (26), MavionLearn (31), SalesPulse CRM (35)."),
 ("39–43", "HeeLIKS showcase", "Added", "Opener, capabilities (20 modules in 5 pillars), workflows, control, why it wins."),
 ("44–47", "Vyaas AI showcase", "Added", "Opener (PREMIUM · FUTURE), capabilities (14 modules), workflows, why it wins."),
 ("48", "Divider 04", "Unchanged", ""),
 ("49", "Architecture and stack", "Updated", "'All eight products'; data layer qualified for Vyaas AI; two stack rows added."),
 ("50", "Integrations", "Updated", "Stripe, Anthropic Claude, Tally XML and GitHub added; product lists on their own line."),
 ("51", "Security and governance", "Corrected", "Isolation qualified (seven products plus organisation scoping); HeeLIKS two-factor; sandboxed agents."),
 ("52", "Deployment", "Updated", "On-premise or self-hosted adds HeeLIKS and Vyaas AI."),
 ("53", "Implementation and support", "Unchanged", ""),
 ("54", "Divider 05", "Unchanged", ""),
 ("55", "Portfolio strategy", "Unchanged", ""),
 ("56", "Achievements and ambitions", "Updated", "Seven products ready; prices for Vortex, HeeLIKS and Vyaas AI; Vyaas AI listed as an ambition (premium, future)."),
 ("57", "Opportunities", "Updated", "Two rows added."),
 ("58", "Commercial models", "Updated", "Two cards added: HeeLIKS (Published), Vyaas AI (Indicative)."),
 ("59", "Partnerships and future direction", "Updated", "HeeLIKS and Vyaas AI roadmap items (planned) added."),
 ("60", "Why MavionTech", "Corrected", "Isolation reason qualified; 'One partner, eight platforms'."),
 ("61", "Close", "Unchanged", ""),
]
table(d, ["Slide", "Title", "Change", "Detail"], rows, [1.4, 3.6, 1.8, 10.2], size=8.5)

d.add_heading("3. Factual integrity", level=1)
bullets(d, [
 "Every new fact comes from the approved HeeLIKS and Vyaas AI decks, which were verified against their code repositories.",
 "No customers, testimonials, certifications, uptime figures or revenue are added.",
 "Consistency correction: the v1 claim 'a dedicated database per customer in all six products' does not hold for Vyaas AI (organisation-scoped in one application database).",
 "    Every isolation statement is now qualified: slides 4, 6, 10, 49, 51 and 60.",
 "Vyaas AI is presented as a premium product envisioned for the future. Its slides describe the working build, its prices are marked Indicative, and it is listed under ambitions, not achievements.",
 "Roadmap items for HeeLIKS (e-invoice, e-way bill generation, Tally export) and Vyaas AI (GitLab, OAuth Git connect) are shown only as planned.",
])

d.add_heading("4. Quality assurance", level=1)
bullets(d, [
 "All 61 slides were rendered in Microsoft PowerPoint and inspected, not only the new ones; the PDF was exported by PowerPoint (61 pages).",
 "Fixes made during review:",
 "    two text overflows (the About portfolio line, a HeeLIKS pillar name);",
 "    a word break in the capability matrix;",
 "    a sparse POS screen replaced by the invoice register;",
 "    the Vyaas AI workspace crop moved to the agent's task rail;",
 "    badge text raised to 9 pt.",
 "Final checks:",
 "    schema validation passed; PowerPoint measurement found 0 overflows and 0 off-slide shapes;",
 "    zero negative extents; no empty placeholders; speaker notes on every slide;",
 "    minimum text 9 pt; minimum screenshot resolution 220 DPI;",
 "    catalogue-brief page references match the showcase openers.",
])

d.add_heading("5. Open items", level=1)
bullets(d, [
 "Confirm the HeeLIKS live price list, and the Vyaas AI pricing before launch.",
 "Confirm whether 'Inward Logistics' or 'Trackline' (in 'Also in the portfolio') overlap with HeeLIKS.",
 "heeliks.com was unavailable on 10 Nov 2026. Re-check its public copy once it is back.",
 "The individual Vyaas AI deck does not yet carry the 'premium, envisioned for the future' positioning. Decide whether to add it.",
])
footer(d, "MavionTech · Catalogue Update Log · 10 Nov 2026")
d.save(OUT); print("saved", OUT)
