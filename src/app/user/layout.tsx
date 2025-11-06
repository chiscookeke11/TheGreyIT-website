"use client"

import Spinner from "@/components/UI/Spinner"
import UserAuthModal from "@/components/user/UserAuthModal"
import { supabase } from "@/lib/supabaseClient"
import { User } from "@supabase/supabase-js"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"








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



    // check if the user is in the students table







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
        return <main className="w-full min-h-screen flex items-center justify-center py-4 px-6" ><UserAuthModal /></main>
    }



    // deny access if user isn’t admin
    //   if (!isAdmin) {
    //     return (
    //       <div className="w-full h-screen flex flex-col items-center justify-center bg-white font-poppins ">
    //         <h2 className="text-2xl font-semibold text-red-600 mb-2">Access Denied</h2>
    //         <p className="text-gray-600">You don’t have permission to access this page.</p>
    //       </div>
    //     )
    //   }


    return (

        <div className="min-h-screen bg-white flex flex-col font-poppins">
            <nav className="p-5">
                <Link href={"/"}>
                    <Image
                        src={"/logos/THEGREYAElogoBlack.png"}
                        width={180}
                        height={180}
                        alt="TheGreyIT-logo"
                        className="object-center w-[100px]"
                    />
                </Link>
            </nav>

            <header className="w-full flex items-center justify-between px-6 py-4 bg-gray-100 border-b border-[#008CC1]/20">
                <h2 className="text-lg font-semibold text-gray-700">
                    Welcome, <span className="font-normal">{user.user_metadata.first_name.charAt(0).toUpperCase() + user.user_metadata.first_name.slice(1).toLowerCase()}</span>
                </h2>

                <button
                    onClick={async () => {
                        const { error } = await supabase.auth.signOut()
                        if (error) console.error("Sign-out error:", error.message)
                        else setUser(null)
                    }}
                    className="bg-gray-700 text-white px-5 py-2 rounded-md hover:bg-gray-500 transition-all cursor-pointer"
                >
                    Sign Out
                </button>
            </header>
            <main>
                {children}
            </main>
        </div>
    )
}


