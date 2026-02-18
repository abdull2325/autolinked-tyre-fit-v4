# TYRE-FIT COVER SYSTEM — COMPLETE LOGIC

## THE PRODUCT
30 days emergency tyre cover, included FREE with every booking.
TYRE-FIT carries the risk. Customer pays nothing extra upfront.

---

## COVER LIMITS (shown in cover terms link)

| Service | TYRE-FIT pays up to | Customer pays |
|---------|-------------------|---------------|
| Repair (puncture, flat) | £85 | Anything over £85 |
| Replacement (new tyre) | £200 | Anything over £200 |
| Safe tow (from unsafe location) | £100 | Anything over £100 |
| Locking wheel nut removal | £50 | Anything over £50 |
| **Maximum per claim** | **£300** | **Everything above £300** |

**Safe tow example:** Customer on hard shoulder, fitter tows to safe spot (£80) then replaces tyre (£150). Total = £230. TYRE-FIT pays £230 (within £300 max). If total was £350, TYRE-FIT pays £300, customer pays £50.

---

## WHY THIS WORKS AS A BUSINESS

**TYRE-FIT carries the risk, but the risk is controlled:**

1. Fitter checked all 4 tyres at fitting — any tyre that was already illegal/damaged at time of fitting is EXCLUDED from cover
2. AI tread depth analysis from photos flags any existing issues
3. 30-day window limits exposure — most claims are genuine flats/punctures
4. "Is this your best price?" nudge + backend pricing database keeps fitter quotes competitive
5. £50 call-out charge if no fault found stops false claims
6. Illegal tyres at time of claim = DENIED + customer pays full price

**The 4 risk controls:**
- Pre-screening at fitting (condition report excludes bad tyres)
- AI verification at claim (customer photo vs fitting photos)
- Price benchmarking (fitter quote database spots overcharging)
- No-fault penalty (£50 call-out discourages abuse)

---

## CUSTOMER CLAIM FLOW (PWA via magic links — no app download)

**How customers interact:** Every customer touchpoint is a web page delivered via SMS magic link. No app store, no download, no login. Each link is unique and authenticated — tap and you're in.

**Magic link URLs:**
- `tyre-fit.co/q/{ref}` — Quote & booking page
- `tyre-fit.co/cover/{id}` — Cover dashboard (days remaining, condition report, claim button)
- `tyre-fit.co/claim/{claim_id}` — Claim upload page
- `tyre-fit.co/cover-terms` — Cover terms (public, no auth)
- `tyre-fit.co/receipt/{id}` — Job receipt
- `tyre-fit.co/review/{id}` — Google review prompt page

### Step 1: Customer calls 0330 or taps "I need help" on their cover page
- AI phone line answers (no hold music, no queue)
- OR customer taps "I Need Help — Claim Now" on their cover dashboard (tyre-fit.co/cover/{id})
- AI asks: "What's happened?" → flat / blowout / damage / locking wheel nut / need tow
- AI asks: "What's your registration?" → looks up the vehicle, checks cover is active

### Step 2: AI sends verification text
Customer receives SMS with link:
```
TYRE-FIT Cover Claim

Hi [name], we need a few things to process your claim:

1. Take a photo of the damaged tyre (where it is now)
2. Take a photo of your number plate

We'll check this against your last service to verify cover.

[Upload photos button]
```

### Step 3: AI verification (automatic)
System checks:
- Is this vehicle covered? (plate match)
- Is this tyre the one that was checked? (position match from fitting photos)
- Was this tyre LEGAL at time of fitting? (condition report check)
- Is the cover still within 30 days?

**If all checks pass:** → "Your claim is approved. A fitter is being contacted now."
**If tyre was illegal at fitting:** → DENIED (see Step 3b)
**If cover expired:** → "Your cover expired on [date]. You can book a new service to reactivate."
**If plate doesn't match:** → "We can't find this vehicle. Call us for help."

