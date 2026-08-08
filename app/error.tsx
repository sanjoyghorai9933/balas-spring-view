"use client";

import Link from "next/link";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0B0F14] px-6 py-20 text-[#F5F1E8]">
      <section className="w-full max-w-2xl text-center">
        <p className="font-body text-xs font-semibold uppercase tracking-[0.35em] text-[#C9A24A]">Something went wrong</p>
        <h1 className="mt-5 font-display text-4xl font-normal leading-tight sm:text-5xl">Let&apos;s try that again.</h1>
        <p className="mx-auto mt-5 max-w-xl font-body text-sm font-light leading-7 text-[#B9B9B9] sm:text-base">
          We couldn&apos;t load this page correctly. You can retry, return home, or contact us if the problem continues.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={() => reset()} className="inline-flex items-center bg-[#C9A24A] px-7 py-3 font-body text-xs font-semibold uppercase tracking-[0.18em] text-[#0B0F14] transition-opacity hover:opacity-90">Try Again</button>
          <Link href="/" className="inline-flex items-center border border-[#C9A24A] px-7 py-3 font-body text-xs font-semibold uppercase tracking-[0.18em] text-[#C9A24A] transition-colors hover:bg-[#C9A24A] hover:text-[#0B0F14]">Back Home</Link>
          <Link href="/contact" className="inline-flex items-center border border-white/20 px-7 py-3 font-body text-xs font-semibold uppercase tracking-[0.18em] text-[#D6D6D6] transition-colors hover:border-[#C9A24A] hover:text-[#C9A24A]">Contact Us</Link>
        </div>
      </section>
    </main>
  );
}
