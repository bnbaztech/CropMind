import React from 'react';
import SatelliteMonitor from '../../components/SatelliteMonitor';
import { Layers, Info, Compass } from 'lucide-react';

export default function SatellitePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 dark:border-emerald-950 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-stone-900 dark:text-white flex items-center">
            <Layers className="w-5 h-5 mr-2 text-[#4A7C59]" />
            Geospatial Satellite Earth Observation
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Monitor canopy moisture, soil density indexes, and chlorophyll absorption via Sentinel-2 telemetry.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Satellite monitor widget */}
        <div className="lg:col-span-8">
          <SatelliteMonitor />
        </div>

        {/* Technical index ledger */}
        <div className="lg:col-span-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-emerald-950 rounded-2xl p-5 space-y-4">
          <div className="flex items-center space-x-2 text-stone-800 dark:text-stone-200 font-bold text-sm">
            <Info className="w-4.5 h-4.5 text-[#4A7C59]" />
            <span>Spectral Bands Guide</span>
          </div>

          <div className="space-y-3 text-xs leading-relaxed text-stone-500 dark:text-stone-400">
            <div className="space-y-1">
              <p className="font-bold text-stone-700 dark:text-stone-300">NDVI (Normalized Difference Vegetation Index)</p>
              <p className="text-[11px]">Calculates leaf canopy absorption parameters. Values above 0.6 indicate optimal, healthy chloroplast density.</p>
            </div>

            <div className="space-y-1 border-t pt-2 border-stone-100 dark:border-stone-850">
              <p className="font-bold text-stone-700 dark:text-stone-300">NDMI (Normalized Difference Moisture Index)</p>
              <p className="text-[11px]">Evaluates water stress in the vegetation canopy. Helps pre-empt water starvation before visual dry signals appear.</p>
            </div>

            <div className="space-y-1 border-t pt-2 border-stone-100 dark:border-stone-850">
              <p className="font-bold text-stone-700 dark:text-stone-300">EVI (Enhanced Vegetation Index)</p>
              <p className="text-[11px]">Corrects atmospheric aerosol influences and soil background noise in high biomass density regions.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
