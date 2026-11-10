# -*- coding: utf-8 -*-
import os, sys, importlib
sys.path.insert(0, os.path.dirname(__file__))
from docx import Document
from docx.shared import Pt, RGBColor, Cm
from docx.enum.section import WD_ORIENT
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

OUT = "D:/MavionTech_sales_MavionTech_Transformation/05_Content_Strategy"
os.makedirs(OUT, exist_ok=True)
NAVY = RGBColor(0x0A, 0x1F, 0x44); GREY = RGBColor(0x66, 0x70, 0x85); AMBER = RGBColor(0xC9, 0x84, 0x0A)
LOGO = "D:/MavionTech_sales/branding/maviontech-logo.png"
COMPANY = ("MavionTech Pvt. Ltd. · 505 Zen Business Center, Bhumkar Chowk, Wakad, Pune, Maharashtra 411057 · "
           "communications@maviontech.com · +91 91580 08002 · www.maviontech.com")

def new_doc(title):
    d = Document()
    s = d.sections[0]; s.left_margin = s.right_margin = Cm(2); s.top_margin = s.bottom_margin = Cm(1.8)
    st = d.styles["Normal"]; st.font.name = "Calibri"; st.font.size = Pt(10)
    st.element.rPr.rFonts.set(qn("w:eastAsia"), "Calibri")
    for n, sz in (("Heading 1", 16), ("Heading 2", 12.5), ("Heading 3", 11)):
        h = d.styles[n]; h.font.name = "Calibri"; h.font.size = Pt(sz); h.font.color.rgb = NAVY; h.font.bold = True
    d.core_properties.title = title; d.core_properties.author = "MavionTech Transformation Team"
    return d

def shade(cell, hexc):
    tcPr = cell._tc.get_or_add_tcPr(); sh = OxmlElement("w:shd")
    sh.set(qn("w:val"), "clear"); sh.set(qn("w:color"), "auto"); sh.set(qn("w:fill"), hexc); tcPr.append(sh)

def table(d, headers, rows, widths, hdr="0A1F44", size=8.5, first_bold=False):
    t = d.add_table(rows=1, cols=len(headers)); t.style = "Table Grid"; t.alignment = WD_TABLE_ALIGNMENT.CENTER; t.autofit = False
    for i, h in enumerate(headers):
        c = t.rows[0].cells[i]; c.text = ""; r = c.paragraphs[0].add_run(h); r.bold = True; r.font.size = Pt(size + 0.5)
        r.font.color.rgb = RGBColor(255, 255, 255); shade(c, hdr)
    # repeat header row
    trPr = t.rows[0]._tr.get_or_add_trPr(); th = OxmlElement("w:tblHeader"); th.set(qn("w:val"), "true"); trPr.append(th)
    for row in rows:
        cells = t.add_row().cells
        for i, v in enumerate(row):
            cells[i].text = ""; run = cells[i].paragraphs[0].add_run(str(v)); run.font.size = Pt(size)
            if first_bold and i == 0: run.bold = True; run.font.color.rgb = NAVY
    for i, w in enumerate(widths):
        t.columns[i].width = Cm(w)
        for row in t.rows: row.cells[i].width = Cm(w)
    d.add_paragraph()
    return t

def para(d, text, bold=False, italic=False, color=None, size=None, style=None):
    p = d.add_paragraph(style=style) if style else d.add_paragraph()
    r = p.add_run(text); r.bold = bold; r.italic = italic
    if color: r.font.color.rgb = color
    if size: r.font.size = Pt(size)
    return p

def bullets(d, items):
    for it in items: d.add_paragraph(it, style="List Bullet")

def cover(d, title, sub, accent_hex):
    d.add_picture(LOGO, width=Cm(2.2))
    para(d, "MavionTech Pvt. Ltd. · Product Presentation Transformation", bold=True, color=NAVY, size=10)
    para(d, title, bold=True, color=RGBColor.from_string(accent_hex), size=24)
    para(d, sub, color=GREY, size=11.5)
    para(d, "Prompt 2 — Product Positioning & Content Strategy · 10 November 2026 · DRAFT for approval", italic=True, color=GREY, size=9)
    para(d, "Accuracy rule: nothing here invents functionality, customers, statistics, testimonials, certifications or commercial "
            "achievements. Items marked UNCERTAIN, CONFIRM or [conditional] must be verified before they appear on a slide.", italic=True, size=8.5)

