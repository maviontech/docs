# -*- coding: utf-8 -*-
# 14 slides: cover, who we are, problems, how we simplify, catalogue, problem->product, flagship overview, 4 flagship slides, why, how we work, close.
"""Builds build_sales_intro.js: the MavionTech company introduction (send-anywhere) on the approved catalogue layouts.
Reuses the layout/kit/helper header of build_catalogue_vnext.js verbatim; all facts from the approved catalogue vNext."""
import io, pathlib
B = pathlib.Path(__file__).parent
src = io.open(B / "build_catalogue_vnext.js", encoding="utf-8").read()
head = src[:src.index("  // ================= SECTION 1 — CORPORATE INTRODUCTION =================")]
def R(a, b):
    global head
    assert head.count(a) == 1, a; head = head.replace(a, b)
R('const OUTDIR = M.ROOT + "/Corporate_Catalogue";', 'const OUTDIR = M.ROOT + "/Sales_Introduction";')
R('const ORDER = ["agastya", "pragyannxt", "vortex", "protonnxt", "mavionlearn", "salespulse", "heeliks", "vyaas"];', 'const ORDER = ["vortex", "protonnxt", "pragyannxt", "agastya", "mavionlearn", "salespulse", "heeliks", "vyaas"];')
R('(OUTDIR + "/MavionTech_Corporate_Product_Catalogue_vNext.pptx")', '(OUTDIR + "/MavionTech_Sales_Introduction.pptx")')
R('const FOOT = "MavionTech  ·  Corporate Product Catalogue 2026";', 'const FOOT = "MavionTech  ·  Company Introduction 2026";')
R('pres.title = "MavionTech — Corporate Product Catalogue 2026"; pres.subject = "MavionTech product ecosystem";',
  'pres.title = "MavionTech — Company Introduction 2026"; pres.subject = "Who we are, the problems we solve and our products";')

