"use client";

import { useState } from "react";
import { 
  Bot, 
  Building2, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  HelpCircle, 
  MessageSquare, 
  Send, 
  Sparkles, 
  User 
} from "lucide-react";
import { dateOf } from "@/lib/studentUi";
import type { Overview } from "@/lib/student";

interface EnquiryItem {
  id: string;
  subject: string;
  category: string;
  college?: string;
  status: "open" | "in_review" | "resolved";
  date: string;
  messages: { sender: "student" | "counsellor" | "bot"; text: string; time: string }[];
}

export function EnquiriesDesk({ 
  profile,
  counsellor
}: { 
  profile: Overview["profile"];
  counsellor: Overview["counsellor"];
}) {
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([
    {
      id: "ENQ-9481",
      subject: "Direct Admission Process & Seat Availability for CSE",
      category: "Admissions & Cutoffs",
      college: "MIT World Peace University / DY Patil",
      status: "in_review",
      date: "Today, 11:20 AM",
      messages: [
        {
          sender: "student",
          text: "I want to confirm direct second round seat allocation and scholarship possibility based on 91.8 percentile in JEE.",
          time: "11:20 AM"
        },
        {
          sender: "counsellor",
          text: `Hi ${profile.name.split(" ")[0]}, I have received your enquiry. I am cross-checking current round cutoffs with the admissions dean. Will update here and via WhatsApp.`,
          time: "11:45 AM"
        }
      ]
    },
    {
      id: "ENQ-8192",
      subject: "Hostel Accommodation and Fee Structure",
      category: "Campus & Hostel",
      college: "RV College of Engineering / BMSCE",
      status: "resolved",
      date: "Yesterday",
      messages: [
        {
          sender: "student",
          text: "Is hostel fee included in tuition fee, or paid separately each semester?",
          time: "Yesterday"
        },
        {
          sender: "bot",
          text: "Hostel fees are paid separately per academic year (approx Rs. 1.2L to 1.8L including mess). Our counsellor has sent the detailed fee breakdown to your registered email.",
          time: "Yesterday"
        }
      ]
    }
  ]);

  const [activeEnquiryId, setActiveEnquiryId] = useState<string>("ENQ-9481");
  const [newReply, setNewReply] = useState("");
  const [showNewModal, setShowNewModal] = useState(false);
  const [newSubject, setNewSubject] = useState("");
  const [newCategory, setNewCategory] = useState("Course & College Shortlist");
  const [newDesc, setNewDesc] = useState("");

  const activeEnquiry = enquiries.find(e => e.id === activeEnquiryId) || enquiries[0];

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReply.trim() || !activeEnquiry) return;

    const updated = enquiries.map(item => {
      if (item.id === activeEnquiry.id) {
        return {
          ...item,
          status: "in_review" as const,
          messages: [
            ...item.messages,
            {
              sender: "student" as const,
              text: newReply,
              time: "Just now"
            }
          ]
        };
      }
      return item;
    });

    setEnquiries(updated);
    setNewReply("");
  };

  const handleCreateEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject.trim() || !newDesc.trim()) return;

    const newEnq: EnquiryItem = {
      id: `ENQ-${Math.floor(1000 + Math.random() * 9000)}`,
      subject: newSubject,
      category: newCategory,
      status: "open",
      date: "Just now",
      messages: [
        {
          sender: "student",
          text: newDesc,
          time: "Just now"
        }
      ]
    };

    setEnquiries([newEnq, ...enquiries]);
    setActiveEnquiryId(newEnq.id);
    setShowNewModal(false);
    setNewSubject("");
    setNewDesc("");
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-slate-900">Enquiries & Discussions</h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Track your admission tickets, question threads with your counsellor and FastAdmission AI desk.
          </p>
        </div>
        <button
          onClick={() => setShowNewModal(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-brand-700"
        >
          <MessageSquare className="h-4 w-4" />
          Create New Enquiry
        </button>
      </div>

      {/* Main Two-column Chat / Ticket View */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Enquiries List */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:col-span-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-2 mb-3">
            Your Enquiries ({enquiries.length})
          </h3>
          <div className="space-y-2">
            {enquiries.map(enq => {
              const isSelected = enq.id === activeEnquiry?.id;
              return (
                <button
                  key={enq.id}
                  onClick={() => setActiveEnquiryId(enq.id)}
                  className={`w-full rounded-xl p-3 text-left transition ${
                    isSelected
                      ? "border border-brand-200 bg-brand-50/70 shadow-xs ring-1 ring-brand-500/10"
                      : "border border-slate-100 bg-white hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] font-bold text-slate-500">{enq.id}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        enq.status === "resolved"
                          ? "bg-emerald-50 text-emerald-700"
                          : enq.status === "in_review"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-sky-50 text-sky-700"
                      }`}
                    >
                      {enq.status === "resolved" ? "Resolved" : enq.status === "in_review" ? "In Progress" : "New"}
                    </span>
                  </div>
                  <h4 className="mt-1.5 text-xs font-bold text-slate-900 line-clamp-1">{enq.subject}</h4>
                  <p className="mt-1 text-[11px] text-slate-500 flex items-center gap-1.5">
                    <span>{enq.category}</span>
                    &bull;
                    <span>{enq.date}</span>
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Conversation Thread */}
        <div className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-2 overflow-hidden min-h-[420px]">
          {activeEnquiry ? (
            <>
              {/* Ticket header */}
              <div className="border-b border-slate-100 bg-slate-50/70 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-brand-700">{activeEnquiry.id}</span>
                      <span className="text-slate-300">&bull;</span>
                      <span className="text-xs text-slate-500">{activeEnquiry.category}</span>
                    </div>
                    <h3 className="mt-1 font-display text-base font-bold text-slate-900">{activeEnquiry.subject}</h3>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      activeEnquiry.status === "resolved"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    Status: {activeEnquiry.status === "resolved" ? "Resolved" : "Active Discussion"}
                  </span>
                </div>
              </div>

              {/* Message History */}
              <div className="flex-1 space-y-4 p-5 overflow-y-auto max-h-[380px]">
                {activeEnquiry.messages.map((m, idx) => {
                  const isStudent = m.sender === "student";
                  const isBot = m.sender === "bot";
                  return (
                    <div
                      key={idx}
                      className={`flex gap-3 ${isStudent ? "justify-end" : "justify-start"}`}
                    >
                      {!isStudent && (
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-bold text-white ${
                            isBot ? "bg-indigo-600" : "bg-brand-600"
                          }`}
                        >
                          {isBot ? <Bot className="h-4 w-4" /> : counsellor?.name ? counsellor.name[0] : "C"}
                        </div>
                      )}

                      <div
                        className={`max-w-[78%] rounded-2xl p-3.5 text-xs ${
                          isStudent
                            ? "bg-brand-600 text-white rounded-br-xs"
                            : "bg-slate-100 text-slate-800 rounded-bl-xs"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1 opacity-80 text-[10px]">
                          <span>
                            {isStudent
                              ? "You"
                              : isBot
                              ? "FastAdmission AI Assistant"
                              : counsellor?.name || "Counsellor"}
                          </span>
                          <span>{m.time}</span>
                        </div>
                        <p className="leading-relaxed">{m.text}</p>
                      </div>

                      {isStudent && (
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-xs font-bold text-white">
                          {profile.name ? profile.name[0] : "U"}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Reply Form */}
              <form onSubmit={handleSendReply} className="border-t border-slate-100 bg-slate-50/50 p-3">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    placeholder="Type your reply to your counsellor..."
                    className="flex-1 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-brand-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-brand-700"
                  >
                    <Send className="h-3.5 w-3.5" />
                    Send
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center p-8 text-center text-xs text-slate-400">
              Select an enquiry on the left or create a new one.
            </div>
          )}
        </div>
      </div>

      {/* New Enquiry Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="font-display text-lg font-bold text-slate-900">Create New Admission Enquiry</h3>
            <p className="mt-0.5 text-xs text-slate-500">
              Your message will be directly dispatched to your dedicated admissions counsellor.
            </p>

            <form onSubmit={handleCreateEnquiry} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:border-brand-500 focus:outline-none"
                >
                  <option>Course & College Shortlist</option>
                  <option>Fee Structure & Scholarships</option>
                  <option>Eligibility & Entrance Cutoffs</option>
                  <option>Document Verification</option>
                  <option>Hostel & Campus Facilities</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700">Subject</label>
                <input
                  type="text"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder="e.g. Inquiring about scholarship eligibility for Computer Engineering"
                  required
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700">Description</label>
                <textarea
                  rows={4}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Provide all details so your counsellor can assist you faster..."
                  required
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-brand-600 px-4 py-2 font-semibold text-white hover:bg-brand-700"
                >
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

