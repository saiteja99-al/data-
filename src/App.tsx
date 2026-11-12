import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DataTab } from './components/DataTab';
import { MatchAnalysisTab } from './components/MatchAnalysisTab';
import { BattingTab } from './components/BattingTab';
import { BowlingTab } from './components/BowlingTab';
import { PlayerComparisonTab } from './components/PlayerComparisonTab';
import { HeadToHeadTab } from './components/HeadToHeadTab';
import { InsightsTab } from './components/InsightsTab';
import { PredictorTab } from './components/PredictorTab';
import { AcademicHubTab } from './components/AcademicHubTab';

import {
  SAMPLE_MATCHES,
  INITIAL_CLEANING_SUMMARY,
  TOP_BATTERS,
  TOP_BOWLERS,
} from './data/cricketData';
import { CricketFormat, DataSourceType } from './types/cricket';
import {
  Database,
  BarChart3,
  Flame,
  Shield,
  Sparkles,
  Swords,
  Lightbulb,
  Cpu,
  GraduationCap,
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('matches');
  const [dataSource, setDataSource] = useState<DataSourceType>('cricsheet');
  const [format, setFormat] = useState<CricketFormat>('IPL');
  const [startSeason, setStartSeason] = useState<number>(2018);
  const [endSeason, setEndSeason] = useState<number>(2024);
  const [selectedTeam, setSelectedTeam] = useState<string>('All');
  const [selectedPlayer, setSelectedPlayer] = useState<string>('All');
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [lastFetchedAt, setLastFetchedAt] = useState<string>('Just now');

  const teams = [
    'Chennai Super Kings',
    'Mumbai Indians',
    'Royal Challengers Bengaluru',
    'Kolkata Knight Riders',
    'Rajasthan Royals',
    'Gujarat Titans',
    'Lucknow Super Giants',
    'Delhi Capitals',
    'Sunrisers Hyderabad',
    'Punjab Kings',
  ];

  const players = [
    'Virat Kohli',
    'Rohit Sharma',
    'MS Dhoni',
    'AB de Villiers',
    'Suryakumar Yadav',
    'Jos Buttler',
    'KL Rahul',
    'Jasprit Bumrah',
    'Yuzvendra Chahal',
    'Sunil Narine',
    'Rashid Khan',
  ];

  const handleFetchData = () => {
    setIsFetching(true);
    setTimeout(() => {
      setIsFetching(false);
      setLastFetchedAt(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 800);
  };

  const tabsConfig = [
    { id: 'data', label: 'Data & Cleaning', icon: Database },
    { id: 'matches', label: 'Match Trends', icon: BarChart3 },
    { id: 'batting', label: 'Batting Analytics', icon: Flame },
    { id: 'bowling', label: 'Bowling Analytics', icon: Shield },
    { id: 'radar', label: 'Player Radar', icon: Sparkles },
    { id: 'headtohead', label: 'Head to Head', icon: Swords },
    { id: 'insights', label: 'Insights', icon: Lightbulb },
    { id: 'prediction', label: 'ML Predictor', icon: Cpu },
    { id: 'academic', label: 'PBL Project Hub', icon: GraduationCap },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Bar Contract (3 Zones) */}
      <Header
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        onOpenAcademicHub={() => setActiveTab('academic')}
      />

      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Sidebar Filter Controls */}
        <Sidebar
          dataSource={dataSource}
          setDataSource={setDataSource}
          format={format}
          setFormat={setFormat}
          startSeason={startSeason}
          endSeason={endSeason}
          setStartSeason={setStartSeason}
          setEndSeason={setEndSeason}
          selectedTeam={selectedTeam}
          setSelectedTeam={setSelectedTeam}
          selectedPlayer={selectedPlayer}
          setSelectedPlayer={setSelectedPlayer}
          onFetchData={handleFetchData}
          isFetching={isFetching}
          teams={teams}
          players={players}
          lastFetchedAt={lastFetchedAt}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-4 lg:p-6 space-y-6 max-w-7xl overflow-x-hidden">
          {/* Functional Tab Bar */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg overflow-x-auto text-xs whitespace-nowrap">
            {tabsConfig.map((t) => {
              const Icon = t.icon;
              const isActive = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-md font-medium transition-colors ${
                    isActive
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Views */}
          {activeTab === 'data' && (
            <DataTab matches={SAMPLE_MATCHES} cleaningSummary={INITIAL_CLEANING_SUMMARY} />
          )}

          {activeTab === 'matches' && (
            <MatchAnalysisTab
              matches={SAMPLE_MATCHES}
              startSeason={startSeason}
              endSeason={endSeason}
            />
          )}

          {activeTab === 'batting' && <BattingTab selectedTeam={selectedTeam} />}

          {activeTab === 'bowling' && <BowlingTab selectedTeam={selectedTeam} />}

          {activeTab === 'radar' && <PlayerComparisonTab />}

          {activeTab === 'headtohead' && <HeadToHeadTab />}

          {activeTab === 'insights' && <InsightsTab />}

          {activeTab === 'prediction' && <PredictorTab />}

          {activeTab === 'academic' && <AcademicHubTab />}
        </main>
      </div>
    </div>
  );
}
