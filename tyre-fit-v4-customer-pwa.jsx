import { useState, useEffect } from "react";
import { CheckCircle, Shield, Clock, Camera, AlertTriangle, ChevronLeft, Phone, Upload, X, FileText, Zap, ArrowRight, Info, Star, MapPin, Lock, Car, Check, ChevronRight } from "lucide-react";

export default function CustomerPWA() {
  const [currentScreen, setCurrentScreen] = useState('customer-booking');
  const [previousScreens, setPreviousScreens] = useState([]);
  const [customerClaimStep, setCustomerClaimStep] = useState('select-issue');
  const [customerClaimPhotos, setCustomerClaimPhotos] = useState({ tyre: false, plate: false });
  const [claimIssueType, setClaimIssueType] = useState(null);
  const [toast, setToast] = useState(null);

  const navigateTo = function(screen) { setPreviousScreens([...previousScreens, currentScreen]); setCurrentScreen(screen); };
  const goBack = function() { if (previousScreens.length > 0) { setCurrentScreen(previousScreens[previousScreens.length - 1]); setPreviousScreens(previousScreens.slice(0, -1)); }};
  const showToast = function(msg) { setToast(msg); setTimeout(function() { setToast(null); }, 3000); };

  const signUpData = { businessName: "Dan's Mobile Tyres", fullName: 'Dan Smith', mobile: '07700 900000' };
  const quoteData = { price: '89.99', bookingDate: 'Tue 18 Feb', bookingTime: '10:30 AM', numberPlate: 'AB12 CDE', tyreSize: '205/55R16', tyreQty: 2, customerName: 'Sarah Johnson', customerMobile: '07700 123456' };

  const Card = function(props) {
    return <div style={{ backgroundColor: '#fff', borderRadius: '14px', padding: '16px', border: '1px solid #e5e7eb', marginBottom: '12px', cursor: props.onClick ? 'pointer' : 'default', ...(props.style || {}) }}>{props.children}</div>;
  };

  const Badge = function(props) {
    var colors = { info: { bg: '#2563EB15', text: '#2563EB' }, success: { bg: '#10b98115', text: '#10b981' }, warning: { bg: '#f59e0b15', text: '#f59e0b' }, danger: { bg: '#ef444415', text: '#ef4444' } };
    var c = colors[props.variant] || colors.info;
    return <span style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', backgroundColor: c.bg, color: c.text }}>{props.children}</span>;
  };

  const CustCard = Card;
  const CustBadge = Badge;
  const CustUrlBar = function(props) {
    return (
      <div style={{ padding: '8px 16px', backgroundColor: '#F0F2F5', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #e5e7eb' }}>
        <Lock size={12} color="#00C853" />
        <div style={{ flex: 1, padding: '6px 12px', backgroundColor: '#fff', borderRadius: '8px', fontSize: '12px', color: '#666', fontFamily: 'monospace' }}>{props.url}</div>
      </div>
    );
  };

  const Toast = function() {
    if (!toast) return null;
    return <div style={{ position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#10b981', color: '#fff', padding: '12px 24px', borderRadius: '12px', fontSize: '14px', fontWeight: '600', zIndex: 9999 }}>{toast}</div>;
  };

  const custTheme = {
    bg: '#FFFFFF', bgCard: '#F8F9FA', bgInput: '#F0F2F5',
    text: '#1A1A2E', textMuted: '#6B7280', primary: '#00C853',
    border: '#E5E7EB', danger: '#EF4444', warning: '#F59E0B', info: '#3B82F6'
  };

  const CustomerBookingScreen = () => {
    const [agreed, setAgreed] = useState(false);
    const [paying, setPaying] = useState(false);
    const [paid, setPaid] = useState(false);
    const fitterName = signUpData.businessName || "Dan's Mobile Tyres";
    const quotePrice = quoteData.price || '89.99';

    if (paid) {
      return (
        <div style={{ minHeight: '100vh', backgroundColor: custTheme.bg }}>
          <div style={{ padding: '8px 16px', backgroundColor: '#F0F2F5', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: `1px solid ${custTheme.border}` }}>
            <Lock size={12} color="#00C853" />
            <div style={{ flex: 1, padding: '6px 12px', backgroundColor: '#fff', borderRadius: '8px', fontSize: '12px', color: '#666', fontFamily: 'monospace' }}>tyre-fit.co/booking/confirmed</div>
          </div>
          <div style={{ padding: '24px', textAlign: 'center', paddingTop: '40px' }}>
            <div style={{ width: '100px', height: '100px', backgroundColor: '#00C85320', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <CheckCircle size={50} color={custTheme.primary} />
            </div>
            <h1 style={{ color: custTheme.text, fontSize: '26px', fontWeight: '700', margin: '0 0 8px 0' }}>Booking Confirmed!</h1>
            <p style={{ color: custTheme.textMuted, fontSize: '16px', margin: '0 0 32px 0' }}>Your slot with {fitterName} is locked in.</p>

            <CustCard>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: custTheme.textMuted }}>Date</span><span style={{ color: custTheme.text, fontWeight: '600' }}>{quoteData.bookingDate || 'Tue 18 Feb'}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: custTheme.textMuted }}>Time</span><span style={{ color: custTheme.text, fontWeight: '600' }}>{quoteData.bookingTime || '10:30 AM'}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: custTheme.textMuted }}>Vehicle</span><span style={{ color: custTheme.text, fontWeight: '600' }}>{quoteData.numberPlate || 'AB12 CDE'}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: custTheme.textMuted }}>Fitter</span><span style={{ color: custTheme.text, fontWeight: '600' }}>{fitterName}</span></div>
              </div>
            </CustCard>

            <CustCard style={{ backgroundColor: '#00C85310', borderColor: custTheme.primary }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Shield size={28} color={custTheme.primary} />
                <div style={{ textAlign: 'left' }}>
                  <p style={{ margin: 0, color: custTheme.primary, fontWeight: '700', fontSize: '15px' }}>30-Day Emergency Cover — FREE</p>
                  <p style={{ margin: '4px 0 0 0', color: custTheme.textMuted, fontSize: '13px' }}>Up to £300 repair or replacement, nationwide</p>
                </div>
              </div>
            </CustCard>

            <p style={{ color: custTheme.textMuted, fontSize: '13px', margin: '16px 0' }}>You'll get a text when your fitter is on the way.</p>
            <button onClick={() => navigateTo('customer-cover-dashboard')} style={{ width: '100%', padding: '16px', backgroundColor: custTheme.primary, border: 'none', borderRadius: '12px', color: '#fff', fontWeight: '700', fontSize: '16px', cursor: 'pointer' }}>View Your Cover</button>
          </div>
        </div>
      );
    }

    return (
    <div style={{ minHeight: '100vh', backgroundColor: custTheme.bg }}>
      {/* BROWSER URL BAR — shows this is a web page, not an app */}
      <div style={{ padding: '8px 16px', backgroundColor: '#F0F2F5', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: `1px solid ${custTheme.border}` }}>
        <Lock size={12} color="#00C853" />
        <div style={{ flex: 1, padding: '6px 12px', backgroundColor: '#fff', borderRadius: '8px', fontSize: '12px', color: '#666', fontFamily: 'monospace' }}>tyre-fit.co/q/{(quoteData.numberPlate || 'AB12CDE').replace(/\s/g, '').toLowerCase()}</div>
      </div>
      {/* HEADER */}
      <div style={{ padding: '20px 20px 0', borderBottom: `1px solid ${custTheme.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <div style={{ width: '44px', height: '44px', backgroundColor: custTheme.primary, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontWeight: '800', fontSize: '16px' }}>TF</span>
          </div>
          <div>
            <p style={{ margin: 0, color: custTheme.text, fontWeight: '700', fontSize: '17px' }}>{fitterName}</p>
            <p style={{ margin: 0, color: custTheme.textMuted, fontSize: '12px' }}>via TYRE-FIT • No app needed</p>
          </div>
        </div>
      </div>

      <div style={{ padding: '20px' }}>
        <h1 style={{ color: custTheme.text, fontSize: '24px', fontWeight: '700', margin: '0 0 4px 0' }}>Your Quote</h1>
        <p style={{ color: custTheme.textMuted, fontSize: '14px', margin: '0 0 20px 0' }}>Review and pay £5.95 to lock in your slot</p>

        {/* QUOTE BREAKDOWN */}
        <CustCard>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ color: custTheme.textMuted }}>Vehicle</span>
            <span style={{ color: custTheme.text, fontWeight: '600' }}>{quoteData.numberPlate || 'AB12 CDE'} — 2019 Ford Focus</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ color: custTheme.textMuted }}>Service</span>
            <span style={{ color: custTheme.text, fontWeight: '600' }}>2x 205/55R16 Continental</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ color: custTheme.textMuted }}>Appointment</span>
            <span style={{ color: custTheme.text, fontWeight: '600' }}>{quoteData.bookingDate || 'Tue 18 Feb'} at {quoteData.bookingTime || '10:30'}</span>
          </div>
          <div style={{ borderTop: `1px solid ${custTheme.border}`, paddingTop: '12px', marginTop: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ color: custTheme.textMuted }}>Total price</span>
              <span style={{ color: custTheme.text, fontWeight: '700', fontSize: '18px' }}>£{quotePrice}</span>
            </div>
            <p style={{ margin: 0, color: custTheme.textMuted, fontSize: '12px' }}>Balance paid on the day to fitter. You only pay £5.95 now to confirm.</p>
          </div>
        </CustCard>

        {/* COVER INCLUDED */}
        <CustCard style={{ backgroundColor: '#00C85308', borderColor: '#00C85340' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <Shield size={22} color={custTheme.primary} />
            <span style={{ color: custTheme.primary, fontWeight: '700', fontSize: '15px' }}>Included FREE: 30-Day Emergency Cover</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {['Up to £200 replacement if you get a flat', 'Up to £85 puncture repair, anywhere in the UK', 'Up to £100 safe tow from unsafe locations', 'Up to £50 locking wheel nut removal', 'No excess. No hidden costs. Max £300 per claim.'].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle size={14} color={custTheme.primary} />
                <span style={{ color: custTheme.text, fontSize: '13px' }}>{item}</span>
              </div>
            ))}
          </div>
          <button onClick={() => navigateTo('customer-cover-terms')} style={{ marginTop: '10px', background: 'none', border: 'none', color: custTheme.info, fontSize: '13px', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}>Read full cover terms →</button>
        </CustCard>

        {/* BOOKING FEE */}
        <CustCard style={{ textAlign: 'center' }}>
          <p style={{ margin: '0 0 4px 0', color: custTheme.textMuted, fontSize: '13px' }}>Pay now to confirm</p>
          <p style={{ margin: '0 0 12px 0', color: custTheme.text, fontSize: '36px', fontWeight: '800' }}>£5.95</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center', marginBottom: '12px' }}>
            <Lock size={12} color={custTheme.textMuted} />
            <span style={{ color: custTheme.textMuted, fontSize: '12px' }}>Secured by Stripe</span>
          </div>
          <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', textAlign: 'left', cursor: 'pointer', marginBottom: '16px' }}>
            <input type="checkbox" checked={agreed} onChange={() => setAgreed(!agreed)} style={{ marginTop: '3px', width: '18px', height: '18px', accentColor: custTheme.primary }} />
            <span style={{ color: custTheme.textMuted, fontSize: '12px', lineHeight: 1.5 }}>I agree to the <span style={{ color: custTheme.info, textDecoration: 'underline' }}>booking terms</span> and <span style={{ color: custTheme.info, textDecoration: 'underline' }}>cover terms</span>. I understand the £5.95 booking fee is non-refundable and includes 30 days emergency tyre cover.</span>
          </label>
          <button disabled={!agreed || paying} onClick={() => { setPaying(true); setTimeout(() => setPaid(true), 2000); }} style={{ width: '100%', padding: '18px', backgroundColor: agreed ? custTheme.primary : '#ccc', border: 'none', borderRadius: '14px', color: '#fff', fontWeight: '700', fontSize: '17px', cursor: agreed ? 'pointer' : 'default', opacity: paying ? 0.7 : 1 }}>
            {paying ? 'Processing...' : 'Pay £5.95 & Confirm'}
          </button>
        </CustCard>
      </div>
    </div>
    );
  };

  const CustomerCoverTermsScreen = () => (
    <div style={{ minHeight: '100vh', backgroundColor: custTheme.bg }}>
      <div style={{ padding: '8px 16px', backgroundColor: '#F0F2F5', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: `1px solid ${custTheme.border}` }}>
        <Lock size={12} color="#00C853" />
        <div style={{ flex: 1, padding: '6px 12px', backgroundColor: '#fff', borderRadius: '8px', fontSize: '12px', color: '#666', fontFamily: 'monospace' }}>tyre-fit.co/cover-terms</div>
      </div>
      <div style={{ padding: '20px', borderBottom: `1px solid ${custTheme.border}` }}>
        <button onClick={goBack} style={{ background: 'none', border: 'none', color: custTheme.info, fontSize: '15px', cursor: 'pointer', padding: 0, marginBottom: '12px' }}>← Back</button>
        <h1 style={{ color: custTheme.text, fontSize: '22px', fontWeight: '700', margin: 0 }}>Emergency Tyre Cover</h1>
        <p style={{ color: custTheme.textMuted, fontSize: '13px', margin: '4px 0 0 0' }}>What's included with your booking</p>
      </div>
      <div style={{ padding: '20px' }}>
        <CustCard>
          <h3 style={{ color: custTheme.text, fontSize: '16px', fontWeight: '700', margin: '0 0 12px 0' }}>Cover Limits</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <tbody>
              {[
                ['Tyre replacement', 'Up to £200'],
                ['Puncture / flat repair', 'Up to £85'],
                ['Safe tow (from unsafe location)', 'Up to £100'],
                ['Locking wheel nut removal', 'Up to £50'],
                ['Maximum per claim', 'Up to £300']
              ].map(([service, limit], i) => (
                <tr key={i} style={{ borderBottom: i < 4 ? `1px solid ${custTheme.border}` : 'none' }}>
                  <td style={{ padding: '10px 0', color: custTheme.text }}>{service}</td>
                  <td style={{ padding: '10px 0', color: custTheme.primary, fontWeight: '600', textAlign: 'right' }}>{limit}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ margin: '12px 0 0 0', color: custTheme.textMuted, fontSize: '12px', lineHeight: 1.6 }}>If the repair or replacement costs more than the limit, you pay the difference. No excess on any claim.</p>
        </CustCard>

        <CustCard>
          <h3 style={{ color: custTheme.text, fontSize: '16px', fontWeight: '700', margin: '0 0 12px 0' }}>What's Covered</h3>
          {['Punctures, blowouts, and unexpected tyre damage', 'All 4 tyres checked during your service', 'Tyres that were LEGAL at time of service', 'Any location in the UK mainland', '30 days from your service date'].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <CheckCircle size={16} color={custTheme.primary} />
              <span style={{ color: custTheme.text, fontSize: '13px' }}>{item}</span>
            </div>
          ))}
        </CustCard>

        <CustCard>
          <h3 style={{ color: custTheme.text, fontSize: '16px', fontWeight: '700', margin: '0 0 12px 0' }}>What's NOT Covered</h3>
          {['Tyres that were illegal at time of service (below 1.6mm tread)', 'Tyres with serious pre-existing damage noted in your condition report', 'Deliberate damage or racing', 'Claims outside the 30-day window', 'Cosmetic damage only (no functional impact)'].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <X size={16} color={custTheme.danger} />
              <span style={{ color: custTheme.text, fontSize: '13px' }}>{item}</span>
            </div>
          ))}
        </CustCard>

        <CustCard>
          <h3 style={{ color: custTheme.text, fontSize: '16px', fontWeight: '700', margin: '0 0 12px 0' }}>How to Claim</h3>
          {[
            { step: '1', title: 'Call us or tap "I need help"', desc: 'Our AI helpline answers immediately — no hold, no queue' },
            { step: '2', title: 'Upload photos', desc: 'We\'ll text you a link to photograph the damage and your plate' },
            { step: '3', title: 'We verify', desc: 'Checked against your condition report — usually under 2 minutes' },
            { step: '4', title: 'Fitter dispatched', desc: 'Nearest available fitter comes to you. You pay nothing (or just the difference if over limit)' }
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: i < 3 ? '14px' : 0 }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: custTheme.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ color: '#fff', fontWeight: '700', fontSize: '13px' }}>{s.step}</span>
              </div>
              <div>
                <p style={{ margin: 0, color: custTheme.text, fontWeight: '600', fontSize: '14px' }}>{s.title}</p>
                <p style={{ margin: '2px 0 0 0', color: custTheme.textMuted, fontSize: '12px' }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </CustCard>

        <CustCard>
          <h3 style={{ color: custTheme.text, fontSize: '16px', fontWeight: '700', margin: '0 0 8px 0' }}>£50 Call-Out Fee</h3>
          <p style={{ margin: 0, color: custTheme.textMuted, fontSize: '13px', lineHeight: 1.6 }}>If a fitter arrives and finds no fault with your tyre, a £50 call-out fee applies. This covers the fitter's time and travel.</p>
        </CustCard>
      </div>
    </div>
  );

  const CustomerCoverDashboardScreen = () => {
    const daysLeft = 24;
    const expiryDate = '08 Mar 2026';
    const serviceDate = '06 Feb 2026';
    return (
    <div style={{ minHeight: '100vh', backgroundColor: custTheme.bg }}>
      <div style={{ padding: '8px 16px', backgroundColor: '#F0F2F5', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Lock size={12} color="#00C853" />
        <div style={{ flex: 1, padding: '6px 12px', backgroundColor: '#fff', borderRadius: '8px', fontSize: '12px', color: '#666', fontFamily: 'monospace' }}>tyre-fit.co/cover/ab12cde</div>
      </div>
      <div style={{ padding: '24px', background: `linear-gradient(135deg, ${custTheme.primary}, #00A843)`, color: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <Shield size={28} color="#fff" />
          <span style={{ fontSize: '18px', fontWeight: '700' }}>Your Tyre Cover</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '6px' }}>
          <span style={{ fontSize: '48px', fontWeight: '800' }}>{daysLeft}</span>
          <span style={{ fontSize: '18px', fontWeight: '500' }}>days left</span>
        </div>
        <p style={{ margin: 0, fontSize: '14px', opacity: 0.85 }}>Expires {expiryDate}</p>
        {/* Progress bar */}
        <div style={{ marginTop: '16px', height: '6px', backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: '3px' }}>
          <div style={{ width: `${(daysLeft / 30) * 100}%`, height: '100%', backgroundColor: '#fff', borderRadius: '3px' }} />
        </div>
      </div>

      <div style={{ padding: '20px' }}>
        <button onClick={() => navigateTo('customer-claim')} style={{ width: '100%', padding: '20px', backgroundColor: '#EF444415', border: `2px solid ${custTheme.danger}`, borderRadius: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '16px' }}>
          <AlertTriangle size={22} color={custTheme.danger} />
          <span style={{ color: custTheme.danger, fontWeight: '700', fontSize: '17px' }}>I Need Help — Claim Now</span>
        </button>

        <CustCard>
          <h3 style={{ color: custTheme.text, fontSize: '15px', fontWeight: '700', margin: '0 0 12px 0' }}>What You're Covered For</h3>
          {[
            { label: 'Replacement', limit: '£200', icon: '🔧' },
            { label: 'Repair', limit: '£85', icon: '🩹' },
            { label: 'Safe tow', limit: '£100', icon: '🚗' },
            { label: 'Locking wheel nut', limit: '£50', icon: '🔩' }
          ].map((c, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < 3 ? `1px solid ${custTheme.border}` : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '16px' }}>{c.icon}</span>
                <span style={{ color: custTheme.text, fontSize: '14px' }}>{c.label}</span>
              </div>
              <span style={{ color: custTheme.primary, fontWeight: '600', fontSize: '14px' }}>Up to {c.limit}</span>
            </div>
          ))}
          <p style={{ margin: '10px 0 0 0', color: custTheme.textMuted, fontSize: '12px' }}>Max £300 per claim. You pay any difference over the limit.</p>
        </CustCard>

        <CustCard>
          <h3 style={{ color: custTheme.text, fontSize: '15px', fontWeight: '700', margin: '0 0 8px 0' }}>Your Service</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ color: custTheme.textMuted, fontSize: '13px' }}>Date</span>
            <span style={{ color: custTheme.text, fontSize: '13px', fontWeight: '500' }}>{serviceDate}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ color: custTheme.textMuted, fontSize: '13px' }}>Fitter</span>
            <span style={{ color: custTheme.text, fontSize: '13px', fontWeight: '500' }}>{signUpData.businessName || "Dan's Mobile Tyres"}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ color: custTheme.textMuted, fontSize: '13px' }}>Vehicle</span>
            <span style={{ color: custTheme.text, fontSize: '13px', fontWeight: '500' }}>AB12 CDE — Ford Focus</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: custTheme.textMuted, fontSize: '13px' }}>Tyres checked</span>
            <span style={{ color: custTheme.text, fontSize: '13px', fontWeight: '500' }}>4 of 4</span>
          </div>
        </CustCard>

        <CustCard>
          <h3 style={{ color: custTheme.text, fontSize: '15px', fontWeight: '700', margin: '0 0 8px 0' }}>Your Condition Report</h3>
          <p style={{ margin: '0 0 12px 0', color: custTheme.textMuted, fontSize: '13px' }}>Taken by your fitter at time of service</p>
          {['Front Left — Legal (5.2mm) ✅', 'Front Right — Legal (2.1mm) — Replace soon ⚠️', 'Rear Left — Legal (4.8mm) ✅', 'Rear Right — Legal (3.0mm) — Minor kerb scuff ✅'].map((t, i) => (
            <p key={i} style={{ margin: '0 0 6px 0', color: custTheme.text, fontSize: '12px', padding: '6px 10px', backgroundColor: custTheme.bgInput, borderRadius: '6px' }}>{t}</p>
          ))}
        </CustCard>

        <div style={{ textAlign: 'center', marginTop: '8px' }}>
          <button onClick={() => navigateTo('customer-cover-terms')} style={{ background: 'none', border: 'none', color: custTheme.info, fontSize: '13px', cursor: 'pointer', textDecoration: 'underline' }}>View full cover terms</button>
          <p style={{ color: custTheme.textMuted, fontSize: '11px', marginTop: '8px' }}>Helpline: 0330 633 1247 (AI-powered, no queue)</p>
        </div>
      </div>
    </div>
    );
  };

  const CustomerClaimScreen = () => {
    const [claimType, setClaimType] = useState(null);

    useEffect(() => {
      if (customerClaimPhotos.tyre && customerClaimPhotos.plate) {
        setCustomerClaimStep('checking');
        setTimeout(() => setCustomerClaimStep('approved'), 3000);
      }
    }, [customerClaimPhotos]);

    if (customerClaimStep === 'checking') {
      return (
        <div style={{ minHeight: '100vh', backgroundColor: custTheme.bg }}>
          <CustUrlBar url="tyre-fit.co/claim/verifying" />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', minHeight: 'calc(100vh - 44px)' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '4px solid ' + custTheme.primary, borderTopColor: 'transparent', margin: '0 auto 24px', animation: 'spin 1s linear infinite' }} />
              <h2 style={{ color: custTheme.text, fontSize: '20px', fontWeight: '700', margin: '0 0 8px 0' }}>Verifying Your Claim</h2>
              <p style={{ color: custTheme.textMuted, fontSize: '14px', margin: '0 0 6px 0' }}>Checking against your condition report...</p>
              <p style={{ color: custTheme.textMuted, fontSize: '12px', margin: 0 }}>This usually takes under 2 minutes</p>
            </div>
          </div>
          <style>{'@keyframes spin { to { transform: rotate(360deg); } }'}</style>
        </div>
      );
    }


    if (customerClaimStep === 'approved') {
      return (
        <div style={{ minHeight: '100vh', backgroundColor: custTheme.bg }}>
          <CustUrlBar url="tyre-fit.co/claim/approved" />
          <div style={{ padding: '24px', textAlign: 'center', paddingTop: '40px' }}>
            <div style={{ width: '100px', height: '100px', backgroundColor: '#00C85320', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <CheckCircle size={50} color={custTheme.primary} />
            </div>
            <h1 style={{ color: custTheme.text, fontSize: '24px', fontWeight: '700', margin: '0 0 8px 0' }}>Claim Approved</h1>
            <p style={{ color: custTheme.textMuted, fontSize: '15px', margin: '0 0 24px 0' }}>A fitter is being contacted now</p>
            <CustCard style={{ textAlign: 'left' }}>
              <h3 style={{ margin: '0 0 12px 0', color: custTheme.text, fontSize: '15px', fontWeight: '700' }}>What happens next</h3>
              {[
                { step: '1', text: 'We are contacting the nearest available fitter', done: true },
                { step: '2', text: 'You will get a text with their name and ETA', done: false },
                { step: '3', text: 'Fitter arrives and fixes your tyre', done: false },
                { step: '4', text: 'Cover pays automatically — nothing to do', done: false }
              ].map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: i < 3 ? '10px' : 0 }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: s.done ? custTheme.primary : custTheme.bgInput, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {s.done ? <Check size={14} color="#fff" /> : <span style={{ color: custTheme.textMuted, fontSize: '11px', fontWeight: '600' }}>{s.step}</span>}
                  </div>
                  <span style={{ color: s.done ? custTheme.text : custTheme.textMuted, fontSize: '13px', fontWeight: s.done ? '600' : '400' }}>{s.text}</span>
                </div>
              ))}
            </CustCard>
            <CustCard>
              <p style={{ margin: '0 0 4px 0', color: custTheme.textMuted, fontSize: '11px', textTransform: 'uppercase', fontWeight: '600' }}>Your cover pays</p>
              <p style={{ margin: '0 0 4px 0', color: custTheme.primary, fontSize: '24px', fontWeight: '800' }}>Up to £200</p>
              <p style={{ margin: 0, color: custTheme.textMuted, fontSize: '12px' }}>If the quote is under £200, you pay nothing. If over, you pay the difference.</p>
            </CustCard>
            <p style={{ color: custTheme.textMuted, fontSize: '12px', marginTop: '16px' }}>Need to cancel? Call 0330 633 1247</p>
          </div>
        </div>
      );
    }


    if (customerClaimStep === 'denied') {
      return (
        <div style={{ minHeight: '100vh', backgroundColor: custTheme.bg }}>
          <CustUrlBar url="tyre-fit.co/claim/review" />
          <div style={{ padding: '24px', textAlign: 'center', paddingTop: '40px' }}>
            <div style={{ width: '100px', height: '100px', backgroundColor: '#EF444420', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <X size={50} color={custTheme.danger} />
            </div>
            <h1 style={{ color: custTheme.danger, fontSize: '24px', fontWeight: '700', margin: '0 0 8px 0' }}>Claim Not Covered</h1>
            <p style={{ color: custTheme.textMuted, fontSize: '15px', margin: '0 0 24px 0' }}>This tyre is not eligible for cover</p>
            <CustCard style={{ borderColor: custTheme.danger, textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <AlertTriangle size={18} color={custTheme.danger} />
                <span style={{ color: custTheme.danger, fontWeight: '700', fontSize: '14px' }}>Reason: Illegal tyre at time of service</span>
              </div>
              <p style={{ margin: 0, color: custTheme.textMuted, fontSize: '13px', lineHeight: 1.6 }}>Your condition report from 06 Feb shows the Front Left tyre had a tread depth of 1.4mm — below the legal minimum of 1.6mm. Tyres that were already illegal at time of service are not covered.</p>
            </CustCard>
            <CustCard style={{ textAlign: 'left' }}>
              <h3 style={{ margin: '0 0 8px 0', color: custTheme.text, fontSize: '15px', fontWeight: '700' }}>We can still help</h3>
              <p style={{ margin: '0 0 12px 0', color: custTheme.textMuted, fontSize: '13px' }}>A fitter can come to you — you will pay the full price for repair or replacement.</p>
              <p style={{ margin: '0 0 4px 0', color: custTheme.textMuted, fontSize: '11px', textTransform: 'uppercase', fontWeight: '600' }}>Estimated price</p>
              <p style={{ margin: '0 0 16px 0', color: custTheme.text, fontSize: '22px', fontWeight: '700' }}>£75 — £200</p>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '16px', cursor: 'pointer' }}>
                <input type="checkbox" style={{ marginTop: '3px', width: '18px', height: '18px', accentColor: custTheme.primary }} />
                <span style={{ color: custTheme.textMuted, fontSize: '12px', lineHeight: 1.5 }}>I understand this is not covered by my emergency cover and I agree to pay the full price for repair or replacement.</span>
              </label>
              <button style={{ width: '100%', padding: '16px', backgroundColor: custTheme.primary, border: 'none', borderRadius: '12px', color: '#fff', fontWeight: '700', fontSize: '15px', cursor: 'pointer' }}>Accept and Send Fitter</button>
              <button onClick={goBack} style={{ width: '100%', padding: '14px', background: 'none', border: '1px solid ' + custTheme.border, borderRadius: '12px', color: custTheme.textMuted, fontSize: '14px', cursor: 'pointer', marginTop: '8px' }}>Cancel</button>
            </CustCard>
          </div>
        </div>
      );
    }

    return (
      <div style={{ minHeight: '100vh', backgroundColor: custTheme.bg }}>
        <CustUrlBar url="tyre-fit.co/claim/ab12cde" />
        <div style={{ padding: '20px', borderBottom: '1px solid ' + custTheme.border }}>
          <button onClick={goBack} style={{ background: 'none', border: 'none', color: custTheme.info, fontSize: '15px', cursor: 'pointer', padding: 0, marginBottom: '12px' }}>← Back</button>
          <h1 style={{ color: custTheme.text, fontSize: '22px', fontWeight: '700', margin: 0 }}>Emergency Claim</h1>
          <p style={{ color: custTheme.textMuted, fontSize: '13px', margin: '4px 0 0 0' }}>Upload photos so we can verify and send a fitter</p>
        </div>
        <div style={{ padding: '20px' }}>
          {!claimType && (
            <div>
              <p style={{ color: custTheme.text, fontWeight: '600', fontSize: '15px', margin: '0 0 12px 0' }}>What happened?</p>
              {[
                { id: 'flat', label: 'Flat tyre / puncture', icon: String.fromCodePoint(0x1F4A8) },
                { id: 'blowout', label: 'Blowout / tyre damage', icon: String.fromCodePoint(0x1F4A5) },
                { id: 'lwn', label: 'Locking wheel nut issue', icon: String.fromCodePoint(0x1F529) },
                { id: 'tow', label: 'Need a tow (unsafe location)', icon: String.fromCodePoint(0x1F697) }
              ].map(function(c) { return (
                <button key={c.id} onClick={function() { setClaimType(c.id); }} style={{ width: '100%', padding: '16px', marginBottom: '8px', backgroundColor: custTheme.bgCard, border: '1px solid ' + custTheme.border, borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left' }}>
                  <span style={{ fontSize: '20px' }}>{c.icon}</span>
                  <span style={{ color: custTheme.text, fontSize: '15px', fontWeight: '500' }}>{c.label}</span>
                  <ChevronRight size={18} color={custTheme.textMuted} style={{ marginLeft: 'auto' }} />
                </button>
              ); })}
            </div>
          )}
          {claimType && (
            <div>
              <CustCard style={{ backgroundColor: '#3B82F610', borderColor: custTheme.info }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Info size={16} color={custTheme.info} />
                  <span style={{ color: custTheme.info, fontSize: '13px', fontWeight: '600' }}>We need 2 photos to verify your claim</span>
                </div>
              </CustCard>
              <button onClick={function() { setCustomerClaimPhotos(function(p) { return Object.assign({}, p, { tyre: true }); }); }} style={{ width: '100%', padding: '24px', marginBottom: '12px', backgroundColor: customerClaimPhotos.tyre ? '#00C85310' : custTheme.bgCard, border: '2px dashed ' + (customerClaimPhotos.tyre ? custTheme.primary : custTheme.border), borderRadius: '14px', cursor: 'pointer', textAlign: 'center' }}>
                {customerClaimPhotos.tyre ? (
                  <div>
                    <CheckCircle size={32} color={custTheme.primary} />
                    <p style={{ margin: '8px 0 0 0', color: custTheme.primary, fontWeight: '600', fontSize: '14px' }}>Tyre photo uploaded</p>
                  </div>
                ) : (
                  <div>
                    <Camera size={32} color={custTheme.textMuted} />
                    <p style={{ margin: '8px 0 0 0', color: custTheme.text, fontWeight: '600', fontSize: '15px' }}>Photo of damaged tyre</p>
                    <p style={{ margin: '4px 0 0 0', color: custTheme.textMuted, fontSize: '12px' }}>Show the damage clearly</p>
                  </div>
                )}
              </button>
              <button onClick={function() { setCustomerClaimPhotos(function(p) { return Object.assign({}, p, { plate: true }); }); }} style={{ width: '100%', padding: '24px', marginBottom: '16px', backgroundColor: customerClaimPhotos.plate ? '#00C85310' : custTheme.bgCard, border: '2px dashed ' + (customerClaimPhotos.plate ? custTheme.primary : custTheme.border), borderRadius: '14px', cursor: 'pointer', textAlign: 'center' }}>
                {customerClaimPhotos.plate ? (
                  <div>
                    <CheckCircle size={32} color={custTheme.primary} />
                    <p style={{ margin: '8px 0 0 0', color: custTheme.primary, fontWeight: '600', fontSize: '14px' }}>Plate photo uploaded</p>
                  </div>
                ) : (
                  <div>
                    <Car size={32} color={custTheme.textMuted} />
                    <p style={{ margin: '8px 0 0 0', color: custTheme.text, fontWeight: '600', fontSize: '15px' }}>Photo of your number plate</p>
                    <p style={{ margin: '4px 0 0 0', color: custTheme.textMuted, fontSize: '12px' }}>So we can match your vehicle</p>
                  </div>
                )}
              </button>
              <p style={{ color: custTheme.textMuted, fontSize: '11px', textAlign: 'center', margin: '16px 0 8px 0' }}>Prototype: test different outcomes</p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={function() { setCustomerClaimPhotos({ tyre: true, plate: true }); setCustomerClaimStep('denied'); }} style={{ flex: 1, padding: '10px', backgroundColor: '#EF444415', border: '1px solid ' + custTheme.danger, borderRadius: '8px', color: custTheme.danger, fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>Test: Illegal Tyre Denial</button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };


  var renderScreen = function() {
    switch(currentScreen) {
      case 'customer-booking': return <CustomerBookingScreen />;
      case 'customer-cover-terms': return <CustomerCoverTermsScreen />;
      case 'customer-cover-dashboard': return <CustomerCoverDashboardScreen />;
      case 'customer-claim': return <CustomerClaimScreen />;
      default: return <CustomerBookingScreen />;
    }
  };

  return (
    <div style={{ maxWidth: '430px', margin: '0 auto', minHeight: '100vh', backgroundColor: '#f9fafb', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      <style>{"html, body { height: 100%; overflow-y: auto; margin: 0; }"}</style>
      <Toast />
      <div style={{ position: 'sticky', top: 0, zIndex: 500, display: 'flex', justifyContent: 'center', padding: '8px', backgroundColor: '#f9fafb' }}>
        <div style={{ display: 'flex', backgroundColor: '#f3f4f6', borderRadius: '10px', padding: '3px', border: '1px solid #e5e7eb', gap: '2px' }}>
          <button onClick={function() { navigateTo('customer-booking'); }} style={{ padding: '8px 10px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: '600', backgroundColor: currentScreen === 'customer-booking' ? '#2563EB' : 'transparent', color: currentScreen === 'customer-booking' ? '#fff' : '#9ca3af' }}>Booking</button>
          <button onClick={function() { navigateTo('customer-cover-terms'); }} style={{ padding: '8px 10px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: '600', backgroundColor: currentScreen === 'customer-cover-terms' ? '#2563EB' : 'transparent', color: currentScreen === 'customer-cover-terms' ? '#fff' : '#9ca3af' }}>Terms</button>
          <button onClick={function() { navigateTo('customer-cover-dashboard'); }} style={{ padding: '8px 10px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: '600', backgroundColor: currentScreen === 'customer-cover-dashboard' ? '#2563EB' : 'transparent', color: currentScreen === 'customer-cover-dashboard' ? '#fff' : '#9ca3af' }}>Dashboard</button>
          <button onClick={function() { setCustomerClaimStep('select-issue'); setCustomerClaimPhotos({ tyre: false, plate: false }); navigateTo('customer-claim'); }} style={{ padding: '8px 10px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: '600', backgroundColor: currentScreen === 'customer-claim' ? '#ef4444' : 'transparent', color: currentScreen === 'customer-claim' ? '#fff' : '#9ca3af' }}>Claim</button>
        </div>
      </div>
      {renderScreen()}
    </div>
  );
}
