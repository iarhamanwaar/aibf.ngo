#!/usr/bin/env node
// Resolves redlinks across the 3 articles by:
//   1. Creating Al-Iftikhar Bugvia Foundation article (referenced in all 3)
//   2. Creating Maulana Zahoor Ahmed Bugvi article (Khilafat Movement leader)
//   3. Pipe-linking [[Bugga Sharif]] → [[Bugga|Bugga Sharif]] in all 3 articles
//   4. Adding enwiki sitelinks to Q139622033 (AIBF) and Q139624176 (Maulana)
//
// Usage:
//   node --env-file=.env.wikidata scripts/wikipedia-fill-redlinks.mjs

const WP_API = "https://en.wikipedia.org/w/api.php";
const WD_API = "https://www.wikidata.org/w/api.php";
const WP_USER = process.env.WIKIPEDIA_USER, WP_PASS = process.env.WIKIPEDIA_PASS;
const WD_USER = process.env.WIKIDATA_USER, WD_PASS = process.env.WIKIDATA_PASS;

function makeJar() {
  const c = new Map();
  return {
    apply: (h) => { for (const ck of h.getSetCookie?.() ?? []) { const [p] = ck.split(";"); const eq = p.indexOf("="); if (eq > 0) c.set(p.slice(0, eq).trim(), p.slice(eq + 1).trim()); } },
    header: () => [...c.entries()].map(([k, v]) => `${k}=${v}`).join("; "),
  };
}
async function call(api, jar, params, { method = "GET", body } = {}) {
  const url = method === "GET" ? `${api}?${new URLSearchParams({ ...params, format: "json" })}` : api;
  const init = { method, headers: { "User-Agent": "aibf.ngo/1.0", Cookie: jar.header() } };
  if (method === "POST") { init.headers["Content-Type"] = "application/x-www-form-urlencoded"; init.body = new URLSearchParams({ ...params, ...body, format: "json" }); }
  const r = await fetch(url, init); jar.apply(r.headers); return r.json();
}
async function login(api, jar, user, pass) {
  const tok = (await call(api, jar, { action: "query", meta: "tokens", type: "login" })).query.tokens.logintoken;
  const r = await call(api, jar, { action: "login" }, { method: "POST", body: { lgname: user, lgpassword: pass, lgtoken: tok } });
  if (r.login?.result !== "Success") throw new Error(JSON.stringify(r.login));
}
const csrf = async (api, jar) => (await call(api, jar, { action: "query", meta: "tokens", type: "csrf" })).query.tokens.csrftoken;

