"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type {
  CSSProperties,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
  ReactNode,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { CONTENT, type Lang, type ProductSlug, LANGS } from "./content";

/* ============================================================
   LANGUAGE CONTEXT — persisted to localStorage
   ============================================================ */

const LangContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
}>({ lang: "en", setLang: () => {} });

const STORAGE_KEY = "aigram.lang";

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // Hydrate from localStorage + browser language on mount.
  // SSR-safe pattern: server renders "en", client reconciles once on mount.
  // useSyncExternalStore would be the textbook fix but is overkill for a
  // one-shot read with no subscriptions, so we disable the lint locally.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved && (LANGS as readonly string[]).includes(saved)) {
        setLangState(saved as Lang);
        return;
      }
      const browser = (navigator.language || "").slice(0, 2).toLowerCase();
      if (browser === "ru") setLangState("ru");
    } catch {
      /* no-op */
    }
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Reflect lang on <html> for screen readers & CSS hooks.
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("lang", lang);
    }
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* no-op */
    }
  }, []);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

export function useContent() {
  const { lang } = useContext(LangContext);
  return CONTENT[lang];
}

/* ============================================================
   USE REVEAL — single-shot intersection observer for fade-in
   ============================================================ */

export function useReveal<T extends HTMLElement = HTMLDivElement>(opts?: {
  threshold?: number;
  rootMargin?: string;
}) {
  const ref = useRef<T | null>(null);
  // Start visible so content is never blank during SSR/initial paint
  // or if IntersectionObserver fails. Animation still plays on entry
  // for elements that mount below the fold via a delayed-start effect.
  const [visible, setVisible] = useState(true);

  /* eslint-disable react-hooks/set-state-in-effect */
  // Intentional: we need to measure DOM geometry (getBoundingClientRect)
  // and check matchMedia, both of which only exist after mount. Initial
  // state is `visible=true` to avoid blank SSR; the effect refines that
  // for below-the-fold elements once we have layout info.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      setVisible(true);
      return;
    }
    // If element starts below the fold, hide briefly and animate in on scroll.
    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (inView) {
      setVisible(true);
      return;
    }
    setVisible(false);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
            break;
          }
        }
      },
      {
        threshold: opts?.threshold ?? 0.05,
        rootMargin: opts?.rootMargin ?? "0px 0px 0px 0px",
      },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [opts?.threshold, opts?.rootMargin]);
  /* eslint-enable react-hooks/set-state-in-effect */

  return { ref, visible };
}

/* ============================================================
   CONTAINER — max-width wrap, gutter-aware
   ============================================================ */

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "mx-auto w-full max-w-[1280px] px-[var(--gutter)]",
        className ?? "",
      ].join(" ")}
    >
      {children}
    </div>
  );
}

/* ============================================================
   REVEAL — wraps children with a fade-up on first scroll-in
   ============================================================ */

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  // CSS-only entrance: SSR-safe, no IntersectionObserver flicker, no FOUC.
  // Always visible after first paint; animation plays once on mount.
  const style: CSSProperties = {
    animation: `fade-up 600ms var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1)) ${delay}ms both`,
  };
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}

/* ============================================================
   EYEBROW — small uppercase label
   ============================================================ */

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={[
        "inline-flex items-center gap-2 rounded-full border border-[var(--rule-2)] bg-[var(--indigo-soft)] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--indigo-2)]",
        className ?? "",
      ].join(" ")}
    >
      <span className="size-1.5 rounded-full bg-[var(--indigo)] shadow-[0_0_10px_rgba(42, 171, 238,0.7)]" />
      {children}
    </span>
  );
}

/* ============================================================
   GRAD — strong gradient text (lime → yellow)
   ============================================================ */

export function Grad({ children }: { children: ReactNode }) {
  return <span className="grad-strong">{children}</span>;
}

/* ============================================================
   ARROW — tiny inline arrow for CTAs
   ============================================================ */

