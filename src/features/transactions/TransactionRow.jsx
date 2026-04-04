import { memo } from "react";
import { useApp } from "../../context/AppContext";
import HasPermission from "../../components/common/HasPermission";

/**
 * Individual record row displaying transaction details.
 * Optimized with React.memo to prevent expensive re-renders in large ledger lists.
 */
const TransactionRow = memo(function TransactionRow({ transaction, isLedgerView }) {
  const { openEditForm, deleteTransaction } = useApp();
  const isIncome = transaction.type === "income";

  return (
    <div className={`group flex flex-col gap-4 rounded-[1.5rem] border border-[var(--border-color)] bg-[var(--card-bg)] p-4 shadow-sm transition-all duration-300 hover:border-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/5 ${
      isLedgerView 
        ? "lg:grid lg:grid-cols-[1fr_repeat(3,minmax(120px,0.5fr))_80px] lg:items-center lg:gap-6 lg:p-4" 
        : "md:flex-row md:items-center md:justify-between md:px-6"
    }`}>

      {/* Name Component */}
      <div className="flex items-center gap-4">
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-black transition-transform group-hover:scale-105 ${
          isIncome 
            ? "bg-emerald-500/10 text-emerald-600" 
            : "bg-rose-500/10 text-rose-600"
        }`}>
          {transaction.category.charAt(0)}
        </div>
        <div className="overflow-hidden">
          <div className="truncate font-black text-slate-800 dark:text-slate-100">{transaction.category}</div>
          {/* Only show secondary info on mobile OR if not in ledger view */}
          <div className={`mt-0.5 text-[10px] font-black uppercase tracking-wider text-[var(--text-secondary)] opacity-60 ${isLedgerView ? "lg:hidden" : ""}`}>
            {transaction.date} · {transaction.type}
          </div>
        </div>
      </div>

      {/* Ledger specific columns */}
      {isLedgerView && (
        <>
          <div className="hidden lg:block text-center text-sm font-bold text-[var(--text-secondary)]">
            {transaction.date}
          </div>
          <div className="hidden lg:block text-center text-sm font-bold">
            <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${
              isIncome ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-600"
            }`}>
              {transaction.category}
            </span>
          </div>
        </>
      )}

      {/* Amount Component */}
      <div className={`flex items-center justify-between md:justify-end gap-6 ${isLedgerView ? "lg:text-right" : ""}`}>
        <div className={`text-lg font-black tabular-nums tracking-tighter ${
          isIncome ? "text-emerald-600" : "text-rose-600"
        }`}>
          {isIncome ? "+" : "-"}₹{Number(transaction.amount).toLocaleString("en-IN", { minimumFractionDigits: 0 })}
        </div>

        {/* Global actions */}
        <div className="flex items-center gap-2">
          <HasPermission role="admin">
            <div className="flex gap-2 lg:scale-90 lg:opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
               <button onClick={() => openEditForm(transaction)} className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center text-sm hover:bg-slate-200 dark:hover:bg-white/10 transition-colors">✏️</button>
               <button onClick={() => deleteTransaction(transaction.id)} className="h-8 w-8 rounded-lg bg-rose-500/5 dark:bg-rose-500/10 flex items-center justify-center text-sm hover:bg-rose-500 hover:text-white transition-all text-rose-500">🗑️</button>
            </div>
          </HasPermission>
        </div>
      </div>
    </div>
  );
});

export default TransactionRow;


