import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { caseStudies } from "@/lib/data";

const CATEGORY_META: Record<string, { label: string; labelUrdu: string; description: string; programSlug?: string }> = {
  healthcare: {
    label: "Healthcare",
    labelUrdu: "صحت",
    description: "Free medical camps, dispensary support, medicine, hospital equipment, and dialysis cases across rural Pakistan.",
    programSlug: "healthcare",
  },
  education: {
    label: "Education",
    labelUrdu: "تعلیم",
    description: "School supplies, tuition support, sewing centres, and English courses for students and women.",
    programSlug: "education",
  },
  livelihood: {
    label: "Livelihood",
    labelUrdu: "روزگار",
    description: "Qarz Hasna interest-free loans, motorbikes for delivery riders, and small-business support.",
    programSlug: "livelihood",
  },
  ration: {
    label: "Ration & Food",
    labelUrdu: "راشن",
    description: "Ramadan ration drives, Eid qurbani, iftaar programmes, and monthly flour distribution.",
    programSlug: "ration-food",
  },
  welfare: {
    label: "Welfare",
    labelUrdu: "فلاح",
    description: "Monthly zakat, wheelchairs for the disabled, marriage assistance, and Eid packages.",
    programSlug: "welfare",
  },
  emergency: {
    label: "Emergency Relief",
    labelUrdu: "ہنگامی امداد",
    description: "Burn patients, fire damage, flood relief, and acute medical emergencies.",
    programSlug: "emergency",
  },
};

export function generateStaticParams() {
  return Object.keys(CATEGORY_META).map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const meta = CATEGORY_META[category];
  if (!meta) return {};
  return {
    title: `${meta.label} Stories | AIBF`,
    description: meta.description,
    alternates: {
      canonical: `https://aibf.ngo/stories/category/${category}`,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const meta = CATEGORY_META[category];
  if (!meta) notFound();

  const stories = caseStudies.filter((s) => s.category === category);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://aibf.ngo" },
      { "@type": "ListItem", position: 2, name: "Stories", item: "https://aibf.ngo/stories" },
      { "@type": "ListItem", position: 3, name: meta.label, item: `https://aibf.ngo/stories/category/${category}` },
    ],
  };

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
              <Link href="/stories" className="hover:text-white/70">Stories</Link>
              <span>›</span>
              <span className="text-white/60">{meta.label}</span>
            </nav>
            <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">
              Category
            </span>
            <h1 className="mt-3 font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
              {meta.label} <span className="italic text-gold">Stories</span>
            </h1>
            <p className="mt-6 text-lg text-white/60 leading-relaxed max-w-2xl">
              {meta.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="text-white/40">{stories.length} documented {stories.length === 1 ? "case" : "cases"}</span>
              {meta.programSlug && (
                <>
                  <span className="text-white/20">·</span>
                  <Link
                    href={`/programs#${meta.programSlug}`}
                    className="text-gold hover:underline"
                  >
                    See the {meta.label} programme →
                  </Link>
                </>
              )}
            </div>
          </div>
        </section>

        <section className="bg-cream py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {stories.map((story) => {
                const hasImage =
                  story.images.length > 0 && !story.images[0].endsWith(".svg");
                return (
                  <Link
                    key={story.slug}
                    href={`/stories/${story.slug}`}
                    className="group bg-white rounded-sm overflow-hidden border border-cream-dark hover:border-gold/30 transition-all duration-300 hover:shadow-lg hover:shadow-gold/5"
                  >
                    <div className="relative h-48 overflow-hidden bg-emerald-deep/10">
                      {hasImage && (
                        <Image
                          src={story.images[0]}
                          alt={story.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      )}
                    </div>
                    <div className="p-5">
                      <time className="text-xs text-warm-gray">
                        {new Date(story.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                        })}
                      </time>
                      <h2 className="mt-2 font-[family-name:var(--font-playfair)] text-lg font-semibold text-charcoal group-hover:text-emerald-deep transition-colors leading-snug">
                        {story.title}
                      </h2>
                      <p className="mt-2 text-sm text-warm-gray line-clamp-3">
                        {story.summary}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
            {stories.length === 0 && (
              <p className="text-center text-warm-gray">No stories yet in this category.</p>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
