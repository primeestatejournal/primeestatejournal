import React, { useState } from 'react';
import { HelpCircle, Phone, Mail, MapPin, ChevronDown, MessageSquare, ShieldCheck, Globe, Send, CheckCircle2 } from 'lucide-react';

export const HelpFAQ: React.FC<{ onOpenAIConsultant: () => void }> = ({ onOpenAIConsultant }) => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  const [activeDesk, setActiveDesk] = useState<'lagos' | 'abuja'>('lagos');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    location: 'United Kingdom',
    subject: 'Property Purchase Assistance',
    message: '',
  });

  const faqs = [
    {
      q: 'How does buying property in Nigeria from abroad work on PrimeEstateJournal?',
      a: 'We eliminate middleman risk through a 3-step verification protocol: 1) Independent Lands Registry search at Alausa Ikeja, AGIS Abuja, or Rivers State Ministry; 2) Live 4K drone/video walkthrough with GPS coordinate verification; 3) Milestone escrow account holding funds until agreed engineering milestones or title perfection are verified on-site.',
    },
    {
      q: 'What is a Power of Attorney (PoA) and do I need one as a diaspora investor?',
      a: 'A Power of Attorney is a legally drafted document allowing a trusted attorney or representative to sign deed transfer documents and register C of O documents at Lands Registry on your behalf while you reside abroad. Our legal team provides standard, restricted PoA templates that strictly limit powers to title perfection only.',
    },
    {
      q: 'How are my funds protected in the Milestone Escrow account?',
      a: 'Funds are held securely with registered trustee banks. Payments are released to the developer or land vendor only after an independent surveyor and lawyer verify physical construction progress or title registry endorsement.',
    },
    {
      q: 'What title documents are 100% safe to buy in Nigeria?',
      a: 'Properties backed by a Certificate of Occupancy (C of O), Governor’s Consent, Gazette / Excision, or Federal C of O are legally safe once verified at the state lands registry. Avoid lands marked under un-excised "Global Acquisition" or ongoing family litigation.',
    },
    {
      q: 'Can I pay in Foreign Currency (USD, GBP, EUR) for Nigerian properties?',
      a: 'Yes! PrimeEstateJournal benchmarks property prices in real-time between NGN, USD, GBP, and EUR. Diaspora buyers can wire funds directly into audited escrow accounts in their local currency.',
    },
    {
      q: 'How do I manage my rental property remotely after purchase?',
      a: 'Through our Remote Property Management module, landlords can track live tenant rent collections, approve maintenance requests, and track state land use charge tax compliance directly from their mobile portal.',
    },
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  return (
    <div className="py-10 bg-slate-50 text-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-[#155EEF] px-3.5 py-1.5 rounded-full text-xs font-bold mb-3 shadow-sm">
            <HelpCircle className="w-4 h-4 text-[#155EEF]" />
            PrimeEstateJournal Help Center & Global Support
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-sans tracking-tight">
            Frequently Asked Questions & Contact Desks
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
            Find answers to common legal due diligence, title perfection, and escrow questions, or speak directly with our liaison desks in Lagos and Abuja.
          </p>
        </div>

        {/* AI Callout Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-[#155EEF] to-blue-800 text-white rounded-2xl p-6 sm:p-8 shadow-xl mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="bg-amber-400 text-slate-950 font-extrabold text-[10px] uppercase px-2.5 py-0.5 rounded tracking-wider">
              Instant Legal Guidance
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-sans">
              Have a specific question about land title laws or C of O perfection?
            </h2>
            <p className="text-xs text-blue-100 max-w-xl font-medium">
              Our AI Legal Title Consultant trained on Nigerian property statutes (Land Use Act, Lagos Tenancy Law, AGIS regulations) is available 24/7.
            </p>
          </div>

          <button
            onClick={onOpenAIConsultant}
            className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs px-5 py-3 rounded-xl transition-all shrink-0 shadow-md flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            Launch AI Legal Consultant
          </button>
        </div>

        {/* FAQ Accordion Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14">
          
          <div className="lg:col-span-7 space-y-3">
            <h2 className="text-xl font-bold text-slate-900 font-sans mb-4">
              Diaspora Buyer FAQ
            </h2>

            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                  className="w-full text-left p-5 font-bold text-slate-900 text-sm flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-sans">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${
                      openFAQ === idx ? 'rotate-180 text-[#155EEF]' : ''
                    }`}
                  />
                </button>

                {openFAQ === idx && (
                  <div className="px-5 pb-5 pt-0 text-xs text-slate-600 leading-relaxed font-medium border-t border-slate-100 mt-1 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Desk Form */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-md">
            <div className="border-b border-slate-200 pb-4 mb-4">
              <span className="text-xs font-bold text-[#155EEF] uppercase tracking-wider">
                Direct Contact Desk
              </span>
              <h3 className="text-lg font-bold text-slate-900 font-sans mt-1">
                Send a Message to Our Legal Team
              </h3>
            </div>

            {contactSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center space-y-3 my-6">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <p className="font-bold text-slate-900 text-sm">Message Received</p>
                <p className="text-xs text-slate-600 font-medium">
                  Our Diaspora Legal Officer will review your inquiry and respond to <strong>{contactForm.email}</strong> within 12 hours.
                </p>
                <button
                  onClick={() => setContactSubmitted(false)}
                  className="text-xs font-bold text-[#155EEF] hover:underline"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="e.g. Dr. Babatunde Ogunlesi"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#155EEF]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="e.g. b.ogunlesi@nhs.uk"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#155EEF]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1">Current Country of Residence *</label>
                  <select
                    value={contactForm.location}
                    onChange={(e) => setContactForm({ ...contactForm, location: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#155EEF]"
                  >
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Other Diaspora">Other Diaspora</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1">How Can We Assist You? *</label>
                  <textarea
                    rows={3}
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Describe the property location or title search needed..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#155EEF]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#155EEF] hover:bg-blue-600 text-white font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Liaison Desk Selector */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-md">
          <h2 className="text-lg font-bold text-slate-900 font-sans mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-[#155EEF]" />
            Liaison Desks & Office Addresses
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
            
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold text-blue-700 uppercase bg-blue-100 px-2 py-0.5 rounded">
                Lagos HQ
              </span>
              <p className="font-bold text-slate-900 text-sm">Freedom Way, Lekki Phase 1</p>
              <p className="text-xs text-slate-700 font-semibold">09039215553</p>
              <p className="text-[11px] text-slate-500">lagos@primeestatejournal.ng</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold text-amber-700 uppercase bg-amber-100 px-2 py-0.5 rounded">
                Abuja Bureau
              </span>
              <p className="font-bold text-slate-900 text-sm">Maitama District, FCT</p>
              <p className="text-xs text-slate-700 font-semibold">09033142485</p>
              <p className="text-[11px] text-slate-500">abuja@primeestatejournal.ng</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
