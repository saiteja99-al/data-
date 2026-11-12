import React, { useState } from 'react';
import { RADAR_PLAYERS, TEAM_COLORS } from '../data/cricketData';
import { PlayerRadarData } from '../types/cricket';
import { Sparkles, ArrowLeftRight, Check, Zap } from 'lucide-react';

export const PlayerComparisonTab: React.FC = () => {
  const playerNames = Object.keys(RADAR_PLAYERS);
  const [player1Name, setPlayer1Name] = useState<string>('Virat Kohli');
  const [player2Name, setPlayer2Name] = useState<string>('AB de Villiers');

  const p1 = RADAR_PLAYERS[player1Name] || RADAR_PLAYERS['Virat Kohli'];
  const p2 = RADAR_PLAYERS[player2Name] || RADAR_PLAYERS['AB de Villiers'];

  const axes = [
    { key: 'strikeRateNorm', label: 'Strike Rate', p1Val: p1.strikeRateNorm, p2Val: p2.strikeRateNorm },
    { key: 'averageNorm', label: 'Average', p1Val: p1.averageNorm, p2Val: p2.averageNorm },
    { key: 'boundaryRateNorm', label: 'Boundary %', p1Val: p1.boundaryRateNorm, p2Val: p2.boundaryRateNorm },
    { key: 'consistencyNorm', label: 'Consistency', p1Val: p1.consistencyNorm, p2Val: p2.consistencyNorm },
    { key: 'pressureNorm', label: 'Pressure Impact', p1Val: p1.pressureNorm, p2Val: p2.pressureNorm },
    { key: 'runningNorm', label: 'Running Between Wickets', p1Val: p1.runningNorm, p2Val: p2.runningNorm },
  ];

  // Radar chart mathematical coordinates (6 axes, 360 / 6 = 60 deg each)
  const center = 150;
  const radius = 100;
  const numAxes = axes.length;

  const getCoordinates = (value: number, index: number) => {
    const angle = (Math.PI * 2 / numAxes) * index - Math.PI / 2;
    const r = (value / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  const p1Points = axes.map((a, i) => getCoordinates(a.p1Val, i));
  const p2Points = axes.map((a, i) => getCoordinates(a.p2Val, i));

  const p1Polygon = p1Points.map((p) => `${p.x},${p.y}`).join(' ');
  const p2Polygon = p2Points.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <div className="space-y-6">
      {/* Player Selector Bar */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-lg">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="w-full md:w-5/12">
            <label className="text-xs font-semibold text-amber-400 block mb-1">
              Player A (Gold Polygon)
            </label>
            <select
              value={player1Name}
              onChange={(e) => setPlayer1Name(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm text-slate-100 font-semibold focus:outline-none focus:border-amber-400"
            >
              {playerNames.map((name) => (
                <option key={name} value={name}>
                  {name} ({RADAR_PLAYERS[name].team})
                </option>
              ))}
            </select>
          </div>

          <div className="p-2 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
            <ArrowLeftRight className="w-4 h-4 text-amber-400" />
          </div>

          <div className="w-full md:w-5/12">
            <label className="text-xs font-semibold text-blue-400 block mb-1">
              Player B (Blue Polygon)
            </label>
            <select
              value={player2Name}
              onChange={(e) => setPlayer2Name(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm text-slate-100 font-semibold focus:outline-none focus:border-blue-400"
            >
              {playerNames.map((name) => (
                <option key={name} value={name}>
                  {name} ({RADAR_PLAYERS[name].team})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Radar & Metric Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Radar SVG Chart */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-lg lg:col-span-6 flex flex-col items-center justify-center">
          <div className="w-full flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Six-Dimensional Skill Spider Radar
            </h3>
            <span className="text-xs text-slate-400 font-mono">0 – 100 Normalized Scale</span>
          </div>

          <div className="w-full max-w-sm aspect-square relative flex items-center justify-center">
            <svg viewBox="0 0 300 300" className="w-full h-full overflow-visible">
              {/* Background concentric radar rings: 25%, 50%, 75%, 100% */}
              {[0.25, 0.5, 0.75, 1.0].map((level) => {
                const ringPoints = Array.from({ length: numAxes }).map((_, i) => {
                  const angle = (Math.PI * 2 / numAxes) * i - Math.PI / 2;
                  const r = level * radius;
                  return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
                });
                return (
                  <polygon
                    key={level}
                    points={ringPoints.join(' ')}
                    fill="none"
                    stroke="#334155"
                    strokeWidth="1"
                    strokeDasharray={level < 1.0 ? '2,2' : undefined}
                  />
                );
              })}

              {/* Axis Spoke Lines */}
              {Array.from({ length: numAxes }).map((_, i) => {
                const angle = (Math.PI * 2 / numAxes) * i - Math.PI / 2;
                const x2 = center + radius * Math.cos(angle);
                const y2 = center + radius * Math.sin(angle);
                return (
                  <line
                    key={i}
                    x1={center}
                    y1={center}
                    x2={x2}
                    y2={y2}
                    stroke="#475569"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Axis Labels */}
              {axes.map((a, i) => {
                const angle = (Math.PI * 2 / numAxes) * i - Math.PI / 2;
                const labelRadius = radius + 22;
                const lx = center + labelRadius * Math.cos(angle);
                const ly = center + labelRadius * Math.sin(angle);
                return (
                  <text
                    key={a.label}
                    x={lx}
                    y={ly}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#94a3b8"
                    fontSize="9"
                    fontFamily="inherit"
                    fontWeight="600"
                  >
                    {a.label}
                  </text>
                );
              })}

              {/* Player 1 Polygon (Amber) */}
              <polygon
                points={p1Polygon}
                fill="rgba(245, 158, 11, 0.25)"
                stroke="#f59e0b"
                strokeWidth="2.5"
              />
              {p1Points.map((p, idx) => (
                <circle key={idx} cx={p.x} cy={p.y} r="3.5" fill="#f59e0b" />
              ))}

              {/* Player 2 Polygon (Blue) */}
              <polygon
                points={p2Polygon}
                fill="rgba(59, 130, 246, 0.25)"
                stroke="#3b82f6"
                strokeWidth="2.5"
              />
              {p2Points.map((p, idx) => (
                <circle key={idx} cx={p.x} cy={p.y} r="3.5" fill="#3b82f6" />
              ))}
            </svg>
          </div>

          {/* Color Legend */}
          <div className="flex items-center justify-center gap-6 text-xs font-semibold pt-3 border-t border-slate-800 w-full mt-2">
            <span className="flex items-center gap-2 text-amber-400">
              <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
              {p1.name} ({p1.team.split(' ')[0]})
            </span>
            <span className="flex items-center gap-2 text-blue-400">
              <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" />
              {p2.name} ({p2.team.split(' ')[0]})
            </span>
          </div>
        </div>

        {/* Head-to-Head Detailed Metrics Table */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-lg lg:col-span-6 space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              Empirical Attribute Breakdown
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Direct statistical head-to-head comparing consistency vs firepower
            </p>
          </div>

          <div className="space-y-3">
            {axes.map((a) => {
              const diff = a.p1Val - a.p2Val;
              return (
                <div key={a.label} className="bg-slate-950/60 border border-slate-800/80 p-3 rounded-md text-xs space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 font-semibold">{a.label}</span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {diff > 0 ? (
                        <span className="text-amber-400">+{diff} {p1.name.split(' ')[0]} Advantage</span>
                      ) : diff < 0 ? (
                        <span className="text-blue-400">+{Math.abs(diff)} {p2.name.split(' ')[0]} Advantage</span>
                      ) : (
                        <span className="text-slate-400">Equal Score</span>
                      )}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 items-center">
                    <div>
                      <div className="flex justify-between text-[11px] text-amber-300 mb-0.5">
                        <span>{p1.name.split(' ')[0]}</span>
                        <span className="font-mono tabular-nums font-bold">{a.p1Val}</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          style={{ width: `${a.p1Val}%` }}
                          className="h-full bg-amber-400 rounded-full"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] text-blue-300 mb-0.5">
                        <span>{p2.name.split(' ')[0]}</span>
                        <span className="font-mono tabular-nums font-bold">{a.p2Val}</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          style={{ width: `${a.p2Val}%` }}
                          className="h-full bg-blue-500 rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Raw Benchmark Summary */}
          <div className="bg-slate-950/80 border border-slate-800 p-3 rounded text-xs flex justify-between items-center text-slate-400">
            <span>
              <strong>{p1.name.split(' ')[0]}</strong>: Avg {p1.rawStats.average} | SR {p1.rawStats.strikeRate}
            </span>
            <span className="text-slate-600">vs</span>
            <span>
              <strong>{p2.name.split(' ')[0]}</strong>: Avg {p2.rawStats.average} | SR {p2.rawStats.strikeRate}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
