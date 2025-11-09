import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { SetStateAction, useState } from "react";
import { User } from "@supabase/supabase-js";
import 'animate.css';




const sideNavLinks = [
    {
        label: "Courses",
        route: "#",
        icon: ""
    },
    {
        label: "Paid Courses",
        route: "#",
        icon: ""
    },
    {
        label: "Certficates",
        route: "#",
        icon: ""
    },
]



export default function SideNav({ setUser }: { setUser: React.Dispatch<SetStateAction<User | null>> }) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [openMobileNav, setOpenMobileNav] = useState(false)


    return (
        <aside className={`bg-[#f2f5fc] sticky top-0 left-0 h-screen  flex flex-col items-center justify-between  py-6 pt-20 pb-20 gap-4  px-5 border-r border-[#008CC1]/20 ${openMobileNav? "max-w-sm w-fit md:w-3/12" : "w-0 overflow-hidden"} `} >

            <Link href={"/"} className={`flex items-start gap-2 ${openMobileNav ? "block" : "hidden"} `} >
                <Image src={"/logos/THEGREYAElogoBlack.png"} height={500} width={500} alt="logo" className=" w-[150px] " />
            </Link>


            <button onClick={() => setOpenMobileNav((prev) => !prev)} >
                open
            </button>






            <ul className={`w-full  flex-col gap-6 justify-between pl-6 py-2 ${openMobileNav? "flex" : "hidden"} `} >

                {sideNavLinks.map((navlink, index) => (
                    <li
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        key={index}
                        className={`font-semibold text-lg font-lato w-full shadow-xs bg-white rounded-md py-2 px-4 transition-all duration-300 ease-in-out ${hoveredIndex === index ? "animate__animated animate__headShake" : ""
                            }`} > <Link href={navlink.route} className="flex items-center gap-4" >{navlink.icon}  {navlink.label}</Link> </li>
                ))}



            </ul>



                <button
                    onClick={async () => {
                        const { error } = await supabase.auth.signOut()
                        if (error) console.error("Sign-out error:", error.message)
                        else setUser(null)
                    }}
                    className={`bg-gray-700 w-full text-white px-5 py-2 rounded-md hover:bg-gray-600 transition-all duration-300 ease-in-out cursor-pointer mb-[30%] ${openMobileNav ? "block" : "hidden"} `}
                >
                    Sign Out
                </button>


        </aside>
    )
}