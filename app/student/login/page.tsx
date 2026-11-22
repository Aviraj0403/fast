"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { AuthShell } from "@/components/student/AuthShell";
import { getToken, loginStudent } from "@/lib/student";

export default function StudentLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => { if (getToken()) router.replace("/student"); }, [router]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      await loginStudent(email.trim().toLowerCase(), password);
      router.replace("/student"); // your dashboard: documents to upload and your applications
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : "Login failed. Please try again.");
      setBusy(false);
    }
  }

  return (
    <AuthShell eyebrow="Student login" title="Welcome back" subtitle="Log in with the email and password we sent you. After login you will see your applications and can upload documents.">
      <form onSubmit={submit} className="grid min-w-0 grid-cols-1 gap-4" noValidate>
        <div>
          <label className="label" htmlFor="login-email">Email</label>
          <input id="login-email" className="field" type="email" inputMode="email" autoComplete="username" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label className="label" htmlFor="login-password">Password</label>
          <div className="relative">
            <input id="login-password" className="field pr-12" type={show ? "text" : "password"} autoComplete="current-password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="button" onClick={() => setShow((v) => !v)} aria-label={show ? "Hide password" : "Show password"} className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-body hover:text-ink">
              {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          <p className="mt-1.5 text-xs text-body">Use the temporary password from your email. You can change it after you log in. Forgot it? Ask your counsellor to send a new login.</p>
        </div>
        {err && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700">{err}</p>}
        <button className="btn btn-primary btn-lg w-full" disabled={busy || !email || !password}>
          {busy && <Loader2 className="h-4 w-4 animate-spin" />} {busy ? "Logging in..." : "Log in"}
        </button>
        <p className="text-center text-sm text-body">New here? <Link href="/student/register" className="font-semibold text-brand-600 hover:underline">Create your free account</Link></p>
      </form>
    </AuthShell>
  );
}
