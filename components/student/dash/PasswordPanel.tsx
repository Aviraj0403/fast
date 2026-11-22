"use client";

import { useState } from "react";
import { KeyRound } from "lucide-react";
import { changePassword } from "@/lib/student";
import { cn } from "@/lib/utils";

export function PasswordPanel() {
  const [cur, setCur] = useState("");
  const [next, setNext] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  async function save(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    try { await changePassword(cur, next); setCur(""); setNext(""); setMsg({ ok: true, text: "Password changed." }); }
    catch (ex) { setMsg({ ok: false, text: ex instanceof Error ? ex.message : "Could not change password." }); }
  }
  return (
    <section id="password" className="card scroll-mt-24 p-5 sm:p-6">
      <h2 className="flex items-center gap-2 font-display text-xl font-extrabold text-ink"><KeyRound className="h-5 w-5 text-brand-600" aria-hidden="true" /> Password</h2>
      <p className="mt-1 text-sm text-body">Change the temporary password from your email to one only you know.</p>
      <form onSubmit={save} className="mt-3 grid gap-3">
        <div><label className="label" htmlFor="pw-cur">Current password</label><input id="pw-cur" className="field" type="password" autoComplete="current-password" value={cur} onChange={(e) => setCur(e.target.value)} required /></div>
        <div><label className="label" htmlFor="pw-new">New password</label><input id="pw-new" className="field" type="password" autoComplete="new-password" minLength={10} value={next} onChange={(e) => setNext(e.target.value)} required /><p className="mt-1 text-xs text-body">At least 10 characters.</p></div>
        <button className="btn btn-primary">Save password</button>
        {msg && <p role="status" className={cn("rounded-lg px-3 py-2 text-sm font-medium", msg.ok ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700")}>{msg.text}</p>}
      </form>
    </section>
  );
}
