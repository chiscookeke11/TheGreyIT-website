"use client"

import { Eye, EyeClosed } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";




export default function UserAuthModal() {
    const [authState, setAuthState] = useState()
const [showPassword, setShowPassword] = useState(false)
    const [formValues, setFormValues] = useState({
        email: "",
        password: ""
    })



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target


        setFormValues((prev) => ({
            ...prev,
            [name]: value
        }))

    }



    return (
        <div className=" w-full max-w-3xl bg-white flex items-center justify-center flex-col gap-7 px-6 py-10 rounded-lg font-poppins " >
            <h1 className="text-gray-700 font-bold font-poppins text-2xl md:text-4xl  " >Sign In</h1>



            <div className="w-full flex flex-col gap-6 items-center justify-center " >
                <label htmlFor="Email" className=" w-full flex flex-col items-start gap-1  " >
                    <span className="text-xl font-medium " >Email</span>
                    <input type="email" id="email" name="email" onChange={handleChange} value={formValues.email} placeholder="Enter Email" className="w-full py-4 px-5 border border-gray-700 outline-none focus:outline-none text-base rounded-sm " />
                </label>


                <label htmlFor="Email" className=" w-full flex flex-col items-start gap-1  " >
                    <span className="text-xl font-medium " >Password</span>
                    <div className=" w-full flex gap-1 rounded-sm  py-4 px-5 border border-gray-700" >
                        <input type="password" id="password" name="password" onChange={handleChange} value={formValues.password} placeholder="Enter Password" className="w-full  outline-none focus:outline-none text-base  " />
                        <button className="cursor-pointer" > {showPassword? <EyeClosed/> : <Eye/>} </button>
                    </div>
                </label>

                <Link href={"#"} className="ml-auto text-gray-700 text-sm font-medium " > Forgot Password? </Link>



            </div>

            <button className="font-syne bg-gray-700 w-full max-w-xs text-white hover:bg-transparent hover:text-gray-700 mb-5  px-6 py-3  flex items-center justify-center font-medium  focus:outline-none cursor-pointer text-base md:text-lg  border-[1px]  transition-all duration-300 ease-in-out border-gray-700 rounded-sm  " >Sign In</button>


            <p className=" text-base font-medium text-black " >Don&apos;t have an account? <Link href={"#"} className=" text-gray-700 font-medium "> Create Account</Link></p>


            <div className=" flex items-center justify-center gap-3 " >
                <button className="cursor-pointer p-2 rounded-full h-10 w-10 overflow-hidden flex items-center justify-center " ><Image src={"/logos/google-logo.png"} alt="google logo" height={50} width={50} className="h-full w-full " /></button>
            </div>
        </div>
    )
}