export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      className={["inline-block transition-transform group-hover:translate-x-0.5", className ?? ""].join(" ")}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 7h10M8 3l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ============================================================
   BUTTON — primary (gradient) / ghost / outline
   ============================================================ */

type ButtonProps = {
  variant?: "primary" | "ghost" | "outline";
  size?: "md" | "lg";
  children: ReactNode;
  className?: string;
};

const BUTTON_BASE =
  "group relative inline-flex select-none items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[var(--indigo-2)] disabled:opacity-60 disabled:pointer-events-none";

const BUTTON_SIZE: Record<NonNullable<ButtonProps["size"]>, string> = {
  md: "h-11 px-5 text-[14px]",
  lg: "h-14 px-7 text-[16px]",
};

const BUTTON_VARIANT: Record<NonNullable<ButtonProps["variant"]>, string> = {
  // !text-[#FFFFFF] forces black over the legacy `a { color: inherit }` rule
  // primary CTAs get a pulsing glow (cta-pulse) + sweep highlight on hover
  primary:
    "!text-[#FFFFFF] bg-[linear-gradient(135deg,#2AABEE_0%,#0088CC_50%,#0088CC_100%)] animate-[cta-pulse_3.6s_ease-in-out_infinite] hover:-translate-y-0.5 hover:animate-none hover:shadow-[0_18px_44px_-10px_rgba(42, 171, 238,0.85),inset_0_1px_0_rgba(255,255,255,0.4)] active:translate-y-0 active:scale-[0.98] before:absolute before:inset-0 before:rounded-full before:bg-[linear-gradient(110deg,transparent_35%,rgba(255,255,255,0.55)_50%,transparent_65%)] before:bg-[length:200%_100%] before:bg-[position:200%_50%] hover:before:bg-[position:-100%_50%] before:transition-[background-position] before:duration-700 before:ease-out before:pointer-events-none overflow-hidden",
  ghost:
    "text-[var(--ink-2)] bg-white border border-[var(--rule-2)] hover:bg-[var(--indigo-soft)] hover:border-[rgba(42,171,238,0.3)] hover:text-[var(--indigo-2)] hover:-translate-y-0.5 active:translate-y-0",
  outline:
    "text-[var(--ink-2)] border border-[var(--rule-2)] hover:border-[rgba(42,171,238,0.3)] hover:bg-[var(--indigo-soft)] hover:text-[var(--indigo-2)] hover:-translate-y-0.5 active:translate-y-0",
};

export function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  ...rest
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className={[BUTTON_BASE, BUTTON_SIZE[size], BUTTON_VARIANT[variant], className ?? ""].join(" ")}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  variant = "primary",
  size = "md",
  children,
  className,
  ...rest
}: ButtonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      {...rest}
      style={variant === "primary" ? { color: "#FFFFFF" } : undefined}
      className={[BUTTON_BASE, BUTTON_SIZE[size], BUTTON_VARIANT[variant], className ?? ""].join(" ")}
    >
      {children}
    </a>
  );
}

/* ============================================================
   SECTION — semantic <section> with consistent vertical rhythm
   ============================================================ */

export function Section({
  id,
  children,
  className,
  bleed,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  bleed?: boolean;
}) {
  return (
    <section
      id={id}
      className={[
        "relative",
        bleed
          ? "py-[clamp(36px,6vh,110px)]"
          : "py-[clamp(40px,7vh,120px)]",
        className ?? "",
      ].join(" ")}
    >
      {children}
    </section>
  );
}

/* ============================================================
   COUNT-UP — animated number reveal for metrics
   ============================================================ */

export function CountUp({
  value,
  suffix = "",
  prefix = "",
  duration = 1200,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [n, setN] = useState(0);
  // Reduced-motion users skip the count-up animation and see the final
  // value directly. matchMedia is browser-only so the check must happen
  // in an effect; setN inside is the sync path for that branch.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setN(value);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (e?.isIntersecting) {
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setN(Math.round(eased * value));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, duration]);
  /* eslint-enable react-hooks/set-state-in-effect */
  return (
    <span ref={ref}>
      {prefix}
      {n}
      {suffix}
    </span>
  );
}

