import { notFound } from "next/navigation";
import Link from "next/link";
import { PRODUCTS, PRODUCT_SLUGS } from "@/lib/products";

export function generateStaticParams() {
  return PRODUCT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = PRODUCTS[slug];
  if (!p) return {};
  return {
    title: `${p.name} — ${p.tagline} | GramCrew`,
    description: p.hero,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = PRODUCTS[slug];
  if (!p) notFound();

  return (
    <main className="min-h-screen bg-[#FFFFFF] text-slate-900">
      {/* Sticky top nav */}
      <header className="sticky top-0 z-20 border-b border-white/8 bg-[#FFFFFF]/85 backdrop-blur-md">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
          <Link href="/" className="font-bold text-[#0088CC]">GramCrew</Link>
          <Link
            href="/#packages"
            className="text-xs sm:text-sm text-slate-600 hover:text-slate-900"
          >
            All packages →
          </Link>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        {/* Hero */}
        <div className="mb-12 sm:mb-20">
          <div className="flex items-center gap-3 mb-6 text-xs font-mono tracking-widest uppercase">
            <span className="text-slate-500">{p.num}</span>
            <span className="px-2 py-1 rounded-full bg-[#0088CC]/15 text-[#0088CC]">{p.badge}</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.05] mb-4">
            {p.name}.
          </h1>
          <p className="text-xl sm:text-2xl font-medium text-slate-700 mb-6 italic">
            {p.tagline}
          </p>
          <p className="text-lg sm:text-xl text-slate-800 leading-relaxed mb-8 sm:mb-10">{p.hero}</p>
          {/* Product visual */}
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#FFFFFF] aspect-[16/9] relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/products/${p.slug}.webp`}
              alt={`${p.name} — ${p.tagline}`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Problem → Outcome */}
        <section className="grid sm:grid-cols-2 gap-6 mb-12 sm:mb-20">
          <div className="rounded-2xl border border-white/10 p-6 sm:p-7">
            <div className="text-xs font-mono uppercase tracking-widest text-red-400 mb-3">
              ↳ Problem
            </div>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">{p.problem}</p>
          </div>
          <div className="rounded-2xl border border-[#0088CC]/40 bg-[#0088CC]/5 p-6 sm:p-7">
            <div className="text-xs font-mono uppercase tracking-widest text-[#0088CC] mb-3">
              → Outcome
            </div>
            <p className="text-base sm:text-lg text-slate-800 leading-relaxed">{p.outcome}</p>
          </div>
        </section>

        {/* Business impact KPIs */}
        <section className="mb-12 sm:mb-20">
          <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-6">
            Business impact
          </div>
          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
            {p.impact.map((i) => (
              <div
                key={i.label}
                className="rounded-2xl border border-white/10 p-5 sm:p-6 bg-white/[0.02]"
              >
                <div className="text-4xl sm:text-5xl font-bold tracking-tight text-[#0088CC] mb-2">
                  {i.metric}
                </div>
                <div className="text-sm font-semibold mb-1">{i.label}</div>
                <p className="text-sm text-slate-600 leading-relaxed">{i.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What you get */}
        <section className="mb-12 sm:mb-20">
          <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-6">
            What you get
          </div>
          <ul className="space-y-3">
            {p.deliverables.map((d) => (
              <li key={d} className="flex gap-3 items-start text-base sm:text-lg text-slate-800">
                <span className="text-[#0088CC] mt-1 shrink-0">✓</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* How it works */}
        <section className="mb-12 sm:mb-20">
          <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-6">
            How it works
          </div>
          <div className="space-y-4">
            {p.howItWorks.map((s) => (
              <div
                key={s.step}
                className="rounded-2xl border border-white/10 p-5 sm:p-6 grid grid-cols-[auto_1fr] gap-4 sm:gap-6 items-start"
              >
                <div className="text-2xl sm:text-3xl font-bold text-[#0088CC]/70 font-mono">
                  {s.step}
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-bold mb-1">{s.title}</div>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Case study */}
        <section className="mb-12 sm:mb-20 rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-10">
          <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-4">
            Case study
          </div>
          <div className="mb-6">
            <div className="text-lg sm:text-xl font-bold mb-1">{p.case.client}</div>
            <div className="text-sm text-slate-600">{p.case.role}</div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-red-400 mb-2">
                Before
              </div>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {p.case.before}
              </p>
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#0088CC] mb-2">
                After
              </div>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {p.case.after}
              </p>
            </div>
          </div>
          <div className="rounded-xl bg-[#0088CC]/10 border border-[#0088CC]/30 px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg font-semibold text-[#0088CC]">
            {p.case.metric}
          </div>
        </section>

        {/* Pricing tiers */}
        <section className="mb-12 sm:mb-20">
          <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-6">
            Pricing
          </div>
          <div className="grid md:grid-cols-3 gap-4 sm:gap-5">
            {p.tiers.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl border border-white/10 p-5 sm:p-6 flex flex-col gap-4"
              >
                <div>
                  <div className="text-base sm:text-lg font-bold mb-1">{t.name}</div>
                  <div className="text-2xl sm:text-3xl font-bold tracking-tight">
                    ${t.price.toLocaleString()}
                  </div>
                  <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mt-1">
                    {t.delivery}
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-slate-700 flex-1">
                  {t.features.map((f) => (
                    <li key={f} className="flex gap-2 items-start">
                      <span className="text-[#0088CC] mt-0.5 shrink-0">·</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12 sm:mb-20">
          <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-6">
            FAQ
          </div>
          <div className="space-y-3">
            {p.faqs.map((f) => (
              <details
                key={f.q}
                className="rounded-2xl border border-white/10 p-5 sm:p-6 group"
              >
                <summary className="font-semibold text-base sm:text-lg cursor-pointer list-none flex justify-between items-center gap-4">
                  <span>{f.q}</span>
                  <span className="text-[#0088CC] text-xl group-open:rotate-45 transition-transform shrink-0">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-3xl border border-[#0088CC]/30 bg-[#0088CC]/5 p-6 sm:p-10 text-center">
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight mb-3">
            Ready for {p.name}?
          </h2>
          <p className="text-base sm:text-lg text-slate-700 mb-6 max-w-xl mx-auto">
            30-min Discovery Call. We map your stack and confirm fit before any build.
          </p>
          <a
            href="https://cal.com/gramcrew/discovery"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 rounded-full bg-[#0088CC] text-white font-bold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg hover:scale-[1.02] transition-transform"
          >
            Book Discovery Call →
          </a>
        </section>
      </article>
    </main>
  );
}
