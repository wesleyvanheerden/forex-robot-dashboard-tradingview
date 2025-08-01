import type { Trade } from "../lib/tradeLogic";

export default function TradeHistory({ trades }: { trades: Trade[] }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow mb-6">
      <h2 className="text-2xl font-semibold mb-2">Trade History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-4 py-2">Pair</th>
              <th className="px-4 py-2">Dir</th>
              <th className="px-4 py-2">Entry</th>
              <th className="px-4 py-2">Exit</th>
              <th className="px-4 py-2">P&L</th>
              <th className="px-4 py-2">Result</th>
              <th className="px-4 py-2">Accuracy</th>
              <th className="px-4 py-2">Quality</th>
              <th className="px-4 py-2">Session</th>
              <th className="px-4 py-2">Strategy</th>
              <th className="px-4 py-2">AI Score</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade) => (
              <tr key={trade.id}>
                <td className="border px-4 py-2">{trade.pair}</td>
                <td className="border px-4 py-2">{trade.direction}</td>
                <td className="border px-4 py-2">{trade.entry}</td>
                <td className="border px-4 py-2">{trade.priceHistory.at(-1)?.price ?? "-"}</td>
                <td className="border px-4 py-2">{trade.pnl}</td>
                <td className="border px-4 py-2">{trade.result}</td>
                <td className="border px-4 py-2">{trade.accuracy}</td>
                <td className="border px-4 py-2">{trade.signalQuality}</td>
                <td className="border px-4 py-2">{trade.session}</td>
                <td className="border px-4 py-2">{trade.strategyName}</td>
                <td className="border px-4 py-2">{trade.aiScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}