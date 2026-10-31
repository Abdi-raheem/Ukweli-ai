import React, { useState } from 'react';
import {
  ShieldAlert,
  BookOpen,
  PhoneCall,
  CheckCircle,
  HelpCircle,
  Hash,
  AlertTriangle,
  ExternalLink,
  ChevronRight,
  Shield,
  Search,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  Layers,
  FileCheck,
} from 'lucide-react';
import { SHENG_FRAUD_GLOSSARY, VERIFIED_HOTLINES } from '../data/scamScenarios';
import { MpesaValidationResult } from '../types';

const OFFICIAL_MPESA_FORMAT_TEMPLATES = [
  {
    type: 'P2P Receiving Money (Personal Transfer)',
    structure: '[10-CHAR CODE] Confirmed. You have received Ksh[Amount].00 from [SENDER NAME] [PHONE NUMBER] on [DD/MM/YY] at [H:MM AM/PM]. New M-PESA balance is Ksh[Amount].00. Transaction cost, Ksh0.00.',
    sample: 'SK49DJ9201 Confirmed. You have received Ksh4,500.00 from STEPHEN NJOROGE 0722123456 on 30/10/26 at 2:45 PM. New M-PESA balance is Ksh12,850.00. Transaction cost, Ksh0.00.',
    keyRule: 'Sender ID MUST be "MPESA" (never a 10-digit 07xx number). Transaction cost is always Ksh0.00 for receiver. Decimal .00 is standard.',
  },
  {
    type: 'P2P Sending Money',
    structure: '[10-CHAR CODE] Confirmed. Ksh[Amount].00 sent to [RECIPIENT NAME] [PHONE NUMBER] on [DD/MM/YY] at [H:MM AM/PM]. New M-PESA balance is Ksh[Amount].00. Transaction cost, Ksh[Cost].00.',
    sample: 'TJ82KL1920 Confirmed. Ksh2,000.00 sent to MERCY WANJIKU 0712345678 on 30/10/26 at 3:15 PM. New M-PESA balance is Ksh8,500.00. Transaction cost, Ksh23.00.',
    keyRule: 'Recipient name in CAPITAL LETTERS followed by phone number. Transaction cost reflects official Safaricom tariff.',
  },
  {
    type: 'Lipa Na M-Pesa (Buy Goods & Services - Till)',
    structure: '[10-CHAR CODE] Confirmed. Ksh[Amount].00 paid to [MERCHANT NAME]. on [DD/MM/YY] at [H:MM AM/PM]. New M-PESA balance is Ksh[Amount].00. Transaction cost, Ksh0.00.',
    sample: 'PL92MK8192 Confirmed. Ksh850.00 paid to NAIROBI GROCERY STORE. on 30/10/26 at 1:12 PM. New M-PESA balance is Ksh4,210.00. Transaction cost, Ksh0.00.',
    keyRule: 'Merchant name is followed by a period "." and transaction cost is Ksh0.00 for the customer.',
  },
  {
    type: 'Lipa Na M-Pesa (Paybill)',
    structure: '[10-CHAR CODE] Confirmed. Ksh[Amount].00 sent to [BUSINESS NAME] for account [ACC NUMBER] on [DD/MM/YY] at [H:MM AM/PM]. New M-PESA balance is Ksh[Amount].00. Transaction cost, Ksh[Cost].00.',
    sample: 'RK9201LK82 Confirmed. Ksh1,500.00 sent to KENYA POWER for account 482910291 on 30/10/26 at 11:30 AM. New M-PESA balance is Ksh6,200.00. Transaction cost, Ksh15.00.',
    keyRule: 'Must contain "for account" statement indicating customer reference or utility meter.',
  },
  {
    type: 'M-Pesa Official Reversal Notification',
    structure: '[10-CHAR CODE] Confirmed. Reversal of transaction [ORIGINAL CODE] has been initiated. Funds will be reversed within 2 hours.',
    sample: 'SK92KL1029 Confirmed. Reversal of transaction TJ82KL1920 has been initiated. Funds will be reversed within 2 hours.',
    keyRule: 'Official reversal arrives from "MPESA". Callers asking for manual transfer instead of using official 456 reversal are running the reverse scam.',
  },
];

