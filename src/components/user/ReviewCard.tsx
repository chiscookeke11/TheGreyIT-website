import { reviewDataType } from "@/types/types";
import Image from "next/image";
import RatingStars from "./ReviewStarsComponent";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";


interface ReviewCardProps {
    data: reviewDataType
}

export default function ReviewCard({ data }: ReviewCardProps) {
    const [userImage, setUserImage] = useState<string | null>(null)
    const reviewDate = new Date(data.userReviewDate)
    const [now] = useState(() => Date.now())
    const user_id = data.user_id


    // Difference in milliseconds
    const diffMs = now - reviewDate.getTime()

    // Convert to days
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))




    // now we fetch the user details using the id
    useEffect(() => {
        const fetchUserImage = async () => {
            const { data, error } = await supabase.from("user_data").select("*").eq("user_id", user_id).single()

            if (error) {
                return;
            }
            setUserImage(data?.user_image ?? null)
        }

        fetchUserImage()
    }, [user_id])




    return (
        <div className=" w-full max-w-2xl flex flex-col   gap-3 bg-white px-4 py-9 rounded-sm " >
            {/* the card header  */}
            <div className="w-full  flex flex-col md:flex-row items-start md:items-end md:justify-between gap-4 " >

                <div className="flex gap-4 items-center " >
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-500 overflow-hidden " >
                        <Image src={userImage ? userImage : "/user/User-icon-vector-16.svg"} alt="user image" height={500} width={500} className="w-full h-full object-center object-cover " />
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold" >{data.userName}</h4>
                        <RatingStars readonly={true} ratingValue={data.userRating} size={15} />
                    </div>
                </div>

                <p className="text-xs font-semibold text-gray-600 " > {diffDays} days ago</p>

            </div>

            {/* card body  */}
            <p className="text-sm font-normal text-gray-600 " >{data.review}            </p>


        </div>
    )
}