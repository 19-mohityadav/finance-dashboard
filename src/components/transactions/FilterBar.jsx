import { useApp } from "../../context/AppContext";

export default function FilterBar() {
  const { filters, setFilters, transactions } = useApp();

  const categories = ["all", ...new Set(transactions.map((transaction) => transaction.category))];

  return (
    <div className="glass flex flex-col gap-3 p-4 md:flex-row md:items-center md:flex-wrap">
      <input
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        placeholder="Search by category, type, date, amount"
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 outline-none md:max-w-xs"
      />

      <select
        value={filters.type}
        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 outline-none"
      >
        <option value="all">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <select
        value={filters.category}
        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 outline-none"
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category === "all" ? "All Categories" : category}
          </option>
        ))}
      </select>

      <select
        value={filters.sort}
        onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
        className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 outline-none"
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="highest">Highest Amount</option>
        <option value="lowest">Lowest Amount</option>
      </select>

      <button
        onClick={() =>
          setFilters({
            search: "",
            type: "all",
            category: "all",
            sort: "newest",
          })
        }
        className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 transition hover:bg-white/10"
      >
        Reset
      </button>
    </div>
  );
}