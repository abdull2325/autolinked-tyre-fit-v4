import React, { useState, useEffect } from 'react';
import { 
  FileText, ClipboardList, Shield, Map, Package, Star, Phone, Calendar,
  ChevronRight, ChevronLeft, Camera, Send, Clock, CheckCircle, AlertCircle,
  MapPin, User, Car, Settings, Home, Search, X, Plus, Minus, Navigation,
  CreditCard, MessageSquare, Mail, ExternalLink, Edit, Trash2,
  Eye, AlertTriangle, TrendingUp, Users, Truck, Bell, Moon, Sun,
  LogOut, HelpCircle, Download, Filter, MoreVertical,
  Play, Pause, Upload, Smartphone, Globe, Building, Hash, Percent,
  RefreshCw, ArrowRight, ArrowLeft, Check, Info,
  Zap, Award, Lock, Unlock, Image, Video, Mic, PhoneCall, PhoneOff,
  UserPlus, DollarSign, Crosshair, Activity
} from 'lucide-react';

const Wrench = Settings;

// Aliases for icons not available in lucide-react 0.263.1
const PoundSterling = ({ size = 24, color = 'currentColor', style = {} }) => (
  <span style={{ fontSize: `${size}px`, fontWeight: '700', color, lineHeight: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: `${size}px`, height: `${size}px`, ...style }}>£</span>
);
const QrCode = Smartphone;
const Wallet = CreditCard;
const FileCheck = FileText;
const FileDown = Download;
const BadgeCheck = CheckCircle;
const ShieldCheck = Shield;
const NoWifi = PhoneOff;
const RainAlert = AlertCircle;
const CircleDot = Crosshair;
const Scan = Camera;
const BellRing = Bell;
const AlertOctagon = AlertTriangle;
const MapPinned = MapPin;
const Route = Navigation;
const Timer = Clock;
const Gift = Award;
const Copy = ClipboardList;

export default function TyreFitApp() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('signin');
  const [previousScreens, setPreviousScreens] = useState([]);
  const [flowRunnerActive, setFlowRunnerActive] = useState(false);
  const [flowRunnerAuto, setFlowRunnerAuto] = useState(false);
  const [userRole, setUserRole] = useState('owner');
  const [isTeamAccount, setIsTeamAccount] = useState(false);
  
  const [signUpData, setSignUpData] = useState({
    fullName: '', email: '', mobile: '', businessName: '', vatNumber: '', addressLine1: '', addressLine2: '', city: '', businessPostcode: '',
    services: { tyreFitting: true, punctureRepairs: true, fitOnly: true, tyreRotation: true, tpms: false, alignment: false, alignmentPrice: '' },
    pricing: { digitalBalancingPrice: '5', newValvesPrice: '3', oldTyreDisposalPrice: '2.50', lwnRemovalPrice: '25', digitalBalancingFree: false, newValvesFree: false, disposalFree: false },
    availability: { bookings: true, emergency: true, emergencyHours: 'business', businessHoursStart: '08:00', businessHoursEnd: '18:00', businessDays: ['Mon','Tue','Wed','Thu','Fri','Sat'] },
    comms: { missedCallCapture: true, smsQuoteAi: true, autoReply: true },
    depots: [{ name: 'Main Depot', address: '', radius: 15 }],
    invitedFitters: [{ name: '', mobile: '' }]
  });
  
  const [quoteData, setQuoteData] = useState({
    customerName: '', mobile: '', numberPlate: '', isEmergency: false, isCoverQuote: false,
    jobType: 'replace',
    tyres: [{ position: 'Front', size: '', qty: 1 }],
    lwnStatus: 'has_key',
    addOns: { balancing: true, newValves: true, disposal: true, alignment: false },
    location: '', price: '', notes: '', assignedTo: null,
    bookingDate: '', bookingTime: ''
  });
  
  const [activeJob, setActiveJob] = useState(null);
  const [isCoverJob, setIsCoverJob] = useState(false);
  const [jobTimer, setJobTimer] = useState(0);
  const [jobTimerRunning, setJobTimerRunning] = useState(false);
  const [beforePhotos, setBeforePhotos] = useState({});
  const [afterPhotos, setAfterPhotos] = useState({});
  const [customerSigned, setCustomerSigned] = useState(false);
  const [invoiceTab, setInvoiceTab] = useState('pending');
  const [stockLocation, setStockLocation] = useState('all');
  const [showExportModal, setShowExportModal] = useState(false);
  const [gdprChecked, setGdprChecked] = useState(false);
  const [toast, setToast] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [reviewResponse, setReviewResponse] = useState('');
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [showQuoteSmsPreview, setShowQuoteSmsPreview] = useState(null);
  const [showCancelJob, setShowCancelJob] = useState(false);
  const [coverApprovalPhase, setCoverApprovalPhase] = useState('idle');
  const [showCoverJobAlert, setShowCoverJobAlert] = useState(true);
  const [viewMode, setViewMode] = useState('fitter');
  const [customerClaimStep, setCustomerClaimStep] = useState('select-issue');
  const [customerClaimPhotos, setCustomerClaimPhotos] = useState({ tyre: false, plate: false });
  const [claimIssueType, setClaimIssueType] = useState(null);
  const [declineCoverJobId, setDeclineCoverJobId] = useState(null);
  const [emergencyAccepted, setEmergencyAccepted] = useState(false);
  const [coverJobsExpanded, setCoverJobsExpanded] = useState(false);
  const [activeCoverJob, setActiveCoverJob] = useState(null);
  
  const [coverJobs, setCoverJobs] = useState([
    { id: 'cj1', name: 'John Smith', plate: 'AB12 CDE', vehicle: '2019 Ford Focus', location: 'A12 Layby, near Stratford', distance: '4.2 miles', issue: 'Flat tyre', tyreSize: '205/55R16', qty: 1, timeAgo: '2 mins ago' },
    { id: 'cj2', name: 'Rebecca Taylor', plate: 'MN56 PQR', vehicle: '2021 VW Golf', location: 'Romford Road, E7', distance: '6.1 miles', issue: 'Flat tyre', tyreSize: '225/45R17', qty: 1, timeAgo: '8 mins ago' }
  ]);
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [calendarView, setCalendarView] = useState('week');
  const [invoiceFormData, setInvoiceFormData] = useState({ customerName: '', mobile: '', description: '', amount: '' });
  const [cameraPermission, setCameraPermission] = useState(false);
  const [showCameraPermissionModal, setShowCameraPermissionModal] = useState(false);
  const [locationPermission, setLocationPermission] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [walletBalance, setWalletBalance] = useState(1247.50);
  const [stripeConnected, setStripeConnected] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [coverQuotePrice, setCoverQuotePrice] = useState('');
  const [coverDepotNeeded, setCoverDepotNeeded] = useState(false);
  const [coverJobInRoute, setCoverJobInRoute] = useState(null);
  const [showRouteUpdateModal, setShowRouteUpdateModal] = useState(false);
  const [routeInsertPosition, setRouteInsertPosition] = useState('next');
  const [depotStops, setDepotStops] = useState([]);
  const [showDepotRouteModal, setShowDepotRouteModal] = useState(false);
  const [pendingDepotStop, setPendingDepotStop] = useState(null);
  const [scanCount, setScanCount] = useState(0);
  const [scannerExpanded, setScannerExpanded] = useState(true);
  const [showScannerOverlay, setShowScannerOverlay] = useState(false);
  const [scannerStep, setScannerStep] = useState('ready');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [gdprConsents, setGdprConsents] = useState({ terms: false, privacy: false, dataProcessing: false, comms: false });
  const [showSetupTips, setShowSetupTips] = useState(true);
  const [isFirstLogin, setIsFirstLogin] = useState(true);
  const [fontSize, setFontSize] = useState('large');
  const [highContrast, setHighContrast] = useState(false);
  const [quickQuoteService, setQuickQuoteService] = useState('tyre');
  const [showSkipPhotosWarning, setShowSkipPhotosWarning] = useState(false);
  const [showSkipConditionWarning, setShowSkipConditionWarning] = useState(false);
  const [cancelBy, setCancelBy] = useState('');
  const [cancelReason, setCancelReason] = useState('');

  // === SMART PREFERENCES (remembered across sessions) ===
  const [preferredMap, setPreferredMap] = useState('google'); // DEV NOTE: Google Maps only — no Apple/Waze/w3w integration needed
  const [preferredPayment, setPreferredPayment] = useState(null); // 'tap', 'qr', 'cash' — null = show all
  const [preferredSend, setPreferredSend] = useState(null); // 'whatsapp', 'sms'
  const [jobQueueIndex, setJobQueueIndex] = useState(0); // tracks which job in today's queue
  const [quotesStatus, setQuotesStatus] = useState({ sent: 3, opened: 1, paid: 2, waiting: 1 });
  const [weeklyWins, setWeeklyWins] = useState({ jobs: 32, earned: 2847, reviews: 4, avgRating: 4.8, coveredCustomers: 28 });
  const [showGlobalSearch, setShowGlobalSearch] = useState(false);
  const [globalSearchTerm, setGlobalSearchTerm] = useState('');
  const [isOffline, setIsOffline] = useState(false);
  const [mileageToday, setMileageToday] = useState(47);
  const [mileageWeek, setMileageWeek] = useState(213);
  const [mileageMonth, setMileageMonth] = useState(847);
  const [showMileage, setShowMileage] = useState(false);
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [conditionPassed, setConditionPassed] = useState(true);
  
  // All customers — combined from jobs, cover customers, evidence
  const allCustomers = [
    { name: 'Emma Davis', plate: 'CD90 VWX', phone: '07700 900111', vehicle: '2021 Tesla Model 3', lastJob: '11 Feb 2026', tyreSize: '235/45R18', status: 'active-cover' },
    { name: 'John Smith', plate: 'AB12 CDE', phone: '07700 900123', vehicle: '2019 Ford Focus', lastJob: '30 Jan 2026', tyreSize: '205/55R16', status: 'active-cover' },
    { name: 'Sarah Jones', plate: 'XY34 FGH', phone: '07700 900456', vehicle: '2020 VW Golf', lastJob: '02 Feb 2026', tyreSize: '225/45R17', status: 'active-cover' },
    { name: 'Mike Palmer', plate: 'CD56 EFG', phone: '07700 900789', vehicle: '2018 BMW 3 Series', lastJob: '28 Jan 2026', tyreSize: '225/45R18', status: 'expiring-cover' },
    { name: 'Emma Clarke', plate: 'HJ78 KLM', phone: '07700 900321', vehicle: '2021 Audi A3', lastJob: '20 Jan 2026', tyreSize: '225/40R18', status: 'expiring-cover' },
    { name: 'David Brown', plate: 'QR78 STU', phone: '07700 900654', vehicle: '2017 Toyota Corolla', lastJob: '01 Jan 2026', tyreSize: '195/65R15', status: 'expired-cover' },
    { name: 'Lisa Wright', plate: 'MN45 PQR', phone: '07700 900222', vehicle: '2022 Kia Sportage', lastJob: '05 Feb 2026', tyreSize: '235/55R19', status: 'active-cover' },
    { name: 'James Taylor', plate: 'FG23 HIJ', phone: '07700 900333', vehicle: '2020 Hyundai Tucson', lastJob: '08 Feb 2026', tyreSize: '225/60R17', status: 'no-cover' },
    { name: 'Rachel Green', plate: 'KL89 MNO', phone: '07700 900444', vehicle: '2019 Nissan Qashqai', lastJob: '15 Jan 2026', tyreSize: '215/60R17', status: 'expired-cover' },
    { name: 'Tom Harrison', plate: 'WX12 YZA', phone: '07700 900555', vehicle: '2023 Ford Puma', lastJob: '10 Feb 2026', tyreSize: '215/55R17', status: 'active-cover' },
  ];
  
  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };
  
  const Toast = () => toast && (
    <div style={{ position: 'fixed', top: '24px', left: '50%', transform: 'translateX(-50%)', backgroundColor: theme.primary, color: '#000', padding: '12px 24px', borderRadius: '12px', zIndex: 9999, display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '500', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
      <CheckCircle size={20} />{toast}
    </div>
  );
  
  const Modal = ({ title, children, onClose }) => (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', zIndex: 2000 }}>
      <Card style={{ maxWidth: '400px', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ margin: 0, color: theme.text, fontWeight: '600' }}>{title}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: theme.textMuted, cursor: 'pointer' }}><X size={24} /></button>
        </div>
        {children}
      </Card>
    </div>
  );
  
  // COACH MARKS / FEATURE TOUR

  // === SMART JOB FLOW HELPERS ===
  const getNextJob = () => {
    const paidJobs = mockJobs.filter(j => j.depositPaid || j.isCoverJob || j.isEmergency);
    const currentIdx = activeJob ? paidJobs.findIndex(j => j.id === activeJob.id) : -1;
    return paidJobs[currentIdx + 1] || null;
  };

  const autoLoadNextJob = () => {
    const next = getNextJob();
    if (next) {
      setActiveJob(next);
      setIsCoverJob(!!next.isCoverJob);
      setBeforePhotos({});
      setAfterPhotos({});
      setCustomerSigned(false);
      setJobTimer(0);
      showToast(`Next: ${next.customer} — ${next.plate}`);
      setTimeout(() => navigateTo('job-enroute'), 1500);
    } else {
      // No more jobs — show day summary
      showToast('All jobs done for today!');
      setTimeout(() => navigateTo('dashboard'), 1500);
    }
  };

  const openPreferredMap = (address) => {
    const mapNames = { google: 'Google Maps', apple: 'Apple Maps', w3w: 'what3words' };
    if (preferredMap) {
      showToast(`Opening ${mapNames[preferredMap]}...`);
    }
  };

  const selectMapAndRemember = (mapId) => {
    setPreferredMap(mapId);
    const mapNames = { google: 'Google Maps', apple: 'Apple Maps', w3w: 'what3words' };
    showToast(`Opening ${mapNames[mapId]}... (remembered)`);
  };

  // Time-aware dashboard helper
  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 9) return 'morning';
    if (hour >= 9 && hour < 17) return 'working';
    return 'evening';
  };

  // SETUP TIPS — inline helper cards for business setup
  const SetupTip = ({ icon: TipIcon, title, children, accent }) => (
    <div style={{ display: 'flex', gap: '10px', padding: '12px', backgroundColor: `${accent || theme.info}10`, borderRadius: '10px', border: `1px solid ${accent || theme.info}20`, marginBottom: '16px' }}>
      <TipIcon size={18} color={accent || theme.info} style={{ flexShrink: 0, marginTop: '2px' }} />
      <div>
        {title && <p style={{ margin: '0 0 4px 0', color: theme.text, fontWeight: '600', fontSize: '13px' }}>{title}</p>}
        <p style={{ margin: 0, color: theme.textMuted, fontSize: '13px', lineHeight: 1.5 }}>{children}</p>
      </div>
    </div>
  );
  
  const theme = {
    bg: darkMode ? '#0a0a0a' : '#f5f5f5',
    bgCard: darkMode ? '#18181b' : '#ffffff',
    bgInput: darkMode ? '#27272a' : '#e8e8ec',
    border: darkMode ? '#3f3f46' : '#d1d1d6',
    text: darkMode ? '#fafafa' : '#18181b',
    textMuted: darkMode ? '#a1a1aa' : '#71717a',
    textSubtle: darkMode ? '#71717a' : '#888',
    primary: '#10b981',
    danger: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',
    fs: fontSize === 'large' ? 1.3 : 1
  };

  const navigateTo = (screen) => { setPreviousScreens([...previousScreens, currentScreen]); setCurrentScreen(screen); };
  const goBack = () => { if (previousScreens.length > 0) { setCurrentScreen(previousScreens[previousScreens.length - 1]); setPreviousScreens(previousScreens.slice(0, -1)); }};
  const resetJobState = () => { setBeforePhotos({}); setAfterPhotos({}); setCustomerSigned(false); setJobTimerRunning(false); setJobTimer(0); setConditionPassed(true); };
  const formatJobTimer = (secs) => { var m = Math.floor(secs / 60); var s = secs % 60; return m + ':' + (s < 10 ? '0' : '') + s; };
  const flowRunnerNextMap = {
    signin: { route: 'welcome', label: 'Welcome' },
    welcome: { route: 'business-setup', label: 'Business Setup' },
    'business-setup': { route: 'link-gmb', label: 'Google Business' },
    'link-gmb': { route: 'setup-final', label: 'Permissions' },
    'setup-final': { route: 'setup-complete', label: 'Setup Complete' },
    'setup-complete': { route: 'dashboard', label: 'Dashboard' },
    'quote-hub': { route: 'quick-quote', label: 'Quick Quote' },
    'quick-quote': { route: 'quote-sent', label: 'Quote Sent' },
    'quote-customer': { route: 'quote-schedule', label: 'Quote Schedule' },
    'quote-schedule': { route: 'quote-job', label: 'Quote Job Details' },
    'quote-job': { route: 'quote-stock', label: 'Quote Stock Check' },
    'quote-stock': { route: 'quote-review', label: 'Quote Review' },
    'quote-review': { route: 'quote-sent', label: 'Quote Sent' },
    'quote-sent': { route: 'dashboard', label: 'Back To Dashboard' },
    'cover-quote': { route: 'job-enroute', label: 'Start Cover Job' },
    'job-enroute': { route: 'job-before-photo', label: 'Before Photos' },
    'job-before-photo': { route: 'job-condition-check', label: 'Condition Check' },
    'job-condition-check': { route: 'job-payment', label: 'Payment' },
    'job-payment': { route: 'job-complete', label: 'Complete Job' },
    'job-complete': { route: 'day-summary', label: 'Day Summary' },
    'cover-job-complete': { route: 'day-summary', label: 'Day Summary' },
    'day-summary': { route: 'dashboard', label: 'Back To Dashboard' },
    'invoice-create': { route: 'invoices', label: 'Invoice List' },
    'customer-booking': { route: 'customer-booking-terms', label: 'Booking Terms' },
    'customer-booking-terms': { route: 'customer-cover-terms', label: 'Cover Terms' },
    'customer-cover-terms': { route: 'customer-cover-dashboard', label: 'Cover Dashboard' },
    'customer-cover-dashboard': { route: 'customer-claim', label: 'Claim Flow' },
    'customer-eta-tracking': { route: 'customer-receipt', label: 'Receipt' },
    'customer-pay-invoice': { route: 'customer-receipt', label: 'Receipt' },
    'customer-claim': { route: 'customer-receipt', label: 'Receipt + Report' },
    'customer-receipt': { route: 'customer-cover-dashboard', label: 'Cover Dashboard' }
  };
  const getFlowRunnerNext = () => {
    if (!flowRunnerActive || currentScreen === 'flow-runner') return null;
    if (currentScreen === 'job-after-photo' || currentScreen === 'job-condition-check') {
      return isCoverJob
        ? { route: 'cover-job-complete', label: 'Cover Job Complete' }
        : { route: 'job-payment', label: 'Payment' };
    }
    return flowRunnerNextMap[currentScreen] || null;
  };
  const flowRunnerNext = getFlowRunnerNext();
  const goToFlowRunnerNext = () => {
    if (!flowRunnerNext) return;
    const route = flowRunnerNext.route;
    if (route.startsWith('customer-')) {
      setViewMode('customer');
    } else {
      setViewMode('fitter');
    }
    if (route.startsWith('job-') && !activeJob) {
      setActiveJob({ id: 902, customer: 'Emma Davis', plate: 'CD90 VWX', time: '10:30', location: '45 High Street, E1 4QJ', eta: '12 mins', tyreSize: '205/55R16', tyreQty: 2, tyrePositions: ['Front Left', 'Front Right'], depositPaid: true, stockOnVan: true });
      setIsCoverJob(false);
      setBeforePhotos({});
      setAfterPhotos({});
      setCustomerSigned(false);
    }
    navigateTo(route);
  };
  useEffect(() => {
    if (!flowRunnerActive || !flowRunnerAuto || !flowRunnerNext || currentScreen === 'flow-runner') return;
    const t = setTimeout(() => goToFlowRunnerNext(), 1700);
    return () => clearTimeout(t);
  }, [flowRunnerActive, flowRunnerAuto, flowRunnerNext, currentScreen]);

  const mockJobs = [
    { id: 1, customer: 'Emma Davis', plate: 'CD90 VWX', time: '10:30', location: '45 High Street, E1 4QJ', eta: '12 mins', tyreSize: '205/55R16', tyreQty: 2, tyrePositions: ['Front Left', 'Front Right'], depositPaid: true, stockOnVan: true },
    { id: 2, customer: 'Tom Harris', plate: 'EF12 YZA', time: '11:45', location: '78 Mill Road, E2 8PQ', eta: '35 mins', tyreSize: '225/45R17', tyreQty: 4, tyrePositions: ['Front Left', 'Front Right', 'Rear Left', 'Rear Right'], depositPaid: true, stockOnVan: false, depot: 'East London' },
    { id: 3, customer: 'Lisa Chen', plate: 'GH34 BCD', time: '14:00', location: '12 Park Lane, E3 2RS', eta: '1hr 20m', tyreSize: '195/65R15', tyreQty: 1, tyrePositions: ['Front Left'], depositPaid: false, stockOnVan: true }
  ];

  const previousCustomers = [
    { name: 'Emma Davis', mobile: '07700 900123', plate: 'CD90 VWX', vehicle: '2020 BMW 3 Series', lastService: '2 weeks ago' },
    { name: 'Tom Harris', mobile: '07700 900456', plate: 'EF12 YZA', vehicle: '2019 Audi A4', lastService: '1 month ago' },
    { name: 'Lisa Chen', mobile: '07700 900789', plate: 'GH34 BCD', vehicle: '2021 VW Polo', lastService: '3 months ago' },
    { name: 'Dave Williams', mobile: '07700 900321', plate: 'JK56 LMN', vehicle: '2018 Ford Transit', lastService: '6 months ago' },
    { name: 'Sarah Johnson', mobile: '07700 900654', plate: 'PQ78 RST', vehicle: '2022 Mercedes C-Class', lastService: '2 months ago' }
  ];

  const priceHistory = { '205/55R16': { low: 62, high: 75, avg: 68 }, '225/45R17': { low: 72, high: 89, avg: 80 }, '195/65R15': { low: 55, high: 65, avg: 60 } };

  const quickMessages = [
    { text: "I'm 10 mins away", icon: Clock },
    { text: "I'm outside", icon: MapPin },
    { text: 'Job done — thanks!', icon: CheckCircle },
    { text: "On another job, I'll call back", icon: Phone }
  ];

  const mockInvoices = {
    sent: [{ id: 1, customer: 'John Smith', plate: 'AB12 CDE', amount: 89.99, date: '2 hours ago' }],
    pending: [{ id: 2, customer: 'Sarah Jones', plate: 'XY34 FGH', amount: 149.99, date: '1 day ago' }],
    overdue: [{ id: 4, customer: 'David Brown', plate: 'QR78 STU', amount: 124.99, date: '14 days ago', daysOverdue: 7 }]
  };

  const mockStock = [
    { id: 1, size: '205/55R16', brand: 'Michelin', qty: 4, location: 'Van', needsRestock: false },
    { id: 2, size: '225/45R17', brand: 'Continental', qty: 2, location: 'Van', needsRestock: true },
    { id: 3, size: '195/65R15', brand: 'Pirelli', qty: 8, location: 'East London Depot', needsRestock: false },
    { id: 4, size: '215/60R16', brand: 'Goodyear', qty: 1, location: 'East London Depot', needsRestock: false },
    { id: 5, size: '185/60R15', brand: 'Hankook', qty: 0, location: 'Van', needsRestock: true }
  ];

  const mockUpcomingBookingsNeedingStock = [
    { id: 1, customer: 'Tom Harris', date: 'Tomorrow 11:45', tyreSize: '225/45R17', qty: 2, location: 'East London Depot', plate: 'EF12 YZA' },
    { id: 2, customer: 'Karen White', date: 'Thu 13:00', tyreSize: '215/60R16', qty: 1, location: 'East London Depot', plate: 'KL56 MNO' }
  ];

  const mockReviews = [
    { id: 1, name: 'James P.', rating: 5, text: 'Fantastic service! Dan came out within 30 minutes and fitted the tyres perfectly. Will definitely use again.', date: '2 days ago', responded: true, response: 'Thanks James! Glad we could get to you quickly. See you next time.', source: 'google' },
    { id: 2, name: 'Michelle K.', rating: 5, text: 'Great price and very professional. Explained everything clearly.', date: '4 days ago', responded: false, response: '', source: 'google' },
    { id: 3, name: 'Robert T.', rating: 2, text: 'Took longer than expected.', date: '1 week ago', responded: false, response: '', source: 'google' },
    { id: 4, name: 'Sarah J.', rating: 5, text: 'Brilliant. On time, fair price, no mess. What more could you ask for?', date: '1 week ago', responded: true, response: 'Thanks Sarah, appreciate the kind words!', source: 'google' },
    { id: 5, name: 'Tom H.', rating: 4, text: 'Good job overall. Had to wait a bit but quality was spot on.', date: '2 weeks ago', responded: false, response: '', source: 'google' },
    { id: 6, name: 'Lisa C.', rating: 5, text: 'Emergency callout on a Sunday and still came within the hour. Lifesaver!', date: '3 weeks ago', responded: true, response: 'Happy to help Lisa! That\'s what we\'re here for.', source: 'google' }
  ];

  const mockTeamFitters = [
    { id: 1, name: 'Dan Smith', status: 'active', currentJob: 'En route', jobsToday: 3 },
    { id: 2, name: 'Mike Johnson', status: 'active', currentJob: 'Fitting tyres', jobsToday: 2 },
    { id: 3, name: 'Tom Wilson', status: 'offline', currentJob: null, jobsToday: 0 }
  ];

  const mockCoverCustomers = [
    { id: 1, name: 'John Smith', plate: 'AB12 CDE', vehicle: '2019 Ford Focus', tyreSize: '205/55R16', fittedDate: '30 Jan 2026', expires: '28 Feb 2026', status: 'active', reviewLeft: true, reviewStars: 5, tyreCondition: 'Good', treadDepth: '6.2mm', coverJobsDone: 0, phone: '07700 900123', allTyres: [{pos:'FL',size:'205/55R16',brand:'Michelin',dot:'2024',tread:'6.2mm'},{pos:'FR',size:'205/55R16',brand:'Michelin',dot:'2024',tread:'6.0mm'},{pos:'RL',size:'205/55R16',brand:'Continental',dot:'2023',tread:'4.8mm'},{pos:'RR',size:'205/55R16',brand:'Continental',dot:'2023',tread:'4.5mm'}] },
    { id: 2, name: 'Sarah Jones', plate: 'XY34 FGH', vehicle: '2020 VW Golf', tyreSize: '225/45R17', fittedDate: '02 Feb 2026', expires: '04 Mar 2026', status: 'active', reviewLeft: false, reviewStars: null, tyreCondition: 'Good', treadDepth: '7.1mm', coverJobsDone: 0, phone: '07700 900456', allTyres: [{pos:'FL',size:'225/45R17',brand:'Pirelli',dot:'2024',tread:'7.1mm'},{pos:'FR',size:'225/45R17',brand:'Pirelli',dot:'2024',tread:'7.0mm'},{pos:'RL',size:'225/45R17',brand:'Goodyear',dot:'2023',tread:'5.2mm'},{pos:'RR',size:'225/45R17',brand:'Goodyear',dot:'2023',tread:'5.0mm'}] },
    { id: 3, name: 'Mike Palmer', plate: 'CD56 EFG', vehicle: '2018 BMW 3 Series', tyreSize: '225/45R18', fittedDate: '28 Jan 2026', expires: '09 Feb 2026', status: 'expiring', reviewLeft: true, reviewStars: 5, tyreCondition: 'Fair', treadDepth: '3.8mm', coverJobsDone: 1, phone: '07700 900789', allTyres: [{pos:'FL',size:'225/45R18',brand:'Bridgestone',dot:'2023',tread:'3.8mm'},{pos:'FR',size:'225/45R18',brand:'Bridgestone',dot:'2023',tread:'3.5mm'},{pos:'RL',size:'225/45R18',brand:'Dunlop',dot:'2022',tread:'2.9mm'},{pos:'RR',size:'225/45R18',brand:'Dunlop',dot:'2022',tread:'3.1mm'}] },
    { id: 4, name: 'Emma Clarke', plate: 'HJ78 KLM', vehicle: '2021 Audi A3', tyreSize: '225/40R18', fittedDate: '20 Jan 2026', expires: '19 Feb 2026', status: 'expiring', reviewLeft: true, reviewStars: 4, tyreCondition: 'Worn', treadDepth: '2.1mm', coverJobsDone: 0, phone: '07700 900321', allTyres: [{pos:'FL',size:'225/40R18',brand:'Michelin',dot:'2022',tread:'2.1mm'},{pos:'FR',size:'225/40R18',brand:'Michelin',dot:'2022',tread:'2.3mm'},{pos:'RL',size:'225/40R18',brand:'Continental',dot:'2021',tread:'1.8mm'},{pos:'RR',size:'225/40R18',brand:'Continental',dot:'2021',tread:'2.0mm'}] },
    { id: 5, name: 'David Brown', plate: 'QR78 STU', vehicle: '2017 Toyota Corolla', tyreSize: '195/65R15', fittedDate: '01 Jan 2026', expires: '31 Jan 2026', status: 'expired', reviewLeft: false, reviewStars: null, tyreCondition: 'Unknown', treadDepth: null, coverJobsDone: 0, phone: '07700 900654', allTyres: [] },
    { id: 6, name: 'Lisa Patel', plate: 'WX90 YZA', vehicle: '2022 Mercedes A-Class', tyreSize: '225/45R17', fittedDate: '05 Jan 2026', expires: '04 Feb 2026', status: 'expired', reviewLeft: true, reviewStars: 5, tyreCondition: 'Unknown', treadDepth: null, coverJobsDone: 0, phone: '07700 900987', allTyres: [] }
  ];

  // Components
  const ThemeToggle = ({ style: extraStyle = {} }) => (
    <button onClick={() => setDarkMode(!darkMode)} style={{ padding: '8px', background: darkMode ? `${theme.primary}15` : `${theme.primary}10`, border: `1px solid ${darkMode ? theme.primary + '30' : theme.border}`, borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s ease', ...extraStyle }}>
      {darkMode ? <Sun size={18} color={theme.primary} /> : <Moon size={18} color={theme.textMuted} />}
    </button>
  );

  const FontSizeToggle = () => (
    <button onClick={() => { const next = fontSize === 'medium' ? 'large' : 'medium'; setFontSize(next); showToast(next === 'large' ? 'Large text' : 'Normal text'); }} style={{ padding: '4px 8px', background: fontSize === 'large' ? `${theme.primary}15` : `${theme.primary}10`, border: `1px solid ${fontSize === 'large' ? theme.primary + '30' : theme.border}`, borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s ease', minWidth: '36px', height: '36px' }}>
      <span style={{ fontSize: fontSize === 'large' ? '16px' : '13px', fontWeight: '700', color: fontSize === 'large' ? theme.primary : theme.textMuted, lineHeight: 1 }}>Aa</span>
    </button>
  );

  const Header = ({ title, subtitle, showBack = true }) => (
    <div style={{ backgroundColor: theme.bgCard, borderBottom: `1px solid ${theme.border}`, padding: '16px', position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {showBack && <button onClick={goBack} style={{ padding: '8px', marginLeft: '-8px', background: 'none', border: 'none', color: theme.text, cursor: 'pointer' }}><ChevronLeft size={24} /></button>}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: `${20 * theme.fs}px`, fontWeight: 'bold', color: theme.text, margin: 0 }}>{title}</h1>
          {subtitle && <p style={{ fontSize: `${14 * theme.fs}px`, color: theme.textMuted, margin: '4px 0 0 0' }}>{subtitle}</p>}
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <FontSizeToggle />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );

  const BottomNav = () => {
    const alertCount = coverJobs.length + mockCoverCustomers.filter(c => c.status === 'expiring').length;
    return (
    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: theme.bgCard, borderTop: `1px solid ${theme.border}`, padding: '8px 16px 24px', display: 'flex', justifyContent: 'space-around', zIndex: 1000 }}>
      {[{ icon: Home, label: 'Home', screen: 'dashboard' }, { icon: Zap, label: 'Quote', screen: 'quick-quote' }, { icon: CreditCard, label: 'Wallet', screen: 'wallet' }, { icon: Map, label: 'Route', screen: 'route' }, { icon: User, label: 'Account', screen: 'account' }].map(item => {
        const isActive = item.screen === 'account'
          ? (currentScreen === 'account' || currentScreen.startsWith('settings-') || currentScreen === 'wallet' || currentScreen === 'wallet-withdraw' || currentScreen === 'invoices' || currentScreen === 'stock' || currentScreen === 'reviews' || currentScreen === 'disputes' || currentScreen === 'dispute-detail' || currentScreen === 'emergency' || currentScreen === 'evidence-vault' || currentScreen === 'referral' || currentScreen === 'route' || currentScreen === 'dispatcher')
          : item.screen === 'dashboard'
          ? (currentScreen === 'dashboard' || currentScreen === 'job-enroute' || currentScreen === 'job-before-photo' || currentScreen === 'job-after-photo' || currentScreen === 'job-condition-check' || currentScreen === 'job-payment' || currentScreen === 'job-complete' || currentScreen === 'cover-job-complete')
          : item.screen === 'quick-quote'
          ? (currentScreen === 'quote-hub' || currentScreen === 'quick-quote' || currentScreen.startsWith('quote-') || currentScreen === 'cover-quote' || currentScreen === 'quote-sent' || currentScreen === 'bookings')
          : item.screen === 'wallet'
          ? (currentScreen === 'wallet' || currentScreen === 'wallet-withdraw')
          : item.screen === 'route'
          ? currentScreen === 'route'
          : false;
        return (
        <button key={item.screen} onClick={() => navigateTo(item.screen)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '8px 16px', borderRadius: '12px', background: 'none', border: 'none', color: isActive ? theme.primary : theme.textMuted, cursor: 'pointer', position: 'relative' }}>
          <item.icon size={24} />
          {item.screen === 'dashboard' && alertCount > 0 && (
            <div style={{ position: 'absolute', top: '4px', right: '10px', width: '18px', height: '18px', borderRadius: '50%', backgroundColor: theme.danger, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontSize: '10px', fontWeight: '700' }}>{alertCount}</span>
            </div>
          )}
          <span style={{ fontSize: '12px', marginTop: '4px' }}>{item.label}</span>
        </button>
        );
      })}
    </div>
    );
  };

  const Input = ({ label, placeholder, value, onChange, type = 'text', icon: Icon, uppercase = false, required = false }) => (
    <div style={{ marginBottom: '16px' }}>
      {label && <label style={{ display: 'block', fontSize: `${14 * theme.fs}px`, color: theme.textMuted, marginBottom: '8px' }}>{label} {required && <span style={{ color: theme.danger }}>*</span>}</label>}
      <div style={{ position: 'relative' }}>
        {Icon && <Icon size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: theme.textMuted }} />}
        <input type={type} placeholder={placeholder} value={value} onChange={(e) => onChange(uppercase ? e.target.value.toUpperCase() : e.target.value)} style={{ width: '100%', backgroundColor: theme.bgInput, border: `1px solid ${theme.border}`, borderRadius: '12px', padding: Icon ? '16px 16px 16px 48px' : '16px', fontSize: `${16 * theme.fs}px`, color: theme.text, outline: 'none', boxSizing: 'border-box', textTransform: uppercase ? 'uppercase' : 'none' }} />
      </div>
    </div>
  );

  const Button = ({ children, onClick, variant = 'primary', size = 'large', icon: Icon, disabled = false, fullWidth = true }) => {
    const styles = { primary: { backgroundColor: theme.primary, color: '#000' }, secondary: { backgroundColor: theme.bgInput, color: theme.text }, danger: { backgroundColor: theme.danger, color: '#fff' }, success: { backgroundColor: '#22c55e', color: '#fff' }, outline: { backgroundColor: 'transparent', color: theme.primary, border: `2px solid ${theme.primary}` }, ghost: { backgroundColor: 'transparent', color: theme.textMuted }, whatsapp: { backgroundColor: '#25D366', color: '#fff' } };
    return (
      <button onClick={onClick} disabled={disabled} style={{ ...styles[variant], width: fullWidth ? '100%' : 'auto', padding: size === 'large' ? '16px 24px' : size === 'medium' ? '12px 20px' : '8px 16px', borderRadius: '12px', fontSize: `${(size === 'large' ? 16 : 14) * theme.fs}px`, fontWeight: '600', border: variant === 'outline' ? `2px solid ${theme.primary}` : 'none', cursor: disabled ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: disabled ? 0.5 : 1 }}>
        {Icon && <Icon size={size === 'large' ? 20 : 18} />}{children}
      </button>
    );
  };

  const Card = ({ children, onClick, highlight = false, style = {} }) => (
    <div onClick={onClick} style={{ backgroundColor: theme.bgCard, border: `1px solid ${highlight ? theme.primary : theme.border}`, borderRadius: '16px', padding: '16px', marginBottom: '12px', cursor: onClick ? 'pointer' : 'default', fontSize: `${14 * theme.fs}px`, ...style }}>{children}</div>
  );

  const Badge = ({ children, variant = 'default' }) => {
    const colors = { default: { bg: theme.bgInput, text: theme.textMuted }, success: { bg: 'rgba(16,185,129,0.2)', text: theme.primary }, warning: { bg: 'rgba(245,158,11,0.2)', text: theme.warning }, danger: { bg: 'rgba(239,68,68,0.2)', text: theme.danger }, info: { bg: 'rgba(59,130,246,0.2)', text: theme.info } };
    return <span style={{ backgroundColor: colors[variant].bg, color: colors[variant].text, padding: '4px 12px', borderRadius: '20px', fontSize: `${12 * theme.fs}px`, fontWeight: '500' }}>{children}</span>;
  };

  const Toggle = ({ checked, onChange, label }) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0' }}>
      <span style={{ color: theme.text, fontSize: `${14 * theme.fs}px` }}>{label}</span>
      <button onClick={() => onChange(!checked)} style={{ width: '52px', height: '28px', borderRadius: '14px', backgroundColor: checked ? theme.primary : theme.bgInput, border: 'none', cursor: 'pointer', position: 'relative' }}>
        <div style={{ width: '24px', height: '24px', borderRadius: '12px', backgroundColor: '#fff', position: 'absolute', top: '2px', left: checked ? '26px' : '2px', transition: 'all 0.2s' }} />
      </button>
    </div>
  );

  const [activeLegalDoc, setActiveLegalDoc] = useState(null);

  const LegalDocViewer = ({ docKey, onClose }) => {
    const s = { h2: { fontSize: '18px', fontWeight: '700', color: theme.text, margin: '28px 0 12px 0' }, h3: { fontSize: '15px', fontWeight: '600', color: theme.text, margin: '20px 0 8px 0' }, p: { margin: '0 0 12px 0', fontSize: '14px', color: theme.textMuted, lineHeight: 1.7 }, li: { margin: '0 0 8px 0', fontSize: '14px', color: theme.textMuted, lineHeight: 1.7, paddingLeft: '8px' }, strong: { color: theme.text, fontWeight: '600' } };

    const docs = {
      terms: (
        <div>
          <h2 style={{ ...s.h2, marginTop: '0' }}>TYRE-FIT Terms of Service</h2>
          <p style={{ ...s.p, fontSize: '13px', color: theme.textSubtle }}>Last updated: 1 February 2026 · Effective: 1 February 2026</p>
          <p style={s.p}>These Terms of Service ("Terms") govern your use of the TYRE-FIT platform ("Platform"), operated by TYRE-FIT Ltd, a company registered in England and Wales ("TYRE-FIT", "we", "us", "our"). By creating an account, you agree to these Terms.</p>

          <h3 style={s.h3}>1. About TYRE-FIT</h3>
          <p style={s.p}>TYRE-FIT provides mobile tyre fitters and garages ("Fitters") with tools including quoting, invoicing, route planning, stock management, AI-powered tyre scanning, customer communications, Google review automation, dispute protection, and emergency cover coordination.</p>

          <h3 style={s.h3}>2. Your Account</h3>
          <p style={s.p}>2.1. You must be at least 18 years old and operating a legitimate tyre fitting or garage business to register.</p>
          <p style={s.p}>2.2. You are responsible for keeping your login credentials secure. Notify us immediately at support@tyre-fit.co.uk if you suspect unauthorised access.</p>
          <p style={s.p}>2.3. Account holders with the "Owner" role may invite team members ("Fitters") to use the Platform under their business account. Owners are responsible for their team's use of the Platform.</p>

          <h3 style={s.h3}>3. Pricing & Fees</h3>
          <p style={s.p}>3.1. <span style={s.strong}>No monthly subscription.</span> TYRE-FIT is free to use. There are no setup fees, monthly charges, or lock-in contracts.</p>
          <p style={s.p}>3.2. <span style={s.strong}>Booking fee: £5.95 per confirmed booking.</span> When a customer confirms a booking through TYRE-FIT, they pay a £5.95 booking fee. This fee is paid by the customer, not the Fitter. TYRE-FIT retains this fee to cover the cost of operating the Platform, including:</p>
          <div style={{ paddingLeft: '16px' }}>
            <p style={s.li}>• AI-powered tyre scanning technology</p>
            <p style={s.li}>• SMS and WhatsApp notifications to customers (quotes, ETAs, reminders)</p>
            <p style={s.li}>• Free 30-day emergency cover for every customer fitted</p>
            <p style={s.li}>• Automatic Google review request system</p>
            <p style={s.li}>• Dispute protection infrastructure (photo storage, GPS verification)</p>
            <p style={s.li}>• Route planning and GPS optimisation</p>
            <p style={s.li}>• Platform hosting, maintenance, and support</p>
          </div>
          <p style={s.p}>3.3. <span style={s.strong}>Card and QR payment processing: 1.5% + 20p per transaction.</span> This covers Stripe's payment processing fees and is deducted from the payment amount before funds reach your Wallet.</p>
          <p style={s.p}>3.4. <span style={s.strong}>Cash payments: No fee.</span> If the customer pays you in cash, no processing fee applies.</p>
          <p style={s.p}>3.5. <span style={s.strong}>Bank withdrawals: Free.</span> You can transfer your Wallet balance to your linked bank account at any time, at no cost.</p>
          <p style={s.p}>3.6. We may update our fees with 30 days' written notice via email and in-app notification. Continued use of the Platform after the notice period constitutes acceptance of the updated fees.</p>

          <h3 style={s.h3}>4. Payments & Wallet</h3>
          <p style={s.p}>4.1. Card and QR payments from customers are processed by Stripe Payments UK Ltd and deposited into your TYRE-FIT Wallet after processing fees are deducted.</p>
          <p style={s.p}>4.2. You may transfer your Wallet balance to your registered UK bank account at any time. Transfers are typically processed within 1–2 business days.</p>
          <p style={s.p}>4.3. TYRE-FIT does not hold funds on your behalf beyond what is necessary for processing. We are not a bank or e-money institution.</p>

          <h3 style={s.h3}>5. Deposits</h3>
          <p style={s.p}>5.1. When you send a quote through TYRE-FIT, the customer may be asked to pay the £5.95 booking fee to confirm. This acts as confirmation of the booking and reduces no-shows.</p>
          <p style={s.p}>5.2. If a customer cancels with reasonable notice (as defined in our cancellation guidelines), the booking fee may be refunded to the customer at TYRE-FIT's discretion.</p>

          <h3 style={s.h3}>6. Dispute Protection</h3>
          <p style={s.p}>6.1. TYRE-FIT provides a dispute protection system. During each job, the Platform prompts you to take before and after photos. These photos are stored with GPS coordinates, timestamps, and device metadata.</p>
          <p style={s.p}>6.2. In the event of a customer complaint or payment dispute, this evidence may be used to support resolution. TYRE-FIT will review disputes fairly and may request additional information from either party.</p>
          <p style={s.p}>6.3. TYRE-FIT's dispute resolution decisions are made in good faith but are not legally binding. Either party retains the right to pursue matters through appropriate legal channels.</p>

          <h3 style={s.h3}>7. Emergency Cover</h3>
          <p style={s.p}>7.1. Every customer you fit through TYRE-FIT receives 30 days of free emergency cover. This covers flat tyre repair or replacement, locking wheel nut removal, and 24/7 nationwide safe tow to the nearest garage.</p>
          <p style={s.p}>7.2. When a covered customer needs emergency assistance, your quote appears first. If you are unavailable or out of range, the job is offered to the TYRE-FIT Network.</p>
          <p style={s.p}>7.3. Emergency cover is provided at no cost to the Fitter or customer and is funded through the £5.95 booking fee.</p>

          <h3 style={s.h3}>8. Your Obligations</h3>
          <p style={s.p}>8.1. You must hold appropriate insurance for mobile tyre fitting and comply with all applicable UK laws and regulations.</p>
          <p style={s.p}>8.2. You must provide accurate business information and keep it up to date.</p>
          <p style={s.p}>8.3. You must take before and after photos when prompted by the Platform to maintain dispute protection.</p>
          <p style={s.p}>8.4. You must not use the Platform for any unlawful purpose or in any way that could damage, disable, or impair the service.</p>

          <h3 style={s.h3}>9. Cancellation & Account Closure</h3>
          <p style={s.p}>9.1. You may close your account at any time from Settings → Terms & Privacy → Delete My Account & Data.</p>
          <p style={s.p}>9.2. Before deletion, any remaining Wallet balance will be transferred to your linked bank account.</p>
          <p style={s.p}>9.3. Upon closure, your business data will be deleted in accordance with our Privacy Policy. We may retain certain records as required by law (e.g. financial records for HMRC compliance) for up to 7 years.</p>
          <p style={s.p}>9.4. TYRE-FIT may suspend or terminate your account if you breach these Terms, with written notice where practicable.</p>

          <h3 style={s.h3}>10. Limitation of Liability</h3>
          <p style={s.p}>10.1. TYRE-FIT provides the Platform "as is". We do not guarantee uninterrupted service and are not liable for losses arising from downtime, data loss, or technical issues beyond our reasonable control.</p>
          <p style={s.p}>10.2. Our total liability to you in any 12-month period shall not exceed the total booking fees generated through your account in that period.</p>
          <p style={s.p}>10.3. Nothing in these Terms excludes liability for death, personal injury caused by negligence, fraud, or any other liability that cannot be excluded by law.</p>

          <h3 style={s.h3}>11. Changes to These Terms</h3>
          <p style={s.p}>We may update these Terms from time to time. We will notify you of material changes via email and in-app notification at least 14 days before they take effect. Continued use after the effective date constitutes acceptance.</p>

          <h3 style={s.h3}>12. Governing Law</h3>
          <p style={s.p}>These Terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.</p>

          <h3 style={s.h3}>13. Contact</h3>
          <p style={s.p}>TYRE-FIT Ltd · Registered in England & Wales<br />Email: support@tyre-fit.co.uk<br />ICO Registration Number: [pending]</p>
        </div>
      ),
      privacy: (
        <div>
          <h2 style={{ ...s.h2, marginTop: '0' }}>TYRE-FIT Privacy Policy</h2>
          <p style={{ ...s.p, fontSize: '13px', color: theme.textSubtle }}>Last updated: 1 February 2026 · Effective: 1 February 2026</p>
          <p style={s.p}>This Privacy Policy explains how TYRE-FIT Ltd ("TYRE-FIT", "we", "us") collects, uses, stores, and protects your personal data when you use the TYRE-FIT platform. We are committed to protecting your privacy and complying with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.</p>

          <h3 style={s.h3}>1. Who We Are</h3>
          <p style={s.p}>TYRE-FIT Ltd is the data controller for your personal data (data we collect about you as a Fitter). We are registered with the Information Commissioner's Office (ICO).</p>
          <p style={s.p}>For customer data that you enter into the Platform (your customers' names, phone numbers, vehicles), you are the data controller and TYRE-FIT acts as your data processor.</p>

          <h3 style={s.h3}>2. What Data We Collect</h3>
          <p style={s.p}><span style={s.strong}>Account data:</span> Full name, email address, phone number, business name, VAT number (if provided), business logo.</p>
          <p style={s.p}><span style={s.strong}>Location data:</span> GPS coordinates from your device, used for route planning, live ETA updates to customers, and geotagging photos for dispute protection. Location is only tracked while the app is actively in use during jobs.</p>
          <p style={s.p}><span style={s.strong}>Photos:</span> Before and after photos taken during jobs, stored with GPS coordinates, timestamps, and device metadata. Used for dispute protection and quality assurance.</p>
          <p style={s.p}><span style={s.strong}>Vehicle data:</span> Customer vehicle registration numbers, used for DVSA MOT history lookups and tyre size matching.</p>
          <p style={s.p}><span style={s.strong}>Financial data:</span> Bank account details for Wallet withdrawals (stored securely by Stripe). We do not store card numbers or payment credentials.</p>
          <p style={s.p}><span style={s.strong}>Usage data:</span> How you interact with the Platform (screens visited, features used), used to improve the service. This data is anonymised where possible.</p>
          <p style={s.p}><span style={s.strong}>Communications:</span> Messages sent through the Platform, support requests, and feedback.</p>

          <h3 style={s.h3}>3. How We Use Your Data</h3>
          <p style={s.p}>We use your data to:</p>
          <div style={{ paddingLeft: '16px' }}>
            <p style={s.li}>• Provide the TYRE-FIT service (quoting, invoicing, route planning, stock management)</p>
            <p style={s.li}>• Send SMS and WhatsApp notifications to your customers on your behalf</p>
            <p style={s.li}>• Process payments through Stripe</p>
            <p style={s.li}>• Provide dispute protection through geotagged, timestamped photos</p>
            <p style={s.li}>• Request Google reviews from customers after jobs</p>
            <p style={s.li}>• Coordinate emergency cover for your customers</p>
            <p style={s.li}>• Improve the Platform and fix technical issues</p>
            <p style={s.li}>• Comply with legal obligations (e.g. HMRC financial record-keeping)</p>
          </div>
          <p style={s.p}>Our legal bases for processing are: performance of our contract with you (Terms of Service), your consent (where applicable), our legitimate interests in operating and improving the Platform, and legal obligations.</p>

          <h3 style={s.h3}>4. Third-Party Processors</h3>
          <p style={s.p}>We share data with the following processors, all of whom are contractually bound to protect your data:</p>
          <div style={{ paddingLeft: '16px' }}>
            <p style={s.li}>• <span style={s.strong}>Stripe</span> (Stripe Payments UK Ltd) — payment processing, bank transfers, financial compliance</p>
            <p style={s.li}>• <span style={s.strong}>Twilio</span> (Twilio Ireland Ltd) — SMS and WhatsApp message delivery</p>
            <p style={s.li}>• <span style={s.strong}>Google</span> (Google Ireland Ltd) — Google Business Profile integration, reviews, maps</p>
            <p style={s.li}>• <span style={s.strong}>Cloudflare</span> (Cloudflare Ltd) — R2 object storage for photos, CDN for app delivery</p>
            <p style={s.li}>• <span style={s.strong}>DVSA</span> — MOT history and vehicle data lookups (public API)</p>
          </div>

          <h3 style={s.h3}>5. Data Storage & Security</h3>
          <p style={s.p}>Your data is stored securely within the UK and European Economic Area (EEA). We use industry-standard encryption (TLS in transit, AES-256 at rest), access controls, and regular security audits.</p>
          <p style={s.p}>Photos are stored in Cloudflare R2 with server-side encryption. Payment data is handled entirely by Stripe and never stored on TYRE-FIT servers.</p>

          <h3 style={s.h3}>6. Data Retention</h3>
          <p style={s.p}><span style={s.strong}>Account data:</span> Retained while your account is active, deleted within 30 days of account closure.</p>
          <p style={s.p}><span style={s.strong}>Job photos:</span> Retained for 12 months after the job, then automatically deleted, unless a dispute is open.</p>
          <p style={s.p}><span style={s.strong}>Financial records:</span> Retained for 7 years as required by HMRC.</p>
          <p style={s.p}><span style={s.strong}>Usage data:</span> Anonymised after 12 months.</p>

          <h3 style={s.h3}>7. Your Rights</h3>
          <p style={s.p}>Under UK GDPR, you have the right to:</p>
          <div style={{ paddingLeft: '16px' }}>
            <p style={s.li}>• <span style={s.strong}>Access</span> — request a copy of all data we hold about you</p>
            <p style={s.li}>• <span style={s.strong}>Rectification</span> — correct inaccurate data</p>
            <p style={s.li}>• <span style={s.strong}>Erasure</span> — request deletion of your data ("right to be forgotten")</p>
            <p style={s.li}>• <span style={s.strong}>Portability</span> — receive your data in a machine-readable format</p>
            <p style={s.li}>• <span style={s.strong}>Restriction</span> — limit how we process your data</p>
            <p style={s.li}>• <span style={s.strong}>Object</span> — object to processing based on legitimate interests</p>
            <p style={s.li}>• <span style={s.strong}>Withdraw consent</span> — where processing is based on consent, you can withdraw it at any time</p>
          </div>
          <p style={s.p}>You can exercise these rights from Settings → Terms & Privacy, or by emailing privacy@tyre-fit.co.uk. We will respond within 30 days.</p>

          <h3 style={s.h3}>8. Customer Data (You as Controller)</h3>
          <p style={s.p}>When you enter customer information into TYRE-FIT (names, phone numbers, vehicle registrations), you are the data controller for that data under UK GDPR. TYRE-FIT processes this data on your behalf as a data processor.</p>
          <p style={s.p}>This means:</p>
          <div style={{ paddingLeft: '16px' }}>
            <p style={s.li}>• The data belongs to your business, not to TYRE-FIT</p>
            <p style={s.li}>• You are responsible for having a lawful basis to collect and process customer data</p>
            <p style={s.li}>• You can export all customer data at any time (Account → Export Customer List)</p>
            <p style={s.li}>• You can request deletion of all customer data at any time</p>
            <p style={s.li}>• TYRE-FIT will only process customer data as instructed by you and as necessary to provide the service</p>
          </div>
          <p style={s.p}>A Data Processing Agreement (DPA) is available in the GDPR Toolkit, downloadable from Settings → Terms & Privacy.</p>

          <h3 style={s.h3}>9. Children's Data</h3>
          <p style={s.p}>TYRE-FIT is a business-to-business service and is not intended for use by anyone under 18. We do not knowingly collect data from minors.</p>

          <h3 style={s.h3}>10. Changes to This Policy</h3>
          <p style={s.p}>We may update this policy from time to time. We will notify you of material changes via email and in-app notification. The "Last updated" date at the top will always reflect the current version.</p>

          <h3 style={s.h3}>11. Contact & Complaints</h3>
          <p style={s.p}>Data Protection queries: privacy@tyre-fit.co.uk<br />General support: support@tyre-fit.co.uk</p>
          <p style={s.p}>If you are not satisfied with our response, you have the right to lodge a complaint with the Information Commissioner's Office (ICO) at ico.org.uk.</p>

          <p style={s.p}>TYRE-FIT Ltd · Registered in England & Wales · ICO Registered</p>
        </div>
      ),
      cookies: (
        <div>
          <h2 style={{ ...s.h2, marginTop: '0' }}>TYRE-FIT Cookie Policy</h2>
          <p style={{ ...s.p, fontSize: '13px', color: theme.textSubtle }}>Last updated: 1 February 2026</p>
          <p style={s.p}>This Cookie Policy explains how TYRE-FIT Ltd ("TYRE-FIT", "we") uses cookies and similar technologies when you use the TYRE-FIT platform.</p>

          <h3 style={s.h3}>1. What Are Cookies</h3>
          <p style={s.p}>Cookies are small text files stored on your device when you use a website or app. They help the service function properly and can improve your experience.</p>

          <h3 style={s.h3}>2. Cookies We Use</h3>
          <p style={s.p}><span style={s.strong}>Essential cookies (always active):</span></p>
          <div style={{ paddingLeft: '16px' }}>
            <p style={s.li}>• <span style={s.strong}>Session cookie</span> — keeps you logged in while using the app</p>
            <p style={s.li}>• <span style={s.strong}>Security cookie</span> — prevents cross-site request forgery (CSRF protection)</p>
            <p style={s.li}>• <span style={s.strong}>Preferences cookie</span> — remembers your settings (e.g. dark/light mode)</p>
          </div>
          <p style={s.p}><span style={s.strong}>Analytics cookies (optional):</span></p>
          <div style={{ paddingLeft: '16px' }}>
            <p style={s.li}>• Anonymous usage analytics to help us understand which features are used most and where we can improve. No personal data is included. You can opt out from Settings → Terms & Privacy → Privacy Controls.</p>
          </div>

          <h3 style={s.h3}>3. What We Don't Use</h3>
          <p style={s.p}>We do not use third-party advertising cookies, tracking pixels, social media cookies, or any cookie that builds a profile of you across other websites. We do not sell or share cookie data with advertisers.</p>

          <h3 style={s.h3}>4. Managing Cookies</h3>
          <p style={s.p}>Essential cookies cannot be disabled as the app requires them to function. Analytics cookies can be toggled off from Settings → Terms & Privacy → Privacy Controls.</p>
          <p style={s.p}>You can also manage cookies through your device browser settings, though this may affect app functionality.</p>

          <h3 style={s.h3}>5. Contact</h3>
          <p style={s.p}>Questions about cookies: privacy@tyre-fit.co.uk</p>
          <p style={s.p}>TYRE-FIT Ltd · Registered in England & Wales · ICO Registered</p>
        </div>
      ),
      customerdata: (
        <div>
          <h2 style={{ ...s.h2, marginTop: '0' }}>Customer Data — Your Data, Your Control</h2>
          <p style={{ ...s.p, fontSize: '13px', color: theme.textSubtle }}>Last updated: 1 February 2026</p>
          <p style={s.p}>This document explains how customer data works within TYRE-FIT, your responsibilities as a data controller, and how we protect the information you entrust to us.</p>

          <h3 style={s.h3}>1. Who Owns the Data</h3>
          <p style={s.p}>Customer data you enter into TYRE-FIT — names, phone numbers, vehicle registrations, addresses, job history — <span style={s.strong}>belongs to your business</span>. TYRE-FIT does not own, sell, or share your customer data with anyone.</p>
          <p style={s.p}>Under UK GDPR, you are the <span style={s.strong}>data controller</span> for your customers' personal data. TYRE-FIT is your <span style={s.strong}>data processor</span>, meaning we store and process it only on your instructions and only as needed to provide the service.</p>

          <h3 style={s.h3}>2. What We Store</h3>
          <div style={{ paddingLeft: '16px' }}>
            <p style={s.li}>• <span style={s.strong}>Customer name</span> — to identify them in quotes, invoices, and communications</p>
            <p style={s.li}>• <span style={s.strong}>Phone number</span> — to send SMS/WhatsApp quotes, ETAs, and review requests on your behalf</p>
            <p style={s.li}>• <span style={s.strong}>Vehicle registration</span> — for DVSA MOT lookups and tyre size matching</p>
            <p style={s.li}>• <span style={s.strong}>Address/location</span> — for route planning and job records</p>
            <p style={s.li}>• <span style={s.strong}>Job history</span> — dates, services performed, photos, invoices</p>
            <p style={s.li}>• <span style={s.strong}>Payment records</span> — amounts and payment method (card details handled by Stripe, never stored by us)</p>
          </div>

          <h3 style={s.h3}>3. How We Protect It</h3>
          <p style={s.p}>All customer data is encrypted in transit (TLS 1.3) and at rest (AES-256). Data is stored within the UK/EEA. Access is restricted to essential personnel only, with audit logging on all access.</p>
          <p style={s.p}>Photos are stored in Cloudflare R2 with server-side encryption and are only accessible to you and, in the event of a dispute, to the TYRE-FIT support team.</p>

          <h3 style={s.h3}>4. What We Do With It</h3>
          <p style={s.p}>We only process customer data to provide the TYRE-FIT service to you:</p>
          <div style={{ paddingLeft: '16px' }}>
            <p style={s.li}>• Sending quotes and invoices via SMS/WhatsApp</p>
            <p style={s.li}>• Sending ETA notifications ("Your fitter is 15 minutes away")</p>
            <p style={s.li}>• Requesting Google reviews after completed jobs</p>
            <p style={s.li}>• Processing payments through Stripe</p>
            <p style={s.li}>• Providing emergency cover coordination</p>
            <p style={s.li}>• Generating business reports and analytics for your dashboard</p>
          </div>
          <p style={s.p}>We <span style={s.strong}>never</span> use your customer data for our own marketing, sell it to third parties, or share it with other Fitters on the platform.</p>

          <h3 style={s.h3}>5. Your Rights Over Customer Data</h3>
          <p style={s.p}><span style={s.strong}>Export anytime:</span> Go to Account → Export Customer List to download a full CSV of all your customer data. It's your data — take it whenever you need it.</p>
          <p style={s.p}><span style={s.strong}>Delete anytime:</span> You can request deletion of individual customers or all customer data from Settings → Terms & Privacy → Delete My Account & Data.</p>
          <p style={s.p}><span style={s.strong}>Portability:</span> If you leave TYRE-FIT, you can export everything first. We will delete your customer data within 30 days of account closure.</p>

          <h3 style={s.h3}>6. Your Responsibilities</h3>
          <p style={s.p}>As the data controller for your customers' data, you have legal responsibilities under UK GDPR:</p>
          <div style={{ paddingLeft: '16px' }}>
            <p style={s.li}>• You should have a lawful basis for collecting customer data (typically "legitimate interests" or "performance of a contract" for service-related communications)</p>
            <p style={s.li}>• If a customer asks you to delete their data, you should do so</p>
            <p style={s.li}>• If you export customer data, you must handle it securely and in compliance with data protection law</p>
          </div>
          <p style={s.p}>We provide a free GDPR Toolkit (downloadable from Settings → Terms & Privacy) with template privacy notices you can share with your customers, and a Data Processing Agreement (DPA) for your records.</p>

          <h3 style={s.h3}>7. Contact</h3>
          <p style={s.p}>Questions about customer data: privacy@tyre-fit.co.uk</p>
          <p style={s.p}>TYRE-FIT Ltd · Registered in England & Wales · ICO Registered</p>
        </div>
      ),
      fees: (
        <div>
          <h2 style={{ ...s.h2, marginTop: '0' }}>Where the £5.95 Booking Fee Goes</h2>
          <p style={{ ...s.p, fontSize: '13px', color: theme.textSubtle }}>Last updated: 1 February 2026</p>
          <p style={s.p}>TYRE-FIT charges no monthly fees, no setup fees, and no lock-in contracts. The only fee is £5.95 per confirmed booking, paid by the customer — not the Fitter.</p>

          <h3 style={s.h3}>What It Covers</h3>
          <p style={s.p}>The £5.95 funds everything needed to run the TYRE-FIT platform for you:</p>

          <p style={s.p}><span style={s.strong}>AI Tyre Scanning</span></p>
          <p style={s.p}>The camera-based scanning system that reads tyre size, brand, and condition. This uses machine learning models that require ongoing compute costs to run and improve.</p>

          <p style={s.p}><span style={s.strong}>SMS & WhatsApp Notifications</span></p>
          <p style={s.p}>Every quote, booking confirmation, ETA update ("Your fitter is 15 minutes away"), and review request sent to your customers costs money to deliver through Twilio. A busy fitter can generate 20+ messages per day — this adds up.</p>

          <p style={s.p}><span style={s.strong}>Free Emergency Cover</span></p>
          <p style={s.p}>Every customer you fit through TYRE-FIT gets 30 days of free emergency cover worth up to £300. This covers flat tyre repair or replacement, locking wheel nut removal, and 24/7 nationwide safe tow. When they need help, your quote appears first — keeping the customer with you.</p>

          <p style={s.p}><span style={s.strong}>Automatic Google Reviews</span></p>
          <p style={s.p}>After every job, TYRE-FIT automatically sends a review request to the customer, helping build your Google Business Profile rating without you having to ask.</p>

          <p style={s.p}><span style={s.strong}>Dispute Protection</span></p>
          <p style={s.p}>Before and after photos are stored with GPS coordinates and timestamps in encrypted cloud storage (Cloudflare R2). This infrastructure protects you from chargebacks and false complaints.</p>

          <p style={s.p}><span style={s.strong}>Route Planning & GPS</span></p>
          <p style={s.p}>Optimised route planning, live GPS tracking for customer ETAs, and depot-to-van stock calculations all require ongoing mapping API costs.</p>

          <p style={s.p}><span style={s.strong}>Platform Infrastructure</span></p>
          <p style={s.p}>Server hosting, database management, security monitoring, SSL certificates, backups, customer support, and ongoing development of new features.</p>

          <h3 style={s.h3}>Other Fees</h3>
          <p style={s.p}><span style={s.strong}>Card/QR payments:</span> 1.5% + 20p per transaction. This is Stripe's processing fee, deducted before funds reach your Wallet.</p>
          <p style={s.p}><span style={s.strong}>Cash payments:</span> No fee.</p>
          <p style={s.p}><span style={s.strong}>Bank withdrawals:</span> Free, anytime.</p>
          <p style={s.p}><span style={s.strong}>Monthly subscription:</span> None. Never.</p>

          <h3 style={s.h3}>Fee Changes</h3>
          <p style={s.p}>If we ever need to change the booking fee, we will give you at least 30 days' notice by email and in-app notification. You can close your account at any time with no penalty.</p>

          <p style={s.p}>TYRE-FIT Ltd · Registered in England & Wales</p>
        </div>
      )
    };

    return (
      <div style={{ position: 'fixed', inset: 0, backgroundColor: theme.bg, zIndex: 3000, display: 'flex', flexDirection: 'column' }}>
        <div style={{ backgroundColor: theme.bgCard, borderBottom: `1px solid ${theme.border}`, padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={onClose} style={{ padding: '8px', marginLeft: '-8px', background: 'none', border: 'none', color: theme.text, cursor: 'pointer' }}><ChevronLeft size={24} /></button>
          <h1 style={{ fontSize: '18px', fontWeight: 'bold', color: theme.text, margin: 0 }}>
            {docKey === 'terms' && 'Terms of Service'}
            {docKey === 'privacy' && 'Privacy Policy'}
            {docKey === 'cookies' && 'Cookie Policy'}
            {docKey === 'customerdata' && 'Customer Data'}
            {docKey === 'fees' && 'Fees Explained'}
          </h1>
        </div>
        <div style={{ flex: 1, overflow: 'auto', padding: '24px', paddingBottom: '80px' }}>
          <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            {docs[docKey]}
          </div>
        </div>
      </div>
    );
  };

  const ProgressSteps = ({ steps, currentStep }) => (
    <div style={{ display: 'flex', gap: '8px', padding: '16px' }}>
      {steps.map((step, i) => (
        <div key={i} style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ height: '4px', borderRadius: '2px', backgroundColor: i <= currentStep ? theme.primary : theme.bgInput, marginBottom: '8px', opacity: i === currentStep ? 0.5 : 1 }} />
          <span style={{ fontSize: '10px', color: i <= currentStep ? theme.primary : theme.textMuted }}>{step}</span>
        </div>
      ))}
    </div>
  );

  // ============================================
  // SIGN IN SCREEN
  // ============================================
  const SignInScreen = () => {
    const [step, setStep] = useState(1);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    
    return (
      <div style={{ minHeight: '100vh', backgroundColor: theme.bg, padding: '24px', display: 'flex', flexDirection: 'column' }}>
        <Toast />
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          <FontSizeToggle />
          <ThemeToggle />
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: '400px', margin: '0 auto', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{ width: '80px', height: '80px', background: `linear-gradient(135deg, ${theme.primary}, #059669)`, borderRadius: '20px', margin: '0 auto 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '8px' }}>
              <span style={{ fontSize: '15px', fontWeight: '900', color: '#fff', letterSpacing: '1px', lineHeight: 1 }}>TYRE</span>
              <div style={{ width: '36px', height: '2px', backgroundColor: '#fff', margin: '3px 0', borderRadius: '1px' }} />
              <span style={{ fontSize: '18px', fontWeight: '900', color: '#fff', letterSpacing: '2px', lineHeight: 1 }}>FIT</span>
            </div>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: theme.text, margin: '0 0 8px 0' }}>TYRE-FIT</h1>
            <p style={{ color: theme.textMuted, margin: 0 }}>Mobile Tyre Management</p>
          </div>

          {step === 1 && (
            <div>
              <Input label="Mobile Number" placeholder="07700 900123" type="tel" value={signUpData.mobile} onChange={(v) => setSignUpData({...signUpData, mobile: v})} required />
              <Button onClick={() => setStep(2)}>Send Verification Code</Button>
            </div>
          )}

          {step === 2 && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '600', color: theme.text, margin: '0 0 8px 0' }}>Enter Verification Code</h2>
                <p style={{ color: theme.textMuted, margin: 0 }}>We sent a code to {signUpData.mobile || 'your mobile'}</p>
              </div>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '32px' }}>
                {otp.map((digit, i) => (
                  <input key={i} type="text" maxLength={1} value={digit} onChange={(e) => { const newOtp = [...otp]; newOtp[i] = e.target.value; setOtp(newOtp); }}
                    style={{ width: '48px', height: '56px', backgroundColor: theme.bgInput, border: `1px solid ${theme.border}`, borderRadius: '12px', fontSize: '24px', textAlign: 'center', color: theme.text, outline: 'none' }} />
                ))}
              </div>
              <Button onClick={() => navigateTo('welcome')}>Verify & Continue</Button>
              <button onClick={() => showToast('Code resent')} style={{ width: '100%', padding: '16px', marginTop: '12px', background: 'none', border: 'none', color: theme.textMuted, fontSize: '14px', cursor: 'pointer' }}>Resend code</button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ============================================
  // WELCOME SCREEN - BEFORE Google Business and business setup
  // ============================================
  /* DEV NOTE: Welcome screen is a swipeable tour shown on first launch only.
     After setup, the full feature list is accessible from Help & Support > "What TYRE-FIT Does".
     The tour is the conversion tool — keep it punchy. The feature list is for detail seekers. */
  const WelcomeScreen = () => {
    const [tourStep, setTourStep] = useState(0);
    
    const tourSlides = [
      {
        icon: Wrench,
        color: theme.primary,
        title: 'You Fit The Tyres. We Handle The Rest.',
        subtitle: 'Full system in one paragraph.',
        desc: 'Quote fast, get deposit, run the job, take proof photos once, get paid, trigger review requests, and keep customers returning with built-in 30-day emergency cover.',
      },
      {
        icon: PoundSterling,
        color: theme.primary,
        title: 'Completely Free to Use',
        subtitle: 'No subscription. No monthly fee. No contract.',
        desc: 'The customer pays a small booking fee when they confirm a quote. That covers the app, the tech, and their free emergency cover. You pay nothing.',
      },
      {
        icon: Shield,
        color: '#ef4444',
        title: 'Free Cover on Every Quote',
        subtitle: '30 days emergency tyre cover, included automatically.',
        desc: 'Every quote you send includes free cover for the customer. TYRE-FIT provides it and pays you directly for callouts. Customers are far more likely to book when cover is included.',
      },
      {
        icon: Camera,
        color: theme.primary,
        title: '4 Photos. Job Done.',
        subtitle: 'One set of photos does everything.',
        desc: 'Before photos prove the car\'s state. After photos (4 tyres + plate) create dispute evidence, a condition report, 30-day cover activation, and tyre monitoring — all automatically.',
      },
      {
        icon: MessageSquare,
        color: '#06b6d4',
        title: 'Missed Calls + SMS AI',
        subtitle: 'Quotes start even when you miss the call.',
        desc: 'When you miss a call or get a text like "need tyres AB12 CDE", TYRE-FIT creates a draft quote automatically for one-tap send.',
      },
    ];

    const slide = tourSlides[tourStep];
    const SlideIcon = slide.icon;
    const isLast = tourStep === tourSlides.length - 1;

    return (
      <div style={{ minHeight: '100vh', backgroundColor: theme.bg, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '16px 24px 0', gap: '8px' }}>
          <FontSizeToggle />
          <ThemeToggle />
        </div>

        {/* SKIP */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 24px' }}>
          <button onClick={() => navigateTo('business-setup')} style={{ background: 'none', border: 'none', color: theme.textMuted, fontSize: '14px', cursor: 'pointer', padding: '8px 0' }}>Skip tour</button>
        </div>

        {/* SLIDE CONTENT */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center' }}>
          {/* ICON */}
          <div style={{ width: '100px', height: '100px', borderRadius: '28px', backgroundColor: `${slide.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px' }}>
            <SlideIcon size={48} color={slide.color} />
          </div>

          {/* TITLE */}
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: theme.text, margin: '0 0 8px 0', lineHeight: 1.2 }}>{slide.title}</h1>
          <p style={{ fontSize: '16px', color: theme.primary, fontWeight: '600', margin: '0 0 16px 0' }}>{slide.subtitle}</p>
          <p style={{ fontSize: '15px', color: theme.textMuted, lineHeight: 1.7, margin: 0, maxWidth: '340px' }}>{slide.desc}</p>
        </div>

        {/* DOTS + BUTTONS */}
        <div style={{ padding: '24px', paddingBottom: '40px' }}>
          {/* DOTS */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
            {tourSlides.map((_, i) => (
              <button key={i} onClick={() => setTourStep(i)} style={{ width: i === tourStep ? '24px' : '8px', height: '8px', borderRadius: '4px', backgroundColor: i === tourStep ? theme.primary : `${theme.textMuted}40`, border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', padding: 0 }} />
            ))}
          </div>

          {/* BUTTONS */}
          {isLast ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Button onClick={() => navigateTo('business-setup')}>Set Up My Business</Button>
              <Button variant="outline" onClick={() => navigateTo('practice-mode')}>Try Practice Mode First</Button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '12px' }}>
              {tourStep > 0 && (
                <Button variant="secondary" onClick={() => setTourStep(tourStep - 1)}>Back</Button>
              )}
              <Button onClick={() => setTourStep(tourStep + 1)}>Next</Button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ============================================
  // BUSINESS SETUP - Multiple depots, max 25 mile radius
  // ============================================
  const BusinessSetupScreen = () => {
    const addDepot = () => setSignUpData({...signUpData, depots: [...signUpData.depots, { name: `Depot ${signUpData.depots.length + 1}`, address: '', radius: 15 }]});
    const updateDepot = (i, field, val) => { const d = [...signUpData.depots]; d[i][field] = val; setSignUpData({...signUpData, depots: d}); };
    const removeDepot = (i) => { if (signUpData.depots.length > 1) setSignUpData({...signUpData, depots: signUpData.depots.filter((_, idx) => idx !== i)}); };
    
    return (
      <div style={{ minHeight: '100vh', backgroundColor: theme.bg }}>
        <Toast />
        <Header title="Business Setup" subtitle="Tell us about your services" />
        <div style={{ padding: '24px', paddingBottom: '120px' }}>
          
          {showSetupTips && (
            <SetupTip icon={Info} title="Why we need this" accent={theme.primary}>
              This info powers your customer-facing quotes, invoices, and booking pages. You can change everything later in Settings.
            </SetupTip>
          )}
          
          <Input label="Business Name" placeholder="Dan's Mobile Tyres" value={signUpData.businessName} onChange={(v) => setSignUpData({...signUpData, businessName: v})} required />
          <Input label="VAT Number (optional)" placeholder="GB123456789" value={signUpData.vatNumber} onChange={(v) => setSignUpData({...signUpData, vatNumber: v})} />
          <Input label="Address Line 1" placeholder="123 High Street" value={signUpData.addressLine1} onChange={(v) => setSignUpData({...signUpData, addressLine1: v})} required />
          <Input label="Address Line 2 (optional)" placeholder="Unit 4" value={signUpData.addressLine2} onChange={(v) => setSignUpData({...signUpData, addressLine2: v})} />
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ flex: 2 }}><Input label="City" placeholder="London" value={signUpData.city} onChange={(v) => setSignUpData({...signUpData, city: v})} required /></div>
            <div style={{ flex: 1 }}><Input label="Postcode" placeholder="E1 4QJ" value={signUpData.businessPostcode} onChange={(v) => setSignUpData({...signUpData, businessPostcode: v.toUpperCase()})} required /></div>
          </div>
          
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '14px', color: theme.textMuted, marginBottom: '12px' }}>Business Logo</label>
            <button onClick={() => { setSignUpData({...signUpData, logoUploaded: !signUpData.logoUploaded}); showToast(signUpData.logoUploaded ? 'Logo removed' : 'Logo uploaded'); }} style={{ width: '100%', padding: signUpData.logoUploaded ? '16px' : '32px', backgroundColor: signUpData.logoUploaded ? `${theme.primary}10` : theme.bgInput, border: `2px ${signUpData.logoUploaded ? 'solid' : 'dashed'} ${signUpData.logoUploaded ? theme.primary : theme.border}`, borderRadius: '12px', color: theme.textMuted, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              {signUpData.logoUploaded ? (
                <><div style={{ width: '64px', height: '64px', borderRadius: '12px', backgroundColor: theme.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ color: '#000', fontWeight: '700', fontSize: '20px' }}>{(signUpData.businessName || 'DM')[0]}{(signUpData.businessName || 'DM').split(' ')[1]?.[0] || 'T'}</span></div><span style={{ color: theme.primary, fontWeight: '500' }}>Logo uploaded — tap to change</span></>
              ) : (
                <><Upload size={32} /><span>Upload logo or pull from GMB</span></>
              )}
            </button>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '14px', color: theme.textMuted, marginBottom: '12px' }}>Services Offered</label>
            {showSetupTips && (
              <SetupTip icon={CheckCircle} title="These appear on your booking page">
                Customers see which services you offer when they view your quote. Turn on what you do — you can add more later.
              </SetupTip>
            )}
            <Card>
              <Toggle label="Tyre Replacement" checked={signUpData.services.tyreFitting} onChange={(v) => setSignUpData({...signUpData, services: {...signUpData.services, tyreFitting: v}})} />
              <Toggle label="Puncture Repairs" checked={signUpData.services.punctureRepairs} onChange={(v) => setSignUpData({...signUpData, services: {...signUpData.services, punctureRepairs: v}})} />
              <Toggle label="Fit Only (customer has own tyres)" checked={signUpData.services.fitOnly} onChange={(v) => setSignUpData({...signUpData, services: {...signUpData.services, fitOnly: v}})} />
              <Toggle label="Tyre Rotation" checked={signUpData.services.tyreRotation} onChange={(v) => setSignUpData({...signUpData, services: {...signUpData.services, tyreRotation: v}})} />
              <Toggle label="TPMS Sensors" checked={signUpData.services.tpms} onChange={(v) => setSignUpData({...signUpData, services: {...signUpData.services, tpms: v}})} />
            </Card>

            <label style={{ display: 'block', fontSize: '14px', color: theme.textMuted, marginBottom: '12px', marginTop: '24px' }}>Standard Pricing</label>
            {showSetupTips && (
              <SetupTip icon={Info} title="These appear on every quote">
                Customers see these as line items on every quote. Set your prices or mark as free — great for advertising "free balancing included".
              </SetupTip>
            )}
            <Card>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { key: 'digitalBalancing', label: 'Digital Balancing', priceKey: 'digitalBalancingPrice', freeKey: 'digitalBalancingFree', perTyre: true },
                  { key: 'newValves', label: 'New Valves', priceKey: 'newValvesPrice', freeKey: 'newValvesFree', perTyre: true },
                  { key: 'disposal', label: 'Old Tyre Eco Disposal', priceKey: 'oldTyreDisposalPrice', freeKey: 'disposalFree', perTyre: true }
                ].map((item, idx) => (
                  <div key={item.key} style={{ borderTop: idx > 0 ? `1px solid ${theme.border}` : 'none', paddingTop: idx > 0 ? '16px' : 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <div><p style={{ margin: 0, color: theme.text, fontWeight: '500' }}>{item.label}</p><p style={{ margin: '2px 0 0 0', color: theme.textMuted, fontSize: '12px' }}>Per tyre — shown on every quote</p></div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <button onClick={() => setSignUpData({...signUpData, pricing: {...signUpData.pricing, [item.freeKey]: false}})} style={{ flex: 1, padding: '12px', backgroundColor: !signUpData.pricing[item.freeKey] ? `${theme.primary}15` : theme.bgInput, border: `2px solid ${!signUpData.pricing[item.freeKey] ? theme.primary : theme.border}`, borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        <span style={{ color: !signUpData.pricing[item.freeKey] ? theme.primary : theme.text, fontWeight: '600', fontSize: '14px' }}>£</span>
                        <input type="number" placeholder="0.00" value={signUpData.pricing[item.priceKey]} onChange={(e) => setSignUpData({...signUpData, pricing: {...signUpData.pricing, [item.priceKey]: e.target.value, [item.freeKey]: false}})} style={{ width: '60px', backgroundColor: 'transparent', border: 'none', color: theme.text, fontSize: '16px', fontWeight: '600', outline: 'none', textAlign: 'center' }} />
                      </button>
                      <button onClick={() => setSignUpData({...signUpData, pricing: {...signUpData.pricing, [item.freeKey]: true}})} style={{ padding: '12px 20px', backgroundColor: signUpData.pricing[item.freeKey] ? `${theme.primary}15` : theme.bgInput, border: `2px solid ${signUpData.pricing[item.freeKey] ? theme.primary : theme.border}`, borderRadius: '10px', cursor: 'pointer' }}>
                        <span style={{ color: signUpData.pricing[item.freeKey] ? theme.primary : theme.textMuted, fontWeight: '600', fontSize: '14px' }}>FREE</span>
                      </button>
                    </div>
                  </div>
                ))}
                <div style={{ borderTop: `1px solid ${theme.border}`, paddingTop: '16px', marginTop: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div><p style={{ margin: 0, color: theme.text, fontWeight: '500' }}>Locking Wheel Nut Removal</p><p style={{ margin: '2px 0 0 0', color: theme.textMuted, fontSize: '12px' }}>Do you offer this service?</p></div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button onClick={() => setSignUpData({...signUpData, services: {...signUpData.services, lwnRemoval: true}})} style={{ flex: 1, padding: '12px', backgroundColor: signUpData.services.lwnRemoval !== false ? `${theme.primary}15` : theme.bgInput, border: `2px solid ${signUpData.services.lwnRemoval !== false ? theme.primary : theme.border}`, borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      <span style={{ color: signUpData.services.lwnRemoval !== false ? theme.primary : theme.text, fontWeight: '600', fontSize: '14px' }}>Yes — £</span>
                      <input type="number" placeholder="25" value={signUpData.pricing.lwnRemovalPrice} onChange={(e) => setSignUpData({...signUpData, pricing: {...signUpData.pricing, lwnRemovalPrice: e.target.value}, services: {...signUpData.services, lwnRemoval: true}})} style={{ width: '60px', backgroundColor: 'transparent', border: 'none', color: theme.text, fontSize: '16px', fontWeight: '600', outline: 'none', textAlign: 'center' }} />
                    </button>
                    <button onClick={() => setSignUpData({...signUpData, services: {...signUpData.services, lwnRemoval: false}})} style={{ padding: '12px 20px', backgroundColor: signUpData.services.lwnRemoval === false ? `${theme.danger}15` : theme.bgInput, border: `2px solid ${signUpData.services.lwnRemoval === false ? theme.danger : theme.border}`, borderRadius: '10px', cursor: 'pointer' }}>
                      <span style={{ color: signUpData.services.lwnRemoval === false ? theme.danger : theme.textMuted, fontWeight: '600', fontSize: '14px' }}>No</span>
                    </button>
                  </div>
                </div>
              </div>
            </Card>

            <label style={{ display: 'block', fontSize: '14px', color: theme.textMuted, marginBottom: '12px', marginTop: '24px' }}>Extra Services</label>
            <Card>
              <Toggle label="Wheel Alignment" checked={signUpData.services.alignment} onChange={(v) => setSignUpData({...signUpData, services: {...signUpData.services, alignment: v}})} />
              {signUpData.services.alignment && <div style={{ paddingLeft: '16px', paddingBottom: '8px' }}><Input placeholder="Alignment price (£)" type="number" value={signUpData.services.alignmentPrice} onChange={(v) => setSignUpData({...signUpData, services: {...signUpData.services, alignmentPrice: v}})} /></div>}
            </Card>

            <label style={{ display: 'block', fontSize: '14px', color: theme.textMuted, marginBottom: '12px', marginTop: '24px' }}>Availability</label>
            {showSetupTips && (
              <SetupTip icon={Clock} title="When do you work?">
                This tells TYRE-FIT when to send you jobs and cover alerts. Customers only see available time slots. You can change this anytime.
              </SetupTip>
            )}
            <Card>
              <h4 style={{ margin: '0 0 12px 0', color: theme.text, fontWeight: '600' }}>What work do you take?</h4>
              <Toggle label="Scheduled Bookings" checked={signUpData.availability.bookings} onChange={(v) => setSignUpData({...signUpData, availability: {...signUpData.availability, bookings: v}})} />
              <p style={{ fontSize: '12px', color: theme.textMuted, margin: '0 0 12px 16px' }}>Customers book in advance for a set date and time</p>
              <Toggle label="Emergency / Urgent Jobs" checked={signUpData.availability.emergency} onChange={(v) => setSignUpData({...signUpData, availability: {...signUpData.availability, emergency: v}})} />
              <p style={{ fontSize: '12px', color: theme.textMuted, margin: '0 0 4px 16px' }}>Same-day callouts and cover job alerts from TYRE-FIT</p>
            </Card>

            {signUpData.availability.emergency && (
              <Card>
                <h4 style={{ margin: '0 0 12px 0', color: theme.text, fontWeight: '600' }}>Emergency hours</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    { id: '247', label: '24/7', desc: 'Available any time, day or night' },
                    { id: 'business', label: 'Business Hours Only', desc: 'Set your working hours below' },
                    { id: 'custom', label: 'Custom Schedule', desc: 'Different hours for different days' }
                  ].map(opt => (
                    <button key={opt.id} onClick={() => setSignUpData({...signUpData, availability: {...signUpData.availability, emergencyHours: opt.id}})} style={{ width: '100%', padding: '14px 16px', backgroundColor: signUpData.availability.emergencyHours === opt.id ? `${theme.primary}15` : theme.bgInput, border: `2px solid ${signUpData.availability.emergencyHours === opt.id ? theme.primary : theme.border}`, borderRadius: '12px', cursor: 'pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ color: signUpData.availability.emergencyHours === opt.id ? theme.primary : theme.text, fontWeight: '600', display: 'block' }}>{opt.label}</span>
                        <span style={{ color: theme.textMuted, fontSize: '13px' }}>{opt.desc}</span>
                      </div>
                      {signUpData.availability.emergencyHours === opt.id && <CheckCircle size={20} color={theme.primary} />}
                    </button>
                  ))}
                </div>

                {signUpData.availability.emergencyHours === 'business' && (
                  <div style={{ marginTop: '16px' }}>
                    <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                      <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', fontSize: '13px', color: theme.textMuted, marginBottom: '4px' }}>Start</label>
                        <select value={signUpData.availability.businessHoursStart} onChange={(e) => setSignUpData({...signUpData, availability: {...signUpData.availability, businessHoursStart: e.target.value}})} style={{ width: '100%', padding: '12px', backgroundColor: theme.bgInput, border: `1px solid ${theme.border}`, borderRadius: '10px', color: theme.text, fontSize: '16px' }}>
                          {['06:00','07:00','08:00','09:00','10:00'].map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', fontSize: '13px', color: theme.textMuted, marginBottom: '4px' }}>End</label>
                        <select value={signUpData.availability.businessHoursEnd} onChange={(e) => setSignUpData({...signUpData, availability: {...signUpData.availability, businessHoursEnd: e.target.value}})} style={{ width: '100%', padding: '12px', backgroundColor: theme.bgInput, border: `1px solid ${theme.border}`, borderRadius: '10px', color: theme.text, fontSize: '16px' }}>
                          {['16:00','17:00','18:00','19:00','20:00','21:00','22:00'].map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(day => {
                        const active = signUpData.availability.businessDays.includes(day);
                        return (
                          <button key={day} onClick={() => { const days = active ? signUpData.availability.businessDays.filter(d => d !== day) : [...signUpData.availability.businessDays, day]; setSignUpData({...signUpData, availability: {...signUpData.availability, businessDays: days}}); }} style={{ padding: '10px 14px', backgroundColor: active ? `${theme.primary}20` : theme.bgInput, border: `2px solid ${active ? theme.primary : theme.border}`, borderRadius: '10px', cursor: 'pointer' }}>
                            <span style={{ color: active ? theme.primary : theme.textMuted, fontWeight: '600', fontSize: '13px' }}>{day}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </Card>
            )}

            {!signUpData.availability.bookings && !signUpData.availability.emergency && (
              <div style={{ padding: '12px', backgroundColor: `${theme.danger}10`, borderRadius: '10px', marginTop: '8px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                <AlertTriangle size={18} color={theme.danger} />
                <span style={{ color: theme.danger, fontSize: '14px' }}>You need at least one — bookings or emergency</span>
              </div>
            )}
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '14px', color: theme.textMuted, marginBottom: '12px' }}>Depot Locations</label>
            {showSetupTips && (
              <SetupTip icon={MapPin} title="Your coverage area">
                Your depot address and radius set where customers can book you. Overlapping areas are fine if you have multiple depots. TYRE-FIT uses this to match nearby cover jobs to you.
              </SetupTip>
            )}
            {signUpData.depots.map((depot, i) => (
              <Card key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <h4 style={{ margin: 0, color: theme.text, fontWeight: '600' }}>{signUpData.depots.length === 1 ? 'Your Base' : i === 0 ? 'Main Base' : `Location ${i + 1}`}</h4>
                  {i > 0 && <button onClick={() => removeDepot(i)} style={{ background: 'none', border: 'none', color: theme.danger, cursor: 'pointer', padding: '4px' }}><Trash2 size={18} /></button>}
                </div>
                {i === 0 && <p style={{ margin: '0 0 12px 0', color: theme.textMuted, fontSize: '12px', lineHeight: 1.5 }}>Where you store your tyres — could be your house, a garage, a lock-up, or a depot. We use this to plan your routes and work out which customers are in your area.</p>}
                <Input placeholder="Depot name" value={depot.name} onChange={(v) => updateDepot(i, 'name', v)} />
                <Input placeholder="Address" icon={MapPin} value={depot.address} onChange={(v) => updateDepot(i, 'address', v)} />
                <div>
                  <label style={{ display: 'block', fontSize: '14px', color: theme.textMuted, marginBottom: '8px' }}>Catchment Radius: {depot.radius} miles (max 25)</label>
                  <input type="range" min="1" max="25" value={depot.radius} onChange={(e) => updateDepot(i, 'radius', parseInt(e.target.value))} style={{ width: '100%', accentColor: theme.primary }} />
                </div>
              </Card>
            ))}
            <button onClick={addDepot} style={{ width: '100%', padding: '16px', backgroundColor: 'transparent', border: `2px dashed ${theme.border}`, borderRadius: '12px', color: theme.textMuted, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}><Plus size={20} /> Add Another Storage Location</button>
            <p style={{ fontSize: '12px', color: theme.textSubtle, marginTop: '8px', textAlign: 'center' }}>Overlapping catchment areas are fine</p>
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '14px', color: theme.textMuted, marginBottom: '12px' }}>How do you operate?</label>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Card onClick={() => { setIsTeamAccount(false); setUserRole('owner'); }} highlight={!isTeamAccount} style={{ flex: 1, textAlign: 'center', cursor: 'pointer' }}>
                <User size={24} color={!isTeamAccount ? theme.primary : theme.textMuted} style={{ marginBottom: '8px' }} />
                <p style={{ margin: 0, fontWeight: '600', color: theme.text, fontSize: '15px' }}>Solo Fitter</p>
                <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: theme.textMuted }}>Just me</p>
              </Card>
              <Card onClick={() => { setIsTeamAccount(true); setUserRole('owner'); }} highlight={isTeamAccount} style={{ flex: 1, textAlign: 'center', cursor: 'pointer' }}>
                <Users size={24} color={isTeamAccount ? theme.primary : theme.textMuted} style={{ marginBottom: '8px' }} />
                <p style={{ margin: 0, fontWeight: '600', color: theme.text, fontSize: '15px' }}>Team</p>
                <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: theme.textMuted }}>Multiple fitters</p>
              </Card>
            </div>
            {isTeamAccount && (
              <div style={{ marginTop: '16px' }}>
                <Input label="Invite fitter (mobile number)" placeholder="07700 900000" value={signUpData.teamInvite || ''} onChange={(v) => setSignUpData({...signUpData, teamInvite: v})} icon={Phone} />
                <Button variant="secondary" size="small" onClick={() => showToast('SMS invite sent')} icon={Send}>Send Invite</Button>
                <p style={{ fontSize: '12px', color: theme.textMuted, marginTop: '8px' }}>You can add more fitters later in Settings</p>
              </div>
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Button onClick={() => navigateTo('link-gmb')}>Continue</Button>
            <Button variant="ghost" onClick={() => navigateTo('setup-complete')}>Skip for now — just let me send quotes</Button>
          </div>
        </div>
      </div>
    );
  };

  // ============================================
  // LINK GMB
  // ============================================
  const LinkGMBScreen = () => {
    const [showSkipWarning, setShowSkipWarning] = useState(false);
    
    return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.bg, padding: '24px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
        <FontSizeToggle />
        <ThemeToggle />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: '400px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ width: '80px', height: '80px', backgroundColor: '#fff', borderRadius: '20px', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
            <svg width="48" height="48" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: theme.text, margin: '0 0 8px 0' }}>Link Google Business Profile</h1>
          {showSetupTips && <p style={{ color: theme.textMuted, fontSize: '14px', margin: '0 0 16px 0' }}>This is how TYRE-FIT collects reviews for you automatically. Highly recommended — fitters with more Google reviews get more bookings.</p>}
        </div>
        <Card>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: theme.text, margin: '0 0 16px 0' }}>This allows us to:</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[{ icon: Star, text: 'Collect reviews automatically' }, { icon: Clock, text: 'Sync your opening times' }, { icon: Settings, text: 'Display your services' }, { icon: Bell, text: 'Notify you of new reviews' }].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><item.icon size={20} color={theme.primary} /><span style={{ color: theme.text }}>{item.text}</span></div>
            ))}
          </div>
        </Card>
        <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button onClick={() => navigateTo('setup-final')} style={{ width: '100%', padding: '16px 24px', backgroundColor: '#4285F4', border: 'none', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', cursor: 'pointer' }}>
            <div style={{ width: '24px', height: '24px', backgroundColor: '#fff', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            </div>
            <span style={{ color: '#fff', fontWeight: '600', fontSize: '16px' }}>Link Google Business Profile</span>
          </button>
          <Button variant="ghost" onClick={() => setShowSkipWarning(true)}>Skip for now</Button>
        </div>
      </div>
      
      {showSkipWarning && (
        <Modal title="Are you sure?" onClose={() => setShowSkipWarning(false)}>
          <p style={{ color: theme.textMuted, margin: '0 0 16px 0', fontSize: '15px', lineHeight: 1.6 }}>Without linking your Google Business Profile, you'll miss out on:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
            {[
              { icon: Star, text: 'Automatic Google reviews after every job', color: '#eab308' },
              { icon: TrendingUp, text: 'Higher search ranking from more reviews', color: theme.primary },
              { icon: Bell, text: 'Instant alerts when customers leave reviews', color: theme.info },
              { icon: Clock, text: 'Auto-synced business hours', color: '#f97316' }
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', backgroundColor: theme.bgInput, borderRadius: '10px' }}>
                <item.icon size={20} color={item.color} />
                <span style={{ color: theme.text, fontSize: '14px' }}>{item.text}</span>
              </div>
            ))}
          </div>
          <p style={{ color: theme.warning, fontSize: '14px', margin: '0 0 20px 0', lineHeight: 1.5 }}>Fitters who link their Google profile get <strong style={{ color: theme.text }}>3x more reviews</strong> on average. You can always link it later from Settings.</p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Button onClick={() => setShowSkipWarning(false)} fullWidth>Link It Now</Button>
            <Button variant="secondary" onClick={() => { setShowSkipWarning(false); navigateTo('setup-final'); }} fullWidth>Skip Anyway</Button>
          </div>
        </Modal>
      )}
    </div>
    );
  };

  // ============================================
  // TEAM SETUP - Invite fitters NOW
  // ============================================
  const TeamSetupScreen = () => {
    const addFitter = () => setSignUpData({...signUpData, invitedFitters: [...signUpData.invitedFitters, { name: '', mobile: '' }]});
    const updateFitter = (i, field, val) => { const f = [...signUpData.invitedFitters]; f[i] = {...f[i], [field]: val}; setSignUpData({...signUpData, invitedFitters: f}); };
    const removeFitter = (i) => { if (signUpData.invitedFitters.length > 1) setSignUpData({...signUpData, invitedFitters: signUpData.invitedFitters.filter((_, idx) => idx !== i)}); };
    
    return (
      <div style={{ minHeight: '100vh', backgroundColor: theme.bg, padding: '24px' }}>
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <FontSizeToggle />
            <ThemeToggle />
          </div>
          <div style={{ textAlign: 'center', marginBottom: '32px', paddingTop: '12px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: theme.text, margin: '0 0 8px 0' }}>Team Setup</h1>
            <p style={{ color: theme.textMuted, margin: 0 }}>Are you a solo fitter or do you have a team?</p>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
            <Card onClick={() => { setIsTeamAccount(false); setUserRole('owner'); }} highlight={!isTeamAccount}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '56px', height: '56px', backgroundColor: !isTeamAccount ? `${theme.primary}20` : theme.bgInput, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><User size={28} color={!isTeamAccount ? theme.primary : theme.textMuted} /></div>
                <div><h3 style={{ fontSize: '18px', fontWeight: '600', color: theme.text, margin: 0 }}>Solo Fitter</h3><p style={{ fontSize: '14px', color: theme.textMuted, margin: '4px 0 0 0' }}>Just me, myself and I</p></div>
              </div>
            </Card>
            <Card onClick={() => { setIsTeamAccount(true); setUserRole('owner'); }} highlight={isTeamAccount}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '56px', height: '56px', backgroundColor: isTeamAccount ? `${theme.primary}20` : theme.bgInput, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Users size={28} color={isTeamAccount ? theme.primary : theme.textMuted} /></div>
                <div><h3 style={{ fontSize: '18px', fontWeight: '600', color: theme.text, margin: 0 }}>Team / Business</h3><p style={{ fontSize: '14px', color: theme.textMuted, margin: '4px 0 0 0' }}>I have multiple fitters</p></div>
              </div>
            </Card>
          </div>
          
          {isTeamAccount && (
            <div style={{ marginBottom: '32px' }}>
              {showSetupTips && (
                <SetupTip icon={Users} title="How teams work" accent={theme.primary}>
                  As the owner, {"you'll"} see a Dispatcher view where you can assign jobs, view all fitter locations, and manage routes. Your fitters get their own app with their jobs, wallet, and route.
                </SetupTip>
              )}
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: theme.text, margin: '0 0 12px 0' }}><UserPlus size={20} style={{ verticalAlign: 'middle', marginRight: '8px' }} />Invite Your Fitters</h3>
              
              {/* How it works */}
              <Card style={{ backgroundColor: `${theme.info}08`, marginBottom: '16px' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Info size={18} color={theme.info} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <p style={{ margin: '0 0 8px 0', color: theme.text, fontWeight: '600', fontSize: '14px' }}>What happens when you invite someone:</p>
                    <p style={{ margin: '0 0 4px 0', color: theme.textMuted, fontSize: '13px' }}>1. They get an SMS with a link to download TYRE-FIT</p>
                    <p style={{ margin: '0 0 4px 0', color: theme.textMuted, fontSize: '13px' }}>2. They sign up with their mobile number</p>
                    <p style={{ margin: '0 0 0 0', color: theme.primary, fontSize: '13px', fontWeight: '600' }}>3. They're automatically linked to {signUpData.businessName || 'your business'} — no codes needed</p>
                  </div>
                </div>
              </Card>

              {signUpData.invitedFitters.map((fitter, i) => (
                <Card key={i} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ color: theme.textMuted, fontSize: '13px', fontWeight: '600' }}>Fitter {i + 1}</span>
                    {signUpData.invitedFitters.length > 1 && <button onClick={() => removeFitter(i)} style={{ background: 'none', border: 'none', color: theme.danger, cursor: 'pointer', padding: '4px' }}><X size={18} /></button>}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <input placeholder="Name" value={fitter.name} onChange={(e) => updateFitter(i, 'name', e.target.value)} style={{ padding: '14px 16px', backgroundColor: theme.bgInput, border: `1px solid ${theme.border}`, borderRadius: '12px', color: theme.text, fontSize: '16px', outline: 'none' }} />
                    <input type="tel" placeholder="Mobile number" value={fitter.mobile} onChange={(e) => updateFitter(i, 'mobile', e.target.value)} style={{ padding: '14px 16px', backgroundColor: theme.bgInput, border: `1px solid ${theme.border}`, borderRadius: '12px', color: theme.text, fontSize: '16px', outline: 'none' }} />
                  </div>
                </Card>
              ))}
              <button onClick={addFitter} style={{ width: '100%', padding: '14px', backgroundColor: 'transparent', border: `2px dashed ${theme.border}`, borderRadius: '12px', color: theme.textMuted, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}><Plus size={18} /> Add Another Fitter</button>
            </div>
          )}
          <Button onClick={() => navigateTo('setup-comms')}>{isTeamAccount ? 'Send Invites & Continue' : 'Continue'}</Button>
        </div>
      </div>
    );
  };

  // ============================================
  // MISSED CALLS + SMS QUOTING AI (ONBOARDING)
  // ============================================
  const SetupCommsScreen = () => {
    const comms = signUpData.comms || { missedCallCapture: true, smsQuoteAi: true, autoReply: true };
    const setComms = (patch) => setSignUpData({
      ...signUpData,
      comms: { ...comms, ...patch }
    });

    return (
      <div style={{ minHeight: '100vh', backgroundColor: theme.bg, padding: '24px', paddingBottom: '120px' }}>
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <FontSizeToggle />
            <ThemeToggle />
          </div>
          <div style={{ textAlign: 'center', marginBottom: '24px', paddingTop: '8px' }}>
            <div style={{ width: '70px', height: '70px', borderRadius: '16px', backgroundColor: `${theme.primary}18`, margin: '0 auto 14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PhoneCall size={34} color={theme.primary} />
            </div>
            <h1 style={{ margin: '0 0 8px 0', color: theme.text, fontSize: '24px', fontWeight: '800' }}>Activate Missed Calls + SMS AI</h1>
            <p style={{ margin: 0, color: theme.textMuted, fontSize: '15px', lineHeight: 1.6 }}>Turn on automatic quoting from missed calls and incoming texts. You can switch this off anytime.</p>
          </div>

          <Card>
            <Toggle
              label="Capture missed calls"
              checked={comms.missedCallCapture}
              onChange={(v) => setComms({ missedCallCapture: v })}
            />
            <p style={{ margin: '0 0 12px 0', color: theme.textMuted, fontSize: '12px' }}>
              When someone calls and you miss it, TYRE-FIT can text them back with a quote link.
            </p>
            <Toggle
              label="SMS quoting AI"
              checked={comms.smsQuoteAi}
              onChange={(v) => setComms({ smsQuoteAi: v })}
            />
            <p style={{ margin: '0 0 12px 0', color: theme.textMuted, fontSize: '12px' }}>
              Incoming SMS like "Need 2 tyres for AB12 CDE" are turned into draft quotes for one-tap send.
            </p>
            <Toggle
              label="Auto-reply when busy"
              checked={comms.autoReply}
              onChange={(v) => setComms({ autoReply: v })}
            />
            <p style={{ margin: 0, color: theme.textMuted, fontSize: '12px' }}>
              Sends "On a job right now — tap to book" while you work.
            </p>
          </Card>

          <Card style={{ borderColor: `${theme.warning}40` }}>
            <p style={{ margin: 0, color: theme.text, fontSize: '14px', lineHeight: 1.6 }}>
              If you skip this, quoting still works. You just lose automatic lead capture from missed calls and texts.
            </p>
          </Card>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Button onClick={() => navigateTo('setup-final')} icon={ArrowRight}>Continue</Button>
            <Button variant="ghost" onClick={() => navigateTo('setup-final')}>Skip for now</Button>
          </div>
        </div>
      </div>
    );
  };

  // ============================================
  // COMBINED PERMISSIONS & CONSENT - Single screen
  // ============================================
  const SetupFinalScreen = () => {
    const [notificationsOn, setNotificationsOn] = useState(true);
    const [locationOn, setLocationOn] = useState(true);
    const [cameraOn, setCameraOn] = useState(true);
    const [accepted, setAccepted] = useState(false);
    
    return (
      <div style={{ minHeight: '100vh', backgroundColor: theme.bg, padding: '24px', paddingBottom: '120px' }}>
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <FontSizeToggle />
            <ThemeToggle />
          </div>
          <div style={{ textAlign: 'center', marginBottom: '28px', paddingTop: '8px' }}>
            <div style={{ width: '72px', height: '72px', backgroundColor: `${theme.primary}20`, borderRadius: '50%', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Check size={36} color={theme.primary} /></div>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: theme.text, margin: '0 0 8px 0' }}>Nearly There</h1>
            <p style={{ color: theme.textMuted, margin: 0, fontSize: '16px' }}>Allow permissions and accept the basics to get started.</p>
          </div>
          
          <h3 style={{ fontSize: '13px', fontWeight: '600', color: theme.textMuted, margin: '0 0 12px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Permissions</h3>
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: `1px solid ${theme.border}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', backgroundColor: `${theme.info}20`, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Bell size={18} color={theme.info} /></div>
                <div><p style={{ margin: 0, color: theme.text, fontWeight: '500', fontSize: '15px' }}>Notifications</p><p style={{ margin: '2px 0 0 0', color: theme.textMuted, fontSize: '12px' }}>Job alerts, payments, reviews</p></div>
              </div>
              <button onClick={() => setNotificationsOn(!notificationsOn)} style={{ width: '48px', height: '26px', borderRadius: '13px', backgroundColor: notificationsOn ? theme.primary : theme.bgInput, border: 'none', cursor: 'pointer', position: 'relative' }}>
                <div style={{ width: '22px', height: '22px', borderRadius: '11px', backgroundColor: '#fff', position: 'absolute', top: '2px', left: notificationsOn ? '24px' : '2px', transition: 'all 0.2s' }} />
              </button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: `1px solid ${theme.border}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', backgroundColor: '#f9731620', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><MapPin size={18} color="#f97316" /></div>
                <div><p style={{ margin: 0, color: theme.text, fontWeight: '500', fontSize: '15px' }}>Location</p><p style={{ margin: '2px 0 0 0', color: theme.textMuted, fontSize: '12px' }}>Routes, ETAs, photo proof</p></div>
              </div>
              <button onClick={() => setLocationOn(!locationOn)} style={{ width: '48px', height: '26px', borderRadius: '13px', backgroundColor: locationOn ? theme.primary : theme.bgInput, border: 'none', cursor: 'pointer', position: 'relative' }}>
                <div style={{ width: '22px', height: '22px', borderRadius: '11px', backgroundColor: '#fff', position: 'absolute', top: '2px', left: locationOn ? '24px' : '2px', transition: 'all 0.2s' }} />
              </button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', backgroundColor: '#8b5cf620', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Camera size={18} color="#8b5cf6" /></div>
                <div><p style={{ margin: 0, color: theme.text, fontWeight: '500', fontSize: '15px' }}>Camera</p><p style={{ margin: '2px 0 0 0', color: theme.textMuted, fontSize: '12px' }}>Tyre scanning, before/after photos</p></div>
              </div>
              <button onClick={() => setCameraOn(!cameraOn)} style={{ width: '48px', height: '26px', borderRadius: '13px', backgroundColor: cameraOn ? theme.primary : theme.bgInput, border: 'none', cursor: 'pointer', position: 'relative' }}>
                <div style={{ width: '22px', height: '22px', borderRadius: '11px', backgroundColor: '#fff', position: 'absolute', top: '2px', left: cameraOn ? '24px' : '2px', transition: 'all 0.2s' }} />
              </button>
            </div>
          </Card>
          <h3 style={{ fontSize: '13px', fontWeight: '600', color: theme.textMuted, margin: '16px 0 12px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Customer Messages</h3>
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', backgroundColor: `${theme.info}20`, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><MessageSquare size={18} color={theme.info} /></div>
                <div>
                  <p style={{ margin: 0, color: theme.text, fontWeight: '500', fontSize: '15px' }}>SMS to customers</p>
                  <p style={{ margin: '2px 0 0 0', color: theme.textMuted, fontSize: '12px' }}>Quotes, ETA, receipts, review requests</p>
                </div>
              </div>
              <button onClick={() => setSmsEnabled(!smsEnabled)} style={{ width: '48px', height: '26px', borderRadius: '13px', backgroundColor: smsEnabled ? theme.primary : theme.bgInput, border: 'none', cursor: 'pointer', position: 'relative' }}>
                <div style={{ width: '22px', height: '22px', borderRadius: '11px', backgroundColor: '#fff', position: 'absolute', top: '2px', left: smsEnabled ? '24px' : '2px', transition: 'all 0.2s' }} />
              </button>
            </div>
            <p style={{ margin: 0, color: theme.textMuted, fontSize: '12px' }}>
              {smsEnabled ? 'SMS is enabled and will appear as a send option.' : 'SMS is off. We will not show SMS as a send option.'}
            </p>
          </Card>
          {(!notificationsOn || !locationOn || !cameraOn) && (
            <p style={{ color: theme.warning, fontSize: '13px', margin: '-4px 0 12px 0' }}>You can enable these later in Settings, but the app works best with all three on.</p>
          )}
          
          <h3 style={{ fontSize: '13px', fontWeight: '600', color: theme.textMuted, margin: '16px 0 12px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Terms & Privacy</h3>
          <Card>
            <div style={{ padding: '4px 0 16px 0', fontSize: '14px', color: theme.textMuted, lineHeight: 1.7 }}>
              <p style={{ margin: '0 0 10px 0' }}>TYRE-FIT is <span style={{ color: theme.text, fontWeight: '500' }}>free to use — no monthly fees</span>. When a customer confirms a booking they pay a £5.95 fee. TYRE-FIT keeps this to cover AI tyre scanning, SMS alerts, free emergency cover, Google reviews, and running the platform.</p>
              <p style={{ margin: '0 0 10px 0' }}>We only collect data needed to run the service (location, photos, customer details). <span style={{ color: theme.text, fontWeight: '500' }}>Your data belongs to you</span> — you can download or delete it anytime.</p>
              <p style={{ margin: 0 }}>Customer info you enter stays yours. We store it securely on your behalf.</p>
            </div>
            <div style={{ borderTop: `1px solid ${theme.border}`, paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {[
                { key: 'terms', label: 'Terms of Service' },
                { key: 'privacy', label: 'Privacy Policy' },
                { key: 'customerdata', label: 'Customer Data' },
                { key: 'fees', label: 'Where the £5.95 goes' }
              ].map((item) => (
                <button key={item.key} onClick={() => setActiveLegalDoc(item.key)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'none', border: 'none', cursor: 'pointer', padding: '8px 0', textAlign: 'left' }}>
                  <span style={{ color: theme.primary, fontSize: '14px', fontWeight: '500' }}>{item.label}</span>
                  <ChevronRight size={16} color={theme.primary} />
                </button>
              ))}
            </div>
          </Card>
          
          <button onClick={() => setAccepted(!accepted)} style={{ width: '100%', display: 'flex', alignItems: 'flex-start', gap: '12px', background: 'none', border: 'none', cursor: 'pointer', padding: '12px 0', textAlign: 'left', marginBottom: '8px' }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '6px', border: `2px solid ${accepted ? theme.primary : theme.border}`, backgroundColor: accepted ? theme.primary : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>{accepted && <Check size={16} color="#000" />}</div>
            <span style={{ color: theme.text, fontSize: '15px', lineHeight: 1.5 }}>I accept the Terms of Service and Privacy Policy</span>
          </button>
          
          <Button onClick={() => { setTermsAccepted(true); setLocationPermission(locationOn); setCameraPermission(cameraOn); navigateTo('setup-complete'); }} disabled={!accepted} icon={ArrowRight}>Accept & Let's Go</Button>
        </div>
      </div>
    );
  };

  // ============================================
  // SETUP COMPLETE
  // ============================================
  const SetupCompleteScreen = () => (
    <div style={{ minHeight: '100vh', backgroundColor: theme.bg, padding: '24px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
        <FontSizeToggle />
        <ThemeToggle />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '120px', height: '120px', backgroundColor: theme.primary, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px' }}><CheckCircle size={60} color="#000" /></div>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: theme.text, margin: '0 0 12px 0', textAlign: 'center' }}>You're All Set!</h1>
      <p style={{ color: theme.textMuted, margin: '0 0 32px 0', textAlign: 'center', maxWidth: '300px' }}>Your TYRE-FIT account is ready. Start sending quotes and growing your business.</p>
      <Card style={{ maxWidth: '350px', width: '100%', marginBottom: '16px', borderColor: `${theme.warning}40` }}>
        <p style={{ margin: 0, color: theme.text, fontWeight: '700', fontSize: '14px' }}>Profile 40% complete</p>
        <p style={{ margin: '4px 0 10px 0', color: theme.textMuted, fontSize: '13px' }}>Add your logo and pricing to look more professional.</p>
        <Button variant="secondary" onClick={() => navigateTo('settings-business')} fullWidth>Finish Later in Settings</Button>
      </Card>
      {isTeamAccount && signUpData.invitedFitters.filter(e => e).length > 0 && (
        <Card style={{ maxWidth: '350px', width: '100%', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Mail size={24} color={theme.info} />
            <div><p style={{ margin: 0, color: theme.text, fontWeight: '500' }}>{signUpData.invitedFitters.filter(e => e).length} invite{signUpData.invitedFitters.filter(e => e).length > 1 ? 's' : ''} sent</p><p style={{ margin: '4px 0 0 0', color: theme.textMuted, fontSize: '14px' }}>Your fitters will receive an email to join</p></div>
          </div>
        </Card>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '350px' }}><Button onClick={() => { navigateTo('dashboard'); }} icon={ArrowRight}>Go to Dashboard</Button></div>
      </div>
    </div>
  );

  // ============================================
  // MOBILE SETUP FLOW BOARD
  // ============================================
  const SetupFlowBoardScreen = () => {
    const setupSteps = [
      {
        key: 'signin',
        title: 'Sign In',
        subtitle: 'Phone number and one-time code',
        primary: 'Continue',
        notes: ['Fast start', 'No long forms']
      },
      {
        key: 'welcome',
        title: 'Welcome',
        subtitle: 'You Fit The Tyres. We Handle The Rest.',
        primary: 'Start Setup',
        notes: ['Practice mode option', 'Skippable tour']
      },
      {
        key: 'link-gmb',
        title: 'Google Business',
        subtitle: 'Link profile first',
        primary: 'Link Profile',
        notes: ['Skip available', 'Explains value clearly']
      },
      {
        key: 'business-setup',
        title: 'Business Setup',
        subtitle: 'Business name, phone, postcode',
        primary: 'Continue',
        notes: ['Optional details can wait', 'Team invite optional']
      },
      {
        key: 'setup-comms',
        title: 'Missed Calls + SMS AI',
        subtitle: 'Automatic lead capture from calls and texts',
        primary: 'Continue',
        notes: ['Enable/skip with no hard block', 'Can change later in Settings']
      },
      {
        key: 'setup-final',
        title: 'Permissions + SMS',
        subtitle: 'Location, camera, alerts, SMS toggle',
        primary: "Accept & Let's Go",
        notes: ['SMS on/off during onboarding', 'Terms confirmation']
      },
      {
        key: 'setup-complete',
        title: 'Ready',
        subtitle: 'Profile completion nudge',
        primary: 'Go to Dashboard',
        notes: ['No hard block', 'Start quoting immediately']
      }
    ];

    return (
      <div style={{ minHeight: '100vh', backgroundColor: theme.bg, paddingBottom: '100px' }}>
        <Toast />
        <Header title="Mobile Setup Flow" />
        <div style={{ padding: '16px' }}>
          <Card style={{ marginBottom: '16px' }}>
            <h3 style={{ margin: '0 0 6px 0', color: theme.text, fontSize: '18px', fontWeight: '700' }}>Side-by-side setup screens</h3>
            <p style={{ margin: 0, color: theme.textMuted, fontSize: '14px' }}>Review the full mobile signup flow without tapping through each screen.</p>
          </Card>

          <div style={{ overflowX: 'auto', paddingBottom: '8px' }}>
            <div style={{ display: 'flex', gap: '16px', minWidth: 'max-content' }}>
              {setupSteps.map((step, idx) => (
                <div key={step.key} style={{ width: '280px', flexShrink: 0 }}>
                  <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '24px', height: '24px', borderRadius: '12px', backgroundColor: `${theme.primary}25`, color: theme.primary, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700' }}>{idx + 1}</span>
                    <span style={{ color: theme.text, fontSize: '14px', fontWeight: '600' }}>{step.title}</span>
                  </div>
                  <div style={{ backgroundColor: '#000', borderRadius: '28px', padding: '10px', border: `1px solid ${theme.border}` }}>
                    <div style={{ backgroundColor: theme.bg, borderRadius: '20px', minHeight: '500px', padding: '16px', display: 'flex', flexDirection: 'column' }}>
                      <div style={{ width: '70px', height: '6px', borderRadius: '4px', backgroundColor: theme.border, margin: '0 auto 16px auto' }} />
                      <div style={{ width: '48px', height: '48px', borderRadius: '14px', backgroundColor: `${theme.primary}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                        <Smartphone size={24} color={theme.primary} />
                      </div>
                      <h4 style={{ margin: '0 0 6px 0', color: theme.text, fontSize: '20px', fontWeight: '700' }}>{step.title}</h4>
                      <p style={{ margin: '0 0 16px 0', color: theme.textMuted, fontSize: '14px' }}>{step.subtitle}</p>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: 'auto' }}>
                        {step.notes.map((note, noteIdx) => (
                          <div key={noteIdx} style={{ padding: '10px 12px', borderRadius: '10px', border: `1px solid ${theme.border}`, backgroundColor: theme.bgCard, color: theme.text, fontSize: '13px' }}>
                            {note}
                          </div>
                        ))}
                      </div>

                      <button style={{ marginTop: '16px', width: '100%', height: '52px', borderRadius: '12px', border: 'none', backgroundColor: theme.primary, color: '#000', fontWeight: '700', fontSize: '16px' }}>
                        {step.primary}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const StoryboardFlowScreen = () => {
    const flowRows = [
      {
        title: 'Onboarding',
        color: theme.info,
        screens: [
          ['signin', 'Sign In'],
          ['welcome', 'Welcome'],
          ['link-gmb', 'Google Business'],
          ['business-setup', 'Business Setup'],
          ['team-setup', 'Team Setup'],
          ['setup-comms', 'Missed Calls + SMS AI'],
          ['setup-final', 'Permissions + SMS'],
          ['setup-complete', 'Setup Complete'],
          ['practice-mode', 'Practice Mode']
        ]
      },
      {
        title: 'Quoting',
        color: theme.primary,
        screens: [
          ['dashboard', 'Home'],
          ['quote-hub', 'Quote & Booking'],
          ['quote-customer', 'Quote Customer'],
          ['quick-quote', 'Quick Quote'],
          ['quote-schedule', 'Schedule'],
          ['quote-job', 'Job Details'],
          ['quote-stock', 'Stock Check'],
          ['quote-review', 'SMS Preview'],
          ['quote-sent', 'Quote Sent'],
          ['cover-quote', 'Cover Quote']
        ]
      },
      {
        title: 'Job Flow',
        color: '#f59e0b',
        screens: [
          ['bookings', 'Bookings'],
          ['job-enroute', 'En Route'],
          ['job-before-photo', 'Before Photos'],
          ['job-condition-check', 'Condition Report'],
          ['job-payment', 'Payment'],
          ['job-complete', 'Complete'],
          ['cover-job-complete', 'Cover Complete'],
          ['day-summary', 'Day Summary']
        ]
      },
      {
        title: 'Operations',
        color: '#06b6d4',
        screens: [
          ['route', 'Route'],
          ['stock', 'Stock'],
          ['invoices', 'Invoices'],
          ['invoice-create', 'Create Invoice'],
          ['evidence-vault', 'Evidence Vault'],
          ['disputes', 'Disputes'],
          ['dispute-detail', 'Dispute Detail'],
          ['emergency', 'Emergency Jobs'],
          ['reviews', 'Google Reviews']
        ]
      },
      {
        title: 'Account & Settings',
        color: '#a855f7',
        screens: [
          ['account', 'Account'],
          ['wallet', 'Wallet'],
          ['wallet-withdraw', 'Withdraw'],
          ['dispatcher', 'Dispatcher'],
          ['settings-profile', 'Edit Profile'],
          ['settings-business', 'Business Settings'],
          ['settings-payments', 'Payments Setup'],
          ['settings-google', 'Google Profile'],
          ['settings-bank', 'Bank Account'],
          ['settings-depots', 'Depots'],
          ['settings-invoices', 'Invoice Settings'],
          ['settings-notifications', 'Notifications'],
          ['settings-display', 'Display'],
          ['settings-calendar', 'Calendar'],
          ['settings-accounting', 'Accounting'],
          ['settings-help', 'Help'],
          ['settings-terms', 'Terms'],
          ['referral', 'Referral']
        ]
      },
      {
        title: 'Customer Web Flow',
        color: '#ef4444',
        screens: [
          ['customer-booking', 'Booking'],
          ['customer-booking-terms', 'Booking Terms'],
          ['customer-cover-terms', 'Cover Terms'],
          ['customer-cover-dashboard', 'Cover Dashboard'],
          ['customer-eta-tracking', 'ETA Tracking'],
          ['customer-pay-invoice', 'Pay Invoice'],
          ['customer-receipt', 'Receipt + Report'],
          ['customer-claim', 'Claim']
        ]
      },
      {
        title: 'Flow Tools',
        color: '#14b8a6',
        screens: [
          ['setup-flow-board', 'Setup Flow Board'],
          ['flow-storyboard', 'Flow Storyboard'],
          ['flow-runner', 'Flow Runner']
        ]
      }
    ];

    const totalScreens = flowRows.reduce((sum, row) => sum + row.screens.length, 0);

    return (
      <div style={{ minHeight: '100vh', backgroundColor: theme.bg, paddingBottom: '100px' }}>
        <Toast />
        <Header title="Storyboard Flow" />
        <div style={{ padding: '16px' }}>
          <Card style={{ marginBottom: '16px' }}>
            <h3 style={{ margin: '0 0 6px 0', color: theme.text, fontSize: '18px', fontWeight: '700' }}>Full journey overview</h3>
            <p style={{ margin: 0, color: theme.textMuted, fontSize: '14px' }}>All {totalScreens} screens are shown together in journey order. Zoom your browser out to see more at once.</p>
          </Card>

          {flowRows.map((row, rowIdx) => (
            <div key={row.title} style={{ marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <span style={{ width: '22px', height: '22px', borderRadius: '11px', backgroundColor: `${row.color}25`, color: row.color, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700' }}>{rowIdx + 1}</span>
                <h3 style={{ margin: 0, color: row.color, fontSize: '16px', fontWeight: '700' }}>{row.title}</h3>
                <span style={{ color: theme.textMuted, fontSize: '12px' }}>{row.screens.length} screens</span>
              </div>

              <div style={{ display: 'grid', gap: '10px', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))' }}>
                {row.screens.map((screen, idx) => (
                  <div key={screen[0]} style={{ minHeight: '112px', borderRadius: '12px', border: `1px solid ${theme.border}`, backgroundColor: theme.bgCard, padding: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ color: theme.textMuted, fontSize: '10px', fontWeight: '700' }}>STEP {idx + 1}</span>
                      <span style={{ color: row.color, fontSize: '10px', fontWeight: '700' }}>MOBILE</span>
                    </div>
                    <h4 style={{ margin: '0 0 5px 0', color: theme.text, fontSize: '14px', fontWeight: '700', lineHeight: 1.25 }}>{screen[1]}</h4>
                    <p style={{ margin: 0, color: theme.textMuted, fontSize: '11px', wordBreak: 'break-word' }}>{screen[0]}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const FlowRunnerScreen = () => {
    const demoQuoteSeed = {
      customerName: 'John Smith',
      mobile: '07700 900123',
      numberPlate: 'AB12 CDE',
      bookingDate: 'Tue 18 Feb',
      bookingTime: '10:30',
      tyreQty: 2,
      tyreSize: '205/55R16',
      price: '89.99',
      location: '45 High Street, E1 4QJ'
    };
    const demoJobSeed = { id: 902, customer: 'Emma Davis', plate: 'CD90 VWX', time: '10:30', location: '45 High Street, E1 4QJ', eta: '12 mins', tyreSize: '205/55R16', tyreQty: 2, tyrePositions: ['Front Left', 'Front Right'], depositPaid: true, stockOnVan: true };
    const demoCoverJobSeed = { id: 901, customer: 'Cover Customer', plate: 'CV12 ERJ', time: 'Now', location: 'A12 Layby, Stratford', eta: '18 mins', tyreSize: '205/55R16', tyreQty: 1, tyrePositions: ['Front Left'], depositPaid: true, stockOnVan: true, isCoverJob: true };
    const demoCoverQuoteSeed = { id: 'cj1', name: 'John Smith', plate: 'AB12 CDE', vehicle: '2019 Ford Focus', location: 'A12 Layby, near Stratford', distance: '4.2 miles', issue: 'Flat tyre', tyreSize: '205/55R16', qty: 1, timeAgo: '2 mins ago' };
    const demoDisputeSeed = { id: 1, plate: 'AB12 CDE', customer: 'John Smith', phone: '07700 900123', date: '04 Feb 2026', time: '14:32', location: '45 High St, E1', status: 'none', gps: '51.5074, -0.1278', tyres: '2x 205/55R16', brand: 'Michelin Primacy 4', dot: 'DOT 2425', paymentMethod: 'Card (App)', transactionId: 'TXN-2026-0204-1432', amount: '£149.99', invoiceRef: 'INV-0041', signedOff: true, timeline: { arrived: '14:15', inspected: '14:20', started: '14:32', completed: '15:05', signedOff: '15:08' } };

    useEffect(() => {
      setFlowRunnerActive(false);
    }, []);

    const launchFitterJobFlow = (cover = false) => {
      setFlowRunnerActive(true);
      setViewMode('fitter');
      const demoJob = cover
        ? demoCoverJobSeed
        : demoJobSeed;
      setActiveJob(demoJob);
      setIsCoverJob(cover);
      setBeforePhotos({});
      setAfterPhotos({});
      setCustomerSigned(false);
      setConditionPassed(true);
      navigateTo('job-enroute');
    };

    const launchQuoteFlow = (quick = true) => {
      setFlowRunnerActive(true);
      setViewMode('fitter');
      setQuoteData(prev => ({
        ...prev,
        ...demoQuoteSeed
      }));
      navigateTo(quick ? 'quick-quote' : 'quote-customer');
    };

    const launchInvoiceFlow = () => {
      setFlowRunnerActive(true);
      setViewMode('fitter');
      setInvoiceFormData({
        customerName: 'Sarah Jones',
        mobile: '07700 900456',
        description: '2x 205/55R16 fitting — XY34 FGH',
        amount: '124.99'
      });
      navigateTo('invoice-create');
    };

    const launchCustomerFlow = (screen) => {
      setFlowRunnerActive(true);
      setViewMode('customer');
      setQuoteData(prev => ({
        ...prev,
        ...demoQuoteSeed
      }));
      navigateTo(screen);
    };

    const allPageGroups = [
      {
        title: 'Onboarding',
        pages: [
          ['signin', 'Sign In'], ['welcome', 'Welcome'], ['link-gmb', 'Google'], ['business-setup', 'Business'],
          ['team-setup', 'Team'], ['setup-comms', 'Comms AI'], ['setup-final', 'Final'], ['setup-complete', 'Complete'], ['practice-mode', 'Practice']
        ]
      },
      {
        title: 'Fitter Core',
        pages: [
          ['dashboard', 'Home'], ['quote-hub', 'Quote & Booking'], ['bookings', 'Bookings'], ['quick-quote', 'Quick Quote'], ['quote-customer', 'Quote Customer'],
          ['quote-schedule', 'Quote Schedule'], ['quote-job', 'Quote Job'], ['quote-stock', 'Quote Stock'], ['quote-review', 'Quote Review'],
          ['quote-sent', 'Quote Sent'], ['cover-quote', 'Cover Quote'], ['job-enroute', 'En Route'], ['job-before-photo', 'Before Photos'],
          ['job-condition-check', 'Condition'], ['job-payment', 'Payment'], ['job-complete', 'Complete'], ['cover-job-complete', 'Cover Complete'], ['day-summary', 'Day Summary']
        ]
      },
      {
        title: 'Fitter Ops',
        pages: [
          ['route', 'Route'], ['stock', 'Stock'], ['invoices', 'Invoices'], ['invoice-create', 'Create Invoice'], ['disputes', 'Disputes'],
          ['dispute-detail', 'Dispute Detail'], ['evidence-vault', 'Evidence'], ['reviews', 'Reviews'], ['emergency', 'Emergency'], ['dispatcher', 'Dispatcher']
        ]
      },
      {
        title: 'Account & Settings',
        pages: [
          ['account', 'Account'], ['wallet', 'Wallet'], ['wallet-withdraw', 'Withdraw'], ['referral', 'Referral'],
          ['settings-profile', 'Profile'], ['settings-business', 'Business Settings'], ['settings-payments', 'Payments'],
          ['settings-google', 'Google Profile'], ['settings-bank', 'Bank'], ['settings-depots', 'Depots'],
          ['settings-invoices', 'Invoice Settings'], ['settings-notifications', 'Notifications'], ['settings-display', 'Display'],
          ['settings-calendar', 'Calendar'], ['settings-accounting', 'Accounting'], ['settings-help', 'Help'], ['settings-terms', 'Terms']
        ]
      },
      {
        title: 'Customer Web',
        pages: [
          ['customer-booking', 'Booking'], ['customer-booking-terms', 'Booking Terms'], ['customer-cover-terms', 'Cover Terms'],
          ['customer-cover-dashboard', 'Cover Dashboard'], ['customer-eta-tracking', 'ETA'], ['customer-pay-invoice', 'Pay Invoice'],
          ['customer-receipt', 'Receipt'], ['customer-claim', 'Claim']
        ]
      },
      {
        title: 'UX Boards',
        pages: [
          ['setup-flow-board', 'Setup Board'], ['flow-storyboard', 'Storyboard'], ['flow-runner', 'Flow Runner']
        ]
      }
    ];
    const allPageCount = allPageGroups.reduce((sum, g) => sum + g.pages.length, 0);

    const openAnyPage = (route) => {
      setFlowRunnerActive(true);
      const customerRoute = route.startsWith('customer-');
      setViewMode(customerRoute ? 'customer' : 'fitter');

      setQuoteData(prev => ({ ...prev, ...demoQuoteSeed }));
      setInvoiceFormData({ customerName: 'Sarah Jones', mobile: '07700 900456', description: '2x 205/55R16 fitting — XY34 FGH', amount: '124.99' });
      setCustomerClaimStep('select-issue');
      setClaimIssueType(null);
      setCustomerClaimPhotos({ tyre: false, plate: false });
      setConditionPassed(true);

      if (route === 'team-setup' || route === 'dispatcher') {
        setIsTeamAccount(true);
        setUserRole('owner');
      }
      if (['job-enroute', 'job-before-photo', 'job-after-photo', 'job-condition-check', 'job-payment', 'job-complete', 'day-summary', 'bookings'].includes(route)) {
        setActiveJob(demoJobSeed);
        setIsCoverJob(false);
        setBeforePhotos({});
        setAfterPhotos({});
      }
      if (['cover-job-complete', 'cover-quote'].includes(route)) {
        setActiveJob(demoCoverJobSeed);
        setIsCoverJob(true);
        setActiveCoverJob(demoCoverQuoteSeed);
      }
      if (route === 'dispute-detail') {
        setSelectedDispute(demoDisputeSeed);
      }

      navigateTo(route);
    };

    const LaunchButton = ({ label, hint, onClick, icon: Icon = ArrowRight, color = theme.primary }) => (
      <button onClick={onClick} style={{ width: '100%', minHeight: '56px', padding: '12px 14px', backgroundColor: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: '12px', color: theme.text, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left' }}>
        <div style={{ width: '34px', height: '34px', borderRadius: '10px', backgroundColor: `${color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon size={18} color={color} />
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, color: theme.text, fontSize: '14px', fontWeight: '700' }}>{label}</p>
          <p style={{ margin: '3px 0 0 0', color: theme.textMuted, fontSize: '12px' }}>{hint}</p>
        </div>
      </button>
    );

    return (
      <div style={{ minHeight: '100vh', backgroundColor: theme.bg, paddingBottom: '100px' }}>
        <Toast />
        <Header title="Flow Runner" />
        <div style={{ padding: '16px' }}>
          <Card style={{ marginBottom: '14px', borderColor: `${theme.primary}40` }}>
            <h3 style={{ margin: '0 0 6px 0', color: theme.text, fontSize: '18px', fontWeight: '700' }}>Run Every Journey</h3>
            <p style={{ margin: 0, color: theme.textMuted, fontSize: '14px' }}>Each launch seeds demo data first, then opens the right screen so the flow works properly end to end.</p>
            <div style={{ marginTop: '10px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button onClick={() => setFlowRunnerAuto(!flowRunnerAuto)} style={{ padding: '10px 12px', backgroundColor: flowRunnerAuto ? `${theme.primary}20` : theme.bgInput, border: `1px solid ${flowRunnerAuto ? theme.primary : theme.border}`, borderRadius: '10px', color: flowRunnerAuto ? theme.primary : theme.text, fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>
                {flowRunnerAuto ? 'Auto Flow: ON' : 'Auto Flow: OFF'}
              </button>
              <button onClick={() => { setFlowRunnerActive(false); setFlowRunnerAuto(false); }} style={{ padding: '10px 12px', backgroundColor: theme.bgInput, border: `1px solid ${theme.border}`, borderRadius: '10px', color: theme.text, fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>
                Reset Runner State
              </button>
            </div>
          </Card>

          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ margin: '0 0 10px 0', color: theme.primary, fontSize: '15px', fontWeight: '700' }}>Fitter Flows</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <LaunchButton label="Quick Quote Flow" hint="Plate lookup, pricing, SMS preview, send quote" onClick={() => launchQuoteFlow(true)} icon={Zap} />
              <LaunchButton label="Detailed Quote Flow" hint="Customer -> schedule -> job details -> stock -> preview" onClick={() => launchQuoteFlow(false)} icon={ClipboardList} />
              <LaunchButton label="Standard Job Flow" hint="En route -> before photos -> condition -> payment -> complete" onClick={() => launchFitterJobFlow(false)} icon={Navigation} />
              <LaunchButton label="Emergency Cover Flow" hint="Cover job path with no customer collection" onClick={() => launchFitterJobFlow(true)} icon={Shield} color={theme.danger} />
              <LaunchButton label="Invoice Flow" hint="Create invoice, preview message, send" onClick={launchInvoiceFlow} icon={FileText} color={theme.info} />
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#06b6d4', fontSize: '15px', fontWeight: '700' }}>Fitter Operations</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <LaunchButton label="Route" hint="Order + optimise jobs" onClick={() => openAnyPage('route')} icon={Route} color="#06b6d4" />
              <LaunchButton label="Stock" hint="Van/depot + alerts" onClick={() => openAnyPage('stock')} icon={Package} color="#06b6d4" />
              <LaunchButton label="Disputes" hint="Active/resolved + evidence" onClick={() => openAnyPage('disputes')} icon={AlertTriangle} color="#06b6d4" />
              <LaunchButton label="Evidence Vault" hint="Proof package export view" onClick={() => openAnyPage('evidence-vault')} icon={ShieldCheck} color="#06b6d4" />
            </div>
          </div>

          <div>
            <h3 style={{ margin: '0 0 10px 0', color: '#ef4444', fontSize: '15px', fontWeight: '700' }}>Customer Flows</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <LaunchButton label="Booking + Deposit" hint="Customer quote page with Apple/Google/PayPal/Card" onClick={() => launchCustomerFlow('customer-booking')} icon={CreditCard} color="#ef4444" />
              <LaunchButton label="Cover Dashboard" hint="Status, days left, claim button" onClick={() => launchCustomerFlow('customer-cover-dashboard')} icon={Shield} color="#ef4444" />
              <LaunchButton label="Receipt + Condition Report" hint="Post-job receipt with report and claim path" onClick={() => launchCustomerFlow('customer-receipt')} icon={FileCheck} color="#ef4444" />
              <LaunchButton label="Claim Flow" hint="Issue type, photos, location, decision" onClick={() => launchCustomerFlow('customer-claim')} icon={Phone} color="#ef4444" />
              <LaunchButton label="ETA + Pay Invoice" hint="Tracking and pay-link flow pages" onClick={() => launchCustomerFlow('customer-eta-tracking')} icon={MapPin} color="#ef4444" />
            </div>
          </div>

          <Card style={{ marginTop: '16px', borderColor: `${theme.info}40` }}>
            <h3 style={{ margin: '0 0 6px 0', color: theme.text, fontSize: '16px', fontWeight: '700' }}>All Pages ({allPageCount})</h3>
            <p style={{ margin: 0, color: theme.textMuted, fontSize: '13px' }}>Every fitter and customer page is directly launchable with seeded demo state.</p>
          </Card>
          {allPageGroups.map((group) => (
            <div key={group.title} style={{ marginBottom: '14px' }}>
              <h4 style={{ margin: '0 0 8px 0', color: theme.info, fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {group.title} ({group.pages.length})
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '8px' }}>
                {group.pages.map(([route, label]) => (
                  <button
                    key={route}
                    onClick={() => openAnyPage(route)}
                    style={{ minHeight: '52px', borderRadius: '10px', border: `1px solid ${theme.border}`, backgroundColor: theme.bgCard, color: theme.text, fontSize: '12px', fontWeight: '700', cursor: 'pointer', padding: '8px', textAlign: 'left' }}
                    title={route}
                  >
                    <span style={{ display: 'block', marginBottom: '3px' }}>{label}</span>
                    <span style={{ color: theme.textMuted, fontSize: '10px', fontWeight: '600', wordBreak: 'break-word' }}>{route}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ============================================
  // DASHBOARD - Next Job at TOP
  // ============================================
  const DashboardScreen = () => {
    const showDispatcher = userRole === 'owner' && isTeamAccount;
    return (
      <div style={{ minHeight: '100vh', backgroundColor: theme.bg, paddingBottom: '100px' }}>
        <Toast />
        {emergencyAccepted && (
          <div style={{ backgroundColor: theme.primary, color: '#000', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <CheckCircle size={20} />
            <div style={{ flex: 1 }}><p style={{ margin: 0, fontWeight: '600' }}>Emergency cover job accepted</p><p style={{ margin: '2px 0 0 0', fontSize: '14px' }}>TYRE-FIT will update the customer</p></div>
            <button onClick={() => setEmergencyAccepted(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#000' }}><X size={20} /></button>
          </div>
        )}
        <div style={{ backgroundColor: theme.bgCard, borderBottom: `1px solid ${theme.border}`, padding: '16px' }}>
          {/* OFFLINE BANNER */}
          {isOffline && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', backgroundColor: `${theme.warning}15`, borderRadius: '8px', marginBottom: '12px', border: `1px solid ${theme.warning}30` }}>
              <NoWifi size={16} color={theme.warning} />
              <span style={{ color: theme.warning, fontSize: '13px', fontWeight: '600' }}>Saved — will sync when online</span>
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div><p style={{ color: theme.textMuted, fontSize: '14px', margin: 0 }}>{getTimeOfDay() === 'morning' ? 'Good morning' : getTimeOfDay() === 'evening' ? 'Evening' : 'Hello'}</p><h1 style={{ fontSize: '22px', fontWeight: 'bold', color: theme.text, margin: '4px 0 0 0' }}>{signUpData.fullName?.split(' ')[0] || 'Dan'}</h1></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button onClick={() => setShowGlobalSearch(true)} style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: theme.bgInput, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Search size={18} color={theme.textMuted} /></button>
              <Badge variant="success">3 jobs today</Badge>
              <FontSizeToggle />
              <ThemeToggle />
            </div>
          </div>
        </div>
        
        <div style={{ padding: '16px' }}>
          
          {/* === SECTION 1: URGENT STUFF — things that need action NOW === */}
          
          {/* INCOMING COVER JOBS — urgent, needs immediate decision */}
          <Card style={{ marginBottom: '12px' }}>
            <Toggle
              label="Emergency jobs right now"
              checked={signUpData.availability.emergency}
              onChange={(v) => setSignUpData({
                ...signUpData,
                availability: { ...signUpData.availability, emergency: v }
              })}
            />
            <p style={{ margin: '4px 0 0 0', color: theme.textMuted, fontSize: '12px' }}>
              {signUpData.availability.emergency ? 'You can receive cover job alerts' : 'Cover jobs paused for now'}
            </p>
          </Card>

          {coverJobs.length > 0 && signUpData.availability.emergency && (
            <Card style={{ borderColor: theme.danger, marginBottom: '12px', borderWidth: '2px' }}>
              <button onClick={() => setCoverJobsExpanded(!coverJobsExpanded)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: coverJobsExpanded ? '12px' : 0 }}>
                <div style={{ width: '40px', height: '40px', backgroundColor: `${theme.danger}15`, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <ShieldCheck size={20} color={theme.danger} />
                </div>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '15px', fontWeight: '700', color: theme.text }}>Emergency Cover Jobs</span>
                    <Badge variant="danger">{coverJobs.length}</Badge>
                  </div>
                  <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: theme.textMuted }}>{coverJobs.length === 1 ? '1 customer needs help nearby' : `${coverJobs.length} customers need help nearby`}</p>
                </div>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: theme.bgInput, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {coverJobsExpanded ? <Minus size={18} color={theme.textMuted} /> : <Plus size={18} color={theme.textMuted} />}
                </div>
              </button>
              
              {coverJobsExpanded && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {coverJobs.map(cj => {
                    const tyreOnVan = mockStock.find(s => s.size === cj.tyreSize && s.location === 'Van');
                    return (
                      <div key={cj.id} style={{ padding: '14px', backgroundColor: theme.bgInput, borderRadius: '12px', border: `1px solid ${theme.border}` }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <span style={{ fontSize: '12px', color: theme.danger, fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Cover Job</span>
                          <span style={{ fontSize: '12px', color: theme.textMuted }}>{cj.timeAgo}</span>
                        </div>
                        <h4 style={{ margin: '0 0 4px 0', color: theme.text, fontWeight: '600', fontSize: '15px' }}>{cj.name} — {cj.plate}</h4>
                        <p style={{ margin: '0 0 4px 0', color: theme.textMuted, fontSize: '13px' }}><MapPin size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} />{cj.location} — {cj.distance}</p>
                        <p style={{ margin: '0 0 8px 0', color: theme.text, fontSize: '13px' }}>{cj.issue} — {cj.tyreSize} x{cj.qty}</p>
                        
                        <div style={{ display: 'flex', gap: '6px', marginBottom: '10px' }}>
                          {tyreOnVan ? (
                            <Badge variant="success">{cj.tyreSize} on van</Badge>
                          ) : (
                            <Badge variant="warning">Depot pickup needed</Badge>
                          )}
                        </div>
                        
                        <div style={{ padding: '8px 10px', backgroundColor: `${theme.primary}08`, borderRadius: '8px', marginBottom: '10px' }}>
                          <p style={{ margin: 0, fontSize: '12px', color: theme.textMuted }}>Quote goes to TYRE-FIT — <strong style={{ color: theme.primary }}>TYRE-FIT pays you directly</strong></p>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <Button variant="secondary" size="small" fullWidth onClick={() => { setDeclineCoverJobId(cj.id); setShowDeclineModal(true); }}>{"Can't Do It"}</Button>
                          <Button variant="success" size="small" fullWidth onClick={() => {
                            setActiveCoverJob(cj);
                            setCoverQuotePrice('');
                            setCoverDepotNeeded(!tyreOnVan);
                            setEmergencyAccepted(true);
                            navigateTo('cover-quote');
                          }}>Accept & Quote</Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          )}

          {/* STOCK ALERT — you need to pick up tyres before your first job */}
          {mockUpcomingBookingsNeedingStock.length > 0 && (getTimeOfDay() === 'morning' || getTimeOfDay() === 'evening') && (
            <Card style={{ borderColor: theme.warning, marginBottom: '12px', borderWidth: '2px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', backgroundColor: `${theme.warning}15`, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Package size={20} color={theme.warning} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, color: theme.text, fontWeight: '700', fontSize: '14px' }}>Stock needed for upcoming jobs</p>
                  {mockUpcomingBookingsNeedingStock.map(b => (
                    <p key={b.id} style={{ margin: '4px 0 0 0', color: theme.textMuted, fontSize: '13px' }}>{b.qty}x {b.tyreSize} — collect from {b.location}</p>
                  ))}
                </div>
                <button onClick={() => navigateTo('stock')} style={{ padding: '8px 12px', backgroundColor: theme.warning, border: 'none', borderRadius: '8px', cursor: 'pointer', color: '#000', fontWeight: '600', fontSize: '12px' }}>View</button>
              </div>
            </Card>
          )}

          {/* WEATHER — affects your outdoor jobs today */}
          {getTimeOfDay() === 'morning' && (
            <Card style={{ marginBottom: '12px', borderColor: `${theme.info}40` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', backgroundColor: `${theme.info}15`, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <RainAlert size={20} color={theme.info} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, color: theme.text, fontWeight: '600', fontSize: '14px' }}>Rain forecast 2-5pm</p>
                  <p style={{ margin: '2px 0 0 0', color: theme.textMuted, fontSize: '13px' }}>2 outdoor jobs in that window</p>
                </div>
              </div>
            </Card>
          )}

          {/* === SECTION 2: YOUR NEXT JOB — the main thing === */}
          
          {(() => {
            const nextJob = activeJob || mockJobs.find(j => j.depositPaid);
            const isInProgress = !!activeJob;
            if (!nextJob) {
              return (
                <Card highlight style={{ marginBottom: '16px', textAlign: 'center' }}>
                  <h3 style={{ margin: '0 0 8px 0', color: theme.text, fontWeight: '700' }}>No bookings yet today</h3>
                  <p style={{ margin: '0 0 14px 0', color: theme.textMuted, fontSize: '14px' }}>
                    Send a quote to get your first job on the board.
                  </p>
                  <Button onClick={() => navigateTo('quick-quote')} icon={Zap}>Send a Quote</Button>
                </Card>
              );
            }
            return (
            <Card highlight style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <h3 style={{ margin: 0, color: theme.primary, fontWeight: '700', fontSize: '16px' }}>{isInProgress ? 'Job In Progress' : 'Your Next Job'}</h3>
                {isInProgress ? <Badge variant="warning">In progress</Badge> : <Badge variant="info">{nextJob.eta} away</Badge>}
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: theme.text, margin: '0 0 8px 0' }}>{nextJob.customer}</h3>
              <p style={{ color: theme.textMuted, margin: '0 0 4px 0', fontSize: '16px' }}>{nextJob.plate} • {nextJob.tyreSize}</p>
              <p style={{ color: theme.textSubtle, fontSize: '15px', margin: '0 0 12px 0' }}>{nextJob.location}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                {nextJob.isCoverJob ? <Badge variant="danger">Cover Job</Badge> : nextJob.isEmergency ? <Badge variant="warning">Urgent</Badge> : <Badge variant="success">Deposit paid</Badge>}
                {nextJob.stockOnVan !== false && <Badge variant="success">Tyres on van</Badge>}
              </div>
              {isInProgress ? (
                <Button onClick={() => navigateTo('job-enroute')} icon={Navigation}>Continue Job</Button>
              ) : (
                <Button onClick={() => { setActiveJob(nextJob); setIsCoverJob(!!nextJob.isCoverJob); setBeforePhotos({}); setAfterPhotos({}); setCustomerSigned(false); navigateTo('job-enroute'); }} icon={Navigation}>Start This Job</Button>
              )}
            </Card>
            );
          })()}

          {/* TEAM — only for owners, right after next job */}
          {showDispatcher && (
            <Card onClick={() => navigateTo('dispatcher')} style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', backgroundColor: `${theme.info}20`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Users size={24} color={theme.info} /></div>
                <div style={{ flex: 1 }}><h3 style={{ fontSize: '16px', fontWeight: '600', color: theme.text, margin: 0 }}>My Team</h3><p style={{ fontSize: '14px', color: theme.textMuted, margin: '4px 0 0 0' }}>See all fitters and assign jobs</p></div>
                <ChevronRight size={20} color={theme.textMuted} />
              </div>
            </Card>
          )}

          {/* === SECTION 3: QUICK ACTIONS — what you do most === */}
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <button onClick={() => navigateTo('quick-quote')} style={{ backgroundColor: theme.bgCard, border: `2px solid ${theme.primary}`, borderRadius: '16px', padding: '24px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <div style={{ width: '56px', height: '56px', backgroundColor: `${theme.primary}20`, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Zap size={28} color={theme.primary} /></div>
              <span style={{ fontSize: '16px', fontWeight: '700', color: theme.text }}>Quick Quote</span>
            </button>
            <button onClick={() => navigateTo('route')} style={{ backgroundColor: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: '16px', padding: '24px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <div style={{ width: '56px', height: '56px', backgroundColor: '#f9731620', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Map size={28} color="#f97316" /></div>
              <span style={{ fontSize: '16px', fontWeight: '600', color: theme.text }}>Best Route</span>
            </button>
          </div>

          {/* TODAY'S QUOTES — quick glance, are customers paying? */}
          <Card style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ margin: 0, color: theme.text, fontWeight: '600', fontSize: '15px' }}>{"Today's Quotes"}</h3>
              <span style={{ color: theme.textMuted, fontSize: '13px' }}>{quotesStatus.sent} sent</span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ flex: 1, padding: '12px', backgroundColor: `${theme.primary}10`, borderRadius: '10px', textAlign: 'center' }}>
                <p style={{ margin: 0, color: theme.primary, fontWeight: '700', fontSize: '20px' }}>{quotesStatus.paid}</p>
                <p style={{ margin: '2px 0 0 0', color: theme.textMuted, fontSize: '12px' }}>Paid</p>
              </div>
              <div style={{ flex: 1, padding: '12px', backgroundColor: `${theme.info}10`, borderRadius: '10px', textAlign: 'center' }}>
                <p style={{ margin: 0, color: theme.info, fontWeight: '700', fontSize: '20px' }}>{quotesStatus.opened}</p>
                <p style={{ margin: '2px 0 0 0', color: theme.textMuted, fontSize: '12px' }}>Opened</p>
              </div>
              <div style={{ flex: 1, padding: '12px', backgroundColor: `${theme.warning}10`, borderRadius: '10px', textAlign: 'center' }}>
                <p style={{ margin: 0, color: theme.warning, fontWeight: '700', fontSize: '20px' }}>{quotesStatus.waiting}</p>
                <p style={{ margin: '2px 0 0 0', color: theme.textMuted, fontSize: '12px' }}>Waiting</p>
              </div>
            </div>
          </Card>

          {/* === SECTION 4: EVERYTHING ELSE — navigate to other screens === */}
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            {[
              { icon: PoundSterling, title: 'Invoices', sub: mockInvoices.overdue.length > 0 ? `${mockInvoices.overdue.length} overdue` : 'All paid', color: mockInvoices.overdue.length > 0 ? theme.danger : theme.info, screen: 'invoices' },
              { icon: Package, title: 'My Stock', sub: 'Tyres on van', color: '#ec4899', screen: 'stock' },
              { icon: Star, title: 'Reviews', sub: '4.8 average', color: '#eab308', screen: 'reviews' },
              { icon: Calendar, title: 'Bookings', sub: 'All jobs', color: '#06b6d4', screen: 'bookings' },
              { icon: Shield, title: 'Disputes', sub: 'No open cases', color: '#8b5cf6', screen: 'disputes' },
              { icon: ShieldCheck, title: 'Customer Cover', sub: `${mockCoverCustomers.filter(c => c.status === 'active' || c.status === 'expiring').length} active`, color: theme.primary, screen: 'emergency' },
            ].map((item) => (
              <button key={item.screen} onClick={() => navigateTo(item.screen)} style={{ backgroundColor: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: '16px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', textAlign: 'left' }}>
                <div style={{ width: '44px', height: '44px', backgroundColor: `${item.color}20`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><item.icon size={22} color={item.color} /></div>
                <div>
                  <span style={{ fontSize: '15px', fontWeight: '600', color: theme.text, display: 'block' }}>{item.title}</span>
                  <span style={{ fontSize: '13px', color: item.color === theme.danger ? theme.danger : theme.textMuted }}>{item.sub}</span>
                </div>
              </button>
            ))}
          </div>

          {/* WALLET + MILEAGE — combined row, end-of-day stuff */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
            <Card onClick={() => navigateTo('wallet')} style={{ flex: 1, marginBottom: 0, cursor: 'pointer', backgroundColor: theme.primary }}>
              <p style={{ margin: 0, color: '#000', opacity: 0.7, fontSize: '12px' }}>Wallet</p>
              <p style={{ margin: '4px 0 0 0', color: '#000', fontSize: '22px', fontWeight: '700' }}>{'\u00A3'}{walletBalance.toFixed(2)}</p>
            </Card>
            <Card onClick={() => setShowMileage(!showMileage)} style={{ flex: 1, marginBottom: 0, cursor: 'pointer' }}>
              <p style={{ margin: 0, color: theme.textMuted, fontSize: '12px' }}>Miles today</p>
              <p style={{ margin: '4px 0 0 0', color: theme.text, fontSize: '22px', fontWeight: '700' }}>{mileageToday}</p>
            </Card>
          </div>

          {/* MILEAGE EXPANDED */}
          {showMileage && (
            <Card style={{ marginBottom: '12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '12px' }}>
                <div style={{ textAlign: 'center', padding: '8px', backgroundColor: theme.bgInput, borderRadius: '8px' }}>
                  <p style={{ margin: 0, color: theme.text, fontWeight: '700', fontSize: '18px' }}>{mileageToday}</p>
                  <p style={{ margin: '2px 0 0 0', color: theme.textMuted, fontSize: '11px' }}>Today</p>
                </div>
                <div style={{ textAlign: 'center', padding: '8px', backgroundColor: theme.bgInput, borderRadius: '8px' }}>
                  <p style={{ margin: 0, color: theme.text, fontWeight: '700', fontSize: '18px' }}>{mileageWeek}</p>
                  <p style={{ margin: '2px 0 0 0', color: theme.textMuted, fontSize: '11px' }}>This week</p>
                </div>
                <div style={{ textAlign: 'center', padding: '8px', backgroundColor: theme.bgInput, borderRadius: '8px' }}>
                  <p style={{ margin: 0, color: theme.text, fontWeight: '700', fontSize: '18px' }}>{mileageMonth}</p>
                  <p style={{ margin: '2px 0 0 0', color: theme.textMuted, fontSize: '11px' }}>This month</p>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ color: theme.textMuted, fontSize: '12px' }}>HMRC rate: 45p/mile</span>
                <span style={{ color: theme.primary, fontWeight: '600', fontSize: '13px' }}>{'\u00A3'}{(mileageMonth * 0.45).toFixed(2)} claimable</span>
              </div>
              <button onClick={() => showToast('Mileage report downloaded')} style={{ width: '100%', padding: '10px', backgroundColor: theme.bgInput, border: `1px solid ${theme.border}`, borderRadius: '8px', color: theme.text, fontSize: '13px', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}><Download size={14} /> Export for Accountant</button>
            </Card>
          )}

          {/* COVER EXPIRING — nudge, not urgent */}
          {(() => {
            const expiring = mockCoverCustomers.filter(c => c.status === 'expiring');
            if (expiring.length === 0) return null;
            return (
              <Card style={{ borderColor: theme.warning, marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', backgroundColor: `${theme.warning}15`, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Shield size={20} color={theme.warning} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, color: theme.text, fontWeight: '700', fontSize: '14px' }}>{expiring.length} cover{expiring.length > 1 ? 's' : ''} expiring soon</p>
                    <p style={{ margin: '4px 0 0 0', color: theme.textMuted, fontSize: '13px' }}>{expiring.map(c => c.name).join(', ')}</p>
                  </div>
                  <button onClick={() => navigateTo('emergency')} style={{ padding: '8px 12px', backgroundColor: theme.warning, border: 'none', borderRadius: '8px', cursor: 'pointer', color: '#000', fontWeight: '600', fontSize: '12px' }}>Message</button>
                </div>
              </Card>
            );
          })()}

          {/* OVERDUE INVOICES — nudge */}
          {mockInvoices.overdue.length > 0 && getTimeOfDay() === 'evening' && (
            <Card style={{ borderColor: theme.danger, marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', backgroundColor: `${theme.danger}15`, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <PoundSterling size={20} color={theme.danger} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, color: theme.text, fontWeight: '700', fontSize: '14px' }}>{mockInvoices.overdue.length} overdue invoice{mockInvoices.overdue.length > 1 ? 's' : ''}</p>
                  <p style={{ margin: '4px 0 0 0', color: theme.danger, fontSize: '13px', fontWeight: '600' }}>{'\u00A3'}{mockInvoices.overdue.reduce((s, i) => s + i.amount, 0).toFixed(2)} outstanding</p>
                </div>
                <button onClick={() => navigateTo('invoices')} style={{ padding: '8px 12px', backgroundColor: theme.danger, border: 'none', borderRadius: '8px', cursor: 'pointer', color: '#fff', fontWeight: '600', fontSize: '12px' }}>Chase</button>
              </div>
            </Card>
          )}

        </div>
        {showDeclineModal && (
          <Modal title="Can't Take This Job?" onClose={() => setShowDeclineModal(false)}>
            <p style={{ color: theme.textMuted, marginBottom: '16px' }}>No problem — TYRE-FIT will find another fitter nearby.</p>
            <p style={{ color: theme.textMuted, marginBottom: '24px', fontSize: '14px' }}><strong style={{ color: theme.text }}>They stay your customer.</strong> Future tyre work, alerts, and quotes still come to you.</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Button variant="secondary" onClick={() => setShowDeclineModal(false)} fullWidth>Go Back</Button>
              <Button onClick={() => { setShowDeclineModal(false); setCoverJobs(prev => prev.filter(j => j.id !== declineCoverJobId)); showToast('Passed to nearest available fitter'); }} fullWidth>Pass Job</Button>
            </div>
          </Modal>
        )}

        {/* GLOBAL CUSTOMER SEARCH */}
        {showGlobalSearch && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: theme.bg, zIndex: 2000, display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '16px', borderBottom: `1px solid ${theme.border}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button onClick={() => { setShowGlobalSearch(false); setGlobalSearchTerm(''); }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}><ArrowLeft size={24} color={theme.text} /></button>
                <div style={{ flex: 1, position: 'relative' }}>
                  <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: theme.textMuted }} />
                  <input autoFocus type="text" placeholder="Search by name, plate, or phone..." value={globalSearchTerm} onChange={(e) => setGlobalSearchTerm(e.target.value)} style={{ width: '100%', padding: '14px 14px 14px 44px', backgroundColor: theme.bgInput, border: `1px solid ${theme.border}`, borderRadius: '12px', color: theme.text, fontSize: '16px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '8px 16px' }}>
              {globalSearchTerm.length < 2 ? (
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <Search size={40} color={theme.textMuted} style={{ marginBottom: '12px', opacity: 0.3 }} />
                  <p style={{ color: theme.textMuted, fontSize: '15px' }}>Search all your customers</p>
                  <p style={{ color: theme.textMuted, fontSize: '13px' }}>Find by name, reg plate, or phone number</p>
                </div>
              ) : (
                (() => {
                  const term = globalSearchTerm.toLowerCase();
                  const results = allCustomers.filter(c => c.name.toLowerCase().includes(term) || c.plate.toLowerCase().replace(/\s/g, '').includes(term.replace(/\s/g, '')) || c.phone.includes(term));
                  if (results.length === 0) return <p style={{ color: theme.textMuted, textAlign: 'center', padding: '40px', fontSize: '15px' }}>No customers found for "{globalSearchTerm}"</p>;
                  return results.map((c, i) => (
                    <Card key={i} style={{ marginBottom: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div>
                          <h3 style={{ margin: 0, color: theme.text, fontWeight: '600', fontSize: '16px' }}>{c.name}</h3>
                          <p style={{ margin: '3px 0 0 0', color: theme.textMuted, fontSize: '13px' }}>{c.plate} — {c.vehicle}</p>
                        </div>
                        <Badge variant={c.status === 'active-cover' ? 'success' : c.status === 'expiring-cover' ? 'warning' : c.status === 'expired-cover' ? 'default' : 'info'}>
                          {c.status === 'active-cover' ? 'Covered' : c.status === 'expiring-cover' ? 'Expiring' : c.status === 'expired-cover' ? 'Expired' : 'No cover'}
                        </Badge>
                      </div>
                      <p style={{ margin: '0 0 10px 0', color: theme.textMuted, fontSize: '12px' }}>Last job: {c.lastJob} · {c.tyreSize} · {c.phone}</p>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => { setShowGlobalSearch(false); setGlobalSearchTerm(''); setQuoteData(prev => ({...prev, customerName: c.name, mobile: c.phone, numberPlate: c.plate})); navigateTo('quote-customer'); }} style={{ flex: 1, padding: '10px', backgroundColor: `${theme.primary}15`, border: `1px solid ${theme.primary}40`, borderRadius: '8px', cursor: 'pointer', color: theme.primary, fontWeight: '600', fontSize: '13px' }}>New Quote</button>
                        <button onClick={() => { showToast(`Calling ${c.name}...`); }} style={{ padding: '10px 14px', backgroundColor: theme.bgInput, border: `1px solid ${theme.border}`, borderRadius: '8px', cursor: 'pointer' }}><Phone size={16} color={theme.text} /></button>
                        <button onClick={() => { showToast(`Opening WhatsApp for ${c.name}...`); }} style={{ padding: '10px 14px', backgroundColor: theme.bgInput, border: `1px solid ${theme.border}`, borderRadius: '8px', cursor: 'pointer' }}><MessageSquare size={16} color={theme.text} /></button>
                      </div>
                    </Card>
                  ));
                })()
              )}
            </div>
          </div>
        )}

        <BottomNav />
      </div>
    );
  };
  // ============================================
  // QUOTE & BOOKING HUB
  // ============================================
  const QuoteHubScreen = () => (
    <div style={{ minHeight: '100vh', backgroundColor: theme.bg, paddingBottom: '100px' }}>
      <Toast />
      <Header title="Quote & Booking" subtitle="Pick job type first" />
      <div style={{ padding: '16px' }}>
        <Card style={{ marginBottom: '12px', borderColor: `${theme.primary}40` }}>
          <h3 style={{ margin: '0 0 6px 0', color: theme.text, fontSize: '18px', fontWeight: '700' }}>What just came in?</h3>
          <p style={{ margin: 0, color: theme.textMuted, fontSize: '14px' }}>Every new request starts here. Choose emergency or booking, then quote.</p>
        </Card>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px', marginBottom: '12px' }}>
          <button onClick={() => { setQuoteData(prev => ({ ...prev, isEmergency: true })); navigateTo('quick-quote'); }} style={{ backgroundColor: theme.bgCard, border: `2px solid ${theme.warning}`, borderRadius: '14px', padding: '18px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', textAlign: 'left' }}>
            <div style={{ width: '46px', height: '46px', backgroundColor: `${theme.warning}20`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Zap size={24} color={theme.warning} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, color: theme.text, fontSize: '16px', fontWeight: '700' }}>Emergency Job</p>
              <p style={{ margin: '3px 0 0 0', color: theme.textMuted, fontSize: '13px' }}>Arrival window 45-90 mins. Customer gets fitter-mins-away text.</p>
            </div>
            <ChevronRight size={18} color={theme.textMuted} />
          </button>

          <button onClick={() => { setQuoteData(prev => ({ ...prev, isEmergency: false })); navigateTo('quote-customer'); }} style={{ backgroundColor: theme.bgCard, border: `2px solid ${theme.primary}`, borderRadius: '14px', padding: '18px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', textAlign: 'left' }}>
            <div style={{ width: '46px', height: '46px', backgroundColor: `${theme.primary}20`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Calendar size={24} color={theme.primary} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, color: theme.text, fontSize: '16px', fontWeight: '700' }}>Book Me In</p>
              <p style={{ margin: '3px 0 0 0', color: theme.textMuted, fontSize: '13px' }}>Customer picks a 2-hour arrival window. Mins-away text still sent on the day.</p>
            </div>
            <ChevronRight size={18} color={theme.textMuted} />
          </button>

          <button onClick={() => navigateTo('bookings')} style={{ backgroundColor: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: '14px', padding: '18px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', textAlign: 'left' }}>
            <div style={{ width: '46px', height: '46px', backgroundColor: '#06b6d420', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ClipboardList size={24} color="#06b6d4" />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, color: theme.text, fontSize: '16px', fontWeight: '700' }}>Manage Bookings</p>
              <p style={{ margin: '3px 0 0 0', color: theme.textMuted, fontSize: '13px' }}>See scheduled jobs and start the runner when it is time.</p>
            </div>
            <ChevronRight size={18} color={theme.textMuted} />
          </button>
        </div>
      </div>
      <BottomNav />
    </div>
  );

  // ============================================
  const QuoteCustomerScreen = () => (
    <div style={{ minHeight: '100vh', backgroundColor: theme.bg, paddingBottom: '100px' }}>
      <Header title="New Quote" subtitle={`Step 1 of ${quoteData.isEmergency ? '4' : '5'}`} />
      <ProgressSteps steps={quoteData.isEmergency ? ['Customer', 'Job', 'Check', 'Send'] : ['Customer', 'Schedule', 'Job', 'Check', 'Send']} currentStep={0} />
      <div style={{ padding: '24px' }}>
        <h3 style={{ margin: '0 0 16px 0', color: theme.text, fontSize: '18px' }}>Who is the customer?</h3>
        <Input label="Customer Name" placeholder="e.g. John Smith" value={quoteData.customerName} onChange={(v) => setQuoteData({...quoteData, customerName: v})} required />
        <Input label="Mobile Number" placeholder="07700 900123" type="tel" icon={Phone} value={quoteData.mobile} onChange={(v) => setQuoteData({...quoteData, mobile: v})} required />
        <Input label="Number Plate" placeholder="AB12 CDE" uppercase icon={Car} value={quoteData.numberPlate} onChange={(v) => setQuoteData({...quoteData, numberPlate: v})} required />
        {quoteData.numberPlate.length >= 7 && (
          <Card><div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><CheckCircle size={20} color={theme.primary} /><div><p style={{ margin: 0, color: theme.text, fontWeight: '500' }}>2019 Ford Focus</p><p style={{ margin: '4px 0 0 0', color: theme.textMuted, fontSize: '14px' }}>Found from number plate</p></div></div></Card>
        )}
        <div style={{ marginTop: '24px', marginBottom: '24px' }}>
          <h3 style={{ margin: '0 0 12px 0', color: theme.text, fontSize: '16px' }}>Job type</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <button onClick={() => setQuoteData({...quoteData, isEmergency: false})} style={{ padding: '20px', backgroundColor: !quoteData.isEmergency ? `${theme.primary}20` : theme.bgInput, border: `2px solid ${!quoteData.isEmergency ? theme.primary : theme.border}`, borderRadius: '12px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}><Calendar size={28} color={!quoteData.isEmergency ? theme.primary : theme.textMuted} /><span style={{ fontWeight: '600', color: !quoteData.isEmergency ? theme.primary : theme.text }}>Booking</span><span style={{ fontSize: '12px', color: theme.textMuted }}>2-hour arrival window</span></button>
            <button onClick={() => setQuoteData({...quoteData, isEmergency: true})} style={{ padding: '20px', backgroundColor: quoteData.isEmergency ? `${theme.warning}20` : theme.bgInput, border: `2px solid ${quoteData.isEmergency ? theme.warning : theme.border}`, borderRadius: '12px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}><Zap size={28} color={quoteData.isEmergency ? theme.warning : theme.textMuted} /><span style={{ fontWeight: '600', color: quoteData.isEmergency ? theme.warning : theme.text }}>Emergency</span><span style={{ fontSize: '12px', color: theme.textMuted }}>45-90 mins arrival</span></button>
          </div>
          <p style={{ margin: '10px 0 0 0', color: theme.textMuted, fontSize: '12px', textAlign: 'center' }}>In both cases, customer gets a text when you are minutes away.</p>
        </div>
        <Button onClick={() => navigateTo(quoteData.isEmergency ? 'quote-job' : 'quote-schedule')} icon={ArrowRight}>Next</Button>
      </div>
      <BottomNav />
    </div>
  );

  // ============================================
  // QUOTE - SCHEDULE (Booking only)
  // ============================================
  const QuoteScheduleScreen = () => {
    const today = new Date();
    const days = [];
    for (let i = 0; i < 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      days.push({
        date: d.toISOString().split('T')[0],
        label: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-GB', { weekday: 'short' }),
        dayNum: d.getDate(),
        month: d.toLocaleDateString('en-GB', { month: 'short' })
      });
    }
    const bookingWindows = ['08:00-10:00', '09:00-11:00', '10:00-12:00', '11:00-13:00', '12:00-14:00', '13:00-15:00', '14:00-16:00', '15:00-17:00', '16:00-18:00'];

    return (
      <div style={{ minHeight: '100vh', backgroundColor: theme.bg, paddingBottom: '100px' }}>
        <Header title="Schedule" subtitle="Pick a 2-hour arrival window" />
        <ProgressSteps steps={['Customer', 'Schedule', 'Job', 'Check', 'Send']} currentStep={1} />
        <div style={{ padding: '24px' }}>
          <h3 style={{ margin: '0 0 12px 0', color: theme.text, fontSize: '16px' }}>Pick a day</h3>
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '24px' }}>
            {days.map(d => (
              <button key={d.date} onClick={() => setQuoteData({...quoteData, bookingDate: d.date})} style={{
                minWidth: '72px', padding: '12px 8px', backgroundColor: quoteData.bookingDate === d.date ? theme.primary : theme.bgInput,
                border: `2px solid ${quoteData.bookingDate === d.date ? theme.primary : theme.border}`, borderRadius: '12px',
                cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flexShrink: 0
              }}>
                <span style={{ fontSize: '12px', fontWeight: '600', color: quoteData.bookingDate === d.date ? '#000' : theme.textMuted }}>{d.label}</span>
                <span style={{ fontSize: '20px', fontWeight: '700', color: quoteData.bookingDate === d.date ? '#000' : theme.text }}>{d.dayNum}</span>
                <span style={{ fontSize: '11px', color: quoteData.bookingDate === d.date ? '#000' : theme.textMuted }}>{d.month}</span>
              </button>
            ))}
          </div>

          <h3 style={{ margin: '0 0 12px 0', color: theme.text, fontSize: '16px' }}>Pick a booking window</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginBottom: '24px' }}>
            {bookingWindows.map(t => (
              <button key={t} onClick={() => setQuoteData({...quoteData, bookingTime: t})} style={{
                padding: '14px 8px', backgroundColor: quoteData.bookingTime === t ? theme.primary : theme.bgInput,
                border: `1px solid ${quoteData.bookingTime === t ? theme.primary : theme.border}`, borderRadius: '8px',
                color: quoteData.bookingTime === t ? '#000' : theme.text, fontWeight: quoteData.bookingTime === t ? '700' : '400',
                fontSize: '14px', cursor: 'pointer'
              }}>{t}</button>
            ))}
          </div>

          {quoteData.bookingDate && quoteData.bookingTime && (
            <Card style={{ marginBottom: '24px', backgroundColor: `${theme.primary}10`, borderColor: theme.primary }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Calendar size={20} color={theme.primary} />
                <p style={{ margin: 0, color: theme.text, fontWeight: '600' }}>
                  {new Date(quoteData.bookingDate).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })} · {quoteData.bookingTime} window
                </p>
              </div>
            </Card>
          )}

          <div style={{ display: 'flex', gap: '12px' }}>
            <Button variant="secondary" onClick={goBack} fullWidth>Back</Button>
            <Button onClick={() => navigateTo('quote-job')} fullWidth icon={ArrowRight} disabled={!quoteData.bookingDate || !quoteData.bookingTime}>Next</Button>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  };

  const QuoteJobScreen = () => {
    const addTyre = () => setQuoteData({...quoteData, tyres: [...quoteData.tyres, { position: 'Rear', size: '', qty: 1 }]});
    const updateTyre = (i, field, val) => { const t = [...quoteData.tyres]; t[i][field] = val; setQuoteData({...quoteData, tyres: t}); };
    const removeTyre = (i) => setQuoteData({...quoteData, tyres: quoteData.tyres.filter((_, idx) => idx !== i)});
    
    return (
      <div style={{ minHeight: '100vh', backgroundColor: theme.bg, paddingBottom: '100px' }}>
        <Header title="Job Details" subtitle={quoteData.isEmergency ? 'Step 2 of 4' : 'Step 3 of 5'} />
        <ProgressSteps steps={quoteData.isEmergency ? ['Customer', 'Job', 'Check', 'Send'] : ['Customer', 'Schedule', 'Job', 'Check', 'Send']} currentStep={quoteData.isEmergency ? 1 : 2} />
        <div style={{ padding: '24px' }}>
          <h3 style={{ margin: '0 0 16px 0', color: theme.text, fontSize: '18px' }}>What tyres do they need?</h3>
          {quoteData.tyres.map((tyre, i) => (
            <Card key={i}>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <select value={tyre.position} onChange={(e) => updateTyre(i, 'position', e.target.value)} style={{ flex: '1 1 100px', padding: '14px', backgroundColor: theme.bgInput, border: `1px solid ${theme.border}`, borderRadius: '8px', color: theme.text, fontSize: '16px' }}><option value="Front">Front</option><option value="Rear">Rear</option><option value="All">All 4</option></select>
                <input placeholder="Size e.g. 205/55R16" value={tyre.size} onChange={(e) => updateTyre(i, 'size', e.target.value)} style={{ flex: '2 1 150px', padding: '14px', backgroundColor: theme.bgInput, border: `1px solid ${theme.border}`, borderRadius: '8px', color: theme.text, fontSize: '16px' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: theme.textMuted }}>Qty:</span>
                  <input type="number" min="1" value={tyre.qty} onChange={(e) => updateTyre(i, 'qty', e.target.value)} style={{ width: '60px', padding: '14px', backgroundColor: theme.bgInput, border: `1px solid ${theme.border}`, borderRadius: '8px', color: theme.text, fontSize: '16px', textAlign: 'center' }} />
                </div>
              </div>
              {quoteData.tyres.length > 1 && <button onClick={() => removeTyre(i)} style={{ padding: '8px', marginTop: '8px', backgroundColor: 'transparent', border: 'none', color: theme.danger, fontSize: '14px', cursor: 'pointer' }}>Remove</button>}
            </Card>
          ))}
          <button onClick={addTyre} style={{ width: '100%', padding: '16px', marginBottom: '24px', backgroundColor: 'transparent', border: `2px dashed ${theme.border}`, borderRadius: '12px', color: theme.textMuted, fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}><Plus size={20} /> Add more tyres</button>
          
          <h3 style={{ margin: '0 0 12px 0', color: theme.text, fontSize: '16px' }}>Locking wheel nuts?</h3>
          <Card>
            <p style={{ margin: '0 0 12px 0', color: theme.textMuted, fontSize: '14px' }}>Does the customer have the locking wheel nut key?</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { id: 'has_key', label: 'Yes — has the key', desc: 'No extra cost', color: theme.primary },
                { id: 'no_key', label: 'No — lost or missing', desc: 'Extra charge for removal', color: theme.danger },
                { id: 'not_fitted', label: "Doesn't have locking nuts", desc: 'Standard wheel bolts — no extra cost', color: theme.textMuted }
              ].map(opt => (
                <button key={opt.id} onClick={() => setQuoteData({...quoteData, lwnStatus: opt.id})} style={{ width: '100%', padding: '14px 16px', backgroundColor: quoteData.lwnStatus === opt.id ? `${opt.color}15` : theme.bgInput, border: `2px solid ${quoteData.lwnStatus === opt.id ? opt.color : theme.border}`, borderRadius: '12px', cursor: 'pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ color: quoteData.lwnStatus === opt.id ? opt.color : theme.text, fontWeight: '600', fontSize: '15px', display: 'block' }}>{opt.label}</span>
                    <span style={{ color: theme.textMuted, fontSize: '13px' }}>{opt.desc}</span>
                  </div>
                  {quoteData.lwnStatus === opt.id && <CheckCircle size={20} color={opt.color} />}
                </button>
              ))}
            </div>
            {quoteData.lwnStatus === 'no_key' && (
              <div style={{ marginTop: '12px', padding: '12px', backgroundColor: `${theme.danger}10`, borderRadius: '10px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Lock size={18} color={theme.danger} />
                <p style={{ margin: 0, color: theme.textMuted, fontSize: '14px' }}>Add your removal fee to the price below. The customer will see the total.</p>
              </div>
            )}
          </Card>
          
          <h3 style={{ margin: '24px 0 12px 0', color: theme.text, fontSize: '16px' }}>Where and how much?</h3>
          <Input label="Address or Postcode" placeholder="e.g. E1 4QJ" icon={MapPin} value={quoteData.location} onChange={(v) => setQuoteData({...quoteData, location: v})} required />
          <Input label="Your Price (£)" placeholder="0.00" type="number" value={quoteData.price} onChange={(v) => setQuoteData({...quoteData, price: v})} required />
          <Input label="Notes (optional)" placeholder="Gate code, parking info, etc." value={quoteData.notes} onChange={(v) => setQuoteData({...quoteData, notes: v})} />
          
          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            <Button variant="secondary" onClick={goBack} fullWidth>Back</Button>
            <Button onClick={() => navigateTo('quote-stock')} fullWidth icon={ArrowRight}>Next</Button>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  };

  const QuoteStockScreen = () => (
    <div style={{ minHeight: '100vh', backgroundColor: theme.bg, paddingBottom: '100px' }}>
      <Header title="Check Stock" subtitle={quoteData.isEmergency ? 'Step 3 of 4' : 'Step 4 of 5'} />
      <ProgressSteps steps={quoteData.isEmergency ? ['Customer', 'Job', 'Check', 'Send'] : ['Customer', 'Schedule', 'Job', 'Check', 'Send']} currentStep={quoteData.isEmergency ? 2 : 3} />
      <div style={{ padding: '24px' }}>
        <h3 style={{ margin: '0 0 16px 0', color: theme.text, fontSize: '18px' }}>Do you have the tyres?</h3>
        <Card highlight><div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><CheckCircle size={28} color={theme.primary} /><div><p style={{ margin: 0, color: theme.primary, fontWeight: '700', fontSize: '16px' }}>Yes - On Your Van</p><p style={{ margin: '4px 0 0 0', color: theme.textMuted, fontSize: '14px' }}>205/55R16 Michelin x 2</p></div></div></Card>
        
        {quoteData.isEmergency && (
          <>
            <h3 style={{ margin: '24px 0 16px 0', color: theme.text, fontSize: '18px' }}>How long to get there?</h3>
            <Card>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.textMuted }}>Drive time</span><span style={{ color: theme.text, fontWeight: '500' }}>22 mins</span></div>
                <div style={{ borderTop: `1px solid ${theme.border}`, paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: theme.text, fontWeight: '600', fontSize: '16px' }}>ETA</span>
                  <span style={{ color: theme.primary, fontWeight: '700', fontSize: '24px' }}>~22 mins</span>
                </div>
              </div>
            </Card>
            <div style={{ marginTop: '24px', height: '160px', backgroundColor: theme.bgInput, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${theme.border}` }}><div style={{ textAlign: 'center', color: theme.textMuted }}><Map size={40} /><p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>Route Preview</p></div></div>
          </>
        )}
        <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
          <Button variant="secondary" onClick={goBack} fullWidth>Back</Button>
          <Button onClick={() => navigateTo('quote-review')} fullWidth icon={ArrowRight}>Next</Button>
        </div>
      </div>
      <BottomNav />
    </div>
  );

  // ============================================
  // COVER QUOTE — streamlined single-screen quote for cover jobs
  // ============================================
  const CoverQuoteScreen = () => {
    const coverJob = activeCoverJob || { name: 'John Smith', plate: 'AB12 CDE', vehicle: '2019 Ford Focus', location: 'A12 Layby, near Stratford', distance: '4.2 miles', issue: 'Flat tyre', tyreSize: '205/55R16', qty: 1 };
    const tyreOnVan = mockStock.find(s => s.size === coverJob.tyreSize && s.location === 'Van');
    const tyreAtDepot = mockStock.find(s => s.size === coverJob.tyreSize && s.location !== 'Van');
    const stockStatus = tyreOnVan ? 'van' : tyreAtDepot ? 'depot' : 'none';

    const [selectedTier, setSelectedTier] = useState(null);
    const tyreTiers = [
      { tier: 'budget', label: 'Budget', brand: 'Linglong', price: '54.99', desc: 'Reliable, cost-effective option', leadTime: 'Same day', inStock: true },
      { tier: 'mid', label: 'Mid-Range', brand: 'Hankook', price: '74.99', desc: 'Great balance of quality & value', leadTime: 'Same day', inStock: true },
      { tier: 'premium', label: 'Premium', brand: 'Michelin', price: '99.99', desc: 'Top performance & longevity', leadTime: stockStatus === 'van' ? 'On van' : 'Order — next working day', inStock: stockStatus === 'van' }
    ];

    const basePrice = parseFloat(coverQuotePrice || 0);

    return (
      <div style={{ minHeight: '100vh', backgroundColor: theme.bg, paddingBottom: '100px' }}>
        <Header title="Cover Job Quote" subtitle="Quote TYRE-FIT — they handle payment" />
        <div style={{ padding: '20px' }}>

          {/* COVER JOB BANNER */}
          <div style={{ padding: '12px 14px', backgroundColor: `${theme.danger}10`, borderRadius: '10px', border: `1px solid ${theme.danger}25`, marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <ShieldCheck size={18} color={theme.danger} />
              <span style={{ fontSize: '13px', fontWeight: '700', color: theme.danger, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Emergency Cover Job</span>
            </div>
            <p style={{ margin: 0, fontSize: '13px', color: theme.textMuted, lineHeight: 1.5 }}>This customer has active TYRE-FIT cover. Send your quote to TYRE-FIT — once approved, the job is yours and <strong style={{ color: theme.primary }}>TYRE-FIT pays you automatically</strong> when the job is complete. The customer pays nothing extra.</p>
          </div>

          {/* PRE-FILLED CUSTOMER & JOB INFO */}
          <Card>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.textMuted }}>Customer</span><span style={{ color: theme.text, fontWeight: '600' }}>{coverJob.name}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.textMuted }}>Vehicle</span><span style={{ color: theme.text, fontWeight: '500' }}>{coverJob.vehicle || coverJob.plate} ({coverJob.plate})</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.textMuted }}>Issue</span><span style={{ color: theme.text, fontWeight: '500' }}>{coverJob.issue}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.textMuted }}>Tyre needed</span><span style={{ color: theme.text, fontWeight: '600' }}>{coverJob.tyreSize} x{coverJob.qty}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.textMuted }}>Location</span><span style={{ color: theme.text, fontWeight: '500' }}>{coverJob.distance} away</span></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={14} color={theme.textMuted} /><span style={{ color: theme.textMuted, fontSize: '13px' }}>{coverJob.location}</span></div>
            </div>
          </Card>

          {/* AUTO STOCK CHECK */}
          <h3 style={{ fontSize: '14px', fontWeight: '600', color: theme.textMuted, margin: '20px 0 10px 0', textTransform: 'uppercase' }}>Stock Check</h3>
          {stockStatus === 'van' && (
            <Card style={{ borderColor: theme.primary }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '44px', height: '44px', backgroundColor: `${theme.primary}15`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CheckCircle size={24} color={theme.primary} /></div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, color: theme.primary, fontWeight: '700', fontSize: '15px' }}>{coverJob.tyreSize} on your van</p>
                  <p style={{ margin: '4px 0 0 0', color: theme.textMuted, fontSize: '13px' }}>{tyreOnVan.brand} — {tyreOnVan.qty} in stock</p>
                </div>
                <Truck size={20} color={theme.primary} />
              </div>
            </Card>
          )}
          {stockStatus === 'depot' && (
            <Card style={{ borderColor: theme.warning }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '44px', height: '44px', backgroundColor: `${theme.warning}15`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><AlertTriangle size={24} color={theme.warning} /></div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, color: theme.warning, fontWeight: '700', fontSize: '15px' }}>Depot pickup needed</p>
                  <p style={{ margin: '4px 0 0 0', color: theme.textMuted, fontSize: '13px' }}>{tyreAtDepot.brand} — {tyreAtDepot.qty} at {tyreAtDepot.location}</p>
                  <p style={{ margin: '4px 0 0 0', color: theme.textMuted, fontSize: '12px' }}>Factor in collection time for your ETA</p>
                </div>
                <Building size={20} color={theme.warning} />
              </div>
              <div style={{ marginTop: '10px', padding: '8px 10px', backgroundColor: `${theme.info}10`, borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Route size={14} color={theme.info} />
                <p style={{ margin: 0, color: theme.info, fontSize: '12px' }}>Depot stop will be added to your route automatically when you send this quote</p>
              </div>
            </Card>
          )}
          {stockStatus === 'none' && (
            <Card style={{ borderColor: theme.danger }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '44px', height: '44px', backgroundColor: `${theme.danger}15`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><AlertOctagon size={24} color={theme.danger} /></div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, color: theme.danger, fontWeight: '700', fontSize: '15px' }}>{coverJob.tyreSize} not in stock</p>
                  <p style={{ margin: '4px 0 0 0', color: theme.textMuted, fontSize: '13px' }}>You'll need to source this tyre before the job</p>
                </div>
              </div>
              <div style={{ marginTop: '10px', padding: '10px 12px', backgroundColor: theme.bgInput, borderRadius: '8px' }}>
                <p style={{ margin: '0 0 6px 0', color: theme.textMuted, fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>Ordering lead times</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}><Clock size={12} color={theme.primary} /><span style={{ color: theme.text, fontSize: '13px' }}>Budget & Mid-range — <strong>same day</strong> (weekdays)</span></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={12} color={theme.warning} /><span style={{ color: theme.text, fontSize: '13px' }}>Premium — <strong>next working day</strong> (24hr weekdays)</span></div>
              </div>
            </Card>
          )}

          {/* TYRE OPTIONS — Budget / Mid / Premium */}
          <h3 style={{ fontSize: '14px', fontWeight: '600', color: theme.textMuted, margin: '20px 0 10px 0', textTransform: 'uppercase' }}>Tyre Options for Customer</h3>
          <p style={{ margin: '0 0 12px 0', color: theme.textMuted, fontSize: '13px' }}>Select which options to offer. Customer chooses one.</p>
          {tyreTiers.map((t) => {
            const isSelected = selectedTier === t.tier;
            return (
              <Card key={t.tier} onClick={() => { setSelectedTier(t.tier); setCoverQuotePrice(t.price); }} highlight={isSelected} style={isSelected ? { borderColor: theme.primary, borderWidth: '2px' } : {}}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: `2px solid ${isSelected ? theme.primary : theme.border}`, backgroundColor: isSelected ? theme.primary : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {isSelected && <Check size={14} color="#000" />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: theme.text, fontWeight: '600', fontSize: '15px' }}>{t.label}</span>
                      <Badge variant={t.tier === 'budget' ? 'info' : t.tier === 'mid' ? 'warning' : 'success'}>{t.brand}</Badge>
                    </div>
                    <p style={{ margin: '4px 0 0 0', color: theme.textMuted, fontSize: '13px' }}>{t.desc}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
                      <Clock size={12} color={t.inStock ? theme.primary : theme.warning} />
                      <span style={{ fontSize: '12px', fontWeight: '600', color: t.inStock ? theme.primary : theme.warning }}>{t.leadTime}</span>
                    </div>
                  </div>
                  <span style={{ color: isSelected ? theme.primary : theme.text, fontWeight: '700', fontSize: '18px' }}>£{t.price}</span>
                </div>
              </Card>
            );
          })}

          {/* PRICE INPUT */}
          <h3 style={{ fontSize: '14px', fontWeight: '600', color: theme.textMuted, margin: '20px 0 10px 0', textTransform: 'uppercase' }}>Your Quote</h3>
          <Card>
            <label style={{ display: 'block', fontSize: '14px', color: theme.textMuted, marginBottom: '8px' }}>Your price (what you charge)</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: theme.primary, fontSize: '20px', fontWeight: '700' }}>£</span>
              <input
                type="number"
                inputMode="decimal"
                placeholder="e.g. 89.99"
                value={coverQuotePrice}
                onChange={(e) => setCoverQuotePrice(e.target.value)}
                style={{ width: '100%', backgroundColor: theme.bgInput, border: `2px solid ${coverQuotePrice ? theme.primary : theme.border}`, borderRadius: '12px', padding: '18px 16px 18px 48px', fontSize: '24px', fontWeight: '700', color: theme.text, outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
          </Card>

          {/* FEE BREAKDOWN — only show once price entered */}
          {basePrice > 0 && (
            <>
              <h3 style={{ fontSize: '14px', fontWeight: '600', color: theme.textMuted, margin: '20px 0 10px 0', textTransform: 'uppercase' }}>Payment Summary</h3>
              <Card>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.textMuted }}>Your quote</span><span style={{ color: theme.text, fontWeight: '600' }}>£{basePrice.toFixed(2)}</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: `2px solid ${theme.primary}30`, paddingTop: '12px' }}>
                    <span style={{ color: theme.text, fontWeight: '700', fontSize: '17px' }}>TYRE-FIT pays you</span>
                    <span style={{ color: theme.primary, fontWeight: '700', fontSize: '24px' }}>£{basePrice.toFixed(2)}</span>
                  </div>
                </div>
              </Card>
              
              <div style={{ padding: '12px 14px', backgroundColor: `${theme.primary}08`, borderRadius: '10px', border: `1px solid ${theme.primary}20`, marginTop: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <Wallet size={16} color={theme.primary} />
                  <span style={{ color: theme.text, fontSize: '14px', fontWeight: '600' }}>How cover job payment works</span>
                </div>
                <p style={{ margin: 0, color: theme.textMuted, fontSize: '13px', lineHeight: 1.6 }}>You complete the job → TYRE-FIT verifies → payment sent to your wallet automatically. No invoicing, no chasing. Customer pays nothing — {"it's"} covered under their plan.</p>
              </div>

              {/* ETA */}
              <Card style={{ backgroundColor: `${theme.primary}08`, marginTop: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Timer size={20} color={theme.primary} />
                  <div>
                    {selectedTier === 'premium' && stockStatus !== 'van' ? (
                      <>
                        <p style={{ margin: 0, color: theme.warning, fontWeight: '600', fontSize: '15px' }}>Premium — next working day</p>
                        <p style={{ margin: '2px 0 0 0', color: theme.textMuted, fontSize: '13px' }}>24hr order. Book customer in for tomorrow (weekday).</p>
                      </>
                    ) : (
                      <>
                        <p style={{ margin: 0, color: theme.text, fontWeight: '600', fontSize: '15px' }}>ETA: ~{stockStatus === 'depot' ? '55' : '25'} mins</p>
                        <p style={{ margin: '2px 0 0 0', color: theme.textMuted, fontSize: '13px' }}>{stockStatus === 'depot' ? 'Includes depot collection time' : 'Direct to customer'}</p>
                      </>
                    )}
                  </div>
                </div>
              </Card>

              {/* SEND */}
              <div style={{ marginTop: '20px' }}>
                <Button onClick={() => { setQuoteData(prev => ({ ...prev, customerName: coverJob.name, mobile: '07700 900456', numberPlate: coverJob.plate, isEmergency: true, isCoverQuote: true, price: coverQuotePrice })); setCoverJobs(prev => prev.filter(j => j.id !== coverJob.id)); setCoverApprovalPhase('sending'); }} icon={Send}>Send Quote for Approval</Button>
              </div>
              <p style={{ textAlign: 'center', color: theme.textMuted, fontSize: '13px', marginTop: '12px', lineHeight: 1.5 }}>TYRE-FIT approves your quote and updates the customer automatically.</p>

              {/* ROUTE UPDATE MODAL */}
              {showRouteUpdateModal && (
                <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', zIndex: 2000 }}>
                  <Card style={{ maxWidth: '400px', width: '100%' }}>
                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                      <div style={{ width: '64px', height: '64px', backgroundColor: `${theme.primary}20`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}><Route size={32} color={theme.primary} /></div>
                      <h3 style={{ margin: '0 0 8px 0', color: theme.text, fontWeight: '700', fontSize: '18px' }}>Update Your Route?</h3>
                      <p style={{ margin: 0, color: theme.textMuted, fontSize: '14px', lineHeight: 1.5 }}>You have {mockJobs.length} jobs today. Where should this emergency fit in?</p>
                    </div>

                    {/* Option 1: Next job (priority) */}
                    <button onClick={() => setRouteInsertPosition('next')} style={{ width: '100%', padding: '14px 16px', backgroundColor: routeInsertPosition === 'next' ? `${theme.primary}15` : theme.bgInput, border: `2px solid ${routeInsertPosition === 'next' ? theme.primary : theme.border}`, borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px', textAlign: 'left' }}>
                      <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: `2px solid ${routeInsertPosition === 'next' ? theme.primary : theme.border}`, backgroundColor: routeInsertPosition === 'next' ? theme.primary : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{routeInsertPosition === 'next' && <Check size={14} color="#000" />}</div>
                      <div>
                        <p style={{ margin: 0, color: theme.text, fontWeight: '600', fontSize: '15px' }}>Do this first</p>
                        <p style={{ margin: '4px 0 0 0', color: theme.textMuted, fontSize: '13px' }}>Emergency becomes your next job. Other jobs shift back ~45 mins. Affected customers notified automatically.</p>
                      </div>
                    </button>

                    {/* Option 2: Optimise into route */}
                    <button onClick={() => setRouteInsertPosition('optimise')} style={{ width: '100%', padding: '14px 16px', backgroundColor: routeInsertPosition === 'optimise' ? `${theme.primary}15` : theme.bgInput, border: `2px solid ${routeInsertPosition === 'optimise' ? theme.primary : theme.border}`, borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px', textAlign: 'left' }}>
                      <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: `2px solid ${routeInsertPosition === 'optimise' ? theme.primary : theme.border}`, backgroundColor: routeInsertPosition === 'optimise' ? theme.primary : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{routeInsertPosition === 'optimise' && <Check size={14} color="#000" />}</div>
                      <div>
                        <p style={{ margin: 0, color: theme.text, fontWeight: '600', fontSize: '15px' }}>Slot in smartly</p>
                        <p style={{ margin: '4px 0 0 0', color: theme.textMuted, fontSize: '13px' }}>AI optimises your route to fit the emergency between existing jobs with minimum disruption.</p>
                      </div>
                    </button>

                    {/* Option 3: Don't add yet */}
                    <button onClick={() => setRouteInsertPosition('manual')} style={{ width: '100%', padding: '14px 16px', backgroundColor: routeInsertPosition === 'manual' ? `${theme.primary}15` : theme.bgInput, border: `2px solid ${routeInsertPosition === 'manual' ? theme.primary : theme.border}`, borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', textAlign: 'left' }}>
                      <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: `2px solid ${routeInsertPosition === 'manual' ? theme.primary : theme.border}`, backgroundColor: routeInsertPosition === 'manual' ? theme.primary : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{routeInsertPosition === 'manual' && <Check size={14} color="#000" />}</div>
                      <div>
                        <p style={{ margin: 0, color: theme.text, fontWeight: '600', fontSize: '15px' }}>I'll sort it myself</p>
                        <p style={{ margin: '4px 0 0 0', color: theme.textMuted, fontSize: '13px' }}>Job added to route but not positioned. You can drag to reorder later.</p>
                      </div>
                    </button>

                    {/* Confirm */}
                    <Button onClick={() => {
                      const coverJobEntry = { id: 99, customer: coverJob.name, plate: coverJob.plate, time: 'ASAP', location: coverJob.location, eta: '~22 mins', tyreSize: coverJob.tyreSize, depositPaid: false, stockOnVan: true, isEmergency: true, isCoverJob: true };
                      setCoverJobInRoute(coverJobEntry);
                      setShowRouteUpdateModal(false);
                      showToast(routeInsertPosition === 'next' ? 'Route updated — emergency is next' : routeInsertPosition === 'optimise' ? 'Route optimised with emergency job' : 'Emergency added to route');
                      navigateTo('quote-sent');
                    }} icon={Send}>Send Quote & Update Route</Button>
                  </Card>
                </div>
              )}
            </>
          )}
        </div>
        <BottomNav />
      </div>
    );
  };

  // Quote Review - Full fee transparency + emergency cover
  const QuoteReviewScreen = () => {
    const basePrice = parseFloat(quoteData.price) || 0;
    const bookingFee = 5.95;
    const customerTotal = basePrice + bookingFee;
    const stripeFeePercent = 0.015;
    const stripeFeeFixed = 0.20;
    const stripeFee = parseFloat((basePrice * stripeFeePercent + stripeFeeFixed).toFixed(2));
    const fitterReceives = parseFloat((basePrice - stripeFee).toFixed(2));
    const showDispatcherOptions = userRole === 'owner' && isTeamAccount;
    const [showQuotePreview, setShowQuotePreview] = useState(false);
    
    return (
      <div style={{ minHeight: '100vh', backgroundColor: theme.bg, paddingBottom: '100px' }}>
        <Header title="Send Quote" subtitle={quoteData.isEmergency ? 'Step 4 of 4' : 'Step 5 of 5'} />
        <ProgressSteps steps={quoteData.isEmergency ? ['Customer', 'Job', 'Check', 'Send'] : ['Customer', 'Schedule', 'Job', 'Check', 'Send']} currentStep={quoteData.isEmergency ? 3 : 4} />
        <div style={{ padding: '24px' }}>
          <h3 style={{ margin: '0 0 16px 0', color: theme.text, fontSize: '18px' }}>Check everything looks right</h3>
          <Card>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.textMuted }}>Customer</span><span style={{ color: theme.text, fontWeight: '500' }}>{quoteData.customerName || 'John Smith'}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.textMuted }}>Mobile</span><span style={{ color: theme.text, fontWeight: '500' }}>{quoteData.mobile || '07700 900123'}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.textMuted }}>Vehicle</span><span style={{ color: theme.text, fontWeight: '500' }}>2019 Ford Focus ({quoteData.numberPlate || 'AB12 CDE'})</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.textMuted }}>Type</span><span style={{ color: quoteData.isEmergency ? theme.warning : theme.primary, fontWeight: '600' }}>{quoteData.isEmergency ? 'Emergency (45-90 mins)' : 'Booking (2-hour window)'}</span></div>
              {!quoteData.isEmergency && quoteData.bookingDate && <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.textMuted }}>Scheduled</span><span style={{ color: theme.text, fontWeight: '500' }}>{new Date(quoteData.bookingDate).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })} · {quoteData.bookingTime} window</span></div>}
              {quoteData.isEmergency && <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.textMuted }}>Arrival Target</span><span style={{ color: theme.warning, fontWeight: '600' }}>45-90 mins</span></div>}
            </div>
          </Card>
          
          {/* CUSTOMER SEES - what they pay */}
          <h3 style={{ margin: '24px 0 12px 0', color: theme.text, fontSize: '20px' }}>What customer sees</h3>
          <Card>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.textMuted, fontSize: '18px' }}>Tyre fitting price</span><span style={{ color: theme.text, fontWeight: '600', fontSize: '18px' }}>£{basePrice.toFixed(2)}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.textMuted, fontSize: '18px' }}>Booking fee</span><span style={{ color: theme.text, fontWeight: '500', fontSize: '18px' }}>£{bookingFee.toFixed(2)}</span></div>
              <div style={{ borderTop: `2px solid ${theme.border}`, paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: theme.text, fontWeight: '700', fontSize: '22px' }}>Total customer sees</span>
                <span style={{ color: theme.primary, fontWeight: '800', fontSize: '34px' }}>£{customerTotal.toFixed(2)}</span>
              </div>
              <div style={{ padding: '12px', backgroundColor: `${theme.primary}10`, borderRadius: '10px', border: `1px solid ${theme.primary}30` }}>
                <p style={{ margin: '0 0 6px 0', color: theme.text, fontSize: '17px', fontWeight: '700' }}>Pay £5.95 now to secure booking</p>
                <p style={{ margin: 0, color: theme.textMuted, fontSize: '16px' }}>Then pay fitter <strong style={{ color: theme.text }}>£{basePrice.toFixed(2)}</strong> after fitting.</p>
              </div>
              <p style={{ margin: 0, color: theme.textMuted, fontSize: '15px', lineHeight: 1.5 }}>All bookings include 30-day emergency tyre cover.</p>
            </div>
          </Card>
          
          {/* FITTER RECEIVES - transparent fee breakdown */}
          <h3 style={{ margin: '24px 0 12px 0', color: theme.text, fontSize: '16px' }}>What you receive</h3>
          <Card style={{ backgroundColor: `${theme.primary}08` }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.textMuted, fontSize: '15px' }}>Your Price</span><span style={{ color: theme.text, fontWeight: '500', fontSize: '15px' }}>£{basePrice.toFixed(2)}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.textMuted, fontSize: '15px' }}>Payment Processing (1.5% + 20p)</span><span style={{ color: theme.textMuted, fontSize: '15px' }}>-£{stripeFee.toFixed(2)}</span></div>
              <div style={{ borderTop: `2px solid ${theme.border}`, paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: theme.text, fontWeight: '700', fontSize: '18px' }}>To Your Wallet</span>
                <span style={{ color: theme.primary, fontWeight: '700', fontSize: '28px' }}>£{fitterReceives.toFixed(2)}</span>
              </div>
              <p style={{ margin: 0, color: theme.textMuted, fontSize: '13px' }}>The £{bookingFee.toFixed(2)} booking fee is paid by the customer separately — it doesn't come out of your price.</p>
            </div>
          </Card>
          
          {/* Customer gets emergency cover */}
          <Card style={{ marginTop: '16px', backgroundColor: `${theme.primary}10`, borderColor: theme.primary }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <ShieldCheck size={28} color={theme.primary} style={{ flexShrink: 0 }} />
              <div>
                <h3 style={{ margin: '0 0 10px 0', color: theme.primary, fontWeight: '700', fontSize: '16px' }}>How Cover Works</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <p style={{ margin: 0, color: theme.text, fontSize: '14px' }}><strong>1.</strong> You fit their tyres</p>
                  <p style={{ margin: 0, color: theme.text, fontSize: '14px' }}><strong>2.</strong> They get 30 days free breakdown cover</p>
                  <p style={{ margin: 0, color: theme.primary, fontSize: '14px', fontWeight: '600' }}><strong>3.</strong> When they need help — you get paid</p>
                </div>
              </div>
            </div>
          </Card>
          
          {showDispatcherOptions && (
            <div style={{ marginTop: '16px' }}>
              <label style={{ display: 'block', fontSize: '16px', color: theme.text, marginBottom: '8px', fontWeight: '500' }}>Who should do this job?</label>
              <select value={quoteData.assignedTo || 'nearest'} onChange={(e) => setQuoteData({...quoteData, assignedTo: e.target.value})} style={{ width: '100%', padding: '16px', backgroundColor: theme.bgInput, border: `1px solid ${theme.border}`, borderRadius: '12px', color: theme.text, fontSize: '16px' }}>
                <option value="nearest">Nearest Fitter</option><option value="quickest">First Available</option>
                {mockTeamFitters.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
              </select>
            </div>
          )}
          
          <Card style={{ marginTop: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <p style={{ margin: 0, color: theme.text, fontSize: '18px' }}>Customer pays <strong style={{ color: theme.primary }}>£{bookingFee.toFixed(2)} now</strong> to confirm</p>
              <p style={{ margin: 0, color: theme.textMuted, fontSize: '17px' }}>Customer then pays fitter <strong style={{ color: theme.text }}>£{basePrice.toFixed(2)}</strong> after fitting</p>
              <p style={{ margin: 0, color: theme.textMuted, fontSize: '15px' }}><Clock size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />Link expires in 5 minutes</p>
            </div>
          </Card>
          
          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}><Button variant="secondary" onClick={goBack} fullWidth>Back</Button></div>
          
          {/* CUSTOMER PREVIEW */}
          <button onClick={() => setShowQuotePreview(true)} style={{ width: '100%', padding: '14px', backgroundColor: `${theme.info}10`, border: `1px solid ${theme.info}30`, borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '16px' }}>
            <Eye size={18} color={theme.info} />
            <span style={{ color: theme.info, fontWeight: '600', fontSize: '14px' }}>See what your customer sees</span>
          </button>

          {/* QUOTE PREVIEW POPUP — exactly what customer sees on their phone */}
          {showQuotePreview && (
            <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 2000, overflow: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
              <div style={{ maxWidth: '380px', width: '100%', backgroundColor: '#fff', borderRadius: '20px', overflow: 'hidden' }}>
                {/* Phone-style header */}
                <div style={{ backgroundColor: theme.primary, padding: '20px 16px', textAlign: 'center' }}>
                  <p style={{ margin: '0 0 4px 0', color: '#000', fontSize: '11px', opacity: 0.7 }}>QUOTE FROM</p>
                  <h3 style={{ margin: 0, color: '#000', fontWeight: '700', fontSize: '18px' }}>{signUpData.businessName || "Dan's Mobile Tyres"}</h3>
                </div>
                <div style={{ padding: '20px 16px' }}>
                  <p style={{ margin: '0 0 4px 0', color: '#666', fontSize: '16px' }}>Hi {quoteData.customerName || 'John'},</p>
                  <p style={{ margin: '0 0 16px 0', color: '#333', fontSize: '17px', lineHeight: 1.5 }}>Here is your quote for tyre fitting on <strong>{quoteData.numberPlate || 'AB12 CDE'}</strong>:</p>
                  
                  <div style={{ padding: '14px', backgroundColor: '#f8f9fa', borderRadius: '12px', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span style={{ color: '#666', fontSize: '16px' }}>{quoteData.tyreQty || 2}x {quoteData.tyreSize || '205/55R16'}</span><span style={{ color: '#333', fontWeight: '600', fontSize: '16px' }}>£{basePrice.toFixed(2)}</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span style={{ color: '#666', fontSize: '16px' }}>Booking fee</span><span style={{ color: '#333', fontSize: '16px' }}>£{bookingFee.toFixed(2)}</span></div>
                    <div style={{ borderTop: '2px solid #e0e0e0', paddingTop: '10px', display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#333', fontWeight: '700', fontSize: '19px' }}>Total</span><span style={{ color: '#333', fontWeight: '700', fontSize: '24px' }}>£{customerTotal.toFixed(2)}</span></div>
                  </div>

                  {!quoteData.isEmergency && quoteData.bookingDate && (
                    <div style={{ padding: '10px 14px', backgroundColor: '#e8f5e9', borderRadius: '10px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Calendar size={16} color="#2e7d32" />
                      <span style={{ color: '#2e7d32', fontSize: '14px', fontWeight: '500' }}>{new Date(quoteData.bookingDate).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })} · {quoteData.bookingTime} window</span>
                    </div>
                  )}

                  {quoteData.isEmergency && (
                    <div style={{ padding: '10px 14px', backgroundColor: '#fff8e1', borderRadius: '10px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Zap size={16} color="#f59e0b" />
                      <span style={{ color: '#b45309', fontSize: '14px', fontWeight: '600' }}>Emergency arrival target: 45-90 mins</span>
                    </div>
                  )}

                  <div style={{ padding: '10px 14px', backgroundColor: `${theme.primary}10`, borderRadius: '10px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ShieldCheck size={16} color={theme.primary} />
                    <span style={{ color: '#333', fontSize: '13px' }}>Includes <strong style={{ color: theme.primary }}>30-day tyre cover</strong> — free</span>
                  </div>

                  <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '15px', textAlign: 'center', fontWeight: '700' }}>Pay £{bookingFee.toFixed(2)} now to secure booking</p>
                  <p style={{ margin: '0 0 10px 0', color: '#666', fontSize: '14px', textAlign: 'center' }}>Pay fitter balance £{basePrice.toFixed(2)} after fitting</p>
                  <div style={{ padding: '16px', backgroundColor: theme.primary, borderRadius: '12px', textAlign: 'center', cursor: 'default' }}>
                    <span style={{ color: '#000', fontWeight: '700', fontSize: '19px' }}>Confirm & Pay £{bookingFee.toFixed(2)}</span>
                  </div>
                  <p style={{ margin: '10px 0 0 0', color: '#999', fontSize: '11px', textAlign: 'center' }}>Quote expires in 5 minutes · Powered by TYRE-FIT</p>
                </div>
                <div style={{ padding: '0 16px 16px' }}>
                  <button onClick={() => setShowQuotePreview(false)} style={{ width: '100%', padding: '14px', backgroundColor: '#333', border: 'none', borderRadius: '12px', color: '#fff', fontWeight: '600', cursor: 'pointer', fontSize: '15px' }}>Close Preview</button>
                </div>
              </div>
            </div>
          )}
          
          <h3 style={{ margin: '20px 0 12px 0', color: theme.text, fontSize: '16px', textAlign: 'center' }}>Send quote to customer</h3>
          <div style={{ display: 'grid', gridTemplateColumns: smsEnabled ? '1fr 1fr' : '1fr', gap: '12px' }}>
            <Button onClick={() => navigateTo('quote-sent')} variant="whatsapp" icon={MessageSquare}>WhatsApp</Button>
            {smsEnabled && <Button onClick={() => navigateTo('quote-sent')} icon={Send}>Text Message</Button>}
          </div>
          {!smsEnabled && <p style={{ margin: '10px 0 0 0', color: theme.textMuted, fontSize: '12px', textAlign: 'center' }}>SMS is off in onboarding, so only WhatsApp is available.</p>}
        </div>
        <BottomNav />
      </div>
    );
  };

  // Quote Sent - Simple confirmation
  const QuoteSentScreen = () => {
    const isCover = quoteData.isCoverQuote;
    const [showReminderPreview, setShowReminderPreview] = useState(false);
    return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.bg, padding: '24px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
        <FontSizeToggle />
        <ThemeToggle />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100px', height: '100px', backgroundColor: isCover ? `${theme.danger}15` : `${theme.primary}20`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
        {isCover ? <ShieldCheck size={50} color={theme.danger} /> : <CheckCircle size={50} color={theme.primary} />}
      </div>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: theme.text, margin: '0 0 8px 0' }}>{isCover ? 'Quote Submitted!' : 'Quote Sent!'}</h1>
      <p style={{ color: theme.textMuted, margin: '0 0 32px 0', textAlign: 'center', fontSize: '16px' }}>
        {isCover ? 'TYRE-FIT is reviewing your quote' : quoteData.isEmergency ? `Waiting for ${quoteData.customerName || 'customer'} to pay deposit so you can dispatch now` : `Waiting for ${quoteData.customerName || 'customer'} to pay deposit and lock the 2-hour window`}
      </p>
      
      <Card style={{ width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ margin: '0 0 4px 0', color: theme.textMuted, fontSize: '14px' }}>{isCover ? 'Submitted to' : 'Sent to'}</p>
          <p style={{ margin: '0 0 16px 0', color: theme.text, fontWeight: '600', fontSize: '18px' }}>{isCover ? 'TYRE-FIT' : (quoteData.mobile || '07700 900123')}</p>
          {isCover ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px', backgroundColor: `${theme.primary}10`, borderRadius: '12px' }}>
                <Clock size={20} color={theme.primary} />
                <span style={{ color: theme.primary, fontWeight: '600' }}>Awaiting approval...</span>
              </div>
              <p style={{ margin: 0, color: theme.textMuted, fontSize: '13px', lineHeight: 1.5 }}>TYRE-FIT reviews cover quotes within minutes. Once approved, the job appears in your route and the customer is notified automatically.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px', backgroundColor: `${theme.warning}20`, borderRadius: '12px' }}>
                <Clock size={20} color={theme.warning} />
                <span style={{ color: theme.warning, fontWeight: '600' }}>Waiting for deposit...</span>
              </div>
              <p style={{ margin: 0, color: theme.textMuted, fontSize: '13px', lineHeight: 1.5 }}>
                {quoteData.isEmergency ? 'After payment, this becomes a live emergency dispatch with 45-90 minute arrival target and mins-away text updates.' : 'After payment, booking is confirmed for the selected 2-hour window and customer gets mins-away text updates on the day.'}
              </p>
            </div>
          )}
        </div>
      </Card>
      
      {!isCover && (
        <Card style={{ width: '100%', maxWidth: '400px', marginTop: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <BellRing size={24} color={theme.info} />
            <p style={{ margin: 0, color: theme.textMuted, fontSize: '14px' }}>If they don't pay in 5 mins, we'll remind them automatically</p>
          </div>
        </Card>
      )}
      
      {isCover && (
        <Card style={{ width: '100%', maxWidth: '400px', marginTop: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Wallet size={24} color={theme.primary} />
            <p style={{ margin: 0, color: theme.textMuted, fontSize: '14px' }}>Once job is complete, TYRE-FIT pays you directly to your wallet. No chasing the customer.</p>
          </div>
        </Card>
      )}
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '400px', marginTop: '32px' }}>
        <Button onClick={() => navigateTo('dashboard')} icon={Home}>Back to Home</Button>
        {!isCover && <Button variant="outline" icon={RefreshCw} onClick={() => setShowReminderPreview(true)}>Send Reminder Now</Button>}
      </div>

      {showReminderPreview && (
        <Modal title="Preview Reminder" onClose={() => setShowReminderPreview(false)}>
          <div style={{ padding: '12px', backgroundColor: theme.bgInput, borderRadius: '10px', marginBottom: '16px' }}>
            <p style={{ margin: '0 0 2px 0', fontSize: '10px', color: theme.textMuted, textTransform: 'uppercase', fontWeight: '600' }}>Text to {quoteData.customerName || 'customer'}</p>
            <div style={{ fontSize: '13px', color: theme.textMuted, lineHeight: 1.6, fontStyle: 'italic' }}>
              <p style={{ margin: '6px 0 0 0' }}>Hi {quoteData.customerName || 'there'}, just checking if you saw the quote from {signUpData.businessName || "Dan's Mobile Tyres"} for your {quoteData.numberPlate || 'vehicle'}?</p>
              <p style={{ margin: '6px 0 0 0' }}>It includes <strong style={{ color: theme.primary }}>30 days free emergency tyre cover</strong>. Pay the deposit to lock in your slot:</p>
              <p style={{ margin: '6px 0 0 0' }}><span style={{ color: theme.info, textDecoration: 'underline' }}>tyre-fit.co/q/{(quoteData.numberPlate || 'AB12CDE').replace(/\s/g, '')}</span></p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Button variant="secondary" onClick={() => setShowReminderPreview(false)} fullWidth>Cancel</Button>
            <Button onClick={() => { setShowReminderPreview(false); showToast('Reminder sent'); }} fullWidth icon={Send}>Send</Button>
          </div>
        </Modal>
      )}
      </div>
    </div>
    );
  };

  // ============================================
  // QUICK QUOTE - 1 screen, 20 seconds
  // ============================================
  const QuickQuoteScreen = () => {
    const [qName, setQName] = useState('');
    const [qMobile, setQMobile] = useState('');
    const [qPlate, setQPlate] = useState('');
    const [qTyreSize, setQTyreSize] = useState('');
    const [qQty, setQQty] = useState(1);
    const [qPrice, setQPrice] = useState('');
    const [qNotes, setQNotes] = useState('');
    const [qJobType, setQJobType] = useState('replace');
    const [qLwn, setQLwn] = useState('has_key');
    const [qAddOns, setQAddOns] = useState({ balancing: true, newValves: true, disposal: true, alignment: false });
    const [showCustomerSuggestions, setShowCustomerSuggestions] = useState(false);
    const [vehicleLookup, setVehicleLookup] = useState(null);
    const [sendChannel, setSendChannel] = useState(smsEnabled ? 'sms' : 'whatsapp');
    const [showAdvanced, setShowAdvanced] = useState(false);

    const filteredCustomers = qName.length >= 2 ? previousCustomers.filter(c => c.name.toLowerCase().includes(qName.toLowerCase())) : [];
    const priceSuggestion = qTyreSize && priceHistory[qTyreSize] ? priceHistory[qTyreSize] : null;
    const selectCustomer = (c) => { setQName(c.name); setQMobile(c.mobile); setQPlate(c.plate); setVehicleLookup(c.vehicle); setShowCustomerSuggestions(false); };
    const lookupPlate = () => { if (qPlate.length >= 5) { setVehicleLookup('2020 BMW 3 Series'); showToast('Vehicle found from DVLA'); } };

    const balancingTotal = qAddOns.balancing ? (signUpData.pricing.digitalBalancingFree ? 0 : parseFloat(signUpData.pricing.digitalBalancingPrice || 0) * qQty) : 0;
    const valvesTotal = qAddOns.newValves ? (signUpData.pricing.newValvesFree ? 0 : parseFloat(signUpData.pricing.newValvesPrice || 0) * qQty) : 0;
    const disposalTotal = qAddOns.disposal ? (signUpData.pricing.disposalFree ? 0 : parseFloat(signUpData.pricing.oldTyreDisposalPrice || 0) * qQty) : 0;
    const lwnCharge = qLwn === 'no_key' ? parseFloat(signUpData.pricing.lwnRemovalPrice || 0) : 0;
    const alignmentCharge = qAddOns.alignment ? parseFloat(signUpData.services.alignmentPrice || 0) : 0;
    const basePrice = parseFloat(qPrice || 0);
    const totalPrice = basePrice + balancingTotal + valvesTotal + disposalTotal + lwnCharge + alignmentCharge;

    const needsTyreSize = qJobType === 'replace' || qJobType === 'repair';

    useEffect(() => {
      if (!smsEnabled && sendChannel === 'sms') setSendChannel('whatsapp');
    }, [smsEnabled, sendChannel]);

    return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.bg, paddingBottom: '100px' }}>
      <Toast />
      <div style={{ backgroundColor: theme.bgCard, borderBottom: `1px solid ${theme.border}`, padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div><h1 style={{ fontSize: '20px', fontWeight: 'bold', color: theme.text, margin: 0 }}>Quick Quote</h1><p style={{ color: theme.textMuted, fontSize: '13px', margin: '4px 0 0 0' }}>Send in 20 seconds</p></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button onClick={() => navigateTo('quote-customer')} style={{ padding: '8px 16px', backgroundColor: theme.bgInput, border: `1px solid ${theme.border}`, borderRadius: '8px', color: theme.textMuted, fontSize: '13px', cursor: 'pointer' }}>Detailed Quote →</button>
          <FontSizeToggle />
          <ThemeToggle />
        </div>
      </div>
      <div style={{ padding: '16px' }}>
        {/* Customer — with autocomplete */}
        <div style={{ position: 'relative', marginBottom: '12px' }}>
          <Input label="Customer Name" placeholder="Start typing..." value={qName} onChange={(v) => { setQName(v); setShowCustomerSuggestions(v.length >= 2); }} />
          {showCustomerSuggestions && filteredCustomers.length > 0 && (
            <div style={{ position: 'absolute', top: '76px', left: 0, right: 0, backgroundColor: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: '12px', zIndex: 100, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
              {filteredCustomers.map((c, i) => (
                <button key={i} onClick={() => selectCustomer(c)} style={{ width: '100%', padding: '14px 16px', backgroundColor: 'transparent', border: 'none', borderBottom: i < filteredCustomers.length - 1 ? `1px solid ${theme.border}` : 'none', cursor: 'pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div><p style={{ margin: 0, color: theme.text, fontWeight: '500' }}>{c.name}</p><p style={{ margin: '2px 0 0 0', color: theme.textMuted, fontSize: '13px' }}>{c.plate} • {c.vehicle}</p></div>
                  <span style={{ color: theme.textSubtle, fontSize: '12px' }}>{c.lastService}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <Input label="Mobile" placeholder="07700 900123" value={qMobile} onChange={setQMobile} type="tel" />

        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
          <div style={{ flex: 1 }}><Input label="Reg Plate" placeholder="AB12 CDE" value={qPlate} onChange={(v) => { setQPlate(v.toUpperCase()); if (v.length >= 7) lookupPlate(); }} /></div>
        </div>
        {vehicleLookup && <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', backgroundColor: `${theme.primary}15`, borderRadius: '10px', marginBottom: '12px', marginTop: '-4px' }}><CheckCircle size={16} color={theme.primary} /><span style={{ color: theme.primary, fontSize: '14px', fontWeight: '500' }}>{vehicleLookup}</span></div>}
        <button onClick={() => setShowAdvanced(!showAdvanced)} style={{ width: '100%', minHeight: '52px', padding: '12px 14px', backgroundColor: theme.bgInput, border: `1px solid ${theme.border}`, borderRadius: '12px', cursor: 'pointer', color: theme.text, fontSize: '15px', fontWeight: '700', textAlign: 'left', marginBottom: '12px' }}>
          {showAdvanced ? 'Hide extra options' : 'More options (job type, add-ons, notes)'}
        </button>

        {/* Job Type */}
        {showAdvanced && (
          <>
            <label style={{ display: 'block', fontSize: '14px', color: theme.textMuted, marginBottom: '8px' }}>What do they need?</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
              {[{ id: 'replace', label: 'Replace' }, { id: 'repair', label: 'Repair' }, { id: 'fit_only', label: 'Fit Only' }, { id: 'rotation', label: 'Rotation' }].map(jt => (
                <button key={jt.id} onClick={() => setQJobType(jt.id)} style={{ minHeight: '52px', padding: '14px', backgroundColor: qJobType === jt.id ? `${theme.primary}20` : theme.bgInput, border: `2px solid ${qJobType === jt.id ? theme.primary : theme.border}`, borderRadius: '12px', cursor: 'pointer', textAlign: 'center' }}>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: qJobType === jt.id ? theme.primary : theme.text }}>{jt.label}</span>
                </button>
              ))}
            </div>
          </>
        )}

        {/* Tyre size + qty — required for replace and repair */}
        {needsTyreSize && (
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <div style={{ flex: 2 }}><Input label="Tyre Size" placeholder="205/55R16" value={qTyreSize} onChange={setQTyreSize} /></div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '14px', color: theme.textMuted, marginBottom: '8px' }}>Qty</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button onClick={() => setQQty(Math.max(1, qQty - 1))} style={{ width: '52px', height: '52px', borderRadius: '10px', border: `1px solid ${theme.border}`, backgroundColor: theme.bgInput, color: theme.text, fontSize: '20px', cursor: 'pointer' }}>−</button>
                <span style={{ fontSize: '20px', fontWeight: '700', color: theme.text, minWidth: '24px', textAlign: 'center' }}>{qQty}</span>
                <button onClick={() => setQQty(Math.min(4, qQty + 1))} style={{ width: '52px', height: '52px', borderRadius: '10px', border: `1px solid ${theme.border}`, backgroundColor: theme.bgInput, color: theme.text, fontSize: '20px', cursor: 'pointer' }}>+</button>
              </div>
            </div>
          </div>
        )}

        {/* SMART: Stock availability check */}
        {needsTyreSize && qTyreSize.length >= 5 && (() => {
          const vanStock = mockStock.find(s => s.size === qTyreSize && s.location === 'Van');
          const depotStock = mockStock.find(s => s.size === qTyreSize && s.location !== 'Van');
          return vanStock && vanStock.qty >= qQty ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', backgroundColor: `${theme.primary}10`, borderRadius: '10px', marginBottom: '12px', border: `1px solid ${theme.primary}30` }}>
              <Package size={16} color={theme.primary} />
              <span style={{ color: theme.primary, fontSize: '13px', fontWeight: '600' }}>{vanStock.qty}x {qTyreSize} on van ({vanStock.brand})</span>
            </div>
          ) : depotStock ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', backgroundColor: `${theme.warning}10`, borderRadius: '10px', marginBottom: '12px', border: `1px solid ${theme.warning}30` }}>
              <AlertTriangle size={16} color={theme.warning} />
              <span style={{ color: theme.warning, fontSize: '13px', fontWeight: '600' }}>Not on van — {depotStock.qty}x at {depotStock.location}</span>
            </div>
          ) : vanStock && vanStock.qty < qQty ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', backgroundColor: `${theme.warning}10`, borderRadius: '10px', marginBottom: '12px', border: `1px solid ${theme.warning}30` }}>
              <AlertTriangle size={16} color={theme.warning} />
              <span style={{ color: theme.warning, fontSize: '13px', fontWeight: '600' }}>Only {vanStock.qty}x on van — need {qQty}</span>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', backgroundColor: `${theme.danger}10`, borderRadius: '10px', marginBottom: '12px', border: `1px solid ${theme.danger}30` }}>
              <AlertTriangle size={16} color={theme.danger} />
              <span style={{ color: theme.danger, fontSize: '13px', fontWeight: '600' }}>{qTyreSize} not in stock — order or depot needed</span>
            </div>
          );
        })()}

        {!needsTyreSize && (
          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', fontSize: '14px', color: theme.textMuted, marginBottom: '8px' }}>How many tyres?</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button onClick={() => setQQty(Math.max(1, qQty - 1))} style={{ width: '52px', height: '52px', borderRadius: '10px', border: `1px solid ${theme.border}`, backgroundColor: theme.bgInput, color: theme.text, fontSize: '20px', cursor: 'pointer' }}>−</button>
              <span style={{ fontSize: '20px', fontWeight: '700', color: theme.text, minWidth: '24px', textAlign: 'center' }}>{qQty}</span>
              <button onClick={() => setQQty(Math.min(4, qQty + 1))} style={{ width: '52px', height: '52px', borderRadius: '10px', border: `1px solid ${theme.border}`, backgroundColor: theme.bgInput, color: theme.text, fontSize: '20px', cursor: 'pointer' }}>+</button>
            </div>
          </div>
        )}

        {showAdvanced && (
          <>
            <label style={{ display: 'block', fontSize: '14px', color: theme.textMuted, marginBottom: '8px' }}>Locking wheel nuts?</label>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              {[
                { id: 'has_key', label: 'Has key', sub: 'No extra' },
                { id: 'no_key', label: 'No key', sub: `+£${signUpData.pricing.lwnRemovalPrice}` },
                { id: 'not_fitted', label: 'None fitted', sub: 'No extra' }
              ].map(opt => (
                <button key={opt.id} onClick={() => setQLwn(opt.id)} style={{ flex: 1, minHeight: '52px', padding: '12px 8px', backgroundColor: qLwn === opt.id ? (opt.id === 'no_key' ? `${theme.danger}15` : `${theme.primary}15`) : theme.bgInput, border: `2px solid ${qLwn === opt.id ? (opt.id === 'no_key' ? theme.danger : theme.primary) : theme.border}`, borderRadius: '10px', cursor: 'pointer', textAlign: 'center' }}>
                  <span style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: qLwn === opt.id ? (opt.id === 'no_key' ? theme.danger : theme.primary) : theme.text }}>{opt.label}</span>
                  <span style={{ display: 'block', fontSize: '11px', color: opt.id === 'no_key' && qLwn === opt.id ? theme.danger : theme.textMuted, marginTop: '2px' }}>{opt.sub}</span>
                </button>
              ))}
            </div>
          </>
        )}

        {/* Your fitting price */}
        <Input label={`Your ${qJobType === 'replace' ? 'Fitting' : qJobType === 'repair' ? 'Repair' : qJobType === 'rotation' ? 'Rotation' : 'Fit Only'} Price (£)`} placeholder="75.00" value={qPrice} onChange={setQPrice} type="number" />
        {priceSuggestion && needsTyreSize && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', backgroundColor: `${theme.info}10`, borderRadius: '10px', marginBottom: '12px', marginTop: '-4px' }}>
            <TrendingUp size={16} color={theme.info} />
            <span style={{ color: theme.info, fontSize: '13px' }}>You usually charge £{priceSuggestion.low}–£{priceSuggestion.high} for {qTyreSize}</span>
          </div>
        )}

        {/* Add-ons — customer sees these on the quote */}
        {showAdvanced && (
          <>
            <label style={{ display: 'block', fontSize: '14px', color: theme.textMuted, marginBottom: '8px' }}>Customer sees on quote</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
              {[
                { key: 'balancing', label: 'Digital Balancing', price: signUpData.pricing.digitalBalancingPrice, free: signUpData.pricing.digitalBalancingFree, perTyre: true },
                { key: 'newValves', label: 'New Valves', price: signUpData.pricing.newValvesPrice, free: signUpData.pricing.newValvesFree, perTyre: true },
                { key: 'disposal', label: 'Tyre Disposal', price: signUpData.pricing.oldTyreDisposalPrice, free: signUpData.pricing.disposalFree, perTyre: true },
                { key: 'alignment', label: 'Wheel Alignment', price: signUpData.services.alignmentPrice || '0', free: false, perTyre: false, show: signUpData.services.alignment }
              ].filter(a => a.show !== false).map(addon => {
                const active = qAddOns[addon.key];
                return (
                  <button key={addon.key} onClick={() => setQAddOns({ ...qAddOns, [addon.key]: !active })} style={{ minHeight: '58px', padding: '12px', backgroundColor: active ? `${theme.primary}12` : theme.bgInput, border: `2px solid ${active ? theme.primary : theme.border}`, borderRadius: '12px', textAlign: 'left', cursor: 'pointer' }}>
                    <span style={{ display: 'block', color: active ? theme.primary : theme.text, fontSize: '14px', fontWeight: '700' }}>{addon.label}</span>
                    <span style={{ display: 'block', color: active ? theme.primary : theme.textMuted, fontSize: '12px' }}>{addon.free ? 'FREE' : `£${addon.price}${addon.perTyre ? ` × ${qQty}` : ''}`}</span>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* Notes with voice input */}
        {showAdvanced && (
          <div style={{ position: 'relative', marginBottom: '16px' }}>
            <Input label="Notes (optional)" placeholder="Front left, nail in sidewall..." value={qNotes} onChange={setQNotes} />
            <button onClick={() => showToast('Listening...')} style={{ position: 'absolute', right: '12px', top: '38px', background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}>
              <Mic size={20} color={theme.primary} />
            </button>
          </div>
        )}

        {/* Full price breakdown */}
        <Card style={{ backgroundColor: `${theme.primary}08`, marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}><span style={{ color: theme.textMuted, fontSize: '16px' }}>{qJobType === 'replace' ? 'Fitting' : qJobType === 'repair' ? 'Repair' : qJobType === 'rotation' ? 'Rotation' : 'Fit only'}</span><span style={{ color: theme.text, fontSize: '16px' }}>£{basePrice.toFixed(2)}</span></div>
          {qAddOns.balancing && <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}><span style={{ color: theme.textMuted, fontSize: '16px' }}>Digital Balancing × {qQty}</span><span style={{ color: signUpData.pricing.digitalBalancingFree ? theme.primary : theme.text, fontWeight: signUpData.pricing.digitalBalancingFree ? '700' : '400', fontSize: '16px' }}>{signUpData.pricing.digitalBalancingFree ? 'FREE' : `£${balancingTotal.toFixed(2)}`}</span></div>}
          {qAddOns.newValves && <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}><span style={{ color: theme.textMuted, fontSize: '16px' }}>New Valves × {qQty}</span><span style={{ color: signUpData.pricing.newValvesFree ? theme.primary : theme.text, fontWeight: signUpData.pricing.newValvesFree ? '700' : '400', fontSize: '16px' }}>{signUpData.pricing.newValvesFree ? 'FREE' : `£${valvesTotal.toFixed(2)}`}</span></div>}
          {qAddOns.disposal && <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}><span style={{ color: theme.textMuted, fontSize: '16px' }}>Eco Disposal × {qQty}</span><span style={{ color: signUpData.pricing.disposalFree ? theme.primary : theme.text, fontWeight: signUpData.pricing.disposalFree ? '700' : '400', fontSize: '16px' }}>{signUpData.pricing.disposalFree ? 'FREE' : `£${disposalTotal.toFixed(2)}`}</span></div>}
          {qLwn === 'no_key' && <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}><span style={{ color: theme.danger, fontSize: '16px' }}>Locking Nut Removal</span><span style={{ color: theme.danger, fontSize: '16px' }}>£{lwnCharge.toFixed(2)}</span></div>}
          {qAddOns.alignment && <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}><span style={{ color: theme.textMuted, fontSize: '16px' }}>Wheel Alignment</span><span style={{ color: theme.text, fontSize: '16px' }}>£{alignmentCharge.toFixed(2)}</span></div>}
          <div style={{ borderTop: `1px solid ${theme.border}`, paddingTop: '8px', marginTop: '4px', display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.text, fontWeight: '700', fontSize: '18px' }}>Tyre fitting quote</span><span style={{ color: theme.text, fontWeight: '700', fontSize: '22px' }}>£{totalPrice.toFixed(2)}</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}><span style={{ color: theme.textMuted, fontSize: '16px' }}>+ £5.95 booking fee</span><span style={{ color: theme.text, fontSize: '16px', fontWeight: '700' }}>Total £{(totalPrice + 5.95).toFixed(2)}</span></div>
          <div style={{ marginTop: '8px', padding: '10px', backgroundColor: `${theme.primary}10`, borderRadius: '10px' }}>
            <span style={{ color: theme.text, fontSize: '16px', fontWeight: '600' }}>Customer pays £5.95 now, then pays fitter £{totalPrice.toFixed(2)} after fitting.</span>
          </div>
          <div style={{ borderTop: `1px solid ${theme.border}`, paddingTop: '8px', marginTop: '8px', display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.primary, fontWeight: '700' }}>To your wallet</span><span style={{ color: theme.primary, fontWeight: '700', fontSize: '18px' }}>£{(totalPrice * 0.985 - 0.20).toFixed(2)}</span></div>
        </Card>

        {/* Cover badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px', backgroundColor: `${theme.primary}10`, borderRadius: '10px', marginBottom: '20px' }}>
          <ShieldCheck size={18} color={theme.primary} />
          <span style={{ color: theme.textMuted, fontSize: '16px' }}>Customer gets <strong style={{ color: theme.primary }}>30 days free breakdown cover</strong> after fitting</span>
        </div>

        <h3 style={{ margin: '0 0 8px 0', color: theme.text, fontSize: '15px', textAlign: 'center' }}>Send quote to customer</h3>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
          {smsEnabled && (
            <button onClick={() => setSendChannel('sms')} style={{ flex: 1, minHeight: '52px', padding: '12px', backgroundColor: sendChannel === 'sms' ? `${theme.primary}15` : theme.bgInput, border: `2px solid ${sendChannel === 'sms' ? theme.primary : theme.border}`, borderRadius: '12px', cursor: 'pointer', fontSize: '15px', fontWeight: '700', color: sendChannel === 'sms' ? theme.primary : theme.text }}>Text Message</button>
          )}
          <button onClick={() => setSendChannel('whatsapp')} style={{ flex: 1, minHeight: '52px', padding: '12px', backgroundColor: sendChannel === 'whatsapp' ? '#25D36620' : theme.bgInput, border: `2px solid ${sendChannel === 'whatsapp' ? '#25D366' : theme.border}`, borderRadius: '12px', cursor: 'pointer', fontSize: '15px', fontWeight: '700', color: sendChannel === 'whatsapp' ? '#25D366' : theme.text }}>WhatsApp</button>
        </div>
        {!smsEnabled && <p style={{ margin: '0 0 12px 0', color: theme.textMuted, fontSize: '12px', textAlign: 'center' }}>SMS is off in onboarding settings, so only WhatsApp is shown.</p>}
        <Button onClick={() => setShowQuoteSmsPreview(sendChannel)} icon={Send}>Send Quote</Button>

        {showQuoteSmsPreview && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', zIndex: 2000, overflow: 'auto' }}>
            <Card style={{ maxWidth: '400px', width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, color: theme.text, fontWeight: '700' }}>Customer will receive</h3>
                <button onClick={() => setShowQuoteSmsPreview(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} color={theme.textMuted} /></button>
              </div>
              <div style={{ padding: '14px', backgroundColor: theme.bgInput, borderRadius: '12px', border: '1px solid ' + theme.border, marginBottom: '16px' }}>
                <p style={{ margin: '0 0 4px 0', fontSize: '10px', color: theme.textMuted, textTransform: 'uppercase', fontWeight: '700' }}>Via {showQuoteSmsPreview === 'whatsapp' ? 'WhatsApp' : 'SMS'}</p>
                <div style={{ fontSize: '13px', color: theme.textMuted, lineHeight: 1.7 }}>
                  <p style={{ margin: '4px 0 0 0' }}>Hi {qName || 'there'}, here is your quote from {signUpData.businessName || "Dan's Mobile Tyres"}:</p>
                  <p style={{ margin: '6px 0 0 0', fontWeight: '600', color: theme.text }}>{qQty}x {qTyreSize || '205/55R16'} {qJobType === 'replace' ? 'fitting' : qJobType} {'\u2014'} {'\u00A3'}{(totalPrice + 5.95).toFixed(2)}</p>
                  <p style={{ margin: '6px 0 0 0' }}><strong style={{ color: theme.primary }}>Pay {'\u00A3'}5.95 deposit now</strong> to secure your booking.</p>
                  <p style={{ margin: '6px 0 0 0' }}>All bookings include 30 days emergency tyre cover {'\u2014'} up to {'\u00A3'}300 repair or replace, nationwide.</p>
                  <p style={{ margin: '6px 0 0 0' }}>Remaining {'\u00A3'}{totalPrice.toFixed(2)} due on the day.</p>
                  <p style={{ margin: '6px 0 0 0', color: theme.info, textDecoration: 'underline' }}>tyre-fit.co/q/{(qPlate || 'AB12CDE').replace(/\s/g, '').toLowerCase()}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <Button variant="secondary" onClick={() => setShowQuoteSmsPreview(null)} fullWidth>Edit</Button>
                <Button onClick={() => { setShowQuoteSmsPreview(null); setQuoteData(prev => ({ ...prev, customerName: qName, mobile: qMobile, numberPlate: qPlate, price: String(totalPrice.toFixed(2)), isCoverQuote: false })); navigateTo('quote-sent'); }} fullWidth icon={Send}>Send</Button>
              </div>
            </Card>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
    );
  };

  // ============================================
  // EVIDENCE VAULT
  // ============================================
  const EvidenceVaultScreen = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const mockEvidence = [
      { id: 1, customer: 'Emma Davis', plate: 'CD90 VWX', date: '05 Feb', beforePhotos: 2, afterPhotos: 2, signature: true, gps: true },
      { id: 2, customer: 'Tom Harris', plate: 'EF12 YZA', date: '04 Feb', beforePhotos: 4, afterPhotos: 4, signature: true, gps: true },
      { id: 3, customer: 'John Smith', plate: 'AB12 CDE', date: '03 Feb', beforePhotos: 1, afterPhotos: 1, signature: false, gps: true },
      { id: 4, customer: 'Sarah Johnson', plate: 'PQ78 RST', date: '02 Feb', beforePhotos: 2, afterPhotos: 2, signature: true, gps: true },
      { id: 5, customer: 'Dave Williams', plate: 'JK56 LMN', date: '01 Feb', beforePhotos: 1, afterPhotos: 1, signature: true, gps: true }
    ];
    const filtered = searchTerm ? mockEvidence.filter(e => e.customer.toLowerCase().includes(searchTerm.toLowerCase()) || e.plate.toLowerCase().includes(searchTerm.toLowerCase())) : mockEvidence;
    return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.bg, paddingBottom: '100px' }}>
      <Toast />
      <Header title="Proof of Work" subtitle="Your dispute protection" />
      <div style={{ padding: '0 16px 16px' }}>
        <Card style={{ backgroundColor: `${theme.primary}10`, borderColor: theme.primary, marginBottom: '16px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Shield size={24} color={theme.primary} />
            <p style={{ margin: 0, color: theme.textMuted, fontSize: '14px', lineHeight: 1.5 }}>Every job has timestamped photos, GPS location, and customer sign-off. If anyone complains or raises a chargeback, <strong style={{ color: theme.text }}>this is your evidence</strong>.</p>
          </div>
        </Card>
        <Input placeholder="Search by name or reg plate..." value={searchTerm} onChange={setSearchTerm} icon={Search} />
      </div>
      <div style={{ padding: '0 16px' }}>
        {filtered.map(e => (
          <Card key={e.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div><h3 style={{ margin: 0, color: theme.text, fontWeight: '600' }}>{e.customer}</h3><p style={{ margin: '2px 0 0 0', color: theme.textMuted, fontSize: '13px' }}>{e.plate} • {e.date}</p></div>
              <ChevronRight size={20} color={theme.textMuted} />
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Badge variant="info">{e.beforePhotos} before</Badge>
              <Badge variant="info">{e.afterPhotos} after</Badge>
              <Badge variant={e.signature ? 'success' : 'warning'}>{e.signature ? 'Signed' : 'No signature'}</Badge>
              <Badge variant="success">GPS Active</Badge>
            </div>
          </Card>
        ))}
      </div>
      <BottomNav />
    </div>
    );
  };

  // ============================================
  // REFERRAL SCREEN
  // ============================================
  const ReferralScreen = () => (
    <div style={{ minHeight: '100vh', backgroundColor: theme.bg, paddingBottom: '100px' }}>
      <Toast />
      <Header title="Invite a Fitter" subtitle="You both earn £50" />
      <div style={{ padding: '16px' }}>
        <Card style={{ textAlign: 'center', padding: '32px 24px' }}>
          <div style={{ width: '80px', height: '80px', backgroundColor: `${theme.primary}20`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}><Gift size={36} color={theme.primary} /></div>
          <h2 style={{ margin: '0 0 8px 0', color: theme.text, fontSize: '22px' }}>Get £50. Give £50.</h2>
          <p style={{ color: theme.textMuted, fontSize: '15px', lineHeight: 1.6, margin: '0 0 24px 0' }}>When a fitter you invite completes their 5th job, you both get £50 added to your wallet.</p>
          <div style={{ padding: '16px', backgroundColor: theme.bgInput, borderRadius: '12px', marginBottom: '16px' }}>
            <p style={{ margin: '0 0 4px 0', color: theme.textMuted, fontSize: '13px' }}>Your referral link</p>
            <p style={{ margin: 0, color: theme.primary, fontWeight: '600', fontSize: '15px', wordBreak: 'break-all' }}>tyre-fit.co.uk/join/dan-2847</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Button onClick={() => showToast('Link copied!')} icon={Copy}>Copy Link</Button>
            <Button onClick={() => showToast('Opening WhatsApp...')} variant="whatsapp" icon={MessageSquare}>Share</Button>
          </div>
        </Card>

        <h3 style={{ margin: '24px 0 12px 0', color: theme.text, fontSize: '16px' }}>Your Invites</h3>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
            <div><p style={{ margin: 0, color: theme.text, fontWeight: '500' }}>Mike Palmer</p><p style={{ margin: '2px 0 0 0', color: theme.textMuted, fontSize: '13px' }}>3 of 5 jobs done</p></div>
            <Badge variant="warning">In progress</Badge>
          </div>
          <div style={{ borderTop: `1px solid ${theme.border}`, paddingTop: '8px', marginTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div><p style={{ margin: 0, color: theme.text, fontWeight: '500' }}>Chris Evans</p><p style={{ margin: '2px 0 0 0', color: theme.textMuted, fontSize: '13px' }}>5 of 5 jobs done</p></div>
            <Badge variant="success">£50 earned!</Badge>
          </div>
        </Card>
      </div>
      <BottomNav />
    </div>
  );

  // ============================================
  // DISPLAY SETTINGS
  // ============================================
  const SettingsDisplayScreen = () => (
    <div style={{ minHeight: '100vh', backgroundColor: theme.bg, paddingBottom: '100px' }}>
      <Toast />
      <Header title="Display Settings" />
      <div style={{ padding: '16px' }}>
        <Card>
          <h3 style={{ margin: '0 0 16px 0', color: theme.text, fontWeight: '600' }}>Appearance</h3>
          <Toggle label="Dark Mode" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
          <Toggle label="High Contrast (Sunlight Mode)" checked={highContrast} onChange={() => { setHighContrast(!highContrast); showToast(highContrast ? 'Normal contrast' : 'High contrast on'); }} />
        </Card>

        <Card>
          <h3 style={{ margin: '0 0 16px 0', color: theme.text, fontWeight: '600' }}>Text Size</h3>
          <div style={{ display: 'flex', gap: '8px' }}>
            {[{ id: 'medium', label: 'Normal', sample: '16px' }, { id: 'large', label: 'Large', sample: '20px' }].map(size => (
              <button key={size.id} onClick={() => { setFontSize(size.id); showToast(`Text size: ${size.label}`); }} style={{ flex: 1, padding: '16px 12px', backgroundColor: fontSize === size.id ? `${theme.primary}20` : theme.bgInput, border: `2px solid ${fontSize === size.id ? theme.primary : theme.border}`, borderRadius: '12px', cursor: 'pointer', textAlign: 'center' }}>
                <span style={{ fontSize: size.sample, fontWeight: '600', color: fontSize === size.id ? theme.primary : theme.text }}>Aa</span>
                <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: theme.textMuted }}>{size.label}</p>
              </button>
            ))}
          </div>
          <p style={{ margin: '12px 0 0 0', color: theme.textMuted, fontSize: `${14 * theme.fs}px`, lineHeight: 1.5 }}>Preview: This is how your text will look across the app.</p>
        </Card>

        <Card>
          <h3 style={{ margin: '0 0 16px 0', color: theme.text, fontWeight: '600' }}>Accessibility</h3>
          <Toggle label="Dyslexia-Friendly Font (OpenDyslexic)" checked={false} onChange={() => showToast('Font updated')} />
        </Card>

        <Card>
          <h3 style={{ margin: '0 0 16px 0', color: theme.text, fontWeight: '600' }}>Demo Controls</h3>
          <Toggle label="Simulate Offline Mode" checked={isOffline} onChange={() => { setIsOffline(!isOffline); showToast(isOffline ? 'Back online — syncing...' : 'Offline mode — data will queue'); }} />
          <p style={{ margin: '8px 0 0 0', color: theme.textMuted, fontSize: '12px' }}>When offline, photos and job updates queue locally and sync when connection returns.</p>
        </Card>
      </div>
    </div>
  );

  // ============================================
  // PRACTICE MODE
  // ============================================
  const PracticeModeScreen = () => {
    const [practiceStep, setPracticeStep] = useState(0);
    const steps = [
      { title: 'Create a Test Quote', desc: 'Try sending a quote — this one goes to you, not a real customer.', icon: FileText, action: 'Send Test Quote', 
        go: () => { navigateTo('quick-quote'); } },
      { title: 'Start a Job', desc: 'See the full en-route, photo, and payment flow.', icon: Navigation, action: 'Start Test Job', 
        go: () => { setActiveJob({ id: 99, customer: 'Test Customer', plate: 'TE57 APP', location: '123 Practice Street', tyreSize: '205/55R16', eta: '5 mins', depositPaid: true }); setIsCoverJob(false); setBeforePhotos({}); setAfterPhotos({}); setCustomerSigned(false); navigateTo('job-enroute'); } },
      { title: 'Take Job Photos', desc: 'Practice the before/after photo flow that builds your evidence.', icon: Camera, action: 'Try Photo Capture',
        go: () => { if (!activeJob) { setActiveJob({ id: 99, customer: 'Test Customer', plate: 'TE57 APP', location: '123 Practice Street', tyreSize: '205/55R16', eta: '5 mins', depositPaid: true }); } navigateTo('job-before-photo'); } },
      { title: 'Collect Payment', desc: 'See how card, QR, and cash payments work.', icon: CreditCard, action: 'Try Payment Flow',
        go: () => { if (!activeJob) { setActiveJob({ id: 99, customer: 'Test Customer', plate: 'TE57 APP', location: '123 Practice Street', tyreSize: '205/55R16', eta: '5 mins', depositPaid: true }); } navigateTo('job-payment'); } },
      { title: 'Check Your Wallet', desc: 'See where your money goes and how to withdraw.', icon: CreditCard, action: 'Open Wallet',
        go: () => { navigateTo('wallet'); } }
    ];
    return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.bg, paddingBottom: '100px' }}>
      <Toast />
      <Header title="Practice Mode" subtitle="Try it risk-free" />
      <div style={{ padding: '16px' }}>
        <Card style={{ backgroundColor: `${theme.info}10`, marginBottom: '16px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Info size={24} color={theme.info} />
            <p style={{ margin: 0, color: theme.textMuted, fontSize: '14px', lineHeight: 1.5 }}>This is a safe sandbox. Nothing you do here affects real customers, real jobs, or real money. Tap any step to try it.</p>
          </div>
        </Card>
        {steps.map((step, i) => {
          const StepIcon = step.icon;
          const isDone = i < practiceStep;
          const isCurrent = i === practiceStep;
          return (
          <Card key={i} onClick={() => { if (isCurrent) { setPracticeStep(i + 1); step.go(); } }} style={{ opacity: (!isCurrent && !isDone) ? 0.5 : 1, cursor: isCurrent ? 'pointer' : 'default', borderColor: isCurrent ? theme.primary : 'transparent', borderWidth: '2px', borderStyle: 'solid' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: isDone ? `${theme.primary}20` : isCurrent ? `${theme.primary}10` : theme.bgInput, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {isDone ? <CheckCircle size={24} color={theme.primary} /> : <StepIcon size={24} color={isCurrent ? theme.primary : theme.textMuted} />}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: 0, color: isDone ? theme.primary : theme.text, fontWeight: '600' }}>{step.title}</h3>
                <p style={{ margin: '4px 0 0 0', color: theme.textMuted, fontSize: '14px' }}>{step.desc}</p>
              </div>
              {isCurrent && <ChevronRight size={20} color={theme.primary} />}
            </div>
            {isCurrent && <button style={{ marginTop: '12px', width: '100%', padding: '12px', backgroundColor: theme.primary, border: 'none', borderRadius: '10px', color: '#000', fontWeight: '600', fontSize: '15px', cursor: 'pointer' }}>{step.action}</button>}
          </Card>
          );
        })}
        {practiceStep >= steps.length && (
          <Card style={{ textAlign: 'center', backgroundColor: `${theme.primary}10` }}>
            <CheckCircle size={48} color={theme.primary} style={{ marginBottom: '12px' }} />
            <h2 style={{ margin: '0 0 8px 0', color: theme.text }}>{"You're ready!"}</h2>
            <p style={{ color: theme.textMuted, marginBottom: '16px' }}>{"You've seen how everything works. Time to send your first real quote."}</p>
            <Button onClick={() => navigateTo('quick-quote')} icon={Zap}>Send First Real Quote</Button>
          </Card>
        )}
      </div>
    </div>
    );
  };

  // ============================================
  // INVOICES
  // ============================================
  const InvoicesScreen = () => {
    const [reminderPreview, setReminderPreview] = useState(null);
    const [resendPreview, setResendPreview] = useState(null);
    return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.bg, paddingBottom: '100px' }}>
      <Toast />
      <Header title="Invoices" />
      <div style={{ display: 'flex', gap: '8px', padding: '0 16px 16px' }}>
        {['sent', 'pending', 'overdue'].map(tab => (
          <button key={tab} onClick={() => setInvoiceTab(tab)} style={{ flex: 1, padding: '12px', backgroundColor: invoiceTab === tab ? theme.primary : theme.bgInput, border: 'none', borderRadius: '8px', color: invoiceTab === tab ? '#000' : theme.textMuted, fontWeight: '600', cursor: 'pointer', textTransform: 'capitalize', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            {tab}{tab === 'overdue' && mockInvoices.overdue.length > 0 && <span style={{ backgroundColor: invoiceTab === tab ? '#000' : theme.danger, color: invoiceTab === tab ? theme.primary : '#fff', padding: '2px 8px', borderRadius: '10px', fontSize: '12px' }}>{mockInvoices.overdue.length}</span>}
          </button>
        ))}
      </div>
      <div style={{ padding: '0 16px' }}>
        {mockInvoices[invoiceTab]?.map(inv => (
          <Card key={inv.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div><h3 style={{ margin: 0, color: theme.text, fontWeight: '600' }}>{inv.customer}</h3><p style={{ margin: '4px 0 0 0', color: theme.textMuted, fontSize: '14px' }}>{inv.plate}</p></div>
              <div style={{ textAlign: 'right' }}><p style={{ margin: 0, color: theme.text, fontWeight: '700', fontSize: '18px' }}>{'\u00A3'}{inv.amount}</p><p style={{ margin: '4px 0 0 0', color: theme.textMuted, fontSize: '12px' }}>{inv.date}</p></div>
            </div>
            {invoiceTab === 'overdue' && <div style={{ borderTop: '1px solid ' + theme.border, paddingTop: '12px' }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}><Badge variant="danger">{inv.daysOverdue} days overdue</Badge></div><div style={{ display: 'flex', gap: '8px' }}><Button size="small" fullWidth variant="secondary" onClick={() => setReminderPreview(inv)}>Send Reminder</Button><Button size="small" fullWidth onClick={() => showToast('Pay Now link sent to ' + inv.customer)}>Send Pay Now Link</Button></div></div>}
            {invoiceTab === 'pending' && <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid ' + theme.border, paddingTop: '12px' }}><Button variant="secondary" size="small" fullWidth onClick={() => setResendPreview(inv)}>Resend</Button><Button size="small" fullWidth onClick={() => showToast('Pay Now link sent to ' + inv.customer)}>Pay Now Link</Button><Button size="small" fullWidth variant="outline" onClick={() => { setInvoiceTab('sent'); showToast('Marked as paid'); }}>Mark Paid</Button></div>}
          </Card>
        ))}
        <Button variant="outline" icon={Plus} style={{ marginTop: '16px' }} onClick={() => navigateTo('invoice-create')}>Create Pro Invoice</Button>
      </div>

      {reminderPreview && (
        <Modal title="Preview Reminder" onClose={() => setReminderPreview(null)}>
          <div style={{ padding: '12px', backgroundColor: theme.bgInput, borderRadius: '10px', marginBottom: '16px' }}>
            <p style={{ margin: '0 0 2px 0', fontSize: '10px', color: theme.textMuted, textTransform: 'uppercase', fontWeight: '600' }}>Text to {reminderPreview.customer}</p>
            <div style={{ fontSize: '13px', color: theme.textMuted, lineHeight: 1.6, fontStyle: 'italic' }}>
              <p style={{ margin: '6px 0 0 0' }}>Hi {reminderPreview.customer.split(' ')[0]}, this is a friendly reminder that invoice {reminderPreview.id} for {'\u00A3'}{reminderPreview.amount} is {reminderPreview.daysOverdue} days overdue.</p>
              <p style={{ margin: '6px 0 0 0' }}>Pay online: <span style={{ color: theme.info, textDecoration: 'underline' }}>tyre-fit.co/pay/{reminderPreview.id}</span></p>
              <p style={{ margin: '6px 0 0 0' }}>Thanks — {signUpData.businessName || "Dan's Mobile Tyres"}</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Button variant="secondary" onClick={() => setReminderPreview(null)} fullWidth>Cancel</Button>
            <Button onClick={() => { setReminderPreview(null); showToast(`Reminder sent to ${reminderPreview.customer}`); }} fullWidth icon={Send}>Send</Button>
          </div>
        </Modal>
      )}

      {resendPreview && (
        <Modal title="Preview Invoice" onClose={() => setResendPreview(null)}>
          <div style={{ padding: '12px', backgroundColor: theme.bgInput, borderRadius: '10px', marginBottom: '16px' }}>
            <p style={{ margin: '0 0 2px 0', fontSize: '10px', color: theme.textMuted, textTransform: 'uppercase', fontWeight: '600' }}>Text to {resendPreview.customer}</p>
            <div style={{ fontSize: '13px', color: theme.textMuted, lineHeight: 1.6, fontStyle: 'italic' }}>
              <p style={{ margin: '6px 0 0 0' }}>Hi {resendPreview.customer.split(' ')[0]}, here is your invoice from {signUpData.businessName || "Dan's Mobile Tyres"} for {'\u00A3'}{resendPreview.amount}.</p>
              <p style={{ margin: '6px 0 0 0' }}>Pay online: <span style={{ color: theme.info, textDecoration: 'underline' }}>tyre-fit.co/pay/{resendPreview.id}</span></p>
              <p style={{ margin: '6px 0 0 0' }}>Thanks — {signUpData.fullName || 'Dan'}</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Button variant="secondary" onClick={() => setResendPreview(null)} fullWidth>Cancel</Button>
            <Button onClick={() => { setResendPreview(null); showToast(`Invoice resent to ${resendPreview.customer}`); }} fullWidth icon={Send}>Send</Button>
          </div>
        </Modal>
      )}

      <BottomNav />
    </div>
    );
  };

  const InvoiceCreateScreen = () => {
    const [invLines, setInvLines] = useState([{ desc: invoiceFormData.description || '', qty: 1, price: invoiceFormData.amount || '' }]);
    const [invDueDate, setInvDueDate] = useState('14');
    const [invNotes, setInvNotes] = useState('Thank you for choosing ' + (signUpData.businessName || "Dan's Mobile Tyres") + '. Payment is due within 14 days.');
    const [showPreview, setShowPreview] = useState(false);
    const addLine = () => setInvLines([...invLines, { desc: '', qty: 1, price: '' }]);
    const updateLine = (i, field, val) => { const l = [...invLines]; l[i][field] = val; setInvLines(l); };
    const removeLine = (i) => setInvLines(invLines.filter((_, idx) => idx !== i));
    const subtotal = invLines.reduce((sum, l) => sum + (parseFloat(l.price || 0) * l.qty), 0);
    const vatRate = signUpData.vatNumber ? 0.20 : 0;
    const vatAmount = subtotal * vatRate;
    const total = subtotal + vatAmount;
    const invNumber = 'INV-' + String(Math.floor(Math.random() * 9000) + 1000);
    const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

    return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.bg, paddingBottom: '100px' }}>
      <Header title="Create Invoice" subtitle="For non-quoted work" />
      <div style={{ padding: '16px' }}>
        {/* FROM — auto from business setup */}
        <Card style={{ marginBottom: '12px', backgroundColor: `${theme.primary}05`, borderColor: `${theme.primary}20` }}>
          <p style={{ margin: '0 0 4px 0', color: theme.textMuted, fontSize: '11px', textTransform: 'uppercase', fontWeight: '700' }}>From (your business)</p>
          <p style={{ margin: 0, color: theme.text, fontWeight: '600' }}>{signUpData.businessName || "Dan's Mobile Tyres"}</p>
          <p style={{ margin: '2px 0 0 0', color: theme.textMuted, fontSize: '13px' }}>{signUpData.fullName || 'Dan Smith'}</p>
          {signUpData.depots?.[0]?.address && <p style={{ margin: '2px 0 0 0', color: theme.textMuted, fontSize: '13px' }}>{signUpData.depots[0].address}</p>}
          {signUpData.vatNumber && <p style={{ margin: '2px 0 0 0', color: theme.textMuted, fontSize: '13px' }}>VAT: {signUpData.vatNumber}</p>}
        </Card>

        {/* TO — customer */}
        <p style={{ margin: '0 0 8px 0', color: theme.textMuted, fontSize: '11px', textTransform: 'uppercase', fontWeight: '700' }}>Bill to</p>
        <Input label="Customer Name" placeholder="Enter name" value={invoiceFormData.customerName} onChange={(v) => setInvoiceFormData({...invoiceFormData, customerName: v})} required />
        <Input label="Mobile" placeholder="07700 900123" type="tel" icon={Phone} value={invoiceFormData.mobile} onChange={(v) => setInvoiceFormData({...invoiceFormData, mobile: v})} required />

        {/* LINE ITEMS */}
        <p style={{ margin: '16px 0 8px 0', color: theme.textMuted, fontSize: '11px', textTransform: 'uppercase', fontWeight: '700' }}>Line items</p>
        {invLines.map((line, i) => (
          <Card key={i} style={{ marginBottom: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ color: theme.textMuted, fontSize: '12px', fontWeight: '600' }}>Item {i + 1}</span>
              {invLines.length > 1 && <button onClick={() => removeLine(i)} style={{ background: 'none', border: 'none', color: theme.danger, cursor: 'pointer', padding: '4px' }}><Trash2 size={16} /></button>}
            </div>
            <Input placeholder="Description (e.g. 2x 205/55R16 fitting)" value={line.desc} onChange={(v) => updateLine(i, 'desc', v)} />
            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ width: '80px' }}><Input label="Qty" type="number" value={String(line.qty)} onChange={(v) => updateLine(i, 'qty', parseInt(v) || 1)} /></div>
              <div style={{ flex: 1 }}><Input label="Unit Price (£)" type="number" placeholder="0.00" value={line.price} onChange={(v) => updateLine(i, 'price', v)} /></div>
              <div style={{ width: '80px', paddingTop: '28px' }}><p style={{ margin: 0, color: theme.text, fontWeight: '600', fontSize: '16px', textAlign: 'right' }}>£{(parseFloat(line.price || 0) * line.qty).toFixed(2)}</p></div>
            </div>
          </Card>
        ))}
        <button onClick={addLine} style={{ width: '100%', padding: '12px', backgroundColor: 'transparent', border: `2px dashed ${theme.border}`, borderRadius: '12px', color: theme.textMuted, fontSize: '13px', cursor: 'pointer', marginBottom: '16px' }}><Plus size={16} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> Add Line Item</button>

        {/* TOTALS */}
        <Card style={{ marginBottom: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}><span style={{ color: theme.textMuted }}>Subtotal</span><span style={{ color: theme.text, fontWeight: '500' }}>£{subtotal.toFixed(2)}</span></div>
          {signUpData.vatNumber && <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}><span style={{ color: theme.textMuted }}>VAT (20%)</span><span style={{ color: theme.text, fontWeight: '500' }}>£{vatAmount.toFixed(2)}</span></div>}
          <div style={{ borderTop: `2px solid ${theme.border}`, paddingTop: '8px', display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.text, fontWeight: '700', fontSize: '16px' }}>Total</span><span style={{ color: theme.primary, fontWeight: '700', fontSize: '20px' }}>£{total.toFixed(2)}</span></div>
        </Card>

        {/* DUE DATE + NOTES */}
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', fontSize: '14px', color: theme.textMuted, marginBottom: '8px' }}>Payment due in</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['7', '14', '30'].map(d => (
              <button key={d} onClick={() => setInvDueDate(d)} style={{ flex: 1, padding: '12px', backgroundColor: invDueDate === d ? `${theme.primary}15` : theme.bgInput, border: `2px solid ${invDueDate === d ? theme.primary : theme.border}`, borderRadius: '10px', cursor: 'pointer' }}>
                <span style={{ color: invDueDate === d ? theme.primary : theme.text, fontWeight: '600' }}>{d} days</span>
              </button>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '14px', color: theme.textMuted, marginBottom: '8px' }}>Notes (shown on invoice)</label>
          <textarea value={invNotes} onChange={(e) => setInvNotes(e.target.value)} style={{ width: '100%', minHeight: '60px', backgroundColor: theme.bgInput, border: `1px solid ${theme.border}`, borderRadius: '12px', padding: '12px', fontSize: '14px', color: theme.text, resize: 'vertical', boxSizing: 'border-box' }} />
        </div>

        {/* ACTIONS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Button onClick={() => setShowPreview(true)} icon={FileText}>Preview & Send</Button>
          <Button variant="secondary" onClick={goBack} fullWidth>Cancel</Button>
        </div>
      </div>

      {/* INVOICE PREVIEW */}
      {showPreview && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 2000, overflow: 'auto' }}>
          <div style={{ maxWidth: '420px', margin: '0 auto', padding: '24px', minHeight: '100vh' }}>
            {/* White invoice paper */}
            <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '24px', color: '#000' }}>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', borderBottom: '3px solid #10b981', paddingBottom: '16px' }}>
                <div>
                  <h2 style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: '#000' }}>{signUpData.businessName || "Dan's Mobile Tyres"}</h2>
                  <p style={{ margin: '4px 0 0 0', color: '#666', fontSize: '13px' }}>{signUpData.fullName || 'Dan Smith'}</p>
                  {signUpData.depots?.[0]?.address && <p style={{ margin: '2px 0 0 0', color: '#666', fontSize: '13px' }}>{signUpData.depots[0].address}</p>}
                  {signUpData.vatNumber && <p style={{ margin: '2px 0 0 0', color: '#666', fontSize: '13px' }}>VAT: {signUpData.vatNumber}</p>}
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: '#10b981' }}>INVOICE</p>
                  <p style={{ margin: '4px 0 0 0', color: '#666', fontSize: '13px' }}>{invNumber}</p>
                  <p style={{ margin: '2px 0 0 0', color: '#666', fontSize: '13px' }}>{today}</p>
                </div>
              </div>

              {/* Bill to */}
              <div style={{ marginBottom: '20px' }}>
                <p style={{ margin: '0 0 4px 0', color: '#999', fontSize: '11px', textTransform: 'uppercase', fontWeight: '700' }}>Bill to</p>
                <p style={{ margin: 0, color: '#000', fontWeight: '600' }}>{invoiceFormData.customerName || 'Customer Name'}</p>
                <p style={{ margin: '2px 0 0 0', color: '#666', fontSize: '13px' }}>{invoiceFormData.mobile}</p>
              </div>

              {/* Line items table */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', borderBottom: '2px solid #e5e5e5', paddingBottom: '8px', marginBottom: '8px' }}>
                  <span style={{ flex: 3, color: '#999', fontSize: '11px', textTransform: 'uppercase', fontWeight: '700' }}>Description</span>
                  <span style={{ flex: 1, color: '#999', fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', textAlign: 'center' }}>Qty</span>
                  <span style={{ flex: 1, color: '#999', fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', textAlign: 'right' }}>Price</span>
                  <span style={{ flex: 1, color: '#999', fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', textAlign: 'right' }}>Total</span>
                </div>
                {invLines.map((line, i) => (
                  <div key={i} style={{ display: 'flex', padding: '6px 0', borderBottom: '1px solid #f0f0f0' }}>
                    <span style={{ flex: 3, color: '#000', fontSize: '14px' }}>{line.desc || 'Item'}</span>
                    <span style={{ flex: 1, color: '#666', fontSize: '14px', textAlign: 'center' }}>{line.qty}</span>
                    <span style={{ flex: 1, color: '#666', fontSize: '14px', textAlign: 'right' }}>£{parseFloat(line.price || 0).toFixed(2)}</span>
                    <span style={{ flex: 1, color: '#000', fontSize: '14px', fontWeight: '600', textAlign: 'right' }}>£{(parseFloat(line.price || 0) * line.qty).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div style={{ marginLeft: 'auto', maxWidth: '200px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}><span style={{ color: '#666', fontSize: '14px' }}>Subtotal</span><span style={{ color: '#000' }}>£{subtotal.toFixed(2)}</span></div>
                {signUpData.vatNumber && <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}><span style={{ color: '#666', fontSize: '14px' }}>VAT (20%)</span><span style={{ color: '#000' }}>£{vatAmount.toFixed(2)}</span></div>}
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid #10b981', paddingTop: '8px', marginTop: '4px' }}><span style={{ color: '#000', fontWeight: '700', fontSize: '16px' }}>Total</span><span style={{ color: '#10b981', fontWeight: '700', fontSize: '20px' }}>£{total.toFixed(2)}</span></div>
              </div>

              {/* Payment terms + notes */}
              <div style={{ marginTop: '24px', padding: '12px', backgroundColor: '#f8f8f8', borderRadius: '8px' }}>
                <p style={{ margin: '0 0 4px 0', color: '#999', fontSize: '11px', textTransform: 'uppercase', fontWeight: '700' }}>Payment due</p>
                <p style={{ margin: 0, color: '#000', fontSize: '14px', fontWeight: '500' }}>{invDueDate} days — by {new Date(Date.now() + parseInt(invDueDate) * 86400000).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                {invNotes && <p style={{ margin: '8px 0 0 0', color: '#666', fontSize: '13px', lineHeight: 1.5 }}>{invNotes}</p>}
              </div>

              {/* Pay button (what customer sees) */}
              <div style={{ marginTop: '16px', padding: '14px', backgroundColor: '#10b981', borderRadius: '10px', textAlign: 'center' }}>
                <span style={{ color: '#000', fontWeight: '700', fontSize: '16px' }}>Pay £{total.toFixed(2)} Now</span>
              </div>

              {/* Footer */}
              <p style={{ margin: '16px 0 0 0', color: '#ccc', fontSize: '11px', textAlign: 'center' }}>{signUpData.businessName || "Dan's Mobile Tyres"}, backed by TYRE-FIT</p>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
              <Button onClick={() => setShowPreview(false)} variant="secondary" fullWidth>Edit</Button>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
                <Button variant="whatsapp" onClick={() => { setShowPreview(false); showToast('Invoice sent via WhatsApp'); navigateTo('invoices'); }} icon={MessageSquare} fullWidth>WhatsApp</Button>
                {smsEnabled && <Button onClick={() => { setShowPreview(false); showToast('Invoice sent via SMS'); navigateTo('invoices'); }} icon={Send} fullWidth>Text</Button>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    );
  };

  // ============================================
  // DISPUTES
  // ============================================
  const DisputesScreen = () => {
    const [search, setSearch] = useState('');
    const mockDisputes = [
      { id: 1, plate: 'AB12 CDE', customer: 'John Smith', phone: '07700 900123', date: '04 Feb 2026', time: '14:32', location: '45 High St, E1', status: 'none', gps: '51.5074, -0.1278', tyres: '2x 205/55R16', brand: 'Michelin Primacy 4', dot: 'DOT 2425', paymentMethod: 'Card (App)', transactionId: 'TXN-2026-0204-1432', amount: '£149.99', invoiceRef: 'INV-0041', signedOff: true, timeline: { arrived: '14:15', inspected: '14:20', started: '14:32', completed: '15:05', signedOff: '15:08' } },
      { id: 2, plate: 'XY34 FGH', customer: 'Sarah Jones', phone: '07700 900456', date: '03 Feb 2026', time: '09:15', location: '78 Mill Rd, E2', status: 'won', gps: '51.5194, -0.1270', tyres: '4x 225/45R17', brand: 'Continental PremiumContact 6', dot: 'DOT 2324', paymentMethod: 'Cash', transactionId: null, amount: '£299.99', invoiceRef: 'INV-0039', signedOff: true, timeline: { arrived: '09:00', inspected: '09:08', started: '09:15', completed: '10:10', signedOff: '10:12' } }
    ];
    const filtered = mockDisputes.filter(d => d.plate.toLowerCase().includes(search.toLowerCase()) || d.customer.toLowerCase().includes(search.toLowerCase()));
    
    return (
      <div style={{ minHeight: '100vh', backgroundColor: theme.bg, paddingBottom: '100px' }}>
        <Header title="Dispute Protection" />
        
        {/* EXPLAINER */}
        <div style={{ padding: '0 16px 16px' }}>
          <Card style={{ borderColor: '#8b5cf6', borderWidth: '2px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
              <div style={{ width: '44px', height: '44px', backgroundColor: '#8b5cf620', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Shield size={22} color="#8b5cf6" /></div>
              <div>
                <h3 style={{ margin: 0, color: theme.text, fontWeight: '700', fontSize: '15px' }}>Every job builds your evidence</h3>
                <p style={{ margin: '4px 0 0 0', color: theme.textMuted, fontSize: '13px', lineHeight: 1.5 }}>TYRE-FIT logs GPS, timestamps, photos, and payment details automatically. Tap any job below to view the full evidence report — download it as a PDF or email it straight to the customer or your bank.</p>
              </div>
            </div>
          </Card>
        </div>

        <div style={{ padding: '0 16px 12px' }}>
          <div style={{ position: 'relative' }}><Search size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: theme.textMuted }} /><input type="text" placeholder="Search by plate or customer name..." value={search} onChange={(e) => setSearch(e.target.value.toUpperCase())} style={{ width: '100%', padding: '16px 16px 16px 48px', backgroundColor: theme.bgInput, border: `1px solid ${theme.border}`, borderRadius: '12px', color: theme.text, fontSize: '16px', textTransform: 'uppercase', boxSizing: 'border-box' }} /></div>
        </div>
        <div style={{ padding: '0 16px' }}>
          {filtered.map(d => (
            <Card key={d.id} onClick={() => { setSelectedDispute(d); navigateTo('dispute-detail'); }} style={{ cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div><h3 style={{ margin: 0, color: theme.text, fontWeight: '700', fontSize: '20px', letterSpacing: '1px' }}>{d.plate}</h3><p style={{ margin: '4px 0 0 0', color: theme.textMuted }}>{d.customer}</p></div>
                <div style={{ textAlign: 'right' }}><p style={{ margin: 0, color: theme.textMuted, fontSize: '14px' }}>{d.date}</p><p style={{ margin: '4px 0 0 0', color: theme.textMuted, fontSize: '14px' }}>{d.time}</p></div>
              </div>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                <div style={{ flex: 1, height: '60px', backgroundColor: theme.bgInput, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ textAlign: 'center' }}><Camera size={20} color={theme.textMuted} /><p style={{ margin: '4px 0 0 0', fontSize: '10px', color: theme.textMuted }}>BEFORE</p></div></div>
                <div style={{ flex: 1, height: '60px', backgroundColor: theme.bgInput, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ textAlign: 'center' }}><Camera size={20} color={theme.textMuted} /><p style={{ margin: '4px 0 0 0', fontSize: '10px', color: theme.textMuted }}>AFTER</p></div></div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin size={14} color={theme.textMuted} /><span style={{ color: theme.textMuted, fontSize: '14px' }}>{d.location}</span>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <Badge variant={d.paymentMethod === 'Cash' ? 'warning' : 'info'}>{d.paymentMethod === 'Cash' ? 'Cash' : 'Card'}</Badge>
                  <Badge variant={d.status === 'won' ? 'success' : d.status === 'lost' ? 'danger' : 'default'}>{d.status === 'none' ? 'No dispute' : d.status === 'won' ? 'Won' : 'Lost'}</Badge>
                </div>
              </div>
              {/* TAP PROMPT */}
              <div style={{ borderTop: `1px solid ${theme.border}`, paddingTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileText size={15} color="#8b5cf6" />
                  <span style={{ color: '#8b5cf6', fontSize: '13px', fontWeight: '600' }}>View full report — download or email</span>
                </div>
                <ChevronRight size={18} color="#8b5cf6" />
              </div>
            </Card>
          ))}
        </div>
        <BottomNav />
      </div>
    );
  };

  const DisputeDetailScreen = () => {
    if (!selectedDispute) {
      return (
        <div style={{ minHeight: '100vh', backgroundColor: theme.bg, paddingBottom: '100px' }}>
          <Toast />
          <Header title="Dispute Detail" />
          <div style={{ padding: '24px' }}>
            <Card style={{ borderColor: theme.warning }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <AlertTriangle size={20} color={theme.warning} />
                <div>
                  <p style={{ margin: 0, color: theme.text, fontWeight: '700' }}>No dispute selected</p>
                  <p style={{ margin: '6px 0 0 0', color: theme.textMuted, fontSize: '14px' }}>Open a dispute from the list first so we can load evidence and timeline details.</p>
                </div>
              </div>
            </Card>
            <Button onClick={() => navigateTo('disputes')} icon={ArrowLeft}>Back to Disputes</Button>
          </div>
        </div>
      );
    }
    const d = selectedDispute;
    const isCardPayment = d.paymentMethod !== 'Cash';
    const [showEmailConfirm, setShowEmailConfirm] = useState(false);
    const [showChargebackConfirm, setShowChargebackConfirm] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [chargebackSent, setChargebackSent] = useState(false);
    
    return (
      <div style={{ minHeight: '100vh', backgroundColor: theme.bg, paddingBottom: '100px' }}>
        <Toast />
        <Header title={d.plate} subtitle={d.customer} />
        <div style={{ padding: '16px' }}>

          {/* STATUS BANNER */}
          <div style={{ padding: '12px 16px', backgroundColor: d.status === 'won' ? `${theme.primary}10` : d.status === 'lost' ? `${theme.danger}10` : `${theme.bgInput}`, borderRadius: '10px', border: `1px solid ${d.status === 'won' ? theme.primary : d.status === 'lost' ? theme.danger : theme.border}30`, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            {d.status === 'won' ? <CheckCircle size={18} color={theme.primary} /> : d.status === 'lost' ? <AlertOctagon size={18} color={theme.danger} /> : <Shield size={18} color={theme.textMuted} />}
            <div>
              <p style={{ margin: 0, color: d.status === 'won' ? theme.primary : d.status === 'lost' ? theme.danger : theme.text, fontWeight: '600', fontSize: '14px' }}>{d.status === 'won' ? 'Dispute Won — evidence accepted' : d.status === 'lost' ? 'Dispute Lost' : 'No active dispute'}</p>
              <p style={{ margin: '2px 0 0 0', color: theme.textMuted, fontSize: '12px' }}>{d.status === 'none' ? 'Evidence pack ready if needed' : isCardPayment ? 'Bank chargeback resolved' : 'Customer complaint resolved'}</p>
            </div>
          </div>

          {/* BEFORE / AFTER PHOTOS */}
          <h3 style={{ fontSize: '13px', fontWeight: '600', color: theme.textMuted, margin: '0 0 10px 0', textTransform: 'uppercase' }}>Photo Evidence</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
            <div><div style={{ aspectRatio: '4/3', backgroundColor: theme.bgInput, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${theme.border}`, position: 'relative' }}><Camera size={36} color={theme.textMuted} /><div style={{ position: 'absolute', bottom: '8px', left: '8px', right: '8px', display: 'flex', justifyContent: 'space-between' }}><span style={{ fontSize: '10px', color: theme.textMuted, backgroundColor: 'rgba(0,0,0,0.6)', padding: '2px 6px', borderRadius: '4px' }}>BEFORE</span><span style={{ fontSize: '10px', color: theme.textMuted, backgroundColor: 'rgba(0,0,0,0.6)', padding: '2px 6px', borderRadius: '4px' }}>{d.timeline.inspected}</span></div></div></div>
            <div><div style={{ aspectRatio: '4/3', backgroundColor: theme.bgInput, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${theme.border}`, position: 'relative' }}><Camera size={36} color={theme.textMuted} /><div style={{ position: 'absolute', bottom: '8px', left: '8px', right: '8px', display: 'flex', justifyContent: 'space-between' }}><span style={{ fontSize: '10px', color: theme.textMuted, backgroundColor: 'rgba(0,0,0,0.6)', padding: '2px 6px', borderRadius: '4px' }}>AFTER</span><span style={{ fontSize: '10px', color: theme.textMuted, backgroundColor: 'rgba(0,0,0,0.6)', padding: '2px 6px', borderRadius: '4px' }}>{d.timeline.completed}</span></div></div></div>
          </div>

          {/* JOB TIMELINE */}
          <h3 style={{ fontSize: '13px', fontWeight: '600', color: theme.textMuted, margin: '0 0 10px 0', textTransform: 'uppercase' }}>Job Timeline</h3>
          <Card>
            {[
              { label: 'Arrived on site', time: d.timeline.arrived, icon: MapPin },
              { label: 'Before photos taken', time: d.timeline.inspected, icon: Camera },
              { label: 'Work started', time: d.timeline.started, icon: Wrench },
              { label: 'Work completed & after photos', time: d.timeline.completed, icon: CheckCircle },
              { label: 'Customer signed off', time: d.timeline.signedOff, icon: FileText }
            ].map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 0', borderBottom: i < 4 ? `1px solid ${theme.border}` : 'none' }}>
                <div style={{ width: '32px', height: '32px', backgroundColor: `${theme.primary}15`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><step.icon size={14} color={theme.primary} /></div>
                <span style={{ flex: 1, color: theme.text, fontSize: '14px' }}>{step.label}</span>
                <span style={{ color: theme.primary, fontWeight: '600', fontSize: '14px', fontFamily: 'monospace' }}>{step.time}</span>
              </div>
            ))}
          </Card>

          {/* JOB DETAILS */}
          <h3 style={{ fontSize: '13px', fontWeight: '600', color: theme.textMuted, margin: '20px 0 10px 0', textTransform: 'uppercase' }}>Job Details</h3>
          <Card>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.textMuted }}>Customer</span><span style={{ color: theme.text, fontWeight: '500' }}>{d.customer}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.textMuted }}>Phone</span><span style={{ color: theme.text, fontWeight: '500' }}>{d.phone}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.textMuted }}>Vehicle</span><span style={{ color: theme.text, fontWeight: '700', letterSpacing: '1px' }}>{d.plate}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.textMuted }}>Tyres fitted</span><span style={{ color: theme.text, fontWeight: '500' }}>{d.tyres}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.textMuted }}>Brand</span><span style={{ color: theme.text, fontWeight: '500' }}>{d.brand}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.textMuted }}>DOT Code</span><span style={{ color: theme.text, fontWeight: '500', fontFamily: 'monospace' }}>{d.dot}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.textMuted }}>Location</span><span style={{ color: theme.text, fontWeight: '500' }}>{d.location}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.textMuted }}>GPS</span><span style={{ color: theme.text, fontWeight: '500', fontFamily: 'monospace' }}>{d.gps}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ color: theme.textMuted }}>Customer sign-off</span>{d.signedOff ? <Badge variant="success">Signed</Badge> : <Badge variant="danger">Not signed</Badge>}</div>
            </div>
          </Card>

          {/* PAYMENT & TRANSACTION */}
          <h3 style={{ fontSize: '13px', fontWeight: '600', color: theme.textMuted, margin: '20px 0 10px 0', textTransform: 'uppercase' }}>Payment Evidence</h3>
          <Card style={isCardPayment ? { borderColor: theme.info } : {}}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ color: theme.textMuted }}>Payment method</span><Badge variant={isCardPayment ? 'info' : 'warning'}>{d.paymentMethod}</Badge></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.textMuted }}>Amount</span><span style={{ color: theme.text, fontWeight: '700', fontSize: '16px' }}>{d.amount}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.textMuted }}>Invoice</span><span style={{ color: theme.primary, fontWeight: '500' }}>{d.invoiceRef}</span></div>
              {d.transactionId && <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.textMuted }}>Transaction ID</span><span style={{ color: theme.text, fontWeight: '500', fontFamily: 'monospace', fontSize: '13px' }}>{d.transactionId}</span></div>}
            </div>
            {isCardPayment && (
              <div style={{ marginTop: '12px', padding: '10px', backgroundColor: `${theme.info}10`, borderRadius: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Info size={14} color={theme.info} />
                  <span style={{ color: theme.info, fontSize: '12px' }}>Card payment — transaction ID and invoice included in evidence pack for bank chargeback defence</span>
                </div>
              </div>
            )}
            {!isCardPayment && (
              <div style={{ marginTop: '12px', padding: '10px', backgroundColor: `${theme.warning}10`, borderRadius: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Info size={14} color={theme.warning} />
                  <span style={{ color: theme.warning, fontSize: '12px' }}>Cash payment — no chargeback risk. Evidence pack covers quality disputes only.</span>
                </div>
              </div>
            )}
          </Card>

          {/* EVIDENCE STRENGTH */}
          <h3 style={{ fontSize: '13px', fontWeight: '600', color: theme.textMuted, margin: '20px 0 10px 0', textTransform: 'uppercase' }}>Evidence Strength</h3>
          <Card>
            {[
              { label: 'Before & after photos', ok: true },
              { label: 'GPS-stamped location', ok: true },
              { label: 'Timestamped job timeline', ok: true },
              { label: 'Customer sign-off', ok: d.signedOff },
              { label: 'Payment transaction linked', ok: isCardPayment },
              { label: 'Invoice on file', ok: true }
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 0' }}>
                {item.ok ? <CheckCircle size={16} color={theme.primary} /> : <AlertTriangle size={16} color={theme.warning} />}
                <span style={{ color: item.ok ? theme.text : theme.warning, fontSize: '14px' }}>{item.label}</span>
              </div>
            ))}
            <div style={{ marginTop: '12px', padding: '10px', backgroundColor: `${theme.primary}10`, borderRadius: '8px' }}>
              <p style={{ margin: 0, color: theme.primary, fontSize: '13px', fontWeight: '600' }}>
                {d.signedOff && isCardPayment ? 'Strong — all evidence captured. Ready for bank or customer dispute.' : d.signedOff ? 'Good — signed off with full photo evidence.' : 'Fair — missing customer sign-off. Photos and GPS still provide strong proof.'}
              </p>
            </div>
          </Card>

          {/* ACTIONS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '24px' }}>
            <Button icon={Download} onClick={() => showToast('Evidence report PDF saved to your phone')}>Download Evidence Report (PDF)</Button>
            <Button variant="secondary" icon={Send} onClick={() => setShowEmailConfirm(true)} disabled={emailSent}>{emailSent ? 'Evidence Report Sent' : 'Email Report to Customer'}</Button>
            {isCardPayment && <Button variant="secondary" icon={Send} onClick={() => setShowChargebackConfirm(true)} disabled={chargebackSent}>{chargebackSent ? 'Chargeback Defence Submitted' : 'Submit Chargeback Defence'}</Button>}
          </div>
          <p style={{ textAlign: 'center', color: theme.textMuted, fontSize: '12px', marginTop: '12px', lineHeight: 1.5 }}>The evidence report includes all photos, GPS data, job timeline, payment details, and customer sign-off in one PDF ready to send to banks or customers.</p>

          {/* EMAIL CONFIRM MODAL */}
          {showEmailConfirm && (
            <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
              <Card style={{ maxWidth: '380px', width: '100%' }}>
                <h3 style={{ margin: '0 0 8px 0', color: theme.text, fontWeight: '700', fontSize: '16px' }}>Send evidence report to customer?</h3>
                <p style={{ margin: '0 0 12px 0', color: theme.textMuted, fontSize: '13px', lineHeight: 1.5 }}>This sends a PDF with all before/after photos, GPS data, job timeline, and payment proof to the customer. Use this when they've raised a complaint and you want to show the evidence.</p>
                <div style={{ padding: '10px 12px', backgroundColor: theme.bgInput, borderRadius: '8px', marginBottom: '16px' }}>
                  <p style={{ margin: 0, color: theme.textMuted, fontSize: '12px' }}>Sending to</p>
                  <p style={{ margin: '2px 0 0 0', color: theme.text, fontWeight: '600' }}>{d.customer} — via SMS/WhatsApp link</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Button variant="secondary" fullWidth onClick={() => setShowEmailConfirm(false)}>Cancel</Button>
                  <Button fullWidth onClick={() => { setShowEmailConfirm(false); setEmailSent(true); showToast(`Evidence report sent to ${d.customer}`); }} icon={Send}>Send Report</Button>
                </div>
              </Card>
            </div>
          )}

          {/* CHARGEBACK CONFIRM MODAL */}
          {showChargebackConfirm && (
            <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
              <Card style={{ maxWidth: '380px', width: '100%' }}>
                <h3 style={{ margin: '0 0 8px 0', color: theme.text, fontWeight: '700', fontSize: '16px' }}>Submit chargeback defence?</h3>
                <p style={{ margin: '0 0 12px 0', color: theme.textMuted, fontSize: '13px', lineHeight: 1.5 }}>This submits your full evidence pack to the payment provider via Stripe. It includes all photos, GPS timestamps, the customer sign-off, and job timeline.</p>
                <div style={{ padding: '10px 12px', backgroundColor: theme.bgInput, borderRadius: '8px', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}><span style={{ color: theme.textMuted, fontSize: '12px' }}>Transaction</span><span style={{ color: theme.text, fontSize: '12px', fontWeight: '500' }}>{d.transactionId}</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.textMuted, fontSize: '12px' }}>Amount</span><span style={{ color: theme.text, fontSize: '12px', fontWeight: '500' }}>{d.amount}</span></div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', backgroundColor: `${theme.primary}10`, borderRadius: '8px', marginBottom: '16px' }}>
                  <CheckCircle size={14} color={theme.primary} />
                  <span style={{ color: theme.primary, fontSize: '12px', fontWeight: '600' }}>Evidence strength: {d.signedOff && isCardPayment ? 'Strong' : d.signedOff ? 'Good' : 'Fair'}</span>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Button variant="secondary" fullWidth onClick={() => setShowChargebackConfirm(false)}>Cancel</Button>
                  <Button fullWidth onClick={() => { setShowChargebackConfirm(false); setChargebackSent(true); showToast('Chargeback defence submitted — Stripe will review within 7 days'); }} icon={Shield}>Submit Defence</Button>
                </div>
              </Card>
            </div>
          )}

        </div>
        <BottomNav />
      </div>
    );
  };

  // ============================================
  // ROUTE
  // ============================================
  const RouteScreen = () => {
    const [orderedJobs, setOrderedJobs] = useState(mockJobs);
    const [dragJobId, setDragJobId] = useState(null);

    const optimiseRouteOrder = () => {
      setOrderedJobs(prev => {
        const ranked = [...prev].sort((a, b) => {
          if ((a.depositPaid || a.isCoverJob || a.isEmergency) && !(b.depositPaid || b.isCoverJob || b.isEmergency)) return -1;
          if (!(a.depositPaid || a.isCoverJob || a.isEmergency) && (b.depositPaid || b.isCoverJob || b.isEmergency)) return 1;
          return (a.time || '').localeCompare(b.time || '');
        });
        return ranked;
      });
      showToast('Route optimised and affected customers notified');
    };

    const dropJobAt = (targetId) => {
      if (!dragJobId || dragJobId === targetId) return;
      setOrderedJobs(prev => {
        const from = prev.findIndex(j => j.id === dragJobId);
        const to = prev.findIndex(j => j.id === targetId);
        if (from < 0 || to < 0) return prev;
        const copy = [...prev];
        const [moved] = copy.splice(from, 1);
        copy.splice(to, 0, moved);
        return copy;
      });
      showToast('Route order updated');
      setDragJobId(null);
    };

    // Build route with depot stops inserted
    let routeItems = [...orderedJobs];
    
    // Insert cover job if accepted
    if (coverJobInRoute) {
      if (routeInsertPosition === 'next') routeItems = [coverJobInRoute, ...routeItems];
      else if (routeInsertPosition === 'optimise') routeItems = [routeItems[0], coverJobInRoute, ...routeItems.slice(1)];
      else routeItems = [...routeItems, coverJobInRoute];
    }
    
    // Insert depot stops
    depotStops.forEach(depot => {
      const depotItem = { id: `depot-${depot.id}`, isDepotStop: true, name: depot.name, address: depot.address, tyres: depot.tyres, timing: depot.timing };
      if (depot.timing === 'before-first') routeItems = [depotItem, ...routeItems];
      else if (depot.timing === 'before-needed') {
        // Insert before the job that needs the depot tyre
        const needsDepotIdx = routeItems.findIndex(j => j.stockOnVan === false);
        if (needsDepotIdx > 0) routeItems.splice(needsDepotIdx, 0, depotItem);
        else routeItems = [depotItem, ...routeItems];
      }
    });

    const hasDepot = depotStops.length > 0;
    const totalDistance = coverJobInRoute && hasDepot ? '19.2 miles' : coverJobInRoute ? '16.8 miles' : hasDepot ? '15.1 miles' : '12.4 miles';
    const totalTime = coverJobInRoute && hasDepot ? '3h 30m' : coverJobInRoute ? '3h 05m' : hasDepot ? '2h 40m' : '2h 15m';

    return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.bg, paddingBottom: '100px' }}>
      <Toast />
      <Header title="Today's Route" />
      <div style={{ height: '200px', backgroundColor: theme.bgInput, position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Map size={48} color={theme.textMuted} /></div>
        <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px' }}>
          <div style={{ backgroundColor: theme.bgCard, borderRadius: '12px', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div><p style={{ margin: 0, color: theme.textMuted, fontSize: '12px' }}>Total Distance</p><p style={{ margin: 0, color: theme.text, fontWeight: '600' }}>{totalDistance}</p></div>
            <div><p style={{ margin: 0, color: theme.textMuted, fontSize: '12px' }}>Est. Time</p><p style={{ margin: 0, color: theme.text, fontWeight: '600' }}>{totalTime}</p></div>
            <Button size="small" fullWidth={false} icon={Navigation} onClick={() => showToast('Opening Google Maps...')}>Navigate</Button>
          </div>
        </div>
      </div>

      <div style={{ margin: '12px 16px 0', display: 'flex', gap: '8px' }}>
        <Button size="small" icon={RefreshCw} onClick={optimiseRouteOrder}>Optimise Route</Button>
      </div>

      {(coverJobInRoute || hasDepot) && (
        <div style={{ margin: '12px 16px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {coverJobInRoute && (
            <div style={{ padding: '10px 14px', backgroundColor: `${theme.primary}10`, borderRadius: '10px', border: `1px solid ${theme.primary}30`, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <RefreshCw size={16} color={theme.primary} />
              <p style={{ margin: 0, color: theme.primary, fontSize: '13px', fontWeight: '500' }}>Emergency cover job {routeInsertPosition === 'next' ? 'set as next job' : routeInsertPosition === 'optimise' ? 'optimised into route' : 'added to end'}</p>
            </div>
          )}
          {hasDepot && (
            <div style={{ padding: '10px 14px', backgroundColor: `${theme.warning}10`, borderRadius: '10px', border: `1px solid ${theme.warning}30`, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Building size={16} color={theme.warning} />
              <p style={{ margin: 0, color: theme.warning, fontSize: '13px', fontWeight: '500' }}>Depot pickup added — {depotStops[0]?.timing === 'before-first' ? 'before your first job' : 'before the job that needs it'}</p>
            </div>
          )}
        </div>
      )}

      <div style={{ padding: '16px' }}>
        {routeItems.map((item, i) => (
          item.isDepotStop ? (
            // DEPOT STOP CARD
            <Card key={item.id} style={{ borderColor: theme.warning, borderWidth: '2px' }}>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ width: '40px', height: '40px', backgroundColor: `${theme.warning}20`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Building size={20} color={theme.warning} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <h3 style={{ margin: 0, color: theme.text, fontWeight: '600' }}>{item.name}</h3>
                      <Badge variant="warning">DEPOT PICKUP</Badge>
                    </div>
                    <span style={{ color: theme.warning, fontWeight: '500' }}>~10 mins</span>
                  </div>
                  <p style={{ margin: '0 0 4px 0', color: theme.textMuted, fontSize: '14px' }}>{item.address}</p>
                  <div style={{ padding: '8px', backgroundColor: theme.bgInput, borderRadius: '8px', marginTop: '6px' }}>
                    <p style={{ margin: '0 0 4px 0', color: theme.textMuted, fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>Collecting</p>
                    {item.tyres.map((t, ti) => (
                      <div key={ti} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '2px 0' }}>
                        <Package size={12} color={theme.primary} />
                        <span style={{ color: theme.text, fontSize: '13px' }}>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '16px', borderTop: `1px solid ${theme.border}`, paddingTop: '12px' }}>
                <Button variant="secondary" size="small" fullWidth icon={X} onClick={() => { setDepotStops(prev => prev.filter(d => d.id !== item.id?.toString().replace('depot-', ''))); showToast('Depot stop removed'); }}>Remove Stop</Button>
                <Button size="small" fullWidth icon={Navigation} onClick={() => showToast('Opening Google Maps...')}>Navigate</Button>
              </div>
            </Card>
          ) : (
            // REGULAR JOB CARD
            <div
              key={item.id}
              draggable={!item.isCoverJob}
              onDragStart={() => setDragJobId(item.id)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => dropJobAt(item.id)}
            >
            <Card style={item.isCoverJob ? { borderColor: theme.danger, borderWidth: '2px' } : item.isEmergency ? { borderColor: theme.warning, borderWidth: '2px' } : {}}>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ width: '40px', height: '40px', backgroundColor: item.isCoverJob ? `${theme.danger}20` : item.isEmergency ? `${theme.warning}20` : `${theme.primary}20`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {item.isCoverJob ? <ShieldCheck size={20} color={theme.danger} /> : <span style={{ fontWeight: '700', color: item.isEmergency ? theme.warning : theme.primary }}>{i + 1}</span>}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <h3 style={{ margin: 0, color: theme.text, fontWeight: '600' }}>{item.customer}</h3>
                      {item.isCoverJob && <Badge variant="danger">COVER JOB</Badge>}
                      {item.isEmergency && !item.isCoverJob && <Badge variant="warning">URGENT</Badge>}
                    </div>
                    <span style={{ color: item.isCoverJob ? theme.danger : item.isEmergency ? theme.warning : theme.primary, fontWeight: '500' }}>{item.eta}</span>
                  </div>
                  <p style={{ margin: '0 0 4px 0', color: theme.textMuted, fontSize: '14px' }}>{item.plate} • {item.tyreSize}</p>
                  <p style={{ margin: '0 0 8px 0', color: theme.textSubtle, fontSize: '14px' }}>{item.location}</p>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {item.isCoverJob ? (
                      <Badge variant="info">TYRE-FIT Pays</Badge>
                    ) : (
                      <Badge variant={item.depositPaid ? 'success' : 'warning'}>{item.depositPaid ? 'Deposit Paid' : 'Awaiting Deposit'}</Badge>
                    )}
                    <Badge variant={item.stockOnVan ? 'success' : 'info'}>{item.stockOnVan ? 'On Van' : `At ${item.depot}`}</Badge>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '16px', borderTop: `1px solid ${theme.border}`, paddingTop: '12px' }}>
                {!item.isCoverJob && <span style={{ alignSelf: 'center', fontSize: '12px', color: theme.textMuted }}>Drag card to reorder</span>}
                <Button variant="secondary" size="small" fullWidth icon={MessageSquare} onClick={() => showToast('Opening WhatsApp...')}>Message</Button>
                <Button size="small" fullWidth disabled={!item.depositPaid && !item.isCoverJob && !item.isEmergency} onClick={() => { setActiveJob(item); setIsCoverJob(!!item.isCoverJob); setBeforePhotos({}); setAfterPhotos({}); setCustomerSigned(false); navigateTo('job-enroute'); }}>{item.isCoverJob ? 'Start Cover Job' : item.depositPaid ? 'Start Job' : item.isEmergency ? 'Start Urgent Job' : 'Awaiting Deposit'}</Button>
              </div>
            </Card>
            </div>
          )
        ))}
      </div>
      <BottomNav />
    </div>
    );
  };

  // ============================================
  // ACTIVE JOB FLOW
  // ============================================
  const JobEnRouteScreen = () => {
    const [customPostcode, setCustomPostcode] = useState('');
    const [pendingMessage, setPendingMessage] = useState(null); // {text, type}
    const jobLocation = activeJob?.location || '45 High Street, E1 4QJ';
    const navAddress = customPostcode || jobLocation;
    // Simulate GPS auto-arrival after 3 seconds for demo
    const [arrived, setArrived] = useState(false);
    const [autoAdvancing, setAutoAdvancing] = useState(false);
    
    useEffect(() => {
      const timer = setTimeout(() => setArrived(true), 5000);
      return () => clearTimeout(timer);
    }, []);

    // SMART: Auto-open preferred map on load
    useEffect(() => {
      if (preferredMap) {
        openPreferredMap(activeJob?.location);
      }
    }, []);

    // SMART: Auto-advance to before photos when GPS detects arrival
    useEffect(() => {
      if (arrived && !autoAdvancing) {
        setAutoAdvancing(true);
        showToast("You've arrived — camera opening...");
        const timer = setTimeout(() => navigateTo('job-before-photo'), 2000);
        return () => clearTimeout(timer);
      }
    }, [arrived]);
    
    return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.bg, padding: '24px', display: 'flex', flexDirection: 'column' }}>
      <Toast />
      <Header title="En Route" subtitle={`${activeJob?.customer || 'Emma Davis'} • ${activeJob?.plate || 'CD90 VWX'}`} />
      <div style={{ flex: 1 }}>
        
        {/* OFFLINE WARNING */}
        {isOffline && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', backgroundColor: `${theme.warning}10`, borderRadius: '10px', marginBottom: '12px', border: `1px solid ${theme.warning}30` }}>
            <NoWifi size={16} color={theme.warning} />
            <span style={{ color: theme.warning, fontSize: '13px', fontWeight: '500' }}>Saved — will sync when online. GPS tracking paused until signal returns.</span>
          </div>
        )}
        
        {/* DESTINATION + ETA */}
        <Card style={{ marginBottom: '12px' }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: theme.textMuted, margin: '0 0 4px 0', fontSize: '13px' }}>Destination</p>
            <p style={{ color: theme.text, fontWeight: '600', margin: '0 0 8px 0', fontSize: '16px' }}>{jobLocation}</p>
            <p style={{ color: theme.primary, fontWeight: '700', fontSize: '28px', margin: 0 }}>ETA: {activeJob?.eta || '12 mins'}</p>
          </div>
        </Card>
        
        {/* AUTO ETA NOTIFICATION — so fitter knows the customer has been told */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', backgroundColor: `${theme.primary}10`, borderRadius: '10px', marginBottom: '12px', border: `1px solid ${theme.primary}20` }}>
          <CheckCircle size={16} color={theme.primary} />
          <span style={{ color: theme.primary, fontSize: '13px', fontWeight: '500' }}>"{activeJob?.customer || 'Emma'} your fitter is {activeJob?.eta || '12 mins'} away" sent automatically</span>
        </div>
        
        {/* CUSTOM POSTCODE — for when address is wrong or fitter knows a better route */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input value={customPostcode} onChange={(e) => setCustomPostcode(e.target.value.toUpperCase())} placeholder="Enter postcode (optional)" style={{ flex: 1, padding: '14px', backgroundColor: theme.bgInput, border: `1px solid ${theme.border}`, borderRadius: '12px', fontSize: '16px', color: theme.text, outline: 'none', textTransform: 'uppercase', letterSpacing: '1px' }} />
            {customPostcode && (
              <button onClick={() => setCustomPostcode('')} style={{ padding: '14px', backgroundColor: theme.bgInput, border: `1px solid ${theme.border}`, borderRadius: '12px', cursor: 'pointer' }}>
                <X size={18} color={theme.textMuted} />
              </button>
            )}
          </div>
          {customPostcode && <p style={{ margin: '6px 0 0 0', color: theme.primary, fontSize: '12px' }}>Using custom postcode for navigation</p>}
        </div>
        
        {/* NAVIGATE — Google Maps only
            DEV NOTE: Single map integration. Google Maps is already used for route optimisation, 
            Places API, and distance matrix. No need for Apple Maps or what3words — it would triple
            the integration work for minimal benefit. Every fitter has Google Maps. */}
        <div style={{ marginBottom: '16px' }}>
          <button onClick={() => { showToast('Opening Google Maps...'); if (!arrived) setArrived(true); }} style={{ width: '100%', padding: '18px', backgroundColor: theme.primary, border: 'none', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <Navigation size={24} color="#000" />
            <span style={{ color: '#000', fontWeight: '700', fontSize: '16px' }}>Navigate (Google Maps)</span>
          </button>
        </div>

        <div style={{ marginBottom: '12px' }}>
          <Button onClick={() => navigateTo('job-before-photo')} icon={ArrowRight} fullWidth>
            Next: Before Photos
          </Button>
          <p style={{ margin: '6px 0 0 0', color: theme.textMuted, fontSize: '12px', textAlign: 'center' }}>
            Use this if you are already with the customer.
          </p>
        </div>
        
        {/* CONTACT CUSTOMER — only for edge cases GPS can't handle */}
        <p style={{ color: theme.textMuted, fontSize: '12px', margin: '0 0 8px 0', textTransform: 'uppercase', fontWeight: '600', letterSpacing: '0.5px' }}>Contact customer</p>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
          <button onClick={() => showToast('Calling customer...')} style={{ flex: 1, padding: '14px', backgroundColor: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <Phone size={18} color={theme.text} />
            <span style={{ color: theme.text, fontWeight: '500', fontSize: '14px' }}>Call</span>
          </button>
          <button onClick={() => setPendingMessage({ text: `Hi ${activeJob?.customer || 'Emma'}, just a heads up — running about 10 mins late. Sorry for the wait, on my way now.`, type: 'late' })} style={{ flex: 1, padding: '14px', backgroundColor: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <Clock size={18} color={theme.warning} />
            <span style={{ color: theme.text, fontWeight: '500', fontSize: '14px' }}>Running Late</span>
          </button>
          <button onClick={() => setPendingMessage({ text: `Hi ${activeJob?.customer || 'Emma'}, I'm nearby but can't find the exact address — could you share a pin or come out and wave?`, type: 'lost' })} style={{ flex: 1, padding: '14px', backgroundColor: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <MapPin size={18} color={theme.danger} />
            <span style={{ color: theme.text, fontWeight: '500', fontSize: '14px' }}>{"Can't Find"}</span>
          </button>
        </div>
        <p style={{ color: theme.textMuted, fontSize: '11px', margin: '0 0 16px 0', textAlign: 'center' }}>ETA and arrival texts are sent automatically by GPS — no need to message manually</p>
        
        {/* AUTO-ARRIVAL — auto-advances to camera */}
        {arrived && (
          <div style={{ padding: '16px', backgroundColor: `${theme.primary}10`, borderRadius: '12px', border: `2px solid ${theme.primary}`, marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: theme.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MapPin size={20} color="#000" />
              </div>
              <div>
                <p style={{ margin: 0, color: theme.primary, fontWeight: '700', fontSize: '16px' }}>You've arrived</p>
                <p style={{ margin: '2px 0 0 0', color: theme.textMuted, fontSize: '13px' }}>Opening camera automatically...</p>
              </div>
            </div>
            <Button onClick={() => navigateTo('job-before-photo')} icon={Camera} fullWidth>Open Camera Now</Button>
          </div>
        )}

        {/* GPS INFO */}
        {!arrived && (
          <div style={{ padding: '10px 14px', backgroundColor: theme.bgInput, borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Crosshair size={14} color={theme.textMuted} />
            <span style={{ color: theme.textMuted, fontSize: '12px' }}>GPS will detect when you arrive and prompt before photos</span>
          </div>
        )}
        <CancelJobButton />

        {/* MESSAGE PREVIEW MODAL — always preview before sending */}
        {pendingMessage && (
          <Modal title="Preview Message" onClose={() => setPendingMessage(null)}>
            <p style={{ margin: '0 0 4px 0', color: theme.textMuted, fontSize: '12px' }}>To: {activeJob?.customer || 'Emma'} ({activeJob?.phone || '07700 900123'})</p>
            <div style={{ padding: '14px', backgroundColor: theme.bgInput, borderRadius: '10px', border: `1px solid ${theme.border}`, marginBottom: '16px' }}>
              <p style={{ margin: 0, color: theme.text, fontSize: '14px', lineHeight: 1.6, fontStyle: 'italic' }}>{pendingMessage.text}</p>
            </div>
            <p style={{ margin: '0 0 16px 0', color: theme.textMuted, fontSize: '12px' }}>Sent via {preferredSend === 'whatsapp' ? 'WhatsApp' : 'SMS'}</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button variant="secondary" onClick={() => setPendingMessage(null)} fullWidth>Cancel</Button>
              <Button onClick={() => { showToast(`Message sent to ${activeJob?.customer || 'Emma'}`); setPendingMessage(null); }} fullWidth icon={MessageSquare}>Send</Button>
            </div>
          </Modal>
        )}
      </div>
    </div>
    );
  };

  const JobBeforePhotoScreen = () => {
    const positions = ['Front Left', 'Front Right', 'Rear Left', 'Rear Right'];
    const allTaken = positions.every(p => beforePhotos[p]);
    const [advancing, setAdvancing] = useState(false);

    useEffect(() => {
      setConditionPassed(true);
    }, []);

    // SMART: Auto-advance when all photos taken
    useEffect(() => {
      if (allTaken && !advancing) {
        setAdvancing(true);
        showToast('All photos taken — condition check opening...');
        const timer = setTimeout(() => navigateTo('job-condition-check'), 1500);
        return () => clearTimeout(timer);
      }
    }, [allTaken]);
    
    return (
      <div style={{ minHeight: '100vh', backgroundColor: theme.bg, padding: '24px', display: 'flex', flexDirection: 'column' }}>
        <Toast />
        <Header title="Before Photos" subtitle={`All 4 tyres — ${activeJob?.plate || 'CD90 VWX'}`} />
        <ProgressSteps steps={['Arrive', 'Before', 'Condition', 'Payment']} currentStep={1} />
        <div style={{ flex: 1, paddingTop: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <Shield size={18} color="#8b5cf6" />
            <p style={{ margin: 0, color: theme.textMuted, fontSize: '14px' }}>Photograph each tyre <strong style={{ color: theme.text }}>before</strong> you start — this protects you from disputes</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: positions.length <= 2 ? '1fr 1fr' : '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
            {positions.map((pos) => {
              const taken = beforePhotos[pos];
              return (
                <button key={pos} onClick={() => { setBeforePhotos(prev => ({...prev, [pos]: true})); showToast(`${pos} — photo captured`); }} style={{ aspectRatio: positions.length <= 2 ? '4/3' : '1', backgroundColor: taken ? `${theme.primary}10` : theme.bgInput, border: `2px ${taken ? 'solid' : 'dashed'} ${taken ? theme.primary : theme.border}`, borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer', color: taken ? theme.primary : theme.textMuted, position: 'relative', padding: '12px' }}>
                  {taken && <div style={{ position: 'absolute', top: '8px', right: '8px', width: '22px', height: '22px', borderRadius: '50%', backgroundColor: theme.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Check size={14} color="#000" /></div>}
                  <Camera size={positions.length <= 2 ? 28 : 24} />
                  <span style={{ fontSize: '13px', fontWeight: '600' }}>{pos}</span>
                  <span style={{ fontSize: '11px', color: taken ? theme.primary : theme.textMuted }}>{taken ? 'Tap to retake' : 'Tap to capture'}</span>
                </button>
              );
            })}
          </div>
          
          <div style={{ padding: '12px 16px', backgroundColor: theme.bgInput, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ color: theme.textMuted, fontSize: '14px' }}>{Object.keys(beforePhotos).filter(k => beforePhotos[k]).length} of {positions.length} photos taken</span>
            <div style={{ display: 'flex', gap: '4px' }}>
              {positions.map((p, i) => <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: beforePhotos[p] ? theme.primary : theme.border }} />)}
            </div>
          </div>
          
          <Card style={{ backgroundColor: `#8b5cf608`, borderColor: '#8b5cf630' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <MapPin size={16} color="#8b5cf6" />
              <span style={{ color: theme.textMuted, fontSize: '13px' }}>GPS location and timestamp recorded with each photo</span>
            </div>
          </Card>
        </div>
        <Button onClick={() => navigateTo('job-condition-check')} icon={ArrowRight} disabled={!allTaken}>{advancing ? 'Opening Condition Check...' : allTaken ? 'Condition Report →' : `Take All ${positions.length} Photos to Continue`}</Button>
        {!allTaken && <button onClick={() => setShowSkipPhotosWarning(true)} style={{ width: '100%', padding: '14px', backgroundColor: 'transparent', border: 'none', color: theme.textMuted, fontSize: '14px', cursor: 'pointer', marginTop: '8px' }}>Skip photos this time</button>}
        
        {showSkipPhotosWarning && (
          <Modal title="Skip Photos?" onClose={() => setShowSkipPhotosWarning(false)}>
            <div style={{ display: 'flex', gap: '12px', padding: '16px', backgroundColor: `${theme.danger}10`, borderRadius: '10px', marginBottom: '16px' }}>
              <AlertTriangle size={24} color={theme.danger} style={{ flexShrink: 0 }} />
              <div>
                <p style={{ margin: '0 0 8px 0', color: theme.text, fontWeight: '600' }}>No dispute protection</p>
                <p style={{ margin: 0, color: theme.textMuted, fontSize: '14px', lineHeight: 1.5 }}>You will not be protected against disputes. Without before photos, you'll have <strong style={{ color: theme.danger }}>no evidence</strong> if the customer complains.</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Button variant="secondary" onClick={() => setShowSkipPhotosWarning(false)} fullWidth>Go Back</Button>
              <button onClick={() => { setShowSkipPhotosWarning(false); navigateTo('job-condition-check'); }} style={{ flex: 1, padding: '14px', backgroundColor: theme.danger, border: 'none', borderRadius: '12px', color: '#fff', fontWeight: '600', cursor: 'pointer' }}>Skip Anyway</button>
            </div>
          </Modal>
        )}
      </div>
    );
  };

  // Work In Progress screen REMOVED — fitter goes straight from Before Photos to Tyre Safety Check
  // Sign-off screen REMOVED — before/after photos are the evidence

  const JobAfterPhotoScreen = () => {
    const allPositions = ['Front Left', 'Front Right', 'Rear Left', 'Rear Right'];
    const [tyres, setTyres] = useState({ 'Front Left': null, 'Front Right': null, 'Rear Left': null, 'Rear Right': null });
    const [openTyre, setOpenTyre] = useState(null);
    const [showReport, setShowReport] = useState(false);
    const [cameraOverlay, setCameraOverlay] = useState(null);

    const minorDamage = ['Scuff / cosmetic', 'Minor kerb rash', 'Light surface crack'];
    const seriousDamage = ['Bulge', 'Deep cut / slice', 'Cracking (structural)', 'Sidewall damage', 'Puncture', 'Exposed cord'];
    const scannedCount = Object.values(tyres).filter(t => t !== null).length;
    const allScanned = scannedCount === 4;
    const isCov = (t) => { if (!t) return false; if (t.legalStatus === 'illegal') return false; if (t.damages.some(d => seriousDamage.includes(d))) return false; return true; };
    const hasFailedCondition = Object.values(tyres).some(t => t && !isCov(t));

    // SMART: Auto-advance when all 4 tyres scanned (2s delay to see summary)
    const [autoAdvanceReady, setAutoAdvanceReady] = useState(false);
    useEffect(() => {
      if (allScanned && !autoAdvanceReady && !openTyre) {
        setAutoAdvanceReady(true);
        const pass = !hasFailedCondition;
        setConditionPassed(pass);
        const msg = pass ? 'All 4 legal — cover eligible. Moving to payment...' : 'Condition failed — no cover. Moving to payment...';
        showToast(msg);
        const timer = setTimeout(() => navigateTo(isCoverJob ? 'cover-job-complete' : 'job-payment'), 2500);
        return () => clearTimeout(timer);
      }
    }, [allScanned, openTyre, hasFailedCondition]);

    const takePhoto = (pos) => setCameraOverlay(pos);
    const [blurWarning, setBlurWarning] = useState(null);
    const confirmPhoto = (pos) => {
      // Simulate blur detection — 20% chance of blur warning (prototype demo)
      if (Math.random() < 0.2 && !blurWarning) {
        setBlurWarning(pos);
        return;
      }
      setBlurWarning(null);
      setCameraOverlay(null);
      setAfterPhotos(prev => ({ ...prev, [pos]: true }));
      if (tyres[pos] === null) {
        setTyres(prev => ({ ...prev, [pos]: { size: activeJob?.tyreSize || '205/55R16', brand: 'Continental', dot: '2024', treadStatus: 'good', legalStatus: 'legal', damages: [], notes: '' } }));
      }
      setOpenTyre(pos);
    };
    const forceAcceptBlur = (pos) => {
      setBlurWarning(null);
      setCameraOverlay(null);
      setAfterPhotos(prev => ({ ...prev, [pos]: true }));
      if (tyres[pos] === null) {
        setTyres(prev => ({ ...prev, [pos]: { size: activeJob?.tyreSize || '205/55R16', brand: 'Continental', dot: '2024', treadStatus: 'good', legalStatus: 'legal', damages: [], notes: '' } }));
      }
      setOpenTyre(pos);
    };
    const updateT = (pos, field, value) => setTyres(prev => ({ ...prev, [pos]: { ...prev[pos], [field]: value } }));
    const toggleDmg = (pos, damage) => {
      setTyres(prev => { const cur = prev[pos].damages || []; const has = cur.includes(damage); return { ...prev, [pos]: { ...prev[pos], damages: has ? cur.filter(d => d !== damage) : [...cur, damage] } }; });
    };
    const toggleOpen = (pos) => setOpenTyre(prev => prev === pos ? null : pos);
    const getCol = (t) => { if (!t) return theme.border; if (!isCov(t)) return theme.danger; if (t.damages.length > 0) return theme.warning; return theme.primary; };
    const treadLabels = { good: 'Good tread', worn: 'Worn — near limit', illegal: 'Below legal limit' };
    const getSum = (t) => { if (!t) return ''; const p = [t.legalStatus === 'legal' ? 'Legal' : 'Illegal']; if (t.damages.length > 0) p.push(t.damages.length + ' issue' + (t.damages.length > 1 ? 's' : '')); p.push(treadLabels[t.treadStatus] || 'Good tread'); return p.join(' · '); };
    const getCovLbl = (t) => { if (!t) return ''; if (t.legalStatus === 'illegal') return 'Excluded — illegal'; if (t.damages.some(d => seriousDamage.includes(d))) return 'Excluded — serious damage'; if (t.damages.length > 0) return 'Covered — minor damage noted'; return 'Covered'; };

    return (
      <div style={{ minHeight: '100vh', backgroundColor: theme.bg, color: theme.text }}>
        {/* CAMERA OVERLAY */}
        {cameraOverlay && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px' }}>
            <div style={{ width: '260px', height: '260px', border: '3px solid rgba(255,255,255,0.3)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-1px', left: '30%', right: '30%', height: '3px', backgroundColor: theme.primary, borderRadius: '2px' }} />
              <div style={{ position: 'absolute', bottom: '-1px', left: '30%', right: '30%', height: '3px', backgroundColor: theme.primary, borderRadius: '2px' }} />
              <div style={{ position: 'absolute', left: '-1px', top: '30%', bottom: '30%', width: '3px', backgroundColor: theme.primary, borderRadius: '2px' }} />
              <div style={{ position: 'absolute', right: '-1px', top: '30%', bottom: '30%', width: '3px', backgroundColor: theme.primary, borderRadius: '2px' }} />
              <Camera size={48} color="rgba(255,255,255,0.4)" />
            </div>
            <h2 style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: '700', textAlign: 'center', color: '#fff' }}>Photograph {cameraOverlay}</h2>
            <div style={{ maxWidth: '300px', width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '12px' }}>
                <Check size={18} color="#2ecc71" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ color: '#ccc', fontSize: '14px', lineHeight: 1.5 }}>Get the <strong style={{ color: '#fff' }}>whole tyre and wheel</strong> in frame</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '12px' }}>
                <Check size={18} color="#2ecc71" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ color: '#ccc', fontSize: '14px', lineHeight: 1.5 }}>Make sure the <strong style={{ color: '#fff' }}>sidewall text is visible</strong> (size, brand, DOT)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '12px' }}>
                <Check size={18} color="#2ecc71" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ color: '#ccc', fontSize: '14px', lineHeight: 1.5 }}>Make sure {"it’s"} <strong style={{ color: '#fff' }}>well lit</strong> — use phone torch if needed</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '12px' }}>
                <Check size={18} color="#2ecc71" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ color: '#ccc', fontSize: '14px', lineHeight: 1.5 }}>Include the <strong style={{ color: '#fff' }}>tread surface</strong> so wear is visible</span>
              </div>
            </div>
            <button onClick={() => confirmPhoto(cameraOverlay)} style={{ width: '100%', maxWidth: '300px', padding: '18px', borderRadius: '14px', border: 'none', backgroundColor: theme.primary, color: '#000', fontSize: '17px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <Camera size={22} color="#000" /> Take Photo
            </button>
            <button onClick={() => setCameraOverlay(null)} style={{ marginTop: '12px', background: 'none', border: 'none', color: '#ccc', fontSize: '15px', cursor: 'pointer', padding: '10px' }}>Cancel</button>
            
            {/* BLUR WARNING */}
            {blurWarning && (
              <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
                <div style={{ maxWidth: '340px', width: '100%', backgroundColor: '#1a1a1a', borderRadius: '16px', padding: '24px', border: `2px solid ${theme.warning}` }}>
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <AlertTriangle size={40} color={theme.warning} style={{ marginBottom: '8px' }} />
                    <h3 style={{ margin: '0 0 4px 0', color: '#fff', fontSize: '18px', fontWeight: '700' }}>Photo looks blurry</h3>
                    <p style={{ margin: 0, color: '#aaa', fontSize: '13px', lineHeight: 1.5 }}>Blurry photos weaken your dispute evidence and the OCR may not read the sidewall. Retake for a sharper image.</p>
                  </div>
                  <button onClick={() => { setBlurWarning(null); }} style={{ width: '100%', padding: '14px', borderRadius: '10px', border: 'none', backgroundColor: theme.primary, color: '#000', fontSize: '15px', fontWeight: '700', cursor: 'pointer', marginBottom: '8px' }}>Retake Photo</button>
                  <button onClick={() => forceAcceptBlur(blurWarning)} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #444', backgroundColor: 'transparent', color: '#aaa', fontSize: '14px', cursor: 'pointer' }}>Use anyway</button>
                </div>
              </div>
            )}
          </div>
        )}

        <div style={{ padding: '24px', paddingBottom: '100px' }}>
          <Toast />
          <Header title="Tyre Condition Report" subtitle={activeJob?.plate || 'CD90 VWX'} />
          <ProgressSteps steps={['Arrive', 'Before', 'Condition', 'Payment']} currentStep={2} />
          <div style={{ paddingTop: '12px' }}>
            <Card style={{ marginBottom: '16px', backgroundColor: `${theme.primary}10`, borderColor: `${theme.primary}30` }}>
              <p style={{ margin: '0 0 6px 0', color: theme.text, fontWeight: '700', fontSize: '14px' }}>Why photograph all 4 tyres?</p>
              <p style={{ margin: 0, color: theme.textMuted, fontSize: '13px', lineHeight: 1.6 }}>AI reads size, brand and DOT from your photo — check {"it's"} right and report the condition. This creates the condition report, activates 30-day cover, and is your proof if {"there's"} a dispute.</p>
            </Card>

            {allPositions.map(pos => {
              const t = tyres[pos];
              const isScanned = t !== null;
              const isOpen = openTyre === pos;
              const color = getCol(t);
              return (
                <div key={pos} style={{ marginBottom: '10px' }}>
                  {!isScanned ? (
                    <button onClick={() => takePhoto(pos)} style={{ width: '100%', padding: '18px 16px', backgroundColor: theme.bgInput, border: `2px dashed ${theme.border}`, borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '14px', color: theme.text }}>
                      <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: theme.bgCard, border: `1px solid ${theme.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Camera size={22} color={theme.textMuted} /></div>
                      <div style={{ textAlign: 'left' }}><p style={{ margin: 0, fontWeight: '600', fontSize: '15px', color: theme.text }}>{pos}</p><p style={{ margin: '2px 0 0 0', color: theme.textMuted, fontSize: '13px' }}>Tap to photograph</p></div>
                    </button>
                  ) : (
                    <div style={{ backgroundColor: theme.bgCard, border: `2px solid ${color}`, borderRadius: '12px', overflow: 'hidden' }}>
                      <div onClick={() => toggleOpen(pos)} style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ color: isCov(t) ? '#000' : '#fff', fontWeight: '700', fontSize: '13px' }}>{isCov(t) ? 'Y' : 'N'}</span></div>
                          <div><p style={{ margin: 0, fontWeight: '600', fontSize: '15px', color: theme.text }}>{pos}</p><p style={{ margin: '2px 0 0 0', fontSize: '12px', color, fontWeight: '600' }}>{getSum(t)} · {t.size}</p></div>
                        </div>
                        <ChevronRight size={20} color={theme.textMuted} style={{ transform: isOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
                      </div>
                      {isOpen && (
                        <div style={{ padding: '0 16px 16px', borderTop: `1px solid ${theme.border}` }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '14px', marginBottom: '8px' }}>
                            <p style={{ margin: 0, color: theme.textMuted, fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '0.5px' }}>AI Reading</p>
                            <span style={{ fontSize: '11px', color: theme.info, fontWeight: '600' }}>Tap any field to correct</span>
                          </div>
                          <div style={{ padding: '10px 12px', backgroundColor: `${theme.info}08`, borderRadius: '8px', border: `1px solid ${theme.info}20`, marginBottom: '10px' }}>
                            <p style={{ margin: 0, color: theme.textMuted, fontSize: '12px', lineHeight: 1.5 }}>Read automatically from your photo. <strong style={{ color: theme.text }}>If anything is wrong, tap the field and type the correct value.</strong></p>
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                            <div><label style={{ display: 'block', fontSize: '11px', color: theme.textMuted, marginBottom: '4px', fontWeight: '600' }}>Size</label><input value={t.size} onChange={e => updateT(pos, 'size', e.target.value)} style={{ width: '100%', padding: '12px', backgroundColor: theme.bgInput, border: `1px solid ${theme.border}`, borderRadius: '10px', color: theme.text, fontSize: '16px', fontWeight: '600', outline: 'none', boxSizing: 'border-box' }} /></div>
                            <div><label style={{ display: 'block', fontSize: '11px', color: theme.textMuted, marginBottom: '4px', fontWeight: '600' }}>Brand</label><input value={t.brand} onChange={e => updateT(pos, 'brand', e.target.value)} style={{ width: '100%', padding: '12px', backgroundColor: theme.bgInput, border: `1px solid ${theme.border}`, borderRadius: '10px', color: theme.text, fontSize: '16px', outline: 'none', boxSizing: 'border-box' }} /></div>
                          </div>
                          <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '11px', color: theme.textMuted, marginBottom: '4px', fontWeight: '600' }}>DOT Code (year of manufacture)</label>
                            <input value={t.dot} onChange={e => updateT(pos, 'dot', e.target.value)} style={{ width: '100%', padding: '12px', backgroundColor: theme.bgInput, border: `1px solid ${theme.border}`, borderRadius: '10px', color: theme.text, fontSize: '16px', outline: 'none', boxSizing: 'border-box' }} />
                          </div>

                          <p style={{ margin: '0 0 8px 0', color: theme.textMuted, fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '0.5px' }}>Tread condition (visual check)</p>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px' }}>
                            {[
                              { id: 'good', label: 'Good tread', sub: 'Tread bars not visible — plenty of life left', col: theme.primary, bars: [1,1,1,1,1] },
                              { id: 'worn', label: 'Worn — approaching limit', sub: 'Tread bars becoming visible — needs replacing soon', col: theme.warning, bars: [1,1,0.5,0,0] },
                              { id: 'illegal', label: 'Illegal — at or below limit', sub: 'Tread bars flush with surface or bald', col: theme.danger, bars: [0.3,0,0,0,0] }
                            ].map(opt => (
                              <button key={opt.id} onClick={() => {
                                updateT(pos, 'treadStatus', opt.id);
                                updateT(pos, 'legalStatus', opt.id === 'illegal' ? 'illegal' : 'legal');
                              }} style={{ width: '100%', padding: '12px 14px', backgroundColor: t.treadStatus === opt.id ? `${opt.col}12` : theme.bgInput, border: `2px solid ${t.treadStatus === opt.id ? opt.col : theme.border}`, borderRadius: '12px', cursor: 'pointer', textAlign: 'left', color: theme.text }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: t.treadStatus === opt.id ? opt.col : theme.border, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{t.treadStatus === opt.id && <Check size={14} color={opt.id === 'good' ? '#000' : '#fff'} />}</div>
                                  <span style={{ fontWeight: t.treadStatus === opt.id ? '700' : '500', color: t.treadStatus === opt.id ? opt.col : theme.text, fontSize: '14px' }}>{opt.label}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '32px' }}>
                                  <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end' }}>{opt.bars.map((h, i) => (<div key={i} style={{ width: '4px', height: `${Math.max(4, h * 16)}px`, backgroundColor: opt.col, borderRadius: '1px', opacity: h > 0 ? (t.treadStatus === opt.id ? 1 : 0.4) : 0.15 }} />))}</div>
                                  <span style={{ fontSize: '11px', color: theme.textMuted, lineHeight: 1.4 }}>{opt.sub}</span>
                                </div>
                              </button>
                            ))}
                          </div>

                          <p style={{ margin: '0 0 8px 0', color: theme.textMuted, fontSize: '11px', textTransform: 'uppercase', fontWeight: '700' }}>Legal status</p>
                          <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
                            <button onClick={() => updateT(pos, 'legalStatus', 'legal')} style={{ flex: 1, padding: '14px', backgroundColor: t.legalStatus === 'legal' ? `${theme.primary}15` : theme.bgInput, border: `2px solid ${t.legalStatus === 'legal' ? theme.primary : theme.border}`, borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: theme.text }}>
                              <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: t.legalStatus === 'legal' ? theme.primary : theme.border, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{t.legalStatus === 'legal' && <Check size={14} color="#000" />}</div>
                              <span style={{ fontWeight: t.legalStatus === 'legal' ? '700' : '400', color: t.legalStatus === 'legal' ? theme.primary : theme.text, fontSize: '15px' }}>Legal</span>
                            </button>
                            <button onClick={() => updateT(pos, 'legalStatus', 'illegal')} style={{ flex: 1, padding: '14px', backgroundColor: t.legalStatus === 'illegal' ? `${theme.danger}15` : theme.bgInput, border: `2px solid ${t.legalStatus === 'illegal' ? theme.danger : theme.border}`, borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: theme.text }}>
                              <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: t.legalStatus === 'illegal' ? theme.danger : theme.border, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{t.legalStatus === 'illegal' && <Check size={14} color="#fff" />}</div>
                              <span style={{ fontWeight: t.legalStatus === 'illegal' ? '700' : '400', color: t.legalStatus === 'illegal' ? theme.danger : theme.text, fontSize: '15px' }}>Illegal</span>
                            </button>
                          </div>

                          <p style={{ margin: '0 0 6px 0', color: theme.textMuted, fontSize: '11px', textTransform: 'uppercase', fontWeight: '700' }}>Any damage? (select all that apply)</p>
                          <p style={{ margin: '0 0 8px 0', color: theme.textMuted, fontSize: '11px' }}>Minor = still covered · Serious = excluded from cover</p>
                          <p style={{ margin: '0 0 6px 0', color: theme.warning, fontSize: '10px', textTransform: 'uppercase', fontWeight: '700' }}>Minor (still covered)</p>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
                            {minorDamage.map(d => { const sel = t.damages.includes(d); return (<button key={d} onClick={() => toggleDmg(pos, d)} style={{ padding: '8px 12px', backgroundColor: sel ? `${theme.warning}15` : theme.bgInput, border: `1.5px solid ${sel ? theme.warning : theme.border}`, borderRadius: '20px', cursor: 'pointer', fontSize: '12px', fontWeight: sel ? '700' : '400', color: sel ? theme.warning : theme.text }}>{d}</button>); })}
                          </div>
                          <p style={{ margin: '0 0 6px 0', color: theme.danger, fontSize: '10px', textTransform: 'uppercase', fontWeight: '700' }}>Serious (excluded from cover)</p>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
                            {seriousDamage.map(d => { const sel = t.damages.includes(d); return (<button key={d} onClick={() => toggleDmg(pos, d)} style={{ padding: '8px 12px', backgroundColor: sel ? `${theme.danger}15` : theme.bgInput, border: `1.5px solid ${sel ? theme.danger : theme.border}`, borderRadius: '20px', cursor: 'pointer', fontSize: '12px', fontWeight: sel ? '700' : '400', color: sel ? theme.danger : theme.text }}>{d}</button>); })}
                          </div>

                          <div style={{ marginBottom: '12px' }}><label style={{ display: 'block', fontSize: '11px', color: theme.textMuted, marginBottom: '4px', textTransform: 'uppercase', fontWeight: '700' }}>Notes (optional)</label><input value={t.notes} onChange={e => updateT(pos, 'notes', e.target.value)} placeholder="e.g. nail found, uneven wear" style={{ width: '100%', padding: '12px', backgroundColor: theme.bgInput, border: `1px solid ${theme.border}`, borderRadius: '10px', color: theme.text, fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} /></div>
                          <div style={{ padding: '10px 12px', borderRadius: '8px', backgroundColor: isCov(t) ? `${theme.primary}10` : `${theme.danger}10`, border: `1px solid ${isCov(t) ? `${theme.primary}30` : `${theme.danger}30`}` }}><span style={{ fontSize: '12px', fontWeight: '700', color: isCov(t) ? theme.primary : theme.danger }}>{getCovLbl(t)}</span></div>
                          <button onClick={() => takePhoto(pos)} style={{ width: '100%', padding: '10px', marginTop: '10px', backgroundColor: 'transparent', border: `1px solid ${theme.border}`, borderRadius: '10px', cursor: 'pointer', color: theme.textMuted, fontSize: '13px', textAlign: 'center' }}>Retake photo</button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {allScanned && hasFailedCondition && (<div style={{ padding: '12px', backgroundColor: `${theme.danger}10`, borderRadius: '10px', border: `1px solid ${theme.danger}30`, marginBottom: '10px' }}><div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><AlertTriangle size={16} color={theme.danger} /><span style={{ color: theme.danger, fontWeight: '700', fontSize: '13px' }}>Condition failed — no cover will activate</span></div><p style={{ margin: '4px 0 0 0', color: theme.textMuted, fontSize: '12px' }}>If any tyre is illegal or has serious damage, the customer gets no free 30-day cover.</p></div>)}
            {allScanned && !hasFailedCondition && (<div style={{ padding: '12px', backgroundColor: `${theme.primary}10`, borderRadius: '10px', border: `1px solid ${theme.primary}30`, marginBottom: '10px' }}><div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><ShieldCheck size={16} color={theme.primary} /><span style={{ color: theme.primary, fontWeight: '600', fontSize: '13px' }}>All 4 pass — 30-day cover will activate</span></div></div>)}
            {allScanned && (<button onClick={() => setShowReport(true)} style={{ width: '100%', padding: '12px', backgroundColor: 'transparent', border: `1px solid ${theme.border}`, borderRadius: '10px', cursor: 'pointer', color: theme.text, fontSize: '13px', textAlign: 'center', fontWeight: '500', marginBottom: '10px' }}><ClipboardList size={14} color={theme.textMuted} style={{ marginRight: '6px', verticalAlign: 'middle' }} />Preview Condition Report</button>)}
          </div>
        </div>

        {/* BOTTOM BUTTON */}
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '16px 24px 32px', backgroundColor: theme.bg, borderTop: `1px solid ${theme.border}` }}>
          <Button onClick={() => { setConditionPassed(!hasFailedCondition); navigateTo(isCoverJob ? 'cover-job-complete' : 'job-payment'); }} icon={ArrowRight} disabled={!allScanned} fullWidth>
            {autoAdvanceReady ? 'Opening Payment...' : !allScanned ? `Photograph ${4 - scannedCount} More Tyre${4 - scannedCount !== 1 ? 's' : ''}` : hasFailedCondition ? 'Continue — No Cover' : 'All Legal — Collect Payment'}
          </Button>
          {!allScanned && (
            <button onClick={() => setShowSkipConditionWarning(true)} style={{ width: '100%', padding: '12px', backgroundColor: 'transparent', border: 'none', color: theme.textMuted, fontSize: '14px', cursor: 'pointer', marginTop: '8px' }}>
              Skip condition check
            </button>
          )}
        </div>

        {showSkipConditionWarning && (
          <Modal title="Skip Condition Check?" onClose={() => setShowSkipConditionWarning(false)}>
            <div style={{ display: 'flex', gap: '12px', padding: '16px', backgroundColor: `${theme.danger}10`, borderRadius: '10px', marginBottom: '16px' }}>
              <AlertTriangle size={24} color={theme.danger} style={{ flexShrink: 0 }} />
              <div>
                <p style={{ margin: '0 0 8px 0', color: theme.text, fontWeight: '600' }}>You lose cover and protection</p>
                <p style={{ margin: 0, color: theme.textMuted, fontSize: '14px', lineHeight: 1.5 }}>
                  Customer will NOT get their free 30-day cover. You also lose key dispute protection.
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Button variant="secondary" onClick={() => setShowSkipConditionWarning(false)} fullWidth>Go Back</Button>
              <button onClick={() => { setShowSkipConditionWarning(false); setConditionPassed(false); navigateTo(isCoverJob ? 'cover-job-complete' : 'job-payment'); }} style={{ flex: 1, padding: '14px', backgroundColor: theme.danger, border: 'none', borderRadius: '12px', color: '#fff', fontWeight: '600', cursor: 'pointer' }}>Skip Anyway</button>
            </div>
          </Modal>
        )}

        {/* CONDITION REPORT OVERLAY */}
        {showReport && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 2000, overflow: 'auto' }}>
            <div style={{ maxWidth: '420px', margin: '0 auto', padding: '24px', minHeight: '100vh', backgroundColor: theme.bg }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ margin: 0, color: theme.text, fontSize: '20px', fontWeight: '700' }}>Tyre Condition Report</h2>
                <button onClick={() => setShowReport(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} color={theme.textMuted} /></button>
              </div>
              <Card style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}><span style={{ color: theme.textMuted, fontSize: '13px' }}>Vehicle</span><span style={{ color: theme.text, fontWeight: '700', letterSpacing: '1px' }}>{activeJob?.plate || 'CD90 VWX'}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}><span style={{ color: theme.textMuted, fontSize: '13px' }}>Customer</span><span style={{ color: theme.text, fontWeight: '500' }}>{activeJob?.customer || 'Emma Davis'}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}><span style={{ color: theme.textMuted, fontSize: '13px' }}>Inspected by</span><span style={{ color: theme.text, fontWeight: '500' }}>{signUpData.fullName || 'Dan Smith'}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}><span style={{ color: theme.textMuted, fontSize: '13px' }}>Business</span><span style={{ color: theme.text, fontWeight: '500' }}>{signUpData.businessName || "Dan's Mobile Tyres"}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}><span style={{ color: theme.textMuted, fontSize: '13px' }}>Date</span><span style={{ color: theme.text, fontWeight: '500' }}>{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.textMuted, fontSize: '13px' }}>GPS</span><span style={{ color: theme.text, fontWeight: '500' }}>51.5074, -0.1278</span></div>
              </Card>
              <div style={{ padding: '14px', borderRadius: '12px', textAlign: 'center', marginBottom: '12px', backgroundColor: hasFailedCondition ? `${theme.danger}10` : `${theme.primary}10`, border: `2px solid ${hasFailedCondition ? theme.danger : theme.primary}` }}>
                <p style={{ margin: '0 0 4px 0', fontWeight: '700', fontSize: '16px', color: hasFailedCondition ? theme.danger : theme.primary }}>{hasFailedCondition ? 'NO COVER' : 'FULL COVER — ALL 4 TYRES'}</p>
                <p style={{ margin: 0, color: theme.textMuted, fontSize: '13px' }}>{hasFailedCondition ? 'Condition failed. Free 30-day cover will not activate.' : '30-day cover activated on all 4 tyres'}</p>
              </div>
              <div style={{ padding: '10px 12px', backgroundColor: `${theme.primary}08`, borderRadius: '10px', border: `1px solid ${theme.primary}20`, marginBottom: '16px' }}>
                <p style={{ margin: 0, color: theme.textMuted, fontSize: '12px', lineHeight: 1.6, textAlign: 'center' }}>This report activates the customer's <strong style={{ color: theme.primary }}>30-day cover membership</strong>. Sent with receipt and stored as timestamped evidence.</p>
              </div>
              {allPositions.map(pos => { const t = tyres[pos]; if (!t) return null; const covered = isCov(t); const color = getCol(t); return (
                <Card key={pos} style={{ marginBottom: '10px', borderLeft: `4px solid ${color}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}><span style={{ color: theme.text, fontWeight: '700', fontSize: '15px' }}>{pos}</span><span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '700', backgroundColor: covered ? `${theme.primary}15` : `${theme.danger}15`, color: covered ? theme.primary : theme.danger }}>{getCovLbl(t)}</span></div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', fontSize: '13px' }}>
                    <div><span style={{ color: theme.textMuted }}>Size: </span><span style={{ color: theme.text, fontWeight: '500' }}>{t.size}</span></div>
                    <div><span style={{ color: theme.textMuted }}>Brand: </span><span style={{ color: theme.text, fontWeight: '500' }}>{t.brand}</span></div>
                    <div><span style={{ color: theme.textMuted }}>DOT: </span><span style={{ color: theme.text, fontWeight: '500' }}>{t.dot}</span></div>
                    <div><span style={{ color: theme.textMuted }}>Tread: </span><span style={{ color: theme.text, fontWeight: '500' }}>{treadLabels[t.treadStatus]}</span></div>
                    <div><span style={{ color: theme.textMuted }}>Legal: </span><span style={{ fontWeight: '600', color: t.legalStatus === 'legal' ? theme.primary : theme.danger }}>{t.legalStatus === 'legal' ? 'Yes' : 'No'}</span></div>
                  </div>
                  {t.damages.length > 0 && (<div style={{ marginTop: '8px' }}><span style={{ color: theme.textMuted, fontSize: '12px' }}>Damage: </span>{t.damages.map(d => (<span key={d} style={{ display: 'inline-block', padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: '600', margin: '2px 4px 2px 0', backgroundColor: seriousDamage.includes(d) ? `${theme.danger}15` : `${theme.warning}15`, color: seriousDamage.includes(d) ? theme.danger : theme.warning }}>{d}</span>))}</div>)}
                  {t.notes && <p style={{ margin: '6px 0 0 0', color: theme.textMuted, fontSize: '12px', fontStyle: 'italic' }}>Notes: {t.notes}</p>}
                </Card>
              ); })}
              <Card style={{ marginBottom: '16px' }}>
                <p style={{ margin: '0 0 8px 0', color: theme.text, fontWeight: '700', fontSize: '14px' }}>Cover Summary</p>
                {allPositions.map(pos => { const t = tyres[pos]; const covered = t && isCov(t); return (
                  <div key={pos} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: `1px solid ${theme.border}` }}><span style={{ color: theme.text, fontSize: '13px' }}>{pos}</span><span style={{ fontSize: '12px', fontWeight: '600', color: covered ? theme.primary : theme.danger }}>{covered ? 'Covered 30 days' : 'Excluded'}</span></div>
                ); })}
                <p style={{ margin: '10px 0 0 0', color: theme.textMuted, fontSize: '12px' }}>Claim line: <strong style={{ color: theme.text }}>0330 633 1247</strong></p>
                <p style={{ margin: '4px 0 0 0', color: theme.textMuted, fontSize: '12px' }}>From {signUpData.businessName || "Dan's Mobile Tyres"}, backed by TYRE-FIT</p>
              </Card>
              <Button onClick={() => setShowReport(false)} fullWidth>Close Report</Button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const JobPaymentScreen = () => {
    const jobTotal = 89.99;
    const bookingFee = 5.95;
    const depositPaid = bookingFee;
    const amountDue = jobTotal - depositPaid;
    const stripeFee = parseFloat((amountDue * 0.015 + 0.20).toFixed(2));
    const toWallet = parseFloat((amountDue - stripeFee).toFixed(2));
    const [showConfirmCash, setShowConfirmCash] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState(preferredPayment);
    
    const handlePaymentComplete = (method) => {
      setPaymentMethod(method);
      setPreferredPayment(method); // SMART: Remember for next time
      if (method === 'qr' || method === 'tap') {
        setWalletBalance(prev => prev + toWallet);
      }
      setShowQRModal(false);
      setShowConfirmCash(false);
      navigateTo('job-complete');
    };
    
    return (
      <div style={{ minHeight: '100vh', backgroundColor: theme.bg, padding: '24px', display: 'flex', flexDirection: 'column' }}>
        <Toast />
        <Header title="Collect Payment" />
        <ProgressSteps steps={['Arrive', 'Before', 'Condition', 'Payment']} currentStep={3} />
        <div style={{ flex: 1, paddingTop: '24px' }}>
          
          {/* AMOUNT DUE */}
          <Card>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.textMuted }}>Job Total</span><span style={{ color: theme.text }}>£{jobTotal.toFixed(2)}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.textMuted }}>Deposit Paid</span><span style={{ color: theme.primary }}>-£{depositPaid.toFixed(2)}</span></div>
              <div style={{ borderTop: `2px solid ${theme.border}`, paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: theme.text, fontWeight: '700', fontSize: '18px' }}>Customer Owes</span>
                <span style={{ color: theme.primary, fontWeight: '700', fontSize: '28px' }}>£{amountDue.toFixed(2)}</span>
              </div>
            </div>
          </Card>
          
          {/* OPTION 1: PAY VIA tyre-fit */}
          <h3 style={{ fontSize: '14px', fontWeight: '600', color: theme.textMuted, margin: '24px 0 12px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Pay via TYRE-FIT</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
            <button onClick={() => setShowQRModal(true)} style={{ padding: '18px 20px', backgroundColor: theme.primary, border: 'none', borderRadius: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <QrCode size={28} color="#000" />
              <div style={{ textAlign: 'left', flex: 1 }}>
                <span style={{ color: '#000', fontWeight: '700', fontSize: '16px', display: 'block' }}>Show QR Code</span>
                <span style={{ color: '#000', opacity: 0.7, fontSize: '13px' }}>Customer scans to pay • goes to wallet</span>
              </div>
            </button>
            
            <button onClick={() => handlePaymentComplete('tap')} style={{ padding: '18px 20px', backgroundColor: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <Smartphone size={28} color={theme.text} />
              <div style={{ textAlign: 'left', flex: 1 }}>
                <span style={{ color: theme.text, fontWeight: '600', fontSize: '16px', display: 'block' }}>Tap to Pay</span>
                <span style={{ color: theme.textMuted, fontSize: '13px' }}>Contactless on your iPhone • goes to wallet</span>
              </div>
            </button>
          </div>
          
          {/* OPTION 2: ALREADY PAID */}
          <h3 style={{ fontSize: '14px', fontWeight: '600', color: theme.textMuted, margin: '0 0 12px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Already paid outside app</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
            <button onClick={() => { setPaymentMethod('cash'); setShowConfirmCash(true); }} style={{ padding: '18px 20px', backgroundColor: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <PoundSterling size={28} color={theme.text} />
              <div style={{ textAlign: 'left', flex: 1 }}>
                <span style={{ color: theme.text, fontWeight: '600', fontSize: '16px', display: 'block' }}>Paid Cash</span>
                <span style={{ color: theme.textMuted, fontSize: '13px' }}>Confirm you've received cash</span>
              </div>
            </button>
            
            <button onClick={() => { setPaymentMethod('own_terminal'); setShowConfirmCash(true); }} style={{ padding: '18px 20px', backgroundColor: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <CreditCard size={28} color={theme.text} />
              <div style={{ textAlign: 'left', flex: 1 }}>
                <span style={{ color: theme.text, fontWeight: '600', fontSize: '16px', display: 'block' }}>Own Card Machine</span>
                <span style={{ color: theme.textMuted, fontSize: '13px' }}>Snap your receipt — we read the amount automatically</span>
              </div>
            </button>
            
            <button onClick={() => { setInvoiceFormData({ customerName: activeJob?.customer || 'Emma Davis', mobile: '07700 900123', description: `${activeJob?.tyreQty || 2}x ${activeJob?.tyreSize || '205/55R16'} fitting — ${activeJob?.plate || 'CD90 VWX'}`, amount: String(amountDue.toFixed(2)) }); navigateTo('invoice-create'); }} style={{ padding: '18px 20px', backgroundColor: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <ClipboardList size={28} color={theme.text} />
              <div style={{ textAlign: 'left', flex: 1 }}>
                <span style={{ color: theme.text, fontWeight: '600', fontSize: '16px', display: 'block' }}>Send Invoice</span>
                <span style={{ color: theme.textMuted, fontSize: '13px' }}>Customer pays later</span>
              </div>
            </button>
          </div>
          
          <div style={{ padding: '12px 14px', backgroundColor: `${theme.info}08`, borderRadius: '10px', border: `1px solid ${theme.info}20` }}>
            <p style={{ margin: 0, color: theme.textMuted, fontSize: '12px', lineHeight: 1.6 }}>
              <strong style={{ color: theme.text }}>TYRE-FIT payments:</strong> 1.5% + 20p fee, money goes to your wallet. <strong style={{ color: theme.text }}>Cash / own terminal:</strong> No fee, payment logged only. Either way, customer gets their receipt + cover text once you confirm.
            </p>
          </div>
        </div>
        
        {/* QR CODE MODAL */}
        {showQRModal && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', zIndex: 2000 }}>
            <button onClick={() => setShowQRModal(false)} style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', cursor: 'pointer' }}><X size={32} color="#000" /></button>
            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#000', margin: '0 0 8px 0' }}>Customer Scans to Pay</h2>
            <p style={{ color: '#666', margin: '0 0 32px 0', fontSize: '16px' }}>Point this at their phone camera</p>
            <div style={{ width: '280px', height: '280px', backgroundColor: '#fff', border: '4px solid #000', borderRadius: '24px', padding: '20px', marginBottom: '24px' }}>
              <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gridTemplateRows: 'repeat(7, 1fr)', gap: '4px' }}>
                {[...Array(49)].map((_, i) => {
                  const isCorner = (i < 3 || (i >= 4 && i < 7)) || (i >= 7 && i < 10) || (i >= 14 && i < 17) || (i >= 35 && i < 38) || (i >= 42 && i < 45) || (i >= 46 && i < 49) || (i >= 21 && i < 24) || (i >= 28 && i < 31);
                  const isRandom = [11, 12, 18, 19, 25, 26, 32, 33, 39, 40].includes(i);
                  return <div key={i} style={{ backgroundColor: isCorner || isRandom ? '#000' : 'transparent', borderRadius: '2px' }} />;
                })}
              </div>
            </div>
            <div style={{ backgroundColor: '#f0f0f0', padding: '16px 32px', borderRadius: '12px', marginBottom: '32px' }}>
              <p style={{ margin: 0, color: '#666', fontSize: '14px', textAlign: 'center' }}>Amount</p>
              <p style={{ margin: '4px 0 0 0', color: '#000', fontSize: '36px', fontWeight: '700', textAlign: 'center' }}>£{amountDue.toFixed(2)}</p>
            </div>
            <Button onClick={() => handlePaymentComplete('qr')} style={{ maxWidth: '300px' }}>Customer Has Paid</Button>
            <button onClick={() => setShowQRModal(false)} style={{ marginTop: '16px', background: 'none', border: 'none', color: '#666', fontSize: '16px', cursor: 'pointer' }}>Cancel</button>
          </div>
        )}
        
        {/* CONFIRM PAYMENT RECEIVED MODAL */}
        {showConfirmCash && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', zIndex: 2000 }}>
            <Card style={{ maxWidth: '380px', width: '100%' }}>
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <div style={{ width: '64px', height: '64px', backgroundColor: `${theme.primary}20`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  {paymentMethod === 'cash' ? <PoundSterling size={32} color={theme.primary} /> : <CreditCard size={32} color={theme.primary} />}
                </div>
                <h2 style={{ margin: '0 0 8px 0', color: theme.text, fontWeight: '700', fontSize: '20px' }}>
                  {paymentMethod === 'cash' ? 'Confirm Cash Received' : 'Snap Card Machine Receipt'}
                </h2>
                <p style={{ margin: 0, color: theme.textMuted, fontSize: '14px', lineHeight: 1.5 }}>
                  {paymentMethod === 'cash' 
                    ? <>{"You've received"} <strong style={{ color: theme.primary, fontSize: '18px' }}>{'\u00A3'}{amountDue.toFixed(2)}</strong> in cash?</>
                    : 'Take a photo of your card machine receipt and we will read the amount, date, and card details automatically.'
                  }
                </p>
              </div>
              
              {paymentMethod === 'own_terminal' && (
                <button onClick={() => showToast('Receipt scanned — amount confirmed')} style={{ width: '100%', padding: '20px', backgroundColor: theme.bgInput, border: `2px dashed ${theme.border}`, borderRadius: '14px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <Camera size={32} color={theme.textMuted} />
                  <span style={{ color: theme.text, fontWeight: '600', fontSize: '15px' }}>Snap Receipt</span>
                  <span style={{ color: theme.textMuted, fontSize: '12px' }}>OCR reads amount, date, last 4 digits</span>
                </button>
              )}

              {paymentMethod === 'own_terminal' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', backgroundColor: `${theme.primary}08`, borderRadius: '10px', marginBottom: '16px' }}>
                  <CheckCircle size={16} color={theme.primary} />
                  <div>
                    <p style={{ margin: 0, color: theme.text, fontSize: '14px', fontWeight: '600' }}>{'\u00A3'}{amountDue.toFixed(2)} — Visa ****4829</p>
                    <p style={{ margin: '2px 0 0 0', color: theme.textMuted, fontSize: '12px' }}>Read from receipt — {new Date().toLocaleDateString('en-GB')}</p>
                  </div>
                </div>
              )}
              
              <div style={{ padding: '12px', backgroundColor: `${theme.primary}08`, borderRadius: '10px', marginBottom: '20px' }}>
                <p style={{ margin: 0, color: theme.textMuted, fontSize: '13px', lineHeight: 1.6, textAlign: 'center' }}>
                  This will close the job and send the customer their <strong style={{ color: theme.text }}>receipt</strong>, <strong style={{ color: theme.text }}>{conditionPassed ? '30-day cover' : 'condition report (no cover)'}</strong>, and schedule a <strong style={{ color: theme.text }}>review request</strong>.
                </p>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <Button onClick={() => handlePaymentComplete(paymentMethod)} icon={CheckCircle}>Confirm Payment</Button>
                {paymentMethod === 'own_terminal' && (
                  <button onClick={() => handlePaymentComplete(paymentMethod)} style={{ padding: '12px', background: 'none', border: `1px solid ${theme.border}`, borderRadius: '10px', color: theme.textMuted, fontSize: '14px', cursor: 'pointer' }}>Skip receipt — enter amount manually</button>
                )}
                <Button variant="secondary" onClick={() => setShowConfirmCash(false)}>Go Back</Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    );
  };

  const JobCompleteScreen = () => {
    const jobTotal = 89.99;
    const bookingFee = 5.95;
    const customerPaid = jobTotal - bookingFee;
    const stripeFee = parseFloat((customerPaid * 0.015 + 0.20).toFixed(2));
    const netToWallet = parseFloat((customerPaid - stripeFee).toFixed(2));
    const [showCompletePopup, setShowCompletePopup] = useState(true);
    const [showJobCompleteReport, setShowJobCompleteReport] = useState(false);
    
    return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.bg, padding: '24px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
        <FontSizeToggle />
        <ThemeToggle />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '120px', height: '120px', backgroundColor: theme.primary, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}><CheckCircle size={60} color="#000" /></div>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: theme.text, margin: '0 0 8px 0' }}>Job Done!</h1>
      <p style={{ color: theme.textMuted, margin: '0 0 32px 0', fontSize: '16px', textAlign: 'center' }}>{activeJob?.customer || 'Emma Davis'} — {activeJob?.plate || 'CD90 VWX'}</p>
      
      {/* PAYMENT SUMMARY — different for cash vs Stripe */}
      <Card style={{ maxWidth: '350px', width: '100%', marginBottom: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.textMuted, fontSize: '15px' }}>Customer Paid</span><span style={{ color: theme.text, fontWeight: '500', fontSize: '15px' }}>£{customerPaid.toFixed(2)}</span></div>
          <div style={{ borderTop: `2px solid ${theme.border}`, paddingTop: '12px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Wallet size={28} color={theme.primary} />
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, color: theme.textMuted, fontSize: '14px' }}>Payment Logged</p>
              <p style={{ margin: '4px 0 0 0', color: theme.primary, fontSize: '24px', fontWeight: '700' }}>£{customerPaid.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* WHAT HAPPENS NEXT — TIMELINE */}
      <Card style={{ maxWidth: '350px', width: '100%', marginBottom: '16px' }}>
        <h3 style={{ margin: '0 0 16px 0', color: theme.text, fontWeight: '700', fontSize: '15px' }}>What happens now</h3>
        
        {/* Step 1: Condition Report + Cover */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '36px', height: '36px', backgroundColor: conditionPassed ? `${theme.primary}20` : `${theme.danger}20`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ShieldCheck size={18} color={conditionPassed ? theme.primary : theme.danger} />
            </div>
            <div style={{ width: '2px', flex: 1, backgroundColor: theme.border, margin: '6px 0' }} />
          </div>
          <div style={{ flex: 1, paddingBottom: '8px' }}>
            <p style={{ margin: 0, color: conditionPassed ? theme.primary : theme.danger, fontWeight: '700', fontSize: '15px' }}>{conditionPassed ? '30-Day Cover — LIVE NOW' : 'No Cover Activated'}</p>
            <p style={{ margin: '4px 0 0 0', color: theme.textMuted, fontSize: '13px', lineHeight: 1.5 }}>{conditionPassed ? 'Active immediately. No activation needed.' : 'Condition check failed. Customer does not get free 30-day cover.'}</p>
            <div style={{ marginTop: '8px', padding: '10px 12px', backgroundColor: conditionPassed ? `${theme.primary}08` : `${theme.danger}08`, borderRadius: '8px', border: `1px solid ${conditionPassed ? `${theme.primary}20` : `${theme.danger}20`}` }}>
              {conditionPassed ? (
                <>
                  <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: theme.textMuted }}>Covers: flat tyre repair, locking wheel nut removal, 24/7 safe tow</p>
                  <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: theme.textMuted }}>From <strong style={{ color: theme.text }}>{signUpData.businessName || "Dan's Mobile Tyres"}</strong>, backed by TYRE-FIT</p>
                  <p style={{ margin: 0, fontSize: '12px', color: theme.primary, fontWeight: '600' }}>When they need help → routes to you first</p>
                </>
              ) : (
                <p style={{ margin: 0, fontSize: '12px', color: theme.textMuted }}>Customer still gets receipt and condition report, but no free cover due to failed condition check.</p>
              )}
            </div>
            <button onClick={() => setShowJobCompleteReport(true)} style={{ marginTop: '8px', width: '100%', padding: '8px', backgroundColor: 'transparent', border: `1px solid ${theme.primary}30`, borderRadius: '8px', cursor: 'pointer', color: theme.primary, fontSize: '12px', fontWeight: '600' }}>
              <ClipboardList size={12} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
              View Tyre Condition Report
            </button>
          </div>
        </div>
        
        {/* Step 2: Customer text — show example */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '36px', height: '36px', backgroundColor: `${theme.info}20`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <MessageSquare size={18} color={theme.info} />
            </div>
            <div style={{ width: '2px', flex: 1, backgroundColor: theme.border, margin: '6px 0' }} />
          </div>
          <div style={{ flex: 1, paddingBottom: '8px' }}>
            <p style={{ margin: 0, color: theme.text, fontWeight: '600', fontSize: '15px' }}>Customer Text — Sent Now</p>
            <p style={{ margin: '4px 0 0 0', color: theme.textMuted, fontSize: '13px', lineHeight: 1.5 }}>Receipt + condition report + cover details</p>
            {/* EXAMPLE TEXT */}
            <div style={{ marginTop: '8px', padding: '12px', backgroundColor: theme.bgInput, borderRadius: '10px', border: `1px solid ${theme.border}` }}>
              <p style={{ margin: '0 0 2px 0', fontSize: '10px', color: theme.textMuted, textTransform: 'uppercase', fontWeight: '600' }}>Example text to customer</p>
              <div style={{ fontSize: '12px', color: theme.textMuted, lineHeight: 1.6, fontStyle: 'italic' }}>
                <p style={{ margin: '6px 0 0 0' }}>Hi Emma, thanks for choosing {signUpData.businessName || "Dan's Mobile Tyres"}!</p>
                <p style={{ margin: '6px 0 0 0' }}>2x 205/55R16 Continental fitted</p>
                <p style={{ margin: '6px 0 0 0' }}>{conditionPassed ? <>Your 30-day tyre cover is now <strong style={{ color: theme.primary }}>ACTIVE</strong></> : <>Condition report complete — <strong style={{ color: theme.danger }}>NO COVER</strong> activated</>}</p>
                <p style={{ margin: '6px 0 0 0' }}>View your condition report & cover details: <span style={{ color: theme.info, textDecoration: 'underline' }}>tyre-fit.co/r/CD90VWX</span></p>
                <p style={{ margin: '6px 0 0 0' }}>Need help? Call <strong style={{ color: theme.text }}>0330 633 1247</strong></p>
                <p style={{ margin: '8px 0 0 0', paddingTop: '8px', borderTop: `1px dashed ${theme.border}` }}>Know someone who needs tyres? Share your link and they get 10% off their first booking: <span style={{ color: theme.info, textDecoration: 'underline' }}>tyre-fit.co/r/{(signUpData.businessName || 'dans-mobile-tyres').toLowerCase().replace(/[^a-z0-9]/g, '-')}/emma-d</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Step 3: Review Request — with example */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '36px', height: '36px', backgroundColor: '#eab30820', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Star size={18} color="#eab308" />
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, color: theme.text, fontWeight: '600', fontSize: '15px' }}>Google Review Request</p>
            <p style={{ margin: '4px 0 0 0', color: theme.textMuted, fontSize: '13px', lineHeight: 1.5 }}>Sent automatically in <strong style={{ color: '#eab308' }}>2 hours</strong></p>
            {/* EXAMPLE REVIEW TEXT */}
            <div style={{ marginTop: '8px', padding: '12px', backgroundColor: theme.bgInput, borderRadius: '10px', border: `1px solid ${theme.border}` }}>
              <p style={{ margin: '0 0 2px 0', fontSize: '10px', color: theme.textMuted, textTransform: 'uppercase', fontWeight: '600' }}>Example text to customer</p>
              <div style={{ fontSize: '12px', color: theme.textMuted, lineHeight: 1.6, fontStyle: 'italic' }}>
                <p style={{ margin: '6px 0 0 0' }}>Hi Emma, hope the new tyres are riding well! If you have a moment, a quick Google review would really help us out:</p>
                <p style={{ margin: '6px 0 0 0' }}><span style={{ color: theme.info, textDecoration: 'underline' }}>g.page/dansmobiletyres/review</span></p>
                <p style={{ margin: '6px 0 0 0' }}>Thanks! — {signUpData.fullName || 'Dan'}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '350px', marginTop: '16px' }}>
        {getNextJob() ? (
          <>
            <Button onClick={() => { setJobTimer(0); setBeforePhotos({}); setAfterPhotos({}); setCustomerSigned(false); autoLoadNextJob(); }} icon={ArrowRight}>
              Next Job: {getNextJob()?.customer} — {getNextJob()?.plate}
            </Button>
            <Button variant="outline" onClick={() => { setJobTimer(0); setBeforePhotos({}); setAfterPhotos({}); setCustomerSigned(false); navigateTo('dashboard'); }}>Back to Home</Button>
          </>
        ) : (
          <>
            <Button onClick={() => { setJobTimer(0); setBeforePhotos({}); setAfterPhotos({}); setCustomerSigned(false); navigateTo('day-summary'); }}>All Done — View Day Summary</Button>
            <Button variant="outline" onClick={() => { setJobTimer(0); setBeforePhotos({}); setAfterPhotos({}); setCustomerSigned(false); navigateTo('wallet'); }}>View Wallet</Button>
          </>
        )}
      </div>
      
      {/* CONDITION REPORT OVERLAY */}
      {showJobCompleteReport && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 2000, overflow: 'auto' }}>
          <div style={{ maxWidth: '420px', margin: '0 auto', padding: '24px', minHeight: '100vh', backgroundColor: theme.bg }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: 0, color: theme.text, fontSize: '20px', fontWeight: '700' }}>Tyre Condition Report</h2>
              <button onClick={() => setShowJobCompleteReport(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} color={theme.textMuted} /></button>
            </div>
            <Card style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}><span style={{ color: theme.textMuted, fontSize: '13px' }}>Vehicle</span><span style={{ color: theme.text, fontWeight: '700', letterSpacing: '1px' }}>{activeJob?.plate || 'CD90 VWX'}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}><span style={{ color: theme.textMuted, fontSize: '13px' }}>Customer</span><span style={{ color: theme.text, fontWeight: '500' }}>{activeJob?.customer || 'Emma Davis'}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}><span style={{ color: theme.textMuted, fontSize: '13px' }}>Inspected by</span><span style={{ color: theme.text, fontWeight: '500' }}>{signUpData.fullName || 'Dan Smith'}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}><span style={{ color: theme.textMuted, fontSize: '13px' }}>Date</span><span style={{ color: theme.text, fontWeight: '500' }}>{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.textMuted, fontSize: '13px' }}>GPS</span><span style={{ color: theme.text, fontWeight: '500' }}>51.5074, -0.1278</span></div>
            </Card>
            <div style={{ padding: '14px', borderRadius: '12px', textAlign: 'center', marginBottom: '12px', backgroundColor: conditionPassed ? `${theme.primary}10` : `${theme.danger}10`, border: `2px solid ${conditionPassed ? theme.primary : theme.danger}` }}>
              <p style={{ margin: '0 0 4px 0', fontWeight: '700', fontSize: '16px', color: conditionPassed ? theme.primary : theme.danger }}>{conditionPassed ? 'FULL COVER — ALL 4 TYRES' : 'NO COVER'}</p>
              <p style={{ margin: 0, color: theme.textMuted, fontSize: '13px' }}>{conditionPassed ? '30-day cover activated on all 4 tyres' : 'Condition failed, so free cover did not activate'}</p>
            </div>
            {['Front Left', 'Front Right', 'Rear Left', 'Rear Right'].map(pos => (
              <Card key={pos} style={{ marginBottom: '10px', borderLeft: `4px solid ${theme.primary}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ color: theme.text, fontWeight: '700', fontSize: '15px' }}>{pos}</span>
                  <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '700', backgroundColor: conditionPassed ? `${theme.primary}15` : `${theme.danger}15`, color: conditionPassed ? theme.primary : theme.danger }}>{conditionPassed ? 'Covered' : 'No cover'}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', fontSize: '13px' }}>
                  <div><span style={{ color: theme.textMuted }}>Size: </span><span style={{ color: theme.text, fontWeight: '500' }}>{activeJob?.tyreSize || '205/55R16'}</span></div>
                  <div><span style={{ color: theme.textMuted }}>Brand: </span><span style={{ color: theme.text, fontWeight: '500' }}>Continental</span></div>
                  <div><span style={{ color: theme.textMuted }}>DOT: </span><span style={{ color: theme.text, fontWeight: '500' }}>2024</span></div>
                  <div><span style={{ color: theme.textMuted }}>Tread: </span><span style={{ color: theme.text, fontWeight: '500' }}>Good (6.2mm)</span></div>
                </div>
              </Card>
            ))}
            <Card>
              <p style={{ margin: '0 0 6px 0', color: theme.textMuted, fontSize: '12px' }}>Claim line: <strong style={{ color: theme.text }}>0330 633 1247</strong></p>
              <p style={{ margin: 0, color: theme.textMuted, fontSize: '12px' }}>From {signUpData.businessName || "Dan's Mobile Tyres"}, backed by TYRE-FIT</p>
            </Card>
            <Button onClick={() => setShowJobCompleteReport(false)} fullWidth style={{ marginTop: '16px' }}>Close Report</Button>
          </div>
        </div>
      )}

      {/* JOB CLOSED POPUP */}
      {showCompletePopup && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', zIndex: 2000, overflow: 'auto' }}>
          <Card style={{ maxWidth: '380px', width: '100%' }}>
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <div style={{ width: '72px', height: '72px', backgroundColor: `${theme.primary}20`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <CheckCircle size={40} color={theme.primary} />
              </div>
              <h2 style={{ margin: '0 0 6px 0', color: theme.text, fontWeight: '700', fontSize: '22px' }}>Job Complete</h2>
              <p style={{ margin: 0, color: theme.primary, fontWeight: '700', fontSize: '28px' }}>£{customerPaid.toFixed(2)}</p>
              <p style={{ margin: '4px 0 0 0', color: theme.textMuted, fontSize: '13px' }}>{activeJob?.customer || 'Emma Davis'} — {activeJob?.plate || 'CD90 VWX'}</p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
              {/* Cover LIVE */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: conditionPassed ? `${theme.primary}08` : `${theme.danger}08`, borderRadius: '10px', border: `1px solid ${conditionPassed ? `${theme.primary}20` : `${theme.danger}20`}` }}>
                <div style={{ width: '40px', height: '40px', backgroundColor: conditionPassed ? `${theme.primary}15` : `${theme.danger}15`, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <ShieldCheck size={20} color={conditionPassed ? theme.primary : theme.danger} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, color: conditionPassed ? theme.primary : theme.danger, fontWeight: '700', fontSize: '14px' }}>{conditionPassed ? '30-Day Cover — LIVE' : 'No Cover Activated'}</p>
                  <p style={{ margin: '2px 0 0 0', color: theme.textMuted, fontSize: '12px' }}>{conditionPassed ? 'All 4 tyres covered · Active now' : 'Failed condition check · cover not active'}</p>
                </div>
                <CheckCircle size={16} color={conditionPassed ? theme.primary : theme.danger} style={{ flexShrink: 0 }} />
              </div>
              
              {/* Condition Report */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: `${theme.info}08`, borderRadius: '10px', border: `1px solid ${theme.info}20` }}>
                <div style={{ width: '40px', height: '40px', backgroundColor: `${theme.info}15`, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <ClipboardList size={20} color={theme.info} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, color: theme.text, fontWeight: '600', fontSize: '14px' }}>Condition Report Sent</p>
                  <p style={{ margin: '2px 0 0 0', color: theme.textMuted, fontSize: '12px' }}>4 tyres inspected · Report + receipt texted</p>
                </div>
                <CheckCircle size={16} color={theme.primary} style={{ flexShrink: 0 }} />
              </div>

              {/* Review */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: '#eab30808', borderRadius: '10px', border: `1px solid #eab30820` }}>
                <div style={{ width: '40px', height: '40px', backgroundColor: '#eab30815', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Star size={20} color="#eab308" />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, color: theme.text, fontWeight: '600', fontSize: '14px' }}>Review Request</p>
                  <p style={{ margin: '2px 0 0 0', color: theme.textMuted, fontSize: '12px' }}>Sending in 2 hours automatically</p>
                </div>
                <Clock size={16} color="#eab308" style={{ flexShrink: 0 }} />
              </div>
            </div>

            {/* EXAMPLE: What customer sees */}
            <div style={{ padding: '12px', backgroundColor: theme.bgInput, borderRadius: '10px', border: `1px solid ${theme.border}`, marginBottom: '16px' }}>
              <p style={{ margin: '0 0 6px 0', fontSize: '10px', color: theme.textMuted, textTransform: 'uppercase', fontWeight: '700' }}>Customer receives this text now</p>
              <div style={{ fontSize: '12px', color: theme.textMuted, lineHeight: 1.6 }}>
                <p style={{ margin: 0 }}>Hi Emma, thanks for choosing {signUpData.businessName || "Dan's Mobile Tyres"}! 2x 205/55R16 fitted. {conditionPassed ? <>30-day cover is <strong style={{ color: theme.primary }}>ACTIVE</strong>.</> : <>Condition report complete — <strong style={{ color: theme.danger }}>NO COVER</strong>.</>} <span style={{ color: theme.info, textDecoration: 'underline' }}>View report & cover</span>. Need help? 0330 633 1247</p>
              </div>
            </div>
            
            <Button onClick={() => { setShowCompletePopup(false); if (getNextJob()) { setTimeout(() => autoLoadNextJob(), 500); } }} fullWidth>{getNextJob() ? `Got It — Next: ${getNextJob()?.customer}` : 'Got It'}</Button>
          </Card>
        </div>
      )}
      </div>
    </div>
    );
  };

  // ============================================
  // COVER JOB COMPLETE — TYRE-FIT pays, no customer payment collection
  // ============================================
  const CoverJobCompleteScreen = () => {
    const quoteAmount = parseFloat(coverQuotePrice || 74.99);
    const [showCoverCompletePopup, setShowCoverCompletePopup] = useState(true);
    const [showCoverConditionReport, setShowCoverConditionReport] = useState(false);
    const [showUpsellPreview, setShowUpsellPreview] = useState(false);
    
    // Mock condition data for cover job — in production this comes from after-photo scan
    const conditionData = {
      'Front Left': { size: '205/55R16', brand: 'Continental', treadDepth: '5.2mm', condition: 'Good', damages: [] },
      'Front Right': { size: '205/55R16', brand: 'Continental', treadDepth: '2.1mm', condition: 'Replace Soon', damages: ['Uneven wear'] },
      'Rear Left': { size: '205/55R16', brand: 'Hankook', treadDepth: '4.8mm', condition: 'Good', damages: [] },
      'Rear Right': { size: '205/55R16', brand: 'Hankook', treadDepth: '3.0mm', condition: 'Good', damages: ['Minor kerb scuff'] },
    };
    const needsAttention = Object.values(conditionData).filter(t => t.condition === 'Replace Soon' || t.condition === 'Unsafe' || t.damages.length > 0).length;
    
    return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.bg, padding: '24px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
        <FontSizeToggle />
        <ThemeToggle />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '120px', height: '120px', backgroundColor: theme.primary, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}><CheckCircle size={60} color="#000" /></div>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: theme.text, margin: '0 0 8px 0' }}>Cover Job Done!</h1>
      <p style={{ color: theme.textMuted, margin: '0 0 32px 0', fontSize: '16px', textAlign: 'center' }}>{activeJob?.customer || 'John Smith'} — {activeJob?.plate || 'AB12 CDE'}</p>
      
      {/* PAYMENT — TYRE-FIT pays */}
      <Card style={{ maxWidth: '350px', width: '100%', marginBottom: '16px', borderColor: theme.primary }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ width: '44px', height: '44px', backgroundColor: `${theme.primary}15`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldCheck size={24} color={theme.primary} />
          </div>
          <div>
            <p style={{ margin: 0, color: theme.textMuted, fontSize: '13px' }}>Cover Job — TYRE-FIT Pays You</p>
            <p style={{ margin: '4px 0 0 0', color: theme.primary, fontSize: '28px', fontWeight: '700' }}>£{quoteAmount.toFixed(2)}</p>
          </div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', backgroundColor: theme.bgInput, borderRadius: '8px' }}>
            <CheckCircle size={16} color={theme.primary} />
            <span style={{ color: theme.text, fontSize: '14px' }}>Job verified — photos & sign-off received</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', backgroundColor: theme.bgInput, borderRadius: '8px' }}>
            <Clock size={16} color={theme.warning} />
            <span style={{ color: theme.text, fontSize: '14px' }}>Payment to your wallet within 24 hours</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', backgroundColor: theme.bgInput, borderRadius: '8px' }}>
            <Wallet size={16} color={theme.primary} />
            <span style={{ color: theme.text, fontSize: '14px' }}>No invoicing — TYRE-FIT handles everything</span>
          </div>
        </div>
      </Card>

      {/* UPSELL OPPORTUNITY — if condition check found issues */}
      {needsAttention > 0 && (
        <Card style={{ maxWidth: '350px', width: '100%', marginBottom: '16px', borderColor: theme.warning, borderWidth: '2px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <AlertTriangle size={20} color={theme.warning} />
            <h3 style={{ margin: 0, color: theme.text, fontWeight: '700', fontSize: '15px' }}>{needsAttention} other tyre{needsAttention > 1 ? 's' : ''} need{needsAttention === 1 ? 's' : ''} attention</h3>
          </div>
          <p style={{ margin: '0 0 12px 0', color: theme.textMuted, fontSize: '13px', lineHeight: 1.5 }}>Your condition check found issues. Send {activeJob?.customer || 'John'} a quote for replacements — you're already here and they trust you.</p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button size="small" fullWidth onClick={() => setShowUpsellPreview(true)} icon={MessageSquare}>Send Quote Offer</Button>
            <Button size="small" variant="secondary" fullWidth onClick={() => setShowCoverConditionReport(true)} icon={FileCheck}>View Report</Button>
          </div>
        </Card>
      )}

      {/* VIEW CONDITION REPORT — even without upsell */}
      {needsAttention === 0 && (
        <Card style={{ maxWidth: '350px', width: '100%', marginBottom: '16px' }}>
          <Button variant="outline" fullWidth onClick={() => setShowCoverConditionReport(true)} icon={FileCheck}>View Condition Report</Button>
        </Card>
      )}
      
      {/* JOB SUMMARY */}
      <Card style={{ maxWidth: '350px', width: '100%', marginBottom: '16px' }}>
        <h3 style={{ margin: '0 0 12px 0', color: theme.text, fontWeight: '600', fontSize: '15px' }}>Job Summary</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.textMuted, fontSize: '14px' }}>Customer</span><span style={{ color: theme.text, fontWeight: '500' }}>{activeJob?.customer || 'John Smith'}</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.textMuted, fontSize: '14px' }}>Vehicle</span><span style={{ color: theme.text }}>{activeJob?.plate || 'AB12 CDE'}</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.textMuted, fontSize: '14px' }}>Tyres</span><span style={{ color: theme.text }}>{activeJob?.tyreQty || 1}x {activeJob?.tyreSize || '205/55R16'}</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.textMuted, fontSize: '14px' }}>Before Photos</span><span style={{ color: theme.primary }}>{Object.keys(beforePhotos).filter(k => beforePhotos[k]).length} taken</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.textMuted, fontSize: '14px' }}>After Photos</span><span style={{ color: theme.primary }}>{Object.keys(afterPhotos).filter(k => afterPhotos[k]).length} taken</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.textMuted, fontSize: '14px' }}>Customer Sign-off</span><span style={{ color: customerSigned ? theme.primary : theme.warning }}>{customerSigned ? 'Signed' : 'Skipped'}</span></div>
        </div>
      </Card>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '350px', marginTop: '16px' }}>
        {getNextJob() ? (
          <>
            <Button onClick={() => { setJobTimer(0); setBeforePhotos({}); setAfterPhotos({}); setCustomerSigned(false); setIsCoverJob(false); setCoverJobInRoute(null); autoLoadNextJob(); }} icon={ArrowRight}>Next Job: {getNextJob()?.customer} — {getNextJob()?.plate}</Button>
            <Button variant="outline" onClick={() => { setJobTimer(0); setBeforePhotos({}); setAfterPhotos({}); setCustomerSigned(false); setIsCoverJob(false); setCoverJobInRoute(null); navigateTo('dashboard'); }}>Back to Home</Button>
          </>
        ) : (
          <>
            <Button onClick={() => { setJobTimer(0); setBeforePhotos({}); setAfterPhotos({}); setCustomerSigned(false); setIsCoverJob(false); setCoverJobInRoute(null); navigateTo('day-summary'); }}>All Done — View Day Summary</Button>
            <Button variant="outline" onClick={() => { setJobTimer(0); setBeforePhotos({}); setAfterPhotos({}); setCustomerSigned(false); setIsCoverJob(false); setCoverJobInRoute(null); navigateTo('wallet'); }}>View Wallet</Button>
          </>
        )}
      </div>
      
      {/* CONDITION REPORT OVERLAY */}
      {showCoverConditionReport && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 2000, overflowY: 'auto' }}>
          <div style={{ padding: '16px', maxWidth: '420px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ margin: 0, color: '#fff', fontWeight: '700', fontSize: '18px' }}>Tyre Condition Report</h2>
              <button onClick={() => setShowCoverConditionReport(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} color="#fff" /></button>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#1a1a1a', borderRadius: '12px', marginBottom: '12px' }}>
              <p style={{ margin: '0 0 4px 0', color: '#aaa', fontSize: '12px' }}>Vehicle</p>
              <p style={{ margin: '0 0 8px 0', color: '#fff', fontWeight: '600' }}>{activeJob?.plate || 'AB12 CDE'} — {activeJob?.customer || 'John Smith'}</p>
              <p style={{ margin: '0 0 4px 0', color: '#aaa', fontSize: '12px' }}>Inspected</p>
              <p style={{ margin: 0, color: '#fff' }}>{new Date().toLocaleDateString('en-GB')} by {signUpData.fullName || 'Dan Smith'}</p>
            </div>
            {['Front Left', 'Front Right', 'Rear Left', 'Rear Right'].map((pos, i) => {
              const t = conditionData[pos] || {};
              const isIssue = t.condition === 'Replace Soon' || t.condition === 'Unsafe' || (t.damages && t.damages.length > 0);
              return (
                <div key={pos} style={{ padding: '12px', backgroundColor: '#1a1a1a', borderRadius: '12px', marginBottom: '8px', borderLeft: `4px solid ${isIssue ? '#f59e0b' : '#10b981'}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ color: '#fff', fontWeight: '600', fontSize: '14px' }}>{pos}</span>
                    <span style={{ color: isIssue ? '#f59e0b' : '#10b981', fontSize: '12px', fontWeight: '600' }}>{t.condition || 'Good'}</span>
                  </div>
                  <p style={{ margin: 0, color: '#aaa', fontSize: '12px' }}>{t.size || '205/55R16'} · {t.brand || 'Continental'} · Tread: {t.treadDepth || '5.2mm'}</p>
                  {t.damages && t.damages.length > 0 && <p style={{ margin: '4px 0 0 0', color: '#f59e0b', fontSize: '12px' }}>{t.damages.join(', ')}</p>}
                </div>
              );
            })}
            <button onClick={() => setShowCoverConditionReport(false)} style={{ width: '100%', padding: '14px', backgroundColor: '#333', border: 'none', borderRadius: '10px', color: '#fff', fontWeight: '600', fontSize: '15px', cursor: 'pointer', marginTop: '8px' }}>Close Report</button>
          </div>
        </div>
      )}

      {/* UPSELL MESSAGE PREVIEW */}
      {showUpsellPreview && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <Card style={{ maxWidth: '380px', width: '100%' }}>
            <h3 style={{ margin: '0 0 12px 0', color: theme.text, fontWeight: '700', fontSize: '16px' }}>Send replacement quote offer</h3>
            <p style={{ margin: '0 0 12px 0', color: theme.textMuted, fontSize: '13px' }}>This text goes to {activeJob?.customer || 'John'} with a link to get a quote from you:</p>
            <div style={{ padding: '12px', backgroundColor: theme.bgInput, borderRadius: '10px', marginBottom: '16px', borderLeft: `3px solid ${theme.primary}` }}>
              <p style={{ margin: 0, color: theme.text, fontSize: '13px', lineHeight: 1.6, fontStyle: 'italic' }}>
                Hi {activeJob?.customer?.split(' ')[0] || 'John'}, we just sorted your emergency tyre — glad we could help! While checking your vehicle, we noticed {needsAttention} other tyre{needsAttention > 1 ? 's' : ''} that {needsAttention === 1 ? 'needs' : 'need'} attention soon. We can do a deal on replacements since we know your vehicle. Get a quote: tyre-fit.co/q/{activeJob?.plate || 'AB12CDE'} — {signUpData.fullName?.split(' ')[0] || 'Dan'}, {signUpData.businessName || "Dan's Mobile Tyres"}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button variant="secondary" fullWidth onClick={() => setShowUpsellPreview(false)}>Cancel</Button>
              <Button fullWidth onClick={() => { setShowUpsellPreview(false); showToast(`Quote offer sent to ${activeJob?.customer || 'John'}`); }} icon={Send}>Send Now</Button>
            </div>
          </Card>
        </div>
      )}

      {/* POPUP ON ARRIVAL */}
      {showCoverCompletePopup && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', zIndex: 2000 }}>
          <Card style={{ maxWidth: '380px', width: '100%' }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ width: '72px', height: '72px', backgroundColor: `${theme.primary}20`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <ShieldCheck size={40} color={theme.primary} />
              </div>
              <h2 style={{ margin: '0 0 6px 0', color: theme.text, fontWeight: '700', fontSize: '22px' }}>Cover Job Submitted</h2>
              <p style={{ margin: '0 0 4px 0', color: theme.primary, fontWeight: '700', fontSize: '28px' }}>£{quoteAmount.toFixed(2)}</p>
              <p style={{ margin: 0, color: theme.textMuted, fontSize: '14px' }}>TYRE-FIT is verifying your job</p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: theme.bgInput, borderRadius: '10px' }}>
                <div style={{ width: '36px', height: '36px', backgroundColor: `${theme.primary}15`, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Camera size={18} color={theme.primary} />
                </div>
                <div>
                  <p style={{ margin: 0, color: theme.text, fontWeight: '600', fontSize: '14px' }}>Photos & sign-off received</p>
                  <p style={{ margin: '2px 0 0 0', color: theme.textMuted, fontSize: '13px' }}>Evidence pack submitted for verification</p>
                </div>
                <CheckCircle size={16} color={theme.primary} style={{ flexShrink: 0, marginLeft: 'auto' }} />
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: theme.bgInput, borderRadius: '10px' }}>
                <div style={{ width: '36px', height: '36px', backgroundColor: `${theme.warning}15`, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Wallet size={18} color={theme.warning} />
                </div>
                <div>
                  <p style={{ margin: 0, color: theme.text, fontWeight: '600', fontSize: '14px' }}>Payment within 24 hours</p>
                  <p style={{ margin: '2px 0 0 0', color: theme.textMuted, fontSize: '13px' }}>£{quoteAmount.toFixed(2)} sent to your wallet automatically</p>
                </div>
                <Clock size={16} color={theme.warning} style={{ flexShrink: 0, marginLeft: 'auto' }} />
              </div>
            </div>
            
            <p style={{ margin: '0 0 16px 0', color: theme.textMuted, fontSize: '13px', textAlign: 'center', lineHeight: 1.5 }}>Customer already has active cover — no review request or cover link needed.</p>
            
            <Button onClick={() => setShowCoverCompletePopup(false)} fullWidth>Got It</Button>
          </Card>
        </div>
      )}
      </div>
    </div>
    );
  };

  // ============================================
  // DAY SUMMARY — shown when all jobs done
  // ============================================
  const DaySummaryScreen = () => {
    const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
    const stats = weeklyWins;
    const coverActivated = stats.coveredCustomers || 3;
    const milesDriven = mileageToday;
    return (
      <div style={{ minHeight: '100vh', backgroundColor: theme.bg, paddingBottom: '100px' }}>
        <Toast />
        <div style={{ padding: '24px', textAlign: 'center' }}>
          <div style={{ width: '80px', height: '80px', backgroundColor: `${theme.primary}20`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
            <CheckCircle size={40} color={theme.primary} />
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: theme.text, margin: '0 0 4px 0' }}>Day Complete</h1>
          <p style={{ color: theme.textMuted, fontSize: '14px', margin: 0 }}>{today}</p>
        </div>

        <div style={{ padding: '0 16px' }}>
          {/* EARNINGS */}
          <Card style={{ marginBottom: '12px', background: `linear-gradient(135deg, ${theme.primary}, #059669)` }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ margin: 0, color: '#000', opacity: 0.7, fontSize: '14px' }}>Today's Earnings</p>
              <p style={{ margin: '4px 0 0 0', color: '#000', fontSize: '36px', fontWeight: '800' }}>£{(stats.earned / 5).toFixed(2)}</p>
              <p style={{ margin: '4px 0 0 0', color: '#000', opacity: 0.6, fontSize: '13px' }}>Week total: £{stats.earned.toFixed(2)}</p>
            </div>
          </Card>

          {/* STATS GRID */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
            <Card style={{ marginBottom: 0, textAlign: 'center' }}>
              <p style={{ margin: 0, color: theme.primary, fontWeight: '700', fontSize: '28px' }}>{Math.round(stats.jobs / 5)}</p>
              <p style={{ margin: '4px 0 0 0', color: theme.textMuted, fontSize: '13px' }}>Jobs completed</p>
            </Card>
            <Card style={{ marginBottom: 0, textAlign: 'center' }}>
              <p style={{ margin: 0, color: '#eab308', fontWeight: '700', fontSize: '28px' }}>{stats.reviews}</p>
              <p style={{ margin: '4px 0 0 0', color: theme.textMuted, fontSize: '13px' }}>Reviews requested</p>
            </Card>
            <Card style={{ marginBottom: 0, textAlign: 'center' }}>
              <p style={{ margin: 0, color: theme.primary, fontWeight: '700', fontSize: '28px' }}>{coverActivated}</p>
              <p style={{ margin: '4px 0 0 0', color: theme.textMuted, fontSize: '13px' }}>Covers activated</p>
            </Card>
            <Card style={{ marginBottom: 0, textAlign: 'center' }}>
              <p style={{ margin: 0, color: theme.text, fontWeight: '700', fontSize: '28px' }}>{milesDriven}</p>
              <p style={{ margin: '4px 0 0 0', color: theme.textMuted, fontSize: '13px' }}>Miles driven</p>
            </Card>
          </div>

          {/* WHAT HAPPENED AUTOMATICALLY */}
          <Card style={{ marginBottom: '12px' }}>
            <h3 style={{ margin: '0 0 12px 0', color: theme.text, fontWeight: '600', fontSize: '15px' }}>TYRE-FIT handled today</h3>
            {[
              { icon: MessageSquare, text: `${Math.round(stats.jobs / 5)} ETA texts sent to customers`, color: theme.info },
              { icon: CheckCircle, text: `${Math.round(stats.jobs / 5)} receipts + cover texts delivered`, color: theme.primary },
              { icon: Star, text: `${stats.reviews} Google review requests scheduled`, color: '#eab308' },
              { icon: Shield, text: `${coverActivated} customers now covered for 30 days`, color: theme.primary },
              { icon: Camera, text: `${Math.round(stats.jobs / 5) * 5} photos stored as evidence`, color: theme.info },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: i < 4 ? `1px solid ${theme.border}` : 'none' }}>
                <item.icon size={16} color={item.color} />
                <span style={{ color: theme.textMuted, fontSize: '13px' }}>{item.text}</span>
              </div>
            ))}
          </Card>

          {/* WEEK PROGRESS */}
          <Card style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <h3 style={{ margin: 0, color: theme.text, fontWeight: '600', fontSize: '15px' }}>This week</h3>
              <span style={{ color: theme.textMuted, fontSize: '13px' }}>{stats.jobs} jobs · £{stats.earned.toFixed(0)}</span>
            </div>
            <div style={{ display: 'flex', gap: '4px' }}>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, i) => (
                <div key={day} style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{ height: '40px', backgroundColor: i < 3 ? `${theme.primary}30` : theme.bgInput, borderRadius: '6px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', marginBottom: '4px' }}>
                    {i < 3 && <div style={{ width: '100%', height: `${[70, 90, 60][i]}%`, backgroundColor: theme.primary, borderRadius: '6px' }} />}
                  </div>
                  <span style={{ fontSize: '11px', color: i < 3 ? theme.text : theme.textMuted }}>{day}</span>
                </div>
              ))}
            </div>
          </Card>

          <div style={{ display: 'flex', gap: '10px' }}>
            <Button variant="secondary" fullWidth onClick={() => navigateTo('wallet')}>View Wallet</Button>
            <Button fullWidth onClick={() => navigateTo('dashboard')}>Back to Home</Button>
          </div>
        </div>
      </div>
    );
  };

  // ============================================
  // STOCK
  // ============================================
  const StockScreen = () => {
    const handleScanClick = () => {
      if (cameraPermission) {
        setScannerStep('ready');
        setShowScannerOverlay(true);
      } else {
        setShowCameraPermissionModal(true);
      }
    };
    
    const handleScanCapture = () => {
      setScannerStep('scanning');
      setTimeout(() => {
        setScannerStep('found');
        setTimeout(() => {
          const newCount = scanCount + 1;
          setScanCount(newCount);
          if (newCount >= 4 && scannerExpanded) setScannerExpanded(false);
          setShowScannerOverlay(false);
          showToast('205/55R16 Continental added to Van stock');
        }, 1500);
      }, 1200);
    };
    
    const showFullScanner = scanCount < 4 || scannerExpanded;
    
    return (
      <div style={{ minHeight: '100vh', backgroundColor: theme.bg, paddingBottom: '100px' }}>
        <Toast />
        <Header title="Stock Management" />
        <div style={{ padding: '0 16px 16px' }}>

          {/* TEMP: +/- to preview collapsed state */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '12px' }}>
            <button onClick={() => setScanCount(Math.max(0, scanCount - 1))} style={{ width: '36px', height: '36px', borderRadius: '8px', border: `1px solid ${theme.border}`, backgroundColor: theme.bgInput, color: theme.text, fontSize: '18px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
            <span style={{ color: theme.textMuted, fontSize: '13px' }}>Scans: {scanCount} {scanCount < 4 ? `(collapses at 4)` : '(collapsed)'}</span>
            <button onClick={() => { const n = scanCount + 1; setScanCount(n); if (n >= 4 && scannerExpanded) setScannerExpanded(false); }} style={{ width: '36px', height: '36px', borderRadius: '8px', border: `1px solid ${theme.border}`, backgroundColor: theme.bgInput, color: theme.text, fontSize: '18px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
          </div>

          {/* SCANNER — collapses after 4 uses, expandable */}
          {showFullScanner ? (
            <Card style={{ borderColor: theme.primary, borderWidth: '2px', marginBottom: '16px' }}>
              {scanCount >= 4 && (
                <button onClick={() => setScannerExpanded(false)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', background: 'none', border: 'none', cursor: 'pointer', padding: '0 0 8px 0', width: '100%' }}>
                  <span style={{ fontSize: '12px', color: theme.textMuted }}>Collapse</span>
                  <Minus size={14} color={theme.textMuted} style={{ marginLeft: '4px' }} />
                </button>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '14px' }}>
                <div style={{ width: '56px', height: '56px', backgroundColor: `${theme.primary}15`, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Scan size={28} color={theme.primary} /></div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: 0, color: theme.text, fontWeight: '700', fontSize: '16px' }}>Scan Tyre to Add Stock</h3>
                  <p style={{ margin: '4px 0 0 0', color: theme.textMuted, fontSize: '13px', lineHeight: 1.5 }}>Point your camera at the <strong style={{ color: theme.text }}>tyre label first</strong>. If there's no label, scan the sidewall instead. TYRE-FIT reads the size, brand, and DOT code automatically.</p>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', padding: '12px', backgroundColor: theme.bgInput, borderRadius: '10px', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle size={15} color={theme.primary} /><span style={{ color: theme.text, fontSize: '13px' }}>Scans tyre label or sidewall (e.g. 205/55R16)</span></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle size={15} color={theme.primary} /><span style={{ color: theme.text, fontSize: '13px' }}>Adds to your van or depot stock instantly</span></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle size={15} color={theme.primary} /><span style={{ color: theme.text, fontSize: '13px' }}>Stock levels feed into quotes and route ETAs</span></div>
              </div>
              <Button onClick={handleScanClick} icon={Camera}>Scan a Tyre Now</Button>
            </Card>
          ) : (
            <Card style={{ borderColor: theme.primary, marginBottom: '16px', padding: '12px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button onClick={handleScanClick} style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  <div style={{ width: '40px', height: '40px', backgroundColor: `${theme.primary}15`, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Scan size={20} color={theme.primary} /></div>
                  <div style={{ flex: 1, textAlign: 'left' }}>
                    <p style={{ margin: 0, color: theme.text, fontWeight: '600', fontSize: '15px' }}>Scan tyre label or sidewall</p>
                    <p style={{ margin: '2px 0 0 0', color: theme.textMuted, fontSize: '12px' }}>{scanCount} tyres scanned</p>
                  </div>
                  <Camera size={20} color={theme.primary} />
                </button>
                <button onClick={() => setScannerExpanded(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}>
                  <Info size={16} color={theme.textMuted} />
                </button>
              </div>
            </Card>
          )}

          {/* STATS */}
          <Card><div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}><div><p style={{ margin: 0, color: theme.textMuted, fontSize: '14px' }}>Total Tyres</p><p style={{ margin: '4px 0 0 0', color: theme.text, fontSize: '24px', fontWeight: '700' }}>26</p></div><div style={{ width: '1px', backgroundColor: theme.border }} /><div><p style={{ margin: 0, color: theme.textMuted, fontSize: '14px' }}>Fitted This Week</p><p style={{ margin: '4px 0 0 0', color: theme.primary, fontSize: '24px', fontWeight: '700' }}>23</p></div></div></Card>
        </div>

        {/* LOCATION FILTER + DOWNLOAD */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 16px 12px' }}>
          <div style={{ display: 'flex', gap: '8px', flex: 1, overflowX: 'auto' }}>
            {['all', 'Van', 'East London Depot'].map(loc => (
              <button key={loc} onClick={() => setStockLocation(loc)} style={{ padding: '10px 16px', backgroundColor: stockLocation === loc ? theme.primary : theme.bgInput, border: 'none', borderRadius: '8px', color: stockLocation === loc ? '#000' : theme.textMuted, fontWeight: '500', cursor: 'pointer', whiteSpace: 'nowrap' }}>{loc === 'all' ? 'All Stock' : loc}</button>
            ))}
          </div>
          <button onClick={() => showToast('Stock list downloaded as PDF')} style={{ padding: '10px', backgroundColor: theme.bgInput, border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Download size={18} color={theme.textMuted} /></button>
        </div>

        {/* DEPOT PICKUP NEEDED — only show if bookings need depot tyres */}
        {mockUpcomingBookingsNeedingStock.length > 0 && (stockLocation === 'all' || stockLocation === 'East London Depot') && (
          <div style={{ padding: '0 16px 16px' }}>
            <Card style={{ borderColor: theme.warning, borderWidth: '2px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <div style={{ width: '40px', height: '40px', backgroundColor: `${theme.warning}15`, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Building size={20} color={theme.warning} /></div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: 0, color: theme.warning, fontWeight: '700', fontSize: '15px' }}>Depot Pickup Needed</h3>
                  <p style={{ margin: '2px 0 0 0', color: theme.textMuted, fontSize: '13px' }}>{mockUpcomingBookingsNeedingStock.length} upcoming jobs need tyres from depot</p>
                </div>
              </div>
              {mockUpcomingBookingsNeedingStock.map(b => (
                <div key={b.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderTop: `1px solid ${theme.border}` }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ color: theme.text, fontWeight: '600', fontSize: '14px' }}>{b.customer}</span>
                      <span style={{ color: theme.textMuted, fontSize: '12px' }}>• {b.plate}</span>
                    </div>
                    <p style={{ margin: '2px 0 0 0', color: theme.textMuted, fontSize: '13px' }}>{b.tyreSize} x{b.qty} — <strong style={{ color: theme.warning }}>{b.location}</strong></p>
                    <p style={{ margin: '2px 0 0 0', color: theme.textSubtle, fontSize: '12px' }}>{b.date}</p>
                  </div>
                </div>
              ))}
              <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                <Button variant="secondary" size="small" fullWidth icon={Download} onClick={() => showToast('Pickup list downloaded')}>Download List</Button>
                <Button size="small" fullWidth icon={Navigation} onClick={() => {
                  setPendingDepotStop({ name: 'East London Depot', address: '42 Industrial Way, E15 2RQ', reason: `${mockUpcomingBookingsNeedingStock.length} tyres needed for upcoming jobs`, tyres: mockUpcomingBookingsNeedingStock.map(b => `${b.tyreSize} x${b.qty} (${b.customer})`) });
                  setShowDepotRouteModal(true);
                }}>Add to Route</Button>
              </div>
            </Card>
          </div>
        )}

        {/* DEPOT ROUTE MODAL */}
        {showDepotRouteModal && pendingDepotStop && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', zIndex: 2000 }}>
            <Card style={{ maxWidth: '400px', width: '100%' }}>
              <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                <div style={{ width: '64px', height: '64px', backgroundColor: `${theme.warning}15`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}><Building size={32} color={theme.warning} /></div>
                <h3 style={{ margin: '0 0 8px 0', color: theme.text, fontWeight: '700', fontSize: '18px' }}>Add Depot to Your Route?</h3>
                <p style={{ margin: 0, color: theme.textMuted, fontSize: '14px', lineHeight: 1.5 }}>{pendingDepotStop.name} — {pendingDepotStop.reason}</p>
              </div>

              {/* What you're picking up */}
              <div style={{ padding: '12px', backgroundColor: theme.bgInput, borderRadius: '10px', marginBottom: '16px' }}>
                <p style={{ margin: '0 0 8px 0', color: theme.textMuted, fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>Tyres to collect</p>
                {pendingDepotStop.tyres.map((t, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 0' }}>
                    <Package size={14} color={theme.primary} />
                    <span style={{ color: theme.text, fontSize: '13px' }}>{t}</span>
                  </div>
                ))}
              </div>

              {/* When to go */}
              <p style={{ margin: '0 0 12px 0', color: theme.textMuted, fontSize: '13px', fontWeight: '600', textTransform: 'uppercase' }}>When should you go?</p>

              <button onClick={() => setPendingDepotStop({ ...pendingDepotStop, timing: 'before-first' })} style={{ width: '100%', padding: '14px 16px', backgroundColor: pendingDepotStop.timing === 'before-first' ? `${theme.primary}15` : theme.bgInput, border: `2px solid ${pendingDepotStop.timing === 'before-first' ? theme.primary : theme.border}`, borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px', textAlign: 'left' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: `2px solid ${pendingDepotStop.timing === 'before-first' ? theme.primary : theme.border}`, backgroundColor: pendingDepotStop.timing === 'before-first' ? theme.primary : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{pendingDepotStop.timing === 'before-first' && <Check size={14} color="#000" />}</div>
                <div>
                  <p style={{ margin: 0, color: theme.text, fontWeight: '600', fontSize: '15px' }}>Before my first job</p>
                  <p style={{ margin: '4px 0 0 0', color: theme.textMuted, fontSize: '13px' }}>Collect everything in one go. Leave a bit earlier.</p>
                </div>
              </button>

              <button onClick={() => setPendingDepotStop({ ...pendingDepotStop, timing: 'before-needed' })} style={{ width: '100%', padding: '14px 16px', backgroundColor: pendingDepotStop.timing === 'before-needed' ? `${theme.primary}15` : theme.bgInput, border: `2px solid ${pendingDepotStop.timing === 'before-needed' ? theme.primary : theme.border}`, borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px', textAlign: 'left' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: `2px solid ${pendingDepotStop.timing === 'before-needed' ? theme.primary : theme.border}`, backgroundColor: pendingDepotStop.timing === 'before-needed' ? theme.primary : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{pendingDepotStop.timing === 'before-needed' && <Check size={14} color="#000" />}</div>
                <div>
                  <p style={{ margin: 0, color: theme.text, fontWeight: '600', fontSize: '15px' }}>Before the job that needs it</p>
                  <p style={{ margin: '4px 0 0 0', color: theme.textMuted, fontSize: '13px' }}>AI slots depot stop just before Tom Harris (11:45). Route auto-adjusts.</p>
                </div>
              </button>

              <button onClick={() => setPendingDepotStop({ ...pendingDepotStop, timing: 'manual' })} style={{ width: '100%', padding: '14px 16px', backgroundColor: pendingDepotStop.timing === 'manual' ? `${theme.primary}15` : theme.bgInput, border: `2px solid ${pendingDepotStop.timing === 'manual' ? theme.primary : theme.border}`, borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', textAlign: 'left' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: `2px solid ${pendingDepotStop.timing === 'manual' ? theme.primary : theme.border}`, backgroundColor: pendingDepotStop.timing === 'manual' ? theme.primary : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{pendingDepotStop.timing === 'manual' && <Check size={14} color="#000" />}</div>
                <div>
                  <p style={{ margin: 0, color: theme.text, fontWeight: '600', fontSize: '15px' }}>Just open Maps for now</p>
                  <p style={{ margin: '4px 0 0 0', color: theme.textMuted, fontSize: '13px' }}>Navigate to depot without updating your route.</p>
                </div>
              </button>

              <Button disabled={!pendingDepotStop.timing} onClick={() => {
                if (pendingDepotStop.timing !== 'manual') {
                  setDepotStops(prev => [...prev, { ...pendingDepotStop, id: Date.now() }]);
                }
                setShowDepotRouteModal(false);
                setPendingDepotStop(null);
                showToast(pendingDepotStop.timing === 'manual' ? 'Opening Google Maps...' : pendingDepotStop.timing === 'before-first' ? 'Depot added before first job' : 'Depot added before Tom Harris');
              }} icon={pendingDepotStop.timing === 'manual' ? Navigation : Route}>
                {pendingDepotStop.timing === 'manual' ? 'Open Google Maps' : 'Add Depot to Route'}
              </Button>
              <button onClick={() => { setShowDepotRouteModal(false); setPendingDepotStop(null); }} style={{ width: '100%', padding: '12px', background: 'none', border: 'none', color: theme.textMuted, cursor: 'pointer', fontSize: '14px', marginTop: '8px' }}>Cancel</button>
            </Card>
          </div>
        )}

        {/* STOCK LIST */}
        <div style={{ padding: '0 16px' }}>
          {mockStock.filter(s => stockLocation === 'all' || s.location === stockLocation).map(item => (
            <Card key={item.id} style={item.qty === 0 ? { borderColor: theme.danger } : item.needsRestock ? { borderColor: theme.warning } : {}}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: 0, color: theme.text, fontWeight: '700', fontSize: '18px' }}>{item.size}</h3>
                  <p style={{ margin: '4px 0 8px 0', color: theme.textMuted }}>{item.brand}</p>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    <Badge variant={item.location === 'Van' ? 'success' : 'info'}>{item.location}</Badge>
                    {item.qty === 0 && <Badge variant="danger">Out of stock</Badge>}
                    {item.qty > 0 && item.needsRestock && <Badge variant="warning">Running low</Badge>}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ margin: 0, color: item.qty === 0 ? theme.danger : theme.text, fontSize: '32px', fontWeight: '700' }}>{item.qty}</p>
                  <p style={{ margin: 0, color: theme.textMuted, fontSize: '14px' }}>in stock</p>
                </div>
              </div>
              {(item.qty === 0 || item.needsRestock) && (
                <div style={{ marginTop: '10px', padding: '8px 10px', backgroundColor: theme.bgInput, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={13} color={item.brand === 'Michelin' || item.brand === 'Continental' ? theme.warning : theme.primary} />
                    <span style={{ color: theme.textMuted, fontSize: '12px' }}>
                      {item.brand === 'Michelin' || item.brand === 'Continental' ? 'Premium — 24hr order (weekdays)' : 'Budget/Mid — same day order'}
                    </span>
                  </div>
                  <button onClick={() => showToast(`Reorder placed for ${item.size}`)} style={{ padding: '4px 10px', backgroundColor: theme.primary, border: 'none', borderRadius: '6px', cursor: 'pointer', color: '#000', fontSize: '12px', fontWeight: '600' }}>Reorder</button>
                </div>
              )}
            </Card>
          ))}

          {/* DOWNLOAD FULL STOCK LIST */}
          <Card style={{ marginTop: '8px' }}>
            <button onClick={() => showToast('Full stock list downloaded as PDF')} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              <div style={{ width: '44px', height: '44px', backgroundColor: `${theme.info}15`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Download size={22} color={theme.info} /></div>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <p style={{ margin: 0, color: theme.text, fontWeight: '600', fontSize: '15px' }}>Download Stock List</p>
                <p style={{ margin: '2px 0 0 0', color: theme.textMuted, fontSize: '13px' }}>PDF with all sizes, quantities, and locations. Handy for booking prep or depot runs.</p>
              </div>
              <ChevronRight size={20} color={theme.textMuted} />
            </button>
          </Card>
        </div>
        {/* SCANNER OVERLAY */}
        {showScannerOverlay && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: '#000', zIndex: 3000, display: 'flex', flexDirection: 'column' }}>
            {/* Top bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', paddingTop: '48px' }}>
              <button onClick={() => setShowScannerOverlay(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '16px', fontWeight: '500' }}><X size={24} /> Close</button>
              <span style={{ color: '#fff', fontSize: '14px', opacity: 0.7 }}>TYRE-FIT Scanner</span>
            </div>

            {/* Viewfinder area */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              {/* Simulated camera bg */}
              <div style={{ width: '90%', maxWidth: '360px', aspectRatio: '4/3', backgroundColor: '#1a1a1a', borderRadius: '16px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* Viewfinder corners */}
                <div style={{ position: 'absolute', top: '16px', left: '16px', width: '40px', height: '40px', borderTop: '3px solid #10b981', borderLeft: '3px solid #10b981', borderRadius: '4px 0 0 0' }} />
                <div style={{ position: 'absolute', top: '16px', right: '16px', width: '40px', height: '40px', borderTop: '3px solid #10b981', borderRight: '3px solid #10b981', borderRadius: '0 4px 0 0' }} />
                <div style={{ position: 'absolute', bottom: '16px', left: '16px', width: '40px', height: '40px', borderBottom: '3px solid #10b981', borderLeft: '3px solid #10b981', borderRadius: '0 0 0 4px' }} />
                <div style={{ position: 'absolute', bottom: '16px', right: '16px', width: '40px', height: '40px', borderBottom: '3px solid #10b981', borderRight: '3px solid #10b981', borderRadius: '0 0 4px 0' }} />

                {/* Scan line animation */}
                {scannerStep === 'scanning' && (
                  <div style={{ position: 'absolute', left: '20px', right: '20px', height: '2px', backgroundColor: '#10b981', boxShadow: '0 0 12px #10b981', top: '50%', animation: 'none' }} />
                )}

                {/* Center content based on state */}
                {scannerStep === 'ready' && (
                  <div style={{ textAlign: 'center', padding: '20px' }}>
                    <div style={{ width: '64px', height: '64px', border: '2px dashed rgba(255,255,255,0.3)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                      <Camera size={28} color="rgba(255,255,255,0.5)" />
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', margin: 0 }}>Position tyre label or sidewall in frame</p>
                  </div>
                )}
                {scannerStep === 'scanning' && (
                  <div style={{ textAlign: 'center' }}>
                    <RefreshCw size={32} color="#10b981" style={{ animation: 'none' }} />
                    <p style={{ color: '#10b981', fontSize: '14px', margin: '12px 0 0 0', fontWeight: '600' }}>Reading tyre info...</p>
                  </div>
                )}
                {scannerStep === 'found' && (
                  <div style={{ textAlign: 'center', padding: '16px' }}>
                    <CheckCircle size={40} color="#10b981" />
                    <p style={{ color: '#10b981', fontSize: '18px', margin: '12px 0 4px 0', fontWeight: '700' }}>205/55R16</p>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', margin: 0 }}>Continental PremiumContact 6</p>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', margin: '4px 0 0 0' }}>DOT 2425 • Added to Van stock</p>
                  </div>
                )}
              </div>
            </div>

            {/* Tip banner */}
            <div style={{ padding: '0 20px 12px' }}>
              <div style={{ backgroundColor: 'rgba(16,185,129,0.15)', borderRadius: '12px', padding: '12px 16px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <Info size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <p style={{ margin: 0, color: '#10b981', fontSize: '13px', fontWeight: '600' }}>Tip: Scan the label first</p>
                  <p style={{ margin: '4px 0 0 0', color: 'rgba(255,255,255,0.5)', fontSize: '12px', lineHeight: 1.5 }}>The sticker label on new tyres gives the cleanest read. Only use the sidewall if the label's been removed.</p>
                </div>
              </div>
            </div>

            {/* Bottom controls */}
            <div style={{ padding: '0 20px 48px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {scannerStep === 'ready' && (
                <button onClick={handleScanCapture} style={{ width: '72px', height: '72px', borderRadius: '50%', border: '4px solid #fff', backgroundColor: 'transparent', cursor: 'pointer', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                </button>
              )}
              {scannerStep === 'ready' && (
                <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '12px', margin: 0 }}>Tap to scan • Adds to your stock automatically</p>
              )}
            </div>
          </div>
        )}

        {showCameraPermissionModal && (
          <Modal title="Camera Access Required" onClose={() => setShowCameraPermissionModal(false)}>
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <div style={{ width: '64px', height: '64px', backgroundColor: '#8b5cf620', borderRadius: '50%', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Camera size={32} color="#8b5cf6" /></div>
              <p style={{ color: theme.textMuted, margin: 0 }}>TYRE-FIT needs camera access to scan tyre sidewalls and capture job photos.</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px', padding: '12px', backgroundColor: theme.bgInput, borderRadius: '8px' }}>
              {[{ icon: Scan, text: 'Read tyre size, brand & DOT from sidewall' }, { icon: Package, text: 'Add stock to van or depot instantly' }, { icon: Shield, text: 'Before/after photos for dispute protection' }].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><item.icon size={16} color={theme.primary} /><span style={{ color: theme.text, fontSize: '14px' }}>{item.text}</span></div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Button variant="secondary" onClick={() => setShowCameraPermissionModal(false)} fullWidth>Not Now</Button>
              <Button onClick={() => { setCameraPermission(true); setShowCameraPermissionModal(false); showToast('Camera enabled — point at tyre sidewall...'); }} fullWidth icon={Camera}>Allow Camera</Button>
            </div>
          </Modal>
        )}
        <BottomNav />
      </div>
    );
  };

  // ============================================
  // REVIEWS
  // ============================================
  const ReviewsScreen = () => {
    const [reviewFilter, setReviewFilter] = useState('all');
    const avgRating = (mockReviews.reduce((sum, r) => sum + r.rating, 0) / mockReviews.length).toFixed(1);
    const needsResponse = mockReviews.filter(r => !r.responded).length;
    const responseRate = Math.round((mockReviews.filter(r => r.responded).length / mockReviews.length) * 100);
    const fiveStarCount = mockReviews.filter(r => r.rating === 5).length;
    const thisMonth = mockReviews.filter(r => r.date.includes('day')).length;
    const filtered = reviewFilter === 'all' ? mockReviews : reviewFilter === 'needs-response' ? mockReviews.filter(r => !r.responded) : mockReviews.filter(r => r.rating <= 3);
    
    return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.bg, paddingBottom: '100px' }}>
      <Toast />
      <Header title="Reviews & Reputation" />
      <div style={{ padding: '16px' }}>
        
        {/* STATS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '16px' }}>
          <Card style={{ marginBottom: 0 }}>
            <p style={{ margin: 0, color: theme.textMuted, fontSize: '12px', textTransform: 'uppercase', fontWeight: '600' }}>Average Rating</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
              <span style={{ color: theme.text, fontSize: '28px', fontWeight: '700' }}>{avgRating}</span>
              <Star size={22} fill="#eab308" color="#eab308" />
            </div>
            <p style={{ margin: '2px 0 0 0', color: theme.textMuted, fontSize: '12px' }}>127 total on Google</p>
          </Card>
          <Card style={{ marginBottom: 0 }}>
            <p style={{ margin: 0, color: theme.textMuted, fontSize: '12px', textTransform: 'uppercase', fontWeight: '600' }}>This Month</p>
            <p style={{ margin: '4px 0 0 0', color: theme.primary, fontSize: '28px', fontWeight: '700' }}>{thisMonth}</p>
            <p style={{ margin: '2px 0 0 0', color: theme.textMuted, fontSize: '12px' }}>vs 4 last month</p>
          </Card>
          <Card style={{ marginBottom: 0 }}>
            <p style={{ margin: 0, color: theme.textMuted, fontSize: '12px', textTransform: 'uppercase', fontWeight: '600' }}>Response Rate</p>
            <p style={{ margin: '4px 0 0 0', color: responseRate >= 80 ? theme.primary : theme.warning, fontSize: '28px', fontWeight: '700' }}>{responseRate}%</p>
            <p style={{ margin: '2px 0 0 0', color: theme.textMuted, fontSize: '12px' }}>Google ranks responders higher</p>
          </Card>
          <Card style={{ marginBottom: 0 }}>
            <p style={{ margin: 0, color: theme.textMuted, fontSize: '12px', textTransform: 'uppercase', fontWeight: '600' }}>5-Star Rate</p>
            <p style={{ margin: '4px 0 0 0', color: theme.text, fontSize: '28px', fontWeight: '700' }}>{Math.round((fiveStarCount / mockReviews.length) * 100)}%</p>
            <p style={{ margin: '2px 0 0 0', color: theme.textMuted, fontSize: '12px' }}>{fiveStarCount} of {mockReviews.length} reviews</p>
          </Card>
        </div>
        
        {/* NEEDS RESPONSE ALERT */}
        {needsResponse > 0 && (
          <Card style={{ marginBottom: '16px', borderColor: theme.warning, borderWidth: '2px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '44px', height: '44px', backgroundColor: `${theme.warning}15`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <MessageSquare size={22} color={theme.warning} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, color: theme.text, fontWeight: '600', fontSize: '15px' }}>{needsResponse} review{needsResponse > 1 ? 's' : ''} need{needsResponse === 1 ? 's' : ''} a response</p>
                <p style={{ margin: '4px 0 0 0', color: theme.textMuted, fontSize: '13px' }}>Responding boosts your ranking and shows customers you care</p>
              </div>
            </div>
          </Card>
        )}
        
        {/* FILTER */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          {[
            { key: 'all', label: `All (${mockReviews.length})` },
            { key: 'needs-response', label: `Needs Response (${needsResponse})` },
            { key: 'low', label: `Low Rating (${mockReviews.filter(r => r.rating <= 3).length})` }
          ].map(f => (
            <button key={f.key} onClick={() => setReviewFilter(f.key)} style={{ padding: '8px 14px', backgroundColor: reviewFilter === f.key ? theme.primary : theme.bgInput, border: 'none', borderRadius: '20px', color: reviewFilter === f.key ? '#000' : theme.textMuted, fontWeight: '600', fontSize: '13px', cursor: 'pointer', whiteSpace: 'nowrap' }}>{f.label}</button>
          ))}
        </div>
        
        {/* REVIEW LIST */}
        {filtered.map(r => (
          <Card key={r.id} style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div>
                <h3 style={{ margin: 0, color: theme.text, fontWeight: '600' }}>{r.name}</h3>
                <p style={{ margin: '4px 0 0 0', color: theme.textMuted, fontSize: '13px' }}>{r.date}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill={i < r.rating ? '#eab308' : 'none'} color={i < r.rating ? '#eab308' : theme.textMuted} />)}
              </div>
            </div>
            <p style={{ margin: '0 0 12px 0', color: theme.text, lineHeight: '1.5', fontSize: '15px' }}>{r.text}</p>
            
            {r.responded && r.response && (
              <div style={{ padding: '10px 12px', backgroundColor: theme.bgInput, borderRadius: '8px', marginBottom: '10px', borderLeft: `3px solid ${theme.primary}` }}>
                <p style={{ margin: '0 0 4px 0', color: theme.textMuted, fontSize: '12px', fontWeight: '600' }}>Your Response</p>
                <p style={{ margin: 0, color: theme.text, fontSize: '14px', lineHeight: 1.5 }}>{r.response}</p>
              </div>
            )}
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Badge variant={r.responded ? 'success' : 'warning'}>{r.responded ? 'Responded' : 'Needs Response'}</Badge>
              {!r.responded && <Button size="small" fullWidth={false} onClick={() => { setSelectedReview(r); setReviewResponse(''); setShowReviewModal(true); }}>Respond</Button>}
            </div>
          </Card>
        ))}
      </div>
      
      {showReviewModal && selectedReview && (
        <Modal title="Respond to Review" onClose={() => setShowReviewModal(false)}>
          <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: theme.bgInput, borderRadius: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontWeight: '600', color: theme.text }}>{selectedReview.name}</span>
              <div style={{ display: 'flex' }}>{[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < selectedReview.rating ? '#eab308' : 'none'} color={i < selectedReview.rating ? '#eab308' : theme.textMuted} />)}</div>
            </div>
            <p style={{ margin: 0, color: theme.textMuted, fontSize: '14px' }}>{selectedReview.text}</p>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '14px', color: theme.textMuted, marginBottom: '8px' }}>Your Response</label>
            <textarea placeholder="Thank you for your feedback..." value={reviewResponse} onChange={(e) => setReviewResponse(e.target.value)} style={{ width: '100%', minHeight: '100px', backgroundColor: theme.bgInput, border: `1px solid ${theme.border}`, borderRadius: '12px', padding: '16px', fontSize: '16px', color: theme.text, outline: 'none', boxSizing: 'border-box', resize: 'vertical', fontFamily: 'inherit' }} />
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Button variant="secondary" onClick={() => setShowReviewModal(false)} fullWidth>Cancel</Button>
            <Button onClick={() => { setShowReviewModal(false); showToast('Response posted to Google'); }} fullWidth icon={Send} disabled={!reviewResponse.trim()}>Post to Google</Button>
          </div>
        </Modal>
      )}
      <BottomNav />
    </div>
    );
  };

  // ============================================
  // EMERGENCY - With override option
  // ============================================
  // CUSTOMER COVER — RETENTION DASHBOARD
  // ============================================
  const EmergencyScreen = () => {
    const [coverFilter, setCoverFilter] = useState('all');
    const [selectedCoverCustomer, setSelectedCoverCustomer] = useState(null);
    const [coverMessageType, setCoverMessageType] = useState(null); // 'replacement', 'checkup', 'review'
    const [showBulkMessage, setShowBulkMessage] = useState(false);
    
    const activeCount = mockCoverCustomers.filter(c => c.status === 'active').length;
    const expiringCount = mockCoverCustomers.filter(c => c.status === 'expiring').length;
    const expiredCount = mockCoverCustomers.filter(c => c.status === 'expired').length;
    const activeCoverCount = mockCoverCustomers.filter(c => c.status === 'active' || c.status === 'expiring').length;
    const reviewRate = Math.round((mockCoverCustomers.filter(c => c.reviewLeft).length / mockCoverCustomers.length) * 100);
    const coverJobsTotal = mockCoverCustomers.reduce((sum, c) => sum + c.coverJobsDone, 0);
    
    const filtered = coverFilter === 'all' ? mockCoverCustomers : mockCoverCustomers.filter(c => c.status === coverFilter);
    
    const statusColor = (s) => s === 'active' ? theme.primary : s === 'expiring' ? theme.warning : theme.textMuted;
    const statusLabel = (s) => s === 'active' ? 'Active' : s === 'expiring' ? 'Expiring Soon' : 'Expired';
    const conditionColor = (c) => c === 'Good' ? theme.primary : c === 'Fair' ? theme.warning : c === 'Worn' ? theme.danger : theme.textMuted;
    
    return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.bg, paddingBottom: '100px' }}>
      <Toast />
      <Header title="Customer Cover" subtitle="Your retention dashboard" />
      <div style={{ padding: '16px' }}>
        
        {/* INCOMING COVER NETWORK ALERTS */}
        {coverJobs.length > 0 && (
          <Card style={{ borderColor: theme.danger, marginBottom: '16px', borderWidth: '2px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: `${theme.danger}15`, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Zap size={20} color={theme.danger} />
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '15px', fontWeight: '700', color: theme.text }}>Cover Network Alerts</span>
                <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: theme.textMuted }}>Customers covered by TYRE-FIT need help nearby</p>
              </div>
              <Badge variant="danger">{coverJobs.length}</Badge>
            </div>
            {coverJobs.map(cj => (
              <div key={cj.id} style={{ padding: '12px', backgroundColor: theme.bgInput, borderRadius: '10px', marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontWeight: '600', color: theme.text, fontSize: '14px' }}>{cj.name} — {cj.plate}</span>
                  <span style={{ fontSize: '12px', color: theme.textMuted }}>{cj.distance}</span>
                </div>
                <p style={{ margin: '0 0 4px 0', color: theme.textMuted, fontSize: '13px' }}>{cj.issue} — {cj.tyreSize}</p>
                <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: theme.primary, fontWeight: '500' }}>TYRE-FIT pays you directly</p>
                <Button size="small" onClick={() => { setActiveCoverJob(cj); navigateTo('cover-quote'); }}>Accept & Quote</Button>
              </div>
            ))}
          </Card>
        )}

        {/* YOUR EMERGENCY BOOKINGS (fitter's own urgent/same-day jobs) */}
        {(() => {
          const emergencyJobs = mockJobs.filter(j => j.isEmergency);
          if (emergencyJobs.length === 0) return null;
          return (
            <Card style={{ borderColor: theme.warning, marginBottom: '16px', borderWidth: '2px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <div style={{ width: '40px', height: '40px', backgroundColor: `${theme.warning}15`, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <AlertTriangle size={20} color={theme.warning} />
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '15px', fontWeight: '700', color: theme.text }}>Your Urgent Bookings</span>
                  <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: theme.textMuted }}>Same-day and emergency jobs you booked</p>
                </div>
                <Badge variant="warning">{emergencyJobs.length}</Badge>
              </div>
              {emergencyJobs.map(j => (
                <div key={j.id} style={{ padding: '12px', backgroundColor: theme.bgInput, borderRadius: '10px', marginBottom: '8px' }}>
                  <span style={{ fontWeight: '600', color: theme.text, fontSize: '14px' }}>{j.customer} — {j.plate}</span>
                  <p style={{ margin: '4px 0 0 0', color: theme.textMuted, fontSize: '13px' }}>{j.location} — {j.eta}</p>
                </div>
              ))}
            </Card>
          );
        })()}

        {/* STATS ROW */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '16px' }}>
          <Card style={{ marginBottom: 0 }}>
            <p style={{ margin: 0, color: theme.textMuted, fontSize: '12px', textTransform: 'uppercase', fontWeight: '600' }}>Active Cover</p>
            <p style={{ margin: '4px 0 0 0', color: theme.primary, fontSize: '28px', fontWeight: '700' }}>{activeCount + expiringCount}</p>
            <p style={{ margin: '2px 0 0 0', color: theme.textMuted, fontSize: '12px' }}>{expiringCount > 0 ? `${expiringCount} expiring soon` : 'All healthy'}</p>
          </Card>
          <Card style={{ marginBottom: 0 }}>
            <p style={{ margin: 0, color: theme.textMuted, fontSize: '12px', textTransform: 'uppercase', fontWeight: '600' }}>Covered Vehicles</p>
            <p style={{ margin: '4px 0 0 0', color: theme.primary, fontSize: '28px', fontWeight: '700' }}>{activeCoverCount}</p>
            <p style={{ margin: '2px 0 0 0', color: theme.textMuted, fontSize: '12px' }}>Auto-covered at job close</p>
          </Card>
          <Card style={{ marginBottom: 0 }}>
            <p style={{ margin: 0, color: theme.textMuted, fontSize: '12px', textTransform: 'uppercase', fontWeight: '600' }}>Review Rate</p>
            <p style={{ margin: '4px 0 0 0', color: reviewRate >= 60 ? theme.primary : theme.warning, fontSize: '28px', fontWeight: '700' }}>{reviewRate}%</p>
            <p style={{ margin: '2px 0 0 0', color: theme.textMuted, fontSize: '12px' }}>Left a Google review</p>
          </Card>
          <Card style={{ marginBottom: 0 }}>
            <p style={{ margin: 0, color: theme.textMuted, fontSize: '12px', textTransform: 'uppercase', fontWeight: '600' }}>Cover Jobs</p>
            <p style={{ margin: '4px 0 0 0', color: theme.text, fontSize: '28px', fontWeight: '700' }}>{coverJobsTotal}</p>
            <p style={{ margin: '2px 0 0 0', color: theme.textMuted, fontSize: '12px' }}>Emergency callouts handled</p>
          </Card>
        </div>
        
        {/* EXPIRING ALERT */}
        {expiringCount > 0 && (
          <Card style={{ marginBottom: '16px', borderColor: theme.warning, borderWidth: '2px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '44px', height: '44px', backgroundColor: `${theme.warning}15`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <AlertTriangle size={22} color={theme.warning} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, color: theme.text, fontWeight: '600', fontSize: '15px' }}>{expiringCount} customer{expiringCount > 1 ? 's' : ''} expiring soon</p>
                <p style={{ margin: '4px 0 0 0', color: theme.textMuted, fontSize: '13px', lineHeight: 1.4 }}>Send a check-up offer before their cover runs out — great excuse to rebook</p>
              </div>
            </div>
          </Card>
        )}
        
        {/* FILTER TABS */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', overflowX: 'auto' }}>
          {[
            { key: 'all', label: `All (${mockCoverCustomers.length})` },
            { key: 'active', label: `Active (${activeCount})` },
            { key: 'expiring', label: `Expiring (${expiringCount})` },
            { key: 'expired', label: `Expired (${expiredCount})` }
          ].map(f => (
            <button key={f.key} onClick={() => setCoverFilter(f.key)} style={{ padding: '8px 16px', backgroundColor: coverFilter === f.key ? theme.primary : theme.bgInput, border: 'none', borderRadius: '20px', color: coverFilter === f.key ? '#000' : theme.textMuted, fontWeight: '600', fontSize: '13px', cursor: 'pointer', whiteSpace: 'nowrap' }}>{f.label}</button>
          ))}
        </div>
        
        {/* CUSTOMER LIST */}
        {filtered.map(c => (
          <Card key={c.id} onClick={() => setSelectedCoverCustomer(c)} style={{ cursor: 'pointer', marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
              <div>
                <h3 style={{ margin: 0, color: theme.text, fontWeight: '600', fontSize: '16px' }}>{c.name}</h3>
                <p style={{ margin: '3px 0 0 0', color: theme.textMuted, fontSize: '13px' }}>{c.vehicle} — <span style={{ fontWeight: '700', letterSpacing: '0.5px' }}>{c.plate}</span></p>
              </div>
              <Badge variant={c.status === 'active' ? 'success' : c.status === 'expiring' ? 'warning' : 'default'}>{statusLabel(c.status)}</Badge>
            </div>
            
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
              <div style={{ padding: '5px 10px', backgroundColor: theme.bgInput, borderRadius: '6px', fontSize: '12px', color: theme.textMuted }}>Fitted {c.fittedDate}</div>
              <div style={{ padding: '5px 10px', backgroundColor: theme.bgInput, borderRadius: '6px', fontSize: '12px', color: theme.textMuted }}>Expires {c.expires}</div>
              {c.tyreSize && <div style={{ padding: '5px 10px', backgroundColor: theme.bgInput, borderRadius: '6px', fontSize: '12px', color: theme.textMuted }}>{c.tyreSize}</div>}
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {/* Cover Status */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck size={14} color={statusColor(c.status)} />
                <span style={{ fontSize: '12px', color: statusColor(c.status) }}>{statusLabel(c.status)}</span>
              </div>
              {/* Review */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                {c.reviewLeft ? <Star size={14} color="#eab308" /> : <Star size={14} color={theme.textMuted} />}
                <span style={{ fontSize: '12px', color: c.reviewLeft ? '#eab308' : theme.textMuted }}>{c.reviewLeft ? `${c.reviewStars} stars` : 'No review'}</span>
              </div>
              {/* Tyre condition */}
              {c.treadDepth && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Activity size={14} color={conditionColor(c.tyreCondition)} />
                  <span style={{ fontSize: '12px', color: conditionColor(c.tyreCondition) }}>{c.treadDepth}</span>
                </div>
              )}
              <ChevronRight size={16} color={theme.textMuted} style={{ marginLeft: 'auto' }} />
            </div>
          </Card>
        ))}
        
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <ShieldCheck size={40} color={theme.textMuted} />
            <p style={{ color: theme.textMuted, marginTop: '12px' }}>No customers in this category</p>
          </div>
        )}
      </div>
      
      {/* BULK ACTIONS — Download list & Send promotion */}
      <div style={{ padding: '0 16px 16px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => showToast(`CSV downloaded — ${mockCoverCustomers.length} customers`)} style={{ flex: 1, padding: '14px', backgroundColor: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <Download size={16} color={theme.textMuted} />
            <span style={{ color: theme.text, fontSize: '13px', fontWeight: '500' }}>Download List (CSV)</span>
          </button>
          <button onClick={() => setShowBulkMessage(true)} style={{ flex: 1, padding: '14px', backgroundColor: theme.primary, border: 'none', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <MessageSquare size={16} color="#000" />
            <span style={{ color: '#000', fontSize: '13px', fontWeight: '700' }}>Send Promotion</span>
          </button>
        </div>
        <p style={{ margin: '8px 0 0 0', color: theme.textMuted, fontSize: '12px', textAlign: 'center' }}>CSV includes: name, phone, reg, vehicle, cover status, expiry — GDPR compliant</p>
      </div>

      {/* BULK MESSAGE POPUP */}
      {showBulkMessage && (
        <Modal title="Send Promotion to All Customers" onClose={() => setShowBulkMessage(false)}>
          <p style={{ margin: '0 0 12px 0', color: theme.textMuted, fontSize: '14px' }}>Choose a template to send to <strong style={{ color: theme.text }}>{mockCoverCustomers.length} covered customers</strong>:</p>
          
          {[
            { title: 'Seasonal Check Offer', Icon: RainAlert, msg: `Hi [NAME], winter's coming! Book a free tyre check with ${signUpData.businessName || "Dan's Mobile Tyres"} to make sure you're safe on the road: tyre-fit.co/b/[PLATE] — ${signUpData.fullName?.split(' ')[0] || 'Dan'}` },
            { title: 'Loyalty Discount', Icon: Award, msg: `Hi [NAME], as a valued customer, here's 10% off your next tyre fitting with ${signUpData.businessName || "Dan's Mobile Tyres"}. Book here: tyre-fit.co/b/[PLATE] — offer expires in 7 days!` },
            { title: 'MOT Reminder', Icon: Wrench, msg: `Hi [NAME], MOT season is here! Need new tyres before your test? ${signUpData.businessName || "Dan's Mobile Tyres"} can fit them same-day. Book: tyre-fit.co/b/[PLATE]` },
          ].map((tmpl, i) => {
            const TmplIcon = tmpl.Icon;
            return (
            <div key={i} style={{ marginBottom: '10px', padding: '12px', backgroundColor: theme.bgInput, borderRadius: '10px', border: `1px solid ${theme.border}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <TmplIcon size={18} color={theme.primary} />
                <span style={{ color: theme.text, fontWeight: '600', fontSize: '14px' }}>{tmpl.title}</span>
              </div>
              <p style={{ margin: '0 0 10px 0', color: theme.textMuted, fontSize: '12px', lineHeight: 1.5, fontStyle: 'italic' }}>{tmpl.msg}</p>
              <Button size="small" fullWidth onClick={() => { if (confirm(`Send "${tmpl.title}" to ${mockCoverCustomers.length} customers via SMS?`)) { setShowBulkMessage(false); showToast(`${tmpl.title} sent to ${mockCoverCustomers.length} customers`); } }} icon={Send}>Send to {mockCoverCustomers.length} Customers</Button>
            </div>
            );
          })}
          <p style={{ margin: '12px 0 0 0', color: theme.textMuted, fontSize: '11px', lineHeight: 1.5 }}>[NAME] and [PLATE] are replaced with each customer's details. Messages sent via SMS. Customers can opt out anytime.</p>
        </Modal>
      )}

      {/* CUSTOMER DETAIL MODAL */}
      {selectedCoverCustomer && (
        <Modal title={selectedCoverCustomer.name} onClose={() => setSelectedCoverCustomer(null)}>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <p style={{ margin: 0, color: theme.textMuted, fontSize: '14px' }}>{selectedCoverCustomer.vehicle}</p>
              <Badge variant={selectedCoverCustomer.status === 'active' ? 'success' : selectedCoverCustomer.status === 'expiring' ? 'warning' : 'default'}>{statusLabel(selectedCoverCustomer.status)}</Badge>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '14px', backgroundColor: theme.bgInput, borderRadius: '10px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.textMuted, fontSize: '14px' }}>Plate</span><span style={{ color: theme.text, fontWeight: '600', letterSpacing: '0.5px' }}>{selectedCoverCustomer.plate}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.textMuted, fontSize: '14px' }}>Tyre Size</span><span style={{ color: theme.text }}>{selectedCoverCustomer.tyreSize}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.textMuted, fontSize: '14px' }}>Fitted</span><span style={{ color: theme.text }}>{selectedCoverCustomer.fittedDate}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.textMuted, fontSize: '14px' }}>Cover Expires</span><span style={{ color: statusColor(selectedCoverCustomer.status), fontWeight: '600' }}>{selectedCoverCustomer.expires}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.textMuted, fontSize: '14px' }}>Cover Status</span><span style={{ color: theme.primary, fontWeight: '500' }}>Auto-active from job close</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.textMuted, fontSize: '14px' }}>Branding</span><span style={{ color: theme.text, fontSize: '13px' }}>{signUpData.businessName || "Dan's Mobile Tyres"}, backed by TYRE-FIT</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.textMuted, fontSize: '14px' }}>Google Review</span><span style={{ color: selectedCoverCustomer.reviewLeft ? '#eab308' : theme.textMuted }}>{selectedCoverCustomer.reviewLeft ? `${selectedCoverCustomer.reviewStars} stars` : 'Not yet'}</span></div>
              {selectedCoverCustomer.treadDepth && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.textMuted, fontSize: '14px' }}>Tread Depth</span><span style={{ color: conditionColor(selectedCoverCustomer.tyreCondition), fontWeight: '600' }}>{selectedCoverCustomer.treadDepth} — {selectedCoverCustomer.tyreCondition}</span></div>
              )}
              {selectedCoverCustomer.coverJobsDone > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.textMuted, fontSize: '14px' }}>Cover Jobs Done</span><span style={{ color: theme.primary, fontWeight: '600' }}>{selectedCoverCustomer.coverJobsDone}</span></div>
              )}
            </div>
            
            {/* TYRE BASELINE — from after photos OCR */}
            {selectedCoverCustomer.allTyres && selectedCoverCustomer.allTyres.length > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <p style={{ margin: '0 0 8px 0', color: theme.text, fontWeight: '600', fontSize: '14px' }}>Tyre Baseline (from after photos)</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {selectedCoverCustomer.allTyres.map((t, i) => (
                    <div key={i} style={{ padding: '10px', backgroundColor: theme.bgInput, borderRadius: '8px' }}>
                      <p style={{ margin: 0, color: theme.textMuted, fontSize: '11px', textTransform: 'uppercase', fontWeight: '600' }}>{t.pos === 'FL' ? 'Front Left' : t.pos === 'FR' ? 'Front Right' : t.pos === 'RL' ? 'Rear Left' : 'Rear Right'}</p>
                      <p style={{ margin: '4px 0 0 0', color: theme.text, fontSize: '13px', fontWeight: '500' }}>{t.size}</p>
                      <p style={{ margin: '2px 0 0 0', color: theme.textMuted, fontSize: '12px' }}>{t.brand} • DOT {t.dot}</p>
                      <p style={{ margin: '2px 0 0 0', color: conditionColor(parseFloat(t.tread) > 4 ? 'Good' : parseFloat(t.tread) > 2.5 ? 'Fair' : 'Worn'), fontSize: '12px', fontWeight: '600' }}>Tread: {t.tread}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TYRE WEAR ALERT */}
            {selectedCoverCustomer.tyreCondition === 'Worn' && (
              <div style={{ padding: '12px', backgroundColor: `${theme.danger}10`, borderRadius: '10px', border: `1px solid ${theme.danger}20`, marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <AlertTriangle size={16} color={theme.danger} />
                  <span style={{ color: theme.danger, fontWeight: '600', fontSize: '14px' }}>Tyre Wear Alert</span>
                </div>
                <p style={{ margin: 0, color: theme.textMuted, fontSize: '13px', lineHeight: 1.5 }}>Tread at {selectedCoverCustomer.treadDepth} — below 3mm. This customer likely needs new tyres soon. Great time to send an offer.</p>
              </div>
            )}
            
            {/* NO REVIEW NUDGE */}
            {!selectedCoverCustomer.reviewLeft && (
              <div style={{ padding: '12px', backgroundColor: `#eab30810`, borderRadius: '10px', border: `1px solid #eab30820`, marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <Star size={16} color="#eab308" />
                  <span style={{ color: '#eab308', fontWeight: '600', fontSize: '14px' }}>No Review Yet</span>
                </div>
                <p style={{ margin: 0, color: theme.textMuted, fontSize: '13px', lineHeight: 1.5 }}>Customer hasn't left a Google review. Send a gentle reminder — more reviews means more bookings.</p>
              </div>
            )}
          </div>
          
          {/* ACTIONS — with message preview */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {selectedCoverCustomer.tyreCondition === 'Worn' && (
              <div>
                <Button onClick={() => setCoverMessageType(coverMessageType === 'replacement' ? null : 'replacement')} icon={FileText}>Send Tyre Replacement Offer</Button>
                {coverMessageType === 'replacement' && (
                  <div style={{ margin: '8px 0', padding: '12px', backgroundColor: theme.bgInput, borderRadius: '10px', border: `1px solid ${theme.border}` }}>
                    <p style={{ margin: '0 0 4px 0', fontSize: '10px', color: theme.textMuted, textTransform: 'uppercase', fontWeight: '700' }}>Customer will receive this text</p>
                    <p style={{ margin: 0, color: theme.textMuted, fontSize: '13px', lineHeight: 1.6, fontStyle: 'italic' }}>Hi {selectedCoverCustomer.name.split(' ')[0]}, your rear tyres were at {selectedCoverCustomer.treadDepth || '2.1mm'} when we last checked — time for replacements before they become unsafe. Book here and we'll match your last price: <span style={{ color: theme.info, textDecoration: 'underline' }}>tyre-fit.co/q/{selectedCoverCustomer.plate?.replace(' ', '')}</span> — {signUpData.fullName?.split(' ')[0] || 'Dan'}, {signUpData.businessName || "Dan's Mobile Tyres"}</p>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                      <Button onClick={() => { setCoverMessageType(null); setSelectedCoverCustomer(null); showToast(`SMS sent to ${selectedCoverCustomer.name}`); }} fullWidth icon={Send} size="small">Send Now</Button>
                      <Button variant="secondary" onClick={() => setCoverMessageType(null)} fullWidth size="small">Cancel</Button>
                    </div>
                  </div>
                )}
              </div>
            )}
            {selectedCoverCustomer.status === 'expiring' && (
              <div>
                <Button onClick={() => setCoverMessageType(coverMessageType === 'checkup' ? null : 'checkup')} icon={Send}>Send Check-Up Offer</Button>
                {coverMessageType === 'checkup' && (
                  <div style={{ margin: '8px 0', padding: '12px', backgroundColor: theme.bgInput, borderRadius: '10px', border: `1px solid ${theme.border}` }}>
                    <p style={{ margin: '0 0 4px 0', fontSize: '10px', color: theme.textMuted, textTransform: 'uppercase', fontWeight: '700' }}>Customer will receive this text</p>
                    <p style={{ margin: 0, color: theme.textMuted, fontSize: '13px', lineHeight: 1.6, fontStyle: 'italic' }}>Hi {selectedCoverCustomer.name.split(' ')[0]}, your 30-day tyre cover from {signUpData.businessName || "Dan's Mobile Tyres"} expires on {selectedCoverCustomer.expires}. Book a free check-up to stay covered: <span style={{ color: theme.info, textDecoration: 'underline' }}>tyre-fit.co/b/{selectedCoverCustomer.plate?.replace(' ', '')}</span> — {signUpData.fullName?.split(' ')[0] || 'Dan'}</p>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                      <Button onClick={() => { setCoverMessageType(null); setSelectedCoverCustomer(null); showToast(`Check-up offer sent to ${selectedCoverCustomer.name}`); }} fullWidth icon={Send} size="small">Send Now</Button>
                      <Button variant="secondary" onClick={() => setCoverMessageType(null)} fullWidth size="small">Cancel</Button>
                    </div>
                  </div>
                )}
              </div>
            )}
            {!selectedCoverCustomer.reviewLeft && (
              <div>
                <Button variant="secondary" onClick={() => setCoverMessageType(coverMessageType === 'review' ? null : 'review')} icon={Star}>Send Review Reminder</Button>
                {coverMessageType === 'review' && (
                  <div style={{ margin: '8px 0', padding: '12px', backgroundColor: theme.bgInput, borderRadius: '10px', border: `1px solid ${theme.border}` }}>
                    <p style={{ margin: '0 0 4px 0', fontSize: '10px', color: theme.textMuted, textTransform: 'uppercase', fontWeight: '700' }}>Customer will receive this text</p>
                    <p style={{ margin: 0, color: theme.textMuted, fontSize: '13px', lineHeight: 1.6, fontStyle: 'italic' }}>Hi {selectedCoverCustomer.name.split(' ')[0]}, hope the tyres are riding well! If you have a moment, a quick Google review would really help us out: <span style={{ color: theme.info, textDecoration: 'underline' }}>g.page/{(signUpData.businessName || 'dansmobiletyres').toLowerCase().replace(/[^a-z]/g, '')}/review</span> Thanks! — {signUpData.fullName?.split(' ')[0] || 'Dan'}</p>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                      <Button onClick={() => { setCoverMessageType(null); setSelectedCoverCustomer(null); showToast(`Review reminder sent to ${selectedCoverCustomer.name}`); }} fullWidth icon={Send} size="small">Send Now</Button>
                      <Button variant="secondary" onClick={() => setCoverMessageType(null)} fullWidth size="small">Cancel</Button>
                    </div>
                  </div>
                )}
              </div>
            )}
            <Button variant="secondary" onClick={() => { setSelectedCoverCustomer(null); setQuoteData(prev => ({ ...prev, customerName: selectedCoverCustomer.name, mobile: selectedCoverCustomer.phone, numberPlate: selectedCoverCustomer.plate, isEmergency: false, isCoverQuote: false })); navigateTo('quote-customer'); }} icon={FileText}>New Quote for This Customer</Button>
            <button onClick={() => { setSelectedCoverCustomer(null); showToast(`Calling ${selectedCoverCustomer.name}...`); }} style={{ width: '100%', padding: '14px', backgroundColor: 'transparent', border: `1px solid ${theme.border}`, borderRadius: '12px', color: theme.text, fontSize: '15px', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Phone size={18} color={theme.textMuted} /> Call Customer
            </button>
          </div>
        </Modal>
      )}
      <BottomNav />
    </div>
    );
  };

  // ============================================
  // BOOKINGS
  // ============================================
  const BookingsScreen = () => {
    const [bookingsTab, setBookingsTab] = useState('upcoming');
    const [selectedBooking, setSelectedBooking] = useState(null);
    const timeSlots = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    const completedJobs = [
      { id: 101, customer: 'James Parker', plate: 'AB12 CDE', date: '03 Feb', tyreSize: '205/55R16', tyreQty: 2, earned: 129.98, payMethod: 'Card', review: true },
      { id: 102, customer: 'Sarah Jones', plate: 'XY34 FGH', date: '03 Feb', tyreSize: '225/45R17', tyreQty: 4, earned: 299.99, payMethod: 'Cash', review: true },
      { id: 103, customer: 'Mike Palmer', plate: 'CD56 EFG', date: '01 Feb', tyreSize: '225/45R18', tyreQty: 1, earned: 74.99, payMethod: 'Card', review: false, isCover: true },
      { id: 104, customer: 'Lisa Patel', plate: 'WX90 YZA', date: '31 Jan', tyreSize: '225/45R17', tyreQty: 2, earned: 149.98, payMethod: 'QR', review: true },
      { id: 105, customer: 'Tom Williams', plate: 'GH56 JKL', date: '30 Jan', tyreSize: '195/65R15', tyreQty: 4, earned: 259.96, payMethod: 'Cash', review: false },
      { id: 106, customer: 'Emma Clarke', plate: 'HJ78 KLM', date: '28 Jan', tyreSize: '225/40R18', tyreQty: 2, earned: 189.98, payMethod: 'Card', review: true }
    ];
    
    const totalEarned = completedJobs.reduce((sum, j) => sum + j.earned, 0);
    const totalJobs = completedJobs.length;
    
    return (
      <div style={{ minHeight: '100vh', backgroundColor: theme.bg, paddingBottom: '100px' }}>
        <Header title="Bookings" />
        
        {/* UPCOMING / COMPLETED TOGGLE */}
        <div style={{ display: 'flex', gap: '4px', padding: '0 16px 16px', backgroundColor: theme.bgCard }}>
          {['upcoming', 'completed'].map(tab => (
            <button key={tab} onClick={() => setBookingsTab(tab)} style={{ flex: 1, padding: '12px', backgroundColor: bookingsTab === tab ? theme.primary : theme.bgInput, border: 'none', borderRadius: '8px', color: bookingsTab === tab ? '#000' : theme.textMuted, fontWeight: '600', cursor: 'pointer', textTransform: 'capitalize', fontSize: '15px' }}>{tab}</button>
          ))}
        </div>
        
        {bookingsTab === 'upcoming' && (
          <>
            <div style={{ display: 'flex', gap: '8px', padding: '0 16px 16px' }}>
              {['day', 'week', 'month'].map(view => (
                <button key={view} onClick={() => setCalendarView(view)} style={{ flex: 1, padding: '10px', backgroundColor: calendarView === view ? `${theme.primary}20` : theme.bgInput, border: calendarView === view ? `1px solid ${theme.primary}` : `1px solid transparent`, borderRadius: '8px', color: calendarView === view ? theme.primary : theme.textMuted, fontWeight: '600', cursor: 'pointer', textTransform: 'capitalize', fontSize: '13px' }}>{view}</button>
              ))}
            </div>
            <div style={{ padding: '0 16px' }}>
              {calendarView === 'day' && (
                <>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: theme.textMuted, margin: '0 0 12px 0' }}>Wednesday, 4 Feb</h3>
                  {timeSlots.map(time => {
                    const job = mockJobs.find(j => j.time === time.replace(':00', ':30'));
                    return (
                      <div key={time} style={{ display: 'flex', gap: '12px', marginBottom: '8px' }}>
                        <div style={{ width: '50px', color: theme.textMuted, fontSize: '14px', paddingTop: '8px' }}>{time}</div>
                        {job ? (
                          <Card onClick={() => setSelectedBooking(job)} style={{ flex: 1, marginBottom: 0, backgroundColor: `${theme.primary}20`, borderColor: theme.primary, cursor: 'pointer' }}>
                            <h4 style={{ margin: '0 0 4px 0', color: theme.text, fontWeight: '600' }}>{job.customer}</h4>
                            <p style={{ margin: '0 0 4px 0', color: theme.textMuted, fontSize: '14px' }}>{job.plate} — {job.tyreQty}x {job.tyreSize}</p>
                            <div style={{ display: 'flex', gap: '6px' }}>
                              <Badge variant={job.depositPaid ? 'success' : 'warning'}>{job.depositPaid ? 'Confirmed' : 'Pending'}</Badge>
                              {job.stockOnVan && <Badge variant="success">On van</Badge>}
                            </div>
                          </Card>
                        ) : (
                          <div style={{ flex: 1, height: '48px', borderBottom: `1px solid ${theme.border}` }} />
                        )}
                      </div>
                    );
                  })}
                </>
              )}
              {calendarView === 'week' && (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginBottom: '16px' }}>
                    {days.map((day, i) => (
                      <div key={day} style={{ textAlign: 'center', padding: '8px 4px', backgroundColor: i === 2 ? theme.primary : 'transparent', borderRadius: '8px' }}>
                        <p style={{ margin: 0, color: i === 2 ? '#000' : theme.textMuted, fontSize: '12px' }}>{day}</p>
                        <p style={{ margin: '4px 0 0 0', color: i === 2 ? '#000' : theme.text, fontWeight: '600' }}>{3 + i}</p>
                      </div>
                    ))}
                  </div>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: theme.textMuted, margin: '0 0 12px 0' }}>Today's Jobs</h3>
                  {mockJobs.map(job => (
                    <Card key={job.id} onClick={() => setSelectedBooking(job)} style={{ cursor: 'pointer' }}>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <div style={{ textAlign: 'center', minWidth: '50px' }}><p style={{ margin: 0, color: theme.text, fontWeight: '700' }}>{job.time}</p></div>
                        <div style={{ flex: 1 }}>
                          <h3 style={{ margin: 0, color: theme.text, fontWeight: '600' }}>{job.customer}</h3>
                          <p style={{ margin: '4px 0 0 0', color: theme.textMuted, fontSize: '14px' }}>{job.plate} — {job.tyreQty}x {job.tyreSize}</p>
                          <p style={{ margin: '2px 0 0 0', color: theme.textSubtle, fontSize: '13px' }}>{job.location}</p>
                        </div>
                        <Badge variant={job.depositPaid ? 'success' : 'warning'}>{job.depositPaid ? 'Confirmed' : 'Pending'}</Badge>
                      </div>
                    </Card>
                  ))}
                </>
              )}
              {calendarView === 'month' && (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginBottom: '8px' }}>
                    {days.map(day => <div key={day} style={{ textAlign: 'center', padding: '4px', color: theme.textMuted, fontSize: '12px' }}>{day}</div>)}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
                    {[...Array(35)].map((_, i) => {
                      const dayNum = i - 5;
                      const isCurrentMonth = dayNum > 0 && dayNum <= 28;
                      const hasJob = [4, 5, 10, 15].includes(dayNum);
                      const isToday = dayNum === 4;
                      return (
                        <div key={i} style={{ aspectRatio: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: isToday ? theme.primary : hasJob ? `${theme.primary}20` : 'transparent', borderRadius: '8px', opacity: isCurrentMonth ? 1 : 0.3 }}>
                          <span style={{ color: isToday ? '#000' : theme.text, fontSize: '14px', fontWeight: isToday ? '700' : '400' }}>{isCurrentMonth ? dayNum : ''}</span>
                          {hasJob && !isToday && <div style={{ width: '4px', height: '4px', borderRadius: '2px', backgroundColor: theme.primary, marginTop: '2px' }} />}
                        </div>
                      );
                    })}
                  </div>
                  <Card style={{ marginTop: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
                      <div><p style={{ margin: 0, color: theme.textMuted, fontSize: '14px' }}>Bookings</p><p style={{ margin: '4px 0 0 0', color: theme.text, fontSize: '24px', fontWeight: '700' }}>23</p></div>
                      <div style={{ width: '1px', backgroundColor: theme.border }} />
                      <div><p style={{ margin: 0, color: theme.textMuted, fontSize: '14px' }}>Revenue</p><p style={{ margin: '4px 0 0 0', color: theme.primary, fontSize: '24px', fontWeight: '700' }}>£2.1k</p></div>
                    </div>
                  </Card>
                </>
              )}
              <Button onClick={() => navigateTo('quote-customer')} variant="outline" style={{ marginTop: '16px' }} icon={Plus}>Add Booking</Button>
            </div>
          </>
        )}
        
        {bookingsTab === 'completed' && (
          <div style={{ padding: '0 16px' }}>
            {/* EARNINGS SUMMARY */}
            <Card style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
                <div>
                  <p style={{ margin: 0, color: theme.textMuted, fontSize: '12px', textTransform: 'uppercase', fontWeight: '600' }}>This Month</p>
                  <p style={{ margin: '4px 0 0 0', color: theme.primary, fontSize: '24px', fontWeight: '700' }}>£{totalEarned.toFixed(0)}</p>
                </div>
                <div style={{ width: '1px', backgroundColor: theme.border }} />
                <div>
                  <p style={{ margin: 0, color: theme.textMuted, fontSize: '12px', textTransform: 'uppercase', fontWeight: '600' }}>Jobs Done</p>
                  <p style={{ margin: '4px 0 0 0', color: theme.text, fontSize: '24px', fontWeight: '700' }}>{totalJobs}</p>
                </div>
                <div style={{ width: '1px', backgroundColor: theme.border }} />
                <div>
                  <p style={{ margin: 0, color: theme.textMuted, fontSize: '12px', textTransform: 'uppercase', fontWeight: '600' }}>Avg Job</p>
                  <p style={{ margin: '4px 0 0 0', color: theme.text, fontSize: '24px', fontWeight: '700' }}>£{(totalEarned / totalJobs).toFixed(0)}</p>
                </div>
              </div>
            </Card>
            
            {/* JOB LIST */}
            {completedJobs.map(j => (
              <Card key={j.id} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <h3 style={{ margin: 0, color: theme.text, fontWeight: '600', fontSize: '16px' }}>{j.customer}</h3>
                    <p style={{ margin: '3px 0 0 0', color: theme.textMuted, fontSize: '13px' }}>{j.plate} — {j.tyreQty}x {j.tyreSize}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ margin: 0, color: theme.primary, fontWeight: '700', fontSize: '17px' }}>£{j.earned.toFixed(2)}</p>
                    <p style={{ margin: '2px 0 0 0', color: theme.textMuted, fontSize: '12px' }}>{j.date}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <Badge variant={j.payMethod === 'Cash' ? 'warning' : 'info'}>{j.payMethod}</Badge>
                  {j.isCover && <Badge variant="danger">Cover Job</Badge>}
                  {j.review ? <Badge variant="success">Reviewed</Badge> : <Badge variant="default">No review</Badge>}
                </div>
              </Card>
            ))}
          </div>
        )}
        {/* BOOKING DETAIL MODAL */}
        {selectedBooking && (
          <Modal title={selectedBooking.customer} onClose={() => setSelectedBooking(null)}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '14px', backgroundColor: theme.bgInput, borderRadius: '10px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.textMuted, fontSize: '14px' }}>Plate</span><span style={{ color: theme.text, fontWeight: '600', letterSpacing: '0.5px' }}>{selectedBooking.plate}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.textMuted, fontSize: '14px' }}>Tyres</span><span style={{ color: theme.text }}>{selectedBooking.tyreQty}x {selectedBooking.tyreSize}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.textMuted, fontSize: '14px' }}>Time</span><span style={{ color: theme.text }}>{selectedBooking.time}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.textMuted, fontSize: '14px' }}>Location</span><span style={{ color: theme.text, textAlign: 'right', maxWidth: '60%' }}>{selectedBooking.location}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.textMuted, fontSize: '14px' }}>ETA</span><span style={{ color: theme.primary, fontWeight: '600' }}>{selectedBooking.eta}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.textMuted, fontSize: '14px' }}>Deposit</span><span style={{ color: selectedBooking.depositPaid ? theme.primary : theme.warning, fontWeight: '600' }}>{selectedBooking.depositPaid ? 'Paid' : 'Pending'}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.textMuted, fontSize: '14px' }}>Stock</span><span style={{ color: selectedBooking.stockOnVan ? theme.primary : theme.warning }}>{selectedBooking.stockOnVan ? 'On van' : 'Depot pickup needed'}</span></div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Button onClick={() => { setSelectedBooking(null); setActiveJob(selectedBooking); setIsCoverJob(!!selectedBooking.isCoverJob); setBeforePhotos({}); setAfterPhotos({}); setCustomerSigned(false); navigateTo('job-enroute'); }} icon={Navigation} disabled={!selectedBooking.depositPaid && !selectedBooking.isCoverJob}>Start This Job</Button>
              <Button variant="secondary" onClick={() => { setSelectedBooking(null); showToast(`Calling ${selectedBooking.customer}...`); }} icon={Phone}>Call Customer</Button>
              <Button variant="secondary" onClick={() => { setSelectedBooking(null); showToast('Job cancelled'); }}>Cancel Booking</Button>
            </div>
          </Modal>
        )}
        <BottomNav />
      </div>
    );
  };
  // ============================================
  // ACCOUNT - With settings links
  // ============================================
  const AccountScreen = () => {
    const showDispatcher = userRole === 'owner' && isTeamAccount;
    const myDetailsItems = [
      { icon: Wallet, label: 'My Wallet', screen: 'wallet', highlight: true },
      { icon: User, label: 'Edit Profile', screen: 'settings-profile' },
      { icon: CreditCard, label: 'Bank Account', screen: 'settings-bank' },
      { icon: Shield, label: 'Proof of Work', screen: 'evidence-vault', desc: 'Photos, signatures, GPS' }
    ];
    const myBusinessItems = [
      { icon: Building, label: 'Business Settings', screen: 'settings-business', ownerOnly: true },
      { icon: CreditCard, label: 'Payments Setup', screen: 'settings-payments', desc: stripeConnected ? 'Stripe connected' : 'Card payments not connected' },
      { icon: Globe, label: 'Google Business Profile', screen: 'settings-google' },
      { icon: MapPin, label: 'Depot Locations', screen: 'settings-depots', ownerOnly: true },
      { icon: ClipboardList, label: 'Invoice Settings', screen: 'settings-invoices' },
      { icon: PoundSterling, label: 'Accounting Software', screen: 'settings-accounting', desc: 'Xero, QuickBooks, FreeAgent' },
      { icon: Users, label: 'Team Management', action: () => navigateTo('dispatcher'), show: showDispatcher },
      { icon: Gift, label: 'Invite a Fitter — Get £50', screen: 'referral', desc: 'You both earn' }
    ];
    const preferencesItems = [
      { icon: Bell, label: 'Notifications & Alerts', screen: 'settings-notifications' },
      { icon: darkMode ? Sun : Moon, label: 'Display & Accessibility', screen: 'settings-display' },
      { icon: Smartphone, label: 'Mobile Setup Flow', screen: 'setup-flow-board', desc: 'See all setup screens side by side' },
      { icon: Route, label: 'Flow Storyboard', screen: 'flow-storyboard', desc: 'Rows grouped by full user journey' },
      { icon: Play, label: 'Flow Runner', screen: 'flow-runner', desc: 'Run fitter and customer flows with demo data' },
      { icon: Calendar, label: 'Calendar Sync (optional)', screen: 'settings-calendar' },
      { icon: HelpCircle, label: 'Help & Support', screen: 'settings-help' },
      { icon: FileCheck, label: 'Terms & Privacy', screen: 'settings-terms' },
      { icon: LogOut, label: 'Log Out', action: () => setShowLogoutConfirm(true), danger: true }
    ];
    
    const renderMenuGroup = (title, items) => (
      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ margin: '0 0 8px 0', color: theme.textMuted, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px', paddingLeft: '4px' }}>{title}</h3>
        <div style={{ borderRadius: '12px', overflow: 'hidden', border: `1px solid ${theme.border}` }}>
          {items.filter(item => { if (item.show === false) return false; if (item.ownerOnly && userRole !== 'owner') return false; return true; }).map((item, i, arr) => (
            <button key={i} onClick={() => item.action ? item.action() : navigateTo(item.screen)} style={{ width: '100%', padding: '16px', backgroundColor: theme.bgCard, border: 'none', borderBottom: i < arr.length - 1 ? `1px solid ${theme.border}` : 'none', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer', textAlign: 'left' }}>
              <item.icon size={20} color={item.danger ? theme.danger : item.highlight ? theme.primary : theme.textMuted} />
              <div style={{ flex: 1 }}>
                <span style={{ color: item.danger ? theme.danger : theme.text, fontWeight: '500', display: 'block' }}>{item.label}</span>
                {item.desc && <span style={{ color: theme.textMuted, fontSize: '12px' }}>{item.desc}</span>}
              </div>
              <ChevronRight size={18} color={theme.textMuted} />
            </button>
          ))}
        </div>
      </div>
    );
    return (
      <div style={{ minHeight: '100vh', backgroundColor: theme.bg, paddingBottom: '100px' }}>
        <Toast />
        <Header title="Account" showBack={false} />
        <div style={{ padding: '16px' }}>
          <Card onClick={() => navigateTo('settings-profile')}><div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}><div style={{ width: '64px', height: '64px', backgroundColor: theme.primary, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontSize: '24px', fontWeight: '700', color: '#000' }}>{(signUpData.fullName || 'Dan Smith').split(' ').map(n => n[0]).join('')}</span></div><div style={{ flex: 1 }}><h3 style={{ margin: 0, color: theme.text, fontWeight: '600', fontSize: '18px' }}>{signUpData.fullName || 'Dan Smith'}</h3><p style={{ margin: '4px 0 0 0', color: theme.textMuted }}>{signUpData.businessName || "Dan's Mobile Tyres"}</p>{userRole === 'owner' && <Badge variant="success">Owner</Badge>}</div><ChevronRight size={20} color={theme.textMuted} /></div></Card>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '16px' }}>
            <Card><p style={{ margin: 0, color: theme.textMuted, fontSize: '12px' }}>Jobs</p><p style={{ margin: '4px 0 0 0', color: theme.text, fontSize: '20px', fontWeight: '700' }}>847</p></Card>
            <Card><p style={{ margin: 0, color: theme.textMuted, fontSize: '12px' }}>Earnings</p><p style={{ margin: '4px 0 0 0', color: theme.primary, fontSize: '20px', fontWeight: '700' }}>£52k</p></Card>
            <Card><p style={{ margin: 0, color: theme.textMuted, fontSize: '12px' }}>Rating</p><p style={{ margin: '4px 0 0 0', color: theme.text, fontSize: '20px', fontWeight: '700' }}>4.8/5</p></Card>
          </div>

          <Card style={{ marginTop: '16px', borderColor: `${theme.primary}40` }} onClick={() => navigateTo('wallet')}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ margin: 0, color: theme.textMuted, fontSize: '12px' }}>Next payout</p>
                <p style={{ margin: '4px 0 0 0', color: theme.primary, fontWeight: '700', fontSize: '20px' }}>£847 → your bank Friday</p>
              </div>
              <ChevronRight size={20} color={theme.textMuted} />
            </div>
          </Card>
          
          <Card style={{ marginTop: '16px' }} onClick={() => setShowExportModal(true)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}><FileDown size={20} color={theme.info} /><div style={{ flex: 1 }}><p style={{ margin: 0, color: theme.text, fontWeight: '500' }}>Export Customer List</p><p style={{ margin: '4px 0 0 0', color: theme.textMuted, fontSize: '13px' }}>Your data — download a CSV copy anytime</p></div><ChevronRight size={20} color={theme.textMuted} /></div>
          </Card>
          
          {showExportModal && (
            <Modal title="Export Customer List" onClose={() => setShowExportModal(false)}>
              <p style={{ margin: '0 0 8px 0', color: theme.textMuted, fontSize: '14px' }}>This is your data and you're free to download it whenever you need to. We just look after it securely on your behalf.</p>
              <p style={{ margin: '0 0 16px 0', color: theme.textMuted, fontSize: '13px' }}>The CSV includes customer names, phone numbers, and vehicles.</p>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '24px' }}><input type="checkbox" checked={gdprChecked} onChange={(e) => setGdprChecked(e.target.checked)} style={{ marginTop: '4px' }} /><span style={{ color: theme.text, fontSize: '14px' }}>I'll handle this data responsibly in line with data protection laws</span></label>
              <div style={{ display: 'flex', gap: '12px' }}><Button variant="secondary" onClick={() => setShowExportModal(false)} fullWidth>Cancel</Button><Button disabled={!gdprChecked} onClick={() => { setShowExportModal(false); showToast('CSV downloaded'); }} fullWidth icon={Download}>Export CSV</Button></div>
            </Modal>
          )}
          
          {showLogoutConfirm && (
            <Modal title="Log Out?" onClose={() => setShowLogoutConfirm(false)}>
              <p style={{ margin: '0 0 24px 0', color: theme.textMuted, fontSize: '16px' }}>Are you sure you want to log out?</p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <Button variant="secondary" onClick={() => setShowLogoutConfirm(false)} fullWidth>Cancel</Button>
                <Button variant="danger" onClick={() => { setShowLogoutConfirm(false); navigateTo('signin'); }} fullWidth icon={LogOut}>Yes, Log Out</Button>
              </div>
            </Modal>
          )}
          
          <div style={{ marginTop: '24px' }}>
            {renderMenuGroup('My Details', myDetailsItems)}
            {renderMenuGroup('My Business', myBusinessItems)}
            {renderMenuGroup('Preferences', preferencesItems)}
          </div>
          <button onClick={() => { setViewMode('customer'); navigateTo('customer-booking'); }} style={{ marginTop: '20px', width: '100%', background: 'none', border: 'none', color: theme.textSubtle, fontSize: '11px', cursor: 'pointer' }}>
            TYRE-FIT v6.0 — tap for customer demo
          </button>
        </div>
        <BottomNav />
      </div>
    );
  };

  // Settings Screens
  const SettingsProfileScreen = () => (
    <div style={{ minHeight: '100vh', backgroundColor: theme.bg, paddingBottom: '100px' }}>
      <Toast />
      <Header title="Edit Profile" />
      <div style={{ padding: '24px' }}>
        <Input label="Full Name" value={signUpData.fullName || 'Dan Smith'} onChange={(v) => setSignUpData({...signUpData, fullName: v})} />
        <Input label="Email" value={signUpData.email || 'dan@example.com'} onChange={(v) => setSignUpData({...signUpData, email: v})} type="email" />
        <Input label="Phone" value={signUpData.phone || '07700 900123'} onChange={(v) => setSignUpData({...signUpData, phone: v})} type="tel" />
        <Button onClick={() => { showToast('Profile updated'); goBack(); }}>Save Changes</Button>
      </div>
    </div>
  );

  const SettingsBusinessScreen = () => {
    const [showLogo, setShowLogo] = useState(!!signUpData.logoUploaded);
    return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.bg, paddingBottom: '100px' }}>
      <Toast />
      <Header title="Business Settings" subtitle="How your business appears to customers" />
      <div style={{ padding: '16px' }}>

        {/* BUSINESS IDENTITY */}
        <p style={{ margin: '0 0 8px 0', color: theme.textMuted, fontSize: '12px', textTransform: 'uppercase', fontWeight: '600', letterSpacing: '0.5px' }}>Business identity</p>
        <Input label="Business Name" value={signUpData.businessName || "Dan's Mobile Tyres"} onChange={(v) => setSignUpData({...signUpData, businessName: v})} />
        <Input label="Business Phone" value={signUpData.businessPhone || '07700 900123'} onChange={(v) => setSignUpData({...signUpData, businessPhone: v})} />
        <Input label="Business Email" value={signUpData.businessEmail || 'info@dansmobiletyres.co.uk'} onChange={(v) => setSignUpData({...signUpData, businessEmail: v})} />
        <Input label="Address Line 1" value={signUpData.addressLine1 || ''} onChange={(v) => setSignUpData({...signUpData, addressLine1: v})} placeholder="123 High Street" />
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ flex: 2 }}><Input label="City" value={signUpData.city || ''} onChange={(v) => setSignUpData({...signUpData, city: v})} placeholder="London" /></div>
          <div style={{ flex: 1 }}><Input label="Postcode" value={signUpData.businessPostcode || ''} onChange={(v) => setSignUpData({...signUpData, businessPostcode: v.toUpperCase()})} placeholder="E1 4QJ" /></div>
        </div>
        
        {/* LOGO */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '14px', color: theme.textMuted, marginBottom: '8px' }}>Business Logo</label>
          <button onClick={() => { setShowLogo(!showLogo); setSignUpData({...signUpData, logoUploaded: !showLogo}); showToast(showLogo ? 'Logo removed' : 'Logo uploaded'); }} style={{ width: '100%', padding: showLogo ? '12px' : '24px', backgroundColor: showLogo ? `${theme.primary}10` : theme.bgInput, border: `2px ${showLogo ? 'solid' : 'dashed'} ${showLogo ? theme.primary : theme.border}`, borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            {showLogo ? (
              <><div style={{ width: '48px', height: '48px', borderRadius: '10px', backgroundColor: theme.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ color: '#000', fontWeight: '700', fontSize: '16px' }}>{(signUpData.businessName || 'DM')[0]}{(signUpData.businessName || 'DM').split(' ')[1]?.[0] || 'T'}</span></div><span style={{ color: theme.primary, fontWeight: '500', fontSize: '14px' }}>Logo uploaded — tap to change</span></>
            ) : (
              <><Upload size={24} color={theme.textMuted} /><span style={{ color: theme.textMuted, fontSize: '14px' }}>Upload logo</span></>
            )}
          </button>
        </div>

        {/* TAX & LEGAL */}
        <p style={{ margin: '16px 0 8px 0', color: theme.textMuted, fontSize: '12px', textTransform: 'uppercase', fontWeight: '600', letterSpacing: '0.5px' }}>Tax & legal</p>
        <Input label="VAT Number (if registered)" value={signUpData.vatNumber || ''} onChange={(v) => setSignUpData({...signUpData, vatNumber: v})} placeholder="GB123456789 — leave blank if not VAT registered" />
        <Input label="Company Registration Number (optional)" value={signUpData.companyNumber || ''} onChange={(v) => setSignUpData({...signUpData, companyNumber: v})} placeholder="If registered as a limited company" />
        
        <Card style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <Info size={16} color={theme.info} />
            <span style={{ color: theme.text, fontWeight: '600', fontSize: '14px' }}>Tax status</span>
          </div>
          <p style={{ margin: 0, color: theme.textMuted, fontSize: '13px', lineHeight: 1.6 }}>{signUpData.vatNumber ? 'VAT registered — invoices will include 20% VAT automatically.' : 'Not VAT registered — invoices show totals without VAT. If you register later, update your VAT number above.'}</p>
        </Card>

        {/* SERVICES OFFERED */}
        <p style={{ margin: '16px 0 8px 0', color: theme.textMuted, fontSize: '12px', textTransform: 'uppercase', fontWeight: '600', letterSpacing: '0.5px' }}>Services you offer</p>
        <Card style={{ marginBottom: '12px' }}>
          <Toggle label="Tyre Fitting (replace)" checked={signUpData.services?.tyreFitting !== false} onChange={() => setSignUpData({...signUpData, services: {...signUpData.services, tyreFitting: !signUpData.services?.tyreFitting}})} />
          <Toggle label="Puncture Repairs" checked={signUpData.services?.punctureRepairs !== false} onChange={() => setSignUpData({...signUpData, services: {...signUpData.services, punctureRepairs: !signUpData.services?.punctureRepairs}})} />
          <Toggle label="Emergency Callouts" checked={signUpData.services?.emergencyCallouts !== false} onChange={() => setSignUpData({...signUpData, services: {...signUpData.services, emergencyCallouts: !signUpData.services?.emergencyCallouts}})} />
          <Toggle label="Wheel Alignment" checked={!!signUpData.services?.alignment} onChange={() => setSignUpData({...signUpData, services: {...signUpData.services, alignment: !signUpData.services?.alignment}})} />
          <Toggle label="TPMS Sensor Fitting" checked={!!signUpData.services?.tpms} onChange={() => setSignUpData({...signUpData, services: {...signUpData.services, tpms: !signUpData.services?.tpms}})} />
          <Toggle label="Locking Wheel Nut Removal" checked={!!signUpData.services?.lwn} onChange={() => setSignUpData({...signUpData, services: {...signUpData.services, lwn: !signUpData.services?.lwn}})} />
          <Toggle label="Fleet / Commercial" checked={!!signUpData.services?.fleet} onChange={() => setSignUpData({...signUpData, services: {...signUpData.services, fleet: !signUpData.services?.fleet}})} />
        </Card>

        {/* PRICING DEFAULTS */}
        <p style={{ margin: '16px 0 8px 0', color: theme.textMuted, fontSize: '12px', textTransform: 'uppercase', fontWeight: '600', letterSpacing: '0.5px' }}>Default pricing (used in quotes)</p>
        <Card style={{ marginBottom: '12px' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <div style={{ flex: 1 }}><Input label="Emergency Callout Fee" value={signUpData.pricing?.calloutFee || '25'} onChange={(v) => setSignUpData({...signUpData, pricing: {...signUpData.pricing, calloutFee: v}})} placeholder="£" /></div>
            <div style={{ flex: 1 }}><Input label="LWN Removal (no key)" value={signUpData.pricing?.lwnRemovalPrice || '15'} onChange={(v) => setSignUpData({...signUpData, pricing: {...signUpData.pricing, lwnRemovalPrice: v}})} placeholder="£" /></div>
          </div>
          <Toggle label="Digital balancing — free" checked={signUpData.pricing?.digitalBalancingFree !== false} onChange={() => setSignUpData({...signUpData, pricing: {...signUpData.pricing, digitalBalancingFree: !signUpData.pricing?.digitalBalancingFree}})} />
          <Toggle label="New valves — free" checked={signUpData.pricing?.newValvesFree !== false} onChange={() => setSignUpData({...signUpData, pricing: {...signUpData.pricing, newValvesFree: !signUpData.pricing?.newValvesFree}})} />
          <Toggle label="Old tyre disposal — free" checked={signUpData.pricing?.disposalFree !== false} onChange={() => setSignUpData({...signUpData, pricing: {...signUpData.pricing, disposalFree: !signUpData.pricing?.disposalFree}})} />
          <p style={{ margin: '8px 0 0 0', color: theme.textMuted, fontSize: '12px', lineHeight: 1.5 }}>These defaults appear in Quick Quote and Full Quote. You can override them per quote.</p>
        </Card>

        {/* OPERATING HOURS */}
        <p style={{ margin: '16px 0 8px 0', color: theme.textMuted, fontSize: '12px', textTransform: 'uppercase', fontWeight: '600', letterSpacing: '0.5px' }}>Operating hours</p>
        <Card style={{ marginBottom: '12px' }}>
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, i) => (
            <div key={day} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 6 ? `1px solid ${theme.border}` : 'none' }}>
              <span style={{ color: theme.text, fontSize: '14px', fontWeight: '500', width: '100px' }}>{day}</span>
              <span style={{ color: i < 6 ? theme.textMuted : theme.danger, fontSize: '13px' }}>{i < 5 ? '8:00 — 18:00' : i === 5 ? '9:00 — 14:00' : 'Closed'}</span>
            </div>
          ))}
          <p style={{ margin: '10px 0 0 0', color: theme.textMuted, fontSize: '12px' }}>Customers see these on your booking page. Emergency callouts operate outside these hours.</p>
        </Card>

        {/* COVER RADIUS */}
        <p style={{ margin: '16px 0 8px 0', color: theme.textMuted, fontSize: '12px', textTransform: 'uppercase', fontWeight: '600', letterSpacing: '0.5px' }}>Cover job radius</p>
        <Card style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: theme.text, fontWeight: '600' }}>Maximum distance for cover jobs</span>
            <span style={{ color: theme.primary, fontWeight: '700', fontSize: '18px' }}>15 miles</span>
          </div>
          <input type="range" min="5" max="30" defaultValue="15" style={{ width: '100%', accentColor: theme.primary }} />
          <p style={{ margin: '8px 0 0 0', color: theme.textMuted, fontSize: '12px' }}>TYRE-FIT will only alert you to cover jobs within this radius. Wider radius = more jobs but more driving.</p>
        </Card>

        <Button onClick={() => { showToast('Business settings saved'); goBack(); }}>Save Changes</Button>
      </div>
    </div>
    );
  };

  const SettingsPaymentsScreen = () => (
    <div style={{ minHeight: '100vh', backgroundColor: theme.bg, paddingBottom: '100px' }}>
      <Toast />
      <Header title="Payments Setup" subtitle="Connect Stripe or skip for now" />
      <div style={{ padding: '16px' }}>
        <Card style={{ marginBottom: '12px', borderColor: `${theme.primary}40` }}>
          <h3 style={{ margin: '0 0 10px 0', color: theme.text, fontSize: '16px', fontWeight: '700' }}>What you get with Stripe connected</h3>
          {['QR code payments', 'Tap to Pay on iPhone', 'Auto receipts + cover links', 'Pay Now invoice links', 'Wallet transfer to bank'].map((item) => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <CheckCircle size={16} color={theme.primary} />
              <span style={{ color: theme.text, fontSize: '14px' }}>{item}</span>
            </div>
          ))}
        </Card>
        <Card style={{ marginBottom: '12px' }}>
          <h3 style={{ margin: '0 0 10px 0', color: theme.text, fontSize: '16px', fontWeight: '700' }}>What works without Stripe</h3>
          <p style={{ margin: 0, color: theme.textMuted, fontSize: '14px', lineHeight: 1.6 }}>
            You can still send quotes, run jobs, take photos, create condition reports, use cover, track stock, and send invoices. You just won't take card payments in-app.
          </p>
        </Card>
        <Card style={{ marginBottom: '16px' }}>
          <p style={{ margin: '0 0 6px 0', color: theme.text, fontWeight: '700', fontSize: '15px' }}>Cost</p>
          <p style={{ margin: 0, color: theme.textMuted, fontSize: '14px' }}>1.5% + 20p per card transaction. No monthly fee.</p>
        </Card>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button onClick={() => { setStripeConnected(true); showToast('Stripe connected'); }} fullWidth>Connect Stripe</Button>
          <Button variant="secondary" onClick={() => { setStripeConnected(false); showToast('Skipped — you can connect later'); }} fullWidth>Skip for now</Button>
        </div>
      </div>
    </div>
  );

  const SettingsNotificationsScreen = () => {
    const [prefs, setPrefs] = useState({
      emergencyAlerts: true, emergencySound: true, emergencyVibrate: true, emergencyLockScreen: true,
      bookingNew: true, bookingDeposit: true, bookingPayment: true, bookingCancelled: true, bookingCustomerEnRoute: false,
      reviewNew: true, reviewReminder: true, reviewLowRating: true,
      coverAuto: true, coverExpiring: true, coverWear: true,
      stockLow: true, stockDepot: true, stockRoute: false,
      emailDaily: false, emailWeekly: true, emailMonthly: true
    });
    const setPref = (key, value) => setPrefs(prev => ({ ...prev, [key]: value }));
    return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.bg, paddingBottom: '100px' }}>
      <Toast />
      <Header title="Notifications" />
      <div style={{ padding: '16px' }}>
        
        {/* EMERGENCY ALERTS — TOP PRIORITY */}
        <Card style={{ borderColor: theme.danger, borderWidth: '2px', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: `${theme.danger}15`, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertTriangle size={20} color={theme.danger} />
            </div>
            <div>
              <h4 style={{ margin: 0, color: theme.text, fontWeight: '700', fontSize: '16px' }}>Emergency Cover Alerts</h4>
              <p style={{ margin: '2px 0 0 0', color: theme.danger, fontSize: '13px', fontWeight: '500' }}>High priority — sounds like a text message</p>
            </div>
          </div>
          <div style={{ padding: '12px', backgroundColor: `${theme.danger}08`, borderRadius: '10px', marginBottom: '14px' }}>
            <p style={{ margin: 0, color: theme.textMuted, fontSize: '13px', lineHeight: 1.6 }}>When a covered customer needs emergency help nearby, you'll get an urgent alert with a loud notification sound — just like receiving a text. The job needs a fast response so the customer isn't left waiting.</p>
          </div>
          <Toggle label="Emergency cover job alerts" checked={prefs.emergencyAlerts} onChange={(v) => setPref('emergencyAlerts', v)} />
          <Toggle label="Urgent sound (loud ding)" checked={prefs.emergencySound} onChange={(v) => setPref('emergencySound', v)} />
          <Toggle label="Vibrate" checked={prefs.emergencyVibrate} onChange={(v) => setPref('emergencyVibrate', v)} />
          <Toggle label="Show on lock screen" checked={prefs.emergencyLockScreen} onChange={(v) => setPref('emergencyLockScreen', v)} />
          <div style={{ marginTop: '12px', padding: '10px 12px', backgroundColor: theme.bgInput, borderRadius: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Info size={14} color={theme.textMuted} />
              <p style={{ margin: 0, color: theme.textMuted, fontSize: '12px' }}>Emergency alerts override Do Not Disturb to ensure you never miss a nearby customer in need</p>
            </div>
          </div>
        </Card>
        
        {/* BOOKING & PAYMENT ALERTS */}
        <Card style={{ marginBottom: '12px' }}>
          <h4 style={{ margin: '0 0 14px 0', color: theme.text, fontWeight: '600', fontSize: '15px' }}>Bookings & Payments</h4>
          <Toggle label="New booking confirmed" checked={prefs.bookingNew} onChange={(v) => setPref('bookingNew', v)} />
          <Toggle label="Deposit received" checked={prefs.bookingDeposit} onChange={(v) => setPref('bookingDeposit', v)} />
          <Toggle label="Payment received" checked={prefs.bookingPayment} onChange={(v) => setPref('bookingPayment', v)} />
          <Toggle label="Booking cancelled" checked={prefs.bookingCancelled} onChange={(v) => setPref('bookingCancelled', v)} />
          <Toggle label="Customer en route to you" checked={prefs.bookingCustomerEnRoute} onChange={(v) => setPref('bookingCustomerEnRoute', v)} />
        </Card>
        
        {/* REVIEWS & REPUTATION */}
        <Card style={{ marginBottom: '12px' }}>
          <h4 style={{ margin: '0 0 14px 0', color: theme.text, fontWeight: '600', fontSize: '15px' }}>Reviews & Reputation</h4>
          <Toggle label="New Google review received" checked={prefs.reviewNew} onChange={(v) => setPref('reviewNew', v)} />
          <Toggle label="Review response reminders" checked={prefs.reviewReminder} onChange={(v) => setPref('reviewReminder', v)} />
          <Toggle label="Low rating alert (3 stars or below)" checked={prefs.reviewLowRating} onChange={(v) => setPref('reviewLowRating', v)} />
        </Card>
        
        {/* CUSTOMER COVER */}
        <Card style={{ marginBottom: '12px' }}>
          <h4 style={{ margin: '0 0 14px 0', color: theme.text, fontWeight: '600', fontSize: '15px' }}>Customer Cover</h4>
          <Toggle label="Auto-cover on job complete (30 days)" checked={prefs.coverAuto} onChange={(v) => setPref('coverAuto', v)} />
          <Toggle label="Cover expiring soon" checked={prefs.coverExpiring} onChange={(v) => setPref('coverExpiring', v)} />
          <Toggle label="Tyre wear alerts (AI monitoring)" checked={prefs.coverWear} onChange={(v) => setPref('coverWear', v)} />
        </Card>
        
        {/* STOCK */}
        <Card style={{ marginBottom: '12px' }}>
          <h4 style={{ margin: '0 0 14px 0', color: theme.text, fontWeight: '600', fontSize: '15px' }}>Stock & Route</h4>
          <Toggle label="Low stock warning" checked={prefs.stockLow} onChange={(v) => setPref('stockLow', v)} />
          <Toggle label="Depot pickup reminders" checked={prefs.stockDepot} onChange={(v) => setPref('stockDepot', v)} />
          <Toggle label="Route changes" checked={prefs.stockRoute} onChange={(v) => setPref('stockRoute', v)} />
        </Card>
        
        {/* EMAIL SUMMARIES */}
        <Card style={{ marginBottom: '12px' }}>
          <h4 style={{ margin: '0 0 14px 0', color: theme.text, fontWeight: '600', fontSize: '15px' }}>Email Reports</h4>
          <Toggle label="Daily summary" checked={prefs.emailDaily} onChange={(v) => setPref('emailDaily', v)} />
          <Toggle label="Weekly performance report" checked={prefs.emailWeekly} onChange={(v) => setPref('emailWeekly', v)} />
          <Toggle label="Monthly earnings breakdown" checked={prefs.emailMonthly} onChange={(v) => setPref('emailMonthly', v)} />
        </Card>
        
        <Button onClick={() => { showToast('Notification preferences saved'); goBack(); }}>Save Changes</Button>
      </div>
    </div>
  );
  };

  const SettingsHelpScreen = () => (
    <div style={{ minHeight: '100vh', backgroundColor: theme.bg, paddingBottom: '100px' }}>
      <Toast />
      <Header title="Help & Support" />
      <div style={{ padding: '24px' }}>
        <Card onClick={() => showToast('Opening help.tyre-fit.co in browser...')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><HelpCircle size={24} color={theme.info} /><div style={{ flex: 1 }}><h3 style={{ margin: 0, color: theme.text, fontWeight: '600' }}>Help Center</h3><p style={{ margin: '4px 0 0 0', color: theme.textMuted, fontSize: '14px' }}>FAQs and guides</p></div><ChevronRight size={20} color={theme.textMuted} /></div>
        </Card>
        <Card onClick={() => showToast('Live chat opening — avg response: 2 mins')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><MessageSquare size={24} color={theme.primary} /><div style={{ flex: 1 }}><h3 style={{ margin: 0, color: theme.text, fontWeight: '600' }}>Live Chat</h3><p style={{ margin: '4px 0 0 0', color: theme.textMuted, fontSize: '14px' }}>Chat with support</p></div><ChevronRight size={20} color={theme.textMuted} /></div>
        </Card>
        <Card onClick={() => showToast('Calling 0330 633 1247...')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><Phone size={24} color={theme.warning} /><div style={{ flex: 1 }}><h3 style={{ margin: 0, color: theme.text, fontWeight: '600' }}>Phone Support</h3><p style={{ margin: '4px 0 0 0', color: theme.textMuted, fontSize: '14px' }}>0330 633 1247</p></div><ChevronRight size={20} color={theme.textMuted} /></div>
        </Card>
        <Card onClick={() => { navigateTo('dashboard'); }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><Navigation size={24} color={theme.primary} /><div style={{ flex: 1 }}><h3 style={{ margin: 0, color: theme.text, fontWeight: '600' }}>Replay Feature Tour</h3><p style={{ margin: '4px 0 0 0', color: theme.textMuted, fontSize: '14px' }}>See how TYRE-FIT works</p></div><ChevronRight size={20} color={theme.textMuted} /></div>
        </Card>
        <Card onClick={() => navigateTo('practice-mode')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><Play size={24} color={theme.warning} /><div style={{ flex: 1 }}><h3 style={{ margin: 0, color: theme.text, fontWeight: '600' }}>Practice Mode</h3><p style={{ margin: '4px 0 0 0', color: theme.textMuted, fontSize: '14px' }}>Try a fake job flow — risk free</p></div><ChevronRight size={20} color={theme.textMuted} /></div>
        </Card>
      </div>
    </div>
  );

  const SettingsGoogleScreen = () => {
    const [connected, setConnected] = useState(true);
    const [syncSettings, setSyncSettings] = useState({ autoRequest: true, syncHours: true, replyAlerts: true });
    const setSync = (key, value) => setSyncSettings(prev => ({ ...prev, [key]: value }));
    return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.bg, paddingBottom: '100px' }}>
      <Toast />
      <Header title="Google Business Profile" />
      <div style={{ padding: '24px' }}>
        <Card highlight>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ width: '48px', height: '48px', backgroundColor: '#fff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="28" height="28" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: 0, color: theme.text, fontWeight: '600' }}>Dan's Mobile Tyres</h3>
              <Badge variant={connected ? 'success' : 'warning'}>{connected ? 'Connected' : 'Disconnected'}</Badge>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button variant="outline" size="small" fullWidth onClick={() => showToast('Opening Google Business...')}>View Profile</Button>
            <Button variant="secondary" size="small" fullWidth onClick={() => { setConnected(!connected); showToast(connected ? 'Disconnected' : 'Connected'); }}>{connected ? 'Disconnect' : 'Reconnect'}</Button>
          </div>
        </Card>
        <Card>
          <h4 style={{ margin: '0 0 12px 0', color: theme.text, fontWeight: '600' }}>Sync Settings</h4>
          <Toggle label="Auto-request reviews" checked={syncSettings.autoRequest} onChange={(v) => setSync('autoRequest', v)} />
          <Toggle label="Sync business hours" checked={syncSettings.syncHours} onChange={(v) => setSync('syncHours', v)} />
          <Toggle label="Reply notifications" checked={syncSettings.replyAlerts} onChange={(v) => setSync('replyAlerts', v)} />
        </Card>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span style={{ color: theme.textMuted }}>Reviews synced</span><span style={{ color: theme.text, fontWeight: '600' }}>127</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: theme.textMuted }}>Last sync</span><span style={{ color: theme.text, fontWeight: '600' }}>2 mins ago</span></div>
        </Card>
        <Button onClick={() => { showToast('Syncing now...'); }} variant="outline" style={{ marginTop: '16px' }} icon={RefreshCw}>Sync Now</Button>
      </div>
    </div>
  );
  };

  // ============================================
  // WALLET SCREEN
  // ============================================
  const WalletScreen = () => {
    const [walletTab, setWalletTab] = useState('activity'); // 'activity' | 'invoices'
    const transactions = [
      { id: 1, type: 'in', desc: 'Emma Davis - CD90 VWX', amount: 82.51, gross: 84.04, fee: 1.46, date: 'Today, 14:32' },
      { id: 6, type: 'in', desc: 'John Smith - Cover Job', amount: 75.00, gross: 75.00, fee: 0, date: 'Today, 13:01', isCover: true },
      { id: 2, type: 'in', desc: 'Tom Harris - EF12 YZA', amount: 147.54, gross: 149.99, fee: 2.45, date: 'Today, 11:15' },
      { id: 3, type: 'out', desc: 'Transfer to Bank', amount: 500.00, fee: 0, date: 'Yesterday' },
      { id: 4, type: 'in', desc: 'Lisa Chen - GH34 BCD', amount: 88.44, gross: 89.99, fee: 1.55, date: '2 days ago' },
      { id: 5, type: 'in', desc: 'James Wilson - JK56 MNP', amount: 122.43, gross: 124.50, fee: 2.07, date: '3 days ago' }
    ];

    const pendingInvoices = [
      { id: 'INV-0044', customer: 'Mike Palmer', plate: 'CD56 EFG', amount: 189.99, sent: '3 days ago', status: 'overdue' },
      { id: 'INV-0043', customer: 'Rachel Green', plate: 'KL89 MNO', amount: 149.99, sent: '5 days ago', status: 'overdue' },
      { id: 'INV-0045', customer: 'Dave Thompson', plate: 'PQ67 RST', amount: 224.50, sent: 'Today', status: 'sent' },
    ];
    const paidInvoices = [
      { id: 'INV-0042', customer: 'Emma Davis', plate: 'CD90 VWX', amount: 84.04, paid: 'Today', status: 'paid' },
      { id: 'INV-0041', customer: 'Tom Harris', plate: 'EF12 YZA', amount: 149.99, paid: 'Today', status: 'paid' },
      { id: 'INV-0040', customer: 'Lisa Chen', plate: 'GH34 BCD', amount: 89.99, paid: '2 days ago', status: 'paid' },
    ];
    const totalPending = pendingInvoices.reduce((s, i) => s + i.amount, 0);
    
    return (
      <div style={{ minHeight: '100vh', backgroundColor: theme.bg, paddingBottom: '100px' }}>
        <Toast />
        <Header title="My Wallet" />
        <div style={{ padding: '24px' }}>
          {/* BALANCE */}
          <Card highlight style={{ background: `linear-gradient(135deg, ${theme.primary}, #059669)` }}>
            <p style={{ margin: '0 0 8px 0', color: '#000', opacity: 0.7, fontSize: '14px' }}>Available Balance</p>
            <p style={{ margin: '0 0 16px 0', color: '#000', fontSize: '40px', fontWeight: '700' }}>{'\u00A3'}{walletBalance.toFixed(2)}</p>
            <Button onClick={() => navigateTo('wallet-withdraw')} style={{ backgroundColor: '#000', color: '#fff' }}>Transfer to Bank</Button>
          </Card>
          
          {/* SUMMARY ROW */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <Card style={{ flex: 1 }}>
              <p style={{ margin: 0, color: theme.textMuted, fontSize: '12px' }}>This Week</p>
              <p style={{ margin: '4px 0 0 0', color: theme.primary, fontSize: '20px', fontWeight: '700' }}>+{'\u00A3'}448</p>
            </Card>
            <Card style={{ flex: 1 }}>
              <p style={{ margin: 0, color: theme.textMuted, fontSize: '12px' }}>This Month</p>
              <p style={{ margin: '4px 0 0 0', color: theme.text, fontSize: '20px', fontWeight: '700' }}>{'\u00A3'}2,147</p>
            </Card>
            <Card style={{ flex: 1, backgroundColor: `${theme.primary}10`, borderColor: `${theme.primary}30` }}>
              <p style={{ margin: 0, color: theme.primary, fontSize: '12px' }}>Cover Jobs</p>
              <p style={{ margin: '4px 0 0 0', color: theme.primary, fontSize: '20px', fontWeight: '700' }}>+{'\u00A3'}150</p>
            </Card>
          </div>

          {/* PENDING INVOICES BANNER — always visible if outstanding */}
          {pendingInvoices.length > 0 && (
            <Card style={{ marginTop: '16px', borderColor: `${theme.warning}50`, borderWidth: '2px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div>
                  <p style={{ margin: 0, color: theme.text, fontWeight: '700', fontSize: '15px' }}>Money owed to you</p>
                  <p style={{ margin: '2px 0 0 0', color: theme.warning, fontWeight: '700', fontSize: '22px' }}>{'\u00A3'}{totalPending.toFixed(2)}</p>
                </div>
                <Badge variant={pendingInvoices.some(i => i.status === 'overdue') ? 'danger' : 'warning'}>
                  {pendingInvoices.filter(i => i.status === 'overdue').length > 0 
                    ? `${pendingInvoices.filter(i => i.status === 'overdue').length} overdue` 
                    : `${pendingInvoices.length} pending`}
                </Badge>
              </div>
              {pendingInvoices.map(inv => (
                <div key={inv.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderTop: `1px solid ${theme.border}` }}>
                  <div>
                    <p style={{ margin: 0, color: theme.text, fontWeight: '500', fontSize: '14px' }}>{inv.customer}</p>
                    <p style={{ margin: '2px 0 0 0', color: theme.textMuted, fontSize: '12px' }}>{inv.id} · {inv.plate} · Sent {inv.sent}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ margin: 0, color: inv.status === 'overdue' ? theme.danger : theme.text, fontWeight: '700', fontSize: '15px' }}>{'\u00A3'}{inv.amount.toFixed(2)}</p>
                    <p style={{ margin: '2px 0 0 0', color: inv.status === 'overdue' ? theme.danger : theme.warning, fontSize: '11px', fontWeight: '600', textTransform: 'uppercase' }}>{inv.status === 'overdue' ? 'Overdue' : 'Awaiting payment'}</p>
                  </div>
                </div>
              ))}
              <button onClick={() => navigateTo('invoices')} style={{ width: '100%', marginTop: '12px', padding: '10px', backgroundColor: theme.bgInput, border: `1px solid ${theme.border}`, borderRadius: '8px', color: theme.text, fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>Manage Invoices</button>
            </Card>
          )}

          {/* TABS: Activity / Recently Paid */}
          <div style={{ display: 'flex', gap: '4px', marginTop: '20px', marginBottom: '12px', backgroundColor: theme.bgInput, borderRadius: '10px', padding: '4px' }}>
            {['activity', 'invoices'].map(tab => (
              <button key={tab} onClick={() => setWalletTab(tab)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', backgroundColor: walletTab === tab ? theme.bgCard : 'transparent', color: walletTab === tab ? theme.text : theme.textMuted, fontWeight: walletTab === tab ? '600' : '400', fontSize: '14px', cursor: 'pointer', boxShadow: walletTab === tab ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}>
                {tab === 'activity' ? 'Recent Activity' : 'Paid Invoices'}
              </button>
            ))}
          </div>

          {walletTab === 'activity' && transactions.map(t => (
            <Card key={t.id} style={t.isCover ? { borderColor: `${theme.primary}30`, backgroundColor: `${theme.primary}05` } : {}}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '44px', height: '44px', backgroundColor: t.isCover ? `${theme.primary}20` : t.type === 'in' ? `${theme.primary}20` : `${theme.info}20`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {t.isCover ? <Shield size={20} color={theme.primary} /> : t.type === 'in' ? <ArrowRight size={20} color={theme.primary} style={{ transform: 'rotate(-45deg)' }} /> : <ArrowRight size={20} color={theme.info} style={{ transform: 'rotate(45deg)' }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <p style={{ margin: 0, color: theme.text, fontWeight: '500' }}>{t.desc}</p>
                    {t.isCover && <Badge variant="success">Cover</Badge>}
                  </div>
                  <p style={{ margin: '4px 0 0 0', color: theme.textMuted, fontSize: '13px' }}>{t.date}{t.fee > 0 ? ` · Fee: ${'\u00A3'}${t.fee.toFixed(2)}` : t.isCover ? ' · No fee — TYRE-FIT paid direct' : t.type === 'out' ? ' · Free' : ''}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ margin: 0, color: t.type === 'in' ? theme.primary : theme.text, fontWeight: '700', fontSize: '16px' }}>{t.type === 'in' ? '+' : '-'}{'\u00A3'}{t.amount.toFixed(2)}</p>
                  {t.gross && <p style={{ margin: '2px 0 0 0', color: theme.textMuted, fontSize: '12px', textDecoration: 'line-through' }}>{'\u00A3'}{t.gross.toFixed(2)}</p>}
                </div>
              </div>
            </Card>
          ))}

          {walletTab === 'invoices' && paidInvoices.map(inv => (
            <Card key={inv.id}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '44px', height: '44px', backgroundColor: `${theme.primary}20`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CheckCircle size={20} color={theme.primary} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, color: theme.text, fontWeight: '500' }}>{inv.customer}</p>
                  <p style={{ margin: '4px 0 0 0', color: theme.textMuted, fontSize: '13px' }}>{inv.id} · {inv.plate} · Paid {inv.paid}</p>
                </div>
                <p style={{ margin: 0, color: theme.primary, fontWeight: '700', fontSize: '16px' }}>+{'\u00A3'}{inv.amount.toFixed(2)}</p>
              </div>
            </Card>
          ))}
        </div>
        <BottomNav />
      </div>
    );
  };

  const WalletWithdrawScreen = () => {
    const [selectedAmount, setSelectedAmount] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [transferDone, setTransferDone] = useState(false);
    const transferAmt = selectedAmount === 'all' ? walletBalance : selectedAmount;
    
    const handleTransfer = () => {
      setShowConfirm(false);
      setTransferDone(true);
      setWalletBalance(prev => Math.max(0, prev - transferAmt));
    };
    
    return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.bg, paddingBottom: '100px' }}>
      <Toast />
      <Header title="Transfer to Bank" />
      <div style={{ padding: '24px' }}>
        <Card>
          <p style={{ margin: '0 0 8px 0', color: theme.textMuted, fontSize: '14px' }}>Available to Transfer</p>
          <p style={{ margin: '0 0 16px 0', color: theme.text, fontSize: '32px', fontWeight: '700' }}>£{walletBalance.toFixed(2)}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', backgroundColor: theme.bgInput, borderRadius: '8px' }}>
            <CreditCard size={20} color={theme.textMuted} />
            <span style={{ color: theme.text }}>Lloyds Bank ****4521</span>
            <button onClick={() => navigateTo('settings-bank')} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: theme.primary, cursor: 'pointer', fontWeight: '500' }}>Change</button>
          </div>
        </Card>
        
        <h3 style={{ fontSize: '16px', fontWeight: '600', color: theme.text, margin: '24px 0 12px 0' }}>How much?</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
          {[50, 100, 250].map(amt => (
            <button key={amt} onClick={() => setSelectedAmount(amt)} style={{ padding: '16px', backgroundColor: selectedAmount === amt ? `${theme.primary}20` : theme.bgCard, border: `2px solid ${selectedAmount === amt ? theme.primary : theme.border}`, borderRadius: '12px', color: selectedAmount === amt ? theme.primary : theme.text, fontWeight: '600', fontSize: '18px', cursor: 'pointer' }}>£{amt}</button>
          ))}
        </div>
        
        <button onClick={() => setSelectedAmount('all')} style={{ width: '100%', padding: '16px', backgroundColor: selectedAmount === 'all' ? theme.primary : theme.bgCard, border: selectedAmount === 'all' ? 'none' : `1px solid ${theme.border}`, borderRadius: '12px', color: selectedAmount === 'all' ? '#000' : theme.text, fontWeight: '600', fontSize: '18px', cursor: 'pointer', marginBottom: '16px' }}>All £{walletBalance.toFixed(2)}</button>
        
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Clock size={16} color={theme.textMuted} /><span style={{ color: theme.textMuted, fontSize: '14px' }}>Transfers arrive within 2 hours (UK bank days)</span></div>
        </Card>
        
        <Button onClick={() => setShowConfirm(true)} style={{ marginTop: '24px' }} disabled={!selectedAmount}>Transfer Now</Button>
      </div>
      
      {showConfirm && (
        <Modal title="Confirm Transfer" onClose={() => setShowConfirm(false)}>
          <div style={{ textAlign: 'center', padding: '8px 0 16px' }}>
            <p style={{ color: theme.textMuted, fontSize: '15px', margin: '0 0 16px 0' }}>You're transferring</p>
            <p style={{ color: theme.text, fontSize: '36px', fontWeight: '700', margin: '0 0 8px 0' }}>£{transferAmt.toFixed(2)}</p>
            <p style={{ color: theme.textMuted, fontSize: '14px', margin: '0 0 24px 0' }}>to Lloyds Bank ****4521</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Button variant="secondary" onClick={() => setShowConfirm(false)} fullWidth>Cancel</Button>
            <Button onClick={handleTransfer} fullWidth>Confirm</Button>
          </div>
        </Modal>
      )}
      
      {transferDone && (
        <Modal title="" onClose={() => { setTransferDone(false); goBack(); }}>
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div style={{ width: '72px', height: '72px', backgroundColor: `${theme.primary}20`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <CheckCircle size={40} color={theme.primary} />
            </div>
            <h2 style={{ color: theme.text, fontSize: '22px', fontWeight: '700', margin: '0 0 8px 0' }}>Transfer Submitted</h2>
            <p style={{ color: theme.text, fontSize: '28px', fontWeight: '700', margin: '0 0 16px 0' }}>£{transferAmt.toFixed(2)}</p>
            <div style={{ padding: '14px', backgroundColor: theme.bgInput, borderRadius: '10px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <Clock size={16} color={theme.warning} />
                <span style={{ color: theme.text, fontSize: '14px', fontWeight: '500' }}>Transfers can take up to 2 hours</span>
              </div>
              <p style={{ color: theme.textMuted, fontSize: '13px', margin: '6px 0 0 0' }}>UK bank working days, Mon–Fri. Weekend transfers process on the next working day.</p>
            </div>
            <p style={{ color: theme.textMuted, fontSize: '13px', margin: '0 0 20px 0' }}>Lloyds Bank ****4521</p>
            <Button onClick={() => { setTransferDone(false); goBack(); }} fullWidth>Done</Button>
          </div>
        </Modal>
      )}
    </div>
    );
  };

  const SettingsBankScreen = () => {
    const [accountHolder, setAccountHolder] = useState(signUpData.fullName || 'Dan Smith');
    const [sortCode, setSortCode] = useState('30-90-89');
    const [accountNumber, setAccountNumber] = useState('****4521');
    return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.bg, paddingBottom: '100px' }}>
      <Toast />
      <Header title="Bank Account" />
      <div style={{ padding: '24px' }}>
        <Card highlight>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <div style={{ width: '48px', height: '48px', backgroundColor: '#1a472a', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontWeight: '700', fontSize: '16px' }}>LB</span>
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: 0, color: theme.text, fontWeight: '600' }}>Lloyds Bank</h3>
              <p style={{ margin: '4px 0 0 0', color: theme.textMuted }}>Account ending ****4521</p>
            </div>
            <Badge variant="success">Active</Badge>
          </div>
        </Card>
        
        <Card>
          <h4 style={{ margin: '0 0 16px 0', color: theme.text, fontWeight: '600' }}>Account Details</h4>
          <Input label="Account Holder Name" value={accountHolder} onChange={setAccountHolder} />
          <Input label="Sort Code" value={sortCode} onChange={setSortCode} />
          <Input label="Account Number" value={accountNumber} onChange={setAccountNumber} />
        </Card>
        
        <Card>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <Shield size={20} color={theme.primary} />
            <div>
              <p style={{ margin: 0, color: theme.text, fontWeight: '500' }}>Your money is safe</p>
              <p style={{ margin: '4px 0 0 0', color: theme.textMuted, fontSize: '14px' }}>Transfers are protected by bank-level security. Money from your Wallet goes directly to this account.</p>
            </div>
          </div>
        </Card>
        
        <Button onClick={() => { showToast('Bank details saved'); goBack(); }} style={{ marginTop: '24px' }}>Save Changes</Button>
        <Button variant="outline" onClick={() => showToast('Opening verification...')} style={{ marginTop: '12px' }}>Change Bank Account</Button>
      </div>
    </div>
  );
  };

  const SettingsDepotsScreen = () => {
    const [editingDepot, setEditingDepot] = useState(null);
    const [depotName, setDepotName] = useState('');
    const [depotAddress, setDepotAddress] = useState('');
    return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.bg, paddingBottom: '100px' }}>
      <Toast />
      <Header title="Depot Locations" subtitle="Where you collect and store stock" />
      <div style={{ padding: '16px' }}>
        {signUpData.depots.map((depot, i) => (
          <Card key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ margin: 0, color: theme.text, fontWeight: '600' }}>{depot.name || 'Main Depot'}</h3>
              <Badge variant={i === 0 ? 'success' : 'info'}>{i === 0 ? 'Primary' : 'Secondary'}</Badge>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}><MapPin size={16} color={theme.textMuted} /><span style={{ color: theme.textMuted, fontSize: '14px' }}>{depot.address || '123 Main Street, London E1 4QJ'}</span></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Navigation size={16} color={theme.textMuted} /><span style={{ color: theme.textMuted, fontSize: '14px' }}>{depot.radius || 15} mile radius</span></div>
            {editingDepot === i ? (
              <div style={{ marginTop: '12px', padding: '12px', backgroundColor: theme.bgInput, borderRadius: '10px' }}>
                <Input label="Depot Name" value={depotName} onChange={setDepotName} placeholder="e.g. Main Depot" />
                <Input label="Address" value={depotAddress} onChange={setDepotAddress} placeholder="Full address" />
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Button size="small" fullWidth onClick={() => { const d = [...signUpData.depots]; d[i] = {...d[i], name: depotName, address: depotAddress}; setSignUpData({...signUpData, depots: d}); setEditingDepot(null); showToast('Depot updated'); }}>Save</Button>
                  <Button size="small" variant="secondary" fullWidth onClick={() => setEditingDepot(null)}>Cancel</Button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                <Button variant="outline" size="small" fullWidth onClick={() => { setEditingDepot(i); setDepotName(depot.name || 'Main Depot'); setDepotAddress(depot.address || ''); }}>Edit</Button>
                {i > 0 && <Button variant="secondary" size="small" fullWidth onClick={() => { const d = signUpData.depots.filter((_, idx) => idx !== i); setSignUpData({...signUpData, depots: d}); showToast('Depot removed'); }}>Remove</Button>}
              </div>
            )}
          </Card>
        ))}
        <Button variant="outline" icon={Plus} onClick={() => { setSignUpData({...signUpData, depots: [...signUpData.depots, {name: '', address: '', radius: 15}]}); setEditingDepot(signUpData.depots.length); setDepotName(''); setDepotAddress(''); }}>Add New Depot</Button>
      </div>
    </div>
    );
  };

  const SettingsInvoicesScreen = () => {
    const [invoiceBusinessName, setInvoiceBusinessName] = useState(signUpData.businessName || "Dan's Mobile Tyres");
    const [invoiceVatNumber, setInvoiceVatNumber] = useState(signUpData.vatNumber || 'GB123456789');
    const [invoicePrefix, setInvoicePrefix] = useState('INV-');
    const [dueDays, setDueDays] = useState('14');
    const [includeVat, setIncludeVat] = useState(true);
    const [autoRemind, setAutoRemind] = useState(true);
    const [footerText, setFooterText] = useState("Thank you for choosing Dan's Mobile Tyres. Payment is due within 14 days.");
    return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.bg, paddingBottom: '100px' }}>
      <Toast />
      <Header title="Invoice Settings" />
      <div style={{ padding: '24px' }}>
        <Card>
          <h4 style={{ margin: '0 0 12px 0', color: theme.text, fontWeight: '600' }}>Invoice Details</h4>
          <Input label="Business Name" value={invoiceBusinessName} onChange={setInvoiceBusinessName} />
          <Input label="VAT Number" value={invoiceVatNumber} onChange={setInvoiceVatNumber} />
          <Input label="Invoice Prefix" value={invoicePrefix} onChange={setInvoicePrefix} />
        </Card>
        <Card>
          <h4 style={{ margin: '0 0 12px 0', color: theme.text, fontWeight: '600' }}>Payment Terms</h4>
          <Input label="Due date (days)" value={dueDays} onChange={setDueDays} />
          <Toggle label="Include VAT breakdown" checked={includeVat} onChange={setIncludeVat} />
          <Toggle label="Auto-send reminders" checked={autoRemind} onChange={setAutoRemind} />
        </Card>
        <Card>
          <h4 style={{ margin: '0 0 12px 0', color: theme.text, fontWeight: '600' }}>Footer Text</h4>
          <textarea value={footerText} onChange={(e) => setFooterText(e.target.value)} placeholder="Thank you for your business!" style={{ width: '100%', minHeight: '80px', backgroundColor: theme.bgInput, border: `1px solid ${theme.border}`, borderRadius: '12px', padding: '12px', fontSize: '14px', color: theme.text, resize: 'vertical', boxSizing: 'border-box' }} />
        </Card>
        <Button onClick={() => { showToast('Invoice settings saved'); goBack(); }} style={{ marginTop: '16px' }}>Save Changes</Button>
      </div>
    </div>
  );
  };

  const SettingsCalendarScreen = () => {
    const [googleConnected, setGoogleConnected] = useState(true);
    const [appleConnected, setAppleConnected] = useState(false);
    const [syncOptions, setSyncOptions] = useState({ confirmed: true, customerPlate: true, location: true, travel: false, coverJobs: true });
    const [syncDirection, setSyncDirection] = useState('one_way');
    const setSyncOption = (key, value) => setSyncOptions(prev => ({ ...prev, [key]: value }));
    return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.bg, paddingBottom: '100px' }}>
      <Toast />
      <Header title="Calendar Sync" />
      <div style={{ padding: '16px' }}>
        
        {/* EXPLAINER */}
        <Card style={{ marginBottom: '12px', backgroundColor: `${theme.info}08`, borderColor: theme.info }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Info size={20} color={theme.info} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <p style={{ margin: '0 0 6px 0', color: theme.text, fontWeight: '600', fontSize: '15px' }}>This is optional</p>
              <p style={{ margin: 0, color: theme.textMuted, fontSize: '14px', lineHeight: 1.6 }}>TYRE-FIT already manages your bookings and schedule. Calendar sync copies your jobs to Google or Apple Calendar so you can see them alongside personal events. You don't need it to use TYRE-FIT.</p>
            </div>
          </div>
        </Card>
        
        {/* GOOGLE CALENDAR */}
        <Card style={{ marginBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{ width: '48px', height: '48px', backgroundColor: '#fff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${theme.border}` }}>
              <svg width="28" height="28" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: 0, color: theme.text, fontWeight: '600' }}>Google Calendar</h3>
              <Badge variant={googleConnected ? 'success' : 'default'}>{googleConnected ? 'Connected' : 'Not connected'}</Badge>
            </div>
            <button onClick={() => { setGoogleConnected(!googleConnected); showToast(googleConnected ? 'Google Calendar disconnected' : 'Google Calendar connected'); }} style={{ background: 'none', border: `1px solid ${theme.border}`, borderRadius: '8px', padding: '6px 12px', color: theme.textMuted, fontSize: '13px', cursor: 'pointer' }}>{googleConnected ? 'Disconnect' : 'Connect'}</button>
          </div>
        </Card>
        
        {/* APPLE CALENDAR */}
        <Card style={{ marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '48px', height: '48px', backgroundColor: '#000', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: 0, color: theme.text, fontWeight: '600' }}>Apple Calendar</h3>
              <Badge variant={appleConnected ? 'success' : 'default'}>{appleConnected ? 'Connected' : 'Not connected'}</Badge>
            </div>
            <Button variant="secondary" size="small" fullWidth={false} onClick={() => { setAppleConnected(!appleConnected); showToast(appleConnected ? 'Apple Calendar disconnected' : 'Apple Calendar connected'); }}>{appleConnected ? 'Disconnect' : 'Connect'}</Button>
          </div>
        </Card>
        
        {/* SYNC OPTIONS */}
        <Card style={{ marginBottom: '12px' }}>
          <h4 style={{ margin: '0 0 14px 0', color: theme.text, fontWeight: '600', fontSize: '15px' }}>What gets synced</h4>
          <Toggle label="Confirmed bookings" checked={syncOptions.confirmed} onChange={(v) => setSyncOption('confirmed', v)} />
          <Toggle label="Include customer name & plate" checked={syncOptions.customerPlate} onChange={(v) => setSyncOption('customerPlate', v)} />
          <Toggle label="Include location/address" checked={syncOptions.location} onChange={(v) => setSyncOption('location', v)} />
          <Toggle label="Add travel time before jobs" checked={syncOptions.travel} onChange={(v) => setSyncOption('travel', v)} />
          <Toggle label="Cover jobs" checked={syncOptions.coverJobs} onChange={(v) => setSyncOption('coverJobs', v)} />
        </Card>
        
        <Card>
          <h4 style={{ margin: '0 0 14px 0', color: theme.text, fontWeight: '600', fontSize: '15px' }}>Sync direction</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button onClick={() => setSyncDirection('one_way')} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', backgroundColor: syncDirection === 'one_way' ? `${theme.primary}10` : theme.bgInput, borderRadius: '10px', border: `1px solid ${syncDirection === 'one_way' ? theme.primary + '30' : theme.border}`, cursor: 'pointer', textAlign: 'left' }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: `2px solid ${theme.primary}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {syncDirection === 'one_way' && <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: theme.primary }} />}
              </div>
              <div>
                <p style={{ margin: 0, color: theme.text, fontWeight: '600', fontSize: '14px' }}>One-way (recommended)</p>
                <p style={{ margin: '2px 0 0 0', color: theme.textMuted, fontSize: '12px' }}>TYRE-FIT pushes jobs to your calendar</p>
              </div>
            </button>
            <button onClick={() => setSyncDirection('two_way')} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', backgroundColor: syncDirection === 'two_way' ? `${theme.primary}10` : theme.bgInput, borderRadius: '10px', border: `1px solid ${syncDirection === 'two_way' ? theme.primary + '30' : theme.border}`, cursor: 'pointer', textAlign: 'left' }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: `2px solid ${theme.textMuted}` }} />
              <div>
                <p style={{ margin: 0, color: theme.text, fontWeight: '600', fontSize: '14px' }}>Two-way</p>
                <p style={{ margin: '2px 0 0 0', color: theme.textMuted, fontSize: '12px' }}>Changes in either calendar update both — blocks personal events as busy time</p>
              </div>
            </button>
          </div>
        </Card>
        
        <Button onClick={() => { showToast('Calendar sync settings saved'); goBack(); }} style={{ marginTop: '16px' }}>Save Changes</Button>
      </div>
    </div>
  );
  };

  // ============================================
  // SETTINGS - ACCOUNTING SOFTWARE
  // ============================================
  const SettingsAccountingScreen = () => {
    const [connections, setConnections] = useState({ xero: true, quickbooks: false, freeagent: false });
    const apps = [
      { id: 'xero', name: 'Xero', desc: 'Most popular with UK sole traders', color: '#13B5EA' },
      { id: 'quickbooks', name: 'QuickBooks', desc: 'Invoicing, expenses, and tax tracking', color: '#2CA01C' },
      { id: 'freeagent', name: 'FreeAgent', desc: 'Built for freelancers and micro-businesses', color: '#47B5AE' },
    ];
    return (
      <div style={{ minHeight: '100vh', backgroundColor: theme.bg }}>
        <Header title="Accounting Software" subtitle="Export data or connect software" />
        <div style={{ padding: '16px' }}>

          {/* DEV NOTE: REVENUE STREAM — Accounting software affiliate/partner links.
              Xero Partner Programme, QuickBooks affiliate, FreeAgent referral programme.
              Each fitter who signs up through our tracked link = recurring commission.
              At 10,000 fitters even 20% conversion = 2,000 sign-ups = significant revenue.
              Implement: tracked affiliate URLs per fitter, conversion tracking dashboard,
              report on sign-ups and commission earned. This is a KEY secondary revenue stream. */}

          {/* CSV EXPORT — Available now */}
          <p style={{ margin: '0 0 12px 0', color: theme.textMuted, fontSize: '12px', textTransform: 'uppercase', fontWeight: '600', letterSpacing: '0.5px' }}>Available now</p>
          <Card style={{ marginBottom: '16px', borderColor: `${theme.primary}30` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: `${theme.primary}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <FileDown size={24} color={theme.primary} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, color: theme.text, fontWeight: '600', fontSize: '15px' }}>CSV Export</p>
                <p style={{ margin: '2px 0 0 0', color: theme.textMuted, fontSize: '13px' }}>Download jobs, invoices, mileage, and payments as a CSV. Send to your accountant or import into any software.</p>
              </div>
            </div>
            <Button style={{ marginTop: '12px' }} onClick={() => showToast('CSV exported — check your downloads')} icon={Download} fullWidth>Export All Data</Button>
          </Card>

          <p style={{ margin: '16px 0 12px 0', color: theme.textMuted, fontSize: '12px', textTransform: 'uppercase', fontWeight: '600', letterSpacing: '0.5px' }}>Direct sync</p>
          
          <Card style={{ marginBottom: '16px', backgroundColor: `${theme.primary}08`, borderColor: `${theme.primary}20` }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <RefreshCw size={22} color={theme.primary} style={{ flexShrink: 0 }} />
              <div>
                <h3 style={{ margin: '0 0 6px 0', color: theme.text, fontWeight: '700', fontSize: '15px' }}>What will sync automatically</h3>
                <p style={{ margin: 0, color: theme.textMuted, fontSize: '13px', lineHeight: 1.6 }}>Every completed job, invoice, payment, and mileage claim sent straight to your accounting software. No manual data entry.</p>
              </div>
            </div>
          </Card>

          {apps.map(app => (
            <Card key={app.id} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: `${app.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontWeight: '700', fontSize: '14px', color: app.color }}>{app.name[0]}{app.name[1]}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, color: theme.text, fontWeight: '600', fontSize: '15px' }}>{app.name}</p>
                  <p style={{ margin: '2px 0 0 0', color: theme.textMuted, fontSize: '13px' }}>{app.desc}</p>
                </div>
                <Badge variant={connections[app.id] ? 'success' : 'default'}>{connections[app.id] ? 'Connected' : 'Not connected'}</Badge>
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                <Button
                  variant={connections[app.id] ? 'secondary' : 'primary'}
                  size="small"
                  fullWidth
                  onClick={() => {
                    const next = !connections[app.id];
                    setConnections(prev => ({ ...prev, [app.id]: next }));
                    showToast(next ? `${app.name} connected` : `${app.name} disconnected`);
                  }}
                >
                  {connections[app.id] ? 'Disconnect' : 'Connect'}
                </Button>
                <Button
                  variant="outline"
                  size="small"
                  fullWidth
                  onClick={() => showToast(connections[app.id] ? `Syncing latest data to ${app.name}...` : `Connect ${app.name} first`)}
                >
                  Sync now
                </Button>
              </div>
            </Card>
          ))}

          {/* NO SOFTWARE YET — Affiliate sign-up links */}
          <p style={{ margin: '24px 0 12px 0', color: theme.textMuted, fontSize: '12px', textTransform: 'uppercase', fontWeight: '600', letterSpacing: '0.5px' }}>No accounting software yet?</p>
          <Card style={{ backgroundColor: `${theme.info}08`, borderColor: `${theme.info}20` }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Info size={22} color={theme.info} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <p style={{ margin: '0 0 8px 0', color: theme.text, fontWeight: '600', fontSize: '15px' }}>Automate your tax and bookkeeping</p>
                <p style={{ margin: '0 0 12px 0', color: theme.textMuted, fontSize: '13px', lineHeight: 1.6 }}>Accounting software tracks your income, expenses, mileage, and VAT automatically. No more spreadsheets or shoeboxes of receipts. When direct sync launches, TYRE-FIT will send everything straight to it.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {apps.map(app => (
                    <button key={app.id} onClick={() => showToast(`Opening ${app.name} sign-up page...`)} style={{ padding: '12px 14px', backgroundColor: app.color, border: 'none', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ color: '#fff', fontWeight: '600', fontSize: '14px' }}>Sign up to {app.name}</span>
                      <ChevronRight size={18} color="#fff" />
                    </button>
                  ))}
                </div>
                <p style={{ margin: '10px 0 0 0', color: theme.textMuted, fontSize: '11px', lineHeight: 1.5 }}>All three offer free trials. You can connect any of them now and start syncing jobs and invoices.</p>
              </div>
            </div>
          </Card>

          <Card style={{ marginTop: '16px' }}>
            <h4 style={{ margin: '0 0 8px 0', color: theme.text, fontWeight: '600', fontSize: '14px' }}>What will sync</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {['Completed jobs \u2192 Sales invoices', 'Card/QR payments \u2192 Bank receipts', 'Cash payments \u2192 Cash income entries', 'TYRE-FIT fees \u2192 Business expenses', 'Tyre purchases \u2192 Stock/cost entries', 'Wallet withdrawals \u2192 Bank transfers', 'Mileage \u2192 HMRC rate expense claims'].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={14} color={theme.primary} />
                  <span style={{ color: theme.textMuted, fontSize: '13px' }}>{item}</span>
                </div>
              ))}
            </div>
          </Card>

          <p style={{ margin: '16px 0 0 0', color: theme.textMuted, fontSize: '12px', textAlign: 'center', lineHeight: 1.5 }}>CSV export and direct sync are both available in this demo.</p>
        </div>
      </div>
    );
  };

  const SettingsTermsScreen = () => {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showDataExport, setShowDataExport] = useState(false);
    const [deleteTyped, setDeleteTyped] = useState('');
    const [privacyPrefs, setPrivacyPrefs] = useState({ analytics: true, marketing: false, updates: true });
    return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.bg, paddingBottom: '100px' }}>
      <Toast />
      <Header title="Terms & Privacy" />
      <div style={{ padding: '24px' }}>
        <Card onClick={() => setActiveLegalDoc('terms')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><FileCheck size={24} color={theme.info} /><div style={{ flex: 1 }}><h3 style={{ margin: 0, color: theme.text, fontWeight: '600' }}>Terms of Service</h3><p style={{ margin: '4px 0 0 0', color: theme.textMuted, fontSize: '14px' }}>Last updated: 1 Feb 2026</p></div><ChevronRight size={20} color={theme.textMuted} /></div>
        </Card>
        <Card onClick={() => setActiveLegalDoc('privacy')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><Shield size={24} color={theme.primary} /><div style={{ flex: 1 }}><h3 style={{ margin: 0, color: theme.text, fontWeight: '600' }}>Privacy Policy</h3><p style={{ margin: '4px 0 0 0', color: theme.textMuted, fontSize: '14px' }}>How we look after your data</p></div><ChevronRight size={20} color={theme.textMuted} /></div>
        </Card>
        <Card onClick={() => setActiveLegalDoc('cookies')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><Info size={24} color={theme.warning} /><div style={{ flex: 1 }}><h3 style={{ margin: 0, color: theme.text, fontWeight: '600' }}>Cookie Policy</h3><p style={{ margin: '4px 0 0 0', color: theme.textMuted, fontSize: '14px' }}>Minimal cookies to keep things running</p></div><ChevronRight size={20} color={theme.textMuted} /></div>
        </Card>
        <Card onClick={() => setActiveLegalDoc('customerdata')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><Users size={24} color={theme.info} /><div style={{ flex: 1 }}><h3 style={{ margin: 0, color: theme.text, fontWeight: '600' }}>Customer Data</h3><p style={{ margin: '4px 0 0 0', color: theme.textMuted, fontSize: '14px' }}>Your data, your control — how we look after it</p></div><ChevronRight size={20} color={theme.textMuted} /></div>
        </Card>
        <Card onClick={() => setActiveLegalDoc('fees')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><PoundSterling size={24} color={theme.primary} /><div style={{ flex: 1 }}><h3 style={{ margin: 0, color: theme.text, fontWeight: '600' }}>Where the £5.95 Goes</h3><p style={{ margin: '4px 0 0 0', color: theme.textMuted, fontSize: '14px' }}>Full breakdown of the booking fee</p></div><ChevronRight size={20} color={theme.textMuted} /></div>
        </Card>
        
        <Card>
          <h4 style={{ margin: '0 0 12px 0', color: theme.text, fontWeight: '600' }}>Privacy Controls</h4>
          <Toggle label="Analytics" checked={privacyPrefs.analytics} onChange={(v) => setPrivacyPrefs(prev => ({ ...prev, analytics: v }))} />
          <Toggle label="Marketing emails" checked={privacyPrefs.marketing} onChange={(v) => setPrivacyPrefs(prev => ({ ...prev, marketing: v }))} />
          <Toggle label="Product updates" checked={privacyPrefs.updates} onChange={(v) => setPrivacyPrefs(prev => ({ ...prev, updates: v }))} />
        </Card>

        <Card>
          <h4 style={{ margin: '0 0 12px 0', color: theme.text, fontWeight: '600' }}>GDPR Toolkit</h4>
          <p style={{ margin: '0 0 12px 0', color: theme.textMuted, fontSize: '14px', lineHeight: 1.6 }}>Template privacy notices for your customers and a Data Processing Agreement for your records.</p>
          <Button variant="outline" size="small" onClick={() => { showToast('GDPR toolkit downloaded — check your downloads'); }}>Download GDPR Toolkit</Button>
          <p style={{ margin: '8px 0 0 0', color: theme.textMuted, fontSize: '12px', lineHeight: 1.5 }}>Includes: Customer Privacy Notice template, Data Processing Agreement (DPA), and consent form templates. All editable .docx files.</p>
        </Card>
        
        <Card onClick={() => setShowDataExport(true)} style={{ cursor: 'pointer' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><Download size={24} color={theme.info} /><div style={{ flex: 1 }}><h3 style={{ margin: 0, color: theme.text, fontWeight: '600' }}>Download My Data</h3><p style={{ margin: '4px 0 0 0', color: theme.textMuted, fontSize: '14px' }}>It's your data — get a full copy anytime</p></div><ChevronRight size={20} color={theme.textMuted} /></div>
        </Card>
        
        <Card onClick={() => setShowDeleteConfirm(true)} style={{ borderColor: theme.danger, cursor: 'pointer' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><Trash2 size={24} color={theme.danger} /><div style={{ flex: 1 }}><h3 style={{ margin: 0, color: theme.danger, fontWeight: '600' }}>Delete My Account & Data</h3><p style={{ margin: '4px 0 0 0', color: theme.textMuted, fontSize: '14px' }}>Permanent. Wallet balance transferred to bank first.</p></div><ChevronRight size={20} color={theme.textMuted} /></div>
        </Card>
        
        <p style={{ color: theme.textMuted, fontSize: '12px', textAlign: 'center', marginTop: '24px', lineHeight: 1.6 }}>TYRE-FIT Ltd · Registered in England & Wales · ICO Registered<br />TYRE-FIT v3.0.1 · © 2026 TYRE-FIT Ltd</p>

        {/* DELETE ACCOUNT CONFIRMATION */}
        {showDeleteConfirm && (
          <Modal title="Delete Account & Data" onClose={() => { setShowDeleteConfirm(false); setDeleteTyped(''); }}>
            <div style={{ padding: '12px', backgroundColor: `${theme.danger}10`, borderRadius: '10px', border: `1px solid ${theme.danger}30`, marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <AlertTriangle size={20} color={theme.danger} />
                <span style={{ color: theme.danger, fontWeight: '700' }}>This cannot be undone</span>
              </div>
              <p style={{ margin: 0, color: theme.textMuted, fontSize: '13px', lineHeight: 1.6 }}>This will permanently delete your account, all customer data, job history, photos, condition reports, and payment records. Your wallet balance of <strong style={{ color: theme.text }}>£{walletBalance.toFixed(2)}</strong> will be transferred to your bank first.</p>
            </div>
            <p style={{ margin: '0 0 8px 0', color: theme.text, fontSize: '14px' }}>Type <strong>DELETE</strong> to confirm:</p>
            <input value={deleteTyped} onChange={(e) => setDeleteTyped(e.target.value.toUpperCase())} placeholder="Type DELETE" style={{ width: '100%', padding: '14px', backgroundColor: theme.bgInput, border: `1px solid ${deleteTyped === 'DELETE' ? theme.danger : theme.border}`, borderRadius: '12px', fontSize: '16px', color: theme.text, outline: 'none', boxSizing: 'border-box', letterSpacing: '2px', textAlign: 'center' }} />
            <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
              <Button variant="secondary" onClick={() => { setShowDeleteConfirm(false); setDeleteTyped(''); }} fullWidth>Cancel</Button>
              <button onClick={() => { setShowDeleteConfirm(false); setDeleteTyped(''); showToast('Account deletion requested — you have 30 days to cancel'); }} disabled={deleteTyped !== 'DELETE'} style={{ flex: 1, padding: '14px', backgroundColor: deleteTyped === 'DELETE' ? theme.danger : theme.bgInput, border: 'none', borderRadius: '12px', color: deleteTyped === 'DELETE' ? '#fff' : theme.textMuted, fontWeight: '600', cursor: deleteTyped === 'DELETE' ? 'pointer' : 'not-allowed', fontSize: '15px' }}>Delete My Account</button>
            </div>
          </Modal>
        )}

        {/* DATA EXPORT CONFIRMATION */}
        {showDataExport && (
          <Modal title="Download My Data" onClose={() => setShowDataExport(false)}>
            <p style={{ margin: '0 0 16px 0', color: theme.textMuted, fontSize: '14px', lineHeight: 1.6 }}>We'll prepare a complete export of all your data and email it as a ZIP file. This includes:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
              {['Customer records & contact details', 'Job history with photos & GPS data', 'Tyre condition reports', 'Invoice history', 'Payment & wallet transactions', 'Review history & responses', 'Business profile & settings'].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={14} color={theme.primary} />
                  <span style={{ color: theme.text, fontSize: '13px' }}>{item}</span>
                </div>
              ))}
            </div>
            <p style={{ margin: '0 0 16px 0', color: theme.textMuted, fontSize: '13px' }}>The export will be sent to <strong style={{ color: theme.text }}>{signUpData.email || 'dan@example.com'}</strong> within 24 hours.</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Button variant="secondary" onClick={() => setShowDataExport(false)} fullWidth>Cancel</Button>
              <Button onClick={() => { setShowDataExport(false); showToast('Data export requested — check your email within 24 hours'); }} fullWidth icon={Download}>Request Export</Button>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
  };

  // ============================================
  // DISPATCHER VIEW - Owner only
  // ============================================
  const DispatcherScreen = () => {
    const [showInvite, setShowInvite] = useState(false);
    const [inviteMobile, setInviteMobile] = useState('');
    const [inviteName, setInviteName] = useState('');
    const [showFitterDetail, setShowFitterDetail] = useState(null);
    return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.bg, paddingBottom: '100px' }}>
      <Toast />
      <Header title="Dispatcher View" subtitle="Manage your team" />
      <div style={{ height: '200px', backgroundColor: theme.bgInput, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.3 }}><Map size={48} color={theme.textMuted} /></div>
        <div style={{ position: 'absolute', left: '12px', top: '12px', padding: '6px 10px', borderRadius: '20px', backgroundColor: `${theme.primary}15`, border: `1px solid ${theme.primary}30` }}>
          <p style={{ margin: 0, color: theme.primary, fontSize: '12px', fontWeight: '700' }}>Live map demo</p>
        </div>
        {mockTeamFitters.filter(f => f.status === 'active').map((fitter, i) => (
          <div key={fitter.id} style={{ position: 'absolute', top: `${30 + i * 40}%`, left: `${20 + i * 30}%`, width: '40px', height: '40px', backgroundColor: theme.primary, borderRadius: '50%', border: '3px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Truck size={20} color="#000" /></div>
        ))}
      </div>
      <div style={{ padding: '16px' }}>
        {/* STATS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '16px' }}>
          <Card style={{ marginBottom: 0 }}><p style={{ margin: 0, color: theme.textMuted, fontSize: '12px', textTransform: 'uppercase', fontWeight: '600' }}>Active</p><p style={{ margin: '4px 0 0 0', color: theme.primary, fontSize: '24px', fontWeight: '700' }}>{mockTeamFitters.filter(f => f.status === 'active').length}</p></Card>
          <Card style={{ marginBottom: 0 }}><p style={{ margin: 0, color: theme.textMuted, fontSize: '12px', textTransform: 'uppercase', fontWeight: '600' }}>Jobs Today</p><p style={{ margin: '4px 0 0 0', color: theme.text, fontSize: '24px', fontWeight: '700' }}>{mockTeamFitters.reduce((s, f) => s + f.jobsToday, 0)}</p></Card>
          <Card style={{ marginBottom: 0 }}><p style={{ margin: 0, color: theme.textMuted, fontSize: '12px', textTransform: 'uppercase', fontWeight: '600' }}>Revenue</p><p style={{ margin: '4px 0 0 0', color: theme.primary, fontSize: '24px', fontWeight: '700' }}>£485</p></Card>
        </div>
        
        <Button onClick={() => navigateTo('quote-customer')} icon={Plus} style={{ marginBottom: '16px' }}>Create Quote & Assign to Fitter</Button>
        
        <h3 style={{ fontSize: '14px', fontWeight: '600', color: theme.textMuted, margin: '0 0 12px 0', textTransform: 'uppercase' }}>Your Fitters</h3>
        {mockTeamFitters.map(f => (
          <Card key={f.id} style={{ marginBottom: '10px' }}>
            <button onClick={() => setShowFitterDetail(showFitterDetail === f.id ? null : f.id)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              <div style={{ width: '48px', height: '48px', backgroundColor: f.status === 'active' ? `${theme.primary}20` : theme.bgInput, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <User size={24} color={f.status === 'active' ? theme.primary : theme.textMuted} />
                <div style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '14px', height: '14px', borderRadius: '50%', backgroundColor: f.status === 'active' ? theme.primary : theme.textMuted, border: `2px solid ${theme.bgCard}` }} />
              </div>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <h3 style={{ margin: 0, color: theme.text, fontWeight: '600' }}>{f.name}</h3>
                <p style={{ margin: '4px 0 0 0', color: f.status === 'active' ? theme.primary : theme.textMuted, fontSize: '14px', fontWeight: '500' }}>{f.currentJob || 'Offline'}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ margin: 0, color: theme.text, fontWeight: '700', fontSize: '18px' }}>{f.jobsToday}</p>
                <p style={{ margin: 0, color: theme.textMuted, fontSize: '12px' }}>jobs today</p>
              </div>
            </button>
            {showFitterDetail === f.id && (
              <div style={{ marginTop: '12px', padding: '12px', backgroundColor: theme.bgInput, borderRadius: '10px' }}>
                {/* FITTER PERFORMANCE STATS */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '12px' }}>
                  <div style={{ textAlign: 'center' }}><p style={{ margin: 0, color: theme.text, fontWeight: '700', fontSize: '16px' }}>{f.jobsToday}</p><p style={{ margin: 0, color: theme.textMuted, fontSize: '10px' }}>Today</p></div>
                  <div style={{ textAlign: 'center' }}><p style={{ margin: 0, color: theme.primary, fontWeight: '700', fontSize: '16px' }}>£{(f.jobsToday * 95).toFixed(0)}</p><p style={{ margin: 0, color: theme.textMuted, fontSize: '10px' }}>Earned</p></div>
                  <div style={{ textAlign: 'center' }}><p style={{ margin: 0, color: '#eab308', fontWeight: '700', fontSize: '16px' }}>4.9/5</p><p style={{ margin: 0, color: theme.textMuted, fontSize: '10px' }}>Rating</p></div>
                  <div style={{ textAlign: 'center' }}><p style={{ margin: 0, color: theme.text, fontWeight: '700', fontSize: '16px' }}>0</p><p style={{ margin: 0, color: theme.textMuted, fontSize: '10px' }}>Disputes</p></div>
                </div>
                {f.currentJob && (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Button size="small" variant="secondary" fullWidth onClick={() => showToast(`Opening ${f.name}'s live route in Google Maps...`)}>View Route</Button>
                    <Button size="small" variant="secondary" fullWidth onClick={() => showToast(`Reassign modal would show list of available fitters to take ${f.name}'s remaining jobs`)}>Reassign Jobs</Button>
                  </div>
                )}
                {!f.currentJob && <p style={{ margin: 0, color: theme.textMuted, fontSize: '13px', textAlign: 'center' }}>{f.name} is offline — no active jobs</p>}
              </div>
            )}
          </Card>
        ))}
        
        <Button variant="outline" icon={UserPlus} style={{ marginTop: '12px' }} onClick={() => setShowInvite(true)}>Invite Fitter</Button>
      </div>

      {/* INVITE FITTER MODAL */}
      {showInvite && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 200, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: '500px', backgroundColor: theme.bgCard, borderRadius: '20px 20px 0 0', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, color: theme.text, fontWeight: '700', fontSize: '18px' }}>Invite a Fitter</h3>
              <button onClick={() => setShowInvite(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} color={theme.textMuted} /></button>
            </div>
            <p style={{ margin: '0 0 16px 0', color: theme.textMuted, fontSize: '14px', lineHeight: 1.5 }}>They'll get a text with a link to download TYRE-FIT and join your team. No app store search needed.</p>
            <Input label="Their Name" placeholder="e.g. Jake" value={inviteName} onChange={setInviteName} />
            <Input label="Their Mobile" placeholder="07700 900456" value={inviteMobile} onChange={setInviteMobile} type="tel" />
            <Button onClick={() => { setShowInvite(false); setInviteMobile(''); setInviteName(''); showToast(`Invite sent to ${inviteName || 'fitter'} — they'll get a text with a download link`); }} disabled={!inviteMobile} icon={Send}>Send Invite via SMS</Button>
            <p style={{ margin: '12px 0 0 0', color: theme.textMuted, fontSize: '12px', textAlign: 'center' }}>They'll appear in your team once they accept</p>
          </div>
        </div>
      )}
      <BottomNav />
    </div>
    );
  };

  // ============================================
  // RENDER
  // ============================================
  // ============================================
  // DAY SUMMARY — end of day wrap-up
  // ============================================
  const custTheme = {
    bg: '#FFFFFF', bgCard: '#F8F9FA', bgInput: '#F0F2F5',
    text: '#1A1A2E', textMuted: '#6B7280', primary: '#00C853',
    border: '#E5E7EB', danger: '#EF4444', warning: '#F59E0B', info: '#3B82F6'
  };
  const CustCard = function(props) { return <div style={{ backgroundColor: '#fff', borderRadius: '14px', padding: '16px', border: '1px solid #e5e7eb', marginBottom: '12px', ...(props.style || {}) }}>{props.children}</div>; };
  const CustUrlBar = function(props) { return <div style={{ padding: '8px 16px', backgroundColor: '#F0F2F5', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #e5e7eb' }}><Lock size={12} color="#00C853" /><div style={{ flex: 1, padding: '6px 12px', backgroundColor: '#fff', borderRadius: '8px', fontSize: '12px', color: '#666', fontFamily: 'monospace' }}>{props.url}</div></div>; };

  const CustomerBookingScreen = () => {
    const [agreed, setAgreed] = useState(false);
    const [paying, setPaying] = useState(false);
    const [paid, setPaid] = useState(false);
    const [customerPayMethod, setCustomerPayMethod] = useState('card');
    const fitterName = signUpData.businessName || "Dan's Mobile Tyres";
    const quotePrice = parseFloat(quoteData.price || '89.99');
    const bookingFee = 5.95;
    const customerTotal = quotePrice + bookingFee;

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
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: custTheme.textMuted }}>Arrival Window</span><span style={{ color: custTheme.text, fontWeight: '600' }}>{quoteData.bookingTime || '10:00-12:00'} window</span></div>
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button onClick={() => navigateTo('customer-receipt')} style={{ width: '100%', padding: '16px', backgroundColor: '#F5F3FF', border: '1px solid #DDD6FE', borderRadius: '12px', color: '#6D28D9', fontWeight: '700', fontSize: '16px', cursor: 'pointer' }}>View Receipt</button>
              <button onClick={() => navigateTo('customer-eta-tracking')} style={{ width: '100%', padding: '16px', backgroundColor: '#E5F3FF', border: '1px solid #BFDBFE', borderRadius: '12px', color: '#1D4ED8', fontWeight: '700', fontSize: '16px', cursor: 'pointer' }}>Track Fitter ETA</button>
              <button onClick={() => navigateTo('customer-cover-dashboard')} style={{ width: '100%', padding: '16px', backgroundColor: custTheme.primary, border: 'none', borderRadius: '12px', color: '#fff', fontWeight: '700', fontSize: '16px', cursor: 'pointer' }}>View Your Cover</button>
            </div>
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
        <h1 style={{ color: custTheme.text, fontSize: '28px', fontWeight: '800', margin: '0 0 4px 0' }}>Your Quote</h1>
        <p style={{ color: custTheme.textMuted, fontSize: '17px', margin: '0 0 20px 0' }}>Total price <strong style={{ color: custTheme.text }}>£{customerTotal.toFixed(2)}</strong> includes the £5.95 booking fee.</p>

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
            <span style={{ color: custTheme.text, fontWeight: '700', fontSize: '16px' }}>{quoteData.bookingDate || 'Tue 18 Feb'} · {quoteData.bookingTime || '10:00-12:00'} window</span>
          </div>
          <div style={{ borderTop: `1px solid ${custTheme.border}`, paddingTop: '12px', marginTop: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ color: custTheme.textMuted }}>Total price</span>
              <span style={{ color: custTheme.text, fontWeight: '700', fontSize: '22px' }}>£{customerTotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ color: custTheme.textMuted }}>Pay now</span>
              <span style={{ color: custTheme.primary, fontWeight: '700' }}>£{bookingFee.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ color: custTheme.textMuted }}>Pay fitter after fitting</span>
              <span style={{ color: custTheme.text, fontWeight: '700' }}>£{quotePrice.toFixed(2)}</span>
            </div>
            <p style={{ margin: 0, color: custTheme.textMuted, fontSize: '14px' }}>All bookings include 30-day emergency tyre cover.</p>
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
          <p style={{ margin: '0 0 4px 0', color: custTheme.textMuted, fontSize: '15px' }}>Pay now to secure booking</p>
          <p style={{ margin: '0 0 12px 0', color: custTheme.text, fontSize: '36px', fontWeight: '800' }}>£5.95</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center', marginBottom: '12px' }}>
            <Lock size={12} color={custTheme.textMuted} />
            <span style={{ color: custTheme.textMuted, fontSize: '12px' }}>Secured by Stripe</span>
          </div>
          <p style={{ margin: '0 0 8px 0', color: custTheme.text, fontSize: '13px', fontWeight: '600' }}>Choose payment method</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
            {[
              { id: 'apple_pay', label: 'Apple Pay' },
              { id: 'google_pay', label: 'Google Pay' },
              { id: 'paypal', label: 'PayPal' },
              { id: 'card', label: 'Card' }
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setCustomerPayMethod(m.id)}
                style={{
                  padding: '12px',
                  borderRadius: '10px',
                  border: `2px solid ${customerPayMethod === m.id ? custTheme.primary : custTheme.border}`,
                  backgroundColor: customerPayMethod === m.id ? '#00C85312' : '#fff',
                  color: customerPayMethod === m.id ? custTheme.primary : custTheme.text,
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                {m.label}
              </button>
            ))}
          </div>
          <button onClick={() => navigateTo('customer-cover-dashboard')} style={{ width: '100%', padding: '12px', border: '1px solid #A7F3D0', backgroundColor: '#ECFDF5', borderRadius: '10px', color: '#065F46', fontWeight: '700', fontSize: '15px', cursor: 'pointer', marginBottom: '12px' }}>
            View what your 30-day cover includes
          </button>
          <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', textAlign: 'left', cursor: 'pointer', marginBottom: '16px' }}>
            <input type="checkbox" checked={agreed} onChange={() => setAgreed(!agreed)} style={{ marginTop: '3px', width: '18px', height: '18px', accentColor: custTheme.primary }} />
            <span style={{ color: custTheme.textMuted, fontSize: '12px', lineHeight: 1.5 }}>
              I agree to the{' '}
              <button onClick={(e) => { e.preventDefault(); navigateTo('customer-booking-terms'); }} style={{ background: 'none', border: 'none', color: custTheme.info, textDecoration: 'underline', cursor: 'pointer', padding: 0, fontSize: '12px' }}>
                booking terms
              </button>{' '}
              and{' '}
              <button onClick={(e) => { e.preventDefault(); navigateTo('customer-cover-terms'); }} style={{ background: 'none', border: 'none', color: custTheme.info, textDecoration: 'underline', cursor: 'pointer', padding: 0, fontSize: '12px' }}>
                cover terms
              </button>
              . I understand the £5.95 booking fee is non-refundable and includes 30 days emergency tyre cover.
            </span>
          </label>
          <button
            disabled={!agreed || paying}
            onClick={() => {
              const methodLabel = { apple_pay: 'Apple Pay', google_pay: 'Google Pay', paypal: 'PayPal', card: 'Card' }[customerPayMethod] || 'Card';
              showToast(`Opening ${methodLabel}...`);
              setPaying(true);
              setTimeout(() => setPaid(true), 2000);
            }}
            style={{ width: '100%', padding: '18px', backgroundColor: agreed ? custTheme.primary : '#ccc', border: 'none', borderRadius: '14px', color: '#fff', fontWeight: '700', fontSize: '17px', cursor: agreed ? 'pointer' : 'default', opacity: paying ? 0.7 : 1 }}
          >
            {paying ? 'Processing...' : `Pay £5.95 with ${customerPayMethod === 'apple_pay' ? 'Apple Pay' : customerPayMethod === 'google_pay' ? 'Google Pay' : customerPayMethod === 'paypal' ? 'PayPal' : 'Card'}`}
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

  const CustomerBookingTermsScreen = () => (
    <div style={{ minHeight: '100vh', backgroundColor: custTheme.bg }}>
      <CustUrlBar url="tyre-fit.co/booking-terms" />
      <div style={{ padding: '20px', borderBottom: `1px solid ${custTheme.border}` }}>
        <button onClick={goBack} style={{ background: 'none', border: 'none', color: custTheme.info, fontSize: '15px', cursor: 'pointer', padding: 0, marginBottom: '12px' }}>← Back</button>
        <h1 style={{ color: custTheme.text, fontSize: '22px', fontWeight: '700', margin: 0 }}>Booking Terms</h1>
        <p style={{ color: custTheme.textMuted, fontSize: '13px', margin: '4px 0 0 0' }}>Before you pay the £5.95 booking fee</p>
      </div>
      <div style={{ padding: '20px' }}>
        <CustCard>
          <h3 style={{ color: custTheme.text, fontSize: '16px', fontWeight: '700', margin: '0 0 12px 0' }}>What the £5.95 does</h3>
          <p style={{ margin: '0 0 8px 0', color: custTheme.textMuted, fontSize: '13px', lineHeight: 1.6 }}>It locks your booking slot and activates your 30-day emergency tyre cover after the job is completed.</p>
          <p style={{ margin: 0, color: custTheme.textMuted, fontSize: '13px', lineHeight: 1.6 }}>This fee is paid to TYRE-FIT to run the platform and cover service.</p>
        </CustCard>
        <CustCard>
          <h3 style={{ color: custTheme.text, fontSize: '16px', fontWeight: '700', margin: '0 0 12px 0' }}>Refund rule</h3>
          <p style={{ margin: '0 0 8px 0', color: custTheme.textMuted, fontSize: '13px' }}>If cancellation happens within 5 minutes, the £5.95 can be refunded.</p>
          <p style={{ margin: 0, color: custTheme.textMuted, fontSize: '13px' }}>After 5 minutes, the £5.95 is non-refundable.</p>
        </CustCard>
        <CustCard>
          <h3 style={{ color: custTheme.text, fontSize: '16px', fontWeight: '700', margin: '0 0 12px 0' }}>Reschedule and no-shows</h3>
          <p style={{ margin: '0 0 8px 0', color: custTheme.textMuted, fontSize: '13px' }}>You can request rescheduling by replying to the booking text or calling your fitter.</p>
          <p style={{ margin: 0, color: custTheme.textMuted, fontSize: '13px' }}>If the fitter arrives and work cannot proceed due to customer no-show, the booking fee is not refunded.</p>
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

        <CustCard style={{ borderColor: '#10B98140', backgroundColor: '#10B98108' }}>
          <h3 style={{ color: custTheme.text, fontSize: '15px', fontWeight: '700', margin: '0 0 8px 0' }}>Keep this cover running</h3>
          <p style={{ margin: '0 0 8px 0', color: custTheme.textMuted, fontSize: '13px', lineHeight: 1.5 }}>
            Upgrade to ongoing cover for £7.99/month. Cancel anytime.
          </p>
          <button onClick={() => showToast('Opening £7.99/month upgrade checkout...')} style={{ width: '100%', padding: '14px', backgroundColor: custTheme.primary, border: 'none', borderRadius: '10px', color: '#fff', fontWeight: '700', fontSize: '15px', cursor: 'pointer' }}>
            Upgrade to £7.99/month
          </button>
        </CustCard>

        <div style={{ textAlign: 'center', marginTop: '8px' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
            <button onClick={() => navigateTo('customer-eta-tracking')} style={{ flex: 1, padding: '12px', backgroundColor: '#E5F3FF', border: '1px solid #BFDBFE', borderRadius: '10px', color: '#1D4ED8', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}>Track ETA</button>
            <button onClick={() => navigateTo('customer-receipt')} style={{ flex: 1, padding: '12px', backgroundColor: '#F5F3FF', border: '1px solid #DDD6FE', borderRadius: '10px', color: '#6D28D9', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}>Receipt</button>
            <button onClick={() => navigateTo('customer-pay-invoice')} style={{ flex: 1, padding: '12px', backgroundColor: '#F5F3FF', border: '1px solid #DDD6FE', borderRadius: '10px', color: '#6D28D9', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}>Pay Invoice</button>
          </div>
          <button onClick={() => navigateTo('customer-cover-terms')} style={{ background: 'none', border: 'none', color: custTheme.info, fontSize: '13px', cursor: 'pointer', textDecoration: 'underline' }}>View full cover terms</button>
          <p style={{ color: custTheme.textMuted, fontSize: '11px', marginTop: '8px' }}>Helpline: 0330 633 1247 (AI-powered, no queue)</p>
        </div>
      </div>
    </div>
    );
  };

  const CustomerClaimScreen = () => {
    const [claimType, setClaimType] = useState(null);
    const [claimLocation, setClaimLocation] = useState('');
    const [locationCaptured, setLocationCaptured] = useState(false);
    const [forceDenied, setForceDenied] = useState(false);

    useEffect(() => {
      setCustomerClaimStep('select-issue');
      setCustomerClaimPhotos({ tyre: false, plate: false });
      setClaimIssueType(null);
    }, []);

    if (customerClaimStep === 'checking') {
      return (
        <div style={{ minHeight: '100vh', backgroundColor: custTheme.bg }}>
          <CustUrlBar url="tyre-fit.co/claim/verifying" />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', minHeight: 'calc(100vh - 44px)' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '4px solid ' + custTheme.primary, borderTopColor: 'transparent', margin: '0 auto 24px', animation: 'spin 1s linear infinite' }} />
              <h2 style={{ color: custTheme.text, fontSize: '20px', fontWeight: '700', margin: '0 0 8px 0' }}>Verifying Your Claim</h2>
              <p style={{ color: custTheme.textMuted, fontSize: '14px', margin: '0 0 6px 0' }}>Checking against your condition report and location...</p>
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
              <button onClick={() => navigateTo('customer-eta-tracking')} style={{ width: '100%', padding: '14px', backgroundColor: '#E5F3FF', border: '1px solid #BFDBFE', borderRadius: '10px', color: '#1D4ED8', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}>Track Fitter ETA</button>
              <p style={{ color: custTheme.textMuted, fontSize: '12px', margin: 0 }}>Need to cancel? Call 0330 633 1247</p>
            </div>
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
              <CustCard style={{ marginBottom: '12px' }}>
                <p style={{ margin: '0 0 8px 0', color: custTheme.text, fontSize: '14px', fontWeight: '600' }}>Where are you now?</p>
                <input value={claimLocation} onChange={(e) => setClaimLocation(e.target.value)} placeholder="Postcode or address" style={{ width: '100%', padding: '12px', backgroundColor: custTheme.bgInput, border: '1px solid ' + custTheme.border, borderRadius: '10px', color: custTheme.text, fontSize: '14px', boxSizing: 'border-box', marginBottom: '8px' }} />
                <button onClick={() => { setClaimLocation('A12 Layby, near Stratford, E15'); setLocationCaptured(true); showToast('Location captured'); }} style={{ width: '100%', padding: '12px', backgroundColor: '#E5F3FF', border: '1px solid #BFDBFE', borderRadius: '10px', color: '#1D4ED8', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>
                  Use my current location
                </button>
                {(claimLocation || locationCaptured) && <p style={{ margin: '8px 0 0 0', color: custTheme.primary, fontSize: '12px' }}>Location ready for dispatch</p>}
              </CustCard>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <input id="simulate-denied" type="checkbox" checked={forceDenied} onChange={(e) => setForceDenied(e.target.checked)} style={{ width: '16px', height: '16px', accentColor: custTheme.warning }} />
                <label htmlFor="simulate-denied" style={{ color: custTheme.textMuted, fontSize: '12px', cursor: 'pointer' }}>Simulate denied claim (demo only)</label>
              </div>
              <button
                disabled={!customerClaimPhotos.tyre || !customerClaimPhotos.plate || !(claimLocation || locationCaptured)}
                onClick={() => {
                  setClaimIssueType(claimType);
                  setCustomerClaimStep('checking');
                  setTimeout(() => setCustomerClaimStep(forceDenied ? 'denied' : 'approved'), 2500);
                }}
                style={{ width: '100%', padding: '16px', backgroundColor: (!customerClaimPhotos.tyre || !customerClaimPhotos.plate || !(claimLocation || locationCaptured)) ? '#9CA3AF' : custTheme.primary, border: 'none', borderRadius: '12px', color: '#fff', fontWeight: '700', fontSize: '15px', cursor: (!customerClaimPhotos.tyre || !customerClaimPhotos.plate || !(claimLocation || locationCaptured)) ? 'default' : 'pointer' }}
              >
                Submit Claim
              </button>
              <p style={{ color: custTheme.textMuted, fontSize: '12px', textAlign: 'center', margin: '10px 0 0 0' }}>Need help now? Call 0330 633 1247</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const CustomerEtaTrackingScreen = () => (
    <div style={{ minHeight: '100vh', backgroundColor: custTheme.bg }}>
      <CustUrlBar url="tyre-fit.co/t/job_8742" />
      <div style={{ padding: '20px' }}>
        <button onClick={goBack} style={{ background: 'none', border: 'none', color: custTheme.info, fontSize: '15px', cursor: 'pointer', padding: 0, marginBottom: '12px' }}>← Back</button>
        <h1 style={{ color: custTheme.text, fontSize: '22px', fontWeight: '700', margin: '0 0 6px 0' }}>Fitter on the way</h1>
        <p style={{ color: custTheme.textMuted, fontSize: '14px', margin: '0 0 16px 0' }}>Live ETA updates</p>
        <CustCard>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span style={{ color: custTheme.textMuted }}>Fitter</span><span style={{ color: custTheme.text, fontWeight: '600' }}>{signUpData.businessName || "Dan's Mobile Tyres"}</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span style={{ color: custTheme.textMuted }}>Vehicle</span><span style={{ color: custTheme.text, fontWeight: '600' }}>AB12 CDE</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: custTheme.textMuted }}>ETA</span><span style={{ color: custTheme.primary, fontWeight: '700' }}>12 mins</span></div>
        </CustCard>
        <div style={{ height: '260px', backgroundColor: '#EEF2F7', border: '1px solid #E5E7EB', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
          <span style={{ color: custTheme.textMuted, fontSize: '14px' }}>Live map tracking view</span>
        </div>
        <button onClick={() => showToast('Calling fitter...')} style={{ width: '100%', padding: '14px', backgroundColor: custTheme.primary, border: 'none', borderRadius: '10px', color: '#fff', fontWeight: '700', fontSize: '15px', cursor: 'pointer' }}>Call Fitter</button>
      </div>
    </div>
  );

  const CustomerPayInvoiceScreen = () => {
    const [paying, setPaying] = useState(false);
    const [paid, setPaid] = useState(false);
    return (
      <div style={{ minHeight: '100vh', backgroundColor: custTheme.bg }}>
        <CustUrlBar url="tyre-fit.co/pay/inv_1021" />
        <div style={{ padding: '20px' }}>
          <button onClick={goBack} style={{ background: 'none', border: 'none', color: custTheme.info, fontSize: '15px', cursor: 'pointer', padding: 0, marginBottom: '12px' }}>← Back</button>
          <h1 style={{ color: custTheme.text, fontSize: '22px', fontWeight: '700', margin: '0 0 6px 0' }}>Pay Invoice</h1>
          <p style={{ color: custTheme.textMuted, fontSize: '14px', margin: '0 0 16px 0' }}>Secure card payment</p>
          <CustCard>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span style={{ color: custTheme.textMuted }}>Invoice</span><span style={{ color: custTheme.text, fontWeight: '600' }}>#1021</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span style={{ color: custTheme.textMuted }}>Vehicle</span><span style={{ color: custTheme.text, fontWeight: '600' }}>AB12 CDE</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: custTheme.textMuted }}>Amount due</span><span style={{ color: custTheme.primary, fontWeight: '700', fontSize: '20px' }}>{paid ? 'Paid' : '£124.99'}</span></div>
          </CustCard>
          <p style={{ margin: '0 0 12px 0', color: custTheme.textMuted, fontSize: '12px' }}>This opens a secure Stripe Payment Link: `tyre-fit.co/pay/inv_1021`</p>
          <button disabled={paid || paying} onClick={() => { showToast('Opening secure Stripe Payment Link...'); setPaying(true); setTimeout(() => { setPaying(false); setPaid(true); }, 1500); }} style={{ width: '100%', padding: '16px', backgroundColor: paid ? '#9CA3AF' : custTheme.primary, border: 'none', borderRadius: '12px', color: '#fff', fontWeight: '700', fontSize: '16px', cursor: paid ? 'default' : 'pointer' }}>
            {paid ? 'Payment Complete' : paying ? 'Processing...' : 'Pay Securely by Card'}
          </button>
        </div>
      </div>
    );
  };

const CustomerReceiptScreen = () => (
    <div style={{ minHeight: '100vh', backgroundColor: custTheme.bg }}>
      <CustUrlBar url="tyre-fit.co/r/job_8742" />
      <div style={{ padding: '20px' }}>
        <button onClick={goBack} style={{ background: 'none', border: 'none', color: custTheme.info, fontSize: '15px', cursor: 'pointer', padding: 0, marginBottom: '12px' }}>← Back</button>
        <h1 style={{ color: custTheme.text, fontSize: '22px', fontWeight: '700', margin: '0 0 6px 0' }}>Receipt</h1>
        <p style={{ color: custTheme.textMuted, fontSize: '14px', margin: '0 0 16px 0' }}>Payment confirmed and cover active</p>
        <CustCard>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span style={{ color: custTheme.textMuted }}>Service</span><span style={{ color: custTheme.text, fontWeight: '600' }}>2x 205/55R16 fitted</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span style={{ color: custTheme.textMuted }}>Vehicle</span><span style={{ color: custTheme.text, fontWeight: '600' }}>AB12 CDE</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span style={{ color: custTheme.textMuted }}>Paid</span><span style={{ color: custTheme.primary, fontWeight: '700' }}>£89.99</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: custTheme.textMuted }}>Cover</span><span style={{ color: custTheme.primary, fontWeight: '700' }}>Active until 08 Mar 2026</span></div>
        </CustCard>
        <CustCard>
          <h3 style={{ margin: '0 0 10px 0', color: custTheme.text, fontSize: '15px', fontWeight: '700' }}>Your Condition Report</h3>
          {[
            'Front Left — Legal (5.2mm)',
            'Front Right — Legal (2.1mm) — Replace soon',
            'Rear Left — Legal (4.8mm)',
            'Rear Right — Legal (3.0mm)'
          ].map((line, i) => (
            <p key={i} style={{ margin: '0 0 6px 0', color: custTheme.text, fontSize: '12px', padding: '6px 10px', backgroundColor: custTheme.bgInput, borderRadius: '6px' }}>{line}</p>
          ))}
          <button onClick={() => navigateTo('customer-cover-dashboard')} style={{ width: '100%', marginTop: '8px', padding: '12px', backgroundColor: '#E5F3FF', border: '1px solid #BFDBFE', borderRadius: '10px', color: '#1D4ED8', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>
            Open full report and cover dashboard
          </button>
        </CustCard>
        <CustCard style={{ borderColor: '#FCA5A5', backgroundColor: '#FEF2F2' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#991B1B', fontSize: '15px', fontWeight: '700' }}>Need to claim?</h3>
          <p style={{ margin: '0 0 8px 0', color: custTheme.textMuted, fontSize: '13px' }}>1. Tap claim in your cover dashboard.</p>
          <p style={{ margin: '0 0 8px 0', color: custTheme.textMuted, fontSize: '13px' }}>2. Upload tyre + plate photos and location.</p>
          <p style={{ margin: '0 0 12px 0', color: custTheme.textMuted, fontSize: '13px' }}>3. We verify and dispatch the nearest fitter.</p>
          <button onClick={() => navigateTo('customer-claim')} style={{ width: '100%', padding: '12px', backgroundColor: '#EF4444', border: 'none', borderRadius: '10px', color: '#fff', fontWeight: '700', fontSize: '13px', cursor: 'pointer', marginBottom: '8px' }}>
            Start a claim
          </button>
          <button onClick={() => showToast('Calling 0330 633 1247...')} style={{ width: '100%', padding: '12px', backgroundColor: '#fff', border: '1px solid #FCA5A5', borderRadius: '10px', color: '#991B1B', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>
            Call 0330 633 1247
          </button>
        </CustCard>
        <button onClick={() => showToast('Opening referral link...')} style={{ width: '100%', padding: '14px', backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '10px', color: '#065F46', fontWeight: '700', fontSize: '14px', cursor: 'pointer', marginBottom: '10px' }}>
          Refer a mate for 10% off
        </button>
        <p style={{ margin: 0, color: custTheme.info, fontSize: '13px', textDecoration: 'underline' }}>tyre-fit.co/ref/AB12CDE</p>
      </div>
    </div>
  );


  const renderScreen = () => {
    switch(currentScreen) {
      case 'signin': return <SignInScreen />;
      case 'welcome': return <WelcomeScreen />;
      case 'business-setup': return <BusinessSetupScreen />;
      case 'link-gmb': return <LinkGMBScreen />;
      case 'team-setup': return <TeamSetupScreen />;
      case 'setup-comms': return <SetupCommsScreen />;
      case 'setup-final': return <SetupFinalScreen />;
      case 'setup-complete': return <SetupCompleteScreen />;
      case 'setup-flow-board': return <SetupFlowBoardScreen />;
      case 'flow-storyboard': return <StoryboardFlowScreen />;
      case 'flow-runner': return <FlowRunnerScreen />;
      case 'dashboard': return <DashboardScreen />;
      case 'quote-hub': return <QuoteHubScreen />;
      case 'quote-customer': return <QuoteCustomerScreen />;
      case 'quick-quote': return <QuickQuoteScreen />;
      case 'quote-schedule': return <QuoteScheduleScreen />;
      case 'quote-job': return <QuoteJobScreen />;
      case 'quote-stock': return <QuoteStockScreen />;
      case 'quote-review': return <QuoteReviewScreen />;
      case 'cover-quote': return <CoverQuoteScreen />;
      case 'quote-sent': return <QuoteSentScreen />;
      case 'invoices': return <InvoicesScreen />;
      case 'invoice-create': return <InvoiceCreateScreen />;
      case 'disputes': return <DisputesScreen />;
      case 'dispute-detail': return <DisputeDetailScreen />;
      case 'route': return <RouteScreen />;
      case 'job-enroute': return <JobEnRouteScreen />;
      case 'job-before-photo': return <JobBeforePhotoScreen />;
      case 'job-after-photo': return <JobAfterPhotoScreen />;
      case 'job-condition-check': return <JobAfterPhotoScreen />;
      case 'job-payment': return <JobPaymentScreen />;
      case 'job-complete': return <JobCompleteScreen />;
      case 'cover-job-complete': return <CoverJobCompleteScreen />;
      case 'day-summary': return <DaySummaryScreen />;
      case 'stock': return <StockScreen />;
      case 'reviews': return <ReviewsScreen />;
      case 'emergency': return <EmergencyScreen />;
      case 'bookings': return <BookingsScreen />;
      case 'account': return <AccountScreen />;
      case 'dispatcher': return <DispatcherScreen />;
      case 'settings-profile': return <SettingsProfileScreen />;
      case 'settings-business': return <SettingsBusinessScreen />;
      case 'settings-payments': return <SettingsPaymentsScreen />;
      case 'settings-notifications': return <SettingsNotificationsScreen />;
      case 'settings-help': return <SettingsHelpScreen />;
      case 'settings-google': return <SettingsGoogleScreen />;
      case 'settings-bank': return <SettingsBankScreen />;
      case 'settings-depots': return <SettingsDepotsScreen />;
      case 'settings-invoices': return <SettingsInvoicesScreen />;
      case 'settings-calendar': return <SettingsCalendarScreen />;
      case 'settings-accounting': return <SettingsAccountingScreen />;
      case 'settings-terms': return <SettingsTermsScreen />;
      case 'wallet': return <WalletScreen />;
      case 'wallet-withdraw': return <WalletWithdrawScreen />;
      case 'evidence-vault': return <EvidenceVaultScreen />;
      case 'referral': return <ReferralScreen />;
      case 'settings-display': return <SettingsDisplayScreen />;
      case 'practice-mode': return <PracticeModeScreen />;
      case 'customer-booking': return <CustomerBookingScreen />;
      case 'customer-booking-terms': return <CustomerBookingTermsScreen />;
      case 'customer-cover-terms': return <CustomerCoverTermsScreen />;
      case 'customer-cover-dashboard': return <CustomerCoverDashboardScreen />;
      case 'customer-claim': return <CustomerClaimScreen />;
      case 'customer-eta-tracking': return <CustomerEtaTrackingScreen />;
      case 'customer-pay-invoice': return <CustomerPayInvoiceScreen />;
      case 'customer-receipt': return <CustomerReceiptScreen />;
      default: return <DashboardScreen />;
    }
  };


  const JobTimerBadge = () => jobTimerRunning ? (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', backgroundColor: theme.primary + '15', borderRadius: '20px', border: '1px solid ' + theme.primary + '30', marginBottom: '12px', justifyContent: 'center' }}>
      <Clock size={14} color={theme.primary} />
      <span style={{ color: theme.primary, fontSize: '13px', fontWeight: '700' }}>{formatJobTimer(jobTimer)} on job</span>
    </div>
  ) : null;

  const CancelJobButton = () => (
    <button onClick={() => setShowCancelJob(true)} style={{ width: '100%', padding: '12px', backgroundColor: 'transparent', border: 'none', color: theme.textMuted, fontSize: '13px', cursor: 'pointer', marginTop: '8px' }}>Cancel job</button>
  );

  const CancelJobModal = () => showCancelJob ? (
    <Modal title="Cancel This Job?" onClose={() => { setShowCancelJob(false); setCancelBy(''); setCancelReason(''); }}>
      {!cancelBy && (
        <>
          <p style={{ color: theme.textMuted, margin: '0 0 12px 0', fontSize: '14px' }}>Who is cancelling?</p>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <Button variant="secondary" onClick={() => setCancelBy('fitter')} fullWidth>Fitter</Button>
            <Button variant="secondary" onClick={() => setCancelBy('customer')} fullWidth>Customer</Button>
          </div>
        </>
      )}
      {cancelBy && !cancelReason && (
        <>
          <p style={{ color: theme.textMuted, margin: '0 0 12px 0', fontSize: '14px' }}>Why is it cancelled?</p>
          {(cancelBy === 'fitter'
            ? ['Wrong tyre / no stock', 'Unsafe location', 'Vehicle issue', 'Running behind', 'Other']
            : ['Changed mind', 'Found cheaper', 'No longer needed', 'Rescheduling', 'Other']
          ).map(function(label) { return (
            <button key={label} onClick={() => setCancelReason(label)} style={{ width: '100%', padding: '14px', marginBottom: '8px', backgroundColor: theme.bgInput, border: '1px solid ' + theme.border, borderRadius: '10px', cursor: 'pointer', textAlign: 'left', color: theme.text, fontSize: '14px' }}>
              {label}
            </button>
          ); })}
        </>
      )}
      {cancelBy && cancelReason && (
        <>
          <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: `${theme.warning}10`, border: `1px solid ${theme.warning}30`, marginBottom: '12px' }}>
            <p style={{ margin: '0 0 4px 0', color: theme.text, fontWeight: '700', fontSize: '14px' }}>Refund rule</p>
            <p style={{ margin: 0, color: theme.textMuted, fontSize: '13px', lineHeight: 1.5 }}>
              Cancel within 5 minutes: £5.95 refunded. After 5 minutes: £5.95 kept by TYRE-FIT.
            </p>
          </div>
          <p style={{ color: theme.textMuted, margin: '0 0 12px 0', fontSize: '14px' }}>
            Canceller: <strong style={{ color: theme.text, textTransform: 'capitalize' }}>{cancelBy}</strong><br />
            Reason: <strong style={{ color: theme.text }}>{cancelReason}</strong>
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button variant="secondary" onClick={() => { setCancelReason(''); }} fullWidth>Change Reason</Button>
            <Button variant="danger" onClick={() => {
              setShowCancelJob(false);
              setCancelBy('');
              setCancelReason('');
              setActiveJob(null);
              setIsCoverJob(false);
              resetJobState();
              showToast('Job cancelled');
              navigateTo('dashboard');
            }} fullWidth>Confirm Cancel</Button>
          </div>
        </>
      )}
      <Button variant="ghost" onClick={() => { setShowCancelJob(false); setCancelBy(''); setCancelReason(''); }} fullWidth>Go Back</Button>
    </Modal>
  ) : null;

  const CoverJobAlert = () => {
    if (!showCoverJobAlert || coverJobs.length === 0 || !signUpData.availability.emergency) return null;
    var cj = coverJobs[0];
    var tyreOnVan = mockStock.find(s => s.size === cj.tyreSize && s.location === 'Van');
    var isRepair = (cj.issue || '').toLowerCase().includes('puncture') || (cj.issue || '').toLowerCase().includes('repair');
    var estimatedEarning = isRepair ? '45 — 85' : '75 — 200';
    var driveTime = (cj.distance || '').includes('2') ? '22' : '15';
    return (
      <div style={{ position: 'fixed', inset: 0, backgroundColor: theme.bg, zIndex: 9999, display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 20px 16px', minHeight: '100%' }}>
            <div style={{ width: '100%', maxWidth: '340px', backgroundColor: theme.danger + '12', border: '2px solid ' + theme.danger + '40', borderRadius: '16px', padding: '16px', marginBottom: '16px', textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
                <Zap size={20} color={theme.danger} />
                <span style={{ color: theme.danger, fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px' }}>Emergency Cover Job</span>
                <Zap size={20} color={theme.danger} />
              </div>
              <p style={{ color: theme.danger, fontSize: '14px', fontWeight: '700', margin: 0 }}>Respond in 1:30 or it goes to the next fitter</p>
            </div>
            <div style={{ width: '100%', maxWidth: '340px', backgroundColor: theme.primary + '12', border: '2px solid ' + theme.primary, borderRadius: '16px', padding: '20px', marginBottom: '12px', textAlign: 'center' }}>
              <p style={{ margin: '0 0 4px 0', color: theme.textMuted, fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>You could earn</p>
              <p style={{ margin: '0 0 6px 0', color: theme.primary, fontSize: '32px', fontWeight: '800' }}>{'\u00A3'}{estimatedEarning}</p>
              <p style={{ margin: 0, color: theme.primary, fontSize: '13px', fontWeight: '600' }}>Paid direct to your wallet by TYRE-FIT</p>
            </div>
            <div style={{ width: '100%', maxWidth: '340px', display: 'flex', gap: '8px', marginBottom: '12px' }}>
              <div style={{ flex: 1, backgroundColor: theme.bgCard, border: '1px solid ' + theme.border, borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
                <Navigation size={18} color={theme.info} />
                <p style={{ margin: '4px 0 0 0', color: theme.text, fontSize: '20px', fontWeight: '700' }}>{cj.distance}</p>
                <p style={{ margin: '2px 0 0 0', color: theme.textMuted, fontSize: '11px' }}>away</p>
              </div>
              <div style={{ flex: 1, backgroundColor: theme.bgCard, border: '1px solid ' + theme.border, borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
                <Clock size={18} color={theme.warning} />
                <p style={{ margin: '4px 0 0 0', color: theme.text, fontSize: '20px', fontWeight: '700' }}>~{driveTime} min</p>
                <p style={{ margin: '2px 0 0 0', color: theme.textMuted, fontSize: '11px' }}>drive</p>
              </div>
              <div style={{ flex: 1, backgroundColor: theme.bgCard, border: '1px solid ' + (tyreOnVan ? theme.primary + '30' : theme.warning + '30'), borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
                <Package size={18} color={tyreOnVan ? theme.primary : theme.warning} />
                <p style={{ margin: '4px 0 0 0', color: tyreOnVan ? theme.primary : theme.warning, fontSize: '14px', fontWeight: '700' }}>{tyreOnVan ? 'On van' : 'Depot'}</p>
                <p style={{ margin: '2px 0 0 0', color: theme.textMuted, fontSize: '11px' }}>{cj.tyreSize}</p>
              </div>
            </div>
            <div style={{ width: '100%', maxWidth: '340px', backgroundColor: theme.bgCard, border: '1px solid ' + theme.border, borderRadius: '14px', padding: '14px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span style={{ color: theme.textMuted, fontSize: '13px' }}>Customer</span><span style={{ color: theme.text, fontWeight: '700', fontSize: '13px' }}>{cj.name}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span style={{ color: theme.textMuted, fontSize: '13px' }}>Vehicle</span><span style={{ color: theme.text, fontWeight: '500', fontSize: '13px' }}>{cj.vehicle || cj.plate}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span style={{ color: theme.textMuted, fontSize: '13px' }}>Issue</span><span style={{ color: theme.danger, fontWeight: '600', fontSize: '13px' }}>{cj.issue}</span></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', paddingTop: '8px', borderTop: '1px solid ' + theme.border }}><MapPin size={13} color={theme.textMuted} /><span style={{ color: theme.textMuted, fontSize: '12px' }}>{cj.location}</span></div>
            </div>
            <div style={{ width: '100%', maxWidth: '340px', display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '4px' }}>
              {['Called in', 'Photo sent', 'Cover verified'].map(function(step) { return (
                <span key={step} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 10px', backgroundColor: theme.primary + '10', borderRadius: '20px', fontSize: '11px', color: theme.primary, fontWeight: '600' }}>
                  <CheckCircle size={10} color={theme.primary} />{step}
                </span>
              ); })}
            </div>
          </div>
        </div>
        <div style={{ padding: '12px 20px 32px', display: 'flex', gap: '12px', flexShrink: 0, borderTop: '1px solid ' + theme.border }}>
          <button onClick={() => { setShowCoverJobAlert(false); }} style={{ flex: 1, padding: '16px', backgroundColor: theme.bgInput, border: '1px solid ' + theme.border, borderRadius: '14px', color: theme.text, fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}>{"Can't Do It"}</button>
          <button onClick={() => { setShowCoverJobAlert(false); setActiveCoverJob(cj); setCoverQuotePrice(''); setCoverDepotNeeded(!tyreOnVan); setEmergencyAccepted(true); navigateTo('cover-quote'); }} style={{ flex: 2, padding: '16px', backgroundColor: theme.primary, border: 'none', borderRadius: '14px', color: '#000', fontSize: '16px', fontWeight: '800', cursor: 'pointer' }}>{"Accept & Quote \u2192"}</button>
        </div>
      </div>
    );
  };

  React.useEffect(function() {
    if (coverApprovalPhase === 'sending') {
      var price = parseFloat(coverQuotePrice || 0);
      var overLimit = price > 200;
      var t1 = setTimeout(function() { setCoverApprovalPhase(overLimit ? 'rejected' : 'approved'); }, 2500);
      return function() { clearTimeout(t1); };
    }
    if (coverApprovalPhase === 'approved') {
      var t2 = setTimeout(function() {
        setCoverApprovalPhase('idle');
        if (coverJobInRoute) {
          setActiveJob(coverJobInRoute);
          setIsCoverJob(true);
          resetJobState();
        }
        navigateTo('job-enroute');
      }, 2000);
      return function() { clearTimeout(t2); };
    }
    if (coverApprovalPhase === 'rejected') {
      var t3 = setTimeout(function() { setCoverApprovalPhase('idle'); }, 3000);
      return function() { clearTimeout(t3); };
    }
  }, [coverApprovalPhase]);

  React.useEffect(function() {
    if (!jobTimerRunning) return;
    var interval = setInterval(function() { setJobTimer(function(prev) { return prev + 1; }); }, 1000);
    return function() { clearInterval(interval); };
  }, [jobTimerRunning]);

  return (
    <div style={{ maxWidth: '430px', margin: '0 auto', minHeight: '100vh', backgroundColor: theme.bg, color: theme.text }}>
      <style>{`* { box-sizing: border-box; } @keyframes spin { to { transform: rotate(360deg); } } html, body { height: 100%; overflow-y: auto; -webkit-overflow-scrolling: touch; } input::placeholder { color: ${theme.textMuted}; }`}</style>
      {/* v6: dashboard fitter/customer view toggle removed; customer demo entry is hidden in Account */}
      <CoverJobAlert />
      <CancelJobModal />
      {coverApprovalPhase && coverApprovalPhase !== 'idle' && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', color: '#fff', padding: '40px' }}>
            {coverApprovalPhase === 'sending' && (
              <div>
                <div style={{ width: '80px', height: '80px', border: '4px solid rgba(255,255,255,0.2)', borderTop: '4px solid ' + theme.primary, borderRadius: '50%', margin: '0 auto 24px', animation: 'spin 1s linear infinite' }} />
                <h2 style={{ margin: '0 0 8px 0', fontSize: '22px' }}>Verifying Cover</h2>
                <p style={{ margin: 0, opacity: 0.7 }}>Checking limits and eligibility...</p>
              </div>
            )}
            {coverApprovalPhase === 'approved' && (
              <div>
                <div style={{ width: '80px', height: '80px', backgroundColor: theme.primary + '20', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                  <CheckCircle size={40} color={theme.primary} />
                </div>
                <h2 style={{ margin: '0 0 8px 0', fontSize: '22px', color: theme.primary }}>Cover Approved</h2>
                <p style={{ margin: 0, opacity: 0.7 }}>Starting job...</p>
              </div>
            )}
            {coverApprovalPhase === 'rejected' && (
              <div>
                <div style={{ width: '80px', height: '80px', backgroundColor: theme.danger + '20', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                  <X size={40} color={theme.danger} />
                </div>
                <h2 style={{ margin: '0 0 8px 0', fontSize: '22px', color: theme.danger }}>Over Limit</h2>
                <p style={{ margin: 0, opacity: 0.7 }}>Quote exceeds cover limit</p>
                <button onClick={function() { setCoverApprovalPhase('idle'); }} style={{ marginTop: '20px', padding: '12px 24px', backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '12px', color: '#fff', cursor: 'pointer' }}>Back to Quote</button>
              </div>
            )}
          </div>
        </div>
      )}
      {activeLegalDoc && <LegalDocViewer docKey={activeLegalDoc} onClose={() => setActiveLegalDoc(null)} />}
      {renderScreen()}
      {flowRunnerActive && flowRunnerNext && (
        <div style={{ position: 'fixed', left: '50%', bottom: '10px', transform: 'translateX(-50%)', width: 'calc(100% - 20px)', maxWidth: '410px', backgroundColor: theme.bgCard, border: `1px solid ${theme.primary}60`, borderRadius: '14px', padding: '10px', zIndex: 2100, boxShadow: '0 10px 30px rgba(0,0,0,0.35)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button onClick={goToFlowRunnerNext} style={{ flex: 1, minHeight: '48px', backgroundColor: theme.primary, border: 'none', borderRadius: '12px', color: '#000', fontSize: '14px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <ArrowRight size={18} color="#000" />
              Next: {flowRunnerNext.label}
            </button>
            <button onClick={() => { setFlowRunnerActive(false); navigateTo('flow-runner'); }} style={{ minHeight: '48px', padding: '0 12px', backgroundColor: theme.bgInput, border: `1px solid ${theme.border}`, borderRadius: '12px', color: theme.text, fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>
              Exit Runner
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
