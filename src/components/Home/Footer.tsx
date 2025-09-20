"use client"


import { navLinksData } from "@/data/navlinks";
import Image from "next/image";
import CustomLink from "../UI/CustomLink";
import { socialsData } from "@/data/SocialsData";





export default function Footer() {
    return (
        <footer className=" bg-gray-700 pt-20 pb-7 px-[3%] text-white flex flex-col items-center justify-center font-poppins gap-18 bg-no-repeat bg-cover bg-center " style={{ backgroundImage: "url('/footer/footer.webp')" }}  >


            <div className=" w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 place-items-start justify-items-end h-full p-1" >
                <div className=" w-full" >
                    <Image src={"/logos/thegreyitlogo.png"} width={180} height={180} alt="TheGreyIT-logo" className="object-center w-[150px] md:w-[200px] " />
                </div>


                <div className=" w-full p-1 flex flex-col items-start gap-4 " >
                    <h4 className="text-xl " >Location</h4>
                    <p className=" w-[90%] text-base  font-semibold text-gray-400 " >Gill Mall Plot 109 Coal City Garden Extension G.R.A Enugu, Nigeria.</p>
                </div>


                <div className=" w-full p-1 flex flex-col items-start gap-4 " >
                    <h4 className="text-xl " >Links</h4>
                    <ul className={`w-fit flex flex-col items-start gap-3  `} >
                        {navLinksData.map((navlink, index) => (
                            <li key={index} className=" text-sm   text-gray-400 hover:text-gray-200 transition-all duration-150" ><CustomLink href={navlink.url} > {navlink.label}</CustomLink> </li>
                        ))}
                    </ul>
                </div>


                <div className=" w-full p-1 flex flex-col items-start gap-4" >
                    <h4 className="text-xl ">Socials</h4>
                    <ul className={`w-fit flex items-start gap-4  `} >
                        {socialsData.map((socialLink, index) => (
                            <li key={index} className=" text-sm  text-gray-400 hover:text-gray-200 transition-all duration-250 transform hover:scale-125 " ><CustomLink href={socialLink.url} > {socialLink.icon}</CustomLink> </li>
                        ))}
                    </ul>
                </div>




            </div>


            <hr className="bg-white/10 w-full h-0.5 border-none " />


            <small className="text-xs text-gray-400 font-medium " >© 2020 Lift Media. All rights reserved.</small>

        </footer>
    )
}