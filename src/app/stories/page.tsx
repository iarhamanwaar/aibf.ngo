import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { caseStudies } from "@/lib/data";
import StoriesGrid from "./StoriesGrid";
import { StoriesHero, StoriesCTA } from "./StoriesHeroAndCTA";

export const metadata: Metadata = {
  title: "Stories of Impact | Al-Iftikhar Bugvia Foundation",
  description:
    "Real stories of lives changed by AIBF — healthcare, education, livelihood, and emergency relief across rural Pakistan.",
  alternates: {
    canonical: "https://aibf.ngo/stories",
    languages: {
      en: "https://aibf.ngo/stories",
      ur: "https://aibf.ngo/ur/stories",
      "x-default": "https://aibf.ngo/stories",
    },
  },
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

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://aibf.ngo" },
    { "@type": "ListItem", position: 2, name: "Stories", item: "https://aibf.ngo/stories" },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "AIBF Stories of Impact",
  numberOfItems: caseStudies.length,
  itemListElement: caseStudies.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `https://aibf.ngo/stories/${s.slug}`,
    name: s.title,
  })),
};

export default function StoriesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <Navbar />
      <main>
        <StoriesHero
          totalCases={totalCases}
          programAreas={programAreas}
          totalFamilies={totalFamilies}
        />

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

        <StoriesCTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
