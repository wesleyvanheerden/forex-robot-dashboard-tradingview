import { useState } from "react";

export default function LotSizeCalculator() {
  const [risk, setRisk] = useState(1);
  const [balance, setBalance] = useState(1000);
  const [stopLossPips, setStopLossPips] = useState(20);
  const [lotSize, setLotSize] = useState(0);

  function calcLotSize() {
    const riskAmount = (risk / 100) * balance;
    const size = riskAmount / stopLossPips / 10;
    setLotSize(Number(size.toFixed(2)));
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow mb-6">
      <h2 className="text-2xl font-semibold mb-2">Lot Size Calculator</h2>
      <div className="flex gap-4 items-end">
        <div>
          <label>Risk %</label>
          <input type="number" className="border ml-2 w-16" value={risk} onChange={e=>setRisk(Number(e.target.value))} />
        </div>
        <div>
          <label>Balance $</label>
          <input type="number" className="border ml-2 w-24" value={balance} onChange={e=>setBalance(Number(e.target.value))} />
        </div>
        <div>
          <label>Stop Loss (pips)</label>
          <input type="number" className="border ml-2 w-20" value={stopLossPips} onChange={e=>setStopLossPips(Number(e.target.value))} />
        </div>
        <button className="bg-blue-600 text-white px-4 py-1 rounded" onClick={calcLotSize}>Calculate</button>
        <div>
          <b>Lot Size:</b> {lotSize}
        </div>
      </div>
    </div>
  );
}