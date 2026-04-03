export default function Sidebar() {
  return (
    <aside className="hidden w-72 border-r border-white/5 bg-white/5 px-5 py-6 lg:flex lg:flex-col">
      <div className="mb-8">
        <div className="text-xl font-semibold">
          <span className="gradient-text">MY</span> Finance
        </div>
        <p className="mt-2 text-sm text-white/60">
          Simple finance intelligence for everyday tracking
        </p>
      </div>

      <div className="space-y-2 text-sm">
        <div className="rounded-xl bg-white/10 px-4 py-3">Overview</div>
        <div className="rounded-xl px-4 py-3 text-white/60">Transactions</div>
        <div className="rounded-xl px-4 py-3 text-white/60">Insights</div>
      </div>

      <div className="mt-auto rounded-2xl border border-white/10 bg-white/5 p-4">
        <p className="text-sm text-white/60">Status</p>
        <p className="mt-1 text-lg font-semibold">Active dashboard</p>
      </div>
    </aside>
  );
}