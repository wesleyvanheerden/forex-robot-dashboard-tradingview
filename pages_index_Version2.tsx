import PerformanceDashboard from "../components/PerformanceDashboard";
import TradeHistory from "../components/TradeHistory";
import AiInsights from "../components/AiInsights";
import LotSizeCalculator from "../components/LotSizeCalculator";
import RiskBanner from "../components/RiskBanner";
import { trades } from "../data/trades";
import { shouldBlockTrading } from "../lib/riskManager";

export default function Home() {
  const blockTrading = shouldBlockTrading(trades);
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Forex Robot Dashboard</h1>
      {blockTrading && <RiskBanner />}
      <PerformanceDashboard trades={trades} />
      <div className="my-8" />
      <LotSizeCalculator />
      <div className="my-8" />
      <TradeHistory trades={trades} />
      <div className="my-8" />
      <AiInsights trades={trades} />
    </div>
  );
}