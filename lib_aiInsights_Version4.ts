import type { Trade } from "./tradeLogic";

export function generateAIInsights(trades: Trade[]): string[] {
  const insights = [];
  const highDrawdown = trades.filter(t => (t.drawdown || 0) > 30);
  if (highDrawdown.length > 2) insights.push("High drawdown detected. Tighten SL or adjust entry criteria.");
  // Detect time-based patterns
  const lossesAtNight = trades.filter(t =>
    t.result === "LOSS" && new Date(t.executedAt).getUTCHours() > 20
  ).length;
  if (lossesAtNight > 2) insights.push("Losses cluster at night. Avoid trading after 20:00 UTC.");
  // Detect losing streaks
  const last5 = trades.slice(-5);
  const losses = last5.filter(t => t.result === "LOSS").length;
  if (losses >= 4) insights.push("Losing streak detected. Reduce lot size or pause trading.");
  if (trades.length === 0) insights.push("No trades yet. Connect TradingView and run!");
  if (trades.length >= 20 && trades.slice(-20).filter(t => t.result === "WIN").length / 20 < 0.8)
    insights.push("Last 20 trades win rate below 80%. Review signal criteria and risk management.");
  return insights;
}