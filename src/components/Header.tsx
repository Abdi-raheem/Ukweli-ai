import React, { useEffect, useState } from 'react';
import { Shield, Cpu, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  languageMode: string;
  setLanguageMode: (mode: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  languageMode,
  setLanguageMode,
  activeTab,
  setActiveTab,
}) => {
  const [serverHealth, setServerHealth] = useState<{ status: string; hasKey: boolean } | null>(null);

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => setServerHealth(data))
      .catch(() => setServerHealth({ status: 'offline', hasKey: false }));
  }, []);

  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-40">
      {/* Top National Intelligence Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-red-950 px-4 py-1.5 text-xs text-slate-300 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              KENYA DIGITAL FRAUD &amp; M-PESA SHIELD
            </span>
            <span className="hidden sm:inline text-slate-400">• Nairobi Cybercrime &amp; Anti-Scam Intelligence</span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span>Gemma &amp; Gemini 3.1 Flash</span>
            </div>
            {serverHealth && (
              <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] ${
                serverHealth.status === 'ok' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
              }`}>
                <CheckCircle2 className="w-3 h-3" />
                Active
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('text')}>
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-red-600 p-[1.5px] shadow-lg shadow-emerald-900/30">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Shield className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 text-[10px] bg-red-600 text-white font-black px-1 rounded-sm shadow">
                KE
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
                  Ukweli <span className="text-emerald-400 font-mono">AI</span>
                </h1>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 bg-slate-800 text-slate-300 rounded border border-slate-700">
                  National Edition
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Kenya's Real-Time Scam, M-Pesa &amp; Fake News Detector
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs (Text, Image, Radar) */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <button
            onClick={() => setActiveTab('text')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'text'
                ? 'bg-emerald-500 text-slate-950 shadow-sm shadow-emerald-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            💬 Check SMS / WhatsApp
          </button>

          <button
            onClick={() => setActiveTab('image')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'image'
                ? 'bg-emerald-500 text-slate-950 shadow-sm shadow-emerald-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            📸 Check Screenshot
          </button>

          <button
            onClick={() => setActiveTab('radar')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'radar'
                ? 'bg-emerald-500 text-slate-950 shadow-sm shadow-emerald-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            🔍 Threat Radar &amp; Sheng
          </button>

          <button
            onClick={() => setActiveTab('train')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'train'
                ? 'bg-indigo-500 text-white shadow-sm shadow-indigo-500/20'
                : 'text-indigo-300 hover:text-white bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30'
            }`}
          >
            🧠 Model Training &amp; Corpus
          </button>
        </div>

        {/* Language selector */}
        <div className="hidden lg:flex items-center gap-2 border-l border-slate-800 pl-4">
          <span className="text-[11px] text-slate-400 font-medium">Verdict Dialect:</span>
          <select
            value={languageMode}
            onChange={(e) => setLanguageMode(e.target.value)}
            className="text-xs bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            <option value="English with Sheng & Swahili">English + Sheng (Nairobi Style)</option>
            <option value="Swahili & Sheng Only">Kiswahili & Sheng Pekee</option>
            <option value="Formal English">Formal English (Regulatory Report)</option>
          </select>
        </div>
      </div>
    </header>
  );
};
