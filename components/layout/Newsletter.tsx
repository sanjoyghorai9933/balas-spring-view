"use client";

import { CheckCircle2 } from "lucide-react";
import { useState, type FormEvent } from "react";

import { footerContent } from "@/data/footer";

export default function Newsletter() {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // No newsletter/email backend is connected yet — this just
    // confirms the request on the front end.
    setSubscribed(true);
  };

  return (
    <div>
      <h3 className="font-display text-sm font-medium uppercase tracking-[0.25em] text-[#C9A24A]">
        {footerContent.newsletter.heading}
      </h3>
      <p className="mt-4 font-body text-sm font-light leading-relaxed text-[#B9B9B9]">
        {footerContent.newsletter.description}
      </p>

      {subscribed ? (
        <div className="mt-5 flex items-center gap-2 text-[#C9A24A]">
          <CheckCircle2 size={18} strokeWidth={1.5} />
          <span className="font-body text-sm">Thanks for subscribing!</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-5">
          <input
            type="email"
            required
            placeholder={footerContent.newsletter.placeholder}
            aria-label="Email address"
            className="w-full rounded-full border border-[#F8F8F5]/15 bg-[#0B0F14]/60 px-5 py-3 font-body text-sm text-[#F8F8F5] placeholder:text-[#B9B9B9]/50 transition-colors duration-300 focus:border-[#C9A24A] focus:outline-none focus:ring-1 focus:ring-[#C9A24A]/40"
          />
          <button
            type="submit"
            className="mt-3 w-full rounded-full bg-[#C9A24A] px-5 py-3 font-body text-xs font-medium uppercase tracking-[0.2em] text-[#0B0F14] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d9b563] hover:shadow-[0_12px_35px_-8px_rgba(201,162,74,0.55)]"
          >
            {footerContent.newsletter.buttonLabel}
          </button>
        </form>
      )}

      <p className="mt-3 font-body text-xs font-light text-[#B9B9B9]/70">
        {footerContent.newsletter.privacyNote}
      </p>
    </div>
  );
}
