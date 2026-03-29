import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { teamMembers, timeline, impactStats } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us | Al-Iftikhar Bugvia Foundation",
  description:
    "Learn about AIBF — a Punjab Charity Commission registered Category (A) charity serving rural Pakistan since 2008. Meet our team, see our timeline, and verify our credentials.",
  alternates: { canonical: "https://aibf.ngo/about" },
};

const categoryColors: Record<string, string> = {
  milestone: "bg-gold",
  education: "bg-blue-500",
  healthcare: "bg-red-500",
  ration: "bg-orange-500",
  environment: "bg-green-500",
  welfare: "bg-purple-500",
  livelihood: "bg-teal-500",
  emergency: "bg-rose-600",
};

const locations = [
  { name: "Bhera, District Sargodha", nameUrdu: "بھیرہ، ضلع سرگودھا", note: "HQ — AIBF Bhera Office", noteUrdu: "ہیڈ کوارٹر — AIBF بھیرہ دفتر" },
  { name: "Bugga Sharif, District Jhelum", nameUrdu: "بگہ شریف، ضلع جہلم", note: "", noteUrdu: "" },
  { name: "Khanna, District Jhelum", nameUrdu: "کھنہ، ضلع جہلم", note: "", noteUrdu: "" },
  { name: "Maliyar, District Jhelum", nameUrdu: "ملیار، ضلع جہلم", note: "", noteUrdu: "" },
  { name: "Dhudian, District Jhelum", nameUrdu: "دھدیاں، ضلع جہلم", note: "", noteUrdu: "" },
  { name: "Lilla Town", nameUrdu: "للہ ٹاؤن", note: "", noteUrdu: "" },
  { name: "Lahore", nameUrdu: "لاہور", note: "AIBF Lahore Office", noteUrdu: "AIBF لاہور دفتر" },
  { name: "Muzaffargarh", nameUrdu: "مظفرگڑھ", note: "Disaster response", noteUrdu: "آفات امداد" },
];

const stats = [
  { value: impactStats.patientsServed, label: "Patients Served", labelUrdu: "علاج شدہ مریض" },
  { value: impactStats.rationBags, label: "Ration Bags Distributed", labelUrdu: "راشن بیگ تقسیم" },
  { value: impactStats.treesPlanted, label: "Trees Planted", labelUrdu: "درخت لگائے" },
  { value: impactStats.womenTrained, label: "Women Trained", labelUrdu: "خواتین تربیت یافتہ" },
  { value: impactStats.dispensaries, label: "Dispensaries Supported", labelUrdu: "ڈسپنسریاں" },
  { value: impactStats.wheelchairsDonated, label: "Wheelchairs Donated", labelUrdu: "وہیل چیئرز عطیہ" },
  { value: impactStats.healthCamps, label: "Health Camps Conducted", labelUrdu: "طبی کیمپ" },
  { value: "Rs 50,000/mo", label: "Zakat Distributed Monthly", labelUrdu: "ماہانہ زکوٰۃ تقسیم" },
];

