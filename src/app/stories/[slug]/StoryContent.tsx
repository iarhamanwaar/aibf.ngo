"use client";

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
  healthcare: "صحت",
  education: "تعلیم",
  livelihood: "روزگار",
  ration: "راشن",
  welfare: "فلاح",
  emergency: "ہنگامی",
};

export default function StoryContent({
  story,
  relatedStories,
}: {
  story: CaseStudy;
  relatedStories: CaseStudy[];
}) {
  const { locale } = useLocale();
  const isUr = locale === "ur";
  const urduFont = isUr ? "font-[family-name:var(--font-urdu)]" : "";

  const formattedDate = new Date(story.date).toLocaleDateString(
    isUr ? "ur-PK" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  const title = isUr ? story.titleUrdu : story.title;
  const storyText = isUr ? story.storyUrdu : story.story;
  const outcomeText = isUr ? story.outcomeUrdu : story.outcome;
  const categoryLabel = isUr
    ? categoryLabelsUrdu[story.category] || story.category
    : story.category;

  return (
    <div dir={isUr ? "rtl" : "ltr"} className={urduFont}>
      {/* Hero */}
      <section className="relative bg-emerald-deep pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,168,76,0.08),transparent_60%)]" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav
            className={`flex items-center gap-2 text-sm text-white/40 mb-8 ${
              isUr ? "flex-row-reverse justify-end" : ""
            }`}
          >
            <Link href="/" className="hover:text-white/70 transition-colors">
              {isUr ? "ہوم" : "Home"}
            </Link>
            <svg
              className={`w-3 h-3 ${isUr ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
            <Link
              href="/stories"
              className="hover:text-white/70 transition-colors"
            >
              {isUr ? "کہانیاں" : "Stories"}
            </Link>
            <svg
              className={`w-3 h-3 ${isUr ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
            <span className="text-white/60 truncate max-w-[200px]">
              {title}
            </span>
          </nav>

          {/* Category Badge */}
          <span className="inline-block px-3 py-1 text-xs font-medium tracking-wide uppercase rounded-sm bg-white/10 text-white/80 backdrop-blur-sm mb-6">
            {categoryLabel}
          </span>

          {/* Title */}
          <h1
            className={`${
              isUr
                ? "font-[family-name:var(--font-urdu)] text-3xl md:text-4xl lg:text-5xl leading-relaxed"
                : "font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl leading-[1.1]"
            } text-white tracking-tight`}
          >
            {title}
          </h1>

          {/* Meta */}
          <div
            className={`mt-6 flex flex-wrap items-center gap-4 text-sm text-white/50 ${
              isUr ? "flex-row-reverse justify-end" : ""
            }`}
          >
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                />
              </svg>
              <time>{formattedDate}</time>
            </div>
            <div className="w-1 h-1 rounded-full bg-white/20" />
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
              <span>{story.location}</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-white/20" />
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              <span>{story.beneficiary}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      {story.images.length > 0 && !story.images[0].endsWith(".svg") && (
        <section className="bg-charcoal">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
            <div
              className={`flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory ${
                story.images.length === 1 ? "justify-center" : ""
              }`}
            >
              {story.images
                .filter((img) => !img.endsWith(".svg"))
                .map((img, i) => (
                  <div
                    key={i}
                    className={`relative flex-shrink-0 snap-center rounded-sm overflow-hidden ${
                      story.images.length === 1
                        ? "w-full max-w-3xl h-72 md:h-96"
                        : "w-80 md:w-96 h-56 md:h-72"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${title} — ${isUr ? "تصویر" : "photo"} ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* Article Body */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          {/* Story Narrative */}
          <div className="prose-custom">
            <p
              className={`text-lg md:text-xl leading-relaxed text-charcoal/90 ${
                isUr
                  ? "font-[family-name:var(--font-urdu)] leading-loose"
                  : "first-letter:text-5xl first-letter:font-[family-name:var(--font-playfair)] first-letter:font-bold first-letter:text-emerald-deep first-letter:float-left first-letter:mr-3 first-letter:mt-1"
              }`}
            >
              {storyText}
            </p>
          </div>

          {/* Divider */}
          <div className="my-12 flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
            <div className="w-1.5 h-1.5 rotate-45 bg-gold" />
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          </div>

          {/* Aid Provided */}
          <div className="mb-12">
            <h2
              className={`${
                isUr
                  ? "font-[family-name:var(--font-urdu)] text-2xl"
                  : "font-[family-name:var(--font-playfair)] text-2xl md:text-3xl"
              } font-semibold text-charcoal mb-6`}
            >
              {isUr ? "فراہم کردہ امداد" : "Aid Provided"}
            </h2>
            <ul className="space-y-3">
              {story.aidProvided.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg
                    className={`w-5 h-5 text-gold flex-shrink-0 mt-0.5 ${isUr ? "order-last" : ""}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-charcoal/80 leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Total Aid Callout */}
          {story.totalAid && (
            <div className="mb-12 relative overflow-hidden bg-gradient-to-br from-emerald-deep to-emerald-mid rounded-sm p-8 text-white">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gold/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative">
                <span className="text-white/60 text-xs tracking-[0.2em] uppercase font-medium">
                  {isUr ? "فراہم کردہ کل امداد" : "Total Aid Provided"}
                </span>
                <div className="mt-2 font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-gold">
                  {story.totalAid}
                </div>
              </div>
            </div>
          )}

          {/* Outcome */}
          <div className="mb-12 bg-emerald-deep/5 border border-emerald-deep/10 rounded-sm p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-emerald-deep/10 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-emerald-deep"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h2
                className={`${
                  isUr
                    ? "font-[family-name:var(--font-urdu)] text-xl"
                    : "font-[family-name:var(--font-playfair)] text-2xl"
                } font-semibold text-emerald-deep`}
              >
                {isUr ? "نتیجہ" : "Outcome"}
              </h2>
            </div>
            <p className="text-charcoal/80 leading-relaxed text-lg">
              {outcomeText}
            </p>
          </div>

          {/* Tags */}
          {story.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {story.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-xs font-medium text-warm-gray bg-cream-dark rounded-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* More Stories */}
      {relatedStories.length > 0 && (
        <section className="bg-white border-t border-cream-dark py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">
                {isUr ? "مزید کہانیاں" : "More Stories"}
              </span>
              <h2
                className={`mt-3 ${
                  isUr
                    ? "font-[family-name:var(--font-urdu)] text-2xl"
                    : "font-[family-name:var(--font-playfair)] text-3xl md:text-4xl"
                } font-semibold text-charcoal`}
              >
                {isUr ? "متعلقہ کیسز" : "Related Cases"}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {relatedStories.map((related) => {
                const relGradient =
                  categoryGradients[related.category] ||
                  "from-gray-500 to-gray-700";
                const hasImage =
                  related.images.length > 0 &&
                  !related.images[0].endsWith(".svg");
                const relTitle = isUr ? related.titleUrdu : related.title;
                const relSummary = isUr
                  ? related.summaryUrdu
                  : related.summary;

                return (
                  <Link
                    key={related.slug}
                    href={`/stories/${related.slug}`}
                    className="group bg-cream rounded-sm overflow-hidden border border-cream-dark hover:border-gold/30 transition-all duration-300 hover:shadow-lg hover:shadow-gold/5"
                  >
                    <div className="relative h-44 overflow-hidden">
                      {hasImage ? (
                        <Image
                          src={related.images[0]}
                          alt={relTitle}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      ) : (
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${relGradient} opacity-90`}
                        >
                          <div className="absolute bottom-3 right-3 text-white/10 font-[family-name:var(--font-playfair)] text-7xl font-bold leading-none">
                            {related.category.charAt(0).toUpperCase()}
                          </div>
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        <span
                          className={`inline-block px-2.5 py-0.5 text-xs font-medium tracking-wide uppercase rounded-sm ${
                            hasImage
                              ? "bg-white/90 text-charcoal"
                              : "bg-white/20 text-white"
                          }`}
                        >
                          {isUr
                            ? categoryLabelsUrdu[related.category] ||
                              related.category
                            : related.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <time className="text-xs text-warm-gray">
                        {new Date(related.date).toLocaleDateString(
                          isUr ? "ur-PK" : "en-US",
                          { year: "numeric", month: "long" }
                        )}
                      </time>
                      <h3
                        className={`mt-2 ${
                          isUr
                            ? "font-[family-name:var(--font-urdu)] text-base"
                            : "font-[family-name:var(--font-playfair)] text-lg"
                        } font-semibold text-charcoal group-hover:text-emerald-deep transition-colors leading-snug`}
                      >
                        {relTitle}
                      </h3>
                      <p className="mt-2 text-sm text-warm-gray line-clamp-2">
                        {relSummary}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/stories"
                className="inline-flex items-center gap-2 text-emerald-deep font-medium hover:gap-3 transition-all"
              >
                {isUr ? "تمام کہانیاں دیکھیں" : "View All Stories"}
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
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-emerald-deep py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <h2
            className={`${
              isUr
                ? "font-[family-name:var(--font-urdu)] text-2xl md:text-3xl"
                : "font-[family-name:var(--font-playfair)] text-3xl md:text-4xl"
            } text-white tracking-tight leading-tight`}
          >
            {isUr ? (
              "ہماری مدد کریں ایسی مزید کہانیاں لکھنے میں"
            ) : (
              <>
                Help us write more stories{" "}
                <span className="italic text-gold">like this</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-white/60 leading-relaxed">
            {isUr
              ? "آپ کا عطیہ کسی کی صحت یابی، تعلیم یا نئی روزگار کی شروعات ہو سکتا ہے۔"
              : "Your donation can be the beginning of someone's recovery, education, or new livelihood."}
          </p>
          <a
            href="/donate"
            className="mt-8 inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-charcoal font-semibold px-8 py-3.5 rounded-sm transition-colors text-sm tracking-wide uppercase"
          >
            {isUr ? "ابھی عطیہ دیں" : "Donate Now"}
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
          </a>
        </div>
      </section>
    </div>
  );
}
