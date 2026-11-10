# -*- coding: utf-8 -*-
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from p2_build import new_doc, cover, table, para, bullets, footer
OUT = r"D:/MavionTech_sales_MavionTech_Transformation/Final_Product_Decks/Vyaas/Vyaas_Change_Log.docx"

d = new_doc("Vyaas AI Change Log")
cover(d, "Vyaas AI — Change Log", "Vyaas_Enterprise_Sales_Deck.pptx (30 slides) → Vyaas_Final.pptx (34 slides)", "7C3AED")

d.add_heading("1. Summary", level=1)
bullets(d, [
 "Rebuilt on the locked MavionTech design system, replacing the source deck's own dark-navy theme.",
 "Vyaas AI receives a new product accent, Iris #7C3AED, approved at Checkpoint 1.",
 "    Iris is taken from the violet in the Vyaas logo and UI and has 5.7:1 contrast on white. The product's own blue sits too close to Agastya.",
 "The ribbon-V product mark appears on the cover. The product name is live text: the source wordmark's 'AI' was illegible on dark backgrounds.",
 "Three pillars and all 14 modules are covered.",
 "New native diagrams:",
 "    how cited answers work",
 "    the coding-agent workflow",
 "    the sandbox safety layers and run modes",
 "    the Token Optimisation Engine L1–L3",
 "    a five-layer architecture",
 "Screens are fewer and larger. The coding-agent task rail is shown enlarged as evidence that the agent opens pull requests.",
 "Every slide has speaker notes with sources, and every screen is labelled as demo data.",
])

d.add_heading("2. Slide-by-slide mapping", level=1)
rows = [
 (1, "Cover", "1", "Rebuilt", "Mark plus live-text name; cited-answer and document-generation screens."),
 (2, "The problem", "2", "Rewritten", "Six problems, extended with tool sprawl and personal-only expertise."),
 (3, "Meet Vyaas AI", "3", "Rewritten", "The three pillars and multi-model, beside a comparison answer."),
 (4, "At a glance", "4", "Corrected", "'5 plan tiers' corrected to 7; figures re-checked against the code."),
 (5, "Who it's for", "5", "Rewritten", "Buyer, engineers, knowledge workers, admins. The org-feature plan scope is stated."),
 (6, "Product map", "6", "Restyled", "14 modules in three pillars."),
 (7, "Why Vyaas wins", "7", "Restyled", "Eight differentiators, each tied to code."),
 (8, "Divider: Converse & Create", "8", "Restyled", ""),
 (9, "Chat", "9", "Restyled", "Larger screen. The caption now matches what the screen shows."),
 (10, "Answers you can cite", "10", "Rewritten", "Native upload → ingest → retrieve → cite → verify diagram, plus a cited answer."),
 (11, "Knowledge Base", "11", "Restyled", ""),
 (12, "Documents and images", "12", "Restyled", "Generated-document and library screens."),
 (13, "Assistants", "13", "Rebuilt", "Labels that overlapped the screenshots are fixed."),
 (14, "Tools", "14", "Restyled", ""),
 (15, "Divider: Build & Ship", "15", "Restyled", ""),
 (16, "Coding agent workflow", "16", "Rewritten", "Six-step native diagram from import to pull request."),
 (17, "Agent workspace", "16", "Added", "Full workspace plus an enlarged task rail ('Opened PR #42', demo)."),
 (18, "Safe autonomy", "17", "Rebuilt", "Layered diagram and the three run modes. Overlapping labels are removed."),
 (19, "Git providers and Connect", "17", "Split out", "Provider and Connect screens; GitLab is shown as planned."),
 (20, "Divider: Govern & Scale", "18", "Restyled", ""),
 (21, "Organizations and members", "19", "Restyled", ""),
 (22, "Policies and audit", "20", "Restyled", ""),
 (23, "Shared assets", "21", "Restyled", ""),
 (24, "Token Optimisation Engine", "23", "Added", "L1/L2/L3 diagram plus the analytics savings line (demo)."),
 (25, "Usage analytics", "23", "Restyled", ""),
 (26, "Plans and billing", "22", "Rewritten", "Six public tiers with INR and USD prices from the plan seed. Guest is noted."),
 (27, "Admin console and notifications", "24", "Restyled", "Notifications screen added."),
 (28, "Multi-model catalogue", "25", "Rebuilt", "Caption overlap fixed; specific model names moved to the notes."),
 (29, "Architecture", "26", "Rewritten", "Five layers. Tenancy is stated as organisation-scoped."),
 (30, "Security and data handling", "—", "Added", "Six controls, each evidenced in code."),
 (31, "Why switch", "27", "Restyled", "Comparison plus four outcomes."),
 (32, "Deployment and indicative rollout", "28", "Restyled", "Labelled indicative."),
 (33, "Roadmap", "29", "Restyled", "Each card tagged PLANNED."),
 (34, "Close", "30", "Rewritten", "Official MavionTech contact card."),
]
table(d, ["New #", "New slide", "Was", "Change", "Detail"], rows, [1.2, 3.8, 1.4, 1.8, 8.8], size=8.5)

