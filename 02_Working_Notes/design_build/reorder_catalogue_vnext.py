# -*- coding: utf-8 -*-
"""Applies MavionTech's product order (user rule, 10 Nov 2026) to build_catalogue_vnext.js:
Vortex HRMS -> ProtonNxt -> PragyanNxt -> Agastya -> MavionLearn -> SalesPulse CRM -> HeeLIKS -> Vyaas AI.
Run after make_catalogue_vnext.py. Content is unchanged; only sequence and positions move."""
import io, json, pathlib, re
B = pathlib.Path(__file__).parent
F = B / "build_catalogue_vnext.js"
s = io.open(F, encoding="utf-8").read()
OLD = ["agastya", "pragyannxt", "vortex", "protonnxt", "mavionlearn", "salespulse", "heeliks", "vyaas"]
NEW = ["vortex", "protonnxt", "pragyannxt", "agastya", "mavionlearn", "salespulse", "heeliks", "vyaas"]
IDX = {k: i for i, k in enumerate(NEW)}
NAMES = ["Vortex HRMS", "Vortex", "ProtonNxt", "PragyanNxt", "Agastya", "MavionLearn", "SalesPulse CRM", "SalesPulse", "HeeLIKS", "Vyaas AI"]
NIDX = {"Vortex HRMS": 0, "Vortex": 0, "ProtonNxt": 1, "PragyanNxt": 2, "Agastya": 3, "MavionLearn": 4, "SalesPulse CRM": 5, "SalesPulse": 5, "HeeLIKS": 6, "Vyaas AI": 7}

def R(a, b):
    global s
    assert s.count(a) == 1, a[:90]; s = s.replace(a, b)

def items(text):
    """Split a JS array-of-arrays body into top-level item strings (string-aware bracket matching)."""
    out, depth, start, q = [], 0, None, False
    i = 0
    while i < len(text):
        c = text[i]
        if q:
            if c == "\\": i += 2; continue
            if c == '"': q = False
        elif c == '"': q = True
        elif c == "[":
            if depth == 0: start = i
            depth += 1
        elif c == "]":
            depth -= 1
            if depth == 0: out.append(text[start:i + 1])
        i += 1
    return out

def reorder_array(decl, key_of, sep=",\n    "):
    """decl e.g. '  const CAT = [' ; reorders its items by key_of(item) using NEW order."""
    global s
    a = s.index(decl) + len(decl); depth, i, q = 1, a, False
    while depth:
        c = s[i]
        if q:
            if c == "\\": i += 2; continue
            if c == '"': q = False
        elif c == '"': q = True
        elif c == "[": depth += 1
        elif c == "]": depth -= 1
        i += 1
    body = s[a:i - 1]; its = items(body)
    its.sort(key=key_of)
    s = s[:a] + sep.join(its) + s[i - 1:]

first_key = lambda it: IDX[re.match(r'\["(\w+)"', it).group(1)]
R('const ORDER = ["agastya", "pragyannxt", "vortex", "protonnxt", "mavionlearn", "salespulse", "heeliks", "vyaas"];',
  'const ORDER = ["vortex", "protonnxt", "pragyannxt", "agastya", "mavionlearn", "salespulse", "heeliks", "vyaas"]; // MavionTech product order (user rule, 10 Nov 2026)')

# tables keyed by product
for decl in ["  const CAT = [", "  const SEG = [", "  const STK = [", "  const OPP = [", "  const COM = ["]:
    reorder_array(decl, first_key)

# technology-focus evidence dots: reorder each 8-value array from OLD to NEW order
def fix_has(m):
    v = json.loads(m.group(0)); assert len(v) == 8
    return json.dumps([v[OLD.index(k)] for k in NEW]).replace(",", ", ")
a = s.index("  const PRIN = ["); b = s.index("]]];", a) + 4
s = s[:a] + re.sub(r"\[(?:[01], ){7}[01]\]", fix_has, s[a:b]) + s[b:]

