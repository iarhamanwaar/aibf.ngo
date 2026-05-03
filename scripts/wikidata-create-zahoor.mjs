#!/usr/bin/env node
// Creates a Wikidata item for Maulana Zahoor Ahmed Bugvi — Khilafat Movement
// leader from Bhera (peer-reviewed source: Global Political Review).
// Then on Q139622033 the auditorium-naming relationship can be inferred.
//
// User has explicitly authorised creation.
//
// Usage:
//   node --env-file=.env.wikidata scripts/wikidata-create-zahoor.mjs

const API = "https://www.wikidata.org/w/api.php";
const USER = process.env.WIKIDATA_USER;
const PASS = process.env.WIKIDATA_PASS;
if (!USER || !PASS) { console.error("Missing env"); process.exit(1); }

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
  const init = { method, headers: { "User-Agent": "aibf.ngo-populator/1.5 (https://aibf.ngo)", Cookie: cookieHeader() } };
  if (method === "POST") {
    init.headers["Content-Type"] = "application/x-www-form-urlencoded";
    init.body = new URLSearchParams({ ...params, ...body, format: "json" });
  }
  const res = await fetch(url, init);
  applyCookies(res.headers);
  const j = await res.json();
  if (j.error) throw new Error(JSON.stringify(j.error));
  return j;
}
async function login() {
  const tok = (await api({ action: "query", meta: "tokens", type: "login" })).query.tokens.logintoken;
  const r = await api({ action: "login" }, { method: "POST", body: { lgname: USER, lgpassword: PASS, lgtoken: tok } });
  if (r.login.result !== "Success") throw new Error(JSON.stringify(r.login));
  console.log("✓ Logged in as", r.login.lgusername);
}
const getCsrf = async () => (await api({ action: "query", meta: "tokens", type: "csrf" })).query.tokens.csrftoken;

async function searchQ(s) { return (await api({ action: "wbsearchentities", search: s, language: "en", type: "item", limit: "5" })).search ?? []; }

const REFS = [
  "https://www.gprjournal.com/fulltext/the-emergence-of-the-khilafat-movement-in-sargodha-beginning-of-agitational-politics-and-impacts-on-the-freedom-movement",
  "https://archaeology.punjab.gov.pk/jame-masjid-bhera",
];
const refsBlock = (urls = REFS) => [{
  snaks: { P854: urls.map((u) => ({ snaktype: "value", property: "P854", datavalue: { value: u, type: "string" }, datatype: "url" })) },
  "snaks-order": ["P854"],
}];
const itemDV = (qid) => ({ value: { "entity-type": "item", "numeric-id": Number(qid.slice(1)), id: qid }, type: "wikibase-entityid" });
const monoDV = (text, lang) => ({ value: { text, language: lang }, type: "monolingualtext" });
const timeDV = (time, precision = 9) => ({
  value: { time, timezone: 0, before: 0, after: 0, precision, calendarmodel: "http://www.wikidata.org/entity/Q1985727" },
  type: "time",
});
function stmt(prop, datavalue, refs = REFS) {
  return { mainsnak: { snaktype: "value", property: prop, datavalue }, type: "statement", rank: "normal", references: refsBlock(refs) };
}

(async () => {
  await login();
  const csrf = await getCsrf();

  // Dedupe check
  const existing = await searchQ("Zahoor Ahmed Bugvi");
  for (const m of existing) {
    if (m.label?.toLowerCase().includes("zahoor") && m.label?.toLowerCase().includes("bugvi")) {
      console.log("Possible existing:", m.id, m.label, "—", m.description);
    }
  }

  // Resolve dependent Q-IDs
  const Q_HUMAN = "Q5";
  const Q_BHERA = "Q3777358";
  const britishRaj = await searchQ("British Raj");
  const Q_BRRAJ = britishRaj.find((u) => u.label === "British Raj")?.id || "Q129286";
  const imam = await searchQ("imam");
  const Q_IMAM = imam[0]?.id;
  const activist = await searchQ("activist");
  const Q_ACTIVIST = activist.find((u) => u.description?.toLowerCase().includes("person who supports or"))?.id || activist[0]?.id;
  const khilafat = await searchQ("Khilafat Movement");
  const Q_KHILAFAT = khilafat[0]?.id;
  console.log("Resolved: BRraj", Q_BRRAJ, "imam", Q_IMAM, "activist", Q_ACTIVIST, "khilafat", Q_KHILAFAT);

  const data = {
    labels: {
      en: { language: "en", value: "Zahoor Ahmed Bugvi" },
      ur: { language: "ur", value: "زہور احمد بگوی" },
    },
    descriptions: {
      en: { language: "en", value: "Pakistani religious scholar, Khilafat Movement organiser, and restorer of Jamia Masjid Bhera" },
      ur: { language: "ur", value: "پاکستانی عالم دین، تحریک خلافت کے منتظم، اور جامع مسجد بھیرہ کے بحال کنندہ" },
    },
    aliases: {
      en: [
        { language: "en", value: "Maulana Zahoor Ahmed Bugvi" },
        { language: "en", value: "Maulana Zahoor Ahmad Bugvi" },
        { language: "en", value: "Qazi Zahoor Ahmed Bugvi" },
      ],
      ur: [
        { language: "ur", value: "مولانا زہور احمد بگوی" },
        { language: "ur", value: "قاضی زہور احمد بگوی" },
      ],
    },
    claims: {
      P31: [stmt("P31", itemDV(Q_HUMAN))],
      P19: [stmt("P19", itemDV(Q_BHERA))],
      P27: [stmt("P27", itemDV(Q_BRRAJ))],
      P106: [
        ...(Q_IMAM ? [stmt("P106", itemDV(Q_IMAM))] : []),
        ...(Q_ACTIVIST ? [stmt("P106", itemDV(Q_ACTIVIST))] : []),
      ],
      ...(Q_KHILAFAT ? { P1344: [stmt("P1344", itemDV(Q_KHILAFAT))] } : {}), // participant in
      P1559: [stmt("P1559", monoDV("مولانا زہور احمد بگوی", "ur"))],
    },
  };

  const r = await api(
    { action: "wbeditentity" },
    { method: "POST", body: { new: "item", data: JSON.stringify(data), token: csrf, bot: "1", summary: "Create item for Khilafat Movement organiser & restorer of Jamia Masjid Bhera (peer-reviewed source)" } },
  );
  console.log("\n✓ Created", r.entity?.id);
  console.log("  https://www.wikidata.org/wiki/" + r.entity?.id);
})().catch((e) => {
  console.error("\n✗", e.message);
  process.exit(1);
});
