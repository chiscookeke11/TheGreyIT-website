"use client"

import ServiceForm from "@/components/services/ServiceForm";
import { ServicesData } from "@/data/ServicesData";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";




export default function Page() {
    const [showForm, setShowForm] = useState(false)
    const [selectedSubject, setSelectedSubject] = useState("")


    useEffect(() => {
        document.body.style.overflowY = showForm ? "hidden" : "auto"
    }, [])



    return (
        <div className="w-full  text-black bg-white" >


            {/* The hero section  */}
            <section className="w-full  h-screen relative bg-center bg-cover bg-no-repeat flex items-center justify-center  " style={{ backgroundImage: 'url("/services-page/services.webp")' }}>
                <div className="w-full h-full absolute inset-0 bg-gradient-to-b from-[rgba(4,9,30,0.5)] to-[rgba(4,9,30,0.5)] z-10 " />
                <div className="flex items-center justify-center z-20 font-poppins flex-col gap-3 text-white px-[4%] " >
                    <h1 className="text-2xl md:text-4xl font-bold">Our Services</h1>
                    <p className="text-lg text-center font-medium text-white ">Comprehensive IT solutions tailored to your business needs</p>
                </div>

            </section>




            {/* The Services section  */}
            <section className="w-full h-fit flex flex-col gap-24 lg:gap-32 items-center justify-center py-20 lg:py-28 px-[6%] bg-white " >
                <h2 className="font-bold text-2xl lg:text-4xl leading-[100%] text-[#000]  font-poppins   "> Our Expertise </h2>



                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 gap-y-24 w-full place-items-center justify-items-center" >


                    {
                        ServicesData.map((data, index) => (
                            <div key={index} className="w-full h-full flex flex-col gap-4 items-center justify-center relative px-5 py-7 lg:py-12 pt-24 lg:pt-36 bg-[#f2f5fc] shadow-xl rounded-lg text-center " >

                                <div className=" absolute bg-white top-[-50px] left-[50%] translate-x-[-50%] p-10 flex items-center justify-center rounded-lg shadow-xl " >
                                    {data.icon}
                                </div>


                                <h5 className=" font-syne font-bold text-xl lg:text-2xl text-gray-700  " > {data.title} </h5>
                                <p className="text-lg font-medium  text-gray-500 font-poppins " > {data.content}  </p>


                                <button onClick={() => {
                                    setSelectedSubject(data.title)
                                    setShowForm(true)}}
                                    className="  h-20 w-20 rounded-full bg-white flex items-center justify-center cursor-pointer transform rotate-45 hover:rotate-0 transition-all duration-300 ease-in-out mt-4 lg:mt-7 shadow-sm " ><ArrowRight size={35} /></button>

                            </div>
                        ))
                    }

                </div>

            </section>

            {showForm && <ServiceForm showForm={showForm} setShowForm={setShowForm} subject={selectedSubject}  />}
        </div>



    )
}