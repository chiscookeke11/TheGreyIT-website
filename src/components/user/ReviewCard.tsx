import { reviewDataType } from "@/types/types";
import Image from "next/image";
import RatingStars from "./ReviewStarsComponent";


interface ReviewCardProps {
    data: reviewDataType
}

export default function ReviewCard({ data }: ReviewCardProps) {

    const reviewDate = new Date(data.userReview.userReviewDate)
    const now = Date.now()

    // Difference in milliseconds
    const diffMs = now - reviewDate.getTime()

    // Convert to days
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))



    return (
        <div className=" w-full max-w-2xl flex flex-col   gap-3 bg-white px-4 py-9 rounded-sm " >
            {/* the card header  */}
            <div className="w-full  flex flex-col md:flex-row items-start md:items-end md:justify-between gap-4 " >

                <div className="flex gap-4 items-center " >
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-amber-950 overflow-hidden " >
                        <Image src={"/basketball.png"} alt="user image" height={500} width={500} className="w-full h-full object-center" />
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold" >{data.userReview.userName}</h4>
                        <RatingStars ratingValue={data.userReview.userRating} size={15} />
                    </div>
                </div>

                <p className="text-xs font-semibold text-gray-600 " > {diffDays} days ago</p>

            </div>

            {/* card body  */}
            <p className="text-sm font-normal text-gray-600 " >{data.userReview.review}            </p>


        </div>
    )
}