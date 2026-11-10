# -*- coding: utf-8 -*-
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from p2_build import new_doc, cover, table, para, bullets, footer
OUT = r"D:/MavionTech_sales_MavionTech_Transformation/Final_Product_Decks/HeeLIKS/HeeLIKS_Change_Log.docx"

d = new_doc("HeeLIKS Change Log")
cover(d, "HeeLIKS — Change Log", "HeeLIKS_Enterprise_Sales_Deck.pptx (54 slides) → HeeLIKS_Final.pptx (44 slides)", "0369A1")

d.add_heading("1. Summary", level=1)
bullets(d, [
 "Rebuilt on the locked MavionTech design system with the new HeeLIKS accent, Ocean #0369A1.",
 "    Ocean is derived from the HeeLIKS sky #0EA5E9 and meets 4.5:1 contrast on white. The product's own blue #1E40AF would have clashed with PragyanNxt.",
 "The original indigo theme, lavender backgrounds and HeeLIKS-only footer are replaced by MavionTech layouts, the Midnight + Amber system, the endorsed footer and the official contact card.",
 "Kept: the five-pillar story (Sell, Stock & Buy, Distribute, Insight & Comply, Govern & Scale) and all 20 modules.",
 "Reduced from 54 to 44 slides, with no module dropped.",
 "    Pages that shrank 3–4 screenshots to thumbnails are rebuilt around fewer, larger screens, cropped to remove the navigation rail and fitted to their content.",
 "New native diagrams:",
 "    the inventory ledger (movements → append-only ledger → derived stock);",
 "    procure-to-stock (six steps);",
 "    order-to-cash (six steps);",
 "    go-live import (stage → dry-run → commit → reconcile → undo);",
 "    a redrawn architecture.",
 "New slides: a 21-report matrix, and plans and deployment (prices from the product code).",
 "Every slide has speaker notes with their source.",
])

d.add_heading("2. Slide-by-slide mapping", level=1)
rows = [
 (1, "Cover", "1", "Rebuilt", "HeeLIKS mark, MavionTech endorsement, dashboard and POS screens. The word 'intelligent' is dropped: the product has no AI."),
 (2, "The problem", "2", "Rewritten", "Six problem cards, including distribution on paper and disconnected tools."),
 (3, "Meet HeeLIKS", "3", "Restyled", "Dark-mode dashboard with four pillar summaries."),
 (4, "At a glance", "4", "Restyled", "Code-counted figures with their source; 'industry editions' reworded to 'verticals configured at signup'."),
 (5, "Who it serves", "5", "Restyled", "Six roles with discount caps."),
 (6, "Product map", "6", "Rewritten", "Five pillars with module lists. The ledger note replaces the page references."),
 (7, "Why HeeLIKS", "7", "Rewritten", "Sixteen tiles condensed to eight verified differentiators."),
 (8, "Divider: Sell", "8", "Restyled", ""),
 (9, "Point of sale", "9", "Restyled", "Hero POS screen; four capabilities."),
 (10, "At the counter", "10", "Rewritten", "Park, receipts, invoice register."),
 (11, "Registers and Z-report", "11", "Rewritten", "Close-register and Z-report screens, zoomed to content."),
 (12, "Returns and credit notes", "12", "Restyled", ""),
 (13, "Divider: Stock & Buy", "13", "Restyled", ""),
 (14, "Catalog and masters", "14 + 40", "Merged", "Title no longer quotes demo data ('Over 1,000 SKUs, perfectly organised')."),
 (15, "Inventory ledger", "15", "Rewritten", "Native ledger diagram."),
 (16, "Batches, FEFO and expiry", "16", "Restyled", ""),
 (17, "Counts, transfers and adjustments", "17", "Rewritten", "Three screens plus a note on per-location stock."),
 (18, "Procure to stock", "18", "Added", "Native six-step workflow."),
 (19, "Purchase orders and receipts", "18 + 19", "Merged", ""),
 (20, "Reorder and price control", "19 + 31", "Merged", "Reorder report and purchase price variance."),
 (21, "Partners", "20", "Restyled", ""),
 (22, "Divider: Distribute", "21", "Restyled", ""),
 (23, "Order-to-cash workflow", "—", "Added", "Native six-step workflow. The e-way bill number is recorded, not generated."),
 (24, "Sales orders", "22", "Restyled", ""),
 (25, "Dispatch and delivery", "23", "Rewritten", "Two large screens instead of four thumbnails."),
 (26, "Receipts, ledger and collections", "24 + 25", "Merged", ""),
 (27, "Divider: Insight & Comply", "26", "Restyled", ""),
 (28, "Owner dashboard", "27", "Restyled", ""),
 (29, "Reports", "28 + 31 + 32", "Merged", "All 21 reports in five groups, plus the report hub."),
 (30, "GST compliance", "29", "Rewritten", "GSTR-1 and document series."),
 (31, "Documents and exports", "30", "Rewritten", "Three real exported files."),
 (32, "Divider: Govern & Scale", "33", "Restyled", ""),
 (33, "Go-live and data import", "34 + 35", "Merged", "Native five-step import flow plus two screens."),
 (34, "Security and sign-in", "36", "Rewritten", "Two screens instead of four."),
 (35, "Roles, caps and audit", "37 + 38 + 44", "Merged", ""),
 (36, "Subscription and platform console", "41 + 42 + 43", "Merged", ""),
 (37, "Architecture", "48 + 43", "Rewritten", "Clients → Nginx → application tier → control DB and a database per tenant."),
 (38, "Integrations and technology", "49 + 50", "Merged", "Adds the statement that it is web only, with no native mobile app."),
 (39, "Industry fit", "45 + 46", "Merged", "Four demo workspaces, labelled as demos."),
 (40, "Why switch", "51", "Restyled", "Dark comparison slide with four differentiators."),
 (41, "Plans and deployment", "—", "Added", "Starter, Growth, Business and Perpetual prices from apps/control/plans.py."),
 (42, "Indicative rollout", "52", "Restyled", "Labelled indicative."),
 (43, "Roadmap", "53", "Restyled", "Every item tagged PLANNED."),
 (44, "Close", "54", "Rewritten", "MavionTech contact card."),
]
table(d, ["New #", "New slide", "Was", "Change", "Detail"], rows, [1.2, 3.8, 1.8, 1.6, 8.6], size=8.5)
para(d, "Source slides 10, 31, 32, 39, 40, 44, 46 and 47 were merged into the slides listed above. Dark mode (source slide 47) appears on slide 3.", size=9.5)

