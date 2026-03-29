import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { programs, caseStudies } from "@/lib/data";

export const metadata: Metadata = {
  title: "Our Programs | Al-Iftikhar Bugvia Foundation",
  description:
    "Explore AIBF's 8 active programs: healthcare, ration drives, education, livelihood support, emergency relief, social welfare, heritage preservation, and green plantation.",
  alternates: { canonical: "https://aibf.ngo/programs" },
};

function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

export default function Programs() {
  return (
    <>
      <Navbar />
      <main className="bg-cream min-h-screen">
        {/* ================================================================
            HERO
        ================================================================= */}
        <section className="bg-emerald-deep pt-32 pb-20 relative overflow-hidden">
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <p className="text-gold text-sm font-medium tracking-[0.2em] uppercase mb-4">
              Serving Since 2008
            </p>
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3">
              Our <span className="text-gold">Programs</span>
            </h1>
            <p className="text-white/70 max-w-3xl mx-auto leading-relaxed text-lg mb-10">
              Eight active programs addressing the most fundamental needs of
              underserved rural communities across Bhera, Buggah Sharif, and
              surrounding areas of Punjab.
            </p>

            {/* Program pills */}
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {programs.map((p) => (
                <a
                  key={p.slug}
                  href={`#${p.slug}`}
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white/90 hover:text-white px-4 py-2 text-sm transition-colors duration-200 rounded-full backdrop-blur-sm"
                >
                  <span>{p.icon}</span>
                  <span>{p.title}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================
            PROGRAM SECTIONS — Full-width alternating layouts
        ================================================================= */}
        {programs.map((program, index) => {
          const isOdd = index % 2 === 0; // 0-indexed: first program has image left
          const relatedCases = program.cases
            .map(getCaseStudy)
            .filter(Boolean)
            .slice(0, 3);

          return (
            <section
              key={program.slug}
              id={program.slug}
              className={`py-20 lg:py-28 ${
                index % 2 === 1 ? "bg-white" : "bg-cream"
              }`}
            >
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div
                  className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-start ${
                    isOdd ? "" : "lg:[direction:rtl]"
                  }`}
                >
                  {/* Images Column */}
                  <div className={`${isOdd ? "" : "lg:[direction:ltr]"}`}>
                    {program.images.length > 0 ? (
                      <div className="relative">
                        {/* Main image */}
                        <div className="relative aspect-[4/3] overflow-hidden shadow-xl">
                          <Image
                            src={program.images[0]}
                            alt={program.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                          />
                        </div>
                        {/* Stacked secondary images */}
                        {program.images.length > 1 && (
                          <div className="flex gap-3 mt-3">
                            {program.images.slice(1, 4).map((img, i) => (
                              <div
                                key={i}
                                className="relative flex-1 aspect-[4/3] overflow-hidden shadow-md"
                              >
                                <Image
                                  src={img}
                                  alt={`${program.title} - ${i + 2}`}
                                  fill
                                  className="object-cover"
                                  sizes="(max-width: 1024px) 33vw, 16vw"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                        {/* Gold accent bar */}
                        <div
                          className={`absolute -bottom-3 ${
                            isOdd ? "-right-3" : "-left-3"
                          } w-24 h-1 bg-gold`}
                        />
                      </div>
                    ) : (
                      /* Placeholder when no images */
                      <div className="aspect-[4/3] bg-emerald-deep/5 flex items-center justify-center">
                        <span className="text-8xl opacity-30">
                          {program.icon}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content Column */}
                  <div className={`${isOdd ? "" : "lg:[direction:ltr]"}`}>
                    {/* Icon + Title */}
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-4xl">{program.icon}</span>
                      <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-charcoal">
                        {program.title}
                      </h2>
                    </div>

                    {/* Description */}
                    <p className="text-charcoal/70 text-lg leading-relaxed mb-8">
                      {program.description}
                    </p>

                    {/* Stats Row */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-10">
                      {program.stats.map((stat) => (
                        <div key={stat.label}>
                          <p className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl font-bold text-gold">
                            {stat.value}
                          </p>
                          <p className="text-charcoal/50 text-sm mt-1">
                            {stat.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Related Stories */}
                    {relatedCases.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-charcoal/40 uppercase tracking-[0.15em] mb-4">
                          Related Stories
                        </h3>
                        <div className="space-y-3">
                          {relatedCases.map((cs) => (
                            <a
                              key={cs!.slug}
                              href={`/stories/${cs!.slug}`}
                              className="group flex items-start gap-3 p-3 bg-white/60 hover:bg-white border border-charcoal/5 hover:border-gold/30 transition-all duration-200"
                            >
                              <div className="w-1 h-full min-h-[2.5rem] bg-gold/30 group-hover:bg-gold transition-colors duration-200 rounded-full flex-shrink-0" />
                              <div className="flex-1">
                                <p className="text-charcoal font-medium text-sm leading-snug">
                                  {cs!.title}
                                </p>
                                <p className="text-charcoal/40 text-xs mt-1">
                                  {cs!.location} &middot; {cs!.totalAid || cs!.category}
                                </p>
                              </div>
                              <span className="text-gold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0 mt-0.5">
                                Read story &rarr;
                              </span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Gold divider between programs */}
              {index < programs.length - 1 && (
                <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-20 lg:mt-28">
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-px bg-gold/20" />
                    <div className="w-2 h-2 bg-gold/40 rotate-45" />
                    <div className="flex-1 h-px bg-gold/20" />
                  </div>
                </div>
              )}
            </section>
          );
        })}

        {/* ================================================================
            PROGRAMS AT A GLANCE — Summary grid
        ================================================================= */}
        <section className="py-20 bg-charcoal">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-gold text-sm font-medium tracking-[0.2em] uppercase mb-4">
                At a Glance
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-white">
                All <span className="text-gold">8 Programs</span>
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {programs.map((program) => (
                <a
                  key={program.slug}
                  href={`#${program.slug}`}
                  className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold/30 p-6 transition-all duration-300"
                >
                  <span className="text-3xl block mb-3">{program.icon}</span>
                  <h3 className="font-[family-name:var(--font-playfair)] text-white font-semibold text-sm md:text-base mb-3 leading-tight">
                    {program.title}
                  </h3>
                  {program.stats[0] && (
                    <div>
                      <p className="font-[family-name:var(--font-playfair)] text-gold text-xl md:text-2xl font-bold">
                        {program.stats[0].value}
                      </p>
                      <p className="text-white/40 text-xs mt-0.5">
                        {program.stats[0].label}
                      </p>
                    </div>
                  )}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================
            CTA — Support These Programs
        ================================================================= */}
        <section className="py-20 bg-emerald-deep relative overflow-hidden">
          {/* Decorative */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-gold/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full translate-x-1/3 translate-y-1/3" />

          <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <p className="text-gold text-sm font-medium tracking-[0.2em] uppercase mb-4">
              Make a Difference
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-white mb-2">
              Support These <span className="text-gold">Programs</span>
            </h2>
            <p className="text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed text-lg">
              Every rupee funds real, documented impact. From medicine for
              dispensaries to ration bags for families in need, your contribution
              goes directly to the communities we serve.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/#donate"
                className="inline-block bg-gold hover:bg-gold-light text-emerald-deep px-10 py-4 font-semibold tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-gold/20 text-lg"
              >
                Donate Now
              </Link>
              <Link
                href="/#contact"
                className="inline-block border border-white/30 hover:border-white text-white px-10 py-4 font-semibold tracking-wide transition-all duration-300 text-lg"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
