import BalanceChart from "./BalanceChart";
import CategoryChart from "./CategoryChart";
import { useApp } from "../../context/AppContext";
import { getCategoryData } from "../../utils/helpers";

export default function ChartsSection() {
  const { transactions } = useApp();
  const categoryData = getCategoryData(transactions);

  return (
    <section className="grid gap-6 lg:grid-cols-2">
      <div className="card transition-all duration-300 hover:shadow-lg dark:border-white/5">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-bold tracking-tight">Financial Overview</h3>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600 dark:bg-blue-500/10">30 Days</span>
        </div>
        <BalanceChart data={transactions} />
      </div>
      <div className="card transition-all duration-300 hover:shadow-lg dark:border-white/5">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-bold tracking-tight">Spending by Category</h3>
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600 dark:bg-indigo-500/10">All-time</span>
        </div>
        <CategoryChart data={categoryData} />
      </div>
    </section>
  );
}