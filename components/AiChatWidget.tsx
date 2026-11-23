"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, X, Send, Sparkles, MessageCircle, RefreshCw } from "lucide-react";
import { PLATFORM } from "@/lib/site";

interface Message {
  role: "assistant" | "user";
  text: string;
}

export function AiChatWidget() {
  const [open, setOpen] = useState(false);
  const [config, setConfig] = useState<{ name: string; greeting: string; consentText: string } | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [visitorToken, setVisitorToken] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch bot config only if bot is enabled on backend
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
          setMessages([{ role: "assistant", text: cfg.greeting }]);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  // If bot is disabled or not found, don't show the button
  if (!config) return null;

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", text };
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
          text: data.reply || "Thank you for reaching out. A senior counsellor will contact you shortly.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Our admissions counsellor will assist you directly. Please share your preferred course and phone number.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-24 z-40 hidden md:block">
      {/* Chat Window Dialog */}
      {open && (
        <div className="mb-3 w-80 sm:w-96 rounded-2xl border border-line bg-white shadow-2xl transition-all animate-in fade-in slide-in-from-bottom-3 dark:border-white/10 dark:bg-slate-900 overflow-hidden flex flex-col h-[460px]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-line bg-brand-50/50 px-4 py-3 dark:bg-white/5">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white shadow-sm">
                <Bot size={17} />
              </span>
              <div>
                <p className="text-xs font-bold text-ink dark:text-white">{config.name}</p>
                <p className="text-[10px] font-medium text-emerald-600 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> 24/7 AI Admissions Desk
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-white/10"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                    m.role === "user"
                      ? "bg-brand-600 text-white rounded-br-xs"
                      : "bg-surface-2 text-ink dark:text-slate-200 border border-line dark:border-white/10 rounded-bl-xs"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-xs bg-surface-2 border border-line px-3.5 py-2 text-[11px] text-muted flex items-center gap-2">
                  <Sparkles size={12} className="animate-spin text-brand-500" />
                  Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3 border-t border-line bg-surface flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask cutoffs, courses, eligibility..."
              className="flex-1 rounded-xl border border-line bg-white dark:bg-slate-800 px-3 py-2 text-xs placeholder:text-muted focus:border-brand-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-600 text-white disabled:opacity-40 transition hover:bg-brand-700 shrink-0"
              aria-label="Send"
            >
              <Send size={13} />
            </button>
          </form>
        </div>
      )}

      {/* Floating Bot Launcher (Positioned next to FixedButtons) */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 dark:bg-brand-600 text-white shadow-xl ring-2 ring-white/20 transition-all hover:scale-105 active:scale-95 group relative"
        aria-label="Open AI Admissions Assistant"
        title="AI Admissions Assistant"
      >
        <span className="relative">
          {open ? <X size={20} /> : <Bot size={22} />}
          {!open && (
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-400" />
            </span>
          )}
        </span>
      </button>
    </div>
  );
}

