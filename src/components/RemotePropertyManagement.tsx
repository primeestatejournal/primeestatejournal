import React, { useState, useEffect } from 'react';
import { KeyRound, Building, CheckCircle2, AlertCircle, Clock, Plus, Wrench, FileText, ShieldCheck, DollarSign, X } from 'lucide-react';
import { ManagedProperty, CurrencyCode } from '../types';
import { formatPriceByCurrency } from '../data/properties';

interface RemotePropertyManagementProps {
  currency: CurrencyCode;
}

export const RemotePropertyManagement: React.FC<RemotePropertyManagementProps> = ({ currency }) => {
  const [properties, setProperties] = useState<ManagedProperty[]>(() => {
    try {
      const saved = localStorage.getItem('pej_managed_properties');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter((p) => p.id && !p.id.startsWith('mgmt-00'));
        }
      }
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProp, setNewProp] = useState({
    propertyName: '',
    location: '',
    purchaseYear: new Date().getFullYear().toString(),
    currentEstimatedValueNGN: '',
    monthlyRentCollectedNGN: '',
    tenantName: '',
    leaseExpiryDate: '',
    nextTaxDue: '',
  });

  useEffect(() => {
    try {
      localStorage.setItem('pej_managed_properties', JSON.stringify(properties));
    } catch (e) {
      console.error(e);
    }
  }, [properties]);

  const handleAddProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProp.propertyName.trim()) return;

    const created: ManagedProperty = {
      id: `prop-${Date.now()}`,
      propertyName: newProp.propertyName,
      location: newProp.location || 'Nigeria',
      purchaseYear: newProp.purchaseYear || new Date().getFullYear().toString(),
      currentEstimatedValueNGN: Number(newProp.currentEstimatedValueNGN) || 0,
      monthlyRentCollectedNGN: Number(newProp.monthlyRentCollectedNGN) || 0,
      occupancyStatus: newProp.tenantName ? 'Occupied (Active Lease)' : 'Vacant (Listed)',
      tenantName: newProp.tenantName || 'None',
      leaseExpiryDate: newProp.leaseExpiryDate || 'N/A',
      nextTaxDue: newProp.nextTaxDue || 'Pending Assessment',
      recentMaintenanceLogs: [],
    };

    setProperties((prev) => [created, ...prev]);
    setIsAddModalOpen(false);
    setNewProp({
      propertyName: '',
      location: '',
      purchaseYear: new Date().getFullYear().toString(),
      currentEstimatedValueNGN: '',
      monthlyRentCollectedNGN: '',
      tenantName: '',
      leaseExpiryDate: '',
      nextTaxDue: '',
    });
  };

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
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#155EEF] hover:bg-blue-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-2 self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            Add Property To Portfolio
          </button>
        </div>

        {/* Portfolio High-Level Summary Cards */}
        {properties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <p className="text-xs text-slate-500 font-medium">Total Portfolio Asset Value</p>
              <p className="text-2xl font-extrabold text-[#0B1F3A] font-sans my-1">
                {formatPriceByCurrency(totalPortfolioValueNGN, currency)}
              </p>
              <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Holdings
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <p className="text-xs text-slate-500 font-medium">Monthly Rent Revenue Collected</p>
              <p className="text-2xl font-extrabold text-emerald-600 font-sans my-1">
                {formatPriceByCurrency(totalMonthlyRentNGN, currency)} <span className="text-xs font-normal text-slate-500">/ mo</span>
              </p>
              <p className="text-[11px] text-slate-500">Direct Remittance to Foreign Account</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <p className="text-xs text-slate-500 font-medium">Active Properties</p>
              <p className="text-2xl font-extrabold text-[#155EEF] font-sans my-1">
                {properties.length} {properties.length === 1 ? 'Holding' : 'Holdings'}
              </p>
              <p className="text-[11px] text-slate-500">Managed via Diaspora Desk</p>
            </div>
          </div>
        ) : null}

        {/* Portfolio Property Cards List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#0B1F3A] font-sans">
              Your Managed Properties ({properties.length})
            </h2>
          </div>

          {properties.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-[#155EEF] flex items-center justify-center mx-auto">
                <Building className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">No properties in remote management portfolio</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Add your verified Nigerian residential, commercial, or land assets to track rent remittance, tenant leases, and state land use charges.
              </p>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-[#155EEF] hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-all inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Your First Property
              </button>
            </div>
          ) : (
            properties.map((prop) => (
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
                <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#D4A72C] shrink-0" />
                    <span>Next State Tax / Ground Rent Reminder: <span className="font-bold text-slate-900">{prop.nextTaxDue}</span></span>
                  </div>
                  <button
                    onClick={() => alert("Connecting to State Land Registry Tax Gateway...")}
                    className="bg-[#D4A72C] hover:bg-amber-500 text-[#0B1F3A] px-3 py-1 rounded-lg font-bold text-[11px] transition-all"
                  >
                    Pay Tax Online
                  </button>
                </div>

                {/* Recent Maintenance Logs */}
                {prop.recentMaintenanceLogs.length > 0 && (
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
                )}

              </div>
            ))
          )}

        </div>

        {/* Add Property Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
                <h3 className="text-lg font-bold text-[#0B1F3A]">Add Property to Remote Management</h3>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddProperty} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Property Title / Description *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 4-Bedroom Semi-Detached Duplex"
                    value={newProp.propertyName}
                    onChange={(e) => setNewProp({ ...newProp, propertyName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#155EEF] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Location / Estate Address *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lekki Phase 1, Lagos"
                    value={newProp.location}
                    onChange={(e) => setNewProp({ ...newProp, location: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#155EEF] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Estimated Value (NGN)</label>
                    <input
                      type="number"
                      placeholder="e.g. 150000000"
                      value={newProp.currentEstimatedValueNGN}
                      onChange={(e) => setNewProp({ ...newProp, currentEstimatedValueNGN: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#155EEF] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Monthly Rent (NGN)</label>
                    <input
                      type="number"
                      placeholder="e.g. 1000000"
                      value={newProp.monthlyRentCollectedNGN}
                      onChange={(e) => setNewProp({ ...newProp, monthlyRentCollectedNGN: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#155EEF] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Tenant Name (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Corporate Lease"
                      value={newProp.tenantName}
                      onChange={(e) => setNewProp({ ...newProp, tenantName: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#155EEF] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Lease Expiry (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Dec 2026"
                      value={newProp.leaseExpiryDate}
                      onChange={(e) => setNewProp({ ...newProp, leaseExpiryDate: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#155EEF] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#155EEF] hover:bg-blue-600 text-white font-bold px-5 py-2 rounded-xl shadow-sm transition-all"
                  >
                    Save Property
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

