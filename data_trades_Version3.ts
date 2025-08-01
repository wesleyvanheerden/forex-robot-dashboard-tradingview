import type { Trade } from "../lib/tradeLogic";

export const trades: Trade[] = [
  {
    id: "1",
    pair: "EUR/USD",
    direction: "BUY",
    entry: 1.12345,
    stopLoss: 1.12100,
    takeProfit: 1.12900,
    signalQuality: "High",
    predictedPips: 55,
    predictedDuration: "4h",
    executedAt: Date.now() - 3600 * 1000 * 72,
    closedAt: Date.now() - 3600 * 1000 * 68,
    closeReason: "TP",
    priceHistory: [
      { time: Date.now() - 3600 * 1000 * 72, price: 1.12345 },
      { time: Date.now() - 3600 * 1000 * 68, price: 1.12900 },
    ],
    result: "WIN",
    pnl: 55,
    accuracy: 1,
    slippage: 0,
    drawdown: 10,
    profitFactor: 1.5,
    aiScore: 0.91,
    session: "London",
    strategyName: "Breakout"
  },
  {
    id: "2",
    pair: "USD/JPY",
    direction: "SELL",
    entry: 149.05,
    stopLoss: 149.40,
    takeProfit: 148.60,
    signalQuality: "Premium",
    predictedPips: 45,
    predictedDuration: "2h",
    executedAt: Date.now() - 3600 * 1000 * 48,
    closedAt: Date.now() - 3600 * 1000 * 45,
    closeReason: "SL",
    priceHistory: [
      { time: Date.now() - 3600 * 1000 * 48, price: 149.05 },
      { time: Date.now() - 3600 * 1000 * 45, price: 149.40 },
    ],
    result: "LOSS",
    pnl: -35,
    accuracy: 0.3,
    slippage: 1,
    drawdown: 15,
    profitFactor: 0.7,
    aiScore: 0.89,
    session: "Tokyo",
    strategyName: "Reversal"
  },
  // ... (add more sample trades as in previous responses, up to at least 20)
];