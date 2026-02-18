# TYRE-FIT v3 — COMPLETE FLOW MAP
### Every screen, every tap, every transition. Verified against tyre-fit-v3-app.jsx.
> Updated: 12 February 2026 | 49 screens | 0 dead ends

---

## 1. ONBOARDING (first time only)

```
SIGN IN
  ├─ Name, mobile, email
  ├─ OTP verification (6 digits)
  └─ → WELCOME TOUR
```

### Welcome Tour (6 slides — all claims verified true)

| # | Slide | Claim | Verified |
|---|-------|-------|----------|
| 1 | Free to Use | Customer pays £5.95, fitter pays nothing | ✅ 33 code references |
| 2 | Free Cover | 30-day emergency cover on every job | ✅ 30 code references |
| 3 | Quote in 20 Seconds | Reg plate + price + send. DVLA lookup | ✅ Quick Quote screen |
| 4 | Route + Auto-ETA | Optimised route, auto ETA text to customer | ✅ Route + en-route screens |
| 5 | 5 Photos = 4 Jobs Done | Before/after photos build evidence + cover + monitoring | ✅ Photo + condition screens |
| 6 | Everything Runs Itself | Reviews, mileage, stock, disputes automated | ✅ All screens exist |

```
WELCOME TOUR
  ├─ Skip tour → BUSINESS SETUP
  ├─ "Set Up My Business" → BUSINESS SETUP
  └─ "Try Practice Mode" → PRACTICE MODE
```

### Business Setup → Dashboard

```
BUSINESS SETUP
  ├─ Business name, VAT, logo
  ├─ Depots (address + radius)
  ├─ Services, pricing, hours, team, availability
  └─ → LINK GOOGLE BUSINESS
         ├─ Connect GMB / Skip
         └─ → PERMISSIONS & TERMS
                  ├─ Location, camera, notifications, GDPR
                  └─ Accept → SETUP COMPLETE → DASHBOARD
```

---

## 2. DASHBOARD

```
DASHBOARD
  ├── [ALERT] Emergency cover job (full-screen takeover)
  ├── [ALERT] Stock needed for upcoming jobs
  ├── [MORNING] Weather alert
  ├── YOUR NEXT JOB card → "Start This Job" → EN ROUTE
  ├── QUICK ACTIONS: "New Quote" | "Today's Route"
  ├── TODAY'S QUOTES (pending / paid / expired)
  ├── MANAGE GRID (6 tiles, 3×2):
  │     Invoices  | My Stock  | Reviews
  │     Bookings  | Disputes  | Customers
  ├── WALLET + MILEAGE summary
  └── [EVENING] Overdue invoices nudge
```

**Bottom nav: Home | Quote | Wallet | Route | Account**

---

## 3. NORMAL JOB FLOW

The core loop. Fitter does this 3-6 times per day.

```
DASHBOARD → "Start This Job"
  │
  ▼
EN ROUTE
  ├─ Job timer starts (local ref, ticks independently)
  ├─ IF depot pickup needed: Show two-stop navigation
  │     Stop 1: Depot address + Navigate to Depot button
  │     Stop 2: Customer address (numbered "Then to Customer")
  ├─ Destination card with ETA
  ├─ Auto-ETA text sent confirmation
  ├─ "Navigate" button — opens Google Maps on tap only
  ├─ Contact: Call / Late / Lost buttons
  ├─ Fitter taps "I've Arrived" → "Take Before Photos" button appears
  ├─ "Problem with this job?" → cancel modal (reason picker)
  └─ → BEFORE PHOTOS (fitter taps through, no auto-advance)
         │
         ▼
BEFORE PHOTOS
  ├─ Photo each wheel position (FL, FR, RL, RR) + number plate
  ├─ "Scan All" for speed
  ├─ Skip option (with warning — reduces dispute protection)
  ├─ Fitter taps "Condition Report →" when all taken
  └─ → CONDITION REPORT (after photos)
         │
         ▼
CONDITION REPORT
  ├─ AI reads tyre size, brand, DOT from each photo
  ├─ "Scan All 4 Tyres" to scan quickly
  ├─ Fitter taps each tyre to confirm/edit:
  │     Tread: Good | Worn | Illegal
  │     Legal: Legal | Illegal
  │     Damage: minor (covered) | serious (excluded)
  │     Notes (optional)
  ├─ Cover status shown per tyre (Covered / Excluded)
  ├─ Fitter taps "All Legal — Collect Payment" or "Continue to Verification" (cover)
  └─ → PAYMENT (normal job) or COVER JOB COMPLETE (cover job)
         │
         ▼
PAYMENT
  ├─ Total due minus £5.95 deposit
  ├─ Methods: QR code | Tap to Pay | Cash | Bank transfer
  ├─ Customer signature (or skip)
  ├─ Before/after photo comparison
  ├─ "Confirm Payment" button
  └─ → JOB COMPLETE
         │
         ▼
JOB COMPLETE ✅
  ├─ Job timer stops — total time shown
  ├─ Amount earned + wallet balance
  ├─ "30-Day Cover — LIVE" popup
  ├─ "Review request scheduled (2 hours)"
  ├─ SMS preview (what customer receives)
  ├─ View condition report
  ├─ 5-second auto-advance to next job
  └─ → NEXT JOB (auto) | DASHBOARD | DAY SUMMARY
```

