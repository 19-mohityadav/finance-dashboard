import { useApp } from "./context/AppContext";
import Dashboard from "./pages/Dashboard";

function App() {
  const { dark } = useApp();

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
        <Dashboard />
      </div>
    </div>
  );
}

export default App;