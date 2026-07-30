import React from 'react';
import { useApp } from '../../context/AppContext';
import YieldRecords from '../../components/YieldRecords';
import { TrendingUp, Award, DollarSign } from 'lucide-react';

export default function YieldAnalyticsPage() {
  const { isOnline } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 dark:border-emerald-950 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-stone-900 dark:text-white flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-[#4A7C59]" />
            Yield Analytics & Harvest Ledger
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Log seasonal harvest outputs, track crop yields, and analyze economic performance.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Yield records table & chart */}
        <div className="lg:col-span-8">
          <YieldRecords isOnline={isOnline} />
        </div>

        {/* Cooperative target widget */}
        <div className="lg:col-span-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-emerald-950 rounded-2xl p-5 space-y-4 shadow-sm">
          <div className="flex items-center space-x-2 font-bold text-sm text-stone-850 dark:text-stone-100">
            <Award className="w-4.5 h-4.5 text-[#4A7C59]" />
            <span>Cooperative Milestones</span>
          </div>

          <div className="space-y-4">
            <div className="p-3 bg-stone-50 dark:bg-stone-950 rounded-xl border border-stone-100 dark:border-emerald-950/40">
              <p className="text-[10px] font-mono text-stone-400 uppercase">Season Target</p>
              <div className="flex justify-between items-end mt-1">
                <span className="text-sm font-bold">12.5 Metric Tons</span>
                <span className="text-[10px] text-[#4A7C59] font-bold">85% Achieved</span>
              </div>
              <div className="w-full bg-stone-200 dark:bg-stone-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-[#4A7C59] h-full" style={{ width: '85%' }}></div>
              </div>
            </div>

            <div className="p-3 bg-stone-50 dark:bg-stone-950 rounded-xl border border-stone-100 dark:border-emerald-950/40">
              <p className="text-[10px] font-mono text-stone-400 uppercase">Est. Market Value</p>
              <div className="flex items-center space-x-1.5 mt-1 text-emerald-600 font-bold text-lg">
                <DollarSign className="w-5 h-5 text-emerald-500" />
                <span>$14,820 USD</span>
              </div>
              <p className="text-[9px] text-stone-400 mt-1">Based on local commodity trading price averages.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
