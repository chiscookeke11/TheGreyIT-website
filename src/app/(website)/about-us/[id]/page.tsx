"use client"

import Spinner from "@/components/UI/Spinner";
import { teams } from "@/data/LeadershipData";
import { TeamMemberDataType } from "@/types/types";
import { Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";





export default function Page() {
    const { id } = useParams()
    const [currentMember, setCurrentMember] = useState<TeamMemberDataType | null>(null)



    useEffect(() => {
        if (!id) return;

        const member = teams.find((member) => String(member.id) === id)
        setCurrentMember(member || null)
    }, [id])




    if (!currentMember) return (

        <div className="w-full h-screen flex items-center justify-center" >
            <Spinner/>
        </div>
    )




    return (
        <div className="w-full min-h-[80vh] py-36 flex items-center md:items-start flex-col md:flex-row   px-[5%] gap-16 md:gap-10 justify-center font-poppins bg-[#f2f5fc] " >
            <div className=" w-full max-w-xs md:max-w-md h-[350px] md:h-[500px] lg:h-[510px] bg-gray-700 relative  " >
                <Image src={currentMember?.image ?? ""} height={500} width={500} alt={`${currentMember?.name}-image`} className=" w-full h-full absolute top-3 right-3 object-cover object-center rounded-sm " />
            </div>


            <div className="flex-1 space-y-2 max-w-5xl " >
                <h1 className="text-xl md:text-2xl font-bold text-black" > {currentMember?.name} </h1>
                <p className=" text-base md:text-lg font-normal text-gray-800  " >{currentMember?.title} </p>


                <p className="text-base text-gray-600 my-5 whitespace-pre-line " > {currentMember?.description} </p>



                {/* core skills if any  */}
                <ul className=" flex flex-col items-start gap-2 list-disc my-10" >
                    <p className="text-gray-900 font-semibold text-base md:text-lg" >Core Skills</p>
                    {
                        currentMember?.coreSkills?.map((skill, index) => (
                            <li className="text-sm font-medium " key={index} > {skill} </li>
                        ))
                    }
                </ul>



                {/* Tools/Software if any  */}
                <ul className=" flex flex-col items-start gap-2 list-disc my-10" >
                    <p className="text-gray-900 font-semibold text-base md:text-lg" >Core Skills</p>
                    {
                        currentMember?.tools?.map((tools, index) => (
                            <li className="text-sm font-medium " key={index} > {tools} </li>
                        ))
                    }
                </ul>



                {/* Tools/Software if any  */}
                <ul className=" flex flex-col items-start gap-2 list-disc my-10" >
                    <p className="text-gray-900 font-semibold text-base md:text-lg" >Certifications</p>
                    {
                        currentMember?.certifications?.map((cert, index) => (
                            <li className="text-sm font-medium " key={index} > {cert} </li>
                        ))
                    }
                </ul>



                <div className="w-fit flex items-center gap-3" >
                    <a href={currentMember?.socials.linkedIn} target="_blank" className=" text-sm  text-gray-700 hover:text-gray-700 transition-all duration-250 transform hover:scale-125 h-10 w-10 rounded-full hover:bg-white flex items-center justify-center center " ><Linkedin size={20} /> </a>
                    <a href={currentMember?.socials.twitter} target="_blank" className=" text-sm  text-gray-700 hover:text-gray-700 transition-all duration-250 transform hover:scale-125 h-10 w-10 rounded-full hover:bg-white flex items-center justify-center center " ><Twitter size={20} /> </a>
                </div>
            </div>
        </div>
    )
}