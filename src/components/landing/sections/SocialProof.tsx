"use client";

import { Container, useContent } from "../lib";
import { BRAND_LOGOS } from "./BrandLogos";

export default function SocialProof() {
  const c = useContent();
  const items = [...c.social.items, ...c.social.items];

  return (
    <section className="relative border-y border-[var(--rule)] bg-[var(--bg-soft)] py-10 md:py-12">
      <Container>
        <div className="grid items-center gap-6 md:grid-cols-[200px_1fr] md:gap-10">
          <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
            {c.social.label}
          </div>

          <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="flex w-max animate-[marquee_38s_linear_infinite] items-center gap-8 md:gap-12">
              {items.map((label, i) => {
                const Logo = BRAND_LOGOS[label];
                return (
                  <div
                    key={`${label}-${i}`}
                    className="group inline-flex select-none items-center gap-2.5 whitespace-nowrap text-[var(--muted)] transition-colors duration-300 hover:text-[var(--ink)]"
                  >
                    {Logo ? (
                      <span className="inline-flex h-5 w-5 items-center justify-center text-[var(--muted)] transition-colors duration-300 group-hover:text-[#2AABEE] md:h-6 md:w-6">
                        <Logo className="h-full w-full" />
                      </span>
                    ) : null}
                    <span className="text-[18px] font-bold tracking-tight md:text-[22px]">
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
