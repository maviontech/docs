// Agastya_Final.pptx — full redesign on the approved MavionTech design system
const fs = require("fs");
const pptxgen = require("pptxgenjs");
const L = require("react-icons/lu");
const M = require("./mt");
const { T, TYPE, G, tint, kicker, title, frame, iconChip, caption, card } = M;
const SS = "D:/MavionTech_sales/Agastya_screenshots/";
const OUTDIR = M.ROOT + "/Final_Product_Decks/Agastya";
const OUT = process.env.AG_OUT || (OUTDIR + "/Agastya_Final.pptx");
const A = M.PRODUCTS.agastya.accent;
fs.mkdirSync(OUTDIR, { recursive: true });

const ICONS = { dash: "LuLayoutDashboard", shield: "LuShieldCheck", sliders: "LuSlidersHorizontal", grad: "LuGraduationCap", wallet: "LuWallet",
  library: "LuLibrary", msg: "LuMessagesSquare", server: "LuServer", db: "LuDatabase", eye: "LuEye", users: "LuUsers", cloud: "LuCloud", check: "LuCheck",
  clock: "LuClock", calendar: "LuCalendarDays", file: "LuFileText", upload: "LuUpload", repeat: "LuRepeat", alert: "LuTriangleAlert", list: "LuListChecks",
  bus: "LuBus", map: "LuMapPin", book: "LuBookOpen", bed: "LuBed", heart: "LuHeartPulse", gavel: "LuScale", box: "LuPackage", cart: "LuShoppingCart",
  tag: "LuTag", award: "LuAward", inbox: "LuInbox", door: "LuDoorOpen", phone: "LuSmartphone", bell: "LuBell", send: "LuSend", lock: "LuLock",
  key: "LuKeyRound", history: "LuHistory", building: "LuBuilding2", rocket: "LuRocket", receipt: "LuReceipt", chart: "LuChartColumn", user: "LuUserCheck",
  layers: "LuLayers", code: "LuCode", palette: "LuPalette", toggle: "LuToggleRight", hash: "LuHash", school: "LuSchool", target: "LuTarget",
  briefcase: "LuBriefcase", whatsapp: "LuMessageCircle", grid: "LuLayoutGrid", search: "LuSearch", link: "LuLink", ruler: "LuRuler", star: "LuStar",
  tests: "LuFlaskConical", mobile: "LuTabletSmartphone", radio: "LuRadio", wrench: "LuWrench", hand: "LuHandshake", play: "LuPlay", flag: "LuFlag" };

