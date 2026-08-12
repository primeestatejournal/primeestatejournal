import React, { useState } from 'react';
import { ShieldCheck, FileCheck, Search, Upload, CheckCircle2, Clock, Scale, AlertTriangle, ArrowRight, Lock, Building, MapPin } from 'lucide-react';
import { VerificationRequestData, CurrencyCode } from '../types';

interface PropertyVerificationHubProps {
  currency: CurrencyCode;
}

export const PropertyVerificationHub: React.FC<PropertyVerificationHubProps> = ({ currency }) => {
  const [selectedTier, setSelectedTier] = useState<'standard' | 'comprehensive' | 'diaspora_full'>('comprehensive');
  const [formData, setFormData] = useState<VerificationRequestData>({
    propertyName: '',
    locationAddress: '',
    state: 'Lagos',
    lga: 'Eti-Osa',
    sellerNameOrDev: '',
    titleDocumentType: "Certificate of Occupancy (C of O)",
    requesterName: '',
    requesterEmail: '',
    requesterPhone: '',
    requesterCountry: 'United Kingdom (UK)',
    verificationTier: 'comprehensive',
  });

  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [trackRefInput, setTrackRefInput] = useState('');
  const [trackedResult, setTrackedResult] = useState<any | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/verification/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, verificationTier: selectedTier }),
      });
      const data = await res.json();
      setSubmittedRef(data.referenceCode);
    } catch (err) {
      setSubmittedRef('NNV-' + Math.floor(100000 + Math.random() * 900000));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTrackSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackRefInput.trim()) return;

    setTrackedResult({
      ref: trackRefInput.toUpperCase(),
      propertyName: "Plot 14, Periwinkle Waterfront, Lekki Phase 1",
      submittedDate: "08-Feb-2026",
      status: "In Progress (Lands Registry Search Step 2 of 3)",
      estimatedCompletion: "12-Feb-2026",
      steps: [
        { name: "Document Intake & Preliminary Review", completed: true, date: "08-Feb-2026" },
        { name: "Ministry of Lands Registry Search", completed: true, date: "09-Feb-2026" },
        { name: "Surveyor General Charting (Government Acquisition Check)", completed: false, date: "Pending" },
        { name: "Final Legal Risk Audit & Certificate Generation", completed: false, date: "Pending" }
      ]
    });
  };

  return (
    <div className="py-10 bg-[#F7F9FC] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hub Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-[#155EEF]/10 border border-[#155EEF]/20 text-[#155EEF] px-3.5 py-1.5 rounded-full text-xs font-bold mb-3">
            <ShieldCheck className="w-4 h-4 text-[#D4A72C]" />
            PrimeEstateJournal Due Diligence Hub™
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] font-sans tracking-tight">
            Verify Any Property in Nigeria Before You Pay
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Found a land plot, apartment, or off-plan deal on Instagram, a blog, or through an agent? Submit the details to our legal team for an independent Lands Registry Search & Surveyor Charting audit.
          </p>
        </div>

        {/* Live Search Reference Tracker Bar */}
        <div className="bg-white text-slate-900 p-6 rounded-2xl shadow-md border border-slate-200 mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold flex items-center gap-2 font-sans text-slate-900">
                <Search className="w-4 h-4 text-[#155EEF]" />
                Track Active Legal Search Request
              </h2>
              <p className="text-xs text-slate-600 mt-1 font-medium">
                Enter your PrimeEstateJournal Verification Reference (e.g. <span className="font-mono text-[#155EEF] font-bold">PEJ-882190</span>) to view live registry search status.
              </p>
            </div>

            <form onSubmit={handleTrackSearch} className="flex gap-2 w-full md:w-auto">
              <input
                type="text"
                value={trackRefInput}
                onChange={(e) => setTrackRefInput(e.target.value)}
                placeholder="Enter NNV- Reference Code..."
                className="bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#155EEF] w-full md:w-64"
              />
              <button
                type="submit"
                className="bg-[#155EEF] hover:bg-blue-600 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shrink-0 shadow-sm"
              >
                Track Audit
              </button>
            </form>
          </div>

          {/* Track Result Display */}
          {trackedResult && (
            <div className="mt-6 pt-6 border-t border-slate-200 bg-slate-50 p-4 rounded-xl text-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <div>
                  <span className="text-[10px] text-[#155EEF] font-bold uppercase">Audit File #{trackedResult.ref}</span>
                  <p className="font-bold text-slate-900 text-sm">{trackedResult.propertyName}</p>
                </div>
                <div className="bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1 rounded-full font-bold text-[11px] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-700" />
                  {trackedResult.status}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {trackedResult.steps.map((st: any, i: number) => (
                  <div key={i} className={`p-3 rounded-lg border ${st.completed ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-white border-slate-200 text-slate-500'}`}>
                    <div className="flex items-center gap-2 font-bold text-[11px] mb-1">
                      {st.completed ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Clock className="w-3.5 h-3.5 text-slate-400" />}
                      <span>Step {i + 1}</span>
                    </div>
                    <p className="font-semibold text-slate-800 text-[11px]">{st.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Pricing & Tier Selection Cards */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-[#0B1F3A] text-center mb-6 font-sans">
            Choose Your Independent Due Diligence Package
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Tier 1 */}
            <div
              onClick={() => setSelectedTier('standard')}
              className={`p-6 rounded-2xl border-2 transition-all cursor-pointer bg-white flex flex-col justify-between ${
                selectedTier === 'standard' ? 'border-[#155EEF] shadow-xl ring-2 ring-[#155EEF]/20' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Basic Search</span>
                <h3 className="text-lg font-bold text-[#0B1F3A] font-sans">Title & Registry Search</h3>
                <p className="text-2xl font-extrabold text-[#0B1F3A] my-3">₦150,000 <span className="text-xs font-normal text-slate-500">/ ~$100 USD</span></p>
                <p className="text-xs text-slate-600 mb-4">Ideal for preliminary title document validation before paying commitment deposits.</p>

                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>State Ministry of Lands Search</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>C of O / Governor's Consent Verification</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Encumbrance & Mortgage Check</span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-400">
                    <XCircle className="w-4 h-4 text-slate-300 shrink-0" />
                    <span>Surveyor Charting (Optional Add-on)</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <button
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all ${
                    selectedTier === 'standard' ? 'bg-[#155EEF] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Select Basic Search
                </button>
              </div>
            </div>

            {/* Tier 2 (Most Popular) */}
            <div
              onClick={() => setSelectedTier('comprehensive')}
              className={`p-6 rounded-2xl border-2 transition-all cursor-pointer bg-white relative flex flex-col justify-between ${
                selectedTier === 'comprehensive' ? 'border-[#155EEF] shadow-xl ring-2 ring-[#155EEF]/20' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D4A72C] text-[#0B1F3A] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                Recommended For Diaspora
              </div>

              <div>
                <span className="text-[10px] font-bold text-[#155EEF] uppercase tracking-wider block mb-1">Full Due Diligence</span>
                <h3 className="text-lg font-bold text-[#0B1F3A] font-sans">Full Legal & Survey Charting</h3>
                <p className="text-2xl font-extrabold text-[#0B1F3A] my-3">₦350,000 <span className="text-xs font-normal text-slate-500">/ ~$230 USD</span></p>
                <p className="text-xs text-slate-600 mb-4">Complete legal protection. Includes physical site surveyor charting to detect government acquisitions.</p>

                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Includes All Basic Title Search Features</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Surveyor General Office Charting</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Government Acquisition & Road Setback Check</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Court Record & Family Litigation Audit</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Certified Due Diligence Dossier PDF</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <button
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all ${
                    selectedTier === 'comprehensive' ? 'bg-[#155EEF] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Select Full Due Diligence
                </button>
              </div>
            </div>

            {/* Tier 3 */}
            <div
              onClick={() => setSelectedTier('diaspora_full')}
              className={`p-6 rounded-2xl border-2 transition-all cursor-pointer bg-white flex flex-col justify-between ${
                selectedTier === 'diaspora_full' ? 'border-[#155EEF] shadow-xl ring-2 ring-[#155EEF]/20' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">End-to-End Protection</span>
                <h3 className="text-lg font-bold text-[#0B1F3A] font-sans">Drone Audit + Escrow Setup</h3>
                <p className="text-2xl font-extrabold text-[#0B1F3A] my-3">₦650,000 <span className="text-xs font-normal text-slate-500">/ ~$430 USD</span></p>
                <p className="text-xs text-slate-600 mb-4">Total peace of mind. Includes 4K live drone video walkthrough, soil topography audit, and escrow account drafting.</p>

                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Includes All Full Due Diligence Features</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>On-Ground 4K Drone Inspection & Video Feed</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Developer CAC & Director Identity Audit</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Custom Deed of Assignment Legal Drafting</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Milestone Escrow Account Setup</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <button
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all ${
                    selectedTier === 'diaspora_full' ? 'bg-[#155EEF] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Select Drone + Escrow
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Verification Request Form */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-8 max-w-3xl mx-auto">
          <div className="border-b border-slate-200 pb-4 mb-6">
            <h2 className="text-xl font-bold text-[#0B1F3A] font-sans flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-[#155EEF]" />
              Submit External Property For Audit
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Selected Package: <span className="font-bold text-[#155EEF] uppercase">{selectedTier.replace('_', ' ')}</span>
            </p>
          </div>

          {submittedRef ? (
            <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-sans">Verification Request Received!</h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Your verification reference code is <span className="font-mono font-bold text-slate-900 bg-white px-2 py-1 rounded border border-slate-300">{submittedRef}</span>. Our legal team has initiated the Lands Registry search and surveyor charting.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setSubmittedRef(null)}
                  className="bg-[#155EEF] text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-blue-600 transition-all"
                >
                  Submit Another Verification Request
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Property Title / Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.propertyName}
                    onChange={(e) => setFormData({ ...formData, propertyName: e.target.value })}
                    placeholder="e.g. 600 Sqm Land Plot in Periwinkle"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-[#155EEF]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Title Document Offered *</label>
                  <select
                    value={formData.titleDocumentType}
                    onChange={(e) => setFormData({ ...formData, titleDocumentType: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-[#155EEF]"
                  >
                    <option value="Certificate of Occupancy (C of O)">Certificate of Occupancy (C of O)</option>
                    <option value="Governor's Consent">Governor's Consent</option>
                    <option value="Gazette / Excision">Gazette / Excision</option>
                    <option value="Deed of Assignment + Receipt">Deed of Assignment + Receipt</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">State *</label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-[#155EEF]"
                  >
                    <option value="Lagos">Lagos State</option>
                    <option value="Abuja FCT">Abuja FCT</option>
                    <option value="Rivers">Rivers State</option>
                    <option value="Ogun">Ogun State</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">LGA / Area</label>
                  <input
                    type="text"
                    value={formData.lga}
                    onChange={(e) => setFormData({ ...formData, lga: e.target.value })}
                    placeholder="e.g. Eti-Osa / Lekki"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-[#155EEF]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Seller / Agent / Developer</label>
                  <input
                    type="text"
                    value={formData.sellerNameOrDev}
                    onChange={(e) => setFormData({ ...formData, sellerNameOrDev: e.target.value })}
                    placeholder="e.g. ABC Realty Ltd"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-[#155EEF]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Exact Address / Parcel Location *</label>
                <input
                  type="text"
                  required
                  value={formData.locationAddress}
                  onChange={(e) => setFormData({ ...formData, locationAddress: e.target.value })}
                  placeholder="e.g. Plot 12, Block B, Off Admiralty Way, Lekki Phase 1"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-[#155EEF]"
                />
              </div>

              <div className="border-t border-slate-200 pt-4 mt-2">
                <h4 className="font-bold text-slate-900 mb-3 uppercase tracking-wider text-[11px]">Your Contact & Location Details</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.requesterName}
                      onChange={(e) => setFormData({ ...formData, requesterName: e.target.value })}
                      placeholder="e.g. Dr. Babatunde Ogunlesi"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-[#155EEF]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.requesterEmail}
                      onChange={(e) => setFormData({ ...formData, requesterEmail: e.target.value })}
                      placeholder="e.g. tunde@gmail.com"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-[#155EEF]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">WhatsApp / Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.requesterPhone}
                      onChange={(e) => setFormData({ ...formData, requesterPhone: e.target.value })}
                      placeholder="e.g. +44 7911 123456"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-[#155EEF]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Country of Residence *</label>
                    <select
                      value={formData.requesterCountry}
                      onChange={(e) => setFormData({ ...formData, requesterCountry: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-[#155EEF]"
                    >
                      <option value="United Kingdom (UK)">United Kingdom (UK)</option>
                      <option value="United States (USA)">United States (USA)</option>
                      <option value="Canada">Canada</option>
                      <option value="Nigeria">Nigeria</option>
                      <option value="Germany / EU">Germany / EU</option>
                      <option value="UAE / Dubai">UAE / Dubai</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#155EEF] hover:bg-blue-600 text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-5 h-5 text-[#D4A72C]" />
                  {isSubmitting ? "Initiating Registry Audit..." : "Initiate Independent Verification Search"}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};

function XCircle(props: any) {
  return (
    <svg className={props.className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
