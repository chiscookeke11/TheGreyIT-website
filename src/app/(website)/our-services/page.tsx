import { ServicesData } from "@/data/ServicesData";
import { ArrowRight } from "lucide-react";
import Image from "next/image";



export default function Page() {
    return (
        <div className="w-full  text-black bg-white" >
            <section className="w-full  h-screen relative bg-center bg-cover bg-no-repeat flex items-center justify-center  " style={{ backgroundImage: 'url("/services-page/services.webp")' }}>
                <div className="w-full h-full absolute inset-0 bg-gradient-to-b from-[rgba(4,9,30,0.5)] to-[rgba(4,9,30,0.5)] z-10 " />
                <div className="flex items-center justify-center z-20 font-poppins flex-col gap-5 text-white" >
                    <h1 className="text-2xl md:text-4xl font-bold">Our Services</h1>
                </div>

            </section>



            <section className="w-full h-fit flex flex-col gap-32 items-center justify-center py-20 lg:py-28 px-[4%] bg-white " >
                <h2 className="font-bold text-2xl lg:text-[36px] leading-[100%] text-[#000]  font-syne   "> A wide range of services </h2>



                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 gap-y-24 w-full place-items-center justify-items-center" >


                    {
                        ServicesData.map((data, index) => (
                            <div key={index} className="w-full h-full flex flex-col gap-4 items-center justify-center relative px-5 py-12 pt-36 bg-[#f2f5fc] shadow-xl rounded-lg text-center " >

                                <div className=" absolute bg-white top-[-40px] left-[50%] translate-x-[-50%] py-10 px-7 flex items-center justify-center rounded-lg shadow-xl " >
                                    {data.icon}
                                </div>


                                <h5 className=" font-syne font-bold text-xl lg:text-2xl text-black  " > {data.title} </h5>
                                <p className="text-lg font-semibold  text-gray-500 " > {data.content}  </p>


                                <button className="h-20 w-20 rounded-full bg-white flex items-center justify-center cursor-pointer transform rotate-45 hover:rotate-0 transition-all duration-300 ease-in-out mt-7 " ><ArrowRight size={35} /></button>

                            </div>
                        ))
                    }

                </div>

            </section>
        </div>
    )
}