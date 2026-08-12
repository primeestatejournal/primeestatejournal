import { Property } from '../types';

export const CURRENCY_RATES = {
  NGN: 1,
  USD: 0.00067, // ~1,500 NGN per USD
  GBP: 0.00052, // ~1,920 NGN per GBP
  EUR: 0.00061, // ~1,640 NGN per EUR
};

export const CURRENCY_SYMBOLS = {
  NGN: '₦',
  USD: '$',
  GBP: '£',
  EUR: '€',
};

export function formatPriceByCurrency(priceInNaira: number, currency: 'NGN' | 'USD' | 'GBP' | 'EUR'): string {
  const symbol = CURRENCY_SYMBOLS[currency];
  const rate = CURRENCY_RATES[currency];
  const converted = priceInNaira * rate;

  if (currency === 'NGN') {
    if (priceInNaira >= 1_000_000_000) {
      return `${symbol}${(priceInNaira / 1_000_000_000).toFixed(2)} Billion`;
    }
    if (priceInNaira >= 1_000_000) {
      return `${symbol}${(priceInNaira / 1_000_000).toFixed(1)} Million`;
    }
    return `${symbol}${priceInNaira.toLocaleString()}`;
  }

  return `${symbol}${Math.round(converted).toLocaleString()}`;
}

