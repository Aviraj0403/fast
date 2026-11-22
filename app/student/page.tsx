"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, Clock, FileUp, Loader2, LogOut, XCircle } from "lucide-react";
import { ApiError, DOC_TYPES, changePassword, overview, setToken, uploadDocument, type Overview } from "@/lib/student";

const pretty = (s: string) => s.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase());
const STATUS_TONE: Record<string, string> = { verified: "text-emerald-700 bg-emerald-50", rejected: "text-red-700 bg-red-50", uploaded: "text-amber-700 bg-amber-50", pending: "text-amber-700 bg-amber-50" };

export default function StudentHome() {
  const router = useRouter();
  const [data, setData] = useState<Overview | null>(null);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState("");
  const [msg, setMsg] = useState("");
  const pick = useRef<string>("");
  const input = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    try {
      setData(await overview());
    } catch (e) {
      if (e instanceof ApiError && (e.status === 401 || e.status === 403)) { setToken(null); router.replace("/student/login"); return; }
      setErr(e instanceof Error ? e.message : "Could not load your details.");
    }
  }, [router]);
  useEffect(() => { void load(); }, [load]);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) return setMsg("That file is larger than 8 MB. Please upload a smaller PDF or photo.");
    setBusy(pick.current);
    setMsg("");
    try {
      await uploadDocument(pick.current, file);
      setMsg("Uploaded. Your counsellor has been told to check it.");
      await load();
    } catch (ex) {
      setMsg(ex instanceof Error ? ex.message : "Upload failed.");
    } finally {
      setBusy("");
    }
  }

  const logout = () => { setToken(null); router.replace("/student/login"); };

  if (err) return <main className="container-x pt-32 pb-20"><p role="alert" className="text-red-600">{err}</p></main>;
  if (!data) return <main className="container-x pt-32 pb-20 flex justify-center"><Loader2 className="h-6 w-6 animate-spin text-brand-500" /></main>;

  const current = (type: string) => data.documents.filter((d) => d.type === type && !d.superseded)[0];

  return (
    <main className="container-x pb-20 pt-28">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">Hello, {data.profile.name}</h1>
          <p className="text-body">{data.counsellor ? `Your counsellor: ${data.counsellor.name}` : "A counsellor will be assigned to you shortly."}</p>
        </div>
        <button onClick={logout} className="btn border border-line bg-white text-ink"><LogOut className="h-4 w-4" /> Log out</button>
      </div>

      <section className="card mt-6 p-5 sm:p-6">
        <h2 className="font-display text-xl font-bold text-ink">Upload your documents</h2>
        <p className="mt-1 text-sm text-body">PDF or clear photo, up to 8 MB each. Your counsellor and the admission team see these.</p>
        <input ref={input} type="file" accept="application/pdf,image/*" className="hidden" onChange={onFile} />
        <ul className="mt-4 divide-y divide-line">
          {DOC_TYPES.map((d) => {
            const cur = current(d.type);
            const Icon = cur?.status === "verified" ? CheckCircle2 : cur?.status === "rejected" ? XCircle : cur ? Clock : FileUp;
            return (
              <li key={d.type} className="flex flex-wrap items-center gap-3 py-3">
                <Icon className="h-5 w-5 shrink-0 text-brand-500" aria-hidden="true" />
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-ink">{d.label}</p>
                  <p className="truncate text-xs text-body">{cur ? cur.fileName || "Uploaded" : "Not uploaded yet"}{cur?.status === "rejected" && cur.rejectReason ? `: ${cur.rejectReason}` : ""}</p>
                </div>
                {cur && <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_TONE[cur.status] || "bg-slate-100 text-slate-700"}`}>{pretty(cur.status)}</span>}
                <button className="btn border border-line bg-white text-ink" disabled={!!busy} onClick={() => { pick.current = d.type; input.current?.click(); }}>
                  {busy === d.type ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileUp className="h-4 w-4" />} {cur ? "Replace" : "Upload"}
                </button>
              </li>
            );
          })}
        </ul>
        {msg && <p role="status" className="mt-3 text-sm font-medium text-brand-700">{msg}</p>}
      </section>

      <section className="card mt-6 p-5 sm:p-6">
        <h2 className="font-display text-xl font-bold text-ink">Your applications</h2>
        {data.applications.length === 0 ? (
          <p className="mt-2 text-body">No application has been filed yet. Your counsellor will shortlist colleges with you and file them here. <Link href="/colleges" className="font-semibold text-brand-600">Browse colleges</Link></p>
        ) : (
          <ul className="mt-4 grid gap-3">
            {data.applications.map((a) => (
              <li key={a.id} className="rounded-xl border border-line p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold text-ink">{a.collegeName}{a.courseName ? `: ${a.courseName}` : ""}</p>
                  <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">{pretty(a.status)}</span>
                </div>
                {a.checklist && a.checklist.length > 0 && (
                  <p className="mt-2 text-xs text-body">Documents needed: {a.checklist.map((c) => `${c.label} (${pretty(c.state)})`).join(", ")}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      <PasswordCard />
    </main>
  );
}

function PasswordCard() {
  const [cur, setCur] = useState("");
  const [next, setNext] = useState("");
  const [msg, setMsg] = useState("");
  async function save(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    try { await changePassword(cur, next); setCur(""); setNext(""); setMsg("Password changed."); }
    catch (ex) { setMsg(ex instanceof Error ? ex.message : "Could not change password."); }
  }
  return (
    <section className="card mt-6 p-5 sm:p-6">
      <h2 className="font-display text-xl font-bold text-ink">Change password</h2>
      <form onSubmit={save} className="mt-3 grid gap-3 sm:grid-cols-3">
        <input className="field" type="password" placeholder="Current password" value={cur} onChange={(e) => setCur(e.target.value)} autoComplete="current-password" required />
        <input className="field" type="password" placeholder="New password (min 10 characters)" value={next} onChange={(e) => setNext(e.target.value)} autoComplete="new-password" required />
        <button className="btn btn-primary">Save</button>
      </form>
      {msg && <p role="status" className="mt-2 text-sm text-body">{msg}</p>}
    </section>
  );
}
