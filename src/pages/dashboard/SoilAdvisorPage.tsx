import React from 'react';
import SoilAdvisor from '../../components/SoilAdvisor';
import { Compass, Sparkles, BookOpen } from 'lucide-react';

export default function SoilAdvisorPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 dark:border-emerald-950 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-stone-900 dark:text-white flex items-center">
            <Compass className="w-5 h-5 mr-2 text-[#4A7C59]" />
            Soil Advisor & Nutrient Calibrator
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Tune nitrogen, phosphorus, potassium, and soil pH levels to receive optimal organic compound recipes.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Soil Advisor tool */}
        <div className="lg:col-span-8">
          <SoilAdvisor />
        </div>

        {/* Education side panel */}
        <div className="lg:col-span-4 bg-[#1E2F23] text-stone-100 rounded-2xl p-5 space-y-4">
          <div className="flex items-center space-x-2 font-bold text-sm text-emerald-400">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>Agronomist Tip</span>
          </div>

          <p className="text-xs text-stone-300 leading-relaxed">
            Nitrogen (N) promotes leaf canopy size; Phosphorus (P) accelerates root establishment; Potassium (K) safeguards crop cells against erratic frost and dry spells.
          </p>

          <div className="pt-3 border-t border-emerald-900 text-[11px] text-stone-400 space-y-2">
            <div className="flex justify-between font-mono">
              <span>Ideal Cocoa pH:</span>
              <span className="text-emerald-400 font-bold">5.0 - 6.5</span>
            </div>
            <div className="flex justify-between font-mono">
              <span>Ideal Maize pH:</span>
              <span className="text-emerald-400 font-bold">5.8 - 7.0</span>
            </div>
            <div className="flex justify-between font-mono">
              <span>Ideal Cassava pH:</span>
              <span className="text-emerald-400 font-bold">5.5 - 6.5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
