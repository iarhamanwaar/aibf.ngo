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
      style={{ background: "linear-gradient(135deg, #0d3a2a 0%, #1a4a38 40%, #2d5a45 100%)" }}
    >
      {/* Warm amber overlay for golden-hour feel */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 70% 20%, rgba(201, 168, 76, 0.15) 0%, transparent 60%)" }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 80%, rgba(201, 168, 76, 0.08) 0%, transparent 50%)" }} />

      {/* Background pattern */}
      <div className="absolute inset-0 pattern-overlay-light" />

      {/* Warm overlay tint */}
      <div className="absolute inset-0 warm-overlay" />

      {/* Bottom fade to cream */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent" />

      {/* Decorative geometric elements */}
      <div className="absolute top-20 right-10 w-64 h-64 border border-gold/10 rotate-45 hidden lg:block" />
      <div className="absolute top-32 right-22 w-48 h-48 border border-gold/5 rotate-45 hidden lg:block" />
      <div className="absolute bottom-40 left-10 w-32 h-32 border border-gold/10 rotate-12 hidden lg:block" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Logo */}
        <div className="animate-fade-in-up opacity-0 mb-6">
          <img
            src="/logo-icon-white.png"
            alt="AIBF Logo"
            className="h-[120px] w-auto mx-auto object-contain"
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

        {/* Scroll indicator */}
        <div className="animate-fade-in-up opacity-0 animate-delay-500 absolute bottom-12 left-1/2 -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-gold/60 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
