"use client"

import React, { useState } from "react"



export default function Page() {
    const [formValues, setFormValues] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        referralCode: ""
    })


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



    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

    }



    return (
        <div className="w-full h-full flex flex-col gap-7 items-center justify-center font-poppins" >


            <div className="w-full flex flex-col items-start gap-10 rounded-xl bg-[#f2f5fc] py-7 px-6 " >
                <h1 className=" text-xl md:text-2xl font-semibold text-black   " >My Profile</h1>

                <hr className="w-full border-t border-gray-400 " />

                <div className=" w-full flex items-center gap-6 flex-wrap " >

                    <button
                        className={`font-syne   hover:bg-transparent hover:text-gray-700   px-6 py-2  flex items-center justify-center font-medium  focus:outline-none cursor-pointer text-sm   border-[1px]  transition-all duration-300 ease-in-out border-gray-700 rounded-sm  text-gray-700  `} >PROFILE</button>

                    <button
                        className={`font-syne   hover:bg-transparent hover:text-gray-700   px-6 py-2  flex items-center justify-center font-medium  focus:outline-none cursor-pointer text-sm   border-[1px]  transition-all duration-300 ease-in-out border-gray-700 rounded-sm  `} >PASSWORD</button>

                </div>

            </div>


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
                            placeholder="John"
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
                            placeholder="Doe"
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



        </div>
    )
}