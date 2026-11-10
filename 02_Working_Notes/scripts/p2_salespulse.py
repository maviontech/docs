# -*- coding: utf-8 -*-
NAME = "SalesPulse CRM"
FILE = "SalesPulse_Content_Architecture.docx"
ACCENT = "5B4BDB"
TAGLINE = "India-first sales CRM with privacy-masked calling"
SOURCES = [
 "SalesPulse_CRM_Sales_Deck.pptx (26 slides, notes on 22, ~27 screenshots at 800px)",
 "SalesPulse is NOT listed on maviontech.com or in the company PDF. Confirm its place in the catalogue.",
 "Entity shown as 'Mavion Technologies Pvt. Ltd.'. It will be corrected to MavionTech Pvt. Ltd. per the official website.",
]
POSITIONING = [
 ("What exactly is the product?", "A multi-tenant sales CRM for Indian sales teams. Reps work from a ranked daily queue, call customers through privacy-masked click-to-call (inbound calls are routed back to the owning rep), and log outcomes, sentiment and next actions. Leaders get a live command center, leaderboards and self-generating weekly reports. Billing is GST-native with Razorpay. Each company gets its own database, with company-code login."),
 ("What business problem does it solve?", "Reps hold raw customer numbers and take them to competitors. Hours are lost re-typing numbers into spreadsheets. Leaders can't see pipeline or performance in time. Customer history is scattered. Global CRMs are heavy and don't fit Indian GST billing."),
 ("Who needs it?", "Sales directors and business owners (buyers) of phone-led sales teams; roles BDE (rep), Manager, Director, Admin; field reps (Android app)."),
 ("What industries can use it?", "Any organisation selling by phone or field visits in India. No specific vertical is evidenced, so the deck should not claim verticals."),
 ("Primary value proposition", "Your reps sell without ever owning your customers' data, and your reports build themselves."),
 ("Core capabilities", "My Day queue; leads; weighted pipeline; Customer 360; masked calling; activity journal; email and WhatsApp outreach; command center; report builder; weekly reports; data-protection controls; subscriptions and GST billing; Android app; platform console."),
 ("What makes it different?", "(1) Two-way masked calling, enforced server-side on web, mobile and exports. (2) Defence-in-depth against data leakage: no bulk export for reps, row-level access, access logs with anomaly alerts, on-screen traceability watermark, rate limits. (3) Self-building weekly reports with RAG scoring. (4) India-first: INR, GST invoices, Razorpay, Asia/Kolkata. (5) Database-per-tenant isolation."),
 ("Why should a customer evaluate it?", "Customer-data leakage through reps is a live risk for phone-led sales teams, and SalesPulse removes it structurally. The deck offers a 30-day free trial with no card."),
 ("Business value", "Protects the customer book; recovers rep time from manual reporting; enables fair, data-driven coaching (talk-time, leaderboard); compliant billing. '5+ hrs lost per rep each week' is unsourced and will be removed unless evidenced."),
]
MODULES = [
 ("1. My Day", "Ranked work queue; follow-ups due today; pipeline snapshot", "Start every rep's day with priorities.", "Highest-value, most-overdue actions first.", "Reps act from the queue.", "Open → call/act → log → next.", "Activity log, leads, pipeline.", "Guesswork and sticky notes.", "More selling time.", "Slide 6"),
 ("2. Leads", "Capture & qualification; owner/stage/status; CSV import with de-dup; pipeline value", "Clean, ready-to-work leads.", "Bulk import with duplicate detection.", "Reps/managers.", "Import/capture → qualify → convert.", "Pipeline, customers.", "Dirty data.", "Clean pipeline.", "Slide 12"),
 ("3. Pipeline", "5 weighted stages; drag-and-drop Kanban; stage aging; weighted forecast", "Steer deals.", "Weighted values roll up; aging on cards.", "Reps move deals; leaders forecast.", "Stage moves → forecast.", "Leads, command center.", "Unreliable forecast.", "Forecast confidence.", "Slide 13"),
 ("4. Customers & 360", "Accounts; contacts; linked opportunities; interaction timeline; lifetime value", "Whole relationship on one screen.", "-", "Reps and managers.", "-", "Activity, pipeline.", "Scattered history.", "Context for every call.", "Slide 14"),
 ("5. Privacy-Masked Calling (USP)", "Click-to-call via business caller ID; masked in UI; inbound routing to owning rep; in-call masked dialer; after-call outcome, sentiment, feedback, next action; auto-log; talk-time", "Call without exposing numbers.", "Masked both ways; nothing to copy or screenshot.", "Reps.", "Click → connect → talk → outcome → auto-log.", "Telephony (provider TBC); activity log; reports.", "Poaching and leakage.", "The business owns the relationship.", "Slides 7–9"),
 ("6. Multi-channel Outreach", "Rich email from rep's verified address (fallback to company sender); Cc teammates only; HTML signatures; WhatsApp Business approved templates with images/PDFs; masked addresses; auto-logged", "Reach customers on every channel without exposure.", "-", "Reps.", "Compose → send → logged on timeline.", "Customers, activity.", "Off-system messaging.", "Complete history.", "Slides 10–11 (no screenshots)"),
 ("7. Activity Log & Call Journal", "Calls, emails, demos, follow-ups; outcomes; sentiment; next actions; talk-time totals", "Capture every interaction.", "-", "Auto + reps.", "-", "Feeds reports and weekly reports.", "Busywork.", "Measurable effort.", "Slide 15"),
 ("8. Leadership Command Center", "Org KPIs; 8-week closed-business trend; live BDE leaderboard (composite score); RAG ratings", "Real-time visibility into pipeline and people.", "-", "Managers, directors.", "-", "All sales data.", "Late visibility.", "Coaching on facts.", "Slide 16"),
 ("9. Report Builder", "Scope (all/chosen execs/territory); any period; multi-sheet Excel (Summary + Monthly/Weekly/Daily); threshold colours; per-exec scores", "Reports exactly as leadership needs.", "-", "Leaders.", "Scope → period → export.", "Activity.", "Manual consolidation.", "Print-ready workbooks.", "Slide 17"),
 ("10. Weekly Reports", "Auto-generated from activity; KPI scoring; RAG; submit to leadership", "Stop re-typing numbers.", "-", "Reps submit; leaders review.", "Week assembles → submit.", "Activity.", "Inconsistent numbers.", "Trustworthy weekly cadence.", "Slide 18"),
 ("11. Data Protection & Integrity", "Phone/email masked everywhere; leadership-only exports; row-level access; access log + anomaly alerts; traceability watermark; isolation & rate limits", "Keep customer data from walking out.", "-", "Admins.", "-", "All modules.", "Data theft.", "Defence in depth.", "Slide 23 (no screenshots)"),
 ("12. Subscriptions & Billing", "Razorpay payment links; automatic GST tax invoices; trials, renewals, 10-day grace; automatic seat/quota limits", "India-first, automated billing.", "-", "Customer admin; MavionTech.", "Trial → pay → invoice → renew.", "Platform.", "Manual billing.", "Zero manual audit.", "Slide 20"),
 ("13. Native Android App", "My Day; pipeline; masked calling; outcome logging; push notifications; same masking rules", "Field reps stay in flow.", "-", "Field reps.", "-", "All rep modules.", "Desk-bound CRM.", "Mobile productivity.", "Slide 19 (no screenshots)"),
 ("14. Platform & Security", "Database-per-tenant; company-code login; RBAC (BDE/Manager/Director/Admin); platform control center (MRR, ARR, tenants, provisioning)", "Isolated, governed multi-tenancy.", "-", "Admins; MavionTech.", "-", "All.", "Cross-company access.", "Physical isolation.", "Slide 24"),
]
SCREEN_FLAGS = [
 "All screenshots are 800px. Recapture at full resolution.",
 "No screenshots exist for email composer, WhatsApp, data-protection controls (watermark, access log) or the Android app. Capture them.",
 "Replace emoji icons with the master icon set.",
]
RESTRUCTURE = [
 ("1 Cover", "Rewrite", "Correct the entity name; add the MavionTech endorsement."),
 ("2 Sales reality + 3 Problem", "Merge", "One problem slide. Drop the '5+ hrs' figure unless sourced."),
 ("4 Introducing", "Keep", ""),
 ("5 At a glance", "Keep", "Expand to 14 modules."),
 ("6 My Day", "Keep", ""),
 ("7–9 Masked calling", "Keep (3)", "This is the flagship sequence."),
 ("10–11 Email/WhatsApp", "Merge + add screenshots", ""),
 ("12–16", "Keep", "Leads, pipeline, 360, activity, command center."),
 ("17–18 Reports", "Keep", ""),
 ("19 Mobile", "Rewrite", "Add device screenshots."),
 ("20 Billing", "Keep", ""),
 ("21 Why", "Keep", "Link each point to its proof slide."),
 ("22 Pricing", "Rewrite", "Fix the Basic vs Starter anomaly after confirmation."),
 ("23 Data protection + 24 Security", "Keep both", "Add screenshots to slide 23."),
 ("25 Getting started", "Keep", ""),
 ("26 Close", "Rewrite", "Official contacts."),
 ("NEW", "Add", "Personas & roles slide."),
 ("NEW", "Add", "'A day in the life of a rep' workflow diagram."),
 ("NEW", "Add", "Integrations slide (telephony partner, WhatsApp Business, Razorpay, email) once the provider is confirmed."),
]
SLIDES = [
 ("Cover — The command center for high-performing sales teams", "Category", "India-first CRM with masked calling.", "Lockup, endorsement.", "Hero", "My Day", "-", "-"),
 ("Where CRMs let Indian sales teams down", "Problem", "Leakage, busywork, blind leaders, GST chaos.", "6 pains.", "Icon cards", "-", "-", "-"),
 ("One command center, built the way India sells", "Solution", "Capture, protect, run, report.", "4 pillars.", "Hero + pillars", "Command center", "-", "All"),
 ("Who uses SalesPulse", "Personas", "BDE, Manager, Director, Admin.", "Role cards.", "Cards", "-", "-", "Platform"),
 ("A rep's day, end to end", "Workflow", "Queue → call → log → follow-up → weekly report.", "-", "Diagram", "-", "Day-in-life diagram", "My Day, Calling, Activity"),
 ("Everything your sales org needs", "Map", "14 modules.", "-", "Module grid", "-", "-", "All"),
 ("Every rep starts the day knowing who to call", "My Day", "-", "-", "Hero + features", "My Day", "-", "My Day"),
 ("Your reps make the call. They never see the number.", "Flagship USP", "Two-way masking.", "-", "Hero + 3 features", "Lead with masked dialer", "Masking flow diagram", "Masked Calling"),
 ("A dialer that protects your customer by default", "USP proof", "-", "-", "Full shot", "Dialer", "-", "Masked Calling"),
 ("Every call logs itself", "USP proof", "Outcome, sentiment, next action.", "-", "Hero + features", "After-call", "-", "Masked Calling, Activity"),
 ("Email and WhatsApp, right from the lead", "Outreach", "Masked, logged.", "-", "Two shots", "Composer, WhatsApp (new)", "-", "Outreach"),
 ("Capture and qualify leads at speed", "Leads", "-", "-", "Hero + features", "Leads", "-", "Leads"),
 ("A weighted pipeline you can steer", "Pipeline", "-", "-", "Hero + features", "Kanban", "-", "Pipeline"),
 ("The whole relationship on one screen", "Customer 360", "-", "-", "Hero + features", "360", "-", "Customers"),
 ("Every interaction, captured without busywork", "Activity", "-", "-", "Hero + features", "Activity log", "-", "Activity"),
 ("Real-time visibility into pipeline and people", "Command center", "-", "-", "Hero + features", "Command center", "-", "Command Center"),
 ("Reports that build themselves", "Reporting", "Report builder + weekly reports.", "-", "Two shots", "Builder, weekly", "-", "Reports"),
 ("Your customer data can't walk out the door", "Data protection", "Six controls.", "-", "Control cards + shots", "Watermark, access log (new)", "-", "Data Protection"),
 ("The full command center in your rep's pocket", "Mobile", "-", "-", "Device frames", "Android (new)", "-", "Mobile"),
 ("Automated, India-first billing", "Billing", "-", "-", "Two shots", "Billing", "-", "Billing"),
 ("Multi-tenant by design, isolated by default", "Architecture", "-", "-", "Diagram + shots", "Platform console", "Architecture diagram", "Platform"),
 ("Why SalesPulse", "USPs", "Six differentiators.", "-", "Cards", "-", "-", "-"),
 ("Pricing & packages", "Commercials", "Per-seat software + pay-as-you-go calling.", "Confirmed price book.", "Plan cards", "-", "-", "Billing"),
 ("Live in days, not quarters", "Onboarding", "4 steps; 30-day trial.", "-", "Steps", "-", "-", "-"),
 ("Give your team the command center they deserve", "Close", "Trial or demo.", "Official contacts.", "Branded close", "-", "-", "-"),
]
OPEN = [
 "Confirm SalesPulse belongs in the official catalogue (absent from the website).",
 "Telephony provider and DLT/TRAI compliance.",
 "Correct price book.",
 "iOS plans.",
 "Full-resolution screenshots and app access.",
 "Domain salespulse.maviontech.com.",
]
UNDEREXPLAINED = []
