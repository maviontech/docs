// Vortex_Final.pptx — Vortex HRMS (no product screenshots available; native diagrams + public sign-in page)
const fs = require("fs");
const pptxgen = require("pptxgenjs");
const M = require("./mt");
const { makeKit } = require("./deckkit");
const { T, TYPE, G, tint, frame, iconChip, caption, card } = M;
const VM = M.ROOT + "/02_Working_Notes/vx_media/";
const OUTDIR = M.ROOT + "/Final_Product_Decks/Vortex";
const OUT = process.env.OUT || (OUTDIR + "/Vortex_Final.pptx");
fs.mkdirSync(OUTDIR, { recursive: true });
const ICONS = { layers: "LuLayers", sheet: "LuFileSpreadsheet", alert: "LuTriangleAlert", users: "LuUsers", wallet: "LuWallet", eyeoff: "LuEyeOff",
  user: "LuUserCheck", scan: "LuScanFace", calendar: "LuCalendarDays", map: "LuMapPin", repeat: "LuRepeat", radio: "LuRadio", fingerprint: "LuFingerprint",
  phone: "LuSmartphone", lock: "LuLock", clock: "LuClock", shield: "LuShieldCheck", file: "LuFileText", folder: "LuFolderOpen", door: "LuDoorOpen",
  list: "LuListChecks", gauge: "LuGauge", target: "LuTarget", receipt: "LuReceipt", laptop: "LuLaptop", ticket: "LuTicket", book: "LuBookOpen", award: "LuAward",
  pen: "LuPenLine", bank: "LuLandmark", hash: "LuHash", git: "LuGitBranch", timer: "LuTimer", building: "LuBuilding2", briefcase: "LuBriefcase",
  db: "LuDatabase", code: "LuCode", cpu: "LuCpu", palette: "LuPalette", plug: "LuPlug", toggle: "LuToggleRight", key: "LuKeyRound", globe: "LuGlobe",
  rocket: "LuRocket", check: "LuCheck", bell: "LuBell", home: "LuHouse", trend: "LuTrendingUp", sparkle: "LuSparkles", flag: "LuFlag", hand: "LuHandshake",
  battery: "LuBatteryMedium", eye: "LuEye", trash: "LuTrash2", network: "LuNetwork", star: "LuStar" };

