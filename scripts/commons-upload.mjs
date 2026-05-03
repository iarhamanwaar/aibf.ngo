#!/usr/bin/env node
// Uploads representative AIBF images to Wikimedia Commons under CC-BY-SA-4.0,
// then creates a Commons category page and links it back to Q139622033 via P373.
//
// Authorisation: AIBF (Arham Anwaar, on behalf of the foundation) holds the
// rights to all images under /public/images/ and authorises release under
// Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0).
// Author credit: "Al-Iftikhar Bugvia Foundation".
//
// Usage:
//   node --env-file=.env.wikidata scripts/commons-upload.mjs

import { openAsBlob } from "node:fs";
import { basename } from "node:path";

const COMMONS_API = "https://commons.wikimedia.org/w/api.php";
const WIKIDATA_API = "https://www.wikidata.org/w/api.php";
const C_USER = process.env.COMMONS_USER;
const C_PASS = process.env.COMMONS_PASS;
const W_USER = process.env.WIKIDATA_USER;
const W_PASS = process.env.WIKIDATA_PASS;
const QID = process.env.WIKIDATA_QID;

if (!C_USER || !C_PASS || !W_USER || !W_PASS || !QID) {
  console.error("Missing env vars (need COMMONS_USER/PASS, WIKIDATA_USER/PASS, WIKIDATA_QID)");
  process.exit(1);
}

const COMMONS_CAT = "Al-Iftikhar Bugvia Foundation";

// 10 representative images. [localPath, commonsBaseName, English description, Urdu description]
const FILES = [
  ["public/images/hero-masjid.webp", "Sher Shah Suri Mosque, Bhera (AIBF).webp",
    "Sher Shah Suri Mosque (Jamia Masjid Bhera), the historic 16th-century mosque under the custodianship of the Bugvi family, photographed by Al-Iftikhar Bugvia Foundation.",
    "شیر شاہ سوری مسجد (جامع مسجد بھیرہ)، 16ویں صدی کی تاریخی مسجد جو بگوی خاندان کی نگرانی میں ہے۔"],
  ["public/images/programs/medicine-thq.webp", "AIBF medicine donation to THQ Hospital Bhera.webp",
    "Medicine donation by Al-Iftikhar Bugvia Foundation to THQ Hospital, Bhera, as part of the Pakistan Red Crescent Hospital Medicine Programme.",
    "الافتخار بگویا فاؤنڈیشن کی جانب سے THQ ہسپتال بھیرہ کو ادویات کا عطیہ۔"],
  ["public/images/programs/team-with-ration.webp", "AIBF team preparing ration distribution.webp",
    "AIBF team preparing ration bags for distribution to families during the Ramadan ration drive.",
    "AIBF کی ٹیم رمضان راشن مہم کے دوران خاندانوں میں تقسیم کے لیے راشن بیگ تیار کر رہی ہے۔"],
  ["public/images/programs/sewing-machine-donation.webp", "AIBF sewing machine donation, Bhera.webp",
    "Sewing machines donated by AIBF to women's sewing centres in Maliyar and Bugga as part of women's livelihood programmes.",
    "ملیار اور بگہ کے خواتین سلائی مراکز کو AIBF کی جانب سے سلائی مشینوں کا عطیہ۔"],
  ["public/images/programs/ration-distribution.webp", "AIBF ration distribution to rural families.webp",
    "Ration distribution by AIBF to rural families in Sargodha and Jhelum districts.",
    "سرگودھا اور جہلم اضلاع میں دیہی خاندانوں میں AIBF کی راشن تقسیم۔"],
  ["public/images/programs/ration-bicycle.webp", "AIBF ration delivery by bicycle.webp",
    "Bicycle delivery of ration to remote villages by AIBF volunteers.",
    "AIBF کے رضاکاروں کی جانب سے دور دراز دیہاتوں میں سائیکل کے ذریعے راشن کی ترسیل۔"],
  ["public/images/team/team-group.webp", "AIBF team group photograph.webp",
    "Group photograph of the Al-Iftikhar Bugvia Foundation team.",
    "الافتخار بگویا فاؤنڈیشن کی ٹیم کی گروپ تصویر۔"],
  ["public/images/team/team-presentation.webp", "AIBF team presentation.webp",
    "Al-Iftikhar Bugvia Foundation team presentation event.",
    "الافتخار بگویا فاؤنڈیشن کی ٹیم کی پیشکش تقریب۔"],
  ["public/images/heritage/wood-art-masjid.webp", "Wood art at Jamia Masjid Bhera (AIBF).webp",
    "Traditional wood carving inside Jamia Masjid Bhera, documented by AIBF as part of its heritage preservation programme.",
    "جامع مسجد بھیرہ کے اندر روایتی لکڑی کی نقاشی، AIBF کے ورثہ کی بحالی پروگرام کے تحت دستاویزی۔"],
  ["public/images/programs/dispensary-medicine.webp", "AIBF dispensary medicine, Bugga.webp",
    "Medicine supply to the Bugga dispensary by AIBF, supporting daily care for over 900 patients in 2025.",
    "AIBF کی جانب سے بگہ ڈسپنسری کو ادویات کی فراہمی، 2025 میں 900 سے زائد مریضوں کی روزانہ دیکھ بھال۔"],
];

