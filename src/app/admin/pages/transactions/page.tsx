"use client"

import { Spinner } from "@/components/UI/Spinner"
import { supabase } from "@/lib/supabaseClient"
import { TransactionType } from "@/types/types"
import Image from "next/image"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"



export default function Page() {
    const PAGE_SIZE = 10

    const [transactionData, setTransactionData] = useState<TransactionType[] | null>(null)
    const [page, setPage] = useState(0)
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)



    // Caching for easier data fetch
    const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

    const getCachedTransactions = (page: number) => {
        const cached = localStorage.getItem(`transactions_page_${page}`)
        if (!cached) return null

        const { data, timestamp } = JSON.parse(cached)

        const isExpired = Date.now() - timestamp > CACHE_TTL
        if (isExpired) {
            localStorage.removeItem(`transactions_page_${page}`)
            return null
        }

        return data
    }



    const cacheTransactions = (page: number, data: TransactionType[]) => {
        const payload = {
            data,
            timestamp: Date.now()
        }

        localStorage.setItem(
            `transactions_page_${page}`,
            JSON.stringify(payload)
        )
    }





    const fetchAllTransactions = async (pageIndex: number) => {
        // 1. Check cache first
        const cachedData = getCachedTransactions(pageIndex)
        if (cachedData) {
            setTransactionData(cachedData)
            setHasMore(cachedData.length === PAGE_SIZE)
            return
        }

        setLoading(true)

        const from = pageIndex * PAGE_SIZE
        const to = from + PAGE_SIZE - 1

        const { data, error } = await supabase
            .from("transactions")
            .select("*")
            .order("created_at", { ascending: false })
            .range(from, to)

        setLoading(false)

        if (error) {
            toast.error("Failed to fetch transactions, please reload page")
            return
        }

        setTransactionData(data)
        setHasMore(data.length === PAGE_SIZE)

        // 2. Cache result
        cacheTransactions(pageIndex, data)
    }



    useEffect(() => {
        if (typeof window !== "undefined") {
            fetchAllTransactions(page)
        }
    }, [page])




    return (
        <div className="w-full h-full  py-7 px-6 flex flex-col items-start justify-start gap-10 font-poppins" >
            <h1 className=" font-syne font-semibold text-2xl   ">All Transactions</h1>





            <>
                {
                    loading ?
                        <div className=" w-full h-[30vh] flex items-center justify-center " >
                            <Spinner />
                        </div>
                        :
                        transactionData && transactionData?.length < 1 ?
                            <div className=" w-full min-h-[30vh] flex flex-col gap-7 items-center justify-center " >
                                <Image src={"/user/not-found-error-alert-svgrepo-com.svg"} alt="icon" height={500} width={500} className=" w-[250px] h-[250px] object-center " />
                                <h3 className="font-semibold text-2xl" >No Transaction found</h3>
                            </div>
                            :
                            (
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
                                                    Course
                                                </th>
                                                 <th className="min-w-[110px] w-[150px] h-[72px] text-center bg-gray-700 p-[10px] text-xs md:text-base font-bold text-[#E1E1E1]">
                                                    Amount
                                                </th>
                                                <th className="min-w-[102px] w-[132px] h-[72px] text-center bg-gray-700 p-[10px] text-xs md:text-base font-bold text-[#E1E1E1]">
                                                    Reference
                                                </th>
                                                <th className="min-w-[80px] w-[120px] h-[72px] text-center bg-gray-700 p-[10px] text-xs md:text-base font-bold text-[#E1E1E1]">
                                                    Status
                                                </th>
                                                <th className="min-w-[80px] w-[120px] h-[72px] text-center bg-gray-700 p-[10px] text-xs md:text-base font-bold text-[#E1E1E1]">
                                                    Date
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody className="w-full" >
                                            {transactionData?.map((t, index) => (
                                                <tr key={t.id} className="border-b border-gray-600">
                                                    <td className="text-center p-3 text-sm ">{index + 1}</td>
                                                    <td className="text-center p-3 text-sm ">{t.course}</td>
                                                    <td className="text-center p-3 text-sm ">₦ {t.amount?.toLocaleString()}</td>
                                                    <td className="text-center p-3 text-sm ">{t.reference}</td>
                                                    <td
                                                        className={`text-center p-3 text-sm  font-semibold ${t.status === "success"
                                                            ? "text-green-500"
                                                            : t.status === "pending"
                                                                ? "text-yellow-400"
                                                                : "text-red-500"
                                                            }`}
                                                    >
                                                        {t.status}
                                                    </td>
                                                    <td className="text-center p-3 text-sm ">{new Date(t.date).toISOString().split("T")[0]}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                    <div className="w-full max-w-xl mx-auto flex items-center justify-between mt-6">
                                        <button
                                            disabled={page === 0 || loading}
                                            onClick={() => setPage(prev => prev - 1)}
                                            className="px-4 py-2 cursor-pointer rounded bg-gray-700 disabled:opacity-50 text-white "
                                        >
                                            Previous
                                        </button>

                                        <span className="text-sm">
                                            Page {page + 1}
                                        </span>

                                        <button
                                            disabled={!hasMore || loading}
                                            onClick={() => setPage(prev => prev + 1)}
                                            className="px-4 py-2 cursor-pointer rounded bg-gray-700 disabled:opacity-50 text-white "
                                        >
                                            Next
                                        </button>
                                    </div>

                                </div>
                            )
                }
            </>
        </div>
    )
}