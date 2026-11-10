// Vyaas_Final.pptx — portfolio expansion, built on the locked MavionTech design system (mt.js + deckkit.js).
// Sources: D:\MavionTech_sales\Vyaas_Enterprise_Sales_Deck.pptx, Vyaas_screenshots\, deck_work\product_analysis.md,
// deck_work\discovered_inputs.md, D:\llm (read-only spot checks). No customers, testimonials, certifications, uptime or savings-% claims.
const fs = require("fs");
const pptxgen = require("pptxgenjs");
const M = require("./mt");
const { makeKit } = require("./deckkit");
const { T, TYPE, G, tint, frame, iconChip, caption, card } = M;
const SRC = "D:/MavionTech_sales/Vyaas_screenshots/";
const OUTDIR = M.ROOT + "/Final_Product_Decks/Vyaas";
const OUT = process.env.OUT || (OUTDIR + "/Vyaas_Final.pptx");
fs.mkdirSync(OUTDIR, { recursive: true });
const V = (f, crop = [420, 0, "fit"]) => ({ src: SRC + f + ".png", crop });   // 420 px = app sidebar
const N = f => V(f, [0, 0]);
const ICONS = { chat: "LuMessagesSquare", quote: "LuQuote", book: "LuBookOpen", file: "LuFileText", image: "LuImage", bot: "LuBot", tool: "LuWrench",
  globe: "LuGlobe", code: "LuCode", terminal: "LuSquareTerminal", git: "LuGitPullRequest", branch: "LuGitBranch", shield: "LuShieldCheck", lock: "LuLock",
  box: "LuBox", users: "LuUsers", user: "LuUserCheck", crown: "LuCrown", policy: "LuListChecks", history: "LuHistory", share: "LuShare2", coin: "LuCoins",
  chart: "LuChartColumn", gauge: "LuGauge", bell: "LuBell", layers: "LuLayers", cpu: "LuCpu", server: "LuServer", db: "LuDatabase", key: "LuKeyRound",
  upload: "LuUpload", search: "LuSearch", list: "LuList", check: "LuCircleCheck", flask: "LuFlaskConical", hand: "LuHand", rocket: "LuRocket",
  target: "LuTarget", zap: "LuZap", eye: "LuEye", ban: "LuBan", plug: "LuPlug", laptop: "LuLaptop", cloud: "LuCloud", sliders: "LuSlidersHorizontal",
  brain: "LuBrain", scissors: "LuScissors", filter: "LuFilter", receipt: "LuReceipt", wallet: "LuWallet", repeat: "LuRepeat", settings: "LuSettings2",
  help: "LuCircleHelp", sparkles: "LuSparkles", scale: "LuScale", network: "LuNetwork", download: "LuDownload", mail: "LuMail", building: "LuBuilding2" };

