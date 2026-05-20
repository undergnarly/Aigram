"use client";

import { useState } from "react";
import {
  Container,
  Eyebrow,
  Section,
  LinkButton,
  Arrow,
  useContent,
} from "../lib";
import { BlurFade, Magnetic, Spotlight } from "../motion";

type PriceMode = "setup" | "both";

const PLAN_KEYS = ["light", "standard", "premium", "enterprise"] as const;
type PlanKey = (typeof PLAN_KEYS)[number];

// Color per module row index (Foundation / Vault / Orchestrator / Sales / Lead Intel)
const MODULE_COLORS = [
  "bg-[#0088CC]/15 text-[#0088CC] ring-[#0088CC]/25",
  "bg-blue-400/15 text-blue-300 ring-blue-400/25",
  "bg-violet-400/15 text-violet-300 ring-violet-400/25",
  "bg-orange-400/15 text-orange-300 ring-orange-400/25",
  "bg-teal-400/15 text-teal-300 ring-teal-400/25",
] as const;

// Strip trailing "(…)" to get a display-safe short name
function shortName(s: string) {
  return s.replace(/\s*\(.*\)$/, "").trim();
}

// Visual tier config — each plan gets distinct treatment
const TIER_STYLE = [
  { // 0: Light — minimal, clean
    card: "border-white/[0.06] bg-[#0E0E12]",
    accent: "",
    check: "bg-white/[0.06]",
    checkStroke: "#fff",
    price: "text-white",
  },
  { // 1: Standard — recommended, lime accent
    card: "border-[var(--indigo)]/55 bg-[#11140A] shadow-[0_0_0_1px_rgba(192,255,31,0.2),0_30px_70px_-25px_rgba(192,255,31,0.55)] md:-translate-y-3",
    accent: "bg-[linear-gradient(90deg,transparent,#2AABEE,transparent)]",
    check: "bg-[linear-gradient(135deg,#2AABEE,#FFE100)]",
    checkStroke: "#FFFFFF",
    price: "text-white",
  },
  { // 2: Premium — dark luxury, warm gold accent
    card: "border-[#B8860B]/30 bg-[#0D0C08] shadow-[0_30px_70px_-25px_rgba(184,134,11,0.2)]",
    accent: "bg-[linear-gradient(90deg,transparent,#D4A843,transparent)]",
    check: "bg-[linear-gradient(135deg,#D4A843,#F5E6A3)]",
    checkStroke: "#FFFFFF",
    price: "text-[#F5E6A3]",
  },
  { // 3: Enterprise — deep, exclusive, gradient border
    card: "border-white/[0.15] bg-[#0A0A0E] shadow-[0_30px_80px_-30px_rgba(100,80,200,0.25)]",
    accent: "bg-[linear-gradient(90deg,transparent,#8B7FD4,transparent)]",
    check: "bg-[linear-gradient(135deg,#8B7FD4,#C4BBF0)]",
    checkStroke: "#FFFFFF",
    price: "text-[#C4BBF0]",
  },
] as const;

