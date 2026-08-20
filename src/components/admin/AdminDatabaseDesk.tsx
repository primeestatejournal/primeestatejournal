import React, { useState } from 'react';
import { 
  Database, 
  Copy, 
  Check, 
  ShieldCheck, 
  Terminal, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  Table, 
  Play
} from 'lucide-react';
import { isSupabaseConfigured, getSupabase } from '../../lib/supabase';

export const AdminDatabaseDesk: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [testResult, setTestResult] = useState<{ status: 'idle' | 'testing' | 'success' | 'warning'; message?: string }>({
    status: 'idle',
  });

  const fullSchemaSql = `-- ==============================================================================
-- PRIME ESTATE JOURNAL - FULL PRODUCTION SUPABASE SCHEMA & RLS POLICIES
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 2. PUBLIC.PROFILES (Admin & Staff Accounts linked to auth.users)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'editor', 'agent')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone" 
ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- ------------------------------------------------------------------------------
-- 3. PUBLIC.PROPERTIES (Luxury Property Inventory)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  price_naira NUMERIC NOT NULL,
  agent_whatsapp TEXT,
  agent_call_number TEXT,
  featured_image_url TEXT NOT NULL,
  gallery_image_url_1 TEXT,
  gallery_image_url_2 TEXT,
  gallery_image_url_3 TEXT,
  gallery_image_url_4 TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for properties
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to properties" 
ON public.properties FOR SELECT USING (true);

CREATE POLICY "Allow authenticated admins to insert properties" 
ON public.properties FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated admins to update properties" 
ON public.properties FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Allow authenticated admins to delete properties" 
ON public.properties FOR DELETE TO authenticated USING (true);

-- ------------------------------------------------------------------------------
-- 4. PUBLIC.BLOG_POSTS (Market Intelligence & Editorial Articles)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  featured_image_url TEXT,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  author_name TEXT DEFAULT 'Prime Editorial Desk',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for blog_posts
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to blog_posts" 
ON public.blog_posts FOR SELECT USING (true);

CREATE POLICY "Allow authenticated admins to insert blog_posts" 
ON public.blog_posts FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated admins to update blog_posts" 
ON public.blog_posts FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Allow authenticated admins to delete blog_posts" 
ON public.blog_posts FOR DELETE TO authenticated USING (true);

-- ------------------------------------------------------------------------------
-- 5. PUBLIC.INQUIRIES (Diaspora Buyer & Investor Inquiries)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES public.properties(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert to inquiries" 
ON public.inquiries FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated admins to view inquiries" 
ON public.inquiries FOR SELECT TO authenticated USING (true);
`;

  const copySql = () => {
    navigator.clipboard.writeText(fullSchemaSql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const testConnection = async () => {
    setTestResult({ status: 'testing' });
    const supabase = getSupabase();
    if (!supabase) {
      setTimeout(() => {
        setTestResult({
          status: 'warning',
          message: 'VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY are not present in .env. Falling back to local offline storage.',
        });
      }, 600);
      return;
    }

    try {
      const { data, error } = await supabase.from('properties').select('id').limit(1);
      if (error) {
        setTestResult({
          status: 'warning',
          message: `Supabase reached, but query returned: ${error.message}. Please run the SQL schema below in your Supabase SQL Editor.`,
        });
      } else {
        setTestResult({
          status: 'success',
          message: 'Connection successful! Tables public.properties and public.blog_posts are online and active.',
        });
      }
    } catch (err: any) {
      setTestResult({
        status: 'warning',
        message: err.message || 'Connection error',
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      {/* Header Banner */}
      <div className="bg-[#0B1728] p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-bold mb-2">
            <Database className="w-3.5 h-3.5" />
            <span>Supabase Cloud Schema Reference</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Database Architecture & SQL Schema Console
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Execute this SQL script directly in your Supabase project dashboard (<span className="font-mono text-purple-300">SQL Editor &gt; New Query</span>) to set up all 4 required tables with Row Level Security.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={testConnection}
            disabled={testResult.status === 'testing'}
            className="bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-700 flex items-center gap-2 transition-all"
          >
            <Play className="w-3.5 h-3.5 text-emerald-400" />
            <span>{testResult.status === 'testing' ? 'Testing Connection...' : 'Test Connection'}</span>
          </button>

          <button
            onClick={copySql}
            className="bg-[#155EEF] hover:bg-blue-600 active:scale-95 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-blue-900/40 flex items-center gap-2 transition-all"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-amber-300" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Entire SQL Script</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Connection Test Banner Result */}
      {testResult.status !== 'idle' && (
        <div className={`p-4 rounded-2xl border text-xs flex items-start gap-3 ${
          testResult.status === 'success'
            ? 'bg-emerald-950/60 border-emerald-800 text-emerald-200'
            : testResult.status === 'warning'
            ? 'bg-amber-950/60 border-amber-800 text-amber-200'
            : 'bg-blue-950/60 border-blue-800 text-blue-200'
        }`}>
          <div className="shrink-0 mt-0.5">
            {testResult.status === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <Sparkles className="w-4 h-4 text-amber-400" />
            )}
          </div>
          <div className="flex-1 font-medium">{testResult.message}</div>
        </div>
      )}

      {/* 4 Database Schema Cards Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Table 1: auth.users & public.profiles */}
        <div className="bg-[#0B1728] border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-amber-400">1. public.profiles & auth.users</span>
            <span className="text-[10px] bg-slate-900 text-slate-400 px-2 py-0.5 rounded">Auth Linked</span>
          </div>
          <p className="text-xs text-slate-400">
            Stores admin user designations, linked by foreign key to Supabase Auth's <span className="font-mono text-slate-300">auth.users(id)</span>.
          </p>
          <div className="bg-slate-950 p-2.5 rounded-xl text-[11px] font-mono text-slate-300 space-y-1">
            <div><span className="text-purple-400">id</span> UUID (PK)</div>
            <div><span className="text-purple-400">full_name</span> TEXT</div>
            <div><span className="text-purple-400">email</span> TEXT</div>
            <div><span className="text-purple-400">role</span> TEXT ('admin')</div>
          </div>
        </div>

        {/* Table 2: public.properties */}
        <div className="bg-[#0B1728] border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-amber-400">2. public.properties</span>
            <span className="text-[10px] bg-slate-900 text-slate-400 px-2 py-0.5 rounded">Inventory</span>
          </div>
          <p className="text-xs text-slate-400">
            Stores verified property listings with ₦ price, WhatsApp and Call numbers, plus 4 gallery angles.
          </p>
          <div className="bg-slate-950 p-2.5 rounded-xl text-[11px] font-mono text-slate-300 space-y-1">
            <div><span className="text-purple-400">id</span> UUID (PK)</div>
            <div><span className="text-purple-400">title, description</span> TEXT</div>
            <div><span className="text-purple-400">price_naira</span> NUMERIC</div>
            <div><span className="text-purple-400">featured_image_url, gallery_image_url_1..4</span> TEXT</div>
          </div>
        </div>

        {/* Table 3: public.blog_posts */}
        <div className="bg-[#0B1728] border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-amber-400">3. public.blog_posts</span>
            <span className="text-[10px] bg-slate-900 text-slate-400 px-2 py-0.5 rounded">WYSIWYG Editorial</span>
          </div>
          <p className="text-xs text-slate-400">
            Stores market intelligence editorials with rich HTML content formatted by the Classic WYSIWYG editor.
          </p>
          <div className="bg-slate-950 p-2.5 rounded-xl text-[11px] font-mono text-slate-300 space-y-1">
            <div><span className="text-purple-400">id</span> UUID (PK)</div>
            <div><span className="text-purple-400">title</span> TEXT</div>
            <div><span className="text-purple-400">content</span> TEXT (HTML)</div>
            <div><span className="text-purple-400">featured_image_url</span> TEXT</div>
          </div>
        </div>

        {/* Table 4: public.inquiries */}
        <div className="bg-[#0B1728] border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-amber-400">4. public.inquiries</span>
            <span className="text-[10px] bg-slate-900 text-slate-400 px-2 py-0.5 rounded">Lead Capture</span>
          </div>
          <p className="text-xs text-slate-400">
            Captures diaspora inspection requests, buyer phone numbers, and escrow advisory leads.
          </p>
          <div className="bg-slate-950 p-2.5 rounded-xl text-[11px] font-mono text-slate-300 space-y-1">
            <div><span className="text-purple-400">id</span> UUID (PK)</div>
            <div><span className="text-purple-400">full_name, email, phone</span> TEXT</div>
            <div><span className="text-purple-400">message, status</span> TEXT</div>
          </div>
        </div>

      </div>

      {/* Interactive SQL Display Window */}
      <div className="bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="bg-slate-900 px-5 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span className="font-mono text-xs text-slate-300 font-bold">schema.sql (Production Ready)</span>
          </div>
          <button
            onClick={copySql}
            className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Code'}</span>
          </button>
        </div>

        <pre className="p-6 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed max-h-96 overflow-y-auto">
          {fullSchemaSql}
        </pre>
      </div>

    </div>
  );
};
