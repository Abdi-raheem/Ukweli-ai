import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Sparkles, X, AlertCircle, Loader2, FileText, CheckCircle2 } from 'lucide-react';
import { AnalysisResult } from '../types';

interface ImageAnalyzerProps {
  languageMode: string;
  onAnalyzeSuccess: (result: AnalysisResult, text: string) => void;
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
}

// Pre-built sample evidence screenshots represented as high-quality SVGs converted to data URLs
// so judges can immediately test the multimodal vision capabilities!
const SAMPLE_EVIDENCE_CARDS = [
  {
    id: 'sample-mpesa-sms',
    title: 'M-Pesa Fake SMS Screenshot',
    type: 'SMS Screenshot',
    risk: 'High Risk Reverse Con',
    description: 'Screenshot showing a text received from +254712345678 mimicking an M-Pesa confirmation SMS.',
    renderSvg: () => {
      const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
        <rect width="600" height="400" fill="#0f172a" rx="16"/>
        <rect x="20" y="20" width="560" height="60" fill="#1e293b" rx="12"/>
        <circle cx="50" cy="50" r="18" fill="#334155"/>
        <text x="50" y="55" font-family="sans-serif" font-size="16" fill="#94a3b8" text-anchor="middle">👤</text>
        <text x="80" y="45" font-family="sans-serif" font-size="14" font-weight="bold" fill="#f8fafc">+254 712 345 678</text>
        <text x="80" y="65" font-family="sans-serif" font-size="11" fill="#ef4444">Personal Number (NOT "MPESA")</text>
        
        <rect x="40" y="105" width="520" height="180" fill="#007A3D" fill-opacity="0.15" stroke="#007A3D" stroke-width="1.5" rx="14"/>
        <text x="60" y="140" font-family="monospace" font-size="13" font-weight="bold" fill="#4ade80">MPESA CONFIRMED: You have received</text>
        <text x="60" y="165" font-family="monospace" font-size="15" font-weight="bold" fill="#ffffff">Ksh16,200.00 from STEPHEN KAMAU</text>
        <text x="60" y="190" font-family="monospace" font-size="13" fill="#cbd5e1">0722910291 on 30/10/26 at 2:10 PM.</text>
        <text x="60" y="215" font-family="monospace" font-size="13" fill="#cbd5e1">New M-PESA balance is Ksh16,500.00.</text>
        <text x="60" y="240" font-family="monospace" font-size="12" fill="#f87171">Trans ID: TK8291039 (Missing Safaricom format)</text>
        <text x="60" y="265" font-family="monospace" font-size="12" fill="#e2e8f0">Transaction cost Ksh 0.00.</text>
        
        <rect x="40" y="305" width="520" height="60" fill="#1e293b" rx="10"/>
        <text x="60" y="330" font-family="sans-serif" font-size="12" fill="#fbbf24">Incoming Call Note: "Bro nilikosea namba, nirudishie Ksh 15,000</text>
        <text x="60" y="350" font-family="sans-serif" font-size="12" fill="#fbbf24">kwa namba ya Safaricom tafadhali!"</text>
      </svg>`;
      return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
    },
  },
  {
    id: 'sample-loan-app',
    title: 'Fake Loan App UI Screen',
    type: 'App Screenshot',
    risk: 'Advance-Fee Trap',
    description: 'Screenshot of a predatory lending app demanding KES 350 activation fee before releasing KES 25,000.',
    renderSvg: () => {
      const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
        <rect width="600" height="400" fill="#090d16" rx="16"/>
        <rect x="150" y="20" width="300" height="45" fill="#22c55e" rx="10"/>
        <text x="300" y="48" font-family="sans-serif" font-size="15" font-weight="bold" fill="#052e16" text-anchor="middle">⚡ Quick-Cash Kenya Direct</text>
        
        <rect x="60" y="85" width="480" height="120" fill="#1e293b" stroke="#334155" rx="12"/>
        <text x="300" y="115" font-family="sans-serif" font-size="12" fill="#94a3b8" text-anchor="middle">APPROVED LOAN LIMIT</text>
        <text x="300" y="155" font-family="sans-serif" font-size="28" font-weight="bold" fill="#4ade80" text-anchor="middle">KES 25,000.00</text>
        <text x="300" y="185" font-family="sans-serif" font-size="11" fill="#e2e8f0" text-anchor="middle">Disbursement: Instant to M-Pesa</text>
        
        <rect x="60" y="225" width="480" height="145" fill="#450a0a" stroke="#ef4444" rx="12"/>
        <text x="80" y="255" font-family="sans-serif" font-size="13" font-weight="bold" fill="#fca5a5">⚠️ UNLOCK FEE REQUIRED BEFORE DISBURSEMENT</text>
        <text x="80" y="280" font-family="sans-serif" font-size="12" fill="#fecaca">Mandatory CRB & File Registration Fee: KES 350.00</text>
        <text x="80" y="305" font-family="sans-serif" font-size="12" fill="#fecaca">Pay via Lipa na M-Pesa Till: 639102 (Express Credit)</text>
        <text x="80" y="330" font-family="sans-serif" font-size="11" font-weight="bold" fill="#ef4444">⚠️ If fee is not paid within 15 minutes, loan expires.</text>
      </svg>`;
      return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
    },
  },
  {
    id: 'sample-kuccps-poster',
    title: 'Fake KUCCPS Laptop Scheme Notice',
    type: 'WhatsApp Poster',
    risk: 'Phishing Disinformation',
    description: 'Manipulated flyer circulated on student WhatsApp groups with unofficial domain endings.',
    renderSvg: () => {
      const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
        <rect width="600" height="400" fill="#022c22" rx="16"/>
        <rect x="30" y="25" width="540" height="70" fill="#064e3b" rx="12"/>
        <text x="300" y="55" font-family="sans-serif" font-size="16" font-weight="bold" fill="#34d399" text-anchor="middle">🇰🇪 REPUBLIC OF KENYA | KUCCPS</text>
        <text x="300" y="78" font-family="sans-serif" font-size="12" fill="#a7f3d0" text-anchor="middle">PRESIDENTIAL HIGHER EDUCATION LAPTOP INITIATIVE 2026</text>
        
        <rect x="50" y="115" width="500" height="150" fill="#0f172a" rx="12"/>
        <text x="70" y="145" font-family="sans-serif" font-size="13" font-weight="bold" fill="#f8fafc">FREE HP LAPTOPS + KES 10,000 CASH STIPEND</text>
        <text x="70" y="175" font-family="sans-serif" font-size="12" fill="#cbd5e1">All undergraduate and diploma students qualify.</text>
        <text x="70" y="200" font-family="sans-serif" font-size="12" fill="#cbd5e1">Over 80,000 devices already disbursed in Nairobi and Kiambu.</text>
        <text x="70" y="235" font-family="monospace" font-size="13" font-weight="bold" fill="#38bdf8">APPLY: http://kuccps-portal.top/grant-2026</text>
        
        <rect x="50" y="285" width="500" height="85" fill="#7f1d1d" rx="10"/>
        <text x="70" y="315" font-family="sans-serif" font-size="12" font-weight="bold" fill="#fca5a5">PHISHING WARNING INDICATORS:</text>
        <text x="70" y="338" font-family="sans-serif" font-size="11" fill="#fecaca">• Unofficial domain (.top instead of authentic .ac.ke or .go.ke)</text>
        <text x="70" y="355" font-family="sans-serif" font-size="11" fill="#fecaca">• Requests forwarding to 5 WhatsApp student groups to verify</text>
      </svg>`;
      return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
    },
  },
];

export const ImageAnalyzer: React.FC<ImageAnalyzerProps> = ({
  languageMode,
  onAnalyzeSuccess,
  isLoading,
  setIsLoading,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('image/png');
  const [contextNote, setContextNote] = useState('');
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (file: File) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file (PNG, JPG, or WEBP).');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setError('Image size exceeds 15MB. Please upload a smaller screenshot.');
      return;
    }

    setError(null);
    setMimeType(file.type);

    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleLoadSample = (sample: typeof SAMPLE_EVIDENCE_CARDS[0]) => {
    const dataUrl = sample.renderSvg();
    setSelectedImage(dataUrl);
    setMimeType('image/png');
    setContextNote(`Inspecting ${sample.title}: ${sample.description}`);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!selectedImage) {
      setError('Please upload a screenshot or choose one of the sample evidence cards.');
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
          text: contextNote || 'Analyze this screenshot for fraud markers, spoofed senders, fake M-Pesa receipts, and loan fee traps.',
          imageBase64: selectedImage,
          mimeType,
          languageMode,
        }),
      });

      if (!response.ok) {
        throw new Error('Screenshot analysis failed. Please try again.');
      }

      const data = await response.json();
      onAnalyzeSuccess(data, contextNote || 'Screenshot inspection');
    } catch (err: any) {
      console.error('Image analysis error:', err);
      setError(err.message || 'Failed to scan image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Box Card */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 sm:p-6">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>Scan Evidence Screenshot</span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Multimodal Vision AI
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Upload an M-Pesa SMS screenshot, WhatsApp conversation, loan app interface, or suspicious digital receipt.
          </p>
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
          accept="image/*"
          className="hidden"
        />

        {/* Dropzone or Image Preview */}
        {!selectedImage ? (
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-700 hover:border-emerald-500/70 rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all bg-slate-950/50 hover:bg-slate-900/40 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-slate-800/80 group-hover:bg-emerald-500/10 border border-slate-700 group-hover:border-emerald-500/40 flex items-center justify-center mx-auto mb-4 transition-all">
              <Upload className="w-6 h-6 text-slate-400 group-hover:text-emerald-400 transition-colors" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1">
              Click to upload or drag & drop screenshot
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              PNG, JPG, WEBP up to 15MB. Gemma/Gemini vision reads sender IDs, timestamps, balance math, and font discrepancies.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 flex items-center justify-center max-h-96 p-2">
              <img
                src={selectedImage}
                alt="Evidence preview"
                className="max-h-80 w-auto object-contain rounded-lg shadow-xl"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 bg-slate-900/90 hover:bg-red-600 text-slate-200 hover:text-white rounded-full border border-slate-700 transition-colors"
                title="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Optional Context Note */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Optional Context or Voice Call Details:
              </label>
              <input
                type="text"
                value={contextNote}
                onChange={(e) => setContextNote(e.target.value)}
                placeholder="e.g. 'A stranger called me asking for reversal right after this SMS arrived'"
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/80 font-mono"
              />
            </div>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="mt-3 p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-xs text-red-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Examines pixel forgery, sender shortcodes & predatory fee prompts</span>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={isLoading || !selectedImage}
            className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20 active:scale-[0.98]"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                <span>Scanning image for fraud markers...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Scan Screenshot with Gemma</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Pre-packaged evidence cards for judges */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            Load Sample Evidence Cards (Instant Test Presets)
          </h3>
          <span className="text-[11px] text-slate-500">No upload required</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {SAMPLE_EVIDENCE_CARDS.map((sample) => (
            <div
              key={sample.id}
              onClick={() => handleLoadSample(sample)}
              className="p-3.5 rounded-xl bg-slate-900/40 hover:bg-slate-900 border border-slate-800/80 hover:border-emerald-500/50 cursor-pointer transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {sample.type}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-500/10 text-red-400">
                    {sample.risk}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {sample.title}
                </h4>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                  {sample.description}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-emerald-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                <span>Load Sample Evidence</span>
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
