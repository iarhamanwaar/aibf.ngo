"use client";

import { useLocale } from "@/lib/i18n";

export default function Donate() {
  const { locale, t } = useLocale();
  const isRTL = locale === "ur";
  const urduFont = isRTL ? "font-[family-name:var(--font-urdu)]" : "";

  const donationTypes = [
    t("donate.type.zakat"),
    t("donate.type.sadqa"),
    t("donate.type.charity"),
    t("donate.type.donations"),
  ];

  return (
    <section id="donate" dir={isRTL ? "rtl" : "ltr"} className={`relative py-24 lg:py-32 bg-emerald-deep grain ${urduFont}`}>
      <div className="absolute inset-0 pattern-overlay-light" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left -- Message */}
          <div className={isRTL ? "text-right" : "text-left"}>
            <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">
              {t("donate.label")}
            </span>
            <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-white tracking-tight leading-tight">
              {t("donate.headingLine1")}<span className="italic text-gold">{t("donate.headingAccent")}</span>
              <br />
              {t("donate.headingLine2")}
            </h2>

            <div className={`mt-6 flex items-start gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
              <div className="w-12 h-px bg-gold/40 mt-3" />
              <div className="w-1.5 h-1.5 rotate-45 bg-gold mt-1.5" />
            </div>

            <p className="mt-6 text-white/60 leading-relaxed">
              {t("donate.p1")}
            </p>

            <p className="mt-4 text-white/60 leading-relaxed">
              {t("donate.p2")}
            </p>

            {/* Accepted types */}
            <div className={`mt-8 flex flex-wrap gap-3 ${isRTL ? "justify-end" : ""}`}>
              {donationTypes.map((type) => (
                <span
                  key={type}
                  className="border border-gold/30 text-gold text-xs tracking-wide px-4 py-1.5 uppercase"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>

          {/* Right -- Bank Details */}
          <div className={isRTL ? "text-right" : "text-left"}>
            <h3 className="text-gold font-[family-name:var(--font-playfair)] text-2xl mb-6">
              {t("donate.bankTitle")}
            </h3>

            <div className="space-y-6">
              {/* Bank Option 1 */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 md:p-8">
                <span className="inline-block text-gold text-xs tracking-[0.2em] uppercase font-semibold border border-gold/30 px-3 py-1 mb-5">
                  {t("donate.bank1.option")}
                </span>

                <div className="space-y-4">
                  <div>
                    <label className="text-white/40 text-xs tracking-wider uppercase block mb-1">
                      {t("donate.bank.label")}
                    </label>
                    <p className="text-white font-medium">
                      {t("donate.bank.value")}
                    </p>
                  </div>

                  <div>
                    <label className="text-white/40 text-xs tracking-wider uppercase block mb-1">
                      {t("donate.account.label")}
                    </label>
                    <p className="text-white font-medium">
                      {t("donate.account.value")}
                    </p>
                  </div>

                  <div>
                    <label className="text-white/40 text-xs tracking-wider uppercase block mb-1">
                      {t("donate.iban.label")}
                    </label>
                    <p className="text-gold font-mono text-lg tracking-wider" dir="ltr">
                      {t("donate.iban.value")}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    navigator.clipboard?.writeText("PK81MUCB0038901010010262");
                  }}
                  className="mt-4 w-full bg-gold hover:bg-gold-light text-emerald-deep py-2.5 font-semibold text-sm tracking-widest uppercase transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
                >
                  {t("donate.copyIban")}
                </button>
              </div>

              {/* Bank Option 2 */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 md:p-8">
                <span className="inline-block text-gold text-xs tracking-[0.2em] uppercase font-semibold border border-gold/30 px-3 py-1 mb-5">
                  {t("donate.bank2.option")}
                </span>

                <div className="space-y-4">
                  <div>
                    <label className="text-white/40 text-xs tracking-wider uppercase block mb-1">
                      {t("donate.bank2.label")}
                    </label>
                    <p className="text-white font-medium">
                      {t("donate.bank2.value")}
                    </p>
                  </div>

                  <div>
                    <label className="text-white/40 text-xs tracking-wider uppercase block mb-1">
                      {t("donate.account2.label")}
                    </label>
                    <p className="text-white font-medium">
                      {t("donate.account2.value")}
                    </p>
                  </div>

                  <div>
                    <label className="text-white/40 text-xs tracking-wider uppercase block mb-1">
                      {t("donate.iban2.label")}
                    </label>
                    <p className="text-gold font-mono text-lg tracking-wider" dir="ltr">
                      {t("donate.iban2.value")}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    navigator.clipboard?.writeText("PK61ASCM0007290200003912");
                  }}
                  className="mt-4 w-full bg-gold hover:bg-gold-light text-emerald-deep py-2.5 font-semibold text-sm tracking-widest uppercase transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
                >
                  {t("donate.copyIban2")}
                </button>
              </div>
            </div>

            {/* International transfers note */}
            <div className="mt-6 border-t border-white/10 pt-6">
              <p className="text-white/40 text-sm leading-relaxed">
                {t("donate.intl")}
                <a
                  href="#contact"
                  className="text-gold underline underline-offset-4 hover:text-gold-light transition-colors"
                >
                  {t("donate.intl.link")}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
