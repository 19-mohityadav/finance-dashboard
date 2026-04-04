import { useApp } from "../context/AppContext";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import SummarySection from "../features/dashboard/SummarySection";
import ChartsSection from "../features/dashboard/ChartsSection";
import TransactionTable from "../features/transactions/TransactionTable";
import FilterBar from "../features/transactions/FilterBar";
import AddTransactionModal from "../features/transactions/AddTransactionModal";
import Insights from "../features/insights/Insights";


export default function Dashboard() {
  const { activeTab, setActiveTab, isLoading } = useApp();

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden bg-[var(--bg-secondary)]">
        <Navbar />

        <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 lg:p-8">
          <div className="mx-auto max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            {isLoading ? (
              <div className="space-y-8">
                <div className="grid gap-6 md:grid-cols-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-44 w-full animate-pulse rounded-[2rem] bg-[var(--card-bg)] opacity-40" />
                  ))}
                </div>
                <div className="h-[400px] w-full animate-pulse rounded-[2rem] bg-[var(--card-bg)] opacity-40" />
              </div>
            ) : (
              <>
                {activeTab === "overview" && (
              <div className="space-y-8 pb-10">
                <SummarySection />
                <ChartsSection />
                <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4">
                      <h2 className="text-xl font-black tracking-tight text-[var(--text-primary)]">
                        Recent Activity
                      </h2>
                      <button 
                        onClick={() => setActiveTab("transactions")}
                        className="text-sm font-bold text-indigo-500 hover:text-indigo-600 transition-colors"
                      >
                        View All →
                      </button>
                    </div>
                    <TransactionTable limit={5} />
                  </div>
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold tracking-tight">Intelligence Feed</h2>
                    <Insights />
                  </div>
                </div>
              </div>
            )}

            {/* Transactions Tab: Advanced Multi-Filter Ledger Management */}
            {activeTab === "transactions" && (
              <div className="space-y-8 pb-10">
                <FilterBar />
                <TransactionTable />
              </div>
            )}

                {activeTab === "insights" && (
                  <div className="grid gap-8 lg:grid-cols-2">
                    <Insights />
                    <ChartsSection />
                  </div>
                )}
              </>
            )}
          </div>

        </main>
      </div>

      <AddTransactionModal />
    </div>
  );
}