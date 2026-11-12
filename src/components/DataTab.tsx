import React, { useState } from 'react';
import { MatchRecord, CleaningSummary } from '../types/cricket';
import { Download, Search, Check, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';

interface DataTabProps {
  matches: MatchRecord[];
  cleaningSummary: CleaningSummary;
}

export const DataTab: React.FC<DataTabProps> = ({ matches, cleaningSummary }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 8;

  const filteredMatches = matches.filter(
    (m) =>
      m.team1.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.team2.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.winner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filteredMatches.length / pageSize));
  const displayedMatches = filteredMatches.slice((page - 1) * pageSize, page * pageSize);

  const downloadCSV = () => {
    const headers = [
      'id',
      'season',
      'city',
      'date',
      'team1',
      'team2',
      'tossWinner',
      'tossDecision',
      'result',
      'winner',
      'winByRuns',
      'winByWickets',
      'playerOfMatch',
      'venue',
    ];
    const rows = matches.map((m) => [
      m.id,
      m.season,
      `"${m.city}"`,
      m.date,
      `"${m.team1}"`,
      `"${m.team2}"`,
      `"${m.tossWinner}"`,
      m.tossDecision,
      m.result,
      `"${m.winner}"`,
      m.winByRuns,
      m.winByWickets,
      `"${m.playerOfMatch}"`,
      `"${m.venue}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `cricinsight_cleaned_matches_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Overview Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg">
          <span className="text-xs text-slate-400 block mb-1">Raw Delivery Records</span>
          <span className="text-xl font-bold font-mono text-slate-100 tabular-nums">
            {cleaningSummary.originalRows.toLocaleString()}
          </span>
          <span className="text-[11px] text-slate-500 block mt-1">Ingested via Cricsheet ZIP</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg">
          <span className="text-xs text-slate-400 block mb-1">Cleaned Records</span>
          <span className="text-xl font-bold font-mono text-emerald-400 tabular-nums">
            {cleaningSummary.cleanedRows.toLocaleString()}
          </span>
          <span className="text-[11px] text-slate-500 block mt-1">Validated & Normalized</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg">
          <span className="text-xs text-slate-400 block mb-1">Duplicates Pruned</span>
          <span className="text-xl font-bold font-mono text-amber-400 tabular-nums">
            {cleaningSummary.duplicatesRemoved.toLocaleString()}
          </span>
          <span className="text-[11px] text-slate-500 block mt-1">Exact match-delivery pairs</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg">
          <span className="text-xs text-slate-400 block mb-1">Dates Converted</span>
          <span className="text-xl font-bold font-mono text-blue-400 tabular-nums">
            {cleaningSummary.datesFormatted.toLocaleString()}
          </span>
          <span className="text-[11px] text-slate-500 block mt-1">ISO datetime64[ns]</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg col-span-2 md:col-span-1">
          <span className="text-xs text-slate-400 block mb-1">Memory Footprint</span>
          <span className="text-xl font-bold font-mono text-purple-400 tabular-nums">
            {(cleaningSummary.memoryFootprintKB / 1024).toFixed(1)} MB
          </span>
          <span className="text-[11px] text-slate-500 block mt-1">Optimized pandas DataFrame</span>
        </div>
      </div>

      {/* Automated Data Cleaning Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Automated Franchise Name Standardization
            </h3>
            <span className="text-xs text-slate-400 font-mono">cleaner.py dictionary map</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Historical teams underwent re-branding. Our automated cleaning step unifies historical names with their contemporary entities to prevent fragmented statistics.
          </p>
          <div className="space-y-2 pt-1">
            {Object.entries(cleaningSummary.teamNamesStandardized).map(([oldName, canonicalName]) => (
              <div
                key={oldName}
                className="flex items-center justify-between bg-slate-950/60 border border-slate-800/80 px-3 py-2 rounded text-xs"
              >
                <span className="text-slate-400 line-through">{oldName}</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400 shrink-0 mx-2" />
                <span className="font-semibold text-slate-200">{canonicalName}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              Missing Values & Imputation Audit
            </h3>
            <span className="text-xs text-slate-400 font-mono">Null value hygiene</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Columns with missing entries were imputed using domain-informed heuristics rather than naive dropping.
          </p>
          <div className="border border-slate-800 rounded-md overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-950 text-slate-300 font-medium border-b border-slate-800">
                <tr>
                  <th className="py-2 px-3">Column Attribute</th>
                  <th className="py-2 px-3 text-right">Missing Count</th>
                  <th className="py-2 px-3">Resolution Strategy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {cleaningSummary.missingValuesImputed.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40">
                    <td className="py-2 px-3 font-mono text-amber-300/90">{item.column}</td>
                    <td className="py-2 px-3 text-right font-mono tabular-nums">{item.count.toLocaleString()}</td>
                    <td className="py-2 px-3 text-slate-400">{item.method}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Interactive Match Records Explorer */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-slate-100">Cleaned Match Dataset Explorer</h3>
            <p className="text-xs text-slate-400">
              Showing {filteredMatches.length} matches · Filtered across current season parameters
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1);
                }}
                placeholder="Search team, venue, city..."
                className="bg-slate-800 border border-slate-700 text-xs rounded-md pl-9 pr-3 py-1.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400 w-48 sm:w-64"
              />
            </div>
            <button
              onClick={downloadCSV}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 rounded-md border border-slate-700 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="border border-slate-800 rounded-md overflow-x-auto text-xs">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-slate-950 text-slate-300 font-semibold border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Season</th>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Matchup</th>
                <th className="py-2.5 px-3">Toss Decision</th>
                <th className="py-2.5 px-3">Match Winner</th>
                <th className="py-2.5 px-3">Margin</th>
                <th className="py-2.5 px-3">Player of Match</th>
                <th className="py-2.5 px-3">Venue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300 font-normal">
              {displayedMatches.map((m) => (
                <tr key={m.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="py-2.5 px-3 font-mono tabular-nums text-slate-400">{m.season}</td>
                  <td className="py-2.5 px-3 font-mono text-slate-400">{m.date}</td>
                  <td className="py-2.5 px-3 font-medium text-slate-100">
                    <span>{m.team1}</span>
                    <span className="text-slate-500 mx-1.5">vs</span>
                    <span>{m.team2}</span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-400">
                    <span className="text-slate-300 font-medium">{m.tossWinner}</span> ({m.tossDecision})
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="font-semibold text-amber-400">{m.winner}</span>
                  </td>
                  <td className="py-2.5 px-3 font-mono tabular-nums text-slate-300">
                    {m.winByRuns > 0 ? `${m.winByRuns} runs` : m.winByWickets > 0 ? `${m.winByWickets} wkts` : 'Tie/Super Over'}
                  </td>
                  <td className="py-2.5 px-3 text-slate-200">{m.playerOfMatch}</td>
                  <td className="py-2.5 px-3 text-slate-400 max-w-xs truncate">{m.venue}</td>
                </tr>
              ))}
              {displayedMatches.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400">
                    No matching records found for "{searchTerm}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
          <span>
            Page {page} of {totalPages}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-2.5 py-1 bg-slate-800 border border-slate-700 rounded text-slate-200 disabled:opacity-40"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-2.5 py-1 bg-slate-800 border border-slate-700 rounded text-slate-200 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
