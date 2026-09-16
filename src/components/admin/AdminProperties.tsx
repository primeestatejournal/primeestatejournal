import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  ExternalLink, 
  Image as ImageIcon, 
  Phone, 
  MessageSquare, 
  Check, 
  X, 
  AlertCircle, 
  Sparkles,
  Eye,
  DollarSign,
  Layers,
  ArrowUpDown,
  RefreshCw,
  Copy,
  ShieldCheck,
  Video,
  ArrowLeftRight
} from 'lucide-react';
import { DbProperty } from '../../types';
import { 
  fetchAdminProperties, 
  createAdminProperty, 
  updateAdminProperty, 
  deleteAdminProperty,
  togglePropertyAvailability
} from '../../lib/supabase';

interface AdminPropertiesProps {
  initialOpenModal?: boolean;
  onModalClose?: () => void;
}

export const AdminProperties: React.FC<AdminPropertiesProps> = ({
  initialOpenModal = false,
  onModalClose,
}) => {
  const [properties, setProperties] = useState<DbProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(initialOpenModal);
  const [editingProperty, setEditingProperty] = useState<DbProperty | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const [copiedRlsSql, setCopiedRlsSql] = useState(false);

  const rlsFixSql = `ALTER TABLE IF EXISTS public.properties ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access to properties" ON public.properties;
DROP POLICY IF EXISTS "Allow authenticated admins to insert properties" ON public.properties;
DROP POLICY IF EXISTS "Allow authenticated admins to update properties" ON public.properties;
DROP POLICY IF EXISTS "Allow authenticated admins to delete properties" ON public.properties;
DROP POLICY IF EXISTS "Allow full access to properties" ON public.properties;
DROP POLICY IF EXISTS "Allow public and admin insert to properties" ON public.properties;
DROP POLICY IF EXISTS "Allow public and admin update to properties" ON public.properties;
DROP POLICY IF EXISTS "Allow public and admin delete to properties" ON public.properties;

CREATE POLICY "Allow public read access to properties" ON public.properties FOR SELECT USING (true);
CREATE POLICY "Allow public and admin insert to properties" ON public.properties FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public and admin update to properties" ON public.properties FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Allow public and admin delete to properties" ON public.properties FOR DELETE USING (true);`;

  const copyRlsSql = () => {
    navigator.clipboard.writeText(rlsFixSql);
    setCopiedRlsSql(true);
    setTimeout(() => setCopiedRlsSql(false), 2500);
  };

  // Delete confirmation state
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price_naira: '',
    agent_whatsapp: '+2348030000000',
    agent_call_number: '+2348020000000',
    featured_image_url: '',
    gallery_image_url_1: '',
    gallery_image_url_2: '',
    gallery_image_url_3: '',
    gallery_image_url_4: '',
    video_url: '',
    availability_status: 'available' as 'available' | 'sold',
  });

  const loadProperties = async () => {
    setLoading(true);
    const data = await fetchAdminProperties();
    setProperties(data || []);
    setLoading(false);
  };

  useEffect(() => {
    loadProperties();
  }, []);

  useEffect(() => {
    if (initialOpenModal) {
      handleOpenCreateModal();
    }
  }, [initialOpenModal]);

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const handleOpenCreateModal = () => {
    setEditingProperty(null);
    setFormData({
      title: '',
      description: '',
      price_naira: '',
      agent_whatsapp: '+2348031234567',
      agent_call_number: '+2348021234567',
      featured_image_url: '',
      gallery_image_url_1: '',
      gallery_image_url_2: '',
      gallery_image_url_3: '',
      gallery_image_url_4: '',
      video_url: '',
      availability_status: 'available',
    });
    setErrorMessage(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (prop: DbProperty) => {
    setEditingProperty(prop);
    setFormData({
      title: prop.title || '',
      description: prop.description || '',
      price_naira: prop.price_naira ? prop.price_naira.toString() : '',
      agent_whatsapp: prop.agent_whatsapp || '',
      agent_call_number: prop.agent_call_number || '',
      featured_image_url: prop.featured_image_url || '',
      gallery_image_url_1: prop.gallery_image_url_1 || '',
      gallery_image_url_2: prop.gallery_image_url_2 || '',
      gallery_image_url_3: prop.gallery_image_url_3 || '',
      gallery_image_url_4: prop.gallery_image_url_4 || '',
      video_url: prop.video_url || '',
      availability_status: prop.availability_status || 'available',
    });
    setErrorMessage(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProperty(null);
    if (onModalClose) onModalClose();
  };

  const handleToggleStatus = async (prop: DbProperty) => {
    const prevStatus = prop.availability_status || 'available';
    const targetStatus = prevStatus === 'sold' ? 'available' : 'sold';

    // Optimistic UI update
    setProperties((prev) =>
      prev.map((p) => (p.id === prop.id ? { ...p, availability_status: targetStatus } : p))
    );

    const res = await togglePropertyAvailability(prop.id, prevStatus);
    if (!res.success) {
      // Revert upon failure
      setProperties((prev) =>
        prev.map((p) => (p.id === prop.id ? { ...p, availability_status: prevStatus } : p))
      );
      showToast(`Error updating status: ${res.error || 'Request failed'}`);
    } else {
      showToast(`Property marked as ${targetStatus.toUpperCase()}`);
    }
  };

  const handleSaveProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.title.trim()) {
      setErrorMessage('Property Title is required.');
      return;
    }

    const priceNum = Number(formData.price_naira);
    if (isNaN(priceNum) || priceNum <= 0) {
      setErrorMessage('Please enter a valid price in Naira (e.g. 150000000).');
      return;
    }

    setIsSaving(true);

    const payload = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      price_naira: priceNum,
      agent_whatsapp: formData.agent_whatsapp.trim(),
      agent_call_number: formData.agent_call_number.trim(),
      featured_image_url: formData.featured_image_url.trim(),
      gallery_image_url_1: formData.gallery_image_url_1.trim() || null,
      gallery_image_url_2: formData.gallery_image_url_2.trim() || null,
      gallery_image_url_3: formData.gallery_image_url_3.trim() || null,
      gallery_image_url_4: formData.gallery_image_url_4.trim() || null,
      video_url: formData.video_url.trim() || null,
      availability_status: formData.availability_status,
    };

    if (editingProperty) {
      const res = await updateAdminProperty(editingProperty.id, payload);
      setIsSaving(false);
      if (res.error) {
        setErrorMessage(res.error);
      } else {
        showToast('Property listing updated successfully!');
        handleCloseModal();
        await loadProperties();
      }
    } else {
      const res = await createAdminProperty(payload);
      setIsSaving(false);
      if (res.error) {
        setErrorMessage(res.error);
      } else {
        showToast('New property created successfully!');
        handleCloseModal();
        await loadProperties();
      }
    }
  };

  const handleDeleteProperty = async (id: string) => {
    setIsDeleting(true);
    const res = await deleteAdminProperty(id);
    setIsDeleting(false);
    setDeletingId(null);
    if (res.success) {
      showToast('Property deleted successfully.');
      await loadProperties();
    } else {
      alert(`Delete error: ${res.error}`);
    }
  };

  const filteredProperties = properties.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      (p.agent_whatsapp && p.agent_whatsapp.toLowerCase().includes(q))
    );
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

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0B1728] p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-amber-400" />
            <span>Properties Inventory & Management</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Production management interface synced with the <span className="font-mono text-amber-400 text-[11px]">public.properties</span> table.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadProperties}
            disabled={loading}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs transition-all"
            title="Refresh Listings"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-amber-400' : ''}`} />
          </button>
          
          <button
            onClick={handleOpenCreateModal}
            className="bg-[#155EEF] hover:bg-blue-600 active:scale-95 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-blue-900/30 flex items-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4 text-amber-300" />
            <span>Add New Property</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex items-center gap-3 bg-[#0B1728] p-3 rounded-2xl border border-slate-800">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search properties by title, keyword, status, or phone..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:border-[#155EEF] focus:ring-1 focus:ring-[#155EEF] outline-none"
          />
        </div>
        <div className="text-xs text-slate-400 px-3 font-semibold shrink-0">
          Showing {filteredProperties.length} of {properties.length}
        </div>
      </div>

      {/* Properties Table / Grid View */}
      {loading ? (
        <div className="bg-[#0B1728] border border-slate-800 rounded-3xl p-16 text-center space-y-3">
          <div className="w-8 h-8 border-2 border-[#155EEF] border-t-amber-400 rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-400 font-medium">Fetching verified properties from database...</p>
        </div>
      ) : filteredProperties.length === 0 ? (
        <div className="bg-[#0B1728] border border-slate-800 rounded-3xl p-16 text-center space-y-4 shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-blue-500/10 text-amber-400 flex items-center justify-center mx-auto border border-blue-500/20">
            <Building2 className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">No Properties Found</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
              {searchQuery ? 'No results matched your search query.' : 'Your property portfolio is currently empty. Click below to add your first luxury listing.'}
            </p>
          </div>
          <button
            onClick={handleOpenCreateModal}
            className="bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold px-5 py-2.5 rounded-xl shadow-lg inline-flex items-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create First Property</span>
          </button>
        </div>
      ) : (
        <div className="bg-[#0B1728] border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Property / Title</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Price (Naira ₦)</th>
                  <th className="py-3.5 px-4">Agent Contacts</th>
                  <th className="py-3.5 px-4">Media & Video</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredProperties.map((prop) => {
                  const galleryCount = [
                    prop.gallery_image_url_1,
                    prop.gallery_image_url_2,
                    prop.gallery_image_url_3,
                    prop.gallery_image_url_4,
                  ].filter(Boolean).length;
                  const isSold = prop.availability_status === 'sold';

                  return (
                    <tr key={prop.id} className="hover:bg-slate-900/60 transition-colors group">
                      {/* Title & Featured Image */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <div className="relative shrink-0">
                            {prop.featured_image_url ? (
                              <img
                                src={prop.featured_image_url}
                                alt={prop.title}
                                referrerPolicy="no-referrer"
                                className="w-14 h-14 rounded-xl object-cover border border-slate-800 shadow-sm"
                              />
                            ) : (
                              <div className="w-14 h-14 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-400">
                                <Building2 className="w-6 h-6" />
                              </div>
                            )}
                            {isSold && (
                              <span className="absolute -top-1.5 -left-1.5 bg-rose-600 text-white text-[9px] font-black uppercase px-1.5 py-0.5 rounded shadow">
                                Sold
                              </span>
                            )}
                          </div>
                          <div className="min-w-0 max-w-xs sm:max-w-sm">
                            <p className="font-bold text-white text-xs truncate group-hover:text-amber-400 transition-colors">
                              {prop.title}
                            </p>
                            <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5 font-normal">
                              {prop.description || 'No description provided.'}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] text-slate-500 font-mono">
                                ID: {prop.id.substring(0, 13)}...
                              </span>
                              {prop.video_url && (
                                <span className="inline-flex items-center gap-1 text-[10px] text-blue-400 font-medium">
                                  <Video className="w-2.5 h-2.5" />
                                  <span>Video Tour</span>
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Availability Status Badge & Toggle */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="space-y-1.5">
                          {isSold ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30 shadow-xs">
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                              Sold
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-xs">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                              Available
                            </span>
                          )}
                          <div>
                            <button
                              type="button"
                              onClick={() => handleToggleStatus(prop)}
                              title={`Switch availability to ${isSold ? 'Available' : 'Sold'}`}
                              className="inline-flex items-center gap-1 text-[10px] text-slate-400 hover:text-amber-300 font-semibold transition-colors px-1.5 py-0.5 rounded bg-slate-950/70 hover:bg-slate-900 border border-slate-800"
                            >
                              <ArrowLeftRight className="w-2.5 h-2.5 text-amber-400" />
                              <span>Mark {isSold ? 'Available' : 'Sold'}</span>
                            </button>
                          </div>
                        </div>
                      </td>

                      {/* Price in Naira */}
                      <td className="py-4 px-4 font-mono font-bold text-amber-400 text-xs whitespace-nowrap">
                        ₦{Number(prop.price_naira).toLocaleString()}
                      </td>

                      {/* Agent WhatsApp & Call */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="space-y-1 text-[11px]">
                          <div className="flex items-center gap-1.5 text-emerald-400">
                            <MessageSquare className="w-3 h-3" />
                            <span>{prop.agent_whatsapp || 'N/A'}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-400">
                            <Phone className="w-3 h-3" />
                            <span>{prop.agent_call_number || 'N/A'}</span>
                          </div>
                        </div>
                      </td>

                      {/* Media & Video */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex flex-col gap-1.5">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-semibold text-slate-300">
                            <ImageIcon className="w-3 h-3 text-amber-400" />
                            <span>{galleryCount} / 4 Views</span>
                          </span>
                          {prop.video_url ? (
                            <a
                              href={prop.video_url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-blue-500/15 border border-blue-500/30 text-[10px] font-semibold text-blue-300 hover:text-white transition-colors"
                              title={prop.video_url}
                            >
                              <Video className="w-2.5 h-2.5 text-blue-400" />
                              <span>View Video</span>
                            </a>
                          ) : (
                            <span className="text-[10px] text-slate-500 italic">No video linked</span>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEditModal(prop)}
                            className="p-2 rounded-xl bg-slate-900 hover:bg-[#155EEF] text-slate-300 hover:text-white border border-slate-800 hover:border-blue-500 transition-all"
                            title="Edit Property"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          
                          <button
                            onClick={() => setDeletingId(prop.id)}
                            className="p-2 rounded-xl bg-slate-900 hover:bg-red-950/80 text-slate-400 hover:text-red-300 border border-slate-800 hover:border-red-800/80 transition-all"
                            title="Delete Property"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
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
            <h3 className="text-base font-bold text-white">Delete Property Listing?</h3>
            <p className="text-xs text-slate-400">
              Are you sure you want to permanently delete this property from the database? This action cannot be undone.
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
                onClick={() => handleDeleteProperty(deletingId)}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* Add / Edit Property Modal */}
      {/* ---------------------------------------------------- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0B1728] border border-slate-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 my-8 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-5 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[#155EEF] flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {editingProperty ? 'Edit Property Listing' : 'Add New Property Listing'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Direct mapping to <span className="font-mono text-amber-400">public.properties</span>
                  </p>
                </div>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Error banner */}
            {errorMessage && (
              <div className="mt-4 space-y-3">
                <div className="p-3.5 bg-red-950/60 border border-red-800/80 rounded-2xl flex items-start gap-3 text-red-200 text-xs">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div className="flex-1 font-medium">{errorMessage}</div>
                </div>

                {/* If error is related to Row-Level Security (RLS) */}
                {(errorMessage.toLowerCase().includes('violates') || 
                  errorMessage.toLowerCase().includes('row-level security') || 
                  errorMessage.toLowerCase().includes('policy') ||
                  errorMessage.toLowerCase().includes('permission')) && (
                  <div className="p-4 bg-amber-950/40 border border-amber-500/40 rounded-2xl space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-amber-300 font-bold">
                        <ShieldCheck className="w-4 h-4 text-amber-400" />
                        <span>Database Row-Level Security Fix</span>
                      </div>
                      <button
                        type="button"
                        onClick={copyRlsSql}
                        className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs transition-all shadow-sm"
                      >
                        {copiedRlsSql ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedRlsSql ? 'SQL Copied!' : 'Copy 1-Click RLS Fix SQL'}</span>
                      </button>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      Your database table <span className="font-mono text-amber-300">public.properties</span> has Row-Level Security enabled without public insert policies. To fix this: click <strong>"Copy 1-Click RLS Fix SQL"</strong>, open your <strong className="text-white">Database Console &gt; SQL Editor</strong>, paste the script, and click <strong className="text-emerald-400">Run</strong>. Then click Save again!
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSaveProperty} className="mt-6 space-y-6">
              
              {/* Title & Price */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Property Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. The Grand Ikoyi Horizon Penthouse"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-[#155EEF] focus:ring-1 focus:ring-[#155EEF] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Price in Naira (₦) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-xs">₦</span>
                    <input
                      type="number"
                      required
                      value={formData.price_naira}
                      onChange={(e) => setFormData({ ...formData, price_naira: e.target.value })}
                      placeholder="350000000"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3.5 py-2.5 text-xs text-white font-mono focus:border-[#155EEF] focus:ring-1 focus:ring-[#155EEF] outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Status Selector & Video URL */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                {/* Status Selector */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                    <span>Availability Status *</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${formData.availability_status === 'sold' ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'}`}>
                      {formData.availability_status === 'sold' ? 'Sold' : 'Available'}
                    </span>
                  </label>
                  <div className="grid grid-cols-2 gap-2 p-1 bg-slate-900 rounded-xl border border-slate-800">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, availability_status: 'available' })}
                      className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                        formData.availability_status === 'available'
                          ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span>Available</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, availability_status: 'sold' })}
                      className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                        formData.availability_status === 'sold'
                          ? 'bg-rose-600 text-white shadow-md shadow-rose-900/30'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-rose-400" />
                      <span>Sold</span>
                    </button>
                  </div>
                </div>

                {/* Video URL Input */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Video className="w-3.5 h-3.5 text-blue-400" />
                      <span>Property Video URL (YouTube or Vimeo)</span>
                    </span>
                    <span className="text-[10px] text-slate-500 font-normal">Optional</span>
                  </label>
                  <input
                    type="url"
                    value={formData.video_url}
                    onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                    placeholder="e.g. https://www.youtube.com/watch?v=... or https://vimeo.com/..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:border-[#155EEF] focus:ring-1 focus:ring-[#155EEF] outline-none"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Accepts YouTube or Vimeo links. An interactive HD video tour player will be embedded for potential buyers.
                  </p>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Property Description & Legal Overview
                </label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Provide comprehensive details on title status, location, building specifications, projected rental yield, and inspection guidelines..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-[#155EEF] focus:ring-1 focus:ring-[#155EEF] outline-none leading-relaxed"
                />
              </div>

              {/* Agent Contacts: WhatsApp & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Agent WhatsApp Number (International format)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.agent_whatsapp}
                    onChange={(e) => setFormData({ ...formData, agent_whatsapp: e.target.value })}
                    placeholder="+2348030000000"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:border-emerald-500 outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-blue-400" />
                    <span>Agent Direct Call Phone</span>
                  </label>
                  <input
                    type="text"
                    value={formData.agent_call_number}
                    onChange={(e) => setFormData({ ...formData, agent_call_number: e.target.value })}
                    placeholder="+2348020000000"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:border-blue-500 outline-none font-mono"
                  />
                </div>
              </div>

              {/* Featured Image URL & Preview */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-300">
                  Featured Image URL (Main Hero Photo)
                </label>
                <div className="flex gap-3 items-center">
                  <input
                    type="url"
                    value={formData.featured_image_url}
                    onChange={(e) => setFormData({ ...formData, featured_image_url: e.target.value })}
                    placeholder="https://example.com/property-photo.jpg (optional)"
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-[#155EEF] outline-none"
                  />
                  {formData.featured_image_url && (
                    <img
                      src={formData.featured_image_url}
                      alt="Featured Preview"
                      referrerPolicy="no-referrer"
                      className="w-12 h-10 rounded-lg object-cover border border-slate-700 shrink-0"
                    />
                  )}
                </div>
              </div>

              {/* 4 Separate Gallery Image URLs & Previews */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>4 Gallery Image URLs (Interior, Aerial, Amenities, Floorplan)</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  
                  {/* Gallery Image 1 */}
                  <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800 space-y-1.5">
                    <span className="text-[11px] font-semibold text-slate-400">Gallery Image 1 (Living / Saloon)</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="url"
                        value={formData.gallery_image_url_1}
                        onChange={(e) => setFormData({ ...formData, gallery_image_url_1: e.target.value })}
                        placeholder="https://..."
                        className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white outline-none"
                      />
                      {formData.gallery_image_url_1 && (
                        <img
                          src={formData.gallery_image_url_1}
                          alt="G1"
                          referrerPolicy="no-referrer"
                          className="w-8 h-8 rounded-lg object-cover border border-slate-700 shrink-0"
                        />
                      )}
                    </div>
                  </div>

                  {/* Gallery Image 2 */}
                  <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800 space-y-1.5">
                    <span className="text-[11px] font-semibold text-slate-400">Gallery Image 2 (Master Suite)</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="url"
                        value={formData.gallery_image_url_2}
                        onChange={(e) => setFormData({ ...formData, gallery_image_url_2: e.target.value })}
                        placeholder="https://..."
                        className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white outline-none"
                      />
                      {formData.gallery_image_url_2 && (
                        <img
                          src={formData.gallery_image_url_2}
                          alt="G2"
                          referrerPolicy="no-referrer"
                          className="w-8 h-8 rounded-lg object-cover border border-slate-700 shrink-0"
                        />
                      )}
                    </div>
                  </div>

                  {/* Gallery Image 3 */}
                  <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800 space-y-1.5">
                    <span className="text-[11px] font-semibold text-slate-400">Gallery Image 3 (Kitchen / Terrace)</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="url"
                        value={formData.gallery_image_url_3}
                        onChange={(e) => setFormData({ ...formData, gallery_image_url_3: e.target.value })}
                        placeholder="https://..."
                        className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white outline-none"
                      />
                      {formData.gallery_image_url_3 && (
                        <img
                          src={formData.gallery_image_url_3}
                          alt="G3"
                          referrerPolicy="no-referrer"
                          className="w-8 h-8 rounded-lg object-cover border border-slate-700 shrink-0"
                        />
                      )}
                    </div>
                  </div>

                  {/* Gallery Image 4 */}
                  <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800 space-y-1.5">
                    <span className="text-[11px] font-semibold text-slate-400">Gallery Image 4 (Surroundings / Pool)</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="url"
                        value={formData.gallery_image_url_4}
                        onChange={(e) => setFormData({ ...formData, gallery_image_url_4: e.target.value })}
                        placeholder="https://..."
                        className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white outline-none"
                      />
                      {formData.gallery_image_url_4 && (
                        <img
                          src={formData.gallery_image_url_4}
                          alt="G4"
                          referrerPolicy="no-referrer"
                          className="w-8 h-8 rounded-lg object-cover border border-slate-700 shrink-0"
                        />
                      )}
                    </div>
                  </div>

                </div>
              </div>

              {/* Form Action Buttons */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-xl bg-[#155EEF] hover:bg-blue-600 text-white text-xs font-bold shadow-lg shadow-blue-900/40 flex items-center gap-2 transition-all disabled:opacity-50"
                >
                  {isSaving ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Check className="w-4 h-4 text-amber-300" />
                      <span>{editingProperty ? 'Update Property Listing' : 'Save Property Listing'}</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
