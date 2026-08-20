import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PropertyCard } from './components/PropertyCard';
import { PropertyCarousel } from './components/PropertyCarousel';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { VerificationDossierModal } from './components/VerificationDossierModal';
import { PropertyVerificationHub } from './components/PropertyVerificationHub';
import { DiasporaGateway } from './components/DiasporaGateway';
import { InvestmentCalculator } from './components/InvestmentCalculator';
import { RemotePropertyManagement } from './components/RemotePropertyManagement';
import { ClientPortal } from './components/ClientPortal';
import { TitleGuide } from './components/TitleGuide';
import { DeveloperKYC } from './components/DeveloperKYC';
import { HelpFAQ } from './components/HelpFAQ';
import { TermsPrivacy } from './components/TermsPrivacy';
import { AIConsultantDrawer } from './components/AIConsultantDrawer';
import { Footer } from './components/Footer';
import { PublicBlog } from './components/PublicBlog';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AuthProvider } from './context/AuthContext';

import { Property, CurrencyCode, FilterState, NavigationTab } from './types';
import { SAMPLE_PROPERTIES } from './data/properties';
import { fetchSupabaseProperties } from './lib/supabase';
import { ShieldCheck, Sparkles, Building2, SlidersHorizontal, ArrowRight, Lock, CheckCircle2 } from 'lucide-react';

