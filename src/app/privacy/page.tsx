import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Privacy Policy | AIBF",
  description:
    "Privacy policy for the Al-Iftikhar Bugvia Foundation (AIBF) website, covering data collection, payment processing, and your rights.",
  alternates: {
    canonical: "https://aibf.ngo/privacy",
  },
};

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <main className="bg-cream min-h-screen">
        {/* Header */}
        <section className="bg-emerald-deep pt-32 pb-16">
          <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold text-white mb-4">
              Privacy Policy
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
                Al-Iftikhar Bugvia Foundation (&quot;AIBF,&quot; &quot;we,&quot;
                &quot;our,&quot; or &quot;us&quot;) is committed to protecting
                the privacy of our donors, supporters, and website visitors.
                This Privacy Policy explains how we collect, use, disclose, and
                safeguard your information when you visit our website at{" "}
                <a
                  href="https://aibf.ngo"
                  className="text-emerald-deep hover:text-gold transition-colors underline"
                >
                  aibf.ngo
                </a>
                .
              </p>

              {/* Information We Collect */}
              <div>
                <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-charcoal mb-4">
                  1. Information We Collect
                </h2>
                <p className="mb-3">
                  We may collect the following types of information:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Personal Information:</strong> Name, email address,
                    phone number, and mailing address when you make a donation,
                    fill out a contact form, or subscribe to our communications.
                  </li>
                  <li>
                    <strong>Payment Information:</strong> When you make a
                    donation through our website, payment details are collected
                    and processed securely by our payment gateway provider,
                    PayFast. We do not store your credit card or bank account
                    details on our servers.
                  </li>
                  <li>
                    <strong>Usage Data:</strong> Information about how you
                    interact with our website, including IP address, browser
                    type, pages visited, time spent on pages, and referring URLs.
                  </li>
                  <li>
                    <strong>Communication Data:</strong> Messages, feedback, and
                    inquiries you send us through our contact form or email.
                  </li>
                </ul>
              </div>

              {/* How We Use Your Information */}
              <div>
                <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-charcoal mb-4">
                  2. How We Use Your Information
                </h2>
                <p className="mb-3">
                  We use the information we collect for the following purposes:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    To process and acknowledge your donations and issue receipts
                  </li>
                  <li>
                    To respond to your inquiries and provide information about
                    our programs
                  </li>
                  <li>
                    To send you updates about our activities, campaigns, and
                    impact (with your consent)
                  </li>
                  <li>
                    To improve our website, services, and user experience
                  </li>
                  <li>
                    To comply with legal obligations and regulatory requirements
                  </li>
                  <li>
                    To detect and prevent fraud or unauthorized transactions
                  </li>
                </ul>
              </div>

              {/* Payment Processing */}
              <div>
                <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-charcoal mb-4">
                  3. Payment Processing
                </h2>
                <p>
                  Online donations are processed through PayFast, a secure
                  third-party payment gateway. When you make a donation, you are
                  directed to PayFast&apos;s secure payment environment. PayFast
                  handles your payment information in accordance with PCI DSS
                  (Payment Card Industry Data Security Standard) requirements.
                  We do not have access to your full credit card or bank account
                  details. For more information about PayFast&apos;s privacy
                  practices, please visit their website.
                </p>
              </div>

              {/* Data Security */}
              <div>
                <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-charcoal mb-4">
                  4. Data Security
                </h2>
                <p>
                  We implement appropriate technical and organizational measures
                  to protect your personal information against unauthorized
                  access, alteration, disclosure, or destruction. Our website
                  uses SSL/TLS encryption to secure data transmission. However,
                  no method of transmission over the Internet or electronic
                  storage is 100% secure, and we cannot guarantee absolute
                  security.
                </p>
              </div>

              {/* Cookies */}
              <div>
                <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-charcoal mb-4">
                  5. Cookies and Tracking Technologies
                </h2>
                <p className="mb-3">
                  Our website uses cookies and similar tracking technologies to
                  enhance your browsing experience. These include:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Essential Cookies:</strong> Required for the website
                    to function properly, such as maintaining your session and
                    language preferences.
                  </li>
                  <li>
                    <strong>Analytics Cookies:</strong> We use Google Analytics
                    to understand how visitors interact with our website. This
                    helps us improve our content and services. Google Analytics
                    collects information anonymously and reports website trends
                    without identifying individual visitors.
                  </li>
                </ul>
                <p className="mt-3">
                  You can control cookies through your browser settings. Disabling
                  certain cookies may affect the functionality of our website.
                </p>
              </div>

              {/* Third-Party Services */}
              <div>
                <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-charcoal mb-4">
                  6. Third-Party Services
                </h2>
                <p className="mb-3">
                  We may use the following third-party services that may collect
                  or process your data:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>PayFast:</strong> Payment processing for online
                    donations
                  </li>
                  <li>
                    <strong>Google Analytics:</strong> Website analytics and
                    usage tracking
                  </li>
                  <li>
                    <strong>Email Service Providers:</strong> For sending
                    communications and donation receipts
                  </li>
                </ul>
                <p className="mt-3">
                  These third-party services have their own privacy policies, and
                  we encourage you to review them. We do not sell, trade, or rent
                  your personal information to any third party.
                </p>
              </div>

              {/* Your Rights */}
              <div>
                <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-charcoal mb-4">
                  7. Your Rights
                </h2>
                <p className="mb-3">You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Access the personal information we hold about you
                  </li>
                  <li>
                    Request correction of inaccurate or incomplete personal data
                  </li>
                  <li>
                    Request deletion of your personal data (subject to legal
                    obligations)
                  </li>
                  <li>
                    Withdraw consent for receiving marketing communications at
                    any time
                  </li>
                  <li>
                    Request a copy of your personal data in a portable format
                  </li>
                </ul>
                <p className="mt-3">
                  To exercise any of these rights, please contact us using the
                  information provided below.
                </p>
              </div>

              {/* Data Retention */}
              <div>
                <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-charcoal mb-4">
                  8. Data Retention
                </h2>
                <p>
                  We retain your personal information only for as long as
                  necessary to fulfill the purposes outlined in this policy, or
                  as required by law. Donation records are retained for a minimum
                  of seven (7) years for auditing and regulatory compliance
                  purposes.
                </p>
              </div>

              {/* Children's Privacy */}
              <div>
                <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-charcoal mb-4">
                  9. Children&apos;s Privacy
                </h2>
                <p>
                  Our website is not directed at children under the age of 18. We
                  do not knowingly collect personal information from minors. If
                  you believe a child has provided us with personal information,
                  please contact us and we will take steps to delete such
                  information.
                </p>
              </div>

              {/* Changes to This Policy */}
              <div>
                <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-charcoal mb-4">
                  10. Changes to This Policy
                </h2>
                <p>
                  We may update this Privacy Policy from time to time. Any
                  changes will be posted on this page with an updated revision
                  date. We encourage you to review this policy periodically to
                  stay informed about how we are protecting your information.
                </p>
              </div>

              {/* Contact Us */}
              <div>
                <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-charcoal mb-4">
                  11. Contact Us
                </h2>
                <p className="mb-3">
                  If you have any questions or concerns about this Privacy
                  Policy, please contact us:
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
                      href="mailto:contact@aibf.ngo"
                      className="text-emerald-deep hover:text-gold transition-colors"
                    >
                      contact@aibf.ngo
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
      <WhatsAppButton />
    </>
  );
}
