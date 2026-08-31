"use client"

import { useAppContext } from "@/context/AppContext"
import { supabase } from "@/lib/supabaseClient"
import { useEffect, useState } from "react"

export default function Page() {
    const { userData } = useAppContext()

    const [userDataLength, setUserDataLength] = useState<number | null>(null)
    const [coursesLength, setCoursesLength] = useState<number | null>(null)
    const [reviewsLength, setReviewsLength] = useState<number | null>(null)
    const [blogsLength, setBlogsLength] = useState<number | null>(null)
    const [transactionsLength, setTransactionsLength] = useState<number | null>(null)
    const [ambassadorsLength, setAmbassadorsLength] = useState<number | null>(null)

    const [loading, setLoading] = useState(true)

    //  Optimized dashboard loader
    const fetchDashboardCounts = async () => {
        setLoading(true)

        const [
            usersRes,
            coursesRes,
            reviewsRes,
            blogsRes,
            transactionsRes,
            ambassadorsRes
        ] = await Promise.all([
            supabase.from("user_data").select("*", { count: "exact", head: true }),
            supabase.from("course").select("*", { count: "exact", head: true }),
            supabase.from("userReviews").select("*", { count: "exact", head: true }),
            supabase.from("blog").select("*", { count: "exact", head: true }),
            supabase.from("transactions").select("*", { count: "exact", head: true }),
            supabase
                .from("user_data")
                .select("*", { count: "exact", head: true })
                .eq("is_ambassador", true)
        ])

        // if (usersRes.error) console.error(usersRes.error)
        // if (coursesRes.error) console.error(coursesRes.error)
        // if (reviewsRes.error) console.error(reviewsRes.error)
        // if (blogsRes.error) console.error(blogsRes.error)
        // if (transactionsRes.error) console.error(transactionsRes.error)
        // if (ambassadorsRes.error) console.error(ambassadorsRes.error)

        setUserDataLength(usersRes.count ?? 0)
        setCoursesLength(coursesRes.count ?? 0)
        setReviewsLength(reviewsRes.count ?? 0)
        setBlogsLength(blogsRes.count ?? 0)
        setTransactionsLength(transactionsRes.count ?? 0)
        setAmbassadorsLength(ambassadorsRes.count ?? 0)

        setLoading(false)
    }

    useEffect(() => {
        fetchDashboardCounts()
    }, [])

    return (
        <div className="w-full h-fit py-7 px-6 flex flex-col items-start gap-5 font-poppins">

            <div className="flex flex-col items-start gap-3">
                <h1 className="font-syne font-semibold text-2xl">
                    Welcome,{" "}
                    {userData &&
                        userData.first_name[0] +
                        userData.first_name.slice(1).toLowerCase()}
                </h1>
            </div>

            <div className="w-full flex items-center p-1 overflow-x-auto">
                <ul className="w-fit flex items-center gap-6 flex-nowrap">

                    <Stat label="Users" value={userDataLength} loading={loading} />
                    <Stat label="Courses" value={coursesLength} loading={loading} />
                    <Stat label="Reviews" value={reviewsLength} loading={loading} />
                    <Stat label="Ambassadors" value={ambassadorsLength} loading={loading} />
                    <Stat label="Blogs" value={blogsLength} loading={loading} />
                    <Stat label="Sales" value={transactionsLength} loading={loading} />

                </ul>
            </div>
        </div>
    )
}



function Stat({
    label,
    value,
    loading
}: {
    label: string
    value: number | null
    loading: boolean
}) {
    return (
        <li className="flex items-center gap-3 bg-gray-700 text-white rounded-full py-2 px-8 text-sm cursor-pointer hover:translate-y-[-3px] duration-200 ease-in-out ">
            {loading ? "-" : value} {label}
        </li>
    )
}