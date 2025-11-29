"use client"

import Button from "@/components/UI/Button";
import { useAppContext } from "@/context/AppContext";
import { sendPaymentConfirmationEmail } from "@/lib/appActions";
import { supabase } from "@/lib/supabaseClient";
import { CourseDataTypes, PaystackReference } from "@/types/types";
import { User } from "@supabase/supabase-js";
import { Check, Languages } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { PaystackButton } from 'react-paystack';







const Requirementsection = () => {
    return (
        <div className="space-y-5" >
            <h4 className=" text-lg md:text-2xl font-semibold  " >Requirements</h4>

            <ul className=" flex items-center flex-col gap-3 w-full max-w-3xl pl-5 list-disc  " >
                <li className="text-sm font-medium  text-gray-900 " > Basic programming experience (Python or JavaScript preferred)</li>
                <li className="text-sm font-medium  text-gray-900 " > Basic programming experience (Python or JavaScript preferred)</li>
                <li className="text-sm font-medium  text-gray-900 " > Basic programming experience (Python or JavaScript preferred)</li>
            </ul>

        </div>
    )
}




const CourseContentSection = () => {
    return (
        <div className="space-y-5" >
            <h4 className=" text-lg md:text-2xl font-semibold  " >Course content</h4>
            <Button variant="default" >Click to download course content</Button>


        </div>
    )
}




const DescriptionSection = () => {
    return (
        <>
            {/* What you will learn section  */}
            <div className="space-y-5" >
                <h4 className=" text-lg md:text-2xl font-semibold  " >What you will learn</h4>

                <ul className=" grid grid-cols-1 md:grid-cols-2 place-items-center gap-6 " >
                    <li className="flex items-start gap-4 text-sm md:text-base " > <Check size={35} /> How to build and deploy intelligent AI agents using Python, tools, memory, and reasoning.</li>
                    <li className="flex items-start gap-4 text-sm md:text-base"> <Check size={35} /> How to design trustworthy, responsible AI systems aligned with best practices.</li>
                    <li className="flex items-start gap-4 text-sm md:text-base"> <Check size={35} /> How to create custom GPTs and apply prompt engineering techniques for real-world tasks.</li>
                </ul>
            </div>



            {/* skills you will gain section  */}
            <div className="space-y-5" >
                <h4 className=" text-lg md:text-2xl font-semibold  " >Skills you&apos;ll gain</h4>

                <ul className=" flex items-center flex-wrap gap-4 w-full max-w-3xl   " >
                    <li className="flex items-center justify-center bg-[#f2f5fc] px-3 py-2 text-xs md:text-sm font-medium rounded-4xl text-gray-900 " > Artificial Intelligence</li>
                    <li className="flex items-center justify-center bg-[#f2f5fc] px-3 py-2 text-xs md:text-sm font-medium rounded-4xl " > Artificial Intelligence</li>
                    <li className="flex items-center justify-center bg-[#f2f5fc] px-3 py-2 text-xs md:text-sm font-medium rounded-4xl " > Artificial Intelligence</li>
                    <li className="flex items-center justify-center bg-[#f2f5fc] px-3 py-2 text-xs md:text-sm font-medium rounded-4xl " > Artificial Intelligence</li>
                    <li className="flex items-center justify-center bg-[#f2f5fc] px-3 py-2 text-xs md:text-sm font-medium rounded-4xl " > Artificial Intelligence</li>
                    <li className="flex items-center justify-center bg-[#f2f5fc] px-3 py-2 text-xs md:text-sm font-medium rounded-4xl " > Artificial Intelligence</li>
                </ul>
            </div>



            {/* Details to know section  */}
            <div className="space-y-5" >
                <h4 className=" text-lg md:text-2xl font-semibold  " >Details to know</h4>

                <div className="w-fit flex items-center gap-12 " >

                    <div className="flex items-start flex-col gap-1 " >
                        <Image src={"/logos/linkedin.png"} height={1000} width={1000} alt="LinkedIn logo" className=" w-8 h-8 " />
                        <h5 className=" text-sm md:text-base font-semibold mt-4" >Shareable certificate</h5>
                        <p className="text-gray-500 text-xs md:text-sm" >Add to your LinkedIn profile</p>

                    </div>



                    <div className="flex items-start flex-col gap-1 " >
                        <Languages size={35} />
                        <h5 className="text-sm md:text-base font-semibold  mt-4">Taught in English</h5>
                        <p className="text-gray-500 text-xs md:text-sm">26 languages available</p>

                    </div>



                </div>
            </div>
        </>
    )
}






