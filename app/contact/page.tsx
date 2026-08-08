import type { Metadata } from "next";
import Link from "next/link";

import Accordion from "@/components/shared/Accordion";
import BookingForm from "@/components/contact/BookingForm";
import ContactInfoCards from "@/components/contact/ContactInfoCards";
import GoogleMap from "@/components/contact/GoogleMap";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import PageHero from "@/components/layout/PageHero";
import { contactContent } from "@/data/contact";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Get in touch with Bala's Spring View by Vista Hills — call, WhatsApp, email or send a booking enquiry for your Mussoorie stay.",
  path: "/contact",
  image: "/images/about/exterior.jpg",
});

const contactFaqs = [
  {
    question: "How do I book?",
    answer:
      "You can book directly through the enquiry form on this page, call us, or message us on WhatsApp — we'll confirm availability as quickly as we can.",
  },
  {
    question: "What is the check-in time?",
    answer: `Check-in is from ${siteConfig.checkIn} and check-out is by ${siteConfig.checkOut}. Early check-in or late check-out can be requested, subject to availability.`,
  },
  {
    question: "Is parking available?",
    answer: "Yes, free on-site parking is available for all guests.",
  },
  {
    question: "Is breakfast included?",
    answer:
      "Meal inclusions vary by rate plan. Mention your preference in the enquiry form or contact us directly to confirm what's included with your rate.",
  },
  {
    question: "Can I cancel my booking?",
    answer:
      "Cancellation terms depend on how far in advance you cancel. Full details are available on our Cancellation Policy page.",
  },
];

export default function ContactPage() {
  return (
    <main>
      <Navbar />

      {/* SECTION 1 — Luxury Hero */}
      <PageHero
        eyebrow="CONTACT"
        title="Contact Us"
        subtitle="We're here to help you plan a memorable stay at Bala's Spring View by Vista Hills."
        breadcrumbItems={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        backgroundImage="/images/about/exterior.jpg"
      />
      <div className="flex justify-center bg-[#0F1720] pb-16 sm:pb-20">
        <Link
          href="/book-now"
          className="inline-flex items-center justify-center rounded-sm bg-[#C9A24A] px-9 py-4 font-body text-xs font-medium uppercase tracking-[0.25em] text-[#0F1720] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d9b563] hover:shadow-[0_15px_45px_-10px_rgba(201,162,74,0.55)] sm:text-sm"
        >
          Book Your Stay
        </Link>
      </div>

      {/* SECTION 2 — Contact info + Booking enquiry form */}
      <section className="bg-[#0E141B] px-6 py-24 sm:px-10 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[45%_55%] lg:gap-20">
            {/* LEFT — contact info cards */}
            <ContactInfoCards />

            {/* RIGHT — booking enquiry form */}
            <div className="rounded-3xl border border-[#C9A24A]/25 bg-[#111827]/70 p-7 shadow-[0_35px_90px_-30px_rgba(0,0,0,0.65)] backdrop-blur-md sm:p-10">
              <BookingForm
                footnote={contactContent.bookingFootnote}
                submitLabel="Send Booking Enquiry"
                showTermsCheckbox
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — Google Map */}
      <section className="bg-[#F8F6F2] px-6 py-24 sm:px-10 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-light leading-tight text-[#0F1720] sm:text-4xl">
              {contactContent.map.title}
            </h2>
            <p className="mt-3 font-body text-sm font-light leading-relaxed text-[#0F1720]/60 sm:text-base">
              {contactContent.map.subtitle}
            </p>
          </div>

          <div className="mt-10">
            <GoogleMap embedSrc={contactContent.map.embedSrc} title={contactContent.map.title} />
          </div>
        </div>
      </section>

      {/* SECTION 4 — FAQ */}
      <section className="bg-[#0E141B] px-6 py-24 sm:px-10 sm:py-28">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <p className="font-body text-xs font-medium uppercase tracking-[0.4em] text-[#C9A24A]">
              FAQ
            </p>
            <h2 className="mt-5 font-display text-3xl font-light leading-tight text-[#F8F8F5] sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <div aria-hidden="true" className="mx-auto my-7 h-px w-20 bg-[#C9A24A]/70" />
          </div>

          <div className="mt-12 text-[#F8F8F5]">
            <Accordion items={contactFaqs} />
          </div>
        </div>
      </section>

      {/* SECTION 5 — Final CTA */}
      <section className="relative overflow-hidden bg-[#0F1720] px-6 py-24 text-center sm:px-10 sm:py-28">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('/images/about/exterior.jpg')" }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#0F1720]/70 via-[#0F1720]/90 to-[#0F1720]"
        />

        <div className="relative z-10 mx-auto max-w-2xl">
          <h2 className="font-display text-3xl font-light leading-tight text-[#F8F8F5] sm:text-4xl">
            Ready to Experience Mussoorie?
          </h2>
          <div className="mt-9">
            <Link
              href="/book-now"
              className="inline-flex items-center justify-center rounded-sm bg-[#C9A24A] px-10 py-4 font-body text-xs font-medium uppercase tracking-[0.25em] text-[#0F1720] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d9b563] hover:shadow-[0_15px_45px_-10px_rgba(201,162,74,0.55)] sm:text-sm"
            >
              Book Your Stay
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
