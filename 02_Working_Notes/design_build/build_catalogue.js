// MavionTech_Corporate_Product_Catalogue_Final.pptx — corporate narrative on the approved design system.
// Facts: maviontech.com (Company, Platform, Contact pages, inspected 10 Nov 2026), Portfolio_Positioning_Strategy.docx,
// and the six approved product decks. No invented customers, metrics, certifications, market sizes or revenue.
const fs = require("fs");
const path = require("path");
const pptxgen = require("pptxgenjs");
const L = require("react-icons/lu");
const M = require("./mt");
const { makeKit } = require("./deckkit");
const { T, G, tint, frame, card } = M;

const OUTDIR = M.ROOT + "/Corporate_Catalogue";
const OUT = process.env.OUT || (OUTDIR + "/MavionTech_Corporate_Product_Catalogue_Final.pptx");
fs.mkdirSync(OUTDIR, { recursive: true });
const LOGO = "D:/MavionTech_sales/branding/maviontech-logo.png";
const AG = "D:/MavionTech_sales/Agastya_screenshots/", PD = "D:/MavionTech_sales/screenshots/", WN = M.ROOT + "/02_Working_Notes/";
const FOOT = "MavionTech  ·  Corporate Product Catalogue 2026";
const ORDER = ["agastya", "pragyannxt", "vortex", "protonnxt", "mavionlearn", "salespulse"];
const MARK = { agastya: M.ASSETS + "/agastya_mark.png", mavionlearn: M.ASSETS + "/mavionlearn_mark.png", pragyannxt: "D:/MavionTech_sales/branding/pragyannxt-mark.png",
  protonnxt: WN + "pr_media/P01_image1.png", salespulse: M.ASSETS + "/salespulse_mark.png", vortex: M.ASSETS + "/vortex_mark.png" };
const NAME = k => M.PRODUCTS[k].name, ACC = k => M.PRODUCTS[k].accent;
const LIGHT = k => (k === "pragyannxt" ? "6F8FE0" : ACC(k)); // accent legible on dark

const ICONS = { db: "LuDatabase", sliders: "LuSlidersHorizontal", msg: "LuMessagesSquare", history: "LuHistory", sparkle: "LuSparkles", users: "LuUsers",
  radar: "LuRadar", globe: "LuGlobe", eyeoff: "LuEyeOff", ban: "LuBan", chart: "LuChartColumn", gst: "LuReceiptIndianRupee", target: "LuTarget",
  shield: "LuShieldCheck", key: "LuKeyRound", layers: "LuLayers", award: "LuAward", scan: "LuScanFace", workflow: "LuWorkflow", wallet: "LuWallet",
  phone: "LuSmartphone", cloud: "LuCloud", server: "LuServer", lock: "LuLock", check: "LuCheck", rocket: "LuRocket", building: "LuBuilding2",
  school: "LuSchool", grad: "LuGraduationCap", briefcase: "LuBriefcase", hand: "LuHandshake", trend: "LuTrendingUp", puzzle: "LuPuzzle", code: "LuCode",
  link: "LuLink", plug: "LuPlug", eye: "LuEye", file: "LuFileText", clock: "LuClock", flag: "LuFlag", compass: "LuCompass", mail: "LuMail",
  calendar: "LuCalendarDays", cpu: "LuCpu", badge: "LuBadgeCheck", fingerprint: "LuFingerprint", repeat: "LuRepeat", gauge: "LuGauge",
  sheet: "LuFileSpreadsheet", receipt: "LuReceipt", store: "LuStore", landmark: "LuLandmark", life: "LuLifeBuoy", wrench: "LuWrench", search: "LuSearch",
  split: "LuSplit", network: "LuNetwork", box: "LuBox", home: "LuHouse", pen: "LuPenLine", video: "LuVideo", map: "LuMapPin", zap: "LuZap", dash: "LuLayoutDashboard", book: "LuBookOpen" };

