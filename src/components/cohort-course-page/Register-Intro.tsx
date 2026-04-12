



"use client"

import { CohortStudentRegistrationTypes, IntroCourseStudentRegistrationType, PaystackReference, QuickIntroClass } from "@/types/types";
import Image from "next/image"
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { handleChange, handleSelectChange } from "@/lib/utils";
import { CustomCheckBox } from "../UI/CustomCheckbox";
import { CustomSelect } from "../UI/CustomSelect";
import { countryOptions } from "@/data/CountryList";
import { usePaystackPayment } from "react-paystack";
import { quickIntroClasses } from "@/data/IntroCourse_data";
import Loading from "../UI/Loading";


interface PageProps {
    slug: string
    fixedFee?: number
    pageTitle?: string
    pageSubtitle?: string
}




export default function RegisterIntro({
    slug,
    pageTitle = "Join the Technical Cohort",
    pageSubtitle = "REGISTRATION OPEN",
}: PageProps) {

    const [currentCourse, setCurrentCourse] = useState<QuickIntroClass | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const public_key = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!

    const [formValues, setFormValues] = useState<IntroCourseStudentRegistrationType>({
        email: "",
        fullname: "",
        gender: "",
        city: "",
        state: "",
        country: "",
        phone_number: "",
        whatsapp_number: "",
        course: "",
        priceToPay: 10000,
    })


    //   This function fetches the course details
    useEffect(() => {
        const course = quickIntroClasses.find((c) => c.slug === slug)
        setCurrentCourse(course || null)
    }, [slug])

    useEffect(() => {
        if (!currentCourse) return;

        setFormValues((prev) => ({
            ...prev,
            course: currentCourse.title,
        }))
    }, [currentCourse])


    // These are the options for gender
    const genderOptions: CohortStudentRegistrationTypes["gender"][] = [
        "female",
        "male"
    ]


    const saveEnrollment = async (reference: PaystackReference) => {

        setIsSubmitting(true)

        try {
            const response = await fetch("/api/payments/intro", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    reference: reference.reference,
                    status: reference.status,
                    course: formValues.course,
                    email: formValues.email,
                    gender: formValues.gender,
                    phone_number: formValues.phone_number,
                    city: formValues.city,
                    state: formValues.state,
                    country: formValues.country,
                    priceToPay: formValues.priceToPay,
                    fullname: formValues.fullname,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                toast.error("Failed to submit");
                console.error("Error submitting", result.error)
                return;
            }

            console.log("Payment timestamp from reference:", result.paymentTimestamp);
            setShowSuccessPopup(true);

            setFormValues({
                email: "",
                fullname: "",
                gender: "",
                city: "",
                state: "",
                country: "",
                phone_number: "",
                whatsapp_number: "",
                course: "",
                priceToPay: 10000,
            });

        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
        finally {
            setIsSubmitting(false)
        }
    };



    // you can call this function anything
    const handlePaystackCloseAction = () => {
        console.log("Payment concluded")
    }


    // This function executes on successful payment
    const handlePaystackSuccessAction = async (reference: PaystackReference) => {
        await saveEnrollment(reference);

        return true;
    }


    // This is the input validation
    const validateForm = () => {
        if (!formValues.fullname.trim()) {
            toast.error("Full name is required");
            return false;
        }

        if (!formValues.email.trim()) {
            toast.error("Email is required");
            return false;
        }

        // simple email check
        if (!/\S+@\S+\.\S+/.test(formValues.email)) {
            toast.error("Enter a valid email");
            return false;
        }

        if (!formValues.phone_number.trim()) {
            toast.error("Phone number is required");
            return false;
        }

        if (!formValues.whatsapp_number.trim()) {
            toast.error("WhatsApp number is required");
            return false;
        }

        if (!formValues.city.trim()) {
            toast.error("City is required");
            return false;
        }

        if (!formValues.state.trim()) {
            toast.error("State is required");
            return false;
        }

        if (!formValues.country) {
            toast.error("Please select your country");
            return false;
        }

        if (!formValues.gender) {
            toast.error("Please select your gender");
            return false;
        }

        if (Number(formValues.priceToPay) <= 0) {
            toast.error("Invalid payment amount");
            return false;
        }

        return true;
    };

    // paystack details
    const config = {
        reference: (new Date()).getTime().toString(),
        email: formValues.email,
        amount: Number(formValues.priceToPay) * 100,
        publicKey: public_key,
    };

    const initializePayment = usePaystackPayment(config);

    const handleProceedToPayment = () => {
        if (!validateForm()) return;

        initializePayment({
            onSuccess: (reference: PaystackReference) => handlePaystackSuccessAction(reference),
            onClose: handlePaystackCloseAction,
        });
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }


    return (
        <div className="relative w-full flex flex-col gap-10 items-center justify-start pt-24 md:pt-40 pb-16 px-[2%] md:px-[14%]  bg-white min-h-screen"  >

            <div className=" w-full h-[50vh] relative overflow-hidden rounded-xl bg-gray-200 "  >
                <Image src={"/intro-courses-images/ivan-diaz-YOy-ek-aBR0-unsplash.jpg"} alt={currentCourse?.title || "image"} fill className="object-cover object-center " />
                <div className=" w-full h-full absolute inset-0 bg-black/57 " />

                <div className="w-full h-full z-10  absolute inset-0 flex flex-col gap-5  text-white px-[4%] items-start justify-center font-poppins "  >
                    <h4 className="font-sans  font-medium text-lg md:text-xl " >{pageSubtitle}</h4>
                    <h2 className=" font-bold text-3xl md:text-5xl    "  >{pageTitle}</h2>
                    {currentCourse && (
                        <p className="text-sm md:text-lg">{currentCourse.title}</p>
                    )}

                </div>
            </div>


            <form
                onSubmit={handleSubmit}
                className="w-full font-poppins grid grid-cols-2 place-items-center justify-items-center gap-x-3 gap-y-5  md:gap-7 "  >

                {/* full name */}
                <label htmlFor="fullname" className=" w-full flex flex-col items-start gap-1  " >
                    <span className="text-xs  font-medium " >First Name*</span>
                    <input
                        type="text"
                        id="fullname"
                        name="fullname"
                        value={formValues.fullname}
                        onChange={(e) => handleChange(e, setFormValues)}
                        className="w-full py-2 px-3 border border-gray-700 outline-none focus:outline-none text-sm rounded-sm " />
                </label>


                {/* email */}
                <label htmlFor="email" className=" w-full flex flex-col items-start gap-1  " >
                    <span className="text-xs  font-medium " >Email*</span>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formValues.email}
                        onChange={(e) => handleChange(e, setFormValues)}
                        className="w-full py-2 px-3 border border-gray-700 outline-none focus:outline-none text-sm rounded-sm " />
                </label>


                {/* phone number  */}
                <label htmlFor="phone_number" className=" w-full flex flex-col items-start gap-1  " >
                    <span className="text-xs  font-medium " >Phone Number*</span>
                    <input
                        type="tel"
                        id="phone_number"
                        name="phone_number"
                        value={formValues.phone_number}
                        onChange={(e) => handleChange(e, setFormValues)}
                        required
                        className="w-full py-2 px-3 border border-gray-700 outline-none focus:outline-none text-sm rounded-sm " />
                </label>


                {/*Whatsapp phone number  */}
                <label htmlFor="whatsapp_number" className=" w-full flex flex-col items-start gap-1  " >
                    <span className="text-xs  font-medium " >WhatsApp Number*</span>
                    <input
                        type="tel"
                        id="whatsapp_number"
                        name="whatsapp_number"
                        value={formValues.whatsapp_number}
                        onChange={(e) => handleChange(e, setFormValues)}
                        required
                        className="w-full py-2 px-3 border border-gray-700 outline-none focus:outline-none text-sm rounded-sm " />
                </label>


                {/* City  */}
                <label htmlFor="city" className=" w-full flex flex-col items-start gap-1  " >
                    <span className="text-xs  font-medium " >City*</span>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={formValues.city}
                        onChange={(e) => handleChange(e, setFormValues)}
                        required
                        className="w-full py-2 px-3 border border-gray-700 outline-none focus:outline-none text-sm rounded-sm " />
                </label>


                {/* state  */}
                <label htmlFor="state" className=" w-full flex flex-col items-start gap-1  " >
                    <span className="text-xs font-medium " >State*</span>
                    <input
                        type="text"
                        id="state"
                        name="state"
                        value={formValues.state}
                        onChange={(e) => handleChange(e, setFormValues)}
                        required
                        className="w-full py-2 px-3 border border-gray-700 outline-none focus:outline-none text-sm rounded-sm " />
                </label>


                {/* country  */}
                <div className="w-full col-span-2 " >
                    <CustomSelect
                        name="country"
                        value={formValues.country}
                        options={countryOptions}
                        placeholder="Please select your country"
                        isRequired
                        onChange={(name, value) =>
                            handleSelectChange<IntroCourseStudentRegistrationType>(
                                "country",
                                value,
                                setFormValues
                            )
                        }
                        label="Country"
                    />
                </div>



                {/* Gender  */}
                <div className="w-full flex flex-col items-start gap-2 " >
                    <h1 className="text-[#000000] font-medium text-sm font-lato flex items-start gap-1" >Gender *</h1>


                    <div className=" grid grid-cols-2 gap-4 justify-items-stretch  "  >
                        {genderOptions.map((option) => {
                            const isChecked = formValues.gender === option
                            return (
                                <CustomCheckBox
                                    key={option}
                                    checked={isChecked}
                                    label={option}
                                    id={option.toLowerCase()}
                                    onCheckedChange={(checked) => {
                                        if (checked) {
                                            setFormValues((prev) => ({
                                                ...prev,
                                                gender: option,
                                            }))
                                        }
                                    }}
                                />
                            )
                        })}
                    </div>
                </div>


                {/* payment button  */}
                <button
                    type="button"
                    onClick={handleProceedToPayment}
                    className="w-full col-span-2 mx-auto max-w-xs md:max-w-xl font-syne py-2 px-10 mt-5 rounded-lg cursor-pointer border border-gray-700
               hover:bg-gray-700 hover:text-white transition ml-auto flex items-center justify-center "
                >
                    {isSubmitting ? <Loading /> : "Proceed"}
                </button>

            </form>

            <p className="col-span-2 text-sm font-medium text-green-700 font-sans ">
                You are paying: ₦{formValues.priceToPay.toLocaleString()}
            </p>



            {showSuccessPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                    <div className="w-full max-w-md rounded-xl bg-white p-6 text-center shadow-xl font-poppins">
                        <h3 className="text-2xl font-semibold text-gray-900">Registration Successful!</h3>
                        <p className="mt-3 text-sm text-gray-700">
                            Your payment has been confirmed and your registration is complete.
                        </p>
                        <button
                            type="button"
                            onClick={() => setShowSuccessPopup(false)}
                            className="mt-6 rounded-lg bg-gray-900 px-6 py-2 text-sm font-medium text-white hover:bg-gray-700 transition cursor-pointer "
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
