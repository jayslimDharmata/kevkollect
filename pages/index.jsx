import { useState, useEffect, useRef } from "react";
import Head from "next/head";

const METS = "data:image/png;base64,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";

const DODGER_BLUE  = "#005A9C";
const DODGER_DARK  = "#003f7a";
const DODGER_LIGHT = "#e8f0f8";
const DODGER_MID   = "#c5d8ee";
const WHITE        = "#ffffff";
const CREAM        = "#f7fafd";
const TEXT_DARK    = "#0d1f35";
const TEXT_MID     = "#3a5a7a";
const TEXT_DIM     = "#7a9ab8";
const BORDER       = "#ccdcee";
const GOLD         = "#ffd166";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Source+Sans+3:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${CREAM}; color: ${TEXT_DARK}; font-family: 'Source Sans 3', sans-serif; }
  .app { min-height: 100vh; background: ${CREAM}; }
  .header { background: ${DODGER_BLUE}; border-bottom: 3px solid ${DODGER_DARK}; padding: 0 24px; display: flex; align-items: center; justify-content: center; min-height: 80px; box-shadow: 0 3px 16px rgba(0,63,122,0.25); position: sticky; top: 0; z-index: 100; gap: 16px; }
  .header-logo { width: 48px; height: 48px; object-fit: contain; filter: drop-shadow(0 2px 6px rgba(0,0,0,0.3)); flex-shrink: 0; }
  .header-title { text-align: center; }
  .header-eyebrow { font-family: 'Playfair Display', serif; font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.65); letter-spacing: 3px; text-transform: uppercase; }
  .header-name { font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 900; color: ${GOLD}; letter-spacing: 3px; line-height: 1; }
  .tabs { display: flex; padding: 0 24px; background: ${WHITE}; border-bottom: 2px solid ${BORDER}; }
  .tab { padding: 14px 22px; font-size: 14px; font-weight: 500; color: ${TEXT_DIM}; background: none; border: none; cursor: pointer; border-bottom: 3px solid transparent; margin-bottom: -2px; transition: all 0.18s; font-family: 'Source Sans 3', sans-serif; }
  .tab:hover { color: ${DODGER_BLUE}; }
  .tab.active { color: ${DODGER_BLUE}; border-bottom-color: ${DODGER_BLUE}; font-weight: 600; }
  .main { padding: 28px; max-width: 1100px; margin: 0 auto; }
  .coll-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; flex-wrap: wrap; gap: 10px; }
  .coll-title { font-family: 'Playfair Display', serif; font-size: 26px; font-weight: 700; color: ${TEXT_DARK}; }
  .badge { font-family: 'DM Mono', monospace; font-size: 12px; color: ${DODGER_BLUE}; background: ${DODGER_LIGHT}; border: 1px solid ${DODGER_MID}; padding: 4px 14px; border-radius: 20px; }
  .badge-live { color: #1a7a40; background: #f0fff4; border-color: #a8e6c0; }
  .search { width: 100%; background: ${WHITE}; border: 1.5px solid ${BORDER}; border-radius: 8px; padding: 10px 16px; color: ${TEXT_DARK}; font-family: 'Source Sans 3', sans-serif; font-size: 14px; outline: none; transition: border-color 0.2s; }
  .search::placeholder { color: ${TEXT_DIM}; }
  .search:focus { border-color: ${DODGER_BLUE}; box-shadow: 0 0 0 3px rgba(0,90,156,0.1); }
  .sel { padding: 10px 14px; border-radius: 8px; border: 1.5px solid ${BORDER}; background: ${WHITE}; color: ${TEXT_DARK}; font-family: 'Source Sans 3', sans-serif; font-size: 14px; outline: none; cursor: pointer; flex-shrink: 0; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(272px, 1fr)); gap: 14px; }
  .card { background: ${WHITE}; border: 1.5px solid ${BORDER}; border-radius: 12px; padding: 16px; cursor: pointer; transition: all 0.18s; position: relative; overflow: hidden; box-shadow: 0 1px 6px rgba(0,90,156,0.06); }
  .card::after { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: ${DODGER_BLUE}; opacity: 0; transition: opacity 0.18s; border-radius: 12px 0 0 12px; }
  .card:hover { border-color: ${DODGER_BLUE}; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,90,156,0.14); }
  .card:hover::after { opacity: 1; }
  .card-year { font-family: 'DM Mono', monospace; font-size: 10px; color: ${DODGER_BLUE}; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 4px; }
  .card-name { font-family: 'Playfair Display', serif; font-size: 17px; font-weight: 700; color: ${TEXT_DARK}; margin-bottom: 2px; line-height: 1.2; }
  .card-set { font-size: 12px; color: ${TEXT_MID}; margin-bottom: 8px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .card-comp { font-family: 'DM Mono', monospace; font-size: 13px; color: #1a7a40; font-weight: 600; margin-bottom: 8px; }
  .tags { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px; }
  .tag { font-family: 'DM Mono', monospace; font-size: 10px; padding: 2px 8px; border-radius: 4px; font-weight: 500; }
  .tag-grade    { background: #fff8e1; color: #996600; border: 1px solid #f0d060; }
  .tag-parallel { background: ${DODGER_LIGHT}; color: ${DODGER_DARK}; border: 1px solid ${DODGER_MID}; }
  .tag-insert   { background: #f8f0ff; color: #6b21a8; border: 1px solid #d8b4fe; }
  .tag-rookie   { background: #fff0f0; color: #c0392b; border: 1px solid #f5b8b8; }
  .tag-auto     { background: #e8f8e8; color: #1a6b3a; border: 1px solid #a8ddb8; }
  .tag-relic    { background: #fef3e8; color: #b05a00; border: 1px solid #f5c895; }
  .card-btns { display: flex; gap: 8px; margin-top: 10px; }
  .btn-sm { flex: 1; padding: 7px 10px; border-radius: 7px; font-size: 11px; font-weight: 600; cursor: pointer; border: 1.5px solid; transition: all 0.15s; font-family: 'Source Sans 3', sans-serif; }
  .btn-blue-sm { background: ${DODGER_LIGHT}; border-color: ${DODGER_MID}; color: ${DODGER_BLUE}; }
  .btn-blue-sm:hover { background: ${DODGER_MID}; }
  .btn-grey-sm { background: ${WHITE}; border-color: ${BORDER}; color: ${TEXT_MID}; }
  .btn-grey-sm:hover { background: ${DODGER_LIGHT}; color: ${DODGER_BLUE}; }
  .overlay { position: fixed; inset: 0; background: rgba(10,30,55,0.55); backdrop-filter: blur(4px); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 20px; }
  .modal { background: ${WHITE}; border: 1.5px solid ${BORDER}; border-radius: 16px; padding: 28px; max-width: 520px; width: 100%; max-height: 85vh; overflow-y: auto; position: relative; box-shadow: 0 20px 60px rgba(0,63,122,0.2); }
  .modal-stripe { position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, ${DODGER_BLUE}, #EF3E42); border-radius: 16px 16px 0 0; }
  .modal-close { position: absolute; top: 14px; right: 14px; background: ${DODGER_LIGHT}; border: 1px solid ${BORDER}; color: ${TEXT_MID}; cursor: pointer; font-size: 16px; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border-radius: 6px; }
  .modal-close:hover { background: ${DODGER_MID}; }
  .modal-year { font-family: 'DM Mono', monospace; font-size: 11px; color: ${DODGER_BLUE}; letter-spacing: 1.5px; margin-bottom: 4px; margin-top: 8px; }
  .modal-name { font-family: 'Playfair Display', serif; font-size: 26px; font-weight: 900; color: ${TEXT_DARK}; margin-bottom: 2px; }
  .modal-set { font-size: 13px; color: ${TEXT_MID}; margin-bottom: 12px; }
  .divider { height: 1px; background: ${BORDER}; margin: 14px 0; }
  .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px; }
  .detail-field label { font-size: 10px; color: ${TEXT_DIM}; letter-spacing: 1px; text-transform: uppercase; display: block; margin-bottom: 2px; }
  .detail-field span { font-family: 'DM Mono', monospace; font-size: 13px; color: ${TEXT_DARK}; font-weight: 500; }
  .modal-btns { display: flex; gap: 10px; flex-wrap: wrap; }
  .btn { padding: 9px 16px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; border: 1.5px solid; font-family: 'Source Sans 3', sans-serif; transition: all 0.15s; }
  .btn-blue { background: ${DODGER_BLUE}; border-color: ${DODGER_DARK}; color: ${WHITE}; }
  .btn-blue:hover { background: ${DODGER_DARK}; }
  .btn-outline { background: ${WHITE}; border-color: ${BORDER}; color: ${TEXT_MID}; }
  .btn-outline:hover { background: ${DODGER_LIGHT}; color: ${DODGER_BLUE}; }
  .btn-green { background: #f0fff4; border-color: #a8e6c0; color: #1a7a40; }
  .btn-green:hover { background: #d4f5e2; }
  .btn-green:disabled { opacity: 0.4; cursor: not-allowed; }
  .listing-box { background: ${CREAM}; border: 1.5px solid ${BORDER}; border-radius: 8px; padding: 14px; font-family: 'DM Mono', monospace; font-size: 12px; color: ${TEXT_MID}; line-height: 1.65; white-space: pre-wrap; margin-top: 14px; max-height: 240px; overflow-y: auto; }
  .copy-btn { margin-top: 8px; padding: 6px 14px; font-size: 11px; border-radius: 5px; background: ${DODGER_LIGHT}; border: 1px solid ${DODGER_MID}; color: ${DODGER_BLUE}; cursor: pointer; font-family: 'Source Sans 3', sans-serif; font-weight: 600; }
  .copy-btn:hover { background: ${DODGER_MID}; }
  .ebay-wrap { max-width: 580px; }
  .section-title { font-family: 'Playfair Display', serif; font-size: 26px; font-weight: 700; color: ${TEXT_DARK}; margin-bottom: 6px; }
  .section-sub { font-size: 14px; color: ${TEXT_MID}; margin-bottom: 26px; line-height: 1.55; }
  .field-group { margin-bottom: 16px; }
  .field-label { font-size: 11px; color: ${TEXT_DIM}; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 6px; display: block; font-weight: 600; }
  .field-input { width: 100%; background: ${WHITE}; border: 1.5px solid ${BORDER}; border-radius: 8px; padding: 10px 14px; color: ${TEXT_DARK}; font-family: 'Source Sans 3', sans-serif; font-size: 14px; outline: none; }
  .field-input:focus { border-color: ${DODGER_BLUE}; box-shadow: 0 0 0 3px rgba(0,90,156,0.1); }
  .field-input::placeholder { color: ${TEXT_DIM}; }
  .ebay-btns { display: flex; gap: 12px; margin-top: 20px; }
  .btn-sold { flex: 1; padding: 13px; border-radius: 8px; background: ${DODGER_BLUE}; border: none; color: ${WHITE}; font-size: 14px; font-weight: 600; cursor: pointer; font-family: 'Source Sans 3', sans-serif; }
  .btn-sold:hover { background: ${DODGER_DARK}; }
  .btn-active { flex: 1; padding: 13px; border-radius: 8px; background: ${WHITE}; border: 1.5px solid ${BORDER}; color: ${TEXT_MID}; font-size: 14px; font-weight: 600; cursor: pointer; font-family: 'Source Sans 3', sans-serif; }
  .btn-active:hover { background: ${DODGER_LIGHT}; color: ${DODGER_BLUE}; }
  .ebay-hint { font-size: 12px; color: ${TEXT_DIM}; margin-top: 12px; line-height: 1.55; }
  .empty { text-align: center; padding: 60px 20px; color: ${TEXT_DIM}; font-size: 14px; }
  .spinner { width: 36px; height: 36px; border: 3px solid ${DODGER_MID}; border-top-color: ${DODGER_BLUE}; border-radius: 50%; animation: spin 0.8s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .loading { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 80px 20px; gap: 16px; }
  .loading-text { font-family: 'DM Mono', monospace; font-size: 12px; color: ${TEXT_DIM}; letter-spacing: 1px; }
  .dot { width: 6px; height: 6px; border-radius: 50%; background: ${DODGER_BLUE}; opacity: 0.3; animation: pulse 1.2s ease-in-out infinite; }
  .dot:nth-child(2) { animation-delay: 0.2s; }
  .dot:nth-child(3) { animation-delay: 0.4s; }
  @keyframes pulse { 0%,100%{opacity:0.2;transform:scale(0.85)} 50%{opacity:1;transform:scale(1)} }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: ${DODGER_MID}; border-radius: 3px; }
`;

function buildEbayUrl(card, soldOnly) {
  const parts = ["Shohei Ohtani", card.Year, card.Set, card.Insert, card.Parallel, card.Graded]
    .map(s => String(s || "").trim()).filter(Boolean);
  const q = encodeURIComponent(parts.join(" "));
  return soldOnly
    ? `https://www.ebay.com/sch/i.html?_nkw=${q}&LH_Sold=1&LH_Complete=1&_sop=13`
    : `https://www.ebay.com/sch/i.html?_nkw=${q}&_sop=15`;
}

function buildEbayUrlGeneric(card, soldOnly) {
  const parts = [card.Name, card.Year, card.Set, card.Insert, card.Parallel, card.Graded]
    .map(s => String(s || "").trim()).filter(Boolean);
  const q = encodeURIComponent(parts.join(" "));
  return soldOnly
    ? `https://www.ebay.com/sch/i.html?_nkw=${q}&LH_Sold=1&LH_Complete=1&_sop=13`
    : `https://www.ebay.com/sch/i.html?_nkw=${q}&_sop=15`;
}

function getTags(card, includeRookie = false) {
  const tags = [];
  if (card.Graded && card.Graded.trim()) tags.push({ label: card.Graded.trim(), type: "grade" });
  if (includeRookie && String(card.Rookie || "").toUpperCase() === "Y") tags.push({ label: "RC", type: "rookie" });
  if (String(card.Auto || "").toUpperCase() === "Y") tags.push({ label: "AUTO", type: "auto" });
  if (String(card["Patch/Relic"] || "").toUpperCase() === "Y") tags.push({ label: "RELIC", type: "relic" });
  if (card.Parallel && card.Parallel.trim()) tags.push({ label: card.Parallel.trim(), type: "parallel" });
  if (card.Insert && card.Insert.trim()) tags.push({ label: card.Insert.trim(), type: "insert" });
  return tags;
}

async function callClaude(messages, system) {
  const res = await fetch("/api/claude", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system, messages }),
  });
  const d = await res.json();
  return d.content?.[0]?.text || "Something went wrong.";
}

function Modal({ card, onClose, ebayUrlFn }) {
  const [listing, setListing] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const tags = getTags(card, true);

  async function genListing() {
    setLoading(true); setListing("");
    const desc = Object.entries(card).filter(([, v]) => v && v.trim()).map(([k, v]) => `${k}: ${v}`).join(", ");
    const txt = await callClaude(
      [{ role: "user", content: `Write an eBay listing for this baseball card: ${desc}. Format as TITLE: (max 80 chars)\n\nDESCRIPTION: (3-4 sentences)` }],
      "You are an expert sports card seller. Be concise and accurate."
    );
    setListing(txt); setLoading(false);
  }

  return (
    <div className="overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-stripe" />
        <button className="modal-close" onClick={onClose}>✕</button>
        {card.Year && <div className="modal-year">{card.Year}</div>}
        <div className="modal-name">{card.Name}</div>
        <div className="modal-set">{card.Set}</div>
        {tags.length > 0 && <div className="tags" style={{ marginBottom: 12 }}>{tags.map((t, i) => <span key={i} className={`tag tag-${t.type}`}>{t.label}</span>)}</div>}
        <div className="divider" />
        <div className="detail-grid">
          {[["Number", card.Number], ["Insert", card.Insert], ["Parallel", card.Parallel], ["Graded", card.Graded], ["Auto", card.Auto === "Y" ? "Yes" : null], ["Patch/Relic", card["Patch/Relic"] === "Y" ? "Yes" : null], ["Rookie", card.Rookie === "Y" ? "Yes" : null], ["Comp", card.Comp], ["Comp Date", card["Comp Date"]]].filter(([, v]) => v && v.trim()).map(([k, v]) => (
            <div className="detail-field" key={k}><label>{k}</label><span>{v}</span></div>
          ))}
        </div>
        <div className="divider" />
        <div className="modal-btns">
          <button className="btn btn-blue" onClick={() => window.open(ebayUrlFn(card, true), "_blank")}>📊 Sold Comps</button>
          <button className="btn btn-outline" onClick={() => window.open(ebayUrlFn(card, false), "_blank")}>🛒 Active Listings</button>
          <button className="btn btn-green" onClick={genListing} disabled={loading}>{loading ? "Writing..." : "✍️ Generate Listing"}</button>
        </div>
        {listing && (
          <>
            <div className="listing-box">{listing}</div>
            <button className="copy-btn" onClick={() => { navigator.clipboard.writeText(listing); setCopied(true); setTimeout(() => setCopied(false), 2000); }}>{copied ? "✓ Copied!" : "Copy"}</button>
          </>
        )}
      </div>
    </div>
  );
}

function CollectionGrid({ cards, isLive, title, ebayUrlFn, includeRookie }) {
  const [search, setSearch] = useState("");
  const [sel, setSel] = useState(null);
  const [sort, setSort] = useState("default");
  const [filter, setFilter] = useState("all");

  const parseComp = v => parseFloat((v || "").replace(/[^0-9.]/g, "")) || 0;
  const parseYear = v => parseInt(v || "0") || 0;
  const allSets = [...new Set(cards.map(c => c.Set).filter(Boolean))].sort();

  const filtered = cards
    .filter(c => !search || Object.values(c).some(v => String(v).toLowerCase().includes(search.toLowerCase())))
    .filter(c => {
      if (filter === "all") return true;
      if (filter === "graded") return c.Graded && c.Graded.trim();
      if (filter === "auto") return String(c.Auto || "").toUpperCase() === "Y";
      if (filter === "relic") return String(c["Patch/Relic"] || "").toUpperCase() === "Y";
      if (filter === "parallel") return c.Parallel && c.Parallel.trim();
      if (filter === "insert") return c.Insert && c.Insert.trim();
      if (filter === "rookie") return String(c.Rookie || "").toUpperCase() === "Y";
      if (filter === "base") return !c.Graded?.trim() && !c.Parallel?.trim() && !c.Insert?.trim();
      return c.Set === filter;
    })
    .slice()
    .sort((a, b) => {
      if (sort === "comp-desc") return parseComp(b.Comp) - parseComp(a.Comp);
      if (sort === "comp-asc") return parseComp(a.Comp) - parseComp(b.Comp);
      if (sort === "year-desc") return parseYear(b.Year) - parseYear(a.Year);
      if (sort === "year-asc") return parseYear(a.Year) - parseYear(b.Year);
      if (sort === "set") return (a.Set || "").localeCompare(b.Set || "");
      return 0;
    });

  const totalValue = filtered.reduce((sum, c) => sum + parseComp(c.Comp), 0);
  const totalDisplay = totalValue > 0 ? `$${totalValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : null;

  return (
    <div>
      <div className="coll-header">
        <div className="coll-title">{title}</div>
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <span className={`badge ${isLive ? "badge-live" : ""}`}>{isLive ? "● Live" : `${cards.length} cards`}</span>
          {isLive && <span className="badge">{filtered.length} of {cards.length} cards</span>}
          {totalDisplay && <span className="badge" style={{ color: "#1a7a40", background: "#f0fff4", borderColor: "#a8e6c0" }}>Total: {totalDisplay}</span>}
        </div>
      </div>
      <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
        <input className="search" style={{ margin: 0, flex: "1 1 180px" }} placeholder="Search by year, set, player, grade..." value={search} onChange={e => setSearch(e.target.value)} />
        <select className="sel" value={sort} onChange={e => setSort(e.target.value)}>
          <option value="default">Sort: Default</option>
          <option value="comp-desc">Value: High to Low</option>
          <option value="comp-asc">Value: Low to High</option>
          <option value="year-desc">Year: Newest First</option>
          <option value="year-asc">Year: Oldest First</option>
          <option value="set">Sort by Set</option>
        </select>
        <select className="sel" value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="all">Filter: All Cards</option>
          <option value="graded">Graded Only</option>
          <option value="auto">Autos Only</option>
          <option value="relic">Patch/Relic Only</option>
          <option value="parallel">Parallels Only</option>
          <option value="insert">Inserts Only</option>
          {includeRookie && <option value="rookie">Rookies Only</option>}
          <option value="base">Base Cards Only</option>
          <optgroup label="By Set">
            {allSets.map(s => <option key={s} value={s}>{s}</option>)}
          </optgroup>
        </select>
      </div>
      {filtered.length === 0 ? <div className="empty">No cards match.</div> : (
        <div className="grid">
          {filtered.map((card, i) => {
            const tags = getTags(card, includeRookie);
            return (
              <div className="card" key={i} onClick={() => setSel(card)}>
                {card.Year && <div className="card-year">{card.Year}</div>}
                <div className="card-name">{card.Name}</div>
                <div className="card-set">{card.Set}{card.Insert ? ` · ${card.Insert}` : ""}</div>
                {card.Comp && <div className="card-comp">{card.Comp}</div>}
                {tags.length > 0 && <div className="tags">{tags.map((t, j) => <span key={j} className={`tag tag-${t.type}`}>{t.label}</span>)}</div>}
                <div className="card-btns" onClick={e => e.stopPropagation()}>
                  <button className="btn-sm btn-blue-sm" onClick={() => window.open(ebayUrlFn(card, true), "_blank")}>📊 Sold Comps</button>
                  <button className="btn-sm btn-grey-sm" onClick={() => setSel(card)}>Details →</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {sel && <Modal card={sel} onClose={() => setSel(null)} ebayUrlFn={ebayUrlFn} />}
    </div>
  );
}

function useSheetData(tab) {
  const [cards, setCards] = useState([]);
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/sheet?tab=${tab}`);
        const data = await res.json();
        if (data.rows && data.rows.length > 0) {
          setCards(data.rows);
          setIsLive(true);
        }
      } catch (e) {
        console.error("Sheet fetch failed:", e);
      }
      setLoading(false);
    })();
  }, [tab]);

  return { cards, isLive, loading };
}

