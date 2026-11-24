"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bell,
  ChevronRight,
  CreditCard,
  FileText,
  GraduationCap,
  HelpCircle,
  KeyRound,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageCircle,
  MessageSquare,
  Phone,
  Share2,
  ShieldCheck,
  Sparkles,
  User,
  Users,
  X,
  Loader2
} from "lucide-react";
import { ApplicationTracker } from "@/components/student/dash/ApplicationTracker";
import { DocumentsPanel } from "@/components/student/dash/DocumentsPanel";
import { FeesPanel } from "@/components/student/dash/FeesPanel";
import { NextSteps } from "@/components/student/dash/NextSteps";
import { PasswordPanel } from "@/components/student/dash/PasswordPanel";
import { ReferralPanel } from "@/components/student/dash/ReferralPanel";
import { Stats } from "@/components/student/dash/Stats";
import { ProfilePanel } from "@/components/student/dash/ProfilePanel";
import { CounsellorDesk } from "@/components/student/dash/CounsellorDesk";
import { EnquiriesDesk } from "@/components/student/dash/EnquiriesDesk";
import { ApiError, overview, setToken, type Overview } from "@/lib/student";
import { initials } from "@/lib/studentUi";
import { SITE, waLink } from "@/lib/site";

type TabKey = 
  | "overview" 
  | "applications" 
  | "documents" 
  | "profile" 
  | "counsellor" 
  | "enquiries" 
  | "payments" 
  | "referral" 
  | "security";

