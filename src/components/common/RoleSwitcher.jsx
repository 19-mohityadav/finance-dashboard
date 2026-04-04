import { useApp } from "../../context/AppContext";

/**
 * Access Control Toggler allowing demonstration of Buyer vs Admin roles.
 * Affects permissions across transactions and creation forms.
 */
export default function RoleSwitcher() {
  const { role, setRole } = useApp();

  return (
    <div className="flex h-10 items-center justify-center rounded-xl bg-[var(--bg-primary)] px-4 py-2 border border-[var(--border-color)] shadow-sm transition-all hover:bg-[var(--sidebar-hover)] select-none">
      <span className="mr-3 text-xs font-black uppercase tracking-widest text-[var(--text-secondary)]">ROLE</span>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="cursor-pointer appearance-none bg-transparent text-sm font-bold uppercase tracking-tight text-[var(--text-primary)] outline-none"
      >
        <option value="viewer" className="dark:bg-[#1a1f2e] dark:text-white">Viewer</option>
        <option value="admin" className="dark:bg-[#1a1f2e] dark:text-white">Admin</option>
      </select>
      <span className="ml-1 text-[10px] opacity-40">▼</span>
    </div>
  );
}