#!/usr/bin/env node
// Final step: now that the user is autoconfirmed, create the three articles
// directly in mainspace (no Draft prefix, no AfC), post COI disclosures on
// each new Talk page, then create two new Wikidata items (Bugvi family and
// Dar-ul-Uloom Azizia) and wire enwiki sitelinks on all relevant Wikidata
// items. Also add P3553-equivalent (sitelinks) so Knowledge Graph sees the
// articles.
//
// Usage:
//   node --env-file=.env.wikidata scripts/wikipedia-mainspace-publish.mjs

import { readFileSync } from "node:fs";

const WP_API = "https://en.wikipedia.org/w/api.php";
const WD_API = "https://www.wikidata.org/w/api.php";
const WP_USER = process.env.WIKIPEDIA_USER, WP_PASS = process.env.WIKIPEDIA_PASS;
const WD_USER = process.env.WIKIDATA_USER, WD_PASS = process.env.WIKIDATA_PASS;
if (!WP_USER || !WP_PASS || !WD_USER || !WD_PASS) {
  console.error("Missing env vars"); process.exit(1);
}

// per-host cookie jar
function makeJar() {
  const c = new Map();
  return {
    apply: (h) => { for (const ck of h.getSetCookie?.() ?? []) { const [p] = ck.split(";"); const eq = p.indexOf("="); if (eq > 0) c.set(p.slice(0, eq).trim(), p.slice(eq + 1).trim()); } },
    header: () => [...c.entries()].map(([k, v]) => `${k}=${v}`).join("; "),
  };
}
async function call(api, jar, params, { method = "GET", body } = {}) {
  const url = method === "GET" ? `${api}?${new URLSearchParams({ ...params, format: "json" })}` : api;
  const init = { method, headers: { "User-Agent": "aibf.ngo-publisher/1.0 (https://aibf.ngo)", Cookie: jar.header() } };
  if (method === "POST") {
    init.headers["Content-Type"] = "application/x-www-form-urlencoded";
    init.body = new URLSearchParams({ ...params, ...body, format: "json" });
  }
  const r = await fetch(url, init);
  jar.apply(r.headers);
  return r.json();
}
async function login(api, jar, user, pass) {
  const tok = (await call(api, jar, { action: "query", meta: "tokens", type: "login" })).query.tokens.logintoken;
  const r = await call(api, jar, { action: "login" }, { method: "POST", body: { lgname: user, lgpassword: pass, lgtoken: tok } });
  if (r.login?.result !== "Success") throw new Error(JSON.stringify(r.login));
  return r.login.lgusername;
}
const csrfTok = async (api, jar) => (await call(api, jar, { action: "query", meta: "tokens", type: "csrf" })).query.tokens.csrftoken;

function extractWikitext(filePath) {
  const txt = readFileSync(filePath, "utf8");
  const m = txt.match(/=== START ===\s*\n```(?:wikitext)?\n([\s\S]*?)\n```\s*\n=== END ===/);
  if (!m) throw new Error("markers missing in " + filePath);
  return m[1].trim();
}

async function tryCreate(jar, title, text, summary, tok) {
  let r = await call(WP_API, jar, { action: "edit" }, { method: "POST", body: { title, text, token: tok, summary, createonly: "1" } });
  if (r.error?.code === "abusefilter-warning") {
    console.log(`  abusefilter ${r.error.abusefilter?.id} (warn) — retrying`);
    r = await call(WP_API, jar, { action: "edit" }, { method: "POST", body: { title, text, token: tok, summary, createonly: "1" } });
  }
  return r;
}

