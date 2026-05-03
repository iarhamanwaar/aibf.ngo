#!/usr/bin/env node
// Fixes three rendering errors in the live mainspace articles:
//   1. {{lang-ur|...}} → {{langx|ur|...}}  (template renamed)
//   2. {{Wikidata|Q...}} → removed (template doesn't exist; sitelink already handles it)
//   3. Bhera.org reference with italic markup inside {{lang|en|''Bhera.org''}} → just plain text
//
// Usage:
//   node --env-file=.env.wikidata scripts/wikipedia-fix-templates.mjs

const API = "https://en.wikipedia.org/w/api.php";
const USER = process.env.WIKIPEDIA_USER, PASS = process.env.WIKIPEDIA_PASS;

const cookieJar = new Map();
function applyCookies(h) { for (const c of h.getSetCookie?.() ?? []) { const [p] = c.split(";"); const eq = p.indexOf("="); if (eq > 0) cookieJar.set(p.slice(0, eq).trim(), p.slice(eq + 1).trim()); } }
const cookieHeader = () => [...cookieJar.entries()].map(([k, v]) => `${k}=${v}`).join("; ");
async function api(p, { method = "GET", body } = {}) {
  const url = method === "GET" ? `${API}?${new URLSearchParams({ ...p, format: "json" })}` : API;
  const init = { method, headers: { "User-Agent": "aibf.ngo-fix/1.0", Cookie: cookieHeader() } };
  if (method === "POST") { init.headers["Content-Type"] = "application/x-www-form-urlencoded"; init.body = new URLSearchParams({ ...p, ...body, format: "json" }); }
  const r = await fetch(url, init); applyCookies(r.headers); return r.json();
}
async function login() {
  const tok = (await api({ action: "query", meta: "tokens", type: "login" })).query.tokens.logintoken;
  const r = await api({ action: "login" }, { method: "POST", body: { lgname: USER, lgpassword: PASS, lgtoken: tok } });
  if (r.login?.result !== "Success") throw new Error(JSON.stringify(r.login));
  console.log("✓ Login");
}
const csrf = async () => (await api({ action: "query", meta: "tokens", type: "csrf" })).query.tokens.csrftoken;

async function getPageText(title) {
  const r = await api({ action: "query", prop: "revisions", rvprop: "content", rvslots: "main", titles: title });
  const page = Object.values(r.query.pages)[0];
  return page.revisions?.[0]?.slots?.main?.["*"];
}
async function setPageText(title, text, summary, tok) {
  const r = await api({ action: "edit" }, { method: "POST", body: { title, text, token: tok, summary, nocreate: "1" } });
  if (r.error) throw new Error(`${title}: ${r.error.code} — ${r.error.info}`);
  return r.edit;
}

(async () => {
  await login();
  const tok = await csrf();

  // ---- Anwaar Ahmed Bugvi: 3 fixes ----
  console.log("\n→ Anwaar Ahmed Bugvi");
  let anwaar = await getPageText("Anwaar Ahmed Bugvi");
  // Fix 1: {{lang-ur|...}} → {{langx|ur|...}}
  anwaar = anwaar.replace(/\{\{lang-ur\|([^}]+)\}\}/g, "{{langx|ur|$1}}");
  // Fix 2: Remove {{Wikidata|...}} template (doesn't render)
  anwaar = anwaar.replace(/^\* \{\{Wikidata\|[^}]+\}\}\s*$/gm, "");
  anwaar = anwaar.replace(/\{\{Wikidata\|[^}]+\}\}\s*/g, "");
  // Fix 3: italic inside {{lang}} on Bhera.org ref
  anwaar = anwaar.replace(/\{\{lang\|en\|''Bhera\.org''\}\}/g, "''Bhera.org''");
  await setPageText("Anwaar Ahmed Bugvi", anwaar, "Fix templates: {{lang-ur}} → {{langx|ur}}; remove non-existent {{Wikidata}} template; fix italic-inside-{{lang}} error", tok);
  console.log("  ✓ saved");

  // ---- Dar-ul-Uloom Azizia, Bhera: 1 fix ----
  console.log("\n→ Dar-ul-Uloom Azizia, Bhera");
  let azizia = await getPageText("Dar-ul-Uloom Azizia, Bhera");
  azizia = azizia.replace(/\{\{lang-ur\|([^}]+)\}\}/g, "{{langx|ur|$1}}");
  await setPageText("Dar-ul-Uloom Azizia, Bhera", azizia, "Fix template: {{lang-ur}} → {{langx|ur}} (template was renamed)", tok);
  console.log("  ✓ saved");

  // ---- Bugvi family: check for similar issues ----
  console.log("\n→ Bugvi family (check)");
  let family = await getPageText("Bugvi family");
  if (/\{\{lang-ur\|/.test(family) || /\{\{Wikidata\|/.test(family)) {
    family = family.replace(/\{\{lang-ur\|([^}]+)\}\}/g, "{{langx|ur|$1}}");
    family = family.replace(/\{\{Wikidata\|[^}]+\}\}\s*/g, "");
    await setPageText("Bugvi family", family, "Fix templates: {{lang-ur}} → {{langx|ur}}; remove non-existent {{Wikidata}}", tok);
    console.log("  ✓ saved");
  } else {
    console.log("  (no template issues found)");
  }

  console.log("\nDone.");
})().catch((e) => { console.error("\n✗", e.message); process.exit(1); });
