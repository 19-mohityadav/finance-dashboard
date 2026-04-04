import { useMemo, useState, useEffect, useCallback } from "react";
import useLocalStorage from "./useLocalStorage";
import { initialTransactions } from "../constants/initialData";
import { STORAGE_KEYS, DEFAULT_FILTERS, ROLES } from "../constants/appConstants";
import { getFilteredTransactions, calculateSummary, getMonthlyComparison } from "../utils/helpers";


export default function useFinance() {
  const [transactions, setTransactions] = useLocalStorage(STORAGE_KEYS.TRANSACTIONS, initialTransactions);
  const [dark, setDark] = useLocalStorage(STORAGE_KEYS.DARK_MODE, true);
  const [role, setRole] = useState(ROLES.VIEWER);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredTransactions = useMemo(() => 
    getFilteredTransactions(transactions, filters), 
  [transactions, filters]);

  const summary = useMemo(() => 
    calculateSummary(transactions), 
  [transactions]);


  const monthlyTrends = useMemo(() => 
    getMonthlyComparison(transactions), 
  [transactions]);


  const addTransaction = useCallback((transaction) => {
    setTransactions((prev) => [transaction, ...prev]);
  }, [setTransactions]);

  const updateTransaction = useCallback((updatedTransaction) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === updatedTransaction.id ? updatedTransaction : t))
    );
  }, [setTransactions]);

  const deleteTransaction = useCallback((id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }, [setTransactions]);

  const openAddForm = useCallback(() => {
    setEditingTransaction(null);
    setIsFormOpen(true);
  }, []);

  const openEditForm = useCallback((transaction) => {
    setEditingTransaction(transaction);
    setIsFormOpen(true);
  }, []);

  const closeForm = useCallback(() => {
    setEditingTransaction(null);
    setIsFormOpen(false);
  }, []);

  const clearAllData = useCallback(() => {
    setTransactions([]);
  }, [setTransactions]);

  return {
    isLoading,
    transactions,
    filteredTransactions,
    summary,
    monthlyTrends,
    role,
    setRole,
    filters,
    setFilters,
    dark,
    setDark,
    isFormOpen,
    editingTransaction,
    activeTab,
    setActiveTab,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    openAddForm,
    openEditForm,
    closeForm,
    clearAllData,
  };
}

