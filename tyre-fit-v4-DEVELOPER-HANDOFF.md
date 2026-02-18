# AUTOLINKED — DEVELOPER HANDOFF PACKAGE
**Date:** 8 February 2026
**Prepared by:** Dan (founder) + Claude (AI assistant)
**Status:** Prototype complete. Ready for production build.

---

## WHAT THIS DOCUMENT IS

This is everything a developer needs to build AutoLinked from the prototype to production. It contains:

1. **What AutoLinked is** — the product, the business model, the target user
2. **What's already built** — prototype, API, infrastructure
3. **What needs building** — the gap between prototype and production
4. **Exactly how every screen works** — from the 5,300-line prototype
5. **Every database table, API endpoint, and integration** — the full spec
6. **Known issues** — what the UX audit found
7. **Tooling setup** — how we recommend structuring the build

Items marked **[FACT]** are confirmed and tested.
Items marked **[RECOMMENDATION]** are suggested approaches, not proven.

---

# PART 1: THE PRODUCT

## [FACT] What AutoLinked Does

AutoLinked is a B2B SaaS platform for UK mobile tyre fitters. Tagline: "Fit the tyre once. Keep the customer for life."

It solves the #1 problem in mobile tyre fitting: **customer retention**. Currently, when a customer needs a tyre, they Google "mobile tyre fitter near me" and pick whoever answers. There is zero loyalty. The fitter who fitted their last set of tyres 6 months ago gets nothing.

AutoLinked fixes this by bundling free 30-day emergency breakdown cover with every tyre fitting. When the customer needs help during those 30 days, the call routes back to the original fitter first. The fitter gets paid for the emergency work. The customer stays loyal because they have a reason to.

## [FACT] Business Model

- **Free for fitters.** No subscription, no monthly fee.
- **£5.95 booking fee** charged to the customer on every confirmed quote. This funds AI usage, SMS, push notifications, and the free emergency cover.
- **1.5% + 20p** on card/QR payments processed through AutoLinked's Stripe integration. Cash and own-terminal payments have no fee.
- **Cover jobs:** When a covered customer needs emergency help, AutoLinked pays the fitter directly. Revenue from optional customer upgrades (£89-£500/year memberships) funds this.

## [FACT] Target User

Mobile tyre fitters in the UK. Typically:
- 1-3 person operations (solo fitter or small team)
- Work from a van, possibly with a depot/lockup for stock
- Age range 18-65
- Tech literacy varies wildly — from "uses WhatsApp only" to "runs a website"
- Currently manage their business via WhatsApp messages, phone calls, and memory
- Do 3-15 jobs per day depending on season
- Market size: 1,000-2,000 independent operators in the UK, £150-300M annual market

## [FACT] Branding Rule

Customer-facing communications always show: **"[Fitter's Business Name], backed by AutoLinked"**
The fitter sees AutoLinked branding. The customer sees their fitter's brand.

---

# PART 2: WHAT'S ALREADY BUILT

## [FACT] Working Prototype

A single-file React component (JSX) containing the complete app UI:
- **File:** `app5-13-LATEST-7feb2026.jsx`
- **Size:** ~5,300 lines
- **Screens:** 52+
- **Routes:** 51
- **Fully interactive:** Every button navigates, every form works, every state updates
- **Light/dark mode:** Complete theme system with toggle
- **Guided tour:** First-time user walkthrough on dashboard

This prototype is the visual spec. Every screen, every flow, every button label, every colour, every layout — is exactly how the production app should look and behave.

## [FACT] Working API

Backend is live at: `http://13.42.89.247:8000/docs` (FastAPI with Swagger UI)

**~300+ total endpoints across 30+ service groups, including:**
- Supabase Auth (email + OTP phone verification)
- Stripe Connect (deposits, wallet, payouts, Tap to Pay on iPhone)
- Twilio SMS + WhatsApp
- OpenAI Vision (tyre sidewall OCR — reads size, brand, DOT code)
- YOLOv8 tyre analysis (local, offline-capable)
- YOLOv5 real-time tyre detection
- Google OAuth + Google Business Profile integration
- Google Reviews sync + AI response drafting
- SOS/Emergency routing with PostGIS
- Push notifications (13 types)
- Photo management with Cloudflare R2
- DVSA vehicle lookup from registration plate
- Fitter engagement system
- Customer engagement + retention monitoring

**Of the 87 endpoints specified in the dev spec, approximately 57 (65%) are already built and can be reused directly.** The remaining 35% need building (quote/customer CRUD, stock management, invoice CRUD, route optimisation, dispatcher, customer-facing web pages).

