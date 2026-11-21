"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Phone, Mail, MapPin, MessageCircle, CheckCircle2 } from "lucide-react";
import { submitLead } from "../../lib/leads";
import { SectionHeading } from "@/components/SectionHeading";
import { SITE, waLink } from "@/lib/site";

const formSchema = z.object({
  name: z.string().min(2, { message: "Please enter your full name" }),
  email: z.string().email({ message: "Enter a valid email address" }),
  phone: z.string().regex(/^[+\d][\d\s-]{9,15}$/, { message: "Enter a valid 10-digit mobile number" }),
  courseInterest: z.string().min(1, { message: "Choose a course" }),
  location: z.string().min(2, { message: "Enter your city or state" }),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const team = [
  { name: "Rajnish Singh", title: "Founder & Chief Advisor", phone: "+91 85818 41853", desc: "Your primary contact for 2026 admissions to Engineering, Medical and other leading institutions." },
  { name: "Rahul Singh", title: "Operations Director", phone: "+91 62020 00340", desc: "Looks after day-to-day operations and university coordination for every registered student." },
];

const initials = (n: string) => n.split(" ").map((p) => p[0]).join("").slice(0, 2);

const Err = ({ msg, id }: { msg?: string; id: string }) => (msg ? <p id={id} role="alert" className="field-error">{msg}</p> : null);

const MergedContactSection = () => {
  const [toast, setToast] = useState<string | null>(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({ resolver: zodResolver(formSchema) });

  const onSubmit = (data: FormValues) => {
    // save the lead in the platform (fire and forget) while WhatsApp opens
    void submitLead({ name: data.name, phone: data.phone, email: data.email, city: data.location, course: data.courseInterest, message: data.message, form: "contact-section" });
    const message = `📝 *New Enquiry*
👤 *Name:* ${data.name}
📧 *Email:* ${data.email}
📱 *Phone:* ${data.phone}
🎓 *Course:* ${data.courseInterest}
📍 *Location:* ${data.location}
💬 *Message:* ${data.message || "No message"}
--
Ref: Web Apply 2026`.trim();
    window.open(waLink(message), "_blank");
    setToast("Thank you. Opening WhatsApp so we can continue the conversation.");
    reset();
  };

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 5000);
    return () => clearTimeout(t);
  }, [toast]);

  return (
    <section className="section bg-white" id="contact">
      <div className="container-x">
        <SectionHeading eyebrow="Contact" title="Talk to our admissions desk" description="Tell us about your goals and we will reply within the hour with the next steps." />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="card p-6 sm:p-9">
            <h3 className="text-xl font-bold">Request a call back</h3>
            <p className="mt-1 text-sm text-muted">Takes a minute. No spam, no obligation.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-7 space-y-5" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="c-name" className="label">Full name</label>
                  <input id="c-name" {...register("name")} autoComplete="name" aria-invalid={!!errors.name} className="field" placeholder="Your name" />
                  <Err id="c-name-e" msg={errors.name?.message} />
                </div>
                <div>
                  <label htmlFor="c-email" className="label">Email</label>
                  <input id="c-email" type="email" {...register("email")} autoComplete="email" aria-invalid={!!errors.email} className="field" placeholder="you@example.com" />
                  <Err id="c-email-e" msg={errors.email?.message} />
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="c-phone" className="label">Mobile (WhatsApp)</label>
                  <input id="c-phone" type="tel" inputMode="tel" {...register("phone")} autoComplete="tel" aria-invalid={!!errors.phone} className="field" placeholder="98765 43210" />
                  <Err id="c-phone-e" msg={errors.phone?.message} />
                </div>
                <div>
                  <label htmlFor="c-course" className="label">Course</label>
                  <select id="c-course" {...register("courseInterest")} aria-invalid={!!errors.courseInterest} className="field">
                    <option value="">Choose a course</option>
                    <option value="engineering">B.Tech / Engineering</option>
                    <option value="medical">MBBS / Medical</option>
                    <option value="management">MBA / Management</option>
                    <option value="cse-ai-ml">CSE (AI-ML focus)</option>
                    <option value="law">Law</option>
                  </select>
                  <Err id="c-course-e" msg={errors.courseInterest?.message} />
                </div>
              </div>
              <div>
                <label htmlFor="c-loc" className="label">City / state</label>
                <input id="c-loc" {...register("location")} aria-invalid={!!errors.location} className="field" placeholder="e.g. Patna, Bihar" />
                <Err id="c-loc-e" msg={errors.location?.message} />
              </div>
              <div>
                <label htmlFor="c-msg" className="label">Message <span className="font-normal text-muted">(optional)</span></label>
                <textarea id="c-msg" rows={3} {...register("message")} className="field resize-y" placeholder="Marks, preferred colleges, questions..." />
              </div>
              <button type="submit" className="btn btn-primary btn-lg w-full">
                <MessageCircle className="h-5 w-5" /> Continue on WhatsApp
              </button>
            </form>
          </div>

          <div className="flex flex-col gap-5">
            <div className="card p-6">
              <div className="flex items-start gap-4">
                <span className="icon-tile"><Phone className="h-5 w-5" /></span>
                <div>
                  <p className="font-semibold text-ink">Call us</p>
                  <a href={SITE.phoneHref} className="text-brand-700 hover:underline">{SITE.phone}</a>
                  <p className="text-sm text-muted">Rajnish Singh, admissions desk</p>
                </div>
              </div>
            </div>
            <div className="card p-6">
              <div className="flex items-start gap-4">
                <span className="icon-tile"><Mail className="h-5 w-5" /></span>
                <div className="min-w-0">
                  <p className="font-semibold text-ink">Email</p>
                  <a href={`mailto:${SITE.email}`} className="break-all text-brand-700 hover:underline">{SITE.email}</a>
                  <p className="text-sm text-muted">We reply within one working day</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-brand-950 p-6 text-slate-200">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-brand-300"><MapPin className="h-5 w-5" /></span>
                <div>
                  <p className="font-semibold text-white">Our presence</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-300">Head Office in Patna, serving students across Bihar and India with institutional tie-ups.</p>
                  <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-sm">
                    {["Patna HQ", "Delhi desk", "Bangalore desk"].map((p) => (
                      <li key={p} className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-brand-300" /> {p}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {team.map((m) => (
            <div key={m.name} className="card flex items-start gap-5 p-6">
              <span aria-hidden className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-600 font-display text-lg font-bold text-white">{initials(m.name)}</span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">{m.title}</p>
                <h3 className="mt-0.5 text-lg font-bold">{m.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{m.desc}</p>
                <a href={`tel:${m.phone.replace(/\s+/g, "")}`} className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:underline"><Phone className="h-4 w-4" /> {m.phone}</a>
              </div>
            </div>
          ))}
        </div>

        {toast && (
          <div role="status" className="fixed bottom-6 left-1/2 z-[100] flex max-w-[calc(100vw-2rem)] -translate-x-1/2 items-center gap-3 rounded-xl bg-ink px-5 py-3.5 text-sm font-medium text-white shadow-2xl">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" /> {toast}
          </div>
        )}
      </div>
    </section>
  );
};

export default MergedContactSection;
