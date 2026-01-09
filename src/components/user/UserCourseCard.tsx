"use client"

import { useAppContext } from "@/context/AppContext";
import { toggleBookmark } from "@/lib/appActions";
import { CourseDataTypes } from "@/types/types";
import { BookOpenCheck, Clock, Heart, Radio } from "lucide-react";
import Image from "next/image";
import React, { SetStateAction } from "react";
import toast from "react-hot-toast";
import RatingStars from "./ReviewStarsComponent";


interface UserCourseCardProps {
    track: CourseDataTypes;
    bookmarks?: number[] | null
    setbookmarks?: React.Dispatch<React.SetStateAction<number[] | null>>
    isBookmarked: boolean;
    setBookmarkedCourses?: React.Dispatch<SetStateAction<CourseDataTypes[] | null>>
    no_of_reviews?: number | null;
}



export default function UserCourseCard({ track, bookmarks, setbookmarks, isBookmarked, setBookmarkedCourses, no_of_reviews }: UserCourseCardProps) {

    const { userData } = useAppContext()


    // calling the bookmarking function
    const handleBookmarkClick = async (course_id: string, user_id: string) => {



        const updatedBookmarks = await toggleBookmark(user_id, course_id)

        if (updatedBookmarks) {
            setbookmarks?.(updatedBookmarks)
        }

        if (!updatedBookmarks.includes(course_id)) {
            setBookmarkedCourses?.((prev) => prev ? prev?.filter((course) => course.id !== course_id) : null)
            toast.success("Course removed from your wishlist")
        }

        else toast.success("Course added to your wishlist")

    }


    return (
        <div className=" w-full  max-w-sm overflow-hidden bg-white h-full  flex flex-col items-start gap-4 rounded-md shadow-sm group relative " >
            {/* Course image */}
            <div className="w-full h-[220px] bg-gray-400 flex items-center justify-center rounded-xs overflow-hidden" >
                <Image src={track.imageUrl} alt={`${track.title}-image`} height={500} width={500} className=" w-full h-full object-center object-cover rounded-xs group-hover:scale-110 duration-300 ease-in-out transition-all " />

            </div>


            {/* Course description */}
            <div className="w-full flex flex-col gap-3 items-start p-3 " >
                <div className="w-full flex items-center justify-between text-sm  " >
                    {
                        track.is_active ? (
                            <small className=" flex items-center gap-2 text-red-600 " ><Radio size={20} /> Live</small>
                        )
                            :
                            (
                                <small className=" flex items-center gap-2 text-green-500 " ><BookOpenCheck size={20} /> Completed</small>
                            )
                    }

                    <small className=" flex shrink-0 items-center justify-end gap-2 text-gray-600"><Clock size={18} />
                        <ul>
                            {track?.duration?.map((duration, index) => (
                                <li key={index} > {duration} </li>
                            ))}
                        </ul>
                    </small>
                </div>

                <h3 className="text-base font-semibold  " >{track.title} </h3>


                <div className="flex flex-col items-start gap-2" >
                    {
                        !track.onlineFee || track.onlineFee < 0 ?
                            null :
                            (
                                <h4 className=" text-xs font-medium text-red-600  " ><span className="text-black" >Online(Live):</span> &#8358; {track.onlineFee.toLocaleString()} </h4>
                            )
                    }


                    {
                        track.inhouseFee && (
                            <h4 className=" text-xs font-medium text-red-600  " > <span className="text-black" >In-House(Classroom):</span> &#8358; {track.inhouseFee.toLocaleString()} </h4>
                        )
                    }


                </div>


                <hr className="w-full border-t border-gray-400  " />
                <div className="w-full flex items-center justify-between text-sm " >
                    {no_of_reviews || no_of_reviews === 0 ? (<p>Total reviews: <span className="font-semibold" >{no_of_reviews}</span></p>) : (<RatingStars ratingValue={track.rating} size={20} readonly={true} />)}

                </div>


            </div>

            {/* Bookmark button  */}
            {bookmarks && <button
                onClick={(e) => {
                    e.preventDefault()
                    handleBookmarkClick(track.id ?? "", userData?.user_id ?? "")
                }
                }
                className={`absolute outline-0 top-3 right-4 z-10 rounded-sm p-4 flex items-center justify-center text-gray-700 cursor-pointer bg-white   `} >
                <Heart size={20} color="white" fill={isBookmarked ? "red" : "black"} />

            </button>}
        </div>
    )
}