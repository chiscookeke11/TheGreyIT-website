"use client"

import { supabase } from "@/lib/supabaseClient"
import { Mail } from "lucide-react"
import React, { useState } from "react"
import toast from "react-hot-toast"





export default function NewsletterSection() {
    const [newsLetterEmail, setNewsLetterEmail] = useState("")
    const [loading, setLoading] = useState(true)







    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!newsLetterEmail) {
            toast.error("Please provide an email!")
            return
        }


        setLoading(true)
        // Fetch all subscribed emails
        const { data: emailsData, error: emailsError } = await supabase
            .from("newsletter")
            .select("email");

        if (emailsError) {
            toast.error("Failed to subscribe to our newsletter!");
            return;
        }

        // Check if the email already exists
        const emailExists = emailsData.some(
            (item: { email: string }) => item.email === newsLetterEmail
        );

        if (emailExists) {
            toast.error("You have already subscribed for this newsletter!");
            return;
        }

        // Insert new email
        const { error } = await supabase.from("newsletter").insert({
            email: newsLetterEmail,
        });

        if (error) {
            toast.error("Failed to subscribe to our newsletter!");
            console.error(error);
        } else {
            toast.success("You have subscribed to our newsletter!");
            setNewsLetterEmail("");
        }
    };





    return (
        <section className=" bg-[#161925] w-full h-full flex items-center justify-center py-20 px-[6%] font-poppins relative overflow-hidden ">
            {/* <Image src={"/newsletter/Group.svg"} alt="astract-shape" height={500} width={500} className="absolute right-[-170px] bottom-[-170px] " /> */}


            <div className="w-full py-24 flex flex-col md:flex-row text-center md:text-start items-center gap-10 justify-evenly px-[4%] bg-white/10 backdrop-blur-2xl z-20  rounded-xl " >

                <h3 className="max-w-xl w-full basis-2/5 text-white text-xl md:text-3xl font-bold " >Subscribe our newsletter for latest updates</h3>


                <form onSubmit={handleSubmit} className="w-full basis-3/5 max-w-lg flex flex-col md:flex-row items-center justify-evenly gap-5  " >


                    <label htmlFor="newsLetterEmail" className="w-full flex-1  " >
                        <span className="border-[1px] bg-white/15 backdrop-blur-2xl rounded-[50px] flex items-center gap-2   px-6" >
                            <Mail color="#ffffff" />
                            <input
                                type="email"
                                id="newsLetterEmail"
                                name="newsLetterEmail"
                                placeholder="Enter Your Email"
                                value={newsLetterEmail}
                                onChange={(e) => setNewsLetterEmail(e.target.value)}
                                className=" py-4 w-full outline-0 text-base  font-medium placeholder:text-white text-white " />

                        </span>
                    </label>


                    <button className=" bg-white rounded-[50px] py-4 px-5  cursor-pointer flex items-center justify-center text-neutral-700  text-base font-semibold  hover:rounded-[4px] duration-300 transition-all ease-in-out " >Subscribe Now</button>
                </form>

            </div>
        </section>
    )
}