import React from 'react';
import { Leaf, Wifi, WifiOff, Globe, BookOpen, User } from 'lucide-react';
import { SupportedLanguage, Farmer } from '../types';

interface HeaderProps {
  currentLanguage: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  isOnline: boolean;
  setIsOnline: (status: boolean) => void;
  showBlueprint: boolean;
  setShowBlueprint: (show: boolean) => void;
  activeFarmer: Farmer | null;
  onFarmerPortalClick: () => void;
}

const LANGUAGES = [
  { code: 'en', name: 'English', local: 'English', flag: '🇬🇧' },
  { code: 'sw', name: 'Swahili', local: 'Kiswahili', flag: '🇰🇪' },
  { code: 'ha', name: 'Hausa', local: 'Harshen Hausa', flag: '🇳🇬' },
  { code: 'yo', name: 'Yoruba', local: 'Èdè Yorùbá', flag: '🇳🇬' },
  { code: 'ig', name: 'Igbo', local: 'Asụsụ Igbo', flag: '🇳🇬' },
  { code: 'fr', name: 'French', local: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'Arabic', local: 'العربية', flag: '🇸🇩' },
];

export default function Header({
  currentLanguage,
  setLanguage,
  isOnline,
  setIsOnline,
  showBlueprint,
  setShowBlueprint,
  activeFarmer,
  onFarmerPortalClick,
}: HeaderProps) {
  return (
    <header className="border-b border-[#E5E2D9] bg-white sticky top-0 z-50 transition-colors duration-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Identity */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setShowBlueprint(false)}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1E2F23] to-[#4A7C59] flex items-center justify-center shadow-md">
            <Leaf className="w-5 h-5 text-[#FDFCF8] stroke-[2.5]" id="header_logo" />
          </div>
          <div>
            <span className="font-sans font-bold tracking-tight text-xl text-[#1E2F23] flex items-center">
              CropMind <span className="text-[10px] bg-[#4A7C59]/10 text-[#4A7C59] font-mono font-medium px-2 py-0.5 rounded-full ml-2 border border-[#4A7C59]/20">HACKATHON BUILD</span>
            </span>
            <p className="text-[10px] text-[#5A5A40] font-mono tracking-widest uppercase">AI Agronomist Suite</p>
          </div>
        </div>

        {/* Global Controls */}
        <div className="flex items-center space-x-4">
          
          {/* Farmer Portal Trigger Button */}
          <button
            onClick={onFarmerPortalClick}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-xs font-sans transition-all duration-200 cursor-pointer ${
              activeFarmer
                ? 'bg-[#4A7C59]/10 border-[#4A7C59]/40 text-[#1E2F23] font-bold shadow-sm'
                : 'bg-[#FDFCF8] hover:bg-[#F5F5F0] border-[#E5E2D9] text-[#2D3325] font-semibold'
            }`}
            title="Open Cooperative Farmer Portal & Incident History Ledger"
          >
            <User className="w-3.5 h-3.5 text-[#4A7C59]" />
            <span>{activeFarmer ? activeFarmer.name.split(' ')[0] : 'Farmer Portal'}</span>
          </button>

          {/* Pitch Deck / Technical Blueprint Toggle */}
          <button
            onClick={() => setShowBlueprint(!showBlueprint)}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border text-sm font-sans transition-all duration-200 ${
              showBlueprint 
                ? 'bg-[#D48C45]/10 border-[#D48C45]/40 text-[#92400E] shadow-sm font-medium' 
                : 'bg-[#F5F5F0] hover:bg-[#E5E2D9] border-[#E5E2D9] text-[#2D3325]'
            }`}
            title="Toggle Pitch Deck & Tech Blueprint"
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline font-medium">Hacker Blueprint & Slides</span>
          </button>

          {/* Network State Switch */}
          <div className="flex items-center bg-[#F5F5F0] border border-[#E5E2D9] rounded-xl p-1">
            <button
              onClick={() => setIsOnline(true)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                isOnline
                  ? 'bg-[#4A7C59] text-white font-bold shadow-sm'
                  : 'text-[#5A5A40] hover:text-[#2D3325]'
              }`}
              title="Switch to Online Server-Side AI (Gemma 4)"
            >
              <Wifi className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Online API</span>
            </button>
            <button
              onClick={() => setIsOnline(false)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                !isOnline
                  ? 'bg-[#D48C45] text-white font-bold shadow-sm'
                  : 'text-[#5A5A40] hover:text-[#2D3325]'
              }`}
              title="Simulate Rural Zero-Connectivity Offline Mode"
            >
              <WifiOff className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Offline</span>
            </button>
          </div>

          {/* Multilingual Selector */}
          <div className="relative group">
            <div className="flex items-center space-x-2 bg-[#F5F5F0] hover:bg-[#E5E2D9] border border-[#E5E2D9] rounded-xl px-3 py-2 cursor-pointer transition-colors">
              <Globe className="w-4 h-4 text-[#5A5A40]" />
              <span className="text-xs text-[#2D3325] font-mono uppercase hidden sm:inline">
                {currentLanguage}
              </span>
              <span className="text-sm">
                {LANGUAGES.find(l => l.code === currentLanguage)?.flag}
              </span>
            </div>
            
            {/* Hover Dropdown */}
            <div className="absolute right-0 mt-2 w-48 bg-white border border-[#E5E2D9] rounded-xl shadow-2xl opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-200 z-50 py-1">
              <div className="px-3 py-1 text-[10px] text-[#5A5A40] font-mono tracking-wider uppercase border-b border-[#E5E2D9]">
                Select Language
              </div>
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code as SupportedLanguage)}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#F5F5F0] transition-colors ${
                    currentLanguage === lang.code ? 'text-[#4A7C59] font-semibold bg-[#4A7C59]/5' : 'text-[#2D3325]'
                  }`}
                >
                  <span className="flex items-center">
                    <span className="mr-2 text-sm">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </span>
                  <span className="text-[10px] text-[#5A5A40] font-mono italic">{lang.local}</span>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