d.add_heading("3. Factual corrections", level=1)
table(d, ["Item", "Source deck", "Final deck", "Evidence"], [
 ("Plan tiers", "5 plan tiers", "7 tiers (6 public): Guest, Free, Plus, Pro, Max, Team, Enterprise", "apps/catalogue/seed.py"),
 ("Prices", "USD in notes; INR only on screen", "INR and USD per tier, excluding GST; annual billing gives 2 months free", "apps/catalogue/seed.py, pricing screen"),
 ("Data isolation", "'Isolation' without qualification", "Organisation-scoped data in one application database; encrypted secrets; self-hostable", "apps/orgs, apps/workspace/crypto.py, deploy/"),
 ("Model names", "Specific model versions on the slide", "'Claude and OpenAI models'; current names kept in the notes", "apps/catalogue/seed.py"),
 ("PR evidence", "Claimed without a screen", "Task rail 'Ran the suite: 23 passed. Opened PR #42.' (demo repository)", "w_detail screenshot, apps/workspace/gitops.py"),
 ("Token savings", "'Cuts model spend'", "Savings reported per message; a demo period shows 9,246 input tokens saved. No percentage is claimed.", "apps/optimizer, analytics screen"),
], [2.6, 3.6, 6.0, 4.6], size=8.5)

d.add_heading("4. Factual integrity", level=1)
bullets(d, [
 "All screens use the demo organisation 'Northwind Robotics' and seeded demo users.",
 "Not claimed:",
 "    customers or testimonials",
 "    certifications, uptime, an SLA or data residency",
 "    a database per tenant",
 "    a portfolio-wide token-savings percentage",
 "The Enterprise support tier in the code reads 'Named contact, SLA'. The deck says 'named contact' only, because no SLA terms are documented.",
 "Roadmap items appear only on the roadmap slide, tagged PLANNED:",
 "    OAuth Git connect",
 "    GitLab",
 "    push/PR from Connect",
 "    warm task containers",
])

d.add_heading("5. Open items", level=1)
bullets(d, [
 "Confirm the live price list, including whether Enterprise is shown publicly at $1,500 / ₹1,25,000 a month, before quoting.",
 "Optional full-screen captures to strengthen the evidence:",
 "    an agent session with its pull request",
 "    a per-message optimisation receipt",
 "    attachment analysis",
 "    global search",
 "A data-residency and hosting statement for the hosted service, plus security certifications if any.",
 "A Vyaas-specific domain or contact address. The close slide uses the official MavionTech contacts.",
 "A vector version of the ribbon-V mark (the PNG is 640 px).",
])

d.add_heading("6. Quality assurance", level=1)
bullets(d, [
 "Every slide was rendered in Microsoft PowerPoint and inspected. The PDF was exported by PowerPoint.",
 "Fixes made during review:",
 "    an overflowing divider title",
 "    an empty-looking workspace screen, replaced by a full view plus an enlarged task rail",
 "    the analytics crop moved down to show the savings line",
 "    sparse plan cards",
 "    a chat caption that did not match its screen",
 "Final checks:",
 "    0 overflow or off-slide shapes in PowerPoint; schema validation passed; zero negative extents",
 "    no empty placeholders; speaker notes on all 34 slides",
 "    minimum font 9 pt; minimum screenshot resolution 229 effective DPI",
])
footer(d, "MavionTech · Vyaas AI Change Log · 10 Nov 2026")
d.save(OUT); print("saved", OUT)
