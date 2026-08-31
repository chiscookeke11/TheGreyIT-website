"use client"

import { supabase } from "@/lib/supabaseClient"
import { courseEnrollmentsDataType, TransactionType, UserData } from "@/types/types"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function Page() {
    const [enrolledUsers, setEnrolledUsers] = useState<UserData[] | null>(null)
    const { id } = useParams()
    const [transactions, setTransactions] = useState<courseEnrollmentsDataType[] | null>(null)

    const courseId = Array.isArray(id) ? id[0] : id


    // Find users that registered the course
    const findUsersInDb = async () => {
        if (!courseId) return

        const { data, error } = await supabase
            .from("user_data")
            .select("*")
            .contains("list_enrolled_courses", [courseId])

        if (error) {
            console.error("Error fetching data")
            return
        }

        setEnrolledUsers(data)
    }

    useEffect(() => {
        findUsersInDb()
    }, [courseId])



    // now we fetch all transactions related to the course
    const fetchAllTransactionsForCourse = async () => {
        if (!courseId) return;

        const { data, error } = await supabase.from("course_enrollments").select("*").eq("course_id", courseId)

        if (error) {
            console.error("Error fetching data", error)
            return;
        }

        setTransactions(data)
    }


    useEffect(() => {
        fetchAllTransactionsForCourse()
    }, [courseId])



    // This function filters the amount paid by the student
    const getAmountPaid = (user_id: string) => {
        const txn = transactions?.find((t) => t.user_id === user_id);
        return txn ? txn.amount : "-";
    }

    // This function filters the payment method made by the student
    const getPaymentMethod = (user_id: string) => {
        const txn = transactions?.find((t) => t.user_id === user_id);
        return txn ? txn.payment_Method : "-";
    }


    // This function filters the learning method chosen by the student
    const getLearningMethod = (user_id: string) => {
        const txn = transactions?.find((t) => t.user_id === user_id);
        return txn ? txn.learning_Mode : "-";
    }

    // This function gets the date the course was registered by the student
    const getRegDate = (user_id: string) => {
        const txn = transactions?.find((t) => t.user_id === user_id);
        return txn ? new Date(txn.created_at).toDateString() : "-";
    }

    return (
        <div className="w-full h-full py-7 px-6 flex flex-col gap-10 font-poppins">
            <h1 className="font-syne font-semibold text-2xl">
                Course Enrollments
            </h1>





            <div className=" w-full overflow-x-auto " >
                <table className="w-full whitespace-nowrap  ">
                    <caption className="sr-only">
                        Transaction table of payments
                    </caption>

                    <thead>
                        <tr>
                            <th className="min-w-[80px] w-[80px] h-[72px] text-center bg-gray-700 p-[10px] text-xs md:text-base font-bold text-[#E1E1E1]">
                                S/N
                            </th>
                            <th className="min-w-[110px] w-[150px] h-[72px] text-center bg-gray-700 p-[10px] text-xs md:text-base font-bold text-[#E1E1E1]">
                                Email
                            </th>
                            <th className="min-w-[102px] w-[132px] h-[72px] text-center bg-gray-700 p-[10px] text-xs md:text-base font-bold text-[#E1E1E1]">
                                First Name
                            </th>
                            <th className="min-w-[80px] w-[120px] h-[72px] text-center bg-gray-700 p-[10px] text-xs md:text-base font-bold text-[#E1E1E1]">
                                Last Name
                            </th>
                            <th className="min-w-[80px] w-[120px] h-[72px] text-center bg-gray-700 p-[10px] text-xs md:text-base font-bold text-[#E1E1E1]">
                                Amount Paid
                            </th>

                            <th className="min-w-[80px] w-[120px] h-[72px] text-center bg-gray-700 p-[10px] text-xs md:text-base font-bold text-[#E1E1E1]">
                                Payment Method
                            </th>

                            <th className="min-w-[80px] w-[120px] h-[72px] text-center bg-gray-700 p-[10px] text-xs md:text-base font-bold text-[#E1E1E1]">
                                Learning Mode
                            </th>

                            <th className="min-w-[80px] w-[120px] h-[72px] text-center bg-gray-700 p-[10px] text-xs md:text-base font-bold text-[#E1E1E1]">
                                Date
                            </th>
                        </tr>
                    </thead>

                    <tbody className="w-full" >
                        {enrolledUsers?.map((u, index) => (
                            <tr key={u.id} className="border-b border-gray-600">
                                <td className="text-center p-3 text-sm ">{index + 1}</td>
                                <td className="text-center p-3 text-sm ">{u.email}</td>
                                <td className="text-center p-3 text-sm ">{u.first_name}</td>
                                <td className="text-center p-3 text-sm ">{u.last_name}</td>
                                <td className="text-center p-3 text-sm ">&#8358;{getAmountPaid(u.user_id)}</td>
                                <td className="text-center p-3 text-sm ">{getPaymentMethod(u.user_id)}</td>
                                <td className="text-center p-3 text-sm ">{getLearningMethod(u.user_id)}</td>
                                <td className="text-center p-3 text-sm ">{getRegDate(u.user_id)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>


            </div>
        </div>
    )
}
