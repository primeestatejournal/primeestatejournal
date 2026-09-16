import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Property, InquiryFormData, DbProperty, DbBlogPost, Profile } from '../types';

export interface SupabaseConfigInfo {
  url: string;
  anonKey: string;
  source: 'env' | 'localStorage' | 'none';
  isValid: boolean;
}

export function getStoredSupabaseConfig(): SupabaseConfigInfo {
  if (typeof window !== 'undefined') {
    const storedUrl = localStorage.getItem('pej_supabase_url');
    const storedKey = localStorage.getItem('pej_supabase_anon_key');
    if (storedUrl && storedKey && storedUrl.startsWith('http')) {
      return {
        url: storedUrl.trim(),
        anonKey: storedKey.trim(),
        source: 'localStorage',
        isValid: true,
      };
    }
  }

  const env = (import.meta as any).env || {};
  const envUrl = (env.VITE_SUPABASE_URL || '').trim();
  const envKey = (env.VITE_SUPABASE_ANON_KEY || '').trim();

  const isValidEnv = Boolean(
    envUrl && 
    envKey && 
    envUrl.startsWith('http') &&
    !envUrl.includes('your-supabase-project') && 
    !envKey.includes('your-supabase-anon-key')
  );

  if (isValidEnv) {
    return {
      url: envUrl,
      anonKey: envKey,
      source: 'env',
      isValid: true,
    };
  }

  return {
    url: envUrl || '',
    anonKey: envKey || '',
    source: 'none',
    isValid: false,
  };
}

export function checkIsSupabaseConfigured(): boolean {
  return getStoredSupabaseConfig().isValid;
}

export const isSupabaseConfigured = checkIsSupabaseConfigured();

let supabaseInstance: SupabaseClient | null = null;
let currentConfigKey = '';

export function getSupabase(): SupabaseClient | null {
  const config = getStoredSupabaseConfig();
  if (!config.isValid || !config.url || !config.anonKey) {
    return null;
  }

  const newConfigKey = `${config.url}_${config.anonKey}`;
  if (!supabaseInstance || currentConfigKey !== newConfigKey) {
    try {
      supabaseInstance = createClient(config.url, config.anonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      });
      currentConfigKey = newConfigKey;
    } catch (e) {
      console.warn('Failed to initialize Supabase client:', e);
      return null;
    }
  }
  return supabaseInstance;
}

export function saveCustomSupabaseConfig(url: string, anonKey: string): boolean {
  if (typeof window === 'undefined') return false;
  const cleanUrl = url.trim();
  const cleanKey = anonKey.trim();

  if (!cleanUrl.startsWith('http') || !cleanKey) {
    return false;
  }

  localStorage.setItem('pej_supabase_url', cleanUrl);
  localStorage.setItem('pej_supabase_anon_key', cleanKey);
  supabaseInstance = null;
  currentConfigKey = '';
  return true;
}

export function clearCustomSupabaseConfig(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('pej_supabase_url');
    localStorage.removeItem('pej_supabase_anon_key');
    supabaseInstance = null;
    currentConfigKey = '';
  }
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
        return {
          ...item,
          video_url: item.video_url || null,
          availability_status: item.availability_status === 'sold' ? 'sold' : 'available',
        } as Property;
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
          item.featured_image_url,
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
        video_url: item.video_url || null,
        availability_status: item.availability_status === 'sold' ? 'sold' : 'available',
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
      video_url: item.video_url || null,
      availability_status: (item.availability_status === 'sold' ? 'sold' : 'available') as 'available' | 'sold',
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
    availability_status: propertyData.availability_status || 'available',
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
          video_url: newProp.video_url || null,
          availability_status: newProp.availability_status || 'available',
          created_at: timestamp,
          updated_at: timestamp,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase createAdminProperty error:', error.message);
      // Keep a local copy in cache as a safety net
      try {
        const cached = localStorage.getItem('pej_admin_properties');
        const list: DbProperty[] = cached ? JSON.parse(cached) : [];
        const filtered = list.filter((p) => p.id !== newProp.id);
        filtered.unshift(newProp);
        localStorage.setItem('pej_admin_properties', JSON.stringify(filtered));
      } catch (e) {
        console.error(e);
      }
      return { data: null, error: error.message };
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

/** Toggle availability status between 'available' and 'sold' */
export async function togglePropertyAvailability(
  id: string,
  currentStatus: 'available' | 'sold'
): Promise<{ success: boolean; newStatus: 'available' | 'sold'; error?: string }> {
  const newStatus = currentStatus === 'sold' ? 'available' : 'sold';
  const res = await updateAdminProperty(id, { availability_status: newStatus });
  if (res.error) {
    return { success: false, newStatus: currentStatus, error: res.error };
  }
  return { success: true, newStatus };
}

/** Parses YouTube or Vimeo links into secure embeddable URLs for standard iframes */
export function getEmbedVideoUrl(url?: string | null): string | null {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();
  if (!trimmed) return null;

  // If already standard iframe embed URL
  if (trimmed.includes('youtube.com/embed/') || trimmed.includes('player.vimeo.com/video/')) {
    return trimmed;
  }

  // YouTube standard or short links:
  // - https://www.youtube.com/watch?v=VIDEO_ID
  // - https://youtu.be/VIDEO_ID
  // - https://www.youtube.com/shorts/VIDEO_ID
  const ytMatch = trimmed.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
  if (ytMatch && ytMatch[1]) {
    return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=0&rel=0`;
  }

  // Vimeo links:
  // - https://vimeo.com/VIDEO_ID
  // - https://vimeo.com/channels/staffpicks/VIDEO_ID
  const vimeoMatch = trimmed.match(/(?:vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|))(\d+)/i);
  if (vimeoMatch && vimeoMatch[1]) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }

  // Fallback for direct valid web URLs
  if (trimmed.startsWith('https://') || trimmed.startsWith('http://')) {
    return trimmed;
  }

  return null;
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
      try {
        const cached = localStorage.getItem('pej_admin_blog_posts');
        const list: DbBlogPost[] = cached ? JSON.parse(cached) : [];
        const filtered = list.filter((p) => p.id !== newPost.id);
        filtered.unshift(newPost);
        localStorage.setItem('pej_admin_blog_posts', JSON.stringify(filtered));
      } catch (e) {
        console.error(e);
      }
      return { data: null, error: error.message };
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

