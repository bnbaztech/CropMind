import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Leaf, Lock, Mail, ArrowRight, ShieldCheck, RefreshCw, AlertCircle } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { login, theme } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Reset password state
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide both your registration email and password.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      // Simulate real verification and routing
      await login(email);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to authenticate. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await login('google-farmer@cropmind.com', 'Dr. Adebayo Mensah');
      navigate('/dashboard');
    } catch (err) {
      setError('Google Sign-In failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) return;
    setResetSuccess(true);
    setTimeout(() => {
      setShowReset(false);
      setResetSuccess(false);
      setResetEmail('');
    }, 4000);
  };

  const handleDemoSignIn = async () => {
    setLoading(true);
    await login('adebayo.cocoa@cropmind.com', 'Adebayo Mensah');
    navigate('/dashboard');
  };

  return (
    <div className={`min-h-screen flex items-center justify-center font-sans ${theme === 'dark' ? 'bg-[#0E1510]' : 'bg-[#FDFCF8]'} p-4 transition-colors duration-300`}>
      <div className="w-full max-w-md bg-white dark:bg-stone-900 border border-stone-200 dark:border-emerald-950 rounded-[32px] p-8 shadow-2xl space-y-6 relative overflow-hidden">
        
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <Link
            to="/"
            className="inline-block hover:opacity-85 transition-opacity cursor-pointer"
            title="Go to Main Landing Page"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#1E2F23] to-[#4A7C59] flex items-center justify-center mx-auto shadow-md">
              <Leaf className="w-6 h-6 text-[#FDFCF8]" />
            </div>
          </Link>
          <h3 className="text-2xl font-black text-stone-900 dark:text-white tracking-tight">Welcome Back</h3>
          <p className="text-xs text-stone-500 dark:text-stone-400">Access your Agronomic Dashboard securely</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 rounded-xl p-3 flex items-start space-x-2 text-xs text-red-600">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="flex-1">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-1 text-stone-700 dark:text-stone-300">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="adebayo.cocoa@cropmind.com"
                className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-emerald-950 rounded-xl p-3 pr-10 text-xs focus:outline-none focus:border-[#4A7C59]"
              />
              <Mail className="w-4 h-4 text-stone-400 absolute right-3 top-3.5" />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300">Security Password</label>
              <button
                type="button"
                onClick={() => setShowReset(true)}
                className="text-[10px] text-[#4A7C59] hover:underline cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-emerald-950 rounded-xl p-3 pr-10 text-xs focus:outline-none focus:border-[#4A7C59]"
              />
              <Lock className="w-4 h-4 text-stone-400 absolute right-3 top-3.5" />
            </div>
          </div>

          {/* Remember & Safeguard */}
          <div className="flex items-center justify-between text-xs text-stone-500">
            <label className="flex items-center space-x-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded text-[#4A7C59] focus:ring-[#4A7C59] h-3.5 w-3.5"
              />
              <span>Remember security credentials</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#4A7C59] hover:bg-[#3d6549] text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center space-x-1.5 cursor-pointer shadow transition-all"
          >
            <span>{loading ? 'Verifying Profile...' : 'Sign In To Dashboard'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center py-2">
          <div className="absolute inset-x-0 h-[1px] bg-stone-100 dark:bg-stone-800"></div>
          <span className="relative bg-white dark:bg-stone-900 px-3 text-[10px] font-mono text-stone-400 uppercase">Or Continue with</span>
        </div>

        {/* Third Party Login */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex items-center justify-center space-x-1.5 border border-stone-200 dark:border-emerald-950 rounded-xl p-2.5 text-xs hover:bg-stone-50 dark:hover:bg-emerald-950/20 font-bold transition-all cursor-pointer"
          >
            <span>Google Account</span>
          </button>
          <button
            type="button"
            onClick={handleDemoSignIn}
            className="flex items-center justify-center space-x-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl p-2.5 text-xs font-bold transition-all cursor-pointer"
            title="Fast Demo Sign In"
          >
            <span>Launch Quick Demo</span>
          </button>
        </div>

        {/* Redirect */}
        <p className="text-center text-xs text-stone-500">
          First-time registering?{' '}
          <Link to="/signup" className="text-[#4A7C59] font-bold hover:underline">
            Register Farmer Account
          </Link>
        </p>

        {/* Back link */}
        <p className="text-center text-[10px] text-stone-400">
          <Link to="/" className="hover:underline">
            &larr; Back to Public Website
          </Link>
        </p>

        {/* Password Reset Modal */}
        {showReset && (
          <div className="absolute inset-0 bg-white/95 dark:bg-stone-900/95 backdrop-blur-sm p-8 flex flex-col justify-center space-y-4">
            <h4 className="font-bold text-lg">Reset Password</h4>
            {resetSuccess ? (
              <div className="p-4 bg-emerald-50 text-emerald-700 rounded-xl text-xs space-y-2">
                <p className="font-bold">Reset email transmitted!</p>
                <p>We sent secure credentials instructions to {resetEmail}. Please check spam folders.</p>
              </div>
            ) : (
              <form onSubmit={handleResetSubmit} className="space-y-4">
                <p className="text-xs text-stone-500">Provide your registered email address to receive secure OTP reset token.</p>
                <input
                  type="email"
                  required
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="adebayo.cocoa@cropmind.com"
                  className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-emerald-950 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#4A7C59]"
                />
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="flex-1 bg-[#4A7C59] text-white font-bold py-2 rounded-lg text-xs"
                  >
                    Send Token
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowReset(false)}
                    className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold py-2 rounded-lg text-xs"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
