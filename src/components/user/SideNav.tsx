import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { SetStateAction, useState } from "react";
import { User } from "@supabase/supabase-js";
import 'animate.css';
import { sideNavLinks } from "@/data/SideNavData";

interface SideNavProps {
    setUser: React.Dispatch<SetStateAction<User | null>>
    user: User
}






export default function SideNav({ setUser, user }: SideNavProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);




    return (
        <aside className={`bg-[#f2f5fc] sticky top-0 left-0 h-screen  flex flex-col items-center justify-center  py-6 pt-20 pb-20 gap-4  px-5  transition-all duration-300 ease-in-out max-w-xs w-full  rounded-xl  `} >








            <ul className={`w-full  flex-col gap-4 justify-between pl-6 py-2 flex `} >

                 <p>Welcome, {user.user_metadata.first_name ? user.user_metadata.first_name.charAt(0).toUpperCase() + user.user_metadata.first_name.slice(1).toLowerCase() + " " + user.user_metadata.last_name.charAt(0).toUpperCase() + user.user_metadata.last_name.slice(1).toLowerCase()  : user.email}</p>


                {sideNavLinks.map((navlink, index) => (
                    <li
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        key={index}
                        className={`font-semibold text-base font-lato w-full shadow-xs bg-white rounded-md py-2 px-4 transition-all duration-300 ease-in-out ${hoveredIndex === index ? "animate__animated animate__headShake" : ""
                            }`} > <Link href={navlink.route} className="flex items-center gap-4" >{navlink.icon}  {navlink.label}</Link> </li>
                ))}


                <button
                    onClick={async () => {
                        const { error } = await supabase.auth.signOut()
                        if (error) console.error("Sign-out error:", error.message)
                        else setUser(null)
                    }}
                    className={`bg-gray-700 w-full text-white px-5 py-2 rounded-md hover:bg-gray-600 transition-all duration-300 ease-in-out cursor-pointer mb-[30%] block `}
                >
                    Log Out
                </button>
            </ul>






        </aside>
    )
}