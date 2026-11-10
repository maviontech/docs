// SalesPulse_CRM_Final.pptx
const fs = require("fs");
const pptxgen = require("pptxgenjs");
const M = require("./mt");
const { makeKit } = require("./deckkit");
const { T, TYPE, G, tint, frame, iconChip, caption, card } = M;
const SM = M.ROOT + "/02_Working_Notes/sp_media/";
const OUTDIR = M.ROOT + "/Final_Product_Decks/SalesPulse_CRM";
const OUT = process.env.OUT || (OUTDIR + "/SalesPulse_CRM_Final.pptx");
fs.mkdirSync(OUTDIR, { recursive: true });
const I = f => ({ src: SM + f });
const IMG = { dash: I("S04_image1.jpg"), myday: I("S06_image2.jpg"), lead: I("S07_image3.jpg"), incall: I("S08_image-8-1.jpg"), after: I("S09_image-9-1.jpg"),
  leads: I("S12_image4.jpg"), pipe: I("S13_image5.jpg"), c360: I("S14_image-12-1.jpg"), activity: I("S15_image-13-1.jpg"), command: I("S16_image8.jpg"),
  builder: I("S17_image9.jpg"), weekly: I("S18_image10.jpg"), invoice: I("S20_image-17-2.jpg"), platform: I("S24_image-20-4.jpg") };
const ICONS = { shield: "LuShieldCheck", phone: "LuPhone", phoneIn: "LuPhoneIncoming", eyeoff: "LuEyeOff", sheet: "LuFileSpreadsheet", eye: "LuEye",
  users: "LuUsers", gst: "LuReceiptIndianRupee", flag: "LuFlag", list: "LuListChecks", bell: "LuBell", trend: "LuTrendingUp", layers: "LuLayers",
  mail: "LuMail", msg: "LuMessageCircle", file: "LuFileText", copy: "LuCopy", upload: "LuUpload", kanban: "LuKanban", clock: "LuClock", target: "LuTarget",
  building: "LuBuilding2", star: "LuStar", gauge: "LuGauge", chart: "LuChartColumn", award: "LuAward", send: "LuSend", lock: "LuLock", ban: "LuBan",
  scan: "LuScanEye", stamp: "LuStamp", db: "LuDatabase", key: "LuKeyRound", wallet: "LuWallet", repeat: "LuRepeat", smartphone: "LuSmartphone",
  zap: "LuZap", rocket: "LuRocket", calendar: "LuCalendarDays", smile: "LuSmile", pen: "LuPenLine", briefcase: "LuBriefcase", crown: "LuCrown", cog: "LuSettings2",
  map: "LuMapPin", inbox: "LuInbox", user: "LuUserCheck", activity: "LuActivity" };

