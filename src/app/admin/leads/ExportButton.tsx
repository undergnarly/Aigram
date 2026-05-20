"use client";

type Lead = {
  id: string;
  name: string | null;
  email: string | null;
  source: string | null;
  status: string;
  createdAt: string;
};

export function ExportButton({ leads }: { leads: Lead[] }) {
  function handleExport() {
    const header = ["Name", "Email", "Source", "Status", "Date"].join(",");
    const rows = leads.map((l) =>
      [
        l.name ?? "",
        l.email ?? "",
        l.source ?? "direct",
        l.status,
        new Date(l.createdAt).toLocaleDateString("en-US"),
      ]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(",")
    );
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement("a"), {
      href: url,
      download: `leads-${new Date().toISOString().slice(0, 10)}.csv`,
    });
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button
      type="button"
      onClick={handleExport}
      className="inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/[0.02] px-3.5 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:border-[#0088CC]/30 hover:bg-[#0088CC]/5 hover:text-slate-900 sm:self-auto"
    >
      <ExportIcon /> Export CSV
    </button>
  );
}

function ExportIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}
