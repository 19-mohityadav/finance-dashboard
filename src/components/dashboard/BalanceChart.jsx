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

export default function BalanceChart({ data }) {
  const chartData = getBalanceTrend(data);

  return (
    <div className="h-[320px]">
      <h3 className="mb-4 text-lg font-semibold">Balance Trend</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
          <XAxis dataKey="date" tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }} />
          <YAxis tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }} />
          <Tooltip />
          <Line type="monotone" dataKey="balance" stroke="#8b5cf6" strokeWidth={3} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}