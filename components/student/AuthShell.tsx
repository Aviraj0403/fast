import type { ReactNode } from "react";
import { CheckCircle2, FileUp, ListChecks, ShieldCheck } from "lucide-react";

const POINTS = [
  { icon: ListChecks, text: "Track every college application and its status in one place" },
  { icon: FileUp, text: "Upload 10th, 12th, Aadhaar and other documents safely" },
  { icon: ShieldCheck, text: "Your counsellor checks them and tells you what is missing" },
];

/** Shared two-column layout for student register / login: brand panel on the left (hidden on phones), the form on the right. */
export function AuthShell({ eyebrow, title, subtitle, children }: { eyebrow: string; title: string; subtitle: string; children: ReactNode }) {
  return (
    <main className="min-h-dvh bg-slate-50 pt-[calc(var(--header-h)+1.5rem)] pb-24">
      <div className="container-x grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="relative hidden overflow-hidden rounded-3xl bg-brand-950 p-10 text-white lg:block">
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_90%_0%,rgb(10_150_208/0.35),transparent_60%)]" />
          <div className="relative flex h-full flex-col">
            <p className="eyebrow eyebrow-dark">Student portal</p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-white">Your admission, tracked end to end.</h2>
            <ul className="mt-8 space-y-5">
              {POINTS.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10"><Icon className="h-4 w-4 text-brand-300" aria-hidden="true" /></span>
                  <span className="text-slate-200">{text}</span>
                </li>
              ))}
            </ul>
            <p className="mt-auto flex items-center gap-2 pt-10 text-sm text-slate-300"><CheckCircle2 className="h-4 w-4 text-emerald-400" aria-hidden="true" /> Free for students. A counsellor is assigned to you.</p>
          </div>
        </aside>

        <section className="card mx-auto w-full min-w-0 max-w-xl self-center p-6 sm:p-9 lg:max-w-none">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-1 font-display text-2xl font-extrabold text-ink sm:text-3xl">{title}</h1>
          <p className="mt-2 text-body">{subtitle}</p>
          <div className="mt-6">{children}</div>
        </section>
      </div>
    </main>
  );
}
