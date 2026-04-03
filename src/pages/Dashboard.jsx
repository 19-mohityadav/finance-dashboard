import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import SummarySection from "../components/dashboard/SummarySection";
import ChartsSection from "../components/dashboard/ChartsSection";
import FilterBar from "../components/transactions/FilterBar";
import TransactionList from "../components/transactions/TransactionList";
import Insights from "../components/insights/Insights";
import AddTransactionModal from "../components/transactions/AddTransactionModal";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Navbar />

        <main className="space-y-6 px-4 py-6 md:px-6">
          <SummarySection />
          <ChartsSection />

          <div className="grid gap-6 xl:grid-cols-[1.45fr_0.9fr]">
            <div className="space-y-6">
              <FilterBar />
              <TransactionList />
            </div>

            <div className="space-y-6">
              <Insights />
            </div>
          </div>
        </main>
      </div>

      <AddTransactionModal />
    </div>
  );
}