## [FACT] Infrastructure

| Component | Status |
|-----------|--------|
| VPS (API server) | Live on AWS EC2 |
| Database (Supabase) | Provisioned, schema partially built |
| Storage (Cloudflare R2) | Configured for photo uploads |
| Stripe Connect | Integrated, webhooks configured |
| Twilio | Configured for SMS + WhatsApp |
| Domain | autolinked.co (assumed) |
| Google API keys | Configured for Maps, Places, Business Profile |

---

# PART 3: WHAT NEEDS BUILDING

## [FACT] The Gap

| Category | Built | Needs Building |
|----------|-------|----------------|
| Auth + onboarding | ✅ Complete | Wire to frontend |
| Quote flow (Quick + Detailed) | ❌ API not built | Full CRUD: quotes, customers, vehicles |
| Job flow (en route → complete) | Partial | GPS tracking, geofence arrival, timer |
| After photos / Condition Report | OCR + AI ready | Frontend → API integration, condition storage |
| Cover system | Partial | Cover record creation, expiry, routing logic |
| Payment | Stripe ready | Payment Link generation, Tap to Pay, cash logging |
| Wallet | Partial | Transaction history, withdrawal to bank |
| Stock management | ❌ Not built | Full CRUD: stock items, van/depot assignment, scan |
| Invoices | ❌ Not built | Create, send, remind, export (Xero/QB/FreeAgent) |
| Route optimisation | ❌ Not built | OR-Tools integration, reordering, cover job insertion |
| Reviews | ✅ Google sync built | Wire to frontend, response posting |
| Emergency/SOS | ✅ Routing built | Alert UI, accept/decline, escalation |
| Dispatcher (team view) | ❌ Not built | Team status, live location, job assignment |
| Customer-facing web pages | ❌ Not built | Quote view, receipt, cover status, ETA tracking, review link |
| Mobile app (Flutter/RN) | ❌ Not built | Entire native app from prototype |
| Push notifications | ✅ Backend ready | FCM integration in mobile app |

---

# PART 4: COMPLETE SCREEN REFERENCE

Every screen in the prototype, what it does, and what the user sees. Your developer should open the prototype and click through each flow while reading this.

## Onboarding (6 screens)

### 1. Sign In
- Phone number input + OTP verification
- "Verify & Continue" button

### 2. Welcome / Feature Overview
- 11 expandable feature cards explaining what AutoLinked does
- Top card highlighted green: "Keep Every Customer" with FREE badge
- "Get Started" button (sticky bottom)

### 3. Business Setup
- Full name, email, business name, VAT (optional)
- Depot(s): name, address, catchment radius (slider, max 25 miles)
- Services toggle: tyre fitting, puncture repair, fit only, rotation, TPMS, alignment
- Add-on pricing: digital balancing, new valves, old tyre disposal, LWN removal — each with price input OR "Include free" toggle
- Availability: days + hours + emergency callout toggle (independent of bookings)

### 4. Link Google Business Profile
- One-tap Google OAuth
- Skip option with warning about missing review automation

### 5. Team Setup
- Solo / Team toggle
- Team: add fitters by name + mobile → sends SMS deep-link invite
- Set permissions per fitter

### 6. Permissions + T&Cs
- Location permission toggle (required)
- Camera permission toggle (required)
- Terms acceptance checkbox
- GDPR consent

## Main App (46+ screens)

### Dashboard
- Next job card (customer, plate, time, ETA)
- Wallet balance with gradient card
- Quick actions: Quick Quote, Route
- Tools grid: Stock, Reviews, Bookings, Evidence Vault, Referrals, Invoices
- Dispute alert banner (if active)
- Emergency toggle
- Cover job alerts (red, urgent)
- Guided tour overlay on first visit (8 steps)

### Quick Quote
- Customer name (autocomplete from previous customers)
- Mobile number
- Reg plate (DVLA lookup on 7+ chars)
- Job type: Replace / Repair / Fit Only / Rotation
- Tyre size + quantity (with +/- stepper)
- Locking wheel nut status: Has key / No key / Not sure
- Fitting price (with "You usually charge £X-£Y" hint from history)
- Add-ons: balancing, valves, disposal, alignment (toggles, pre-set from business setup)
- Full price breakdown with booking fee + Stripe fee transparency
- Send via WhatsApp or Text Message
- Cover badge: "Customer gets 30 days free breakdown cover after fitting"

