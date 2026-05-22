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
                "linear-gradient(to bottom, black 0%, black 75%, rgba(0,0,0,0.5) 92%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 0%, black 75%, rgba(0,0,0,0.5) 92%, transparent 100%)",
            }}
          />
        ))}
        {/* soft blur only at very bottom edge — no white fade */}
        <div
          className="absolute inset-0"
          style={{
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, transparent 72%, rgba(0,0,0,0.4) 88%, black 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, transparent 72%, rgba(0,0,0,0.4) 88%, black 100%)",
          }}
        />
      </div>

      {/* DESKTOP bg image — anchored to right WITHIN the same content rail as text
          (max-w-1280 + gutter), so left/right margins are symmetric. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden lg:block"
      >
        <div className="relative mx-auto h-full max-w-[1280px] px-[var(--gutter)]">
          {HERO_IMAGES.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt=""
              fill
              priority={i === 0}
              sizes="(min-width: 1024px) 56vw, 0px"
              className="object-contain object-right transition-opacity duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{ opacity: i === activeIdx ? 1 : 0 }}
            />
          ))}
          {/* blur ONLY the left ~10% of the image where it sits under the text */}
          <div
            className="absolute inset-0"
            style={{
              backdropFilter: "blur(24px) saturate(0.9)",
              WebkitBackdropFilter: "blur(24px) saturate(0.9)",
              maskImage:
                "linear-gradient(to right, black 0%, black 22%, transparent 36%)",
              WebkitMaskImage:
                "linear-gradient(to right, black 0%, black 22%, transparent 36%)",
            }}
          />
          {/* white tint — readability strip on the left ~10-15% only */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.90) 18%, rgba(255,255,255,0.55) 30%, rgba(255,255,255,0.08) 40%, transparent 48%)",
            }}
          />
        </div>
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
                <LinkButton href="#topics" variant="ghost" size="lg" className="w-full sm:w-auto">
                  {c.hero.secondary}
                </LinkButton>
              </div>
            </BlurFade>

          </div>
        </div>
      </Container>
    </section>
  );
}
