import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  viewportFit: "cover",
  themeColor: "#2AABEE",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://gramfleet.ai"),
  title: "GramFleet — Your AI Team of Specialists, Inside Telegram",
  description:
    "A team of AI specialists inside your Telegram — Plans, Research, Leads, Calendar and 25+ ready workspaces. Each remembers everything and runs 24/7. Live on your server in 24h. No foreign card, no VPN. From $189/mo.",
  keywords: [
    "GramFleet",
    "AI topic templates",
    "Telegram AI HQ",
    "Personal AI Infrastructure",
    "AI agents in Telegram",
    "Telegram AI agent",
    "AI workspace templates",
    "Telegram AI specialists",
    "AI bot Telegram",
    "small business AI agents",
    "white-label AI agent",
  ],
  authors: [{ name: "GramFleet" }],
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
  alternates: {
    canonical: "https://gramfleet.ai/",
    languages: {
      en: "https://gramfleet.ai/",
      ru: "https://gramfleet.ai/ru",
      "x-default": "https://gramfleet.ai/",
    },
  },
  openGraph: {
    title: "GramFleet — Your AI Team of Specialists, Inside Telegram",
    description:
      "A team of AI specialists inside your Telegram. Plans, Research, Leads, Calendar — each remembers everything and runs 24/7. 24-hour setup, no VPN, no foreign card. From $189/mo.",
    type: "website",
    url: "https://gramfleet.ai/",
    images: ["https://gramfleet.ai/og-image.png"],
    locale: "en_US",
    siteName: "GramFleet",
  },
  twitter: {
    card: "summary_large_image",
    title: "GramFleet — Your AI Team of Specialists, Inside Telegram",
    description:
      "A team of AI specialists inside your Telegram — 25+ ready workspaces, each with its own memory, skills, and one job. From $189/mo.",
    images: ["https://gramfleet.ai/og-image.png"],
  },
  other: {
    "ai-content-declaration": "human-authored, AI-assisted",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": "https://gramfleet.ai/#org",
      name: "GramFleet",
      description:
        "Personal AI Infrastructure for business that lives inside Telegram. Each forum topic becomes an isolated AI agent with its own memory, skills, and context.",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Telegram",
      url: "https://gramfleet.ai/",
      offers: [
        { "@type": "Offer", name: "Starter", price: "189", priceCurrency: "USD", description: "GLM AI model, 2 users, up to 5 topics, 20+ skills, voice (30/mo), 24/7 AI support. 14-day free trial, no card." },
        { "@type": "Offer", name: "Standard", price: "449", priceCurrency: "USD", description: "Claude Sonnet + Haiku + GLM fallback, 5 users, up to 12 topics, 40+ skills, unlimited voice, 1 custom topic, 5h human support, 4h SLA." },
        { "@type": "Offer", name: "Pro", price: "799", priceCurrency: "USD", description: "Claude Opus + Sonnet + Haiku + GLM, 15 users, up to 25 topics, 6 custom skills, branded mini-app, 8h support, 2h SLA, quarterly strategy session." },
        { "@type": "Offer", name: "Agency", price: "1499", priceCurrency: "USD", description: "All models, unlimited users and topics, full white-label, SSO/SAML on request, dedicated success manager, 16h support, 1h SLA." },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://gramfleet.ai/#faq",
      mainEntity: [
        { "@type": "Question", name: "What is GramFleet?", acceptedAnswer: { "@type": "Answer", text: "GramFleet is Personal AI Infrastructure that lives entirely inside your Telegram. Every forum topic in your business group is an isolated AI agent with its own memory, skills, and context — your AI team without dashboards or new apps to learn." } },
        { "@type": "Question", name: "Do I need technical skills?", acceptedAnswer: { "@type": "Answer", text: "No. If you can use Telegram, you can use GramFleet. Setup takes 24 hours and we configure everything for you on a Discovery Call." } },
        { "@type": "Question", name: "Is my data secure?", acceptedAnswer: { "@type": "Answer", text: "Yes. GramFleet runs on your own server inside an encrypted Docker container — your data never leaves your infrastructure. Topic memory and your knowledge base are scoped to your group, never shared with third parties, and never used to train public models. Export or delete everything anytime." } },
        { "@type": "Question", name: "What AI model do you use?", acceptedAnswer: { "@type": "Answer", text: "Starter runs on GLM. Standard adds Claude Sonnet with Haiku and GLM fallback. Pro and Agency unlock Claude Opus as the primary model, with Sonnet, Haiku, and GLM beneath it." } },
        { "@type": "Question", name: "Can I cancel anytime?", acceptedAnswer: { "@type": "Answer", text: "Yes. Month-to-month subscription, cancel anytime. 30-day money-back guarantee on every plan." } },
        { "@type": "Question", name: "What is a topic agent?", acceptedAnswer: { "@type": "Answer", text: "A topic agent is a dedicated AI specialist assigned to a single forum topic in your Telegram group. Each topic has isolated memory, scoped skills, and a job to do — calendar, plans, research, analytics, or anything custom." } },
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://gramfleet.ai/#site",
      url: "https://gramfleet.ai/",
      name: "GramFleet",
      publisher: { "@id": "https://gramfleet.ai/#org" },
      inLanguage: ["en", "ru"],
      dateModified: "2026-06-11",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <Script
          id="ld-json"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
