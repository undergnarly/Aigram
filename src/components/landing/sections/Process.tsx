"use client";

import { useEffect, useRef, useState } from "react";
import {
  Container,
  Eyebrow,
  Section,
  useContent,
} from "../lib";
import { BlurFade } from "../motion";

function IconDiscovery({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <circle cx="11" cy="11" r="6" />
      <path d="m20 20-3.5-3.5" />
      <path d="M8.5 11h.01M11 11h.01M13.5 11h.01" />
    </svg>
  );
}

function IconBuild({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.5-2.5 2.5-2.5z" />
    </svg>
  );
}

function IconTrain({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M2 9 12 4l10 5-10 5L2 9z" />
      <path d="M6 11v4c0 1.7 2.7 3 6 3s6-1.3 6-3v-4" />
      <path d="M22 9v5" />
    </svg>
  );
}

function IconSupport({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M12 3 4 6v6c0 4.5 3.2 8.4 8 9 4.8-.6 8-4.5 8-9V6l-8-3z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

const STEP_ICONS = [IconDiscovery, IconBuild, IconTrain, IconSupport];

export default function Process() {
  const c = useContent();

  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let rafId = 0;
    const update = () => {
      rafId = 0;
      const cards = cardRefs.current;
      if (!cards.length) return;
      const viewportCenter = window.innerHeight / 2;
      let best = 0;
      let bestDist = Infinity;
      for (let i = 0; i < cards.length; i++) {
        const el = cards[i];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const dist = Math.abs(cardCenter - viewportCenter);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      }
      setActiveIndex(best);
    };

    const schedule = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [c.process.steps.length]);

  return (
    <Section id="process" className="blue-stage--alt relative overflow-hidden">
      {/* bottom-right aurora only (top kept clean so seam to Metrics stays dark) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-32 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(84,169,235,0.18),transparent_70%)] blur-3xl"
      />
      <Container>
        <div className="mx-auto max-w-3xl text-center lg:max-w-[820px]">
          <BlurFade>
            <Eyebrow>{c.process.eyebrow}</Eyebrow>
          </BlurFade>
          <BlurFade delay={0.08}>
            <h2 className="mt-5 text-balance text-[clamp(28px,4.4vw,46px)] font-extrabold leading-[1.05] tracking-[-0.03em] text-[var(--ink)]">
              {c.process.h2}
            </h2>
          </BlurFade>
          <BlurFade delay={0.16}>
            <p className="mt-4 text-pretty text-[15px] leading-relaxed text-[var(--muted)] md:text-[17px]">
              {c.process.sub}
            </p>
          </BlurFade>
        </div>

        <ol role="list" className="relative mt-10 list-none p-0 lg:mt-14">
          {/* Mobile: vertical rail */}
          <div
            aria-hidden
            className="absolute left-[27px] top-2 bottom-2 w-px bg-gradient-to-b from-white/80 via-white/30 to-transparent lg:hidden"
          />
          {/* Desktop: horizontal rail */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-[27px] hidden h-px bg-gradient-to-r from-transparent via-white/30 to-transparent lg:block"
          />
          <div
            aria-hidden
            className={`absolute left-0 top-[27px] hidden h-px bg-gradient-to-r from-white via-white/60 to-transparent lg:block ${c.process.steps.length === 4 ? "w-[24%]" : "w-[33%]"}`}
          />

          <div className={`grid gap-5 lg:gap-6 ${c.process.steps.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
            {c.process.steps.map((s, i) => {
              const Icon = STEP_ICONS[i] ?? IconDiscovery;
              const isActive = i === activeIndex;
              return (
                <BlurFade key={s.step} delay={i * 0.08}>
                  <li aria-current={isActive ? "step" : undefined} className="group relative">
                    <div className="flex items-start gap-5 lg:flex-col lg:items-stretch lg:gap-4">
                      {/* Node */}
                      <div className="relative shrink-0">
                        <div
                          className={[
                            "relative grid size-14 place-items-center rounded-full font-mono text-[12px] font-bold transition-all duration-500 group-hover:scale-105",
                            isActive
                              ? "bg-[linear-gradient(135deg,#54A9EB,#2AABEE,#0088CC)] shadow-[0_10px_32px_-4px_rgba(84,169,235,0.7),inset_0_1px_0_rgba(255,255,255,0.35)] scale-110"
                              : "bg-[linear-gradient(135deg,#2AABEE,#0088CC)] shadow-[0_6px_20px_-6px_rgba(42,171,238,0.5),inset_0_1px_0_rgba(255,255,255,0.25)]",
                          ].join(" ")}
                          style={{ color: "#FFFFFF" }}
                        >
                          {s.step}
                          {isActive && (
                            <span
                              aria-hidden
                              className="absolute inset-0 rounded-full ring-2 ring-[var(--indigo)]/40 animate-pulse"
                            />
                          )}
                        </div>
                        {/* icon chip */}
                        <div
                          className={[
                            "absolute -right-1.5 -top-1.5 grid size-7 place-items-center rounded-full transition-all duration-500",
                            isActive
                              ? "bg-[linear-gradient(135deg,#54A9EB,#2AABEE)] text-white shadow-[0_4px_18px_-3px_rgba(84,169,235,0.6),inset_0_1px_0_rgba(255,255,255,0.35)]"
                              : "bg-[linear-gradient(135deg,#2AABEE,#0088CC)] text-white shadow-[0_4px_14px_-4px_rgba(42,171,238,0.5),inset_0_1px_0_rgba(255,255,255,0.25)]",
                          ].join(" ")}
                        >
                          <Icon className="size-3.5" />
                        </div>
                      </div>

                      {/* Card body */}
                      <div
                        ref={(el) => { cardRefs.current[i] = el; }}
                        className={[
                          "flex-1 rounded-2xl border backdrop-blur-2xl p-4 transition-all duration-500 md:p-5 lg:flex-none",
                          isActive
                            ? "border-white/25 bg-white/[0.10] shadow-[0_30px_80px_-25px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.18)] -translate-y-0.5"
                            : "border-white/12 bg-white/[0.06] shadow-[0_20px_50px_-25px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.10)] hover:bg-white/[0.10] hover:border-white/20 hover:-translate-y-0.5",
                        ].join(" ")}
                      >
                        <h3 className="text-[17px] font-bold tracking-tight text-[var(--ink)] whitespace-nowrap md:text-[18px]">
                          {s.title}
                        </h3>
                        <p className="mt-2 text-pretty text-[14px] leading-relaxed text-[var(--muted)] md:text-[14.5px]">
                          {s.body}
                        </p>
                      </div>
                    </div>
                  </li>
                </BlurFade>
              );
            })}
          </div>
        </ol>
      </Container>
    </Section>
  );
}
