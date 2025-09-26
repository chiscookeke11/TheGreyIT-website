"use client"

import Button from "@/components/UI/Button"
import Spinner from "@/components/UI/Spinner"
import { CourseDataTypes } from "@/types/types"
import { Timer } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"



interface CourseCardProps {
    data: CourseDataTypes
}

const CourseCard = ({ data }: CourseCardProps) => {



    return (
        <div className="w-full h-full max-w-3xl bg-white rounded-xl flex items-center gap-5 overflow-hidden font-poppins shadow-md " >

            {/* course image */}
            <div className="basis-2/5 h-full flex items-center justify-center relative" >
                <Image src={"/basketball.png"} alt="image" fill className="object-cover object-center" />
            </div>


            {/* couse text */}

            <div className="basis-3/5 flex items-start flex-col gap-1 py-4 pr-7  " >
                <div>
                    <h5 className=" font-syne font-semibold text-xl  " >{data.title} </h5>
                    <p className="font-normal text-base text-gray-600 " >{data.description} </p>
                </div>

                <ul className="w-full flex items-center justify-between gap-3 text-sm font-normal mb-6 mt-3" >
                    <li className="flex items-center gap-1" ><Timer size={20} color="gray" /> {data.duration} </li>
                    <li> {data.rating} </li>
                    <li>Prop !</li>
                    <li>Prop !</li>
                    <li>Prop !</li>

                </ul>

                <div className="w-full flex items-center justify-between my-2 mt-6 py-2 pt-7 border-t-[2px] border-gray-300 " >
                    <p className="text-lg font-bold text-gray-700  ">NGN {data.price.toLocaleString()} </p>

                    <Button variant="default" className="!bg-gray-700 !text-white !text-sm " >View more</Button>

                </div>
            </div>

        </div>
    )
}


export default function Page() {
    const [coursesData, setCoursesData] = useState<CourseDataTypes[] | null>(null)


    useEffect(() => {
        fetch("/api/courses")
            .then((res) => res.json())
            .then((data) => setCoursesData(data))
            .catch((err) => console.error("Fetch error:", err))
    }, [])





    return (
        <div className="h-full w-full text-black bg-white pt-20 px-[3%] " >
            <h2 className="font-bold text-2xl lg:text-[36px] leading-[100%] text-[#000] max-w-md font-syne mt-10 mb-5  ">All Courses</h2>

            {!coursesData ?
                (
                    <div className=" w-full h-screen flex items-center justify-center bg-[#f2f5fc] " >
                        <Spinner />

                    </div>)
                : coursesData.length < 1 ? (
                    <div className=" w-full h-screen flex items-center justify-center bg-[#f2f5fc] " >
                        <p className="font-normal text-lg text-gray-700 " >No courses found!</p>

                    </div>
                )
                    :
                    (

                        <div className="w-full bg-[#f2f5fc] grid grid-cols-1 place-items-start gap-8 px-7 py-12 h-full rounded-sm " >
                            {coursesData.map((course, index) => (
                                <CourseCard key={course.id} data={course} />
                            ))}



                        </div>
                    )
            }

        </div>
    )
}