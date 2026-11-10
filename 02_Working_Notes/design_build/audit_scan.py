# -*- coding: utf-8 -*-
"""Portfolio audit: text/consistency scan across the six final decks (python-pptx)."""
import re, json, collections, os
from pptx import Presentation
from pptx.util import Emu
R = "D:/MavionTech_sales_MavionTech_Transformation/Final_Product_Decks/"
DECKS = {"Agastya": R + "Agastya/Agastya_Final.pptx", "MavionLearn": R + "MavionLearn/MavionLearn_Final.pptx", "PragyanNxt": R + "PragyanNxt/PragyanNxt_Final.pptx",
         "ProtonNxt": R + "Protonnxt/Protonnxt_Final.pptx", "SalesPulse CRM": R + "SalesPulse_CRM/SalesPulse_CRM_Final.pptx", "Vortex HRMS": R + "Vortex/Vortex_Final.pptx"}
US = r"\b(center|centers|color|colors|organization|organizations|organize|organized|analyze|analyzed|prioritized|personalized|optimize|optimized|license|program|programs|catalog|behavior|behavioral|favorite|enroll|enrollment|enrollments|customize|customized|recognize|minimize|maximize|standardize|centralized|digitize|authorize|authorized|summarize|summarizing|visualize|visualization)\b"
CLAIMS = r"(99\.9|99\.99|uptime|SLA\b|ISO ?27001|SOC ?2|GDPR|24 ?[x×] ?7|ROI of|\d+% (faster|reduction|less|more)|proven at|trusted by|customers? (globally|worldwide)|award|certified|guarantee)"
BANNED = r"(Evalynx|mvtech\.in|Mavion Technologies|XXXXX|lorem|TODO|\[insert|sales@maviontech|hello@maviontech|Protonnxt|PROTONNXT|Maviontech\b)"
def runs(shape):
    if shape.has_text_frame:
        for p in shape.text_frame.paragraphs:
            for r in p.runs: yield r
def walk(shapes):
    for s in shapes:
        if s.shape_type == 6: yield from walk(s.shapes)
        else: yield s
out = {}
for name, f in DECKS.items():
    p = Presentation(f); d = collections.defaultdict(list); fonts = collections.Counter(); sizes = collections.Counter(); colors = collections.Counter()
    d["slides"] = len(p.slides); d["size_mb"] = round(os.path.getsize(f) / 1e6, 1)
    for i, sl in enumerate(p.slides, 1):
        texts = []
        for s in walk(sl.shapes):
            if s.has_text_frame:
                t = s.text_frame.text; texts.append(t)
                for r in runs(s):
                    if r.font.name: fonts[r.font.name] += 1
                    if r.font.size: sizes[r.font.size.pt] += 1
                    try:
                        if r.font.color and r.font.color.type is not None and r.font.color.rgb: colors[str(r.font.color.rgb)] += 1
                    except Exception: pass
        notes = sl.notes_slide.notes_text_frame.text if sl.has_notes_slide else ""
        alltxt = "\n".join(texts)
        for m in re.finditer(US, alltxt, re.I): d["us_spelling"].append((i, m.group(0)))
        for m in re.finditer(CLAIMS, alltxt, re.I): d["claims"].append((i, alltxt[max(0, m.start() - 40):m.end() + 40].replace("\n", " ")))
        for m in re.finditer(BANNED, alltxt): d["banned"].append((i, m.group(0)))
        for m in re.finditer(r"\bRs\.? ?\d", alltxt): d["rs_currency"].append((i, alltxt[m.start():m.start() + 14]))
        for m in re.finditer(r"\((demo[^)]*)\)", alltxt): d["demo_labels"].append((i, m.group(1)))
        for m in re.finditer(r"database per (\w+)|dedicated database per (\w+)|own database|one database per (\w+)", alltxt, re.I): d["isolation_phrase"].append((i, m.group(0)))
        for m in re.finditer(r"(\d+)[- ]day (free |all-features )?trial", alltxt, re.I): d["trial"].append((i, m.group(0)))
        for ph in sl.placeholders:
            if ph.placeholder_format.type == 1:
                d["titles"].append((i, ph.text_frame.text, len(ph.text_frame.text)))
        if "communications@maviontech.com" in alltxt: d["contact_slides"].append(i)
        if not notes.strip(): d["no_notes"].append(i)
    d["fonts"] = dict(fonts); d["sizes"] = dict(sorted(sizes.items())); d["text_colors"] = dict(colors.most_common(10))
    d["min_font"] = min(sizes) if sizes else None
    d["long_titles"] = [t for t in d["titles"] if t[2] > 62]
    out[name] = d
json.dump(out, open(os.path.join(os.path.dirname(__file__), "audit_scan.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1, default=list)
for n, d in out.items():
    print(f"\n=== {n}: {d['slides']} slides, {d['size_mb']} MB, fonts={d['fonts']}, min font={d['min_font']}")
    for k in ("banned", "claims", "rs_currency", "us_spelling", "long_titles", "no_notes", "trial", "contact_slides"):
        v = d.get(k, []); print(f"  {k}: {v[:14]}{' …(+%d)' % (len(v) - 14) if len(v) > 14 else ''}")
    print("  demo_labels:", sorted(set(x[1] for x in d["demo_labels"])))
    print("  isolation:", sorted(set(x[1].lower() for x in d["isolation_phrase"])))
