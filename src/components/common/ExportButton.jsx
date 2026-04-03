import { useApp } from "../../context/AppContext";
import exportCSV from "../../utils/exportCSV";

export default function ExportButton() {
  const { transactions } = useApp();

  return (
    <button
      onClick={() => exportCSV(transactions)}
      className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm transition hover:bg-white/10"
      disabled={!transactions.length}
    >
      Export CSV
    </button>
  );
}