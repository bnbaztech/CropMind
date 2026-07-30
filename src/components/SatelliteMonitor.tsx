import React, { useState } from 'react';
import { SATELLITE_FIELDS } from '../diseaseData';
import { Compass, Thermometer, Droplets, Leaf, ShieldAlert, Sparkles, AlertCircle } from 'lucide-react';
import { SatelliteMetric } from '../types';

export default function SatelliteMonitor() {
  const [selectedFieldId, setSelectedFieldId] = useState<string>('field_alpha');
  const selectedField = SATELLITE_FIELDS.find(f => f.id === selectedFieldId) || SATELLITE_FIELDS[0];

  // Helper to render NDVI color based on index
  const getNdviColor = (ndvi: number) => {
    if (ndvi > 0.7) return 'text-[#4A7C59] bg-[#4A7C59]/5 border-[#4A7C59]/20';
    if (ndvi > 0.4) return 'text-[#92400E] bg-[#D48C45]/5 border-[#D48C45]/20';
    return 'text-red-600 bg-red-50 border border-red-100';
  };

  // Helper to render soil moisture status
  const getMoistureStatus = (moisture: number) => {
    if (moisture > 60) return { label: 'Saturated Paddy', style: 'text-blue-600 bg-blue-50 border border-blue-100' };
    if (moisture > 30) return { label: 'Optimal Moisture', style: 'text-[#4A7C59] bg-[#4A7C59]/5 border-[#4A7C59]/20' };
    return { label: 'Dry / Moisture Deficit', style: 'text-red-600 bg-red-50 border border-red-100' };
  };

  return (
    <div className="bg-white border border-[#E5E2D9] rounded-[32px] p-5 md:p-6 shadow-sm relative overflow-hidden transition-all duration-300 text-[#2D3325]">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2.5">
          <Compass className="w-5 h-5 text-[#4A7C59] animate-spin-slow" />
          <h2 className="font-display font-bold text-[#1E2F23] text-lg">Sentinel-2 Crop Observation</h2>
        </div>
        <span className="text-[10px] font-mono bg-[#E5E2D9] text-[#5A5A40] px-2 py-0.5 rounded-md uppercase tracking-wider">
          Satellite GIS
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Section: Farm Fields List */}
        <div className="lg:col-span-4 flex flex-col space-y-3">
          <span className="text-[10px] font-mono text-[#5A5A40] uppercase tracking-wider">Registered plots:</span>
          {SATELLITE_FIELDS.map((field) => (
            <button
              key={field.id}
              onClick={() => setSelectedFieldId(field.id)}
              className={`w-full text-left p-3.5 rounded-xl border font-sans transition-all duration-200 cursor-pointer ${
                selectedFieldId === field.id
                  ? 'bg-[#FDFCF8] border-[#4A7C59] shadow-sm'
                  : 'bg-white border-[#E5E2D9] hover:bg-[#FDFCF8]/50'
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="font-semibold text-xs text-[#1E2F23] block truncate max-w-[130px]">
                  {field.fieldName}
                </span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                  field.stressLevel === 'None' 
                    ? 'bg-[#4A7C59]/10 text-[#4A7C59]' 
                    : field.stressLevel === 'Medium' 
                      ? 'bg-[#D48C45]/10 text-[#92400E]' 
                      : 'bg-red-50 text-red-600 border border-red-100'
                }`}>
                  {field.stressLevel} STRESS
                </span>
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-[#5A5A40] mt-2 border-t border-[#E5E2D9] pt-1.5">
                <span>Crop: {field.cropType}</span>
                <span>NDVI: <b className="text-[#2D3325] font-bold">{field.ndvi}</b></span>
              </div>
            </button>
          ))}
        </div>

        {/* Center Section: Interactive SVG Radar Imagery Overlay */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          <div className="relative aspect-square rounded-xl bg-[#FDFCF8] border border-[#E5E2D9] flex items-center justify-center overflow-hidden group">
            
            {/* Visual satellite scanning lines */}
            <div className="absolute inset-0 bg-[#E5E2D9]/30 opacity-20 pointer-events-none" />
            
            {/* High-fidelity SVG rendering representing agricultural vegetation index */}
            <svg className="w-[85%] h-[85%] relative z-10" viewBox="0 0 100 100">
              <defs>
                <radialGradient id="radar_sweep" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#4A7C59" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#FDFCF8" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Grid circle elements */}
              <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E2D9" strokeWidth="0.35" strokeDasharray="2 2" />
              <circle cx="50" cy="50" r="30" fill="none" stroke="#E5E2D9" strokeWidth="0.35" strokeDasharray="1 1" />
              <line x1="50" y1="5" x2="50" y2="95" stroke="#E5E2D9" strokeWidth="0.15" />
              <line x1="5" y1="50" x2="95" y2="50" stroke="#E5E2D9" strokeWidth="0.15" />

              {/* Dynamic simulated land parcel bounds depending on chosen field */}
              {selectedFieldId === 'field_alpha' && (
                <path d="M 25,30 L 75,25 L 80,65 L 30,70 Z" fill="rgba(74, 124, 89, 0.4)" stroke="#4A7C59" strokeWidth="1" className="transition-all duration-300" />
              )}
              {selectedFieldId === 'field_beta' && (
                <path d="M 20,40 L 60,35 L 75,75 L 35,80 Z" fill="rgba(212, 140, 69, 0.25)" stroke="#D48C45" strokeWidth="1" className="transition-all duration-300" />
              )}
              {selectedFieldId === 'field_gamma' && (
                <path d="M 15,20 L 85,15 L 70,80 L 30,85 Z" fill="rgba(167, 192, 128, 0.5)" stroke="#4A7C59" strokeWidth="1.2" className="transition-all duration-300" />
              )}
              {selectedFieldId === 'field_delta' && (
                <path d="M 30,35 L 65,40 L 55,70 L 25,60 Z" fill="rgba(239, 68, 68, 0.2)" stroke="#EF4444" strokeWidth="1" className="transition-all duration-300" />
              )}

              {/* Center scanner dot */}
              <circle cx="50" cy="50" r="2" fill="#4A7C59" />
            </svg>

            {/* Sweep radar visual */}
            <div className="absolute inset-0 bg-gradient-radar pointer-events-none animate-spin-slow opacity-15" />

            {/* Live details badge */}
            <div className="absolute top-3 left-3 bg-[#1E2F23]/95 backdrop-blur-sm border border-[#4A7C59]/30 px-2.5 py-1 rounded text-[9px] font-mono text-[#FDFCF8]">
              🛰️ SENTINEL-2A L1C COMPOSITE
            </div>
          </div>
        </div>

        {/* Right Section: Telemetry Metrics & Recommendations */}
        <div className="lg:col-span-3 flex flex-col space-y-4">
          
          <div className="bg-[#FDFCF8] border border-[#E5E2D9] rounded-xl p-4 flex flex-col justify-between">
            <span className="text-[10px] font-mono text-[#5A5A40] uppercase tracking-wider block mb-2">Remote Telemetry</span>
            
            <div className="space-y-3">
              
              {/* Metric: NDVI */}
              <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-2">
                <div className="flex items-center space-x-2">
                  <Leaf className="w-4 h-4 text-[#4A7C59]" />
                  <span className="text-xs text-[#2D3325] font-sans">NDVI Vigor</span>
                </div>
                <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${getNdviColor(selectedField.ndvi)}`}>
                  {selectedField.ndvi}
                </span>
              </div>

              {/* Metric: Moisture */}
              <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-2">
                <div className="flex items-center space-x-2">
                  <Droplets className="w-4 h-4 text-blue-500" />
                  <span className="text-xs text-[#2D3325] font-sans">Soil Moisture</span>
                </div>
                <span className="text-xs text-[#2D3325] font-mono font-bold">
                  {selectedField.soilMoisture}%
                </span>
              </div>

              {/* Metric: Canopy Temp */}
              <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-2">
                <div className="flex items-center space-x-2">
                  <Compass className="w-4 h-4 text-[#5A5A40]" />
                  <span className="text-xs text-[#2D3325] font-sans">Canopy Temp</span>
                </div>
                <span className="text-xs text-[#2D3325] font-mono font-bold">
                  {selectedField.canopyTemp}°C
                </span>
              </div>

            </div>
          </div>

          {/* Action Recommendations */}
          <div className="bg-[#FDFCF8] border border-[#E5E2D9] rounded-xl p-4 flex-1">
            <span className="text-[10px] font-mono text-[#5A5A40] uppercase tracking-wider block mb-2">Agronomist Alerts</span>
            
            <div className="space-y-2">
              {selectedField.waterStress ? (
                <div className="bg-red-50 border border-red-100 rounded-lg p-2.5 flex items-start space-x-1.5 text-red-800">
                  <ShieldAlert className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold block">Drought Stress Detected</span>
                    <p className="text-[10px] text-[#5A5A40] leading-normal mt-0.5">
                      Moisture levels dropped to {selectedField.soilMoisture}%. Drip-irrigate in the early evening to optimize transpiration.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-[#4A7C59]/10 border border-[#4A7C59]/20 rounded-lg p-2.5 flex items-start space-x-1.5 text-[#4A7C59]">
                  <Droplets className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold block">Moisture Stable</span>
                    <p className="text-[10px] text-[#5A5A40] leading-normal mt-0.5">
                      No irrigation deficits logged. Moisture indexes match growth requirements perfectly.
                    </p>
                  </div>
                </div>
              )}

              {selectedField.nitrogenDeficit ? (
                <div className="bg-[#D48C45]/10 border border-[#D48C45]/20 rounded-lg p-2.5 flex items-start space-x-1.5 text-[#92400E]">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold block">Nitrogen Deficit Alert</span>
                    <p className="text-[10px] text-[#5A5A40] leading-normal mt-0.5">
                      Chlorophyll reflectance indexes suggest early-stage leaf yellowing. Apply composted manure before next rain.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-white border border-[#E5E2D9] rounded-lg p-2.5 flex items-start space-x-1.5 text-[#5A5A40]">
                  <Sparkles className="w-3.5 h-3.5 text-[#4A7C59] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold block text-[#1E2F23]">Nutrients Normal</span>
                    <p className="text-[10px] text-[#5A5A40] leading-normal mt-0.5">
                      Crop canopy indicates robust protein synthesis.
                    </p>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