(async () => {
  const bgCover = await M.darkBg(A, "bg_cover_agastya.png", "cover");
  const bgDiv = await M.darkBg(A, "bg_divider_agastya.png", "divider");
  const ic = {}, icW = {};
  for (const [k, n] of Object.entries(ICONS)) {
    if (!L[n]) throw new Error("missing icon " + n);
    ic[k] = await M.icon(L[n], A, `ag_${k}.png`); icW[k] = await M.icon(L[n], "FFFFFF", `agw_${k}.png`);
  }
  const checkAmber = await M.icon(L.LuCheck, T.amber, "ic_check_amber.png");
  const inner = (w, h) => (w - 0.08) / (h - 0.26 - 0.04);
  const SB = 430, TB = 0; // sidebar crop
  const S = async (file, w, h, left = 0, top = 0) => M.shot(SS + file, `ag_${file.replace(".png", "")}_${Math.round(w * 100)}x${Math.round(h * 100)}.png`, inner(w, h), left, top);

  const pres = new pptxgen(); pres.layout = "LAYOUT_WIDE";
  pres.author = "MavionTech Pvt. Ltd."; pres.company = "MavionTech Pvt. Ltd."; pres.title = "Agastya — Cloud School ERP · Enterprise Sales Overview";
  pres.subject = "Agastya product presentation"; pres.theme = { headFontFace: M.FONT.head, bodyFontFace: M.FONT.body };
  M.defineLayouts(pres, "agastya", bgCover, bgDiv);

  let section = "";
  const sec = t => { section = t; pres.addSection({ title: t }); };
  const add = (m = "MT_CONTENT") => pres.addSlide({ masterName: m, sectionTitle: section });
  const head = (sl, k, t) => { sl.addText(k.toUpperCase(), { placeholder: "kicker" }); sl.addText(t, { placeholder: "title" }); };
  const txt = (sl, text, x, y, w, h, o = {}) => sl.addText(text, Object.assign({ x, y, w, h, margin: 0, fontSize: TYPE.body, color: T.slate700, valign: "top", isTextBox: true }, o));
  const feat = (sl, icon, h, b, x, y, w, size = 0.5) => {
    iconChip(sl, icon, x, y, A, size);
    txt(sl, h, x + size + 0.2, y - 0.03, w - size - 0.2, 0.3, { fontSize: 14, bold: true, color: T.ink });
    txt(sl, b, x + size + 0.2, y + 0.28, w - size - 0.2, 0.62, { fontSize: 12 });
  };
  const badge = (sl, n, x, y) => {
    sl.addShape("ellipse", { x, y, w: 0.34, h: 0.34, fill: { color: T.amber }, line: { color: T.white, width: 1.5 } });
    txt(sl, String(n), x, y, 0.34, 0.34, { fontSize: 11, bold: true, color: T.midnight, align: "center", valign: "middle" });
  };
  const calloutRow = (sl, items) => items.forEach((t, i) => {
    const x = G.mx + i * (G.cw / items.length);
    badge(sl, i + 1, x, 6.38);
    txt(sl, t, x + 0.45, 6.3, G.cw / items.length - 0.6, 0.5, { fontSize: 11.5, valign: "middle" });
  });
  // ---- reusable slide patterns ----
  async function heroFeature(sl, file, feats, cap, mirror = false, crop = [SB, TB], url) {
    const fw = 7.55, fh = 4.55, fx = mirror ? G.W - G.mx - fw : G.mx;
    frame(sl, await S(file, fw, fh, crop[0], crop[1]), fx, 1.75, fw, fh, { url, alt: cap });
    caption(sl, cap, fx, 6.4, fw);
    const cx = mirror ? G.mx : fx + fw + 0.4, cw = G.cw - fw - 0.4;
    feats.forEach(([icn, h, b], i) => feat(sl, ic[icn], h, b, cx, 1.85 + i * 1.15, cw));
  }
  async function mainStack(sl, main, top, bottom, callouts, urls = []) {
    frame(sl, await S(main[0], 7.2, 4.45, ...(main[1] || [SB, 0])), G.mx, 1.75, 7.2, 4.45, { url: urls[0], alt: callouts[0] });
    frame(sl, await S(top[0], 4.63, 2.12, ...(top[1] || [SB, 0])), 8.1, 1.75, 4.63, 2.12, { url: urls[1], alt: callouts[1] });
    frame(sl, await S(bottom[0], 4.63, 2.12, ...(bottom[1] || [SB, 0])), 8.1, 4.08, 4.63, 2.12, { url: urls[2], alt: callouts[2] });
    [[G.mx + 6.72, 2.15], [12.3, 2.15], [12.3, 4.48]].forEach(([x, y], i) => badge(sl, i + 1, x, y));
    calloutRow(sl, callouts);
  }
  async function twoShots(sl, a, b, feats) {
    const w = (G.cw - 0.3) / 2, h = 3.3;
    frame(sl, await S(a[0], w, h, ...(a[2] || [SB, 0])), G.mx, 1.75, w, h, { alt: a[1] });
    frame(sl, await S(b[0], w, h, ...(b[2] || [SB, 0])), G.mx + w + 0.3, 1.75, w, h, { alt: b[1] });
    caption(sl, a[1], G.mx, 5.12, w); caption(sl, b[1], G.mx + w + 0.3, 5.12, w);
    const fw = G.cw / feats.length;
    feats.forEach(([icn, hh, bb], i) => feat(sl, ic[icn], hh, bb, G.mx + i * fw, 5.65, fw - 0.25, 0.45));
  }
  async function cols(sl, items, n, fh) {
    const w = (G.cw - (n - 1) * 0.3) / n;
    for (let i = 0; i < n; i++) {
      const [file, h, b, crop] = items[i], x = G.mx + i * (w + 0.3);
      frame(sl, await S(file, w, fh, ...(crop || [SB, 0])), x, 1.75, w, fh, { alt: h });
      txt(sl, h, x, 1.75 + fh + 0.2, w, 0.32, { fontSize: 15, bold: true, color: T.ink });
      txt(sl, b, x, 1.75 + fh + 0.55, w, 6.75 - (1.75 + fh + 0.55), { fontSize: 12 });
    }
  }

  // =================== 1 COVER ===================
  sec("Opening");
  let sl = add("MT_COVER");
  kicker(sl, "Enterprise sales overview", T.amber, G.mx, 1.95);
  sl.addImage({ path: M.ASSETS + "/agastya_mark.png", x: G.mx, y: 1.28, w: 0.52, h: 0.52 });
  sl.addText("Agastya", { placeholder: "title" });
  txt(sl, "CLOUD SCHOOL ERP", G.mx, 3.22, 5, 0.3, { fontSize: 12, bold: true, charSpacing: 4, color: tint(A, 0.45) });
  sl.addText("One operating system for every school in your group", { placeholder: "body" });
  txt(sl, "From admission to report card, fee to fleet: every department, persona and campus on one governed platform, with each school's data in its own database.", G.mx, 4.9, 5.3, 0.95, { color: T.onDarkMuted });
  ["19 integrated modules", "8 role cockpits", "Database per school"].forEach((t, i) => {
    const w = [1.95, 1.6, 1.85][i], x = G.mx + [0, 2.08, 3.81][i];
    sl.addShape("roundRect", { x, y: 6.1, w, h: 0.38, rectRadius: 0.19, fill: { color: T.midnight2 }, line: { color: "2E4468", width: 0.75 } });
    txt(sl, t, x, 6.1, w, 0.38, { fontSize: 11, color: T.white, align: "center", valign: "middle" });
  });
  frame(sl, await S("a01_dashboard.png", 6.1, 3.85), 6.65, 1.25, 6.1, 3.85, { dark: true, url: "Agastya · School administrator dashboard", alt: "School administrator dashboard" });
  frame(sl, await S("s01_portal.png", 3.7, 2.45), 6.45, 4.2, 3.7, 2.45, { dark: true, alt: "Student portal" });
  sl.addNotes("Opening. Agastya is MavionTech's multi-tenant cloud school ERP for K-12 schools and school groups. Every screen in this deck is a live screenshot from the running product with a demo school (Greenwood International School: 500 students, 45 staff).");

  // =================== 2 PROBLEM ===================
  sl = add(); head(sl, "The challenge", "School groups still run on registers, spreadsheets and WhatsApp");
  [[ic.grid, "Fragmented tools", "Admissions in one tool, fees in another, attendance on paper. Nothing reconciles, and every report is a manual export."],
   [ic.eye, "Leadership flies blind", "Principals and group heads wait days for numbers that should be live: attendance, collections, marks and leave."],
   [ic.lock, "Data risk across campuses", "Student records sit in shared spreadsheets and personal phones, with no access control and no audit trail."],
   [ic.msg, "Parents out of the loop", "Updates are scattered across personal WhatsApp groups, paper circulars and calls to the front office."]].forEach(([icn, h, b], i) => {
    const x = G.mx + (i % 2) * 6.215, y = 1.8 + Math.floor(i / 2) * 2.45;
    card(sl, x, y, 5.915, 2.15); iconChip(sl, icn, x + 0.3, y + 0.3, A, 0.56);
    txt(sl, h, x + 1.05, y + 0.32, 4.6, 0.35, { fontSize: TYPE.h3, bold: true, color: T.ink });
    txt(sl, b, x + 1.05, y + 0.75, 4.55, 1.2);
  });
  sl.addNotes("The status quo in most school groups: disconnected tools, delayed visibility for leadership, uncontrolled student data, and parent communication over personal channels. Agastya addresses all four on one platform.");

  // =================== 3 MEET AGASTYA ===================
  sl = add(); head(sl, "The platform", "Meet Agastya: one platform for every school operation");
  [[ic.dash, "Run every operation", "Admissions, academics, attendance, exams, fees, HR, transport, library, hostel, inventory and front office on one data model."],
   [ic.eye, "See every school", "Live, role-specific cockpits for group heads, principals, teachers, accountants, parents and students."],
   [ic.shield, "Govern every record", "A dedicated database per school, 96 permission codes and a before/after audit trail."]].forEach(([icn, h, b], i) => {
    const y = 1.85 + i * 1.5; iconChip(sl, icn, G.mx, y, A, 0.56);
    txt(sl, h, G.mx + 0.75, y - 0.02, 3.85, 0.32, { fontSize: TYPE.h3, bold: true, color: T.ink });
    txt(sl, b, G.mx + 0.75, y + 0.32, 3.85, 0.95, { fontSize: 13 });
  });
  frame(sl, await S("r01_dashboard.png", 7.13, 4.3), 5.6, 1.8, 7.13, 4.3, { url: "Agastya · Principal dashboard", alt: "Principal dashboard" });
  caption(sl, "Principal cockpit: school-wide KPIs, exam pass rate, pending leave approvals and teacher workload (demo data).", 5.6, 6.2, 7.13);
  sl.addNotes("Agastya in one sentence: run every operation, see every school, govern every record. The principal's cockpit shown here is computed live from the operational data.");

  // =================== 4 AT A GLANCE ===================
  sl = add(); head(sl, "At a glance", "Enterprise depth you can verify in the codebase");
  [["19", "integrated application modules"], ["128", "data models"], ["456", "web routes and screens"], ["96", "granular permission codes"],
   ["36", "pluggable dashboard widgets"], ["8 + custom", "system roles plus unlimited custom roles"], ["257", "automated tests, incl. E2E and accessibility"], ["~115K", "lines of product code"]].forEach(([n, l], i) => {
    const w = (G.cw - 3 * 0.3) / 4, x = G.mx + (i % 4) * (w + 0.3), y = 1.85 + Math.floor(i / 4) * 2.2, dark = i === 0 || i === 7;
    sl.addShape("roundRect", { x, y, w, h: 1.9, rectRadius: 0.1, fill: { color: dark ? T.midnight : T.paper }, line: { color: dark ? T.midnight : T.line, width: 0.75 } });
    txt(sl, n, x + 0.3, y + 0.25, w - 0.6, 0.85, { fontSize: n.length > 4 ? 34 : TYPE.stat, bold: true, color: dark ? T.amber : A, valign: "middle" });
    txt(sl, l, x + 0.3, y + 1.15, w - 0.6, 0.6, { fontSize: 13, color: dark ? T.onDarkMuted : T.slate700 });
  });
  caption(sl, "Source: review of the Agastya source tree, November 2026 (19 Django apps; 242 unit/integration tests + 15 Playwright end-to-end journeys with axe-core accessibility checks).", G.mx, 6.38, G.cw);
  sl.addNotes("These numbers come from the code, not a brochure. 19 application modules map to the 19 product modules on the next slide.");

  // =================== 5 PRODUCT MAP ===================
  sec("Platform");
  sl = add("MT_CONTENT_TINT"); head(sl, "Product map", "19 modules across six pillars, on one data model");
  const groups = [[ic.dash, "Command & governance", ["Role dashboards & builder", "Administration & RBAC", "Platform setup & branding"]],
    [ic.grad, "Academics", ["Admissions & student lifecycle", "Academics & syllabus", "Timetable & substitution", "Attendance", "Homework & classwork", "Exams & report cards"]],
    [ic.wallet, "Operations & finance", ["Fees & billing", "Staff operations & HR", "Transport", "Inventory & procurement", "Service desk & front office"]],
    [ic.library, "Campus life", ["Library", "Hostel, health & discipline"]],
    [ic.msg, "Engagement", ["Communications & WhatsApp inbox", "Student & parent portals, student app"]],
    [ic.cloud, "Platform", ["Multi-tenant SaaS console, plans & billing"]]];
  const cw = (G.cw - 2 * G.gutter) / 3, rowH = [2.42, 1.62];
  groups.forEach(([icn, h, items], i) => {
    const r = Math.floor(i / 3), ch = rowH[r], x = G.mx + (i % 3) * (cw + G.gutter), y = 1.72 + (r ? rowH[0] + 0.22 : 0);
    card(sl, x, y, cw, ch, T.white); iconChip(sl, icn, x + 0.25, y + 0.25, A, 0.5);
    txt(sl, h, x + 0.9, y + 0.22, cw - 1.1, 0.3, { fontSize: TYPE.h3, bold: true, color: T.ink });
    txt(sl, `${items.length} module${items.length > 1 ? "s" : ""}`, x + 0.9, y + 0.5, 1.5, 0.24, { fontSize: 10.5, bold: true, color: A });
    sl.addText(items.map((t, k) => ({ text: t, options: { bullet: { indent: 14 }, breakLine: k < items.length - 1 } })),
      { x: x + 0.25, y: y + 0.9, w: cw - 0.45, h: ch - 1.0, margin: 0, fontSize: 12.5, color: T.slate700, valign: "top", paraSpaceAfter: 2, isTextBox: true });
  });
  { const y = 1.72 + rowH[0] + 0.22 + rowH[1] + 0.22, h = 0.62;
    sl.addShape("roundRect", { x: G.mx, y, w: G.cw, h, rectRadius: 0.1, fill: { color: tint(A, 0.9) }, line: { type: "none" } });
    sl.addImage({ path: ic.db, x: G.mx + 0.25, y: y + 0.16, w: 0.3, h: 0.3 });
    sl.addText([{ text: "One data model.  ", options: { bold: true, color: T.ink } }, { text: "Attendance feeds report cards, fee plans feed invoices, routes feed manifests, and every role sees the same live record.", options: { color: T.slate700 } }],
      { x: G.mx + 0.7, y, w: G.cw - 0.9, h, margin: 0, fontSize: 13, valign: "middle", isTextBox: true }); }
  sl.addNotes("The product map. Every module shares one student, staff and academic-year model. Online fee payment, payroll and live bus GPS are roadmap items and are not counted here.");

  // =================== 6 PERSONAS ===================
  sl = add("MT_CONTENT_TINT"); head(sl, "Built for every persona", "Each role gets exactly the screens it needs");
  [[ic.building, "Group / platform admin", "Provision schools, plans and subscriptions from one console."],
   [ic.sliders, "School admin", "Configure roles, modules, branding, numbering and master data."],
   [ic.star, "Principal", "School-wide KPIs, approvals, pass rates and results."],
   [ic.grad, "Teacher", "Timetable, attendance, marks and homework for own sections."],
   [ic.wallet, "Accountant", "Invoicing, collections, dues, receipts and the ledger."],
   [ic.briefcase, "Operations staff", "Front office, library, hostel, transport and store."],
   [ic.users, "Parent", "Children, homework feed, results and school notices."],
   [ic.phone, "Student", "Web portal and mobile app for the whole school day."]].forEach(([icn, h, b], i) => {
    const w = (G.cw - 3 * 0.3) / 4, x = G.mx + (i % 4) * (w + 0.3), y = 1.8 + Math.floor(i / 4) * 2.35;
    card(sl, x, y, w, 2.1, T.white); iconChip(sl, icn, x + 0.25, y + 0.25, A, 0.5);
    txt(sl, h, x + 0.25, y + 0.92, w - 0.5, 0.32, { fontSize: 14.5, bold: true, color: T.ink });
    txt(sl, b, x + 0.25, y + 1.26, w - 0.5, 0.75, { fontSize: 12 });
  });
  caption(sl, "Eight system roles ship out of the box; schools can add unlimited custom roles with scoped assignments.", G.mx, 6.55, G.cw);
  sl.addNotes("Eight system roles ship out of the box, and schools can define unlimited custom roles with scoped assignments.");

  // =================== 7 COMMAND CENTER ===================
  sec("Command & governance");
  sl = add(); head(sl, "Command centre", "A live command centre for every school");
  await heroFeature(sl, "a01_dashboard.png", [["dash", "Live KPIs", "Active students, attendance today, overdue invoices and student-teacher ratio."],
    ["list", "Action queues", "Pending leave approvals, open invoices and homework status in one view."],
    ["search", "Scope and search", "Switch campus and academic year; search students, users and invoices globally."],
    ["repeat", "Always current", "Widgets load asynchronously and refresh without reloading the page."]],
    "School administrator dashboard: 500 students, 45 staff, 91% attendance today, 70 overdue invoices (demo data).", false, [0, 0], "Agastya · Dashboard");
  sl.addNotes("The school administrator's landing page. Every number is computed live from operational data: no exports, no spreadsheets.");

  // =================== 8 ROLE COCKPITS ===================
  sl = add(); head(sl, "Role-based experience", "One login, a different cockpit for every role");
  await cols(sl, [["r01_dashboard.png", "Principal", "School-wide KPIs, exam pass rate, leave approvals and teacher workload.", [SB, 0]],
    ["t01_dashboard.png", "Teacher", "Today's timetable across classes and rooms, with the day's teaching load.", [SB, 0]],
    ["s05_dashboard.png", "Student", "Today's periods and the student's own day at a glance.", [SB, 0]]], 3, 3.85);
  sl.addNotes("The same /dashboard address renders a different set of widgets for each role, configured per school with the dashboard builder.");

  // =================== 9 CONFIGURABLE ===================
  sl = add(); head(sl, "Configurable by design", "Leaders reconfigure the platform without developers");
  await mainStack(sl, ["a58_builder.png", [0, 0]], ["a47_permissions.png"], ["a50_feature_toggles.png"],
    ["Dashboard builder: 36 widgets; draft, publish, revert", "Permission matrix: 96 codes across 15 module groups", "Feature toggles switch modules on per school"],
    ["Dashboard builder", "Permissions for Principal", "Feature toggles"]);
  sl.addNotes("Configuration first: dashboards, roles, permissions, feature toggles, custom fields, numbering sequences and branding are all managed in the user interface.");

  // =================== 10 GOVERNANCE ===================
  sl = add(); head(sl, "Governance & security", "Every action traceable, every account protected");
  { const w = (G.cw - 0.3) / 2, h = 3.3;
    frame(sl, await S("a44_audit.png", w, h, SB, 0), G.mx, 1.75, w, h, { url: "Audit trail", alt: "Audit trail" });
    frame(sl, await S("a45_login_events.png", w, h, SB, 0), G.mx + w + 0.3, 1.75, w, h, { url: "Login events", alt: "Login events" });
    caption(sl, "Audit log: filter by module, action and date; CSV export.", G.mx, 5.12, w);
    caption(sl, "Login events: success and failure with IP address and device.", G.mx + w + 0.3, 5.12, w);
    const chips = ["Before/after audit values", "Lockout after 3 failed logins", "One active session per user", "4-hour sliding HttpOnly sessions", "96 permission codes, scoped roles", "Signed webhooks, expiring links"];
    chips.forEach((t, i) => { const cw2 = (G.cw - 2 * 0.2) / 3, x = G.mx + (i % 3) * (cw2 + 0.2), y = 5.62 + Math.floor(i / 3) * 0.55;
      sl.addShape("roundRect", { x, y, w: cw2, h: 0.42, rectRadius: 0.21, fill: { color: tint(A, 0.92) }, line: { type: "none" } });
      sl.addImage({ path: ic.check, x: x + 0.18, y: y + 0.11, w: 0.2, h: 0.2 });
      txt(sl, t, x + 0.48, y, cw2 - 0.6, 0.42, { fontSize: 12, color: T.ink, valign: "middle" }); }); }
  sl.addNotes("Security is part of the core, not an add-on. Finance and exam events record before/after JSON in the audit log. Note: these captures come from the demo environment.");

  // =================== 11 STUDENT LIFECYCLE ===================
  sec("Academics");
  sl = add(); head(sl, "Student lifecycle", "Admit a student in one screen, keep one record for life");
  frame(sl, await S("a05_admit.png", 7.2, 3.75, SB, 0), G.mx, 1.75, 7.2, 3.75, { url: "Admit student", alt: "Single-screen admission form" });
  frame(sl, await S("a04_inquiries.png", 4.63, 1.77, SB, 0), 8.1, 1.75, 4.63, 1.77, { alt: "Admission inquiries" });
  frame(sl, await S("a03_student360.png", 4.63, 1.77, SB, 0), 8.1, 3.73, 4.63, 1.77, { alt: "Student 360" });
  const steps = ["Inquiry", "Admit & enrol", "Guardian documents", "Student 360", "Promote · transfer · exit"];
  steps.forEach((t, i) => { const w = (G.cw - 4 * 0.25) / 5, x = G.mx + i * (w + 0.25), y = 5.75;
    sl.addShape("roundRect", { x, y, w, h: 0.55, rectRadius: 0.1, fill: { color: i === 1 ? A : tint(A, 0.9) }, line: { type: "none" } });
    txt(sl, `${i + 1}  ${t}`, x + 0.15, y, w - 0.3, 0.55, { fontSize: 12.5, bold: true, color: i === 1 ? T.white : T.ink, valign: "middle" });
    if (i < 4) sl.addShape("line", { x: x + w + 0.02, y: y + 0.275, w: 0.21, h: 0, line: { color: T.slate300, width: 1.25, endArrowType: "triangle" } }); });
  txt(sl, "Single-screen admission captures student, enrolment, guardians and emergency contact in one step. Guardians upload documents through a link sent by SMS, email or WhatsApp, valid for 7 days, with no login needed.", G.mx, 6.38, G.cw, 0.5, { fontSize: 11.5, color: T.slate500 });
  sl.addNotes("From inquiry to alumni. The inquiry pipeline tracks status (new, contacted, admitted). Admission is one atomic step. Guardian upload links are valid 7 days; Indian 10-digit numbers are formatted to +91 automatically. Student 360 holds enrolment history and lifecycle transitions.");

  // =================== 12 TIMETABLE ===================
  sl = add(); head(sl, "Timetable & substitution", "Clash-free timetables, and every absence covered by 9 AM");
  await mainStack(sl, ["a07_tt_dashboard.png"], ["a08_class_view.png"], ["a11_workload.png"],
    ["Timetable dashboard: 700 weekly lectures, 40 teachers, 23 rooms, zero conflicts (demo data)", "Class and section timetable viewer", "Teacher workload with overload thresholds; substitutions suggest free teachers"],
    ["Timetable dashboard", "Class timetable", "Teacher workload"]);
  sl.addNotes("Timetable entries are validated for teacher and room conflicts. Foundations include working days, bell schedule, rooms and venues, and teacher assignments. On any date the substitution screen lists absent teachers and suggests available ones; section plans can be copied across classes.");

  // =================== 13 ATTENDANCE ===================
  sl = add(); head(sl, "Attendance", "Attendance in seconds per class, records that stand up to audit");
  await heroFeature(sl, "a57_quick_capture.png", [["check", "Quick capture", "Card or list mode: everyone starts present; tap to mark absent or late."],
    ["calendar", "Synced to the timetable", "Sessions follow the timetable; teachers see only their sections."],
    ["lock", "Lock and correct", "Sessions lock; corrections go through an audited workflow."],
    ["chart", "Leave and reports", "Student leave approvals, daily registers, section summaries and Excel export."]],
    "Quick capture for Grade 1-A: tap exceptions, then submit and lock the session.", true, [SB, 0], "Attendance · Quick capture");
  sl.addNotes("Attendance capture takes seconds per class. The attendance dashboard (90.8% today, 7-day trend, status mix, locked sessions and leave queue) gives the admin the school-wide view.");

  // =================== 14 HOMEWORK ===================
  sl = add(); head(sl, "Homework & classwork", "Learning continues at home, with data teachers can act on");
  await twoShots(sl, ["a31_homework_list.png", "Homework registry by class, subject and teacher."], ["a32_homework_analytics.png", "Per-assignment analytics: submission rate, graded and late work."],
    [["target", "Targeted audiences", "Whole section or selected students."], ["eye", "Read receipts", "See who opened each assignment."], ["list", "Bulk grading", "Grade a whole class in one grid."], ["users", "Parent feed", "Parents follow every assignment."]]);
  sl.addNotes("Teachers publish homework and classwork with attachments; students submit and resubmit; parents get their own homework feed.");

  // =================== 15 RESULTS DAY ===================
  sl = add(); head(sl, "Exams & assessment", "Results day in hours, not weeks");
  await mainStack(sl, ["a15_marks_entry.png"], ["a14_marks_dashboard.png", [SB, 90]], ["a56_exam_defs.png"],
    ["Grid marks entry, restricted to the teacher's own sections, with automatic grading", "Completion tracker shows who still has marks to enter", "Exam events, subject papers, grading scales and admit cards are configurable"],
    ["Marks entry", "Marks entry progress", "Subject test metrics"]);
  sl.addNotes("Grade schemes, exam groups, subject papers (maximum and pass marks), admit cards and signature settings are configurable. Every exam action is written to the audit log.");

  // =================== 16 REPORT CARDS ===================
  sl = add(); head(sl, "Report cards & analysis", "Branded report cards, published in one click");
  await cols(sl, [["a17_report_card_pdf.png", "Printable report card", "School identity, student details, marks, attendance %, remarks and official signatures.", [0, 60]],
    ["a16_report_cards.png", "Publish control", "Generate in batch, then publish individually or all at once.", [SB, 0]],
    ["s04_results.png", "Families see results", "Students and parents view results with a performance radar and PDF download.", [SB, 0]]], 3, 3.85);
  sl.addNotes("500 report cards generated and published for the demo term. Subject-wise analysis (average, highest, lowest, pass %) and top-performer lists support the exam review.");

  // =================== 17 SYLLABUS & PORTAL ===================
  sec("Engagement");
  sl = add(); head(sl, "Student & parent portals", "The school in every family's pocket");
  await cols(sl, [["s01_portal.png", "Student portal", "Attendance rate, homework due, alerts and a performance snapshot.", [SB, 0]],
    ["s02_syllabus.png", "Syllabus", "Every subject's chapters and coverage points.", [SB, 0]],
    ["s03_fee.png", "Fee ledger", "Balances, invoices and payment history.", [SB, 0]],
    ["g02_parent_feed.png", "Parent feed", "Each child's homework and status, in one place.", [SB, 0]]], 4, 3.9);
  sl.addNotes("Students get a web portal and an Expo mobile app (iOS and Android) on the same APIs and session rules: digital ID, transport, library, admit cards and leave tracking. Parents see their children, homework feed, results and notices. No mobile screenshots are available yet.");

  // =================== 18 COMMUNICATIONS ===================
  sl = add(); head(sl, "Communications", "One school-owned channel to every parent");
  await heroFeature(sl, "a34_whatsapp.png", [["whatsapp", "Two-way WhatsApp inbox", "Inbound parent messages via the Meta Cloud API; staff reply from the web."],
    ["send", "Targeted broadcasts", "School-wide, or by role, class or section."],
    ["bell", "Real-time notifications", "Live unread counts pushed over WebSockets."],
    ["radio", "SMS, OTP and email", "Twilio SMS and Verify, SMTP email; configured per school with test-send."]],
    "WhatsApp Business inbox: parent messages with in-line replies (demo data).", false, [SB, 0], "Communications · WhatsApp inbox");
  sl.addNotes("Communications are configurable per school or at platform level, with a test-send screen for each channel. A 'Trigger Engine' menu item exists; its behaviour is to be confirmed before it is presented.");

  // =================== 19 FEES ===================
  sec("Operations & finance");
  sl = add(); head(sl, "Fees & billing", "Faster collections and real-time visibility of every rupee");
  await mainStack(sl, ["a20_collections.png"], ["a21_dues.png"], ["a22_invoice.png"],
    ["Daily collection summary with payment-method breakdown", "Outstanding dues and overdue invoices", "Branded invoice with balance and payment history"],
    ["Daily collections", "Open receivables", "Invoice GIS-INV-00003"]);
  sl.addNotes("Fee heads, plans and concessions apply automatically at invoicing; bulk invoicing runs per fee plan for a student or a whole section. Receipts cover cash, card, UPI, wallet and net banking. Invoice numbers come from race-safe sequence rules; every financial event is audited with before/after values. Online fee payment by parents is on the roadmap.");

  // =================== 20 STAFF ===================
  sl = add(); head(sl, "Staff operations & HR", "Attendance and leave discipline without paper registers");
  await mainStack(sl, ["a41_staff.png"], ["a43_leave.png"], ["a60_onboarding.png"],
    ["Staff directory with departments, designations and categories", "Leave approval queue with pending, approved and rejected counts", "Guided onboarding: profile, user account and role in one flow"],
    ["Staff directory", "Leave approval queue", "Staff onboarding"]);
  sl.addNotes("Staff self punch-in and punch-out feed a monthly attendance ledger with day-level approval on the attendance calendar, with Excel export. Staff documents, leave types and designations are managed in Staff Operations. Payroll is a roadmap item.");

  // =================== 21 TRANSPORT ===================
  sl = add(); head(sl, "Transport", "A safer, compliant fleet and fewer 'where is my bus' calls");
  await heroFeature(sl, "a24_transport_dash.png", [["bus", "Fleet and compliance", "Vehicles and documents with 7-day expiry alerts."],
    ["map", "Routes, stops, crew", "Route-vehicle and driver/attendant assignments."],
    ["list", "Daily manifests", "Stop-by-stop rider list for any route and date."],
    ["bell", "Automatic alerts", "Parents notified when a route or stop changes."]],
    "Transport dashboard: 10 vehicles, 10 routes, 500 students assigned, crew coverage and compliance watch (demo data).", true, [SB, 0], "Transport · Dashboard");
  sl.addNotes("Live GPS bus tracking is a roadmap item, not available today.");

  // =================== 22 LIBRARY ===================
  sec("Campus life");
  sl = add(); head(sl, "Library", "A traceable library with fines enforced automatically");
  await twoShots(sl, ["a27_library_dash.png", "Library dashboard: titles, copies, active loans, overdue items and fines."], ["a54_library_reports.png", "Library reports: circulation, fine exposure, requests and lost books."],
    [["book", "Catalogue", "Categories, authors and copies."], ["repeat", "Issue and return", "Loan rules set per school."], ["receipt", "Automatic fines", "Calculated daily on overdue loans."], ["inbox", "Reservations", "Student self-borrow requests."]]);
  sl.addNotes("Library settings define loan period and fine per day; overdue fines are calculated automatically.");

  // =================== 23 HOSTEL HEALTH DISCIPLINE ===================
  sl = add(); head(sl, "Hostel, health & discipline", "Duty-of-care records for boarding and day schools");
  await cols(sl, [["a29_hostel_beds.png", "Hostel", "Hostels, rooms and bed allocations with start and end dates."],
    ["a30_medical.png", "Health register", "Medical incidents with severity and treatment notes."],
    ["a59_discipline.png", "Discipline register", "Incidents, category and action taken, with guardian follow-up."]], 3, 3.85);
  sl.addNotes("Residential schools get hostel, health and discipline records on the same student record.");

  // =================== 24 INVENTORY ===================
  sl = add(); head(sl, "Inventory & procurement", "Controlled spend and an asset trail across campuses");
  await heroFeature(sl, "a40_assets.png", [["box", "Items and stock", "Inventory items, locations and a stock ledger."],
    ["cart", "Purchase flow", "Purchase requests become purchase orders."],
    ["hand", "Vendors", "Vendor master with contacts and order history."],
    ["tag", "Asset register", "Tagged assets with serial numbers and assignees."]],
    "Fixed asset register with tags, serial numbers and assignment (demo data).", false, [SB, 0], "Inventory · Asset register");
  sl.addNotes("Store and procurement staff track stock, vendors, purchase orders and fixed assets.");

  // =================== 25 FRONT OFFICE ===================
  sl = add(); head(sl, "Service desk & front office", "A professional front office: certificates, grievances, visitors");
  await cols(sl, [["a35_certificates.png", "Certificates", "Bonafide, transfer and other certificates, requested and issued with numbers."],
    ["a36_complaints.png", "Complaints & requests", "Grievances and service requests tracked to closure."],
    ["a37_visitors.png", "Visitor log", "Every visitor checked in and out, with purpose."]], 3, 3.85);
  sl.addNotes("The front office runs from one desk: certificates with issued numbers, complaints and service requests with detail pages, and a visitor log.");

  // =================== 26 SAAS ===================
  sec("Platform & architecture");
  sl = add(); head(sl, "Multi-tenant SaaS", "Onboard a new school in minutes, with isolated data from day one");
  await mainStack(sl, ["x01_tenants.png"], ["x02_tenant_create.png"], ["a52_subscription.png"],
    ["Platform console: schools, plans, status and dedicated databases", "Create a school: code, timezone, currency, locale and plan", "School-side plan, renewal and billing view"],
    ["Tenant management", "Create tenant", "Manage subscription"]);
  sl.addNotes("Provisioning a school creates its database, migrates it, syncs roles and permissions, and creates a bootstrap admin and default campus. Plans carry student and staff caps; subscriptions are billed through Razorpay payment links and webhooks, and access follows subscription status.");

  // =================== 27 ARCHITECTURE ===================
  sl = add(); head(sl, "Architecture", "Database-per-school isolation, enforced on every request");
  const colLabel = (t, x, w) => txt(sl, t.toUpperCase(), x, 1.7, w, 0.25, { fontSize: 10, bold: true, charSpacing: 2, color: T.slate500 });
  const box = (x, y, w, h, hd, sub, o = {}) => {
    sl.addShape("roundRect", { x, y, w, h, rectRadius: 0.08, fill: { color: o.fill || T.white }, line: { color: o.line || T.line, width: o.lw || 0.75 } });
    sl.addText([{ text: hd, options: { bold: true, fontSize: 12.5, color: T.ink, breakLine: !!sub } }].concat(sub ? [{ text: sub, options: { fontSize: 10.5, color: T.slate500 } }] : []),
      { x: x + 0.15, y, w: w - 0.3, h, margin: 0, valign: "middle", isTextBox: true });
  };
  const arrow = (x1, y1, x2, y2) => sl.addShape("line", { x: x1, y: y1, w: x2 - x1, h: y2 - y1, line: { color: T.slate300, width: 1.25, endArrowType: "triangle" } });
  colLabel("Clients", G.mx, 2.4);
  [["Web app", "Staff, parents, students"], ["Student mobile app", "Expo · iOS / Android"], ["Webhooks", "Razorpay · WhatsApp"]].forEach(([h, t], i) => box(G.mx, 2.05 + i * 1.05, 2.4, 0.82, h, t));
  colLabel("Daphne ASGI · request pipeline", 3.45, 3.4);
  sl.addShape("roundRect", { x: 3.45, y: 2.05, w: 3.4, h: 3.92, rectRadius: 0.1, fill: { color: T.midnight }, line: { type: "none" } });
  ["Tenant database context", "Authentication + single session", "Tenant & subscription gate", "RBAC permission check", "Tenant database router"].forEach((t, i) => {
    const y = 2.27 + i * 0.73;
    sl.addShape("ellipse", { x: 3.68, y: y + 0.08, w: 0.36, h: 0.36, fill: { color: A }, line: { type: "none" } });
    txt(sl, String(i + 1), 3.68, y + 0.08, 0.36, 0.36, { fontSize: 11, bold: true, color: T.white, align: "center", valign: "middle" });
    txt(sl, t, 4.18, y, 2.55, 0.52, { fontSize: 12.5, color: T.white, valign: "middle" });
  });
  [2.46, 3.51, 4.56].forEach(y => arrow(3.0, y, 3.45, y));
  colLabel("Data", 7.3, 2.7);
  box(7.3, 2.05, 2.75, 0.95, "Control database", "Tenants · plans · billing", { line: T.amber, lw: 1.5 });
  box(7.3, 3.25, 2.75, 0.75, "tenant_greenwood", "Isolated MySQL database", { fill: tint(A, 0.92), line: tint(A, 0.6) });
  box(7.3, 4.15, 2.75, 0.75, "tenant_riverdale", "Isolated MySQL database", { fill: tint(A, 0.92), line: tint(A, 0.6) });
  box(7.3, 5.05, 2.75, 0.75, "One database per school", "Created, migrated and seeded on provisioning", { fill: tint(A, 0.92), line: tint(A, 0.6) });
  [2.52, 3.62, 4.52].forEach(y => arrow(6.85, y, 7.3, y));
  colLabel("Integrations", 10.5, 2.2);
  [["Razorpay", "Subscription billing"], ["Meta WhatsApp", "Inbox & templates"], ["Twilio", "SMS & OTP"], ["SMTP email", "Resets, welcomes"], ["ReportLab · Excel", "PDF & XLSX exports"]].forEach(([h, t], i) => box(10.5, 2.05 + i * 0.79, 2.23, 0.66, h, t));
  sl.addText([{ text: "Two layers of isolation. ", options: { bold: true, color: T.ink } }, { text: "Middleware selects each school's dedicated database on every request, and every business model also carries a tenant key.", options: { color: T.slate700 } }],
    { x: G.mx, y: 6.25, w: G.cw, h: 0.45, margin: 0, fontSize: 13, valign: "middle", isTextBox: true });
  sl.addNotes("Isolation works in two layers: a dedicated database per school, selected per request by middleware and a database router, plus tenant foreign keys on every business model.");

  // =================== 28 TECHNOLOGY ===================
  sl = add("MT_DARK"); head(sl, "Technology", "A modern, maintainable stack your IT team will recognise", true);
  [["code", "Backend", "Django 5.1 on Python: 19 modular apps, 128 data models, 86 migrations."],
   ["db", "Data", "MySQL (utf8mb4): one database per school, plus a control database."],
   ["radio", "Real-time", "Daphne ASGI and Django Channels, with a Redis-ready channel layer."],
   ["palette", "Design system", "Tailwind CSS with design tokens; light and dark themes."],
   ["mobile", "Mobile", "Expo SDK, React Native and expo-router for iOS, Android and web."],
   ["tests", "Quality", "242 unit and integration tests, 15 Playwright end-to-end journeys with axe-core."]].forEach(([icn, h, b], i) => {
    const w = (G.cw - 2 * 0.3) / 3, x = G.mx + (i % 3) * (w + 0.3), y = 1.85 + Math.floor(i / 3) * 2.3;
    sl.addShape("roundRect", { x, y, w, h: 2.0, rectRadius: 0.1, fill: { color: T.midnight2 }, line: { color: "22365A", width: 0.75 } });
    sl.addShape("roundRect", { x: x + 0.3, y: y + 0.3, w: 0.52, h: 0.52, rectRadius: 0.12, fill: { color: A }, line: { type: "none" } });
    sl.addImage({ path: icW[icn], x: x + 0.43, y: y + 0.43, w: 0.26, h: 0.26 });
    txt(sl, h, x + 0.3, y + 0.98, w - 0.6, 0.32, { fontSize: 15, bold: true, color: T.white });
    txt(sl, b, x + 0.3, y + 1.32, w - 0.6, 0.6, { fontSize: 12, color: T.onDarkMuted });
  });
  txt(sl, "Open, mainstream technology with no proprietary runtime.", G.mx, 6.5, G.cw, 0.3, { fontSize: 12, color: T.onDarkMuted });
  sl.addNotes("Open, mainstream technology. The original deck notes state it can run on any cloud or on-premise MySQL; confirm the on-premise commercial offer before promising it.");

  // =================== 29 WHY AGASTYA ===================
  sec("Value & next steps");
  sl = add("MT_DARK"); head(sl, "Why Agastya", "What changes when a school group moves to Agastya", true);
  const rows = [["Data", "Spreadsheets, registers and phones", "One data model, a dedicated database per school"],
    ["Visibility", "Reports compiled by hand, days late", "Live role cockpits for every leader"],
    ["Control", "Shared logins, no record of changes", "96 permissions, single sessions, full audit trail"],
    ["Parents", "Personal WhatsApp groups, paper circulars", "Portals, student app, school-owned WhatsApp inbox"],
    ["Growth", "Every new campus repeats the setup", "New school provisioned from the console"]];
  txt(sl, "TODAY", 2.05, 1.72, 2.6, 0.25, { fontSize: 10, bold: true, charSpacing: 2, color: T.onDarkMuted });
  txt(sl, "WITH AGASTYA", 4.85, 1.72, 3.2, 0.25, { fontSize: 10, bold: true, charSpacing: 2, color: T.amber });
  rows.forEach(([d, a, b], i) => { const y = 2.08 + i * 0.86;
    sl.addShape("line", { x: G.mx, y: y - 0.06, w: 7.55, h: 0, line: { color: "22365A", width: 0.75 } });
    txt(sl, d, G.mx, y, 1.35, 0.7, { fontSize: 13, bold: true, color: T.white, valign: "middle" });
    txt(sl, a, 2.05, y, 2.6, 0.7, { fontSize: 12.5, color: T.onDarkMuted, valign: "middle" });
    sl.addImage({ path: checkAmber, x: 4.85, y: y + 0.24, w: 0.22, h: 0.22 });
    txt(sl, b, 5.2, y, 2.95, 0.7, { fontSize: 12.5, color: T.white, valign: "middle" }); });
  [["db", "Isolation by design", "Each school gets its own database, created and migrated automatically."],
   ["sliders", "Configurable without developers", "Dashboard builder, RBAC matrix, feature toggles and branding."],
   ["whatsapp", "A school-owned parent channel", "Two-way WhatsApp inbox through the Meta Cloud API."],
   ["shield", "Audit-grade governance", "Before/after audit, login events, lockout and single sessions."]].forEach(([icn, h, b], i) => {
    const x = 8.75, y = 1.72 + i * 1.22, w = 3.98, hh = 1.06;
    sl.addShape("roundRect", { x, y, w, h: hh, rectRadius: 0.1, fill: { color: T.midnight2 }, line: { color: "22365A", width: 0.75 } });
    sl.addShape("roundRect", { x: x + 0.2, y: y + 0.22, w: 0.5, h: 0.5, rectRadius: 0.12, fill: { color: A }, line: { type: "none" } });
    sl.addImage({ path: icW[icn], x: x + 0.32, y: y + 0.34, w: 0.26, h: 0.26 });
    txt(sl, h, x + 0.88, y + 0.14, w - 1.05, 0.32, { fontSize: 13, bold: true, color: T.white });
    txt(sl, b, x + 0.88, y + 0.45, w - 1.05, 0.52, { fontSize: 11, color: T.onDarkMuted }); });
  sl.addNotes("The before/after story in five lines, plus the four differentiators. Every 'With Agastya' cell maps to a capability shown earlier; no quantified ROI is claimed.");

  // =================== 30 ROLLOUT ===================
  sl = add(); head(sl, "Getting started", "An indicative rollout: first campus live in about six weeks");
  sl.addShape("line", { x: G.mx, y: 2.55, w: G.cw, h: 0, line: { color: T.line, width: 1.5 } });
  [["WEEK 1", "Provision", "Create the school workspace, branding, roles, academic year and fee heads.", "rocket"],
   ["WEEKS 2–3", "Migrate", "Import students, guardians, staff, classes, subjects and fee plans; build the timetable.", "upload"],
   ["WEEKS 4–6", "Pilot go-live", "Attendance, homework, fees and announcements live at the pilot campus; staff trained.", "flag"],
   ["WEEK 7+", "Scale out", "Exams and report cards, transport and library; next campuses provisioned from the console.", "layers"]].forEach(([wk, h, b, icn], i) => {
    const w = G.cw / 4, x = G.mx + i * w;
    sl.addShape("ellipse", { x, y: 2.43, w: 0.24, h: 0.24, fill: { color: i === 2 ? T.amber : A }, line: { color: T.white, width: 2 } });
    txt(sl, wk, x, 1.95, w - 0.2, 0.3, { fontSize: 10.5, bold: true, charSpacing: 2, color: A });
    iconChip(sl, ic[icn], x, 3.0, A, 0.5);
    txt(sl, h, x, 3.7, w - 0.3, 0.35, { fontSize: TYPE.h3, bold: true, color: T.ink });
    txt(sl, b, x, 4.1, w - 0.35, 1.4, { fontSize: 13 });
  });
  card(sl, G.mx, 5.75, G.cw, 0.62, tint(A, 0.92), tint(A, 0.92));
  txt(sl, "Timelines are indicative and depend on data readiness and the modules in scope; they are confirmed with delivery during scoping.", G.mx + 0.25, 5.75, G.cw - 0.5, 0.62, { fontSize: 12.5, color: T.ink, valign: "middle" });
  sl.addNotes("A phased adoption: schools start with core modules and expand. Confirm timelines with delivery before committing.");

  // =================== 31 ROADMAP ===================
  sl = add("MT_DARK"); head(sl, "Roadmap", "What's next on the Agastya roadmap", true);
  txt(sl, "Specified in the product plans, not yet built. Shown so buyers can plan; not available today.", G.mx, 1.45, G.cw, 0.3, { fontSize: 12, color: T.onDarkMuted });
  [["wallet", "Online fee payment", "Parents pay fees through a gateway, with refunds and late-fee rules."],
   ["receipt", "Payroll", "Salary structures and payroll processing on top of staff records."],
   ["send", "Multi-channel broadcast", "Send announcements over SMS, WhatsApp and email at once."],
   ["chart", "Saved and scheduled reports", "Self-service report builder with scheduled delivery."],
   ["map", "Live bus tracking", "GPS tracking and boarding logs for every trip."],
   ["phone", "Teacher and parent apps", "Dedicated mobile experiences with push notifications."]].forEach(([icn, h, b], i) => {
    const w = (G.cw - 2 * 0.3) / 3, x = G.mx + (i % 3) * (w + 0.3), y = 1.95 + Math.floor(i / 3) * 2.25;
    sl.addShape("roundRect", { x, y, w, h: 1.95, rectRadius: 0.1, fill: { color: T.midnight2 }, line: { color: "22365A", width: 0.75 } });
    sl.addShape("roundRect", { x: x + 0.3, y: y + 0.3, w: 0.52, h: 0.52, rectRadius: 0.12, fill: { color: "22365A" }, line: { type: "none" } });
    sl.addImage({ path: icW[icn], x: x + 0.43, y: y + 0.43, w: 0.26, h: 0.26 });
    txt(sl, "PLANNED", x + w - 1.25, y + 0.42, 0.95, 0.28, { fontSize: 9, bold: true, charSpacing: 2, color: T.amber, align: "right" });
    txt(sl, h, x + 0.3, y + 0.98, w - 0.6, 0.32, { fontSize: 15, bold: true, color: T.white });
    txt(sl, b, x + 0.3, y + 1.32, w - 0.6, 0.55, { fontSize: 12, color: T.onDarkMuted });
  });
  sl.addNotes("Roadmap items are specified in the product specifications but not yet built. Position them as upcoming, not available today.");

  // =================== 32 CLOSE ===================
  sl = add("MT_CLOSE");
  kicker(sl, "Let's get started", T.amber, G.mx, 1.95);
  sl.addText("Run every school in your group on one platform", { placeholder: "title" });
  sl.addText("See Agastya with your own data in a guided walkthrough, then run a pilot at one campus.", { placeholder: "body" });
  [["Book a demo", T.amber, T.midnight], ["Plan a pilot", T.midnight2, T.white]].forEach(([t, f, c], i) => {
    sl.addShape("roundRect", { x: G.mx + i * 2.05, y: 5.1, w: 1.85, h: 0.5, rectRadius: 0.25, fill: { color: f }, line: { color: i ? "2E4468" : f, width: 0.75 } });
    txt(sl, t, G.mx + i * 2.05, 5.1, 1.85, 0.5, { fontSize: 13, bold: true, color: c, align: "center", valign: "middle" }); });
  sl.addShape("roundRect", { x: 7.6, y: 1.9, w: 5.13, h: 3.7, rectRadius: 0.12, fill: { color: T.midnight2 }, line: { color: "2E4468", width: 0.75 } });
  sl.addImage({ path: "D:/MavionTech_sales/branding/maviontech-logo.png", x: 7.95, y: 2.2, w: 0.6, h: 0.6 });
  sl.addText([{ text: "MavionTech Pvt. Ltd.", options: { bold: true, fontSize: 16, color: T.white, breakLine: true } }, { text: "Agastya · Cloud School ERP", options: { fontSize: 11, color: T.onDarkMuted } }],
    { x: 8.7, y: 2.2, w: 3.8, h: 0.6, margin: 0, valign: "middle", isTextBox: true });
  sl.addText([{ text: "communications@maviontech.com", options: { breakLine: true } }, { text: "+91 91580 08002", options: { breakLine: true } },
    { text: "www.maviontech.com", options: { breakLine: true } }, { text: "505 Zen Business Center, Bhumkar Chowk, Wakad, Pune, Maharashtra 411057", options: {} }],
    { x: 7.95, y: 3.1, w: 4.5, h: 2.2, margin: 0, fontSize: 13, color: T.white, valign: "top", paraSpaceAfter: 6, isTextBox: true });
  sl.addNotes("The close. One ask: a walkthrough with the prospect's data, then a single-campus pilot. Contact details are the official MavionTech details from maviontech.com.");

  await pres.writeFile({ fileName: OUT });
  console.log("written", OUT, pres.slides.length, "slides");
})();