export default function Pricing() {
  const c = useContent();
  const sp = c.subscriptionPlan;
  const [mode, setMode] = useState<PriceMode>("both");
  const RECOMMENDED = 1;

  const toggleOptions: { key: PriceMode; label: string }[] = [
    { key: "setup", label: sp.toggle.setupOnly },
    { key: "both", label: sp.toggle.setupMonthly },
  ];

  return (
    <Section id="pricing" className="bg-[#0B0B0F]">
      <Container>
        <div className="mx-auto max-w-[720px] text-center">
          <BlurFade>
            <Eyebrow>{c.pricing.eyebrow}</Eyebrow>
          </BlurFade>
          <BlurFade delay={0.08}>
            <h2 className="mt-5 text-balance text-[clamp(32px,5.2vw,56px)] font-extrabold leading-[1.05] tracking-[-0.03em] text-white">
              {c.pricing.h2}
            </h2>
          </BlurFade>
          <BlurFade delay={0.16}>
            <p className="mt-5 text-pretty text-[16px] leading-relaxed text-white/65 md:text-[17px]">
              {c.pricing.sub}
            </p>
          </BlurFade>
        </div>

        {/* Toggle */}
        <BlurFade delay={0.2}>
          <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.04] p-1.5">
              {toggleOptions.map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setMode(key)}
                  className={[
                    "rounded-full px-5 py-2 text-[13px] font-semibold transition-all",
                    mode === key
                      ? "bg-white text-[#FFFFFF] shadow-[0_2px_8px_-2px_rgba(255,255,255,0.4)]"
                      : "text-white/55 hover:text-white",
                  ].join(" ")}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </BlurFade>

        {/* Module breakdown table — what's in each plan */}
        <BlurFade delay={0.25}>
          <div className="mt-8 overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02]">
            <div className="border-b border-white/[0.06] px-5 py-3.5">
              <p className="text-[13px] font-semibold text-white/80">{sp.compatTitle}</p>
              <p className="mt-0.5 text-[11px] leading-relaxed text-white/40">{sp.compatCaption}</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="border-b border-white/[0.05]">
                    <th className="w-44 px-5 py-2.5 text-left text-[10px] font-medium uppercase tracking-wider text-white/30">
                      Module
                    </th>
                    {sp.plans.map((p) => (
                      <th key={p.name} className="px-3 py-2.5 text-center text-[10px] font-medium uppercase tracking-wider text-white/30">
                        {p.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sp.compatRows.map((row, rowIdx) => (
                    <tr key={row.module} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.015] transition-colors">
                      <td className="px-5 py-2.5 text-[12px] font-medium text-white/65">
                        {shortName(row.module)}
                      </td>
                      {PLAN_KEYS.map((key) => (
                        <td key={key} className="px-3 py-2.5 text-center">
                          {row[key] === "—" ? (
                            <span className="text-[12px] text-white/20">—</span>
                          ) : (
                            <span className={`inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-semibold ring-1 ${MODULE_COLORS[rowIdx]}`}>
                              {row[key]}
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </BlurFade>

        {/* Plan cards */}
        <div className="mt-8 grid items-stretch gap-4 md:mt-10 md:grid-cols-2 xl:grid-cols-4">
          {sp.plans.map((plan, i) => {
            const isRecommended = i === RECOMMENDED;
            const tier = TIER_STYLE[i];
            const planKey = PLAN_KEYS[i];
            const moduleTags = sp.compatRows
              .map((row, rowIdx) => ({ label: shortName(row.module), value: row[planKey as PlanKey], color: MODULE_COLORS[rowIdx] }))
              .filter((m) => m.value !== "—");
            return (
              <BlurFade key={plan.name} delay={i * 0.06}>
                <Spotlight
                  className="h-full rounded-3xl"
                  color={isRecommended ? "rgba(192,255,31,0.28)" : "rgba(255,255,255,0.04)"}
                >
                  <article
                    className={[
                      "group relative flex h-full flex-col overflow-hidden rounded-2xl border p-5 transition-all duration-500 sm:rounded-3xl sm:p-6",
                      tier.card,
                      !isRecommended && "hover:border-white/[0.18]",
                    ].join(" ")}
                  >
                    {/* Top accent line */}
                    {tier.accent && (
                      <div
                        aria-hidden
                        className={["pointer-events-none absolute inset-x-6 top-0 h-px", tier.accent].join(" ")}
                      />
                    )}

                    {/* Content */}
                    <div className="flex flex-1 flex-col">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-[20px] font-bold tracking-tight text-white">
                          {plan.name}
                        </h3>
                        {plan.tag && (
                          <span className="shrink-0 rounded-full bg-[linear-gradient(135deg,#2AABEE,#FFE100)] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#FFFFFF]">
                            {plan.tag}
                          </span>
                        )}
                      </div>

                      {/* Module tags */}
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {moduleTags.map((m) => (
                          <span
                            key={m.label}
                            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ${m.color}`}
                          >
                            {m.label}
                            {m.value !== "Yes" && m.value !== "Да" && (
                              <span className="opacity-60">· {m.value}</span>
                            )}
                          </span>
                        ))}
                      </div>

                      {/* Price */}
                      <div className="mt-4">
                        <div className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/35">
                          Setup
                        </div>
                        <div className={["text-[28px] font-extrabold leading-tight tracking-[-0.02em] [font-variant-numeric:tabular-nums]", tier.price].join(" ")}>
                          {plan.setupPrice}
                        </div>
                        {mode === "both" && (
                          <>
                            <div className="mt-2 text-[11px] font-bold uppercase tracking-[0.1em] text-white/35">
                              Monthly
                            </div>
                            <div className={["text-[20px] font-extrabold leading-tight tracking-[-0.02em] [font-variant-numeric:tabular-nums]", tier.price].join(" ")}>
                              {plan.monthlyPrice}
                            </div>
                          </>
                        )}
                      </div>

                      <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/30">
                        Build: {plan.buildTime}
                      </div>

                      {/* Divider */}
                      <div className="my-4 h-px bg-white/[0.06]" />

                      {/* Includes */}
                      <ul className="space-y-2 text-[13px] text-white/70">
                        {plan.includes.map((item, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <span
                              className={["mt-0.5 grid size-4 shrink-0 place-items-center rounded", tier.check].join(" ")}
                              aria-hidden
                            >
                              <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                                <path
                                  d="M2 5l2 2 4-4.5"
                                  stroke={tier.checkStroke}
                                  strokeWidth="1.6"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                            <span className="leading-snug">{item}</span>
                          </li>
                        ))}
                      </ul>

                      {/* For who */}
                      <p className="mt-auto pt-3 text-[11px] leading-relaxed text-white/30">
                        {plan.forWho}
                      </p>
                    </div>

                    {/* CTA */}
                    <div className="mt-5">
                      {isRecommended ? (
                        <Magnetic strength={0.14}>
                          <LinkButton href="#book" variant="primary" size="lg" className="w-full">
                            {plan.cta}
                            <Arrow />
                          </LinkButton>
                        </Magnetic>
                      ) : (
                        <LinkButton href="#book" variant="outline" size="lg" className="w-full">
                          {plan.cta}
                          <Arrow />
                        </LinkButton>
                      )}
                    </div>
                  </article>
                </Spotlight>
              </BlurFade>
            );
          })}
        </div>

        {/* Money back badge + note */}
        <BlurFade delay={0.4}>
          <div className="mt-10 flex flex-col items-center gap-3 text-center md:flex-row md:justify-center md:gap-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--indigo)]/30 bg-[var(--indigo-soft)]/40 px-4 py-2 text-[13px] font-semibold text-white">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path
                  d="M7 1l1.8 1.5L11 2.4l.5 2.2 2 1.4-1 2 1 2-2 1.4-.5 2.2-2.2-.1L7 13l-1.8-1.5L3 11.6l-.5-2.2-2-1.4 1-2-1-2 2-1.4L3 2.4l2.2.1L7 1z"
                  fill="rgba(192,255,31,0.18)"
                  stroke="var(--indigo)"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 7l1.5 1.5L9 5.5"
                  stroke="var(--indigo)"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {c.pricing.moneyBack}
            </span>
            <p className="max-w-[60ch] text-[13px] text-white/45">{c.pricing.note}</p>
          </div>
        </BlurFade>
      </Container>
    </Section>
  );
}
