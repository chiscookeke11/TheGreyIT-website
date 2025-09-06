import { CourseDataTypes } from "@/types/CourseDataType"




interface CourseCardProps{
    data: CourseDataTypes
}


export default function CourseCard({data} : CourseCardProps) {
    return (
        <div className="bg-red-700 h-full" >
            course card
        </div>
    )
}