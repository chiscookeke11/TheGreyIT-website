import { CourseDataTypes } from "@/types/types"





interface CourseCardProps{
    data: CourseDataTypes
}


export default function CourseCard({data} : CourseCardProps) {
    return (
        <div className="bg-green-700 h-full flex items-start px-4 py-5 flex-col gap-2 rounded-2xl " >
            <h3 className="text-black text-xl lg:text-2xl font-extrabold font-syne">{data.courseTitle} </h3>
            <p className=" text-sm lg:text-base  font-poppins ">{data.description} </p>
        </div>
    )
}