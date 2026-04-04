import SummaryCard from "./SummaryCard";
import { useApp } from "../../context/AppContext";
import { calculateSummary } from "../../utils/helpers";

export default function SummarySection() {
  const { transactions } = useApp();
  const { income, expense, balance } = calculateSummary(transactions);

  return (
    <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <SummaryCard 
        title="Total Balance" 
        value={balance.toLocaleString("en-IN")} 
        accent="text-blue-500 dark:text-blue-400 font-black" 
        icon="💰"
      />
      <SummaryCard 
        title="Total Income" 
        value={income.toLocaleString("en-IN")} 
        accent="text-emerald-500 dark:text-emerald-400 font-bold" 
        icon="📈"
      />
      <SummaryCard 
        title="Total Expenses" 
        value={expense.toLocaleString("en-IN")} 
        accent="text-rose-500 dark:text-rose-400 font-bold" 
        icon="📉"
      />
    </section>
  );
}