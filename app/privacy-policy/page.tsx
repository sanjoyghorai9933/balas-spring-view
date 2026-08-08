import Link from "next/link";

import { siteConfig } from "@/data/site";

const sections = [
  {
    title: "Information We Collect",
    body: [
      "When you contact us, request a booking, or otherwise use this website, we may collect information such as your name, phone number, email address, stay dates, room preference, number of guests, and any special requests you choose to provide.",
      "We may also receive basic technical information needed to operate and secure the website, such as browser, device, and server information.",
    ],
  },
  {
    title: "How We Use Your Information",
    body: [
      "We use information you submit to respond to enquiries, process booking requests, communicate about your stay, provide customer support, and improve our website and hospitality services.",
      "If you choose to receive updates, we may use your email address for relevant offers or travel information. You can ask us to stop these communications at any time.",
    ],
  },
  {
    title: "Sharing of Information",
    body: [
      "We do not sell your personal information. We may share information only when reasonably necessary to provide a requested service, operate the website, process communications, comply with applicable law, or protect our guests, business, and systems.",
    ],
  },
  {
    title: "Cookies and Website Data",
    body: [
      "The website may use essential cookies or similar technologies required for functionality, security, preferences, and performance. You can control cookies through your browser settings, although disabling some cookies may affect website functionality.",
    ],
  },
  {
    title: "Data Security and Retention",
    body: [
      "We take reasonable steps to protect information submitted through the website. Information is retained only for as long as reasonably necessary for the purpose for which it was collected, legitimate business needs, or legal requirements.",
    ],
  },
  {
    title: "Your Choices",
    body: [
      "You may contact us to ask about the personal information you have provided, request correction of inaccurate information, or ask questions about how your information is used, subject to applicable legal requirements.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-[#F5F1E8]">
      <section className="border-b border-[#C9A24A]/20 bg-[radial-gradient(circle_at_top,#1b2430_0%,#0B0F14_55%)] px-6 pb-16 pt-32 sm:px-10 lg:pb-20">
        <div className="mx-auto max-w-5xl">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.35em] text-[#C9A24A]">
            Legal & Privacy
          </p>
          <h1 className="mt-5 font-display text-4xl font-normal leading-tight sm:text-5xl lg:text-6xl">
            Privacy Policy
          </h1>
          <p className="mt-6 max-w-3xl font-body text-base font-light leading-8 text-[#B9B9B9]">
            This policy explains how {siteConfig.brand} handles information
            submitted through this website and during booking enquiries.
          </p>
          <p className="mt-4 font-body text-xs uppercase tracking-[0.18em] text-[#8F8F8F]">
            Last updated: August 2026
          </p>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-10 lg:py-20">
        <div className="mx-auto max-w-5xl">
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

          <div className="mt-12 rounded-2xl border border-[#C9A24A]/20 bg-white/[0.03] p-6 sm:p-8">
            <h2 className="font-display text-2xl font-normal">Questions about privacy?</h2>
            <p className="mt-3 font-body text-sm font-light leading-7 text-[#B9B9B9]">
              Contact us at {siteConfig.email} or call {siteConfig.phone} if you
              have a privacy question or request.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center border border-[#C9A24A] px-6 py-3 font-body text-xs font-semibold uppercase tracking-[0.18em] text-[#C9A24A] transition-colors hover:bg-[#C9A24A] hover:text-[#0B0F14]"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