// ---------- HTTP helpers (separate cookie jars per host) ----------
function makeJar() {
  const cookies = new Map();
  return {
    apply(headers) {
      for (const c of headers.getSetCookie?.() ?? []) {
        const [pair] = c.split(";");
        const eq = pair.indexOf("=");
        if (eq > 0) cookies.set(pair.slice(0, eq).trim(), pair.slice(eq + 1).trim());
      }
    },
    header() {
      return [...cookies.entries()].map(([k, v]) => `${k}=${v}`).join("; ");
    },
  };
}

async function call(api, jar, params, { method = "GET", body, multipart } = {}) {
  const url = method === "GET" ? `${api}?${new URLSearchParams({ ...params, format: "json" })}` : api;
  const init = {
    method,
    headers: { "User-Agent": "aibf.ngo-uploader/1.0 (https://aibf.ngo)", Cookie: jar.header() },
  };
  if (multipart) {
    init.body = multipart;
  } else if (method === "POST") {
    init.headers["Content-Type"] = "application/x-www-form-urlencoded";
    init.body = new URLSearchParams({ ...params, ...body, format: "json" });
  }
  const res = await fetch(url, init);
  jar.apply(res.headers);
  const j = await res.json();
  if (j.error) throw new Error(`API error: ${JSON.stringify(j.error)}`);
  return j;
}

async function login(api, jar, user, pass) {
  const tok = (await call(api, jar, { action: "query", meta: "tokens", type: "login" })).query.tokens.logintoken;
  const r = await call(api, jar, { action: "login" }, { method: "POST", body: { lgname: user, lgpassword: pass, lgtoken: tok } });
  if (r.login.result !== "Success") throw new Error(`Login failed: ${JSON.stringify(r.login)}`);
  return r.login.lgusername;
}

// ---------- Build the per-file description page ----------
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

const CATEGORY_PAGE_WIKITEXT = `{{Wikidata Infobox}}

This category contains photographs and other media from the [https://aibf.ngo Al-Iftikhar Bugvia Foundation] (AIBF), a Pakistani charitable non-governmental organisation based in [[:Category:Bhera|Bhera]], [[:Category:Sargodha District|Sargodha District]], [[:Category:Punjab, Pakistan|Punjab]], Pakistan, founded in 1998.

[[Category:Charities in Pakistan]]
[[Category:Organisations based in Punjab, Pakistan]]
[[Category:Bhera]]
`;

