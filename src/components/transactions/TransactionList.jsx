import { useApp } from "../../context/AppContext";
import { getFilteredTransactions } from "../../utils/helpers";

export default function TransactionList({ limit }) {
  const { transactions, filters, role, openEditForm, deleteTransaction } = useApp();

  let filtered = getFilteredTransactions(transactions, filters);
  if (limit) {
    filtered = filtered.slice(0, limit);
  }

  return (
    <div className="card border-none shadow-none !bg-transparent !p-0">
      <div className="mb-6 flex items-center justify-between gap-3">
        <h2 className="text-xl font-bold tracking-tight">
          {limit ? "Recent Transactions" : "Transaction History"}
        </h2>
        <span className="rounded-full bg-[var(--bg-secondary)] px-3 py-1 text-xs font-bold text-[var(--text-secondary)] border border-[var(--border-color)]">
          {filtered.length} records
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-[var(--border-color)] p-12 text-center transition-colors hover:border-blue-500/30">
          <div className="text-4xl mb-4 opacity-20">🔎</div>
          <p className="text-lg font-medium text-[var(--text-secondary)]">No transactions found</p>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Try adjusting your filters or search term</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((transaction) => (
            <div
              key={transaction.id}
              className="group flex flex-col gap-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-primary)] p-5 shadow-sm transition-all duration-300 hover:border-blue-500/30 hover:shadow-md md:flex-row md:items-center md:justify-between"
            >
              <div className="flex items-center gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl font-bold ${
                  transaction.type === "income" 
                    ? "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400" 
                    : "bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400"
                }`}>
                  {transaction.category.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-lg leading-snug">{transaction.category}</div>
                  <div className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                    {transaction.date} · {transaction.type}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-6 md:justify-end">
                <div
                  className={`text-xl font-black tabular-nums tracking-tight ${
                    transaction.type === "income"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-rose-600 dark:text-rose-400"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}₹{Number(transaction.amount).toLocaleString("en-IN")}
                </div>

                {role === "admin" ? (
                  <div className="flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <button
                      onClick={() => openEditForm(transaction)}
                      className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] px-3 py-1.5 text-xs font-bold transition-all hover:bg-blue-500 hover:text-white hover:border-blue-500"
                    >
                      EDIT
                    </button>
                    <button
                      onClick={() => deleteTransaction(transaction.id)}
                      className="rounded-lg border border-rose-500/30 bg-rose-500/5 px-3 py-1.5 text-xs font-bold text-rose-600 transition-all hover:bg-rose-600 hover:text-white"
                    >
                      DEL
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}