"use client"


import { navLinksData } from "@/data/navlinks";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";



export default function Navbar() {
    const [showMenu, setShowMenu] = useState(false)
    const [activeNav, setActiveNav] = useState(0)


    useEffect(() => {
        const originalStyle = document.body.style.overflowY;

        document.body.style.overflowY = showMenu ? "hidden" : "auto"

        return () => {
            document.body.style.overflowY = originalStyle;
        };
    }, [showMenu])



    return (
        <nav className="absolute z-50 top-0 left-0 w-full  flex items-center justify-between py-[4%] pt-[5%] px-[6%] " >

            <Link href={"/"}>
                <Image src={"/logos/thegreyitlogo.png"} width={500} height={500} alt="TheGreyIT-logo" className="object-center w-[100px] " />
            </Link>




            {/* desktop menu */}
            <ul className=" w-fit hidden lg:flex items-center gap-5 " >
                {navLinksData.map((navlink, index) => (
                    <li onClick={() => {
                        setActiveNav(index)
                    }} key={index} className={`text-[13px] font-poppins text-white relative before:absolute before:bg-white before:bottom-[-5px] before:left-[50%] before:translate-x-[-50%]  before:w-0 before:h-[3px] hover:before:w-full before:transition-all before:duration-300 before:ease-in-out ${activeNav === index ? "before:w-full" : "before:w-0"} `} ><Link href={navlink.url} > {navlink.label}</Link> </li>
                ))}
            </ul>


            <button onClick={() => setShowMenu(true)} className=" flex items-center justify-center lg:hidden cursor-pointer border-none outline-none" >
                <Menu size={27} />
            </button>




            {/* mobile menu */}
            <div className={`fixed top-0 right-0 h-screen bg-[#333333] w-[50%] min-w-xs z-20 flex items-start flex-col gap-7 py-6 px-5 transform transition-transform duration-150 ease-in-out ${showMenu ? "translate-x-0" : "translate-x-[500%] "} `} >
                <button onClick={() => setShowMenu(false)} className=" ml-auto border-none outline-none cursor-pointer flex items-center justify-center " ><X /></button>


                <ul className={`w-fit flex flex-col items-start gap-8 pl-5  `} >
                    {navLinksData.map((navlink, index) => (
                        <li key={index} onClick={() => setShowMenu(false)} className=" text-[13px] font-poppins text-white " ><Link href={navlink.url} > {navlink.label}</Link> </li>
                    ))}
                </ul>

            </div>

        </nav>
    )
}