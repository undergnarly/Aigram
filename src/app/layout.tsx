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
  title: "GramFleet — AI Team Inside Your Telegram",
  description:
    "GramFleet is Personal AI Infrastructure for business that lives inside your Telegram. Every forum topic becomes an isolated AI agent with its own memory, skills, and context. 24-hour setup. No new apps, no dashboards. From $199/month.",
  keywords: [
    "GramFleet",
    "Personal AI Infrastructure",
    "AI in Telegram",
    "Telegram AI agent",
    "AI assistant for business",
    "AI team",
    "Telegram automation",
    "AI bot Telegram",
    "small business AI",
    "white-label AI assistant",
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
      ru: "https://gramfleet.ai/",
      "x-default": "https://gramfleet.ai/",
    },
  },
  openGraph: {
    title: "GramFleet — AI Team Inside Your Telegram",
    description:
      "Personal AI Infrastructure for business that lives inside your Telegram. Topic agents with memory, skills, and context. From $199/month.",
    type: "website",
    url: "https://gramfleet.ai/",
    images: ["https://gramfleet.ai/og-image.png"],
    locale: "en_US",
    siteName: "GramFleet",
  },
  twitter: {
    card: "summary_large_image",
    title: "GramFleet — AI Team Inside Your Telegram",
    description:
      "Personal AI Infrastructure for business that lives inside your Telegram. From $199/month.",
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
        { "@type": "Offer", name: "Lite", price: "199", priceCurrency: "USD", description: "GLM AI model, 1 user, 6 default topics, 20+ skills, 24/7 AI support, 2h human support/month." },
        { "@type": "Offer", name: "Standard", price: "499", priceCurrency: "USD", description: "Claude Sonnet + GLM fallback, 3 users, 11 topics, 40+ skills, voice messages, 5h support, 4h SLA." },
        { "@type": "Offer", name: "Premium", price: "899", priceCurrency: "USD", description: "Claude Opus + Sonnet + GLM, unlimited users, unlimited topics, 2 custom skills/year, white-label mini-app, 10h support, 2h SLA." },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://gramfleet.ai/#faq",
      mainEntity: [
        { "@type": "Question", name: "What is GramFleet?", acceptedAnswer: { "@type": "Answer", text: "GramFleet is Personal AI Infrastructure that lives entirely inside your Telegram. Every forum topic in your business group is an isolated AI agent with its own memory, skills, and context — your AI team without dashboards or new apps to learn." } },
        { "@type": "Question", name: "Do I need technical skills?", acceptedAnswer: { "@type": "Answer", text: "No. If you can use Telegram, you can use GramFleet. Setup takes 24 hours and we configure everything for you on a Discovery Call." } },
        { "@type": "Question", name: "Is my data secure?", acceptedAnswer: { "@type": "Answer", text: "Yes. GramFleet runs on Telegram's end-to-end encrypted infrastructure. Your topic memory and knowledge base are scoped to your group and not shared with any third party." } },
        { "@type": "Question", name: "What AI model do you use?", acceptedAnswer: { "@type": "Answer", text: "Lite uses GLM. Standard uses Claude Sonnet with automatic GLM fallback. Premium uses Claude Opus with Sonnet and GLM as fallback tiers." } },
        { "@type": "Question", name: "Can I cancel anytime?", acceptedAnswer: { "@type": "Answer", text: "Yes. Month-to-month subscription, cancel anytime. 30-day money-back guarantee on every plan." } },
        { "@type": "Question", name: "What is a topic agent?", acceptedAnswer: { "@type": "Answer", text: "A topic agent is a dedicated AI assistant assigned to a single forum topic in your Telegram group. Each topic has isolated memory, scoped skills, and a job to do — calendar, plans, research, analytics, or anything custom." } },
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://gramfleet.ai/#site",
      url: "https://gramfleet.ai/",
      name: "GramFleet",
      publisher: { "@id": "https://gramfleet.ai/#org" },
      inLanguage: ["en", "ru"],
      dateModified: "2026-05-20",
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
