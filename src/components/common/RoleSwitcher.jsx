import { useApp } from "../../context/AppContext";

export default function RoleSwitcher() {
  const { role, setRole } = useApp();

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-white/60">Role</span>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none"
      >
        <option value="viewer">Viewer</option>
        <option value="admin">Admin</option>
      </select>
    </div>
  );
}