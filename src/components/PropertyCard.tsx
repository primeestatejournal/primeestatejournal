import React from 'react';
import { ShieldCheck, MapPin, CheckCircle2, FileText, ArrowUpRight, Bookmark, Building2, Lock, Sparkles, Scale } from 'lucide-react';
import { Property, CurrencyCode } from '../types';
import { formatPriceByCurrency } from '../data/properties';

interface PropertyCardProps {
  property: Property;
  currency: CurrencyCode;
  isSaved: boolean;
  onToggleSave: (propertyId: string) => void;
  onViewDossier: (property: Property) => void;
  onSelectProperty: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  currency,
  isSaved,
  onToggleSave,
  onViewDossier,
  onSelectProperty,
}) => {
  const displayPrice = formatPriceByCurrency(property.priceNaira, currency);

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      
      {/* Property Image Header with Badges */}
      <div className="relative h-52 sm:h-56 overflow-hidden bg-slate-100 cursor-pointer" onClick={() => onSelectProperty(property)}>
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Top Badges Overlay */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
          
          {/* Verification Badge */}
          <div className="bg-[#0B1F3A]/90 backdrop-blur-md text-emerald-400 border border-emerald-500/30 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1.5 pointer-events-auto">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{property.verificationStatus}</span>
          </div>

          {/* Bookmark Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(property.id);
            }}
            className={`pointer-events-auto p-2 rounded-full backdrop-blur-md border transition-all ${
              isSaved
                ? 'bg-[#D4A72C] text-[#0B1F3A] border-[#D4A72C]'
                : 'bg-[#0B1F3A]/70 text-white border-white/20 hover:bg-[#0B1F3A]'
            }`}
            title={isSaved ? 'Remove from Saved' : 'Save Property'}
          >
            <Bookmark className="w-3.5 h-3.5 fill-current" />
          </button>
        </div>

        {/* Bottom Image Overlay Badges */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
          <span className="bg-[#102A4E]/90 backdrop-blur-md text-gray-200 text-[10px] font-semibold px-2.5 py-0.5 rounded-md border border-white/10">
            {property.sizeDisplay}
          </span>

          <span className="bg-blue-600/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
            <Scale className="w-3 h-3 text-[#D4A72C]" />
            Score: {property.dossier.legalRiskScore}/100
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title Document Tag & Type */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 text-[11px] font-semibold px-2.5 py-0.5 rounded-md border border-slate-200">
              <FileText className="w-3 h-3 text-[#155EEF]" />
              {property.titleType}
            </span>
            <span className="text-[11px] text-slate-500 font-medium">
              {property.typeLabel}
            </span>
          </div>

          {/* Property Title */}
          <h3
            onClick={() => onSelectProperty(property)}
            className="text-base font-bold text-slate-900 group-hover:text-[#155EEF] transition-colors cursor-pointer line-clamp-1 mb-1 font-sans"
          >
            {property.title}
          </h3>

          {/* Location */}
          <p className="text-xs text-slate-500 flex items-center gap-1 mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#155EEF] shrink-0" />
            <span className="truncate">{property.location}</span>
          </p>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-100 mb-4 text-xs">
            <div>
              <p className="text-[10px] text-slate-500 uppercase font-medium">Projected Yield</p>
              <p className="font-bold text-slate-800">{property.projectedAnnualYield}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase font-medium">5-Yr Growth</p>
              <p className="font-bold text-emerald-600">{property.projected5YrAppreciation}</p>
            </div>
          </div>

          {/* Developer Verification */}
          <div className="flex items-center justify-between text-[11px] text-slate-600 mb-4 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-1.5 truncate">
              <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate font-medium">{property.developerName}</span>
            </div>
            {property.developerVerified && (
              <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 shrink-0 flex items-center gap-0.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Verified Dev
              </span>
            )}
          </div>
        </div>

        {/* Footer Price & Dossier Actions */}
        <div>
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-medium">Verified Price ({currency})</p>
              <p className="text-lg font-extrabold text-[#0B1F3A] font-sans tracking-tight">
                {displayPrice}
              </p>
            </div>
            {property.escrowProtected && (
              <span className="bg-amber-50 text-[#0B1F3A] border border-amber-300 text-[10px] font-semibold px-2 py-0.5 rounded flex items-center gap-1">
                <Lock className="w-3 h-3 text-[#D4A72C]" />
                Escrow Protected
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onViewDossier(property)}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2 rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-1 shadow-sm"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4A72C]" />
              Legal Dossier
            </button>

            <button
              onClick={() => onSelectProperty(property)}
              className="w-full bg-[#155EEF] hover:bg-blue-600 text-white text-xs font-bold py-2 rounded-xl transition-all flex items-center justify-center gap-1 shadow-sm"
            >
              <span>Inspect</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
