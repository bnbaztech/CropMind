import React from 'react';
import { useApp } from '../../context/AppContext';
import VoiceAssistant from '../../components/VoiceAssistant';
import { MessageSquare, Volume2, ShieldCheck } from 'lucide-react';

export default function AIChatPage() {
  const { isOnline, language } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 dark:border-emerald-950 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-stone-900 dark:text-white flex items-center">
            <MessageSquare className="w-5 h-5 mr-2 text-[#4A7C59]" />
            AI Agronomist Voice Assistant
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Dictate agricultural problems in native dialects to receive verbal recommendations from Google Gemini.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Voice Assistant component */}
        <div className="lg:col-span-8">
          <VoiceAssistant isOnline={isOnline} language={language} />
        </div>

        {/* Audio helper */}
        <div className="lg:col-span-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-emerald-950 rounded-2xl p-5 space-y-4 shadow-sm">
          <div className="flex items-center space-x-2 font-bold text-sm">
            <Volume2 className="w-4.5 h-4.5 text-[#4A7C59]" />
            <span>Interactive Voice Commands</span>
          </div>

          <div className="text-xs text-stone-500 dark:text-stone-400 space-y-3 leading-relaxed">
            <p>
              Your assistant supports speech recognition and verbal synthesis. Click the microphone to dictate your inquiry.
            </p>
            <div className="p-3 bg-stone-50 dark:bg-stone-950 rounded-xl font-mono text-[11px] space-y-1 text-stone-600 dark:text-stone-300">
              <p className="font-bold text-[#4A7C59]">&ldquo;My cocoa leaves have yellow spots&rdquo;</p>
              <p className="font-bold text-[#4A7C59]">&ldquo;What is the best NPK ratio for maize?&rdquo;</p>
              <p className="font-bold text-[#4A7C59]">&ldquo;Recommend organic pesticides&rdquo;</p>
            </div>
            <p className="text-[10px] text-stone-400">
              The assistant will translate and speak back the solutions in your selected language setting.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
