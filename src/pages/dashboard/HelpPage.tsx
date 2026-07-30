import React, { useState } from 'react';
import { HelpCircle, BookOpen, MessageSquare, Mail, Check, Compass } from 'lucide-react';

export default function HelpPage() {
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setTicketSubject('');
      setTicketMessage('');
      setSubmitted(false);
    }, 4000);
  };

  const manualGuides = [
    { title: "Diagnosing Leaf Blight & Rusts", duration: "5 mins read", desc: "Best practices on focal points, distance ratios, and solar angles for optimal leaf classification scans." },
    { title: "Understanding NDVI & Crop Stress", duration: "8 mins read", desc: "How to interpret chlorophyll absorption, soil indexes, and dry leaf canopy signals inside the satellite monitor." },
    { title: "Managing your Offline Caches", duration: "4 mins read", desc: "Wipe and sync logs of your local offline databases safely without losing seasonal crop records." }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 dark:border-emerald-950 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-stone-900 dark:text-white flex items-center">
            <HelpCircle className="w-5 h-5 mr-2 text-[#4A7C59]" />
            Help Center & Troubleshooting Manuals
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Read agronomy tutorials, platform troubleshooting steps, or message cooperative advisor coordinators.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Guides */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-emerald-950 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-sm flex items-center">
              <BookOpen className="w-4 h-4 text-[#4A7C59] mr-1.5" />
              Agronomic Guides & Manuals
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {manualGuides.map((guide, index) => (
                <div key={index} className="p-4 bg-stone-50 dark:bg-stone-950 rounded-xl border border-stone-150 dark:border-emerald-900/30 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono font-bold text-[#4A7C59] uppercase">{guide.duration}</span>
                    <h5 className="font-bold text-xs hover:text-[#4A7C59] transition-colors cursor-pointer">{guide.title}</h5>
                    <p className="text-[11px] text-stone-500 leading-relaxed">{guide.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick FAQ summary */}
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-emerald-950 p-6 rounded-2xl space-y-3 shadow-sm text-xs leading-relaxed text-stone-500">
            <h4 className="font-bold text-stone-850 dark:text-stone-100 mb-2 text-sm flex items-center">
              <Compass className="w-4 h-4 text-[#4A7C59] mr-1.5" />
              Troubleshooting Quick Reference
            </h4>
            <p><b>Is my GPS location precise?</b> CropMind reverse-geocodes with high-accuracy GPS triggers. If inside concrete structures, please step outdoors and tap "Calibrate Precise GPS" inside your Profile.</p>
            <p className="mt-2"><b>Why did my scan fail?</b> If the leaf is blurry, dark, or contains multiple leaf varieties, the Google Gemini classifier might fail. Please ensure the target leaf fills 70% of the camera viewfinder frame.</p>
          </div>
        </div>

        {/* Contact form */}
        <div className="lg:col-span-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-emerald-950 p-6 rounded-2xl space-y-4 shadow-sm">
          <div className="flex items-center space-x-2 font-bold text-sm">
            <MessageSquare className="w-4.5 h-4.5 text-[#4A7C59]" />
            <span>Submit Coordinator Ticket</span>
          </div>

          {submitted ? (
            <div className="p-6 text-center space-y-2 text-xs text-stone-500 bg-emerald-50 rounded-xl">
              <Check className="w-6 h-6 text-emerald-600 mx-auto" />
              <p className="font-bold">Ticket Submitted!</p>
              <p>Your cooperative advisor will contact you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmitTicket} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold mb-1">Inquiry Subject</label>
                <input
                  type="text"
                  required
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  placeholder="e.g. Cocoa Spot Disease concern"
                  className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-emerald-950 rounded-lg p-2 text-xs focus:outline-none focus:border-[#4A7C59]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold mb-1">Details Message</label>
                <textarea
                  required
                  rows={4}
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  placeholder="Please state symptoms, crops, or platform issues..."
                  className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-emerald-950 rounded-lg p-2 text-xs focus:outline-none focus:border-[#4A7C59]"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#4A7C59] hover:bg-[#3d6549] text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center space-x-1 shadow cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Submit Ticket</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