---

## 4. COVER JOB FLOW (emergency)

**Safe tow rule:** Tow is NEVER standalone. Always repair/replace + tow from unsafe location.
Fitter must decline if they can't repair/replace — no tow-only jobs.

```
FULL-SCREEN ALERT (fires on any screen, like incoming call)
  ├─ Pulsing red header: "EMERGENCY COVER JOB"
  ├─ #1 MONEY: "You could earn £75 — 200" (big, prominent, green)
  │     "Paid direct to your wallet by TYRE-FIT"
  ├─ #2 AT A GLANCE: Three boxes side by side:
  │     [2.4 miles away] [~22 min drive] [On van / Depot]
  ├─ #3 JOB DETAILS: Customer, vehicle, issue, location
  ├─ Customer verified badges: "Called in" "Photo sent" "Cover verified"
  ├─ "Can't Do It" → decline (reason) → next fitter gets it
  └─ "Accept & Quote →" → COVER QUOTE
         │
         ▼
COVER QUOTE
  ├─ Pre-filled: customer, vehicle, tyre size, location
  ├─ Enter your price (this goes to TYRE-FIT, not customer)
  ├─ ⚠️ "Is this your best price?" nudge (always shown)
  ├─ Auto stock check (van / depot / not in stock)
  ├─ "How cover payment works" info
  ├─ Route update: "Do this first" | "Slot in smartly" | "I'll sort it"
  ├─ "Send Quote for Approval"
  ├─ APPROVAL OVERLAY:
  │     → Spinner: "Sending to TYRE-FIT..." (2-3 seconds)
  │     → IF within limit: Green tick "Quote Approved — £XX confirmed" → EN ROUTE
  │     → IF over limit: Red X "Quote Too High" → "Revise Price" (back to quote) or "Decline Job" (dashboard)
  └─ Fitter never sees actual limits (backend handles silently)
         │
         ▼
  ... same flow: En Route → Before Photos → Condition Report → ...
         │
         ▼
COVER JOB COMPLETE
  ├─ STEP 1: "Confirm Work Complete"
  │     ├─ Shows work performed, tyre size, fitter's quote
  │     ├─ "Tyre Fitted — Submit Claim" button
  │     ├─ "No fault found (£50 call-out)" link
  │     └─ "Problem with this job?" cancel link
  │
  ├─ STEP 2: VERIFYING spinner (2s — checking condition report)
  │
  ├─ IF LEGAL → "Cover Claim Approved" ✅
  │     ├─ £amount to wallet within 24 hours
  │     ├─ System handles: receipt, review, claim closure, evidence
  │     ├─ Upsell prompt if other tyres need attention
  │     └─ → NEXT JOB | DASHBOARD
  │
  ├─ IF ILLEGAL (under 1.6mm) → "Cover Claim Declined" ❌
  │     ├─ Shows tread depth result
  │     ├─ Customer informed by TYRE-FIT
  │     ├─ "Collect Direct Payment" → payment method picker
  │     │     └─ QR | Tap | Cash | Transfer → "Job Done"
  │     └─ OR "Leave Without Fitting" → DASHBOARD
  │
  └─ IF NO FAULT FOUND → £50 call-out charge to customer → DASHBOARD
```

---

## 5. QUOTE FLOWS

### Quick Quote (bottom nav)
```
QUICK QUOTE — single screen
  ├─ Customer name (autocomplete from history)
  ├─ Mobile number
  ├─ Reg plate (DVLA auto-lookup)
  ├─ Job type: Replace | Repair | Fit Only | Rotation
  ├─ Tyre size + qty
  ├─ Stock check (auto)
  ├─ Locking wheel nuts
  ├─ Your price + add-ons + full breakdown
  ├─ SMS preview
  ├─ Send via WhatsApp or Text
  └─ → QUOTE SENT
```

### Detailed Quote (from quick quote header)
```
STEP 1: Customer → STEP 2: Schedule (if booking) → STEP 3: Job details
  → STEP 4: Stock → STEP 5: Review & Send → QUOTE SENT
```

### Quote Sent
```
QUOTE SENT
  ├─ "Waiting for deposit..." (normal quote)
  ├─ Auto-reminder at 5 minutes
  ├─ Manual reminder button
  └─ → DASHBOARD
```

