# MavionTech Product Presentation Transformation — Project Status

**Last updated:** 10 November 2026
**Current stage:** All work is approved as of 10 Nov 2026: the eight product decks, the catalogue vNext (re-sequenced to the MavionTech product order), the master records and the 14-slide sales introduction deck. Next: final delivery packaging, which has not started and is waiting for the packaging brief or the default package.

## Repository (10 Nov 2026)
- **Pushed to** https://github.com/maviontech/docs (branch `main`, commit `100ba4f`): 357 files, about 181 MB.
- **Author and committer:** `sant.vihangam <sant.vihangam@gmail.com>`, set in this repository only. There is no co-author trailer, as the user instructed.
- **Contents:** all deliverables, records, strategy, design system and reports, plus `02_Working_Notes/design_build` generators and scripts. `README.md` indexes the repository.
- **Excluded by `.gitignore`:** node_modules, working build copies, renders, extracted media, the skill copy (`skv`) and generated assets (product marks are kept).
- This status note was committed and pushed in a follow-up commit.

## Sales introduction deck (approved 10 Nov 2026, "Approve both")
- **Request:** a send-anywhere MavionTech introduction: what we do, how we simplify operations, the product catalogue, today's problems and how our products tackle them. Limit: 15 slides at most. User additions: one detail slide per flagship product, kept after the combined flagship slide, which must not be replaced.
- **Deliverables in `Sales_Introduction/`:** `MavionTech_Sales_Introduction.pptx` (14 slides, editable), `.pdf` (14 pages), `renders/` and `contact_sheets/`.
- **Generator:** `design_build/make_sales_intro.py` writes `build_sales_intro.js`, reusing the approved catalogue vNext layouts verbatim.
- **Slides:**
  1. Cover
  2. Who we are
  3. Problems we hear every day
  4. How MavionTech simplifies operations
  5. Product catalogue (8 products, status badges)
  6. Problem → product → solution
  7. Four flagship products (combined)
  8. Vortex HRMS
  9. ProtonNxt
  10. PragyanNxt
  11. Agastya
  12. Why MavionTech
  13. How we work with you
  14. Contacts
- **Content rules:** no prices, customers, certifications or statistics. Vyaas AI is shown as premium and future. The Vortex image is labelled as coming from vortexhrms.com.
- **Product order** (user rule, 10 Nov 2026, applies everywhere): Vortex HRMS → ProtonNxt → PragyanNxt → Agastya, then MavionLearn, SalesPulse CRM, HeeLIKS, Vyaas AI. Applied to the whole introduction deck and, from 10 Nov 2026, to the catalogue vNext.
- **QA:** validator passed; PowerPoint measure found 0 issues; 0 negative extents; no empty placeholders; notes on all slides; minimum text 9 pt; every slide inspected.

## Portfolio expansion: HeeLIKS and Vyaas AI (started 10 Nov 2026)

The brief covers incremental onboarding of two products. The design system is locked, the six approved decks stay untouched, and the approved catalogue is extended in a new version. It has four checkpoints:
- CP1: source audit
- CP2: both decks
- CP3: catalogue extension
- CP4: full catalogue QA

### Checkpoint 1: done, awaiting approval
- **Report:** `01_Audit_Reports/HeeLIKS_Vyaas_Source_Audit.pdf` (13 pages). Generator: `02_Working_Notes/design_build/build_newproducts_audit.py`.
- **Source renders:** both source decks rendered in PowerPoint into `02_Working_Notes/pp_render/src_heeliks` (54 slides) and `src_vyaas` (30 slides).
- **Contact sheets** in `04_Contact_Sheets/`:
  - `Deck_HeeLIKS_*` (4) and `Deck_Vyaas_*` (2)
  - `HeeLIKS_screens_*` (8) and `Vyaas_screens_*` (2)
- **Extracted text:** `03_Extracted_Text/HeeLIKS_Enterprise_Sales_Deck.txt` and `Vyaas_Enterprise_Sales_Deck.txt`.
- **Sources:**
  - HeeLIKS deck, 181 screenshots, `HeeLIKS_coverage.csv` (the brief says .xlsx, but the file is CSV), `HeeLIKS_deck_work`, 9 exports.
  - Vyaas deck, 31 screenshots, `deck_work`.
  - Product repos `D:\heeliks` and `D:\llm`, read-only, for spot verification.
  - heeliks.com was down; the copy was read from the repo's `templates/site`.
- **Naming:** the product's own spelling is used: **HeeLIKS** and **Vyaas AI**. Windows paths are case-insensitive, so `HeelIKS` and `HeeLIKS` are the same folder.
- **Key findings:**
  - Both source decks are off-system and use many unreadable multi-thumbnail slides.
  - The Vyaas deck says "5 plan tiers"; the code has 7.
  - Vyaas is organisation-scoped in a shared database, not database-per-tenant. The catalogue's "dedicated database in all six products" line must be qualified at CP3.
  - Vyaas has no pull-request screenshot. The website copy ("uptime engineered", "live in 60 seconds", "nine modules") is not reused.
