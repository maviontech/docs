# -*- coding: utf-8 -*-
"""Adds HeeLIKS and Vyaas AI to the master records. Originals are backed up first to 01_Audit_Reports/Previous_Versions."""
import openpyxl, csv, glob, os, shutil
from copy import copy
from PIL import Image
A = "D:/MavionTech_sales_MavionTech_Transformation/01_Audit_Reports/"
os.makedirs(A + "Previous_Versions", exist_ok=True)
for f in ["Master_Product_Inventory", "Product_Asset_Mapping"]:
    dst = A + f"Previous_Versions/{f}_v1_2026-11-10.xlsx"
    if not os.path.exists(dst): shutil.copy2(A + f + ".xlsx", dst)

def style_like(ws, src_row, dst_row, ncol):
    for c in range(1, ncol + 1):
        s, d = ws.cell(src_row, c), ws.cell(dst_row, c)
        if s.has_style:
            d.font, d.fill, d.border, d.alignment, d.number_format = copy(s.font), copy(s.fill), copy(s.border), copy(s.alignment), s.number_format
def append(ws, rows, ncol):
    for r in rows:
        last = ws.max_row; ws.append(r); style_like(ws, last, ws.max_row, ncol)

wb = openpyxl.load_workbook(A + "Master_Product_Inventory.xlsx")
ws = wb["Product Inventory"]
append(ws, [
 [7, "HeeLIKS", "Multi-tenant inventory, POS and B2B order-to-cash SaaS (retail-tech / distribution)", "Run your entire store on one platform: one append-only stock ledger from purchase order to paid invoice",
  "HeeLIKS_Enterprise_Sales_Deck.pptx", 54, "54/54", "many (screens)", "HeelIKS_screenshots/", 181, "heeliks.png in product repo (D:\\heeliks)", "No",
  "HeeLIKS; StockSage (legacy codename); Holistic Enterprise Engine for Logistics & Inventory Keeping System", "Product team, built from code (commit 3b66227)",
  "Code-verified: 16 apps, 70 models, 169 routes, 21 reports, 348 tests; plans and prices in code", "Outlet owners and distributor MDs: pharmacy, retail, grocery, books, industrial",
  "Final deck built 10 Nov 2026 (HeeLIKS_Final.pptx, 44 slides)"],
 [8, "Vyaas AI", "Enterprise AI assistant platform: cited chat, documents, coding agent, governance", "Answers you can cite. Code you can ship.",
  "Vyaas_Enterprise_Sales_Deck.pptx", 30, "30/30", "many (screens)", "Vyaas_screenshots/", 31, "deck_work/build/assets/vyaas-mark.png", "No", "Vyaas AI; Vyaas",
  "Product team, built from code (D:\\llm)", "Code-verified: 14 modules, 368 tests, 7 plan tiers. Positioned as a premium product envisioned for the future",
  "CTO, Head of Engineering, IT Director; engineers and knowledge workers", "Final deck built 10 Nov 2026 (Vyaas_Final.pptx, 34 slides)"]], 17)
hdr = 4; col = 18
ws.cell(hdr, col, "Catalogue status (10 Nov 2026)"); style_like(ws, hdr, hdr, col)
for attr in ("font", "fill", "alignment", "border"): setattr(ws.cell(hdr, col), attr, copy(getattr(ws.cell(hdr, col - 1), attr)))
STATUS = {"Agastya": "Flagship · ready", "PragyanNxt": "Flagship · ready", "Protonnxt": "Flagship · ready", "Vortex": "Flagship · ready",
          "MavionLearn": "Ready · tested · available", "SalesPulse CRM": "Ready · tested · available", "HeeLIKS": "Ready · tested · available",
          "Vyaas AI": "Premium · envisioned for the future"}
for r in range(hdr + 1, ws.max_row + 1):
    p = ws.cell(r, 2).value
    if p in STATUS:
        ws.cell(r, col, STATUS[p])
        for attr in ("font", "fill", "alignment", "border"): setattr(ws.cell(r, col), attr, copy(getattr(ws.cell(r, col - 1), attr)))
ws.column_dimensions["R"].width = 28

ws = wb["Deck Register"]
append(ws, [["HeeLIKS_Enterprise_Sales_Deck.pptx", "HeeLIKS", "Customers / prospects", 54, 54, "many", 7.42, "-", "2026-11-10", "2026-11-10", "-",
             "Rich, code-verified content in its own indigo theme; many unreadable multi-thumbnail slides. Rebuilt as HeeLIKS_Final (44 slides)."],
            ["Vyaas_Enterprise_Sales_Deck.pptx", "Vyaas AI", "Customers / prospects", 30, 30, "many", 15.32, "-", "2026-11-10", "2026-11-10", "-",
             "Clear three-pillar story; off-system dark theme, overlapping labels, '5 plan tiers' wrong (code has 7). Rebuilt as Vyaas_Final (34 slides)."]], 12)
