# -*- coding: utf-8 -*-
"""Apply portfolio-audit consistency fixes to the shared library and the six deck builders."""
import io, re, os
B = os.path.dirname(os.path.abspath(__file__))
def patch(fn, pairs, regex=()):
    p = os.path.join(B, fn); s = io.open(p, encoding="utf-8").read()
    for a, b in pairs:
        if a not in s: raise SystemExit(f"{fn}: not found -> {a[:70]}")
        s = s.replace(a, b, 1)
    for pat, rep in regex: s = re.sub(pat, rep, s)
    io.open(p, "w", encoding="utf-8").write(s); print("patched", fn)

DEMO = (r"\(demo (tenant|tenants|users|clients|organisation)\)", "(demo data)")

# shared library: 9 pt minimum for frame labels; crisper upscaling of low-resolution sources
patch("mt.js", [
 ('h: 0.19, margin: 0, fontSize: 8, color: T.slate500, isTextBox: true });', 'h: 0.19, margin: 0, fontSize: 9, color: T.slate500, isTextBox: true });'),
 ('.extract({ left: leftCropPx, top: topCropPx, width: w, height: h }).resize({ width: Math.min(w, 1800) }).flatten',
  '.extract({ left: leftCropPx, top: topCropPx, width: w, height: h }).resize({ width: w < 1200 ? w * 2 : Math.min(w, 1800), kernel: "lanczos3" }).sharpen(w < 1200 ? { sigma: 0.7 } : undefined).flatten'),
])
# Agastya: product mark on cover (consistency with other five covers); British spelling in prose
patch("build_agastya.js", [
 ('  kicker(sl, "Enterprise sales overview", T.amber, G.mx, 1.95);\n',
  '  kicker(sl, "Enterprise sales overview", T.amber, G.mx, 1.95);\n  sl.addImage({ path: M.ASSETS + "/agastya_mark.png", x: G.mx, y: 1.28, w: 0.52, h: 0.52 });\n'),
 ('head(sl, "Command center", "A live command center for every school");', 'head(sl, "Command centre", "A live command centre for every school");'),
])
patch("build_mavionlearn.js", [
 ('K.head(sl, "Platform", "Twelve modules across five capabilities, in one platform");', 'K.head(sl, "Product map", "Twelve modules across five capabilities, in one platform");'),
 ("effective cost per completion of Rs 1,800 (demo data)", "effective cost per completion of ₹1,800 (demo data)"),
 ('second: "Start a trial"', 'second: "Start a free trial"'),
], [DEMO])
patch("build_pragyannxt.js", [
 ('K.head(sl, "Everything in one platform", "Eight modules, one integrated system");', 'K.head(sl, "Product map", "Eight modules, one integrated system");'),
 ('K.head(sl, "Enterprise-grade", "Built like enterprise software");', 'K.head(sl, "Architecture", "Built like enterprise software");'),
 ('second: "Start a trial"', 'second: "Start a free trial"'),
], [DEMO])
patch("build_protonnxt.js", [
 ('K.head(sl, "Architecture & security", "Multi-tenant by design, secure by default");', 'K.head(sl, "Architecture", "Multi-tenant by design, secure by default");'),
], [DEMO])
patch("build_salespulse.js", [
 ('K.head(sl, "Security & architecture", "Multi-tenant by design, isolated by default");', 'K.head(sl, "Architecture", "Multi-tenant by design, isolated by default");'),
 ('"Platform control center: MRR, ARR, active and trial tenants, and per-tenant provisioning."', '"Platform control center: MRR, ARR and tenants."'),
 ('second: "Start free trial"', 'second: "Start a free trial"'),
], [DEMO])
# Vortex: shorter card copy (measured overflow) and a real architecture diagram (only deck without one)
vx = io.open(os.path.join(B, "build_vortex.js"), encoding="utf-8").read()
start = vx.index("  // 18 TECHNOLOGY + SIGN-IN"); end = vx.index("  // 19 WHERE VORTEX WINS")
new18 = '''  // 18 ARCHITECTURE & TECHNOLOGY
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
  [["Integration APIs", "REST APIs for HR, payroll, ERP"], ["Identity & directory", "Role-based access, company-code sign-in"], ["Audit & events", "Logged across sensitive workflows"], ["Observability", "Operations monitoring"]].forEach(([h, s], i) =>
    sbox(sl, 9.85, 2.05 + i * 0.92, 2.88, 0.78, h, s));
  colLabel(sl, "Technology", G.mx, 6, 5.95);
  ["Django + Python", "MySQL, one database per customer", "Face-AI (InsightFace)", "Tailwind UI", "REST APIs"].forEach((t, i) => { const w = [1.7, 2.9, 2.05, 1.35, 1.25][i], x = G.mx + [0, 1.85, 4.9, 7.1, 8.6][i];
    sl.addShape("roundRect", { x, y: 6.25, w, h: 0.42, rectRadius: 0.21, fill: { color: tint(A, 0.9) }, line: { type: "none" } });
    txt(sl, t, x, 6.25, w, 0.42, { fontSize: 11.5, bold: true, color: T.ink, align: "center", valign: "middle" }); });
  sl.addNotes("Architecture layers per the Vortex product deck, without the unverified 'encrypted at rest' and 'replicated across regions' statements. Technology stack as listed in the deck.");

'''
vx = vx[:start] + new18 + vx[end:]
io.open(os.path.join(B, "build_vortex.js"), "w", encoding="utf-8").write(vx)
patch("build_vortex.js", [
 ('["hash", "Statutory compliance", "PF, ESI, PT and TDS deductions and tax computation."]', '["hash", "Statutory compliance", "PF, ESI, PT and TDS deductions."]'),
 ('["receipt", "Tax declarations", "Declarations and proofs captured from employees."]', '["receipt", "Tax declarations", "Declarations and proofs from staff."]'),
])
