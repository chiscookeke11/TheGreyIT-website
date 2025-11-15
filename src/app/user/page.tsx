"use client"

import { BookOpen } from "lucide-react"





export default function Page() {
    return (
        <div className="w-full h-full flex flex-col gap-7 items-center justify-center font-poppins" >



            {/* Summary Tab */}
            <div className="w-full flex flex-col items-start gap-10 rounded-xl bg-[#f2f5fc] py-7 px-6 " >
                <h1 className=" text-xl md:text-2xl font-semibold text-black   " >Summary</h1>

                <hr className="w-full border-t border-gray-400 " />



                <div className=" h-full min-h-[150px] w-full flex flex-col md:flex-row items-center justify-evenly gap-5 md:gap-10 px-2 " >

                    <button className="w-full max-w-[250px] h-full flex flex-row items-center justify-start gap-5 py-7 px-5 rounded-sm bg-white border border-gray-300 " >
                        <BookOpen />
                        <h3 className="text-start" >{0}<br /> Enrolled Courses</h3>

                    </button>


                    <button className="w-full max-w-[250px] h-full flex flex-row items-center justify-start gap-5 py-7 px-5 rounded-sm bg-white border border-gray-300 " >
                        <BookOpen />
                        <h3 className="text-start" >{0}<br /> Enrolled Courses</h3>

                    </button>


                    <button className="w-full max-w-[250px] h-full flex flex-row items-center justify-start gap-5 py-7 px-5 rounded-sm bg-white border border-gray-300 " >
                        <BookOpen />
                        <h3 className="text-start" >{0}<br /> Enrolled Courses</h3>

                    </button>

                </div>

            </div>



            {/* Transactions Tab */}
            <div className="w-full flex flex-col items-start gap-10 rounded-xl bg-[#f2f5fc] py-7 px-6 " >
                <div className="w-full flex items-center justify-between" >
                    <h1 className=" text-xl md:text-2xl font-semibold text-black   " >Transactions</h1>

                    <button>See More...</button>
                </div>

                <hr className="w-full border-t border-gray-400 " />

            </div>


        </div>
    )
}