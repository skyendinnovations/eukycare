"use client";

import { useState, useEffect, useCallback } from "react";
import MotionDiv from "@/components/MotionDiv";

// Types
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
  status: string;
  notes: string;
  created_at: string;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  is_approved: boolean;
  created_at: string;
}

interface NewsletterSubscription {
  id: string;
  email: string;
  is_active: boolean;
  subscribed_at: string;
}

type TabType = "contacts" | "referrals" | "testimonials" | "newsletter";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("contacts");
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [newsletter, setNewsletter] = useState<NewsletterSubscription[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [counts, setCounts] = useState({ contacts: 0, referrals: 0, testimonials: 0, newsletter: 0 });

  // Fetch data for the active tab
  const fetchData = useCallback(async (tab: TabType) => {
    setLoading(true);
    setError(null);
    try {
      let url = `/api/admin/${tab}?limit=50`;
      if (statusFilter && tab !== "newsletter") {
        if (tab === "testimonials") {
          url += `&approved=${statusFilter === "approved" ? "true" : "false"}`;
        } else {
          url += `&status=${statusFilter}`;
        }
      }
      const res = await fetch(url);
      const data = await res.json();
      if (!data.success) throw new Error(data.error);

      switch (tab) {
        case "contacts":
          setContacts(data.data || []);
          setCounts((prev) => ({ ...prev, contacts: data.total || 0 }));
          break;
        case "referrals":
          setReferrals(data.data || []);
          setCounts((prev) => ({ ...prev, referrals: data.total || 0 }));
          break;
        case "testimonials":
          setTestimonials(data.data || []);
          setCounts((prev) => ({ ...prev, testimonials: data.total || 0 }));
          break;
        case "newsletter":
          setNewsletter(data.data || []);
          setCounts((prev) => ({ ...prev, newsletter: data.total || 0 }));
          break;
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab, fetchData]);

  // Update item
  const updateItem = async (tab: TabType, id: string, updates: Record<string, any>) => {
    try {
      const res = await fetch(`/api/admin/${tab}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...updates }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      fetchData(tab);
    } catch (err: any) {
      setError(err.message || "Failed to update");
    }
  };

  // Delete item
  const deleteItem = async (tab: TabType, id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      const res = await fetch(`/api/admin/${tab}?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      fetchData(tab);
    } catch (err: any) {
      setError(err.message || "Failed to delete");
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-AU", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const statusBadge = (status: string) => {
    const colors: Record<string, string> = {
      new: "bg-blue-100 text-blue-700",
      read: "bg-yellow-100 text-yellow-700",
      responded: "bg-green-100 text-green-700",
      reviewing: "bg-yellow-100 text-yellow-700",
      accepted: "bg-green-100 text-green-700",
      declined: "bg-red-100 text-red-700",
    };
    return (
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors[status] || "bg-gray-100 text-gray-700"}`}>
        {status}
      </span>
    );
  };

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    {
      id: "contacts",
      label: "Contacts",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: "referrals",
      label: "Referrals",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      id: "testimonials",
      label: "Testimonials",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
    },
    {
      id: "newsletter",
      label: "Newsletter",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-eukyPurple text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <MotionDiv initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">Admin Dashboard</h1>
                <p className="text-white/70 text-sm mt-1">Manage contacts, referrals, testimonials & newsletter</p>
              </div>
              <a
                href="/studio"
                target="_blank"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Admin Panel
              </a>
            </div>
          </MotionDiv>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setStatusFilter("");
                  setExpandedItem(null);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-eukyPurple text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {tab.icon}
                {tab.label}
                <span
                  className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                    activeTab === tab.id ? "bg-white/20 text-white" : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {counts[tab.id]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Status Filter */}
        {activeTab !== "newsletter" && (
          <div className="mb-4 flex items-center gap-2 flex-wrap">
            <span className="text-sm text-slate-500">Filter:</span>
            {activeTab === "contacts" &&
              ["", "new", "read", "responded"].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    statusFilter === s
                      ? "bg-eukyPurple text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {s || "All"}
                </button>
              ))}
            {activeTab === "referrals" &&
              ["", "new", "reviewing", "accepted", "declined"].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    statusFilter === s
                      ? "bg-eukyPurple text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {s || "All"}
                </button>
              ))}
            {activeTab === "testimonials" &&
              ["", "approved", "pending"].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    statusFilter === s
                      ? "bg-eukyPurple text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {s || "All"}
                </button>
              ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-eukyPurple/30 border-t-eukyPurple rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {/* CONTACTS TAB */}
            {activeTab === "contacts" && (
              <div className="space-y-3">
                {contacts.length === 0 ? (
                  <EmptyState message="No contact submissions found" />
                ) : (
                  contacts.map((contact) => (
                    <div key={contact.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                      <div
                        className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50"
                        onClick={() => setExpandedItem(expandedItem === contact.id ? null : contact.id)}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 bg-eukyPurple/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-eukyPurple font-bold text-sm">{contact.name.charAt(0)}</span>
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-slate-900 text-sm">{contact.name}</span>
                              {statusBadge(contact.status)}
                            </div>
                            <p className="text-xs text-slate-500 truncate">{contact.subject}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-slate-400 hidden sm:block">{formatDate(contact.created_at)}</span>
                          <svg className={`w-4 h-4 text-slate-400 transition-transform ${expandedItem === contact.id ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                      {expandedItem === contact.id && (
                        <div className="border-t border-slate-100 p-4 bg-slate-50/50">
                          <div className="grid sm:grid-cols-2 gap-4 mb-4">
                            <div><span className="text-xs text-slate-500">Email</span><p className="text-sm font-medium">{contact.email}</p></div>
                            <div><span className="text-xs text-slate-500">Phone</span><p className="text-sm font-medium">{contact.phone || "N/A"}</p></div>
                            <div><span className="text-xs text-slate-500">Type</span><p className="text-sm font-medium capitalize">{contact.inquiry_type}</p></div>
                            <div><span className="text-xs text-slate-500">Date</span><p className="text-sm font-medium">{formatDate(contact.created_at)}</p></div>
                          </div>
                          <div className="mb-4">
                            <span className="text-xs text-slate-500">Message</span>
                            <p className="text-sm text-slate-700 mt-1 whitespace-pre-wrap">{contact.message}</p>
                          </div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs text-slate-500 mr-2">Status:</span>
                            {["new", "read", "responded"].map((s) => (
                              <button
                                key={s}
                                onClick={() => updateItem("contacts", contact.id, { status: s })}
                                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                                  contact.status === s
                                    ? "bg-eukyPurple text-white"
                                    : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                                }`}
                              >
                                {s}
                              </button>
                            ))}
                            <button
                              onClick={() => deleteItem("contacts", contact.id)}
                              className="ml-auto px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}

            {/* REFERRALS TAB */}
            {activeTab === "referrals" && (
              <div className="space-y-3">
                {referrals.length === 0 ? (
                  <EmptyState message="No referrals found" />
                ) : (
                  referrals.map((referral) => (
                    <div key={referral.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                      <div
                        className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50"
                        onClick={() => setExpandedItem(expandedItem === referral.id ? null : referral.id)}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 bg-eukyGreen/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-eukyGreen font-bold text-sm">{referral.participant_name.charAt(0)}</span>
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-slate-900 text-sm">{referral.participant_name}</span>
                              {statusBadge(referral.status)}
                            </div>
                            <p className="text-xs text-slate-500 truncate">Referred by: {referral.referrer_name}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-slate-400 hidden sm:block">{formatDate(referral.created_at)}</span>
                          <svg className={`w-4 h-4 text-slate-400 transition-transform ${expandedItem === referral.id ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                      {expandedItem === referral.id && (
                        <div className="border-t border-slate-100 p-4 bg-slate-50/50">
                          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Referrer Information</h4>
                          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                            <div><span className="text-xs text-slate-500">Name</span><p className="text-sm font-medium">{referral.referrer_name}</p></div>
                            <div><span className="text-xs text-slate-500">Email</span><p className="text-sm font-medium">{referral.referrer_email}</p></div>
                            <div><span className="text-xs text-slate-500">Phone</span><p className="text-sm font-medium">{referral.referrer_phone}</p></div>
                            <div><span className="text-xs text-slate-500">Role</span><p className="text-sm font-medium capitalize">{referral.referrer_role}</p></div>
                            <div><span className="text-xs text-slate-500">Organization</span><p className="text-sm font-medium">{referral.organization || "N/A"}</p></div>
                          </div>
                          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Participant Details</h4>
                          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                            <div><span className="text-xs text-slate-500">Name</span><p className="text-sm font-medium">{referral.participant_name}</p></div>
                            <div><span className="text-xs text-slate-500">Primary Disability</span><p className="text-sm font-medium">{referral.primary_disability}</p></div>
                            <div><span className="text-xs text-slate-500">NDIS Number</span><p className="text-sm font-medium">{referral.ndis_number}</p></div>
                          </div>
                          {referral.services_requested && referral.services_requested.length > 0 && (
                            <div className="mb-4">
                              <span className="text-xs text-slate-500">Services Requested</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {referral.services_requested.map((service, i) => (
                                  <span key={i} className="px-2 py-0.5 bg-eukyGreen/10 text-eukyGreen rounded-full text-xs">
                                    {service}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs text-slate-500 mr-2">Status:</span>
                            {["new", "reviewing", "accepted", "declined"].map((s) => (
                              <button
                                key={s}
                                onClick={() => updateItem("referrals", referral.id, { status: s })}
                                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                                  referral.status === s
                                    ? "bg-eukyPurple text-white"
                                    : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                                }`}
                              >
                                {s}
                              </button>
                            ))}
                            <button
                              onClick={() => deleteItem("referrals", referral.id)}
                              className="ml-auto px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}

            {/* TESTIMONIALS TAB */}
            {activeTab === "testimonials" && (
              <div className="space-y-3">
                {testimonials.length === 0 ? (
                  <EmptyState message="No testimonials found" />
                ) : (
                  testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                      <div
                        className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50"
                        onClick={() => setExpandedItem(expandedItem === testimonial.id ? null : testimonial.id)}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 bg-yellow-50 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-yellow-500 font-bold text-sm">★</span>
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-slate-900 text-sm">{testimonial.name}</span>
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                testimonial.is_approved ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                              }`}>
                                {testimonial.is_approved ? "Approved" : "Pending"}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 truncate">{testimonial.quote.substring(0, 80)}...</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex text-yellow-400 text-xs">
                            {"★".repeat(testimonial.rating)}{"☆".repeat(5 - testimonial.rating)}
                          </div>
                          <svg className={`w-4 h-4 text-slate-400 transition-transform ${expandedItem === testimonial.id ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                      {expandedItem === testimonial.id && (
                        <div className="border-t border-slate-100 p-4 bg-slate-50/50">
                          <div className="grid sm:grid-cols-2 gap-4 mb-4">
                            <div><span className="text-xs text-slate-500">Name</span><p className="text-sm font-medium">{testimonial.name}</p></div>
                            <div><span className="text-xs text-slate-500">Role</span><p className="text-sm font-medium">{testimonial.role}</p></div>
                            <div><span className="text-xs text-slate-500">Rating</span><p className="text-sm font-medium">{testimonial.rating}/5</p></div>
                            <div><span className="text-xs text-slate-500">Date</span><p className="text-sm font-medium">{formatDate(testimonial.created_at)}</p></div>
                          </div>
                          <div className="mb-4">
                            <span className="text-xs text-slate-500">Quote</span>
                            <p className="text-sm text-slate-700 mt-1 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                          </div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <button
                              onClick={() => updateItem("testimonials", testimonial.id, { is_approved: true })}
                              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                                testimonial.is_approved
                                  ? "bg-green-600 text-white"
                                  : "bg-green-50 text-green-600 hover:bg-green-100"
                              }`}
                            >
                              ✓ Approve
                            </button>
                            <button
                              onClick={() => updateItem("testimonials", testimonial.id, { is_approved: false })}
                              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                                !testimonial.is_approved
                                  ? "bg-yellow-600 text-white"
                                  : "bg-yellow-50 text-yellow-600 hover:bg-yellow-100"
                              }`}
                            >
                              ✗ Reject
                            </button>
                            <button
                              onClick={() => deleteItem("testimonials", testimonial.id)}
                              className="ml-auto px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}

            {/* NEWSLETTER TAB */}
            {activeTab === "newsletter" && (
              <div>
                {newsletter.length === 0 ? (
                  <EmptyState message="No newsletter subscribers found" />
                ) : (
                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-slate-200 bg-slate-50">
                            <th className="text-left px-4 py-3 font-medium text-slate-600">Email</th>
                            <th className="text-left px-4 py-3 font-medium text-slate-600">Status</th>
                            <th className="text-left px-4 py-3 font-medium text-slate-600">Subscribed</th>
                            <th className="text-right px-4 py-3 font-medium text-slate-600">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {newsletter.map((sub) => (
                            <tr key={sub.id} className="border-b border-slate-100 hover:bg-slate-50">
                              <td className="px-4 py-3 font-medium text-slate-900">{sub.email}</td>
                              <td className="px-4 py-3">
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                  sub.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                }`}>
                                  {sub.is_active ? "Active" : "Inactive"}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-slate-500 text-xs">{formatDate(sub.subscribed_at)}</td>
                              <td className="px-4 py-3 text-right">
                                <button
                                  onClick={() => deleteItem("newsletter", sub.id)}
                                  className="px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
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
            )}

            {/* Refresh Button */}
            <div className="mt-6 text-center">
              <button
                onClick={() => fetchData(activeTab)}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:text-eukyPurple transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh Data
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
      <svg className="w-12 h-12 mx-auto text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
      </svg>
      <p className="text-slate-500 text-sm">{message}</p>
      <p className="text-slate-400 text-xs mt-1">Data will appear here when submitted through the website forms.</p>
    </div>
  );
}
