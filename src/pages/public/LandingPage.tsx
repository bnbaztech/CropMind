import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Leaf,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Globe,
  Compass,
  Database,
  Cloud,
  Check,
  Send,
  HelpCircle,
  MessageSquare,
  Mail,
  ExternalLink,
  ChevronDown,
  Moon,
  Sun,
  Camera,
  Search,
  Activity,
  AlertTriangle,
  RefreshCw,
  TrendingUp,
  Layers,
  Sprout,
  CheckCircle2,
  Info,
  Menu,
  X,
  Zap,
  BarChart3,
  Award
} from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const { language, setLanguage, theme, setTheme, isLoggedIn } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  
  // Interactive Health Analysis showcase state
  const [selectedCondition, setSelectedCondition] = useState<string>('fungal');

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Hero Scanner Simulation State
  const [scannerStep, setScannerStep] = useState<number>(0);
  const [isSimulatingScan, setIsSimulatingScan] = useState<boolean>(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setScannerStep((prev) => (prev + 1) % 4);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  // Crop Conditions Showcase Data
  const cropConditions = [
    {
      id: 'healthy',
      title: 'Healthy Crop',
      crop: 'Cassava',
      status: 'Healthy',
      badgeColor: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30',
      score: 98,
      confidence: 96,
      symptoms: ['Vibrant green pigmentation', 'Uniform leaflet expansion', 'No visible spot lesions'],
      action: 'Maintain regular irrigation and inspect weekly for early vector insects.',
      imageUrl: 'https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'nutrient',
      title: 'Nutrient Deficiency',
      crop: 'Maize',
      status: 'Warning',
      badgeColor: 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30',
      score: 64,
      confidence: 92,
      symptoms: ['V-shaped chlorosis on leaf tips', 'Stunted stalk height', 'Lower leaves turning pale yellow'],
      action: 'Apply nitrogen-rich organic compost or side-dress with urea fertilizer.',
      imageUrl: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'pest',
      title: 'Pest Damage',
      crop: 'Tomato',
      status: 'At Risk',
      badgeColor: 'bg-orange-500/15 text-orange-700 dark:text-orange-400 border-orange-500/30',
      score: 48,
      confidence: 94,
      symptoms: ['Irregular leaf margin holes', 'Whitefly egg clusters under leaf', 'Sticky honeydew residue'],
      action: 'Apply organic neem oil extract spray or introduce beneficial predatory mites.',
      imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'fungal',
      title: 'Fungal Infection',
      crop: 'Rice',
      status: 'Critical',
      badgeColor: 'bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/30',
      score: 32,
      confidence: 95,
      symptoms: ['Diamond-shaped spindle lesions', 'Gray central necrotic spots', 'Leaf sheath discoloration'],
      action: 'Prune infected leaves immediately and apply protective copper fungicide spray.',
      imageUrl: 'https://images.unsplash.com/photo-1536882240095-0379873feb4e?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'bacterial',
      title: 'Bacterial Disease',
      crop: 'Cassava',
      status: 'Critical',
      badgeColor: 'bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/30',
      score: 38,
      confidence: 93,
      symptoms: ['Chlorotic mosaic distortion', 'Leaf twisting and curling', 'Stunted plant crown growth'],
      action: 'Rogue (uproot and burn) diseased stems. Use certified virus-free cuttings for next planting.',
      imageUrl: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'environmental',
      title: 'Environmental Stress',
      crop: 'Soybean',
      status: 'Warning',
      badgeColor: 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30',
      score: 58,
      confidence: 89,
      symptoms: ['Leaf curling and wilting under heat', 'Brown crispy leaf edges', 'Accelerated flower drop'],
      action: 'Apply organic straw mulch around crop roots and irrigate during early morning hours.',
      imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=600'
    }
  ];

  // Practical FAQ Preset
  const faqs = [
    {
      q: "How does CropMind analyze crops?",
      a: "CropMind uses intelligent computer vision AI trained on agricultural leaf disease datasets. When you upload or capture a photo of a crop leaf, our model analyzes visual patterns, spots, discoloration, and leaf contours to identify health conditions and recommend treatments."
    },
    {
      q: "What crops are supported by CropMind?",
      a: "CropMind supports a wide array of staple and commercial crops including Cassava, Maize (Corn), Rice, Tomatoes, Cocoa, Potatoes, Soybeans, Wheat, Beans, and Citrus fruits, with new varieties continuously added."
    },
    {
      q: "Can I use CropMind on my smartphone?",
      a: "Yes! CropMind is built mobile-first and works directly inside any web browser on iOS and Android devices without requiring heavy app store downloads. You can capture photos using your phone's camera directly."
    },
    {
      q: "How accurate is the AI crop analysis?",
      a: "Powered by modern Gemini AI models combined with curated agronomy research, CropMind achieves up to 95% classification confidence on common leaf blights, rusts, mosaic viruses, and pest markings."
    },
    {
      q: "Can CropMind work offline in rural areas?",
      a: "Yes. CropMind includes an offline-first engine that caches diagnostic rules and local farm records. If you lose internet connection in remote fields, you can still view saved diagnostic guides and log records."
    },
    {
      q: "What should I do after receiving a crop analysis?",
      a: "Each analysis provides step-by-step organic remedies (low-cost and natural), targeted chemical interventions (when appropriate), and preventive cultural steps. For critical cases, you can also log the issue to track treatment progress over time."
    }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactName('');
      setContactEmail('');
      setContactMessage('');
      setContactSubmitted(false);
    }, 4000);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const activeConditionObj = cropConditions.find(c => c.id === selectedCondition) || cropConditions[0];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#0A110C] text-[#E5EAE5]' : 'bg-[#F4F6F0] text-[#0E2313]'} transition-colors duration-300 font-sans selection:bg-[#4A7C59]/30`}>
      
      {/* Dynamic Header / Navigation Bar */}
      <nav className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
        theme === 'dark' ? 'bg-[#0A110C]/90 border-emerald-950' : 'bg-[#F4F6F0]/90 border-[#0E2313]/10'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#122A1B] to-[#4A7C59] flex items-center justify-center shadow-md border border-white/20">
              <Leaf className="w-5 h-5 text-white stroke-[2.5]" />
            </div>
            <div>
              <span className="font-bold tracking-tight text-xl text-[#0E2313] dark:text-emerald-400 flex items-center">
                CropMind
              </span>
              <p className="text-[10px] text-[#2E5A3C] font-mono tracking-widest uppercase dark:text-stone-400 font-semibold">AGRICULTURAL AI PLATFORM</p>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-6 text-xs font-bold uppercase tracking-wider">
            <button onClick={() => scrollToSection('home')} className="hover:text-[#4A7C59] transition-colors cursor-pointer">Home</button>
            <button onClick={() => scrollToSection('how-it-works')} className="hover:text-[#4A7C59] transition-colors cursor-pointer">How It Works</button>
            <button onClick={() => scrollToSection('crop-health')} className="hover:text-[#4A7C59] transition-colors cursor-pointer">Crop Health</button>
            <button onClick={() => scrollToSection('ai-insights')} className="hover:text-[#4A7C59] transition-colors cursor-pointer">AI Insights</button>
            <button onClick={() => scrollToSection('dashboard-preview')} className="hover:text-[#4A7C59] transition-colors cursor-pointer">Dashboard</button>
            <button onClick={() => scrollToSection('features')} className="hover:text-[#4A7C59] transition-colors cursor-pointer">Features</button>
            <button onClick={() => scrollToSection('impact')} className="hover:text-[#4A7C59] transition-colors cursor-pointer">Impact</button>
            <button onClick={() => scrollToSection('about')} className="hover:text-[#4A7C59] transition-colors cursor-pointer">About</button>
            <button onClick={() => scrollToSection('faq')} className="hover:text-[#4A7C59] transition-colors cursor-pointer">FAQ</button>
          </div>

          {/* Nav Right (Theme, Lang, Auth) */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`p-2.5 rounded-xl border transition-all duration-300 cursor-pointer flex items-center justify-center ${
                theme === 'dark' 
                  ? 'border-amber-500/40 bg-amber-500/10 text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.25)] hover:bg-amber-500/20' 
                  : 'border-[#4A7C59]/40 bg-[#4A7C59]/10 text-[#4A7C59] shadow-[0_0_12px_rgba(74,124,89,0.15)] hover:bg-[#4A7C59]/20'
              }`}
              title={theme === 'dark' ? 'Switch to Sunlit Day Mode' : 'Switch to Midnight Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 animate-spin-slow text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-[#4A7C59] fill-[#4A7C59]/25" />
              )}
            </button>

            {/* Language dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-1.5 px-3 py-2 rounded-xl border border-[#0E2313]/20 dark:border-emerald-950 bg-white/40 dark:bg-emerald-950/30 hover:bg-white/60 text-xs font-semibold cursor-pointer">
                <Globe className="w-3.5 h-3.5 text-[#4A7C59]" />
                <span className="uppercase">{language}</span>
              </button>
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-emerald-950 border border-stone-200 dark:border-emerald-900 rounded-xl shadow-xl opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-200 z-50 p-1">
                {['en', 'sw', 'ha', 'yo', 'ig', 'fr', 'ar'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang as any)}
                    className="w-full text-left px-3 py-1.5 text-xs rounded-lg hover:bg-stone-100 dark:hover:bg-emerald-900/60 transition-colors capitalize font-semibold"
                  >
                    {lang === 'en' ? 'English' : lang === 'sw' ? 'Kiswahili' : lang === 'fr' ? 'Français' : lang}
                  </button>
                ))}
              </div>
            </div>

            {isLoggedIn ? (
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-[#122A1B] hover:bg-[#1E3B28] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center space-x-1.5 cursor-pointer"
              >
                <span>Go to Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="text-[#0E2313] dark:text-stone-300 hover:text-[#4A7C59] text-xs font-bold px-3 py-2 cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate('/dashboard/scanner')}
                  className="bg-[#122A1B] dark:bg-emerald-800 text-white hover:bg-[#234E35] dark:hover:bg-emerald-700 text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md cursor-pointer flex items-center space-x-1.5"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Analyze My Crop</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-xl border border-[#0E2313]/20 dark:border-emerald-950 text-stone-700 dark:text-stone-300 cursor-pointer"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#4A7C59]" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/60 dark:bg-emerald-950/50 text-[#0E2313] dark:text-stone-200 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile menu panel */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#0E2313]/10 dark:border-emerald-950 bg-white/95 dark:bg-[#0A110C]/95 backdrop-blur-md px-4 py-4 space-y-3 shadow-xl">
            <button onClick={() => scrollToSection('home')} className="block w-full text-left py-2 font-bold hover:text-[#4A7C59]">Home</button>
            <button onClick={() => scrollToSection('how-it-works')} className="block w-full text-left py-2 font-bold hover:text-[#4A7C59]">How It Works</button>
            <button onClick={() => scrollToSection('crop-health')} className="block w-full text-left py-2 font-bold hover:text-[#4A7C59]">Crop Health</button>
            <button onClick={() => scrollToSection('ai-insights')} className="block w-full text-left py-2 font-bold hover:text-[#4A7C59]">AI Insights</button>
            <button onClick={() => scrollToSection('dashboard-preview')} className="block w-full text-left py-2 font-bold hover:text-[#4A7C59]">Dashboard</button>
            <button onClick={() => scrollToSection('features')} className="block w-full text-left py-2 font-bold hover:text-[#4A7C59]">Features</button>
            <button onClick={() => scrollToSection('impact')} className="block w-full text-left py-2 font-bold hover:text-[#4A7C59]">Impact</button>
            <button onClick={() => scrollToSection('about')} className="block w-full text-left py-2 font-bold hover:text-[#4A7C59]">About</button>
            <button onClick={() => scrollToSection('faq')} className="block w-full text-left py-2 font-bold hover:text-[#4A7C59]">FAQ</button>
            
            <div className="pt-4 border-t border-[#0E2313]/10 dark:border-emerald-950 flex flex-col gap-2">
              <button
                onClick={() => navigate('/dashboard/scanner')}
                className="w-full bg-[#122A1B] dark:bg-emerald-800 text-white font-bold py-3 rounded-xl text-center text-sm shadow cursor-pointer flex items-center justify-center space-x-2"
              >
                <Camera className="w-4 h-4" />
                <span>Analyze My Crop Now</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* 1. Hero Section */}
      <section id="home" className="relative py-16 lg:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center space-x-2 bg-[#122A1B]/10 dark:bg-emerald-500/10 border border-[#122A1B]/20 dark:border-emerald-500/30 px-3.5 py-1.5 rounded-full text-[#122A1B] dark:text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
              <Sprout className="w-4 h-4 text-[#4A7C59] animate-bounce" />
              <span>Intelligent Agricultural Technology</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-[#0E2313] dark:text-white">
              Understand Your Crops. <br className="hidden sm:inline" />
              <span className="text-[#2E5A3C] dark:text-emerald-400">Grow With Confidence.</span>
            </h1>
            
            <p className="text-base sm:text-lg text-[#1A3322] dark:text-stone-300 max-w-2xl leading-relaxed font-normal">
              CropMind uses intelligent technology to help farmers monitor crop health, identify potential problems, and make smarter decisions for healthier and more productive farms.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => navigate('/dashboard/scanner')}
                className="bg-[#122A1B] hover:bg-[#1E3B28] text-white font-bold px-8 py-4 rounded-2xl transition-all shadow-lg hover:shadow-xl text-center cursor-pointer flex items-center justify-center space-x-2 text-base group"
              >
                <Camera className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span>Analyze My Crop</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={() => scrollToSection('how-it-works')}
                className="bg-white/80 dark:bg-stone-900/80 hover:bg-white text-[#0E2313] dark:text-stone-100 font-bold px-7 py-4 rounded-2xl border border-[#0E2313]/20 dark:border-emerald-950 transition-all shadow-sm text-center cursor-pointer text-base flex items-center justify-center space-x-2"
              >
                <Info className="w-4 h-4 text-[#4A7C59]" />
                <span>Explore Crop Health</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#0E2313]/10 dark:border-emerald-950 max-w-lg">
              <div>
                <p className="text-2xl font-black text-[#122A1B] dark:text-emerald-400">95%</p>
                <p className="text-[10px] text-[#2E5A3C] dark:text-stone-400 font-mono font-bold uppercase">AI Accuracy</p>
              </div>
              <div>
                <p className="text-2xl font-black text-[#122A1B] dark:text-emerald-400">Instant</p>
                <p className="text-[10px] text-[#2E5A3C] dark:text-stone-400 font-mono font-bold uppercase">Health Diagnosis</p>
              </div>
              <div>
                <p className="text-2xl font-black text-[#122A1B] dark:text-emerald-400">100%</p>
                <p className="text-[10px] text-[#2E5A3C] dark:text-stone-400 font-mono font-bold uppercase">Farmer Centric</p>
              </div>
            </div>

          </div>

          {/* Hero Right: Interactive Live Crop Analysis HUD Mockup */}
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-[#4A7C59]/15 rounded-[40px] filter blur-2xl transform -translate-x-2 translate-y-4"></div>
            
            <div className="relative border-2 border-[#122A1B]/30 dark:border-emerald-900 rounded-[32px] overflow-hidden bg-[#122A1B] shadow-2xl p-5 text-white space-y-4">
              
              {/* Header HUD Bar */}
              <div className="flex justify-between items-center pb-3 border-b border-emerald-900/60">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                  <span className="text-xs font-mono font-bold uppercase text-emerald-300">Live AI Crop Health Monitor</span>
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-md font-mono">
                  ACTIVE
                </span>
              </div>

              {/* Leaf Image Scan Simulation View */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-emerald-900/80 group">
                <img
                  src="https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=80&w=800"
                  alt="Cassava Crop Scanner"
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* HUD Laser Scanning Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10B981] animate-bounce"></div>

                {/* Simulated Bounding Target */}
                <div className="absolute top-1/4 left-1/3 w-28 h-28 border-2 border-dashed border-emerald-400/80 rounded-xl flex items-center justify-center animate-pulse">
                  <Search className="w-6 h-6 text-emerald-400 opacity-80" />
                </div>

                {/* Progress Overlay */}
                <div className="absolute bottom-3 left-3 right-3 bg-black/75 backdrop-blur-md p-2.5 rounded-xl border border-emerald-500/30 text-[11px] font-mono flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <RefreshCw className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                    <span className="text-emerald-200">
                      {scannerStep === 0 && 'Examining leaf surface patterns...'}
                      {scannerStep === 1 && 'Identifying crop species: Cassava'}
                      {scannerStep === 2 && 'Evaluating symptom severity...'}
                      {scannerStep === 3 && 'Analysis complete: Health Score 92%'}
                    </span>
                  </div>
                  <span className="text-emerald-400 font-bold">95.4%</span>
                </div>
              </div>

              {/* Dynamic Health Analysis Output Box */}
              <div className="bg-emerald-950/60 border border-emerald-800/60 rounded-2xl p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full">
                      Crop: Cassava Stalk
                    </span>
                    <h4 className="font-bold text-sm text-white mt-1">Cassava Mosaic Virus Symptoms</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-emerald-300 block">Health Score</span>
                    <span className="text-emerald-400 font-black text-lg">92/100</span>
                  </div>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-emerald-900/60 text-xs text-stone-200">
                  <div className="flex items-center space-x-1.5 text-emerald-300 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Recommended Action Plan:</span>
                  </div>
                  <p className="text-[11px] text-stone-300 leading-relaxed font-normal">
                    Prune secondary leaf stems. Apply neem oil extract spray organically. Ensure distance from infected neighbor plots.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 2. How CropMind Works */}
      <section id="how-it-works" className="py-20 bg-white/40 dark:bg-emerald-950/20 border-y border-[#0E2313]/10 dark:border-emerald-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase text-[#4A7C59] dark:text-emerald-400 font-bold tracking-widest">Simple & Fast Process</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0E2313] dark:text-white">
              How CropMind Works
            </h2>
            <p className="text-sm text-[#1A3322] dark:text-stone-300 leading-relaxed">
              In five clear steps, turn any crop image into actionable agricultural intelligence you can trust.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            
            {/* Step 1 */}
            <div className="bg-white/80 dark:bg-stone-900/60 border border-[#0E2313]/10 dark:border-emerald-950 p-6 rounded-2xl space-y-3 relative hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#122A1B] text-white flex items-center justify-center font-bold text-sm shadow">
                1
              </div>
              <Camera className="w-6 h-6 text-[#4A7C59]" />
              <h3 className="font-bold text-sm text-[#0E2313] dark:text-white">Upload Crop Image</h3>
              <p className="text-xs text-[#2E5A3C] dark:text-stone-400 leading-relaxed">
                Take a quick leaf photo with your phone camera or upload an existing image file.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white/80 dark:bg-stone-900/60 border border-[#0E2313]/10 dark:border-emerald-950 p-6 rounded-2xl space-y-3 relative hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#234E35] text-white flex items-center justify-center font-bold text-sm shadow">
                2
              </div>
              <Sparkles className="w-6 h-6 text-[#4A7C59]" />
              <h3 className="font-bold text-sm text-[#0E2313] dark:text-white">AI Analyzes Crop</h3>
              <p className="text-xs text-[#2E5A3C] dark:text-stone-400 leading-relaxed">
                Our vision engine scans leaf structures, color spot distributions, and texture contours.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white/80 dark:bg-stone-900/60 border border-[#0E2313]/10 dark:border-emerald-950 p-6 rounded-2xl space-y-3 relative hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#234E35] text-white flex items-center justify-center font-bold text-sm shadow">
                3
              </div>
              <Activity className="w-6 h-6 text-[#4A7C59]" />
              <h3 className="font-bold text-sm text-[#0E2313] dark:text-white">Health Assessed</h3>
              <p className="text-xs text-[#2E5A3C] dark:text-stone-400 leading-relaxed">
                The crop is given a quantitative health score, confidence rating, and risk status.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white/80 dark:bg-stone-900/60 border border-[#0E2313]/10 dark:border-emerald-950 p-6 rounded-2xl space-y-3 relative hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#234E35] text-white flex items-center justify-center font-bold text-sm shadow">
                4
              </div>
              <Search className="w-6 h-6 text-[#4A7C59]" />
              <h3 className="font-bold text-sm text-[#0E2313] dark:text-white">Problems Identified</h3>
              <p className="text-xs text-[#2E5A3C] dark:text-stone-400 leading-relaxed">
                Detects specific pathogens, pest infestations, nutrient shortages, or drought stress.
              </p>
            </div>

            {/* Step 5 */}
            <div className="bg-white/80 dark:bg-stone-900/60 border border-[#0E2313]/10 dark:border-emerald-950 p-6 rounded-2xl space-y-3 relative hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#4A7C59] text-white flex items-center justify-center font-bold text-sm shadow">
                5
              </div>
              <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              <h3 className="font-bold text-sm text-[#0E2313] dark:text-white">Recommendations</h3>
              <p className="text-xs text-[#2E5A3C] dark:text-stone-400 leading-relaxed">
                Receive practical step-by-step organic treatments, safe chemicals, and preventive tips.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 3. Crop Health Analysis Showcase Section */}
      <section id="crop-health" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase text-[#4A7C59] dark:text-emerald-400 font-bold tracking-widest">Real-World Examples</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0E2313] dark:text-white">
              Crop Health Analysis
            </h2>
            <p className="text-sm text-[#1A3322] dark:text-stone-300 leading-relaxed">
              Explore how CropMind detects and distinguishes between healthy crops and common agricultural challenges.
            </p>
          </div>

          {/* Condition Category Buttons */}
          <div className="flex flex-wrap justify-center gap-2">
            {cropConditions.map((cond) => (
              <button
                key={cond.id}
                onClick={() => setSelectedCondition(cond.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  selectedCondition === cond.id
                    ? 'bg-[#122A1B] text-white border-[#122A1B] shadow-md'
                    : 'bg-white/60 dark:bg-stone-900/60 text-[#0E2313] dark:text-stone-300 border-[#0E2313]/10 dark:border-emerald-950 hover:bg-white'
                }`}
              >
                {cond.title}
              </button>
            ))}
          </div>

          {/* Active Condition Detail Card */}
          <div className="bg-white/90 dark:bg-stone-900/90 border border-[#0E2313]/10 dark:border-emerald-950 rounded-3xl p-6 lg:p-8 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 relative aspect-4/3 rounded-2xl overflow-hidden shadow-md border border-[#0E2313]/10">
              <img
                src={activeConditionObj.imageUrl}
                alt={activeConditionObj.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md ${activeConditionObj.badgeColor}`}>
                  {activeConditionObj.status}
                </span>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="flex justify-between items-start border-b border-[#0E2313]/10 dark:border-emerald-950 pb-4">
                <div>
                  <span className="text-xs font-mono uppercase text-[#4A7C59] font-bold">Crop Type: {activeConditionObj.crop}</span>
                  <h3 className="text-2xl font-extrabold text-[#0E2313] dark:text-white mt-0.5">{activeConditionObj.title}</h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-[#2E5A3C] dark:text-stone-400 block">Health Score</span>
                  <span className="text-2xl font-black text-[#122A1B] dark:text-emerald-400">{activeConditionObj.score}/100</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase font-mono text-[#2E5A3C] dark:text-stone-300">Observed Symptoms:</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeConditionObj.symptoms.map((symptom, idx) => (
                    <li key={idx} className="flex items-center space-x-2 text-xs text-[#0E2313] dark:text-stone-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#4A7C59] flex-shrink-0" />
                      <span>{symptom}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#122A1B]/5 dark:bg-emerald-950/40 p-4 rounded-xl border border-[#122A1B]/10 dark:border-emerald-900/40 space-y-1">
                <p className="text-xs font-bold text-[#122A1B] dark:text-emerald-300">Recommended Action Plan:</p>
                <p className="text-xs text-[#1A3322] dark:text-stone-300 leading-relaxed">{activeConditionObj.action}</p>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs font-mono text-[#2E5A3C] dark:text-stone-400">AI Confidence: {activeConditionObj.confidence}%</span>
                <button
                  onClick={() => navigate('/dashboard/scanner')}
                  className="bg-[#122A1B] text-white hover:bg-[#234E35] text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center space-x-1"
                >
                  <span>Test Scanner With This Crop</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. AI-Powered Insights Section */}
      <section id="ai-insights" className="py-20 bg-white/40 dark:bg-emerald-950/20 border-y border-[#0E2313]/10 dark:border-emerald-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase text-[#4A7C59] dark:text-emerald-400 font-bold tracking-widest">Intelligent Outputs</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0E2313] dark:text-white">
              AI-Powered Insights
            </h2>
            <p className="text-sm text-[#1A3322] dark:text-stone-300 leading-relaxed">
              CropMind translates complex computer vision data into clear, easy-to-understand metrics that help farmers make informed decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Metric 1 */}
            <div className="bg-white/80 dark:bg-stone-900/60 border border-[#0E2313]/10 dark:border-emerald-950 p-6 rounded-2xl space-y-3 shadow-sm hover:border-[#4A7C59] transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#4A7C59]/10 text-[#4A7C59] flex items-center justify-center">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#0E2313] dark:text-white">Crop Health Score</h3>
              <p className="text-xs text-[#2E5A3C] dark:text-stone-400 leading-relaxed">
                A 0–100 numerical index rating plant vigor, leaf pigmentation balance, and structural integrity.
              </p>
            </div>

            {/* Metric 2 */}
            <div className="bg-white/80 dark:bg-stone-900/60 border border-[#0E2313]/10 dark:border-emerald-950 p-6 rounded-2xl space-y-3 shadow-sm hover:border-[#4A7C59] transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#4A7C59]/10 text-[#4A7C59] flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#0E2313] dark:text-white">Disease Probability & Confidence</h3>
              <p className="text-xs text-[#2E5A3C] dark:text-stone-400 leading-relaxed">
                Calculates precise statistical confidence levels matched against verified agronomic datasets.
              </p>
            </div>

            {/* Metric 3 */}
            <div className="bg-white/80 dark:bg-stone-900/60 border border-[#0E2313]/10 dark:border-emerald-950 p-6 rounded-2xl space-y-3 shadow-sm hover:border-[#4A7C59] transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#4A7C59]/10 text-[#4A7C59] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#0E2313] dark:text-white">Organic & Chemical Remedies</h3>
              <p className="text-xs text-[#2E5A3C] dark:text-stone-400 leading-relaxed">
                Clear distinction between low-cost natural remedies and targeted chemical treatments when necessary.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 5. Crop Dashboard Teaser / Preview */}
      <section id="dashboard-preview" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase text-[#4A7C59] dark:text-emerald-400 font-bold tracking-widest">Farm Management Center</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0E2313] dark:text-white">
              Comprehensive Crop Dashboard
            </h2>
            <p className="text-sm text-[#1A3322] dark:text-stone-300 leading-relaxed">
              Monitor your entire farm in one intuitive space — tracking crop health trends, weather warnings, and historical analyses.
            </p>
          </div>

          {/* Dashboard Visual Mockup Box */}
          <div className="bg-[#122A1B] text-white border border-[#122A1B] rounded-[32px] p-6 lg:p-8 shadow-2xl space-y-6">
            
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-emerald-900/80 pb-4 gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">ACTIVE FARM PROFILE</span>
                <h3 className="text-xl font-extrabold text-white">Sunrise Valley Cooperative (12.5 Hectares)</h3>
              </div>
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow cursor-pointer flex items-center space-x-2"
              >
                <span>Launch Interactive Dashboard</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Dashboard Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="bg-emerald-950/60 border border-emerald-900/60 p-4 rounded-2xl space-y-2">
                <span className="text-[10px] font-mono text-emerald-300 uppercase">Overall Canopy Vigor</span>
                <p className="text-2xl font-black text-emerald-400">92% Optimal</p>
                <p className="text-[11px] text-stone-300">12 Scanned Plots Healthy</p>
              </div>

              <div className="bg-emerald-950/60 border border-emerald-900/60 p-4 rounded-2xl space-y-2">
                <span className="text-[10px] font-mono text-emerald-300 uppercase">Total Analyses Run</span>
                <p className="text-2xl font-black text-emerald-400">128 Scans</p>
                <p className="text-[11px] text-stone-300">Last scanned 2 hours ago</p>
              </div>

              <div className="bg-emerald-950/60 border border-emerald-900/60 p-4 rounded-2xl space-y-2">
                <span className="text-[10px] font-mono text-emerald-300 uppercase">Active Risk Alerts</span>
                <p className="text-2xl font-black text-amber-400">1 Field Warning</p>
                <p className="text-[11px] text-stone-300">Early Rust detected in Sector B</p>
              </div>

              <div className="bg-emerald-950/60 border border-emerald-900/60 p-4 rounded-2xl space-y-2">
                <span className="text-[10px] font-mono text-emerald-300 uppercase">Soil Moisture & Weather</span>
                <p className="text-2xl font-black text-emerald-400">42% Hydration</p>
                <p className="text-[11px] text-stone-300">Temp: 26°C | Gentle Rain expected</p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 6. Features Section */}
      <section id="features" className="py-20 bg-white/40 dark:bg-emerald-950/20 border-y border-[#0E2313]/10 dark:border-emerald-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase text-[#4A7C59] dark:text-emerald-400 font-bold tracking-widest">Platform Capabilities</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0E2313] dark:text-white">
              Built For Modern Agriculture
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="bg-white/80 dark:bg-stone-900/60 border border-[#0E2313]/10 dark:border-emerald-950 p-6 rounded-2xl space-y-3 hover:border-[#4A7C59] transition-all">
              <Camera className="w-6 h-6 text-[#4A7C59]" />
              <h3 className="font-bold text-base text-[#0E2313] dark:text-white">AI Crop Analysis</h3>
              <p className="text-xs text-[#2E5A3C] dark:text-stone-400 leading-relaxed">
                Instant computer vision diagnostics examining leaf discoloration and lesion spots.
              </p>
            </div>

            <div className="bg-white/80 dark:bg-stone-900/60 border border-[#0E2313]/10 dark:border-emerald-950 p-6 rounded-2xl space-y-3 hover:border-[#4A7C59] transition-all">
              <Search className="w-6 h-6 text-[#4A7C59]" />
              <h3 className="font-bold text-base text-[#0E2313] dark:text-white">Crop Disease Detection</h3>
              <p className="text-xs text-[#2E5A3C] dark:text-stone-400 leading-relaxed">
                Accurate identification of fungal blights, viral mosaics, bacterial rots, and pest outbreaks.
              </p>
            </div>

            <div className="bg-white/80 dark:bg-stone-900/60 border border-[#0E2313]/10 dark:border-emerald-950 p-6 rounded-2xl space-y-3 hover:border-[#4A7C59] transition-all">
              <Activity className="w-6 h-6 text-[#4A7C59]" />
              <h3 className="font-bold text-base text-[#0E2313] dark:text-white">Crop Health Monitoring</h3>
              <p className="text-xs text-[#2E5A3C] dark:text-stone-400 leading-relaxed">
                Track field health scores across planting cycles to identify deteriorating plots early.
              </p>
            </div>

            <div className="bg-white/80 dark:bg-stone-900/60 border border-[#0E2313]/10 dark:border-emerald-950 p-6 rounded-2xl space-y-3 hover:border-[#4A7C59] transition-all">
              <AlertTriangle className="w-6 h-6 text-[#4A7C59]" />
              <h3 className="font-bold text-base text-[#0E2313] dark:text-white">Early Warning Alerts</h3>
              <p className="text-xs text-[#2E5A3C] dark:text-stone-400 leading-relaxed">
                Receive warnings when disease conditions or adverse weather threaten neighboring fields.
              </p>
            </div>

            <div className="bg-white/80 dark:bg-stone-900/60 border border-[#0E2313]/10 dark:border-emerald-950 p-6 rounded-2xl space-y-3 hover:border-[#4A7C59] transition-all">
              <ShieldCheck className="w-6 h-6 text-[#4A7C59]" />
              <h3 className="font-bold text-base text-[#0E2313] dark:text-white">AI Recommendations</h3>
              <p className="text-xs text-[#2E5A3C] dark:text-stone-400 leading-relaxed">
                Clear step-by-step guidance combining natural organic remedies and safe chemical controls.
              </p>
            </div>

            <div className="bg-white/80 dark:bg-stone-900/60 border border-[#0E2313]/10 dark:border-emerald-950 p-6 rounded-2xl space-y-3 hover:border-[#4A7C59] transition-all">
              <Database className="w-6 h-6 text-[#4A7C59]" />
              <h3 className="font-bold text-base text-[#0E2313] dark:text-white">Crop History & Offline Log</h3>
              <p className="text-xs text-[#2E5A3C] dark:text-stone-400 leading-relaxed">
                Keep an offline history of past scans and field treatments directly in your browser.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 7. Impact Section */}
      <section id="impact" className="py-20 bg-gradient-to-tr from-[#122A1B] to-[#234E35] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase text-emerald-300 font-bold tracking-widest">Real Impact</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Empowering Sustainable Farming
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            
            <div className="bg-emerald-950/40 border border-emerald-800/50 p-6 rounded-2xl space-y-2">
              <p className="text-4xl font-black text-emerald-400">Up to 35%</p>
              <h4 className="font-bold text-sm">Reduced Crop Losses</h4>
              <p className="text-xs text-stone-300">Early disease detection halts field contamination before severe loss.</p>
            </div>

            <div className="bg-emerald-950/40 border border-emerald-800/50 p-6 rounded-2xl space-y-2">
              <p className="text-4xl font-black text-emerald-400">500M+</p>
              <h4 className="font-bold text-sm">Smallholders Targeted</h4>
              <p className="text-xs text-stone-300">Designed specifically for small farms in low-connectivity regions.</p>
            </div>

            <div className="bg-emerald-950/40 border border-emerald-800/50 p-6 rounded-2xl space-y-2">
              <p className="text-4xl font-black text-emerald-400">7 Languages</p>
              <h4 className="font-bold text-sm">Multilingual Access</h4>
              <p className="text-xs text-stone-300">Support for English, Swahili, Hausa, Yoruba, Igbo, French, and Arabic.</p>
            </div>

            <div className="bg-emerald-950/40 border border-emerald-800/50 p-6 rounded-2xl space-y-2">
              <p className="text-4xl font-black text-emerald-400">Zero Cost</p>
              <h4 className="font-bold text-sm">Organic First Remedies</h4>
              <p className="text-xs text-stone-300">Promoting eco-friendly treatments to reduce costly synthetic pesticide reliance.</p>
            </div>

          </div>

        </div>
      </section>

      {/* 8. About CropMind */}
      <section id="about" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-mono uppercase text-[#4A7C59] dark:text-emerald-400 font-bold tracking-widest">Our Mission</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0E2313] dark:text-white">
            Making Agricultural Intelligence Accessible
          </h2>
          <p className="text-base text-[#1A3322] dark:text-stone-300 leading-relaxed font-normal">
            CropMind was created with a clear purpose: to bridge the gap between advanced artificial intelligence and everyday agricultural practices. Smallholder farmers produce over a third of the world's food supply, yet lack access to rapid agronomist diagnostic support. CropMind gives every farmer an intelligent agronomist in their pocket.
          </p>
        </div>
      </section>

      {/* 9. FAQ Section */}
      <section id="faq" className="py-20 bg-white/40 dark:bg-emerald-950/20 border-t border-[#0E2313]/10 dark:border-emerald-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase text-[#4A7C59] dark:text-emerald-400 font-bold tracking-widest">Common Questions</span>
            <h2 className="text-3xl font-extrabold tracking-tight text-[#0E2313] dark:text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/80 dark:bg-stone-900/80 rounded-2xl border border-[#0E2313]/10 dark:border-emerald-950 overflow-hidden shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full flex justify-between items-center p-4 text-left font-bold text-sm text-[#0E2313] dark:text-stone-100 cursor-pointer hover:bg-white/90"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-[#4A7C59] transition-transform ${activeFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {activeFaq === index && (
                  <div className="p-4 pt-0 text-xs text-[#1A3322] dark:text-stone-300 border-t border-[#0E2313]/5 dark:border-emerald-950 leading-relaxed font-normal">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 10. Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-5 space-y-4">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#0E2313] dark:text-white">Get In Touch</h2>
            <p className="text-xs text-[#1A3322] dark:text-stone-300 leading-relaxed">
              Have questions or want to partner with CropMind for regional cooperatives, NGOs, or agricultural programs? Send us a message.
            </p>
            <div className="space-y-2 text-xs font-mono text-[#0E2313] dark:text-stone-300">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#4A7C59]" />
                <span>contact@cropmind.agri</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 bg-white/90 dark:bg-stone-900/90 border border-[#0E2313]/10 dark:border-emerald-950 p-6 rounded-2xl shadow-sm">
            {contactSubmitted ? (
              <div className="p-6 text-center space-y-2">
                <div className="w-10 h-10 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-[#0E2313] dark:text-white">Message Sent!</h4>
                <p className="text-xs text-[#2E5A3C] dark:text-stone-400">Thank you for reaching out to CropMind.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold mb-1 text-[#0E2313] dark:text-stone-300">Your Name</label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full bg-white dark:bg-stone-950 border border-[#0E2313]/20 dark:border-emerald-950 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#4A7C59]"
                    placeholder="e.g. Adebayo Mensah"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1 text-[#0E2313] dark:text-stone-300">Email Address</label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full bg-white dark:bg-stone-950 border border-[#0E2313]/20 dark:border-emerald-950 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#4A7C59]"
                    placeholder="adebayo@farm.org"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1 text-[#0E2313] dark:text-stone-300">Message</label>
                  <textarea
                    required
                    rows={3}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="w-full bg-white dark:bg-stone-950 border border-[#0E2313]/20 dark:border-emerald-950 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#4A7C59]"
                    placeholder="Tell us about your farm or inquiry..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#122A1B] text-white hover:bg-[#234E35] font-bold py-3 rounded-xl text-xs flex items-center justify-center space-x-1.5 cursor-pointer shadow"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* Trust & Credibility Disclaimer Banner */}
      <div className="bg-[#122A1B]/10 dark:bg-emerald-950/40 border-t border-[#0E2313]/10 dark:border-emerald-950 py-4 px-4 text-center">
        <div className="max-w-4xl mx-auto flex items-center justify-center space-x-2 text-xs text-[#2E5A3C] dark:text-stone-400">
          <Info className="w-4 h-4 text-[#4A7C59] flex-shrink-0" />
          <span>
            <strong>Disclaimer:</strong> CropMind provides AI-assisted insights to support crop health monitoring and should not replace professional agricultural extension advice.
          </span>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#122A1B] text-stone-300 py-12 border-t border-emerald-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-xs leading-loose">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Leaf className="w-5 h-5 text-emerald-400" />
              <span className="font-bold text-base tracking-tight text-white">CropMind</span>
            </div>
            <p className="text-stone-400 leading-normal">Intelligent AI Agricultural Platform for Crop Health Monitoring.</p>
          </div>
          <div>
            <h5 className="font-bold text-white mb-2 uppercase tracking-widest font-mono text-[10px]">Platform</h5>
            <ul>
              <li><button onClick={() => navigate('/dashboard/scanner')} className="hover:text-emerald-400 cursor-pointer">AI Crop Scanner</button></li>
              <li><button onClick={() => navigate('/dashboard/soil')} className="hover:text-emerald-400 cursor-pointer">Soil Advisor</button></li>
              <li><button onClick={() => navigate('/dashboard/weather')} className="hover:text-emerald-400 cursor-pointer">Weather Intelligence</button></li>
              <li><button onClick={() => navigate('/dashboard/satellite')} className="hover:text-emerald-400 cursor-pointer">Satellite Monitor</button></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-white mb-2 uppercase tracking-widest font-mono text-[10px]">Company</h5>
            <ul>
              <li><button onClick={() => scrollToSection('about')} className="hover:text-emerald-400 cursor-pointer">About Mission</button></li>
              <li><button onClick={() => scrollToSection('impact')} className="hover:text-emerald-400 cursor-pointer">Agricultural Impact</button></li>
              <li><button onClick={() => scrollToSection('faq')} className="hover:text-emerald-400 cursor-pointer">FAQ</button></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-white mb-2 uppercase tracking-widest font-mono text-[10px]">Support & Legal</h5>
            <ul>
              <li><button onClick={() => scrollToSection('contact')} className="hover:text-emerald-400 cursor-pointer">Contact Us</button></li>
              <li><a href="#privacy" className="hover:text-emerald-400">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-emerald-400">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-8 border-t border-emerald-950/80 flex flex-col md:flex-row items-center justify-between gap-4 text-stone-400 text-[11px]">
          <span>&copy; {new Date().getFullYear()} CropMind. All rights reserved. Intelligent Agricultural Technology.</span>
          <div className="flex space-x-4">
            <a href="#privacy" className="hover:text-white">Privacy Policy</a>
            <span>&bull;</span>
            <a href="#terms" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
