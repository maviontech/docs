// MavionLearn_Final.pptx — sales narrative only (investor content excluded)
const fs = require("fs");
const pptxgen = require("pptxgenjs");
const M = require("./mt");
const { makeKit } = require("./deckkit");
const { T, TYPE, G, tint, frame, iconChip, caption, card } = M;
const MD = M.ROOT + "/02_Working_Notes/ml_media/";
const OUTDIR = M.ROOT + "/Final_Product_Decks/MavionLearn";
const OUT = process.env.OUT || (OUTDIR + "/MavionLearn_Final.pptx");
fs.mkdirSync(OUTDIR, { recursive: true });
const SB = 0; // captures are 800px: show full app chrome, never clip content
const IMG = {
  dash: { src: MD + "I01_image-1-3.png", alt: "Learning admin dashboard" },
  courses: { src: MD + "I07_image-7-5.png", alt: "Courses" },
  campaigns: { src: MD + "I09_image-9-1.png", alt: "Compliance campaigns" },
  compliance: { src: MD + "I09_image-9-2.png", alt: "Compliance report" },
  reports: { src: MD + "I11_image-11-4.png", alt: "Enterprise reports" },
  roi: { src: MD + "I11_image-11-5.png", alt: "Cost & ROI" },
  sso: { src: MD + "I12_image-12-4.png", alt: "Single sign-on settings" },
  tenants: { src: MD + "I13_image-13-5.png", alt: "Platform console: tenants" },
  observ: { src: MD + "S13_image26.jpg", alt: "Platform console: observability" },
  home: { src: MD + "I14_image-14-4.png", alt: "Learner home" },
  grow: { src: MD + "I14_image-14-5.png", alt: "Grow view" },
  catalog: { src: MD + "I18_image-18-7.png", alt: "Learner catalog" },
  sessions: { src: MD + "I18_image-18-8.png", alt: "ILT/VILT sessions" },
  certs: { src: MD + "I18_image-18-9.png", alt: "Learner certificates" },
  matrix: { src: MD + "S06_image16.jpg", alt: "Skill matrix" },
};
const ICONS = { target: "LuTarget", shield: "LuShieldCheck", chart: "LuChartColumn", key: "LuKeyRound", book: "LuBookOpen", play: "LuPlay",
  video: "LuVideo", users: "LuUsers", user: "LuUserCheck", grad: "LuGraduationCap", award: "LuAward", bell: "LuBell", file: "LuFileSpreadsheet",
  filter: "LuFilter", wallet: "LuWallet", clock: "LuClock", trend: "LuTrendingUp", layers: "LuLayers", db: "LuDatabase", lock: "LuLock",
  cloud: "LuCloud", gauge: "LuGauge", repeat: "LuRepeat", upload: "LuUpload", building: "LuBuilding2", sliders: "LuSlidersHorizontal",
  calendar: "LuCalendarDays", list: "LuListChecks", star: "LuStar", compass: "LuCompass", link: "LuLink", code: "LuCode", palette: "LuPalette",
  sparkle: "LuSparkles", eye: "LuEye", search: "LuSearch", puzzle: "LuPuzzle", server: "LuServer", flag: "LuFlag", rocket: "LuRocket", phone: "LuSmartphone" };

