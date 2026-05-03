#!/usr/bin/env node
// Populates Wikidata item Q139622033 (Al-Iftikhar Bugvia Foundation)
// with statements, references, and Urdu label/description/aliases.
//
// Usage:
//   node --env-file=.env.wikidata scripts/wikidata-populate.mjs
//
// Requires Node >= 20 (for built-in --env-file flag and global fetch).

const API = "https://www.wikidata.org/w/api.php";
const USER = process.env.WIKIDATA_USER;
const PASS = process.env.WIKIDATA_PASS;
const QID = process.env.WIKIDATA_QID;
const REF_URL = "https://aibf.ngo/about";

if (!USER || !PASS || !QID) {
  console.error("Missing env vars. Run with: node --env-file=.env.wikidata scripts/wikidata-populate.mjs");
  process.exit(1);
}

// ---------------------------------------------------------------------------
// HTTP helpers — keep cookies across requests for session auth
// ---------------------------------------------------------------------------

const cookieJar = new Map();
function applyCookies(headers) {
  const setCookie = headers.getSetCookie?.() ?? [];
  for (const c of setCookie) {
    const [pair] = c.split(";");
    const eq = pair.indexOf("=");
    if (eq > 0) cookieJar.set(pair.slice(0, eq).trim(), pair.slice(eq + 1).trim());
  }
}
function cookieHeader() {
  return [...cookieJar.entries()].map(([k, v]) => `${k}=${v}`).join("; ");
}

async function api(params, { method = "GET", body } = {}) {
  const url = method === "GET" ? `${API}?${new URLSearchParams({ ...params, format: "json" })}` : API;
  const init = {
    method,
    headers: {
      "User-Agent": "aibf.ngo-populator/1.0 (https://aibf.ngo; contact@aibf.ngo)",
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

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

async function login() {
  console.log("→ Fetching login token");
  const tokRes = await api({ action: "query", meta: "tokens", type: "login" });
  const lgtoken = tokRes.query.tokens.logintoken;

  console.log("→ Logging in as", USER);
  const lgRes = await api(
    { action: "login" },
    { method: "POST", body: { lgname: USER, lgpassword: PASS, lgtoken } },
  );
  if (lgRes.login.result !== "Success") {
    throw new Error(`Login failed: ${JSON.stringify(lgRes.login)}`);
  }
  console.log("✓ Logged in as", lgRes.login.lgusername);
}

async function getCsrf() {
  const r = await api({ action: "query", meta: "tokens", type: "csrf" });
  return r.query.tokens.csrftoken;
}

// ---------------------------------------------------------------------------
// Q-ID resolver — searches Wikidata for the canonical entity for a label
// ---------------------------------------------------------------------------

async function resolveQ(search, hint) {
  const r = await api({
    action: "wbsearchentities",
    search,
    language: "en",
    type: "item",
    limit: "5",
  });
  const results = r.search ?? [];
  if (results.length === 0) throw new Error(`No Q-ID found for "${search}"`);
  // Prefer result whose description matches hint (case-insensitive substring)
  const preferred =
    (hint && results.find((x) => x.description?.toLowerCase().includes(hint.toLowerCase()))) ||
    results[0];
  console.log(`  ${search.padEnd(35)} → ${preferred.id}  (${preferred.label}: ${preferred.description ?? "—"})`);
  return preferred.id;
}

// ---------------------------------------------------------------------------
// Statement creation — wbeditentity does it all in one shot, idempotently
// ---------------------------------------------------------------------------

function statement(prop, dataValue, dataType = "wikibase-item") {
  return {
    mainsnak: {
      snaktype: "value",
      property: prop,
      datavalue: { value: dataValue, type: dataType === "wikibase-item" ? "wikibase-entityid" : dataType },
    },
    type: "statement",
    rank: "normal",
    references: [
      {
        snaks: {
          P854: [
            {
              snaktype: "value",
              property: "P854",
              datavalue: { value: REF_URL, type: "string" },
              datatype: "url",
            },
          ],
        },
        "snaks-order": ["P854"],
      },
    ],
  };
}

function itemStatement(prop, qid) {
  return statement(prop, { "entity-type": "item", "numeric-id": Number(qid.slice(1)), id: qid });
}

function stringStatement(prop, str) {
  return statement(prop, str, "string");
}

function urlStatement(prop, url) {
  return statement(prop, url, "string");
}

function timeStatement(prop, time, precision = 9) {
  return statement(
    prop,
    {
      time,
      timezone: 0,
      before: 0,
      after: 0,
      precision,
      calendarmodel: "http://www.wikidata.org/entity/Q1985727",
    },
    "time",
  );
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

(async () => {
  await login();
  const csrf = await getCsrf();
  console.log("✓ Got CSRF token");

  console.log("\n→ Resolving Q-IDs for value entities …");
  const Q = {
    ngo: await resolveQ("non-governmental organization", "organization"),
    charity: await resolveQ("charitable organization", "organization"),
    pakistan: await resolveQ("Pakistan", "country in South Asia"),
    bhera: await resolveQ("Bhera", "Pakistan"),
    healthcare: await resolveQ("health care", "prevention"),
    education: await resolveQ("education", "transmission of knowledge"),
    humanitarian: await resolveQ("humanitarian aid", "material and logistic"),
  };

  // Build the entity payload
  const claims = {
    P31: [itemStatement("P31", Q.ngo), itemStatement("P31", Q.charity)],
    P17: [itemStatement("P17", Q.pakistan)],
    P159: [itemStatement("P159", Q.bhera)],
    P571: [timeStatement("P571", "+1998-00-00T00:00:00Z")],
    P856: [urlStatement("P856", "https://aibf.ngo")],
    P2002: [stringStatement("P2002", "aibf_org")],
    P968: [urlStatement("P968", "mailto:contact@aibf.ngo")],
    P1329: [stringStatement("P1329", "+92-301-6701340")],
    P101: [
      itemStatement("P101", Q.healthcare),
      itemStatement("P101", Q.education),
      itemStatement("P101", Q.humanitarian),
    ],
    P973: [urlStatement("P973", "https://aibf.ngo/about")],
  };

  const data = {
    labels: {
      ur: { language: "ur", value: "الافتخار بگویا فاؤنڈیشن" },
    },
    descriptions: {
      ur: { language: "ur", value: "پاکستان میں خیراتی غیر سرکاری تنظیم" },
    },
    aliases: {
      ur: [
        { language: "ur", value: "AIBF" },
        { language: "ur", value: "بگویا فاؤنڈیشن" },
      ],
    },
    claims,
  };

  console.log("\n→ Submitting wbeditentity for", QID);
  const editRes = await api(
    { action: "wbeditentity" },
    {
      method: "POST",
      body: {
        id: QID,
        data: JSON.stringify(data),
        token: csrf,
        bot: "1",
        summary: "Adding core organisation statements + Urdu label via API (aibf.ngo populator)",
      },
    },
  );

  console.log("\n✓ Edit accepted. Last revision:", editRes.entity?.lastrevid);
  console.log("\nView: https://www.wikidata.org/wiki/" + QID);
})().catch((e) => {
  console.error("\n✗ FAILED:", e.message);
  process.exit(1);
});
