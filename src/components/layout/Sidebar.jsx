import { useState } from "react";
import { useApp } from "../../context/AppContext";

export default function Sidebar() {
  const { activeTab, setActiveTab, clearAllData } = useApp();
  const [confirmClear, setConfirmClear] = useState(false);

  const menuItems = [
    { id: "overview", label: "Dashboard", icon: "📊" },
    { id: "transactions", label: "All Records", icon: "💸" },
    { id: "insights", label: "Intelligence", icon: "💡" },
  ];

  const handleClearClick = () => {
    if (confirmClear) {
      clearAllData();
      setConfirmClear(false);
    } else {
      setConfirmClear(true);
      // Auto-reset after 3 seconds if user doesn't confirm
      setTimeout(() => setConfirmClear(false), 3000);
    }
  };

  return (
    <aside className="hidden w-[280px] flex-col border-r border-[var(--border-color)] bg-[var(--sidebar-bg)] p-6 lg:flex transition-colors duration-500 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      <div className="mb-12 px-2">
        <div className="flex items-center gap-3 text-2xl font-black tracking-tight">
          <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30">
            <span className="text-[1.1rem]">💎</span>
          </div>
          <div>
            <span className="gradient-text tracking-tighter">Velocity</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-3">
        <div className="px-3 pb-2 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)] opacity-60">
          Main Menu
        </div>
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`group flex w-full items-center gap-4 rounded-2xl px-4 py-3.5 text-sm font-bold transition-all duration-300 ${
                isActive
                  ? "bg-indigo-500 text-white shadow-xl shadow-indigo-500/20 scale-[1.02]"
                  : "text-[var(--text-secondary)] hover:bg-[var(--border-color)] hover:text-[var(--text-primary)] hover:scale-[1.02]"
              }`}
            >
              <span className={`text-lg transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110 grayscale-[0.5]'}`}>{item.icon}</span>
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Clear Mock Data Button */}
      <div className="mt-auto pt-8">
        <div className="mb-3 px-3 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)] opacity-40">
          Data Management
        </div>
        <button
          onClick={handleClearClick}
          className={`group w-full rounded-2xl border px-4 py-3.5 text-left transition-all duration-300 ${
            confirmClear
              ? "border-rose-500/40 bg-rose-500/10 text-rose-500 scale-[1.02] shadow-lg shadow-rose-500/10"
              : "border-[var(--border-color)] bg-transparent text-[var(--text-secondary)] hover:border-rose-500/30 hover:bg-rose-500/5 hover:text-rose-500 hover:scale-[1.01]"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-base transition-all duration-300 ${
              confirmClear
                ? "bg-rose-500/20 text-rose-500"
                : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] group-hover:bg-rose-500/10 group-hover:text-rose-500"
            }`}>
              {confirmClear ? "⚠️" : "🗑️"}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-black uppercase tracking-wider leading-none">
                {confirmClear ? "Tap to confirm" : "Clear Mock Data"}
              </p>
              <p className={`mt-1 text-[10px] font-semibold leading-none transition-colors ${
                confirmClear ? "text-rose-400" : "text-[var(--text-secondary)] opacity-50"
              }`}>
                {confirmClear ? "This cannot be undone" : "Start fresh with your data"}
              </p>
            </div>
          </div>
        </button>
      </div>
    </aside>
  );
}