ws = wb["Source File Register"]
rows = []
for d in ["HeeLIKS_Enterprise_Sales_Deck.pptx", "HeeLIKS_coverage.csv", "Vyaas_Enterprise_Sales_Deck.pptx"]:
    p = "D:/MavionTech_sales/" + d
    rows.append(["D:\\MavionTech_sales\\" + d, "file", round(os.path.getsize(p) / 1e6, 2), "Added 10 Nov 2026 (portfolio expansion)", "", "", ""])
for d in ["HeelIKS_screenshots", "HeeLIKS_deck_work", "HeeLIKS_exports", "Vyaas_screenshots", "deck_work"]:
    n = sum(len(f) for _, _, f in os.walk("D:/MavionTech_sales/" + d))
    rows.append(["D:\\MavionTech_sales\\" + d + "\\", "folder", n, "files; added 10 Nov 2026 (portfolio expansion)", "", "", ""])
append(ws, rows, 7)
wb.save(A + "Master_Product_Inventory.xlsx")

wb = openpyxl.load_workbook(A + "Product_Asset_Mapping.xlsx")
tpl = wb["PragyanNxt Screenshots"]
def new_sheet(title, heading, subtitle, data):
    ws = wb.copy_worksheet(tpl); ws.title = title
    for r in range(5, ws.max_row + 1):
        for c in range(1, 9): ws.cell(r, c).value = None
    ws.cell(1, 1, heading); ws.cell(2, 1, subtitle)
    for i, row in enumerate(data):
        if 5 + i > tpl.max_row: style_like(ws, 5, 5 + i, 8)
        for c, v in enumerate(row, 1): ws.cell(5 + i, c, v)
GROUP = {"A": "Sign-in & two-factor", "B": "B2B order-to-cash", "C": "Catalog & masters", "D": "Dashboard", "E": "Exported documents", "I": "Inventory",
         "M": "Platform console", "O": "Onboarding & import", "P": "Partners", "Q": "Reports", "R": "Returns & notes", "S": "POS, invoices, registers",
         "T": "Settings, audit, API", "U": "Procurement", "V": "Role-based views", "W": "Website & signup", "X": "Dark mode", "Z": "Industry demo workspaces"}
cov = {}
for r in csv.DictReader(open("D:/MavionTech_sales/HeeLIKS_coverage.csv", encoding="utf-8")):
    for f in (r["screenshot_file"] or "").split(";"):
        if f.strip(): cov.setdefault(f.strip(), r["name"])
log = {r["file"]: r for r in csv.DictReader(open("D:/MavionTech_sales/HeeLIKS_deck_work/capture_log.csv", encoding="utf-8"))}
built = open("D:/MavionTech_sales_MavionTech_Transformation/02_Working_Notes/design_build/build_heeliks.js", encoding="utf-8").read()
data = []
for p in sorted(glob.glob("D:/MavionTech_sales/HeelIKS_screenshots/*.png")):
    f = os.path.basename(p); w, h = Image.open(p).size; L = log.get(f, {})
    data.append([f, f"{w}x{h}", L.get("persona", ""), GROUP.get(f[0], ""), cov.get(f, (L.get("title", "") or "").replace("· HeeLIKS", "").strip()),
                 "Good", "Demo data (seeded workspace)", "Used in HeeLIKS_Final" if f'"{f[:-4]}"' in built else "-"])
new_sheet("HeeLIKS Screenshots", "HeeLIKS - Screenshot to Module Map", "181 screenshots (2400 px wide). Module from HeeLIKS_coverage.csv and capture prefix; persona from capture_log.csv.", data)
VM = {"admin": "Admin console", "analytics": "Analytics", "assistants": "Assistants", "billing": "Billing & plans", "chat": "Chat", "docs": "Documents",
      "kb": "Knowledge Base", "login": "Accounts", "notifications": "Notifications", "org": "Organizations", "pricing": "Billing & plans", "tools": "Tools",
      "usage": "Billing & plans", "w": "Coding agent"}
data = []
for p in sorted(glob.glob("D:/MavionTech_sales/Vyaas_screenshots/*.png")):
    f = os.path.basename(p); w, h = Image.open(p).size; key = f[:-4].split("_")[0]
    data.append([f, f"{w}x{h}", "Platform admin" if key == "admin" else "Org owner", VM.get(key, ""), f[:-4].replace("_", " "), "Good",
                 "Demo data (Northwind Robotics)", "See Vyaas_Change_Log"])
new_sheet("Vyaas Screenshots", "Vyaas AI - Screenshot to Module Map", "31 screenshots (2400x1500, dark UI). Not captured: agent session/PR page, new workspace, attachment analysis, optimised-prompt receipt, global search.", data)
ws = wb["Asset Gaps by Product"]
append(ws, [["HeeLIKS", "Strong: 181 full-resolution captures covering all 22 module rows. Needed: vector logo; re-check heeliks.com copy when the site is back.", "Low"],
            ["Vyaas AI", "Good: 31 captures. Missing: agent-session/PR page and optimised-prompt receipt (PR evidenced in the task rail); vector logo.", "Medium"]], 3)
wb.save(A + "Product_Asset_Mapping.xlsx")
print("master records updated")
