"use client"

import Button from "@/components/UI/Button"
import Navbar from "@/components/UI/Navbar"
import { Spinner } from "@/components/UI/Spinner"
import SideNav from "@/components/user/SideNav"
import UserAuthModal from "@/components/user/UserAuthModal"
import { useAppContext } from "@/context/AppContext"
import { supabase } from "@/lib/supabaseClient"
import { User } from "@supabase/supabase-js"
import { ArrowRight, BookOpen, Medal } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"





const Header = ({ user }: { user: User }) => {
    const { userData, certificatesData } = useAppContext()

    const profilePic = userData?.user_image ? userData.user_image : user.user_metadata.avatar_url

    return (
        <header className="w-full flex flex-col md:flex-row items-start md:items-center  justify-between gap-6 px-6 py-10 bg-gray-700 text-white rounded-2xl ">
            <div className="w-fit flex items-center gap-5 " >


                <div className=" w-[100px] h-[100px] flex items-center justify-center rounded-full border  border-white " >
                    <div className="w-[90px] h-[90px] bg-[#f2f5fc] rounded-full flex items-center text-center justify-center " >

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





export default function UserDashboardLayout({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [checkingUser, setCheckingUser] = useState(false)
    const { reloadUserData, reloadCertificates, reloadTransactions } = useAppContext()



    useEffect(() => {
        // check is the user is login in
        const getUser = async () => {

            setLoading(true)
            const { data, error } = await supabase.auth.getUser()
            if (error) {
                console.error("Auth check failed:", error.message)
            }

            setUser(data.user ?? null)
            setLoading(false)
        }
        getUser()

        // listen for state changes in the layout
        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
        })

        return () => {
            authListener.subscription.unsubscribe()
        }

    }, [])




    // Fetching the data from the db once the user has been loaded
    useEffect(() => {
        reloadCertificates()
        reloadTransactions()
    }, [user])







    if (loading || checkingUser) {
        return (
            <div className="w-full h-screen flex flex-col gap-3 items-center justify-center bg-white">
                <p className="text-xl font-poppins font-semibold">Checking authentication...</p>
                <Spinner />
            </div>
        )
    }




    // show login modal if user is not logged in
    if (!user) {
        return <main className="w-full h-screen flex items-center flex-col md:flex-row justify-center  bg-[#f2f5fc]" >
            <Image src={"/user/auth-image.jpg"} alt="Image" height={1000} width={1000} className="w-full h-full max-h-[200px] md:max-h-none object-center object-cover md:max-w-[350px] lg:max-w-none lg:flex-1 " />
            <UserAuthModal />
        </main>
    }






    return (


        <div className="  bg-[#FAFBFC] w-full h-full relative flex items-center flex-col gap-8 text-black font-poppins  px-[4%] py-32 " >
            <Navbar />
            <Header user={user} />



            <main className="  w-full h-full lg:h-screen relative flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-5 lg:gap-10 flex-1     " >
                <SideNav setUser={setUser} user={user} />
                <div className="w-full h-full overflow-y-auto  " >
                    {children}
                </div>
            </main>

        </div>

    )
}


