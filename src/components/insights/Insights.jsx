import { useApp } from "../../context/AppContext";
import {
  getMonthlyComparison,
  getTopSpendingCategory,
} from "../../utils/helpers";

export default function Insights() {
  const { transactions } = useApp();

  if (!transactions.length) {
    return (
      <div className="glass p-5">
        <h2 className="text-xl font-semibold">Insights</h2>
        <p className="mt-2 text-white/50">No data available yet</p>
      </div>
    );
  }

  const top = getTopSpendingCategory(transactions);
  const monthly = getMonthlyComparison(transactions);

  return (
    <div className="glass p-5">
      <h2 className="text-xl font-semibold">Insights</h2>

      <div className="mt-4 space-y-4 text-sm text-white/75">
        <p>
          Highest spending category:{" "}
          <span className="gradient-text font-semibold">{top.category}</span>{" "}
          with ₹{top.amount.toLocaleString("en-IN")}
        </p>
        <p>
          Monthly expense comparison for {monthly.label}:{" "}
          <span className="font-semibold">
            {monthly.change >= 0 ? "+" : ""}
            {monthly.change.toFixed(1)}%
          </span>
        </p>
        <p className="text-white/60">
          {monthly.change > 0
            ? "Your expenses went up compared to the previous month."
            : "Your expenses are under control compared to the previous month."}
        </p>
      </div>
    </div>
  );
}