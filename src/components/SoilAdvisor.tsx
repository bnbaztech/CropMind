import React, { useState } from 'react';
import { Sprout, RefreshCw, Layers, Droplets, FlaskConical, CircleAlert, Sparkles } from 'lucide-react';

export default function SoilAdvisor() {
  const [ph, setPh] = useState<number>(6.2);
  const [nitrogen, setNitrogen] = useState<number>(24); // ppm
  const [phosphorus, setPhosphorus] = useState<number>(12); // ppm
  const [potassium, setPotassium] = useState<number>(115); // ppm
  const [soilMoisture, setSoilMoisture] = useState<number>(25); // %

  const [advice, setAdvice] = useState<any | null>(null);

  const calculateRecommendations = () => {
    // Basic diagnostic algorithms for agricultural soil chemistry
    let phDiagnostic = '';
    let phRemedy = '';
    let phSeverity: 'Good' | 'Medium' | 'Critical' = 'Good';

    if (ph < 5.5) {
      phDiagnostic = 'Strongly Acidic: Prevents efficient intake of phosphorus, calcium, and magnesium.';
      phRemedy = 'Apply Agricultural Lime (calcium carbonate) at 50kg per 100 sq. meters, or incorporate organic wood ash which is alkaline and fast-acting.';
      phSeverity = 'Critical';
    } else if (ph > 7.5) {
      phDiagnostic = 'Alkaline Soil: Restricts absorption of iron, manganese, and zinc.';
      phRemedy = 'Incorporate organic elemental sulfur or decayed peat moss to slowly lower the pH. Avoid alkaline irrigation water.';
      phSeverity = 'Medium';
    } else {
      phDiagnostic = 'Neutral / Optimal: Perfectly configured for staple crops like maize, rice, and beans.';
      phRemedy = 'Maintain active organic compost layering to preserve natural buffered biological activity.';
      phSeverity = 'Good';
    }

    let nDiagnostic = '';
    let nRemedy = '';
    if (nitrogen < 30) {
      nDiagnostic = 'Deficient';
      nRemedy = 'Apply composted chicken or goat manure (nitrogen-dense). Alternatively, intercrop with cowpeas, groundnuts, or pigeon peas which host nitrogen-fixing rhizobia bacteria in root nodules.';
    } else {
      nDiagnostic = 'Normal';
      nRemedy = 'No active nitrogen dressing is needed. Avoid excessive nitrogen which leads to soft stem growth susceptible to pest lodging.';
    }

    let pDiagnostic = '';
    let pRemedy = '';
    if (phosphorus < 15) {
      pDiagnostic = 'Deficient';
      pRemedy = 'Add organic crushed bone meal or soft phosphate rock. This stimulates healthy early root development and panicle formation in grains.';
    } else {
      pDiagnostic = 'Normal';
      pRemedy = 'Phosphorus reserves are balanced. Crop seedbeds are stable.';
    }

    let kDiagnostic = '';
    let kRemedy = '';
    if (potassium < 120) {
      kDiagnostic = 'Deficient';
      kRemedy = 'Apply natural wood ash or organic cocoa pod husk ash. Potassium is vital for cell wall strength, water retention, and viral pathogen resistance.';
    } else {
      kDiagnostic = 'Normal';
      kRemedy = 'Potassium index is optimal. Cell walls are sufficiently resilient.';
    }

    // Irrigation adviser based on current moisture and pH
    let waterCycles = '';
    if (soilMoisture < 20) {
      waterCycles = 'Critical dry index: Drip-irrigate immediately for 45 minutes. Water deep at dawn or dusk. Mulch roots with straw to reduce evaporation.';
    } else if (soilMoisture < 45) {
      waterCycles = 'Moisture normal: Irrigate light every 3 days. Monitor rainfall indices.';
    } else {
      waterCycles = 'Sufficient moisture: Hold off irrigation. Soil has reached optimal field capacity.';
    }

    setAdvice({
      phDiagnostic,
      phRemedy,
      phSeverity,
      nitrogen: { status: nDiagnostic, remedy: nRemedy },
      phosphorus: { status: pDiagnostic, remedy: pRemedy },
      potassium: { status: kDiagnostic, remedy: kRemedy },
      waterCycles
    });
  };

  return (
    <div className="bg-white border border-[#E5E2D9] rounded-[32px] p-5 md:p-6 shadow-sm relative overflow-hidden transition-all duration-300 text-[#2D3325]">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2.5">
          <FlaskConical className="w-5 h-5 text-[#4A7C59]" />
          <h2 className="font-display font-bold text-[#1E2F23] text-lg">Soil Health Recommender</h2>
        </div>
        <span className="text-[10px] font-mono bg-[#E5E2D9] text-[#5A5A40] px-2 py-0.5 rounded-md uppercase tracking-wider">
          Decision Engine
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Input Parameters Sliders */}
        <div className="md:col-span-5 flex flex-col space-y-4 bg-[#FDFCF8] border border-[#E5E2D9] p-4 rounded-xl">
          <span className="text-[10px] font-mono text-[#5A5A40] uppercase tracking-wider">Soil Chemistry Data:</span>
          
          {/* pH slider */}
          <div>
            <div className="flex justify-between text-xs font-sans text-[#2D3325] mb-1">
              <span>Soil pH Index</span>
              <span className="font-mono text-[#4A7C59] font-bold">{ph}</span>
            </div>
            <input
              type="range"
              min="4"
              max="9"
              step="0.1"
              value={ph}
              onChange={(e) => { setPh(parseFloat(e.target.value)); setAdvice(null); }}
              className="w-full accent-[#4A7C59] h-1.5 bg-[#E5E2D9] rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-[#5A5A40]/75 font-mono mt-0.5">
              <span>4.0 (Acidic)</span>
              <span>7.0 (Neutral)</span>
              <span>9.0 (Alkaline)</span>
            </div>
          </div>

          {/* Nitrogen N */}
          <div>
            <div className="flex justify-between text-xs font-sans text-[#2D3325] mb-1">
              <span>Nitrogen (N)</span>
              <span className="font-mono text-[#4A7C59] font-bold">{nitrogen} ppm</span>
            </div>
            <input
              type="range"
              min="5"
              max="60"
              value={nitrogen}
              onChange={(e) => { setNitrogen(parseInt(e.target.value)); setAdvice(null); }}
              className="w-full accent-[#4A7C59] h-1.5 bg-[#E5E2D9] rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Phosphorus P */}
          <div>
            <div className="flex justify-between text-xs font-sans text-[#2D3325] mb-1">
              <span>Phosphorus (P)</span>
              <span className="font-mono text-[#4A7C59] font-bold">{phosphorus} ppm</span>
            </div>
            <input
              type="range"
              min="2"
              max="40"
              value={phosphorus}
              onChange={(e) => { setPhosphorus(parseInt(e.target.value)); setAdvice(null); }}
              className="w-full accent-[#4A7C59] h-1.5 bg-[#E5E2D9] rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Potassium K */}
          <div>
            <div className="flex justify-between text-xs font-sans text-[#2D3325] mb-1">
              <span>Potassium (K)</span>
              <span className="font-mono text-[#4A7C59] font-bold">{potassium} ppm</span>
            </div>
            <input
              type="range"
              min="40"
              max="250"
              value={potassium}
              onChange={(e) => { setPotassium(parseInt(e.target.value)); setAdvice(null); }}
              className="w-full accent-[#4A7C59] h-1.5 bg-[#E5E2D9] rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Soil Moisture */}
          <div>
            <div className="flex justify-between text-xs font-sans text-[#2D3325] mb-1">
              <span>Soil Moisture</span>
              <span className="font-mono text-[#4A7C59] font-bold">{soilMoisture}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={soilMoisture}
              onChange={(e) => { setSoilMoisture(parseInt(e.target.value)); setAdvice(null); }}
              className="w-full accent-[#4A7C59] h-1.5 bg-[#E5E2D9] rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Calculate Button */}
          <button
            onClick={calculateRecommendations}
            className="w-full bg-[#4A7C59] hover:bg-[#334639] text-white font-sans font-bold py-2.5 rounded-xl text-xs shadow-sm transition-all cursor-pointer flex items-center justify-center space-x-1"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Generate Organic Recipes</span>
          </button>
        </div>

        {/* Output Diagnostic Recommendations */}
        <div className="md:col-span-7 flex flex-col justify-between min-h-[250px]">
          
          {!advice ? (
            <div className="flex flex-col items-center justify-center h-full border border-dashed border-[#E5E2D9] rounded-xl p-6 text-center bg-[#FDFCF8]">
              <Sprout className="w-10 h-10 text-[#5A5A40] stroke-[1.5] mb-2" />
              <p className="text-xs font-sans text-[#5A5A40]">
                Adjust the soil chemistry parameters and click &quot;Generate Organic Recipes&quot; to compute dynamic, low-cost agronomist fertilizer and irrigation guidelines.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              
              {/* pH Diagnostics Warning block */}
              <div className={`p-3.5 rounded-xl border flex items-start space-x-2 text-xs font-sans ${
                advice.phSeverity === 'Critical'
                  ? 'bg-red-50 border-red-200 text-red-800 bg-opacity-5'
                  : advice.phSeverity === 'Medium'
                    ? 'bg-amber-50 border-amber-200 text-amber-800 bg-opacity-5'
                    : 'bg-[#4A7C59]/5 border-[#4A7C59]/20 text-[#4A7C59]'
              }`}>
                <CircleAlert className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">pH Diagnosis:</span>
                  <p className="text-[#2D3325] text-[11px] leading-relaxed mt-0.5">{advice.phDiagnostic}</p>
                  <p className="text-[#1E2F23] font-medium text-[11px] leading-relaxed mt-1.5 border-t border-[#E5E2D9] pt-1">
                    <b>Organic Action:</b> {advice.phRemedy}
                  </p>
                </div>
              </div>

              {/* NPK Deficiencies Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                {/* Nitrogen Diagnostic */}
                <div className="bg-[#FDFCF8] border border-[#E5E2D9] p-3 rounded-lg">
                  <span className="text-[9px] font-mono text-[#5A5A40] block uppercase">Nitrogen (N)</span>
                  <span className={`text-xs font-sans font-bold block mt-0.5 ${advice.nitrogen.status === 'Deficient' ? 'text-[#D48C45]' : 'text-[#4A7C59]'}`}>
                    {advice.nitrogen.status}
                  </span>
                  <p className="text-[10px] text-[#5A5A40] leading-normal mt-1 border-t border-[#E5E2D9] pt-1">
                    {advice.nitrogen.remedy}
                  </p>
                </div>

                {/* Phosphorus Diagnostic */}
                <div className="bg-[#FDFCF8] border border-[#E5E2D9] p-3 rounded-lg">
                  <span className="text-[9px] font-mono text-[#5A5A40] block uppercase">Phosphorus (P)</span>
                  <span className={`text-xs font-sans font-bold block mt-0.5 ${advice.phosphorus.status === 'Deficient' ? 'text-[#D48C45]' : 'text-[#4A7C59]'}`}>
                    {advice.phosphorus.status}
                  </span>
                  <p className="text-[10px] text-[#5A5A40] leading-normal mt-1 border-t border-[#E5E2D9] pt-1">
                    {advice.phosphorus.remedy}
                  </p>
                </div>

                {/* Potassium Diagnostic */}
                <div className="bg-[#FDFCF8] border border-[#E5E2D9] p-3 rounded-lg">
                  <span className="text-[9px] font-mono text-[#5A5A40] block uppercase">Potassium (K)</span>
                  <span className={`text-xs font-sans font-bold block mt-0.5 ${advice.potassium.status === 'Deficient' ? 'text-[#D48C45]' : 'text-[#4A7C59]'}`}>
                    {advice.potassium.status}
                  </span>
                  <p className="text-[10px] text-[#5A5A40] leading-normal mt-1 border-t border-[#E5E2D9] pt-1">
                    {advice.potassium.remedy}
                  </p>
                </div>

              </div>

              {/* Irrigation Guidelines */}
              <div className="bg-[#FDFCF8] border border-[#E5E2D9] p-3 rounded-xl flex items-start space-x-2">
                <Droplets className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                <div className="text-xs font-sans">
                  <span className="font-bold text-[#1E2F23] block">Watering & Irrigation Cycle Advice</span>
                  <p className="text-[#5A5A40] text-[11px] leading-relaxed mt-0.5">{advice.waterCycles}</p>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
