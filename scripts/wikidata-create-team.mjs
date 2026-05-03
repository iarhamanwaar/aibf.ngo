#!/usr/bin/env node
// Creates Wikidata items for three notable AIBF board members and links them
// to Q139622033 via P3320 (board member). Each item is built from independent
// third-party sources confirmed by web search.
//
// 1. Sahibzada Abrar Ahmad Bugvi — Chief Patron, AIBF; Khatib of the
//    Sher Shah Suri Mosque (Jamia Masjid Bhera); In-Charge of
//    Dar-ul-Uloom Azizia Bhera. Sources: Punjab Archaeology Dept (gov.pk),
//    Mera Sargodha, Bhera Tehsil blog.
//
// 2. Salman Abubakar Bugvi — Coordinator, AIBF; Assistant Professor of
//    Mechanical Engineering, University of Lahore. Multiple peer-reviewed
//    publications. Sources: Google Scholar, Engineering Management Journal
//    (Taylor & Francis), ResearchGate.
//
// 3. Sahibzada Ahmad Muneeb Bugvi — NPO Registration & Microfinance lead,
//    AIBF; Manager Industrial Linkages & Technology Transfer (ORIC) at
//    University of Health Sciences, Lahore (Grade-19); author of
//    "Micro Finance for Women Empowerment in Pakistan" (ISBN 978-3-659-82181-3).
//    Sources: Amazon listing, RocketReach, LinkedIn.
//
// Usage:
//   node --env-file=.env.wikidata scripts/wikidata-create-team.mjs

const API = "https://www.wikidata.org/w/api.php";
const USER = process.env.WIKIDATA_USER;
const PASS = process.env.WIKIDATA_PASS;
const QID_AIBF = process.env.WIKIDATA_QID;

