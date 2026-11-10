// HeeLIKS_Final.pptx — portfolio expansion, built on the locked MavionTech design system (mt.js + deckkit.js).
// Sources: D:\MavionTech_sales\HeeLIKS_Enterprise_Sales_Deck.pptx, HeelIKS_screenshots\, HeeLIKS_coverage.csv,
// HeeLIKS_deck_work\product_analysis.md, D:\heeliks (read-only spot checks). No customers, testimonials, certifications or uptime claims.
const fs = require("fs");
const pptxgen = require("pptxgenjs");
const M = require("./mt");
const { makeKit } = require("./deckkit");
const { T, TYPE, G, tint, frame, iconChip, caption, card } = M;
const SRC = "D:/MavionTech_sales/HeelIKS_screenshots/";
const OUTDIR = M.ROOT + "/Final_Product_Decks/HeeLIKS";
const OUT = process.env.OUT || (OUTDIR + "/HeeLIKS_Final.pptx");
fs.mkdirSync(OUTDIR, { recursive: true });
const H = (f, crop = [370, 0, "fit"]) => ({ src: SRC + f + ".png", crop });   // 370 px = app navigation rail
const F = f => H(f, [0, 0]);
const ICONS = { scan: "LuScanBarcode", wallet: "LuWallet", percent: "LuBadgePercent", zap: "LuZap", pause: "LuCirclePause", printer: "LuPrinter",
  keyboard: "LuKeyboard", user: "LuUserCheck", cash: "LuBanknote", calc: "LuCalculator", file: "LuFileText", undo: "LuUndo2", receipt: "LuReceipt",
  box: "LuPackage", tag: "LuTag", barcode: "LuBarcode", ruler: "LuRuler", upload: "LuUpload", db: "LuDatabase", lock: "LuLock", layers: "LuLayers",
  clock: "LuClock", alert: "LuTriangleAlert", bell: "LuBell", mail: "LuMail", count: "LuClipboardCheck", swap: "LuArrowLeftRight", adjust: "LuSlidersHorizontal",
  map: "LuMapPin", cart: "LuShoppingCart", check: "LuCircleCheck", truck: "LuTruck", returns: "LuPackageX", list: "LuListChecks", users: "LuUsers",
  building: "LuBuilding2", gst: "LuReceiptIndianRupee", credit: "LuCreditCard", timeline: "LuGitCommitHorizontal", hand: "LuHandCoins", book: "LuBookOpen",
  chart: "LuChartColumn", trend: "LuTrendingUp", gauge: "LuGauge", filter: "LuFilter", sheet: "LuFileSpreadsheet", shield: "LuShieldCheck", key: "LuKeyRound",
  eye: "LuEye", history: "LuHistory", settings: "LuSettings2", crown: "LuCrown", server: "LuServer", plug: "LuPlug", code: "LuCode", cloud: "LuCloud",
  pill: "LuPill", shirt: "LuShirt", apple: "LuApple", library: "LuLibrary", factory: "LuFactory", store: "LuStore", rocket: "LuRocket", target: "LuTarget",
  sign: "LuSignature", search: "LuSearch", moon: "LuMoon", qr: "LuQrCode", ban: "LuBan", star: "LuStar", flag: "LuFlag", repeat: "LuRepeat", award: "LuAward" };