(async () => {
  const pres = new pptxgen(); pres.layout = "LAYOUT_WIDE";
  pres.author = "MavionTech Pvt. Ltd."; pres.company = "MavionTech Pvt. Ltd."; pres.title = "MavionLearn — Enterprise LMS · Skills & Compliance";
  pres.theme = { headFontFace: M.FONT.head, bodyFontFace: M.FONT.body };
  const A = M.PRODUCTS.mavionlearn.accent;
  M.defineLayouts(pres, "mavionlearn", await M.darkBg(A, "bg_cover_mavionlearn.png", "cover"), await M.darkBg(A, "bg_divider_mavionlearn.png", "divider"));
  const K = await makeKit(pres, "mavionlearn", "ml", ICONS);
  const { ic, txt } = K;
  const mark = M.ASSETS + "/mavionlearn_mark.png";
  const close = Object.assign({}, IMG); // alias
  const cu = (k, crop) => Object.assign({}, IMG[k], { crop }); // with crop

  // 1 COVER
  K.sec("Opening");
  let sl = K.add("MT_COVER");
  K.cover(sl, { name: "MavionLearn", category: "Enterprise LMS · Skills & Compliance", mark,
    promise: "Skills that compound: training that becomes provable capability",
    support: "A multi-tenant enterprise LMS that scores every employee against role targets, runs compliance on its own, and reports in your brand, with identity built in.",
    chips: ["Isolated database per tenant", "SSO · SCIM", "Excel & PDF reports"] });
  await K.coverShots(sl, IMG.dash, IMG.home, "MavionLearn · Learning admin");
  sl.addNotes("Opening. MavionLearn is MavionTech's multi-tenant enterprise LMS. Screens are from the product with a demo tenant (Globex Inc). Tagline: Skills that compound.");

  // 2 PROBLEM
  sl = K.add(); K.head(sl, "The problem", "Training spend is up, but capability is still a guess");
  K.iconCards(sl, [["target", "Completions ≠ capability", "Finishing a course doesn't prove a skill or show which gaps remain."],
    ["shield", "Compliance is a fire drill", "Mandatory training is chased and tracked by hand, then rebuilt at audit time."],
    ["chart", "Reporting is slow", "Generic exports that take days and are never board-ready."],
    ["layers", "Learning is fragmented", "Video, LMS and live sessions sit in disconnected tools."],
    ["key", "Identity is hard", "Provisioning, SSO and deprovisioning are set up again for every vendor."],
    ["wallet", "ROI is invisible", "Leadership can't see what training spend actually returns."]], 3, 1.8, 2.2);
  sl.addNotes("Six recurring problems in enterprise learning. MavionLearn addresses each with a specific module, shown on the following slides.");

  // 3 SOLUTION
  sl = K.add(); K.head(sl, "The solution", "One system that turns training into capability");
  [["target", "Measure capability", "A living skill matrix scores every employee against the levels their role needs, and shows the exact gaps."],
   ["shield", "Automate compliance", "Rule-based campaigns assign, remind, track and certify. Audit-ready by default."],
   ["chart", "Prove ROI", "Cost per completion, training hours and spend: the numbers leadership asks for."]].forEach(([icn, h, b], i) => {
    const y = 1.85 + i * 1.5; iconChip(sl, ic[icn], G.mx, y, A, 0.56);
    txt(sl, h, G.mx + 0.75, y - 0.02, 3.85, 0.32, { fontSize: TYPE.h3, bold: true, color: T.ink });
    txt(sl, b, G.mx + 0.75, y + 0.32, 3.85, 0.95, { fontSize: 13 }); });
  frame(sl, await K.S(IMG.dash, 7.13, 4.3), 5.6, 1.8, 7.13, 4.3, { url: "MavionLearn · Learning admin", alt: "Learning admin dashboard" });
  caption(sl, "Learning admin: enrolments, compliance %, completions by department and items needing attention (demo data).", 5.6, 6.2, 7.13);
  sl.addNotes("Three pillars structure the rest of the deck: measure, automate, prove.");

  // 4 PERSONAS
  sl = K.add("MT_CONTENT_TINT"); K.head(sl, "Who it serves", "Built for the people who own learning, compliance and identity");
  K.iconCards(sl, [["sliders", "L&D and HR admins", "Author courses, run campaigns, issue certificates and report."],
    ["building", "Delegated admins", "Department-scoped administration for large, distributed organisations."],
    ["shield", "Compliance leads", "Mandatory training by audience, with audit-ready evidence."],
    ["users", "Managers", "See their team's progress, skills and gaps."],
    ["grad", "Learners", "A personal home with skill tracks, recommendations and certificates."],
    ["key", "IT and identity teams", "SSO, SCIM provisioning and an isolated tenant database."]], 3, 1.8, 2.15, 0.3, true);
  sl.addNotes("The economic buyers are the CHRO, the head of L&D and compliance leaders; IT is a key influencer because identity and isolation come built in.");

  // 5 MODULE MAP
  K.sec("Platform");
  sl = K.add("MT_CONTENT_TINT"); K.head(sl, "Product map", "Twelve modules across five capabilities, in one platform");
  const groups = [["book", "Learn", ["Catalog & courses", "On-demand learning", "Live learning (ILT / VILT)", "Learner experience"]],
    ["target", "Measure", ["Skills & skill matrix, development plans"]],
    ["shield", "Comply", ["Compliance campaigns & certifications"]],
    ["chart", "Report", ["Enterprise reporting", "Cost & ROI"]],
    ["lock", "Govern", ["People & delegated admin", "Identity & security", "Standards & integrations", "Platform console"]]];
  const cw5 = (G.cw - 4 * 0.25) / 5;
  groups.forEach(([icn, h, items], i) => { const x = G.mx + i * (cw5 + 0.25), y = 1.75, ch = 3.75;
    card(sl, x, y, cw5, ch, T.white); iconChip(sl, ic[icn], x + 0.25, y + 0.25, A, 0.5);
    txt(sl, h, x + 0.25, y + 0.9, cw5 - 0.5, 0.32, { fontSize: TYPE.h3, bold: true, color: T.ink });
    txt(sl, `${items.length} module${items.length > 1 ? "s" : ""}`, x + 0.25, y + 1.22, cw5 - 0.5, 0.24, { fontSize: 10.5, bold: true, color: A });
    sl.addText(items.map((t, k) => ({ text: t, options: { bullet: { indent: 12 }, breakLine: k < items.length - 1 } })),
      { x: x + 0.25, y: y + 1.6, w: cw5 - 0.45, h: ch - 1.7, margin: 0, fontSize: 12.5, color: T.slate700, valign: "top", paraSpaceAfter: 4, isTextBox: true }); });
  sl.addShape("roundRect", { x: G.mx, y: 5.75, w: G.cw, h: 0.62, rectRadius: 0.1, fill: { color: tint(A, 0.9) }, line: { type: "none" } });
  sl.addImage({ path: ic.db, x: G.mx + 0.25, y: 5.91, w: 0.3, h: 0.3 });
  sl.addText([{ text: "One isolated database per customer.  ", options: { bold: true, color: T.ink } }, { text: "Each tenant's data, brand and controls stay in its own database, white-labelled across the app, exports and certificates.", options: { color: T.slate700 } }],
    { x: G.mx + 0.7, y: 5.75, w: G.cw - 0.9, h: 0.62, margin: 0, fontSize: 13, valign: "middle", isTextBox: true });
  sl.addNotes("Twelve modules, grouped by what they do for the buyer. Each one is covered on the following slides.");

  // 6 USPs
  sl = K.add(); K.head(sl, "Why MavionLearn", "Others track completions; MavionLearn proves capability");
  K.iconCards(sl, [["target", "Capability, not completions", "Scored against role targets; each completed course raises real skill levels (slides 9–10)."],
    ["shield", "Compliance that runs itself", "Assign, remind, certify and renew automatically (slides 11–12)."],
    ["key", "Identity built in", "OIDC, SAML 2.0 and SCIM included, not a paid add-on (slide 17)."],
    ["db", "One isolated database per tenant", "Zero shared rows; isolation you can verify in the console (slides 19–20)."],
    ["file", "Reports in your brand", "Board-ready Excel and PDF with your name on top (slide 13)."],
    ["video", "Live and on-demand together", "ILT/VILT sessions and self-paced learning in one place (slide 8)."]], 3, 1.8, 2.15);
  sl.addNotes("Each differentiator points to the slide that proves it.");

  // 7 CATALOG
  K.sec("Learn");
  sl = K.add(); K.head(sl, "Catalog & courses", "Author once, deliver to every audience");
  await K.heroFeature(sl, cu("courses", [SB, 0]), [["layers", "Structured authoring", "Courses, modules and lessons, with drafts and publishing."],
    ["repeat", "Lifecycle control", "Deactivate and reactivate courses without losing history."],
    ["puzzle", "Standard content", "SCORM packages, video, readings and graded quizzes."],
    ["users", "Targeted delivery", "Assign by audience or let learners self-enrol from the catalog."]],
    "Course administration: status, lessons and enrolments per course (demo data).", false, "Courses");
  sl.addNotes("Admins author courses as modules and lessons, keep drafts, and deactivate or reactivate content. Learners browse the catalog to self-enrol.");

  // 8 LIVE + ON-DEMAND
  sl = K.add(); K.head(sl, "Live & on-demand", "Learn live or on-demand, in one place");
  await K.twoShots(sl, Object.assign(cu("sessions", [SB, 0]), { cap: "ILT and VILT sessions: schedule, roster and status (demo data)." }),
    Object.assign(cu("catalog", [SB, 0]), { cap: "Learner catalog: on-demand courses ready to start." }),
    [["play", "On-demand", "Video, readings, SCORM and graded quizzes."], ["calendar", "Live & virtual", "ILT and VILT sessions with rosters."],
     ["bell", "Calendar invites", ".ics invites sent to participants."], ["video", "Never fall behind", "Recordings published automatically after a session."]]);
  sl.addNotes("Instructor-led and virtual sessions are scheduled with rosters and .ics invites; recordings are auto-published so a missed session never becomes a compliance gap. The original deck's video-player and live-classroom images were layout mockups, so they are not shown.");

  // 9 SKILL MATRIX
  K.sec("Measure");
  sl = K.add(); K.head(sl, "Skill matrix · the differentiator", "See capability across the whole organisation");
  const r = await K.heroFeature(sl, Object.assign({}, IMG.matrix, { fw: 7.55, fh: 4.0 }), [["target", "Role targets per skill", "Define the level each role needs; everyone is scored against it."],
    ["gauge", "Live match %", "Per person, per department and for the whole organisation."],
    ["trend", "Training that compounds", "Completing a course raises the learner's real skill level."]], "Skill matrix: employees scored against role targets (demo data).", true, "Skill matrix");
  sl.addShape("roundRect", { x: r.cx, y: 5.35, w: r.cw, h: 0.95, rectRadius: 0.1, fill: { color: T.midnight }, line: { type: "none" } });
  txt(sl, "73.6%", r.cx + 0.25, 5.35, 1.6, 0.95, { fontSize: 30, bold: true, color: T.amber, valign: "middle" });
  txt(sl, "organisation capability match in the demo tenant (demo data)", r.cx + 1.85, 5.35, r.cw - 2.0, 0.95, { fontSize: 11.5, color: T.onDarkMuted, valign: "middle" });
  sl.addNotes("The flagship. Competitors measure completions; MavionLearn measures capability against role targets and updates it automatically as courses are completed. 73.6% is a demo-tenant figure.");

  // 10 GROW
  sl = K.add(); K.head(sl, "Grow & development plans", "Every gap turns into the next best course");
  await K.heroFeature(sl, cu("grow", [SB, 0]), [["compass", "Priority skill gaps", "Each learner sees the gaps between their level and their role target."],
    ["sparkle", "Recommended courses", "Courses recommended to close each gap."],
    ["list", "Development plans", "Plans that track progress towards target levels."],
    ["trend", "My skills", "Current level per skill, rising as courses are completed."]],
    "Grow view: priority skill gaps, recommended courses and current skill levels (demo data).", false, "Grow · My skills");
  sl.addNotes("The Grow view turns role gaps into the next best course; development plans are available in the Pro tier per the sales deck.");

  // 11 COMPLIANCE
  K.sec("Comply");
  sl = K.add(); K.head(sl, "Compliance campaigns", "Compliance that runs itself");
  frame(sl, await K.S(cu("campaigns", [SB, 0]), 7.55, 3.55), G.mx, 1.75, 7.55, 3.55, { url: "Campaigns", alt: "Compliance campaign builder" });
  caption(sl, "Campaign builder: audience, course, schedule and status (demo data).", G.mx, 5.38, 7.55);
  [["users", "Rule-based audiences", "Target by department, role, team or the whole organisation."], ["repeat", "Recurring by design", "Campaigns repeat on schedule, with automatic reminders."],
   ["award", "Certificates on completion", "Issued automatically, with expiry tracking."]].forEach(([icn, h, b], i) => K.feat(sl, ic[icn], h, b, 8.55, 1.85 + i * 1.15, 4.18));
  K.flow(sl, ["Define rule", "Assign", "Remind", "Complete", "Certify", "Renew"], 5.85, 4);
  sl.addNotes("Campaigns assign mandatory courses by rule, remind automatically, track status per employee and issue certificates with expiry, which then feed renewal.");

  // 12 AUDIT EVIDENCE
  sl = K.add(); K.head(sl, "Compliance evidence", "Audit-ready evidence in one click");
  await K.twoShots(sl, Object.assign(cu("compliance", [SB, 0]), { cap: "Compliance report: per-employee status, by department, exportable (demo data)." }),
    Object.assign(cu("certs", [SB, 0]), { cap: "Learner certificates with issue and expiry dates." }),
    [["building", "By department", "Compliance status per department and course."], ["flag", "Overdue flags", "Know who is late before the audit."],
     ["file", "Excel and PDF", "Evidence exported in your brand."], ["clock", "Expiry & renewal", "Certificates tracked with renewal reminders."]]);
  sl.addNotes("Auditors get per-employee evidence in branded Excel and PDF; certificates carry expiry dates and renewal reminders.");

  // 13 REPORTS
  K.sec("Report");
  sl = K.add(); K.head(sl, "Enterprise reporting", "Board-ready reporting in one click");
  await K.heroFeature(sl, cu("reports", [SB, 0]), [["list", "8 built-in reports", "Enrolment, compliance, courses, learners, certifications, ROI and more."],
    ["filter", "Filter and drill down", "Date ranges, departments and record-level detail."],
    ["file", "Premium exports", "Light-themed Excel workbooks and boardroom PDFs."],
    ["palette", "In your brand", "White-labelled with your name on top."]],
    "Reports workspace: organisation summary and the eight report types (demo data).", true, "Reports");
  sl.addNotes("Eight enterprise reports with filters and drill-downs, exported as premium Excel or PDF in the customer's brand.");

  // 14 ROI
  sl = K.add(); K.head(sl, "Cost & ROI", "Prove the return on every training rupee");
  await K.heroFeature(sl, cu("roi", [SB, 0]), [["wallet", "Per-course cost model", "Set a cost per learner; spend rolls up against real completions."],
    ["gauge", "One-screen ROI", "Total spend, cost per completion and hours delivered."],
    ["file", "Finance-ready", "Export the numbers leadership asks for."]],
    "Cost & ROI: total spend, completions and effective cost per completion of ₹1,800 (demo data).", false, "Cost & ROI");
  sl.addNotes("Cost per completion and hours delivered turn training spend into defensible numbers. Figures shown are demo data.");

  // 15 LEARNER
  K.sec("Experience & governance");
  sl = K.add(); K.head(sl, "Learner experience", "A learner home that drives real progress");
  await K.heroFeature(sl, cu("home", [SB, 0]), [["star", "Personalised home", "Skill tracks, progress and what to do next."],
    ["play", "Continue learning", "Pick up exactly where you left off."],
    ["sparkle", "Recommendations", "Courses suggested from role gaps."],
    ["award", "Certificates", "Issued automatically, with expiry reminders."]],
    "My Learning: active skill track, progress, continue learning and required courses (demo data).", true, "My Learning");
  sl.addNotes("The employee side: a personalised, skills-first home that keeps certifications current.");

  // 16 PEOPLE
  sl = K.add(); K.head(sl, "People & administration", "Run large organisations safely");
  K.iconCards(sl, [["upload", "Bulk onboarding", "Create employees one by one or import them by CSV, with profile photos."],
    ["building", "Delegated administrators", "Department-scoped admins manage only their part of the organisation."],
    ["users", "Audiences that follow the org", "Departments, roles and teams drive campaigns, reports and skill targets."]], 3, 1.8, 2.2);
  // org diagram
  const y0 = 4.35, bx = (x, y, w, t, dark) => { sl.addShape("roundRect", { x, y, w, h: 0.6, rectRadius: 0.08, fill: { color: dark ? T.midnight : T.white }, line: { color: dark ? T.midnight : T.line, width: 0.75 } });
    txt(sl, t, x, y, w, 0.6, { fontSize: 12.5, bold: true, color: dark ? T.white : T.ink, align: "center", valign: "middle" }); };
  bx(4.9, y0, 3.5, "Tenant admin (whole organisation)", true);
  ["Sales · delegated admin", "Operations · delegated admin", "Engineering · delegated admin"].forEach((t, i) => { const x = G.mx + 0.4 + i * 4.1;
    K.line(sl, 6.65, y0 + 0.6, x + 1.65, y0 + 1.15);
    bx(x, y0 + 1.15, 3.3, t, false); });
  sl.addNotes("Bulk employee onboarding by CSV, and department-scoped delegated administrators for large organisations. The department names in the diagram are illustrative.");

  // 17 IDENTITY
  sl = K.add(); K.head(sl, "Identity & security", "Enterprise identity, built in rather than bolted on");
  await K.heroFeature(sl, cu("sso", [SB, 0]), [["key", "SSO: OIDC and SAML 2.0", "Per-tenant policy: off, optional or enforced, with break-glass access."],
    ["repeat", "SCIM 2.0 and JIT", "Automated provisioning and deprovisioning; accounts created just in time."],
    ["lock", "Secure by design", "Signed-URL media, audit logging, rate limiting and an auth gate on every page."]],
    "Single sign-on settings for a tenant (demo data).", false, "Settings · Single sign-on");
  sl.addNotes("SSO, SCIM and JIT are configured per tenant. Break-glass access keeps admins in if the identity provider is unavailable.");

  // 18 STANDARDS
  sl = K.add("MT_CONTENT_TINT"); K.head(sl, "Standards & integrations", "Fits the identity and content standards you already use");
  [["key", "OIDC", "Single sign-on"], ["key", "SAML 2.0", "Single sign-on"], ["repeat", "SCIM 2.0", "User provisioning"], ["puzzle", "SCORM", "Packaged e-learning content"],
   ["link", "LTI 1.3", "Learning tool interoperability"], ["code", "API", "Versioned API"], ["calendar", ".ics", "Calendar invites for sessions"], ["cloud", "Cloudflare R2 / S3", "Per-tenant media storage"]].forEach(([icn, h, b], i) => {
    const w = (G.cw - 3 * 0.3) / 4, x = G.mx + (i % 4) * (w + 0.3), y = 1.8 + Math.floor(i / 4) * 2.0;
    card(sl, x, y, w, 1.7, T.white); iconChip(sl, ic[icn], x + 0.28, y + 0.3, A, 0.5);
    txt(sl, h, x + 0.95, y + 0.3, w - 1.15, 0.35, { fontSize: 16, bold: true, color: T.ink });
    txt(sl, b, x + 0.95, y + 0.7, w - 1.15, 0.7, { fontSize: 12 }); });
  K.note(sl, "Excel and PDF exports are generated in the customer's brand. LTI and API access are part of the Premium tier (per the current price list).", 5.95, 0.62);
  sl.addNotes("Standards and integrations stated in MavionTech's product materials. xAPI appears only in the investor deck and is not claimed here pending confirmation.");

  // 19 ARCHITECTURE
  sl = K.add(); K.head(sl, "Architecture", "True multi-tenant isolation: a dedicated database per customer");
  const col = (t, x, w) => txt(sl, t.toUpperCase(), x, 1.7, w, 0.25, { fontSize: 10, bold: true, charSpacing: 2, color: T.slate500 });
  const box = (x, y, w, h, hd, sub, o = {}) => { sl.addShape("roundRect", { x, y, w, h, rectRadius: 0.08, fill: { color: o.fill || T.white }, line: { color: o.line || T.line, width: o.lw || 0.75 } });
    sl.addText([{ text: hd, options: { bold: true, fontSize: 12.5, color: o.hc || T.ink, breakLine: !!sub } }].concat(sub ? [{ text: sub, options: { fontSize: 10.5, color: o.sc || T.slate500 } }] : []), { x: x + 0.15, y, w: w - 0.3, h, margin: 0, valign: "middle", isTextBox: true }); };
  const arrow = (x1, y1, x2, y2) => sl.addShape("line", { x: x1, y: y1, w: x2 - x1, h: y2 - y1, line: { color: T.slate300, width: 1.25, endArrowType: "triangle" } });
  col("Users & identity", G.mx, 2.6);
  [["Learners & managers", "Web app, server-rendered"], ["Admins & delegated admins", "Per-tenant console"], ["Identity provider", "OIDC · SAML 2.0 · SCIM 2.0"]].forEach(([h, t], i) => box(G.mx, 2.05 + i * 1.05, 2.6, 0.82, h, t));
  col("MavionLearn application", 3.65, 3.4);
  sl.addShape("roundRect", { x: 3.65, y: 2.05, w: 3.4, h: 3.92, rectRadius: 0.1, fill: { color: T.midnight }, line: { type: "none" } });
  ["Auth gate on every page", "SSO policy + break-glass", "Rate limiting", "Audit logging", "Versioned API"].forEach((t, i) => { const y = 2.27 + i * 0.73;
    sl.addShape("ellipse", { x: 3.88, y: y + 0.08, w: 0.36, h: 0.36, fill: { color: A }, line: { type: "none" } });
    txt(sl, String(i + 1), 3.88, y + 0.08, 0.36, 0.36, { fontSize: 11, bold: true, color: T.white, align: "center", valign: "middle" });
    txt(sl, t, 4.38, y, 2.55, 0.52, { fontSize: 12.5, color: T.white, valign: "middle" }); });
  [2.46, 3.51, 4.56].forEach(y => arrow(3.2, y, 3.65, y));
  col("Per-tenant data", 7.5, 2.8);
  box(7.5, 2.05, 2.8, 0.85, "tenant: Globex", "Isolated MySQL database", { fill: tint(A, 0.92), line: tint(A, 0.6) });
  box(7.5, 3.05, 2.8, 0.85, "tenant: Northwind", "Isolated MySQL database", { fill: tint(A, 0.92), line: tint(A, 0.6) });
  box(7.5, 4.05, 2.8, 0.85, "One database per customer", "Zero shared rows", { fill: tint(A, 0.92), line: tint(A, 0.6) });
  box(7.5, 5.05, 2.8, 0.85, "Media storage", "Cloudflare R2 / S3 · signed URLs", { line: T.amber, lw: 1.5 });
  [2.47, 3.47, 4.47].forEach(y => arrow(7.05, y, 7.5, y));
  col("Operations", 10.65, 2.1);
  [["Platform console", "Tenants & plans"], ["Live health", "Across the fleet"], ["Metering", "Usage per tenant"], ["Self-healing schema", "Zero-downtime upgrades"]].forEach(([h, t], i) => box(10.65, 2.05 + i * 0.98, 2.08, 0.82, h, t));
  sl.addNotes("Each customer gets its own MySQL database, with no shared rows, verifiable from the platform console. Tenant names are demo tenants.");

  // 20 OPERATIONS
  sl = K.add(); K.head(sl, "Operated with confidence", "Isolation you can verify, health you can see");
  await K.twoShots(sl, Object.assign({}, IMG.tenants, { cap: "Platform console: tenants, plans, storage and features (demo data)." }),
    Object.assign({}, IMG.observ, { cap: "Observability: tenant databases, schema status and health." }),
    [["db", "Verifiable isolation", "Every tenant's database listed in the console."], ["repeat", "Self-healing schema", "Tenants kept current, with no downtime."],
     ["gauge", "Health & metering", "Live status and usage across tenants."], ["palette", "White-labelled", "Each tenant's brand across app, exports and certificates."]]);
  sl.addNotes("MavionTech operators manage tenants, plans and storage from the platform console, with live health and metering.");

  // 21 COMPARISON
  K.sec("Value & next steps");
  sl = K.add("MT_DARK"); K.head(sl, "Why MavionLearn", "What changes compared with a generic LMS");
  K.compare(sl, "Generic LMS", "With MavionLearn", [["Capability", "Measures completions", "Living skill matrix against role targets"],
    ["Compliance", "Tracked by hand", "Self-running: assign, remind, certify"], ["Reporting", "Generic CSV dumps", "Board-ready Excel and PDF in your brand"],
    ["Identity", "Often a paid add-on", "OIDC, SAML 2.0 and SCIM included"], ["Isolation", "Shared schema", "One isolated database per tenant"],
    ["Learning", "Separate live and video tools", "ILT, VILT and on-demand together"]],
    [["target", "Capability you can see", "Skill levels rise as courses are completed."], ["shield", "Audit-ready by default", "Evidence exported in one click."],
     ["key", "Identity included", "SSO and SCIM in the product."], ["db", "Isolated by design", "A database per customer."]]);
  sl.addNotes("The comparison describes common generic-LMS patterns, not any named competitor. Every 'With MavionLearn' cell maps to a capability shown earlier.");

  // 22 GETTING STARTED
  sl = K.add(); K.head(sl, "Getting started", "Start with a 30-day, all-features trial");
  [["rocket", "Trial", "30 days with every feature, so you can prove value on your own content."], ["cloud", "Deploy your way", "Multi-tenant SaaS; private cloud or on-premise available on request."],
   ["upload", "Onboard fast", "Import employees by CSV, connect SSO and SCIM, publish courses."], ["shield", "Run your first campaign", "Assign a compliance course by audience and watch evidence build."]].forEach(([icn, h, b], i) => {
    const w = G.cw / 4, x = G.mx + i * w;
    txt(sl, `STEP ${i + 1}`, x, 1.95, w - 0.2, 0.3, { fontSize: 10.5, bold: true, charSpacing: 2, color: A });
    sl.addShape("ellipse", { x, y: 2.43, w: 0.24, h: 0.24, fill: { color: i === 0 ? T.amber : A }, line: { color: T.white, width: 2 } });
    iconChip(sl, ic[icn], x, 3.0, A, 0.5);
    txt(sl, h, x, 3.7, w - 0.3, 0.35, { fontSize: TYPE.h3, bold: true, color: T.ink });
    txt(sl, b, x, 4.1, w - 0.35, 1.4, { fontSize: 13 }); });
  sl.addShape("line", { x: G.mx, y: 2.55, w: G.cw, h: 0, line: { color: T.line, width: 1.5 } });
  K.note(sl, "Pricing is per user per month in INR, with annual billing and volume discounts on request. The tier details are being confirmed and will be shared in your proposal.", 5.3, 0.62);
  sl.addNotes("Trial: 30 days, all features (both source decks). Deployment options per the sales deck and maviontech.com. A pricing slide is deliberately omitted until the tier matrix is confirmed (the sales and investor decks differ).");

  // 23 CLOSE
  sl = K.add("MT_CLOSE");
  K.close(sl, { title: "See capability compound from week one", body: "Start a 30-day trial or book a walkthrough with your own courses and org structure.", subtitle: "MavionLearn · Enterprise LMS", second: "Start a free trial" });
  sl.addNotes("One ask: a trial or a walkthrough. Official MavionTech contact details.");

  await pres.writeFile({ fileName: OUT });
  console.log("written", OUT, pres.slides.length, "slides");
})();
