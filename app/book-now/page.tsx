import { Home, MessageCircle, Receipt, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

import BookingExperience from "@/components/booking/BookingExperience";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import PageHero from "@/components/layout/PageHero";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Book Your Stay",
  description:
    "Reserve your stay at Bala's Spring View by Vista Hills in Mussoorie. Book directly for the best rates and personalized service.",
  path: "/book-now",
  image: "/images/about/exterior.jpg",
});

const paymentInfo = [
  {
    icon: Home,
    title: "Pay at Property",
    description: "No advance payment required — settle your bill during your stay.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Booking",
    description: "Your details are only used to confirm and manage your reservation.",
  },
  {
    icon: Receipt,
    title: "No Hidden Charges",
    description: "The price you see in your estimate is the price you can expect to pay.",
  },
];

export default function BookNowPage() {
  return (
    <main>
      <Navbar />

      {/* HERO */}
      <PageHero
        eyebrow="RESERVATIONS"
        title="Reserve Your Stay"
        subtitle="Book directly with Bala's Spring View by Vista Hills for the best experience."
        breadcrumbItems={[{ label: "Home", href: "/" }, { label: "Book Now" }]}
        backgroundImage="/images/about/exterior.jpg"
      />

      {/* BOOKING LAYOUT + PRICE ESTIMATE */}
      <BookingExperience />

      {/* PAYMENT INFO */}
      <section className="bg-[#F8F6F2] px-6 py-20 sm:px-10">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-3">
          {paymentInfo.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl border border-[#0F1720]/8 bg-white/70 p-6 text-center shadow-[0_15px_40px_-20px_rgba(15,23,32,0.2)]"
            >
              <div className="mx-auto inline-flex rounded-lg border border-[#C9A24A]/25 bg-[#C9A24A]/10 p-3">
                <Icon size={20} strokeWidth={1.5} className="text-[#C9A24A]" />
              </div>
              <h3 className="mt-4 font-display text-base font-medium text-[#0F1720]">
                {title}
              </h3>
              <p className="mt-2 font-body text-xs leading-relaxed text-[#0F1720]/60">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-[#0F1720] px-6 py-20 text-center sm:px-10">
        <div className="relative z-10 mx-auto max-w-xl">
          <h2 className="font-display text-2xl font-light text-[#F8F8F5] sm:text-3xl">
            Questions?
          </h2>
          <p className="mt-3 font-body text-sm font-light text-[#F8F8F5]/65">
            Chat with us on WhatsApp — we&apos;re happy to help plan your stay.
          </p>
          <div className="mt-7">
            <a
              href={siteConfig.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm bg-[#25D366] px-8 py-3.5 font-body text-xs font-medium uppercase tracking-[0.2em] text-[#0E141B] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2fe077] hover:shadow-[0_15px_40px_-10px_rgba(37,211,102,0.5)] sm:text-sm"
            >
              <MessageCircle size={16} strokeWidth={2} />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