export const SAMPLE_PROPERTIES: Property[] = [
  {
    id: 'nn-prop-001',
    title: 'The Sovereign Haven Waterfront Acreage',
    category: 'residential_land',
    typeLabel: 'Residential Land Plot',
    priceNaira: 185000000, // ₦185M
    priceFormatted: '₦185.0 Million',
    location: 'Periwinkle Lifestyle Estate, Freedom Way, Lekki Phase 1',
    district: 'Lekki Phase 1',
    state: 'Lagos',
    country: 'Nigeria',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    ],
    sizeDisplay: '900 Sqm Dry Waterfront Plot',
    projectedAnnualYield: '9.2% Estimated Rental/Lease',
    projected5YrAppreciation: '+135% High Density Zone Growth',
    zoning: 'Residential',
    titleType: "Governor's Consent",
    titleNumber: 'LA/GOV/CONSENT/2021/88921',
    verificationStatus: '100% Clean Title Verified',
    legalRiskLevel: 'Low Risk (Clean)',
    escrowProtected: true,
    diasporaReady: true,
    features: [
      'Dry Table Land',
      'Waterfront Access with Jet Ski Ramp',
      'Underground Utility Cabling',
      'Central Sewage System',
      '24/7 Armed Security & CCTV Patrol',
      'Helipad Access'
    ],
    description: 'Fully serviced waterfront residential plot located inside the highly secure Periwinkle Lifestyle Estate, Lekki Phase 1. Complete with valid Governor\'s Consent, survey charting cleared by Lagos State Surveyor General, and 100% free from government acquisition.',
    coordinates: { lat: 6.4474, lng: 3.4723 },
    carouselCategories: ['diaspora_favorites', 'verified_lands', 'high_rental_yield'],
    developerName: 'Periwinkle Development Ltd (CAC Verified)',
    developerVerified: true,
    dossier: {
      registrySearchDate: '12-Jan-2026',
      landsRegistryRef: 'Lagos State Ministry of Lands Search Reg #LMS-89120',
      surveyorGeneralChartRef: 'LA/SURVEY/CHART/2025/11902',
      chartingStatus: 'Free From Government Acquisition',
      developerKYC: 'Identity & CAC Verified',
      legalRiskScore: 99,
      titleSummary: 'Governor\'s Consent registered in 2021. No encumbrances, bank charges, or ongoing litigation.',
      inspectionsCompleted: 14,
      floodRiskRating: 'Low Risk (Elevated Land)',
      powerStability: '20+ Hours Daily (IPPs)',
      securityRating: 'Access Controlled Estate / 24/7 Guards',
      videoWalkthroughUrl: 'https://youtube.com'
    },
    paymentPlan: {
      outrightPrice: 185000000,
      initialDeposit: 55000000,
      durationMonths: 12,
      monthlyPayment: 11250000
    }
  },
  {
    id: 'nn-prop-002',
    title: 'The Imperial Heights Penthouse Suite',
    category: 'luxury_apartment',
    typeLabel: 'Luxury Penthouse',
    priceNaira: 450000000, // ₦450M
    priceFormatted: '₦450.0 Million',
    location: 'Bourdillon Road, Ikoyi',
    district: 'Ikoyi',
    state: 'Lagos',
    country: 'Nigeria',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
    ],
    sizeDisplay: '520 Sqm Living Area',
    bedrooms: 4,
    bathrooms: 5,
    projectedAnnualYield: '11.8% USD Short-let Equivalent',
    projected5YrAppreciation: '+85% Prime Ikoyi Capital Growth',
    zoning: 'Residential',
    titleType: 'Certificate of Occupancy (C of O)',
    titleNumber: 'LAGOS/IKOYI/CofO/99/004312',
    verificationStatus: '100% Clean Title Verified',
    legalRiskLevel: 'Low Risk (Clean)',
    escrowProtected: true,
    diasporaReady: true,
    features: [
      '360° View of Five Cowries Creek',
      'Private Swimming Pool on Terrace',
      'Smart Home Automation System',
      'Miele Fitted Kitchen',
      'Concierge & Private Elevators',
      '2-Bed Servant Quarters (BQ)'
    ],
    description: 'Ultra-exclusive 4-bedroom penthouse on Bourdillon Road, Ikoyi. Designed for executive residency or high-yielding corporate short-let rental generating $65,000+ USD annually. Comes with pristine Lagos C of O.',
    coordinates: { lat: 6.4531, lng: 3.4350 },
    carouselCategories: ['diaspora_favorites', 'luxury_residences', 'high_rental_yield'],
    developerName: 'Imperial Luxury Assets Ltd',
    developerVerified: true,
    dossier: {
      registrySearchDate: '28-Jan-2026',
      landsRegistryRef: 'Lagos Lands Bureau Registry File #IK-8812',
      surveyorGeneralChartRef: 'LA/CHART/IKOYI/00912',
      chartingStatus: 'Free From Government Acquisition',
      developerKYC: 'Identity & CAC Verified',
      legalRiskScore: 100,
      titleSummary: 'Federal C of O perfected with full Governor\'s Consent for sub-lease. Ideal for corporate buyers.',
      inspectionsCompleted: 22,
      floodRiskRating: 'Low Risk (Elevated Land)',
      powerStability: '20+ Hours Daily (IPPs)',
      securityRating: 'Access Controlled Estate / 24/7 Guards'
    },
    paymentPlan: {
      outrightPrice: 450000000,
      initialDeposit: 135000000,
      durationMonths: 6,
      monthlyPayment: 54166000
    }
  },
  {
    id: 'nn-prop-003',
    title: 'Grand Horizon Commercial Acreage',
    category: 'commercial_land',
    typeLabel: 'Commercial Acreage',
    priceNaira: 32000000, // ₦32M per plot
    priceFormatted: '₦32.0 Million / Plot',
    location: 'Facing Lekki-Epe Expressway, Epe City Corridor',
    district: 'Epe',
    state: 'Lagos',
    country: 'Nigeria',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80'
    ],
    sizeDisplay: '600 Sqm per Plot (10 Acres Available)',
    projectedAnnualYield: '18.0% Land Banking Appreciation',
    projected5YrAppreciation: '+210% Mega Industrial Corridor',
    zoning: 'Commercial High-Rise',
    titleType: 'Gazette / Excision',
    titleNumber: 'LAGOS STATE GAZETTE NO. 18 VOL 42',
    verificationStatus: 'Excision Gazette Approved',
    legalRiskLevel: 'Low Risk (Clean)',
    escrowProtected: true,
    diasporaReady: true,
    features: [
      'Direct Expressway Frontage',
      '100% Dry Table Land',
      'Suitable for Petrol Station, Shopping Mall, Warehouses',
      'Immediate Allocation & Physical Possession',
      'Clean Perimeter Fencing',
      'Perimeter Survey Registered'
    ],
    description: 'High-yield land banking opportunity along the expanding Lekki-Epe expressway, directly opposite the upcoming Lekki International Airport site. Fully gazetted excision with registered survey plan.',
    coordinates: { lat: 6.5841, lng: 3.9833 },
    carouselCategories: ['verified_lands', 'high_rental_yield'],
    developerName: 'Prime Crest Properties Ltd',
    developerVerified: true,
    dossier: {
      registrySearchDate: '02-Feb-2026',
      landsRegistryRef: 'Lagos Gazette Ref Vol 42 Page 88',
      surveyorGeneralChartRef: 'LA/EPE/SURVEY/2024/99102',
      chartingStatus: 'Government Approved Excision',
      developerKYC: 'Identity & CAC Verified',
      legalRiskScore: 97,
      titleSummary: 'Gazette Excision verified at Surveyor General\'s office in Alausa. No court injunctions.',
      inspectionsCompleted: 38,
      floodRiskRating: 'Low Risk (Elevated Land)',
      powerStability: '16-18 Hours',
      securityRating: 'Gated Street'
    },
    paymentPlan: {
      outrightPrice: 32000000,
      initialDeposit: 8000000,
      durationMonths: 12,
      monthlyPayment: 2100000
    }
  },
  {
    id: 'nn-prop-004',
    title: 'The Diplomat Residence & Smart Villas',
    category: 'duplex_terrace',
    typeLabel: '4-Bedroom Fully Detached Duplex',
    priceNaira: 380000000, // ₦380M
    priceFormatted: '₦380.0 Million',
    location: 'Maitama District (Near European Union Complex)',
    district: 'Maitama',
    state: 'Abuja FCT',
    country: 'Nigeria',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80'
    ],
    sizeDisplay: '650 Sqm Plot / 480 Sqm Built Up',
    bedrooms: 4,
    bathrooms: 5,
    projectedAnnualYield: '8.8% Diplomatic Tenant USD Rent',
    projected5YrAppreciation: '+90% Prime Maitama Capital Preservation',
    zoning: 'Residential',
    titleType: 'Federal C of O',
    titleNumber: 'FCT/AGIS/CofO/2019/88219',
    verificationStatus: '100% Clean Title Verified',
    legalRiskLevel: 'Low Risk (Clean)',
    escrowProtected: true,
    diasporaReady: true,
    features: [
      'AGIS Verified Federal C of O',
      'Solar Microgrid System Included',
      'Private Swimming Pool & Gym',
      'Automated Access Gate & Bulletproof Doors',
      'High diplomatic security area',
      '2 Rooms Attached BQ'
    ],
    description: 'Prestigious Maitama villa featuring contemporary architecture, smart home controls, and high diplomatic rental appeal. Verified through Abuja Geographic Information Systems (AGIS).',
    coordinates: { lat: 9.0882, lng: 7.4983 },
    carouselCategories: ['diaspora_favorites', 'abuja_prime', 'luxury_residences'],
    developerName: 'Capital Capital Developments Ltd',
    developerVerified: true,
    dossier: {
      registrySearchDate: '15-Jan-2026',
      landsRegistryRef: 'AGIS Abuja File Ref #MAIT-9921',
      surveyorGeneralChartRef: 'AGIS/MAP/MAITAMA/2021',
      chartingStatus: 'Free From Government Acquisition',
      developerKYC: 'Identity & CAC Verified',
      legalRiskScore: 100,
      titleSummary: 'AGIS C of O confirmed clean. Ground rent fully paid up to date.',
      inspectionsCompleted: 19,
      floodRiskRating: 'Low Risk (Elevated Land)',
      powerStability: '20+ Hours Daily (IPPs)',
      securityRating: 'Access Controlled Estate / 24/7 Guards'
    }
  },
  {
    id: 'nn-prop-005',
    title: 'The Atlantic Pearl Off-Plan Luxury Towers',
    category: 'off_plan_development',
    typeLabel: 'Off-Plan Terrace block',
    priceNaira: 145000000, // ₦145M
    priceFormatted: '₦145.0 Million (30% Initial Deposit)',
    location: 'Orchid Road, Chevron Tollgate, Lekki',
    district: 'Chevron / Orchid',
    state: 'Lagos',
    country: 'Nigeria',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    ],
    sizeDisplay: '3-Bed Smart Terrace Duplex + BQ',
    bedrooms: 3,
    bathrooms: 4,
    projectedAnnualYield: '10.5% Rental Yield',
    projected5YrAppreciation: '+140% Off-Plan Pre-construction Discount',
    zoning: 'Residential',
    titleType: "Governor's Consent",
    titleNumber: 'LAGOS/GOV/CONSENT/2023/10291',
    verificationStatus: 'Registry Search Passed',
    legalRiskLevel: 'Low Risk (Clean)',
    escrowProtected: true,
    diasporaReady: true,
    features: [
      'Construction Milestone Escrow Payment',
      'Live HD Camera Progress Feed for Diaspora Owners',
      'Clubhouse, Gym, and Tennis Court',
      'Fitted Italian Kitchen Appliances',
      'CCTV & Fiber-Optic Internet'
    ],
    description: 'Off-plan smart terrace duplex project in a gated community along Orchid Road. Purchase with a 30% initial deposit and pay in flexible installments backed by PrimeEstateJournal escrow milestone releases.',
    coordinates: { lat: 6.4352, lng: 3.5412 },
    carouselCategories: ['off_plan_deals', 'diaspora_favorites'],
    developerName: 'Atlantic Heights Builders Ltd',
    developerVerified: true,
    dossier: {
      registrySearchDate: '20-Jan-2026',
      landsRegistryRef: 'Lagos Ministry of Housing Approved Plan #MH-8812',
      surveyorGeneralChartRef: 'LA/CHART/CHEVRON/9912',
      chartingStatus: 'Free From Government Acquisition',
      developerKYC: 'Identity & CAC Verified',
      legalRiskScore: 96,
      titleSummary: 'Building approval plan granted. Governor\'s Consent registered. Escrow account tied to construction milestones.',
      inspectionsCompleted: 31,
      floodRiskRating: 'Low Risk (Elevated Land)',
      powerStability: '20+ Hours Daily (IPPs)',
      securityRating: 'Access Controlled Estate / 24/7 Guards'
    },
    paymentPlan: {
      outrightPrice: 145000000,
      initialDeposit: 43500000,
      durationMonths: 18,
      monthlyPayment: 5638800
    }
  },
  {
    id: 'nn-prop-006',
    title: 'Guzape Eco-Hill Luxury Duplexes',
    category: 'duplex_terrace',
    typeLabel: '4-Bedroom Fully Detached Duplex',
    priceNaira: 290000000, // ₦290M
    priceFormatted: '₦290.0 Million',
    location: 'Guzape Hillside Crest, Abuja',
    district: 'Guzape',
    state: 'Abuja FCT',
    country: 'Nigeria',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80'
    ],
    sizeDisplay: '550 Sqm Plot',
    bedrooms: 4,
    bathrooms: 5,
    projectedAnnualYield: '8.2% Capital Rental Yield',
    projected5YrAppreciation: '+110% Fast Growing Abuja Hub',
    zoning: 'Residential',
    titleType: 'Federal C of O',
    titleNumber: 'FCT/AGIS/GUZAPE/CofO/2022/7712',
    verificationStatus: '100% Clean Title Verified',
    legalRiskLevel: 'Low Risk (Clean)',
    escrowProtected: true,
    diasporaReady: true,
    features: [
      'AGIS Verified Federal C of O',
      'Breathtaking Panoramic Hill Views of Abuja',
      'Infinity Edge Pool',
      'Elevator Ready Shaft',
      'Perimeter Electric Fencing'
    ],
    description: 'Modern hillside architectural masterpiece in Guzape District, Abuja. Clean Federal C of O fully verified with AGIS. Exceptional topography with elevated city view.',
    coordinates: { lat: 9.0321, lng: 7.5211 },
    carouselCategories: ['abuja_prime', 'luxury_residences'],
    developerName: 'EcoHill Infrastructure Ltd',
    developerVerified: true,
    dossier: {
      registrySearchDate: '01-Feb-2026',
      landsRegistryRef: 'AGIS Abuja File Ref #GUZ-00812',
      surveyorGeneralChartRef: 'AGIS/SURVEY/GUZAPE/2022',
      chartingStatus: 'Free From Government Acquisition',
      developerKYC: 'Identity & CAC Verified',
      legalRiskScore: 98,
      titleSummary: 'Verified at AGIS. Zero encumbrances, zero boundary dispute.',
      inspectionsCompleted: 15,
      floodRiskRating: 'Low Risk (Elevated Land)',
      powerStability: '20+ Hours Daily (IPPs)',
      securityRating: 'Access Controlled Estate / 24/7 Guards'
    }
  }
];

export const PROPERTY_LOCATIONS = [
  { name: 'Lekki Phase 1', state: 'Lagos' },
  { name: 'Ikoyi', state: 'Lagos' },
  { name: 'Victoria Island', state: 'Lagos' },
  { name: 'Epe', state: 'Lagos' },
  { name: 'Ibeju-Lekki', state: 'Lagos' },
  { name: 'Chevron / Orchid', state: 'Lagos' },
  { name: 'Ikeja GRA', state: 'Lagos' },
  { name: 'Maitama', state: 'Abuja FCT' },
  { name: 'Guzape', state: 'Abuja FCT' },
  { name: 'Katampe', state: 'Abuja FCT' },
  { name: 'Asokoro', state: 'Abuja FCT' },
  { name: 'Port Harcourt GRA', state: 'Rivers' },
];
