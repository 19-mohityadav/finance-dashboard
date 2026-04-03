import { useApp } from "../../context/AppContext";

export default function ThemeToggle() {
  const { dark, setDark } = useApp();

  return (
    <button
      onClick={() => setDark(!dark)}
      className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm transition hover:bg-white/10"
    >
      {dark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}