// ---------- Main ----------
(async () => {
  const cJar = makeJar();
  const wJar = makeJar();

  console.log("→ Logging into Commons");
  const cUser = await login(COMMONS_API, cJar, C_USER, C_PASS);
  console.log("  ✓", cUser);

  console.log("→ Logging into Wikidata");
  const wUser = await login(WIKIDATA_API, wJar, W_USER, W_PASS);
  console.log("  ✓", wUser);

  const cCsrf = (await call(COMMONS_API, cJar, { action: "query", meta: "tokens", type: "csrf" })).query.tokens.csrftoken;
  const wCsrf = (await call(WIKIDATA_API, wJar, { action: "query", meta: "tokens", type: "csrf" })).query.tokens.csrftoken;

  // Step 1: create the category page (idempotent — fail OK if exists)
  console.log("\n→ Creating Commons category page");
  try {
    const r = await call(
      COMMONS_API,
      cJar,
      { action: "edit" },
      {
        method: "POST",
        body: {
          title: `Category:${COMMONS_CAT}`,
          text: CATEGORY_PAGE_WIKITEXT,
          token: cCsrf,
          createonly: "1",
          summary: "Create category page for AIBF media (linked from Wikidata Q139622033)",
        },
      },
    );
    console.log("  ✓ Created Category:" + COMMONS_CAT);
  } catch (e) {
    if (e.message.includes("articleexists") || e.message.includes("alreadyrolled")) {
      console.log("  (already exists — fine)");
    } else {
      console.log("  warning:", e.message);
    }
  }

  // Step 2: upload each file
  console.log("\n→ Uploading", FILES.length, "files");
  const uploaded = [];
  for (const [path, name, descEn, descUr] of FILES) {
    process.stdout.write(`  ${name} … `);
    try {
      const blob = await openAsBlob(path);
      const fd = new FormData();
      fd.set("action", "upload");
      fd.set("format", "json");
      fd.set("filename", name);
      fd.set("comment", `Upload by AIBF for use in Wikidata Q139622033 (CC-BY-SA 4.0)`);
      fd.set("text", buildPageWikitext(descEn, descUr));
      fd.set("token", cCsrf);
      fd.set("ignorewarnings", "1");
      fd.set("file", blob, basename(path));
      const r = await call(COMMONS_API, cJar, {}, { method: "POST", multipart: fd });
      if (r.upload?.result === "Success" || r.upload?.result === "Warning") {
        console.log("✓");
        uploaded.push(r.upload.filename || name);
      } else {
        console.log("?", JSON.stringify(r.upload));
      }
    } catch (e) {
      console.log("✗", e.message);
    }
  }

  // Step 3: link Commons category from Q139622033 via P373
  if (uploaded.length) {
    console.log("\n→ Adding P373 (Commons category) to Q139622033");
    const claim = {
      mainsnak: {
        snaktype: "value",
        property: "P373",
        datavalue: { value: COMMONS_CAT, type: "string" },
      },
      type: "statement",
      rank: "normal",
      references: [
        {
          snaks: { P854: [{ snaktype: "value", property: "P854", datavalue: { value: `https://commons.wikimedia.org/wiki/Category:${encodeURIComponent(COMMONS_CAT)}`, type: "string" }, datatype: "url" }] },
          "snaks-order": ["P854"],
        },
      ],
    };
    const r = await call(
      WIKIDATA_API,
      wJar,
      { action: "wbeditentity" },
      {
        method: "POST",
        body: {
          id: QID,
          data: JSON.stringify({ claims: { P373: [claim] } }),
          token: wCsrf,
          bot: "1",
          summary: "Add P373 (Commons category) link",
        },
      },
    );
    console.log("  ✓ rev", r.entity?.lastrevid);
  }

  console.log("\nDone.");
  console.log("  Category: https://commons.wikimedia.org/wiki/Category:" + encodeURIComponent(COMMONS_CAT));
  console.log("  Files uploaded:", uploaded.length);
})().catch((e) => {
  console.error("\n✗ FAILED:", e.message);
  process.exit(1);
});
