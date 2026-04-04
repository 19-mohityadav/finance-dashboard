import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { getBalanceTrend } from "../../utils/helpers";
import Card from "../../components/ui/Card";

/**
 * Premium Custom Tooltip component for Recharts.
 */
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-3 shadow-2xl backdrop-blur-md">
        <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-60 mb-1">{label}</p>
        <p className="text-sm font-black text-indigo-500">
          ₹{payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

/**
 * Time-based trend visualization for overall financial balance.
 * Features a modern gradient line and custom glassmorphism readouts.
 */
export default function BalanceChart({ data }) {
  const chartData = getBalanceTrend(data);

  if (!chartData || chartData.length === 0) {
    return (
      <div className="flex h-[300px] w-full flex-col items-center justify-center text-center opacity-50">
        <span className="text-4xl mb-4 opacity-40">📉</span>
        <h3 className="text-lg font-bold">No trend data available</h3>
        <p className="mt-1 text-sm">Add transactions to generate balance history</p>
      </div>
    );
  }

  return (
    <div className="h-[300px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" opacity={0.05} />
          <XAxis 
            dataKey="date" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--text-secondary)", fontSize: 10, fontWeight: 700 }} 
            dy={15}
          />
          <YAxis 
            hide={true}
            domain={['auto', 'auto']}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="balance" 
            stroke="url(#lineGradient)" 
            strokeWidth={5} 
            dot={false}
            activeDot={{ r: 8, strokeWidth: 4, stroke: "white", fill: "#6366f1" }} 
            animationDuration={2000}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

