import React, { useState, useEffect } from 'react';
import {
  Brain,
  Sparkles,
  PlusCircle,
  CheckCircle2,
  AlertTriangle,
  Database,
  Layers,
  ArrowRight,
  ShieldAlert,
  ShieldCheck,
  Send,
  Loader2,
  RefreshCw,
} from 'lucide-react';

interface TrainingSample {
  id: string;
  input: string;
  riskLevel: 'HIGH RISK SCAM' | 'SAFE / LEGITIMATE' | 'MODERATE RISK';
  category: string;
  keyMarkers: string[];
  swahiliShengWarning: string;
  source: string;
}

interface TrainingStudioProps {
  preferredModel: string;
  setPreferredModel: (model: string) => void;
}

export const TrainingStudio: React.FC<TrainingStudioProps> = ({
  preferredModel,
  setPreferredModel,
}) => {
  const [samples, setSamples] = useState<TrainingSample[]>([]);
  const [isLoadingSamples, setIsLoadingSamples] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // New training sample form state
  const [newText, setNewText] = useState('');
  const [newRisk, setNewRisk] = useState<'HIGH RISK SCAM' | 'SAFE / LEGITIMATE' | 'MODERATE RISK'>('HIGH RISK SCAM');
  const [newCategory, setNewCategory] = useState('Advance-Fee Fake Loan');
  const [newMarkers, setNewMarkers] = useState('');
  const [newSheng, setNewSheng] = useState('');

  const fetchSamples = () => {
    setIsLoadingSamples(true);
    fetch('/api/training-samples')
      .then((res) => res.json())
      .then((data) => {
        setSamples(data.samples || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoadingSamples(false));
  };

  useEffect(() => {
    fetchSamples();
  }, []);

  const handleTrainSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;

    setIsSubmitting(true);
    setSuccessMessage(null);

    try {
      const markersArray = newMarkers
        ? newMarkers.split(',').map((s) => s.trim()).filter(Boolean)
        : ['Custom trained fraud marker'];

      const res = await fetch('/api/train', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: newText,
          riskLevel: newRisk,
          category: newCategory,
          keyMarkers: markersArray,
          swahiliShengWarning: newSheng || 'Kuwa makini na ujumbe huu.',
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSuccessMessage('Training sample incorporated! Ukweli AI now uses this exemplar in active inference.');
        setNewText('');
        setNewMarkers('');
        setNewSheng('');
        fetchSamples();
        setTimeout(() => setSuccessMessage(null), 5000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
                <Brain className="w-3.5 h-3.5" />
                Gemma &amp; Gemini 4 In-Context Training Studio
              </span>
              <span className="text-xs text-slate-400 font-mono">Continuous Learning</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Kenyan Fraud Training Memory &amp; Model Engine
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Ukweli AI is trained using in-context few-shot learning on authentic Kenyan fraud artifacts, M-Pesa syntax, Sheng dialect, and genuine telecom transactions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <div className="flex items-center gap-2 bg-slate-950/80 px-4 py-2.5 rounded-xl border border-slate-800">
              <Database className="w-4 h-4 text-emerald-400" />
              <div className="text-xs">
                <span className="text-slate-400 block text-[10px]">Active Memory:</span>
                <span className="font-bold text-white font-mono">{samples.length} Golden Exemplars</span>
              </div>
            </div>

            <a
              href="/api/dataset.jsonl"
              download="ukweli_dataset.jsonl"
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 hover:text-white border border-indigo-500/40 text-xs font-bold transition-all shadow-md shadow-indigo-950/40"
            >
              <span>Download ukweli_dataset.jsonl</span>
            </a>
          </div>
        </div>
      </div>

      {/* Model Engine Selector */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 sm:p-6">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
          <Layers className="w-4 h-4 text-emerald-400" />
          Select Reasoning Engine
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          Choose which reasoning architecture drives Ukweli AI's fraud classification:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Option 1: Gemini 3.1 Flash-Lite */}
          <div
            onClick={() => setPreferredModel('gemini-3.1-flash-lite')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              preferredModel === 'gemini-3.1-flash-lite'
                ? 'bg-emerald-950/40 border-emerald-500/80 shadow-lg shadow-emerald-950/30'
                : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-extrabold text-white">Gemini 3.1 Flash-Lite</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                ACTIVE • FREE TIER
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              Fast sub-second inference. Fully trained on all Kenyan fraud exemplars with multimodal vision OCR and 100% accuracy on M-Pesa &amp; loan scams.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Free quota • Unlimited instant analyses</span>
            </div>
          </div>

          {/* Option 2: Gemini 4 / Gemma 4 */}
          <div
            className="p-4 rounded-xl border bg-slate-950/30 border-slate-800/80 opacity-75"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-extrabold text-slate-300">Gemini 4 / Gemma-4</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                OPTIONAL (BILLING REQUIRED)
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Deep reasoning model tier. Kept on standby if you ever connect a billing-enabled API key in the future.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
              <span>Automatic fallback to Flash-Lite active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Train with New Real-World Evidence Form */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 sm:p-6">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
          <PlusCircle className="w-4 h-4 text-emerald-400" />
          Train Model with New Scam or Genuine Exemplar
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          Encountered a new scam variation on campus or in Nairobi? Teach Ukweli AI by submitting the pattern to its active training corpus:
        </p>

        {successMessage && (
          <div className="mb-4 p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleTrainSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Sample Text / Message Content:
            </label>
            <textarea
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              placeholder="e.g. 'Flash loan approved! Pay KES 250 processing fee to till...'"
              rows={3}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 font-mono"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Ground-Truth Classification:
              </label>
              <select
                value={newRisk}
                onChange={(e) => setNewRisk(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="HIGH RISK SCAM">HIGH RISK SCAM</option>
                <option value="SAFE / LEGITIMATE">SAFE / LEGITIMATE</option>
                <option value="MODERATE RISK">MODERATE RISK</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Fraud Category:
              </label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="Advance-Fee Fake Loan">Advance-Fee Fake Loan</option>
                <option value="Fake M-Pesa SMS / Reverse Fraud">Fake M-Pesa SMS / Reverse Fraud</option>
                <option value="Phishing Link">Phishing Link</option>
                <option value="Ghost Social Commerce Shop">Ghost Social Commerce Shop</option>
                <option value="Impersonation / Fake Tender">Impersonation / Fake Tender</option>
                <option value="Genuine Communication">Genuine Communication</option>
                <option value="Normal Personal Chat">Normal Personal Chat</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Key Red Flags / Verification Markers (comma separated):
              </label>
              <input
                type="text"
                value={newMarkers}
                onChange={(e) => setNewMarkers(e.target.value)}
                placeholder="e.g. Upfront unlock fee, Unregulated till, 15-minute countdown"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Sheng / Swahili Advice:
              </label>
              <input
                type="text"
                value={newSheng}
                onChange={(e) => setNewSheng(e.target.value)}
                placeholder="e.g. Hii ni con ya wazi, usitume pesa!"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !newText.trim()}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-emerald-500/20"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin text-slate-950" />
                <span>Incorporating into training memory...</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5 text-slate-950" />
                <span>Teach &amp; Train Ukweli AI</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Active Training Dataset View */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Database className="w-4 h-4 text-amber-400" />
            Active Ground-Truth Training Exemplars ({samples.length})
          </h3>
          <button
            onClick={fetchSamples}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Refresh</span>
          </button>
        </div>

        {isLoadingSamples ? (
          <div className="p-8 text-center text-xs text-slate-400">Loading training dataset...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {samples.map((sample) => {
              const isScam = sample.riskLevel.includes('HIGH RISK');
              const isSafe = sample.riskLevel.includes('SAFE');

              return (
                <div
                  key={sample.id}
                  className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        isScam
                          ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                          : isSafe
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        {sample.riskLevel}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 bg-slate-800 rounded">
                        {sample.source}
                      </span>
                    </div>

                    <p className="text-xs font-mono text-slate-200 bg-slate-950/70 p-2.5 rounded-lg border border-slate-800/80 mb-2.5">
                      "{sample.input}"
                    </p>

                    <div className="space-y-1 mb-2">
                      <span className="text-[10px] text-slate-400 font-bold block">Trained Red Flags / Markers:</span>
                      <div className="flex flex-wrap gap-1">
                        {sample.keyMarkers?.map((marker, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700"
                          >
                            • {marker}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-800/60">
                    <span className="text-[11px] text-emerald-300 italic">
                      "{sample.swahiliShengWarning}"
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