### Step 3b: ILLEGAL TYRE DENIAL
If the condition report from the original fitting shows the claimed tyre was illegal (tread below 1.6mm, serious damage):

SMS to customer:
```
Cover Claim Update

Hi [name], we've checked your claim against the condition report from your last service on [date].

The [position] tyre was recorded as ILLEGAL at time of fitting (tread depth: [X]mm). 
Tyres that are already below the legal limit are not covered under your emergency cover.

A fitter can still come to you, but you'll pay the full price for repair/replacement.

Estimated price: £[fitter quote]

[ ] I understand this is not covered and I agree to pay the full price.

[Accept & Send Fitter]  [Cancel]
```

### Step 4: Customer told the price (over-limit or full-price)
If the fitter's quote exceeds the cover limit, OR if the tyre was illegal:

SMS to customer:
```
TYRE-FIT Cover

A fitter is available near you.

Repair cost: £[fitter quote]
Your cover pays: £[cover amount]  
You pay: £[difference]

[ ] I agree to pay £[difference] for this service

[Confirm & Send Fitter]  [Cancel]
```

**If customer confirms:** Fitter gets the go-ahead, proceeds to job
**If customer cancels:** Job cancelled, fitter notified, no charge

### Step 5: Fitter dispatched
- Nearest fitter with matching stock gets emergency alert
- Fitter sees the alert, quotes, gets approved (within limit) or customer has pre-agreed to pay difference
- Fitter goes to customer

### Step 6: Fitter arrives — CRITICAL CHECK
**Fitter takes before photos of all 4 tyres (same as normal job)**

If fitter finds the tyre is ACTUALLY ILLEGAL (not what customer reported):
- Fitter marks tyre as illegal in condition check
- App flags: "This tyre is below legal limit. Cover claim DENIED."
- Customer is told on-screen/via text: "The tyre is illegal. Cover does not apply. Full price: £[XX]"
- Customer can: accept and pay full price, or decline and fitter leaves (£50 call-out charge applies)

### Step 7: £50 call-out charge (no fault found)
If fitter arrives and there's no actual fault (tyre is fine, customer was wrong):
- Fitter marks "No fault found" in app
- Customer is charged £50 call-out fee
- This prevents time-wasters and false claims
- The £50 goes to the fitter for their time

---

## FITTER QUOTE RECORDING & PRICING INTELLIGENCE

### Backend pricing database
Every cover job quote is stored:
```
cover_quotes table:
- fitter_id
- quote_amount
- job_type (repair / replacement / tow / lwn_removal)
- tyre_size
- tyre_brand
- location (postcode area)
- timestamp
- was_approved (boolean)
- was_revised (boolean — did fitter lower after rejection?)
- final_amount
```

### Pricing intelligence
- Build average price per job type per tyre size per region
- Flag fitters who consistently quote >20% above regional average
- "Is this your best price?" nudge shows for ALL fitters
- Fitters with competitive pricing get MORE cover jobs routed to them
- Fitters who are consistently overpriced get FEWER cover jobs
- Monthly pricing report to fitters: "Your average repair quote: £72. Regional average: £65."

### API endpoints
```
POST /cover-quotes                    — Record fitter's quote
GET  /cover-quotes/analytics          — Admin pricing dashboard  
GET  /cover-quotes/fitter/:id/stats   — Fitter's pricing vs average
GET  /cover-quotes/regional/:postcode — Regional price benchmarks
POST /cover-quotes/:id/flag           — Flag suspicious pricing
```

---

## FLOW SUMMARY

