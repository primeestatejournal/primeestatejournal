import React, { useState } from 'react';
import { Globe, ShieldCheck, Lock, Video, FileText, Calendar, CheckCircle2, DollarSign, ArrowRight, UserCheck, PhoneCall, HelpCircle } from 'lucide-react';
import { CurrencyCode, ConsultationBooking } from '../types';
import { formatPriceByCurrency } from '../data/properties';

interface DiasporaGatewayProps {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
}

export const DiasporaGateway: React.FC<DiasporaGatewayProps> = ({ currency, setCurrency }) => {
  const [calculatorNaira, setCalculatorNaira] = useState<number>(150000000); // 150M NGN
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [bookingData, setBookingData] = useState<ConsultationBooking>({
    fullName: '',
    email: '',
    whatsappPhone: '',
    countryOfResidence: 'United Kingdom (UK)',
    preferredDate: '',
    preferredTime: '18:00 GMT (Evening UK/EU)',
    topicsOfFocus: ['Independent Title Verification', 'Escrow Payment Setup'],
    budgetRange: '₦100M - ₦250M ($65k - $165k USD)',
  });

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
  };

  return (
    <div className="py-10 bg-slate-50 text-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-300 text-amber-900 px-3.5 py-1.5 rounded-full text-xs font-bold mb-3 shadow-sm">
            <Globe className="w-4 h-4 text-amber-600" />
            PrimeEstateJournal Diaspora Gateway™
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-sans tracking-tight">
            Buy Nigerian Property From Abroad Without Stress or Risk
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
            Eliminate family disputes, fake title documents, and dishonest middleman markup. We provide independent legal verification, live video walkthroughs, and milestone escrow security.
          </p>
        </div>

        {/* 4 Pillars of Diaspora Security */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-14">
          
          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Independent Legal Search</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              We search Lands Registry in Ikeja Alausa, Abuja AGIS, or Rivers Ministry directly—not through the developer's agent.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mb-3">
              <Video className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">4K Drone Inspection</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Live stream 1-on-1 walkthroughs with GPS coordinate verification showing topography, drainage, and street access.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mb-3">
              <Lock className="w-5 h-5 text-amber-600" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Milestone Escrow</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Your funds are held safely in escrow and disbursed to developers only upon verified construction milestones.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 border border-purple-200 flex items-center justify-center mb-3">
              <FileText className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Power of Attorney (PoA)</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Standard legal PoA templates restricted strictly to title perfection and deed registration on your behalf.
            </p>
          </div>

        </div>

        {/* Currency & Valuation Benchmark Section */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 mb-14 shadow-lg">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <h2 className="text-xl font-bold text-slate-900 font-sans flex items-center justify-center gap-2">
              <Globe className="w-5 h-5 text-[#155EEF]" />
              Live Diaspora Currency Benchmark
            </h2>
            <p className="text-xs text-slate-600 mt-1 font-medium">
              Select your foreign currency to benchmark Nigerian real estate prices in real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Input Slider */}
            <div className="space-y-4 bg-slate-50 p-6 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span>Property Price in Naira (NGN)</span>
                <span className="text-[#155EEF] text-sm">₦{(calculatorNaira / 1000000).toFixed(1)} Million</span>
              </div>

              <input
                type="range"
                min={20000000}
                max={1000000000}
                step={5000000}
                value={calculatorNaira}
                onChange={(e) => setCalculatorNaira(Number(e.target.value))}
                className="w-full accent-[#155EEF] cursor-pointer"
              />

              <div className="flex items-center justify-between text-[10px] text-slate-500 font-semibold">
                <span>₦20 Million ($13k)</span>
                <span>₦500 Million ($330k)</span>
                <span>₦1 Billion ($670k)</span>
              </div>
            </div>

            {/* Currency Outputs */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                <p className="text-[10px] text-slate-500 font-bold uppercase">USD Value ($)</p>
                <p className="text-lg font-extrabold text-emerald-700 mt-1">
                  {formatPriceByCurrency(calculatorNaira, 'USD')}
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                <p className="text-[10px] text-slate-500 font-bold uppercase">GBP Value (£)</p>
                <p className="text-lg font-extrabold text-blue-700 mt-1">
                  {formatPriceByCurrency(calculatorNaira, 'GBP')}
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                <p className="text-[10px] text-slate-500 font-bold uppercase">EUR Value (€)</p>
                <p className="text-lg font-extrabold text-amber-700 mt-1">
                  {formatPriceByCurrency(calculatorNaira, 'EUR')}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Book Diaspora Consultation Call */}
        <div className="bg-white text-slate-800 rounded-2xl border border-slate-200 p-6 sm:p-10 max-w-3xl mx-auto shadow-2xl">
          <div className="text-center mb-8 border-b border-slate-200 pb-4">
            <h2 className="text-2xl font-bold text-[#0B1F3A] font-sans flex items-center justify-center gap-2">
              <PhoneCall className="w-6 h-6 text-[#155EEF]" />
              Book 1-on-1 Diaspora Legal Advisory Call
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Speak directly with our senior Lagos/Abuja real estate attorney via Zoom or WhatsApp video call.
            </p>
          </div>

          {bookingSubmitted ? (
            <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-2xl text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 font-sans">Consultation Booking Confirmed!</h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Thank you, <span className="font-bold text-slate-900">{bookingData.fullName}</span>. Calendar invite and Zoom link have been sent to <span className="font-bold text-slate-900">{bookingData.email}</span>.
              </p>
              <button
                onClick={() => setBookingSubmitted(false)}
                className="bg-[#155EEF] text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-blue-600 transition-all"
              >
                Book Another Call
              </button>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={bookingData.fullName}
                    onChange={(e) => setBookingData({ ...bookingData, fullName: e.target.value })}
                    placeholder="e.g. Dr. Kemi Adeleke"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-[#155EEF]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={bookingData.email}
                    onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                    placeholder="e.g. kemi@nhs.uk"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-[#155EEF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">WhatsApp Number (with country code) *</label>
                  <input
                    type="tel"
                    required
                    value={bookingData.whatsappPhone}
                    onChange={(e) => setBookingData({ ...bookingData, whatsappPhone: e.target.value })}
                    placeholder="e.g. +44 7700 900077"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-[#155EEF]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Country of Residence *</label>
                  <select
                    value={bookingData.countryOfResidence}
                    onChange={(e) => setBookingData({ ...bookingData, countryOfResidence: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-[#155EEF]"
                  >
                    <option value="United Kingdom (UK)">United Kingdom (UK)</option>
                    <option value="United States (USA)">United States (USA)</option>
                    <option value="Canada">Canada</option>
                    <option value="Germany / EU">Germany / EU</option>
                    <option value="UAE / Dubai">UAE / Dubai</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Investment Budget Range</label>
                  <select
                    value={bookingData.budgetRange}
                    onChange={(e) => setBookingData({ ...bookingData, budgetRange: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-[#155EEF]"
                  >
                    <option value="₦50M - ₦100M ($33k - $65k USD)">₦50M - ₦100M ($33k - $65k USD)</option>
                    <option value="₦100M - ₦250M ($65k - $165k USD)">₦100M - ₦250M ($65k - $165k USD)</option>
                    <option value="₦250M - ₦500M ($165k - $330k USD)">₦250M - ₦500M ($165k - $330k USD)</option>
                    <option value="₦500M+ ($330k+ USD) Prime Acreage">₦500M+ ($330k+ USD) Prime Acreage</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Preferred Time Zone</label>
                  <select
                    value={bookingData.preferredTime}
                    onChange={(e) => setBookingData({ ...bookingData, preferredTime: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-[#155EEF]"
                  >
                    <option value="18:00 GMT (Evening UK/EU)">18:00 GMT (Evening UK/EU)</option>
                    <option value="14:00 EST (Afternoon USA/Canada)">14:00 EST (Afternoon USA/Canada)</option>
                    <option value="10:00 WAT (Morning Nigeria/West Africa)">10:00 WAT (Morning Nigeria/West Africa)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-[#155EEF] hover:bg-blue-600 text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Calendar className="w-5 h-5 text-[#D4A72C]" />
                  Confirm Free Diaspora Strategy Call
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
