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
    alternates: { canonical: `https://aibf.ngo/stories/${story.slug}` },
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: story.title,
    datePublished: story.date,
    description: story.summary,
    image:
      story.images.length > 0 && !story.images[0].endsWith(".svg")
        ? `https://aibf.ngo${story.images[0]}`
        : "https://aibf.ngo/og-image.png",
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
  };

  return (
    <>
      <Navbar />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <StoryContent story={story} relatedStories={relatedStories} />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
