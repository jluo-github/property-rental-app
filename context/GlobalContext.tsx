"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

const GlobalContext = createContext<any>(null);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [unreadCount, setUnreadCount] = useState<number>(0);

  return (
    <GlobalContext.Provider value={{ unreadCount, setUnreadCount }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  if (!GlobalContext) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return useContext(GlobalContext);
};
