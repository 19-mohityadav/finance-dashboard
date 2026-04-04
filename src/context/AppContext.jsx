import { createContext, useContext } from "react";
import useFinance from "../hooks/useFinance";

const AppContext = createContext();

/**
 * Clean data provider that delegates all complex state logic to custom hooks,
 * making it easy to test and maintain without clutter.
 */
export const AppProvider = ({ children }) => {
  const finance = useFinance();

  return (
    <AppContext.Provider value={finance}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);