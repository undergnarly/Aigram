"use client";

import Image from "next/image";
import Link from "next/link";
import { Container, useContent } from "../lib";

export default function Footer() {
  const c = useContent();
  return (
    <footer className="relative border-t border-[var(--rule)] bg-[var(--bg-soft)] pb-[calc(72px+env(safe-area-inset-bottom,0px))] pt-16 md:pb-16">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr] lg:gap-16">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5 text-[17px] font-bold tracking-tight text-[var(--ink)]">
              <Image
                src="/logo.webp"
                alt=""
                width={32}
                height={32}
                className="size-8"
              />
              <span>AiGram</span>
            </Link>
            <p className="mt-5 max-w-[36ch] text-[14px] leading-relaxed text-[var(--muted)]">
              {c.footer.tagline}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
            {c.footer.columns.map((col) => (
              <div key={col.title}>
                <h4 className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted-2)]">
                  {col.title}
                </h4>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l, i) => (
                    <li key={i}>
                      <a
                        href={l.href}
                        className="text-[14px] font-medium text-[var(--ink-2)] transition-colors hover:text-[var(--indigo)]"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-[var(--rule)] pt-6 text-[12px] text-[var(--muted)] md:flex-row md:items-center">
          <span>{c.footer.rights}</span>
          <a
            href={`mailto:${c.footer.contact}`}
            className="font-mono text-[var(--muted-2)] hover:text-[var(--indigo)] transition-colors"
          >
            {c.footer.contact}
          </a>
        </div>
      </Container>
    </footer>
  );
}