(async () => {
  const pres = new pptxgen(); pres.layout = "LAYOUT_WIDE";
  pres.author = "MavionTech Pvt. Ltd."; pres.company = "MavionTech Pvt. Ltd."; pres.title = "Vortex HRMS — Unified People Platform";
  pres.theme = { headFontFace: M.FONT.head, bodyFontFace: M.FONT.body };
  const A = M.PRODUCTS.vortex.accent;
  M.defineLayouts(pres, "vortex", await M.darkBg(A, "bg_cover_vortex.png", "cover"), await M.darkBg(A, "bg_divider_vortex.png", "divider"));
  const K = await makeKit(pres, "vortex", "vx", ICONS);
  const { ic, icW, txt } = K;
  const mark = M.ASSETS + "/vortex_mark.png";
  const colLabel = (sl, t, x, w, y = 1.7, c = T.slate500) => txt(sl, t.toUpperCase(), x, y, w, 0.25, { fontSize: 10, bold: true, charSpacing: 2, color: c });
  const sbox = (sl, x, y, w, h, hd, sub, o = {}) => { sl.addShape("roundRect", { x, y, w, h, rectRadius: 0.08, fill: { color: o.fill || T.white }, line: { color: o.line || T.line, width: o.lw || 0.75 } });
    sl.addText([{ text: hd, options: { bold: true, fontSize: o.hs || 13, color: o.hc || T.ink, breakLine: !!sub } }].concat(sub ? [{ text: sub, options: { fontSize: 11, color: o.sc || T.slate500 } }] : []), { x: x + 0.15, y, w: w - 0.3, h, margin: 0, valign: "middle", align: o.align || "left", isTextBox: true }); };
  const strip = (sl, steps, y, hi = -1, h = 1.2) => { const n = steps.length, w = (G.cw - (n - 1) * 0.25) / n;
    steps.forEach(([hd, sub], i) => { const x = G.mx + i * (w + 0.25), dark = i === hi;
      sbox(sl, x, y, w, h, hd, sub, dark ? { fill: T.midnight, line: T.midnight, hc: T.white, sc: T.onDarkMuted, hs: 13.5 } : { fill: T.paper, hs: 13.5 });
      if (i < n - 1) K.line(sl, x + w + 0.02, y + h / 2, x + w + 0.23, y + h / 2); }); };

  // 1 COVER
  K.sec("Opening");
  let sl = K.add("MT_COVER");
  K.cover(sl, { name: "Vortex HRMS", category: "Unified people platform", mark,
    promise: "Hire to retire. Attendance to payroll. On one record.",
    support: "Face-AI attendance, policy-driven payroll, leave and comp-off, approvals and employee self-service, in one secure multi-tenant HRMS.",
    chips: ["Hire to retire", "Face-AI attendance", "Policy-first payroll"] });
  frame(sl, await K.S({ src: VM + "vx_tiles.png" }, 5.7, 4.43), 7.05, 1.25, 5.7, 4.43, { dark: true, url: "vortexhrms.com", alt: "Vortex HRMS sign-in page" });
  frame(sl, await K.S({ src: VM + "vx_signin.png" }, 2.3, 3.8), 6.42, 2.95, 2.3, 3.8, { dark: true, alt: "Vortex sign-in" });
  sl.addNotes("Opening. Vortex HRMS is MavionTech's HR, attendance and payroll platform (www.vortexhrms.com). Images are from the public sign-in page; the uptime, support-hours and compliance badges on that page are cropped out because they are not yet evidenced.");

  // 2 PROBLEM
  sl = K.add(); K.head(sl, "The status quo", "Why workforce platforms break at scale");
  K.iconCards(sl, [["layers", "Disconnected systems", "HR, payroll, attendance and helpdesk live in separate tools that never quite agree."],
    ["sheet", "Manual reconciliation", "Finance reconciles attendance to payroll by hand, every cycle."],
    ["alert", "Compliance debt", "Statutory rules change faster than legacy systems adapt."],
    ["users", "Poor employee experience", "Several logins and a ticket just to update a phone number."],
    ["wallet", "Hidden cost of ownership", "Licence sprawl, integration effort and double data entry."],
    ["eyeoff", "No data trust", "Reports don't match across systems, so decisions wait."]], 3, 1.8, 2.2);
  sl.addNotes("Six reasons people operations break as organisations grow.");

  // 3 SOLUTION HUB
  sl = K.add(); K.head(sl, "One platform, one record", "Attendance flows into payroll; approvals flow into balances");
  const cx = 3.85, cy = 4.05, R = 1.95;
  const nodes = ["People", "Attendance", "Leave", "Payroll", "Approvals", "Assets", "Helpdesk", "Performance"];
  nodes.forEach((t, i) => { const a = -Math.PI / 2 + i * 2 * Math.PI / nodes.length, x = cx + R * Math.cos(a), y = cy + R * Math.sin(a) * 0.95;
    K.line(sl, cx + 0.62 * Math.cos(a), cy + 0.62 * Math.sin(a), x - 0.55 * Math.cos(a), y - 0.28 * Math.sin(a), { endArrowType: "none", color: tint(A, 0.55) });
    sl.addShape("roundRect", { x: x - 0.75, y: y - 0.25, w: 1.5, h: 0.5, rectRadius: 0.25, fill: { color: tint(A, 0.9) }, line: { color: tint(A, 0.6), width: 0.75 } });
    txt(sl, t, x - 0.75, y - 0.25, 1.5, 0.5, { fontSize: 12, bold: true, color: T.ink, align: "center", valign: "middle" }); });
  sl.addShape("ellipse", { x: cx - 0.62, y: cy - 0.62, w: 1.24, h: 1.24, fill: { color: T.midnight }, line: { type: "none" } });
  sl.addImage({ path: mark, x: cx - 0.28, y: cy - 0.42, w: 0.56, h: 0.56 });
  txt(sl, "VORTEX", cx - 0.62, cy + 0.12, 1.24, 0.3, { fontSize: 10, bold: true, charSpacing: 2, color: T.white, align: "center" });
  [["user", "Unified", "One record per employee: every event, document, balance and payslip."], ["scan", "Intelligent", "Face-AI attendance, policy-first payroll and no-code workflows."],
   ["shield", "Secure", "A database per customer, role-based access and audit trails."]].forEach(([icn, h, b], i) => K.feat(sl, ic[icn], h, b, 7.6, 2.0 + i * 1.45, 5.13, 0.56));
  sl.addNotes("Vortex unifies the employee journey: documents stay attached to people, not inboxes, and compliance updates ship as policy changes rather than code releases.");

  // 4 PERSONAS
  sl = K.add("MT_CONTENT_TINT"); K.head(sl, "Built for every people role", "Each role works from the same record");
  K.iconCards(sl, [["briefcase", "HR team", "Lifecycle, documents, policies and onboarding."], ["bank", "Payroll & finance", "Payruns, statutory deductions, sign-off and bank files."],
    ["git", "Managers & approvers", "One-tap approvals for leave, regularisation and expenses."], ["user", "Employees", "Self-service profile, punches, balances and payslips."],
    ["map", "Field & shift staff", "Mobile punch-in, geo-fenced check-ins and rosters."], ["key", "Admins & IT", "Tenant setup, roles, security policies and assets."]], 3, 1.8, 2.15, 0.3, true);
  sl.addNotes("Built for organisations of 200 to 20,000 employees per the product deck; the official site positions it for SMBs and mid-size enterprises.");

  // 5 MODULE MAP
  K.sec("Platform");
  sl = K.add("MT_CONTENT_TINT"); K.head(sl, "Product map", "Start with core HR, then switch on exactly what you need");
  const tiers = [["Base bundle", "Every employee gets", ["People management", "Attendance tracking", "Leave management", "Employee self-service", "Company policies"]],
    ["Premium modules", "Switch on any month", ["Payroll management", "Performance (PMS)", "Expense management", "Helpdesk", "Asset management", "HR document generation", "Learning (LMS)"]],
    ["Attendance & mobile add-ons", "For field and remote teams", ["VortexGo mobile app", "Remote punch-in", "Geo-fence attendance", "On-shift location sharing", "Punch step-up verification", "Remote check-in"]]];
  const tw = (G.cw - 0.6) / 3;
  tiers.forEach(([h, s, items], i) => { const x = G.mx + i * (tw + 0.3), dark = i === 0;
    sl.addShape("roundRect", { x, y: 1.75, w: tw, h: 4.0, rectRadius: 0.12, fill: { color: dark ? T.midnight : T.white }, line: { color: dark ? T.midnight : T.line, width: 0.75 } });
    txt(sl, h, x + 0.3, 1.97, tw - 0.6, 0.35, { fontSize: TYPE.h3, bold: true, color: dark ? T.white : T.ink });
    txt(sl, s, x + 0.3, 2.32, tw - 0.6, 0.28, { fontSize: 11, bold: true, color: dark ? T.amber : A });
    sl.addText(items.map((t, k) => ({ text: t, options: { bullet: { indent: 14 }, breakLine: k < items.length - 1 } })), { x: x + 0.3, y: 2.75, w: tw - 0.6, h: 2.9, margin: 0, fontSize: 13, color: dark ? T.white : T.slate700, valign: "top", paraSpaceAfter: 4, isTextBox: true }); });
  K.note(sl, "Underneath everything: the approvals & workflow engine, role-based security, audit logging and a database per customer.", 5.95, 0.6);
  sl.addNotes("Fourteen modules in three commercial tiers, plus the platform layer. Every module is independently gated per tenant.");

  // 6 LIFECYCLE
  K.sec("People & attendance");
  sl = K.add(); K.head(sl, "Employee lifecycle", "Hire to retire, in one record");
  strip(sl, [["Pre-boarding", "Tasks before day one"], ["Onboarding", "Checklists and documents"], ["Profile & vault", "One record, all documents"], ["Transitions", "Role and reporting changes"], ["Separation", "Exit clearance"], ["Alumni", "Archived record"]], 1.9, 2);
  K.iconCards(sl, [["upload" in ic ? "folder" : "folder", "Secure uploads", "Onboarding documents uploaded through secure pages, linked to the employee record."],
    ["file", "Document vault", "Letters, verification files and records kept per employee."],
    ["git", "Full timeline", "Reporting changes and life events tracked with history."],
    ["door", "Clean exits", "Exit clearance and an alumni archive, with assets recovered."]], 4, 3.45, 2.3);
  sl.addNotes("New joiners are productive on day one, HR stops chasing paperwork, and every life event has an audit-ready record.");

  // 7 ATTENDANCE
  sl = K.add(); K.head(sl, "Smart attendance", "Friction-free attendance, audit-grade accuracy");
  K.iconCards(sl, [["scan", "Face-recognition punch", "Punch in and out by face, with sub-second matching (InsightFace)."], ["calendar", "Shifts and rosters", "Shift, roster, weekend and holiday logic."],
    ["map", "Geo-fenced check-ins", "Location-bounded attendance for field teams."], ["repeat", "Regularisation", "Self-service correction requests through the workflow engine."],
    ["radio", "Live presence", "Real-time presence by location, team and role."], ["fingerprint", "Devices & gates", "Biometric terminal and access-control integration."]], 3, 1.8, 2.15);
  sl.addNotes("No buddy punching, no paper rosters, and no surprises when attendance reaches payroll.");

  // 8 FIELD & PRIVACY
  sl = K.add("MT_DARK"); K.head(sl, "Field & mobile workforce", "Attendance for the field, with privacy built in");
  K.darkCards(sl, [["phone", "VortexGo", "The employee app: punch-in, leave, approvals, payslips and helpdesk on the phone."],
    ["scan", "SnapLens", "A dedicated attendance app for capture on site."],
    ["map", "On-shift location sharing", "Optional, employer-enabled tracking for attendance verification and field work."]], 3, 1.85, 2.05);
  colLabel(sl, "Privacy safeguards for location sharing", G.mx, 8, 4.3, T.amber);
  ["Off by default", "Employee consent required", "Interval set by employer: 5–60 min", "Work-hours-only option", "Visible notification while active", "Retention 30 / 60 / 90 days", "Mock-location detection", "Never sold or used for ads"].forEach((t, i) => {
    const w = (G.cw - 3 * 0.2) / 4, x = G.mx + (i % 4) * (w + 0.2), y = 4.7 + Math.floor(i / 4) * 0.6;
    sl.addShape("roundRect", { x, y, w, h: 0.45, rectRadius: 0.22, fill: { color: T.midnight2 }, line: { color: "2E4468", width: 0.75 } });
    sl.addImage({ path: K.checkAmber, x: x + 0.15, y: y + 0.12, w: 0.2, h: 0.2 });
    txt(sl, t, x + 0.45, y, w - 0.55, 0.45, { fontSize: 11.5, color: T.white, valign: "middle" }); });
  sl.addNotes("Details from the published Vortex HRMS privacy policy (VortexGo background location). SnapLens is named in the privacy policy as the attendance app; confirm its positioning.");

  // 9 LEAVE
  sl = K.add(); K.head(sl, "Leave & comp-off", "Honour every leave policy, automatically");
  K.iconCards(sl, [["list", "Configurable leave types", "Accrual and carry-forward rules per type."], ["git", "Multi-step approvals", "Mobile-first approval chains."],
    ["clock", "Half and quarter days", "Fine-grained leave units."], ["calendar", "Weekend & holiday credits", "Work on off-days earns comp-off by policy."],
    ["repeat", "Comp-off engine", "Policy-driven comp-off generation with a credit ledger."], ["gauge", "Live balances", "Remaining vs allocated, per employee per year."]], 3, 1.8, 2.15);
  sl.addNotes("Employees see real balances, managers approve in one click, and HR stops mediating disputes.");

  // 10 ATTENDANCE TO PAYROLL
  K.sec("Payroll & approvals");
  sl = K.add(); K.head(sl, "From attendance to payslip", "Payroll consumes attendance and leave directly");
  colLabel(sl, "Inputs", G.mx, 3);
  [["Attendance", "Punches, shifts, rosters"], ["Leave & comp-off", "Balances and credits"], ["Regularisations", "Approved corrections"], ["Expenses", "Approved reimbursements"]].forEach(([h, s], i) => sbox(sl, G.mx, 2.05 + i * 0.95, 2.8, 0.78, h, s));
  sbox(sl, 4.0, 2.05, 2.6, 3.63, "Inputs locked at cut-off", "Period inputs frozen for the run", { fill: tint(A, 0.9), line: tint(A, 0.55), hs: 14, align: "center" });
  [2.44, 3.39, 4.34, 5.29].forEach(y => K.line(sl, 3.4, y, 4.0, y));
  sbox(sl, 7.0, 2.05, 2.6, 3.63, "Payroll engine", "Salary structures · statutory deductions · tax computation · adjustments", { fill: T.midnight, line: T.midnight, hc: T.white, sc: T.onDarkMuted, hs: 15, align: "center" });
  K.line(sl, 6.6, 3.86, 7.0, 3.86);
  colLabel(sl, "Outputs", 10.0, 2.7);
  [["Payslips", "For every employee"], ["Bank file", "Disbursement output"], ["Statutory", "PF · ESI · PT · TDS"], ["Period locked", "Audit logged"]].forEach(([h, s], i) => sbox(sl, 10.0, 2.05 + i * 0.95, 2.73, 0.78, h, s));
  [2.44, 3.39, 4.34, 5.29].forEach(y => K.line(sl, 9.6, 3.86, 10.0, y));
  K.note(sl, "Re-runs are versioned and periods lock after sign-off, so every payroll is reproducible and auditable.", 6.0, 0.6);
  sl.addNotes("The core integration story: attendance, leave and approvals feed payroll directly.");

  // 11 PAYROLL
  sl = K.add(); K.head(sl, "Payroll engine", "Run payroll on policy, not on spreadsheets");
  strip(sl, [["1  Inputs locked", "At cut-off"], ["2  Engine computes", "Per policy"], ["3  HR reviews", "Finance signs off"], ["4  Disbursement", "Bank file generated"], ["5  Period locked", "Audit logged"]], 1.9, 1, 1.0);
  K.iconCards(sl, [["sliders" in ic ? "wallet" : "wallet", "Salary structures", "Configurable components and payruns."], ["hash", "Statutory compliance", "PF, ESI, PT and TDS deductions."],
    ["receipt", "Tax declarations", "Declarations and proofs from staff."], ["git", "Versioned re-runs", "Re-run a payroll with full version history."],
    ["building", "Multi-entity payroll", "Run payroll across legal entities."], ["file", "Payslips", "Generated for every employee, every cycle."]], 3, 3.2, 1.6);
  sl.addNotes("Payroll closes on time from locked inputs. Finance trusts the numbers; employees trust their payslip.");

  // 12 APPROVALS
  sl = K.add(); K.head(sl, "Approvals & workflows", "Decisions at the speed of policy, not the speed of inboxes");
  sbox(sl, G.mx, 2.3, 2.3, 1.0, "Request", "Leave · regularisation · comp-off · expense", { hs: 14 });
  sbox(sl, 3.35, 2.3, 2.5, 1.0, "Routing rule", "By role, configured without code", { fill: T.midnight, line: T.midnight, hc: T.white, sc: T.onDarkMuted, hs: 14 });
  sbox(sl, 6.3, 1.85, 2.6, 0.85, "Sequential approvers", "One after another", { fill: tint(A, 0.9), line: tint(A, 0.55) });
  sbox(sl, 6.3, 2.9, 2.6, 0.85, "Parallel approvers", "At the same time", { fill: tint(A, 0.9), line: tint(A, 0.55) });
  sbox(sl, 9.4, 2.3, 3.33, 1.0, "Decision + audit trail", "Balances and ledgers update automatically", { hs: 14 });
  K.line(sl, 2.9, 2.8, 3.35, 2.8); K.line(sl, 5.85, 2.8, 6.3, 2.28); K.line(sl, 5.85, 2.8, 6.3, 3.32); K.line(sl, 8.9, 2.28, 9.4, 2.8); K.line(sl, 8.9, 3.32, 9.4, 2.8);
  K.iconCards(sl, [["user", "Out-of-office cover", "Approvals never stall when someone is away."], ["timer", "Escalation timers", "Overdue requests escalate automatically."],
    ["phone", "Mobile-first approvals", "Approve from the phone in one tap."], ["shield", "Audit per request", "Every decision recorded and defensible."]], 4, 4.15, 1.95);
  sl.addNotes("One workflow chassis powers leave, regularisation, comp-off, expenses and other approvals.");

  // 13 ESS & POLICIES
  sl = K.add("MT_CONTENT_TINT"); K.head(sl, "Employee self-service", "Self-service that ends routine HR tickets");
  K.iconCards(sl, [["home", "Personal dashboard", "Balances, punches, pending approvals and announcements."], ["user", "Profile updates", "Employees maintain their own details."],
    ["file", "Payslips & tax", "Payslips and tax declarations in one place."], ["book", "Company policies", "Publish policies everyone can read."]], 2, 1.8, 2.05, 0.3, true);
  sl.addNotes("Employee self-service and company policies are part of the base bundle.");

  // 14 PERFORMANCE
  K.sec("Premium modules");
  sl = K.add(); K.head(sl, "Performance management", "Appraisal cycles that run themselves");
  strip(sl, [["Goal plans", "Set and track goals"], ["Self-appraisal", "Employee input"], ["Reviewer actions", "Manager review"], ["Appeals", "Fair, recorded process"], ["Reports", "Performance reporting"]], 2.0, 1, 1.15);
  K.iconCards(sl, [["target", "Goals that connect", "Goal plans per employee and appraisal cycle."], ["star", "Structured reviews", "Self-appraisal and reviewer stages with audit trails."], ["hand", "Due process", "Appeals handled inside the workflow."]], 3, 3.6, 2.0);
  sl.addNotes("Performance (PMS) is a premium module: goals, appraisal cycles and reviews.");

  // 15 EXPENSE ASSETS HELPDESK
  sl = K.add(); K.head(sl, "Expenses, assets & helpdesk", "Operational modules on one workflow chassis");
  [["receipt", "Expense management", ["Claims with receipts", "Multi-level approvals", "Reimbursement through payroll"]],
   ["laptop", "Asset management", ["Register with categories & warranties", "Allocation history and maintenance", "Return requests at exit"]],
   ["ticket", "Helpdesk", ["IT and HR ticket queues per team", "SLA timers and escalations", "Self-service knowledge base"]]].forEach(([icn, h, items], i) => {
    const w = (G.cw - 0.6) / 3, x = G.mx + i * (w + 0.3); card(sl, x, 1.8, w, 4.1, T.paper); iconChip(sl, ic[icn], x + 0.3, 2.08, A, 0.6);
    txt(sl, h, x + 0.3, 2.9, w - 0.6, 0.38, { fontSize: 17, bold: true, color: T.ink });
    items.forEach((t, k) => { sl.addImage({ path: K.checkA, x: x + 0.3, y: 3.5 + k * 0.62, w: 0.22, h: 0.22 }); txt(sl, t, x + 0.65, 3.42 + k * 0.62, w - 0.95, 0.42, { fontSize: 13.5, color: T.slate700, valign: "middle" }); }); });
  K.note(sl, "Assets recovered at exit, faster resolution of day-to-day issues, and reimbursements that flow into payroll.", 6.1, 0.55);
  sl.addNotes("Expense, Asset and Helpdesk are premium modules, each priced per employee per month.");

  // 16 DOCS & LMS
  sl = K.add(); K.head(sl, "HR documents & learning", "Letters and training, built into the HR record");
  [["file", "HR document generation", "42 branded letters and certificates generated as PDFs from the employee record: offer to relieving."],
   ["award", "Learning (LMS)", "Courses, compliance training and certifications for the workforce, managed alongside HR records."]].forEach(([icn, h, b], i) => {
    const w = (G.cw - 0.3) / 2, x = G.mx + i * (w + 0.3); card(sl, x, 1.8, w, 3.0, T.paper); iconChip(sl, ic[icn], x + 0.35, 2.1, A, 0.66);
    txt(sl, h, x + 0.35, 3.0, w - 0.7, 0.4, { fontSize: 19, bold: true, color: T.ink }); txt(sl, b, x + 0.35, 3.5, w - 0.7, 1.2, { fontSize: 14 }); });
  K.note(sl, "Need more? Organisations that need standalone document automation or an enterprise skills and compliance LMS can extend with MavionTech's Signet and MavionLearn.", 5.15, 0.75);
  sl.addNotes("Positioning per the portfolio strategy: Vortex modules cover HR-suite needs; Signet and MavionLearn are the specialist upgrades.");

  // 17 SECURITY
  K.sec("Trust & technology");
  sl = K.add(); K.head(sl, "Security & privacy", "Built to govern a sensitive HR dataset");
  K.iconCards(sl, [["db", "A database per customer", "Strict isolation with separate credentials; no shared schema."], ["key", "Company-code sign-in", "Each organisation signs in to its own workspace; tenant administration in a separate portal."],
    ["lock", "Access policies", "Session settings, access policies and IP rules."], ["shield", "Role-based access", "Role-based navigation with configurable permission and approval structures."],
    ["eye", "Audit logging", "Across onboarding, payroll, document review, employee changes and approvals."], ["file", "Published privacy policy", "Covering data categories, retention, consent and individual rights."]], 3, 1.8, 2.05, 0.3, false);
  sl.addNotes("Controls listed here come from the Vortex deck and the published privacy policy. Encryption, multi-region, uptime SLA, ISO 27001, SOC 2 and GDPR statements are not shown until evidenced.");

  // 18 ARCHITECTURE & TECHNOLOGY
  sl = K.add(); K.head(sl, "Architecture", "Built for scale, secured by design");
  const lay = [["Edge", "Web app · VortexGo & SnapLens mobile apps · biometric devices · access gates", false],
    ["Application", "People · Attendance · Leave · Payroll · Performance · Expenses · Learning · Assets · Helpdesk · Approvals", false],
    ["Workflow & security", "No-code workflow engine · role-based access · session and IP policies · audit logging", false],
    ["Data", "A dedicated MySQL database per customer, with separate credentials", true]];
  lay.forEach(([h, t, dark], i) => { const y = 1.85 + i * 1.0;
    sl.addShape("roundRect", { x: G.mx, y, w: 8.9, h: 0.82, rectRadius: 0.08, fill: { color: dark ? T.midnight : (i % 2 ? T.paper : T.white) }, line: { color: dark ? T.midnight : T.line, width: 0.75 } });
    txt(sl, h.toUpperCase(), G.mx + 0.3, y, 2.1, 0.82, { fontSize: 10.5, bold: true, charSpacing: 2, color: dark ? T.amber : A, valign: "middle" });
    txt(sl, t, G.mx + 2.5, y, 6.25, 0.82, { fontSize: 13, color: dark ? T.white : T.ink, valign: "middle" }); });
  colLabel(sl, "Around it", 9.85, 2.8);
  [["Integration APIs", "REST APIs for connected systems"], ["Identity & directory", "Role-based access, company-code sign-in"], ["Audit & events", "Logged across sensitive workflows"], ["Observability", "Operations monitoring"]].forEach(([h, s], i) =>
    sbox(sl, 9.85, 2.05 + i * 0.92, 2.88, 0.78, h, s));
  colLabel(sl, "Technology", G.mx, 6, 5.95);
  ["Django + Python", "MySQL, one database per customer", "Face-AI (InsightFace)", "Tailwind UI", "REST APIs"].forEach((t, i) => { const w = [1.7, 2.9, 2.05, 1.35, 1.25][i], x = G.mx + [0, 1.85, 4.9, 7.1, 8.6][i];
    sl.addShape("roundRect", { x, y: 6.25, w, h: 0.42, rectRadius: 0.21, fill: { color: tint(A, 0.9) }, line: { type: "none" } });
    txt(sl, t, x, 6.25, w, 0.42, { fontSize: 11.5, bold: true, color: T.ink, align: "center", valign: "middle" }); });
  sl.addNotes("Architecture layers per the Vortex product deck, without the unverified 'encrypted at rest' and 'replicated across regions' statements. Technology stack as listed in the deck.");

  // 19 WHERE VORTEX WINS
  sl = K.add("MT_CONTENT_TINT"); K.head(sl, "Where Vortex wins", "How Vortex compares with the alternatives");
  K.iconCards(sl, [["building", "Against legacy suites", "Modern and mobile-first, with a biometric core. No implementation army required."], ["layers", "Against point HR tools", "Vortex is the platform of record, not another module to integrate."],
    ["globe", "Against generic SaaS", "Strict multi-tenant isolation, Indian statutory payroll built in, and Face-AI attendance native."], ["rocket", "Against building in-house", "Every module your team would build, plus the ones they would never get to."]], 2, 1.8, 2.25, 0.35, true);
  sl.addNotes("Positioning versus categories, not named competitors.");

  // 20 PRICING
  K.sec("Commercials & next steps");
  sl = K.add(); K.head(sl, "Pricing", "One base price, then add exactly what you need");
  sl.addShape("roundRect", { x: G.mx, y: 1.8, w: 4.1, h: 4.6, rectRadius: 0.12, fill: { color: T.midnight }, line: { type: "none" } });
  txt(sl, "BASIC SERVICES", G.mx + 0.35, 2.05, 3.4, 0.28, { fontSize: 10.5, bold: true, charSpacing: 2, color: T.amber });
  txt(sl, "₹45", G.mx + 0.35, 2.4, 2, 0.8, { fontSize: 44, bold: true, color: T.white });
  txt(sl, "per employee / month", G.mx + 0.35, 3.2, 3.4, 0.3, { fontSize: 12, color: T.onDarkMuted });
  ["People management", "Attendance tracking", "Leave management", "Employee self-service", "Company policies"].forEach((t, k) => {
    sl.addImage({ path: K.checkAmber, x: G.mx + 0.35, y: 3.75 + k * 0.48, w: 0.2, h: 0.2 }); txt(sl, t, G.mx + 0.7, 3.67 + k * 0.48, 3.2, 0.36, { fontSize: 13, color: T.white, valign: "middle" }); });
  colLabel(sl, "Premium modules (per employee / month)", 5.05, 7);
  [["Payroll management", "₹49"], ["Learning (LMS)", "₹55"], ["Performance (PMS)", "₹39"], ["Expense management", "₹19"], ["HR document generation", "₹19"], ["Helpdesk", "₹19"], ["Asset management", "₹19"]].forEach(([n, p], i) => {
    const x = 5.05 + (i % 2) * 3.9, y = 2.05 + Math.floor(i / 2) * 0.5; sl.addShape("line", { x, y: y + 0.44, w: 3.6, h: 0, line: { color: T.line, width: 0.75 } });
    txt(sl, n, x, y, 2.8, 0.42, { fontSize: 13, color: T.ink, valign: "middle" }); txt(sl, p, x + 2.8, y, 0.8, 0.42, { fontSize: 13, bold: true, color: A, align: "right", valign: "middle" }); });
  colLabel(sl, "Attendance & mobile add-ons", 5.05, 7, 4.15);
  [["VortexGo mobile app", "₹49"], ["Remote punch-in", "₹59"], ["Geo-fence attendance", "₹39"], ["On-shift location sharing", "₹39"], ["Punch step-up verification", "₹19"], ["Remote check-in (with VortexGo)", "₹9"]].forEach(([n, p], i) => {
    const x = 5.05 + (i % 2) * 3.9, y = 4.5 + Math.floor(i / 2) * 0.5; sl.addShape("line", { x, y: y + 0.44, w: 3.6, h: 0, line: { color: T.line, width: 0.75 } });
    txt(sl, n, x, y, 2.9, 0.42, { fontSize: 13, color: T.ink, valign: "middle" }); txt(sl, p, x + 2.9, y, 0.7, 0.42, { fontSize: 13, bold: true, color: A, align: "right", valign: "middle" }); });
  txt(sl, "List prices per active employee per month, editable per tenant · switch modules on or off any month · 30-day free trial, no credit card · GST extra", G.mx, 6.5, G.cw, 0.3, { fontSize: 11, color: T.slate500 });
  sl.addNotes("Prices as listed in the Vortex product deck.");

  // 21 EXAMPLE PLANS
  sl = K.add("MT_CONTENT_TINT"); K.head(sl, "Example plans", "Build your plan, and pay only for what you switch on");
  [["Core HR", "Everyone starts here", "₹45", ["Basic Services bundle"], false], ["Growing team", "Most chosen", "₹132", ["Basic Services", "Payroll management", "Expense management", "Helpdesk"], true],
   ["Full platform", "The complete workforce OS", "from ₹313", ["Basic Services", "Payroll · Performance · Learning", "Expense · HR docs · Helpdesk", "Assets · VortexGo app"], false]].forEach(([n, s, p, inc, hi], i) => {
    const w = (G.cw - 0.6) / 3, x = G.mx + i * (w + 0.3);
    sl.addShape("roundRect", { x, y: 1.8, w, h: 4.1, rectRadius: 0.12, fill: { color: hi ? T.midnight : T.white }, line: { color: hi ? T.midnight : T.line, width: 0.75 } });
    txt(sl, n, x + 0.35, 2.05, w - 0.7, 0.35, { fontSize: TYPE.h3, bold: true, color: hi ? T.white : T.ink });
    txt(sl, s.toUpperCase(), x + 0.35, 2.42, w - 0.7, 0.26, { fontSize: 9.5, bold: true, charSpacing: 2, color: hi ? T.amber : A });
    txt(sl, p, x + 0.35, 2.8, w - 0.7, 0.7, { fontSize: 34, bold: true, color: hi ? T.amber : A });
    txt(sl, "per employee / month", x + 0.35, 3.5, w - 0.7, 0.28, { fontSize: 11, color: hi ? T.onDarkMuted : T.slate500 });
    inc.forEach((t, k) => { sl.addImage({ path: hi ? K.checkAmber : K.checkA, x: x + 0.35, y: 4.05 + k * 0.45, w: 0.2, h: 0.2 }); txt(sl, t, x + 0.7, 3.97 + k * 0.45, w - 1.0, 0.36, { fontSize: 12.5, color: hi ? T.white : T.slate700, valign: "middle" }); }); });
  K.note(sl, "Illustrative stacks: totals are sums of list prices. Attendance and security add-ons are priced on top. GST extra.", 6.1, 0.55);
  sl.addNotes("Totals verified against the list prices: 45+49+19+19 = 132; the full platform = 313.");

  // 22 ROADMAP
  sl = K.add("MT_DARK"); K.head(sl, "Roadmap", "Live today, and what comes next");
  const live = ["Employee profiles & onboarding", "Document vault", "Face-AI attendance", "Shifts, rosters, geo-fencing", "Leave & comp-off engine", "Multi-step approvals", "Payroll & payslips", "PF · ESI · PT · TDS", "Multi-entity payroll", "Performance & appraisals", "Expenses & reimbursements", "LMS", "Assets & maintenance", "IT & HR helpdesk", "HR document generation", "VortexGo mobile app", "Multi-tenant isolation · RBAC · audit"];
  sl.addShape("roundRect", { x: G.mx, y: 1.8, w: 6.2, h: 4.6, rectRadius: 0.1, fill: { color: T.midnight2 }, line: { color: T.amber, width: 1.5 } });
  txt(sl, "LIVE TODAY", G.mx + 0.3, 1.98, 3, 0.28, { fontSize: 11, bold: true, charSpacing: 2, color: T.amber });
  [live.slice(0, 9), live.slice(9)].forEach((col, c) => sl.addText(col.map((t, k) => ({ text: t, options: { bullet: { indent: 12 }, breakLine: k < col.length - 1 } })),
    { x: G.mx + 0.3 + c * 2.95, y: 2.45, w: 2.85, h: 3.85, margin: 0, fontSize: 13, color: T.white, valign: "top", paraSpaceAfter: 5, isTextBox: true }));
  [["NEXT · WITHIN 6 MONTHS", ["Recruitment & applicant tracking", "Employee engagement & surveys", "Benefits & insurance administration", "Advanced BI & custom reports", "Native mobile manager app"]],
   ["LATER · 12+ MONTHS", ["Predictive workforce analytics", "Generative-AI policy authoring", "Regional payroll engines", "Vortex app marketplace"]]].forEach(([h, items], i) => {
    const x = 7.1 + i * 2.9, w = 2.73;
    sl.addShape("roundRect", { x, y: 1.8, w, h: 4.6, rectRadius: 0.1, fill: { color: T.midnight2 }, line: { color: "22365A", width: 0.75 } });
    txt(sl, h, x + 0.25, 1.98, w - 0.4, 0.5, { fontSize: 10, bold: true, charSpacing: 1.5, color: T.onDarkMuted });
    sl.addText(items.map((t, k) => ({ text: t, options: { bullet: { indent: 12 }, breakLine: k < items.length - 1 } })), { x: x + 0.25, y: 2.6, w: w - 0.4, h: 3.6, margin: 0, fontSize: 12, color: T.white, valign: "top", paraSpaceAfter: 6, isTextBox: true }); });
  sl.addNotes("Roadmap per the Vortex product deck; 'Next' and 'Later' items are not available today. Recruitment overlaps with ProtonNxt; position ProtonNxt as the recruitment answer until decided.");

  // 23 CLOSE
  sl = K.add("MT_CLOSE");
  K.close(sl, { title: "See Vortex on your data", body: "Start with a 45-minute working session: we map your people stack, share a tailored value model, and propose a 30-day pilot.", subtitle: "Vortex HRMS · www.vortexhrms.com", second: "Plan a pilot" });
  sl.addNotes("Discover, model, pilot. Official MavionTech contact details; the product site is www.vortexhrms.com.");

  await pres.writeFile({ fileName: OUT });
  console.log("written", OUT, pres.slides.length, "slides");
})();
