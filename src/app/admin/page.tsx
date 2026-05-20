import Link from "next/link";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

function startOfWeek(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - d.getDay());
  return d;
}

type RecentLead = {
  id: string;
  name: string | null;
  email: string | null;
  status: string;
  createdAt: Date;
};

export default async function AdminDashboard() {
  const [total, weekCount, qualifiedCount, recentRows] = await Promise.all([
    db.lead.count(),
    db.lead.count({ where: { createdAt: { gte: startOfWeek() } } }),
    db.lead.count({ where: { status: { in: ["qualified", "closed"] } } }),
    db.lead.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, name: true, email: true, status: true, createdAt: true },
    }),
  ]);

  const conversion =
    total >= 10 ? `${Math.round((qualifiedCount / total) * 100)}%` : "—";

  return (
    <div className="space-y-8 sm:space-y-10">
      <PageHeader />
      <StatsGrid
        total={total}
        weekCount={weekCount}
        conversion={conversion}
        hasEnoughForConversion={total >= 10}
      />
      <RecentActivity leads={recentRows} />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */

function PageHeader() {
  return (
    <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div className="mb-2 text-[11px] font-mono uppercase tracking-[0.18em] text-slate-500">
          Overview
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Quick pulse on AiGram pipeline activity.
        </p>
      </div>
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs text-slate-600">
        <span className="h-1.5 w-1.5 rounded-full bg-[#0088CC] shadow-[0_0_8px_rgba(222,255,0,0.7)]" />
        Live · synced just now
      </div>
    </header>
  );
}

function StatsGrid({
  total,
  weekCount,
  conversion,
  hasEnoughForConversion,
}: {
  total: number;
  weekCount: number;
  conversion: string;
  hasEnoughForConversion: boolean;
}) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
      <StatCard
        label="Total leads"
        value={total === 0 ? "—" : String(total)}
        delta={total === 0 ? "No data yet" : `${total} total submission${total === 1 ? "" : "s"}`}
        icon={<UsersIcon />}
        tone="brand"
      />
      <StatCard
        label="This week"
        value={weekCount === 0 ? "—" : String(weekCount)}
        delta={weekCount === 0 ? "Awaiting first signal" : "New this week"}
        icon={<TrendIcon />}
      />
      <StatCard
        label="Conversion"
        value={conversion}
        delta={hasEnoughForConversion ? "Qualified + closed" : "Needs ≥10 leads"}
        icon={<TargetIcon />}
      />
    </section>
  );
}

function StatCard({
  label,
  value,
  delta,
  icon,
  tone,
}: {
  label: string;
  value: string;
  delta: string;
  icon: React.ReactNode;
  tone?: "brand" | "default";
}) {
  const brandRing =
    tone === "brand"
      ? "before:absolute before:inset-0 before:rounded-2xl before:p-px before:bg-gradient-to-br before:from-[#0088CC]/40 before:via-[#2AABEE]/10 before:to-transparent before:[mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] before:[mask-composite:exclude] before:pointer-events-none"
      : "";

  const iconBg =
    tone === "brand"
      ? "bg-[#0088CC]/15 text-[#0088CC] ring-1 ring-[#0088CC]/30"
      : "bg-white/5 text-slate-700 ring-1 ring-white/10";

  return (
    <div
      className={`relative rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04] hover:shadow-[0_8px_32px_-12px_rgba(222,255,0,0.15)] sm:p-6 ${brandRing}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-medium uppercase tracking-wider text-slate-500">
            {label}
          </div>
          <div className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            {value}
          </div>
        </div>
        <span className={`grid h-10 w-10 place-items-center rounded-xl ${iconBg}`}>
          {icon}
        </span>
      </div>
      <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
        <span className="h-1 w-1 rounded-full bg-white/30" />
        {delta}
      </div>
    </div>
  );
}

function RecentActivity({ leads }: { leads: RecentLead[] }) {
  return (
    <section>
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="text-lg font-semibold tracking-tight">Recent activity</h2>
        <Link
          href="/admin/leads"
          className="text-xs font-medium text-[#0088CC] hover:text-[#2AABEE]"
        >
          View all leads →
        </Link>
      </div>
      {leads.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-10 text-center sm:p-14">
          <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-[#0088CC]/10 text-[#0088CC] ring-1 ring-[#0088CC]/30">
            <SparkleIcon />
          </div>
          <div className="text-base font-semibold">Quiet on the wire</div>
          <p className="mx-auto mt-1.5 max-w-sm text-sm text-slate-600">
            No activity yet. New Discovery-Call requests will land here in real time.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] divide-y divide-white/5">
          {leads.map((lead) => (
            <RecentLeadRow key={lead.id} lead={lead} />
          ))}
        </div>
      )}
    </section>
  );
}

function RecentLeadRow({ lead }: { lead: RecentLead }) {
  const initials = (lead.name ?? lead.email ?? "??").slice(0, 2).toUpperCase();
  const statusColors: Record<string, string> = {
    new: "bg-[#0088CC]/15 text-[#0088CC] ring-[#0088CC]/25",
    contacted: "bg-sky-400/15 text-sky-300 ring-sky-400/25",
    qualified: "bg-emerald-400/15 text-emerald-300 ring-emerald-400/25",
    closed: "bg-white/5 text-slate-500 ring-white/10",
  };
  const pillClass = statusColors[lead.status] ?? statusColors.new;

  return (
    <div className="flex items-center gap-3 px-5 py-3.5 hover:bg-white/[0.015] transition-colors">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#0088CC]/30 to-[#2AABEE]/10 text-xs font-bold text-[#0088CC] ring-1 ring-[#0088CC]/30">
        {initials}
      </span>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium text-slate-900">
          {lead.name ?? <span className="italic text-slate-500">No name</span>}
        </div>
        <div className="truncate text-xs text-slate-500">{lead.email}</div>
      </div>
      <span
        className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ${pillClass}`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
        {lead.status}
      </span>
      <time
        dateTime={lead.createdAt.toISOString()}
        className="shrink-0 text-xs text-slate-500"
      >
        {lead.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
      </time>
    </div>
  );
}

/* ─── Icons ──────────────────────────────────────────────────────────── */

function UsersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
      <circle cx="10" cy="7" r="4" />
      <path d="M21 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M17 3.13A4 4 0 0 1 17 11" />
    </svg>
  );
}

function TrendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="3 17 9 11 13 15 21 7" />
      <polyline points="14 7 21 7 21 14" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3v3" />
      <path d="M12 18v3" />
      <path d="M3 12h3" />
      <path d="M18 12h3" />
      <path d="m5.6 5.6 2.1 2.1" />
      <path d="m16.3 16.3 2.1 2.1" />
      <path d="m18.4 5.6-2.1 2.1" />
      <path d="m7.7 16.3-2.1 2.1" />
    </svg>
  );
}
