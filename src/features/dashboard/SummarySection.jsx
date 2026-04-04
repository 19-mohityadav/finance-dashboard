import { useApp } from "../../context/AppContext";
import SummaryCard from "./SummaryCard";

/**
 * Section grouping primary financial KPIs. Automatically recalculates 
 * when the underlying transaction data changes.
 */
export default function SummarySection() {
  const { summary, monthlyTrends } = useApp();

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <SummaryCard
        title="Total Balance"
        value={summary.balance}
        icon="💰"
        change={monthlyTrends.changes.balance}
        isTrendUp={true}
      />
      <SummaryCard
        title="Total Income"
        value={summary.income}
        icon="📈"
        change={monthlyTrends.changes.income}
        isTrendUp={true} 
      />
      <SummaryCard
        title="Total Expenses"
        value={summary.expense}
        icon="📉"
        change={monthlyTrends.changes.expense}
        isTrendUp={false} 
      />
    </div>
  );
}
