"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { getUnreadMsgCount } from "@/app/actions/getUnreadMsgCount";
import { useSession } from "next-auth/react";

const GlobalContext = createContext<any>(null);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [unreadCount, setUnreadCount] = useState<number>(0);

  const { data: session } = useSession();

  useEffect(() => {
    if (session && session.user) {
      // get unread messages count
      getUnreadMsgCount()
        .then((result) => {
          if (result && "count" in result) setUnreadCount(result.count);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [unreadCount, session]);

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
