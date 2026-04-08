import { CohortCourseTypes } from "@/types/types"
import Image from "next/image"


interface CohortCourseCardProps {
    data: CohortCourseTypes
}



export default function CohortCourseCard({ data }: CohortCourseCardProps) {
    return (
        <div className="w-full h-full flex flex-col items-start justify-start gap-4  overflow-hidden font-lora text-gray-700 bg-white "  >
            <Image src={data.image} alt="the image " height={500} width={500} className=" w-full h-[260px] object-center object-cover " />



            <div className=" w-full flex flex-col items-start gap-3 px-2 py-7  "    >


                <h3 className=" text-lg font-bold  " > {data.title} </h3>

                <div className=" w-full flex flex-wrap items-center gap-3 "  >


                    <span className=" font-semibold text-sm   ">Online(live): ₦{data.online_fee.toLocaleString()} </span>
                    <span className=" font-semibold text-sm   " >In-house(classroom): ₦{data.inhouse_fee.toLocaleString()}   </span>
                    <span className=" bg-[#f2f5fc] px-4 py-1 font-medium text-sm rounded-[100px]  "  >{data.duration} weeks </span>

                </div>
            </div>
        </div>
    )
}