"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Container,
  Button,
  LinkButton,
  Arrow,
  Grad,
  useContent,
} from "../lib";
import { BlurFade, Magnetic } from "../motion";

const HERO_IMAGES = [
  "/products/agent-1.webp",
  "/products/agent-2.webp",
  "/products/agent-3.webp",
  "/products/agent-4.webp",
  "/products/agent-5.webp",
];

export default function Hero() {
  const c = useContent();
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIdx((i) => (i + 1) % HERO_IMAGES.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="isolate relative overflow-hidden bg-white" id="main">
      {/* MOBILE bg hero image */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[58vw] max-h-[440px] lg:hidden"
      >
        {HERO_IMAGES.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-contain object-top transition-[opacity,filter] duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{
              opacity: i === activeIdx ? 1 : 0,
              filter: `blur(${i === activeIdx ? 0 : 16}px)`,
              maskImage:
                "linear-gradient(to bottom, black 0%, black 62%, rgba(0,0,0,0.7) 82%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 0%, black 62%, rgba(0,0,0,0.7) 82%, transparent 100%)",
            }}
          />
        ))}
        {/* progressive blur overlay */}
        <div
          className="absolute inset-0"
          style={{
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, transparent 52%, rgba(0,0,0,0.6) 68%, black 82%, black 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, transparent 52%, rgba(0,0,0,0.6) 68%, black 82%, black 100%)",
          }}
        />
        {/* white tint overlay — readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.95) 65%, rgba(255,255,255,1) 85%)",
          }}
        />
      </div>

      {/* DESKTOP bg image — natural-size, anchored to right (no upscale → no pixelation) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 right-0 z-0 hidden overflow-hidden lg:block"
      >
        {HERO_IMAGES.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt=""
            fill
            priority={i === 0}
            sizes="(min-width: 1024px) 60vw, 0px"
            className="object-contain object-right transition-opacity duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{ opacity: i === activeIdx ? 1 : 0 }}
          />
        ))}
        {/* progressive blur where text overlaps the LEFT ~20% of the image */}
        <div
          className="absolute inset-0"
          style={{
            backdropFilter: "blur(24px) saturate(0.9)",
            WebkitBackdropFilter: "blur(24px) saturate(0.9)",
            maskImage:
              "linear-gradient(to right, black 0%, black 28%, transparent 42%)",
            WebkitMaskImage:
              "linear-gradient(to right, black 0%, black 28%, transparent 42%)",
          }}
        />
        {/* white tint — text readability on left strip only */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.94) 22%, rgba(255,255,255,0.65) 32%, rgba(255,255,255,0.10) 42%, transparent 50%)",
          }}
        />
      </div>

      <Container className="relative z-10 pt-[clamp(220px,46vw,360px)] pb-[clamp(48px,8vh,96px)] lg:pt-[clamp(56px,9vh,120px)]">
        <div className="grid items-center gap-[clamp(40px,6vw,72px)] lg:grid-cols-[1.15fr_1fr]">
          {/* TEXT COLUMN */}
          <div className="max-w-[640px]">
            <BlurFade delay={0.08}>
              <h1 className="text-balance text-[clamp(40px,7.2vw,84px)] font-extrabold leading-[1.02] tracking-[-0.035em] text-[var(--ink)]">
                {c.hero.h1Lines.slice(0, -1).map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
                <span className="block">
                  <Grad>{c.hero.h1Lines[c.hero.h1Lines.length - 1]}</Grad>
                </span>
              </h1>
            </BlurFade>

            <BlurFade delay={0.16}>
              <p className="mt-6 max-w-[560px] text-pretty text-[17px] leading-[1.55] text-[var(--muted)] md:text-[18px]">
                {c.hero.lead}
              </p>
            </BlurFade>

            <BlurFade delay={0.24}>
              <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Magnetic strength={0.18} className="w-full sm:w-auto">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto"
                    onClick={() =>
                      window.dispatchEvent(
                        new CustomEvent("booking-modal-open", { detail: { product: "planner" } }),
                      )
                    }
                  >
                    {c.hero.primary}
                    <Arrow />
                  </Button>
                </Magnetic>
                <LinkButton href="#products" variant="ghost" size="lg" className="w-full sm:w-auto">
                  {c.hero.secondary}
                </LinkButton>
              </div>
            </BlurFade>

            <BlurFade delay={0.32}>
              <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-[12px] font-medium text-[var(--muted)]">
                <span className="text-[var(--muted)]">{c.hero.trustLabel}</span>
                {c.hero.trustItems.map((item, i) => (
                  <span key={item} className="flex items-center gap-3">
                    {i > 0 && <span className="size-1 rounded-full bg-[var(--rule-2)]" />}
                    <span className="text-[var(--ink-2)]">{item}</span>
                  </span>
                ))}
              </div>
            </BlurFade>
          </div>
        </div>
      </Container>
    </section>
  );
}
