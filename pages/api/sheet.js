// pages/api/sheet.js
// Fetches a tab from the published Google Sheet CSV server-side (no CORS issues)

export default async function handler(req, res) {
  const { tab } = req.query;
  const sheetId = process.env.SHEET_ID;

  if (!sheetId) {
    return res.status(500).json({ error: "SHEET_ID not configured" });
  }

  // Map tab name to gid (Sheet1=Ohtani=0, Sheet2=PC needs its gid)
  // We use the published CSV URL with tab name
  const tabParam = tab === "PC" ? "&sheet=PC" : "&sheet=Ohtani";
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv${tabParam}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Sheet fetch failed: ${response.status}`);
    const csv = await response.text();

    // Parse CSV
    const lines = csv.trim().split("\n").filter(l => l.trim());
    if (lines.length < 2) return res.status(200).json({ headers: [], rows: [] });

    const headers = lines[0].split(",").map(h => h.replace(/^"|"$/g, "").trim());
    const rows = lines.slice(1).map(line => {
      const vals = []; let cur = "", inQ = false;
      for (let i = 0; i < line.length; i++) {
        if (line[i] === '"') inQ = !inQ;
        else if (line[i] === ',' && !inQ) { vals.push(cur.trim()); cur = ""; }
        else cur += line[i];
      }
      vals.push(cur.trim());
      const obj = {};
      headers.forEach((h, i) => { obj[h] = (vals[i] || "").replace(/^"|"$/g, "").trim(); });
      return obj;
    }).filter(r => Object.values(r).some(v => v));

    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
    return res.status(200).json({ headers, rows });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
