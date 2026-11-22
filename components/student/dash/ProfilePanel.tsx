import { dateOf, inr, profileScore } from "@/lib/studentUi";
import type { Overview } from "@/lib/student";

const Row = ({ k, v }: { k: string; v?: string }) => (
  <div className="flex justify-between gap-4 py-2 text-sm"><dt className="text-body">{k}</dt><dd className="text-right font-medium text-ink">{v || <span className="font-normal text-body">Not added</span>}</dd></div>
);

/** What we hold about the student. Read-only here: the counsellor updates it (so the record stays accurate). */
export function ProfilePanel({ p }: { p: Overview["profile"] }) {
  const score = profileScore(p);
  const addr = [p.address?.line, p.address?.city, p.address?.state, p.address?.pincode].filter(Boolean).join(", ");
  return (
    <section id="profile" className="card scroll-mt-24 p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display text-xl font-extrabold text-ink">Your profile</h2>
        <span className="text-sm font-semibold text-brand-700">{score}% complete</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-brand-500" style={{ width: `${score}%` }} /></div>
      <dl className="mt-3 divide-y divide-line">
        <Row k="Name" v={p.name} />
        <Row k="Mobile" v={p.phone} />
        <Row k="Email" v={p.email} />
        <Row k="Date of birth" v={p.dob ? dateOf(p.dob) : undefined} />
        <Row k="Address" v={addr} />
        <Row k="Interested in" v={p.preferences?.courses?.join(", ")} />
        <Row k="Preferred cities" v={p.preferences?.cities?.join(", ")} />
        {p.preferences?.budgetMaxPaise ? <Row k="Budget up to" v={`${inr(p.preferences.budgetMaxPaise)} / year`} /> : null}
      </dl>
      {p.academics && p.academics.length > 0 && (
        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-body">Academics</p>
          <ul className="mt-2 grid gap-2">{p.academics.map((a, i) => <li key={i} className="flex flex-wrap justify-between gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm"><span className="font-medium text-ink">{a.level}{a.board ? ` · ${a.board}` : ""}{a.institute ? ` · ${a.institute}` : ""}</span><span className="text-body">{a.percentage != null ? `${a.percentage}%` : ""}{a.year ? ` (${a.year})` : ""}</span></li>)}</ul>
        </div>
      )}
      <p className="mt-4 text-xs text-body">To correct anything here, tell your counsellor.</p>
    </section>
  );
}