export default function Page() {
    const [currentTab, setCurrentTab] = useState("description")
    const { id } = useParams()
    const [currentCourse, setCurrentCourse] = useState<CourseDataTypes | null>(null)
    const [user, setUser] = useState<User | null>(null)
    const cachedUser = useRef<User | null>(null)
    const public_key = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!
    const { userData } = useAppContext()


    useEffect(() => {
        const initAuth = async () => {
            // setLoading(true)
            const { data: { session } } = await supabase.auth.getSession()
            const currentUser = session?.user ?? null
            cachedUser.current = currentUser
            setUser(currentUser)
            // setLoading(false)

            // listen for auth changes
            const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
                const updatedUser = session?.user ?? null
                cachedUser.current = updatedUser
                setUser(updatedUser)
            })

            return () => {
                listener.subscription.unsubscribe()
            }
        }

        initAuth()
    }, [])




    // Here we fetch the current course details
    useEffect(() => {
        const fetchCourseDetails = async () => {
            const { data, error } = await supabase.from("course").select("*").eq("id", id).single()


            if (error) {
                console.error(error)
            }

            else {
                console.log(data)
                setCurrentCourse(data)
            }
        }

        fetchCourseDetails()
    }, [id])



    // the paystack config
    const config = {
        reference: (new Date()).getTime().toString(),
        email: user?.email ?? "",
        amount: currentCourse?.price ? currentCourse.price * 100 : 0,
        publicKey: public_key,
    };



    const handlePaystackSuccessAction = async (reference: PaystackReference) => {
        console.log(reference);

        // store this transaction in the transaction table
        const { data, error } = await supabase.from("transactions").insert({
            reference: reference.reference,
            status: reference.status,
            date: new Date().toISOString(),
            user_id: user?.id,
            course: currentCourse?.title,
            course_id: currentCourse?.id,
        })

        if (error) {
            toast.error("Failed!")
            console.error(error)
        }
        else {
            console.log(data)
            toast.success("Payment successful!")



            // add the course id to the users enrolled courses array
            const updatedList = [
                ...(userData?.list_enrolled_courses || []),
                currentCourse?.id
            ]

            const { data: updateData, error: updateError } = await supabase.from("user_data").update({
                list_enrolled_courses: updatedList
            }).eq("user_id", user?.id)

            if (updateError) {
                console.error(updateError)
            }

            else {
                console.log(updateData)
                window.location.reload();


                // Then finally send the confirmation email

                try {
                    await sendPaymentConfirmationEmail({
                        name: user?.user_metadata?.full_name ?? user?.email ?? "Learner",
                        email: user?.email ?? "",
                        course_title: currentCourse?.title ?? "",
                        reference: reference.reference,
                        status: reference.status,
                        date: new Date().toLocaleString(),
                        dashboard_link: `${process.env.NEXT_PUBLIC_APP_URL}/user/courses/${id}`
                    });
                } catch (err) {
                    console.error("Failed to send confirmation email", err);
                }

            }
        }
    };


    // you can call this function anything
    const handlePaystackCloseAction = () => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        console.log('closed')
    }


    const componentProps = {
        ...config,
        text: 'Enroll',
        onSuccess: (reference: PaystackReference) => handlePaystackSuccessAction(reference),
        onClose: handlePaystackCloseAction,
    };



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

                    <div className=" text-sm md:text-sm" > Instructor: Abel Chidera Emmanuel   </div>



                    <PaystackButton {...componentProps} className=" font-syne py-2! px-10 my-1 mt-5 rounded-[100px]! border border-gray-700 cursor-pointer hover:bg-gray-700 hover:text-white transition-all duration-300 ease-in-out " />
                    <p className="text-sm" ><span className="font-bold">26,684</span> already enrolled</p>
                </div>



                {/* right side  */}
                <div className="w-full max-w-xs bg-amber-500 h-[420px] hidden lg:block  " >
                    Image here
                </div>




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
                    mt-[-35%] sm:mt-[-27%] lg:mt-[-12%]
                    text-sm
                " >
                    <div className="flex w-fit flex-col items-start gap-0.5" >
                        <h6 className="font-semibold text-sm md:text-base" >Skill Level</h6>
                        <p className="text-xs md:text-base text-gray-600" >intermediate</p>
                    </div>

                    <div className="flex w-fit flex-col items-start gap-0.5">
                        <h6 className="font-semibold text-sm md:text-base">Duration</h6>
                        <p className="text-xs md:text-base text-gray-600" >  {currentCourse?.duration} </p>
                    </div>

                    <div className="flex w-fit flex-col items-start gap-0.5">
                        <h6 className="font-semibold text-sm md:text-base"> Learning Mode</h6>
                        <p className="text-xs md:text-base text-gray-600" >Online</p>
                    </div>

                    <div className="flex w-fit flex-col items-start gap-0.5">
                        <h6 className="font-semibold text-sm md:text-base">Hours</h6>
                        <p className="text-xs md:text-base text-gray-600" >15 hours per week</p>
                    </div>

                    <div className="flex w-fit flex-col items-start gap-0.5">
                        <h6 className="font-semibold text-sm md:text-base">Certificate</h6>
                        <p className="text-xs md:text-base text-gray-600" >Yes</p>
                    </div>

                    <div className="flex w-fit flex-col items-start gap-0.5">
                        <h6 className="font-semibold text-sm md:text-base">4.8</h6>
                        <p className="text-xs md:text-base text-gray-600" >(521 reviews)</p>
                    </div>

                </div>









                {/* the section tab  */}
                <div className="w-full flex items-center gap-4 md:gap-10 flex-wrap " >
                    <button
                        onClick={() => setCurrentTab("description")}
                        className={` text-sm md:text-lg font-semibold py-2 cursor-pointer ${currentTab === "description" ? "border-b-2 border-b-gray-700" : ""
                            }`}
                    >
                        Description
                    </button>

                    <button
                        onClick={() => setCurrentTab("requirements")}
                        className={` text-sm md:text-lg  font-semibold py-2 cursor-pointer ${currentTab === "requirements" ? "border-b-2 border-b-gray-700" : ""
                            }`}
                    >
                        Requirements
                    </button>

                    <button
                        onClick={() => setCurrentTab("content")}
                        className={` text-sm md:text-lg  font-semibold py-2 cursor-pointer ${currentTab === "content" ? "border-b-2 border-b-gray-700" : ""
                            }`}
                    >
                        Course Content
                    </button>

                </div>


                {currentTab === "description" && <DescriptionSection />}
                {currentTab === "requirements" && <Requirementsection />}
                {currentTab === "content" && <CourseContentSection />}


            </section>


        </div>
    )
}