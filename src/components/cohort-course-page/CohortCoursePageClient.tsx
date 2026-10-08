"use client"

import CohortCourseCard from "@/components/UI/CohortCourseCard";
import { supabase } from "@/lib/supabaseClient";
import { CohortCoursePreview, CohortCourseTypes } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Spinner } from "../UI/Spinner";
import IntroCourseCTASection from "./IntroCourseCTASection";



export default function CohortCoursePageClient() {
    const [courses, setCourses] = useState<CohortCoursePreview[] | null>(null)
    const [loading, setLoading] = useState(true)

    // This function fetches data from the cohort course table
    const fetchCourses = async () => {
        try {
            const response = await fetch("/api/cohort/courses");

            if (!response.ok) {
                throw new Error("Failed to fetch cohort courses");
            }

            const result = await response.json();

            setCourses(result);
        } catch (error) {
            console.error("Error fetching cohort courses:", error);
            toast.error("Failed to fetch cohort courses!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses()
    }, [])

    return (
        <div className="w-full min-h-screen  flex flex-col items-start gap-8  pt-24 md:pt-40 pb-16 px-[2%] lg:px-[4%]  bg-[#f2f5fc] ">
            <div className=" flex flex-col gap-1 font-poppins items-start  ">
                <h1 className="  text-2xl   md:text-3xl font-semibold text-gray-900 ">Cohort 2026 </h1>
                <p className="text-gray-600 font-medium text-sm md:text-lg   ">Available courses for this cohort</p>
            </div>

            <section className=" w-fit h-full flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 gap-y-10 place-items-start justify-items-start  py-4 px-3 ">
                {loading ? (
                    <div className="w-full h-full min-h-36 flex items-center justify-center md:col-span-3 lg:col-span-5">
                        <Spinner />
                    </div>
                ) : (
                    courses?.map((course, index) => (
                        <Link key={index} href={`/cohort2026/${course.slug}`} className=" w-full h-full max-w-[350px] ">
                            <CohortCourseCard data={course} />
                        </Link>
                    ))
                )}
            </section>


            <IntroCourseCTASection />

        </div>
    )
}
