import React, { useState, useEffect, useRef } from 'react';
import { Mic, Send, Volume2, VolumeX, Sparkles, RefreshCw, MessageSquare, AlertCircle } from 'lucide-react';
import { SupportedLanguage } from '../types';

interface VoiceAssistantProps {
  isOnline: boolean;
  language: SupportedLanguage;
}

const VOICE_PRESETS: Record<SupportedLanguage, string[]> = {
  en: [
    'How do I fix yellow leaves on my Maize?',
    'What organic ways can prevent Cassava Mosaic Virus?',
    'How can I make a natural neem seed insect spray?'
  ],
  sw: [
    'Jinsi ya kuzuia kutu ya majani kwenye mahindi?',
    'Ugonjwa wa mosai ya muhogo unaweza kuzuiliwa vipi?',
    'Mimi ni mkulima, nisaidie kupima afya ya mmea wangu.'
  ],
  ha: [
    'Yaya zan magance tsatsar masara?',
    'Mene ne mafita ga cutar mosai ta rogo?',
    'Sannu, taimake ni da shawarar takin zamani.'
  ],
  yo: [
    'Bawo ni mo ṣe le ṣe idena arun lori agbado?',
    'Kini ojutu si arun ewe lori gbaguda?',
    'Ekaabo, ran mi lọwọ pẹlu imọran ogbin.'
  ],
  ig: [
    'Kedu ka m ga-esi gbochie nchara na ọka m?',
    'Kedu ihe m ga-eme gbasara ọrịa akpụ n\'akwụkwọ ji?',
    'Nnọọ, biko nyere m aka na ndụmọdụ ugbo.'
  ],
  fr: [
    'Comment puis-je soigner la rouille sur mon maïs?',
    'Quelles sont les méthodes biologiques contre la mosaïque?',
    'Donnez-moi une recette de biopesticide naturel.'
  ],
  ar: [
    'كيف يمكنني معالجة اصفرار أوراق الذرة؟',
    'ما هي الطرق العضوية لمكافحة فسيفساء الكسافا؟',
    'مرحباً، ساعدني بنصيحة زراعية لتربتي.'
  ]
};

