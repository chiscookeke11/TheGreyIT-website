"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";
import { useAppContext } from "@/context/AppContext";
import Navbar from "@/components/UI/Navbar";
import LayoutHeader from "@/components/user/LayoutHeader";
import SideNav from "./SideNav";
import SelectPaymentModal from "@/components/user/selectPaymentModal";
import { Spinner } from "../UI/Spinner";

export default function UserLayoutClient({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { reloadCertificates, reloadTransactions, showPaymentModal } = useAppContext();

    // Fetch the current user
    useEffect(() => {
        const getUser = async () => {
            setLoading(true);
            const { data, error } = await supabase.auth.getUser();
            if (error && error.message !== "Auth session missing!") console.error(error);
            setUser(data.user ?? null);
            setLoading(false);
        };
        getUser();

        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => authListener.subscription.unsubscribe();
    }, []);

    // Reload certificates & transactions when user changes
    useEffect(() => {
        if (user) {
            reloadCertificates();
            reloadTransactions();
        }
    }, [user]);


    useEffect(() => {
        if (!loading && !user) {
            router.replace("/sign-in");
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="w-full h-screen flex flex-col gap-3 items-center justify-center bg-white">
                <p className="text-xl font-poppins font-semibold">Checking authentication</p>
                <Spinner />
            </div>
        );
    }

    if (!user) {
        return null;
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
