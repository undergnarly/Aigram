"use client";

import {
  Container,
  Eyebrow,
  Section,
  useContent,
} from "../lib";
import { BlurFade, Spotlight } from "../motion";

const ACCENTS = [
  {
    halo: "rgba(42,171,238,0.16)",
    pill: "bg-[linear-gradient(135deg,#2AABEE,#0088CC)] text-white ring-1 ring-white/20 shadow-[0_2px_6px_-2px_rgba(0,136,204,0.35)]",
    badge: "bg-[var(--indigo-soft)] text-[var(--indigo-2)] ring-1 ring-[var(--indigo)]/25",
  },
  {
    halo: "rgba(240,183,86,0.18)",
    pill: "bg-[linear-gradient(135deg,#FFE39A,#F0B756_55%,#D69540)] text-[#0E2A4A] ring-1 ring-[#FFE39A]/40 shadow-[0_2px_6px_-2px_rgba(240,183,86,0.45)]",
    badge: "bg-[#FFF6E1] text-[#7A5A1A] ring-1 ring-[#F0B756]/30",
  },
  {
    halo: "rgba(120,140,255,0.18)",
    pill: "bg-[linear-gradient(135deg,#1B1B42,#262656)] text-white ring-1 ring-white/20 shadow-[0_2px_6px_-2px_rgba(27,27,66,0.5)]",
    badge: "bg-[#EFEFFA] text-[#3C3C7A] ring-1 ring-[#1B1B42]/25",
  },
];

export default function TopicBundles() {
  const c = useContent();
  const b = c.topicBundles;

  return (
    <Section
      id="bundles"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#F4F8FD_0%,#FFFFFF_50%,#F4F8FD_100%)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 h-[400px] w-[860px] rounded-full bg-[radial-gradient(ellipse,rgba(42,171,238,0.14),transparent_70%)] blur-3xl"
      />

      <Container>
        <div className="mx-auto max-w-[760px] text-center">
          <BlurFade>
            <Eyebrow>{b.eyebrow}</Eyebrow>
          </BlurFade>
          <BlurFade delay={0.08}>
            <h2 className="mt-5 text-balance text-[clamp(28px,4.6vw,48px)] font-extrabold leading-[1.05] tracking-[-0.03em] text-[var(--ink)]">
              {b.h2}
            </h2>
          </BlurFade>
          <BlurFade delay={0.16}>
            <p className="mt-4 text-pretty text-[15px] leading-relaxed text-[var(--muted)] md:text-[17px]">
              {b.sub}
            </p>
          </BlurFade>
        </div>

        <div className="mt-[clamp(40px,5vw,72px)] grid gap-5 md:grid-cols-3">
          {b.items.map((bundle, i) => {
            const accent = ACCENTS[i % ACCENTS.length];
            return (
              <BlurFade key={bundle.title} delay={i * 0.07} className="h-full">
                <Spotlight className="h-full rounded-3xl" color={accent.halo}>
                  <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white bg-white p-6 shadow-[0_30px_80px_-30px_rgba(27,27,66,0.22),0_15px_40px_-15px_rgba(42,171,238,0.18),0_0_0_1px_rgba(255,255,255,0.6)_inset] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_40px_100px_-30px_rgba(27,27,66,0.32),0_20px_50px_-15px_rgba(42,171,238,0.28)] md:p-7">
                    <span
                      className={[
                        "inline-flex w-fit items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em]",
                        accent.badge,
                      ].join(" ")}
                    >
                      {bundle.audience}
                    </span>

                    <h3 className="mt-4 text-[22px] font-bold tracking-[-0.02em] text-[var(--ink)] md:text-[24px]">
                      {bundle.title}
                    </h3>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {bundle.topics.map((topic) => (
                        <span
                          key={topic}
                          className={[
                            "inline-flex items-center rounded-full px-3 py-1 text-[12px] font-bold tracking-[-0.005em]",
                            accent.pill,
                          ].join(" ")}
                        >
                          {topic}
                        </span>
                      ))}
                    </div>

                    <p className="mt-auto pt-6 text-[13px] leading-relaxed text-[var(--muted)]">
                      {bundle.plan}
                    </p>
                  </article>
                </Spotlight>
              </BlurFade>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
