"use client"

import { supabase } from "@/lib/supabaseClient";
import { CohortCourseTypes } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Spinner } from "../UI/Spinner";

const INTRO_FEE = 10000;

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
        <div className="w-full min-h-screen flex flex-col items-start gap-8 pt-24 md:pt-40 pb-16 px-[2%] md:px-[6%] bg-[#f2f5fc] font-poppins">
            <div className="flex flex-col gap-2 items-start max-w-3xl">
                <h1 className="text-2xl md:text-4xl font-semibold text-gray-900">Quick Intro Courses</h1>
                <p className="text-gray-700 text-sm md:text-base">
                    Pick any course for a quick-start intro session. Every intro class costs just <span className="font-semibold">₦{INTRO_FEE.toLocaleString()}</span>.
                </p>
                <p className="text-gray-600 text-xs md:text-sm">You will follow the same registration and payment flow as the cohort registration.</p>
            </div>

            <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {loading ? (
                    <div className="w-full min-h-36 flex items-center justify-center md:col-span-2 lg:col-span-3">
                        <Spinner />
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
                                    className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 transition"
                                >
                                    Register & Pay
                                </Link>
                            </div>
                        </article>
                    ))
                )}
            </section>
        </div>
    )
}
