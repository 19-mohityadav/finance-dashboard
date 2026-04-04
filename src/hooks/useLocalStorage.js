import { useEffect, useState, useCallback } from "react";


export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      if (saved !== null) {
        return JSON.parse(saved);
      }
    } catch (err) {
      console.warn(`[useLocalStorage] Corrupted state found for key: "${key}". Falling back to initial state.`, err);
    }
    return initialValue;
  });

  // Effect to sync state changes into LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error(`[useLocalStorage] Failed to persist key: "${key}".`, err);
    }
  }, [key, value]);

  // Reactive listener for Cross-Tab synchronization
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === key && event.newValue !== null) {
        try {
          const parsed = JSON.parse(event.newValue);
          setValue(parsed);
        } catch (err) {
          console.warn(`[useLocalStorage] Received malformed sync-event for key: "${key}".`, err);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key]);

  return [value, setValue];
}
