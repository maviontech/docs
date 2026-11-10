// MavionTech_Design_Prototype.pptx — six prototype slides on Agastya
const pptxgen = require("pptxgenjs");
const L = require("react-icons/lu");
const M = require("./mt");
const { T, TYPE, G, tint, kicker, title, frame, iconChip, caption, card } = M;
const SS = "D:/MavionTech_sales/Agastya_screenshots/";
const OUT = M.ROOT + "/07_Design_System/MavionTech_Design_Prototype.pptx";
const A = M.PRODUCTS.agastya.accent;

(async () => {
  require("fs").mkdirSync(M.ROOT + "/07_Design_System", { recursive: true });
  // assets
  const bgCover = await M.darkBg(A, "bg_cover_agastya.png", "cover");
  const bgDiv = await M.darkBg(A, "bg_divider_agastya.png", "divider");
  const ic = {};
  const want = { dash: "LuLayoutDashboard", shield: "LuShieldCheck", sliders: "LuSlidersHorizontal", grad: "LuGraduationCap", wallet: "LuWallet",
    library: "LuLibrary", msg: "LuMessagesSquare", server: "LuServer", db: "LuDatabase", eye: "LuEye", users: "LuUsers", cloud: "LuCloud", check: "LuCheck" };
  for (const [k, n] of Object.entries(want)) ic[k] = await M.icon(L[n], A, `ic_${k}_${A}.png`);
  ic.checkAmber = await M.icon(L.LuCheck, T.amber, "ic_check_amber.png");
  for (const [k, n] of Object.entries({ db: "LuDatabase", sliders: "LuSlidersHorizontal", msg: "LuMessageCircle", shield: "LuShieldCheck" }))
    ic["w_" + k] = await M.icon(L[n], "FFFFFF", `ic_${k}_white.png`);

  // screenshots (frame inner aspect computed per use)
  const inner = (w, h) => (w - 0.08) / (h - 0.26 - 0.04);
  const s = {
    coverMain: await M.shot(SS + "a01_dashboard.png", "p_a01_cover.png", inner(6.1, 3.85)),
    coverSub: await M.shot(SS + "s01_portal.png", "p_s01_cover.png", inner(3.7, 2.45)),
    overview: await M.shot(SS + "r01_dashboard.png", "p_r01.png", inner(7.13, 4.3)),
    marks: await M.shot(SS + "a15_marks_entry.png", "p_a15.png", inner(7.2, 4.45), 430, 0),
    tracker: await M.shot(SS + "a14_marks_dashboard.png", "p_a14.png", inner(4.63, 2.12), 430, 90),
    report: await M.shot(SS + "a17_report_card_pdf.png", "p_a17.png", inner(4.63, 2.12), 0, 60),
  };

  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE";
  pres.author = "MavionTech Pvt. Ltd."; pres.company = "MavionTech Pvt. Ltd."; pres.title = "MavionTech Design Prototype — Agastya";
  pres.theme = { headFontFace: M.FONT.head, bodyFontFace: M.FONT.body };
  M.defineLayouts(pres, "agastya", bgCover, bgDiv);

  // ---------- 1. COVER ----------
  let sl = pres.addSlide({ masterName: "MT_COVER" });
  kicker(sl, "Enterprise sales overview", T.amber, G.mx, 1.95);
  sl.addText("Agastya", { placeholder: "title" });
  sl.addText("CLOUD SCHOOL ERP", { x: G.mx, y: 3.22, w: 5, h: 0.3, margin: 0, fontSize: 12, bold: true, charSpacing: 4, color: tint(A, 0.45), isTextBox: true });
  sl.addText("One operating system for every school in your group", { placeholder: "body" });
  sl.addText("From admission to report card, fee to fleet: every department, persona and campus on one governed platform, with each school's data in its own database.",
    { x: G.mx, y: 4.9, w: 5.3, h: 0.95, margin: 0, fontSize: 14, color: T.onDarkMuted, valign: "top", isTextBox: true });
  ["19 integrated modules", "8 role cockpits", "Database per school"].forEach((t, i) => {
    const w = [1.95, 1.6, 1.85][i], x = G.mx + [0, 2.08, 3.81][i];
    sl.addShape("roundRect", { x, y: 6.1, w, h: 0.38, rectRadius: 0.19, fill: { color: T.midnight2 }, line: { color: "2E4468", width: 0.75 } });
    sl.addText(t, { x, y: 6.1, w, h: 0.38, margin: 0, fontSize: 11, color: T.white, align: "center", valign: "middle", isTextBox: true });
  });
  frame(sl, s.coverMain, 6.65, 1.25, 6.1, 3.85, { dark: true, url: "app.agastya · Dashboard", alt: "Agastya school administrator dashboard" });
  frame(sl, s.coverSub, 6.45, 4.2, 3.7, 2.45, { dark: true, alt: "Agastya student portal" });
  sl.addNotes("Cover. Agastya is MavionTech's multi-tenant cloud school ERP. Screens: school administrator dashboard and student portal (demo school: Greenwood International School).");

  // ---------- 2. PRODUCT OVERVIEW ----------
  sl = pres.addSlide({ masterName: "MT_CONTENT" });
  sl.addText("THE PLATFORM", { placeholder: "kicker" });
  sl.addText("Run every operation, see every school, govern every record", { placeholder: "title" });
  const pillars = [
    [ic.dash, "Run every operation", "Admissions, academics, attendance, exams, fees, HR, transport, library, hostel, inventory and front office on one data model."],
    [ic.eye, "See every school", "Live, role-specific cockpits for group heads, principals, teachers, accountants, parents and students."],
    [ic.shield, "Govern every record", "A dedicated database per school, 96 permission codes and a before/after audit trail."],
  ];
  pillars.forEach(([icn, h, b], i) => {
    const y = 1.8 + i * 1.12;
    iconChip(sl, icn, G.mx, y, A, 0.56);
    sl.addText(h, { x: G.mx + 0.75, y: y - 0.02, w: 3.85, h: 0.32, margin: 0, fontSize: TYPE.h3, bold: true, color: T.ink, isTextBox: true });
    sl.addText(b, { x: G.mx + 0.75, y: y + 0.3, w: 3.85, h: 0.72, margin: 0, fontSize: 12.5, color: T.slate700, valign: "top", isTextBox: true });
  });
  [["19", "integrated modules"], ["8", "built-in roles"], ["96", "permission codes"], ["257", "automated tests"]].forEach(([n, l], i) => {
    const x = G.mx + (i % 2) * 2.35, y = 5.15 + Math.floor(i / 2) * 0.72;
    sl.addText(n, { x, y, w: 0.95, h: 0.55, margin: 0, fontSize: 28, bold: true, color: A, valign: "middle", isTextBox: true });
    sl.addText(l, { x: x + 0.98, y, w: 1.3, h: 0.55, margin: 0, fontSize: 11, color: T.slate700, valign: "middle", isTextBox: true });
  });
  frame(sl, s.overview, 5.6, 1.8, 7.13, 4.3, { url: "app.agastya · Principal dashboard", alt: "Agastya principal dashboard" });
  caption(sl, "Principal cockpit: school-wide KPIs, pass rate, approvals and teacher workload (demo data).", 5.6, 6.2, 7.13);
  caption(sl, "Source: Agastya source review, Nov 2026.", G.mx, 6.62, 4.5, T.slate500);
  sl.addNotes("Agastya in one sentence: run every operation, see every school, govern every record. Metrics come from the code review (Nov 2026).");

  // ---------- 3. MODULES & CAPABILITIES ----------
  sl = pres.addSlide({ masterName: "MT_CONTENT_TINT" });
  sl.addText("PRODUCT MAP", { placeholder: "kicker" });
  sl.addText("19 modules across six pillars, on one data model", { placeholder: "title" });
  const groups = [
    [ic.dash, "Command & governance", ["Role dashboards & builder", "Administration & RBAC", "Platform setup & branding"]],
    [ic.grad, "Academics", ["Admissions & student lifecycle", "Academics & syllabus", "Timetable & substitution", "Attendance", "Homework & classwork", "Exams & report cards"]],
    [ic.wallet, "Operations & finance", ["Fees & billing", "Staff operations & HR", "Transport", "Inventory & procurement", "Service desk & front office"]],
    [ic.library, "Campus life", ["Library", "Hostel, health & discipline"]],
    [ic.msg, "Engagement", ["Communications & WhatsApp inbox", "Student & parent portals, student app"]],
    [ic.cloud, "Platform", ["Multi-tenant SaaS console, plans & billing"]],
  ];
  const cw = (G.cw - 2 * G.gutter) / 3, rowH = [2.42, 1.62];
  groups.forEach(([icn, h, items], i) => {
    const r = Math.floor(i / 3), ch = rowH[r];
    const x = G.mx + (i % 3) * (cw + G.gutter), y = 1.72 + (r ? rowH[0] + 0.22 : 0);
    card(sl, x, y, cw, ch, T.white);
    iconChip(sl, icn, x + 0.25, y + 0.25, A, 0.5);
    sl.addText(h, { x: x + 0.9, y: y + 0.22, w: cw - 1.1, h: 0.3, margin: 0, fontSize: TYPE.h3, bold: true, color: T.ink, isTextBox: true });
    sl.addText(`${items.length} module${items.length > 1 ? "s" : ""}`, { x: x + 0.9, y: y + 0.5, w: 1.5, h: 0.24, margin: 0, fontSize: 10.5, bold: true, color: A, isTextBox: true });
    sl.addText(items.map((t, k) => ({ text: t, options: { bullet: { indent: 14 }, breakLine: k < items.length - 1 } })),
      { x: x + 0.25, y: y + 0.9, w: cw - 0.45, h: ch - 1.0, margin: 0, fontSize: 12.5, color: T.slate700, valign: "top", paraSpaceAfter: 2, isTextBox: true });
  });
  { const y = 1.72 + rowH[0] + 0.22 + rowH[1] + 0.22, h = 0.62;
    sl.addShape("roundRect", { x: G.mx, y, w: G.cw, h, rectRadius: 0.1, fill: { color: tint(A, 0.9) }, line: { type: "none" } });
    sl.addImage({ path: ic.db, x: G.mx + 0.25, y: y + 0.16, w: 0.3, h: 0.3 });
    sl.addText([{ text: "One data model.  ", options: { bold: true, color: T.ink } },
      { text: "Attendance feeds report cards, fee plans feed invoices, routes feed manifests, and every role sees the same live record.", options: { color: T.slate700 } }],
      { x: G.mx + 0.7, y, w: G.cw - 0.9, h, margin: 0, fontSize: 13, valign: "middle", isTextBox: true }); }
  sl.addNotes("The product map. Every module shares one student, staff and academic-year model: attendance feeds report cards, fee plans feed invoices, routes feed manifests.");

  // ---------- 4. ARCHITECTURE ----------
  sl = pres.addSlide({ masterName: "MT_CONTENT" });
  sl.addText("ARCHITECTURE", { placeholder: "kicker" });
  sl.addText("Database-per-school isolation, enforced on every request", { placeholder: "title" });
  const colLabel = (t, x, w) => sl.addText(t.toUpperCase(), { x, y: 1.7, w, h: 0.25, margin: 0, fontSize: 10, bold: true, charSpacing: 2, color: T.slate500, isTextBox: true });
  const box = (x, y, w, h, head, sub, o = {}) => {
    sl.addShape("roundRect", { x, y, w, h, rectRadius: 0.08, fill: { color: o.fill || T.white }, line: { color: o.line || T.line, width: o.lw || 0.75 } });
    sl.addText([{ text: head, options: { bold: true, fontSize: 12.5, color: o.hc || T.ink, breakLine: !!sub } }].concat(sub ? [{ text: sub, options: { fontSize: 10.5, color: o.sc || T.slate500 } }] : []),
      { x: x + 0.15, y, w: w - 0.3, h, margin: 0, valign: "middle", isTextBox: true });
  };
  const arrow = (x1, y1, x2, y2) => sl.addShape("line", { x: x1, y: y1, w: x2 - x1, h: y2 - y1, line: { color: T.slate300, width: 1.25, endArrowType: "triangle" } });
  // clients
  colLabel("Clients", G.mx, 2.4);
  [["Web app", "Staff, parents, students"], ["Student mobile app", "Expo · iOS / Android"], ["Webhooks", "Razorpay · WhatsApp"]].forEach(([h, t], i) => box(G.mx, 2.05 + i * 1.05, 2.4, 0.82, h, t));
  // pipeline
  colLabel("Daphne ASGI · request pipeline", 3.45, 3.4);
  sl.addShape("roundRect", { x: 3.45, y: 2.05, w: 3.4, h: 3.92, rectRadius: 0.1, fill: { color: T.midnight }, line: { type: "none" } });
  ["Tenant database context", "Authentication + single session", "Tenant & subscription gate", "RBAC permission check", "Tenant database router"].forEach((t, i) => {
    const y = 2.27 + i * 0.73;
    sl.addShape("ellipse", { x: 3.68, y: y + 0.08, w: 0.36, h: 0.36, fill: { color: A }, line: { type: "none" } });
    sl.addText(String(i + 1), { x: 3.68, y: y + 0.08, w: 0.36, h: 0.36, margin: 0, fontSize: 11, bold: true, color: T.white, align: "center", valign: "middle", isTextBox: true });
    sl.addText(t, { x: 4.18, y, w: 2.55, h: 0.52, margin: 0, fontSize: 12.5, color: T.white, valign: "middle", isTextBox: true });
  });
  [2.46, 3.51, 4.56].forEach(y => arrow(3.0, y, 3.45, y));
  // data
  colLabel("Data", 7.3, 2.7);
  box(7.3, 2.05, 2.75, 0.95, "Control database", "Tenants · plans · billing", { line: T.amber, lw: 1.5 });
  box(7.3, 3.25, 2.75, 0.75, "tenant_greenwood", "Isolated MySQL database", { fill: tint(A, 0.92), line: tint(A, 0.6) });
  box(7.3, 4.15, 2.75, 0.75, "tenant_riverdale", "Isolated MySQL database", { fill: tint(A, 0.92), line: tint(A, 0.6) });
  box(7.3, 5.05, 2.75, 0.75, "One database per school", "Created, migrated and seeded on provisioning", { fill: tint(A, 0.92), line: tint(A, 0.6) });
  [2.52, 3.62, 4.52].forEach(y => arrow(6.85, y, 7.3, y));
  // integrations
  colLabel("Integrations", 10.5, 2.2);
  [["Razorpay", "Subscription billing"], ["Meta WhatsApp", "Inbox & templates"], ["Twilio", "SMS & OTP"], ["SMTP email", "Resets, welcomes"], ["ReportLab · Excel", "PDF & XLSX exports"]].forEach(([h, t], i) =>
    box(10.5, 2.05 + i * 0.79, 2.23, 0.66, h, t));
  sl.addText([{ text: "Two layers of isolation. ", options: { bold: true, color: T.ink } },
    { text: "Middleware selects each school's dedicated database on every request, and every business model also carries a tenant key.", options: { color: T.slate700 } }],
    { x: G.mx, y: 6.25, w: G.cw, h: 0.45, margin: 0, fontSize: 13, valign: "middle", isTextBox: true });
  sl.addNotes("Isolation works in two layers: a dedicated database per school, selected per request by middleware and a database router, plus tenant foreign keys on every business model.");

  // ---------- 5. INTERFACE SHOWCASE ----------
  sl = pres.addSlide({ masterName: "MT_CONTENT" });
  sl.addText("EXAMS & REPORT CARDS", { placeholder: "kicker" });
  sl.addText("Results day in hours, not weeks", { placeholder: "title" });
  frame(sl, s.marks, G.mx, 1.75, 7.2, 4.45, { url: "app.agastya · Marks entry", alt: "Agastya marks entry grid" });
  frame(sl, s.tracker, 8.1, 1.75, 4.63, 2.12, { url: "Marks entry progress", alt: "Marks completion tracker" });
  frame(sl, s.report, 8.1, 4.08, 4.63, 2.12, { url: "Report card · PDF", alt: "Branded report card PDF" });
  const callouts = [["1", "Grid entry, restricted to the teacher's own sections, with automatic grading"], ["2", "Completion tracker shows who still has marks to enter"], ["3", "Branded report cards with rank, remarks and signatures, published in one click"]];
  callouts.forEach(([n, t], i) => {
    const x = G.mx + i * 4.1;
    sl.addShape("ellipse", { x, y: 6.38, w: 0.34, h: 0.34, fill: { color: T.amber }, line: { type: "none" } });
    sl.addText(n, { x, y: 6.38, w: 0.34, h: 0.34, margin: 0, fontSize: 11, bold: true, color: T.midnight, align: "center", valign: "middle", isTextBox: true });
    sl.addText(t, { x: x + 0.45, y: 6.3, w: 3.5, h: 0.5, margin: 0, fontSize: 11.5, color: T.slate700, valign: "middle", isTextBox: true });
  });
  [[G.mx + 6.7, 3.3, "1"], [12.3, 2.15, "2"], [12.3, 4.48, "3"]].forEach(([x, y, n]) => {
    sl.addShape("ellipse", { x, y, w: 0.34, h: 0.34, fill: { color: T.amber }, line: { color: T.white, width: 1.5 } });
    sl.addText(n, { x, y, w: 0.34, h: 0.34, margin: 0, fontSize: 11, bold: true, color: T.midnight, align: "center", valign: "middle", isTextBox: true });
  });
  sl.addNotes("Live screens with demo data: marks entry grid, marks completion tracker and the printable report card. Every exam action is written to the audit log.");

  // ---------- 6. VALUE & DIFFERENTIATORS ----------
  sl = pres.addSlide({ masterName: "MT_DARK" });
  sl.addText("WHY AGASTYA", { placeholder: "kicker" });
  sl.addText("What changes when a school group moves to Agastya", { placeholder: "title" });
  const rows = [["Data", "Spreadsheets, registers and phones", "One data model, a dedicated database per school"],
    ["Visibility", "Reports compiled by hand, days late", "Live role cockpits for every leader"],
    ["Control", "Shared logins, no record of changes", "96 permissions, single sessions, full audit trail"],
    ["Parents", "Personal WhatsApp groups, paper circulars", "Portals, student app, school-owned WhatsApp inbox"],
    ["Growth", "Every new campus repeats the setup", "New school provisioned from the console"]];
  sl.addText("TODAY", { x: 2.05, y: 1.72, w: 2.6, h: 0.25, margin: 0, fontSize: 10, bold: true, charSpacing: 2, color: T.onDarkMuted, isTextBox: true });
  sl.addText("WITH AGASTYA", { x: 4.85, y: 1.72, w: 3.2, h: 0.25, margin: 0, fontSize: 10, bold: true, charSpacing: 2, color: T.amber, isTextBox: true });
  rows.forEach(([d, a, b], i) => {
    const y = 2.08 + i * 0.86;
    sl.addShape("line", { x: G.mx, y: y - 0.06, w: 7.55, h: 0, line: { color: "22365A", width: 0.75 } });
    sl.addText(d, { x: G.mx, y, w: 1.35, h: 0.7, margin: 0, fontSize: 13, bold: true, color: T.white, valign: "middle", isTextBox: true });
    sl.addText(a, { x: 2.05, y, w: 2.6, h: 0.7, margin: 0, fontSize: 12.5, color: T.onDarkMuted, valign: "middle", isTextBox: true });
    sl.addImage({ path: ic.checkAmber, x: 4.85, y: y + 0.24, w: 0.22, h: 0.22 });
    sl.addText(b, { x: 5.2, y, w: 2.95, h: 0.7, margin: 0, fontSize: 12.5, color: T.white, valign: "middle", isTextBox: true });
  });
  const diffs = [[ic.w_db, "Isolation by design", "Each school gets its own database, created and migrated automatically."],
    [ic.w_sliders, "Configurable without developers", "Dashboard builder, RBAC matrix, feature toggles and branding."],
    [ic.w_msg, "A school-owned parent channel", "Two-way WhatsApp inbox through the Meta Cloud API."],
    [ic.w_shield, "Audit-grade governance", "Before/after audit, login events, lockout and single sessions."]];
  diffs.forEach(([icn, h, b], i) => {
    const x = 8.75, y = 1.72 + i * 1.22, w = 3.98, hh = 1.06;
    sl.addShape("roundRect", { x, y, w, h: hh, rectRadius: 0.1, fill: { color: T.midnight2 }, line: { color: "22365A", width: 0.75 } });
    sl.addShape("roundRect", { x: x + 0.2, y: y + 0.22, w: 0.5, h: 0.5, rectRadius: 0.12, fill: { color: A }, line: { type: "none" } });
    sl.addImage({ path: icn, x: x + 0.32, y: y + 0.34, w: 0.26, h: 0.26 });
    sl.addText(h, { x: x + 0.88, y: y + 0.14, w: w - 1.05, h: 0.32, margin: 0, fontSize: 13, bold: true, color: T.white, isTextBox: true });
    sl.addText(b, { x: x + 0.88, y: y + 0.45, w: w - 1.05, h: 0.52, margin: 0, fontSize: 11, color: T.onDarkMuted, valign: "top", isTextBox: true });
  });
  sl.addNotes("The before/after story in five lines, plus the four differentiators. Every claim maps to a capability shown earlier; no quantified ROI is claimed.");

  await pres.writeFile({ fileName: OUT });
  console.log("written", OUT);
})();
