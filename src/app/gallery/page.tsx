import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Gallery | Al-Iftikhar Bugvia Foundation",
  description:
    "Photos documenting AIBF's work — ration drives, health camps, sewing centers, heritage preservation, and community events across rural Pakistan.",
  alternates: {
    canonical: "https://aibf.ngo/gallery",
  },
};

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main>
        <GalleryClient />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
