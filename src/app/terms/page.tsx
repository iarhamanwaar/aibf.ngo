import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms & Conditions | Al-Iftikhar Bugvia Foundation",
  description:
    "Terms and conditions for using the Al-Iftikhar Bugvia Foundation (AIBF) website and making donations.",
};

export default function TermsAndConditions() {
  return (
    <>
      <Navbar />
      <main className="bg-cream min-h-screen">
        {/* Header */}
        <section className="bg-emerald-deep pt-32 pb-16">
          <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold text-white mb-4">
              Terms &amp; Conditions
            </h1>
            <p className="text-white/60 text-sm">
              Last updated: March 21, 2026
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <div className="prose prose-lg max-w-none space-y-10 text-charcoal/80 leading-relaxed">
              <p>
                Welcome to the website of Al-Iftikhar Bugvia Foundation
                (&quot;AIBF,&quot; &quot;we,&quot; &quot;our,&quot; or
                &quot;us&quot;). By accessing or using our website at{" "}
                <a
                  href="https://aibf.ngo"
                  className="text-emerald-deep hover:text-gold transition-colors underline"
                >
                  aibf.ngo
                </a>
                , you agree to be bound by these Terms and Conditions. If you do
                not agree with any part of these terms, please do not use our
                website.
              </p>

              {/* Use of Website */}
              <div>
                <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-charcoal mb-4">
                  1. Use of Website
                </h2>
                <p className="mb-3">
                  You agree to use this website only for lawful purposes and in a
                  manner that does not infringe upon the rights of others or
                  restrict or inhibit their use of the website. Specifically, you
                  agree not to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Use the website in any way that violates applicable local,
                    national, or international law or regulation
                  </li>
                  <li>
                    Attempt to gain unauthorized access to our systems, servers,
                    or networks
                  </li>
                  <li>
                    Transmit any material that is defamatory, offensive, or
                    otherwise objectionable
                  </li>
                  <li>
                    Introduce viruses, malware, or any other harmful code to the
                    website
                  </li>
                  <li>
                    Use automated tools to scrape, crawl, or extract data from
                    the website without our written consent
                  </li>
                </ul>
              </div>

              {/* Donation Terms */}
              <div>
                <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-charcoal mb-4">
                  2. Donation Terms
                </h2>
                <p className="mb-3">
                  By making a donation through our website, you acknowledge and
                  agree to the following:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    All donations are voluntary contributions made to support the
                    charitable programs and activities of AIBF.
                  </li>
                  <li>
                    Donations are generally non-refundable once processed, except
                    as described in our{" "}
                    <a
                      href="/refund"
                      className="text-emerald-deep hover:text-gold transition-colors underline"
                    >
                      Refund Policy
                    </a>
                    .
                  </li>
                  <li>
                    AIBF reserves the right to allocate donations to the programs
                    and initiatives where they are most needed, unless a specific
                    designation is made and accepted by us.
                  </li>
                  <li>
                    Online payments are processed securely through PayFast. By
                    making a payment, you also agree to PayFast&apos;s terms of
                    service.
                  </li>
                  <li>
                    You confirm that the funds used for your donation are from a
                    legitimate source and that you are authorized to use the
                    payment method provided.
                  </li>
                  <li>
                    Donation receipts will be issued to the email address
                    provided at the time of the transaction.
                  </li>
                </ul>
              </div>

              {/* Intellectual Property */}
              <div>
                <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-charcoal mb-4">
                  3. Intellectual Property
                </h2>
                <p>
                  All content on this website, including but not limited to text,
                  graphics, logos, images, photographs, videos, and the
                  compilation thereof, is the property of Al-Iftikhar Bugvia
                  Foundation or its content creators and is protected by
                  applicable intellectual property laws. You may not reproduce,
                  distribute, modify, display, or create derivative works from
                  any content on this website without our prior written consent.
                  The AIBF name, logo, and all related marks are trademarks of
                  Al-Iftikhar Bugvia Foundation.
                </p>
              </div>

              {/* User Content */}
              <div>
                <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-charcoal mb-4">
                  4. User Content
                </h2>
                <p>
                  When you submit information through our contact form or other
                  communication channels, you grant AIBF a non-exclusive,
                  royalty-free right to use such content for the purpose of
                  responding to your inquiry and improving our services. You
                  represent that any content you submit does not violate any
                  third-party rights.
                </p>
              </div>

              {/* Disclaimer of Warranties */}
              <div>
                <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-charcoal mb-4">
                  5. Disclaimer of Warranties
                </h2>
                <p>
                  This website is provided on an &quot;as is&quot; and &quot;as
                  available&quot; basis without warranties of any kind, either
                  express or implied. AIBF makes no representations or warranties
                  regarding the accuracy, completeness, reliability, or
                  availability of the website or its content. We do not warrant
                  that the website will be uninterrupted, error-free, or free of
                  viruses or other harmful components. Your use of this website
                  is at your own risk.
                </p>
              </div>

              {/* Limitation of Liability */}
              <div>
                <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-charcoal mb-4">
                  6. Limitation of Liability
                </h2>
                <p>
                  To the fullest extent permitted by law, Al-Iftikhar Bugvia
                  Foundation, its directors, officers, employees, volunteers, and
                  agents shall not be liable for any direct, indirect,
                  incidental, special, consequential, or punitive damages arising
                  out of or related to your use of or inability to use this
                  website, including but not limited to damages for loss of
                  profits, data, or other intangible losses, even if AIBF has
                  been advised of the possibility of such damages.
                </p>
              </div>

              {/* Third-Party Links */}
              <div>
                <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-charcoal mb-4">
                  7. Third-Party Links
                </h2>
                <p>
                  Our website may contain links to third-party websites or
                  services that are not owned or controlled by AIBF. We have no
                  control over and assume no responsibility for the content,
                  privacy policies, or practices of any third-party websites. We
                  encourage you to read the terms and privacy policies of any
                  third-party website you visit.
                </p>
              </div>

              {/* Indemnification */}
              <div>
                <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-charcoal mb-4">
                  8. Indemnification
                </h2>
                <p>
                  You agree to indemnify, defend, and hold harmless Al-Iftikhar
                  Bugvia Foundation and its directors, officers, employees, and
                  volunteers from and against any claims, liabilities, damages,
                  losses, costs, or expenses (including reasonable legal fees)
                  arising out of your use of the website or violation of these
                  Terms and Conditions.
                </p>
              </div>

              {/* Governing Law */}
              <div>
                <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-charcoal mb-4">
                  9. Governing Law
                </h2>
                <p>
                  These Terms and Conditions are governed by and construed in
                  accordance with the laws of the Islamic Republic of Pakistan.
                  Any disputes arising out of or relating to these terms shall be
                  subject to the exclusive jurisdiction of the courts located in
                  Sargodha, Punjab, Pakistan.
                </p>
              </div>

              {/* Changes to Terms */}
              <div>
                <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-charcoal mb-4">
                  10. Changes to These Terms
                </h2>
                <p>
                  We reserve the right to modify or replace these Terms and
                  Conditions at any time. Changes will be effective immediately
                  upon posting on this page. Your continued use of the website
                  after any changes constitutes your acceptance of the revised
                  terms. We encourage you to review these terms periodically.
                </p>
              </div>

              {/* Contact Us */}
              <div>
                <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-charcoal mb-4">
                  11. Contact Us
                </h2>
                <p className="mb-3">
                  If you have any questions about these Terms and Conditions,
                  please contact us:
                </p>
                <div className="bg-cream-dark p-6 rounded-lg space-y-2">
                  <p>
                    <strong>Al-Iftikhar Bugvia Foundation (AIBF)</strong>
                  </p>
                  <p>
                    Sher Shahi Jamia Masjid Bugvia, Molana Zahoor Ahmed Bugvi
                    Road, Bhera, Sargodha, Pakistan
                  </p>
                  <p>
                    Phone:{" "}
                    <a
                      href="tel:+923016701340"
                      className="text-emerald-deep hover:text-gold transition-colors"
                    >
                      +92 301 6701340
                    </a>
                  </p>
                  <p>
                    Email:{" "}
                    <a
                      href="mailto:arhamanwaar@gmail.com"
                      className="text-emerald-deep hover:text-gold transition-colors"
                    >
                      arhamanwaar@gmail.com
                    </a>
                  </p>
                  <p>
                    Website:{" "}
                    <a
                      href="https://aibf.ngo"
                      className="text-emerald-deep hover:text-gold transition-colors"
                    >
                      aibf.ngo
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
