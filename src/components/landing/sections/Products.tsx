"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  Container,
  Section,
  Arrow,
  useContent,
} from "../lib";
import { BlurFade } from "../motion";
import { PRODUCT_ORDER, type ProductSlug } from "../content";

const DEFAULT_SLUG: ProductSlug = "researcher";

export default function Products() {
  const c = useContent();
  const [activeSlug, setActiveSlug] = useState<ProductSlug>(DEFAULT_SLUG);
  const tabsRef = useRef<HTMLDivElement>(null);

  function selectProduct(slug: ProductSlug, btn: HTMLButtonElement) {
    setActiveSlug(slug);
    if (tabsRef.current) {
      const container = tabsRef.current;
      const btnRect = btn.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const offset = btnRect.left - containerRect.left - containerRect.width / 2 + btnRect.width / 2;
      container.scrollBy({ left: offset, behavior: "smooth" });
    }
  }

  return (
    <Section id="products" className="dark-stage relative overflow-hidden">
      {/* aurora glows for premium depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[480px] w-[680px] rounded-full bg-[radial-gradient(ellipse,rgba(42,171,238,0.28),transparent_70%)] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -right-32 h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle,rgba(240,183,86,0.10),transparent_70%)] blur-3xl"
      />
      <Container>
        <div className="relative mx-auto max-w-[760px] text-center">
          <BlurFade delay={0.08}>
            <h2 className="mt-5 text-balance text-[clamp(32px,5.5vw,60px)] font-extrabold leading-[1.05] tracking-[-0.03em] text-[var(--ink)]">
              {c.productsSection.h2}
            </h2>
          </BlurFade>
          <BlurFade delay={0.16}>
            <p className="mt-5 text-pretty text-[16px] leading-relaxed text-[var(--muted)] md:text-[17px]">
              {c.productsSection.sub}
            </p>
          </BlurFade>
        </div>

        {/* Product tabs */}
        <div className="relative sticky top-[68px] z-40 mt-8 flex justify-center bg-transparent py-2 md:mt-10 md:static md:z-auto md:py-0">
          <div
            ref={tabsRef}
            data-surface="light"
            className="product-tabs-wrap flex items-center gap-1 overflow-x-auto rounded-full border border-[rgba(0,0,0,0.06)] bg-white/95 p-1.5 backdrop-blur-md shadow-[0_8px_24px_-12px_rgba(0,0,0,0.4)] scroll-smooth md:overflow-visible"
          >
            {PRODUCT_ORDER.map((slug) => {
              const p = c.products[slug];
              const isActive = slug === activeSlug;
              return (
                <button
                  key={slug}
                  type="button"
                  onClick={(e) => selectProduct(slug, e.currentTarget)}
                  style={isActive ? { color: "#FFFFFF" } : undefined}
                  className={[
                    "shrink-0 rounded-full px-4 py-2 text-[13px] font-semibold transition-all",
                    isActive
                      ? "bg-[linear-gradient(135deg,#2AABEE,#0088CC)] !text-white shadow-[0_4px_14px_-3px_rgba(42,171,238,0.55)]"
                      : "text-[var(--muted)] hover:text-[var(--ink)]",
                  ].join(" ")}
                >
                  {p.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active product card */}
        <ProductDetail slug={activeSlug} />
      </Container>
    </Section>
  );
}

function ProductDetail({ slug }: { slug: ProductSlug }) {
  const c = useContent();
  const p = c.products[slug];
  const per = c.productsSection.perCard;

  return (
    <article
      data-surface="light"
      className="relative mx-auto mt-8 flex max-w-[960px] flex-col overflow-hidden rounded-3xl border border-white/15 bg-white shadow-[0_40px_120px_-30px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.05)] md:flex-row"
    >
      {/* Image */}
      <div
        className="relative h-[220px] shrink-0 overflow-hidden md:h-auto md:w-[380px] lg:w-[440px]"
        style={{ backgroundColor: "#E8F4FD" }}
      >
        <Image
          src={p.image}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 440px"
          className="object-cover opacity-90"
          style={{  }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden md:block"
          style={{
            background: "linear-gradient(to right, transparent 60%, rgba(255,255,255,1) 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 md:hidden"
          style={{
            background: "linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 30%, transparent 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-6 py-6 sm:px-8 sm:py-8">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--muted)]">
              {p.num}
            </span>
            <h3 className="mt-1 text-[clamp(22px,2.5vw,30px)] font-bold leading-tight tracking-[-0.02em] text-[var(--ink)]">
              {p.name}
            </h3>
          </div>
          {p.badge && (
            <span
              style={{ color: "#FFFFFF" }}
              className="shrink-0 rounded-full bg-[linear-gradient(135deg,#2AABEE,#0088CC)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.08em] !text-white shadow-[0_4px_12px_-3px_rgba(0,136,204,0.55)]"
            >
              {p.badge}
            </span>
          )}
        </div>

        <p className="mt-1 text-[17px] font-medium leading-tight text-[var(--ink-2)]">
          {p.tagline}
        </p>
        <p className="mt-3 text-[14.5px] leading-relaxed text-[var(--muted)]">
          {p.hook}
        </p>

        <ul className="mt-5 space-y-2 text-[13.5px] leading-relaxed text-[var(--ink-2)]">
          {p.bullets.map((b, i) => (
            <li key={i} className="flex gap-2.5">
              <span className="mt-1.5 inline-flex size-1.5 shrink-0 rounded-full bg-[#2AABEE]" aria-hidden />
              <span className="text-pretty">{b}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-auto pt-6">
          <a
            href="#pricing"
            className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[var(--indigo)] transition-colors hover:text-[var(--indigo-2)]"
          >
            {per.learnMore}
            <Arrow />
          </a>
        </div>
      </div>
    </article>
  );
}
