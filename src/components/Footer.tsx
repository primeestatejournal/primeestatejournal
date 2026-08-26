import React from 'react';
import { ShieldCheck, Globe, Building2, Calculator, KeyRound, Phone, Mail, MapPin, Lock, FileText, ArrowUpRight, HelpCircle } from 'lucide-react';
import { NavigationTab } from '../types';

interface FooterProps {
  setActiveTab: (tab: NavigationTab) => void;
  onRequestVerification: () => void;
  onOpenAIConsultant: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setActiveTab,
  onRequestVerification,
  onOpenAIConsultant,
}) => {
  return (
    <footer className="bg-white text-slate-800 border-t border-slate-200 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-200">
          
          {/* Col 1 & 2: Brand Manifesto */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#155EEF] to-blue-700 border border-amber-400 flex items-center justify-center shadow-md">
                <ShieldCheck className="w-6 h-6 text-amber-300" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-slate-900 font-sans">
                primeestatejournal
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed max-w-sm font-medium">
              <strong className="text-slate-900">Buy Nigerian Property With Confidence.</strong><br />
              Helping Nigerians living at home and in the diaspora safely discover, verify, purchase, invest in, and remotely manage Nigerian real estate without legal risk or middleman fraud.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="bg-amber-50 text-amber-900 border border-amber-200 px-3 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1.5 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                Independent Due Diligence
              </span>
              <span className="bg-blue-50 text-blue-800 border border-blue-200 px-3 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1.5 shadow-sm">
                <Lock className="w-3.5 h-3.5 text-blue-600" />
                Escrow Safeguard
              </span>
            </div>
          </div>

          {/* Col 3: SaaS Core Modules */}
          <div>
            <h4 className="text-xs font-bold text-[#155EEF] uppercase tracking-wider mb-3">Platform Modules</h4>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li>
                <button onClick={() => setActiveTab('marketplace')} className="hover:text-slate-900 transition-colors">
                  Verified Property Marketplace
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('verification_hub')} className="hover:text-slate-900 transition-colors">
                  Independent Verification Hub
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('diaspora_gateway')} className="hover:text-slate-900 transition-colors">
                  Diaspora Gateway & Escrow
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('investment_calc')} className="hover:text-slate-900 transition-colors">
                  ROI & Yield Calculator
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('property_mgmt')} className="hover:text-slate-900 transition-colors">
                  Remote Property Management
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('client_portal')} className="hover:text-slate-900 transition-colors">
                  Client Portal & Saved List
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('blog')} className="hover:text-slate-900 transition-colors font-bold text-amber-700">
                  Market Intelligence Journal
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('developer_kyc')} className="hover:text-slate-900 transition-colors font-bold text-[#155EEF]">
                  Developer Accreditation Portal
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('help_faq')} className="hover:text-slate-900 transition-colors">
                  Help Center & Diaspora FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal Title Support */}
          <div>
            <h4 className="text-xs font-bold text-[#155EEF] uppercase tracking-wider mb-3">Legal Title Audit</h4>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li>
                <button onClick={onRequestVerification} className="hover:text-slate-900 transition-colors flex items-center gap-1">
                  <span>Registry Search Request</span>
                  <ArrowUpRight className="w-3 h-3 text-[#155EEF]" />
                </button>
              </li>
              <li>
                <button onClick={onOpenAIConsultant} className="hover:text-slate-900 transition-colors flex items-center gap-1">
                  <span>AI Legal Title Consultant</span>
                  <ArrowUpRight className="w-3 h-3 text-[#155EEF]" />
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('title_guide')} className="hover:text-slate-900 transition-colors text-left">
                  C of O Search (Alausa & AGIS)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('title_guide')} className="hover:text-slate-900 transition-colors text-left">
                  Governor's Consent Registration
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('title_guide')} className="hover:text-slate-900 transition-colors text-left">
                  Excision Gazette Charting
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('title_guide')} className="hover:text-slate-900 transition-colors text-left">
                  Milestone Escrow Contracts
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Offices */}
          <div>
            <h4 className="text-xs font-bold text-[#155EEF] uppercase tracking-wider mb-3">Offices</h4>
            <div className="space-y-2.5 text-xs text-slate-600">
              <div>
                <p className="font-bold text-slate-900">Lagos HQ (Nigeria)</p>
                <p className="text-[11px] text-slate-500 font-medium">Freedom Way, Lekki Phase 1, Lagos</p>
                <p className="text-[11px] text-slate-700 font-semibold mt-0.5">09039215553</p>
              </div>

              <div>
                <p className="font-bold text-slate-900">Abuja Bureau (Nigeria)</p>
                <p className="text-[11px] text-slate-500 font-medium">Maitama District, Abuja FCT</p>
                <p className="text-[11px] text-slate-700 font-semibold mt-0.5">09033142485</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 border-t border-slate-100 mt-6">
          <div className="flex flex-wrap items-center gap-4 font-medium">
            <p>© {new Date().getFullYear()} PrimeEstateJournal Ltd. All rights reserved.</p>
            <span>•</span>
            <button onClick={() => setActiveTab('terms_privacy')} className="hover:text-slate-900 transition-colors">
              Terms & Escrow Policy
            </button>
            <span>•</span>
            <button onClick={() => setActiveTab('developer_kyc')} className="hover:text-slate-900 transition-colors">
              Developer Vetting
            </button>
            <span>•</span>
            <button onClick={() => setActiveTab('help_faq')} className="hover:text-slate-900 transition-colors">
              Help Desk & FAQ
            </button>
          </div>

          <p className="text-[11px] text-center md:text-right max-w-xl font-medium">
            PrimeEstateJournal performs independent due diligence, title searches at State Lands Registries, and surveyor general charting. Property investments are subject to legal verification.
          </p>
        </div>

      </div>
    </footer>
  );
};
