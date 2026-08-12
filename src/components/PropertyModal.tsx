import React, { useState } from 'react';
import { Property, InquiryFormData } from '../types';
import { 
  X, 
  ShieldCheck, 
  MapPin, 
  Building2, 
  Compass, 
  FileCheck, 
  Bookmark, 
  Send, 
  TrendingUp, 
  FileText, 
  CheckCircle2, 
  Calculator,
  Download,
  Share2,
  ExternalLink,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface PropertyModalProps {
  property: Property | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onSendInquiry: (data: InquiryFormData) => void;
}

export const PropertyModal: React.FC<PropertyModalProps> = ({
  property,
  onClose,
  isSaved,
  onToggleSave,
  onSendInquiry
}) => {
  if (!property) return null;

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'title' | 'calculator' | 'inquire'>('overview');
  
  // Calculator State
  const [downPaymentPercent, setDownPaymentPercent] = useState(30);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTermYears, setLoanTermYears] = useState(20);

  // Inquiry form
  const [formData, setFormData] = useState<InquiryFormData>({
    propertyId: property.id,
    propertyTitle: property.title,
    fullName: '',
    email: '',
    phone: '',
    investorType: 'Private Buyer',
    preferredContact: 'Email',
    message: `I am interested in acquiring "${property.title}" (${property.location}). Please send the full investment memorandum, verified title deed copy (${property.titleNumber}), and available escrow terms.`,
    requestTitleDocument: true,
    requestVirtualTour: false
  });

  const [submitted, setSubmitted] = useState(false);

  const isLand = property.category === 'land' || property.category === 'commercial_land';

  // Calculator computations
  const loanAmount = property.price * (1 - downPaymentPercent / 100);
  const monthlyRate = interestRate / 100 / 12;
  const totalPayments = loanTermYears * 12;
  const monthlyPayment = loanAmount > 0 && monthlyRate > 0
    ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1)
    : 0;

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSendInquiry(formData);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6">
      <div 
        className="bg-white rounded-2xl max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Bar */}
        <div className="p-4 sm:px-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
              isLand ? 'bg-amber-950 text-amber-300 border border-amber-600/40' : 'bg-sky-950 text-sky-300 border border-sky-600/40'
            }`}>
              {property.typeLabel}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase bg-emerald-950 text-emerald-300 border border-emerald-600/40">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              Verified Deed #{property.titleNumber}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleSave(property.id)}
              className={`p-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                isSaved ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 custom-scrollbar">
          
          {/* Main Title & Price Header */}
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium mb-1">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>{property.location}, {property.city}, {property.country}</span>
              </div>
              <h2 className="font-editorial text-2xl sm:text-4xl font-bold text-slate-900 leading-tight">
                {property.title}
              </h2>
            </div>

            <div className="text-right">
              <div className="text-2xl sm:text-4xl font-bold font-editorial text-slate-900">
                {property.priceFormatted}
              </div>
              {property.pricePerUnitOrSqft && (
                <div className="text-xs text-slate-500 font-medium mt-0.5">
                  {property.pricePerUnitOrSqft}
                </div>
              )}
            </div>
          </div>

          {/* Gallery View */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] sm:aspect-[21/9] bg-slate-950 rounded-xl overflow-hidden shadow-inner">
              <img
                src={property.images[activeImgIndex] || property.images[0]}
                alt={property.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              {property.images.length > 1 && (
                <div className="absolute inset-y-0 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <button
                    onClick={() => setActiveImgIndex((prev) => (prev - 1 + property.images.length) % property.images.length)}
                    className="p-2 rounded-full bg-slate-900/80 text-white hover:bg-slate-900 pointer-events-auto transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActiveImgIndex((prev) => (prev + 1) % property.images.length)}
                    className="p-2 rounded-full bg-slate-900/80 text-white hover:bg-slate-900 pointer-events-auto transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Thumbnail Row */}
            {property.images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIndex(idx)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                      activeImgIndex === idx ? 'border-slate-900 scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-slate-200 gap-2 sm:gap-6 text-xs sm:text-sm font-medium overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-3 px-1 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'border-slate-900 text-slate-900 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Property Overview
            </button>
            <button
              onClick={() => setActiveTab('title')}
              className={`py-3 px-1 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'title'
                  ? 'border-slate-900 text-slate-900 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Title &amp; Deed Legal Specs
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`py-3 px-1 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'calculator'
                  ? 'border-slate-900 text-slate-900 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Calculator className="w-4 h-4 text-amber-600" />
              Acquisition &amp; ROI Calculator
            </button>
            <button
              onClick={() => setActiveTab('inquire')}
              className={`py-3 px-1 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'inquire'
                  ? 'border-slate-900 text-slate-900 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <FileCheck className="w-4 h-4 text-sky-600" />
              Request Investment Memo
            </button>
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Highlight Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                {isLand ? (
                  <>
                    <div>
                      <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider block">Land Area</span>
                      <span className="text-sm font-bold text-slate-900">{property.acres ? `${property.acres} Acres` : `${property.sqft?.toLocaleString()} Sq.Ft`}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider block">Title Document</span>
                      <span className="text-sm font-bold text-slate-900">{property.titleType}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider block">Zoning Code</span>
                      <span className="text-sm font-bold text-slate-900">{property.zoning}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider block">Escrow Settlement</span>
                      <span className="text-sm font-bold text-emerald-700">Ready &amp; Verified</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider block">Building Units</span>
                      <span className="text-sm font-bold text-slate-900">{property.unitsCount} Residential Units</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider block">Current Cap Rate</span>
                      <span className="text-sm font-bold text-slate-900">{property.capRate || '6.5% Net'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider block">Projected Return</span>
                      <span className="text-sm font-bold text-emerald-700">{property.projectedROI || '9.5% IRR'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider block">Building Footprint</span>
                      <span className="text-sm font-bold text-slate-900">{property.sqft?.toLocaleString()} Sq.Ft</span>
                    </div>
                  </>
                )}
              </div>

              {/* Description */}
              <div>
                <h3 className="font-editorial text-lg font-semibold text-slate-900 mb-2">Executive Summary</h3>
                <p className="text-sm text-slate-700 font-light leading-relaxed">
                  {property.description}
                </p>
              </div>

              {/* Key Amenities / Features */}
              <div>
                <h3 className="font-editorial text-lg font-semibold text-slate-900 mb-2">Property Features &amp; Infrastructure</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {property.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-800 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: TITLE & LEGAL DEED */}
          {activeTab === 'title' && (
            <div className="space-y-6">
              <div className="bg-emerald-50/80 border border-emerald-200 p-4 rounded-xl flex items-start gap-3">
                <ShieldCheck className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-emerald-950">Guaranteed Clean Title Deed</h4>
                  <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                    This listing has been audited by Prime Estate Journal’s legal advisory board. Title document #{property.titleNumber} is verified free of any lawsuits, land charges, or municipal encumbrances.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block mb-1">Title Type</span>
                  <div className="text-sm font-bold text-slate-900">{property.titleType}</div>
                  <div className="text-slate-500 mt-1">Full legal ownership document recognized by state land registry.</div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block mb-1">Registry Ref Number</span>
                  <div className="text-sm font-bold text-slate-900">{property.titleNumber}</div>
                  <div className="text-slate-500 mt-1">Directly queryable in the official land titles office registry.</div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block mb-1">Zoning Category</span>
                  <div className="text-sm font-bold text-slate-900">{property.zoning}</div>
                  <div className="text-slate-500 mt-1">Approved municipal usage designation and floor area ratio.</div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block mb-1">Settlement Framework</span>
                  <div className="text-sm font-bold text-emerald-700">Institutional Escrow Eligible</div>
                  <div className="text-slate-500 mt-1">Funds held securely in licensed bank escrow until deed transfer completes.</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ROI & FINANCING CALCULATOR */}
          {activeTab === 'calculator' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-4 sm:p-6 rounded-xl border border-slate-200">
                <div className="space-y-4 text-xs">
                  <h4 className="font-editorial text-base font-bold text-slate-900">Acquisition Financing Parameters</h4>
                  
                  <div>
                    <label className="flex justify-between text-slate-700 font-semibold mb-1">
                      <span>Down Payment ({downPaymentPercent}%)</span>
                      <span className="text-slate-900">${((property.price * downPaymentPercent) / 100).toLocaleString()}</span>
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="80"
                      step="5"
                      value={downPaymentPercent}
                      onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                      className="w-full accent-slate-900"
                    />
                  </div>

                  <div>
                    <label className="flex justify-between text-slate-700 font-semibold mb-1">
                      <span>Interest Rate ({interestRate}%)</span>
                    </label>
                    <input
                      type="range"
                      min="3.0"
                      max="12.0"
                      step="0.25"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full accent-slate-900"
                    />
                  </div>

                  <div>
                    <label className="flex justify-between text-slate-700 font-semibold mb-1">
                      <span>Loan Horizon ({loanTermYears} Years)</span>
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="30"
                      step="5"
                      value={loanTermYears}
                      onChange={(e) => setLoanTermYears(Number(e.target.value))}
                      className="w-full accent-slate-900"
                    />
                  </div>
                </div>

                <div className="bg-slate-900 text-white p-5 rounded-xl flex flex-col justify-between">
                  <div>
                    <span className="text-amber-400 text-[10px] font-bold uppercase tracking-wider block">Estimated Debt Service</span>
                    <div className="font-editorial text-3xl font-bold mt-1">
                      ${Math.round(monthlyPayment).toLocaleString()} <span className="text-xs text-slate-400 font-sans font-normal">/ month</span>
                    </div>
                  </div>

                  <div className="space-y-2 border-t border-slate-800 pt-3 text-xs text-slate-300 mt-4">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Total Purchase Price:</span>
                      <span className="font-medium text-white">{property.priceFormatted}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Equity Requirement:</span>
                      <span className="font-medium text-emerald-400">${Math.round((property.price * downPaymentPercent) / 100).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Financed Principal:</span>
                      <span className="font-medium text-white">${Math.round(loanAmount).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: INQUIRE / REQUEST MEMO */}
          {activeTab === 'inquire' && (
            <div className="max-w-xl mx-auto">
              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h3 className="font-editorial text-2xl font-bold text-slate-900">Inquiry Received</h3>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    Our Senior Acquisitions Director has dispatched the investment memorandum and title deed verification package for <strong>{property.title}</strong> to your email.
                  </p>
                  <div className="text-[11px] text-slate-500 font-mono bg-white p-2 rounded border border-emerald-200 inline-block">
                    Reference ID: PEJ-REQ-{Math.floor(100000 + Math.random() * 900000)}
                  </div>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs text-slate-700">
                    Requesting Official Memorandum &amp; Legal Deed Package for: <strong className="text-slate-900 block font-semibold">{property.title} ({property.priceFormatted})</strong>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Full Legal Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Jonathan Vance"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="vance@investmentgroup.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Phone / WhatsApp</label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 019-2834"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Investor Profile</label>
                      <select
                        value={formData.investorType}
                        onChange={(e) => setFormData({ ...formData, investorType: e.target.value as any })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                      >
                        <option value="Private Buyer">Private Buyer</option>
                        <option value="Institutional Investor">Institutional Investor</option>
                        <option value="Family Office">Family Office</option>
                        <option value="Developer">Property Developer</option>
                        <option value="Broker">Broker / Mandate</option>
                      </select>
                    </div>
                  </div>

                  <div className="text-xs">
                    <label className="block text-slate-700 font-semibold mb-1">Additional Notes or Escrow Preferences</label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-slate-900 text-white rounded-lg font-semibold text-xs hover:bg-slate-800 transition-colors shadow-md flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 text-amber-400" />
                    <span>Dispatch Confidential Title &amp; Investment Dossier</span>
                  </button>
                </form>
              )}
            </div>
          )}

        </div>

        {/* Modal Bottom CTA Bar */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="text-slate-600 font-medium flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Direct Advisory Line: +1 (800) 918-PRIME</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('inquire')}
              className="px-4 py-2 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors shadow-sm"
            >
              Request Investment Memorandum
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
