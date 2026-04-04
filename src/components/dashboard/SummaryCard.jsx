export default function SummaryCard({ title, value, accent, icon }) {
  return (
    <div className="card group relative overflow-hidden transition-all duration-500 hover:scale-[1.02]">
      <div className="absolute -right-4 -top-4 text-4xl opacity-[0.03] transition-all duration-300 group-hover:scale-150 group-hover:opacity-10">
        {icon}
      </div>
      <div className="relative z-10 flex flex-col gap-1">
        <p className="text-sm font-semibold tracking-wide text-[var(--text-secondary)] uppercase">
          {title}
        </p>
        <div className="flex items-baseline gap-1 mt-2">
           <span className="text-lg font-medium text-[var(--text-secondary)]">₹</span>
           <h2 className={`text-4xl font-black tracking-tight ${accent || ""}`}>
             {value}
           </h2>
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs font-medium text-emerald-500">
           <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10">↑</span>
           <span>+12.5% from last month</span>
        </div>
      </div>
    </div>
  );
}