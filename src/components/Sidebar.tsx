import React from 'react';
import { DataSourceType, CricketFormat } from '../types/cricket';
import { Database, Filter, RefreshCw, Upload, CheckCircle2 } from 'lucide-react';

interface SidebarProps {
  dataSource: DataSourceType;
  setDataSource: (source: DataSourceType) => void;
  format: CricketFormat;
  setFormat: (format: CricketFormat) => void;
  startSeason: number;
  endSeason: number;
  setStartSeason: (val: number) => void;
  setEndSeason: (val: number) => void;
  selectedTeam: string;
  setSelectedTeam: (team: string) => void;
  selectedPlayer: string;
  setSelectedPlayer: (player: string) => void;
  onFetchData: () => void;
  isFetching: boolean;
  teams: string[];
  players: string[];
  lastFetchedAt: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  dataSource,
  setDataSource,
  format,
  setFormat,
  startSeason,
  endSeason,
  setStartSeason,
  setEndSeason,
  selectedTeam,
  setSelectedTeam,
  selectedPlayer,
  setSelectedPlayer,
  onFetchData,
  isFetching,
  teams,
  players,
  lastFetchedAt,
}) => {
  return (
    <aside className="w-full lg:w-72 bg-slate-900 border-r border-slate-800 p-5 shrink-0 flex flex-col gap-6 text-slate-200">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Database className="w-4 h-4 text-amber-400" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">Data Controls</h2>
        </div>
        <p className="text-xs text-slate-400">PBL DVP Pipeline & Ingestion Settings</p>
      </div>

      {/* 1. Data Source Selection */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 block">
          1. Data Ingestion Source
        </label>
        <select
          value={dataSource}
          onChange={(e) => setDataSource(e.target.value as DataSourceType)}
          className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
        >
          <option value="cricsheet">1. Cricsheet.org (Open ZIP/CSV Data)</option>
          <option value="cricket_api">2. Cricket API (Free Tier via Secrets)</option>
          <option value="web_scraper">3. Polite Web Scraper (robots.txt delay)</option>
          <option value="uploaded_csv">4. CSV Upload / Local Sample Fallback</option>
        </select>
        <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-0.5">
          <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
          <span>Priority order enforced with automatic fallbacks</span>
        </div>
      </div>

      {/* 2. Format Selection */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 block">
          2. Match Format
        </label>
        <div className="grid grid-cols-3 gap-1 bg-slate-800/80 p-1 rounded-md border border-slate-700">
          {(['IPL', 'T20I', 'ODI'] as CricketFormat[]).map((fmt) => (
            <button
              key={fmt}
              type="button"
              onClick={() => setFormat(fmt)}
              className={`py-1.5 text-xs font-medium rounded transition-colors ${
                format === fmt
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {fmt}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Season Range Filter */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="font-semibold text-slate-300">3. Season Range</span>
          <span className="font-mono text-amber-400 tabular-nums font-semibold">
            {startSeason} – {endSeason}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] text-slate-400 block mb-1">From</label>
            <select
              value={startSeason}
              onChange={(e) => setStartSeason(Number(e.target.value))}
              className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs text-slate-200"
            >
              {[2018, 2019, 2020, 2021, 2022, 2023, 2024].map((yr) => (
                <option key={yr} value={yr} disabled={yr > endSeason}>
                  {yr}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-[10px] text-slate-400 block mb-1">To</label>
            <select
              value={endSeason}
              onChange={(e) => setEndSeason(Number(e.target.value))}
              className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs text-slate-200"
            >
              {[2018, 2019, 2020, 2021, 2022, 2023, 2024].map((yr) => (
                <option key={yr} value={yr} disabled={yr < startSeason}>
                  {yr}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 4. Team Filter */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 block">
          4. Franchise Filter
        </label>
        <select
          value={selectedTeam}
          onChange={(e) => setSelectedTeam(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
        >
          <option value="All">All Franchises (Combined)</option>
          {teams.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* 5. Player Filter */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 block">
          5. Player Focus
        </label>
        <select
          value={selectedPlayer}
          onChange={(e) => setSelectedPlayer(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
        >
          <option value="All">All Players</option>
          {players.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      {/* 6. Fetch & Refresh Action */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onFetchData}
          disabled={isFetching}
          className="w-full bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-slate-950 font-bold py-2.5 px-4 rounded-md text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? 'animate-spin' : ''}`} />
          <span>{isFetching ? 'Fetching Data...' : 'Fetch / Refresh Data'}</span>
        </button>
      </div>

      {/* Ingestion & Cache Audit info */}
      <div className="mt-auto pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-1.5">
        <div className="flex justify-between items-center">
          <span>Streamlit Cache:</span>
          <span className="text-emerald-400 font-mono font-medium">@st.cache_data</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Last Ingestion:</span>
          <span className="font-mono text-slate-300 tabular-nums">{lastFetchedAt}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Integrity Status:</span>
          <span className="text-emerald-400 font-medium">Sanitized & Validated</span>
        </div>
      </div>
    </aside>
  );
};
