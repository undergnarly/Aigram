"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Container, useContent, useLang } from "../lib";
import { BlurFade, GlowDot } from "../motion";

/* ── Types ── */
type Sender = "user" | "bot";
interface DemoMsg {
  id: string;
  from: Sender;
  text?: string;
  voice?: true;
  /** ms the bot "thinks" before appearing */
  botTypingMs?: number;
  /** ms the user "types" in input before message appears */
  userTypingMs?: number;
}
interface DemoTopic {
  id: string;
  emoji: string;
  name: string;
  badge?: number;
  writable?: boolean;
  messages: DemoMsg[];
}

/* ── Bilingual demo scripts ── */
const TOPICS: Record<"en" | "ru", DemoTopic[]> = {
  en: [
    {
      id: "planner", emoji: "📋", name: "AI Planner", badge: 3,
      messages: [
        { id: "p1", from: "user", userTypingMs: 1600, text: "Schedule tomorrow: 10am team standup, 2pm client Alibek, 5pm partner call" },
        { id: "p2", from: "bot", botTypingMs: 1600, text: "✅ Added 3 events for tomorrow:\n• 10:00 — Team standup\n• 14:00 — Client Alibek\n• 17:00 — Partner call\n\nReminders 15 min before each." },
        { id: "p3", from: "user", userTypingMs: 1200, text: "Remind me at 9:30 to prep materials" },
        { id: "p4", from: "bot", botTypingMs: 900, text: "Done 🗒️ Reminder set for 9:30 — «Prep materials for standup»." },
      ],
    },
    {
      id: "researcher", emoji: "🔍", name: "AI Researcher",
      messages: [
        { id: "r1", from: "user", userTypingMs: 1800, text: "Analyze competitors in the Telegram AI assistant niche. Pricing, weak spots." },
        { id: "r2", from: "bot", botTypingMs: 2200, voice: true },
        { id: "r3", from: "bot", botTypingMs: 300, text: "Report in 3 sections:\n\n1. Top-5 competitors with pricing\n2. Their weaknesses (4/5 lack per-topic isolation)\n3. Your advantages\n\nSend PDF?" },
        { id: "r4", from: "user", userTypingMs: 800, text: "Yes, send PDF" },
        { id: "r5", from: "bot", botTypingMs: 700, text: "📎 competitor-analysis-2026.pdf ready" },
      ],
    },
    {
      id: "automator", emoji: "⚡", name: "AI Automator", badge: 1,
      messages: [
        { id: "a1", from: "bot", text: "🔔 New lead from Instagram!\n\nMarina Kovaleva · Design Studio\n«We want to automate our requests»\n\nSending welcome message..." },
        { id: "a2", from: "bot", botTypingMs: 1100, text: "✅ Welcome sent. Lead added to CRM.\n\nAlex, task assigned: «Follow up with Marina by Friday»" },
        { id: "a3", from: "user", userTypingMs: 1000, text: "Tag her «hot», follow-up in 2 days" },
        { id: "a4", from: "bot", botTypingMs: 700, text: "🏷️ Tag added. Follow-up scheduled Thursday 11:00." },
      ],
    },
    {
      id: "developer", emoji: "💻", name: "AI Developer",
      messages: [
        { id: "d1", from: "user", userTypingMs: 2000, text: "Build me a landing page for my coaching service — clean, mobile-first, with a booking form" },
        { id: "d2", from: "bot", botTypingMs: 900, text: "On it. Starting build now ⚙️" },
        { id: "d3", from: "bot", botTypingMs: 1400, text: "🔨 Scaffolding Next.js project...\n📦 Installing TailwindCSS + Framer Motion\n🎨 Designing layout from your brief" },
        { id: "d4", from: "bot", botTypingMs: 1800, text: "⚙️ Adding booking form\n📅 Wiring Cal.com integration\n🚀 Deploying to Netlify..." },
        { id: "d5", from: "bot", botTypingMs: 1600, text: "✅ Live!\n\n🔗 coach-flow.netlify.app\n📂 Private repo created\n\nWant me to add Stripe checkout next?" },
      ],
    },
    {
      id: "analyst", emoji: "📊", name: "AI Analyst",
      messages: [
        { id: "an1", from: "user", userTypingMs: 1400, text: "Show last week metrics: leads, conversion, revenue" },
        { id: "an2", from: "bot", botTypingMs: 2000, text: "📈 May 13–19:\n\nLeads: 47 (+23%)\nConversion: 12.8% (+2.1%)\nRevenue: $14,200 (+18%)\n\nTop source: Instagram Reels\nOutlier: Tuesday ×3 normal" },
        { id: "an3", from: "user", userTypingMs: 900, text: "Why was Tuesday so high?" },
        { id: "an4", from: "bot", botTypingMs: 1300, text: "Your case study was reposted by @bali_business (48K followers). Brought 31 leads in one day." },
      ],
    },
    {
      id: "concierge", emoji: "🎯", name: "AI Concierge",
      messages: [
        { id: "c1", from: "user", userTypingMs: 1400, text: "Book a table at Bali Asu for 4 tonight at 7pm" },
        { id: "c2", from: "bot", botTypingMs: 1400, text: "Contacting the restaurant..." },
        { id: "c3", from: "bot", botTypingMs: 2600, text: "✅ Booked!\n\nBali Asu · 4 guests · tonight 19:00\nConfirmation will arrive on your number." },
      ],
    },
    {
      id: "order", emoji: "✉️", name: "Request", writable: true,
      messages: [
        { id: "o1", from: "user", userTypingMs: 1400, text: "I want the same system for my team" },
        { id: "o2", from: "bot", botTypingMs: 800, text: "Tell me a bit:\n\n1. How many people on your team?\n2. What do you want to automate first?" },
        { id: "o3", from: "user", userTypingMs: 1600, text: "8 people, sales. Leads and reporting." },
        { id: "o4", from: "bot", botTypingMs: 1000, text: "🎯 Standard plan is a perfect fit.\n\nA manager will contact you within an hour for a 30-min call." },
      ],
    },
  ],
  ru: [
    {
      id: "planner", emoji: "📋", name: "AI Планировщик", badge: 3,
      messages: [
        { id: "p1", from: "user", userTypingMs: 1600, text: "Запланируй на завтра: 10:00 стендап команды, 14:00 клиент Алибек, 17:00 созвон с партнёром" },
        { id: "p2", from: "bot", botTypingMs: 1600, text: "✅ Добавил 3 события на завтра:\n• 10:00 — Стендап команды\n• 14:00 — Клиент Алибек\n• 17:00 — Созвон с партнёром\n\nУведомления за 15 мин до каждого." },
        { id: "p3", from: "user", userTypingMs: 1200, text: "Напомни в 9:30 подготовить материалы" },
        { id: "p4", from: "bot", botTypingMs: 900, text: "Готово 🗒️ Напоминание на 9:30 — «Подготовить материалы к стендапу»." },
      ],
    },
    {
      id: "researcher", emoji: "🔍", name: "AI Исследователь",
      messages: [
        { id: "r1", from: "user", userTypingMs: 1800, text: "Проанализируй конкурентов в нише AI-ассистентов для Telegram. Цены, слабые места." },
        { id: "r2", from: "bot", botTypingMs: 2200, voice: true },
        { id: "r3", from: "bot", botTypingMs: 300, text: "Отчёт в 3 блоках:\n\n1. Топ-5 конкурентов с ценами\n2. Слабые места (у 4 из 5 нет per-topic изоляции)\n3. Ваши преимущества\n\nОтправить PDF?" },
        { id: "r4", from: "user", userTypingMs: 800, text: "Да, PDF" },
        { id: "r5", from: "bot", botTypingMs: 700, text: "📎 competitor-analysis-2026.pdf готов" },
      ],
    },
    {
      id: "automator", emoji: "⚡", name: "AI Автоматизатор", badge: 1,
      messages: [
        { id: "a1", from: "bot", text: "🔔 Новый лид из Instagram!\n\nМарина Ковалёва · Design Studio\n«Хотим автоматизировать заявки»\n\nОтправляю welcome..." },
        { id: "a2", from: "bot", botTypingMs: 1100, text: "✅ Welcome отправлен. Лид в CRM.\n\nАлексей, задача: «Связаться с Мариной до пятницы»" },
        { id: "a3", from: "user", userTypingMs: 1000, text: "Тег «горячий», follow-up через 2 дня" },
        { id: "a4", from: "bot", botTypingMs: 700, text: "🏷️ Тег добавлен. Follow-up — четверг 11:00." },
      ],
    },
    {
      id: "developer", emoji: "💻", name: "AI Разработчик",
      messages: [
        { id: "d1", from: "user", userTypingMs: 2000, text: "Построй лендинг для моих коучинг-услуг — минимализм, mobile-first, с формой записи" },
        { id: "d2", from: "bot", botTypingMs: 900, text: "Принял. Начинаю сборку ⚙️" },
        { id: "d3", from: "bot", botTypingMs: 1400, text: "🔨 Создаю Next.js проект...\n📦 Ставлю TailwindCSS + Framer Motion\n🎨 Проектирую вёрстку по брифу" },
        { id: "d4", from: "bot", botTypingMs: 1800, text: "⚙️ Добавляю форму записи\n📅 Подключаю Cal.com\n🚀 Деплою на Netlify..." },
        { id: "d5", from: "bot", botTypingMs: 1600, text: "✅ Готово!\n\n🔗 coach-flow.netlify.app\n📂 Приватный репозиторий создан\n\nДобавить Stripe оплату следующим шагом?" },
      ],
    },
    {
      id: "analyst", emoji: "📊", name: "AI Аналитик",
      messages: [
        { id: "an1", from: "user", userTypingMs: 1400, text: "Покажи метрики за прошлую неделю: лиды, конверсия, выручка" },
        { id: "an2", from: "bot", botTypingMs: 2000, text: "📈 13–19 мая:\n\nЛиды: 47 (+23%)\nКонверсия: 12.8% (+2.1%)\nВыручка: $14 200 (+18%)\n\nТоп-источник: Instagram Reels\nАутлайер: вторник ×3 нормы" },
        { id: "an3", from: "user", userTypingMs: 900, text: "Почему вторник такой высокий?" },
        { id: "an4", from: "bot", botTypingMs: 1300, text: "Ваш кейс репостнул @bali_business (48K подписчиков). Привёл 31 лид за один день." },
      ],
    },
    {
      id: "concierge", emoji: "🎯", name: "AI Консьерж",
      messages: [
        { id: "c1", from: "user", userTypingMs: 1400, text: "Забронируй столик в Bali Asu на 4 человека сегодня в 19:00" },
        { id: "c2", from: "bot", botTypingMs: 1400, text: "Связываюсь с рестораном..." },
        { id: "c3", from: "bot", botTypingMs: 2600, text: "✅ Забронировано!\n\nBali Asu · 4 гостя · сегодня 19:00\nПодтверждение придёт на ваш номер." },
      ],
    },
    {
      id: "order", emoji: "✉️", name: "Заявка", writable: true,
      messages: [
        { id: "o1", from: "user", userTypingMs: 1400, text: "Хочу такую же систему для своей команды" },
        { id: "o2", from: "bot", botTypingMs: 800, text: "Расскажите немного:\n\n1. Сколько человек в команде?\n2. Что хотите автоматизировать в первую очередь?" },
        { id: "o3", from: "user", userTypingMs: 1600, text: "8 человек, продажи. Лиды и отчётность." },
        { id: "o4", from: "bot", botTypingMs: 1000, text: "🎯 Стандартный план — идеальный вариант.\n\nМенеджер свяжется в течение часа для 30-мин созвона." },
      ],
    },
  ],
};

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
        <svg width="9" height="11" viewBox="0 0 9 11" fill="currentColor"><path d="M0 0l9 5.5L0 11z" /></svg>
      </div>
      <div className="flex items-end gap-[2px] h-5 flex-1">
        {bars.map((h, i) => (
          <div key={i} className="w-[2px] rounded-full bg-[#2AABEE]"
            style={{ height: `${Math.max(2, h * 0.8)}px`, opacity: 0.6 + (h / 26) * 0.4 }} />
        ))}
      </div>
      <span className="text-[11px] text-[var(--muted)] shrink-0 tabular-nums">0:34</span>
    </div>
  );
}

