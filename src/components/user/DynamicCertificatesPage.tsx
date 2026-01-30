"use client"



import Button from "@/components/UI/Button";
import { Spinner } from "@/components/UI/Spinner";
import { useAppContext } from "@/context/AppContext";
import { supabase } from "@/lib/supabaseClient";
import { CertificatesDataType, CourseDataTypes } from "@/types/types";
import { User } from "@supabase/supabase-js";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';



export default function DynamicCertificatesPage() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const { id } = useParams()
    const [currentCertificate, setCurrentCertificate] = useState<CertificatesDataType | null>(null)
    const { certificatesData, allCoursesData, userData } = useAppContext()
    const [theCourse, setTheCourse] = useState<CourseDataTypes | null>(null);
    const [showConfetti, setShowConfetti] = useState(true)
    const [width, height] = useWindowSize();
    const [hasDownloaded, setHasDownloaded] = useState<boolean | null>(false)
    const [isDownloading, setIsDownloading] = useState(false)
    const profilePic = userData?.user_image ? userData.user_image : user?.user_metadata.avatar_url


    // Fetching the user details
    useEffect(() => {
        const getUser = async () => {

            setLoading(true)
            const { data, error } = await supabase.auth.getUser()
            if (error) {
                console.error("Auth check failed:", error.message)
            }

            setUser(data.user ?? null)
            setLoading(false)

        }

        getUser()

        // listen for state changes in the layout
        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
        })

        return () => {
            authListener.subscription.unsubscribe()
        }

    }, [])


    // fetching the current certificate for the dynamic page
    useEffect(() => {
        if (!id || !certificatesData) return

        const certificate = certificatesData?.find((c) => String(c.id) === String(id))
        setCurrentCertificate(certificate || null)
    }, [id, certificatesData])



    // Fetching the course related to the certificate
    useEffect(() => {
        if (!currentCertificate || !allCoursesData) return;

        const course = allCoursesData.find(
            (c) => String(c.id) === String(currentCertificate.course_id)
        );

        setTheCourse(course || null);
    }, [currentCertificate, allCoursesData]);


    // Check if the user has downloaded the certificate
    useEffect(() => {
        if (!currentCertificate) return;

        const fetchCertificateState = async () => {
            const { data, error } = await supabase.from("certificates").select("hasDownloaded").eq("id", currentCertificate?.id).eq("user_id", currentCertificate?.user_id).single()

            if (error) {
                console.error(error)
                return;
            }
            setHasDownloaded(data?.hasDownloaded ?? false)

        }
        fetchCertificateState()
    }, [currentCertificate])


    // display confetti once all the data has been fetched
    useEffect(() => {

        if (!loading && theCourse) {

            const timer = setTimeout(() => {
                setShowConfetti(false);
            }, 10000);

            return () => clearTimeout(timer);
        }

    }, [theCourse, loading]);



    // Function to download certificate
    const downloadCertificate = async (pdfName: string) => {
        setIsDownloading(true)

        const { error, data } = await supabase.storage.from("course_outline_pdf").download(pdfName)

        if (error) {
            console.error("Error downlaoding file:", error.message);
            setIsDownloading(false)
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


            // then  write `hasDownloaded` to true in the db
            const { error: statusError } = await supabase
                .from("certificates")
                .update({ hasDownloaded: true })
                .eq("id", currentCertificate?.id)
                .eq("user_id", currentCertificate?.user_id);

            if (statusError) {
                console.error(statusError);
                return;
            }
            setIsDownloading(false)
        }

    }


    const shareCertificate = async () => {

        const currentUrl = typeof window !== "undefined" ? window.location.href : "";

        try {
            await navigator.share({
                title: "My Certificate",
                text: `I just completed the ${theCourse?.title}  course`,
                url: currentUrl,
            });
        } catch (error) {
            console.error("Failed to share certificate", error)
            toast.error("Failed to share certificate")
        }
    }



    if (!currentCertificate) {
        return (
            <div className="w-full h-[50vh] flex items-center justify-center bg-[#f2f5fc]  " >
                <Spinner />
            </div>
        )
    }


    return (
        <div className="flex flex-col items-start w-full gap-10 mt-5 relative  " >
            {showConfetti && !hasDownloaded && <Confetti width={width / 2} height={height / 1.7} className="mx-auto" />}

            <h1 className=" text-xl md:text-3xl font-semibold  " > {theCourse?.title} Certificate </h1>


            <div className="  w-full h-fit flex flex-col lg:flex-row items-center justify-center gap-10  " >

                <div className=" w-full basis-1/2 flex flex-col items-start gap-7  " >

                    <div className="bg-[#f2f5fc] w-full py-10 px-5 flex items-start flex-col gap-5 rounded-xs " >

                        {/* Profile image  */}
                        <div className="mx-auto w-[120px] h-[120px] rounded-full bg-gray-400 flex items-center justify-center overflow-hidden " >

                            {
                                userData?.user_image || (user?.app_metadata.provider === "google" && user.user_metadata.avatar_url) ?
                                    <Image src={profilePic} alt={"Profile pic"} width={1000} height={1000} className="w-full h-full rounded-full object-center object-cover " />
                                    :
                                    <h2 className="text-black" >
                                        {user?.user_metadata.first_name ? user.user_metadata.first_name.charAt(0) + user.user_metadata.last_name.charAt(0) : user?.user_metadata.full_name.charAt(0).toUpperCase() + user?.user_metadata.full_name.split(" ")[1].charAt(0).toUpperCase()}
                                    </h2>
                            }
                        </div>


                        <h1 className=" text-gray-700 font-bold text-lg md:text-xl " > Completed by  {user ? user?.user_metadata.first_name + " " + user?.user_metadata.last_name : "-"}   </h1>

                        <div className="space-y-1 font-semibold text-base " >
                            <h3> {new Date(currentCertificate?.date_of_completion).toLocaleString("en-US", { month: "long" })} {new Date(currentCertificate.date_of_completion).getDate()},  {new Date(currentCertificate?.date_of_completion).getFullYear()}  </h3>
                            <h3>9 hours (approximately)</h3>
                            <h3>Grade Achieved: 85.4%</h3>
                        </div>

                        <p >
                            {user ? user?.user_metadata.first_name + " " + user?.user_metadata.last_name : "-"} &apos;s account is verified. TheGreyIt ltd certifies their successful completion of {theCourse?.title}.
                        </p>



                    </div>

                    <div>
                        <h5 className="text-sm font-medium:" >Skills you will gain</h5>
                        {/* skills  */}
                        <ul className="w-full flex items-center gap-4 flex-wrap my-3 text-gray-700  " >
                            {theCourse?.skills?.map((skill, index) => (
                                <li key={index} className="bg-[#f2f5fc]  w-fit py-1 px-3 rounded-2xl font-normal text-xs " > {skill} </li>
                            ))}
                        </ul>
                    </div>

                </div>



                <div className="w-full basis-1/2 flex flex-col items-start gap-6   " >
                    <Image src={"/user/CERTIFICATE_LANDING_PAGE~652SJA5NTLYH.jpeg"} alt="cert-image" height={500} width={500} className="w-full mb-8 " />



                    <Button
                        onClick={shareCertificate}
                        variant="default" className="w-full rounded-none! bg-gray-700 text-white hover:bg-transparent hover:text-gray-700! " >Share Certificate</Button>

                    <Button variant="default"
                        onClick={() => {
                            // if (currentCertificate.pdfName)
                            downloadCertificate("software_engineering.pdf")
                            // else console.warn("PDF not available")
                        }}
                        disabled={isDownloading}
                        className="w-full rounded-none!" > {isDownloading ? "Downloading ..." : "Download Certificate"} </Button>
                </div>
            </div>
        </div>
    )
}