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
        <div className="w-full h-full max-w-3xl flex-col lg:flex-row bg-white rounded-xl flex items-center gap-2 lg:gap-5 overflow-hidden font-poppins shadow-md " >

            {/* course image */}
            <div className="basis-2/5 h-full hidden md:flex items-center justify-center relative" >
                <Image src={"/basketball.png"} alt="image" fill className="object-cover object-center" />
            </div>


            {/* couse text */}

            <div className="basis-3/5 flex items-start flex-col gap-1 py-4 pr-7 pl-4  " >
                <div>
                    <h5 className=" font-syne font-semibold text-xl  " >{data.title} </h5>
                    <p className="font-normal text-base text-gray-600 " >{data.description} </p>
                </div>

                <ul className="w-full flex items-center flex-wrap justify-between gap-3 text-sm font-normal mb-6 mt-3" >
                    <li className="flex items-center gap-1" ><Timer size={20} color="gray" /> {data.duration} </li>
                    <li> {data.rating} </li>


                </ul>

                <div className="w-full flex  items-center  justify-between my-2 mt-6 py-2 pt-7 border-t-[2px] border-gray-300 gap-2 " >
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
        const CACHE_KEY = "coursesData"
        const CACHE_DURATION = 1000 * 60 * 5

        const cachedCourses = localStorage.getItem(CACHE_KEY)

        if (cachedCourses) {
            const parsed = JSON.parse(cachedCourses)


            // checking expiry (5 Minutes)
            if (Date.now() - parsed.timestamp < CACHE_DURATION) {
                setCoursesData(parsed.data)
                return; // use cached, no need to fetch
            }
            else {
                localStorage.removeItem(CACHE_KEY)
            }
        }


        // if no cachedCourses or not expired then we fetch fresh data
        const fetchCourses = async () => {
            try {

                const res = await fetch("/api/courses")
                const data = await res.json()
                setCoursesData(data)
                localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }))
            }
            catch (error) {
                console.error(error)
            }
        }

        fetchCourses()
    }, [])





    return (
        <div className="h-full w-full text-black bg-white " >


{/* Courses page hero section  */}
            <div className="w-full h-screen flex items-center justify-center relative bg-no-repeat bg-cover bg-center text-white font-poppins  " style={{ backgroundImage: 'url("/courses-page/hero-img-2.webp")' }}  >
                <div className="w-full h-full absolute inset-0 bg-gradient-to-b from-[rgba(4,9,30,0.5)] to-[rgba(4,9,30,0.5)] z-10 " />




                <div className=" w-full h-full absolute inset-0 flex items-center justify-center flex-col gap-5 z-20 text-center p-4 " >
                    <div className="w-full max-w-5xl text-center space-y-6 " >
                        <h1 className="text-2xl md:text-4xl font-bold" >Master in-demand tech skills in 9 months with hands-on training and expert mentorship.</h1>
                        <p>Gain real-world experience, mentorship, and become a master of your craft.</p>
                    </div>


                    <Button>Register Now</Button>
                </div>

            </div>



            <h2 className="font-bold text-2xl lg:text-[36px] leading-[100%] text-[#000] max-w-md font-syne mb-5  ">All Courses</h2>

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

                        <div className="w-full bg-[#f2f5fc] grid grid-cols-1 md:grid-cols-2 place-items-center justify-items-center gap-8 lg:gap-16 px-7 py-12 h-full rounded-sm " >
                            {coursesData.map((course) => (
                                <CourseCard key={course.id} data={course} />
                            ))}



                        </div>
                    )
            }

        </div>
    )
}