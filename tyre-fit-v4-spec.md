# TYRE-FIT — Flutter Production Development Spec
### For developers building the production app from the React prototype

> **Version:** 3.1 — 13 February 2026
> **App name:** TYRE-FIT
> **Tagline:** Fit the tyre once. Keep the customer for life.
> **Platform:** Flutter (iOS + Android)
> **Prototype:** tyre-fit-v3-app.jsx (7,453 lines, 53+ screens including customer PWA)
> **Helpline:** 0330 633 1247
> **Domain:** tyre-fit.co

---

## 1. WHAT YOU'RE BUILDING

A professional management app for UK mobile tyre fitters. It runs their entire working day — quoting, navigation, job management, photos, payments, invoicing, team management, and automated customer communications.

The app's core trick: the daily workflow **automatically** builds customer retention, dispute evidence, and reputation without the fitter doing anything extra. After photos create cover policies, condition reports, and dispute evidence. The fitter just fits tyres. Everything else happens in the background.

### Business Model
- **Free for fitters.** No subscription, no setup fee, no lock-in.
- **£5.95 booking fee per confirmed quote** — paid by the customer as a deposit.
- TYRE-FIT keeps the £5.95. It covers: SMS, AI scanning, 30-day cover, review automation, platform costs.
- Fitter receives their full quoted price (minus 1.5% + 20p Stripe processing on digital payments).

### The Golden Rule
Every screen is designed for a fitter standing next to a van, one hand holding a wheel gun. **One thumb operation.** Font size toggle on every screen. No unnecessary taps.

---

## 2. TECH STACK

