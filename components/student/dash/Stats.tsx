import { CheckCircle2, FileText, GraduationCap, Wallet } from "lucide-react";
import { inr, profileScore } from "@/lib/studentUi";
import type { Overview } from "@/lib/student";

/** Four numbers that answer "where do I stand". */
export function Stats({ data }: { data: Overview }) {
  const docs = data.documents.filter((d) => !d.superseded);
  const verified = docs.filter((d) => d.status === "verified").length;
  const due = (data.feeLinks ?? []).filter((f) => ["created", "partially_paid"].includes(f.status)).reduce((a, f) => a + f.amountPaise, 0);
  const score = profileScore(data.profile);
  const tiles = [
    { icon: GraduationCap, label: "Applications", value: String(data.applications.length), sub: data.applications.length ? "in progress" : "none yet" },
    { icon: FileText, label: "Documents", value: `${verified}/${docs.length}`, sub: "verified" },
    { icon: Wallet, label: "Fee to pay", value: due ? inr(due) : "Nothing due", sub: due ? "pay securely online" : "you are all clear" },
    { icon: CheckCircle2, label: "Profile", value: `${score}%`, sub: score === 100 ? "complete" : "complete it for faster help" },
  ];
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {tiles.map(({ icon: Icon, label, value, sub }) => (
        <div key={label} className="card p-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600"><Icon className="h-4 w-4" aria-hidden="true" /></span>
          <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-body">{label}</p>
          <p className="mt-0.5 font-display text-xl font-extrabold text-ink sm:text-2xl">{value}</p>
          <p className="text-xs text-body">{sub}</p>
        </div>
      ))}
    </div>
  );
}
