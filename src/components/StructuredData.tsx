export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: "Al-Iftikhar Bugvia Foundation",
    alternateName: "AIBF",
    url: "https://aibf.ngo",
    logo: "https://aibf.ngo/logo-full.png",
    description:
      "A nonprofit serving rural communities through education, healthcare, and social welfare in Bhera, Buggah Sharif, and surrounding areas since 2008.",
    foundingDate: "2008",
    founder: {
      "@type": "Person",
      name: "Dr. Anwaar Ahmed Bugvi",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Sher Shahi Jamia Masjid Bugvia, Molana Zahoor Ahmed Bugvi Road",
      addressLocality: "Bhera",
      addressRegion: "Sargodha",
      addressCountry: "PK",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+92-301-6701340",
      contactType: "customer service",
      email: "arhamanwaar@gmail.com",
    },
    sameAs: ["https://www.instagram.com/aibf_org"],
    areaServed: {
      "@type": "Place",
      name: "Bhera, Buggah Sharif, District Jhelum, Pakistan",
    },
    nonprofitStatus: "Nonprofit501c3",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  );
}
