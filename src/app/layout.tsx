import type { Metadata } from "next";
import { Outfit, Playfair_Display, Gulzar } from "next/font/google";
import Script from "next/script";
import ClientLayout from "@/components/ClientLayout";
import StructuredData from "@/components/StructuredData";
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
  metadataBase: new URL("https://aibf.ngo"),
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
    "nonprofit",
    "education",
    "healthcare",
    "social welfare",
    "Sargodha",
    "Jhelum",
  ],
  alternates: {
    canonical: "https://aibf.ngo",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Al-Iftikhar Bugvia Foundation",
    description:
      "Serving rural communities through education, healthcare, and social welfare since 2008.",
    url: "https://aibf.ngo",
    siteName: "Al-Iftikhar Bugvia Foundation",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/logo-full.png",
        width: 1200,
        height: 630,
        alt: "Al-Iftikhar Bugvia Foundation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Al-Iftikhar Bugvia Foundation",
    description:
      "Serving rural communities through education, healthcare, and social welfare since 2008.",
    images: ["/logo-full.png"],
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
        <StructuredData />
        <ClientLayout>{children}</ClientLayout>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DTJCXBD4FP"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DTJCXBD4FP');
          `}
        </Script>

        {/* TODO: Replace PLACEHOLDER with your Cloudflare Web Analytics token from the Cloudflare dashboard */}
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "PLACEHOLDER"}'
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
