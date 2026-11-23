"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { SITE, waLink } from "@/lib/site";

const links = [
  { name: "Home", path: "/" },
  { name: "Courses", path: "/courses" },
  { name: "Blogs", path: "/blogs" },
  { name: "About us", path: "/#about" },
  { name: "Contact", path: "/#contact" },
];

const programmes = ["Engineering (B.Tech)", "Medical (MBBS / BDS)", "Management (MBA / BBA)", "Law (LLB)", "Career assessment", "Admission counselling"];

export const Footer = () => {
  const pathname = usePathname();
  if (pathname.startsWith("/student") && pathname !== "/student/login" && pathname !== "/student/register") {
    return null;
  }

  return (
    <footer className="bg-brand-950 text-slate-300">
    <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
      <div>
        <div className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-white">
            <Image src="/brand-mark.png" alt="" width={40} height={40} className="h-full w-full object-contain p-[3px]" />
          </span>
          <span className="font-display text-xl font-extrabold tracking-tight text-white">
            FAST<span className="text-brand-300">ADMISSION</span>
          </span>
        </div>
        <p className="mt-5 max-w-xs text-sm leading-relaxed text-slate-400">
          Professional career counselling and admission guidance for students and parents, since 2015.
        </p>
      </div>

      <nav aria-label="Footer">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Explore</h3>
        <ul className="mt-5 space-y-3 text-sm">
          {links.map((l) => (
            <li key={l.name}>
              <Link href={l.path} className="text-slate-400 transition-colors hover:text-white">
                {l.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Programmes</h3>
        <ul className="mt-5 space-y-3 text-sm text-slate-400">
          {programmes.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Contact</h3>
        <ul className="mt-5 space-y-4 text-sm">
          <li className="flex gap-3">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" />
            <span className="text-slate-400">{SITE.office}, serving students across India</span>
          </li>
          <li className="flex gap-3">
            <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" />
            <a href={SITE.phoneHref} className="text-slate-400 hover:text-white">{SITE.phone}</a>
          </li>
          <li className="flex gap-3">
            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" />
            <a href={`mailto:${SITE.email}`} className="break-all text-slate-400 hover:text-white">{SITE.email}</a>
          </li>
          <li className="flex gap-3">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" />
            <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white">Find us on Google Maps ({SITE.address.locality})</a>
          </li>
        </ul>
        <a href={waLink("Hi FastAdmission, I need help with admissions")} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-6">
          <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
        </a>
      </div>
    </div>

    <div className="border-t border-white/10">
      <div className="container-x flex flex-col items-center justify-between gap-2 py-6 text-xs text-slate-500 sm:flex-row">
        <p>&copy; {new Date().getFullYear()} FastAdmission. All rights reserved.</p>
        <p>
          <Link href="/privacy" className="hover:text-white">Privacy</Link> · Guidance on admissions; seats are subject to each institution&apos;s own criteria.
        </p>
      </div>
    </div>
  </footer>
  );
};