export default function StudentAppDashboard() {
  const router = useRouter();
  const [data, setData] = useState<Overview | null>(null);
  const [err, setErr] = useState("");
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const load = useCallback(async () => {
    try {
      setData(await overview());
    } catch (e) {
      if (e instanceof ApiError && (e.status === 401 || e.status === 403)) {
        setToken(null);
        router.replace("/student/login");
        return;
      }
      setErr(e instanceof Error ? e.message : "Could not load your details.");
    }
  }, [router]);

  useEffect(() => {
    void load();
  }, [load]);

  const logout = () => {
    setToken(null);
    router.replace("/student/login");
  };

  if (err) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="max-w-md rounded-2xl border border-red-200 bg-white p-6 shadow-sm text-center">
          <p className="text-sm font-medium text-red-600">{err}</p>
          <div className="mt-4 flex justify-center gap-3">
            <button
              className="rounded-xl bg-brand-600 px-4 py-2 text-xs font-semibold text-white hover:bg-brand-700"
              onClick={() => { setErr(""); void load(); }}
            >
              Try Again
            </button>
            <button
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              onClick={logout}
            >
              Sign In
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
          <p className="text-xs font-medium text-slate-500">Loading student workspace...</p>
        </div>
      </main>
    );
  }

  const studentName = data.profile.name || "Student";
  const firstName = studentName.split(" ")[0];
  const verifiedDocs = data.documents.filter((d) => !d.superseded && d.status === "verified").length;
  const totalRequiredDocs = 4;
  const pendingDue = (data.feeLinks ?? []).filter((f) => ["created", "partially_paid"].includes(f.status)).reduce((a, f) => a + f.amountPaise, 0);

  const NAV_ITEMS = [
    { key: "overview" as TabKey, label: "Overview", icon: LayoutDashboard, badge: null },
    { key: "applications" as TabKey, label: "Applications", icon: GraduationCap, badge: data.applications.length ? String(data.applications.length) : null },
    { key: "documents" as TabKey, label: "My Documents", icon: FileText, badge: `${verifiedDocs}/${totalRequiredDocs}` },
    { key: "profile" as TabKey, label: "Student Profile", icon: User, badge: null },
    { key: "enquiries" as TabKey, label: "Enquiries & Desk", icon: MessageSquare, badge: "2" },
    { key: "counsellor" as TabKey, label: "My Counsellor", icon: Users, badge: data.counsellor ? "Assigned" : "Pending" },
    { key: "payments" as TabKey, label: "Fees & Invoices", icon: CreditCard, badge: pendingDue ? "Due" : null },
    { key: "referral" as TabKey, label: "Refer & Earn", icon: Share2, badge: "New" },
    { key: "security" as TabKey, label: "Security & Access", icon: KeyRound, badge: null },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col antialiased">
      {/* Top Navbar Header */}
      <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 backdrop-blur-md sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-2xs hover:bg-slate-50 lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-600 to-sky-500 font-black text-white shadow-xs">
              FA
            </span>
            <span className="font-display text-lg font-bold tracking-tight text-slate-900">
              FastAdmission <span className="text-xs font-medium text-brand-600 uppercase tracking-widest ml-0.5">Portal</span>
            </span>
          </Link>

          <div className="hidden sm:flex items-center gap-2 border-l border-slate-200 pl-4 ml-2 text-xs text-slate-500">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
            <span>Admissions Session 2026-27</span>
          </div>
        </div>

        {/* Right side icons & user snapshot */}
        <div className="flex items-center gap-3">
          {data.counsellor && (
            <a
              href={waLink(`Hi ${data.counsellor.name}, I am ${studentName}. I need admission guidance.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50/70 px-3 py-1.5 text-xs font-semibold text-emerald-800 transition hover:bg-emerald-100"
            >
              <MessageCircle className="h-4 w-4 text-emerald-600" />
              <span>Counsellor: {data.counsellor.name.split(" ")[0]}</span>
            </a>
          )}

          <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 font-bold text-white shadow-2xs text-xs">
              {initials(studentName)}
            </div>
            <div className="hidden text-left xl:block">
              <p className="text-xs font-bold leading-tight text-slate-800">{studentName}</p>
              <p className="text-[10px] text-slate-400">FA-2026-{data.profile.phone?.slice(-4) || "8821"}</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:bg-red-50 hover:text-red-600 transition"
            title="Log Out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Main Container with Sidebar + Content */}
      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex w-64 flex-col border-r border-slate-200/80 bg-white p-4 justify-between">
          <div className="space-y-6">
            {/* Student ID Card snippet */}
            <div className="rounded-2xl border border-slate-100 bg-gradient-to-b from-slate-50 to-white p-4 shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-600 to-sky-500 font-bold text-white text-base shadow-xs">
                  {initials(studentName)}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="truncate text-xs font-bold text-slate-900">{studentName}</h4>
                  <p className="font-mono text-[11px] text-brand-600">ID: FA-2026-{data.profile.phone?.slice(-4) || "8821"}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5 text-[11px]">
                <span className="text-slate-500">Batch:</span>
                <span className="font-semibold text-slate-800">2026 - 2027</span>
              </div>
              <div className="mt-1 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">KYC Status:</span>
                <span className="font-semibold text-emerald-600 flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3" /> Verified
                </span>
              </div>
            </div>

            {/* Nav list */}
            <nav className="space-y-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activeTab === item.key;
                const Icon = item.icon;
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setActiveTab(item.key)}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold transition ${
                      isActive
                        ? "bg-brand-600 text-white shadow-xs"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                      {item.label}
                    </span>
                    {item.badge && (
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Counsellor Quick Help Card */}
          <div className="rounded-2xl border border-brand-100 bg-brand-50/50 p-3.5 text-xs">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-600 text-white font-bold text-[10px]">
                {data.counsellor?.name ? initials(data.counsellor.name) : "FA"}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] uppercase font-bold text-brand-800 tracking-wider">FastAdmission Desk</p>
                <p className="truncate font-semibold text-slate-800">{data.counsellor?.name || "Assigned Counsellor"}</p>
              </div>
            </div>
            <a
              href={waLink(`Hi, I am ${studentName}. I need guidance with admission.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-xl bg-brand-600 px-3 py-2 text-[11px] font-bold text-white shadow-2xs hover:bg-brand-700"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              Direct WhatsApp
            </a>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs animate-in fade-in"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="relative flex w-[82vw] max-w-xs flex-col justify-between bg-white p-5 shadow-2xl animate-in slide-in-from-left duration-200">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-600 to-sky-500 font-bold text-white text-xs">
                      FA
                    </span>
                    <span className="font-display font-bold text-slate-900 text-sm">FastAdmission</span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                  <p className="text-xs font-bold text-slate-900">{studentName}</p>
                  <p className="text-[11px] text-slate-500 font-mono">ID: FA-2026-{data.profile.phone?.slice(-4) || "8821"}</p>
                  <div className="mt-1 flex items-center justify-between text-[10px]">
                    <span className="font-semibold text-brand-700">Batch 2026-2027</span>
                    <span className="font-semibold text-emerald-600">KYC Verified</span>
                  </div>
                </div>

                <nav className="space-y-1 overflow-y-auto max-h-[55vh] pr-1">
                  {NAV_ITEMS.map((item) => {
                    const isActive = activeTab === item.key;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.key}
                        onClick={() => {
                          setActiveTab(item.key);
                          setMobileMenuOpen(false);
                        }}
                        className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold transition ${
                          isActive
                            ? "bg-brand-600 text-white shadow-xs"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                          {item.label}
                        </span>
                        {item.badge && (
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                              isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>

              <button
                onClick={logout}
                className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-red-200 py-2.5 text-xs font-semibold text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" /> Log out
              </button>
            </div>
          </div>
        )}

        {/* Dynamic Main Workspace Content */}
        <main className="flex-1 w-full min-w-0 p-3 sm:p-6 lg:p-8 max-w-7xl">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Welcome Banner */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-950 via-slate-900 to-brand-900 p-6 text-white shadow-md sm:p-8">
                <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-500/20 blur-3xl" />
                <div className="relative flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-300">
                      <span>Admission Session 2026-2027</span>
                      &bull;
                      <span>Batch: Engineering & Professional Admissions</span>
                    </div>
                    <h1 className="mt-1 font-display text-2xl font-extrabold sm:text-3xl text-white">
                      Welcome back, {firstName}!
                    </h1>
                    <p className="mt-1 text-xs text-slate-300">
                      Track your seat reservation, application milestones, and verified documents in real-time.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    <button
                      onClick={() => setActiveTab("applications")}
                      className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-slate-900 shadow-sm transition hover:bg-slate-100"
                    >
                      <GraduationCap className="h-4 w-4 text-brand-600" />
                      View Applications
                    </button>
                    {data.counsellor && (
                      <a
                        href={waLink(`Hi ${data.counsellor.name}, I am ${studentName}. I need quick assistance.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-brand-500"
                      >
                        <MessageCircle className="h-4 w-4" />
                        Call Counsellor
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Quick Stat Cards */}
              <Stats data={data} />

              {/* Next Action Items */}
              <NextSteps data={data} />

              {/* Two Column Layout: Applications & Documents Summary */}
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-6">
                  <ApplicationTracker apps={data.applications} />
                  <FeesPanel links={data.feeLinks ?? []} />
                </div>
                <div className="space-y-6">
                  <DocumentsPanel docs={data.documents} onChanged={load} />
                  {data.referral?.referralCode && (
                    <ReferralPanel code={data.referral.referralCode} />
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Applications Tab */}
          {activeTab === "applications" && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <h2 className="font-display text-xl font-bold text-slate-900">College Applications & Admission Status</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Real-time progression through Shortlisted &rarr; Documents Submitted &rarr; Application Filed &rarr; Offer Made &rarr; Seat Admitted.
                </p>
              </div>
              <ApplicationTracker apps={data.applications} />
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === "documents" && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <h2 className="font-display text-xl font-bold text-slate-900">Document Vault & Verification</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Upload your 10th/12th marksheets, Aadhaar, and entrance scorecards. FastAdmission verification officers review each file within 24 hours.
                </p>
              </div>
              <DocumentsPanel docs={data.documents} onChanged={load} />
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <h2 className="font-display text-xl font-bold text-slate-900">Student Identity & Academic Credentials</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Personal records, contact info, school passing scores, and preferences used to shortlist colleges.
                </p>
              </div>
              <ProfilePanel
                profile={data.profile}
                batchYear="2026-2027"
                registrationId={`FA-2026-${data.profile.phone?.slice(-4) || "8821"}`}
              />
            </div>
          )}

          {/* Counsellor Desk Tab */}
          {activeTab === "counsellor" && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <h2 className="font-display text-xl font-bold text-slate-900">Personal Counsellor Desk</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Dedicated admission representative assigned to your application file. Book a priority 1-on-1 call or message directly.
                </p>
              </div>
              <CounsellorDesk
                counsellor={data.counsellor}
                studentName={studentName}
                studentPhone={data.profile.phone}
              />
            </div>
          )}

          {/* Enquiries & Discussions Desk */}
          {activeTab === "enquiries" && (
            <EnquiriesDesk
              profile={data.profile}
              counsellor={data.counsellor}
            />
          )}

          {/* Fees & Payments Tab */}
          {activeTab === "payments" && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <h2 className="font-display text-xl font-bold text-slate-900">Fees, Seat Booking & Invoices</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Official Razorpay payment links for seat registration and token confirmation.
                </p>
              </div>
              <FeesPanel links={data.feeLinks ?? []} />
              {!data.feeLinks?.length && (
                <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
                  <CreditCard className="mx-auto h-10 w-10 text-slate-400" />
                  <h3 className="mt-3 font-display text-base font-bold text-slate-800">No Payments Pending</h3>
                  <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
                    When your seat is confirmed or university form fees are due, your counsellor will issue a secure payment link here.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Referral Tab */}
          {activeTab === "referral" && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <h2 className="font-display text-xl font-bold text-slate-900">Refer a Friend & Earn Benefits</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Share your referral link with classmates looking for admissions. When they register, both of you unlock priority counselling.
                </p>
              </div>
              {data.referral?.referralCode ? (
                <ReferralPanel code={data.referral.referralCode} />
              ) : (
                <ReferralPanel code={`REF-${data.profile.phone?.slice(-4) || "2026"}`} />
              )}
            </div>
          )}

          {/* Security & Password Tab */}
          {activeTab === "security" && (
            <div className="space-y-6 max-w-xl">
              <div className="border-b border-slate-200 pb-4">
                <h2 className="font-display text-xl font-bold text-slate-900">Security & Password</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Update your account password and protect your admission profile.
                </p>
              </div>
              <PasswordPanel />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
