"use client"

import { supabase } from "@/lib/supabaseClient";
import { CohortCourseTypes } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Spinner } from "../UI/Spinner";
import Image from "next/image";

const INTRO_FEE = 15000;

export default function IntroCoursePageClient() {
    const [courses, setCourses] = useState<CohortCourseTypes[] | null>(null)
    const [loading, setLoading] = useState(true)

    const fetchCourses = async () => {
        setLoading(true)

        const { data, error } = await supabase.from("cohort_2026_courses").select("*")

        if (error) {
            toast.error("Failed to load intro courses! Please reload page")
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
        <div className="w-full min-h-screen flex flex-col items-start gap-14 pb-16  bg-[#f2f5fc] font-poppins">

            {/* hero section  */}
            <div className="w-full h-[95vh] flex items-center justify-center relative bg-no-repeat bg-cover bg-center text-white font-poppins  " style={{ backgroundImage: 'url("/courses-page/hero-img-2.webp")' }}  >
                <div className="w-full h-full absolute inset-0 bg-gradient-to-b from-[rgba(4,9,30,0.5)] to-[rgba(4,9,30,0.5)] z-10 " />




                <div className=" w-full h-full absolute inset-0 flex items-center justify-center flex-col gap-5 z-20 text-center p-4 " >
                    <div className="w-full max-w-5xl text-center space-y-6 " >
                        <h1 className="text-2xl md:text-4xl font-bold" >Quick Intro Courses</h1>
                        <p className="text-lg text-center font-medium text-white " >Pick any course for a quick-start intro session. Every intro class costs just ₦15,000.</p>
                    </div>
                </div>
            </div>

            <section className="px-[2%] md:px-[6%] flex flex-col items-start gap-8  " >

                <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {loading ? (
                        <div className="w-full min-h-36 flex items-center justify-center md:col-span-2 lg:col-span-3">
                            <Spinner />0
                        </div>
                    ) : (
                        courses?.map((course) => (
                            <article key={course.id} className="w-full bg-white rounded-xl border border-gray-200 px-5 py-5 shadow-sm flex flex-col gap-4">
                                <h2 className="text-lg md:text-xl font-semibold text-gray-900">{course.title}</h2>
                                <p className="text-sm text-gray-700 line-clamp-3">{course.description || "Quick intro class for this course."}</p>

                                <div className="mt-auto flex items-center justify-between gap-3">
                                    <p className="text-base font-semibold text-gray-900">₦{INTRO_FEE.toLocaleString()}</p>
                                    <Link
                                        href={`/intro/${course.slug}/register`}
                                        className="inline-flex items-center justify-center rounded-lg bg-gray-700 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600 transition"
                                    >
                                        Register
                                    </Link>
                                </div>
                            </article>
                        ))
                    )}
                </section>
            </section>

        </div>
    )
}
