"use client";

import {
  Container,
  Eyebrow,
  Section,
  useContent,
} from "../lib";
import { BlurFade, Spotlight } from "../motion";

const BLUE = "#2AABEE";

/** Templates — 2×2 grid of squares */
function IconGrid() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full" aria-hidden>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

/** Flexible — person + plus (solo → team) */
function IconFlexible() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full" aria-hidden>
      <circle cx="9" cy="7" r="3.5" />
      <path d="M2 21v-1.5a5.5 5.5 0 0 1 9.78-3.44" />
      <circle cx="18" cy="15" r="3" />
      <path d="M18 12v6M15 15h6" />
    </svg>
  );
}

/** Integrations — plug connector */
function IconPlug() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full" aria-hidden>
      <path d="M14 2v4M10 2v4" />
      <rect x="7" y="6" width="10" height="6" rx="2" />
      <path d="M12 12v3" />
      <path d="M9 15h6" />
      <path d="M12 18v4" />
    </svg>
  );
}

/** Marketplace — store / shop bag */
function IconStore() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full" aria-hidden>
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

/** Pipeline — clock with arrow (24/7 autonomous) */
function IconPipeline() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
      <path d="M18.5 20 21 22" />
      <circle cx="20" cy="19" r="2" />
    </svg>
  );
}

/** Founder OS — eye (see everything across all topics) */
function IconFounderOS() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full" aria-hidden>
      <path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6-10-6-10-6z" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M12 4V2M12 22v-2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41" />
    </svg>
  );
}

const ICONS = [IconGrid, IconFlexible, IconPlug, IconStore, IconPipeline, IconFounderOS];

export default function Features() {
  const c = useContent();
  return (
    <Section id="features" className="blue-stage--alt relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-[-10%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(84,169,235,0.18),transparent_70%)] blur-3xl"
      />
      <Container>
        <div className="mx-auto max-w-[680px] text-center">
          <BlurFade>
            <Eyebrow>{c.features.eyebrow}</Eyebrow>
          </BlurFade>
          <BlurFade delay={0.08}>
            <h2 className="mt-5 text-balance text-[clamp(28px,4.6vw,48px)] font-extrabold leading-[1.05] tracking-[-0.03em] text-[var(--ink)]">
              {c.features.h2}
            </h2>
          </BlurFade>
          <BlurFade delay={0.16}>
            <p className="mt-4 text-pretty text-[15px] leading-relaxed text-[var(--muted)] md:text-[17px]">
              {c.features.sub}
            </p>
          </BlurFade>
        </div>

        <div className="mt-[clamp(40px,5vw,72px)] grid items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {c.features.items.map((f, i) => {
            const Icon = ICONS[i] ?? IconGrid;
            const total = c.features.items.length;
            const isOddLast = total % 2 !== 0 && i === total - 1;
            return (
              <BlurFade key={f.title} delay={i * 0.06} className={`h-full${isOddLast ? " sm:col-span-2 lg:col-span-1" : ""}`}>
                <Spotlight className="h-full rounded-3xl" color="rgba(255,255,255,0.20)">
                  <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/12 bg-white/[0.06] backdrop-blur-2xl p-5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.12)] transition-all duration-500 hover:bg-white/[0.10] hover:border-white/20 hover:-translate-y-1 md:p-6">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(42,171,238,0.14),transparent_70%)] opacity-70 transition-opacity duration-500 group-hover:opacity-100 md:h-28 md:w-28"
                    />
                    <div className="flex items-start justify-between gap-3">
                      <div className="relative mt-1 h-9 w-9 shrink-0 md:h-10 md:w-10">
                        <Icon />
                      </div>
                      <span className="rounded-full border border-white/15 bg-white/[0.08] px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[var(--ink-2)]">
                        {f.tag}
                      </span>
                    </div>
                    <h3 className="mt-4 text-[17px] font-bold tracking-tight text-[var(--ink)] md:text-[18.5px]">
                      {f.title}
                    </h3>
                    <p className="mt-2 text-pretty text-[14px] leading-relaxed text-[var(--muted)] md:text-[14.5px]">
                      {f.body}
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
