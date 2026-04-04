import { useApp } from "../../context/AppContext";
import Card from "../../components/ui/Card";
import { getCategoryInsights } from "../../utils/helpers";

/**
 * Intelligent insight generation based on actual transaction patterns.
 * Identifies high-spending categories and provides strategy tips.
 */
export default function Insights() {
  const { transactions, monthlyTrends, summary } = useApp();
  const categoryInsights = getCategoryInsights(transactions);

  if (!transactions.length) {
    return (
      <Card className="text-center p-12 opacity-50 flex flex-col items-center justify-center gap-4">
        <span className="text-4xl opacity-30">🔍</span>
        <h3 className="font-bold">Analyzing Patterns...</h3>
        <p className="text-sm">Wait as your financial history builds up.</p>
      </Card>
    );
  }

  // Generate top category
  const topCategoryData = categoryInsights.length 
    ? [...categoryInsights].sort((a, b) => b.current - a.current)[0]
    : null;

  // Filter for significant changes (>10%)
  const significantChanges = categoryInsights
    .filter(i => Math.abs(i.percent) > 10)
    .sort((a, b) => Math.abs(b.percent) - Math.abs(a.percent))
    .slice(0, 2);

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Highest Spending Category Card */}
      {topCategoryData && (
        <Card className="hover:scale-[1.02] transition-all border-l-[6px] border-rose-500 bg-rose-500/[0.02]">
           <div className="flex items-start justify-between">
             <div className="flex items-center gap-3 mb-4">
               <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-xl backdrop-blur-sm">🔥</div>
               <h3 className="font-black text-lg">Top Category</h3>
             </div>
             <span className="text-[10px] font-black uppercase text-rose-500 tracking-widest px-3 py-1 bg-rose-500/10 rounded-full">Primary</span>
           </div>
           <p className="text-sm font-bold text-[var(--text-secondary)] opacity-80 leading-relaxed mb-4">
             You spent <span className="text-rose-500 font-black">₹{topCategoryData.current.toLocaleString()}</span> on <span className="font-black">{topCategoryData.category}</span> this month.
           </p>
           <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--bg-secondary)] shadow-inner">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-rose-400 to-rose-600 transition-all duration-1000 shadow-[0_0_12px_rgba(244,63,94,0.3)]" 
                style={{ width: `${Math.min(100, (topCategoryData.current / summary.expense) * 100)}%` }}
              />
           </div>
        </Card>
      )}

      {/* 2. Monthly Evolution / Observations */}
      <Card className="hover:shadow-indigo-500/5 transition-all">
         <div className="flex items-center gap-3 mb-5 border-b border-[var(--border-color)] pb-3">
           <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-xl backdrop-blur-sm">💡</div>
           <h3 className="font-black text-lg">Smart observations</h3>
         </div>
         
         <div className="space-y-4">
            {significantChanges.length > 0 ? (
               significantChanges.map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-1.5 animate-in slide-in-from-left-4 duration-500" style={{ animationDelay: `${idx * 150}ms` }}>
                    <div className="flex items-center justify-between">
                       <span className="text-sm font-bold text-[var(--text-primary)]">{item.category}</span>
                       <span className={`text-xs font-black px-2 py-0.5 rounded-lg border ${
                         item.percent > 0 ? "bg-rose-500/10 text-rose-600 border-rose-500/10" : "bg-emerald-500/10 text-emerald-600 border-emerald-500/10"
                       }`}>
                         {item.percent > 0 ? "+" : ""}{item.percent.toFixed(0)}%
                       </span>
                    </div>
                    <p className="text-xs font-semibold text-[var(--text-secondary)] leading-relaxed opacity-70">
                       Spending on {item.category} has {item.percent > 0 ? "increased" : "dropped"} by ₹{Math.abs(item.diff).toLocaleString()} compared to {monthlyTrends.previous.balance === 0 ? "initial tracking" : "last month"}.
                    </p>
                  </div>
               ))
            ) : (
               <p className="text-xs font-bold text-[var(--text-secondary)] opacity-50 italic">Maintain tracking to unlock deep movement analysis.</p>
            )}
         </div>
      </Card>

      {/* 3. Static High-Value Pro Tip */}
      <Card className="!bg-indigo-600 text-white border-none shadow-xl shadow-indigo-500/30 transition-all hover:scale-[1.02] relative overflow-hidden group">
         <div className="relative z-10">
           <div className="flex items-center gap-3 mb-3">
             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-xl backdrop-blur-sm">⚡</div>
             <h3 className="font-black text-lg">Savings Goal</h3>
           </div>
           <p className="text-sm font-bold text-white/90 leading-relaxed">
             Automate a transfer of <span className="font-black text-amber-300">₹5,000</span> to your SIP today to reach your 2026 milestone.
           </p>
         </div>
         <div className="absolute right-[-20px] bottom-[-20px] h-32 w-32 rounded-full bg-white/10 blur-3xl group-hover:scale-125 transition-transform" />
      </Card>
    </div>
  );
}

