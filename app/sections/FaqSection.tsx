import { ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { JsonLd } from "@/components/JsonLd";
import { faqJsonLd, type Faq } from "../data/faqs";

/** Plain <details> accordion: works without JavaScript and is indexable. */
export function FaqSection({ items, title = "Questions students and parents ask", city }: { items: Faq[]; title?: string; city?: string }) {
  return (
    <section className="section bg-white" id="faq">
      <JsonLd data={faqJsonLd(items)} />
      <div className="container-x">
        <SectionHeading eyebrow="FAQ" title={title} description={city ? `Straight answers about admissions${city ? ` for students in ${city}` : ""}.` : "Straight answers, no sales talk."} />
        <div className="mx-auto mt-12 max-w-3xl divide-y divide-line rounded-2xl border border-line bg-white">
          {items.map((f) => (
            <details key={f.q} className="group px-5 py-4 sm:px-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-semibold text-ink [&::-webkit-details-marker]:hidden">
                {f.q}
                <ChevronDown className="h-5 w-5 shrink-0 text-muted transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 leading-relaxed text-body">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
