import BalanceChart from "./BalanceChart";
import CategoryChart from "./CategoryChart";
import { useApp } from "../../context/AppContext";
import { getCategoryData } from "../../utils/helpers";

export default function ChartsSection() {
  const { transactions } = useApp();
  const categoryData = getCategoryData(transactions);

  return (
    <section className="grid gap-4 lg:grid-cols-2">
      <div className="glass p-5">
        <BalanceChart data={transactions} />
      </div>
      <div className="glass p-5">
        <CategoryChart data={categoryData} />
      </div>
    </section>
  );
}