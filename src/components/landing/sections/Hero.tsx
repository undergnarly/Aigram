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
  "/products/foundation.webp",
  "/products/ai-lead-intel.webp",
  "/products/ai-sales.webp",
  "/products/knowledge-vault.webp",
  "/products/orchestrator.webp",
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
    <section className="isolate relative overflow-hidden bg-black" id="main">
      {/* MOBILE bg hero image — natural 16:9, no zoom, blur kicks in at text band */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[58vw] max-h-[440px] lg:hidden"
      >
        {/* rotating image stack — crossfade + blur transition */}
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
              filter: `saturate(1.05) blur(${i === activeIdx ? 0 : 16}px)`,
              maskImage:
                "linear-gradient(to bottom, black 0%, black 62%, rgba(0,0,0,0.7) 82%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 0%, black 62%, rgba(0,0,0,0.7) 82%, transparent 100%)",
            }}
          />
        ))}
        {/* progressive blur overlay — kicks in around the text band */}
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
        {/* tint overlay — readability, sits above blur */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,10,12,0) 0%, rgba(10,10,12,0.1) 50%, rgba(10,10,12,0.55) 72%, rgba(10,10,12,1) 96%)",
          }}
        />
      </div>

      {/* DESKTOP bg image — right-aligned, 100px from viewport edge, text-overlap region blurred */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 right-[100px] z-0 hidden overflow-hidden lg:block"
      >
        {HERO_IMAGES.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt=""
            fill
            priority={i === 0}
            sizes="(min-width: 1024px) calc(100vw - 100px), 0px"
            className="object-cover object-right transition-opacity duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{ opacity: i === activeIdx ? 1 : 0 }}
          />
        ))}
        {/* progressive blur — heavy where text overlaps, fades to none past the text */}
        <div
          className="absolute inset-0"
          style={{
            backdropFilter: "blur(20px) saturate(1.05)",
            WebkitBackdropFilter: "blur(20px) saturate(1.05)",
            maskImage:
              "linear-gradient(to right, black 0%, black 42%, transparent 60%)",
            WebkitMaskImage:
              "linear-gradient(to right, black 0%, black 42%, transparent 60%)",
          }}
        />
        {/* tint — readability under text, transparent past the fade */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(10,10,12,0.92) 0%, rgba(10,10,12,0.6) 40%, rgba(10,10,12,0.15) 58%, transparent 72%)",
          }}
        />
      </div>

      <Container className="relative z-10 pt-[clamp(220px,46vw,360px)] pb-[clamp(48px,8vh,96px)] lg:pt-[clamp(56px,9vh,120px)]">
        <div className="grid items-center gap-[clamp(40px,6vw,72px)] lg:grid-cols-[1.15fr_1fr]">
          {/* TEXT COLUMN */}
          <div className="max-w-[640px]">
            <BlurFade delay={0.08}>
              <h1 className="text-balance text-[clamp(40px,7.2vw,84px)] font-extrabold leading-[1.02] tracking-[-0.035em] text-white">
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
              <p className="mt-6 max-w-[560px] text-pretty text-[17px] leading-[1.55] text-white/70 md:text-[18px]">
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
              <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-[12px] font-medium text-white/55">
                <span className="text-white/45">{c.hero.trustLabel}</span>
                {c.hero.trustItems.map((item, i) => (
                  <span key={item} className="flex items-center gap-3">
                    {i > 0 && <span className="size-1 rounded-full bg-white/15" />}
                    <span className="text-white/75">{item}</span>
                  </span>
                ))}
              </div>
            </BlurFade>
          </div>

          {/* Right column intentionally empty on desktop — the bg image fills it; on mobile the grid collapses to one column */}
        </div>
      </Container>
    </section>
  );
}
