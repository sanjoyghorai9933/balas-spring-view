"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(data.error || "Unable to sign in.");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Unable to connect to the admin service.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0c0b0a] px-5 py-10 text-white flex items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#151311] p-8 shadow-2xl">
        <p className="text-xs uppercase tracking-[0.28em] text-[#c7a56a]">Bala&apos;s Spring View</p>
        <h1 className="mt-3 font-[var(--font-cormorant)] text-4xl">Admin Login</h1>
        <p className="mt-2 text-sm text-white/55">Manage your hotel website content and enquiries.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="block">
            <span className="mb-2 block text-sm text-white/70">Email</span>
            <input
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 outline-none transition focus:border-[#c7a56a]"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm text-white/70">Password</span>
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 outline-none transition focus:border-[#c7a56a]"
            />
          </label>

          {error ? <p className="text-sm text-red-400" role="alert">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#c7a56a] px-4 py-3 text-sm font-medium text-[#17130d] transition hover:bg-[#d7b978] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}
