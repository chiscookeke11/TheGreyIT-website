

"use client"

import { MailCheck } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";
import { useState } from "react";





const Spinner = () => {
    return (
        <div className="h-5 w-5 rounded-full border-4 border-gray-white border-t-transparent animate-spin duration-150 ease-in-out transition-all " />
    )
}


export default function VerifyEmail() {

    const searchParams = useSearchParams()
    const email = searchParams.get("email")
    const [loading, setLoading] = useState(false)



    const resendVerificationEmail = async (email: string) => {


        setLoading(true)

        const { data, error } = await supabase.auth.resend({
            type: 'signup',
            email: email,
        })

        if (error) {
            toast.error('Error resending verification email:')
            setLoading(false)
            return { success: false, message: error.message }
        } else {
            toast.success('Verification email resent successfully:')
            setLoading(false)
            return { success: true, message: 'Verification email resent.' }
        }

    }


    return (
        <div className="w-full h-screen flex items-center justify-center py-5 px-[4%] bg-gray-700  flex-col gap-10 font-poppins " >


{/*
            <Image
                src="/logos/thegreyitlogo.png"
                alt="Riskified team collaborating"
                width={1500}
                height={1500}
                className="w-[200px] h-fit object-cover object-center rounded-sm"
                priority
            /> */}


            <div className=" w-full max-w-3xl flex flex-col text-gray-700 items-center gap-5 bg-[#f2f5fc]  rounded-sm py-10 px-4 " >

                <div className=" w-20 h-20 flex items-center justify-center rounded-full bg-green-400 p-3 " >
                    <MailCheck color="#f2f5fc" size={40} />

                </div>

                <h1 className=" text-lg md:text-2xl font-bold text-gray-700 text-center ">Verify your email address</h1>


                <p className="text-center font-medium text-base md:text-lg " > Please click the link that was sent to <strong>{email ?? "the email"}</strong> to verify your email. </p>


                <hr className=" w-[15%] border border-gray-500 my-8 " />



                <p className="text-center text-sm md:text-base font-medium "><span className="font-semibold  " >Did not receive the email?</span> <br />
                    <button
                        onClick={() => resendVerificationEmail(email ?? "")}
                        className=" cursor-pointer outline-none border-0 hover:text-gray-500  " >
                        {loading ? <Spinner /> : "Click here to resend"}
                    </button> </p>


            </div>


        </div>
    )
}