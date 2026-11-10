// ProtonNxt_Final.pptx — consolidated from 42 slides; real-tenant screens excluded for privacy
const fs = require("fs");
const pptxgen = require("pptxgenjs");
const M = require("./mt");
const { makeKit } = require("./deckkit");
const { T, TYPE, G, tint, frame, iconChip, caption, card } = M;
const PM = M.ROOT + "/02_Working_Notes/pr_media/";
const OUTDIR = M.ROOT + "/Final_Product_Decks/Protonnxt";
const OUT = process.env.OUT || (OUTDIR + "/Protonnxt_Final.pptx");
fs.mkdirSync(OUTDIR, { recursive: true });
const sb = w => Math.round(w * 0.155); // sidebar crop
const I = (f, w, close = false, top = 0) => ({ src: PM + f, crop: [close ? sb(w) : 0, top] });
const IMG = {
  dash: I("P07_image3.png", 3360), jds: I("P09_image5.png", 3360, true), upload: I("P12_image8.png", 1713),
  status: I("P16_image12.png", 3360, true), team: I("P15_image11.png", 3360, true), offer: I("P17_image13.png", 2860, true),
  reports: I("P20_image15.png", 3360, true), exec: I("P21_image16.png", 3360, true), builder: I("P23_image17.png", 3360, true),
  leader: I("P27_image19.png", 3360, true), compare: I("P28_image20.png", 3360, true), tune: I("P30_image22.png", 3360, true),
  subs: I("P32_image24.png", 3360, true), sessions: I("P33_image25.png", 3360, true), schema: I("P34_image26.png", 3360, true),
};
const ICONS = { file: "LuFileText", users: "LuUsers", user: "LuUserCheck", eye: "LuEye", chart: "LuChartColumn", hand: "LuHandshake", clock: "LuClock",
  inbox: "LuInbox", search: "LuSearch", upload: "LuUpload", sparkle: "LuSparkles", link: "LuLink", globe: "LuGlobe", copy: "LuCopy", list: "LuListChecks",
  calendar: "LuCalendarDays", video: "LuVideo", bell: "LuBell", wallet: "LuWallet", award: "LuAward", building: "LuBuilding2", briefcase: "LuBriefcase",
  phone: "LuSmartphone", lock: "LuLock", fingerprint: "LuFingerprint", wifi: "LuWifi", moon: "LuMoon", db: "LuDatabase", shield: "LuShieldCheck",
  sliders: "LuSlidersHorizontal", layers: "LuLayers", target: "LuTarget", gauge: "LuGauge", trend: "LuTrendingUp", share: "LuShare2", key: "LuKeyRound",
  grid: "LuLayoutGrid", filter: "LuFilter", sheet: "LuFileSpreadsheet", radar: "LuRadar", info: "LuInfo", repeat: "LuRepeat", star: "LuStar",
  mail: "LuMail", cpu: "LuCpu", code: "LuCode", radio: "LuRadio", check: "LuCheck", flag: "LuFlag", rocket: "LuRocket", msg: "LuMessagesSquare", form: "LuClipboardList" };