function PCTab() {
  const { cards, isLive, loading } = useSheetData("PC");

  if (loading) return (
    <div className="loading">
      <div className="spinner" />
      <div className="loading-text">LOADING YOUR COLLECTION...</div>
    </div>
  );

  if (!cards.length) return (
    <div style={{ maxWidth: 600, margin: "60px auto", textAlign: "center", padding: "0 20px" }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>📋</div>
      <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 700, color: TEXT_DARK, marginBottom: 10 }}>Personal Collection</div>
      <div style={{ fontSize: 15, color: TEXT_MID, lineHeight: 1.7, marginBottom: 28 }}>
        Your full personal collection will live here.<br />
        Add cards to the <strong>PC</strong> tab in your Google Sheet and they'll appear here automatically.
      </div>
      <div style={{ background: DODGER_LIGHT, border: `1.5px solid ${DODGER_MID}`, borderRadius: 12, padding: "20px 24px", textAlign: "left" }}>
        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: DODGER_BLUE, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>Columns</div>
        {["Year", "Set", "Name", "Insert", "Parallel", "Number", "Graded", "Comp", "Comp Date", "Rookie (Y/N)"].map(col => (
          <div key={col} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", borderBottom: `1px solid ${BORDER}`, fontSize: 13, color: TEXT_MID, fontFamily: "'DM Mono',monospace" }}>
            <span style={{ color: DODGER_BLUE }}>—</span> {col}
          </div>
        ))}
      </div>
    </div>
  );

  return <CollectionGrid cards={cards} isLive={isLive} title="My Collection" ebayUrlFn={buildEbayUrlGeneric} includeRookie={true} />;
}