/* ============================================================
   BOOKING MODAL — compact bottom-sheet / centered overlay.
   Triggered via "booking-modal-open" CustomEvent from any CTA.
   Tier-aware: when a tier payload is provided, renders the tier name,
   regular (strikethrough) and discounted price, and a 'what is included'
   list. Otherwise shows the product summary.
   ============================================================ */

type ModalStatus = "idle" | "submitting" | "ok" | "error";

type TierDetail = {
  name: string;
  price: string;
  delivery: string;
  features: string[];
};

const TIME_SLOTS: Record<string, string[]> = {
  en: ["Morning (9–12)", "Afternoon (12–17)", "Evening (17–20)"],
  ru: ["Утром (9–12)", "Днём (12–17)", "Вечером (17–20)"],
};

const DISCOUNT_RATE = 0.1;

function applyDiscount(price: string): { regular: string; discounted: string; saved: string } | null {
  // Parses "$1,690" / "$590" / "$14,900" → numeric, applies -10%, reformats with same currency prefix
  const match = price.match(/^([^\d]*?)([\d,]+)(.*)$/);
  if (!match) return null;
  const [, prefix, digits, suffix] = match;
  const n = Number(digits.replace(/,/g, ""));
  if (!Number.isFinite(n) || n <= 0) return null;
  const fmt = (v: number) =>
    `${prefix}${Math.round(v).toLocaleString("en-US")}${suffix}`;
  return {
    regular: price,
    discounted: fmt(n * (1 - DISCOUNT_RATE)),
    saved: fmt(n * DISCOUNT_RATE),
  };
}

