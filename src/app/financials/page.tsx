import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { impactStats } from "@/lib/data";

export const metadata: Metadata = {
  title: "Financials & Transparency | AIBF",
  description:
    "AIBF's financial transparency: registration details, banking, recurring expenses, and disbursement summary. Punjab Charity Commission Category (A) Charity.",
  alternates: {
    canonical: "https://aibf.ngo/financials",
    languages: {
      en: "https://aibf.ngo/financials",
      ur: "https://aibf.ngo/ur/financials",
      "x-default": "https://aibf.ngo/financials",
    },
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://aibf.ngo" },
    { "@type": "ListItem", position: 2, name: "Financials", item: "https://aibf.ngo/financials" },
  ],
};

export default function FinancialsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Navbar />
      <main>
        <section className="relative bg-emerald-deep pt-32 pb-16 lg:pt-40 lg:pb-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,168,76,0.08),transparent_60%)]" />
          <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-sm text-white/40 mb-8">
              <Link href="/" className="hover:text-white/70">Home</Link>
              <span>›</span>
              <span className="text-white/60">Financials</span>
            </nav>
            <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">
              Transparency
            </span>
            <h1 className="mt-3 font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
              Financials &amp; <span className="italic text-gold">Transparency</span>
            </h1>
            <p className="mt-6 text-lg text-white/60 leading-relaxed max-w-2xl">
              Every rupee donated to AIBF is logged, reconciled, and reported. Below are our registration credentials, banking details, and a public-facing summary of how funds are deployed.
            </p>
          </div>
        </section>

        <section className="bg-cream py-16 lg:py-24">
          <div className="mx-auto max-w-4xl px-6 lg:px-8 space-y-12">
            <div>
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl text-charcoal font-semibold mb-4">
                Registration
              </h2>
              <dl className="bg-white border border-cream-dark rounded-sm divide-y divide-cream-dark">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 px-5 py-4">
                  <dt className="text-warm-gray text-sm">Authority</dt>
                  <dd className="sm:col-span-2 text-charcoal">{impactStats.registrationAuthority}</dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 px-5 py-4">
                  <dt className="text-warm-gray text-sm">Category</dt>
                  <dd className="sm:col-span-2 text-charcoal">{impactStats.registrationCategory}</dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 px-5 py-4">
                  <dt className="text-warm-gray text-sm">Registration No.</dt>
                  <dd className="sm:col-span-2 text-charcoal font-mono text-sm">{impactStats.registrationNumber}</dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 px-5 py-4">
                  <dt className="text-warm-gray text-sm">Validity</dt>
                  <dd className="sm:col-span-2 text-charcoal">{impactStats.registrationValid}</dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 px-5 py-4">
                  <dt className="text-warm-gray text-sm">Section 42 / NPO</dt>
                  <dd className="sm:col-span-2 text-charcoal">In progress (SECP)</dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 px-5 py-4">
                  <dt className="text-warm-gray text-sm">Partnerships</dt>
                  <dd className="sm:col-span-2 text-charcoal">Pakistan Red Crescent Society</dd>
                </div>
              </dl>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl text-charcoal font-semibold mb-4">
                Banking
              </h2>
              <dl className="bg-white border border-cream-dark rounded-sm divide-y divide-cream-dark">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 px-5 py-4">
                  <dt className="text-warm-gray text-sm">Bank</dt>
                  <dd className="sm:col-span-2 text-charcoal">Faysal Bank, MBS Bhera (3353)</dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 px-5 py-4">
                  <dt className="text-warm-gray text-sm">Account Title</dt>
                  <dd className="sm:col-span-2 text-charcoal">Al Iftikhar Bugvia Foundation</dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 px-5 py-4">
                  <dt className="text-warm-gray text-sm">IBAN</dt>
                  <dd className="sm:col-span-2 text-charcoal font-mono text-sm">PK45FAYS3353499000006131</dd>
                </div>
              </dl>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl text-charcoal font-semibold mb-4">
                Disbursement Summary
              </h2>
              <p className="text-warm-gray mb-6 text-sm leading-relaxed">
                Headline figures from our active programmes. Detailed line-item ledgers are maintained internally and shared on request via{" "}
                <a href="mailto:contact@aibf.ngo" className="text-emerald-deep underline">contact@aibf.ngo</a>.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Patients Served", value: impactStats.patientsServed },
                  { label: "Ration Bags", value: impactStats.rationBags },
                  { label: "Trees Planted", value: impactStats.treesPlanted },
                  { label: "Families Supported", value: impactStats.familiesSupported },
                  { label: "Dispensaries", value: impactStats.dispensaries },
                  { label: "Health Camps", value: impactStats.healthCamps },
                  { label: "Women Trained", value: impactStats.womenTrained },
                  { label: "Wheelchairs Donated", value: impactStats.wheelchairsDonated },
                ].map((s) => (
                  <div key={s.label} className="bg-white border border-cream-dark rounded-sm p-4 text-center">
                    <div className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-emerald-deep">{s.value}</div>
                    <div className="mt-1 text-xs text-warm-gray">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-emerald-deep/5 border border-emerald-deep/10 rounded-sm p-6">
              <h2 className="font-[family-name:var(--font-playfair)] text-xl text-emerald-deep font-semibold mb-2">
                Audited financials
              </h2>
              <p className="text-charcoal/80 text-sm leading-relaxed">
                AIBF&apos;s first formal audit cycle is scheduled in line with the SECP Section 42 application currently in progress. The published audited statement will appear on the{" "}
                <Link href="/annual-report" className="text-emerald-deep underline">Annual Report</Link>{" "}
                page once available.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