# capability matrix: reorder the 8 product cells of every row
a = s.index("  const TC = [") + len("  const TC = ["); b = s.index("]];", a) + 1
rows = [json.loads(r) for r in items(s[a:b])]
rows = [[r[0]] + [r[1 + OLD.index(k)] for k in NEW] for r in rows]
s = s[:a] + ",\n    ".join(json.dumps(r, ensure_ascii=False).replace('", "', '", "') for r in rows) + s[b:]

# problem pills: reorder product keys inside each row
a = s.index("  const PROB = ["); b = s.index("]]];", a) + 4
s = s[:a] + re.sub(r'\[((?:"\w+"(?:, )?)+)\]', lambda m: json.dumps(sorted(json.loads(m.group(0)), key=lambda k: IDX.get(k, 99))).replace(",", ", ") if all(x in IDX for x in json.loads(m.group(0))) else m.group(0), s[a:b]) + s[b:]

# integrations: product lists in the 'who' column
def fix_who(m):
    parts = m.group(1).split(" · ")
    if all(p in NIDX for p in parts): parts.sort(key=lambda p: NIDX[p])
    return '"' + " · ".join(parts) + '"]'
a = s.index("  const INT = ["); b = s.index("]];", a) + 3
s = s[:a] + re.sub(r'"([^"]*)"\]', fix_who, s[a:b]) + s[b:]

# ecosystem map: People & Talent domain first, Education second (inside: PragyanNxt before Agastya)
R('const DOM = [["Education", "grad", ["agastya", "pragyannxt"], G.mx, 1.72, 4.75], ["People & Talent", "users", ["vortex", "protonnxt", "mavionlearn"], G.mx + 4.95, 1.72, G.cw - 4.95],',
  'const DOM = [["People & Talent", "users", ["vortex", "protonnxt", "mavionlearn"], G.mx, 1.72, G.cw - 4.95], ["Education", "grad", ["pragyannxt", "agastya"], G.mx + G.cw - 4.75, 1.72, 4.75],')

# future product direction rows
a = s.index('  [["agastya", "Online fee payment'); b = s.index("]].forEach(([k, t], i) => {", a) + 2
its = items(s[a + 3:b - 1]); its.sort(key=first_key)
s = s[:a] + "  [" + ",\n   ".join(its) + "]" + s[b:]

# showcase sequence
M = ["  // ---- AGASTYA (5) ----", "  // ---- PRAGYANNXT (3) ----", "  // ---- VORTEX (4) ----", "  // ---- PROTONNXT (4) ----", "  // ---- MAVIONLEARN (4) ----",
     "  // ---- SALESPULSE (4) ----", "  // ---- HEELIKS (5) — added in vNext ----", "  // ---- VYAAS AI (4) — added in vNext ----", "  // ================= SECTION 4"]
pos = [s.index(m) for m in M]
blocks = {OLD[i]: s[pos[i]:pos[i + 1]] for i in range(8)}
s = s[:pos[0]] + "".join(blocks[k] for k in NEW) + s[pos[8]:]

# wording that lists products in the old order
for a, b in [("Mobile apps in four products: Agastya, Vortex, ProtonNxt, SalesPulse", "Mobile apps in four products: Vortex, ProtonNxt, Agastya, SalesPulse"),
             ("Agastya, PragyanNxt, Vortex HRMS and ProtonNxt are the flagship products ready today", "Vortex HRMS, ProtonNxt, PragyanNxt and Agastya are the flagship products ready today"),
             ("Columns follow the catalogue order: Agastya, PragyanNxt, Vortex HRMS, ProtonNxt, MavionLearn, SalesPulse CRM, HeeLIKS, Vyaas AI.", "Columns follow MavionTech's product order: Vortex HRMS, ProtonNxt, PragyanNxt, Agastya, MavionLearn, SalesPulse CRM, HeeLIKS, Vyaas AI."),
             ("Order follows the buyer domains: Education (Agastya, PragyanNxt), People & Talent (Vortex HRMS, ProtonNxt, MavionLearn),", "Order follows MavionTech's product order (flagships first): People & Talent (Vortex HRMS, ProtonNxt, MavionLearn), Education (PragyanNxt, Agastya),")]:
    if a in s: s = s.replace(a, b)
    else: print("note: not found:", a[:60])
io.open(F, "w", encoding="utf-8").write(s)
print("reordered build_catalogue_vnext.js")