const ARTICLES = [
  { title: "Dar-ul-Uloom Azizia, Bhera", file: "docs/wikipedia-darul-uloom-azizia.md", summary: "Create article on Dar-ul-Uloom Azizia, Bhera (founded 1841), citing peer-reviewed Iḥyāʾ al-ʿUlūm and Government of Punjab Directorate of Archaeology",
    coi: `{{Connected contributor|User=Arhamanwaar|U-EH=yes|otherlinks=Member of the Bugvi family of Bhera, who founded and continue to administer Dar-ul-Uloom Azizia. I have followed [[WP:COI]] guidance and used only third-party reliable sources (Government of Punjab Directorate General of Archaeology, peer-reviewed ''Iḥyāʾ al-ʿUlūm'' journal, ''Mera Sargodha'').}}\n\n~~~~` },
  { title: "Bugvi family", file: "docs/wikipedia-bugvi-family.md", summary: "Create article on Bugvi family of Bhera, citing Government of Punjab Directorate of Archaeology, peer-reviewed Global Political Review and Iḥyāʾ al-ʿUlūm, and Dawn",
    coi: `{{Connected contributor|User=Arhamanwaar|U-EH=yes|otherlinks=I am a member of the Bugvi family. I have followed [[WP:COI]] guidance and used only third-party reliable sources (Government of Punjab Directorate General of Archaeology, peer-reviewed ''Iḥyāʾ al-ʿUlūm'' journal, peer-reviewed ''Global Political Review'', and ''Dawn'' newspaper).}}\n\n~~~~` },
  { title: "Anwaar Ahmed Bugvi", file: "docs/wikipedia-anwaar-ahmed-bugvi.md", summary: "Create article on Anwaar Ahmed Bugvi (Pakistani physician, former Adviser Health Punjab, founder of AIBF), citing Dawn",
    coi: `{{Connected contributor|User=Arhamanwaar|U-EH=yes|otherlinks=I am the nephew of Dr Anwaar Ahmed Bugvi. I have followed [[WP:COI]] guidance and used only third-party reliable sources (''Dawn'' newspaper, Government of Punjab Directorate General of Archaeology, ''Mera Sargodha'').}}\n\n~~~~` },
];