if (!USER || !PASS || !QID_AIBF) {
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
    headers: { "User-Agent": "aibf.ngo-populator/1.4 (https://aibf.ngo)", Cookie: cookieHeader() },
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

async function searchQ(s) {
  const r = await api({ action: "wbsearchentities", search: s, language: "en", type: "item", limit: "5" });
  return r.search ?? [];
}

function refsBlock(urls) {
  return [
    {
      snaks: { P854: urls.map((u) => ({ snaktype: "value", property: "P854", datavalue: { value: u, type: "string" }, datatype: "url" })) },
      "snaks-order": ["P854"],
    },
  ];
}
const itemDV = (qid) => ({ value: { "entity-type": "item", "numeric-id": Number(qid.slice(1)), id: qid }, type: "wikibase-entityid" });
const monoDV = (text, lang) => ({ value: { text, language: lang }, type: "monolingualtext" });
const stringDV = (s) => ({ value: s, type: "string" });
function stmt(prop, datavalue, urls) {
  return { mainsnak: { snaktype: "value", property: prop, datavalue }, type: "statement", rank: "normal", references: refsBlock(urls) };
}

// Pre-known stable Q-IDs
const Q_HUMAN = "Q5";
const Q_PAKISTAN = "Q843";
const Q_PHYSICIAN = "Q39631";
const Q_LAHORE = "Q11739";
const Q_BHERA = "Q3777358";

async function createItem(label_en, label_ur, desc_en, desc_ur, aliases_en, aliases_ur, claims, summary, csrf) {
  // dedupe check
  const existing = await searchQ(label_en);
  for (const m of existing) {
    if (m.label?.toLowerCase() === label_en.toLowerCase()) {
      console.log(`  Possible dup ${m.id} (${m.description ?? "—"}) — skipping creation`);
      return m.id;
    }
  }
  const data = {
    labels: { en: { language: "en", value: label_en }, ur: { language: "ur", value: label_ur } },
    descriptions: { en: { language: "en", value: desc_en }, ur: { language: "ur", value: desc_ur } },
    aliases: {
      en: aliases_en.map((v) => ({ language: "en", value: v })),
      ur: aliases_ur.map((v) => ({ language: "ur", value: v })),
    },
    claims,
  };
  const r = await api(
    { action: "wbeditentity" },
    { method: "POST", body: { new: "item", data: JSON.stringify(data), token: csrf, bot: "1", summary } },
  );
  const qid = r.entity?.id;
  console.log(`  ✓ Created ${qid}: ${label_en}`);
  return qid;
}

(async () => {
  await login();
  const csrf = await getCsrf();

  // Resolve Q-IDs we'll need
  console.log("\n→ Resolving prerequisite Q-IDs …");
  const universities = await searchQ("University of Lahore");
  const Q_UOL = universities.find((u) => u.label === "University of Lahore" && u.description?.toLowerCase().includes("lahore"))?.id || universities[0]?.id;
  console.log(`  University of Lahore → ${Q_UOL}`);
  const uhsResults = await searchQ("University of Health Sciences Lahore");
  const Q_UHS = uhsResults.find((u) => u.label?.toLowerCase().includes("health sciences"))?.id || uhsResults[0]?.id;
  console.log(`  University of Health Sciences → ${Q_UHS}`);
  const profResults = await searchQ("assistant professor");
  const Q_ASSTPROF = profResults.find((u) => u.description?.toLowerCase().includes("academic"))?.id || profResults[0]?.id;
  console.log(`  assistant professor → ${Q_ASSTPROF}`);
  const engResults = await searchQ("mechanical engineer");
  const Q_MECHENG = engResults[0]?.id;
  console.log(`  mechanical engineer → ${Q_MECHENG}`);
  const authorResults = await searchQ("writer");
  const Q_WRITER = authorResults.find((u) => u.description?.toLowerCase().includes("person who uses"))?.id || authorResults[0]?.id;
  console.log(`  writer → ${Q_WRITER}`);
  const imamResults = await searchQ("imam");
  const Q_IMAM = imamResults[0]?.id;
  console.log(`  imam → ${Q_IMAM}`);
  const mosqueResults = await searchQ("Sher Shah Suri Mosque Bhera");
  const Q_MOSQUE = mosqueResults[0]?.id;
  console.log(`  Sher Shah Suri Mosque → ${Q_MOSQUE}`);

  // ---------- Person 1: Sahibzada Abrar Ahmed Bugvi ----------
  console.log("\n→ Creating item for Sahibzada Abrar Ahmed Bugvi");
  const refsAbrar = [
    "https://aibf.ngo/about",
    "https://archaeology.punjab.gov.pk/jame-masjid-bhera",
    "https://merasargodha.com/dar-ul-uloom-azizia-bhera/",
    "https://bhera.org/gates-of-bhera/",
  ];
  const claimsAbrar = {
    P31: [stmt("P31", itemDV(Q_HUMAN), refsAbrar)],
    P27: [stmt("P27", itemDV(Q_PAKISTAN), refsAbrar)],
    P106: [
      ...(Q_IMAM ? [stmt("P106", itemDV(Q_IMAM), refsAbrar)] : []),
      ...(Q_WRITER ? [stmt("P106", itemDV(Q_WRITER), refsAbrar)] : []),
    ],
    P1559: [stmt("P1559", monoDV("صاحبزادہ ابرار احمد بگوی", "ur"), refsAbrar)],
  };
  const QID_ABRAR = await createItem(
    "Abrar Ahmed Bugvi",
    "ابرار احمد بگوی",
    "Pakistani religious scholar; khatib of Sher Shah Suri Mosque (Jamia Masjid Bhera); chief patron of Al-Iftikhar Bugvia Foundation",
    "پاکستانی عالم دین، شیر شاہ سوری مسجد (جامع مسجد بھیرہ) کے خطیب اور الافتخار بگویا فاؤنڈیشن کے سرپرست اعلیٰ",
    ["Sahibzada Abrar Ahmed Bugvi", "Sahibzada Abrar Ahmad Bugvi"],
    ["صاحبزادہ ابرار احمد بگوی"],
    claimsAbrar,
    "Create item for Khatib of Sher Shah Suri Mosque, Bhera; AIBF chief patron",
    csrf,
  );

  // ---------- Person 2: Salman Abubakar Bugvi ----------
  console.log("\n→ Creating item for Salman Abubakar Bugvi");
  const refsSalman = [
    "https://aibf.ngo/about",
    "https://scholar.google.com/citations?user=v-u9KgQAAAAJ",
    "https://www.tandfonline.com/doi/full/10.1080/10429247.2024.2406116",
    "https://www.researchgate.net/publication/349640982",
  ];
  const claimsSalman = {
    P31: [stmt("P31", itemDV(Q_HUMAN), refsSalman)],
    P27: [stmt("P27", itemDV(Q_PAKISTAN), refsSalman)],
    P106: [
      ...(Q_ASSTPROF ? [stmt("P106", itemDV(Q_ASSTPROF), refsSalman)] : []),
      ...(Q_MECHENG ? [stmt("P106", itemDV(Q_MECHENG), refsSalman)] : []),
    ],
    ...(Q_UOL ? { P108: [stmt("P108", itemDV(Q_UOL), refsSalman)] } : {}),
    P1153: [stmt("P1153", stringDV("v-u9KgQAAAAJ"), refsSalman)], // Google Scholar author ID
  };
  const QID_SALMAN = await createItem(
    "Salman Abubakar Bugvi",
    "سلمان ابوبکر بگوی",
    "Pakistani academic and mechanical engineer; assistant professor at the University of Lahore; coordinator of Al-Iftikhar Bugvia Foundation",
    "پاکستانی ماہر تعلیم اور مکینیکل انجینئر؛ یونیورسٹی آف لاہور میں اسسٹنٹ پروفیسر؛ الافتخار بگویا فاؤنڈیشن کے کوآرڈینیٹر",
    ["Dr Salman Abubakar Bugvi", "Salman Bugvi"],
    [],
    claimsSalman,
    "Create item for Pakistani academic; mechanical engineer; AIBF coordinator",
    csrf,
  );

  // ---------- Person 3: Sahibzada Ahmad Muneeb Bugvi ----------
  console.log("\n→ Creating item for Sahibzada Ahmad Muneeb Bugvi");
  const refsMuneeb = [
    "https://aibf.ngo/about",
    "https://www.amazon.com/Micro-Finance-Women-Empowerment-Pakistan/dp/3659821810",
    "https://www.linkedin.com/in/muneeb-bugvi-3bb03038/",
  ];
  const claimsMuneeb = {
    P31: [stmt("P31", itemDV(Q_HUMAN), refsMuneeb)],
    P27: [stmt("P27", itemDV(Q_PAKISTAN), refsMuneeb)],
    P106: [...(Q_WRITER ? [stmt("P106", itemDV(Q_WRITER), refsMuneeb)] : [])],
    ...(Q_UHS ? { P108: [stmt("P108", itemDV(Q_UHS), refsMuneeb)] } : {}),
  };
  const QID_MUNEEB = await createItem(
    "Ahmad Muneeb Bugvi",
    "احمد منیب بگوی",
    "Pakistani author and university administrator; manager at the University of Health Sciences, Lahore; lead of NPO registration and microfinance at Al-Iftikhar Bugvia Foundation",
    "پاکستانی مصنف اور یونیورسٹی منتظم؛ یونیورسٹی آف ہیلتھ سائنسز لاہور میں منیجر؛ الافتخار بگویا فاؤنڈیشن میں این پی او رجسٹریشن اور مائیکرو فنانس کے سربراہ",
    ["Sahibzada Ahmad Muneeb Bugvi", "Muneeb Bugvi"],
    ["صاحبزادہ احمد منیب بگوی"],
    claimsMuneeb,
    "Create item for Pakistani author of microfinance book; UHS Lahore manager; AIBF lead",
    csrf,
  );

  // ---------- Link board members on AIBF item ----------
  console.log("\n→ Linking board members to Q139622033 via P3320");
  const newClaims = { P3320: [] };
  if (QID_ABRAR) newClaims.P3320.push(stmt("P3320", itemDV(QID_ABRAR), ["https://aibf.ngo/about"]));
  if (QID_SALMAN) newClaims.P3320.push(stmt("P3320", itemDV(QID_SALMAN), ["https://aibf.ngo/about"]));
  if (QID_MUNEEB) newClaims.P3320.push(stmt("P3320", itemDV(QID_MUNEEB), ["https://aibf.ngo/about"]));
  if (newClaims.P3320.length) {
    const r = await api(
      { action: "wbeditentity" },
      {
        method: "POST",
        body: {
          id: QID_AIBF,
          data: JSON.stringify({ claims: newClaims }),
          token: csrf,
          bot: "1",
          summary: "Add P3320 (board member) for chief patron, coordinator, NPO/microfinance lead",
        },
      },
    );
    console.log("  ✓ Linked. rev", r.entity?.lastrevid);
  }

  console.log("\nDone.");
  console.log(" ", "https://www.wikidata.org/wiki/" + QID_AIBF);
  if (QID_ABRAR) console.log("  ", "https://www.wikidata.org/wiki/" + QID_ABRAR, "(Abrar)");
  if (QID_SALMAN) console.log("  ", "https://www.wikidata.org/wiki/" + QID_SALMAN, "(Salman)");
  if (QID_MUNEEB) console.log("  ", "https://www.wikidata.org/wiki/" + QID_MUNEEB, "(Muneeb)");
})().catch((e) => {
  console.error("\n✗ FAILED:", e.message);
  process.exit(1);
});
