"use client";

import { useState, type CSSProperties } from "react";
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

const PLAN_KEYS = ["light", "standard", "premium"] as const;
type PlanKey = (typeof PLAN_KEYS)[number];

function shortName(s: string) {
  return s.replace(/\s*\(.*\)$/, "").trim();
}

/* ---------------------------------------------------------------- *
 * TIER SYSTEM — three tiers, three distinct visual languages.
 *  Lite     · airy, minimal, "free tier" feel
 *  Standard · Telegram-blue showcase, recommended badge
 *  Premium  · midnight gradient, gold accents, animated shimmer
 *
 * Inline `color` styles win the cascade against legacy unlayered
 * `body { color: var(--ink) }` rule. Use inkInline EVERYWHERE on
 * dark/saturated backgrounds.
 * ---------------------------------------------------------------- */

const INK_DARK: CSSProperties = { color: "#1b1b42" };
const INK_DARK_MUTED: CSSProperties = { color: "#545470" };
const INK_DARK_2: CSSProperties = { color: "#2E2E55" };
const INK_WHITE: CSSProperties = { color: "#FFFFFF" };
const INK_WHITE_70: CSSProperties = { color: "rgba(255,255,255,0.72)" };
const INK_WHITE_85: CSSProperties = { color: "rgba(255,255,255,0.88)" };
const INK_GOLD: CSSProperties = { color: "#FFE39A" };
const INK_PREMIUM_DEEP: CSSProperties = { color: "#0E2A4A" };

type TierStyle = {
  card: string;
  inkStyle: CSSProperties;
  inkStyleMuted: CSSProperties;
  inkStyleBody: CSSProperties;
  priceStyle: CSSProperties;
  accentBar: string;
  badge:
    | null
    | { label: string; className: string; style?: CSSProperties };
  check: string;
  checkStroke: string;
  modulePill: string;
  modulePillTextStyle: CSSProperties;
  divider: string;
  shimmer: boolean;
  ctaVariant: "primary" | "outline" | "premium";
};

