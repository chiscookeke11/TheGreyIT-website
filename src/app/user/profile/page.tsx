"use client"

import { useAppContext } from "@/context/AppContext"
import { supabase } from "@/lib/supabaseClient"
import { User } from "@supabase/supabase-js"
import { Eye, EyeOff } from "lucide-react"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"




const Spinner = () => {
    return (
        <div className="h-10 w-10 rounded-full border-4 border-white border-t-transparent animate-spin duration-150 ease-in-out transition-all " />
    )
}





export default function Page() {
    const [user, setUser] = useState<User | null>(null)
    const [currentTab, setCurrentTab] = useState<"Profile" | "Password">("Profile")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const email = user?.user_metadata.email
    const { userData } = useAppContext()
    const [file, setFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)


    const [formValues, setFormValues] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        referralCode: "",
        imageLink: ""
    })


    const [passwordValues, setPasswordValues] = useState({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
        imageLink: ""
    })



    // Function for uploading image to  supabase storage
    const uploadImage = async () => {
        if (!file && !previewUrl && !userData?.user_image) {
            return toast.error("Please select an image")
        }


        else if (file) {


            const filename = `${Date.now()}-${file.name}`

            const { error } = await supabase.storage
                .from("profile_image")
                .upload(filename, file)


            if (error) {
                console.error("Upload error", error.message)
                toast.error(`Upload failed: ${error.message}`)
                return
            }

            const { data: publicUrl } = supabase.storage
                .from("profile_image")
                .getPublicUrl(filename)



            return publicUrl.publicUrl
        }
    }


    // fetch user details
    useEffect(() => {
        const getUser = async () => {

            const { data, error } = await supabase.auth.getUser()
            if (error) {
                console.error("Auth check failed:", error.message)
            }


            const currentUser = data.user
            setUser(currentUser)
            setFormValues(prev => ({
                ...prev,
                firstName: currentUser?.user_metadata.first_name ?? "",
                lastName: currentUser?.user_metadata.last_name ?? "",
                phoneNumber: currentUser?.user_metadata.phoneNumber ?? "",
                imageLink: prev.imageLink
            }));

        }

        getUser()
        // listen for state changes in the layout
        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            const currentUser = session?.user ?? null
            setUser(currentUser)
            setFormValues(prev => ({
                ...prev,
                firstName: currentUser?.user_metadata.first_name ?? "",
                lastName: currentUser?.user_metadata.last_name ?? "",
                phoneNumber: currentUser?.user_metadata.phoneNumber ?? "",
            }));
        })

        return () => {
            authListener.subscription.unsubscribe()
        }

    }, [])


    useEffect(() => {
        if (userData) {
            setFormValues(prev => ({
                ...prev,
                referralCode: userData.referral_code ?? ""
            }));
        }
    }, [userData]);





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

        setLoading(true)

        const imageUrl = await uploadImage()

        const { error } = await supabase.auth.updateUser({
            data: {
                first_name: formValues.firstName,
                last_name: formValues.lastName,
                phoneNumber: formValues.phoneNumber,
                imageUrl: file ? imageUrl : userData?.user_image
            }
        })

        if (error) {
            setLoading(false)
            toast.error("Failed to update profile")
            console.error(error.message)
        }
        else {

            const { error: updateError } = await supabase.from("user_data").update({
                user_image: file ? imageUrl : userData?.user_image
            }).eq("user_id", user?.id)

            if (updateError) {
                console.error(updateError)
            }

            else {
                setLoading(false)
                toast.success("Profile updated successfully")
            }

        }




    }


    // Function to update password
    const changePassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()


        setLoading(true)

        // First we reauthenticate
        const { error: loginError } = await supabase.auth.signInWithPassword({
            email: email,
            password: passwordValues.oldPassword

        });

        if (loginError) {
            setLoading(false)
            return {
                error: "Old Password is incorrect"
            }
        }



        // Next we update the new password
        const { error } = await supabase.auth.updateUser({
            password: passwordValues.newPassword,
        })


        if (error) {
            setLoading(false)
            return {
                error: error.message
            }
        }


        toast.success("Password changed successfully!")
        setLoading(false)


    }



    return (
        <div className="w-full h-full flex flex-col gap-7 items-center justify-center font-poppins" >


            <div className="w-full flex flex-col items-start gap-10 rounded-xl bg-[#f2f5fc] py-7 px-6 " >
                <h1 className=" text-xl md:text-2xl font-semibold text-black   " >My Profile</h1>

                <hr className="w-full border-t border-gray-400 " />

                <div className=" w-full flex items-center gap-6 flex-wrap " >

                    <button
                        disabled={loading}
                        onClick={() => setCurrentTab("Profile")}
                        className={`font-syne   hover:bg-transparent hover:text-gray-700   px-6 py-2  flex items-center justify-center font-medium  focus:outline-none cursor-pointer text-sm   border-[1px]  transition-all duration-300 ease-in-out border-gray-700 rounded-sm ${currentTab === "Profile" ? "bg-transparent text-gray-700 " : "bg-gray-700 text-white"} `}>PROFILE</button>

                    <button
                        disabled={loading}
                        onClick={() => setCurrentTab("Password")}
                        className={`font-syne   hover:bg-transparent hover:text-gray-700   px-6 py-2  flex items-center justify-center font-medium  focus:outline-none cursor-pointer text-sm   border-[1px]  transition-all duration-300 ease-in-out border-gray-700 rounded-sm ${currentTab === "Password" ? "bg-transparent text-gray-700 " : "bg-gray-700 text-white"} `} >PASSWORD</button>

                </div>

            </div>

            {
                currentTab === "Profile" ? (

                    <form onSubmit={handleSubmit} className=" w-full h-full bg-[#f2f5fc] flex items-center justify-center flex-col gap-7 px-6 py-10 rounded-lg font-poppins ">

                        {/* Image display  */}
                        <label htmlFor="image" className="w-[90px] h-[90px] bg-[#f2f5fc] rounded-full flex items-center text-center justify-center mr-auto relative border-2 border-gray-700 " >

                            {previewUrl ? (
                                <Image
                                    src={previewUrl}
                                    alt="New preview"
                                    width={1000}
                                    height={1000}
                                    className="w-full h-full z-20 rounded-full object-cover"
                                />
                            ) : userData?.user_image ? (
                                <Image
                                    src={userData.user_image}
                                    alt="Profile pic"
                                    width={1000}
                                    height={1000}
                                    className="w-full h-full z-20 rounded-full object-cover"
                                />
                            ) : (
                                <Image
                                    src="/user/User-icon-vector-16.svg"
                                    alt="Default"
                                    width={1000}
                                    height={1000}
                                    className="w-[60%] h-[60%] z-20 rounded-full object-contain"
                                />
                            )}



                            {/* image upload input  */}
                            <input
                                type="file"
                                id="image"
                                accept="image/*"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        const selectedFile = e.target.files[0]
                                        setFile(selectedFile)
                                        setPreviewUrl(URL.createObjectURL(selectedFile))
                                    }
                                }}
                                className="absolute top-0 left-0 opacity-0 h-full w-full bg-gray-600 rounded-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:text-gray-700 file:bg-white hover:file:bg-gray-300 file:cursor-pointer"
                            />
                        </label>






                        <div className="w-full grid-cols-1 grid md:grid-cols-2 gap-8 place-items-center justify-items-center " >
                            {/* first name */}
                            <label htmlFor="firstName" className=" w-full flex flex-col items-start gap-1  " >
                                <span className="text-sm font-medium " >First Name</span>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formValues.firstName}
                                    onChange={handleChange}
                                    className="w-full py-2 px-5 border border-gray-700 outline-none focus:outline-none text-sm rounded-sm " />
                            </label>




                            {/* last name  */}
                            <label htmlFor="lastName" className=" w-full flex flex-col items-start gap-1  " >
                                <span className="text-sm font-medium " >Last Name</span>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formValues.lastName}
                                    onChange={handleChange}
                                    className="w-full py-2 px-5 border border-gray-700 outline-none focus:outline-none text-sm rounded-sm " />
                            </label>






                            {/* Phone number */}
                            <label htmlFor="phoneNumber" className=" w-full flex flex-col items-start gap-1  " >
                                <span className="text-sm font-medium " >Phone Number</span>
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={formValues.phoneNumber}
                                    onChange={handleChange}
                                    className="w-full py-2 px-5 border border-gray-700 outline-none focus:outline-none text-sm rounded-sm " />
                            </label>




                            {/* Referral code  */}
                            <label htmlFor="referralCode" className=" w-full flex flex-col items-start gap-1  " >
                                <span className="text-sm font-medium " >Referral Code</span>
                                <input
                                    type="text"
                                    id="referralCode"
                                    name="referralCode"
                                    value={formValues.referralCode}
                                    readOnly
                                    className="w-full py-2 px-5 border border-gray-700 outline-none focus:outline-none text-sm rounded-sm " />
                            </label>
                        </div>



                        <button disabled={loading} className={`bg-gray-700 w-fit text-white px-4 py-2 text-sm lg:text-start rounded-md hover:bg-gray-600 transition-all duration-300 ease-in-out cursor-pointer  block mr-auto `}
                        >
                            {loading ? <Spinner /> : "Update Info"}
                        </button>

                    </form>


                )
                    :
                    (
                        <form onSubmit={changePassword} className=" w-full h-full bg-[#f2f5fc] flex items-center justify-center flex-col gap-7 px-6 py-10 rounded-lg font-poppins ">
                            <div className="w-full grid grid-cols-1 gap-8 place-items-center justify-items-center " >




                                {/* Old Password Input  */}
                                <label htmlFor="oldPassword" className=" w-full flex flex-col items-start gap-1  " >
                                    <span className="text-sm font-medium " >Old Password</span>
                                    <div className=" w-full flex gap-1 rounded-sm  py-2 px-5 border border-gray-700" >
                                        <input type={showPassword ? "text" : "password"} id="oldPassword" name="oldPassword" onChange={handlePasswordChange} value={passwordValues.oldPassword} placeholder="Enter Old Password" className="w-full  outline-none focus:outline-none text-sm  " />
                                        <button type="button" className="cursor-pointer" onClick={() => setShowPassword((prev) => !prev)} > {showPassword ? <EyeOff /> : <Eye />} </button>
                                    </div>
                                </label>


                                {/* New Password Input  */}
                                <label htmlFor="newPassword" className=" w-full flex flex-col items-start gap-1  " >
                                    <span className="text-sm font-medium " >Password</span>
                                    <div className=" w-full flex gap-1 rounded-sm  py-2 px-5 border border-gray-700" >
                                        <input type={showPassword ? "text" : "password"} id="newPassword" name="newPassword" onChange={handlePasswordChange} value={passwordValues.newPassword} placeholder="Enter New Password" className="w-full  outline-none focus:outline-none text-sm  " />
                                    </div>
                                </label>


                                {/* confirm password Input  */}

                                <label htmlFor="confirmNewPassword" className=" w-full flex flex-col items-start gap-1  " >
                                    <span className="text-sm font-medium " >Confirm Password</span>
                                    <div className=" w-full flex gap-1 rounded-sm  py-2 px-5 border border-gray-700" >
                                        <input type={showPassword ? "text" : "password"} id="confirmNewPassword" name="confirmNewPassword" onChange={handlePasswordChange} value={passwordValues.confirmNewPassword} placeholder="Confirm New Password" className="w-full  outline-none focus:outline-none text-sm  " />
                                    </div>
                                </label>



                            </div>


                            <button disabled={loading} className={`bg-gray-700 w-fit text-white px-5 py-2 lg:text-start rounded-md hover:bg-gray-600 transition-all duration-300 ease-in-out cursor-pointer  block mr-auto text-sm `}
                            >
                                {loading ? <Spinner /> : "Update Password"}
                            </button>
                        </form>

                    )
            }







        </div>
    )
}