"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Loader2, MapPin, MessageCircle, Wallet } from "lucide-react";
import { mobileOf } from "@/lib/phone";
import { event } from "@/lib/analytics";
import { PLATFORM, waLink } from "@/lib/site";
import { cn } from "@/lib/utils";

const EXAMS = [
  { v: "jee_main", l: "JEE Main" },
  { v: "mht_cet", l: "MHT CET" },
  { v: "wbjee", l: "WBJEE" },
  { v: "kcet", l: "KCET" },
  { v: "direct_12th", l: "12th marks" },
];
const CATS = ["general", "obc", "sc", "st", "ews", "management"];
const METRICS = [
  { v: "percentile", l: "Percentile", hint: "0 - 100" },
  { v: "rank", l: "Rank", hint: "e.g. 24500" },
  { v: "percentage", l: "12th %", hint: "0 - 100" },
] as const;
type Metric = (typeof METRICS)[number]["v"];
type Chance = "high" | "medium" | "low";
type Prediction = { chance: Chance; collegeName: string; courseName: string; city?: string; state?: string; annualFeePaise: number; cutoffEstimate: string; reason: string };

const CHANCE = {
  high: { label: "High chance", bar: "bg-emerald-500", pill: "bg-emerald-50 text-emerald-700" },
  medium: { label: "Medium chance", bar: "bg-amber-400", pill: "bg-amber-50 text-amber-700" },
  low: { label: "Low chance", bar: "bg-slate-300", pill: "bg-slate-100 text-slate-600" },
} as const;
const fee = (paise: number) => (paise > 0 ? `₹${(paise / 10000000).toFixed(2)} lakh / year` : "Fee on request");

const Seg = ({ on, children, onClick }: { on: boolean; children: React.ReactNode; onClick: () => void }) => (
  <button type="button" role="radio" aria-checked={on} onClick={onClick}
    className={cn("rounded-xl border px-3.5 py-2 text-sm font-semibold transition-colors", on ? "border-brand-500 bg-brand-500 text-white shadow-sm" : "border-line bg-white text-ink hover:border-brand-300 hover:bg-brand-50")}>
    {children}
  </button>
);