export function BookingModal() {
  const c = useContent();
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState<ProductSlug>("planner");
  const [tier, setTier] = useState<TierDetail | null>(null);
  const [status, setStatus] = useState<ModalStatus>("idle");
  const [timeSlot, setTimeSlot] = useState<string>("");
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ product: ProductSlug; tier?: TierDetail }>).detail;
      setProduct(detail.product);
      setTier(detail.tier ?? null);
      setStatus("idle");
      setTimeSlot("");
      setOpen(true);
    };
    window.addEventListener("booking-modal-open", handler);
    return () => window.removeEventListener("booking-modal-open", handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const data = new FormData(e.currentTarget);
    const raw = String(data.get("contact") || "").trim();
    const isEmail = raw.includes("@");
    const tierSuffix = tier ? `:${tier.name}` : "";
    const payload = {
      name: String(data.get("name") || "").trim(),
      email: isEmail ? raw : "",
      phone: isEmail ? "" : raw,
      preferredAt: timeSlot,
      source: `landing-modal:${product}${tierSuffix}`,
      lang,
      website: String(data.get("website") || ""),
    };
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("bad-response");
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  }

  const fieldBase =
    "w-full rounded-2xl border border-[var(--rule)] bg-white px-4 py-3.5 text-[16px] text-[var(--ink)] placeholder:text-[var(--muted)] transition-colors focus:border-[#2AABEE]/45 focus:bg-white focus:outline-none";

  const productData = c.products[product];
  const slots = TIME_SLOTS[lang] ?? TIME_SLOTS.en;
  const isRu = lang === "ru";
  const priceMath = tier ? applyDiscount(tier.price) : null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="booking-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center bg-black/75 backdrop-blur-xl"
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-modal-title"
        >
          <motion.div
            key="booking-card"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 28, stiffness: 320, mass: 0.9 }}
            className="relative w-full sm:w-[calc(100%-32px)] max-w-[480px] max-h-[94dvh] overflow-y-auto rounded-t-[28px] sm:rounded-3xl border border-[var(--rule)] bg-white shadow-[0_40px_80px_-20px_rgba(42,171,238,0.25)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-[28px] sm:rounded-t-3xl"
              style={{ background: "radial-gradient(ellipse 90% 100% at 50% 0%, rgba(42, 171, 238,0.13), transparent 65%)" }}
            />

            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 z-20 grid size-9 place-items-center rounded-full bg-[var(--bg-soft)] text-[var(--muted)] transition-all hover:rotate-90 hover:bg-[var(--indigo-soft)] hover:text-[var(--ink)]"
              aria-label="Close"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>

            {/* HEADER — tier-aware */}
            <div className="px-6 pt-7 pb-3 sm:px-7 sm:pt-8">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--muted-2)]">
                {tier ? c.finalCta.modal.tierEyebrow : c.finalCta.modal.eyebrow}
              </span>

              {tier ? (
                <>
                  <h3 id="booking-modal-title" className="mt-1.5 text-[22px] font-extrabold leading-tight tracking-tight text-[var(--ink)]">
                    <span className="bg-[linear-gradient(135deg,#2AABEE,#0088CC)] bg-clip-text text-transparent">{productData.name}</span>
                    <span className="ml-1.5 text-[var(--muted)]">·</span>
                    <span className="ml-1.5 text-[var(--ink)]">{tier.name}</span>
                  </h3>

                  {priceMath ? (
                    <div className="mt-3 flex items-end gap-3">
                      <div>
                        <div className="text-[9.5px] font-bold uppercase tracking-[0.14em] text-[var(--muted-2)]">
                          {c.finalCta.modal.regularPrice}
                        </div>
                        <div className="font-mono text-[15px] font-semibold text-[var(--muted-2)] line-through [font-variant-numeric:tabular-nums]">
                          {priceMath.regular}
                        </div>
                      </div>
                      <div>
                        <div className="text-[9.5px] font-bold uppercase tracking-[0.14em] text-[#2AABEE]">
                          {c.finalCta.modal.yourPrice}<span className="ml-1 text-[var(--muted-2)]">· −10%</span>
                        </div>
                        <div className="font-mono text-[26px] font-extrabold leading-none tracking-tight text-[var(--ink)] [font-variant-numeric:tabular-nums]">
                          {priceMath.discounted}
                        </div>
                      </div>
                      <div className="ml-auto text-right text-[10.5px] text-[var(--muted)]">
                        {tier.delivery}
                      </div>
                    </div>
                  ) : (
                    <div className="mt-3 flex items-baseline gap-2 font-mono text-[24px] font-extrabold text-[var(--ink)] [font-variant-numeric:tabular-nums]">
                      {tier.price}
                      <span className="text-[12px] font-semibold text-[var(--muted)]">· {tier.delivery}</span>
                    </div>
                  )}

                  {tier.features.length > 0 && (
                    <ul className="mt-3.5 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                      {tier.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-[12px] leading-snug text-[var(--ink-2)]">
                          <span className="mt-0.5 grid size-3.5 shrink-0 place-items-center rounded bg-[linear-gradient(135deg,#2AABEE,#0088CC)]" aria-hidden>
                            <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                              <path d="M2 5l2 2 4-4.5" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                          <span className="text-pretty">{f}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <>
                  <h3 id="booking-modal-title" className="mt-1.5 flex items-baseline gap-2 text-[22px] font-extrabold leading-tight tracking-tight text-[var(--ink)]">
                    <span className="bg-[linear-gradient(135deg,#2AABEE,#0088CC)] bg-clip-text text-transparent">{productData.name}</span>
                    <span className="text-[13px] font-semibold text-[var(--muted)]">·</span>
                    <span className="text-[14px] font-semibold text-[var(--muted)]">{productData.fromPrice}+</span>
                  </h3>
                  <p className="mt-1 text-[13.5px] leading-snug text-[var(--muted)]">
                    {c.finalCta.modal.sub}
                  </p>
                </>
              )}
            </div>

            {/* BODY */}
            <div className="px-6 pb-6 sm:px-7" style={{ paddingBottom: "max(24px, env(safe-area-inset-bottom))" }}>
              {status === "ok" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", damping: 18, stiffness: 280 }}
                  className="rounded-2xl border border-[#2AABEE]/30 bg-[linear-gradient(135deg,rgba(42, 171, 238,0.12),rgba(255,225,0,0.04))] p-6 text-center"
                >
                  <div className="mx-auto grid size-12 place-items-center rounded-full bg-[linear-gradient(135deg,#2AABEE,#0088CC)]">
                    <svg width="22" height="22" viewBox="0 0 18 18" fill="none" aria-hidden>
                      <path d="M4 9.5l3 3 7-7.5" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h4 className="mt-3 text-[20px] font-extrabold tracking-tight text-[var(--ink)]">{c.finalCta.success}</h4>
                  <p className="mt-1 text-[13.5px] text-[var(--muted)]">{c.finalCta.successSub}</p>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="mt-4 inline-flex h-9 items-center justify-center rounded-full border border-[var(--rule-2)] px-5 text-[13px] font-semibold text-[var(--ink-2)] transition-colors hover:border-[rgba(42,171,238,0.3)] hover:text-[var(--ink)]"
                  >
                    {c.finalCta.modal.backToProduct}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={onSubmit} ref={formRef} className="space-y-3" noValidate>
                  {/* Honeypot */}
                  <div aria-hidden className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
                    <label htmlFor="m-website">Website</label>
                    <input id="m-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                  </div>

                  {/* Name */}
                  <div>
                    <label htmlFor="m-name" className="mb-1.5 block text-[10.5px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
                      {c.finalCta.fields.nameLabel} <span className="text-[#2AABEE]">*</span>
                    </label>
                    <input id="m-name" name="name" required placeholder={c.finalCta.fields.namePh} autoComplete="name" className={fieldBase} />
                  </div>

                  {/* Phone or email — auto-detected on submit */}
                  <div>
                    <label htmlFor="m-contact" className="mb-1.5 block text-[10.5px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
                      {isRu ? "Телефон или почта" : "Phone or email"} <span className="text-[#2AABEE]">*</span>
                    </label>
                    <input
                      id="m-contact"
                      name="contact"
                      required
                      placeholder={isRu ? "+7 999 … или name@mail.ru" : "+1 555 … or name@example.com"}
                      autoComplete="email"
                      inputMode="email"
                      className={fieldBase}
                    />
                  </div>

                  {/* Time of day chips */}
                  <div>
                    <p className="mb-1.5 text-[10.5px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
                      {isRu ? "Удобное время" : "Best time to call"}
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {slots.map((slot) => (
                        <button
                          type="button"
                          key={slot}
                          onClick={() => setTimeSlot(slot)}
                          className={[
                            "rounded-2xl border py-2.5 text-[12px] font-semibold transition-all duration-200",
                            timeSlot === slot
                              ? "border-transparent bg-[linear-gradient(135deg,#2AABEE,#0088CC)] text-[#FFFFFF] shadow-[0_4px_12px_-4px_rgba(42, 171, 238,0.4)]"
                              : "border-[var(--rule-2)] text-[var(--muted)] hover:border-[rgba(42,171,238,0.3)] hover:text-[var(--ink)]",
                          ].join(" ")}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button type="submit" variant="primary" size="lg" className="!w-full" disabled={status === "submitting"}>
                    {status === "submitting" ? c.finalCta.submitting : c.finalCta.submit}
                    {status !== "submitting" && <Arrow />}
                  </Button>

                  <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-[var(--muted)]">
                    {c.finalCta.reassurance.slice(0, 2).map((r) => (
                      <li key={r} className="inline-flex items-center gap-1.5">
                        <span className="size-1 rounded-full bg-[#2AABEE]/60" aria-hidden />
                        {r}
                      </li>
                    ))}
                  </ul>

                  {status === "error" && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      role="alert"
                      className="rounded-xl border border-[#FFB454]/30 bg-[#FFB454]/[0.06] p-3 text-[13px] text-[#FFB454]"
                    >
                      {c.finalCta.error}
                    </motion.p>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
