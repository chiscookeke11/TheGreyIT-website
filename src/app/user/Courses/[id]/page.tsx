"use client"

import Course_Format from "@/components/UI/Course_Format";
import DescriptionSection from "@/components/UI/DescriptionSection";
import PostGraduation from "@/components/UI/PostGraduation";
import Projects from "@/components/UI/Projects";
import { Spinner } from "@/components/UI/Spinner";
import Who_Should_Enrol from "@/components/UI/Who_Should_Enrol";
import { useAppContext } from "@/context/AppContext";
import { useAuthUser } from "@/hooks/useAuthUser";
import { supabase } from "@/lib/supabaseClient";
import { CourseDataTypes } from "@/types/types";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";





export default function Page() {
    const [currentTab, setCurrentTab] = useState("description")
    const { id } = useParams()
    const [currentCourse, setCurrentCourse] = useState<CourseDataTypes | null>(null)
    const { setShowPaymentModal, showPaymentModal, setSelectedCourse, isEnrolled, setIsEnrolled, setEnrolledNumber, enrolledNumber } = useAppContext()
    const [loading, setLoading] = useState(false)
    const { user, loading: authLoading } = useAuthUser()



    // function to check enrollment status
    const checkEnrollmentStatus = async () => {
        if (!user || !currentCourse) return;

        const { data } = await supabase
            .from("course_enrollments")
            .select("id")
            .eq("user_id", user.id)
            .eq("course_id", currentCourse.id)
            .single();

        setIsEnrolled(!!data);
    };



    // function to count enrolled users

    const countEnrolledUsers = async () => {
        if (!currentCourse) return;

        const { count } = await supabase
            .from("course_enrollments")
            .select("*", { count: "exact", head: true })
            .eq("course_id", currentCourse.id);

        setEnrolledNumber(count ?? 0);
    };



    useEffect(() => {
        checkEnrollmentStatus()
        countEnrolledUsers()
    }, [currentCourse, user])




    // Here we fetch the current course details
    useEffect(() => {

        setLoading(true)

        const fetchCourseDetails = async () => {
            const { data, error } = await supabase.from("course").select("*").eq("id", id).single()

            if (error) {
                // console.error(error)
                setLoading(false)
            }

            else {
                setCurrentCourse(data)
                setLoading(false)
            }
        }

        fetchCourseDetails()
    }, [id])

      useEffect(() => {

        document.body.style.overflowY = showPaymentModal ? "hidden" : "auto"

        return () => {
            document.body.style.overflowY = "auto"
        }

    }, [showPaymentModal])





    if (authLoading || loading) {
        return (
            <>
                <div className="w-full h-screen flex flex-col gap-8 items-center justify-center py-10 px-5" >


                    <p className="text-gray-700 text-xl font-medium text-center " >Fetching course details </p>
                    <Spinner />


                </div>
            </>
        )
    }


    return (
        <div className="w-full h-full bg-[#f2f5fc] pt-16   rounded-xl space-y-40  " >


            <section className="w-full  flex flex-col md:flex-row  md:items-center gap-16 justify-between px-4 md:px-7 " >

                <div className="flex flex-col  items-start gap-4 md:flex-1" >
                    <Image
                        src="/about-us/THEGREYIT-LOGO-2-2048x359.png"
                        alt="Riskified team collaborating"
                        width={1500}
                        height={1500}
                        className=" w-[100px] md:w-[200px]  object-cover object-center rounded-sm mb-4 "
                        priority
                    />

                    <h1 className=" text-2xl md:text-3xl font-semibold text-gray-700 "  > {currentCourse?.title} </h1>
                    <p className=" lg:w-[75%] text-sm md:text-base text-gray-600 " > {currentCourse?.description} </p>



                    {
                        isEnrolled ? (
                            <button
                                className="font-syne py-2 px-10 mt-5 rounded-md border border-gray-700 cursor-pointer
               hover:bg-gray-700 hover:text-white transition"
                            >
                                Access Course Resources
                            </button>) :
                            (
                                <button onClick={() => {
                                    setShowPaymentModal(true)
                                    setSelectedCourse(currentCourse)
                                }}
                                    className="font-syne py-2 px-10 mt-5 rounded-[100px] border border-gray-700 cursor-pointer
               hover:bg-gray-700 hover:text-white transition"
                                >
                                    Enrol
                                </button>
                            )
                    }



                    {enrolledNumber && enrolledNumber > 0 ? (
                        <p className="text-sm">
                            <span className="font-bold">
                                {enrolledNumber}
                            </span>{" "}
                            already enrolled
                        </p>
                    )
                        :
                        null
                    }
                </div>



                {/* right side  */}
                {currentCourse?.imageUrl && (
                    <div className="w-full max-w-sm bg-gray-400 h-[420px] hidden lg:block  " >
                        <Image src={currentCourse?.imageUrl} alt={`${currentCourse?.title}-image`} height={1000} width={1000} className="w-full h-full object-cover object-center " />
                    </div>
                )}
            </section>


            {/* section two  */}
            <section className="w-full bg-white flex flex-col items-start gap-12 py-16 px-4 md:px-7 " >


                {/* info belt  */}
                <div
                    className="
                                    w-[98%] mx-auto
                    grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6
                    items-center
                    justify-between
                    gap-6
                    shadow-xl rounded-xl py-8 px-2.5 md:px-5
                    bg-white
                    mt-[-32%] sm:mt-[-24%] lg:mt-[-9%]
                    text-sm
                " >
                    <div className="flex w-fit flex-col items-start gap-0.5" >
                        <h6 className="font-semibold text-sm " >Course Fees</h6>
                        <ul className="mt-1 flex items-start gap-1 flex-col " >
                            {
                                currentCourse?.onlineFee && currentCourse.onlineFee > 0 ?
                                    (
                                        <li className="text-xs  text-gray-600"><span className="font-bold" >Online Fee:</span> ₦{currentCourse?.onlineFee?.toLocaleString()} </li>
                                    )
                                    :
                                    null
                            }
                            {
                                currentCourse?.inhouseFee && currentCourse.inhouseFee > 0 ?
                                    (
                                        <li className="text-xs  text-gray-600"><span className="font-bold" >Inhouse Fee</span>: ₦{currentCourse?.inhouseFee?.toLocaleString()} </li>
                                    )
                                    :
                                    null
                            }
                        </ul>
                    </div>

                    <div className="flex w-fit flex-col items-start gap-0.5" >
                        <h6 className="font-semibold text-sm " >Skill Level</h6>
                        <p className="text-xs  text-gray-600" > {currentCourse?.skill_level} </p>
                    </div>

                    <div className="flex w-fit flex-col items-start gap-0.5">
                        <h6 className="font-semibold text-sm ">Duration</h6>
                        <ul>
                            {currentCourse?.duration?.map((duration, index) => (
                                <li key={index} className="text-xs  text-gray-600"  > {duration} </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex w-fit flex-col items-start gap-0.5">
                        <h6 className="font-semibold text-sm "> Learning Mode</h6>
                        <p className="text-xs  text-gray-600" >{currentCourse?.learning_mode}</p>
                    </div>


                    <div className="flex w-fit flex-col items-start gap-0.5">
                        <h6 className="font-semibold text-sm ">Certificate</h6>
                        <p className="text-xs  text-gray-600" >Yes</p>
                    </div>

                    <div className="flex w-fit flex-col items-start gap-0.5">
                        <h6 className="font-semibold text-sm ">{currentCourse?.rating} </h6>
                        <p className="text-xs  text-gray-600" >({currentCourse?.total_reviews} reviews)</p>
                    </div>

                </div>


                {/* the section tab  */}
                <div className="w-full flex items-center gap-4 md:gap-10 flex-wrap " >
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


            </section>


        </div>
    )
}
