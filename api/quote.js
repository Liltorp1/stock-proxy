export default async function handler(req, res) {
  const { ticker } = req.query;

  if (!ticker) {
    return res.status(400).json({ error: "Missing ticker parameter" });
  }

  const encoded = encodeURIComponent(ticker);
  const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${encoded}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const quote = data?.quoteResponse?.result?.[0];

    res.setHeader("Access-Control-Allow-Origin", "*");

    if (!quote) {
      return res.status(404).json({ error: "No data for ticker", ticker });
    }

    res.status(200).json(quote);
  } catch (err) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(500).json({ error: "Failed to fetch price" });
  }
}
