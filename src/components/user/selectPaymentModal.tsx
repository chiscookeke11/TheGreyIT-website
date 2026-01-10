"use client"

import { useAppContext } from "@/context/AppContext";
import { useAuthUser } from "@/hooks/useAuthUser";
import { sendPaymentConfirmationEmail } from "@/lib/appActions";
import { supabase } from "@/lib/supabaseClient";
import { PaystackReference } from "@/types/types";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import { Spinner } from "../UI/Spinner";


const PaystackButton = dynamic(
    () => import("react-paystack").then((mod) => mod.PaystackButton),
    { ssr: false }
);





export default function SelectPaymentModal() {
    const { setShowPaymentModal, selectedCourse, showPaymentModal, userData, setIsEnrolled, setEnrolledNumber } = useAppContext()
    const [chosenLearningMode, setChosenLearningMode] = useState<"Learn Online (Live)" | "Learn In-House (Classroom)" | null>(null)
    const [paymentAmount, setPaymentAmount] = useState<number | null>(null)
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null)
    const public_key = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!
    const { user } = useAuthUser()
    const [processingPayment, setProcessingPayMent] = useState(false)







    const selectLearningMode = (mode: "Learn Online (Live)" | "Learn In-House (Classroom)" | null) => {
        setChosenLearningMode(mode)
    }



    // function to calculate learning fee and return in string
    const calcLearningFee = (learning_mode: string | null, paymentMode: string) => {
        if (!selectedCourse || !learning_mode) return null

        const baseFee = learning_mode === "Learn Online (Live)" ? selectedCourse.onlineFee : learning_mode === "Learn In-House (Classroom)" ? selectedCourse.inhouseFee : 0

        if (!baseFee) return null

        let amount: number

        switch (paymentMode) {
            case "full payment":
                amount = baseFee
                break

            case "2-part plan":
                amount = baseFee * 0.6
                break

            case "3-part plan":
                amount = baseFee * 0.4
                break

            default:
                return null
        }

        return `₦ ${amount.toLocaleString()}`
    }


    // function to return the payment amount in numbers
    const getLearningAmount = (
        learning_mode: "Learn Online (Live)" | "Learn In-House (Classroom)" | null,
        paymentMode: "Full payment" | "2-part payment" | "3-part payment"
    ): number | null => {
        if (!selectedCourse || !learning_mode) return null

        const baseFee =
            learning_mode === "Learn Online (Live)"
                ? selectedCourse.onlineFee
                : selectedCourse.inhouseFee

        if (!baseFee) return null

        switch (paymentMode) {
            case "Full payment":
                return baseFee
            case "2-part payment":
                return baseFee * 0.6
            case "3-part payment":
                return baseFee * 0.4
            default:
                return null
        }
    }


    const handleSelectPaymentMethod = (
        method: "Full payment" | "2-part payment" | "3-part payment"
    ) => {
        setSelectedPaymentMethod(method)

        const amount = getLearningAmount(chosenLearningMode, method)
        setPaymentAmount(amount)
    }



    // function to enroll a user
    const enrollUser = async (transactionId?: string) => {
        if (!user || !selectedCourse) return;

        const { error } = await supabase.from("course_enrollments").insert({
            user_id: user.id,
            course_id: selectedCourse?.id,
            transaction_id: transactionId,
            payment_Method: selectedPaymentMethod,
            learning_Mode: chosenLearningMode,
            amount: paymentAmount
        });

        if (!error) {
            setIsEnrolled(true);
            setEnrolledNumber((prev) => (prev ?? 0) + 1);
        }
    };




    // the paystack config
    const config = {
        reference: (new Date()).getTime().toString(),
        email: user?.email ?? "",
        amount: paymentAmount ? paymentAmount * 100 : 0,
        publicKey: public_key,
    };



    const handlePaystackSuccessAction = async (reference: PaystackReference) => {
        setProcessingPayMent(true)

        try {
            await supabase.from("transactions").insert({
                reference: reference.reference,
                status: reference.status,
                date: new Date().toISOString(),
                user_id: user?.id,
                course: selectedCourse?.title,
                course_id: selectedCourse?.id,
            });

            await enrollUser(reference.trxref);

            await supabase
                .from("user_data")
                .update({
                    list_enrolled_courses: [
                        ...(userData?.list_enrolled_courses || []),
                        selectedCourse?.id,
                    ],
                })
                .eq("user_id", user?.id);

            await sendPaymentConfirmationEmail({
                name: user?.user_metadata?.full_name ?? user?.email ?? "Learner",
                email: user?.email ?? "",
                course_title: selectedCourse?.title ?? "",
                reference: reference.reference,
                status: reference.status,
                date: new Date().toLocaleString(),
                dashboard_link: `${process.env.NEXT_PUBLIC_APP_URL}/user/courses/${selectedCourse?.id}`,
            });

            toast.success("Payment successful!");
            setShowPaymentModal(false);
            setProcessingPayMent(false)
        } catch (err) {
            console.error(err);
            toast.error("Payment failed");
        }
    };



    // you can call this function anything
    const handlePaystackCloseAction = () => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        setShowPaymentModal(false)
        setProcessingPayMent(false);
    }


    const componentProps = {
        ...config,
        text: 'Proceed',
        onSuccess: (reference: PaystackReference) => handlePaystackSuccessAction(reference),
        onClose: handlePaystackCloseAction,
    };




    if (processingPayment) {
        return (
            <div className="fixed inset-0 bg-gray-200 z-50 flex justify-center items-center gap-3 flex-col "  >
                <h4 className="text-xl font-semibold text-gray-700 " >Processing Payment</h4>
                <Spinner />
            </div>
        )
    }



    return (
        <div className="fixed inset-0 bg-gray-200 z-50 flex justify-center " >

            <div className=" w-full max-w-7xl max-h-screen overflow-y-auto py-10  flex flex-col gap-5 px-[7%]" >

                <button
                    onClick={() => setShowPaymentModal(false)}
                    className="mb-16 flex items-center shrink-0 justify-center border border-gray-800 rounded-full h-12 w-12 cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out text-gray-700 " >
                    <ArrowLeft />
                </button>

                <h1 className=" text-2xl font-semibold text-gray-700 " > {selectedCourse?.title ?? ""} </h1>

                {/* Learing mode buttons  */}
                <p className="text-sm font-medium text-gray-600 " >Select Learning mode</p>
                <div className="w-full grid grid-cols-1 md:grid-cols-3 place-items-center justify-end justify-items-end gap-6 mb-5 " >

                    {
                        selectedCourse?.onlineFee && selectedCourse.onlineFee > 0 ?
                            (

                                <button
                                    onClick={() => selectLearningMode("Learn Online (Live)")}
                                    className={`w-full h-full flex flex-col items-start gap-3 bg-white rounded-2xl py-7 px-6 cursor-pointer border-2  hover:border-gray-800 translate-all duration-300 ease-in-out ${chosenLearningMode === "Learn Online (Live)" ? "border-gray-800" : "border-transparent"} `} >
                                    <h3 className="font-bold text-lg text-gray-700 text-start " >Learn Online (Live) </h3>
                                    <p className=" font-normal text-sm text-gray-600 text-start " >Join live classes, interact in real time, and get guided step-by-step learning from start to finish.</p>

                                    <p className="font-extrabold text-xl text-gray-800 mt-5 " > ₦ {selectedCourse.onlineFee.toLocaleString()} </p>
                                </button>
                            )
                            : null
                    }



                    {
                        selectedCourse?.inhouseFee && selectedCourse.inhouseFee > 0 ? (
                            <button
                                onClick={() => selectLearningMode("Learn In-House (Classroom)")}
                                className={` w-full h-full flex flex-col items-start gap-3 bg-white rounded-2xl py-7 px-6 cursor-pointer border-2  hover:border-gray-800 translate-all duration-300 ease-in-out ${chosenLearningMode === "Learn In-House (Classroom)" ? "border-gray-800" : "border-transparent"}  `} >
                                <h3 className="font-bold text-lg text-gray-700 text-start" > Learn In-House (Classroom) </h3>
                                <p className=" font-normal text-sm text-gray-600 text-start" >Learn face-to-face in a focused classroom environment with hands-on guidance and direct support.</p>

                                <p className="font-extrabold text-xl text-gray-800 mt-5 " > ₦ {selectedCourse.inhouseFee.toLocaleString()} </p>
                            </button>
                        ) :
                            null
                    }

                </div>





                {/* payment method buttons  */}
                <p className="text-sm font-medium text-gray-600 " >Select payment method</p>


                <div className="w-full grid grid-cols-1 md:grid-cols-3 place-items-center justify-end justify-items-end gap-6  " >


                    <button
                        onClick={() => handleSelectPaymentMethod("Full payment")}
                        className={`w-full h-full flex flex-col items-start gap-3 bg-white rounded-2xl py-7 px-6 cursor-pointer border-2  hover:border-gray-800 translate-all duration-300 ease-in-out ${selectedPaymentMethod === "Full payment" ? "border-gray-700" : "border-transparent"} `} >
                        <h3 className="font-bold text-lg text-gray-700 text-start " >Make full payment</h3>
                        <p className=" font-normal text-sm text-gray-600 text-start " >Pay full and enjoy the course</p>

                        <p className="font-extrabold text-xl text-gray-800 mt-5 " >{calcLearningFee(chosenLearningMode, "full payment")} </p>
                    </button>


                    <button
                        onClick={() => handleSelectPaymentMethod("2-part payment")}
                        className={`w-full h-full flex flex-col items-start gap-3 bg-white rounded-2xl py-7 px-6 cursor-pointer border-2 hover:border-gray-800 translate-all duration-300 ease-in-out ${selectedPaymentMethod === "2-part payment" ? "border-gray-700" : "border-transparent"} `} >
                        <h3 className="font-bold text-lg text-gray-700 text-start" >2-part installment</h3>
                        <p className=" font-normal text-sm text-gray-600 text-start" >Pay full and enjoy the course</p>

                        <p className="font-extrabold text-xl text-gray-800 mt-5 " >{calcLearningFee(chosenLearningMode, "2-part plan")}</p>
                    </button>



                    <button
                        onClick={() => handleSelectPaymentMethod("3-part payment")}
                        className={`w-full h-full flex flex-col items-start gap-3 bg-white rounded-2xl py-7 px-6 cursor-pointer border-2  hover:border-gray-800 translate-all duration-300 ease-in-out  ${selectedPaymentMethod === "3-part payment" ? "border-gray-700" : "border-transparent"}`} >
                        <h3 className="font-bold text-lg text-gray-700 text-start " >3-part plan</h3>
                        <p className=" font-normal text-sm text-gray-600 text-start" >Pay full and enjoy the course</p>

                        <p className="font-extrabold text-xl text-gray-800 mt-5 " >{calcLearningFee(chosenLearningMode, "3-part plan")}</p>
                    </button>



                </div>

                {
                    paymentAmount && (
                        <PaystackButton
                            {...componentProps}
                            className="font-syne py-2 px-10 mt-5 rounded-lg cursor-pointer border border-gray-700
               hover:bg-gray-700 hover:text-white transition ml-auto"
                        />
                    )
                }

            </div>


        </div>
    )
}