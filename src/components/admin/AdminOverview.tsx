import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  BookOpen,
  FileText, 
  Users, 
  ShieldCheck, 
  PlusCircle, 
  ArrowUpRight, 
  TrendingUp, 
  Database, 
  Clock, 
  Sparkles, 
  ExternalLink,
  Edit,
  Trash2,
  PhoneCall,
  MessageSquare
} from 'lucide-react';
import { DbProperty, DbBlogPost, AdminDashboardView } from '../../types';
import { fetchAdminProperties, fetchAdminBlogPosts } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

interface AdminOverviewProps {
  onNavigate: (view: AdminDashboardView) => void;
  onAddNewProperty: () => void;
  onAddNewBlogPost: () => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({
  onNavigate,
  onAddNewProperty,
  onAddNewBlogPost,
}) => {
  const { profile, user, isConfigured } = useAuth();
  const [properties, setProperties] = useState<DbProperty[]>([]);
  const [blogPosts, setBlogPosts] = useState<DbBlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const [propsData, postsData] = await Promise.all([
        fetchAdminProperties(),
        fetchAdminBlogPosts(),
      ]);
      setProperties(propsData || []);
      setBlogPosts(postsData || []);
      setLoading(false);
    }
    loadData();
  }, []);

  const totalValueNaira = properties.reduce((acc, p) => acc + (Number(p.price_naira) || 0), 0);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* ---------------------------------------------------- */}
      {/* Welcome Banner */}
      {/* ---------------------------------------------------- */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0B1F3A] via-[#0F274A] to-[#155EEF] p-6 sm:p-8 border border-blue-800/40 shadow-2xl shadow-blue-950/50">
        <div className="absolute right-0 top-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real Estate Operations Command Center</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, {profile?.full_name || user?.user_metadata?.full_name || 'Admin'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1.5 max-w-2xl font-normal">
              Manage your verified luxury property listings, publish market intelligence editorials, and monitor real-time diaspora inquiries.
            </p>
          </div>

          {/* Quick Primary Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onAddNewProperty}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold px-4 py-3 rounded-xl shadow-lg shadow-amber-950/40 flex items-center gap-2 transition-all active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add New Property</span>
            </button>
            <button
              onClick={onAddNewBlogPost}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold px-4 py-3 rounded-xl backdrop-blur-md flex items-center gap-2 transition-all"
            >
              <FileText className="w-4 h-4 text-amber-300" />
              <span>Write Blog Post</span>
            </button>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* Metric Cards Grid */}
      {/* ---------------------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Card 1: Total Properties */}
        <div className="bg-[#0B1728] border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Properties Listed</span>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-[#155EEF]">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-white tracking-tight">
              {loading ? '...' : properties.length}
            </div>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1 font-medium">
              <span className="text-emerald-400 font-bold">100% Verified</span>
              <span>• Database synced</span>
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">Total Portfolio Value:</span>
            <span className="text-xs font-bold text-amber-400 font-mono">
              ₦{(totalValueNaira / 1000000).toFixed(1)}M+
            </span>
          </div>
        </div>

        {/* Card 2: Blog Posts */}
        <div className="bg-[#0B1728] border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Published Articles</span>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-white tracking-tight">
              {loading ? '...' : blogPosts.length}
            </div>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1 font-medium">
              <span className="text-amber-400 font-bold">Editorial Desk</span>
              <span>• HTML WYSIWYG</span>
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">Latest Post:</span>
            <span className="text-xs font-semibold text-slate-300 truncate max-w-[120px]">
              {blogPosts[0]?.title || 'No posts yet'}
            </span>
          </div>
        </div>

        {/* Card 3: Security & Role */}
        <div className="bg-[#0B1728] border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Admin Security</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-extrabold text-white tracking-tight capitalize">
              {profile?.role || 'Admin'}
            </div>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Full Supabase RBAC</span>
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">Auth System:</span>
            <span className="text-[11px] font-semibold text-emerald-300">
              {isConfigured ? 'Live Supabase Auth' : 'Sandbox Storage'}
            </span>
          </div>
        </div>

        {/* Card 4: Database Engine */}
        <div className="bg-[#0B1728] border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Database Tables</span>
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Database className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-white tracking-tight">
              4 Tables
            </div>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1 font-medium">
              <span>profiles, properties, blog</span>
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
            <button
              onClick={() => onNavigate('database')}
              className="text-[11px] font-bold text-[#155EEF] hover:text-blue-400 flex items-center gap-1"
            >
              <span>View SQL Schema Desk</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>

      {/* ---------------------------------------------------- */}
      {/* Quick Action Shortcuts Banner */}
      {/* ---------------------------------------------------- */}
      <div className="bg-[#0B1728] border border-slate-800 rounded-2xl p-6 shadow-md">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Quick Administrative Shortcuts</span>
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            onClick={onAddNewProperty}
            className="p-3.5 bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-blue-700/60 rounded-xl text-left transition-all flex items-center gap-3 group"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-[#155EEF] group-hover:bg-[#155EEF] group-hover:text-white flex items-center justify-center transition-colors">
              <PlusCircle className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Add Property</p>
              <p className="text-[11px] text-slate-400">With 4 gallery images</p>
            </div>
          </button>

          <button
            onClick={onAddNewBlogPost}
            className="p-3.5 bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-amber-700/60 rounded-xl text-left transition-all flex items-center gap-3 group"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 group-hover:bg-amber-400 group-hover:text-slate-950 flex items-center justify-center transition-colors">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Write Editorial</p>
              <p className="text-[11px] text-slate-400">Rich HTML WYSIWYG</p>
            </div>
          </button>

          <button
            onClick={() => onNavigate('properties')}
            className="p-3.5 bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-slate-700 rounded-xl text-left transition-all flex items-center gap-3 group"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 group-hover:bg-slate-700 flex items-center justify-center transition-colors">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">All Properties</p>
              <p className="text-[11px] text-slate-400">Manage & Edit listings</p>
            </div>
          </button>

          <button
            onClick={() => onNavigate('database')}
            className="p-3.5 bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-purple-700/60 rounded-xl text-left transition-all flex items-center gap-3 group"
          >
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 group-hover:bg-purple-600 group-hover:text-white flex items-center justify-center transition-colors">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">SQL Schema Desk</p>
              <p className="text-[11px] text-slate-400">Copy Supabase SQL</p>
            </div>
          </button>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* Two Column Section: Recent Properties & Recent Blog Posts */}
      {/* ---------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Recent Properties Panel */}
        <div className="bg-[#0B1728] border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-amber-400" />
                <h3 className="font-bold text-sm text-white">Recent Property Listings</h3>
              </div>
              <button
                onClick={() => onNavigate('properties')}
                className="text-xs font-bold text-[#155EEF] hover:text-blue-400 flex items-center gap-1"
              >
                <span>View All ({properties.length})</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {loading ? (
              <div className="py-12 text-center text-xs text-slate-500">Loading listings...</div>
            ) : properties.length === 0 ? (
              <div className="py-10 text-center space-y-3">
                <Building2 className="w-8 h-8 text-slate-600 mx-auto" />
                <p className="text-xs font-semibold text-slate-400">No properties created yet.</p>
                <button
                  onClick={onAddNewProperty}
                  className="bg-[#155EEF] text-white text-xs font-bold px-3.5 py-1.5 rounded-lg inline-flex items-center gap-1.5"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Create First Property</span>
                </button>
              </div>
            ) : (
              <div className="divide-y divide-slate-800/80 mt-2">
                {properties.slice(0, 4).map((prop) => (
                  <div key={prop.id} className="py-3.5 flex items-center justify-between gap-4 group">
                    <div className="flex items-center gap-3 min-w-0">
                      {prop.featured_image_url ? (
                        <img
                          src={prop.featured_image_url}
                          alt={prop.title}
                          referrerPolicy="no-referrer"
                          className="w-12 h-12 rounded-xl object-cover border border-slate-800 shrink-0"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 text-blue-400">
                          <Building2 className="w-5 h-5" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-white truncate group-hover:text-amber-400 transition-colors">
                          {prop.title}
                        </p>
                        <p className="text-[11px] text-amber-400 font-bold mt-0.5">
                          ₦{Number(prop.price_naira).toLocaleString()}
                        </p>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                          <span>WhatsApp: {prop.agent_whatsapp || 'Configured'}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onNavigate('properties')}
                      className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs shrink-0"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-800/80">
            <button
              onClick={onAddNewProperty}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-bold text-slate-300 hover:text-white flex items-center justify-center gap-2 transition-all"
            >
              <PlusCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>Add Another Property Listing</span>
            </button>
          </div>
        </div>

        {/* Recent Blog Posts Panel */}
        <div className="bg-[#0B1728] border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" />
                <h3 className="font-bold text-sm text-white">Recent Market Intelligence Articles</h3>
              </div>
              <button
                onClick={() => onNavigate('blog')}
                className="text-xs font-bold text-[#155EEF] hover:text-blue-400 flex items-center gap-1"
              >
                <span>View All ({blogPosts.length})</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {loading ? (
              <div className="py-12 text-center text-xs text-slate-500">Loading articles...</div>
            ) : blogPosts.length === 0 ? (
              <div className="py-10 text-center space-y-3">
                <FileText className="w-8 h-8 text-slate-600 mx-auto" />
                <p className="text-xs font-semibold text-slate-400">No blog posts published yet.</p>
                <button
                  onClick={onAddNewBlogPost}
                  className="bg-amber-400 text-slate-950 text-xs font-bold px-3.5 py-1.5 rounded-lg inline-flex items-center gap-1.5"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Write First Article</span>
                </button>
              </div>
            ) : (
              <div className="divide-y divide-slate-800/80 mt-2">
                {blogPosts.slice(0, 4).map((post) => (
                  <div key={post.id} className="py-3.5 flex items-center justify-between gap-4 group">
                    <div className="flex items-center gap-3 min-w-0">
                      {post.featured_image_url ? (
                        <img
                          src={post.featured_image_url}
                          alt={post.title}
                          referrerPolicy="no-referrer"
                          className="w-12 h-12 rounded-xl object-cover border border-slate-800 shrink-0"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 text-amber-400">
                          <BookOpen className="w-5 h-5" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-white truncate group-hover:text-amber-400 transition-colors">
                          {post.title}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-500" />
                          <span>{post.created_at ? new Date(post.created_at).toLocaleDateString() : 'Just now'}</span>
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => onNavigate('blog')}
                      className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs shrink-0"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-800/80">
            <button
              onClick={onAddNewBlogPost}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-bold text-slate-300 hover:text-white flex items-center justify-center gap-2 transition-all"
            >
              <PlusCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>Launch Classic WYSIWYG Editor</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