(async () => {
  const pres = new pptxgen(); pres.layout = "LAYOUT_WIDE";
  pres.author = "MavionTech Pvt. Ltd."; pres.company = "MavionTech Pvt. Ltd."; pres.title = "Vyaas AI — Enterprise AI Assistant";
  pres.theme = { headFontFace: M.FONT.head, bodyFontFace: M.FONT.body };
  const A = M.PRODUCTS.vyaas.accent;
  M.defineLayouts(pres, "vyaas", await M.darkBg(A, "bg_cover_vyaas.png", "cover"), await M.darkBg(A, "bg_divider_vyaas.png", "divider"));
  const K = await makeKit(pres, "vyaas", "vy", ICONS);
  const { ic, icW, txt } = K;
  const mark = M.ASSETS + "/vyaas_mark.png";
  const colLabel = (sl, t, x, w, y = 1.7, c = T.slate500) => txt(sl, t.toUpperCase(), x, y, w, 0.25, { fontSize: 10, bold: true, charSpacing: 2, color: c });
  const sbox = (sl, x, y, w, h, hd, sub, o = {}) => { sl.addShape("roundRect", { x, y, w, h, rectRadius: 0.08, fill: { color: o.fill || T.white }, line: { color: o.line || T.line, width: o.lw || 0.75 } });
    sl.addText([{ text: hd, options: { bold: true, fontSize: o.hs || 13, color: o.hc || T.ink, breakLine: !!sub } }].concat(sub ? [{ text: sub, options: { fontSize: o.ss || 11, color: o.sc || T.slate500 } }] : []), { x: x + 0.15, y, w: w - 0.3, h, margin: 0, valign: "middle", align: o.align || "left", isTextBox: true }); };
  const divider = (n, pn, t, b) => { K.sec(pn); const s = K.add("MT_DIVIDER"); M.kicker(s, `Pillar ${n} · ${pn}`, T.amber, G.mx, 2.6); s.addText(t, { placeholder: "title" }); s.addText(b, { placeholder: "body" }); return s; };
  const steps = (sl, items, y = 1.95, h = 2.75, hi = -1) => { const n = items.length, gap = 0.3, w = (G.cw - (n - 1) * gap) / n;
    items.forEach(([icn, hd, b], i) => { const x = G.mx + i * (w + gap), on = i === hi;
      card(sl, x, y, w, h, on ? T.midnight : T.paper, on ? T.midnight : T.line);
      if (on) { sl.addShape("roundRect", { x: x + 0.22, y: y + 0.25, w: 0.5, h: 0.5, rectRadius: 0.12, fill: { color: A }, line: { type: "none" } }); sl.addImage({ path: icW[icn], x: x + 0.34, y: y + 0.37, w: 0.26, h: 0.26 }); }
      else iconChip(sl, ic[icn], x + 0.22, y + 0.25, A, 0.5);
      txt(sl, String(i + 1), x + w - 0.6, y + 0.25, 0.4, 0.45, { fontSize: 20, bold: true, color: on ? T.amber : tint(A, 0.5), align: "right" });
      txt(sl, hd, x + 0.22, y + 0.95, w - 0.4, 0.55, { fontSize: 14, bold: true, color: on ? T.white : T.ink });
      txt(sl, b, x + 0.22, y + 1.5, w - 0.4, h - 1.6, { fontSize: 11.5, color: on ? T.onDarkMuted : T.slate700 });
      if (i < n - 1) K.line(sl, x + w + 0.03, y + h / 2, x + w + gap - 0.03, y + h / 2); }); };
  // two screens with frame height h, captions, then a feature row directly underneath
  const pair = async (sl, a, b, feats, h = 3.3) => { const w = (G.cw - 0.3) / 2;
    frame(sl, await K.S(a, w, h), G.mx, 1.75, w, h, { alt: a.cap }); frame(sl, await K.S(b, w, h), G.mx + w + 0.3, 1.75, w, h, { alt: b.cap });
    caption(sl, a.cap, G.mx, 1.75 + h + 0.07, w); caption(sl, b.cap, G.mx + w + 0.3, 1.75 + h + 0.07, w);
    const fy = Math.min(5.65, 1.75 + h + 0.65), fw = G.cw / feats.length;
    feats.forEach(([icn, hh, bb], i) => K.feat(sl, ic[icn], hh, bb, G.mx + i * fw, fy, fw - 0.25, 0.45)); };

  // 1 COVER
  K.sec("Opening");
  let sl = K.add("MT_COVER");
  K.cover(sl, { name: "Vyaas AI", category: "Enterprise AI Assistant", mark,
    promise: "Answers you can cite. Code you can ship.",
    support: "One governed workspace where teams chat over their own knowledge, generate finished documents and hand engineering tasks to a sandboxed coding agent.",
    chips: ["Cited answers", "Coding agent", "Org governance"] });
  await K.coverShots(sl, V("chat_cited"), V("chat_docgen"), "Vyaas AI · Cited answer");
  sl.addNotes("Opening. Vyaas AI is a MavionTech product. The tagline is the product's own login hero line (templates/account/login.html). All screens use the demo organisation 'Northwind Robotics' and seeded demo users; none are customers.");

  // 2 PROBLEM
  sl = K.add(); K.head(sl, "The problem", "AI pilots stall when they can't be trusted, governed or shipped");
  K.iconCards(sl, [["quote", "Answers you can't trust", "Generic chatbots answer without sources, so teams re-verify every reply by hand."],
    ["lock", "Your data, somewhere else", "Company knowledge pasted into consumer tools: no policy, no isolation, no audit trail."],
    ["code", "Suggests, doesn't ship", "Copilots autocomplete lines but can't take a task through to a reviewed pull request."],
    ["coin", "Runaway token spend", "Bloated prompts and repeated context make model bills unpredictable at scale."],
    ["layers", "Tool sprawl", "One tool to chat, another for documents, another for code: nothing shared or governed."],
    ["users", "Expertise stays personal", "Good prompts and assistants live with individuals and never reach the team."]], 3, 1.8, 2.2);
  sl.addNotes("Problems from the source deck slide 2 and product_analysis.md positioning. No market statistics are used.");

  // 3 MEET
  sl = K.add(); K.head(sl, "Meet Vyaas AI", "One platform to converse, build and govern");
  await K.heroFeature(sl, V("chat_compare"), [["chat", "Converse & create", "Cited chat over your knowledge; documents and images on demand."],
    ["git", "Build & ship", "A coding agent that edits, tests and opens pull requests in a sandbox."],
    ["shield", "Govern & scale", "Organisations, policies, audit, plans and automatic cost control."],
    ["cpu", "Multi-model", "Claude and OpenAI models behind one provider-agnostic catalogue."]],
    "A structured comparison answer with a downloadable document (demo data).", false, "Vyaas AI · Chat");
  sl.addNotes("Three pillars from product_analysis.md: Converse & Create, Build & Ship, Govern & Scale.");

  // 4 AT A GLANCE
  sl = K.add("MT_CONTENT_TINT"); K.head(sl, "At a glance", "A real platform, counted from the code");
  [["14", "functional modules"], ["38", "data models"], ["102", "routes and screens"], ["368", "automated tests"],
   ["2", "model providers: Claude and OpenAI"], ["7", "plan tiers, Guest to Enterprise"], ["3", "organisation roles"], ["23k+", "lines of Python"]].forEach(([v, l], i) => {
    const w = (G.cw - 0.9) / 4, x = G.mx + (i % 4) * (w + 0.3), y = 1.85 + Math.floor(i / 4) * 2.0, hi = i === 3;
    card(sl, x, y, w, 1.7, hi ? T.midnight : T.white, hi ? T.midnight : T.line);
    txt(sl, v, x + 0.3, y + 0.25, w - 0.6, 0.75, { fontSize: 40, bold: true, color: hi ? T.amber : A });
    txt(sl, l, x + 0.3, y + 1.05, w - 0.6, 0.45, { fontSize: 13, color: hi ? T.white : T.slate700 }); });
  txt(sl, "Source: static analysis of the Vyaas AI repository (10 Nov 2026): apps, models, URL routes, test functions and plan seed (apps/catalogue/seed.py).", G.mx, 6.05, G.cw, 0.3, { fontSize: 11, color: T.slate500 });
  sl.addNotes("Corrected from the source deck, which said '5 plan tiers': the plan seed defines 7 (Guest, Free, Plus, Pro, Max, Team, Enterprise); Guest is not public. Test count re-verified (368).");

  // 5 WHO
  sl = K.add(); K.head(sl, "Who it's for", "One platform, every seat in the room");
  [["crown", "The buyer", "CTO, Head of Engineering or IT Director", "Governs model choice, spend and data policy across the organisation."],
   ["code", "Engineers", "Members", "Hand tasks to the coding agent; review and merge its pull requests."],
   ["book", "Knowledge workers", "Members", "Cited answers, analyses, documents and assistants over company knowledge."],
   ["settings", "Org admins", "Owner and Admin roles", "Members, invitations, policies, shared assets and the audit log."]].forEach(([icn, h, r, b], i) => {
    const w = (G.cw - 0.9) / 4, x = G.mx + i * (w + 0.3); card(sl, x, 1.8, w, 3.6, T.paper); iconChip(sl, ic[icn], x + 0.28, 2.08, A, 0.56);
    txt(sl, h, x + 0.28, 2.85, w - 0.56, 0.35, { fontSize: TYPE.h3, bold: true, color: T.ink });
    txt(sl, r, x + 0.28, 3.22, w - 0.56, 0.5, { fontSize: 11.5, bold: true, color: A });
    txt(sl, b, x + 0.28, 3.75, w - 0.56, 1.5, { fontSize: 12.5 }); });
  K.note(sl, "Organisation features (members, roles, policies, shared assets, audit) come with the Team and Enterprise plans; individuals start on Free, Plus, Pro or Max.", 5.7, 0.62);
  sl.addNotes("Roles Owner/Admin/Member from apps/orgs/models.py; org_features=True only on Team and Enterprise in apps/catalogue/seed.py.");

  // 6 PRODUCT MAP
  sl = K.add("MT_CONTENT_TINT"); K.head(sl, "Product map", "Fourteen modules, three pillars");
  const PIL = [["chat", "Converse & Create", ["Chat", "Knowledge Base", "Documents", "Assistants", "Tools"]],
    ["git", "Build & Ship", ["Coding Agent", "Git import, commit and PR", "Sandbox and approvals", "Connect companion"]],
    ["shield", "Govern & Scale", ["Organizations", "Policies and audit", "Token Optimisation Engine", "Model Catalogue", "Billing and plans", "Analytics", "Admin console", "Notifications"]]];
  const pw = (G.cw - 0.6) / 3;
  PIL.forEach(([icn, h, items], i) => { const x = G.mx + i * (pw + 0.3), y = 1.75, ch = 4.05;
    card(sl, x, y, pw, ch, T.white); iconChip(sl, ic[icn], x + 0.28, y + 0.28, A, 0.52);
    txt(sl, h, x + 1.0, y + 0.36, pw - 1.2, 0.35, { fontSize: TYPE.h3, bold: true, color: T.ink });
    sl.addText(items.map((t, k) => ({ text: t, options: { bullet: { indent: 12 }, breakLine: k < items.length - 1 } })), { x: x + 0.28, y: y + 1.1, w: pw - 0.5, h: ch - 1.2, margin: 0, fontSize: 13, color: T.slate700, valign: "top", paraSpaceAfter: 5, isTextBox: true }); });
  K.note(sl, "Plus the platform underneath: email sign-in with a guest trial, search, and a provider-agnostic model catalogue shared by every module.", 6.0, 0.6);
  sl.addNotes("14 Django apps: chat, knowledge, documents, assistants, tools, workspace, orgs, optimizer, catalogue, billing, analytics, core, notifications, accounts. Grouping from product_analysis.md.");

  // 7 DIFFERENTIATORS
  sl = K.add(); K.head(sl, "Why Vyaas wins", "Eight differentiators the product actually proves");
  K.iconCards(sl, [["quote", "Answers you can cite", "Grounded replies carry numbered sources from your own documents."],
    ["git", "Code you can ship", "The agent commits, pushes and opens pull requests on your repositories."],
    ["coin", "Token Optimisation Engine", "Trims context before every request; savings reported per message."],
    ["cpu", "Multi-model, no lock-in", "Claude and OpenAI, chosen per conversation or task."],
    ["shield", "Org governance", "Policies, roles, shared assets and an audit log per organisation."],
    ["file", "Docs and images", "Real Word, PowerPoint and Excel files and designed images."],
    ["box", "Hardened sandbox", "gVisor isolation, no network by default, three approval modes."],
    ["sparkles", "Clean, cite-first UX", "Clarifying-question cards and visible reasoning."]], 4, 1.8, 2.1);
  sl.addNotes("USPs U1–U8 from product_analysis.md, each with a code reference: knowledge/retrieval.py, workspace/gitops.py, optimizer/, catalogue/models.py, orgs/, documents/, workspace/sandbox.py and tools.py, static/js/chat.js.");

  // ===== PILLAR 1
  sl = divider(1, "Converse & Create", "Cited answers and finished work", "Chat, Knowledge Base, Documents, Assistants and Tools, grounded in your own content.");
  sl.addNotes("Pillar 1: knowledge work.");

  sl = K.add(); K.head(sl, "Chat", "Lead with the answer: grounded, structured, finished");
  await K.heroFeature(sl, V("chat_clarify"), [["cpu", "Any model, one composer", "Switch between Claude and OpenAI models per conversation."],
    ["help", "Clarifying questions", "When a request is ambiguous, Vyaas asks with option cards first."],
    ["upload", "Attachments", "Office files, PDFs, code, data and images sent to the model."],
    ["sliders", "Controllable reasoning", "Effort from quick to extra-deep; web tools toggled per chat."]],
    "Chat: a follow-up answered with a regenerated Excel workbook to download (demo data).", false, "Vyaas AI · Chat");
  sl.addNotes("apps/chat: streaming, extended thinking, attachments, clarifying-question cards, per-conversation model/effort/web toggles, guest trial, import.");

  sl = K.add("MT_CONTENT_TINT"); K.head(sl, "Answers you can cite", "How every grounded answer carries its sources");
  steps(sl, [["upload", "Upload", "PDF, Word, Markdown, CSV, JSON or HTML into a collection."], ["layers", "Ingest", "Documents are split into chunks and indexed."],
    ["search", "Retrieve", "BM25 ranks the chunks that match each question."], ["quote", "Cite", "Top chunks go to the model as numbered sources."],
    ["check", "Verify", "The reply links each claim to its source."]], 1.85, 2.45, 3);
  frame(sl, await K.S(V("chat_cited"), 6.0, 2.05), G.mx, 4.5, 6.0, 2.05, { alt: "Cited answer" });
  caption(sl, "Grounded answer citing [1] Leave and Benefits.md (demo data).", G.mx, 6.6, 6.0);
  K.feat(sl, ic.search, "Deterministic retrieval", "Lexical BM25 in pure Python: no vector store to run, same question gives the same sources.", 6.95, 4.6, 5.78, 0.48);
  K.feat(sl, ic.lock, "Scoped knowledge", "Collections are private or shared with the organisation, under policy.", 6.95, 5.6, 5.78, 0.48);
  sl.addNotes("apps/knowledge/retrieval.py: 'Lexical retrieval over stored chunks (D31): BM25 in pure Python, deterministic, no vector store.' Numbered sources are injected into chat.");

  sl = K.add(); K.head(sl, "Knowledge Base", "Grounded answers from your own content");
  await K.heroFeature(sl, V("kb_index"), [["book", "Collections", "Group documents by team, product or policy."], ["upload", "Many formats", "PDF, DOCX, TXT, MD, CSV, JSON and HTML."],
    ["share", "Org or private", "Share with the organisation or keep it to yourself."], ["chat", "Chat with it", "Open a chat grounded in a collection in one click."]],
    "Knowledge Base: storage, collections and organisation-shared content (demo data).", true, "Vyaas AI · Knowledge Base");
  sl.addNotes("apps/knowledge: collections, upload and ingestion, retrieval, plan storage limits (knowledge_mb per plan).");

  sl = K.add(); K.head(sl, "Documents and images", "Deliverables, not walls of text");
  await pair(sl, Object.assign(V("chat_docgen"), { cap: "A Word document generated in chat, with a download card (demo data)." }),
    Object.assign(V("docs_index"), { cap: "Documents library: every generated file, by type and date." }),
    [["file", "Word · PowerPoint · Excel", "Real files, plus CSV, Markdown, HTML."], ["image", "Images", "Designed graphics and photo-style images."], ["download", "Download cards", "Update themselves as files finish."], ["list", "Your library", "Owner-only, always downloadable."]]);
  sl.addNotes("apps/documents: create_document tool (docx/pptx/xlsx/csv/md/html), designed graphic and photorealistic image generation (photo.py), per-user library.");

  sl = K.add(); K.head(sl, "Assistants", "Repeatable expertise, shared with the team");
  await pair(sl, Object.assign(V("assistants_index"), { cap: "Assistants gallery: your own, shared and starter templates (demo data)." }),
    Object.assign(V("assistants_edit"), { cap: "Build an assistant: instructions, model, tools and knowledge." }),
    [["bot", "Custom assistants", "Own model, effort, tools and instructions."], ["book", "Grounded in knowledge", "Attach collections to an assistant."], ["sparkles", "Starter templates", "Spin up proven assistants fast."], ["share", "Duplicate and share", "One approved way of working."]]);
  sl.addNotes("apps/assistants: custom assistants, starter templates (seed_assistants), duplicate/share; plan limits on assistants per user.");

  sl = K.add(); K.head(sl, "Tools", "Live data and compute, under policy");
  await K.heroFeature(sl, V("tools_index"), [["globe", "Web search and fetch", "Current information with sources, or a page or PDF read on request."],
    ["terminal", "Code execution", "Run code for data analysis, in a sandbox."], ["policy", "Per-user and plan gated", "Admins and plans decide what is available."],
    ["sliders", "Preferences", "Turn tools on where they help."]],
    "Tools catalogue: web search, web fetch, code execution and capabilities (demo data).", false, "Vyaas AI · Tools");
  sl.addNotes("apps/tools: Anthropic server tools behind a registry with per-user preferences and plan gating (web_search, code_execution flags in the plan seed).");

  // ===== PILLAR 2
  sl = divider(2, "Build & Ship", "From a task to a pull request", "A resumable coding agent in a hardened sandbox: it imports your repository, edits, tests and opens a pull request.");
  sl.addNotes("Pillar 2: the coding agent.");

  sl = K.add("MT_CONTENT_TINT"); K.head(sl, "Coding agent workflow", "An engineer, not an autocomplete");
  steps(sl, [["branch", "Import", "Clone a GitHub repository into a workspace, or upload a folder."], ["list", "Task", "Describe the change; attach a screenshot if it helps."],
    ["code", "Edit in sandbox", "The agent reads, edits and runs commands in isolation."], ["flask", "Test", "Runs the suite and fixes what fails."],
    ["hand", "Approve", "Your run mode decides what needs a yes; destructive commands always ask."], ["git", "Ship", "Commit, push and open a pull request for review."]], 1.95, 2.95, 5);
  K.note(sl, "Resumable and crash-safe: long tasks survive restarts, and you can change the run mode mid-task. Every pull request goes through your normal review.", 5.25, 0.62);
  sl.addNotes("apps/workspace: agent.py (resumable loop, mode switch mid-task), gitops.py (import/commit/push/PR), tools.py (modes ask, auto_edit, full_auto; destructive commands always ask), AgentAttachment for screenshots. GitHub is supported today; GitLab is planned.");

  sl = K.add(); K.head(sl, "Agent workspace", "Files, diff, terminal and task on one screen");
  frame(sl, await K.S(V("w_detail", [0, 0]), 7.95, 4.3), G.mx, 1.75, 7.95, 4.3, { url: "Vyaas AI · Workspace", alt: "Agent workspace" });
  caption(sl, "Workspace for a demo repository: file tree, diff area, terminal and the task rail (demo data).", G.mx, 6.12, 7.95);
  const zx = G.mx + 7.95 + 0.4, zw = G.cw - 7.95 - 0.4;
  frame(sl, await K.S(V("w_detail", [1895, 180]), zw, 3.75), zx, 1.75, zw, 3.75, { alt: "Task rail: Opened PR #42" });
  caption(sl, "Task rail, enlarged (demo data).", zx, 5.57, zw);
  txt(sl, "“Ran the suite: 23 passed. Opened PR #42.” Each task runs within a token budget set by plan.", zx, 5.95, zw, 0.75, { fontSize: 11.5, color: T.ink });
  sl.addNotes("w_detail screenshot: the task rail reads 'Ran the suite: 23 passed. Opened PR #42.' on a demo repository (northwind-robotics/robotics-api). Agent task budgets per plan in apps/catalogue/seed.py.");

  sl = K.add(); K.head(sl, "Safe autonomy", "Powerful, and contained in layers");
  const LY = [["Approval gate", "Three run modes: Ask, Auto-edit, Full auto. Destructive commands always ask.", "hand"],
    ["Egress control", "No network by default; dependency installs only through a registry-only proxy.", "ban"],
    ["gVisor sandbox", "One hardened container per command: runsc runtime, read-only root, dropped capabilities, non-root, resource limits.", "box"],
    ["Encrypted credentials", "Git tokens and provider keys encrypted at rest (Fernet) and never sent to the model.", "key"]];
  LY.forEach(([h, b, icn], i) => { const x = G.mx + i * 0.35, y = 1.8 + i * 1.08, w = 7.4 - i * 0.7;
    sl.addShape("roundRect", { x, y, w, h: 0.92, rectRadius: 0.1, fill: { color: i === 2 ? T.midnight : tint(A, 0.9 - i * 0.04) }, line: { type: "none" } });
    sl.addImage({ path: i === 2 ? icW[icn] : ic[icn], x: x + 0.25, y: y + 0.31, w: 0.3, h: 0.3 });
    txt(sl, h, x + 0.75, y + 0.1, 2.4, 0.3, { fontSize: 14, bold: true, color: i === 2 ? T.white : T.ink });
    txt(sl, b, x + 0.75, y + 0.42, w - 0.95, 0.48, { fontSize: 11, color: i === 2 ? T.onDarkMuted : T.slate700 }); });
  card(sl, 8.4, 1.8, 4.33, 4.15, T.paper);
  colLabel(sl, "Three run modes", 8.7, 3.8, 2.05, A);
  [["Ask", "Every command and every write asks first."], ["Auto-edit", "Edits run; every command asks."], ["Full auto", "Everything runs except destructive commands, which always ask."]].forEach(([h, b], i) => {
    txt(sl, h, 8.7, 2.5 + i * 1.08, 3.8, 0.3, { fontSize: 14, bold: true, color: T.ink }); txt(sl, b, 8.7, 2.82 + i * 1.08, 3.8, 0.6, { fontSize: 12 }); });
  K.note(sl, "Autonomy is a dial, not a leap of faith: teams start in Ask mode and move to Full auto as trust grows, while data-loss and history-rewriting commands always stop for a human.", 6.15, 0.62);
  sl.addNotes("apps/workspace/sandbox.py (DockerExecutor: 'docker run --rm --runtime runsc --network none', read-only root, dropped caps, non-root, limits), deploy/egress (registry-only proxy), tools.py (modes and the always-ask destructive list), crypto.py (Fernet).");

  sl = K.add(); K.head(sl, "Git providers and Connect", "Connect your repositories, or run on your own machine");
  await pair(sl, Object.assign(V("w_providers"), { cap: "Git providers: connect GitHub with a personal access token, encrypted at rest." }),
    Object.assign(V("w_connect"), { cap: "Connect: a companion that runs the agent on your own computer." }),
    [["git", "GitHub today", "Personal access token; GitLab planned."], ["key", "Token encrypted", "Never logged, never shown to the model."], ["laptop", "Connect companion", "Work in your local folders."], ["eye", "You stay in control", "Clear limits on what Connect can do."]], 3.0);
  sl.addNotes("gitprovider.py ('GitLab is a planned fast-follow'); views.py returns 'Only GitHub is supported right now'. OAuth app flow and push/PR from a Connect workspace are roadmap.");

  // ===== PILLAR 3
  sl = divider(3, "Govern & Scale", "Control that scales with you", "Organisations, policies, audit, plans, analytics and automatic cost control.");
  sl.addNotes("Pillar 3: enterprise governance.");

  sl = K.add(); K.head(sl, "Organizations and members", "One organisation, clear roles, managed seats");
  await pair(sl, Object.assign(V("org_admin"), { cap: "Organisation overview: members, seats, usage and recent activity (demo data)." }),
    Object.assign(V("org_members"), { cap: "Members: invite by email, assign Owner, Admin or Member." }),
    [["users", "Three roles", "Owner, Admin, Member."], ["mail", "Invitations", "Stored as token hashes only."], ["gauge", "Seats and usage", "See who uses what."], ["building", "One org per user", "A clean tenant boundary."]]);
  sl.addNotes("apps/orgs/models.py: Role (Owner/Admin/Member), invitations store only a token hash. Data is scoped by organisation in a shared application database; this is not a database per tenant.");

  sl = K.add(); K.head(sl, "Policies and audit", "Narrow what members can do, and see everything admins did");
  await pair(sl, Object.assign(V("org_policies"), { cap: "Policies: allowed models, default model, web tools and sharing." }),
    Object.assign(V("org_audit"), { cap: "Audit log: every administrative action, with actor and time (demo data)." }),
    [["cpu", "Allowed models", "Only within what the plan allows."], ["globe", "Web tools on or off", "For every member at once."], ["coin", "Optimisation policy", "Force cost control org-wide."], ["history", "Audit log", "Invites, role and policy changes."]]);
  sl.addNotes("apps/orgs: policies (token optimisation, web tools, knowledge sharing, model allow-list) and audit log.");

  sl = K.add(); K.head(sl, "Shared assets", "Share expertise, not just access");
  await K.heroFeature(sl, Object.assign(V("org_assets"), { fh: 3.6 }), [["bot", "Shared assistants", "One approved way of working for everyone."],
    ["book", "Shared knowledge", "Collections the whole organisation can cite."], ["users", "Productive on day one", "New members inherit the team's best assets."]],
    "Shared assets: assistants and knowledge collections shared with the organisation (demo data).", true, "Vyaas AI · Admin");
  sl.addNotes("Org-shared assistants and knowledge collections (org_assets screen).");

  sl = K.add("MT_CONTENT_TINT"); K.head(sl, "Token Optimisation Engine", "Spend fewer tokens on every request, without hurting answers");
  [["L1", "Lossless normalisation", "Whitespace and formatting cleaned when a message is stored; the meaning is untouched.", "scissors"],
   ["L2", "Context optimisation", "Tool pruning, history compaction and attachment selection trim what is sent each turn.", "filter"],
   ["L3", "Guarded compression", "Optional compression checked by a fidelity guard; anything risky falls back to the original.", "shield"]].forEach(([lv, h, b, icn], i) => {
    const w = (G.cw - 0.6) / 3, x = G.mx + i * (w + 0.3), hi = i === 1;
    card(sl, x, 1.8, w, 2.6, hi ? T.midnight : T.white, hi ? T.midnight : T.line);
    txt(sl, lv, x + 0.3, 2.0, 1.0, 0.6, { fontSize: 30, bold: true, color: hi ? T.amber : A });
    txt(sl, h, x + 0.3, 2.7, w - 0.6, 0.35, { fontSize: 15, bold: true, color: hi ? T.white : T.ink });
    txt(sl, b, x + 0.3, 3.1, w - 0.6, 1.2, { fontSize: 12, color: hi ? T.onDarkMuted : T.slate700 });
    if (i < 2) K.line(sl, x + w + 0.03, 3.1, x + w + 0.27, 3.1); });
  frame(sl, await K.S(V("analytics_home", [420, 300, "fit"]), 6.2, 1.85), G.mx, 4.6, 6.2, 1.85, { alt: "Analytics savings" });
  caption(sl, "Analytics: “Token optimisation saved 9,246 input tokens” in the period (demo data).", G.mx, 6.5, 6.2);
  K.feat(sl, ic.receipt, "Savings on every reply", "Each message reports what was trimmed and the tokens saved.", 7.15, 4.65, 5.58, 0.48);
  K.feat(sl, ic.policy, "Your switch, or the org's", "Members choose levels, or an organisation policy forces them.", 7.15, 5.6, 5.58, 0.48);
  sl.addNotes("apps/optimizer: engine.py ('l1 lossless normalisation, l2 context optimisation, l3 guarded compression'; a failing stage falls back to doing nothing), pipeline.py (per-user switch, organisation can force levels; default levels l1+l2). No portfolio-wide savings percentage is claimed; the 9,246 figure is from a demo analytics screen.");

  sl = K.add(); K.head(sl, "Usage analytics", "See every token, by model, day and member");
  await K.heroFeature(sl, V("analytics_home"), [["chart", "Usage dashboard", "Messages and tokens by day, model and assistant."], ["coin", "Cost in meter units", "Measured the way models are priced."],
    ["gauge", "Allowance", "Plan allowance and roll-over at a glance."], ["users", "Organisation view", "Usage by member for owners and admins."]],
    "Analytics: messages, tokens, cost meters and usage by model (demo data).", false, "Vyaas AI · Analytics");
  sl.addNotes("apps/analytics: usage meters and cost dashboard (tabs: overview, models, assistants, knowledge, ledger, organisation).");

  sl = K.add("MT_CONTENT_TINT"); K.head(sl, "Plans and billing", "Seven tiers, priced for the work, in INR or USD");
  const PL = [["Free", "₹0", "$0", "Try Vyaas: Sonnet and Haiku, 1 workspace."], ["Plus", "₹999", "$12", "All Claude models, web search, Git push."],
    ["Pro", "₹2,499", "$29", "More usage, code execution, priority."], ["Max", "₹6,999", "$79", "Highest individual limits, 4 agent tasks."],
    ["Team", "₹2,099", "$25", "Per seat, minimum 3. Organisation features."], ["Enterprise", "₹1,25,000", "$1,500", "Org features, dedicated queue, named contact."]];
  const pw6 = (G.cw - 5 * 0.2) / 6;
  PL.forEach(([n, inr, usd, b], i) => { const x = G.mx + i * (pw6 + 0.2), hi = i === 4;
    card(sl, x, 1.8, pw6, 3.05, hi ? T.midnight : T.white, hi ? T.midnight : T.line);
    txt(sl, n.toUpperCase(), x + 0.22, 2.0, pw6 - 0.4, 0.3, { fontSize: 11, bold: true, charSpacing: 2, color: hi ? T.amber : A });
    txt(sl, inr, x + 0.22, 2.38, pw6 - 0.4, 0.5, { fontSize: i === 5 ? 20 : 24, bold: true, color: hi ? T.white : T.ink });
    txt(sl, `${usd} · a month${i === 4 ? " per seat" : ""}`, x + 0.22, 2.92, pw6 - 0.4, 0.3, { fontSize: 11, color: hi ? T.onDarkMuted : T.slate500 });
    txt(sl, b, x + 0.22, 3.4, pw6 - 0.4, 1.35, { fontSize: 12, color: hi ? T.onDarkMuted : T.slate700 }); });
  [["receipt", "Prices exclude GST", "18% added at checkout; annual billing gives two months free."], ["gauge", "Metered in tokens", "Sonnet-equivalent units; every reply shows what it used."], ["wallet", "Razorpay or Stripe", "Pay in INR or USD; a Guest trial needs no sign-up."]].forEach(([icn, h, b], i) => { const w = (G.cw - 0.6) / 3; K.feat(sl, ic[icn], h, b, G.mx + i * (w + 0.3), 5.3, w, 0.48); });
  sl.addNotes("apps/catalogue/seed.py PLANS (monthly list prices INR/USD): Plus 999/12, Pro 2,499/29, Max 6,999/79, Team 2,099/25 per seat (min 3), Enterprise 1,25,000/1,500. Guest is not public. Billing: apps/billing (Razorpay INR, Stripe USD). The source deck said 5 tiers; corrected to 7. Confirm the live price list before quoting.");

  sl = K.add(); K.head(sl, "Admin console and notifications", "Operate the fleet, and keep everyone in the loop");
  await pair(sl, Object.assign(N("admin_dashboard"), { cap: "Platform dashboard: cost, users, requests, cache rate and tokens by model (demo data)." }),
    Object.assign(V("notifications"), { cap: "Notifications: tasks done, approvals needed, documents ready, invites." }),
    [["user", "Per-user reports", "Drill into any account's usage."], ["coin", "Grant credits", "One-off allowances when needed."], ["ban", "Toggle access", "Activate or suspend accounts."], ["bell", "Notifications", "Tasks, approvals, invites, billing."]]);
  sl.addNotes("apps/core admin console (platform dashboard, per-user report, grant credits, toggle active) and apps/notifications.");

  sl = K.add(); K.head(sl, "Multi-model catalogue", "Choose your horsepower: Claude and OpenAI");
  await K.heroFeature(sl, V("chat_composer"), [["cpu", "Provider-agnostic", "Claude and OpenAI models in one catalogue; new models are added without code changes."],
    ["sliders", "Per-plan gating", "Each plan decides which models and how much effort."], ["policy", "Org allow-list", "Admins narrow the models members may use."],
    ["scale", "One meter", "Usage measured in Sonnet-equivalent units across providers."]],
    "Composer: model, knowledge, tools and assistant chosen per conversation (demo data).", true, "Vyaas AI · Composer");
  sl.addNotes("apps/catalogue/models.py (provider-agnostic), apps/chat/openai_chat.py. Specific model names are kept off the slide because they change; the current catalogue lists Claude Sonnet, Opus, Haiku and Fable models and OpenAI GPT models.");

  // ===== PLATFORM
  K.sec("Platform");
  sl = K.add(); K.head(sl, "Architecture", "Built for the enterprise from the ground up");
  const AR = [["Experience", "Enterprise shell · chat · knowledge · documents · workspaces · admin console", T.white, T.ink],
    ["Platform", "Django 5.2 + DRF · allauth sign-in · organisations, policies and audit · Token Optimisation Engine", tint(A, 0.9), T.ink],
    ["Intelligence", "Provider-agnostic catalogue: Anthropic Claude + OpenAI · BM25 retrieval · document and image skills", tint(A, 0.78), T.ink],
    ["Execution", "Coding agent loop · gVisor sandbox · registry-only egress proxy · Connect companion", T.midnight2, T.white],
    ["Foundation", "MySQL 8 · Redis + Celery · gunicorn + whitenoise · encrypted secrets · Ubuntu VPS install scripts", T.midnight, T.white]];
  AR.forEach(([h, b, f, c], i) => { const y = 1.8 + i * 0.86;
    sl.addShape("roundRect", { x: G.mx, y, w: G.cw, h: 0.74, rectRadius: 0.08, fill: { color: f }, line: { color: i === 0 ? T.line : f, width: 0.75 } });
    txt(sl, h, G.mx + 0.3, y, 2.2, 0.74, { fontSize: 15, bold: true, color: c === T.white ? T.amber : A, valign: "middle" });
    txt(sl, b, G.mx + 2.6, y, G.cw - 2.9, 0.74, { fontSize: 13, color: c, valign: "middle" }); });
  K.txt(sl, "Multi-tenant through organisations: data is scoped per organisation, with per-organisation policy and audit, in one application database.", G.mx, 6.2, G.cw, 0.4, { fontSize: 12, color: T.slate500 });
  sl.addNotes("Stack from CLAUDE.md, requirements.txt and deploy/ (install.sh, systemd, nginx, egress, sandbox). Tenancy is organisation-scoped, not a database per tenant; this matters for the portfolio catalogue's isolation statement.");

  sl = K.add("MT_DARK"); K.head(sl, "Security and data handling", "Your data, your models, your controls");
  K.darkCards(sl, [["key", "Encrypted secrets", "Provider keys and Git tokens encrypted at rest; never sent to the model."], ["box", "Sandboxed execution", "gVisor containers, no network by default, approval gates."],
    ["building", "Organisation scoping", "Members see their organisation's shared assets, under its policies."], ["history", "Audit trail", "Administrative actions logged with actor and time."],
    ["server", "Self-hostable", "Install on your own Ubuntu VPS with the provided scripts."], ["cpu", "Model choice", "Allow only the providers and models your policy approves."]], 3, 1.85, 2.0);
  sl.addNotes("Evidence: workspace/crypto.py, workspace/sandbox.py, orgs/, deploy/install.sh. No certification, data-residency or uptime claim is made; those are open items for MavionTech.");

  K.sec("Value & next steps");
  sl = K.add("MT_DARK"); K.head(sl, "Why switch", "Today versus with Vyaas AI");
  K.compare(sl, "Today", "With Vyaas AI", [["Answers", "Hallucinations, no sources", "Cited answers from your knowledge"], ["Engineering", "Autocomplete snippets", "An agent that opens pull requests"],
    ["Governance", "Data pasted into consumer tools", "Org policies, roles and audit"], ["Models", "Locked to one vendor", "Claude and OpenAI, your choice"], ["Cost", "Unpredictable token bills", "Optimisation and per-reply metering"]],
    [["quote", "Trust", "Every grounded answer shows its source."], ["git", "Throughput", "Tasks go from request to PR."], ["shield", "Control", "Policies narrow what members can do."], ["coin", "Spend", "Fewer tokens per request, measured."]]);
  sl.addNotes("Generic 'today' patterns from the source deck, not a named competitor.");

  sl = K.add(); K.head(sl, "Deployment and indicative rollout", "Live in weeks, not quarters");
  steps(sl, [["server", "Stand up · week 1", "Deploy on your VPS or use the hosted service; connect models; create the organisation."], ["book", "Seed knowledge · week 2", "Load collections, set policies and invite the team."],
    ["rocket", "Pilot · week 3", "Engineers use the coding agent; analysts use cited chat."], ["repeat", "Scale · week 4+", "Share assistants, review analytics, roll out organisation-wide."]], 1.95, 2.9, 2);
  K.note(sl, "Indicative only: timing depends on your environment, knowledge sources and team size, and is confirmed per engagement.", 5.2, 0.62);
  sl.addNotes("Indicative plan from the source deck slide 28. Self-hosting evidenced by deploy/install.sh; not a commitment.");

  sl = K.add("MT_DARK"); K.head(sl, "Roadmap", "What's next on the Vyaas AI roadmap");
  K.darkCards(sl, [["key", "OAuth for Git providers", "One-click connect; personal access tokens work today."], ["branch", "GitLab support", "Beyond GitHub, with the same workflow."],
    ["laptop", "Push and PR from Connect", "Open pull requests from a workspace on your own machine."], ["zap", "Warm task containers", "Dependencies that persist across task steps."]], 2, 1.85, 1.9, "PLANNED");
  K.txt(sl, "Planned items from docs/Vyaas_AI_Coding_Agent_P0_Spec (deferred items). Not in the current release; timelines to be confirmed.", G.mx, 6.35, G.cw, 0.3, { fontSize: 11, color: T.onDarkMuted });
  sl.addNotes("Roadmap only: nothing on this slide is shipped.");

  sl = K.add("MT_CLOSE");
  K.close(sl, { title: "Put a cite-first, ship-ready AI platform to work", body: "Start with a pilot team on your data, under your policies, with the models you choose.", subtitle: "Vyaas AI · Enterprise AI Assistant" });
  sl.addNotes("One ask: a pilot. Official MavionTech contact details; no Vyaas-specific domain has been verified.");

  await pres.writeFile({ fileName: OUT });
  console.log("written", OUT, pres.slides.length, "slides");
})();
