import { useApp } from "../../context/AppContext";
import { getFilteredTransactions } from "../../utils/helpers";

export default function TransactionList() {
  const { transactions, filters, role, openEditForm, deleteTransaction } = useApp();

  const filtered = getFilteredTransactions(transactions, filters);

  return (
    <div className="glass p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold">Transactions</h2>
        <span className="text-sm text-white/50">{filtered.length} records</span>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-white/50">
          No transactions found
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((transaction) => (
            <div
              key={transaction.id}
              className="flex flex-col gap-3 rounded-2xl bg-white/5 p-4 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <div className="font-medium">{transaction.category}</div>
                <div className="mt-1 text-sm text-white/50">
                  {transaction.date} · {transaction.type}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span
                  className={
                    transaction.type === "income"
                      ? "text-emerald-400"
                      : "text-rose-400"
                  }
                >
                  {transaction.type === "income" ? "+" : "-"}₹
                  {Number(transaction.amount).toLocaleString("en-IN")}
                </span>

                {role === "admin" ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditForm(transaction)}
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-sm transition hover:bg-white/10"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTransaction(transaction.id)}
                      className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-1 text-sm text-rose-300 transition hover:bg-rose-500/20"
                    >
                      Delete
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