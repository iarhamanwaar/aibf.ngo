"use client";

import { useLocale } from "@/lib/i18n";

const t = {
  en: {
    label: "Our Work in Action",
    titleA: "Stories of",
    titleB: "Impact",
    intro:
      "Every number has a name. Every statistic has a story. These are the lives changed by your generosity — documented from the ground, one family at a time.",
    cases: "cases documented",
    areas: "program areas",
    families: "families helped",
    ctaLabel: "Be Part of the Next Story",
    ctaHeadA: "Help us write more stories",
    ctaHeadB: "like these",
    ctaBody:
      "Every contribution — no matter the size — becomes a chapter in someone's story of recovery, education, or new beginnings.",
    ctaButton: "Donate Now",
  },
  ur: {
    label: "ہمارا کام عمل میں",
    titleA: "اثرات کی",
    titleB: "کہانیاں",
    intro:
      "ہر عدد ایک نام ہے۔ ہر شماریات ایک کہانی ہے۔ یہ وہ زندگیاں ہیں جو آپ کی سخاوت سے بدلیں — ایک خاندان کے بعد دوسرے خاندان تک، زمینی سطح پر دستاویزی۔",
    cases: "دستاویزی کیسز",
    areas: "پروگرام شعبے",
    families: "خاندانوں کی مدد",
    ctaLabel: "اگلی کہانی کا حصہ بنیں",
    ctaHeadA: "ہمیں مزید کہانیاں لکھنے میں مدد کریں",
    ctaHeadB: "ایسی ہی",
    ctaBody:
      "ہر شراکت — چاہے کتنی بھی چھوٹی ہو — کسی کی صحت یابی، تعلیم یا نئی شروعات کا حصہ بن جاتی ہے۔",
    ctaButton: "ابھی عطیہ دیں",
  },
};

export function StoriesHero({
  totalCases,
  programAreas,
  totalFamilies,
}: {
  totalCases: number;
  programAreas: number;
  totalFamilies: string;
}) {
  const { locale } = useLocale();
  const isUr = locale === "ur";
  const c = t[locale];

  return (
    <>
      <section className="relative bg-emerald-deep pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,168,76,0.08),transparent_60%)]" />
        <div
          className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8"
          dir={isUr ? "rtl" : "ltr"}
        >
          <div className="max-w-3xl">
            <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">
              {c.label}
            </span>
            <h1
              className={`mt-4 ${
                isUr
                  ? "font-[family-name:var(--font-urdu)] text-4xl md:text-5xl lg:text-6xl leading-relaxed"
                  : "font-[family-name:var(--font-playfair)] text-5xl md:text-6xl lg:text-7xl leading-[1.1]"
              } text-white tracking-tight`}
            >
              {c.titleA} <span className="italic text-gold">{c.titleB}</span>
            </h1>
            <p className="mt-6 text-lg text-white/60 leading-relaxed max-w-2xl">
              {c.intro}
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="w-12 h-px bg-gold/40" />
              <div className="w-1.5 h-1.5 rotate-45 bg-gold" />
              <div className="w-12 h-px bg-gold/40" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-charcoal border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-6">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-gold font-semibold">{totalCases}+</span>
              <span className="text-white/50">{c.cases}</span>
            </div>
            <div className="w-px h-4 bg-white/10 hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="text-gold font-semibold">{programAreas}</span>
              <span className="text-white/50">{c.areas}</span>
            </div>
            <div className="w-px h-4 bg-white/10 hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="text-gold font-semibold">{totalFamilies}</span>
              <span className="text-white/50">{c.families}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function StoriesCTA() {
  const { locale } = useLocale();
  const isUr = locale === "ur";
  const c = t[locale];
  const donateHref = isUr ? "/ur/donate" : "/donate";

  return (
    <section className="bg-emerald-deep py-20 lg:py-28">
      <div
        className="relative z-10 mx-auto max-w-3xl px-6 lg:px-8 text-center"
        dir={isUr ? "rtl" : "ltr"}
      >
        <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">
          {c.ctaLabel}
        </span>
        <h2
          className={`mt-4 ${
            isUr
              ? "font-[family-name:var(--font-urdu)] text-2xl md:text-3xl"
              : "font-[family-name:var(--font-playfair)] text-3xl md:text-4xl"
          } text-white tracking-tight leading-tight`}
        >
          {c.ctaHeadA} <span className="italic text-gold">{c.ctaHeadB}</span>
        </h2>
        <p className="mt-6 text-white/60 leading-relaxed">{c.ctaBody}</p>
        <a
          href={donateHref}
          className="mt-8 inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-charcoal font-semibold px-8 py-3.5 rounded-sm transition-colors text-sm tracking-wide uppercase"
        >
          {c.ctaButton}
        </a>
      </div>
    </section>
  );
}
