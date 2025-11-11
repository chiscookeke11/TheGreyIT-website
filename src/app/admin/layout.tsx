"use client"

import { useEffect, useRef, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import NavigationMenu from "@/components/admin/NavigationMenu"
import AuthModal from "@/components/UI/AuthModal"
import Spinner from "@/components/UI/Spinner"
import Image from "next/image"
import Link from "next/link"
import { User } from "@supabase/supabase-js"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const cachedUser = useRef<User | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [checkingAdmin, setCheckingAdmin] = useState(false)

  // ✅ stable auth initialization
  useEffect(() => {
    const initAuth = async () => {
      setLoading(true)
      const { data: { session } } = await supabase.auth.getSession()
      const currentUser = session?.user ?? null
      cachedUser.current = currentUser
      setUser(currentUser)
      setLoading(false)

      // listen for auth changes
      const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
        const updatedUser = session?.user ?? null
        cachedUser.current = updatedUser
        setUser(updatedUser)
      })

      return () => {
        listener.subscription.unsubscribe()
      }
    }

    initAuth()
  }, [])

  // ✅ check admin only when user changes
  useEffect(() => {
    if (!user) return
    setCheckingAdmin(true)

    const checkAdmin = async () => {
      const { data, error } = await supabase
        .from("admins")
        .select("*")
        .eq("user_id", user.id)
        .single()

      if (error) {
        setIsAdmin(false)
      } else {
        setIsAdmin(!!data)
      }
      setCheckingAdmin(false)
    }

    checkAdmin()
  }, [user?.id])

  if (loading || checkingAdmin) {
    return (
      <div className="w-full h-screen flex flex-col gap-3 items-center justify-center bg-white">
        <p className="text-xl font-poppins font-semibold">Checking authentication...</p>
        <Spinner />
      </div>
    )
  }

  if (!user) {
    return <div className="w-full min-h-screen flex items-center justify-center py-4 px-6 bg-[#f2f5fc]"><AuthModal /></div>
  }

  if (!isAdmin) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-white font-poppins">
        <h2 className="text-2xl font-semibold text-red-600 mb-2">Access Denied</h2>
        <p className="text-gray-600">You don’t have permission to access this page.</p>
      </div>
    )
  }

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
        <h2 className="text-lg font-semibold text-gray-700 flex-1">
          Welcome, <span className="font-normal text-sm md:text-base">{user.email}</span>
        </h2>

        <button
          onClick={async () => {
            const { error } = await supabase.auth.signOut()
            if (!error) setUser(null)
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
