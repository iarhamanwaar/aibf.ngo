import type { Metadata } from "next";
import AboutPage from "../../about/page";

export const metadata: Metadata = {
  title: "ہمارے بارے میں | الافتخار بگویا فاؤنڈیشن",
  description:
    "AIBF کے بارے میں جانیں — پنجاب چیریٹی کمیشن میں رجسٹرڈ زمرہ (A) چیریٹی، 1998 سے دیہی پاکستان کی خدمت میں۔",
  alternates: {
    canonical: "https://aibf.ngo/ur/about",
    languages: {
      en: "https://aibf.ngo/about",
      ur: "https://aibf.ngo/ur/about",
      "x-default": "https://aibf.ngo/about",
    },
  },
};

export default function UrduAbout() {
  return <AboutPage />;
}
