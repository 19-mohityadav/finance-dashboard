import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import SummarySection from "../components/dashboard/SummarySection";
import ChartsSection from "../components/dashboard/ChartsSection";
import FilterBar from "../components/transactions/FilterBar";
import TransactionList from "../components/transactions/TransactionList";
import Insights from "../components/insights/Insights";
import AddTransactionModal from "../components/transactions/AddTransactionModal";
import { useApp } from "../context/AppContext";

export default function Dashboard() {
  const { activeTab } = useApp();

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden bg-[var(--bg-secondary)]">
        <Navbar />

        <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 lg:p-8">
          <div className="mx-auto max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            {activeTab === "overview" && (
              <div className="space-y-8 pb-10">
                <SummarySection />
                <ChartsSection />
                <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold tracking-tight">Recent Activity</h2>
                    </div>
                    <div className="space-y-6">
                      <FilterBar />
                      <TransactionList limit={5} />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold tracking-tight">Smart AI Insights</h2>
                    <Insights />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "transactions" && (
              <div className="space-y-8 pb-10">
                <div className="flex flex-col gap-2">
                  <h2 className="text-3xl font-bold tracking-tight">Transaction History</h2>
                  <p className="text-[var(--text-secondary)]">Manage and filter your financial records</p>
                </div>
                <div className="space-y-6">
                  <FilterBar />
                  <TransactionList />
                </div>
              </div>
            )}

            {activeTab === "insights" && (
              <div className="space-y-8 pb-10">
                <div className="flex flex-col gap-2">
                  <h2 className="text-3xl font-bold tracking-tight">Financial Intelligence</h2>
                  <p className="text-[var(--text-secondary)]">AI-driven patterns and recommendations</p>
                </div>
                <div className="grid gap-8 lg:grid-cols-2">
                  <Insights fullWidth />
                  <div className="card space-y-4">
                    <h3 className="text-lg font-semibold">Spending Trends</h3>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Your fixed expenses have increased by 12% since last month. Consider reviewing your subscriptions.
                    </p>
                    <div className="h-32 w-full rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-white/5 dark:to-white/10" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      <AddTransactionModal />
    </div>
  );
}