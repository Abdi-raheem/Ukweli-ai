/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { TextAnalyzer } from './components/TextAnalyzer';
import { ImageAnalyzer } from './components/ImageAnalyzer';
import { AnalysisResultView } from './components/AnalysisResultView';
import { ThreatRadar } from './components/ThreatRadar';
import { TrainingStudio } from './components/TrainingStudio';
import { AnalysisResult } from './types';
import { Shield } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'text' | 'image' | 'radar' | 'train'>('text');
  const [languageMode, setLanguageMode] = useState<string>('English with Sheng & Swahili');
  const [preferredModel, setPreferredModel] = useState<string>('gemini-3.1-flash-lite');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [originalSubmittedText, setOriginalSubmittedText] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalysisSuccess = (result: AnalysisResult, submittedText: string) => {
    setAnalysisResult(result);
    setOriginalSubmittedText(submittedText);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setOriginalSubmittedText('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-slate-950">
      <div>
        {/* Navigation Header */}
        <Header
          languageMode={languageMode}
          setLanguageMode={setLanguageMode}
          activeTab={activeTab}
          setActiveTab={(tab: string) => {
            setActiveTab(tab as any);
            if (analysisResult) {
              setAnalysisResult(null);
            }
          }}
        />

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {analysisResult ? (
            <AnalysisResultView
              result={analysisResult}
              onReset={handleReset}
              originalText={originalSubmittedText}
            />
          ) : (
            <>
              {activeTab === 'text' && (
                <TextAnalyzer
                  languageMode={languageMode}
                  onAnalyzeSuccess={handleAnalysisSuccess}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              )}

              {activeTab === 'image' && (
                <ImageAnalyzer
                  languageMode={languageMode}
                  onAnalyzeSuccess={handleAnalysisSuccess}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              )}

              {activeTab === 'radar' && <ThreatRadar />}

              {activeTab === 'train' && (
                <TrainingStudio
                  preferredModel={preferredModel}
                  setPreferredModel={setPreferredModel}
                />
              )}
            </>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-900/60 py-6 mt-12 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-slate-200">Ukweli AI Kenya</span>
            <span>• National Cybercrime &amp; Anti-Fraud Intelligence</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400 text-[11px]">
            <span>Powered by Gemma &amp; Gemini via Google AI Studio</span>
            <span>•</span>
            <span>Safaricom 333 Verified Integration</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
