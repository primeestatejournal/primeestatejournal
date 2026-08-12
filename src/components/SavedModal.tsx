import React from 'react';
import { Property } from '../types';
import { X, Bookmark, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';

interface SavedModalProps {
  savedProperties: Property[];
  onClose: () => void;
  onRemoveSaved: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  onInquire: (property: Property) => void;
}

export const SavedModal: React.FC<SavedModalProps> = ({
  savedProperties,
  onClose,
  onRemoveSaved,
  onSelectProperty,
  onInquire
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:px-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-400 fill-amber-400" />
            <h2 className="font-editorial text-xl font-bold">Saved Holdings Portfolio</h2>
            <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-mono">
              {savedProperties.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 flex-1 overflow-y-auto custom-scrollbar">
          {savedProperties.length === 0 ? (
            <div className="py-12 text-center text-slate-500 space-y-3">
              <Bookmark className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-sm font-medium">No properties bookmarked yet.</p>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Click the bookmark icon on any land plot or apartment building card to save it for quick reference and comparison.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {savedProperties.map((p) => (
                <div 
                  key={p.id}
                  className="bg-slate-50 p-3 sm:p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={p.images[0]} 
                      alt={p.title} 
                      referrerPolicy="no-referrer" 
                      className="w-16 h-16 rounded-lg object-cover shrink-0 border border-slate-200"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase text-slate-500">{p.typeLabel}</span>
                        <span className="text-[10px] font-bold uppercase text-emerald-700 flex items-center gap-0.5">
                          <ShieldCheck className="w-3 h-3" /> {p.titleType}
                        </span>
                      </div>
                      <h4 className="font-editorial text-base font-bold text-slate-900">{p.title}</h4>
                      <p className="text-xs text-slate-500">{p.location}, {p.city}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200">
                    <div className="text-left sm:text-right">
                      <div className="font-editorial text-base font-bold text-slate-900">{p.priceFormatted}</div>
                      <div className="text-[10px] text-slate-500">{p.acres ? `${p.acres} Acres` : `${p.unitsCount} Units`}</div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          onClose();
                          onSelectProperty(p);
                        }}
                        className="p-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors"
                        title="View Full Dossier"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onRemoveSaved(p.id)}
                        className="p-2 bg-slate-200 text-slate-600 hover:bg-red-100 hover:text-red-700 rounded-lg text-xs transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
