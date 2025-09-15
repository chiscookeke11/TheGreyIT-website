import { CourseDataTypes } from "@/types/types"
import Image from "next/image"





interface CourseCardProps{
    data: CourseDataTypes
}


export default function CourseCard({data} : CourseCardProps) {
    return (
        <div className=" h-full flex items-start px-4 py-5 flex-col gap-2 rounded-2xl relative overflow-hidden "  style={{backgroundColor: data.bgColor, color: data.bgColor === "black" ? "white" : "black"}}  >
            <h3 className=" text-xl lg:text-2xl font-extrabold font-syne">{data.courseTitle} </h3>
            <p className=" text-sm lg:text-base  font-poppins ">{data.description} </p>
            {/* <Image src={"/basketball.png"} alt={`${data.courseTitle}-image`} height={500} width={500} className="absolute bottom-0 left-[50%] translate-x-[-50%] w-full h-[55%] object-center object-cover  "  /> */}
        </div>
    )
}