const AIBF_ARTICLE = `{{Short description|Pakistani charitable organisation founded 1998}}
{{Infobox organization
| name             = Al-Iftikhar Bugvia Foundation
| native_name      = الافتخار بگویا فاؤنڈیشن
| native_name_lang = ur
| abbreviation     = AIBF
| founder          = [[Anwaar Ahmed Bugvi|Dr Anwaar Ahmed Bugvi]]
| founding_date    = {{Start date|1998}}
| type             = [[Non-governmental organization]]; charitable organisation
| status           = Registered Category (A) Charity, [[Punjab, Pakistan|Punjab]] Charity Commission (PB-6976792864708031)
| headquarters     = [[Bhera]], [[Sargodha District]], [[Punjab, Pakistan|Punjab]], Pakistan
| region_served    = Punjab and parts of [[Jhelum District]], Pakistan
| website          = {{URL|https://aibf.ngo}}
}}

The '''Al-Iftikhar Bugvia Foundation''' (AIBF) is a Pakistani [[non-governmental organization|non-governmental]] charitable organisation founded in 1998 by [[Anwaar Ahmed Bugvi|Dr Anwaar Ahmed Bugvi]]. The foundation is based at [[Bhera]] in [[Sargodha District]], [[Punjab, Pakistan|Punjab]], Pakistan, and operates programmes in healthcare, education, ration distribution, livelihood support and emergency relief across Bhera, [[Bugga|Bugga Sharif]], and surrounding villages in Sargodha and [[Jhelum District|Jhelum]] districts.<ref name="aibfabout">{{cite web |title=About AIBF |url=https://aibf.ngo/about |publisher=Al-Iftikhar Bugvia Foundation |access-date=4 May 2026}}</ref>

== History ==
AIBF was founded in 1998 by Dr Anwaar Ahmed Bugvi, a former Adviser Health (Technical) of the [[Government of Punjab, Pakistan|Government of Punjab]],<ref name="dawn">{{cite news |title=PMF officials may face axe: Exam scandal |url=https://www.dawn.com/news/156569 |work=[[Dawn (newspaper)|Dawn]] |date=14 September 2005}}</ref> as a continuation of the [[Bugvi family]]'s long tradition of religious, educational and charitable work in [[Bhera]], including the operation of [[Dar-ul-Uloom Azizia, Bhera|Dar-ul-Uloom Azizia]] (a [[madrasa]] founded by the family in 1841) and the custodianship of the [[Sher Shah Suri Mosque|Sher Shah Suri Mosque (Jamia Masjid Bhera)]].<ref>{{cite web |title=Sher Shah Suri Mosque / Jamia Masjid Bhera |url=https://archaeology.punjab.gov.pk/jame-masjid-bhera |publisher=Directorate General of Archaeology, Government of the Punjab |access-date=4 May 2026}}</ref>

The foundation is registered with the Punjab Charity Commission as a Category (A) Charity under registration number PB-6976792864708031.<ref name="aibfabout" />

== Programmes ==
According to the foundation, its core programme areas are:<ref name="aibfabout" />

* '''Healthcare and medical aid''' — supporting dispensaries, free health camps, supply of medicines (including a monthly supply to the [[Pakistan Red Crescent Society]] hospital in Bhera) and donation of hospital equipment
* '''Ration and food security''' — Ramadan ration drives, Eid [[Qurbani]] meat distribution and monthly flour distribution
* '''Education and skill development''' — running women's sewing centres at Maliyar and Bugga, school supplies, tuition support and English-language courses
* '''Livelihood and Qarz Hasna''' — interest-free [[qard hasan]] micro-loans, including motorbikes for delivery riders and small-business support
* '''Emergency and disaster relief''' — including burn victims, fire damage, flood relief and acute medical emergencies
* '''Zakat, disability and social welfare''' — monthly [[zakat]] distribution, wheelchairs and family welfare support
* '''Heritage and cultural preservation''' — including the Zahoor Ahmad Bugvi Auditorium and the maintenance of historical buildings in Bhera
* '''Green plantation drive''' — biannual tree-planting campaigns

== Activities and reception ==
A youth calligraphy competition organised by AIBF on 18 November 2025 at the Zahoor Ahmad Bugvi Auditorium in Bhera was reported by the local heritage portal ''Bhera.org''.<ref>{{cite web |title=Calligraphy competition by Iftikhar Bugvia Foundation, 18 November 2025 |url=https://bhera.org/a-calligraphy-competition-for-the-young-students-was-organised-for-the-first-time-by-the-iftikhar-bugvia-foundation-on-18-november-2025-at-zahoor-auditorium-bhera-see-on-the-website-bhera-org-un/ |website=Bhera.org |date=20 November 2025 |access-date=4 May 2026}}</ref>

== Governance ==
The foundation is led by Dr Anwaar Ahmed Bugvi (chairman). Other board members documented in independent sources include Sahibzada Abrar Ahmed Bugvi (chief patron, also [[Khatib]] of the Sher Shah Suri Mosque),<ref>{{cite web |title=Gates of Bhera |url=https://bhera.org/gates-of-bhera/ |website=Bhera.org |access-date=4 May 2026}}</ref> Salman Abubakar Bugvi (assistant professor of mechanical engineering, [[University of Lahore]]) and Sahibzada Ahmad Muneeb Bugvi (manager, ORIC, [[University of Health Sciences, Lahore]]).<ref name="aibfabout" />

== See also ==
* [[Bugvi family]]
* [[Dar-ul-Uloom Azizia, Bhera]]
* [[Anwaar Ahmed Bugvi]]
* [[Sher Shah Suri Mosque]]

== References ==
{{reflist}}

== External links ==
* [https://aibf.ngo Official website]
* [https://commons.wikimedia.org/wiki/Category:Al-Iftikhar_Bugvia_Foundation Wikimedia Commons category]

[[Category:Charities based in Pakistan]]
[[Category:Non-profit organisations based in Pakistan]]
[[Category:Organisations based in Punjab, Pakistan]]
[[Category:Organisations based in Sargodha District]]
[[Category:1998 establishments in Pakistan]]
`;

