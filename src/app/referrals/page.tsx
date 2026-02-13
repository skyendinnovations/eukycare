"use client";

import { useState } from "react";
import Link from "next/link";

// Services for checkbox selection
const availableServices = [
  { id: "sil", label: "Supported Independent Living (SIL)" },
  { id: "mta", label: "Medium Term Accommodation (MTA)" },
  { id: "sta", label: "Short Term Accommodation (STA) / Respite" },
  { id: "support-coordination", label: "Support Coordination" },
  { id: "community-participation", label: "Community Participation" },
  { id: "personal-activities", label: "Assist Personal Activities" },
  { id: "household-tasks", label: "Household Tasks" },
  { id: "transport", label: "Assist Travel/Transportation" },
  { id: "nursing", label: "Community Nursing Services" },
  { id: "life-skills", label: "Development Life Skills" },
  { id: "group-activities", label: "Group/Centre Activities" },
];

// Risk factors for checkbox selection
const riskFactors = [
  { id: "behaviours", label: "Behaviours of Concern" },
  { id: "animals", label: "Animals on Premises" },
  { id: "violence", label: "History of Violence" },
  { id: "falls", label: "Falls Risk" },
  { id: "medication", label: "Complex Medication Needs" },
  { id: "mental-health", label: "Mental Health Support Needs" },
  { id: "none", label: "No Known Risks" },
];