export const ThreatRadar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [mpesaInput, setMpesaInput] = useState('');
  const [auditResult, setAuditResult] = useState<MpesaValidationResult | null>(null);
  const [isAuditing, setIsAuditing] = useState(false);

  const filteredSheng = SHENG_FRAUD_GLOSSARY.filter(
    (item) =>
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.fraudMeaning.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const runMpesaAudit = async (textToAudit?: string) => {
    const text = textToAudit || mpesaInput;
    if (!text.trim()) return;

    setIsAuditing(true);
    try {
      const res = await fetch('/api/validate-mpesa-sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      setAuditResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAuditing(false);
    }
  };

  const loadTemplateToAudit = (sample: string) => {
    setMpesaInput(sample);
    runMpesaAudit(sample);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
            <Shield className="w-5 h-5 text-emerald-400" />
          </div>
          <h2 className="text-xl font-extrabold text-white">
            Official Safaricom M-Pesa Architecture &amp; Threat Radar
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          Ground-truth specifications for Kenya's mobile money messages: syntax templates, transaction code verification, fraud anomaly detection, and Nairobi street Sheng vocabulary.
        </p>
      </div>

      {/* Interactive Deep M-Pesa SMS Auditor Tool */}
      <div className="bg-slate-900/70 border border-emerald-500/40 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2.5">
            <FileCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Deep M-Pesa SMS Syntax &amp; Structure Auditor
            </h3>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Safaricom Format Standard
          </span>
        </div>
        <p className="text-xs text-slate-400 mb-4">
          Paste any M-Pesa SMS to break it down against official 10-char code rules, decimal formatting, sender headers, and reverse con markers:
        </p>

        <div className="space-y-3">
          <textarea
            value={mpesaInput}
            onChange={(e) => {
              setMpesaInput(e.target.value);
              if (auditResult) setAuditResult(null);
            }}
            placeholder="e.g. 'SK49DJ9201 Confirmed. You have received Ksh4,500.00 from STEPHEN NJOROGE 0722123456 on 30/10/26 at 2:45 PM. New M-PESA balance is Ksh12,850.00. Transaction cost, Ksh0.00.'"
            rows={3}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs font-mono text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500"
          />

          <div className="flex items-center justify-between">
            <button
              onClick={() => runMpesaAudit()}
              disabled={isAuditing || !mpesaInput.trim()}
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 text-xs font-bold rounded-xl transition-all cursor-pointer shadow-md shadow-emerald-500/20"
            >
              {isAuditing ? 'Auditing Structure...' : 'Audit M-Pesa Syntax'}
            </button>

            <span className="text-[11px] text-slate-400">
              Evaluates 8 structural Safaricom rules
            </span>
          </div>
        </div>

        {/* Audit Result Breakdown Card */}
        {auditResult && (
          <div className="mt-5 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                {auditResult.isSyntaxValid ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-400" />
                )}
                <div>
                  <h4 className="text-xs font-bold text-white uppercase">
                    Structural Verdict:{' '}
                    <span className={auditResult.isSyntaxValid ? 'text-emerald-400' : 'text-red-400'}>
                      {auditResult.verdict.replace(/_/g, ' ')}
                    </span>
                  </h4>
                  <span className="text-[10px] text-slate-400">
                    Recognized Format: {auditResult.transactionType.replace(/_/g, ' ')}
                  </span>
                </div>
              </div>

              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                auditResult.isSyntaxValid ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
              }`}>
                {auditResult.isSyntaxValid ? '100% Valid Structure' : 'Syntax Violations Found'}
              </span>
            </div>

            {/* Extracted Tokens Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Transaction Code:</span>
                <span className={`font-mono font-bold ${auditResult.isCodeFormatValid ? 'text-emerald-400' : 'text-red-400'}`}>
                  {auditResult.transactionCode || 'None'}
                </span>
                <span className="text-[9px] text-slate-500 block">
                  {auditResult.isCodeFormatValid ? '10-char valid' : 'Invalid syntax'}
                </span>
              </div>

              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Amount:</span>
                <span className="font-mono font-bold text-slate-200">
                  {auditResult.amount ? `Ksh ${auditResult.amount}` : 'Not found'}
                </span>
              </div>

              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Party (Sender/Merchant):</span>
                <span className="font-mono font-bold text-slate-200 truncate block">
                  {auditResult.senderOrRecipient || 'N/A'}
                </span>
              </div>

              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Date &amp; Timestamp:</span>
                <span className="font-mono font-bold text-slate-200">
                  {auditResult.dateTimestamp || 'Missing'}
                </span>
              </div>
            </div>

            {/* Anomalies List */}
            {auditResult.anomalies.length > 0 && (
              <div className="pt-2">
                <span className="text-xs font-bold text-red-400 block mb-1.5 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Detected Formatting &amp; Fraud Anomalies ({auditResult.anomalies.length}):
                </span>
                <div className="space-y-1.5">
                  {auditResult.anomalies.map((anomaly, idx) => (
                    <div key={idx} className="p-2 rounded bg-red-950/20 border border-red-900/30 text-xs text-red-200 flex items-start gap-2">
                      <span className="text-red-400 font-mono font-bold">•</span>
                      <span>{anomaly}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Official Safaricom M-Pesa Message Specifications Reference Library */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Official Safaricom M-Pesa Message Format Templates
            </h3>
          </div>
          <span className="text-[11px] text-slate-500">Click any card to test in live auditor</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {OFFICIAL_MPESA_FORMAT_TEMPLATES.map((tmpl, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="text-xs font-bold text-emerald-300">
                    {tmpl.type}
                  </h4>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                    Official Syntax
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 mb-2 font-mono text-[11px] text-slate-200">
                  {tmpl.sample}
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                  <strong className="text-slate-300">Key Verification Rule:</strong> {tmpl.keyRule}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => loadTemplateToAudit(tmpl.sample)}
                  className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span>Test this structure</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Side-by-Side Comparison: Authentic vs Fake M-Pesa */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 sm:p-6">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          Anatomy of a Fake M-Pesa SMS vs Authentic SMS (Spot the Difference)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Authentic Card */}
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/40">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide block mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              Authentic Safaricom M-Pesa SMS
            </span>
            <div className="font-mono text-xs text-slate-200 bg-slate-950 p-3 rounded-lg border border-slate-800 mb-3 leading-relaxed">
              SK49DJ9201 Confirmed. You have received Ksh4,500.00 from STEPHEN NJOROGE 0722123456 on 30/10/26 at 2:45 PM. New M-PESA balance is Ksh12,850.00. Transaction cost, Ksh0.00.
            </div>
            <ul className="text-xs text-slate-300 space-y-1.5">
              <li>✓ Sender header is alphanumeric: <strong>MPESA</strong></li>
              <li>✓ Valid 10-char alphanumeric code (starts with 2 capital letters)</li>
              <li>✓ Amount includes <strong>.00</strong> cents notation</li>
              <li>✓ Includes <strong>Transaction cost, Ksh0.00.</strong> notation</li>
              <li>✓ Balance increases on your SIM Toolkit *334#</li>
            </ul>
          </div>

          {/* Fake Card */}
          <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/40">
            <span className="text-xs font-bold text-red-400 uppercase tracking-wide block mb-2 flex items-center gap-1.5">
              <XCircle className="w-4 h-4" />
              Counterfeit Spoofed SMS (Reverse Scam)
            </span>
            <div className="font-mono text-xs text-slate-200 bg-slate-950 p-3 rounded-lg border border-slate-800 mb-3 leading-relaxed">
              [From: 0722894102] Confirmed! You have received Ksh 14,500 from STEPHEN NJOROGE. New balance is 15,120. Caller: "Nimekosea bro nirudishie!"
            </div>
            <ul className="text-xs text-red-300 space-y-1.5">
              <li>✗ Sender is a personal <strong>07xx / +254</strong> phone number</li>
              <li>✗ Missing 10-character transaction ID</li>
              <li>✗ Missing decimal cents and transaction cost statement</li>
              <li>✗ Accompanied by panic call begging for instant reversal</li>
              <li>✗ <strong>Real balance on *334# NEVER changed</strong></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sheng Street Fraud Dictionary */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Sheng Street Fraud Glossary (Nairobi &amp; Campus Slang)
            </h3>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Sheng terms..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredSheng.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="text-sm font-extrabold text-emerald-300">
                    {item.term}
                  </h4>
                  <span className="text-[10px] text-slate-400 italic">
                    Lit: "{item.literal}"
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  {item.fraudMeaning}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/60">
                <span className="text-[10px] text-amber-400/90 font-mono italic block">
                  {item.example}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verified Official Emergency Hotlines */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <PhoneCall className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Official Kenyan Cybercrime &amp; Fraud Reporting Channels
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {VERIFIED_HOTLINES.map((hotline, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    {hotline.badge}
                  </span>
                  <span className="text-xs font-mono font-bold text-white bg-slate-800 px-2 py-0.5 rounded">
                    {hotline.channel}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-200 mb-1">
                  {hotline.agency}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {hotline.action}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">Direct Contact:</span>
                <span className="text-xs font-mono font-extrabold text-emerald-300">
                  {hotline.phone}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
