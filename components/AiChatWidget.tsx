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
  }, [messages, open]);

  const sendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = { role: "user", text: trimmed, time: getCurrentTime() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const slug = PLATFORM.tenantSlug || "fastadmission";
      const api = PLATFORM.apiUrl || "https://apicounsellor.jdinfotechsolutions.in";
      const res = await fetch(`${api}/public/${encodeURIComponent(slug)}/bot/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          visitorToken: visitorToken || undefined,
        }),
      });

      const data = await res.json();
      if (data.visitorToken && typeof window !== "undefined") {
        setVisitorToken(data.visitorToken);
        localStorage.setItem("fa_bot_token", data.visitorToken);
      }

      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", text: data.reply, time: getCurrentTime() },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text: "Thank you for reaching out! A senior admissions counsellor has been notified to assist you.",
            time: getCurrentTime(),
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Our admissions advisor is currently offline. Please leave your name and phone number and our team will call you back shortly.",
          time: getCurrentTime(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    void sendMessage(input);
  };

  const resetChat = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("fa_bot_token");
      setVisitorToken(null);
    }
    setMessages([
      {
        role: "assistant",
        text: config?.greeting || "Hello! How can I help you with your college admission today?",
        time: getCurrentTime(),
      },
    ]);
  };

  if (!config) return null;

  return (
    <>
      {/* Mobile full backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs transition-opacity sm:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Floating Launcher Button: Bottom Right, above mobile nav bar */}
      <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-700 via-indigo-700 to-brand-600 px-4 py-3 text-white shadow-2xl shadow-indigo-600/40 transition-all hover:scale-105 active:scale-95 ring-2 ring-white/20"
          aria-label="Open AI Admissions Assistant"
        >
          <span className="relative flex h-5 w-5 items-center justify-center">
            <Bot size={20} className="transition-transform group-hover:rotate-12" />
            <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-white animate-pulse" />
          </span>
          <span className="text-xs font-bold tracking-wide">
            FastAdmission AI
          </span>
        </button>
      </div>

      {/* Chat Dialog: Fixed modal on mobile, clean pinned popover on desktop */}
      {open && (
        <div className="fixed inset-x-3 bottom-3 z-50 flex flex-col h-[540px] max-h-[85vh] rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden sm:inset-x-auto sm:right-6 sm:bottom-20 sm:w-[390px] sm:h-[530px] animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-blue-700 via-indigo-700 to-brand-600 px-4 py-3.5 text-white shadow-xs shrink-0">
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
                    <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-[8px] sm:text-[9px] font-semibold text-white/90">
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
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3 text-xs bg-slate-50/70">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"} max-w-[85%]`}>
                  <div
                    className={`rounded-2xl px-3.5 py-2.5 text-[12px] leading-relaxed shadow-2xs whitespace-pre-wrap ${
                      m.role === "user"
                        ? "bg-brand-600 text-white rounded-br-xs font-normal"
                        : "bg-white text-slate-800 border border-slate-200 rounded-bl-xs"
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
                <div className="rounded-2xl rounded-bl-xs bg-white border border-slate-200 px-3.5 py-2 text-[11px] text-slate-500 flex items-center gap-2 shadow-2xs">
                  <Sparkles size={13} className="animate-spin text-brand-600" />
                  <span>Checking admission cutoffs & details...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Chips */}
          <div className="border-t border-slate-100 bg-white px-2.5 py-1.5 flex gap-1.5 overflow-x-auto no-scrollbar shrink-0">
            {QUICK_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                type="button"
                disabled={loading}
                onClick={() => sendMessage(prompt)}
                className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] sm:text-[11px] font-medium text-slate-600 transition hover:border-brand-400 hover:bg-brand-50/50 hover:text-brand-700"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <form
            onSubmit={handleSend}
            className="flex items-center gap-2 border-t border-slate-200 bg-white p-2.5 shrink-0"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about courses, cutoffs, fees..."
              disabled={loading}
              className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-600 text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-40 shadow-2xs shrink-0"
              aria-label="Send message"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
