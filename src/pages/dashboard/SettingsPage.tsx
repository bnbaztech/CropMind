import React from 'react';
import { useApp } from '../../context/AppContext';
import { Settings, Moon, Sun, Wifi, WifiOff, Globe, Trash2, Bell, ShieldCheck } from 'lucide-react';
import { SupportedLanguage } from '../../types';

export default function SettingsPage() {
  const {
    language,
    setLanguage,
    isOnline,
    setIsOnline,
    theme,
    setTheme,
    clearNotifications,
    addNotification
  } = useApp();

  const handleClearCache = () => {
    localStorage.removeItem('cropmind_active_farmer');
    clearNotifications();
    addNotification('Local Storage Purged', 'All local offline IndexedDB and ledger storage cached values are wiped.', 'warning');
    alert('Local system cache purged successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 dark:border-emerald-950 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-stone-900 dark:text-white flex items-center">
            <Settings className="w-5 h-5 mr-2 text-[#4A7C59]" />
            Platform & Node Settings
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Customize local interface settings, simulate network conditions, and configure agronomic options.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 bg-white dark:bg-stone-900 border border-stone-200 dark:border-emerald-950 rounded-2xl p-6 space-y-6 shadow-sm">
          
          {/* Light/Dark Mode Setting */}
          <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-850">
            <div>
              <h4 className="font-bold text-sm">Theme Appearance</h4>
              <p className="text-[11px] text-stone-400">Toggle dark mode for outdoor daylight visibility</p>
            </div>
            <div className="flex bg-stone-100 dark:bg-stone-950 p-1 rounded-xl border">
              <button
                onClick={() => setTheme('light')}
                className={`p-2 rounded-lg flex items-center space-x-1 text-xs font-semibold ${
                  theme === 'light' ? 'bg-[#4A7C59] text-white' : 'text-stone-500'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                <span>Light</span>
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`p-2 rounded-lg flex items-center space-x-1 text-xs font-semibold ${
                  theme === 'dark' ? 'bg-[#4A7C59] text-white' : 'text-stone-500'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                <span>Dark</span>
              </button>
            </div>
          </div>

          {/* Network offline simulation */}
          <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-850">
            <div>
              <h4 className="font-bold text-sm">Offline Simulation Toggle</h4>
              <p className="text-[11px] text-stone-400">Simulate zero-connectivity rural field conditions</p>
            </div>
            <div className="flex bg-stone-100 dark:bg-stone-950 p-1 rounded-xl border">
              <button
                onClick={() => setIsOnline(true)}
                className={`p-2 rounded-lg flex items-center space-x-1 text-xs font-semibold ${
                  isOnline ? 'bg-[#4A7C59] text-white' : 'text-stone-500'
                }`}
              >
                <Wifi className="w-3.5 h-3.5" />
                <span>Online API</span>
              </button>
              <button
                onClick={() => setIsOnline(false)}
                className={`p-2 rounded-lg flex items-center space-x-1 text-xs font-semibold ${
                  !isOnline ? 'bg-amber-500 text-white' : 'text-stone-500'
                }`}
              >
                <WifiOff className="w-3.5 h-3.5" />
                <span>Offline Cache</span>
              </button>
            </div>
          </div>

          {/* Language Selection */}
          <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-850">
            <div>
              <h4 className="font-bold text-sm">Primary Dialect settings</h4>
              <p className="text-[11px] text-stone-400">Choose native speaking voice and text translations</p>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
              className="bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-emerald-950 rounded-lg p-2 text-xs focus:outline-none focus:border-[#4A7C59]"
            >
              <option value="en">🇬🇧 English</option>
              <option value="sw">🇰🇪 Kiswahili (Swahili)</option>
              <option value="ha">🇳🇬 Hausa</option>
              <option value="yo">🇳🇬 Yoruba</option>
              <option value="ig">🇳🇬 Igbo</option>
              <option value="fr">🇫🇷 Français (French)</option>
              <option value="ar">🇸🇩 العربية (Arabic)</option>
            </select>
          </div>

          {/* Destructive actions */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <h4 className="font-bold text-sm text-red-650">Clear Local Caches</h4>
              <p className="text-[11px] text-stone-400">Wipe browser memory caches, transactional logs, and tokens</p>
            </div>
            <button
              onClick={handleClearCache}
              className="bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 px-3 py-2 rounded-xl text-xs flex items-center space-x-1.5 cursor-pointer font-bold"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Caches</span>
            </button>
          </div>

        </div>

        {/* Security verification notice */}
        <div className="lg:col-span-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-emerald-950 p-5 rounded-2xl space-y-4 shadow-sm">
          <div className="flex items-center space-x-2 font-bold text-sm text-stone-850 dark:text-stone-100">
            <ShieldCheck className="w-4.5 h-4.5 text-[#4A7C59]" />
            <span>SaaS Node Security</span>
          </div>
          <p className="text-xs text-stone-500 leading-relaxed">
            All database operations compile to secure LocalStorage clusters and are securely backed up during the continuous background service synchronization loops.
          </p>
        </div>

      </div>
    </div>
  );
}