const TIERS: TierStyle[] = [
  // 0 · Lite — minimal, airy, gray-on-white, soft float
  {
    card: "border-white bg-white shadow-[0_40px_100px_-30px_rgba(27,27,66,0.22),0_15px_40px_-15px_rgba(42,171,238,0.18)]",
    inkStyle: INK_DARK,
    inkStyleMuted: INK_DARK_MUTED,
    inkStyleBody: INK_DARK_2,
    priceStyle: INK_DARK,
    accentBar: "",
    badge: null,
    check: "bg-[var(--bg-soft)] ring-1 ring-[var(--rule-2)]",
    checkStroke: "#545470",
    modulePill: "bg-[var(--bg-soft)] ring-1 ring-[var(--rule-2)]",
    modulePillTextStyle: INK_DARK_2,
    divider: "bg-[var(--rule)]",
    shimmer: false,
    ctaVariant: "outline",
  },
  // 1 · Standard — recommended, Telegram blue glow
  {
    card:
      "border-[var(--indigo)]/70 bg-white shadow-[0_0_0_1px_rgba(42,171,238,0.22),0_60px_140px_-30px_rgba(0,136,204,0.45),0_25px_60px_-15px_rgba(42,171,238,0.35)] md:-translate-y-3",
    inkStyle: INK_DARK,
    inkStyleMuted: INK_DARK_MUTED,
    inkStyleBody: INK_DARK_2,
    priceStyle: INK_DARK,
    accentBar:
      "bg-[linear-gradient(90deg,transparent_0%,#2AABEE_30%,#0088CC_50%,#2AABEE_70%,transparent_100%)]",
    badge: {
      label: "РЕКОМЕНДУЕМ",
      className:
        "bg-[linear-gradient(135deg,#2AABEE,#0088CC)] shadow-[0_4px_14px_-3px_rgba(0,136,204,0.55)] ring-1 ring-white/30",
      style: INK_WHITE,
    },
    check:
      "bg-[linear-gradient(135deg,#2AABEE,#0088CC)] shadow-[0_2px_8px_-2px_rgba(42,171,238,0.5)]",
    checkStroke: "#FFFFFF",
    modulePill:
      "bg-[linear-gradient(135deg,#2AABEE,#0088CC)] ring-1 ring-white/20 shadow-[0_2px_6px_-2px_rgba(0,136,204,0.35)]",
    modulePillTextStyle: INK_WHITE,
    divider: "bg-[var(--rule)]",
    shimmer: false,
    ctaVariant: "primary",
  },
  // 2 · Premium — midnight gradient with shimmer + gold accents
  {
    card:
      "border-white/10 bg-[linear-gradient(135deg,#0E2A4A_0%,#13365E_40%,#1A4574_70%,#0F2D50_100%)] shadow-[0_30px_80px_-25px_rgba(14,42,74,0.55),inset_0_1px_0_rgba(255,255,255,0.14)]",
    inkStyle: INK_WHITE,
    inkStyleMuted: INK_WHITE_70,
    inkStyleBody: INK_WHITE_85,
    priceStyle: INK_WHITE,
    accentBar:
      "bg-[linear-gradient(90deg,transparent_0%,#FFD27A_30%,#F0B756_50%,#FFD27A_70%,transparent_100%)]",
    badge: {
      label: "PREMIUM",
      className:
        "bg-[linear-gradient(135deg,#FFE39A,#F0B756_55%,#D69540)] shadow-[0_4px_14px_-3px_rgba(240,183,86,0.55),inset_0_1px_0_rgba(255,255,255,0.5)] ring-1 ring-[#FFE39A]/40",
      style: INK_PREMIUM_DEEP,
    },
    check:
      "bg-[linear-gradient(135deg,#FFE39A,#F0B756)] shadow-[0_2px_8px_-2px_rgba(240,183,86,0.55)]",
    checkStroke: "#0E2A4A",
    modulePill:
      "bg-white/[0.08] ring-1 ring-white/15 backdrop-blur-sm",
    modulePillTextStyle: INK_WHITE,
    divider: "bg-white/15",
    shimmer: true,
    ctaVariant: "premium",
  },
];

/* ---------------------------------------------------------------- *
 * Compat table pill — picks a style based on the active tier column.
 * ---------------------------------------------------------------- */

function compatCellStyle(planKey: PlanKey, value: string) {
  if (value === "—") return null;
  if (planKey === "light") {
    return {
      className: "bg-[var(--bg-soft)] ring-1 ring-[var(--rule-2)]",
      textStyle: INK_DARK_2,
    };
  }
  if (planKey === "standard") {
    return {
      className:
        "bg-[linear-gradient(135deg,#2AABEE,#0088CC)] ring-1 ring-white/20 shadow-[0_2px_6px_-2px_rgba(0,136,204,0.35)]",
      textStyle: INK_WHITE,
    };
  }
  // premium
  return {
    className:
      "bg-[linear-gradient(135deg,#1B3A5C,#0E2A4A)] ring-1 ring-[#FFE39A]/30 shadow-[0_2px_6px_-2px_rgba(14,42,74,0.4)]",
    textStyle: INK_GOLD,
  };
}

