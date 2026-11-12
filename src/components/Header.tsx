import React from 'react';
import { Download, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenAcademicHub: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange, onOpenAcademicHub }) => {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-3.5 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-40">
      {/* Zone 1: Brand Wordmark (Single text element) */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center font-black text-slate-950 text-base shadow-sm">
          🏏
        </div>
        <button
          onClick={() => onTabChange('matches')}
          className="text-lg font-extrabold tracking-tight text-white hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
        >
          CricInsight
        </button>
      </div>

      {/* Zone 2: Navigation Links */}
      <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
        <button
          onClick={() => onTabChange('data')}
          className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 ${activeTab === 'data' ? 'text-amber-400 font-semibold' : ''}`}
        >
          Data & Cleaning
        </button>
        <button
          onClick={() => onTabChange('matches')}
          className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 ${activeTab === 'matches' ? 'text-amber-400 font-semibold' : ''}`}
        >
          Match Trends
        </button>
        <button
          onClick={() => onTabChange('batting')}
          className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 ${activeTab === 'batting' ? 'text-amber-400 font-semibold' : ''}`}
        >
          Batting
        </button>
        <button
          onClick={() => onTabChange('bowling')}
          className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 ${activeTab === 'bowling' ? 'text-amber-400 font-semibold' : ''}`}
        >
          Bowling
        </button>
        <button
          onClick={() => onTabChange('radar')}
          className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 ${activeTab === 'radar' ? 'text-amber-400 font-semibold' : ''}`}
        >
          Player Radar
        </button>
        <button
          onClick={() => onTabChange('prediction')}
          className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 ${activeTab === 'prediction' ? 'text-amber-400 font-semibold' : ''}`}
        >
          ML Predictor
        </button>
      </nav>

      {/* Zone 3: Primary Action CTA */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onOpenAcademicHub}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors shadow-sm whitespace-nowrap shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>PBL Deliverables & Code</span>
        </button>
      </div>
    </header>
  );
};
