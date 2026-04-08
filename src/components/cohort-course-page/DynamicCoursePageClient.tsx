"use client"

import { supabase } from "@/lib/supabaseClient"
import { CohortCourseTypes } from "@/types/types"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Spinner } from "../UI/Spinner"
import Link from "next/link"




interface CohortCoursePageProps {
    slug: string
}

export default function DynamicCoursePageClient({ slug }: CohortCoursePageProps) {
    const [currentCourse, setCurrentCourse] = useState<CohortCourseTypes | null>(null)
    const [loading, setLoading] = useState(true);


    //   This function fetches the course details
    const fetchCourseDetails = async () => {

        const { data, error } = await supabase
            .from("cohort_2026_courses")
            .select("*")
            .eq("slug", slug)

        if (error) {
            setCurrentCourse(null);
            toast.error("Failed to load course data")
            setLoading(false)
            return;
        }

        if (!data) {
            toast.error("Course data not found")
        }

        setCurrentCourse(data[0])
        setLoading(false)
    }


    useEffect(() => {
        fetchCourseDetails()
    }, [])


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
        <div className=" w-full min-h-screen flex items-center justify-center flex-col gap-3  "  >

            {currentCourse?.title}

            <Link href={`/cohort2026/${currentCourse.slug}/register`} >
                Purchase this course
            </Link>
        </div>
    )
}