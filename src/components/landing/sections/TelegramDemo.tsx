"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Container } from "../lib";
import { BlurFade, GlowDot } from "../motion";

/* ── Types ── */
type Sender = "user" | "bot";
interface DemoMsg {
  id: string;
  from: Sender;
  text?: string;
  voice?: { duration: string };
  typingMs?: number;
}
interface DemoTopic {
  id: string;
  emoji: string;
  name: string;
  badge?: number;
  writable?: boolean;
  messages: DemoMsg[];
}

/* ── Demo script ── */
const TOPICS: DemoTopic[] = [
  {
    id: "planner",
    emoji: "📋",
    name: "AI Planner",
    badge: 3,
    messages: [
      { id: "p1", from: "user", text: "Запланируй на завтра: 10:00 встреча с командой, 14:00 клиент Алибек, 17:00 созвон с партнёром" },
      { id: "p2", from: "bot", typingMs: 1400, text: "✅ Добавил 3 события на завтра:\n• 10:00 — Командная встреча\n• 14:00 — Клиент Алибек\n• 17:00 — Созвон с партнёром\n\nУведомления за 15 мин до каждого." },
      { id: "p3", from: "user", text: "Напомни в 9:30 — подготовить материалы к командной" },
      { id: "p4", from: "bot", typingMs: 700, text: "Готово 🗒️ Напоминание на 9:30 — «Материалы к встрече» добавлено." },
    ],
  },
  {
    id: "researcher",
    emoji: "🔍",
    name: "AI Researcher",
    messages: [
      { id: "r1", from: "user", text: "Проанализируй конкурентов в нише AI-ассистентов для бизнеса в Telegram. Цены, слабые места." },
      { id: "r2", from: "bot", typingMs: 1800, voice: { duration: "0:34" } },
      { id: "r3", from: "bot", typingMs: 200, text: "Отчёт в 3 блоках:\n\n1. Топ-5 конкурентов с ценами\n2. Их слабые места (у 4 из 5 нет per-topic изоляции)\n3. Ваши преимущества\n\nОтправить PDF?" },
      { id: "r4", from: "user", text: "Да, PDF" },
      { id: "r5", from: "bot", typingMs: 600, text: "📎 competitor-analysis-2026.pdf готов" },
    ],
  },
  {
    id: "automator",
    emoji: "⚡",
    name: "AI Automator",
    badge: 1,
    messages: [
      { id: "a1", from: "bot", text: "🔔 Новый лид из Instagram!\n\nМарина Ковалёва · Design Studio\n«Хотим автоматизировать заявки»\n\nОтправляю welcome..." },
      { id: "a2", from: "bot", typingMs: 900, text: "✅ Welcome отправлен. Лид в CRM.\n\nАлексей, задача: «Связаться с Мариной до пятницы»" },
      { id: "a3", from: "user", text: "Тег «горячий», follow-up через 2 дня" },
      { id: "a4", from: "bot", typingMs: 600, text: "🏷️ Тег добавлен. Follow-up — четверг 11:00." },
    ],
  },
  {
    id: "analyst",
    emoji: "📊",
    name: "AI Analyst",
    messages: [
      { id: "an1", from: "user", text: "Покажи метрики за прошлую неделю: лиды, конверсия, выручка" },
      { id: "an2", from: "bot", typingMs: 1800, text: "📈 13–19 мая:\n\nЛиды: 47 (+23%)\nКонверсия: 12.8% (+2.1%)\nВыручка: $14,200 (+18%)\n\nТоп-источник: Instagram Reels\nАутлайер: вторник ×3 от нормы" },
      { id: "an3", from: "user", text: "Почему вторник?" },
      { id: "an4", from: "bot", typingMs: 1100, text: "Во вторник вышел repost у @bali_business (48K). Привёл 31 лид за день." },
    ],
  },
  {
    id: "concierge",
    emoji: "🎯",
    name: "AI Concierge",
    messages: [
      { id: "c1", from: "user", text: "Забронируй столик в Bali Asu на 4 человека сегодня в 19:00" },
      { id: "c2", from: "bot", typingMs: 1200, text: "Связываюсь с рестораном..." },
      { id: "c3", from: "bot", typingMs: 2200, text: "✅ Забронировано!\n\nBali Asu · 4 гостя · сегодня 19:00\nПодтверждение придёт на ваш номер." },
    ],
  },
  {
    id: "order",
    emoji: "✉️",
    name: "Заявка",
    writable: true,
    messages: [
      { id: "o1", from: "user", text: "Хочу такую же систему для своей команды" },
      { id: "o2", from: "bot", typingMs: 700, text: "Расскажите немного:\n\n1. Сколько человек в команде?\n2. Что хотите автоматизировать?" },
      { id: "o3", from: "user", text: "8 человек, продажи. Лиды и отчётность." },
      { id: "o4", from: "bot", typingMs: 900, text: "🎯 Стандартный план — идеально.\n\nМенеджер свяжется в течение часа для 30-мин созвона." },
    ],
  },
];

