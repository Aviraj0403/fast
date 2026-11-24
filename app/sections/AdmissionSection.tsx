"use client";

import { useState } from "react";
import { FaUniversity, FaBuilding, FaBookOpen, FaClipboardCheck, FaPenFancy, FaBriefcase } from "react-icons/fa";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { submitLead } from "../../lib/leads";
import { waLink } from "@/lib/site";
import { event } from "@/lib/analytics";

const gridItems = [
  { label: "Colleges", icon: <FaBuilding /> },
  { label: "Universities", icon: <FaUniversity /> },
  { label: "Courses", icon: <FaBookOpen /> },
  { label: "Admission process", icon: <FaClipboardCheck /> },
  { label: "Entrance exams", icon: <FaPenFancy /> },
  { label: "Placements", icon: <FaBriefcase /> },
];

export const AdmissionSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", course: "", company_url: "" });
  const [sent, setSent] = useState(false);
  const set = (k: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => setFormData((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void submitLead({ name: formData.name, phone: formData.phone, email: formData.email, course: formData.course, form: "admission-section", company_url: formData.company_url });
    event("lead_submitted", { form: "admission-section", course: formData.course });
    const message = `📝 *New Enquiry*
👤 *Name:* ${formData.name}
📧 *Email:* ${formData.email}
📱 *Phone:* ${formData.phone}
🎓 *Course:* ${formData.course}
--
Ref: Priority Admission 2026`.trim();
    window.open(waLink(message), "_blank");
    setSent(true);
    setFormData({ name: "", email: "", phone: "", course: "", company_url: "" });
  };

  return (
    <section id="admission" className="section bg-white">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="eyebrow mb-3">Admission guidance</p>
          <h2 className="h-section">Everything about your admission, handled by one team</h2>
          <p className="lead mt-4 max-w-xl">
            From shortlisting colleges to documents and seat confirmation, we guide you through each step of admission to India&apos;s leading universities and professional courses.
          </p>

          <ul className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {gridItems.map((item) => (
              <li key={item.label} className="flex items-center gap-3.5">
                <span className="icon-tile text-lg">{item.icon}</span>
                <div>
                  <p className="font-semibold text-ink">{item.label}</p>
                  <p className="text-sm text-muted">Expert guidance</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="on-dark rounded-3xl bg-brand-950 p-7 shadow-[var(--shadow-lift)] sm:p-10">
          <h3 className="text-2xl font-bold !text-white">Register for counselling</h3>
          <p className="mt-2 text-sm text-slate-300">Share your details and our admissions desk will get back to you within the hour.</p>

          {sent ? (
            <div role="status" className="mt-8 flex gap-3 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-5 text-emerald-100">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <p className="font-semibold">Thank you, we have your details.</p>
                <p className="mt-1 text-sm text-emerald-100/80">WhatsApp is opening so you can chat with us right away.</p>
                <button type="button" onClick={() => setSent(false)} className="mt-3 text-sm font-semibold underline underline-offset-4">Submit another enquiry</button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate={false}>
              <div>
                <label htmlFor="adm-name" className="label">Student name</label>
                <input id="adm-name" required autoComplete="name" className="field" placeholder="Full name" value={formData.name} onChange={set("name")} />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="adm-email" className="label">Email</label>
                  <input id="adm-email" required type="email" autoComplete="email" className="field" placeholder="you@example.com" value={formData.email} onChange={set("email")} />
                </div>
                <div>
                  <label htmlFor="adm-phone" className="label">WhatsApp number</label>
                  <input id="adm-phone" required type="tel" inputMode="tel" autoComplete="tel" pattern="[0-9+\s\-]{10,16}" className="field" placeholder="98765 43210" value={formData.phone} onChange={set("phone")} />
                </div>
              </div>
              <div>
                <label htmlFor="adm-course" className="label">Course you are interested in</label>
                <input id="adm-course" required className="field" placeholder="e.g. Engineering, Medical, Law" value={formData.course} onChange={set("course")} />
              </div>
              <input className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" name="company_url" value={formData.company_url} onChange={set("company_url")} />
              <button type="submit" className="btn btn-primary btn-lg w-full">
                <MessageCircle className="h-5 w-5" /> Start counselling on WhatsApp
              </button>
              <p className="text-center text-xs text-slate-400">Your details are used only to contact you about admissions.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
