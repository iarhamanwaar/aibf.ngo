import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { caseStudies } from "@/lib/data";
import StoryContent from "./StoryContent";

// ---------------------------------------------------------------------------
// Static params for export
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  return caseStudies.map((story) => ({ slug: story.slug }));
}

// ---------------------------------------------------------------------------
// Dynamic metadata per story
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = caseStudies.find((s) => s.slug === slug);
  if (!story) return {};

  return {
    title: `${story.title} | AIBF Stories of Impact`,
    description: story.summary,
    alternates: {
      canonical: `https://aibf.ngo/stories/${story.slug}`,
      languages: {
        en: `https://aibf.ngo/stories/${story.slug}`,
        ur: `https://aibf.ngo/ur/stories/${story.slug}`,
        "x-default": `https://aibf.ngo/stories/${story.slug}`,
      },
    },
    openGraph: {
      title: story.title,
      description: story.summary,
      url: `https://aibf.ngo/stories/${story.slug}`,
      siteName: "Al-Iftikhar Bugvia Foundation",
      type: "article",
      publishedTime: story.date,
      images:
        story.images.length > 0 && !story.images[0].endsWith(".svg")
          ? [{ url: story.images[0], width: 1200, height: 630 }]
          : [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: story.title,
      description: story.summary,
    },
  };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = caseStudies.find((s) => s.slug === slug);
  if (!story) notFound();

  const relatedStories = caseStudies
    .filter((s) => s.category === story.category && s.slug !== story.slug)
    .slice(0, 3);

  // Structured data
  const validImages = story.images.filter((img) => !img.endsWith(".svg"));
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: story.title,
    inLanguage: "en",
    datePublished: story.date,
    dateModified: story.date,
    description: story.summary,
    articleSection: story.category,
    keywords: story.tags?.join(", "),
    image:
      validImages.length > 0
        ? validImages.map((img) => `https://aibf.ngo${img}`)
        : ["https://aibf.ngo/og-image.png"],
    author: {
      "@type": "Organization",
      name: "Al-Iftikhar Bugvia Foundation",
      url: "https://aibf.ngo",
    },
    publisher: {
      "@type": "Organization",
      name: "AIBF",
      url: "https://aibf.ngo",
      logo: {
        "@type": "ImageObject",
        url: "https://aibf.ngo/logo-full.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://aibf.ngo/stories/${story.slug}`,
    },
    contentLocation: {
      "@type": "Place",
      name: story.location,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://aibf.ngo" },
      { "@type": "ListItem", position: 2, name: "Stories", item: "https://aibf.ngo/stories" },
      { "@type": "ListItem", position: 3, name: story.title, item: `https://aibf.ngo/stories/${story.slug}` },
    ],
  };

  return (
    <>
      <Navbar />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <StoryContent story={story} relatedStories={relatedStories} />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
