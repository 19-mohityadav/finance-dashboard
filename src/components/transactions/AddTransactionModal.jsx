import { useEffect, useState } from "react";
import { useApp } from "../../context/AppContext";

const emptyForm = {
  amount: "",
  category: "",
  type: "expense",
  date: new Date().toISOString().slice(0, 10),
};

export default function AddTransactionModal() {
  const {
    role,
    isFormOpen,
    editingTransaction,
    addTransaction,
    updateTransaction,
    closeForm,
  } = useApp();

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (editingTransaction) {
      setForm({
        amount: editingTransaction.amount,
        category: editingTransaction.category,
        type: editingTransaction.type,
        date: editingTransaction.date,
      });
    } else {
      setForm(emptyForm);
    }
  }, [editingTransaction, isFormOpen]);

  if (role !== "admin" || !isFormOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.amount || !form.category || !form.date) return;

    const payload = {
      id: editingTransaction ? editingTransaction.id : Date.now().toString(),
      amount: Number(form.amount),
      category: form.category,
      type: form.type,
      date: form.date,
    };

    if (editingTransaction) {
      updateTransaction(payload);
    } else {
      addTransaction(payload);
    }

    closeForm();
    setForm(emptyForm);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="glass w-full max-w-lg p-6">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            {editingTransaction ? "Edit Transaction" : "Add Transaction"}
          </h3>
          <button onClick={closeForm} className="text-white/60">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            placeholder="Amount"
            type="number"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
          />
          <input
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            placeholder="Category"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
          />
          <input
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            type="date"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
          />
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <div className="flex gap-3">
            <button type="submit" className="btn-primary">
              {editingTransaction ? "Update" : "Save"}
            </button>
            <button
              type="button"
              onClick={closeForm}
              className="rounded-xl border border-white/10 bg-white/5 px-5 py-2 transition hover:bg-white/10"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}