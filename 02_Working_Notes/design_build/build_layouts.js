// MavionTech_Reusable_Layouts.pptx — layout library with guidance
const pptxgen = require("pptxgenjs");
const L = require("react-icons/lu");
const M = require("./mt");
const { T, TYPE, G, tint, kicker, title, iconChip, caption, card } = M;
const OUT = M.ROOT + "/07_Design_System/MavionTech_Reusable_Layouts.pptx";
M.PRODUCTS.corporate.accent = "A0680A"; // amber-deep for text on light surfaces
const A = "A0680A";

function imgPh(sl, x, y, w, h, label) { // screenshot placeholder in the signature frame
  const chrome = 0.26;
  sl.addShape("roundRect", { x, y, w, h, rectRadius: 0.08, fill: { color: T.white }, line: { color: T.line, width: 0.75 },
    shadow: { type: "outer", color: "0B1A30", opacity: 0.12, blur: 14, offset: 4, angle: 90 } });
  sl.addShape("rect", { x: x + 0.02, y: y + 0.02, w: w - 0.04, h: chrome - 0.02, fill: { color: "F2F5F9" }, line: { type: "none" } });
  ["D63B42", "F5A623", "12A150"].forEach((c, i) => sl.addShape("ellipse", { x: x + 0.14 + i * 0.15, y: y + 0.085, w: 0.09, h: 0.09, fill: { color: tint(c, 0.35) }, line: { type: "none" } }));
  sl.addShape("rect", { x: x + 0.04, y: y + chrome, w: w - 0.08, h: h - chrome - 0.04, fill: { color: T.mist }, line: { type: "none" } });
  sl.addText(label, { x: x + 0.2, y: y + chrome, w: w - 0.4, h: h - chrome, margin: 0, fontSize: 11, color: T.slate500, align: "center", valign: "middle", isTextBox: true });
}
const body = (sl, text, x, y, w, h, o = {}) => sl.addText(text, Object.assign({ x, y, w, h, margin: 0, fontSize: TYPE.body, color: T.slate700, valign: "top", isTextBox: true }, o));

