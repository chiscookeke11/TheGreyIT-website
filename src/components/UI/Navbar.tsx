"use client"


import { navLinksData } from "@/data/navlinks";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import CustomLink from "./CustomLink";
import { useAppContext } from "@/context/AppContext";
import { usePathname } from "next/navigation";






export default function Navbar() {
    const [showMenu, setShowMenu] = useState(false)
    const { activeNav, setActiveNav } = useAppContext()
    const pathName = usePathname()
    const mobileNavRef = useRef<HTMLDivElement | null>(null)
    const isLightBackground = pathName === "/" || pathName === "/courses" || pathName === "/our-services" || pathName.includes("research-blog/");







    // This fucntion sets the active path name
    useEffect(() => {
        const currentIndex = navLinksData.findIndex(
            (navlink) => navlink.url === pathName
        );
        if (currentIndex !== -1) {
            setActiveNav(currentIndex)
        }
    }, [pathName, setActiveNav])


    // this function closes the mobile menu on click outside and also controls the overflow of the body
    useEffect(() => {
        document.body.style.overflowY = showMenu ? "hidden" : "auto"

        const handleClickOutside = (e: MouseEvent) => {
            if (mobileNavRef.current && !mobileNavRef.current.contains(e.target as Node)) {
                setShowMenu(false)
            }
        }
        if (showMenu) {
            document.addEventListener("mousedown", handleClickOutside)
        }
        else {
            document.removeEventListener("mousedown", handleClickOutside)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
            document.body.style.overflowY = "auto"
        }

    }, [showMenu])



    return (
        <nav className="absolute text-white z-50 top-0 left-0 w-full  flex items-center justify-between py-[4%] pt-[5%] md:pt-[3%] px-[6%] " >

            <Link href={"/"} onClick={() => setActiveNav(0)}>
                {isLightBackground ?
                    (<Image src={"/logos/thegreyitlogo.png"} width={180} height={180} alt="TheGreyIT-logo" className="object-center w-[100px] " />)
                    :
                    (<Image src={"/logos/THEGREYAElogoBlack.png"} width={180} height={180} alt="TheGreyIT-logo" className="object-center w-[100px] " />)
                }
            </Link>




            {/* desktop menu */}
            <ul className=" w-fit hidden lg:flex items-center gap-5 " >
                {navLinksData.map((navlink, index) => (
                    <li onClick={() => {
                        setActiveNav(index)
                    }} key={index} className={`text-sm font-semibold font-poppins ${isLightBackground ? "text-white before:bg-white" : "text-[#171717] before:bg-[#171717] "} relative before:absolute  before:bottom-[-5px] before:left-[50%] before:translate-x-[-50%]  before:w-0 before:h-[3px] hover:before:w-full before:transition-all before:duration-300 before:ease-in-out ${activeNav === index ? "before:w-full" : "before:w-0"} `} >
                        {navlink.label === "Contact Us" ? (
                            <Link href={navlink.url}>{navlink.label}</Link>
                        ) : (
                            <CustomLink href={navlink.url}>{navlink.label}</CustomLink>
                        )}

                    </li>
                ))}
            </ul>


            <button onClick={() => setShowMenu(true)} className={` flex items-center justify-center lg:hidden cursor-pointer border-none outline-none  ${isLightBackground ? "text-white " : "text-[#171717]  "}  `} >
                <Menu size={27} />
            </button>




            {/* mobile menu */}
            <div ref={mobileNavRef} className={`fixed top-0 right-0 h-screen bg-gray-700 w-[50%] min-w-xs z-20 flex items-start flex-col gap-7 py-6 px-5 transform transition-transform duration-150 ease-in-out ${showMenu ? "translate-x-0" : "translate-x-[500%] "} `} >
                <button onClick={() => setShowMenu(false)} className=" ml-auto border-none outline-none cursor-pointer flex items-center justify-center " ><X /></button>


                <ul className={`w-fit flex flex-col items-start gap-8 pl-5  `} >
                    {navLinksData.map((navlink, index) => (
                        <li key={index} onClick={() => setShowMenu(false)} className=" text-lg font-poppins text-white " ><CustomLink href={navlink.url} > {navlink.label}</CustomLink> </li>
                    ))}
                </ul>

            </div>

        </nav>
    )
}