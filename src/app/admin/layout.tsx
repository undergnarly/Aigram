import Link from "next/link";

/**
 * Admin shell — dark, brand-accented chrome wrapping every /admin/* page.
 *
 * Layout: fixed sidebar on >=lg, collapsing to a top bar on mobile.
 * Visuals: #FFFFFF background, #0088CC brand accent, subtle white/8 hairlines,
 * faint mesh glow in the background to echo the marketing site.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-[#FFFFFF] text-slate-900 antialiased">
      {/* Ambient glow — matches the landing page's mesh vibe at lower intensity */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-0 overflow-hidden"
      >
        <div className="absolute -top-32 -right-32 h-[480px] w-[480px] rounded-full bg-[#0088CC]/[0.06] blur-[140px]" />
        <div className="absolute top-[40vh] -left-32 h-[420px] w-[420px] rounded-full bg-[#2AABEE]/[0.04] blur-[140px]" />
      </div>

      {/* ─── Sidebar (>=lg) ──────────────────────────────────────────────── */}
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 border-r border-white/8 bg-[#FFFFFF]/90 backdrop-blur-xl lg:block">
        <div className="flex h-full flex-col">
          <BrandHeader />
          <SidebarNav />
          <SidebarFooter />
        </div>
      </aside>

      {/* ─── Top bar (<lg) ──────────────────────────────────────────────── */}
      <header className="sticky top-0 z-20 border-b border-white/8 bg-[#FFFFFF]/90 backdrop-blur-xl lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <BrandHeader compact />
        </div>
        <nav className="flex gap-1 overflow-x-auto px-4 pb-3">
          <MobileNavLink href="/admin" label="Dashboard" />
          <MobileNavLink href="/admin/leads" label="Leads" />
        </nav>
      </header>

      {/* ─── Main content ───────────────────────────────────────────────── */}
      <main className="relative z-10 lg:pl-64">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-12">
          {children}
        </div>
      </main>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */

function BrandHeader({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/admin"
      className={`flex items-center gap-3 ${compact ? "" : "border-b border-white/8 px-6 py-5"}`}
    >
      <span
        aria-hidden
        className="grid h-9 w-9 place-items-center rounded-lg bg-[#0088CC] text-[#FFFFFF] font-extrabold shadow-[0_4px_16px_-4px_rgba(192,255,31,0.5)]"
      >
        R
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-sm font-bold tracking-tight">GramCrew</span>
        <span className="mt-1 text-[10px] font-mono uppercase tracking-[0.18em] text-slate-500">
          Admin
        </span>
      </span>
    </Link>
  );
}

function SidebarNav() {
  return (
    <nav className="flex-1 px-3 py-6">
      <div className="px-3 pb-2 text-[10px] font-mono uppercase tracking-[0.18em] text-slate-400">
        Workspace
      </div>
      <ul className="space-y-1">
        <SidebarLink href="/admin" label="Dashboard" icon={<DashboardIcon />} />
        <SidebarLink href="/admin/leads" label="Leads" icon={<LeadsIcon />} />
      </ul>
    </nav>
  );
}

function SidebarLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-white/5 hover:text-slate-900"
      >
        <span className="text-slate-500 group-hover:text-[#0088CC] transition-colors">
          {icon}
        </span>
        {label}
      </Link>
    </li>
  );
}

function MobileNavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-[#0088CC]/40 hover:text-slate-900"
    >
      {label}
    </Link>
  );
}

function SidebarFooter() {
  return (
    <div className="border-t border-white/8 p-4">
      <Link
        href="/"
        className="flex items-center justify-between rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-slate-600 transition-colors hover:border-white/20 hover:text-slate-900"
      >
        <span>View site</span>
        <span aria-hidden>↗</span>
      </Link>
    </div>
  );
}

function DashboardIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </svg>
  );
}

function LeadsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
      <circle cx="10" cy="7" r="4" />
      <path d="M21 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M17 3.13A4 4 0 0 1 17 11" />
    </svg>
  );
}
