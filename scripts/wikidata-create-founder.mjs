#!/usr/bin/env node
// Creates a Wikidata item for Dr Anwaar Ahmed Bugvi (founder of AIBF) and
// links it from Q139622033 via P112 (founded by).
//
// Conservative claims only — what's directly verifiable from aibf.ngo:
//   P31 instance of: human (Q5)
//   P27 country of citizenship: Pakistan (Q843)
//   P1559 name in native language: ڈاکٹر انوار احمد بگوی (ur)
//   Founder relationship is added on the AIBF item, not duplicated here.
//
// Then on Q139622033, adds P112 (founded by) → new Q-item, with reference.
//
// Usage:
//   node --env-file=.env.wikidata scripts/wikidata-create-founder.mjs

const API = "https://www.wikidata.org/w/api.php";
const USER = process.env.WIKIDATA_USER;
const PASS = process.env.WIKIDATA_PASS;
const QID = process.env.WIKIDATA_QID;
const REF_URL = "https://aibf.ngo/about";

if (!USER || !PASS || !QID) {
  console.error("Missing env vars");
  process.exit(1);
}

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
      "User-Agent": "aibf.ngo-populator/1.2 (https://aibf.ngo; contact@aibf.ngo)",
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

async function login() {
  const tok = (await api({ action: "query", meta: "tokens", type: "login" })).query.tokens.logintoken;
  const r = await api({ action: "login" }, { method: "POST", body: { lgname: USER, lgpassword: PASS, lgtoken: tok } });
  if (r.login.result !== "Success") throw new Error(`Login failed: ${JSON.stringify(r.login)}`);
  console.log("✓ Logged in as", r.login.lgusername);
}
const getCsrf = async () => (await api({ action: "query", meta: "tokens", type: "csrf" })).query.tokens.csrftoken;

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
const monoDV = (text, lang) => ({ value: { text, language: lang }, type: "monolingualtext" });

(async () => {
  await login();
  const csrf = await getCsrf();

  // ---------- Step 1: Check whether a Q-item already exists ----------
  console.log("\n→ Searching for existing item …");
  const search = await api({
    action: "wbsearchentities",
    search: "Anwaar Ahmed Bugvi",
    language: "en",
    type: "item",
    limit: "5",
  });
  if (search.search?.length) {
    console.log("  Possible matches:");
    for (const m of search.search) {
      console.log(`    ${m.id}  ${m.label}  (${m.description ?? "—"})`);
    }
    console.log("  Stopping to avoid duplicate. Manually link if one of the above is correct.");
    process.exit(0);
  }
  console.log("  No existing match. Will create new item.");

  // ---------- Step 2: Create the new item ----------
  const Q = {
    human: "Q5",
    pakistan: "Q843",
  };

  const founderData = {
    labels: {
      en: { language: "en", value: "Anwaar Ahmed Bugvi" },
      ur: { language: "ur", value: "انوار احمد بگوی" },
    },
    descriptions: {
      en: { language: "en", value: "Pakistani founder of Al-Iftikhar Bugvia Foundation" },
      ur: { language: "ur", value: "الافتخار بگویا فاؤنڈیشن کے بانی" },
    },
    aliases: {
      en: [
        { language: "en", value: "Dr Anwaar Ahmed Bugvi" },
        { language: "en", value: "Dr. Anwaar Ahmed Bugvi" },
        { language: "en", value: "Anwaar Ahmad Bugvi" },
      ],
      ur: [
        { language: "ur", value: "ڈاکٹر انوار احمد بگوی" },
      ],
    },
    claims: {
      P31: [stmt("P31", itemDV(Q.human))],
      P27: [stmt("P27", itemDV(Q.pakistan))],
      P1559: [stmt("P1559", monoDV("ڈاکٹر انوار احمد بگوی", "ur"))],
    },
  };

  console.log("\n→ Creating new item …");
  const createRes = await api(
    { action: "wbeditentity" },
    {
      method: "POST",
      body: {
        new: "item",
        data: JSON.stringify(founderData),
        token: csrf,
        bot: "1",
        summary: "Create item for founder of Al-Iftikhar Bugvia Foundation (aibf.ngo)",
      },
    },
  );
  const founderQ = createRes.entity?.id;
  if (!founderQ) throw new Error("Item creation did not return an ID");
  console.log("✓ Created", founderQ, "https://www.wikidata.org/wiki/" + founderQ);

  // ---------- Step 3: Link from AIBF via P112 ----------
  console.log(`\n→ Adding P112 (founded by) → ${founderQ} on ${QID}`);
  const linkRes = await api(
    { action: "wbeditentity" },
    {
      method: "POST",
      body: {
        id: QID,
        data: JSON.stringify({
          claims: {
            P112: [stmt("P112", itemDV(founderQ))],
          },
        }),
        token: csrf,
        bot: "1",
        summary: `Add founded-by link to ${founderQ}`,
      },
    },
  );
  console.log("✓ Linked. Revision:", linkRes.entity?.lastrevid);

  console.log("\nDone.");
  console.log("  Founder item:", "https://www.wikidata.org/wiki/" + founderQ);
  console.log("  AIBF item:   ", "https://www.wikidata.org/wiki/" + QID);
})().catch((e) => {
  console.error("\n✗ FAILED:", e.message);
  process.exit(1);
});
