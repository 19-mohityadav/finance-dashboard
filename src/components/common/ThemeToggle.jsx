import { useApp } from "../../context/AppContext";

/**
 * Universal Theme Toggler (Dark/Light). Performs global state transition
 * and ensures visual consistency across all components.
 */
export default function ThemeToggle() {
  const { dark, setDark } = useApp();

  return (
    <button
      onClick={() => setDark(!dark)}
      className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-xl transition-all hover:bg-[var(--sidebar-hover)] active:scale-95 shadow-sm"
      aria-label="Toggle Theme"
    >
      {dark ? "🌙" : "☀️"}
    </button>
  );
}