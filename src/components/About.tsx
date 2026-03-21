"use client";

import { useLocale } from "@/lib/i18n";

export default function About() {
  const { locale, t } = useLocale();
  const isRTL = locale === "ur";
  const urduFont = isRTL ? "font-[family-name:var(--font-urdu)]" : "";

  const values = [
    { icon: "\uD83D\uDCD6", titleKey: "about.value1.title", descKey: "about.value1.desc" },
    { icon: "\uD83C\uDFE5", titleKey: "about.value2.title", descKey: "about.value2.desc" },
    { icon: "\uD83E\uDD1D", titleKey: "about.value3.title", descKey: "about.value3.desc" },
    { icon: "\uD83D\uDD4C", titleKey: "about.value4.title", descKey: "about.value4.desc" },
  ];

  return (
    <section id="about" dir={isRTL ? "rtl" : "ltr"} className={`relative py-24 lg:py-32 bg-cream ${urduFont}`}>
      <div className="absolute inset-0 pattern-overlay" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">
            {t("about.label")}
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-charcoal tracking-tight">
            {t("about.headingStart")}<span className="italic text-emerald-deep">{t("about.headingAccent")}</span>
          </h2>
          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="w-12 h-px bg-gold/40" />
            <div className="w-1.5 h-1.5 rotate-45 bg-gold" />
            <div className="w-12 h-px bg-gold/40" />
          </div>
        </div>

        {/* Two-column layout */}
        <div className={`grid lg:grid-cols-2 gap-16 items-start`}>
          {/* Left — Story */}
          <div className="space-y-6">
            <p className={`text-warm-gray text-lg leading-relaxed ${isRTL ? "text-right" : "text-left"}`}>
              {t("about.p1")}
            </p>
            <p className={`text-warm-gray leading-relaxed ${isRTL ? "text-right" : "text-left"}`}>
              {t("about.p2")}
            </p>
            <p className={`text-warm-gray leading-relaxed ${isRTL ? "text-right" : "text-left"}`}>
              {t("about.p3")}
            </p>

            {/* Founder quote */}
            <blockquote className={`mt-8 py-2 ${isRTL ? "border-r-4 border-l-0 pr-6 pl-0" : "border-l-4 pl-6"} border-gold`}>
              <p className={`text-charcoal italic font-[family-name:var(--font-playfair)] text-lg leading-relaxed ${isRTL ? "text-right" : "text-left"}`}>
                {t("about.quote")}
              </p>
              <footer className={`mt-3 text-warm-gray text-sm ${isRTL ? "text-right" : "text-left"}`}>
                {t("about.quoteAuthor")}
              </footer>
            </blockquote>
          </div>

          {/* Right — Values cards */}
          <div className="space-y-4">
            {values.map((value) => (
              <div
                key={value.titleKey}
                className="group bg-white p-6 border border-cream-dark hover:border-gold/30 transition-all duration-300 hover:shadow-lg hover:shadow-gold/5"
              >
                <div className={`flex items-start gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <span className="text-2xl flex-shrink-0 mt-1">{value.icon}</span>
                  <div className={isRTL ? "text-right" : "text-left"}>
                    <h3 className="font-semibold text-charcoal text-lg">
                      {t(value.titleKey)}
                    </h3>
                    <p className="mt-1 text-warm-gray text-sm leading-relaxed">
                      {t(value.descKey)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
