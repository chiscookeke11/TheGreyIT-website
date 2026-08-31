"use client"

import { supabase } from "@/lib/supabaseClient"
import { CohortCourseTypes } from "@/types/types"
import { useCallback, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Spinner } from "../UI/Spinner"
import Link from "next/link"
import Image from "next/image"
import DescriptionSection from "../UI/DescriptionSection"
import Who_Should_Enrol from "../UI/Who_Should_Enrol"
import Course_Format from "../UI/Course_Format"
import Projects from "../UI/Projects"
import PostGraduation from "../UI/PostGraduation"
import IntroCourseCTASection from "./IntroCourseCTASection"




interface CohortCoursePageProps {
    slug: string
}

export default function DynamicCoursePageClient({ slug }: CohortCoursePageProps) {
    const [currentCourse, setCurrentCourse] = useState<CohortCourseTypes | null>(null)
    const [loading, setLoading] = useState(true);
    const [currentTab, setCurrentTab] = useState("description")

    const formatCurrency = (value: number) =>
        new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            maximumFractionDigits: 0,
        }).format(value)


    //   This function fetches the course details
    const fetchCourseDetails = useCallback(async () => {
        setLoading(true)

        const { data, error } = await supabase
            .from("cohort_2026_courses")
            .select("*")
            .eq("slug", slug)
            .maybeSingle()

        if (error) {
            setCurrentCourse(null);
            toast.error("Failed to load course data")
            setLoading(false)
            return;
        }

        if (!data) {
            setCurrentCourse(null)
            toast.error("Course data not found")
            setLoading(false)
            return
        }

        setCurrentCourse(data)
        setLoading(false)
    }, [slug])


    useEffect(() => {
        fetchCourseDetails()
    }, [fetchCourseDetails])


    if (loading) {
        return <div className="p-10 text-center font-poppins h-[90vh] flex items-center justify-center "> <Spinner /> </div>;
    }


    if (!currentCourse) {
        return (
            <div className="p-10 text-center font-poppins h-[50vh] flex items-center justify-center ">
                <h1 className="text-2xl font-bold">Course not found</h1>
            </div>
        );
    }


    return (
        <div className="w-full min-h-screen bg-white pt-24 md:pt-40 pb-16 px-[2%] md:px-[14%] font-poppins">
            <div className="w-full h-[48vh] relative overflow-hidden rounded-xl bg-gray-200">
                <Image
                    src={currentCourse.imageUrl || ""}
                    alt={currentCourse.title}
                    fill
                    className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/55" />

                <div className="absolute inset-0 z-10 flex flex-col gap-4 text-white px-[4%] items-start justify-center">
                    <p className="font-medium text-sm md:text-base tracking-wide">TECHNICAL COHORT 2026</p>
                    <h1 className="font-bold text-2xl md:text-5xl">{currentCourse.title}</h1>
                    {currentCourse.duration && (
                        <p className="text-sm md:text-base">Duration: {currentCourse.duration}</p>
                    )}
                </div>
            </div>

            <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
                <div className="lg:col-span-2 rounded-xl border border-gray-200 p-6 md:p-8">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-900">About this course</h2>
                    <p className="mt-4 text-sm md:text-base text-gray-700 leading-7">
                        {currentCourse.description || "Course description will be shared soon. Register now to secure your slot."}
                    </p>
                </div>

                <div className="rounded-xl border border-gray-200 p-6 md:p-8 h-fit">
                    <h3 className="text-lg font-semibold text-gray-900">Fee breakdown</h3>
                    <div className="mt-4 flex items-center justify-between text-sm text-gray-700">
                        <span>In-house</span>
                        <span className="font-medium text-gray-900">{formatCurrency(currentCourse.inhouse_fee)}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-sm text-gray-700">
                        <span>Online</span>
                        <span className="font-medium text-gray-900">{formatCurrency(currentCourse.online_fee)}</span>
                    </div>

                    <Link
                        href={`/cohort2026/${currentCourse.slug}/register`}
                        className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-gray-900 px-4 py-3 text-sm font-medium text-white hover:bg-gray-700 transition"
                    >
                        Register for this course
                    </Link>
                </div>
            </div>




            {/* the section tab  */}
            <div className="w-full flex items-center gap-4 md:gap-10 flex-wrap mt-20 mb-8 " >
                <button
                    onClick={() => setCurrentTab("description")}
                    className={` text-sm md:text-base font-semibold py-2 cursor-pointer ${currentTab === "description" ? "border-b-2 border-b-gray-700" : ""
                        }`}
                >
                    Description
                </button>

                <button
                    onClick={() => setCurrentTab("Who_Should_Enrol")}
                    className={` text-sm md:text-base  font-semibold py-2 cursor-pointer ${currentTab === "Who_Should_Enrol" ? "border-b-2 border-b-gray-700" : ""
                        }`}
                >
                    Who Should Enrol
                </button>

                <button
                    onClick={() => setCurrentTab("Course_Format")}
                    className={` text-sm md:text-base  font-semibold py-2 cursor-pointer ${currentTab === "Course_Format" ? "border-b-2 border-b-gray-700" : ""
                        }`}
                >
                    Course Format
                </button>


                <button
                    onClick={() => setCurrentTab("Projects")}
                    className={` text-sm md:text-base  font-semibold py-2 cursor-pointer ${currentTab === "Projects" ? "border-b-2 border-b-gray-700" : ""
                        }`}
                >
                    Projects You’ll Build
                </button>


                <button
                    onClick={() => setCurrentTab("post_graduation")}
                    className={` text-sm md:text-base  font-semibold py-2 cursor-pointer ${currentTab === "post_graduation" ? "border-b-2 border-b-gray-700" : ""
                        }`}
                >
                    Post Graduation
                </button>

            </div>


            {currentTab === "description" && <DescriptionSection currentCourse={currentCourse} />}
            {currentTab === "Who_Should_Enrol" && <Who_Should_Enrol currentCourse={currentCourse} />}
            {currentTab === "Course_Format" && <Course_Format currentCourse={currentCourse} />}
            {currentTab === "Projects" && <Projects currentCourse={currentCourse} />}
            {currentTab === "post_graduation" && <PostGraduation currentCourse={currentCourse} />}



            {/* Intro courses CTA section  */}
            <IntroCourseCTASection/>

        </div>
    )
}
