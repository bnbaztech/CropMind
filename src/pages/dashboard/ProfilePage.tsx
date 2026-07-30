import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, Sprout, MapPin, Navigation, Calendar, Mail, FileText, Check } from 'lucide-react';

export default function ProfilePage() {
  const { activeFarmer, setActiveFarmer } = useApp();
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const calibrateLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      return;
    }
    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const gpsString = `GPS: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
        
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=en`,
            {
              headers: {
                'User-Agent': 'CropMind-AI-Agronomist-Applet'
              }
            }
          );
          let resolvedLoc = gpsString;
          if (response.ok) {
            const data = await response.json();
            if (data && data.address) {
              const address = data.address;
              const shortParts = [];
              if (address.village || address.town || address.city || address.suburb || address.neighbourhood) {
                shortParts.push(address.village || address.town || address.city || address.suburb || address.neighbourhood);
              }
              if (address.county || address.state_district || address.state || address.region) {
                shortParts.push(address.county || address.state_district || address.state || address.region);
              }
              if (address.country) {
                shortParts.push(address.country);
              }
              resolvedLoc = shortParts.join(', ') || data.display_name || gpsString;
            }
          }
          if (activeFarmer) {
            const updated = { ...activeFarmer, location: resolvedLoc };
            setActiveFarmer(updated);
          }
        } catch (err) {
          console.warn('Reverse geocoding failed during calibration:', err);
          if (activeFarmer) {
            const updated = { ...activeFarmer, location: gpsString };
            setActiveFarmer(updated);
          }
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        let errorMsg = 'Could not calibrate location coordinates.';
        if (error.code === error.PERMISSION_DENIED) {
          errorMsg = 'Location permission denied by device.';
        }
        setLocationError(errorMsg);
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 dark:border-emerald-950 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-stone-900 dark:text-white flex items-center">
            <User className="w-5 h-5 mr-2 text-[#4A7C59]" />
            Farmer Profile Settings
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Manage your agricultural credentials, cooperative node registrations, and geoposition coordinates.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Profile Card */}
        <div className="lg:col-span-8 bg-white dark:bg-stone-900 border border-stone-200 dark:border-emerald-950 rounded-2xl p-6 space-y-6 shadow-sm">
          
          <div className="flex items-center space-x-4 pb-4 border-b border-stone-100 dark:border-stone-850">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#1E2F23] to-[#4A7C59] flex items-center justify-center font-black text-white text-2xl">
              {activeFarmer?.name ? activeFarmer.name.split(' ').map(n => n[0]).join('') : 'AM'}
            </div>
            <div>
              <h3 className="font-bold text-lg text-stone-900 dark:text-white">
                {activeFarmer?.name || 'Adebayo Mensah'}
              </h3>
              <p className="text-xs text-stone-400 font-mono">ID: {activeFarmer?.id || 'f-demo-999'}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] uppercase font-mono text-stone-400">Email Address</p>
              <p className="text-xs font-bold mt-1 text-stone-800 dark:text-stone-200">
                {activeFarmer?.email || 'adebayo.cocoa@cropmind.com'}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-mono text-stone-400">Cooperative Membership Date</p>
              <p className="text-xs font-bold mt-1 text-stone-800 dark:text-stone-200">
                {activeFarmer?.memberSince || '2026-06-15'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t pt-4 border-stone-100 dark:border-stone-850">
            <div>
              <p className="text-[10px] uppercase font-mono text-stone-400">Registered Field Name</p>
              <p className="text-xs font-bold mt-1 text-stone-800 dark:text-stone-200">
                {activeFarmer?.farmName || 'Mensah Organic Cocoa Fields'}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-mono text-stone-400">Primary Staple Specialty Crop</p>
              <p className="text-xs font-bold mt-1 text-stone-800 dark:text-stone-200">
                {activeFarmer?.primaryCrop || 'Cocoa'}
              </p>
            </div>
          </div>

          {/* Location field with calibration */}
          <div className="border-t pt-4 border-stone-100 dark:border-stone-850 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[10px] uppercase font-mono text-stone-400">Registered Geoposition</span>
              <button
                type="button"
                onClick={calibrateLocation}
                disabled={isLocating}
                className={`text-[9px] font-mono px-2 py-1 rounded border cursor-pointer flex items-center space-x-1 ${
                  isLocating ? 'bg-[#4A7C59]/10 border-[#4A7C59]/30 text-[#4A7C59] animate-pulse' : 'bg-stone-50 border-stone-200 text-[#4A7C59]'
                }`}
              >
                <Navigation className={`w-2.5 h-2.5 ${isLocating ? 'animate-spin' : ''}`} />
                <span>{isLocating ? 'Recalibrating GPS...' : 'Calibrate Precise GPS'}</span>
              </button>
            </div>
            
            <div className="bg-stone-50 dark:bg-stone-950 p-3 rounded-xl border border-stone-100 dark:border-emerald-900/40 flex items-center space-x-2.5">
              <MapPin className="w-4 h-4 text-[#4A7C59]" />
              <span className="text-xs font-bold">{activeFarmer?.location || 'Eastern Region, Ghana'}</span>
            </div>
            
            {locationError && (
              <p className="text-[10px] text-red-500 font-mono">{locationError}</p>
            )}
          </div>

        </div>

        {/* Info Card */}
        <div className="lg:col-span-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-emerald-950 rounded-2xl p-5 space-y-4 shadow-sm">
          <div className="flex items-center space-x-2 font-bold text-sm">
            <Check className="w-4.5 h-4.5 text-[#4A7C59]" />
            <span>Registration Checklist</span>
          </div>

          <ul className="text-xs text-stone-500 space-y-3 pl-1 leading-relaxed">
            <li className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-[#4A7C59] rounded-full"></div>
              <span>Profile Email Verified</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-[#4A7C59] rounded-full"></div>
              <span>Cooperative Node Connected</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-[#4A7C59] rounded-full"></div>
              <span>GPS Calibration completed</span>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}
