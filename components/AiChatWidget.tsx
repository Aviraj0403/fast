"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bot,
  X,
  Send,
  Sparkles,
  ChevronDown,
  GraduationCap,
  ShieldCheck,
  RotateCcw,
  MessageSquare,
} from "lucide-react";
import { PLATFORM } from "@/lib/site";

interface Message {
  role: "assistant" | "user";
  text: string;
  time?: string;
}

const QUICK_PROMPTS = [
  "Top B.Tech Colleges & Fees",
  "Admission Process 2026",
  "Engineering Eligibility Criteria",
  "Book Free Counselling Call",
];

const getCurrentTime = () => {
  const d = new Date();
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export function AiChatWidget() {
  const [open, setOpen] = useState(false);
  const [config, setConfig] = useState<{ name: string; greeting: string; consentText: string } | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [visitorToken, setVisitorToken] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slug = PLATFORM.tenantSlug || "fastadmission";
    const api = PLATFORM.apiUrl || "https://apicounsellor.jdinfotechsolutions.in";
    const stored = typeof window !== "undefined" ? localStorage.getItem("fa_bot_token") : null;
    if (stored) setVisitorToken(stored);

    fetch(`${api}/public/${encodeURIComponent(slug)}/bot/config`)
      .then((res) => (res.ok ? res.json() : null))
      .then((cfg) => {
        if (cfg && cfg.greeting) {
          setConfig(cfg);
          setMessages([{ role: "assistant", text: cfg.greeting, time: getCurrentTime() }]);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open, loading]);

  if (!config) return null;

  const sendMessage = async (textToSend: string) => {
    const text = textToSend.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", text, time: getCurrentTime() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const slug = PLATFORM.tenantSlug || "fastadmission";
    const api = PLATFORM.apiUrl || "https://apicounsellor.jdinfotechsolutions.in";

    try {
      const res = await fetch(`${api}/public/${encodeURIComponent(slug)}/bot/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          visitorToken: visitorToken || undefined,
          consent: true,
        }),
      });

      if (!res.ok) throw new Error("Failed to send message");
      const data = await res.json();

      if (data.visitorToken) {
        setVisitorToken(data.visitorToken);
        localStorage.setItem("fa_bot_token", data.visitorToken);
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: data.reply || "Thank you for reaching out. A FastAdmission senior counsellor will contact you shortly.",
          time: getCurrentTime(),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Our admissions counsellor will assist you directly. Please share your preferred course and phone number.",
          time: getCurrentTime(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    sendMessage(input);
  };

  const resetChat = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("fa_bot_token");
    }
    setVisitorToken(null);
    setMessages([
      {
        role: "assistant",
        text: config.greeting || "Hi! How can FastAdmission help you with your college admissions today?",
        time: getCurrentTime(),
      },
    ]);
  };

  return (
    <>
      {/* Backdrop for mobile */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs transition-opacity md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Floating Widget Container:
          Positioned on the center-left side to prevent bottom overlapping with footer/dock/mobile actions */}
      <div className="fixed z-50 left-4 top-1/2 -translate-y-1/2">
        {/* Chat Dialog */}
        {open && (
          <div className="fixed inset-x-2 bottom-2 top-auto z-50 flex flex-col h-[520px] max-h-[88vh] rounded-3xl border border-slate-200/90 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-950 overflow-hidden animate-in fade-in slide-in-from-left-5 md:absolute md:left-0 md:top-full md:mt-2 md:w-[390px] md:h-[520px] md:max-h-[80vh]">
            {/* Header */}
            <div className="relative bg-gradient-to-r from-blue-700 via-indigo-700 to-brand-600 px-4 py-3.5 text-white shadow-sm shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 text-white shadow-inner">
                      <GraduationCap size={19} className="text-white" />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-indigo-700 bg-emerald-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs sm:text-sm font-bold tracking-tight text-white leading-none">
                        {config.name}
                      </p>
                      <span className="rounded-full bg-white/20 px-1.5 py-0.2 text-[8px] sm:text-[9px] font-semibold text-white/90">
                        Official
                      </span>
                    </div>
                    <p className="text-[10px] sm:text-[11px] font-medium text-blue-100 flex items-center gap-1 mt-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      FastAdmission 24/7 Desk
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={resetChat}
                    title="Reset Conversation"
                    className="rounded-xl p-1.5 text-white/80 hover:bg-white/15 hover:text-white transition"
                    aria-label="Reset Chat"
                  >
                    <RotateCcw size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="rounded-xl p-1.5 text-white/80 hover:bg-white/15 hover:text-white transition"
                    aria-label="Close"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Sub-banner disclaimer */}
              <div className="mt-2 flex items-center gap-1.5 text-[10px] text-blue-100/90 bg-black/15 rounded-lg px-2 py-0.5">
                <ShieldCheck size={12} className="text-emerald-300 shrink-0" />
                <span className="truncate">Verified college & cutoff data directly from FastAdmission</span>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-3.5 space-y-3 text-xs bg-slate-50/60 dark:bg-slate-900/40">
              {messages.map((m, idx) => (
                <div key={idx} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"} max-w-[85%]`}>
                    <div
                      className={`rounded-2xl px-3.5 py-2.5 text-[12px] sm:text-[12.5px] leading-relaxed shadow-xs whitespace-pre-wrap ${
                        m.role === "user"
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-xs font-normal"
                          : "bg-white text-slate-800 dark:bg-slate-800 dark:text-slate-100 border border-slate-200/90 dark:border-slate-700/80 rounded-bl-xs"
                      }`}
                    >
                      {m.text}
                    </div>
                    {m.time && (
                      <span className="text-[9px] text-slate-400 px-1 pt-0.5 font-mono">{m.time}</span>
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3.5 py-2 text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2 shadow-xs">
                    <Sparkles size={13} className="animate-spin text-indigo-500 shrink-0" />
                    <span className="font-medium">FastAdmission AI is checking colleges & criteria...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts Chips */}
            <div className="border-t border-slate-100 bg-white px-2.5 py-1.5 dark:border-slate-800/80 dark:bg-slate-950 flex gap-1.5 overflow-x-auto no-scrollbar shrink-0">
              {QUICK_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  type="button"
                  disabled={loading}
                  onClick={() => sendMessage(prompt)}
                  className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] sm:text-[11px] font-medium text-slate-600 transition hover:border-indigo-400 hover:bg-indigo-50/50 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <form
              onSubmit={handleSend}
              className="flex items-center gap-2 border-t border-slate-200/80 bg-white p-2.5 dark:border-slate-800 dark:bg-slate-950 shrink-0"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about courses, cutoffs, fees..."
                disabled={loading}
                className="flex-1 rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-40 shadow-xs shrink-0"
                aria-label="Send message"
              >
                <Send size={14} />
              </button>
            </form>
          </div>
        )}

        {/* Floating Launcher Button */}
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="group relative flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-700 via-indigo-700 to-brand-600 p-3 sm:p-3.5 text-white shadow-xl shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95"
          aria-label="Open AI Admissions Assistant"
        >
          <span className="relative flex h-5 w-5 items-center justify-center">
            <Bot size={20} className="transition-transform group-hover:rotate-12" />
            <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-white animate-pulse" />
          </span>
          <span className="text-[11px] sm:text-xs font-bold tracking-wide pr-1">
            Ask AI
          </span>
        </button>
      </div>
    </>
  );
}
