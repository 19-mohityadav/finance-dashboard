import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell, Sector } from "recharts";

const COLORS = ["#6366f1", "#06b6d4", "#10b981", "#f59e0b", "#f43f5e", "#ec4899"];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-3 shadow-2xl backdrop-blur-md">
        <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-60 mb-1">
          {payload[0].name}
        </p>
        <p className="text-sm font-black text-indigo-500">
          ₹{payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

/**
 * Categorical Spending visualization displaying proportional distribution 
 * of expenses across categories. Includes a detailed written legend.
 */
export default function CategoryChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center opacity-50">
        <span className="text-4xl mb-4 opacity-40">📊</span>
        <h3 className="text-lg font-bold">No categorical data yet</h3>
        <p className="mt-1 text-sm">Add some expenses to see a breakdown</p>
      </div>
    );
  }

  const total = data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="flex flex-col">
      <div className="h-[280px] w-full relative">
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
           <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)] opacity-50">Total</span>
           <span className="text-2xl font-black tracking-tight">₹{total.toLocaleString()}</span>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie 
              data={data} 
              dataKey="value" 
              nameKey="name" 
              innerRadius={80} 
              outerRadius={110}
              paddingAngle={4}
              stroke="transparent"
              animationBegin={0}
              animationDuration={1500}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>


      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-2 text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
           <span>Category</span>
           <div className="flex gap-12">
             <span>Amount</span>
             <span className="w-12 text-right">%</span>
           </div>
        </div>
        <div className="grid gap-3">
          {data.map((entry, index) => {
            const percentage = ((entry.value / total) * 100).toFixed(1);
            return (
              <div key={entry.name} className="flex items-center justify-between text-sm group">
                <div className="flex items-center gap-3">
                  <div 
                    className="h-2.5 w-2.5 rounded-full ring-2 ring-white dark:ring-black" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }} 
                  />
                  <span className="font-medium text-[var(--text-primary)] group-hover:text-indigo-500 transition-colors">
                    {entry.name}
                  </span>
                </div>
                <div className="flex items-center gap-8">
                  <span className="font-mono font-semibold">₹{entry.value.toLocaleString()}</span>
                  <span className="w-12 text-right font-medium text-[var(--text-secondary)]">{percentage}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
