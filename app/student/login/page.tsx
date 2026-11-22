"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { getToken, loginStudent } from "@/lib/student";

export default function StudentLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => { if (getToken()) router.replace("/student"); }, [router]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      await loginStudent(email.trim().toLowerCase(), password);
      router.replace("/student");
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : "Login failed.");
      setBusy(false);
    }
  }

  return (
    <main className="container-x pb-20 pt-32">
      <form onSubmit={submit} className="card mx-auto max-w-md p-6 sm:p-8">
        <h1 className="font-display text-2xl font-bold text-ink">Student login</h1>
        <p className="mt-1 text-sm text-body">Use the email and password we sent you after you registered.</p>
        <div className="mt-5 grid gap-3">
          <input className="field" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" required />
          <input className="field" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required />
          {err && <p role="alert" className="text-sm font-medium text-red-600">{err}</p>}
          <button className="btn btn-primary btn-lg" disabled={busy}>{busy && <Loader2 className="h-4 w-4 animate-spin" />} Log in</button>
          <p className="text-center text-sm text-body">New here? <Link href="/student/register" className="font-semibold text-brand-600">Register</Link></p>
        </div>
      </form>
    </main>
  );
}
