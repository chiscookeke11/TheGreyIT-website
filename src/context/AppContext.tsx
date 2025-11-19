"use client";
import { supabase } from "@/lib/supabaseClient";
import {  CertificatesDataType, TransactionType, UserData } from "@/types/types";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import toast from "react-hot-toast";



// 1. Define the shape of the context
type AppContextType = {
  activeNav: number | null;
  setActiveNav: React.Dispatch<React.SetStateAction<number | null>>;
  userData: UserData | null
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>
  transactionData: TransactionType[] | null
  setTransactionData: React.Dispatch<React.SetStateAction<TransactionType[] | null>>
  certificatesData: CertificatesDataType[] | null
  setCertificatesData: React.Dispatch<React.SetStateAction<CertificatesDataType[] | null>>
};




// 2. Create the context
const AppContext = createContext<AppContextType | undefined>(undefined);




// 3. Provider component
export function AppProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [activeNav, setActiveNav] = useState<number | null>(0);
  const [transactionData, setTransactionData] = useState<TransactionType[] | null>(null)
  const [certificatesData, setCertificatesData] = useState<CertificatesDataType[] | null>(null)





  // function to fetch userData
  const fetchUserData = async () => {
    const { data, error } = await supabase.from("user_data").select("*")


    if (error) {
      console.error("error fetching user data:", error)
    }

    else {
      setUserData(data[0] || null)
    }
  }


  // function to fetch user transactions
  const fetchUserTransactions = async () => {
    const { data, error } = await supabase.from("transactions").select("*")

    if (error) {
      console.error("Error fetching transactions", error)
    }

    else {
      setTransactionData(data)
    }
  }


  // function to fetch user's certificates
  const fetchUserCertifcates = async () => {
    const {data, error} = await supabase.from("certificates").select("*")

if (error) {
  console.error("Error fetching certificates", error)
}

else {
  setCertificatesData(data)
  console.log("The certificates:", data)
}
  }







  useEffect(() => {
    fetchUserTransactions()
    fetchUserData()
    fetchUserCertifcates()
  }, [])










  return (
    <AppContext.Provider
      value={{
        activeNav,
        setActiveNav,
        userData,
        setUserData,
        transactionData,
        setTransactionData,
        certificatesData,
        setCertificatesData
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
