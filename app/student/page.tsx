"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { ApplicationTracker } from "@/components/student/dash/ApplicationTracker";
import { DocumentsPanel } from "@/components/student/dash/DocumentsPanel";
import { FeesPanel } from "@/components/student/dash/FeesPanel";
import { NextSteps } from "@/components/student/dash/NextSteps";
import { PasswordPanel } from "@/components/student/dash/PasswordPanel";
import { ProfilePanel } from "@/components/student/dash/ProfilePanel";
import { ReferralPanel } from "@/components/student/dash/ReferralPanel";
import { Stats } from "@/components/student/dash/Stats";
import { StudentHero } from "@/components/student/dash/StudentHero";
import { ApiError, overview, setToken, type Overview } from "@/lib/student";

/** The student's home: where they stand, what to do next, applications, documents, payments, profile, referral. */
export default function StudentHome() {
  const router = useRouter();
  const [data, setData] = useState<Overview | null>(null);
  const [err, setErr] = useState("");

  const load = useCallback(async () => {
    try {
      setData(await overview());
    } catch (e) {
      if (e instanceof ApiError && (e.status === 401 || e.status === 403)) { setToken(null); router.replace("/student/login"); return; }
      setErr(e instanceof Error ? e.message : "Could not load your details.");
    }
  }, [router]);
  useEffect(() => { void load(); }, [load]);

  const logout = () => { setToken(null); router.replace("/student/login"); };

  if (err) return <main className="container-x pb-24 pt-32"><p role="alert" className="rounded-xl bg-red-50 p-4 text-red-700">{err} <button className="font-semibold underline" onClick={() => { setErr(""); void load(); }}>Try again</button></p></main>;
  if (!data) return <main className="flex min-h-[60vh] items-center justify-center pt-24"><Loader2 className="h-7 w-7 animate-spin text-brand-500" aria-label="Loading" /></main>;

  return (
    <main className="min-h-screen bg-slate-50 pb-28 pt-[calc(var(--header-h)+1.25rem)]">
      <div className="container-x grid max-w-6xl gap-5">
        <StudentHero data={data} onLogout={logout} />
        <Stats data={data} />
        <NextSteps data={data} />
        <div className="grid items-start gap-5 lg:grid-cols-[1.4fr_1fr]">
          <div className="grid gap-5">
            <ApplicationTracker apps={data.applications} />
            <DocumentsPanel docs={data.documents} onChanged={load} />
            <FeesPanel links={data.feeLinks ?? []} />
          </div>
          <div className="grid gap-5">
            <ProfilePanel p={data.profile} />
            {data.referral?.referralCode && <ReferralPanel code={data.referral.referralCode} />}
            <PasswordPanel />
          </div>
        </div>
      </div>
    </main>
  );
}