const ORDER_LINK = "https://t.me/gramfleet_demo";
const DEMO_LINK = "https://t.me/gramfleet_demo";

/* ── Sub-components ── */

function BotAvatar() {
  return (
    <div className="size-7 shrink-0 rounded-full bg-[linear-gradient(135deg,#2AABEE,#0088CC)] flex items-center justify-center text-white text-[10px] font-bold select-none">
      G
    </div>
  );
}

function VoiceMsg() {
  const bars = [3, 5, 9, 14, 20, 16, 11, 19, 24, 15, 9, 13, 20, 26, 18, 11, 21, 16, 9, 13, 7, 11, 5, 9, 4, 8, 3, 2];
  return (
    <div className="flex items-center gap-2 rounded-[18px] rounded-bl-[4px] bg-white border border-[var(--rule)] px-3 py-2.5 shadow-sm max-w-[210px]">
      <div className="size-7 shrink-0 rounded-full bg-[#2AABEE] flex items-center justify-center text-white">
        <svg width="9" height="11" viewBox="0 0 9 11" fill="currentColor">
          <path d="M0 0l9 5.5L0 11z" />
        </svg>
      </div>
      <div className="flex items-end gap-[2px] h-5 flex-1">
        {bars.map((h, i) => (
          <div
            key={i}
            className="w-[2px] rounded-full bg-[#2AABEE]"
            style={{ height: `${Math.max(2, h * 0.8)}px`, opacity: 0.65 + (h / 26) * 0.35 }}
          />
        ))}
      </div>
      <span className="text-[11px] text-[var(--muted)] shrink-0 tabular-nums">0:34</span>
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex items-end gap-2">
      <BotAvatar />
      <div className="flex items-center gap-1.5 rounded-[18px] rounded-bl-[4px] bg-white border border-[var(--rule)] px-3 py-2.5 shadow-sm">
        {[0, 0.18, 0.36].map((delay) => (
          <motion.span
            key={delay}
            className="size-1.5 rounded-full bg-[var(--muted)]"
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 0.75, delay, ease: "easeInOut" }}
          />
        ))}
      </div>
    </div>
  );
}

