import React from 'react';
import { ShieldCheck, Globe, Building2, Calculator, KeyRound, Phone, Mail, MapPin, Lock, FileText, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: 'marketplace' | 'verification_hub' | 'diaspora_gateway' | 'investment_calc' | 'property_mgmt' | 'client_portal') => void;
  onRequestVerification: () => void;
  onOpenAIConsultant: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setActiveTab,
  onRequestVerification,
  onOpenAIConsultant,
}) => {
  return (
    <footer className="bg-[#0B1F3A] text-white border-t border-[#1E3A5F] pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-[#1E3A5F]">
          
          {/* Col 1 & 2: Brand Manifesto */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#155EEF] to-[#0B1F3A] border border-[#D4A72C]/40 flex items-center justify-center shadow-md">
                <ShieldCheck className="w-6 h-6 text-[#D4A72C]" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white font-sans">
                primeestatejournal<span className="text-[#D4A72C]">.</span>
              </span>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed max-w-sm">
              <strong className="text-white">Buy Nigerian Property With Confidence.</strong><br />
              Helping Nigerians living at home and in the diaspora safely discover, verify, purchase, invest in, and remotely manage Nigerian real estate without legal risk or middleman fraud.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="bg-[#102A4E] text-[#D4A72C] border border-[#1E3A5F] px-3 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                Independent Due Diligence
              </span>
              <span className="bg-[#102A4E] text-blue-300 border border-[#1E3A5F] px-3 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                Escrow Safeguard
              </span>
            </div>
          </div>

          {/* Col 3: SaaS Core Modules */}
          <div>
            <h4 className="text-xs font-bold text-[#D4A72C] uppercase tracking-wider mb-3">Platform Modules</h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <button onClick={() => setActiveTab('marketplace')} className="hover:text-white transition-colors">
                  Verified Property Marketplace
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('verification_hub')} className="hover:text-white transition-colors">
                  Independent Verification Hub
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('diaspora_gateway')} className="hover:text-white transition-colors">
                  Diaspora Gateway & Escrow
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('investment_calc')} className="hover:text-white transition-colors">
                  ROI & Yield Calculator
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('property_mgmt')} className="hover:text-white transition-colors">
                  Remote Property Management
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('client_portal')} className="hover:text-white transition-colors">
                  Client Portal & Saved List
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal Title Support */}
          <div>
            <h4 className="text-xs font-bold text-[#D4A72C] uppercase tracking-wider mb-3">Legal Title Audit</h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <button onClick={onRequestVerification} className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Registry Search Request</span>
                  <ArrowUpRight className="w-3 h-3 text-[#155EEF]" />
                </button>
              </li>
              <li>
                <button onClick={onOpenAIConsultant} className="hover:text-white transition-colors flex items-center gap-1">
                  <span>AI Legal Title Consultant</span>
                  <ArrowUpRight className="w-3 h-3 text-[#155EEF]" />
                </button>
              </li>
              <li><span className="text-gray-400">C of O Search (Alausa & AGIS)</span></li>
              <li><span className="text-gray-400">Governor's Consent Registration</span></li>
              <li><span className="text-gray-400">Excision Gazette Charting</span></li>
              <li><span className="text-gray-400">Milestone Escrow Contracts</span></li>
            </ul>
          </div>

          {/* Col 5: Global Liaisons */}
          <div>
            <h4 className="text-xs font-bold text-[#D4A72C] uppercase tracking-wider mb-3">Global Offices</h4>
            <div className="space-y-2.5 text-xs text-gray-300">
              <div>
                <p className="font-bold text-white">Lagos HQ (Nigeria)</p>
                <p className="text-[11px] text-gray-400">Freedom Way, Lekki Phase 1, Lagos</p>
              </div>

              <div>
                <p className="font-bold text-white">Abuja Bureau (Nigeria)</p>
                <p className="text-[11px] text-gray-400">Maitama District, Abuja FCT</p>
              </div>

              <div>
                <p className="font-bold text-white">London Liaison Desk (UK)</p>
                <p className="text-[11px] text-gray-400">+44 20 7946 0912</p>
              </div>

              <div>
                <p className="font-bold text-white">Houston Liaison Desk (USA)</p>
                <p className="text-[11px] text-gray-400">+1 713 555 0192</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} PrimeEstateJournal Ltd. All rights reserved.</p>

          <p className="text-[11px] text-center md:text-right max-w-xl">
            PrimeEstateJournal performs independent due diligence, title searches at State Lands Registries, and surveyor general charting. Property investments are subject to legal verification.
          </p>
        </div>

      </div>
    </footer>
  );
};
