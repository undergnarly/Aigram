/**
 * Bilingual content map for the GramFleet landing page.
 * Keep this file as the single source of editorial truth. Section components
 * accept the `c` object (one language already resolved) so nothing else in
 * the tree has to know which language is active.
 */

export type Lang = "en" | "ru";

export const LANGS: readonly Lang[] = ["en", "ru"] as const;
export const LANG_LABEL: Record<Lang, string> = { en: "EN", ru: "RU" };

export type ProductSlug =
  | "planner"
  | "researcher"
  | "automator"
  | "analyst"
  | "concierge"
  | "developer";

type SubscriptionPlan = {
  name: string;
  tag?: string;
  setupPrice: string;
  monthlyPrice: string;
  buildTime: string;
  includes: string[];
  forWho: string;
  cta: string;
  ctaStyle?: "primary" | "outline";
};

type SubscriptionPlanSection = {
  toggle: { setupOnly: string; setupMonthly: string; monthlyOnly: string };
  plans: SubscriptionPlan[];
  compatTitle: string;
  compatCaption: string;
  compatRows: { module: string; light: string; standard: string; premium: string }[];
};

export const PRODUCT_ORDER: ProductSlug[] = [
  "planner",
  "researcher",
  "automator",
  "analyst",
  "developer",
  "concierge",
];

type ProductContent = {
  num: string;
  badge: string;
  badgeKind: "default" | "popular" | "new";
  name: string;
  tagline: string;
  hook: string;
  bullets: string[];
  fromPrice: string;
  delivery: string;
  image: string;
  tiers: {
    name: string;
    price: string;
    delivery: string;
    features: string[];
    highlight?: boolean;
  }[];
};

type LangContent = {
  meta: {
    skipToContent: string;
    openMenu: string;
    closeMenu: string;
    language: string;
    bookCta: string;
    seeProductsCta: string;
    yearTag: string;
  };
  nav: {
    products: string;
    pricing: string;
    process: string;
    faq: string;
    cta: string;
    telegram: string;
    telegramHref: string;
  };
  hero: {
    eyebrow: string;
    h1Lines: string[]; // last line gets gradient
    lead: string;
    primary: string;
    secondary: string;
    trustLabel: string;
    trustItems: string[];
  };
  social: {
    label: string;
    items: string[];
  };
  productsSection: {
    eyebrow: string;
    h2: string;
    sub: string;
    perCard: {
      from: string;
      delivery: string;
      learnMore: string;
    };
  };
  products: Record<ProductSlug, ProductContent>;
  metrics: {
    eyebrow: string;
    h2: string;
    sub: string;
    items: { value: string; label: string; detail: string }[];
  };
  features: {
    eyebrow: string;
    h2: string;
    sub: string;
    items: { title: string; body: string; tag: string }[];
  };
  process: {
    eyebrow: string;
    h2: string;
    sub: string;
    steps: { step: string; title: string; body: string }[];
  };
  pricing: {
    eyebrow: string;
    h2: string;
    sub: string;
    productTab: string;
    chooseTier: string;
    pickThis: string;
    popular: string;
    talkToUs: string;
    moneyBack: string;
    note: string;
  };
  faq: {
    eyebrow: string;
    h2: string;
    sub: string;
    items: { q: string; a: string }[];
  };
  finalCta: {
    eyebrow: string;
    h2: string;
    sub: string;
    formTitle: string;
    fields: {
      nameLabel: string;
      namePh: string;
      emailLabel: string;
      emailPh: string;
      phoneLabel: string;
      phonePh: string;
      dateLabel: string;
      dateHelp: string;
      contextLabel: string;
      contextPh: string;
      productLabel: string;
    };
    submit: string;
    submitting: string;
    success: string;
    successSub: string;
    error: string;
    reassurance: string[];
    promo: {
      tag: string;
      title: string;
      sub: string;
      expires: string;
      expired: string;
    };
    modal: {
      eyebrow: string;
      title: string;
      sub: string;
      backToProduct: string;
      tierEyebrow: string;
      regularPrice: string;
      yourPrice: string;
      includedTitle: string;
    };
  };
  footer: {
    tagline: string;
    columns: { title: string; links: { label: string; href: string }[] }[];
    rights: string;
    contact: string;
  };
  mobileCta: string;
  subscriptionPlan: SubscriptionPlanSection;
  demo: {
    eyebrow: string;
    h2: string;
    sub: string;
    botOnline: string;
    setupIn: string;
    setupInLabel: string;
    topicsLabel: string;
    openForRequests: string;
    readOnlyPlaceholder: string;
    requestPlaceholder: string;
    openDemoCta: string;
    requestSetupCta: string;
    footerNote: string;
    userTyping: string;
  };
};

const PRICE_RANGES = {
  planner: { from: "$199/mo", delivery: { en: "24h setup", ru: "24ч настройка" } },
  researcher: { from: "$199/mo", delivery: { en: "24h setup", ru: "24ч настройка" } },
  automator: { from: "$499/mo", delivery: { en: "24h setup", ru: "24ч настройка" } },
  analyst: { from: "$499/mo", delivery: { en: "24h setup", ru: "24ч настройка" } },
  developer: { from: "$499/mo", delivery: { en: "24h setup", ru: "24ч настройка" } },
  concierge: { from: "$899/mo", delivery: { en: "48h setup", ru: "48ч настройка" } },
};

