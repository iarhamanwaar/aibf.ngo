import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { caseStudies } from "@/lib/data";
import StoriesGrid from "./StoriesGrid";

export const metadata: Metadata = {
  title: "Stories of Impact | Al-Iftikhar Bugvia Foundation",
  description:
    "Real stories of lives changed by AIBF — healthcare, education, livelihood, and emergency relief across rural Pakistan.",
  alternates: { canonical: "https://aibf.ngo/stories" },
  openGraph: {
    title: "Stories of Impact | Al-Iftikhar Bugvia Foundation",
    description:
      "Real stories of lives changed by AIBF — healthcare, education, livelihood, and emergency relief across rural Pakistan.",
    url: "https://aibf.ngo/stories",
    siteName: "Al-Iftikhar Bugvia Foundation",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

const categories = [
  { key: "all", label: "All Stories" },
  { key: "healthcare", label: "Healthcare" },
  { key: "education", label: "Education" },
  { key: "livelihood", label: "Livelihood" },
  { key: "ration", label: "Ration" },
  { key: "welfare", label: "Welfare" },
  { key: "emergency", label: "Emergency" },
] as const;

const totalFamilies = "300+";
const totalCases = caseStudies.length;
const programAreas = new Set(caseStudies.map((c) => c.category)).size;

export default function StoriesPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative bg-emerald-deep pt-32 pb-20 lg:pt-40 lg:pb-28">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,168,76,0.08),transparent_60%)]" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">
                Our Work in Action
              </span>
              <h1 className="mt-4 font-[family-name:var(--font-playfair)] text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.1]">
                Stories of{" "}
                <span className="italic text-gold">Impact</span>
              </h1>
              <p className="mt-6 text-lg text-white/60 leading-relaxed max-w-2xl">
                Every number has a name. Every statistic has a story. These are
                the lives changed by your generosity — documented from the
                ground, one family at a time.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="w-12 h-px bg-gold/40" />
                <div className="w-1.5 h-1.5 rotate-45 bg-gold" />
                <div className="w-12 h-px bg-gold/40" />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-charcoal border-t border-white/5">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-6">
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-gold font-semibold">{totalCases}+</span>
                <span className="text-white/50">cases documented</span>
              </div>
              <div className="w-px h-4 bg-white/10 hidden sm:block" />
              <div className="flex items-center gap-2">
                <span className="text-gold font-semibold">{programAreas}</span>
                <span className="text-white/50">program areas</span>
              </div>
              <div className="w-px h-4 bg-white/10 hidden sm:block" />
              <div className="flex items-center gap-2">
                <span className="text-gold font-semibold">{totalFamilies}</span>
                <span className="text-white/50">families helped</span>
              </div>
            </div>
          </div>
        </section>

        {/* Filtered Grid */}
        <section className="bg-cream py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <StoriesGrid
              stories={caseStudies}
              categories={categories.map((c) => ({
                key: c.key,
                label: c.label,
              }))}
            />
          </div>
        </section>

        {/* CTA */}
        <section className="bg-emerald-deep py-20 lg:py-28">
          <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-8 text-center">
            <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">
              Be Part of the Next Story
            </span>
            <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-white tracking-tight leading-tight">
              Help us write more stories{" "}
              <span className="italic text-gold">like these</span>
            </h2>
            <p className="mt-6 text-white/60 leading-relaxed">
              Every contribution — no matter the size — becomes a chapter in
              someone&apos;s story of recovery, education, or new beginnings.
            </p>
            <a
              href="/donate"
              className="mt-8 inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-charcoal font-semibold px-8 py-3.5 rounded-sm transition-colors text-sm tracking-wide uppercase"
            >
              Donate Now
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
