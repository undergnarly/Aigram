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

const MODULE_COLORS = [
  "bg-[#0088CC]/10 text-[#0088CC] ring-[#0088CC]/20",
  "bg-blue-500/10 text-blue-600 ring-blue-500/20",
  "bg-violet-500/10 text-violet-600 ring-violet-500/20",
  "bg-orange-500/10 text-orange-600 ring-orange-500/20",
  "bg-teal-500/10 text-teal-600 ring-teal-500/20",
] as const;

function shortName(s: string) {
  return s.replace(/\s*\(.*\)$/, "").trim();
}

const TIER_STYLE = [
  { // 0: Light
    card: "border-[var(--rule-2)] bg-white",
    accent: "",
    check: "bg-[var(--indigo-soft)]",
    checkStroke: "var(--indigo)",
    price: "text-[var(--ink)]",
  },
  { // 1: Standard — recommended, Telegram blue
    card: "border-[var(--indigo)]/50 bg-white shadow-[0_0_0_1px_rgba(42,171,238,0.15),0_30px_70px_-25px_rgba(42,171,238,0.35)] md:-translate-y-3",
    accent: "bg-[linear-gradient(90deg,transparent,#2AABEE,transparent)]",
    check: "bg-[linear-gradient(135deg,#2AABEE,#0088CC)]",
    checkStroke: "#FFFFFF",
    price: "text-[var(--ink)]",
  },
  { // 2: Premium — slightly richer blue
    card: "border-[#0088CC]/25 bg-[#F4F8FD] shadow-[0_30px_70px_-25px_rgba(0,136,204,0.15)]",
    accent: "bg-[linear-gradient(90deg,transparent,#0088CC,transparent)]",
    check: "bg-[linear-gradient(135deg,#0088CC,#2AABEE)]",
    checkStroke: "#FFFFFF",
    price: "text-[var(--ink)]",
  },
  { // 3: Enterprise — deep blue
    card: "border-[var(--rule-2)] bg-white shadow-[0_30px_80px_-30px_rgba(42,171,238,0.12)]",
    accent: "bg-[linear-gradient(90deg,transparent,#54A9EB,transparent)]",
    check: "bg-[linear-gradient(135deg,#54A9EB,#2AABEE)]",
    checkStroke: "#FFFFFF",
    price: "text-[var(--ink)]",
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
    <Section id="pricing" className="bg-[var(--bg-soft)]">
      <Container>
        <div className="mx-auto max-w-[720px] text-center">
          <BlurFade>
            <Eyebrow>{c.pricing.eyebrow}</Eyebrow>
          </BlurFade>
          <BlurFade delay={0.08}>
            <h2 className="mt-5 text-balance text-[clamp(32px,5.2vw,56px)] font-extrabold leading-[1.05] tracking-[-0.03em] text-[var(--ink)]">
              {c.pricing.h2}
            </h2>
          </BlurFade>
          <BlurFade delay={0.16}>
            <p className="mt-5 text-pretty text-[16px] leading-relaxed text-[var(--muted)] md:text-[17px]">
              {c.pricing.sub}
            </p>
          </BlurFade>
        </div>

        {/* Toggle */}
        <BlurFade delay={0.2}>
          <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-1 rounded-full border border-[var(--rule-2)] bg-white p-1.5">
              {toggleOptions.map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setMode(key)}
                  className={[
                    "rounded-full px-5 py-2 text-[13px] font-semibold transition-all",
                    mode === key
                      ? "bg-[var(--indigo)] text-white shadow-[0_2px_8px_-2px_rgba(42,171,238,0.4)]"
                      : "text-[var(--muted)] hover:text-[var(--ink)]",
                  ].join(" ")}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </BlurFade>

        {/* Module breakdown table */}
        <BlurFade delay={0.25}>
          <div className="mt-8 overflow-hidden rounded-2xl border border-[var(--rule-2)] bg-white">
            <div className="border-b border-[var(--rule)] px-5 py-3.5">
              <p className="text-[13px] font-semibold text-[var(--ink-2)]">{sp.compatTitle}</p>
              <p className="mt-0.5 text-[11px] leading-relaxed text-[var(--muted)]">{sp.compatCaption}</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="border-b border-[var(--rule)]">
                    <th className="w-44 px-5 py-2.5 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--muted)]">
                      Module
                    </th>
                    {sp.plans.map((p) => (
                      <th key={p.name} className="px-3 py-2.5 text-center text-[10px] font-medium uppercase tracking-wider text-[var(--muted)]">
                        {p.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sp.compatRows.map((row, rowIdx) => (
                    <tr key={row.module} className="border-b border-[var(--rule)] last:border-0 hover:bg-[var(--bg-soft)] transition-colors">
                      <td className="px-5 py-2.5 text-[12px] font-medium text-[var(--ink-2)]">
                        {shortName(row.module)}
                      </td>
                      {PLAN_KEYS.map((key) => (
                        <td key={key} className="px-3 py-2.5 text-center">
                          {row[key] === "—" ? (
                            <span className="text-[12px] text-[var(--muted)]">—</span>
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
                  color={isRecommended ? "rgba(42,171,238,0.15)" : "rgba(42,171,238,0.06)"}
                >
                  <article
                    className={[
                      "group relative flex h-full flex-col overflow-hidden rounded-2xl border p-5 transition-all duration-500 sm:rounded-3xl sm:p-6",
                      tier.card,
                      !isRecommended && "hover:border-[rgba(42,171,238,0.3)] hover:shadow-[0_16px_40px_-16px_rgba(42,171,238,0.15)]",
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
                        <h3 className="text-[20px] font-bold tracking-tight text-[var(--ink)]">
                          {plan.name}
                        </h3>
                        {plan.tag && (
                          <span className="shrink-0 rounded-full bg-[linear-gradient(135deg,#2AABEE,#0088CC)] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-white">
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
                        <div className="text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--muted)]">
                          Setup
                        </div>
                        <div className={["text-[28px] font-extrabold leading-tight tracking-[-0.02em] [font-variant-numeric:tabular-nums]", tier.price].join(" ")}>
                          {plan.setupPrice}
                        </div>
                        {mode === "both" && (
                          <>
                            <div className="mt-2 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--muted)]">
                              Monthly
                            </div>
                            <div className={["text-[20px] font-extrabold leading-tight tracking-[-0.02em] [font-variant-numeric:tabular-nums]", tier.price].join(" ")}>
                              {plan.monthlyPrice}
                            </div>
                          </>
                        )}
                      </div>

                      <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--muted)]">
                        Build: {plan.buildTime}
                      </div>

                      {/* Divider */}
                      <div className="my-4 h-px bg-[var(--rule)]" />

                      {/* Includes */}
                      <ul className="space-y-2 text-[13px] text-[var(--ink-2)]">
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
                      <p className="mt-auto pt-3 text-[11px] leading-relaxed text-[var(--muted)]">
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
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--indigo)]/30 bg-[var(--indigo-soft)] px-4 py-2 text-[13px] font-semibold text-[var(--indigo-2)]">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path
                  d="M7 1l1.8 1.5L11 2.4l.5 2.2 2 1.4-1 2 1 2-2 1.4-.5 2.2-2.2-.1L7 13l-1.8-1.5L3 11.6l-.5-2.2-2-1.4 1-2-1-2 2-1.4L3 2.4l2.2.1L7 1z"
                  fill="rgba(42,171,238,0.15)"
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
            <p className="max-w-[60ch] text-[13px] text-[var(--muted)]">{c.pricing.note}</p>
          </div>
        </BlurFade>
      </Container>
    </Section>
  );
}