### Detailed Quote (5 steps)
1. Customer: name, mobile, plate
2. Schedule: date + time picker (skipped for emergency)
3. Job Details: type, positions, size, LWN, add-ons, multi-tier pricing
4. Stock Check: confirm tyres in stock
5. Review + Send: full breakdown, WhatsApp or SMS

### Quote Sent
- Green confirmation
- "Quote link sent to [name]"
- What happens next: deposit payment, booking confirmed, auto-reminder

### Route / Today's Jobs
- Jobs listed in optimised order
- Each shows: customer, plate, time, ETA, deposit status
- Cover jobs highlighted red
- Emergency jobs highlighted amber
- Start Job button per card

### En Route
- Manual postcode input (for when address is wrong)
- Two satnav buttons: Open in Google Maps / Open in Apple Maps
- Quick text buttons: "On my way" / "15 mins away" / "I'm here"
- Call customer button
- GPS auto-arrival: geofence (~50m), green banner appears
- "Take Before Photos to Start Job" button

### Before Photos
- Grid of tyre positions (only tyres being worked on)
- 1 tyre = 1 photo, 2 tyres = 2 photos, 4 tyres = 4 photos
- Each card: tap to photograph, shows green tick when done
- Flash simulation on capture
- GPS + timestamp auto-recorded
- "Skip Photos" option with red warning about losing dispute protection
- Progress: Arrive → Before → Condition → Payment

### Tyre Condition Report (after photos)
- Explainer: "Why photograph all 4 tyres?" — AI reads data, creates condition report, activates cover, dispute proof
- 4 tyre cards: Front Left, Front Right, Rear Left, Rear Right
- Unscanned = dashed border, "Tap to photograph"
- Tap → camera overlay with instructions:
  - Get whole tyre and wheel in frame
  - Sidewall text visible (size, brand, DOT)
  - Well lit — use phone torch if needed
  - Tread surface visible
  - "Take Photo" button
- After photo → card expands with form:
  - **AI Reading section:** Size, Brand, DOT Code (editable inputs, pre-filled by OCR)
  - Blue info box: "Read automatically from your photo. If anything is wrong, tap the field and type the correct value."
  - **Tread condition (visual check):** 3 options with bar chart graphics:
    - Good tread (green, 5 bars) — "Tread bars not visible"
    - Worn — approaching limit (amber, 2.5 bars) — "Tread bars becoming visible"
    - Illegal — at or below limit (red, 0.3 bars) — "Tread bars flush or bald"
  - **Legal status:** Legal / Illegal (two side-by-side buttons)
  - **Damage (multi-select pills):**
    - Minor (still covered): Scuff/cosmetic, Minor kerb rash, Light surface crack
    - Serious (excluded from cover): Bulge, Deep cut/slice, Cracking (structural), Sidewall damage, Puncture, Exposed cord
  - **Notes:** optional free text
  - **Cover status per tyre:** Covered (green) / Covered — minor damage noted (amber) / Excluded — serious damage (red) / Excluded — illegal (red)
  - Retake photo button
- Bottom button: disabled until all 4 scanned, then:
  - "All Legal — Collect Payment" (green)
  - "Continue — Partial Cover" (if some excluded)
- Preview Condition Report button → overlay showing full report

### Condition Report Overlay
- Vehicle, customer, fitter, business, date, GPS
- Cover status banner: "FULL COVER — ALL 4 TYRES" or "PARTIAL COVER"
- Per-tyre breakdown: size, brand, DOT, tread status, legal status, damage, notes
- Cover summary: which tyres covered, which excluded
- Claim line: 0333 0123247
- "From [Business Name], backed by AutoLinked"

### Payment
- Price breakdown: job total, booking fee deducted, amount customer owes
- **Pay via AutoLinked:**
  - Show QR Code (Stripe Payment Link, full-screen white background)
  - Tap to Pay (Stripe contactless on iPhone)
- **Already paid outside app:**
  - Paid Cash → confirmation popup
  - Own Card Machine (SumUp, Zettle, iZettle) → confirmation popup
  - Send Invoice → invoice creation screen
- Info box: "AutoLinked payments: 1.5% + 20p fee, goes to wallet. Cash/own terminal: no fee, payment logged only."
- Both paths trigger same post-job sequence

### Job Complete (popup + timeline)
- Popup shows immediately:
  - Green checkmark, "Job Complete", amount
  - Cover LIVE — all 4 tyres covered, active now
  - Condition Report Sent — 4 tyres inspected, report + receipt texted
  - Review Request — sending in 2 hours
  - Example of the exact text customer receives
