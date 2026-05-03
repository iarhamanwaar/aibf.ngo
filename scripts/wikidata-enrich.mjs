#!/usr/bin/env node
// Second-pass enrichment of Q139622033:
//   - Removes the wrong P2002 (X/Twitter) claim
//   - Adds P2003 (Instagram), P1813 (short name), P1448 (official name),
//     P407 (language of work or name), P2541 (operating area),
//     P625 (coordinate location for Bhera HQ)
// All new claims carry https://aibf.ngo/about as a reference.
//
// Usage:
//   node --env-file=.env.wikidata scripts/wikidata-enrich.mjs

const API = "https://www.wikidata.org/w/api.php";
const USER = process.env.WIKIDATA_USER;
const PASS = process.env.WIKIDATA_PASS;
const QID = process.env.WIKIDATA_QID;
const REF_URL = "https://aibf.ngo/about";

if (!USER || !PASS || !QID) {
  console.error("Missing env vars. Run with: node --env-file=.env.wikidata scripts/wikidata-enrich.mjs");
  process.exit(1);
}

// ---------- HTTP / cookie jar ----------
const cookieJar = new Map();
function applyCookies(headers) {
  for (const c of headers.getSetCookie?.() ?? []) {
    const [pair] = c.split(";");
    const eq = pair.indexOf("=");
    if (eq > 0) cookieJar.set(pair.slice(0, eq).trim(), pair.slice(eq + 1).trim());
  }
}
const cookieHeader = () => [...cookieJar.entries()].map(([k, v]) => `${k}=${v}`).join("; ");

async function api(params, { method = "GET", body } = {}) {
  const url = method === "GET" ? `${API}?${new URLSearchParams({ ...params, format: "json" })}` : API;
  const init = {
    method,
    headers: {
      "User-Agent": "aibf.ngo-populator/1.1 (https://aibf.ngo; contact@aibf.ngo)",
      Cookie: cookieHeader(),
    },
  };
  if (method === "POST") {
    init.headers["Content-Type"] = "application/x-www-form-urlencoded";
    init.body = new URLSearchParams({ ...params, ...body, format: "json" });
  }
  const res = await fetch(url, init);
  applyCookies(res.headers);
  const json = await res.json();
  if (json.error) throw new Error(`API error: ${JSON.stringify(json.error)}`);
  return json;
}

// ---------- Auth ----------
async function login() {
  console.log("→ Login");
  const tok = (await api({ action: "query", meta: "tokens", type: "login" })).query.tokens.logintoken;
  const r = await api({ action: "login" }, { method: "POST", body: { lgname: USER, lgpassword: PASS, lgtoken: tok } });
  if (r.login.result !== "Success") throw new Error(`Login failed: ${JSON.stringify(r.login)}`);
  console.log("✓ Logged in as", r.login.lgusername);
}
const getCsrf = async () => (await api({ action: "query", meta: "tokens", type: "csrf" })).query.tokens.csrftoken;

// ---------- Resolve Q-IDs ----------
async function resolveQ(search, hint) {
  const r = await api({ action: "wbsearchentities", search, language: "en", type: "item", limit: "5" });
  const list = r.search ?? [];
  if (list.length === 0) throw new Error(`No Q-ID for "${search}"`);
  const pick = (hint && list.find((x) => x.description?.toLowerCase().includes(hint.toLowerCase()))) || list[0];
  console.log(`  ${search.padEnd(35)} → ${pick.id}  (${pick.label}: ${pick.description ?? "—"})`);
  return pick.id;
}

// ---------- Snak builders ----------
const refs = [
  {
    snaks: { P854: [{ snaktype: "value", property: "P854", datavalue: { value: REF_URL, type: "string" }, datatype: "url" }] },
    "snaks-order": ["P854"],
  },
];

function stmt(prop, datavalue) {
  return {
    mainsnak: { snaktype: "value", property: prop, datavalue },
    type: "statement",
    rank: "normal",
    references: refs,
  };
}
const itemDV = (qid) => ({ value: { "entity-type": "item", "numeric-id": Number(qid.slice(1)), id: qid }, type: "wikibase-entityid" });
const stringDV = (s) => ({ value: s, type: "string" });
const monoDV = (text, lang) => ({ value: { text, language: lang }, type: "monolingualtext" });
const coordDV = (lat, lon, precision = 0.001) => ({
  value: { latitude: lat, longitude: lon, altitude: null, precision, globe: "http://www.wikidata.org/entity/Q2" },
  type: "globecoordinate",
});

// ---------- Main ----------
(async () => {
  await login();
  const csrf = await getCsrf();

  console.log("\n→ Fetching current entity to find P2002 claim id");
  const entity = (await api({ action: "wbgetentities", ids: QID })).entities[QID];
  const wrongClaim = entity.claims?.P2002?.[0];
  if (wrongClaim) {
    console.log("  Found P2002 claim", wrongClaim.id, "— will remove");
  } else {
    console.log("  (no P2002 claim found — skipping removal)");
  }

  console.log("\n→ Resolving Q-IDs for new statements …");
  const Q = {
    urdu: await resolveQ("Urdu", "language"),
    english: await resolveQ("English", "West Germanic"),
    punjab: await resolveQ("Punjab Pakistan", "province"),
  };

  const claims = {
    P2003: [stmt("P2003", stringDV("aibf_org"))],
    P1813: [stmt("P1813", monoDV("AIBF", "en"))],
    P1448: [
      stmt("P1448", monoDV("Al-Iftikhar Bugvia Foundation", "en")),
      stmt("P1448", monoDV("الافتخار بگویا فاؤنڈیشن", "ur")),
    ],
    P407: [stmt("P407", itemDV(Q.urdu)), stmt("P407", itemDV(Q.english))],
    P2541: [stmt("P2541", itemDV(Q.punjab))],
    P625: [stmt("P625", coordDV(32.4833, 72.9167, 0.001))],
  };

  if (wrongClaim) {
    claims.P2002 = [{ id: wrongClaim.id, remove: "" }];
  }

  console.log("\n→ Submitting wbeditentity");
  const r = await api(
    { action: "wbeditentity" },
    {
      method: "POST",
      body: {
        id: QID,
        data: JSON.stringify({ claims }),
        token: csrf,
        bot: "1",
        summary: "Enrichment: fix Twitter→Instagram property, add short/official names, languages, operating area, coordinates (aibf.ngo)",
      },
    },
  );
  console.log("\n✓ Edit accepted. Last revision:", r.entity?.lastrevid);
  console.log("\nView: https://www.wikidata.org/wiki/" + QID);
})().catch((e) => {
  console.error("\n✗ FAILED:", e.message);
  process.exit(1);
});
