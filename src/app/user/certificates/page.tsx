"use client"

import Spinner from "@/components/UI/Spinner";
import { useAppContext } from "@/context/AppContext";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";



export default function Page() {

    const { certificatesData, userData, allCoursesData } = useAppContext()

    const certifiedCourses = userData?.list_completed_courses



    const fetchCertifiedCourses = async () => {

        const { data, error } = await supabase.from("course").select("*").in("id", certifiedCourses ?? []).single()

        if (error) {
            console.error(error)
        }

        else {
            console.log("certified courses:", data)
        }
    }


    useEffect(() => {

        fetchCertifiedCourses()

    }, [userData])

    return (
        <>
            {
                !certificatesData ?
                    <div className="w-full h-full min-h-[60vh] flex flex-col gap-7 items-center justify-center font-poppins bg-[#f2f5fc]   ">
                        <Spinner />
                    </div>
                    :
                    certificatesData.length < 1 ?
                        (
                            <div className="w-full h-full min-h-[60vh] flex flex-col gap-7 items-center justify-center font-poppins bg-[#f2f5fc]   ">

                                <Image src={"/user/not-found-error-alert-svgrepo-com.svg"} alt="icon" height={500} width={500} className=" w-[250px] h-[250px] object-center " />
                                <h3 className="font-semibold text-2xl" >No certificates found</h3>
                            </div>
                        )
                        :
                        <div className="w-full h-full min-h-[30vh] flex flex-col gap-7 items-stretch font-poppins bg-[#f2f5fc]  py-7 px-4  ">


                            {
                                certificatesData.map((certificate) => {


                                    // finding the certified course
                                    const theCourse = allCoursesData?.find((c) => c.id === certificate.course_id)




                                    return (
                                        <div key={certificate.id} className=" w-full bg-white rounded-sm py-8 px-5 flex flex-col md:flex-row items-start gap-8 " >

                                            {/* course thumbnail  */}
                                            <div className="w-[80px] bg-gray-500 h-[80px] flex items-center justify-center overflow-hidden " >
                                                <Image src={theCourse?.imageUrl ?? ""} alt={`${certificate.certificate_name}-image `} height={500} width={500} className="w-full h-full object-center object-cover " />
                                            </div>


                                            <div className="w-full flex-1 flex flex-col items-start gap-2 " >
                                                <h3 className=" font-normal text-sm text-gray-600 ">TheGrey IT</h3>
                                                <h2 className=" font-semibold text-lg  text-gray-700  " > {theCourse?.title} Certificate </h2>

                                                {/* skills  */}
                                                <ul className="w-full flex items-center gap-4 flex-wrap my-3 text-gray-700  " >
                                                    {theCourse?.skills?.map((skill, index) => (
                                                        <li key={index} className="bg-[#f2f5fc]  w-fit py-1 px-3 rounded-2xl font-normal text-sm " > {skill} </li>
                                                    ))}
                                                </ul>


                                                <Link href={`/user/certificates/${certificate.id}`} className="text-blue-700 text-xs font-medium underline hover:no-underline " > View certificate </Link>
                                                <h4 className=" font-normal text-sm text-gray-600 " >Completed {new Date(certificate?.date_of_completion).toLocaleString("en-US", { month: "long" })}  {new Date(certificate?.date_of_completion).getFullYear()} </h4>

                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
            }


        </>
    )
}