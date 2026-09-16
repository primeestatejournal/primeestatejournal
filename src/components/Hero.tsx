import React from 'react';
import { Search, ShieldCheck, CheckCircle2, Lock, FileText, ArrowRight, Sparkles, MapPin, Building, ChevronDown } from 'lucide-react';
import { FilterState, PropertyCategory } from '../types';
import { PROPERTY_LOCATIONS } from '../data/properties';

interface HeroProps {
  filter: FilterState;
  setFilter: React.Dispatch<React.SetStateAction<FilterState>>;
  onRequestVerification: () => void;
  onOpenAIConsultant: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  filter,
  setFilter,
  onRequestVerification,
  onOpenAIConsultant,
}) => {
  return (
    <section className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50/60 text-slate-900 pt-10 pb-16 overflow-hidden border-b border-slate-200/80">
      {/* Background Graphic Elements */}
      <div className="absolute top-0 right-1/4 -mt-24 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 -mb-20 w-80 h-80 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Tagline Pill */}
        <div className="flex justify-center sm:justify-start mb-4">
          <div className="inline-flex items-center gap-2 bg-amber-50/90 border border-amber-200/80 text-amber-950 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-xs backdrop-blur-xs">
            <ShieldCheck className="w-4 h-4 text-[#D4A72C]" />
            <span className="font-extrabold tracking-tight">PrimeEstateJournal Due Diligence Protocol™</span>
            <span className="text-amber-300">•</span>
            <span className="text-slate-600 font-medium">Independent Lands Registry Search</span>
          </div>
        </div>

        {/* Headline & Subtitle */}
        <div className="max-w-3xl mb-8">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.18] font-sans">
            Buy Nigerian Property <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#155EEF] via-blue-700 to-amber-600">
              With Total Confidence.
            </span>
          </h1>
          <p className="mt-3.5 text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-2xl">
            100% verified properties, independent State Lands Registry searches, surveyor charting, and structured escrow protection for buyers at home and in the diaspora.
          </p>
        </div>

        {/* Search & Filter Box (Sharp Light Card) */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-6 shadow-xl shadow-slate-100 mb-10">
          
          {/* Quick Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-4 border-b border-slate-100 no-scrollbar text-xs">
            <button
              onClick={() => setFilter((prev) => ({ ...prev, category: 'all' }))}
              className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                filter.category === 'all'
                  ? 'bg-[#155EEF] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              All Verified Listings
            </button>
            <button
              onClick={() => setFilter((prev) => ({ ...prev, category: 'residential_land' }))}
              className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                filter.category === 'residential_land'
                  ? 'bg-[#155EEF] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Verified Land Plots
            </button>
            <button
              onClick={() => setFilter((prev) => ({ ...prev, category: 'luxury_apartment' }))}
              className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                filter.category === 'luxury_apartment'
                  ? 'bg-[#155EEF] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Luxury Apartments
            </button>
            <button
              onClick={() => setFilter((prev) => ({ ...prev, category: 'diaspora_pick' }))}
              className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                filter.category === 'diaspora_pick'
                  ? 'bg-[#155EEF] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Diaspora Top Picks</span>
            </button>
            <button
              onClick={() => setFilter((prev) => ({ ...prev, category: 'commercial_land' }))}
              className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                filter.category === 'commercial_land'
                  ? 'bg-[#155EEF] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Commercial Acreage
            </button>
          </div>

          {/* Search Inputs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-4">
            
            {/* Search Query Input */}
            <div className="relative">
              <label className="block text-[11px] font-bold text-slate-700 mb-1.5">Keywords & District</label>
              <div className="relative">
                <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={filter.searchQuery}
                  onChange={(e) => setFilter((prev) => ({ ...prev, searchQuery: e.target.value }))}
                  placeholder="e.g. Lekki Phase 1, C of O, Maitama..."
                  className="w-full bg-slate-50/80 border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#155EEF] transition-all"
                />
              </div>
            </div>

            {/* Location Select */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1.5">State / District</label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-2.5 w-4 h-4 text-amber-600" />
                <select
                  value={filter.district}
                  onChange={(e) => setFilter((prev) => ({ ...prev, district: e.target.value }))}
                  className="w-full bg-slate-50/80 border border-slate-200 rounded-xl pl-10 pr-8 py-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#155EEF] appearance-none transition-all cursor-pointer"
                >
                  <option value="">All Locations (Lagos, Abuja, PH)</option>
                  {PROPERTY_LOCATIONS.map((loc) => (
                    <option key={loc.name} value={loc.name}>
                      {loc.name} ({loc.state})
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3.5 top-3.5 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Title Type Select */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1.5">Legal Title Document</label>
              <div className="relative">
                <FileText className="absolute left-3.5 top-2.5 w-4 h-4 text-emerald-600" />
                <select
                  value={filter.titleFilter}
                  onChange={(e) => setFilter((prev) => ({ ...prev, titleFilter: e.target.value }))}
                  className="w-full bg-slate-50/80 border border-slate-200 rounded-xl pl-10 pr-8 py-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#155EEF] appearance-none transition-all cursor-pointer"
                >
                  <option value="">All Verified Titles</option>
                  <option value="Certificate of Occupancy (C of O)">Certificate of Occupancy (C of O)</option>
                  <option value="Governor's Consent">Governor's Consent</option>
                  <option value="Gazette / Excision">Gazette / Excision</option>
                  <option value="Federal C of O">Federal C of O</option>
                </select>
                <ChevronDown className="absolute right-3.5 top-3.5 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Sorting Select */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1.5">Sort Listings</label>
              <div className="relative">
                <select
                  value={filter.sortBy}
                  onChange={(e) => setFilter((prev) => ({ ...prev, sortBy: e.target.value as any }))}
                  className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#155EEF] appearance-none transition-all cursor-pointer"
                >
                  <option value="recommended">Recommended & Verified</option>
                  <option value="highest-yield">Highest Rental Yield</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
                <ChevronDown className="absolute right-3.5 top-3.5 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>

          </div>

          {/* Toggle Switches Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
            <div className="flex flex-wrap items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={filter.verifiedOnly}
                  onChange={(e) => setFilter((prev) => ({ ...prev, verifiedOnly: e.target.checked }))}
                  className="w-4 h-4 rounded border-slate-300 text-[#155EEF] focus:ring-[#155EEF] bg-white cursor-pointer"
                />
                <span className="text-slate-800 font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  100% Clean Title Verified Only
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={filter.diasporaOnly}
                  onChange={(e) => setFilter((prev) => ({ ...prev, diasporaOnly: e.target.checked }))}
                  className="w-4 h-4 rounded border-slate-300 text-[#155EEF] focus:ring-[#155EEF] bg-white cursor-pointer"
                />
                <span className="text-slate-800 font-semibold flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-amber-600" />
                  Diaspora Escrow Ready Only
                </span>
              </label>

              {/* Availability Status Filter */}
              <div className="flex items-center gap-1 bg-slate-100/90 border border-slate-200/80 rounded-lg p-0.5 text-xs">
                <span className="text-[10px] uppercase font-bold text-slate-500 px-1.5">Status:</span>
                <button
                  type="button"
                  onClick={() => setFilter((prev) => ({ ...prev, availabilityFilter: 'all' }))}
                  className={`px-2 py-0.5 rounded-md font-semibold transition-all ${
                    (filter.availabilityFilter || 'all') === 'all'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All
                </button>
                <button
                  type="button"
                  onClick={() => setFilter((prev) => ({ ...prev, availabilityFilter: 'available' }))}
                  className={`px-2 py-0.5 rounded-md font-semibold transition-all ${
                    filter.availabilityFilter === 'available'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Available
                </button>
                <button
                  type="button"
                  onClick={() => setFilter((prev) => ({ ...prev, availabilityFilter: 'sold' }))}
                  className={`px-2 py-0.5 rounded-md font-semibold transition-all ${
                    filter.availabilityFilter === 'sold'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Sold
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onOpenAIConsultant}
                className="text-xs text-[#155EEF] hover:text-blue-800 font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Ask AI Due Diligence Advisor</span>
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics / Trust Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 pt-1">
          
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex items-center gap-3.5 shadow-xs hover:border-slate-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-600 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-lg font-extrabold text-slate-900 font-sans tracking-tight">₦4.2 Billion+</p>
              <p className="text-[11px] text-slate-500 font-semibold">Verified Deals Audited</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex items-center gap-3.5 shadow-xs hover:border-slate-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200/80 flex items-center justify-center text-[#155EEF] shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-lg font-extrabold text-slate-900 font-sans tracking-tight">100% Guaranteed</p>
              <p className="text-[11px] text-slate-500 font-semibold">Lands Registry Search</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex items-center gap-3.5 shadow-xs hover:border-slate-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-600 shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-lg font-extrabold text-slate-900 font-sans tracking-tight">350+ Diaspora</p>
              <p className="text-[11px] text-slate-500 font-semibold">Protected Overseas Buyers</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex items-center gap-3.5 shadow-xs hover:border-slate-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200/80 flex items-center justify-center text-indigo-600 shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <p className="text-lg font-extrabold text-slate-900 font-sans tracking-tight">0 Fraud Cases</p>
              <p className="text-[11px] text-slate-500 font-semibold">Zero-Middleman Protocol</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
