"use client";
import { fetchAllCourses, fetchUserCertificates, fetchUserData, fetchUserTransactions } from "@/lib/appActions";
import { CertificatesDataType, CourseDataTypes, TransactionType, UserData } from "@/types/types";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";




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

  allCoursesData: CourseDataTypes[] | null;
  setAllCoursesData: React.Dispatch<React.SetStateAction<CourseDataTypes[] | null>>

  reloadUserData: () => Promise<void>;

  reloadTransactions: () => Promise<void>;

  reloadCertificates: () => Promise<void>;

  reloadCourses: () => Promise<void>;
};




// 2. Create the context
const AppContext = createContext<AppContextType | undefined>(undefined);




// 3. Provider component
export function AppProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [activeNav, setActiveNav] = useState<number | null>(0);
  const [transactionData, setTransactionData] = useState<TransactionType[] | null>(null)
  const [certificatesData, setCertificatesData] = useState<CertificatesDataType[] | null>(null)
  const [allCoursesData, setAllCoursesData] = useState<CourseDataTypes[] | null>(null)




  const reloadUserData = async () => {
    const result = await fetchUserData();
    setUserData(result);
  };

  const reloadTransactions = async () => {
    const result = await fetchUserTransactions();
    setTransactionData(result);
  };

  const reloadCourses = async () => {
    const result = await fetchAllCourses();
    setAllCoursesData(result);
  };

  const reloadCertificates = async () => {
    if (!userData?.list_completed_courses) return;
    const result = await fetchUserCertificates(userData.list_completed_courses);
    setCertificatesData(result);
  };

  // auto-run when user changes
  useEffect(() => {
    if (userData) reloadCertificates();
  }, [userData]);

  useEffect(() => {
    reloadCourses()
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
        setCertificatesData,
        allCoursesData,
        setAllCoursesData,
        reloadCertificates,
        reloadCourses,
        reloadTransactions,
        reloadUserData,
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
