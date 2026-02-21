"use client"

import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { Spinner } from "../UI/Spinner";
import { useEffect } from "react";


export default function TransactionsTable() {
    const { transactionData, reloadTransactions, userData } = useAppContext()

    useEffect(() => {
        reloadTransactions()
    }, [userData])


    return (
        <>
            {
                !transactionData ?
                    <div className=" w-full h-[30vh] flex items-center justify-center " >
                        <Spinner />
                    </div>
                    :
                    transactionData?.length < 1 ?
                        <div className=" w-full min-h-[30vh] flex flex-col gap-7 items-center justify-center " >
                            <Image src={"/user/not-found-error-alert-svgrepo-com.svg"} alt="icon" height={500} width={500} className=" w-[250px] h-[250px] object-center " />
                            <h3 className="font-semibold text-2xl" >No Transaction found</h3>
                        </div>
                        :
                        (
                            <div className=" w-full overflow-x-auto " >
                                <table className="w-full whitespace-nowrap">
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
                                                <td className="text-center p-3 text-sm md:text-base">{index + 1}</td>
                                                <td className="text-center p-3 text-sm md:text-base">{t.course}</td>
                                                <td className="text-center p-3 text-sm md:text-base">₦ {t.amount.toLocaleString()}</td>
                                                <td className="text-center p-3 text-sm md:text-base">{t.reference}</td>
                                                <td
                                                    className={`text-center p-3 text-sm md:text-base font-semibold ${t.status === "success"
                                                        ? "text-green-500"
                                                        : t.status === "pending"
                                                            ? "text-yellow-400"
                                                            : "text-red-500"
                                                        }`}
                                                >
                                                    {t.status}
                                                </td>
                                                <td className="text-center p-3 text-sm md:text-base">{new Date(t.date).toISOString().split("T")[0]}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )
            }
        </>
    );
}
