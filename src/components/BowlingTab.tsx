import React, { useState } from 'react';
import { TOP_BOWLERS, TEAM_COLORS } from '../data/cricketData';
import { BowlerStat } from '../types/cricket';
import { Shield, CircleDot, PieChart, Activity } from 'lucide-react';

interface BowlingTabProps {
  selectedTeam: string;
}

export const BowlingTab: React.FC<BowlingTabProps> = ({ selectedTeam }) => {
  const [selectedBowler, setSelectedBowler] = useState<BowlerStat | null>(null);

  const filteredBowlers = TOP_BOWLERS.filter(
    (b) => selectedTeam === 'All' || b.team === selectedTeam
  );

  // Dismissal types distribution across all historical tournament matches
  const dismissalData = [
    { type: 'Caught', percent: 63.4, count: '6,420', color: '#3b82f6' },
    { type: 'Bowled', percent: 18.2, count: '1,844', color: '#eab308' },
    { type: 'LBW', percent: 10.5, count: '1,063', color: '#ec4899' },
    { type: 'Run Out', percent: 5.6, count: '567', color: '#10b981' },
    { type: 'Stumped', percent: 2.3, count: '233', color: '#8b5cf6' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Wicket Takers Leaderboard */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-400" />
              Tournament Wicket Takers Leaderboard
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Economy discipline, strike rates, and death-overs wicket conversions
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {filteredBowlers.length} Leading Bowlers
          </span>
        </div>

        <div className="overflow-x-auto border border-slate-800 rounded-md">
          <table className="w-full text-xs text-left whitespace-nowrap">
            <thead className="bg-slate-950 text-slate-300 font-semibold border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Bowler</th>
                <th className="py-2.5 px-3">Franchise</th>
                <th className="py-2.5 px-2 text-right">Overs</th>
                <th className="py-2.5 px-3 text-right">Wickets</th>
                <th className="py-2.5 px-2 text-right">Economy</th>
                <th className="py-2.5 px-2 text-right">Bowling Avg</th>
                <th className="py-2.5 px-2 text-right">Bowling SR</th>
                <th className="py-2.5 px-2 text-right">Dot Balls</th>
                <th className="py-2.5 px-3 text-right">Death Economy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {filteredBowlers.map((b) => {
                const teamTheme = TEAM_COLORS[b.team] || { primary: '#64748b' };
                return (
                  <tr
                    key={b.name}
                    onClick={() => setSelectedBowler(b)}
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
                    <td className="py-2.5 px-2 text-right font-mono tabular-nums text-slate-400">{b.overs}</td>
                    <td className="py-2.5 px-3 text-right font-mono tabular-nums font-bold text-amber-400">
                      {b.wickets}
                    </td>
                    <td className="py-2.5 px-2 text-right font-mono tabular-nums font-semibold text-emerald-400">
                      {b.economy.toFixed(2)}
                    </td>
                    <td className="py-2.5 px-2 text-right font-mono tabular-nums text-slate-200">
                      {b.average.toFixed(2)}
                    </td>
                    <td className="py-2.5 px-2 text-right font-mono tabular-nums text-slate-400">{b.strikeRate}</td>
                    <td className="py-2.5 px-2 text-right font-mono tabular-nums text-blue-400">
                      {b.dotBalls.toLocaleString()}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono tabular-nums text-rose-400 font-semibold">
                      {b.deathOversEconomy.toFixed(2)} RPO
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Row 2: Economy vs Wickets Bubble Chart & Dismissal Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Economy vs Wickets Bubble Chart */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-lg space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
              <CircleDot className="w-4 h-4 text-amber-400" />
              Economy vs Wickets (Bubble Size = Dot Balls)
            </h3>
            <span className="text-xs text-slate-400 font-mono">X: Economy (6-9) | Y: Wickets</span>
          </div>

          <div className="relative h-64 bg-slate-950/80 rounded border border-slate-800/80 p-4">
            {/* Ideal Corner Highlight (Low Economy, High Wickets) */}
            <div className="absolute top-2 left-2 text-[10px] text-emerald-400/90 font-mono font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Gold Standard (Sub-7.0 RPO & 150+ Wickets)
            </div>

            {/* Bubble Chart Points */}
            {filteredBowlers.map((b) => {
              // Economy range 6.5 to 8.5 -> map to 10% to 90%
              const xNorm = Math.min(92, Math.max(8, ((b.economy - 6.5) / 2.0) * 100));
              // Wickets range 140 to 210 -> map to 10% to 90%
              const yNorm = Math.min(92, Math.max(8, ((b.wickets - 140) / 70) * 100));
              // Dot balls scale bubble radius 16px to 32px
              const size = Math.round(16 + ((b.dotBalls - 1000) / 800) * 18);
              const teamInfo = TEAM_COLORS[b.team] || { primary: '#60a5fa' };

              return (
                <div
                  key={b.name}
                  className="absolute transform -translate-x-1/2 translate-y-1/2 cursor-pointer group"
                  style={{ left: `${xNorm}%`, bottom: `${yNorm}%` }}
                >
                  <div
                    className="rounded-full border-2 border-slate-950 shadow-md flex items-center justify-center font-mono text-[9px] font-bold text-slate-950 opacity-90 transition-transform group-hover:scale-125"
                    style={{
                      width: `${size}px`,
                      height: `${size}px`,
                      backgroundColor: teamInfo.primary,
                    }}
                  >
                    {b.wickets}
                  </div>
                  <div className="hidden group-hover:block absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 bg-slate-900 border border-slate-700 text-slate-100 text-[10px] px-2 py-1 rounded shadow-lg whitespace-nowrap z-20">
                    <p className="font-bold">{b.name} ({b.team})</p>
                    <p className="text-slate-300">
                      Wickets: {b.wickets} | Economy: {b.economy} | Dots: {b.dotBalls}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-xs text-slate-400 flex items-center justify-between border-t border-slate-800 pt-3">
            <span>Sunil Narine & Rashid Khan boast sub-7.0 tournament economy rates.</span>
            <span className="text-amber-400 font-mono">DVP Bubble Model</span>
          </div>
        </div>

        {/* Dismissal Types Donut Chart */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-lg space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
              <PieChart className="w-4 h-4 text-amber-400" />
              Tournament Dismissal Method Breakdown
            </h3>
            <span className="text-xs text-slate-400 font-mono">10,000+ Dismissals</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 justify-center py-2">
            {/* SVG Donut */}
            <div className="relative w-36 h-36 shrink-0">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <circle cx="18" cy="18" r="14" fill="none" stroke="#1e293b" strokeWidth="4" />
                {/* Caught 63.4 */}
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="4"
                  strokeDasharray="63.4 100"
                  strokeLinecap="round"
                />
                {/* Bowled 18.2 */}
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke="#eab308"
                  strokeWidth="4"
                  strokeDasharray="18.2 100"
                  strokeDashoffset="-63.4"
                  strokeLinecap="round"
                />
                {/* LBW 10.5 */}
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke="#ec4899"
                  strokeWidth="4"
                  strokeDasharray="10.5 100"
                  strokeDashoffset="-81.6"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] text-slate-400">Caught</span>
                <span className="text-base font-bold font-mono text-blue-400 tabular-nums">63.4%</span>
              </div>
            </div>

            {/* Legend & Count Rows */}
            <div className="space-y-1.5 w-full text-xs">
              {dismissalData.map((d) => (
                <div
                  key={d.type}
                  className="flex items-center justify-between bg-slate-950/60 border border-slate-800/80 px-2.5 py-1.5 rounded"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-sm inline-block"
                      style={{ backgroundColor: d.color }}
                    />
                    <span className="text-slate-200 font-medium">{d.type}</span>
                  </div>
                  <div className="font-mono text-right tabular-nums">
                    <strong className="text-slate-100">{d.percent}%</strong>
                    <span className="text-slate-500 text-[10px] ml-1.5">({d.count})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-xs text-slate-400 flex items-center justify-between border-t border-slate-800 pt-3">
            <span>Over 63% of wickets in T20 cricket occur via boundary catches.</span>
            <span className="text-slate-400 font-mono">Categorical Donut</span>
          </div>
        </div>
      </div>
    </div>
  );
};
