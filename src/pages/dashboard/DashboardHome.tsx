import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Leaf,
  Sprout,
  MapPin,
  CloudSun,
  Layers,
  TrendingUp,
  History,
  Bell,
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity
} from 'lucide-react';

export default function DashboardHome() {
  const navigate = useNavigate();
  const { activeFarmer, isOnline, notifications } = useApp();

  // Dummy recent diagnoses for dashboard preview (retrieved or fallback)
  const recentDiagnoses = [
    { crop: 'Cocoa', disease: 'Black Pod Rot', date: '2026-06-28', severity: 'High' },
    { crop: 'Maize', disease: 'Maize Rust', date: '2026-06-25', severity: 'Medium' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#1E2F23] to-[#4A7C59] text-white p-6 rounded-3xl relative overflow-hidden shadow-lg">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center space-x-1.5 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-[10px] font-mono uppercase font-bold tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Secure AgriTech Node</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Hello, {activeFarmer?.name || 'Adebayo Mensah'}
          </h2>
          <p className="text-xs text-stone-200/85 max-w-xl">
            Welcome back to your agronomist suite. Local caching is fully synchronized over the {isOnline ? 'Online Google GenAI API' : 'Rural Offline Engine'}.
          </p>
        </div>
        <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-15 flex items-center justify-center pointer-events-none">
          <Sprout className="w-48 h-48 text-[#A7C080]" />
        </div>
      </div>

      {/* KPI Overviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Farm Profile KPI */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-emerald-950 p-5 rounded-2xl space-y-3 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-mono text-stone-600 dark:text-stone-400 font-bold">Primary Field</span>
              <p className="font-bold text-sm text-[#0E2313] dark:text-white truncate">
                {activeFarmer?.farmName || 'Mensah Fields'}
              </p>
            </div>
            <div className="p-2 bg-emerald-100/40 dark:bg-emerald-950 text-[#4A7C59] dark:text-emerald-400 rounded-xl">
              <Sprout className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-center text-xs text-stone-600 dark:text-stone-300 font-mono space-x-1">
            <MapPin className="w-3 h-3 text-[#4A7C59]" />
            <span className="truncate">{activeFarmer?.location || 'Eastern Region, Ghana'}</span>
          </div>
        </div>

        {/* Soil Moisture KPI */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-emerald-950 p-5 rounded-2xl space-y-3 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-mono text-stone-600 dark:text-stone-400 font-bold">Avg Soil Health</span>
              <p className="font-bold text-sm text-[#4A7C59]">Optimal Balanced</p>
            </div>
            <div className="p-2 bg-emerald-100/40 dark:bg-emerald-950 text-[#4A7C59] dark:text-emerald-400 rounded-xl">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <p className="text-[10px] text-stone-600 dark:text-stone-400 font-mono">PH: 6.4 | NPK Levels standard</p>
        </div>

        {/* Weather KPI */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-emerald-950 p-5 rounded-2xl space-y-3 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-mono text-stone-600 dark:text-stone-400 font-bold">Current Weather</span>
              <p className="font-bold text-sm text-[#0E2313] dark:text-white">28°C Rain Forecast</p>
            </div>
            <div className="p-2 bg-emerald-100/40 dark:bg-emerald-950 text-[#4A7C59] dark:text-emerald-400 rounded-xl">
              <CloudSun className="w-4 h-4" />
            </div>
          </div>
          <p className="text-[10px] text-stone-600 dark:text-stone-400 font-mono">Humidity: 84% | Winds SSE 12 km/h</p>
        </div>

        {/* Active Alerts KPI */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-emerald-950 p-5 rounded-2xl space-y-3 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-mono text-stone-600 dark:text-stone-400 font-bold">Alert Center</span>
              <p className="font-bold text-sm text-amber-600">1 Warning Active</p>
            </div>
            <div className="p-2 bg-amber-100/40 dark:bg-amber-950/40 text-amber-500 rounded-xl">
              <Bell className="w-4 h-4 text-amber-500" />
            </div>
          </div>
          <p className="text-[10px] text-stone-600 dark:text-stone-400 font-mono">Soil moisture drop alert</p>
        </div>

      </div>

      {/* Main Grid: Modules & Recent activities */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Summary of diagnostic & satellite */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Diagnostic overview card */}
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-emerald-950 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-bold text-base">Crop Health & Pathogen Scans</h4>
                <p className="text-stone-600 dark:text-stone-400 text-[11px]">Recent botanical scan incidents ledger</p>
              </div>
              <button
                onClick={() => navigate('/dashboard/scanner')}
                className="text-xs font-bold text-[#4A7C59] hover:underline flex items-center space-x-1"
              >
                <span>Launch Scanner</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2">
              {recentDiagnoses.map((item, idx) => (
                <div key={idx} className="p-3 bg-stone-50 dark:bg-stone-950 rounded-xl flex items-center justify-between border border-stone-150 dark:border-emerald-900/40">
                  <div className="flex items-center space-x-3">
                    <Leaf className="w-4 h-4 text-[#4A7C59]" />
                    <div>
                      <p className="text-xs font-bold">{item.crop} - {item.disease}</p>
                      <p className="text-[9px] text-stone-600 dark:text-stone-400 font-mono">{item.date}</p>
                    </div>
                  </div>
                  <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold ${
                    item.severity === 'High' ? 'bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400' : 'bg-amber-100 text-amber-600 dark:bg-amber-950/40'
                  }`}>
                    {item.severity} Risk
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Satellite Telemetry Preview */}
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-emerald-950 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-bold text-base">Geospatial Satellite Telemetry</h4>
                <p className="text-stone-600 dark:text-stone-400 text-[11px]">Copernicus Sentinel-2 NDVI Index values</p>
              </div>
              <button
                onClick={() => navigate('/dashboard/satellite')}
                className="text-xs font-bold text-[#4A7C59] hover:underline flex items-center space-x-1"
              >
                <span>Open Satellite Panel</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="aspect-[21/9] bg-stone-50 dark:bg-stone-950 rounded-2xl border border-dashed border-stone-200 dark:border-emerald-900 flex flex-col items-center justify-center p-4 text-center space-y-2">
              <Layers className="w-8 h-8 text-[#4A7C59] animate-pulse" />
              <p className="text-xs font-bold">Spectral Moisture & Crop Chlorophyll Canopy Map Active</p>
              <p className="text-[10px] text-stone-600 dark:text-stone-400 max-w-sm">
                NDVI levels are calculated at 0.74, indicating optimal density canopy growth.
              </p>
            </div>
          </div>

        </div>

        {/* Right Side: Quick notifications & help */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Notifications Card */}
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-emerald-950 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-sm">System Logs</h4>
              <Bell className="w-4 h-4 text-stone-600 dark:text-stone-400" />
            </div>

            <div className="space-y-3">
              {notifications.slice(0, 3).map((notif) => (
                <div key={notif.id} className="text-xs space-y-1">
                  <div className="flex justify-between items-center font-bold">
                    <span className={notif.type === 'success' ? 'text-emerald-600 dark:text-emerald-450' : 'text-[#0E2313] dark:text-stone-300'}>{notif.title}</span>
                    <span className="text-[9px] text-[#5A6F5A] dark:text-stone-450 font-mono">{notif.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-[#2D4533] dark:text-stone-450 leading-normal">{notif.message}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick AI Assistant Card */}
          <div className="bg-gradient-to-tr from-stone-900 to-[#1E2F23] text-stone-100 rounded-2xl p-6 border border-stone-850 shadow space-y-4">
            <h4 className="font-bold text-sm text-white">AI Botanical Advisor</h4>
            <p className="text-[11px] text-stone-300 leading-relaxed">
              Have questions regarding fertilizer compounds, soil testing formulas, or optimal seed pruning periods? Converse directly with your language-enabled companion.
            </p>
            <button
              onClick={() => navigate('/dashboard/chat')}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center space-x-1 cursor-pointer"
            >
              <span>Converse with Assistant</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
