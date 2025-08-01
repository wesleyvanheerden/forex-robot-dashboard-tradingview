import type { Trade } from "./tradeLogic";

export function isHighQualitySignal(signal: any): boolean {
  // Example: combine multiple criteria for bulletproof filter
  return (
    (signal.signalQuality === "Premium" || signal.signalQuality === "High") &&
    Number(signal.predictedPips) >= 30 &&
    (signal.predictedDuration === "4h" || signal.predictedDuration === "6h" || signal.predictedDuration === "1d") &&
    !signal.lowLiquidityTime &&
    Number(signal.aiScore) >= 0.85
  );
}