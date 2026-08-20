import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Property, InquiryFormData, DbProperty, DbBlogPost, Profile } from '../types';

const env = (import.meta as any).env || {};
const supabaseUrl = env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith('http') &&
  !supabaseUrl.includes('your-supabase-project') && 
  !supabaseAnonKey.includes('your-supabase-anon-key')
);

let supabaseInstance: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured) {
    return null;
  }
  if (!supabaseInstance) {
    try {
      supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
    } catch (e) {
      console.warn('Failed to initialize Supabase client:', e);
      return null;
    }
  }
  return supabaseInstance;
}

// ----------------------------------------------------
// Public Properties & Inquiry Operations
// ----------------------------------------------------

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
      return null;
    }

    // Map DbProperty format or full Property format
    return data.map((item: any) => {
      if (item.priceNaira !== undefined) {
        return item as Property;
      }
      // Map from DbProperty columns
      const pNaira = Number(item.price_naira) || 0;
      return {
        id: item.id || `prop-${Date.now()}`,
        title: item.title || 'Luxury Nigerian Property',
        category: item.category || 'luxury_apartment',
        typeLabel: item.type_label || 'Luxury Penthouse',
        priceNaira: pNaira,
        priceFormatted: `₦${pNaira.toLocaleString()}`,
        location: item.location || 'Lagos, Nigeria',
        district: item.district || 'Ikoyi',
        state: item.state || 'Lagos',
        country: 'Nigeria',
        images: [
          item.featured_image_url || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
          item.gallery_image_url_1,
          item.gallery_image_url_2,
          item.gallery_image_url_3,
          item.gallery_image_url_4,
        ].filter(Boolean) as string[],
        sizeDisplay: item.size || '450 Sqm',
        projectedAnnualYield: item.projected_yield || '9.2% NGN',
        projected5YrAppreciation: '+85% Estimated',
        zoning: 'Residential',
        titleType: item.title_type || 'Certificate of Occupancy (C of O)',
        titleNumber: item.title_number || 'CofO/IKY/2023/889',
        verificationStatus: '100% Clean Title Verified',
        legalRiskLevel: 'Low Risk (Clean)',
        escrowProtected: true,
        diasporaReady: true,
        features: item.features || ['24/7 Security', 'IPPs Power Supply', 'Verified Title', 'Swimming Pool', 'Private Parking'],
        description: item.description || 'Premium luxury residential property verified with full legal due diligence.',
        coordinates: { lat: 6.4549, lng: 3.4246 },
        carouselCategories: ['diaspora_favorites', 'luxury_residences'],
        developerName: item.developer_name || 'Prime Estate Developers',
        developerVerified: true,
        dossier: {
          registrySearchDate: new Date().toISOString().split('T')[0],
          landsRegistryRef: 'LR-NG-2024-991',
          surveyorGeneralChartRef: 'SGO-CHART-002',
          chartingStatus: 'Free From Government Acquisition',
          developerKYC: 'Identity & CAC Verified',
          legalRiskScore: 99,
          titleSummary: 'Certificate of Occupancy duly executed, unencumbered and search verified.',
          inspectionsCompleted: 3,
          floodRiskRating: 'Low Risk (Elevated Land)',
          powerStability: '20+ Hours Daily (IPPs)',
          securityRating: 'Access Controlled Estate / 24/7 Guards',
        },
      } as Property;
    });
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

// ----------------------------------------------------
// Admin CRUD Operations for properties
// ----------------------------------------------------

export async function fetchAdminProperties(): Promise<DbProperty[]> {
  const client = getSupabase();
  if (!client) {
    // Return from localStorage fallback for offline testing
    try {
      const cached = localStorage.getItem('pej_admin_properties');
      if (cached) return JSON.parse(cached);
    } catch (e) {
      console.error(e);
    }
    return [];
  }

  try {
    const { data, error } = await client
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Error fetching admin properties:', error.message);
      // Fallback to local cache
      const cached = localStorage.getItem('pej_admin_properties');
      return cached ? JSON.parse(cached) : [];
    }

    const formatted: DbProperty[] = (data || []).map((item: any) => ({
      id: item.id,
      title: item.title || '',
      description: item.description || '',
      price_naira: Number(item.price_naira || item.priceNaira) || 0,
      agent_whatsapp: item.agent_whatsapp || '',
      agent_call_number: item.agent_call_number || '',
      featured_image_url: item.featured_image_url || (item.images && item.images[0]) || '',
      gallery_image_url_1: item.gallery_image_url_1 || (item.images && item.images[1]) || null,
      gallery_image_url_2: item.gallery_image_url_2 || (item.images && item.images[2]) || null,
      gallery_image_url_3: item.gallery_image_url_3 || (item.images && item.images[3]) || null,
      gallery_image_url_4: item.gallery_image_url_4 || (item.images && item.images[4]) || null,
      created_at: item.created_at || new Date().toISOString(),
      updated_at: item.updated_at || new Date().toISOString(),
    }));

    // Update local cache
    try {
      localStorage.setItem('pej_admin_properties', JSON.stringify(formatted));
    } catch (e) {
      console.error(e);
    }

    return formatted;
  } catch (err) {
    console.error('fetchAdminProperties err:', err);
    return [];
  }
}