export default function ReferralsPage() {
  const [formData, setFormData] = useState({
    // Referrer Information
    referrerName: "",
    organization: "",
    referrerRole: "",
    referrerEmail: "",
    referrerPhone: "",
    hasConsent: false,

    // Participant Details
    participantName: "",
    dateOfBirth: "",
    gender: "",
    primaryDisability: "",
    address: "",
    city: "",
    state: "",
    postcode: "",
    livingArrangements: "",

    // NDIS Plan Information
    ndisNumber: "",
    planStartDate: "",
    planEndDate: "",
    fundingType: "",
    planManagerName: "",
    planManagerEmail: "",
    goals: "",

    // Service Requirements
    servicesRequested: [] as string[],
    referralReason: "",
    riskFactors: [] as string[],
    interpreterRequired: false,
    interpreterLanguage: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckboxArrayChange = (arrayName: "servicesRequested" | "riskFactors", value: string) => {
    setFormData((prev) => {
      const currentArray = prev[arrayName];
      if (currentArray.includes(value)) {
        return { ...prev, [arrayName]: currentArray.filter((item) => item !== value) };
      } else {
        return { ...prev, [arrayName]: [...currentArray, value] };
      }
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadError(null);

    // Validate files
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    const validFiles = files.filter(file => {
      if (file.size > maxSize) {
        setUploadError(`${file.name} is too large. Maximum size is 10MB.`);
        return false;
      }
      if (!allowedTypes.includes(file.type)) {
        setUploadError(`${file.name} is not a supported file type. Please upload PDF or DOC files.`);
        return false;
      }
      return true;
    });

    setUploadedFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // First, create the referral
      const response = await fetch('/api/referrals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          referrer_name: formData.referrerName,
          organization: formData.organization,
          referrer_role: formData.referrerRole,
          referrer_email: formData.referrerEmail,
          referrer_phone: formData.referrerPhone,
          has_consent: formData.hasConsent,
          participant_name: formData.participantName,
          date_of_birth: formData.dateOfBirth,
          gender: formData.gender,
          primary_disability: formData.primaryDisability,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          postcode: formData.postcode,
          living_arrangements: formData.livingArrangements,
          ndis_number: formData.ndisNumber,
          plan_start_date: formData.planStartDate,
          plan_end_date: formData.planEndDate,
          funding_type: formData.fundingType,
          plan_manager_name: formData.planManagerName,
          plan_manager_email: formData.planManagerEmail,
          goals: formData.goals,
          services_requested: formData.servicesRequested,
          referral_reason: formData.referralReason,
          risk_factors: formData.riskFactors,
          interpreter_required: formData.interpreterRequired,
          interpreter_language: formData.interpreterLanguage,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to submit referral');
      }

      // If there are files to upload, upload them
      if (uploadedFiles.length > 0 && result.referralId) {
        const formData = new FormData();
        uploadedFiles.forEach((file) => {
          formData.append('files', file);
        });
        formData.append('referralId', result.referralId);

        const uploadResponse = await fetch('/api/referrals/upload', {
          method: 'POST',
          body: formData,
        });

        const uploadResult = await uploadResponse.json();
        
        if (!uploadResponse.ok || !uploadResult.success) {
          console.error('File upload failed:', uploadResult.error);
          // Don't fail the whole submission if file upload fails
        }
      }

      setIsSubmitted(true);
    } catch (error: any) {
      console.error('Referral form error:', error);
      setSubmitError(error.message || 'Failed to submit referral. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="min-h-screen py-20 bg-gradient-to-br from-white via-purple-50/30 to-purple-100/20 flex items-center justify-center">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-eukyGreen rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Referral Submitted Successfully!</h1>
          <p className="text-slate-600 mb-8">
            Thank you for your referral. Our team will review the information and contact you within 2 business days.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-5 py-2.5 bg-eukyPurple text-white font-medium rounded-full hover:bg-eukyPurple/90 transition-all"
            >
              Return Home
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center px-5 py-2.5 border-2 border-eukyPurple text-eukyPurple font-medium rounded-full hover:bg-eukyPurple/5 transition-all"
            >
              View Services
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 bg-gradient-to-br from-white via-purple-50/30 to-purple-100/20 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-eukyPurple/10 rounded-tr-full"></div>
        <div className="absolute top-0 right-0 w-48 sm:w-72 md:w-96 h-24 sm:h-36 md:h-48 bg-purple-100/30 rounded-bl-[60px] sm:rounded-bl-[80px] md:rounded-bl-[100px]"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 bg-eukyPurple/10 text-eukyPurple rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
            NDIS Referral Form
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-eukyPurple mb-4 sm:mb-6 leading-tight">
            Make a Referral
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Complete this form to refer a participant for our NDIS services. All information provided will be kept confidential and used solely for the purpose of this referral.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-10 sm:py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-10">
            {/* Section 1: Referrer Information */}
            <div className="bg-slate-50 rounded-2xl p-5 sm:p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-eukyPurple text-white rounded-lg sm:rounded-xl flex items-center justify-center font-bold text-sm sm:text-base">
                  1
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">Referrer Information</h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Referrer Full Name *</label>
                  <input
                    type="text"
                    name="referrerName"
                    value={formData.referrerName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-eukyPurple focus:ring-2 focus:ring-eukyPurple/20 outline-none transition-all text-sm"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Organization/Agency Name</label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-eukyPurple focus:ring-2 focus:ring-eukyPurple/20 outline-none transition-all text-sm"
                    placeholder="Enter organization name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Role/Relationship to Participant *</label>
                  <select
                    name="referrerRole"
                    value={formData.referrerRole}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-eukyPurple focus:ring-2 focus:ring-eukyPurple/20 outline-none transition-all text-sm bg-white"
                  >
                    <option value="">Select your role</option>
                    <option value="support-coordinator">Support Coordinator</option>
                    <option value="plan-manager">Plan Manager</option>
                    <option value="family-member">Family Member</option>
                    <option value="parent">Parent/Guardian</option>
                    <option value="doctor">Doctor/GP</option>
                    <option value="allied-health">Allied Health Professional</option>
                    <option value="social-worker">Social Worker</option>
                    <option value="self">Self-Referral</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    name="referrerEmail"
                    value={formData.referrerEmail}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-eukyPurple focus:ring-2 focus:ring-eukyPurple/20 outline-none transition-all text-sm"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number *</label>
                  <input
                    type="tel"
                    name="referrerPhone"
                    value={formData.referrerPhone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-eukyPurple focus:ring-2 focus:ring-eukyPurple/20 outline-none transition-all text-sm"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="hasConsent"
                      checked={formData.hasConsent}
                      onChange={handleInputChange}
                      required
                      className="mt-1 w-4 h-4 rounded border-slate-300 text-eukyPurple focus:ring-eukyPurple"
                    />
                    <span className="text-sm text-slate-600">
                      I confirm that I have obtained consent from the participant (or their legal guardian) to make this referral and share their personal information with Euky Care. *
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Section 2: Participant Details */}
            <div className="bg-slate-50 rounded-2xl p-5 sm:p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-eukyPurple text-white rounded-lg sm:rounded-xl flex items-center justify-center font-bold text-sm sm:text-base">
                  2
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">Participant Details</h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Participant Full Name *</label>
                  <input
                    type="text"
                    name="participantName"
                    value={formData.participantName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-eukyPurple focus:ring-2 focus:ring-eukyPurple/20 outline-none transition-all text-sm"
                    placeholder="Enter participant's full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Date of Birth *</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-eukyPurple focus:ring-2 focus:ring-eukyPurple/20 outline-none transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Gender Identity</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-eukyPurple focus:ring-2 focus:ring-eukyPurple/20 outline-none transition-all text-sm bg-white"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="non-binary">Non-Binary</option>
                    <option value="prefer-not">Prefer not to say</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Primary Disability/Diagnosis *</label>
                  <input
                    type="text"
                    name="primaryDisability"
                    value={formData.primaryDisability}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-eukyPurple focus:ring-2 focus:ring-eukyPurple/20 outline-none transition-all text-sm"
                    placeholder="Enter primary disability"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Residential Address *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-eukyPurple focus:ring-2 focus:ring-eukyPurple/20 outline-none transition-all text-sm"
                    placeholder="Enter street address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">City/Suburb *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-eukyPurple focus:ring-2 focus:ring-eukyPurple/20 outline-none transition-all text-sm"
                    placeholder="Enter city"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">State *</label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-eukyPurple focus:ring-2 focus:ring-eukyPurple/20 outline-none transition-all text-sm bg-white"
                    >
                      <option value="">State</option>
                      <option value="VIC">VIC</option>
                      <option value="NSW">NSW</option>
                      <option value="QLD">QLD</option>
                      <option value="SA">SA</option>
                      <option value="WA">WA</option>
                      <option value="TAS">TAS</option>
                      <option value="NT">NT</option>
                      <option value="ACT">ACT</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Postcode *</label>
                    <input
                      type="text"
                      name="postcode"
                      value={formData.postcode}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-eukyPurple focus:ring-2 focus:ring-eukyPurple/20 outline-none transition-all text-sm"
                      placeholder="Postcode"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Current Living Arrangements *</label>
                  <select
                    name="livingArrangements"
                    value={formData.livingArrangements}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-eukyPurple focus:ring-2 focus:ring-eukyPurple/20 outline-none transition-all text-sm bg-white"
                  >
                    <option value="">Select current living arrangements</option>
                    <option value="lives-alone">Lives Alone</option>
                    <option value="with-family">Living with Family</option>
                    <option value="sil">Supported Independent Living (SIL)</option>
                    <option value="group-home">Group Home</option>
                    <option value="shared-accommodation">Shared Accommodation</option>
                    <option value="hospital">Hospital</option>
                    <option value="aged-care">Aged Care Facility</option>
                    <option value="homeless">Homeless/At Risk</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 3: NDIS Plan Information */}
            <div className="bg-slate-50 rounded-2xl p-5 sm:p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-eukyPurple text-white rounded-lg sm:rounded-xl flex items-center justify-center font-bold text-sm sm:text-base">
                  3
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">NDIS Plan Information</h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">NDIS Participant Number *</label>
                  <input
                    type="text"
                    name="ndisNumber"
                    value={formData.ndisNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-eukyPurple focus:ring-2 focus:ring-eukyPurple/20 outline-none transition-all text-sm"
                    placeholder="Enter NDIS number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Funding Management Type *</label>
                  <select
                    name="fundingType"
                    value={formData.fundingType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-eukyPurple focus:ring-2 focus:ring-eukyPurple/20 outline-none transition-all text-sm bg-white"
                  >
                    <option value="">Select funding type</option>
                    <option value="ndia-managed">NDIA Managed</option>
                    <option value="plan-managed">Plan Managed</option>
                    <option value="self-managed">Self Managed</option>
                    <option value="combination">Combination</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Plan Start Date</label>
                  <input
                    type="date"
                    name="planStartDate"
                    value={formData.planStartDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-eukyPurple focus:ring-2 focus:ring-eukyPurple/20 outline-none transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Plan End Date</label>
                  <input
                    type="date"
                    name="planEndDate"
                    value={formData.planEndDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-eukyPurple focus:ring-2 focus:ring-eukyPurple/20 outline-none transition-all text-sm"
                  />
                </div>

                {formData.fundingType === "plan-managed" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Plan Manager Agency Name</label>
                      <input
                        type="text"
                        name="planManagerName"
                        value={formData.planManagerName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-eukyPurple focus:ring-2 focus:ring-eukyPurple/20 outline-none transition-all text-sm"
                        placeholder="Enter plan manager name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Plan Manager Email</label>
                      <input
                        type="email"
                        name="planManagerEmail"
                        value={formData.planManagerEmail}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-eukyPurple focus:ring-2 focus:ring-eukyPurple/20 outline-none transition-all text-sm"
                        placeholder="Enter plan manager email"
                      />
                    </div>
                  </>
                )}

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Participant Goals (as stated in NDIS plan)</label>
                  <textarea
                    name="goals"
                    value={formData.goals}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-eukyPurple focus:ring-2 focus:ring-eukyPurple/20 outline-none transition-all text-sm resize-none"
                    placeholder="Briefly describe the participant's goals"
                  />
                </div>
              </div>
            </div>

            {/* Section 4: Service Requirements & Risk Assessment */}
            <div className="bg-slate-50 rounded-2xl p-5 sm:p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-eukyPurple text-white rounded-lg sm:rounded-xl flex items-center justify-center font-bold text-sm sm:text-base">
                  4
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">Service Requirements & Risk Assessment</h2>
              </div>

              <div className="space-y-5 sm:space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Services Requested *</label>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {availableServices.map((service) => (
                      <label key={service.id} className="flex items-center gap-2.5 cursor-pointer p-2 rounded-lg hover:bg-slate-100 transition-colors">
                        <input
                          type="checkbox"
                          checked={formData.servicesRequested.includes(service.id)}
                          onChange={() => handleCheckboxArrayChange("servicesRequested", service.id)}
                          className="w-4 h-4 rounded border-slate-300 text-eukyPurple focus:ring-eukyPurple"
                        />
                        <span className="text-sm text-slate-600">{service.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Reason for Referral *</label>
                  <textarea
                    name="referralReason"
                    value={formData.referralReason}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-eukyPurple focus:ring-2 focus:ring-eukyPurple/20 outline-none transition-all text-sm resize-none"
                    placeholder="Please provide detailed information about the participant's needs, challenges, and why they are being referred for these services"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Risk Factors (if applicable)</label>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {riskFactors.map((risk) => (
                      <label key={risk.id} className="flex items-center gap-2.5 cursor-pointer p-2 rounded-lg hover:bg-slate-100 transition-colors">
                        <input
                          type="checkbox"
                          checked={formData.riskFactors.includes(risk.id)}
                          onChange={() => handleCheckboxArrayChange("riskFactors", risk.id)}
                          className="w-4 h-4 rounded border-slate-300 text-eukyPurple focus:ring-eukyPurple"
                        />
                        <span className="text-sm text-slate-600">{risk.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 items-end">
                  <div>
                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        name="interpreterRequired"
                        checked={formData.interpreterRequired}
                        onChange={handleInputChange}
                        className="w-4 h-4 rounded border-slate-300 text-eukyPurple focus:ring-eukyPurple"
                      />
                      <span className="text-sm text-slate-600">Interpreter Required</span>
                    </label>
                  </div>
                  {formData.interpreterRequired && (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Language Required</label>
                      <input
                        type="text"
                        name="interpreterLanguage"
                        value={formData.interpreterLanguage}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-eukyPurple focus:ring-2 focus:ring-eukyPurple/20 outline-none transition-all text-sm"
                        placeholder="Enter language"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Section 5: Supporting Documentation */}
            <div className="bg-slate-50 rounded-2xl p-5 sm:p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-eukyPurple text-white rounded-lg sm:rounded-xl flex items-center justify-center font-bold text-sm sm:text-base">
                  5
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">Supporting Documentation</h2>
              </div>

              {uploadError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                  {uploadError}
                </div>
              )}

              <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 sm:p-8 text-center hover:border-eukyPurple/50 transition-colors">
                <svg className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-slate-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-sm text-slate-600 mb-2">Drag and drop files here, or click to browse</p>
                <p className="text-xs text-slate-400 mb-4">NDIS Plan, Medical Reports, Functional Capacity Assessments (PDF, DOC up to 10MB)</p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  Choose Files
                </label>
              </div>

              {/* Display uploaded files */}
              {uploadedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium text-slate-700">Uploaded Files:</p>
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200">
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-eukyPurple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <div>
                          <p className="text-sm font-medium text-slate-900">{file.name}</p>
                          <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="text-center">
              {submitError && (
                <div className="p-3 sm:p-4 bg-red-50 border border-red-200 rounded-xl mb-6 max-w-lg mx-auto">
                  <p className="text-red-600 text-sm flex items-center justify-center">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {submitError}
                  </p>
                </div>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center px-8 py-3 sm:px-10 sm:py-3.5 bg-eukyPurple text-white font-medium text-base rounded-full hover:bg-eukyPurple/90 transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Referral
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </>
                )}
              </button>
              <p className="text-xs text-slate-500 mt-4">
                By submitting this form, you agree to our{" "}
                <Link href="/privacy" className="text-eukyPurple hover:underline">Privacy Policy</Link>
                {" "}and{" "}
                <Link href="/terms" className="text-eukyPurple hover:underline">Terms of Service</Link>
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* Contact Alternative */}
      <section className="py-10 sm:py-12 md:py-16 bg-eukyPurple/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3">Prefer to speak with someone?</h3>
          <p className="text-sm sm:text-base text-slate-600 mb-5">
            Our friendly team is here to help with your referral questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:0870017600"
              className="inline-flex items-center justify-center px-5 py-2.5 bg-eukyPurple text-white font-medium rounded-full hover:bg-eukyPurple/90 transition-all"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call 0870017600
            </a>
            <a
              href="mailto:referrals@eukycare.com.au"
              className="inline-flex items-center justify-center px-5 py-2.5 border-2 border-eukyPurple text-eukyPurple font-medium rounded-full hover:bg-eukyPurple/5 transition-all"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Referrals
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
