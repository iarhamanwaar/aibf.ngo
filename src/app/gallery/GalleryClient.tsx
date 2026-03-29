"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { galleryItems } from "@/lib/data";
import { useLocale } from "@/lib/i18n";

const categories = [
  { key: "all", label: "All", labelUr: "سب" },
  { key: "ration", label: "Ration", labelUr: "راشن" },
  { key: "healthcare", label: "Healthcare", labelUr: "صحت" },
  { key: "sewing", label: "Sewing Center", labelUr: "سلائی سینٹر" },
  { key: "heritage", label: "Heritage", labelUr: "ورثہ" },
  { key: "plantation", label: "Plantation", labelUr: "شجرکاری" },
  { key: "team", label: "Team", labelUr: "ٹیم" },
  { key: "certificates", label: "Certificates", labelUr: "سرٹیفکیٹس" },
  { key: "events", label: "Events", labelUr: "تقریبات" },
  { key: "video", label: "Videos", labelUr: "ویڈیوز" },
] as const;

const categoryColors: Record<string, string> = {
  ration: "bg-amber-600",
  healthcare: "bg-rose-600",
  sewing: "bg-purple-600",
  heritage: "bg-emerald-mid",
  plantation: "bg-green-600",
  team: "bg-blue-600",
  certificates: "bg-gold",
  events: "bg-orange-600",
  video: "bg-red-600",
};

export default function GalleryClient() {
  const { locale } = useLocale();
  const isUr = locale === "ur";
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filter out SVG illustrations — only show real photos and videos
  const realItems = galleryItems.filter((item) => !item.src.endsWith(".svg"));

  const filtered =
    activeCategory === "all"
      ? realItems
      : realItems.filter((item) => item.category === activeCategory);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % filtered.length : null
    );
  }, [filtered.length]);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + filtered.length) % filtered.length : null
    );
  }, [filtered.length]);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [lightboxIndex, closeLightbox, goNext, goPrev]);

  return (
    <>
      {/* Hero */}
      <section className="bg-emerald-deep pt-32 pb-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className={`${isUr ? "font-[family-name:var(--font-urdu)]" : "font-[family-name:var(--font-playfair)]"} text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4`} dir={isUr ? "rtl" : undefined}>
            {isUr ? "گیلری" : "Gallery"}
          </h1>
          <p className={`${isUr ? "font-[family-name:var(--font-urdu)]" : ""} text-emerald-100/80 text-lg md:text-xl max-w-2xl mx-auto`} dir={isUr ? "rtl" : undefined}>
            {isUr ? "ایک تصویر میں ہمارے کام کی دستاویز" : "Documenting our work, one photo at a time."}
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <div className={`bg-charcoal text-white/80 py-4 px-4 ${isUr ? "font-[family-name:var(--font-urdu)]" : ""}`} dir={isUr ? "rtl" : undefined}>
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-6 text-sm tracking-wide">
          <span>
            <strong className="text-gold">{realItems.length}+</strong> {isUr ? "تصاویر" : "photos"}
          </span>
          <span className="text-white/30">|</span>
          <span>
            <strong className="text-gold">8</strong> {isUr ? "زمرے" : "categories"}
          </span>
          <span className="text-white/30">|</span>
          <span>{isUr ? "2025 سے اثرات کی دستاویز" : "Documenting impact since 2025"}</span>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="bg-cream sticky top-16 z-30 border-b border-cream-dark">
        <div className="max-w-5xl mx-auto px-4 py-4 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${isUr ? "font-[family-name:var(--font-urdu)]" : ""} ${
                    isActive
                      ? "bg-emerald-deep text-white shadow-md"
                      : "bg-white text-charcoal hover:bg-emerald-deep/10 border border-cream-dark"
                  }`}
                >
                  {isUr ? cat.labelUr : cat.label}
                  {cat.key !== "all" && (
                    <span className={`ml-1.5 text-xs ${isActive ? "text-gold" : "text-warm-gray"}`}>
                      {realItems.filter((i) => i.category === cat.key).length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Masonry grid */}
      <section className="bg-cream py-12 px-4">
        <div className="max-w-6xl mx-auto columns-1 sm:columns-2 lg:columns-3 gap-4">
          {filtered.map((item, index) => {
            const isVideo = item.src.endsWith(".mp4");
            return (
              <div
                key={item.src}
                className="break-inside-avoid mb-4 group relative cursor-pointer rounded-lg overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${(index % 12) * 50}ms` }}
                onClick={() => openLightbox(index)}
              >
                {isVideo ? (
                  <div className="relative aspect-video bg-charcoal">
                    <video
                      src={item.src}
                      className="w-full h-full object-cover"
                      muted
                      playsInline
                      preload="metadata"
                    />
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors">
                        <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                )}
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <span
                    className={`self-start px-2 py-0.5 rounded text-[11px] font-semibold text-white uppercase tracking-wider mb-2 ${
                      categoryColors[item.category] || "bg-gray-600"
                    }`}
                  >
                    {isVideo ? "video" : item.category}
                  </span>
                  <p className={`text-white text-sm leading-snug ${isUr ? "font-[family-name:var(--font-urdu)]" : ""}`} dir={isUr ? "rtl" : undefined}>{isUr ? item.altUrdu : item.alt}</p>
                  {item.date && (
                    <p className="text-white/60 text-xs mt-1">{item.date}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className={`text-center text-warm-gray py-20 text-lg ${isUr ? "font-[family-name:var(--font-urdu)]" : ""}`} dir={isUr ? "rtl" : undefined}>
            {isUr ? "اس زمرے میں ابھی تک کوئی تصاویر نہیں" : "No photos in this category yet."}
          </p>
        )}
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && filtered[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Previous arrow */}
          <button
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-10 p-2"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            aria-label="Previous image"
          >
            <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next arrow */}
          <button
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-10 p-2"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            aria-label="Next image"
          >
            <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image + caption */}
          <div
            className="flex flex-col items-center max-w-[90vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {filtered[lightboxIndex].src.endsWith(".mp4") ? (
              <video
                src={filtered[lightboxIndex].src}
                controls
                autoPlay
                className="max-h-[78vh] w-auto rounded"
                style={{ maxWidth: "90vw" }}
              />
            ) : (
              <Image
                src={filtered[lightboxIndex].src}
                alt={filtered[lightboxIndex].alt}
                width={1200}
                height={800}
                className="max-h-[78vh] w-auto object-contain rounded"
                sizes="90vw"
                priority
              />
            )}
            <div className="mt-3 text-center max-w-xl px-4">
              <p className={`text-white/90 text-sm md:text-base ${isUr ? "font-[family-name:var(--font-urdu)]" : ""}`} dir={isUr ? "rtl" : undefined}>
                {isUr ? filtered[lightboxIndex].altUrdu : filtered[lightboxIndex].alt}
              </p>
              <div className="flex items-center justify-center gap-3 mt-1.5">
                <span
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold text-white uppercase tracking-wider ${
                    categoryColors[filtered[lightboxIndex].category] || "bg-gray-600"
                  }`}
                >
                  {filtered[lightboxIndex].category}
                </span>
                {filtered[lightboxIndex].date && (
                  <span className="text-white/50 text-xs">
                    {filtered[lightboxIndex].date}
                  </span>
                )}
              </div>
              <p className="text-white/40 text-xs mt-2">
                {lightboxIndex + 1} / {filtered.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
