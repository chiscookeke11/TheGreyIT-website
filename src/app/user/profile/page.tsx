"use client"

import { supabase } from "@/lib/supabaseClient"
import { User } from "@supabase/supabase-js"
import { Eye, EyeOff } from "lucide-react"
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"



export default function Page() {
    const [user, setUser] = useState<User | null>(null)
    const [currentTab, setCurrentTab] = useState<"Profile" | "Password">("Profile")
    const [showPassword, setShowPassword] = useState(false)
    const [formValues, setFormValues] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        referralCode: ""
    })


    const [passwordValues, setPasswordValues] = useState({
        newPassword: "",
        confirmNewPassword: ""
    })



    // fetch user details
    useEffect(() => {
        const getUser = async () => {

            const { data, error } = await supabase.auth.getUser()
            if (error) {
                console.error("Auth check failed:", error.message)
            }


            const currentUser = data.user
            setUser(currentUser)
            setFormValues({
                firstName: currentUser?.user_metadata.first_name ?? "",
                lastName: currentUser?.user_metadata.last_name ?? "",
                phoneNumber: currentUser?.user_metadata.phoneNumber ?? "",
                referralCode: currentUser?.user_metadata.referralCode ?? ""
            });

        }

        getUser()

        // listen for state changes in the layout
        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            const currentUser = session?.user ?? null
            setUser(currentUser)

            setFormValues({
                firstName: currentUser?.user_metadata.first_name ?? "",
                lastName: currentUser?.user_metadata.last_name ?? "",
                phoneNumber: currentUser?.user_metadata.phoneNumber ?? "",
                referralCode: currentUser?.user_metadata.referralCode ?? ""
            });
        })

        return () => {
            authListener.subscription.unsubscribe()
        }

    }, [])





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



    // password input change function
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value } = e.target

        setPasswordValues((prev) => ({
            ...prev,
            [name]: value
        }))
    }




    // Form submit function
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()


        const { data, error } = await supabase.auth.updateUser({
            data: {
                first_name: formValues.firstName,
                last_name: formValues.lastName,
                phoneNumber: formValues.phoneNumber
            }
        })

        if (error) {
            toast.error("Failed to update profile")
            console.error(error.message)
        }
        else {
            toast.success("Profile updated successfully")
        }



    }










    return (
        <div className="w-full h-full flex flex-col gap-7 items-center justify-center font-poppins" >


            <div className="w-full flex flex-col items-start gap-10 rounded-xl bg-[#f2f5fc] py-7 px-6 " >
                <h1 className=" text-xl md:text-2xl font-semibold text-black   " >My Profile</h1>

                <hr className="w-full border-t border-gray-400 " />

                <div className=" w-full flex items-center gap-6 flex-wrap " >

                    <button
                        onClick={() => setCurrentTab("Profile")}
                        className={`font-syne   hover:bg-transparent hover:text-gray-700   px-6 py-2  flex items-center justify-center font-medium  focus:outline-none cursor-pointer text-sm   border-[1px]  transition-all duration-300 ease-in-out border-gray-700 rounded-sm  text-gray-700  `} >PROFILE</button>

                    <button
                        onClick={() => setCurrentTab("Password")}
                        className={`font-syne   hover:bg-transparent hover:text-gray-700   px-6 py-2  flex items-center justify-center font-medium  focus:outline-none cursor-pointer text-sm   border-[1px]  transition-all duration-300 ease-in-out border-gray-700 rounded-sm  `} >PASSWORD</button>

                </div>

            </div>

            {
                currentTab === "Profile" ? (

                    <form onSubmit={handleSubmit} className=" w-full h-full bg-[#f2f5fc] flex items-center justify-center flex-col gap-7 px-6 py-10 rounded-lg font-poppins ">


                        <div className="w-full grid-cols-1 grid md:grid-cols-2 gap-8 place-items-center justify-items-center " >
                            {/* first name */}
                            <label htmlFor="firstName" className=" w-full flex flex-col items-start gap-1  " >
                                <span className="text-lg font-medium " >First Name</span>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formValues.firstName}
                                    onChange={handleChange}
                                    className="w-full py-4 px-5 border border-gray-700 outline-none focus:outline-none text-base rounded-sm " />
                            </label>




                            {/* last name  */}
                            <label htmlFor="lastName" className=" w-full flex flex-col items-start gap-1  " >
                                <span className="text-lg font-medium " >Last Name</span>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formValues.lastName}
                                    onChange={handleChange}
                                    className="w-full py-4 px-5 border border-gray-700 outline-none focus:outline-none text-base rounded-sm " />
                            </label>






                            {/* Phone number */}
                            <label htmlFor="phoneNumber" className=" w-full flex flex-col items-start gap-1  " >
                                <span className="text-lg font-medium " >Phone Number</span>
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={formValues.phoneNumber}
                                    onChange={handleChange}
                                    className="w-full py-4 px-5 border border-gray-700 outline-none focus:outline-none text-base rounded-sm " />
                            </label>




                            {/* Referral code  */}
                            <label htmlFor="referralCode" className=" w-full flex flex-col items-start gap-1  " >
                                <span className="text-lg font-medium " >Referral Code</span>
                                <input
                                    type="text"
                                    id="referralCode"
                                    name="referralCode"
                                    value={formValues.referralCode}
                                    readOnly
                                    className="w-full py-4 px-5 border border-gray-700 outline-none focus:outline-none text-base rounded-sm " />
                            </label>
                        </div>



                        <button className={`bg-gray-700 w-fit text-white px-5 py-4 text-xl lg:text-start rounded-md hover:bg-gray-600 transition-all duration-300 ease-in-out cursor-pointer  block mr-auto `}
                        >
                            Update Info
                        </button>

                    </form>


                )
                    :
                    (
                        <form className=" w-full h-full bg-[#f2f5fc] flex items-center justify-center flex-col gap-7 px-6 py-10 rounded-lg font-poppins ">
                            <div className="w-full grid-cols-1 grid md:grid-cols-2 gap-8 place-items-center justify-items-center " >


                                {/* Password Input  */}
                                <label htmlFor="newPassword" className=" w-full flex flex-col items-start gap-1  " >
                                    <span className="text-xl font-medium " >Password</span>
                                    <div className=" w-full flex gap-1 rounded-sm  py-4 px-5 border border-gray-700" >
                                        <input type={showPassword ? "text" : "password"} id="newPassword" name="newPassword" onChange={handlePasswordChange} value={passwordValues.newPassword} placeholder="Enter Password" className="w-full  outline-none focus:outline-none text-base  " />
                                        <button type="button" className="cursor-pointer" onClick={() => setShowPassword((prev) => !prev)} > {showPassword ? <EyeOff /> : <Eye />} </button>
                                    </div>
                                </label>


                                {/* confirm password Input  */}

                                <label htmlFor="confirmNewPassword" className=" w-full flex flex-col items-start gap-1  " >
                                    <span className="text-xl font-medium " >Confirm Password</span>
                                    <div className=" w-full flex gap-1 rounded-sm  py-4 px-5 border border-gray-700" >
                                        <input type={showPassword ? "text" : "password"} id="confirmNewPassword" name="confirmNewPassword" onChange={handlePasswordChange} value={passwordValues.confirmNewPassword} placeholder="Enter Password" className="w-full  outline-none focus:outline-none text-base  " />
                                    </div>
                                </label>



                            </div>


                            <button className={`bg-gray-700 w-fit text-white px-5 py-4 text-xl lg:text-start rounded-md hover:bg-gray-600 transition-all duration-300 ease-in-out cursor-pointer  block mr-auto `}
                            >
                                Update Password
                            </button>
                        </form>

                    )
            }







        </div>
    )
}