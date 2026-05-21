export type ProductTier = {
  name: string;
  price: number;
  delivery: string;
  features: string[];
};

export type ProductCase = {
  client: string;
  role: string;
  before: string;
  after: string;
  metric: string;
};

export type Product = {
  slug: string;
  num: string;
  badge: string;
  name: string;
  tagline: string;
  hero: string;
  problem: string;
  outcome: string;
  deliverables: string[];
  impact: { metric: string; label: string; detail: string }[];
  howItWorks: { step: string; title: string; body: string }[];
  case: ProductCase;
  tiers: ProductTier[];
  faqs: { q: string; a: string }[];
};

export const PRODUCTS: Record<string, Product> = {
  planner: {
    slug: "planner",
    num: "01",
    badge: "Daily driver",
    name: "AI Planner",
    tagline: "Plans, tasks, and goals in your Telegram.",
    hero: "Plans, tasks, goals tracker that lives in a Telegram forum topic. Smart reminders, progress bars, project boards — without leaving the app you already use.",
    problem: "Your plans live in five tools. Your team uses none of them consistently. By Friday you've forgotten what Monday-you committed to.",
    outcome: "A topic agent in your Telegram group that holds every plan, task, and goal — and pings the right person at the right time.",
    deliverables: [
      "Dedicated planner agent in a forum topic",
      "Smart reminders trained on your work rhythm",
      "Progress bars and project boards inside Telegram",
      "Daily and weekly review prompts",
      "Voice capture (Standard and above)",
      "Quarterly strategy session (Premium)",
    ],
    impact: [
      { metric: "11h", label: "Saved per week", detail: "Most operators recover at least one full working day in the first month." },
      { metric: "24h", label: "Setup time", detail: "From Discovery Call to working planner in your Telegram group." },
      { metric: "100%", label: "Inside Telegram", detail: "No new apps. No new tabs. The tool follows your team into the place they already chat." },
    ],
    howItWorks: [
      { step: "01", title: "Discovery", body: "30-min call. We map your week and decide the topic structure." },
      { step: "02", title: "Setup", body: "We deploy the agent, wire your calendar, and load your active goals into memory." },
      { step: "03", title: "Run", body: "Your team starts using it the same day. The agent learns your tone over the first two weeks." },
    ],
    case: {
      client: "Solo founder",
      role: "B2B SaaS, 2-person team",
      before: "Plans in Notion, reminders in Google Calendar, tasks in Linear, nothing connected.",
      after: "Single Telegram topic holds the week. Smart reminders fire at the right time. Reviews are conversational, not bureaucratic.",
      metric: "Recovered 11 hours per week within 30 days.",
    },
    tiers: [
      { name: "Lite", price: 199, delivery: "24h setup", features: ["Basic plans + tasks", "Smart reminders", "1 user", "Default boards"] },
      { name: "Standard", price: 499, delivery: "24h setup", features: ["Everything in Lite", "Voice capture", "3 users", "Custom boards"] },
      { name: "Premium", price: 899, delivery: "48h setup", features: ["Everything in Standard", "Unlimited users", "Quarterly strategy", "White-label"] },
    ],
    faqs: [
      { q: "Does it replace Notion or Linear?", a: "It doesn't have to. AI Planner pulls from your existing tools and centralizes the orchestration in Telegram. Your team keeps what it loves." },
      { q: "What if I prefer voice?", a: "Standard and Premium include voice capture — record a 30-second voice memo, get structured tasks back." },
    ],
  },
  researcher: {
    slug: "researcher",
    num: "02",
    badge: "Most popular",
    name: "AI Researcher",
    tagline: "Deep research on demand.",
    hero: "Deep research, web scraping, OSINT, and competitive analysis delivered to a Telegram topic on schedule or on demand.",
    problem: "You burn hours googling, copying, summarizing, and forgetting. Research dies in a tab you'll never reopen.",
    outcome: "A researcher agent that scrapes, summarizes, and archives — sending findings into your Telegram topic with citations.",
    deliverables: [
      "Dedicated researcher agent",
      "Web scraping (up to 50 pages/day on Lite)",
      "OSINT and dossiers (Standard and above)",
      "Daily briefs on schedule",
      "Searchable archive of every brief",
      "Custom data sources (Premium)",
    ],
    impact: [
      { metric: "10x", label: "Faster research", detail: "What used to take an afternoon now lands as a brief while you make coffee." },
      { metric: "100%", label: "Cited", detail: "Every claim links back to a primary source. No more hallucinated facts." },
      { metric: "24/7", label: "On call", detail: "Send a query at 3am, get a brief by 3:05am." },
    ],
    howItWorks: [
      { step: "01", title: "Discovery", body: "We learn what you research and how often." },
      { step: "02", title: "Setup", body: "We configure data sources, scraping schedule, and the topic." },
      { step: "03", title: "Run", body: "Briefs land on schedule. Ad-hoc queries return in minutes." },
    ],
    case: {
      client: "Sales operator",
      role: "B2B agency, 8-person team",
      before: "Spent 6 hours per week on prospect research, often outdated by the time the call happened.",
      after: "Briefs delivered to Telegram 1 hour before each call. Fully cited. Always current.",
      metric: "Reclaimed 6 hours per week, closed 18% more first calls.",
    },
    tiers: [
      { name: "Lite", price: 199, delivery: "24h setup", features: ["Daily briefs", "50 pages/day scraping", "1 user", "Archive search"] },
      { name: "Standard", price: 499, delivery: "24h setup", features: ["Everything in Lite", "OSINT + dossiers", "3 users", "Voice query"] },
      { name: "Premium", price: 899, delivery: "48h setup", features: ["Everything in Standard", "Unlimited users", "Custom data sources", "Dedicated analyst"] },
    ],
    faqs: [
      { q: "Can it crawl private data?", a: "Only sources you authorize. We don't bypass authentication or scrape gated content without explicit permission." },
      { q: "How fresh are the briefs?", a: "Default daily. Configurable to hourly on Premium." },
    ],
  },
  automator: {
    slug: "automator",
    num: "03",
    badge: "Pro",
    name: "AI Automator",
    tagline: "Workflows that run themselves.",
    hero: "Automate routine workflows, process leads from form to CRM, schedule tasks, and send reports — all triggered and approved from a Telegram topic.",
    problem: "You hired humans for human work. They're spending half the day copy-pasting data between tools.",
    outcome: "An automator agent that handles the boring half — with you in the loop for approvals when it matters.",
    deliverables: [
      "Dedicated automator agent",
      "Pre-built workflow library (lead routing, daily reports, task scheduling)",
      "Approval steps in your Telegram topic",
      "Custom workflows (Standard and above)",
      "Voice triggers (Standard and above)",
      "2 custom skills per year (Premium)",
    ],
    impact: [
      { metric: "20+", label: "Hours saved monthly", detail: "Per team member, conservative. Some teams see double." },
      { metric: "Zero", label: "Clicks for routine", detail: "Workflows run on triggers. You see results, not steps." },
      { metric: "100%", label: "Approval visible", detail: "Every consequential action surfaces in your topic for one-tap approval." },
    ],
    howItWorks: [
      { step: "01", title: "Discovery", body: "We list your routine workflows and rank by leverage." },
      { step: "02", title: "Setup", body: "We deploy 3–10 workflows in 24 hours, wired to your real accounts." },
      { step: "03", title: "Run", body: "Automations fire. You approve the consequential ones from Telegram." },
    ],
    case: {
      client: "Operations manager",
      role: "Real estate agency, 25-person team",
      before: "Three hours per day on lead routing, follow-up scheduling, and weekly reports.",
      after: "Automator handles routing instantly. Reports compile themselves on Friday morning.",
      metric: "Saved 15 hours per week, no headcount added during 3x growth.",
    },
    tiers: [
      { name: "Lite", price: 199, delivery: "24h setup", features: ["3 workflows", "Lead processing", "1 user", "Daily report"] },
      { name: "Standard", price: 499, delivery: "24h setup", features: ["Everything in Lite", "10 workflows", "3 users", "Voice triggers"] },
      { name: "Premium", price: 899, delivery: "48h setup", features: ["Everything in Standard", "Unlimited workflows", "2 custom skills/year", "Priority bug fixes"] },
    ],
    faqs: [
      { q: "Will it integrate with my CRM?", a: "HubSpot, Pipedrive, Salesforce, Attio — all supported. If your CRM has an API, we connect it." },
      { q: "What if a workflow misfires?", a: "Premium includes a 2-hour response SLA and priority bug fixes. Every workflow has a rollback path." },
    ],
  },
  analyst: {
    slug: "analyst",
    num: "04",
    badge: "Business intelligence",
    name: "AI Analyst",
    tagline: "Your daily KPI digest.",
    hero: "A business dashboard that lives in a Telegram topic. KPI tracking, team analytics, anomaly alerts — summarized daily and on demand.",
    problem: "Your dashboards live somewhere nobody checks. By the time you notice a metric crashed, it crashed last week.",
    outcome: "An analyst agent that pushes the right numbers into your Telegram every morning — with anomalies surfaced before they hurt.",
    deliverables: [
      "Dedicated analyst agent",
      "Daily KPI digest in your topic",
      "Up to 5 tool connections on Lite, unlimited on Premium",
      "Anomaly alerts (Standard and above)",
      "Custom branded mini-app (Premium)",
      "Quarterly strategy session (Premium)",
    ],
    impact: [
      { metric: "60s", label: "To read", detail: "Your daily digest is a 60-second scroll. The dashboard you never opened doesn't help." },
      { metric: "−72h", label: "Detection lag", detail: "Anomalies surface in minutes, not at the end-of-month review." },
      { metric: "99.9%", label: "Uptime", detail: "Standard and Premium include a 99.9% uptime SLA." },
    ],
    howItWorks: [
      { step: "01", title: "Discovery", body: "We pick the 5–10 metrics that actually drive your business." },
      { step: "02", title: "Setup", body: "We wire your tools, calibrate anomaly thresholds, and ship the first digest in 24 hours." },
      { step: "03", title: "Run", body: "Every morning, your business in 60 seconds. Alerts as they happen." },
    ],
    case: {
      client: "SaaS founder",
      role: "Series A, 18-person team",
      before: "Looker dashboards that nobody opened. Quarterly board prep took 3 days.",
      after: "Daily digest in Telegram. Anomalies caught within hours. Board prep is a one-click PDF.",
      metric: "Cut board-prep time by 80%, caught a 14% churn spike 6 weeks early.",
    },
    tiers: [
      { name: "Lite", price: 199, delivery: "24h setup", features: ["Daily KPI digest", "5 tool connections", "1 user", "Basic mini-app"] },
      { name: "Standard", price: 499, delivery: "24h setup", features: ["Everything in Lite", "Anomaly alerts", "3 users", "Standard mini-app"] },
      { name: "Premium", price: 899, delivery: "48h setup", features: ["Everything in Standard", "Unlimited users", "Custom mini-app", "Quarterly strategy"] },
    ],
    faqs: [
      { q: "Which BI tools do you connect to?", a: "Direct APIs to GA4, Mixpanel, Stripe, HubSpot, Postgres, BigQuery. Custom sources on Premium." },
      { q: "What about my private data?", a: "Read-only by default. Data never leaves your cloud. Aggregations happen on GramFleet-controlled infrastructure scoped to your group." },
    ],
  },
  concierge: {
    slug: "concierge",
    num: "05",
    badge: "White-label",
    name: "AI Concierge",
    tagline: "Your brand. Your assistant.",
    hero: "A custom AI assistant trained on your brand voice, your knowledge base, and your workflows — deployed under your domain, your bot, your colors.",
    problem: "Generic AI sounds like generic AI. Your customers don't want a chatbot — they want you, scaled.",
    outcome: "A concierge agent indistinguishable from a senior team member — trained on your voice, your decisions, your library.",
    deliverables: [
      "Brand voice tuning",
      "Private knowledge base loaded with your library",
      "Custom workflows wired into your Telegram group",
      "White-label: your domain, your bot name, your colors",
      "Custom workflows (5 on Standard, unlimited on Premium)",
      "Dedicated success manager (Premium)",
    ],
    impact: [
      { metric: "1:1", label: "Sounds like you", detail: "Trained on transcripts and docs you provide. The voice is yours, not ours." },
      { metric: "24/7", label: "Senior coverage", detail: "Your assistant answers like your top operator, around the clock, in every timezone." },
      { metric: "100%", label: "White-label", detail: "Customers see your brand. No GramFleet logo, no shared infrastructure visible." },
    ],
    howItWorks: [
      { step: "01", title: "Discovery", body: "90-min deep dive. We collect transcripts, docs, and brand guidelines." },
      { step: "02", title: "Setup", body: "Brand voice tuning (3–5 days). Knowledge base load. White-label deployment." },
      { step: "03", title: "Run", body: "Assistant ships under your brand. Tuning continues for the first month based on real conversations." },
    ],
    case: {
      client: "Boutique consultancy",
      role: "Private wealth advisory, 12-person team",
      before: "Founder fielded 40+ client questions per day. Couldn't sleep. Couldn't scale.",
      after: "White-label concierge handles 70% of inbound. Founder reviews escalations once a day.",
      metric: "Reclaimed 5 hours daily. Added 11 clients in Q1 with same headcount.",
    },
    tiers: [
      { name: "Lite", price: 899, delivery: "48h setup", features: ["Brand voice tuning", "Custom knowledge base", "1 user", "Standard mini-app"] },
      { name: "Standard", price: 1499, delivery: "5 day setup", features: ["Everything in Lite", "Custom workflows (5)", "5 users", "Branded mini-app"] },
      { name: "Premium", price: 2499, delivery: "10 day setup", features: ["Everything in Standard", "Unlimited workflows", "Unlimited users", "Dedicated success manager"] },
    ],
    faqs: [
      { q: "How do you train the brand voice?", a: "We ingest transcripts (sales calls, support tickets, blog posts) and brand guidelines. Tuning runs 3–5 days. We benchmark against blind taste tests with your team." },
      { q: "Who owns the model?", a: "You own the knowledge base, the brand voice tuning, and the bot deployment. If you leave GramFleet, you keep all three. We don't gatekeep your data." },
    ],
  },
};

export const PRODUCT_SLUGS = Object.keys(PRODUCTS);
