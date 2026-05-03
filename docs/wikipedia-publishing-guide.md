# Step-by-step: Publishing the three Wikipedia articles

You're logged into en.wikipedia.org as **Arhamanwaar**. Total time: ~12 minutes for all three.

**Order matters.** Publish in this order — each one references the next, and the order goes from strongest sourcing → weakest:

1. **Dar-ul-Uloom Azizia, Bhera** (peer-reviewed paper exists about it)
2. **Bugvi family** (peer-reviewed + government sources)
3. **Anwaar Ahmed Bugvi** (Dawn newspaper + holds public office)

---

## Article 1 — Dar-ul-Uloom Azizia, Bhera (~4 min)

### Step 1.1 — Open the create page
Click this URL (or paste into your browser):
```
https://en.wikipedia.org/wiki/Dar-ul-Uloom_Azizia,_Bhera
```

You'll see a page that says "Wikipedia does not have an article with this exact name." Below that there will be a red link **"Start the Dar-ul-Uloom Azizia, Bhera article"**.

### Step 1.2 — Open the editor
Click that red link. You'll be taken into the Wikipedia source editor (a big text area).

### Step 1.3 — Copy the wikitext
Open the file `docs/wikipedia-darul-uloom-azizia.md` in your editor (it's in this repo). Find the section between `=== START ===` and `=== END ===`. Inside that section is a code block that begins with `{{Short description|Islamic seminary…}}`.

**Copy everything from `{{Short description…}}` down to the last `[[Category:Islamic schools and traditions]]`.**

Do **not** include the triple-backticks (\`\`\`) or the `=== START ===` / `=== END ===` markers.

### Step 1.4 — Paste into the editor
Paste it into the Wikipedia source editor. The big text area should now have the wikitext.

### Step 1.5 — Edit summary + publish
At the bottom of the page:
- **Edit summary:** `Create article on Dar-ul-Uloom Azizia, Bhera (1841–present), peer-reviewed and government sources`
- Click **Show preview** — confirm there's no broken markup
- Click **Publish page**
- A dialog may ask "Wikipedia is for an encyclopedia article" — confirm with Publish

### Step 1.6 — Copy the URL
After publishing, the address bar will show something like:
```
https://en.wikipedia.org/wiki/Dar-ul-Uloom_Azizia,_Bhera
```
**Paste that URL back into our chat** — I'll wire it onto the related Wikidata items.

---

## Article 2 — Bugvi family (~4 min)

Same flow as above, but with this URL and file:

- URL to start: `https://en.wikipedia.org/wiki/Bugvi_family`
- Source file: `docs/wikipedia-bugvi-family.md`
- Copy from `{{Short description…}}` through the last `[[Category:People from Bhera]]`
- Edit summary: `Create article on Bugvi family of Bhera, government and academic sources`

Paste the URL back when published.

---

## Article 3 — Anwaar Ahmed Bugvi (~4 min)

- URL to start: `https://en.wikipedia.org/wiki/Anwaar_Ahmed_Bugvi`
- Source file: `docs/wikipedia-anwaar-ahmed-bugvi.md`
- Copy from `{{Short description…}}` through the last `[[Category:21st-century Pakistani physicians]]`
- Edit summary: `Create stub on Anwaar Ahmed Bugvi, Pakistani physician and AIBF founder, sourced`

Paste the URL back when published.

---

## What might go wrong, and what to do

### "There's a deletion / notability concern banner at the top"
Don't panic. Common, especially on new articles. **Click the article's "Talk" tab** and post:
> Sourcing: Government of Punjab Directorate of Archaeology (gov.pk), peer-reviewed *Iḥyāʾ al-ʿUlūm* journal, *Global Political Review* journal, and *Dawn* newspaper. The article subject is associated with Wikidata item Q139622033 (AIBF) / Q139622400 (founder) / etc. Please discuss before nominating for deletion.

### "I get an error: page already exists"
That means somebody (often you in another tab) already created it. Just edit instead.

### "The categories at the bottom show as red links"
That's fine — Wikipedia categories don't need to pre-exist for the article to publish.

### "My edit was reverted"
Check the article's history page. Most reverts happen because of formatting issues. Fix and resubmit. If a real editor objects on notability, post on the Talk page citing the sources above.

### Editor says "username conflict / paid editing"
You're a member of the Bugvi family writing about it — that's a [WP:COI](https://en.wikipedia.org/wiki/WP:COI) (conflict of interest), not a paid-editing issue. Disclose on each article's Talk page:
> **COI disclosure:** I am a member of the Bugvi family (Sahibzada Arham Anwaar Bugvi). I have followed WP:COI guidance and used only third-party reliable sources (Punjab government, peer-reviewed academic journals, *Dawn* newspaper).

---

## After all three are live

Paste the three URLs back to me. I'll then:
1. Add `P3553` (Wikipedia article in English) onto each Wikidata item:
   - Bugvi family → new family Q-item we may need to create
   - Anwaar Ahmed Bugvi → Q139622400
   - Dar-ul-Uloom Azizia → new institution Q-item we may need to create
2. Add `sitelinks` from each Wikidata item to its Wikipedia article (this is what feeds Knowledge Graph)
3. Add interwiki Urdu Wikipedia stubs if you want (later)

The whole loop will close: Wikipedia ↔ Wikidata ↔ aibf.ngo ↔ Wikimedia Commons.
