#!/usr/bin/env node
// Audits every wikilink in the 3 articles. Reports which exist, which are
// redirects, and which are redlinks. Does not edit anything — just reports.
//
// Usage:
//   node --env-file=.env.wikidata scripts/wikipedia-audit-links.mjs

const API = "https://en.wikipedia.org/w/api.php";

async function call(params) {
  const url = `${API}?${new URLSearchParams({ ...params, format: "json" })}`;
  const res = await fetch(url, { headers: { "User-Agent": "aibf.ngo-audit/1.0 (https://aibf.ngo)" } });
  return res.json();
}

const ARTICLES = ["Anwaar Ahmed Bugvi", "Bugvi family", "Dar-ul-Uloom Azizia, Bhera"];

function extractLinks(wikitext) {
  // Strip refs first to avoid catching links in citation URLs
  const stripped = wikitext.replace(/<ref[^>]*>[\s\S]*?<\/ref>/g, "").replace(/<ref[^>]*\/>/g, "");
  const links = new Set();
  const re = /\[\[([^|\]\#]+?)(?:#[^|\]]*)?(?:\|[^\]]+)?\]\]/g;
  let m;
  while ((m = re.exec(stripped))) {
    let target = m[1].trim();
    if (target.startsWith(":")) continue; // category/file links
    if (target.startsWith("Category:") || target.startsWith("File:") || target.startsWith("Image:")) continue;
    // Capitalize first letter (Wikipedia normalizes this)
    target = target[0].toUpperCase() + target.slice(1);
    links.add(target);
  }
  return [...links];
}

async function checkBatch(titles) {
  // Batch query: up to 50 at a time, ask for redirects
  const r = await call({
    action: "query",
    titles: titles.join("|"),
    redirects: "1",
  });
  const result = {};
  // Initialize all as missing
  for (const t of titles) result[t] = { status: "redlink" };
  // Apply redirects (original → final)
  const redirects = {};
  for (const rd of r.query?.redirects ?? []) redirects[rd.from] = rd.to;
  // Apply normalizations
  const normalizations = {};
  for (const n of r.query?.normalized ?? []) normalizations[n.from] = n.to;
  // Apply page status
  for (const page of Object.values(r.query?.pages ?? {})) {
    const finalTitle = page.title;
    // Find which of our input titles maps to this
    for (const t of titles) {
      let resolved = normalizations[t] ?? t;
      resolved = redirects[resolved] ?? resolved;
      if (resolved === finalTitle) {
        if (page.missing !== undefined) result[t].status = "redlink";
        else result[t] = {
          status: redirects[normalizations[t] ?? t] ? "redirect" : "exists",
          target: finalTitle,
          ...(redirects[normalizations[t] ?? t] && { redirected_to: finalTitle }),
        };
      }
    }
  }
  return result;
}

(async () => {
  for (const title of ARTICLES) {
    console.log(`\n========== ${title} ==========`);
    const page = await call({ action: "query", prop: "revisions", rvprop: "content", rvslots: "main", titles: title });
    const wikitext = Object.values(page.query.pages)[0]?.revisions?.[0]?.slots?.main?.["*"];
    if (!wikitext) { console.log("  ✗ couldn't fetch"); continue; }
    const links = extractLinks(wikitext);
    console.log(`  ${links.length} unique wikilinks`);

    // Batch in groups of 50
    const results = {};
    for (let i = 0; i < links.length; i += 50) {
      Object.assign(results, await checkBatch(links.slice(i, i + 50)));
    }

    const redlinks = [];
    const redirects = [];
    const exists = [];
    for (const [link, info] of Object.entries(results)) {
      if (info.status === "redlink") redlinks.push(link);
      else if (info.status === "redirect") redirects.push(`${link} → ${info.redirected_to}`);
      else exists.push(link);
    }
    console.log(`  ✓ ${exists.length} exist  |  → ${redirects.length} redirects  |  ✗ ${redlinks.length} redlinks`);
    if (redirects.length) {
      console.log("  Redirects:");
      for (const r of redirects) console.log("    " + r);
    }
    if (redlinks.length) {
      console.log("  REDLINKS:");
      for (const r of redlinks) console.log("    [[" + r + "]]");
    }
  }
})().catch((e) => { console.error("\n✗", e.message); process.exit(1); });
