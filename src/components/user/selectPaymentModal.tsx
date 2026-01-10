"use client"

import { useAppContext } from "@/context/AppContext";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";






export default function SelectPaymentModal() {

    const {setShowPaymentModal, selectedCourse, showPaymentModal} = useAppContext()

    useEffect(() => {

        document.body.style.overflowY = showPaymentModal? "hidden" : "auto"

        return () => {
            document.body.style.overflowY = "auto"
        }

    }, [showPaymentModal])


    return (
        <div className="w-full h-screen flex items-center justify-center fixed inset-0 bg-gray-200  z-50 " >

            <div className=" w-full max-w-7xl h-full flex py-10 flex-col items-start justify-center gap-5 px-[7%] " >

                <button
                onClick={() => setShowPaymentModal(false)}
                 className="mb-16 flex items-center justify-center border border-gray-800 rounded-full h-12 w-12 cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out text-gray-700 " >
                    <ArrowLeft />
                </button>

                <h1 className=" text-2xl font-semibold text-gray-700 " > {selectedCourse?.title ?? ""} </h1>
                <p className="text-sm font-medium text-gray-600 " >Select payment method</p>


                <div className="w-full grid grid-cols-4 place-items-center justify-end justify-items-end gap-6 mt-5 " >


                    <button className="w-full h-full flex flex-col items-start gap-3 bg-white rounded-2xl py-7 px-6 cursor-pointer border-2 border-transparent hover:border-gray-800 translate-all duration-300 ease-in-out " >
                        <h3 className="font-bold text-lg text-gray-700 text-start " >Make full payment</h3>
                        <p className=" font-normal text-sm text-gray-600 text-start " >Pay full and enjoy the course</p>

                        <p className="font-extrabold text-xl text-gray-800 mt-5 " >50,000</p>
                    </button>


                    <button className="w-full h-full flex flex-col items-start gap-3 bg-white rounded-2xl py-7 px-6 cursor-pointer border-2 border-transparent hover:border-gray-800 translate-all duration-300 ease-in-out " >
                        <h3 className="font-bold text-lg text-gray-700 text-start" >2-part installment</h3>
                        <p className=" font-normal text-sm text-gray-600 text-start" >Pay full and enjoy the course</p>

                        <p className="font-extrabold text-xl text-gray-800 mt-5 " >50,000</p>
                    </button>



                    <button className="w-full h-full flex flex-col items-start gap-3 bg-white rounded-2xl py-7 px-6 cursor-pointer border-2 border-transparent hover:border-gray-800 translate-all duration-300 ease-in-out " >
                        <h3 className="font-bold text-lg text-gray-700 text-start " >3-part plan</h3>
                        <p className=" font-normal text-sm text-gray-600 text-start" >Pay full and enjoy the course</p>

                        <p className="font-extrabold text-xl text-gray-800 mt-5 " >50,000</p>
                    </button>

                       <button className="w-full h-full flex flex-col items-start gap-3 bg-white rounded-2xl py-7 px-6 cursor-pointer border-2 border-transparent hover:border-gray-800 translate-all duration-300 ease-in-out " >
                        <h3 className="font-bold text-lg text-gray-700 text-start" >Monthly payment plan</h3>
                        <p className=" font-normal text-sm text-gray-600 text-start" >Pay full and enjoy the course</p>

                        <p className="font-extrabold text-xl text-gray-800 mt-5 " >50,000</p>
                    </button>


                </div>

            </div>


        </div>
    )
}