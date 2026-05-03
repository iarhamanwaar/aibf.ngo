import type { Metadata } from "next";
import FinancialsPage from "../../financials/page";

export const metadata: Metadata = {
  title: "مالیات اور شفافیت | AIBF",
  description:
    "AIBF کی مالی شفافیت: رجسٹریشن کی تفصیلات، بینکنگ، باقاعدہ اخراجات اور ادائیگیوں کا خلاصہ۔ پنجاب چیریٹی کمیشن زمرہ (A) چیریٹی۔",
  alternates: {
    canonical: "https://aibf.ngo/ur/financials",
    languages: {
      en: "https://aibf.ngo/financials",
      ur: "https://aibf.ngo/ur/financials",
      "x-default": "https://aibf.ngo/financials",
    },
  },
};

export default function UrduFinancials() {
  return <FinancialsPage />;
}
