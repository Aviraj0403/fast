import type { Metadata } from "next";
import { Cookie, FileLock2, ShieldCheck, UserRoundCheck } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What FastAdmission collects when you visit this website, send an enquiry or create a student account, and how to ask us to delete it.",
  alternates: { canonical: `${SITE.url}/privacy` },
};

const SECTIONS = [
  { id: "browse", icon: Cookie, title: "When you only browse", body: "We note which pages you open, roughly where you came from (for example Google or an advertisement), your approximate city and whether you use a phone or a computer. This is stored against a random code kept in your browser, not against your name, phone number, e-mail or IP address. We use it to see which pages help students so we can improve them. If your browser sends a \"Do Not Track\" signal, we do not record your visit. We also use Vercel Analytics and Google Analytics for overall traffic numbers." },
  { id: "enquiry", icon: UserRoundCheck, title: "When you send an enquiry", body: "The name, mobile number, e-mail, city and course you type are saved so a counsellor can contact you about admissions. We attach the pages you viewed before enquiring, so the counsellor understands your interests. We do not sell or share your number." },
  { id: "account", icon: FileLock2, title: "When you create a student account", body: "We store your name, contact details, the colleges you apply to, and the documents you upload (for example 10th and 12th marksheets, Aadhaar and photographs). Documents are stored encrypted and can be seen only by your counsellor and our admission team, and by a college only for an application you have made to it. We use them to prepare and track your applications and for nothing else." },
  { id: "choices", icon: ShieldCheck, title: "Your choices", body: "You can ask us to show, correct or delete what we hold about you, to remove your uploaded documents, or to stop contacting you, at any time." },
];

export default function PrivacyPage() {
  return (
    <main className="bg-slate-50 pb-28">
      <PageHero eyebrow="Your data" title="Privacy," accent="in plain words." text="What we collect, why, and how you stay in control.">
        <p className="mt-4 text-sm text-slate-400">Last updated November 2026</p>
      </PageHero>
      <div className="container-x relative z-10 -mt-10 grid max-w-5xl items-start gap-6 lg:grid-cols-[14rem_1fr]">
        <nav aria-label="On this page" className="card hidden p-4 lg:sticky lg:top-24 lg:block">
          <p className="px-2 pb-2 text-xs font-bold uppercase tracking-wide text-body">On this page</p>
          <ul className="grid gap-1">{SECTIONS.map((s) => <li key={s.id}><a href={`#${s.id}`} className="block rounded-lg px-2 py-1.5 text-sm font-medium text-ink hover:bg-brand-50 hover:text-brand-700">{s.title}</a></li>)}</ul>
        </nav>
        <div className="grid gap-5">
          {SECTIONS.map((s) => (
            <section key={s.id} id={s.id} className="card scroll-mt-28 p-6 sm:p-8">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600"><s.icon className="h-5 w-5" aria-hidden="true" /></span>
              <h2 className="mt-4 font-display text-xl font-extrabold text-ink">{s.title}</h2>
              <p className="mt-2 leading-relaxed text-body">{s.body}</p>
              {s.id === "choices" && (
                <p className="mt-3 leading-relaxed text-body">Write to <a className="font-semibold text-brand-700 hover:underline" href={`mailto:${SITE.email}`}>{SITE.email}</a> or call <a className="font-semibold text-brand-700 hover:underline" href={SITE.phoneHref}>{SITE.phone}</a>. Clearing your browser&apos;s site data also removes the random code.</p>
              )}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
