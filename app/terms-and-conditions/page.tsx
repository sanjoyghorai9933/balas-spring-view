import Link from "next/link";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { siteConfig } from "@/data/site";

const sections = [
  {
    title: "Bookings and Enquiries",
    body: [
      "A booking enquiry submitted through this website is a request for availability and rates. A reservation is confirmed only after availability is verified and the property provides confirmation through an accepted communication channel.",
      "Guests are responsible for providing accurate contact details, stay dates, guest counts, and room preferences so that the enquiry can be handled correctly.",
    ],
  },
  {
    title: "Rates and Payment",
    body: [
      "Rates shown on the website or communicated during an enquiry may vary according to dates, room type, occupancy, season, packages, taxes, and availability. The applicable rate and payment instructions will be confirmed with the guest before a reservation is finalized.",
    ],
  },
  {
    title: "Check-in and Check-out",
    body: [
      `Our standard check-in time is ${siteConfig.checkIn} and standard check-out time is ${siteConfig.checkOut}. Early check-in or late check-out may be available subject to occupancy and may involve an additional charge.`,
      "Guests may be asked to provide valid identification and any information required by applicable local regulations at check-in.",
    ],
  },
  {
    title: "Guest Responsibilities",
    body: [
      "Guests are expected to respect other guests, staff, property, furnishings, and applicable local rules. Damage, loss, or exceptional cleaning caused by misuse may result in charges where permitted and communicated by the property.",
      "The maximum occupancy for a room or suite must be respected. Special requirements should be communicated before arrival so that they can be considered subject to availability.",
    ],
  },
  {
    title: "Website Content",
    body: [
      "We make reasonable efforts to keep descriptions, photographs, amenities, and other website information accurate. Room layouts, views, furnishings, availability, and other details may vary and are subject to change without notice.",
    ],
  },
  {
    title: "Changes and Contact",
    body: [
      "These terms may be updated when our services, policies, or legal requirements change. The latest version published on this page will apply to website use from its effective date.",
      `For questions about a booking or these terms, contact ${siteConfig.email} or ${siteConfig.phone}.`,
    ],
  },
];

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-[#F5F1E8]">
      <Navbar />
      <section className="border-b border-[#C9A24A]/20 bg-[radial-gradient(circle_at_top,#1b2430_0%,#0B0F14_55%)] px-6 pb-16 pt-32 sm:px-10 lg:pb-20">
        <div className="mx-auto max-w-5xl">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.35em] text-[#C9A24A]">Legal</p>
          <h1 className="mt-5 font-display text-4xl font-normal leading-tight sm:text-5xl lg:text-6xl">Terms & Conditions</h1>
          <p className="mt-6 max-w-3xl font-body text-base font-light leading-8 text-[#B9B9B9]">Please review these general terms for using the website and making a booking enquiry with {siteConfig.brand}.</p>
          <p className="mt-4 font-body text-xs uppercase tracking-[0.18em] text-[#8F8F8F]">Last updated: August 2026</p>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-10 lg:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="space-y-10">
            {sections.map((section, index) => (
              <article key={section.title} className="border-b border-white/10 pb-10 last:border-0">
                <div className="flex gap-5">
                  <span className="pt-1 font-body text-xs tracking-[0.2em] text-[#C9A24A]">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h2 className="font-display text-2xl font-normal text-[#F5F1E8] sm:text-3xl">{section.title}</h2>
                    <div className="mt-4 space-y-4">
                      {section.body.map((paragraph) => (
                        <p key={paragraph} className="font-body text-sm font-light leading-7 text-[#B9B9B9] sm:text-base">{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-[#C9A24A]/20 bg-white/[0.03] p-6 sm:p-8">
            <h2 className="font-display text-2xl font-normal">Need help with a booking?</h2>
            <p className="mt-3 font-body text-sm font-light leading-7 text-[#B9B9B9]">Contact our team before making travel arrangements if you need to confirm availability, occupancy, timings, or special requests.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/book-now" className="inline-flex items-center bg-[#C9A24A] px-6 py-3 font-body text-xs font-semibold uppercase tracking-[0.18em] text-[#0B0F14] transition-opacity hover:opacity-90">Book Now</Link>
              <Link href="/contact" className="inline-flex items-center border border-[#C9A24A] px-6 py-3 font-body text-xs font-semibold uppercase tracking-[0.18em] text-[#C9A24A] transition-colors hover:bg-[#C9A24A] hover:text-[#0B0F14]">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
