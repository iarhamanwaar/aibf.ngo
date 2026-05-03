#!/usr/bin/env node
// Enriches both Wikidata items with newly-discovered independent sources:
//   - Dawn (Pakistan) 2005-09-14 article documents Dr Anwaar Ahmad Bugvi
//     as "Adviser Health (Technical)" of Punjab government → adds P106
//     (occupation) for physician + civil servant, with both refs.
//   - bhera.org documents an AIBF calligraphy competition (Nov 2025) →
//     added as a supplementary reference on AIBF's P31 claims.
//
// Usage:
//   node --env-file=.env.wikidata scripts/wikidata-enrich-with-sources.mjs

const API = "https://www.wikidata.org/w/api.php";
const USER = process.env.WIKIDATA_USER;
const PASS = process.env.WIKIDATA_PASS;
const QID_AIBF = process.env.WIKIDATA_QID; // Q139622033
const QID_FOUNDER = "Q139622400";

const REF_AIBF = "https://aibf.ngo/about";
const REF_DAWN = "https://www.dawn.com/news/156569";
const REF_BHERA = "https://bhera.org/a-calligraphy-competition-for-the-young-students-was-organised-for-the-first-time-by-the-iftikhar-bugvia-foundation-on-18-november-2025-at-zahoor-auditorium-bhera-see-on-the-website-bhera-org-un/";

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
    headers: { "User-Agent": "aibf.ngo-populator/1.3 (https://aibf.ngo)", Cookie: cookieHeader() },
  };
  if (method === "POST") {
    init.headers["Content-Type"] = "application/x-www-form-urlencoded";
    init.body = new URLSearchParams({ ...params, ...body, format: "json" });
  }
  const res = await fetch(url, init);
  applyCookies(res.headers);
  const j = await res.json();
  if (j.error) throw new Error(`API error: ${JSON.stringify(j.error)}`);
  return j;
}
async function login() {
  const tok = (await api({ action: "query", meta: "tokens", type: "login" })).query.tokens.logintoken;
  const r = await api({ action: "login" }, { method: "POST", body: { lgname: USER, lgpassword: PASS, lgtoken: tok } });
  if (r.login.result !== "Success") throw new Error(JSON.stringify(r.login));
  console.log("✓ Logged in as", r.login.lgusername);
}
const getCsrf = async () => (await api({ action: "query", meta: "tokens", type: "csrf" })).query.tokens.csrftoken;

function refsBlock(urls) {
  return [
    {
      snaks: {
        P854: urls.map((u) => ({ snaktype: "value", property: "P854", datavalue: { value: u, type: "string" }, datatype: "url" })),
      },
      "snaks-order": ["P854"],
    },
  ];
}
function stmt(prop, datavalue, refUrls) {
  return {
    mainsnak: { snaktype: "value", property: prop, datavalue },
    type: "statement",
    rank: "normal",
    references: refsBlock(refUrls),
  };
}
const itemDV = (qid) => ({ value: { "entity-type": "item", "numeric-id": Number(qid.slice(1)), id: qid }, type: "wikibase-entityid" });

(async () => {
  await login();
  const csrf = await getCsrf();

  // ---------- Founder enrichment ----------
  console.log("\n→ Enriching Q139622400 (founder) with Dawn source");
  const founderClaims = {
    P106: [
      stmt("P106", itemDV("Q39631"), [REF_AIBF, REF_DAWN]), // physician
      stmt("P106", itemDV("Q212238"), [REF_DAWN]), // civil servant — government health adviser
    ],
  };
  // Update description to reflect the new info
  const r1 = await api(
    { action: "wbeditentity" },
    {
      method: "POST",
      body: {
        id: QID_FOUNDER,
        data: JSON.stringify({
          descriptions: {
            en: { language: "en", value: "Pakistani physician, government health adviser, and founder of Al-Iftikhar Bugvia Foundation" },
            ur: { language: "ur", value: "پاکستانی معالج، حکومتی صحت مشیر، اور الافتخار بگویا فاؤنڈیشن کے بانی" },
          },
          claims: founderClaims,
        }),
        token: csrf,
        bot: "1",
        summary: "Add P106 (physician + civil servant) + Dawn 2005 source; expand description",
      },
    },
  );
  console.log("  ✓ rev", r1.entity?.lastrevid);

  // ---------- AIBF: add bhera.org as additional reference ----------
  // Strategy: add a fresh P31 claim with bhera.org reference. This won't
  // duplicate (different references), but Wikidata typically deduplicates
  // identical mainsnak+ref combos. Cleanest is to add reference to existing
  // claim. Use wbsetreference for that.
  console.log("\n→ Adding bhera.org reference to existing AIBF P31 charity claim");
  const aibfEntity = (await api({ action: "wbgetentities", ids: QID_AIBF })).entities[QID_AIBF];
  const charityClaim = aibfEntity.claims.P31?.find((c) => c.mainsnak?.datavalue?.value?.id === "Q708676");
  if (charityClaim) {
    const ref = {
      snaks: {
        P854: [{ snaktype: "value", property: "P854", datavalue: { value: REF_BHERA, type: "string" }, datatype: "url" }],
      },
      "snaks-order": ["P854"],
    };
    const r2 = await api(
      { action: "wbsetreference" },
      {
        method: "POST",
        body: {
          statement: charityClaim.id,
          snaks: JSON.stringify(ref.snaks),
          "snaks-order": JSON.stringify(ref["snaks-order"]),
          token: csrf,
          bot: "1",
          summary: "Add bhera.org as additional reference (independent third-party documentation)",
        },
      },
    );
    console.log("  ✓ Added reference to claim", charityClaim.id.slice(0, 30) + "…");
  }

  console.log("\nDone.");
  console.log("  Founder: https://www.wikidata.org/wiki/" + QID_FOUNDER);
  console.log("  AIBF:    https://www.wikidata.org/wiki/" + QID_AIBF);
})().catch((e) => {
  console.error("\n✗ FAILED:", e.message);
  process.exit(1);
});