### Core
| Service | Purpose | Notes |
|---------|---------|-------|
| **Flutter** | Mobile app (iOS + Android) | Single codebase |
| **Supabase** | PostgreSQL + PostGIS + Auth + Realtime + pg_cron | EU region for UK data |
| **Cloudflare R2** | Photo + signature storage | Cheaper than S3 |
| **Vercel** | API routes (Next.js) + customer-facing web pages | tyre-fit.co/* |

### Maps & Routing
| Service | Purpose |
|---------|---------|
| **Mapbox GL** | Map display (50k loads/mo free) |
| **Mapbox Search** | Address autocomplete (100k/mo free) |
| **OR-Tools** (self-hosted VPS) | Route optimisation |
| **Google Routes API** | Traffic-aware ETAs (10k free/mo) |

### Communications
| Service | Purpose | Cost |
|---------|---------|------|
| **Twilio SMS** | Quotes, ETAs, receipts, reviews, cover alerts | ~3.8p/msg |
| **Twilio WhatsApp** | Quote delivery | ~5p/conversation |
| **Firebase FCM** | Push notifications | Free |

### Payments
| Service | Purpose |
|---------|---------|
| **Stripe Checkout** | £5.95 booking deposit (goes to TYRE-FIT) |
| **Stripe Connect Express** | Job payments → fitter wallet |
| **Stripe Payment Links** | QR code payments at point of job |
| **Stripe Connect Transfers** | Wallet → bank withdrawal + cover job payments |

### External APIs (12 total)
Supabase, Stripe, Twilio, Firebase FCM, Mapbox, OR-Tools VPS, Google Routes API, Google Business Profile API, Cloudflare R2, MOT History API (free — DVLA vehicle lookup), Anyline SDK (tyre sidewall OCR), Apple/Google Push

---

## 3. DATABASE SCHEMA

```sql
-- USERS
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT, mobile TEXT UNIQUE NOT NULL, full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('owner', 'fitter')),
  business_id UUID REFERENCES businesses(id),
  invited_by UUID REFERENCES users(id), avatar_url TEXT,
  preferred_map TEXT DEFAULT 'google', preferred_payment TEXT,
  preferred_send TEXT, font_size TEXT DEFAULT 'medium',
  dark_mode BOOLEAN DEFAULT false, high_contrast BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- BUSINESSES
CREATE TABLE businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES users(id) NOT NULL, name TEXT NOT NULL, vat_number TEXT,
  services JSONB DEFAULT '{"tyreFitting":true,"punctureRepairs":true,"fitOnly":true,"tyreRotation":true,"tpms":false,"alignment":false}',
  add_on_pricing JSONB DEFAULT '{"digitalBalancingPrice":"5","newValvesPrice":"3","oldTyreDisposalPrice":"2.50","lwnRemovalPrice":"25","digitalBalancingFree":false,"newValvesFree":false,"disposalFree":false}',
  availability JSONB DEFAULT '{"bookings":true,"emergency":true,"emergencyHours":"business","businessHoursStart":"08:00","businessHoursEnd":"18:00","businessDays":["Mon","Tue","Wed","Thu","Fri","Sat"]}',
  gmb_linked BOOLEAN DEFAULT false, gmb_place_id TEXT,
  is_team_account BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- DEPOTS
CREATE TABLE depots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) NOT NULL,
  name TEXT NOT NULL, address TEXT,
  lat DOUBLE PRECISION, lng DOUBLE PRECISION,
  radius_miles INTEGER DEFAULT 15, created_at TIMESTAMPTZ DEFAULT now()
);

-- QUOTES
CREATE TABLE quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) NOT NULL,
  fitter_id UUID REFERENCES users(id),
  customer_name TEXT NOT NULL, customer_mobile TEXT NOT NULL, number_plate TEXT NOT NULL,
  vehicle_info JSONB, job_type TEXT NOT NULL CHECK (job_type IN ('replace','repair','fit_only','rotation')),
  tyres JSONB NOT NULL, lwn_status TEXT DEFAULT 'has_key',
  add_ons JSONB DEFAULT '{"balancing":true,"newValves":true,"disposal":true,"alignment":false}',
  fitter_price DECIMAL(10,2) NOT NULL, booking_fee DECIMAL(10,2) DEFAULT 5.95,
  customer_total DECIMAL(10,2) NOT NULL, -- fitter_price + 5.95
  is_emergency BOOLEAN DEFAULT false, is_cover_quote BOOLEAN DEFAULT false,
  notes TEXT, assigned_to UUID REFERENCES users(id),
  booking_date DATE, booking_time TEXT,
  sent_via TEXT CHECK (sent_via IN ('sms','whatsapp')),
  status TEXT DEFAULT 'sent' CHECK (status IN ('draft','sent','opened','deposit_paid','expired','declined')),
  sent_at TIMESTAMPTZ, opened_at TIMESTAMPTZ, paid_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ, created_at TIMESTAMPTZ DEFAULT now()
);

-- JOBS
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_id UUID REFERENCES quotes(id),
  business_id UUID REFERENCES businesses(id) NOT NULL,
  fitter_id UUID REFERENCES users(id) NOT NULL,
  customer_name TEXT NOT NULL, customer_mobile TEXT NOT NULL, number_plate TEXT NOT NULL,
  vehicle_info JSONB, job_type TEXT NOT NULL, tyres JSONB NOT NULL,
  lwn_status TEXT, add_ons JSONB,
  location TEXT, gps_lat DOUBLE PRECISION, gps_lng DOUBLE PRECISION,
  before_photos JSONB, after_photos JSONB,
  customer_signed BOOLEAN DEFAULT false, signature_url TEXT,
  payment_method TEXT CHECK (payment_method IN ('qr','tap','cash','own_terminal','invoice')),
  payment_amount DECIMAL(10,2), stripe_payment_id TEXT,
  is_cover_job BOOLEAN DEFAULT false,
  cover_request_id UUID,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled','en_route','arrived','in_progress','photos_complete','payment_pending','complete','cancelled')),
  eta_sent_at TIMESTAMPTZ, started_at TIMESTAMPTZ, arrived_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ, created_at TIMESTAMPTZ DEFAULT now()
);

-- EMERGENCY COVER
CREATE TABLE emergency_cover (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES jobs(id) NOT NULL,
  business_id UUID REFERENCES businesses(id) NOT NULL,
  fitter_id UUID REFERENCES users(id) NOT NULL,
  customer_name TEXT NOT NULL, customer_mobile TEXT NOT NULL, number_plate TEXT NOT NULL,
  vehicle_info JSONB, tyres_covered JSONB NOT NULL,
  cover_start TIMESTAMPTZ DEFAULT now(),
  cover_end TIMESTAMPTZ NOT NULL, -- +30 days
  cover_value DECIMAL(10,2) DEFAULT 300.00,
  status TEXT DEFAULT 'active' CHECK (status IN ('active','expired','claimed')),
  receipt_sms_sent_at TIMESTAMPTZ, review_request_sent_at TIMESTAMPTZ,
  expiry_warning_sent_at TIMESTAMPTZ, created_at TIMESTAMPTZ DEFAULT now()
);

-- COVER REQUESTS
CREATE TABLE cover_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cover_id UUID REFERENCES emergency_cover(id) NOT NULL,
  customer_name TEXT NOT NULL, customer_mobile TEXT NOT NULL, number_plate TEXT NOT NULL,
  location TEXT, gps_lat DOUBLE PRECISION, gps_lng DOUBLE PRECISION,
  issue TEXT NOT NULL, tyre_size TEXT, qty INTEGER DEFAULT 1,
  routed_to_fitter_id UUID REFERENCES users(id),
  routed_to_business_id UUID REFERENCES businesses(id),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','accepted','declined','completed','expired','network')),
  decline_reason TEXT, quote_amount DECIMAL(10,2), payment_id TEXT,
  accepted_at TIMESTAMPTZ, completed_at TIMESTAMPTZ, created_at TIMESTAMPTZ DEFAULT now()
);

-- WALLET TRANSACTIONS
CREATE TABLE wallet_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) NOT NULL,
  fitter_id UUID REFERENCES users(id) NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('job_payment','cover_payment','withdrawal','refund')),
  amount DECIMAL(10,2) NOT NULL, stripe_transfer_id TEXT,
  job_id UUID REFERENCES jobs(id), description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- STOCK
CREATE TABLE stock (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) NOT NULL,
  tyre_size TEXT NOT NULL, brand TEXT, model TEXT,
  qty INTEGER DEFAULT 0,
  location TEXT NOT NULL CHECK (location IN ('van','depot')),
  depot_id UUID REFERENCES depots(id),
  fitter_id UUID REFERENCES users(id),
  added_via TEXT DEFAULT 'manual', created_at TIMESTAMPTZ DEFAULT now()
);

-- INVOICES
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) NOT NULL,
  fitter_id UUID REFERENCES users(id),
  customer_name TEXT NOT NULL, customer_mobile TEXT NOT NULL,
  description TEXT NOT NULL, amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','paid','overdue')),
  due_date DATE, sent_at TIMESTAMPTZ, paid_at TIMESTAMPTZ, created_at TIMESTAMPTZ DEFAULT now()
);

-- REVIEWS
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) NOT NULL,
  job_id UUID REFERENCES jobs(id),
  customer_name TEXT, rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  review_text TEXT, gmb_review_id TEXT,
  response_text TEXT, responded_at TIMESTAMPTZ,
  request_sent_at TIMESTAMPTZ, created_at TIMESTAMPTZ DEFAULT now()
);

-- TEAM INVITES
CREATE TABLE team_invites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) NOT NULL,
  invited_by UUID REFERENCES users(id) NOT NULL,
  fitter_name TEXT, fitter_mobile TEXT NOT NULL,
  invite_token TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','accepted','expired')),
  sent_at TIMESTAMPTZ DEFAULT now(), accepted_at TIMESTAMPTZ, created_at TIMESTAMPTZ DEFAULT now()
);

-- DISPUTES
CREATE TABLE disputes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES jobs(id) NOT NULL,
  business_id UUID REFERENCES businesses(id) NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('customer_complaint','chargeback')),
  status TEXT DEFAULT 'open' CHECK (status IN ('open','won','lost','pending')),
  evidence_package JSONB, stripe_dispute_id TEXT,
  submitted_at TIMESTAMPTZ, resolved_at TIMESTAMPTZ, created_at TIMESTAMPTZ DEFAULT now()
);

-- NOTIFICATION PREFERENCES
CREATE TABLE notification_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) UNIQUE NOT NULL,
  emergency_sound BOOLEAN DEFAULT true, emergency_vibrate BOOLEAN DEFAULT true, emergency_lock_screen BOOLEAN DEFAULT true,
  booking_confirmed BOOLEAN DEFAULT true, booking_cancelled BOOLEAN DEFAULT true, deposit_received BOOLEAN DEFAULT true,
  new_review BOOLEAN DEFAULT true, review_reminder BOOLEAN DEFAULT true,
  cover_activation BOOLEAN DEFAULT true, cover_expiring BOOLEAN DEFAULT true, tyre_wear_alert BOOLEAN DEFAULT true,
  low_stock BOOLEAN DEFAULT true, depot_pickup_ready BOOLEAN DEFAULT true,
  daily_earnings_push BOOLEAN DEFAULT true, morning_briefing_push BOOLEAN DEFAULT true,
  weekly_summary_push BOOLEAN DEFAULT true, monthly_earnings_email BOOLEAN DEFAULT false,
  marketing_comms BOOLEAN DEFAULT false
);
```

---

## 4. API ENDPOINTS

### Auth
```
POST /auth/otp/send     POST /auth/otp/verify     POST /auth/google     GET /auth/me
```

### Quotes
```
POST /quotes     GET /quotes     GET /quotes/:id     PATCH /quotes/:id/status
POST /quotes/:id/send     POST /quotes/:id/remind
```

### Jobs
```
GET /jobs/today     GET /jobs/:id     POST /jobs     PATCH /jobs/:id/status
POST /jobs/:id/eta     POST /jobs/:id/photos     POST /jobs/:id/signature
POST /jobs/:id/payment     POST /jobs/:id/complete
```

### Cover
```
GET /cover/active     POST /cover/activate     GET /cover/requests
POST /cover/requests/:id/accept     POST /cover/requests/:id/decline     POST /cover/quote
```

### Wallet
```
GET /wallet/balance     GET /wallet/transactions     POST /wallet/withdraw
```

### Stock
```
GET /stock     POST /stock     PATCH /stock/:id     GET /stock/check/:size
```

### Route
```
GET /route/today     POST /route/optimise     POST /route/depot-stop
```

### Reviews
```
GET /reviews     POST /reviews/:id/respond
```

### Invoices
```
GET /invoices     POST /invoices     POST /invoices/:id/send     POST /invoices/:id/chase
```

### Team
```
GET /team     POST /team/invite     DELETE /team/:id     GET /team/performance
```

### Dispatcher (owner only)
```
GET /dispatcher/live     POST /dispatcher/assign
```

### Vehicle
```
GET /vehicle/:plate
```

---

## 5. AUTOMATED SMS SEQUENCES

### Quote Sent (immediate)
```
Hi {name}, here's your quote from {business_name}:
{qty}x {tyre_size} {job_type} — £{customer_total}
Pay £5.95 deposit now to secure your booking.
All bookings include 30 days emergency tyre cover — up to £300 repair or replace, nationwide.
Remaining £{fitter_price} due on the day.
tyre-fit.co/q/{plate}
```

### Quote Reminder (5 mins, auto)
```
Hi {name}, your slot with {business_name} for your {plate} is about to go.
Pay £5.95 now to lock it in. Includes 30 days free emergency tyre cover — up to £300 repair or replace, nationwide.
tyre-fit.co/q/{plate}
```

### ETA Text (auto on job start)
```
Hi {name}, {fitter_name} from {business_name} is on the way. ETA: ~{mins} minutes.
```

### Post-Job Receipt + Cover (immediate on complete)
```
Hi {name}, thanks for choosing {business_name}!
{qty}x {tyre_size} {brand} fitted
Your 30-day tyre cover is now ACTIVE
View your condition report & cover details: tyre-fit.co/r/{plate}
See what's included: tyre-fit.co/cover-tour
Need help? Call 0330 633 1247
---
Know someone who needs tyres? They get 10% off: tyre-fit.co/r/{business_slug}/{customer_slug}
```

### Review Request (2 hours after complete)
```
Hi {name}, how was your experience with {business_name} today?
30 seconds, helps other drivers: {gmb_review_link}
```

### Cover Expiry Warning (day 27)
```
Hi {name}, your 30-day tyre cover from {business_name} expires in 3 days.
Questions? Call 0330 633 1247
```

---

## 6. PAYMENT FLOW

1. Fitter enters price (e.g. £100)
2. System adds £5.95 → customer sees **£105.95**
3. Customer pays **£5.95 deposit** via Stripe → goes to TYRE-FIT
4. On the day, fitter collects **£100** via QR / Tap to Pay / Cash / Card machine / Invoice
5. Digital payments: 1.5% + 20p Stripe fee, rest → wallet. Cash: no fee, logged only.

**SMS preview popup on every send.** Fitter sees exactly what customer gets.

---

## 7. COVER SYSTEM

- Activates **immediately** on job complete — no customer action
- 30 days, nationwide
- Covers: flat repair, replacement, LWN removal, 24/7 safe tow
- Routes to original fitter first, then network
- TYRE-FIT pays fitter for cover jobs
- Cover jobs: no customer payment collection (unless over limit), review request still sent, no new cover on cover jobs

### Auto-approval price limits (BACKEND ONLY — not shown to fitter)
| Job type | Auto-approved up to | Over limit |
|----------|-------------------|------------|
| Repair (puncture, flat) | £85 | Quote REJECTED — fitter must revise |
| Replacement (new tyre) | £200 | Quote REJECTED — fitter must revise |
| Safe tow (+ repair/replace) | £100 | Quote REJECTED — fitter must revise |
| **Maximum per claim** | **£300** | Quote REJECTED |

**Safe tow rules:**
- Safe tow is NEVER standalone. Always paired with repair or replacement.
- Happens when customer is in unsafe location (hard shoulder, busy road).
- Fitter tows to safe location, THEN repairs/replaces.
- Tow fee (up to £100) is IN ADDITION to repair/replacement, but total ≤ £300.
- If fitter can't repair/replace, they must decline — no tow-only jobs.

**Fitter UX (they never see limits):**
1. Fitter enters price → "Is this your best price?" nudge always shown
2. Taps "Send Quote to TYRE-FIT" → picks route position
3. Spinner: "Sending to TYRE-FIT..." (2-3 seconds)
4. If within limit → ✅ "Quote Approved — £XX confirmed" → auto-navigates to en-route
5. If over limit → ❌ "Quote Too High" → fitter can "Revise Price" or "Decline Job"

Fitter never sees actual limits — just knows the price was too high.

---

## 8. NAVIGATION MAP

See **tyre-fit-v3-flow-map.md** for the complete tap-by-tap flow map with all 49 screens.

### Key flows summary:

```
ONBOARDING: signin → welcome → business-setup → link-gmb → setup-final → setup-complete → dashboard
NORMAL JOB: dashboard → job-enroute → job-before-photo → job-after-photo → job-payment → job-complete
COVER JOB:  emergency alert → cover-quote → "Send Quote & Go" → job-enroute → same photo flow → cover-job-complete
QUICK QUOTE: quick-quote → quote-sent → dashboard
DETAILED:   quote-customer → quote-schedule → quote-job → quote-stock → quote-review → quote-sent
```

### Dashboard grid (3x2):
```
Invoices  | My Stock  | Reviews
Bookings  | Disputes  | Customers
```

### Bottom nav:
```
Home | Quote | Wallet | Route | Account
```

## 8.5 WEATHER ALERTS

Dashboard shows a weather card when rain, snow, ice, or strong wind is forecast during the fitter's working hours.

**Data source:** OpenWeather API (free tier: 1,000 calls/day) or Met Office DataPoint API (free for UK).

**Logic:**
- Check forecast at 6am for today's working hours (from business settings)
- If rain/snow/ice/wind during any scheduled job window → show alert on dashboard
- Alert shows: condition, time window, affected jobs count
- Example: "Rain forecast 2–5pm — 2 outdoor jobs in that window"

**Why it matters:** Fitter can reschedule outdoor jobs, warn customers, or plan around it. Nobody else in this market does this.

**Database:** No new table needed. Fetched on dashboard load, cached for 1 hour.

**API:**
```
GET /weather/today — Returns forecast for fitter's depot location during business hours
```

---

## 8.6 MILEAGE TRACKER

GPS-based automatic mileage tracking. Every job-to-job journey is logged. Dashboard shows today/week/month with HMRC tax relief calculation.

**Dashboard card:**
- Today: {X} miles
- Tap to expand: today / this week / this month
- HMRC rate: 45p/mile (first 10,000 miles), 25p/mile after
- Shows claimable amount: "£{amount} claimable"
- "Export for Accountant" button → downloads CSV

**Database:**
```sql
CREATE TABLE mileage_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) NOT NULL,
  business_id UUID REFERENCES businesses(id) NOT NULL,
  job_id UUID REFERENCES jobs(id),
  start_lat DOUBLE PRECISION, start_lng DOUBLE PRECISION,
  end_lat DOUBLE PRECISION, end_lng DOUBLE PRECISION,
  distance_miles DECIMAL(8,2) NOT NULL,
  start_address TEXT, end_address TEXT,
  logged_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);
```

**API:**
```
GET /mileage/today           — Today's total + breakdown per job
GET /mileage/summary         — Week/month/year totals + HMRC calculation
GET /mileage/export?period=  — CSV download (today/week/month/year/custom)
```

**How it works:**
1. When fitter taps "Start Job" → log start GPS
2. When fitter arrives (GPS geofence) → log end GPS
3. Calculate distance via Google Routes API (actual road distance, not straight line)
4. Accumulate daily/weekly/monthly
5. Apply HMRC rates: 45p for first 10k miles/year, 25p after

**Export format (CSV):**
```
Date, From, To, Job, Customer, Distance (miles), HMRC Rate, Claimable
12/02/2026, E1 4QJ, E2 8PQ, #001, Emma Davis, 4.2, £0.45, £1.89
```

---

## 8.7 ACCOUNTING SOFTWARE INTEGRATION

Settings screen with three integrations: Xero, QuickBooks, FreeAgent. All three are the most popular with UK sole traders and small businesses.

**What syncs automatically:**
- Completed jobs → sales invoices/income
- Customer payments → payment receipts
- Mileage → expense claims (HMRC 45p/mile)
- Stock purchases → expenses
- Wallet withdrawals → bank transfers

**Integration approach:**
- Xero: OAuth2 via Xero Partner Programme. Use `xero-node` SDK.
- QuickBooks: OAuth2 via Intuit Developer. Use QuickBooks Online API.
- FreeAgent: OAuth2 via FreeAgent API.

**Fallback:** "Export CSV" button always available. Downloads all jobs, invoices, payments, and mileage for any period. Fitter can email this to their accountant or import manually.

**Settings screen shows:**
- Each integration with Connect/Disconnect button
- Status: Connected / Coming Soon / Planned
- Last sync timestamp
- "What gets synced" expandable section
- CSV export as always-available alternative

**API:**
```
GET  /accounting/status              — Connection status for all integrations
POST /accounting/connect/:provider   — OAuth2 flow (xero/quickbooks/freeagent)
POST /accounting/disconnect/:provider
POST /accounting/sync/:provider      — Manual sync trigger
GET  /accounting/export?period=      — CSV export
```

---

## 8.8 EMERGENCY COVER JOB NOTIFICATIONS

Critical path — this is how fitters get paid cover jobs. Must work like an incoming phone call.

**Fitter psychology (in priority order):**
1. "Can I make money on this?" → Show estimated earnings FIRST and BIGGEST
2. "How far away is it?" → Show distance + drive time prominently
3. "Will it mess up my day?" → Route update options come on the quote screen
4. "Do I have the right tyre?" → Stock status shown but last — least concern

**Alert design:**
- Full-screen takeover, pulsing red header
- BIG earnings estimate front and centre: "You could earn £75 — 200"
- Three side-by-side boxes: distance | drive time | stock status (on van / depot)
- Job details below: customer, vehicle, issue, location
- Verified badges: "Called in" "Photo sent" "Cover verified"
- "Accept & Quote →" button is 2x wider than decline — default action is accept

**Flow:**
1. Covered customer has a blowout / flat / emergency
2. Customer calls TYRE-FIT helpline (0330 633 1247) OR taps "I need help" in their cover page
3. System finds nearest available fitter with matching tyre size on van (or nearest depot)
4. Fitter receives HIGH PRIORITY push notification via Firebase FCM
5. Notification triggers: sound, vibrate, full-screen intent (Android), critical alert (iOS)
6. Fitter sees full-screen overlay with earnings, distance, stock, job details
7. Fitter taps Accept → cover quote screen → "Is this your best price?" → approval spinner → en-route
8. Fitter taps Can't Do It → reason picker → system immediately finds next nearest fitter
9. If no response in 90 seconds → auto-decline, move to next fitter

**Push notification config (Firebase FCM):**
- Android: dedicated notification channel "cover_jobs" with importance HIGH and custom sound
- iOS: critical alert entitlement (emergency roadside assistance qualifies)
- Timeout: 90 seconds, server tracks offers, auto-decline if no response

**API:**
```
POST /cover-jobs/offer         — System offers job to fitter (triggers push)
POST /cover-jobs/:id/accept    — Fitter accepts
POST /cover-jobs/:id/decline   — Fitter declines (or auto-declined after timeout)
GET  /cover-jobs/active        — Fitter's current cover job offers
```

---

## 8.9 JOB CANCELLATION

Every active job screen (en-route, before-photos, condition check, cover-complete) has a "Problem with this job?" link that opens a cancellation modal.

**Reasons:**
- Wrong tyre / no stock
- Customer cancelled
- Unsafe location
- Vehicle issue / can't access
- Other reason

**On cancel:** Reason logged, customer notified via SMS, job freed, fitter returns to dashboard.

**API:**
```
POST /jobs/:id/cancel  — body: { reason, fitter_notes }
```

---

## 8.9b COVER QUOTE APPROVAL ANIMATION

When a fitter submits a cover job quote, TYRE-FIT verifies the price against cover limits before approving.

**Flow (3 states):**
1. **Sending** — Full-screen dark overlay, spinning loader, "Sending to TYRE-FIT..." text. Auto-advances after ~2.5s.
2. **Approved** — Green checkmark, "Quote Approved", shows confirmed price, "Head to the customer. Payment hits your wallet once verified." Auto-navigates to job-enroute after 2s.
3. **Rejected** — Red X, "Quote Too High", explanation that it exceeds cover limit. Two buttons: "Revise Price" (back to quote) or "Decline Job" (back to dashboard).

**Approval logic (server-side in production):**
- Compare quote price against cover limits: Replacement £200, Repair £85, Safe tow £100, Locking wheel nut £50
- Max claim cap: £300 per incident
- If quote ≤ applicable limit → approved
- If quote > limit → rejected with explanation

**State:** `coverApprovalPhase` — idle | sending | approved | rejected

**API:**
```
POST /cover-jobs/:id/submit-quote  — body: { price, fitter_notes }
Response: { approved: boolean, reason?: string, limit: number }
```

---

## 8.9c JOB TIMER BADGE

Active job screens show a running timer badge showing how long the fitter has been on the job. Ticks every second, displays as "M:SS on job" in a pill-shaped badge. Starts when fitter taps "Arrived" and stops when job is completed or cancelled. Used for operational tracking and dispute evidence.

---

## 8.10 DEPOT PICKUP — TWO-STOP NAVIGATION

When a job has `stockOnVan: false`, the en-route screen shows two stops:
1. **Depot pickup** — orange card, numbered "1", with depot address and "Navigate to Depot" button
2. **Customer** — numbered "2", shown below

In production, the fitter confirms depot collection before navigating to customer.

---

## 8.11 UNPAID DEPOSIT HANDLING

When a booking has `depositPaid: false`:
- "Start Job" button is replaced with "Send Reminder" and "Cancel Booking" buttons
- Fitter can send payment reminder SMS to customer
- Fitter can cancel the booking if deposit isn't paid

**API:**
```
POST /bookings/:id/remind   — Send payment reminder SMS
POST /bookings/:id/cancel   — Cancel unpaid booking
```

---

## 8.12 COVER PRICING DATABASE

Every cover job quote is stored for pricing intelligence.

**Schema:**
```
cover_quotes:
  - fitter_id, quote_amount, job_type, tyre_size, tyre_brand
  - location_postcode, timestamp
  - was_approved, was_revised, final_amount
```

**Intelligence:**
- Regional average price per job type per tyre size
- Fitters >20% above average flagged
- Competitive fitters get more cover jobs routed to them
- Monthly pricing report to fitters

**API:**
```
POST /cover-quotes                    — Record fitter's quote
GET  /cover-quotes/analytics          — Admin pricing dashboard
GET  /cover-quotes/fitter/:id/stats   — Fitter's pricing vs average
GET  /cover-quotes/regional/:postcode — Regional price benchmarks
```

---

## 8.13 COVER JOB — NO FAULT FOUND

If fitter arrives at a cover job and finds no actual fault:
- Fitter taps "No fault found (£50 call-out)" on the work confirmation screen
- Customer is charged £50 call-out fee
- £50 goes to fitter for their time
- Prevents false claims and time-wasters

---

## 8.14 COVER JOB — WORK CONFIRMATION

Before submitting a cover claim, fitter must confirm:
1. "Confirm Work Complete" screen shows: work performed, tyre size, fitter's quote
2. Fitter taps "Tyre Fitted — Submit Claim"
3. THEN the verification spinner runs
4. This proves the fitter explicitly confirmed work was done

---

## 8.15 CUSTOMER LIST EXPORT

Fitters own their customer data. Downloadable CSV from Account screen.

**Export:** Name, Phone, Plate, Vehicle, Last Job Date, Tyre Size, Cover Status, Cover Expires, Email

**API:**
```
GET /customers/export?format=csv  — Download full customer list as CSV
```

GDPR Article 20 — data portability right.

---

## 8.10 CUSTOMER COVER CLAIM FLOW (customer side — web pages, not fitter app)

This is what the CUSTOMER experiences when they have a blowout. The fitter never sees this — it happens before the fitter gets the alert.

**Flow:**
1. Customer has a flat / blowout / tyre emergency
2. Customer either:
   - Calls 0330 633 1247 (TYRE-FIT helpline) → agent texts them the magic link, OR
   - Opens their cover page (tyre-fit.co/cover/{plate}) → taps "I Need Help"
3. Customer receives SMS with magic link: `tyre-fit.co/claim/{claim_id}`
4. Magic link page asks customer to:
   - Confirm their vehicle (plate, shown from database)
   - Take a photo of the damaged tyre (camera opens)
   - Describe what happened (dropdown: flat, blowout, puncture, damage)
5. AI checks the photo:
   - Is this a covered tyre? (matches size/brand/position from condition report)
   - Is this a covered vehicle? (plate matches database)
   - Is the tyre illegal? (visible tread check from photo — final check done by fitter on arrival)
6. **If pre-check passes:** "Help is on the way" screen. System finds nearest fitter.
7. **If tyre looks illegal from photo:** Customer warned: "Your tyre appears to have very low tread. If the fitter confirms it's below 1.6mm, the cover claim will be declined. You can still have the fitter replace it and pay directly." Customer can proceed or cancel.
8. **If not a covered tyre/vehicle:** "This tyre isn't covered under your plan. Call us on 0330 633 1247 to discuss options."

**Customer claim page shows:**
- Cover status (active / expired / claim in progress)
- Fitter name, ETA, and live location once dispatched
- Claim reference number
- What's covered (up to £300 repair or replace)
- What's NOT covered (illegal tyres, cosmetic damage, theft)
- 0330 helpline number

**API:**
```
POST /claims/start           — Customer starts a claim
POST /claims/:id/photo       — Customer uploads damaged tyre photo
GET  /claims/:id/status      — Customer checks claim status
POST /claims/:id/cancel      — Customer cancels claim
```

---

## 8.11 FITTER CASCADING DISPATCH (how the system finds a fitter)

When a cover claim is verified, the system needs to find the right fitter. Priority order:

1. **Original fitter first** — the fitter who fitted the tyres gets first offer. They know the car, they have the relationship. This is the "fit the tyre once, keep the customer for life" promise.
2. **If original fitter declines or no response in 90 seconds** → offer to next nearest available fitter who:
   - Has the right tyre size on van (or nearest depot)
   - Is within coverage radius
   - Has availability toggled ON for emergency callouts
   - Is not currently mid-job
3. **If no fitter available in 15-mile radius** → expand to 25 miles
4. **If still no fitter** → customer informed: "We're finding someone for you. A TYRE-FIT agent will call you within 10 minutes."

**Database query for dispatch:**
```sql
SELECT f.id, f.name, f.location,
  ST_Distance(f.location, claim.location) as distance,
  EXISTS(SELECT 1 FROM stock s WHERE s.fitter_id = f.id AND s.size = claim.tyre_size AND s.qty > 0) as has_stock
FROM fitters f
WHERE f.availability_emergency = true
  AND f.status = 'available'
  AND ST_Distance(f.location, claim.location) < f.coverage_radius
ORDER BY
  CASE WHEN f.id = claim.original_fitter_id THEN 0 ELSE 1 END,  -- original fitter first
  has_stock DESC,  -- prefer fitters with stock on van
  distance ASC     -- then closest
LIMIT 5;
```

---

## 8.12 CUSTOMER REFERRAL WEB PAGE

When a customer shares their referral link (from post-job SMS), the referred person lands on:

**URL:** `tyre-fit.co/r/{fitter-slug}`

**Page shows:**
- Fitter's business name and logo
- Star rating from Google reviews
- "{Name} recommended {business_name}"
- "Every booking includes 30 days free emergency tyre cover — up to £300 repair or replace, nationwide"
- "Enter your reg plate to get a quote" → plate input → DVLA lookup → shows vehicle
- "Get Quote" button → takes them into the quote request flow
- Trust badges: Google reviews, cover backed by TYRE-FIT

**No discount needed.** The 30-day free cover (worth up to £300) is the referral incentive. That's already more compelling than any percentage off.

**The fitter gets:** a new customer lead with pre-filled vehicle data, attributed to the referrer.
**The referrer gets:** their friend covered. The fitter gets another loyal customer.

---

## 8.13 STRIPE CONNECT — WALLET & IDENTITY VERIFICATION

Fitters need a wallet to receive card/QR payments. This uses **Stripe Connect Express**.

### Where it sits in the flow (no friction)

```
SIGN IN → WELCOME TOUR → "Try Practice Mode First" (optional)
                        → "Set Up My Business"
                              ↓
BUSINESS SETUP (name, services, pricing, hours)
                              ↓
LINK GOOGLE (optional, can skip)
                              ↓
PERMISSIONS & TERMS (location, camera, GDPR)
                              ↓
SETUP COMPLETE → DASHBOARD
                              ↓
         Fitter uses app: creates quotes, does jobs, collects cash
                              ↓
         FIRST TIME fitter tries to collect a card/QR payment
         OR first time they try to withdraw from wallet:
                              ↓
         "To accept card payments, we need to set up your wallet"
         → Redirects to Stripe Connect Express (hosted by Stripe)
         → Stripe asks: name, DOB, address, bank details
         → Done. Back to app. Wallet active.
                              ↓
         IF Stripe needs more verification later (usually around £2k payouts):
         → In-app prompt: "Stripe needs to verify your identity"
         → Fitter uploads driving licence or passport (inside Stripe's flow)
         → Takes 2 minutes. Done.
```

**Key principle:** The fitter can sign up, explore, do practice mode, create quotes, and collect CASH payments without ever touching Stripe. KYC only triggers when they actually need card payments or wallet withdrawals. Zero friction on sign-up.

**What Stripe handles (not us):**
- Identity verification (name, DOB, address)
- Bank account validation
- Photo ID when required (driving licence or passport)
- PCI compliance for card processing
- Payouts to fitter's bank account

**What we handle:**
- Triggering Stripe onboarding at the right moment
- Showing wallet balance in the app
- Processing withdrawal requests via Stripe Transfers API

**API:**
```
POST /stripe/connect/create    — Create Stripe Connect account for fitter
GET  /stripe/connect/link      — Get hosted onboarding URL
POST /stripe/connect/callback  — Handle return from Stripe onboarding
GET  /stripe/connect/status    — Check if account is verified and active
POST /stripe/transfers/payout  — Wallet → fitter's bank account
```

---


## 9. PROTOTYPE HANDOFF GUIDE

### What the prototype IS
A fully interactive React artifact (tyre-fit-v3-app.jsx, 7,453 lines) showing every screen, every flow, every button in the app. It runs in a browser. All navigation works. All flows are complete end-to-end. Includes both the **fitter app** and **customer-facing PWA screens** in one file (toggle via "Customer View" pill on dashboard).

### What the prototype is NOT
A production app. There is no backend connected. Actions that would normally call an API (send SMS, save to database, take photo, open maps) show a green toast confirmation instead.

### Files in this handoff

| File | Purpose |
|------|---------|
| **tyre-fit-v3-app.jsx** | Interactive prototype — open in Claude artifact or any React sandbox |
| **tyre-fit-v3-spec.md** | This file — full technical spec for production build |
| **tyre-fit-v3-flow-map.md** | Every screen, every tap, every transition documented |
| **tyre-fit-v3-cover-system-logic.md** | Cover system rules, limits, claim logic, cascading dispatch |

### Architecture note — customer screens
The prototype includes customer-facing PWA screens inside the main file for demo purposes. In production, these are **separate web pages** hosted on Vercel (tyre-fit.co/*), NOT part of the Flutter app. The customer never downloads anything — every touchpoint is a magic link via SMS.

### Key prototype features added 12-13 Feb 2026
- **Emergency cover job alert** — full-screen takeover when cover job arrives, earnings-first design
- **Cover quote approval animation** — sending/approved/rejected states with auto-navigation
- **Job timer badge** — running clock on all active job screens
- **Cancel job modal** — reason picker on all active job screens
- **Customer PWA screens** — booking, cover terms, cover dashboard, claim flow (upload → checking → approved/denied)
- **Empty states + skeleton loaders** — consistent loading UX across all list screens
- **Screen transitions** — fade-in animation between all screens

### Toast messages → production replacements

The prototype has 74 toast messages. Each maps to a real action:

| Toast pattern | Production replacement |
|--------------|----------------------|
| "Opening Google Maps..." | `Linking.openURL()` or `url_launcher` in Flutter |
| "Calling customer..." | `Linking.openURL('tel:...')` |
| "Opening WhatsApp..." | `Linking.openURL('whatsapp://...')` |
| "Quote sent" / "Invoice sent" | Twilio SMS API call |
| "Photo captured" | Flutter camera plugin |
| "Evidence report PDF saved" | Generate PDF with `pdf` package, save to R2 |
| "Settings saved" / "Profile updated" | Supabase upsert to user/business table |
| "Payment collected" | Stripe Connect payment confirmation |
| "Stock list downloaded" | Generate CSV/PDF export |
| "Connecting..." | OAuth flow for Google Calendar / Apple Calendar |

### Screen-to-endpoint mapping

Every screen in the prototype maps to specific API endpoints documented in section 4. Key mappings:

| Screen | Primary endpoints |
|--------|------------------|
| signin | POST /auth/otp/send, POST /auth/otp/verify |
| business-setup | POST /businesses, PUT /businesses/:id |
| quick-quote | POST /quotes, POST /sms/send |
| job-enroute | PUT /jobs/:id/status, POST /sms/send (ETA) |
| job-before-photo | POST /photos/upload (R2) |
| job-after-photo | POST /condition-reports, POST /ai/tyre-scan |
| job-payment | POST /stripe/payment-intents, PUT /jobs/:id/complete |
| job-complete | POST /cover/activate, POST /sms/send (receipt + review) |
| cover-quote | POST /cover/claims/:id/quote |
| cover-job-complete | POST /cover/claims/:id/verify, POST /stripe/transfers |
| wallet | GET /wallet/balance, GET /wallet/transactions |
| wallet-withdraw | POST /stripe/transfers/payout |
| stock | GET /stock, PUT /stock/:id |
| invoices | GET /invoices, POST /invoices |
| disputes | GET /jobs/:id/evidence-pack |
| dispatcher | GET /team/live-status |

### Development phases

**Phase 1:** Auth, database schema, onboarding flow, dashboard, theme system (dark mode, font sizes)
**Phase 2:** Quote flows (quick + detailed), job flow (en-route → photos → payment → complete), Twilio SMS
**Phase 3:** Cover system, condition reports, evidence/disputes, GMB reviews, stock management, customer web pages
**Phase 4:** Dispatcher/team, route optimisation, invoicing, accounting integrations, mileage tracker, weather alerts, notifications, offline mode

---

## 10. LEGAL

- **TYRE-FIT Ltd** — England & Wales
- **Helpline:** 0330 633 1247
- **Email:** support@tyre-fit.co.uk
- **GDPR:** Terms, Privacy, Data Processing consent required. Marketing optional.
- **Data:** Supabase EU. Fitter owns data. No reselling.

---

## 8.16 CUSTOMER-FACING SCREENS (PWA via magic links)

The customer NEVER downloads an app. Every touchpoint is a web page delivered via SMS magic link — tap and you're in, no login, no password, no app store.

**Magic link URLs (each unique + authenticated):**
- `tyre-fit.co/q/{ref}` — Quote & booking page
- `tyre-fit.co/cover/{plate}` — Cover dashboard (days left, condition report, claim button)
- `tyre-fit.co/claim/{claim_id}` — Claim page (upload photos, verification, result)
- `tyre-fit.co/cover-terms` — Cover terms (public, no auth needed)
- `tyre-fit.co/receipt/{id}` — Job receipt
- `tyre-fit.co/review/{id}` — Google review redirect

**SMS sequence (customer receives):**
1. Quote text: "Hi [name], [fitter] has quoted £89.99 for 2x 205/55R16. Includes 30 days free tyre cover. Pay £5.95 to confirm: tyre-fit.co/q/AB12CDE"
2. Booking confirmed: "Booked! [fitter] will be with you [date] at [time]. Your cover is ACTIVE: tyre-fit.co/cover/ab12cde"
3. Fitter en route: "[fitter] is 12 mins away. Track: tyre-fit.co/track/ab12cde"
4. Job done: "All done! 2x Continental fitted. 30-day cover active. View condition report: tyre-fit.co/cover/ab12cde"
5. Review request (2hrs later): "How was [fitter]? Leave a quick review: g.page/dansmobiletyres/review"
6. Cover expiry (day 25): "Your tyre cover expires in 5 days. Book another service to renew: tyre-fit.co/book/ab12cde"

**Prototype screens (toggle via "Customer View" pill on dashboard):**

1. **Customer Booking** (`customer-booking`) — Quote review, cover summary, £5.95 Stripe payment, booking confirmation
2. **Cover Terms** (`customer-cover-terms`) — Full cover limits table, what's covered/not covered, how to claim, £50 call-out fee
3. **Cover Dashboard** (`customer-cover-dashboard`) — Days remaining countdown, cover limits, condition report, "I Need Help" claim button
4. **Cover Claim** (`customer-claim`) — Issue type picker, photo upload (damaged tyre + plate), verification spinner, approved/denied states

**Claim Flow States:**
- `upload` — Customer selects issue type (flat/blowout/locking wheel nut/tow), uploads 2 photos
- `checking` — Spinner while AI verifies against condition report (~2 min)
- `approved` — Green confirmation, "fitter on the way", 4-step "what happens next" tracker, shows cover payment amount
- `denied` — Red X with specific reason (e.g. "Illegal tyre at time of service — tread depth 1.4mm below 1.6mm legal minimum"). Offers option to still send a fitter at full customer cost with price estimate and checkbox consent

**Claim denial reasons (auto-detected by AI):**
- Tyre was already illegal at time of service (tread < 1.6mm in condition report)
- Damage pre-existed (visible in condition report photos)
- Cover expired
- Claim type not covered (e.g. cosmetic damage)

**Issue types:**
- Flat tyre / puncture → Repair limit £85
- Blowout / tyre damage → Replacement limit £200
- Locking wheel nut issue → £50 limit
- Need a tow (unsafe location) → Safe tow limit £100
- `denied` — Red denial, explains illegal tyre, offers full-price service with checkbox agreement

**Design:**
- Customer screens use a light theme (white background, green accents) — distinct from the fitter's dark theme
- Mobile-first, no navigation bar — these are web pages, not app screens
- Fitter/Customer toggle pill at top of dashboard for demo purposes

---

## 8.17 EMPTY STATES & LOADING (designer fixes)

The prototype includes shared components for consistent UX:

- `EmptyState` — icon, title, subtitle, optional action button. Used when dashboard has no jobs.
- `Skeleton` — animated shimmer placeholder for loading states
- `SkeletonCard` — full card-shaped skeleton with avatar + text lines

**Usage in production:** Every list screen should show EmptyState when empty, SkeletonCard while loading.
