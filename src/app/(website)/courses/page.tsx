"use client"

import CurriculumModal from "@/components/courses-page/CurriculumModal"
import Button from "@/components/UI/Button"
import Spinner from "@/components/UI/Spinner"
import { CourseOverview } from "@/data/CourseData"
import { CourseDataTypes } from "@/types/types"
import { Timer } from "lucide-react"
import Image from "next/image"
import React, { SetStateAction, useEffect, useState } from "react"
import Marquee from "react-fast-marquee";



interface CourseCardProps {
    data: CourseDataTypes
    setShowModal: React.Dispatch<SetStateAction<boolean>>
    setSelectedCourse: React.Dispatch<SetStateAction<string | undefined>>
}


const highlights = [
    "Master In-Demand Tech Skills",
    "Build Real-World Projects",
    "Learn With Expert Mentors",
    "Online & In-Person Cohorts",
    "Join a Vibrant Tech Community",
    "Get a Strong Portfolio",
    "Launch Your Career in Tech"
]


// Course card component
const CourseCard = ({ data, setShowModal, setSelectedCourse }: CourseCardProps) => {
    return (
        <div key={data.id} className="w-full h-fit py-10 flex flex-col md:flex-row items-center justify-between gap-10 px-5 max-w-7xl font-poppins  " >

            <div className="flex flex-col items-start gap-2 w-full max-w-md lg:max-w-xl " >
                <h5 className=" font-syne font-bold text-2xl lg:text-3xl  " > {data.title} </h5>

                <ul className="w-full flex flex-col items-start flex-wrap justify-between gap-3 text-base font-semibold mb-6 mt-3" >
                    <li className="flex items-center gap-1" ><span className="flex items-center gap-3 " ><Timer size={18} color="gray" /> Duration:</span>  {data.duration} </li>
                    <li>Fee: ${data.price} </li>
                    <li> {data.rating} </li>


                </ul>


                <Button variant="default" className=" w-full !rounded-[100px] text-sm lg:text-base " >Register</Button>
                <Button variant="default" onClick={() => {
                    setShowModal(true)
                    setSelectedCourse(data.id)
                }} className="w-full !rounded-[100px] !bg-gray-700 !text-white !text-sm !lg:text-base " >View Curriculum</Button>
            </div>



            {/* right side  */}
            <div className=" w-full max-w-xs lg:max-w-[400px] h-[350px] lg:h-[477px] bg-gray-700 relative rounded-md  " >


                <div className=" absolute top-[-15px] left-[-15px] flex items-start justify-center py-4 bg-white w-full h-full rounded-md " >
                    <Image src={"/basketball.png"} height={500} width={500} alt={`${data.title}-image`} className=" w-11/12 h-11/12 lg:h-9/12 object-cover object-center rounded-sm " />
                </div>
            </div>

        </div>

    )
}


export default function Page() {
    const [coursesData, setCoursesData] = useState<CourseDataTypes[] | null>(null)
    const [showModal, setShowModal] = useState(false)
    const [selectedCourse, setSelectedCourse] = useState<string | undefined>("")

    console.log("The selected course ID", selectedCourse)


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
        <div className="h-full w-full text-black bg-white relative " >


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

            {/* The Scrolling text */}
            <div className=" w-full py-4 flex items-center justify-center text-white bg-gray-700 font-poppins " >
                <Marquee speed={50} >
                    <ul className="w-full  flex items-center justify-between gap-10 text-sm md:text-base font-medium " >
                        {highlights.map((info, i) => (
                            <li key={i} > {info} </li>
                        ))}
                    </ul>
                </Marquee>

            </div>





            {/* Course description section  */}
            <section className=" w-full h-fit py-14 md:py-28 px-[4%]  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center justify-items-center gap-10 font-poppins " >

                {CourseOverview.map((track, index) => (
                    <div key={index} className=" w-full bg-[#f2f5fc] h-full py-6 px-5 flex flex-col items-start gap-4 rounded-lg shadow-sm " >
                        <span className=" h-10 w-10 md:h-14 md:w-14 flex items-center justify-center bg-gray-700 text-white rounded-sm font-medium text-lg md:text-xl text-left shadow-xl " >{index + 1} </span>
                        <h3 className=" font-syne font-bold text-xl  " > {track.title} </h3>
                        <p className=" font-normal text-base   md:mt-1 " >{track.description} </p>
                    </div>
                ))}


            </section>







            <section className=" w-full flex flex-col items-center gap-10 bg-[#f2f5fc] py-20 " >
                <h2 className="font-bold text-2xl lg:text-[36px] leading-[100%] text-[#000] max-w-md font-syne mb-3  ">Course Tracks</h2>

                {!coursesData ?
                    (
                        <div className=" w-full h-screen flex items-center justify-center  " >
                            <Spinner />

                        </div>)
                    : coursesData.length < 1 ? (
                        <div className="w-full h-screen flex items-center justify-center bg-[#f2f5fc] " >
                            <p className="font-medium text-lg text-gray-700 " >No courses found!</p>

                        </div>
                    )
                        :
                        (

                            <div className="w-full bg-[#f2f5fc] grid grid-cols-1  place-items-center justify-items-center gap-8 lg:gap-16 px-[4%] py-5 h-full rounded-sm " >
                                {coursesData.map((course) => (
                                    <CourseCard key={course.id} data={course} setShowModal={setShowModal} setSelectedCourse={setSelectedCourse} />

                                ))}



                            </div>
                        )
                }
            </section>
            {showModal && <CurriculumModal setShowModal={setShowModal} selectedCourse={selectedCourse} />}
        </div>
    )
}