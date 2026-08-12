import React, { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, ShieldCheck, CheckCircle2, PieChart, ArrowUpRight, Scale } from 'lucide-react';
import { CurrencyCode, ROICalculatorInput } from '../types';
import { formatPriceByCurrency } from '../data/properties';

interface InvestmentCalculatorProps {
  currency: CurrencyCode;
}

export const InvestmentCalculator: React.FC<InvestmentCalculatorProps> = ({ currency }) => {
  const [inputs, setInputs] = useState<ROICalculatorInput>({
    propertyPriceNGN: 185000000, // ₦185M
    expectedAnnualAppreciationPercent: 18.5, // 18.5% p.a.
    expectedAnnualRentalYieldPercent: 8.5, // 8.5% p.a.
    holdingPeriodYears: 5,
    includeLegalFees: true, // 5% Deed & Legal
    includeSurveyFees: true, // ₦500k avg
    includeStampDuty: true, // 3%
  });

  // Calculate costs
  const legalFeeNGN = inputs.includeLegalFees ? inputs.propertyPriceNGN * 0.05 : 0;
  const stampDutyNGN = inputs.includeStampDuty ? inputs.propertyPriceNGN * 0.03 : 0;
  const surveyFeeNGN = inputs.includeSurveyFees ? 500000 : 0;

  const totalAcquisitionCostNGN = inputs.propertyPriceNGN + legalFeeNGN + stampDutyNGN + surveyFeeNGN;

  // Capital appreciation calculation over holding period
  const futurePropertyValueNGN = inputs.propertyPriceNGN * Math.pow(1 + inputs.expectedAnnualAppreciationPercent / 100, inputs.holdingPeriodYears);
  const capitalGainNGN = futurePropertyValueNGN - inputs.propertyPriceNGN;

  // Rental income over holding period
  const totalRentalIncomeNGN = inputs.propertyPriceNGN * (inputs.expectedAnnualRentalYieldPercent / 100) * inputs.holdingPeriodYears;

  // Total Return
  const totalReturnNGN = capitalGainNGN + totalRentalIncomeNGN;
  const netProfitNGN = (futurePropertyValueNGN + totalRentalIncomeNGN) - totalAcquisitionCostNGN;
  const totalROIPercent = ((netProfitNGN / totalAcquisitionCostNGN) * 100).toFixed(1);

  return (
    <div className="py-10 bg-[#F7F9FC] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-[#155EEF]/10 border border-[#155EEF]/20 text-[#155EEF] px-3.5 py-1.5 rounded-full text-xs font-bold mb-3">
            <Calculator className="w-4 h-4 text-[#D4A72C]" />
            PrimeEstateJournal Investment Intelligence™
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] font-sans tracking-tight">
            Nigerian Real Estate ROI & Yield Calculator
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Project your total capital appreciation, rental yield, and exact acquisition fees across Lagos, Abuja, and Rivers State. No hidden surprises.
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Controls (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-6">
            <h2 className="text-lg font-bold text-[#0B1F3A] font-sans border-b border-slate-200 pb-3 flex items-center gap-2">
              <Scale className="w-5 h-5 text-[#155EEF]" />
              Investment Parameters
            </h2>

            {/* Base Price Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-700">Property Purchase Price</span>
                <span className="text-[#155EEF] text-sm">
                  {formatPriceByCurrency(inputs.propertyPriceNGN, currency)}
                </span>
              </div>
              <input
                type="range"
                min={10000000}
                max={1000000000}
                step={5000000}
                value={inputs.propertyPriceNGN}
                onChange={(e) => setInputs({ ...inputs, propertyPriceNGN: Number(e.target.value) })}
                className="w-full accent-[#155EEF] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>₦10M</span>
                <span>₦500M</span>
                <span>₦1 Billion</span>
              </div>
            </div>

            {/* Holding Period Tabs */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Holding Period (Years)</label>
              <div className="grid grid-cols-4 gap-2 text-xs">
                {[1, 3, 5, 10].map((yrs) => (
                  <button
                    key={yrs}
                    type="button"
                    onClick={() => setInputs({ ...inputs, holdingPeriodYears: yrs })}
                    className={`py-2 rounded-xl font-bold transition-all ${
                      inputs.holdingPeriodYears === yrs
                        ? 'bg-[#155EEF] text-white shadow-md'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {yrs} {yrs === 1 ? 'Year' : 'Years'}
                  </button>
                ))}
              </div>
            </div>

            {/* Yield & Appreciation Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700">Annual Growth (Appreciation %)</span>
                  <span className="text-emerald-600">{inputs.expectedAnnualAppreciationPercent}% p.a.</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={35}
                  step={0.5}
                  value={inputs.expectedAnnualAppreciationPercent}
                  onChange={(e) => setInputs({ ...inputs, expectedAnnualAppreciationPercent: Number(e.target.value) })}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <p className="text-[10px] text-slate-400">Epe/Ibeju-Lekki: ~22-30% | Ikoyi: ~12-15%</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700">Annual Rental Yield %</span>
                  <span className="text-blue-600">{inputs.expectedAnnualRentalYieldPercent}% p.a.</span>
                </div>
                <input
                  type="range"
                  min={3}
                  max={18}
                  step={0.5}
                  value={inputs.expectedAnnualRentalYieldPercent}
                  onChange={(e) => setInputs({ ...inputs, expectedAnnualRentalYieldPercent: Number(e.target.value) })}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <p className="text-[10px] text-slate-400">Residential: ~6-9% | Short-let: ~12-15%</p>
              </div>

            </div>

            {/* Mandatory Acquisition Charges Checkboxes */}
            <div className="border-t border-slate-200 pt-4 space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Itemized Mandatory Acquisition Fees</h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                
                <label className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inputs.includeLegalFees}
                    onChange={(e) => setInputs({ ...inputs, includeLegalFees: e.target.checked })}
                    className="w-4 h-4 text-[#155EEF] rounded"
                  />
                  <div>
                    <p className="font-bold text-slate-800">5% Deed & Legal Fee</p>
                    <p className="text-[10px] text-slate-500">{formatPriceByCurrency(legalFeeNGN, currency)}</p>
                  </div>
                </label>

                <label className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inputs.includeStampDuty}
                    onChange={(e) => setInputs({ ...inputs, includeStampDuty: e.target.checked })}
                    className="w-4 h-4 text-[#155EEF] rounded"
                  />
                  <div>
                    <p className="font-bold text-slate-800">3% Stamp Duty</p>
                    <p className="text-[10px] text-slate-500">{formatPriceByCurrency(stampDutyNGN, currency)}</p>
                  </div>
                </label>

                <label className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inputs.includeSurveyFees}
                    onChange={(e) => setInputs({ ...inputs, includeSurveyFees: e.target.checked })}
                    className="w-4 h-4 text-[#155EEF] rounded"
                  />
                  <div>
                    <p className="font-bold text-slate-800">Survey Plan Fee</p>
                    <p className="text-[10px] text-slate-500">~₦500,000</p>
                  </div>
                </label>

              </div>
            </div>

          </div>

          {/* Right Results Dashboard (5 Cols) */}
          <div className="lg:col-span-5 bg-white text-slate-900 rounded-2xl border-2 border-[#155EEF]/30 shadow-xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <span className="bg-[#155EEF] text-white font-extrabold text-[10px] px-2.5 py-0.5 rounded uppercase tracking-wider">
                Financial Output
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 font-sans mt-2">
                Projected {inputs.holdingPeriodYears}-Year Outcome
              </h2>
            </div>

            {/* Total ROI Banner */}
            <div className="bg-blue-50/80 border border-blue-200 p-5 rounded-2xl text-center">
              <p className="text-xs text-blue-800 font-bold uppercase tracking-wider">Total Projected Net ROI</p>
              <p className="text-4xl font-extrabold text-emerald-600 font-sans my-1">
                +{totalROIPercent}%
              </p>
              <p className="text-xs text-slate-600">
                Net Profit: <span className="font-extrabold text-slate-900">{formatPriceByCurrency(netProfitNGN, currency)}</span>
              </p>
            </div>

            {/* Itemized Financial Breakdown */}
            <div className="space-y-3 text-xs">
              
              <div className="flex justify-between items-center py-2 border-b border-slate-200">
                <span className="text-slate-600 font-medium">Total All-In Acquisition Cost</span>
                <span className="font-bold text-slate-900">{formatPriceByCurrency(totalAcquisitionCostNGN, currency)}</span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-slate-200">
                <span className="text-slate-600 font-medium">Estimated Resale Property Value</span>
                <span className="font-bold text-emerald-700">{formatPriceByCurrency(futurePropertyValueNGN, currency)}</span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-slate-200">
                <span className="text-slate-600 font-medium">Cumulative Rental Income ({inputs.holdingPeriodYears} yrs)</span>
                <span className="font-bold text-blue-700">{formatPriceByCurrency(totalRentalIncomeNGN, currency)}</span>
              </div>

              <div className="flex justify-between items-center py-2 pt-3 text-sm font-extrabold">
                <span className="text-[#155EEF]">Gross Total Asset Portfolio Value</span>
                <span className="text-[#155EEF]">
                  {formatPriceByCurrency(futurePropertyValueNGN + totalRentalIncomeNGN, currency)}
                </span>
              </div>

            </div>

            {/* Safeguard Note */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1">
              <p className="font-bold text-emerald-700 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Capital Protection Guarantee
              </p>
              <p className="text-slate-600 text-[11px] leading-snug font-medium">
                PrimeEstateJournal only verifies properties with registered titles (C of O, Governor's Consent, Excision Gazette) ensuring your capital appreciates without government acquisition risk.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
