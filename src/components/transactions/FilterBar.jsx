import { useApp } from "../../context/AppContext";

export default function FilterBar() {
  const { filters, setFilters, transactions } = useApp();

  const categories = ["all", ...new Set(transactions.map((transaction) => transaction.category))];

  return (
    <div className="card !bg-transparent !p-0 flex flex-col gap-4 md:flex-row md:items-center md:flex-wrap lg:gap-6">
      <div className="relative w-full shadow-sm md:max-w-xs">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50">🔍</span>
        <input
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          placeholder="Search activity..."
          className="w-full rounded-2xl border border-[var(--border-color)] bg-[var(--bg-primary)] py-3.5 pl-12 pr-4 text-sm font-medium outline-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 placeholder:text-[var(--text-secondary)]/50"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <select
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-primary)] px-5 py-3.5 text-sm font-bold uppercase tracking-wider outline-none transition-all hover:border-[var(--text-secondary)] focus:border-blue-500 dark:bg-[#1a1f2e] dark:border-white/5"
        >
          <option value="all">ALL TYPES</option>
          <option value="income">INCOME</option>
          <option value="expense">EXPENSE</option>
        </select>

        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-primary)] px-5 py-3.5 text-sm font-bold uppercase tracking-wider outline-none transition-all hover:border-[var(--text-secondary)] focus:border-blue-500 dark:bg-[#1a1f2e] dark:border-white/5"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category === "all" ? "CATEGORY: ALL" : `CAT: ${category.toUpperCase()}`}
            </option>
          ))}
        </select>

        <select
          value={filters.sort}
          onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
          className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-primary)] px-5 py-3.5 text-sm font-bold uppercase tracking-wider outline-none transition-all hover:border-[var(--text-secondary)] focus:border-blue-500 dark:bg-[#1a1f2e] dark:border-white/5"
        >
          <option value="newest">SORT: NEWEST</option>
          <option value="oldest">SORT: OLDEST</option>
          <option value="highest">SORT: HIGHEST</option>
          <option value="lowest">SORT: LOWEST</option>
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
          className="rounded-2xl border border-blue-500/30 bg-blue-50 px-6 py-3.5 text-xs font-black uppercase tracking-widest text-blue-600 transition-all hover:bg-blue-600 hover:text-white dark:bg-blue-500/5 dark:text-blue-400 dark:hover:bg-blue-500/20 shadow-sm shadow-blue-500/10"
        >
          RESET FILTERS
        </button>
      </div>
    </div>
  );
}