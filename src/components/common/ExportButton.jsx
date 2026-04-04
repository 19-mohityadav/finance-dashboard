import { useApp } from "../../context/AppContext";
import exportCSV from "../../utils/exportCSV";

export default function ExportButton() {
  const { transactions } = useApp();

  return (
    <button
      onClick={() => exportCSV(transactions)}
      className="flex h-10 items-center justify-center gap-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] px-5 py-2 text-xs font-black uppercase tracking-widest text-[var(--text-primary)] transition-all hover:bg-blue-500 hover:text-white hover:border-blue-500 disabled:cursor-not-allowed disabled:opacity-30 dark:bg-white/10 shadow-sm shadow-black/5"
      disabled={!transactions.length}
      aria-label="Export to CSV"
    >
      <span className="text-sm">📥</span>
      <span>Export</span>
    </button>
  );
}