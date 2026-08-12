import React, { useState } from 'react';
import { X, ShieldCheck, MapPin, CheckCircle2, FileText, Calendar, Building2, Phone, Mail, Lock, Calculator, ArrowRight, Video, Sparkles } from 'lucide-react';
import { Property, CurrencyCode } from '../types';
import { formatPriceByCurrency } from '../data/properties';

interface PropertyDetailModalProps {
  property: Property | null;
  currency: CurrencyCode;
  onClose: () => void;
  onViewDossier: (property: Property) => void;
  onRequestInquiry: (property: Property, type: 'inspection' | 'escrow' | 'advisor') => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  currency,
  onClose,
  onViewDossier,
  onRequestInquiry,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!property) return null;

  const priceDisplay = formatPriceByCurrency(property.priceNaira, currency);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 text-slate-800">
        
        {/* Sticky Header Bar */}
        <div className="bg-slate-900 text-white p-5 sticky top-0 z-20 flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-[#155EEF] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                {property.typeLabel}
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                {property.verificationStatus}
              </span>
            </div>
            <h2 className="text-lg font-bold font-sans line-clamp-1">{property.title}</h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Gallery Section */}
        <div className="p-6 space-y-6">
          <div className="space-y-3">
            <div className="relative h-64 sm:h-96 rounded-2xl overflow-hidden bg-slate-900 shadow-md">
              <img
                src={property.images[activeImageIndex]}
                alt={property.title}
                className="w-full h-full object-cover transition-all duration-300"
              />
              <div className="absolute bottom-3 right-3 bg-[#0B1F3A]/80 backdrop-blur-md text-white px-3 py-1 rounded-lg text-xs font-semibold border border-white/20">
                Image {activeImageIndex + 1} of {property.images.length}
              </div>
            </div>

            {property.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      activeImageIndex === idx ? 'border-[#155EEF] scale-105 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Overview Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Left 2 Cols: Description & Details */}
            <div className="md:col-span-2 space-y-6">
              
              <div>
                <p className="text-xs text-slate-500 font-medium flex items-center gap-1 mb-1">
                  <MapPin className="w-4 h-4 text-[#155EEF]" />
                  {property.location}
                </p>
                <div className="flex items-baseline gap-3 my-2">
                  <p className="text-2xl font-extrabold text-[#0B1F3A] font-sans">
                    {priceDisplay}
                  </p>
                  <span className="text-xs text-slate-500 font-medium">({property.sizeDisplay})</span>
                </div>
              </div>

              {/* Title & Verification Summary Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#155EEF]" />
                    <span className="text-xs font-bold text-slate-900">Legal Title Document:</span>
                  </div>
                  <span className="text-xs font-bold text-[#155EEF] bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                    {property.titleType}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Title Registration Code:</span>
                  <span className="font-mono text-slate-800 font-semibold">{property.titleNumber}</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Developer & Vendor:</span>
                  <span className="font-semibold text-slate-800 flex items-center gap-1">
                    {property.developerName}
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-500 font-medium">Safety Score:</span>
                  <span className="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded">
                    {property.dossier.legalRiskScore}/100 Clean
                  </span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Property Description</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{property.description}</p>
              </div>

              {/* Key Features List */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Key Features & Infrastructure</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {property.features.map((feat, idx) => (
                    <div key={idx} className="bg-slate-100 text-slate-800 p-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-slate-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Plan Option if available */}
              {property.paymentPlan && (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                  <h4 className="text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Calculator className="w-4 h-4 text-[#D4A72C]" />
                    Flexible Installment Payment Plan
                  </h4>
                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div>
                      <p className="text-slate-500">Initial Deposit</p>
                      <p className="font-bold text-slate-900">{formatPriceByCurrency(property.paymentPlan.initialDeposit, currency)}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Duration</p>
                      <p className="font-bold text-slate-900">{property.paymentPlan.durationMonths} Months</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Monthly Payment</p>
                      <p className="font-bold text-slate-900">{formatPriceByCurrency(property.paymentPlan.monthlyPayment, currency)}</p>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Right Col: Action Box */}
            <div className="space-y-4">
              
              <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 shadow-lg space-y-4">
                <div className="border-b border-slate-800 pb-3">
                  <span className="text-[10px] text-blue-300 font-bold uppercase tracking-wider block mb-1">Escrow & Legal Safeguard</span>
                  <p className="text-sm font-bold text-white font-sans">Diaspora Ready Purchase</p>
                  <p className="text-xs text-gray-300 mt-1">
                    Complete transaction with independent legal deed drafting and milestone escrow releases.
                  </p>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => onViewDossier(property)}
                    className="w-full bg-[#102A4E] hover:bg-[#1E3A5F] border border-[#1E3A5F] text-white py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#D4A72C]" />
                    View Verification Dossier
                  </button>

                  <button
                    onClick={() => onRequestInquiry(property, 'inspection')}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-white py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border border-slate-700"
                  >
                    <Video className="w-4 h-4 text-blue-400" />
                    Book Live HD Drone Tour
                  </button>

                  <button
                    onClick={() => onRequestInquiry(property, 'escrow')}
                    className="w-full bg-[#155EEF] hover:bg-blue-600 text-white py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md"
                  >
                    <Lock className="w-4 h-4 text-[#D4A72C]" />
                    Proceed With Escrow
                  </button>
                </div>

                <div className="pt-2 text-center">
                  <button
                    onClick={() => onRequestInquiry(property, 'advisor')}
                    className="text-xs text-[#D4A72C] hover:underline font-semibold flex items-center justify-center gap-1 mx-auto"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Speak with Diaspora Property Advisor
                  </button>
                </div>
              </div>

              {/* Verified Security Seal */}
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  PrimeEstateJournal Buyer Safeguard Active
                </div>
                <p className="text-slate-600 text-[11px] leading-snug">
                  100% legal title guarantee. Funds held in milestone escrow until physical survey charting & deed registration are completed.
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
