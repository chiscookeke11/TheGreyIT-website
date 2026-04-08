"use client"

import CohortCourseCard from "@/components/UI/CohortCourseCard";
import { supabase } from "@/lib/supabaseClient";
import { CohortCourseTypes } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Spinner } from "../UI/Spinner";

export default function CohortCoursePageClient() {
    const [courses, setCourses] = useState<CohortCourseTypes[] | null>(null)
    const [loading, setLoading] = useState(true)

    // This function fetches data from the cohort course table
    const fetchCourses = async () => {
        setLoading(true)

        const { data, error } = await supabase.from("cohort_2026_courses").select("*")

        if (error) {
            console.log("Error fetching courses", error)
            toast.error("Failed to load courses! Please reload page")
            setLoading(false)
            return;
        }

        if (!data) {
            toast.error("No courses found");
            setLoading(false)
            return;
        }

        setCourses(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchCourses()
    }, [])

    return (
        <div className="w-full min-h-screen  flex flex-col items-start gap-8  pt-24 md:pt-40 pb-16 px-[2%]  bg-[#f2f5fc] ">
            <div className=" flex flex-col gap-1 font-poppins items-start  ">
                <h1 className="  text-2xl   md:text-3xl font-semibold text-gray-900 ">Cohort 2026 </h1>
                <p className="text-gray-600 font-medium text-sm md:text-lg   ">Available courses for this cohort</p>
            </div>

            <section className=" w-full h-full flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 gap-y-10 place-items-start justify-items-start  py-4 px-3 ">
                {loading ? (
                    <div className="w-full h-full min-h-36 flex items-center justify-center md:col-span-3 lg:col-span-5">
                        <Spinner/>
                    </div>
                ) : (
                    courses?.map((course, index) => (
                        <Link key={index} href={`/cohort2026/${course.slug}`} className=" w-full h-full max-w-[350px] ">
                            <CohortCourseCard data={course} />
                        </Link>
                    ))
                )}
            </section>
        </div>
    )
}