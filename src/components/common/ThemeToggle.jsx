import { useApp } from "../../context/AppContext";

export default function ThemeToggle() {
  const { dark, setDark } = useApp();

  return (
    <button
      onClick={() => setDark(!dark)}
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] dark:bg-white/10 text-lg shadow-sm transition-all duration-300 hover:scale-110 hover:shadow-md active:scale-95"
      aria-label="Toggle Theme"
      title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {dark ? "☀️" : "🌙"}
    </button>
  );
}