```
CUSTOMER HAS EMERGENCY
  │
  ├─ Calls 0330 (AI answers, no hold)
  │   AI: "What happened? What's your reg?"
  │
  ├─ AI sends verification text
  │   Customer uploads: damaged tyre photo + plate photo
  │
  ├─ AI checks:
  │   ├─ Vehicle covered? ✓
  │   ├─ Cover active (30 days)? ✓  
  │   ├─ Tyre was LEGAL at fitting? 
  │   │   ├─ YES → Claim approved → find fitter
  │   │   └─ NO → DENIED → "Tyre was illegal at fitting"
  │   │         → Customer can still get fitter at FULL PRICE
  │   │         → Must tick checkbox agreeing to pay full price
  │   │
  │   └─ Claim approved → nearest fitter gets alert
  │
  ├─ FITTER QUOTES
  │   ├─ Within limit → auto-approved (fitter sees spinner then ✓)
  │   ├─ Over limit → rejected → fitter revises or declines
  │   │   └─ OR: customer pre-approves paying the difference
  │   └─ Quote stored in pricing database
  │
  ├─ FITTER ARRIVES
  │   ├─ Takes before photos
  │   ├─ Checks all 4 tyres
  │   ├─ If tyre is ACTUALLY illegal:
  │   │   → Cover DENIED at this point
  │   │   → Customer pays full price or declines (£50 call-out)
  │   ├─ If no fault found:
  │   │   → £50 call-out charge to customer
  │   │   → £50 goes to fitter
  │   └─ If genuine claim:
  │       → Fitter does the work
  │       → Takes after photos
  │       → TYRE-FIT pays fitter
  │       → Customer pays nothing (or pays difference if over limit)
  │
  └─ POST-JOB
      ├─ Condition report stored
      ├─ NO new cover activated on cover jobs
      ├─ Review request still sent
      └─ Fitter quote added to pricing database
```

---

## WHAT NEEDS ADDING TO PROTOTYPE

1. **Fitter condition check → illegal tyre flag** — if fitter marks tyre as illegal during cover job, show "Claim denied" overlay with customer-pays-full-price flow
2. **No-fault-found option** — button on cover job: "No fault found" → £50 call-out
3. **Over-limit customer approval** — when quote > limit, show that customer has pre-agreed to pay difference (text sent before fitter dispatched)
4. **Cover terms link content** — the actual terms page showing all limits

## WHAT NEEDS ADDING TO SPEC

1. Cover quotes pricing database schema
2. Regional pricing benchmarks API
3. AI phone line integration (Twilio + AI)
4. Customer verification text flow
5. Illegal tyre denial SMS templates
6. £50 call-out charge logic
7. Fitter pricing score (competitive = more jobs)

---

## COVER QUOTE APPROVAL (fitter side)

When a fitter submits a cover job quote, the system verifies before approving:

**Check sequence:**
1. Is the quote within the applicable cover limit? (repair £85 / replacement £200 / tow £100 / LWN £50)
2. Is the quote within the £300 max claim cap?
3. Is the quote within range of the pricing database for this tyre size/brand?

**UX states:**
- `sending` — "Sending to TYRE-FIT..." spinner overlay (2.5s in prototype)
- `approved` — Green confirmation with price, auto-navigates to job-enroute
- `rejected` — Red X, "Quote Too High", option to revise price or decline

**In production:** This is a real API call to `POST /cover-jobs/:id/submit-quote`. The pricing database comparison happens server-side. Response time target: <3 seconds.

---

## CLAIM VERIFICATION (customer side)

When a customer submits a claim with photos:

**AI verification steps:**
1. Match number plate in photo to customer's registered vehicle
2. Compare tyre damage photo against condition report from time of fitting
3. Check tread depth — if tyre was already illegal at fitting, DENY
4. Check for pre-existing damage visible in fitting photos
5. Verify cover hasn't expired

**Denial reasons (with customer-facing messages):**
- Illegal tyre at service: "Your condition report from [date] shows [position] tyre had tread depth of [X]mm — below the 1.6mm legal minimum."
- Pre-existing damage: "Damage visible in your condition report photos from [date] appears to match current damage."
- Cover expired: "Your 30-day cover expired on [date]."
- Not covered: "Cosmetic damage is not covered under emergency tyre cover."

**On denial:** Customer is offered the option to still send a fitter at full cost. Must tick consent checkbox before proceeding.
