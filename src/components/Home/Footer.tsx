"use client"


import { navLinksData } from "@/data/navlinks";
import Image from "next/image";
import CustomLink from "../UI/CustomLink";
import { socialsData } from "@/data/SocialsData";





export default function Footer() {
    return (
        <footer className=" bg-gray-700 py-32 px-[3%] text-white flex items-center justify-center font-poppins" >


            <div className=" w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 place-items-start justify-items-end h-full p-1" >
                <div className=" w-full" >
                    <Image src={"/logos/thegreyitlogo.png"} width={180} height={180} alt="TheGreyIT-logo" className="object-center w-[150px] md:w-[200px] " />
                </div>


                <div className=" w-full p-1  " >
                    <p className=" w-[85%] text-lg md:text-xl font-semibold " >Gill Mall Plot 109 Coal City Garden Extension G.R.A Enugu, Nigeria.</p>
                </div>


                <div className=" w-full p-1 " >
                    <ul className={`w-fit flex flex-col items-start gap-4  `} >
                        {navLinksData.map((navlink, index) => (
                            <li key={index} className=" text-base  text-white hover:text-gray-400 transition-all duration-150" ><CustomLink href={navlink.url} > {navlink.label}</CustomLink> </li>
                        ))}
                    </ul>
                </div>


                <div className=" w-full p-1" >
                    <ul className={`w-fit flex flex-col items-start gap-4  `} >
                        {socialsData.map((socialLink, index) => (
                            <li key={index} className=" text-base  text-white hover:text-gray-400 transition-all duration-150 " ><CustomLink href={socialLink.url} > {socialLink.name}</CustomLink> </li>
                        ))}
                    </ul>
                </div>




            </div>

        </footer>
    )
}