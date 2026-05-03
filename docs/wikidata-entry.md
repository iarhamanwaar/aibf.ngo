# Wikidata Entry Draft — Al-Iftikhar Bugvia Foundation

**Goal:** Create a Wikidata entity for AIBF so that ChatGPT, Perplexity, Google AI Overviews, and Claude treat the organisation as a known entity. Single highest-leverage off-platform SEO move.

**How to submit:** Sign in at https://www.wikidata.org → "Create a new Item" → use the values below. Add each statement (P… property) in the UI.

---

## Labels & descriptions

| Language | Label | Description | Aliases |
|---|---|---|---|
| English (en) | `Al-Iftikhar Bugvia Foundation` | charity organization in Pakistan | `AIBF`, `Al Iftikhar Bugvia Foundation`, `Bugvia Foundation` |
| Urdu (ur) | `الافتخار بگویا فاؤنڈیشن` | پاکستان میں خیراتی تنظیم | `AIBF`, `بگویا فاؤنڈیشن` |

---

## Statements (key claims)

| Property | Label | Value |
|---|---|---|
| **P31** | instance of | `non-governmental organization` (Q79913) AND `charitable organization` (Q708676) |
| **P17** | country | `Pakistan` (Q843) |
| **P159** | headquarters location | `Bhera` (Q2425889) |
| **P131** | located in admin entity | `Sargodha District` (Q1023408) |
| **P571** | inception | `1998` |
| **P112** | founded by | `Dr. Anwaar Ahmed Bugvi` (create as new Q-item if no entry exists) |
| **P1448** | official name | `Al-Iftikhar Bugvia Foundation` (en) / `الافتخار بگویا فاؤنڈیشن` (ur) |
| **P856** | official website | `https://aibf.ngo` |
| **P2002** | Instagram username | `aibf_org` |
| **P968** | email address | `contact@aibf.ngo` |
| **P1329** | phone number | `+92-301-6701340` |
| **P137** | operator | (self) |
| **P452** | industry | `social work` (Q5392571) |
| **P101** | field of work | `healthcare` (Q31207), `education` (Q8434), `disaster relief` (Q193181), `microfinance` (Q193562) |
| **P5052** | registration ID | `PB-6976792864708031` (qualifier: registration authority = Punjab Charity Commission) |
| **P127** | owned by | (omit) |
| **P749** | parent organization | (omit, AIBF is independent) |
| **P1830** | owner of | (omit) |
| **P1056** | product or material | (omit) |
| **P3018** | located in protected area | (omit) |
| **P527** | has part | `5 dispensaries`, `2 sewing centres`, `Zahoor Ahmad Bugvi Auditorium` (qualifier statements) |

### References to add to each statement

For every statement above, add a reference (P854 = `reference URL`):
- `https://aibf.ngo/about`
- `https://aibf.ngo/financials`
- `https://aibf.ngo/llms.txt`

This is critical — unsourced statements get reverted by Wikidata patrollers.

---

## Identifiers (P-codes for external IDs to fill in later)

- `P3417` — Quora topic ID (only if AIBF Quora topic exists)
- `P2003` — Instagram username → already covered above

---

## Suggested first three external citations to acquire (for backlinks)

These help the Wikidata item survive review and feed Google's Knowledge Graph:

1. **Punjab Charity Commission directory** — request inclusion at https://pcc.punjab.gov.pk/ with registration number `PB-6976792864708031`. Public listing creates a `.gov.pk` backlink.
2. **Pakistan Red Crescent Society partner page** — ask Red Crescent Society Punjab to list AIBF as a partner organisation on their site (the partnership is already real per the May 2025 milestone). PRCS site links carry weight.
3. **Local press mention** — pitch one Bhera/Sargodha local news outlet (e.g., Daily Pakistan, Dunya News regional, or Dawn local section) on a recent campaign (Ramadan 2026 ration drive: 140 bags, Rs 700,000+ — newsworthy). Even one news article with a `aibf.ngo` link unlocks news rich-result eligibility.

---

## After submission

Once the Wikidata item exists, add its Q-number back into AIBF's structured data. Edit `src/components/StructuredData.tsx`:

```ts
sameAs: [
  "https://www.instagram.com/aibf_org",
  "https://www.wikidata.org/wiki/Q__________",  // ← paste Q-number here
],
```

This closes the loop: Wikidata → AIBF site → Wikidata. Google and AI search engines treat that bidirectional link as strong entity verification.
