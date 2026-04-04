import { useApp } from "../../context/AppContext";
import RoleSwitcher from "../common/RoleSwitcher";
import ThemeToggle from "../common/ThemeToggle";
import ExportButton from "../common/ExportButton";
import Button from "../ui/Button";
import HasPermission from "../common/HasPermission";

/**
 * Top navigation component providing access to global controls 
 * (Theme, Role, CSV Export) and the record creation trigger for Admins.
 */
export default function Navbar() {
  const { openAddForm, activeTab } = useApp();

  return (
    <header className="flex h-20 items-center justify-between border-b border-[var(--border-color)] bg-[var(--bg-primary)] px-4 lg:px-10 z-[40]">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-black capitalize tracking-tight lg:text-2xl">
          {activeTab}
        </h1>
        <div className="ml-2 h-1.5 w-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
      </div>

      <div className="flex items-center gap-3 md:gap-5">
        <ExportButton />
        <div className="hidden h-6 w-[1px] bg-[var(--border-color)] md:block" />
        <div className="flex items-center gap-3">
          <RoleSwitcher />
          <ThemeToggle />
          <HasPermission role="admin">
            <Button onClick={openAddForm} className="ml-2 hidden lg:flex items-center gap-2 animate-in slide-in-from-right-4">
              <span className="text-lg">＋</span> Record
            </Button>
          </HasPermission>
        </div>
      </div>
    </header>
  );
}