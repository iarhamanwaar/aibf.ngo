"use client";

import { useLocale } from "@/lib/i18n";

const statKeys = [
  { numberKey: "impact.stat1.number", labelKey: "impact.stat1.label", subKey: "impact.stat1.sub" },
  { numberKey: "impact.stat2.number", labelKey: "impact.stat2.label", subKey: "impact.stat2.sub" },
  { numberKey: "impact.stat3.number", labelKey: "impact.stat3.label", subKey: "impact.stat3.sub" },
  { numberKey: "impact.stat4.number", labelKey: "impact.stat4.label", subKey: "impact.stat4.sub" },
];

export default function Impact() {
  const { locale, t } = useLocale();
  const isRTL = locale === "ur";
  const urduFont = isRTL ? "font-[family-name:var(--font-urdu)]" : "";

  return (
    <section id="impact" dir={isRTL ? "rtl" : "ltr"} className={`relative py-24 lg:py-32 bg-cream overflow-hidden ${urduFont}`}>

      {/* Decorative circles */}
      <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full border border-gold/10" />
      <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full border border-emerald-light/10" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">
            {t("impact.label")}
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-charcoal tracking-tight">
            {t("impact.headingStart")}<span className="italic text-emerald-deep">{t("impact.headingAccent")}</span>
          </h2>
          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="w-12 h-px bg-gold/40" />
            <div className="w-1.5 h-1.5 rotate-45 bg-gold" />
            <div className="w-12 h-px bg-gold/40" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {statKeys.map((stat) => (
            <div key={stat.labelKey} className="text-center group">
              <div className="relative inline-block">
                <span className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl font-bold text-emerald-deep">
                  {t(stat.numberKey)}
                </span>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
              </div>
              <h3 className="mt-4 text-charcoal font-semibold text-sm tracking-wide uppercase">
                {t(stat.labelKey)}
              </h3>
              <p className="mt-1 text-warm-gray text-xs">{t(stat.subKey)}</p>
            </div>
          ))}
        </div>

        {/* Testimonial / Mission statement */}
        <div className="mt-24 max-w-3xl mx-auto text-center">
          <div className="bg-white border border-cream-dark p-10 md:p-14 relative">
            {/* Quote mark */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-cream px-4">
              <span className="font-[family-name:var(--font-playfair)] text-5xl text-gold">
                &#10077;
              </span>
            </div>

            <p className="font-[family-name:var(--font-playfair)] text-charcoal text-xl md:text-2xl leading-relaxed italic">
              {t("impact.quote")}
            </p>

            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="w-12 h-px bg-gold/40" />
              <div className="w-1.5 h-1.5 rotate-45 bg-gold" />
              <div className="w-12 h-px bg-gold/40" />
            </div>

            <p className="mt-4 text-warm-gray text-sm tracking-wide uppercase">
              {t("impact.quoteAttrib")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
