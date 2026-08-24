import React, { useState, useEffect, useRef } from 'react';
import { 
  FileText, 
  BookOpen,
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Code, 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough, 
  Heading2, 
  Heading3, 
  List, 
  ListOrdered, 
  Quote, 
  Link as LinkIcon, 
  Image as ImageIcon, 
  Check, 
  X, 
  AlertCircle, 
  Clock, 
  Sparkles,
  RefreshCw,
  Calendar,
  User,
  ArrowLeft
} from 'lucide-react';
import { DbBlogPost } from '../../types';
import { 
  fetchAdminBlogPosts, 
  createAdminBlogPost, 
  updateAdminBlogPost, 
  deleteAdminBlogPost 
} from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

interface AdminBlogPostsProps {
  initialOpenEditor?: boolean;
  onEditorClose?: () => void;
}

export const AdminBlogPosts: React.FC<AdminBlogPostsProps> = ({
  initialOpenEditor = false,
  onEditorClose,
}) => {
  const { user, profile } = useAuth();
  const [posts, setPosts] = useState<DbBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Editor View State: 'list' | 'editor'
  const [activeMode, setActiveMode] = useState<'list' | 'editor'>(initialOpenEditor ? 'editor' : 'list');
  const [editingPost, setEditingPost] = useState<DbBlogPost | null>(null);
  
  // Editor mode: 'visual' (WYSIWYG) | 'html' (Source code) | 'preview'
  const [editorTab, setEditorTab] = useState<'visual' | 'html' | 'preview'>('visual');
  
  // Form State
  const [postTitle, setPostTitle] = useState('');
  const [featuredImageUrl, setFeaturedImageUrl] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Delete modal state
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // ContentEditable ref
  const visualEditorRef = useRef<HTMLDivElement>(null);

  const loadPosts = async () => {
    setLoading(true);
    const data = await fetchAdminBlogPosts();
    setPosts(data || []);
    setLoading(false);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    if (initialOpenEditor) {
      handleOpenCreate();
    }
  }, [initialOpenEditor]);

  // Sync visual editor DOM content with htmlContent state when switching to visual tab
  useEffect(() => {
    if (editorTab === 'visual' && visualEditorRef.current) {
      if (visualEditorRef.current.innerHTML !== htmlContent) {
        visualEditorRef.current.innerHTML = htmlContent || '<p>Write your article content here...</p>';
      }
    }
  }, [editorTab, activeMode]);

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const handleOpenCreate = () => {
    setEditingPost(null);
    setPostTitle('');
    setFeaturedImageUrl('');
    setHtmlContent(`<h2>Prime Nigerian Real Estate Market Insights</h2>
<p>Investing in Lagos and Abuja high-yield corridors requires diligent verification of land titles, developer compliance, and registered Governor's Consent.</p>
<h3>Key Investment Due Diligence Points:</h3>
<ul>
  <li>Verification with Lagos State Lands Bureau (Alausa) or AGIS Abuja.</li>
  <li>Survey charting to confirm zero government acquisition risk.</li>
  <li>Milestone escrow release protection for off-plan constructions.</li>
</ul>
<blockquote>"Clean legal title is the bedrock of enduring wealth in Nigerian real estate."</blockquote>
<p>Contact our verified legal team for institutional acquisition advisory.</p>`);
    setErrorMessage(null);
    setEditorTab('visual');
    setActiveMode('editor');
  };

  const handleOpenEdit = (post: DbBlogPost) => {
    setEditingPost(post);
    setPostTitle(post.title || '');
    setFeaturedImageUrl(post.featured_image_url || '');
    setHtmlContent(post.content || '');
    setErrorMessage(null);
    setEditorTab('visual');
    setActiveMode('editor');
  };

  const handleBackToList = () => {
    setActiveMode('list');
    setEditingPost(null);
    if (onEditorClose) onEditorClose();
  };

  // WYSIWYG formatting commands
  const executeCommand = (command: string, value: string | undefined = undefined) => {
    if (editorTab !== 'visual') return;
    document.execCommand(command, false, value);
    if (visualEditorRef.current) {
      setHtmlContent(visualEditorRef.current.innerHTML);
    }
  };

  const handleInsertLink = () => {
    const url = prompt('Enter destination URL (e.g. https://primeestatejournal.ng):');
    if (url) {
      executeCommand('createLink', url);
    }
  };

  const handleInsertImage = () => {
    const url = prompt('Enter Image URL to embed into the article:');
    if (url) {
      executeCommand('insertImage', url);
    }
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    let finalContent = htmlContent;
    if (editorTab === 'visual' && visualEditorRef.current) {
      finalContent = visualEditorRef.current.innerHTML;
    }

    if (!postTitle.trim()) {
      setErrorMessage('Post title is required.');
      return;
    }

    if (!finalContent.trim()) {
      setErrorMessage('Post content cannot be empty.');
      return;
    }

    setIsSaving(true);

    const payload = {
      title: postTitle.trim(),
      content: finalContent,
      featured_image_url: featuredImageUrl.trim(),
      author_id: user?.id || null,
      author_name: profile?.full_name || user?.user_metadata?.full_name || 'Prime Editorial Desk',
    };

    if (editingPost) {
      const res = await updateAdminBlogPost(editingPost.id, payload);
      setIsSaving(false);
      if (res.error) {
        setErrorMessage(res.error);
      } else {
        showToast('Blog article updated successfully!');
        handleBackToList();
        await loadPosts();
      }
    } else {
      const res = await createAdminBlogPost(payload);
      setIsSaving(false);
      if (res.error && !res.data) {
        setErrorMessage(res.error);
      } else {
        showToast('New blog article published successfully!');
        handleBackToList();
        await loadPosts();
      }
    }
  };

  const handleDeletePost = async (id: string) => {
    setIsDeleting(true);
    const res = await deleteAdminBlogPost(id);
    setIsDeleting(false);
    setDeletingId(null);
    if (res.success) {
      showToast('Article deleted successfully.');
      await loadPosts();
    } else {
      alert(`Delete error: ${res.error}`);
    }
  };

  const filteredPosts = posts.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return p.title.toLowerCase().includes(q) || p.content.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-900/90 border border-emerald-500 text-emerald-100 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 text-xs font-bold animate-fade-in">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{successToast}</span>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* View Mode 1: Blog Post List */}
      {/* ---------------------------------------------------- */}
      {activeMode === 'list' && (
        <>
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0B1728] p-6 rounded-3xl border border-slate-800 shadow-xl">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-400" />
                <span>Market Intelligence Editorial Desk</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Publish rich HTML editorials directly to the Supabase <span className="font-mono text-amber-400 text-[11px]">public.blog_posts</span> table.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={loadPosts}
                disabled={loading}
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs transition-all"
                title="Refresh Posts"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-amber-400' : ''}`} />
              </button>

              <button
                onClick={handleOpenCreate}
                className="bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-amber-950/30 flex items-center gap-2 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Write New Article</span>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex items-center gap-3 bg-[#0B1728] p-3 rounded-2xl border border-slate-800">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by title or keyword..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none"
              />
            </div>
            <div className="text-xs text-slate-400 px-3 font-semibold shrink-0">
              {filteredPosts.length} Articles
            </div>
          </div>

          {/* Table / List View */}
          {loading ? (
            <div className="bg-[#0B1728] border border-slate-800 rounded-3xl p-16 text-center space-y-3">
              <div className="w-8 h-8 border-2 border-amber-400 border-t-blue-500 rounded-full animate-spin mx-auto" />
              <p className="text-xs text-slate-400 font-medium">Loading blog articles...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="bg-[#0B1728] border border-slate-800 rounded-3xl p-16 text-center space-y-4 shadow-xl">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/20">
                <FileText className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">No Blog Articles Published Yet</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
                  Launch the Classic WYSIWYG editor to draft legal title guides, investment analyses, or market news.
                </p>
              </div>
              <button
                onClick={handleOpenCreate}
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold px-5 py-2.5 rounded-xl shadow-lg inline-flex items-center gap-2 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Compose First Article</span>
              </button>
            </div>
          ) : (
            <div className="bg-[#0B1728] border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950/80 text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="py-3.5 px-4 sm:px-6">Article / Title</th>
                      <th className="py-3.5 px-4">Author</th>
                      <th className="py-3.5 px-4">Publish Date</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {filteredPosts.map((post) => (
                      <tr key={post.id} className="hover:bg-slate-900/60 transition-colors group">
                        
                        {/* Title & Featured Image */}
                        <td className="py-4 px-4 sm:px-6">
                          <div className="flex items-center gap-3">
                            {post.featured_image_url ? (
                              <img
                                src={post.featured_image_url}
                                alt={post.title}
                                referrerPolicy="no-referrer"
                                className="w-14 h-14 rounded-xl object-cover border border-slate-800 shrink-0 shadow-sm"
                              />
                            ) : (
                              <div className="w-14 h-14 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 text-amber-400">
                                <BookOpen className="w-6 h-6" />
                              </div>
                            )}
                            <div className="min-w-0 max-w-sm sm:max-w-md">
                              <p className="font-bold text-white text-xs truncate group-hover:text-amber-400 transition-colors">
                                {post.title}
                              </p>
                              <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5 font-normal">
                                {post.content.replace(/<[^>]+>/g, '').substring(0, 100)}...
                              </p>
                              <span className="text-[10px] text-slate-500 font-mono">
                                ID: {post.id.substring(0, 13)}...
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Author */}
                        <td className="py-4 px-4 whitespace-nowrap text-slate-400 font-medium text-xs">
                          <div className="flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-amber-400" />
                            <span>{post.author_name || 'Chief Admin'}</span>
                          </div>
                        </td>

                        {/* Published Date */}
                        <td className="py-4 px-4 whitespace-nowrap text-slate-400 text-xs">
                          <div className="flex items-center gap-1.5 font-mono">
                            <Calendar className="w-3.5 h-3.5 text-slate-500" />
                            <span>{post.created_at ? new Date(post.created_at).toLocaleDateString() : 'Recent'}</span>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEdit(post)}
                              className="p-2 rounded-xl bg-slate-900 hover:bg-amber-400 hover:text-slate-950 text-slate-300 border border-slate-800 transition-all"
                              title="Edit Article"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            
                            <button
                              onClick={() => setDeletingId(post.id)}
                              className="p-2 rounded-xl bg-slate-900 hover:bg-red-950/80 text-slate-400 hover:text-red-300 border border-slate-800 hover:border-red-800/80 transition-all"
                              title="Delete Article"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {/* ---------------------------------------------------- */}
      {/* View Mode 2: Classic WYSIWYG Rich Text Editor */}
      {/* ---------------------------------------------------- */}
      {activeMode === 'editor' && (
        <div className="bg-[#0B1728] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          
          {/* Editor Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleBackToList}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 flex items-center gap-1.5 text-xs font-semibold"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>All Articles</span>
              </button>
              <div>
                <h3 className="text-base font-bold text-white">
                  {editingPost ? 'Edit Market Intelligence Post' : 'Compose New Market Intelligence Post'}
                </h3>
                <p className="text-xs text-slate-400">
                  Classic WYSIWYG & HTML rich text editor
                </p>
              </div>
            </div>

            {/* Editor Mode Tabs (Visual / HTML / Preview) */}
            <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800">
              <button
                type="button"
                onClick={() => {
                  if (editorTab === 'html' && visualEditorRef.current) {
                    visualEditorRef.current.innerHTML = htmlContent;
                  }
                  setEditorTab('visual');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  editorTab === 'visual'
                    ? 'bg-[#155EEF] text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Visual Editor
              </button>

              <button
                type="button"
                onClick={() => {
                  if (editorTab === 'visual' && visualEditorRef.current) {
                    setHtmlContent(visualEditorRef.current.innerHTML);
                  }
                  setEditorTab('html');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  editorTab === 'html'
                    ? 'bg-[#155EEF] text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>HTML Source</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (editorTab === 'visual' && visualEditorRef.current) {
                    setHtmlContent(visualEditorRef.current.innerHTML);
                  }
                  setEditorTab('preview');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  editorTab === 'preview'
                    ? 'bg-amber-400 text-slate-950 font-extrabold shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Reader Preview</span>
              </button>
            </div>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3.5 bg-red-950/60 border border-red-800/80 rounded-2xl flex items-start gap-3 text-red-200 text-xs">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium">{errorMessage}</div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSavePost} className="space-y-6">
            
            {/* Title & Featured Image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="e.g. 2026 Guide to Governor's Consent & Land Titling in Lagos"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-amber-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Featured Header Image URL
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="url"
                    value={featuredImageUrl}
                    onChange={(e) => setFeaturedImageUrl(e.target.value)}
                    placeholder="https://example.com/article-header.jpg (optional)"
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-amber-400 outline-none"
                  />
                  {featuredImageUrl && (
                    <img
                      src={featuredImageUrl}
                      alt="Featured"
                      referrerPolicy="no-referrer"
                      className="w-10 h-9 rounded-lg object-cover border border-slate-700 shrink-0"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* ---------------------------------------------------- */}
            {/* WYSIWYG Toolbar (Shown during visual mode) */}
            {/* ---------------------------------------------------- */}
            {editorTab === 'visual' && (
              <div className="bg-slate-950 border border-slate-800 p-2 rounded-2xl flex flex-wrap items-center gap-1 shadow-inner">
                {/* Bold */}
                <button
                  type="button"
                  onClick={() => executeCommand('bold')}
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white"
                  title="Bold (Ctrl+B)"
                >
                  <Bold className="w-4 h-4" />
                </button>

                {/* Italic */}
                <button
                  type="button"
                  onClick={() => executeCommand('italic')}
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white"
                  title="Italic (Ctrl+I)"
                >
                  <Italic className="w-4 h-4" />
                </button>

                {/* Underline */}
                <button
                  type="button"
                  onClick={() => executeCommand('underline')}
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white"
                  title="Underline (Ctrl+U)"
                >
                  <Underline className="w-4 h-4" />
                </button>

                {/* Strikethrough */}
                <button
                  type="button"
                  onClick={() => executeCommand('strikeThrough')}
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white"
                  title="Strikethrough"
                >
                  <Strikethrough className="w-4 h-4" />
                </button>

                <div className="h-5 w-px bg-slate-800 mx-1" />

                {/* Headings */}
                <button
                  type="button"
                  onClick={() => executeCommand('formatBlock', '<h2>')}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-bold"
                  title="Heading 2"
                >
                  H2
                </button>

                <button
                  type="button"
                  onClick={() => executeCommand('formatBlock', '<h3>')}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-bold"
                  title="Heading 3"
                >
                  H3
                </button>

                <button
                  type="button"
                  onClick={() => executeCommand('formatBlock', '<p>')}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-bold"
                  title="Normal Paragraph"
                >
                  P
                </button>

                <div className="h-5 w-px bg-slate-800 mx-1" />

                {/* Lists */}
                <button
                  type="button"
                  onClick={() => executeCommand('insertUnorderedList')}
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white"
                  title="Bullet List"
                >
                  <List className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => executeCommand('insertOrderedList')}
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white"
                  title="Numbered List"
                >
                  <ListOrdered className="w-4 h-4" />
                </button>

                {/* Quote */}
                <button
                  type="button"
                  onClick={() => executeCommand('formatBlock', '<blockquote>')}
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white"
                  title="Quote"
                >
                  <Quote className="w-4 h-4" />
                </button>

                <div className="h-5 w-px bg-slate-800 mx-1" />

                {/* Link & Image Insertion */}
                <button
                  type="button"
                  onClick={handleInsertLink}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1"
                  title="Insert Hyperlink"
                >
                  <LinkIcon className="w-3.5 h-3.5 text-blue-400" />
                  <span>Link</span>
                </button>

                <button
                  type="button"
                  onClick={handleInsertImage}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1"
                  title="Embed Image URL"
                >
                  <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                  <span>Image</span>
                </button>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* Editor Workspace */}
            {/* ---------------------------------------------------- */}
            <div className="min-h-[360px] bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden p-4">
              
              {/* Tab 1: Visual WYSIWYG ContentEditable */}
              {editorTab === 'visual' && (
                <div
                  ref={visualEditorRef}
                  contentEditable
                  onInput={() => {
                    if (visualEditorRef.current) {
                      setHtmlContent(visualEditorRef.current.innerHTML);
                    }
                  }}
                  className="outline-none min-h-[340px] text-slate-200 text-sm prose prose-invert max-w-none focus:ring-0 leading-relaxed font-sans"
                />
              )}

              {/* Tab 2: HTML Source Code Area */}
              {editorTab === 'html' && (
                <textarea
                  rows={15}
                  value={htmlContent}
                  onChange={(e) => setHtmlContent(e.target.value)}
                  placeholder="<h2>Enter raw HTML code here...</h2>"
                  className="w-full h-full min-h-[340px] bg-transparent text-emerald-300 font-mono text-xs outline-none leading-relaxed resize-y"
                />
              )}

              {/* Tab 3: Reader Preview */}
              {editorTab === 'preview' && (
                <div className="p-6 bg-slate-900/90 rounded-xl border border-slate-800 text-slate-200">
                  {featuredImageUrl && (
                    <img
                      src={featuredImageUrl}
                      alt="Header"
                      referrerPolicy="no-referrer"
                      className="w-full h-56 object-cover rounded-xl mb-6 shadow-md"
                    />
                  )}
                  <h1 className="text-2xl font-bold text-white mb-4">{postTitle || 'Untitled Post'}</h1>
                  <div 
                    className="prose prose-invert max-w-none text-sm text-slate-300 leading-relaxed space-y-3"
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                  />
                </div>
              )}

            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={handleBackToList}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold transition-all"
              >
                Cancel & Return
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold shadow-lg shadow-amber-950/40 flex items-center gap-2 transition-all disabled:opacity-50"
                >
                  {isSaving ? (
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{editingPost ? 'Update & Publish Article' : 'Publish to Supabase'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </form>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* Delete Confirmation Modal */}
      {/* ---------------------------------------------------- */}
      {deletingId && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-red-950/60 border border-red-800/60 text-red-400 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Delete Blog Post?</h3>
            <p className="text-xs text-slate-400">
              Are you sure you want to permanently delete this article from your Supabase blog repository?
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeletingId(null)}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => handleDeletePost(deletingId)}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