export default function VoiceAssistant({ isOnline, language }: VoiceAssistantProps) {
  const [query, setQuery] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(true);

  // Speech Recognition state
  const [isListening, setIsListening] = useState<boolean>(false);
  const [recognitionError, setRecognitionError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  // Stop speaking and listening when language or component changes/unmounts
  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [language]);

  const toggleSpeechRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setRecognitionError("Speech Recognition is not supported in this browser. Please use Google Chrome, Safari, or Microsoft Edge.");
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    setRecognitionError(null);
    try {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      
      const langMap: Record<string, string> = {
        en: 'en-US',
        sw: 'sw-KE',
        ha: 'ha-NG',
        yo: 'yo-NG',
        ig: 'ig-NG',
        fr: 'fr-FR',
        ar: 'ar-SA'
      };
      rec.lang = langMap[language] || 'en-US';

      rec.onstart = () => {
        setIsListening(true);
      };

      rec.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setQuery(transcript);
          handleQuerySubmit(transcript);
        }
      };

      rec.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        if (event.error === 'not-allowed') {
          setRecognitionError("Microphone access blocked. Please enable microphone permissions in your browser's address bar settings.");
        } else {
          setRecognitionError(`Speech recognition error: ${event.error}`);
        }
        setIsListening(false);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = rec;
      rec.start();
    } catch (err: any) {
      console.error("Failed to start speech recognition:", err);
      setRecognitionError("Failed to initiate voice recognition session. Please retry.");
      setIsListening(false);
    }
  };

  const speakText = (text: string) => {
    if (!voiceEnabled || !window.speechSynthesis) return;

    window.speechSynthesis.cancel(); // Stop current speech
    
    // Clean markdown before speaking
    const cleanText = text.replace(/[*#`_\-]/g, '').slice(0, 300);
    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    // Choose voice depending on language
    const langMapping: Record<string, string> = {
      en: 'en-US',
      sw: 'en-US', // Swahili speaking falls back to vocal English or native local speech engine if supported
      ha: 'en-US',
      yo: 'en-US',
      ig: 'en-US',
      fr: 'fr-FR',
      ar: 'ar-SA'
    };
    
    utterance.lang = langMapping[language] || 'en-US';
    utterance.rate = 0.95; // Slightly slower for clear rural accentuation
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  };

  const handleQuerySubmit = async (textToSend: string) => {
    if (!textToSend.trim()) return;
    setIsLoading(true);
    setResponse('');
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);

    try {
      if (!isOnline) {
        // Simulate local DB response with custom delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Pick realistic fallback or use simple offline database
        let simulatedResponse = '';
        const lower = textToSend.toLowerCase();
        
        if (language === 'sw') {
          if (lower.includes('mahindi') || lower.includes('kutu')) {
            simulatedResponse = "Ili kuzuia kutu ya majani kwenye mahindi, panda mbegu mwanzo wa msimu na fanya mzunguko wa mazao. Mafuta ya mwarobaini husaidia pia kuua vijidudu vya fangasi.";
          } else {
            simulatedResponse = "Mimi ni CropMind, msaidizi wako wa kilimo. Katika hali ya nje ya mtandao, ninaweza kukupa ushauri wa kimsingi kuhusu kuzuia wadudu na umwagiliaji kwa Kiswahili.";
          }
        } else if (language === 'ha') {
          simulatedResponse = "Sannu! Wannan shi ne CropMind agronomist na gida. Don magance matsalolin gona, yi amfani da takin gargajiya kamar kashin kaji kuma a juya amfanin gona duk shekara.";
        } else {
          // English Fallback
          if (lower.includes('neem') || lower.includes('spray')) {
            simulatedResponse = "To make a natural neem spray: crush 50 grams of dried neem seeds, soak them in 1 liter of fresh water overnight, filter out the debris, and add 2 drops of mild soap. Spray on leaves weekly to repel insects.";
          } else if (lower.includes('mosaic') || lower.includes('cassava')) {
            simulatedResponse = "Cassava Mosaic Virus cannot be cured once infected. To prevent it, always use certified disease-free stem cuttings (like TMS series) and uproot/burn infected plants instantly to protect adjacent stems.";
          } else {
            simulatedResponse = "To keep your soil fertile organically, add abundant composted cattle manure. This supplies stable Nitrogen, boosts beneficial microbes, and increases water field retention capacity during dry spells.";
          }
        }

        setResponse(simulatedResponse);
        speakText(simulatedResponse);
        setIsLoading(false);
        return;
      }

      // Online API call
      const res = await fetch('/api/voice-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: textToSend, language })
      });

      if (!res.ok) throw new Error('Voice API returned a server error');
      
      const data = await res.json();
      if (data.success) {
        setResponse(data.response);
        speakText(data.response);
      } else {
        throw new Error(data.error || 'Response processing failed');
      }

    } catch (err: any) {
      console.warn('Voice query API call failed, loading static backup agronomist handbook:', err);
      const fallbackText = "Hello! I am CropMind. I encountered a network fluctuation. However, remember to prevent crop mold by avoiding sprinkler irrigation. Use drip methods instead to keep crop foliage dry.";
      setResponse(fallbackText);
      speakText(fallbackText);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStopSpeaking = () => {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
  };

  return (
    <div className="bg-white border border-[#E5E2D9] rounded-[32px] p-5 md:p-6 shadow-sm relative overflow-hidden transition-all duration-300 text-[#2D3325]">
      
      {/* Visual audio frequency spectrum ring during output */}
      {isSpeaking && (
        <div className="absolute top-3 right-3 flex items-center space-x-1">
          <span className="w-1 h-3 bg-[#4A7C59] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
          <span className="w-1 h-5 bg-[#4A7C59] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          <span className="w-1 h-2 bg-[#4A7C59] rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center space-x-2.5">
          <Mic className="w-5 h-5 text-[#4A7C59]" />
          <h2 className="font-display font-bold text-[#1E2F23] text-lg">Multilingual Voice Companion</h2>
        </div>
        
        {/* Toggle Voice output */}
        <button
          onClick={() => {
            if (isSpeaking) {
              handleStopSpeaking();
            }
            setVoiceEnabled(!voiceEnabled);
          }}
          className={`p-1.5 rounded-lg border transition-colors ${
            voiceEnabled && isSpeaking
              ? 'bg-[#4A7C59]/10 border-[#4A7C59] text-[#4A7C59]'
              : voiceEnabled
                ? 'bg-[#F5F5F0] border-[#E5E2D9] text-[#5A5A40] hover:text-[#2D3325]'
                : 'bg-red-500/10 border-red-500/20 text-red-500'
          }`}
          title={voiceEnabled ? 'Mute voice synthesis' : 'Unmute voice synthesis'}
        >
          {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>
      </div>

      <div className="space-y-4">
        
        {/* Presets Grid */}
        <div>
          <span className="text-[10px] font-mono text-[#5A5A40] uppercase tracking-wider block mb-2">Common farming questions:</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {(VOICE_PRESETS[language] || VOICE_PRESETS.en).map((preset, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuery(preset);
                  handleQuerySubmit(preset);
                }}
                className="text-left p-2.5 bg-[#FDFCF8] border border-[#E5E2D9] hover:border-[#4A7C59] hover:bg-[#F5F5F0] rounded-xl text-[11px] font-sans text-[#2D3325] leading-normal transition-all cursor-pointer"
              >
                &ldquo;{preset}&rdquo;
              </button>
            ))}
          </div>
        </div>

        {/* Output Panel */}
        <div className="min-h-[120px] bg-[#FDFCF8] border border-[#E5E2D9] rounded-xl p-4 flex flex-col justify-between">
          
          {!response && !isLoading ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-6 text-[#5A5A40]">
              <MessageSquare className="w-8 h-8 mb-1.5 stroke-[1.5]" />
              <p className="text-xs font-sans">Click a preset query above or enter a question below to hear verbal agronomist advice.</p>
            </div>
          ) : isLoading ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-6 space-y-2">
              <RefreshCw className="w-6 h-6 text-[#4A7C59] animate-spin" />
              <span className="text-[11px] font-mono text-[#5A5A40]">Synthesizing expert agricultural response...</span>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center space-x-1.5 text-[#4A7C59] text-[10px] font-mono border-b border-[#E5E2D9] pb-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AGRONOMIST_RESPONSE ({isOnline ? 'LIVE_GEMINI' : 'LOCAL_CACHE'})</span>
              </div>
              <p className="text-xs text-[#2D3325] font-sans leading-relaxed">
                {response}
              </p>
              
              {isSpeaking && (
                <button
                  onClick={handleStopSpeaking}
                  className="text-[10px] font-mono text-red-500 hover:text-red-600 flex items-center space-x-1 mt-2 bg-red-500/5 px-2 py-0.5 rounded border border-red-500/10 cursor-pointer"
                >
                  <span>Stop Speaking</span>
                </button>
              )}
            </div>
          )}

        </div>

        {/* Voice Active banner or Error display */}
        {isListening && (
          <div className="bg-[#4A7C59]/10 border border-[#4A7C59]/20 p-2.5 rounded-xl flex items-center justify-between text-xs text-[#1E2F23] font-sans font-semibold animate-pulse">
            <div className="flex items-center space-x-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span>Listening... Speak your crop problem now.</span>
            </div>
            <button
              onClick={() => {
                if (recognitionRef.current) recognitionRef.current.stop();
                setIsListening(false);
              }}
              className="text-[10px] uppercase font-mono text-stone-500 hover:text-stone-800 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        )}

        {recognitionError && (
          <div className="bg-red-50 border border-red-100 p-2.5 rounded-xl flex items-start space-x-2 text-xs text-red-600 font-sans">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="flex-1 leading-normal">{recognitionError}</p>
          </div>
        )}

        {/* Input Bar */}
        <div className="flex items-center bg-white border border-[#E5E2D9] rounded-xl p-1 shadow-inner focus-within:border-[#4A7C59] transition-colors">
          <button
            type="button"
            onClick={toggleSpeechRecognition}
            className={`p-2 rounded-lg transition-colors cursor-pointer mr-1 ${
              isListening
                ? 'bg-red-500 text-white animate-pulse shadow-md'
                : 'text-[#4A7C59] hover:bg-[#F5F5F0]'
            }`}
            title="Start Speech Recognition / Voice Activation"
          >
            <Mic className="w-4 h-4" />
          </button>
          <input
            type="text"
            placeholder={
              isListening
                ? 'Listening carefully...'
                : language === 'sw'
                  ? 'Uliza CropMind kuhusu kilimo...'
                  : 'Ask CropMind anything about crops...'
            }
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleQuerySubmit(query);
            }}
            className="flex-1 bg-transparent border-0 text-[#2D3325] text-xs font-sans px-2 focus:outline-none placeholder-stone-400"
          />
          <button
            onClick={() => handleQuerySubmit(query)}
            disabled={isLoading || !query.trim()}
            className="bg-[#4A7C59] hover:bg-[#334639] disabled:bg-[#F5F5F0] disabled:text-stone-300 text-white p-2 rounded-lg transition-colors cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
}
