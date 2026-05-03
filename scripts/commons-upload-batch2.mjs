#!/usr/bin/env node
// Second Commons batch: forces creation of category page (the first run's
// `createonly` apparently silently no-op'd), then uploads 15 more
// representative AIBF photographs under CC-BY-SA 4.0.
//
// Usage:
//   node --env-file=.env.wikidata scripts/commons-upload-batch2.mjs

import { openAsBlob } from "node:fs";
import { basename } from "node:path";

const COMMONS_API = "https://commons.wikimedia.org/w/api.php";
const C_USER = process.env.COMMONS_USER;
const C_PASS = process.env.COMMONS_PASS;
if (!C_USER || !C_PASS) {
  console.error("Missing COMMONS_USER / COMMONS_PASS");
  process.exit(1);
}

const COMMONS_CAT = "Al-Iftikhar Bugvia Foundation";

const FILES = [
  ["public/images/gallery/ramadan26-00000451.webp", "AIBF Ramadan 2026 ration drive 1.webp",
    "Al-Iftikhar Bugvia Foundation Ramadan 2026 ration drive in Bhera and Bugga Sharif.",
    "الافتخار بگویا فاؤنڈیشن کی رمضان 2026 راشن مہم، بھیرہ اور بگہ شریف۔"],
  ["public/images/gallery/ramadan26-00000484.webp", "AIBF Ramadan 2026 ration drive 2.webp",
    "AIBF volunteers distributing ration to families during Ramadan 2026.",
    "AIBF کے رضاکار رمضان 2026 میں خاندانوں کو راشن تقسیم کر رہے ہیں۔"],
  ["public/images/gallery/ramadan26-00000494.webp", "AIBF Ramadan 2026 ration drive 3.webp",
    "AIBF Ramadan 2026 ration distribution at one of eight locations.",
    "AIBF رمضان 2026 راشن تقسیم، آٹھ مقامات میں سے ایک۔"],
  ["public/images/gallery/ration-drive-00000617.webp", "AIBF ration drive 1.webp",
    "Ration distribution by Al-Iftikhar Bugvia Foundation.",
    "الافتخار بگویا فاؤنڈیشن کی راشن تقسیم۔"],
  ["public/images/gallery/ration-drive-00000620.webp", "AIBF ration drive 2.webp",
    "AIBF ration drive in rural Punjab.",
    "AIBF کی دیہی پنجاب میں راشن مہم۔"],
  ["public/images/gallery/auditorium-00000204.webp", "Zahoor Ahmad Bugvi Auditorium 1.webp",
    "Zahoor Ahmad Bugvi Auditorium in Bhera, inaugurated by Al-Iftikhar Bugvia Foundation in August 2025.",
    "زہور احمد بگوی آڈیٹوریم، بھیرہ، الافتخار بگویا فاؤنڈیشن کی جانب سے اگست 2025 میں افتتاح۔"],
  ["public/images/gallery/auditorium-00000208.webp", "Zahoor Ahmad Bugvi Auditorium 2.webp",
    "Interior of Zahoor Ahmad Bugvi Auditorium, named after the Khilafat Movement leader Maulana Zahoor Ahmed Bugvi.",
    "زہور احمد بگوی آڈیٹوریم کا اندرونی منظر، تحریک خلافت کے رہنما مولانا زہور احمد بگوی کے نام پر۔"],
  ["public/images/gallery/sewing-00000533.webp", "AIBF women sewing centre 1.webp",
    "Women's sewing centre operated by Al-Iftikhar Bugvia Foundation in Maliyar / Bugga.",
    "ملیار / بگہ میں الافتخار بگویا فاؤنڈیشن کا چلایا ہوا خواتین کا سلائی مرکز۔"],
  ["public/images/gallery/sewing-00000537.webp", "AIBF women sewing centre 2.webp",
    "Trainee women at the AIBF sewing centre.",
    "AIBF سلائی مرکز میں تربیت یافتہ خواتین۔"],
  ["public/images/gallery/english-course-00000281.webp", "AIBF English course Bhera 1.webp",
    "Eight-week IELTS Basic English Course conducted by Al-Iftikhar Bugvia Foundation at Zahoor Auditorium, Bhera.",
    "زہور آڈیٹوریم بھیرہ میں الافتخار بگویا فاؤنڈیشن کا 8 ہفتے کا آئیلٹس بنیادی انگریزی کورس۔"],
  ["public/images/gallery/english-course-00000339.webp", "AIBF English course Bhera 2.webp",
    "Students attending the AIBF English course in Bhera.",
    "بھیرہ میں AIBF انگریزی کورس میں شرکت کرنے والے طلباء۔"],
  ["public/images/gallery/bugga-visit-00000594.webp", "AIBF visit to Bugga Sharif 1.webp",
    "AIBF community visit and field activity at Bugga Sharif village.",
    "بگہ شریف گاؤں میں AIBF کا کمیونٹی دورہ اور فیلڈ سرگرمی۔"],
  ["public/images/gallery/bugga-visit-00000600.webp", "AIBF visit to Bugga Sharif 2.webp",
    "Field visit by Al-Iftikhar Bugvia Foundation team to Bugga Sharif.",
    "الافتخار بگویا فاؤنڈیشن کی ٹیم کا بگہ شریف کا دورہ۔"],
  ["public/images/heritage/jalsa-poster.webp", "AIBF jalsa poster.webp",
    "Poster for an AIBF community jalsa event in Bhera.",
    "بھیرہ میں AIBF کمیونٹی جلسہ تقریب کا پوسٹر۔"],
  ["public/images/heritage/keychain-display.webp", "AIBF Bhera souvenirs display.webp",
    "Display of locally-produced Bhera souvenirs at AIBF's heritage shop, Zahoor Auditorium.",
    "زہور آڈیٹوریم میں AIBF کی ورثہ دکان پر مقامی طور پر تیار کردہ بھیرہ تحائف کی نمائش۔"],
];

