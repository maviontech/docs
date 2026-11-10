import sys, os, json
from pptx import Presentation
from pptx.util import Emu
from pptx.enum.shapes import MSO_SHAPE_TYPE
src="D:/MavionTech_sales"; out="D:/MavionTech_sales_MavionTech_Transformation/03_Extracted_Text"
decks=[f for f in os.listdir(src) if f.endswith('.pptx')]
summary={}
def walk(shapes):
    for s in shapes:
        if s.shape_type==MSO_SHAPE_TYPE.GROUP:
            yield from walk(s.shapes)
        else: yield s
for d in sorted(decks):
    p=Presentation(os.path.join(src,d))
    lines=[f"DECK: {d}", f"Slide size: {Emu(p.slide_width).inches:.2f} x {Emu(p.slide_height).inches:.2f} in", f"Slides: {len(p.slides)}"]
    cp=p.core_properties
    lines.append(f"Core props: title={cp.title!r} author={cp.author!r} created={cp.created} modified={cp.modified} last_mod_by={cp.last_modified_by!r}")
    info=[];fonts=set();pics_total=0
    for i,sl in enumerate(p.slides,1):
        texts=[];pics=[]
        for s in walk(sl.shapes):
            if s.shape_type==MSO_SHAPE_TYPE.PICTURE:
                try: pics.append(f"{s.image.filename or 'img'}({s.image.size[0]}x{s.image.size[1]}px)")
                except Exception: pics.append('pic')
            if s.has_text_frame:
                t=' | '.join(par.text.strip() for par in s.text_frame.paragraphs if par.text.strip())
                for par in s.text_frame.paragraphs:
                    for r in par.runs:
                        if r.font.name: fonts.add(r.font.name)
                if t: texts.append(t)
            if getattr(s,'has_table',False) and s.has_table:
                for row in s.table.rows:
                    texts.append('TABLE: '+' || '.join(c.text.strip() for c in row.cells))
            if getattr(s,'has_chart',False) and s.has_chart: texts.append('[CHART]')
        notes=''
        if sl.has_notes_slide: notes=sl.notes_slide.notes_text_frame.text.strip()
        pics_total+=len(pics)
        lines.append(f"\n--- SLIDE {i} (layout: {sl.slide_layout.name}) pics={len(pics)}")
        lines+= ['  '+t for t in texts]
        if notes: lines.append('  NOTES: '+notes.replace('\n',' / '))
        info.append(dict(n=i,pics=len(pics),notes=bool(notes),chars=sum(len(t) for t in texts)))
    lines.insert(3,f"Fonts used: {sorted(fonts)}  | total pictures: {pics_total} | slides with notes: {sum(x['notes'] for x in info)}")
    open(os.path.join(out,d.replace('.pptx','.txt')),'w',encoding='utf-8').write('\n'.join(lines))
    summary[d]=dict(slides=len(p.slides),pics=pics_total,notes=sum(x['notes'] for x in info),fonts=sorted(fonts),size=os.path.getsize(os.path.join(src,d)))
json.dump(summary,open(os.path.join(out,'_deck_summary.json'),'w'),indent=1)
print(json.dumps(summary,indent=1))
