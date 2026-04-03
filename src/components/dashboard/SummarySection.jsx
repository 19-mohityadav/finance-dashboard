import SummaryCard from "./SummaryCard";
import { useApp } from "../../context/AppContext";
import { calculateSummary } from "../../utils/helpers";

export default function SummarySection() {
  const { transactions } = useApp();
  const { income, expense, balance } = calculateSummary(transactions);

  return (
    <section className="grid gap-4 md:grid-cols-3">
      <SummaryCard title="Total Balance" value={balance.toLocaleString("en-IN")} accent="gradient-text" />
      <SummaryCard title="Income" value={income.toLocaleString("en-IN")} accent="text-emerald-400" />
      <SummaryCard title="Expenses" value={expense.toLocaleString("en-IN")} accent="text-rose-400" />
    </section>
  );
}