"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { mobileOf } from "@/components/LeadForm";
import { event } from "@/lib/analytics";
import { PLATFORM } from "@/lib/site";

const EXAMS = [
  { v: "jee_main", l: "JEE Main" },
  { v: "mht_cet", l: "MHT CET" },
  { v: "wbjee", l: "WBJEE" },
  { v: "kcet", l: "KCET" },
  { v: "direct_12th", l: "12th marks (direct admission)" },
];
const CATS = ["general", "obc", "sc", "st", "ews", "management"];
type Metric = "percentile" | "rank" | "percentage";
type Prediction = { chance: "high" | "medium" | "low"; collegeName: string; courseName: string; city?: string; state?: string; annualFeePaise: number; cutoffEstimate: string; reason: string };

const TONE = { high: "bg-emerald-50 text-emerald-700", medium: "bg-amber-50 text-amber-700", low: "bg-slate-100 text-slate-600" } as const;
const lakh = (paise: number) => `₹${(paise / 100 / 100000).toFixed(2)} lakh / year`;

export function PredictorForm() {
  const [v, setV] = useState({ name: "", phone: "", exam: "jee_main", metric: "percentile" as Metric, score: "", category: "general", branches: "", consent: false });
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [res, setRes] = useState<{ predictions: Prediction[]; total: number } | null>(null);
  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const t = e.target as HTMLInputElement;
    setV((x) => ({ ...x, [k]: t.type === "checkbox" ? t.checked : t.value }));
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    const phone = mobileOf(v.phone);
    const n = Number(v.score);
    if (v.name.trim().length < 2) return setErr("Please enter your name.");
    if (!phone) return setErr("Enter a valid 10-digit mobile number.");
    if (!v.score || Number.isNaN(n) || n <= 0) return setErr("Enter your score.");
    if (v.metric !== "rank" && n > 100) return setErr("Percentile / percentage cannot be above 100.");
    if (!v.consent) return setErr("Please tick the box so a counsellor can share your shortlist.");
    setBusy(true);
    try {
      const body: Record<string, unknown> = { name: v.name.trim(), phone, exam: v.exam, category: v.category, [v.metric]: v.metric === "rank" ? Math.round(n) : n };
      const b = v.branches.split(",").map((s) => s.trim()).filter(Boolean);
      if (b.length) body.preferredBranches = b;
      const r = await fetch(`${PLATFORM.apiUrl}/public/predict/${PLATFORM.tenantSlug}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(d?.message || d?.error?.message || "Could not get your prediction. Please try again.");
      setRes(d);
      event("predictor_used", { exam: v.exam });
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : "Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <form onSubmit={submit} noValidate className="card mt-6 grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 sm:p-7">
        <div><label className="label" htmlFor="p-name">Your name *</label><input id="p-name" className="field" autoComplete="name" value={v.name} onChange={set("name")} /></div>
        <div><label className="label" htmlFor="p-phone">Mobile number *</label><input id="p-phone" className="field" inputMode="tel" autoComplete="tel" value={v.phone} onChange={set("phone")} /></div>
        <div><label className="label" htmlFor="p-exam">Exam</label><select id="p-exam" className="field" value={v.exam} onChange={set("exam")}>{EXAMS.map((x) => <option key={x.v} value={x.v}>{x.l}</option>)}</select></div>
        <div><label className="label" htmlFor="p-cat">Category</label><select id="p-cat" className="field capitalize" value={v.category} onChange={set("category")}>{CATS.map((c) => <option key={c} value={c}>{c.toUpperCase()}</option>)}</select></div>
        <div>
          <label className="label" htmlFor="p-metric">Your score is a</label>
          <select id="p-metric" className="field" value={v.metric} onChange={set("metric")}><option value="percentile">Percentile</option><option value="rank">Rank</option><option value="percentage">12th percentage</option></select>
        </div>
        <div><label className="label" htmlFor="p-score">{v.metric === "rank" ? "Rank" : v.metric === "percentile" ? "Percentile (0-100)" : "Percentage (0-100)"} *</label><input id="p-score" className="field" inputMode="decimal" value={v.score} onChange={set("score")} /></div>
        <div className="sm:col-span-2"><label className="label" htmlFor="p-br">Preferred branches (optional, comma separated)</label><input id="p-br" className="field" placeholder="Computer Science, Mechanical" value={v.branches} onChange={set("branches")} /></div>
        <label className="flex items-start gap-2.5 text-sm text-body sm:col-span-2"><input type="checkbox" className="mt-1 h-4 w-4" checked={v.consent} onChange={set("consent")} /><span>I agree that FastAdmission may contact me about admissions.</span></label>
        {err && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700 sm:col-span-2">{err}</p>}
        <button className="btn btn-primary btn-lg sm:col-span-2" disabled={busy}>{busy && <Loader2 className="h-4 w-4 animate-spin" />} {busy ? "Checking..." : "Show my colleges"}</button>
      </form>

      {res && (
        <section className="mt-8" aria-live="polite">
          <h2 className="font-display text-xl font-bold text-ink">{res.total ? `${res.total} colleges matched` : "No exact match yet"}</h2>
          {res.total === 0 ? (
            <p className="mt-2 text-body">A counsellor will call you with options that fit your score.</p>
          ) : (
            <ul className="mt-4 grid gap-3">
              {res.predictions.slice(0, 30).map((p, i) => (
                <li key={i} className="card p-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div><p className="font-semibold text-ink">{p.collegeName}</p><p className="text-sm text-body">{p.courseName}{p.city ? ` · ${p.city}` : ""}</p></div>
                    <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${TONE[p.chance]}`}>{p.chance} chance</span>
                  </div>
                  <p className="mt-2 text-sm text-body">{lakh(p.annualFeePaise)} · Cutoff: {p.cutoffEstimate}</p>
                  <p className="mt-1 text-xs text-body">{p.reason}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </>
  );
}
