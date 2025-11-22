"use client"

import { ProfileData } from "@/data/profileData"
import { ProfileDataType } from "@/types/types"
import Image from "next/image"
import Link from "next/link"


interface ProfileCardProps {
    data: ProfileDataType
}

const ProfileCard = ({ data }: ProfileCardProps) => {
    return (
        <Link href={`/profile/${data.id}`} className="w-full group" >
            <div className="w-full max-w-lg flex items-end bg-gray-400 px-4 py-4 rounded-xl h-[350px]  md:h-[505px] lg:h-[510px] relative overflow-hidden shadow-2xl " >

                <div className=" bg-black/30 absolute inset-0 h-full w-full z-10 " />
                <Image src={data.imageUrl} alt={`${data.name}-img`} fill className="object-center object-cover group-hover:scale-110 transition-all duration-300 ease-in-out " />


                <div className="w-full  flex items-center justify-between z-20  " >

                    <div className="font-poppins text-white flex-1 max-w-sm ">
                        <h4 className=" text-lg font-bold " >{data.name} </h4>
                        <p className=" text-sm font-normal  " >{data.position} </p>
                    </div>

                </div>
            </div>
        </Link>
    )
}





export default function Profile() {
    return (
        <section className="w-full bg-white py-36 px-[7%] flex items-center justify-center flex-col gap-12  " >
            <div className="text-center flex flex-col items-center justify-center gap-7 " >
                <h2 className="text-red-700 text-5xl lg:text-6xl font-extrabold font-poppins max-w-3xl text-center  " >Real Minds.<br/> Real Impact.</h2>
                <p className="font-normal text-base lg:text-lg font-syne max-w-2xl " >Innovators shaping Africa’s digital future; coding, researching, and creating solutions that transform communities.</p>
            </div>



            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center justify-items-center gap-4" >
                {
                    ProfileData.map((data, index) => (
                        <ProfileCard key={index} data={data} />
                    ))
                }





            </div>
        </section>
    )
}