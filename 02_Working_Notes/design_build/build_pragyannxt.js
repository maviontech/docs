// PragyanNxt_Final.pptx — formerly Evalynx
const fs = require("fs");
const pptxgen = require("pptxgenjs");
const M = require("./mt");
const { makeKit } = require("./deckkit");
const { T, TYPE, G, tint, frame, iconChip, caption, card } = M;
const SD = "D:/MavionTech_sales/screenshots/";
const OUTDIR = M.ROOT + "/Final_Product_Decks/PragyanNxt";
const OUT = process.env.OUT || (OUTDIR + "/PragyanNxt_Final.pptx");
fs.mkdirSync(OUTDIR, { recursive: true });
const IMG = {
  login: { src: SD + "01-login.jpg", alt: "PragyanNxt sign-in" },
  createOrg: { src: SD + "03-create-organization.jpg", alt: "Create organisation" },
  dash: { src: SD + "04-admin-dashboard.jpg", crop: [0, 70], alt: "Evaluation dashboard" },
  dashFull: { src: SD + "04-admin-dashboard.jpg", alt: "Evaluation dashboard" },
  qbank: { src: SD + "05-question-bank.jpg", alt: "Question bank" },
  exams: { src: SD + "07-assessments.jpg", alt: "Assessments" },
};
const ICONS = { user: "LuUserX", users: "LuUsers", alert: "LuTriangleAlert", file: "LuFileWarning", award: "LuAward", lock: "LuLock", shield: "LuShieldCheck",
  book: "LuBookOpen", send: "LuSend", eye: "LuEye", gauge: "LuGauge", chart: "LuChartColumn", badge: "LuBadgeCheck", building: "LuBuilding2",
  sparkle: "LuSparkles", wallet: "LuWallet", upload: "LuUpload", tag: "LuTag", search: "LuSearch", shuffle: "LuShuffle", timer: "LuTimer", wifi: "LuWifi",
  link: "LuLink", video: "LuVideo", scan: "LuScanFace", phone: "LuSmartphone", monitor: "LuMonitor", key: "LuKeyRound", globe: "LuGlobe", scale: "LuScale",
  graduation: "LuGraduationCap", briefcase: "LuBriefcase", db: "LuDatabase", server: "LuServer", repeat: "LuRepeat", cloud: "LuCloud", mail: "LuMail",
  check: "LuCheck", pen: "LuPenLine", layers: "LuLayers", list: "LuListChecks", copy: "LuCopy", target: "LuTarget", cpu: "LuCpu", fingerprint: "LuFingerprint", rocket: "LuRocket" };

