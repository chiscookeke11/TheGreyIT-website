"use client";

import Navbar from "@/components/UI/Navbar";
import LayoutHeader from "@/components/user/LayoutHeader";
import SelectPaymentModal from "@/components/user/selectPaymentModal";
import UserAuthModal from "@/components/user/UserAuthModal";
import { useAppContext } from "@/context/AppContext";
import { User } from "@supabase/supabase-js";
import Image from "next/image";
import { useEffect, useState } from "react";
import SideNav from "./SideNav";
import { supabase } from "@/lib/supabaseClient";
import { Spinner } from "../UI/Spinner";

export default function UserLayoutClient({ children }: {
    children: React.ReactNode;
}) {

    const [user, setUser] = useState<User | null>(null)
    const { reloadCertificates, reloadTransactions, showPaymentModal } = useAppContext();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // // check is the user is logged in
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
        return () => { authListener.subscription.unsubscribe() }
    }, [])



    useEffect(() => {
        if (user) {
            reloadCertificates();
            reloadTransactions();
        }
    }, [user]);


    if (loading) {
        return (
            <div className="w-full h-screen flex flex-col gap-3 items-center justify-center bg-white">
                <p className="text-xl font-poppins font-semibold">Checking authentication</p>
                <Spinner />
            </div>
        )
    }


    if (!user) {
        return (
            <main className="w-full h-screen flex items-center flex-col md:flex-row justify-center bg-[#f2f5fc]">

                <Image
                    src="/user/auth-image.jpg"
                    alt="Auth"
                    height={1000}
                    width={1000}
                    className="w-full h-full max-h-[200px] md:max-h-none object-cover md:max-w-[350px] lg:flex-1"
                />
                <UserAuthModal />
            </main>
        );
    }

    return (
        <div className="bg-[#FAFBFC] w-full h-full relative flex flex-col gap-8 text-black font-poppins px-[4%] py-32">
            <Navbar />
            <LayoutHeader user={user} />

            <main className="w-full h-full lg:h-screen flex flex-col md:flex-row gap-10 flex-1">
                <SideNav user={user} setUser={setUser} />
                <div className="w-full h-full overflow-y-auto">{children}</div>
            </main>

            {showPaymentModal && <SelectPaymentModal />}
        </div>
    );
}
