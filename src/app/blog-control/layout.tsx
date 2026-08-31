"use client"

import { Spinner } from "@/components/UI/Spinner";
import { supabase } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";



export default function BlogControlLayout({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();


    // Fetch the current user
    useEffect(() => {
        const getUser = async () => {
            setLoading(true);
            const { data, error } = await supabase.auth.getUser();
            if (error && error.message !== "Auth session missing!") console.error("Failed");
            setUser(data.user ?? null);
            setLoading(false);
        };
        getUser();

        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => authListener.subscription.unsubscribe();
    }, []);


    useEffect(() => {
        if (!loading && !user) {
            router.replace(`/sign-in?redirect=/blog-control`);
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
        <div className="bg-white py-6 px-[3%] flex flex-col items-start gap-3 " >

            <header className="w-full flex items-center justify-between gap-10 " >
                <Link href={"/"} >
                    <Image src={"/logos/THEGREYAElogoBlack.png"} width={180} height={180} alt="TheGreyIT-logo" className="object-center w-[100px] " />
                </Link>



                {/* Log out button  */}
                <button
                    onClick={async () => {
                        const { error } = await supabase.auth.signOut()
                        if (error) console.error("Sign-out error:")
                        else {
                            localStorage.removeItem("")
                        }
                    }}
                    className={`bg-red-600 w-fit text-white px-5 py-2 text-center
                         rounded-md hover:brightness-90 transition-all duration-100 text-sm
                          ease-in-out cursor-pointer  block `}
                >
                    Log Out
                </button>
            </header>


            <h1 className=" font-sans font-medium text-[#1e1e1e] text-lg mb-10    ">
                Good to see you, {user.user_metadata.first_name.charAt(0) + user.user_metadata.first_name.slice(1).toLowerCase()}!
                Let’s get publishing</h1>

            <main className="w-full h-fit flex items-center justify-center" >
                {children}
            </main>
        </div>
    )
}