import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { timeline, impactStats, caseStudies } from "@/lib/data";

export const metadata: Metadata = {
  title: "Annual Report 2025–2026 | AIBF",
  description:
    "AIBF year in review — programmes, milestones, families served, and disbursements across healthcare, education, ration, livelihood, and emergency relief in 2025–2026.",
  alternates: {
    canonical: "https://aibf.ngo/annual-report",
    languages: {
      en: "https://aibf.ngo/annual-report",
      ur: "https://aibf.ngo/ur/annual-report",
      "x-default": "https://aibf.ngo/annual-report",
    },
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://aibf.ngo" },
    { "@type": "ListItem", position: 2, name: "Annual Report", item: "https://aibf.ngo/annual-report" },
  ],
};

export default function AnnualReportPage() {
  // Filter milestones from 2025-03 onward (the public reporting period)
  const reportingMilestones = timeline.filter((t) => t.date >= "2025-03");
  const totalCases = caseStudies.length;

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
              <span className="text-white/60">Annual Report</span>
            </nav>
            <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">
              Year in Review · 2025–2026
            </span>
            <h1 className="mt-3 font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
              Annual <span className="italic text-gold">Report</span>
            </h1>
            <p className="mt-6 text-lg text-white/60 leading-relaxed max-w-2xl">
              A public record of every programme, milestone, and documented case across AIBF&apos;s operating year.
            </p>
          </div>
        </section>

        <section className="bg-cream py-16 lg:py-24">
          <div className="mx-auto max-w-4xl px-6 lg:px-8 space-y-12">
            <div>
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl text-charcoal font-semibold mb-4">
                Headline numbers
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { v: totalCases.toString(), l: "Cases documented" },
                  { v: impactStats.familiesSupported, l: "Families supported" },
                  { v: impactStats.patientsServed, l: "Patients served" },
                  { v: impactStats.rationBags, l: "Ration bags distributed" },
                  { v: impactStats.treesPlanted, l: "Trees planted" },
                  { v: impactStats.womenTrained, l: "Women trained" },
                  { v: impactStats.healthCamps, l: "Health camps held" },
                  { v: impactStats.wheelchairsDonated, l: "Wheelchairs donated" },
                ].map((s) => (
                  <div key={s.l} className="bg-white border border-cream-dark rounded-sm p-4 text-center">
                    <div className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-emerald-deep">{s.v}</div>
                    <div className="mt-1 text-xs text-warm-gray">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl text-charcoal font-semibold mb-6">
                Milestones
              </h2>
              <ol className="relative border-l border-emerald-deep/20 pl-6 space-y-6">
                {reportingMilestones.map((m, i) => (
                  <li key={i}>
                    <div className="absolute -left-[7px] w-3 h-3 rounded-full bg-gold" />
                    <time className="text-xs text-warm-gray uppercase tracking-wider">{m.date}</time>
                    <h3 className="mt-1 font-[family-name:var(--font-playfair)] text-lg text-charcoal font-semibold">{m.title}</h3>
                    <p className="mt-1 text-sm text-charcoal/70 leading-relaxed">{m.description}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-emerald-deep/5 border border-emerald-deep/10 rounded-sm p-6">
              <h2 className="font-[family-name:var(--font-playfair)] text-xl text-emerald-deep font-semibold mb-2">
                Want the underlying data?
              </h2>
              <p className="text-charcoal/80 text-sm leading-relaxed">
                Every milestone above maps to a documented case study. Browse all{" "}
                <Link href="/stories" className="text-emerald-deep underline">{totalCases} stories</Link>, see programme breakdowns on the{" "}
                <Link href="/programs" className="text-emerald-deep underline">Programmes</Link> page, or check the{" "}
                <Link href="/financials" className="text-emerald-deep underline">Financials</Link> page for registration and banking details.
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
