'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';

// =====================================================
// TYPES
// =====================================================
interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  inquiry_type: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
}
interface ReferralDocument {
  path: string;
  url: string | null;
  name: string;
}
interface Referral {
  id: string;
  referrer_name: string;
  referrer_email: string;
  referrer_phone: string;
  referrer_role: string;
  organization: string;
  participant_name: string;
  primary_disability: string;
  ndis_number: string;
  services_requested: string[];
  supporting_documents_signed?: ReferralDocument[];
  status: string;
  notes: string;
  created_at: string;
  date_of_birth: string;
  address: string;
  city: string;
  state: string;
  postcode: string;
  funding_type: string;
  referral_reason: string;
}
interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  is_approved: boolean;
  created_at: string;
  image_url?: string;
}
interface NewsletterSub {
  id: string;
  email: string;
  is_active: boolean;
  subscribed_at: string;
  created_at: string;
}
interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
}
interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

type Tab = 'inquiries' | 'referrals' | 'testimonials' | 'faqs' | 'newsletter';

// =====================================================
// HELPERS
// =====================================================
const formatDate = (d: string | null | undefined) => {
  if (!d) return '—';
  try {
    return new Date(d).toLocaleDateString('en-AU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return '—';
  }
};

const statusColor: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700',
  read: 'bg-amber-100 text-amber-700',
  responded: 'bg-green-100 text-green-700',
  reviewing: 'bg-amber-100 text-amber-700',
  accepted: 'bg-green-100 text-green-700',
  declined: 'bg-red-100 text-red-700',
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

// =====================================================
// TOAST COMPONENT
// =====================================================
function ToastContainer({ toasts, onDismiss }: { toasts: Toast[]; onDismiss: (id: number) => void }) {
  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map(t => (
        <div
          key={t.id}
          className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium animate-slide-up ${
            t.type === 'success'
              ? 'bg-green-50 border-green-200 text-green-800'
              : t.type === 'error'
              ? 'bg-red-50 border-red-200 text-red-800'
              : 'bg-blue-50 border-blue-200 text-blue-800'
          }`}
        >
          <span className="text-base flex-shrink-0">
            {t.type === 'success' ? '✅' : t.type === 'error' ? '❌' : 'ℹ️'}
          </span>
          <span className="flex-1 min-w-0">{t.message}</span>
          <button
            onClick={() => onDismiss(t.id)}
            className="flex-shrink-0 p-0.5 rounded hover:bg-black/5"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}

// =====================================================
// AUTH CONSTANTS
// =====================================================
const ADMIN_PASSWORD = 'Euky@123';
const AUTH_KEY = 'euky_admin_auth';

// =====================================================
// LOGIN SCREEN
// =====================================================
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [shaking, setShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, '1');
      onLogin();
    } else {
      setError('Incorrect password');
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900" />
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.08) 0%, transparent 50%)' }} />
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className={`relative z-10 w-full max-w-[380px] ${shaking ? 'animate-shake' : ''}`}>
        {/* Logo & Heading */}
        <div className="text-center mb-8">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <Image src="/resources/brand_logo.png" alt="Euky Care" fill className="object-contain drop-shadow-lg brightness-0 invert" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Welcome Back</h1>
          <p className="text-purple-200/80 text-sm mt-1">Sign in to manage Euky Care</p>
        </div>

        {/* Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-purple-100 uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <svg className="w-4.5 h-4.5 text-purple-300/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(''); }}
                  placeholder="Enter admin password"
                  autoFocus
                  className={`w-full pl-10 pr-10 py-3 bg-white/10 border rounded-xl text-sm text-white placeholder:text-purple-300/50 focus:ring-2 focus:ring-purple-400/50 focus:border-white/30 outline-none transition-all ${
                    error ? 'border-red-400/60 bg-red-500/10' : 'border-white/20 hover:border-white/30'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-300/70 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  )}
                </button>
              </div>
              {error && (
                <p className="text-red-300 text-xs mt-2 flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.072 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
                  {error}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-white text-purple-900 text-sm font-bold rounded-xl hover:bg-purple-50 transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
            >
              Sign In
            </button>
          </form>
        </div>

        {/* Back link */}
        <a
          href="/"
          className="flex items-center justify-center gap-1.5 mt-6 text-xs text-purple-300/70 hover:text-white transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Website
        </a>
      </div>

      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-8px); }
          40%, 80% { transform: translateX(8px); }
        }
        .animate-shake { animation: shake 0.4s ease-in-out; }
      `}</style>
    </div>
  );
}

// =====================================================
// MAIN COMPONENT
// =====================================================
export default function AdminPanel() {
  // Auth state
  const [authenticated, setAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    setAuthenticated(sessionStorage.getItem(AUTH_KEY) === '1');
    setAuthChecked(true);
  }, []);

  // Show nothing while checking auth (prevents flash)
  if (!authChecked) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
      </div>
    );
  }

  // Show login screen if not authenticated
  if (!authenticated) {
    return <LoginScreen onLogin={() => setAuthenticated(true)} />;
  }

  return <AdminDashboard />;
}

// =====================================================
// DASHBOARD (protected content)
// =====================================================
function AdminDashboard() {
  const [tab, setTab] = useState<Tab>('inquiries');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [counts, setCounts] = useState({ inquiries: 0, referrals: 0, testimonials: 0, faqs: 0, newsletter: 0 });

  // Data states
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [newsletter, setNewsletter] = useState<NewsletterSub[]>([]);

  const [loading, setLoading] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'faq' | 'testimonial'>('faq');
  const [editingItem, setEditingItem] = useState<FAQ | Testimonial | null>(null);
  const [modalLoading, setModalLoading] = useState(false);

  // Toast
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastIdRef = useRef(0);

  const showToast = useCallback((message: string, type: Toast['type'] = 'success') => {
    const id = ++toastIdRef.current;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Form states
  const [faqForm, setFaqForm] = useState({ question: '', answer: '', category: 'general', display_order: 0, is_active: true });
  const [testimonialForm, setTestimonialForm] = useState({ name: '', role: '', quote: '', rating: 5, is_approved: true });

  // =====================================================
  // DATA FETCHING
  // =====================================================
  const fetchData = useCallback(async (t: Tab, silent = false) => {
    if (!silent) setLoading(true);
    try {
      const map: Record<Tab, string> = {
        inquiries: '/api/admin/contacts?limit=100',
        referrals: '/api/admin/referrals?limit=100',
        testimonials: '/api/admin/testimonials?limit=100',
        faqs: '/api/admin/faqs?limit=100',
        newsletter: '/api/admin/newsletter?limit=100',
      };
      const res = await fetch(map[t]);
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Failed to fetch data');
      const items = data.data || [];
      switch (t) {
        case 'inquiries': setContacts(items); break;
        case 'referrals': setReferrals(items); break;
        case 'testimonials': setTestimonials(items); break;
        case 'faqs': setFaqs(items); break;
        case 'newsletter': setNewsletter(items); break;
      }
      setCounts(prev => ({ ...prev, [t]: data.total ?? items.length }));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      if (!silent) showToast(`Failed to load ${t}: ${msg}`, 'error');
    } finally {
      if (!silent) setLoading(false);
    }
  }, [showToast]);

  // Fetch all counts on mount
  useEffect(() => {
    const fetchCounts = async () => {
      const tabKeys: Tab[] = ['inquiries', 'referrals', 'testimonials', 'faqs', 'newsletter'];
      const map: Record<Tab, string> = {
        inquiries: '/api/admin/contacts?limit=1',
        referrals: '/api/admin/referrals?limit=1',
        testimonials: '/api/admin/testimonials?limit=1',
        faqs: '/api/admin/faqs?limit=1',
        newsletter: '/api/admin/newsletter?limit=1',
      };
      for (const key of tabKeys) {
        try {
          const res = await fetch(map[key]);
          const data = await res.json();
          if (data.success) setCounts(prev => ({ ...prev, [key]: data.total ?? 0 }));
        } catch {
          // silently ignore count fetch failures
        }
      }
    };
    fetchCounts();
  }, []);

  useEffect(() => {
    fetchData(tab);
  }, [tab, fetchData]);

  // =====================================================
  // ACTIONS
  // =====================================================
  const updateItem = useCallback(async (endpoint: string, body: Record<string, unknown>, successMsg?: string) => {
    try {
      const res = await fetch(endpoint, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Update failed');
      if (successMsg) showToast(successMsg);
      return true;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Update failed';
      showToast(msg, 'error');
      return false;
    }
  }, [showToast]);

  const deleteItem = useCallback(async (endpoint: string, itemLabel = 'Item') => {
    if (!confirm(`Are you sure you want to delete this ${itemLabel.toLowerCase()}?`)) return false;
    try {
      const res = await fetch(endpoint, { method: 'DELETE' });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Delete failed');
      showToast(`${itemLabel} deleted successfully`);
      return true;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Delete failed';
      showToast(msg, 'error');
      return false;
    }
  }, [showToast]);

  // =====================================================
  // MODAL HANDLERS
  // =====================================================
  const openAddModal = (type: 'faq' | 'testimonial') => {
    setModalType(type);
    setEditingItem(null);
    if (type === 'faq') {
      setFaqForm({ question: '', answer: '', category: 'general', display_order: 0, is_active: true });
    } else {
      setTestimonialForm({ name: '', role: '', quote: '', rating: 5, is_approved: true });
    }
    setShowModal(true);
  };

  const openEditModal = (type: 'faq' | 'testimonial', item: FAQ | Testimonial) => {
    setModalType(type);
    setEditingItem(item);
    if (type === 'faq') {
      const f = item as FAQ;
      setFaqForm({
        question: f.question,
        answer: f.answer,
        category: f.category || 'general',
        display_order: f.display_order || 0,
        is_active: f.is_active,
      });
    } else {
      const tm = item as Testimonial;
      setTestimonialForm({
        name: tm.name,
        role: tm.role,
        quote: tm.quote,
        rating: tm.rating,
        is_approved: tm.is_approved,
      });
    }
    setShowModal(true);
  };

  const handleModalSubmit = async () => {
    // Validation
    if (modalType === 'faq') {
      if (!faqForm.question.trim() || !faqForm.answer.trim()) {
        showToast('Question and answer are required', 'error');
        return;
      }
    } else {
      if (!testimonialForm.name.trim() || !testimonialForm.quote.trim()) {
        showToast('Name and quote are required', 'error');
        return;
      }
    }

    setModalLoading(true);
    try {
      if (modalType === 'faq') {
        if (editingItem) {
          const ok = await updateItem('/api/admin/faqs', { id: editingItem.id, ...faqForm }, 'FAQ updated successfully');
          if (!ok) { setModalLoading(false); return; }
        } else {
          const res = await fetch('/api/admin/faqs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(faqForm),
          });
          const data = await res.json();
          if (!data.success) throw new Error(data.error || 'Failed to create FAQ');
          showToast('FAQ created successfully');
        }
      } else {
        if (editingItem) {
          const ok = await updateItem('/api/admin/testimonials', { id: editingItem.id, ...testimonialForm }, 'Testimonial updated successfully');
          if (!ok) { setModalLoading(false); return; }
        } else {
          const res = await fetch('/api/admin/testimonials', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...testimonialForm, image_url: null }),
          });
          const data = await res.json();
          if (!data.success) throw new Error(data.error || 'Failed to create testimonial');
          showToast('Testimonial created successfully');
        }
      }
      setShowModal(false);
      fetchData(tab, true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Operation failed';
      showToast(msg, 'error');
    } finally {
      setModalLoading(false);
    }
  };

  // Helper to get data count for current tab
  const getCurrentDataLength = () => {
    switch (tab) {
      case 'inquiries': return contacts.length;
      case 'referrals': return referrals.length;
      case 'testimonials': return testimonials.length;
      case 'faqs': return faqs.length;
      case 'newsletter': return newsletter.length;
    }
  };

  // =====================================================
  // SIDEBAR CONFIG
  // =====================================================
  const sidebarTabs: { key: Tab; label: string; icon: string }[] = [
    { key: 'inquiries', label: 'Inquiries', icon: '💬' },
    { key: 'referrals', label: 'Referrals', icon: '📋' },
    { key: 'testimonials', label: 'Testimonials', icon: '⭐' },
    { key: 'faqs', label: 'FAQs', icon: '❓' },
    { key: 'newsletter', label: 'Newsletter', icon: '📧' },
  ];

  // =====================================================
  // RENDER
  // =====================================================
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* CSS for toast animation */}
      <style jsx global>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(16px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-slide-up { animation: slide-up 0.25s ease-out; }
      `}</style>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* =================== SIDEBAR =================== */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 flex-shrink-0">
              <Image src="/resources/brand_logo.png" alt="Euky Care" fill className="object-contain" />
            </div>
            <div>
              <h1 className="font-bold text-gray-900 text-sm">Euky Care</h1>
              <p className="text-[11px] text-gray-400 font-medium">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {sidebarTabs.map(st => (
            <button
              key={st.key}
              onClick={() => {
                setTab(st.key);
                setSidebarOpen(false);
                setExpandedId(null);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                tab === st.key
                  ? 'bg-purple-50 text-purple-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span className="text-base">{st.icon}</span>
              <span className="flex-1 text-left">{st.label}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                  tab === st.key ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-500'
                }`}
              >
                {counts[st.key]}
              </span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 space-y-2">
          <button
            onClick={() => {
              sessionStorage.removeItem(AUTH_KEY);
              window.location.reload();
            }}
            className="w-full flex items-center gap-2 text-xs text-red-400 hover:text-red-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign Out
          </button>
          <a
            href="/"
            className="flex items-center gap-2 text-xs text-gray-400 hover:text-purple-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Website
          </a>
        </div>
      </aside>

      {/* =================== MAIN CONTENT =================== */}
      <main className="flex-1 min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-gray-100"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  {sidebarTabs.find(st => st.key === tab)?.icon}{' '}
                  {sidebarTabs.find(st => st.key === tab)?.label}
                </h2>
                <p className="text-xs text-gray-400 hidden sm:block">
                  {counts[tab]} total{' '}
                  {tab === 'newsletter' ? 'subscriber' : 'record'}
                  {counts[tab] !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {(tab === 'faqs' || tab === 'testimonials') && (
                <button
                  onClick={() => openAddModal(tab === 'faqs' ? 'faq' : 'testimonial')}
                  className="px-3 py-2 sm:px-4 bg-purple-600 text-white text-xs sm:text-sm font-semibold rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <span className="hidden sm:inline">+ Add {tab === 'faqs' ? 'FAQ' : 'Testimonial'}</span>
                  <span className="sm:hidden">+ Add</span>
                </button>
              )}
              {tab === 'newsletter' && newsletter.length > 0 && (
                <button
                  onClick={() => {
                    const csv = [
                      'Email,Status,Date',
                      ...newsletter.map(
                        s =>
                          `"${s.email}",${s.is_active ? 'Active' : 'Inactive'},"${formatDate(s.subscribed_at || s.created_at)}"`
                      ),
                    ].join('\n');
                    const blob = new Blob([csv], { type: 'text/csv' });
                    const a = document.createElement('a');
                    a.href = URL.createObjectURL(blob);
                    a.download = `newsletter-${new Date().toISOString().split('T')[0]}.csv`;
                    a.click();
                    URL.revokeObjectURL(a.href);
                    showToast(`Exported ${newsletter.length} subscribers to CSV`);
                  }}
                  className="px-3 py-2 sm:px-4 bg-purple-600 text-white text-xs sm:text-sm font-semibold rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <span className="hidden sm:inline">⬇ Export CSV</span>
                  <span className="sm:hidden">⬇ CSV</span>
                </button>
              )}
              <button
                onClick={() => {
                  fetchData(tab);
                  showToast('Data refreshed', 'info');
                }}
                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                title="Refresh"
              >
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-6">
          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
            </div>
          )}

          {/* Empty State — ONLY for the current tab */}
          {!loading && getCurrentDataLength() === 0 && (
            <div className="text-center py-20 text-gray-400">
              <div className="text-5xl mb-3">📭</div>
              <p className="font-medium text-gray-500">No {tab} found</p>
              <p className="text-sm mt-1">
                {tab === 'faqs' || tab === 'testimonials'
                  ? `Click "+ Add" to create your first ${tab === 'faqs' ? 'FAQ' : 'testimonial'}.`
                  : `${capitalize(tab)} will appear here when submitted.`}
              </p>
            </div>
          )}

          {/* =================== INQUIRIES =================== */}
          {!loading && tab === 'inquiries' && contacts.length > 0 && (
            <div className="space-y-3">
              {contacts.map(c => (
                <div
                  key={c.id}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-sm transition-shadow"
                >
                  <div
                    onClick={() => {
                      const isExpanding = expandedId !== c.id;
                      setExpandedId(isExpanding ? c.id : null);
                      if (isExpanding && c.status === 'new') {
                        updateItem('/api/admin/contacts', { id: c.id, status: 'read' }, 'Marked as read').then(
                          ok => { if (ok) fetchData('inquiries', true); }
                        );
                      }
                    }}
                    className="flex items-center justify-between p-4 cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-2 h-2 rounded-full flex-shrink-0 ${
                          c.status === 'new'
                            ? 'bg-blue-500'
                            : c.status === 'read'
                            ? 'bg-amber-500'
                            : 'bg-green-500'
                        }`}
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-sm text-gray-900 truncate">{c.name}</span>
                          {c.status === 'new' && (
                            <span className="px-1.5 py-0.5 bg-blue-500 text-white text-[10px] font-bold rounded">
                              NEW
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 truncate">{c.subject || 'No subject'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[11px] font-semibold hidden sm:inline ${
                          statusColor[c.status] || 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {capitalize(c.status)}
                      </span>
                      <span className="text-[11px] text-gray-400 hidden md:inline">
                        {formatDate(c.created_at)}
                      </span>
                      <svg
                        className={`w-4 h-4 text-gray-400 transition-transform ${
                          expandedId === c.id ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  {expandedId === c.id && (
                    <div className="border-t border-gray-100 p-4 bg-gray-50/50">
                      <div className="grid sm:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="text-xs font-bold text-purple-700 uppercase tracking-wider mb-2">
                            Contact Info
                          </h4>
                          <div className="space-y-1 text-sm text-gray-700">
                            <p>
                              <span className="font-medium">Email:</span>{' '}
                              <a href={`mailto:${c.email}`} className="text-purple-600 hover:underline break-all">
                                {c.email}
                              </a>
                            </p>
                            {c.phone && (
                              <p>
                                <span className="font-medium">Phone:</span>{' '}
                                <a href={`tel:${c.phone}`} className="text-purple-600 hover:underline">{c.phone}</a>
                              </p>
                            )}
                            <p>
                              <span className="font-medium">Type:</span> {c.inquiry_type || '—'}
                            </p>
                            <p>
                              <span className="font-medium">Date:</span> {formatDate(c.created_at)}
                            </p>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-purple-700 uppercase tracking-wider mb-2">
                            Message
                          </h4>
                          <div className="text-sm text-gray-700 bg-white p-3 rounded-lg border border-gray-100 whitespace-pre-wrap max-h-48 overflow-y-auto">
                            {c.message}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-gray-100">
                        <div className="flex flex-wrap gap-1.5">
                          {['new', 'read', 'responded'].map(s => (
                            <button
                              key={s}
                              onClick={async () => {
                                const ok = await updateItem(
                                  '/api/admin/contacts',
                                  { id: c.id, status: s },
                                  `Status updated to "${capitalize(s)}"`
                                );
                                if (ok) fetchData('inquiries', true);
                              }}
                              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                                c.status === s
                                  ? (statusColor[s] || '') + ' ring-2 ring-offset-1 ring-current'
                                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                              }`}
                            >
                              {capitalize(s)}
                            </button>
                          ))}
                        </div>
                        <div className="flex gap-1.5">
                          <a
                            href={`mailto:${c.email}?subject=Re: ${encodeURIComponent(c.subject || '')}`}
                            className="px-3 py-1.5 bg-purple-600 text-white text-xs font-semibold rounded-md hover:bg-purple-700 transition-colors"
                          >
                            ✉ Reply
                          </a>
                          <button
                            onClick={async () => {
                              const ok = await deleteItem(`/api/admin/contacts?id=${c.id}`, 'Inquiry');
                              if (ok) fetchData('inquiries', true);
                            }}
                            className="px-3 py-1.5 bg-red-50 text-red-600 text-xs font-semibold rounded-md hover:bg-red-100 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* =================== REFERRALS =================== */}
          {!loading && tab === 'referrals' && referrals.length > 0 && (
            <div className="space-y-3">
              {referrals.map(r => (
                <div
                  key={r.id}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-sm transition-shadow"
                >
                  <div
                    onClick={() => setExpandedId(expandedId === r.id ? null : r.id)}
                    className="flex items-center justify-between p-4 cursor-pointer"
                  >
                    <div className="min-w-0">
                      <p className="font-semibold text-sm text-gray-900 truncate">
                        {r.participant_name || 'Unknown Participant'}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        NDIS: {r.ndis_number || '—'} · By: {r.referrer_name || '—'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                          statusColor[r.status] || 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {capitalize(r.status)}
                      </span>
                      <span className="text-[11px] text-gray-400 hidden md:inline">
                        {formatDate(r.created_at)}
                      </span>
                      <svg
                        className={`w-4 h-4 text-gray-400 transition-transform ${
                          expandedId === r.id ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  {expandedId === r.id && (
                    <div className="border-t border-gray-100 p-4 bg-gray-50/50">
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                        <div>
                          <h4 className="text-xs font-bold text-purple-700 uppercase tracking-wider mb-2">
                            Referrer
                          </h4>
                          <div className="space-y-1 text-sm text-gray-700">
                            <p><span className="font-medium">Name:</span> {r.referrer_name}</p>
                            <p><span className="font-medium">Role:</span> {r.referrer_role || '—'}</p>
                            <p>
                              <span className="font-medium">Email:</span>{' '}
                              <a href={`mailto:${r.referrer_email}`} className="text-purple-600 hover:underline break-all">
                                {r.referrer_email}
                              </a>
                            </p>
                            <p>
                              <span className="font-medium">Phone:</span>{' '}
                              <a href={`tel:${r.referrer_phone}`} className="text-purple-600 hover:underline">
                                {r.referrer_phone}
                              </a>
                            </p>
                            {r.organization && (
                              <p><span className="font-medium">Org:</span> {r.organization}</p>
                            )}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-purple-700 uppercase tracking-wider mb-2">
                            Participant
                          </h4>
                          <div className="space-y-1 text-sm text-gray-700">
                            <p><span className="font-medium">Name:</span> {r.participant_name}</p>
                            <p><span className="font-medium">DOB:</span> {r.date_of_birth || '—'}</p>
                            <p><span className="font-medium">Disability:</span> {r.primary_disability || '—'}</p>
                            <p><span className="font-medium">Address:</span> {r.address || '—'}</p>
                            <p>
                              <span className="font-medium">Location:</span>{' '}
                              {[r.city, r.state, r.postcode].filter(Boolean).join(', ') || '—'}
                            </p>
                            <p><span className="font-medium">Funding:</span> {r.funding_type || '—'}</p>
                            <p><span className="font-medium">NDIS #:</span> {r.ndis_number || '—'}</p>
                          </div>
                        </div>
                        <div className="sm:col-span-2 lg:col-span-1">
                          <h4 className="text-xs font-bold text-purple-700 uppercase tracking-wider mb-2">
                            Services Requested
                          </h4>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {(r.services_requested || []).length > 0 ? (
                              r.services_requested.map((svc, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-0.5 bg-purple-50 text-purple-700 text-xs rounded-md font-medium"
                                >
                                  {svc}
                                </span>
                              ))
                            ) : (
                              <span className="text-sm text-gray-400">None specified</span>
                            )}
                          </div>
                          {r.referral_reason && (
                            <>
                              <h4 className="text-xs font-bold text-purple-700 uppercase tracking-wider mb-1">
                                Reason
                              </h4>
                              <p className="text-sm text-gray-700 bg-white p-2 rounded-lg border border-gray-100 max-h-32 overflow-y-auto">
                                {r.referral_reason}
                              </p>
                            </>
                          )}
                          {r.notes && (
                            <div className="mt-2">
                              <h4 className="text-xs font-bold text-purple-700 uppercase tracking-wider mb-1">
                                Notes
                              </h4>
                              <p className="text-sm text-gray-700 bg-white p-2 rounded-lg border border-gray-100">
                                {r.notes}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                      {/* Supporting Documents */}
                      {r.supporting_documents_signed && r.supporting_documents_signed.length > 0 && (
                        <div className="mb-4 pt-3 border-t border-gray-100">
                          <h4 className="text-xs font-bold text-purple-700 uppercase tracking-wider mb-2">
                            Supporting Documents
                          </h4>
                          <div className="flex flex-col gap-2">
                            {r.supporting_documents_signed.map((doc, i) => (
                              doc.url ? (
                                <a
                                  key={i}
                                  href={doc.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-3 p-2.5 bg-white hover:bg-purple-50 rounded-lg border border-gray-200 hover:border-purple-300 transition-all group"
                                >
                                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                  </div>
                                  <span className="text-sm text-gray-700 group-hover:text-purple-700 flex-1 truncate font-medium">{doc.name}</span>
                                  <svg className="w-4 h-4 text-gray-400 group-hover:text-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                  </svg>
                                </a>
                              ) : (
                                <div key={i} className="flex items-center gap-3 p-2.5 bg-red-50 rounded-lg border border-red-100">
                                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                    </svg>
                                  </div>
                                  <span className="text-sm text-red-500 flex-1 truncate">{doc.name} — link expired, refresh page</span>
                                </div>
                              )
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-gray-100">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-xs font-semibold text-gray-500 mr-1">Status:</span>
                          {['new', 'reviewing', 'accepted', 'declined'].map(s => (
                            <button
                              key={s}
                              onClick={async () => {
                                const ok = await updateItem(
                                  '/api/admin/referrals',
                                  { id: r.id, status: s },
                                  `Referral status updated to "${capitalize(s)}"`
                                );
                                if (ok) fetchData('referrals', true);
                              }}
                              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                                r.status === s
                                  ? (statusColor[s] || '') + ' ring-2 ring-offset-1 ring-current'
                                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                              }`}
                            >
                              {capitalize(s)}
                            </button>
                          ))}
                        </div>
                        <button
                          onClick={async () => {
                            const ok = await deleteItem(`/api/admin/referrals?id=${r.id}`, 'Referral');
                            if (ok) fetchData('referrals', true);
                          }}
                          className="px-3 py-1.5 bg-red-50 text-red-600 text-xs font-semibold rounded-md hover:bg-red-100 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* =================== TESTIMONIALS =================== */}
          {!loading && tab === 'testimonials' && testimonials.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {testimonials.map(tm => (
                <div
                  key={tm.id}
                  className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-sm transition-shadow flex flex-col"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-9 h-9 bg-purple-100 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                        👤
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-sm text-gray-900 truncate">{tm.name}</p>
                        <p className="text-xs text-gray-500 truncate">{tm.role || 'Participant'}</p>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex-shrink-0 ${
                        tm.is_approved
                          ? 'bg-green-100 text-green-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {tm.is_approved ? 'Approved' : 'Pending'}
                    </span>
                  </div>
                  <div className="flex mb-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <svg
                        key={star}
                        className={`w-3.5 h-3.5 ${star <= tm.rating ? 'text-yellow-400' : 'text-gray-200'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 flex-1 line-clamp-4 leading-relaxed">
                    &ldquo;{tm.quote}&rdquo;
                  </p>
                  <p className="text-[11px] text-gray-400 mt-2">{formatDate(tm.created_at)}</p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 gap-1 flex-wrap">
                    <div className="flex gap-1">
                      <button
                        onClick={async () => {
                          const ok = await updateItem(
                            '/api/admin/testimonials',
                            { id: tm.id, is_approved: !tm.is_approved },
                            tm.is_approved ? 'Testimonial unapproved' : 'Testimonial approved ✓'
                          );
                          if (ok) fetchData('testimonials', true);
                        }}
                        className={`px-2 py-1 text-xs rounded-md font-medium transition-colors ${
                          tm.is_approved
                            ? 'bg-amber-50 text-amber-600 hover:bg-amber-100'
                            : 'bg-green-50 text-green-600 hover:bg-green-100'
                        }`}
                      >
                        {tm.is_approved ? 'Unapprove' : 'Approve'}
                      </button>
                      <button
                        onClick={() => openEditModal('testimonial', tm)}
                        className="px-2 py-1 text-xs rounded-md font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                      >
                        Edit
                      </button>
                    </div>
                    <button
                      onClick={async () => {
                        const ok = await deleteItem(`/api/admin/testimonials?id=${tm.id}`, 'Testimonial');
                        if (ok) fetchData('testimonials', true);
                      }}
                      className="px-2 py-1 text-xs rounded-md font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* =================== FAQs =================== */}
          {!loading && tab === 'faqs' && faqs.length > 0 && (
            <div className="space-y-3">
              {faqs.map(f => (
                <div
                  key={f.id}
                  className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-sm transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="px-2 py-0.5 bg-purple-50 text-purple-700 text-[10px] font-bold rounded uppercase">
                          {f.category}
                        </span>
                        <span className="text-[11px] text-gray-400">Order: {f.display_order}</span>
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            f.is_active
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {f.is_active ? 'Active' : 'Hidden'}
                        </span>
                      </div>
                      <h3 className="font-semibold text-sm text-gray-900 mb-1">{f.question}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{f.answer}</p>
                    </div>
                    <div className="flex gap-1.5 flex-shrink-0 self-end sm:self-start">
                      <button
                        onClick={async () => {
                          const ok = await updateItem(
                            '/api/admin/faqs',
                            { id: f.id, is_active: !f.is_active },
                            f.is_active ? 'FAQ hidden from website' : 'FAQ is now visible'
                          );
                          if (ok) fetchData('faqs', true);
                        }}
                        className={`px-2 py-1 text-xs rounded-md font-medium transition-colors ${
                          f.is_active
                            ? 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                            : 'bg-green-50 text-green-600 hover:bg-green-100'
                        }`}
                      >
                        {f.is_active ? 'Hide' : 'Show'}
                      </button>
                      <button
                        onClick={() => openEditModal('faq', f)}
                        className="px-2 py-1 text-xs rounded-md font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={async () => {
                          const ok = await deleteItem(`/api/admin/faqs?id=${f.id}`, 'FAQ');
                          if (ok) fetchData('faqs', true);
                        }}
                        className="px-2 py-1 text-xs rounded-md font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* =================== NEWSLETTER =================== */}
          {!loading && tab === 'newsletter' && newsletter.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {/* Stats */}
              <div className="grid grid-cols-3 border-b border-gray-100">
                <div className="p-3 sm:p-4 text-center border-r border-gray-100">
                  <div className="text-xl sm:text-2xl font-bold text-green-600">
                    {newsletter.filter(s => s.is_active).length}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-gray-500 font-medium">Active</div>
                </div>
                <div className="p-3 sm:p-4 text-center border-r border-gray-100">
                  <div className="text-xl sm:text-2xl font-bold text-red-500">
                    {newsletter.filter(s => !s.is_active).length}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-gray-500 font-medium">Inactive</div>
                </div>
                <div className="p-3 sm:p-4 text-center">
                  <div className="text-xl sm:text-2xl font-bold text-purple-600">{newsletter.length}</div>
                  <div className="text-[10px] sm:text-[11px] text-gray-500 font-medium">Total</div>
                </div>
              </div>
              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs">Email</th>
                      <th className="text-center px-4 py-3 font-semibold text-gray-600 text-xs">Status</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs hidden sm:table-cell">
                        Date
                      </th>
                      <th className="text-center px-4 py-3 font-semibold text-gray-600 text-xs">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {newsletter.map((sub, i) => (
                      <tr
                        key={sub.id}
                        className={i < newsletter.length - 1 ? 'border-b border-gray-50' : ''}
                      >
                        <td className="px-4 py-3 font-medium text-gray-900">
                          <span className="block truncate max-w-[140px] sm:max-w-[280px]">{sub.email}</span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              sub.is_active
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-600'
                            }`}
                          >
                            {sub.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-500 text-xs hidden sm:table-cell">
                          {formatDate(sub.subscribed_at || sub.created_at)}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={async () => {
                              const ok = await deleteItem(
                                `/api/admin/newsletter?id=${sub.id}`,
                                'Subscriber'
                              );
                              if (ok) fetchData('newsletter', true);
                            }}
                            className="px-2 py-1 text-xs rounded-md bg-red-50 text-red-600 hover:bg-red-100 font-medium transition-colors"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* =================== MODAL =================== */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4"
          onClick={() => !modalLoading && setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">
                {editingItem ? 'Edit' : 'Add'} {modalType === 'faq' ? 'FAQ' : 'Testimonial'}
              </h3>
              <button
                onClick={() => !modalLoading && setShowModal(false)}
                className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-50"
                disabled={modalLoading}
              >
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-5 space-y-4">
              {modalType === 'faq' ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Question *</label>
                    <input
                      value={faqForm.question}
                      onChange={e => setFaqForm(f => ({ ...f, question: e.target.value }))}
                      placeholder="Enter the FAQ question"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-gray-900 placeholder:text-gray-400"
                      disabled={modalLoading}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Answer *</label>
                    <textarea
                      value={faqForm.answer}
                      onChange={e => setFaqForm(f => ({ ...f, answer: e.target.value }))}
                      rows={4}
                      placeholder="Enter the FAQ answer"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none resize-none text-gray-900 placeholder:text-gray-400"
                      disabled={modalLoading}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select
                        value={faqForm.category}
                        onChange={e => setFaqForm(f => ({ ...f, category: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none bg-white text-gray-900"
                        disabled={modalLoading}
                      >
                        <option value="general">General</option>
                        <option value="ndis-basics">NDIS Basics</option>
                        <option value="funding">Funding</option>
                        <option value="euky-services">Euky Services</option>
                        <option value="accommodation">Accommodation</option>
                        <option value="support-coordination">Support Coordination</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                      <input
                        type="number"
                        value={faqForm.display_order}
                        onChange={e =>
                          setFaqForm(f => ({ ...f, display_order: parseInt(e.target.value) || 0 }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-gray-900"
                        disabled={modalLoading}
                      />
                    </div>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={faqForm.is_active}
                      onChange={e => setFaqForm(f => ({ ...f, is_active: e.target.checked }))}
                      className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      disabled={modalLoading}
                    />
                    <span className="text-sm text-gray-700">Active (visible on website)</span>
                  </label>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                      <input
                        value={testimonialForm.name}
                        onChange={e => setTestimonialForm(f => ({ ...f, name: e.target.value }))}
                        placeholder="Full name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-gray-900 placeholder:text-gray-400"
                        disabled={modalLoading}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                      <input
                        value={testimonialForm.role}
                        onChange={e => setTestimonialForm(f => ({ ...f, role: e.target.value }))}
                        placeholder="e.g., Participant, Family Member"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-gray-900 placeholder:text-gray-400"
                        disabled={modalLoading}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quote *</label>
                    <textarea
                      value={testimonialForm.quote}
                      onChange={e => setTestimonialForm(f => ({ ...f, quote: e.target.value }))}
                      rows={4}
                      placeholder="Enter the testimonial quote"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none resize-none text-gray-900 placeholder:text-gray-400"
                      disabled={modalLoading}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setTestimonialForm(f => ({ ...f, rating: star }))}
                          className={`w-8 h-8 rounded-lg transition-colors text-lg ${
                            star <= testimonialForm.rating
                              ? 'bg-yellow-100 text-yellow-500'
                              : 'bg-gray-100 text-gray-300'
                          }`}
                          disabled={modalLoading}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={testimonialForm.is_approved}
                      onChange={e =>
                        setTestimonialForm(f => ({ ...f, is_approved: e.target.checked }))
                      }
                      className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      disabled={modalLoading}
                    />
                    <span className="text-sm text-gray-700">Approved (visible on website)</span>
                  </label>
                </>
              )}
            </div>
            <div className="flex justify-end gap-2 p-5 border-t border-gray-100">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                disabled={modalLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleModalSubmit}
                disabled={modalLoading}
                className="px-4 py-2 text-sm font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {modalLoading && (
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                )}
                {editingItem ? 'Save Changes' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
