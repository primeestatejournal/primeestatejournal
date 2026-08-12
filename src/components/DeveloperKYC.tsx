import React, { useState } from 'react';
import { Building2, ShieldCheck, CheckCircle2, FileText, Lock, ArrowRight, UserCheck, Award, Sparkles } from 'lucide-react';

export const DeveloperKYC: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    rcNumber: '',
    contactPerson: '',
    email: '',
    phone: '',
    officeAddress: '',
    titleType: 'Certificate of Occupancy (C of O)',
    pastProjectsCount: '1-3 Completed Projects',
    acceptEscrowTerms: true,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-10 bg-slate-50 text-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Banner */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-[#155EEF] px-3.5 py-1.5 rounded-full text-xs font-bold mb-3 shadow-sm">
            <Building2 className="w-4 h-4 text-[#155EEF]" />
            PrimeEstateJournal Developer Partner Accreditation Program
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-sans tracking-tight">
            List Your Verified Developments for Diaspora & Institutional Buyers
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
            Gain instant access to over 350+ verified diaspora buyers in the UK, US, Canada, and Europe. All developer partners undergo rigorous legal title auditing and milestone escrow compliance.
          </p>
        </div>

        {/* 3 Accreditation Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#155EEF] border border-blue-200 flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-[#155EEF]" />
            </div>
            <h3 className="font-bold text-slate-900 text-base font-sans">CAC & Corporate KYC</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Full verification of Corporate Affairs Commission (CAC) incorporation status, tax identification (TIN), and director identity records.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="font-bold text-slate-900 text-base font-sans">100% Registry Title Audit</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Independent title searches at Alausa Ikeja, AGIS Abuja, or Rivers State Ministry to guarantee unencumbered registered title.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center">
              <Lock className="w-5 h-5 text-amber-600" />
            </div>
            <h3 className="font-bold text-slate-900 text-base font-sans">Milestone Escrow Integration</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Buyer funds are disbursed predictably at agreed engineering milestones (foundation, carcass, roofing, handover) upon site inspection.
            </p>
          </div>

        </div>

        {/* Application Form Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-lg max-w-4xl mx-auto">
          <div className="border-b border-slate-200 pb-6 mb-6 flex items-center justify-between">
            <div>
              <span className="bg-[#155EEF] text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded tracking-wider">
                Developer Portal
              </span>
              <h2 className="text-2xl font-bold text-slate-900 font-sans mt-2">
                Developer Partner Accreditation Application
              </h2>
            </div>
            <Award className="w-8 h-8 text-amber-500 hidden sm:block" />
          </div>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-sans">Application Submitted Successfully</h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto font-medium leading-relaxed">
                Thank you, <strong>{formData.companyName}</strong>. Our Legal & Developer Vetting Desk in Lekki Phase 1, Lagos will review your submission and contact you within 24 business hours to complete land charting.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="bg-[#155EEF] text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-blue-600 transition-all"
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Company / Developer Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g. Sujimoto Construction / Primewaterview Ltd"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#155EEF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">CAC Registration Number (RC) *</label>
                  <input
                    type="text"
                    required
                    value={formData.rcNumber}
                    onChange={(e) => setFormData({ ...formData, rcNumber: e.target.value })}
                    placeholder="e.g. RC-1829402"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#155EEF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Lead Contact Person & Designation *</label>
                  <input
                    type="text"
                    required
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    placeholder="e.g. Engr. Olabode Thomas (Managing Director)"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#155EEF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Official Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. director@devcorp.ng"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#155EEF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +234 803 000 1234"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#155EEF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Track Record / Projects Completed</label>
                  <select
                    value={formData.pastProjectsCount}
                    onChange={(e) => setFormData({ ...formData, pastProjectsCount: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#155EEF]"
                  >
                    <option value="1-3 Completed Projects">1-3 Completed Projects</option>
                    <option value="4-10 Completed Projects">4-10 Completed Projects</option>
                    <option value="10+ Major Estate Developments">10+ Major Estate Developments</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Corporate Head Office Address *</label>
                <input
                  type="text"
                  required
                  value={formData.officeAddress}
                  onChange={(e) => setFormData({ ...formData, officeAddress: e.target.value })}
                  placeholder="e.g. Plot 12, Admiralty Way, Lekki Phase 1, Lagos State"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#155EEF]"
                />
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-2">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.acceptEscrowTerms}
                    onChange={(e) => setFormData({ ...formData, acceptEscrowTerms: e.target.checked })}
                    className="w-4 h-4 rounded text-[#155EEF] border-slate-300 focus:ring-[#155EEF] mt-0.5"
                  />
                  <span className="text-slate-700 font-medium leading-relaxed">
                    We agree to allow PrimeEstateJournal's legal search team to independently audit title documents at State Lands Registries and agree to milestone escrow disbursements for diaspora transactions.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#155EEF] hover:bg-blue-600 text-white font-bold text-sm py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                Submit Accreditation Application
              </button>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
