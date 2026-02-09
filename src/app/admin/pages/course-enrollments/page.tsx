"use client"

import { Spinner } from "@/components/UI/Spinner";
import { useAppContext } from "@/context/AppContext";
import { fetchAllEnrollments } from "@/lib/appActions";
import { courseEnrollmentsDataType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";



export default function Page() {
    const [loading, setLoading] = useState(true)
    const [courseEnrollmentsData, setCourseEnrollmentsData] = useState<courseEnrollmentsDataType[] | null>(null)
    const { allCoursesData } = useAppContext()


    useEffect(() => {

        const fetchEnrollments = async () => {

            setLoading(true)

            const result = await fetchAllEnrollments()
            setCourseEnrollmentsData(result)
            setLoading(false)
            console.log(result)
        }

        fetchEnrollments()

    }, [])





    // This function gets the total number of students that enrolled in each course
    const getTotalEnrollments = (courseId: string) => {
        if (!allCoursesData) return;

        const numEnrolledInThisCourse = courseEnrollmentsData?.filter((enrolledCourse) => String(enrolledCourse.course_id) === String(courseId)).length || 0;
        return numEnrolledInThisCourse
    }



    // This function calculates the the total amount gotten for each course so far
    const calcTotalSales = (courseId: string) => {
        const enrollmentForCourse = courseEnrollmentsData?.filter((enrolledCourse) => String(enrolledCourse.course_id) === String(courseId));

        //   sum the total of these enrollments
        const totalAmount = enrollmentForCourse?.reduce((sum, course) => sum + course.amount, 0)

        return totalAmount?.toLocaleString();
    }

    return (
        <div className="w-full h-fit  py-7 px-6 flex flex-col items-start justify-start gap-10 font-poppins">
            <h1 className=" font-syne font-semibold text-2xl   ">Course Enrollments</h1>




            {loading ? (
                <div className="w-full h-[40vh] flex items-center justify-center">
                    <Spinner />
                </div>
            ) : allCoursesData && allCoursesData.length === 0 ? (
                <div className="w-full h-[40vh] flex items-center justify-center text-sm text-gray-400">
                    No applications found
                </div>
            ) : (
                <div className=" w-full h-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-start justify-items-center justify-center gap-7 gap-y-12 " >
                    {allCoursesData?.map((data) => (
                        <Link
                            href={`/admin/pages/course-enrollments/${data.id}`}
                            key={data.id}
                            className=" w-full h-full "
                        >
                            <div className=" w-full  max-w-sm overflow-hidden bg-white h-full  flex flex-col items-start gap-4 rounded-md shadow-sm group relative  hover:scale-105 duration-200 ease-in-out transition-all " >
                                {/* Course image */}
                                <div className="w-full h-[220px] bg-gray-400 flex items-center justify-center rounded-xs overflow-hidden" >
                                    <Image src={data.imageUrl} alt={`${data.title}-image`} height={500} width={500} className=" w-full h-full object-center object-cover rounded-xs group-hover:scale-110 duration-300 ease-in-out transition-all " />

                                </div>


                                {/* Course description */}
                                <div className="w-full flex flex-col gap-1 items-start p-3 " >
                                    <h1 className="text-sm font-medium text-gray-950 "  > <b>{data.title}</b> </h1>
                                    <h1 className="text-sm font-medium text-gray-950 ">Total Enrollments: {getTotalEnrollments(data.id ?? "")} </h1>
                                    <h1 className="text-sm font-medium text-gray-950 ">Total amount:  &#8358;{calcTotalSales(data.id ?? "")} </h1>

                                </div>
                            </div>

                        </Link>
                    ))}
                </div>
            )}


        </div>
    )
}