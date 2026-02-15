export default async function handler(req, res) {
  const { ticker } = req.query;

  if (!ticker) {
    return res.status(400).json({ error: "Missing ticker parameter" });
  }

  const apiKey = "f4faaf5fc1f149eeb9364b8065b8298b";
  const encoded = encodeURIComponent(ticker);
  const url = `https://api.twelvedata.com/quote?symbol=${encoded}&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    res.setHeader("Access-Control-Allow-Origin", "*");

    // TwelveData returns an error object with "code" when something is wrong
    if (!data || data.code) {
      return res.status(404).json({ error: data.message || "No data for ticker", ticker });
    }

    res.status(200).json(data);
  } catch (err) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(500).json({ error: "Failed to fetch price" });
  }
}
