import type { Metadata } from "next";
import AnnualReportPage from "../../annual-report/page";

export const metadata: Metadata = {
  title: "سالانہ رپورٹ 2025–2026 | AIBF",
  description:
    "AIBF سال کا جائزہ — 2025–2026 میں صحت، تعلیم، راشن، روزگار اور ہنگامی امداد میں پروگرامز، سنگ میل، خاندانوں کی خدمت اور ادائیگیاں۔",
  alternates: {
    canonical: "https://aibf.ngo/ur/annual-report",
    languages: {
      en: "https://aibf.ngo/annual-report",
      ur: "https://aibf.ngo/ur/annual-report",
      "x-default": "https://aibf.ngo/annual-report",
    },
  },
};

export default function UrduAnnualReport() {
  return <AnnualReportPage />;
}
