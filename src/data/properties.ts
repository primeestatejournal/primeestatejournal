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
    id: 'prop-ikoyi-waterfront',
    title: 'The Riviera 4-Bedroom Ultra-Luxury Penthouse',
    category: 'luxury_apartment',
    typeLabel: 'Luxury Penthouse',
    priceNaira: 850000000,
    priceFormatted: '₦850 Million',
    location: 'Banana Island Road, Ikoyi, Lagos',
    district: 'Ikoyi',
    state: 'Lagos',
    country: 'Nigeria',
    images: [],
    sizeDisplay: '580 Sqm',
    projectedAnnualYield: '11.8% USD Equivalent',
    projected5YrAppreciation: '+75% Capital Growth',
    zoning: 'Residential',
    titleType: "Governor's Consent",
    titleNumber: 'LAG/CONSENT/IKY/2023/4491',
    verificationStatus: '100% Clean Title Verified',
    legalRiskLevel: 'Low Risk (Clean)',
    escrowProtected: true,
    diasporaReady: true,
    features: [
      'Private Yacht Jetty Access',
      'Dedicated 24/7 Dual IPP Power',
      'Smart Home Automation',
      'Infinity Pool Overlooking Lagoon',
      'Independent Title Search Certified',
      'Escrow Milestone Payment Protocol'
    ],
    description: 'A masterpiece in Ikoyi waterfront architecture, offering panoramic skyline views, private boat mooring, Italian marble finishes, and complete title clearance certified by our partner legal chambers.',
    coordinates: { lat: 6.4549, lng: 3.4246 },
    carouselCategories: ['diaspora_favorites', 'luxury_residences'],
    developerName: 'Forte & Crown Luxury Properties Ltd',
    developerVerified: true,
    dossier: {
      registrySearchDate: '2024-11-14',
      landsRegistryRef: 'LR-LAG-IKY-2024-00918',
      surveyorGeneralChartRef: 'SGO-CHART-IKY-883',
      chartingStatus: 'Free From Government Acquisition',
      developerKYC: 'Identity & CAC Verified',
      legalRiskScore: 99,
      titleSummary: "Governor's Consent duly endorsed, stamped at Alausa, clear of all mortgages, lis pendens, and court injunctions.",
      inspectionsCompleted: 5,
      floodRiskRating: 'Low Risk (Elevated Land)',
      powerStability: '20+ Hours Daily (IPPs)',
      securityRating: 'Access Controlled Estate / 24/7 Guards'
    }
  },
  {
    id: 'prop-lekki-terrace',
    title: 'The Sovereign 5-Bedroom Contemporary Terrace',
    category: 'duplex_terrace',
    typeLabel: 'Off-Plan Terrace block',
    priceNaira: 280000000,
    priceFormatted: '₦280 Million',
    location: 'Off Admiralty Way, Lekki Phase 1, Lagos',
    district: 'Lekki Phase 1',
    state: 'Lagos',
    country: 'Nigeria',
    images: [],
    sizeDisplay: '380 Sqm',
    projectedAnnualYield: '13.5% Rental Yield',
    projected5YrAppreciation: '+90% Projected',
    zoning: 'Residential',
    titleType: 'Certificate of Occupancy (C of O)',
    titleNumber: 'CofO/LEK/PH1/2022/1089',
    verificationStatus: '100% Clean Title Verified',
    legalRiskLevel: 'Low Risk (Clean)',
    escrowProtected: true,
    diasporaReady: true,
    features: [
      'Solar & Inverter Backup System',
      'Fitted Gourmet German Kitchen',
      'High-Yield Airbnb Track Record',
      '24/7 Armed Estate Security',
      'Direct Title from Lagos Lands Bureau'
    ],
    description: 'Prime Lekki Phase 1 location just 2 minutes from Admiralty Circle. Ideal for high-yielding short-let stays or executive long-term leases with guaranteed liquidity.',
    coordinates: { lat: 6.4474, lng: 3.4849 },
    carouselCategories: ['diaspora_favorites', 'luxury_residences'],
    developerName: 'Urban Oasis Developments',
    developerVerified: true,
    dossier: {
      registrySearchDate: '2024-10-28',
      landsRegistryRef: 'LR-LAG-LEK-2024-7734',
      surveyorGeneralChartRef: 'SGO-LEK-CHART-0941',
      chartingStatus: 'Free From Government Acquisition',
      developerKYC: 'Identity & CAC Verified',
      legalRiskScore: 98,
      titleSummary: 'Federal & Lagos State Lands Registry search confirmed valid Certificate of Occupancy registered in Volume 442, Page 12.',
      inspectionsCompleted: 4,
      floodRiskRating: 'Low Risk (Elevated Land)',
      powerStability: '20+ Hours Daily (IPPs)',
      securityRating: 'Access Controlled Estate / 24/7 Guards'
    }
  },
  {
    id: 'prop-maitama-mansion',
    title: 'The Diplomatic Crescent 6-Bedroom Villa',
    category: 'luxury_apartment',
    typeLabel: '4-Bedroom Fully Detached Duplex',
    priceNaira: 1400000000,
    priceFormatted: '₦1.40 Billion',
    location: 'Gana Street Corridor, Maitama, Abuja FCT',
    district: 'Maitama',
    state: 'Abuja FCT',
    country: 'Nigeria',
    images: [],
    sizeDisplay: '1,450 Sqm Plot',
    projectedAnnualYield: '9.5% USD Expatriate Lease',
    projected5YrAppreciation: '+60% Capital Preservation',
    zoning: 'Residential',
    titleType: 'Federal C of O',
    titleNumber: 'AGIS/FCT/MAIT/2021/045',
    verificationStatus: '100% Clean Title Verified',
    legalRiskLevel: 'Low Risk (Clean)',
    escrowProtected: true,
    diasporaReady: true,
    features: [
      'AGIS Cadastral Verification Clearance',
      'Bulletproof Glass & High Perimeter Fence',
      'Private Heated Swimming Pool & Gym',
      'Underground Wine Cellar & Cinema',
      'Expatriate Embassy Tenant Preference'
    ],
    description: 'Located in the most prestigious diplomatic enclave in West Africa. Features AGIS title perfection, custom architectural detailing, and immediate rental demand from foreign missions.',
    coordinates: { lat: 9.0882, lng: 7.4988 },
    carouselCategories: ['diaspora_favorites', 'luxury_residences', 'abuja_prime'],
    developerName: 'Capital Zenith Estates',
    developerVerified: true,
    dossier: {
      registrySearchDate: '2024-11-02',
      landsRegistryRef: 'AGIS-SEARCH-MAIT-8841',
      surveyorGeneralChartRef: 'FCDA-SURV-2024-0012',
      chartingStatus: 'Free From Government Acquisition',
      developerKYC: 'Identity & CAC Verified',
      legalRiskScore: 99,
      titleSummary: 'Direct Federal Capital Development Authority (FCDA/AGIS) Certificate of Occupancy with unexpired 88-year leasehold.',
      inspectionsCompleted: 6,
      floodRiskRating: 'Low Risk (Elevated Land)',
      powerStability: '20+ Hours Daily (IPPs)',
      securityRating: 'Access Controlled Estate / 24/7 Guards'
    }
  },
  {
    id: 'prop-epe-commercial-land',
    title: 'Atlantic Greenbelt Commercial Land (1,000 Sqm Plots)',
    category: 'residential_land',
    typeLabel: 'Residential Land Plot',
    priceNaira: 38000000,
    priceFormatted: '₦38 Million',
    location: 'Along Lekki-Epe Expressway, Epe, Lagos',
    district: 'Epe',
    state: 'Lagos',
    country: 'Nigeria',
    images: [],
    sizeDisplay: '1,000 Sqm (100% Dry Land)',
    projectedAnnualYield: '28.4% Land Banking ROI',
    projected5YrAppreciation: '+210% Projected Growth',
    zoning: 'Mixed Use',
    titleType: 'Gazette / Excision',
    titleNumber: 'LAGOS GAZETTE NO. 14, VOL. 38',
    verificationStatus: '100% Clean Title Verified',
    legalRiskLevel: 'Low Risk (Clean)',
    escrowProtected: true,
    diasporaReady: true,
    features: [
      'Registered Lagos State Government Gazette',
      'Free From Committed Forest Reserves',
      'Immediate Allocation & Perimeter Fencing',
      'Close Proximity to Lekki Free Zone & Airport',
      'Zero Omo-Onile Harassment Guarantee'
    ],
    description: 'High-appreciation 100% dry table land along the rapidly expanding industrial and commercial corridor of Epe. Full surveyor coordinate charting verified by PrimeEstateJournal.',
    coordinates: { lat: 6.5841, lng: 3.9833 },
    carouselCategories: ['diaspora_favorites', 'verified_lands'],
    developerName: 'Atlantic Heritage Lands Ltd',
    developerVerified: true,
    dossier: {
      registrySearchDate: '2024-11-10',
      landsRegistryRef: 'LR-EPE-GAZ-2024-512',
      surveyorGeneralChartRef: 'SGO-CHART-EPE-0899',
      chartingStatus: 'Government Approved Excision',
      developerKYC: 'Identity & CAC Verified',
      legalRiskScore: 97,
      titleSummary: 'Gazette Publication verified against official Lagos State records with complete beacon numbering and registered perimeter survey.',
      inspectionsCompleted: 3,
      floodRiskRating: 'Low Risk (Elevated Land)',
      powerStability: '16-18 Hours',
      securityRating: 'Gated Street'
    }
  },
  {
    id: 'prop-guzape-hillside',
    title: 'The Zenith Hillside 4-Bedroom Semi-Detached Duplex',
    category: 'duplex_terrace',
    typeLabel: '4-Bedroom Fully Detached Duplex',
    priceNaira: 340000000,
    priceFormatted: '₦340 Million',
    location: 'Diplomatic Hill Top, Guzape, Abuja FCT',
    district: 'Guzape',
    state: 'Abuja FCT',
    country: 'Nigeria',
    images: [],
    sizeDisplay: '420 Sqm',
    projectedAnnualYield: '12.4% Annual Yield',
    projected5YrAppreciation: '+80% Capital Growth',
    zoning: 'Residential',
    titleType: 'Federal C of O',
    titleNumber: 'AGIS/FCT/GUZ/2023/1180',
    verificationStatus: '100% Clean Title Verified',
    legalRiskLevel: 'Low Risk (Clean)',
    escrowProtected: true,
    diasporaReady: true,
    features: [
      'Panoramic City Skyline Views',
      'FCDA Infrastructure Connected (Paved Roads)',
      'Solar Powered Streetlights & Smart Gates',
      'Fully Furnished Executive Option Available',
      'Verified AGIS Cadastral File'
    ],
    description: 'Guzape hill offers the most dramatic panoramic views in Abuja. Engineered with solid rock foundation piling and modern European fixtures, certified ready for diaspora buyers.',
    coordinates: { lat: 9.0345, lng: 7.5142 },
    carouselCategories: ['diaspora_favorites', 'luxury_residences', 'abuja_prime'],
    developerName: 'Apex Capital Developers',
    developerVerified: true,
    dossier: {
      registrySearchDate: '2024-11-08',
      landsRegistryRef: 'AGIS-SEARCH-GUZ-901',
      surveyorGeneralChartRef: 'FCDA-SURV-2024-331',
      chartingStatus: 'Free From Government Acquisition',
      developerKYC: 'Identity & CAC Verified',
      legalRiskScore: 98,
      titleSummary: 'FCDA Certificate of Occupancy properly registered in the Federal Land Registry with zero third-party claims.',
      inspectionsCompleted: 5,
      floodRiskRating: 'Low Risk (Elevated Land)',
      powerStability: '20+ Hours Daily (IPPs)',
      securityRating: 'Access Controlled Estate / 24/7 Guards'
    }
  },
  {
    id: 'prop-ph-gra-estate',
    title: 'The Heritage 5-Bedroom Luxury Detached Mansion',
    category: 'luxury_apartment',
    typeLabel: '4-Bedroom Fully Detached Duplex',
    priceNaira: 420000000,
    priceFormatted: '₦420 Million',
    location: 'Tombia Extension, GRA Phase 2, Port Harcourt',
    district: 'Port Harcourt GRA',
    state: 'Rivers',
    country: 'Nigeria',
    images: [],
    sizeDisplay: '750 Sqm',
    projectedAnnualYield: '14.2% Expatriate Lease',
    projected5YrAppreciation: '+70% Projected',
    zoning: 'Residential',
    titleType: 'Certificate of Occupancy (C of O)',
    titleNumber: 'RIV/CO/PHC/2021/304',
    verificationStatus: '100% Clean Title Verified',
    legalRiskLevel: 'Low Risk (Clean)',
    escrowProtected: true,
    diasporaReady: true,
    features: [
      'Rivers State Ministry of Lands Search Certified',
      'Industrial Borehole & Water Treatment',
      'Armed Response Security Enclave',
      'Multi-Car Covered Garage',
      'Oil & Gas Executive Tenant Hotspot'
    ],
    description: 'Premier GRA Phase 2 Port Harcourt detached mansion, catering directly to international energy executives and diaspora investors requiring unassailable title security and comfort.',
    coordinates: { lat: 4.8156, lng: 7.0498 },
    carouselCategories: ['diaspora_favorites', 'luxury_residences'],
    developerName: 'Niger Delta Premier Real Estate',
    developerVerified: true,
    dossier: {
      registrySearchDate: '2024-10-15',
      landsRegistryRef: 'RVS-LANDS-2024-108',
      surveyorGeneralChartRef: 'SGO-RVS-CHART-442',
      chartingStatus: 'Free From Government Acquisition',
      developerKYC: 'Identity & CAC Verified',
      legalRiskScore: 98,
      titleSummary: 'Original Rivers State Government Certificate of Occupancy registered in Deeds Book Volume 81.',
      inspectionsCompleted: 4,
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
