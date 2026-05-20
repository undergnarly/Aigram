"use client";

import {
  Container,
  Eyebrow,
  Section,
  useContent,
} from "../lib";
import { BlurFade, Spotlight } from "../motion";

const LIME = "#2AABEE";

function IconClock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={LIME} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.2 2" />
    </svg>
  );
}

function IconChart() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={LIME} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
      <path d="M3 20h18" />
      <path d="M6 20V13" />
      <path d="M11 20V9" />
      <path d="M16 20V5" />
      <path d="M21 20V11" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={LIME} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
      <path d="M5 4h3l2 5-2.5 1.5a12 12 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={LIME} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
      <path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

const ICONS = [IconClock, IconChart, IconPhone, IconShield];

export default function Metrics() {
  const c = useContent();
  return (
    <Section className="bg-[radial-gradient(ellipse_at_top,rgba(192,255,31,0.05),transparent_60%)]">
      <Container>
        <div className="mx-auto max-w-[680px] text-center">
          <BlurFade>
            <Eyebrow>{c.metrics.eyebrow}</Eyebrow>
          </BlurFade>
          <BlurFade delay={0.08}>
            <h2 className="mt-5 text-balance text-[clamp(30px,4.8vw,52px)] font-extrabold leading-[1.05] tracking-[-0.03em] text-white">
              {c.metrics.h2}
            </h2>
          </BlurFade>
          <BlurFade delay={0.16}>
            <p className="mt-4 text-pretty text-[16px] leading-relaxed text-white/65 md:text-[17px]">
              {c.metrics.sub}
            </p>
          </BlurFade>
        </div>

        <div className="mt-[clamp(40px,5vw,72px)] grid items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {c.metrics.items.map((m, i) => {
            const Icon = ICONS[i] ?? IconClock;
            return (
              <BlurFade key={i} delay={i * 0.08} className="h-full">
                <Spotlight className="h-full rounded-3xl" color="rgba(192,255,31,0.18)">
                  <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0E0E12] p-5 transition-all duration-500 hover:border-white/[0.18] hover:-translate-y-1 md:min-h-[240px] md:p-6">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--indigo-2)]/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(192,255,31,0.18),transparent_70%)] opacity-60 transition-opacity duration-500 group-hover:opacity-100 md:h-28 md:w-28"
                    />
                    <div className="flex items-start justify-between gap-3">
                      <div className="text-[clamp(44px,6vw,68px)] font-extrabold leading-[1] tracking-[-0.04em] text-white [font-variant-numeric:tabular-nums]">
                        <span className="grad-strong">{m.value}</span>
                      </div>
                      <div className="relative mt-1 h-10 w-10 shrink-0 md:h-12 md:w-12">
                        <Icon />
                      </div>
                    </div>
                    <div className="mt-3 text-[13px] font-semibold uppercase tracking-[0.1em] text-white md:text-[14px]">
                      {m.label}
                    </div>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-white/55 md:text-[14px]">
                      {m.detail}
                    </p>
                  </div>
                </Spotlight>
              </BlurFade>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
