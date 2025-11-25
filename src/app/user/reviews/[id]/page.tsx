"use client"

import ReviewCard from "@/components/user/ReviewCard"
import RatingStars from "@/components/user/ReviewStarsComponent"
import { mockReviews } from "@/data/ReviewData"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"



export default function Page() {
    const router = useRouter()
    // const [currentReview, setCurrentReview] = useState





    return (
        <div className="w-full rounded-xl bg-[#f2f5fc] py-7 px-6  " >

            <button
            onClick={() => router.back()}
             className="h-12 w-12 flex items-center justify-center bg-gray-700 rounded-full font-bold cursor-pointer text-white hover:bg-gray-500 transition-all duration-300 ease-in-out " ><ArrowLeft /></button>

            {/* mini hero section  */}
            <div className=" w-full  flex items-center flex-col gap-2 " >
                <h3>Course name</h3>
                <h1 className="font-extrabold text-5xl my-3 " >4.0</h1>

                <RatingStars ratingValue={4} />

                <p className="text-sm font-medium text-gray-600 text-center " >based on 23 reviews </p>

                <div className="w-full flex flex-col items-start gap-3" >

                </div>

                <hr className=" border-gray-400 border my-5 mb-8 w-full  " />



            </div>



            {/* the reviews from user  */}
            <div className="w-full   grid grid-cols-1 xl:grid-cols-2 place-items-center gap-10" >


                {/* the review card  */}

                {mockReviews.map((review, index) => (
 <ReviewCard data={review}  />
                ))}

            </div>

        </div>
    )
}