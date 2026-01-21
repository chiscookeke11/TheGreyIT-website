"use client"


import Button from "@/components/UI/Button"
import { Spinner } from "@/components/UI/Spinner"
import { supabase } from "@/lib/supabaseClient"
import { CourseDataTypes } from "@/types/types"
import { Download, } from "lucide-react"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import Marquee from "react-fast-marquee";
import toast from "react-hot-toast"


const highlights = [
    "Master In-Demand Tech Skills",
    "Build Real-World Projects",
    "Learn With Expert Mentors",
    "Online & In-Person Cohorts",
    "Join a Vibrant Tech Community",
    "Get a Strong Portfolio",
    "Launch Your Career in Tech"
]

export default function CoursePageComponent() {

    const [coursesData, setCoursesData] = useState<CourseDataTypes[] | null>(null)
    const [downloadingPdf, setDownloadingPdf] = useState<string | null>(null)



    const downloadPdf = async (pdfName: string) => {

        setDownloadingPdf(pdfName)


        const { error, data } = await supabase.storage.from("course_outline_pdf").download(pdfName)

        if (error) {
            console.error("Error downlaoding file:", error.message)
            toast.error("Failed to download PDF")
            setDownloadingPdf(null)

        }
        else if (data) {
            // Create a url for the blob and trigger download
            const url = URL.createObjectURL(data);
            const link = document.createElement("a")
            link.href = url
            link.download = `${pdfName}`
            document.body.appendChild(link)
            link.click()
            link.remove()
            URL.revokeObjectURL(url)

            setDownloadingPdf(null)

        }

    }







    // Function to fetch all Courses from the db
    const supabaseFetch = async () => {
        const { data, error } = await supabase.from("course").select("*")

        if (error) {
            console.log("Failed to fetch course:", error)
        }


        {
            console.log("Fetch complete", data)
            setCoursesData(data)
        }
    }


    useEffect(() => {

        supabaseFetch()
    }, [])




    return (
        <div className="h-full w-full text-black bg-white relative " >


            {/* Courses page hero section  */}
            <div className="w-full h-[95vh] flex items-center justify-center relative bg-no-repeat bg-cover bg-center text-white font-poppins  " style={{ backgroundImage: 'url("/courses-page/hero-img-2.webp")' }}  >
                <div className="w-full h-full absolute inset-0 bg-gradient-to-b from-[rgba(4,9,30,0.5)] to-[rgba(4,9,30,0.5)] z-10 " />




                <div className=" w-full h-full absolute inset-0 flex items-center justify-center flex-col gap-5 z-20 text-center p-4 " >
                    <div className="w-full max-w-5xl text-center space-y-6 " >
                        <h1 className="text-2xl md:text-4xl font-bold" >Master in-demand tech skills in 2 to 12 months with hands-on training and expert mentorship.</h1>
                        <p className="text-lg text-center font-medium text-white " >Gain real-world experience, mentorship, and become a master of your craft.</p>
                    </div>


                    <Link href={"/user/Courses"} > <Button>Register Now</Button></Link>
                </div>

            </div>

            {/* The Scrolling text */}
            <div className=" w-full py-4 flex items-center justify-center text-white bg-gray-700 font-poppins " >
                <Marquee speed={50} >
                    <ul className="w-full  flex items-center justify-between gap-10 text-sm md:text-base font-medium " >
                        {highlights.map((info, i) => (
                            <li key={i} > {info} </li>
                        ))}
                    </ul>
                </Marquee>

            </div>





            {/* Course description section  */}
            {!coursesData ?
                (
                    <div className=" w-full h-screen flex items-center justify-center  " >
                        <Spinner />

                    </div>
                )
                :
                coursesData.length < 1 ?
                    (
                        <div className="w-full h-screen flex items-center justify-center bg-[#f2f5fc] " >
                            <p className="font-medium text-lg text-gray-700 " >No courses found!</p>

                        </div>
                    )
                    :
                    (
                        <section id="courseTracks" className=" w-full h-fit py-14 md:py-28 px-[4%]  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center justify-items-center gap-10 font-poppins " >

                            {coursesData?.map((track, index) => (
                                <div
                                    key={index}
                                    onClick={() => {
                                        if (track.pdfName) downloadPdf(track.pdfName)
                                        else console.warn("PDF not available")
                                    }}
                                    className=" w-full bg-[#f2f5fc] h-full py-6 px-5 flex flex-col items-start gap-4 rounded-lg shadow-sm relative cursor-pointer" >
                                    <span className=" h-10 w-10 md:h-14 md:w-14 flex items-center justify-center bg-gray-700 text-white rounded-sm font-medium text-lg md:text-xl text-left shadow-xl " >{index + 1} </span>
                                    <h3 className=" font-syne font-bold text-xl mt-3  " > {track.title} </h3>
                                    <p className=" font-normal text-base   md:mt-1 " >{track.shorter_Description} </p>


                                    <div className="w-full flex flex-col md:flex-row items-center gap-4  mt-auto " >
                                        <Link href={`/user/Courses/${track.id}`} onClick={(e) => {
                                            e.stopPropagation()
                                        }}
                                            className="w-full basis-1/2 " >
                                            <Button variant="default" className=" w-full !rounded-[100px] text-sm! lg:text-sm " >Register</Button>
                                        </Link>

                                        <Button
                                            disabled={downloadingPdf === track.pdfName}
                                            onClick={() => {
                                                if (track.pdfName) downloadPdf(track.pdfName)
                                                else console.warn("PDF not available")
                                            }}
                                            variant="default" className="w-full basis-1/2 !rounded-[100px] !bg-gray-700 !text-white text-sm! !lg:text-sm hover:bg-transparent! hover:text-gray-700! flex items-center gap-3 whitespace-nowrap " >
                                            {downloadingPdf === track.pdfName ? "Downloading ..." : <>View Curriculum <Download size={15} /></>}
                                        </Button>
                                    </div>

                                    <div className="absolute right-0 top-0 bg-red-500 font-medium text-white py-1 pl-4 pr-1 w-fit text-sm rounded-xs flex flex-col items-start gap-1.5  " >
                                        {
                                            !track.onlineFee || track.onlineFee < 0 ?
                                                null :
                                                (
                                                    <span>Online: ₦{track?.onlineFee?.toLocaleString()}</span>
                                                )
                                        }


                                        {
                                            track.inhouseFee && (
                                                <span>In-house: ₦{track?.inhouseFee?.toLocaleString()}</span>
                                            )
                                        }
                                    </div>
                                </div>
                            ))}


                        </section>
                    )
            }




        </div>
    )
}