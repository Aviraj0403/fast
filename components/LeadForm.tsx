"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, MessageCircle, ShieldCheck, Flame } from "lucide-react";
import { submitLead } from "@/lib/leads";
import { event } from "@/lib/analytics";
import { waLink } from "@/lib/site";
import { cn } from "@/lib/utils";

const COURSES = ["Engineering (B.Tech)", "Medical (MBBS / BDS)", "Management (MBA / BBA)", "Law (LLB)", "Commerce / Arts / Other"];
const ADMISSION_YEARS = [
  { label: "Immediate Admission (2026 Batch)", value: "2026 Immediate" },
  { label: "Next Session (2027 Batch)", value: "2027 Planning" },
  { label: "Just Exploring Career Options", value: "Exploring" },
];

/** 10-digit Indian mobile, accepting +91, 91, 0 and spaces / dashes. Returns the 10 digits or null. */
export const mobileOf = (raw: string): string | null => {
  const d = raw.replace(/\D/g, "");
  const n = d.length === 12 && d.startsWith("91") ? d.slice(2) : d.length === 11 && d.startsWith("0") ? d.slice(1) : d;
  return /^[6-9]\d{9}$/.test(n) ? n : null;
};

/**
 * The short lead form used in the hero and on every city page: name, mobile, course, and intake urgency.
 * High-intent selections (e.g. 2026 Immediate) automatically trigger the Hot Lead score in the Counsellor CRM.
 */
export function LeadForm({ form, city, dark = false, title = "Get a free call back", subtitle = "A counsellor will call you with a college shortlist, fees and cutoffs.", className }: { form: string; city?: string; dark?: boolean; title?: string; subtitle?: string; className?: string }) {
  const [v, setV] = useState({ name: "", phone: "", course: "", admissionYear: "2026 Immediate" });
  const [err, setErr] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "saved" | "fallback">("idle");
  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setV((x) => ({ ...x, [k]: e.target.value }));
  const id = (n: string) => `${form}-${n}`;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const problems: Record<string, string> = {};
    if (v.name.trim().length < 2) problems.name = "Please enter your name";
    const phone = mobileOf(v.phone);
    if (!phone) problems.phone = "Enter a valid 10-digit mobile number";
    if (!v.course) problems.course = "Choose a course";
    setErr(problems);
    if (Object.keys(problems).length) return;

    setState("sending");
    const formattedCourse = `${v.course} [${v.admissionYear}]`;
    const ok = await submitLead({
      name: v.name,
      phone: phone!,
      course: formattedCourse,
      city,
      form,
      message: `Intake: ${v.admissionYear}`,
    });
    event(ok ? "lead_submitted" : "lead_failed", { form, city: city ?? null, course: v.course, admissionYear: v.admissionYear });
    setState(ok ? "saved" : "fallback");
  };

  const chat = waLink(`Hi FastAdmission, I am ${v.name || "a student"}${city ? ` from ${city}` : ""} looking for ${v.course || "admission"} (${v.admissionYear}). My number is ${v.phone}.`);

  return (
    <div className={cn("on-dark-scope rounded-2xl p-6 sm:p-7", dark ? "on-dark border border-white/15 bg-white/[0.06] shadow-2xl" : "card", className)}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className={cn("text-xl font-bold", dark && "!text-white")}>{title}</h3>
          <p className={cn("mt-1 text-sm", dark ? "text-slate-300" : "text-muted")}>{subtitle}</p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-semibold text-amber-600 dark:text-amber-300">
          <Flame size={12} className="text-amber-500" /> Fast Callback
        </span>
      </div>

      {state === "saved" || state === "fallback" ? (
        <div role="status" className={cn("mt-6 rounded-xl border p-5", dark ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-100" : "border-emerald-200 bg-emerald-50 text-emerald-900")}>
          <p className="flex items-start gap-2.5 font-semibold">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
            {state === "saved" ? "Thank you! We have your details and will call you shortly." : "We could not save this online, please message us on WhatsApp so we do not miss you."}
          </p>
          <a href={chat} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-4 w-full">
            <MessageCircle className="h-4 w-4" /> {state === "saved" ? "Chat now on WhatsApp" : "Continue on WhatsApp"}
          </a>
        </div>
      ) : (
        <form onSubmit={submit} noValidate className="mt-5 space-y-4">
          <div>
            <label htmlFor={id("name")} className="label">Student name</label>
            <input id={id("name")} autoComplete="name" value={v.name} onChange={set("name")} aria-invalid={!!err.name} className="field" placeholder="Full name" />
            {err.name && <p role="alert" className="field-error">{err.name}</p>}
          </div>
          <div>
            <label htmlFor={id("phone")} className="label">Mobile (WhatsApp)</label>
            <input id={id("phone")} type="tel" inputMode="tel" autoComplete="tel" value={v.phone} onChange={set("phone")} aria-invalid={!!err.phone} className="field" placeholder="98765 43210" />
            {err.phone && <p role="alert" className="field-error">{err.phone}</p>}
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor={id("course")} className="label">Course you want</label>
              <select id={id("course")} value={v.course} onChange={set("course")} aria-invalid={!!err.course} className="field">
                <option value="">Choose a course</option>
                {COURSES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              {err.course && <p role="alert" className="field-error">{err.course}</p>}
            </div>
            <div>
              <label htmlFor={id("year")} className="label">Admission Year</label>
              <select id={id("year")} value={v.admissionYear} onChange={set("admissionYear")} className="field">
                {ADMISSION_YEARS.map((y) => <option key={y.value} value={y.value}>{y.label}</option>)}
              </select>
            </div>
          </div>
          <button type="submit" disabled={state === "sending"} className="btn btn-primary btn-lg w-full">
            {state === "sending" ? <Loader2 className="h-5 w-5 animate-spin" /> : null} {state === "sending" ? "Sending..." : "Request a free call back"}
          </button>
          <p className={cn("flex items-center justify-center gap-1.5 text-xs", dark ? "text-slate-400" : "text-muted")}>
            <ShieldCheck className="h-3.5 w-3.5" /> Free counselling. We never share your number.
          </p>
        </form>
      )}
    </div>
  );
}
