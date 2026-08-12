export type NavigationTab = 
  | 'marketplace' 
  | 'verification_hub' 
  | 'diaspora_gateway' 
  | 'investment_calc' 
  | 'property_mgmt' 
  | 'client_portal'
  | 'title_guide'
  | 'developer_kyc'
  | 'help_faq'
  | 'terms_privacy';

export type CurrencyCode = 'NGN' | 'USD' | 'GBP' | 'EUR';

export type PropertyCategory = 
  | 'residential_land' 
  | 'commercial_land' 
  | 'luxury_apartment' 
  | 'duplex_terrace' 
  | 'off_plan_development' 
  | 'diaspora_pick';

export type VerificationStatus = 
  | '100% Clean Title Verified' 
  | 'Registry Search Passed' 
  | 'Under Active Legal Due Diligence' 
  | 'Excision Gazette Approved';

export type LegalRiskLevel = 'Low Risk (Clean)' | 'Moderate Caution' | 'Verification Pending';

export type TitleStatus = 
  | 'Certificate of Occupancy (C of O)' 
  | 'Governor\'s Consent' 
  | 'Gazette / Excision' 
  | 'Federal C of O' 
  | 'Governor\'s Consent in View' 
  | 'Registered Deed of Assignment';

export type CarouselType = 
  | 'diaspora_favorites' 
  | 'verified_lands' 
  | 'luxury_residences' 
  | 'high_rental_yield' 
  | 'off_plan_deals' 
  | 'abuja_prime';

export interface VerificationDossier {
  registrySearchDate: string;
  landsRegistryRef: string;
  surveyorGeneralChartRef: string;
  chartingStatus: 'Free From Government Acquisition' | 'Committed Acquisition Free' | 'Government Approved Excision';
  developerKYC: 'Identity & CAC Verified' | 'Corporate Tax Cleared' | 'Under Audit';
  legalRiskScore: number; // 0 - 100
  titleSummary: string;
  inspectionsCompleted: number;
  floodRiskRating: 'Low Risk (Elevated Land)' | 'Moderate' | 'High';
  powerStability: '20+ Hours Daily (IPPs)' | '16-18 Hours' | '12 Hours Generator Backup';
  securityRating: 'Access Controlled Estate / 24/7 Guards' | 'Gated Street' | 'Standard Community';
  videoWalkthroughUrl?: string;
}

export interface PaymentPlanOption {
  outrightPrice: number;
  initialDeposit: number;
  durationMonths: number;
  monthlyPayment: number;
}

export interface Property {
  id: string;
  title: string;
  category: PropertyCategory;
  typeLabel: 'Residential Land Plot' | 'Luxury Penthouse' | '4-Bedroom Fully Detached Duplex' | '3-Bedroom Luxury Apartment' | 'Commercial Acreage' | 'Off-Plan Terrace block';
  priceNaira: number; // Base price in NGN
  priceFormatted: string;
  location: string;
  district: string; // e.g. Lekki Phase 1, Ikoyi, Maitama, Epe, Guzape
  state: 'Lagos' | 'Abuja FCT' | 'Rivers' | 'Ogun' | 'Enugu';
  country: string;
  images: string[];
  sizeDisplay: string; // e.g. "600 Sqm", "1,200 Sqm Acreage", "280 Sqm Living Area"
  bedrooms?: number;
  bathrooms?: number;
  projectedAnnualYield: string; // e.g. "8.5% NGN / 6.2% USD"
  projected5YrAppreciation: string; // e.g. "+125% Estimated"
  zoning: 'Residential' | 'Mixed Use' | 'Commercial High-Rise' | 'Agricultural / Land Bank';
  titleType: TitleStatus;
  titleNumber: string;
  verificationStatus: VerificationStatus;
  legalRiskLevel: LegalRiskLevel;
  escrowProtected: boolean;
  diasporaReady: boolean;
  features: string[];
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  carouselCategories: CarouselType[];
  developerName: string;
  developerVerified: boolean;
  dossier: VerificationDossier;
  paymentPlan?: PaymentPlanOption;
}

export interface FilterState {
  searchQuery: string;
  category: 'all' | PropertyCategory;
  state: string;
  district: string;
  minPrice: number;
  maxPrice: number;
  sortBy: 'recommended' | 'price-asc' | 'price-desc' | 'highest-yield' | 'newest';
  verifiedOnly: boolean;
  diasporaOnly: boolean;
  titleFilter: string;
}

export interface VerificationRequestData {
  id?: string;
  propertyName: string;
  locationAddress: string;
  state: string;
  lga: string;
  sellerNameOrDev: string;
  titleDocumentType: string;
  documentFileNames?: string[];
  requesterName: string;
  requesterEmail: string;
  requesterPhone: string;
  requesterCountry: string;
  verificationTier: 'standard' | 'comprehensive' | 'diaspora_full';
  additionalInstructions?: string;
}

export interface ConsultationBooking {
  fullName: string;
  email: string;
  whatsappPhone: string;
  countryOfResidence: string;
  preferredDate: string;
  preferredTime: string;
  topicsOfFocus: string[];
  budgetRange: string;
  notes?: string;
}

export interface ManagedProperty {
  id: string;
  propertyName: string;
  location: string;
  purchaseYear: string;
  currentEstimatedValueNGN: number;
  monthlyRentCollectedNGN: number;
  occupancyStatus: 'Occupied (Active Lease)' | 'Vacant (Listed)' | 'Maintenance / Renovation';
  tenantName?: string;
  leaseExpiryDate?: string;
  nextTaxDue?: string;
  recentMaintenanceLogs: { date: string; task: string; costNGN: number; status: 'Completed' | 'In Progress' }[];
}

export interface ROICalculatorInput {
  propertyPriceNGN: number;
  expectedAnnualAppreciationPercent: number;
  expectedAnnualRentalYieldPercent: number;
  holdingPeriodYears: number;
  includeLegalFees: boolean; // 5% Deed & Legal
  includeSurveyFees: boolean; // ₦500k avg
  includeStampDuty: boolean; // 3%
}

export interface InquiryFormData {
  propertyId?: string;
  propertyTitle?: string;
  fullName: string;
  email: string;
  phone: string;
  investorType: 'Private Buyer' | 'Institutional Investor' | 'Family Office' | 'Developer' | 'Broker';
  preferredContact: 'Email' | 'Phone' | 'WhatsApp';
  message: string;
  requestTitleDocument: boolean;
  requestVirtualTour: boolean;
}