const ZAHOOR_ARTICLE = `{{Short description|Pakistani religious scholar and Khilafat Movement organiser}}
{{Infobox person
| name        = Maulana Zahoor Ahmed Bugvi
| native_name = مولانا زہور احمد بگوی
| native_name_lang = ur
| birth_date  = c. 1900
| birth_place = [[Bhera]], [[Punjab Province (British India)|Punjab]], [[British Raj|British India]]
| occupation  = Religious scholar; political organiser
| known_for   = Organising the [[Khilafat Movement]] in [[Sargodha District|Sargodha district]]; restoration of the [[Sher Shah Suri Mosque]] (1926)
}}

'''Maulana Zahoor Ahmed Bugvi''' (also '''Qazi Zahoor Ahmed Bugvi'''; {{langx|ur|مولانا زہور احمد بگوی}}; b. c. 1900) was a Pakistani religious scholar and political organiser of the [[Bugvi family]] of [[Bhera]], notable for his role in the [[Khilafat Movement]] in [[Sargodha District|Sargodha district]] in the early 1920s and for restoration work on the [[Sher Shah Suri Mosque|Sher Shah Suri Mosque (Jamia Masjid Bhera)]] in 1926.

== Khilafat Movement ==
While studying intermediate at [[Islamia College, Lahore]] in 1919–21, Bugvi founded a Khilafat committee at [[Bhera]] and emerged as a leading organiser of the Khilafat Movement in Sargodha district. He travelled to towns and villages across [[Shahpur District|Shahpur]], [[Khushab District|Khushab]] and the [[Soon Valley|Soon valley]] addressing Khilafat processions and distributing pamphlets that included Quranic verses, statements on the goals of the movement, appeals for donations and calls for the establishment of independent national educational institutions in Bhera.<ref name="gpr">{{cite journal |title=The Emergence of the Khilafat Movement in Sargodha: Beginning of Agitational Politics and Impacts on the Freedom Movement |url=https://www.gprjournal.com/fulltext/the-emergence-of-the-khilafat-movement-in-sargodha-beginning-of-agitational-politics-and-impacts-on-the-freedom-movement |journal=Global Political Review |access-date=4 May 2026}}</ref>

He was arrested at [[Sargodha]] on 15 March 1922 and prosecuted in an English Summary Court, which sentenced him to one and a half years' imprisonment. He served the sentence in [[Jhelum]] and [[Rawalpindi]] jails before being released in late 1923, after which he remained under police observation by the colonial government.<ref name="gpr" />

After the formal end of the Khilafat Movement, the Central Khilafat Committee of India appointed Bugvi as the District Organiser of [[Tablighi Jamaat|Jamat Tableegh Islam]] for [[Sargodha]].<ref name="gpr" />

== Religious work ==
Bugvi is documented as having repaired the [[Sher Shah Suri Mosque|Sher Shah Suri Mosque (Jamia Masjid Bhera)]] in 1926, continuing the family tradition of custodianship of the mosque.<ref name="punjabarch">{{cite web |title=Sher Shah Suri Mosque / Jamia Masjid Bhera |url=https://archaeology.punjab.gov.pk/jame-masjid-bhera |publisher=Directorate General of Archaeology, Government of the Punjab |access-date=4 May 2026}}</ref> The mosque had been originally rebuilt in 1858 by his predecessor, Qazi Ahmed-ud-din Bugvi.<ref name="punjabarch" />

The auditorium named in his memory in Bhera, the Maulana Zahoor Ahmad Bugvi Auditorium, was inaugurated in August 2025 by the [[Al-Iftikhar Bugvia Foundation]].<ref>{{cite web |title=About AIBF |url=https://aibf.ngo/about |publisher=Al-Iftikhar Bugvia Foundation |access-date=4 May 2026}}</ref>

== See also ==
* [[Bugvi family]]
* [[Khilafat Movement]]
* [[Sher Shah Suri Mosque]]
* [[Dar-ul-Uloom Azizia, Bhera]]

== References ==
{{reflist}}

[[Category:1900 births]]
[[Category:Year of death missing]]
[[Category:People of the Khilafat Movement]]
[[Category:Pakistani Sunni Muslim scholars of Islam]]
[[Category:People from Bhera]]
[[Category:People from Sargodha District]]
[[Category:Islamia College, Lahore alumni]]
`;

