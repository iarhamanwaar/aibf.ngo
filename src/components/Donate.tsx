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

  const impacts = [1, 2, 3, 4].map((n) => ({
    amount: t(`donate.suggest${n}.amount`),
    label: t(`donate.suggest${n}.label`),
    icon: t(`donate.suggest${n}.icon`),
  }));

  return (
    <section
      id="donate"
      dir={isRTL ? "rtl" : "ltr"}
      className={`relative py-24 lg:py-32 bg-emerald-deep ${urduFont}`}
    >
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16`}>
          <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">
            {t("donate.label")}
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-white tracking-tight leading-tight">
            {t("donate.headingLine1")}
            <span className="italic text-gold">{t("donate.headingAccent")}</span>
            <br />
            {t("donate.headingLine2")}
          </h2>
          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="w-12 h-px bg-gold/40" />
            <div className="w-1.5 h-1.5 rotate-45 bg-gold" />
            <div className="w-12 h-px bg-gold/40" />
          </div>
          <p className="mt-6 text-white/60 max-w-2xl mx-auto leading-relaxed">
            {t("donate.p1")}
          </p>
        </div>

        {/* Impact Stories — horizontal scroll on mobile, grid on desktop */}
        <div className="mb-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {impacts.map((impact, i) => (
              <div
                key={i}
                className="group relative bg-white/[0.03] border border-white/[0.08] p-6 lg:p-8 text-center transition-all duration-500 hover:bg-white/[0.08] hover:border-gold/30 hover:-translate-y-1"
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gold group-hover:w-full transition-all duration-500" />

                <span className="text-3xl block mb-4">{impact.icon}</span>

                <p className="font-[family-name:var(--font-playfair)] text-gold text-2xl lg:text-3xl font-semibold">
                  {impact.amount}
                </p>

                <div className="my-3 mx-auto w-6 h-px bg-white/20" />

                <p className="text-white/50 text-sm leading-relaxed">
                  {impact.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: Bank Details + Accepted Types side by side */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Bank Details */}
          <div
            className={`bg-white/5 border border-white/10 p-8 md:p-10 ${isRTL ? "text-right" : "text-left"}`}
          >
            <h3 className="text-gold font-[family-name:var(--font-playfair)] text-2xl mb-6">
              {t("donate.bankTitle")}
            </h3>

            <div className="space-y-5">
              <div>
                <label className="text-white/40 text-xs tracking-wider uppercase block mb-1">
                  {t("donate.bank.label")}
                </label>
                <p className="text-white font-medium">{t("donate.bank.value")}</p>
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
                navigator.clipboard?.writeText("PK45FAYS3353499000006131");
              }}
              className="mt-6 w-full bg-gold hover:bg-gold-light text-emerald-deep py-3 font-semibold text-sm tracking-widest uppercase transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
            >
              {t("donate.copyIban")}
            </button>
          </div>

          {/* Right side — accepted types + note */}
          <div className={`space-y-8 ${isRTL ? "text-right" : "text-left"}`}>
            <div>
              <p className="text-white/60 leading-relaxed">{t("donate.p2")}</p>
            </div>

            {/* Accepted types */}
            <div>
              <p className="text-white/40 text-xs tracking-wider uppercase mb-3">
                {isRTL ? "قبول شدہ عطیات" : "We Accept"}
              </p>
              <div className={`flex flex-wrap gap-3 ${isRTL ? "justify-end" : ""}`}>
                {donationTypes.map((type) => (
                  <span
                    key={type}
                    className="border border-gold/30 text-gold text-sm tracking-wide px-5 py-2 uppercase"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>

            {/* International transfers note */}
            <div className="border-t border-white/10 pt-6">
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

            {/* WhatsApp quick donate */}
            <a
              href="https://wa.me/923016701340?text=Assalam%20o%20Alaikum%2C%20I%20would%20like%20to%20donate%20to%20AIBF"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 hover:shadow-lg ${isRTL ? "flex-row-reverse" : ""}`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {isRTL ? "واٹس ایپ پر عطیہ دیں" : "Donate via WhatsApp"}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
