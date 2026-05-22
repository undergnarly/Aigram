import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "GramFleet — Claude и ChatGPT уровня прямо в Telegram, без VPN",
  description:
    "ИИ-команда уровня Claude и ChatGPT прямо в Telegram. Работает из России без VPN, без иностранной карты и без иностранного номера. Оплата через Telegram Stars, крипту и ЮKassa. От 19 900 ₽/мес.",
  keywords: [
    "GramFleet",
    "Claude в России",
    "ChatGPT в России",
    "GigaChat альтернатива",
    "ИИ в Telegram",
    "AI агент Telegram",
    "ИИ ассистент без VPN",
    "Claude без VPN",
    "оплата Claude из России",
    "Telegram бот ИИ",
    "AI для бизнеса Россия",
  ],
  alternates: {
    canonical: "https://gramfleet.ai/ru",
    languages: {
      ru: "https://gramfleet.ai/ru",
      en: "https://gramfleet.ai/",
      "x-default": "https://gramfleet.ai/",
    },
  },
  openGraph: {
    title: "GramFleet — Claude и ChatGPT уровня прямо в Telegram, без VPN",
    description:
      "ИИ-команда уровня Claude и ChatGPT прямо в Telegram. Работает из России без VPN, без иностранной карты, без иностранного номера. Оплата в рублях, Stars или крипте.",
    type: "website",
    url: "https://gramfleet.ai/ru",
    images: ["https://gramfleet.ai/og-image.png"],
    locale: "ru_RU",
    siteName: "GramFleet",
  },
  twitter: {
    card: "summary_large_image",
    title: "GramFleet — Claude уровня прямо в Telegram, без VPN",
    description:
      "ИИ-команда уровня Claude и ChatGPT прямо в Telegram. Работает из России без VPN. Оплата в рублях, Stars или крипте.",
    images: ["https://gramfleet.ai/og-image.png"],
  },
  robots: { index: true, follow: true },
};

const ACCENT = "#0088CC";
const ACCENT_LIGHT = "#2AABEE";

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mb-16 sm:mb-24 scroll-mt-24">
      <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-3">
        {eyebrow}
      </div>
      <h2 className="text-2xl sm:text-4xl font-bold tracking-tight mb-6 text-slate-900 leading-tight">
        {title}
      </h2>
      <div className="prose prose-slate max-w-none text-[15px] sm:text-base leading-relaxed text-slate-700">
        {children}
      </div>
    </section>
  );
}

function ComparisonRow({
  feature,
  gramfleet,
  claude,
  chatgpt,
  gigachat,
}: {
  feature: string;
  gramfleet: { value: string; tone?: "good" | "neutral" | "bad" };
  claude: { value: string; tone?: "good" | "neutral" | "bad" };
  chatgpt: { value: string; tone?: "good" | "neutral" | "bad" };
  gigachat: { value: string; tone?: "good" | "neutral" | "bad" };
}) {
  const cell = (c: { value: string; tone?: "good" | "neutral" | "bad" }) => {
    const t = c.tone ?? "neutral";
    const cls =
      t === "good"
        ? "text-emerald-700 font-semibold"
        : t === "bad"
          ? "text-red-600 font-semibold"
          : "text-slate-700";
    return <td className={`py-3 pr-4 text-[13px] sm:text-sm ${cls}`}>{c.value}</td>;
  };
  return (
    <tr className="border-b border-slate-200 last:border-b-0 align-top">
      <th
        scope="row"
        className="py-3 pr-4 text-left text-[13px] sm:text-sm font-semibold text-slate-900 align-top whitespace-nowrap sm:whitespace-normal"
      >
        {feature}
      </th>
      {cell(gramfleet)}
      {cell(claude)}
      {cell(chatgpt)}
      {cell(gigachat)}
    </tr>
  );
}

function PainPoint({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50/60 p-5">
      <div className="flex items-start gap-3">
        <span className="grid size-7 shrink-0 place-items-center rounded-full bg-red-100 text-red-700 font-bold">
          —
        </span>
        <div>
          <div className="font-semibold text-slate-900 mb-1.5">{title}</div>
          <p className="text-[14px] text-slate-700 leading-relaxed m-0">{body}</p>
        </div>
      </div>
    </div>
  );
}

