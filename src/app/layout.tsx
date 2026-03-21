import type { Metadata } from "next";
import { Outfit, Playfair_Display, Gulzar } from "next/font/google";
import ClientLayout from "@/components/ClientLayout";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

const gulzar = Gulzar({
  variable: "--font-urdu",
  subsets: ["arabic", "latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Al-Iftikhar Bugvia Foundation | Serving Islam & Humanity",
  description:
    "Al-Iftikhar Bugvia Foundation (AIBF) — a nonprofit serving rural communities through education, healthcare, and social welfare in Bhera, Buggah Sharif, and surrounding areas since 2008.",
  keywords: [
    "Al-Iftikhar Bugvia Foundation",
    "AIBF",
    "Bhera",
    "Buggah Sharif",
    "Bugvi",
    "charity",
    "Pakistan",
    "NGO",
  ],
  openGraph: {
    title: "Al-Iftikhar Bugvia Foundation",
    description:
      "Serving rural communities through education, healthcare, and social welfare since 2008.",
    url: "https://aibf.ngo",
    siteName: "AIBF",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${playfair.variable} ${gulzar.variable} h-full antialiased`}
    >
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
