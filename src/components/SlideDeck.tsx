import React, { useState } from 'react';
import { BLUEPRINT_SECTIONS } from '../blueprintData';
import { Presentation, BookOpen, Search, ChevronLeft, ChevronRight, Copy, Check, Terminal, ExternalLink } from 'lucide-react';

export default function SlideDeck() {
  const [activeMode, setActiveMode] = useState<'blueprint' | 'slides'>('slides');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Blueprint pagination / states
  const [selectedSectionId, setSelectedSectionId] = useState<string>('exec_summary');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Slides State
  const [currentSlideIdx, setCurrentSlideIdx] = useState<number>(0);

  // 10 Master Slides details
  const SLIDES = [
    {
      num: 1,
      title: 'CropMind',
      subtitle: 'AI Agronomist for 500 Million Smallholder Farmers',
      theme: 'Offline. Multilingual. Satellite-Powered.',
      bullets: [
        'An executive-grade PWA helping rural farmers optimize yield, predict diseases early, and secure food supply.',
        'Engineered for extreme developing world scenarios: works with zero active internet bars.',
        'Empowering families and stabilizing global food reserves.'
      ],
      visual: 'SOIL_OBSIDIAN OLED CANVAS // ACTIVE'
    },
    {
      num: 2,
      title: 'The Smallholder Information Vacuum',
      subtitle: 'The Core Agronomic Challenge',
      theme: 'Lower Yields, Catastrophic Losses, Extreme Poverty',
      bullets: [
        'Extension Officer Crisis: 1 agronomist per 5,000 rural farmers in Sub-Saharan Africa.',
        'Delayed Pest Detection: Crop rust or mosaic infections wipe out up to 40% of seasonal harvests.',
        'The Connectivity Void: 60%+ of deep rural fields lack stable 3G/4G bandwidth.'
      ],
      visual: 'AGRICULTURAL ANOMALY STATISTICS: $40B LOSSES'
    },
    {
      num: 3,
      title: 'The CropMind Ecosystem',
      subtitle: 'Universal Accessibility Core Features',
      theme: 'Three Pillars of Integrated Farming Intelligence',
      bullets: [
        'Multimodal Vision Scanner: Cloud-backed disease and pest identification with localized organic treatments.',
        'Offline Synchronization Queue: IndexedDB queue syncing seamlessly to PostgreSQL using CRDT systems.',
        'Hands-Free Voice Core: Browser-native verbal commands in Swahili, Hausa, Arabic, French, and English.'
      ],
      visual: 'VOICE_TRANSCRIPTION_WAVEFORM: SW_HA_EN_AR_FR'
    },
    {
      num: 4,
      title: 'Offline-First Database Sync',
      subtitle: 'Full Transaction Resilience',
      theme: 'Zero-Connectivity Agricultural Logging Engine',
      bullets: [
        'Local SQLite / IndexedDB Cache: Locks state locally with Cache-First asset-loading policies.',
        'Action Queue Serialization: Serially appends yield and soil edits, keeping track of modification timestamps.',
        'Conflict Reconciliation: Initiates automatic Last-Write-Wins (LWW) and additive aggregations upon re-connection.'
      ],
      visual: 'SYNC_TRANSACTION_QUEUE // ACTION: CREATE_RECORD'
    },
    {
      num: 5,
      title: 'Google Earth Observation Maps',
      subtitle: 'Soil and Vigor Diagnostics from Space',
      theme: 'Satellite Sentinel-2 Multi-spectral Calculations',
      bullets: [
        'Normalized Difference Vegetation Index (NDVI) monitoring of photosynthetically active leaf vigor.',
        'Normalized Difference Water Index (NDWI) algorithms calculating crop hydraulic stresses early.',
        'Google Earth Engine programmatic composites querying crop health without field sensor costs.'
      ],
      visual: 'GIS_HEATMAP_RADAR // NDVI > 0.7 NORMAL'
    },
    {
      num: 6,
      title: 'Multilingual Voice Companion',
      subtitle: 'Bridging the Literacy Gap',
      theme: 'Natural Dialogues in Native Farming Dialects',
      bullets: [
        'Integrates browser speech translation models for hands-free, field-ready verbal queries.',
        'Supports Swahili, Hausa, Yoruba, Igbo, French, Arabic, and English out-of-the-box.',
        'Speaks answers back aloud using local speech pitch accents, ensuring high comprehension.'
      ],
      visual: 'VOICE_ACCENT_SYNTHESIS: kore_zephyr'
    },
    {
      num: 7,
      title: 'System & Security Architecture',
      subtitle: 'Enterprise-Grade Full-Stack Flow',
      theme: 'Containerized Edge-to-Cloud Pipeline',
      bullets: [
        'Secure Express Node Server running in Cloud Run, auto-scaling based on regional daylight usage spikes.',
        'API Keys Protected: Gemini keys kept strictly server-side, never exposed to browser dev tools.',
        'Drizzle ORM + Postgres: Scalable relational databases with secure, rapid indices.'
      ],
      visual: 'CLOUDRUN // REGION: EUROPE-WEST2 // SSL: TLS 1.3'
    },
    {
      num: 8,
      title: 'Business Model & Scaling Impact',
      subtitle: 'A B2B2C Sustainable Enterprise',
      theme: 'Partnership, Licensing, and Micro-Finance Scopes',
      bullets: [
        'NGO & Government Licensing: Standard B2B software model for regional ag cooperatives and global UN plans.',
        'Crop Yield Profiling: Secure yields history records as digital proof to unlock micro-loans for rural unbanked.',
        'Carbon and Climate Insurance: Tracking agricultural preservation aggregates for climate brokers.'
      ],
      visual: 'B2B2C REVENUE MODEL: FREEMIUM + COOP SAAS'
    },
    {
      num: 9,
      title: 'Project Roadmap',
      subtitle: 'Development and regional pilot milestones',
      theme: 'From GDG Hack MVP to International Rollout',
      bullets: [
        'MVP (Q2 2026): Responsive interactive portal with server Gemini scanner and satellite dashboard simulations.',
        'Beta (Q4 2026): Launch pilots with 5 cooperatives (1,000 active farmers) in Kenya and Nigeria.',
        'Production (Q2 2027): Incorporate native quantized on-device MobileNet CNN crop models under 10MB.'
      ],
      visual: 'PILOT PHASE 1 // COOPERATIVES: KENYA, NIGERIA, INDIA'
    },
    {
      num: 10,
      title: 'Nourishing the Future',
      subtitle: 'Why CropMind Wins the Hackathon',
      theme: 'High Technical Fidelity, Human-Centric Purpose',
      bullets: [
        'Real Working Integration: Uses live Express server-side Gemma 4 calls for multi-spectral analysis.',
        'Deep Operational Integrity: Truly simulates offline sync cycles, voice synthetics, and soil chemistry indices.',
        'Empowering Smallholders: Resolving a massive global crisis through code.'
      ],
      visual: 'CROPMIND_CORE_LIVE // COMPILATION GREEN'
    }
  ];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  // Filtering blueprint sections based on categories and search query
  const filteredSections = BLUEPRINT_SECTIONS.filter((sec) => {
    const matchesCategory = activeCategory === 'All' || sec.category === activeCategory;
    const matchesSearch = sec.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          sec.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const selectedSection = BLUEPRINT_SECTIONS.find(s => s.id === selectedSectionId) || BLUEPRINT_SECTIONS[0];

  return (
    <div className="bg-white border border-[#E5E2D9] rounded-[32px] p-5 md:p-6 shadow-sm flex flex-col min-h-[500px] transition-all duration-300 text-[#2D3325]">
      
      {/* Mode selectors */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#E5E2D9] pb-4 mb-5 gap-3">
        <div className="flex items-center space-x-2">
          {activeMode === 'slides' ? (
            <Presentation className="w-5 h-5 text-[#D48C45]" />
          ) : (
            <BookOpen className="w-5 h-5 text-[#4A7C59]" />
          )}
          <h2 className="font-display font-bold text-[#1E2F23] text-lg">
            {activeMode === 'slides' ? 'GDG & MLH Hackathon Slide Deck' : 'Technical Blueprint & Documentation'}
          </h2>
        </div>

        {/* Mode Toggle Tabs */}
        <div className="flex bg-[#FDFCF8] p-1 border border-[#E5E2D9] rounded-xl">
          <button
            onClick={() => setActiveMode('slides')}
            className={`px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-all cursor-pointer ${
              activeMode === 'slides'
                ? 'bg-[#D48C45]/10 text-[#92400E] border border-[#D48C45]/20 shadow-sm'
                : 'text-[#5A5A40] hover:text-[#2D3325]'
            }`}
          >
            Presentation Slides
          </button>
          <button
            onClick={() => setActiveMode('blueprint')}
            className={`px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-all cursor-pointer ${
              activeMode === 'blueprint'
                ? 'bg-[#4A7C59]/10 text-[#4A7C59] border border-[#4A7C59]/20 shadow-sm'
                : 'text-[#5A5A40] hover:text-[#2D3325]'
            }`}
          >
            System Blueprint Docs
          </button>
        </div>
      </div>

      {/* Mode: Slide Deck Presentation */}
      {activeMode === 'slides' && (
        <div className="flex-1 flex flex-col justify-between">
          
          {/* Slide Stage Container */}
          <div className="aspect-[16/9] w-full max-w-3xl mx-auto bg-[#FDFCF8] border border-[#E5E2D9] rounded-xl p-5 md:p-8 flex flex-col justify-between relative shadow-sm overflow-hidden group">
            
            {/* Visual Slide background glow */}
            <div className="absolute inset-0 bg-radial-slide opacity-5 pointer-events-none" />

            {/* Slide Header */}
            <div className="flex justify-between items-start relative z-10">
              <div>
                <span className="text-[9px] font-mono text-[#4A7C59] tracking-widest uppercase block mb-1">
                  GDG HACKATHON // DEMO DECK
                </span>
                <span className="text-[#5A5A40] text-xs font-mono">
                  Slide {SLIDES[currentSlideIdx].num} of {SLIDES.length}
                </span>
              </div>
              <div className="w-6 h-6 rounded bg-[#4A7C59]/10 border border-[#4A7C59]/20 flex items-center justify-center">
                <span className="text-[10px] font-mono text-[#4A7C59] font-bold">{SLIDES[currentSlideIdx].num}</span>
              </div>
            </div>

            {/* Slide Body */}
            <div className="my-auto py-4 relative z-10">
              <h3 className="font-display font-bold text-xl md:text-3xl text-[#1E2F23] leading-tight">
                {SLIDES[currentSlideIdx].title}
              </h3>
              <p className="text-xs md:text-sm text-[#D48C45] font-mono mt-1 mb-4 italic uppercase tracking-wider">
                {SLIDES[currentSlideIdx].subtitle}
              </p>
              
              <ul className="space-y-2 md:space-y-3 pl-1 max-w-2xl">
                {SLIDES[currentSlideIdx].bullets.map((bullet, idx) => (
                  <li key={idx} className="text-xs md:text-sm text-[#2D3325] font-sans flex items-start space-x-2">
                    <span className="text-[#4A7C59] mt-1 flex-shrink-0">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Slide Footer */}
            <div className="flex justify-between items-center border-t border-[#E5E2D9] pt-3 relative z-10 text-[10px] font-mono text-[#5A5A40]">
              <span>Theme: {SLIDES[currentSlideIdx].theme}</span>
              <span className="hidden sm:inline bg-white border border-[#E5E2D9] px-1.5 py-0.5 rounded text-[#2D3325]">
                {SLIDES[currentSlideIdx].visual}
              </span>
            </div>

          </div>

          {/* Slide Navigation */}
          <div className="flex items-center justify-between w-full max-w-3xl mx-auto mt-4 px-2">
            <button
              onClick={() => setCurrentSlideIdx(prev => Math.max(prev - 1, 0))}
              disabled={currentSlideIdx === 0}
              className="flex items-center space-x-1 px-3 py-1.5 bg-white hover:bg-[#F5F5F0] disabled:bg-white disabled:text-stone-300 border border-[#E5E2D9] text-[#2D3325] text-xs font-sans font-medium rounded-lg transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <div className="flex items-center space-x-1.5">
              {SLIDES.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlideIdx(idx)}
                  className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                    currentSlideIdx === idx ? 'bg-[#D48C45] w-4' : 'bg-[#E5E2D9] hover:bg-[#5A5A40]'
                  }`}
                  title={`Go to Slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrentSlideIdx(prev => Math.min(prev + 1, SLIDES.length - 1))}
              disabled={currentSlideIdx === SLIDES.length - 1}
              className="flex items-center space-x-1 px-3 py-1.5 bg-white hover:bg-[#F5F5F0] disabled:bg-white disabled:text-stone-300 border border-[#E5E2D9] text-[#2D3325] text-xs font-sans font-medium rounded-lg transition-colors cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Pitches Quick Display */}
          <div className="mt-6 border-t border-[#E5E2D9] pt-5 max-w-3xl mx-auto w-full">
            <div className="bg-[#FDFCF8] border border-[#E5E2D9] p-4 rounded-xl">
              <span className="text-[10px] font-mono text-[#92400E] uppercase block mb-1">Interactive Elevator Pitch Script:</span>
              <p className="text-xs text-[#2D3325] font-sans leading-relaxed italic">
                &ldquo;Half a billion smallholder farmers grow 80% of the food in Asia and Africa. Yet when a leaf disease strikes, they have no agronomist, no reliable internet, and no modern soil tools. CropMind is their savior. It is an offline-first, satellite-powered AI agronomist that speaks Swahili, Hausa, Arabic, and French. It scans leaf photos offline, monitors soil-moisture from space, and caches records instantly, unlocking micro-credit for the unbanked. CropMind is ready to nourish the future!&rdquo;
              </p>
            </div>
          </div>

        </div>
      )}

      {/* Mode: Technical Blueprint Documentation */}
      {activeMode === 'blueprint' && (
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-5 h-[400px]">
          
          {/* Left Column: Search & Sections lists */}
          <div className="md:col-span-4 flex flex-col space-y-3 h-full overflow-hidden">
            
            {/* Search */}
            <div className="flex items-center bg-white border border-[#E5E2D9] rounded-xl px-2.5 py-1.5">
              <Search className="w-3.5 h-3.5 text-[#5A5A40] mr-2" />
              <input
                type="text"
                placeholder="Search blueprint..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-0 text-[#2D3325] text-xs font-sans focus:outline-none w-full placeholder-[#5A5A40]/70"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
              {['All', 'Strategic', 'Architecture', 'Ecosystem', 'Business', 'Pitch'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-none px-2.5 py-1 rounded text-[10px] font-sans font-medium transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-[#4A7C59]/10 text-[#4A7C59] border border-[#4A7C59]/20'
                      : 'bg-white text-[#5A5A40] hover:text-[#2D3325] border border-[#E5E2D9]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sections list */}
            <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 scrollbar-thin">
              {filteredSections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => setSelectedSectionId(sec.id)}
                  className={`w-full text-left p-2.5 rounded-lg text-xs font-sans border transition-all cursor-pointer ${
                    selectedSectionId === sec.id
                      ? 'bg-[#FDFCF8] border-[#4A7C59] text-[#1E2F23] font-semibold'
                      : 'bg-white border-[#E5E2D9] text-[#5A5A40] hover:text-[#2D3325]'
                  }`}
                >
                  <span className="block truncate">{sec.title}</span>
                  <span className="text-[9px] text-[#5A5A40] font-mono block mt-0.5 uppercase tracking-wider">{sec.category}</span>
                </button>
              ))}

              {filteredSections.length === 0 && (
                <span className="text-xs text-[#5A5A40] font-sans text-center block py-6">No matching sections found</span>
              )}
            </div>

          </div>

          {/* Right Column: Section Content Reading Pane */}
          <div className="md:col-span-8 bg-[#FDFCF8] border border-[#E5E2D9] rounded-xl p-4 md:p-5 flex flex-col justify-between h-full overflow-hidden relative">
            
            {/* Header copy buttons */}
            <div className="flex justify-between items-center border-b border-[#E5E2D9] pb-2.5 mb-4">
              <span className="text-[10px] font-mono text-[#5A5A40] uppercase tracking-widest">
                SYSTEM DOCUMENTATION READING VIEW
              </span>
              
              <button
                onClick={() => handleCopy(selectedSection.content, selectedSection.id)}
                className="flex items-center space-x-1 px-2 py-1 rounded bg-white hover:bg-[#F5F5F0] border border-[#E5E2D9] text-[#5A5A40] text-[10px] font-mono transition-colors cursor-pointer"
                title="Copy markdown text"
              >
                {copiedId === selectedSection.id ? (
                  <>
                    <Check className="w-3 h-3 text-[#4A7C59]" />
                    <span className="text-[#4A7C59] font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Markdown</span>
                  </>
                )}
              </button>
            </div>

            {/* Reading body */}
            <div className="flex-1 overflow-y-auto pr-1 text-[#2D3325] text-xs leading-relaxed space-y-3 font-sans scrollbar-thin">
              {/* Manual parsing of simplistic markdown headers and bullets */}
              {selectedSection.content.split('\n').map((line, idx) => {
                if (line.startsWith('### ')) {
                  return <h3 key={idx} className="text-[#1E2F23] font-bold text-lg font-display pt-2 border-b border-[#E5E2D9] pb-1">{line.replace('### ', '')}</h3>;
                }
                if (line.startsWith('#### ')) {
                  return <h4 key={idx} className="text-[#4A7C59] font-bold text-xs font-mono uppercase tracking-wider pt-2">{line.replace('#### ', '')}</h4>;
                }
                if (line.startsWith('**') && line.endsWith('**')) {
                  return <p key={idx} className="text-[#2D3325] font-bold text-xs">{line.replace(/\*\*/g, '')}</p>;
                }
                if (line.startsWith('- ') || line.startsWith('* ')) {
                  return <li key={idx} className="pl-3 py-0.5 text-[#2D3325] list-disc list-inside">{line.substring(2)}</li>;
                }
                if (line.startsWith('`') || line.startsWith('  `')) {
                  return <pre key={idx} className="p-3 bg-white border border-[#E5E2D9] rounded-md font-mono text-[11px] text-[#4A7C59] overflow-x-auto whitespace-pre-wrap leading-tight my-2">{line.replace(/`/g, '')}</pre>;
                }
                if (line.trim() === '```' || line.trim() === '```sql') {
                  return null;
                }
                return <p key={idx} className="text-[#2D3325] text-xs font-sans leading-relaxed">{line}</p>;
              })}
            </div>

            {/* Footer indicator */}
            <div className="border-t border-[#E5E2D9] pt-2 text-[9px] font-mono text-[#5A5A40] flex justify-between items-center mt-3">
              <span>Section ID: {selectedSection.id}</span>
              <span>CropMind Hackathon Enterprise Blueprint © 2026</span>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
