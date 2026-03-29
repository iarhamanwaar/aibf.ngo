import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CopyIbanButton from "./CopyIbanButton";

export const metadata: Metadata = {
  title: "Donate | Al-Iftikhar Bugvia Foundation",
  description:
    "Support AIBF's mission — donate via bank transfer or WhatsApp. Your contribution funds healthcare, education, ration drives, and livelihood programs for rural communities in Pakistan.",
  alternates: { canonical: "https://aibf.ngo/donate" },
  openGraph: {
    title: "Donate to AIBF",
    description:
      "Support AIBF's mission — donate via bank transfer or WhatsApp. Your contribution funds healthcare, education, ration drives, and livelihood programs for rural communities in Pakistan.",
    url: "https://aibf.ngo/donate",
    type: "website",
  },
};

const donationOptions = [
  {
    amount: "1,000",
    label: "Medicine for a patient",
    labelUr: "ایک مریض کی دوائی",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    amount: "3,000",
    label: "Monthly medicine for Bugga dispensary",
    labelUr: "بگہ ڈسپنسری کی ماہانہ ادویات",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
  },
  {
    amount: "5,000",
    label: "Complete Ramadan ration bag for a family",
    labelUr: "ایک خاندان کا مکمل رمضان راشن",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
      </svg>
    ),
  },
  {
    amount: "10,000",
    label: "Tuition for a labourer's child",
    labelUr: "مزدور کے بچے کی تعلیم",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
      </svg>
    ),
  },
  {
    amount: "25,000",
    label: "Monthly support for a widow family",
    labelUr: "بیوہ خاندان کی ماہانہ کفالت",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    ),
  },
  {
    amount: "60,000",
    label: "Motorbike for a bonded labourer (Qarz Hasna)",
    labelUr: "مزدور کے لیے موٹرسائیکل (قرض حسنہ)",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
  },
];

const stats = [
  { number: "10,000+", label: "Patients Served", labelUr: "مریضوں کی خدمت" },
  { number: "265+", label: "Ration Bags", labelUr: "راشن بیگز" },
  { number: "2,500+", label: "Trees Planted", labelUr: "درخت لگائے" },
];

const acceptedTypes = [
  { en: "Zakat", ur: "زکوٰة" },
  { en: "Sadqa", ur: "صدقہ" },
  { en: "Charity", ur: "خیرات" },
  { en: "Donations", ur: "عطیات" },
];

const photos = [
  { src: "/images/programs/ration-bicycle.jpg", alt: "Ration delivery by bicycle to remote villages" },
  { src: "/images/programs/team-with-ration.jpg", alt: "AIBF team preparing ration distribution" },
  { src: "/images/programs/ration-rural-delivery.jpg", alt: "Ration delivery to rural families" },
];