body = r'''
  // ================= MAVIONTECH SALES INTRODUCTION (14 slides) =================
  sec("Introduction");
  // 1 COVER
  let sl = add("CAT_COVER");
  txt(sl, "COMPANY INTRODUCTION  ·  2026", G.mx, 1.95, 6.5, 0.3, { fontSize: 11, bold: true, charSpacing: 4, color: T.amber });
  sl.addText("Simpler operations. Stronger momentum.", { placeholder: "title" });
  sl.addText("Enterprise software that runs schools, people, hiring, learning, sales and stock, so your teams can run the business.", { placeholder: "body" });
  ORDER.forEach((k, i) => { const x = G.mx + (i % 3) * 2.05, y = 5.3 + Math.floor(i / 3) * 0.44;
    sl.addImage({ path: MARK[k], x, y, w: 0.3, h: 0.3 }); txt(sl, NAME(k), x + 0.4, y, 1.6, 0.3, { fontSize: 12.5, bold: true, color: T.white, valign: "middle" }); });
  frame(sl, await shotOf("agastya", SCR.agastya.dash, 5.4, 3.4), 7.35, 1.15, 5.4, 3.4, { dark: true, url: "Agastya · Cloud School ERP", alt: "Agastya dashboard" });
  frame(sl, await shotOf("heeliks", SCR.heeliks.dash, 4.1, 2.6), 6.6, 3.85, 4.1, 2.6, { dark: true, url: "HeeLIKS · Owner dashboard", alt: "HeeLIKS owner dashboard" });
  frame(sl, await shotOf("protonnxt", SCR.protonnxt.dash, 3.1, 2.05), 9.75, 4.95, 3.1, 2.05, { dark: true, alt: "ProtonNxt admin dashboard" });
  sl.addNotes("Company introduction for any audience (customers, partners, investors). Screens are real product captures with demo data. Facts from maviontech.com and the approved Corporate Product Catalogue vNext (10 Nov 2026).");

  // 2 WHO WE ARE
  sl = add("CAT_CONTENT"); head(sl, "Who we are", "An Indian product company for enterprise applications");
  [["Company", "MavionTech Private Limited"], ["Headquarters", "Wakad, Pune, Maharashtra, India"], ["What we build", "Enterprise business applications"],
   ["Our portfolio", "Eight platforms; seven ready today, four of them flagship products"], ["Who we serve", "Staffing & HR, IT, EdTech, consulting, finance and service providers, MSMEs"]].forEach(([a, b], i) => {
    const y = 1.8 + i * 0.8; hline(sl, G.mx, y, 6.0); label(sl, a, G.mx, y + 0.16, 1.9); txt(sl, b, G.mx + 2.0, y + 0.1, 4.0, 0.65, { fontSize: 14, color: T.ink, bold: i < 2 }); });
  hline(sl, G.mx, 1.8 + 5 * 0.8, 6.0);
  rr(sl, 7.1, 1.8, 5.63, 4.85, T.midnight, null, 0.12);
  txt(sl, "OUR MISSION", 7.45, 2.1, 4, 0.28, { fontSize: 10.5, bold: true, charSpacing: 3, color: T.amber });
  txt(sl, "Automate and simplify operational workflows with secure, extensible enterprise software that empowers teams to focus on what matters most.", 7.45, 2.45, 5.0, 1.6, { fontSize: 17, bold: true, color: T.white });
  txt(sl, "OUR JOURNEY", 7.45, 4.3, 4, 0.28, { fontSize: 10.5, bold: true, charSpacing: 3, color: T.amber });
  [["2023", "Training foundation"], ["2024", "Product development"], ["2025", "Independent product company"], ["Today", "Eight enterprise platforms"]].forEach(([y0, t], i) => {
    const x = 7.45 + i * 1.3; dot(sl, x, 4.75, i === 3 ? T.amber : T.onDarkMuted, 0.16);
    if (i < 3) sl.addShape("line", { x: x + 0.2, y: 4.83, w: 1.06, h: 0, line: { color: "2E4468", width: 1 } });
    txt(sl, y0, x, 5.02, 1.25, 0.3, { fontSize: 13, bold: true, color: i === 3 ? T.amber : T.white }); txt(sl, t, x, 5.34, 1.22, 0.75, { fontSize: 10.5, color: T.onDarkMuted }); });
  txt(sl, "Momentum with Vision", 7.45, 6.2, 4, 0.3, { fontSize: 11, italic: true, color: T.onDarkMuted });
  sl.addNotes("Company facts, mission and milestones from maviontech.com (Company page and footer), quoted as published. Verticals from the maviontech.com home page. No employee, customer or revenue figures are stated because none are evidenced.");

  // 3 PROBLEMS TODAY
  sl = add("CAT_TINT"); head(sl, "The problems we hear every day", "Why everyday operations feel harder than they should");
  [["sheet", "Work lives in spreadsheets", "Admissions, stock, attendance and leads live in files and chat groups, so nothing reconciles."],
   ["repeat", "Reconciliation, every single cycle", "Attendance to payroll, fees to invoices, stock to books: re-keyed by hand every month."],
   ["clock", "Leaders wait days for the numbers", "Reports are assembled after the fact, when the decision was needed yesterday."],
   ["eyeoff", "Data walks out with people", "Customer numbers, CVs and records sit on personal phones and inboxes."],
   ["gst", "Compliance rebuilt by hand", "GST returns, statutory payroll and certificates are prepared again every period."],
   ["lock", "No control, no trail", "Shared logins and no record of who changed a price, a mark or a payslip."]].forEach(([ic, h, b], i) => {
    const x = G.mx + (i % 3) * 4.11, y = 1.8 + Math.floor(i / 3) * 2.42, w = 3.81; card(sl, x, y, w, 2.2, T.white); chip(sl, CI[ic], x + 0.3, y + 0.3);
    txt(sl, h, x + 0.3, y + 0.98, w - 0.6, 0.6, { fontSize: 15, bold: true, color: T.ink }); txt(sl, b, x + 0.3, y + 1.48, w - 0.6, 0.68, { fontSize: 12 }); });
  sl.addNotes("Problems drawn from the problem slides of the eight approved product decks and the catalogue (slide 7). No market statistics are used.");

  // 4 HOW WE SIMPLIFY OPERATIONS
  sl = add("CAT_CONTENT"); head(sl, "How MavionTech simplifies operations", "One governed system for each part of the business");
  const SIM = [["layers", "Capture once", "The same data typed into three tools", "One record for every student, employee, candidate, customer or product"],
    ["workflow", "Automate the routine", "Reconciliation and reports built by hand", "Payroll from attendance, invoices from fees, reports that build themselves"],
    ["shield", "Control who does what", "Shared logins and no audit trail", "Role-based access, two-factor where it matters, every change on record"],
    ["dash", "See it live", "Numbers arrive days late", "Live dashboards for every role, exports in your own brand"]];
  SIM.forEach(([ic, h, before, after], i) => { const w = (G.cw - 0.9) / 4, x = G.mx + i * (w + 0.3);
    card(sl, x, 1.8, w, 4.15, T.paper); chip(sl, CI[ic], x + 0.3, 2.05);
    txt(sl, h, x + 0.3, 2.75, w - 0.6, 0.35, { fontSize: 16, bold: true, color: T.ink });
    label(sl, "Before", x + 0.3, 3.25, 2); txt(sl, before, x + 0.3, 3.5, w - 0.6, 0.7, { fontSize: 12, color: T.slate500 });
    rr(sl, x + 0.15, 4.3, w - 0.3, 1.5, T.midnight, null, 0.1);
    txt(sl, "WITH MAVIONTECH", x + 0.35, 4.42, w - 0.6, 0.25, { fontSize: 9.5, bold: true, charSpacing: 2, color: T.amber });
    txt(sl, after, x + 0.35, 4.7, w - 0.6, 1.05, { fontSize: 12, color: T.white });
    if (i < 3) K0.line(sl, x + w + 0.03, 3.0, x + w + 0.27, 3.0); });
  rr(sl, G.mx, 6.15, G.cw, 0.55, tint(T.amber, 0.85), null, 0.1);
  txt(sl, "Built for how India does business: GST, statutory payroll, INR pricing, Razorpay and WhatsApp, with each customer's data kept separate.", G.mx + 0.25, 6.15, G.cw - 0.5, 0.55, { fontSize: 12.5, color: T.ink, valign: "middle" });
  sl.addNotes("Four ways every MavionTech product simplifies operations, generalised from the approved decks and the catalogue's shared foundation (slide 10). 'Kept separate' covers a database per customer (seven products) and organisation scoping (Vyaas AI).");

  // 5 PRODUCT CATALOGUE
  sl = add("CAT_TINT"); head(sl, "Our product catalogue", "Eight platforms, one standard of engineering");
  const ONE = { agastya: "Cloud ERP for school groups: admissions, academics, fees, transport and parent communication.",
    pragyannxt: "Author, deliver, proctor, score and certify assessments, with verifiable credentials.",
    vortex: "People platform: HR, Face-AI attendance, leave, payroll and employee self-service on one record.",
    protonnxt: "AI-assisted applicant tracking for recruitment firms and talent teams, from requisition to joining.",
    mavionlearn: "Enterprise LMS that scores skills against role targets and runs compliance on its own.",
    salespulse: "India-first sales CRM with privacy-masked calling and reports that build themselves.",
    heeliks: "Inventory, point of sale and B2B order-to-cash on one stock ledger, GST-ready.",
    vyaas: "Enterprise AI assistant: cited answers, finished documents and a coding agent, under your policy." };
  ORDER.forEach((k, i) => { const x = G.mx + (i % 2) * 6.17, y = 1.72 + Math.floor(i / 2) * 1.27, w = 5.97, h = 1.15;
    card(sl, x, y, w, h, T.white); sl.addImage({ path: MARK[k], x: x + 0.22, y: y + 0.22, w: 0.6, h: 0.6 });
    txt(sl, NAME(k), x + 1.0, y + 0.1, 2.4, 0.3, { fontSize: 15, bold: true, color: T.ink });
    txt(sl, M.PRODUCTS[k].category, x + 1.0, y + 0.4, w - 1.25, 0.22, { fontSize: 10, bold: true, color: ACC(k) });
    txt(sl, ONE[k], x + 1.0, y + 0.64, w - 1.2, 0.46, { fontSize: 10.5 });
    badge(sl, k, x + w - 1.75, y + 0.12); });
  sl.addNotes("Status as set by MavionTech (10 Nov 2026): Flagship and ready: Agastya, PragyanNxt, Vortex HRMS, ProtonNxt. Ready, tested and available: MavionLearn, SalesPulse CRM, HeeLIKS. Premium product envisioned for the future: Vyaas AI. Full detail in the Corporate Product Catalogue vNext.");

  // 6 PROBLEM -> PRODUCT
  sl = add("CAT_CONTENT"); head(sl, "How our products tackle them", "Each problem, the product that answers it, and how");
  const PS = [["vortex", "Attendance-to-payroll reconciliation every month", "Face-AI attendance and policy-driven payroll on one employee record"],
    ["protonnxt", "Hiring spread across inboxes, sheets and agencies", "One structured pipeline with AI résumé parsing and controlled vendor access"],
    ["pragyannxt", "Assessments and certificates that get questioned", "Proctored assessments with an integrity score, and credentials anyone can verify"],
    ["agastya", "School operations spread across registers and chat groups", "Admissions to report cards, fees and transport on one governed platform per school"],
    ["mavionlearn", "Training that cannot prove capability", "A skill matrix against role targets, and compliance campaigns that run themselves"],
    ["salespulse", "Customer contacts leave with sales reps", "Privacy-masked calling, email and WhatsApp, and reports that build themselves"],
    ["heeliks", "Stock, sales and GST books that never agree", "One append-only stock ledger from purchase order to paid invoice, GSTR-1 ready"],
    ["vyaas", "AI answers nobody can trust or govern", "Cited answers over your own knowledge, under organisation policy (premium, coming)"]];
  label(sl, "The problem today", G.mx, 1.72, 4); label(sl, "Our product", 5.25, 1.72, 2.5); label(sl, "How it is solved", 7.75, 1.72, 4);
  sl.addShape("line", { x: G.mx, y: 2.02, w: G.cw, h: 0, line: { color: T.ink, width: 1.25 } });
  PS.forEach(([k, p, s], i) => { const y = 2.08 + i * 0.58; if (i) hline(sl, G.mx, y - 0.03, G.cw);
    txt(sl, p, G.mx, y, 4.45, 0.53, { fontSize: 12, bold: true, color: T.ink, valign: "middle" });
    sl.addImage({ path: MARK[k], x: 5.25, y: y + 0.13, w: 0.27, h: 0.27 }); txt(sl, NAME(k), 5.62, y, 2.0, 0.53, { fontSize: 12, bold: true, color: ACC(k), valign: "middle" });
    txt(sl, s, 7.75, y, 4.98, 0.53, { fontSize: 11, valign: "middle" }); });
  sl.addNotes("Problem and solution pairs from the approved product decks and the catalogue's opportunities slide. Vyaas AI is a premium product envisioned for the future.");

  // 7 REAL PRODUCTS
  sl = add("CAT_CONTENT"); head(sl, "Real products, shown as they are", "Our four flagship products, as they look today");
  const SH = [["vortex", SCR.vortex.tiles, "Platform overview from vortexhrms.com"], ["protonnxt", SCR.protonnxt.dash, "Recruitment admin dashboard"], ["pragyannxt", SCR.pragyannxt.dash, "Evaluation dashboard"], ["agastya", SCR.agastya.dash, "School administrator dashboard"]];
  const sw = (G.cw - 0.9) / 4;
  for (let i = 0; i < 4; i++) { const [k, img, cap] = SH[i], x = G.mx + i * (sw + 0.3);
    frame(sl, await shotOf(k, img, sw, 3.3), x, 1.8, sw, 3.3, { alt: cap });
    sl.addImage({ path: MARK[k], x, y: 5.3, w: 0.3, h: 0.3 }); txt(sl, NAME(k), x + 0.4, 5.3, sw - 0.4, 0.3, { fontSize: 14, bold: true, color: T.ink, valign: "middle" });
    badge(sl, k, x, 5.72); txt(sl, cap + (k === "vortex" ? "." : " (demo data)."), x, 6.08, sw, 0.5, { fontSize: 11 }); }
  sl.addNotes("Real captures with demo data from the approved decks. The Vortex HRMS image is from its public site (vortexhrms.com); in-app Vortex screenshots are an open item.");

  // 8–11 FLAGSHIP PRODUCTS, one slide each, in MavionTech's order (Vortex HRMS, ProtonNxt, PragyanNxt, Agastya) (content from the approved catalogue vNext showcases)
  sec("Flagship products");
  const FLAG = [
    ["vortex", "Unified People Platform", "Hire to retire. Attendance to payroll. On one record.", "HR, payroll & finance · field and shift workforces",
     "HR, payroll, attendance and helpdesk live in separate tools. Finance reconciles attendance to payroll by hand, and statutory rules keep changing.",
     "One people platform: Face-AI attendance, policy-driven payroll, leave, approvals and employee self-service, with a database per customer.",
     ["Face-AI attendance with geo-fencing", "Policy-driven payroll: PF, ESI, PT, TDS", "Leave, approvals and escalations", "VortexGo and SnapLens mobile apps"],
     SCR.vortex.tiles, "Platform overview from vortexhrms.com.", [["14", "modules"], ["Face-AI", "attendance"], ["2", "mobile apps"]]],
    ["protonnxt", "Enterprise ATS", "From requisition to hire, in one structured pipeline", "Staffing firms · talent teams · vendor agencies",
     "Recruiters screen résumés by hand, ownership is unclear, feedback lives in inboxes, and vendor CVs arrive with no caps, duplicates or audit.",
     "An AI-assisted ATS for recruitment firms and talent teams: sourcing, parsing, interviews, offers, vendors and client insight on one system.",
     ["AI résumé parsing (OpenAI or Gemini)", "Pipeline from requisition to joining", "L1–L3 interviews, structured feedback", "Vendor portal with caps and duplicate checks"],
     SCR.protonnxt.dash, "Admin dashboard: KPIs, JD statistics and recruitment funnel (demo data).", [["15", "modules in every tenant"], ["2", "AI parsing paths"], ["L1–L3", "structured interviews"]]],
    ["pragyannxt", "Assessment & Certification", "Results you can defend. Credentials anyone can verify.", "Corporate hiring teams · academic institutions · certification",
     "Gamed screening tests push the wrong candidates forward, unmonitored exams devalue certificates, and point tools never talk to each other.",
     "One platform to author, deliver, proctor, score and certify, with an integrity score on every attempt.",
     ["Question bank with AI generation", "Live and AI visual proctoring", "Integrity score on every attempt", "Signed certificates anyone can verify"],
     SCR.pragyannxt.dash, "Evaluation dashboard: active exams, users and question bank (demo data).", [["8", "integrated modules"], ["Ed25519", "signed credentials"], ["5-step", "author to certify"]]],
    ["agastya", "Cloud School ERP", "One operating system for every school in your group", "School groups & chains · single schools · principals",
     "School groups run on registers, spreadsheets and WhatsApp. Nothing reconciles, leaders wait days for numbers, and student data sits on personal phones.",
     "Admissions to report cards, fees to fleet: every department and campus on one governed platform, with each school's data in its own database.",
     ["Admissions to report cards on one record", "Fees, invoices and daily collections", "Transport, library, hostel and staff", "Parent portal, student app, WhatsApp inbox"],
     SCR.agastya.dash, "School administrator dashboard (demo data).", [["19", "integrated modules"], ["8", "role cockpits"], ["96", "permission codes"]]]];
  for (const [k, cat, promise, built, problem, answer, caps, hero, cap, proof] of FLAG) {
    sl = add("CAT_CONTENT"); head(sl, `Flagship product · ${cat}`, promise); prodTag(sl, k);
    badge(sl, k, G.mx, 1.72); txt(sl, built, G.mx + 1.7, 1.72, 4.0, 0.27, { fontSize: 11, bold: true, color: ACC(k), valign: "middle" });
    label(sl, "The problem", G.mx, 2.2, 3); txt(sl, problem, G.mx, 2.45, 5.35, 0.85, { fontSize: 12 });
    label(sl, "Our answer", G.mx, 3.4, 3, T.amberDeep); txt(sl, answer, G.mx, 3.65, 5.35, 0.85, { fontSize: 12.5, color: T.ink });
    label(sl, "Key capabilities", G.mx, 4.65, 3);
    caps.forEach((t, j) => { const x = G.mx + (j % 2) * 2.75, y = 4.95 + Math.floor(j / 2) * 0.62;
      sl.addImage({ path: KIT[k].checkA, x, y: y + 0.04, w: 0.2, h: 0.2 }); txt(sl, t, x + 0.3, y, 2.4, 0.56, { fontSize: 11.5, color: T.ink }); });
    frame(sl, await shotOf(k, hero, 6.45, 3.85), 6.28, 1.72, 6.45, 3.85, { alt: cap });
    txt(sl, cap, 6.28, 5.62, 6.45, 0.26, { fontSize: 10.5, color: T.slate500 });
    proof.forEach(([v, l], j) => { const px = 6.28 + j * 2.2, pw = 2.05; rr(sl, px, 5.98, pw, 0.82, T.midnight, null, 0.1);
      txt(sl, v, px + 0.18, 6.02, pw - 0.3, 0.42, { fontSize: v.length > 6 ? 16 : 20, bold: true, color: T.amber, valign: "middle" });
      txt(sl, l, px + 0.18, 6.44, pw - 0.3, 0.3, { fontSize: 10, color: T.onDarkMuted }); });
    sl.addNotes(`${NAME(k)}: flagship product, ready today (MavionTech status, 10 Nov 2026). Content from the approved catalogue vNext showcase and the approved ${NAME(k)} deck. ` + (k === "vortex" ? "No in-app Vortex screenshots exist in the sources; the image is the public vortexhrms.com page. Prices are not shown in this send-anywhere deck." : "Screen is a real product capture with demo data."));
  }

  // 12 WHY MAVIONTECH
  sec("Working with MavionTech");
  sl = add("CAT_DARK"); head(sl, "Why MavionTech", "Six reasons to build on MavionTech");
  [["eye", "Real products, shown as they are", "Real product screens with demo data, and no invented customers."], ["db", "Your data, isolated by design", "A database per customer in seven products; organisation scoping in Vyaas AI."],
   ["shield", "Governed by design", "Role-based access, audit trails and session controls you can inspect."], ["sliders", "Configurable without code", "Administrators shape dashboards, fields, workflows and branding."],
   ["landmark", "Built for how India does business", "GST, statutory payroll, INR pricing and local payment and messaging rails."], ["layers", "One partner, eight platforms", "One engineering standard and one point of contact across the portfolio."]].forEach(([ic, h, b], i) => {
    const x = G.mx + (i % 3) * 4.11, y = 1.85 + Math.floor(i / 3) * 2.35, w = 3.81; rr(sl, x, y, w, 2.1, T.midnight2, "22365A", 0.1);
    txt(sl, String(i + 1).padStart(2, "0"), x + 0.3, y + 0.25, 1, 0.45, { fontSize: 22, bold: true, color: T.amber });
    sl.addImage({ path: CW[ic], x: x + w - 0.6, y: y + 0.3, w: 0.3, h: 0.3 });
    txt(sl, h, x + 0.3, y + 0.85, w - 0.6, 0.32, { fontSize: 15, bold: true, color: T.white }); txt(sl, b, x + 0.3, y + 1.2, w - 0.6, 0.75, { fontSize: 12, color: T.onDarkMuted }); });
  sl.addNotes("As in the approved catalogue vNext, slide 60. Certifications, uptime and support hours are not claimed; they are confirmed in each proposal.");

  // 9 HOW WE WORK WITH YOU
  sl = add("CAT_TINT"); head(sl, "How we work with you", "From a first conversation to go-live, step by step");
  [["Demo", "See the product on scenarios that match yours."], ["Pilot", "Prove value on your own data with one team, outlet or campus."], ["Proposal", "Scope, plan and commercials confirmed in writing."]].forEach(([h, b], i) => {
    const x = G.mx + i * 4.11; rr(sl, x, 1.8, 3.81, 1.05, i === 1 ? T.amber : T.white, i === 1 ? null : T.line, 0.1);
    txt(sl, `${i + 1}  ${h}`, x + 0.25, 1.9, 3.3, 0.36, { fontSize: 16, bold: true, color: i === 1 ? T.midnight : T.ink });
    txt(sl, b, x + 0.25, 2.3, 3.4, 0.5, { fontSize: 12, color: i === 1 ? T.midnight : T.slate700 }); });
  label(sl, "Implementation method", G.mx, 3.2, 4);
  [["Discover", "Requirements, process mapping, design and kickoff"], ["Configure", "Setup, configuration, integrations and data migration"], ["Validate", "User acceptance, performance testing and security review"], ["Go live", "Training, launch support, documentation and handover"]].forEach(([h, b], i) => {
    const x = G.mx + i * 3.08, w = 2.86; dot(sl, x, 3.6, i === 3 ? T.amber : T.amberDeep, 0.22);
    if (i < 3) hline(sl, x + 0.3, 3.71, w - 0.1, T.slate300);
    txt(sl, h, x, 3.95, w, 0.32, { fontSize: 15, bold: true, color: T.ink }); txt(sl, b, x, 4.3, w - 0.15, 0.62, { fontSize: 12 }); });
  rr(sl, G.mx, 5.2, G.cw, 1.45, T.midnight, null, 0.12);
  [["cloud", "Cloud SaaS", "Multi-tenant, for every product"], ["server", "On-premise or self-hosted", "Available for selected products"], ["life", "Managed hosting & support", "Backup, recovery and continuous updates"]].forEach(([ic, h, b], i) => {
    const x = G.mx + 0.3 + i * 4.0; chip(sl, CW[ic], x, 5.5, 0.56, T.midnight2);
    txt(sl, h, x + 0.75, 5.45, 3.1, 0.34, { fontSize: 14, bold: true, color: T.white }); txt(sl, b, x + 0.75, 5.8, 3.1, 0.5, { fontSize: 11.5, color: T.onDarkMuted }); });
  txt(sl, "Indicative method; timelines are confirmed during scoping.", G.mx, 6.75, G.cw, 0.25, { fontSize: 10, color: T.slate500 });
  sl.addNotes("Engagement path and four-phase method from the MavionTech company profile, as used in the approved catalogue (slide 53). Deployment options from maviontech.com and the approved decks: on-premise or self-hosted for MavionLearn, PragyanNxt, HeeLIKS and Vyaas AI.");

  // 10 CLOSE
  sl = add("CAT_CLOSE");
  txt(sl, "LET'S BUILD MOMENTUM TOGETHER", G.mx, 1.95, 6.5, 0.3, { fontSize: 11, bold: true, charSpacing: 4, color: T.amber });
  sl.addText("Tell us where work feels hardest. We'll show you the fix.", { placeholder: "title" });
  sl.addText("Book a 30-minute demo on scenarios that match yours, or ask for the full Corporate Product Catalogue.", { placeholder: "body" });
  [["Book a demo", T.amber, T.midnight], ["Get the catalogue", T.midnight2, T.white]].forEach(([t, f, c], i) => {
    rr(sl, G.mx + i * 2.25, 5.2, 2.05, 0.52, f, i ? "2E4468" : null, 0.26); txt(sl, t, G.mx + i * 2.25, 5.2, 2.05, 0.52, { fontSize: 13, bold: true, color: c, align: "center", valign: "middle" }); });
  rr(sl, 7.6, 1.6, 5.13, 4.6, T.midnight2, "2E4468", 0.12);
  sl.addImage({ path: LOGO, x: 7.95, y: 1.9, w: 0.62, h: 0.62 });
  sl.addText([{ text: "MavionTech Pvt. Ltd.", options: { bold: true, fontSize: 16, color: T.white, breakLine: true } }, { text: "Enterprise Business Applications", options: { fontSize: 11, color: T.onDarkMuted } }],
    { x: 8.72, y: 1.9, w: 3.8, h: 0.62, margin: 0, valign: "middle", isTextBox: true });
  [["Sales & support", "communications@maviontech.com"], ["Phone", "+91 91580 08002"], ["Web", "www.maviontech.com"],
   ["Office", "Office 505, Zen Business Center, Bhumkar Chowk, Wakad, Pune, Maharashtra 411057 (visits by appointment)"]].forEach(([a, b], i) => {
    const y = 2.85 + i * 0.68; txt(sl, a.toUpperCase(), 7.95, y, 1.5, 0.25, { fontSize: 9.5, bold: true, charSpacing: 2, color: T.amber });
    txt(sl, b, 9.45, y - 0.03, 3.1, i === 3 ? 0.72 : 0.35, { fontSize: 12, color: T.white }); });
  sl.addNotes("Contact details from maviontech.com (Contact page and footer). The '30-minute demo' is a suggested format, not a published offer; adjust as needed.");

  await pres.writeFile({ fileName: OUT });
  console.log("written", OUT, pres.slides.length, "slides");
})().catch(e => { console.error(e); process.exit(1); });
'''
# K0 = any product kit, for its safe connector helper
body = body.replace('  sec("Introduction");', '  const K0 = KIT.agastya;\n  sec("Introduction");', 1)
io.open(B / "build_sales_intro.js", "w", encoding="utf-8").write(head + body)
print("written build_sales_intro.js")
