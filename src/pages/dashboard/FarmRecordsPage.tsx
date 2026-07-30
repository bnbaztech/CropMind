import React from 'react';
import FarmerPortal from '../../components/FarmerPortal';
import { Database, FileText, Globe } from 'lucide-react';

export default function FarmRecordsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 dark:border-emerald-950 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-stone-900 dark:text-white flex items-center">
            <Database className="w-5 h-5 mr-2 text-[#4A7C59]" />
            Farm Records & Cooperative History Ledger
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Access secure local incident tables, log crop diagnostic outcomes, and manage cooperative registrations.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-emerald-950 rounded-[28px] overflow-hidden p-1 shadow-sm">
        <FarmerPortal onClose={() => {}} onFarmerStatusChange={() => {}} />
      </div>
    </div>
  );
}
