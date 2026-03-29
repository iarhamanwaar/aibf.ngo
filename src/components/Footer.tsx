"use client";

import { useLocale } from "@/lib/i18n";

export default function Footer() {
  const { locale, t } = useLocale();
  const isRTL = locale === "ur";
  const urduFont = isRTL ? "font-[family-name:var(--font-urdu)]" : "";

  const quickLinks = [
    { href: "/about", key: "footer.link.about" },
    { href: "/programs", key: "footer.link.programs" },
    { href: "/stories", key: "footer.link.stories" },
    { href: "/gallery", key: "footer.link.gallery" },
    { href: "/donate", key: "footer.link.donate" },
    { href: "/#contact", key: "footer.link.contact" },
  ];

  const legalLinks = [
    { href: "/privacy", key: "footer.link.privacy" },
    { href: "/terms", key: "footer.link.terms" },
    { href: "/refund", key: "footer.link.refund" },
  ];

  return (
    <footer dir={isRTL ? "rtl" : "ltr"} className={`bg-charcoal py-16 ${urduFont}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className={isRTL ? "text-right" : "text-left"}>
            <div className={`flex items-center gap-3 mb-4 ${isRTL ? "flex-row-reverse justify-end" : ""}`}>
              <img src="/logo-icon-white.png" alt="AIBF" className="h-10 w-auto object-contain" />
              <div className={isRTL ? "text-right" : "text-left"}>
                <span className="text-white font-semibold text-sm block leading-tight">
                  {t("footer.orgName")}
                </span>
                <span className="text-gold-light text-[10px] tracking-[0.2em] uppercase">
                  {t("footer.servingSince")}
                </span>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mt-4">
              {t("footer.desc")}
            </p>
            {/* Social — Instagram */}
            <div className={`mt-6 flex items-center gap-4 ${isRTL ? "justify-end" : ""}`}>
              <a
                href="https://www.instagram.com/aibf_org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-gold transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={isRTL ? "text-right" : "text-left"}>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              {t("footer.quickLinks")}
            </h4>
            <div className="space-y-2">
              {quickLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  className="block text-white/40 hover:text-gold text-sm transition-colors"
                >
                  {t(link.key)}
                </a>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div className={isRTL ? "text-right" : "text-left"}>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              {t("footer.legal")}
            </h4>
            <div className="space-y-2">
              {legalLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  className="block text-white/40 hover:text-gold text-sm transition-colors"
                >
                  {t(link.key)}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className={isRTL ? "text-right" : "text-left"}>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              {t("footer.contact")}
            </h4>
            <div className="space-y-2 text-white/40 text-sm">
              <p dir="ltr">{t("contact.phone.value")}</p>
              <p>{t("contact.email.value")}</p>
              <p className="leading-relaxed">
                {isRTL
                  ? "شیر شاہی جامع مسجد بگویا، بھیرہ، سرگودھا، پاکستان"
                  : "Sher Shahi Jamia Masjid Bugvia, Bhera, Sargodha, Pakistan"}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={`mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 ${isRTL ? "md:flex-row-reverse" : ""}`}>
          <p className="text-white/30 text-xs">
            &copy; {new Date().getFullYear()} {t("footer.copyright")}
          </p>
          <p className="text-white/20 text-xs">
            {t("footer.projectOf")}
            <a
              href="https://bugvi.org"
              className="text-gold/40 hover:text-gold transition-colors"
            >
              {t("footer.bugviFamily")}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