def footer(d, text):
    for s in d.sections:
        fp = s.footer.paragraphs[0]; fp.text = text
        if fp.runs: fp.runs[0].font.size = Pt(7.5); fp.runs[0].font.color.rgb = GREY

def landscape(d):
    s = d.add_section(); s.orientation = WD_ORIENT.LANDSCAPE
    s.page_width, s.page_height = s.page_height, s.page_width
    s.left_margin = s.right_margin = Cm(1.5)
    return s

def portrait(d):
    s = d.add_section(); s.orientation = WD_ORIENT.PORTRAIT
    if s.page_width > s.page_height: s.page_width, s.page_height = s.page_height, s.page_width
    s.left_margin = s.right_margin = Cm(2)

def product_doc(modname):
    m = importlib.import_module(modname)
    d = new_doc(f"{m.NAME} Content Architecture")
    cover(d, f"{m.NAME} — Content Architecture", m.TAGLINE, m.ACCENT)

    d.add_heading("Contents", level=1)
    secs = ["1. Sources consulted", "2. Product positioning", "3. Module-level analysis"]
    if modname == "p2_agastya": secs += ["4. Agastya screenshot audit (special requirement)"]
    secs += [f"{len(secs)+1}. Screenshot & asset requirements", f"{len(secs)+2}. Content restructuring decisions",
             f"{len(secs)+3}. Slide-by-slide architecture ({len(m.SLIDES)} slides)", f"{len(secs)+4}. Open items to confirm"]
    bullets(d, secs)

    n = 1
    d.add_heading(f"{n}. Sources consulted", level=1); bullets(d, m.SOURCES); n += 1
    d.add_heading(f"{n}. Product positioning", level=1)
    table(d, ["Question", "Answer"], m.POSITIONING, [4.2, 12.8], first_bold=True, size=9); n += 1

    d.add_heading(f"{n}. Module-level analysis", level=1)
    para(d, f"{len(m.MODULES)} modules identified. Each module is described from evidence in the source deck, screenshots and official pages. "
            "'Visual evidence' lists the screenshots or slides that prove the module.", italic=True, size=9)
    labels = ["Submodules / components", "Module purpose", "Functional capabilities", "User interactions", "Important workflows",
              "Dependencies on other modules", "Business problems addressed", "Operational benefits", "Visual evidence (screenshots / diagrams)"]
    for mod in m.MODULES:
        d.add_heading(mod[0], level=2)
        rows = [(labels[i], mod[i + 1] if mod[i + 1] not in ("-", "") else "— (not specified in source; confirm)") for i in range(9)]
        table(d, ["Aspect", "Detail"], rows, [4.2, 12.8], hdr="1F3A68", first_bold=True, size=8.5)
    n += 1

    if modname == "p2_agastya":
        from data import AG_SHOTS
        d.add_heading(f"{n}. Agastya screenshot audit (special requirement)", level=1)
        para(d, "All 79 images in Agastya_screenshots were inspected. Navigation sidebars were enlarged to read sub-menus. "
                "Interpretations rely only on visible labels, data and buttons. Anything that cannot be confirmed from the interface is marked UNCERTAIN.", size=9)
        d.add_heading(f"{n}.1 Screenshot-to-module map (all 79)", level=2)
        rows = [(f, per, mod, scr, q, notes or "-", sl) for f, per, mod, scr, q, notes, sl in AG_SHOTS]
        table(d, ["File", "Persona", "Module", "Screen", "Quality", "Notes", "Current deck slide"], rows, [2.8, 2, 2.4, 3.4, 1.5, 3.6, 1.3], size=7.5)
        d.add_heading(f"{n}.2 Interface vs deck: capabilities visible but under-explained", level=2)
        table(d, ["Capability seen in the interface", "Where visible", "Likely meaning", "Deck coverage / confidence"], m.UNDEREXPLAINED, [4.2, 3, 4.2, 5.6], size=8)
        d.add_heading(f"{n}.3 Navigation structure observed (school admin)", level=2)
        bullets(d, [
            "Top-level menu: Dashboard · Administration · Platform Setup · Students · Academics · Library · Timetable · Homework & Classwork · Examination · Attendance · Finance & Billing · Staff Operations · Transport · Communications · Subscription Management.",
            "Platform Setup: School Profile, Branding, Feature Toggles, Infrastructure, Sequence Rules, Custom Fields.",
            "Students: Admit Student, Student Directory, Admission Inquiries, Enrollments.",
            "Timetable: Dashboard, Teacher Assignments, Working Days, Bell Schedule, Rooms & Venues, Schedule Overview, Timetable Entries, Class Timetable View, Conflict Summary, Substitutions, Teacher Workload.",
            "Examination: Exam Events, Subject Papers, Grading Scales, Admit Card, Signature Upload.",
            "Attendance: Dashboard, Daily Registers, Quick Attendance, Leave Requests.",
            "Staff Operations: Staff Directory, Departments, Designations, Staff Onboarding, Staff Documents, Leave Types, Leave Requests (attendance approval screen also present).",
            "Transport: Dashboard, Transport Fleet, Bus Routes, Route Stops, Transport Assignments.",
            "Library: Dashboard, Books, Issued Books, Overdue, Borrowers, Reports.",
            "Communications: Broadcasts, Trigger Engine, My Inbox.",
            "Administration: Staff (users), Roles, Login Events.",
            "Platform admin console: Tenants, Subscriptions, Demo Requests, Users, Login Events, Email Config, SMS Config, WhatsApp Config, Admin Panel.",
            "Student portal: Dashboard, Student Access (My Teacher, Notification), School, Student Info, Information, Calendar & Event, Time Management, School Online, Library, Communication, Examinations, Fee, Additional Services, Download.",
            "UNCERTAIN: where Hostel, Health, Discipline and Inventory sit in the menu. Their screens exist, but their menu entries are not visible in the captured sidebars.",
        ])
        n += 1

    d.add_heading(f"{n}. Screenshot & asset requirements", level=1); bullets(d, m.SCREEN_FLAGS); n += 1
    d.add_heading(f"{n}. Content restructuring decisions", level=1)
    para(d, "Decision key: Keep · Rewrite · Merge · Delete · Add · Hold/conditional.", italic=True, size=9)
    table(d, ["Existing slide(s)", "Decision", "Rationale / action"], m.RESTRUCTURE, [4, 3, 10], size=8.5); n += 1

    landscape(d)
    d.add_heading(f"{n}. Slide-by-slide architecture — {len(m.SLIDES)} slides", level=1)
    para(d, "Every slide carries the MavionTech master system: kicker, outcome-led title, product footer, and speaker notes. Screenshots marked * or (new) "
            "must be recaptured or captured before design. [conditional] slides are included only once confirmed.", italic=True, size=8.5)
    rows = [(i, s[0], s[1], s[2], s[3], s[4], s[5], s[6], s[7]) for i, s in enumerate(m.SLIDES, 1)]
    table(d, ["#", "Slide title", "Communication objective", "Main message", "Detailed content", "Visual elements", "Screenshots", "Diagrams", "Modules"],
          rows, [0.8, 4.2, 2.6, 3.6, 4.4, 2.4, 3.0, 2.2, 2.3], size=7.5)
    n += 1
    portrait(d)
    d.add_heading(f"{n}. Open items to confirm", level=1); bullets(d, m.OPEN)
    para(d, "Official company details for every close slide: " + COMPANY, size=8.5, color=GREY)
    footer(d, f"MavionTech · {m.NAME} Content Architecture · Draft for approval · 10 Nov 2026")
    path = os.path.join(OUT, m.FILE); d.save(path)
    return m.NAME, len(m.MODULES), len(m.SLIDES), path

if __name__ == "__main__":
    res = [product_doc(x) for x in ["p2_agastya", "p2_mavionlearn", "p2_pragyannxt", "p2_protonnxt", "p2_salespulse", "p2_vortex"]]
    for r in res: print(r)