- **Proposed accents:**
  - HeeLIKS Ocean #0369A1
  - Vyaas AI Iris #7C3AED (alternative: its own blue #3048F0)
- **Proposed decks:** HeeLIKS about 44 slides, Vyaas AI about 34 (outlines on pages 10–11 of the report).
- **Not present:** `Master_Portfolio_Content.docx`. It will not be created; the brief says "if present".

CP1 was **approved on 10 Nov 2026** ("Approve, build decks"), including the Ocean and Iris accents.

### Checkpoint 2: individual decks (in progress)
- **Design-system extension** (additive; approved decks unaffected):
  - `mt.js` PRODUCTS gains `heeliks` (#0369A1) and `vyaas` (#7C3AED).
  - `shot()` gains an opt-in 6th argument, `"fit"`, which zooms to the content box.
  - Marks are in `assets/heeliks_mark.png` and `vyaas_mark.png`.
  - `pp_render_nq.ps1` and `pp_measure_nq.ps1` are copies that don't quit PowerPoint, so the two builds could run in parallel.
- **HeeLIKS: done.** Built by `design_build/build_heeliks.js`; change log by `changelog_heeliks.py`.
  - In `Final_Product_Decks/HeeLIKS/`: `HeeLIKS_Final.pptx` (44 slides, 8.5 MB), `HeeLIKS_Final.pdf` (44 pages, 3.5 MB), `HeeLIKS_Change_Log.docx`, `renders/` (44 PNGs) and `contact_sheets/` (3).
  - QA:
    - validator passed; PowerPoint measure found 0 issues; 0 negative extents; 0 empty placeholders;
    - notes on all slides; minimum text 9 pt; minimum screenshot resolution 241 DPI;
    - every slide inspected visually across three fix rounds.
- **Vyaas AI: done.** Built by `design_build/build_vyaas.js`; change log by `changelog_vyaas.py`.
  - In `Final_Product_Decks/Vyaas/`: `Vyaas_Final.pptx` (34 slides, 5.2 MB), `Vyaas_Final.pdf` (34 pages, 2.6 MB), `Vyaas_Change_Log.docx`, `renders/` (34) and `contact_sheets/` (3).
  - QA: validator passed; PowerPoint measure re-run independently, 0 issues; 0 negative extents; 0 empty placeholders; notes on all slides; minimum text 9 pt; minimum screenshot resolution 229 DPI.
  - Flags:
    - Enterprise is shown at $1,500 / ₹1,25,000 a month from the plan seed; confirm before quoting.
    - Enterprise support says "named contact" only; the SLA is not claimed.
    - 38 models, 102 routes and 23k lines come from `product_analysis.md` and were not recounted.
    - Tenancy is stated as organisation-scoped in one application database.
- **Status:** CP2 was **approved on 10 Nov 2026** ("Approve, extend catalogue").

### Checkpoints 3 and 4: catalogue vNext and master records (approved 10 Nov 2026, "Approve vNext")
- **Re-sequenced after approval** (user: "Yes, reorder catalogue"): the product order is now Vortex HRMS → ProtonNxt → PragyanNxt → Agastya → MavionLearn → SalesPulse CRM → HeeLIKS → Vyaas AI.
  - `reorder_catalogue_vnext.py` runs after `make_catalogue_vnext.py`. It moves sequence and positions only; content is unchanged.
  - The approved original-order vNext PPTX, PDF and update log are in `Corporate_Catalogue/Previous_Versions/` (`*_original-order`).
  - Showcase openers are now on slides 15 (Vortex HRMS), 19 (ProtonNxt), 23 (PragyanNxt), 26 (Agastya), 31 (MavionLearn), 35 (SalesPulse CRM), 39 (HeeLIKS) and 44 (Vyaas AI).
  - QA: validator passed; PowerPoint measure found 0 issues; 0 negative extents; notes on all slides; PDF 61 pages.
  - The update log and the report addendum were regenerated with the new order.
  - **The reordered catalogue was approved on 10 Nov 2026 ("Approve both").**
- **Backups:** `Corporate_Catalogue/Previous_Versions/` holds the approved v1 PPTX, PDF and generator (`build_catalogue_v1.js`). The approved `*_Final.pptx` and `.pdf` remain in place, unchanged.
- **Generator:** `design_build/make_catalogue_vnext.py` derives `build_catalogue_vnext.js` from the approved `build_catalogue.js`, which is untouched. Every edit is an asserted string replacement.
- **Deliverables in `Corporate_Catalogue/`:**
  - `MavionTech_Corporate_Product_Catalogue_vNext.pptx` (61 slides, 14.2 MB)
  - `MavionTech_Corporate_Product_Catalogue_vNext.pdf` (61 pages)
  - `MavionTech_Catalogue_Update_Log.docx` (from `changelog_catalogue_vnext.py`)
  - `renders/` (61) and `contact_sheets/` (4)
- **Content:**
  - HeeLIKS showcase on slides 39–43; Vyaas AI showcase on slides 44–47.
  - Updated: cover, brief, about, overview, ecosystem (five domains), categories, capability matrix, industries, architecture, integrations, security, deployment, achievements, opportunities, commercial models and future direction.
  - The six existing showcases are preserved.
  - The isolation claim is qualified everywhere, because Vyaas AI is organisation-scoped.
- **Status badges** (user instructions, 10 Nov 2026):
  - FLAGSHIP · READY: Agastya, PragyanNxt, Vortex HRMS, ProtonNxt.
  - READY · AVAILABLE: MavionLearn, SalesPulse CRM, HeeLIKS ("ready, tested, available").
  - PREMIUM · FUTURE: Vyaas AI, which is listed under ambitions and has Indicative pricing.
- **QA** (all 61 slides inspected):
  - validator passed; PowerPoint measure found 0 issues; 0 negative extents; 0 empty placeholders; notes on all slides;
  - minimum text 9 pt; minimum screenshot resolution 220 DPI; the PDF matches the PPTX (61 pages); brief page references are correct.
- **Master records:**
  - `01_Audit_Reports/Master_Product_Inventory.xlsx`: two products, two decks, source files, and a catalogue-status column for all eight.
  - `Product_Asset_Mapping.xlsx`: HeeLIKS and Vyaas AI screenshot sheets, plus gaps.
  - The v1 workbooks are in `01_Audit_Reports/Previous_Versions/`.
  - `08_Portfolio_Audit/Portfolio_Consistency_Report.pdf` is now 15 pages: v1 plus a three-page expansion addendum. v1 is in `Previous_Versions/`.
  - `Master_Portfolio_Content.docx` was not present, so it was not created.
- **Open:**
  - HeeLIKS live prices and Vyaas AI pricing and launch timing;
  - whether the Vyaas AI deck itself should carry the "premium, future" label;
  - heeliks.com recheck; Inward Logistics/Trackline overlap; vector logos.

### Next step
Expansion approved. Next: final delivery packaging (eight decks, catalogue vNext, design system, reports, index and ZIP), waiting for the user's choice between a packaging brief and the default package.
- **Audit correction:** the Vyaas `w_detail` screen does show the agent's "Opened PR #42" message, and analytics shows token-optimisation savings. The "no PR screen" gap in the CP1 report is therefore partly resolved.

### Next step
Verify the Vyaas output, then present both decks (CP2). After approval, CP3: extend the catalogue into `MavionTech_Corporate_Product_Catalogue_vNext`, backing up the approved Final files to `Corporate_Catalogue/Previous_Versions/`.

## Prompt 6: Corporate product catalogue (10 Nov 2026)

**Files** (in `Corporate_Catalogue/`)
- `MavionTech_Corporate_Product_Catalogue_Final.pptx`: 52 slides, 10.6 MB, fully editable
- `MavionTech_Corporate_Product_Catalogue_Final.pdf`: exported from PowerPoint

**Structure:** an independent corporate narrative on the approved design system. It uses its own layouts: CAT_COVER, DIVIDER, CONTENT, TINT, DARK and CLOSE, plus one PROD layout per product.

| Section | Slides | Content |
|---|---|---|
| 1. Corporate introduction | 1–7 | Cover; **catalogue brief** (all six products with logo, category, description and page reference; added at user request); about; company introduction; vision, mission and promise; technology focus; business problems |
| 2. Product ecosystem | 8–13 | Divider; portfolio overview; ecosystem map; categories (plus "Also in the portfolio" names); technology capability matrix; industries and segments |
| 3. Product showcases | 14–38 | Divider, then the six products below |
| 4. Technology and delivery | 39–44 | Architecture and stack; integrations; security and governance; deployment, scalability and customisation; implementation and support |
| 5. Business and investment | 45–50 | Strategy; achievements vs ambitions; product-market opportunities; commercial models; partnerships, growth and future direction |
| 6. Corporate closing | 51–52 | Why MavionTech; contact and calls to action |

**Product showcases, sized by breadth**

| Product | Slides |
|---|---|
| Agastya | 5 |
| PragyanNxt | 3 |
| Vortex HRMS | 4 |
| ProtonNxt | 4 |
| MavionLearn | 4 |
| SalesPulse CRM | 4 |

Each product has an identity opener covering positioning, problem, answer, target customers, a real screenshot and proof figures. It is followed by a capability map, workflows with real screens, and differentiators, business value and best fit.

**Accuracy rules applied**
- Company facts come only from maviontech.com:
  - mission, vision and promise, quoted verbatim
  - the 2023–2025 milestones
  - verticals, deployment options and contacts
- Company-PDF statistics and claims are excluded: $1.8T, 40%, 2×, 99.9%, ISO, SOC 2, GDPR, 4–8-week go-live as a commitment, and payback periods.
- The implementation phases are shown as indicative.
- Achievements and ambitions sit in separate columns. The deck states no revenue, customer counts, market size, valuation or partnerships.
- Partnership models are framed as invitations.
- Social links are omitted because none were verified.

**QA (PowerPoint)**
- Every slide rendered and inspected.
- 0 text overflows and 0 off-slide shapes, after fixing 14 issues found in the first measurement.
- Validator passed. No negative extents. No empty placeholders. Speaker notes with sources on every slide.
- Minimum font 9 pt; Calibri only.
- 25 real screenshots, minimum 220 DPI effective.

**Open points for MavionTech**
- Confirm that SalesPulse CRM belongs in the catalogue. It is included as an approved, finalised product.
- Confirm the names in "Also in the MavionTech portfolio". They are names only, and Trackline's category is inconsistent in the company PDF.
- Supply Vortex in-app screenshots. Its showcase uses the public website and a native diagram.
- Verify social media links, if they are to be added.

### Next step

**Catalogue approved (10 Nov 2026).** Next: final delivery packaging, waiting for the packaging brief.

## Prompt 5: Portfolio-wide quality audit (10 Nov 2026)

**Deliverable:** `08_Portfolio_Audit/Portfolio_Consistency_Report.pdf` (12 pages). It contains:
- the visual and content consistency matrices
- the contradictions found and how each was resolved
- PowerPoint QA results, before and after
- the corrections applied
- open items
- a readiness verdict

**Verdict:** all six decks are suitable for external enterprise circulation as PPTX or PDF. Print use waits on new screenshot captures and vector logos.

**Method**
- **Content scan:** every text run in every deck was checked for fonts, claims, legacy names, spelling, currency, demo labels, trial lengths and notes.
- **PowerPoint measurement:** checked text overflow, off-slide shapes, empty placeholders and effective screenshot DPI.
- **Visual review:** all 152 slides were exported from PowerPoint and reviewed.

**22 corrections applied.** All were made in the generators, so they hold on every rebuild.

| Deck | Corrections |
|---|---|
| All six | Frame URL label raised from 8 to 9 pt. Sources under 1,200 px are now upscaled 2× with Lanczos and sharpened. |
| Agastya | Product mark added to the cover. Kicker and title changed to "Command centre". |
| MavionLearn | Kicker changed to "Product map". "Rs 1,800" changed to ₹1,800. Close button changed to "Start a free trial". Demo label unified. |
| PragyanNxt | Kickers changed to "Product map" and "Architecture". Close button changed to "Start a free trial". Three demo labels unified. |
| ProtonNxt | Kicker changed to "Architecture". Six demo labels unified. Candidate-portal title changed from "competitors can't match" to "One candidate login across every employer". |
| SalesPulse CRM | Kicker changed to "Architecture". Slide 21 caption overflow fixed. Close button changed to "Start a free trial". Demo label unified. |
| Vortex HRMS | New architecture diagram on slide 18, taken from source slide 15 without the encryption or multi-region lines. Two card overflows on slide 11 fixed. "Zero lost laptops" changed to "Assets recovered at exit". |

**Portfolio rules now in force**
- Slides of the same type share one kicker: "Product map", "Architecture".
- Every screenshot caption ends with "(demo data)".
- Currency is written with ₹.
- British English is used in prose. UI labels keep their on-screen spelling.
- The primary button is "Book a demo". The second button is "Start a free trial" where a trial exists, and "Plan a pilot" elsewhere.

**Results after the rebuild**
- PowerPoint measurement: 0 overflows, 0 off-slide shapes and 0 empty placeholders.
- Minimum font size is 9 pt.
- Every screenshot is at least 149 effective DPI. Before the rebuild the lowest was 89 DPI (PragyanNxt).
- The validator passed and there are no negative extents.
- All six PDFs were re-exported from PowerPoint.

**Final sizes**

| Deck | Slides | Size |
|---|---|---|
| Agastya | 32 | 9.0 MB |
| MavionLearn | 23 | 3.6 MB |
| PragyanNxt | 22 | 3.2 MB |
| ProtonNxt | 27 | 4.5 MB |
| SalesPulse CRM | 25 | 3.4 MB |
| Vortex HRMS | 23 | 2.5 MB |

**New open item: Vortex roadmap overlaps ProtonNxt.** Vortex lists "Recruitment & applicant tracking" under Next, and ProtonNxt is a live ATS. This is a positioning decision for MavionTech and has not been changed on the slides.

**Generator:** `02_Working_Notes/design_build/build_portfolio_report.py`. The fixes script is `audit_fixes.py`.

### Next step

**STOP. Waiting for approval of the audit before creating the corporate product catalogue.**

## Prompt 4: Product decks

| # | Product | Status | Location |
|---|---|---|---|
| 1 | Agastya | Approved (10 Nov 2026) | `Final_Product_Decks/Agastya/` |
| 2 | MavionLearn | Approved (10 Nov 2026) | `Final_Product_Decks/MavionLearn/` |
| 3 | PragyanNxt | Approved (10 Nov 2026) | `Final_Product_Decks/PragyanNxt/` |
| 4 | ProtonNxt | Approved (10 Nov 2026) | `Final_Product_Decks/Protonnxt/` |
| 5 | SalesPulse CRM | Approved (10 Nov 2026) | `Final_Product_Decks/SalesPulse_CRM/` |
| 6 | Vortex HRMS | Approved (10 Nov 2026) | `Final_Product_Decks/Vortex/` |

### Vortex HRMS (10 Nov 2026)

**Files**
- `Vortex_Final.pptx`: 23 slides, 2.3 MB
- `Vortex_Final.pdf`: exported from PowerPoint
- `Vortex_Change_Log.docx`

**What's in the deck**
- All 14 modules are covered, plus the add-ons.
- New slides cover the field workforce and privacy, attendance-to-payroll, performance, and HR documents and learning.

**Screenshots**
- The source deck had no product screenshots, so most slides use native diagrams. No mock-up screens were invented.
- The cover uses the public vortexhrms.com sign-in page, cropped to remove its unverified badges.

**Claims removed**
- The 99.99% uptime SLA and 24×7 support.
- The encryption, multi-region, ISO, SOC 2 and GDPR statements.
- The illustrative deployments, the savings ranges and the "15+ engineers" claim.

**Checks run**
- Every slide reviewed in PowerPoint.
- Validator passed.
- No negative shape sizes.
- No empty placeholders.
- Speaker notes on all slides.

### SalesPulse CRM (10 Nov 2026)

**Files**
- `SalesPulse_CRM_Final.pptx`: 25 slides, 2.5 MB
- `SalesPulse_CRM_Final.pdf`: exported from PowerPoint
- `SalesPulse_CRM_Change_Log.docx`

**What's in the deck**
- All 14 modules are covered.
- Company name corrected to MavionTech Pvt. Ltd., and the MavionTech endorsement added.
- A new diagram shows how masked calling works in both directions.
- Emoji icons replaced with the design system's icons.

**Pricing — held back.** Three sources give conflicting prices, so there is no price table. The deck shows only the pricing model: software per seat, calling pay-as-you-go, and the free trial.

**Checks run**
- Every slide reviewed in PowerPoint.
- Validator passed.
- No negative shape sizes.
- No empty placeholders.
- Speaker notes on all slides.

### ProtonNxt (10 Nov 2026)

**Files**
- `Protonnxt_Final.pptx`: 27 slides, 4.1 MB (the original was 42 slides and 20.6 MB)
- `Protonnxt_Final.pdf`: exported from PowerPoint
- `Protonnxt_Change_Log.docx`

**What's in the deck**
- All 15 modules are covered.
- The "Latest additions" section is now part of the main flow.

**Privacy**
- Six screenshots appeared to show real tenant data, so I left them out (original slides 8, 13, 14, 19, 31 and 36). They contained client companies, candidates, and staff names and email addresses.
- Every screenshot used shows demo-tenant data.

**How gaps are filled**
- Vendor management, the candidate portal, calendar and video interviews, and the mobile app are shown with native diagrams or cards until demo screenshots are available.

**Checks run**
- Every slide reviewed in PowerPoint.
- Validator passed.
- No negative shape sizes.
- No empty placeholders.
- Speaker notes on all slides.

### PragyanNxt (10 Nov 2026)

**Files**
- `PragyanNxt_Final.pptx`: 22 slides, 2.8 MB
- `PragyanNxt_Final.pdf`: exported from PowerPoint
- `PragyanNxt_Change_Log.docx`

**What's in the deck**
- **Naming:** the old name "Evalynx" no longer appears on any slide.
- **Modules:** all 8 covered.
- **Screenshots:** only 4 of the 11 source screenshots are usable. The other 5 were empty screens or showed test data.

**How the gaps are filled**
- Proctoring, integrity, scoring and verification are shown with native diagrams, a native chart and clearly labelled illustrative visuals.
- Populated screenshots are still needed for proctoring, the integrity report, certificates and the verification page.

**Checks run**
- Every slide reviewed in PowerPoint.
- Validator passed.
- No negative shape sizes.
- No empty placeholders.
- Speaker notes on all slides.

### MavionLearn (10 Nov 2026)

**Files**
- `MavionLearn_Final.pptx`: 23 slides, 2.6 MB
- `MavionLearn_Final.pdf`: exported from PowerPoint
- `MavionLearn_Change_Log.docx`

**What's in the deck**
- **Scope:** customer-facing sales story only. Investor material is left out.
- **Modules:** all 12 covered.
- **Screenshots:** 15 real product screens. The source decks only had 800 px images, so these are lower resolution than Agastya's.

**What I left out, and why**
- Mockup images (the video and live-classroom screens).
- The "SOC 2-ready" login screen: the SOC 2 claim is unverified.
- The "running in production" claim: it conflicts with "pre-revenue" in the investor deck.
- Pricing: the sales and investor decks disagree, so there is no pricing slide until you confirm the right one.

**Checks run**
- Every slide reviewed in PowerPoint.
- Validator passed.
- No negative shape sizes (new check, see below).
- No empty placeholders.
- Speaker notes on all slides.

**New production safeguards**
- A shared slide-pattern library, `deckkit.js`, used for all remaining decks.
- A connector helper that flips lines instead of giving them negative widths. A negative width made PowerPoint refuse to open the first build, and the validator didn't catch it.
- An automatic scan for negative shape sizes.

### Agastya (10 Nov 2026)

**Files**
- `Agastya_Final.pptx` (32 slides, 7.5 MB, fully editable)
- `Agastya_Final.pdf` (exported from PowerPoint)
- `Agastya_Change_Log.docx`

**What changed**
- All 19 modules are covered.
- 48 of the 79 screenshots are used. The rest were excluded with reasons recorded in the change log.
- Roadmap items are kept separate from live features.
- Uncertain features are flagged, not claimed: Trigger Engine, Biometric Hub sync, Infrastructure, and the "School Online" and "Time Management" student-portal items.

**Quality check:** every slide was rendered in Microsoft PowerPoint. Schema validation passed and the deck opens with no repair prompt.

### Decisions recorded

**D5 — Check decks in PowerPoint, not LibreOffice.** User instruction. LibreOffice had hidden a problem: empty layout placeholders showed through behind the slide text in PowerPoint. That defect is fixed in all decks:
- Titles, kickers and cover text now go into the layout's placeholders.
- A new MT_CLOSE layout was added for closing slides.
- A script checks every deck for empty placeholders.

### Design-system decks re-verified

Per user request, `MavionTech_Design_Prototype.pptx` and `MavionTech_Reusable_Layouts.pptx` were:
- corrected for the same placeholder defect
- re-checked slide by slide in PowerPoint
- improved: the timeline layout was given icons and a note card

Both PDF guides were then rebuilt from the PowerPoint renders.

### Production change

Screenshots are now embedded as high-quality JPEG. The Agastya file dropped from 44 MB to 7.5 MB.

### Next step

**All six product decks are approved.** No further work is in progress.

**Possible next deliverable:** the corporate product catalogue described in the Portfolio Strategy, section 10. It has not been started and needs your instruction.

**Open company inputs carried forward** (details are in each deck's change log):
- Price lists for MavionLearn, SalesPulse CRM, Agastya and ProtonNxt, and tier prices for PragyanNxt.
- Real screenshots or app access, mainly for Vortex, PragyanNxt, MavionLearn and SalesPulse.
- Evidence for the SLA, uptime and compliance claims published on maviontech.com and vortexhrms.com.
- Logo files: a vector MavionTech logo, and logos for Agastya, MavionLearn and ProtonNxt.
- Whether SalesPulse CRM belongs in the official catalogue.

---

## Earlier stage: Prompt 3 (approved)

## Prompt 3: Design system (10 Nov 2026)

**Deliverables** (all in `07_Design_System/`):

| File | Contents |
|---|---|
| `MavionTech_Brand_Guidelines.pdf` | 13 pages. Brand foundation from the official mission, vision and promise; logo rules; colour palette; contrast rules; endorsed product brands and their accents; typography; icons and imagery; screenshot treatment; contact standard. |
| `MavionTech_Presentation_Design_System.pdf` | 11 pages. Slide canvas and grid; type scale; 12 components; header, footer and slide numbering; covers and dividers; the 16-layout library; composition rules; how each product applies the system; production and QA. |
| `MavionTech_Reusable_Layouts.pptx` | 16 layouts plus 5 slide masters (MT_COVER, MT_DIVIDER, MT_CONTENT, MT_CONTENT_TINT, MT_DARK), each with editable kicker and title placeholders. |
| `MavionTech_Design_Prototype.pptx` | 6 Agastya slides: cover, overview, module map, architecture, interface showcase, business value. They use real screenshots. |

**Core identity**
- **Colours:** Mavion Midnight `#0B1A30` with Mavion Amber `#F5A623`, which comes from the logo. Amber Deep `#A0680A` is used for amber text on light backgrounds.
- **Signature visuals:** an "Orbit" motif derived from the logo's circuit ring, and a browser-style frame around every screenshot.
- **Fonts:** Calibri in Office, Inter for web and print.

**Product accent colours**

| Product | Accent | Note |
|---|---|---|
| Agastya | `#2563EB` | |
| MavionLearn | `#6D4AFF` | |
| PragyanNxt | `#1C3F94` | |
| ProtonNxt | `#0B8282` | |
| SalesPulse CRM | `#D63B42` | **Proposed** — needs approval |
| Vortex HRMS | `#4F46E5` | |

All six accents reach at least 4.5:1 contrast on white. ProtonNxt, Amber Deep and SalesPulse were darkened after a contrast check.

**QA**
- Both PowerPoint files pass schema validation.
- Both open in PowerPoint with no repair prompt (checked through PowerPoint automation).
- Every prototype slide was rendered and inspected. Fixes made: chip/frame overlap, stat labels, empty card space, a leftover sliver of the app sidebar in the cropped screenshots, centred placeholder titles, low-visibility PragyanNxt cover glow, and PDF page overflow.

**Build tooling:** `02_Working_Notes/design_build/`
- `mt.js` holds the shared design values (colours, fonts, spacing).
- `build_prototype.js` and `build_layouts.js` generate the two PowerPoint files.
- `build_pdfs.py` generates the two PDFs.

**Waiting on:** explicit design approval, plus decisions on the SalesPulse coral accent and the logo files (a vector MavionTech master; logos for Agastya, MavionLearn, ProtonNxt and SalesPulse).

**Next step:** STOP. No full presentation will be redesigned until the design is approved.

---

## Earlier stage: Prompt 2 (approved)
**Source folder (read-only):** `D:\MavionTech_sales`
**Working folder:** `D:\MavionTech_sales_MavionTech_Transformation`

---

## 1. Completed activities

### Prompt 1: Source discovery & audit (approved 10 Nov 2026)
- [x] Inventoried all 124 source files. Audited 7 decks (182 slides), the company PDF and all 90 screenshots.
- [x] Delivered the 5 audit reports in `01_Audit_Reports/`.

### Prompt 2: Positioning & content strategy (this stage)
- [x] Inspected **www.vortexhrms.com**:
  - Sign-in page: tagline, the six module claims and the trust badges shown there.
  - Privacy policy, which revealed two mobile apps: **VortexGo** and **SnapLens** (attendance), plus the consent-based background-location feature.
  - Official Vortex V mark (SVG, gradient #4F46E5 → #0891B2), reproduced to `06_Brand_Assets/vortex-mark.svg`.
- [x] Inspected **www.maviontech.com**: Home, Company, Contact, Platform and Products pages, plus the Agastya, HRMS, ProtonNxt, MavionLearn and Evalynx product pages. Collected the official company facts.
- [x] Re-inspected every Agastya screenshot:
  - Read all navigation menus from enlarged crops.
  - Compared the interface against the deck and listed 17 capabilities that are visible but under-explained. Uncertain interpretations are flagged.
- [x] Wrote positioning for all six products (the 9 questions each).
- [x] Wrote module-level analysis for 83 modules: Agastya 19, MavionLearn 12, PragyanNxt 8, ProtonNxt 16, SalesPulse 14, Vortex 14.
- [x] Made restructuring decisions (keep / rewrite / merge / delete / add) for every existing slide.
- [x] Built a slide-by-slide architecture for each product, 150 slides in total:

  | Product | Slides |
  |---|---|
  | Agastya | 32 |
  | MavionLearn | 21 |
  | PragyanNxt | 22 |
  | ProtonNxt | 27 (down from 42) |
  | SalesPulse | 25 |
  | Vortex | 23 |

- [x] Wrote the portfolio positioning strategy: naming, portfolio map, platform story, overlaps, brand-architecture direction, claims policy, storyline framework and catalogue structure.

## 2. Pending activities

- [ ] **User approval of the six slide architectures and the portfolio strategy.**
- [ ] MavionTech confirmations listed in section 4.
- [ ] Prompt 3 onward, not started:
  - design system
  - screenshot recapture plan
  - redesigned decks
  - executive cuts
  - corporate catalogue

## 3. Approved decisions

| # | Decision | Source |
|---|---|---|
| D1 | The Prompt 1 audit is approved. | User, 10 Nov 2026 |
| D2 | Vortex is the company's HRMS and is branded **Vortex HRMS**. The product site is www.vortexhrms.com. | User |
| D3 | **PragyanNxt** is the new name for Evalynx. Every "Evalynx" reference will be retired. | User |
| D4 | Official company details come from www.maviontech.com: **MavionTech Pvt. Ltd.**, 505 Zen Business Center, Bhumkar Chowk, Wakad, Pune 411057, communications@maviontech.com, +91 91580 08002. | User / website |

## 4. Key findings from this stage

1. **The official website catalogue** lists Agastya, HRMS (Vortex), ProtonNxt, MavionLearn, MPP, MavionMeet, Signet, Visitor Management, SETU (new), Trackline, Serene, Evalynx, Inward Logistics, Vanguard, C2H and Club & Entertainment.
   - **SalesPulse CRM is not listed.**
   - The website still shows the old name **Evalynx**.
2. **The website still carries unevidenced figures:**
   - 40% / 2x / 60% performance figures
   - 99.9% uptime and "100+ enterprise users"
   - The Vortex site claims a 99.99% SLA, 24x7 live support, GDPR-ready and multi-region ready.

   Under the proposed claims policy, none of these go on slides until evidenced.
3. **Agastya has more in the interface than the deck explains.** Visible but under-explained:
   - Trigger Engine (uncertain)
   - Broadcasts / My Inbox
   - Sequence Rules, Custom Fields, Infrastructure
   - Bell Schedule, Working Days, Rooms & Venues
   - Sync Biometric Hub (uncertain)
   - Guardian upload-link details
   - Platform Demo Requests and per-channel configuration
   - A broad student-portal menu
4. **Agastya screenshots that cannot be used as-is:**
   - `a18` (error page)
   - `x03` (shows "Razorpay keys missing")
   - Demo-labelled audit and login screens
   - Several empty states
5. **Vortex needs a complete screenshot capture before design.** Its premium modules had no slides at all and have now been added.
6. **ProtonNxt's 42 slides consolidate to 27** with no capability lost. Its high-resolution images can be extracted from the PPTX, but slides 8 and 36 need redaction.

## 5. Outstanding questions for MavionTech

1. Confirm these Agastya functions before they appear on a slide:
   - Trigger Engine
   - Sync Biometric Hub
   - Infrastructure
   - "School Online" and "Time Management" in the student portal

   Also: does Agastya serve colleges?
2. Should SalesPulse CRM be part of the catalogue? It is not on the website.
3. Catalogue scope: the six products only, or the six plus an index of the other products?
4. Which pricing may be shown externally, for each product?
5. Supply logos for Agastya, MavionLearn, ProtonNxt and SalesPulse, plus a vector MavionTech logo.
6. Provide app access, or a screenshot recapture, for:
   - Vortex (all modules, plus the VortexGo and SnapLens apps)
   - MavionLearn
   - SalesPulse
   - PragyanNxt
   - Agastya (flagged screens only)
7. Which SLA, uptime, support-hours and certification statements can be evidenced?
8. Portfolio overlaps (proposed positioning is in the strategy document):
   - Vortex HR Docs vs Signet
   - Vortex LMS vs MavionLearn
   - Vortex ATS roadmap vs ProtonNxt
9. Carried over from Prompt 1:
   - Consent for ProtonNxt slides 8 and 36
   - MavionLearn commercial status and tier matrix
   - The SalesPulse price book
   - Whether the schools named on the Agastya landing page are real customers

## 6. Generated files

| File | Location |
|---|---|
| Five audit reports (Prompt 1) | `01_Audit_Reports/` |
| Agastya_Content_Architecture.docx | `05_Content_Strategy/` |
| MavionLearn_Content_Architecture.docx | `05_Content_Strategy/` |
| PragyanNxt_Content_Architecture.docx | `05_Content_Strategy/` |
| Protonnxt_Content_Architecture.docx | `05_Content_Strategy/` |
| SalesPulse_Content_Architecture.docx | `05_Content_Strategy/` |
| Vortex_Content_Architecture.docx | `05_Content_Strategy/` |
| Portfolio_Positioning_Strategy.docx | `05_Content_Strategy/` |
| vortex-mark.svg (official Vortex mark) | `06_Brand_Assets/` |
| Extracted text, contact sheets, PDF renders, generator scripts | `02_Working_Notes/`, `03_Extracted_Text/`, `04_Contact_Sheets/` |

## 7. Working rules in force

- The source folder is read-only.
- No invented functionality, customers, statistics, testimonials, certifications or commercial achievements.
- Claims policy: Portfolio_Positioning_Strategy.docx, section 8.
- Sales positioning is kept separate from investor positioning. The MavionLearn investor deck is excluded from the sales architecture.

## 8. Next execution step

**STOP. Waiting for explicit approval of the six slide architectures and the portfolio strategy before any design work begins.**
