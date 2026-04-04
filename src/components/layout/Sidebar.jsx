import { useApp } from "../../context/AppContext";

export default function Sidebar() {
  const { activeTab, setActiveTab } = useApp();

  const menuItems = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "transactions", label: "Transactions", icon: "💸" },
    { id: "insights", label: "Insights", icon: "💡" },
  ];

  return (
    <aside className="hidden w-72 flex-col border-r border-[var(--border-color)] bg-[var(--bg-primary)] px-6 py-8 lg:flex">
      <div className="mb-10">
        <div className="flex items-center gap-3 text-2xl font-bold tracking-tight">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20">
            <span className="text-xl">💰</span>
          </div>
          <div>
            <span className="gradient-text">MY</span> Finance
          </div>
        </div>
        <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">
          Smart finance intelligence for everyday tracking
        </p>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
              activeTab === item.id
                ? "bg-[var(--sidebar-active)] text-blue-500 shadow-sm shadow-blue-500/5"
                : "text-[var(--text-secondary)] hover:bg-[var(--sidebar-hover)] hover:text-[var(--text-primary)]"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-auto overflow-hidden rounded-2xl border border-[var(--border-color)] bg-gradient-to-br from-blue-50/50 to-indigo-50/50 p-5 dark:from-white/5 dark:to-white/10">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          Status
        </div>
        <p className="mt-2 text-lg font-bold">Active dashboard</p>
        <p className="mt-1 text-xs text-[var(--text-secondary)]">Syncing in real-time</p>
      </div>
    </aside>
  );
}