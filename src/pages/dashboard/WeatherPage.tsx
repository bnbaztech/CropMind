import React, { useState } from 'react';
import { CloudSun, CloudRain, Thermometer, Wind, Droplets, AlertTriangle, CloudLightning, Compass } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function WeatherPage() {
  const { theme, activeFarmer } = useApp();
  const [activeAlert, setActiveAlert] = useState(true);

  // Weather variables
  const forecast = [
    { day: 'Monday', temp: '29°C', rain: '10%', desc: 'Sunny Interval', icon: <CloudSun className="w-5 h-5 text-amber-500" /> },
    { day: 'Tuesday', temp: '28°C', rain: '85%', desc: 'Heavy Downpours', icon: <CloudRain className="w-5 h-5 text-blue-500 animate-pulse" /> },
    { day: 'Wednesday', temp: '27°C', rain: '90%', desc: 'Thunderstorms', icon: <CloudLightning className="w-5 h-5 text-purple-500" /> },
    { day: 'Thursday', temp: '29°C', rain: '40%', desc: 'Scattered Showers', icon: <CloudRain className="w-5 h-5 text-blue-400" /> },
    { day: 'Friday', temp: '30°C', rain: '15%', desc: 'Sunny & Warm', icon: <CloudSun className="w-5 h-5 text-amber-500" /> },
    { day: 'Saturday', temp: '31°C', rain: '5%', desc: 'Hot & Clear', icon: <CloudSun className="w-5 h-5 text-amber-500" /> },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 dark:border-emerald-950 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-stone-900 dark:text-white flex items-center">
            <CloudSun className="w-5 h-5 mr-2 text-[#4A7C59]" />
            Weather Intelligence & Microclimate Forecast
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Hyper-localized agricultural forecasting for {activeFarmer?.location || 'Eastern Region, Ghana'}.
          </p>
        </div>
      </div>

      {/* Extreme Weather Alert banner */}
      {activeAlert && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl flex items-start space-x-3 justify-between">
          <div className="flex space-x-2.5">
            <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5 animate-bounce" />
            <div className="text-xs">
              <p className="font-bold uppercase tracking-wider">Heavy Precipitation Advisory</p>
              <p className="mt-0.5 text-red-650 leading-relaxed">
                A localized rain system is approaching from the East on Tuesday afternoon. Potential for up to 45mm of rainfall. We recommend taking preventive drainage measures for young seedlings.
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveAlert(false)}
            className="text-xs font-mono font-bold text-red-600 hover:underline cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Climate Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Core metrics */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-emerald-950 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-stone-600 dark:text-stone-300">Ambient Temperature</span>
            <Thermometer className="w-5 h-5 text-[#4A7C59]" />
          </div>
          <div className="py-4">
            <p className="text-4xl font-black">28.4°C</p>
            <p className="text-[10px] text-stone-400 font-mono mt-1">High: 31.2°C | Low: 22.5°C</p>
          </div>
          <div className="text-[11px] bg-stone-50 dark:bg-stone-950 p-2.5 rounded-lg border border-stone-100 dark:border-emerald-900/40 text-stone-500">
            Optimal temperature for {activeFarmer?.primaryCrop || 'Cocoa'} respiration.
          </div>
        </div>

        {/* Rain probability */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-emerald-950 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-stone-600 dark:text-stone-300">Relative Humidity</span>
            <Droplets className="w-5 h-5 text-blue-500" />
          </div>
          <div className="py-4">
            <p className="text-4xl font-black">84.2%</p>
            <p className="text-[10px] text-stone-400 font-mono mt-1">Soil moisture absorption high</p>
          </div>
          <div className="text-[11px] bg-stone-50 dark:bg-stone-950 p-2.5 rounded-lg border border-stone-100 dark:border-emerald-900/40 text-stone-500">
            High humidity levels increase risk parameters for fungal rust pathogens.
          </div>
        </div>

        {/* Wind velocity */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-emerald-950 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-stone-600 dark:text-stone-300">Wind Direction & Speed</span>
            <Wind className="w-5 h-5 text-stone-400" />
          </div>
          <div className="py-4">
            <p className="text-4xl font-black">12.5 km/h</p>
            <p className="text-[10px] text-stone-400 font-mono mt-1">Bearing SSE &bull; Gentle breeze</p>
          </div>
          <div className="text-[11px] bg-stone-50 dark:bg-stone-950 p-2.5 rounded-lg border border-stone-100 dark:border-emerald-900/40 text-stone-500">
            Standard pollen dispersion parameters. Safe for manual spraying or pruning.
          </div>
        </div>

      </div>

      {/* 6-Day Weekly Forecast ledger */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-emerald-950 rounded-2xl p-6 shadow-sm space-y-4">
        <h4 className="font-bold text-sm">6-Day Farming Activity Calendar</h4>
        
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-4">
          {forecast.map((day, index) => (
            <div key={index} className="p-4 bg-stone-50 dark:bg-stone-950 rounded-xl border border-stone-150 dark:border-emerald-900/30 flex flex-col items-center text-center space-y-2">
              <span className="text-[10px] font-bold text-stone-400 font-mono uppercase">{day.day.slice(0, 3)}</span>
              {day.icon}
              <span className="text-sm font-black text-stone-900 dark:text-white">{day.temp}</span>
              <span className="text-[9px] text-blue-500 font-mono font-bold">Rain: {day.rain}</span>
              <span className="text-[9px] text-stone-500 line-clamp-1">{day.desc}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