(async () => {
  const pres = new pptxgen(); pres.layout = "LAYOUT_WIDE";
  pres.author = "MavionTech Pvt. Ltd."; pres.company = "MavionTech Pvt. Ltd.";
  pres.title = "MavionTech — Corporate Product Catalogue 2026"; pres.subject = "MavionTech product ecosystem";
  pres.theme = { headFontFace: M.FONT.head, bodyFontFace: M.FONT.body };

  // ---------- LAYOUTS ----------
  const bgCover = await M.darkBg(T.amber, "bg_cover_corporate.png", "cover");
  const bgDiv = await M.darkBg(T.amber, "bg_divider_corporate.png", "divider");
  const ph = (name, type, o, text) => ({ placeholder: { options: Object.assign({ name, type, margin: 0, align: "left", fontFace: M.FONT.head }, o), text } });
  const lockup = [{ image: { path: LOGO, x: G.mx, y: 0.5, w: 0.42, h: 0.42 } },
    { text: { text: "MavionTech", options: { x: G.mx + 0.55, y: 0.5, w: 3, h: 0.24, margin: 0, fontSize: 13, bold: true, color: T.white } } },
    { text: { text: "Momentum with Vision", options: { x: G.mx + 0.55, y: 0.74, w: 3, h: 0.2, margin: 0, fontSize: 9.5, color: T.onDarkMuted } } }];
  const footDark = (t) => [{ text: { text: t, options: { x: G.mx, y: G.footerY, w: 7, h: 0.25, margin: 0, fontSize: 9, color: T.onDarkMuted } } }];
  const brandRight = (c) => [{ image: { path: LOGO, x: G.W - G.mx - 1.55, y: G.footerY + 0.02, w: 0.21, h: 0.21 } },
    { text: { text: "MavionTech", options: { x: G.W - G.mx - 1.3, y: G.footerY, w: 0.95, h: 0.25, margin: 0, fontSize: 9, bold: true, color: c } } }];
  const num = (c) => ({ x: G.W - G.mx - 0.35, y: G.footerY, w: 0.35, h: 0.25, fontSize: 9, color: c, align: "right", margin: 0 });
  const heads = (c) => [ph("kicker", "body", { x: G.mx, y: 0.5, w: 8, h: 0.3, fontSize: 11, bold: true, charSpacing: 3, color: c === T.white ? T.amber : T.amberDeep, valign: "top" }, "SECTION KICKER"),
    ph("title", "title", { x: G.mx, y: G.titleY, w: 11.6, h: 0.62, fontSize: 30, bold: true, color: c, valign: "top" }, "Slide title")];
  pres.defineSlideMaster({ title: "CAT_COVER", background: { path: bgCover }, objects: lockup.concat(footDark("MavionTech Pvt. Ltd.  ·  Pune, India  ·  www.maviontech.com"),
    [ph("title", "title", { x: G.mx, y: 2.4, w: 6.5, h: 1.8, fontSize: 40, bold: true, color: T.white, valign: "top" }, "Catalogue title"),
     ph("body", "body", { x: G.mx, y: 4.05, w: 6.0, h: 0.95, fontSize: 17, color: T.onDarkMuted, valign: "top" }, "Subtitle")]) });
  pres.defineSlideMaster({ title: "CAT_CLOSE", background: { path: bgCover }, objects: lockup.concat(footDark("MavionTech Pvt. Ltd.  ·  Pune, India  ·  www.maviontech.com"),
    [ph("title", "title", { x: G.mx, y: 2.3, w: 6.6, h: 1.6, fontSize: 34, bold: true, color: T.white, valign: "top" }, "Closing statement"),
     ph("body", "body", { x: G.mx, y: 3.95, w: 6.2, h: 0.95, fontSize: 16, color: T.onDarkMuted, valign: "top" }, "Next step")]) });
  pres.defineSlideMaster({ title: "CAT_DIVIDER", background: { path: bgDiv }, objects: footDark(FOOT).concat(
    [ph("title", "title", { x: G.mx, y: 3.0, w: 6.9, h: 1.0, fontSize: 40, bold: true, color: T.white, valign: "top" }, "Section title"),
     ph("body", "body", { x: G.mx, y: 4.15, w: 6.4, h: 1.0, fontSize: 16, color: T.onDarkMuted, valign: "top" }, "Section summary")]), slideNumber: num(T.onDarkMuted) });
  const lightFoot = [{ text: { text: FOOT, options: { x: G.mx, y: G.footerY, w: 7, h: 0.25, margin: 0, fontSize: 9, color: T.slate500 } } }].concat(brandRight(T.ink));
  pres.defineSlideMaster({ title: "CAT_CONTENT", background: { color: T.white }, objects: lightFoot.concat(heads(T.ink)), slideNumber: num(T.slate500) });
  pres.defineSlideMaster({ title: "CAT_TINT", background: { color: T.paper }, objects: lightFoot.concat(heads(T.ink)), slideNumber: num(T.slate500) });
  pres.defineSlideMaster({ title: "CAT_DARK", background: { color: T.midnight }, objects: footDark(FOOT).concat(brandRight(T.white), heads(T.white)), slideNumber: num(T.onDarkMuted) });
  for (const k of ORDER) {
    const bg = await M.darkBg(ACC(k), `bg_cover_${k}.png`, "cover");
    pres.defineSlideMaster({ title: "PROD_" + k, background: { path: bg }, objects: footDark(`${NAME(k)}  ·  ${M.PRODUCTS[k].category}`).concat(brandRight(T.white),
      [ph("title", "title", { x: G.mx, y: 1.95, w: 5.8, h: 0.8, fontSize: 44, bold: true, color: T.white, valign: "top" }, "Product"),
       ph("body", "body", { x: G.mx, y: 3.12, w: 5.7, h: 0.85, fontSize: 19, color: T.white, valign: "top" }, "Promise")]), slideNumber: num(T.onDarkMuted) });
  }

  // compact copies of the product marks (some sources are large PNGs; each use embeds a copy)
  for (const k of ORDER) { const out = path.join(M.ASSETS, `cat_mark_${k}.png`);
    await require("sharp")(MARK[k]).resize({ width: 192, height: 192, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(out); MARK[k] = out; }
  // ---------- KITS ----------
  const KIT = {}; for (const k of ORDER) KIT[k] = await makeKit(pres, k, "cat_" + k.slice(0, 3), ICONS);
  const CI = {}, CW = {}; // corporate icons (amber deep on light, white on dark)
  for (const [k, n] of Object.entries(ICONS)) { CI[k] = await M.icon(L[n], T.amberDeep, `catc_${k}.png`); CW[k] = await M.icon(L[n], "FFFFFF", `catcw_${k}.png`); }
  const CA = await M.icon(L.LuCheck, T.amber, "ic_check_amber.png");
  const CK = await M.icon(L.LuCheck, T.success, "catc_ok.png");
  const txt = (sl, t, x, y, w, h, o = {}) => sl.addText(t, Object.assign({ x, y, w, h, margin: 0, fontSize: 14, color: T.slate700, valign: "top", isTextBox: true, fontFace: M.FONT.body }, o));
  const chip = (sl, ic, x, y, s = 0.52, fill = tint(T.amber, 0.82)) => { sl.addShape("roundRect", { x, y, w: s, h: s, rectRadius: 0.12, fill: { color: fill }, line: { type: "none" } });
    const p = s * 0.24; sl.addImage({ path: ic, x: x + p, y: y + p, w: s - 2 * p, h: s - 2 * p }); };
  const rr = (sl, x, y, w, h, fill, line, r = 0.1) => sl.addShape("roundRect", { x, y, w, h, rectRadius: r, fill: { color: fill }, line: line ? { color: line, width: 0.75 } : { type: "none" } });
  const pill = (sl, t, x, y, w, fill, color, h = 0.36, fs = 11) => { rr(sl, x, y, w, h, fill, null, h / 2); txt(sl, t, x, y, w, h, { fontSize: fs, bold: true, color, align: "center", valign: "middle" }); };
  const label = (sl, t, x, y, w, c = T.slate500) => txt(sl, t.toUpperCase(), x, y, w, 0.25, { fontSize: 10, bold: true, charSpacing: 2, color: c });
  const dot = (sl, x, y, c, s = 0.13) => sl.addShape("ellipse", { x, y, w: s, h: s, fill: { color: c }, line: { type: "none" } });
  const hline = (sl, x, y, w, c = T.line) => sl.addShape("line", { x, y, w, h: 0, line: { color: c, width: 0.75 } });
  let SEC = "";
  const sec = t => { SEC = t; pres.addSection({ title: t }); };
  const add = (m = "CAT_CONTENT") => pres.addSlide({ masterName: m, sectionTitle: SEC });
  const head = (sl, k, t) => { sl.addText(k.toUpperCase(), { placeholder: "kicker" }); sl.addText(t, { placeholder: "title" }); };
  const prodTag = (sl, k, dark = false) => { const w = 0.42 + NAME(k).length * 0.105; const x = G.W - G.mx - w;
    sl.addImage({ path: MARK[k], x, y: 0.47, w: 0.3, h: 0.3 }); txt(sl, NAME(k), x + 0.4, 0.47, w - 0.4, 0.3, { fontSize: 12.5, bold: true, color: dark ? T.white : T.ink, valign: "middle" }); };
  const shotOf = async (k, img, w, h) => KIT[k].S(img, w, h);

  // ---------- SCREEN SOURCES ----------
  const SCR = {
    agastya: { dash: { src: AG + "a01_dashboard.png" }, admit: { src: AG + "a05_admit.png" }, tt: { src: AG + "a07_tt_dashboard.png" }, coll: { src: AG + "a20_collections.png" },
      tenants: { src: AG + "x01_tenants.png" }, audit: { src: AG + "a44_audit.png" }, wa: { src: AG + "a34_whatsapp.png" } },
    protonnxt: { dash: { src: WN + "pr_media/P07_image3.png" }, status: { src: WN + "pr_media/P16_image12.png", crop: [521, 0] }, exec: { src: WN + "pr_media/P21_image16.png", crop: [521, 0] },
      leader: { src: WN + "pr_media/P27_image19.png", crop: [521, 0] } },
    salespulse: { dash: { src: WN + "sp_media/S04_image1.jpg" }, myday: { src: WN + "sp_media/S06_image2.jpg" }, incall: { src: WN + "sp_media/S08_image-8-1.jpg" },
      command: { src: WN + "sp_media/S16_image8.jpg" } },
    mavionlearn: { dash: { src: WN + "ml_media/I01_image-1-3.png" }, matrix: { src: WN + "ml_media/S06_image16.jpg" }, camp: { src: WN + "ml_media/I09_image-9-1.png" },
      reports: { src: WN + "ml_media/I11_image-11-4.png" } },
    pragyannxt: { dash: { src: PD + "04-admin-dashboard.jpg", crop: [0, 70] }, qbank: { src: PD + "05-question-bank.jpg" }, exams: { src: PD + "07-assessments.jpg" } },
    vortex: { tiles: { src: WN + "vx_media/vx_tiles.png" } },
  };

  // ================= SECTION 1 — CORPORATE INTRODUCTION =================
  sec("Corporate introduction");
  // 1 COVER
  let sl = add("CAT_COVER");
  txt(sl, "CORPORATE PRODUCT CATALOGUE  ·  2026", G.mx, 1.95, 6.5, 0.3, { fontSize: 11, bold: true, charSpacing: 4, color: T.amber });
  sl.addText("Six platforms. One standard of engineering.", { placeholder: "title" });
  sl.addText("Enterprise business applications for education, people, talent and revenue teams.", { placeholder: "body" });
  ORDER.forEach((k, i) => { const x = G.mx + (i % 3) * 2.05, y = 5.55 + Math.floor(i / 3) * 0.48;
    sl.addImage({ path: MARK[k], x, y, w: 0.3, h: 0.3 }); txt(sl, NAME(k), x + 0.4, y, 1.6, 0.3, { fontSize: 12.5, bold: true, color: T.white, valign: "middle" }); });
  frame(sl, await shotOf("agastya", SCR.agastya.dash, 5.4, 3.4), 7.35, 1.15, 5.4, 3.4, { dark: true, url: "Agastya · Cloud School ERP", alt: "Agastya dashboard" });
  frame(sl, await shotOf("salespulse", SCR.salespulse.dash, 4.1, 2.6), 6.6, 3.85, 4.1, 2.6, { dark: true, url: "SalesPulse CRM", alt: "SalesPulse director dashboard" });
  frame(sl, await shotOf("mavionlearn", SCR.mavionlearn.dash, 3.1, 2.05), 9.75, 4.95, 3.1, 2.05, { dark: true, alt: "MavionLearn learning admin" });
  sl.addNotes("Corporate cover. Product screens shown are real product captures with demo data. Tagline 'Momentum with Vision' and descriptor 'Enterprise Business Applications' are from maviontech.com.");

  // 2 CATALOGUE BRIEF — every product, logo and short description, with the page where its showcase starts
  const briefSl = add("CAT_TINT"); head(briefSl, "Catalogue brief", "Six platforms in this catalogue, at a glance");
  const BRIEF = {
    agastya: "Multi-tenant cloud ERP that runs admissions, academics, fees, transport and parent communication for every school in a group.",
    pragyannxt: "Author, deliver, proctor, score and certify assessments, with an integrity score and a verifiable credential for every result.",
    vortex: "People platform for HR, Face-AI attendance, leave, policy-driven payroll and employee self-service, on one record.",
    protonnxt: "AI-assisted applicant tracking for recruitment firms and talent teams, from requisition and sourcing to offer and joining.",
    mavionlearn: "Enterprise LMS that scores skills against role targets, runs compliance on its own and reports in your brand.",
    salespulse: "India-first sales CRM with privacy-masked calling, a live pipeline, GST billing and reports that build themselves." };
  const DOMAIN = { agastya: "Education", pragyannxt: "Education", vortex: "People & Talent", protonnxt: "People & Talent", mavionlearn: "People & Talent", salespulse: "Revenue" };
  const briefPos = {};
  ORDER.forEach((k, i) => { const x = G.mx + (i % 2) * 6.17, y = 1.75 + Math.floor(i / 2) * 1.62, w = 5.97, h = 1.45;
    card(briefSl, x, y, w, h, T.white); briefSl.addImage({ path: MARK[k], x: x + 0.25, y: y + 0.27, w: 0.72, h: 0.72 });
    txt(briefSl, NAME(k), x + 1.2, y + 0.16, 3.2, 0.34, { fontSize: 17, bold: true, color: T.ink });
    txt(briefSl, `${M.PRODUCTS[k].category}  ·  ${DOMAIN[k]}`, x + 1.2, y + 0.5, w - 1.45, 0.26, { fontSize: 10.5, bold: true, color: ACC(k) });
    txt(briefSl, BRIEF[k], x + 1.2, y + 0.8, w - 1.45, 0.58, { fontSize: 11.5 });
    briefPos[k] = [x + w - 1.35, y + 0.17]; });
  briefSl.addNotes("Catalogue brief: the six flagship products with their marks and one-line descriptions drawn from the approved decks. Page references point to each product's showcase opener.");

  // 3 ABOUT
  sl = add("CAT_CONTENT"); head(sl, "About MavionTech", "An Indian product company for enterprise applications");
  const facts = [["Company", "MavionTech Private Limited"], ["Headquarters", "Wakad, Pune, Maharashtra, India"], ["What we build", "Enterprise business applications"],
    ["Brand promise", "Momentum with Vision"], ["Portfolio", "Six flagship platforms in this catalogue, plus further products on maviontech.com"]];
  facts.forEach(([a, b], i) => { const y = 1.85 + i * 0.78; hline(sl, G.mx, y, 5.6);
    label(sl, a, G.mx, y + 0.14, 1.9); txt(sl, b, G.mx + 1.95, y + 0.1, 3.65, 0.62, { fontSize: 14, color: T.ink, bold: i < 2 }); });
  hline(sl, G.mx, 1.85 + 5 * 0.78, 5.6);
  label(sl, "Our journey", 7.0, 1.85, 4);
  const jr = [["2023", "Training foundation", "Began as a training initiative under Sukrit EnVision Academy."], ["2024", "Shift to product development", "The team moved from training to building software products."],
    ["2025", "Independent product company", "Launched as MavionTech, an independent product company."], ["Today", "Six enterprise platforms", "Education, people, talent and revenue products, each shown in this catalogue with real screens."]];
  sl.addShape("line", { x: 7.32, y: 2.45, w: 0, h: 3.45, line: { color: T.slate300, width: 1.25 } });
  jr.forEach(([yr, h, b], i) => { const y = 2.3 + i * 1.12;
    sl.addShape("ellipse", { x: 7.17, y: y + 0.06, w: 0.3, h: 0.3, fill: { color: i === 3 ? T.amber : T.white }, line: { color: i === 3 ? T.amber : T.slate300, width: 1.5 } });
    txt(sl, yr, 7.7, y, 1.0, 0.4, { fontSize: 18, bold: true, color: i === 3 ? T.amberDeep : T.ink });
    txt(sl, h, 8.75, y + 0.02, 4.0, 0.3, { fontSize: 14, bold: true, color: T.ink }); txt(sl, b, 8.75, y + 0.34, 4.0, 0.62, { fontSize: 12 }); });
  sl.addNotes("All facts from maviontech.com (footer, About and Company pages, inspected 10 Nov 2026). Milestones are the company's own published timeline. No employee, customer or revenue figures are stated because none are evidenced.");

  // 3 COMPANY INTRODUCTION
  sl = add("CAT_TINT"); head(sl, "Company introduction", "We build the systems that run an organisation's daily operations");
  rr(sl, G.mx, 1.8, 5.55, 4.85, T.midnight, null, 0.12);
  txt(sl, "“", G.mx + 0.35, 1.85, 1, 1.05, { fontSize: 60, bold: true, color: T.amber });
  txt(sl, "MavionTech builds enterprise business applications where every customer's data lives in its own database, and every operation is role-governed, audited and configurable without code.",
    G.mx + 0.4, 2.65, 4.8, 2.6, { fontSize: 20, color: T.white, bold: true });
  txt(sl, "Each part of this statement is demonstrated by at least five of our six products.", G.mx + 0.4, 5.55, 4.8, 0.7, { fontSize: 12, color: T.onDarkMuted });
  [["layers", "What we build", "Complete operating platforms for schools, HR and payroll, recruitment, learning, assessment and sales: not point tools."],
   ["workflow", "How we build", "Workflow-first and multi-tenant. Production-grade UX, predictable performance and maintainable integrations, as our promise states."],
   ["users", "Who we build for", "Staffing and HR, IT companies, EdTech, consulting firms, finance and service providers, and MSMEs."]].forEach(([ic, h, b], i) => {
    const y = 1.8 + i * 1.65; card(sl, 6.45, y, 6.28, 1.45, T.white); chip(sl, CI[ic], 6.72, y + 0.3);
    txt(sl, h, 7.5, y + 0.25, 5.0, 0.32, { fontSize: 16, bold: true, color: T.ink }); txt(sl, b, 7.5, y + 0.6, 5.0, 0.75, { fontSize: 12.5 }); });
  sl.addNotes("The corporate line is from the Portfolio Positioning Strategy (section 5) and is evidenced across the six product decks. Verticals are from the maviontech.com home page. The promise wording is from the Company page.");

  // 4 VISION, MISSION, PROMISE
  sl = add("CAT_DARK"); head(sl, "Vision and mission", "Where we are going, and how we get there");
  [["compass", "Vision", "Create intelligent digital ecosystems that help teams move faster, make better decisions, and transform the way organizations operate."],
   ["target", "Mission", "Automate and simplify operational workflows with secure, extensible enterprise software that empowers teams to focus on what matters most."],
   ["badge", "Promise", "Production-grade UX, predictable performance, and maintainable integrations — built for real teams solving real problems."]].forEach(([ic, h, b], i) => {
    const x = G.mx + i * 4.11, w = 3.81; rr(sl, x, 1.85, w, 4.35, T.midnight2, "22365A", 0.12);
    chip(sl, CW[ic], x + 0.35, 2.2, 0.6, "22365A");
    txt(sl, h.toUpperCase(), x + 0.35, 3.05, w - 0.7, 0.3, { fontSize: 12, bold: true, charSpacing: 3, color: T.amber });
    txt(sl, b, x + 0.35, 3.45, w - 0.7, 2.5, { fontSize: 17, color: T.white }); });
  txt(sl, "Source: maviontech.com, Company page. Quoted as published.", G.mx, 6.4, 8, 0.3, { fontSize: 11, color: T.onDarkMuted });
  sl.addNotes("Vision, mission and promise are quoted verbatim from the maviontech.com Company page (verified 10 Nov 2026). The older company PDF uses different wording; the website version is the current official statement.");

  // 5 TECHNOLOGY FOCUS
  sl = add("CAT_CONTENT"); head(sl, "Technology focus", "Six engineering principles, proven across the portfolio");
  const PRIN = [["db", "Database per customer", "Every product isolates each customer in its own database, not a shared table with a filter.", [1, 1, 1, 1, 1, 1]],
    ["shield", "Role-governed and audited", "Role-based access and audit trails across sensitive actions, in every product.", [1, 1, 1, 1, 1, 1]],
    ["sliders", "Configurable without code", "Dashboards, fields, workflows, toggles and branding are set by administrators.", [1, 1, 1, 1, 1, 1]],
    ["landmark", "India-first commercial fit", "INR, GST, statutory payroll, CTC structures and local payment rails.", [1, 1, 1, 1, 1, 1]],
    ["phone", "Mobile where work happens", "Student, recruiter, sales and employee apps for people away from a desk.", [1, 0, 1, 1, 0, 1]],
    ["sparkle", "AI where it helps", "Question generation, résumé parsing, visual proctoring and face recognition.", [0, 1, 1, 1, 0, 0]]];
  PRIN.forEach(([ic, h, b, has], i) => { const x = G.mx + (i % 3) * 4.11, y = 1.8 + Math.floor(i / 3) * 2.45, w = 3.81;
    card(sl, x, y, w, 2.2, T.paper); chip(sl, CI[ic], x + 0.3, y + 0.3);
    txt(sl, h, x + 0.3, y + 0.95, w - 0.6, 0.32, { fontSize: 15, bold: true, color: T.ink }); txt(sl, b, x + 0.3, y + 1.28, w - 0.6, 0.6, { fontSize: 12 });
    ORDER.forEach((k, j) => dot(sl, x + w - 0.3 - (5 - j) * 0.2, y + 0.5, has[j] ? ACC(k) : T.line, 0.14)); });
  txt(sl, [{ text: "Dots show which products demonstrate each principle, in order: ", options: {} }].concat(ORDER.map((k, j) => ({ text: NAME(k) + (j < 5 ? " · " : "."), options: { color: ACC(k), bold: true } }))),
    G.mx, 6.62, G.cw, 0.3, { fontSize: 11, color: T.slate500 });
  sl.addNotes("Evidence: Portfolio Positioning Strategy section 5 and the six approved product decks. Mobile: Agastya student app, Vortex VortexGo and SnapLens, ProtonNxt recruiter app, SalesPulse Android app. AI: PragyanNxt generation, summaries and visual proctoring; ProtonNxt OpenAI/Gemini parsing; Vortex InsightFace attendance.");

  // 6 BUSINESS PROBLEMS
  sl = add("CAT_TINT"); head(sl, "Business problems we address", "The operational problems customers bring to us");
  const PROB = [["Operations run on registers, spreadsheets and chat groups", "Nothing reconciles and every report is assembled by hand.", ["agastya", "vortex"]],
    ["Customer and candidate data walks out with staff", "Raw numbers and CVs sit in personal phones and inboxes.", ["salespulse", "protonnxt"]],
    ["Training that cannot prove capability", "Completions are counted; skills and compliance are guessed.", ["mavionlearn"]],
    ["Assessments and certificates that can be disputed", "Unsupervised exams and forgeable PDFs undermine trust.", ["pragyannxt"]],
    ["Manual reconciliation between operations and finance", "Attendance to payroll, fees to invoices, every cycle.", ["vortex", "agastya"]],
    ["Leaders waiting days for the numbers", "Visibility arrives after the decision was needed.", ["agastya", "salespulse", "mavionlearn"]]];
  label(sl, "The problem", G.mx, 1.72, 4); label(sl, "Where it shows up", G.mx + 6.2, 1.72, 3); label(sl, "Answered by", 9.6, 1.72, 3);
  PROB.forEach(([h, b, ps], i) => { const y = 2.05 + i * 0.77; rr(sl, G.mx, y, G.cw, 0.66, T.white, T.line, 0.08);
    txt(sl, h, G.mx + 0.25, y, 5.85, 0.66, { fontSize: 13.5, bold: true, color: T.ink, valign: "middle" });
    txt(sl, b, G.mx + 6.2, y, 2.75, 0.66, { fontSize: 11.5, valign: "middle" });
    let x = 9.45; ps.forEach(k => { const w = 0.25 + NAME(k).length * 0.068; pill(sl, NAME(k), x, y + 0.17, w, tint(ACC(k), 0.88), k === "pragyannxt" ? ACC(k) : M.mix(ACC(k), "000000", 0.15), 0.32, 9.5); x += w + 0.08; }); });
  sl.addNotes("Problems are taken from the problem slides of the six approved product decks. No market statistics are used; the company PDF figures (for example $1.8T, 73%) are uncited and excluded under the claims policy.");

  // ================= SECTION 2 — PRODUCT ECOSYSTEM =================
  sec("Product ecosystem");
  const divider = (n, t, b, items, notes) => { const s = add("CAT_DIVIDER");
    txt(s, String(n).padStart(2, "0"), G.mx, 1.25, 3, 1.65, { fontSize: 96, bold: true, color: T.amber });
    s.addText(t, { placeholder: "title" }); s.addText(b, { placeholder: "body" });
    label(s, "In this section", 8.6, 2.2, 4, T.onDarkMuted);
    items.forEach((it, i) => { const y = 2.6 + i * 0.52; hline(s, 8.6, y, 4.13, "2E4468");
      if (typeof it === "object") { s.addImage({ path: MARK[it.k], x: 8.6, y: y + 0.12, w: 0.28, h: 0.28 }); txt(s, it.t, 9.0, y + 0.06, 3.7, 0.4, { fontSize: 15, color: T.white, valign: "middle" }); }
      else txt(s, it, 8.6, y + 0.06, 4.1, 0.4, { fontSize: 15, color: T.white, valign: "middle" }); });
    s.addNotes(notes); return s; };
  divider(2, "The product ecosystem", "Six platforms across three buyer domains, sharing one engineering foundation.",
    ["Portfolio overview", "Ecosystem map", "Product categories", "Technology capabilities", "Industries and segments"], "Section 2 opens the portfolio view before the product showcases.");

  // 8 PORTFOLIO OVERVIEW
  const P = {
    agastya: { promise: "One operating system for every school in your group", fit: "K-12 school groups and single schools" },
    pragyannxt: { promise: "Results you can defend. Credentials anyone can verify.", fit: "Hiring teams and academic institutions" },
    vortex: { promise: "Hire to retire. Attendance to payroll. On one record.", fit: "HR, payroll and field workforces" },
    protonnxt: { promise: "From requisition to hire, in one structured pipeline", fit: "Recruitment firms and talent teams" },
    mavionlearn: { promise: "Skills that compound: training that becomes provable capability", fit: "L&D, HR and compliance leaders" },
    salespulse: { promise: "Your reps sell. Your customers' numbers stay yours.", fit: "Indian sales organisations" } };
  sl = add("CAT_CONTENT"); head(sl, "Portfolio overview", "Six platforms, each a complete system for one part of the business");
  ORDER.forEach((k, i) => { const x = G.mx + (i % 3) * 4.11, y = 1.8 + Math.floor(i / 3) * 2.5, w = 3.81, h = 2.3;
    card(sl, x, y, w, h, T.paper); sl.addImage({ path: MARK[k], x: x + 0.3, y: y + 0.3, w: 0.5, h: 0.5 });
    txt(sl, NAME(k), x + 0.95, y + 0.27, w - 1.2, 0.32, { fontSize: 17, bold: true, color: T.ink });
    txt(sl, M.PRODUCTS[k].category, x + 0.95, y + 0.58, w - 1.2, 0.28, { fontSize: 11, bold: true, color: ACC(k) });
    txt(sl, P[k].promise, x + 0.3, y + 1.0, w - 0.6, 0.62, { fontSize: 13.5, color: T.ink });
    hline(sl, x + 0.3, y + 1.7, w - 0.6); txt(sl, "Best for  ", x + 0.3, y + 1.8, 0.9, 0.3, { fontSize: 11, bold: true, color: T.slate500 });
    txt(sl, P[k].fit, x + 1.05, y + 1.8, w - 1.35, 0.3, { fontSize: 11, color: T.slate700 }); });
  sl.addNotes("Promises are the approved cover lines of each product deck. Order follows the buyer domains: Education (Agastya, PragyanNxt), People & Talent (Vortex HRMS, ProtonNxt, MavionLearn), Revenue (SalesPulse CRM).");

  // 9 ECOSYSTEM DIAGRAM
  sl = add("CAT_TINT"); head(sl, "Ecosystem map", "Three buyer domains on one shared foundation");
  const DOM = [["Education", "grad", ["agastya", "pragyannxt"], G.mx, 3.2], ["People & Talent", "users", ["vortex", "protonnxt", "mavionlearn"], 4.06, 5.25], ["Revenue", "trend", ["salespulse"], 9.56, 3.17]];
  const pos = {};
  DOM.forEach(([h, ic, ks, x, w]) => { rr(sl, x, 1.8, w, 3.05, T.white, T.line, 0.12); chip(sl, CI[ic], x + 0.25, 1.98, 0.42);
    txt(sl, h, x + 0.8, 1.98, w - 1, 0.42, { fontSize: 15, bold: true, color: T.ink, valign: "middle" });
    const bw = ks.length === 1 ? w - 0.5 : (w - 0.5 - (ks.length - 1) * 0.2) / ks.length;
    ks.forEach((k, j) => { const bx = x + 0.25 + j * (bw + 0.2), by = 2.65; rr(sl, bx, by, bw, 1.95, tint(ACC(k), 0.92), tint(ACC(k), 0.6), 0.1);
      sl.addImage({ path: MARK[k], x: bx + bw / 2 - 0.25, y: by + 0.25, w: 0.5, h: 0.5 });
      txt(sl, NAME(k), bx + 0.1, by + 0.85, bw - 0.2, 0.3, { fontSize: 14, bold: true, color: T.ink, align: "center" });
      txt(sl, M.PRODUCTS[k].category, bx + 0.1, by + 1.17, bw - 0.2, 0.6, { fontSize: 10.5, color: T.slate700, align: "center" });
      pos[k] = [bx + bw / 2, by + 1.95]; }); });
  // shared foundation
  rr(sl, G.mx, 5.55, G.cw, 1.15, T.midnight, null, 0.12);
  txt(sl, "SHARED MAVIONTECH FOUNDATION", G.mx + 0.3, 5.65, 4, 0.28, { fontSize: 10, bold: true, charSpacing: 2, color: T.amber });
  ["Database per customer", "Role-based access & audit", "No-code configuration", "INR, GST & Razorpay", "Platform consoles", "Mobile & APIs"].forEach((t, i) => {
    pill(sl, t, G.mx + 0.3 + i * 1.98, 6.03, 1.85, T.midnight2, T.white, 0.42, 10.5); });
  txt(sl, "Natural pairings (positioning, not built integrations):  PragyanNxt + ProtonNxt for screening in hiring  ·  PragyanNxt + MavionLearn for verifiable certification  ·  MavionLearn as the upgrade from Vortex Learning",
    G.mx, 4.97, G.cw, 0.45, { fontSize: 11, color: T.slate500, valign: "middle" });
  sl.addNotes("Domains and pairings from the Portfolio Positioning Strategy, sections 6 and 10. The pairings are cross-sell positioning only; no product-to-product integration is claimed.");

  // 10 CATEGORISATION
  sl = add("CAT_CONTENT"); head(sl, "Product categories", "How the portfolio is organised");
  const CAT = [["agastya", "Education", "School ERP (K-12)", "School group heads, principals", "Multi-tenant SaaS", "Subscription plans in platform console"],
    ["pragyannxt", "Education", "Assessment, proctoring & certification", "Hiring heads, exam controllers", "SaaS · private cloud · on-prem", "Platform tiers by assessment volume"],
    ["vortex", "People & Talent", "HRMS, attendance & payroll", "CHRO, payroll and finance", "Multi-tenant cloud + apps", "Per employee per month, by module"],
    ["protonnxt", "People & Talent", "Applicant tracking (ATS)", "Staffing firm owners, TA heads", "Multi-tenant SaaS", "Subscription plans in platform console"],
    ["mavionlearn", "People & Talent", "Enterprise LMS, skills & compliance", "CHRO, L&D and compliance", "SaaS · private cloud · on-prem", "Per user per month, annual billing"],
    ["salespulse", "Revenue", "Sales CRM", "Sales directors, business owners", "Multi-tenant SaaS + Android", "Per seat, plus calling by usage"]];
  const cx = [G.mx, 3.05, 4.75, 7.25, 9.5, 11.1].map((v, i) => [G.mx, 3.0, 4.6, 7.2, 9.75, 11.55][i]);
  const cwid = [2.35, 1.5, 2.5, 2.45, 1.7, 1.18];
  ["Product", "Domain", "Category", "Primary buyer", "Delivery", "Pricing"].forEach((h, i) => label(sl, h, cx[i], 1.75, cwid[i] + 0.1));
  sl.addShape("line", { x: G.mx, y: 2.05, w: G.cw, h: 0, line: { color: T.ink, width: 1.25 } });
  CAT.forEach((r, i) => { const y = 2.12 + i * 0.6; if (i) hline(sl, G.mx, y - 0.02, G.cw);
    sl.addImage({ path: MARK[r[0]], x: G.mx, y: y + 0.13, w: 0.3, h: 0.3 }); txt(sl, NAME(r[0]), G.mx + 0.4, y, 1.95, 0.56, { fontSize: 13, bold: true, color: T.ink, valign: "middle" });
    r.slice(1).forEach((t, j) => txt(sl, t, cx[j + 1], y, cwid[j + 1] + (j === 4 ? 0.05 : 0), 0.56, { fontSize: j === 4 ? 10.5 : 11.5, valign: "middle", color: j === 0 ? ACC(r[0]) : T.slate700, bold: j === 0 })); });
  rr(sl, G.mx, 5.85, G.cw, 0.82, T.paper, T.line, 0.1);
  label(sl, "Also in the MavionTech portfolio", G.mx + 0.25, 5.95, 5);
  txt(sl, "Signet  ·  Visitor Management  ·  MavionMeet  ·  Serene  ·  Project Management Planning  ·  Trackline  ·  Inward Logistics  ·  Vanguard  ·  C2H Resource Management. Briefings on request.",
    G.mx + 0.25, 6.22, G.cw - 0.5, 0.38, { fontSize: 11.5, color: T.ink });
  sl.addNotes("Commercial models as stated in each approved deck; prices themselves are only published for Vortex (list) and PragyanNxt (allowances). The 'also in the portfolio' names are listed on maviontech.com and in the company profile; their detail has not been verified for this catalogue, so names only.");

  // 11 TECHNOLOGY CAPABILITIES MATRIX
  sl = add("CAT_TINT"); head(sl, "Technology capabilities", "Shared capabilities, implemented for each buyer");
  const TC = [["Customer isolation", "Database per school", "Database per organisation", "Database per customer", "Database per tenant", "Database per tenant", "Database per company"],
    ["Access & audit", "96 permission codes; before/after audit", "RBAC; activity logging", "Role-based access; audit logging", "RBAC; append-only audit", "Delegated admins; audit", "Row-level access; access log"],
    ["Configuration", "Dashboard builder; feature toggles", "Plans and entitlements", "No-code workflows; module toggles", "Custom schema; scoring weights", "SSO policy; campaigns", "Report builder; quotas"],
    ["India-first fit", "INR, UPI, TC / Bonafide", "INR pricing option", "PF, ESI, PT, TDS", "CTC structure (PF, gratuity)", "INR pricing", "GST invoices; Razorpay"],
    ["Mobile", "Student app (Expo)", "—", "VortexGo, SnapLens", "Recruiter app", "Responsive web", "Native Android app"],
    ["Branded output", "Report cards; invoices", "Report PDFs; certificates", "Payslips; 42 letter types", "Multi-sheet XLSX", "Excel and PDF in your brand", "Multi-sheet Excel"],
    ["AI", "—", "Generation; summaries; visual proctoring", "Face-AI attendance", "OpenAI / Gemini parsing", "—", "—"]];
  const mx0 = 2.5, mcw = (G.W - G.mx - mx0) / 6;
  ORDER.forEach((k, j) => { const x = mx0 + j * mcw; sl.addImage({ path: MARK[k], x: x + 0.05, y: 1.72, w: 0.26, h: 0.26 });
    txt(sl, NAME(k), x + 0.38, 1.72, mcw - 0.4, 0.26, { fontSize: 11.5, bold: true, color: T.ink, valign: "middle" }); });
  sl.addShape("line", { x: G.mx, y: 2.1, w: G.cw, h: 0, line: { color: T.ink, width: 1.25 } });
  TC.forEach((r, i) => { const y = 2.17 + i * 0.64; if (i) hline(sl, G.mx, y - 0.03, G.cw);
    txt(sl, r[0], G.mx, y, 1.85, 0.58, { fontSize: 12, bold: true, color: T.ink, valign: "middle" });
    r.slice(1).forEach((t, j) => txt(sl, t, mx0 + j * mcw + 0.05, y, mcw - 0.15, 0.58, { fontSize: 10.5, valign: "middle", color: t === "—" ? T.slate300 : T.slate700 })); });
  sl.addNotes("Matrix from the Portfolio Positioning Strategy section 5, aligned with the approved decks. Columns follow the catalogue order: Agastya, PragyanNxt, Vortex HRMS, ProtonNxt, MavionLearn, SalesPulse CRM. A dash means not offered or not evidenced.");

  // 12 INDUSTRIES & SEGMENTS
  sl = add("CAT_CONTENT"); head(sl, "Industries and customer segments", "Where our products fit");
  label(sl, "Industries we serve", G.mx, 1.75, 5);
  [["users", "Staffing & HR"], ["code", "IT companies"], ["grad", "EdTech & education"], ["briefcase", "Consulting firms"], ["landmark", "Finance & service providers"], ["store", "MSMEs"]].forEach(([ic, t], i) => {
    const x = G.mx + (i % 2) * 2.85, y = 2.1 + Math.floor(i / 2) * 1.2; card(sl, x, y, 2.7, 1.0, T.paper); chip(sl, CI[ic], x + 0.22, y + 0.24, 0.52);
    txt(sl, t, x + 0.9, y, 1.7, 1.0, { fontSize: 13.5, bold: true, color: T.ink, valign: "middle" }); });
  txt(sl, "Verticals as published on maviontech.com.", G.mx, 5.75, 5.6, 0.3, { fontSize: 11, color: T.slate500 });
  label(sl, "Segment and product", 6.75, 1.75, 5);
  const SEG = [["agastya", "K-12 school groups, chains and single schools"], ["pragyannxt", "Corporate hiring and L&D teams; colleges and certification bodies"],
    ["vortex", "Organisations with HR, payroll and field or shift workforces"], ["protonnxt", "Recruitment and staffing firms; enterprise talent teams"],
    ["mavionlearn", "Enterprises proving skills and compliance at scale"], ["salespulse", "Indian SMB and mid-market sales organisations"]];
  SEG.forEach(([k, t], i) => { const y = 2.1 + i * 0.75; hline(sl, 6.75, y, 5.98);
    sl.addImage({ path: MARK[k], x: 6.75, y: y + 0.2, w: 0.32, h: 0.32 }); txt(sl, NAME(k), 7.2, y + 0.04, 1.75, 0.66, { fontSize: 13, bold: true, color: T.ink, valign: "middle" });
    txt(sl, t, 9.0, y + 0.04, 3.73, 0.66, { fontSize: 12, valign: "middle" }); });
  hline(sl, 6.75, 2.1 + 6 * 0.75, 5.98);
  sl.addNotes("Industries from the maviontech.com home page. Segments from each product's approved deck and the Master Product Inventory. No customer names or counts are used.");

  // ================= SECTION 3 — PRODUCT SHOWCASES =================
  sec("Product showcases");
  divider(3, "Product showcases", "Each platform in depth: identity, problem and solution, capabilities, real screens, differentiators and value.",
    ORDER.map(k => ({ k, t: NAME(k) })), "Space is allocated by product breadth: Agastya 5 slides; Vortex HRMS, ProtonNxt, MavionLearn and SalesPulse CRM 4 each; PragyanNxt 3.");

  // ---- product templates ----
  async function opener(k, d) {
    const K = KIT[k]; const s = add("PROD_" + k);
    const pg = pres.slides.length; const [bx, by] = briefPos[k];
    txt(briefSl, `Page ${pg}  →`, bx, by, 1.1, 0.3, { fontSize: 11, bold: true, color: T.amberDeep, align: "right" });
    s.addImage({ path: MARK[k], x: G.mx, y: 0.55, w: 0.62, h: 0.62 });
    txt(s, "PRODUCT SHOWCASE", G.mx + 0.8, 0.6, 4, 0.25, { fontSize: 10, bold: true, charSpacing: 3, color: T.amber });
    txt(s, M.PRODUCTS[k].category.toUpperCase(), G.mx + 0.8, 0.88, 5, 0.25, { fontSize: 11, bold: true, charSpacing: 3, color: tint(LIGHT(k), 0.45) });
    s.addText(NAME(k), { placeholder: "title" }); s.addText(d.promise, { placeholder: "body" });
    [["The problem", d.problem], ["Our answer", d.answer]].forEach(([h, b], i) => { const x = G.mx + i * 2.95;
      txt(s, h.toUpperCase(), x, 4.15, 2.7, 0.25, { fontSize: 10, bold: true, charSpacing: 2, color: i ? T.amber : T.onDarkMuted });
      txt(s, b, x, 4.45, 2.75, 1.55, { fontSize: 12, color: i ? T.white : T.onDarkMuted }); });
    txt(s, "BUILT FOR", G.mx, 6.18, 1.2, 0.4, { fontSize: 10, bold: true, charSpacing: 2, color: T.onDarkMuted, valign: "middle" });
    txt(s, d.builtFor.join("  ·  "), G.mx + 1.2, 6.18, 4.75, 0.4, { fontSize: 12.5, bold: true, color: T.white, valign: "middle" });
    frame(s, await K.S(d.hero, 5.95, 3.75), 6.78, 1.2, 5.95, 3.75, { dark: true, url: d.heroUrl, alt: d.heroAlt });
    d.proof.forEach(([v, l], i) => { const px = 6.78 + i * 2.03; rr(s, px, 5.25, 1.89, 1.05, T.midnight2, "2E4468", 0.1);
      txt(s, v, px + 0.2, 5.33, 1.6, 0.48, { fontSize: v.length > 6 ? 18 : 22, bold: true, color: T.amber, valign: "middle" });
      txt(s, l, px + 0.2, 5.8, 1.6, 0.45, { fontSize: 10.5, color: T.onDarkMuted }); });
    txt(s, d.heroCap, 6.78, 6.42, 5.95, 0.28, { fontSize: 10.5, color: T.onDarkMuted });
    s.addNotes(d.notes); return s;
  }
  function capabilities(k, d) {
    const K = KIT[k]; const s = add("CAT_CONTENT"); head(s, `${NAME(k)} · Capabilities`, d.title); prodTag(s, k);
    const n = d.pillars.length, cols = d.cols || Math.min(n, 4), rows = Math.ceil(n / cols), gap = 0.25;
    const w = (G.cw - (cols - 1) * gap) / cols, top = d.flow ? 2.65 : 1.8, bottom = d.note ? 5.75 : 6.7, h = (bottom - top - (rows - 1) * gap - 0.15) / rows;
    if (d.flow) K.flow(s, d.flow, 1.78, d.hi ?? -1, 0.55);
    d.pillars.forEach(([ic, hd, sub, items, dark], i) => { const x = G.mx + (i % cols) * (w + gap), y = top + Math.floor(i / cols) * (h + gap);
      rr(s, x, y, w, h, dark ? T.midnight : T.paper, dark ? null : T.line, 0.1);
      if (dark) { s.addShape("roundRect", { x: x + 0.22, y: y + 0.22, w: 0.44, h: 0.44, rectRadius: 0.1, fill: { color: K.A }, line: { type: "none" } }); s.addImage({ path: K.icW[ic], x: x + 0.33, y: y + 0.33, w: 0.22, h: 0.22 }); }
      else M.iconChip(s, K.ic[ic], x + 0.22, y + 0.22, K.A, 0.44);
      txt(s, hd, x + 0.8, y + 0.18, w - 0.95, 0.3, { fontSize: 14, bold: true, color: dark ? T.white : T.ink });
      txt(s, sub, x + 0.8, y + 0.46, w - 0.95, 0.25, { fontSize: 10.5, bold: true, color: dark ? T.amber : K.A });
      s.addText(items.map((t, j) => ({ text: t, options: { bullet: { indent: 12 }, breakLine: j < items.length - 1 } })),
        { x: x + 0.22, y: y + 0.85, w: w - 0.4, h: h - 0.95, margin: 0, fontSize: rows === 1 ? Math.max(d.fs || 11.5, 12.5) : (d.fs || 11.5), color: dark ? T.onDarkMuted : T.slate700, valign: "top", paraSpaceAfter: rows === 1 ? 9 : 3, isTextBox: true }); });
    if (d.note) K.note(s, d.note, 5.95, 0.72);
    s.addNotes(d.notes); return s;
  }
  async function screens(k, d) {
    const K = KIT[k]; const s = add(d.tint ? "CAT_TINT" : "CAT_CONTENT"); head(s, `${NAME(k)} · ${d.kick}`, d.title); prodTag(s, k);
    let y0 = 1.8;
    if (d.flow) { K.flow(s, d.flow, 1.78, d.hi ?? -1, 0.52); y0 = 2.6; }
    const n = d.shots.length, gap = 0.3, w = (G.cw - (n - 1) * gap) / n, fh = d.fh || (d.flow ? 3.1 : 3.5);
    for (let i = 0; i < n; i++) { const it = d.shots[i], x = G.mx + i * (w + gap);
      frame(s, await K.S(it.img, w, fh), x, y0, w, fh, { url: it.url, alt: it.cap });
      K.txt(s, it.h, x, y0 + fh + 0.15, w, 0.3, { fontSize: 14, bold: true, color: T.ink });
      K.txt(s, it.cap, x, y0 + fh + 0.47, w, 0.5, { fontSize: 11 }); }
    if (d.chips) { const cy = 6.38; let x = G.mx; d.chips.forEach(t => { const cw = 0.35 + t.length * 0.08; pill(s, t, x, cy, cw, tint(K.A, 0.88), T.ink, 0.36, 10.5); x += cw + 0.12; }); }
    s.addNotes(d.notes); return s;
  }
  function value(k, d) {
    const K = KIT[k]; const s = add("CAT_TINT"); head(s, `${NAME(k)} · Why it wins`, d.title); prodTag(s, k);
    label(s, "Key differentiators", G.mx, 1.72, 5);
    d.diffs.forEach(([ic, h, b], i) => { const x = G.mx + (i % 2) * 3.4, y = 2.05 + Math.floor(i / 2) * 2.08;
      card(s, x, y, 3.2, 1.88, T.white); M.iconChip(s, K.ic[ic], x + 0.25, y + 0.25, K.A, 0.46);
      txt(s, h, x + 0.25, y + 0.85, 2.75, 0.3, { fontSize: 13.5, bold: true, color: T.ink }); txt(s, b, x + 0.25, y + 1.17, 2.75, 0.65, { fontSize: 11.5 }); });
    const rx = 7.65, rw = G.W - G.mx - rx;
    label(s, "Business value", rx, 1.72, 4);
    d.value.forEach((t, i) => { const y = 2.08 + i * 0.5; s.addImage({ path: K.checkA, x: rx, y: y + 0.06, w: 0.22, h: 0.22 }); txt(s, t, rx + 0.38, y, rw - 0.38, 0.45, { fontSize: 12.5, color: T.ink }); });
    const by = 2.08 + d.value.length * 0.5 + 0.2;
    rr(s, rx, by, rw, 6.2 - by, T.midnight, null, 0.1);
    txt(s, "BEST FIT", rx + 0.25, by + 0.18, 2, 0.25, { fontSize: 10, bold: true, charSpacing: 2, color: T.amber });
    txt(s, d.fit, rx + 0.25, by + 0.45, rw - 0.5, 6.2 - by - 0.55, { fontSize: 12.5, color: T.white });
    let x = G.mx; d.chips.forEach(t => { const cw = 0.35 + t.length * 0.078; pill(s, t, x, 6.38, cw, tint(K.A, 0.86), T.ink, 0.36, 10.5); x += cw + 0.12; });
    s.addNotes(d.notes); return s;
  }

  // ---- AGASTYA (5) ----
  await opener("agastya", { promise: "One operating system for every school in your group",
    problem: "School groups run on registers, spreadsheets and WhatsApp. Nothing reconciles, leaders wait days for numbers, and student data sits on personal phones.",
    answer: "Admissions to report cards, fees to fleet: every department, persona and campus on one governed platform, with each school's data in its own database.",
    builtFor: ["School groups & chains", "Single schools", "Group heads & principals"], hero: SCR.agastya.dash, heroUrl: "Agastya · School administrator dashboard", heroAlt: "Agastya school administrator dashboard",
    heroCap: "School administrator dashboard (demo data).", proof: [["19", "integrated modules"], ["8", "role cockpits"], ["96", "permission codes"]],
    notes: "Agastya identity. Figures from the Agastya source review (Nov 2026): 19 Django apps/modules, 8 system roles, 96 permission codes. Screenshot is a real product capture with demo data." });
  capabilities("agastya", { title: "19 modules across six pillars, on one data model", cols: 3, pillars: [
    ["dash", "Command & governance", "3 modules", ["Role dashboards & builder", "Administration & RBAC", "Platform setup & branding"]],
    ["grad", "Academics", "6 modules", ["Admissions & student lifecycle", "Academics & syllabus", "Timetable & substitution", "Attendance · Homework", "Exams & report cards"]],
    ["wallet", "Operations & finance", "5 modules", ["Fees & billing", "Staff operations & HR", "Transport", "Inventory & procurement", "Service desk & front office"]],
    ["school", "Campus life", "2 modules", ["Library", "Hostel, health & discipline"]],
    ["msg", "Engagement", "2 modules", ["Communications & WhatsApp inbox", "Student & parent portals, student app"]],
    ["cloud", "Platform", "1 module", ["Multi-tenant SaaS console", "Plans, subscriptions & billing"], true]],
    notes: "Module map as in the approved Agastya deck, slide 5. One data model: attendance feeds report cards, fee plans feed invoices, routes feed manifests." });
  await screens("agastya", { kick: "Workflows", title: "From first inquiry to report card, on one record for life",
    flow: ["Inquiry", "Admit & enrol", "Timetable & attendance", "Exams & report cards", "Fees & collections"], hi: 1,
    shots: [{ img: SCR.agastya.admit, h: "Admission in one screen", cap: "Student, enrolment, guardians and emergency contact in one step (demo data).", url: "Admit student" },
      { img: SCR.agastya.tt, h: "Clash-free timetables", cap: "700 weekly lectures across 40 teachers with zero conflicts (demo data).", url: "Timetable dashboard" },
      { img: SCR.agastya.coll, h: "Collections in real time", cap: "Daily collections with payment-method breakdown (demo data).", url: "Daily collections" }],
    notes: "Real Agastya screens with demo data, as used in the approved deck (slides 11, 12, 19)." });
  await screens("agastya", { kick: "Governance", tint: true, title: "Every campus governed from one console", fh: 3.35,
    shots: [{ img: SCR.agastya.tenants, h: "Onboard a school in minutes", cap: "Platform console: schools, plans and a dedicated database each (demo data).", url: "Tenant management" },
      { img: SCR.agastya.audit, h: "Every action traceable", cap: "Audit log with before/after values, filters and CSV export (demo data).", url: "Audit trail" },
      { img: SCR.agastya.wa, h: "A school-owned parent channel", cap: "Two-way WhatsApp inbox through the Meta Cloud API (demo data).", url: "WhatsApp inbox" }],
    chips: ["Lockout after 3 failed logins", "One active session per user", "4-hour sliding sessions", "Signed webhooks", "Database per school"],
    notes: "Controls as evidenced in the Agastya source and approved deck slide 10 and 26." });
  value("agastya", { title: "What changes when a school group moves to Agastya",
    diffs: [["db", "Database per school", "Each school gets its own database, created and migrated automatically."], ["sliders", "Configurable without developers", "Dashboard builder, permission matrix and feature toggles per school."],
      ["msg", "School-owned parent channel", "Two-way WhatsApp inbox; no staff personal numbers."], ["history", "Audit-grade governance", "Before/after audit, login events, lockout and single sessions."]],
    value: ["Live numbers for group heads, principals and accountants", "Faster collections with branded invoices and dues tracking", "Report cards published in one click",
      "New campuses provisioned from the console", "Parents informed without personal phone numbers"],
    fit: "School groups and chains running several campuses, and single schools that want group-grade governance.",
    chips: ["Multi-tenant SaaS", "Razorpay", "Meta WhatsApp", "Twilio SMS", "Student app (Expo)"],
    notes: "Differentiators from the approved Agastya deck slide 29. Business value is stated qualitatively; no ROI figures are claimed. Planned items (online fee payment, payroll, live bus tracking) are excluded here and shown under Future direction." });

  // ---- PRAGYANNXT (3) ----
  await opener("pragyannxt", { promise: "Results you can defend. Credentials anyone can verify.",
    problem: "Gamed screening tests push the wrong candidates forward, unmonitored exams devalue certificates, and point tools never talk to each other.",
    answer: "One platform for corporates and academic institutions to author, deliver, proctor, score and certify, with an integrity score on every attempt.",
    builtFor: ["Corporate hiring teams", "Academic institutions", "Certification programmes"], hero: SCR.pragyannxt.dash, heroUrl: "PragyanNxt · Evaluation dashboard", heroAlt: "PragyanNxt evaluation dashboard",
    heroCap: "Evaluation dashboard: active exams, users and question bank (demo data).", proof: [["8", "integrated modules"], ["Ed25519", "signed credentials"], ["14-day", "free trial"]],
    notes: "PragyanNxt (formerly Evalynx; rename approved by MavionTech). Facts from the approved PragyanNxt deck." });
  capabilities("pragyannxt", { title: "Eight modules, one closed loop of trust", flow: ["Author", "Deliver", "Proctor", "Score", "Certify"], hi: 4, cols: 4, fs: 11,
    pillars: [["pen", "Authoring", "Build", ["Question bank & bulk import", "AI generation", "Bloom's & difficulty"]],
      ["link", "Delivery", "Run", ["Public, assigned or invite", "Randomisation & timers", "Retakes"]],
      ["video", "Proctoring", "Watch", ["Live monitoring", "Screen & webcam recording", "AI visual analysis"]],
      ["gauge", "Integrity", "Score", ["Behavioural signals", "Integrity score", "Answer similarity"]],
      ["chart", "Results & analytics", "Decide", ["Auto & manual grading", "Report PDFs", "AI summaries"]],
      ["badge", "Certification", "Prove", ["Signed certificates", "Public verification", "Open Badges & appeals"], true],
      ["building", "Multi-tenancy & admin", "Govern", ["Tenant isolation", "Roles & RBAC", "Activity logging"]],
      ["wallet", "Commerce & AI", "Scale", ["Subscriptions & entitlements", "Metered AI credits", "Email invites"]]],
    notes: "Module map from the approved PragyanNxt deck slide 7; loop from slide 6." });
  { const K = KIT.pragyannxt; const s = add("CAT_TINT"); head(s, "PragyanNxt · Why it wins", "Not just a PDF: a credential the world can verify"); prodTag(s, "pragyannxt");
    frame(s, await K.S(SCR.pragyannxt.qbank, 6.2, 3.3), G.mx, 1.8, 6.2, 3.3, { url: "Question bank", alt: "Question bank" });
    txt(s, "Question bank: 1,225 questions across 5 subjects, with filters by subject, topic, difficulty and tag (demo data).", G.mx, 5.2, 6.2, 0.45, { fontSize: 11, color: T.slate500 });
    label(s, "Business value", G.mx, 5.75, 4);
    ["Hire on evidence, not gamed scores", "Exams that stand up to appeal", "Certificates verified in one click", "One platform instead of three"].forEach((t, i) => {
      const x = G.mx + (i % 2) * 3.1, y = 6.05 + Math.floor(i / 2) * 0.36; s.addImage({ path: K.checkA, x, y: y + 0.05, w: 0.2, h: 0.2 }); txt(s, t, x + 0.3, y, 2.8, 0.32, { fontSize: 12, color: T.ink }); });
    const rx = 7.2, rw = G.W - G.mx - rx; label(s, "Key differentiators", rx, 1.72, 4);
    [["key", "Cryptographically signed", "Ed25519-signed credentials that cannot be forged or altered."], ["globe", "Public verification", "Anyone can confirm a certificate is genuine, instantly."],
     ["eye", "Integrity without a camera", "Focus, tab and clipboard telemetry score non-proctored exams too."], ["link", "Plugs into your LMS", "LTI 1.3 writes results back to Canvas, Moodle and more."]].forEach(([ic, h, b], i) => {
      const y = 2.05 + i * 1.12; card(s, rx, y, rw, 1.0, T.white); M.iconChip(s, K.ic[ic], rx + 0.22, y + 0.25, K.A, 0.48);
      txt(s, h, rx + 0.9, y + 0.14, rw - 1.1, 0.3, { fontSize: 13.5, bold: true, color: T.ink }); txt(s, b, rx + 0.9, y + 0.45, rw - 1.1, 0.5, { fontSize: 11.5 }); });
    txt(s, "Deploy as cloud SaaS, private cloud or on-premise  ·  Basic, Plus and Pro tiers by monthly assessment volume", rx, 6.55, rw, 0.3, { fontSize: 10.5, color: T.slate500 });
    s.addNotes("Differentiators from the approved PragyanNxt deck slides 15, 13 and 21. Deployment options as listed on maviontech.com. Tier allowances are on the approved packaging slide; prices are not published."); }

  // ---- VORTEX (4) ----
  await opener("vortex", { promise: "Hire to retire. Attendance to payroll. On one record.",
    problem: "HR, payroll, attendance and helpdesk live in separate tools. Finance reconciles attendance to payroll by hand, and statutory rules change faster than legacy systems.",
    answer: "One people platform: Face-AI attendance, policy-driven payroll, leave, approvals and employee self-service, with a database per customer.",
    builtFor: ["HR & people teams", "Payroll & finance", "Field & shift workforces"], hero: SCR.vortex.tiles, heroUrl: "vortexhrms.com", heroAlt: "Vortex HRMS public website",
    heroCap: "Vortex HRMS public site, vortexhrms.com.", proof: [["14", "modules"], ["₹45", "per employee / month base"], ["Face-AI", "attendance"]],
    notes: "Vortex HRMS (official product name). The source materials include no in-app screenshots; the hero is the public vortexhrms.com page, cropped to remove unverified badges. Base price is the published list price." });
  capabilities("vortex", { title: "Start with core HR, then switch on exactly what you need", cols: 3, pillars: [
    ["users", "Base bundle", "Every employee gets", ["People management", "Attendance tracking", "Leave management", "Employee self-service", "Company policies"], true],
    ["layers", "Premium modules", "Switch on any month", ["Payroll management", "Performance (PMS)", "Expenses · Helpdesk · Assets", "HR document generation", "Learning (LMS)"]],
    ["phone", "Attendance & mobile add-ons", "For field and remote teams", ["VortexGo mobile app", "Geo-fence attendance & remote punch-in", "On-shift location sharing", "Punch step-up verification"]]],
    note: "Underneath everything: the approvals and workflow engine, role-based security, audit logging and a database per customer.",
    notes: "Packaging and modules from the approved Vortex deck slide 5." });
  { const K = KIT.vortex; const s = add("CAT_CONTENT"); head(s, "Vortex HRMS · Workflows", "Attendance and leave flow straight into payroll"); prodTag(s, "vortex");
    const ins = [["Attendance", "Punches, shifts, rosters"], ["Leave & comp-off", "Balances and credits"], ["Regularisations", "Approved corrections"], ["Expenses", "Approved reimbursements"]];
    const outs = [["Payslips", "For every employee"], ["Bank file", "Disbursement output"], ["Statutory", "PF · ESI · PT · TDS"], ["Period locked", "Audit logged"]];
    label(s, "Inputs", G.mx, 1.72, 2); label(s, "Outputs", 10.4, 1.72, 2);
    const box = (x, y, w, h, hd, sub, dark) => { rr(s, x, y, w, h, dark ? T.midnight : T.white, dark ? null : T.line, 0.08);
      s.addText([{ text: hd, options: { bold: true, fontSize: 13, color: dark ? T.white : T.ink, breakLine: true } }, { text: sub, options: { fontSize: 10.5, color: dark ? T.onDarkMuted : T.slate500 } }],
        { x: x + 0.18, y, w: w - 0.3, h, margin: 0, valign: "middle", isTextBox: true }); };
    ins.forEach(([h, b], i) => { box(G.mx, 2.05 + i * 0.95, 2.4, 0.78, h, b); K.line(s, G.mx + 2.4, 2.44 + i * 0.95, 3.6, 3.48); });
    rr(s, 3.6, 2.05, 2.45, 3.63, tint(K.A, 0.9), tint(K.A, 0.6), 0.1);
    txt(s, [{ text: "Inputs locked at cut-off", options: { bold: true, fontSize: 14, color: T.ink, breakLine: true } }, { text: "Period inputs frozen for the run", options: { fontSize: 11, color: T.slate500 } }], 3.8, 2.05, 2.1, 3.63, { align: "center", valign: "middle" });
    K.line(s, 6.05, 3.87, 6.65, 3.87);
    rr(s, 6.65, 2.05, 3.0, 3.63, T.midnight, null, 0.1);
    txt(s, [{ text: "Payroll engine", options: { bold: true, fontSize: 16, color: T.white, breakLine: true } }, { text: "Salary structures · statutory deductions · tax computation · adjustments", options: { fontSize: 11.5, color: T.onDarkMuted } }], 6.85, 2.05, 2.6, 3.63, { align: "center", valign: "middle" });
    outs.forEach(([h, b], i) => { K.line(s, 9.65, 3.87, 10.4, 2.44 + i * 0.95); box(10.4, 2.05 + i * 0.95, 2.33, 0.78, h, b); });
    K.note(s, "Re-runs are versioned and periods lock after sign-off, so every payroll is reproducible and auditable. Approvals route by role, sequentially or in parallel, with escalation timers.", 5.95, 0.72);
    s.addNotes("Native diagram from the approved Vortex deck slide 10 and 12. No mock product screens are drawn: Vortex in-app screenshots are an open item."); }
  value("vortex", { title: "One record from hire to retire, priced by what you switch on",
    diffs: [["scan", "Face-AI attendance", "Face-recognition punch (InsightFace), geo-fencing and device integration."], ["workflow", "Policy-first payroll", "Versioned re-runs and locked periods make payroll reproducible."],
      ["phone", "VortexGo and SnapLens", "Employee and on-site attendance apps, with privacy safeguards for location."], ["sliders", "Pay for what you switch on", "Published per-employee list prices; modules on or off any month."]],
    value: ["No manual reconciliation of attendance to payroll", "Statutory deductions computed by policy", "Approvals that never stall, with escalation timers", "Employees serve themselves: balances, payslips, policies"],
    fit: "Organisations with HR, payroll and field or shift workforces that want one record from hire to retire.",
    chips: ["Multi-tenant cloud", "Biometric devices & gates", "REST APIs", "30-day free trial"],
    notes: "From the approved Vortex deck slides 7, 8, 11, 19 and 20. List prices: Basic Services ₹45 per active employee per month; modules ₹9 to ₹55; GST extra." });

  // ---- PROTONNXT (4) ----
  await opener("protonnxt", { promise: "From requisition to hire, in one structured pipeline",
    problem: "Recruiters screen résumés by hand, ownership is unclear, feedback lives in inboxes, and vendor CVs arrive with no caps, duplicates or audit.",
    answer: "A multi-tenant, AI-assisted ATS for recruitment firms and talent teams: sourcing, parsing, interviews, offers, vendors and client insight on one system.",
    builtFor: ["Recruitment & staffing firms", "Enterprise talent teams", "Vendor agencies"], hero: SCR.protonnxt.dash, heroUrl: "ProtonNxt · Admin dashboard", heroAlt: "ProtonNxt admin dashboard",
    heroCap: "Admin dashboard: KPIs, customer JD statistics and recruitment funnel (demo data).", proof: [["15", "modules in every tenant"], ["2", "AI parsing paths"], ["L1–L3", "structured interviews"]],
    notes: "ProtonNxt facts from the approved deck: 15 modules, OpenAI and Gemini parsing paths, L1/L2/L3 interview levels. Personal data in source slides 8 and 36 is not used." });
  capabilities("protonnxt", { title: "Fifteen modules, every one included in every tenant", cols: 5, fs: 11, pillars: [
    ["briefcase", "Hiring pipeline", "6 modules", ["Job requisitions", "Candidate sourcing", "Talent intake & matching", "Applicant tracking", "Interview workflow", "Offer management"], true],
    ["users", "Operations", "4 modules", ["JD assignment", "Team collaboration", "Calendar & video", "Mobile recruiter app"]],
    ["globe", "External access", "2 modules", ["Careers URL & candidate portal", "Vendor management"]],
    ["chart", "Analytics", "2 modules", ["Reports & analytics", "Client engagement analytics (beta)"]],
    ["shield", "Governance", "1 module", ["Settings, admin & custom schema"]]],
    note: "No add-ons: every module ships to every tenant from day one. Client engagement analytics is in beta.",
    notes: "Module map from the approved ProtonNxt deck slide 6." });
  await screens("protonnxt", { kick: "Workflows", title: "The pipeline always tells the truth", flow: ["Requisition", "Source & AI parse", "Track", "Interview L1–L3", "Offer & join"], hi: 1,
    shots: [{ img: SCR.protonnxt.status, h: "Every stage visible", cap: "Candidate status across L1, L2 and L3 per JD (demo data).", url: "Manage candidate status" },
      { img: SCR.protonnxt.exec, h: "Answers that match the table", cap: "Executive summary over candidate reports (demo data).", url: "Candidate reports" },
      { img: SCR.protonnxt.leader, h: "Clients to grow (beta)", cap: "Client engagement leaderboard and segments (demo data).", url: "Client analytics" }],
    notes: "Real ProtonNxt screens with demo data (approved deck slides 10, 17, 19). Sidebar cropped." });
  value("protonnxt", { title: "Structure, speed and evidence across every hire",
    diffs: [["sparkle", "AI without lock-in", "OpenAI and Gemini parsing paths, with manual override."], ["hand", "Agencies inside the process", "Per-vendor caps, duplicate protection and separate vendor logins."],
      ["radar", "Client engagement analytics", "Scores and segments show which clients to grow (beta)."], ["globe", "One candidate portal", "A single candidate login across every employer on ProtonNxt."]],
    value: ["Structured intake and interviews shorten the path to hire", "Clear ownership of every requisition and candidate", "Vendor submissions that are measurable and deduplicated", "Reports leaders trust, with saved templates and XLSX"],
    fit: "Recruitment firms serving many clients, and in-house talent teams that work with agency partners.",
    chips: ["Multi-tenant SaaS", "OpenAI · Gemini", "MavionMeet video", "Razorpay", "ICS calendars"],
    notes: "From the approved ProtonNxt deck slides 14, 15, 19, 25 and 26. No time-to-hire percentages are claimed." });

  // ---- MAVIONLEARN (4) ----
  await opener("mavionlearn", { promise: "Skills that compound: training that becomes provable capability",
    problem: "Finishing a course doesn't prove a skill, mandatory training is chased by hand, and leadership can't see what training spend returns.",
    answer: "A multi-tenant enterprise LMS that scores every employee against role targets, runs compliance on its own and reports in your brand, with identity built in.",
    builtFor: ["L&D and HR", "Compliance leads", "IT & identity teams"], hero: SCR.mavionlearn.dash, heroUrl: "MavionLearn · Learning admin", heroAlt: "MavionLearn learning admin dashboard",
    heroCap: "Learning admin: enrolments, compliance and completions by department (demo data).", proof: [["12", "integrated modules"], ["SSO", "OIDC · SAML · SCIM"], ["30-day", "all-features trial"]],
    notes: "MavionLearn sales positioning only; investor-deck content (market sizes, funding) is excluded." });
  capabilities("mavionlearn", { title: "Twelve modules across five capabilities", flow: ["Set role targets", "Score the gaps", "Recommend courses", "Complete & certify", "Capability rises"], hi: 4, cols: 5, fs: 11,
    pillars: [["book", "Learn", "4 modules", ["Catalog & courses", "On-demand learning", "Live learning (ILT / VILT)", "Learner experience"]],
      ["target", "Measure", "1 module", ["Skills & skill matrix", "Development plans"], true],
      ["shield", "Comply", "1 module", ["Compliance campaigns", "Certifications & renewals"]],
      ["chart", "Report", "2 modules", ["Enterprise reporting", "Cost & ROI"]],
      ["key", "Govern", "4 modules", ["People & delegated admin", "Identity & security", "Standards & integrations", "Platform console"]]],
    notes: "Module map from the approved MavionLearn deck slide 5; loop from slides 9 and 10." });
  await screens("mavionlearn", { kick: "Workflows", tint: true, title: "See capability, run compliance, report in your brand", fh: 3.4,
    shots: [{ img: SCR.mavionlearn.matrix, h: "A living skill matrix", cap: "Employees scored against role targets (demo data).", url: "Skill matrix" },
      { img: SCR.mavionlearn.camp, h: "Compliance that runs itself", cap: "Campaign builder: audience, course, schedule and status (demo data).", url: "Campaigns" },
      { img: SCR.mavionlearn.reports, h: "Board-ready reporting", cap: "Reports workspace: eight built-in report types (demo data).", url: "Reports" }],
    chips: ["Assign", "Remind", "Certify", "Renew", "Export in your brand"],
    notes: "Real MavionLearn screens with demo data (approved deck slides 9, 11, 13)." });
  value("mavionlearn", { title: "Others track completions; MavionLearn proves capability",
    diffs: [["target", "Capability, not completions", "A living skill matrix scored against role targets."], ["shield", "Compliance on autopilot", "Assign, remind, certify and renew automatically."],
      ["key", "Identity included", "OIDC, SAML 2.0 and SCIM in the product, not a paid add-on."], ["db", "Isolated by design", "A dedicated database per customer, white-labelled."]],
    value: ["Prove capability to leadership and auditors", "Audit-ready evidence exported in one click", "Board-ready Excel and PDF reports in your brand", "Training spend and cost per completion visible"],
    fit: "Enterprises that must prove skills and compliance across large, distributed organisations.",
    chips: ["SaaS · private cloud · on-prem", "SCORM", "LTI 1.3", "OIDC · SAML · SCIM", "Cloudflare R2 / S3"],
    notes: "From the approved MavionLearn deck slides 6, 17, 18, 19 and 21. Pricing tiers are being confirmed and are not shown." });

  // ---- SALESPULSE (4) ----
  await opener("salespulse", { promise: "Your reps sell. Your customers' numbers stay yours.",
    problem: "Reps hold raw phone numbers, numbers are re-typed into spreadsheets, leaders lack live visibility, and global CRMs fit Indian billing poorly.",
    answer: "A multi-tenant sales CRM with privacy-masked calling, a live weighted pipeline and reports that build themselves, made for how Indian sales teams work.",
    builtFor: ["Indian sales teams", "SMB & mid-market", "Field and inside sales"], hero: SCR.salespulse.dash, heroUrl: "SalesPulse · Director dashboard", heroAlt: "SalesPulse director dashboard",
    heroCap: "Director dashboard: pipeline, closed value, conversion and lead sources (demo data).", proof: [["14", "integrated modules"], ["2-way", "masked calling"], ["GST", "invoicing built in"]],
    notes: "SalesPulse CRM: catalogue inclusion is still to be confirmed by MavionTech (open item); included here as an approved finalised product." });
  capabilities("salespulse", { title: "Fourteen modules in one sales command center", cols: 4, pillars: [
    ["target", "Sell", "4 modules", ["My Day", "Leads", "Pipeline", "Customers & 360"]],
    ["phone", "Engage", "3 modules", ["Privacy-masked calling", "Email & WhatsApp", "Activity log & call journal"], true],
    ["chart", "Lead", "3 modules", ["Command center", "Report builder", "Weekly reports"]],
    ["shield", "Protect & run", "4 modules", ["Data protection controls", "Subscriptions & GST billing", "Native Android app", "Platform & multi-tenancy"]]],
    note: "Each company's data lives in its own database, and masking rules are enforced on the server for web, mobile and exports alike.",
    notes: "Module map from the approved SalesPulse deck slide 6. 'Command Center' is the product's module name." });
  await screens("salespulse", { kick: "Workflows", title: "Your reps make the call. They never see the number.", flow: ["My Day queue", "Masked call", "Outcome logged", "Follow-up", "Weekly report"], hi: 1,
    shots: [{ img: SCR.salespulse.myday, h: "Start the day knowing who to call", cap: "My Day: KPI strip and prioritised work queue (demo data).", url: "My Day" },
      { img: SCR.salespulse.incall, h: "The number stays masked", cap: "In call: one-click connect; the real number is resolved server-side (demo data).", url: "Dialer" },
      { img: SCR.salespulse.command, h: "Leaders see it live", cap: "Command center: org KPIs, trend and leaderboard (demo data).", url: "Command center" }],
    notes: "Real SalesPulse screens with demo data (approved deck slides 7, 13, 16)." });
  value("salespulse", { title: "Privacy built in, visibility built up",
    diffs: [["eyeoff", "Privacy-masked by default", "Phone and email masked on web, mobile and exports."], ["ban", "No bulk export for reps", "Lead-list and report downloads are leadership-only."],
      ["chart", "Reports that build themselves", "Activity feeds the journal, command center and weekly reports."], ["gst", "India-first billing", "INR, GST invoices and Razorpay built in."]],
    value: ["Customer contacts stay with the company when reps leave", "Leaders see pipeline and people in real time", "No re-typing of numbers into spreadsheets", "Calling billed on actual usage, or bring your own telephony"],
    fit: "Indian sales teams whose customer relationships are their most valuable asset.",
    chips: ["Multi-tenant SaaS", "Native Android app", "Razorpay", "WhatsApp Business", "30-day free trial"],
    notes: "From the approved SalesPulse deck slides 18, 20, 22 and 23. Calling is ₹0.50 per leg-minute with a 30-second pulse; seat prices are confirmed in proposals." });

  // ================= SECTION 4 — TECHNOLOGY AND DELIVERY =================
  sec("Technology and delivery");
  divider(4, "Technology and delivery", "How our platforms are built, secured, deployed, implemented and supported.",
    ["Architecture and stack", "Integrations", "Security and governance", "Deployment, scale and customisation", "Implementation and support"], "Section 4 covers only verified technology facts from the product sources and maviontech.com.");

  // ARCHITECTURE
  sl = add("CAT_CONTENT"); head(sl, "Architecture and stack", "One reference architecture, shared by every product");
  const lay = [["Experience", "Web apps for every role · mobile apps · portals for parents, candidates and vendors · devices and gates"],
    ["Request pipeline", "Authentication and session policy · tenant resolution · role and permission checks · audit logging · rate limits"],
    ["Application", "Product modules · no-code configuration · workflow and approvals · real-time updates · background jobs"],
    ["Data", "A control database for tenants, plans and billing, and one dedicated database per customer"]];
  lay.forEach(([h, t], i) => { const y = 1.8 + i * 1.02, dark = i === 3;
    rr(sl, G.mx, y, 7.4, 0.86, dark ? T.midnight : (i % 2 ? T.paper : T.white), dark ? null : T.line, 0.08);
    txt(sl, h.toUpperCase(), G.mx + 0.25, y, 1.9, 0.86, { fontSize: 10.5, bold: true, charSpacing: 2, color: dark ? T.amber : T.amberDeep, valign: "middle" });
    txt(sl, t, G.mx + 2.15, y, 5.1, 0.86, { fontSize: 12, color: dark ? T.white : T.ink, valign: "middle" }); });
  txt(sl, "The pattern is common to all six products; implementation details differ by product.", G.mx, 5.95, 7.4, 0.3, { fontSize: 11, color: T.slate500 });
  label(sl, "Verified technology by product", 8.35, 1.75, 4.5);
  const STK = [["agastya", "Django 5.1 on Python · MySQL · Daphne ASGI and Channels · Redis · Expo / React Native"], ["pragyannxt", "Ed25519 signing · LTI 1.3 · AI visual proctoring · durable background jobs"],
    ["vortex", "Django + Python · MySQL · InsightFace · Tailwind UI · REST APIs"], ["protonnxt", "Isolated MySQL per tenant · WebSockets · OpenAI / Gemini · HMAC-signed links"],
    ["mavionlearn", "Isolated MySQL per tenant · Cloudflare R2 / S3 signed media · versioned API"], ["salespulse", "Own database per company · server-side masking · native Android"]];
  STK.forEach(([k, t], i) => { const y = 2.08 + i * 0.73; hline(sl, 8.35, y, 4.38);
    sl.addImage({ path: MARK[k], x: 8.35, y: y + 0.1, w: 0.26, h: 0.26 }); txt(sl, NAME(k), 8.72, y + 0.08, 3.9, 0.3, { fontSize: 12, bold: true, color: T.ink });
    txt(sl, t, 8.72, y + 0.36, 4.0, 0.36, { fontSize: 10.5 }); });
  sl.addNotes("Reference architecture generalised from the architecture slides of all six approved decks. Stack items only where the product source names them; no framework is attributed where the source does not state it.");

  // INTEGRATIONS
  sl = add("CAT_TINT"); head(sl, "Integration capabilities", "Connects to the services your teams already use");
  const INT = [["wallet", "Payments & billing", "Razorpay", "Agastya · ProtonNxt · SalesPulse"], ["msg", "Messaging", "Meta WhatsApp Cloud API · WhatsApp Business · Twilio SMS & Verify · SMTP email", "Agastya · SalesPulse · ProtonNxt · PragyanNxt"],
    ["key", "Identity", "OIDC · SAML 2.0 · SCIM 2.0 with JIT provisioning", "MavionLearn"], ["grad", "Learning standards", "SCORM · LTI 1.3 (Canvas, Moodle) · Open Badges", "MavionLearn · PragyanNxt"],
    ["sparkle", "AI services", "OpenAI · Google Gemini · InsightFace", "ProtonNxt · Vortex HRMS"], ["calendar", "Calendar & video", "ICS invites · MavionMeet video interviews", "ProtonNxt · MavionLearn"],
    ["fingerprint", "Devices", "Biometric terminals · access gates", "Vortex HRMS"], ["sheet", "Data & exports", "REST and versioned APIs · webhooks · Excel (XLSX) · PDF", "All products"]];
  INT.forEach(([ic, h, t, who], i) => { const x = G.mx + (i % 2) * 6.17, y = 1.8 + Math.floor(i / 2) * 1.2, w = 5.97;
    card(sl, x, y, w, 1.05, T.white); chip(sl, CI[ic], x + 0.25, y + 0.26);
    txt(sl, h, x + 0.95, y + 0.12, 2.3, 0.3, { fontSize: 13.5, bold: true, color: T.ink }); txt(sl, who, x + 3.2, y + 0.12, w - 3.4, 0.3, { fontSize: 10, color: T.amberDeep, bold: true, align: "right" });
    txt(sl, t, x + 0.95, y + 0.45, w - 1.15, 0.55, { fontSize: 11.5 }); });
  sl.addNotes("Integrations named in the approved product decks only. These are technical integrations, not commercial partnerships.");

  // SECURITY
  sl = add("CAT_DARK"); head(sl, "Security and governance", "Controls you can see in the product, not promises on a page");
  const SECR = [["db", "Isolation", "A dedicated database per customer in all six products; no shared business tables."], ["key", "Access control", "Role-based access everywhere; 96 permission codes in Agastya; row-level access in SalesPulse."],
    ["history", "Audit", "Before/after audit trails, login events and append-only logs across sensitive workflows."], ["lock", "Sessions", "Lockout after failed logins, single active sessions, sliding HttpOnly sessions, IP policies."],
    ["eyeoff", "Data protection", "Server-side masking of phones and emails; no bulk export for non-leaders; traceability watermarks."], ["badge", "Signed artefacts", "Ed25519-signed credentials, HMAC-signed share links, signed media URLs and webhooks."]];
  SECR.forEach(([ic, h, b], i) => { const x = G.mx + (i % 3) * 4.11, y = 1.85 + Math.floor(i / 3) * 2.08, w = 3.81;
    rr(sl, x, y, w, 1.85, T.midnight2, "22365A", 0.1); chip(sl, CW[ic], x + 0.28, y + 0.28, 0.5, "22365A");
    txt(sl, h, x + 0.95, y + 0.32, w - 1.2, 0.42, { fontSize: 15, bold: true, color: T.white, valign: "middle" }); txt(sl, b, x + 0.28, y + 0.95, w - 0.56, 0.85, { fontSize: 12, color: T.onDarkMuted }); });
  rr(sl, G.mx, 6.1, G.cw, 0.6, "1A2F52", null, 0.1);
  txt(sl, "Certifications, uptime commitments and support hours are confirmed in each proposal and are not claimed in this catalogue.", G.mx + 0.25, 6.1, G.cw - 0.5, 0.6, { fontSize: 12, color: T.white, valign: "middle" });
  sl.addNotes("Every control is visible in a product screen or stated in a product source. ISO 27001, SOC 2, GDPR, 99.9% uptime and 24x7 support appear on the website and company PDF but are unevidenced and conflicting, so they are deliberately excluded.");

  // DEPLOYMENT, SCALE, CUSTOMISATION
  sl = add("CAT_CONTENT"); head(sl, "Deployment, scalability and customisation", "Run it where you need it, grow it without re-platforming");
  const colsX = [G.mx, 4.71, 8.82], cw3 = 3.91;
  [["cloud", "Deployment", ["Cloud SaaS, multi-tenant, for every product", "Private cloud and on-premise for enterprise customers (MavionLearn, PragyanNxt)", "Managed hosting, with backup and disaster recovery", "Web plus native mobile apps where field work needs them"]],
   ["trend", "Scalability", ["New customers provisioned from platform consoles in minutes", "A database per customer, so tenants scale independently", "Real-time layers and background jobs for heavy work", "Rate limits and quotas protect shared capacity"]],
   ["sliders", "Customisation", ["Dashboard builders, custom fields and candidate schemas", "No-code workflows, approvals and escalations", "Feature toggles and module switches per customer", "White-label branding on apps, exports and certificates"]]].forEach(([ic, h, items], i) => {
    const x = colsX[i]; rr(sl, x, 1.8, cw3, 4.85, i === 1 ? T.midnight : T.paper, i === 1 ? null : T.line, 0.12);
    chip(sl, i === 1 ? CW[ic] : CI[ic], x + 0.3, 2.1, 0.56, i === 1 ? T.midnight2 : tint(T.amber, 0.82));
    txt(sl, h, x + 0.3, 2.85, cw3 - 0.6, 0.38, { fontSize: 18, bold: true, color: i === 1 ? T.white : T.ink });
    items.forEach((t, j) => { const y = 3.4 + j * 0.78; sl.addImage({ path: i === 1 ? CA : CI.check, x: x + 0.3, y: y + 0.04, w: 0.22, h: 0.22 });
      txt(sl, t, x + 0.65, y, cw3 - 0.95, 0.72, { fontSize: 12, color: i === 1 ? T.white : T.slate700 }); }); });
  sl.addNotes("Deployment options from maviontech.com (Platform page and Contact FAQ) and the approved decks. Scalability is described structurally; no capacity or performance figures are claimed.");

  // IMPLEMENTATION & SUPPORT
  sl = add("CAT_TINT"); head(sl, "Implementation and support", "A predictable path from first demo to go-live, and beyond");
  label(sl, "Engagement path", G.mx, 1.72, 4);
  [["Demo", "See the product on scenarios that match yours."], ["Pilot", "Prove value on your own data with one team or campus."], ["Proposal", "Scope, plan and commercials confirmed in writing."]].forEach(([h, b], i) => {
    const x = G.mx + i * 4.11; rr(sl, x, 2.02, 3.81, 0.95, i === 1 ? T.amber : T.white, i === 1 ? null : T.line, 0.1);
    txt(sl, `${i + 1}  ${h}`, x + 0.25, 2.08, 3.3, 0.36, { fontSize: 15, bold: true, color: i === 1 ? T.midnight : T.ink });
    txt(sl, b, x + 0.25, 2.45, 3.4, 0.45, { fontSize: 11.5, color: i === 1 ? T.midnight : T.slate700 }); });
  label(sl, "Implementation method", G.mx, 3.25, 4);
  [["Discover", "Requirements, process mapping, design and kickoff"], ["Configure", "Setup, configuration, integrations and data migration"], ["Validate", "User acceptance, performance testing and security review"], ["Go live", "Training, launch support, documentation and handover"]].forEach(([h, b], i) => {
    const x = G.mx + i * 3.08, w = 2.86; dot(sl, x, 3.62, i === 3 ? T.amber : T.amberDeep, 0.22);
    if (i < 3) hline(sl, x + 0.3, 3.73, w - 0.1, T.slate300);
    txt(sl, h, x, 3.95, w, 0.32, { fontSize: 15, bold: true, color: T.ink }); txt(sl, b, x, 4.3, w - 0.15, 0.62, { fontSize: 11.5 }); });
  rr(sl, G.mx, 5.2, G.cw, 1.5, T.midnight, null, 0.12);
  chip(sl, CW.life, G.mx + 0.3, 5.5, 0.56, T.midnight2);
  txt(sl, "Support and maintenance", G.mx + 1.05, 5.38, 4, 0.36, { fontSize: 16, bold: true, color: T.white });
  txt(sl, "One channel for sales and support: communications@maviontech.com · +91 91580 08002. Managed hosting with backup and disaster recovery, continuous product updates, and support hours and service levels agreed in each contract.",
    G.mx + 1.05, 5.75, G.cw - 1.35, 0.85, { fontSize: 12.5, color: T.onDarkMuted });
  txt(sl, "Indicative method from the MavionTech company profile; timelines are confirmed during scoping.", G.mx, 6.75, G.cw, 0.25, { fontSize: 10, color: T.slate500 });
  sl.addNotes("Four phases from the MavionTech company profile (page 36). The '4–8 weeks' figure is a company target and is shown only as indicative in the notes, not as a commitment. Support contact from maviontech.com; managed hosting and backup/DR from the Platform page.");

  // ================= SECTION 5 — BUSINESS AND INVESTMENT =================
  sec("Business and investment positioning");
  divider(5, "Business and investment", "Our portfolio strategy and the opportunities ahead, with achievements and ambitions kept clearly apart.",
    ["Portfolio strategy", "Achievements and ambitions", "Product-market opportunities", "Commercial models", "Partnerships, growth and direction"], "Section 5 is written for partners and investors as well as customers. It makes no claims about revenue, customers, market size or valuation.");

  // STRATEGY
  sl = add("CAT_CONTENT"); head(sl, "Portfolio strategy", "Vertical depth on a shared foundation");
  [["layers", "Vertical depth", "Each product is a complete system for one buyer, not a module of a generic suite: schools, HR, recruitment, learning, assessment and sales."],
   ["puzzle", "Shared foundation", "Isolation, access control, audit, configuration and billing patterns are reused across products, so each new product starts further ahead."],
   ["landmark", "India-first fit", "Statutory payroll, GST, INR pricing and local payment and messaging rails are built in rather than added later."],
   ["network", "Multi-product accounts", "Natural pairings let one customer grow across products: assessment in hiring, certification in learning, learning beyond HR."]].forEach(([ic, h, b], i) => {
    const x = G.mx + (i % 2) * 6.17, y = 1.8 + Math.floor(i / 2) * 2.1, w = 5.97; card(sl, x, y, w, 1.9, T.paper); chip(sl, CI[ic], x + 0.3, y + 0.3, 0.56);
    txt(sl, h, x + 1.1, y + 0.3, w - 1.4, 0.36, { fontSize: 17, bold: true, color: T.ink }); txt(sl, b, x + 1.1, y + 0.72, w - 1.4, 1.05, { fontSize: 12.5 }); });
  rr(sl, G.mx, 6.05, G.cw, 0.62, tint(T.amber, 0.85), null, 0.1);
  txt(sl, "Endorsed-brand model: every product keeps its own name and accent, and every product carries the same MavionTech standard.", G.mx + 0.25, 6.05, G.cw - 0.5, 0.62, { fontSize: 12.5, color: T.ink, valign: "middle" });
  sl.addNotes("Strategy from the Portfolio Positioning Strategy, sections 4 to 7.");

  // ACHIEVEMENTS vs AMBITIONS
  sl = add("CAT_TINT"); head(sl, "Achievements and ambitions", "What exists today, and what we are working towards");
  rr(sl, G.mx, 1.8, 5.97, 4.9, T.white, T.line, 0.12); rr(sl, 6.77, 1.8, 5.96, 4.9, T.midnight, null, 0.12);
  pill(sl, "ACHIEVED · EVIDENCED", G.mx + 0.3, 2.05, 2.4, tint(T.success, 0.85), "0E7A3E", 0.34, 10);
  pill(sl, "AMBITION · NOT YET ACHIEVED", 7.07, 2.05, 2.9, "22365A", T.amber, 0.34, 10);
  const ACH = ["Launched as an independent product company in 2025", "Six enterprise platforms with working product screens, shown in this catalogue",
    "Multi-tenant consoles that provision customers with a dedicated database", "Mobile apps in four products: Agastya, Vortex, ProtonNxt, SalesPulse",
    "Agastya codebase: 19 apps, 128 data models, 257 automated tests (Nov 2026 review)", "Published Vortex list prices and live trials for four products"];
  const AMB = ["Roadmap features: online fee payment, payroll and live bus tracking in Agastya; engagement surveys, benefits and BI in Vortex", "Evidence for uptime, support-hour and certification statements",
    "Channel, implementation and technology partnerships", "Deeper connections between products, beyond today's pairings", "A complete published catalogue covering the wider MavionTech portfolio"];
  ACH.forEach((t, i) => { const y = 2.6 + i * 0.66; sl.addImage({ path: CK, x: G.mx + 0.3, y: y + 0.05, w: 0.22, h: 0.22 }); txt(sl, t, G.mx + 0.65, y, 5.1, 0.6, { fontSize: 12.5, color: T.ink }); });
  AMB.forEach((t, i) => { const y = 2.6 + i * 0.78; sl.addImage({ path: CW.flag, x: 7.07, y: y + 0.05, w: 0.22, h: 0.22 }); txt(sl, t, 7.42, y, 5.1, 0.72, { fontSize: 12.5, color: T.white }); });
  txt(sl, "No revenue, customer counts, market size or valuation are stated: none is evidenced for external use.", G.mx, 6.78, G.cw, 0.22, { fontSize: 10, color: T.slate500 });
  sl.addNotes("Achievements: maviontech.com milestones; the six approved decks; Agastya source review November 2026; Vortex published list prices; trials for MavionLearn (30 days), PragyanNxt (14), SalesPulse (30) and Vortex (30). Ambitions: labelled roadmap slides in the Agastya and Vortex decks, and the open items in PROJECT_STATUS.");

  // OPPORTUNITIES
  sl = add("CAT_CONTENT"); head(sl, "Product-market opportunities", "Where each product meets a clear buying trigger");
  const OPP = [["agastya", "School groups digitising operations", "Registers, spreadsheets and chat groups across campuses", "Replace fragmented tools with one governed system"],
    ["pragyannxt", "Organisations that must defend results", "Remote hiring tests and certificates that are questioned", "Integrity scoring and verifiable credentials"],
    ["vortex", "Employers paying people correctly", "Attendance-to-payroll reconciliation and statutory change", "One record from attendance to payslip"],
    ["protonnxt", "Firms that recruit for many clients", "Hiring spread over inboxes, sheets and agencies", "A structured, AI-assisted pipeline with client insight"],
    ["mavionlearn", "Enterprises that must prove skills", "Audits and leadership asking for evidence of capability", "Skill matrix and self-running compliance"],
    ["salespulse", "Sales teams protecting customer data", "Reps leaving with contacts; numbers re-typed by hand", "Masked calling and reports that build themselves"]];
  [["Product", G.mx, 2.1], ["Segment", 2.9, 3.0], ["Buying trigger", 6.05, 3.35], ["Our answer", 9.55, 3.18]].forEach(([h, x, w]) => label(sl, h, x, 1.75, w));
  sl.addShape("line", { x: G.mx, y: 2.05, w: G.cw, h: 0, line: { color: T.ink, width: 1.25 } });
  OPP.forEach(([k, a, b, c], i) => { const y = 2.12 + i * 0.74; if (i) hline(sl, G.mx, y - 0.03, G.cw);
    sl.addImage({ path: MARK[k], x: G.mx, y: y + 0.2, w: 0.28, h: 0.28 }); txt(sl, NAME(k), G.mx + 0.38, y, 1.85, 0.68, { fontSize: 12.5, bold: true, color: T.ink, valign: "middle" });
    txt(sl, a, 2.9, y, 3.0, 0.68, { fontSize: 12, bold: true, color: ACC(k), valign: "middle" }); txt(sl, b, 6.05, y, 3.35, 0.68, { fontSize: 11.5, valign: "middle" }); txt(sl, c, 9.55, y, 3.18, 0.68, { fontSize: 11.5, color: T.ink, valign: "middle" }); });
  sl.addNotes("Opportunities are expressed as buyer triggers taken from each product's problem slides. Market sizes are deliberately not used: the only figures available (for example in the MavionLearn investor deck) are investor-only and need full citation.");

  // COMMERCIAL MODELS
  sl = add("CAT_TINT"); head(sl, "Commercial models", "Recurring subscription revenue, priced the way each buyer buys");
  const COM = [["vortex", "Per employee, per month, by module", "Published list prices: ₹45 base; modules from ₹9 to ₹55; GST extra.", "Established"],
    ["mavionlearn", "Per user, per month, annual billing", "INR pricing with volume discounts; tier matrix being confirmed.", "Established model"],
    ["pragyannxt", "Platform tiers by assessment volume", "Basic 500, Plus 5,000, Pro 25,000 assessments a month; AI credits and proctoring capacity added as needed.", "Established model"],
    ["salespulse", "Per seat, plus calling by usage", "Plans by seats and lead quota; calling ₹0.50 per leg-minute, or bring your own telephony.", "Established model"],
    ["agastya", "Subscription plans per school", "Plans, renewals and billing managed in the platform console; prices on proposal.", "Model in product"],
    ["protonnxt", "Subscription plans per tenant", "Subscription lifecycle and Razorpay billing inside the product; prices on proposal.", "Model in product"]];
  COM.forEach(([k, h, b, st], i) => { const x = G.mx + (i % 2) * 6.17, y = 1.8 + Math.floor(i / 2) * 1.33, w = 5.97;
    card(sl, x, y, w, 1.18, T.white); sl.addImage({ path: MARK[k], x: x + 0.25, y: y + 0.22, w: 0.36, h: 0.36 });
    txt(sl, h, x + 0.8, y + 0.15, w - 2.6, 0.32, { fontSize: 13.5, bold: true, color: T.ink }); pill(sl, st, x + w - 1.75, y + 0.17, 1.55, tint(ACC(k), 0.88), T.ink, 0.3, 9.5);
    txt(sl, b, x + 0.8, y + 0.52, w - 1.05, 0.6, { fontSize: 11.5 }); });
  txt(sl, "Services alongside subscriptions: implementation, data migration and managed hosting.", G.mx, 5.85, G.cw, 0.3, { fontSize: 12.5, color: T.ink, bold: true });
  txt(sl, "Prices shown are those already published in approved materials; all others are confirmed in each proposal.", G.mx, 6.2, G.cw, 0.3, { fontSize: 11, color: T.slate500 });
  sl.addNotes("Revenue models as established in the approved decks. No revenue figures are stated. Services listed are offered on maviontech.com (managed hosting) and in the company implementation method.");

  // PARTNERSHIPS, GROWTH, DIRECTION
  sl = add("CAT_CONTENT"); head(sl, "Partnerships, growth and future direction", "Where we invite partners to grow with us");
  label(sl, "Partnership models we are open to", G.mx, 1.75, 6);
  [["hand", "Channel partners", "Resell and refer MavionTech products in your region or vertical."], ["wrench", "Implementation partners", "Deliver configuration, migration and training for customers."],
   ["plug", "Technology partners", "Integrate your service with our platforms through APIs and webhooks."]].forEach(([ic, h, b], i) => {
    const y = 2.1 + i * 1.12; card(sl, G.mx, y, 5.97, 0.98, T.paper); chip(sl, CI[ic], G.mx + 0.25, y + 0.22);
    txt(sl, h, G.mx + 0.95, y + 0.13, 4.8, 0.3, { fontSize: 14, bold: true, color: T.ink }); txt(sl, b, G.mx + 0.95, y + 0.45, 4.8, 0.48, { fontSize: 11.5 }); });
  txt(sl, "No partnerships are announced in this catalogue. Integrations listed earlier are technical, not commercial.", G.mx, 5.5, 5.97, 0.5, { fontSize: 11, color: T.slate500 });
  rr(sl, 6.77, 1.75, 5.96, 4.95, T.midnight, null, 0.12);
  txt(sl, "FUTURE PRODUCT DIRECTION", 7.07, 1.98, 4, 0.25, { fontSize: 10, bold: true, charSpacing: 2, color: T.amber });
  txt(sl, "From labelled product roadmaps: planned, not yet available", 7.07, 2.25, 5.4, 0.3, { fontSize: 11, color: T.onDarkMuted });
  [["agastya", "Online fee payment, payroll, multi-channel broadcast, scheduled reports, live bus tracking, teacher and parent apps"],
   ["vortex", "Engagement surveys, benefits administration, advanced BI, native manager app; later predictive analytics and an app marketplace"],
   ["mavionlearn", "Mobile learning experience, building on today's versioned API"]].forEach(([k, t], i) => {
    const y = 2.8 + i * 1.15; sl.addImage({ path: MARK[k], x: 7.07, y: y + 0.03, w: 0.3, h: 0.3 });
    txt(sl, NAME(k), 7.5, y, 4.9, 0.32, { fontSize: 13, bold: true, color: T.white }); txt(sl, t, 7.5, y + 0.32, 4.95, 0.58, { fontSize: 11, color: T.onDarkMuted }); });
  sl.addNotes("Partnership models are invitations, not existing agreements. Roadmap items from the labelled roadmap slides of the Agastya and Vortex decks (PragyanNxt, ProtonNxt and SalesPulse publish no roadmap, so none is shown); the MavionLearn mobile app is listed as planned in the Portfolio Strategy (API for mobile, app planned).");

  // ================= SECTION 6 — CORPORATE CLOSING =================
  sec("Corporate closing");
  sl = add("CAT_DARK"); head(sl, "Why MavionTech", "Six reasons to build on MavionTech");
  [["eye", "Real products, shown as they are", "Every screen in this catalogue is a real product capture with demo data."], ["db", "Your data in its own database", "Isolation by design in all six products, not a filter on shared tables."],
   ["shield", "Governed by design", "Role-based access, audit trails and session controls you can inspect."], ["sliders", "Configurable without code", "Administrators shape dashboards, fields, workflows and branding."],
   ["landmark", "Built for how India does business", "GST, statutory payroll, INR pricing and local messaging rails."], ["layers", "One partner, six platforms", "One engineering standard and one point of contact across the portfolio."]].forEach(([ic, h, b], i) => {
    const x = G.mx + (i % 3) * 4.11, y = 1.85 + Math.floor(i / 3) * 2.35, w = 3.81; rr(sl, x, y, w, 2.1, T.midnight2, "22365A", 0.1);
    txt(sl, String(i + 1).padStart(2, "0"), x + 0.3, y + 0.25, 1, 0.45, { fontSize: 22, bold: true, color: T.amber });
    sl.addImage({ path: CW[ic], x: x + w - 0.6, y: y + 0.3, w: 0.3, h: 0.3 });
    txt(sl, h, x + 0.3, y + 0.85, w - 0.6, 0.32, { fontSize: 15, bold: true, color: T.white }); txt(sl, b, x + 0.3, y + 1.2, w - 0.6, 0.75, { fontSize: 12, color: T.onDarkMuted }); });
  sl.addNotes("Each reason is backed by earlier slides: screens (section 3), isolation and governance (section 4), configuration (technology capabilities), India-first fit (categories and commercial models).");

  sl = add("CAT_CLOSE");
  txt(sl, "LET'S BUILD MOMENTUM TOGETHER", G.mx, 1.95, 6.5, 0.3, { fontSize: 11, bold: true, charSpacing: 4, color: T.amber });
  sl.addText("Momentum for your operations. Vision for what comes next.", { placeholder: "title" });
  sl.addText("Choose a platform, see it on your own data, and start with a pilot. Partners and investors: request a portfolio briefing.", { placeholder: "body" });
  [["Book a demo", T.amber, T.midnight], ["Request a briefing", T.midnight2, T.white]].forEach(([t, f, c], i) => {
    rr(sl, G.mx + i * 2.25, 5.2, 2.05, 0.52, f, i ? "2E4468" : null, 0.26); txt(sl, t, G.mx + i * 2.25, 5.2, 2.05, 0.52, { fontSize: 13, bold: true, color: c, align: "center", valign: "middle" }); });
  rr(sl, 7.6, 1.6, 5.13, 4.6, T.midnight2, "2E4468", 0.12);
  sl.addImage({ path: LOGO, x: 7.95, y: 1.9, w: 0.62, h: 0.62 });
  sl.addText([{ text: "MavionTech Pvt. Ltd.", options: { bold: true, fontSize: 16, color: T.white, breakLine: true } }, { text: "Enterprise Business Applications", options: { fontSize: 11, color: T.onDarkMuted } }],
    { x: 8.72, y: 1.9, w: 3.8, h: 0.62, margin: 0, valign: "middle", isTextBox: true });
  [["Sales & support", "communications@maviontech.com"], ["Phone", "+91 91580 08002"], ["Careers", "hr@maviontech.com"], ["Web", "www.maviontech.com  ·  www.vortexhrms.com"],
   ["Office", "Office 505, Zen Business Center, Bhumkar Chowk, Wakad, Pune, Maharashtra 411057 (visits by appointment)"]].forEach(([a, b], i) => {
    const y = 2.8 + i * 0.62; txt(sl, a.toUpperCase(), 7.95, y, 1.5, 0.25, { fontSize: 9.5, bold: true, charSpacing: 2, color: T.amber });
    txt(sl, b, 9.45, y - 0.03, 3.1, i === 4 ? 0.72 : 0.35, { fontSize: 12, color: T.white }); });
  sl.addNotes("All contact details from maviontech.com (Contact page and footer). Social media links are not shown because none were verified on the official website during the audit.");

  await pres.writeFile({ fileName: OUT });
  console.log("written", OUT, pres.slides.length, "slides");
})().catch(e => { console.error(e); process.exit(1); });
