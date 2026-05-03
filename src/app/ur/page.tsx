import type { Metadata } from "next";
import Home from "../page";

export const metadata: Metadata = {
  title: "الافتخار بگویا فاؤنڈیشن | اسلام و انسانیت کی خدمت",
  description:
    "الافتخار بگویا فاؤنڈیشن (AIBF) — بھیرہ، بگہ شریف اور گردونواح میں 1998 سے تعلیم، صحت اور سماجی فلاح کے ذریعے دیہی برادریوں کی خدمت کرنے والی غیر منافع بخش تنظیم۔",
  alternates: {
    canonical: "https://aibf.ngo/ur",
    languages: {
      en: "https://aibf.ngo/",
      ur: "https://aibf.ngo/ur",
      "x-default": "https://aibf.ngo/",
    },
  },
  openGraph: {
    title: "الافتخار بگویا فاؤنڈیشن",
    description: "1998 سے دیہی برادریوں کی خدمت۔",
    url: "https://aibf.ngo/ur",
    locale: "ur_PK",
    alternateLocale: ["en_US"],
  },
};

export default function UrduHome() {
  return <Home />;
}
