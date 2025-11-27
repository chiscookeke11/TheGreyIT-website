"use client"

import TransactionsTable from "@/components/user/TransactionsTable"
import { useAppContext } from "@/context/AppContext"
import { BookOpen, CircleCheckBig, GraduationCap } from "lucide-react"
import Link from "next/link"





export default function Page() {
    const { userData, allCoursesData } = useAppContext()

    return (
        <div className="w-full h-full flex flex-col gap-7 items-center justify-center font-poppins" >



            {/* Summary Tab */}
            <div className="w-full flex flex-col items-start gap-10 rounded-xl bg-[#f2f5fc] py-7 px-6 " >
                <h1 className=" text-xl md:text-2xl font-semibold text-black   " >Summary</h1>

                <hr className="w-full border-t border-gray-400 " />


                <div className=" h-full min-h-[150px] w-full flex flex-col lg:flex-row items-center justify-evenly gap-5 md:gap-10 px-2 " >

                    <button className="w-full lg:max-w-[350px] h-full flex flex-row items-center justify-start gap-5 py-12 px-5 rounded-sm bg-white border border-gray-300 " >
                        <BookOpen size={35} />
                        <h3 className="text-start text-base md:text-xl font-medium " > <span className="text-2xl font-semibold" > {userData?.list_enrolled_courses.length ?? "0"}</span><br /> Enrolled Courses</h3>

                    </button>


                    <button className="w-full lg:max-w-[350px] h-full flex flex-row items-center justify-start gap-5 py-12 px-5 rounded-sm bg-white border border-gray-300 " >
                        <GraduationCap size={35} />
                        <h3 className="text-start text-base md:text-xl font-medium " > <span className="text-2xl font-semibold" > {allCoursesData?.length ?? 0}+</span><br /> Active Courses</h3>

                    </button>


                    <button className="w-full lg:max-w-[350px] h-full flex flex-row items-center justify-start gap-5 py-12 px-5 rounded-sm bg-white border border-gray-300 " >
                        <CircleCheckBig size={35} />
                        <h3 className="text-start text-base md:text-xl font-medium " > <span className="text-2xl font-semibold " >{userData?.list_completed_courses?.length ?? 0}</span> <br /> Completed Courses</h3>

                    </button>

                </div>

            </div>



            {/* Transactions Tab */}
            <div className="w-full flex flex-col items-start gap-10 rounded-xl bg-[#f2f5fc] py-7 px-6 " >
                <div className="w-full flex items-center justify-between" >
                    <h1 className=" text-xl md:text-2xl font-semibold text-black   " >Transactions</h1>
                    <Link
                        className="bg-gray-700 w-fit text-white text-sm px-4 py-2 lg:text-start rounded-md hover:bg-gray-600 transition-all duration-300 ease-in-out cursor-pointer  block"
                        href={"/user/transactions"} > See More</Link>
                </div>

                <hr className="w-full border-t border-gray-400 " />

                {/* Transaction Table */}
                <TransactionsTable />
            </div>


        </div>
    )
}