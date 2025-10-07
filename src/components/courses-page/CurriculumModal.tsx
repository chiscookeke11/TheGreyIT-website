"use client"


import { CourseDataTypes } from "@/types/types";
import { X } from "lucide-react";
import { SetStateAction, useEffect, useState } from "react";


interface CurriculumModalProps {
    setShowModal: React.Dispatch<SetStateAction<boolean>>
    selectedCourse: string | undefined
}

export default function CurriculumModal({ setShowModal, selectedCourse }: CurriculumModalProps) {
    const [courseData, setCourseData] = useState<CourseDataTypes | null>(null)
    const CACHE_KEY = "coursesData"


    useEffect(() => {
        const cached = localStorage.getItem(CACHE_KEY)

        if (cached && selectedCourse !== undefined) {
            const parsedData = JSON.parse(cached)
            const course = parsedData.data.find(
                (item: CourseDataTypes) => item.id === selectedCourse
            )
            setCourseData(course)
        }

    }, [selectedCourse])





    return (
        <section className=" w-full bg-black/44 fixed inset-0 h-screen flex items-center justify-center px-[3%] py-5 font-poppins " >



            <div className="w-full max-w-2xl h-fit max-h-full bg-[#f2f5fc] overflow-y-auto rounded-lg flex items-start flex-col gap-7 px-5 py-10  " >
                <button onClick={() => setShowModal(false)} className="cursor-pointer ml-auto  " ><X /> </button>




                <h2 className="font-semibold text-xl md:text-2xl text-gray-700 mx-auto " >{courseData?.title} Curriclum</h2>

                <ul className=" w-full flex gap-2 items-start flex-col  " >
                    <li className=" w-full flex items-center justify-start gap-4 text-lg font-normal text-black" >
                        <span className=" w-3 h-3 bg-gray-700 rotate-45   " />
                        <span>WebDesign  </span> </li>
                </ul>




            </div>


        </section>
    )
}