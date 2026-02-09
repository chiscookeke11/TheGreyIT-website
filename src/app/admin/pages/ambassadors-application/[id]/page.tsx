"use client"

import { Spinner } from "@/components/UI/Spinner"
import { supabase } from "@/lib/supabaseClient"
import { VolunteerFormDataType } from "@/types/types"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"


export default function Page() {
    const [userApplication, setUserApplication] = useState<VolunteerFormDataType | null>(null)
    const { id } = useParams()
    const [loading, setLoading] = useState(true)


    const fetchUserApplication = async () => {
        if (!id) return;
        setLoading(true)


        const { data, error } = await supabase.from("ambassadors_application").select("*").eq("id", id).maybeSingle()

        if (error) {
            console.error("Error fetching applications:", error)
            setLoading(false)
        }
        setUserApplication(data)
        setLoading(false)
    }


    useEffect(() => {
        fetchUserApplication()
    }, [id])


    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center" >
                <Spinner />
            </div>
        )
    }

    if (!userApplication && !loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center" >
                <h1 className=" font-syne font-semibold text-2xl">User application not found</h1>
            </div>
        )
    }


    return (
        <div className="w-full h-fit  py-7 px-6 flex flex-col items-start justify-start gap-10 font-poppins " >

            <h1 className="font-syne font-semibold text-2xl">
                {userApplication?.firstName
                    ? `${userApplication.firstName[0].toUpperCase()}${userApplication.firstName.slice(1).toLowerCase()}'s application`
                    : "Application"}
            </h1>


            <div className="w-full flex flex-col items-start gap-4 py-4 ">
                <table className="w-full border border-gray-300 text-left">
                    {/* Table Header */}
                    <thead className="bg-gray-100 text-sm ">
                        <tr>
                            <th className="border px-4 py-2 max-w-[200px]!">Field</th>
                            <th className="border px-4 py-2">Value</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className="font-normal text-sm " >
                        <tr>
                            <td className="border px-4 py-2">First Name</td>
                            <td className="border px-4 py-2">{userApplication?.firstName || "-"}</td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">Last Name</td>
                            <td className="border px-4 py-2">{userApplication?.lastName || "-"}</td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">Email</td>
                            <td className="border px-4 py-2">{userApplication?.email || "-"}</td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">Phone</td>
                            <td className="border px-4 py-2">{userApplication?.phoneNumber || "-"}</td>
                        </tr>

                        <tr>
                            <td className="border px-4 py-2">City</td>
                            <td className="border px-4 py-2">{userApplication?.city || "-"}</td>
                        </tr>

                        <tr>
                            <td className="border px-4 py-2">State</td>
                            <td className="border px-4 py-2">{userApplication?.state || "-"}</td>
                        </tr>

                        <tr>
                            <td className="border px-4 py-2">School</td>
                            <td className="border px-4 py-2">{userApplication?.school || "-"}</td>
                        </tr>

                        <tr>
                            <td className="border px-4 py-2">Department</td>
                            <td className="border px-4 py-2">{userApplication?.department || "-"}</td>
                        </tr>

                        <tr>
                            <td className="border px-4 py-2">Level of Study</td>
                            <td className="border px-4 py-2">{userApplication?.levelOfStudy || "-"}</td>
                        </tr>

                        <tr>
                            <td className="border px-4 py-2">I am a:</td>
                            <td className="border px-4 py-2">{userApplication?.educationStatus || "-"}</td>
                        </tr>

                        <tr>
                            <td className="border px-4 py-2">Preferred Role</td>
                            <td className="border px-4 py-2">{userApplication?.preferredRole || "-"}</td>
                        </tr>

                        <tr>
                            <td className="border px-4 py-2">Interests</td>
                            <td className="border px-4 py-2">{userApplication?.interests.join(',  ') || "-"}</td>
                        </tr>

                        <tr>
                            <td className="border px-4 py-2">How you can help</td>
                            <td className="border px-4 py-2">{userApplication?.howCanYouHelp || "-"}</td>
                        </tr>


                        <tr>
                            <td className="border px-4 py-2">Availability</td>
                            <td className="border px-4 py-2">{userApplication?.availability || "-"}</td>
                        </tr>

                        <tr>
                            <td className="border px-4 py-2">How soon can you start?</td>
                            <td className="border px-4 py-2">{userApplication?.startOptions || "-"}</td>
                        </tr>

                        <tr>
                            <td className="border px-4 py-2">How Do You Expect to Benefit?</td>
                            <td className="border px-4 py-2">{userApplication?.benefits || "-"}</td>
                        </tr>

                        <tr>
                            <td className="border px-4 py-2">Other benefits</td>
                            <td className="border px-4 py-2">{userApplication?.otherBenefit || "-"}</td>
                        </tr>

                        <tr>
                            <td className="border px-4 py-2">Motivation</td>
                            <td className="border px-4 py-2">{userApplication?.motivation || "-"}</td>
                        </tr>

                        <tr>
                            <td className="border px-4 py-2">Consent & Declaration</td>
                            <td className="border px-4 py-2">{userApplication?.consent || "-"}</td>
                        </tr>

                    </tbody>
                </table>
            </div>


        </div>
    )
}