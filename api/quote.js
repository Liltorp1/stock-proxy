export default async function handler(req, res) {
  const { ticker } = req.query;

  if (!ticker) {
    return res.status(400).json({ error: "Missing ticker parameter" });
  }

  const apiKey = "d692ur1r01qs7u9kihegd692ur1r01qs7u9kihf0";
  const encoded = encodeURIComponent(ticker);
  const url = `https://finnhub.io/api/v1/quote?symbol=${encoded}&token=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    res.setHeader("Access-Control-Allow-Origin", "*");

    // Finnhub returns c = current price
    if (!data || data.c === 0) {
      return res.status(404).json({ error: "No data for ticker", ticker });
    }

    res.status(200).json(data);
  } catch (err) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(500).json({ error: "Failed to fetch price" });
  }
}
