import { useApp } from "./context/AppContext";
import Dashboard from "./pages/Dashboard";

function App() {
  const { dark } = useApp();

  return (
    <div
      className={
        dark
          ? "min-h-screen bg-[#0B0F19] text-white transition-colors duration-300"
          : "min-h-screen bg-slate-100 text-slate-900 transition-colors duration-300"
      }
    >
      <Dashboard />
    </div>
  );
}

export default App;