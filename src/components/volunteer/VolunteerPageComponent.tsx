"use client";



import Image from "next/image";
import Button from "../UI/Button";
import { useState } from "react";



export default function VolunteerPageComponent() {

    const [formValues, setFormValues] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
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


    return (
        <div className="w-full h-[95vh] flex items-center justify-center px-[3%] pb-18 pt-32 " >




            <div className="w-full max-w-7xl h-full flex items-stretch gap-0 font-poppins bg-white shadow-xs overflow-hidden rounded-3xl " >


                {/* The left side  */}
                <div className="w-1/2 h-full  flex items-center justify-center px-[3%] py-12 " >
                    <form action="" className="w-full px-1  flex flex-col items-start gap-9 " >
                        <div>
                            <h1 className="text-gray-500 font-bold text-2xl md:text-4xl  mb-2  " >Join us for <span className="text-gray-800" >volunteer!</span></h1>
                            <p className="text-gray-700 font-normal text-base " >Volunteer for this </p>
                        </div>




                        <div className="w-full grid-cols-1 grid md:grid-cols-2 gap-x-6 gap-y-6 place-items-center justify-between " >
                            {/* first name */}
                            <label htmlFor="firstName" className=" w-full flex flex-col items-start gap-1  " >
                                <span className="text-sm font-medium " >First Name*</span>
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
                                <span className="text-sm font-medium " >Last Name*</span>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formValues.lastName}
                                    onChange={handleChange}
                                    className="w-full py-2 px-5 border border-gray-700 outline-none focus:outline-none text-sm rounded-sm " />
                            </label>



                            {/* Email */}
                            <label htmlFor="email" className=" w-full flex flex-col items-start gap-1  " >
                                <span className="text-sm font-medium " >Email*</span>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formValues.email}
                                    onChange={handleChange}
                                    className="w-full py-2 px-5 border border-gray-700 outline-none focus:outline-none text-sm rounded-sm " />
                            </label>




                            {/* Phone number */}
                            <label htmlFor="phoneNumber" className=" w-full flex flex-col items-start gap-1  " >
                                <span className="text-sm font-medium " >Phone Number*</span>
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={formValues.phoneNumber}
                                    onChange={handleChange}
                                    className="w-full py-2 px-5 border border-gray-700 outline-none focus:outline-none text-sm rounded-sm " />
                            </label>
                        </div>





                        <Button type="submit" variant="default" className="w-full py-2! text-base! "  >Next</Button>


                        <div className="flex flex-col items-start  gap-2 mt-3 " >
                            <h2 className="text-sm text-gray-800 font-semibold " >Important information</h2>
                            <ul className="flex flex-col items-start gap-1  " >
                                <li className="text-xs font-normal flex items-center gap-3 text-gray-600 " > <span className="size-1 rounded-full bg-gray-500 block " /> list item 1</li>
                                <li className="text-xs font-normal flex items-center gap-3 text-gray-600 " > <span className="size-1 rounded-full bg-gray-500 block " /> list item 1</li>
                                <li className="text-xs font-normal flex items-center gap-3 text-gray-600 " > <span className="size-1 rounded-full bg-gray-500 block " /> list item 1</li>
                            </ul>
                        </div>


                    </form>
                </div>









                {/* The right side  */}

                <div className="w-1/2 h-full bg-blue-300 overflow-hidden relative " >

                    <Image src={"/about-us/about-us-hero.avif"} alt="image" fill className="w-full h-full object-center object-cover" />


                    <div className=" w-full text-white absolute z-10 h-full px-7 py-12 flex flex-col items-start justify-end gap-3 bg-black/25 " >
                        <h2 className="text-xl font-bold md:text-3xl" >TheGreyIT</h2>
                        <div className="flex flex-col md:flex-row items-center gap-2  text-sm md:text-base font-bold " >
                            <h1>Learn.</h1>
                            <h1>Build.</h1>
                            <h1>Advance.</h1>
                        </div>
                    </div>
                </div>


            </div>


        </div>
    )
}