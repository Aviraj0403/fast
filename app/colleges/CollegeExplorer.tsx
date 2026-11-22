"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Award, MapPin, Search, SlidersHorizontal, Star, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { College } from "@/lib/colleges";

/** A stable, pleasant colour per college so the cards are recognisable without logos. */
const GRADIENTS = ["from-sky-500 to-indigo-600", "from-emerald-500 to-teal-600", "from-violet-500 to-fuchsia-600", "from-amber-500 to-orange-600", "from-rose-500 to-pink-600", "from-cyan-500 to-blue-600"];
const hash = (s: string) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
const mark = (name: string) => {
  const words = name.split(/\s+/).filter((w) => /^[A-Za-z]/.test(w));
  if (words[0] && /^[A-Z]{2,4}$/.test(words[0])) return words[0]; // COEP, VIT, NIT, KIIT: the college's own short name
  return words.filter((w) => !["of", "the", "and", "for"].includes(w.toLowerCase())).slice(0, 2).map((w) => w[0]!.toUpperCase()).join("") || "C";
};
const place = (c: College) => [c.city, c.state].filter(Boolean).join(", ");

const Chip = ({ on, children, onClick }: { on: boolean; children: React.ReactNode; onClick: () => void }) => (
  <button type="button" aria-pressed={on} onClick={onClick} className={cn("whitespace-nowrap rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors", on ? "border-brand-500 bg-brand-500 text-white shadow-sm" : "border-line bg-white text-ink hover:border-brand-300 hover:bg-brand-50")}>{children}</button>
);

function Card({ c }: { c: College }) {
  const g = GRADIENTS[hash(c.slug) % GRADIENTS.length];
  return (
    <li className="card card-hover group relative flex flex-col overflow-hidden">
      <div className={cn("relative flex h-24 items-end bg-gradient-to-br p-4", g)}>
        <div aria-hidden className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,white_0,transparent_45%),radial-gradient(circle_at_90%_80%,white_0,transparent_40%)]" />
        <span className="relative flex h-14 w-14 translate-y-9 items-center justify-center rounded-2xl bg-white font-display text-base font-extrabold tracking-tight text-ink shadow-lg ring-4 ring-white" aria-hidden="true">{mark(c.name)}</span>
        {c.featured && <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-amber-700 shadow"><Star className="h-3.5 w-3.5 fill-amber-400 text-amber-500" aria-hidden="true" /> Featured</span>}
      </div>
      <div className="flex flex-1 flex-col p-5 pt-11">
        <h2 className="font-display text-lg font-extrabold leading-snug text-ink"><Link href={`/colleges/${c.slug}`} className="after:absolute after:inset-0 group-hover:text-brand-700">{c.name}</Link></h2>
        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-body"><MapPin className="h-4 w-4 shrink-0 text-brand-500" aria-hidden="true" />{place(c) || "India"}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {c.type && <span className="rounded-md bg-brand-50 px-2 py-0.5 text-xs font-semibold text-brand-700">{c.type}</span>}
          {c.accreditations?.slice(0, 2).map((a) => <span key={a} className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700"><Award className="h-3 w-3" aria-hidden="true" />{a}</span>)}
        </div>
        {c.affiliation && <p className="mt-2 text-xs text-body">{c.affiliation}</p>}
        {c.description && <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-body">{c.description}</p>}
        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-bold text-brand-600">Courses, fees and apply <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
      </div>
    </li>
  );
}

/** Search, filter by state and type, and browse. Featured colleges (chosen in the admin) stay first. */
export function CollegeExplorer({ colleges }: { colleges: College[] }) {
  const [q, setQ] = useState("");
  const [state, setState] = useState("");
  const [type, setType] = useState("");
  const states = useMemo(() => [...new Set(colleges.map((c) => c.state).filter(Boolean) as string[])].sort(), [colleges]);
  const types = useMemo(() => [...new Set(colleges.map((c) => c.type).filter(Boolean) as string[])].sort(), [colleges]);
  const shown = useMemo(() => {
    const t = q.trim().toLowerCase();
    return colleges.filter((c) => (!state || c.state === state) && (!type || c.type === type) && (!t || [c.name, c.city, c.state, c.type, c.affiliation].some((x) => x?.toLowerCase().includes(t))));
  }, [colleges, q, state, type]);
  const filtered = !!(q || state || type);
  const clear = () => { setQ(""); setState(""); setType(""); };

  return (
    <>
      <div className="card -mt-9 relative z-10 p-4 shadow-xl sm:p-5">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-body" aria-hidden="true" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by college, city or state" aria-label="Search colleges" className="field !py-3.5 !pl-12 text-base" />
        </div>
        {(states.length > 1 || types.length > 1) && (
          <div className="mt-3 flex flex-col gap-2.5">
            {states.length > 1 && (
              <div className="flex items-center gap-2"><SlidersHorizontal className="h-4 w-4 shrink-0 text-body" aria-hidden="true" />
                <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1" role="group" aria-label="Filter by state"><Chip on={!state} onClick={() => setState("")}>All states</Chip>{states.map((s) => <Chip key={s} on={state === s} onClick={() => setState(state === s ? "" : s)}>{s}</Chip>)}</div>
              </div>
            )}
            {types.length > 1 && <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1" role="group" aria-label="Filter by type"><Chip on={!type} onClick={() => setType("")}>All types</Chip>{types.map((t) => <Chip key={t} on={type === t} onClick={() => setType(type === t ? "" : t)}>{t}</Chip>)}</div>}
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-ink" aria-live="polite">{shown.length} {shown.length === 1 ? "college" : "colleges"}{filtered ? " match" : ""}</p>
        {filtered && <button onClick={clear} className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:underline"><X className="h-4 w-4" aria-hidden="true" /> Clear filters</button>}
      </div>

      {shown.length === 0 ? (
        <div className="card mt-4 p-8 text-center"><p className="font-display text-lg font-bold text-ink">No college matches that search</p><p className="mt-1 text-body">Try a different word, or let a counsellor shortlist colleges for your marks and budget.</p><Link href="/college-predictor" className="btn btn-primary mt-4">Check my rank predictor</Link></div>
      ) : (
        <ul className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{shown.map((c) => <Card key={c.slug} c={c} />)}</ul>
      )}
    </>
  );
}
