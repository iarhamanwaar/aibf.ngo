"use client";

import { useLocale } from "@/lib/i18n";
import { caseStudies } from "@/lib/data";

const featured = caseStudies.filter((c) => c.featured).slice(0, 4);

const categoryColors: Record<string, string> = {
  healthcare: "bg-rose-600",
  education: "bg-blue-600",
  livelihood: "bg-amber-600",
  ration: "bg-emerald-mid",
  welfare: "bg-purple-600",
  emergency: "bg-red-600",
};

export default function FeaturedStories() {
  const { locale } = useLocale();
  const isRTL = locale === "ur";
  const urduFont = isRTL ? "font-[family-name:var(--font-urdu)]" : "";

  return (
    <section
      dir={isRTL ? "rtl" : "ltr"}
      className={`py-24 lg:py-32 bg-white ${urduFont}`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">
            {isRTL ? "حقیقی کہانیاں" : "Real Stories"}
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-charcoal tracking-tight">
            {isRTL ? "اثرات کی " : "Stories of "}
            <span className="italic text-emerald-deep">
              {isRTL ? "کہانیاں" : "Impact"}
            </span>
          </h2>
          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="w-12 h-px bg-gold/40" />
            <div className="w-1.5 h-1.5 rotate-45 bg-gold" />
            <div className="w-12 h-px bg-gold/40" />
          </div>
          <p className="mt-6 text-warm-gray max-w-2xl mx-auto">
            {isRTL
              ? "ہر کہانی ایک حقیقی انسان کی ہے جس کی زندگی آپ کے عطیات سے بدلی۔"
              : "Every story is a real person whose life was changed by your generosity."}
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {featured.map((story) => (
            <a
              key={story.slug}
              href={`/stories/${story.slug}`}
              className="group block bg-cream border border-cream-dark hover:border-gold/30 transition-all duration-300 hover:shadow-lg overflow-hidden"
            >
              {/* Image or gradient placeholder */}
              {story.images.length > 0 ? (
                <div className="h-48 overflow-hidden">
                  <img
                    src={story.images[0]}
                    alt={isRTL ? story.titleUrdu : story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ) : (
                <div className="h-48 bg-gradient-to-br from-emerald-deep to-emerald-mid flex items-center justify-center">
                  <span className="text-6xl opacity-30">
                    {story.category === "healthcare"
                      ? "🏥"
                      : story.category === "education"
                      ? "📚"
                      : story.category === "livelihood"
                      ? "💼"
                      : story.category === "ration"
                      ? "🛒"
                      : story.category === "emergency"
                      ? "🚨"
                      : "🤝"}
                  </span>
                </div>
              )}

              <div className="p-6">
                {/* Category + Date */}
                <div
                  className={`flex items-center gap-3 mb-3 ${
                    isRTL ? "flex-row-reverse" : ""
                  }`}
                >
                  <span
                    className={`text-white text-[10px] font-medium tracking-wider uppercase px-2 py-0.5 ${
                      categoryColors[story.category] || "bg-emerald-deep"
                    }`}
                  >
                    {story.category}
                  </span>
                  <span className="text-warm-gray text-xs">
                    {new Date(story.date).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  {story.totalAid && (
                    <span className="text-gold text-xs font-semibold">
                      {story.totalAid}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-charcoal group-hover:text-emerald-deep transition-colors mb-2">
                  {isRTL ? story.titleUrdu : story.title}
                </h3>

                {/* Summary */}
                <p className="text-warm-gray text-sm leading-relaxed line-clamp-2">
                  {isRTL ? story.summaryUrdu : story.summary}
                </p>

                {/* Read more */}
                <span
                  className={`inline-flex items-center gap-1 mt-4 text-emerald-deep text-sm font-medium group-hover:gap-2 transition-all ${
                    isRTL ? "flex-row-reverse" : ""
                  }`}
                >
                  {isRTL ? "مکمل کہانی پڑھیں" : "Read Full Story"}
                  <svg
                    className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <a
            href="/stories"
            className="inline-block border-2 border-emerald-deep text-emerald-deep hover:bg-emerald-deep hover:text-white px-8 py-3 font-semibold tracking-wide transition-all duration-300"
          >
            {isRTL ? "تمام کہانیاں دیکھیں" : "View All Stories"}
          </a>
        </div>
      </div>
    </section>
  );
}
