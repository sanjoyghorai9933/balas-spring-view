import Link from "next/link";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-[#F5F1E8]">
      <Navbar />
      <section className="flex min-h-[75vh] items-center justify-center px-6 py-32 text-center sm:px-10">
        <div className="max-w-2xl">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.35em] text-[#C9A24A]">404 · Page Not Found</p>
          <h1 className="mt-5 font-display text-5xl font-normal leading-tight sm:text-6xl lg:text-7xl">A quiet turn in the hills.</h1>
          <p className="mx-auto mt-6 max-w-xl font-body text-base font-light leading-8 text-[#B9B9B9] sm:text-lg">
            The page you are looking for may have moved or may no longer be available. Let us take you back to Bala&apos;s Spring View.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href="/" className="inline-flex items-center bg-[#C9A24A] px-7 py-3 font-body text-xs font-semibold uppercase tracking-[0.18em] text-[#0B0F14] transition-opacity hover:opacity-90">Back Home</Link>
            <Link href="/contact" className="inline-flex items-center border border-[#C9A24A] px-7 py-3 font-body text-xs font-semibold uppercase tracking-[0.18em] text-[#C9A24A] transition-colors hover:bg-[#C9A24A] hover:text-[#0B0F14]">Contact Us</Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
