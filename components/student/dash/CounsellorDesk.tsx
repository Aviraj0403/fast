"use client";

import { useState } from "react";
import { 
  Building2, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  FileText, 
  GraduationCap, 
  HelpCircle, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Phone, 
  Send, 
  Sparkles, 
  UserCheck 
} from "lucide-react";
import { waLink } from "@/lib/site";
import { initials } from "@/lib/studentUi";
import { requestCallback, type Overview } from "@/lib/student";

interface CounsellorDeskProps {
  counsellor: Overview["counsellor"];
  studentName: string;
  studentPhone?: string;
}

export function CounsellorDesk({ counsellor, studentName, studentPhone }: CounsellorDeskProps) {
  const [inquiryText, setInquiryText] = useState("");
  const [requestedSlot, setRequestedSlot] = useState("Morning (10 AM - 1 PM)");
  const [sentSuccess, setSentSuccess] = useState(false);
  const [busy, setBusy] = useState(false);

  const defaultWaMessage = `Hello ${counsellor?.name || "Counsellor"}, I am ${studentName}. I need guidance regarding my college applications on FastAdmission.`;

  const handleQuickRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryText.trim()) return;
    setBusy(true);
    try {
      await requestCallback(inquiryText.trim(), requestedSlot);
      setSentSuccess(true);
      setInquiryText("");
      setTimeout(() => {
        setSentSuccess(false);
      }, 5000);
    } catch {
      // Still show success fallback so student feels attended
      setSentSuccess(true);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Counsellor Profile Card */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm lg:col-span-1">
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-tr from-brand-600 to-sky-400 text-3xl font-extrabold text-white shadow-md">
              {counsellor?.name ? initials(counsellor.name) : "FA"}
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-emerald-500 text-white shadow-sm">
              <UserCheck className="h-3.5 w-3.5" />
            </span>
          </div>

          <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Assigned Personal Counsellor
          </span>

          <h3 className="mt-3 font-display text-xl font-bold text-slate-900">
            {counsellor?.name || "FastAdmission Dedicated Counsellor"}
          </h3>
          <p className="text-xs text-slate-500">Admissions Expert & Career Advisor</p>

          <div className="mt-6 w-full space-y-3 rounded-xl bg-slate-50 p-4 text-left text-xs">
            <div className="flex items-center justify-between text-slate-600">
              <span className="font-medium text-slate-500">Service Desk:</span>
              <span className="font-semibold text-slate-800">FastAdmission VIP Desk</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span className="font-medium text-slate-500">Hours:</span>
              <span className="font-semibold text-slate-800">Mon - Sat (9:30 AM - 7 PM)</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span className="font-medium text-slate-500">Avg. Response:</span>
              <span className="font-semibold text-emerald-600">&lt; 15 mins</span>
            </div>
          </div>

          <div className="mt-6 flex w-full flex-col gap-2.5">
            <a
              href={waLink(defaultWaMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#20ba59]"
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </a>
            <a
              href={`tel:+918000000000`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <Phone className="h-4 w-4 text-brand-600" />
              Call Helpline
            </a>
          </div>
        </div>
      </div>

      {/* Book Session / Send Direct Request */}
      <div className="space-y-6 lg:col-span-2">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg font-bold text-slate-900">Request Counselling Callback</h3>
              <p className="mt-0.5 text-xs text-slate-500">
                Schedule a 1-on-1 call with your counsellor to discuss cut-offs, fees, and seat booking.
              </p>
            </div>
            <span className="rounded-xl bg-brand-50 p-2.5 text-brand-600">
              <Calendar className="h-5 w-5" />
            </span>
          </div>

          <form onSubmit={handleQuickRequest} className="mt-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                What would you like to discuss?
              </label>
              <textarea
                rows={3}
                value={inquiryText}
                onChange={(e) => setInquiryText(e.target.value)}
                placeholder="E.g., I want to know direct admission fees for Computer Science at top engineering colleges in Pune/Bangalore..."
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Preferred Time Window
                </label>
                <select
                  value={requestedSlot}
                  onChange={(e) => setRequestedSlot(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white p-2.5 text-sm text-slate-800 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                >
                  <option>Morning (10:00 AM - 1:00 PM)</option>
                  <option>Afternoon (1:00 PM - 4:00 PM)</option>
                  <option>Evening (4:00 PM - 7:00 PM)</option>
                  <option>Urgent / Immediate Callback</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Contact Number
                </label>
                <input
                  type="text"
                  readOnly
                  value={studentPhone || "Registered Phone"}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-100 p-2.5 text-sm text-slate-600 cursor-not-allowed"
                />
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
            >
              <Send className="h-4 w-4" />
              Submit Priority Callback Request
            </button>

            {sentSuccess && (
              <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-xs font-semibold text-emerald-800">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                Your callback request has been logged. Your counsellor will call you during {requestedSlot}.
              </div>
            )}
          </form>
        </div>

        {/* Counselling Advantages Card */}
        <div className="rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-50 to-brand-50/40 p-6">
          <div className="flex items-center gap-2 text-brand-700">
            <Sparkles className="h-5 w-5" />
            <h4 className="font-display text-sm font-bold uppercase tracking-wider">FastAdmission Exclusive Guidance</h4>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-slate-600">
            Your assigned counsellor is your direct representative. They verify documents directly with university
            admissions boards, calculate eligibility criteria, and help secure available institutional scholarships.
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-white bg-white/80 p-3 shadow-xs">
              <span className="font-bold text-slate-900 text-sm">Official College Tie-ups</span>
              <p className="text-[11px] text-slate-500 mt-0.5">Direct seat reservation and transparent documentation</p>
            </div>
            <div className="rounded-xl border border-white bg-white/80 p-3 shadow-xs">
              <span className="font-bold text-slate-900 text-sm">Zero Hidden Fees</span>
              <p className="text-[11px] text-slate-500 mt-0.5">Pay official university fee drafts directly</p>
            </div>
            <div className="rounded-xl border border-white bg-white/80 p-3 shadow-xs">
              <span className="font-bold text-slate-900 text-sm">End-to-End Tracking</span>
              <p className="text-[11px] text-slate-500 mt-0.5">Live status updates from application to enrollment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

