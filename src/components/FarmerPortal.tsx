import React, { useState, useEffect } from 'react';
import { User, Lock, UserPlus, MapPin, Calendar, History, LogOut, CheckCircle2, Trash2, Sprout, Plus, AlertCircle, FileText, Check, ShieldAlert, UserCheck, Navigation, Compass } from 'lucide-react';
import { Farmer, HistoryProblem } from '../types';

interface FarmerPortalProps {
  onClose: () => void;
  onFarmerStatusChange?: (farmer: Farmer | null) => void;
}

// Pre-seeded demo farmer for quick testing
const DEMO_FARMER: Farmer = {
  id: 'farmer_kamau',
  name: 'Michael Kamau',
  email: 'kamau@cropmind.org',
  phone: '+254 712 345678',
  farmName: 'Maji Mazuri Organic Plot',
  location: 'Kajiado, Kenya',
  farmSize: 3.5,
  primaryCrop: 'Maize',
  memberSince: '2025-08-12',
};

// Pre-seeded past problems for the demo farmer
const INITIAL_DEMO_PROBLEMS: HistoryProblem[] = [
  {
    id: 'prob_1',
    farmerId: 'farmer_kamau',
    cropName: 'Maize',
    problemName: 'Maize Common Rust',
    scientificName: 'Puccinia sorghi',
    symptoms: ['Golden-brown powdery pustules', 'Leaf yellowing', 'Weakened stalks'],
    organicTreatment: 'Plant resistant hybrids. Treat with organic copper hydroxide or spray custom neem leaf solution weekly.',
    confidence: 91,
    dateLogged: '2026-04-15',
    status: 'resolved',
    severity: 'Medium',
    notes: 'Affected the north acre plot. Controlled after pruning infected lower foliage and spraying neem extract.',
  },
  {
    id: 'prob_2',
    farmerId: 'farmer_kamau',
    cropName: 'Cassava',
    problemName: 'Cassava Mosaic Disease (CMD)',
    scientificName: 'Cassava mosaic virus',
    symptoms: ['Chlorotic mosaic on leaves', 'Distorted twisted leaflets', 'Stunted growth'],
    organicTreatment: 'Plant virus-free TMS cuttings. Rogue (uproot and burn) symptomatic plants immediately.',
    confidence: 94,
    dateLogged: '2026-05-20',
    status: 'active',
    severity: 'High',
    notes: 'Observed on 4 newly planted cassava stalks. Rogueing completed, adjacent stems under observation.',
  }
];

