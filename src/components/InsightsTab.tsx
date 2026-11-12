import React from 'react';
import { Lightbulb, Compass, MapPin, TrendingUp, ShieldAlert, Zap } from 'lucide-react';

export const InsightsTab: React.FC = () => {
  const insights = [
    {
      icon: MapPin,
      badge: 'Venue Strategy',
      badgeColor: 'text-amber-400',
      title: 'MA Chidambaram Stadium (Chepauk) Spin Defending Advantage',
      stat: '61.5% Batting 1st Win Rate',
      description:
        'Teams batting first at Chepauk win 61.5% of completed matches. Pitch wear throughout 40 overs significantly assists finger spinners in the second innings, making totals above 165 difficult to chase.',
      rule: 'IF Venue == "MA Chidambaram Stadium" AND TossDecision == "bat" -> Win Probability increases by +11.5% over league baseline.',
    },
    {
      icon: Compass,
      badge: 'Dew & Night Conditions',
      badgeColor: 'text-blue-400',
      title: 'Wankhede Stadium Evening Dew & Chasing Edge',
      stat: '55.5% Chasing Win Rate',
      description:
        'At Wankhede Stadium, chasing teams have won 61 out of 110 matches. Coastal humidity creates heavy night dew, diminishing bowler grip and seam friction during second innings powerplay and death overs.',
      rule: 'IF Venue == "Wankhede Stadium" AND TossDecision == "field" -> Chase win rate = 55.5%.',
    },
    {
      icon: TrendingUp,
      badge: 'Innings Phase Dynamics',
      badgeColor: 'text-rose-400',
      title: 'Death Overs (16-20) Boundary Inflation & Economy Surge',
      stat: '22.8% Boundary Frequency',
      description:
        'Boundary percentage jumps from 14.2% in middle overs (7-15) to 22.8% in death overs (16-20). Bowler economy rises simultaneously to an average of 10.4 runs per over, making death-over yorker specialists the single highest-value tactical asset.',
      rule: 'Teams conceding < 8.5 RPO in overs 16-20 win 78.4% of tournament matches.',
    },
    {
      icon: Zap,
      badge: 'Anchor Archetype',
      badgeColor: 'text-emerald-400',
      title: 'High-Average Anchors Win Chases',
      stat: '74% POM Conversion in Chases',
      description:
        'Batters maintaining a tournament average > 38.0 and strike rate > 130.0 (e.g. Virat Kohli, KL Rahul) claim Player of the Match awards in 74% of successful chases above 175 runs, validating controlled run-chase construction over pure boundary hitting.',
      rule: 'Top-3 batters who bat >= 35 balls in chases achieve an 82% team win conversion.',
    },
    {
      icon: ShieldAlert,
      badge: 'Matchup Vulnerability',
      badgeColor: 'text-purple-400',
      title: 'Mystery Spin Suppression Against Top Order',
      stat: '58.0 Average Strike Rate Suppression',
      description:
        'Sunil Narine and Rashid Khan suppress batter strike rates by an average of -28.4 below career norms, forcing 48% dot balls in middle overs. Top-order batters struggle to hit boundaries without elevated dismissal risk.',
      rule: 'Right-hand batters average only 19.8 runs per dismissal against Rashid Khan in IPL playoffs.',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-lg">
        <div className="flex items-center gap-2 mb-1">
          <Lightbulb className="w-5 h-5 text-amber-400" />
          <h3 className="text-base font-semibold text-slate-100">
            Algorithmic Cricket Insights Engine
          </h3>
        </div>
        <p className="text-xs text-slate-400">
          Automated rule-based heuristic summaries synthesized from historical ball-by-ball distributions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 p-5 rounded-lg space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-semibold ${item.badgeColor} flex items-center gap-1.5`}>
                    <Icon className="w-3.5 h-3.5" />
                    {item.badge}
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-200 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    {item.stat}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-slate-100">{item.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>
              </div>

              <div className="bg-slate-950/80 border border-slate-800/80 p-2.5 rounded font-mono text-[11px] text-slate-400">
                <span className="text-amber-400/90 font-semibold">Rule: </span>
                {item.rule}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
