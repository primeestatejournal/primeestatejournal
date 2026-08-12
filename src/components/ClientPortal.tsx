import React, { useState } from 'react';
import { User, ShieldCheck, Bookmark, FileText, Calendar, Clock, Lock, CheckCircle2, Building, Download, ExternalLink, ArrowRight } from 'lucide-react';
import { Property, CurrencyCode } from '../types';
import { formatPriceByCurrency } from '../data/properties';

interface ClientPortalProps {
  savedProperties: Property[];
  currency: CurrencyCode;
  onSelectProperty: (property: Property) => void;
  onViewDossier: (property: Property) => void;
  onRemoveSaved: (propertyId: string) => void;
  onRequestVerification: () => void;
}

export const ClientPortal: React.FC<ClientPortalProps> = ({
  savedProperties,
  currency,
  onSelectProperty,
  onViewDossier,
  onRemoveSaved,
  onRequestVerification,
}) => {
  const [userRole, setUserRole] = useState<'diaspora' | 'local' | 'developer'>('diaspora');

  return (
    <div className="py-10 bg-[#F7F9FC] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* User Profile Header Banner */}
        <div className="bg-white text-slate-900 rounded-2xl p-6 sm:p-8 shadow-md border border-slate-200 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#155EEF] to-blue-700 border-2 border-amber-400 flex items-center justify-center font-bold text-xl text-white shadow-md">
                BO
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold font-sans text-slate-900">Dr. Babatunde Ogunlesi</h1>
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Identity Verified
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 font-medium">
                  Primary Location: <span className="text-slate-900 font-bold">London, United Kingdom</span> | Registered Diaspora Investor
                </p>
              </div>
            </div>

            {/* Role Switcher */}
            <div className="bg-slate-100 p-1.5 rounded-xl border border-slate-200 flex items-center gap-1">
              <button
                onClick={() => setUserRole('diaspora')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  userRole === 'diaspora' ? 'bg-[#155EEF] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Diaspora Buyer
              </button>
              <button
                onClick={() => setUserRole('local')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  userRole === 'local' ? 'bg-[#155EEF] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Local Buyer
              </button>
              <button
                onClick={() => setUserRole('developer')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  userRole === 'developer' ? 'bg-[#155EEF] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Developer
              </button>
            </div>

          </div>
        </div>

        {/* Saved Properties Section */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-md mb-8">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
            <h2 className="text-lg font-bold text-[#0B1F3A] font-sans flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-[#155EEF]" />
              Saved Verified Properties ({savedProperties.length})
            </h2>
          </div>

          {savedProperties.length === 0 ? (
            <div className="text-center py-10 space-y-3">
              <p className="text-sm font-semibold text-slate-700">No saved properties yet.</p>
              <p className="text-xs text-slate-500">Browse our verified marketplace and click the bookmark icon to save properties here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedProperties.map((prop) => (
                <div key={prop.id} className="border border-slate-200 rounded-2xl p-4 bg-slate-50 flex flex-col justify-between space-y-4">
                  <div>
                    <img src={prop.images[0]} alt={prop.title} className="w-full h-36 object-cover rounded-xl mb-3" />
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                      {prop.verificationStatus}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm mt-1 line-clamp-1">{prop.title}</h3>
                    <p className="text-xs text-slate-500">{prop.location}</p>
                    <p className="text-sm font-extrabold text-[#0B1F3A] mt-2">
                      {formatPriceByCurrency(prop.priceNaira, currency)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
                    <button
                      onClick={() => onViewDossier(prop)}
                      className="flex-1 bg-slate-900 text-white text-xs font-bold py-2 rounded-xl hover:bg-slate-800 transition-all text-center"
                    >
                      Legal Dossier
                    </button>
                    <button
                      onClick={() => onRemoveSaved(prop.id)}
                      className="px-3 py-2 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-xl text-xs font-bold transition-all"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Verification Request File History */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-md mb-8">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
            <h2 className="text-lg font-bold text-[#0B1F3A] font-sans flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#D4A72C]" />
              My Active Verification Requests
            </h2>
            <button
              onClick={onRequestVerification}
              className="bg-[#155EEF] hover:bg-blue-600 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all"
            >
              New Verification Audit
            </button>
          </div>

          <div className="space-y-4 text-xs">
            
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="font-mono text-xs font-bold text-[#155EEF]">Ref: NNV-882190</span>
                <h3 className="font-bold text-slate-900 text-sm mt-0.5">Plot 14, Periwinkle Waterfront, Lekki Phase 1</h3>
                <p className="text-slate-500">Submitted: 08-Feb-2026 | Package: Full Due Diligence & Survey Charting</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="bg-amber-100 text-amber-800 font-bold px-3 py-1 rounded-full text-[11px] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  In Progress (Registry Search Step 2/3)
                </span>
                <button
                  onClick={() => alert("Downloading Partial Registry Search Certificate...")}
                  className="bg-white border border-slate-300 text-slate-800 font-bold px-3 py-1.5 rounded-lg hover:bg-slate-100"
                >
                  View Status
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Document Vault */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-md">
          <h2 className="text-lg font-bold text-[#0B1F3A] font-sans flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-[#155EEF]" />
            Secure Legal Document Vault
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-[#155EEF]" />
                <div>
                  <p className="font-bold text-slate-900">Certificate of Occupancy (C of O) Certified Copy</p>
                  <p className="text-slate-500 text-[10px]">PDF Document • 4.2 MB</p>
                </div>
              </div>
              <button
                onClick={() => alert("Downloading Certified Document...")}
                className="p-2 bg-white rounded-lg border border-slate-300 hover:bg-slate-100"
              >
                <Download className="w-4 h-4 text-slate-700" />
              </button>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-emerald-600" />
                <div>
                  <p className="font-bold text-slate-900">Surveyor General Charting Certificate</p>
                  <p className="text-slate-500 text-[10px]">PDF Document • 2.8 MB</p>
                </div>
              </div>
              <button
                onClick={() => alert("Downloading Certified Document...")}
                className="p-2 bg-white rounded-lg border border-slate-300 hover:bg-slate-100"
              >
                <Download className="w-4 h-4 text-slate-700" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
