import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Refund Policy | Al-Iftikhar Bugvia Foundation",
  description:
    "Donation refund policy for the Al-Iftikhar Bugvia Foundation (AIBF), including eligibility, process, and timelines.",
};

export default function RefundPolicy() {
  return (
    <>
      <Navbar />
      <main className="bg-cream min-h-screen">
        {/* Header */}
        <section className="bg-emerald-deep pt-32 pb-16">
          <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold text-white mb-4">
              Refund Policy
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
                Al-Iftikhar Bugvia Foundation (&quot;AIBF&quot;) is a registered
                charitable organization dedicated to serving communities through
                education, healthcare, and social welfare. This Refund Policy
                outlines the terms under which donation refunds may be
                considered.
              </p>

              {/* General Policy */}
              <div>
                <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-charcoal mb-4">
                  1. General Policy
                </h2>
                <p>
                  All donations made to AIBF are considered charitable
                  contributions and are generally{" "}
                  <strong>non-refundable</strong>. Once a donation is processed,
                  the funds are allocated towards our ongoing programs and
                  services, including free medical camps, educational
                  scholarships, relief programs, and community welfare
                  initiatives. We are deeply grateful for every contribution and
                  ensure that all donations are used responsibly for their
                  intended charitable purposes.
                </p>
              </div>

              {/* Exceptions */}
              <div>
                <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-charcoal mb-4">
                  2. Exceptions
                </h2>
                <p className="mb-3">
                  Refunds may be considered in the following exceptional
                  circumstances:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Duplicate Transactions:</strong> If your payment
                    method was charged more than once for the same donation due
                    to a technical error or processing issue.
                  </li>
                  <li>
                    <strong>Erroneous Amount:</strong> If you were charged an
                    incorrect amount that differs significantly from your
                    intended donation.
                  </li>
                  <li>
                    <strong>Unauthorized Transaction:</strong> If a donation was
                    made without your authorization or as a result of fraudulent
                    activity on your payment method.
                  </li>
                  <li>
                    <strong>Technical Error:</strong> If a system error caused an
                    unintended transaction to be processed.
                  </li>
                </ul>
              </div>

              {/* How to Request a Refund */}
              <div>
                <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-charcoal mb-4">
                  3. How to Request a Refund
                </h2>
                <p className="mb-3">
                  If you believe you are eligible for a refund under the
                  exceptions listed above, please follow these steps:
                </p>
                <div className="bg-cream-dark p-6 rounded-lg space-y-4">
                  <div className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-emerald-deep text-white rounded-full flex items-center justify-center text-sm font-semibold">
                      1
                    </span>
                    <div>
                      <strong>Contact us within 7 days</strong>
                      <p className="text-sm mt-1">
                        Send an email to{" "}
                        <a
                          href="mailto:contact@aibf.ngo"
                          className="text-emerald-deep hover:text-gold transition-colors underline"
                        >
                          contact@aibf.ngo
                        </a>{" "}
                        within seven (7) days of the transaction date.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-emerald-deep text-white rounded-full flex items-center justify-center text-sm font-semibold">
                      2
                    </span>
                    <div>
                      <strong>Provide required information</strong>
                      <p className="text-sm mt-1">
                        Include the following in your email: your full name,
                        email address used for the donation, transaction date,
                        transaction amount, payment reference or receipt number,
                        and the reason for the refund request.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-emerald-deep text-white rounded-full flex items-center justify-center text-sm font-semibold">
                      3
                    </span>
                    <div>
                      <strong>Use the subject line</strong>
                      <p className="text-sm mt-1">
                        Please use the subject line:{" "}
                        <em>&quot;Refund Request - [Your Name]&quot;</em>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Review Process */}
              <div>
                <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-charcoal mb-4">
                  4. Review Process
                </h2>
                <p>
                  All refund requests will be reviewed by our finance team. We
                  will acknowledge your request within 3 business days and
                  provide a decision within 7 business days of acknowledgment.
                  AIBF reserves the right to approve or deny refund requests at
                  its sole discretion based on the circumstances of each case.
                </p>
              </div>

              {/* Refund Processing Time */}
              <div>
                <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-charcoal mb-4">
                  5. Refund Processing Time
                </h2>
                <p>
                  If a refund is approved, it will be processed within{" "}
                  <strong>14 business days</strong> from the date of approval.
                  Refunds will be issued to the original payment method used for
                  the donation. Please note that the time it takes for the refund
                  to appear in your account may vary depending on your bank or
                  payment provider and may take an additional 5-10 business days.
                </p>
              </div>

              {/* Refund Method */}
              <div>
                <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-charcoal mb-4">
                  6. Refund Method
                </h2>
                <p>
                  Refunds will be processed through the same payment channel used
                  for the original donation. For donations made via PayFast, the
                  refund will be processed through PayFast back to your original
                  payment method. For bank transfers, the refund will be made to
                  the originating bank account. AIBF does not issue refunds in
                  cash or through alternative payment methods.
                </p>
              </div>

              {/* Late or Missing Refunds */}
              <div>
                <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-charcoal mb-4">
                  7. Late or Missing Refunds
                </h2>
                <p>
                  If you have not received your approved refund within the
                  stated timeframe, please first check with your bank or payment
                  provider. If you have done so and still have not received your
                  refund, please contact us at{" "}
                  <a
                    href="mailto:contact@aibf.ngo"
                    className="text-emerald-deep hover:text-gold transition-colors underline"
                  >
                    contact@aibf.ngo
                  </a>{" "}
                  and we will investigate the matter.
                </p>
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-charcoal mb-4">
                  8. Contact Information
                </h2>
                <p className="mb-3">
                  For all refund-related inquiries, please contact us:
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
    </>
  );
}