const cookieJar = new Map();
function applyCookies(headers) {
  for (const c of headers.getSetCookie?.() ?? []) {
    const [pair] = c.split(";");
    const eq = pair.indexOf("=");
    if (eq > 0) cookieJar.set(pair.slice(0, eq).trim(), pair.slice(eq + 1).trim());
  }
}
const cookieHeader = () => [...cookieJar.entries()].map(([k, v]) => `${k}=${v}`).join("; ");
async function api(params, { method = "GET", body, multipart } = {}) {
  const url = method === "GET" ? `${COMMONS_API}?${new URLSearchParams({ ...params, format: "json" })}` : COMMONS_API;
  const init = {
    method,
    headers: { "User-Agent": "aibf.ngo-uploader/1.1 (https://aibf.ngo)", Cookie: cookieHeader() },
  };
  if (multipart) init.body = multipart;
  else if (method === "POST") {
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
  const r = await api({ action: "login" }, { method: "POST", body: { lgname: C_USER, lgpassword: C_PASS, lgtoken: tok } });
  if (r.login.result !== "Success") throw new Error(JSON.stringify(r.login));
  console.log("✓ Logged in as", r.login.lgusername);
}

const CATEGORY_PAGE = `{{Wikidata Infobox}}

This category contains photographs and other media from the [https://aibf.ngo Al-Iftikhar Bugvia Foundation] (AIBF), a Pakistani charitable non-governmental organisation founded in 1998 by Dr Anwaar Ahmed Bugvi. The foundation is registered with the [[:en:Punjab Charity Commission|Punjab Charity Commission]] (registration no. PB-6976792864708031) and operates programmes in healthcare, education, ration distribution, livelihood support and emergency relief across [[:Category:Bhera|Bhera]], [[:Category:Bugga Sharif|Bugga Sharif]] and surrounding villages of [[:Category:Sargodha District|Sargodha District]] and [[:Category:Jhelum District|Jhelum District]] in [[:Category:Punjab, Pakistan|Punjab, Pakistan]].

The foundation continues a centuries-long tradition of religious, educational and charitable work by the [[:en:Bugvi family|Bugvi family]] of Bhera, who established Dar-ul-Uloom Azizia at the [[:en:Sher Shah Suri Mosque|Sher Shah Suri Mosque]] in 1841.

All media in this category were produced by Al-Iftikhar Bugvia Foundation and released under [[:en:Creative Commons license|Creative Commons Attribution-ShareAlike 4.0 International]].

[[Category:Charities in Pakistan]]
[[Category:Organisations based in Punjab, Pakistan]]
[[Category:Bhera]]
`;

function buildPageWikitext(descEn, descUr) {
  return `=={{int:filedesc}}==
{{Information
|description = {{en|1=${descEn}}}
{{ur|1=${descUr}}}
|date        = 2025
|source      = {{own}}
|author      = [https://aibf.ngo Al-Iftikhar Bugvia Foundation]
|permission  =
|other_versions =
}}

=={{int:license-header}}==
{{self|cc-by-sa-4.0}}

[[Category:${COMMONS_CAT}]]
`;
}

(async () => {
  await login();
  const csrf = (await api({ action: "query", meta: "tokens", type: "csrf" })).query.tokens.csrftoken;

  // Force-create / overwrite category page
  console.log("\n→ Creating Commons category page (force)");
  try {
    await api(
      { action: "edit" },
      {
        method: "POST",
        body: {
          title: `Category:${COMMONS_CAT}`,
          text: CATEGORY_PAGE,
          token: csrf,
          summary: "Create category page with description and parent categories",
        },
      },
    );
    console.log("  ✓ Category page set");
  } catch (e) {
    console.log("  warning:", e.message);
  }

  // Upload batch
  console.log("\n→ Uploading", FILES.length, "files");
  let ok = 0;
  for (const [path, name, descEn, descUr] of FILES) {
    process.stdout.write(`  ${name} … `);
    try {
      const blob = await openAsBlob(path);
      const fd = new FormData();
      fd.set("action", "upload");
      fd.set("format", "json");
      fd.set("filename", name);
      fd.set("comment", "Upload by AIBF (CC-BY-SA 4.0)");
      fd.set("text", buildPageWikitext(descEn, descUr));
      fd.set("token", csrf);
      fd.set("ignorewarnings", "1");
      fd.set("file", blob, basename(path));
      const r = await api({}, { method: "POST", multipart: fd });
      if (r.upload?.result === "Success" || r.upload?.result === "Warning") {
        console.log("✓");
        ok++;
      } else {
        console.log("?", JSON.stringify(r.upload));
      }
    } catch (e) {
      console.log("✗", e.message);
    }
  }

  console.log(`\nDone. ${ok} / ${FILES.length} uploaded.`);
  console.log("Category: https://commons.wikimedia.org/wiki/Category:" + encodeURIComponent(COMMONS_CAT));
})().catch((e) => {
  console.error("\n✗ FAILED:", e.message);
  process.exit(1);
});
