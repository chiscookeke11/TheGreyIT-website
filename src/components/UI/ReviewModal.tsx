"use client"

import React, { useEffect, useRef, useState } from "react";
import RatingStars from "../user/ReviewStarsComponent";
import Button from "./Button";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";
import { XIcon } from "lucide-react";
import { User } from "@supabase/supabase-js";




const Spinner = () => {
    return (
        <div className="h-5 w-5 rounded-full border-4 border-gray-white border-t-transparent animate-spin duration-150 ease-in-out transition-all " />
    )
}



interface ReviewModalProps {
    id: number;
    setShowReviewModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ReviewModal({ id, setShowReviewModal }: ReviewModalProps) {
    const [user, setUser] = useState<User | null>(null)
    const cachedUser = useRef<User | null>(null)
    const [reviewMessage, setReviewMessage] = useState("")
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({
        star: "",
        textError: ""
    })


    // the user name
    const userName = user?.user_metadata.first_name ?
        user?.user_metadata.first_name.charAt(0).toUpperCase() + user?.user_metadata.first_name.slice(1).toLowerCase() +
        " " + user?.user_metadata.last_name.charAt(0).toUpperCase() + user?.user_metadata.last_name.slice(1).toLowerCase()

        :
        user?.email


    // The user profile image
    const userImage = user?.app_metadata.provider === "google" && user.user_metadata.avatar_url ? user.user_metadata.avatar_url : "hhfdjhdf"





    useEffect(() => {
        const initAuth = async () => {
            setLoading(true)
            const { data: { session } } = await supabase.auth.getSession()
            const currentUser = session?.user ?? null
            cachedUser.current = currentUser
            setUser(currentUser)
            setLoading(false)

            // listen for auth changes
            const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
                const updatedUser = session?.user ?? null
                cachedUser.current = updatedUser
                setUser(updatedUser)
            })

            return () => {
                listener.subscription.unsubscribe()
            }
        }

        initAuth()
    }, [])




    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()


        const newErrors = {
            star: "",
            textError: ""
        };


        if (!rating) {
            newErrors.star = "Please rate the course";
        }


        if (!reviewMessage) {
            newErrors.textError = "Please provide a text";
        }

        // Check if there are any errors
        if (newErrors.star || newErrors.textError) {
            setError(newErrors);
            return;
        }


        setLoading(true)

        // 1. Check if review already exists
        const { data: existingReview } = await supabase
            .from("userReviews")
            .select("*")
            .eq("userId", user?.id)
            .eq("courseId", id)
            .maybeSingle();

        if (existingReview) {
            setLoading(false)
            return toast.error("You have already reviewed this course.");
        }



        const { error } = await supabase.from("userReviews").insert({
            userName: userName,
            userImage: userImage,
            review: reviewMessage,
            userRating: rating,
            userReviewDate: new Date().toISOString().split("T")[0],
            courseId: id,
            user_id: user?.id
        })

        if (error) {
            console.error("Failed to submit", error)
            setLoading(false)
            return toast.error("Failed to submit review")
        }

        else {
            toast.success("Success!")
            setLoading(false)
            setRating(0)
            setReviewMessage("")
            setError({
                star: "",
                textError: ""
            })
        }
    }


    return (
        <div className=" w-full flex items-center justify-center h-screen fixed inset-0 bg-black/25 backdrop-blur-2xl z-50 px-[4%] py-7 " >

            <form onSubmit={handleSubmit} className=" w-full max-w-2xl bg-white rounded-md px-5 py-7 flex items-center flex-col gap-5  " >
                <button onClick={() => setShowReviewModal(false)} className=" ml-auto cursor-pointer " type="button"  > <XIcon size={35} /> </button>

                <h2 className="text-2xl font-semibold text-gray-700" >Kindly review this course</h2>
                <h5 className="text-3xl font-medium text-gray-700 " >{rating}</h5>
                <div className=" w-full flex flex-col items-start gap-5 " >

                    <span className="flex flex-col gap-1 items-start text-lg " >
                        Rate this course
                        <div className="w-fit flex items-end gap-4" >
                            <RatingStars readonly={false} ratingValue={rating} size={25} onChange={(rate) => setRating(rate)} />
                        </div>
                        <p className="text-sm text-red-500 " >{error.star} </p>
                    </span>


                    <textarea name="reviewMessage" id="reviewMessage" value={reviewMessage} onChange={(e) => setReviewMessage(e.target.value)} className="w-full h-full outline-0 border border-gray-700 rounded-sm px-4 py-6" rows={6} placeholder="Enter your comment" >

                    </textarea>
                    <p className="text-sm text-red-500 ">{error.textError} </p>

                    <Button variant="outline" className="font-syne !bg-gray-700 text-white! ml-auto "> {loading ? <Spinner /> : "Submit"} </Button>

                </div>
            </form>
        </div>
    )
}