import React from 'react';
import { X, ShieldCheck, CheckCircle2, FileText, AlertTriangle, Building2, MapPin, ExternalLink, Download, Lock, Video } from 'lucide-react';
import { Property, CurrencyCode } from '../types';
import { formatPriceByCurrency } from '../data/properties';

interface VerificationDossierModalProps {
  property: Property | null;
  currency: CurrencyCode;
  onClose: () => void;
  onRequestInquiry: (property: Property, type: 'escrow' | 'search') => void;
}

export const VerificationDossierModal: React.FC<VerificationDossierModalProps> = ({
  property,
  currency,
  onClose,
  onRequestInquiry,
}) => {
  if (!property) return null;

  const { dossier } = property;
  const priceDisplay = formatPriceByCurrency(property.priceNaira, currency);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 text-slate-800">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 sticky top-0 z-10 flex items-start justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Legal Audit Certificate
              </span>
              <span className="bg-[#155EEF] text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
                Ref: {dossier.landsRegistryRef.split(' ')[0] || 'PEJ-88210'}
              </span>
            </div>
            <h2 className="text-xl font-bold font-sans">{property.title}</h2>
            <p className="text-xs text-blue-200 flex items-center gap-1 mt-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              {property.location}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          
          {/* Top Score & Price Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 border border-slate-200 p-4 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center font-extrabold text-lg">
                {dossier.legalRiskScore}
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Legal Safety Score</p>
                <p className="text-sm font-bold text-slate-900">{property.legalRiskLevel}</p>
              </div>
            </div>

            <div>
              <p className="text-xs text-slate-500 font-medium">Verified Price ({currency})</p>
              <p className="text-lg font-bold text-[#0B1F3A]">{priceDisplay}</p>
            </div>

            <div>
              <p className="text-xs text-slate-500 font-medium">Title Document Type</p>
              <p className="text-sm font-bold text-[#155EEF] flex items-center gap-1">
                <FileText className="w-4 h-4 text-[#155EEF]" />
                {property.titleType}
              </p>
            </div>
          </div>

          {/* Key Legal Audit Checks */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#155EEF]" />
              Independent Due Diligence Results
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1">
                  <span>Lands Registry Search</span>
                  <span className="text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Passed
                  </span>
                </div>
                <p className="text-xs text-slate-600">{dossier.landsRegistryRef}</p>
                <p className="text-[10px] text-slate-400 mt-1">Audit Date: {dossier.registrySearchDate}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1">
                  <span>Surveyor Charting Clearance</span>
                  <span className="text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Clean
                  </span>
                </div>
                <p className="text-xs text-slate-600">{dossier.chartingStatus}</p>
                <p className="text-[10px] text-slate-400 mt-1">Ref: {dossier.surveyorGeneralChartRef}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1">
                  <span>Developer & Owner KYC</span>
                  <span className="text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {dossier.developerKYC}
                  </span>
                </div>
                <p className="text-xs text-slate-600">Company: {property.developerName}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1">
                  <span>Physical Site Audits</span>
                  <span className="text-slate-700 font-bold">
                    {dossier.inspectionsCompleted} Completed
                  </span>
                </div>
                <p className="text-xs text-slate-600">Topography & soil suitability verified.</p>
              </div>

            </div>
          </div>

          {/* Legal Summary Narrative */}
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl">
            <h4 className="text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[#155EEF]" />
              Title Verification Summary Note
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              {dossier.titleSummary}
            </p>
          </div>

          {/* On-ground Neighborhood Infrastructure Metrics */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
              On-Ground Infrastructure Audit
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <p className="text-slate-500 font-medium">Flood Risk</p>
                <p className="font-bold text-emerald-700 mt-0.5">{dossier.floodRiskRating}</p>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <p className="text-slate-500 font-medium">Power Supply</p>
                <p className="font-bold text-slate-800 mt-0.5">{dossier.powerStability}</p>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <p className="text-slate-500 font-medium">Security Level</p>
                <p className="font-bold text-slate-800 mt-0.5">{dossier.securityRating}</p>
              </div>
            </div>
          </div>

          {/* Video Preview Banner */}
          <div className="bg-[#0B1F3A] text-white p-4 rounded-xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Live On-Ground Video Inspection Recording</p>
                <p className="text-[11px] text-blue-200">Watch 4K drone footage & physical boundary verification</p>
              </div>
            </div>
            <button
              onClick={() => alert("Launching 4K Drone Walkthrough Inspection Feed...")}
              className="bg-[#D4A72C] hover:bg-amber-500 text-[#0B1F3A] px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 flex items-center gap-1"
            >
              <span>Watch Video</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 p-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => {
              alert("Downloading Certified Legal Due Diligence Dossier (PDF Ref: NNV-2026-CERT)");
            }}
            className="bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-sm"
          >
            <Download className="w-4 h-4 text-[#155EEF]" />
            Download PDF Report
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onRequestInquiry(property, 'search')}
              className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all"
            >
              Request Custom Deed Draft
            </button>
            <button
              onClick={() => onRequestInquiry(property, 'escrow')}
              className="bg-[#155EEF] hover:bg-blue-600 text-white px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md"
            >
              <Lock className="w-4 h-4 text-[#D4A72C]" />
              Proceed via Escrow
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
