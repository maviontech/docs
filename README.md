# MavionTech — Product Presentation Programme

Sales and product documentation for MavionTech Pvt. Ltd. (Pune, India). Every deliverable is built on one locked MavionTech design system and checked in Microsoft PowerPoint.

**Product order and status** (as set by MavionTech):

| # | Product | Status |
|---|---|---|
| 1 | Vortex HRMS | Flagship · ready |
| 2 | ProtonNxt | Flagship · ready |
| 3 | PragyanNxt | Flagship · ready |
| 4 | Agastya | Flagship · ready |
| 5 | MavionLearn | Ready · available |
| 6 | SalesPulse CRM | Ready · available |
| 7 | HeeLIKS | Ready · available |
| 8 | Vyaas AI | Premium · future |

## Deliverables

| Folder | Contents |
|---|---|
| `Sales_Introduction/` | MavionTech company introduction, 14 slides, safe to send to any audience (PPTX + PDF) |
| `Corporate_Catalogue/` | Corporate Product Catalogue vNext, 61 slides (PPTX + PDF), update log, renders, contact sheets; earlier approved versions in `Previous_Versions/` |
| `Final_Product_Decks/` | One enterprise sales deck per product (PPTX + PDF) with a change log |
| `07_Design_System/` | Brand guidelines, presentation design system, reusable layouts and design prototype |
| `08_Portfolio_Audit/` | Portfolio Consistency Report, including the expansion addendum |

## Records and analysis

| Folder | Contents |
|---|---|
| `01_Audit_Reports/` | Source audits, master product inventory, asset mapping, missing-information register |
| `03_Extracted_Text/` | Text extracted from the original source decks |
| `04_Contact_Sheets/` | Contact sheets of source decks and screenshots |
| `05_Content_Strategy/` | Portfolio positioning strategy and per-product content architecture |
| `06_Brand_Assets/` | Brand marks |
| `02_Working_Notes/design_build/` | Generators for the decks, catalogue, reports and change logs (pptxgenjs, Python) |
| `PROJECT_STATUS.md` | Full project history, decisions, approvals and open items |

## Rules applied throughout

- No invented customers, testimonials, certifications, uptime figures, revenue or market statistics.
- Product screens are real captures labelled as demo data; planned features are labelled as planned.
- Every PPTX stays fully editable and is verified in PowerPoint (overflow, off-slide shapes, schema validation, slide-by-slide inspection).

## Regenerating

Install the Node dependencies in `02_Working_Notes/design_build/` (`npm install`), then run the relevant `build_*.js` or `make_*.py` script. Screenshot sources are read from the original source folder, which is not part of this repository.
