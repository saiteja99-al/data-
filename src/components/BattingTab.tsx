import React, { useState } from 'react';
import { TOP_BATTERS, TEAM_COLORS } from '../data/cricketData';
import { BatterStat } from '../types/cricket';
import { Flame, Target, Layers, ScatterChart } from 'lucide-react';

interface BattingTabProps {
  selectedTeam: string;
}

export const BattingTab: React.FC<BattingTabProps> = ({ selectedTeam }) => {
  const [hoveredBatter, setHoveredBatter] = useState<BatterStat | null>(null);

  const filteredBatters = TOP_BATTERS.filter(
    (b) => selectedTeam === 'All' || b.team === selectedTeam
  );

  return (
    <div className="space-y-6">
      {/* Top Scorers Leaderboard */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-400" />
              Tournament Run Leaders (Historical Batting Records)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Comprehensive scoring records, boundary impact, and milestone counts
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {filteredBatters.length} Qualified Batters
          </span>
        </div>

        <div className="overflow-x-auto border border-slate-800 rounded-md">
          <table className="w-full text-xs text-left whitespace-nowrap">
            <thead className="bg-slate-950 text-slate-300 font-semibold border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Batter</th>
                <th className="py-2.5 px-3">Franchise</th>
                <th className="py-2.5 px-2 text-right">Inns</th>
                <th className="py-2.5 px-3 text-right">Runs</th>
                <th className="py-2.5 px-2 text-right">Avg</th>
                <th className="py-2.5 px-2 text-right">Strike Rate</th>
                <th className="py-2.5 px-2 text-right">50s / 100s</th>
                <th className="py-2.5 px-2 text-right">4s / 6s</th>
                <th className="py-2.5 px-3 text-right">Boundary %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {filteredBatters.map((b) => {
                const teamTheme = TEAM_COLORS[b.team] || { primary: '#64748b' };
                return (
                  <tr
                    key={b.name}
                    onMouseEnter={() => setHoveredBatter(b)}
                    className="hover:bg-slate-800/50 cursor-pointer transition-colors"
                  >
                    <td className="py-2.5 px-3 font-semibold text-slate-100 flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full inline-block"
                        style={{ backgroundColor: teamTheme.primary }}
                      />
                      <span>{b.name}</span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-400">{b.team}</td>
                    <td className="py-2.5 px-2 text-right font-mono tabular-nums text-slate-400">{b.innings}</td>
                    <td className="py-2.5 px-3 text-right font-mono tabular-nums font-bold text-amber-400">
                      {b.runs.toLocaleString()}
                    </td>
                    <td className="py-2.5 px-2 text-right font-mono tabular-nums text-slate-200">
                      {b.average.toFixed(1)}
                    </td>
                    <td className="py-2.5 px-2 text-right font-mono tabular-nums font-semibold text-blue-400">
                      {b.strikeRate.toFixed(1)}
                    </td>
                    <td className="py-2.5 px-2 text-right font-mono tabular-nums text-slate-400">
                      {b.fifties} / {b.hundreds}
                    </td>
                    <td className="py-2.5 px-2 text-right font-mono tabular-nums text-slate-400">
                      {b.fours} / {b.sixes}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono tabular-nums text-emerald-400">
                      {b.boundaryPercent}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Row 2: Strike Rate vs Batting Average (Scatter Plot with Quadrant Lines) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-lg space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
              <Target className="w-4 h-4 text-amber-400" />
              Strike Rate vs Batting Average (Quadrant Analysis)
            </h3>
            <span className="text-xs text-slate-400 font-mono">X: Avg (25-50) | Y: SR (120-160)</span>
          </div>

          <div className="relative h-64 bg-slate-950/80 rounded border border-slate-800/80 p-4">
            {/* Quadrant Guidelines */}
            <div className="absolute left-1/2 top-0 bottom-0 border-l border-dashed border-slate-700/60" />
            <div className="absolute top-1/2 left-0 right-0 border-t border-dashed border-slate-700/60" />

            {/* Quadrant Labels */}
            <div className="absolute top-2 right-2 text-[10px] text-amber-400/80 font-mono font-semibold">
              Elite Match Winners (High Avg & High SR)
            </div>
            <div className="absolute top-2 left-2 text-[10px] text-blue-400/80 font-mono font-semibold">
              Aggressive Finishers (High SR, Lower Avg)
            </div>
            <div className="absolute bottom-2 right-2 text-[10px] text-emerald-400/80 font-mono font-semibold">
              Consistent Anchors (High Avg, Lower SR)
            </div>
            <div className="absolute bottom-2 left-2 text-[10px] text-slate-500 font-mono">
              Developing Builders
            </div>

            {/* Scatter Points */}
            {filteredBatters.map((b) => {
              // Normalize Avg: 25 to 48 -> 10% to 90%
              const xNorm = Math.min(92, Math.max(8, ((b.average - 26) / 22) * 100));
              // Normalize SR: 120 to 155 -> 10% to 90%
              const yNorm = Math.min(92, Math.max(8, ((b.strikeRate - 120) / 36) * 100));
              const teamInfo = TEAM_COLORS[b.team] || { primary: '#60a5fa' };

              return (
                <div
                  key={b.name}
                  onMouseEnter={() => setHoveredBatter(b)}
                  className="absolute transform -translate-x-1/2 translate-y-1/2 cursor-pointer group"
                  style={{ left: `${xNorm}%`, bottom: `${yNorm}%` }}
                >
                  <div
                    className="w-4 h-4 rounded-full border-2 border-slate-900 shadow-md transition-transform group-hover:scale-150"
                    style={{ backgroundColor: teamThemeOrFallback(b.team) }}
                  />
                  <div className="hidden group-hover:block absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-slate-900 border border-slate-700 text-slate-100 text-[10px] px-2 py-1 rounded shadow-lg whitespace-nowrap z-20">
                    <span className="font-bold">{b.name}</span>: Avg {b.average.toFixed(1)} | SR {b.strikeRate.toFixed(1)}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-xs text-slate-400 flex items-center justify-between border-t border-slate-800 pt-3">
            <span>Notice AB de Villiers in the top-right apex (SR 151.7, Avg 39.7).</span>
            <span className="text-amber-400 font-mono">DVP Scatter Model</span>
          </div>
        </div>

        {/* Runs by Over Phase (Powerplay, Middle, Death) */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-lg space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" />
              Runs by Over Phase (T20 Inning Segmentation)
            </h3>
            <span className="text-xs text-slate-400 font-mono">PP(1-6) · Mid(7-15) · Death(16-20)</span>
          </div>

          <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
            {filteredBatters.slice(0, 6).map((b) => {
              const total = b.powerplayRuns + b.middleRuns + b.deathRuns;
              const ppPct = ((b.powerplayRuns / total) * 100).toFixed(0);
              const midPct = ((b.middleRuns / total) * 100).toFixed(0);
              const deathPct = ((b.deathRuns / total) * 100).toFixed(0);

              return (
                <div key={b.name} className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-200">{b.name}</span>
                    <span className="text-slate-400 font-mono text-[11px]">
                      PP: {b.powerplayRuns} ({ppPct}%) | Mid: {b.middleRuns} ({midPct}%) | Death: {b.deathRuns} ({deathPct}%)
                    </span>
                  </div>
                  {/* Segmented Bar */}
                  <div className="w-full h-3 bg-slate-800 rounded flex overflow-hidden">
                    <div
                      style={{ width: `${ppPct}%` }}
                      className="bg-blue-500 hover:brightness-110 transition-all"
                      title={`Powerplay: ${b.powerplayRuns} runs`}
                    />
                    <div
                      style={{ width: `${midPct}%` }}
                      className="bg-amber-400 hover:brightness-110 transition-all"
                      title={`Middle Overs: ${b.middleRuns} runs`}
                    />
                    <div
                      style={{ width: `${deathPct}%` }}
                      className="bg-rose-500 hover:brightness-110 transition-all"
                      title={`Death Overs: ${b.deathRuns} runs`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-6 text-xs text-slate-300 border-t border-slate-800 pt-3">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-blue-500 rounded-sm inline-block" /> Powerplay (1-6)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-amber-400 rounded-sm inline-block" /> Middle Overs (7-15)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-rose-500 rounded-sm inline-block" /> Death Overs (16-20)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

function teamThemeOrFallback(team: string): string {
  return TEAM_COLORS[team]?.primary || '#eab308';
}