(async () => {
  const pres = new pptxgen(); pres.layout = "LAYOUT_WIDE";
  pres.author = "MavionTech Pvt. Ltd."; pres.company = "MavionTech Pvt. Ltd."; pres.title = "HeeLIKS — Inventory, POS & Distribution";
  pres.theme = { headFontFace: M.FONT.head, bodyFontFace: M.FONT.body };
  const A = M.PRODUCTS.heeliks.accent;
  M.defineLayouts(pres, "heeliks", await M.darkBg(A, "bg_cover_heeliks.png", "cover"), await M.darkBg(A, "bg_divider_heeliks.png", "divider"));
  const K = await makeKit(pres, "heeliks", "hl", ICONS);
  const { ic, icW, txt } = K;
  const mark = M.ASSETS + "/heeliks_mark.png";
  const colLabel = (sl, t, x, w, y = 1.7, c = T.slate500) => txt(sl, t.toUpperCase(), x, y, w, 0.25, { fontSize: 10, bold: true, charSpacing: 2, color: c });
  const sbox = (sl, x, y, w, h, hd, sub, o = {}) => { sl.addShape("roundRect", { x, y, w, h, rectRadius: 0.08, fill: { color: o.fill || T.white }, line: { color: o.line || T.line, width: o.lw || 0.75 } });
    sl.addText([{ text: hd, options: { bold: true, fontSize: o.hs || 13, color: o.hc || T.ink, breakLine: !!sub } }].concat(sub ? [{ text: sub, options: { fontSize: o.ss || 11, color: o.sc || T.slate500 } }] : []), { x: x + 0.15, y, w: w - 0.3, h, margin: 0, valign: "middle", align: o.align || "left", isTextBox: true }); };
  const divider = (t, b, n) => { const [pn, tt] = t.split(" · "); K.sec(pn); const s = K.add("MT_DIVIDER"); M.kicker(s, `Pillar ${n} · ${pn}`, T.amber, G.mx, 2.6); t = tt.charAt(0).toUpperCase() + tt.slice(1); s.addText(t, { placeholder: "title" }); s.addText(b, { placeholder: "body" }); return s; };
  // process cards with arrows: steps = [[icon, head, body]]
  const steps = (sl, items, y = 1.9, h = 3.3, hi = -1) => { const n = items.length, gap = 0.3, w = (G.cw - (n - 1) * gap) / n;
    items.forEach(([icn, hd, b], i) => { const x = G.mx + i * (w + gap), on = i === hi;
      card(sl, x, y, w, h, on ? T.midnight : T.paper, on ? T.midnight : T.line);
      if (on) { sl.addShape("roundRect", { x: x + 0.22, y: y + 0.25, w: 0.5, h: 0.5, rectRadius: 0.12, fill: { color: A }, line: { type: "none" } }); sl.addImage({ path: icW[icn], x: x + 0.34, y: y + 0.37, w: 0.26, h: 0.26 }); }
      else iconChip(sl, ic[icn], x + 0.22, y + 0.25, A, 0.5);
      txt(sl, String(i + 1), x + w - 0.6, y + 0.25, 0.4, 0.45, { fontSize: 20, bold: true, color: on ? T.amber : tint(A, 0.5), align: "right" });
      txt(sl, hd, x + 0.22, y + 0.95, w - 0.4, 0.55, { fontSize: 14, bold: true, color: on ? T.white : T.ink });
      txt(sl, b, x + 0.22, y + 1.5, w - 0.4, h - 1.6, { fontSize: 12.5, color: on ? T.onDarkMuted : T.slate700 });
      if (i < n - 1) K.line(sl, x + w + 0.03, y + h / 2, x + w + gap - 0.03, y + h / 2); }); };

  // 1 COVER
  K.sec("Opening");
  let sl = K.add("MT_COVER");
  K.cover(sl, { name: "HeeLIKS", category: "Inventory, POS & Distribution", mark,
    promise: "Run your entire store on one platform.",
    support: "Inventory, point of sale, purchasing, B2B order-to-cash and GST reporting on one stock ledger, with each customer in its own isolated database.",
    chips: ["Ledger-true stock", "GST-ready", "Database per customer"] });
  await K.coverShots(sl, H("D02_dashboard_full"), H("S12_pos_split_payment"), "HeeLIKS · Owner dashboard");
  sl.addNotes("Opening. HeeLIKS (Holistic Enterprise Engine for Logistics & Inventory Keeping System) is a MavionTech product. The promise is the product's own website hero line, minus the word 'intelligent' (there is no AI in the product). All screens show seeded demo workspaces (MediCare Pharmacy and four other industry demos), not customers.");

  // 2 PROBLEM
  sl = K.add(); K.head(sl, "The problem", "Stock, till and books that never agree");
  K.iconCards(sl, [["sheet", "Stock lives in a spreadsheet", "Billing runs on a separate till, so on-hand is a guess and stock-outs are found by customers."],
    ["clock", "Expiry found too late", "Batches and expiry dates sit on cartons, not in the system; write-offs surface at audit time."],
    ["gst", "GST is a monthly scramble", "Accountants rebuild tax summaries, credit notes and GSTR-1 from bill books by hand."],
    ["eye", "No control, no trail", "Shared logins, unlimited discounts and no record of who changed a price or a quantity."],
    ["truck", "Distribution on paper", "Orders, challans and receipts tracked in registers; nobody knows who owes what."],
    ["layers", "Tools that don't talk", "Separate POS, inventory and accounting tools: every number entered twice."]], 3, 1.8, 2.2);
  sl.addNotes("Typical pains of stock-driven outlets and distributors, from the product specification (docs/SRS.md section 2.2) and the source deck. No market statistics are used.");

  // 3 MEET
  sl = K.add(); K.head(sl, "Meet HeeLIKS", "One platform from purchase order to paid invoice");
  await K.heroFeature(sl, H("X01_dashboard_dark"), [["cart", "Sell", "A keyboard-first, GST-correct POS that cannot oversell."],
    ["box", "Stock & buy", "Catalog, batches, purchasing and counts on one ledger."], ["truck", "Distribute", "Orders, challans, delivery proof, receipts and ledgers."],
    ["shield", "Comply & govern", "21 reports, GSTR-1, two-factor sign-in, roles and audit."]],
    "Owner dashboard in dark mode: sales, stock alerts, expiry and top products (demo data).", false, "medicare.heeliks.com");
  sl.addNotes("Every purchase, receipt, sale, return, transfer and count posts to one append-only stock ledger, so stock, sales and books agree by construction (apps/inventory/stock.py).");

  // 4 AT A GLANCE
  sl = K.add("MT_CONTENT_TINT"); K.head(sl, "At a glance", "A complete platform, counted from the code");
  const stats = [["16", "domain modules"], ["70", "data models"], ["169", "routes and screens"], ["21", "exportable reports"],
    ["5 · 10", "roles · permission codes"], ["348", "automated tests"], ["5", "verticals configured at signup"], ["1", "database per customer"]];
  stats.forEach(([v, l], i) => { const w = (G.cw - 0.9) / 4, x = G.mx + (i % 4) * (w + 0.3), y = 1.85 + Math.floor(i / 4) * 2.0, hi = i === 7;
    card(sl, x, y, w, 1.7, hi ? T.midnight : T.white, hi ? T.midnight : T.line);
    txt(sl, v, x + 0.3, y + 0.25, w - 0.6, 0.75, { fontSize: 40, bold: true, color: hi ? T.amber : A });
    txt(sl, l, x + 0.3, y + 1.05, w - 0.6, 0.4, { fontSize: 13, color: hi ? T.white : T.slate700 }); });
  txt(sl, "Source: code review of the HeeLIKS repository (commit 3b66227, 10 Nov 2026): app configs, models, URL resolver, rbac seeding and test functions.", G.mx, 6.05, G.cw, 0.3, { fontSize: 11, color: T.slate500 });
  sl.addNotes("All figures were counted from the code, not taken from marketing copy. The website's '~81 tests' and '99.8% uptime engineered' lines are not used.");

  // 5 WHO IT SERVES
  sl = K.add(); K.head(sl, "Who it serves", "Built for every role in the business");
  K.iconCards(sl, [["crown", "Owner / Admin", "The economic buyer. Full access: dashboard, reports, users, subscription and billing."],
    ["building", "Manager", "Catalog, stock and purchasing with approval, returns and reports. Discount cap 20%."],
    ["cart", "Cashier", "POS and returns only, on a focused menu. Discount cap 5%; opens and closes the register."],
    ["box", "Store staff", "Receives goods, adjusts and counts stock. No pricing or sales access."],
    ["eye", "Auditor / CA", "Read-only reports, catalog and stock. Every attempt beyond that is denied and logged."],
    ["server", "HeeLIKS operator", "Runs the platform console: provisioning, plans and payments, with tenant metadata only."]], 3, 1.8, 2.2);
  sl.addNotes("Roles and discount caps from apps/rbac/seeding.py (DEFAULT_ROLES, ROLE_CONSTRAINTS). Buyers: owner or proprietor of an outlet or chain; MD or finance head of a distributor. Influencers: store manager and accountant/CA.");

  // 6 PRODUCT MAP
  sl = K.add("MT_CONTENT_TINT"); K.head(sl, "Product map", "Five pillars, one stock ledger behind every module");
  const pillars = [["cart", "Sell", ["Point of sale", "Registers & Z-report", "Sales invoices", "Returns & notes"]],
    ["box", "Stock & Buy", ["Catalog & masters", "Inventory ledger", "Batches & expiry", "Procurement & GRN", "Partners"]],
    ["truck", "Distribute", ["Sales orders", "Challans & POD", "Receipts & ledger", "AR aging & collections"]],
    ["chart", "Insight & Comply", ["Owner dashboard", "21 reports", "GST & GSTR-1", "Alerts"]],
    ["shield", "Govern & Scale", ["Onboarding & import", "Security & 2FA", "Roles & audit", "Subscription", "Platform console", "REST API"]]];
  const pw = (G.cw - 4 * 0.25) / 5;
  pillars.forEach(([icn, h, items], i) => { const x = G.mx + i * (pw + 0.25), y = 1.75, ch = 4.0, hi = i === 4;
    card(sl, x, y, pw, ch, T.white); iconChip(sl, ic[icn], x + 0.25, y + 0.25, A, 0.5);
    txt(sl, h, x + 0.25, y + 0.9, pw - 0.4, 0.35, { fontSize: 15, bold: true, color: T.ink });
    sl.addText(items.map((t, k) => ({ text: t, options: { bullet: { indent: 12 }, breakLine: k < items.length - 1 } })), { x: x + 0.25, y: y + 1.35, w: pw - 0.4, h: ch - 1.45, margin: 0, fontSize: 12, color: T.slate700, valign: "top", paraSpaceAfter: 5, isTextBox: true }); });
  K.note(sl, "One append-only stock ledger sits behind every module: a sale, a goods receipt, a challan and a stock count all move the same numbers, in the same transaction.", 6.0, 0.62);
  sl.addNotes("Module map from HeeLIKS_coverage.csv (22 module rows, grouped) and the 16 Django apps. The website's 'nine modules' figure is out of date and is not used.");

  // 7 DIFFERENTIATORS
  sl = K.add(); K.head(sl, "Why HeeLIKS", "Eight differentiators, each verified in the product");
  K.iconCards(sl, [["db", "Database per customer", "Each workspace gets its own database; unknown subdomains are refused."],
    ["layers", "Ledger-true stock", "Row-locked, append-only ledger: two registers cannot sell the last unit."],
    ["clock", "FEFO and expiry control", "Earliest-expiry batch picked first; expired stock blocked at the counter."],
    ["gst", "GST compliance pack", "CGST/SGST/IGST split, HSN, GSTR-1 export, gapless series, s.34 notes."],
    ["shield", "Security by construction", "Enforced two-factor, one session per user, lockout and encrypted secrets."],
    ["user", "Roles with guard-rails", "Discount caps per role; every denied attempt is audited."],
    ["truck", "Full B2B order-to-cash", "Order, invoice, challan, POD, receipt and ledger on the same stock."],
    ["upload", "Go-live with undo", "Excel and Tally XML import with dry-run, reconciliation and exact undo."]], 4, 1.8, 2.1);
  sl.addNotes("USPs U1–U10 in product_analysis.md, each with a code reference (TenantResolverMiddleware, stock.py post_movement and fefo_allocate, reporting/returns services, accounts and middleware, rbac decorators, orders services, importer).");

  // ===== PILLAR 1 SELL
  sl = divider("Sell · checkout that never oversells", "Point of sale, registers, invoices and returns: every sale posts stock, tax and cash in one transaction.", 1);
  sl.addNotes("Pillar 1: the counter.");

  sl = K.add(); K.head(sl, "Point of sale", "Checkout in seconds, GST-correct every time");
  await K.heroFeature(sl, Object.assign(H("S12_pos_split_payment"), { fh: 3.9 }), [["scan", "Scan or type ahead", "HID barcode scanners, SKU or name search, with exact matches straight to the cart."],
    ["wallet", "Split tender", "Cash, card, UPI and store credit on one bill; change computed live."],
    ["percent", "Role-capped discounts", "Line or bill discount, capped per role; overrides are blocked and logged."],
    ["zap", "Atomic and gapless", "Sale, stock-out, cost snapshot and fiscal-year invoice number in one transaction."]],
    "POS: three-line cart with bill discount and a UPI + cash split (demo data).", false, "medicare.heeliks.com/pos");
  sl.addNotes("apps/sales/services.py and static/js/pos.js. CGST/SGST/IGST is split by place of supply. Customer name and number on screen are seeded demo data.");

  sl = K.add(); K.head(sl, "At the counter", "Built for the busiest counter in town");
  await K.cols(sl, [Object.assign(H("S14_pos_parked"), { h: "Park and resume", b: "Hold a cart while the customer fetches one more item; resume it with F7. F2 search and F4 charge keep hands on the keyboard." }),
    Object.assign(H("S02_sale_receipt"), { h: "Print or email", b: "80 mm or 58 mm thermal, A4 PDF, or email; branded with the outlet profile." }),
    Object.assign(H("S01_sales_invoices"), { h: "Invoice register", b: "Every bill with tender and customer; search, filter and reprint, with gapless numbering." })], 3.05);
  sl.addNotes("Counter features from the coverage map: park/unpark, receipts, keyboard shortcuts.");

  sl = K.add(); K.head(sl, "Registers and Z-report", "Every rupee in the drawer, accounted for");
  await K.twoShots(sl, Object.assign(H("S15_register_close"), { cap: "Close register: count the drawer; the variance is computed (demo data)." }),
    Object.assign(H("S04_z_report"), { cap: "Z-report for a session, printable at day end." }),
    [["cash", "Opening float", "Every shift starts counted."], ["user", "Session per cashier", "One open session each."], ["calc", "Computed variance", "Float + net cash vs counted."], ["file", "Z-report", "Printable end-of-day summary."]]);
  sl.addNotes("Registers module: open with float, close with counted cash, Z-report with variance, session history.");

  sl = K.add(); K.head(sl, "Returns and credit notes", "Refunds in a minute, with a compliant credit note");
  await K.twoShots(sl, Object.assign(H("R02_return_lookup"), { cap: "Returns start from the real sale: lookup by invoice number or customer." }),
    Object.assign(H("R04_credit_debit_notes"), { cap: "Credit and debit notes, including standalone notes with s.34 reasons." }),
    [["search", "Find the sale", "Invoice number or customer."], ["undo", "Restock or write off", "Per line: shelf or damaged stock."], ["receipt", "Numbered credit note", "Tax reversed in proportion."], ["clock", "Return window", "Configurable; older invoices refused."]]);
  sl.addNotes("apps/returns/services.py. Standalone credit/debit notes cover CGST Act section 34 reasons without fake stock movements.");

  // ===== PILLAR 2 STOCK & BUY
  sl = divider("Stock & Buy · stock you can trust", "Catalog, inventory ledger, batches and expiry, purchasing and partners: one append-only ledger behind every number.", 2);
  sl.addNotes("Pillar 2: master data, stock and purchasing.");

  sl = K.add(); K.head(sl, "Catalog and masters", "Clean master data at thousand-SKU scale");
  await K.heroFeature(sl, H("C01_products"), [["tag", "Rich product records", "SKU, HSN, MRP, cost, reorder level and batch tracking."],
    ["barcode", "Barcodes and labels", "Multiple barcodes per item; Code128 labels ready to print."],
    ["ruler", "Units and tax classes", "Strip, box or bottle with conversions; GST slabs mapped per product."],
    ["upload", "Bulk import", "CSV or Excel with a template and validation."]],
    "Product list: SKU, barcode, cost, MRP, margin and status (demo data).", true, "medicare.heeliks.com/products");
  sl.addNotes("Catalog module: products, categories, brands, manufacturers, units with conversions, tax classes, barcode labels and import (C01–C10).");

  sl = K.add(); K.head(sl, "Inventory ledger", "On-hand is a ledger, not a guess");
  colLabel(sl, "Every movement", G.mx, 3);
  [["Goods receipt", "+ batch, expiry, cost"], ["Sale / return", "- or + at the counter"], ["Transfer", "location to location"], ["Count / adjustment", "with a reason code"]].forEach(([h, s], i) => sbox(sl, G.mx, 2.05 + i * 0.9, 2.9, 0.75, h, s));
  sbox(sl, 4.15, 2.05, 3.0, 3.45, "Append-only stock ledger", "Signed entries only: never edited or deleted. Row-locked with an availability re-check, so nothing oversells.", { fill: T.midnight, line: T.midnight, hc: T.white, sc: T.onDarkMuted, hs: 16, ss: 12 });
  [2.42, 3.32, 4.22, 5.12].forEach(y => K.line(sl, 3.5, y, 4.15, y));
  colLabel(sl, "Always derived", 7.85, 3);
  [["On hand · reserved · available", "per product, batch and location"], ["Stock value", "moving-average cost"], ["Reports and alerts", "valuation, movement, low stock"]].forEach(([h, s], i) => sbox(sl, 7.85, 2.05 + i * 1.2, 4.88, 1.0, h, s, { fill: tint(A, 0.92), line: tint(A, 0.6) }));
  K.line(sl, 7.15, 3.77, 7.85, 3.77);
  K.note(sl, "Because stock levels are a projection of the ledger, every discrepancy has a paper trail: who moved what, when and why.", 5.85, 0.62);
  sl.addNotes("apps/inventory/stock.py: post_movement writes StockLedger and updates the StockLevel projection under SELECT ... FOR UPDATE with an availability re-check; moving-average cost.");

  sl = K.add(); K.head(sl, "Batches, FEFO and expiry", "Catch expiry before it becomes a write-off");
  await K.twoShots(sl, Object.assign(H("I02_batches_expiry"), { cap: "Batches and expiry: days left with expired and expiring flags (demo data)." }),
    Object.assign(H("T06_settings_alerts"), { cap: "Alerts: low-stock and expiry thresholds with an email channel." }),
    [["clock", "FEFO allocation", "Earliest expiry sells first."], ["ban", "Expired blocked", "Cannot be sold at the counter."], ["bell", "Stock alerts", "Hourly scan, de-duplicated."], ["mail", "Email delivery", "Digests to chosen people."]]);
  sl.addNotes("fefo_allocate in apps/inventory/stock.py; alerts in apps/notifications with dedupe and auto-resolve; hourly Celery beat scan.");

  sl = K.add(); K.head(sl, "Counts, transfers and adjustments", "Every stock movement lands on the ledger");
  await K.cols(sl, [Object.assign(H("I07_count_entry"), { h: "Physical counts", b: "System vs counted quantity; only the difference posts, as a variance." }),
    Object.assign(H("I05_transfer_create"), { h: "Inter-location transfers", b: "Out of one location and into another, as two ledger entries." }),
    Object.assign(H("I03_adjustments"), { h: "Reasoned adjustments", b: "Damage, shrinkage or correction, with a reason code every time." })], 2.45);
  K.note(sl, "Stock is held per location: stores and warehouses each keep their own on-hand, users are bound to outlets, and the outlet switcher shows one store or all.", 5.6, 0.7);
  sl.addNotes("Inventory module: counts with variance posting, transfers, adjustments with reason codes, and locations/warehouses (I03–I09). Multi-outlet via the outlet switcher.");

  sl = K.add("MT_CONTENT_TINT"); K.head(sl, "Procure to stock", "Purchase with control, receive with proof");
  steps(sl, [["list", "Reorder", "The reorder report lists items below level; one click turns it into a draft PO."],
    ["file", "Draft PO", "Lines, unit costs and expected date, raised against a vendor."],
    ["sign", "Approve", "A separate permission: the buyer cannot self-approve."],
    ["truck", "Receive (GRN)", "Batch, expiry and cost captured per line against the supplier invoice."],
    ["layers", "Post to ledger", "Stock and moving-average cost update; partial receipts tracked."],
    ["returns", "Supplier return", "Return-out posts stock and raises a debit note."]], 1.9, 3.5, 2);
  K.note(sl, "Statuses run draft, approved, partially received, received and cancelled. POs print as branded A4 PDFs for the vendor.", 5.7, 0.62);
  sl.addNotes("apps/procurement: PO workflow with a separate approve permission, GRN with batch/expiry, supplier returns with debit notes, PO PDF, reorder report to PO.");

  sl = K.add(); K.head(sl, "Purchase orders and receipts", "Ordered against received, line by line");
  await K.twoShots(sl, Object.assign(H("U02_po_detail"), { cap: "Purchase order: ordered vs received, with its goods receipts (demo data)." }),
    Object.assign(H("U05_grn_detail"), { cap: "Goods receipt: supplier invoice, batch, expiry, quantity and cost." }),
    [["sign", "Separation of duties", "Approval is its own permission."], ["truck", "GRN posts stock", "Batch and cost captured per line."], ["printer", "PO as A4 PDF", "Send a branded order to the vendor."], ["check", "Invoice matched", "GRN records the supplier invoice no."]]);
  sl.addNotes("U01–U06 screens.");

  sl = K.add(); K.head(sl, "Reorder and price control", "Never run out, never overpay");
  await K.twoShots(sl, Object.assign(H("Q08_report_reorder"), { cap: "Reorder report: items below level, ready to become a purchase order." }),
    Object.assign(H("Q17_report_price_variance"), { cap: "Purchase price variance: rate history per product (demo data)." }),
    [["list", "Suggested reorder", "Below-level items with quantities."], ["zap", "One-click PO", "Turn the list into a draft order."], ["returns", "Return to vendor", "Stock out with a debit note."], ["trend", "Price variance", "Rate history per product."]]);
  sl.addNotes("Reorder report and supplier returns; purchase price variance report (Q17) shows rate creep per product.");

  sl = K.add(); K.head(sl, "Partners", "One party master for everyone you buy from and sell to");
  await K.heroFeature(sl, H("B20_customers_credit"), [["users", "One party, many roles", "Vendor, supplier, manufacturer and customer flags on one record."],
    ["gst", "GSTIN and state", "Drives CGST/SGST vs IGST and place of supply."],
    ["credit", "Credit terms", "Credit days and limit, checked when orders are confirmed."],
    ["history", "Opening balances", "Bring receivables across at go-live."]],
    "Customers with GSTIN, credit terms and limits, including B2B accounts (demo data).", false, "medicare.heeliks.com/customers");
  sl.addNotes("apps/partners: single party model.");

  // ===== PILLAR 3 DISTRIBUTE
  sl = divider("Distribute · order to cash", "Sales orders, invoices, delivery challans, proof of delivery and receipts: distributor-grade order-to-cash on the same stock truth.", 3);
  sl.addNotes("Pillar 3: the B2B module, included in the Business plan.");

  sl = K.add("MT_CONTENT_TINT"); K.head(sl, "Order-to-cash workflow", "From confirmed order to reconciled ledger, on one timeline");
  steps(sl, [["cart", "Confirm order", "Confirmation reserves stock and checks the customer's credit position."],
    ["file", "Invoice", "Invoice the order in full or in part; GST computed per line."],
    ["truck", "Dispatch", "One invoice, many challans: transport, LR and e-way bill reference."],
    ["check", "Proof of delivery", "Receiver and time recorded on the challan."],
    ["hand", "Receipt", "Bank, UPI or cheque, allocated to invoices; bounces reverse."],
    ["book", "Ledger and aging", "Append-only customer ledger, AR aging and collections."]], 1.9, 3.5, 2);
  K.note(sl, "Available-to-promise is computed from orders and stock, never typed in, so it cannot drift. Every step is stamped on the order's timeline.", 5.7, 0.62);
  sl.addNotes("apps/orders/services.py. Today HeeLIKS records the e-way bill number on the challan; generating e-way bills and e-invoices (IRN) is on the roadmap.");

  sl = K.add(); K.head(sl, "Sales orders", "Every order's story on one timeline");
  await K.heroFeature(sl, H("B06_order_detail_4"), [["check", "Draft to confirmed", "Confirmation reserves stock; advance terms recorded."],
    ["file", "Invoice from order", "Part or full, against the order."], ["timeline", "Full timeline", "Every action, user and time; audit pack export."],
    ["credit", "Money position", "Advance, received and outstanding at a glance."]],
    "Order detail: lines, invoices, challans, money position and timeline (demo data).", true, "medicare.heeliks.com/orders");
  sl.addNotes("B01–B08 screens. 'LifeCare Nursing Home' and similar names are seeded demo customers.");

  sl = K.add(); K.head(sl, "Dispatch and delivery", "Ship in parts, invoice once, prove delivery");
  await K.twoShots(sl, Object.assign(H("B10_challans"), { cap: "Delivery challans by status across confirmed orders (demo data)." }),
    Object.assign(H("B12_challan_detail"), { cap: "Challan: transport details, e-way bill reference and proof of delivery." }),
    [["truck", "Dispatch moves stock", "Reservation consumed on dispatch."], ["layers", "Many challans", "Part-shipments, one invoice."], ["map", "Transport details", "Vehicle, LR, e-way bill no."], ["check", "Proof of delivery", "Receiver and time recorded."]]);
  sl.addNotes("B10–B12 screens and the challan PDF (E07), which prints without prices.");

  sl = K.add(); K.head(sl, "Receipts, ledger and collections", "Know who owes what, and since when");
  await K.mainStack(sl, H("B19_collections"), H("B16_customer_ledger"), H("B17_ar_aging"),
    ["Collections: receivables, bounced instruments and credit limits (demo data)", "Customer ledger with a running balance", "AR aging by bucket, per customer"]);
  sl.addNotes("Receipts and allocation, bounced instruments, append-only customer ledger with PDF/Excel statements, AR aging, order book and collections (B13–B19).");

  // ===== PILLAR 4 INSIGHT & COMPLY
  sl = divider("Insight & Comply · answers in one click", "The owner dashboard, 21 reports, GST packs and branded Excel and PDF exports.", 4);
  sl.addNotes("Pillar 4: reporting and compliance.");

  sl = K.add(); K.head(sl, "Owner dashboard", "The whole business before the first coffee");
  await K.heroFeature(sl, H("D02_dashboard_full"), [["gauge", "Live KPIs", "Today's sales, bills, low stock and items expiring within 30 days."],
    ["trend", "Trend and top sellers", "7- or 14-day sales trend; top products by revenue."], ["alert", "Actionable alerts", "Low-stock and expiring items one click away."],
    ["store", "Outlet switcher", "All outlets, or one store at a time."]],
    "MediCare Pharmacy dashboard (demo data).", false, "medicare.heeliks.com");
  sl.addNotes("Dashboard module (D01–D04). Figures on screen are demo data.");

  sl = K.add("MT_CONTENT_TINT"); K.head(sl, "Reports", "Twenty-one reports, each one click from Excel");
  const RG = [["cart", "Sales & daily", ["Sales, profit & margin", "Discounts by cashier", "Customer analytics", "Day book"]],
    ["box", "Inventory", ["Valuation", "Stock movement", "Expiry & batch", "Reorder", "Slow-moving stock", "Shrinkage"]],
    ["truck", "Purchasing", ["Purchases", "Vendor scorecard", "Spend", "Price variance", "Committed spend"]],
    ["gst", "Compliance", ["Tax / GST", "GSTR-1 export", "Document series"]],
    ["hand", "B2B", ["Order book", "Collections", "AR aging"]]];
  const rw = (7.35 - 0.5) / 3;
  RG.forEach(([icn, h, items], i) => { const col = i % 3, row = Math.floor(i / 3), x = G.mx + col * (rw + 0.25), y = 1.75 + row * 2.42, ch = 2.22;
    card(sl, x, y, rw, ch, T.white); iconChip(sl, ic[icn], x + 0.2, y + 0.2, A, 0.42);
    txt(sl, `${h} · ${items.length}`, x + 0.75, y + 0.24, rw - 0.9, 0.35, { fontSize: 13.5, bold: true, color: T.ink });
    sl.addText(items.map((t, k) => ({ text: t, options: { bullet: { indent: 11 }, breakLine: k < items.length - 1 } })), { x: x + 0.22, y: y + 0.75, w: rw - 0.35, h: ch - 0.85, margin: 0, fontSize: 11.5, color: T.slate700, valign: "top", paraSpaceAfter: 2, isTextBox: true }); });
  card(sl, G.mx + 2 * (rw + 0.25), 1.75 + 2.42, rw, 2.22, T.midnight, T.midnight);
  txt(sl, "Every report", G.mx + 2 * (rw + 0.25) + 0.25, 4.4, rw - 0.5, 0.35, { fontSize: 14, bold: true, color: T.white });
  txt(sl, "Filter and group by period, outlet, product or tender. Export to branded Excel (frozen headers, totals), PDF or CSV.", G.mx + 2 * (rw + 0.25) + 0.25, 4.8, rw - 0.5, 1.4, { fontSize: 11.5, color: T.onDarkMuted });
  frame(sl, await K.S(H("Q00_reports_hub"), 4.68, 4.62), 8.05, 1.75, 4.68, 4.62, { alt: "Report hub" });
  caption(sl, "Report hub: daily, sales, inventory, purchasing, compliance, B2B.", 8.05, 6.45, 4.68);
  sl.addNotes("21 reports per apps/reporting/urls.py (22 routes including the hub). Exports from apps/reporting/exports.py; pre-aggregated SalesDailySummary read-model.");

  sl = K.add(); K.head(sl, "GST compliance", "GST-ready from the very first bill");
  await K.twoShots(sl, Object.assign(H("Q05_report_gstr1"), { cap: "GSTR-1 export: B2B, B2CS and HSN summary (demo data)." }),
    Object.assign(H("Q13_report_series"), { cap: "Document-series register: gap check across invoice and note series." }),
    [["gst", "CGST / SGST / IGST", "Split by place of supply on every line."], ["sheet", "GSTR-1 ready", "B2B, B2CS and HSN sections, Excel export."], ["receipt", "s.34 credit / debit notes", "Standalone notes without fake stock moves."], ["list", "Gapless series", "Fiscal-year numbering, audited for gaps."]]);
  sl.addNotes("Tax/GST report (Q04), GSTR-1 (Q05) and document series (Q13). GSTR-1 is an export for filing; HeeLIKS does not file returns on the GST portal.");

  sl = K.add(); K.head(sl, "Documents and exports", "Documents your accountant will actually use");
  await K.cols(sl, [Object.assign(F("E06_invoice_a4_pdf"), { h: "Tax invoice, A4 PDF", b: "Branded with the outlet profile; thermal layouts too." }),
    Object.assign(F("E01_sales_report_xlsx"), { h: "Branded Excel", b: "Frozen headers and totals, ready for the CA." }),
    Object.assign(F("E07_challan_pdf"), { h: "Delivery challan", b: "Transport details, printed without prices." })], 3.2);
  sl.addNotes("Real files generated by the product are in HeeLIKS_exports (sales and GSTR-1 Excel; inventory, AR aging, PO, invoice and challan PDFs).");

  // ===== PILLAR 5 GOVERN & SCALE
  sl = divider("Govern & Scale · secure, and live in days", "Onboarding and import, two-factor security, roles and audit, subscriptions and the platform console.", 5);
  sl.addNotes("Pillar 5: control and scale.");

  sl = K.add(); K.head(sl, "Go-live and data import", "Import safely: stage, dry-run, commit, reconcile, undo");
  const gl = [["upload", "Stage", "Workbook, Tally Masters XML or per-entity CSV/Excel."], ["eye", "Dry-run", "Every row validated with zero writes."], ["check", "Commit", "Atomic: all rows or none."], ["calc", "Reconcile", "Declared vs imported totals must hit zero variance."], ["undo", "Undo", "Roll back a committed batch exactly."]];
  const gw = (G.cw - 4 * 0.25) / 5;
  gl.forEach(([icn, h, b], i) => { const x = G.mx + i * (gw + 0.25); card(sl, x, 1.75, gw, 1.75, i === 3 ? T.midnight : T.paper, i === 3 ? T.midnight : T.line);
    iconChip(sl, ic[icn], x + 0.2, 1.95, A, 0.42); txt(sl, h, x + 0.75, 1.98, gw - 0.9, 0.35, { fontSize: 14, bold: true, color: i === 3 ? T.white : T.ink });
    txt(sl, b, x + 0.2, 2.5, gw - 0.35, 0.9, { fontSize: 11.5, color: i === 3 ? T.onDarkMuted : T.slate700 });
    if (i < 4) K.line(sl, x + gw + 0.02, 2.62, x + gw + 0.23, 2.62); });
  const gfw = (G.cw - 0.3) / 2;
  frame(sl, await K.S(H("O01_onboarding"), gfw, 2.6), G.mx, 3.75, gfw, 2.6, { alt: "Go-live checklist" });
  frame(sl, await K.S(H("O03_import_reconciliation"), gfw, 2.6), G.mx + gfw + 0.3, 3.75, gfw, 2.6, { alt: "Import reconciliation" });
  caption(sl, "Guided go-live checklist (demo data).", G.mx, 6.42, gfw); caption(sl, "Import reconciliation: control totals checked to zero variance.", G.mx + gfw + 0.3, 6.42, gfw);
  sl.addNotes("apps/importer (registry.py, tally.py): stage, dry-run with zero writes, atomic commit, exact undo, reconciliation; read-only history archive for old Tally documents (O07, O08).");

  sl = K.add(); K.head(sl, "Security and sign-in", "Two-factor for every user, no exceptions");
  await K.twoShots(sl, Object.assign(H("A04_twofa_enrol_qr", [0, 0]), { cap: "Forced two-factor enrolment by QR code at first sign-in." }),
    Object.assign(H("A05_session_conflict", [0, 0]), { cap: "One session per user: a new sign-in replaces the old one." }),
    [["key", "Argon2 + TOTP", "Backup codes and email OTP fallback."], ["lock", "Lockout and limits", "5 strikes; rate-limited endpoints."], ["clock", "Idle expiry", "8-hour sliding inactivity timeout."], ["shield", "Encrypted secrets", "TOTP secrets encrypted at rest."]]);
  sl.addNotes("apps/accounts/views.py, SingleSessionMiddleware, apps/common/crypto.py (Fernet), apps/common/ratelimit.py. HSTS, secure cookies and SSL redirect in production. No external security certification is claimed.");

  sl = K.add(); K.head(sl, "Roles, caps and audit", "Exactly the right access, and every change on record");
  await K.twoShots(sl, Object.assign(H("V02_cashier_discount_cap"), { cap: "A cashier's 40% discount blocked by the 5% role cap." }),
    Object.assign(H("T07_settings_audit"), { cap: "Audit log: field-level before and after values, and denied-access events." }),
    [["users", "10 permissions, 5 roles", "Plus custom roles."], ["percent", "Discount caps", "Cashier 5%, Manager 20%."], ["store", "Outlet binding", "Users restricted to their stores."], ["history", "Append-only audit", "Entries cannot be edited or deleted."]]);
  sl.addNotes("apps/rbac/seeding.py and decorators.py; record_audit in apps/settings_app/services.py. Role-aware navigation (V01–V08).");

  sl = K.add(); K.head(sl, "Subscription and platform console", "Self-serve for customers, one console for the operator");
  await K.twoShots(sl, Object.assign(H("T05_settings_subscription"), { cap: "Subscription: plan, renewal, usage meters and add-ons (demo data)." }),
    Object.assign(H("M03_platform_dashboard", [0, 0]), { cap: "Platform console: tenants, subscriptions, collections and renewals." }),
    [["credit", "Razorpay checkout", "HMAC-verified payment activates the workspace."], ["gauge", "Usage meters", "Seats, outlets and products per plan."], ["clock", "Trial and grace", "14-day trial; 15-day grace, then suspension."], ["server", "Operator console", "Provision, suspend, extend; metadata only."]]);
  sl.addNotes("apps/control (plans.py, billing.py, tasks.py, console/). The console sees tenant metadata and usage counts only, never business data.");

  // ===== PLATFORM
  K.sec("Platform");
  sl = K.add(); K.head(sl, "Architecture", "Isolation-first and multi-tenant by design");
  colLabel(sl, "Clients", G.mx, 2.5);
  [["Browsers and counters", "POS, back office, console"], ["Scanners and printers", "HID barcode, thermal, A4"], ["Integrations", "REST API clients, Tally XML"]].forEach(([h, s], i) => sbox(sl, G.mx, 2.05 + i * 1.05, 2.6, 0.9, h, s));
  sbox(sl, 3.6, 2.05, 2.1, 3.0, "Nginx", "*.heeliks.com wildcard DNS and TLS; gated file serving", { fill: tint(A, 0.92), line: tint(A, 0.6) });
  [2.5, 3.55, 4.6].forEach(y => K.line(sl, 3.2, y, 3.6, y));
  colLabel(sl, "Django application tier", 6.1, 3.4);
  [["1  Tenant resolver", "subdomain to tenant database, fail-closed"], ["2  Session and idle expiry", "one active session per user"], ["3  Auth: Argon2 + TOTP", "lockout, rate limits"], ["4  RBAC on every view and API", "10 permission codes"], ["5  Services and audit log", "ledger, POS, orders, imports"]].forEach(([h, s], i) => sbox(sl, 6.1, 2.05 + i * 0.62, 3.4, 0.54, h, s, { fill: i === 0 ? T.midnight : T.white, line: i === 0 ? T.midnight : T.line, hc: i === 0 ? T.white : T.ink, sc: i === 0 ? T.onDarkMuted : T.slate500, hs: 12, ss: 10 }));
  K.line(sl, 5.7, 3.55, 6.1, 3.55);
  colLabel(sl, "Data", 9.95, 2.8);
  sbox(sl, 9.95, 2.05, 2.78, 0.75, "Control database", "tenants, plans, payments, platform audit", { ss: 10 });
  ["One database per tenant", "e.g. stocksage_medicare", "e.g. stocksage_freshmart"].forEach((t, i) => sbox(sl, 9.95, 2.95 + i * 0.55, 2.78, 0.47, t, null, { fill: tint(A, 0.9), line: tint(A, 0.55), hs: 11.5 }));
  sbox(sl, 9.95, 4.7, 2.78, 0.6, "Redis + Celery beat", "cache, rate limits, scheduled jobs", { ss: 10 });
  [2.42, 3.5].forEach(y => K.line(sl, 9.5, y, 9.95, y));
  K.note(sl, "Each tenant's data lives only in its own database; the control database holds commercial metadata. Provisioning runs create database, migrate, then seed roles and defaults.", 5.75, 0.7);
  sl.addNotes("config/settings/routers.py, apps/common/middleware.py, apps/control/provisioning.py. The 'stocksage_' prefix is the product's legacy codename in database names.");

  sl = K.add(); K.head(sl, "Integrations and technology", "Connects to the tools you already run, on a proven stack");
  [["credit", "Razorpay", "Checkout with HMAC-verified webhooks."], ["mail", "Office 365 / SMTP", "Receipts, alerts, password resets, OTP."], ["book", "Tally", "Masters XML import with opening stock."],
   ["sheet", "Excel and CSV", "Import templates and every export."], ["code", "REST API", "Tenant-scoped, RBAC-checked: products, stock, sales."], ["printer", "Scanners and printers", "HID barcode, Code128 labels, thermal and A4."]].forEach(([icn, h, b], i) =>
    K.feat(sl, ic[icn], h, b, G.mx + (i % 2) * 3.7, 1.85 + Math.floor(i / 2) * 1.35, 3.5, 0.48));
  card(sl, 8.2, 1.75, 4.53, 4.05, T.midnight, T.midnight);
  colLabel(sl, "Technology stack", 8.5, 4, 2.0, T.amber);
  sl.addText([["Python 3.12 · Django 5 · DRF", "application and API"], ["MySQL 8", "one control DB plus one DB per tenant"], ["Redis 7 · Celery 5.4 beat", "cache, rate limits, scheduled jobs"],
    ["Tailwind UI · server-rendered", "responsive web, dark mode"], ["ReportLab · openpyxl", "PDF documents and Excel exports"], ["Gunicorn · Nginx · Docker", "wildcard TLS, systemd, Compose"]].flatMap(([h, s], k, arr) =>
    [{ text: h, options: { bold: true, fontSize: 13, color: T.white, breakLine: true } }, { text: s, options: { fontSize: 11, color: T.onDarkMuted, breakLine: k < arr.length - 1, paraSpaceAfter: 7 } }]),
    { x: 8.5, y: 2.35, w: 4.0, h: 3.35, margin: 0, valign: "top", isTextBox: true });
  K.note(sl, "Web only: HeeLIKS runs in any modern browser on desktop or tablet. There is no native mobile app.", 6.05, 0.55);
  sl.addNotes("Integrations: apps/api, apps/control/billing.py, config/settings/base.py, catalog barcode views, importer/tally.py. Cloudflare Turnstile protects public forms. Stack from requirements and docker-compose.yml; CI runs lint, pytest on MySQL and a migrations check.");

  sl = K.add(); K.head(sl, "Industry fit", "One platform, configured for five verticals at signup");
  await K.cols(sl, [Object.assign(H("Z11_dashboard"), { h: "Retail and fashion", b: "Size and colour variants as SKUs on shared masters (Urban Threads, demo)." }),
    Object.assign(H("Z21_dashboard"), { h: "Grocery and kirana", b: "Perishables, loose and packed units, fast billing (FreshMart, demo)." }),
    Object.assign(H("Z31_dashboard"), { h: "Bookstores", b: "Large title catalogues by title and edition (Page Palace, demo)." }),
    Object.assign(H("Z41_dashboard"), { h: "Industrial spares", b: "High-value B2B lines, credit limits and AR (demo distributor)." })], 2.55);
  K.note(sl, "Pharmacy and medical, with batch, expiry and FEFO, is the MediCare demo used throughout this deck. Every vertical runs the same product; the outlet type chosen at signup sets the defaults.", 5.6, 0.7);
  sl.addNotes("Pharmacy and medical (batch, expiry, FEFO) is the MediCare demo used throughout. The outlet type chosen at signup tunes defaults (templates/site/solutions.html, seed_demo_tenant INDUSTRIES). These are configurations of one product, not separate editions. All five are fictional demo workspaces; the industrial one is a demo distributor, not a customer.");

  // ===== VALUE & NEXT STEPS
  K.sec("Value & next steps");
  sl = K.add("MT_DARK"); K.head(sl, "Why switch", "Today versus with HeeLIKS");
  K.compare(sl, "Today", "With HeeLIKS", [["Stock", "Spreadsheet, updated at day end", "Ledger updated with every sale"], ["Expiry", "Found at audit, written off", "FEFO selling and 30-day alerts"],
    ["GST", "Rebuilt from bill books", "GSTR-1 export in one click"], ["Access", "Shared logins, any discount", "Personal 2FA logins, role caps"], ["B2B", "Paper challans and khata", "Order to ledger, on one timeline"]],
    [["db", "Your own database", "Isolation by design, not a filter."], ["layers", "One stock truth", "Every module moves the same ledger."], ["gst", "Built for Indian GST", "From the first bill to GSTR-1."], ["upload", "Live in days", "Import with dry-run and undo."]]);
  sl.addNotes("Generic 'today' patterns, not a named competitor.");

  sl = K.add("MT_CONTENT_TINT"); K.head(sl, "Plans and deployment", "Cloud subscription or a perpetual on-premise licence");
  const PL = [["Starter", "₹999", "/ month", "1 user + admin · 1 outlet · 500 products. POS, inventory, returns, dashboard and reports."],
    ["Growth", "₹2,999", "/ month", "5 users + admin · 2 outlets · unlimited products. Adds purchasing, POs and goods receipts."],
    ["Business", "₹5,999", "/ month", "Unlimited users, outlets and products. Adds B2B order-to-cash for distributors and chains."],
    ["Perpetual", "₹7.5 L", "one-time", "The complete product on your own servers; optional AMC at 5% a year from year two."]];
  PL.forEach(([n, p, per, b], i) => { const w = (G.cw - 0.9) / 4, x = G.mx + i * (w + 0.3), hi = i === 3;
    card(sl, x, 1.8, w, 3.65, hi ? T.midnight : T.white, hi ? T.midnight : T.line);
    txt(sl, n.toUpperCase(), x + 0.3, 2.05, w - 0.6, 0.3, { fontSize: 11, bold: true, charSpacing: 2, color: hi ? T.amber : A });
    txt(sl, p, x + 0.3, 2.45, w - 0.6, 0.65, { fontSize: 32, bold: true, color: hi ? T.white : T.ink });
    txt(sl, per, x + 0.3, 3.12, w - 0.6, 0.3, { fontSize: 12, color: hi ? T.onDarkMuted : T.slate500 });
    txt(sl, b, x + 0.3, 3.6, w - 0.6, 1.75, { fontSize: 12.5, color: hi ? T.onDarkMuted : T.slate700 }); });
  K.note(sl, "Prices exclude GST. Quarterly saves about 10% and yearly about 20%. 14-day free trial. Extra users ₹599 and extra outlets ₹699 a month on Starter and Growth.", 5.7, 0.7);
  sl.addNotes("Prices from apps/control/plans.py and templates/site/pricing.html (D:\\heeliks, read-only): Starter 999/2,699/9,599; Growth 2,999/8,099/28,799; Business 5,999/16,199/57,599 (monthly/quarterly/yearly). Perpetual 7,50,000 + optional 5% AMC from year two, with 6–12 months support included; self-hosted, the customer provides the server. Confirm the live price list before quoting.");

  sl = K.add(); K.head(sl, "Indicative rollout", "From kick-off to every outlet live in about a month");
  steps(sl, [["target", "Discover · week 0", "Outlets, roles, plan and data sources agreed."], ["server", "Provision · week 1", "Workspace with its own database; profile, tax and users."],
    ["upload", "Import · weeks 1–2", "Workbook or Tally import, dry-run and reconcile."], ["users", "Pilot · weeks 2–3", "Train by role; run one outlet live."],
    ["rocket", "Go live · weeks 3–4", "Lock go-live; roll out the remaining outlets."]], 1.9, 3.3, 4);
  K.note(sl, "Indicative only. Timing depends on the number of outlets, data quality and training availability, and is confirmed per engagement.", 5.55, 0.62);
  sl.addNotes("Indicative plan from the source deck. Not a commitment.");

  sl = K.add("MT_DARK"); K.head(sl, "Roadmap", "What's next on the HeeLIKS roadmap");
  K.darkCards(sl, [["gst", "e-Invoice (IRN)", "Generate the IRN and signed QR through the GST portal."], ["truck", "e-Way bill generation", "Today the number is recorded; next, generate it."],
    ["book", "Tally export", "Push vouchers back to Tally for accounting."], ["file", "Quotations", "Quote to order conversion for B2B sales."],
    ["users", "Customer portal", "B2B customers view orders, invoices and statements."], ["hand", "Payables workflow", "Vendor invoices and supplier payments."]], 3, 1.85, 2.0, "PLANNED");
  K.txt(sl, "Planned items from the product roadmap (docs/Roadmap.md, Phase D). Not in the current release; timelines to be confirmed.", G.mx, 6.45, G.cw, 0.3, { fontSize: 11, color: T.onDarkMuted });
  sl.addNotes("Roadmap only: nothing on this slide is shipped. Never present these as available.");

  sl = K.add("MT_CLOSE");
  K.close(sl, { title: "Put one outlet on HeeLIKS, with your own data", body: "We provision your workspace, import your product list and opening stock, reconcile it with you, and train your team by role.", subtitle: "HeeLIKS · Inventory, POS & Distribution" });
  sl.addNotes("One ask: a pilot outlet. Product contacts from the HeeLIKS site templates: sales@heeliks.com, support@heeliks.com (heeliks.com was unavailable on 10 Nov 2026; confirm before adding them to the slide).");

  await pres.writeFile({ fileName: OUT });
  console.log("written", OUT, pres.slides.length, "slides");
})();
