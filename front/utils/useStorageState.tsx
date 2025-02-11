import { useState, useEffect } from "react";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

export function useStorageState(key: string) {
  const [state, setState] = useState<string | null>(null);

  useEffect(() => {
    async function loadStorage() {
      try {
        if (Platform.OS === "web") {
          if (typeof localStorage !== "undefined") { setState(localStorage.getItem(key)); }
        } else {
          const value = await SecureStore.getItemAsync(key);
          setState(value);
        }
      } catch (e) { console.error("Error loading storage:", e); }
    }

    loadStorage();
  }, [key]);

  const setStoredState = async (newValue: string | null | ((prev: string | null) => string | null)) => {
    try {
      setState((prev) => {
        const resolvedValue = typeof newValue === "function" ? (newValue as Function)(prev) : newValue;

        if (Platform.OS === "web") {
          if (typeof localStorage !== "undefined") {
            if (resolvedValue === null) { localStorage.removeItem(key);} 
            else { localStorage.setItem(key, resolvedValue); }
          }
        } else {
          if (resolvedValue === null) { SecureStore.deleteItemAsync(key); } 
          else { SecureStore.setItemAsync(key, resolvedValue); }
        }

        return resolvedValue;
      });
    } catch (e) { console.error("Error saving storage:", e); }
  };

  return [state, setStoredState] as const;
}