d.add_heading("3. Factual integrity", level=1)
bullets(d, [
 "All figures are counted from the code (commit 3b66227): 16 modules, 70 models, 169 routes, 21 reports, 5 roles, 10 permissions, 348 tests.",
 "    The test count, report count and plan prices were spot-checked in D:\\heeliks, read only.",
 "Not used from the website or source deck:",
 "    '99.8% uptime engineered', '~81 tests', 'Live in 60 seconds', 'Nine modules' and 'bank-grade';",
 "    'five industry editions', reworded as five verticals configured at signup.",
 "Labelled as demo data: every workspace (MediCare Pharmacy, Urban Threads, FreshMart, Page Palace, the industrial demo distributor) and every customer and person on screen.",
 "    The industrial workspace is never presented as a customer.",
 "Roadmap items (e-invoice, e-way bill generation, Tally export, quotations, customer portal, payables) are tagged PLANNED.",
 "    The e-way bill number is described as recorded only.",
 "Not claimed: customers, testimonials, certifications, SLA or uptime.",
])

d.add_heading("4. Open items", level=1)
bullets(d, [
 "Confirm the live price list before quoting (plans.py prices are shown, excluding GST).",
 "Confirm the product contacts (sales@ and support@heeliks.com) when heeliks.com is back online. The close slide uses MavionTech's corporate contacts.",
 "Confirm the demo tenant names shown on the sign-in screens (for example 'Sai Krishna Medicals') are seeded data.",
 "Roadmap dates for e-invoice and e-way bill generation.",
 "Vector logo for print.",
])

d.add_heading("5. Quality assurance", level=1)
bullets(d, [
 "Every slide was rendered in Microsoft PowerPoint and inspected individually; the PDF was exported by PowerPoint.",
 "Fixes made during review:",
 "    three divider titles and two content titles that overflowed;",
 "    a report card overlapping the hub screenshot;",
 "    the stack card overlapping a note;",
 "    sparse screens replaced or zoomed to content (registers, dispatch, collections, supplier returns, industry slides);",
 "    process slides re-proportioned.",
 "Final checks:",
 "    schema validation passed; PowerPoint measurement found 0 overflows and 0 off-slide shapes;",
 "    zero negative extents; no empty placeholders; speaker notes on all 44 slides;",
 "    minimum text 9 pt (footers); minimum effective screenshot resolution 241 DPI.",
])
footer(d, "MavionTech · HeeLIKS Change Log · 10 Nov 2026")
d.save(OUT); print("saved", OUT)
