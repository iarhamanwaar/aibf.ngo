#!/usr/bin/env node
// Publishes the three drafted Wikipedia articles. Tries mainspace first;
// falls back to Draft: namespace + {{subst:submit}} for AfC review if the
// account is not autoconfirmed.
//
// Then posts a {{Connected contributor}} COI disclosure on each Talk page.
//
// User has explicitly authorised the bot password aibf-wikipedia.
//
// Usage:
//   node --env-file=.env.wikidata scripts/wikipedia-publish.mjs

import { readFileSync } from "node:fs";

const API = "https://en.wikipedia.org/w/api.php";
const USER = process.env.WIKIPEDIA_USER;
const PASS = process.env.WIKIPEDIA_PASS;
if (!USER || !PASS) { console.error("Missing WIKIPEDIA_USER/PASS"); process.exit(1); }

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
  const init = { method, headers: { "User-Agent": "aibf.ngo-publisher/1.0 (https://aibf.ngo)", Cookie: cookieHeader() } };
  if (method === "POST") {
    init.headers["Content-Type"] = "application/x-www-form-urlencoded";
    init.body = new URLSearchParams({ ...params, ...body, format: "json" });
  }
  const res = await fetch(url, init);
  applyCookies(res.headers);
  const j = await res.json();
  return j;
}
async function login() {
  const tok = (await api({ action: "query", meta: "tokens", type: "login" })).query.tokens.logintoken;
  const r = await api({ action: "login" }, { method: "POST", body: { lgname: USER, lgpassword: PASS, lgtoken: tok } });
  if (r.login?.result !== "Success") throw new Error("Login failed: " + JSON.stringify(r.login));
  console.log("✓ Logged in as", r.login.lgusername);
  // Check autoconfirmed
  const u = await api({ action: "query", meta: "userinfo", uiprop: "groups|rights|editcount" });
  const ui = u.query.userinfo;
  const autoconfirmed = ui.groups?.includes("autoconfirmed");
  console.log(`  edits=${ui.editcount}, groups=${ui.groups?.join(",")}, autoconfirmed=${autoconfirmed}`);
  return autoconfirmed;
}
const getCsrf = async () => (await api({ action: "query", meta: "tokens", type: "csrf" })).query.tokens.csrftoken;

// Extract wikitext between === START === ``` and ``` === END === markers
function extractWikitext(filePath) {
  const txt = readFileSync(filePath, "utf8");
  const m = txt.match(/=== START ===\s*\n```(?:wikitext)?\n([\s\S]*?)\n```\s*\n=== END ===/);
  if (!m) throw new Error("Could not find wikitext markers in " + filePath);
  return m[1].trim();
}

const ARTICLES = [
  {
    title: "Dar-ul-Uloom Azizia, Bhera",
    file: "docs/wikipedia-darul-uloom-azizia.md",
    summary: "Create article on Dar-ul-Uloom Azizia, Bhera (1841–present), with peer-reviewed and government sources",
    coi: `{{Connected contributor|User=Arhamanwaar|U-EH=yes|otherlinks=Member of the Bugvi family of Bhera, the family that founded and continues to administer Dar-ul-Uloom Azizia. I have followed [[WP:COI]] guidance and used only third-party reliable sources (Government of Punjab Directorate General of Archaeology, peer-reviewed ''Iḥyāʾ al-ʿUlūm'' journal, ''Mera Sargodha'').}}\n\n~~~~`,
  },
  {
    title: "Bugvi family",
    file: "docs/wikipedia-bugvi-family.md",
    summary: "Create article on Bugvi family of Bhera, with government and academic sources",
    coi: `{{Connected contributor|User=Arhamanwaar|U-EH=yes|otherlinks=I am a member of the Bugvi family. I have followed [[WP:COI]] guidance and used only third-party reliable sources (Government of Punjab Directorate General of Archaeology, peer-reviewed ''Iḥyāʾ al-ʿUlūm'' journal, peer-reviewed ''Global Political Review'', and ''Dawn'' newspaper).}}\n\n~~~~`,
  },
  {
    title: "Anwaar Ahmed Bugvi",
    file: "docs/wikipedia-anwaar-ahmed-bugvi.md",
    summary: "Create stub on Anwaar Ahmed Bugvi, Pakistani physician and AIBF founder, with sources",
    coi: `{{Connected contributor|User=Arhamanwaar|U-EH=yes|otherlinks=I am the nephew of Dr Anwaar Ahmed Bugvi. I have followed [[WP:COI]] guidance and used only third-party reliable sources (''Dawn'' newspaper, Government of Punjab Directorate General of Archaeology, ''Mera Sargodha'').}}\n\n~~~~`,
  },
];

