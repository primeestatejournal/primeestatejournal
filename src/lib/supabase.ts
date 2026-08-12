import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Property, InquiryFormData } from '../types';

const env = (import.meta as any).env || {};
const supabaseUrl = env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-supabase-project') && 
  !supabaseAnonKey.includes('your-supabase-anon-key')
);

let supabaseInstance: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured) {
    return null;
  }
  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  }
  return supabaseInstance;
}

// Data helper functions with fallback support

/** Fetch properties from Supabase 'properties' table, or return null if not configured */
export async function fetchSupabaseProperties(): Promise<Property[] | null> {
  const client = getSupabase();
  if (!client) return null;

  try {
    const { data, error } = await client
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      console.warn('Supabase fetch properties notice/error:', error?.message);
      return null;
    }

    return data as Property[];
  } catch (err) {
    console.error('Error querying Supabase properties:', err);
    return null;
  }
}

/** Submit a property inquiry to Supabase 'inquiries' table */
export async function submitSupabaseInquiry(inquiry: InquiryFormData): Promise<{ success: boolean; error?: string }> {
  const client = getSupabase();
  if (!client) {
    return { success: true }; // Local fallback succeeds
  }

  try {
    const { error } = await client.from('inquiries').insert([
      {
        property_id: inquiry.propertyId || null,
        property_title: inquiry.propertyTitle || 'General Inquiry',
        full_name: inquiry.fullName,
        email: inquiry.email,
        phone: inquiry.phone,
        investor_type: inquiry.investorType,
        preferred_contact: inquiry.preferredContact,
        message: inquiry.message,
        request_title_doc: inquiry.requestTitleDocument,
        request_virtual_tour: inquiry.requestVirtualTour,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error('Supabase inquiry insert error:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to submit inquiry to database' };
  }
}

/** Submit developer accreditation application to Supabase 'developer_applications' table */
export async function submitSupabaseDeveloperKYC(data: {
  companyName: string;
  rcNumber: string;
  contactPerson: string;
  email: string;
  phone: string;
  officeAddress: string;
  pastProjectsCount: string;
}): Promise<{ success: boolean; error?: string }> {
  const client = getSupabase();
  if (!client) return { success: true };

  try {
    const { error } = await client.from('developer_applications').insert([
      {
        company_name: data.companyName,
        rc_number: data.rcNumber,
        contact_person: data.contactPerson,
        email: data.email,
        phone: data.phone,
        office_address: data.officeAddress,
        past_projects: data.pastProjectsCount,
        status: 'Pending Legal Review',
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error('Supabase developer application error:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Database error' };
  }
}

/** Submit or Track Legal Search Request in Supabase 'audit_requests' table */
export async function fetchSupabaseAuditByRef(referenceCode: string): Promise<any | null> {
  const client = getSupabase();
  if (!client) return null;

  try {
    const { data, error } = await client
      .from('audit_requests')
      .select('*')
      .eq('reference_code', referenceCode.trim().toUpperCase())
      .single();

    if (error || !data) return null;
    return data;
  } catch (err) {
    return null;
  }
}