export default function Pricing() {
  const c = useContent();
  const sp = c.subscriptionPlan;
  const [mode, setMode] = useState<PriceMode>("both");
  const RECOMMENDED = 1;
  const PREMIUM = 2;

  const toggleOptions: { key: PriceMode; label: string }[] = [
    { key: "setup", label: sp.toggle.setupOnly },
    { key: "both", label: sp.toggle.setupMonthly },
  ];

  return (
    <Section
      id="pricing"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#FFFFFF_0%,#F4F8FD_28%,#E8F2FB_60%,#F4F8FD_100%)]"
    >
      {/* halo glow behind the H2 title — soft aura on the heading */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[clamp(40px,10vw,140px)] left-1/2 -translate-x-1/2 h-[360px] w-[720px] rounded-full bg-[radial-gradient(ellipse,rgba(42,171,238,0.30),rgba(84,169,235,0.10)_45%,transparent_70%)] blur-3xl"
      />
      {/* ambient blue glow → makes the table & plan cards float in space */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 h-[640px] w-[960px] rounded-full bg-[radial-gradient(ellipse,rgba(42,171,238,0.14),transparent_70%)] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-40 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(84,169,235,0.10),transparent_70%)] blur-3xl"
      />
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

        {/* Compatibility table (now FIRST — context before toggle) */}
        <BlurFade delay={0.2}>
          <div className="relative mt-10 overflow-hidden rounded-3xl border border-white bg-white shadow-[0_50px_120px_-30px_rgba(27,27,66,0.30),0_20px_50px_-15px_rgba(42,171,238,0.25),0_0_0_1px_rgba(255,255,255,0.6)_inset]">
            <div className="border-b border-[var(--rule)] px-6 py-5">
              <p className="text-[14px] font-bold tracking-[-0.01em] text-[var(--ink)]" style={INK_DARK}>
                {sp.compatTitle}
              </p>
              <p className="mt-1 text-[12.5px] leading-relaxed" style={INK_DARK_MUTED}>
                {sp.compatCaption}
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="border-b border-[var(--rule)] bg-[var(--bg-soft)]/40">
                    <th className="w-48 px-6 py-3 text-left text-[10px] font-bold uppercase tracking-[0.08em]" style={INK_DARK_MUTED}>
                      Module
                    </th>
                    {sp.plans.map((p, i) => {
                      const isPremium = i === PREMIUM;
                      const isStandard = i === RECOMMENDED;
                      const headerColor: CSSProperties = isPremium
                        ? { color: "#0E2A4A" }
                        : isStandard
                        ? { color: "#0088CC" }
                        : INK_DARK_2;
                      return (
                        <th
                          key={p.name}
                          style={headerColor}
                          className="px-3 py-3 text-center text-[11px] font-bold uppercase tracking-[0.1em] transition-colors"
                        >
                          <span className="inline-flex items-center gap-1.5">
                            {p.name}
                            {isPremium && (
                              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
                                <path
                                  d="M6 1l1.5 3 3.5.5-2.5 2.5.5 3.5L6 9 3 10.5l.5-3.5L1 4.5 4.5 4 6 1z"
                                  fill="#F0B756"
                                  stroke="#D69540"
                                  strokeWidth="0.5"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </span>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {sp.compatRows.map((row) => (
                    <tr
                      key={row.module}
                      className="border-b border-[var(--rule)] last:border-0 transition-colors hover:bg-[var(--bg-soft)]/60"
                    >
                      <td className="px-6 py-3.5 text-[13px] font-semibold" style={INK_DARK_2}>
                        {shortName(row.module)}
                      </td>
                      {PLAN_KEYS.map((key, planIdx) => {
                        const isPremiumCol = planIdx === PREMIUM;
                        const value = row[key];
                        const pill = compatCellStyle(key, value);
                        return (
                          <td
                            key={key}
                            className={[
                              "px-3 py-3.5 text-center",
                              isPremiumCol && "bg-[#0E2A4A]/[0.025]",
                            ].filter(Boolean).join(" ")}
                          >
                            {value === "—" || !pill ? (
                              <span className="inline-block text-[14px]" style={INK_DARK_MUTED}>—</span>
                            ) : (
                              <span
                                style={pill.textStyle}
                                className={[
                                  "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold tracking-[-0.005em]",
                                  pill.className,
                                ].join(" ")}
                              >
                                {value}
                              </span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </BlurFade>

        {/* Toggle (moved BELOW table — controls the price view in the cards) */}
        <BlurFade delay={0.3}>
          <div className="mt-10 flex justify-center">
            <div className="flex items-center gap-1 rounded-full border border-[var(--rule-2)] bg-white p-1.5 shadow-[0_8px_24px_-12px_rgba(42,171,238,0.25)]">
              {toggleOptions.map(({ key, label }) => {
                const active = mode === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setMode(key)}
                    style={active ? INK_WHITE : INK_DARK_MUTED}
                    className={[
                      "rounded-full px-5 py-2 text-[13px] font-semibold transition-all",
                      active
                        ? "bg-[linear-gradient(135deg,#2AABEE,#0088CC)] shadow-[0_4px_14px_-3px_rgba(42,171,238,0.55)]"
                        : "hover:text-[var(--ink)]",
                    ].join(" ")}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </BlurFade>

        {/* Plan cards */}
        <div className="mt-12 grid items-stretch gap-5 md:mt-14 md:grid-cols-2 xl:grid-cols-3">
          {sp.plans.map((plan, i) => {
            const isRecommended = i === RECOMMENDED;
            const isPremium = i === PREMIUM;
            const tier = TIERS[i];
            const planKey = PLAN_KEYS[i];
            const moduleTags = sp.compatRows
              .map((row) => ({ label: shortName(row.module), value: row[planKey as PlanKey] }))
              .filter((m) => m.value !== "—");

            return (
              <BlurFade key={plan.name} delay={i * 0.06}>
                <Spotlight
                  className="h-full rounded-3xl"
                  color={
                    isPremium
                      ? "rgba(240,183,86,0.20)"
                      : isRecommended
                      ? "rgba(42,171,238,0.18)"
                      : "rgba(42,171,238,0.06)"
                  }
                >
                  <article
                    className={[
                      "group relative flex h-full flex-col overflow-hidden rounded-3xl border p-6 transition-all duration-500 sm:p-7",
                      tier.card,
                      isPremium && "premium-card",
                      !isRecommended && !isPremium &&
                        "hover:border-[rgba(42,171,238,0.3)] hover:shadow-[0_16px_40px_-16px_rgba(42,171,238,0.18)]",
                    ].filter(Boolean).join(" ")}
                  >
                    {/* Premium decorative layers */}
                    {tier.shimmer && (
                      <>
                        <div className="premium-aurora" aria-hidden />
                        <div className="premium-aurora-2" aria-hidden />
                        <div className="premium-shimmer" aria-hidden />
                      </>
                    )}

                    {/* Top accent bar */}
                    {tier.accentBar && (
                      <div
                        aria-hidden
                        className={[
                          "pointer-events-none absolute inset-x-8 top-0 h-[2px]",
                          tier.accentBar,
                          isRecommended && "recommended-bar",
                        ].filter(Boolean).join(" ")}
                      />
                    )}

                    {/* Content */}
                    <div className="relative z-10 flex flex-1 flex-col">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-3">
                        <h3
                          style={tier.inkStyle}
                          className="text-[22px] font-bold tracking-[-0.02em]"
                        >
                          {plan.name}
                        </h3>
                        {tier.badge && (
                          <span
                            style={tier.badge.style}
                            className={[
                              "shrink-0 rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.1em]",
                              tier.badge.className,
                              isPremium && "premium-badge",
                            ].filter(Boolean).join(" ")}
                          >
                            {tier.badge.label}
                          </span>
                        )}
                      </div>

                      {/* Module tags */}
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {moduleTags.map((m) => (
                          <span
                            key={m.label}
                            style={tier.modulePillTextStyle}
                            className={[
                              "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-[-0.005em]",
                              tier.modulePill,
                            ].join(" ")}
                          >
                            {m.label}
                            {m.value !== "Yes" && m.value !== "Да" && (
                              <span className="opacity-75 font-semibold">· {m.value}</span>
                            )}
                          </span>
                        ))}
                      </div>

                      {/* Price */}
                      <div className="mt-6">
                        <div
                          style={tier.inkStyleMuted}
                          className="text-[11px] font-bold uppercase tracking-[0.12em]"
                        >
                          Setup
                        </div>
                        {(() => {
                          const match = plan.setupPrice.match(/^([^(]+?)\s*\((.+)\)\s*$/);
                          const main = match ? match[1].trim() : plan.setupPrice;
                          const offer = match ? match[2].trim() : null;
                          return (
                            <>
                              <div
                                style={tier.priceStyle}
                                className="mt-1 text-[30px] font-extrabold leading-tight tracking-[-0.025em] [font-variant-numeric:tabular-nums]"
                              >
                                {main}
                              </div>
                              {offer && (
                                <div
                                  className={[
                                    "mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10.5px] font-semibold leading-tight tracking-tight",
                                    isPremium
                                      ? "bg-[#FFE39A]/20 ring-1 ring-[#FFE39A]/40"
                                      : isRecommended
                                      ? "bg-[var(--indigo-soft)] ring-1 ring-[var(--indigo)]/30"
                                      : "bg-[var(--indigo-soft)] ring-1 ring-[var(--indigo)]/25",
                                  ].join(" ")}
                                  style={
                                    isPremium
                                      ? { color: "#FFE39A" }
                                      : { color: "#0077B5" }
                                  }
                                >
                                  <span aria-hidden className="text-[10px]">✦</span>
                                  {offer}
                                </div>
                              )}
                            </>
                          );
                        })()}
                        {mode === "both" && (
                          <>
                            <div
                              style={tier.inkStyleMuted}
                              className="mt-3 text-[11px] font-bold uppercase tracking-[0.12em]"
                            >
                              Monthly
                            </div>
                            <div
                              style={tier.priceStyle}
                              className="mt-1 text-[22px] font-extrabold leading-tight tracking-[-0.02em] [font-variant-numeric:tabular-nums]"
                            >
                              {plan.monthlyPrice}
                            </div>
                          </>
                        )}
                      </div>

                      <div
                        style={tier.inkStyleMuted}
                        className="mt-3 text-[11px] font-bold uppercase tracking-[0.12em]"
                      >
                        Build: {plan.buildTime}
                      </div>

                      {/* Divider */}
                      <div className={["my-5 h-px", tier.divider].join(" ")} />

                      {/* Includes */}
                      <ul className="space-y-2.5 text-[13.5px]" style={tier.inkStyleBody}>
                        {plan.includes.map((item, j) => (
                          <li key={j} className="flex items-start gap-2.5">
                            <span
                              className={[
                                "mt-0.5 grid size-4 shrink-0 place-items-center rounded-full",
                                tier.check,
                              ].join(" ")}
                              aria-hidden
                            >
                              <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                                <path
                                  d="M2 5l2 2 4-4.5"
                                  stroke={tier.checkStroke}
                                  strokeWidth="1.8"
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
                      <p
                        style={tier.inkStyleMuted}
                        className="mt-auto pt-5 text-[11.5px] leading-relaxed"
                      >
                        {plan.forWho}
                      </p>
                    </div>

                    {/* CTA */}
                    <div className="relative z-10 mt-6">
                      {tier.ctaVariant === "premium" ? (
                        <Magnetic strength={0.14}>
                          <a
                            href="#book"
                            style={INK_PREMIUM_DEEP}
                            className="group/cta relative inline-flex h-14 w-full select-none items-center justify-center gap-2 overflow-hidden rounded-full bg-[linear-gradient(135deg,#FFE39A,#F0B756_55%,#D69540)] px-7 text-[15px] font-bold tracking-tight shadow-[0_8px_24px_-6px_rgba(240,183,86,0.55),inset_0_1px_0_rgba(255,255,255,0.55)] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#F0B756]"
                          >
                            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,0.5)_50%,transparent_70%)] transition-transform duration-700 group-hover/cta:translate-x-full" />
                            <span className="relative">{plan.cta}</span>
                            <span className="relative">
                              <Arrow />
                            </span>
                          </a>
                        </Magnetic>
                      ) : tier.ctaVariant === "primary" ? (
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
          <div className="mt-12 flex flex-col items-center gap-3 text-center md:flex-row md:justify-center md:gap-5">
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
