"use client"

import NavigationMenu from "@/components/admin/NavigationMenu"
import AuthModal from "@/components/UI/AuthModal"
import Spinner from "@/components/UI/Spinner"
import { supabase } from "@/lib/supabaseClient"
import { User } from "@supabase/supabase-js"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [checkingAdmin, setCheckingAdmin] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      setLoading(true)
      const { data, error } = await supabase.auth.getUser()
      if (error) console.error("Auth check failed:", error.message)
      setUser(data.user ?? null)
      setLoading(false)
    }

    getUser()

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  //  Check if the user is in the admins table
  useEffect(() => {
    const checkAdmin = async () => {
      if (!user) return
      setCheckingAdmin(true)

      const { data, error } = await supabase
        .from("admins")
        .select("*")
        .eq("user_id", user.id)
        .single()

      if (error) {
        console.error("Error checking admin:", error.message)
        setIsAdmin(false)
      } else {
        setIsAdmin(!!data)
      }

      setCheckingAdmin(false)
    }

    checkAdmin()
  }, [user])

  // show loading while checking session or admin status
  if (loading || checkingAdmin) {
    return (
      <div className="w-full h-screen flex flex-col gap-3 items-center justify-center bg-white">
        <p className="text-xl font-poppins font-semibold">Checking authentication...</p>
        <Spinner />
      </div>
    )
  }

  // show login modal if user is not logged in
  if (!user) {
    return <div className=" w-full min-h-screen flex items-center justify-center py-4 px-6 bg-[#f2f5fc] " ><AuthModal /></div>
  }

  // deny access if user isn’t admin
  if (!isAdmin) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-white font-poppins ">
        <h2 className="text-2xl font-semibold text-red-600 mb-2">Access Denied</h2>
        <p className="text-gray-600">You don’t have permission to access this page.</p>
      </div>
    )
  }

  // Show admin layout
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
          Welcome, <span className="font-normal">{user.email}</span>
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



      <main className="flex-1">
        <NavigationMenu />
        {children}
      </main>
    </div>
  )
}
