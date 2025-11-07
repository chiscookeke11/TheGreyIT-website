"use client"

import React, { useState } from "react"





export default function NewsletterSection() {
    const [email, setEmail] = useState("")


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }




    return (
        <section className=" bg-white w-full h-full flex items-center justify-center py-20 px-[6%] font-poppins ">


            <div className="w-full py-24 flex flex-col md:flex-row text-center md:text-start items-center gap-10 justify-evenly px-[4%] bg-gray-400 backdrop-blur-2xl rounded-xl " >

                <h3 className="max-w-xl w-full basis-2/5 text-white text-xl md:text-3xl font-bold " >Subscribe our newsletter for latest updates</h3>


                <form onSubmit={handleSubmit} className="w-full basis-3/5 max-w-lg flex flex-col md:flex-row items-center justify-evenly gap-5  " >


                    <label htmlFor="email" className="w-full flex-1  " >
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="py-4 px-6 w-full outline-0 text-sm border-[1px] bg-white/15 backdrop-blur-2xl rounded-[50px] " />

                    </label>


                    <button className=" bg-gray-700 rounded-[50px] py-4 px-5  cursor-pointer flex items-center justify-center text-white  text-base font-medium  hover:rounded-[4px] duration-300 transition-all ease-in-out " >Subscribe Now</button>
                </form>

            </div>
        </section>
    )
}