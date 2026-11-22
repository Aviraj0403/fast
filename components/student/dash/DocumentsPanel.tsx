"use client";

import { useRef, useState } from "react";
import { CheckCircle2, Clock, FileUp, Loader2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { DOC_TONE, dateOf, pretty } from "@/lib/studentUi";
import { DOC_TYPES, uploadDocument, type Doc } from "@/lib/student";

const MAX_MB = 8;

/** Upload and track the documents counsellors ask for. Required ones come first; "Other" takes anything else. */
export function DocumentsPanel({ docs, onChanged }: { docs: Doc[]; onChanged: () => Promise<void> }) {
  const input = useRef<HTMLInputElement>(null);
  const pick = useRef("");
  const [busy, setBusy] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const current = (type: string) => docs.find((d) => d.type === type && !d.superseded);
  const required = DOC_TYPES.filter((t) => t.type !== "other");
  const done = required.filter((t) => current(t.type)).length;

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (file.size > MAX_MB * 1024 * 1024) return setMsg({ ok: false, text: `That file is larger than ${MAX_MB} MB. Please upload a smaller PDF or photo.` });
    setBusy(pick.current);
    setMsg(null);
    try {
      await uploadDocument(pick.current, file);
      setMsg({ ok: true, text: "Uploaded. Your counsellor has been told to check it." });
      await onChanged();
    } catch (ex) {
      setMsg({ ok: false, text: ex instanceof Error ? ex.message : "Upload failed. Please try again." });
    } finally {
      setBusy("");
    }
  }

  return (
    <section id="documents" className="card scroll-mt-24 p-5 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="font-display text-xl font-extrabold text-ink">Your documents</h2>
          <p className="text-sm text-body">PDF or clear photo, up to {MAX_MB} MB each. Your counsellor checks every file.</p>
        </div>
        <p className="text-sm font-semibold text-ink">{done} of {required.length} required uploaded</p>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100" role="progressbar" aria-valuenow={done} aria-valuemin={0} aria-valuemax={required.length} aria-label="Documents uploaded">
        <div className="h-full rounded-full bg-brand-500 transition-all" style={{ width: `${(done / required.length) * 100}%` }} />
      </div>
      <input ref={input} type="file" accept="application/pdf,image/*" className="hidden" onChange={onFile} />
      <ul className="mt-4 divide-y divide-line">
        {DOC_TYPES.map((d) => {
          const cur = current(d.type);
          const Icon = cur?.status === "verified" ? CheckCircle2 : cur?.status === "rejected" ? XCircle : cur ? Clock : FileUp;
          return (
            <li key={d.type} className="flex flex-wrap items-center gap-3 py-3">
              <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", cur?.status === "verified" ? "bg-emerald-50 text-emerald-600" : cur?.status === "rejected" ? "bg-red-50 text-red-600" : cur ? "bg-amber-50 text-amber-600" : "bg-slate-100 text-body")}><Icon className="h-5 w-5" aria-hidden="true" /></span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-ink">{d.label}{d.type === "other" && <span className="ml-1 text-xs font-normal text-body">(optional)</span>}</p>
                <p className="truncate text-xs text-body">{cur ? `${cur.fileName || "Uploaded"} · ${dateOf(cur.uploadedAt)}` : "Not uploaded yet"}{cur?.status === "rejected" && cur.rejectReason ? ` · ${cur.rejectReason}` : ""}</p>
              </div>
              {cur && <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold ring-1", DOC_TONE[cur.status] || "bg-slate-100 text-slate-700 ring-slate-200")}>{pretty(cur.status)}</span>}
              <button className={cn("btn", cur && cur.status !== "rejected" ? "btn-outline" : "btn-primary")} disabled={!!busy} onClick={() => { pick.current = d.type; input.current?.click(); }}>
                {busy === d.type ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileUp className="h-4 w-4" />} {cur ? "Replace" : "Upload"}
              </button>
            </li>
          );
        })}
      </ul>
      {msg && <p role="status" className={cn("mt-3 rounded-lg px-3 py-2 text-sm font-medium", msg.ok ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700")}>{msg.text}</p>}
    </section>
  );
}
