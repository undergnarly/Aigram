"use client";

import { useEffect, useState } from "react";
import { Button, Arrow, useContent } from "../lib";

/**
 * Sticky bottom CTA on mobile only. Hides after the user has scrolled past
 * the final CTA section (#book) so it doesn't compete with the form.
 */
export default function MobileStickyCTA() {
  const c = useContent();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("main");
    const book = document.getElementById("book");
    if (!hero || !book) return;

    let pastHero = false;
    let nearBook = false;
    const update = () => setShown(pastHero && !nearBook);

    const heroIO = new IntersectionObserver(
      ([e]) => {
        pastHero = !e.isIntersecting;
        update();
      },
      { threshold: 0.05 },
    );
    const bookIO = new IntersectionObserver(
      ([e]) => {
        nearBook = e.isIntersecting;
        update();
      },
      { threshold: 0.1 },
    );
    heroIO.observe(hero);
    bookIO.observe(book);
    return () => {
      heroIO.disconnect();
      bookIO.disconnect();
    };
  }, []);

  return (
    <div
      className={[
        "pointer-events-none fixed inset-x-0 bottom-0 z-[60] flex justify-center px-4 pb-[calc(10px+env(safe-area-inset-bottom,0px))] transition-all duration-300 md:hidden",
        shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
      ].join(" ")}
      aria-hidden={!shown}
    >
      <Button
        variant="primary"
        size="md"
        className="pointer-events-auto max-w-full shadow-[0_14px_36px_-10px_rgba(0,0,0,0.55)]"
        tabIndex={shown ? 0 : -1}
        onClick={() =>
          window.dispatchEvent(
            new CustomEvent("booking-modal-open", { detail: { product: "planner" } }),
          )
        }
      >
        {c.mobileCta}
        <Arrow />
      </Button>
    </div>
  );
}
