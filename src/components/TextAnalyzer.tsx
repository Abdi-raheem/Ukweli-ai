import React, { useState } from 'react';
import { Send, Sparkles, Trash2, ArrowUpRight, ShieldCheck, AlertCircle, Loader2, Sliders } from 'lucide-react';
import { KENYAN_SCAM_SCENARIOS } from '../data/scamScenarios';
import { AnalysisResult, ScamScenario } from '../types';

interface TextAnalyzerProps {
  languageMode: string;
  onAnalyzeSuccess: (result: AnalysisResult, text: string) => void;
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
}

export const TextAnalyzer: React.FC<TextAnalyzerProps> = ({
  languageMode,
  onAnalyzeSuccess,
  isLoading,
  setIsLoading,
}) => {
  const [inputText, setInputText] = useState('');
  const [strictMode, setStrictMode] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelectScenario = (scenario: ScamScenario) => {
    setInputText(scenario.text);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!inputText.trim()) {
      setError('Please paste a suspicious SMS, WhatsApp broadcast, or loan approval message first.');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,
          languageMode,
          strictMode,
        }),
      });

      if (!response.ok) {
        throw new Error('Analysis service error. Please try again.');
      }

      const data = await response.json();
      onAnalyzeSuccess(data, inputText);
    } catch (err: any) {
      console.error('Analysis error:', err);
      setError(err.message || 'Failed to analyze text. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Intro Context Banner */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>Inspect SMS, WhatsApp or Loan Pitch</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                High-Precision Engine
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Paste any message claiming to be M-Pesa, instant loans, government bursaries, or WhatsApp deals.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Strict mode toggle */}
            <label className="flex items-center gap-2 text-xs text-slate-300 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={strictMode}
                onChange={(e) => setStrictMode(e.target.checked)}
                className="rounded accent-emerald-500 text-emerald-500"
              />
              <span className="font-medium text-[11px]">Strict Security Filter</span>
            </label>

            {inputText && (
              <button
                onClick={() => setInputText('')}
                className="text-xs text-slate-400 hover:text-red-400 flex items-center gap-1 transition-colors px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-800 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            )}
          </div>
        </div>

        {/* Text Area */}
        <div className="relative">
          <textarea
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
              if (error) setError(null);
            }}
            placeholder="Paste suspicious text here...&#10;e.g. 'RC82KL9201 Confirmed. You have received Ksh 14,500 from...' or 'Your loan has been approved. Pay KES 350 activation fee...'"
            rows={6}
            disabled={isLoading}
            className="w-full bg-slate-950/90 border border-slate-800 rounded-xl p-4 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/50 transition-all font-mono leading-relaxed"
          />
          <div className="flex items-center justify-between mt-2 text-[11px] text-slate-500 px-1">
            <span>Calibrated on Safaricom 333 fraud signatures, CBK lender criteria & Sheng dialect</span>
            <span>{inputText.length} characters</span>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mt-3 p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-xs text-red-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Analyze Action Button */}
        <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Multi-factor check: Sender ID, Upfront fee, Phishing domain, Urgency</span>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={isLoading || !inputText.trim()}
            className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20 active:scale-[0.98] cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                <span>Auditing fraud markers with high precision...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4 text-slate-950" />
                <span>Run High-Accuracy Audit</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Quick Test Presets Carousel / Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Quick Test Real Kenyan Scenarios (1-Click Presets)
          </h3>
          <span className="text-[11px] text-slate-500">Click any card to load text</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {KENYAN_SCAM_SCENARIOS.map((scenario) => (
            <div
              key={scenario.id}
              onClick={() => handleSelectScenario(scenario)}
              className="group p-3.5 rounded-xl bg-slate-900/40 hover:bg-slate-900 border border-slate-800/80 hover:border-emerald-500/50 cursor-pointer transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {scenario.contextTag}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      scenario.riskHint === 'Safe'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-red-500/10 text-red-400'
                    }`}
                  >
                    {scenario.riskHint}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {scenario.title}
                </h4>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                  {scenario.description}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-emerald-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                <span>Load Scenario</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
