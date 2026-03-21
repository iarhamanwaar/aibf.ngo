"use client";

import { useState } from "react";
import { useLocale } from "@/lib/i18n";

export default function Contact() {
  const [formState, setFormState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const { locale, t } = useLocale();
  const isRTL = locale === "ur";
  const urduFont = isRTL ? "font-[family-name:var(--font-urdu)]" : "";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("sending");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("https://bugvi-api.arhamanwaar.workers.dev/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      setFormState(result.success ? "success" : "error");
      if (result.success) form.reset();
    } catch {
      setFormState("error");
    }
  }

  const contactItems = [
    {
      labelKey: "contact.address.label",
      valueKey: "contact.address.value",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
        </svg>
      ),
    },
    {
      labelKey: "contact.phone.label",
      valueKey: "contact.phone.value",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
        </svg>
      ),
    },
    {
      labelKey: "contact.email.label",
      valueKey: "contact.email.value",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
        </svg>
      ),
    },
  ];

  return (
    <section id="contact" dir={isRTL ? "rtl" : "ltr"} className={`relative py-24 lg:py-32 bg-cream ${urduFont}`}>
      <div className="absolute inset-0 pattern-overlay" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">
            {t("contact.label")}
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-charcoal tracking-tight">
            {t("contact.headingStart")}<span className="italic text-emerald-deep">{t("contact.headingAccent")}</span>
          </h2>
          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="w-12 h-px bg-gold/40" />
            <div className="w-1.5 h-1.5 rotate-45 bg-gold" />
            <div className="w-12 h-px bg-gold/40" />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className={`space-y-8 ${isRTL ? "text-right" : "text-left"}`}>
            <div>
              <h3 className="font-semibold text-charcoal text-lg mb-4">
                {t("contact.reachOut")}
              </h3>
              <p className="text-warm-gray leading-relaxed">
                {t("contact.reachOutDesc")}
              </p>
            </div>

            <div className="space-y-6">
              {contactItems.map((item) => (
                <div key={item.labelKey} className={`flex items-start gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <div className="text-gold mt-0.5 flex-shrink-0">{item.icon}</div>
                  <div>
                    <span className="text-xs text-warm-gray tracking-wider uppercase block mb-0.5">
                      {t(item.labelKey)}
                    </span>
                    <span className="text-charcoal font-medium text-sm">
                      {t(item.valueKey)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Key people */}
            <div className="border-t border-cream-dark pt-6 space-y-3">
              <div>
                <p className="text-charcoal font-medium text-sm">
                  {t("contact.person1.name")}
                </p>
                <p className="text-warm-gray text-xs">
                  {t("contact.person1.role")}
                </p>
              </div>
              <div>
                <p className="text-charcoal font-medium text-sm">
                  {t("contact.person2.name")}
                </p>
                <p className="text-warm-gray text-xs">
                  {t("contact.person2.role")}
                </p>
              </div>
            </div>

            {/* Google Maps embed */}
            <div className="mt-8 border border-cream-dark overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d72.9110524!3d32.4820009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x392166afe6ae2b33%3A0x93ed2e7fde7013ec!2sSher%20Shah%20Suri%20Mosque%20(Bugviyah%20Masjid)!5e0!3m2!1sen!2s!4v1"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="AIBF Location - Bhera, Pakistan"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className={`bg-white border border-cream-dark p-8 md:p-10 ${isRTL ? "text-right" : "text-left"}`}>
            {formState === "success" ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-emerald-deep/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-emerald-deep" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] text-2xl text-charcoal">
                  {t("contact.form.successTitle")}
                </h3>
                <p className="mt-2 text-warm-gray text-sm">
                  {t("contact.form.successMsg")}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-xs text-warm-gray tracking-wider uppercase mb-2">
                    {t("contact.form.name")}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full border border-cream-dark bg-cream/50 px-4 py-3 text-charcoal text-sm focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs text-warm-gray tracking-wider uppercase mb-2">
                    {t("contact.form.email")}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full border border-cream-dark bg-cream/50 px-4 py-3 text-charcoal text-sm focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs text-warm-gray tracking-wider uppercase mb-2">
                    {t("contact.form.message")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full border border-cream-dark bg-cream/50 px-4 py-3 text-charcoal text-sm focus:outline-none focus:border-gold transition-colors resize-none"
                  />
                </div>

                {formState === "error" && (
                  <p className="text-red-600 text-sm">
                    {t("contact.form.error")}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={formState === "sending"}
                  className="w-full bg-emerald-deep hover:bg-emerald-mid text-white py-3.5 font-semibold text-sm tracking-widest uppercase transition-all duration-300 disabled:opacity-50"
                >
                  {formState === "sending" ? t("contact.form.sending") : t("contact.form.send")}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