function ChatMessage({ msg }: { msg: DemoMsg }) {
  const isUser = msg.from === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 6, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-end gap-2 ${isUser ? "flex-row-reverse" : ""}`}
    >
      {!isUser && <BotAvatar />}
      {msg.voice ? (
        <VoiceMsg />
      ) : (
        <div
          className={[
            "rounded-[18px] px-3.5 py-2 text-[13px] leading-[1.45] max-w-[76%] whitespace-pre-line shadow-sm",
            isUser
              ? "bg-[#2AABEE] text-white rounded-br-[4px]"
              : "bg-white border border-[var(--rule)] text-[var(--ink)] rounded-bl-[4px]",
          ].join(" ")}
        >
          {msg.text}
        </div>
      )}
    </motion.div>
  );
}

/* ── Main export ── */
export default function TelegramDemo() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [shownMsgs, setShownMsgs] = useState<DemoMsg[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const cancelRef = useRef(false);
  const autoRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const topic = TOPICS[activeIdx]!;

  /* Replay messages when topic changes */
  useEffect(() => {
    setShownMsgs([]);
    setIsTyping(false);
    cancelRef.current = false;

    const msgs = TOPICS[activeIdx]!.messages;

    async function play() {
      await new Promise((r) => setTimeout(r, 250));
      for (const msg of msgs) {
        if (cancelRef.current) break;
        if (msg.from === "bot" && msg.typingMs) {
          setIsTyping(true);
          await new Promise((r) => setTimeout(r, msg.typingMs));
          if (cancelRef.current) break;
          setIsTyping(false);
        }
        if (!cancelRef.current) {
          setShownMsgs((prev) => [...prev, msg]);
          await new Promise((r) => setTimeout(r, 380));
        }
      }
    }

    play();
    return () => { cancelRef.current = true; };
  }, [activeIdx]);

  /* Auto-scroll */
  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [shownMsgs, isTyping]);

  /* Auto-advance */
  useEffect(() => {
    if (userInteracted) return;
    autoRef.current = setTimeout(() => {
      setActiveIdx((i) => (i + 1) % TOPICS.length);
    }, 11000);
    return () => clearTimeout(autoRef.current);
  }, [activeIdx, userInteracted]);

  function selectTopic(idx: number) {
    if (idx === activeIdx) return;
    setUserInteracted(true);
    setActiveIdx(idx);
  }

  return (
    <section id="demo" className="py-16 md:py-24 bg-[var(--bg-soft)]">
      <Container>
        {/* Header */}
        <div className="mx-auto max-w-[680px] text-center mb-10">
          <BlurFade delay={0.06}>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--indigo-soft)] border border-[var(--rule-2)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--indigo-2)]">
              <GlowDot />
              Interactive Demo
            </span>
          </BlurFade>
          <BlurFade delay={0.12}>
            <h2 className="mt-4 text-balance text-[clamp(26px,4.5vw,48px)] font-extrabold leading-[1.06] tracking-[-0.03em] text-[var(--ink)]">
              Your AI team, live inside Telegram
            </h2>
          </BlurFade>
          <BlurFade delay={0.18}>
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--muted)]">
              Click any topic to explore. This is exactly what your workspace looks like.
            </p>
          </BlurFade>
        </div>

        <BlurFade delay={0.22}>
          <div className="mx-auto" style={{ maxWidth: 900 }}>
            {/* Frame */}
            <div className="overflow-hidden rounded-[20px] border border-[var(--rule-2)] bg-white shadow-[0_24px_72px_-20px_rgba(42,171,238,0.2)]">

              {/* TG top bar */}
              <div className="flex items-center gap-3 border-b border-[var(--rule)] bg-white px-4 py-3">
                <div className="size-8 rounded-full bg-[linear-gradient(135deg,#2AABEE,#0088CC)] flex items-center justify-center text-white text-[13px] font-bold select-none">
                  G
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-[var(--ink)] leading-none">GramFleet Demo</p>
                  <p className="mt-0.5 flex items-center gap-1 text-[11px] text-[#2AABEE]">
                    <span className="size-1.5 rounded-full bg-[#2AABEE] inline-block" />
                    bot is online
                  </p>
                </div>
                <div className="ml-auto flex items-center gap-1 text-[11px] text-[var(--muted)]">
                  <span className="hidden sm:inline">Setup in</span>
                  <span className="font-semibold text-[var(--ink)]">24h</span>
                </div>
              </div>

              {/* Body */}
              <div className="flex" style={{ height: 480 }}>

                {/* Sidebar — hidden on very small screens */}
                <div className="hidden sm:flex w-[176px] shrink-0 flex-col border-r border-[var(--rule)] bg-[#F7F8FA] overflow-y-auto">
                  <p className="px-3 pt-3 pb-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--muted-2)]">Topics</p>
                  {TOPICS.map((t, i) => (
                    <button
                      key={t.id}
                      onClick={() => selectTopic(i)}
                      className={[
                        "flex items-center gap-2 px-3 py-2 text-left transition-colors",
                        i === activeIdx
                          ? "bg-[#2AABEE]/10 border-r-2 border-[#2AABEE]"
                          : "hover:bg-black/[0.04]",
                      ].join(" ")}
                    >
                      <span className="text-[15px] leading-none">{t.emoji}</span>
                      <span className={`flex-1 truncate text-[12.5px] font-medium ${i === activeIdx ? "text-[#2AABEE]" : "text-[var(--ink-2)]"}`}>
                        {t.name}
                      </span>
                      {!!t.badge && (
                        <span className="shrink-0 min-w-[16px] h-4 rounded-full bg-[#2AABEE] text-white text-[9px] font-bold flex items-center justify-center px-1">
                          {t.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Mobile: horizontal topic pills */}
                <div className="sm:hidden absolute left-0 right-0 flex gap-1.5 overflow-x-auto px-3 py-2 bg-[#F7F8FA] border-b border-[var(--rule)]" style={{ top: 56 }}>
                  {TOPICS.map((t, i) => (
                    <button
                      key={t.id}
                      onClick={() => selectTopic(i)}
                      className={[
                        "shrink-0 flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors",
                        i === activeIdx
                          ? "bg-[#2AABEE] text-white"
                          : "bg-white border border-[var(--rule)] text-[var(--ink-2)]",
                      ].join(" ")}
                    >
                      {t.emoji} {t.name}
                    </button>
                  ))}
                </div>

                {/* Chat area */}
                <div className="flex flex-1 flex-col min-w-0">
                  {/* Chat header */}
                  <div className="flex items-center gap-2 border-b border-[var(--rule)] px-4 py-2.5 bg-white">
                    <span className="text-[16px] leading-none">{topic.emoji}</span>
                    <span className="text-[13px] font-semibold text-[var(--ink)]">{topic.name}</span>
                    {topic.writable && (
                      <span className="ml-auto rounded-full bg-[#2AABEE]/10 px-2 py-0.5 text-[10px] font-bold text-[#2AABEE] uppercase tracking-wide">
                        Open for requests
                      </span>
                    )}
                  </div>

                  {/* Messages */}
                  <div
                    ref={chatRef}
                    className="flex-1 overflow-y-auto px-4 py-4 space-y-2.5"
                    style={{
                      backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.035) 1px, transparent 1px)",
                      backgroundSize: "22px 22px",
                    }}
                  >
                    <AnimatePresence initial={false}>
                      {shownMsgs.map((msg) => (
                        <ChatMessage key={msg.id} msg={msg} />
                      ))}
                    </AnimatePresence>
                    {isTyping && <TypingDots />}
                  </div>

                  {/* Input bar */}
                  <div className="flex items-center gap-2 border-t border-[var(--rule)] px-3 py-2.5 bg-white">
                    <div className="flex-1 rounded-full border border-[var(--rule-2)] bg-[var(--bg-soft)] px-3 py-2 text-[12.5px] text-[var(--muted)]">
                      {topic.writable ? "Write your request..." : "Read-only demo"}
                    </div>
                    {topic.writable ? (
                      <a
                        href={ORDER_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="size-8 rounded-full bg-[#2AABEE] flex items-center justify-center text-white shrink-0 hover:bg-[#0088CC] transition-colors"
                        aria-label="Send in Telegram"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 2L11 13M22 2L15 22l-4-9-9-4z" />
                        </svg>
                      </a>
                    ) : (
                      <div className="size-8 rounded-full bg-[var(--rule-2)] flex items-center justify-center opacity-40 shrink-0" aria-hidden>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 2L11 13M22 2L15 22l-4-9-9-4z" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Progress dots */}
            <div className="mt-4 flex justify-center gap-1.5">
              {TOPICS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => selectTopic(i)}
                  className={[
                    "rounded-full transition-all duration-300",
                    i === activeIdx
                      ? "w-5 h-1.5 bg-[#2AABEE]"
                      : "w-1.5 h-1.5 bg-[var(--rule-2)] hover:bg-[var(--muted)]",
                  ].join(" ")}
                  aria-label={TOPICS[i]!.name}
                />
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={DEMO_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#2AABEE] px-6 py-3 text-[14px] font-semibold text-white shadow-[0_4px_20px_-4px_rgba(42,171,238,0.55)] hover:bg-[#0088CC] transition-colors"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M21.198 2.433a2.242 2.242 0 00-1.022.215l-17 7.571a2.244 2.244 0 00.243 4.199l3.795 1.058 1.427 4.436a.5.5 0 00.851.162l2.294-2.515 4.433 3.267a2.244 2.244 0 003.438-1.347l3.046-14.96a2.24 2.24 0 00-2.505-2.086z" />
                </svg>
                Open live demo in Telegram
              </a>
              <a
                href={ORDER_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--rule-2)] bg-white px-6 py-3 text-[14px] font-semibold text-[var(--ink-2)] hover:bg-[var(--indigo-soft)] hover:text-[var(--indigo-2)] transition-colors"
              >
                Request setup →
              </a>
            </div>

            <p className="mt-3 text-center text-[12px] text-[var(--muted)]">
              Setup in 24 hours · No code required · Cancel anytime
            </p>
          </div>
        </BlurFade>
      </Container>
    </section>
  );
}
