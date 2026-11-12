import React, { useState } from 'react';
import { MATCHUPS, TEAM_H2H, TEAM_COLORS } from '../data/cricketData';
import { Swords, Flame, ShieldAlert, Award } from 'lucide-react';

export const HeadToHeadTab: React.FC = () => {
  const [team1, setTeam1] = useState<string>('Mumbai Indians');
  const [team2, setTeam2] = useState<string>('Chennai Super Kings');
  const [selectedMatchupIndex, setSelectedMatchupIndex] = useState<number>(0);

  const availableTeams = ['Mumbai Indians', 'Chennai Super Kings', 'Royal Challengers Bengaluru'];
  const rivalries = TEAM_H2H[team1]?.[team2] || { played: 38, team1Wins: 20, team2Wins: 18, noResult: 0 };

  const activeMatchup = MATCHUPS[selectedMatchupIndex] || MATCHUPS[0];

  return (
    <div className="space-y-6">
      {/* Franchise Head-to-Head Clash */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2">
              <Swords className="w-4 h-4 text-amber-400" />
              Franchise Rivalry Tracker (El Clásico & Historic Clashes)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Cumulative historical win-loss ledger across all IPL tournaments
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={team1}
              onChange={(e) => setTeam1(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-xs rounded px-2.5 py-1.5 text-slate-200 focus:outline-none"
            >
              {availableTeams.map((t) => (
                <option key={t} value={t} disabled={t === team2}>
                  {t}
                </option>
              ))}
            </select>
            <span className="text-xs text-slate-500 font-bold">VS</span>
            <select
              value={team2}
              onChange={(e) => setTeam2(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-xs rounded px-2.5 py-1.5 text-slate-200 focus:outline-none"
            >
              {['Chennai Super Kings', 'Mumbai Indians', 'Royal Challengers Bengaluru', 'Kolkata Knight Riders', 'Rajasthan Royals'].map((t) => (
                <option key={t} value={t} disabled={t === team1}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Rivalry Banner */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center">
            {/* Team 1 Side */}
            <div className="space-y-1">
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider block">
                {team1}
              </span>
              <span className="text-4xl font-extrabold font-mono text-slate-100 tabular-nums">
                {rivalries.team1Wins}
              </span>
              <span className="text-xs text-slate-400 block">Wins ({((rivalries.team1Wins / rivalries.played) * 100).toFixed(1)}%)</span>
            </div>

            {/* Total Center */}
            <div className="space-y-2 border-y md:border-y-0 md:border-x border-slate-800 py-3 md:py-0">
              <span className="text-xs text-slate-400 uppercase tracking-widest block font-medium">
                Total Encounters
              </span>
              <span className="text-2xl font-bold font-mono text-amber-400 tabular-nums">
                {rivalries.played} Matches
              </span>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden flex">
                <div
                  style={{ width: `${(rivalries.team1Wins / rivalries.played) * 100}%` }}
                  className="bg-blue-500 h-full"
                />
                <div
                  style={{ width: `${(rivalries.team2Wins / rivalries.played) * 100}%` }}
                  className="bg-amber-400 h-full"
                />
              </div>
            </div>

            {/* Team 2 Side */}
            <div className="space-y-1">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block">
                {team2}
              </span>
              <span className="text-4xl font-extrabold font-mono text-slate-100 tabular-nums">
                {rivalries.team2Wins}
              </span>
              <span className="text-xs text-slate-400 block">Wins ({((rivalries.team2Wins / rivalries.played) * 100).toFixed(1)}%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Batter vs Bowler Matchup Matrix & Heatmap */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-400" />
              Batter vs Bowler Head-to-Head Duel Matrix
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Granular ball-by-ball micro-encounters: strike rates, dismissals, and dot-ball counts
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {MATCHUPS.length} Iconic Duels Indexed
          </span>
        </div>

        <div className="overflow-x-auto border border-slate-800 rounded-md">
          <table className="w-full text-xs text-left whitespace-nowrap">
            <thead className="bg-slate-950 text-slate-300 font-semibold border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Batter</th>
                <th className="py-2.5 px-3">Bowler</th>
                <th className="py-2.5 px-2 text-right">Balls Faced</th>
                <th className="py-2.5 px-2 text-right">Runs Scored</th>
                <th className="py-2.5 px-2 text-right">Dismissals</th>
                <th className="py-2.5 px-2 text-right">Strike Rate</th>
                <th className="py-2.5 px-2 text-right">Dot Balls</th>
                <th className="py-2.5 px-3">Tactical Dominance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {MATCHUPS.map((m, idx) => {
                const batterDominant = m.strikeRate > 130 && m.dismissals <= 3;
                const bowlerDominant = m.strikeRate < 100 || m.dismissals >= 4;
                return (
                  <tr
                    key={idx}
                    onClick={() => setSelectedMatchupIndex(idx)}
                    className={`hover:bg-slate-800/50 cursor-pointer transition-colors ${
                      selectedMatchupIndex === idx ? 'bg-slate-800/60' : ''
                    }`}
                  >
                    <td className="py-2.5 px-3 font-semibold text-slate-100">{m.batter}</td>
                    <td className="py-2.5 px-3 font-semibold text-slate-300">{m.bowler}</td>
                    <td className="py-2.5 px-2 text-right font-mono tabular-nums text-slate-400">{m.ballsFaced}</td>
                    <td className="py-2.5 px-2 text-right font-mono tabular-nums font-bold text-amber-400">{m.runsScored}</td>
                    <td className="py-2.5 px-2 text-right font-mono tabular-nums font-semibold text-rose-400">{m.dismissals}</td>
                    <td className="py-2.5 px-2 text-right font-mono tabular-nums text-blue-400">{m.strikeRate}</td>
                    <td className="py-2.5 px-2 text-right font-mono tabular-nums text-slate-400">{m.dots}</td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                          bowlerDominant
                            ? 'bg-rose-500/20 text-rose-300'
                            : batterDominant
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {bowlerDominant ? `Bowler Edge (${m.dismissals} outs)` : batterDominant ? 'Batter On Top' : 'Even Battle'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Selected Duel Breakdown Card */}
        <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-400/10 flex items-center justify-center text-amber-400 font-bold">
              ⚔️
            </div>
            <div>
              <p className="font-semibold text-slate-200 text-sm">
                {activeMatchup.batter} vs {activeMatchup.bowler}
              </p>
              <p className="text-slate-400 text-xs">
                In {activeMatchup.ballsFaced} balls, {activeMatchup.batter} scored {activeMatchup.runsScored} runs with {activeMatchup.dots} dot balls.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-right">
            <div>
              <span className="text-[10px] text-slate-400 block">Strike Rate</span>
              <span className="font-mono text-sm font-bold text-blue-400 tabular-nums">{activeMatchup.strikeRate}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Outs</span>
              <span className="font-mono text-sm font-bold text-rose-400 tabular-nums">{activeMatchup.dismissals}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Dot Ball %</span>
              <span className="font-mono text-sm font-bold text-slate-200 tabular-nums">
                {((activeMatchup.dots / activeMatchup.ballsFaced) * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
