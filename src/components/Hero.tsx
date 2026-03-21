"use client";

import { useLocale } from "@/lib/i18n";

export default function Hero() {
  const { locale, t } = useLocale();
  const isRTL = locale === "ur";
  const urduFont = isRTL ? "font-[family-name:var(--font-urdu)]" : "";

  return (
    <section
      dir={isRTL ? "rtl" : "ltr"}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${urduFont}`}
    >
      {/* Full-bleed background photo */}
      <img
        src="/images/hero-masjid.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-emerald-deep" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Logo */}
        <div className="animate-fade-in-up opacity-0 mb-6">
          <img
            src="/logo-icon-white.png"
            alt="AIBF Logo"
            className="h-[100px] w-auto mx-auto object-contain"
          />
        </div>

        {/* Badge */}
        <div className="animate-fade-in-up opacity-0 mb-8">
          <span className="inline-block text-gold text-xs tracking-[0.3em] uppercase font-medium border border-gold/30 px-5 py-2">
            {t("hero.established")}
          </span>
        </div>

        {/* Title */}
        <h1 className="animate-fade-in-up opacity-0 animate-delay-100 font-[family-name:var(--font-playfair)] text-5xl md:text-7xl lg:text-8xl text-white leading-[1.1] tracking-tight">
          {t("hero.titleLine1")}
          <br />
          <span className="text-gold italic">{t("hero.titleLine2Accent")}</span>{" "}
          {t("hero.titleLine2Rest")}
        </h1>

        {/* Ornament */}
        <div className="animate-fade-in-up opacity-0 animate-delay-200 my-8 flex items-center justify-center gap-4">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/60" />
          <div className="w-2 h-2 rotate-45 bg-gold" />
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/60" />
        </div>

        {/* Subtitle */}
        <p className="animate-fade-in-up opacity-0 animate-delay-300 text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
          {t("hero.subtitle")}
        </p>

        {/* CTA Buttons */}
        <div className={`animate-fade-in-up opacity-0 animate-delay-400 mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 ${isRTL ? "sm:flex-row-reverse" : ""}`}>
          <a
            href="#donate"
            className={`group bg-gold hover:bg-gold-light text-emerald-deep px-8 py-4 text-sm font-semibold tracking-widest uppercase transition-all duration-300 hover:shadow-xl hover:shadow-gold/20 flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
          >
            {t("hero.cta.support")}
            <svg
              className={`w-4 h-4 transition-transform ${isRTL ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
          <a
            href="#about"
            className="border border-white/20 hover:border-gold/50 text-white/80 hover:text-gold px-8 py-4 text-sm font-medium tracking-widest uppercase transition-all duration-300"
          >
            {t("hero.cta.learn")}
          </a>
        </div>

      </div>
    </section>
  );
}