// ---------------- EN ----------------
const EN: LangContent = {
  meta: {
    skipToContent: "Skip to content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
    bookCta: "Get Started",
    seeProductsCta: "See agents",
    yearTag: "Built for operators in 2026",
  },
  nav: {
    products: "Agents",
    pricing: "Pricing",
    process: "Process",
    faq: "FAQ",
    cta: "Get Started",
    telegram: "Message on Telegram",
    telegramHref: "https://t.me/gramfleet_bot",
  },
  hero: {
    eyebrow: "AI Team Infrastructure for Telegram",
    h1Lines: ["Your AI team", "lives inside", "Telegram"],
    lead:
      "Replace your research tools, task manager, lead tracker, and part-time VA — with six AI specialists who live inside your Telegram. Each forum topic is a different expert with isolated memory and real tools. Setup in 24 hours. Zero learning curve.",
    primary: "Book Discovery Call",
    secondary: "See Demo",
    trustLabel: "Built for operators in",
    trustItems: ["Replaces Notion + Zapier + VA", "Setup in 24 hours", "30-day money-back"],
  },
  social: {
    label: "Replaces your SaaS stack — or plugs into it. Your team keeps using Telegram.",
    items: [
      "Telegram",
      "Claude",
      "GLM",
      "Google Drive",
      "Notion",
      "HubSpot",
      "Stripe",
      "Linear",
      "Gmail",
    ],
  },
  productsSection: {
    eyebrow: "Six agents + your own",
    h2: "One Telegram group. Six AI agents. Plus a custom one we build for you.",
    sub: "Each agent lives in its own forum topic with isolated memory, scoped skills, and a specific job. Standard includes one Custom Agent we build around your exact workflow — your industry, your clients, your processes. Premium scales to three.",
    perCard: { from: "From", delivery: "Setup", learnMore: "Open details" },
  },
  products: {
    planner: {
      num: "01",
      badge: "Daily driver",
      badgeKind: "default",
      name: "AI Planner",
      tagline: "Plans, tasks, and goals — in Telegram.",
      hook: "Plans, tasks, goals tracker in your Telegram. Smart reminders, progress bars, project boards.",
      bullets: [
        "Plans, tasks, and goals tracker inside Telegram",
        "Smart reminders that learn your rhythm",
        "Progress bars and project boards in-chat",
        "Daily and weekly review prompts",
      ],
      fromPrice: PRICE_RANGES.planner.from,
      delivery: PRICE_RANGES.planner.delivery.en,
      image: "/products/agent-1.webp",
      tiers: [
        {
          name: "Lite",
          price: "$199/mo",
          delivery: "24h setup",
          features: ["Basic plans + tasks", "Smart reminders", "1 user", "Default boards"],
        },
        {
          name: "Standard",
          price: "$499/mo",
          delivery: "24h setup",
          features: ["Everything in Lite", "Voice capture", "3 users", "Custom boards"],
          highlight: true,
        },
        {
          name: "Premium",
          price: "$899/mo",
          delivery: "48h setup",
          features: ["Everything in Standard", "Unlimited users", "Quarterly strategy session", "White-label"],
        },
      ],
    },
    researcher: {
      num: "02",
      badge: "Most popular",
      badgeKind: "popular",
      name: "AI Researcher",
      tagline: "Deep research on demand.",
      hook: "Deep research, web scraping, OSINT, competitive analysis — on demand in Telegram.",
      bullets: [
        "Deep research with citations sent to your topic",
        "Web scraping and OSINT for any target",
        "Competitive analysis on schedule or on demand",
        "Searchable archive of every brief",
      ],
      fromPrice: PRICE_RANGES.researcher.from,
      delivery: PRICE_RANGES.researcher.delivery.en,
      image: "/products/agent-2.webp",
      tiers: [
        {
          name: "Lite",
          price: "$199/mo",
          delivery: "24h setup",
          features: ["Daily research briefs", "Web scraping (50 pages/day)", "1 user", "Archive search"],
        },
        {
          name: "Standard",
          price: "$499/mo",
          delivery: "24h setup",
          features: ["Everything in Lite", "OSINT + dossiers", "3 users", "Voice query"],
          highlight: true,
        },
        {
          name: "Premium",
          price: "$899/mo",
          delivery: "48h setup",
          features: ["Everything in Standard", "Unlimited users", "Custom data sources", "Dedicated analyst"],
        },
      ],
    },
    automator: {
      num: "03",
      badge: "Pro",
      badgeKind: "default",
      name: "AI Automator",
      tagline: "Workflows that run themselves.",
      hook: "Automate workflows, process leads, schedule tasks, send reports — all via Telegram bot.",
      bullets: [
        "Automate routine workflows end-to-end",
        "Process leads from form to CRM with no clicks",
        "Schedule tasks and send daily reports",
        "Approval steps land in your Telegram topic",
      ],
      fromPrice: PRICE_RANGES.automator.from,
      delivery: PRICE_RANGES.automator.delivery.en,
      image: "/products/agent-3.webp",
      tiers: [
        {
          name: "Lite",
          price: "$199/mo",
          delivery: "24h setup",
          features: ["3 workflows", "Lead processing", "1 user", "Daily report"],
        },
        {
          name: "Standard",
          price: "$499/mo",
          delivery: "24h setup",
          features: ["Everything in Lite", "10 workflows", "3 users", "Voice triggers"],
          highlight: true,
        },
        {
          name: "Premium",
          price: "$899/mo",
          delivery: "48h setup",
          features: ["Everything in Standard", "Unlimited workflows", "2 custom skills/year", "Priority bug fixes"],
        },
      ],
    },
    analyst: {
      num: "04",
      badge: "Business intelligence",
      badgeKind: "default",
      name: "AI Analyst",
      tagline: "Your daily KPI digest.",
      hook: "Business dashboard, KPI tracking, team analytics — summarized in your Telegram daily.",
      bullets: [
        "Business dashboard summarized to your topic daily",
        "KPI tracking across every connected tool",
        "Team analytics with anomaly callouts",
        "Forecasts and trend summaries on demand",
      ],
      fromPrice: PRICE_RANGES.analyst.from,
      delivery: PRICE_RANGES.analyst.delivery.en,
      image: "/products/agent-4.webp",
      tiers: [
        {
          name: "Lite",
          price: "$199/mo",
          delivery: "24h setup",
          features: ["Daily KPI digest", "5 connected tools", "1 user", "Basic mini-app"],
        },
        {
          name: "Standard",
          price: "$499/mo",
          delivery: "24h setup",
          features: ["Everything in Lite", "Anomaly alerts", "3 users", "Standard mini-app"],
          highlight: true,
        },
        {
          name: "Premium",
          price: "$899/mo",
          delivery: "48h setup",
          features: ["Everything in Standard", "Unlimited users", "Custom mini-app", "Quarterly strategy session"],
        },
      ],
    },
    developer: {
      num: "05",
      badge: "Builds for you",
      badgeKind: "new",
      name: "AI Developer",
      tagline: "Code, websites, integrations — on demand.",
      hook: "Ask in plain English. The agent scaffolds the project, writes the code, deploys it, and sends you the live link.",
      bullets: [
        "Builds landing pages, dashboards, internal tools from a single prompt",
        "Writes integrations between your CRM, Telegram, Stripe, calendars",
        "Live progress in the topic — you see what it's doing in real time",
        "Final result delivered as a working URL + private repo",
      ],
      fromPrice: PRICE_RANGES.developer.from,
      delivery: PRICE_RANGES.developer.delivery.en,
      image: "/products/agent-4.webp",
      tiers: [
        {
          name: "Lite",
          price: "$199/mo",
          delivery: "24h setup",
          features: ["3 small tasks / month", "Landing pages + simple integrations", "1 user", "Public repo"],
        },
        {
          name: "Standard",
          price: "$499/mo",
          delivery: "24h setup",
          features: ["Everything in Lite", "Unlimited tasks", "3 users", "Private repo + Netlify deploys"],
          highlight: true,
        },
        {
          name: "Premium",
          price: "$899/mo",
          delivery: "48h setup",
          features: ["Everything in Standard", "Unlimited users", "Custom infra (your domain, your DB)", "Priority engineer review"],
        },
      ],
    },
    concierge: {
      num: "06",
      badge: "White-label",
      badgeKind: "new",
      name: "AI Concierge",
      tagline: "Your brand. Your assistant.",
      hook: "Custom AI assistant with your brand voice, knowledge base, and workflows. Full white-label.",
      bullets: [
        "Custom AI assistant trained on your brand voice",
        "Private knowledge base scoped to your business",
        "Custom workflows wired into your Telegram group",
        "Full white-label — your domain, your bot, your colors",
      ],
      fromPrice: PRICE_RANGES.concierge.from,
      delivery: PRICE_RANGES.concierge.delivery.en,
      image: "/products/agent-5.webp",
      tiers: [
        {
          name: "Lite",
          price: "$899/mo",
          delivery: "48h setup",
          features: ["Brand voice tuning", "Custom knowledge base", "1 user", "Standard mini-app"],
        },
        {
          name: "Standard",
          price: "$1,499/mo",
          delivery: "5 day setup",
          features: ["Everything in Lite", "Custom workflows (5)", "5 users", "Branded mini-app"],
          highlight: true,
        },
        {
          name: "Premium",
          price: "$2,499/mo",
          delivery: "10 day setup",
          features: ["Everything in Standard", "Unlimited workflows", "Unlimited users", "Dedicated success manager"],
        },
      ],
    },
  },
  metrics: {
    eyebrow: "Outcomes",
    h2: "Why operators choose GramFleet.",
    sub: "Targets built from beta testing and founder interviews. Numbers update as clients report real results.",
    items: [
      { value: "5", label: "SaaS tools replaced", detail: "Notion for tasks, Zapier for automation, ChatGPT for research, a research subscription, and a part-time VA — all running in one Telegram group." },
      { value: "24h", label: "Setup time", detail: "From Discovery Call to a fully wired AI team in your Telegram group — twenty-four hours, no exceptions." },
      { value: "15h", label: "Saved per week", detail: "Research, reporting, lead follow-ups, task tracking — the routine work that eats founder hours moves to your agents automatically." },
      { value: "47%", label: "Leads lost to slow follow-up", detail: "Almost half of small teams lose clients because no one responded fast enough. Your AI Automator responds in 30 seconds, every time." },
    ],
  },
  features: {
    eyebrow: "Built-in",
    h2: "Five things you get out of the box.",
    sub: "Not roadmap items — already in production. Battle-tested in our live beta groups today.",
    items: [
      {
        tag: "Voice",
        title: "Voice responses on tap",
        body: "Every agent can reply with voice notes. Edge TTS with Svetlana and Dmitry, per-topic toggle — turn voice on for your Planner, leave it off in the Analyst. Drives ten times the engagement vs. text-only.",
      },
      {
        tag: "Onboarding",
        title: "30-second smart onboarding",
        body: "Owner answers one question — 'what's your business about?' The bot drafts the topic plan, names each agent, and ships a Telegram keyboard with one-tap actions. From install to first reply in under a minute.",
      },
      {
        tag: "Team",
        title: "Whole-team access",
        body: "Every member of your authorized group works with the agents — no per-seat invites, no juggling logins. Owner gets DM-level controls. Unauthorized groups are blocked automatically so the bot can't be hijacked.",
      },
      {
        tag: "Uptime",
        title: "Updates without downtime",
        body: "We push improvements through a safe-restart orchestrator that drains in-flight requests, swaps the process, and reattaches sessions. You never see a maintenance window — agents stay on the chat the whole time.",
      },
      {
        tag: "Languages",
        title: "10 languages, native quality",
        body: "Interface and agent replies fully localized in 10 languages — Russian, English, Spanish, Portuguese, French, German, Italian, Indonesian, Turkish, and Polish. Your team can write in any of them, the agent matches.",
      },
    ],
  },
  process: {
    eyebrow: "Process",
    h2: "Discovery → 24h Setup → Start Using → Support.",
    sub: "Four steps. No long-tail onboarding. You leave with a working AI team — and we keep it running.",
    steps: [
      { step: "01", title: "Discovery Call", body: "We study your workflow, map the right agents for your team, and design your Custom Agent from scratch. Free, thirty minutes, zero commitment." },
      { step: "02", title: "24h Setup", body: "We deploy your AI infrastructure, connect your Telegram group, configure every agent, and load your knowledge base. You follow progress live." },
      { step: "03", title: "Start Using", body: "Your team starts day one. The AI picks up your patterns, tone, and decisions in the first weeks — it gets sharper without manual tuning." },
      { step: "04", title: "Ongoing Support", body: "Dedicated human support and regular tuning. We monitor your agents around the clock, fix edge cases, and keep everything at peak performance." },
    ],
  },
  pricing: {
    eyebrow: "Pricing",
    h2: "Three plans. Monthly. Cancel anytime.",
    sub: "Most teams start on Standard. The $1,000 setup fee is waived when you prepay 3 months — most operators recover the cost in the first month from time saved alone.",
    productTab: "Agent",
    chooseTier: "Choose plan",
    pickThis: "Choose this plan",
    popular: "Recommended",
    talkToUs: "Talk to us",
    moneyBack: "30-day money-back guarantee on every plan",
    note: "Prices in USD. International invoicing available. Larger or custom deployments — book a Discovery Call.",
  },
  faq: {
    eyebrow: "FAQ",
    h2: "Common questions before signing up.",
    sub: "Short, honest answers. Anything else — book a Discovery Call.",
    items: [
      {
        q: "What is GramFleet?",
        a: "GramFleet is AI Team Infrastructure for Telegram. Every forum topic in your business group becomes an isolated AI agent with its own memory, skills, and context. Your AI team — without dashboards, without new apps, without context switching.",
      },
      {
        q: "Do I need technical skills?",
        a: "No. If you can use Telegram, you can use GramFleet. We configure everything for you on the Discovery Call and during the 24-hour setup window. You and your team just keep using Telegram the way you already do.",
      },
      {
        q: "Is my data secure?",
        a: "Yes. GramFleet runs on your own server inside an encrypted Docker container — your data never leaves your infrastructure. Topic memory and your knowledge base are scoped to your group, not shared with any third party, and never used to train public models. You can export or delete everything at any time.",
      },
      {
        q: "What AI model do you use?",
        a: "Lite uses GLM. Standard uses Claude Sonnet with automatic GLM fallback for resilience. Premium uses Claude Opus as the primary model, with Sonnet and GLM as fallback tiers. You always get the best model available within your plan.",
      },
      {
        q: "Can I cancel anytime?",
        a: "Yes. Month-to-month subscription, cancel anytime from the Telegram bot itself. We refund the last month within 30 days if it isn't working for you — no arbitration, no clawback.",
      },
      {
        q: "What is a topic agent?",
        a: "A topic agent is a dedicated AI assistant assigned to a single forum topic in your Telegram group. Each topic has its own isolated memory, its own scoped skills, and its own job — calendar, plans, research, analytics, or anything custom. Switch topics, switch context. No prompts to write.",
      },
      {
        q: "Why not just use ChatGPT for $20/mo?",
        a: "ChatGPT is a single conversation thread — no persistent memory between sessions, no real tools, no team access. GramFleet gives you 6 isolated specialists, each of which remembers everything since day one, runs 40+ live skills (web scraping, code execution, calendar, KPI reports), and lets your whole team work with them simultaneously. It's the difference between one generalist intern and a trained department that never forgets.",
      },
      {
        q: "How is this different from Hermify or other Telegram AI bots?",
        a: "Hermify connects one AI model to one Telegram bot — one agent, one context, one job. GramFleet deploys a team: each forum topic is a different specialist with isolated memory and dedicated skills. The difference matters in practice — your Researcher doesn't bleed context into your Planner, your Automator doesn't slow down when the Analyst is running a report. Per-topic isolation is the architecture — no other managed product offers it.",
      },
    ],
  },
  finalCta: {
    eyebrow: "Start here",
    h2: "Start your AI team in 24 hours.",
    sub: "Free 30-minute Discovery Call. We map your workflow, configure your topic structure, and have you running before this time tomorrow.",
    formTitle: "Tell us about your business",
    fields: {
      nameLabel: "Name",
      namePh: "Your full name",
      emailLabel: "Work email",
      emailPh: "you@company.com",
      phoneLabel: "Telegram handle (optional)",
      phonePh: "@yourname",
      dateLabel: "Preferred time",
      dateHelp: "We'll confirm a slot within one business day.",
      contextLabel: "What are you trying to fix?",
      contextPh: "One sentence on the bottleneck. (Optional)",
      productLabel: "Agent you're interested in",
    },
    submit: "Book Discovery Call",
    submitting: "Sending…",
    success: "You're in.",
    successSub: "We'll confirm the call within one business day. Watch your inbox.",
    error: "Something went wrong. Email hello@gramfleet.ai directly and we'll sort it.",
    reassurance: [
      "30 minutes, free, no deck",
      "Setup in 24 hours",
      "30-day money-back guarantee on every plan",
    ],
    promo: {
      tag: "Today only",
      title: "10% off your first 3 months",
      sub: "Book in the next 15 minutes — discount auto-applied to your subscription.",
      expires: "Offer expires in",
      expired: "Don't worry — book today and we'll still apply the discount.",
    },
    modal: {
      eyebrow: "You're booking",
      title: "Lock your spot in 30 seconds.",
      sub: "Leave a Telegram handle or email and a time that suits — we'll confirm within one business day.",
      backToProduct: "Browse other agents",
      tierEyebrow: "You're choosing",
      regularPrice: "Regular",
      yourPrice: "Your price",
      includedTitle: "What's included",
    },
  },
  footer: {
    tagline: "AI team inside your Telegram. AI Team Infrastructure for business.",
    columns: [
      {
        title: "Agents",
        links: [
          { label: "AI Planner", href: "#products" },
          { label: "AI Researcher", href: "#products" },
          { label: "AI Automator", href: "#products" },
          { label: "AI Analyst", href: "#products" },
          { label: "AI Concierge", href: "#products" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "Process", href: "#process" },
          { label: "Pricing", href: "#pricing" },
          { label: "FAQ", href: "#faq" },
          { label: "Get Started", href: "#book" },
        ],
      },
      {
        title: "Contact",
        links: [
          { label: "hello@gramfleet.ai", href: "mailto:hello@gramfleet.ai" },
          { label: "Telegram", href: "https://t.me/gramfleet_bot" },
          { label: "LinkedIn", href: "#" },
        ],
      },
    ],
    rights: "© 2026 GramFleet · All rights reserved",
    contact: "hello@gramfleet.ai",
  },
  mobileCta: "Get Started",
  subscriptionPlan: {
    toggle: {
      setupOnly: "Setup only",
      setupMonthly: "Setup + Monthly",
      monthlyOnly: "Monthly only",
    },
    plans: [
      {
        name: "Lite",
        setupPrice: "Free",
        monthlyPrice: "$199 / mo",
        buildTime: "24h",
        includes: [
          "GLM AI model",
          "1 user",
          "6 default topics (calendar, plans, goals, notes, diary, dashboard)",
          "20+ built-in skills",
          "Bilingual interface (EN + RU)",
          "Voice input — speak, get a text reply",
          "Encrypted storage, isolated topic memory",
          "AI support 24/7",
          "2h human support / month",
          "Basic mini-app",
        ],
        forWho: "Solo founders, freelancers, small operators getting started",
        cta: "Start with Lite",
        ctaStyle: "outline" as const,
      },
      {
        name: "Standard",
        tag: "Recommended",
        setupPrice: "$1,000 (free with 3mo prepay)",
        monthlyPrice: "$499 / mo",
        buildTime: "24h",
        includes: [
          "Claude Sonnet + GLM auto-fallback",
          "3 users",
          "11 topics (6 default + 5 custom)",
          "40+ built-in skills",
          "Full interface i18n (EN, RU, +1 on request)",
          "Voice messages — input and voice reply via /voice",
          "Encrypted storage, per-topic isolation, audit log, safe restart",
          "Standard mini-app",
          "5h human support / month",
          "4h response SLA",
          "1 Custom Agent (we build it for your workflow)",
        ],
        forWho: "Growing teams of 3-15 people, founders who want their hours back",
        cta: "Book Discovery Call",
        ctaStyle: "primary" as const,
      },
      {
        name: "Premium",
        setupPrice: "$2,500",
        monthlyPrice: "$899 / mo",
        buildTime: "48h",
        includes: [
          "Claude Opus + Sonnet + GLM",
          "Unlimited users",
          "Unlimited topics",
          "Up to 3 Custom Agents (we build them for you)",
          "2 custom skills per year included",
          "Multilingual interface — any language on request",
          "Voice messages everywhere + custom voice profile (ElevenLabs)",
          "Hardened security: encryption, isolation, audit, custom retention, SSO/SAML on request",
          "Custom branded mini-app",
          "10h human support / month",
          "2h response SLA",
          "Quarterly strategy session",
          "Priority bug fixes",
        ],
        forWho: "Mid-sized businesses, brands that need white-label and dedicated support",
        cta: "Book a meeting",
        ctaStyle: "outline" as const,
      },
    ],
    compatTitle: "What's included at each level",
    compatCaption:
      "Each plan includes a different combination of agents and skills. The recommended tier depends on your team size and bottlenecks. We help you pick on the Discovery Call.",
    compatRows: [
      { module: "AI Planner", light: "Yes", standard: "Yes", premium: "Yes" },
      { module: "AI Researcher", light: "Basic", standard: "Full", premium: "Full" },
      { module: "AI Automator", light: "—", standard: "10 workflows", premium: "Unlimited" },
      { module: "AI Analyst", light: "Daily digest", standard: "Anomaly alerts", premium: "Custom mini-app" },
      { module: "AI Concierge (white-label)", light: "—", standard: "—", premium: "Yes" },
    ],
  },
  demo: {
    eyebrow: "Interactive Demo",
    h2: "Your AI team, live inside Telegram",
    sub: "Click any topic to explore. This is exactly what your workspace looks like.",
    botOnline: "bot is online",
    setupIn: "24h",
    setupInLabel: "Setup in",
    topicsLabel: "Topics",
    openForRequests: "Open for requests",
    readOnlyPlaceholder: "Read-only demo",
    requestPlaceholder: "Write your request...",
    openDemoCta: "Open live demo in Telegram",
    requestSetupCta: "Request setup →",
    footerNote: "Setup in 24 hours · No code required · Cancel anytime",
    userTyping: "typing...",
  },
};

