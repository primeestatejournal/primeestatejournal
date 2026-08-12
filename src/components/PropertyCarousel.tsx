import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ShieldCheck } from 'lucide-react';
import { Property, CurrencyCode } from '../types';
import { PropertyCard } from './PropertyCard';

interface PropertyCarouselProps {
  title: string;
  subtitle: string;
  properties: Property[];
  currency: CurrencyCode;
  savedPropertyIds: string[];
  onToggleSave: (propertyId: string) => void;
  onViewDossier: (property: Property) => void;
  onSelectProperty: (property: Property) => void;
  badgeText?: string;
}

export const PropertyCarousel: React.FC<PropertyCarouselProps> = ({
  title,
  subtitle,
  properties,
  currency,
  savedPropertyIds,
  onToggleSave,
  onViewDossier,
  onSelectProperty,
  badgeText,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -360 : 360;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (properties.length === 0) return null;

  return (
    <section className="py-8 sm:py-12 border-b border-slate-100 last:border-b-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title & Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {badgeText && (
                <span className="bg-[#155EEF]/10 text-[#155EEF] border border-[#155EEF]/20 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#D4A72C]" />
                  {badgeText}
                </span>
              )}
            </div>
            <h2 className="text-2xl font-bold text-[#0B1F3A] tracking-tight font-sans">
              {title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1">
              {subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 self-end">
            <button
              onClick={() => scroll('left')}
              className="p-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto no-scrollbar pb-4 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth"
        >
          {properties.map((property) => (
            <div key={property.id} className="w-[300px] sm:w-[350px] shrink-0">
              <PropertyCard
                property={property}
                currency={currency}
                isSaved={savedPropertyIds.includes(property.id)}
                onToggleSave={onToggleSave}
                onViewDossier={onViewDossier}
                onSelectProperty={onSelectProperty}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
