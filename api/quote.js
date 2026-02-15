export default async function handler(req, res) {
  const { ticker } = req.query;

  if (!ticker) {
    return res.status(400).json({ error: "Missing ticker parameter" });
  }

  const encoded = encodeURIComponent(ticker);
  const url = `https://query2.finance.yahoo.com/v10/finance/quoteSummary/${encoded}?modules=price`;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json"
      }
    });

    const data = await response.json();
    const priceData = data?.quoteSummary?.result?.[0]?.price;

    res.setHeader("Access-Control-Allow-Origin", "*");

    if (!priceData) {
      return res.status(404).json({ error: "No data for ticker", ticker });
    }

    res.status(200).json(priceData);
  } catch (err) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(500).json({ error: "Failed to fetch price" });
  }
}
