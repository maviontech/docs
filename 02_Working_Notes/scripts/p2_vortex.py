# -*- coding: utf-8 -*-
NAME = "Vortex HRMS"
FILE = "Vortex_Content_Architecture.docx"
ACCENT = "4F46E5"
TAGLINE = "Your workforce, in motion — the unified people platform"
SOURCES = [
 "vortex-sales-light.pptx (25 slides; no product screenshots)",
 "www.vortexhrms.com (sign-in and privacy-policy pages, inspected 10 Nov 2026). Logo: vortex-mark.svg, a triple-chevron 'V' with an indigo #4F46E5 → cyan #0891B2 gradient; 'A product by Maviontech Pvt. Ltd.'",
 "maviontech.com/products/hrms/ (official listing as 'HRMS · People & Payroll'; industries IT, Services, Manufacturing; customers SMBs and mid-size enterprises; integrations Payroll, Biometric, Email, Calendar)",
 "Company PDF p11–12 (HRMS). Confirmed by MavionTech: Vortex is the HRMS, branded 'Vortex HRMS'.",
]
POSITIONING = [
 ("What exactly is the product?", "Vortex HRMS is a multi-tenant HR, attendance and payroll platform. It holds one record per employee from pre-boarding to exit and alumni. It covers Face-AI attendance (shifts, rosters, geo-fencing, regularisation), a policy-driven payroll engine (PF/ESI/PT/TDS, payslips, bank files, versioned re-runs, period locks), leave and comp-off, approvals and workflows, and employee self-service. Premium modules add performance, expenses, helpdesk, assets, HR document generation (42 letters) and LMS. Mobile apps: VortexGo for employees and SnapLens for attendance (the SnapLens name appears in the privacy policy only)."),
 ("What business problem does it solve?", "HR, payroll, attendance and helpdesk sit in separate tools; attendance-to-payroll reconciliation is manual every cycle; statutory rules change faster than legacy systems; employees need five logins to update a phone number; reports don't match."),
 ("Who needs it?", "Organisations of 200–20,000 employees (deck). The official site says SMBs and mid-size enterprises. Buyers: CHRO/HR head, CFO/payroll, COO for field workforces. Users: HR, payroll, managers, employees, IT/helpdesk, admins (company-code login plus a separate tenant-admin portal)."),
 ("What industries can use it?", "IT, services and manufacturing (official). Field and multi-site workforces benefit from geo-fenced and face attendance. The statutory coverage evidenced is India (PF, ESI, PT, TDS)."),
 ("Primary value proposition", "Hire to retire, attendance to payroll, assets to approvals, on one secure record. Attendance flows directly into payroll and approvals flow into balances and ledgers."),
 ("Core capabilities", "Base bundle: People, Attendance, Leave, Self-Service, Policies. Premium: Payroll, Performance, Expense, Helpdesk, Assets, HR Docs, LMS. Attendance add-ons: VortexGo app, Remote Punch-In, Geo-Fence, On-Shift Location Sharing, Punch Step-up Verification, Remote Check-in. Plus a workflow engine, secure onboarding upload pages, APIs, and security settings (sessions, access policies, IP rules)."),
 ("What makes it different?", "(1) Face-AI attendance built in (InsightFace). (2) Policy-first payroll with versioned re-runs and period locks. (3) One workflow chassis for leave, regularisation, comp-off, expenses and approvals. (4) Database-per-tenant isolation. (5) Modular per-employee pricing: switch modules on or off any month. (6) Consent-based background location with employer-set intervals and retention."),
 ("Why should a customer evaluate it?", "It consolidates HR, attendance and payroll, and payroll consumes attendance and leave directly. Starts at Rs 45 per employee per month with a 30-day trial (deck)."),
 ("Business value", "Payroll closes on time from locked inputs; no buddy punching; fewer leave disputes; zero lost assets at exit; auditable decisions. The deck's savings ranges (−30–45% vendor cost, −70% audit findings) and illustrative deployments will NOT be used unless evidenced."),
]
MODULES = [
 ("1. People Management / Employee Lifecycle", "Pre-boarding tasks; onboarding checklists; secure onboarding document upload pages; profile & document vault; org structure, roles, reporting changes; transitions; probation; separations; exit clearance; alumni", "One record per employee.", "Unified profile with life-event timeline.", "HR, managers, employees.", "Offer → pre-board → onboard → transitions → exit → alumni.", "Feeds attendance, payroll, assets, docs.", "Paperwork chasing.", "Day-one productivity; audit-ready records.", "None — capture required"),
 ("2. Smart Attendance", "Face-recognition punch in/out; shifts, rosters, weekend/holiday logic; timesheets; geo-fenced check-ins; regularisation workflow; live presence dashboards; biometric terminal & access-control integration", "Frictionless, audit-grade attendance.", "Sub-second face matching (stated).", "Employees punch; managers approve regularisation.", "Punch → presence → regularise → lock for payroll.", "Payroll, leave, approvals.", "Buddy punching; paper rosters.", "No reconciliation surprises.", "None"),
 ("3. Attendance & Mobile Add-ons", "VortexGo employee app; Remote Punch-In; Geo-Fence; On-Shift Location Sharing (opt-in background GPS at 5/10/30/60-minute intervals, work-hours-only option, consent, retention 30/60/90 days, mock-location detection); Punch Step-up Verification; Remote Check-in; SnapLens attendance app", "Field and remote workforce attendance.", "Per privacy policy: Android foreground service with visible notification.", "Field employees; employer admins.", "Enable → consent → periodic capture → review.", "Attendance.", "Unverifiable field attendance.", "Verified field work with privacy safeguards.", "None"),
 ("4. Leave & Comp-Off", "Leave types; accrual & carry-forward; multi-step approvals; half/quarter-day; weekend/holiday work credits; comp-off generation; balance ledgers per year", "Honour every policy automatically.", "-", "Employees apply; managers approve.", "Apply → approve → ledger.", "Approvals, payroll.", "Disputes.", "Real balances.", "None"),
 ("5. Payroll Engine (premium)", "Salary structures; payruns; payslips; PF/ESI/PT/TDS; tax declarations & proofs; attendance/leave adjustments; re-runs with versioning; period locks; bank file; multi-entity payroll", "Run payroll on policy.", "Five-step close.", "Payroll team; finance sign-off.", "Lock inputs → compute → review → disburse file → lock period.", "Attendance, leave, people.", "Spreadsheet payroll.", "On-time, trusted payroll.", "None"),
 ("6. Approvals & Workflows", "Multi-step chains; sequential/parallel; role-based routing; substitution & out-of-office; escalation timers; no-code editor; audit per request", "Decisions at the speed of policy.", "-", "Approvers (mobile-first).", "Request → route → approve/escalate → audit.", "Leave, regularisation, comp-off, expenses.", "Inbox approvals.", "Defensible decisions.", "None"),
 ("7. Employee Self-Service & Company Policies", "Dashboards; profile; approvals inbox; payslips; policy publishing", "Fewer HR tickets.", "-", "Employees.", "-", "All.", "Five logins.", "One place.", "None"),
 ("8. Performance (premium)", "Goal plans; appraisal cycles; self-appraisals; reviewer actions; appeals", "Structured performance management.", "-", "Employees, managers, HR.", "Goals → self-appraisal → review → appeal.", "People.", "-", "-", "None"),
 ("9. Expense Management (premium)", "Claims; multi-level approvals; reimbursements", "-", "-", "-", "Claim → approve → reimburse.", "Approvals, payroll.", "-", "-", "None"),
 ("10. Helpdesk (premium)", "IT & HR tickets; queues per team; SLA timers & escalations; knowledge base; mail/chat integrations", "Route every request.", "-", "-", "Raise → route → resolve.", "-", "-", "-", "None"),
 ("11. Asset Management (premium)", "Register with categories & warranties; allocation history; maintenance; return requests", "Every laptop tracked.", "-", "-", "Allocate → maintain → return at exit.", "People (exit clearance).", "Lost assets.", "-", "None"),
 ("12. HR Document Generation (premium)", "42 branded letters & certificates as PDFs", "-", "-", "-", "-", "People.", "-", "-", "None. Overlaps Signet; positioning needed"),
 ("13. Learning — LMS (premium)", "Courses, compliance training, certifications", "-", "-", "-", "-", "People.", "-", "-", "None. Overlaps MavionLearn; positioning needed"),
 ("14. Platform, Security & Administration", "Company-code login; tenant admin portal; RBAC navigation; session/access policies & IP rules; audit logging across onboarding, payroll, document review, approvals; APIs; database per tenant; live dashboards", "Govern a sensitive HR dataset.", "-", "Admins.", "-", "All.", "-", "-", "Login page only (vortexhrms.com)"),
]
SCREEN_FLAGS = [
 "The deck contains ZERO product screenshots. A full capture programme across all 14 modules, plus VortexGo and SnapLens mobile screens, is the prerequisite for redesign.",
 "Website and deck claims (99.99% uptime SLA, 24x7 live support, end-to-end encryption, GDPR-ready, multi-region ready, ISO 27001 aligned, SOC 2 in progress) conflict with maviontech.com (99.9%). They need evidence before deck use.",
 "Illustrative deployments with numbers will be removed.",
 "The phone placeholder will be replaced with +91 91580 08002 (official).",
]
RESTRUCTURE = [
 ("1 Cover", "Rewrite", "Rename to 'Vortex HRMS'; use the official V mark; add vortexhrms.com."),
 ("2 Agenda", "Delete", "Low value in a sales deck."),
 ("3 About MavionTech", "Rewrite", "Use official facts: Pune HQ; milestones 2023 (Sukrit EnVision Academy) → 2024 product focus → 2025 launch. Remove '15+ engineers' and 'serving customers globally' unless confirmed."),
 ("4 Introducing + 6 Solution", "Merge", "One 'unified people platform' slide."),
 ("5 Status quo", "Keep", ""),
 ("7 Twelve modules", "Rewrite", "Map of 14 modules (base, premium, add-ons, platform)."),
 ("8–13 Modules", "Keep + rebuild", "Add real screenshots; fix two-line titles."),
 ("NEW", "Add", "Performance, Expense, Helpdesk, Assets, HR Docs and LMS module slides (premium modules had none)."),
 ("NEW", "Add", "Mobile & field workforce slide (VortexGo, SnapLens, geo-fence, location sharing with privacy safeguards)."),
 ("NEW", "Add", "Attendance-to-payroll flow diagram (the core integration story)."),
 ("NEW", "Add", "Personas slide."),
 ("14 Differentiators", "Keep", "Link to proof."),
 ("15 Architecture", "Keep / rewrite", "Remove unverified multi-region and encryption claims until evidenced."),
 ("16 Illustrative deployments", "Delete", "Hard numbers in fictional cases."),
 ("17 Value", "Delete or rewrite", "Use qualitative value only."),
 ("18 Where Vortex wins", "Keep", ""),
 ("19 Trust", "Rewrite", "Keep only verified controls (RBAC, audit, isolation, session/IP policies, privacy policy)."),
 ("20–22 Pricing", "Keep (2 slides)", "Base + menu; merge 'build your plan'."),
 ("23 Roadmap", "Keep", "Note: 'Recruitment & ATS' overlaps ProtonNxt; portfolio decision needed."),
 ("24–25 Next steps / close", "Merge", "Official contacts."),
]
SLIDES = [
 ("Cover — Vortex HRMS: your workforce, in motion", "Category", "The unified people platform.", "V mark, MavionTech endorsement, vortexhrms.com.", "Hero", "Employee dashboard (new)", "-", "-"),
 ("Why workforce platforms break at scale", "Problem", "Disconnected, manual, non-compliant.", "6 pains.", "Cards", "-", "-", "-"),
 ("One platform, one record, one source of truth", "Solution", "Attendance → payroll; approvals → balances.", "Hub graphic.", "Hub diagram", "-", "Hub diagram", "All"),
 ("Built for every people role", "Personas", "HR, payroll, managers, employees, field staff, admins.", "Role cards.", "Cards", "-", "-", "-"),
 ("Fourteen modules, switch on what you need", "Map", "Base · Premium · Add-ons · Platform.", "Module map with tiers.", "Module map", "-", "-", "All"),
 ("Hire to retire, in one record", "People", "Lifecycle and vault.", "-", "Hero + features", "Employee profile, onboarding (new)", "Lifecycle strip", "People"),
 ("Friction-free attendance, audit-grade accuracy", "Attendance", "Face-AI, shifts, regularisation.", "-", "Hero + 2", "Presence dashboard, roster (new)", "-", "Attendance"),
 ("Attendance for the field and the floor", "Mobile", "VortexGo, SnapLens, geo-fence, consent-based location.", "Privacy safeguards.", "Device frames", "Mobile (new)", "-", "Add-ons"),
 ("Honour every leave policy automatically", "Leave", "Accrual, comp-off ledger.", "-", "Hero + features", "Leave balance (new)", "-", "Leave"),
 ("From attendance to payslip without spreadsheets", "Integration story", "Locked inputs feed the engine.", "Flow diagram.", "Diagram", "-", "Attendance→payroll flow", "Attendance, Leave, Payroll"),
 ("Run payroll on policy", "Payroll", "Statutory, versioned, locked.", "5-step close.", "Hero + steps", "Payrun, payslip (new)", "-", "Payroll"),
 ("Decisions at the speed of policy", "Workflows", "No-code chains, escalation, audit.", "-", "Hero + diagram", "Workflow editor (new)", "Routing diagram", "Approvals"),
 ("Self-service that ends HR tickets", "ESS", "Profile, payslips, approvals, policies.", "-", "Two shots", "ESS (new)", "-", "ESS"),
 ("Performance cycles that run themselves", "Performance", "Goals, appraisals, appeals.", "-", "Hero + features", "Appraisal (new)", "-", "Performance"),
 ("Expenses, assets and helpdesk on one chassis", "Ops modules", "Claims, register, SLAs.", "Three-up.", "Three shots", "Expense, asset, ticket (new)", "-", "Expense, Assets, Helpdesk"),
 ("Letters and learning, built in", "HR Docs & LMS", "42 letters; courses (position vs Signet/MavionLearn).", "-", "Two shots", "Docs, LMS (new)", "-", "HR Docs, LMS"),
 ("Secure by design", "Security", "DB per tenant, RBAC, audit, session/IP policy, privacy-by-design location.", "Verified controls only.", "Control cards", "Security settings (new)", "Architecture diagram", "Platform"),
 ("Built on a modern stack", "IT", "Django, MySQL per tenant, InsightFace, REST APIs.", "-", "Tech cards", "-", "-", "Platform"),
 ("Where Vortex wins", "Comparison", "vs legacy suites, point tools, generic SaaS, build-internal.", "-", "4 cards", "-", "-", "-"),
 ("One base, then add exactly what you need", "Pricing", "Rs 45 base; add-ons from Rs 9.", "Base + menu.", "Plan + menu table", "-", "-", "-"),
 ("Example plans", "Pricing", "Core / Growing team / Full platform (sums of list prices).", "-", "3 cards", "-", "-", "-"),
 ("Live today, and what's next", "Roadmap", "Now / Next / Later.", "-", "3 columns", "-", "-", "-"),
 ("See Vortex on your data", "Close", "45-minute working session → 30-day pilot.", "Official contacts; vortexhrms.com.", "Branded close", "-", "-", "-"),
]
OPEN = [
 "Provide access or screenshots for all modules and the mobile apps (VortexGo, SnapLens).",
 "Evidence for the SLA, encryption, multi-region and compliance claims.",
 "Decide portfolio overlaps (HR Docs vs Signet, LMS vs MavionLearn, ATS roadmap vs ProtonNxt).",
 "Target size: 200–20,000 employees (deck) vs SMB/mid-size (site).",
 "Confirm that SnapLens is a separate attendance app.",
]
UNDEREXPLAINED = []
