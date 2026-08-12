import React, { useState } from 'react';
import { ShieldCheck, Lock, FileText, CheckCircle2, AlertTriangle, ArrowRight, BookOpen } from 'lucide-react';

export const TermsPrivacy: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'escrow' | 'due_diligence' | 'privacy' | 'terms'>('escrow');

  return (
    <div className="py-10 bg-slate-50 text-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Banner */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 bg-slate-200 text-slate-800 px-3.5 py-1.5 rounded-full text-xs font-bold mb-3 shadow-sm">
            <Lock className="w-4 h-4 text-emerald-600" />
            PrimeEstateJournal Legal & Compliance Framework
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-sans tracking-tight">
            Terms of Service & Buyer Safeguard Policy
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
            Our legally binding commitment to independent due diligence, escrow protection, and transparent real estate transactions across Nigeria.
          </p>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-slate-200 no-scrollbar text-xs">
          <button
            onClick={() => setActiveSection('escrow')}
            className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeSection === 'escrow'
                ? 'bg-[#155EEF] text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Lock className="w-4 h-4 text-amber-400" />
            Milestone Escrow Policy
          </button>

          <button
            onClick={() => setActiveSection('due_diligence')}
            className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeSection === 'due_diligence'
                ? 'bg-[#155EEF] text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            Legal Due Diligence Guarantee
          </button>

          <button
            onClick={() => setActiveSection('privacy')}
            className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeSection === 'privacy'
                ? 'bg-[#155EEF] text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4 text-blue-400" />
            Diaspora Data Privacy
          </button>

          <button
            onClick={() => setActiveSection('terms')}
            className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeSection === 'terms'
                ? 'bg-[#155EEF] text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4 text-purple-400" />
            General Terms of Use
          </button>
        </div>

        {/* Content Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-md">
          {activeSection === 'escrow' && (
            <div className="space-y-6 text-slate-700 font-medium text-xs sm:text-sm leading-relaxed">
              <div className="border-b border-slate-200 pb-4">
                <span className="text-xs font-bold text-[#155EEF] uppercase tracking-wider">Clause 1.0</span>
                <h2 className="text-2xl font-bold text-slate-900 font-sans mt-1">
                  Milestone Escrow Safeguard Framework
                </h2>
              </div>

              <p>
                1.1 <strong>Escrow Holding:</strong> All transaction deposits and milestone payments submitted through PrimeEstateJournal are held in regulated trustee accounts managed in partnership with registered Nigerian commercial banks and licensed trustees.
              </p>

              <p>
                1.2 <strong>Milestone Release Condition:</strong> Funds are disbursed to property developers or vendors only when physical inspection benchmarks (foundation, roofing, Deed of Assignment signing, or Lands Registry C of O endorsement) are independently verified by PrimeEstateJournal's accredited surveyor and legal officer.
              </p>

              <p>
                1.3 <strong>Refund Protocol:</strong> If a property fails Lands Registry title search (e.g., encumbrance, government acquisition, or court dispute), 100% of escrowed principal funds are refunded to the buyer within 7 business days without deduction.
              </p>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs space-y-1">
                <p className="font-bold text-amber-900 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  Protection Against Middleman Markup & Family Disputes
                </p>
                <p className="text-slate-700 font-medium">
                  Direct payments to family members or unverified third-party brokers are strictly forbidden under the PrimeEstateJournal protocol to protect buyers against illegal resale or double allocation.
                </p>
              </div>
            </div>
          )}

          {activeSection === 'due_diligence' && (
            <div className="space-y-6 text-slate-700 font-medium text-xs sm:text-sm leading-relaxed">
              <div className="border-b border-slate-200 pb-4">
                <span className="text-xs font-bold text-[#155EEF] uppercase tracking-wider">Clause 2.0</span>
                <h2 className="text-2xl font-bold text-slate-900 font-sans mt-1">
                  Independent Legal Title Audit Guarantee
                </h2>
              </div>

              <p>
                2.1 <strong>Direct Registry Verification:</strong> PrimeEstateJournal's legal team conducts independent, physical searches at Alausa Ikeja (Lagos State Lands Registry), AGIS (Abuja Geographic Information Systems), and Rivers State Ministry of Lands.
              </p>

              <p>
                2.2 <strong>Legal Risk Scoring:</strong> Every verified listing receives a 0-100 Legal Risk Score based on title cleanliness, Gazette status, survey charting, and developer track record. Properties scoring below 90 are flagged or excluded from the marketplace.
              </p>

              <p>
                2.3 <strong>Power of Attorney (PoA):</strong> Where a diaspora buyer executes a Power of Attorney for deed registration, the PoA is restricted strictly to title perfection and deed endorsement on the buyer's explicit behalf.
              </p>
            </div>
          )}

          {activeSection === 'privacy' && (
            <div className="space-y-6 text-slate-700 font-medium text-xs sm:text-sm leading-relaxed">
              <div className="border-b border-slate-200 pb-4">
                <span className="text-xs font-bold text-[#155EEF] uppercase tracking-wider">Clause 3.0</span>
                <h2 className="text-2xl font-bold text-slate-900 font-sans mt-1">
                  Diaspora Data Privacy & Confidentiality Notice
                </h2>
              </div>

              <p>
                3.1 <strong>Identity Safeguards:</strong> Personal information, passport details, and financial bank verification numbers (BVN/NIN) collected during KYC are encrypted using 256-bit SSL protocols and used strictly for title perfection at Lands Registry.
              </p>

              <p>
                3.2 <strong>No Unsolicited Sharing:</strong> PrimeEstateJournal never shares buyer contact details, net worth estimates, or transaction volumes with external real estate agents or marketing brokers.
              </p>
            </div>
          )}

          {activeSection === 'terms' && (
            <div className="space-y-6 text-slate-700 font-medium text-xs sm:text-sm leading-relaxed">
              <div className="border-b border-slate-200 pb-4">
                <span className="text-xs font-bold text-[#155EEF] uppercase tracking-wider">Clause 4.0</span>
                <h2 className="text-2xl font-bold text-slate-900 font-sans mt-1">
                  General Platform Terms of Use
                </h2>
              </div>

              <p>
                4.1 <strong>Platform Usage:</strong> PrimeEstateJournal provides real estate listings, due diligence reports, escrow coordination, and remote management software. All information is provided for verified property acquisition purposes.
              </p>

              <p>
                4.2 <strong>Governing Law:</strong> All legal title perfection services and milestone escrow contracts are governed by the Laws of the Federal Republic of Nigeria, subject to arbitration in Lagos or Abuja FCT.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
