import Link from "next/link";

import { siteConfig } from "@/data/site";

const sections = [
  {
    title: "Cancellation Requests",
    body: [
      "If you need to cancel or change a reservation, please contact us as soon as possible using the contact details provided with your booking confirmation. Cancellation terms can depend on the booking date, stay dates, rate, package, and any special conditions communicated at the time of confirmation.",
    ],
  },
  {
    title: "Refunds and Charges",
    body: [
      "Where a refund is applicable, the amount and processing time will depend on the payment method and the cancellation conditions applicable to the reservation. Non-refundable rates or special offers may have different conditions, which will be communicated before confirmation.",
      "If a reservation is cancelled after the applicable free-cancellation period, a cancellation charge may apply according to the confirmed booking terms.",
    ],
  },
  {
    title: "No-show and Early Departure",
    body: [
      "If a guest does not arrive for a confirmed reservation without prior notice, the booking may be treated as a no-show and charges may apply according to the confirmed reservation conditions.",
      "Leaving before the scheduled departure date does not automatically qualify for a refund. Any adjustment is subject to the terms of the confirmed reservation.",
    ],
  },
  {
    title: "Changes Requested by Guests",
    body: [
      "Requests to change dates, room type, occupancy, or other booking details are subject to availability and may result in a different rate or additional charge. A change is not confirmed until the property communicates acceptance of the revised arrangement.",
    ],
  },
  {
    title: "Changes by the Property",
    body: [
      "In unusual circumstances, operational requirements, safety issues, or events outside our reasonable control may require a reservation to be changed or cancelled. Where this occurs, we will communicate with the affected guest and work toward an appropriate alternative or resolution based on the circumstances and applicable booking terms.",
    ],
  },
  {
    title: "How to Contact Us",
    body: [
      `For cancellation or amendment requests, contact ${siteConfig.email} or call ${siteConfig.phone}. Please include the guest name, booking details, and requested change so that we can respond efficiently.`,
    ],
  },
];

export default function CancellationPolicyPage() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-[#F5F1E8]">
      <section className="border-b border-[#C9A24A]/20 bg-[radial-gradient(circle_at_top,#1b2430_0%,#0B0F14_55%)] px-6 pb-16 pt-32 sm:px-10 lg:pb-20">
        <div className="mx-auto max-w-5xl">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.35em] text-[#C9A24A]">
            Booking Policy
          </p>
          <h1 className="mt-5 font-display text-4xl font-normal leading-tight sm:text-5xl lg:text-6xl">
            Cancellation Policy
          </h1>
          <p className="mt-6 max-w-3xl font-body text-base font-light leading-8 text-[#B9B9B9]">
            General guidance for cancellations, amendments, no-shows, and
            early departures at {siteConfig.brand}.
          </p>
          <p className="mt-4 font-body text-xs uppercase tracking-[0.18em] text-[#8F8F8F]">
            Last updated: August 2026
          </p>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-10 lg:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 rounded-2xl border border-[#C9A24A]/20 bg-[#C9A24A]/5 p-6 sm:p-8">
            <p className="font-body text-sm font-light leading-7 text-[#D6D6D6] sm:text-base">
              <span className="font-semibold text-[#C9A24A]">Important:</span>{" "}
              The cancellation conditions attached to your confirmed booking,
              rate, package, or special offer take precedence over this general
              website guidance where they differ.
            </p>
          </div>

          <div className="space-y-10">
            {sections.map((section, index) => (
              <article key={section.title} className="border-b border-white/10 pb-10 last:border-0">
                <div className="flex gap-5">
                  <span className="pt-1 font-body text-xs tracking-[0.2em] text-[#C9A24A]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="font-display text-2xl font-normal text-[#F5F1E8] sm:text-3xl">
                      {section.title}
                    </h2>
                    <div className="mt-4 space-y-4">
                      {section.body.map((paragraph) => (
                        <p key={paragraph} className="font-body text-sm font-light leading-7 text-[#B9B9B9] sm:text-base">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            <Link
              href="/book-now"
              className="inline-flex items-center bg-[#C9A24A] px-6 py-3 font-body text-xs font-semibold uppercase tracking-[0.18em] text-[#0B0F14] transition-opacity hover:opacity-90"
            >
              Book Now
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center border border-[#C9A24A] px-6 py-3 font-body text-xs font-semibold uppercase tracking-[0.18em] text-[#C9A24A] transition-colors hover:bg-[#C9A24A] hover:text-[#0B0F14]"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
