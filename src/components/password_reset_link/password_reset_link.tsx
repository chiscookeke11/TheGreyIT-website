

"use client"



import { MailCheck } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";





const Spinner = () => {
    return (
        <div className="h-5 w-5 rounded-full border-4 border-gray-white border-t-transparent animate-spin duration-150 ease-in-out transition-all " />
    )
}


export default function PasswordResetLink() {

    const searchParams = useSearchParams()
    const email = searchParams.get("email")
    const [loading, setLoading] = useState(false)





    return (
        <div className="w-full h-screen flex items-center justify-center py-5 px-[4%] bg-gray-700  flex-col gap-10 font-poppins " >



            <div className=" w-full max-w-3xl flex flex-col text-gray-700 items-center gap-5 bg-[#f2f5fc]  rounded-sm py-10 px-4 " >

                <div className=" w-20 h-20 flex items-center justify-center rounded-full bg-green-400 p-3 " >
                    <MailCheck color="#f2f5fc" size={40} />

                </div>

                <h1 className=" text-lg md:text-2xl font-bold text-gray-700 text-center ">  Reset your password</h1>


                <p className="text-center font-medium text-base md:text-lg max-w-2xl " >
                    A password reset link has been sent to <strong>{email ?? "your email"}</strong>.
                    Please check your inbox and follow the instructions to create a new password. </p>


                <hr className=" w-[55%] border border-gray-500 my-8 " />



                <p className="text-center text-sm md:text-base font-medium "><span className="font-semibold  " >Did not receive the email?</span> <br />
                    <Link href={"/reset-password"}
                        className=" cursor-pointer outline-none border-0 hover:text-gray-500  " >
                        {loading ? <Spinner /> : "Click here to resend"}
                    </Link> </p>


            </div>


        </div>
    )
}