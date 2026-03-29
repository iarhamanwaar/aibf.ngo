"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "@/lib/i18n";
import type { CaseStudy } from "@/lib/data";

const categoryColors: Record<string, { bg: string; text: string }> = {
  healthcare: { bg: "bg-emerald-deep/10", text: "text-emerald-deep" },
  education: { bg: "bg-blue-50", text: "text-blue-700" },
  livelihood: { bg: "bg-amber-50", text: "text-amber-700" },
  ration: { bg: "bg-orange-50", text: "text-orange-700" },
  welfare: { bg: "bg-purple-50", text: "text-purple-700" },
  emergency: { bg: "bg-red-50", text: "text-red-700" },
};

const categoryGradients: Record<string, string> = {
  healthcare: "from-emerald-deep to-emerald-mid",
  education: "from-blue-600 to-blue-800",
  livelihood: "from-amber-500 to-amber-700",
  ration: "from-orange-500 to-orange-700",
  welfare: "from-purple-500 to-purple-700",
  emergency: "from-red-500 to-red-700",
};

const categoryLabelsUrdu: Record<string, string> = {
  all: "سب",
  healthcare: "صحت",
  education: "تعلیم",
  livelihood: "روزگار",
  ration: "راشن",
  welfare: "فلاح",
  emergency: "ہنگامی",
};

interface StoriesGridProps {
  stories: CaseStudy[];
  categories: { key: string; label: string }[];
}

export default function StoriesGrid({ stories, categories }: StoriesGridProps) {
  const [active, setActive] = useState("all");
  const { locale } = useLocale();
  const isUr = locale === "ur";

  const filtered =
    active === "all"
      ? stories
      : stories.filter((s) => s.category === active);

  // Sort: featured first, then by date descending
  const sorted = [...filtered].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div dir={isUr ? "rtl" : "ltr"}>
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActive(cat.key)}
            className={`px-4 py-2 text-sm font-medium rounded-sm transition-all duration-200 ${
              active === cat.key
                ? "bg-emerald-deep text-white"
                : "bg-white text-warm-gray hover:bg-emerald-deep/5 hover:text-emerald-deep border border-cream-dark"
            } ${isUr ? "font-[family-name:var(--font-urdu)]" : ""}`}
          >
            {isUr ? categoryLabelsUrdu[cat.key] || cat.label : cat.label}
            {cat.key !== "all" && (
              <span className={`${isUr ? "mr-1.5" : "ml-1.5"} text-xs opacity-60`}>
                {stories.filter((s) => s.category === cat.key).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {sorted.map((story, i) => {
          const isFeatured = story.featured && active === "all" && i < 2;
          const colors = categoryColors[story.category] || {
            bg: "bg-gray-100",
            text: "text-gray-700",
          };
          const gradient =
            categoryGradients[story.category] || "from-gray-500 to-gray-700";
          const hasImage = story.images.length > 0;

          return (
            <Link
              key={story.slug}
              href={`/stories/${story.slug}`}
              className={`group relative bg-white rounded-sm overflow-hidden border border-cream-dark hover:border-gold/30 transition-all duration-300 hover:shadow-lg hover:shadow-gold/5 ${
                isFeatured ? "md:col-span-2 lg:col-span-2" : ""
              }`}
            >
              {/* Image or Gradient Placeholder */}
              <div
                className={`relative overflow-hidden ${
                  isFeatured ? "h-64 md:h-80" : "h-48 md:h-56"
                }`}
              >
                {hasImage ? (
                  <Image
                    src={story.images[0]}
                    alt={isUr ? story.titleUrdu : story.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes={
                      isFeatured
                        ? "(max-width: 768px) 100vw, 66vw"
                        : "(max-width: 768px) 100vw, 33vw"
                    }
                  />
                ) : (
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-90`}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,255,255,0.1),transparent_60%)]" />
                    <div className="absolute bottom-4 right-4 text-white/10 font-[family-name:var(--font-playfair)] text-8xl font-bold leading-none">
                      {story.category.charAt(0).toUpperCase()}
                    </div>
                  </div>
                )}

                {/* Category Badge */}
                <div className={`absolute top-4 ${isUr ? "right-4" : "left-4"}`}>
                  <span
                    className={`inline-block px-3 py-1 text-xs font-medium tracking-wide uppercase rounded-sm ${
                      hasImage
                        ? "bg-white/90 backdrop-blur-sm text-charcoal"
                        : "bg-white/20 backdrop-blur-sm text-white"
                    } ${isUr ? "font-[family-name:var(--font-urdu)]" : ""}`}
                  >
                    {isUr ? categoryLabelsUrdu[story.category] || story.category : story.category}
                  </span>
                </div>

                {/* Featured Badge */}
                {story.featured && (
                  <div className={`absolute top-4 ${isUr ? "left-4" : "right-4"}`}>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-gold/90 text-charcoal rounded-sm backdrop-blur-sm ${isUr ? "font-[family-name:var(--font-urdu)]" : ""}`}>
                      <svg
                        className="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {isUr ? "نمایاں" : "Featured"}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 lg:p-8">
                <div className="flex items-center gap-3 text-xs text-warm-gray mb-3">
                  <time>
                    {new Date(story.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <span className="w-1 h-1 rounded-full bg-warm-gray/40" />
                  <span>{story.location}</span>
                </div>

                <h3
                  className={`font-semibold text-charcoal leading-snug group-hover:text-emerald-deep transition-colors ${
                    isFeatured ? "text-2xl lg:text-3xl" : "text-xl"
                  } ${isUr ? "font-[family-name:var(--font-urdu)]" : "font-[family-name:var(--font-playfair)]"}`}
                >
                  {isUr ? story.titleUrdu : story.title}
                </h3>

                <p className={`mt-3 text-warm-gray text-sm leading-relaxed line-clamp-2 ${isUr ? "font-[family-name:var(--font-urdu)]" : ""}`}>
                  {isUr ? story.summaryUrdu : story.summary}
                </p>

                {story.totalAid && (
                  <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-gold">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    {isUr ? "کل امداد:" : "Total aid:"} {story.totalAid}
                  </div>
                )}

                <div className={`mt-5 flex items-center gap-2 text-emerald-deep text-sm font-medium group-hover:gap-3 transition-all ${isUr ? "font-[family-name:var(--font-urdu)]" : ""}`}>
                  {isUr ? "مکمل کہانی پڑھیں" : "Read Full Story"}
                  <svg
                    className={`w-4 h-4 ${isUr ? "rotate-180" : ""}`}
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
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Empty State */}
      {sorted.length === 0 && (
        <div className="text-center py-20">
          <p className={`text-warm-gray ${isUr ? "font-[family-name:var(--font-urdu)]" : ""}`}>
            {isUr
              ? "اس زمرے میں ابھی تک کوئی کہانی نہیں ملی۔"
              : "No stories found in this category yet."}
          </p>
        </div>
      )}
    </div>
  );
}
