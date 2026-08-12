import React, { useState } from 'react';
import { KeyRound, Building, CheckCircle2, AlertCircle, Clock, Plus, Wrench, FileText, ShieldCheck, DollarSign } from 'lucide-react';
import { ManagedProperty, CurrencyCode } from '../types';
import { formatPriceByCurrency } from '../data/properties';

interface RemotePropertyManagementProps {
  currency: CurrencyCode;
}

export const RemotePropertyManagement: React.FC<RemotePropertyManagementProps> = ({ currency }) => {
  const [properties, setProperties] = useState<ManagedProperty[]>([
    {
      id: 'mgmt-001',
      propertyName: '3-Bedroom Luxury Apartment Block A4',
      location: 'Periwinkle Estate, Lekki Phase 1, Lagos',
      purchaseYear: '2023',
      currentEstimatedValueNGN: 220000000,
      monthlyRentCollectedNGN: 1250000,
      occupancyStatus: 'Occupied (Active Lease)',
      tenantName: 'ExxonMobil Executive Lease',
      leaseExpiryDate: '15-Nov-2026',
      nextTaxDue: '31-Dec-2026 (Lagos Land Use Charge)',
      recentMaintenanceLogs: [
        { date: '10-Jan-2026', task: 'HVAC AC Servicing & Inverter Check', costNGN: 180000, status: 'Completed' },
        { date: '02-Dec-2025', task: 'Water Treatment Plant Filter Replacement', costNGN: 320000, status: 'Completed' },
      ]
    },
    {
      id: 'mgmt-002',
      propertyName: 'The Diplomat Smart Villa Plot 9',
      location: 'Maitama District, Abuja FCT',
      purchaseYear: '2024',
      currentEstimatedValueNGN: 410000000,
      monthlyRentCollectedNGN: 2800000,
      occupancyStatus: 'Occupied (Active Lease)',
      tenantName: 'Embassy Staff Residency',
      leaseExpiryDate: '30-Aug-2027',
      nextTaxDue: '30-Jun-2026 (Abuja AGIS Ground Rent)',
      recentMaintenanceLogs: [
        { date: '20-Jan-2026', task: 'Solar Inverter Battery Diagnostic', costNGN: 150000, status: 'Completed' }
      ]
    }
  ]);

  const totalPortfolioValueNGN = properties.reduce((acc, p) => acc + p.currentEstimatedValueNGN, 0);
  const totalMonthlyRentNGN = properties.reduce((acc, p) => acc + p.monthlyRentCollectedNGN, 0);

  return (
    <div className="py-10 bg-[#F7F9FC] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#155EEF]/10 border border-[#155EEF]/20 text-[#155EEF] px-3.5 py-1.5 rounded-full text-xs font-bold mb-2">
              <KeyRound className="w-4 h-4 text-amber-600" />
              PrimeEstateJournal Remote Property Management™
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 font-sans tracking-tight">
              Manage Your Nigerian Real Estate From Anywhere
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
              Live tenant rent collection, maintenance request approvals, and state tax compliance tracking for landlords in the diaspora.
            </p>
          </div>

          <button
            onClick={() => alert("Launching Add Property to Remote Portfolio Wizard...")}
            className="bg-[#155EEF] hover:bg-blue-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-2 self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            Add Property To Portfolio
          </button>
        </div>

        {/* Portfolio High-Level Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <p className="text-xs text-slate-500 font-medium">Total Portfolio Asset Value</p>
            <p className="text-2xl font-extrabold text-[#0B1F3A] font-sans my-1">
              {formatPriceByCurrency(totalPortfolioValueNGN, currency)}
            </p>
            <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% Legal Title Verified
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <p className="text-xs text-slate-500 font-medium">Monthly Rent Revenue Collected</p>
            <p className="text-2xl font-extrabold text-emerald-600 font-sans my-1">
              {formatPriceByCurrency(totalMonthlyRentNGN, currency)} <span className="text-xs font-normal text-slate-500">/ mo</span>
            </p>
            <p className="text-[11px] text-slate-500">Automated Direct Remittance to Foreign Account</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <p className="text-xs text-slate-500 font-medium">Active Leases & Occupancy</p>
            <p className="text-2xl font-extrabold text-[#155EEF] font-sans my-1">
              100% Occupied
            </p>
            <p className="text-[11px] text-slate-500">Corporate & Diplomatic Leases Active</p>
          </div>

        </div>

        {/* Portfolio Property Cards List */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-[#0B1F3A] font-sans">
            Your Managed Properties ({properties.length})
          </h2>

          {properties.map((prop) => (
            <div key={prop.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-md space-y-6">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
                <div>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-300">
                    {prop.occupancyStatus}
                  </span>
                  <h3 className="text-lg font-bold text-[#0B1F3A] font-sans mt-1">{prop.propertyName}</h3>
                  <p className="text-xs text-slate-500">{prop.location}</p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-slate-500 font-medium">Estimated Value</p>
                  <p className="text-lg font-extrabold text-[#0B1F3A]">
                    {formatPriceByCurrency(prop.currentEstimatedValueNGN, currency)}
                  </p>
                </div>
              </div>

              {/* Lease & Rent Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <p className="text-slate-500 font-medium">Tenant / Leasee</p>
                  <p className="font-bold text-slate-900 mt-0.5">{prop.tenantName}</p>
                </div>

                <div>
                  <p className="text-slate-500 font-medium">Lease Expiry Date</p>
                  <p className="font-bold text-slate-900 mt-0.5">{prop.leaseExpiryDate}</p>
                </div>

                <div>
                  <p className="text-slate-500 font-medium">Monthly Rent Collected</p>
                  <p className="font-bold text-emerald-600 mt-0.5">{formatPriceByCurrency(prop.monthlyRentCollectedNGN, currency)}</p>
                </div>
              </div>

              {/* Tax & Compliance Alert */}
              <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#D4A72C]" />
                  <span>Next State Tax / Ground Rent Reminder: <span className="font-bold text-slate-900">{prop.nextTaxDue}</span></span>
                </div>
                <button
                  onClick={() => alert("Paying State Ground Rent via PrimeEstateJournal Tax Portal...")}
                  className="bg-[#D4A72C] hover:bg-amber-500 text-[#0B1F3A] px-3 py-1 rounded-lg font-bold text-[11px] transition-all"
                >
                  Pay Tax Online
                </button>
              </div>

              {/* Recent Maintenance Logs */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-[#155EEF]" />
                  Recent Property Maintenance Logs
                </h4>

                <div className="space-y-2">
                  {prop.recentMaintenanceLogs.map((log, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="font-medium text-slate-800">{log.task}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-slate-500">{log.date}</span>
                        <span className="font-bold text-slate-900">{formatPriceByCurrency(log.costNGN, currency)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
};