export default function FarmerPortal({ onClose, onFarmerStatusChange }: FarmerPortalProps) {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup' | 'dashboard'>('signin');
  const [farmer, setFarmer] = useState<Farmer | null>(null);
  const [problems, setProblems] = useState<HistoryProblem[]>([]);

  // Sign In inputs
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('1234'); // Default easy PIN
  const [loginError, setLoginError] = useState('');

  // Sign Up inputs
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPhone, setSignUpPhone] = useState('');
  const [signUpFarmName, setSignUpFarmName] = useState('');
  const [signUpLocation, setSignUpLocation] = useState('Central Region, Kenya');
  const [signUpFarmSize, setSignUpFarmSize] = useState('2.0');
  const [signUpCrop, setSignUpCrop] = useState('Maize');
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  // Geolocation states
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const detectLocation = () => {
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
              const shortLocation = shortParts.join(', ');
              setSignUpLocation(shortLocation || data.display_name || gpsString);
            } else {
              setSignUpLocation(gpsString);
            }
          } else {
            setSignUpLocation(gpsString);
          }
        } catch (err) {
          console.warn('Reverse geocoding failed, falling back to pure GPS coordinates:', err);
          setSignUpLocation(gpsString);
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        console.error('Geolocation acquisition error:', error);
        let errorMsg = 'Could not acquire precise location.';
        if (error.code === error.PERMISSION_DENIED) {
          errorMsg = 'Location permission denied. Please allow location access in your browser or enter location manually.';
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          errorMsg = 'GPS/Network signal unavailable. Please enter coordinates manually.';
        } else if (error.code === error.TIMEOUT) {
          errorMsg = 'Location request timed out. Please retry.';
        }
        setLocationError(errorMsg);
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 }
    );
  };

  const calibrateLocation = () => {
    if (!navigator.geolocation) return;
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const gpsString = `GPS: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=en`,
            { headers: { 'User-Agent': 'CropMind-AI-Agronomist-Applet' } }
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
          if (farmer) {
            const updated = { ...farmer, location: resolvedLoc };
            localStorage.setItem('cropmind_active_farmer', JSON.stringify(updated));
            setFarmer(updated);
            if (onFarmerStatusChange) onFarmerStatusChange(updated);
          }
        } catch (err) {
          console.warn('Calibration lookup failed, using coordinates:', err);
          if (farmer) {
            const updated = { ...farmer, location: gpsString };
            localStorage.setItem('cropmind_active_farmer', JSON.stringify(updated));
            setFarmer(updated);
            if (onFarmerStatusChange) onFarmerStatusChange(updated);
          }
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        console.error('Calibration error:', error);
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 }
    );
  };

  const autoDetectSignUpLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const gpsString = `GPS: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=en`,
            { headers: { 'User-Agent': 'CropMind-AI-Agronomist-Applet' } }
          );
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
              const shortLocation = shortParts.join(', ');
              if (shortLocation) {
                setSignUpLocation(shortLocation);
              }
            }
          }
        } catch (e) {
          console.warn('Background auto location detect failed:', e);
        }
      },
      undefined,
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 600000 }
    );
  };

  const autoCalibrateFarmerLocation = (currentFarmer: Farmer) => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const gpsString = `GPS: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=en`,
            { headers: { 'User-Agent': 'CropMind-AI-Agronomist-Applet' } }
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
          const updated = { ...currentFarmer, location: resolvedLoc };
          localStorage.setItem('cropmind_active_farmer', JSON.stringify(updated));
          setFarmer(updated);
          if (onFarmerStatusChange) onFarmerStatusChange(updated);
        } catch (e) {
          console.warn('Background auto farmer calibrate failed:', e);
        }
      },
      undefined,
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 600000 }
    );
  };

  // Manual problem log inputs
  const [manualCrop, setManualCrop] = useState('Maize');
  const [manualProblem, setManualProblem] = useState('');
  const [manualSeverity, setManualSeverity] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [manualNotes, setManualNotes] = useState('');
  const [logSuccess, setLogSuccess] = useState(false);

  // Load farmer & problems on mount
  useEffect(() => {
    const savedFarmer = localStorage.getItem('cropmind_active_farmer');
    const savedProblems = localStorage.getItem('cropmind_history_problems');

    if (savedFarmer) {
      const parsedFarmer = JSON.parse(savedFarmer);
      setFarmer(parsedFarmer);
      setActiveTab('dashboard');
      if (onFarmerStatusChange) onFarmerStatusChange(parsedFarmer);

      // Trigger high-precision auto update if holding default locations
      if (
        parsedFarmer.location === 'Eastern Province, Ghana' ||
        parsedFarmer.location === 'Kajiado, Kenya' ||
        parsedFarmer.location === 'Central Region, Kenya'
      ) {
        setTimeout(() => {
          autoCalibrateFarmerLocation(parsedFarmer);
        }, 1000);
      }
    } else {
      setActiveTab('signin');
      // Detect for signup fields
      setTimeout(() => {
        autoDetectSignUpLocation();
      }, 500);
    }

    if (savedProblems) {
      setProblems(JSON.parse(savedProblems));
    } else {
      // Set initial demo problems
      localStorage.setItem('cropmind_history_problems', JSON.stringify(INITIAL_DEMO_PROBLEMS));
      setProblems(INITIAL_DEMO_PROBLEMS);
    }
  }, []);

  // Listen to external scanning reports saved from the Plant Scanner component
  useEffect(() => {
    const handleStorageChange = () => {
      const savedProblems = localStorage.getItem('cropmind_history_problems');
      if (savedProblems) {
        setProblems(JSON.parse(savedProblems));
      }
    };
    window.addEventListener('storage', handleStorageChange);
    // Custom listener for inner-tab events
    window.addEventListener('cropmind-history-update', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cropmind-history-update', handleStorageChange);
    };
  }, []);

  // Demo Login Helper
  const handleDemoLogin = () => {
    localStorage.setItem('cropmind_active_farmer', JSON.stringify(DEMO_FARMER));
    setFarmer(DEMO_FARMER);
    setActiveTab('dashboard');
    if (onFarmerStatusChange) onFarmerStatusChange(DEMO_FARMER);
    // Auto calibrate background
    setTimeout(() => {
      autoCalibrateFarmerLocation(DEMO_FARMER);
    }, 400);
  };

  // Sign In submit
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) {
      setLoginError('Please enter your email address.');
      return;
    }

    // Basic match with demo, or accept any sign in for hackathon fluidity
    if (emailInput.toLowerCase() === DEMO_FARMER.email.toLowerCase()) {
      handleDemoLogin();
    } else {
      // Create a virtual farmer profile dynamically for the typed email
      const nameFromEmail = emailInput.split('@')[0];
      const virtualFarmer: Farmer = {
        id: `farmer_${Math.random().toString(36).substring(2, 9)}`,
        name: nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1) || 'Farmer',
        email: emailInput,
        farmName: 'Sunrise Co-op Lands',
        location: 'Eastern Province, Ghana',
        farmSize: 2.5,
        primaryCrop: 'Cassava',
        memberSince: new Date().toISOString().split('T')[0],
      };
      localStorage.setItem('cropmind_active_farmer', JSON.stringify(virtualFarmer));
      setFarmer(virtualFarmer);
      setActiveTab('dashboard');
      if (onFarmerStatusChange) onFarmerStatusChange(virtualFarmer);
      // Auto calibrate background
      setTimeout(() => {
        autoCalibrateFarmerLocation(virtualFarmer);
      }, 400);
    }
    setLoginError('');
  };

  // Sign Up submit
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpName.trim() || !signUpEmail.trim() || !signUpFarmName.trim()) {
      setLoginError('Please fill in all required fields.');
      return;
    }

    const newFarmer: Farmer = {
      id: `farmer_${Math.random().toString(36).substring(2, 9)}`,
      name: signUpName,
      email: signUpEmail,
      phone: signUpPhone || undefined,
      farmName: signUpFarmName,
      location: signUpLocation,
      farmSize: parseFloat(signUpFarmSize) || 1.0,
      primaryCrop: signUpCrop,
      memberSince: new Date().toISOString().split('T')[0],
    };

    localStorage.setItem('cropmind_active_farmer', JSON.stringify(newFarmer));
    setFarmer(newFarmer);
    setSignUpSuccess(true);
    setTimeout(() => {
      setSignUpSuccess(false);
      setActiveTab('dashboard');
      if (onFarmerStatusChange) onFarmerStatusChange(newFarmer);
    }, 1500);
  };

  // Log out helper
  const handleLogOut = () => {
    localStorage.removeItem('cropmind_active_farmer');
    setFarmer(null);
    setActiveTab('signin');
    if (onFarmerStatusChange) onFarmerStatusChange(null);
  };

  // Toggle problem status (Active vs. Resolved)
  const toggleProblemStatus = (probId: string) => {
    const updated = problems.map(prob => {
      if (prob.id === probId) {
        return { ...prob, status: (prob.status === 'active' ? 'resolved' : 'active') as 'active' | 'resolved' };
      }
      return prob;
    });
    setProblems(updated);
    localStorage.setItem('cropmind_history_problems', JSON.stringify(updated));
  };

  // Delete problem from history
  const deleteProblem = (probId: string) => {
    const filtered = problems.filter(prob => prob.id !== probId);
    setProblems(filtered);
    localStorage.setItem('cropmind_history_problems', JSON.stringify(filtered));
  };

  // Add a manual problem log
  const handleManualLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualProblem.trim()) return;

    const newProblem: HistoryProblem = {
      id: `prob_${Math.random().toString(36).substring(2, 9)}`,
      farmerId: farmer?.id || 'anonymous',
      cropName: manualCrop,
      problemName: manualProblem,
      symptoms: ['Manually reported symptom'],
      organicTreatment: 'Refer to SoilAdvisor or use organic compost layering to buffer nutrients and repel natural insects.',
      confidence: 100,
      dateLogged: new Date().toISOString().split('T')[0],
      status: 'active',
      severity: manualSeverity,
      notes: manualNotes || undefined,
    };

    const updated = [newProblem, ...problems];
    setProblems(updated);
    localStorage.setItem('cropmind_history_problems', JSON.stringify(updated));

    // Reset Form
    setManualProblem('');
    setManualNotes('');
    setLogSuccess(true);
    setTimeout(() => setLogSuccess(false), 2000);
  };

  return (
    <div className="bg-white border border-[#E5E2D9] rounded-[32px] p-5 md:p-6 shadow-sm transition-all duration-300 text-[#2D3325]">
      
      {/* Tab Selection */}
      <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-4 mb-5 gap-3">
        <div className="flex items-center space-x-2.5">
          <History className="w-5 h-5 text-[#4A7C59]" />
          <h2 className="font-display font-bold text-[#1E2F23] text-lg">
            {farmer ? `Farmer Space: ${farmer.name}` : 'Smallholder Farmer Portal'}
          </h2>
        </div>
        
        <div className="flex bg-[#FDFCF8] p-1 border border-[#E5E2D9] rounded-xl text-xs">
          {!farmer ? (
            <>
              <button
                onClick={() => setActiveTab('signin')}
                className={`px-3 py-1.5 rounded-lg font-sans font-medium transition-all cursor-pointer ${
                  activeTab === 'signin'
                    ? 'bg-[#4A7C59]/10 text-[#4A7C59] border border-[#4A7C59]/20 shadow-sm'
                    : 'text-[#5A5A40] hover:text-[#2D3325]'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setActiveTab('signup')}
                className={`px-3 py-1.5 rounded-lg font-sans font-medium transition-all cursor-pointer ${
                  activeTab === 'signup'
                    ? 'bg-[#4A7C59]/10 text-[#4A7C59] border border-[#4A7C59]/20 shadow-sm'
                    : 'text-[#5A5A40] hover:text-[#2D3325]'
                }`}
              >
                Register Account
              </button>
            </>
          ) : (
            <button
              onClick={handleLogOut}
              className="px-3 py-1.5 rounded-lg font-sans font-medium text-red-600 hover:bg-red-50 transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          )}
        </div>
      </div>

      {/* VIEW 1: SIGN IN PAGE */}
      {activeTab === 'signin' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-6 space-y-4">
            <h3 className="font-display font-bold text-[#1E2F23] text-base md:text-lg">Welcome back to CropMind</h3>
            <p className="text-xs text-[#5A5A40] leading-relaxed">
              Log in to load your rural cooperative profile, check your past field problem history, and keep track of live ESA Sentinel-2 soil indexes.
            </p>
            
            <div className="bg-[#4A7C59]/5 border border-[#4A7C59]/10 rounded-2xl p-4 space-y-2.5">
              <span className="text-[10px] font-mono text-[#4A7C59] uppercase tracking-wider block font-bold">Quick Demo Access:</span>
              <p className="text-xs text-[#2D3325]">
                Test the cooperative features instantly with our pre-populated agronomist demo profile.
              </p>
              <button
                onClick={handleDemoLogin}
                className="w-full bg-[#4A7C59] hover:bg-[#334639] text-[#FDFCF8] font-sans font-semibold py-2 rounded-lg text-xs transition-colors cursor-pointer flex items-center justify-center space-x-1.5"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Sign In as Demo Farmer</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSignIn} className="md:col-span-6 bg-[#FDFCF8] border border-[#E5E2D9] p-5 rounded-2xl space-y-4">
            <span className="text-[10px] font-mono text-[#5A5A40] uppercase tracking-wider block">Farmer Sign In:</span>
            
            {loginError && (
              <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-100 font-sans">{loginError}</p>
            )}

            <div>
              <label className="block text-xs font-sans text-[#5A5A40] mb-1">Cooperative Email Address</label>
              <div className="relative">
                <User className="absolute left-2.5 top-2.5 w-4 h-4 text-[#5A5A40]" />
                <input
                  type="email"
                  placeholder="e.g. kamau@cropmind.org"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full bg-white border border-[#E5E2D9] rounded-lg py-2 pl-9 pr-3 text-xs font-sans text-[#2D3325] focus:outline-none focus:border-[#4A7C59]"
                />
              </div>
              <span className="text-[9px] text-[#5A5A40]/75 mt-1 block">Entering any email automatically registers a fresh custom farmer account.</span>
            </div>

            <div>
              <label className="block text-xs font-sans text-[#5A5A40] mb-1">Farmer Security PIN</label>
              <div className="relative">
                <Lock className="absolute left-2.5 top-2.5 w-4 h-4 text-[#5A5A40]" />
                <input
                  type="password"
                  placeholder="Four-digit PIN"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full bg-white border border-[#E5E2D9] rounded-lg py-2 pl-9 pr-3 text-xs font-mono text-[#2D3325] focus:outline-none focus:border-[#4A7C59]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#1E2F23] hover:bg-[#334639] text-[#FDFCF8] font-sans font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
            >
              Secure Login
            </button>
          </form>
        </div>
      )}

      {/* VIEW 2: SIGN UP / REGISTRATION PAGE */}
      {activeTab === 'signup' && (
        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="space-y-3">
              <h3 className="font-display font-bold text-[#1E2F23] text-base">Register Your Farm</h3>
              <p className="text-xs text-[#5A5A40] leading-relaxed">
                Connect your plot to CropMind to unlock automated localized agronomist advice, crop yields reporting, and offline field history ledgers.
              </p>
              
              {signUpSuccess && (
                <div className="bg-[#4A7C59]/10 border border-[#4A7C59]/20 text-[#4A7C59] p-3 rounded-xl flex items-center space-x-2 text-xs font-sans font-semibold">
                  <Check className="w-4 h-4" />
                  <span>Registration successful! Redirecting to farmer portal...</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-sans text-[#5A5A40] mb-1">Full Name (Required)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ibrahim Diop"
                  value={signUpName}
                  onChange={(e) => setSignUpName(e.target.value)}
                  className="w-full bg-white border border-[#E5E2D9] rounded-lg p-2 text-xs font-sans text-[#2D3325] focus:outline-none focus:border-[#4A7C59]"
                />
              </div>

              <div>
                <label className="block text-xs font-sans text-[#5A5A40] mb-1">Email Address (Required)</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. ibrahim@farmcoop.org"
                  value={signUpEmail}
                  onChange={(e) => setSignUpEmail(e.target.value)}
                  className="w-full bg-white border border-[#E5E2D9] rounded-lg p-2 text-xs font-sans text-[#2D3325] focus:outline-none focus:border-[#4A7C59]"
                />
              </div>

              <div>
                <label className="block text-xs font-sans text-[#5A5A40] mb-1">Phone Number (Optional)</label>
                <input
                  type="tel"
                  placeholder="e.g. +233 24 1234567"
                  value={signUpPhone}
                  onChange={(e) => setSignUpPhone(e.target.value)}
                  className="w-full bg-white border border-[#E5E2D9] rounded-lg p-2 text-xs font-mono text-[#2D3325] focus:outline-none focus:border-[#4A7C59]"
                />
              </div>
            </div>

            <div className="space-y-3 bg-[#FDFCF8] border border-[#E5E2D9] p-4 rounded-2xl">
              <span className="text-[10px] font-mono text-[#5A5A40] uppercase tracking-wider block">Farm Parameters:</span>
              
              <div>
                <label className="block text-xs font-sans text-[#5A5A40] mb-1">Farm/Plot Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Diop Cooperative Plots"
                  value={signUpFarmName}
                  onChange={(e) => setSignUpFarmName(e.target.value)}
                  className="w-full bg-white border border-[#E5E2D9] rounded-lg p-2 text-xs font-sans text-[#2D3325] focus:outline-none focus:border-[#4A7C59]"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-sans text-[#5A5A40]">Farm Location</label>
                  <button
                    type="button"
                    onClick={detectLocation}
                    disabled={isLocating}
                    className={`text-[10px] font-sans font-semibold flex items-center space-x-1 px-2 py-0.5 rounded border transition-all cursor-pointer ${
                      isLocating
                        ? 'bg-[#4A7C59]/10 border-[#4A7C59]/30 text-[#4A7C59] animate-pulse'
                        : 'bg-white border-[#E5E2D9] hover:bg-[#F5F5F0] text-[#4A7C59]'
                    }`}
                    title="Detect precise latitude/longitude from device GPS"
                  >
                    <Navigation className={`w-2.5 h-2.5 ${isLocating ? 'animate-spin' : ''}`} />
                    <span>{isLocating ? 'Detecting GPS...' : 'Detect Precise GPS'}</span>
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tamale, Northern Region, Ghana"
                    value={signUpLocation}
                    onChange={(e) => setSignUpLocation(e.target.value)}
                    className="w-full bg-white border border-[#E5E2D9] rounded-lg p-2 pr-8 text-xs font-sans text-[#2D3325] focus:outline-none focus:border-[#4A7C59]"
                  />
                  <div className="absolute right-2.5 top-2.5 text-[#4A7C59]">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                </div>
                {locationError && (
                  <p className="text-[10px] text-red-600 bg-red-50 border border-red-100 p-1.5 rounded mt-1 font-sans">
                    {locationError}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-sans text-[#5A5A40] mb-1">Size (Hectares)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={signUpFarmSize}
                    onChange={(e) => setSignUpFarmSize(e.target.value)}
                    className="w-full bg-white border border-[#E5E2D9] rounded-lg p-2 text-xs font-mono text-[#2D3325] focus:outline-none focus:border-[#4A7C59]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-sans text-[#5A5A40] mb-1">Primary Crop</label>
                  <select
                    value={signUpCrop}
                    onChange={(e) => setSignUpCrop(e.target.value)}
                    className="w-full bg-white border border-[#E5E2D9] rounded-lg p-2 text-xs font-sans text-[#2D3325] focus:outline-none focus:border-[#4A7C59]"
                  >
                    <option value="Maize">Maize</option>
                    <option value="Cassava">Cassava</option>
                    <option value="Rice">Rice</option>
                    <option value="Tomato">Tomato</option>
                  </select>
                </div>
              </div>
            </div>

          </div>

          <button
            type="submit"
            className="w-full bg-[#4A7C59] hover:bg-[#334639] text-[#FDFCF8] font-sans font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center space-x-1.5"
          >
            <UserPlus className="w-4 h-4" />
            <span>Complete Farmer Registration</span>
          </button>
        </form>
      )}

      {/* VIEW 3: ACTIVE LOGGED-IN FARMER DASHBOARD */}
      {activeTab === 'dashboard' && farmer && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          
          {/* PROFILE COLUMN */}
          <div className="xl:col-span-4 space-y-4">
            
            {/* Profile Info Card */}
            <div className="bg-[#FDFCF8] border border-[#E5E2D9] p-4 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#4A7C59]/5 rounded-full -mr-6 -mt-6" />
              
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#4A7C59] text-white flex items-center justify-center text-lg font-bold shadow-sm">
                  {farmer.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-display font-bold text-[#1E2F23] text-sm">{farmer.name}</h4>
                  <span className="text-[10px] text-[#5A5A40] font-mono block">ID: {farmer.id}</span>
                </div>
              </div>

              <div className="space-y-2 text-xs font-sans">
                <div className="flex items-center space-x-2 text-[#2D3325]">
                  <MapPin className="w-3.5 h-3.5 text-[#4A7C59] flex-shrink-0" />
                  <span>{farmer.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-[#2D3325]">
                  <Sprout className="w-3.5 h-3.5 text-[#4A7C59] flex-shrink-0" />
                  <span>{farmer.farmName} ({farmer.farmSize} Hectares)</span>
                </div>
                <div className="flex items-center space-x-2 text-[#2D3325]">
                  <Calendar className="w-3.5 h-3.5 text-[#4A7C59] flex-shrink-0" />
                  <span>Registered: {farmer.memberSince}</span>
                </div>
                
                <div className="pt-2.5 border-t border-[#E5E2D9] mt-2.5">
                  <button
                    type="button"
                    onClick={calibrateLocation}
                    disabled={isLocating}
                    className={`w-full text-[10px] font-sans font-semibold py-1.5 px-3 rounded-lg border transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                      isLocating
                        ? 'bg-[#4A7C59]/10 border-[#4A7C59]/30 text-[#4A7C59] animate-pulse'
                        : 'bg-white hover:bg-[#F5F5F0] border-[#E5E2D9] text-[#4A7C59]'
                    }`}
                    title="Refresh to high-accuracy device GPS coordinates"
                  >
                    <Navigation className={`w-3 h-3 ${isLocating ? 'animate-spin' : ''}`} />
                    <span>{isLocating ? 'Acquiring GPS...' : 'Calibrate Precise GPS Location'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Manual Disease Log form */}
            <form onSubmit={handleManualLogSubmit} className="bg-[#FDFCF8] border border-[#E5E2D9] p-4 rounded-2xl space-y-3">
              <span className="text-[10px] font-mono text-[#5A5A40] uppercase tracking-wider block font-bold">Log Past Farm Problem Manually:</span>
              
              {logSuccess && (
                <p className="text-[10px] text-[#4A7C59] bg-[#4A7C59]/10 border border-[#4A7C59]/20 p-2 rounded font-semibold">Problem logged successfully!</p>
              )}

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-sans text-[#5A5A40] mb-0.5">Crop Type</label>
                  <select
                    value={manualCrop}
                    onChange={(e) => setManualCrop(e.target.value)}
                    className="w-full bg-white border border-[#E5E2D9] rounded-lg p-1.5 text-xs font-sans text-[#2D3325]"
                  >
                    <option value="Maize">Maize</option>
                    <option value="Cassava">Cassava</option>
                    <option value="Rice">Rice</option>
                    <option value="Tomato">Tomato</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-sans text-[#5A5A40] mb-0.5">Severity</label>
                  <select
                    value={manualSeverity}
                    onChange={(e) => setManualSeverity(e.target.value as any)}
                    className="w-full bg-white border border-[#E5E2D9] rounded-lg p-1.5 text-xs font-sans text-[#2D3325]"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-sans text-[#5A5A40] mb-0.5">Problem / Diagnosis (Required)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maize Stalk Borers"
                  value={manualProblem}
                  onChange={(e) => setManualProblem(e.target.value)}
                  className="w-full bg-white border border-[#E5E2D9] rounded-lg p-1.5 text-xs font-sans text-[#2D3325] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-sans text-[#5A5A40] mb-0.5">Additional Notes (Optional)</label>
                <textarea
                  placeholder="e.g. Swallowed leaves in West plot."
                  rows={2}
                  value={manualNotes}
                  onChange={(e) => setManualNotes(e.target.value)}
                  className="w-full bg-white border border-[#E5E2D9] rounded-lg p-1.5 text-xs font-sans text-[#2D3325] focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#4A7C59] hover:bg-[#334639] text-[#FDFCF8] font-sans font-bold py-2 rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Save to History</span>
              </button>
            </form>

          </div>

          {/* PAST PROBLEMS LEDGER / HISTORY COLUMN */}
          <div className="xl:col-span-8 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono text-[#5A5A40] uppercase tracking-wider block font-bold">Past History Problems Ledger:</span>
                <span className="text-[10px] font-mono bg-[#E5E2D9] text-[#5A5A40] px-2 py-0.5 rounded">
                  {problems.length} Incident{problems.length !== 1 && 's'} Recorded
                </span>
              </div>

              {problems.length === 0 ? (
                <div className="border border-dashed border-[#E5E2D9] rounded-2xl p-8 text-center bg-[#FDFCF8]">
                  <FileText className="w-10 h-10 text-[#5A5A40] mx-auto mb-2 opacity-60" />
                  <p className="text-xs font-sans font-medium text-[#2D3325]">No past crop health problems logged yet.</p>
                  <p className="text-[11px] text-[#5A5A40] mt-1 max-w-sm mx-auto">
                    Any new leaf photos analyzed using the AI Plant Scanner will automatically append here, or you can record entries manually using the form.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 overflow-y-auto max-h-[380px] pr-1 scrollbar-thin">
                  {problems.map((prob) => (
                    <div
                      key={prob.id}
                      className={`p-4 border rounded-2xl bg-white shadow-sm transition-all relative group ${
                        prob.status === 'active'
                          ? 'border-red-200 bg-red-50 bg-opacity-5'
                          : 'border-[#E5E2D9]'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-bold text-[#1E2F23]">
                              {prob.cropName} &mdash; {prob.problemName}
                            </span>
                            <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-mono uppercase font-bold ${
                              prob.severity === 'High'
                                ? 'bg-red-100 text-red-800'
                                : prob.severity === 'Medium'
                                  ? 'bg-[#D48C45]/20 text-[#92400E]'
                                  : 'bg-[#4A7C59]/10 text-[#4A7C59]'
                            }`}>
                              {prob.severity} Severity
                            </span>
                          </div>
                          
                          {prob.scientificName && (
                            <p className="text-[10px] text-[#5A5A40] font-mono italic">{prob.scientificName}</p>
                          )}
                          
                          <p className="text-xs text-[#2D3325] leading-relaxed mt-1">
                            {prob.notes || 'No extra descriptive agronomist notes filed.'}
                          </p>
                        </div>

                        <div className="flex items-center space-x-2 self-end sm:self-start">
                          {/* Toggle Status Button */}
                          <button
                            onClick={() => toggleProblemStatus(prob.id)}
                            className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold transition-all border flex items-center space-x-1 cursor-pointer ${
                              prob.status === 'resolved'
                                ? 'bg-[#4A7C59]/10 border-[#4A7C59]/30 text-[#4A7C59]'
                                : 'bg-red-500/10 border-red-500/20 text-red-600'
                            }`}
                          >
                            {prob.status === 'resolved' ? (
                              <>
                                <CheckCircle2 className="w-3 h-3" />
                                <span>Resolved</span>
                              </>
                            ) : (
                              <>
                                <ShieldAlert className="w-3 h-3 animate-pulse" />
                                <span>Active Problem</span>
                              </>
                            )}
                          </button>

                          {/* Delete Item */}
                          <button
                            onClick={() => deleteProblem(prob.id)}
                            className="p-1 text-stone-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 rounded transition-colors cursor-pointer"
                            title="Delete record"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-[#E5E2D9] flex flex-wrap items-center justify-between gap-2 text-[9px] font-mono text-[#5A5A40]">
                        <span>Diagnostic Confidence: <b>{prob.confidence}%</b></span>
                        <span>Date Logged: <b>{prob.dateLogged}</b></span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-[#FDFCF8] border border-[#E5E2D9] p-3 rounded-xl flex items-start space-x-2 mt-4 text-[11px] leading-relaxed text-[#5A5A40]">
              <AlertCircle className="w-4 h-4 text-[#4A7C59] flex-shrink-0 mt-0.5" />
              <span>
                To populate diagnostic history via camera, perform scans in the <b>AI Plant Scanner</b> tab. Results are instant and persist on-device for total offline agricultural continuity.
              </span>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