async function createPage(title, text, summary, csrf, createonly = true) {
  const body = { title, text, token: csrf, summary };
  if (createonly) body.createonly = "1";
  const r = await api({ action: "edit" }, { method: "POST", body });
  return r;
}

async function publishOne(article, autoconfirmed, csrf) {
  let wikitext = extractWikitext(article.file);
  let target = article.title; // mainspace
  let usedDraft = false;
  let result = null;

  if (autoconfirmed) {
    console.log(`\n→ Mainspace: ${target}`);
    result = await createPage(target, wikitext, article.summary, csrf);
    if (result.error?.code === "permissiondenied" || result.error?.code === "noaccess" || result.error?.code === "create-protected") {
      console.log("  permission denied — falling back to Draft");
    } else if (result.error?.code === "articleexists") {
      console.log("  already exists — leaving alone");
      return { target, result, error: result.error };
    } else if (result.error) {
      console.log("  error:", result.error.code, "—", result.error.info);
      console.log("  falling back to Draft");
    } else {
      console.log("  ✓ created mainspace");
      return { target, result };
    }
  }

  // Draft fallback
  target = `Draft:${article.title}`;
  usedDraft = true;
  const draftWikitext = `{{subst:submit}}\n\n${wikitext}`;
  console.log(`→ Draft: ${target}`);
  result = await createPage(target, draftWikitext, article.summary + " (AfC submission)", csrf);
  if (result.error?.code === "articleexists") {
    console.log("  already exists — skipping");
    return { target, result, error: result.error };
  }
  if (result.error) {
    console.log("  ✗", result.error.code, "—", result.error.info);
    return { target, result, error: result.error };
  }
  console.log("  ✓ Draft created + submitted to AfC");
  return { target, result, usedDraft };
}

async function postCOI(targetTitle, coi, csrf) {
  const talk = targetTitle.startsWith("Draft:") ? targetTitle.replace("Draft:", "Draft talk:") : `Talk:${targetTitle}`;
  console.log(`  + COI disclosure → ${talk}`);
  const r = await api(
    { action: "edit" },
    {
      method: "POST",
      body: {
        title: talk,
        section: "new",
        sectiontitle: "COI disclosure",
        text: coi,
        token: csrf,
        summary: "COI disclosure (mandatory under WP:COI)",
      },
    },
  );
  if (r.error) console.log("    ✗", r.error.code);
  else console.log("    ✓");
}

(async () => {
  const autoconfirmed = await login();
  const csrf = await getCsrf();

  const results = [];
  for (const a of ARTICLES) {
    const r = await publishOne(a, autoconfirmed, csrf);
    results.push({ ...a, ...r });
    if (!r.error || r.error.code === "articleexists") {
      // Skip COI on existing pages we didn't author this time
      if (r.error?.code !== "articleexists") {
        await postCOI(r.target, a.coi, csrf);
      }
    }
  }

  console.log("\n=== Summary ===");
  for (const r of results) {
    const url = `https://en.wikipedia.org/wiki/${encodeURIComponent(r.target.replace(/ /g, "_"))}`;
    const status = r.error ? "✗ " + r.error.code : (r.usedDraft ? "✓ DRAFT (AfC pending)" : "✓ MAINSPACE");
    console.log(`  ${status}  ${url}`);
  }
})().catch((e) => {
  console.error("\n✗ FAILED:", e.message);
  process.exit(1);
});
