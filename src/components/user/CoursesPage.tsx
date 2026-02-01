"use client"


import { Spinner } from "@/components/UI/Spinner"
import UserCourseCard from "@/components/user/UserCourseCard"
import { useAppContext } from "@/context/AppContext"
import { supabase } from "@/lib/supabaseClient"
import { CourseDataTypes } from "@/types/types"
import { Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState } from "react"




export default function CoursesPageComponent() {
    const { userData, allCoursesData } = useAppContext()
    const [enrolledCourses, setEnrolledCourse] = useState<CourseDataTypes[] | null>(null)
    const [completedCourses, setCompletedCourses] = useState<CourseDataTypes[] | null>(null)
    const [courseType, setCourseType] = useState(allCoursesData)
    const [bookmarks, setbookmarks] = useState<number[] | null>(null)
    const [search, setSearch] = useState("")
    const [filteredCourses, setFilteredCourses] = useState<CourseDataTypes[] | null>(null)
    const KEY = "COURSE_KEY"
    const CACHE_DURATION = 10 * 60 * 1000




    // useEffect to update the list of all courses when it has been fetched
    useEffect(() => {
        setCourseType(allCoursesData)
    }, [allCoursesData])



    // Keep filteredCourses in sync when courseType changes
    useEffect(() => {
        setFilteredCourses(courseType)
    }, [courseType])






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




    // function to search for a course
    useEffect(() => {
        if (!courseType) {
            setFilteredCourses(null)
            return
        }

        const query = search.trim().toLowerCase()

        if (!query) {
            setFilteredCourses(courseType)
            return
        }

        const filtered = courseType.filter(course =>
            course.title.toLowerCase().includes(query)
        )

        setFilteredCourses(filtered)
    }, [search, courseType])





    return (
        <div className="w-full h-full flex flex-col gap-7 items-center justify-center font-poppins" >
            {/* Courses Tab */}
            <div className="w-full flex flex-col items-start gap-10 rounded-xl bg-[#f2f5fc] py-7 px-6 " >
                <h1 className=" text-xl md:text-2xl font-semibold text-black   " >Courses</h1>

                <hr className="w-full border-t border-gray-400 " />

                <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-10 " >

                    <div className=" w-full flex items-center gap-5 flex-wrap flex-1 " >

                        <button onClick={() => setCourseType(allCoursesData)}
                            className={`font-syne   hover:bg-transparent hover:text-gray-700   px-6 py-2  flex items-center justify-center font-medium  focus:outline-none cursor-pointer text-sm   border-[1px]  transition-all duration-300 ease-in-out border-gray-700 rounded-sm ${courseType === allCoursesData ? "bg-transparent text-gray-700 " : "bg-gray-700 text-white"} `} >ACTIVE COURSES</button>

                        <button
                            onClick={() => setCourseType(enrolledCourses)}
                            className={`font-syne   hover:bg-transparent hover:text-gray-700   px-6 py-2  flex items-center justify-center font-medium  focus:outline-none cursor-pointer text-sm   border-[1px]  transition-all duration-300 ease-in-out border-gray-700 rounded-sm ${courseType === enrolledCourses ? "bg-transparent text-gray-700" : "bg-gray-700 text-white"} `} >ENROLLED COURSES</button>


                        <button
                            onClick={() => setCourseType(completedCourses)}
                            className={`font-syne  hover:bg-transparent hover:text-gray-700   px-6 py-2  flex items-center justify-center font-medium  focus:outline-none cursor-pointer text-sm   border-[1px]  transition-all duration-300 ease-in-out border-gray-700 rounded-sm ${courseType === completedCourses ? "bg-transparent text-gray-700" : "bg-gray-700 text-white"} `} >COMPLETED COURSES</button>

                    </div>

                    <label className="w-full max-w-xs ml-auto lg:ml-0   flex gap-1 rounded-sm  py-2 px-3 border border-gray-700 text-gray-800 " htmlFor="search" >
                        <input
                            type="search"
                            name="search"
                            id="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full  outline-none focus:outline-none text-xs  "
                            placeholder="Search"
                        />
                        <button type="button" className="cursor-pointer" > <Search size={15} /> </button>
                    </label>
                </div>





                {
                    !allCoursesData ?
                        <div className=" w-full h-[30vh] flex items-center justify-center " >
                            <Spinner />
                        </div>
                        :
                        filteredCourses && filteredCourses.length < 1 ?
                            <div className="w-full flex flex-col gap-7 items-center justify-center h-[50vh] " >
                                <Image src={"/user/not-found-error-alert-svgrepo-com.svg"} alt="icon" height={500} width={500} className=" w-[250px] h-[250px] object-center " priority />
                                No course found </div>
                            :
                            (
                                <section className=" w-full mt-5  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center justify-items-center gap-5 gap-y-9 font-poppins " >

                                    {filteredCourses?.map((track, index) => (
                                        // Course card
                                        <Link href={` /user/Courses/${track.slug} `} className="w-full h-full" key={index} >
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