import React, { useState } from 'react';
import { ShieldCheck, FileText, CheckCircle2, Search, ArrowRight, Building2, MapPin, Download, Lock, HelpCircle, ExternalLink } from 'lucide-react';
import { CurrencyCode } from '../types';

interface TitleGuideProps {
  onRequestVerification: () => void;
  onOpenAIConsultant: () => void;
}

export const TitleGuide: React.FC<TitleGuideProps> = ({
  onRequestVerification,
  onOpenAIConsultant,
}) => {
  const [selectedTopic, setSelectedTopic] = useState<'co_o' | 'gov_consent' | 'excision' | 'escrow'>('co_o');

  return (
    <div className="py-10 bg-slate-50 text-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-300 text-amber-900 px-3.5 py-1.5 rounded-full text-xs font-bold mb-3 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            PrimeEstateJournal Title & Registry Verification Guide
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-sans tracking-tight">
            Understanding Nigerian Real Estate Title Documents
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
            Learn how title verification works across Lagos State Lands Registry (Alausa Ikeja), Abuja AGIS, and Rivers State Ministry of Lands before transferring funds.
          </p>
        </div>

        {/* Topic Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <button
            onClick={() => setSelectedTopic('co_o')}
            className={`p-4 rounded-2xl border text-left transition-all ${
              selectedTopic === 'co_o'
                ? 'bg-[#155EEF] text-white border-[#155EEF] shadow-md'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <FileText className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-400 text-slate-900">
                Primary Title
              </span>
            </div>
            <h3 className="font-bold text-sm font-sans">Certificate of Occupancy</h3>
            <p className="text-[11px] opacity-80 mt-1 line-clamp-2">State or Federal 99-year land lease grant from Governor/Minister.</p>
          </button>

          <button
            onClick={() => setSelectedTopic('gov_consent')}
            className={`p-4 rounded-2xl border text-left transition-all ${
              selectedTopic === 'gov_consent'
                ? 'bg-[#155EEF] text-white border-[#155EEF] shadow-md'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                Resale Deed
              </span>
            </div>
            <h3 className="font-bold text-sm font-sans">Governor's Consent</h3>
            <p className="text-[11px] opacity-80 mt-1 line-clamp-2">Mandatory legal approval required when purchasing resale properties.</p>
          </button>

          <button
            onClick={() => setSelectedTopic('excision')}
            className={`p-4 rounded-2xl border text-left transition-all ${
              selectedTopic === 'excision'
                ? 'bg-[#155EEF] text-white border-[#155EEF] shadow-md'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <MapPin className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                Survey Chart
              </span>
            </div>
            <h3 className="font-bold text-sm font-sans">Excision & Gazette</h3>
            <p className="text-[11px] opacity-80 mt-1 line-clamp-2">Government release of ancestral village lands to private owners.</p>
          </button>

          <button
            onClick={() => setSelectedTopic('escrow')}
            className={`p-4 rounded-2xl border text-left transition-all ${
              selectedTopic === 'escrow'
                ? 'bg-[#155EEF] text-white border-[#155EEF] shadow-md'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <Lock className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                Fund Security
              </span>
            </div>
            <h3 className="font-bold text-sm font-sans">Milestone Escrow</h3>
            <p className="text-[11px] opacity-80 mt-1 line-clamp-2">Protected disbursement framework tied to physical site inspections.</p>
          </button>
        </div>

        {/* Detailed Content Panel */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-md mb-12">
          {selectedTopic === 'co_o' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <span className="text-xs font-bold text-[#155EEF] uppercase tracking-wider">
                  Land Use Act 1978 Standard
                </span>
                <h2 className="text-2xl font-bold text-slate-900 font-sans mt-1">
                  Certificate of Occupancy (C of O) Deep Dive
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Issued under the Land Use Act by state governors (or the FCT Minister in Abuja), granting a 99-year statutory right of occupancy.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2">
                  <p className="font-bold text-slate-900 text-sm">Where We Search</p>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    Lagos Lands Registry at Alausa, Ikeja (Book of Charters); Abuja Geographic Information Systems (AGIS); or Rivers State Ministry of Lands, Port Harcourt.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2">
                  <p className="font-bold text-slate-900 text-sm">What We Verify</p>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    True registered owner name, exact volume and page number, active encumbrances or bank mortgages, and government acquisition status.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2">
                  <p className="font-bold text-slate-900 text-sm">Red Flags Flagged</p>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    Forged signature of Lands Commissioner, unpaid land use charge backlog, double allocation by traditional families, or land earmarked for public roads.
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="font-bold text-slate-900 text-sm">Have a C of O document to verify before buying?</p>
                  <p className="text-xs text-slate-600 mt-0.5">Submit your property document details for an independent Lands Registry audit.</p>
                </div>
                <button
                  onClick={onRequestVerification}
                  className="bg-[#155EEF] hover:bg-blue-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shrink-0"
                >
                  Start Registry Search
                </button>
              </div>
            </div>
          )}

          {selectedTopic === 'gov_consent' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <span className="text-xs font-bold text-[#155EEF] uppercase tracking-wider">
                  Resale Property Legal Requirements
                </span>
                <h2 className="text-2xl font-bold text-slate-900 font-sans mt-1">
                  Governor's Consent Procedure
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Every legal transfer or sale of a land or home with an existing C of O requires the Governor's formal consent to perfect title.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-slate-200 p-5 rounded-xl space-y-3">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Step-by-Step Perfection Workflow
                  </h3>
                  <ol className="list-decimal list-inside space-y-2 text-xs text-slate-600 font-medium">
                    <li>Execution of Deed of Assignment between Seller and Buyer.</li>
                    <li>Submission of Form 1C to State Ministry of Lands.</li>
                    <li>Physical inspection by Ministry of Physical Planning & Urban Development.</li>
                    <li>Assessment of Capital Gains Tax, Stamp Duty, and Consent Fee.</li>
                    <li>Endorsement of Consent by Governor or Attorney General.</li>
                  </ol>
                </div>

                <div className="border border-slate-200 p-5 rounded-xl space-y-3">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#155EEF]" />
                    How PrimeEstateJournal Protects You
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    We ensure that all perfection fees are held in escrow and paid directly to official state revenue accounts, avoiding middleman diversion or forged Governor's Consent receipts.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={onOpenAIConsultant}
                      className="text-xs text-[#155EEF] font-bold hover:underline flex items-center gap-1"
                    >
                      <span>Ask AI Legal Advisor about Governor's Consent fees</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTopic === 'excision' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <span className="text-xs font-bold text-[#155EEF] uppercase tracking-wider">
                  Traditional Land Acquisition Safety
                </span>
                <h2 className="text-2xl font-bold text-slate-900 font-sans mt-1">
                  Excision & Gazette Charting
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Excision is the official process where state government releases land back to indigenous family communities and publishes it in the official Gazette.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2">
                  <p className="font-bold text-slate-900 text-sm">Official Gazette</p>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    An official government journal detailing excised parcel boundaries, beacon numbers, village name, and acreage.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2">
                  <p className="font-bold text-slate-900 text-sm">Surveyor General Charting</p>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    Our team takes the precise GPS coordinates of the plot to the Surveyor General's office to confirm the plot falls squarely within excised land.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2">
                  <p className="font-bold text-slate-900 text-sm">Global Acquisition Risk</p>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    If land is under "Global Acquisition" without excision, the state can demolish structures at any time without compensation.
                  </p>
                </div>
              </div>
            </div>
          )}

          {selectedTopic === 'escrow' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <span className="text-xs font-bold text-[#155EEF] uppercase tracking-wider">
                  Diaspora & Local Payment Security
                </span>
                <h2 className="text-2xl font-bold text-slate-900 font-sans mt-1">
                  Milestone Escrow Contract Protocol
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Protect your hard-earned capital by holding funds in escrow until verified milestones are completed on-site.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <span className="text-xs font-bold text-[#155EEF]">Milestone 1</span>
                  <p className="font-bold text-slate-900 text-sm">Registry Audit (10%)</p>
                  <p className="text-xs text-slate-600 font-medium">Released upon verified clean registry title report.</p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <span className="text-xs font-bold text-[#155EEF]">Milestone 2</span>
                  <p className="font-bold text-slate-900 text-sm">Site Demarcation (30%)</p>
                  <p className="text-xs text-slate-600 font-medium">Released upon registered survey beaconing and fencing.</p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <span className="text-xs font-bold text-[#155EEF]">Milestone 3</span>
                  <p className="font-bold text-slate-900 text-sm">Deed Execution (30%)</p>
                  <p className="text-xs text-slate-600 font-medium">Released upon signing of Deed of Assignment & PoA.</p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <span className="text-xs font-bold text-[#155EEF]">Milestone 4</span>
                  <p className="font-bold text-slate-900 text-sm">Handover & Perfection (30%)</p>
                  <p className="text-xs text-slate-600 font-medium">Released upon keys delivery or Governor's Consent filing.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* State Lands Registries Contact Reference */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-md">
          <h3 className="text-lg font-bold text-slate-900 font-sans mb-4 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#155EEF]" />
            Key Nigerian Lands Registry Offices We Operate In
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-blue-700 uppercase">Lagos State</span>
              <p className="font-bold text-slate-900 text-sm">Lagos Lands Registry, Alausa</p>
              <p className="text-xs text-slate-600 font-medium">Block 13 & 14, Secretariat Complex, Ikeja, Lagos State.</p>
              <p className="text-[11px] text-slate-500 font-semibold">Searches: C of O, Governor's Consent, Gazette, Court Injunctions.</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-amber-700 uppercase">Abuja FCT</span>
              <p className="font-bold text-slate-900 text-sm">Abuja Geographic Info Systems (AGIS)</p>
              <p className="text-xs text-slate-600 font-medium">4 Peace Drive, Off Independence Avenue, Central Area, Abuja.</p>
              <p className="text-[11px] text-slate-500 font-semibold">Searches: FCT C of O, R-of-O, Minister Approvals, Land Use Charges.</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-emerald-700 uppercase">Rivers State</span>
              <p className="font-bold text-slate-900 text-sm">Rivers Ministry of Lands & Housing</p>
              <p className="text-xs text-slate-600 font-medium">State Secretariat Complex, Port Harcourt, Rivers State.</p>
              <p className="text-[11px] text-slate-500 font-semibold">Searches: State C of O, Greater Port Harcourt City Masterplan.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
