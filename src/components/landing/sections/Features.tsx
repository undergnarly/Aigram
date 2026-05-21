"use client";

import {
  Container,
  Eyebrow,
  Section,
  useContent,
} from "../lib";
import { BlurFade, Spotlight } from "../motion";

const BLUE = "#2AABEE";

function IconVoice() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full" aria-hidden>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0" />
      <path d="M12 18v3" />
    </svg>
  );
}

function IconBolt() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full" aria-hidden>
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
    </svg>
  );
}

function IconUsers() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full" aria-hidden>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconRefresh() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full" aria-hidden>
      <path d="M21 12a9 9 0 0 1-15.5 6.36L3 16" />
      <path d="M3 12a9 9 0 0 1 15.5-6.36L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M3 21v-5h5" />
    </svg>
  );
}

function IconGlobe() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18" />
      <path d="M12 3a14 14 0 0 0 0 18" />
    </svg>
  );
}

const ICONS = [IconVoice, IconBolt, IconUsers, IconRefresh, IconGlobe];

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
            const Icon = ICONS[i] ?? IconBolt;
            return (
              <BlurFade key={f.title} delay={i * 0.06} className="h-full">
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
