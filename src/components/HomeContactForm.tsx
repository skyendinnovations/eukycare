'use client';

import { useState } from 'react';

export default function HomeContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          inquiry_type: formData.service || 'general',
          subject: `Homepage Inquiry: ${formData.service || 'General'}`,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit');
      }

      setResult({ type: 'success', text: 'Thank you! We\'ll get back to you shortly.' });
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    } catch (err: any) {
      setResult({ type: 'error', text: err.message || 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
      {result && (
        <div
          className={`p-3 rounded-xl text-sm font-medium ${
            result.type === 'success'
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          {result.text}
        </div>
      )}
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Full Name *"
        required
        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-eukyPurple/20 focus:border-eukyPurple text-sm"
      />
      <input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone Number"
        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-eukyPurple/20 focus:border-eukyPurple text-sm"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email Address *"
        required
        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-eukyPurple/20 focus:border-eukyPurple text-sm"
      />
      <select
        name="service"
        value={formData.service}
        onChange={handleChange}
        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-eukyPurple/20 focus:border-eukyPurple text-sm text-slate-500"
      >
        <option value="">Select the Service</option>
        <option value="Community Supports">Community Supports</option>
        <option value="Daily Living">Daily Living</option>
        <option value="Transport Assistance">Transport Assistance</option>
        <option value="Accommodation">Accommodation</option>
      </select>
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Comment *"
        required
        rows={4}
        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-eukyPurple/20 focus:border-eukyPurple text-sm resize-none"
      ></textarea>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2.5 sm:py-3 bg-eukyPurple text-white font-medium rounded-lg sm:rounded-xl hover:bg-eukyPurple/90 transition-colors text-sm sm:text-base disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
