"use client"

import React, { useActionState, useState } from "react";
import RatingStars from "../user/ReviewStarsComponent";
import Button from "./Button";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";
import { XIcon } from "lucide-react";



interface ReviewModalProps {
    id: number
}

export default function ReviewModal({ id }: ReviewModalProps) {

    const [reviewMessage, setReviewMessage] = useState("")
    const [rating, setRating] = useState(0);




    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const { error } = await supabase.from("userReviews").insert({
            userName: "Okeke Nedu",
            userImage: "https://x.com/chisco_JS/photo",
            review: "I am testing this feature",
            userRating: rating,
            userReviewDate: Date.now().toLocaleString(),
            courseId: id
        })

        if (error) {
            console.error("Failed to submit", error)
            return toast.error("Failed to submit review")
        }

        else {
            toast.success("Success!")
        }
    }


    return (
        <div className=" w-full flex items-center justify-center h-screen fixed inset-0 bg-black/25 backdrop-blur-2xl z-50 " >

            <form onSubmit={handleSubmit} className=" w-full max-w-2xl bg-white rounded-md px-3 py-7 flex items-center flex-col gap-5  " >
                <button className=" ml-auto cursor-pointer " type="button"  > <XIcon size={35} /> </button>

                <h2 className="text-2xl font-semibold text-gray-700" >Kindly review this course</h2>
                <h5 className="text-3xl font-medium text-gray-700 " >{rating}</h5>
                <div className=" w-full flex flex-col items-start gap-5 " >

                    <span className="flex flex-col gap-1 items-start text-lg " >
                        Rate this course
                        <div className="w-fit flex items-end gap-4" >
                            <RatingStars readonly={false} ratingValue={rating} size={25} onChange={(rate) => setRating(rate)} />
                        </div>
                    </span>


                    <textarea name="reviewMessage" id="reviewMessage" value={reviewMessage} onChange={(e) => setReviewMessage(e.target.value)} className="w-full h-full outline-0 border border-gray-700 rounded-sm px-4 py-6" rows={6} placeholder="Enter your comment" >

                    </textarea>

                    <Button variant="outline" className="font-syne !bg-gray-700 text-white! ml-auto ">Leave a review</Button>

                </div>
            </form>
        </div>
    )
}