export default function DonatePage() {
  return (
    <>
      <Navbar />
      <main className="bg-cream min-h-screen">
        {/* ============================================ */}
        {/* HERO SECTION                                 */}
        {/* ============================================ */}
        <section className="relative bg-emerald-deep pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

          <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <span className="inline-block text-gold text-xs tracking-[0.35em] uppercase font-medium mb-4">
              Make a Difference Today
            </span>
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl text-white leading-tight tracking-tight">
              Your donation feeds{" "}
              <span className="italic text-gold">a family</span>
              <br className="hidden sm:block" />
              {" "}for a month
            </h1>

            <p className="font-[family-name:var(--font-urdu)] text-gold-light/80 text-xl mt-4" dir="rtl">
              آپ کا عطیہ ایک خاندان کو مہینے بھر کا سہارا دیتا ہے
            </p>

            {/* Ornamental divider */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/60" />
              <div className="w-1.5 h-1.5 rotate-45 bg-gold" />
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/60" />
            </div>

            <p className="mt-8 text-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
              Every rupee you give goes directly to healthcare, education, ration drives, and livelihood programs for families who need it most in rural Punjab.
            </p>

            {/* Quick CTA */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#bank-details"
                className="bg-gold hover:bg-gold-light text-emerald-deep px-8 py-3.5 text-sm font-semibold tracking-widest uppercase transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
              >
                Donate Now
              </a>
              <a
                href="https://wa.me/923016701340?text=I%20would%20like%20to%20donate%20to%20AIBF"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 border border-white/20 hover:border-[#25D366]/60 text-white hover:text-[#25D366] px-8 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Donate via WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* TRUST BADGES                                 */}
        {/* ============================================ */}
        <section className="bg-cream-dark py-12 lg:py-16 border-b border-charcoal/5">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
              {/* Registration certificate */}
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative w-28 h-36 flex-shrink-0 border border-charcoal/10 shadow-sm overflow-hidden bg-white">
                  <Image
                    src="/images/certificates/pcc-registration.jpg"
                    alt="Punjab Charity Commission Registration Certificate"
                    fill
                    className="object-cover"
                    sizes="112px"
                  />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-emerald-deep font-semibold text-sm tracking-wide uppercase">
                    Government Registered
                  </p>
                  <p className="font-[family-name:var(--font-playfair)] text-charcoal text-xl font-semibold mt-1">
                    Category (A) Charity
                  </p>
                  <p className="text-warm-gray text-sm mt-1">
                    Punjab Charity Commission
                  </p>
                  <p className="text-warm-gray/70 text-xs mt-1">
                    Reg No: PB-6976792864708031
                  </p>
                  <p className="text-warm-gray/70 text-xs">
                    Valid: Oct 2025 &ndash; Oct 2026
                  </p>
                </div>
              </div>

              {/* Impact stats */}
              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="font-[family-name:var(--font-playfair)] text-emerald-deep text-2xl lg:text-3xl font-bold">
                      {stat.number}
                    </p>
                    <p className="text-warm-gray text-xs tracking-wide uppercase mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* DONATION OPTIONS                             */}
        {/* ============================================ */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="text-emerald-mid text-xs tracking-[0.3em] uppercase font-medium">
                Choose Your Impact
              </span>
              <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal tracking-tight">
                See exactly where{" "}
                <span className="italic text-emerald-deep">your money goes</span>
              </h2>
              {/* Ornamental divider */}
              <div className="mt-6 flex items-center justify-center gap-4">
                <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold/40" />
                <div className="w-1.5 h-1.5 rotate-45 bg-gold" />
                <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold/40" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {donationOptions.map((option) => (
                <div
                  key={option.amount}
                  className="group relative bg-white border border-charcoal/[0.06] p-7 lg:p-8 transition-all duration-500 hover:border-emerald-mid/30 hover:shadow-lg hover:shadow-emerald-deep/5 hover:-translate-y-1"
                >
                  {/* Top accent */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-deep via-emerald-mid to-emerald-light scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="font-[family-name:var(--font-playfair)] text-emerald-deep text-3xl font-bold">
                        <span className="text-lg font-normal text-warm-gray/60">Rs</span>{" "}
                        {option.amount}
                      </p>
                      <p className="text-charcoal/80 text-sm mt-2 leading-relaxed">
                        {option.label}
                      </p>
                    </div>
                    <div className="flex-shrink-0 w-11 h-11 flex items-center justify-center bg-emerald-deep/[0.06] text-emerald-deep group-hover:bg-emerald-deep group-hover:text-white transition-all duration-300">
                      {option.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* BANK TRANSFER DETAILS                        */}
        {/* ============================================ */}
        <section id="bank-details" className="bg-emerald-deep py-20 lg:py-28 scroll-mt-24">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">
                Bank Transfer
              </span>
              <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-white tracking-tight">
                Transfer directly to{" "}
                <span className="italic text-gold">our account</span>
              </h2>
              <div className="mt-6 flex items-center justify-center gap-4">
                <div className="w-12 h-px bg-gold/40" />
                <div className="w-1.5 h-1.5 rotate-45 bg-gold" />
                <div className="w-12 h-px bg-gold/40" />
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Faysal Bank */}
              <div className="bg-white/[0.06] border border-white/[0.1] p-8 md:p-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-2 h-8 bg-gold" />
                  <h3 className="font-[family-name:var(--font-playfair)] text-gold text-xl font-semibold">
                    Faysal Bank
                  </h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="text-white/40 text-[11px] tracking-[0.15em] uppercase block mb-1.5">
                      Bank &amp; Branch
                    </label>
                    <p className="text-white font-medium">
                      Faysal Bank, MBS Bhera (3353)
                    </p>
                  </div>

                  <div>
                    <label className="text-white/40 text-[11px] tracking-[0.15em] uppercase block mb-1.5">
                      Account Title
                    </label>
                    <p className="text-white font-medium">
                      Al Iftikhar Bugvia Foundation
                    </p>
                  </div>

                  <div>
                    <label className="text-white/40 text-[11px] tracking-[0.15em] uppercase block mb-1.5">
                      IBAN
                    </label>
                    <p className="text-gold font-mono text-xl tracking-[0.12em]" dir="ltr">
                      PK45 FAYS 3353 4990 0000 6131
                    </p>
                  </div>
                </div>

                <CopyIbanButton />
              </div>

              {/* WhatsApp Donate */}
              <div className="flex flex-col justify-between gap-8">
                <div className="bg-white/[0.06] border border-white/[0.1] p-8 flex-1">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-2 h-8 bg-[#25D366]" />
                    <h3 className="font-[family-name:var(--font-playfair)] text-white text-xl font-semibold">
                      Donate via WhatsApp
                    </h3>
                  </div>
                  <p className="text-white/50 text-sm mb-6 leading-relaxed">
                    Prefer personal assistance? Reach out on WhatsApp and we will guide you through the donation process. Share your donation screenshot for confirmation.
                  </p>
                  <a
                    href="https://wa.me/923016701340?text=I%20would%20like%20to%20donate%20to%20AIBF"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white w-full py-4 text-sm font-semibold tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-[#25D366]/20"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Donate via WhatsApp
                  </a>
                </div>

                {/* Process info */}
                <div className="bg-white/[0.06] border border-white/[0.1] p-8">
                  <h4 className="text-white/70 text-sm font-semibold tracking-wide uppercase mb-4">How it works</h4>
                  <ol className="space-y-3 text-white/50 text-sm">
                    <li className="flex items-start gap-3">
                      <span className="text-gold font-semibold">1.</span>
                      <span>Transfer to the bank account above</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gold font-semibold">2.</span>
                      <span>Send your donation screenshot on WhatsApp</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gold font-semibold">3.</span>
                      <span>We confirm receipt and share how your donation was used</span>
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            {/* International note */}
            <p className="text-center text-white/30 text-sm mt-10">
              For international transfers or other payment methods, please{" "}
              <a
                href="https://wa.me/923016701340?text=I%20would%20like%20to%20donate%20to%20AIBF%20from%20abroad"
                className="text-gold/60 underline underline-offset-4 hover:text-gold transition-colors"
              >
                contact us on WhatsApp
              </a>
              .
            </p>
          </div>
        </section>

        {/* ============================================ */}
        {/* ACCEPTED DONATION TYPES                      */}
        {/* ============================================ */}
        <section className="py-14 bg-cream-dark border-y border-charcoal/5">
          <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <p className="text-warm-gray text-xs tracking-[0.25em] uppercase font-medium mb-5">
              We Accept
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {acceptedTypes.map((type) => (
                <span
                  key={type.en}
                  className="border border-emerald-deep/20 text-emerald-deep text-sm tracking-wide px-6 py-2.5 uppercase bg-white"
                >
                  {type.en}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* PHOTO STRIP                                  */}
        {/* ============================================ */}
        <section className="py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-emerald-mid text-xs tracking-[0.3em] uppercase font-medium">
                On the Ground
              </span>
              <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal tracking-tight">
                Your donations{" "}
                <span className="italic text-emerald-deep">in action</span>
              </h2>
              <div className="mt-6 flex items-center justify-center gap-4">
                <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold/40" />
                <div className="w-1.5 h-1.5 rotate-45 bg-gold" />
                <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold/40" />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
              {photos.map((photo) => (
                <div
                  key={photo.src}
                  className="relative aspect-[4/3] overflow-hidden group"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {/* Subtle overlay on hover */}
                  <div className="absolute inset-0 bg-emerald-deep/0 group-hover:bg-emerald-deep/10 transition-colors duration-500" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* CTA — VIEW IMPACT                            */}
        {/* ============================================ */}
        <section className="bg-charcoal py-20 lg:py-24">
          <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
            <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">
              Real Stories, Real Impact
            </span>
            <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-white tracking-tight leading-tight">
              See the lives{" "}
              <span className="italic text-gold">you have changed</span>
            </h2>
            <p className="font-[family-name:var(--font-urdu)] text-gold-light/60 text-lg mt-3" dir="rtl">
              ان زندگیوں کو دیکھیں جو آپ نے بدلی ہیں
            </p>
            <div className="mt-6 flex items-center justify-center gap-4">
              <div className="w-12 h-px bg-gold/40" />
              <div className="w-1.5 h-1.5 rotate-45 bg-gold" />
              <div className="w-12 h-px bg-gold/40" />
            </div>
            <p className="mt-8 text-white/50 max-w-xl mx-auto leading-relaxed">
              From free medical camps that have treated over 10,000 patients to Ramadan ration drives reaching remote villages by bicycle &mdash; every donation writes a new story.
            </p>
            <a
              href="/stories"
              className="mt-10 inline-block bg-gold hover:bg-gold-light text-charcoal px-10 py-3.5 text-sm font-semibold tracking-widest uppercase transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
            >
              View Impact Stories
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
