export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0B0F14] px-6 text-[#F5F1E8]">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border border-[#C9A24A]/20 border-t-[#C9A24A]" aria-hidden="true" />
        <p className="mt-6 font-body text-xs font-semibold uppercase tracking-[0.3em] text-[#C9A24A]">Bala&apos;s Spring View</p>
        <p className="mt-2 font-body text-sm font-light text-[#8F8F8F]">Preparing your view of Mussoorie…</p>
      </div>
    </main>
  );
}
