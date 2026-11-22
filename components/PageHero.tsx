import type { ReactNode } from "react";

/** The dark banner at the top of every inner page, so the whole site feels like one product. */
export function PageHero({ eyebrow, title, accent, text, children, className = "" }: { eyebrow: string; title: string; accent?: string; text?: string; children?: ReactNode; className?: string }) {
  return (
    <section className={`relative overflow-hidden bg-brand-950 pb-24 pt-[calc(var(--header-h)+2.5rem)] md:pb-28 ${className}`}>
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_85%_0%,rgb(10_150_208/0.32),transparent_60%),radial-gradient(50%_60%_at_0%_100%,rgb(10_122_176/0.2),transparent_60%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:56px_56px]" />
      <div className="container-x relative max-w-6xl">
        <p className="eyebrow eyebrow-dark">{eyebrow}</p>
        <h1 className="mt-2 max-w-3xl text-balance font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
          {title} {accent && <span className="text-brand-300">{accent}</span>}
        </h1>
        {text && <p className="mt-3 max-w-2xl text-lg text-slate-300">{text}</p>}
        {children}
      </div>
    </section>
  );
}
