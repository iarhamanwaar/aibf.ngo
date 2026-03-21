# CLAUDE.md - aibf.ngo

## Project Overview

Website for Al-Iftikhar Bugvia Foundation (AIBF), a registered NGO serving rural communities in Pakistan since 1998. Built with Next.js and deployed as a static site on Cloudflare Pages.

## Tech Stack

- **Framework:** Next.js 16 (App Router, static export via `output: "export"`)
- **Styling:** Tailwind CSS v4
- **Fonts:** Outfit (body), Playfair Display (headings), Gulzar (Urdu text)
- **Hosting:** Cloudflare Pages (auto-deploys from `main` via GitHub)
- **Domain:** aibf.ngo (DNS on Cloudflare)
- **API:** Shared Cloudflare Worker (`bugvi-api`) for contact form → stored in D1 database
- **Analytics:** Google Analytics (G-DTJCXBD4FP), Cloudflare Web Analytics
- **Email:** Cloudflare Email Routing (contact@aibf.ngo → arhamanwaar@gmail.com)

## Directory Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout (fonts, metadata, GA, structured data)
│   ├── page.tsx            # Homepage (assembles all sections)
│   ├── globals.css         # Tailwind imports, animations, custom styles
│   ├── favicon.ico
│   ├── privacy/page.tsx    # Privacy Policy
│   ├── terms/page.tsx      # Terms & Conditions
│   ├── refund/page.tsx     # Refund Policy
│   └── services/page.tsx   # Services/Programs listing
├── components/
│   ├── Navbar.tsx          # Fixed navbar with logo, nav links, language toggle
│   ├── Hero.tsx            # Hero with masjid background photo
│   ├── About.tsx           # About section with founder quote + value cards
│   ├── Programs.tsx        # 6 program cards on dark background
│   ├── Impact.tsx          # Stats grid + mission quote
│   ├── InstagramCTA.tsx    # Instagram follow section
│   ├── Donate.tsx          # Bank details (Faysal Bank) + copy IBAN
│   ├── Contact.tsx         # Contact info + form + Google Maps embed
│   ├── Footer.tsx          # Footer with links, Instagram, legal
│   ├── ClientLayout.tsx    # Client wrapper for locale context
│   └── StructuredData.tsx  # JSON-LD Organization schema
└── lib/
    ├── i18n.tsx            # LocaleProvider context + useLocale hook
    └── translations.ts     # Complete EN/UR translations for all text
public/
├── images/                 # Masjid and Bhera photos
├── logo-icon.png           # Dome icon (dark, for light backgrounds)
├── logo-icon-white.png     # Dome icon (white, for dark backgrounds)
├── logo-text.png           # Text portion of logo
├── logo-text-white.png     # White text for dark backgrounds
├── logo-full.png           # Full logo with transparency
├── robots.txt              # SEO + AI crawler access
├── sitemap.xml             # All pages
└── llms.txt                # AI discoverability
```

## i18n System

- Context-based locale switching (no URL-based routing)
- `useLocale()` hook returns `{ locale, setLocale, t }`
- `t("key")` looks up translations from `src/lib/translations.ts`
- When locale is `ur`: applies Gulzar font, `dir="rtl"`, RTL flex/text classes
- Language toggle in navbar switches between EN and UR

## Key Patterns

### Bilingual Text
All user-visible text uses `t("translation.key")`. Never hardcode English or Urdu strings in components.

### Dark/Light Logo
- Dark backgrounds (navbar, hero, programs, donate, footer): use `logo-icon-white.png`
- Light backgrounds (about, impact, contact): use `logo-icon.png`

### Contact Form
- POSTs to `https://bugvi-api.arhamanwaar.workers.dev/api/contact`
- Stores in D1 database + sends email notification to arhamanwaar@gmail.com via MailChannels
- CORS allows both `bugvi.org` and `aibf.ngo` origins

### Bank Details
- Single account: Faysal Bank, MBS Bhera (3353)
- IBAN: PK45FAYS3353499000006131
- Account Title: Al Iftikhar Bugvia Foundation

## Deployment

- Push to `main` → Cloudflare Pages auto-builds and deploys
- Build command: `npm run build`
- Output directory: `out` (static export)
- No server-side features — pure static HTML

## Cloudflare Services

- **Cloudflare Pages:** Static site hosting
- **Email Routing:** contact@aibf.ngo, info@aibf.ngo, donate@aibf.ngo, admin@aibf.ngo → arhamanwaar@gmail.com
- **DNS:** Managed on Cloudflare
- **Web Analytics:** Privacy-friendly analytics (token in layout.tsx)

## Related Projects

- **bugvi.org** — Bugvi Family website (static HTML, same Cloudflare account)
- **bugvi-api** — Shared Cloudflare Worker for contact forms (in ~/projects/bugvi.org/worker/)
