"use client";
import { supabase } from "@/lib/supabaseClient";
import { UserData } from "@/types/types";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import toast from "react-hot-toast";



// 1. Define the shape of the context
type AppContextType = {
  activeNav: number | null;
  setActiveNav: React.Dispatch<React.SetStateAction<number | null>>;
  userData: UserData | null
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>
};




// 2. Create the context
const AppContext = createContext<AppContextType | undefined>(undefined);




// 3. Provider component
export function AppProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [activeNav, setActiveNav] = useState<number | null>(0);




  const fetchUserData = async () => {
    const { data, error } = await supabase.from("user_data").select("*")


    if (error) {
      console.error("error fetching user data:", error)
    }

    else {
      toast.success("Fetched")
      console.log(data)
      setUserData(data[0] || null)
    }
  }


  useEffect(() => {

    fetchUserData()
  }, [])




  return (
    <AppContext.Provider
      value={{
        activeNav,
        setActiveNav,
        userData,
        setUserData,

      }}>

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
