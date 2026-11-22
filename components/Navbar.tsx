"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { waLink } from "@/lib/site";
import { getToken } from "@/lib/student";

const allNavItems: { name: string; path: string; section?: keyof NavSections }[] = [
  { name: "Home", path: "/" },
  { name: "Courses", path: "/courses", section: "courses" },
  { name: "Colleges", path: "/colleges", section: "colleges" },
  { name: "Rank predictor", path: "/college-predictor", section: "colleges" },
  { name: "Blogs", path: "/blogs", section: "blogs" },
  { name: "About", path: "/#about" },
  { name: "Contact", path: "/#contact" },
  { name: "Student login", path: "/student/login", section: "studentLogin" },
];

export type NavSections = { colleges: boolean; courses: boolean; blogs: boolean; studentLogin: boolean };

/** sections = what the owner switched on in the admin; a link to a switched-off section is not shown. */
export const Navbar = ({ sections }: { sections?: NavSections }) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [signedIn, setSignedIn] = useState(false);
  useEffect(() => setSignedIn(!!getToken()), [pathname]);
  // a signed-in student sees a link to their dashboard instead of "Student login"
  const navItems = allNavItems
    .filter((i) => !i.section || sections?.[i.section] !== false)
    .map((i) => (i.path === "/student/login" && signedIn ? { ...i, name: "My dashboard", path: "/student" } : i));
  const [scrolled, setScrolled] = useState(false);
  const overHero = pathname === "/" && !scrolled && !open; // transparent over the dark hero, solid everywhere else

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (path: string) => (path === "/" ? pathname === "/" : !path.includes("#") && pathname.startsWith(path));

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300",
        overHero ? "border-b border-transparent bg-transparent" : "border-b border-line bg-white/95 shadow-[0_1px_0_rgb(11_27_46/0.03)] backdrop-blur-md",
      )}
    >
      <div className="container-x flex h-[var(--header-h)] items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5" aria-label="FastAdmission home" onClick={() => setOpen(false)}>
          <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/[0.06]">
            <Image src="/brand-mark.png" alt="" width={40} height={40} className="h-full w-full object-contain p-[3px]" priority />
          </span>
          <span className={cn("font-display text-[1.35rem] font-extrabold tracking-tight", overHero ? "text-white" : "text-ink")}>
            FAST<span className={overHero ? "text-brand-300" : "text-brand-500"}>ADMISSION</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {navItems.map(({ name, path }) => (
            <Link
              key={name}
              href={path}
              aria-current={isActive(path) ? "page" : undefined}
              className={cn(
                "whitespace-nowrap rounded-lg px-3 py-2 text-[0.9375rem] font-medium transition-colors",
                overHero ? "text-white/80 hover:bg-white/10 hover:text-white" : "text-body hover:bg-brand-50 hover:text-brand-700",
                isActive(path) && (overHero ? "text-white" : "bg-brand-50 text-brand-700"),
              )}
            >
              {name}
            </Link>
          ))}
          <a
            href={waLink("I want to enquire about admissions - General Query")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary ml-3"
          >
            <MessageCircle className="h-4 w-4" /> Free counselling
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className={cn("rounded-lg p-2 lg:hidden", overHero ? "text-white hover:bg-white/10" : "text-ink hover:bg-brand-50")}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="max-h-[calc(100dvh-var(--header-h))] overflow-y-auto overscroll-contain border-t border-line bg-white lg:hidden">
          <nav aria-label="Mobile" className="container-x flex flex-col gap-1 py-4">
            {navItems.map(({ name, path }) => (
              <Link
                key={name}
                href={path}
                onClick={() => setOpen(false)}
                aria-current={isActive(path) ? "page" : undefined}
                className={cn("rounded-lg px-3 py-3 text-base font-medium text-ink hover:bg-brand-50", isActive(path) && "bg-brand-50 text-brand-700")}
              >
                {name}
              </Link>
            ))}
            <a
              href={waLink("I want to enquire about admissions")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="btn btn-primary btn-lg mt-2"
            >
              <MessageCircle className="h-5 w-5" /> Free counselling on WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
