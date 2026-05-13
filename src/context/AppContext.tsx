"use client";
import { fetchAllCourses, fetchUserCertificates, fetchUserData, fetchUserTransactions } from "@/lib/appActions";
import { supabase } from "@/lib/supabaseClient";
import { CertificatesDataType, CourseDataTypes, TransactionType, UserData } from "@/types/types";
import { User } from "@supabase/supabase-js";
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

  showPaymentModal: boolean;
  setShowPaymentModal: React.Dispatch<React.SetStateAction<boolean>>

  selectedCourse: CourseDataTypes | null
  setSelectedCourse: React.Dispatch<React.SetStateAction<CourseDataTypes | null>>

  isEnrolled: boolean;
  setIsEnrolled: React.Dispatch<React.SetStateAction<boolean>>

  enrolledNumber: number | null
  setEnrolledNumber: React.Dispatch<React.SetStateAction<number | null>>

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
  const [user, setUser] = useState<User | null>(null)
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false)
  const [selectedCourse, setSelectedCourse] = useState<CourseDataTypes | null>(null)
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [enrolledNumber, setEnrolledNumber] = useState<number | null>(null)


  useEffect(() => {
    // check is the user is login in
    const getUser = async () => {

      const { data, error } = await supabase.auth.getUser()
      if (error && error.message !== "Auth session missing!") {
        console.error("Auth check failed:")
      }

      setUser(data.user ?? null)
    }
    getUser()

    // listen for state changes in the layout
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }

  }, [])



  const reloadUserData = async () => {

    if (user) {
      const result = await fetchUserData(user.id);
      setUserData(result);
    }
  };

  const reloadTransactions = async () => {
    if (user) {
      const result = await fetchUserTransactions(userData?.user_id ?? "");
      setTransactionData(result);
    }
  };

  const reloadCourses = async () => {
    const result = await fetchAllCourses();
    setAllCoursesData(result);
  };

  const reloadCertificates = async () => {

    if (user) {
      if (!userData?.list_completed_courses) return;

      const result = await fetchUserCertificates(userData.list_completed_courses, user.id);
      setCertificatesData(result);
    }
  };


  useEffect(() => {
    if (!user) return;
    reloadUserData();
  }, [user?.id]);


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
        setShowPaymentModal,
        showPaymentModal,
        selectedCourse,
        setSelectedCourse,
        isEnrolled,
        setIsEnrolled,
        enrolledNumber,
        setEnrolledNumber
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
