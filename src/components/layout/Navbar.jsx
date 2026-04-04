import { useApp } from "../../context/AppContext";
import RoleSwitcher from "../common/RoleSwitcher";
import ThemeToggle from "../common/ThemeToggle";
import ExportButton from "../common/ExportButton";

export default function Navbar() {
  const { role, openAddForm, activeTab } = useApp();

  const getTitle = () => {
    switch (activeTab) {
      case "transactions": return "Transactions Listing";
      case "insights": return "Smart Insights";
      default: return "Finance Dashboard";
    }
  };

  const getSubtitle = () => {
    switch (activeTab) {
      case "transactions": return "Listing all financial records and spending";
      case "insights": return "Advanced spending intelligence and predictions";
      default: return "Track balance, spending, and transactions in one place";
    }
  };

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--border-color)] bg-[var(--bg-primary)]/80 backdrop-blur-xl transition-all duration-300">
      <div className="flex flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">
            <span className="gradient-text">{getTitle().split(' ')[0]}</span> {getTitle().split(' ').slice(1).join(' ')}
          </h1>
          <p className="text-sm font-medium text-[var(--text-secondary)]">
            {getSubtitle()}
          </p>
        </div>

        <div className="flex h-fit flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-2xl bg-[var(--bg-secondary)] p-1 border border-[var(--border-color)]">
             <RoleSwitcher />
             <ThemeToggle />
          </div>
          <div className="flex items-center gap-3">
            <ExportButton />
            {role === "admin" ? (
              <button onClick={openAddForm} className="btn-primary flex items-center gap-2">
                <span className="text-lg">+</span>
                <span>Add Transaction</span>
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}