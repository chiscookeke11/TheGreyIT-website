"use client"


import { navLinksData } from "@/data/navlinks";
import Image from "next/image";
import CustomLink from "../UI/CustomLink";




export default function Footer() {
    return (
        <footer className=" bg-gray-700 py-32 px-10 text-white flex items-center justify-center " >


            <div className="bg-red-400 w-full grid grid-cols-4 gap-10 place-items-center justify-items-end h-full p-1" >
                <div className="bg-red-500 w-full" >
                    <Image src={"/logos/thegreyitlogo.png"} width={180} height={180} alt="TheGreyIT-logo" className="object-center w-[200px] " />
                </div>


                <div className="bg-red-500 w-full p-1" >
                    <Image src={"/logos/thegreyitlogo.png"} width={180} height={180} alt="TheGreyIT-logo" className="object-center w-[200px] " />
                </div>


                <div className="bg-red-500 w-full p-1 " >
                    <ul className={`w-fit flex flex-col items-start gap-4  `} >
                        {navLinksData.map((navlink, index) => (
                            <li key={index} className=" text-base font-poppins text-white " ><CustomLink href={navlink.url} > {navlink.label}</CustomLink> </li>
                        ))}
                    </ul>
                </div>


                <div className="bg-red-500 w-full p-1" >
                    <Image src={"/logos/thegreyitlogo.png"} width={180} height={180} alt="TheGreyIT-logo" className="object-center w-[200px] " />
                </div>




            </div>

        </footer>
    )
}