"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type HTMLMotionProps,
} from "motion/react";
import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";

/* ============================================================
   BlurFade — Magic UI-style scroll-in with blur + fade-up
   Drop-in replacement for <Reveal>, but using motion.dev.
   ============================================================ */

export function BlurFade({
  children,
  delay = 0,
  yOffset = 16,
  blur = 8,
  duration = 0.6,
  inViewMargin = "-80px",
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  yOffset?: number;
  blur?: number;
  duration?: number;
  inViewMargin?: string;
  className?: string;
  as?: "div" | "section" | "li" | "span";
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as] as typeof motion.div;
  if (reduce) {
    return <Comp className={className}>{children}</Comp>;
  }
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: yOffset, filter: `blur(${blur}px)` }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: inViewMargin }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </Comp>
  );
}

/* ============================================================
   Magnetic — Aceternity-style cursor-follow tilt for CTAs
   Wraps a single element. Motion-reduce safe.
   ============================================================ */

export function Magnetic({
  children,
  strength = 0.25,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });
  const reduce = useReducedMotion();

  const onMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (reduce) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = e.clientX - (rect.left + rect.width / 2);
      const py = e.clientY - (rect.top + rect.height / 2);
      x.set(px * strength);
      y.set(py * strength);
    },
    [reduce, strength, x, y],
  );

  const reset = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ============================================================
   Spotlight — Magic UI-style cursor-follow radial glow on cards
   Renders a positioned div with conic gradient that tracks pointer.
   ============================================================ */

type SpotlightProps = {
  children: ReactNode;
  color?: string;
  size?: number;
  className?: string;
  borderClassName?: string;
};

export const Spotlight = forwardRef<HTMLDivElement, SpotlightProps>(
  function Spotlight(
    {
      children,
      color = "rgba(192,255,31,0.18)",
      size = 360,
      className,
      borderClassName,
    },
    ref,
  ) {
    const mouseX = useMotionValue(-9999);
    const mouseY = useMotionValue(-9999);

    const onMove = useCallback(
      (e: MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      },
      [mouseX, mouseY],
    );

    const onLeave = useCallback(() => {
      mouseX.set(-9999);
      mouseY.set(-9999);
    }, [mouseX, mouseY]);

    const background = useMotionTemplate`radial-gradient(${size}px circle at ${mouseX}px ${mouseY}px, ${color}, transparent 70%)`;

    return (
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={["group/spot relative", className].filter(Boolean).join(" ")}
      >
        {/* glow layer — positioned absolutely so it never affects layout */}
        <motion.div
          aria-hidden
          className={[
            "pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100",
            borderClassName ?? "",
          ].join(" ")}
          style={{ background }}
        />
        {children}
      </div>
    );
  },
);

/* ============================================================
   AnimatedGradientText — gradient text with shimmer
   ============================================================ */

export function ShimmerText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={[
        "relative inline-block bg-clip-text text-transparent",
        "bg-[linear-gradient(110deg,#2AABEE_0%,#FFE100_30%,#FFFFFF_50%,#2AABEE_70%,#FFE100_100%)]",
        "bg-[length:200%_100%] animate-[shimmer_3.5s_ease-in-out_infinite]",
        className ?? "",
      ].join(" ")}
    >
      {children}
    </span>
  );
}

/* ============================================================
   GlowDot — animated indicator pulse (small)
   ============================================================ */

export function GlowDot({ color = "#2AABEE" }: { color?: string }) {
  return (
    <span className="relative inline-flex h-2 w-2 items-center justify-center">
      <span
        className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
        style={{ background: color }}
      />
      <span
        className="relative inline-flex h-2 w-2 rounded-full"
        style={{ background: color }}
      />
    </span>
  );
}

/* ============================================================
   Tilt — 3D card tilt on mouse hover (Aceternity-style)
   ============================================================ */

export function Tilt({
  children,
  className,
  max = 6,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const sX = useSpring(rotateX, { stiffness: 150, damping: 14 });
  const sY = useSpring(rotateY, { stiffness: 150, damping: 14 });
  const reduce = useReducedMotion();

  const onMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (reduce) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      rotateY.set(px * max);
      rotateX.set(-py * max);
    },
    [reduce, max, rotateX, rotateY],
  );

  const reset = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{
        rotateX: sX,
        rotateY: sY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
