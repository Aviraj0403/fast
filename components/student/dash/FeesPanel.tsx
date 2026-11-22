import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { dateOf, inr, pretty } from "@/lib/studentUi";
import type { FeeLink } from "@/lib/student";

const TONE: Record<string, string> = { paid: "bg-emerald-50 text-emerald-700", created: "bg-amber-50 text-amber-700", partially_paid: "bg-amber-50 text-amber-700", failed: "bg-red-50 text-red-700", expired: "bg-slate-100 text-slate-600", cancelled: "bg-slate-100 text-slate-600" };

export function FeesPanel({ links }: { links: FeeLink[] }) {
  if (!links.length) return null;
  return (
    <section id="payments" className="card scroll-mt-24 p-5 sm:p-6">
      <h2 className="font-display text-xl font-extrabold text-ink">Payments</h2>
      <ul className="mt-3 divide-y divide-line">
        {links.map((f, i) => {
          const open = ["created", "partially_paid"].includes(f.status) && f.shortUrl;
          return (
            <li key={f._id || f.id || i} className="flex flex-wrap items-center gap-3 py-3">
              <div className="min-w-0 flex-1"><p className="font-semibold text-ink">{f.title}</p><p className="text-xs text-body">{f.paidAt ? `Paid on ${dateOf(f.paidAt)}` : "Pending"}</p></div>
              <p className="font-display text-lg font-extrabold text-ink">{inr(f.amountPaise)}</p>
              <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", TONE[f.status] || "bg-slate-100 text-slate-600")}>{pretty(f.status)}</span>
              {open && <a href={f.shortUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Pay now <ExternalLink className="h-4 w-4" /></a>}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