export default function AboutPage() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: "Al-Iftikhar Bugvia Foundation",
    alternateName: "AIBF",
    url: "https://aibf.ngo",
    logo: "https://aibf.ngo/logo-full.png",
    description:
      "A Punjab Charity Commission registered Category (A) charity serving rural Pakistan through healthcare, education, and social welfare since 2008.",
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
      email: "contact@aibf.ngo",
    },
    sameAs: ["https://www.instagram.com/aibf_org"],
    areaServed: {
      "@type": "Place",
      name: "Bhera, Buggah Sharif, District Jhelum, Pakistan",
    },
    nonprofitStatus: "Nonprofit501c3",
    taxID: "PB-6976792864708031",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Navbar />
      <main>
        {/* ================================================================
            HERO
        ================================================================ */}
        <section className="relative bg-emerald-deep pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
          {/* Decorative background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                backgroundSize: "40px 40px",
              }}
            />
          </div>
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <div className="mx-auto max-w-3xl">
              <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-6">
                About AIBF
              </p>
              <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                Serving Islam &amp; Humanity{" "}
                <span className="text-gold">Since 2008</span>
              </h1>
              <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                A registered Category (A) Charity under Punjab Charity Commission,
                operating across Bhera, Bugga Sharif, and the villages of District
                Jhelum and Sargodha.
              </p>
            </div>
            {/* Gold ornament */}
            <div className="mt-12 flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold" />
              <div className="h-2 w-2 rotate-45 bg-gold" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold" />
            </div>
          </div>
        </section>

        {/* ================================================================
            MISSION & VISION
        ================================================================ */}
        <section className="py-20 lg:py-28 bg-cream">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-4">
                Our Purpose
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-charcoal">
                Mission &amp; Vision
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
              {/* Mission */}
              <div className="bg-white p-8 lg:p-10 border border-cream-dark relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-deep to-emerald-mid" />
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-emerald-deep/10 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-emerald-deep"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.841m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-charcoal">
                      Our Mission
                    </h3>
                  </div>
                </div>
                <p className="text-warm-gray leading-relaxed text-lg">
                  Direct service to the most vulnerable — healthcare, education,
                  food security, and livelihood — with a zero overhead philosophy.
                  Every rupee donated reaches those who need it most, delivered by
                  volunteers who give their time freely.
                </p>
              </div>
              {/* Vision */}
              <div className="bg-white p-8 lg:p-10 border border-cream-dark relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold to-gold-light" />
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gold/10 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-gold"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.64 0 8.577 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.64 0-8.577-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-charcoal">
                      Our Vision
                    </h3>
                  </div>
                </div>
                <p className="text-warm-gray leading-relaxed text-lg">
                  A model of community-driven welfare where every family in the
                  Kadhee region and beyond has access to healthcare, education, and
                  economic opportunity. We envision self-sustaining communities
                  empowered through knowledge, health, and dignity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
            IMPACT NUMBERS
        ================================================================ */}
        <section className="py-20 lg:py-28 bg-emerald-deep relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                backgroundSize: "48px 48px",
              }}
            />
          </div>
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-4">
                Our Reach
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-white">
                Impact in Numbers
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="text-center p-6 lg:p-8 bg-white/5 border border-white/10 backdrop-blur-sm"
                >
                  <p className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-gold mb-2">
                    {stat.value}
                  </p>
                  <p className="text-white/70 text-sm font-medium tracking-wide uppercase">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================
            REGISTRATION & CERTIFICATION
        ================================================================ */}
        <section className="py-20 lg:py-28 bg-cream">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-4">
                Verified & Transparent
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-charcoal">
                Registration &amp; Certification
              </h2>
            </div>
            {/* Certificate Card */}
            <div className="max-w-5xl mx-auto bg-white border-2 border-gold/30 p-2">
              <div className="border border-gold/20 p-6 lg:p-10">
                <div className="grid lg:grid-cols-2 gap-10 items-center">
                  {/* Certificate Image */}
                  <div className="relative">
                    <div className="border border-cream-dark p-2 bg-cream">
                      <img
                        src="/images/certificates/pcc-registration.jpg"
                        alt="Punjab Charity Commission Registration Certificate — Al-Iftikhar Bugvia Foundation"
                        className="w-full h-auto"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  {/* Registration Details */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-emerald-deep flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                          />
                        </svg>
                      </div>
                      <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-charcoal">
                        Punjab Charity Commission
                      </h3>
                    </div>
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                        <span className="text-warm-gray text-sm font-medium min-w-[120px]">
                          Registration No
                        </span>
                        <span className="text-charcoal font-semibold font-mono text-sm">
                          {impactStats.registrationNumber}
                        </span>
                      </div>
                      <div className="h-px bg-cream-dark" />
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                        <span className="text-warm-gray text-sm font-medium min-w-[120px]">
                          Category
                        </span>
                        <span className="text-charcoal font-semibold text-sm">
                          {impactStats.registrationCategory}
                        </span>
                      </div>
                      <div className="h-px bg-cream-dark" />
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                        <span className="text-warm-gray text-sm font-medium min-w-[120px]">
                          Authority
                        </span>
                        <span className="text-charcoal font-semibold text-sm">
                          {impactStats.registrationAuthority}, Government of Punjab
                        </span>
                      </div>
                      <div className="h-px bg-cream-dark" />
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                        <span className="text-warm-gray text-sm font-medium min-w-[120px]">
                          Valid
                        </span>
                        <span className="text-charcoal font-semibold text-sm">
                          {impactStats.registrationValid}
                        </span>
                      </div>
                      <div className="h-px bg-cream-dark" />
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                        <span className="text-warm-gray text-sm font-medium min-w-[120px]">
                          Scope
                        </span>
                        <span className="text-charcoal font-semibold text-sm">
                          Operations in whole of Punjab
                        </span>
                      </div>
                    </div>
                    {/* Additional registrations */}
                    <div className="mt-8 space-y-4">
                      <div className="flex items-start gap-3 p-4 bg-cream border border-cream-dark">
                        <svg
                          className="w-5 h-5 text-emerald-mid mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                        <div>
                          <p className="text-charcoal font-medium text-sm">
                            NPO / SECP Section 42 Registration
                          </p>
                          <p className="text-warm-gray text-sm">In progress</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-cream border border-cream-dark">
                        <svg
                          className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                        <div>
                          <p className="text-charcoal font-medium text-sm">
                            Pakistan Red Crescent Society
                          </p>
                          <p className="text-warm-gray text-sm">
                            Official partnership for healthcare services
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
            TIMELINE
        ================================================================ */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-4">
                Our Journey
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-charcoal">
                Milestones &amp; Timeline
              </h2>
            </div>
            <div className="relative max-w-3xl mx-auto">
              {/* Vertical line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-cream-dark md:-translate-x-px" />
              <div className="space-y-12">
                {timeline.map((event, i) => {
                  const isLeft = i % 2 === 0;
                  const dotColor =
                    categoryColors[event.category] || "bg-emerald-mid";
                  return (
                    <div key={i} className="relative">
                      {/* Dot */}
                      <div
                        className={`absolute left-4 md:left-1/2 w-3 h-3 rounded-full ${dotColor} ring-4 ring-white -translate-x-1.5 md:-translate-x-1.5 top-1`}
                      />
                      {/* Content card */}
                      <div
                        className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
                          isLeft
                            ? "md:mr-auto md:pr-0"
                            : "md:ml-auto md:pl-0"
                        }`}
                      >
                        <div className="bg-cream p-5 border border-cream-dark">
                          <span className="inline-block text-xs font-semibold tracking-wider uppercase text-gold mb-2">
                            {event.date}
                          </span>
                          <h3 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-charcoal mb-1">
                            {event.title}
                          </h3>
                          <p className="text-warm-gray text-sm leading-relaxed">
                            {event.description}
                          </p>
                          <span
                            className={`inline-block mt-3 text-xs font-medium px-2 py-0.5 text-white ${dotColor}`}
                          >
                            {event.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
            TEAM
        ================================================================ */}
        <section className="py-20 lg:py-28 bg-cream">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-4">
                The People Behind AIBF
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-charcoal">
                Our Team
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {teamMembers.map((member, i) => {
                const initials = member.name
                  .split(" ")
                  .filter(
                    (w) =>
                      !["Dr", "Muhammad", "Sahibzada"].includes(w)
                  )
                  .slice(0, 2)
                  .map((w) => w[0])
                  .join("");
                return (
                  <div
                    key={i}
                    className="bg-white p-6 border border-cream-dark flex items-start gap-4"
                  >
                    {/* Avatar */}
                    <div className="w-14 h-14 flex-shrink-0 bg-emerald-deep flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">
                        {initials}
                      </span>
                    </div>
                    {/* Info */}
                    <div className="min-w-0">
                      <h3 className="font-semibold text-charcoal text-sm leading-snug">
                        {member.name}
                      </h3>
                      <p className="text-gold text-sm font-medium mt-1">
                        {member.role}
                      </p>
                      <div className="flex items-center gap-1 mt-2 text-warm-gray text-xs">
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                          />
                        </svg>
                        <span>{member.location}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================================================================
            WHERE WE WORK
        ================================================================ */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-4">
                Our Reach
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-charcoal">
                Where We Work
              </h2>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="grid sm:grid-cols-2 gap-4">
                {locations.map((loc, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-5 bg-cream border border-cream-dark"
                  >
                    <div className="w-8 h-8 flex-shrink-0 bg-emerald-deep/10 flex items-center justify-center mt-0.5">
                      <svg
                        className="w-4 h-4 text-emerald-deep"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-charcoal font-medium text-sm">
                        {loc.name}
                      </p>
                      {loc.note && (
                        <>
                          <p className="text-gold text-xs font-medium mt-0.5">
                            {loc.note}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
            CTA — Join Our Mission
        ================================================================ */}
        <section className="py-20 lg:py-28 bg-emerald-deep relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                backgroundSize: "40px 40px",
              }}
            />
          </div>
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-white mb-2">
              Join Our Mission
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-10">
              Whether through donations, volunteering, or spreading the word —
              every effort counts. Together we can serve those who need it most.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/#donate"
                className="inline-block bg-gold hover:bg-gold-light text-emerald-deep px-8 py-3.5 font-semibold tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
              >
                Donate Now
              </a>
              <a
                href="/#contact"
                className="inline-block border border-white/30 hover:border-gold text-white hover:text-gold px-8 py-3.5 font-semibold tracking-wide transition-all duration-300"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
