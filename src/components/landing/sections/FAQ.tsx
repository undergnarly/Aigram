"use client";

import { useState } from "react";
import {
  Container,
  Eyebrow,
  Section,
  useContent,
} from "../lib";
import { BlurFade } from "../motion";

export default function FAQ() {
  const c = useContent();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <BlurFade>
              <Eyebrow>{c.faq.eyebrow}</Eyebrow>
            </BlurFade>
            <BlurFade delay={0.08}>
              <h2 className="mt-5 text-balance text-[clamp(30px,4.4vw,48px)] font-extrabold leading-[1.05] tracking-[-0.03em] text-white">
                {c.faq.h2}
              </h2>
            </BlurFade>
            <BlurFade delay={0.16}>
              <p className="mt-5 text-pretty text-[16px] leading-relaxed text-white/65 md:text-[17px]">
                {c.faq.sub}
              </p>
            </BlurFade>
          </div>

          <div className="flex flex-col gap-2">
            {c.faq.items.map((it, i) => {
              const isOpen = open === i;
              return (
                <BlurFade key={i} delay={i * 0.04}>
                  <details
                    open={isOpen}
                    className={[
                      "group rounded-2xl border bg-[#0E0E12] transition-colors",
                      isOpen
                        ? "border-white/[0.18]"
                        : "border-white/[0.08] hover:border-white/[0.14]",
                    ].join(" ")}
                  >
                    <summary
                      onClick={(e) => {
                        e.preventDefault();
                        setOpen(isOpen ? null : i);
                      }}
                      className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 md:p-6 [&::-webkit-details-marker]:hidden"
                    >
                      <h3 className="text-[16px] font-semibold tracking-tight text-white md:text-[18px]">
                        {it.q}
                      </h3>
                      <span
                        className={[
                          "grid size-9 shrink-0 place-items-center rounded-full border transition-all",
                          isOpen
                            ? "border-transparent bg-[linear-gradient(135deg,#2AABEE,#FFE100)] text-[#0A0A0A]"
                            : "border-white/15 text-white",
                        ].join(" ")}
                        aria-hidden
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          className={["transition-transform", isOpen ? "rotate-45" : ""].join(" ")}
                        >
                          <path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                      </span>
                    </summary>
                    <div
                      className={[
                        "grid transition-[grid-template-rows] duration-300 ease-out",
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                      ].join(" ")}
                    >
                      <div className="overflow-hidden">
                        <p className="px-5 pb-6 pr-12 text-[15px] leading-relaxed text-white/65 md:px-6 md:pr-16">
                          {it.a}
                        </p>
                      </div>
                    </div>
                  </details>
                </BlurFade>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
