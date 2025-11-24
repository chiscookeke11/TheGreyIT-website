"use client"

import ReviewCard from "@/components/user/ReviewCard"
import Image from "next/image"


export default function Page() {



    return (
        <div className="w-full rounded-xl bg-[#f2f5fc] py-7 px-6  " >
            {/* mini hero section  */}
            <div className=" w-full  flex items-center flex-col gap-2 " >
                <h3>Course name</h3>
                <h1 className="font-extrabold text-4xl my-3 " >4.0</h1>
                <div>Stars here</div>
                <p className="text-sm font-medium text-gray-600 " >based on 23 reviews </p>

                <div>
                    <span>Excellent</span>
                </div>

                <hr className=" border-gray-400 border my-5 mb-8 w-full  " />



            </div>



            {/* the reviews from user  */}
            <div className="w-full   grid grid-cols-1 xl:grid-cols-2 place-items-center gap-10" >


                {/* the review card  */}
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />

            </div>

        </div>
    )
}