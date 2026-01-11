"use client"

import { supabase } from "@/lib/supabaseClient";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";




const Spinner = () => {
    return (
        <div className="h-10 w-10 rounded-full border-4 border-white border-t-transparent animate-spin duration-150 ease-in-out transition-all group-hover:border-gray-700 group-hover:border-t-transparent " />
    )
}


export default function UserAuthModal() {
    const [authState, setAuthState] = useState<"Sign In" | "Sign Up">("Sign In")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const [formValues, setFormValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: ""
    })



    // input change function
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        if (name === "phoneNumber" && isNaN(Number(value))) {
            return;
        }

        setFormValues((prev) => ({
            ...prev,
            [name]: value
        }))

    }


    // function for generating a random code
    const randomCode = (length: number): string => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';

        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length))
        }
        return result;
    }


    // Then check if it exists in the db
    const generateUniqueReferral = async () => {
        let exists: boolean = true;
        let code;

        while (exists) {
            code = randomCode(8)
            const { data, error } = await supabase.from("user_data").select("id").eq("referral_code", code);

            if (error) {
                console.error("Error:", error)
            }

            exists = (data?.length ?? 0) > 0
        }
        console.log(code)
        return code
    }





    // sign up function
    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // check if all the values were entered
        if (!formValues.firstName || !formValues.lastName || !formValues.email || !formValues.password || !formValues.confirmPassword) {
            toast.error("Please provide the necessary credentials")
            return
        }
        // check  if the passwords match
        if (formValues.password !== formValues.confirmPassword) {
            toast.error("Passwords do not match")
            return
        }

        setLoading(true)
        const { error, data: signupData } = await supabase.auth.signUp({
            email: formValues.email,
            password: formValues.password,
            options: {
                data: {
                    first_name: formValues.firstName,
                    last_name: formValues.lastName,
                    phoneNumber: formValues.phoneNumber
                },
                emailRedirectTo: "https://www.thegreyit.org/user"
            }
        })

        if (error) {
            toast.error(`Failed to sign up: ${error.message} `,)
            console.error(error)
            setLoading(false)
        }
        else {
            setLoading(false)
            setFormValues({
                email: "",
                confirmPassword: "",
                firstName: "",
                lastName: "",
                password: "",
                phoneNumber: ""
            })


            // Then add user data to the table
            const referralCode = await generateUniqueReferral()
            const { error } = await supabase.from('user_data').insert({
                referral_code: referralCode,
                user_id: signupData.user?.id
            })

            if (error) {
                console.error("Error creating user data", error)
            }
            else {
                router.push(`/verify_email?email=${formValues.email}`)
            }
        }
    }




    // Sign in function
    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()


        if (!formValues.email || !formValues.password) {
            toast.error("Please provide the necessary credentials")
            return
        }


        setLoading(true)
        const { data, error } = await supabase.auth.signInWithPassword({
            email: formValues.email,
            password: formValues.password,
        })

        if (error) {
            toast.error(`login failed: ${error.message}`)
            setLoading(false)
        }

        else {
            toast.success("Success! You are now signed in")
            console.log(data)
            setLoading(false)
            setFormValues({
                email: "",
                confirmPassword: "",
                firstName: "",
                lastName: "",
                password: "",
                phoneNumber: ""
            })
        }

    }






    return (
        <form onSubmit={authState === "Sign Up" ? handleSignup : handleSignIn} className=" w-full  h-full md:max-w-2xl bg-white flex items-center justify-center flex-col gap-7 px-8 py-4 rounded-lg font-poppins " >
            <h1 className="text-gray-700 font-bold font-poppins text-xl md:text-3xl  " >{authState === "Sign In" ? "Sign In" : "Create an Account"} </h1>

            <div className="w-full flex flex-col gap-6 items-center justify-center " >


                {/* Name Section */}
                {authState === "Sign Up" ? (
                    <div className="w-full flex flex-row items-center justify-between gap-5" >

                        {/* first name */}
                        <label htmlFor="firstName" className=" w-full flex flex-col items-start gap-1  " >
                            <span className="text-base font-medium " >First Name</span>
                            <input type="text" id="firstName" name="firstName" onChange={handleChange} value={formValues.firstName} placeholder="John" className="w-full py-3 px-5 border border-gray-700 outline-none focus:outline-none text-sm rounded-sm " />
                        </label>

                        {/* last name  */}
                        <label htmlFor="lastName" className=" w-full flex flex-col items-start gap-1  " >
                            <span className="text-base font-medium " >Last Name</span>
                            <input type="text" id="lastName" name="lastName" onChange={handleChange} value={formValues.lastName} placeholder="Doe" className="w-full py-3 px-5 border border-gray-700 outline-none focus:outline-none text-sm rounded-sm" />
                        </label>
                    </div>
                ) : null}



                <div className="w-full flex flex-row items-center justify-between gap-5" >
                    {/* Email input */}
                    <label htmlFor="Email" className=" w-full flex flex-col items-start gap-1  " >
                        <span className="text-base font-medium " >Email</span>
                        <input type="email" id="email" name="email" onChange={handleChange} value={formValues.email} placeholder="JohnDoe@gmail.com" className="w-full py-3 px-5 border border-gray-700 outline-none focus:outline-none text-sm rounded-sm" />
                    </label>



                    {/* Phone number */}
                    {authState === "Sign Up" ? (
                        <label htmlFor="phoneNumber" className=" w-full flex flex-col items-start gap-1  " >
                            <span className="text-base font-medium " >Phone Number</span>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formValues.phoneNumber}
                                onChange={handleChange}
                                className="w-full py-3 px-5 border border-gray-700 outline-none focus:outline-none text-sm rounded-sm " />
                        </label>)
                        : null
                    }
                </div>



                <div className="w-full flex flex-row items-center justify-between gap-5" >
                    {/* Password Input  */}
                    <label htmlFor="password" className=" w-full flex flex-col items-start gap-1  " >
                        <span className="text-base font-medium " >Password</span>
                        <div className=" w-full flex gap-1 rounded-sm  py-3 px-5 border border-gray-700" >
                            <input type={showPassword ? "text" : "password"} id="password" name="password" onChange={handleChange} value={formValues.password} placeholder="Enter Password" className="w-full  outline-none focus:outline-none text-sm  " />
                            <button type="button" className="cursor-pointer" onClick={() => setShowPassword((prev) => !prev)} > {showPassword ? <EyeOff size={20} /> : <Eye size={20} />} </button>
                        </div>
                    </label>


                    {/* confirm password Input  */}
                    {authState === "Sign Up" ? (
                        <label htmlFor="confirmPassword" className=" w-full flex flex-col items-start gap-1  " >
                            <span className="text-base font-medium " >Confirm Password</span>
                            <div className=" w-full flex gap-1 rounded-sm  py-3 px-5 border border-gray-700" >
                                <input type={showPassword ? "text" : "password"} id="confirmPassword" name="confirmPassword" onChange={handleChange} value={formValues.confirmPassword} placeholder="Enter Password" className="w-full  outline-none focus:outline-none text-sm  " />
                            </div>
                        </label>
                    ) : null}

                </div>

                <Link href={"/reset-password"} className="ml-auto text-gray-700 text-sm font-medium outline-none " > Forgot Password? </Link>



            </div>

            <button disabled={loading} className="font-syne bg-gray-700 w-full max-w-xs text-white hover:bg-transparent hover:text-gray-700 mb-5  px-6 py-3  flex items-center justify-center font-medium  focus:outline-none cursor-pointer text-base md:text-lg  border-[1px]  transition-all duration-300 ease-in-out border-gray-700 rounded-sm group  " > {loading ? <Spinner  /> : authState === "Sign In" ? "Sign In" : "Create Account"} </button>


            {authState === "Sign In" ? <p className=" text-base font-medium text-black text-center " >Don&apos;t have an account? <button className=" text-gray-700 font-medium cursor-pointer outline-none border-none" type="button" onClick={() => setAuthState("Sign Up")}> Create Account</button></p> : (
                <p className=" text-base font-medium text-black text-center " >Already have an account? <button type="button" className=" text-gray-700 font-medium cursor-pointer outline-none border-none " onClick={() => setAuthState("Sign In")}> Sign In</button></p>
            )}

        </form>
    )
}