(async () => {
  const pres = new pptxgen(); pres.layout = "LAYOUT_WIDE";
  pres.author = "MavionTech Pvt. Ltd."; pres.company = "MavionTech Pvt. Ltd."; pres.title = "SalesPulse CRM — India-first Sales CRM";
  pres.theme = { headFontFace: M.FONT.head, bodyFontFace: M.FONT.body };
  const A = M.PRODUCTS.salespulse.accent;
  M.defineLayouts(pres, "salespulse", await M.darkBg(A, "bg_cover_salespulse.png", "cover"), await M.darkBg(A, "bg_divider_salespulse.png", "divider"));
  const K = await makeKit(pres, "salespulse", "sp", ICONS);
  const { ic, icW, txt } = K;
  const mark = M.ASSETS + "/salespulse_mark.png";
  const colLabel = (sl, t, x, w, y = 1.7) => txt(sl, t.toUpperCase(), x, y, w, 0.25, { fontSize: 10, bold: true, charSpacing: 2, color: T.slate500 });
  const sbox = (sl, x, y, w, h, hd, sub, o = {}) => { sl.addShape("roundRect", { x, y, w, h, rectRadius: 0.08, fill: { color: o.fill || T.white }, line: { color: o.line || T.line, width: o.lw || 0.75 } });
    sl.addText([{ text: hd, options: { bold: true, fontSize: o.hs || 13, color: o.hc || T.ink, breakLine: !!sub } }].concat(sub ? [{ text: sub, options: { fontSize: 11, color: o.sc || T.slate500 } }] : []), { x: x + 0.15, y, w: w - 0.3, h, margin: 0, valign: "middle", align: o.align || "left", isTextBox: true }); };

  // 1 COVER
  K.sec("Opening");
  let sl = K.add("MT_COVER");
  K.cover(sl, { name: "SalesPulse CRM", category: "India-first Sales CRM", mark,
    promise: "Your reps sell. Your customers' numbers stay yours.",
    support: "A multi-tenant sales CRM with privacy-masked calling, a live pipeline and reports that build themselves, made for how Indian sales teams work.",
    chips: ["Masked calling", "Self-building reports", "GST-ready billing"] });
  await K.coverShots(sl, IMG.dash, IMG.incall, "SalesPulse · Director dashboard");
  sl.addNotes("Opening. SalesPulse CRM is a MavionTech product for Indian sales teams: INR, GST and Razorpay. Screens use a demo company (customers such as Orbit Retail and Riverstone Hotels are demo data).");

  // 2 PROBLEM
  sl = K.add(); K.head(sl, "The problem", "Where CRMs let Indian sales teams down");
  K.iconCards(sl, [["eyeoff", "Customer data leaks", "Reps hold raw phone numbers, and contacts walk out with them."],
    ["sheet", "Spreadsheet busywork", "Weekly numbers are re-typed by hand, and the data ends up inconsistent."],
    ["eye", "No real-time visibility", "Leaders can't see the pipeline or rep performance when it matters."],
    ["layers", "Fragmented customer view", "Accounts, calls and history scattered across disconnected tools."],
    ["gst", "Billing and GST chaos", "Manual invoicing that global tools weren't built for."],
    ["flag", "Not built for India", "Global CRMs are heavy, costly and a poor fit for Indian teams."]], 3, 1.8, 2.2);
  sl.addNotes("The six recurring failures of generic CRMs. The original deck's '5+ hours lost per rep' figure is not used because it is unsourced.");

  // 3 SOLUTION
  sl = K.add(); K.head(sl, "The solution", "One command center, built the way India sells");
  [["target", "Capture", "Leads captured, qualified and deduplicated in moments."], ["shield", "Protect", "Masked calling, email and WhatsApp: reps never see raw contact details."],
   ["kanban", "Run", "A weighted pipeline and a daily queue that tells every rep who to call."], ["chart", "Report", "Command center, report builder and weekly reports that fill themselves."]].forEach(([icn, h, b], i) => {
    const y = 1.82 + i * 1.12; iconChip(sl, ic[icn], G.mx, y, A, 0.52);
    txt(sl, h, G.mx + 0.72, y - 0.02, 3.9, 0.3, { fontSize: TYPE.h3, bold: true, color: T.ink }); txt(sl, b, G.mx + 0.72, y + 0.3, 3.9, 0.7, { fontSize: 12.5 }); });
  frame(sl, await K.S(IMG.dash, 7.13, 4.3), 5.6, 1.8, 7.13, 4.3, { url: "SalesPulse · Dashboard", alt: "Director dashboard" });
  caption(sl, "Director dashboard: open pipeline, closed value, conversion and leads by source (demo data).", 5.6, 6.2, 7.13);
  sl.addNotes("Capture, protect, run, report: the four jobs SalesPulse does for a sales organisation.");

  // 4 PERSONAS
  sl = K.add("MT_CONTENT_TINT"); K.head(sl, "Who uses SalesPulse", "Four roles, each seeing exactly what it should");
  [["briefcase", "BDE (sales rep)", "Works the daily queue, calls through masked lines, logs outcomes. Sees only their own leads and customers."],
   ["users", "Manager", "Coaches the team with talk-time, outcomes and RAG ratings; reviews weekly reports."],
   ["crown", "Director", "Runs the command center: org KPIs, closed-business trend and the leaderboard."],
   ["cog", "Admin", "Manages users, roles, billing and settings; the only role with bulk exports."]].forEach(([icn, h, b], i) => {
    const w = (G.cw - 0.9) / 4, x = G.mx + i * (w + 0.3); card(sl, x, 1.8, w, 3.4, T.white); iconChip(sl, ic[icn], x + 0.28, 2.08, A, 0.56);
    txt(sl, h, x + 0.28, 2.85, w - 0.56, 0.35, { fontSize: TYPE.h3, bold: true, color: T.ink }); txt(sl, b, x + 0.28, 3.25, w - 0.56, 1.8, { fontSize: 12.5 }); });
  K.note(sl, "Row-level access is enforced on the server, not just hidden on screen: every rep sees only their own leads and customers. Lead-list and report downloads are leadership-only.", 5.5, 0.72);
  sl.addNotes("Role-based access: BDE, Manager, Director, Admin, with company-code login.");

  // 5 DAY IN THE LIFE
  K.sec("Platform");
  sl = K.add(); K.head(sl, "A rep's day, end to end", "From the morning queue to the weekly report, with no re-typing");
  [["list", "My Day queue", "Highest-value, most-overdue actions first"], ["phone", "Masked call", "One click; the number is never shown"], ["pen", "Outcome logged", "Disposition, sentiment, next action"],
   ["send", "Follow-up", "Email or WhatsApp from the lead, masked"], ["sheet", "Weekly report", "Assembles itself from logged activity"]].forEach(([icn, h, b], i) => {
    const w = (G.cw - 4 * 0.3) / 5, x = G.mx + i * (w + 0.3), hi = i === 1;
    card(sl, x, 1.95, w, 2.8, hi ? T.midnight : T.paper, hi ? T.midnight : T.line);
    if (hi) { sl.addShape("roundRect", { x: x + 0.25, y: 2.2, w: 0.52, h: 0.52, rectRadius: 0.12, fill: { color: A }, line: { type: "none" } }); sl.addImage({ path: icW[icn], x: x + 0.38, y: 2.33, w: 0.26, h: 0.26 }); }
    else iconChip(sl, ic[icn], x + 0.25, 2.2, A, 0.52);
    txt(sl, `${i + 1}`, x + w - 0.6, 2.22, 0.4, 0.45, { fontSize: 22, bold: true, color: hi ? T.amber : tint(A, 0.5), align: "right" });
    txt(sl, h, x + 0.25, 3.0, w - 0.5, 0.35, { fontSize: 15, bold: true, color: hi ? T.white : T.ink });
    txt(sl, b, x + 0.25, 3.4, w - 0.5, 1.2, { fontSize: 12.5, color: hi ? T.onDarkMuted : T.slate700 });
    if (i < 4) K.line(sl, x + w + 0.03, 3.35, x + w + 0.27, 3.35); });
  K.note(sl, "Every call, email and WhatsApp message lands on the customer timeline automatically, so the activity journal, command center and weekly reports always reflect real work.", 5.25, 0.72);
  sl.addNotes("The loop that removes manual reporting: the queue drives activity, activity is logged automatically, and reports are generated from it.");

  // 6 MODULE MAP
  sl = K.add("MT_CONTENT_TINT"); K.head(sl, "Product map", "Fourteen modules in one sales command center");
  const groups = [["target", "Sell", ["My Day", "Leads", "Pipeline", "Customers & 360"]], ["phone", "Engage", ["Privacy-masked calling", "Email & WhatsApp", "Activity log & call journal"]],
    ["chart", "Lead", ["Command center", "Report builder", "Weekly reports"]], ["shield", "Protect & run", ["Data protection controls", "Subscriptions & GST billing", "Native Android app", "Platform & multi-tenancy"]]];
  const cw4 = (G.cw - 0.9) / 4;
  groups.forEach(([icn, h, items], i) => { const x = G.mx + i * (cw4 + 0.3), y = 1.75, ch = 3.75;
    card(sl, x, y, cw4, ch, T.white); iconChip(sl, ic[icn], x + 0.28, y + 0.28, A, 0.52);
    txt(sl, h, x + 0.28, y + 0.95, cw4 - 0.5, 0.35, { fontSize: TYPE.h3, bold: true, color: T.ink });
    txt(sl, `${items.length} modules`, x + 0.28, y + 1.3, cw4 - 0.5, 0.25, { fontSize: 10.5, bold: true, color: A });
    sl.addText(items.map((t, k) => ({ text: t, options: { bullet: { indent: 14 }, breakLine: k < items.length - 1 } })), { x: x + 0.28, y: y + 1.7, w: cw4 - 0.5, h: ch - 1.8, margin: 0, fontSize: 13, color: T.slate700, valign: "top", paraSpaceAfter: 6, isTextBox: true }); });
  K.note(sl, "Each company's data lives in its own database, and masking rules are enforced on the server for web, mobile and exports alike.", 5.75, 0.62);
  sl.addNotes("Fourteen modules across four jobs. Masked calling is the flagship.");

  // 7 MY DAY
  K.sec("Sell");
  sl = K.add(); K.head(sl, "My Day", "Every rep starts the day knowing exactly who to call");
  await K.heroFeature(sl, IMG.myday, [["list", "Prioritised work queue", "Highest-value, most-overdue actions surface first."], ["clock", "Follow-ups due today", "Every promised call-back is front and centre."],
    ["trend", "Today's momentum", "Calls, talk-time and pipeline at a glance."], ["zap", "More selling, less admin", "Act on the queue instead of digging through lists."]],
    "My Day: KPI strip, priority work queue with one-click calling, and today's momentum (demo data).", false, "SalesPulse · My Day");
  sl.addNotes("My Day turns the activity log into a daily action plan for each rep.");

  // 8 LEADS
  sl = K.add(); K.head(sl, "Lead management", "Capture and qualify leads at speed");
  await K.heroFeature(sl, IMG.leads, [["target", "Fast capture & qualification", "Owner, stage and status at a glance."], ["upload", "CSV import with dedupe", "Bulk-import lists; duplicates caught on the way in."],
    ["gauge", "Pipeline value in view", "Total and per-stage value the moment a lead lands."], ["phone", "Call from the list", "Masked calling straight from each lead."]],
    "Leads: pipeline totals, stage, owner and one-click call per lead (demo data).", true, "Leads");
  sl.addNotes("Clean, deduplicated leads with owners, stages and value, ready to work.");

  // 9 PIPELINE
  sl = K.add(); K.head(sl, "Pipeline", "A weighted pipeline you can actually steer");
  await K.heroFeature(sl, IMG.pipe, [["kanban", "Drag-and-drop stages", "Five weighted stages that reflect real close probability."], ["clock", "Stage aging", "Spot deals going cold before they stall."],
    ["trend", "Weighted forecast", "Values roll up into a number leadership can trust."]],
    "Pipeline: weighted Kanban across stages with totals per column (demo data).", false, "Pipeline");
  sl.addNotes("Drag-and-drop Kanban across five weighted stages, with aging on every card.");

  // 10 CUSTOMER 360
  sl = K.add(); K.head(sl, "Customer 360", "The whole relationship on one screen");
  await K.heroFeature(sl, IMG.c360, [["building", "Accounts & contacts", "Every person and opportunity tied to the account."], ["activity", "Interaction timeline", "Calls, emails, demos and follow-ups in order."],
    ["wallet", "Lifetime value", "What each customer is worth and where to invest time."]],
    "Customer 360 (leadership view): lifetime value, linked opportunities and contacts (demo data).", true, "Customers · Ironclad Auto");
  sl.addNotes("This is a Director's view. Reps see the same record with phone and email masked; the real values are used server-side only.");

  // 11 MASKED CALLING USP
  K.sec("Engage");
  sl = K.add(); K.head(sl, "Flagship · privacy-masked calling", "Your reps make the call. They never see the number");
  await K.heroFeature(sl, IMG.lead, [["eyeoff", "Numbers never exposed", "Masked in the interface and on screen: nothing to copy or screenshot."], ["phoneIn", "Masked both ways", "Customers who call your business number reach their own rep, still masked."],
    ["lock", "No poaching, no leakage", "Reps sell without ever owning the customer's contact details."]],
    "Lead record: masked phone and one-click 'Call (masked)' (demo data).", false, "Leads · Nova EdLabs");
  sl.addNotes("The differentiator. Customer data leakage through reps is the risk SalesPulse removes structurally.");

  // 12 HOW MASKING WORKS
  sl = K.add(); K.head(sl, "How masking works", "One business line, both directions, no personal numbers");
  colLabel(sl, "Outbound: rep calls customer", G.mx, 6, 1.75);
  sbox(sl, G.mx, 2.1, 3.0, 1.0, "Rep clicks Call", "From the lead, queue or app", { hs: 14 });
  sbox(sl, 4.85, 2.1, 3.6, 1.0, "SalesPulse business line", "Real number resolved server-side only", { fill: T.midnight, line: T.midnight, hc: T.white, sc: T.onDarkMuted, hs: 14 });
  sbox(sl, 9.73, 2.1, 3.0, 1.0, "Customer", "Sees only your business caller ID", { hs: 14 });
  K.line(sl, 3.6, 2.6, 4.85, 2.6); K.line(sl, 8.45, 2.6, 9.73, 2.6);
  colLabel(sl, "Inbound: customer calls back", G.mx, 6, 3.45);
  sbox(sl, G.mx, 3.8, 3.0, 1.0, "Customer calls", "Your business number", { hs: 14 });
  sbox(sl, 4.85, 3.8, 3.6, 1.0, "Routed to the owning rep", "Still masked, in both directions", { fill: tint(A, 0.9), line: tint(A, 0.55), hs: 14 });
  sbox(sl, 9.73, 3.8, 3.0, 1.0, "Rep answers", "Without seeing the number", { hs: 14 });
  K.line(sl, 3.6, 4.3, 4.85, 4.3); K.line(sl, 8.45, 4.3, 9.73, 4.3);
  [["phone", "Pay-as-you-go calling", "₹0.50 per leg-minute, 30-second pulse."], ["repeat", "Bring your own telephony", "Use SalesPulse calling or your existing provider."], ["shield", "Same rule everywhere", "Masked on web, mobile and exports, enforced on the server."]].forEach(([icn, h, b], i) => {
    const w = (G.cw - 0.6) / 3; K.feat(sl, ic[icn], h, b, G.mx + i * (w + 0.3), 5.3, w, 0.48); });
  sl.addNotes("Masking applies in both directions. Calling rates are as stated in the source deck; the telephony provider is to be confirmed.");

  // 13 DIALER + AFTER CALL
  sl = K.add(); K.head(sl, "In the call and after it", "A dialer that protects the customer, and logs every call itself");
  await K.twoShots(sl, Object.assign({}, IMG.incall, { cap: "In call: the number stays masked the whole time (demo data)." }), Object.assign({}, IMG.after, { cap: "After the call: outcome, sentiment, feedback and next action." }),
    [["phone", "One-click connect", "Dial straight from the lead."], ["smile", "Outcome & sentiment", "Recorded in seconds, in the dialer."], ["pen", "Next action", "Saved to the timeline instantly."], ["clock", "Talk-time builds itself", "No separate data entry."]]);
  sl.addNotes("Live masked-call dialer and after-call summary, auto-logged to reports and the activity journal.");

  // 14 EMAIL & WHATSAPP
  sl = K.add(); K.head(sl, "Email & WhatsApp", "Every channel from the lead, masked and logged");
  K.iconCards(sl, [["mail", "Send as yourself", "Each rep sends from their own verified address, so mail lands in the inbox, with fallback to the company sender."],
    ["users", "Cc your team", "Cc a teammate in a click, but never a way to expose the masked address."],
    ["pen", "Designed signatures", "Full HTML signatures with logos and brand colours, preserved exactly."],
    ["msg", "WhatsApp Business", "Approved templates with product images, PDFs and brochures."],
    ["eyeoff", "Masked, like calling", "Reps write to a masked address; the real one is resolved server-side."],
    ["activity", "Logged automatically", "Every email and WhatsApp lands on the timeline and feeds reports."]], 3, 1.8, 2.2);
  sl.addNotes("Email and WhatsApp screens still need to be captured; capabilities are from the product deck.");

  // 15 ACTIVITY
  sl = K.add(); K.head(sl, "Activity log & call journal", "Every interaction, captured without the busywork");
  await K.heroFeature(sl, IMG.activity, [["activity", "One running record", "Calls, emails, demos and follow-ups."], ["smile", "Outcomes and sentiment", "Structured fields, not just a list of events."],
    ["clock", "Talk-time totals", "Effort is measurable, which makes coaching fair."]],
    "Activity log: calls, connected, demos, follow-ups and talk-time per day (demo data).", true, "Activity log");
  sl.addNotes("The activity journal powers the command center and weekly reports automatically.");

  // 16 COMMAND CENTER
  K.sec("Lead");
  sl = K.add(); K.head(sl, "Leadership command center", "Real-time visibility into pipeline and people");
  await K.heroFeature(sl, IMG.command, [["gauge", "Org KPIs", "Closed business, open pipeline and win rate."], ["trend", "8-week trend", "Closed business over time."],
    ["award", "Live BDE leaderboard", "Composite scoring ranks reps on what matters."], ["flag", "RAG ratings", "Red, amber and green make coaching clear and fair."]],
    "Company overview: KPIs, closed-business trend, pipeline by stage and BDE leaderboard (demo data).", false, "Command center");
  sl.addNotes("Command center: org KPIs, the 8-week closed trend and a live leaderboard with composite scores and RAG ratings.");

  // 17 REPORTS
  sl = K.add(); K.head(sl, "Reports that build themselves", "No more re-typing numbers into spreadsheets");
  await K.twoShots(sl, Object.assign({}, IMG.builder, { cap: "Report builder: any scope and period, per-executive scores and ratings." }), Object.assign({}, IMG.weekly, { cap: "Weekly reports: generated from activity, scored and submitted." }),
    [["users", "Any scope, any period", "All execs, chosen execs or a territory."], ["sheet", "Multi-sheet Excel", "Summary plus monthly, weekly and daily sheets."], ["flag", "Scored and rated", "KPIs colour-coded by threshold."], ["send", "Submit to leadership", "One consistent report up the chain."]]);
  sl.addNotes("The report builder exports a print-ready multi-sheet workbook; weekly reports assemble themselves from the activity log.");

  // 18 DATA PROTECTION
  K.sec("Protect & run");
  sl = K.add("MT_DARK"); K.head(sl, "Data protection & integrity", "Your customer data can't walk out the door");
  K.darkCards(sl, [["eyeoff", "Phone and email masked", "On web, mobile and exports; real values used server-side only."], ["ban", "No bulk export for reps", "Lead-list and report downloads are leadership-only."],
    ["user", "Row-level access", "Each rep sees only their own leads, enforced on the server."], ["scan", "Access log + anomaly alerts", "Every view and export audited; abnormal volume flagged to admins."],
    ["stamp", "Traceability watermark", "Every screen stamped with viewer and time, so any leak is attributable."], ["db", "Isolation & rate limits", "Database per company and API rate limits stop bulk extraction."]], 3, 1.85, 2.05);
  sl.addNotes("Defence in depth keeps the customer relationship with the business, not the individual rep. Screens for the access log and watermark still need to be captured.");

  // 19 ANDROID
  sl = K.add(); K.head(sl, "Native Android app", "The full command center in your rep's pocket");
  K.iconCards(sl, [["list", "My Day on mobile", "The same ranked queue, follow-ups and pipeline, rebuilt for the phone."], ["phone", "Masked calling on the go", "Protected calls and outcome logging from the field."],
    ["bell", "Real-time notifications", "Push alerts for follow-ups due and call outcomes."], ["shield", "Same privacy everywhere", "Phone and email masked exactly as on the web, enforced server-side."]], 2, 1.8, 1.75);
  K.note(sl, "Field reps keep the same ranked queue, pipeline and masked calling between visits, with one governed login across web and mobile.", 5.9, 0.62);
  sl.addNotes("Android app screens still need to be captured. iOS is not claimed.");

  // 20 BILLING
  sl = K.add(); K.head(sl, "Subscriptions & billing", "Automated, India-first billing with nothing to reconcile");
  await K.heroFeature(sl, Object.assign({}, IMG.invoice), [["wallet", "Razorpay payment links", "Customers pay online; subscriptions activate automatically."], ["gst", "Automatic GST invoices", "Tax invoices generated for every period."],
    ["repeat", "Trials, renewals and grace", "30-day trial, renewals and a 10-day grace period."], ["users", "Seat and quota limits", "Seats and lead quotas enforced automatically."]],
    "Tax invoice generated automatically for a subscription period (demo data).", false, "Billing · Invoice");
  sl.addNotes("Billing is fully automated and multi-tenant. The billing screen with plan cards is not shown because its prices differ from the price list (to be confirmed).");

  // 21 ARCHITECTURE
  sl = K.add(); K.head(sl, "Architecture", "Multi-tenant by design, isolated by default");
  colLabel(sl, "Sign-in & roles", G.mx, 3);
  sbox(sl, G.mx, 2.05, 3.0, 0.85, "Company-code login", "Single host, per-company workspace");
  sbox(sl, G.mx, 3.05, 3.0, 0.85, "RBAC", "BDE · Manager · Director · Admin");
  sbox(sl, G.mx, 4.05, 3.0, 0.85, "Web + Android", "Same masking rules, server-side");
  colLabel(sl, "Per-company data", 4.05, 3);
  ["Company A · own database", "Company B · own database", "One database per company"].forEach((t, i) => sbox(sl, 4.05, 2.05 + i * 1.0, 3.0, 0.85, t, null, { fill: tint(A, 0.9), line: tint(A, 0.55) }));
  [2.47, 3.47, 4.47].forEach(y => K.line(sl, 3.6, y, 4.05, y));
  frame(sl, await K.S(IMG.platform, 5.2, 2.6), 7.53, 2.0, 5.2, 2.6, { url: "Platform control center", alt: "Platform control center" });
  caption(sl, "Platform control center: MRR, ARR and tenants.", 7.53, 4.65, 5.2);
  K.note(sl, "Isolation is physical, not a filter: one company's data can never touch another's. API rate limiting and an audited access log sit on top.", 5.4, 0.7);
  sl.addNotes("Database-per-tenant isolation, company-code login, RBAC and a platform control center for provisioning and billing.");

  // 22 WHY
  K.sec("Value & next steps");
  sl = K.add("MT_DARK"); K.head(sl, "Why SalesPulse", "What sets SalesPulse apart from generic CRMs");
  K.compare(sl, "Generic CRM", "With SalesPulse", [["Customer data", "Reps hold raw numbers", "Masked calling, email and WhatsApp"], ["Reporting", "Re-typed into spreadsheets", "Reports and weekly submissions build themselves"],
    ["Billing", "Manual invoices, no GST", "INR, GST invoices and Razorpay built in"], ["Visibility", "Stale, after the fact", "Live command center and leaderboard"], ["Isolation", "Shared tables", "A database per company"]],
    [["shield", "Privacy built in", "Masking is the default, not an add-on."], ["flag", "India-first", "INR, GST, Razorpay and Asia/Kolkata out of the box."], ["zap", "Automation that removes work", "Reports feed themselves from real activity."], ["target", "Purpose-built for selling", "Every screen earns its place in a rep's day."]]);
  sl.addNotes("The comparison describes common generic-CRM patterns, not a named competitor.");

  // 23 PRICING MODEL
  sl = K.add("MT_CONTENT_TINT"); K.head(sl, "How pricing works", "Software per seat; calling billed on actual usage");
  [["users", "Software", "Per user per month", "Plans scale by seats and lead quota, from small teams to large organisations. GST 18% extra."],
   ["phone", "Calling", "Pay as you go", "₹0.50 per leg-minute, outbound and inbound, 30-second pulse, billed on actual usage, or bring your own telephony."],
   ["rocket", "Free trial", "30 days, no card", "All features, up to 5 seats and 2,000 leads and contacts, to prove value first."]].forEach(([icn, h, s, b], i) => {
    const w = (G.cw - 0.6) / 3, x = G.mx + i * (w + 0.3), hi = i === 2;
    sl.addShape("roundRect", { x, y: 1.8, w, h: 3.7, rectRadius: 0.12, fill: { color: hi ? T.midnight : T.white }, line: { color: hi ? T.midnight : T.line, width: 0.75 } });
    if (hi) { sl.addShape("roundRect", { x: x + 0.35, y: 2.1, w: 0.56, h: 0.56, rectRadius: 0.12, fill: { color: A }, line: { type: "none" } }); sl.addImage({ path: icW[icn], x: x + 0.49, y: 2.24, w: 0.28, h: 0.28 }); }
    else iconChip(sl, ic[icn], x + 0.35, 2.1, A, 0.56);
    txt(sl, h, x + 0.35, 2.9, w - 0.7, 0.4, { fontSize: 20, bold: true, color: hi ? T.white : T.ink });
    txt(sl, s, x + 0.35, 3.35, w - 0.7, 0.35, { fontSize: 14, bold: true, color: hi ? T.amber : A });
    txt(sl, b, x + 0.35, 3.8, w - 0.7, 1.5, { fontSize: 13, color: hi ? T.onDarkMuted : T.slate700 }); });
  K.note(sl, "Per-seat prices for each plan are confirmed in your proposal, based on seats and lead volume.", 5.8, 0.6);
  sl.addNotes("The tier price table is held back: the source deck (Basic ₹980 / Starter ₹559 / Growth ₹1,049 / Enterprise ₹2,099) conflicts with the in-app billing screen (Starter ₹799 / Growth ₹1,499 / Enterprise ₹2,999). Confirm the price list before adding tiers.");

  // 24 GETTING STARTED
  sl = K.add(); K.head(sl, "Getting started", "Live in days, not quarters");
  sl.addShape("line", { x: G.mx, y: 2.55, w: G.cw, h: 0, line: { color: T.line, width: 1.5 } });
  [["key", "Sign up", "We provision your isolated workspace and company code."], ["upload", "Import leads", "Bring your lists by CSV; duplicates removed on the way in."],
   ["users", "Invite your team", "Add reps, managers and directors with role-based access."], ["phone", "Start selling", "Place masked calls and watch the reports build themselves."]].forEach(([icn, h, b], i) => {
    const w = G.cw / 4, x = G.mx + i * w;
    txt(sl, `STEP ${i + 1}`, x, 1.95, w - 0.2, 0.3, { fontSize: 10.5, bold: true, charSpacing: 2, color: A });
    sl.addShape("ellipse", { x, y: 2.43, w: 0.24, h: 0.24, fill: { color: i === 3 ? T.amber : A }, line: { color: T.white, width: 2 } });
    iconChip(sl, ic[icn], x, 3.0, A, 0.5);
    txt(sl, h, x, 3.7, w - 0.3, 0.35, { fontSize: TYPE.h3, bold: true, color: T.ink }); txt(sl, b, x, 4.1, w - 0.35, 1.2, { fontSize: 13 }); });
  K.note(sl, "Start with the 30-day free trial: no card required, all features, up to 5 seats and 2,000 leads.", 5.5, 0.62);
  sl.addNotes("Fast onboarding: provision, import, invite, sell.");

  // 25 CLOSE
  sl = K.add("MT_CLOSE");
  K.close(sl, { title: "Give your team the command center they deserve", body: "Start a free 30-day trial, or talk to us about rolling SalesPulse out across your sales organisation.", subtitle: "SalesPulse CRM · India-first Sales CRM", second: "Start a free trial" });
  sl.addNotes("One ask. Official MavionTech contact details. The product domain salespulse.maviontech.com is to be confirmed before it is added.");

  await pres.writeFile({ fileName: OUT });
  console.log("written", OUT, pres.slides.length, "slides");
})();
