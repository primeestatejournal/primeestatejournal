import React from 'react';
import { Property } from '../types';
import { X, ShieldCheck, Trash2, ArrowRight } from 'lucide-react';

interface CompareModalProps {
  properties: Property[];
  onClose: () => void;
  onRemoveFromCompare: (id: string) => void;
  onSelectProperty: (property: Property) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  properties,
  onClose,
  onRemoveFromCompare,
  onSelectProperty
}) => {
  if (!properties || properties.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div 
        className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:px-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div>
            <h2 className="font-editorial text-xl sm:text-2xl font-bold">Side-by-Side Property Matrix</h2>
            <p className="text-xs text-slate-400">Comparing {properties.length} prime holdings</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Grid */}
        <div className="flex-1 overflow-x-auto p-4 sm:p-6 custom-scrollbar">
          <table className="w-full text-left text-xs border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="p-3 w-40 text-slate-400 uppercase font-bold text-[10px] tracking-wider">Attribute</th>
                {properties.map((p) => (
                  <th key={p.id} className="p-3 w-64 align-top">
                    <div className="relative group rounded-xl overflow-hidden bg-slate-100 mb-2 aspect-[16/10]">
                      <img src={p.images[0]} alt={p.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                      <button
                        onClick={() => onRemoveFromCompare(p.id)}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-900/80 text-white hover:bg-red-600 transition-colors"
                        title="Remove from comparison"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="font-editorial text-base font-bold text-slate-900 line-clamp-1">{p.title}</div>
                    <div className="text-amber-700 font-bold text-sm">{p.priceFormatted}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-3 font-semibold text-slate-500">Category</td>
                {properties.map((p) => (
                  <td key={p.id} className="p-3 font-medium text-slate-900">{p.typeLabel}</td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-500">Location</td>
                {properties.map((p) => (
                  <td key={p.id} className="p-3 font-medium text-slate-800">{p.location}, {p.city}</td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-500">Size / Units</td>
                {properties.map((p) => (
                  <td key={p.id} className="p-3 font-bold text-slate-900">
                    {p.acres ? `${p.acres} Acres` : p.unitsCount ? `${p.unitsCount} Units` : `${p.sqft?.toLocaleString()} Sq.Ft`}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-500">Title Document</td>
                {properties.map((p) => (
                  <td key={p.id} className="p-3">
                    <span className="inline-flex items-center gap-1 font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      {p.titleType}
                    </span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-500">Deed Ref #</td>
                {properties.map((p) => (
                  <td key={p.id} className="p-3 font-mono text-slate-700">{p.titleNumber}</td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-500">Zoning Designation</td>
                {properties.map((p) => (
                  <td key={p.id} className="p-3 text-slate-800">{p.zoning}</td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-500">Yield / ROI</td>
                {properties.map((p) => (
                  <td key={p.id} className="p-3 font-bold text-emerald-700">
                    {p.capRate || p.projectedROI || 'Capital Appreciation'}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-500">Escrow Ready</td>
                {properties.map((p) => (
                  <td key={p.id} className="p-3 font-medium text-slate-900">
                    {p.escrowAvailable ? 'Yes (Verified)' : 'Standard Bank Transfer'}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-500">Actions</td>
                {properties.map((p) => (
                  <td key={p.id} className="p-3">
                    <button
                      onClick={() => {
                        onClose();
                        onSelectProperty(p);
                      }}
                      className="px-3 py-1.5 bg-slate-900 text-white rounded font-semibold text-xs hover:bg-slate-800 transition-colors flex items-center gap-1"
                    >
                      <span>Full Dossier</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};
