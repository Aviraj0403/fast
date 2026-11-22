"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2, Mail, FileUp, LogIn } from "lucide-react";
import { AuthShell } from "@/components/student/AuthShell";
import { mobileOf } from "@/components/LeadForm";
import { registerStudent } from "@/lib/student";

const COURSES = ["Engineering (B.Tech)", "Medical (MBBS / BDS)", "Management (MBA / BBA)", "Law (LLB)", "Commerce / Arts / Other"];

export default function RegisterPage() {
  const [v, setV] = useState({ name: "", phone: "", email: "", city: "", course: "", consent: false, company_url: "" });
  const [err, setErr] = useState<Record<string, string>>({});
  const [formErr, setFormErr] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [emailed, setEmailed] = useState(true);
  const [ref, setRef] = useState("");
  useEffect(() => { try { setRef((new URLSearchParams(window.location.search).get("ref") || "").slice(0, 30)); } catch { /* no query */ } }, []);
  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const t = e.target as HTMLInputElement;
    setV((x) => ({ ...x, [k]: t.type === "checkbox" ? t.checked : t.value }));
    setErr((x) => ({ ...x, [k]: "" }));
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setFormErr("");
    const phone = mobileOf(v.phone);
    const next: Record<string, string> = {};
    if (v.name.trim().length < 2) next.name = "Enter your full name.";
    if (!phone) next.phone = "Enter a valid 10-digit mobile number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email)) next.email = "Enter a valid email. Your login is sent there.";
    if (!v.consent) next.consent = "Please tick this box so we can contact you.";
    setErr(next);
    if (Object.keys(next).length) return;
    setState("sending");
    try {
      const r = await registerStudent({ referralCode: ref || undefined, name: v.name, phone: phone!, email: v.email, city: v.city || undefined, interestedCourse: v.course || undefined, consent: true, company_url: v.company_url || undefined });
      setEmailed(r.loginEmailed);
      setState("done");
    } catch (ex) {
      setFormErr(ex instanceof Error ? ex.message : "Please try again.");
      setState("idle");
    }
  }

  if (state === "done") {
    return (
      <AuthShell eyebrow="All set" title="You are registered" subtitle={emailed ? "We have emailed your login details." : "A counsellor will contact you shortly."}>
        <ol className="grid gap-4">
          {emailed ? (
            <>
              <li className="flex gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600"><Mail className="h-4 w-4" /></span><p className="text-body"><b className="text-ink">1. Check your email</b> for your temporary password. Look in spam or promotions if you do not see it.</p></li>
              <li className="flex gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600"><LogIn className="h-4 w-4" /></span><p className="text-body"><b className="text-ink">2. Log in</b> with your email and that password.</p></li>
              <li className="flex gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600"><FileUp className="h-4 w-4" /></span><p className="text-body"><b className="text-ink">3. Upload your documents</b> (10th, 12th, Aadhaar) and track your applications.</p></li>
            </>
          ) : (
            <li className="flex gap-3"><CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" /><p className="text-body">If you registered before, log in with your existing password. Otherwise your counsellor will send you a login after they call you.</p></li>
          )}
        </ol>
        <Link href="/student/login" className="btn btn-primary btn-lg mt-7 w-full">Go to student login</Link>
      </AuthShell>
    );
  }

  const bad = (k: string) => (err[k] ? true : undefined);
  return (
    <AuthShell eyebrow="Student registration" title="Create your free account" subtitle="Register once. A counsellor is assigned to you and your login is emailed so you can track applications and upload documents.">
      <form onSubmit={submit} className="grid min-w-0 grid-cols-1 gap-4" noValidate>
        <div>
          <label className="label" htmlFor="reg-name">Full name *</label>
          <input id="reg-name" className="field" autoComplete="name" value={v.name} onChange={set("name")} aria-invalid={bad("name")} />
          {err.name && <p className="field-error">{err.name}</p>}
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="reg-phone">Mobile number *</label>
            <input id="reg-phone" className="field" inputMode="tel" autoComplete="tel" placeholder="10-digit number" value={v.phone} onChange={set("phone")} aria-invalid={bad("phone")} />
            {err.phone && <p className="field-error">{err.phone}</p>}
          </div>
          <div>
            <label className="label" htmlFor="reg-email">Email *</label>
            <input id="reg-email" className="field" type="email" inputMode="email" autoComplete="email" placeholder="you@example.com" value={v.email} onChange={set("email")} aria-invalid={bad("email")} />
            {err.email && <p className="field-error">{err.email}</p>}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="reg-city">City</label>
            <input id="reg-city" className="field" autoComplete="address-level2" value={v.city} onChange={set("city")} />
          </div>
          <div>
            <label className="label" htmlFor="reg-course">Course you want</label>
            <select id="reg-course" className="field" value={v.course} onChange={set("course")}>
              <option value="">Select</option>
              {COURSES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <input className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" value={v.company_url} onChange={set("company_url")} />
        <div>
          <label className="flex items-start gap-2.5 text-sm text-body">
            <input type="checkbox" className="mt-1 h-4 w-4 accent-[var(--color-brand-500)]" checked={v.consent} onChange={set("consent")} />
            <span>I agree to be contacted by FastAdmission about admissions and to my details being stored for that. <Link href="/privacy" className="underline">Privacy</Link></span>
          </label>
          {err.consent && <p className="field-error">{err.consent}</p>}
        </div>
        {formErr && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700">{formErr}</p>}
        <button className="btn btn-primary btn-lg w-full" disabled={state === "sending"}>
          {state === "sending" && <Loader2 className="h-4 w-4 animate-spin" />} {state === "sending" ? "Creating account..." : "Register"}
        </button>
        <p className="text-center text-sm text-body">Already registered? <Link href="/student/login" className="font-semibold text-brand-600 hover:underline">Log in</Link></p>
      </form>
    </AuthShell>
  );
}
