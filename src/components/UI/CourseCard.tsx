import { CourseDataTypes } from "@/types/types"
import Image from "next/image"






interface CourseCardProps {
    data: CourseDataTypes
}


export default function CourseCard({ data }: CourseCardProps) {
    return (
        <div className=" h-[90%] md:h-[100%] overflow-hidden min-w-xs flex items-start justify-end flex-col gap-2 rounded-2xl relative overflow-hidden  text-gray-700 " style={{ backgroundColor: data.bgColor }}  >
            <div className="w-full z-20 flex flex-col gap-2 items-start px-4 py-5 bg-white/55 backdrop-blur-2xl " >
                <h3 className=" text-xl lg:text-2xl font-extrabold font-syne z-20 ">{data.title} </h3>
                <p className=" text-sm lg:text-base  font-poppins z-20">{data.description} </p>
            </div>
            <Image src={"/basketball.png"} alt={`${data.title}-image`} height={500} width={500} className="absolute bottom-0 left-[50%] translate-x-[-50%] w-full h-full object-center object-cover  " />
        </div>
    )
}