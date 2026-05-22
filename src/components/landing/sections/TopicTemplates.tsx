"use client";

import {
  Container,
  Eyebrow,
  Section,
  LinkButton,
  Arrow,
  useContent,
} from "../lib";
import { BlurFade, Spotlight } from "../motion";

export default function TopicTemplates() {
  const c = useContent();
  const t = c.topicTemplates;

  return (
    <Section
      id="topics"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#FFFFFF_0%,#F4F8FD_28%,#E8F2FB_60%,#F4F8FD_100%)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-[clamp(40px,10vw,140px)] left-1/2 -translate-x-1/2 h-[360px] w-[720px] rounded-full bg-[radial-gradient(ellipse,rgba(42,171,238,0.30),rgba(84,169,235,0.10)_45%,transparent_70%)] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-32 h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle,rgba(84,169,235,0.10),transparent_70%)] blur-3xl"
      />

      <Container>
        <div className="mx-auto max-w-[780px] text-center">
          <BlurFade>
            <Eyebrow>{t.eyebrow}</Eyebrow>
          </BlurFade>
          <BlurFade delay={0.08}>
            <h2 className="mt-5 text-balance text-[clamp(32px,5.2vw,56px)] font-extrabold leading-[1.05] tracking-[-0.03em] text-[var(--ink)]">
              {t.h2}
            </h2>
          </BlurFade>
          <BlurFade delay={0.16}>
            <p className="mt-5 text-pretty text-[16px] leading-relaxed text-[var(--muted)] md:text-[17px]">
              {t.sub}
            </p>
          </BlurFade>
        </div>

        <div className="mt-[clamp(40px,5vw,72px)] grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.items.map((item, i) => (
            <BlurFade key={item.slug} delay={i * 0.05} className="h-full">
              <Spotlight className="h-full rounded-3xl" color="rgba(42,171,238,0.12)">
                <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white bg-white p-6 shadow-[0_30px_80px_-30px_rgba(27,27,66,0.22),0_15px_40px_-15px_rgba(42,171,238,0.18),0_0_0_1px_rgba(255,255,255,0.6)_inset] transition-all duration-500 hover:-translate-y-1 hover:border-[rgba(42,171,238,0.3)] hover:shadow-[0_40px_100px_-30px_rgba(27,27,66,0.30),0_20px_50px_-15px_rgba(42,171,238,0.30)] md:p-7">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(42,171,238,0.14),transparent_70%)] opacity-70 transition-opacity duration-500 group-hover:opacity-100"
                  />

                  <div className="flex items-start justify-between gap-3">
                    <div className="grid size-12 place-items-center rounded-2xl bg-[var(--indigo-soft)] text-[28px] ring-1 ring-[var(--indigo)]/15 md:size-14 md:text-[32px]">
                      <span aria-hidden>{item.icon}</span>
                    </div>
                    <span className="rounded-full border border-[var(--rule-2)] bg-[var(--bg-soft)] px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">
                      {item.role}
                    </span>
                  </div>

                  <h3 className="mt-5 text-[20px] font-bold tracking-[-0.02em] text-[var(--ink)] md:text-[22px]">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-pretty text-[14px] leading-relaxed text-[var(--muted)] md:text-[14.5px]">
                    {item.desc}
                  </p>
                </article>
              </Spotlight>
            </BlurFade>
          ))}
        </div>

        <BlurFade delay={0.4}>
          <div className="mt-12 flex flex-col items-center gap-4 text-center md:flex-row md:justify-center md:gap-6">
            <LinkButton href="#pricing" variant="primary" size="lg">
              {t.cta}
              <Arrow />
            </LinkButton>
            <p className="max-w-[60ch] text-[13px] text-[var(--muted)]">{t.caption}</p>
          </div>
        </BlurFade>
      </Container>
    </Section>
  );
}
