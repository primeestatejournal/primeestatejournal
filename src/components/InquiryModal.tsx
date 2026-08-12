import React, { useState } from 'react';
import { InquiryFormData } from '../types';
import { submitSupabaseInquiry } from '../lib/supabase';
import { X, ShieldCheck, Send, CheckCircle2, Phone, Mail, Building2, MapPin } from 'lucide-react';

interface InquiryModalProps {
  onClose: () => void;
  onSubmit: (data: InquiryFormData) => void;
  preselectedTitle?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  onClose,
  onSubmit,
  preselectedTitle
}) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: '',
    email: '',
    phone: '',
    investorType: 'Private Buyer',
    preferredContact: 'Email',
    message: preselectedTitle 
      ? `I am requesting title deed verification and investment memorandum for "${preselectedTitle}".`
      : 'I am seeking guidance on acquiring prime land parcels and apartment buildings. Please contact me with off-market inventory.',
    requestTitleDocument: true,
    requestVirtualTour: false
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await submitSupabaseInquiry(formData);
    onSubmit(formData);
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div 
        className="bg-white rounded-2xl max-w-xl w-full flex flex-col overflow-hidden shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:px-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div>
            <h2 className="font-editorial text-xl sm:text-2xl font-bold">Private Real Estate Advisory</h2>
            <p className="text-xs text-slate-400">Prime Estate Journal • Direct Acquisitions Desk</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto animate-bounce" />
              <h3 className="font-editorial text-2xl font-bold text-slate-900">Advisory Request Registered</h3>
              <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
                Thank you. Our Senior Portfolio Manager will reach out within 2 hours with tailored land title documents and off-market apartment block memoranda.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors"
              >
                Return to Holdings Marketplace
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="text-[11px] text-slate-700">
                  <span className="font-bold text-slate-900 block">Strict Confidentiality Guarantee</span>
                  All buyer inquiries, proof of funds, and title requests remain strictly confidential.
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lord Edward Sterling"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="sterling@familyoffice.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (415) 889-1092"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Investor Category</label>
                  <select
                    value={formData.investorType}
                    onChange={(e) => setFormData({ ...formData, investorType: e.target.value as any })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                  >
                    <option value="Private Buyer">Private High Net Worth Buyer</option>
                    <option value="Institutional Investor">Institutional Real Estate Fund</option>
                    <option value="Family Office">Family Office Asset Manager</option>
                    <option value="Developer">Commercial / Residential Developer</option>
                    <option value="Broker">Authorized Mandate / Broker</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Investment Criteria &amp; Target Locations</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div className="space-y-2 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.requestTitleDocument}
                    onChange={(e) => setFormData({ ...formData, requestTitleDocument: e.target.checked })}
                    className="w-4 h-4 rounded text-slate-900 accent-slate-900"
                  />
                  <span className="text-slate-800 font-medium">Include Title Deed Audit &amp; C-of-O copy</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-amber-400" />
                <span>Submit Confidential Advisory Request</span>
              </button>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};
