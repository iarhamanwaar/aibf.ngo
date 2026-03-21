"use client";

import { useLocale } from "@/lib/i18n";

const programIcons = [
  (
    <svg key="1" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
    </svg>
  ),
  (
    <svg key="2" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
    </svg>
  ),
  (
    <svg key="3" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
    </svg>
  ),
  (
    <svg key="4" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
  ),
  (
    <svg key="5" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
    </svg>
  ),
  (
    <svg key="6" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
    </svg>
  ),
];

const programKeys = [
  { titleKey: "programs.1.title", descKey: "programs.1.desc" },
  { titleKey: "programs.2.title", descKey: "programs.2.desc" },
  { titleKey: "programs.3.title", descKey: "programs.3.desc" },
  { titleKey: "programs.4.title", descKey: "programs.4.desc" },
  { titleKey: "programs.5.title", descKey: "programs.5.desc" },
  { titleKey: "programs.6.title", descKey: "programs.6.desc" },
];

export default function Programs() {
  const { locale, t } = useLocale();
  const isRTL = locale === "ur";
  const urduFont = isRTL ? "font-[family-name:var(--font-urdu)]" : "";

  return (
    <section id="programs" dir={isRTL ? "rtl" : "ltr"} className={`relative py-24 lg:py-32 bg-emerald-deep grain ${urduFont}`}>
      <div className="absolute inset-0 pattern-overlay-light" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">
            {t("programs.label")}
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-white tracking-tight">
            {t("programs.headingStart")}<span className="italic text-gold">{t("programs.headingAccent")}</span>
          </h2>
          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="w-12 h-px bg-gold/40" />
            <div className="w-1.5 h-1.5 rotate-45 bg-gold" />
            <div className="w-12 h-px bg-gold/40" />
          </div>
          <p className="mt-6 text-white/60 max-w-2xl mx-auto leading-relaxed">
            {t("programs.subtitle")}
          </p>
        </div>

        {/* Program Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programKeys.map((program, i) => (
            <div
              key={program.titleKey}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 p-8 transition-all duration-500 hover:bg-white/10 hover:border-gold/30 hover:-translate-y-1"
            >
              {/* Corner accent */}
              <div className={`absolute top-0 ${isRTL ? "left-0" : "right-0"} w-12 h-12 border-t-2 ${isRTL ? "border-l-2" : "border-r-2"} border-gold/0 group-hover:border-gold/40 transition-all duration-500`} />
              <div className={`absolute bottom-0 ${isRTL ? "right-0" : "left-0"} w-12 h-12 border-b-2 ${isRTL ? "border-r-2" : "border-l-2"} border-gold/0 group-hover:border-gold/40 transition-all duration-500`} />

              <div className="text-gold mb-5 transition-transform duration-300 group-hover:scale-110 inline-block">
                {programIcons[i]}
              </div>
              <h3 className={`text-white text-lg font-semibold mb-3 ${isRTL ? "text-right" : "text-left"}`}>
                {t(program.titleKey)}
              </h3>
              <p className={`text-white/50 text-sm leading-relaxed ${isRTL ? "text-right" : "text-left"}`}>
                {t(program.descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
