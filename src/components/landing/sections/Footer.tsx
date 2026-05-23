"use client";

import Link from "next/link";
import { Container, useContent } from "../lib";

export default function Footer() {
  const c = useContent();
  return (
    <footer
      className="dark-stage relative border-t border-white/8 pb-[calc(72px+env(safe-area-inset-bottom,0px))] pt-16 md:pb-16"
      style={{ background: "#08182E" }}
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr] lg:gap-16">
          <div>
            <Link href="/" className="group inline-flex items-center gap-2.5 text-[17px] font-bold tracking-tight text-[var(--ink)]">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="#2AABEE"
                aria-hidden="true"
                className="shrink-0 transition-transform duration-300 group-hover:scale-[1.06]"
              >
                <path d="M21.198 2.433a2.242 2.242 0 00-1.022.215l-17 7.571a2.244 2.244 0 00.243 4.199l3.795 1.058 1.427 4.436a.5.5 0 00.851.162l2.294-2.515 4.433 3.267a2.244 2.244 0 003.438-1.347l3.046-14.96a2.24 2.24 0 00-2.505-2.086z" />
              </svg>
              <span>GramFleet</span>
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
