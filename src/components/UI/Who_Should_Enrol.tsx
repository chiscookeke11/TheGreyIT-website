import { CourseDataTypes } from "@/types/types"
import { Dot } from "lucide-react"



interface Who_Should_EnrolProps {
    currentCourse: CourseDataTypes | null
}

export default function Who_Should_Enrol({ currentCourse }: Who_Should_EnrolProps) {
    return (
        <div className="space-y-5" >
            <h4 className=" text-lg md:text-xl font-semibold  " >Who Should Enrol</h4>

            <ul className=" flex items-start flex-col gap-3 w-full max-w-3xl pl-5  " >
                {
                    currentCourse?.Who_Should_Enrol?.map((data, index) => (
                        <li key={index} className="text-sm font-medium  text-gray-900 flex items-start gap-4 " ><Dot size={20} /> {data}</li>
                    ))
                }
            </ul>

        </div>
    )
}
