import { AlertCircle, ArrowRight, FileUp, Wallet } from "lucide-react";
import { inr } from "@/lib/studentUi";
import { DOC_TYPES, type Overview } from "@/lib/student";

type Step = { icon: typeof AlertCircle; tone: string; title: string; text: string; href?: string; cta?: string };

/** What the student should do next, most urgent first. Hidden when there is nothing to do. */
export function NextSteps({ data }: { data: Overview }) {
  const steps: Step[] = [];
  const docs = data.documents.filter((d) => !d.superseded);
  for (const d of docs.filter((x) => x.status === "rejected"))
    steps.push({ icon: AlertCircle, tone: "bg-red-50 text-red-700", title: `Re-upload: ${DOC_TYPES.find((t) => t.type === d.type)?.label ?? d.type}`, text: d.rejectReason || "Your counsellor could not accept this file.", href: "#documents", cta: "Upload again" });
  const missing = DOC_TYPES.filter((t) => t.type !== "other" && !docs.some((d) => d.type === t.type));
  if (missing.length) steps.push({ icon: FileUp, tone: "bg-amber-50 text-amber-700", title: `Upload ${missing.length} required document${missing.length > 1 ? "s" : ""}`, text: missing.map((m) => m.label).join(", "), href: "#documents", cta: "Upload now" });
  for (const f of (data.feeLinks ?? []).filter((x) => ["created", "partially_paid"].includes(x.status) && x.shortUrl))
    steps.push({ icon: Wallet, tone: "bg-brand-50 text-brand-700", title: `Pay ${inr(f.amountPaise)}: ${f.title}`, text: "Secure online payment link.", href: f.shortUrl, cta: "Pay now" });
  if (!steps.length) return null;
  return (
    <section aria-label="Next steps" className="card p-5 sm:p-6">
      <h2 className="font-display text-lg font-extrabold text-ink">Do this next</h2>
      <ul className="mt-3 grid gap-3">
        {steps.slice(0, 5).map((s, i) => (
          <li key={i} className="flex flex-wrap items-center gap-3 rounded-xl border border-line p-3">
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${s.tone}`}><s.icon className="h-5 w-5" aria-hidden="true" /></span>
            <div className="min-w-0 flex-1"><p className="font-semibold text-ink">{s.title}</p><p className="truncate text-sm text-body">{s.text}</p></div>
            {s.href && <a href={s.href} {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="btn btn-outline">{s.cta} <ArrowRight className="h-4 w-4" /></a>}
          </li>
        ))}
      </ul>
    </section>
  );
}
