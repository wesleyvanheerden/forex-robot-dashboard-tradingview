import type { NextApiRequest, NextApiResponse } from "next";
import { addTradeFromWebhook } from "../../lib/tradeLogic";
import { isHighQualitySignal } from "../../lib/signalFilter";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // Only accept high quality signals
    if (!isHighQualitySignal(req.body)) {
      return res.status(200).json({ success: false, message: "Signal rejected by filter." });
    }
    const trade = addTradeFromWebhook(req.body);
    // Here you would persist the trade (e.g., database or file)
    res.status(200).json({ success: true, trade });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}