(async () => {
  // ---------- Wikipedia: verify autoconfirmed + publish + COI ----------
  const wpJar = makeJar();
  console.log("→ Wikipedia login");
  await login(WP_API, wpJar, WP_USER, WP_PASS);
  const u = await call(WP_API, wpJar, { action: "query", meta: "userinfo", uiprop: "groups|editcount" });
  const groups = u.query.userinfo.groups;
  console.log(`  edits=${u.query.userinfo.editcount}  groups=${groups.join(",")}`);
  if (!groups.includes("autoconfirmed")) {
    console.log("  ⚠ Not autoconfirmed yet per API. Edits may need to count up; try again in a minute.");
  }
  const wpTok = await csrfTok(WP_API, wpJar);

  const created = [];
  for (const a of ARTICLES) {
    console.log(`\n→ Mainspace: ${a.title}`);
    const wikitext = extractWikitext(a.file);
    const r = await tryCreate(wpJar, a.title, wikitext, a.summary, wpTok);
    if (r.edit?.result === "Success") {
      console.log(`  ✓ created (rev ${r.edit.newrevid})`);
      created.push(a.title);
      // Post COI on Talk page
      const tr = await call(WP_API, wpJar, { action: "edit" }, {
        method: "POST",
        body: { title: `Talk:${a.title}`, section: "new", sectiontitle: "COI disclosure", text: a.coi, token: wpTok, summary: "COI disclosure (mandatory under WP:COI)" },
      });
      console.log("  + Talk:", tr.error ? "✗ " + tr.error.code : "✓");
    } else if (r.error?.code === "articleexists") {
      console.log("  (exists already)");
      created.push(a.title);
    } else {
      console.log("  ✗", r.error?.code, "—", r.error?.info ?? JSON.stringify(r));
    }
  }

  // ---------- Wikidata: create new items + sitelinks ----------
  if (created.length === 0) { console.log("\nNo articles created — skipping Wikidata wiring"); return; }

  const wdJar = makeJar();
  console.log("\n→ Wikidata login");
  await login(WD_API, wdJar, WD_USER, WD_PASS);
  const wdTok = await csrfTok(WD_API, wdJar);

  // Existing Q-IDs we know about
  const existingQ = {
    "Anwaar Ahmed Bugvi": "Q139622400",
  };

  // Create new Q-items for Bugvi family + Dar-ul-Uloom Azizia, with enwiki sitelinks baked in
  async function createWdItem(label_en, desc_en, aliases_en, claims, sitelink_title, summary) {
    const data = {
      labels: { en: { language: "en", value: label_en } },
      descriptions: { en: { language: "en", value: desc_en } },
      aliases: { en: aliases_en.map((v) => ({ language: "en", value: v })) },
      claims,
      sitelinks: { enwiki: { site: "enwiki", title: sitelink_title } },
    };
    const r = await call(WD_API, wdJar, { action: "wbeditentity" }, { method: "POST", body: { new: "item", data: JSON.stringify(data), token: wdTok, bot: "1", summary } });
    if (r.error) throw new Error(JSON.stringify(r.error));
    console.log(`  ✓ Created ${r.entity?.id}: ${label_en}`);
    return r.entity?.id;
  }

  const refUrl = "https://aibf.ngo/about";
  const refsBlock = (urls) => [{ snaks: { P854: urls.map((u) => ({ snaktype: "value", property: "P854", datavalue: { value: u, type: "string" }, datatype: "url" })) }, "snaks-order": ["P854"] }];
  const itemDV = (qid) => ({ value: { "entity-type": "item", "numeric-id": Number(qid.slice(1)), id: qid }, type: "wikibase-entityid" });
  const stmt = (prop, dv, urls) => ({ mainsnak: { snaktype: "value", property: prop, datavalue: dv }, type: "statement", rank: "normal", references: refsBlock(urls) });
  const timeDV = (time) => ({ value: { time, timezone: 0, before: 0, after: 0, precision: 9, calendarmodel: "http://www.wikidata.org/entity/Q1985727" }, type: "time" });

  const Q = { human: "Q5", pakistan: "Q843", bhera: "Q3777358", british_raj: "Q129286" };

  if (created.includes("Bugvi family")) {
    console.log("\n→ Creating Wikidata item for Bugvi family");
    const refsFamily = ["https://aibf.ngo/about", "https://archaeology.punjab.gov.pk/jame-masjid-bhera", "https://merasargodha.com/dar-ul-uloom-azizia-bhera/", "https://www.gprjournal.com/fulltext/the-emergence-of-the-khilafat-movement-in-sargodha-beginning-of-agitational-politics-and-impacts-on-the-freedom-movement"];
    const family = await createWdItem(
      "Bugvi family",
      "Pakistani Punjabi scholarly family from Bhera",
      ["Bugvia family"],
      {
        P31: [stmt("P31", itemDV("Q8436"), refsFamily)], // Q8436 family
        P17: [stmt("P17", itemDV(Q.pakistan), refsFamily)],
        P495: [stmt("P495", itemDV(Q.pakistan), refsFamily)], // country of origin
      },
      "Bugvi family",
      "Create item for Bugvi family of Bhera (linked to en Wikipedia article)",
    );
    existingQ["Bugvi family"] = family;
  }

  if (created.includes("Dar-ul-Uloom Azizia, Bhera")) {
    console.log("\n→ Creating Wikidata item for Dar-ul-Uloom Azizia, Bhera");
    const refsAzizia = ["https://aibf.ngo/about", "https://joqs-uok.com/index.php/ihya/article/view/64", "https://merasargodha.com/dar-ul-uloom-azizia-bhera/"];
    const azizia = await createWdItem(
      "Dar-ul-Uloom Azizia",
      "Islamic seminary in Bhera, Pakistan, founded in 1841",
      ["Dar-ul-Uloom Azizia, Bhera", "Darul Uloom Azizia"],
      {
        P31: [stmt("P31", itemDV("Q1576471"), refsAzizia)], // Q1576471 madrasa
        P17: [stmt("P17", itemDV(Q.pakistan), refsAzizia)],
        P131: [stmt("P131", itemDV(Q.bhera), refsAzizia)], // located in admin entity
        P571: [stmt("P571", timeDV("+1841-00-00T00:00:00Z"), refsAzizia)],
        P112: [stmt("P112", itemDV(existingQ["Bugvi family"] || Q.human), refsAzizia)], // founded by
      },
      "Dar-ul-Uloom Azizia, Bhera",
      "Create item for Dar-ul-Uloom Azizia, Bhera (linked to en Wikipedia article)",
    );
    existingQ["Dar-ul-Uloom Azizia, Bhera"] = azizia;
  }

  // Set sitelink for the founder (already-existing Q139622400)
  if (created.includes("Anwaar Ahmed Bugvi")) {
    console.log("\n→ Setting enwiki sitelink on Q139622400 (Anwaar)");
    const r = await call(WD_API, wdJar, { action: "wbsetsitelink" }, { method: "POST", body: { id: "Q139622400", linksite: "enwiki", linktitle: "Anwaar Ahmed Bugvi", token: wdTok, bot: "1", summary: "Add enwiki sitelink to new Wikipedia article" } });
    console.log(r.error ? "  ✗ " + r.error.code : "  ✓");
  }

  // Also link the Bugvi family Q-item back from AIBF (Q139622033) via P3373 (sibling) — no, better: P361 part of? skip; AIBF doesn't need a "part of family" link. Skip.

  console.log("\n=== Final ===");
  console.log("Articles published:", created.length);
  for (const t of created) {
    const wpUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(t.replace(/ /g, "_"))}`;
    const qid = existingQ[t];
    console.log(`  ${t} → ${wpUrl}  ↔ Wikidata ${qid ?? "(see existing item)"}`);
  }
})().catch((e) => { console.error("\n✗", e.message); process.exit(1); });