- Timeline behind popup:
  - Step 1: 30-Day Cover LIVE NOW — what's covered, routes to fitter first, "View Condition Report" button
  - Step 2: Customer Text — Sent Now — full example text with receipt link, cover link, claim number
  - Step 3: Google Review Request — sending in 2 hours — example text with review link
- Back to Home / View Wallet buttons

### Cover Job Complete
- "AutoLinked Pays You" — shows earnings
- No customer payment collection (AutoLinked handles it)
- Same cover/review automation

### Wallet
- Balance display
- Transaction history (credits, debits, fees)
- Transfer to Bank button (Stripe Connect payout)

### Stock Management
- Two tabs: On Van / At Depot
- List of tyres with size, brand, quantity
- Scan tyre button (OCR reads sidewall)
- Add manually
- Move between van/depot
- Restock alerts based on upcoming bookings

### Reviews
- Synced from Google Business Profile
- Star rating, customer name, date
- Respond inline (or use AI draft response)
- Stats: average rating, total reviews, response rate

### Emergency / Cover Jobs
- Red alert when covered customer needs help
- Shows: customer name, plate, location, what's covered
- Accept / Decline buttons
- If accepted → goes to quote flow (pre-populated from cover data)
- Timer: 5 min to respond before escalation to network

### Bookings
- Calendar view
- Tap date to see jobs
- Job details, start job button

### Invoices
- List with status (paid/unpaid/overdue)
- Create invoice: customer, description, amount, send via SMS
- Remind button
- Export to Xero/QuickBooks/FreeAgent

### Disputes / Evidence Vault
- Active disputes listed
- Each shows: evidence strength score, chargeback stage
- Detail view: all photos, GPS data, timestamps, customer sign-off, OCR data
- Defence package export

### Account / Settings
- Profile (name, email, phone)
- Business details
- Bank account for withdrawals
- Notification preferences
- Display settings (theme)
- Help & support
- Log out

### Dispatcher (team owners only)
- Live map of all fitters
- Job assignment
- Status per fitter (en route, on job, available)
- Rebalance routes

---

# PART 5: DATABASE SCHEMA

## [FACT] 31 Tables Required

| Table | Purpose | Key Fields |
|-------|---------|------------|
| fitters | Business account | name, email, mobile, business_name, stripe_connect_id, gmb_link |
| fitter_team | Team members | fitter_id, owner_id, role, permissions, invite_token |
| customers | Customer records | name, mobile, plate, vehicle, linked_fitter_id |
| vehicles | Vehicle data | reg, make, model, year, mot_data |
| quotes | Full quote data | customer_id, fitter_id, status, pricing, deposit_status |
| quote_items | Line items | quote_id, type, tyre_size, quantity, price |
| jobs | Job lifecycle | quote_id, fitter_id, status, timestamps, gps |
| job_photos | Before/after evidence | job_id, type, position, photo_url, ocr_data, gps, timestamp |
| job_timer | Work timer | job_id, started_at, paused_at, total_seconds |
| cover_records | Auto-created on complete | job_id, customer_id, vehicle_id, status, expires_at |
| cover_tyre_baseline | Per-tyre data at service | cover_id, position, size, brand, dot, tread_status, legal_status, damages, photo_url |
| cover_claims | Emergency requests | cover_id, status, routed_to, escalation_level |
| disputes | Chargeback defence | job_id, status, evidence_score, stripe_dispute_id |
| wallet_transactions | All money movement | fitter_id, type, amount, stripe_fee, description |
| wallet_balance | Current balance | fitter_id, available, pending |
| invoices | Customer invoices | fitter_id, customer_id, amount, status, payment_link |
| stock | Tyre inventory | fitter_id, location, size, brand, quantity |
| stock_movements | Audit trail | stock_id, from, to, quantity, timestamp |
| bookings | Calendar | customer_id, fitter_id, date, time, status |
| reviews | Google reviews | fitter_id, google_review_id, rating, text, response |
| notifications | All comms | type, recipient, channel, template, status, sent_at |
| emergency_alerts | SOS routing | cover_claim_id, fitter_id, status, timeout_at |
| depots | Fitter locations | fitter_id, name, address, lat, lng, radius_miles |
| routes | Optimised job order | fitter_id, date, job_order, total_distance |
| settings_profile | User prefs | fitter_id, key, value |
| settings_business | Business config | fitter_id, services, pricing, availability |
| settings_notifications | Notification prefs | fitter_id, channel, enabled |
| gdpr_consent | Consent records | fitter_id, consent_type, granted_at |
| audit_log | System audit trail | action, actor, target, timestamp |
| customer_cover_page | Public cover view | token, cover_id, expires_at |
| customer_receipt_page | Public receipt view | token, job_id, expires_at |

