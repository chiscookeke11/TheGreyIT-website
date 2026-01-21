import { useAppContext } from "@/context/AppContext"
import { User } from "@supabase/supabase-js"
import Image from "next/image"
import Link from "next/link"
import Button from "../UI/Button"
import { ArrowRight, BookOpen, Medal } from "lucide-react"




export default function LayoutHeader({ user }: { user: User }) {

    const { userData, certificatesData } = useAppContext()

    const profilePic = userData?.user_image ? userData.user_image : user.user_metadata.avatar_url


    return (
        <header className="w-full flex flex-col md:flex-row items-start md:items-center  justify-between gap-6 px-6 py-10 bg-gray-700 text-white rounded-2xl ">
            <div className="w-fit flex items-center gap-5 " >


                <div className=" w-[100px] h-[100px] flex items-center justify-center rounded-full border  border-white " >
                    <div className="w-[95%] h-[95%] bg-[#f2f5fc] rounded-full flex items-center text-center justify-center " >

                        {
                            userData?.user_image || (user.app_metadata.provider === "google" && user.user_metadata.avatar_url) ?
                                <Image src={profilePic} alt={"Profile pic"} width={1000} height={1000} className="w-full h-full rounded-full object-center object-cover " />
                                :
                                <h2 className="text-black" >
                                    {user.user_metadata.first_name ? user.user_metadata.first_name.charAt(0) + user.user_metadata.last_name.charAt(0) : user.user_metadata.full_name.charAt(0).toUpperCase() + user.user_metadata.full_name.split(" ")[1].charAt(0).toUpperCase()}
                                </h2>
                        }
                    </div>
                </div>



                <div className="flex flex-col gap-2 items-start flex-1 " >
                    <h2 className="text-lg font-semibold  ">
                        Hello, <span className="font-normal text-sm md:text-base">{user.user_metadata.first_name ? user.user_metadata.first_name.charAt(0).toUpperCase() + user.user_metadata.first_name.slice(1).toLowerCase() : user.email}</span>
                    </h2>
                    <div className="flex flex-col md:flex-row  md:items-center  gap-3 text-xs " >
                        <p className=" flex items-center gap-1 "> <BookOpen size={13} /> {userData?.list_enrolled_courses?.length || 0} Course Enrolled</p>
                        <p className=" flex items-center gap-1 "><Medal size={13} /> {certificatesData?.length || 0} Certificate</p>

                    </div>
                </div>
            </div>

            <Link href={"/user/Courses"} >
                <Button variant="default" className="bg-white hover:bg-white hover:text-gray-700! hover:rounded-[50px] text-sm! gap-3 ml-auto " >
                    View Courses  <ArrowRight size={15} />
                </Button>
            </Link>

        </header>
    )
}