(async () => {
  const pres = new pptxgen(); pres.layout = "LAYOUT_WIDE";
  pres.author = "MavionTech Pvt. Ltd."; pres.company = "MavionTech Pvt. Ltd."; pres.title = "ProtonNxt — Enterprise Applicant Tracking";
  pres.theme = { headFontFace: M.FONT.head, bodyFontFace: M.FONT.body };
  const A = M.PRODUCTS.protonnxt.accent;
  M.defineLayouts(pres, "protonnxt", await M.darkBg(A, "bg_cover_protonnxt.png", "cover"), await M.darkBg(A, "bg_divider_protonnxt.png", "divider"));
  const K = await makeKit(pres, "protonnxt", "pr", ICONS);
  const { ic, icW, txt } = K;
  const mark = PM + "P01_image1.png";
  const colLabel = (sl, t, x, w, y = 1.7) => txt(sl, t.toUpperCase(), x, y, w, 0.25, { fontSize: 10, bold: true, charSpacing: 2, color: T.slate500 });
  const sbox = (sl, x, y, w, h, hd, sub, o = {}) => { sl.addShape("roundRect", { x, y, w, h, rectRadius: 0.08, fill: { color: o.fill || T.white }, line: { color: o.line || T.line, width: o.lw || 0.75 } });
    sl.addText([{ text: hd, options: { bold: true, fontSize: o.hs || 12.5, color: o.hc || T.ink, breakLine: !!sub } }].concat(sub ? [{ text: sub, options: { fontSize: 10.5, color: o.sc || T.slate500 } }] : []), { x: x + 0.15, y, w: w - 0.3, h, margin: 0, valign: "middle", isTextBox: true }); };

  // 1 COVER
  K.sec("Opening");
  let sl = K.add("MT_COVER");
  K.cover(sl, { name: "ProtonNxt", category: "Enterprise Applicant Tracking", mark,
    promise: "From requisition to hire, in one structured pipeline",
    support: "A multi-tenant, AI-assisted ATS for recruitment firms and talent teams: sourcing, parsing, interviews, offers, client insight and a candidate portal.",
    chips: ["15 modules", "AI resume parsing", "Isolated tenants"] });
  await K.coverShots(sl, IMG.dash, Object.assign({}, IMG.status, { alt: "Candidate status" }), "ProtonNxt · Admin dashboard");
  sl.addNotes("Opening. ProtonNxt is MavionTech's multi-tenant applicant tracking system. All screens use a demo tenant (customers such as TechCorp Solutions and Nova Retail Systems are demo data).");

  // 2 PROBLEM
  sl = K.add(); K.head(sl, "The challenge", "Where hiring breaks down");
  K.iconCards(sl, [["file", "Manual screening", "Recruiters read every resume by hand while volume keeps rising."],
    ["user", "Unclear ownership", "Nobody is sure who owns which requisition, so idle JDs go unnoticed."],
    ["msg", "Context lost in email", "Interview feedback and offers live in inboxes and attachments."],
    ["chart", "Improvised metrics", "Monday reviews start with someone rebuilding numbers in a spreadsheet."],
    ["hand", "No client insight", "Recruitment firms can't see which clients are growing and which are slipping."],
    ["inbox", "Ungoverned agencies", "Vendor CVs arrive as forwarded email with no caps, duplicates or audit."]], 3, 1.8, 2.2);
  sl.addNotes("The six recurring problems in recruitment operations. Each maps to a ProtonNxt module later in the deck.");

  // 3 SOLUTION
  sl = K.add(); K.head(sl, "One platform, three experiences", "Recruiters, administrators and candidates on one system");
  [["briefcase", "Recruiter workspace", ["Requisitions, intake and tracking", "Interviews, offers and joining", "Reports and client analytics"]],
   ["sliders", "Tenant administration", ["Users, roles and teams", "Custom candidate schema", "Subscription, sessions and notifications"]],
   ["globe", "Candidate & partner surfaces", ["Branded careers URL", "Invite-based uploads and vendor portal", "Candidate portal across employers"]]].forEach(([icn, h, items], i) => {
    const w = (G.cw - 0.6) / 3, x = G.mx + i * (w + 0.3); card(sl, x, 1.8, w, 2.9, i === 0 ? T.white : T.paper); iconChip(sl, ic[icn], x + 0.3, 2.05, A, 0.56);
    txt(sl, h, x + 0.3, 2.8, w - 0.6, 0.35, { fontSize: TYPE.h3, bold: true, color: T.ink });
    sl.addText(items.map((t, k) => ({ text: t, options: { bullet: { indent: 14 }, breakLine: k < 2 } })), { x: x + 0.3, y: 3.25, w: w - 0.6, h: 1.3, margin: 0, fontSize: 13, color: T.slate700, valign: "top", paraSpaceAfter: 4, isTextBox: true }); });
  [["trend", "Faster time-to-hire", "AI parsing, single-page intake and structured interview cadence."], ["shield", "Enterprise multi-tenancy", "Isolated tenant databases, roles and audit-ready operations."], ["chart", "Decision-ready analytics", "Reports, executive summaries and client engagement scoring."]].forEach(([icn, h, b], i) => {
    const w = (G.cw - 0.6) / 3, x = G.mx + i * (w + 0.3); K.feat(sl, ic[icn], h, b, x, 5.05, w, 0.5); });
  sl.addNotes("Three surfaces designed together, and the three outcomes every tenant gets.");

  // 4 PERSONAS
  sl = K.add("MT_CONTENT_TINT"); K.head(sl, "Who uses ProtonNxt", "Built for every role in a recruiting operation");
  K.iconCards(sl, [["key", "Super user & admin", "Configure the tenant: users, roles, schema, subscription."],
    ["users", "Team lead", "Owns a team, assigns requisitions and watches workload."],
    ["briefcase", "Recruiter", "Sources, screens, schedules interviews and moves candidates."],
    ["chart", "Leadership", "Reads reports, executive summaries and client analytics."],
    ["hand", "Vendor (agency) users", "Submit candidates to published JDs through their own login."],
    ["user", "Candidates", "Apply, upload once and track status across employers."]], 3, 1.8, 2.15, 0.3, true);
  sl.addNotes("Roles: SuperUser, Admin, Team Lead and User; vendor users (admin, recruiter, finance); and candidates via the public and portal surfaces.");

  // 5 LIFECYCLE
  K.sec("Platform");
  sl = K.add(); K.head(sl, "The hiring lifecycle", "Every step from requisition to joining, end to end");
  const st = [["Requisition", "JD with SPOC, skills, CTC and positions", "01"], ["Source", "Careers URL, invite links, vendors", "02 · 13"], ["Intake & parse", "Bulk upload, AI parsing, dedupe", "03"],
    ["Track", "Pipeline, owner and next action", "04 · 05"], ["Interview", "L1 / L2 / L3 with calendar and video", "07 · 14"], ["Offer & join", "CTC structure and joining lifecycle", "08"]];
  st.forEach(([h, b, m], i) => { const w = (G.cw - 5 * 0.28) / 6, x = G.mx + i * (w + 0.28), hi = i === 2;
    card(sl, x, 1.95, w, 2.75, hi ? T.midnight : T.paper, hi ? T.midnight : T.line);
    txt(sl, `MODULE ${m}`, x + 0.2, 2.15, w - 0.3, 0.26, { fontSize: 9, bold: true, charSpacing: 1, color: hi ? T.amber : A });
    txt(sl, h, x + 0.2, 2.5, w - 0.4, 0.62, { fontSize: 15, bold: true, color: hi ? T.white : T.ink });
    txt(sl, b, x + 0.2, 3.15, w - 0.4, 1.4, { fontSize: 12, color: hi ? T.onDarkMuted : T.slate700 });
    if (i < 5) K.line(sl, x + w + 0.02, 3.3, x + w + 0.26, 3.3); });
  colLabel(sl, "Running underneath every step", G.mx, 6, 5.05);
  ["Team collaboration (06)", "Reports & analytics (10)", "Client analytics (11)", "Settings & admin (12)", "Mobile app (15)"].forEach((t, i) => { const w = (G.cw - 4 * 0.2) / 5, x = G.mx + i * (w + 0.2);
    sl.addShape("roundRect", { x, y: 5.4, w, h: 0.5, rectRadius: 0.25, fill: { color: tint(A, 0.9) }, line: { type: "none" } });
    txt(sl, t, x, 5.4, w, 0.5, { fontSize: 12, bold: true, color: T.ink, align: "center", valign: "middle" }); });
  sl.addNotes("The lifecycle with module numbers. Intake and parsing is highlighted because it is where recruiters save the most time.");

  // 6 MODULE MAP
  sl = K.add("MT_CONTENT_TINT"); K.head(sl, "Product map", "Fifteen modules, every one included in every tenant");
  const groups = [["layers", "Hiring pipeline", ["01 Job requisitions", "02 Candidate sourcing", "03 Talent intake & matching", "04 Applicant tracking", "07 Interview workflow", "08 Offer management"]],
    ["users", "Operations", ["05 JD assignment", "06 Team collaboration", "14 Calendar & video", "15 Mobile recruiter app"]],
    ["globe", "External access", ["09 Careers URL & candidate portal", "13 Vendor management"]],
    ["chart", "Analytics", ["10 Reports & analytics", "11 Client engagement analytics (beta)"]],
    ["shield", "Governance", ["12 Settings, admin & custom schema"]]];
  const cw5 = (G.cw - 4 * 0.25) / 5;
  groups.forEach(([icn, h, items], i) => { const x = G.mx + i * (cw5 + 0.25), y = 1.75, ch = 4.0;
    card(sl, x, y, cw5, ch, T.white); iconChip(sl, ic[icn], x + 0.25, y + 0.25, A, 0.5);
    txt(sl, h, x + 0.25, y + 0.9, cw5 - 0.4, 0.32, { fontSize: 15, bold: true, color: T.ink });
    txt(sl, `${items.length} module${items.length > 1 ? "s" : ""}`, x + 0.25, y + 1.22, cw5 - 0.5, 0.24, { fontSize: 10.5, bold: true, color: A });
    sl.addText(items.map((t, k) => ({ text: t, options: { breakLine: k < items.length - 1 } })), { x: x + 0.25, y: y + 1.6, w: cw5 - 0.4, h: ch - 1.7, margin: 0, fontSize: 12, color: T.slate700, valign: "top", paraSpaceAfter: 5, isTextBox: true }); });
  K.note(sl, "No add-ons: every module ships to every tenant from day one. Client engagement analytics is in beta.", 6.0, 0.55);
  sl.addNotes("The full module map. Modules 13–15 (vendor, calendar & video, mobile) were the 'latest additions' in the original deck and are now part of the main flow.");

  // 7 DASHBOARD
  K.sec("Hiring pipeline");
  sl = K.add(); K.head(sl, "Admin dashboard", "Pipeline health in one glance");
  await K.heroFeature(sl, IMG.dash, [["gauge", "KPI tiles", "Open positions, pipeline, time to fill and joining rate."], ["building", "Customer JD statistics", "Active, on-hold and closed requisitions per client."],
    ["trend", "Recruitment funnel", "Candidates by stage across the tenant."], ["bell", "Idle-JD alerts", "Requisitions nobody is working surface automatically."]],
    "Admin dashboard: KPI tiles, customer JD statistics, new customers and the recruitment funnel (demo data).", false, "ProtonNxt · Admin dashboard");
  sl.addNotes("Every tenant admin lands here after login. Team-wise contribution and workload views sit further down the same page.");

  // 8 REQUISITIONS
  sl = K.add(); K.head(sl, "Job requisitions", "Requisitions that act as contracts, not spreadsheet rows");
  await K.heroFeature(sl, IMG.jds, [["target", "Skills framing", "Must-have and good-to-have skills on every JD."], ["user", "Customer SPOC", "SPOC name and email for customer-side updates."],
    ["wallet", "Positions and budget", "Positions, budget CTC and experience bands."], ["flag", "Lifecycle", "Active, on hold or closed, with team and recruiter assignment."]],
    "Job descriptions: status, positions, company and team per requisition (demo data).", true, "View / edit JDs");
  sl.addNotes("Requisitions become a contract between recruiter, hiring lead and the platform.");

  // 9 SOURCING & INTAKE
  sl = K.add(); K.head(sl, "Sourcing & intake", "Every channel into one pipeline, parsed by AI");
  await K.heroFeature(sl, Object.assign({}, IMG.upload, { fw: 7.55, fh: 4.0 }), [["globe", "Branded careers URL", "A tenant-scoped public submission page per tenant."], ["link", "Invite-based upload", "Signed per-JD links for candidates and partners."],
    ["sparkle", "AI parsing, your choice", "OpenAI or Gemini parsing, with manual override."], ["copy", "Dedupe where it matters", "Duplicates caught when the candidate is saved."]],
    "Upload resumes: single files, multiple files or a ZIP archive, scoped to the target JD.", false, "Talent intake & matching");
  K.note(sl, "Public submissions are auto-assigned to active JDs by AI; unclaimed profiles route to a generic pool. Existing candidates can be attached to a new JD without re-parsing.", 6.22, 0.55);
  sl.addNotes("Recruiters upload PDF, DOC or DOCX singly, in batches or as a ZIP. Batches are tracked per row. Parsing uses OpenAI or Gemini with manual override.");

  // 10 TRACKING
  sl = K.add(); K.head(sl, "Applicant tracking", "The pipeline always tells the truth");
  await K.heroFeature(sl, IMG.status, [["list", "Every stage visible", "Screening, L1 / L2 / L3 outcomes, offer and joining status."], ["user", "Clear ownership", "Recruiter and HR owner on every candidate."],
    ["file", "Activity log", "Notes, feedback and status moves, kept on the record."], ["chart", "Reports from the same data", "Conversion reports one click away."]],
    "Candidate status: L1, L2 and L3 status per candidate and JD (demo data).", true, "Manage candidate status");
  sl.addNotes("Pipeline, muster and finalised-candidate views share one record per candidate.");

  // 11 OWNERSHIP
  sl = K.add(); K.head(sl, "Assignment & collaboration", "Ownership made explicit, teams working in one context");
  await K.heroFeature(sl, IMG.team, [["users", "Teams and roles", "Team leads, members and roles: SuperUser, Admin, Team Lead, User."], ["link", "JD assignment", "Assign each requisition to recruiters or teams, with multi-recruiter coverage."],
    ["gauge", "Visible load", "Active-JD counts per recruiter and assignment-driven reports."], ["bell", "Real-time notifications", "Live updates pushed over WebSockets."]],
    "Team members: roles, status and actions (demo data).", false, "Manage team members");
  sl.addNotes("Structured assignment removes tribal knowledge about who owns what. Each user can be signed in on web and mobile, with sessions governed from settings.");

  // 12 INTERVIEWS
  sl = K.add(); K.head(sl, "Interviews, calendar & video", "Structured interviews on a real calendar");
  K.flow(sl, ["Schedule L1 / L2 / L3", "Create meeting", "Invite & remind", "Interview", "Outcome synced"], 1.95, 1, 0.65);
  K.iconCards(sl, [["calendar", "Per-recruiter calendar", "Scheduling, rescheduling and progression gates between levels."],
    ["video", "One-click video", "MavionMeet meetings with auto-generated guest join links."],
    ["mail", "Invites and ICS files", "Automatic candidate and panel invites, calendar files and reminders."],
    ["repeat", "Outcome sync", "Started, ended, recorded and minutes flow back to the record."]], 4, 3.0, 2.35);
  K.note(sl, "Every interview records interviewer, type, location, status and structured feedback, visible in the pipeline and reports instantly.", 5.75, 0.62);
  sl.addNotes("Encrypted per-recruiter keys and hourly reconciliation mean no outcome is lost. Screens for the calendar and video module still need to be captured.");

  // 13 OFFERS
  sl = K.add(); K.head(sl, "Offer management", "Offers that convert to joiners");
  await K.heroFeature(sl, IMG.offer, [["wallet", "Structured CTC", "Basic, HRA, special allowance, PF, gratuity, bonus and other."], ["gauge", "Total CTC calculated", "Components aggregate automatically."],
    ["calendar", "Joining date", "Captured at offer time."], ["flag", "Offer lifecycle", "Accepted, declined, released and joined, visible in reports."]],
    "Offer letter management: salary details per candidate.", true, "Offer letter management");
  sl.addNotes("Offers move out of email attachments and into the pipeline as a first-class record.");

  // 14 VENDORS
  K.sec("Candidates & partners");
  sl = K.add(); K.head(sl, "Vendor management", "Bring staffing agencies inside the process");
  K.flow(sl, ["Invite agency", "Publish JD with caps", "Vendor submits", "Review & accept", "Contract & payment"], 1.95, 1, 0.65);
  K.iconCards(sl, [["users", "Vendor users & roles", "Admin, recruiter and finance roles for each agency."], ["target", "Per-vendor caps", "Publish specific requisitions to selected vendors, with limits."],
    ["copy", "Duplicate protection", "Vendor submissions land in your pipeline, deduplicated."], ["lock", "Isolated by default", "Separate vendor login with JWT, deny-by-default; nothing leaks across tenants."]], 4, 3.0, 2.35);
  K.note(sl, "Contracts, invoices and payments are tracked with each vendor, so the agency channel becomes measurable.", 5.75, 0.62);
  sl.addNotes("Vendor management was added after the original deck's main section. Its screens still need to be captured; the workflow is from the product documentation.");

  // 15 CANDIDATE PORTAL
  sl = K.add("MT_DARK"); K.head(sl, "Candidate portal", "One candidate login across every employer");
  K.darkCards(sl, [["key", "One login, every employer", "A single portal account works across every tenant using ProtonNxt."], ["layers", "All applications, one screen", "Active and closed applications across every employer."],
    ["radio", "Status in near real time", "When a recruiter moves a candidate to L2, the portal updates within seconds."], ["upload", "Upload once, fan out", "A resume uploaded once is delivered to every tenant applied to."]], 2, 1.85, 2.0);
  sl.addNotes("Platform-level candidate identity across tenants. The original portal screenshot showed a real person's details and is not used; a demo capture is needed.");

  // 16 REPORTS
  K.sec("Analytics");
  sl = K.add(); K.head(sl, "Reports & analytics", "Reporting leadership relies on");
  await K.heroFeature(sl, IMG.reports, [["list", "Eight curated presets", "Selected, pipeline, aging, rejected, interview outcome, inventory, talent pool, freshness."], ["filter", "Two scopes", "JD / workflow reports or the tenant-wide candidate database."],
    ["star", "Saved templates", "Personal or shared with admins."], ["sheet", "Enterprise XLSX", "Title banner, metadata, summary and applied filters in every export."]],
    "Candidate reports: curated presets, report filters and saved reports (demo data).", false, "Candidate reports");
  sl.addNotes("Role-aware filters by customer, JD, team, recruiter, status, experience and location. Team, task-progress, status and conversion reports complete the set.");

  // 17 EXEC SUMMARY
  sl = K.add(); K.head(sl, "Executive summary", "One-screen answers that always match the table");
  frame(sl, await K.S(IMG.exec, G.cw, 4.25), G.mx, 1.75, G.cw, 4.25, { url: "Candidate reports · Executive summary", alt: "Executive summary" });
  [[G.mx + 1.0, 2.55], [G.mx + 3.6, 3.1], [G.mx + 7.0, 3.1], [G.mx + 9.5, 4.6]].forEach(([x, y], i) => K.badge(sl, i + 1, x, y));
  K.calloutRow(sl, ["Tile strip: candidates, JDs, customers, recruiters", "Stage distribution donut", "Top recruiters and top customers (top 10)", "Totals always equal the table's row count"]);
  sl.addNotes("Every report run also produces chart summaries over the same filtered dataset, so the numbers can't drift from the table below. Names shown are demo users and demo customers.");

  // 18 BUILDER
  sl = K.add(); K.head(sl, "Search & builder", "Turn the talent pool into a searchable asset");
  await K.heroFeature(sl, IMG.builder, [["search", "Skill search", "Stacked skill queries across parsed resumes and searchable custom fields."], ["filter", "Attribute builder", "AND-logic reports on a validated field, operator and value catalog."],
    ["copy", "Reuse, don't re-parse", "Attach an existing candidate to a new JD without a duplicate."], ["sheet", "Leadership packs", "Excel with a report-context sheet for reviews."]],
    "Candidate attribute builder: fields, operators and values with safe, role-aware results.", true, "Candidate reports · Builder");
  sl.addNotes("The validated catalog prevents bad queries; custom candidate fields can opt in to reports and search.");

  // 19 CLIENT ANALYTICS
  sl = K.add(); K.head(sl, "Client engagement analytics · beta", "Know which clients to grow and which are slipping");
  await K.heroFeature(sl, IMG.leader, [["gauge", "Engagement score", "Volume + conversion + velocity + consistency, minus a rejection penalty."], ["layers", "Seven segments", "Premium, growth, active, dormant, backbench, risky, high rejection."],
    ["trend", "Leaderboard & trends", "Score bars, 12-week sparklines and top movers."], ["info", "Explainable", "Every segment pill shows the rule that fired."]],
    "Client leaderboard: engagement scores and pipeline counts per client (demo data).", false, "Client analytics · Leaderboard");
  sl.addNotes("A tenant-admin module. Scores refresh on a schedule or on demand. Labelled beta in the product.");

  // 20 COMPARE & TUNE
  sl = K.add(); K.head(sl, "Compare & tune", "Compare clients and share evidence safely");
  await K.twoShots(sl, Object.assign({}, IMG.compare, { cap: "Compare up to 10 clients: KPI matrix and engagement radar (demo data)." }),
    Object.assign({}, IMG.tune, { cap: "Settings: tunable scoring weights and segment thresholds per tenant." }),
    [["radar", "5-axis comparison", "Volume, conversion, velocity, consistency, low rejection."], ["sliders", "Tunable rules", "Each tenant defines its own 'premium'."],
     ["share", "Signed snapshots", "Read-only links, 7-day expiry, no login."], ["shield", "Audited & accessible", "Append-only audit; WCAG 2.1 AA."]]);
  sl.addNotes("HMAC-signed share URLs let admins share evidence outside the ATS safely. Exports include summary, leaderboard and about sheets.");

  // 21 MOBILE
  K.sec("Mobile & administration");
  sl = K.add("MT_DARK"); K.head(sl, "Mobile recruiter app", "Hiring keeps moving between meetings");
  K.darkCards(sl, [["calendar", "Today dashboard", "Interviews, approvals, agenda and company KPIs at a glance."], ["layers", "Pipeline in your pocket", "Candidates, JDs, interviews and search with fast pagination."],
    ["phone", "Act on the move", "Advance, hold or reject; call, WhatsApp or share a CV; record results."], ["fingerprint", "Secure by design", "Biometric app lock and secure token authentication."],
    ["wifi", "Offline-aware", "Light and dark themes; works through patchy connections."], ["bell", "Push notifications", "Real-time alerts with one governed login across web and mobile."]], 3, 1.85, 2.05);
  sl.addNotes("Mobile app screens still need to be captured; the platform (iOS / Android) is to be confirmed.");

  // 22 ADMIN
  sl = K.add(); K.head(sl, "Settings & administration", "Administrators in control, without engineering tickets");
  await K.twoShots(sl, Object.assign({}, IMG.sessions, { cap: "Session management: active web and mobile sessions with forced logout." }),
    Object.assign({}, IMG.subs, { cap: "Subscription & billing: plan, usage against limits and payment history." }),
    [["users", "Users, roles, permissions", "Active and inactive status per user."], ["bell", "Notifications & email", "Email configuration per tenant."],
     ["wallet", "Razorpay billing", "Subscription lifecycle inside the ATS."], ["sliders", "Branding & toggles", "Tenant branding and module toggles."]]);
  sl.addNotes("Administrators shape, secure and operate the tenant themselves.");

  // 23 SCHEMA
  sl = K.add(); K.head(sl, "Custom candidate schema", "Your hiring model, without code");
  await K.heroFeature(sl, IMG.schema, [["form", "Nine field types", "Text, number, date/time, boolean, select, multi-select, email, phone, URL."], ["eye", "Four visibility toggles", "Show in detail, exports, search and reports."],
    ["repeat", "Safe changes", "Reorder, activate or deactivate without data loss."], ["lock", "Tenant-scoped", "Strict isolation; no cross-tenant bleed."]],
    "Customize candidate schema: configured fields and the create-field form.", false, "Customize candidate schema");
  sl.addNotes("Custom fields render across the create, profile and finalised views. One product, many tenant-specific hiring models.");

  // 24 ARCHITECTURE
  K.sec("Platform & value");
  sl = K.add(); K.head(sl, "Architecture", "Multi-tenant by design, secure by default");
  colLabel(sl, "Surfaces", G.mx, 2.6);
  [["Recruiter web app", "Teams, pipeline, reports"], ["Mobile recruiter app", "Token auth, biometric lock"], ["Vendor portal", "Separate login · JWT"], ["Careers URL & portal", "Public submission, candidate identity"]].forEach(([h, t], i) => sbox(sl, G.mx, 2.05 + i * 0.95, 2.7, 0.78, h, t));
  colLabel(sl, "Application", 3.75, 3.3);
  sl.addShape("roundRect", { x: 3.75, y: 2.05, w: 3.3, h: 3.65, rectRadius: 0.1, fill: { color: T.midnight }, line: { type: "none" } });
  ["Role-aware access", "Real-time layer (WebSockets)", "AI parsing (OpenAI · Gemini)", "Append-only audit logs", "HMAC-signed share links"].forEach((t, i) => { const y = 2.25 + i * 0.68;
    sl.addShape("ellipse", { x: 3.97, y: y + 0.08, w: 0.34, h: 0.34, fill: { color: A }, line: { type: "none" } });
    txt(sl, String(i + 1), 3.97, y + 0.08, 0.34, 0.34, { fontSize: 11, bold: true, color: T.white, align: "center", valign: "middle" });
    txt(sl, t, 4.45, y, 2.5, 0.5, { fontSize: 12.5, color: T.white, valign: "middle" }); });
  [2.44, 3.39, 4.34, 5.29].forEach(y => K.line(sl, 3.3, y, 3.75, y));
  colLabel(sl, "Data", 7.5, 2.6);
  ["Tenant A · isolated MySQL", "Tenant B · isolated MySQL", "One database per tenant"].forEach((t, i) => sbox(sl, 7.5, 2.05 + i * 0.95, 2.7, 0.78, t, null, { fill: tint(A, 0.9), line: tint(A, 0.55) }));
  sbox(sl, 7.5, 4.9, 2.7, 0.8, "Platform candidate identity", "Shared portal login across tenants", { line: T.amber, lw: 1.5 });
  [2.44, 3.39].forEach(y => K.line(sl, 7.05, y, 7.5, y));
  colLabel(sl, "Integrations", 10.6, 2.1);
  [["OpenAI · Gemini", "Resume parsing"], ["MavionMeet", "Video interviews"], ["Razorpay", "Subscriptions"], ["Email · ICS", "Invites & calendars"]].forEach(([h, t], i) => sbox(sl, 10.6, 2.05 + i * 0.92, 2.13, 0.78, h, t));
  txt(sl, "No shared tables and no retrofitted multi-tenancy: each tenant runs on its own isolated database.", G.mx, 6.0, G.cw, 0.4, { fontSize: 13, color: T.slate700 });
  sl.addNotes("Database-per-tenant isolation, a Channels + Redis real-time layer, JWT for vendors, HMAC-signed URLs, append-only audit and session governance. The candidate identity is platform-level so one candidate login works across tenants.");

  // 25 INTEGRATIONS
  sl = K.add("MT_CONTENT_TINT"); K.head(sl, "Integrations", "Connects to how your team already works");
  [["cpu", "OpenAI", "Resume parsing"], ["cpu", "Google Gemini", "Alternative parsing path"], ["video", "MavionMeet", "One-click video interviews"], ["wallet", "Razorpay", "Subscription billing"],
   ["mail", "Email", "Per-tenant email configuration"], ["calendar", "ICS calendars", "Invites for candidates and panels"], ["sheet", "Excel (XLSX)", "Enterprise exports everywhere"], ["phone", "WhatsApp & calls", "Contact candidates from mobile"]].forEach(([icn, h, b], i) => {
    const w = (G.cw - 0.9) / 4, x = G.mx + (i % 4) * (w + 0.3), y = 1.8 + Math.floor(i / 4) * 2.0;
    card(sl, x, y, w, 1.7, T.white); iconChip(sl, ic[icn], x + 0.28, y + 0.3, A, 0.5);
    txt(sl, h, x + 0.95, y + 0.3, w - 1.15, 0.35, { fontSize: 16, bold: true, color: T.ink }); txt(sl, b, x + 0.95, y + 0.7, w - 1.15, 0.7, { fontSize: 12 }); });
  K.note(sl, "Parsing is pluggable, with no lock-in to a single AI provider, and a manual override is always available.", 5.95, 0.6);
  sl.addNotes("Job boards and LinkedIn are listed on maviontech.com but not in the product deck; confirm before presenting them.");

  // 26 WHY
  sl = K.add("MT_DARK"); K.head(sl, "Why ProtonNxt", "Eight reasons recruitment teams choose ProtonNxt");
  K.darkCards(sl, [["db", "Multi-tenant by design", "Each tenant on an isolated database; no shared tables."], ["sparkle", "AI without lock-in", "OpenAI and Gemini paths with manual override."],
    ["form", "Tenant-defined schema", "Extend the candidate record without forking the product."], ["chart", "Reporting done right", "Presets, builder, templates and executive summaries."],
    ["gauge", "Client analytics", "Scoring and segmentation show where to invest."], ["key", "Candidate portal", "One login across every ProtonNxt tenant."],
    ["sheet", "Enterprise exports", "Styled multi-sheet XLSX, not raw CSV."], ["shield", "Audit-ready operations", "Append-only audit, sessions and subscription governance."]], 4, 1.8, 2.15);
  sl.addNotes("The eight USPs, each shown earlier in the deck. The original 'beats every ATS you have evaluated' claim is not used.");

  // 27 CLOSE
  sl = K.add("MT_CLOSE");
  K.close(sl, { title: "Let's build your next hire, together", body: "Book a walkthrough on your own requisitions, then pilot ProtonNxt with one team.", subtitle: "ProtonNxt · Enterprise ATS" });
  sl.addNotes("One ask: a walkthrough, then a single-team pilot. Official MavionTech contact details. Product domains (protonnxt.com) to be confirmed before adding.");

  await pres.writeFile({ fileName: OUT });
  console.log("written", OUT, pres.slides.length, "slides");
})();
