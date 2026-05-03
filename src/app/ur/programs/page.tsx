import type { Metadata } from "next";
import ProgramsPage from "../../programs/page";

export const metadata: Metadata = {
  title: "ہمارے پروگرام | الافتخار بگویا فاؤنڈیشن",
  description:
    "AIBF کے 8 فعال پروگرامز: صحت، راشن، تعلیم، روزگار، ہنگامی امداد، سماجی فلاح، ورثہ کی بحالی اور سبز شجرکاری۔",
  alternates: {
    canonical: "https://aibf.ngo/ur/programs",
    languages: {
      en: "https://aibf.ngo/programs",
      ur: "https://aibf.ngo/ur/programs",
      "x-default": "https://aibf.ngo/programs",
    },
  },
};

export default function UrduPrograms() {
  return <ProgramsPage />;
}