(async () => {
  const pres = new pptxgen(); pres.layout = "LAYOUT_WIDE";
  pres.author = "MavionTech Pvt. Ltd."; pres.company = "MavionTech Pvt. Ltd."; pres.title = "PragyanNxt — Assessment & Certification";
  pres.theme = { headFontFace: M.FONT.head, bodyFontFace: M.FONT.body };
  const A = M.PRODUCTS.pragyannxt.accent;
  M.defineLayouts(pres, "pragyannxt", await M.darkBg(A, "bg_cover_pragyannxt.png", "cover"), await M.darkBg(A, "bg_divider_pragyannxt.png", "divider"));
  const K = await makeKit(pres, "pragyannxt", "pn", ICONS);
  const { ic, icW, txt } = K;
  const mark = "D:/MavionTech_sales/branding/pragyannxt-mark.png";
  const sbox = (sl, x, y, w, h, hd, sub, o = {}) => { sl.addShape("roundRect", { x, y, w, h, rectRadius: 0.08, fill: { color: o.fill || T.white }, line: { color: o.line || T.line, width: o.lw || 0.75 } });
    sl.addText([{ text: hd, options: { bold: true, fontSize: o.hs || 12.5, color: o.hc || T.ink, breakLine: !!sub } }].concat(sub ? [{ text: sub, options: { fontSize: 10.5, color: o.sc || T.slate500 } }] : []), { x: x + 0.15, y, w: w - 0.3, h, margin: 0, valign: "middle", isTextBox: true }); };
  const colLabel = (sl, t, x, w, y = 1.7) => txt(sl, t.toUpperCase(), x, y, w, 0.25, { fontSize: 10, bold: true, charSpacing: 2, color: T.slate500 });

  // 1 COVER
  K.sec("Opening");
  let sl = K.add("MT_COVER");
  K.cover(sl, { name: "PragyanNxt", category: "Assessment · Proctoring · Certification", mark,
    promise: "Results you can defend. Credentials anyone can verify.",
    support: "One platform for corporates and academic institutions to author, deliver, proctor, score and certify, with an integrity score on every attempt.",
    chips: ["Author to certificate", "Integrity scoring", "Isolated tenants"] });
  await K.coverShots(sl, IMG.dash, IMG.qbank, "PragyanNxt · Evaluation dashboard");
  sl.addNotes("Opening. PragyanNxt (formerly Evalynx) is MavionTech's enterprise assessment and certification platform. Screens are from the running product with a demo organisation: 1,225 questions, 5 subjects, 3 assessments, 41 users.");

  // 2 PROBLEM
  sl = K.add(); K.head(sl, "The problem", "Online testing scaled, but trust didn't");
  [["briefcase", "For hiring teams", "Gamed screening tests push the wrong candidates forward, while strong talent walks away from a process it doesn't trust."],
   ["graduation", "For academic institutions", "Unmonitored exams devalue the certificate, invite disputes and grade appeals, and put accreditation and reputation at risk."]].forEach(([icn, h, b], i) => {
    const w = (G.cw - 0.3) / 2, x = G.mx + i * (w + 0.3); card(sl, x, 1.8, w, 1.95); iconChip(sl, ic[icn], x + 0.3, 2.1, A, 0.56);
    txt(sl, h, x + 1.05, 2.12, w - 1.3, 0.35, { fontSize: TYPE.h3, bold: true, color: T.ink }); txt(sl, b, x + 1.05, 2.52, w - 1.3, 1.1); });
  txt(sl, "WHAT AN ASSESSMENT YOU CAN'T DEFEND COSTS", G.mx, 4.05, 8, 0.28, { fontSize: 10.5, bold: true, charSpacing: 2, color: T.slate500 });
  [["user", "The wrong hire", "Every bad hire that cleared a gamed test costs months of ramp-up and re-hiring."],
   ["scale", "The disputed result", "Contested scores trigger appeals, manual re-grading and reputational damage."],
   ["file", "The leaked exam", "Once a question bank leaks, the assessment has to be rebuilt from scratch."]].forEach(([icn, h, b], i) => {
    const w = (G.cw - 0.6) / 3, x = G.mx + i * (w + 0.3); card(sl, x, 4.45, w, 1.95, T.white); iconChip(sl, ic[icn], x + 0.28, 4.72, A, 0.48);
    txt(sl, h, x + 0.95, 4.74, w - 1.2, 0.32, { fontSize: 14.5, bold: true, color: T.ink }); txt(sl, b, x + 0.95, 5.1, w - 1.2, 1.15, { fontSize: 12 }); });
  sl.addNotes("The problem framed for both buyers, then the three failure modes that cost real money and reputation. No statistics are claimed.");

  // 3 PROBLEMS SOLVED
  sl = K.add(); K.head(sl, "Problems we solve", "Six real problems, each answered by a specific capability");
  colLabel(sl, "The challenge", G.mx, 5); colLabel(sl, "How PragyanNxt solves it", 6.75, 5);
  [["Candidates cheat in unsupervised remote exams", "AI proctoring plus an integrity score on every attempt"],
   ["Scores get disputed and appealed", "A defensible evidence trail with a formal appeals process"],
   ["Certificates are easy to forge", "Cryptographically signed credentials anyone can verify"],
   ["Authoring quality assessments takes days", "Bulk import and AI generation from your own content"],
   ["Point tools don't talk to each other", "One platform from authoring to verifiable credential"],
   ["Mixing organisations' data is a security risk", "A separate, isolated database for every organisation"]].forEach(([a, b], i) => {
    const y = 2.05 + i * 0.72;
    sl.addShape("line", { x: G.mx, y: y - 0.04, w: G.cw, h: 0, line: { color: T.line, width: 0.75 } });
    txt(sl, a, G.mx, y, 5.7, 0.62, { fontSize: 13.5, color: T.slate700, valign: "middle" });
    sl.addImage({ path: ic.check, x: 6.3, y: y + 0.2, w: 0.22, h: 0.22 });
    txt(sl, b, 6.75, y, 5.98, 0.62, { fontSize: 13.5, bold: true, color: T.ink, valign: "middle" }); });
  sl.addNotes("The problem-to-solution map. Each answer is a shipped capability shown later in the deck.");

  // 4 SOLUTION
  sl = K.add(); K.head(sl, "The solution", "One platform for the entire assessment lifecycle");
  [["layers", "Unified lifecycle", "Authoring, delivery, proctoring, integrity scoring, analytics and certification in one system."],
   ["gauge", "Integrity on every attempt", "AI proctoring and behavioural signals produce a defensible score, even without a camera."],
   ["badge", "Verifiable credentials", "Signed certificates that anyone can check, and that carry the evidence behind them."]].forEach(([icn, h, b], i) => {
    const y = 1.85 + i * 1.5; iconChip(sl, ic[icn], G.mx, y, A, 0.56);
    txt(sl, h, G.mx + 0.75, y - 0.02, 3.85, 0.32, { fontSize: TYPE.h3, bold: true, color: T.ink });
    txt(sl, b, G.mx + 0.75, y + 0.32, 3.85, 0.95, { fontSize: 13 }); });
  frame(sl, await K.S(IMG.dash, 7.13, 4.3), 5.6, 1.8, 7.13, 4.3, { url: "PragyanNxt · Evaluation dashboard", alt: "Evaluation dashboard" });
  caption(sl, "Evaluation dashboard: active exams, users, a 1,225-question bank and quick actions (demo data).", 5.6, 6.2, 7.13);
  sl.addNotes("The pivot: one platform for the whole lifecycle, with integrity and verifiable credentials as the two proof points.");

  // 5 PERSONAS
  sl = K.add("MT_CONTENT_TINT"); K.head(sl, "Who uses PragyanNxt", "Every role in the assessment chain, in one system");
  K.iconCards(sl, [["building", "Platform manager", "Provisions organisations into isolated databases and sets their plan."],
    ["key", "Organisation admin", "Runs the organisation: users, subjects, exams, reports and certificates."],
    ["pen", "Author", "Builds the question bank by hand, in bulk or with AI."],
    ["eye", "Proctor", "Monitors live sessions and reviews flagged evidence."],
    ["users", "Candidate", "Takes the exam by invitation, assignment or public link."],
    ["badge", "Verifier / employer", "Confirms that a credential is genuine."]], 3, 1.8, 2.15, 0.3, true);
  sl.addNotes("Candidates are kept separate from staff in the user directory, so candidates are not priced as staff seats.");

  // 6 LIFECYCLE
  K.sec("Platform");
  sl = K.add(); K.head(sl, "How it works", "Five stages, one closed loop of trust");
  [["01", "Author", "Tagged question banks, bulk import and AI generation."], ["02", "Deliver", "Scheduled, assigned or invite-link exams, randomised per candidate."],
   ["03", "Proctor", "Live monitoring, recording and AI visual integrity analysis."], ["04", "Score", "Auto-scoring, manual grading, integrity scores and reports."],
   ["05", "Certify", "Signed, verifiable certificates the world can trust."]].forEach(([n, h, b], i) => {
    const w = (G.cw - 4 * 0.3) / 5, x = G.mx + i * (w + 0.3), last = i === 4;
    card(sl, x, 1.95, w, 3.3, last ? T.midnight : T.paper, last ? T.midnight : T.line);
    txt(sl, n, x + 0.25, 2.15, 1, 0.5, { fontSize: 26, bold: true, color: last ? T.amber : A });
    txt(sl, h, x + 0.25, 2.85, w - 0.5, 0.35, { fontSize: TYPE.h3, bold: true, color: last ? T.white : T.ink });
    txt(sl, b, x + 0.25, 3.3, w - 0.5, 1.7, { fontSize: 12.5, color: last ? T.onDarkMuted : T.slate700 });
    if (i < 4) K.line(sl, x + w + 0.03, 3.6, x + w + 0.27, 3.6); });
  K.note(sl, "Each stage feeds the next, so the certificate at the end carries the integrity evidence from every step before it. Most tools stop at the score.", 5.6, 0.7);
  sl.addNotes("Five stages, one loop. Certify is highlighted because it is the differentiator.");

  // 7 MODULE MAP
  sl = K.add("MT_CONTENT_TINT"); K.head(sl, "Product map", "Eight modules, one integrated system");
  const mods = [["pen", "Authoring", "Question bank · Bulk import · AI generation · Bloom's & difficulty"], ["send", "Delivery", "Public / assigned / invite · Randomisation · Timers & auto-submit · Retakes"],
    ["video", "Proctoring", "Live monitoring · Screen & webcam recording · AI visual analysis · Media library"], ["gauge", "Integrity", "Integrity engine · Behavioural signals · Non-proctored scoring · Answer similarity"],
    ["chart", "Results & analytics", "Auto & manual grading · Report PDFs · Dashboards · AI summaries"], ["badge", "Certification", "Signed certificates · Public verification · Portable badges · LTI · Appeals"],
    ["db", "Multi-tenancy & admin", "Tenant isolation · Control plane · Roles & RBAC · Activity logging"], ["wallet", "Commerce & AI", "Subscriptions & billing · Entitlements · AI credits · Email invites"]];
  mods.forEach(([icn, h, b], i) => { const w = (G.cw - 3 * 0.3) / 4, x = G.mx + (i % 4) * (w + 0.3), y = 1.78 + Math.floor(i / 4) * 2.45, hi = h === "Certification";
    card(sl, x, y, w, 2.3, hi ? T.midnight : T.white, hi ? T.midnight : T.line);
    if (hi) { sl.addShape("roundRect", { x: x + 0.25, y: y + 0.25, w: 0.5, h: 0.5, rectRadius: 0.12, fill: { color: A }, line: { type: "none" } }); sl.addImage({ path: icW[icn], x: x + 0.37, y: y + 0.37, w: 0.26, h: 0.26 }); }
    else iconChip(sl, ic[icn], x + 0.25, y + 0.25, A, 0.5);
    txt(sl, h, x + 0.25, y + 0.9, w - 0.5, 0.32, { fontSize: 14.5, bold: true, color: hi ? T.white : T.ink });
    txt(sl, b.split(" · ").join("\n"), x + 0.25, y + 1.2, w - 0.5, 1.02, { fontSize: 11, color: hi ? T.onDarkMuted : T.slate700 }); });
  sl.addNotes("All eight modules and their key features on one screen. Certification is highlighted to keep the differentiator visible.");

  // 8 AUTHOR
  K.sec("Author & deliver");
  sl = K.add(); K.head(sl, "Author", "A question bank built for scale");
  await K.heroFeature(sl, IMG.qbank, [["book", "Organised library", "Reusable questions by subject and topic, searchable in seconds."],
    ["tag", "Difficulty and Bloom's", "Tag every item for balanced, targeted papers."],
    ["upload", "Bulk import", "Upload from CSV and Excel: thousands of items at once."],
    ["sparkle", "AI generation", "Draft questions from a prompt, a job description or documents."]],
    "Question bank: 1,225 questions across 5 subjects, with filters by subject, topic, difficulty and tag (demo data).", false, "Question bank");
  sl.addNotes("Live screen: a real question bank with 1,225 items. The menu shows All Questions, Add Question, Bulk Upload, AI Generate and Tags.");

  // 9 AI
  sl = K.add(); K.head(sl, "AI-native", "AI that does the heavy lifting, with metered cost");
  K.iconCards(sl, [["sparkle", "Generate questions", "Draft on-topic questions from a prompt, a job description or your own documents, then review and keep what fits."],
    ["layers", "Build whole exams", "Turn a role or a syllabus into a complete, balanced assessment in minutes."],
    ["chart", "Summarise results", "Performance summaries turn raw scores into readable strengths and gaps for each candidate."]], 3, 1.8, 2.25);
  colLabel(sl, "How generation stays under control", G.mx, 6, 4.35);
  K.flow(sl, ["Your prompt, JD or document", "AI drafts questions", "Author reviews", "Saved to the bank"], 4.7, 2, 0.6);
  K.note(sl, "Model usage is metered against AI credits, so AI stays an advantage rather than a runaway bill. A human always reviews generated content.", 5.65, 0.65);
  sl.addNotes("AI is assisted, never autonomous: generated items are reviewed before use. 'AI Generate' (question bank) and 'Generate with AI' (assessments) appear in the product menus.");

  // 10 DELIVER
  sl = K.add(); K.head(sl, "Deliver", "Flexible delivery, locked-down experience");
  await K.heroFeature(sl, IMG.exams, [["link", "Three delivery modes", "Public campaigns, assigned candidates or single-use invite links."],
    ["shuffle", "A unique paper each", "Randomised by section and difficulty for every candidate."],
    ["timer", "Server-enforced timers", "Auto-submit and protection for draft answers."],
    ["wifi", "Reconnect and resume", "A dropped connection never loses an answer."]],
    "Assessments workspace: active exams with questions, invite, preview and edit actions (demo data).", true, "Assessments");
  sl.addNotes("Three delivery modes cover hiring campaigns, named cohorts and external candidates without an account. The menu shows Create Assessment, Generate with AI, Public Links, Assign Assessments and Assessment Requests.");

  // 11 CANDIDATE JOURNEY
  sl = K.add(); K.head(sl, "The candidate journey", "From invitation to verified credential");
  frame(sl, await K.S(IMG.login, 4.4, 2.75), G.mx, 1.75, 4.4, 2.75, { alt: "Organisation sign-in" });
  caption(sl, "Organisation-scoped sign-in (organisation name or tenant ID).", G.mx, 4.58, 4.4);
  [["send", "1  Invitation", "Public link, assignment or a single-use invite, even without an account."], ["key", "2  Sign in", "Into the organisation's own workspace."],
   ["monitor", "3  Take the exam", "Randomised, timed, with live or recorded supervision."], ["gauge", "4  Result + integrity", "Score and integrity report attached."],
   ["badge", "5  Certificate", "Signed credential the candidate can share and anyone can verify."]].forEach(([icn, h, b], i) => {
    const y = 1.8 + i * 0.93; K.feat(sl, ic[icn], h, b, 5.4, y, 7.33, 0.48); });
  sl.addNotes("The candidate's path through the platform. The sign-in screen is the organisation-scoped login.");

  // 12 PROCTOR
  K.sec("Proctor & score");
  sl = K.add("MT_DARK"); K.head(sl, "Proctor", "See every session, catch every anomaly");
  K.darkCards(sl, [["monitor", "Live monitoring", "A real-time control room for every active session."], ["video", "Recording", "Screen and webcam recording that survives restarts."],
    ["scan", "AI visual analysis", "Flags no face, multiple faces, a second person or a phone."], ["eye", "Supervision your way", "From full live proctoring to lightweight recorded supervision."]], 4, 1.85, 2.3);
  txt(sl, "AI FLAGS", G.mx, 4.6, 3, 0.28, { fontSize: 10.5, bold: true, charSpacing: 2, color: T.amber });
  ["No face detected", "Multiple faces", "Second person", "Phone in view"].forEach((t, i) => { const w = 2.6, x = G.mx + i * (w + 0.25);
    sl.addShape("roundRect", { x, y: 5.0, w, h: 0.5, rectRadius: 0.25, fill: { color: T.midnight2 }, line: { color: T.amber, width: 1 } });
    txt(sl, t, x, 5.0, w, 0.5, { fontSize: 13, bold: true, color: T.white, align: "center", valign: "middle" }); });
  txt(sl, "Recordings and flags are stored as evidence in the media library and attached to the candidate's integrity report.", G.mx, 5.85, G.cw, 0.5, { fontSize: 13, color: T.onDarkMuted });
  sl.addNotes("No populated proctoring screenshot is available yet (the captured dashboard was idle). Capabilities per the product deck: live monitoring, screen and webcam recording, AI visual analysis, and modes from full live to recorded supervision.");

  // 13 INTEGRITY
  sl = K.add(); K.head(sl, "Integrity engine", "Integrity you can put a number on");
  sl.addShape("roundRect", { x: G.mx, y: 1.8, w: 3.6, h: 4.5, rectRadius: 0.12, fill: { color: T.midnight }, line: { type: "none" } });
  txt(sl, "INTEGRITY SCORE", G.mx + 0.35, 2.05, 3, 0.28, { fontSize: 10.5, bold: true, charSpacing: 2, color: T.onDarkMuted });
  txt(sl, "92", G.mx + 0.35, 2.4, 1.6, 1.1, { fontSize: 64, bold: true, color: T.amber });
  txt(sl, "/ 100", G.mx + 1.85, 2.85, 1.2, 0.5, { fontSize: 18, color: T.onDarkMuted });
  txt(sl, "Every attempt starts at 100. Weighted risk signals subtract points, giving a score and a risk level.", G.mx + 0.35, 3.6, 2.95, 1.0, { fontSize: 12, color: T.onDarkMuted });
  ["Low", "Medium", "High", "Critical"].forEach((t, i) => { const c = [T.success, T.warning, "E07A2E", T.danger][i];
    sl.addShape("roundRect", { x: G.mx + 0.35 + (i % 2) * 1.5, y: 4.75 + Math.floor(i / 2) * 0.5, w: 1.35, h: 0.38, rectRadius: 0.19, fill: { color: c }, line: { type: "none" } });
    txt(sl, t, G.mx + 0.35 + (i % 2) * 1.5, 4.75 + Math.floor(i / 2) * 0.5, 1.35, 0.38, { fontSize: 11, bold: true, color: T.white, align: "center", valign: "middle" }); });
  txt(sl, "Illustrative score", G.mx + 0.35, 5.85, 3, 0.3, { fontSize: 10, color: T.onDarkMuted });
  colLabel(sl, "Weighted behavioural signals (points deducted)", 4.7, 6, 1.8);
  sl.addChart(pres.charts.BAR, [{ name: "Points deducted", labels: ["Tab switch", "Paste attempt", "Window blur", "Copy attempt", "Fullscreen exit"], values: [4.2, 3.5, 3.2, 2.5, 2.5] }], {
    x: 4.6, y: 2.05, w: 8.1, h: 2.75, barDir: "bar", chartColors: [A], catAxisLabelColor: T.slate700, valAxisHidden: true, catAxisLabelFontSize: 12,
    catAxisLabelFontFace: "+mn-lt", dataLabelFontFace: "+mn-lt", showValue: true, dataLabelPosition: "outEnd", dataLabelColor: T.ink, dataLabelFontSize: 12, dataLabelFormatCode: "0.0",
    valGridLine: { style: "none" }, catGridLine: { style: "none" }, showLegend: false, catAxisOrientation: "maxMin", barGapWidthPct: 60, catAxisLineShow: false });
  K.feat(sl, ic.monitor, "Works without a camera", "Focus, tab and clipboard telemetry score non-proctored exams too.", 4.7, 5.05, 3.9, 0.48);
  K.feat(sl, ic.copy, "Answer similarity", "Surfaces collusion and AI-written responses across candidates.", 8.8, 5.05, 3.93, 0.48);
  sl.addNotes("The integrity engine turns suspicion into a defensible number. Point weights are the engine's values per the product deck; 92 is an illustrative score.");

  // 14 SCORE
  sl = K.add(); K.head(sl, "Score & analyse", "From raw answers to decisions");
  colLabel(sl, "Completion funnel for every assessment (illustrative)", G.mx, 7);
  ["Assigned", "Started", "Completed", "Passed"].forEach((t, i) => { const w = 7.2 - i * 1.15, x = G.mx + (7.2 - w) / 2, y = 2.1 + i * 0.95;
    sl.addShape("roundRect", { x, y, w, h: 0.78, rectRadius: 0.1, fill: { color: i === 3 ? T.midnight : mixA(i) }, line: { type: "none" } });
    txt(sl, t, x, y, w, 0.78, { fontSize: 15, bold: true, color: i === 3 ? T.amber : T.white, align: "center", valign: "middle" }); });
  function mixA(i) { return M.mix(A, "FFFFFF", [0.0, 0.18, 0.34][i]); }
  [["check", "Auto and manual grading", "Objective items scored instantly; subjective answers graded by reviewers."], ["file", "Report PDFs and CSV", "Downloadable per assessment and per candidate."],
   ["gauge", "Integrity attached", "Every result carries its integrity report, proctored or not."], ["sparkle", "AI summaries", "Strengths and gaps in plain language."]].forEach(([icn, h, b], i) =>
    K.feat(sl, ic[icn], h, b, 8.3, 1.9 + i * 1.12, 4.43));
  sl.addNotes("Auto-scoring and manual grading feed a live analytics layer. The funnel is illustrative; the captured reports screen was empty on a fresh tenant and is not shown.");

  // 15 CERTIFY
  K.sec("Certify");
  sl = K.add("MT_DARK"); K.head(sl, "Certify · the differentiator", "Not just a PDF: a credential the world can verify");
  K.darkCards(sl, [["fingerprint", "Cryptographically signed", "Ed25519-signed credentials that can't be forged or altered."], ["globe", "Public verification", "Anyone can confirm a certificate is genuine, instantly."],
    ["badge", "Portable credentials", "Open Badges and verifiable-credential exports that travel anywhere."], ["link", "Plugs into your LMS", "LTI 1.3 writes results back to Canvas, Moodle and more."],
    ["briefcase", "Employer verification", "Hiring teams verify a credential before the interview."], ["scale", "Appeals & due process", "A 14-day appeal window with independent case review."]], 3, 1.85, 2.05);
  sl.addNotes("The flagship differentiator: a certification authority, not a certificate generator. Enabled per deployment.");

  // 16 VERIFY FLOW
  sl = K.add(); K.head(sl, "How verification works", "A trail of trust from result to verified credential");
  const steps = [["Candidate passes", "Score and integrity report recorded"], ["Credential signed", "Ed25519 signature applied"], ["Candidate shares", "Open Badge or verifiable credential"], ["Anyone verifies", "Public verification, instantly"]];
  steps.forEach(([h, b], i) => { const w = (G.cw - 3 * 0.45) / 4, x = G.mx + i * (w + 0.45), dark = i === 1;
    sbox(sl, x, 2.0, w, 1.2, h, b, dark ? { fill: T.midnight, line: T.midnight, hc: T.white, sc: T.onDarkMuted, hs: 14 } : { hs: 14 });
    if (i < 3) K.line(sl, x + w + 0.05, 2.6, x + w + 0.4, 2.6); });
  sbox(sl, G.mx, 3.85, 5.8, 1.05, "LMS write-back", "LTI 1.3 returns results to Canvas, Moodle and other LMSs", { fill: tint(A, 0.92), line: tint(A, 0.6), hs: 14 });
  sbox(sl, 6.93, 3.85, 5.8, 1.05, "Appeals & review", "14-day appeal window with independent case review", { line: T.amber, lw: 1.5, hs: 14 });
  colLabel(sl, "Also part of the trail", G.mx, 6, 3.5);
  K.note(sl, "Because the integrity evidence travels with the credential, employers and institutions verify the result, not just the paper.", 5.55, 0.65);
  sl.addNotes("Verification flow. Certificate and public-verification screens still need to be captured from a populated tenant.");

  // 17 ENTERPRISE
  K.sec("Enterprise & fit");
  sl = K.add(); K.head(sl, "Architecture", "Built like enterprise software");
  colLabel(sl, "Control plane", G.mx, 3);
  sbox(sl, G.mx, 2.05, 2.7, 1.0, "Tenant Manager", "Provisions each organisation", { fill: T.midnight, line: T.midnight, hc: T.white, sc: T.onDarkMuted });
  sbox(sl, G.mx, 3.25, 2.7, 1.0, "Plans & entitlements", "Plan version, access type, expiry");
  colLabel(sl, "Per-organisation data", 3.75, 3);
  ["Organisation A · own database", "Organisation B · own database", "One database per organisation"].forEach((t, i) => sbox(sl, 3.75, 2.05 + i * 0.85, 3.0, 0.7, t, null, { fill: tint(A, 0.92), line: tint(A, 0.6) }));
  K.line(sl, 3.3, 2.55, 3.75, 2.4); K.line(sl, 3.3, 2.55, 3.75, 3.25);
  colLabel(sl, "Built-in controls", G.mx, 6, 4.6);
  ["Role-based access", "Activity logging", "Signed, expiring media URLs", "Durable background processing"].forEach((t, i) => { const w = 1.45 + (i > 1 ? 0.2 : 0), x = G.mx + [0, 1.5, 3.0, 4.6][i];
    sl.addShape("roundRect", { x, y: 4.95, w: [1.4, 1.4, 1.5, 1.65][i], h: 0.72, rectRadius: 0.1, fill: { color: T.paper }, line: { color: T.line, width: 0.75 } });
    txt(sl, t, x + 0.1, 4.95, [1.4, 1.4, 1.5, 1.65][i] - 0.2, 0.72, { fontSize: 11.5, bold: true, color: T.ink, align: "center", valign: "middle" }); });
  frame(sl, await K.S(IMG.createOrg, 5.6, 3.9), 7.13, 1.75, 5.6, 3.9, { url: "Tenant Manager · Create organisation", alt: "Create organisation" });
  caption(sl, "Creating an organisation: details, tenant administrator and initial subscription access.", 7.13, 5.75, 5.6);
  txt(sl, "Reports and recordings survive restarts; one organisation's data never touches another's.", G.mx, 6.05, 6.2, 0.5, { fontSize: 12.5, color: T.slate700 });
  sl.addNotes("Database-per-tenant isolation is a hard boundary, not a shared table with a tenant column. Background processing is durable so submissions, reports and recordings are not lost.");

  // 18 BUYERS
  sl = K.add(); K.head(sl, "Built for both buyers", "Hire on evidence; run exams you can stand behind");
  [["briefcase", "For corporates", [["Screen faster, at any volume", "Run large applicant pools through one fair, automated funnel."], ["Defensible decisions", "Every score carries a proctoring and integrity trail."], ["Verify skills before you interview", "Confirm a candidate's credential is genuine in one click."]]],
   ["graduation", "For academic institutions", [["Remote exams at cohort scale", "Deliver and proctor whole batches without a physical hall."], ["Academic integrity, documented", "An integrity report on every attempt protects the degree."], ["Verify and plug into your LMS", "Signed credentials and LTI write-back to your platform."]]]].forEach(([icn, h, items], i) => {
    const w = (G.cw - 0.3) / 2, x = G.mx + i * (w + 0.3);
    card(sl, x, 1.8, w, 4.6, i ? T.paper : T.white); iconChip(sl, ic[icn], x + 0.3, 2.05, A, 0.56);
    txt(sl, h, x + 1.05, 2.1, w - 1.3, 0.45, { fontSize: 18, bold: true, color: T.ink });
    items.forEach(([hh, bb], k) => { const y = 2.95 + k * 1.1; sl.addImage({ path: ic.check, x: x + 0.35, y: y + 0.05, w: 0.24, h: 0.24 });
      txt(sl, hh, x + 0.8, y, w - 1.1, 0.32, { fontSize: 14, bold: true, color: T.ink }); txt(sl, bb, x + 0.8, y + 0.34, w - 1.1, 0.6, { fontSize: 12.5 }); }); });
  sl.addNotes("Two buyers, one platform: hiring teams care about speed and defensibility; institutions about documented integrity and LMS integration.");

  // 19 USPs
  sl = K.add("MT_DARK"); K.head(sl, "Why PragyanNxt", "One platform where others give you three");
  K.darkCards(sl, [["layers", "Author, proctor and certify together", "No stitching point tools together or leaking data between them. One system, one trail of trust."],
    ["gauge", "Integrity built in, not bolted on", "A defensible integrity score on every exam, including those with no camera."],
    ["db", "Real multi-tenant isolation", "A separate database per organisation: a hard security boundary, not a shared table."],
    ["sparkle", "AI-native and cost-aware", "Generation and summaries that speed up work, with metered spend you control."]], 2, 1.85, 2.05);
  sl.addNotes("The four USPs. Competitors typically sell one slice; PragyanNxt covers the whole chain from authoring to verifiable credential.");

  // 20 PACKAGING
  K.sec("Next steps");
  sl = K.add("MT_CONTENT_TINT"); K.head(sl, "Packaging", "Pay for the platform, scale with usage");
  [["Basic", "500", "For teams getting started with secure online assessment.", ["Authoring, delivery and scoring", "Integrity scoring included"]],
   ["Plus", "5,000", "For growing programmes that certify and report.", ["Reports and certificates", "Recorded proctoring capacity"]],
   ["Pro", "25,000", "For enterprises and institutions at full scale.", ["Full proctoring and control room", "Priority support and onboarding"]]].forEach(([n, a, d, inc], i) => {
    const w = (G.cw - 0.6) / 3, x = G.mx + i * (w + 0.3), hi = i === 1;
    sl.addShape("roundRect", { x, y: 1.8, w, h: 3.85, rectRadius: 0.12, fill: { color: hi ? T.midnight : T.white }, line: { color: hi ? T.midnight : T.line, width: 0.75 } });
    txt(sl, n, x + 0.35, 2.05, w - 0.7, 0.35, { fontSize: TYPE.h3, bold: true, color: hi ? T.white : T.ink });
    if (hi) txt(sl, "POPULAR", x + w - 1.35, 2.08, 1.0, 0.28, { fontSize: 9, bold: true, charSpacing: 2, color: T.amber, align: "right" });
    txt(sl, a, x + 0.35, 2.5, w - 0.7, 0.7, { fontSize: 36, bold: true, color: hi ? T.amber : A });
    txt(sl, "assessments / month", x + 0.35, 3.2, w - 0.7, 0.3, { fontSize: 11, color: hi ? T.onDarkMuted : T.slate500 });
    txt(sl, d, x + 0.35, 3.6, w - 0.7, 0.6, { fontSize: 12.5, color: hi ? T.onDarkMuted : T.slate700 });
    inc.forEach((t, k) => { sl.addImage({ path: hi ? K.checkAmber : K.checkA, x: x + 0.35, y: 4.42 + k * 0.48, w: 0.2, h: 0.2 });
      txt(sl, t, x + 0.7, 4.34 + k * 0.48, w - 1.05, 0.36, { fontSize: 13, color: hi ? T.white : T.slate700, valign: "middle" }); }); });
  K.note(sl, "Start with a 14-day trial with real assessments, AI credits and a bounded proctoring demo. AI credits and recorded-proctoring capacity are added as needed; pricing is scoped to your volume, with INR and annual options.", 5.85, 0.72);
  sl.addNotes("Allowances only, as in the source deck: pricing is scoped per customer.");

  // 21 DEPLOY & INTEGRATE
  sl = K.add(); K.head(sl, "Deployment & integrations", "Runs where you need it; connects to what you already use");
  colLabel(sl, "Deployment options", G.mx, 5);
  [["cloud", "Cloud SaaS", "Multi-tenant, with a database per organisation."], ["server", "Private cloud", "A dedicated environment for your organisation."], ["building", "On-premise", "For enterprises that need it on their own infrastructure."]].forEach(([icn, h, b], i) => {
    const w = (G.cw - 0.6) / 3, x = G.mx + i * (w + 0.3); card(sl, x, 2.05, w, 1.55, T.paper); iconChip(sl, ic[icn], x + 0.28, 2.3, A, 0.5);
    txt(sl, h, x + 0.95, 2.32, w - 1.2, 0.32, { fontSize: 15, bold: true, color: T.ink }); txt(sl, b, x + 0.95, 2.68, w - 1.2, 0.8, { fontSize: 12.5 }); });
  colLabel(sl, "Integrations & standards", G.mx, 5, 3.95);
  [["link", "LTI 1.3", "Canvas, Moodle and other LMSs"], ["badge", "Open Badges", "Portable credentials"], ["fingerprint", "Verifiable credentials", "Signed exports"], ["mail", "Email invitations", "Invite candidates directly"]].forEach(([icn, h, b], i) => {
    const w = (G.cw - 0.9) / 4, x = G.mx + i * (w + 0.3); card(sl, x, 4.3, w, 1.45, T.white); iconChip(sl, ic[icn], x + 0.25, 4.55, A, 0.46);
    txt(sl, h, x + 0.85, 4.55, w - 1.05, 0.32, { fontSize: 14, bold: true, color: T.ink }); txt(sl, b, x + 0.85, 4.9, w - 1.05, 0.7, { fontSize: 12 }); });
  txt(sl, "Deployment options as listed on maviontech.com; private cloud and on-premise are offered for enterprise customers.", G.mx, 6.1, G.cw, 0.4, { fontSize: 11, color: T.slate500 });
  sl.addNotes("The company materials also list Jitsi, Razorpay, SMTP and webhooks for this product (as Evalynx); confirm before presenting them. No SSO or ATS integration is claimed.");

  // 22 CLOSE
  sl = K.add("MT_CLOSE");
  K.close(sl, { title: "Let's build assessment you can trust", body: "Start a 14-day trial, or book a walkthrough tailored to your hiring or academic programme.", subtitle: "PragyanNxt · Assessment & Certification", second: "Start a free trial" });
  sl.addNotes("One ask, two actions. Official MavionTech contact details.");

  await pres.writeFile({ fileName: OUT });
  console.log("written", OUT, pres.slides.length, "slides");
})();
