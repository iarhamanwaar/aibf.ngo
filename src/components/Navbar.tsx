"use client";

import { useState, useEffect } from "react";
import { useLocale } from "@/lib/i18n";

const navKeys = [
  { href: "/#about", key: "nav.about" },
  { href: "/#programs", key: "nav.programs" },
  { href: "/#impact", key: "nav.impact" },
  { href: "/#donate", key: "nav.donate" },
  { href: "/#contact", key: "nav.contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { locale, setLocale, t } = useLocale();
  const isRTL = locale === "ur";
  const urduFont = isRTL ? "font-[family-name:var(--font-urdu)]" : "";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      dir={isRTL ? "rtl" : "ltr"}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${urduFont} ${
        scrolled
          ? "bg-emerald-deep/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <a href="/" className={`flex items-center gap-2 group flex-shrink-0 ${isRTL ? "flex-row-reverse" : ""}`}>
            <img
              src="/logo-icon-white.png"
              alt="AIBF"
              className="h-12 w-auto object-contain"
            />
            <img
              src="/logo-text-white.png"
              alt="Al-Iftikhar Bugvia Foundation"
              className="h-7 w-auto object-contain hidden sm:block"
            />
          </a>

          {/* Desktop Links */}
          <div className={`hidden md:flex items-center gap-8 ${isRTL ? "flex-row-reverse" : ""}`}>
            {navKeys.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/80 hover:text-gold text-sm font-medium tracking-wide transition-colors duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
              >
                {t(link.key)}
              </a>
            ))}
            <a
              href="/#donate"
              className="bg-gold hover:bg-gold-light text-emerald-deep px-5 py-2 text-sm font-semibold tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
            >
              {t("nav.donateNow")}
            </a>
            {/* Language Toggle */}
            <button
              onClick={() => setLocale(locale === "en" ? "ur" : "en")}
              className="border border-white/20 hover:border-gold/50 text-white/80 hover:text-gold px-3 py-1.5 text-xs font-medium tracking-wide transition-all duration-300"
            >
              {locale === "en" ? "اردو" : "EN"}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setLocale(locale === "en" ? "ur" : "en")}
              className="border border-white/20 hover:border-gold/50 text-white/80 hover:text-gold px-2 py-1 text-xs font-medium transition-all duration-300"
            >
              {locale === "en" ? "اردو" : "EN"}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white p-2"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-emerald-deep/95 backdrop-blur-md pb-6 border-t border-white/10">
            {navKeys.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block py-3 px-4 text-white/80 hover:text-gold text-sm font-medium tracking-wide transition-colors ${isRTL ? "text-right" : "text-left"}`}
              >
                {t(link.key)}
              </a>
            ))}
            <div className="px-4 pt-2">
              <a
                href="/#donate"
                onClick={() => setMenuOpen(false)}
                className="block text-center bg-gold hover:bg-gold-light text-emerald-deep px-5 py-2.5 text-sm font-semibold tracking-wide transition-all"
              >
                {t("nav.donateNow")}
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
