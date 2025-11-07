"use client"

import ServiceForm from "@/components/services/ServiceForm";
import { ServicesData } from "@/data/ServicesData";
import Image from "next/image";
import { useEffect, useState } from "react";




export default function Page() {
    const [showForm, setShowForm] = useState(false)
    const [selectedSubject, setSelectedSubject] = useState("")


    useEffect(() => {
        document.body.style.overflowY = showForm ? "hidden" : "auto"
    }, [showForm])



    return (
        <div className="w-full  text-black bg-white" >


            {/* The hero section  */}
            <section className="w-full  h-screen relative bg-center bg-cover bg-no-repeat flex items-center justify-center  " style={{ backgroundImage: 'url("/services-page/services.webp")' }}>
                <div className="w-full h-full absolute inset-0 bg-gradient-to-b from-[rgba(4,9,30,0.6)] to-[rgba(4,9,30,0.6)] z-10 " />
                <div className="flex items-center justify-center z-20 font-poppins flex-col gap-3 text-white px-[4%] " >
                    <h1 className="text-2xl md:text-4xl font-bold">Our Services</h1>
                    <p className="text-lg text-center font-medium text-white ">Building digital systems that work, designed for performance, security, and growth. </p>
                </div>

            </section>





            {/* The services section  */}
            <section className="w-full h-full flex flex-col  items-center justify-center gap-12 md:gap-0 py-20 lg:py-28 px-[3%] lg:px-[6%] bg-white font-poppins " >


                {ServicesData.map((service, i) => (
                    <div key={i} className={`w-full max-w-8xl flex flex-col  items-center  md:h-[500px] ${i % 2 === 0 ? " md:flex-row-reverse" : "md:flex-row"} `} >

                        <div className="bg-red-700  w-full md:basis-1/2 h-full " >
                            <Image src={service.imageUrl} alt={service.title} width={1000} height={1000} className="w-full h-full object-cover object-center" />
                        </div>


                        <div className="md:basis-1/2 w-full h-full px-5 lg:px-10 py-8 md:py-16 flex items-start justify-center flex-col  gap-3.5 text-start " >
                            <h3 className="text-xl md:text-2xl font-extrabold text-gray-700 mb-4 ">{service.title} </h3>
                            <p className="text-lg md:text-xl mb-5 "> {service.content} </p>
                            <button
                                onClick={() => {
                                    setSelectedSubject(service.title)
                                    setShowForm(true)
                                }}
                                className="font-syne bg-gray-700 text-white hover:bg-transparent hover:text-gray-700   px-6 py-3  flex items-center justify-center font-medium  focus:outline-none cursor-pointer text-base md:text-lg  border-[1px]  transition-all duration-300 ease-in-out border-gray-700 rounded-sm  " >{service.buttonText}</button>
                        </div>

                    </div>
                ))}






            </section>


            {showForm && <ServiceForm showForm={showForm} setShowForm={setShowForm} subject={selectedSubject} />}
        </div>



    )
}