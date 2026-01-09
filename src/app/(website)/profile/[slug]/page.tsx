"use client"

import { ProfileData } from "@/data/profileData"
import { ProfileDataType } from "@/types/types"
import { Linkedin } from "lucide-react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"




export default function Page() {

    const { slug } = useParams()
    const [currentProfile, setCurrentProfile] = useState<ProfileDataType | null>(null)



    useEffect(() => {
        if (!slug) return;
                if (Array.isArray(slug)) return;


        const profile = ProfileData.find((profile) => String(profile.slug) === slug)
        setCurrentProfile(profile || null)

    }, [slug])



    return (
        <div className="w-full min-h-[80vh] py-32 flex items-center flex-col md:flex-row  px-[5%] gap-16 md:gap-10 justify-center font-poppins bg-[#f2f5fc] " >
            <div className=" w-full max-w-xs lg:max-w-[400px] h-[350px] md:h-[500px] lg:h-[510px] bg-gray-700 relative  " >
                <Image src={currentProfile?.imageUrl ?? "/user/user-placeholder.png"} height={500} width={500} alt={`${currentProfile?.name}-image`} className=" w-full h-full absolute top-3 right-3 object-cover object-center rounded-sm " />
            </div>


            <div className="flex-1 space-y-2 max-w-4xl " >
                <h1 className="text-2xl font-bold text-gray-800 " >{currentProfile?.name} </h1>
                <p className="text-lg font-normal text-gray-600 " >{currentProfile?.position} </p>


                <p className="text-base text-gray-600 my-5 whitespace-pre-line " > {currentProfile?.about} </p>

                <a href={currentProfile?.linkedInUrl} target="_blank" className=" text-sm  text-gray-700 hover:text-gray-700 transition-all duration-250 transform hover:scale-125 h-10 w-10 rounded-full hover:bg-white flex items-center justify-center center " ><Linkedin size={20} /> </a>
            </div>
        </div>
    )
}