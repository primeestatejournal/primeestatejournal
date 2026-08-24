import React, { useState, useEffect } from 'react';
import { DbBlogPost } from '../types';
import { fetchAdminBlogPosts } from '../lib/supabase';
import { Calendar, User, Sparkles, Search, ChevronRight, ArrowLeft, BookOpen, ShieldCheck } from 'lucide-react';

interface PublicBlogProps {
  onOpenAdmin?: () => void;
}

export const PublicBlog: React.FC<PublicBlogProps> = () => {
  const [posts, setPosts] = useState<DbBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<DbBlogPost | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await fetchAdminBlogPosts();
      setPosts(data || []);
      setLoading(false);
    }
    load();
  }, []);

  const filteredPosts = posts.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return p.title.toLowerCase().includes(q) || p.content.toLowerCase().includes(q);
  });

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 font-sans">
      
      {/* Editorial Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B1F3A] via-[#0F274A] to-[#155EEF] p-8 sm:p-12 text-white border border-blue-800/40 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Market Intelligence & Legal Due Diligence Journal</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Nigeria Real Estate <span className="text-amber-400">Insights & Titles</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Essential analysis on Lagos Governor's Consent, Abuja AGIS titling, off-plan developer verification, and diaspora capital repatriation strategies.
          </p>

          <div className="mt-6 flex items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search market intelligence articles..."
                className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-300 outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Reader Modal / Full Article View */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-10 my-8 shadow-2xl text-slate-800 max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs flex items-center gap-1 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Close Reader</span>
            </button>

            {selectedPost.featured_image_url && (
              <img
                src={selectedPost.featured_image_url}
                alt={selectedPost.title}
                referrerPolicy="no-referrer"
                className="w-full h-72 object-cover rounded-2xl mb-6 shadow-md"
              />
            )}

            <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
              <span className="flex items-center gap-1 font-semibold text-[#155EEF]">
                <User className="w-3.5 h-3.5" />
                {selectedPost.author_name || 'Prime Editorial Desk'}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 font-mono">
                <Calendar className="w-3.5 h-3.5" />
                {selectedPost.created_at ? new Date(selectedPost.created_at).toLocaleDateString() : 'Recent'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-6 leading-tight">
              {selectedPost.title}
            </h1>

            <div 
              className="prose prose-slate max-w-none text-sm text-slate-700 leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ __html: selectedPost.content }}
            />

            <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified Legal Title Guidance</span>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl"
              >
                Back to Articles
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Article Grid */}
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <div className="w-8 h-8 border-2 border-[#155EEF] border-t-amber-400 rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-500 font-medium">Fetching market intelligence articles from Supabase...</p>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-4 shadow-sm">
          <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-900">No Articles Found</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            {searchQuery ? 'No articles matched your search query.' : 'Our editorial team is drafting upcoming market intelligence and title guidance reports. Please check back shortly.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-300 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="relative overflow-hidden aspect-[16/10] bg-gradient-to-br from-slate-900 via-[#0B1F3A] to-slate-950 p-6 flex flex-col justify-between">
                  <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
                  {post.featured_image_url ? (
                    <img
                      src={post.featured_image_url}
                      alt={post.title}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="relative z-10 flex flex-col justify-between h-full">
                      <div className="flex items-center justify-between">
                        <span className="bg-[#D4A72C] text-slate-950 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                          Market Intelligence
                        </span>
                        <BookOpen className="w-4 h-4 text-blue-300" />
                      </div>
                      <div className="my-auto py-2">
                        <p className="text-[11px] font-bold text-slate-300 uppercase tracking-widest">LEGAL & INVESTMENT INSIGHT</p>
                      </div>
                      <div className="text-[10px] font-medium text-slate-400 border-t border-white/10 pt-2 flex items-center justify-between">
                        <span>Prime Editorial Desk</span>
                        <span className="text-[#155EEF] font-bold">Read Analysis →</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 mb-2.5">
                    <span className="font-semibold text-slate-700">{post.author_name || 'Prime Editorial'}</span>
                    <span>•</span>
                    <span className="font-mono">{post.created_at ? new Date(post.created_at).toLocaleDateString() : 'Recent'}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#155EEF] transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {post.content.replace(/<[^>]+>/g, '')}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#155EEF]">
                <span>Read Full Analysis</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </article>
          ))}
        </div>
      )}

    </div>
  );
};
