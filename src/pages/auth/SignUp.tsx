import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Leaf, User, Mail, Lock, Sprout, MapPin, Navigation, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function SignUp() {
  const navigate = useNavigate();
  const { signup, theme } = useApp();

  // Registration states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [farmName, setFarmName] = useState('');
  const [farmSize, setFarmSize] = useState('2.5');
  const [location, setLocation] = useState('');
  const [primaryCrop, setPrimaryCrop] = useState('Maize');
  
  // Geolocation states
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Verification step simulation
  const [step, setStep] = useState<'form' | 'verify'>('form');
  const [otpCode, setOtpCode] = useState('');
  const [otpError, setOtpError] = useState('');
  const [otpSuccess, setOtpSuccess] = useState(false);

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
              setLocation(shortLocation || data.display_name || gpsString);
            } else {
              setLocation(gpsString);
            }
          } else {
            setLocation(gpsString);
          }
        } catch (err) {
          console.warn('Reverse geocoding failed, falling back to GPS:', err);
          setLocation(gpsString);
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        let errorMsg = 'Could not acquire location coordinates.';
        if (error.code === error.PERMISSION_DENIED) {
          errorMsg = 'Permission denied. Please allow location access or enter coordinates.';
        }
        setLocationError(errorMsg);
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
    );
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !farmName || !location) {
      setLocationError('Please complete all fields to sign up.');
      return;
    }
    // Transition to verification simulation
    setStep('verify');
  };

  const handleVerifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode !== '123456' && otpCode.length !== 6) {
      setOtpError('Invalid OTP code. For demo purposes, enter "123456" or any 6 digits.');
      return;
    }
    setOtpSuccess(true);
    setOtpError('');
    
    setTimeout(async () => {
      await signup({
        name,
        email,
        farmName,
        location,
        farmSize: parseFloat(farmSize) || 1.0,
        primaryCrop
      });
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center font-sans ${theme === 'dark' ? 'bg-[#0E1510]' : 'bg-[#FDFCF8]'} p-4 transition-colors duration-300`}>
      <div className="w-full max-w-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-emerald-950 rounded-[32px] p-8 shadow-2xl space-y-6">
        
        {/* Step tracker */}
        <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-stone-800 text-[10px] font-mono tracking-widest text-[#4A7C59] uppercase font-bold">
          <span>Registration</span>
          <span>{step === 'form' ? 'Step 1 of 2: Profile Setup' : 'Step 2 of 2: Security Verification'}</span>
        </div>

        {step === 'form' ? (
          <>
            <div className="space-y-1">
              <h3 className="text-xl font-black text-stone-900 dark:text-white tracking-tight">Establish Farmer Identity</h3>
              <p className="text-xs text-stone-500">Add field and credentials coordinates</p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold mb-1 text-stone-700 dark:text-stone-300">Farmer Full Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Adebayo Mensah"
                      className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-emerald-950 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#4A7C59]"
                    />
                    <User className="w-3.5 h-3.5 text-stone-400 absolute right-3 top-3.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold mb-1 text-stone-700 dark:text-stone-300">Email Address</label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="adebayo@cocoafields.org"
                      className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-emerald-950 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#4A7C59]"
                    />
                    <Mail className="w-3.5 h-3.5 text-stone-400 absolute right-3 top-3.5" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold mb-1 text-stone-700 dark:text-stone-300">Farm Field Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={farmName}
                      onChange={(e) => setFarmName(e.target.value)}
                      placeholder="Mensah Organic Cocoa Fields"
                      className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-emerald-950 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#4A7C59]"
                    />
                    <Sprout className="w-3.5 h-3.5 text-stone-400 absolute right-3 top-3.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold mb-1 text-stone-700 dark:text-stone-300">Farm Security Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-emerald-950 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#4A7C59]"
                    />
                    <Lock className="w-3.5 h-3.5 text-stone-400 absolute right-3 top-3.5" />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-[11px] font-bold text-stone-700 dark:text-stone-300">Farm Location & Geoposition</label>
                  <button
                    type="button"
                    onClick={detectLocation}
                    disabled={isLocating}
                    className={`text-[9px] font-mono px-2 py-0.5 rounded border transition-all cursor-pointer flex items-center space-x-1 ${
                      isLocating
                        ? 'bg-[#4A7C59]/10 border-[#4A7C59]/30 text-[#4A7C59] animate-pulse'
                        : 'bg-stone-50 border-stone-200 text-[#4A7C59]'
                    }`}
                  >
                    <Navigation className={`w-2.5 h-2.5 ${isLocating ? 'animate-spin' : ''}`} />
                    <span>{isLocating ? 'Acquiring GPS...' : 'Detect Precise GPS'}</span>
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Eastern Region, Ghana or GPS: 6.1345, -0.2455"
                    className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-emerald-950 rounded-xl p-2.5 pr-10 text-xs focus:outline-none focus:border-[#4A7C59]"
                  />
                  <MapPin className="w-3.5 h-3.5 text-stone-400 absolute right-3 top-3.5" />
                </div>
                {locationError && (
                  <p className="text-[10px] text-red-500 font-mono mt-1">{locationError}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold mb-1 text-stone-700 dark:text-stone-300">Farm Size (Hectares)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={farmSize}
                    onChange={(e) => setFarmSize(e.target.value)}
                    className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-emerald-950 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#4A7C59]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold mb-1 text-stone-700 dark:text-stone-300">Primary Staple Crop</label>
                  <select
                    value={primaryCrop}
                    onChange={(e) => setPrimaryCrop(e.target.value)}
                    className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-emerald-950 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#4A7C59]"
                  >
                    <option value="Maize">Maize (Corn)</option>
                    <option value="Cassava">Cassava (Yuca)</option>
                    <option value="Cocoa">Cocoa (Cacao)</option>
                    <option value="Coffee">Coffee</option>
                    <option value="Rice">Rice</option>
                    <option value="Sorghum">Sorghum</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#4A7C59] hover:bg-[#3c664a] text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center space-x-1.5 cursor-pointer shadow"
              >
                <span>Continue Registration</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </>
        ) : (
          /* Verification code simulation step */
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-stone-900 dark:text-white">Verify Farm Email</h3>
              <p className="text-xs text-stone-500">A security verification token has been simulated for {email}.</p>
            </div>

            {otpSuccess ? (
              <div className="p-6 bg-emerald-50 text-emerald-700 rounded-xl text-center space-y-2 text-xs">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto animate-bounce" />
                <p className="font-bold">Security Token Confirmed!</p>
                <p>Establishing secure offline synchronization caches...</p>
              </div>
            ) : (
              <form onSubmit={handleVerifySubmit} className="space-y-4">
                <div>
                  <label className="block text-center text-xs font-semibold mb-2">Enter 6-digit Verification OTP</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="123456"
                    className="w-full text-center bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-emerald-950 rounded-xl p-3 text-lg font-mono tracking-[0.5em] focus:outline-none focus:border-[#4A7C59]"
                  />
                  {otpError && (
                    <p className="text-[10px] text-red-500 font-mono text-center mt-2">{otpError}</p>
                  )}
                  <p className="text-center text-[10px] text-stone-400 mt-2">Hint: enter "123456" or any 6 digits to verify demo bypass.</p>
                </div>

                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="flex-1 bg-[#4A7C59] text-white font-bold py-2.5 rounded-lg text-xs cursor-pointer shadow"
                  >
                    Confirm Token
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep('form')}
                    className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold py-2.5 rounded-lg text-xs cursor-pointer"
                  >
                    Go Back
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Redirect */}
        <p className="text-center text-xs text-stone-500">
          Already registered?{' '}
          <Link to="/login" className="text-[#4A7C59] font-bold hover:underline">
            Sign In Securely
          </Link>
        </p>

        {/* Back link */}
        <p className="text-center text-[10px] text-stone-400">
          <Link to="/" className="hover:underline">
            &larr; Back to Public Website
          </Link>
        </p>

      </div>
    </div>
  );
}
