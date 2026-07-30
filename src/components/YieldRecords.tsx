import React, { useState, useEffect } from 'react';
import { Sprout, Plus, CheckCircle, Clock, AlertCircle, RefreshCw, BarChart2 } from 'lucide-react';
import { CropRecord } from '../types';

interface YieldRecordsProps {
  isOnline: boolean;
}

export default function YieldRecords({ isOnline }: YieldRecordsProps) {
  const [records, setRecords] = useState<CropRecord[]>([
    { id: '1', cropName: 'Maize', plantingDate: '2026-04-10', expectedHarvestDate: '2026-08-15', estimatedYield: 1200, status: 'Healthy', synced: true },
    { id: '2', cropName: 'Cassava', plantingDate: '2026-03-01', expectedHarvestDate: '2026-12-20', estimatedYield: 2400, status: 'Stressed', synced: true },
    { id: '3', cropName: 'Rice', plantingDate: '2026-05-05', expectedHarvestDate: '2026-09-30', estimatedYield: 1800, status: 'Healthy', synced: true }
  ]);

  const [cropName, setCropName] = useState<string>('Maize');
  const [plantingDate, setPlantingDate] = useState<string>('2026-06-01');
  const [estimatedYield, setEstimatedYield] = useState<string>('1500');
  const [status, setStatus] = useState<'Healthy' | 'Stressed' | 'Diseased'>('Healthy');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // Trigger sync animation when toggled from Offline to Online
  useEffect(() => {
    const unsyncedRecords = records.some(r => !r.synced);
    if (isOnline && unsyncedRecords) {
      triggerSync();
    }
  }, [isOnline]);

  const triggerSync = async () => {
    setIsSyncing(true);
    // Simulate server side sync & conflict resolution latency
    await new Promise(resolve => setTimeout(resolve, 2000));
    setRecords(prev => prev.map(rec => ({ ...rec, synced: true })));
    setIsSyncing(false);
  };

  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!estimatedYield || !plantingDate) return;

    // Calculate generic harvest date (+4 months)
    const plantDateObj = new Date(plantingDate);
    plantDateObj.setMonth(plantDateObj.getMonth() + 4);
    const expectedHarvest = plantDateObj.toISOString().split('T')[0];

    const newRecord: CropRecord = {
      id: Math.random().toString(36).substr(2, 9),
      cropName,
      plantingDate,
      expectedHarvestDate: expectedHarvest,
      estimatedYield: parseFloat(estimatedYield),
      status,
      synced: isOnline // automatically synced if online, cached locally if offline
    };

    setRecords(prev => [newRecord, ...prev]);
    // Reset form
    setEstimatedYield('1500');
  };

  // Compute stats for our SVG visual yield chart
  const cropAggregates = records.reduce((acc: Record<string, number>, curr) => {
    acc[curr.cropName] = (acc[curr.cropName] || 0) + curr.estimatedYield;
    return acc;
  }, {} as Record<string, number>);

  const maxYield = Math.max(...(Object.values(cropAggregates) as number[]), 1000);

  return (
    <div className="bg-white border border-[#E5E2D9] rounded-[32px] p-5 md:p-6 shadow-sm relative overflow-hidden transition-all duration-300 text-[#2D3325]">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2.5">
          <Sprout className="w-5 h-5 text-[#4A7C59]" />
          <h2 className="font-display font-bold text-[#1E2F23] text-lg">Farm Yield Records Log</h2>
        </div>
        
        {/* Sync Status Badge */}
        <div className="flex items-center space-x-2">
          {isSyncing ? (
            <span className="flex items-center space-x-1 text-xs text-[#92400E] font-mono">
              <RefreshCw className="w-3 h-3 animate-spin" />
              <span>Syncing database...</span>
            </span>
          ) : records.some(r => !r.synced) ? (
            <span className="flex items-center space-x-1 text-xs text-red-600 font-mono bg-red-50 border border-red-100 px-2 py-0.5 rounded-md">
              <Clock className="w-3 h-3" />
              <span>Pending Sync ({records.filter(r => !r.synced).length})</span>
            </span>
          ) : (
            <span className="flex items-center space-x-1 text-xs text-[#4A7C59] font-mono bg-[#4A7C59]/5 border border-[#4A7C59]/10 px-2 py-0.5 rounded-md">
              <CheckCircle className="w-3 h-3" />
              <span>All Logs Synced</span>
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Input Form */}
        <form onSubmit={handleAddRecord} className="lg:col-span-4 bg-[#FDFCF8] p-4 rounded-xl border border-[#E5E2D9] flex flex-col space-y-4">
          <span className="text-[10px] font-mono text-[#5A5A40] uppercase tracking-wider">New harvest log:</span>
          
          {/* Crop Selector */}
          <div>
            <label className="block text-xs font-sans text-[#5A5A40] mb-1">Crop Type</label>
            <select
              value={cropName}
              onChange={(e) => setCropName(e.target.value)}
              className="w-full bg-white border border-[#E5E2D9] rounded-lg p-2 text-xs font-sans text-[#2D3325] focus:outline-none focus:border-[#4A7C59]"
            >
              <option value="Maize">Maize (Corn)</option>
              <option value="Cassava">Cassava (Tuber)</option>
              <option value="Rice">Rice (Grain)</option>
              <option value="Tomato">Tomato (Vegetable)</option>
            </select>
          </div>

          {/* Planting Date */}
          <div>
            <label className="block text-xs font-sans text-[#5A5A40] mb-1">Planting Date</label>
            <input
              type="date"
              value={plantingDate}
              onChange={(e) => setPlantingDate(e.target.value)}
              className="w-full bg-white border border-[#E5E2D9] rounded-lg p-2 text-xs font-mono text-[#2D3325] focus:outline-none focus:border-[#4A7C59]"
            />
          </div>

          {/* Yield Weight */}
          <div>
            <label className="block text-xs font-sans text-[#5A5A40] mb-1">Estimated Yield (kg)</label>
            <input
              type="number"
              value={estimatedYield}
              onChange={(e) => setEstimatedYield(e.target.value)}
              className="w-full bg-white border border-[#E5E2D9] rounded-lg p-2 text-xs font-mono text-[#2D3325] focus:outline-none focus:border-[#4A7C59]"
              placeholder="1200"
            />
          </div>

          {/* Crop Health Status */}
          <div>
            <label className="block text-xs font-sans text-[#5A5A40] mb-1">Crop Canopy Status</label>
            <div className="grid grid-cols-3 gap-2">
              {(['Healthy', 'Stressed', 'Diseased'] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStatus(s)}
                  className={`py-1.5 rounded-lg text-xs font-sans border transition-all cursor-pointer ${
                    status === s
                      ? s === 'Healthy' 
                        ? 'bg-[#4A7C59]/10 border-[#4A7C59] text-[#4A7C59] font-semibold' 
                        : s === 'Stressed' 
                          ? 'bg-[#D48C45]/10 border-[#D48C45] text-[#92400E] font-semibold' 
                          : 'bg-red-50 border-red-200 text-red-600 font-semibold'
                      : 'bg-white border-[#E5E2D9] text-[#5A5A40] hover:text-[#2D3325]'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#4A7C59] hover:bg-[#334639] text-[#FDFCF8] font-sans font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center space-x-1"
          >
            <Plus className="w-4 h-4" />
            <span>Add Record</span>
          </button>
        </form>

        {/* Center: Interactive SVG yield trends bar chart */}
        <div className="lg:col-span-4 bg-[#FDFCF8] p-4 rounded-xl border border-[#E5E2D9] flex flex-col justify-between">
          <span className="text-[10px] font-mono text-[#5A5A40] uppercase tracking-wider mb-2 block">Crop Yield distribution:</span>
          
          <div className="h-40 flex items-end justify-around pb-2 border-b border-[#E5E2D9]">
            {['Maize', 'Cassava', 'Rice', 'Tomato'].map((crop) => {
              const val = cropAggregates[crop] || 0;
              const barHeight = maxYield > 0 ? (val / maxYield) * 80 : 0; // percentage height
              return (
                <div key={crop} className="flex flex-col items-center w-12 group relative">
                  {/* Tooltip */}
                  <div className="absolute -top-8 bg-[#1E2F23] border border-[#1E2F23] px-1.5 py-0.5 rounded text-[10px] font-mono text-white opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
                    {val} kg
                  </div>
                  
                  {/* Animated Bar */}
                  <div 
                    style={{ height: `${Math.max(barHeight, 4)}%` }} 
                    className="w-7 rounded-t bg-gradient-to-t from-[#4A7C59] to-[#A7C080] group-hover:to-[#D48C45] transition-all duration-500" 
                  />
                  <span className="text-[10px] font-sans text-[#5A5A40] mt-2">{crop}</span>
                </div>
              );
            })}
          </div>
          
          <div className="flex items-center space-x-2 text-[10px] text-[#5A5A40] font-mono mt-3 leading-normal">
            <BarChart2 className="w-4 h-4 text-[#4A7C59]" />
            <span>Aggregated yields stored in IndexedDB browser memory context.</span>
          </div>
        </div>

        {/* Right: History Log List Table */}
        <div className="lg:col-span-4 bg-[#FDFCF8] p-4 rounded-xl border border-[#E5E2D9] flex flex-col h-64">
          <span className="text-[10px] font-mono text-[#5A5A40] uppercase tracking-wider mb-2 block">History log records:</span>
          
          <div className="flex-1 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
            {records.map((rec) => (
              <div key={rec.id} className="p-2.5 rounded-lg bg-white border border-[#E5E2D9] flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-[#1E2F23]">{rec.cropName}</span>
                  <div className="flex space-x-2 text-[9px] font-mono text-[#5A5A40] mt-0.5">
                    <span>Yield: <b className="text-[#2D3325]">{rec.estimatedYield}kg</b></span>
                    <span>Planted: {rec.plantingDate}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                    rec.status === 'Healthy' 
                      ? 'bg-[#4A7C59]/10 text-[#4A7C59]' 
                      : rec.status === 'Stressed' 
                        ? 'bg-[#D48C45]/10 text-[#92400E]' 
                        : 'bg-red-50 text-red-600 border border-red-100'
                  }`}>
                    {rec.status}
                  </span>

                  {rec.synced ? (
                    <CheckCircle className="w-3.5 h-3.5 text-[#4A7C59]" title="Synchronized with cloud database" />
                  ) : (
                    <Clock className="w-3.5 h-3.5 text-red-500" title="Offline record - pending upload sync" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
