"use client"

import { supabase } from "@/lib/supabaseClient"
import React, { useState } from "react"
import toast from "react-hot-toast"





const Spinner = () => {
    return (
        <div className="h-10 w-10 rounded-full border-4 border-gray-700 border-t-transparent animate-spin duration-150 ease-in-out transition-all " />
    )
}





export default function Page() {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)


    // function to send update password link to the user
    const sendResetLink = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: "/update-password"
        })

        if (error) {
            toast.error(`Failed to send link ${error.message} `)
            console.error(error.message)
        }

        console.log(data)
        setEmail("")
        toast.success("Password reset link sent successfully")


    }



    return (
        <div className="w-full h-screen flex items-center justify-center px-[5%] " >
            <form onSubmit={sendResetLink} className=" w-full max-w-2xl bg-white flex items-center justify-center flex-col gap-7 px-6 py-10 rounded-lg font-poppins ">

                <h1 className="text-gray-700 font-bold font-poppins text-2xl md:text-4xl  "> Enter Your Email</h1> <h1 className="text-gray-700 font-bold font-poppins text-2xl md:text-4xl  "> Enter Your Email</h1>

                {/* Email input */}
                <label htmlFor="Email" className=" w-full flex flex-col items-start gap-1  " >
                    <span className="text-xl font-medium " >Email</span>
                    <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="JohnDoe@gmail.com" className="w-full py-4 px-5 border border-gray-700 outline-none focus:outline-none text-base rounded-sm " />
                </label>





                <button className="font-syne bg-gray-700 w-full max-w-xs text-white hover:bg-transparent hover:text-gray-700 mb-5  px-6 py-3  flex items-center justify-center font-medium  focus:outline-none cursor-pointer text-base md:text-lg  border-[1px]  transition-all duration-300 ease-in-out border-gray-700 rounded-sm  " > {loading ? <Spinner /> : "Send reset link"} </button>


            </form>
        </div>
    )
}