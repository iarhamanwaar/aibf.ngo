import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Our Services | Al-Iftikhar Bugvia Foundation",
  description:
    "Explore AIBF programs: free medical camps, Sahaara relief, merit scholarships, Ramadan ration drives, marriage assistance, widow & orphan care, dispensary services, and heritage preservation.",
  alternates: {
    canonical: "https://aibf.ngo/services",
  },
};

const services = [
  {
    title: "Free Medical Camps",
    description:
      "We organize regular free medical camps providing general medicine, ophthalmology (eye care), and gynecology services to rural communities with little or no access to healthcare facilities. Our camps have served hundreds of patients across Bhera, Buggah Sharif, and surrounding villages.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    ),
  },
  {
    title: "Sahaara Relief Program",
    description:
      "Our flagship initiative providing direct financial support and essential resources to those in urgent need — including burn patients, widows, families with disabled members, and individuals facing medical emergencies. Sahaara means 'support' and embodies our commitment to being there when it matters most.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
      </svg>
    ),
  },
  {
    title: "Merit Scholarships & Educational Awards",
    description:
      "We recognize and reward academic excellence through cash awards, certificates, and ongoing educational support for high-achieving students from underprivileged families. Our scholarship program encourages the next generation to pursue education as a pathway to a better future.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
      </svg>
    ),
  },
  {
    title: "Ramadan Ration Drives",
    description:
      "Every Ramadan, we distribute comprehensive ration packages to families in need across our service areas. These packages include essential food items to help families observe the holy month with dignity and without the burden of food insecurity. Over 35 drives have been conducted to date.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m20.893 13.393-1.135-1.135a2.252 2.252 0 0 1-.421-.585l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 0 1-1.383-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236c.016.003.032.007.048.011a.44.44 0 0 0 .52-.353.33.33 0 0 0-.108-.355 2.25 2.25 0 0 1-.26-3.396l.018-.018a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18.02 0c-2.292 4.29-1.111 9.6 2.885 12.524m14.546-12.524a9.753 9.753 0 0 1 2.885 12.524" />
      </svg>
    ),
  },
  {
    title: "Eid Support Packages",
    description:
      "During Eid-ul-Fitr and Eid-ul-Adha, we distribute gifts, clothing, and support packages to underprivileged families and children, ensuring that everyone in our community can participate in the joy and celebration of these blessed occasions.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
      </svg>
    ),
  },
  {
    title: "Marriage Assistance",
    description:
      "We provide financial support and dowry assistance for daughters of economically disadvantaged families, helping them begin their married life with dignity. This program addresses one of the most significant financial challenges faced by low-income families in our communities.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
      </svg>
    ),
  },
  {
    title: "Widow, Orphan & Elderly Care",
    description:
      "We provide ongoing financial assistance, resources, and emotional support to widows, orphans, and elderly individuals in our communities who have no other means of support. Our care program ensures that the most vulnerable members of society are not forgotten.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0 1 12 12.75Zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 0 1-1.152 4.641M12 12.75c-2.883 0-5.647.508-8.208 1.44.125 1.622.51 3.176 1.154 4.641M15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
      </svg>
    ),
  },
  {
    title: "Heritage & Cultural Preservation",
    description:
      "We are committed to documenting and preserving the rich cultural traditions, literary heritage, and spiritual teachings of Bhera, Buggah Sharif, and the surrounding region. Through archival work, publications, and community events, we ensure these treasures are passed on to future generations.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
      </svg>
    ),
  },
  {
    title: "Bugvia Foundation Dispensary",
    description:
      "Our dispensary provides affordable and accessible healthcare services to the local community on a regular basis. With over 391 patients treated, the dispensary serves as a vital healthcare resource for those who cannot afford or access hospital care in urban centers.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <>
      <Navbar />
      <main className="bg-cream min-h-screen">
        {/* Header */}
        <section className="bg-emerald-deep pt-32 pb-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <p className="text-gold text-sm font-medium tracking-[0.2em] uppercase mb-4">
              What We Do
            </p>
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold text-white mb-6">
              Our <span className="text-gold">Services</span>
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto leading-relaxed">
              From healthcare to education, our programs address the most
              fundamental needs of underserved rural communities across Bhera,
              Buggah Sharif, and the villages of District Jhelum.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="bg-white border border-cream-dark p-8 hover:shadow-lg transition-shadow duration-300 group"
                >
                  <div className="w-14 h-14 bg-emerald-deep/10 text-emerald-deep flex items-center justify-center rounded-lg mb-5 group-hover:bg-emerald-deep group-hover:text-white transition-colors duration-300">
                    {service.icon}
                  </div>
                  <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-charcoal mb-3">
                    {service.title}
                  </h3>
                  <p className="text-charcoal/60 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-emerald-deep">
          <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-white mb-4">
              Support Our <span className="text-gold">Mission</span>
            </h2>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
              Your contributions fund these vital programs and help us extend
              our reach to more communities in need. Every donation makes a
              difference.
            </p>
            <a
              href="/#donate"
              className="inline-block bg-gold hover:bg-gold-light text-emerald-deep px-8 py-3 font-semibold tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
            >
              Donate Now
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
