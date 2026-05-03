import type { Metadata } from "next";
import DonatePage from "../../donate/page";

export const metadata: Metadata = {
  title: "عطیہ کریں | الافتخار بگویا فاؤنڈیشن",
  description:
    "AIBF کے مشن کی حمایت کریں — بینک ٹرانسفر یا واٹس ایپ کے ذریعے عطیہ کریں۔ آپ کا تعاون پاکستان کی دیہی برادریوں کے لیے صحت، تعلیم، راشن اور روزگار پروگرامز کو فنڈ کرتا ہے۔",
  alternates: {
    canonical: "https://aibf.ngo/ur/donate",
    languages: {
      en: "https://aibf.ngo/donate",
      ur: "https://aibf.ngo/ur/donate",
      "x-default": "https://aibf.ngo/donate",
    },
  },
};

export default function UrduDonate() {
  return <DonatePage />;
}
