import type { Trade } from "./tradeLogic";

export function shouldBlockTrading(trades: Trade[]): boolean {
  const last5 = trades.slice(-5);
  const losses = last5.filter(t => t.result === "LOSS").length;
  const maxDrawdown = Math.max(...trades.map(t => t.drawdown || 0));
  return losses >= 4 || maxDrawdown > 50;
}