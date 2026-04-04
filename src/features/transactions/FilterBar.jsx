import { useMemo } from "react";
import { useApp } from "../../context/AppContext";
import Button from "../../components/ui/Button";

/**
 * Filter subsystem with localized search and categorization logic.
 * Subscribes to transaction state for dynamic category generation.
 */
export default function FilterBar() {
  const { filters, setFilters, transactions } = useApp();

  // Dynamically derive unique categories from the current record set
  const categories = useMemo(() => ["all", ...new Set(transactions.map((t) => t.category))], [transactions]);

  const updateFilters = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      type: "all",
      category: "all",
      sort: "newest",
    });
  };

  return (
    <div className="card !bg-transparent !p-0 flex flex-col gap-4 md:flex-row md:items-center md:flex-wrap lg:gap-6">
      {/* Search Input Box */}
      <div className="relative w-full shadow-sm md:max-w-xs transition-all duration-300 focus-within:scale-[1.02]">
        <span className="absolute left-5 top-1/2 -translate-y-1/2 opacity-40 text-lg">🔍</span>
        <input
          value={filters.search}
          onChange={(e) => updateFilters("search", e.target.value)}
          placeholder="Search activity..."
          className="w-full rounded-[1.5rem] border border-[var(--border-color)] bg-[var(--card-bg)] py-4 pl-14 pr-6 text-sm font-semibold outline-none transition-all duration-500 focus:border-indigo-500 focus:ring-8 focus:ring-indigo-500/5 placeholder:text-[var(--text-secondary)]/40"
        />
      </div>

      {/* Select Filters Group */}
      <div className="flex flex-wrap items-center gap-4">
        <select
          value={filters.type}
          onChange={(e) => updateFilters("type", e.target.value)}
          className="rounded-[1.25rem] border border-[var(--border-color)] bg-[var(--card-bg)] px-6 py-4 text-xs font-black uppercase tracking-widest outline-none transition-all hover:border-indigo-500/50 focus:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/5 cursor-pointer"
        >
          <option value="all">ALL TYPES</option>
          <option value="income">INCOME</option>
          <option value="expense">EXPENSE</option>
        </select>

        <select
          value={filters.category}
          onChange={(e) => updateFilters("category", e.target.value)}
          className="rounded-[1.25rem] border border-[var(--border-color)] bg-[var(--card-bg)] px-6 py-4 text-xs font-black uppercase tracking-widest outline-none transition-all hover:border-indigo-500/50 focus:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/5 cursor-pointer"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c === "all" ? "CATEGORY: ALL" : `CAT: ${c.toUpperCase()}`}
            </option>
          ))}
        </select>

        <select
          value={filters.sort}
          onChange={(e) => updateFilters("sort", e.target.value)}
          className="rounded-[1.25rem] border border-[var(--border-color)] bg-[var(--card-bg)] px-6 py-4 text-xs font-black uppercase tracking-widest outline-none transition-all hover:border-indigo-500/50 focus:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/5 cursor-pointer"
        >
          <option value="newest">SORT: NEWEST</option>
          <option value="oldest">SORT: OLDEST</option>
          <option value="highest">SORT: HIGHEST</option>
          <option value="lowest">SORT: LOWEST</option>
        </select>

        <Button onClick={resetFilters} variant="secondary" className="px-8 py-4 text-xs font-black uppercase tracking-widest border-indigo-500/20 bg-indigo-500/5 text-indigo-500 hover:bg-indigo-500 hover:text-white">
          RESET FILTERS
        </Button>
      </div>
    </div>
  );
}



