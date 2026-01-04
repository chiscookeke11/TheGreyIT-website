import { CourseDataTypes } from "@/types/types"
import { Dot } from "lucide-react"




interface Course_FormatProps {
    currentCourse: CourseDataTypes | null
}

export default function Course_Format({ currentCourse }: Course_FormatProps) {
    return (
        <div className="space-y-5" >
            <h4 className=" text-lg md:text-xl font-semibold  " >Course Format</h4>
            <ul className=" grid grid-cols-1 md:grid-cols-2 justify-end justify-items-start place-items-center gap-6 gap-x-10 " >
                {currentCourse?.courseFormat?.map((data, index) => (
                    <li key={index} className="flex items-start gap-4 text-sm  " >
                        <Dot size={20} />
                        {data}
                    </li>
                ))}
            </ul>
        </div>
    )
}