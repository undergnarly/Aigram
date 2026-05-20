"use client";

import { useState } from "react";
import {
  Container,
  Eyebrow,
  Section,
  Button,
  Arrow,
  useContent,
} from "../lib";
import { BlurFade, Magnetic, Spotlight } from "../motion";
import { PRODUCT_ORDER } from "../content";

type Status = "idle" | "submitting" | "ok" | "error";

export default function FinalCTA() {
  const c = useContent();
  const [status, setStatus] = useState<Status>("idle");
  const [product, setProduct] = useState<string>("planner");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const data = new FormData(e.currentTarget);
    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      message: String(data.get("message") || "").trim(),
      source: `landing:${product}`,
    };
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("bad-response");
      setStatus("ok");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <Section id="book" className="relative overflow-hidden">
      {/* glow background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[60%] bg-[radial-gradient(ellipse_at_top,rgba(192,255,31,0.12),transparent_70%)]"
      />

      <Container>
        <Spotlight className="rounded-[36px]" color="rgba(192,255,31,0.18)" size={500}>
        <div className="overflow-hidden rounded-[36px] border border-white/[0.08] bg-[#0E0E12]">
          <div className="grid gap-0 lg:grid-cols-[1.1fr_1fr]">
            {/* LEFT — pitch */}
            <div className="relative isolate p-7 md:p-12 lg:p-14">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 100% at 0% 0%, rgba(192,255,31,0.12), transparent 60%)",
                }}
              />
              <BlurFade>
                <Eyebrow>{c.finalCta.eyebrow}</Eyebrow>
              </BlurFade>
              <BlurFade delay={0.08}>
                <h2 className="mt-4 text-balance text-[clamp(26px,4vw,48px)] font-extrabold leading-[1.05] tracking-[-0.03em] text-white md:mt-5 md:text-[clamp(30px,4.6vw,52px)]">
                  {c.finalCta.h2}
                </h2>
              </BlurFade>
              <BlurFade delay={0.16}>
                <p className="mt-3 text-pretty text-[15px] leading-relaxed text-white/60 md:mt-5 md:text-[17px]">
                  {c.finalCta.sub}
                </p>
              </BlurFade>

              {/* Reassurance — hidden on mobile, visible on md+ */}
              <BlurFade delay={0.24}>
                <ul className="mt-6 hidden space-y-3 text-[14px] text-white/80 md:block md:mt-8">
                  {c.finalCta.reassurance.map((r, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span
                        className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,#2AABEE,#FFE100)]"
                        aria-hidden
                      >
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5l2 2 4-4.5" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </BlurFade>
            </div>

            {/* RIGHT — form */}
            <div className="border-t border-white/[0.06] bg-[#0A0A0E] p-5 md:p-10 lg:border-l lg:border-t-0 lg:p-12">
              <BlurFade>
                <h3 className="text-[16px] font-bold tracking-tight text-white md:text-[18px]">
                  {c.finalCta.formTitle}
                </h3>
              </BlurFade>

              {status === "ok" ? (
                <BlurFade>
                  <div className="mt-6 rounded-2xl border border-[var(--indigo)]/30 bg-[var(--indigo-soft)]/50 p-5">
                    <div className="flex items-center gap-3 text-[var(--indigo-2)]">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                        <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M5.5 9l2.5 2.5L12.5 6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-[15px] font-semibold">{c.finalCta.success}</span>
                    </div>
                  </div>
                </BlurFade>
              ) : (
                <form onSubmit={onSubmit} className="mt-4 space-y-3 md:mt-6 md:space-y-4" noValidate>
                  {/* Honeypot */}
                  <div aria-hidden className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
                    <label htmlFor="website">Website</label>
                    <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                  </div>
                  <Field
                    label={c.finalCta.fields.nameLabel}
                    name="name"
                    placeholder={c.finalCta.fields.namePh}
                    required
                  />
                  <Field
                    label={c.finalCta.fields.emailLabel}
                    name="email"
                    type="email"
                    placeholder={c.finalCta.fields.emailPh}
                    required
                  />

                  {/* Context — hidden on mobile */}
                  <div className="hidden md:block">
                    <Field
                      label={c.finalCta.fields.contextLabel}
                      name="message"
                      placeholder={c.finalCta.fields.contextPh}
                      textarea
                    />
                  </div>

                  <Magnetic strength={0.12}>
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                      disabled={status === "submitting"}
                    >
                      {status === "submitting" ? c.finalCta.submitting : c.finalCta.submit}
                      {status !== "submitting" && <Arrow />}
                    </Button>
                  </Magnetic>

                  {status === "error" && (
                    <p
                      role="alert"
                      className="rounded-xl border border-[#FFB454]/30 bg-[#FFB454]/[0.06] p-3 text-[13px] text-[#FFB454]"
                    >
                      {c.finalCta.error}
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
        </Spotlight>
      </Container>
    </Section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  textarea,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  const baseCls =
    "w-full rounded-2xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-[15px] text-white placeholder:text-white/30 transition-colors focus:border-[var(--indigo)]/40 focus:bg-white/[0.04] focus:outline-none";
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-[12px] font-bold uppercase tracking-[0.1em] text-white/55"
      >
        {label}
        {required && <span className="ml-1 text-[var(--indigo-2)]">*</span>}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          rows={3}
          className={[baseCls, "resize-none"].join(" ")}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          autoComplete={type === "email" ? "email" : "name"}
          className={baseCls}
        />
      )}
    </div>
  );
}