---

## 6. MANAGE SCREENS (dashboard grid)

| Tile | Screen | What it does |
|------|--------|-------------|
| Invoices | invoices | Create, send, track. Overdue chase. WhatsApp/SMS send |
| My Stock | stock | Van stock, depot stock, transfers, reorder, depot pickup routing |
| Reviews | reviews | Google stars, respond to reviews, track response rate |
| Bookings | bookings | All jobs (upcoming + completed), calendar view, start any job |
| Disputes | disputes | Evidence packs per job, chargeback defence PDF, email to customer/bank |
| Customers | evidence-vault | All linked customers, search by plate/name, job history per customer |

---

## 7. ACCOUNT & SETTINGS

```
ACCOUNT
  ├─ Profile (name, mobile, email)
  ├─ Business Settings (name, logo, VAT, services, hours, pricing)
  ├─ Bank Details (wallet withdrawals)
  ├─ Notifications (21 toggles)
  ├─ Display & Accessibility (dark mode, font size, high contrast)
  ├─ Calendar Sync (Google/Apple)
  ├─ Accounting (Xero / QuickBooks / FreeAgent / CSV)
  ├─ Depots (add/edit/remove)
  ├─ Google Business Profile
  ├─ Invoice Settings
  ├─ Dispatcher (team view — owner only)
  ├─ Help & Support
  ├─ Terms & Privacy
  └─ Export / Delete Account (GDPR)
```

---

## 8. AUTOMATED ACTIONS (fitter does nothing)

| Action | Trigger | What happens |
|--------|---------|-------------|
| Cover activates | Job complete photos done | 30-day cover LIVE for customer |
| Review request | 2 hours after job | SMS to customer with Google review link |
| Condition report | After photo scan | Sent to customer with tyre health data |
| Evidence saved | Every job | GPS, photos, timestamps, payment details logged |
| Route updates | Job completes / new booking | Route recalculates automatically |
| Stock updates | Job uses tyres | Van stock count decremented |
| Mileage logs | GPS during jobs | HMRC 45p/mile tracked |
| Wallet updates | Customer pays / TYRE-FIT pays | Balance shown on dashboard |
| Cover expiry reminder | 3 days before cover expires | Auto-text to customer |
| Quote reminder | 5 mins after quote sent | Auto-text to customer |

---

## 9. SCREEN COUNT

**49 screens total. 0 dead ends. All connected.**

### By category:
- Onboarding: 6 (signin, welcome, business-setup, link-gmb, setup-final, setup-complete)
- Dashboard: 1
- Job flow: 6 (job-enroute, job-before-photo, job-after-photo, job-payment, job-complete, cover-job-complete)
- Quote flow: 7 (quick-quote, quote-customer, quote-schedule, quote-job, quote-stock, quote-review, quote-sent)
- Cover: 1 (cover-quote)
- Manage: 8 (invoices, invoice-create, stock, reviews, bookings, disputes, dispute-detail, evidence-vault)
- Money: 3 (wallet, wallet-withdraw, day-summary)
- Settings: 14 (account, settings-profile, settings-business, settings-notifications, settings-display, settings-help, settings-google, settings-bank, settings-depots, settings-invoices, settings-calendar, settings-accounting, settings-terms, dispatcher)
- Other: 3 (referral, practice-mode, route)

---

## 9. CUSTOMER JOURNEY (PWA — magic links, no app download)

**How it works:** Customer receives SMS with unique link. Tap = authenticated web page. No app store, no login, no password. Every page shows a URL bar in the prototype to make this clear.

### SMS Magic Links
```
tyre-fit.co/q/{ref}          → Quote & booking page
tyre-fit.co/cover/{plate}    → Cover dashboard  
tyre-fit.co/claim/{claim_id} → Claim upload page
tyre-fit.co/cover-terms      → Cover terms (public)
tyre-fit.co/receipt/{id}     → Job receipt
tyre-fit.co/review/{id}      → Google review redirect
tyre-fit.co/track/{ref}      → Live fitter tracking
tyre-fit.co/book/{plate}     → Re-book (cover renewal)
```

### Booking (from quote text)
```
CUSTOMER BOOKING PAGE (tyre-fit.co/q/{ref})
  ├─ Fitter name + "via TYRE-FIT" header
  ├─ Quote breakdown: vehicle, service, date, total price
  ├─ "Included FREE: 30-Day Emergency Cover" with 5 bullet points
  ├─ Link: "Read full cover terms →" → COVER TERMS
  ├─ Pay £5.95 section: checkbox agree + pay button
  ├─ Processing spinner (2s)
  └─ BOOKING CONFIRMED
        ├─ Date, time, vehicle, fitter summary
        ├─ "30-Day Emergency Cover — FREE" green card
        ├─ "You'll get a text when your fitter is on the way"
        └─ "View Your Cover" button → COVER DASHBOARD
```

