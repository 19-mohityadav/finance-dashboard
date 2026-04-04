import { useApp } from "../../context/AppContext";
import {
  getMonthlyComparison,
  getTopSpendingCategory,
} from "../../utils/helpers";

export default function Insights({ fullWidth }) {
  const { transactions } = useApp();

  if (!transactions.length) {
    return (
      <div className="card text-center p-12 opacity-50">
        <h2 className="text-xl font-bold">No insights yet</h2>
        <p className="mt-2">Start adding transactions to see AI-driven analysis</p>
      </div>
    );
  }

  const top = getTopSpendingCategory(transactions);
  const monthly = getMonthlyComparison(transactions);

  const insightCards = [
    {
      title: "Category Alert",
      message: `Highest spending is in ${top.category} for ₹${top.amount.toLocaleString("en-IN")}.`,
      icon: "🚨",
      color: "bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400",
      isPositive: false
    },
    {
      title: "Monthly Trend",
      message: `Spending for ${monthly.label} is ${monthly.change >= 0 ? "up" : "down"} by ${Math.abs(monthly.change).toFixed(1)}%.`,
      icon: monthly.change > 0 ? "📈" : "📉",
      color: monthly.change > 0 ? "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400" : "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
      isPositive: monthly.change <= 0
    }
  ];

  return (
    <div className={`space-y-6 ${fullWidth ? 'w-full' : ''}`}>
      {!fullWidth && <h2 className="text-xl font-extrabold tracking-tight">Daily Digest</h2>}
      
      <div className="space-y-4">
        {insightCards.map((insight, idx) => (
          <div key={idx} className="card relative transition-all hover:scale-[1.02] hover:border-blue-500/20 shadow-sm">
            <div className="flex gap-4">
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl ${insight.color} shadow-sm`}>
                {insight.icon}
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-[var(--text-primary)] leading-none">{insight.title}</h3>
                <p className="text-sm font-medium text-[var(--text-secondary)] leading-snug">
                  {insight.message}
                </p>
              </div>
            </div>
            {idx === 0 && (
              <div className="mt-4 border-t border-[var(--border-color)] pt-3">
                <button className="text-xs font-bold uppercase tracking-widest text-blue-500 hover:text-blue-600">
                  Analyze Breakout →
                </button>
              </div>
            )}
          </div>
        ))}

        <div className="card bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-none shadow-indigo-500/20 transition-all hover:shadow-indigo-500/40">
           <div className="flex items-center gap-3 mb-2">
             <span className="text-xl">✨</span>
             <h3 className="font-bold">Pro Tip</h3>
           </div>
           <p className="text-sm font-medium text-white/90">
             You could save up to <span className="font-black text-white decoration-amber-300 underline underline-offset-4">₹2,400</span> by switching to an annual plan for your streaming subscriptions.
           </p>
        </div>
      </div>
    </div>
  );
}