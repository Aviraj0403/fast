import { LogOut, MessageCircle, Phone } from "lucide-react";
import { waLink } from "@/lib/site";
import { initials } from "@/lib/studentUi";
import type { Overview } from "@/lib/student";

/** Dark banner: who you are, who your counsellor is, and a way to reach them. */
export function StudentHero({ data, onLogout }: { data: Overview; onLogout: () => void }) {
  const first = data.profile.name.split(" ")[0];
  return (
    <section className="relative overflow-hidden rounded-3xl bg-brand-950 p-6 text-white shadow-xl sm:p-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_90%_at_95%_0%,rgb(10_150_208/0.4),transparent_60%)]" />
      <div className="relative flex flex-wrap items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 text-2xl font-extrabold shadow-lg" aria-hidden="true">{initials(data.profile.name)}</span>
          <div>
            <p className="text-sm font-medium text-brand-300">Student dashboard</p>
            <h1 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl">Hello, {first}</h1>
            <p className="mt-1 text-sm text-slate-300">{[data.profile.email, data.profile.phone].filter(Boolean).join(" · ")}</p>
          </div>
        </div>
        <button onClick={onLogout} className="btn btn-ghost-light"><LogOut className="h-4 w-4" /> Log out</button>
      </div>
      <div className="relative mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
        {data.counsellor ? (
          <>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-sm font-bold" aria-hidden="true">{initials(data.counsellor.name)}</span>
              <div><p className="text-xs uppercase tracking-wide text-slate-300">Your counsellor</p><p className="font-semibold text-white">{data.counsellor.name}</p></div>
            </div>
            <a href={waLink(`Hi ${data.counsellor.name}, I am ${data.profile.name}. I need help with my admission.`)} target="_blank" rel="noopener noreferrer" className="btn btn-primary"><MessageCircle className="h-4 w-4" /> Message on WhatsApp</a>
          </>
        ) : (
          <p className="flex items-center gap-2 text-sm text-slate-200"><Phone className="h-4 w-4 text-brand-300" /> A counsellor is being assigned to you and will call you shortly.</p>
        )}
      </div>
    </section>
  );
}
