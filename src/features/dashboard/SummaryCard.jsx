import { memo } from "react";
import Card from "../../components/ui/Card";

/**
 * Domain-specific Card displaying financial statistics with indicators for 
 * monthly percentage changes. High-contrast typography and glassmorphic icons.
 * Optimized with React.memo for high-performance dashboard refreshes.
 */
const SummaryCard = memo(function SummaryCard({ title, value, icon, change, isTrendUp }) {
  const isNeutral = change === undefined || change === 0;
  const isHealthy = isTrendUp ? change >= 0 : change <= 0;

  return (
    <Card className="flex flex-col gap-10 p-9 relative overflow-hidden group border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(99,102,241,0.1)] transition-all duration-700 bg-[var(--card-bg)] cursor-default">
      <div className="flex items-start justify-between z-10">
        <div className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-sm 
          ${title.includes('Income') ? 'bg-emerald-500/10 text-emerald-500' : title.includes('Expense') ? 'bg-rose-500/10 text-rose-500' : 'bg-indigo-500/10 text-indigo-500'}`}>
          {icon}
        </div>
        
        {!isNeutral && (
          <div className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-[10px] font-black uppercase tracking-widest border transition-all duration-500 ${
            isHealthy 
              ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/10" 
              : "bg-rose-500/10 text-rose-600 border-rose-500/10"
          }`}>
             <span className="text-[12px]">{change > 0 ? "▴" : "▾"}</span>
             {Math.abs(change.toFixed(1))}%
          </div>
        )}
      </div>

      <div className="z-10">
        <div className="flex items-center gap-3 mb-3">
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--text-secondary)] opacity-40">
            {title}
          </p>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-[var(--border-color)] to-transparent opacity-40" />
        </div>
        
        <div className="flex items-baseline gap-1">
          <span className="text-xl font-medium text-[var(--text-secondary)] opacity-40">₹</span>
          <h3 className="text-4xl font-black tracking-tighter text-slate-800 dark:text-white leading-none">
            {value.toLocaleString()}
          </h3>
        </div>

        <p className="mt-8 text-[9px] font-black text-[var(--text-secondary)] opacity-30 uppercase tracking-[0.2em] flex items-center gap-2">
           <span className="h-1 w-1 rounded-full bg-indigo-500" />
           Periodic Analysis
        </p>
      </div>
      
      {/* Premium Gradient Backgrounds */}
      <div className={`absolute -top-24 -right-24 h-64 w-64 rounded-full blur-[100px] opacity-[0.08] transition-all duration-1000 group-hover:opacity-[0.15]
        ${title.includes('Income') ? 'bg-emerald-400' : title.includes('Expense') ? 'bg-rose-400' : 'bg-indigo-400'}`} 
      />
    </Card>
  );
});


export default SummaryCard;


