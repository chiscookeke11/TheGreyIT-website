"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

// 1. Define the shape of the context
type AppContextType = {
  activeNav: number | null;
  setActiveNav: React.Dispatch<React.SetStateAction<number | null>>;
};

// 2. Create the context
const AppContext = createContext<AppContextType | undefined>(undefined);

// 3. Provider component
export function AppProvider({ children }: { children: ReactNode }) {
  const [activeNav, setActiveNav] = useState<number | null>(0);

  return (
    <AppContext.Provider value={{ activeNav, setActiveNav }}>
      {children}
    </AppContext.Provider>
  );
}

// 4. Custom hook for consuming
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
