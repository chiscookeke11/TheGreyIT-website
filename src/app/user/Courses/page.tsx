"use client"


import {Spinner} from "@/components/UI/Spinner"
import UserCourseCard from "@/components/user/UserCourseCard"
import { useAppContext } from "@/context/AppContext"
import { supabase } from "@/lib/supabaseClient"
import { CourseDataTypes } from "@/types/types"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"




export default function Page() {
    const { userData, allCoursesData } = useAppContext()
    const [enrolledCourses, setEnrolledCourse] = useState<CourseDataTypes[] | null>(null)
    const [completedCourses, setCompletedCourses] = useState<CourseDataTypes[] | null>(null)
    const [courseType, setCourseType] = useState(allCoursesData)
    const [bookmarks, setbookmarks] = useState<number[] | null>(null)




    // useEffect to update the list of all courses when it has been fetched
    useEffect(() => {
        setCourseType(allCoursesData)
    }, [allCoursesData])





    // function to fetch enrolled courses from db
    const fetchEnrolledCourse = async () => {
        const courses = userData?.list_enrolled_courses

        const { data, error } = await supabase.from("course").select("*").in("id", courses ?? [])

        if (error) {
            console.error("Error")
        }

        else {
            setEnrolledCourse(data)
        }
    }



    // function to fetch all completed courses
    const fetchCompletedCourse = async () => {
        const courses = userData?.list_completed_courses
        const { data, error } = await supabase.from("course").select("*").in("id", courses ?? [])

        if (error) {
            console.error("Error")
        }

        else {
            setCompletedCourses(data)
        }
    }



    useEffect(() => {

        if (userData) {
            fetchEnrolledCourse()
            fetchCompletedCourse()
            setbookmarks(userData.bookmarks)
        }
    }, [userData])



    return (
        <div className="w-full h-full flex flex-col gap-7 items-center justify-center font-poppins" >
            {/* Courses Tab */}
            <div className="w-full flex flex-col items-start gap-10 rounded-xl bg-[#f2f5fc] py-7 px-6 " >
                <h1 className=" text-xl md:text-2xl font-semibold text-black   " >Courses</h1>

                <hr className="w-full border-t border-gray-400 " />

                <div className=" w-full flex items-center gap-6 flex-wrap " >

                    <button onClick={() => setCourseType(allCoursesData)}
                        className={`font-syne   hover:bg-transparent hover:text-gray-700   px-6 py-2  flex items-center justify-center font-medium  focus:outline-none cursor-pointer text-sm   border-[1px]  transition-all duration-300 ease-in-out border-gray-700 rounded-sm ${courseType === allCoursesData ? "bg-transparent text-gray-700 " : "bg-gray-700 text-white"} `} >ACTIVE COURSES</button>

                    <button
                        onClick={() => setCourseType(enrolledCourses)}
                        className={`font-syne   hover:bg-transparent hover:text-gray-700   px-6 py-2  flex items-center justify-center font-medium  focus:outline-none cursor-pointer text-sm   border-[1px]  transition-all duration-300 ease-in-out border-gray-700 rounded-sm ${courseType === enrolledCourses ? "bg-transparent text-gray-700" : "bg-gray-700 text-white"} `} >ENROLLED COURSES</button>


                    <button
                        onClick={() => setCourseType(completedCourses)}
                        className={`font-syne  hover:bg-transparent hover:text-gray-700   px-6 py-2  flex items-center justify-center font-medium  focus:outline-none cursor-pointer text-sm   border-[1px]  transition-all duration-300 ease-in-out border-gray-700 rounded-sm ${courseType === completedCourses ? "bg-transparent text-gray-700" : "bg-gray-700 text-white"} `} >COMPLETED COURSES</button>

                </div>


                {
                    !allCoursesData ?
                        <div className=" w-full h-[30vh] flex items-center justify-center " >
                            <Spinner />
                        </div>
                        :
                        courseType && courseType.length < 1 ?
                            <div className="w-full flex flex-col gap-7 items-center justify-center h-[50vh] " >
                                <Image src={"/user/not-found-error-alert-svgrepo-com.svg"} alt="icon" height={500} width={500} className=" w-[250px] h-[250px] object-center " priority />
                                No course found </div>
                            :
                            (
                                <section className=" w-full mt-5  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center justify-items-center gap-5 gap-y-9 font-poppins " >

                                    {courseType?.map((track, index) => (
                                        // Course card
                                        <Link href={` /user/Courses/${track.id} `} className="w-full"           key={index} >
                                            <UserCourseCard
                                                track={track}
                                                bookmarks={bookmarks}
                                                setbookmarks={setbookmarks}
                                                isBookmarked={bookmarks?.includes(Number(track.id)) ?? false}
                                            />
                                        </Link>
                                    ))}


                                </section>

                            )
                }


            </div>





        </div>
    )
}