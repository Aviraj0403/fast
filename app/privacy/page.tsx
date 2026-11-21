import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy", description: "What FastAdmission collects when you visit this website or send an enquiry, and how to ask us to delete it.", alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
  return (
    <main className="section pt-[calc(var(--header-h)+3rem)]">
      <div className="container-x max-w-3xl">
        <h1 className="text-4xl font-bold">Privacy</h1>
        <p className="lead mt-4">Short and plain: what we collect, why, and how you stay in control.</p>

        <h2 className="mt-10 text-xl font-bold">When you only browse</h2>
        <p className="mt-2 leading-relaxed">
          We note which pages you open, roughly where you came from (for example Google or an advertisement), your approximate city and whether you use a phone or a computer. This is stored against a random code kept in your browser, not
          against your name, phone number, e-mail or IP address. We use it to see which pages help students so we can improve them. If your browser sends a &quot;Do Not Track&quot; signal, we do not record your visit. We also use
          Vercel Analytics and Google Analytics for overall traffic numbers.
        </p>

        <h2 className="mt-10 text-xl font-bold">When you send an enquiry</h2>
        <p className="mt-2 leading-relaxed">
          The name, mobile number, e-mail, city and course you type are saved so a counsellor can contact you about admissions. We attach the pages you viewed before enquiring, so the counsellor understands your interests. We do not sell
          or share your number.
        </p>

        <h2 className="mt-10 text-xl font-bold">Your choices</h2>
        <p className="mt-2 leading-relaxed">
          You can ask us to show, correct or delete what we hold about you, or to stop contacting you, at any time. Write to <a className="font-semibold text-brand-700 hover:underline" href={`mailto:${SITE.email}`}>{SITE.email}</a> or call{" "}
          <a className="font-semibold text-brand-700 hover:underline" href={SITE.phoneHref}>{SITE.phone}</a>. Clearing your browser&apos;s site data also removes the random code.
        </p>
      </div>
    </main>
  );
}