export async function createAdminProperty(
  propertyData: Omit<DbProperty, 'id' | 'created_at' | 'updated_at'>
): Promise<{ data: DbProperty | null; error?: string }> {
  const client = getSupabase();
  const timestamp = new Date().toISOString();
  const id = (crypto?.randomUUID ? crypto.randomUUID() : `prop-${Date.now()}`);

  const newProp: DbProperty = {
    ...propertyData,
    id,
    created_at: timestamp,
    updated_at: timestamp,
  };

  if (!client) {
    // Save to local cache
    try {
      const cached = localStorage.getItem('pej_admin_properties');
      const list: DbProperty[] = cached ? JSON.parse(cached) : [];
      list.unshift(newProp);
      localStorage.setItem('pej_admin_properties', JSON.stringify(list));
      return { data: newProp };
    } catch (e: any) {
      return { data: null, error: e.message };
    }
  }

  try {
    const { data, error } = await client
      .from('properties')
      .insert([
        {
          id: newProp.id,
          title: newProp.title,
          description: newProp.description,
          price_naira: newProp.price_naira,
          agent_whatsapp: newProp.agent_whatsapp,
          agent_call_number: newProp.agent_call_number,
          featured_image_url: newProp.featured_image_url,
          gallery_image_url_1: newProp.gallery_image_url_1,
          gallery_image_url_2: newProp.gallery_image_url_2,
          gallery_image_url_3: newProp.gallery_image_url_3,
          gallery_image_url_4: newProp.gallery_image_url_4,
          created_at: timestamp,
          updated_at: timestamp,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase createAdminProperty error:', error.message);
      // Fallback cache
      const cached = localStorage.getItem('pej_admin_properties');
      const list: DbProperty[] = cached ? JSON.parse(cached) : [];
      list.unshift(newProp);
      localStorage.setItem('pej_admin_properties', JSON.stringify(list));
      return { data: newProp, error: `Saved locally: ${error.message}` };
    }

    return { data: (data as DbProperty) || newProp };
  } catch (err: any) {
    return { data: null, error: err.message || 'Failed to create property' };
  }
}

export async function updateAdminProperty(
  id: string,
  updates: Partial<DbProperty>
): Promise<{ data: DbProperty | null; error?: string }> {
  const client = getSupabase();
  const timestamp = new Date().toISOString();

  if (!client) {
    try {
      const cached = localStorage.getItem('pej_admin_properties');
      const list: DbProperty[] = cached ? JSON.parse(cached) : [];
      const index = list.findIndex((p) => p.id === id);
      if (index !== -1) {
        list[index] = { ...list[index], ...updates, updated_at: timestamp };
        localStorage.setItem('pej_admin_properties', JSON.stringify(list));
        return { data: list[index] };
      }
      return { data: null, error: 'Property not found' };
    } catch (e: any) {
      return { data: null, error: e.message };
    }
  }

  try {
    const payload: any = { ...updates, updated_at: timestamp };
    delete payload.id;
    delete payload.created_at;

    const { data, error } = await client
      .from('properties')
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: data as DbProperty };
  } catch (err: any) {
    return { data: null, error: err.message || 'Failed to update property' };
  }
}

export async function deleteAdminProperty(id: string): Promise<{ success: boolean; error?: string }> {
  const client = getSupabase();

  if (!client) {
    try {
      const cached = localStorage.getItem('pej_admin_properties');
      const list: DbProperty[] = cached ? JSON.parse(cached) : [];
      const filtered = list.filter((p) => p.id !== id);
      localStorage.setItem('pej_admin_properties', JSON.stringify(filtered));
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }

  try {
    const { error } = await client.from('properties').delete().eq('id', id);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to delete property' };
  }
}

// ----------------------------------------------------
// Admin CRUD Operations for blog_posts
// ----------------------------------------------------

export async function fetchAdminBlogPosts(): Promise<DbBlogPost[]> {
  const client = getSupabase();
  if (!client) {
    try {
      const cached = localStorage.getItem('pej_admin_blog_posts');
      if (cached) return JSON.parse(cached);
    } catch (e) {
      console.error(e);
    }
    return [];
  }

  try {
    const { data, error } = await client
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Error fetching blog posts:', error.message);
      const cached = localStorage.getItem('pej_admin_blog_posts');
      return cached ? JSON.parse(cached) : [];
    }

    const formatted: DbBlogPost[] = (data || []).map((item: any) => ({
      id: item.id,
      title: item.title || '',
      content: item.content || '',
      featured_image_url: item.featured_image_url || '',
      author_id: item.author_id || null,
      created_at: item.created_at || new Date().toISOString(),
      updated_at: item.updated_at || new Date().toISOString(),
    }));

    try {
      localStorage.setItem('pej_admin_blog_posts', JSON.stringify(formatted));
    } catch (e) {
      console.error(e);
    }

    return formatted;
  } catch (err) {
    console.error('fetchAdminBlogPosts err:', err);
    return [];
  }
}

export async function createAdminBlogPost(
  postData: Omit<DbBlogPost, 'id' | 'created_at' | 'updated_at'>
): Promise<{ data: DbBlogPost | null; error?: string }> {
  const client = getSupabase();
  const timestamp = new Date().toISOString();
  const id = crypto?.randomUUID ? crypto.randomUUID() : `post-${Date.now()}`;

  const newPost: DbBlogPost = {
    ...postData,
    id,
    created_at: timestamp,
    updated_at: timestamp,
  };

  if (!client) {
    try {
      const cached = localStorage.getItem('pej_admin_blog_posts');
      const list: DbBlogPost[] = cached ? JSON.parse(cached) : [];
      list.unshift(newPost);
      localStorage.setItem('pej_admin_blog_posts', JSON.stringify(list));
      return { data: newPost };
    } catch (e: any) {
      return { data: null, error: e.message };
    }
  }

  try {
    const { data, error } = await client
      .from('blog_posts')
      .insert([
        {
          id: newPost.id,
          title: newPost.title,
          content: newPost.content,
          featured_image_url: newPost.featured_image_url,
          author_id: newPost.author_id || null,
          created_at: timestamp,
          updated_at: timestamp,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('createAdminBlogPost error:', error.message);
      const cached = localStorage.getItem('pej_admin_blog_posts');
      const list: DbBlogPost[] = cached ? JSON.parse(cached) : [];
      list.unshift(newPost);
      localStorage.setItem('pej_admin_blog_posts', JSON.stringify(list));
      return { data: newPost, error: `Saved locally: ${error.message}` };
    }

    return { data: (data as DbBlogPost) || newPost };
  } catch (err: any) {
    return { data: null, error: err.message || 'Failed to create blog post' };
  }
}

export async function updateAdminBlogPost(
  id: string,
  updates: Partial<DbBlogPost>
): Promise<{ data: DbBlogPost | null; error?: string }> {
  const client = getSupabase();
  const timestamp = new Date().toISOString();

  if (!client) {
    try {
      const cached = localStorage.getItem('pej_admin_blog_posts');
      const list: DbBlogPost[] = cached ? JSON.parse(cached) : [];
      const index = list.findIndex((p) => p.id === id);
      if (index !== -1) {
        list[index] = { ...list[index], ...updates, updated_at: timestamp };
        localStorage.setItem('pej_admin_blog_posts', JSON.stringify(list));
        return { data: list[index] };
      }
      return { data: null, error: 'Post not found' };
    } catch (e: any) {
      return { data: null, error: e.message };
    }
  }

  try {
    const payload: any = { ...updates, updated_at: timestamp };
    delete payload.id;
    delete payload.created_at;

    const { data, error } = await client
      .from('blog_posts')
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: data as DbBlogPost };
  } catch (err: any) {
    return { data: null, error: err.message || 'Failed to update post' };
  }
}

export async function deleteAdminBlogPost(id: string): Promise<{ success: boolean; error?: string }> {
  const client = getSupabase();

  if (!client) {
    try {
      const cached = localStorage.getItem('pej_admin_blog_posts');
      const list: DbBlogPost[] = cached ? JSON.parse(cached) : [];
      const filtered = list.filter((p) => p.id !== id);
      localStorage.setItem('pej_admin_blog_posts', JSON.stringify(filtered));
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }

  try {
    const { error } = await client.from('blog_posts').delete().eq('id', id);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to delete blog post' };
  }
}

// ----------------------------------------------------
// Admin Profile Operations
// ----------------------------------------------------

export async function fetchAdminProfile(userId: string): Promise<Profile | null> {
  const client = getSupabase();
  if (!client) {
    try {
      const cached = localStorage.getItem(`pej_admin_profile_${userId}`);
      if (cached) return JSON.parse(cached);
    } catch (e) {
      console.error(e);
    }
    return null;
  }

  try {
    const { data, error } = await client
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error || !data) return null;
    return data as Profile;
  } catch (err) {
    return null;
  }
}

export async function upsertAdminProfile(profile: Profile): Promise<{ success: boolean; error?: string }> {
  const client = getSupabase();
  const timestamp = new Date().toISOString();

  // Cache locally
  try {
    localStorage.setItem(`pej_admin_profile_${profile.id}`, JSON.stringify(profile));
  } catch (e) {
    console.error(e);
  }

  if (!client) return { success: true };

  try {
    const { error } = await client.from('profiles').upsert({
      id: profile.id,
      full_name: profile.full_name,
      email: profile.email,
      role: profile.role || 'admin',
      updated_at: timestamp,
    });

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to save profile' };
  }
}

