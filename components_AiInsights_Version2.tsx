import { generateAIInsights } from "../lib/aiInsights";
import type { Trade } from "../lib/tradeLogic";

export default function AiInsights({ trades }: { trades: Trade[] }) {
  const insights = generateAIInsights(trades);
  return (
    <div className="bg-white rounded-lg p-6 shadow mb-6">
      <h2 className="text-2xl font-semibold mb-2">AI Insights</h2>
      <ul className="list-disc pl-6">
        {insights.map((insight, i) => (
          <li key={i} className="mb-1">{insight}</li>
        ))}
      </ul>
    </div>
  );
}