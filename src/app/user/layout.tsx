"use client"

import Spinner from "@/components/UI/Spinner"
import SideNav from "@/components/user/SideNav"
import UserAuthModal from "@/components/user/UserAuthModal"
import { supabase } from "@/lib/supabaseClient"
import { User } from "@supabase/supabase-js"
import {  useEffect, useState } from "react"





const Header = ({ user }: { user: User }) => {
    return (
        <header className="w-full flex items-center justify-between px-6 py-4 bg-[#f2f5fc] border-b border-[#008CC1]/20">
            <h2 className="text-lg font-semibold text-gray-700 flex-1">
                Welcome, <span className="font-normal text-sm md:text-base">{ user.user_metadata.first_name ?  user.user_metadata.first_name.charAt(0).toUpperCase() + user.user_metadata.first_name.slice(1).toLowerCase() : user.email}</span>
            </h2>

        </header>
    )
}





export default function UserDashboardLayout({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [checkingUser, setCheckingUser] = useState(false)





    useEffect(() => {


        // check is the user is login in
        const getUser = async () => {

            setLoading(true)
            const { data, error } = await supabase.auth.getUser()
            if (error) {
                console.error("Auth check failed:", error.message)
            }

            setUser(data.user ?? null)
            setLoading(false)

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










    if (loading || checkingUser) {
        return (
            <div className="w-full h-screen flex flex-col gap-3 items-center justify-center bg-white">
                <p className="text-xl font-poppins font-semibold">Checking authentication...</p>
                <Spinner />
            </div>
        )
    }




    // show login modal if user is not logged in
    if (!user) {
        return <main className="w-full min-h-screen flex items-center justify-center py-4 px-6 bg-[#f2f5fc]" ><UserAuthModal /></main>
    }






    return (


        <div className=" bg-[#FAFBFC] w-full h-full relative flex items-start text-black font-poppins " >
            <SideNav setUser={setUser} />




            <main className="h-screen   w-full relative flex flex-col items-start flex-1  " >
                <Header user={user}  />
                <div className="w-full h-fit overflow-y-auto " >
                    {children}
                </div>
            </main>

        </div>

    )
}


