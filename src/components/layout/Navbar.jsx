import { useApp } from "../../context/AppContext";
import RoleSwitcher from "../common/RoleSwitcher";
import ThemeToggle from "../common/ThemeToggle";
import ExportButton from "../common/ExportButton";

export default function Navbar() {
  const { role, openAddForm } = useApp();

  return (
    <header className="sticky top-0 z-20 border-b border-white/5 bg-[#0b0f19]/80 backdrop-blur">
      <div className="flex flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">
            <span className="gradient-text">Finance</span> Dashboard
          </h1>
          <p className="mt-1 text-sm text-white/60">
            Track balance, spending, and transactions in one place
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <RoleSwitcher />
          <ThemeToggle />
          <ExportButton />
          {role === "admin" ? (
            <button onClick={openAddForm} className="btn-primary">
              Add Transaction
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
}