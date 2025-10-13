import { OurImpactData } from "@/data/OurImpactData";
import { Heart } from "lucide-react";



export default function OurImpact() {
    return (
        <div className=" w-full h-fit flex flex-col items-center justify-center gap-7 py-18 px-[3%] " >
            <h1 className=" text-xl md:text-3xl  font-syne font-semibold text-gray-700" >Our Impact</h1>
            <p className="text-gray-500 text-base md:text-lg font-poppins  text-center" >The numbers that refect our commitment to excellence and growth. </p>



            <section className=" w-full mt-10 h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 place-items-center justify-items-center p-1  " >

                {OurImpactData.map((data, i) => (
                    <div key={i} className="w-full h-full flex flex-col items-start gap-4 py-6 px-7 bg-white rounded-xl shadow-lg " >
                        <span>{data.icon}</span>


                        <div className="space-y-1" >
                            <h3 className="font-syne text-lg font-semibold text-black "  >{data.title} </h3>
                            <p className=" font-poppins font-medium text-gray-500 text-base " > {data.content} </p>
                        </div>

                    </div>
                ))}

            </section>
        </div>
    )
}