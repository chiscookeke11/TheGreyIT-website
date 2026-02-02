import { supabase } from "@/lib/supabaseClient"
import { GraduationCap, HandCoins, Home, Mails, Megaphone, MessageSquareText, School, SquareLibrary, UserStar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"





const NavigationMenuLinks = [
    {
        label: "Home",
        url: "/admin",
        icon: <Home size={14} />
    },
    {
        label: "Blogs",
        url: "#",
        icon: <MessageSquareText size={14} />
    },
    // {
    //     label: "Add Blog",
    //     url: "/admin/Add-blog"
    // },
    {
        label: "Ambassador Application",
        url: "/admin/pages/ambassadors-application",
        icon: <Megaphone size={14} />
    },
    {
        label: "Courses",
        url: "#",
        icon: <SquareLibrary size={14} />
    },
    {
        label: "Course Enrollment",
        url: "/#",
        icon: <School size={14} />
    },
    {
        label: "All Transactions",
        url: "/admin/pages/transactions",
        icon: <HandCoins size={14} />
    },
    {
        label: "Certificates",
        url: "/#",
        icon: <GraduationCap size={14} />
    },
    {
        label: "Reviews",
        url: "#",
        icon: <UserStar size={14} />
    },
    {
        label: "Send Newsletter",
        url: "#",
        icon: <Mails size={14} />
    },
]


export default function NavigationMenu() {
    return (
        <div className="w-full bg-gray-700 h-full overflow-y-auto py-10 px-[6%] flex flex-col items-center gap-20 mb-10" >

            <Link href={"/"}>
                <Image
                    src={"/logos/thegreyitlogo.png"}
                    width={180}
                    height={180}
                    alt="TheGreyIT-logo"
                    className="object-center w-[100px]"
                />
            </Link>


            <ul className="w-full flex flex-col items-start gap-6" >
                {NavigationMenuLinks.map((link, i) => (
                    <li key={i}><Link href={link.url} className="text-white hover:text-gray-300 duration-200 transition-all ease-in-out font-medium text-sm flex items-center justify-center gap-2 " >{link.icon} {link.label}</Link></li>
                ))}
            </ul>



            <button
                onClick={async () => {
                    const { error } = await supabase.auth.signOut()
                }}
                className="bg-red-500 w-full text-white text-sm px-5 py-2 rounded-sm hover:bg-red-400 duration-200 transition-all ease-in-out cursor-pointer"
            >
                Sign Out
            </button>


        </div>
    )
}