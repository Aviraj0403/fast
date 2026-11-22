import { Check, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ENDED, STEPS, dateOf, inr, intake, pretty, stepIndex } from "@/lib/studentUi";
import type { Application } from "@/lib/student";

function Tracker({ a }: { a: Application }) {
  const ended = ENDED.includes(a.status);
  // for an ended application, show how far it got
  const reached = ended ? Math.max(-1, ...((a.statusHistory ?? []).map((h) => stepIndex(h.from ?? "")))) : stepIndex(a.status);
  return (
    <ol className="mt-4 grid grid-cols-4 gap-y-4 sm:flex sm:items-start sm:justify-between" aria-label="Application progress">
      {STEPS.map((s, i) => {
        const done = i < reached || (!ended && i === reached && a.status === "admitted");
        const now = !ended && i === reached && !done;
        return (
          <li key={s.key} className="relative flex flex-col items-center text-center sm:flex-1" aria-current={now ? "step" : undefined}>
            {i > 0 && <span aria-hidden className={cn("absolute right-1/2 top-[15px] -z-0 hidden h-0.5 w-full sm:block", i <= reached ? "bg-brand-500" : "bg-line")} />}
            <span className={cn("relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold", done ? "border-brand-500 bg-brand-500 text-white" : now ? "border-brand-500 bg-white text-brand-600 ring-4 ring-brand-100" : "border-line bg-white text-body")}>
              {done ? <Check className="h-4 w-4" aria-hidden="true" /> : i + 1}
            </span>
            <span className={cn("mt-1.5 text-[11px] font-semibold leading-tight", now ? "text-brand-700" : done ? "text-ink" : "text-body")}>{s.label}</span>
          </li>
        );
      })}
    </ol>
  );
}

export function ApplicationTracker({ apps }: { apps: Application[] }) {
  return (
    <section id="applications" className="card scroll-mt-24 p-5 sm:p-6">
      <h2 className="font-display text-xl font-extrabold text-ink">Your applications</h2>
      {apps.length === 0 ? (
        <div className="mt-3 rounded-xl bg-slate-50 p-5 text-body">No application has been filed yet. Your counsellor will shortlist colleges with you and file them here, so you can follow every step.</div>
      ) : (
        <ul className="mt-4 grid gap-4">
          {apps.map((a) => {
            const ended = ENDED.includes(a.status);
            const missing = (a.checklist ?? []).filter((c) => c.mandatory && c.state !== "verified");
            return (
              <li key={a.id} className="rounded-2xl border border-line p-4 sm:p-5">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-display text-lg font-bold text-ink">{a.collegeName || "College"}</p>
                    <p className="text-sm text-body">{[a.courseName, intake(a.intake)].filter(Boolean).join(" · ")}</p>
                  </div>
                  <span className={cn("rounded-full px-3 py-1 text-xs font-bold uppercase", ended ? "bg-red-50 text-red-700" : a.status === "admitted" ? "bg-emerald-50 text-emerald-700" : "bg-brand-50 text-brand-700")}>{pretty(a.status)}</span>
                </div>
                {ended ? <p className="mt-3 flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700"><XCircle className="h-4 w-4" /> This application is {a.status}. Ask your counsellor about other options.</p> : <Tracker a={a} />}
                {a.offer && (
                  <p className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
                    <b>You have an offer.</b> {a.offer.scholarshipPaise ? `Scholarship ${inr(a.offer.scholarshipPaise)}. ` : ""}{a.offer.deadline ? `Reply by ${dateOf(a.offer.deadline)}.` : ""}
                  </p>
                )}
                {missing.length > 0 && !ended && <p className="mt-3 text-sm text-body"><b className="text-ink">Still needed for this college:</b> {missing.map((m) => m.label).join(", ")}</p>}
                {(a.statusHistory?.length ?? 0) > 0 && (
                  <details className="mt-3 text-sm">
                    <summary className="cursor-pointer font-semibold text-brand-600">History</summary>
                    <ul className="mt-2 grid gap-1 text-body">{a.statusHistory!.map((h, i) => <li key={i}>{dateOf(h.at)}: {h.from ? `${pretty(h.from)} → ` : ""}<b className="text-ink">{pretty(h.to)}</b></li>)}</ul>
                  </details>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