function BotTypingDots() {
  return (
    <div className="flex items-end gap-2">
      <BotAvatar />
      <div className="flex items-center gap-1.5 rounded-[18px] rounded-bl-[4px] bg-white border border-[var(--rule)] px-3 py-2.5 shadow-sm">
        {[0, 0.18, 0.36].map((delay) => (
          <motion.span key={delay} className="size-1.5 rounded-full bg-[var(--muted)]"
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 0.75, delay, ease: "easeInOut" }} />
        ))}
      </div>
    </div>
  );
}

function ChatMessage({ msg }: { msg: DemoMsg }) {
  const isUser = msg.from === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-end gap-2 ${isUser ? "flex-row-reverse" : ""}`}
    >
      {!isUser && <BotAvatar />}
      {msg.voice ? <VoiceMsg /> : (
        <div className={[
          "rounded-[18px] px-3.5 py-2 text-[13px] leading-[1.5] max-w-[78%] whitespace-pre-line shadow-sm",
          isUser
            ? "bg-[#2AABEE] text-white rounded-br-[4px]"
            : "bg-white border border-[var(--rule)] text-[var(--ink)] rounded-bl-[4px]",
        ].join(" ")}>
          {msg.text}
        </div>
      )}
    </motion.div>
  );
}

/* ── Main component ── */
export default function TelegramDemo() {
  const c = useContent();
  const { lang } = useLang();
  const topics = TOPICS[lang as "en" | "ru"] ?? TOPICS.en;

  const [activeIdx, setActiveIdx] = useState(0);
  const [shownMsgs, setShownMsgs] = useState<DemoMsg[]>([]);
  const [botTyping, setBotTyping] = useState(false);
  const [userTypingText, setUserTypingText] = useState<string | null>(null);
  const [userInteracted, setUserInteracted] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const autoRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const topic = topics[activeIdx]!;

  /* Replay messages when topic or language changes */
  useEffect(() => {
    setShownMsgs([]);
    setBotTyping(false);
    setUserTypingText(null);

    // Closure-scoped flag — immune to the ref race where the new effect
    // resets cancelRef.current=false before the old async play() checks it.
    let cancelled = false;

    const msgs = topics[activeIdx]!.messages;

    async function play() {
      await new Promise((r) => setTimeout(r, 350));
      for (const msg of msgs) {
        if (cancelled) break;

        if (msg.from === "user" && msg.userTypingMs) {
          setUserTypingText(msg.text ?? "");
          await new Promise((r) => setTimeout(r, msg.userTypingMs));
          if (cancelled) break;
          setUserTypingText(null);
        }

        if (msg.from === "bot" && msg.botTypingMs) {
          setBotTyping(true);
          await new Promise((r) => setTimeout(r, msg.botTypingMs));
          if (cancelled) break;
          setBotTyping(false);
        }

        if (!cancelled) {
          setShownMsgs((prev) => [...prev, msg]);
          await new Promise((r) => setTimeout(r, msg.from === "user" ? 500 : 700));
        }
      }
    }

    play();
    return () => { cancelled = true; };
  }, [activeIdx, lang]); // eslint-disable-line react-hooks/exhaustive-deps

  /* Auto-scroll */
  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [shownMsgs, botTyping, userTypingText]);

  /* Auto-advance topics (only when user hasn't interacted) */
  useEffect(() => {
    if (userInteracted) return;
    autoRef.current = setTimeout(() => {
      setActiveIdx((i) => (i + 1) % topics.length);
    }, 13000);
    return () => clearTimeout(autoRef.current);
  }, [activeIdx, userInteracted, topics.length]);

  function selectTopic(idx: number) {
    if (idx === activeIdx) return;
    setUserInteracted(true);
    setActiveIdx(idx);
  }

  const d = c.demo;

  return (
    <section id="demo" className="py-16 md:py-24 bg-[var(--bg-soft)]">
      <Container>
        {/* Header */}
        <div className="mx-auto max-w-[680px] text-center mb-10">
          <BlurFade delay={0.06}>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--indigo-soft)] border border-[var(--rule-2)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--indigo-2)]">
              <GlowDot />
              {d.eyebrow}
            </span>
          </BlurFade>
          <BlurFade delay={0.12}>
            <h2 className="mt-4 text-balance text-[clamp(26px,4.5vw,48px)] font-extrabold leading-[1.06] tracking-[-0.03em] text-[var(--ink)]">
              {d.h2}
            </h2>
          </BlurFade>
          <BlurFade delay={0.18}>
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--muted)]">{d.sub}</p>
          </BlurFade>
        </div>

        <BlurFade delay={0.22}>
          <div className="mx-auto" style={{ maxWidth: 900 }}>
            {/* Simulator frame */}
            <div className="overflow-hidden rounded-[20px] border border-[var(--rule-2)] bg-white shadow-[0_24px_72px_-20px_rgba(42,171,238,0.2)]">

              {/* TG top bar */}
              <div className="flex items-center gap-3 border-b border-[var(--rule)] bg-white px-4 py-3">
                <div className="size-8 rounded-full bg-[linear-gradient(135deg,#2AABEE,#0088CC)] flex items-center justify-center text-white text-[13px] font-bold select-none">G</div>
                <div>
                  <p className="text-[13px] font-semibold text-[var(--ink)] leading-none">GramFleet Demo</p>
                  <p className="mt-0.5 flex items-center gap-1 text-[11px] text-[#2AABEE]">
                    <span className="size-1.5 rounded-full bg-[#2AABEE] inline-block" />
                    {d.botOnline}
                  </p>
                </div>
                <div className="ml-auto flex items-center gap-1 text-[11px] text-[var(--muted)]">
                  <span className="hidden sm:inline">{d.setupInLabel}</span>
                  <span className="font-semibold text-[var(--ink)]">{d.setupIn}</span>
                </div>
              </div>

              {/* Body */}
              <div className="flex" style={{ height: 500 }}>

                {/* Sidebar — desktop */}
                <div className="hidden sm:flex w-[180px] shrink-0 flex-col border-r border-[var(--rule)] bg-[#F7F8FA] overflow-y-auto">
                  <p className="px-3 pt-3 pb-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--muted-2)]">{d.topicsLabel}</p>
                  {topics.map((t, i) => (
                    <button key={t.id} onClick={() => selectTopic(i)}
                      className={["flex items-center gap-2 px-3 py-2.5 text-left transition-colors",
                        i === activeIdx ? "bg-[#2AABEE]/10 border-r-2 border-[#2AABEE]" : "hover:bg-black/[0.04]",
                      ].join(" ")}
                    >
                      <span className="text-[15px] leading-none">{t.emoji}</span>
                      <span className={`flex-1 truncate text-[12.5px] font-medium ${i === activeIdx ? "text-[#2AABEE]" : "text-[var(--ink-2)]"}`}>{t.name}</span>
                      {!!t.badge && (
                        <span className="shrink-0 min-w-[16px] h-4 rounded-full bg-[#2AABEE] text-white text-[9px] font-bold flex items-center justify-center px-1">{t.badge}</span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Chat area */}
                <div className="flex flex-1 flex-col min-w-0">
                  {/* Mobile topic pills */}
                  <div className="sm:hidden flex gap-1.5 overflow-x-auto px-3 py-2 bg-[#F7F8FA] border-b border-[var(--rule)] scroll-smooth">
                    {topics.map((t, i) => (
                      <button key={t.id} onClick={() => selectTopic(i)}
                        className={["shrink-0 flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors",
                          i === activeIdx ? "bg-[#2AABEE] text-white" : "bg-white border border-[var(--rule)] text-[var(--ink-2)]",
                        ].join(" ")}
                      >
                        {t.emoji} {t.name}
                      </button>
                    ))}
                  </div>

                  {/* Chat header */}
                  <div className="flex items-center gap-2 border-b border-[var(--rule)] px-4 py-2.5 bg-white">
                    <span className="text-[16px] leading-none">{topic.emoji}</span>
                    <span className="text-[13px] font-semibold text-[var(--ink)]">{topic.name}</span>
                    {topic.writable && (
                      <span className="ml-auto rounded-full bg-[#2AABEE]/10 px-2 py-0.5 text-[10px] font-bold text-[#2AABEE] uppercase tracking-wide">{d.openForRequests}</span>
                    )}
                  </div>

                  {/* Messages */}
                  <div ref={chatRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
                    style={{ backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.03) 1px, transparent 1px)", backgroundSize: "22px 22px" }}
                  >
                    <AnimatePresence initial={false}>
                      {shownMsgs.map((msg) => <ChatMessage key={msg.id} msg={msg} />)}
                    </AnimatePresence>
                    {botTyping && <BotTypingDots />}
                  </div>

                  {/* Input bar — shows user typing here before message appears */}
                  <div className="flex items-center gap-2 border-t border-[var(--rule)] px-3 py-2.5 bg-white">
                    <div className={[
                      "flex-1 rounded-full border px-3 py-2 text-[12.5px] transition-colors duration-200",
                      userTypingText !== null
                        ? "border-[#2AABEE] bg-white text-[var(--ink)]"
                        : "border-[var(--rule-2)] bg-[var(--bg-soft)] text-[var(--muted)]",
                    ].join(" ")}>
                      {userTypingText !== null
                        ? <span>{userTypingText}<span className="inline-block w-0.5 h-3.5 bg-[#2AABEE] ml-0.5 animate-[blink_1s_step-end_infinite] align-middle" /></span>
                        : (topic.writable ? d.requestPlaceholder : d.readOnlyPlaceholder)
                      }
                    </div>
                    {topic.writable ? (
                      <a href={ORDER_LINK} target="_blank" rel="noopener noreferrer"
                        className="size-8 rounded-full bg-[#2AABEE] flex items-center justify-center text-white shrink-0 hover:bg-[#0088CC] transition-colors"
                        aria-label="Send">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 2L11 13M22 2L15 22l-4-9-9-4z" />
                        </svg>
                      </a>
                    ) : (
                      <div className="size-8 rounded-full bg-[var(--rule-2)] flex items-center justify-center opacity-35 shrink-0" aria-hidden>
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
              {topics.map((_, i) => (
                <button key={i} onClick={() => selectTopic(i)}
                  className={["rounded-full transition-all duration-300",
                    i === activeIdx ? "w-5 h-1.5 bg-[#2AABEE]" : "w-1.5 h-1.5 bg-[var(--rule-2)] hover:bg-[var(--muted)]",
                  ].join(" ")}
                  aria-label={topics[i]!.name} />
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href={DEMO_LINK} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#2AABEE] px-6 py-3 text-[14px] font-semibold text-white shadow-[0_4px_20px_-4px_rgba(42,171,238,0.55)] hover:bg-[#0088CC] transition-colors">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M21.198 2.433a2.242 2.242 0 00-1.022.215l-17 7.571a2.244 2.244 0 00.243 4.199l3.795 1.058 1.427 4.436a.5.5 0 00.851.162l2.294-2.515 4.433 3.267a2.244 2.244 0 003.438-1.347l3.046-14.96a2.24 2.24 0 00-2.505-2.086z" />
                </svg>
                {d.openDemoCta}
              </a>
              <a href={ORDER_LINK} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--rule-2)] bg-white px-6 py-3 text-[14px] font-semibold text-[var(--ink-2)] hover:bg-[var(--indigo-soft)] hover:text-[var(--indigo-2)] transition-colors">
                {d.requestSetupCta}
              </a>
            </div>
            <p className="mt-3 text-center text-[12px] text-[var(--muted)]">{d.footerNote}</p>
          </div>
        </BlurFade>
      </Container>
    </section>
  );
}
