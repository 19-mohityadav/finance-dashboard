import { useApp } from "../../context/AppContext";
import Card from "../../components/ui/Card";
import TransactionRow from "./TransactionRow";

/**
 * Functional transaction grid displaying records based on filters. 
 * Handles empty states and optional display limits for recent activity views.
 */
export default function TransactionTable({ limit }) {
  const { filteredTransactions, role } = useApp();

  const displayed = limit 
    ? filteredTransactions.slice(0, limit) 
    : filteredTransactions;

  return (
    <Card 
      className="!bg-transparent !p-0 shadow-none border-none overflow-visible" 
      title={limit ? "Recent Activity" : "Financial Ledger"}
      extra={
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-black text-indigo-500 border border-indigo-500/20">
            {displayed.length} matched
          </span>
        </div>
      }
    >
      <div className="w-full overflow-hidden">
        {/* Table Header - Only show for Full Ledger on Desktop */}
        {!limit && (
          <div className="hidden lg:grid grid-cols-[1fr_repeat(3,minmax(120px,0.5fr))_80px] gap-6 px-4 py-4 border-b border-[var(--border-color)] opacity-40 text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)]">
             <span>Record / Source</span>
             <span className="text-center">Date</span>
             <span className="text-center">Category</span>
             <span className="text-right">Market Value</span>
             <span className="text-right">{role === "admin" ? "Actions" : ""}</span>
          </div>
        )}


        {displayed.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-[2.5rem] border-2 border-dashed border-[var(--border-color)] p-20 text-center transition-all bg-[var(--card-bg)] opacity-60">
            <div className="text-5xl mb-6 grayscale opacity-20">📂</div>
            <h3 className="text-xl font-black tracking-tight">No match found</h3>
            <p className="text-sm font-semibold text-[var(--text-secondary)] mt-2 opacity-70">Adjust your criteria or clear search queries</p>
          </div>
        ) : (
          <div className="space-y-4 pt-4 lg:pt-0">
            {displayed.map((transaction) => (
              <TransactionRow key={transaction.id} transaction={transaction} isLedgerView={!limit} />
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}

