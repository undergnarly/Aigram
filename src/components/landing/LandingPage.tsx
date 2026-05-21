"use client";

import { LangProvider, BookingModal } from "./lib";
import Nav from "./sections/Nav";
import Hero from "./sections/Hero";
import SocialProof from "./sections/SocialProof";
import Products from "./sections/Products";
import Metrics from "./sections/Metrics";
import Features from "./sections/Features";
import Process from "./sections/Process";
import Pricing from "./sections/Pricing";
import FAQ from "./sections/FAQ";
import FinalCTA from "./sections/FinalCTA";
import Footer from "./sections/Footer";
import MobileStickyCTA from "./sections/MobileStickyCTA";
import TelegramDemo from "./sections/TelegramDemo";

export default function LandingPage() {
  return (
    <LangProvider>
      <div className="relative min-h-screen bg-white text-[var(--ink)]">
        <Nav />
        <main>
          <Hero />
          <TelegramDemo />
          <SocialProof />
          <Products />
          <Metrics />
          <Features />
          <Process />
          <Pricing />
          <FAQ />
          <FinalCTA />
        </main>
        <Footer />
        <MobileStickyCTA />
        <BookingModal />
      </div>
    </LangProvider>
  );
}
