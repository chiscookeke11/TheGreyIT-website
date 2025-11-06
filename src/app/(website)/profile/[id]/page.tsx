"use client"

import { ProfileData } from "@/data/profileData"
import { ProfileDataType } from "@/types/types"
import { Linkedin } from "lucide-react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"



export default function Page() {

    const { id } = useParams()
    const [currentProfile, setCurrentProfile] = useState<ProfileDataType | null>(null)



    useEffect(() => {
        if (!id) return;


        const profile = ProfileData.find((profile) => String(profile.id) === id)
        setCurrentProfile(profile || null)

    }, [id])



    return (
        <div className="w-full min-h-[80vh] py-32 flex items-center flex-col md:flex-row  px-[5%] gap-16 md:gap-10 justify-center font-poppins " >
            <div className=" w-full max-w-xs lg:max-w-[400px] h-[350px] md:h-[500px] lg:h-[510px] bg-gray-700 relative  " >
                <Image src={currentProfile?.imageUrl ?? ""} height={500} width={500} alt={`${currentProfile?.name}-image`} className=" w-full h-full absolute top-3 right-3 object-cover object-center rounded-sm " />
            </div>


            <div className="flex-1 space-y-2 max-w-4xl " >
                <h1 className="text-xl font-bold " >{currentProfile?.name} </h1>
                <p className="text-lg font-normal text-gray-600 " >{currentProfile?.position} </p>


                <p className="text-base text-gray-600 my-5 " > {currentProfile?.about} </p>

                <a href={currentProfile?.linkedInUrl} target="_blank" className="text-gray-700 w-8 h-8 rounded-sm flex items-center justify-center " ><Linkedin size={20} /> </a>
            </div>
        </div>
    )
}