**All tables need Row Level Security (RLS) in Supabase.** Fitters can only see their own data. Team members inherit owner's data with permission checks.

---

# PART 6: API ENDPOINTS

## [FACT] 87 Endpoints Required

### Auth & Onboarding (10)
```
POST   /auth/signup
POST   /auth/login
POST   /auth/verify-otp
POST   /auth/google
PUT    /onboarding/business-setup
POST   /onboarding/gmb-link
POST   /onboarding/team-invite
PUT    /onboarding/permissions
PUT    /onboarding/gdpr-consent
POST   /onboarding/complete
```

### Quotes (8)
```
POST   /quotes
GET    /quotes
GET    /quotes/:id
PUT    /quotes/:id
POST   /quotes/:id/send
POST   /quotes/:id/deposit-link
GET    /quotes/public/:token          (no auth — customer view)
POST   /quotes/cover                  (auto-populated from cover data)
```

### Jobs (12)
```
POST   /jobs
GET    /jobs
GET    /jobs/:id
PUT    /jobs/:id/status               (en_route → arrived → in_progress → complete)
POST   /jobs/:id/before-photos
POST   /jobs/:id/after-photos         (all 4 tyres, OCR runs)
POST   /jobs/:id/signoff
POST   /jobs/:id/payment
POST   /jobs/:id/complete             (triggers cover + receipt + review)
GET    /jobs/:id/evidence
POST   /jobs/:id/timer
GET    /jobs/today
```

### Cover (8)
```
POST   /cover                         (auto-created on job complete)
GET    /cover
GET    /cover/:id
GET    /cover/:id/baseline
POST   /cover/:id/emergency-request
POST   /cover/:id/route-to-fitter
POST   /cover/:id/network-broadcast
GET    /cover/stats
```

### Wallet (5)
```
GET    /wallet/balance
GET    /wallet/transactions
POST   /wallet/withdraw
POST   /wallet/payment-link
POST   /wallet/payment-link/sms
```

### Stock (6)
```
GET    /stock
POST   /stock
PUT    /stock/:id
DELETE /stock/:id
POST   /stock/scan
GET    /stock/order-list
```

### Routes (4)
```
GET    /routes/today
POST   /routes/optimise
PUT    /routes/reorder
POST   /routes/insert-cover-job
```

### Invoices (5)
```
POST   /invoices
GET    /invoices
POST   /invoices/:id/send
POST   /invoices/:id/remind
GET    /invoices/export
```

### Reviews (5)
```
GET    /reviews/sync
GET    /reviews
GET    /reviews/stats
POST   /reviews/:id/respond
POST   /reviews/:id/draft-response
```

### Emergency (5)
```
POST   /emergency/alert
POST   /emergency/respond
POST   /emergency/escalate/:id
GET    /emergency/nearby-fitters
POST   /emergency/decline
```

### Dispatcher (3)
```
GET    /dispatcher/team-status
GET    /dispatcher/fitter/:id/location
POST   /dispatcher/assign-job
```

### Notifications (10)
```
POST   /notifications/send
POST   /notifications/send-bulk
POST   /notifications/job/new
POST   /notifications/job/reminder
POST   /notifications/job/sos
POST   /notifications/google-review
POST   /notifications/payout
POST   /notifications/verification
POST   /notifications/onboarding-reminder
POST   /notifications/custom
```

### Settings (6)
```
GET/PUT /settings/profile
GET/PUT /settings/business
GET/PUT /settings/bank-account
GET/PUT /settings/depots
GET/PUT /settings/notifications
POST    /settings/export-data          (GDPR)
```

---

# PART 7: INTEGRATIONS

## [FACT] All Integrations Required

| Integration | Purpose | Status |
|-------------|---------|--------|
| Supabase Auth | Email + OTP phone login | ✅ Built |
| Supabase Postgres + PostGIS | Database + radius queries | ✅ Provisioned |
| Cloudflare R2 | Photo storage | ✅ Configured |
| Stripe Connect Express | Deposits, payments, wallet, payouts | ✅ Integrated |
| Stripe Tap to Pay (iPhone) | Contactless card at van | ✅ SDK ready |
| Twilio | SMS + WhatsApp messaging | ✅ Configured |
| Firebase FCM | Push notifications to fitters | ✅ Backend ready |
| OpenAI Vision | Tyre sidewall OCR (size, brand, DOT) | ✅ 4 endpoints live |
| YOLOv8 | Local tyre analysis (offline-capable) | ✅ 6 endpoints live |
| YOLOv5 | Real-time tyre detection | ✅ 4 endpoints live |
| Google OAuth | Sign-in + GMB linking | ✅ Built |
| Google Business Profile API | Review sync + response posting | ✅ 12 endpoints live |
| Google Maps / Apple Maps | Navigation (deep links, not embedded) | Uses native app links |
| DVSA API | Vehicle lookup from registration plate | ✅ Built |
| OR-Tools | Route optimisation | ❌ Needs building |
| Google Routes API | Traffic-aware ETAs | ❌ Needs integration |

