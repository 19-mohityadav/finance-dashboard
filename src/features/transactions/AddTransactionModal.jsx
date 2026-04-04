import { useEffect, useState } from "react";
import { useApp } from "../../context/AppContext";
import Button from "../../components/ui/Button";

const emptyForm = {
  amount: "",
  category: "",
  type: "expense",
  date: new Date().toISOString().slice(0, 10),
};

/**
 * Functional creation/editing modal for individual financial records.
 * Synchronizes local form state with global transaction state.
 */
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
  const [localErrors, setLocalErrors] = useState({});

  useEffect(() => {
    if (editingTransaction && isFormOpen) {
      setForm({
        amount: editingTransaction.amount,
        category: editingTransaction.category,
        type: editingTransaction.type,
        date: editingTransaction.date,
      });
    } else if (!isFormOpen) {
      setForm(emptyForm);
      setLocalErrors({});
    }
  }, [editingTransaction, isFormOpen]);

  if (role !== "admin" || !isFormOpen) return null;

  const validate = () => {
    const errors = {};
    const today = new Date().toISOString().split("T")[0];

    if (!form.amount || Number(form.amount) <= 0) {
      errors.amount = "Amount must be a positive number";
    }
    if (!form.category || form.category.trim().length < 2) {
      errors.category = "Category must be at least 2 characters";
    }
    if (!form.date) {
      errors.date = "Effective date is required";
    } else if (form.date > today) {
      errors.date = "Future dates are not permitted";
    }
    
    setLocalErrors(errors);
    return Object.keys(errors).length === 0;
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      id: editingTransaction ? editingTransaction.id : Date.now().toString(),
      amount: Number(form.amount),
      category: form.category.trim(),
      type: form.type,
      date: form.date,
    };

    if (editingTransaction) {
      updateTransaction(payload);
    } else {
      addTransaction(payload);
    }
    closeForm();
  };


  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity" onClick={closeForm} />
      
      {/* Modal Container */}
      <div className="card relative w-full max-w-lg scale-in shadow-2xl overflow-visible bg-[var(--bg-primary)] p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-black tracking-tight text-[var(--text-primary)]">
              {editingTransaction ? "Edit Record" : "New Transaction"}
            </h3>
            <p className="text-sm font-semibold text-[var(--text-secondary)] opacity-70">
              Manage your financial pulse
            </p>
          </div>
          <button 
            onClick={closeForm} 
            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--bg-secondary)] text-[var(--text-secondary)] transition-all hover:bg-rose-500 hover:text-white"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="grid gap-2">
            <label className="text-xs font-black uppercase tracking-widest text-[var(--text-secondary)] px-1">Amount (₹)</label>
            <input
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              placeholder="0.00"
              type="number"
              className={`w-full rounded-2xl border bg-[var(--bg-primary)] px-5 py-4 text-lg font-bold outline-none transition-all focus:ring-8 focus:ring-indigo-500/5 ${
                localErrors.amount ? "border-rose-500 focus:border-rose-600" : "border-[var(--border-color)] focus:border-indigo-500"
              }`}
            />
            {localErrors.amount && <span className="text-[10px] font-black text-rose-500 px-1 uppercase tracking-wider">{localErrors.amount}</span>}
          </div>

          <div className="grid gap-2">
             <label className="text-xs font-black uppercase tracking-widest text-[var(--text-secondary)] px-1">Source / Category</label>
             <input
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              placeholder="e.g. Salary, Rent, Groceries"
              className={`w-full rounded-2xl border bg-[var(--bg-primary)] px-5 py-4 font-semibold outline-none transition-all focus:ring-8 focus:ring-indigo-500/5 ${
                localErrors.category ? "border-rose-500 focus:border-rose-600" : "border-[var(--border-color)] focus:border-indigo-500"
              }`}
            />
            {localErrors.category && <span className="text-[10px] font-black text-rose-500 px-1 uppercase tracking-wider">{localErrors.category}</span>}
          </div>


          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label className="text-xs font-black uppercase tracking-widest text-[var(--text-secondary)] px-1">Date</label>
              <input
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                type="date"
                className={`w-full rounded-2xl border bg-[var(--bg-primary)] px-5 py-4 font-semibold outline-none transition-all focus:ring-8 focus:ring-indigo-500/5 ${
                  localErrors.date ? "border-rose-500 focus:border-rose-600" : "border-[var(--border-color)] focus:border-indigo-500"
                }`}
              />
              {localErrors.date && <span className="text-[10px] font-black text-rose-500 px-1 uppercase tracking-wider">{localErrors.date}</span>}
            </div>

            <div className="grid gap-2">
               <label className="text-xs font-black uppercase tracking-widest text-[var(--text-secondary)] px-1">Type</label>
               <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full rounded-2xl border border-[var(--border-color)] bg-[var(--bg-primary)] px-5 py-4 font-black uppercase tracking-widest text-xs outline-none transition-all focus:border-indigo-500 focus:ring-8 focus:ring-indigo-500/5 cursor-pointer appearance-none"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            <Button type="submit" className="flex-1 py-4">
              {editingTransaction ? "Save Changes" : "Create Transaction"}
            </Button>
            <Button
              type="button"
              onClick={closeForm}
              variant="secondary"
              className="px-8 py-4 text-xs font-black uppercase tracking-widest hover:bg-rose-500/10 hover:text-rose-500"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
