"use client"

import { Spinner } from "@/components/UI/Spinner"
import ReviewCard from "@/components/user/ReviewCard"
import RatingStars from "@/components/user/ReviewStarsComponent"
import { useAppContext } from "@/context/AppContext"
import { supabase } from "@/lib/supabaseClient"
import { CourseDataTypes, reviewDataType } from "@/types/types"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"



export default function Page() {
    const { id } = useParams()
    const router = useRouter()
    const { allCoursesData } = useAppContext()
    const [courseReviews, setCourseReviews] = useState<reviewDataType[] | null>(null)
    const [currentCourse, setCurrentCourse] = useState<CourseDataTypes | null>(null)







    const totalRating = courseReviews?.reduce((sum, review) => {
        return sum + review.userRating;
    }, 0) ?? 0;

    const overallRating = courseReviews && courseReviews.length > 0
        ? totalRating / courseReviews.length
        : 0;




    // Fetch the current course data
    useEffect(() => {
        if (!allCoursesData) return;

        const course = allCoursesData.find(
            (c) => String(c.id) === String(id)
        );

        setCurrentCourse(course || null)

    }, [allCoursesData, id])



    // This function fetched all the reviews for the current course using it's ID
    useEffect(() => {
        if (!currentCourse?.id) return;


        const fetchCourseReviews = async () => {
            const { data, error } = await supabase.from("userReviews").select("*").eq("courseId", currentCourse?.id)

            if (error) {

            }

            setCourseReviews(data)
        }

        fetchCourseReviews()

    }, [currentCourse])





    return (
        <div className="w-full rounded-xl bg-[#f2f5fc] py-7 px-6  " >

            <button
                onClick={() => router.back()}
                className="h-12 w-12 flex items-center justify-center bg-gray-700 rounded-full font-bold cursor-pointer text-white hover:bg-gray-500 transition-all duration-300 ease-in-out mb-6 " ><ArrowLeft /></button>



            {courseReviews && courseReviews.length < 1 && (<h3 className="font-bold text-2xl md:text-4xl text-gray-700 text-center " > {currentCourse?.title} Reviews </h3>)}
            {/* mini hero section  */}
            {courseReviews && courseReviews?.length > 0 && (
                <div className=" w-full  flex items-center flex-col gap-2 " >
                    <h3 className="font-bold text-2xl md:text-4xl text-gray-700 text-center " > {currentCourse?.title} Reviews </h3>
                    <h1 className="font-extrabold text-5xl my-3 " > {Number(overallRating.toFixed(1))} </h1>

                    <RatingStars readonly={true} ratingValue={4} />

                    <p className="text-sm font-medium text-gray-600 text-center " >based on {courseReviews.length} reviews </p>

                    <div className="w-full flex flex-col items-start gap-3" >

                    </div>

                    <hr className=" border-gray-400 border my-5 mb-8 w-full  " />



                </div>
            )}



            {/* the reviews from user  */}
            {!courseReviews ? (
                <div className=" w-full h-[30vh] flex items-center justify-center " >
                    <Spinner />
                </div>
            ) :
                courseReviews.length < 1 ? (
                    <div className="w-full flex flex-col gap-7 items-center justify-center h-[50vh] " >
                        <Image src={"/user/not-found-error-alert-svgrepo-com.svg"} alt="icon" height={500} width={500} className=" w-[250px] h-[250px] object-center " priority />
                        No review found </div>
                ) :
                    (
                        <div className="w-full   grid grid-cols-1 xl:grid-cols-2 place-items-center gap-10" >


                            {/* the review card  */}

                            {courseReviews?.map((review, index) => (
                                <ReviewCard data={review} key={index} />
                            ))}

                        </div>
                    )
            }


        </div>
    )
}