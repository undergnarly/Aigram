"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Container,
  LinkButton,
  Arrow,
  useContent,
  useLang,
} from "../lib";
import { LANGS, LANG_LABEL } from "../content";

export default function Nav() {
  const c = useContent();
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const links = [
    { href: "#products", label: c.nav.products },
    { href: "#pricing", label: c.nav.pricing },
    { href: "#process", label: c.nav.process },
    { href: "#faq", label: c.nav.faq },
  ];

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-[var(--indigo)] focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
      >
        {c.meta.skipToContent}
      </a>

      <header
        className={[
          "sticky top-0 z-[80] w-full transition-colors duration-300",
          scrolled
            ? "border-b border-[rgba(0,0,0,0.08)] bg-white/92 backdrop-blur-xl backdrop-saturate-150 shadow-sm"
            : "border-b border-transparent bg-white/70 backdrop-blur-md",
        ].join(" ")}
      >
        <Container className="flex h-[68px] items-center justify-between gap-3 md:gap-4">
          <Link
            href="/"
            aria-label="GramFleet"
            className="group flex min-w-0 items-center gap-2.5 text-[17px] font-bold tracking-tight text-[var(--ink)]"
          >
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
            <span className="truncate">GramFleet</span>
          </Link>

          {/* desktop nav */}
          <nav
            aria-label="Primary"
            className="hidden items-center gap-7 text-[14px] font-medium md:flex"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative text-[var(--ink-2)] transition-colors hover:text-[var(--ink)]"
              >
                {l.label}
                <span
                  aria-hidden
                  className="absolute -bottom-1.5 left-0 h-0.5 w-0 bg-[var(--indigo)] transition-all duration-300 group-hover:w-full"
                />
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2 md:gap-3">
            <div
              role="tablist"
              aria-label="Language"
              className="hidden items-center gap-0.5 rounded-full border border-[var(--rule-2)] bg-[var(--bg-soft)] p-0.5 md:flex"
            >
              {LANGS.map((l) => {
                const active = l === lang;
                return (
                  <button
                    key={l}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setLang(l)}
                    className={[
                      "h-8 min-w-[40px] rounded-full px-2.5 text-[11px] font-bold tracking-[0.08em] transition-all",
                      active
                        ? "bg-[linear-gradient(135deg,#2AABEE,#0088CC)] text-white shadow-[0_4px_12px_-4px_rgba(42,171,238,0.5)]"
                        : "text-[var(--muted)] hover:text-[var(--ink)]",
                    ].join(" ")}
                  >
                    {LANG_LABEL[l]}
                  </button>
                );
              })}
            </div>

            <a
              href={c.nav.telegramHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full border border-[var(--rule-2)] bg-[var(--bg-soft)] px-4 py-2 text-[13px] font-semibold text-[var(--ink-2)] transition-colors hover:bg-[var(--indigo-soft)] hover:text-[var(--indigo-2)] md:inline-flex"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M21.198 2.433a2.242 2.242 0 00-1.022.215l-17 7.571a2.244 2.244 0 00.243 4.199l3.795 1.058 1.427 4.436a.5.5 0 00.851.162l2.294-2.515 4.433 3.267a2.244 2.244 0 003.438-1.347l3.046-14.96a2.24 2.24 0 00-2.505-2.086z" />
              </svg>
              {c.nav.telegram}
            </a>
            <LinkButton
              href="#book"
              variant="primary"
              size="md"
              className="hidden md:inline-flex"
            >
              {c.nav.cta}
              <Arrow />
            </LinkButton>

            <button
              type="button"
              aria-label={open ? c.meta.closeMenu : c.meta.openMenu}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="grid size-11 shrink-0 place-items-center rounded-full border border-[var(--rule-2)] bg-[var(--bg-soft)] text-[var(--ink)] transition-colors hover:bg-[var(--indigo-soft)] md:hidden"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                {open ? (
                  <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                ) : (
                  <>
                    <path d="M2 5h14M2 13h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </Container>
      </header>

      {/* mobile sheet */}
      <div
        className={[
          "fixed inset-0 z-[70] md:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={[
            "absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          ].join(" ")}
        />
        <div
          className={[
            "absolute left-0 right-0 top-[68px] origin-top border-b border-[var(--rule)] bg-white transition-all duration-300",
            open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0",
          ].join(" ")}
        >
          <Container className="flex flex-col gap-1 py-6">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex h-14 items-center justify-between rounded-2xl px-4 text-lg font-semibold text-[var(--ink)] transition-colors hover:bg-[var(--indigo-soft)]"
              >
                <span>{l.label}</span>
                <Arrow className="opacity-50 text-[var(--indigo)]" />
              </a>
            ))}

            <div className="mt-4 flex items-center justify-between rounded-2xl border border-[var(--rule)] bg-[var(--bg-soft)] px-4 py-3">
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
                {c.meta.language}
              </span>
              <div
                role="tablist"
                aria-label="Language"
                className="flex items-center gap-0.5 rounded-full border border-[var(--rule-2)] bg-white p-0.5"
              >
                {LANGS.map((l) => {
                  const active = l === lang;
                  return (
                    <button
                      key={l}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setLang(l)}
                      className={[
                        "h-8 min-w-[44px] rounded-full px-3 text-[12px] font-bold tracking-[0.08em] transition-all",
                        active
                          ? "bg-[linear-gradient(135deg,#2AABEE,#0088CC)] text-white shadow-[0_4px_12px_-4px_rgba(42,171,238,0.5)]"
                          : "text-[var(--muted)] hover:text-[var(--ink)]",
                      ].join(" ")}
                    >
                      {LANG_LABEL[l]}
                    </button>
                  );
                })}
              </div>
            </div>

            <a
              href={c.nav.telegramHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex h-14 items-center justify-between rounded-2xl border border-[var(--rule)] bg-[var(--bg-soft)] px-4 text-[17px] font-semibold text-[var(--ink-2)] transition-colors hover:bg-[var(--indigo-soft)]"
            >
              <span>{c.nav.telegram}</span>
              <Arrow className="opacity-50 text-[var(--indigo)]" />
            </a>

            <div className="mt-2">
              <LinkButton
                href="#book"
                onClick={() => setOpen(false)}
                variant="primary"
                size="lg"
                className="w-full"
              >
                {c.nav.cta}
                <Arrow />
              </LinkButton>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}