---

# PART 8: CUSTOMER-FACING PAGES

## [FACT] 5 Public Pages Required (no auth, token-based)

| URL | Purpose |
|-----|---------|
| /quote/:token | Customer views quote, pays deposit |
| /receipt/:token | Receipt + cover policy + tyre photos + PDF download |
| /cover/:token | Cover status, what's covered, request help |
| /eta/:token | Live fitter ETA tracking |
| /review/:token | Direct Google review link |

**Receipt/cover page must show:**
- What was fitted (tyre details from OCR)
- After photos of all 4 tyres
- Price paid
- Cover wording (what's covered, valid until date)
- How to claim: call 0333 0123247
- Branding: "[Fitter Name], backed by AutoLinked"
- Download as PDF option

---

# PART 9: SMS/NOTIFICATION TEMPLATES

## [FACT] 8 Core SMS Templates

| Template | Trigger | Example |
|----------|---------|---------|
| Quote sent | Quote created | "Hi [name], [fitter] has sent you a quote for [job]. View & pay deposit: [link]" |
| Deposit confirmed | Stripe webhook | "[name], booking confirmed for [date]. [fitter] will text when they're on the way." |
| ETA update | Fitter en route | "[fitter] is on the way — about 15 minutes away." |
| Receipt + cover | Job complete | "Hi [name], thanks for choosing [business]! ✅ [qty]x [size] fitted. 🛡️ 30-day cover ACTIVE. 📋 View report & cover: [link]. Need help? 0333 0123247" |
| Review request | 2 hours after job | "Hi [name], hope the new tyres are riding well! Quick Google review would really help: [link]. Thanks! — [fitter name]" |
| Cover expiring | 3 days before | "[name], your tyre cover from [business] expires in 3 days. Book your next fitting to stay covered: [link]" |
| Emergency SOS | Customer needs help | Push to fitter: "COVER JOB — [name] needs help near [location]. Accept?" / SMS to customer: "Help is on the way. [fitter] will call you shortly." |
| Team invite | Owner invites fitter | "You've been invited to join [business] on AutoLinked. Download the app: [deep-link]" |

---

# PART 10: KNOWN ISSUES FROM UX AUDIT

## [FACT] Issues Found 7 Feb 2026

These were identified during a full screen-by-screen audit. Priority rated by impact on usability.

| # | Screen | Issue | Recommended Fix | Priority |
|---|--------|-------|-----------------|----------|
| 1 | Condition Report | Tread condition and Legal status are two separate inputs asking the same question — fitters will contradict themselves | Merge: tread selection auto-sets legal status. "Good tread" → Legal. "Illegal" → Illegal. Allow manual override. | HIGH |
| 2 | Condition Report | After completing one tyre, fitter has to manually close it and open the next | Auto-collapse completed tyre, auto-open next unscanned tyre | HIGH |
| 3 | Condition Report | 9 damage options (3 minor + 6 serious) — too many to scan quickly | Reduce to 6: Minor (Scuff/cosmetic, Kerb rash) + Serious (Bulge, Cut/slice, Sidewall, Puncture) | MEDIUM |
| 4 | Condition Report | OCR pre-filled fields look like static text, not editable | Add pencil icon or different background to signal editability | MEDIUM |
| 5 | Condition Report | Camera overlay shows no example of what a good photo looks like | Add small illustration showing correct tyre photo framing | MEDIUM |
| 6 | Business Setup | "Depot" label confuses solo fitters working from home | Show "Your base" for single location, "Depot" only for multiple | LOW |
| 7 | Link GMB | Older fitters don't know what Google Business Profile is | Add one explanatory line before the button | LOW |

---

# PART 11: TOOLING SETUP

## [RECOMMENDATION] How to Structure the Build

**This section is a recommended approach, not a proven one. Your developer should adapt it based on their experience.**

### Suggested tool allocation

**Your developer (human)** — architectural lead:
- Database schema design and migrations
- Supabase RLS policies
- Stripe Connect integration (money flows, webhooks)
- Deployment pipeline (Vercel, CI/CD)
- Code review on all AI-generated work
- Decisions that affect security, data integrity, and scalability

**Cursor** — your developer's daily coding tool:
- Frontend development (React/Next.js or Flutter)
- Refactoring and debugging
- Working with the existing codebase
- UI implementation from the prototype

**Claude Code (terminal agent)** — bulk task execution:
- Building remaining API endpoints from this spec
- Writing database migrations from the schema above
- Creating test suites
- Generating TypeScript types from the schema

**Devin** — isolated, well-defined tasks:
- SMS notification service (Twilio templates)
- OCR integration service (connect existing AI endpoints to job flow)
- Google Business Profile OAuth flow
- Customer-facing web pages (5 public pages)
- Invoice export (Xero/QuickBooks/FreeAgent format)

### Critical rule
One developer owns the repo. All AI tools commit to the same codebase via PRs. Human reviews every merge. No exceptions.

---

# PART 12: TECH STACK

## [FACT] Confirmed Stack

| Layer | Technology |
|-------|-----------|
| Auth | Supabase Auth (email + OTP) |
| Database | Supabase Postgres + PostGIS + RLS |
| Storage | Cloudflare R2 |
| Frontend (web) | Next.js on Vercel |
| Mobile | Flutter (primary) or React Native/Expo (TBD by developer) |
| Maps | Deep links to Google Maps / Apple Maps (no embedded maps) |
| Route optimisation | OR-Tools on VPS + Google Routes API |
| Payments | Stripe Connect Express |
| SMS/WhatsApp | Twilio |
| Push notifications | Firebase FCM |
| AI/OCR | OpenAI Vision + YOLOv8 + YOLOv5 |
| Reviews | Google Business Profile API |
| Vehicle lookup | DVSA API |

---

# PART 13: FILES INCLUDED IN THIS HANDOFF

| File | What It Is |
|------|-----------|
| `app5-13-LATEST-7feb2026.jsx` | Complete prototype — 5,300 lines, 52+ screens, fully interactive |
| `AUTOLINKED-DEV-SPEC-v3-LATEST-7feb2026.md` | Technical spec with changelog of every decision |
| `AUDIT-full-ux-7feb2026.md` | Full UX audit with adoption predictions |
| `DEVELOPER-HANDOFF.md` | This document |

---

# PART 14: WHAT SUCCESS LOOKS LIKE

## [FACT] MVP Scope

The minimum product that can go to market:

1. Fitter can sign up and set up business profile
2. Fitter can send a Quick Quote via SMS/WhatsApp
3. Customer can view quote and pay deposit
4. Fitter can run a job: en route → before photos → condition report → payment → complete
5. Condition report creates 30-day cover automatically
6. Customer receives receipt + cover text
7. Google review request sends 2 hours later
8. Wallet shows earnings, can withdraw to bank

Everything else (stock, invoices, dispatcher, route optimisation, emergency SOS routing) is Phase 2.

## [FACT] Build Estimate

| Metric | Estimate |
|--------|----------|
| Database tables (MVP) | ~20 |
| API endpoints (MVP) | ~50 |
| App screens (MVP) | ~30 |
| Build time (1 dev + AI tools) | 6-8 weeks |
| Build time (2 devs + AI tools) | 3.5-4 weeks |
| Infrastructure cost at 500 fitters | ~£2,715/month |

---

# PART 15: PHASED DELIVERY PLAN

## [RECOMMENDATION] Suggested Build Sequence

### Phase 0 — Foundation (Week 1)
- Finalise Supabase schema + migrations for MVP tables
- Implement/verify RLS policies
- Define shared API contracts (OpenAPI, request/response DTOs)
- Set up environments: local, staging, production
- Add CI (lint, type-check, tests, build)

### Phase 1 — Core Revenue Loop (Weeks 2-3)
- Auth + onboarding wired to API
- Quick Quote end-to-end (create, send SMS/WhatsApp, deposit link)
- Customer quote page with Stripe deposit payment
- Booking confirmation webhook flow

### Phase 2 — Job Execution Loop (Weeks 4-5)
- Job lifecycle status updates
- Before/after photo upload + OCR link to records
- Condition report persistence + cover activation on complete
- Payment capture paths (QR, Tap to Pay, cash log, own-terminal log)
- Receipt + cover SMS + 2-hour delayed review SMS

### Phase 3 — Money + Retention (Weeks 5-6)
- Wallet ledger + balance + withdrawals
- Google reviews sync/respond
- Evidence vault + dispute package export
- Customer receipt/cover/ETA public pages

### Phase 4 — Operations (Weeks 6-8)
- Stock CRUD + sidewall scan
- Invoices CRUD + reminders + pay links
- Route optimisation (OR-Tools + ETA integration)
- Dispatcher/team assignment + live fitter status

---

# PART 16: DEFINITION OF DONE (DOD)

## [FACT] MVP DOD

A feature is only "done" when all items below are complete:

1. Product behaviour matches the prototype UX flow.
2. API contracts are documented and versioned.
3. Unit and integration tests exist for happy path + key failures.
4. RLS and authorization checks are validated.
5. Error states are user-friendly and logged.
6. Analytics/audit events are emitted where required.
7. Mobile and web builds pass CI.
8. Feature is tested on staging with realistic demo data.

## [FACT] Critical Acceptance Criteria

- Quote to deposit success rate >= 95% in staging tests.
- Job complete flow always creates:
  - `jobs` completion event
  - `cover_records` row
  - receipt notification
  - review-request schedule entry
- No customer data leakage across fitter accounts (RLS verified).
- Stripe webhook retries are idempotent (no duplicate charges/jobs/ledger rows).

---

# PART 17: TEST PLAN (MVP)

## [FACT] Must-Pass End-to-End Journeys

1. New fitter onboarding -> send first quote.
2. Customer opens quote link -> pays £5.95 deposit.
3. Fitter starts job -> captures photos -> condition report -> payment -> complete.
4. Customer receives receipt + cover text with valid link.
5. Review request sends after 2 hours delay.
6. Wallet reflects payment and supports bank withdrawal.

## [FACT] Regression Areas

- Quote pricing calculations (add-ons, fees, totals)
- Photo upload and OCR mapping to tyre positions
- Cover eligibility rules by tyre condition
- Stripe webhook event handling and retries
- Team permissions (owner vs fitter)
- Public token pages (quote/receipt/cover/eta/review)

---

# PART 18: SECURITY, COMPLIANCE, OPERATIONS

## [FACT] Security Requirements

- Enforce RLS on all tenant tables.
- Use signed URLs for private photo access.
- Rotate API keys and webhook secrets via env vars only.
- Enforce server-side validation for all monetary values.
- Add rate limits on auth, quote public pages, and claim requests.

## [FACT] Compliance Requirements

- GDPR data export and delete flows must be functional.
- Consent timestamps stored for terms/privacy/marketing where applicable.
- Audit logs retained for payment, dispute, and data-access events.

## [FACT] Monitoring Requirements

- Error tracking (frontend + backend)
- API latency + failure dashboards
- Stripe webhook delivery monitoring
- SMS delivery success/failure metrics
- Daily backup verification for Postgres and object storage

---

# PART 19: GO-LIVE CHECKLIST

## [FACT] Release Readiness

- [ ] Staging sign-off on all MVP journeys
- [ ] Production environment variables verified
- [ ] Stripe production keys + webhooks validated
- [ ] Twilio sender IDs/templates approved
- [ ] Domain + SSL + DNS verified
- [ ] Backups + restore drill completed
- [ ] Incident owner + escalation contacts defined
- [ ] Rollback plan tested

## [FACT] Day-1 Operational Targets

- Support response SLA: < 4 business hours
- P1 bug triage window: < 1 hour
- Payment incident triage window: immediate
- Daily monitoring review for first 14 days post-launch

---

# PART 20: IMMEDIATE NEXT ACTIONS

## [FACT] First 10 Tasks to Start Build

1. Freeze prototype route map and screen IDs.
2. Create migration set for MVP schema subset.
3. Implement base RLS policies and tenant tests.
4. Finalise OpenAPI contract for MVP endpoints.
5. Wire auth + onboarding screens to live API.
6. Build quote create/send/deposit-link pipeline.
7. Build customer quote public page + Stripe checkout.
8. Build job completion pipeline (photos -> condition -> complete).
9. Build receipt/cover notification templates and trigger jobs.
10. Add CI gates (tests + lint + type-check + build) as merge blockers.

## [RECOMMENDATION] Ownership Model

- Product owner: Dan (scope, priority, sign-off)
- Technical owner: Lead developer (architecture, security, release)
- QA owner: Assigned tester or developer rotating role
- Ops owner: Same as technical owner until team scales

---

## FINAL NOTE

This handoff is intended to be executable, not aspirational. If any requirement conflicts with production constraints, log the deviation explicitly in a changelog and get product sign-off before shipping.
