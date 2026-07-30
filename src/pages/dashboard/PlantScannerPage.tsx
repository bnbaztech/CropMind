import React from 'react';
import { useApp } from '../../context/AppContext';
import PlantScanner from '../../components/PlantScanner';
import { Leaf, Info, HelpCircle } from 'lucide-react';

export default function PlantScannerPage() {
  const { isOnline, language } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 dark:border-emerald-950 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-stone-900 dark:text-white flex items-center">
            <Leaf className="w-5 h-5 mr-2 text-[#4A7C59]" />
            AI Crop Leaf Disease Scanner
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Submit a raw leaf photograph to classify plant pathogens instantly using Google Gemini.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main scanner area */}
        <div className="lg:col-span-8">
          <PlantScanner isOnline={isOnline} language={language} />
        </div>

        {/* Informational Guidelines Panel */}
        <div className="lg:col-span-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-emerald-950 rounded-2xl p-5 space-y-4">
          <div className="flex items-center space-x-2 text-stone-800 dark:text-stone-200 font-bold text-sm">
            <Info className="w-4.5 h-4.5 text-[#4A7C59]" />
            <span>Scanning Guidelines</span>
          </div>
          
          <ul className="text-xs text-stone-500 dark:text-stone-400 space-y-3 list-disc pl-4 leading-relaxed">
            <li>
              <b>Direct Sunlit Exposure:</b> Ensure optimal illumination on leaf veins to capture subtle spot patterns.
            </li>
            <li>
              <b>Centred Focus:</b> Isolate the symptomatic leaf, avoiding background soil, weeds, or hand shadows.
            </li>
            <li>
              <b>Single-Leaf Crop:</b> CropMind scans work best when analyzing single leaves displaying visible rust, mosaic, or necrosis.
            </li>
            <li>
              <b>Offline Buffer:</b> If offline, CropMind caches scanned records. They will sync automatically when server connection is restored.
            </li>
          </ul>

          <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-start space-x-2">
            <HelpCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="text-[10px] text-stone-400 leading-normal">
              Need diagnostics for specialty tree bark, roots, or soil profiles? Please utilize the <b>Soil Advisor</b> or consult the cooperative agronomist helpdesk.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
