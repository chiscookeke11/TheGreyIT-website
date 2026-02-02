"use client"

import { supabase } from "@/lib/supabaseClient"
import { VolunteerFormDataType } from "@/types/types"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Spinner } from "@/components/UI/Spinner"




export default function Page() {
    const [applications, setApplications] = useState<VolunteerFormDataType[] | null>(null)
    const [loading, setLoading] = useState(true)


    // function to fetch applications
    const fetchApplications = async () => {
        setLoading(true)

        const { data, error } = await supabase
            .from("ambassadors_application")
            .select("*")

        if (error) {
            console.error("Error fetching applications:", error)
        }

        setApplications(data)
        setLoading(false)
    }



    useEffect(() => {
        fetchApplications()
    }, [])


    return (
        <div className="w-full h-full  py-7 px-6 flex flex-col items-start justify-center gap-10 font-poppins" >
            <h1 className=" font-syne font-semibold text-2xl   ">Ambassadors Application</h1>


            {loading ? (
                <div className="w-full h-[40vh] flex items-center justify-center">
                    <Spinner />
                </div>
            ) : applications && applications.length === 0 ? (
                <div className="w-full h-[40vh] flex items-center justify-center text-sm text-gray-400">
                    No applications found
                </div>
            ) : (
                <div className=" w-full h-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-start justify-items-center justify-center " >
                    {applications?.map((data, index) => (
                        <Link
                            href={`/admin/pages/ambassadors-application/${data.id}`}
                            key={data.id}
                            className=" w-full cursor-pointer shadow-sm h-fit flex flex-col items-start gap-2 px-3 py-4 hover:scale-105 duration-200 ease-in-out transition-all border-[0.5px] border-gray-700 "
                        >
                            <h2 className="text-sm font-medium">
                                <b>Name:</b> {data.firstName} {data.lastName}
                            </h2>
                            <h3 className="text-sm font-medium">
                                <b>Email:</b> {data.email}
                            </h3>
                            <p className="text-sm font-medium">
                                <b>Phone number:</b> {data.phoneNumber}
                            </p>
                            <p className="text-sm font-medium">
                                <b>Preferred role:</b> {data.preferredRole}
                            </p>
                            <small className="mx-auto">Click to see more details</small>
                        </Link>
                    ))}
                </div>
            )}

        </div>
    )
}