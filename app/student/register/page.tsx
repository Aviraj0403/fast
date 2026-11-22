"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2 } from "lucide-react";
import { mobileOf } from "@/components/LeadForm";
import { registerStudent } from "@/lib/student";

export default function RegisterPage() {
  const [v, setV] = useState({ name: "", phone: "", email: "", city: "", course: "", consent: false, company_url: "" });
  const [err, setErr] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [emailed, setEmailed] = useState(true);
  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement>) => setV((x) => ({ ...x, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    const phone = mobileOf(v.phone);
    if (v.name.trim().length < 2) return setErr("Please enter your full name.");
    if (!phone) return setErr("Enter a valid 10-digit mobile number.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email)) return setErr("Enter a valid email: your login is sent there.");
    if (!v.consent) return setErr("Please tick the box so we can contact you.");
    setState("sending");
    try {
      const r = await registerStudent({ name: v.name, phone, email: v.email, city: v.city || undefined, interestedCourse: v.course || undefined, consent: true, company_url: v.company_url || undefined });
      setEmailed(r.loginEmailed);
      setState("done");
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : "Please try again.");
      setState("idle");
    }
  }

  return (
    <main className="container-x pb-20 pt-32">
      <div className="card mx-auto max-w-lg p-6 sm:p-8">
        {state === "done" ? (
          <div className="text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" />
            <h1 className="mt-4 font-display text-2xl font-bold text-ink">You are registered</h1>
            <p className="mt-2 text-body">
              {emailed
                ? "We have emailed your login. Use it to see your application and upload your documents (10th, 12th, Aadhaar and more). Check your spam folder if you do not see it."
                : "A counsellor will contact you shortly. If you already registered earlier, use your existing login."}
            </p>
            <Link href="/student/login" className="btn btn-primary mt-6">Go to student login</Link>
          </div>
        ) : (
          <form onSubmit={submit} noValidate>
            <h1 className="font-display text-2xl font-bold text-ink">Register as a student</h1>
            <p className="mt-1 text-sm text-body">Create your free account. A counsellor is assigned to you and your login is emailed.</p>
            <div className="mt-5 grid gap-3">
              <input className="field" placeholder="Full name *" value={v.name} onChange={set("name")} autoComplete="name" />
              <input className="field" placeholder="Mobile number *" inputMode="tel" value={v.phone} onChange={set("phone")} autoComplete="tel" />
              <input className="field" type="email" placeholder="Email *" value={v.email} onChange={set("email")} autoComplete="email" />
              <div className="grid gap-3 sm:grid-cols-2">
                <input className="field" placeholder="City" value={v.city} onChange={set("city")} />
                <input className="field" placeholder="Course you want (e.g. B.Tech)" value={v.course} onChange={set("course")} />
              </div>
              <input className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" value={v.company_url} onChange={set("company_url")} />
              <label className="flex items-start gap-2 text-sm text-body">
                <input type="checkbox" className="mt-1" checked={v.consent} onChange={set("consent")} />
                <span>I agree to be contacted by FastAdmission about admissions, and to my details being stored for that purpose. <Link href="/privacy" className="underline">Privacy</Link></span>
              </label>
              {err && <p role="alert" className="text-sm font-medium text-red-600">{err}</p>}
              <button className="btn btn-primary btn-lg" disabled={state === "sending"}>
                {state === "sending" && <Loader2 className="h-4 w-4 animate-spin" />} Register
              </button>
              <p className="text-center text-sm text-body">Already registered? <Link href="/student/login" className="font-semibold text-brand-600">Log in</Link></p>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