function AppContent() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('marketplace');
  const [currency, setCurrency] = useState<CurrencyCode>('NGN');
  const [propertiesList, setPropertiesList] = useState<Property[]>([]);
  const [isLoadingProps, setIsLoadingProps] = useState(false);
  
  const [savedPropertyIds, setSavedPropertyIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('pej_saved_property_ids');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Remove old demo property IDs
          return parsed.filter((id) => typeof id === 'string' && !id.startsWith('nn-prop-'));
        }
      }
    } catch (e) {
      console.error(e);
    }
    return [];
  });
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [dossierProperty, setDossierProperty] = useState<Property | null>(null);
  
  const [isAIConsultantOpen, setIsAIConsultantOpen] = useState(false);

  const loadProperties = async () => {
    setIsLoadingProps(true);
    try {
      const dbProps = await fetchSupabaseProperties();
      if (dbProps && dbProps.length > 0) {
        setPropertiesList(dbProps);
      } else {
        setPropertiesList([]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingProps(false);
    }
  };

  useEffect(() => {
    // Clear any obsolete demo keys in localStorage
    try {
      const keysToCheck = ['pej_demo_properties', 'pej_sample_properties', 'prime_estate_demo_properties'];
      keysToCheck.forEach((key) => localStorage.removeItem(key));
    } catch (e) {
      console.error(e);
    }

    loadProperties();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('pej_saved_property_ids', JSON.stringify(savedPropertyIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedPropertyIds]);

  const [filter, setFilter] = useState<FilterState>({
    searchQuery: '',
    category: 'all',
    state: '',
    district: '',
    minPrice: 0,
    maxPrice: 1000000000,
    sortBy: 'recommended',
    verifiedOnly: false,
    diasporaOnly: false,
    titleFilter: '',
  });

  const toggleSaveProperty = (propertyId: string) => {
    setSavedPropertyIds((prev) =>
      prev.includes(propertyId) ? prev.filter((id) => id !== propertyId) : [...prev, propertyId]
    );
  };

  const savedPropertiesList = useMemo(() => {
    return propertiesList.filter((p) => savedPropertyIds.includes(p.id));
  }, [savedPropertyIds, propertiesList]);

  // Filtered properties for marketplace grid
  const filteredProperties = useMemo(() => {
    return propertiesList.filter((p) => {
      // Query filter
      if (filter.searchQuery.trim()) {
        const q = filter.searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesLoc = p.location.toLowerCase().includes(q);
        const matchesDev = p.developerName.toLowerCase().includes(q);
        const matchesTitleType = p.titleType.toLowerCase().includes(q);
        if (!matchesTitle && !matchesLoc && !matchesDev && !matchesTitleType) return false;
      }

      // Category filter
      if (filter.category !== 'all') {
        if (filter.category === 'diaspora_pick') {
          if (!p.diasporaReady) return false;
        } else if (p.category !== filter.category) {
          return false;
        }
      }

      // District filter
      if (filter.district && !p.district.toLowerCase().includes(filter.district.toLowerCase())) {
        return false;
      }

      // Title filter
      if (filter.titleFilter && p.titleType !== filter.titleFilter) {
        return false;
      }

      // Toggles
      if (filter.verifiedOnly && (p.dossier?.legalRiskScore || 0) < 98) return false;
      if (filter.diasporaOnly && !p.escrowProtected) return false;

      return true;
    }).sort((a, b) => {
      if (filter.sortBy === 'price-asc') return a.priceNaira - b.priceNaira;
      if (filter.sortBy === 'price-desc') return b.priceNaira - a.priceNaira;
      if (filter.sortBy === 'highest-yield') return (b.dossier?.legalRiskScore || 0) - (a.dossier?.legalRiskScore || 0);
      return 0; // recommended
    });
  }, [filter, propertiesList]);

  // Carousel Groupings
  const diasporaPicks = useMemo(() => propertiesList.filter((p) => p.carouselCategories?.includes('diaspora_favorites')), [propertiesList]);
  const verifiedLands = useMemo(() => propertiesList.filter((p) => p.category === 'residential_land' || p.category === 'commercial_land'), [propertiesList]);
  const luxuryResidences = useMemo(() => propertiesList.filter((p) => p.category === 'luxury_apartment' || p.category === 'duplex_terrace'), [propertiesList]);
  const abujaPrime = useMemo(() => propertiesList.filter((p) => p.state === 'Abuja FCT'), [propertiesList]);

  if (activeTab === 'admin') {
    return (
      <AdminDashboard
        onReturnToSite={() => {
          setActiveTab('marketplace');
          loadProperties();
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-slate-800 flex flex-col font-sans selection:bg-[#155EEF] selection:text-white">
      
      {/* Navbar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currency={currency}
        setCurrency={setCurrency}
        savedCount={savedPropertyIds.length}
        onRequestVerification={() => setActiveTab('verification_hub')}
        onOpenAIConsultant={() => setIsAIConsultantOpen(true)}
      />

      {/* View Routing */}
      <main className="flex-1">
        
        {/* Marketplace View */}
        {activeTab === 'marketplace' && (
          <div>
            <Hero
              filter={filter}
              setFilter={setFilter}
              onRequestVerification={() => setActiveTab('verification_hub')}
              onOpenAIConsultant={() => setIsAIConsultantOpen(true)}
            />

            {/* Quick Filter Info Banner */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Showing {filteredProperties.length} Verified Properties Matching Your Filter Criteria</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('verification_hub')}
                    className="text-xs text-[#155EEF] font-bold hover:underline flex items-center gap-1"
                  >
                    <span>Need to verify an external property?</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Curated Property Carousels */}
            <PropertyCarousel
              title="Diaspora Top Verified Picks"
              subtitle="Properties with 100% clean registered title, verified developer KYC, and milestone escrow security."
              badgeText="Diaspora Safe Protocol"
              properties={diasporaPicks}
              currency={currency}
              savedPropertyIds={savedPropertyIds}
              onToggleSave={toggleSaveProperty}
              onViewDossier={(p) => setDossierProperty(p)}
              onSelectProperty={(p) => setSelectedProperty(p)}
            />

            <PropertyCarousel
              title="Verified Lands (C of O & Excision)"
              subtitle="Residential & commercial land plots surveyed and checked for zero government acquisition risk."
              badgeText="Registry Search Cleared"
              properties={verifiedLands}
              currency={currency}
              savedPropertyIds={savedPropertyIds}
              onToggleSave={toggleSaveProperty}
              onViewDossier={(p) => setDossierProperty(p)}
              onSelectProperty={(p) => setSelectedProperty(p)}
            />

            <PropertyCarousel
              title="Luxury Residences & Penthouses"
              subtitle="Prime Ikoyi, Lekki Phase 1, and Maitama apartments delivering high USD short-let yields."
              badgeText="High Rental Yield"
              properties={luxuryResidences}
              currency={currency}
              savedPropertyIds={savedPropertyIds}
              onToggleSave={toggleSaveProperty}
              onViewDossier={(p) => setDossierProperty(p)}
              onSelectProperty={(p) => setSelectedProperty(p)}
            />

            <PropertyCarousel
              title="Abuja Prime Real Estate (AGIS C of O)"
              subtitle="Maitama, Guzape, and Katampe residences verified directly with AGIS."
              badgeText="Abuja Federal C of O"
              properties={abujaPrime}
              currency={currency}
              savedPropertyIds={savedPropertyIds}
              onToggleSave={toggleSaveProperty}
              onViewDossier={(p) => setDossierProperty(p)}
              onSelectProperty={(p) => setSelectedProperty(p)}
            />

            {/* All Properties Filterable Grid */}
            <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900 font-sans">
                  All Verified Properties Marketplace
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Click on any property to inspect legal due diligence documents, video tours, or proceed via escrow.
                </p>
              </div>

              {filteredProperties.length === 0 ? (
                <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-4 shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-blue-50 text-[#155EEF] flex items-center justify-center mx-auto">
                    <Building2 className="w-6 h-6" />
                  </div>
                  {propertiesList.length === 0 ? (
                    <>
                      <p className="text-base font-bold text-slate-800">No properties in database yet</p>
                      <p className="text-xs text-slate-500 max-w-md mx-auto">
                        All demo properties have been cleared. As verified properties are registered or fetched from your connected Supabase database, they will be displayed here.
                      </p>
                      <div className="flex items-center justify-center gap-3 pt-2">
                        <button
                          onClick={loadProperties}
                          disabled={isLoadingProps}
                          className="bg-[#155EEF] hover:bg-blue-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition-all flex items-center gap-2"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          {isLoadingProps ? 'Checking Supabase...' : 'Refresh Database'}
                        </button>
                        <button
                          onClick={() => setActiveTab('client_portal')}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl transition-all"
                        >
                          View Supabase Setup Desk
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-base font-bold text-slate-800">No properties match your filter.</p>
                      <p className="text-xs text-slate-500">Try clearing your search keyword or switching category tabs.</p>
                      <button
                        onClick={() => setFilter({
                          searchQuery: '',
                          category: 'all',
                          state: '',
                          district: '',
                          minPrice: 0,
                          maxPrice: 1000000000,
                          sortBy: 'recommended',
                          verifiedOnly: false,
                          diasporaOnly: false,
                          titleFilter: '',
                        })}
                        className="bg-[#155EEF] text-white text-xs font-bold px-4 py-2 rounded-xl"
                      >
                        Reset Filters
                      </button>
                    </>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProperties.map((p) => (
                    <PropertyCard
                      key={p.id}
                      property={p}
                      currency={currency}
                      isSaved={savedPropertyIds.includes(p.id)}
                      onToggleSave={toggleSaveProperty}
                      onViewDossier={(p) => setDossierProperty(p)}
                      onSelectProperty={(p) => setSelectedProperty(p)}
                    />
                  ))}
                </div>
              )}
            </section>
          </div>
        )}

        {/* Verification Hub */}
        {activeTab === 'verification_hub' && (
          <PropertyVerificationHub currency={currency} />
        )}

        {/* Diaspora Gateway */}
        {activeTab === 'diaspora_gateway' && (
          <DiasporaGateway currency={currency} setCurrency={setCurrency} />
        )}

        {/* Investment Calculator */}
        {activeTab === 'investment_calc' && (
          <InvestmentCalculator currency={currency} />
        )}

        {/* Remote Property Management */}
        {activeTab === 'property_mgmt' && (
          <RemotePropertyManagement currency={currency} />
        )}

        {/* Client Portal */}
        {activeTab === 'client_portal' && (
          <ClientPortal
            savedProperties={savedPropertiesList}
            currency={currency}
            onSelectProperty={(p) => setSelectedProperty(p)}
            onViewDossier={(p) => setDossierProperty(p)}
            onRemoveSaved={toggleSaveProperty}
            onRequestVerification={() => setActiveTab('verification_hub')}
          />
        )}

        {/* Title & Registry Guide */}
        {activeTab === 'title_guide' && (
          <TitleGuide
            onRequestVerification={() => setActiveTab('verification_hub')}
            onOpenAIConsultant={() => setIsAIConsultantOpen(true)}
          />
        )}

        {/* Market Intelligence Blog */}
        {activeTab === 'blog' && (
          <PublicBlog onOpenAdmin={() => setActiveTab('admin')} />
        )}

        {/* Developer Accreditation Portal */}
        {activeTab === 'developer_kyc' && (
          <DeveloperKYC />
        )}

        {/* Help Center & FAQ */}
        {activeTab === 'help_faq' && (
          <HelpFAQ
            onOpenAIConsultant={() => setIsAIConsultantOpen(true)}
          />
        )}

        {/* Terms of Service & Privacy */}
        {activeTab === 'terms_privacy' && (
          <TermsPrivacy />
        )}

      </main>

      {/* Modals & Drawers */}
      <PropertyDetailModal
        property={selectedProperty}
        currency={currency}
        onClose={() => setSelectedProperty(null)}
        onViewDossier={(p) => {
          setSelectedProperty(null);
          setDossierProperty(p);
        }}
        onRequestInquiry={(p, type) => {
          setSelectedProperty(null);
          if (type === 'escrow') {
            setActiveTab('diaspora_gateway');
          } else if (type === 'advisor') {
            setIsAIConsultantOpen(true);
          } else {
            alert(`Booking Live Video Walkthrough Tour for ${p.title}... Our agent will contact you on WhatsApp.`);
          }
        }}
      />

      <VerificationDossierModal
        property={dossierProperty}
        currency={currency}
        onClose={() => setDossierProperty(null)}
        onRequestInquiry={(p, type) => {
          setDossierProperty(null);
          if (type === 'escrow') {
            setActiveTab('diaspora_gateway');
          } else {
            setActiveTab('verification_hub');
          }
        }}
      />

      <AIConsultantDrawer
        isOpen={isAIConsultantOpen}
        onClose={() => setIsAIConsultantOpen(false)}
      />

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onRequestVerification={() => setActiveTab('verification_hub')}
        onOpenAIConsultant={() => setIsAIConsultantOpen(true)}
      />

    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <AppWithRouting />
    </AuthProvider>
  );
}

function AppWithRouting() {
  const [isAdminRoute, setIsAdminRoute] = useState(false);

  return <AppContent />;
}

export default App;
