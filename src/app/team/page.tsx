import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { teamMembers } from "@/lib/data";

export const metadata: Metadata = {
  title: "Our Team | Al-Iftikhar Bugvia Foundation",
  description:
    "Meet the team behind AIBF — chairman, patrons, secretaries, coordinators, and field officers serving rural communities across Bhera, Lahore, and surrounding areas of Pakistan.",
  alternates: {
    canonical: "https://aibf.ngo/team",
    languages: {
      en: "https://aibf.ngo/team",
      ur: "https://aibf.ngo/ur/team",
      "x-default": "https://aibf.ngo/team",
    },
  },
  openGraph: {
    title: "Our Team | AIBF",
    description: "Meet the people behind AIBF.",
    url: "https://aibf.ngo/team",
    type: "website",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://aibf.ngo" },
    { "@type": "ListItem", position: 2, name: "Team", item: "https://aibf.ngo/team" },
  ],
};

const personSchema = teamMembers.map((m) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: m.name,
  jobTitle: m.role,
  affiliation: {
    "@type": "Organization",
    name: "Al-Iftikhar Bugvia Foundation",
    url: "https://aibf.ngo",
  },
  workLocation: { "@type": "Place", name: m.location },
}));

export default function TeamPage() {
  const lahore = teamMembers.filter((m) => m.location === "Lahore");
  const bhera = teamMembers.filter((m) => m.location === "Bhera");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Navbar />
      <main>
        <section className="relative bg-emerald-deep pt-32 pb-16 lg:pt-40 lg:pb-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,168,76,0.08),transparent_60%)]" />
          <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-sm text-white/40 mb-8">
              <Link href="/" className="hover:text-white/70">Home</Link>
              <span>›</span>
              <span className="text-white/60">Team</span>
            </nav>
            <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">
              People Behind AIBF
            </span>
            <h1 className="mt-3 font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
              Our <span className="italic text-gold">Team</span>
            </h1>
            <p className="mt-6 text-lg text-white/60 leading-relaxed max-w-2xl">
              {teamMembers.length} volunteers across Lahore and Bhera carry the foundation&apos;s work — finance, operations, healthcare, education, design, and on-ground delivery.
            </p>
          </div>
        </section>

        <section className="bg-cream py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-6 lg:px-8 space-y-16">
            <div>
              <div className="flex items-baseline gap-3 mb-8">
                <h2 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl text-charcoal font-semibold">
                  Lahore
                </h2>
                <span className="text-warm-gray text-sm">{lahore.length} members</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {lahore.map((m) => (
                  <article
                    key={m.name}
                    className="bg-white border border-cream-dark rounded-sm p-5"
                  >
                    <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-charcoal">
                      {m.name}
                    </h3>
                    <p className="mt-1 text-sm text-emerald-deep font-medium">{m.role}</p>
                    <p className="mt-2 text-xs text-warm-gray">{m.location}</p>
                  </article>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-baseline gap-3 mb-8">
                <h2 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl text-charcoal font-semibold">
                  Bhera
                </h2>
                <span className="text-warm-gray text-sm">{bhera.length} members</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {bhera.map((m) => (
                  <article
                    key={m.name}
                    className="bg-white border border-cream-dark rounded-sm p-5"
                  >
                    <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-charcoal">
                      {m.name}
                    </h3>
                    <p className="mt-1 text-sm text-emerald-deep font-medium">{m.role}</p>
                    <p className="mt-2 text-xs text-warm-gray">{m.location}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-emerald-deep py-16 lg:py-20">
          <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl text-white">
              Want to join us?
            </h2>
            <p className="mt-4 text-white/60">
              Volunteer slots open across operations, healthcare camps, ration drives, and digital. Get in touch.
            </p>
            <Link
              href="/#contact"
              className="mt-6 inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-charcoal font-semibold px-8 py-3.5 rounded-sm transition-colors text-sm tracking-wide uppercase"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
