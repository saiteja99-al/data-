export type CricketFormat = 'IPL' | 'T20I' | 'ODI';

export type DataSourceType = 
  | 'cricsheet'
  | 'cricket_api'
  | 'web_scraper'
  | 'uploaded_csv';

export interface MatchRecord {
  id: string;
  season: number;
  city: string;
  date: string;
  team1: string;
  team2: string;
  tossWinner: string;
  tossDecision: 'bat' | 'field';
  result: 'normal' | 'tie' | 'no_result';
  dlApplied: number;
  winner: string;
  winByRuns: number;
  winByWickets: number;
  playerOfMatch: string;
  venue: string;
  umpire1: string;
  umpire2: string;
}

export interface BatterStat {
  name: string;
  team: string;
  matches: number;
  innings: number;
  runs: number;
  balls: number;
  average: number;
  strikeRate: number;
  fifties: number;
  hundreds: number;
  fours: number;
  sixes: number;
  boundaryPercent: number;
  powerplayRuns: number;
  middleRuns: number;
  deathRuns: number;
}

export interface BowlerStat {
  name: string;
  team: string;
  matches: number;
  overs: number;
  maidens: number;
  runsConceded: number;
  wickets: number;
  economy: number;
  average: number;
  strikeRate: number;
  dotBalls: number;
  fourWickets: number;
  deathOversEconomy: number;
  deathOversWickets: number;
}

export interface PlayerRadarData {
  name: string;
  team: string;
  strikeRateNorm: number;
  averageNorm: number;
  boundaryRateNorm: number;
  consistencyNorm: number;
  pressureNorm: number;
  runningNorm: number;
  rawStats: {
    strikeRate: number;
    average: number;
    boundaryPercent: number;
    dotBallPercent: number;
    highPressureSR: number;
    nonBoundarySR: number;
  };
}

export interface MatchupData {
  batter: string;
  bowler: string;
  ballsFaced: number;
  runsScored: number;
  dismissals: number;
  strikeRate: number;
  dots: number;
}

export interface CleaningSummary {
  originalRows: number;
  cleanedRows: number;
  duplicatesRemoved: number;
  teamNamesStandardized: { [key: string]: string };
  datesFormatted: number;
  missingValuesImputed: { column: string; count: number; method: string }[];
  memoryFootprintKB: number;
}

export interface VenueStat {
  venue: string;
  city: string;
  matches: number;
  avgFirstInningsScore: number;
  batFirstWins: number;
  chaseWins: number;
  batFirstWinPercent: number;
  highestTotal: number;
  lowestDefended: number;
}

export interface PredictionInput {
  team1: string;
  team2: string;
  venue: string;
  tossWinner: string;
  tossDecision: 'bat' | 'field';
  firstInningsRuns: number;
  oversRemaining: number;
  wicketsInHand: number;
}

export interface PredictionResult {
  winner: string;
  team1WinProb: number;
  team2WinProb: number;
  confidence: number;
  factors: {
    name: string;
    impact: 'positive' | 'negative' | 'neutral';
    description: string;
  }[];
  modelMetrics: {
    modelType: string;
    accuracy: number;
    f1Score: number;
    trainingSampleCount: number;
  };
}