function OhtaniTab() {
  const { cards, isLive, loading } = useSheetData("Ohtani");

  if (loading) return (
    <div className="loading">
      <div className="spinner" />
      <div className="loading-text">LOADING OHTANI COLLECTION...</div>
    </div>
  );

  return <CollectionGrid cards={cards} isLive={isLive} title="Book of Ohtani" ebayUrlFn={buildEbayUrl} includeRookie={false} />;
}

function EbayTab() {
  const [title, setTitle] = useState("");
  const [kw, setKw] = useState("");
  function go(sold) {
    const q = encodeURIComponent([title, kw].map(s => s.trim()).filter(Boolean).join(" "));
    window.open(sold
      ? `https://www.ebay.com/sch/i.html?_nkw=${q}&LH_Sold=1&LH_Complete=1&_sop=13`
      : `https://www.ebay.com/sch/i.html?_nkw=${q}&_sop=15`, "_blank");
  }
  return (
    <div className="ebay-wrap">
      <div className="section-title">eBay Market Search</div>
      <div className="section-sub">Search sold comps or active listings for any card. Opens in a new tab — log into eBay first to see sold prices.</div>
      <div className="field-group"><label className="field-label">Player / Card Title</label><input className="field-input" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Shohei Ohtani 2018 Topps Chrome" /></div>
      <div className="field-group"><label className="field-label">Extra Keywords</label><input className="field-input" value={kw} onChange={e => setKw(e.target.value)} placeholder="e.g. PSA 10, refractor, rookie, /99" /></div>
      <div className="ebay-btns">
        <button className="btn-sold" onClick={() => go(true)}>📊 Sold Comps</button>
        <button className="btn-active" onClick={() => go(false)}>🛒 Active Listings</button>
      </div>
      <div className="ebay-hint">Sold comps = what cards actually sold for (login required) · Active = what sellers are asking</div>
    </div>
  );
}

export default function KevKollect() {
  const [tab, setTab] = useState("pc");
  return (
    <>
      <Head>
        <title>KevKollect</title>
        <meta name="description" content="Personal baseball card collection manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="app">
        <style>{css}</style>
        <div className="header">
          <img src={METS} className="header-logo" alt="NY Mets" />
          <div className="header-title">
            <div className="header-eyebrow">Welcome to</div>
            <div className="header-name">KevKollect</div>
          </div>
          <img src={METS} className="header-logo" alt="NY Mets" />
        </div>
        <div className="tabs">
          {[{ id: "pc", label: "🗂 My Collection" }, { id: "ohtani", label: "⚾ Book of Ohtani" }, { id: "ebay", label: "🔍 eBay Search" }].map(t => (
            <button key={t.id} className={`tab ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)}>{t.label}</button>
          ))}
        </div>
        <div className="main">
          {tab === "pc" && <PCTab />}
          {tab === "ohtani" && <OhtaniTab />}
          {tab === "ebay" && <EbayTab />}
        </div>
      </div>
    </>
  );
}