export function PredictorForm() {
  const [v, setV] = useState({ name: "", phone: "", exam: "jee_main", metric: "percentile" as Metric, score: "", category: "general", branches: "", consent: false });
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [res, setRes] = useState<{ predictions: Prediction[]; total: number } | null>(null);
  const [filter, setFilter] = useState<"all" | Chance>("all");
  const out = useRef<HTMLElement>(null);
  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const t = e.target as HTMLInputElement;
    setV((x) => ({ ...x, [k]: t.type === "checkbox" ? t.checked : t.value }));
  };
  const metric = METRICS.find((m) => m.v === v.metric)!;
  const counts = useMemo(() => {
    const c = { high: 0, medium: 0, low: 0 };
    res?.predictions.forEach((p) => { c[p.chance] += 1; });
    return c;
  }, [res]);
  const shown = res ? res.predictions.filter((p) => filter === "all" || p.chance === filter).slice(0, 40) : [];
  useEffect(() => { if (res) out.current?.scrollIntoView({ behavior: "smooth", block: "start" }); }, [res]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    const phone = mobileOf(v.phone);
    const n = Number(v.score);
    if (v.name.trim().length < 2) return setErr("Please enter your name.");
    if (!phone) return setErr("Enter a valid 10-digit mobile number.");
    if (!v.score || Number.isNaN(n) || n <= 0) return setErr(`Enter your ${metric.l.toLowerCase()}.`);
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
      setFilter("all");
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
      <form onSubmit={submit} noValidate className="card relative grid grid-cols-1 gap-6 p-5 shadow-xl sm:p-8">
        <fieldset className="grid gap-4 sm:grid-cols-2">
          <legend className="mb-3 text-sm font-bold uppercase tracking-wide text-brand-600">1. About you</legend>
          <div><label className="label" htmlFor="p-name">Your name *</label><input id="p-name" className="field" autoComplete="name" value={v.name} onChange={set("name")} /></div>
          <div><label className="label" htmlFor="p-phone">Mobile number *</label><input id="p-phone" className="field" inputMode="tel" autoComplete="tel" placeholder="10-digit number" value={v.phone} onChange={set("phone")} /></div>
        </fieldset>

        <fieldset className="grid gap-5">
          <legend className="mb-3 text-sm font-bold uppercase tracking-wide text-brand-600">2. Your score</legend>
          <div>
            <p className="label" id="p-exam-l">Exam</p>
            <div role="radiogroup" aria-labelledby="p-exam-l" className="flex flex-wrap gap-2">{EXAMS.map((x) => <Seg key={x.v} on={v.exam === x.v} onClick={() => setV({ ...v, exam: x.v })}>{x.l}</Seg>)}</div>
          </div>
          <div className="grid gap-4 sm:grid-cols-[1fr_1fr]">
            <div>
              <p className="label" id="p-metric-l">I have my</p>
              <div role="radiogroup" aria-labelledby="p-metric-l" className="flex flex-wrap gap-2">{METRICS.map((m) => <Seg key={m.v} on={v.metric === m.v} onClick={() => setV({ ...v, metric: m.v, score: "" })}>{m.l}</Seg>)}</div>
            </div>
            <div>
              <label className="label" htmlFor="p-score">{metric.l} *</label>
              <input id="p-score" className="field" inputMode="decimal" placeholder={metric.hint} value={v.score} onChange={set("score")} />
            </div>
          </div>
          <div>
            <p className="label" id="p-cat-l">Category</p>
            <div role="radiogroup" aria-labelledby="p-cat-l" className="flex flex-wrap gap-2">{CATS.map((c) => <Seg key={c} on={v.category === c} onClick={() => setV({ ...v, category: c })}>{c.toUpperCase()}</Seg>)}</div>
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-3 text-sm font-bold uppercase tracking-wide text-brand-600">3. Preference (optional)</legend>
          <label className="label" htmlFor="p-br">Branches you like</label>
          <input id="p-br" className="field" placeholder="Computer Science, Mechanical" value={v.branches} onChange={set("branches")} />
          <p className="mt-1 text-xs text-body">Separate with commas. Leave empty to see all branches.</p>
        </fieldset>

        <div className="grid gap-4">
          <label className="flex items-start gap-2.5 text-sm text-body"><input type="checkbox" className="mt-1 h-4 w-4 accent-[var(--color-brand-500)]" checked={v.consent} onChange={set("consent")} /><span>I agree that FastAdmission may contact me by call, SMS or WhatsApp about admissions.</span></label>
          {err && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700">{err}</p>}
          <button className="btn btn-primary btn-lg w-full" disabled={busy}>{busy && <Loader2 className="h-4 w-4 animate-spin" />} {busy ? "Checking colleges..." : "Show my colleges"}</button>
        </div>
      </form>

      {res && (
        <section ref={out} className="mt-10 scroll-mt-24" aria-live="polite">
          <h2 className="font-display text-2xl font-extrabold text-ink">{res.total ? `${res.total} colleges matched your score` : "No exact match yet"}</h2>
          {res.total === 0 ? (
            <div className="card mt-4 p-6 text-body">We could not find a college that fits this score right now. A counsellor will call you with options that do.</div>
          ) : (
            <>
              <div role="tablist" aria-label="Filter by chance" className="mt-4 flex flex-wrap gap-2">
                {([["all", `All (${res.total})`], ["high", `High (${counts.high})`], ["medium", `Medium (${counts.medium})`], ["low", `Low (${counts.low})`]] as const).map(([k, l]) => (
                  <button key={k} role="tab" aria-selected={filter === k} onClick={() => setFilter(k)} className={cn("rounded-full border px-4 py-1.5 text-sm font-semibold", filter === k ? "border-ink bg-ink text-white" : "border-line bg-white text-ink hover:bg-slate-100")}>{l}</button>
                ))}
              </div>
              <ul className="mt-4 grid gap-3">
                {shown.map((p, i) => (
                  <li key={i} className="card relative overflow-hidden p-4 pl-6 sm:p-5 sm:pl-7">
                    <span aria-hidden className={cn("absolute inset-y-0 left-0 w-1.5", CHANCE[p.chance].bar)} />
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="min-w-0"><p className="font-display text-lg font-bold text-ink">{p.collegeName}</p><p className="text-sm font-medium text-body">{p.courseName}</p></div>
                      <span className={cn("rounded-full px-3 py-1 text-xs font-bold uppercase", CHANCE[p.chance].pill)}>{CHANCE[p.chance].label}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-body">
                      {(p.city || p.state) && <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" aria-hidden="true" />{[p.city, p.state].filter(Boolean).join(", ")}</span>}
                      <span className="inline-flex items-center gap-1.5"><Wallet className="h-4 w-4" aria-hidden="true" />{fee(p.annualFeePaise)}</span>
                      <span>Cutoff: <b className="text-ink">{p.cutoffEstimate}</b></span>
                    </div>
                    {p.reason && <p className="mt-2 text-xs text-body">{p.reason}</p>}
                  </li>
                ))}
              </ul>
            </>
          )}
          <div className="mt-6 flex flex-col items-center justify-between gap-3 rounded-2xl bg-brand-950 p-5 text-center sm:flex-row sm:text-left">
            <p className="text-white"><b>Want help choosing?</b> <span className="text-slate-300">A counsellor will call you. Or talk to us now.</span></p>
            <a href={waLink("Hi, I used the college predictor and want help choosing a college.")} target="_blank" rel="noopener noreferrer" className="btn btn-primary shrink-0"><MessageCircle className="h-4 w-4" /> Chat on WhatsApp</a>
          </div>
        </section>
      )}
    </>
  );
}
