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

export const SAMPLE_PROPERTIES: Property[] = [];

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
