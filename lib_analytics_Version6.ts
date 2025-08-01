import type { Trade } from "./tradeLogic";

// Basic
export function winRate(trades: Trade[]) {
  const wins = trades.filter((t) => t.result === "WIN").length;
  return trades.length ? (100 * wins) / trades.length : 0;
}

export function winRateLastN(trades: Trade[], n: number) {
  const sorted = [...trades].sort((a, b) => (b.closedAt ?? 0) - (a.closedAt ?? 0));
  const recent = sorted.slice(0, n);
  const wins = recent.filter((t) => t.result === "WIN").length;
  return recent.length ? (100 * wins) / recent.length : 0;
}

export function winRateHighQuality(trades: Trade[]) {
  const filtered = trades.filter(t => t.signalQuality === "Premium" || t.signalQuality === "High");
  const wins = filtered.filter(t => t.result === "WIN").length;
  return filtered.length ? (100 * wins) / filtered.length : 0;
}

export function averagePnL(trades: Trade[]) {
  return trades.length ? trades.reduce((a, t) => a + (t.pnl || 0), 0) / trades.length : 0;
}

export function profitFactor(trades: Trade[]) {
  const profits = trades.filter((t) => (t.pnl || 0) > 0).reduce((a, t) => a + (t.pnl || 0), 0);
  const losses = trades.filter((t) => (t.pnl || 0) < 0).reduce((a, t) => a + Math.abs(t.pnl || 0), 0);
  return losses ? profits / losses : profits ? 99 : 0;
}

// Advanced
export function totalTrades(trades: Trade[]) {
  return trades.length;
}

export function totalPnL(trades: Trade[]) {
  return trades.reduce((a, t) => a + (t.pnl || 0), 0);
}

export function bestTrade(trades: Trade[]) {
  return trades.reduce((best, t) => (t.pnl || 0) > (best.pnl || 0) ? t : best, trades[0]);
}

export function worstTrade(trades: Trade[]) {
  return trades.reduce((worst, t) => (t.pnl || 0) < (worst.pnl || 0) ? t : worst, trades[0]);
}

export function pipPredictionAccuracy(trades: Trade[]) {
  // percent of trades where |actual pips - predicted pips| / predicted pips < 0.2
  const accurate = trades.filter(t => typeof t.pnl === "number" && Math.abs(Math.abs(t.pnl!) - Math.abs(t.predictedPips)) / Math.abs(t.predictedPips) < 0.2);
  return trades.length ? (100 * accurate.length) / trades.length : 0;
}

export function durationAccuracy(trades: Trade[]) {
  // percent of trades closed within 20% of predicted duration (in ms)
  const accurate = trades.filter(t => {
    if (!t.closedAt) return false;
    const actual = Math.abs(t.closedAt - t.executedAt);
    // crude conversion: 1h = 1*3600*1000, 1d = 24*3600*1000
    let predictedMs = 0;
    if (t.predictedDuration.endsWith("h")) predictedMs = parseFloat(t.predictedDuration) * 3600 * 1000;
    if (t.predictedDuration.endsWith("d")) predictedMs = parseFloat(t.predictedDuration) * 24 * 3600 * 1000;
    return predictedMs > 0 && Math.abs(actual - predictedMs) / predictedMs < 0.2;
  });
  return trades.length ? (100 * accurate.length) / trades.length : 0;
}

export function maxDrawdown(trades: Trade[]) {
  return trades.reduce((max, t) => Math.max(max, t.drawdown || 0), 0);
}

export function qualityStats(trades: Trade[]) {
  const byQuality: Record<string, { total: number; win: number }> = {};
  trades.forEach(t => {
    if (!byQuality[t.signalQuality]) byQuality[t.signalQuality] = { total: 0, win: 0 };
    byQuality[t.signalQuality].total += 1;
    if (t.result === "WIN") byQuality[t.signalQuality].win += 1;
  });
  return byQuality;
}

export function recentPerformance(trades: Trade[], ms: number) {
  const now = Date.now();
  return trades.filter(t => t.closedAt && t.closedAt > now - ms);
}

// Group performance by session, strategy, etc
export function groupStatsBy(trades: Trade[], key: keyof Trade) {
  const groups: Record<string, Trade[]> = {};
  trades.forEach(t => {
    const val = String(t[key]);
    if (!groups[val]) groups[val] = [];
    groups[val].push(t);
  });
  return groups;
}

// Flag suspect trades
export function flagSuspectTrades(trades: Trade[]) {
  return trades.filter(t =>
    (t.drawdown || 0) > 30 ||
    (t.accuracy || 0) < 0.5 ||
    (t.pnl || 0) < -30 ||
    t.slippage && t.slippage > 1.5
  );
}