(async () => {
  const wpJar = makeJar(); await login(WP_API, wpJar, WP_USER, WP_PASS);
  const wpTok = await csrf(WP_API, wpJar);

  // ---- 1. Create AIBF article ----
  console.log("→ Creating Al-Iftikhar Bugvia Foundation article");
  let r = await call(WP_API, wpJar, { action: "edit" }, {
    method: "POST",
    body: { title: "Al-Iftikhar Bugvia Foundation", text: AIBF_ARTICLE, token: wpTok, summary: "Create article on Al-Iftikhar Bugvia Foundation, registered Pakistani charity (Q139622033)", createonly: "1" },
  });
  if (r.error?.code === "abusefilter-warning") {
    console.log(`  abusefilter ${r.error.abusefilter?.id} (warn) — retry`);
    r = await call(WP_API, wpJar, { action: "edit" }, { method: "POST", body: { title: "Al-Iftikhar Bugvia Foundation", text: AIBF_ARTICLE, token: wpTok, summary: "Create article on Al-Iftikhar Bugvia Foundation", createonly: "1" } });
  }
  console.log("  " + (r.error ? "✗ " + r.error.code : "✓ rev " + r.edit?.newrevid));

  // COI on Talk
  if (!r.error || r.error.code === "articleexists") {
    const cr = await call(WP_API, wpJar, { action: "edit" }, {
      method: "POST",
      body: { title: "Talk:Al-Iftikhar Bugvia Foundation", section: "new", sectiontitle: "COI disclosure", text: `{{Connected contributor|User=Arhamanwaar|U-EH=yes|otherlinks=I am affiliated with the Al-Iftikhar Bugvia Foundation as a member of the Bugvi family. I have followed [[WP:COI]] guidance and used independent third-party sources where available (''Dawn'', Government of Punjab Directorate of Archaeology, ''Bhera.org'').}}\n\n~~~~`, token: wpTok, summary: "COI disclosure" },
    });
    console.log("  + Talk: " + (cr.error ? "✗" : "✓"));
  }

  // ---- 2. Create Maulana Zahoor article ----
  console.log("\n→ Creating Maulana Zahoor Ahmed Bugvi article");
  r = await call(WP_API, wpJar, { action: "edit" }, {
    method: "POST",
    body: { title: "Maulana Zahoor Ahmed Bugvi", text: ZAHOOR_ARTICLE, token: wpTok, summary: "Create article on Maulana Zahoor Ahmed Bugvi, Khilafat Movement organiser (Q139624176), citing peer-reviewed Global Political Review", createonly: "1" },
  });
  if (r.error?.code === "abusefilter-warning") {
    console.log(`  abusefilter ${r.error.abusefilter?.id} (warn) — retry`);
    r = await call(WP_API, wpJar, { action: "edit" }, { method: "POST", body: { title: "Maulana Zahoor Ahmed Bugvi", text: ZAHOOR_ARTICLE, token: wpTok, summary: "Create article on Maulana Zahoor Ahmed Bugvi", createonly: "1" } });
  }
  console.log("  " + (r.error ? "✗ " + r.error.code : "✓ rev " + r.edit?.newrevid));

  if (!r.error || r.error.code === "articleexists") {
    const cr = await call(WP_API, wpJar, { action: "edit" }, {
      method: "POST",
      body: { title: "Talk:Maulana Zahoor Ahmed Bugvi", section: "new", sectiontitle: "COI disclosure", text: `{{Connected contributor|User=Arhamanwaar|U-EH=yes|otherlinks=Subject is a member of the Bugvi family, of which I am a descendant. I have followed [[WP:COI]] guidance and used only independent third-party sources (peer-reviewed ''Global Political Review'', Government of Punjab Directorate of Archaeology).}}\n\n~~~~`, token: wpTok, summary: "COI disclosure" },
    });
    console.log("  + Talk: " + (cr.error ? "✗" : "✓"));
  }

  // ---- 3. Pipe-link [[Bugga Sharif]] → [[Bugga|Bugga Sharif]] in 3 articles ----
  for (const t of ["Anwaar Ahmed Bugvi", "Bugvi family"]) {
    console.log(`\n→ Pipe-linking [[Bugga Sharif]] in ${t}`);
    const cur = await call(WP_API, wpJar, { action: "query", prop: "revisions", rvprop: "content", rvslots: "main", titles: t });
    let txt = Object.values(cur.query.pages)[0].revisions[0].slots.main["*"];
    const before = txt;
    txt = txt.replace(/\[\[Bugga Sharif\]\]/g, "[[Bugga|Bugga Sharif]]");
    if (txt !== before) {
      const er = await call(WP_API, wpJar, { action: "edit" }, { method: "POST", body: { title: t, text: txt, token: wpTok, summary: "Pipe-link [[Bugga Sharif]] → [[Bugga|Bugga Sharif]] (article exists at Bugga)", nocreate: "1" } });
      console.log("  " + (er.error ? "✗ " + er.error.code : "✓ rev " + er.edit?.newrevid));
    } else console.log("  (no change needed)");
  }

  // ---- 4. Add enwiki sitelinks on Q139622033 (AIBF) and Q139624176 (Maulana) ----
  const wdJar = makeJar();
  console.log("\n→ Wikidata sitelinks");
  await login(WD_API, wdJar, WD_USER, WD_PASS);
  const wdTok = await csrf(WD_API, wdJar);

  for (const [qid, title] of [["Q139622033", "Al-Iftikhar Bugvia Foundation"], ["Q139624176", "Maulana Zahoor Ahmed Bugvi"]]) {
    const sr = await call(WD_API, wdJar, { action: "wbsetsitelink" }, {
      method: "POST",
      body: { id: qid, linksite: "enwiki", linktitle: title, token: wdTok, bot: "1", summary: "Add enwiki sitelink to new Wikipedia article" },
    });
    console.log(`  ${qid} ↔ enwiki:${title}: ` + (sr.error ? "✗ " + sr.error.code : "✓"));
  }

  console.log("\nDone.");
})().catch((e) => { console.error("\n✗", e.message); process.exit(1); });