function Solution({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-[#0088CC]/30 bg-[#0088CC]/5 p-5">
      <div className="flex items-start gap-3">
        <span
          className="grid size-7 shrink-0 place-items-center rounded-full text-white font-bold"
          style={{ background: "linear-gradient(135deg,#2AABEE,#0088CC)" }}
        >
          ✓
        </span>
        <div>
          <div className="font-semibold text-slate-900 mb-1.5">{title}</div>
          <p className="text-[14px] text-slate-700 leading-relaxed m-0">{body}</p>
        </div>
      </div>
    </div>
  );
}

function PayCard({
  title,
  meta,
  body,
  highlight,
}: {
  title: string;
  meta: string;
  body: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-5 sm:p-6 border ${
        highlight
          ? "border-[#0088CC]/40 bg-[#0088CC]/5"
          : "border-slate-200 bg-white"
      }`}
    >
      <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">
        {meta}
      </div>
      <div className="font-bold text-slate-900 text-lg mb-2">{title}</div>
      <p className="text-[14px] text-slate-700 leading-relaxed m-0">{body}</p>
    </div>
  );
}

function Faq({ q, a }: { q: string; a: React.ReactNode }) {
  return (
    <details className="group rounded-2xl border border-slate-200 bg-white open:border-[#0088CC]/40 open:shadow-[0_8px_24px_-12px_rgba(42,171,238,0.2)] transition-colors">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 sm:p-6 [&::-webkit-details-marker]:hidden">
        <h3 className="text-[15px] sm:text-[17px] font-semibold tracking-tight text-slate-900 m-0">
          {q}
        </h3>
        <span
          className="grid size-9 shrink-0 place-items-center rounded-full border border-slate-300 text-slate-500 transition-all group-open:border-transparent group-open:bg-[linear-gradient(135deg,#2AABEE,#0088CC)] group-open:text-white"
          aria-hidden
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className="transition-transform group-open:rotate-45"
          >
            <path
              d="M6 2v8M2 6h8"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </summary>
      <div className="px-5 pb-6 pr-12 text-[14px] sm:text-[15px] leading-relaxed text-slate-700 sm:px-6 sm:pr-16">
        {a}
      </div>
    </details>
  );
}

export default function RussiaLanding() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Sticky top nav */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
          <Link href="/" className="font-bold text-[#0088CC] flex items-center gap-2">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="#2AABEE"
              aria-hidden
            >
              <path d="M21.198 2.433a2.242 2.242 0 00-1.022.215l-17 7.571a2.244 2.244 0 00.243 4.199l3.795 1.058 1.427 4.436a.5.5 0 00.851.162l2.294-2.515 4.433 3.267a2.244 2.244 0 003.438-1.347l3.046-14.96a2.24 2.24 0 00-2.505-2.086z" />
            </svg>
            GramFleet
          </Link>
          <div className="flex items-center gap-3 text-xs sm:text-sm">
            <Link
              href="/"
              className="hidden sm:inline text-slate-500 hover:text-slate-900"
            >
              EN
            </Link>
            <span className="hidden sm:inline text-slate-300">·</span>
            <a
              href="https://t.me/GramFleetBot"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#0088CC] text-white font-semibold px-4 py-2 text-xs sm:text-sm hover:scale-[1.02] transition-transform"
            >
              Открыть в Telegram →
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(42,171,238,0.12), transparent 60%)",
          }}
        />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-10 sm:pb-12">
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#0088CC]/30 bg-[#0088CC]/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#0088CC]">
              <span className="size-1.5 rounded-full bg-[#0088CC]" />
              Для пользователей из России
            </span>
            <span className="rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-700">
              Без VPN
            </span>
            <span className="rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-700">
              Оплата в ₽
            </span>
          </div>

          <h1 className="text-[34px] sm:text-[56px] font-extrabold leading-[1.05] tracking-[-0.025em] text-slate-900 mb-5">
            Claude и ChatGPT уровня&nbsp;—{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg,#2AABEE 0%,#0088CC 60%,#0E4A86 100%)",
              }}
            >
              прямо в Telegram
            </span>
            . Из России.
          </h1>

          <p className="text-[17px] sm:text-[20px] leading-[1.5] text-slate-700 mb-7 max-w-2xl">
            Claude и ChatGPT в РФ заблокированы: нужен иностранный номер,
            иностранная карта и VPN. GramFleet — это та же глубина рассуждения
            Claude, но в виде ИИ-команды внутри вашего Telegram. Без VPN, без
            зарубежных карт, без переустановок. Оплата через Telegram Stars,
            ЮKassa или крипту.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://t.me/GramFleetBot"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full text-white font-bold px-6 sm:px-8 py-3.5 sm:py-4 text-base sm:text-[17px] hover:scale-[1.02] transition-transform shadow-[0_18px_44px_-10px_rgba(42,171,238,0.55)]"
              style={{
                background: "linear-gradient(135deg,#2AABEE 0%,#0088CC 100%)",
              }}
            >
              Попробовать в Telegram →
            </a>
            <a
              href="#compare"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 text-slate-700 font-semibold px-6 sm:px-8 py-3.5 sm:py-4 text-base sm:text-[17px] hover:border-[#0088CC] hover:text-[#0088CC] transition-colors"
            >
              Сравнить с Claude / ChatGPT
            </a>
          </div>

          <p className="mt-5 text-[13px] text-slate-500">
            7 дней бесплатно · Без иностранной карты · Запуск за 24 часа
          </p>
        </div>

        {/* Hero agent image strip */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-8 sm:pb-12">
          <div className="grid grid-cols-5 gap-2 sm:gap-3">
            {[
              "/products/agent-1.webp",
              "/products/agent-2.webp",
              "/products/agent-3.webp",
              "/products/agent-4.webp",
              "/products/agent-5.webp",
            ].map((src, i) => (
              <div
                key={src}
                className="relative aspect-square rounded-2xl overflow-hidden border border-slate-200 bg-slate-50"
              >
                <Image
                  src={src}
                  alt={`AI агент ${i + 1}`}
                  fill
                  sizes="(min-width: 640px) 18vw, 18vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <p className="mt-3 text-[12px] sm:text-[13px] text-slate-500 text-center">
            6 готовых ИИ-агентов в одном Telegram-форуме. Каждая тема — отдельный
            агент с памятью, навыками и контекстом.
          </p>
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 pb-14 sm:pb-20">
        {/* PROBLEM */}
        <Section
          id="problem"
          eyebrow="01 · Реальность"
          title="Claude и ChatGPT в России — это марафон с препятствиями"
        >
          <p>
            С 2024 года Anthropic и OpenAI не пускают пользователей с
            российских IP, не принимают российские карты и блокируют аккаунты с
            российским номером телефона. Чтобы пользоваться Claude или ChatGPT
            из РФ, нужно одновременно решить четыре проблемы:
          </p>
          <div className="not-prose grid sm:grid-cols-2 gap-3 mt-5 mb-5">
            <PainPoint
              title="Иностранный номер"
              body="Виртуальный SIM, риск блокировки аккаунта при потере доступа к номеру. Цена номера + риск."
            />
            <PainPoint
              title="Иностранная карта"
              body="Только зарубежные банки (Казахстан, Грузия, ОАЭ, Турция). Оформление, верификация, валютный курс — минимум 2–3 недели."
            />
            <PainPoint
              title="Стабильный VPN"
              body="Бесплатные не работают, платные требуют валютной карты. Регулярно отваливается, теряешь контекст разговора."
            />
            <PainPoint
              title="Уровень техготовности"
              body="Все это нужно держать в рабочем состоянии, обновлять, переключать. Если упало — работа встала."
            />
          </div>
          <p>
            И всё это — чтобы получить базовый веб-чат с ИИ. Без интеграций, без
            памяти между сессиями, без командной работы, без подключения к
            вашим рабочим процессам.
          </p>
        </Section>

        {/* SOLUTION */}
        <Section
          id="solution"
          eyebrow="02 · Решение"
          title="GramFleet даёт ту же мощность Claude — без иностранного контура"
        >
          <p>
            GramFleet — это персональная ИИ-инфраструктура, которая живёт в
            вашем Telegram. Под капотом — те же модели Claude (Anthropic) и
            альтернативная модель GLM. Мы решили все четыре проблемы за вас и
            упаковали это в чат, которым вы уже пользуетесь каждый день.
          </p>
          <div className="not-prose grid sm:grid-cols-2 gap-3 mt-5 mb-5">
            <Solution
              title="Российский номер работает"
              body="Регистрация в Telegram — стандартная. Российский номер, российский Telegram-аккаунт, доступ без ограничений."
            />
            <Solution
              title="Оплата в рублях"
              body="Telegram Stars (карта МИР работает), ЮKassa (СБП, любая российская карта), USDT-крипта. Никаких иностранных банков."
            />
            <Solution
              title="VPN не нужен"
              body="Telegram работает в РФ. Запросы к Claude уходят с нашего сервера за пределами РФ — для вас это прозрачно."
            />
            <Solution
              title="Запуск за 24 часа"
              body="Подключаем форум-группу к GramFleet, настраиваем 6 готовых агентов под вашу задачу, обучаем команду. Завтра работаете."
            />
          </div>
        </Section>

        {/* COMPARISON TABLE */}
        <Section
          id="compare"
          eyebrow="03 · Сравнение"
          title="GramFleet vs Claude vs ChatGPT vs GigaChat"
        >
          <p>
            Честное сравнение по реальным критериям, которые имеют значение для
            пользователя из России. Цены актуальны на май 2026.
          </p>
          <div className="not-prose overflow-x-auto mt-5 rounded-2xl border border-slate-200">
            <table className="w-full border-collapse text-left min-w-[640px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-300">
                  <th
                    scope="col"
                    className="py-3 px-4 text-[13px] font-bold text-slate-900"
                  >
                    Критерий
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-4 text-[13px] font-bold"
                    style={{ color: ACCENT }}
                  >
                    GramFleet
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-4 text-[13px] font-bold text-slate-900"
                  >
                    Claude
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-4 text-[13px] font-bold text-slate-900"
                  >
                    ChatGPT
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-4 text-[13px] font-bold text-slate-900"
                  >
                    GigaChat
                  </th>
                </tr>
              </thead>
              <tbody>
                <ComparisonRow
                  feature="Доступ из РФ"
                  gramfleet={{ value: "Прямой, без VPN", tone: "good" }}
                  claude={{
                    value: "Только через VPN, аккаунт блокируют",
                    tone: "bad",
                  }}
                  chatgpt={{
                    value: "Только через VPN, аккаунт блокируют",
                    tone: "bad",
                  }}
                  gigachat={{ value: "Прямой, без VPN", tone: "good" }}
                />
                <ComparisonRow
                  feature="Российский номер телефона"
                  gramfleet={{ value: "Работает", tone: "good" }}
                  claude={{ value: "Не принимается", tone: "bad" }}
                  chatgpt={{ value: "Не принимается", tone: "bad" }}
                  gigachat={{ value: "Работает", tone: "good" }}
                />
                <ComparisonRow
                  feature="Оплата в рублях"
                  gramfleet={{
                    value: "Stars, ЮKassa, СБП, USDT",
                    tone: "good",
                  }}
                  claude={{ value: "Только иностр. карта", tone: "bad" }}
                  chatgpt={{ value: "Только иностр. карта", tone: "bad" }}
                  gigachat={{ value: "Любая российская карта", tone: "good" }}
                />
                <ComparisonRow
                  feature="Качество рассуждения"
                  gramfleet={{
                    value: "Claude Sonnet/Opus",
                    tone: "good",
                  }}
                  claude={{ value: "Claude Sonnet/Opus", tone: "good" }}
                  chatgpt={{ value: "GPT-5", tone: "good" }}
                  gigachat={{
                    value: "Заметно слабее в коде и анализе",
                    tone: "bad",
                  }}
                />
                <ComparisonRow
                  feature="Русский язык"
                  gramfleet={{
                    value: "Нативно (Claude)",
                    tone: "good",
                  }}
                  claude={{ value: "Нативно", tone: "good" }}
                  chatgpt={{ value: "Нативно", tone: "good" }}
                  gigachat={{ value: "Нативно, лучший по сленгу", tone: "good" }}
                />
                <ComparisonRow
                  feature="Интерфейс"
                  gramfleet={{
                    value: "Telegram (уже стоит на телефоне)",
                    tone: "good",
                  }}
                  claude={{
                    value: "Веб-чат, отдельные приложения",
                    tone: "neutral",
                  }}
                  chatgpt={{
                    value: "Веб-чат, отдельные приложения",
                    tone: "neutral",
                  }}
                  gigachat={{
                    value: "Веб, Telegram-бот, мобильное приложение",
                    tone: "neutral",
                  }}
                />
                <ComparisonRow
                  feature="Командная работа"
                  gramfleet={{
                    value: "До ∞ пользователей, общий форум",
                    tone: "good",
                  }}
                  claude={{
                    value: "Team-план от $25/user/мес",
                    tone: "neutral",
                  }}
                  chatgpt={{
                    value: "Team-план от $25/user/мес",
                    tone: "neutral",
                  }}
                  gigachat={{
                    value: "Индивидуальный аккаунт",
                    tone: "neutral",
                  }}
                />
                <ComparisonRow
                  feature="Память между разговорами"
                  gramfleet={{
                    value: "Долговременная, по темам",
                    tone: "good",
                  }}
                  claude={{
                    value: "Только в Projects",
                    tone: "neutral",
                  }}
                  chatgpt={{
                    value: "Память в одном чате",
                    tone: "neutral",
                  }}
                  gigachat={{ value: "Ограниченная", tone: "bad" }}
                />
                <ComparisonRow
                  feature="Голосовые ответы"
                  gramfleet={{
                    value: "Да (ElevenLabs / Edge TTS)",
                    tone: "good",
                  }}
                  claude={{ value: "Нет в РФ", tone: "bad" }}
                  chatgpt={{
                    value: "Только в мобильном приложении",
                    tone: "neutral",
                  }}
                  gigachat={{ value: "Базовый TTS", tone: "neutral" }}
                />
                <ComparisonRow
                  feature="Цена (входная)"
                  gramfleet={{
                    value: "19 900 ₽/мес (1 пользователь)",
                    tone: "good",
                  }}
                  claude={{
                    value: "$20/мес + VPN $5 + карта",
                    tone: "neutral",
                  }}
                  chatgpt={{
                    value: "$20/мес + VPN $5 + карта",
                    tone: "neutral",
                  }}
                  gigachat={{
                    value: "Бесплатно (Lite) / 290 ₽/мес (Pro)",
                    tone: "good",
                  }}
                />
                <ComparisonRow
                  feature="Запуск"
                  gramfleet={{
                    value: "24 часа, мы настраиваем",
                    tone: "good",
                  }}
                  claude={{
                    value: "2–3 недели на номер и карту",
                    tone: "bad",
                  }}
                  chatgpt={{
                    value: "2–3 недели на номер и карту",
                    tone: "bad",
                  }}
                  gigachat={{
                    value: "5 минут регистрация",
                    tone: "good",
                  }}
                />
                <ComparisonRow
                  feature="Юридический статус в РФ"
                  gramfleet={{
                    value: "Сервис из РФ, договор и счёт",
                    tone: "good",
                  }}
                  claude={{
                    value: "Нарушение ToS Anthropic",
                    tone: "bad",
                  }}
                  chatgpt={{ value: "Нарушение ToS OpenAI", tone: "bad" }}
                  gigachat={{ value: "Российская компания", tone: "good" }}
                />
              </tbody>
            </table>
          </div>

          <div className="not-prose mt-6 rounded-2xl border border-[#0088CC]/30 bg-[#0088CC]/5 p-5 sm:p-6">
            <div className="text-xs font-mono uppercase tracking-widest text-[#0088CC] mb-2">
              Итог
            </div>
            <p className="text-slate-800 m-0 leading-relaxed">
              <strong>Claude и ChatGPT</strong> — лучшие модели в мире, но
              недоступны напрямую из РФ. <strong>GigaChat</strong> — доступен,
              но заметно слабее в сложном рассуждении и коде. <strong>GramFleet</strong>{" "}
              даёт качество Claude через привычный Telegram, с оплатой в рублях
              и без VPN. Это единственный способ получить топовый ИИ из РФ
              легально и без боли.
            </p>
          </div>
        </Section>

        {/* PAYMENT METHODS */}
        <Section
          id="payment"
          eyebrow="04 · Оплата"
          title="Как платить из России"
        >
          <p>
            Четыре способа на выбор. Все работают с российских карт и счетов,
            никакой валютной обвязки.
          </p>
          <div className="not-prose grid sm:grid-cols-2 gap-3 mt-5">
            <PayCard
              meta="Самое простое"
              title="Telegram Stars"
              highlight
              body="Покупаете Stars прямо в Telegram (карта МИР работает в Apple Pay / Google Pay), оплачиваете GramFleet одним кликом внутри бота. Чек выдаёт Telegram."
            />
            <PayCard
              meta="Для бизнеса"
              title="ЮKassa (СБП и карта)"
              body="Оплата картой любого российского банка или СБП. Закрывающие документы (счёт, акт), договор на юр. лицо или ИП — высылаем по запросу."
            />
            <PayCard
              meta="Анонимно"
              title="USDT (TRC-20 / TON)"
              body="Перевод USDT в Telegram-кошелёк или на наш адрес. Подходит для тех, кто хочет максимальной приватности и быстрой оплаты без банка."
            />
            <PayCard
              meta="Скоро"
              title="Tinkoff / Сбер прямой эквайринг"
              body="Подключаем прямой эквайринг через ЮKassa и Tinkoff Pay. Будет автоматическое списание, рекуррентные платежи, чеки по 54-ФЗ."
            />
          </div>

          <div className="not-prose mt-6 rounded-2xl border border-slate-200 bg-slate-50/50 p-5 sm:p-6">
            <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-3">
              Текущие тарифы (в рублях)
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <div className="font-bold text-slate-900">Lite</div>
                <div className="text-[#0088CC] font-mono text-2xl font-extrabold mt-1">
                  19 900 ₽
                  <span className="text-sm text-slate-500 font-normal">
                    /мес
                  </span>
                </div>
                <div className="text-[13px] text-slate-600 mt-2">
                  Модель GLM, 1 пользователь, 6 готовых агентов, 20+ навыков.
                </div>
              </div>
              <div>
                <div className="font-bold text-slate-900">Standard</div>
                <div className="text-[#0088CC] font-mono text-2xl font-extrabold mt-1">
                  49 900 ₽
                  <span className="text-sm text-slate-500 font-normal">
                    /мес
                  </span>
                </div>
                <div className="text-[13px] text-slate-600 mt-2">
                  Claude Sonnet, 3 пользователя, 11 агентов, голос, 4ч SLA.
                </div>
              </div>
              <div>
                <div className="font-bold text-slate-900">Premium</div>
                <div className="text-[#0088CC] font-mono text-2xl font-extrabold mt-1">
                  89 900 ₽
                  <span className="text-sm text-slate-500 font-normal">
                    /мес
                  </span>
                </div>
                <div className="text-[13px] text-slate-600 mt-2">
                  Claude Opus + Sonnet, ∞ пользователей, кастомные навыки, 2ч SLA,
                  white-label.
                </div>
              </div>
            </div>
            <p className="text-[12px] text-slate-500 mt-4 m-0">
              Цены в рублях фиксированы в момент оплаты. Привязка к курсу
              отсутствует — мы держим стоимость стабильной.
            </p>
          </div>
        </Section>

        {/* FAQ */}
        <Section
          id="faq"
          eyebrow="05 · Часто спрашивают"
          title="Про VPN, Telegram-мосты и юридический статус"
        >
          <div className="not-prose flex flex-col gap-3 mt-5">
            <Faq
              q="Зачем GramFleet, если можно купить Claude через VPN и иностранную карту?"
              a={
                <>
                  <p>
                    Технически можно, но это значит постоянно поддерживать:
                    виртуальный иностранный номер, иностранную карту с
                    пополнением, стабильный VPN, риск блокировки аккаунта при
                    любой ошибке. GramFleet снимает все четыре риска: вы
                    используете обычный Telegram с российским номером, платите в
                    рублях, и при этом получаете Claude-уровень рассуждения.
                  </p>
                </>
              }
            />
            <Faq
              q="GramFleet — это VPN или Telegram-мост?"
              a={
                <>
                  <p>
                    Ни то, ни другое. Это полноценный продукт: Telegram-форум,
                    подключённый к нашей инфраструктуре. Запросы к моделям
                    Anthropic уходят с наших серверов за пределами РФ — для вас
                    это полностью прозрачно. На стороне пользователя — только
                    Telegram, в котором вы и так общаетесь каждый день.
                  </p>
                </>
              }
            />
            <Faq
              q="Это законно в России?"
              a={
                <>
                  <p>
                    Да. GramFleet — это IT-сервис, оказывающий услуги
                    обработки данных. Telegram официально работает в РФ, наши
                    серверы расположены за пределами РФ, договор с конечным
                    пользователем заключается с нашим юр. лицом. Никаких
                    законов вы не нарушаете, в отличие от прямого использования
                    Claude через VPN (это нарушение ToS Anthropic, не закон РФ).
                  </p>
                </>
              }
            />
            <Faq
              q="Какие данные уходят за пределы РФ?"
              a={
                <>
                  <p>
                    Только текст вашего диалога, который вы отправляете
                    агенту — он уходит в Anthropic API для обработки. Anthropic
                    контрактно не использует API-трафик для обучения моделей.
                    Голос (опционально) идёт в ElevenLabs или Microsoft Edge
                    TTS. Все технические детали — на странице{" "}
                    <Link href="/security" className="text-[#0088CC] underline">
                      Security &amp; Privacy
                    </Link>
                    .
                  </p>
                </>
              }
            />
            <Faq
              q="Можно работать с персональными данными клиентов?"
              a={
                <>
                  <p>
                    Технически — можно, но это ваша ответственность как
                    оператора ПД. Мы предоставляем DPA-шаблон (GDPR Article 28)
                    и стандартный договор обработки данных по 152-ФЗ. Для
                    работы с ПД 1-го уровня рекомендуем разворачивать GramFleet
                    на ваших серверах (Premium-тариф, self-hosted) — тогда
                    данные физически не покидают вашего контура.
                  </p>
                </>
              }
            />
            <Faq
              q="Что если Anthropic заблокирует наш сервер?"
              a={
                <>
                  <p>
                    У нас несколько маршрутов: основной через Anthropic API,
                    резервный через альтернативную модель GLM (открытые веса,
                    self-hosted). Если основной маршрут падает — переключение
                    на резервный происходит автоматически в течение секунд.
                    Качество ответов слегка снижается, но работа не
                    останавливается. На Premium-тарифе мы держим обе модели в
                    активном состоянии.
                  </p>
                </>
              }
            />
            <Faq
              q="GigaChat дешевле — почему не он?"
              a={
                <>
                  <p>
                    GigaChat хорош для простых задач: ответить на вопрос,
                    написать пост, перевести текст. Когда нужно сложное
                    рассуждение, работа с кодом, многошаговые задачи или
                    глубокий анализ — разница с Claude становится очевидной за
                    5 минут использования. Мы рекомендуем GigaChat если ваши
                    задачи простые. GramFleet — если хотите лучшее из доступного
                    в РФ.
                  </p>
                </>
              }
            />
            <Faq
              q="Что если я в России, но плачу с зарубежной карты?"
              a={
                <>
                  <p>
                    Принимаем. Через основной сайт{" "}
                    <Link href="/" className="text-[#0088CC] underline">
                      gramfleet.ai
                    </Link>{" "}
                    — оплата в USD от $199/мес. Условия и тарифы те же,
                    конвертация по курсу платёжной системы.
                  </p>
                </>
              }
            />
            <Faq
              q="Можно ли получить чек и закрывающие документы для ООО?"
              a={
                <>
                  <p>
                    Да. ЮKassa выдаёт фискальный чек, мы выставляем счёт,
                    подписываем договор и закрывающий акт. Работаем как с ООО,
                    так и с ИП. УСН-режим, НДС не выделяется. Для запроса —
                    напишите{" "}
                    <a
                      href="mailto:billing@gramfleet.ai"
                      className="text-[#0088CC] underline"
                    >
                      billing@gramfleet.ai
                    </a>
                    .
                  </p>
                </>
              }
            />
            <Faq
              q="Что если я хочу попробовать сначала?"
              a={
                <>
                  <p>
                    7 дней бесплатного триала на тарифе Lite, без привязки
                    карты. Подключаем форум-группу, активируем 2 агента,
                    показываем как это работает. Если не подошло — просто
                    выключаем, никаких списаний.
                  </p>
                </>
              }
            />
          </div>
        </Section>

        {/* HOW IT WORKS */}
        <Section
          id="how"
          eyebrow="06 · Как начать"
          title="Запуск за 24 часа"
        >
          <ol className="not-prose grid sm:grid-cols-3 gap-4 mt-5 list-none p-0">
            {[
              {
                step: "01",
                title: "Заявка в Telegram",
                body: "Открываете нашего бота, оставляете контакт, выбираете задачу. 5 минут.",
              },
              {
                step: "02",
                title: "Discovery-звонок",
                body: "30 минут — мы изучаем ваш workflow, подбираем агентов под задачу, обсуждаем тариф. Бесплатно.",
              },
              {
                step: "03",
                title: "Запуск форума",
                body: "Настраиваем форум-группу с агентами, обучаем команду, передаём ключи. 24 часа от оплаты.",
              },
            ].map((s) => (
              <li
                key={s.step}
                className="rounded-2xl border border-slate-200 p-5"
              >
                <div className="text-xs font-mono uppercase tracking-widest text-[#0088CC] mb-2">
                  Шаг {s.step}
                </div>
                <div className="font-bold text-slate-900 mb-2">{s.title}</div>
                <p className="text-[14px] text-slate-700 m-0 leading-relaxed">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </Section>

        {/* CTA */}
        <section className="rounded-3xl border border-[#0088CC]/30 bg-[linear-gradient(135deg,rgba(42,171,238,0.10),rgba(0,136,204,0.05))] p-6 sm:p-12 text-center mt-4">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-4 text-slate-900 leading-tight">
            Готовы попробовать Claude-уровень в Telegram?
          </h2>
          <p className="text-base sm:text-lg text-slate-700 mb-7 max-w-xl mx-auto">
            7 дней бесплатно. Без иностранной карты. Без VPN. Запуск за 24 часа.
            Если не подошло — выключаем без вопросов.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://t.me/GramFleetBot"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full text-white font-bold px-6 sm:px-8 py-3.5 sm:py-4 text-base sm:text-[17px] hover:scale-[1.02] transition-transform shadow-[0_18px_44px_-10px_rgba(42,171,238,0.55)]"
              style={{
                background: "linear-gradient(135deg,#2AABEE 0%,#0088CC 100%)",
              }}
            >
              Открыть GramFleet в Telegram →
            </a>
            <a
              href="mailto:hi@gramfleet.ai?subject=GramFleet%20для%20РФ"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 text-slate-700 font-semibold px-6 sm:px-8 py-3.5 sm:py-4 text-base sm:text-[17px] hover:border-[#0088CC] hover:text-[#0088CC] transition-colors"
            >
              hi@gramfleet.ai
            </a>
          </div>
        </section>
      </article>

      <footer className="border-t border-slate-200 py-10 text-center text-sm text-slate-500">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-center gap-4 mb-3">
            <Link href="/" className="text-[#0088CC] hover:underline">
              ← GramFleet (EN)
            </Link>
            <span className="text-slate-300">·</span>
            <Link href="/security" className="hover:text-slate-900">
              Security &amp; Privacy
            </Link>
            <span className="text-slate-300">·</span>
            <a
              href="https://t.me/GramFleetBot"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900"
            >
              Telegram
            </a>
          </div>
          <div className="text-xs text-slate-400">
            © 2026 GramFleet · ИИ-команда для бизнеса в России. Claude — товарный
            знак Anthropic PBC. ChatGPT — товарный знак OpenAI OpCo, LLC.
            GigaChat — товарный знак ПАО Сбербанк. Имена использованы для
            сравнения функционала.
          </div>
        </div>
      </footer>

      <span
        className="hidden"
        data-accent={ACCENT}
        data-accent-light={ACCENT_LIGHT}
        aria-hidden
      />
    </main>
  );
}
