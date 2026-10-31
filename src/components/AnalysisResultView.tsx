import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Copy,
  Check,
  Volume2,
  PhoneCall,
  CheckCircle2,
  XCircle,
  Clock,
  Globe,
  Coins,
  Send,
  Flag,
  Share2,
  Sparkles,
  Info,
  ArrowRight,
} from 'lucide-react';
import { AnalysisResult } from '../types';

interface AnalysisResultViewProps {
  result: AnalysisResult;
  onReset: () => void;
  originalText?: string;
}

export const AnalysisResultView: React.FC<AnalysisResultViewProps> = ({
  result,
  onReset,
  originalText,
}) => {
  const [copied333, setCopied333] = useState(false);
  const [copiedGroup, setCopiedGroup] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const isScam = result.riskLevel.includes('HIGH RISK');
  const isModerate = result.riskLevel.includes('MODERATE') || result.riskLevel.includes('SUSPICIOUS');
  const isSafe = result.riskLevel.includes('SAFE');

  const riskTheme = isScam
    ? {
        border: 'border-red-500/50',
        bg: 'bg-red-950/20',
        badgeBg: 'bg-red-500/20 text-red-300 border-red-500/40',
        icon: ShieldAlert,
        glow: 'shadow-red-900/30',
        textColor: 'text-red-400',
        title: 'HIGH RISK SCAM DETECTED',
      }
    : isModerate
    ? {
        border: 'border-amber-500/50',
        bg: 'bg-amber-950/20',
        badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        icon: AlertTriangle,
        glow: 'shadow-amber-900/30',
        textColor: 'text-amber-400',
        title: 'SUSPICIOUS / UNVERIFIED PATTERN',
      }
    : {
        border: 'border-emerald-500/50',
        bg: 'bg-emerald-950/20',
        badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
        icon: ShieldCheck,
        glow: 'shadow-emerald-900/30',
        textColor: 'text-emerald-400',
        title: 'VERIFIED SAFE / LEGITIMATE',
      };

  const IconComponent = riskTheme.icon;

  const handleCopy333 = () => {
    const textToCopy = `FRAUD ALERT FOR SAFARICOM 333:\nSuspicious Message: "${originalText || result.summary}"\nCategory: ${result.category}\nRed Flags: ${result.detectedRedFlags?.join('; ') || 'N/A'}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied333(true);
    setTimeout(() => setCopied333(false), 2500);
  };

  const handleCopyGroup = () => {
    const textToCopy = `⚠️ UKWELI AI SCAM ALERT (Zetech/Nairobi Community) ⚠️\n\nVerdict: ${result.riskLevel} - ${result.category}\n\nSummary: ${result.summary}\n\nSheng Warning: "${result.actionableAdvice?.swahiliSheng || ''}"\n\nAdvice: ${result.actionableAdvice?.english || ''}\n\nHotline: Forward scam messages to 333 for free.`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedGroup(true);
    setTimeout(() => setCopiedGroup(false), 2500);
  };

  const speakAdvice = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }
      const utter = new SpeechSynthesisUtterance(
        `${result.summary}. Verdict: ${result.actionableAdvice?.swahiliSheng || ''}. Advice: ${result.actionableAdvice?.english || ''}`
      );
      utter.rate = 1.0;
      utter.onend = () => setIsSpeaking(false);
      utter.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utter);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner for High Risk vs Safe */}
      {isScam ? (
        <div className="bg-gradient-to-r from-red-900/60 via-red-950/80 to-red-900/60 border border-red-500/50 rounded-2xl p-4 sm:p-5 flex items-start sm:items-center justify-between gap-4 shadow-xl shadow-red-950/40">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600/30 border border-red-500/50 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-6 h-6 text-red-400 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-bold text-red-200">
                CRITICAL WARNING: DO NOT SEND FUNDS OR ENTER YOUR M-PESA PIN!
              </h3>
              <p className="text-xs text-red-300/90">
                Matches confirmed digital fraud syndicates targeting university students and Kenyan mobile money users.
              </p>
            </div>
          </div>
          <button
            onClick={handleCopy333}
            className="shrink-0 text-xs px-3 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg transition-all flex items-center gap-1.5 shadow-md shadow-red-900/40"
          >
            {copied333 ? <Check className="w-3.5 h-3.5" /> : <PhoneCall className="w-3.5 h-3.5" />}
            <span>Report to 333</span>
          </button>
        </div>
      ) : isSafe ? (
        <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-emerald-950/60 border border-emerald-500/40 rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4 shadow-xl shadow-emerald-950/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-emerald-200">
                NO THREATS DETECTED: SAFE & LEGITIMATE
              </h3>
              <p className="text-xs text-emerald-300/80">
                Zero advance-fee extortion, spoofed headers, phishing links, or coercive urgency found.
              </p>
            </div>
          </div>
        </div>
      ) : null}

      {/* Main Analysis Card */}
      <div className={`bg-slate-900/90 rounded-2xl border ${riskTheme.border} p-5 sm:p-6 shadow-2xl ${riskTheme.glow}`}>
        {/* Header section with Risk Level and Category */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-3.5">
            <div className={`w-12 h-12 rounded-2xl ${riskTheme.badgeBg} flex items-center justify-center border shadow-inner`}>
              <IconComponent className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${riskTheme.badgeBg}`}>
                  {result.riskLevel}
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {result.category}
                </span>
                {result.trainedSamplesActive && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                    Trained Memory ({result.trainedSamplesActive} Exemplars)
                  </span>
                )}
              </div>
              <h2 className={`text-xl font-extrabold mt-1 ${riskTheme.textColor}`}>
                {riskTheme.title}
              </h2>
            </div>
          </div>

          {/* Calibrated Confidence Score */}
          <div className="flex items-center sm:flex-col sm:items-end justify-between border-t sm:border-t-0 border-slate-800 pt-3 sm:pt-0">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Calibrated Confidence</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-24 bg-slate-800 rounded-full h-2.5 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isScam ? 'bg-red-500' : isModerate ? 'bg-amber-400' : 'bg-emerald-400'
                  }`}
                  style={{ width: `${Math.max(result.confidenceScore || 90, 15)}%` }}
                ></div>
              </div>
              <span className="font-mono font-bold text-sm text-white">
                {result.confidenceScore || 95}%
              </span>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="mt-5 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-emerald-400" />
            Verdict Summary
          </h4>
          <p className="text-sm text-slate-200 leading-relaxed font-medium">
            {result.summary}
          </p>
        </div>

        {/* 4-Factor Security Indicators Audit Bar */}
        {result.indicators && (
          <div className="mt-5 pt-4 border-t border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <span>Security Indicators Audit</span>
              <span className="text-[10px] text-slate-500 font-normal">(4-Point Verification Checklist)</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Sender Authenticity */}
              <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block">Sender Identity</span>
                  <span className="text-xs font-bold text-slate-200">
                    {result.indicators.senderAuthenticity === 'OFFICIAL_SHORTCODE'
                      ? 'Official Shortcode'
                      : result.indicators.senderAuthenticity === 'PERSONAL_PHONE_NUMBER'
                      ? 'Personal 07xx/01xx'
                      : result.indicators.senderAuthenticity === 'LEGITIMATE_CONTACT'
                      ? 'Peer / Safe Contact'
                      : 'Unverified Third Party'}
                  </span>
                </div>
                {result.indicators.senderAuthenticity === 'PERSONAL_PHONE_NUMBER' ? (
                  <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                )}
              </div>

              {/* Upfront Fee Trap */}
              <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block">Upfront Fee Demand</span>
                  <span className={`text-xs font-bold ${result.indicators.hasUpfrontFeeDemand ? 'text-red-400' : 'text-emerald-400'}`}>
                    {result.indicators.hasUpfrontFeeDemand ? 'EXTORTION FEE FOUND' : 'No Upfront Fee Trap'}
                  </span>
                </div>
                {result.indicators.hasUpfrontFeeDemand ? (
                  <Coins className="w-5 h-5 text-red-400 shrink-0" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                )}
              </div>

              {/* Domain Status */}
              <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block">Domain / Links</span>
                  <span className={`text-xs font-bold ${
                    result.indicators.domainStatus === 'SUSPICIOUS_PHISHING_DOMAIN'
                      ? 'text-red-400'
                      : result.indicators.domainStatus === 'OFFICIAL_KENYAN_DOMAIN'
                      ? 'text-emerald-400'
                      : 'text-slate-300'
                  }`}>
                    {result.indicators.domainStatus === 'SUSPICIOUS_PHISHING_DOMAIN'
                      ? 'Deceptive Phishing Link'
                      : result.indicators.domainStatus === 'OFFICIAL_KENYAN_DOMAIN'
                      ? 'Official .go.ke / .ac.ke'
                      : 'Clean / No Links'}
                  </span>
                </div>
                {result.indicators.domainStatus === 'SUSPICIOUS_PHISHING_DOMAIN' ? (
                  <Globe className="w-5 h-5 text-red-400 shrink-0" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                )}
              </div>

              {/* Urgency Pressure */}
              <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block">Psychological Pressure</span>
                  <span className={`text-xs font-bold ${result.indicators.urgencyPressure ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {result.indicators.urgencyPressure ? 'Urgency Coercion' : 'Normal / No Pressure'}
                  </span>
                </div>
                {result.indicators.urgencyPressure ? (
                  <Clock className="w-5 h-5 text-amber-400 shrink-0" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                )}
              </div>
            </div>
          </div>
        )}

        {/* M-Pesa Structural Syntax Audit (if applicable) */}
        {result.mpesaAudit && (
          <div className="mt-5 p-3.5 rounded-xl bg-slate-950/80 border border-emerald-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                Safaricom M-Pesa Structural Audit
              </span>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                result.mpesaAudit.isRecognizedMpesaFormat ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
              }`}>
                {result.mpesaAudit.isRecognizedMpesaFormat ? 'Official Syntax Matched' : 'Syntax Discrepancies Found'}
              </span>
            </div>
            <div className="text-xs text-slate-300 flex items-center justify-between">
              <div>
                <span className="text-slate-400">Detected Format: </span>
                <span className="font-mono font-bold text-emerald-300">{result.mpesaAudit.formatType?.replace(/_/g, ' ')}</span>
              </div>
              <span className="text-[11px] text-slate-400">
                Audited against 2026 Safaricom SMS specifications
              </span>
            </div>
          </div>
        )}

        {/* Red Flags Section (only if red flags exist) */}
        {result.detectedRedFlags && result.detectedRedFlags.length > 0 && (
          <div className="mt-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5 mb-3">
              <Flag className="w-3.5 h-3.5" />
              Verified Fraud Red Flags ({result.detectedRedFlags.length})
            </h4>
            <div className="space-y-2.5">
              {result.detectedRedFlags.map((flag, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-xl bg-red-950/15 border border-red-900/30 text-xs sm:text-sm text-slate-200"
                >
                  <span className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-snug">{flag}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Extracted Entities Grid */}
        {result.extractedEntities && (
          <div className="mt-6 pt-5 border-t border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Extracted Communication Artifacts
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-slate-950/50 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[11px] mb-1">Sender Identity:</span>
                <span className="font-mono text-emerald-400 font-semibold break-all">
                  {result.extractedEntities.senderIdentity || 'Unspecified'}
                </span>
              </div>

              <div className="p-3 bg-slate-950/50 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[11px] mb-1">Phone Numbers:</span>
                <span className="font-mono text-amber-400 font-semibold">
                  {result.extractedEntities.phoneNumbers?.length > 0
                    ? result.extractedEntities.phoneNumbers.join(', ')
                    : 'None flagged'}
                </span>
              </div>

              <div className="p-3 bg-slate-950/50 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[11px] mb-1">Tills / Paybills:</span>
                <span className="font-mono text-red-400 font-semibold">
                  {result.extractedEntities.tillsOrPaybills?.length > 0
                    ? result.extractedEntities.tillsOrPaybills.join(', ')
                    : 'None detected'}
                </span>
              </div>

              <div className="p-3 bg-slate-950/50 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[11px] mb-1">Claimed Amounts:</span>
                <span className="font-mono text-purple-300 font-semibold">
                  {result.extractedEntities.claimedAmounts?.length > 0
                    ? result.extractedEntities.claimedAmounts.join(', ')
                    : 'N/A'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Actionable Advice Cards (English + Sheng) */}
        <div className="mt-6 pt-5 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Sheng / Swahili Street Warning */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                NAIROBI SHENG / SWAHILI VERDICT
              </span>
              <button
                onClick={speakAdvice}
                className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-medium bg-emerald-950/60 px-2 py-1 rounded border border-emerald-700/50 cursor-pointer"
                title="Listen to verdict"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>{isSpeaking ? 'Stop' : 'Listen'}</span>
              </button>
            </div>
            <p className="text-sm font-semibold text-emerald-200 italic leading-relaxed">
              "{result.actionableAdvice?.swahiliSheng}"
            </p>
          </div>

          {/* English Directive */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700 mb-2 inline-block">
              EXECUTIVE GUIDANCE
            </span>
            <p className="text-sm text-slate-200 leading-relaxed font-medium">
              {result.actionableAdvice?.english}
            </p>
          </div>
        </div>

        {/* Immediate Verification Steps */}
        {result.immediateVerificationChecks?.length > 0 && (
          <div className="mt-6 pt-5 border-t border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Action Checklist
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {result.immediateVerificationChecks.map((check, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-950/40 border border-slate-800/80 text-xs text-slate-300"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{check}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons Footer */}
        <div className="mt-8 pt-5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {isScam && (
              <button
                onClick={handleCopy333}
                className="text-xs px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-slate-700 flex items-center gap-2 transition-all cursor-pointer"
              >
                {copied333 ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
                <span>{copied333 ? 'Copied 333 Report' : 'Copy Safaricom 333 Report'}</span>
              </button>
            )}

            <button
              onClick={handleCopyGroup}
              className="text-xs px-3.5 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 font-semibold border border-emerald-500/30 flex items-center gap-2 transition-all cursor-pointer"
            >
              {copiedGroup ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              <span>{copiedGroup ? 'Copied WhatsApp Alert' : 'Copy WhatsApp Alert'}</span>
            </button>
          </div>

          <button
            onClick={onReset}
            className="text-xs px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
          >
            Check Another Message
          </button>
        </div>
      </div>
    </div>
  );
};
