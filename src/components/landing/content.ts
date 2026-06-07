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

type CompatDataRow = {
  kind?: undefined;
  module: string;
  starter: string;
  standard: string;
  pro: string;
  agency: string;
};
type CompatSectionRow = { kind: "section"; label: string };
type CompatRow = CompatDataRow | CompatSectionRow;

type SubscriptionPlanSection = {
  toggle: { setupOnly: string; setupMonthly: string; monthlyOnly: string };
  plans: SubscriptionPlan[];
  compatTitle: string;
  compatCaption: string;
  compatModuleHeader: string;
  agentsSectionLabel: string;
  compatRows: CompatRow[];
};

type DifferentiatorsSection = {
  eyebrow: string;
  h2: string;
  sub: string;
  bullets: string[];
  columns: string[]; // [GramFleet, Hermify, OpenClaw, SaleBot]
  rows: { label: string; values: string[] }[]; // values length === columns.length
  footnote: string;
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

type TopicTemplate = {
  slug: string;
  icon: string;
  name: string;
  role: string;
  desc: string;
};

type TopicTemplatesSection = {
  eyebrow: string;
  h2: string;
  sub: string;
  items: TopicTemplate[];
  cta: string;
  caption: string;
};

type TopicBundle = {
  audience: string;
  title: string;
  topics: string[];
  plan: string;
};

type TopicBundlesSection = {
  eyebrow: string;
  h2: string;
  sub: string;
  items: TopicBundle[];
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
  topicTemplates: TopicTemplatesSection;
  topicBundles: TopicBundlesSection;
  subscriptionPlan: SubscriptionPlanSection;
  differentiators: DifferentiatorsSection;
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
    seeProductsCta: "Browse topic templates",
    yearTag: "Built for operators in 2026",
  },
  nav: {
    products: "Topics",
    pricing: "Pricing",
    process: "Process",
    faq: "FAQ",
    cta: "Get Started",
    telegram: "Message on Telegram",
    telegramHref: "https://t.me/gramfleet_bot",
  },
  hero: {
    eyebrow: "25+ topic templates. One Telegram HQ.",
    h1Lines: ["Build your AI HQ", "from topic templates", "inside Telegram"],
    lead:
      "Pick from 25+ templates. Plans, Research, Leads, Calendar — every topic remembers everything and runs 24/7. From $149/mo.",
    primary: "Try 14 days free",
    secondary: "Browse the templates",
    trustLabel: "Trusted by operators in",
    trustItems: ["24-hour setup", "Per-topic memory & skills", "Your data, your server"],
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
    eyebrow: "Specialists inside the topics",
    h2: "The specialists that ship with every topic template.",
    sub: "Pick a topic template, get a specialist inside it. Each one has its own memory, its own skills, and one job to do — Planner runs your calendar, Researcher does deep research, Leads chases new business. Switch topics, switch context.",
    perCard: { from: "From", delivery: "Setup", learnMore: "Open details" },
  },
  products: {
    planner: {
      num: "01",
      badge: "Daily driver",
      badgeKind: "default",
      name: "AI Planner",
      tagline: "Runs your calendar, tasks, and goals.",
      hook: "Calendar, tasks, and goals tracked inside your Telegram. Smart reminders, progress bars, project boards.",
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
      tagline: "Deep research, competitor analysis, OSINT.",
      hook: "Deep research, web scraping, OSINT, competitor analysis — on demand in Telegram.",
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
      tagline: "Leads, follow-ups, automation.",
      hook: "Leads, follow-ups, and recurring workflows — all driven from your Telegram topic.",
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
      tagline: "KPIs and reports straight to Telegram.",
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
      tagline: "Code, landings, integrations.",
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
      badge: "Premium upsell",
      badgeKind: "new",
      name: "Custom Agent",
      tagline: "Build an agent for your exact job.",
      hook: "Bespoke agent designed around your workflow — your industry, your clients, your processes. Custom AGENT.md, custom skills, custom voice. Included with Standard/Pro (1) and Agency (3).",
      bullets: [
        "Designed around your exact business process",
        "Custom AGENT.md, custom skills, custom voice",
        "1 included on Standard and Pro, 3 on Agency",
        "Add-on to any plan — talk to us",
      ],
      fromPrice: "$0 with Standard",
      delivery: "5 day build",
      image: "/products/agent-5.webp",
      tiers: [
        {
          name: "With Standard",
          price: "Included",
          delivery: "5 day build",
          features: ["1 Custom Agent", "We build it for your workflow", "Lives in its own topic", "You keep full ownership"],
        },
        {
          name: "With Pro",
          price: "Included",
          delivery: "5 day build",
          features: ["1 Custom Agent", "Priority skill development", "Quarterly tuning session", "Private repo"],
          highlight: true,
        },
        {
          name: "With Agency",
          price: "Up to 3 included",
          delivery: "10 day build",
          features: ["Up to 3 Custom Agents", "White-label support", "Dedicated success manager", "Branded mini-app"],
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
    eyebrow: "What makes it different",
    h2: "Six killer features you won't find anywhere else.",
    sub: "Five are live in production today. One is launching Q3 2026.",
    items: [
      {
        tag: "Templates",
        title: "100+ topic templates — install in one tap",
        body: "Every domain covered out of the box: planning, research, finances, health, travel, marketing, content, leads, analytics, development. Pick what fits your business, add more anytime. The library keeps growing — request custom ones or build your own.",
      },
      {
        tag: "Flexible",
        title: "Solo or full team — same group handles both",
        body: "Start alone. Add teammates without any restructuring. Every authorized member works with all agents simultaneously. Owner controls per-member access and permissions. No per-seat pricing, no re-onboarding when you grow.",
      },
      {
        tag: "Integrations",
        title: "20+ integrations — buy connectors à la carte",
        body: "Notion, Google Calendar, Google Drive, Gmail, Stripe, Odoo, AdSub (multiposting + ad generation), HubSpot, Linear and more. Each connector plugs directly into your agents — they act on your real data, not just talk about it.",
      },
      {
        tag: "Marketplace",
        title: "Skills & MCP marketplace — extend any agent",
        body: "Bolt on new capabilities to any agent from the marketplace: advanced web scraping, OSINT, image generation, data pipelines, custom MCP integrations. Your agent stack grows with your business — no rebuild required.",
      },
      {
        tag: "Pipeline",
        title: "Tasks that run while you sleep",
        body: "Queue a task in the evening — wake up to results. The pipeline picks items one by one, runs critic → worker → QA, commits output, and reports back to your Telegram topic. Your agents don't wait for you to be online.",
      },
      {
        tag: "Founder OS",
        title: "Founder OS — your live view across all topics",
        body: "One command shows the status of every topic in your AI HQ — what's running, what's blocked, what needs your attention. Monitor your own workspace and your team side by side. No dashboards. No status meetings. Launching Q3 2026.",
      },
    ],
  },
  process: {
    eyebrow: "How it works",
    h2: "Pick topics → Get specialists → Write in Telegram.",
    sub: "Three steps. No new app to learn. You leave with an AI HQ inside the Telegram group you already use every day.",
    steps: [
      { step: "01", title: "Pick the topics your business needs", body: "Choose from 25+ ready templates — Plans, Research, Leads, Calendar, Analytics, Content, Developer, Diary. Mix and match for your workflow. Add more anytime." },
      { step: "02", title: "Each topic gets an AI specialist with memory", body: "Every topic is a workspace with one specialist inside. It remembers every message, file, and decision in that topic — forever. Switch topics, switch context — instantly." },
      { step: "03", title: "Write in Telegram like you always do — AI handles the rest", body: "Drop a message in the Research topic — get a deep brief by lunch. Forward a lead into the Leads topic — qualified and followed up overnight. 24/7, no dashboards." },
    ],
  },
  pricing: {
    eyebrow: "Pricing",
    h2: "Four plans. Priced by topics. Cancel anytime.",
    sub: "Start free for 14 days — no card. Starter $149/mo (5 topics, solo). Standard $399/mo (12 topics, 3 users). Pro $699/mo (25 topics + Opus). Agency $1,299/mo (unlimited + white-label).",
    productTab: "Topic",
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
        a: "GramFleet turns your Telegram group into an AI HQ built out of topic templates. Each topic is a workspace with its own AI specialist inside — Plans, Research, Leads, Calendar, Analytics, Developer, and 20+ more. You pick the topics, the AI lives inside each one with full memory, and you keep working in Telegram.",
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
        q: "What is a topic template?",
        a: "A topic template is a ready-to-go workspace — like a 'cabinet' in your business — with an AI specialist already configured inside. Templates include Plans, Research, Leads, Calendar, Analytics, Developer, Content, Diary, Support and more. Pick a template, drop it into your Telegram, and you instantly have a dedicated workspace with memory and skills for that specific job. Switch topics, switch context — no prompts to write.",
      },
      {
        q: "Why not just use ChatGPT for $20/mo?",
        a: "ChatGPT is a single conversation thread — no persistent memory between sessions, no real tools, no team access. GramFleet gives you 6 isolated specialists, each of which remembers everything since day one, runs 40+ live skills (web scraping, code execution, calendar, KPI reports), and lets your whole team work with them simultaneously. It's the difference between one generalist intern and a trained department that never forgets.",
      },
      {
        q: "How is this different from Hermify or other Telegram AI bots?",
        a: "Hermify connects one AI model to one Telegram bot — one agent, one context, one job. GramFleet deploys a team: each forum topic is a different specialist with isolated memory and dedicated skills. The difference matters in practice — your Researcher doesn't bleed context into your Planner, your Automator doesn't slow down when the Analyst is running a report. Per-topic isolation is the architecture — no other managed product offers it.",
      },
      {
        q: "Does it work in Russia or CIS countries?",
        a: "Yes — and this is one of our core strengths. ChatGPT and Claude require a foreign phone number, VPN, and a non-Russian card. GramFleet runs entirely inside Telegram (which you already have), accepts payment via Telegram Stars, Stripe, and crypto, and needs nothing on your end but a Telegram account. Setup takes 24 hours, no additional infrastructure required.",
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
      productLabel: "Topic you're interested in",
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
      backToProduct: "Browse other topics",
      tierEyebrow: "You're choosing",
      regularPrice: "Regular",
      yourPrice: "Your price",
      includedTitle: "What's included",
    },
  },
  footer: {
    tagline: "Your AI HQ as topic templates inside Telegram. 25+ workspaces, one bot.",
    columns: [
      {
        title: "Topics",
        links: [
          { label: "Plans", href: "#topics" },
          { label: "Research", href: "#topics" },
          { label: "Leads", href: "#topics" },
          { label: "Analytics", href: "#topics" },
          { label: "Developer", href: "#topics" },
          { label: "Content", href: "#topics" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "Process", href: "#process" },
          { label: "Pricing", href: "#pricing" },
          { label: "FAQ", href: "#faq" },
          { label: "Get Started", href: "#book" },
          { label: "Security & DPA", href: "/security" },
          { label: "For Russia / Для России", href: "/ru" },
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
  topicTemplates: {
    eyebrow: "Topic templates",
    h2: "25+ topic templates. Pick the ones your business actually uses.",
    sub: "Every template is a workspace with a specialist inside it — its own memory, its own skills, its own job. Drop one into your Telegram and it's running in minutes.",
    items: [
      { slug: "plans", icon: "🗂", name: "Plans", role: "Planner", desc: "Calendar, tasks, goals — tracked and nudged inside Telegram." },
      { slug: "research", icon: "🔬", name: "Research", role: "Researcher", desc: "Scans competitors, analyzes the market, ships a research brief with citations." },
      { slug: "leads", icon: "🎯", name: "Leads", role: "Lead generator", desc: "Qualifies inbound leads, drafts replies, never lets a follow-up slip." },
      { slug: "calendar", icon: "📅", name: "Calendar", role: "Scheduler", desc: "Books, reschedules, and protects your focus blocks — without back-and-forth." },
      { slug: "analytics", icon: "📊", name: "Analytics", role: "Analyst", desc: "Daily KPI digest from every connected tool — anomalies flagged in-chat." },
      { slug: "developer", icon: "💻", name: "Developer", role: "Developer", desc: "Ships landings, internal tools, integrations from a plain-English brief." },
      { slug: "diary", icon: "📓", name: "Diary", role: "Journal", desc: "Captures decisions, lessons, and mood — searchable, summarized weekly." },
      { slug: "content", icon: "✍️", name: "Content", role: "Content writer", desc: "Drafts posts, scripts, and emails — in your voice, on your schedule." },
      { slug: "support", icon: "🤝", name: "Support", role: "Customer support", desc: "Answers FAQ, triages tickets, escalates only what needs you." },
      { slug: "finance", icon: "💰", name: "Finance", role: "Finance tracker", desc: "Tracks income, expenses, invoices, and subscriptions — weekly digest in chat." },
      { slug: "health", icon: "🏃", name: "Health", role: "Health coach", desc: "Logs workouts, tracks metrics, builds habits — without a separate app." },
      { slug: "travel", icon: "✈️", name: "Travel", role: "Trip planner", desc: "Plans trips, tracks bookings, builds itineraries — synced to your calendar." },
      { slug: "shopping", icon: "🛒", name: "Shopping", role: "Shopping assistant", desc: "Wishlists, price tracking, order monitoring — fewer browser tabs." },
      { slug: "habits", icon: "⚡", name: "Habits", role: "Habit coach", desc: "Daily check-ins, streaks, and reflection prompts — accountability without another app." },
      { slug: "contracts", icon: "📋", name: "Contracts", role: "Legal assistant", desc: "Reviews documents, flags risky clauses, tracks deadlines and renewal dates." },
    ],
    cta: "Browse 30+ templates",
    caption: "Need a template that isn't here? Standard and above include custom topics we build for your exact workflow.",
  },
  topicBundles: {
    eyebrow: "Popular bundles",
    h2: "Popular topic bundles by role.",
    sub: "Battle-tested combinations that operators wire up on day one. Mix and match — every plan lets you swap topics any time.",
    items: [
      {
        audience: "For marketers",
        title: "Growth HQ",
        topics: ["Plans", "Content", "Research", "Leads"],
        plan: "Fits Standard ($399/mo, up to 12 topics)",
      },
      {
        audience: "For founders",
        title: "Founder HQ",
        topics: ["Plans", "Developer", "Analytics", "Calendar"],
        plan: "Fits Standard ($399/mo, up to 12 topics)",
      },
      {
        audience: "For agencies",
        title: "Agency HQ",
        topics: ["Leads × N", "Support", "Analytics"],
        plan: "Fits Pro or Agency — scale per client",
      },
      {
        audience: "For solo founders",
        title: "Personal HQ",
        topics: ["Plans", "Finance", "Health", "Habits", "Diary"],
        plan: "Fits Starter ($149/mo, up to 5 topics)",
      },
    ],
  },
  subscriptionPlan: {
    toggle: {
      setupOnly: "Setup only",
      setupMonthly: "Setup + Monthly",
      monthlyOnly: "Monthly only",
    },
    plans: [
      {
        name: "Starter",
        setupPrice: "Free",
        monthlyPrice: "$149 / mo",
        buildTime: "24h",
        includes: [
          "Up to 5 topics",
          "Pick from 25+ topic templates",
          "GLM AI model",
          "1 user",
          "20+ built-in skills",
          "Bilingual interface (EN + RU)",
          "Voice input — speak, get a text reply",
          "Encrypted storage, per-topic isolation",
          "AI support 24/7",
          "14-day free trial — no card",
        ],
        forWho: "Solo founders, freelancers — running a focused stack of topics",
        cta: "Start 14-day free trial",
        ctaStyle: "outline" as const,
      },
      {
        name: "Standard",
        tag: "Recommended",
        setupPrice: "$500 (free with 3mo prepay)",
        monthlyPrice: "$399 / mo",
        buildTime: "24h",
        includes: [
          "Up to 12 topics",
          "Pick from 25+ topic templates",
          "Claude Sonnet + GLM auto-fallback",
          "3 users",
          "40+ built-in skills",
          "Full interface i18n (EN, RU, +1 on request)",
          "Voice messages — input and voice reply via /voice",
          "Encrypted storage, per-topic isolation, audit log, safe restart",
          "1 custom topic we build for your workflow",
          "5h human support / month, 4h response SLA",
          "14-day free trial — no card",
        ],
        forWho: "Teams of 2-5. Marketing, ops, founders — multi-workflow stacks.",
        cta: "Start 14-day free trial",
        ctaStyle: "primary" as const,
      },
      {
        name: "Pro",
        setupPrice: "$1,000 (free with 3mo prepay)",
        monthlyPrice: "$699 / mo",
        buildTime: "24h",
        includes: [
          "Up to 25 topics",
          "All 25+ topic templates unlocked",
          "Claude Opus + Sonnet + GLM",
          "10 users",
          "1 custom topic per year included",
          "Voice messages everywhere + custom voice profile",
          "Hardened security: encryption, isolation, audit, custom retention",
          "Branded mini-app",
          "8h human support / month, 2h response SLA",
          "Quarterly strategy session",
        ],
        forWho: "Mid-market and growing SMBs running many workflows in parallel",
        cta: "Book Discovery Call",
        ctaStyle: "primary" as const,
      },
      {
        name: "Agency",
        setupPrice: "$2,500",
        monthlyPrice: "$1,299 / mo",
        buildTime: "48h",
        includes: [
          "Unlimited topics",
          "Unlimited custom topic templates",
          "Claude Opus primary + Sonnet + GLM",
          "Unlimited users",
          "Full white-label — your domain, your bot, your colors",
          "SSO/SAML on request",
          "Multilingual interface — any language",
          "Custom branded mini-app",
          "16h human support / month, 1h response SLA",
          "Dedicated success manager",
          "Priority bug fixes",
        ],
        forWho: "Agencies & multi-client white-label — one HQ per client, scoped topics",
        cta: "Talk to us",
        ctaStyle: "outline" as const,
      },
    ],
    compatTitle: "What's included at each level",
    compatCaption:
      "Each plan bundles a different mix of agents, topics, and support. Most teams start on Standard. We help you pick on the Discovery Call.",
    compatModuleHeader: "Module",
    agentsSectionLabel: "Agents",
    compatRows: [
      { kind: "section", label: "Agents" },
      { module: "AI Planner", starter: "Yes", standard: "Yes", pro: "Yes", agency: "Yes" },
      { module: "AI Researcher", starter: "Basic", standard: "Full", pro: "Full + OSINT", agency: "Full + dedicated analyst" },
      { module: "AI Automator", starter: "—", standard: "10 workflows", pro: "Unlimited", agency: "Unlimited" },
      { module: "AI Analyst", starter: "Daily digest", standard: "Anomaly alerts", pro: "Custom dashboard", agency: "Custom mini-app" },
      { module: "AI Developer", starter: "3 tasks/mo", standard: "Unlimited", pro: "Unlimited + priority", agency: "Unlimited + priority" },
      { module: "AI Concierge (white-label)", starter: "—", standard: "—", pro: "—", agency: "Yes" },
      { module: "Custom topics (we build)", starter: "—", standard: "1", pro: "1 (priority)", agency: "Unlimited" },

      { kind: "section", label: "Team & limits" },
      { module: "Users", starter: "1", standard: "3", pro: "10", agency: "Unlimited" },
      { module: "Topics", starter: "5", standard: "12", pro: "25", agency: "Unlimited" },
      { module: "Custom skills / year", starter: "—", standard: "—", pro: "1 included", agency: "2+ included" },

      { kind: "section", label: "AI & interface" },
      { module: "AI model", starter: "GLM", standard: "Claude Sonnet + GLM", pro: "Claude Opus + Sonnet + GLM", agency: "Claude Opus + Sonnet + GLM" },
      { module: "Built-in skills", starter: "20+", standard: "40+", pro: "40+", agency: "40+" },
      { module: "Voice messages", starter: "Input → text", standard: "Input + /voice reply", pro: "Everywhere + custom voice", agency: "Everywhere + custom voice" },
      { module: "Interface languages", starter: "EN + RU", standard: "EN, RU, +1 on request", pro: "EN, RU, +1 on request", agency: "Any on request" },
      { module: "Mini-app", starter: "Basic", standard: "Standard", pro: "Branded", agency: "Custom branded" },

      { kind: "section", label: "Security" },
      { module: "Encrypted storage", starter: "Yes", standard: "Yes", pro: "Yes", agency: "Yes" },
      { module: "Per-topic isolation", starter: "Yes", standard: "Yes", pro: "Yes", agency: "Yes" },
      { module: "Audit log", starter: "—", standard: "Yes", pro: "Yes", agency: "Yes" },
      { module: "SSO / SAML", starter: "—", standard: "—", pro: "—", agency: "On request" },

      { kind: "section", label: "Support" },
      { module: "Human support / month", starter: "2h", standard: "5h", pro: "8h", agency: "16h" },
      { module: "Response SLA", starter: "—", standard: "4h", pro: "2h", agency: "1h" },
      { module: "Strategy session", starter: "—", standard: "—", pro: "Quarterly", agency: "Quarterly + success manager" },
      { module: "Priority bug fixes", starter: "—", standard: "—", pro: "—", agency: "Yes" },
    ],
  },
  differentiators: {
    eyebrow: "vs. the rest",
    h2: "Why GramFleet vs. Hermify, OpenClaw, or SaleBot.",
    sub: "Per-topic isolation is the architecture — no other managed Telegram product offers it. Add 24-hour setup and Russian-friendly payments, and the comparison gets short.",
    bullets: [
      "Per-topic isolation — every agent has its own memory and skills",
      "Managed, not DIY — we run the infrastructure for you",
      "24-hour setup, not weeks of self-hosting",
      "Russian-friendly — payments via Telegram Stars, crypto, Stripe",
    ],
    columns: ["GramFleet", "Hermify", "OpenClaw", "SaleBot / BotHelp"],
    rows: [
      { label: "Telegram-native", values: ["✅", "✅", "✅", "⚠️"] },
      { label: "Per-topic isolation", values: ["✅", "❌", "✅", "❌"] },
      { label: "Managed (not self-host)", values: ["✅", "✅", "❌", "✅"] },
      { label: "Multi-agent team", values: ["✅", "❌", "✅", "❌"] },
      { label: "24-hour setup", values: ["✅", "⚠️", "❌", "⚠️"] },
      { label: "Russian-friendly", values: ["✅", "⚠️", "❌", "✅"] },
      { label: "Price range", values: ["$149-1,299", "$49-99", "Free (DIY)", "$30"] },
    ],
    footnote: "Sources: vendor websites and live demos, May 2026. Comparison updated quarterly.",
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
    seeProductsCta: "Смотреть шаблоны топиков",
    yearTag: "Сделано для операторов 2026",
  },
  nav: {
    products: "Топики",
    pricing: "Цены",
    process: "Процесс",
    faq: "FAQ",
    cta: "Начать",
    telegram: "Написать в Телеграм",
    telegramHref: "https://t.me/gramfleet_bot",
  },
  hero: {
    eyebrow: "25+ шаблонов топиков. Один Telegram-штаб.",
    h1Lines: ["Создай свой AI-штаб", "из рабочих топиков", "в Telegram"],
    lead:
      "Выбери из 25+ шаблонов. Plans, Research, Leads, Calendar — каждый топик помнит всё и работает 24/7. От $149/мес.",
    primary: "Попробовать 14 дней бесплатно",
    secondary: "Смотреть шаблоны топиков",
    trustLabel: "Для операторов бизнеса в",
    trustItems: ["Запуск за 24 часа", "Память и скиллы в каждом топике", "Ваши данные на вашем сервере"],
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
    eyebrow: "Специалисты внутри топиков",
    h2: "Специалисты, которые живут внутри шаблонов топиков.",
    sub: "Выбираешь топик — получаешь специалиста внутри. У каждого своя память, свои навыки и одна задача — Планировщик ведёт календарь, Исследователь делает ресёрч, Лидогенератор гонит лиды. Переключаешь топик — переключаешь контекст.",
    perCard: { from: "От", delivery: "Запуск", learnMore: "Подробнее" },
  },
  products: {
    planner: {
      num: "01",
      badge: "Каждый день",
      badgeKind: "default",
      name: "AI Planner",
      tagline: "Ведёт твой календарь, задачи и цели.",
      hook: "Календарь, задачи и цели — прямо в Telegram. Умные напоминания, прогресс-бары, проектные доски.",
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
      tagline: "Deep research, анализ конкурентов, OSINT.",
      hook: "Глубокие исследования, парсинг, OSINT, анализ конкурентов — по запросу в Telegram.",
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
      tagline: "Лиды, follow-ups, автоматизация.",
      hook: "Лиды, follow-ups и повторяющиеся процессы — всё через ваш топик в Telegram.",
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
      tagline: "KPI и отчёты прямо в Telegram.",
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
      tagline: "Код, лендинги, интеграции.",
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
      badge: "Premium upsell",
      badgeKind: "new",
      name: "Кастомный агент",
      tagline: "Создай агента под свою задачу.",
      hook: "Агент под ваш бизнес-процесс — вашу отрасль, ваших клиентов, ваши операции. Кастомный AGENT.md, кастомные скиллы, кастомный голос. Включён в Standard/Pro (1) и Agency (3).",
      bullets: [
        "Спроектирован под ваш конкретный процесс",
        "Кастомный AGENT.md, кастомные скиллы, кастомный голос",
        "1 включён в Standard и Pro, 3 в Agency",
        "Дополнение к любому тарифу — обсудим",
      ],
      fromPrice: "$0 со Standard",
      delivery: "5 дней",
      image: "/products/agent-5.webp",
      tiers: [
        {
          name: "Со Standard",
          price: "Включено",
          delivery: "5 дней",
          features: ["1 Кастомный агент", "Строим под ваш процесс", "Живёт в собственном топике", "Полная собственность за вами"],
        },
        {
          name: "С Pro",
          price: "Включено",
          delivery: "5 дней",
          features: ["1 Кастомный агент", "Приоритетная разработка скиллов", "Квартальная стратегическая встреча", "Приватный репозиторий"],
          highlight: true,
        },
        {
          name: "С Agency",
          price: "До 3 включено",
          delivery: "10 дней",
          features: ["До 3 Кастомных агентов", "Поддержка white-label", "Персональный success-менеджер", "Брендированное мини-приложение"],
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
    eyebrow: "Чем мы отличаемся",
    h2: "Шесть киллер-фич, которых нет больше нигде.",
    sub: "Пять работают в проде прямо сейчас. Одна — выходит в Q3 2026.",
    items: [
      {
        tag: "Шаблоны",
        title: "100+ шаблонов топиков — ставятся за один тап",
        body: "Все сферы закрыты из коробки: планирование, ресёрч, финансы, здоровье, путешествия, маркетинг, контент, лиды, аналитика, разработка. Выбирай нужное, добавляй когда угодно. Библиотека постоянно растёт — кастомные шаблоны делаем по запросу.",
      },
      {
        tag: "Гибкость",
        title: "Соло или команда — одна группа работает для всех",
        body: "Начни один. Добавь команду без переконфигурации. Все авторизованные участники работают со всеми агентами одновременно. Владелец управляет доступом по ролям. Никаких тарифов за место, никакого переонбординга при росте.",
      },
      {
        tag: "Интеграции",
        title: "20+ интеграций — коннекторы докупаются à la carte",
        body: "Notion, Google Calendar, Google Drive, Gmail, Stripe, Odoo, AdSub (мультипостинг + генерация рекламы), HubSpot, Linear и другие. Каждый коннектор напрямую подключается к агентам — они работают с реальными данными, а не просто болтают о них.",
      },
      {
        tag: "Маркетплейс",
        title: "Магазин скиллов и MCP — расширяй любого агента",
        body: "Добавляй новые возможности к любому агенту: продвинутый парсинг, OSINT, генерация изображений, дата-пайплайны, кастомные MCP-интеграции. Стек агентов растёт вместе с бизнесом — без переделки с нуля.",
      },
      {
        tag: "Пайплайн",
        title: "Задачи выполняются пока вы спите",
        body: "Поставьте задачу вечером — утром получите результат. Пайплайн забирает задачи из очереди по одной, прогоняет цикл критик → исполнитель → QA, фиксирует результат и отчитывается в вашем топике. Агенты не ждут, пока вы онлайн.",
      },
      {
        tag: "Founder OS",
        title: "Founder OS — видишь все свои топики сразу",
        body: "Одна команда покажет, над чем работает каждый топик, что заблокировано, где нужно твоё внимание. Мониторинг своего пространства и работы команды в одном месте — без дашбордов, без статус-звонков. Выходит в Q3 2026.",
      },
    ],
  },
  process: {
    eyebrow: "Как это работает",
    h2: "Выбери топики → Получи специалистов → Пиши в Telegram.",
    sub: "Три шага. Без нового приложения. Получаешь AI-штаб прямо в той Telegram-группе, которой ты уже пользуешься каждый день.",
    steps: [
      { step: "01", title: "Выбери топики, нужные твоему бизнесу", body: "25+ готовых шаблонов на выбор — Plans, Research, Leads, Calendar, Analytics, Content, Developer, Diary. Собирай свой набор под свой процесс. Добавлять можно в любой момент." },
      { step: "02", title: "Каждый топик получает AI-специалиста с памятью", body: "Каждый топик — это кабинет с одним специалистом внутри. Он помнит каждое сообщение, файл и решение в этом топике — навсегда. Переключил топик — переключил контекст." },
      { step: "03", title: "Пиши в Telegram как обычно — AI всё помнит и делает", body: "Кинул сообщение в топик Research — получил глубокий бриф к обеду. Переслал лид в топик Leads — квалифицирован и обработан ночью. 24/7, без дашбордов." },
    ],
  },
  pricing: {
    eyebrow: "Цены",
    h2: "Четыре тарифа. По числу топиков. Отмена в любой момент.",
    sub: "14 дней бесплатно — без карты. Starter $149/мес (5 топиков, соло). Standard $399/мес (12 топиков, 3 пользователя). Pro $699/мес (25 топиков + Opus). Agency $1 299/мес (без лимита + white-label).",
    productTab: "Топик",
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
        a: "GramFleet превращает твою Telegram-группу в AI-штаб, собранный из шаблонов топиков. Каждый топик — это рабочий кабинет со своим AI-специалистом внутри: Plans, Research, Leads, Calendar, Analytics, Developer и ещё 20+. Ты выбираешь нужные топики, AI живёт внутри каждого с полной памятью, а ты продолжаешь работать в Telegram.",
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
        q: "Что такое 'шаблон топика'?",
        a: "Шаблон топика — это готовый рабочий кабинет с AI-специалистом внутри. Шаблоны включают Plans, Research, Leads, Calendar, Analytics, Developer, Content, Diary, Support и другие. Выбираешь шаблон, кидаешь в свой Telegram — мгновенно получаешь выделенный кабинет с памятью и навыками под конкретную задачу. Переключаешь топик — переключаешь контекст. Без промптов.",
      },
      {
        q: "Зачем платить $499, если есть ChatGPT за $20?",
        a: "ChatGPT — один чат без памяти между сессиями, без реальных инструментов, без доступа для команды. GramFleet — 6 изолированных специалистов: каждый помнит всё с первого дня, работает с 40+ live-инструментами (парсинг, код, календарь, KPI), и вся команда работает с ними одновременно. Разница как между одним стажёром-генералистом и целым отделом с памятью.",
      },
      {
        q: "Чем отличается от Hermify и других Telegram AI-ботов?",
        a: "Hermify подключает одну AI-модель к одному боту Telegram — один агент, один контекст, одна задача. GramFleet разворачивает команду: каждая ветка форума — отдельный специалист с изолированной памятью и выделенными навыками. На практике это важно: Researcher не смешивает контекст с Planner, Automator не замедляется когда Analyst строит отчёт. Per-topic isolation — это архитектура, которой нет ни у одного другого managed-продукта.",
      },
      {
        q: "Работает ли в России и СНГ?",
        a: "Да — и это одно из наших главных преимуществ. ChatGPT и Claude требуют иностранный номер телефона, VPN и зарубежную карту. GramFleet работает прямо в Telegram (который у вас уже есть), принимает оплату через Telegram Stars, Stripe и крипту, и не требует ничего, кроме аккаунта в Telegram. Запуск за 24 часа — никакой дополнительной инфраструктуры.",
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
      productLabel: "Какой топик интересует",
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
      backToProduct: "Посмотреть другие топики",
      tierEyebrow: "Вы выбираете",
      regularPrice: "Обычная",
      yourPrice: "Ваша цена",
      includedTitle: "Что входит",
    },
  },
  footer: {
    tagline: "Твой AI-штаб из шаблонов топиков прямо в Telegram. 25+ кабинетов, один бот.",
    columns: [
      {
        title: "Топики",
        links: [
          { label: "Plans", href: "#topics" },
          { label: "Research", href: "#topics" },
          { label: "Leads", href: "#topics" },
          { label: "Analytics", href: "#topics" },
          { label: "Developer", href: "#topics" },
          { label: "Content", href: "#topics" },
        ],
      },
      {
        title: "Компания",
        links: [
          { label: "Процесс", href: "#process" },
          { label: "Цены", href: "#pricing" },
          { label: "FAQ", href: "#faq" },
          { label: "Начать", href: "#book" },
          { label: "Безопасность и DPA", href: "/security" },
          { label: "Для России (без VPN)", href: "/ru" },
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
  topicTemplates: {
    eyebrow: "Шаблоны топиков",
    h2: "25+ шаблонов топиков. Бери те, что реально нужны твоему бизнесу.",
    sub: "Каждый шаблон — это рабочий кабинет со специалистом внутри. Своя память, свои навыки, одна задача. Открыл топик — он уже работает.",
    items: [
      { slug: "plans", icon: "🗂", name: "Plans", role: "Плановик", desc: "Календарь, задачи, цели — ведутся и напоминают прямо в Telegram." },
      { slug: "research", icon: "🔬", name: "Research", role: "Исследователь", desc: "Ищет конкурентов, анализирует рынок, пишет ресёрч со ссылками." },
      { slug: "leads", icon: "🎯", name: "Leads", role: "Лидогенератор", desc: "Квалифицирует входящие лиды, пишет ответы, не теряет follow-up." },
      { slug: "calendar", icon: "📅", name: "Calendar", role: "Планировщик", desc: "Бронирует встречи, переносит, защищает focus-блоки — без переписки." },
      { slug: "analytics", icon: "📊", name: "Analytics", role: "Аналитик", desc: "Дайджест KPI из всех подключённых инструментов — аномалии в чат." },
      { slug: "developer", icon: "💻", name: "Developer", role: "Разработчик", desc: "Лендинги, внутренние тулы, интеграции — по описанию на человеческом." },
      { slug: "diary", icon: "📓", name: "Diary", role: "Дневник", desc: "Записывает решения, уроки, настроение — поиск, недельная сводка." },
      { slug: "content", icon: "✍️", name: "Content", role: "Контент", desc: "Драфтит посты, сценарии, письма — твоим голосом, по графику." },
      { slug: "support", icon: "🤝", name: "Support", role: "Поддержка", desc: "Отвечает на FAQ, разводит тикеты, эскалирует только важное." },
      { slug: "finance", icon: "💰", name: "Finance", role: "Финансист", desc: "Расходы, доходы, счета, подписки — еженедельный дайджест прямо в чат." },
      { slug: "health", icon: "🏃", name: "Health", role: "Здоровье", desc: "Тренировки, метрики, привычки — без отдельного приложения." },
      { slug: "travel", icon: "✈️", name: "Travel", role: "Трипплановщик", desc: "Планирует поездки, бронирования, маршруты — синхронизируется с календарём." },
      { slug: "shopping", icon: "🛒", name: "Shopping", role: "Шопинг", desc: "Вишлисты, отслеживание цен, контроль заказов — меньше вкладок в браузере." },
      { slug: "habits", icon: "⚡", name: "Habits", role: "Привычки", desc: "Ежедневные чекины, серии, рефлексия — дисциплина без отдельного приложения." },
      { slug: "contracts", icon: "📋", name: "Contracts", role: "Юридик", desc: "Проверяет документы, флагует риски, отслеживает дедлайны и продления." },
    ],
    cta: "Все 30+ шаблонов",
    caption: "Нужен шаблон, которого нет? На Standard и выше — строим кастомные топики под ваш процесс.",
  },
  topicBundles: {
    eyebrow: "Популярные наборы",
    h2: "Популярные наборы топиков по ролям.",
    sub: "Обкатанные комбинации, которые операторы собирают в первый день. Переключай и микшируй — на каждом тарифе топики можно менять в любой момент.",
    items: [
      {
        audience: "Для маркетолога",
        title: "Growth HQ",
        topics: ["Plans", "Content", "Research", "Leads"],
        plan: "Подходит под Standard ($399/мес, до 12 топиков)",
      },
      {
        audience: "Для фаундера",
        title: "Founder HQ",
        topics: ["Plans", "Developer", "Analytics", "Calendar"],
        plan: "Подходит под Standard ($399/мес, до 12 топиков)",
      },
      {
        audience: "Для агентства",
        title: "Agency HQ",
        topics: ["Leads × N", "Support", "Analytics"],
        plan: "Подходит под Pro или Agency — масштабирование на клиента",
      },
      {
        audience: "Для соло-фаундера",
        title: "Personal HQ",
        topics: ["Plans", "Finance", "Health", "Habits", "Diary"],
        plan: "Подходит под Starter ($149/мес, до 5 топиков)",
      },
    ],
  },
  subscriptionPlan: {
    toggle: {
      setupOnly: "Только настройка",
      setupMonthly: "Настройка + Подписка",
      monthlyOnly: "Только подписка",
    },
    plans: [
      {
        name: "Starter",
        setupPrice: "Бесплатно",
        monthlyPrice: "$149 / мес",
        buildTime: "24ч",
        includes: [
          "До 5 топиков",
          "Выбор из 25+ шаблонов топиков",
          "AI-модель GLM",
          "1 пользователь",
          "20+ готовых навыков",
          "Двуязычный интерфейс (РУС + АНГ)",
          "Голосовой ввод — наговорил, получил ответ текстом",
          "Шифрованное хранилище, изоляция по топикам",
          "AI-поддержка 24/7",
          "14 дней пробный период — без карты",
        ],
        forWho: "Соло-фаундеры, фрилансеры — фокусированный набор топиков",
        cta: "Начать 14 дней бесплатно",
        ctaStyle: "outline" as const,
      },
      {
        name: "Standard",
        tag: "Рекомендуем",
        setupPrice: "$500 (бесплатно при оплате 3 мес. вперёд)",
        monthlyPrice: "$399 / мес",
        buildTime: "24ч",
        includes: [
          "До 12 топиков",
          "Выбор из 25+ шаблонов топиков",
          "Claude Sonnet + GLM (авто-fallback)",
          "3 пользователя",
          "40+ готовых навыков",
          "Полный i18n интерфейс (РУС, АНГ, +1 по запросу)",
          "Голосовые сообщения — вход и голосовой ответ через /voice",
          "Шифрование, изоляция по топикам, audit log, безопасный рестарт",
          "1 кастомный топик строим под ваш процесс",
          "5ч человеческой поддержки/мес, SLA ответа 4ч",
          "14 дней пробный период — без карты",
        ],
        forWho: "Команды 2-5. Маркетинг, ops, фаундеры — несколько процессов параллельно.",
        cta: "Начать 14 дней бесплатно",
        ctaStyle: "primary" as const,
      },
      {
        name: "Pro",
        setupPrice: "$1,000 (бесплатно при оплате 3 мес. вперёд)",
        monthlyPrice: "$699 / мес",
        buildTime: "24ч",
        includes: [
          "До 25 топиков",
          "Все 25+ шаблонов топиков открыты",
          "Claude Opus + Sonnet + GLM",
          "10 пользователей",
          "1 кастомный топик в год включён",
          "Голосовые сообщения везде + кастомный голос",
          "Усиленная безопасность: шифрование, изоляция, audit, кастомный retention",
          "Брендированное мини-приложение",
          "8ч человеческой поддержки/мес, SLA ответа 2ч",
          "Квартальная стратегическая встреча",
        ],
        forWho: "Mid-market и растущий SMB — много процессов одновременно",
        cta: "Записаться на демо",
        ctaStyle: "primary" as const,
      },
      {
        name: "Agency",
        setupPrice: "$2,500",
        monthlyPrice: "$1,299 / мес",
        buildTime: "48ч",
        includes: [
          "Без лимита топиков",
          "Без лимита кастомных шаблонов",
          "Claude Opus как основная + Sonnet + GLM",
          "Без лимита пользователей",
          "Полный white-label — ваш домен, ваш бот, ваши цвета",
          "SSO/SAML по запросу",
          "Мультиязычный интерфейс — любой язык",
          "Кастомное брендированное мини-приложение",
          "16ч человеческой поддержки/мес, SLA ответа 1ч",
          "Персональный success-менеджер",
          "Приоритетный фикс багов",
        ],
        forWho: "Агентства, мульти-клиентский white-label — один штаб на клиента",
        cta: "Обсудить",
        ctaStyle: "outline" as const,
      },
    ],
    compatTitle: "Что входит в каждый тариф",
    compatCaption:
      "Каждый тариф — своя комбинация агентов, топиков и поддержки. Большинство команд начинают на Standard. Помогаем выбрать на звонке.",
    compatModuleHeader: "Модуль",
    agentsSectionLabel: "Агенты",
    compatRows: [
      { kind: "section", label: "Агенты" },
      { module: "AI Planner", starter: "Да", standard: "Да", pro: "Да", agency: "Да" },
      { module: "AI Researcher", starter: "Базовый", standard: "Полный", pro: "Полный + OSINT", agency: "Полный + аналитик" },
      { module: "AI Automator", starter: "—", standard: "10 процессов", pro: "Без лимита", agency: "Без лимита" },
      { module: "AI Analyst", starter: "Дайджест", standard: "Алерты", pro: "Кастомный дашборд", agency: "Кастомное приложение" },
      { module: "AI Developer", starter: "3 задачи/мес", standard: "Без лимита", pro: "Без лимита + приоритет", agency: "Без лимита + приоритет" },
      { module: "AI Concierge (white-label)", starter: "—", standard: "—", pro: "—", agency: "Да" },
      { module: "Кастомные топики (строим мы)", starter: "—", standard: "1", pro: "1 (приоритетный)", agency: "Без лимита" },

      { kind: "section", label: "Команда и лимиты" },
      { module: "Пользователи", starter: "1", standard: "3", pro: "10", agency: "Без лимита" },
      { module: "Топики", starter: "5", standard: "12", pro: "25", agency: "Без лимита" },
      { module: "Кастомные навыки в год", starter: "—", standard: "—", pro: "1 в год", agency: "2+ в год" },

      { kind: "section", label: "ИИ и интерфейс" },
      { module: "AI-модель", starter: "GLM", standard: "Claude Sonnet + GLM", pro: "Claude Opus + Sonnet + GLM", agency: "Claude Opus + Sonnet + GLM" },
      { module: "Готовые навыки", starter: "20+", standard: "40+", pro: "40+", agency: "40+" },
      { module: "Голосовые сообщения", starter: "Голос → текст", standard: "Вход + /voice ответ", pro: "Везде + кастомный голос", agency: "Везде + кастомный голос" },
      { module: "Языки интерфейса", starter: "РУС + АНГ", standard: "РУС, АНГ, +1 по запросу", pro: "РУС, АНГ, +1 по запросу", agency: "Любой по запросу" },
      { module: "Мини-приложение", starter: "Базовое", standard: "Стандартное", pro: "Брендированное", agency: "Кастомное брендированное" },

      { kind: "section", label: "Безопасность" },
      { module: "Шифрованное хранилище", starter: "Да", standard: "Да", pro: "Да", agency: "Да" },
      { module: "Изоляция по топикам", starter: "Да", standard: "Да", pro: "Да", agency: "Да" },
      { module: "Audit log", starter: "—", standard: "Да", pro: "Да", agency: "Да" },
      { module: "SSO / SAML", starter: "—", standard: "—", pro: "—", agency: "По запросу" },

      { kind: "section", label: "Поддержка" },
      { module: "Поддержка / мес", starter: "2ч", standard: "5ч", pro: "8ч", agency: "16ч" },
      { module: "SLA ответа", starter: "—", standard: "4ч", pro: "2ч", agency: "1ч" },
      { module: "Стратегические встречи", starter: "—", standard: "—", pro: "Раз в квартал", agency: "Раз в квартал + менеджер" },
      { module: "Приоритетный фикс багов", starter: "—", standard: "—", pro: "—", agency: "Да" },
    ],
  },
  differentiators: {
    eyebrow: "vs. остальные",
    h2: "Почему GramFleet, а не Hermify, OpenClaw или SaleBot.",
    sub: "Изоляция по топикам — это архитектура, которой нет ни у одного другого managed-продукта в Telegram. Добавьте 24-часовой запуск и payments без VPN — сравнение становится коротким.",
    bullets: [
      "Per-topic isolation — у каждого агента своя память и скиллы",
      "Managed, не DIY — мы держим инфраструктуру",
      "Запуск за 24 часа, а не недели self-hosting",
      "Russian-friendly — Telegram Stars, крипта, Stripe",
    ],
    columns: ["GramFleet", "Hermify", "OpenClaw", "SaleBot / BotHelp"],
    rows: [
      { label: "Нативно в Telegram", values: ["✅", "✅", "✅", "⚠️"] },
      { label: "Изоляция по топикам", values: ["✅", "❌", "✅", "❌"] },
      { label: "Managed (не self-host)", values: ["✅", "✅", "❌", "✅"] },
      { label: "Multi-agent команда", values: ["✅", "❌", "✅", "❌"] },
      { label: "Запуск за 24ч", values: ["✅", "⚠️", "❌", "⚠️"] },
      { label: "Russian-friendly", values: ["✅", "⚠️", "❌", "✅"] },
      { label: "Цена", values: ["$149-1,299", "$49-99", "Free (DIY)", "$30"] },
    ],
    footnote: "Источники: сайты вендоров и live-демо, май 2026. Обновляется ежеквартально.",
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
