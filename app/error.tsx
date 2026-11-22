"use client";

import Link from "next/link";

/** Shown when a page fails while loading. The visitor can retry or go home; nothing technical is shown. */
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="container-x flex min-h-[70vh] flex-col items-center justify-center pt-24 text-center">
      <h1 className="font-display text-3xl font-extrabold text-ink">Something went wrong</h1>
      <p className="mt-2 max-w-md text-body">This page could not load. Please try again. If it keeps happening, chat with us on WhatsApp.</p>
      <div className="mt-6 flex gap-3"><button onClick={reset} className="btn btn-primary">Try again</button><Link href="/" className="btn btn-outline">Go home</Link></div>
    </main>
  );
}