// ---------------- RU ----------------
const RU: LangContent = {
  meta: {
    skipToContent: "К содержимому",
    openMenu: "Открыть меню",
    closeMenu: "Закрыть меню",
    language: "Язык",
    bookCta: "Начать",
    seeProductsCta: "Смотреть агентов",
    yearTag: "Сделано для операторов 2026",
  },
  nav: {
    products: "Агенты",
    pricing: "Цены",
    process: "Процесс",
    faq: "FAQ",
    cta: "Начать",
    telegram: "Написать в Телеграм",
    telegramHref: "https://t.me/gramfleet_bot",
  },
  hero: {
    eyebrow: "AI-команда. Ваша инфраструктура в Telegram.",
    h1Lines: ["AI-команда", "живёт в вашем", "Telegram"],
    lead:
      "Замените инструменты для задач, автоматизации, ресёрча и частичного ассистента — шестью AI-специалистами внутри вашего Telegram. Каждая ветка форума — отдельный эксперт со своей памятью и реальными инструментами. Запуск за 24 часа. Без кривой обучения.",
    primary: "Записаться на демо",
    secondary: "Смотреть демо",
    trustLabel: "Для операторов бизнеса в",
    trustItems: ["Заменяет Notion + Zapier + ассистента", "Запуск за 24 часа", "30 дней возврат"],
  },
  social: {
    label: "Заменяет SaaS-стек — или подключается к нему. Команда продолжает работать в Telegram.",
    items: [
      "Telegram",
      "Claude",
      "GLM",
      "Google Drive",
      "Notion",
      "HubSpot",
      "Stripe",
      "Linear",
      "Gmail",
    ],
  },
  productsSection: {
    eyebrow: "Шесть агентов + ваш собственный",
    h2: "Одна группа в Telegram. Шесть AI-агентов. Плюс кастомный, которого строим мы.",
    sub: "Каждый агент живёт в своей ветке форума — со своей памятью, своими навыками и своей задачей. Standard включает одного Кастомного агента, которого мы строим под ваш конкретный бизнес-процесс — вашу отрасль, ваших клиентов, ваши операции. Premium масштабируется до трёх.",
    perCard: { from: "От", delivery: "Запуск", learnMore: "Подробнее" },
  },
  products: {
    planner: {
      num: "01",
      badge: "Каждый день",
      badgeKind: "default",
      name: "AI Planner",
      tagline: "Планы, задачи и цели — в Telegram.",
      hook: "Планировщик задач и целей прямо в Telegram. Умные напоминания, прогресс-бары, проектные доски.",
      bullets: [
        "Планировщик задач и целей внутри Telegram",
        "Умные напоминания, которые учатся твоему ритму",
        "Прогресс-бары и проектные доски прямо в чате",
        "Ежедневные и недельные ревью с ИИ",
      ],
      fromPrice: PRICE_RANGES.planner.from,
      delivery: PRICE_RANGES.planner.delivery.ru,
      image: "/products/agent-1.webp",
      tiers: [
        {
          name: "Lite",
          price: "$199/мес",
          delivery: "24ч",
          features: ["Базовые планы и задачи", "Умные напоминания", "1 пользователь", "Готовые доски"],
        },
        {
          name: "Standard",
          price: "$499/мес",
          delivery: "24ч",
          features: ["Всё из Lite", "Голосовой ввод", "3 пользователя", "Кастомные доски"],
          highlight: true,
        },
        {
          name: "Premium",
          price: "$899/мес",
          delivery: "48ч",
          features: ["Всё из Standard", "Без лимита пользователей", "Стратегическая встреча раз в квартал", "White-label"],
        },
      ],
    },
    researcher: {
      num: "02",
      badge: "Берут чаще всего",
      badgeKind: "popular",
      name: "AI Researcher",
      tagline: "Глубокие исследования по запросу.",
      hook: "Глубокие исследования, парсинг, OSINT, конкурентный анализ — по запросу в Telegram.",
      bullets: [
        "Глубокие исследования со ссылками в твоей ветке",
        "Парсинг сайтов и OSINT по любому объекту",
        "Конкурентный анализ по расписанию или вручную",
        "Архив всех брифов с поиском",
      ],
      fromPrice: PRICE_RANGES.researcher.from,
      delivery: PRICE_RANGES.researcher.delivery.ru,
      image: "/products/agent-2.webp",
      tiers: [
        {
          name: "Lite",
          price: "$199/мес",
          delivery: "24ч",
          features: ["Ежедневные брифы", "Парсинг 50 страниц/день", "1 пользователь", "Поиск по архиву"],
        },
        {
          name: "Standard",
          price: "$499/мес",
          delivery: "24ч",
          features: ["Всё из Lite", "OSINT и досье", "3 пользователя", "Голосовые запросы"],
          highlight: true,
        },
        {
          name: "Premium",
          price: "$899/мес",
          delivery: "48ч",
          features: ["Всё из Standard", "Без лимита пользователей", "Кастомные источники данных", "Выделенный аналитик"],
        },
      ],
    },
    automator: {
      num: "03",
      badge: "Pro",
      badgeKind: "default",
      name: "AI Automator",
      tagline: "Процессы, которые работают сами.",
      hook: "Автоматизация процессов, обработка лидов, расписание задач, отправка отчётов — через Telegram.",
      bullets: [
        "Автоматизация рутинных процессов от начала до конца",
        "Обработка лидов от формы до CRM без кликов",
        "Расписание задач и ежедневные отчёты",
        "Подтверждения приходят в твою ветку Telegram",
      ],
      fromPrice: PRICE_RANGES.automator.from,
      delivery: PRICE_RANGES.automator.delivery.ru,
      image: "/products/agent-3.webp",
      tiers: [
        {
          name: "Lite",
          price: "$199/мес",
          delivery: "24ч",
          features: ["3 процесса", "Обработка лидов", "1 пользователь", "Ежедневный отчёт"],
        },
        {
          name: "Standard",
          price: "$499/мес",
          delivery: "24ч",
          features: ["Всё из Lite", "10 процессов", "3 пользователя", "Голосовые триггеры"],
          highlight: true,
        },
        {
          name: "Premium",
          price: "$899/мес",
          delivery: "48ч",
          features: ["Всё из Standard", "Без лимита процессов", "2 кастомных навыка/год", "Приоритетный фикс багов"],
        },
      ],
    },
    analyst: {
      num: "04",
      badge: "Бизнес-аналитика",
      badgeKind: "default",
      name: "AI Analyst",
      tagline: "Ежедневный дайджест KPI.",
      hook: "Бизнес-дашборд, отслеживание KPI, аналитика команды — ежедневно в Telegram.",
      bullets: [
        "Бизнес-дашборд ежедневно в твоей ветке",
        "Отслеживание KPI по всем подключённым инструментам",
        "Аналитика команды с пометками аномалий",
        "Прогнозы и сводки трендов по запросу",
      ],
      fromPrice: PRICE_RANGES.analyst.from,
      delivery: PRICE_RANGES.analyst.delivery.ru,
      image: "/products/agent-4.webp",
      tiers: [
        {
          name: "Lite",
          price: "$199/мес",
          delivery: "24ч",
          features: ["Ежедневный дайджест KPI", "5 подключений", "1 пользователь", "Базовое мини-приложение"],
        },
        {
          name: "Standard",
          price: "$499/мес",
          delivery: "24ч",
          features: ["Всё из Lite", "Алерты по аномалиям", "3 пользователя", "Стандартное мини-приложение"],
          highlight: true,
        },
        {
          name: "Premium",
          price: "$899/мес",
          delivery: "48ч",
          features: ["Всё из Standard", "Без лимита пользователей", "Кастомное мини-приложение", "Стратегическая встреча раз в квартал"],
        },
      ],
    },
    developer: {
      num: "05",
      badge: "Строит за вас",
      badgeKind: "new",
      name: "AI Разработчик",
      tagline: "Код, сайты, интеграции — по запросу.",
      hook: "Опишите задачу простым языком. Агент создаст проект, напишет код, задеплоит и пришлёт живую ссылку.",
      bullets: [
        "Лендинги, дашборды, внутренние инструменты — по одному промпту",
        "Интеграции между CRM, Telegram, Stripe, календарями",
        "Видно прогресс в топике в реальном времени — что делает агент сейчас",
        "Готовый результат: рабочая ссылка + приватный репозиторий",
      ],
      fromPrice: PRICE_RANGES.developer.from,
      delivery: PRICE_RANGES.developer.delivery.ru,
      image: "/products/agent-4.webp",
      tiers: [
        {
          name: "Lite",
          price: "$199/мес",
          delivery: "24ч настройка",
          features: ["3 небольшие задачи в месяц", "Лендинги и простые интеграции", "1 пользователь", "Публичный репозиторий"],
        },
        {
          name: "Standard",
          price: "$499/мес",
          delivery: "24ч настройка",
          features: ["Всё из Lite", "Без лимита задач", "3 пользователя", "Приватный репозиторий + Netlify-деплои"],
          highlight: true,
        },
        {
          name: "Premium",
          price: "$899/мес",
          delivery: "48ч настройка",
          features: ["Всё из Standard", "Без лимита пользователей", "Кастомная инфраструктура (свой домен, своя БД)", "Приоритетное ревью инженера"],
        },
      ],
    },
    concierge: {
      num: "06",
      badge: "White-label",
      badgeKind: "new",
      name: "AI Concierge",
      tagline: "Ваш бренд. Ваш ассистент.",
      hook: "Кастомный AI-ассистент с вашим голосом бренда, базой знаний и процессами. Полный white-label.",
      bullets: [
        "Кастомный AI-ассистент, обученный голосу твоего бренда",
        "Приватная база знаний под твой бизнес",
        "Кастомные процессы, встроенные в твою группу Telegram",
        "Полный white-label — твой домен, твой бот, твои цвета",
      ],
      fromPrice: PRICE_RANGES.concierge.from,
      delivery: PRICE_RANGES.concierge.delivery.ru,
      image: "/products/agent-5.webp",
      tiers: [
        {
          name: "Lite",
          price: "$899/мес",
          delivery: "48ч",
          features: ["Настройка голоса бренда", "Кастомная база знаний", "1 пользователь", "Стандартное мини-приложение"],
        },
        {
          name: "Standard",
          price: "$1,499/мес",
          delivery: "5 дней",
          features: ["Всё из Lite", "Кастомные процессы (5)", "5 пользователей", "Брендированное мини-приложение"],
          highlight: true,
        },
        {
          name: "Premium",
          price: "$2,499/мес",
          delivery: "10 дней",
          features: ["Всё из Standard", "Без лимита процессов", "Без лимита пользователей", "Персональный success-менеджер"],
        },
      ],
    },
  },
  metrics: {
    eyebrow: "Результаты",
    h2: "Почему операторы выбирают GramFleet.",
    sub: "Целевые показатели на основе бета-тестирования и интервью с фаундерами. Обновляются по мере появления реальных данных от клиентов.",
    items: [
      { value: "5", label: "SaaS-инструментов заменяет", detail: "Notion для задач, Zapier для автоматизации, ChatGPT для ресёрча, подписка на аналитику и частичный ассистент — всё работает в одной Telegram-группе." },
      { value: "24ч", label: "Время запуска", detail: "От звонка-знакомства до полностью настроенной AI-команды в вашей группе Telegram — двадцать четыре часа, без исключений." },
      { value: "15ч", label: "Экономится в неделю", detail: "Ресёрч, отчёты, обработка лидов, ведение задач — рутина которая съедает фаундерские часы уходит к агентам автоматически." },
      { value: "47%", label: "Лидов теряет медленный ответ", detail: "Почти половина малого бизнеса теряет клиентов потому что никто не ответил вовремя. AI Automator отвечает за 30 секунд, каждый раз." },
    ],
  },
  features: {
    eyebrow: "Уже в продукте",
    h2: "Пять вещей, которые работают из коробки.",
    sub: "Не в roadmap — уже в проде. Обкатано в живых бета-группах прямо сейчас.",
    items: [
      {
        tag: "Голос",
        title: "Голосовые ответы по запросу",
        body: "Любой агент может отвечать голосом. Edge TTS, голоса Светлана и Дмитрий, переключатель в каждом топике отдельно — включи голос у Планера, оставь текст у Аналитика. В разы выше вовлечённость по сравнению с текстом.",
      },
      {
        tag: "Онбординг",
        title: "Умный онбординг за 30 секунд",
        body: "Владелец отвечает на один вопрос — «о чём ваш бизнес?». Бот сам собирает план топиков, называет каждого агента и присылает клавиатуру с действиями на один тап. От установки до первого ответа — меньше минуты.",
      },
      {
        tag: "Команда",
        title: "Доступ для всей команды",
        body: "С агентами работают все участники авторизованной группы — без приглашений по местам, без жонглирования логинами. Владелец управляет в личке. Неавторизованные группы автоматически блокируются — бот нельзя угнать в чужой чат.",
      },
      {
        tag: "Аптайм",
        title: "Обновления без даунтайма",
        body: "Апдейты выкатываются через оркестратор безопасного рестарта — он дожидается завершения текущих запросов, подменяет процесс и переподключает сессии. Окна обслуживания не видно, агенты остаются в чате всё время.",
      },
      {
        tag: "Языки",
        title: "10 языков, нативное качество",
        body: "Интерфейс и ответы агентов полностью локализованы на 10 языков — русский, английский, испанский, португальский, французский, немецкий, итальянский, индонезийский, турецкий и польский. Пиши на любом — агент подхватывает.",
      },
    ],
  },
  process: {
    eyebrow: "Процесс",
    h2: "Знакомство → Запуск 24ч → Работа → Поддержка.",
    sub: "Четыре шага. Без долгого онбординга. Уходите с работающей AI-командой — а мы держим её в форме.",
    steps: [
      { step: "01", title: "Звонок-знакомство", body: "Изучаем твой процесс, подбираем нужных агентов и с нуля проектируем твоего Кастомного агента. Бесплатно, тридцать минут, без обязательств." },
      { step: "02", title: "Настройка за 24ч", body: "Разворачиваем AI-инфраструктуру, подключаем группу Telegram, настраиваем каждого агента и загружаем базу знаний. Ты следишь за прогрессом онлайн." },
      { step: "03", title: "Начало работы", body: "Команда начинает в первый же день. ИИ осваивает твои паттерны, тон и решения за первые недели — становится точнее без ручной настройки." },
      { step: "04", title: "Поддержка", body: "Персональная поддержка и регулярные аудиты. Мы мониторим агентов круглосуточно, устраняем баги и держим всё на пиковой эффективности." },
    ],
  },
  pricing: {
    eyebrow: "Цены",
    h2: "Три тарифа. Ежемесячно. Отмена в любой момент.",
    sub: "Большинство команд начинают на Standard. Разовая настройка $1,000 не платится при оплате 3 месяцев вперёд — большинство операторов отбивают её в первый же месяц за счёт сэкономленного времени.",
    productTab: "Агент",
    chooseTier: "Выбрать тариф",
    pickThis: "Выбрать этот тариф",
    popular: "Рекомендуем",
    talkToUs: "Обсудить",
    moneyBack: "30 дней возврат по каждому тарифу",
    note: "Цены в USD. Международное выставление счетов. Большие или кастомные проекты — звонок.",
  },
  faq: {
    eyebrow: "Вопросы и ответы",
    h2: "Что спрашивают до подключения.",
    sub: "Короткие честные ответы. Остальное — на звонке.",
    items: [
      {
        q: "Что такое GramFleet?",
        a: "GramFleet — это AI-инфраструктура команды для Telegram. Каждая ветка форума в твоей группе бизнеса — отдельный AI-агент со своей памятью, своими навыками и своим контекстом. Твоя AI-команда без дашбордов, без новых приложений, без переключения контекста.",
      },
      {
        q: "Нужны ли технические знания?",
        a: "Нет. Если ты умеешь пользоваться Telegram — ты сможешь работать с GramFleet. Мы настраиваем всё за тебя на звонке-знакомстве и в течение 24-часового окна запуска. Ты и команда просто продолжаете пользоваться Telegram, как и раньше.",
      },
      {
        q: "Мои данные в безопасности?",
        a: "Да. GramFleet работает на твоём собственном сервере в зашифрованном Docker-контейнере — данные не покидают твою инфраструктуру. Память топиков и твоя база знаний привязаны только к твоей группе, не передаются третьим сторонам и не используются для обучения публичных моделей. В любой момент можно экспортировать или удалить всё.",
      },
      {
        q: "Какую AI-модель вы используете?",
        a: "Lite использует GLM. Standard использует Claude Sonnet с автоматическим fallback на GLM для надёжности. Premium использует Claude Opus как основную модель, с Sonnet и GLM в резерве. Ты всегда получаешь лучшую модель в рамках своего тарифа.",
      },
      {
        q: "Можно отменить в любое время?",
        a: "Да. Подписка месячная, отмена в один клик из самого бота Telegram. Если в первые 30 дней не подошло — возвращаем деньги за последний месяц, без споров, без удержаний.",
      },
      {
        q: "Что такое 'агент топика'?",
        a: "Агент топика — это выделенный AI-ассистент, привязанный к одной ветке форума в твоей группе Telegram. У каждого топика своя изолированная память, свои навыки и своя задача — календарь, планы, ресёрч, аналитика или что-то кастомное. Переключаешь топик — переключаешь контекст. Без промптов.",
      },
      {
        q: "Зачем платить $499, если есть ChatGPT за $20?",
        a: "ChatGPT — один чат без памяти между сессиями, без реальных инструментов, без доступа для команды. GramFleet — 6 изолированных специалистов: каждый помнит всё с первого дня, работает с 40+ live-инструментами (парсинг, код, календарь, KPI), и вся команда работает с ними одновременно. Разница как между одним стажёром-генералистом и целым отделом с памятью.",
      },
      {
        q: "Чем отличается от Hermify и других Telegram AI-ботов?",
        a: "Hermify подключает одну AI-модель к одному боту Telegram — один агент, один контекст, одна задача. GramFleet разворачивает команду: каждая ветка форума — отдельный специалист с изолированной памятью и выделенными навыками. На практике это важно: Researcher не смешивает контекст с Planner, Automator не замедляется когда Analyst строит отчёт. Per-topic isolation — это архитектура, которой нет ни у одного другого managed-продукта.",
      },
    ],
  },
  finalCta: {
    eyebrow: "Начните здесь",
    h2: "Запустите AI-команду за 24 часа.",
    sub: "Бесплатный 30-минутный звонок-знакомство. Изучим процесс, настроим структуру топиков, запустим систему до завтрашнего вечера.",
    formTitle: "Расскажите о бизнесе",
    fields: {
      nameLabel: "Имя",
      namePh: "Ваше имя",
      emailLabel: "Рабочая почта",
      emailPh: "you@company.com",
      phoneLabel: "Telegram (по желанию)",
      phonePh: "@yourname",
      dateLabel: "Удобное время",
      dateHelp: "Подтвердим слот в течение рабочего дня.",
      contextLabel: "Что хотите починить?",
      contextPh: "Одно предложение про узкое место. (По желанию)",
      productLabel: "Какой агент интересует",
    },
    submit: "Записаться на звонок",
    submitting: "Отправляем…",
    success: "Записали.",
    successSub: "Подтвердим звонок в течение рабочего дня. Ждите письмо.",
    error: "Что-то пошло не так. Напишите на hello@gramfleet.ai — разберёмся.",
    reassurance: [
      "30 минут, бесплатно, без презентации",
      "Запуск за 24 часа",
      "30 дней возврат по каждому тарифу",
    ],
    promo: {
      tag: "Только сегодня",
      title: "Скидка 10% на первые 3 месяца",
      sub: "Запишитесь за 15 минут — скидка автоматически попадёт в подписку.",
      expires: "Скидка действует ещё",
      expired: "Не страшно — запишитесь сегодня, скидку всё равно применим.",
    },
    modal: {
      eyebrow: "Записываетесь на",
      title: "Забронируем место за 30 секунд.",
      sub: "Оставьте Telegram или почту и удобное время — подтвердим в течение рабочего дня.",
      backToProduct: "Посмотреть других агентов",
      tierEyebrow: "Вы выбираете",
      regularPrice: "Обычная",
      yourPrice: "Ваша цена",
      includedTitle: "Что входит",
    },
  },
  footer: {
    tagline: "AI-команда внутри вашего Telegram. AI-инфраструктура для бизнеса.",
    columns: [
      {
        title: "Агенты",
        links: [
          { label: "AI Planner", href: "#products" },
          { label: "AI Researcher", href: "#products" },
          { label: "AI Automator", href: "#products" },
          { label: "AI Analyst", href: "#products" },
          { label: "AI Concierge", href: "#products" },
        ],
      },
      {
        title: "Компания",
        links: [
          { label: "Процесс", href: "#process" },
          { label: "Цены", href: "#pricing" },
          { label: "FAQ", href: "#faq" },
          { label: "Начать", href: "#book" },
        ],
      },
      {
        title: "Контакты",
        links: [
          { label: "hello@gramfleet.ai", href: "mailto:hello@gramfleet.ai" },
          { label: "Telegram", href: "https://t.me/gramfleet_bot" },
          { label: "LinkedIn", href: "#" },
        ],
      },
    ],
    rights: "© 2026 GramFleet · Все права защищены",
    contact: "hello@gramfleet.ai",
  },
  mobileCta: "Начать",
  subscriptionPlan: {
    toggle: {
      setupOnly: "Только настройка",
      setupMonthly: "Настройка + Подписка",
      monthlyOnly: "Только подписка",
    },
    plans: [
      {
        name: "Lite",
        setupPrice: "Бесплатно",
        monthlyPrice: "$199 / мес",
        buildTime: "24ч",
        includes: [
          "AI-модель GLM",
          "1 пользователь",
          "6 готовых топиков (календарь, планы, цели, заметки, дневник, дашборд)",
          "20+ готовых навыков",
          "Двуязычный интерфейс (РУС + АНГ)",
          "Голосовой ввод — наговорил, получил ответ текстом",
          "Шифрованное хранилище, изолированная память по топикам",
          "AI-поддержка 24/7",
          "2ч человеческой поддержки/мес",
          "Базовое мини-приложение",
        ],
        forWho: "Соло-фаундеры, фрилансеры, маленькие команды на старте",
        cta: "Начать с Lite",
        ctaStyle: "outline" as const,
      },
      {
        name: "Standard",
        tag: "Рекомендуем",
        setupPrice: "$1,000 (бесплатно при оплате 3 мес. вперёд)",
        monthlyPrice: "$499 / мес",
        buildTime: "24ч",
        includes: [
          "Claude Sonnet + GLM (авто-fallback)",
          "3 пользователя",
          "11 топиков (6 готовых + 5 кастомных)",
          "40+ готовых навыков",
          "Полный i18n интерфейс (РУС, АНГ, +1 по запросу)",
          "Голосовые сообщения — вход и голосовой ответ через /voice",
          "Шифрование, изоляция по топикам, audit log, безопасный рестарт",
          "Стандартное мини-приложение",
          "5ч человеческой поддержки/мес",
          "SLA ответа 4ч",
          "1 Кастомный агент (строим под ваш процесс)",
        ],
        forWho: "Растущие команды от 3 до 15 человек, фаундеры, которые хотят вернуть свои часы",
        cta: "Записаться на демо",
        ctaStyle: "primary" as const,
      },
      {
        name: "Premium",
        setupPrice: "$2,500",
        monthlyPrice: "$899 / мес",
        buildTime: "48ч",
        includes: [
          "Claude Opus + Sonnet + GLM",
          "Без лимита пользователей",
          "Без лимита топиков",
          "До 3 Кастомных агентов (строим под вас)",
          "2 кастомных навыка в год включено",
          "Мультиязычный интерфейс — любой язык по запросу",
          "Голосовые сообщения везде + кастомный голос (ElevenLabs)",
          "Усиленная безопасность: шифрование, изоляция, audit, кастомный retention, SSO/SAML по запросу",
          "Кастомное брендированное мини-приложение",
          "10ч человеческой поддержки/мес",
          "SLA ответа 2ч",
          "Стратегическая встреча раз в квартал",
          "Приоритетный фикс багов",
        ],
        forWho: "Средний бизнес, бренды, которым нужен white-label и выделенная поддержка",
        cta: "Запросить персональную встречу",
        ctaStyle: "outline" as const,
      },
    ],
    compatTitle: "Что входит в каждый тариф",
    compatCaption:
      "Каждый тариф включает свою комбинацию агентов и навыков. Подходящий тариф зависит от размера команды и узких мест. На звонке помогаем выбрать.",
    compatRows: [
      { module: "AI Planner", light: "Да", standard: "Да", premium: "Да" },
      { module: "AI Researcher", light: "Базовый", standard: "Полный", premium: "Полный" },
      { module: "AI Automator", light: "—", standard: "10 процессов", premium: "Без лимита" },
      { module: "AI Analyst", light: "Дайджест", standard: "Алерты", premium: "Кастомное приложение" },
      { module: "AI Concierge (white-label)", light: "—", standard: "—", premium: "Да" },
    ],
  },
  demo: {
    eyebrow: "Интерактивное демо",
    h2: "Ваша AI-команда живёт в Telegram",
    sub: "Нажмите на любой топик и посмотрите, как это работает. Именно так выглядит ваш рабочий Telegram.",
    botOnline: "бот онлайн",
    setupIn: "24ч",
    setupInLabel: "Настройка за",
    topicsLabel: "Топики",
    openForRequests: "Можно написать",
    readOnlyPlaceholder: "Демо (только чтение)",
    requestPlaceholder: "Напишите вашу задачу...",
    openDemoCta: "Открыть демо-группу в Telegram",
    requestSetupCta: "Оставить заявку →",
    footerNote: "Настройка за 24 часа · Не нужен код · Отмена в любой момент",
    userTyping: "печатает...",
  },
};

export const CONTENT: Record<Lang, LangContent> = { en: EN, ru: RU };

export type { LangContent };
