import type { Metadata } from "next";
import StoriesPage from "../../stories/page";

export const metadata: Metadata = {
  title: "اثرات کی کہانیاں | الافتخار بگویا فاؤنڈیشن",
  description:
    "AIBF سے بدلی ہوئی زندگیوں کی حقیقی کہانیاں — صحت، تعلیم، روزگار اور ہنگامی امداد دیہی پاکستان میں۔",
  alternates: {
    canonical: "https://aibf.ngo/ur/stories",
    languages: {
      en: "https://aibf.ngo/stories",
      ur: "https://aibf.ngo/ur/stories",
      "x-default": "https://aibf.ngo/stories",
    },
  },
};

export default function UrduStories() {
  return <StoriesPage />;
}