(async () => {
  const bgCover = await M.darkBg(T.amber, "bg_cover_corporate.png", "cover");
  const bgDiv = await M.darkBg(T.amber, "bg_divider_corporate.png", "divider");
  for (const [k, p] of Object.entries(M.PRODUCTS)) { await M.darkBg(p.accent === "A0680A" ? T.amber : p.accent, `bg_cover_${k}.png`, "cover"); await M.darkBg(p.accent === "A0680A" ? T.amber : p.accent, `bg_divider_${k}.png`, "divider"); }
  const ic = {}; for (const [k, n] of Object.entries({ a: "LuLayoutDashboard", b: "LuShieldCheck", c: "LuWorkflow", d: "LuUsers", e: "LuDatabase", f: "LuCloud", chk: "LuCheck" }))
    ic[k] = await M.icon(L[n], A, `ic_${k}_${A}.png`);

  const pres = new pptxgen(); pres.layout = "LAYOUT_WIDE";
  pres.author = "MavionTech Pvt. Ltd."; pres.company = "MavionTech Pvt. Ltd."; pres.title = "MavionTech Reusable Layouts";
  pres.theme = { headFontFace: M.FONT.head, bodyFontFace: M.FONT.body };
  M.defineLayouts(pres, "corporate", bgCover, bgDiv);
  const sec = t => pres.addSection({ title: t });
  const add = (m, s) => pres.addSlide({ masterName: m, sectionTitle: s });
  const T1 = (sl, k, t) => { sl.addText(k.toUpperCase(), { placeholder: "kicker" }); sl.addText(t, { placeholder: "title" }); };

  // 01 Cover
  sec("Openers"); let sl = add("MT_COVER", "Openers");
  kicker(sl, "Enterprise sales overview", T.amber, G.mx, 1.95);
  sl.addText("Product name", { placeholder: "title" });
  sl.addText("PRODUCT CATEGORY", { x: G.mx, y: 3.22, w: 5, h: 0.3, margin: 0, fontSize: 12, bold: true, charSpacing: 4, color: tint(T.amber, 0.3), isTextBox: true });
  sl.addText("One-line promise in two lines at most", { placeholder: "body" });
  body(sl, "Supporting sentence: what the product does, for whom, and the single proof that matters most.", G.mx, 4.9, 5.3, 0.9, { color: T.onDarkMuted });
  imgPh(sl, 6.65, 1.25, 6.1, 3.85, "Hero screenshot · full app chrome · 16:10");
  imgPh(sl, 6.45, 4.2, 3.7, 2.45, "Secondary screen · overlapping");
  sl.addNotes("L01 Cover. Dark Mavion Midnight background with the product accent glow and orbit motif. Two overlapping screenshot frames. Product name 56pt, promise 26pt.");

  // 02 Section divider
  sl = add("MT_DIVIDER", "Openers");
  sl.addText("02", { x: G.mx, y: 1.75, w: 2, h: 1.1, margin: 0, fontSize: 72, bold: true, color: T.amber, isTextBox: true });
  sl.addText("Section title", { placeholder: "title" });
  sl.addText("One sentence on what this section proves", { placeholder: "body" });
  sl.addNotes("L02 Section divider. Large amber section number, 40pt title, one supporting sentence. Use sparingly: only for decks longer than 20 slides.");

  // 03 Problem cards
  sec("Narrative"); sl = add("MT_CONTENT", "Narrative"); T1(sl, "The challenge", "State the business problem as an outcome the buyer recognises");
  [0, 1, 2, 3].forEach(i => { const x = G.mx + (i % 2) * 6.215, y = 1.8 + Math.floor(i / 2) * 2.45;
    card(sl, x, y, 5.915, 2.15); iconChip(sl, [ic.a, ic.b, ic.c, ic.d][i], x + 0.3, y + 0.3, A, 0.56);
    sl.addText("Pain point headline", { x: x + 1.05, y: y + 0.32, w: 4.6, h: 0.35, margin: 0, fontSize: TYPE.h3, bold: true, color: T.ink, isTextBox: true });
    body(sl, "Two lines describing the consequence in the buyer's language. No invented statistics.", x + 1.05, y + 0.75, 4.55, 1.1); });
  sl.addNotes("L03 Problem: 2x2 icon cards. Max four pains.");

  // 04 Hero + feature column
  sl = add("MT_CONTENT", "Narrative"); T1(sl, "Module name", "Outcome headline: what changes for the user");
  imgPh(sl, G.mx, 1.75, 7.6, 4.6, "Main screenshot · sidebar-cropped close-up");
  [0, 1, 2, 3].forEach(i => { const y = 1.8 + i * 1.12; iconChip(sl, [ic.a, ic.b, ic.c, ic.d][i], 8.6, y, A, 0.5);
    sl.addText("Feature name", { x: 9.3, y: y - 0.02, w: 3.4, h: 0.3, margin: 0, fontSize: 14, bold: true, color: T.ink, isTextBox: true });
    body(sl, "One line on the capability and its benefit.", 9.3, y + 0.3, 3.4, 0.6, { fontSize: 12 }); });
  caption(sl, "Caption: what the screenshot shows (demo data).", G.mx, 6.45, 7.6);
  sl.addNotes("L04 Hero + feature column (mirror it on alternate slides). 3–4 features, each with an icon.");

  // 05 Main + two stacked
  sl = add("MT_CONTENT", "Narrative"); T1(sl, "Module name", "Outcome headline for a module with three proof screens");
  imgPh(sl, G.mx, 1.75, 7.2, 4.45, "Main screen"); imgPh(sl, 8.1, 1.75, 4.63, 2.12, "Supporting screen"); imgPh(sl, 8.1, 4.08, 4.63, 2.12, "Supporting screen");
  [0, 1, 2].forEach(i => { const x = G.mx + i * 4.1;
    sl.addShape("ellipse", { x, y: 6.38, w: 0.34, h: 0.34, fill: { color: T.amber }, line: { type: "none" } });
    sl.addText(String(i + 1), { x, y: 6.38, w: 0.34, h: 0.34, margin: 0, fontSize: 11, bold: true, color: T.midnight, align: "center", valign: "middle", isTextBox: true });
    body(sl, "Numbered callout that matches the badge on the screenshot.", x + 0.45, 6.3, 3.5, 0.5, { fontSize: 11.5, valign: "middle" }); });
  sl.addNotes("L05 Main + two stacked screenshots with numbered amber callouts.");

  // 06 Persona columns
  sl = add("MT_CONTENT_TINT", "Narrative"); T1(sl, "Built for every persona", "Each role gets exactly the screens it needs");
  [0, 1, 2, 3].forEach(i => { const w = (G.cw - 3 * 0.3) / 4, x = G.mx + i * (w + 0.3);
    imgPh(sl, x, 1.75, w, 3.6, "Role cockpit · portrait crop");
    sl.addText("Role name", { x, y: 5.55, w, h: 0.3, margin: 0, fontSize: 14, bold: true, color: T.ink, isTextBox: true });
    body(sl, "What this role does here, in one line.", x, 5.88, w, 0.6, { fontSize: 12 }); });
  sl.addNotes("L06 Four portrait columns: personas, portals or mobile screens.");

  // 07 Icon grid / module map
  sec("Product"); sl = add("MT_CONTENT_TINT", "Product"); T1(sl, "Product map", "N modules across M pillars, on one data model");
  const cw = (G.cw - 2 * G.gutter) / 3;
  [0, 1, 2, 3, 4, 5].forEach(i => { const x = G.mx + (i % 3) * (cw + G.gutter), y = 1.72 + Math.floor(i / 3) * 2.32;
    card(sl, x, y, cw, 2.1, T.white); iconChip(sl, Object.values(ic)[i], x + 0.25, y + 0.25, A, 0.5);
    sl.addText("Pillar name", { x: x + 0.9, y: y + 0.22, w: cw - 1.1, h: 0.3, margin: 0, fontSize: TYPE.h3, bold: true, color: T.ink, isTextBox: true });
    sl.addText("3 modules", { x: x + 0.9, y: y + 0.5, w: 1.5, h: 0.24, margin: 0, fontSize: 10.5, bold: true, color: A, isTextBox: true });
    sl.addText([{ text: "Module one", options: { bullet: { indent: 14 }, breakLine: true } }, { text: "Module two", options: { bullet: { indent: 14 }, breakLine: true } }, { text: "Module three", options: { bullet: { indent: 14 } } }],
      { x: x + 0.25, y: y + 0.9, w: cw - 0.45, h: 1.05, margin: 0, fontSize: 12.5, color: T.slate700, valign: "top", isTextBox: true }); });
  sl.addNotes("L07 Module map: 3x2 pillar cards. Card height may vary by row to avoid empty space.");

  // 08 Stat tiles
  sl = add("MT_CONTENT", "Product"); T1(sl, "At a glance", "Depth you can verify");
  [0, 1, 2, 3].forEach(i => { const w = (G.cw - 3 * 0.3) / 4, x = G.mx + i * (w + 0.3), dark = i === 0;
    sl.addShape("roundRect", { x, y: 1.85, w, h: 2.0, rectRadius: 0.1, fill: { color: dark ? T.midnight : T.paper }, line: { color: dark ? T.midnight : T.line, width: 0.75 } });
    sl.addText("128", { x: x + 0.3, y: 2.05, w: w - 0.6, h: 0.9, margin: 0, fontSize: TYPE.stat, bold: true, color: dark ? T.amber : A, isTextBox: true });
    body(sl, "Short label for the number", x + 0.3, 3.0, w - 0.6, 0.6, { color: dark ? T.onDarkMuted : T.slate700 }); });
  imgPh(sl, G.mx, 4.2, G.cw, 2.3, "Optional wide screenshot strip or supporting visual");
  caption(sl, "Source line: every number needs one (code review, demo data, or a cited document).", G.mx, 6.6, 9);
  sl.addNotes("L08 Stat tiles: 4 tiles, one dark tile for rhythm. Every number carries a source line.");

  // 09 Process
  sl = add("MT_CONTENT", "Product"); T1(sl, "How it works", "Five stages, one closed loop");
  [0, 1, 2, 3, 4].forEach(i => { const w = (G.cw - 4 * 0.3) / 5, x = G.mx + i * (w + 0.3);
    card(sl, x, 2.0, w, 3.2, i === 4 ? T.midnight : T.paper, i === 4 ? T.midnight : T.line);
    sl.addText(`0${i + 1}`, { x: x + 0.25, y: 2.2, w: 1, h: 0.5, margin: 0, fontSize: 24, bold: true, color: i === 4 ? T.amber : A, isTextBox: true });
    sl.addText("Stage", { x: x + 0.25, y: 2.85, w: w - 0.5, h: 0.35, margin: 0, fontSize: TYPE.h3, bold: true, color: i === 4 ? T.white : T.ink, isTextBox: true });
    body(sl, "What happens here and which module does it.", x + 0.25, 3.3, w - 0.5, 1.5, { fontSize: 12.5, color: i === 4 ? T.onDarkMuted : T.slate700 });
    if (i < 4) sl.addShape("line", { x: x + w + 0.03, y: 3.6, w: 0.24, h: 0, line: { color: T.slate300, width: 1.25, endArrowType: "triangle" } }); });
  body(sl, "One sentence explaining why the flow matters.", G.mx, 5.6, G.cw, 0.5, { fontSize: 13 });
  sl.addNotes("L09 Process: 3–6 stages. Highlight the differentiating stage with the dark card.");

  // 10 Architecture layers
  sl = add("MT_CONTENT", "Product"); T1(sl, "Architecture", "Layered architecture, drawn with native shapes");
  [["Experience", "Web app · mobile app · portals"], ["Application", "Modules · workflow engine · APIs"], ["Security", "RBAC · audit · sessions"], ["Data", "Control database · one database per tenant"]].forEach(([h, t], i) => {
    const y = 1.85 + i * 1.08, dark = i === 3;
    sl.addShape("roundRect", { x: G.mx, y, w: 9.0, h: 0.88, rectRadius: 0.08, fill: { color: dark ? T.midnight : (i % 2 ? T.paper : T.white) }, line: { color: dark ? T.midnight : T.line, width: 0.75 } });
    sl.addText(h.toUpperCase(), { x: G.mx + 0.3, y, w: 2, h: 0.88, margin: 0, fontSize: 10.5, bold: true, charSpacing: 2, color: dark ? T.amber : A, valign: "middle", isTextBox: true });
    sl.addText(t, { x: G.mx + 2.4, y, w: 6.4, h: 0.88, margin: 0, fontSize: 14, color: dark ? T.white : T.ink, valign: "middle", isTextBox: true }); });
  ["Integration one", "Integration two", "Integration three", "Integration four"].forEach((t, i) => { const y = 1.85 + i * 1.08;
    card(sl, 9.95, y, 2.78, 0.88, T.white); sl.addText(t, { x: 10.15, y, w: 2.4, h: 0.88, margin: 0, fontSize: 13, bold: true, color: T.ink, valign: "middle", isTextBox: true }); });
  sl.addText("INTEGRATIONS", { x: 9.95, y: 1.55, w: 2.5, h: 0.25, margin: 0, fontSize: 10, bold: true, charSpacing: 2, color: T.slate500, isTextBox: true });
  sl.addNotes("L10 Architecture: horizontal layers + integrations column. For request flows use the left-to-right pipeline variant (see prototype slide 4).");

  // 11 Comparison
  sec("Proof & value"); sl = add("MT_DARK", "Proof & value"); T1(sl, "Why us", "What changes when a customer moves to the product");
  sl.addText("TODAY", { x: 3.2, y: 1.75, w: 3.5, h: 0.25, margin: 0, fontSize: 10, bold: true, charSpacing: 2, color: T.onDarkMuted, isTextBox: true });
  sl.addText("WITH THE PRODUCT", { x: 7.4, y: 1.75, w: 4, h: 0.25, margin: 0, fontSize: 10, bold: true, charSpacing: 2, color: T.amber, isTextBox: true });
  [0, 1, 2, 3, 4].forEach(i => { const y = 2.12 + i * 0.86;
    sl.addShape("line", { x: G.mx, y: y - 0.06, w: G.cw, h: 0, line: { color: "22365A", width: 0.75 } });
    sl.addText("Dimension", { x: G.mx, y, w: 2.4, h: 0.7, margin: 0, fontSize: 14, bold: true, color: T.white, valign: "middle", isTextBox: true });
    sl.addText("How it works today", { x: 3.2, y, w: 3.8, h: 0.7, margin: 0, fontSize: 13, color: T.onDarkMuted, valign: "middle", isTextBox: true });
    sl.addText("The specific capability that changes it", { x: 7.4, y, w: 5.3, h: 0.7, margin: 0, fontSize: 13, color: T.white, valign: "middle", isTextBox: true }); });
  sl.addNotes("L11 Comparison (dark). Each 'with' cell must map to a capability proved earlier in the deck.");

  // 12 Pricing
  sl = add("MT_CONTENT_TINT", "Proof & value"); T1(sl, "Packaging", "Plans that scale with the customer");
  [0, 1, 2].forEach(i => { const w = (G.cw - 2 * 0.3) / 3, x = G.mx + i * (w + 0.3), hi = i === 1;
    sl.addShape("roundRect", { x, y: 1.8, w, h: 4.6, rectRadius: 0.12, fill: { color: hi ? T.midnight : T.white }, line: { color: hi ? T.midnight : T.line, width: 0.75 } });
    sl.addText("Plan name", { x: x + 0.35, y: 2.05, w: w - 0.7, h: 0.35, margin: 0, fontSize: TYPE.h3, bold: true, color: hi ? T.white : T.ink, isTextBox: true });
    sl.addText("Rs —", { x: x + 0.35, y: 2.5, w: w - 0.7, h: 0.75, margin: 0, fontSize: 36, bold: true, color: hi ? T.amber : A, isTextBox: true });
    sl.addText("per unit / month · confirmed price book only", { x: x + 0.35, y: 3.25, w: w - 0.7, h: 0.3, margin: 0, fontSize: 11, color: hi ? T.onDarkMuted : T.slate500, isTextBox: true });
    ["Inclusion one", "Inclusion two", "Inclusion three", "Inclusion four"].forEach((t, k) => {
      sl.addImage({ path: ic.chk, x: x + 0.35, y: 3.85 + k * 0.5, w: 0.2, h: 0.2 });
      sl.addText(t, { x: x + 0.7, y: 3.77 + k * 0.5, w: w - 1.05, h: 0.36, margin: 0, fontSize: 13, color: hi ? T.white : T.slate700, valign: "middle", isTextBox: true }); }); });
  sl.addNotes("L12 Pricing: only with an approved price book. The highlighted plan uses the dark card.");

  // 13 Timeline
  sl = add("MT_CONTENT", "Proof & value"); T1(sl, "Getting started", "An indicative rollout");
  sl.addShape("line", { x: G.mx, y: 2.55, w: G.cw, h: 0, line: { color: T.line, width: 1.5 } });
  [0, 1, 2, 3].forEach(i => { const w = G.cw / 4, x = G.mx + i * w;
    sl.addShape("ellipse", { x, y: 2.43, w: 0.24, h: 0.24, fill: { color: i === 2 ? T.amber : A }, line: { color: T.white, width: 2 } });
    sl.addText(`WEEK ${i * 2 + 1}–${i * 2 + 2}`, { x, y: 1.95, w: w - 0.2, h: 0.3, margin: 0, fontSize: 10.5, bold: true, charSpacing: 2, color: A, isTextBox: true });
    iconChip(sl, [ic.a, ic.b, ic.c, ic.d][i], x, 3.0, A, 0.5);
    sl.addText("Phase name", { x, y: 3.7, w: w - 0.3, h: 0.35, margin: 0, fontSize: TYPE.h3, bold: true, color: T.ink, isTextBox: true });
    body(sl, "What is delivered in this phase and who is involved.", x, 4.1, w - 0.35, 1.3, { fontSize: 13 }); });
  sl.addShape("roundRect", { x: G.mx, y: 5.75, w: G.cw, h: 0.62, rectRadius: 0.1, fill: { color: tint(A, 0.9) }, line: { type: "none" } });
  body(sl, "Timelines are indicative and depend on data readiness and the modules in scope.", G.mx + 0.25, 5.75, G.cw - 0.5, 0.62, { fontSize: 12.5, color: T.ink, valign: "middle" });
  sl.addNotes("L13 Timeline. Always label timelines as indicative.");

  // 14 Roadmap
  sl = add("MT_DARK", "Proof & value"); T1(sl, "Roadmap", "Live today, and what comes next");
  ["Live today", "Next", "Later"].forEach((h, i) => { const w = (G.cw - 2 * 0.3) / 3, x = G.mx + i * (w + 0.3);
    sl.addShape("roundRect", { x, y: 1.8, w, h: 4.6, rectRadius: 0.1, fill: { color: T.midnight2 }, line: { color: i === 0 ? T.amber : "22365A", width: i === 0 ? 1.5 : 0.75 } });
    sl.addText(h.toUpperCase(), { x: x + 0.3, y: 2.0, w: w - 0.6, h: 0.3, margin: 0, fontSize: 11, bold: true, charSpacing: 2, color: i === 0 ? T.amber : T.onDarkMuted, isTextBox: true });
    sl.addText(["Capability", "Capability", "Capability", "Capability"].map((t, k) => ({ text: t, options: { bullet: { indent: 14 }, breakLine: k < 3 } })),
      { x: x + 0.3, y: 2.5, w: w - 0.6, h: 3.6, margin: 0, fontSize: 14, color: T.white, valign: "top", paraSpaceAfter: 6, isTextBox: true }); });
  sl.addNotes("L14 Roadmap. Only roadmap items appear here, never in module slides.");

  // 15 Close
  sec("Close"); sl = add("MT_CLOSE", "Close");
  kicker(sl, "Let's get started", T.amber, G.mx, 1.95);
  sl.addText("One clear ask", { placeholder: "title" });
  sl.addText("See the product on your data, then plan a pilot", { placeholder: "body" });
  [["Book a demo", T.amber, T.midnight], ["Plan a pilot", T.midnight2, T.white]].forEach(([t, f, c], i) => {
    sl.addShape("roundRect", { x: G.mx + i * 2.05, y: 5.1, w: 1.85, h: 0.5, rectRadius: 0.25, fill: { color: f }, line: { color: i ? "2E4468" : f, width: 0.75 } });
    sl.addText(t, { x: G.mx + i * 2.05, y: 5.1, w: 1.85, h: 0.5, margin: 0, fontSize: 13, bold: true, color: c, align: "center", valign: "middle", isTextBox: true }); });
  sl.addShape("roundRect", { x: 7.6, y: 1.9, w: 5.13, h: 3.7, rectRadius: 0.12, fill: { color: T.midnight2 }, line: { color: "2E4468", width: 0.75 } });
  sl.addImage({ path: "D:/MavionTech_sales/branding/maviontech-logo.png", x: 7.95, y: 2.2, w: 0.6, h: 0.6 });
  sl.addText([{ text: "MavionTech Pvt. Ltd.", options: { bold: true, fontSize: 16, color: T.white, breakLine: true } }, { text: "Momentum with Vision", options: { fontSize: 11, color: T.onDarkMuted } }],
    { x: 8.7, y: 2.2, w: 3.8, h: 0.6, margin: 0, valign: "middle", isTextBox: true });
  sl.addText([
    { text: "communications@maviontech.com", options: { breakLine: true } }, { text: "+91 91580 08002", options: { breakLine: true } }, { text: "www.maviontech.com", options: { breakLine: true } },
    { text: "505 Zen Business Center, Bhumkar Chowk, Wakad, Pune 411057", options: {} }],
    { x: 7.95, y: 3.1, w: 4.5, h: 2.2, margin: 0, fontSize: 13, color: T.white, valign: "top", paraSpaceAfter: 6, isTextBox: true });
  sl.addNotes("L15 Close. Same on every deck: one ask, two buttons, the official MavionTech contact card.");

  // 16 Product accent system
  sec("Reference"); sl = add("MT_CONTENT", "Reference"); T1(sl, "Endorsed brand system", "Six product accents, one MavionTech identity");
  Object.entries(M.PRODUCTS).filter(([k]) => k !== "corporate").forEach(([k, p], i) => {
    const w = (G.cw - 2 * 0.3) / 3, x = G.mx + (i % 3) * (w + 0.3), y = 1.8 + Math.floor(i / 3) * 2.45;
    sl.addImage({ path: M.ASSETS + `/bg_cover_${k}.png`, x, y, w, h: 1.4, sizing: { type: "cover", w, h: 1.4 } });
    sl.addText(p.name, { x: x + 0.25, y: y + 0.3, w: w - 0.5, h: 0.45, margin: 0, fontSize: 20, bold: true, color: T.white, isTextBox: true });
    sl.addText(p.category.toUpperCase(), { x: x + 0.25, y: y + 0.78, w: w - 0.5, h: 0.25, margin: 0, fontSize: 9, bold: true, charSpacing: 2, color: tint(p.accent, 0.45), isTextBox: true });
    sl.addShape("roundRect", { x, y: y + 1.55, w: 0.45, h: 0.45, rectRadius: 0.08, fill: { color: p.accent }, line: { type: "none" } });
    sl.addText(`Accent  #${p.accent}`, { x: x + 0.6, y: y + 1.55, w: w - 0.6, h: 0.45, margin: 0, fontSize: 12, color: T.ink, valign: "middle", isTextBox: true }); });
  sl.addNotes("L16 Reference: product accents on the shared Midnight + Amber system.");

  await pres.writeFile({ fileName: OUT }); console.log("written", OUT);
})();
