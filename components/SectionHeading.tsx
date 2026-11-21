import { cn } from "@/lib/utils";

/** The one heading block every section uses: small label, title, optional intro. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div className={cn("max-w-3xl", align === "center" ? "mx-auto text-center" : "", className)}>
      {eyebrow && <p className={cn("eyebrow mb-3", dark && "eyebrow-dark")}>{eyebrow}</p>}
      <h2 className={cn("h-section", dark && "!text-white")}>{title}</h2>
      {description && <p className={cn("lead mt-4", dark && "!text-slate-300")}>{description}</p>}
    </div>
  );
}
