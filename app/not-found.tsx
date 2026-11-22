import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container-x flex min-h-[70vh] flex-col items-center justify-center pt-24 text-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-1 font-display text-3xl font-extrabold text-ink sm:text-4xl">We could not find that page</h1>
      <p className="mt-2 max-w-md text-body">The link may be old. Try the colleges list, the rank predictor, or register for free counselling.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3"><Link href="/colleges" className="btn btn-primary">Browse colleges</Link><Link href="/college-predictor" className="btn btn-outline">Rank predictor</Link><Link href="/" className="btn btn-outline">Home</Link></div>
    </main>
  );
}
