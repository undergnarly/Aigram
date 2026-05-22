import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Security & Privacy — GramFleet",
  description:
    "GramFleet security baseline: data flow diagram, retention policy (default 90 days, per-topic override), DPA template (GDPR Article 28), incident response playbook, no-training commitment.",
  alternates: { canonical: "https://gramfleet.ai/security" },
  robots: { index: true, follow: true },
};

const ACCENT = "#0088CC";

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
    <section id={id} className="mb-14 sm:mb-20 scroll-mt-24">
      <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-3">
        {eyebrow}
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 text-slate-900">
        {title}
      </h2>
      <div className="prose prose-slate max-w-none text-[15px] sm:text-base leading-relaxed text-slate-700">
        {children}
      </div>
    </section>
  );
}

function TocLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="block py-1.5 text-sm text-slate-600 hover:text-[#0088CC] border-l-2 border-transparent hover:border-[#0088CC] pl-3 transition-colors"
    >
      {label}
    </a>
  );
}

export default function SecurityPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Sticky top nav */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
          <Link href="/" className="font-bold text-[#0088CC]">
            GramFleet
          </Link>
          <Link href="/" className="text-xs sm:text-sm text-slate-600 hover:text-slate-900">
            ← Home
          </Link>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-14">
        {/* Hero */}
        <div className="mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-6 text-xs font-mono tracking-widest uppercase">
            <span className="text-slate-500">/security</span>
            <span className="px-2 py-1 rounded-full bg-[#0088CC]/15 text-[#0088CC]">
              Trust baseline
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] mb-5 text-slate-900">
            Security &amp; Privacy
          </h1>
          <p className="text-lg sm:text-xl text-slate-700 leading-relaxed mb-6">
            GramFleet is self-hosted infrastructure. Your data lives on your server,
            under your control. This page documents the data flow, our retention
            policy, our no-training commitment, the GDPR Article 28 DPA template,
            and our incident response playbook.
          </p>
          <p className="text-sm text-slate-500">
            Last updated: 2026-05-23. Owner:{" "}
            <a href="mailto:security@gramfleet.ai" className="text-[#0088CC] hover:underline">
              security@gramfleet.ai
            </a>
            .
          </p>
        </div>

        {/* TL;DR card */}
        <div className="rounded-2xl border border-[#0088CC]/30 bg-[#0088CC]/5 p-5 sm:p-7 mb-12 sm:mb-16">
          <div className="text-xs font-mono uppercase tracking-widest text-[#0088CC] mb-3">
            TL;DR
          </div>
          <ul className="space-y-2 text-[15px] sm:text-base text-slate-800">
            <li className="flex gap-3">
              <span className="text-[#0088CC] shrink-0">✓</span>
              <span>
                <strong>Self-hosted.</strong> No GramFleet cloud, no SaaS backend, no
                analytics pings.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#0088CC] shrink-0">✓</span>
              <span>
                <strong>No training on your data.</strong> Anthropic API and ElevenLabs
                contractually exclude API traffic from model training. Telegram never
                receives the LLM context.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#0088CC] shrink-0">✓</span>
              <span>
                <strong>Retention: 90 days by default.</strong> Configurable per topic
                via <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">/retention</code>{" "}
                (0 = keep forever, N = N days).
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#0088CC] shrink-0">✓</span>
              <span>
                <strong>DPA-ready.</strong> Article 28 GDPR template (
                <a
                  href="/legal/gramfleet-dpa-template.md"
                  download
                  className="text-[#0088CC] underline"
                >
                  download
                </a>
                ) and 72-hour breach notification (Article 33).
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#0088CC] shrink-0">✓</span>
              <span>
                <strong>Incident response playbook</strong> with severity tiers, GDPR
                notification templates, and a post-mortem checklist (
                <a
                  href="/legal/gramfleet-incident-response.md"
                  download
                  className="text-[#0088CC] underline"
                >
                  download
                </a>
                ).
              </span>
            </li>
          </ul>
        </div>

        {/* TOC */}
        <nav
          aria-label="Table of contents"
          className="mb-12 sm:mb-16 rounded-2xl border border-slate-200 p-5 sm:p-6 bg-slate-50/50"
        >
          <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-3">
            On this page
          </div>
          <div className="grid sm:grid-cols-2 gap-x-4 gap-y-1">
            <TocLink href="#data-flow" label="Data flow diagram" />
            <TocLink href="#what-leaves" label="What leaves your server" />
            <TocLink href="#where-stored" label="Where data is stored" />
            <TocLink href="#retention" label="Retention policy" />
            <TocLink href="#no-training" label="No training on your data" />
            <TocLink href="#encryption" label="Encryption" />
            <TocLink href="#access" label="Authentication &amp; access" />
            <TocLink href="#gdpr" label="GDPR &amp; DPA" />
            <TocLink href="#incident" label="Incident response" />
            <TocLink href="#disclosure" label="Vulnerability disclosure" />
            <TocLink href="#downloads" label="Downloads" />
          </div>
        </nav>

        {/* Data flow */}
        <Section id="data-flow" eyebrow="01 · Architecture" title="Data flow diagram">
          <p>
            GramFleet runs as a single daemon on your server. Every external call leaves
            from your machine — there is no GramFleet relay in the middle.
          </p>
          <div className="not-prose rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-6 overflow-x-auto mt-4">
            <pre className="text-[11px] sm:text-[13px] leading-snug font-mono text-slate-800 whitespace-pre">
{`   ┌──────────────────┐    TLS    ┌──────────────────┐
   │  Telegram user   │ ◄──────► │  Telegram Bot API │
   └──────────────────┘           └─────────┬─────────┘
                                            │ webhook / polling
                                            ▼
                              ┌──────────────────────────┐
                              │   GramFleet daemon       │
                              │   (your server)          │
                              │                          │
                              │   ┌──────────────────┐   │
                              │   │ topic-history    │   │  ← plain JSON
                              │   │ topic-memory/    │   │  ← lossless markdown
                              │   │ state.json       │   │  ← settings
                              │   └──────────────────┘   │
                              │                          │
                              └─────┬─────────┬──────────┘
                                    │         │
                          ┌─────────┘         └──────────┐
                          ▼ TLS                          ▼ TLS (optional)
                  ┌────────────────┐             ┌──────────────────┐
                  │  Anthropic API │             │  ElevenLabs API  │
                  │  (Claude LLM)  │             │  or Edge TTS     │
                  └────────────────┘             └──────────────────┘

   No GramFleet cloud. No analytics. No telemetry.`}
            </pre>
          </div>
          <p className="mt-4">
            The daemon spawns a worker subprocess per task. The worker uses Anthropic&apos;s
            Claude Code SDK. Voice synthesis is optional and goes to ElevenLabs (paid) or
            Microsoft Edge TTS (free default) only when the user explicitly asks for a
            voice reply.
          </p>
        </Section>

        {/* What leaves */}
        <Section
          id="what-leaves"
          eyebrow="02 · External surface"
          title="What leaves your server"
        >
          <div className="not-prose overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-300 text-left">
                  <th className="py-2 pr-4 font-semibold text-slate-900">Service</th>
                  <th className="py-2 pr-4 font-semibold text-slate-900">What is sent</th>
                  <th className="py-2 pr-4 font-semibold text-slate-900">Why</th>
                  <th className="py-2 font-semibold text-slate-900">Can be disabled</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <tr className="border-b border-slate-200">
                  <td className="py-3 pr-4 font-medium">Telegram Bot API</td>
                  <td className="py-3 pr-4">Message text, bot replies, user IDs</td>
                  <td className="py-3 pr-4">Core routing</td>
                  <td className="py-3">No — required transport</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-3 pr-4 font-medium">Anthropic API</td>
                  <td className="py-3 pr-4">
                    Conversation context (bounded by retention) + system prompt
                  </td>
                  <td className="py-3 pr-4">LLM inference</td>
                  <td className="py-3">Yes — swap to GLM or self-hosted model</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-3 pr-4 font-medium">ElevenLabs API</td>
                  <td className="py-3 pr-4">Bot reply text for TTS</td>
                  <td className="py-3 pr-4">Voice replies</td>
                  <td className="py-3">Yes — Edge TTS default, or disable voice</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium">Microsoft Edge TTS</td>
                  <td className="py-3 pr-4">Bot reply text for TTS</td>
                  <td className="py-3 pr-4">Voice replies (free default)</td>
                  <td className="py-3">Yes — disable voice globally</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-5">
            Nothing else leaves. No analytics, no telemetry, no usage reporting back to
            GramFleet. If you grep the source for{" "}
            <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">
              fetch(
            </code>
            , every call goes to one of the four endpoints above.
          </p>
        </Section>

        {/* Where stored */}
        <Section
          id="where-stored"
          eyebrow="03 · Storage"
          title="Where data is stored"
        >
          <p>
            Every persistent artifact lives on your server under{" "}
            <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">
              ~/.claude/PAI/PULSE/
            </code>
            :
          </p>
          <div className="not-prose overflow-x-auto mt-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-300 text-left">
                  <th className="py-2 pr-4 font-semibold text-slate-900">Path</th>
                  <th className="py-2 pr-4 font-semibold text-slate-900">Contents</th>
                  <th className="py-2 font-semibold text-slate-900">Sensitive?</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <tr className="border-b border-slate-200">
                  <td className="py-3 pr-4 font-mono text-[13px]">
                    data/topic-history.json
                  </td>
                  <td className="py-3 pr-4">Per-topic conversation history</td>
                  <td className="py-3 text-red-600 font-semibold">High</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-3 pr-4 font-mono text-[13px]">
                    data/topic-memory/&lt;topic&gt;.md
                  </td>
                  <td className="py-3 pr-4">Extracted long-term memory per topic</td>
                  <td className="py-3 text-red-600 font-semibold">High</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-3 pr-4 font-mono text-[13px]">
                    data/topic-bindings.json
                  </td>
                  <td className="py-3 pr-4">Topic → folder mapping</td>
                  <td className="py-3 text-amber-600 font-semibold">Moderate</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-3 pr-4 font-mono text-[13px]">state/state.json</td>
                  <td className="py-3 pr-4">Settings, retention config, tier info</td>
                  <td className="py-3 text-slate-500">Low</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-mono text-[13px]">logs/</td>
                  <td className="py-3 pr-4">Operational logs (no message content)</td>
                  <td className="py-3 text-slate-500">Low</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-5">
            We recommend{" "}
            <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">
              chmod 600
            </code>{" "}
            on{" "}
            <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">
              ~/.claude/.env
            </code>{" "}
            and{" "}
            <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">
              ~/.claude/PAI/PULSE/data/
            </code>
            , plus full-disk encryption for compliance.
          </p>
        </Section>

        {/* Retention */}
        <Section id="retention" eyebrow="04 · Retention" title="Retention policy">
          <p>
            Default conversation retention is <strong>90 days</strong>. Messages older
            than the window are permanently deleted by a daily sweep that runs at
            startup and every 24 hours. Pruned messages and their compacted summaries
            are removed atomically from disk.
          </p>
          <div className="not-prose rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5 mt-5 font-mono text-[13px] text-slate-800 space-y-1">
            <div>
              <span className="text-[#0088CC]">/retention</span>{" "}
              <span className="text-slate-500"># show current retention for this topic</span>
            </div>
            <div>
              <span className="text-[#0088CC]">/retention 30</span>{" "}
              <span className="text-slate-500"># 30-day retention for this topic</span>
            </div>
            <div>
              <span className="text-[#0088CC]">/retention 0</span>{" "}
              <span className="text-slate-500"># disable auto-pruning, keep forever</span>
            </div>
            <div>
              <span className="text-[#0088CC]">/retention reset</span>{" "}
              <span className="text-slate-500"># revert this topic to the global default</span>
            </div>
            <div>
              <span className="text-[#0088CC]">/retention global 90</span>{" "}
              <span className="text-slate-500"># change the global default</span>
            </div>
          </div>
          <p className="mt-5">
            Per-topic retention is useful when you want a tighter window on sensitive
            topics (e.g. legal at 14 days) and a longer one on knowledge base topics
            (e.g. research at 365 days).
          </p>
          <p>
            On-demand wipe: <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">/clear</code>{" "}
            inside a topic deletes the entire history for that topic immediately.
          </p>
        </Section>

        {/* No training */}
        <Section
          id="no-training"
          eyebrow="05 · No training"
          title="No training on your data"
        >
          <div className="not-prose rounded-2xl border-2 border-[#0088CC]/40 bg-[#0088CC]/5 p-5 sm:p-6 mb-5">
            <p className="text-lg font-semibold text-slate-900 mb-1">
              GramFleet conversations are not used to train AI models.
            </p>
            <p className="text-sm text-slate-700">
              This applies to the GramFleet codebase, our sub-processors, and any
              telemetry we collect (there is none).
            </p>
          </div>
          <p>How the no-training guarantee holds end-to-end:</p>
          <ul>
            <li>
              <strong>GramFleet itself</strong> is open-source software you run on your
              own server. We have no remote access to your conversation data and no
              backend that could ingest it.
            </li>
            <li>
              <strong>Anthropic (Claude API)</strong> contractually excludes API traffic
              from model training by default. See{" "}
              <a
                href="https://www.anthropic.com/legal/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0088CC] underline"
              >
                Anthropic privacy policy
              </a>{" "}
              and their{" "}
              <a
                href="https://www.anthropic.com/legal/commercial-terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0088CC] underline"
              >
                commercial terms
              </a>
              .
            </li>
            <li>
              <strong>ElevenLabs</strong> Enterprise/paid plans contractually exclude
              your text from model training. See{" "}
              <a
                href="https://elevenlabs.io/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0088CC] underline"
              >
                ElevenLabs privacy policy
              </a>
              .
            </li>
            <li>
              <strong>Microsoft Edge TTS</strong> (default voice path) and{" "}
              <strong>Telegram Bot API</strong> are routed through but never see the LLM
              context.
            </li>
          </ul>
          <p>
            To further minimize exposure: keep retention short on sensitive topics, use{" "}
            <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">
              /clear
            </code>{" "}
            after one-off confidential conversations, and route through GLM (open-weights
            via z.ai) or a self-hosted model if you must remove Anthropic entirely.
          </p>
        </Section>

        {/* Encryption */}
        <Section id="encryption" eyebrow="06 · Encryption" title="Encryption">
          <ul>
            <li>
              <strong>In transit:</strong> TLS 1.2+ on every external call (Telegram,
              Anthropic, ElevenLabs, Edge TTS).
            </li>
            <li>
              <strong>At rest:</strong> conversation history is plain JSON on disk —
              we recommend disk-level or filesystem-level encryption (LUKS, FileVault,
              dm-crypt) for compliance environments. Premium tier offers application-level
              envelope encryption on request.
            </li>
            <li>
              <strong>Secrets:</strong> bot tokens and API keys live in{" "}
              <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">
                ~/.claude/.env
              </code>
              . Set{" "}
              <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">
                chmod 600
              </code>{" "}
              and rotate quarterly.
            </li>
          </ul>
        </Section>

        {/* Access */}
        <Section
          id="access"
          eyebrow="07 · Access control"
          title="Authentication &amp; access"
        >
          <ul>
            <li>
              The bot answers only messages from the registered Telegram supergroup.
              Messages from any other chat are ignored.
            </li>
            <li>
              No web login. Telegram is the only control plane. There is no admin
              dashboard exposed to the public internet.
            </li>
            <li>
              Tier-based feature gates run in-process — no external authorization service
              to compromise.
            </li>
            <li>
              SSO/SAML available on Premium tier on request, integrated against your IdP.
            </li>
          </ul>
        </Section>

        {/* GDPR */}
        <Section id="gdpr" eyebrow="08 · GDPR" title="GDPR &amp; DPA">
          <p>
            GramFleet is infrastructure software you operate. In a team or organizational
            deployment:
          </p>
          <ul>
            <li>
              <strong>You</strong> act as <strong>data controller</strong> under Article
              4(7) GDPR.
            </li>
            <li>
              <strong>GramFleet (the software)</strong> acts as your{" "}
              <strong>data processor</strong>.
            </li>
            <li>
              <strong>Anthropic, ElevenLabs, Telegram, Microsoft</strong> are{" "}
              <strong>sub-processors</strong>. Maintain DPAs with each.
            </li>
          </ul>
          <p>
            We provide a fillable <strong>DPA template</strong> aligned with Article 28
            GDPR. It covers nature of processing, retention, technical and organizational
            measures (Article 32), sub-processor list with cross-border transfer
            mechanisms, breach notification (Article 33), and audit rights.
          </p>
          <div className="not-prose mt-5 flex flex-wrap gap-3">
            <a
              href="/legal/gramfleet-dpa-template.md"
              download
              className="inline-flex items-center gap-2 rounded-full bg-[#0088CC] text-white font-semibold px-5 py-2.5 text-sm hover:scale-[1.02] transition-transform"
            >
              ↓ Download DPA template (.md)
            </a>
            <a
              href="mailto:legal@gramfleet.ai"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 text-slate-700 font-semibold px-5 py-2.5 text-sm hover:border-[#0088CC] hover:text-[#0088CC] transition-colors"
            >
              Request a signed copy
            </a>
          </div>
          <p className="mt-5 text-sm text-slate-500">
            Data subject rights (GDPR Chapter III): erasure via{" "}
            <code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded">
              /clear
            </code>
            , access/portability via JSON export of{" "}
            <code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded">
              topic-history.json
            </code>
            , restriction via{" "}
            <code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded">
              /retention 0
            </code>
            .
          </p>
        </Section>

        {/* Incident */}
        <Section
          id="incident"
          eyebrow="09 · Breach response"
          title="Incident response"
        >
          <p>
            Our playbook follows GDPR Article 33–34 timelines and ISO 27001 A.16
            procedures. It defines four severity tiers (P1 critical → P4 low), each
            with response-time SLAs, and contains template notifications for
            supervisory authorities and data subjects.
          </p>
          <div className="not-prose overflow-x-auto mt-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-300 text-left">
                  <th className="py-2 pr-4 font-semibold text-slate-900">Severity</th>
                  <th className="py-2 pr-4 font-semibold text-slate-900">Example</th>
                  <th className="py-2 font-semibold text-slate-900">Response time</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <tr className="border-b border-slate-200">
                  <td className="py-3 pr-4 font-semibold text-red-600">P1 Critical</td>
                  <td className="py-3 pr-4">
                    Active data exfiltration, bot token leaked, history exposed
                  </td>
                  <td className="py-3">&lt; 1 hour</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-3 pr-4 font-semibold text-amber-600">P2 High</td>
                  <td className="py-3 pr-4">
                    Unauthorized access suspected, anomalous API usage
                  </td>
                  <td className="py-3">&lt; 4 hours</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-3 pr-4 font-semibold text-yellow-600">P3 Medium</td>
                  <td className="py-3 pr-4">Misconfiguration, no confirmed exposure</td>
                  <td className="py-3">&lt; 24 hours</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-semibold text-slate-500">P4 Low</td>
                  <td className="py-3 pr-4">Hardening needed, no active risk</td>
                  <td className="py-3">&lt; 7 days</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-5">
            Breach notification timeline: supervisory authority within{" "}
            <strong>72 hours</strong> (Article 33), data subjects “without undue delay”
            when high risk is likely (Article 34).
          </p>
          <div className="not-prose mt-5">
            <a
              href="/legal/gramfleet-incident-response.md"
              download
              className="inline-flex items-center gap-2 rounded-full bg-[#0088CC] text-white font-semibold px-5 py-2.5 text-sm hover:scale-[1.02] transition-transform"
            >
              ↓ Download incident response playbook (.md)
            </a>
          </div>
        </Section>

        {/* Disclosure */}
        <Section
          id="disclosure"
          eyebrow="10 · Disclosure"
          title="Vulnerability disclosure"
        >
          <p>
            Report security issues to{" "}
            <a
              href="mailto:security@gramfleet.ai"
              className="text-[#0088CC] underline"
            >
              security@gramfleet.ai
            </a>{" "}
            or open a GitHub issue with the{" "}
            <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">
              security
            </code>{" "}
            label.
          </p>
          <ul>
            <li>Acknowledgment within 48 hours.</li>
            <li>Patch within 7 days for critical issues.</li>
            <li>
              Coordinated disclosure preferred — we credit researchers in the changelog
              unless requested otherwise.
            </li>
          </ul>
          <p className="text-sm text-slate-500">
            PGP key available on request. No bug bounty at this stage, but we are happy
            to provide a public acknowledgment and a written confirmation for your
            portfolio.
          </p>
        </Section>

        {/* Downloads */}
        <Section id="downloads" eyebrow="11 · Downloads" title="Downloads">
          <div className="not-prose grid sm:grid-cols-3 gap-4 mt-2">
            <a
              href="/legal/gramfleet-dpa-template.md"
              download
              className="rounded-2xl border border-slate-200 p-5 hover:border-[#0088CC] hover:bg-[#0088CC]/5 transition-colors group"
            >
              <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">
                Legal
              </div>
              <div className="font-semibold text-slate-900 mb-1 group-hover:text-[#0088CC]">
                DPA template
              </div>
              <div className="text-sm text-slate-600">
                Article 28 GDPR · Markdown · 200 lines
              </div>
            </a>
            <a
              href="/legal/gramfleet-incident-response.md"
              download
              className="rounded-2xl border border-slate-200 p-5 hover:border-[#0088CC] hover:bg-[#0088CC]/5 transition-colors group"
            >
              <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">
                Operations
              </div>
              <div className="font-semibold text-slate-900 mb-1 group-hover:text-[#0088CC]">
                Incident response
              </div>
              <div className="text-sm text-slate-600">
                Article 33–34 · Severity tiers · Templates
              </div>
            </a>
            <a
              href="/legal/gramfleet-security-policy.md"
              download
              className="rounded-2xl border border-slate-200 p-5 hover:border-[#0088CC] hover:bg-[#0088CC]/5 transition-colors group"
            >
              <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">
                Policy
              </div>
              <div className="font-semibold text-slate-900 mb-1 group-hover:text-[#0088CC]">
                Security policy
              </div>
              <div className="text-sm text-slate-600">
                Data flow · Retention · Access · No-training
              </div>
            </a>
          </div>
        </Section>

        {/* CTA */}
        <section className="rounded-3xl border border-[#0088CC]/30 bg-[#0088CC]/5 p-6 sm:p-10 text-center mt-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3 text-slate-900">
            Security questions before you sign?
          </h2>
          <p className="text-base sm:text-lg text-slate-700 mb-6 max-w-xl mx-auto">
            Book a 30-min security review. We&apos;ll walk your team through the data
            flow, answer DPA / SCC questions, and pre-fill the template against your
            controller details.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://cal.com/gramfleet/discovery"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0088CC] text-white font-bold px-6 sm:px-8 py-3 sm:py-4 text-base hover:scale-[1.02] transition-transform"
            >
              Book security review →
            </a>
            <a
              href="mailto:security@gramfleet.ai"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 text-slate-700 font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base hover:border-[#0088CC] hover:text-[#0088CC] transition-colors"
            >
              security@gramfleet.ai
            </a>
          </div>
        </section>
      </article>

      <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-500">
        <Link href="/" className="text-[#0088CC] hover:underline">
          ← Back to GramFleet
        </Link>
        <div className="mt-2 text-xs text-slate-400">
          © 2026 GramFleet · This page is informational and does not constitute legal
          advice.
        </div>
      </footer>

      {/* Suppress unused accent warning if linter complains */}
      <span className="hidden" data-accent={ACCENT} aria-hidden="true" />
    </main>
  );
}