### Cover Terms Page
```
COVER TERMS (tyre-fit.co/cover-terms)
  ├─ Cover limits table (replacement £200, repair £85, tow £100, LWN £50, max £300)
  ├─ What's covered (5 items)
  ├─ What's NOT covered (5 items — illegal tyres, pre-existing damage, etc.)
  ├─ How to claim (4 steps with numbered circles)
  └─ £50 call-out fee explanation
```

### Cover Dashboard
```
COVER DASHBOARD (tyre-fit.co/cover/{id})
  ├─ Green gradient header: "24 days left" with progress bar
  ├─ "I Need Help — Claim Now" red button → CLAIM PAGE
  ├─ Cover limits summary (4 rows)
  ├─ Service details (date, fitter, vehicle, tyres checked)
  ├─ Condition report (all 4 tyres with status)
  └─ Links: cover terms, helpline number
```

### Cover Claim
```
COVER CLAIM (tyre-fit.co/claim/{id})
  ├─ Step 1: "What happened?" — flat/blowout/LWN/tow picker
  ├─ Step 2: Upload 2 photos
  │     Photo 1: Damaged tyre (dashed upload box)
  │     Photo 2: Number plate (dashed upload box)
  ├─ Both uploaded → VERIFYING spinner (2-3s)
  │
  ├─ IF APPROVED:
  │     ├─ Green tick "Claim Approved"
  │     ├─ "A fitter is being contacted now"
  │     ├─ 4 next-steps checklist
  │     ├─ "Your cover pays: Up to £200"
  │     └─ Customer waits for fitter ETA text
  │
  └─ IF DENIED (illegal tyre):
        ├─ Red X "Claim Not Covered"
        ├─ Reason: "Illegal tyre at time of service" + tread depth
        ├─ "We can still help" — fitter at full price
        ├─ Estimated price range
        ├─ Checkbox: "I understand and agree to pay full price"
        └─ "Accept & Send Fitter" or "Cancel"
```

---

## CUSTOMER PWA SCREENS (web pages, not in Flutter app)

These are separate web pages accessed via SMS magic links. No app download, no login.

### Customer Booking (`customer-booking`)
**URL:** `tyre-fit.co/q/{ref}`
**Entry:** Customer taps link in quote SMS
**Shows:** Fitter details, quote breakdown, cover summary, £5.95 Stripe payment button
**Exits:**
- Pay £5.95 → booking confirmed, cover activated
- Back → closes browser

### Customer Cover Terms (`customer-cover-terms`)
**URL:** `tyre-fit.co/cover-terms`
**Entry:** Link from booking page or cover dashboard
**Shows:** Full T&Cs, what's covered (replacement £200, repair £85, tow £100, LWN £50), exclusions, how to claim, £50 call-out fee
**Exits:**
- Accept checkboxes → back to previous page

### Customer Cover Dashboard (`customer-cover-dashboard`)
**URL:** `tyre-fit.co/cover/{plate}`
**Entry:** Link in booking confirmation SMS or cover reminder SMS
**Shows:** Days remaining countdown + progress bar, cover limits, service details, condition report, "I Need Help — Claim Now" button
**Exits:**
- "I Need Help" → `customer-claim`
- "View full cover terms" → `customer-cover-terms`

### Customer Claim (`customer-claim`)
**URL:** `tyre-fit.co/claim/{claim_id}`
**Entry:** "I Need Help" from cover dashboard OR helpline generates link
**Flow:**
1. **Issue type** — Flat/Blowout/LWN/Tow (4 buttons)
2. **Photo upload** — Damaged tyre photo + number plate photo (2 dashed upload areas)
3. **Checking** — Spinner, "Verifying Your Claim", "checking against condition report"
4. **Approved** — Green check, "Claim Approved", 4-step "what happens next" tracker, cover payment amount
5. **Denied** — Red X, specific reason (e.g. illegal tyre), option to still send fitter at full cost with consent checkbox

### Cover Approval (fitter-side overlay)
**Entry:** Fitter taps "Send Quote for Approval" on cover-quote screen
**Flow:**
1. **Sending** — Dark overlay, spinner, "Sending to TYRE-FIT..."
2. **Approved** — Green check, confirmed price, auto-navigates to job-enroute
3. **Rejected** — Red X, "Quote Too High", revise or decline buttons

### Emergency Alert (fitter-side full-screen)
**Entry:** System pushes cover job to nearest fitter
**Shows:** Earnings estimate (biggest), distance + drive time + stock status, customer/vehicle/issue details, verified badges
**Exits:**
- "Accept & Quote →" → `cover-quote`
- "Can't Do It" → decline reason → next fitter gets it
- 90s timeout → auto-decline
