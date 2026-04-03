import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [transactions, setTransactions] = useState([]);
    const [role, setRole] = useState("viewer");

    return (
        <AppContext.Provider
            value={{
                transactions,
                setTransactions,
                role,
                setRole,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);