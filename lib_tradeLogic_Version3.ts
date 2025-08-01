export type Trade = {
  id: string;
  pair: string;
  direction: "BUY" | "SELL";
  entry: number;
  stopLoss: number;
  takeProfit: number;
  signalQuality: "Premium" | "High" | "Medium";
  predictedPips: number;
  predictedDuration: string;
  executedAt: number;
  closedAt?: number;
  closeReason?: "TP" | "SL" | "Manual";
  priceHistory: { time: number; price: number }[];
  result?: "WIN" | "LOSS";
  pnl?: number;
  accuracy?: number;
  slippage?: number;
  drawdown?: number;
  profitFactor?: number;
  aiScore?: number;
  session?: string;
  strategyName?: string;
  lowLiquidityTime?: boolean;
};

export function addTradeFromWebhook(payload: any): Trade {
  return {
    id: String(Date.now()),
    pair: payload.pair,
    direction: payload.action,
    entry: parseFloat(payload.entry),
    stopLoss: parseFloat(payload.stopLoss),
    takeProfit: parseFloat(payload.takeProfit),
    signalQuality: payload.signalQuality,
    predictedPips: Number(payload.predictedPips),
    predictedDuration: payload.predictedDuration,
    executedAt: Date.now(),
    priceHistory: [{ time: Date.now(), price: parseFloat(payload.entry) }],
    aiScore: payload.aiScore || 1,
    session: payload.session || "London",
    strategyName: payload.strategyName || "Default",
    lowLiquidityTime: payload.lowLiquidityTime || false,
  };
}