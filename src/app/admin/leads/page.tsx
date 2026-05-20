import Link from "next/link";
import { db } from "@/lib/db";
import { ExportButton } from "./ExportButton";

export const dynamic = "force-dynamic";

type LeadStatus = "new" | "contacted" | "qualified" | "closed";

type Lead = {
  id: string;
  name: string | null;
  email: string | null;
  source: string | null;
  status: LeadStatus;
  createdAt: string;
};

type StatusCounts = Record<LeadStatus, number> & { all: number };

function normalizeStatus(s: string): LeadStatus {
  return s === "contacted" || s === "qualified" || s === "closed" ? s : "new";
}

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const { filter } = await searchParams;
  const activeFilter = (["new", "contacted", "qualified", "closed"].includes(filter ?? "")
    ? filter
    : "all") as LeadStatus | "all";

  const rows = await db.lead.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
    select: { id: true, name: true, email: true, source: true, status: true, createdAt: true },
  });

  const allLeads: Lead[] = rows.map((r) => ({
    id: r.id,
    name: r.name,
    email: r.email,
    source: r.source,
    status: normalizeStatus(r.status),
    createdAt: r.createdAt.toISOString(),
  }));

  const counts: StatusCounts = {
    all: allLeads.length,
    new: allLeads.filter((l) => l.status === "new").length,
    contacted: allLeads.filter((l) => l.status === "contacted").length,
    qualified: allLeads.filter((l) => l.status === "qualified").length,
    closed: allLeads.filter((l) => l.status === "closed").length,
  };

  const leads = activeFilter === "all"
    ? allLeads
    : allLeads.filter((l) => l.status === activeFilter);

  return (
    <div className="space-y-8">
      <PageHeader count={leads.length} leads={allLeads} />
      <FilterBar active={activeFilter} counts={counts} />
      <LeadsTable leads={leads} />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */

function PageHeader({ count, leads }: { count: number; leads: Lead[] }) {
  return (
    <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div className="mb-2 text-[11px] font-mono uppercase tracking-[0.18em] text-white/40">
          Inbox
        </div>
        <h1 className="flex items-baseline gap-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Leads
          <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-xs font-semibold text-white/60 ring-1 ring-white/10">
            {count}
          </span>
        </h1>
        <p className="mt-1 text-sm text-white/55">
          Every Discovery-Call request and form submission, newest first.
        </p>
      </div>
      <ExportButton leads={leads} />
    </header>
  );
}

function FilterBar({
  active,
  counts,
}: {
  active: LeadStatus | "all";
  counts: StatusCounts;
}) {
  const filters: { key: LeadStatus | "all"; label: string }[] = [
    { key: "all", label: "All" },
    { key: "new", label: "New" },
    { key: "contacted", label: "Contacted" },
    { key: "qualified", label: "Qualified" },
    { key: "closed", label: "Closed" },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((f) => {
        const isActive = f.key === active;
        const href = f.key === "all" ? "/admin/leads" : `/admin/leads?filter=${f.key}`;
        return (
          <Link
            key={f.key}
            href={href}
            className={
              isActive
                ? "inline-flex items-center gap-2 rounded-full bg-[#0088CC] px-3.5 py-1.5 text-xs font-semibold text-[#FFFFFF]"
                : "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3.5 py-1.5 text-xs font-medium text-white/70 hover:border-white/20 hover:text-white"
            }
          >
            {f.label}
            <span
              className={
                isActive
                  ? "rounded-full bg-black/15 px-1.5 py-0.5 text-[10px] font-bold"
                  : "rounded-full bg-white/10 px-1.5 py-0.5 text-[10px] font-bold text-white/70"
              }
            >
              {counts[f.key]}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

function LeadsTable({ leads }: { leads: Lead[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-white/10 bg-white/[0.03]">
            <tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Source</Th>
              <Th>Status</Th>
              <Th align="right">Date</Th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan={5}>
                  <EmptyState />
                </td>
              </tr>
            ) : (
              leads.map((lead) => <LeadRow key={lead.id} lead={lead} />)
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Th({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <th
      className={`whitespace-nowrap px-4 py-3 text-[11px] font-medium uppercase tracking-wider text-white/45 sm:px-5 ${align === "right" ? "text-right" : "text-left"}`}
    >
      <span className="inline-flex items-center gap-1.5">
        {children}
        <span className="text-white/25" aria-hidden>↕</span>
      </span>
    </th>
  );
}

function LeadRow({ lead }: { lead: Lead }) {
  const initials = (lead.name ?? lead.email ?? "??").slice(0, 2).toUpperCase();
  return (
    <tr className="border-b border-white/5 last:border-b-0 transition-colors hover:bg-white/[0.02]">
      <td className="px-4 py-4 sm:px-5">
        <div className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-[#0088CC]/30 to-[#2AABEE]/10 text-xs font-bold text-[#0088CC] ring-1 ring-[#0088CC]/30">
            {initials}
          </span>
          <span className="font-medium text-white">
            {lead.name ?? <span className="italic text-white/50">No name</span>}
          </span>
        </div>
      </td>
      <td className="px-4 py-4 text-white/75 sm:px-5">{lead.email}</td>
      <td className="px-4 py-4 sm:px-5">
        <span className="rounded-md bg-white/5 px-2 py-0.5 font-mono text-xs text-white/65 ring-1 ring-white/10">
          {lead.source ?? "direct"}
        </span>
      </td>
      <td className="px-4 py-4 sm:px-5">
        <StatusPill status={lead.status} />
      </td>
      <td className="px-4 py-4 text-right text-white/55 sm:px-5">
        <time dateTime={lead.createdAt}>{formatDate(lead.createdAt)}</time>
      </td>
    </tr>
  );
}

function StatusPill({ status }: { status: Lead["status"] }) {
  const styles: Record<Lead["status"], string> = {
    new: "bg-[#0088CC]/15 text-[#0088CC] ring-[#0088CC]/30",
    contacted: "bg-sky-400/15 text-sky-300 ring-sky-400/30",
    qualified: "bg-emerald-400/15 text-emerald-300 ring-emerald-400/30",
    closed: "bg-white/5 text-white/45 ring-white/15",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ${styles[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

function EmptyState() {
  return (
    <div className="px-6 py-16 text-center sm:py-20">
      <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-[#0088CC]/10 text-[#0088CC] ring-1 ring-[#0088CC]/30">
        <InboxIcon />
      </div>
      <div className="text-base font-semibold">No leads yet</div>
      <p className="mx-auto mt-2 max-w-md text-sm text-white/55">
        When someone books a Discovery Call or submits a form on the site,
        they&rsquo;ll show up right here — with name, source, and status.
      </p>
      <div className="mt-6 flex justify-center gap-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-[#0088CC] px-4 py-2 text-xs font-bold text-[#FFFFFF] hover:scale-[1.02] transition-transform"
        >
          Preview landing page
        </Link>
        <a
          href="https://cal.com/aigram/discovery"
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-white/70 hover:border-white/20 hover:text-white"
        >
          Test booking flow ↗
        </a>
      </div>
    </div>
  );
}

/* ─── Helpers + icons ────────────────────────────────────────────────── */

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function InboxIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  );
}
