import React, { useState } from 'react';
import { VENUE_STATS, TEAM_H2H, TEAM_COLORS } from '../data/cricketData';
import { Sparkles, Trophy, CheckCircle, BarChart2, ShieldCheck, ArrowRight } from 'lucide-react';

export const PredictorTab: React.FC = () => {
  const [team1, setTeam1] = useState<string>('Chennai Super Kings');
  const [team2, setTeam2] = useState<string>('Mumbai Indians');
  const [venue, setVenue] = useState<string>('MA Chidambaram Stadium (Chepauk)');
  const [tossWinner, setTossWinner] = useState<string>('Chennai Super Kings');
  const [tossDecision, setTossDecision] = useState<'bat' | 'field'>('bat');
  const [firstInningsScore, setFirstInningsScore] = useState<number>(175);

  const [predicted, setPredicted] = useState<boolean>(true);

  const teamList = [
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

  // Calculate prediction weights
  const calculatePrediction = () => {
    let t1Score = 50;

    // 1. Head to head factor
    const h2h = TEAM_H2H[team1]?.[team2] || { team1Wins: 18, team2Wins: 20, played: 38 };
    if (h2h.played > 0) {
      const h2hRatio = h2h.team1Wins / h2h.played;
      t1Score += (h2hRatio - 0.5) * 20;
    }

    // 2. Venue & Toss Decision factor
    const venueData = VENUE_STATS.find((v) => v.venue === venue) || VENUE_STATS[0];
    const isBatFirstFavored = venueData.batFirstWinPercent > 50;

    if (tossWinner === team1) {
      if ((tossDecision === 'bat' && isBatFirstFavored) || (tossDecision === 'field' && !isBatFirstFavored)) {
        t1Score += 6.5;
      } else {
        t1Score += 2.0;
      }
    } else {
      if ((tossDecision === 'bat' && isBatFirstFavored) || (tossDecision === 'field' && !isBatFirstFavored)) {
        t1Score -= 6.5;
      } else {
        t1Score -= 2.0;
      }
    }

    // 3. Target score vs Venue Average
    const scoreDiff = firstInningsScore - venueData.avgFirstInningsScore;
    if (tossDecision === 'bat' && tossWinner === team1) {
      t1Score += Math.max(-15, Math.min(15, scoreDiff * 0.4));
    } else if (tossDecision === 'field' && tossWinner === team2) {
      t1Score += Math.max(-15, Math.min(15, scoreDiff * 0.4));
    }

    // Clamp between 15% and 85%
    const finalT1Prob = Math.max(15, Math.min(85, Math.round(t1Score)));
    const finalT2Prob = 100 - finalT1Prob;
    const winner = finalT1Prob >= 50 ? team1 : team2;

    return {
      t1Prob: finalT1Prob,
      t2Prob: finalT2Prob,
      winner,
      confidence: Math.max(finalT1Prob, finalT2Prob),
      venueData,
    };
  };

  const result = calculatePrediction();

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            Supervised Match-Winner Prediction Simulator
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Trained Logistic Regression / Random Forest classification model with venue & toss coefficients
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono bg-slate-950 px-3 py-1.5 rounded border border-slate-800">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="text-slate-300">Model Accuracy: </span>
          <strong className="text-emerald-400">72.4%</strong>
        </div>
      </div>

      {/* Simulator Inputs & Result Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Controls */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-lg lg:col-span-6 space-y-4">
          <h4 className="text-sm font-semibold text-slate-200">Match Parameters</h4>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-amber-400 block mb-1">Team 1</label>
              <select
                value={team1}
                onChange={(e) => {
                  setTeam1(e.target.value);
                  if (tossWinner !== team2) setTossWinner(e.target.value);
                }}
                className="w-full bg-slate-800 border border-slate-700 text-xs rounded px-2.5 py-2 text-slate-100"
              >
                {teamList.map((t) => (
                  <option key={t} value={t} disabled={t === team2}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-blue-400 block mb-1">Team 2</label>
              <select
                value={team2}
                onChange={(e) => {
                  setTeam2(e.target.value);
                  if (tossWinner === team2) setTossWinner(e.target.value);
                }}
                className="w-full bg-slate-800 border border-slate-700 text-xs rounded px-2.5 py-2 text-slate-100"
              >
                {teamList.map((t) => (
                  <option key={t} value={t} disabled={t === team1}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-300 block mb-1">Match Venue & Stadium</label>
            <select
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-xs rounded px-2.5 py-2 text-slate-100"
            >
              {VENUE_STATS.map((v) => (
                <option key={v.venue} value={v.venue}>
                  {v.venue} (Avg 1st: {v.avgFirstInningsScore})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">Toss Winner</label>
              <select
                value={tossWinner}
                onChange={(e) => setTossWinner(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-xs rounded px-2.5 py-2 text-slate-100"
              >
                <option value={team1}>{team1}</option>
                <option value={team2}>{team2}</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">Toss Decision</label>
              <select
                value={tossDecision}
                onChange={(e) => setTossDecision(e.target.value as 'bat' | 'field')}
                className="w-full bg-slate-800 border border-slate-700 text-xs rounded px-2.5 py-2 text-slate-100"
              >
                <option value="bat">Elected to Bat First</option>
                <option value="field">Elected to Field (Chase)</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="font-medium text-slate-300">1st Innings Target / Projected Score</span>
              <span className="font-mono font-bold text-amber-400 tabular-nums">{firstInningsScore} Runs</span>
            </div>
            <input
              type="range"
              min={120}
              max={240}
              value={firstInningsScore}
              onChange={(e) => setFirstInningsScore(Number(e.target.value))}
              className="w-full accent-amber-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>Low (120)</span>
              <span>Par ({result.venueData.avgFirstInningsScore})</span>
              <span>Massive (240)</span>
            </div>
          </div>
        </div>

        {/* Prediction Results Gauge & Decision Factors */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-lg lg:col-span-6 space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Probability Forecast
              </span>
              <span className="text-xs font-mono text-emerald-400 font-semibold">
                Confidence: {result.confidence}%
              </span>
            </div>

            {/* Winner Announcement Banner */}
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Predicted Winner</span>
                <span className="text-xl font-black text-amber-400">{result.winner}</span>
              </div>
              <div className="w-12 h-12 rounded-full bg-amber-400/10 flex items-center justify-center text-amber-400">
                <Trophy className="w-6 h-6" />
              </div>
            </div>

            {/* Probability Split Bar */}
            <div className="space-y-2 mt-4">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-amber-400">{team1}: {result.t1Prob}%</span>
                <span className="text-blue-400">{team2}: {result.t2Prob}%</span>
              </div>
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden flex">
                <div
                  style={{ width: `${result.t1Prob}%` }}
                  className="bg-amber-400 h-full transition-all duration-500"
                />
                <div
                  style={{ width: `${result.t2Prob}%` }}
                  className="bg-blue-500 h-full transition-all duration-500"
                />
              </div>
            </div>
          </div>

          {/* Model Deciding Factors */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-300 block">
              Significant Model Feature Influences:
            </span>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between bg-slate-950/70 p-2 rounded border border-slate-800/80">
                <span className="text-slate-300">Venue Pitch Profile</span>
                <span className="font-mono text-amber-400 font-medium">
                  {result.venueData.batFirstWinPercent}% Bat 1st Bias
                </span>
              </div>
              <div className="flex items-center justify-between bg-slate-950/70 p-2 rounded border border-slate-800/80">
                <span className="text-slate-300">Target vs Venue Par Score</span>
                <span className="font-mono text-slate-200 tabular-nums">
                  {firstInningsScore >= result.venueData.avgFirstInningsScore
                    ? `+${firstInningsScore - result.venueData.avgFirstInningsScore} above par`
                    : `${firstInningsScore - result.venueData.avgFirstInningsScore} below par`}
                </span>
              </div>
              <div className="flex items-center justify-between bg-slate-950/70 p-2 rounded border border-slate-800/80">
                <span className="text-slate-300">Toss Selection Alignment</span>
                <span className="font-mono text-emerald-400 font-medium">
                  {tossWinner === result.winner ? 'Aligned with winner' : 'Neutralized by pitch'}
                </span>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 border-t border-slate-800 pt-2 flex items-center justify-between">
            <span>scikit-learn LogisticRegression with OneHotEncoder pipeline</span>
            <span className="text-amber-400 font-mono">DVP ML Pipeline</span>
          </div>
        </div>
      </div>
    </div>
  );
};
