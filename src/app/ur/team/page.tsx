import type { Metadata } from "next";
import TeamPage from "../../team/page";

export const metadata: Metadata = {
  title: "ہماری ٹیم | الافتخار بگویا فاؤنڈیشن",
  description:
    "AIBF کی ٹیم سے ملیں — چیئرمین، سرپرست، سیکریٹریز، کوآرڈینیٹرز اور فیلڈ آفیسرز جو بھیرہ، لاہور اور پاکستان کے دیہی علاقوں میں خدمت کر رہے ہیں۔",
  alternates: {
    canonical: "https://aibf.ngo/ur/team",
    languages: {
      en: "https://aibf.ngo/team",
      ur: "https://aibf.ngo/ur/team",
      "x-default": "https://aibf.ngo/team",
    },
  },
};

export default function UrduTeam() {
  return <TeamPage />;
}
