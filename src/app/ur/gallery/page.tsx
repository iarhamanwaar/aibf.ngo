import type { Metadata } from "next";
import GalleryPage from "../../gallery/page";

export const metadata: Metadata = {
  title: "گیلری | الافتخار بگویا فاؤنڈیشن",
  description:
    "AIBF کے کام کی تصاویر — راشن مہمات، طبی کیمپ، سلائی مراکز، ورثہ کی بحالی اور دیہی پاکستان میں کمیونٹی تقریبات۔",
  alternates: {
    canonical: "https://aibf.ngo/ur/gallery",
    languages: {
      en: "https://aibf.ngo/gallery",
      ur: "https://aibf.ngo/ur/gallery",
      "x-default": "https://aibf.ngo/gallery",
    },
  },
};

export default function UrduGallery() {
  return <GalleryPage />;
}
