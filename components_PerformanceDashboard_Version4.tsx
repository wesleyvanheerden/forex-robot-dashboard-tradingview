import {
  winRate,
  averagePnL,
  profitFactor,
  totalTrades,
  totalPnL,
  bestTrade,
  worstTrade,
  pipPredictionAccuracy,
  durationAccuracy,
  maxDrawdown,
  qualityStats,
  recentPerformance,
  winRateLastN,
  winRateHighQuality,
  groupStatsBy
} from "../lib/analytics";
import { flagSuspectTrades } from "../lib/analytics";
import type { Trade } from "../lib/tradeLogic";

export default function PerformanceDashboard({ trades }: { trades: Trade[] }) {
  const best = bestTrade(trades);
  const worst = worstTrade(trades);
  const qStats = qualityStats(trades);
  const last7d = recentPerformance(trades, 7 * 24 * 3600 * 1000);
  const last30d = recentPerformance(trades, 30 * 24 * 3600 * 1000);
  const flagged = flagSuspectTrades(trades);
  const sessionStats = groupStatsBy(trades, "session");
  const stratStats = groupStatsBy(trades, "strategyName");

  return (
    <div className="bg-white rounded-lg p-6 shadow mb-6">
      <h2 className="text-2xl font-semibold mb-4">Performance Overview</h2>
      <div className="flex flex-wrap gap-8 mb-4">
        <Stat label="Win Rate" value={winRate(trades).toFixed(2) + "%"} />
        <Stat label="Win Rate (Last 20)" value={winRateLastN(trades, 20).toFixed(2) + "%"} />
        <Stat label="HQ Win Rate" value={winRateHighQuality(trades).toFixed(2) + "%"} />
        <Stat label="Total Trades" value={totalTrades(trades)} />
        <Stat label="Total P&L" value={totalPnL(trades)} />
        <Stat label="Avg P&L" value={averagePnL(trades).toFixed(2)} />
        <Stat label="Profit Factor" value={profitFactor(trades).toFixed(2)} />
        <Stat label="Max Drawdown" value={maxDrawdown(trades)} />
      </div>
      <div className="flex flex-wrap gap-8 mb-4">
        <Stat label="Pip Prediction Accuracy" value={pipPredictionAccuracy(trades).toFixed(2) + "%"} />
        <Stat label="Duration Accuracy" value={durationAccuracy(trades).toFixed(2) + "%"} />
      </div>
      <div className="mb-4">
        <h3 className="font-semibold">Best Trade</h3>
        <div>
          {best.pair} {best.direction} P&L: {best.pnl}, Quality: {best.signalQuality}
        </div>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold">Worst Trade</h3>
        <div>
          {worst.pair} {worst.direction} P&L: {worst.pnl}, Quality: {worst.signalQuality}
        </div>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold">Win Rate by Quality</h3>
        <ul>
          {Object.entries(qStats).map(([quality, stats]) => (
            <li key={quality}>
              {quality}: {stats.win}/{stats.total} (
              {Math.round((100 * stats.win) / stats.total)}%)
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold">Flagged/Suspect Trades</h3>
        <div>{flagged.length} trades need review.</div>
      </div>
      <div>
        <h3 className="font-semibold">Recent Performance</h3>
        <div>
          Last 7d: {winRate(last7d).toFixed(2)}% win, {totalPnL(last7d)} P&L, {last7d.length} trades
        </div>
        <div>
          Last 30d: {winRate(last30d).toFixed(2)}% win, {totalPnL(last30d)} P&L, {last30d.length} trades
        </div>
      </div>
      <div className="mt-6">
        <h3 className="font-semibold">Session Performance</h3>
        <ul>
          {Object.entries(sessionStats).map(([session, group]) => (
            <li key={session}>
              {session}: {winRate(group).toFixed(2)}% win, {group.length} trades
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <h3 className="font-semibold">Strategy Performance</h3>
        <ul>
          {Object.entries(stratStats).map(([strat, group]) => (
            <li key={strat}>
              {strat}: {winRate(group).toFixed(2)}% win, {group.length} trades
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: any }) {
  return (
    <div>
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-gray-500">{label}</div>
    </div>
  );
}