import { useApp } from "../../context/AppContext";
import BalanceChart from "./BalanceChart";
import CategoryChart from "./CategoryChart";
import Card from "../../components/ui/Card";
import { getCategoryData } from "../../utils/helpers";

/**
 * Functional container for analytical visualizations. 
 * Groups overall balance trends and categorical spending breakdown.
 */
export default function ChartsSection() {
  const { transactions } = useApp();
  const categoryData = getCategoryData(transactions);

  return (
    <section className="grid gap-8 grid-cols-1 lg:grid-cols-[1.5fr_1fr]">
      <Card title="Financial Pulse" extra={<span className="text-xs font-black uppercase tracking-widest text-indigo-500">Live Trend</span>}>
        <BalanceChart data={transactions} />
      </Card>

      <Card title="Spending Breakdown" extra={<span className="text-xs font-black uppercase tracking-widest text-[#06b6d4]">Distributions</span>}>
        <CategoryChart data={categoryData} />
      </Card>
    </section>
  );
}
