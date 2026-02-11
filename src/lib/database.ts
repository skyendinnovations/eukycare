import { supabase } from './supabase';

// Types for database tables
export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  inquiry_type: string;
  subject: string;
  message: string;
  status?: 'new' | 'read' | 'responded';
  created_at?: string;
}

export interface ReferralSubmission {
  id?: string;
  // Referrer Information
  referrer_name: string;
  organization?: string;
  referrer_role: string;
  referrer_email: string;
  referrer_phone: string;
  has_consent: boolean;
  // Participant Details
  participant_name: string;
  date_of_birth: string;
  gender?: string;
  primary_disability: string;
  address: string;
  city: string;
  state: string;
  postcode: string;
  living_arrangements: string;
  // NDIS Plan Information
  ndis_number: string;
  plan_start_date?: string;
  plan_end_date?: string;
  funding_type: string;
  plan_manager_name?: string;
  plan_manager_email?: string;
  goals?: string;
  // Service Requirements
  services_requested: string[];
  referral_reason: string;
  risk_factors: string[];
  interpreter_required: boolean;
  interpreter_language?: string;
  // Meta
  status?: 'new' | 'reviewing' | 'accepted' | 'declined';
  created_at?: string;
}

export interface Testimonial {
  id?: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  image_url?: string;
  is_approved: boolean;
  created_at?: string;
}

export interface NewsletterSubscription {
  id?: string;
  email: string;
  subscribed_at?: string;
  is_active: boolean;
}

export interface FAQ {
  id?: string;
  question: string;
  answer: string;
  category?: string;
  display_order?: number;
  is_active?: boolean;
  created_at?: string;
}

// FAQ Functions
export async function getActiveFAQs(): Promise<FAQ[]> {
  try {
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error: any) {
    console.error('Error fetching FAQs:', error);
    return [];
  }
}

// Contact Form Functions
export async function submitContactForm(data: ContactSubmission): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('contact_submissions')
      .insert([{
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        inquiry_type: data.inquiry_type,
        subject: data.subject,
        message: data.message,
        status: 'new',
      }]);

    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    console.error('Error submitting contact form:', error);
    return { success: false, error: error.message || 'Failed to submit form' };
  }
}

// Referral Form Functions
export async function submitReferral(data: ReferralSubmission): Promise<{ success: boolean; error?: string; referralId?: string }> {
  try {
    const { data: result, error } = await supabase
      .from('referrals')
      .insert([{
        referrer_name: data.referrer_name,
        organization: data.organization || null,
        referrer_role: data.referrer_role,
        referrer_email: data.referrer_email,
        referrer_phone: data.referrer_phone,
        has_consent: data.has_consent,
        participant_name: data.participant_name,
        date_of_birth: data.date_of_birth,
        gender: data.gender || null,
        primary_disability: data.primary_disability,
        address: data.address,
        city: data.city,
        state: data.state,
        postcode: data.postcode,
        living_arrangements: data.living_arrangements,
        ndis_number: data.ndis_number,
        plan_start_date: data.plan_start_date || null,
        plan_end_date: data.plan_end_date || null,
        funding_type: data.funding_type,
        plan_manager_name: data.plan_manager_name || null,
        plan_manager_email: data.plan_manager_email || null,
        goals: data.goals || null,
        services_requested: data.services_requested,
        referral_reason: data.referral_reason,
        risk_factors: data.risk_factors,
        interpreter_required: data.interpreter_required,
        interpreter_language: data.interpreter_language || null,
        status: 'new',
      }])
      .select('id')
      .single();

    if (error) throw error;
    return { success: true, referralId: result?.id };
  } catch (error: any) {
    console.error('Error submitting referral:', error);
    return { success: false, error: error.message || 'Failed to submit referral' };
  }
}

// Testimonial Functions
export async function getApprovedTestimonials(): Promise<Testimonial[]> {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_approved', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error: any) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
}

export async function submitTestimonial(data: Omit<Testimonial, 'id' | 'is_approved' | 'created_at'>): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('testimonials')
      .insert([{
        name: data.name,
        role: data.role,
        quote: data.quote,
        rating: data.rating,
        image_url: data.image_url || null,
        is_approved: false, // Requires admin approval
      }]);

    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    console.error('Error submitting testimonial:', error);
    return { success: false, error: error.message || 'Failed to submit testimonial' };
  }
}

// Newsletter Functions
export async function subscribeToNewsletter(email: string): Promise<{ success: boolean; error?: string }> {
  try {
    // Check if already subscribed
    const { data: existing } = await supabase
      .from('newsletter_subscriptions')
      .select('id, is_active')
      .eq('email', email)
      .single();

    if (existing) {
      if (existing.is_active) {
        return { success: false, error: 'Email is already subscribed' };
      }
      // Reactivate subscription
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .update({ is_active: true })
        .eq('id', existing.id);
      
      if (error) throw error;
      return { success: true };
    }

    // New subscription
    const { error } = await supabase
      .from('newsletter_subscriptions')
      .insert([{ email, is_active: true }]);

    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    console.error('Error subscribing to newsletter:', error);
    return { success: false, error: error.message || 'Failed to subscribe' };
  }
}

// File upload for referrals
export async function uploadReferralDocument(
  file: File,
  referralId: string
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${referralId}/${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('referral-documents')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) throw error;

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('referral-documents')
      .getPublicUrl(data.path);

    return { success: true, url: urlData.publicUrl };
  } catch (error: any) {
    console.error('Error uploading document:', error);
    return { success: false, error: error.message || 'Failed to upload document' };
  }
}
