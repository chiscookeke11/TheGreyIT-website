"use client";



import Image from "next/image";
import Button from "../UI/Button";
import React, { useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import { VolunteerFormDataType } from "@/types/types";
import toast from "react-hot-toast";



export default function VolunteerPageComponent() {
    const [currentStep, setCurrentStep] = useState(1)
    const [formValues, setFormValues] = useState<VolunteerFormDataType>({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        city: "",
        state: "",
        school: "",
        department: "",
        levelOfStudy: "",
        educationStatus: "",
        interests: [""],
        preferredRole: "",
        howCanYouHelp: "",
        availability: "",
        startOptions: "",
        benefits: [""],
        otherBenefit: "",
        motivation: "",
        socialMedia: "",
        consent: ""
    })


    console.log(formValues)


    // function to go to the next step of the form
    const handleNext = () => {
        if (currentStep === 4) return;


        // first step validation
        if (currentStep === 1 &&
           ( !formValues.firstName ||
            !formValues.lastName ||
            !formValues.email ||
            !formValues.phoneNumber ||
            !formValues.school ||
            !formValues.city ||
            !formValues.state ||
            !formValues.levelOfStudy)) {

            return toast.error("Please fill in the required fields")
        }

        // second step validation
        if (currentStep === 2 &&
           ( !formValues.educationStatus ||
            !formValues.preferredRole ||
            !formValues.interests ||
            !formValues.howCanYouHelp)
        ) {
            return toast.error("Please fill in the required fields")
        }

        setCurrentStep((prev) => prev + 1)
    }



    // function to go to the prev step of the form
    const handlePrev = () => {
        if (currentStep === 1) return;

        setCurrentStep((prev) => prev - 1)
    }


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        alert("submited")
    }




    return (
        <div className="w-full h-full flex items-center justify-center px-[3%] pb-18 pt-32 " >


            {
                currentStep
            }

            <div className="w-full max-w-7xl h-full flex items-stretch gap-0 font-poppins bg-white shadow-xs overflow-hidden rounded-3xl " >


                {/* The left side  */}
                <div className="w-full lg:w-1/2 h-full  flex items-center justify-center px-[3%] py-12 " >
                    <form onSubmit={handleSubmit} className="w-full px-1  flex flex-col items-start gap-9 " >
                        <div>
                            <h1 className="text-gray-500 font-bold text-xl md:text-3xl  mb-3  " >Turn Your <span className="text-gray-800">Tech Interest</span> into Opportunity volunteer!</h1>
                            <p className="text-gray-700 font-normal text-sm w-[90%] " >Join TheGreyIT as a Student or Graduate Ambassador. learn, grow, and earn through tech promotion and community impact. </p>
                        </div>

                        {
                            currentStep === 1 ? (
                                <StepOne
                                    formValues={formValues}
                                    setFormValues={setFormValues}
                                />
                            ) :
                                currentStep === 2 ?
                                    (
                                        <StepTwo
                                            formValues={formValues}
                                            setFormValues={setFormValues}
                                        />
                                    )
                                    :
                                    currentStep === 3 ? (
                                        <StepThree
                                            formValues={formValues}
                                            setFormValues={setFormValues}
                                        />
                                    )
                                        : (
                                            <StepFour
                                                formValues={formValues}
                                                setFormValues={setFormValues}
                                            />
                                        )
                        }

                        {/* The navigation buttons  */}
                        <div className="w-full flex items-center gap-4" >
                            {currentStep !== 1 && (
                                <Button
                                    type="button"
                                    ariaLabel="Previous"
                                    variant="default"
                                    className="w-full py-2! text-base! "
                                    onClick={handlePrev}
                                >Prev</Button>
                            )}




                            {
                                currentStep === 4 ? (
                                    <Button
                                        type="submit"
                                        ariaLabel="submit"
                                        variant="default"
                                        className="w-full py-2! text-base! "
                                    >Submit</Button>
                                )
                                    :
                                    (
                                        <Button
                                            type="button"
                                            ariaLabel="Next"
                                            variant="default"
                                            className="w-full py-2! text-base! "
                                            onClick={handleNext}
                                        >Next</Button>
                                    )
                            }
                        </div>


                    </form>
                </div>









                {/* The right side  */}

                <div className="w-1/2 h-auto  hidden lg:block bg-grey-300 overflow-hidden relative " >

                    <Image src={"/about-us/about-us-hero.avif"} alt="image" fill className="w-full h-full object-center object-cover" />


                    <div className=" w-full text-white absolute z-10 h-full px-7 py-12 flex flex-col items-start justify-end gap-3 bg-black/25 " >
                        <h2 className="text-xl font-bold md:text-3xl" >TheGreyIT</h2>
                        <div className="flex flex-col md:flex-row items-center gap-2  text-sm md:text-base font-bold " >
                            <h1>Learn.</h1>
                            <h1>Build.</h1>
                            <h1>Advance.</h1>
                        </div>
                    </div>
                </div>


            </div>


        </div>
    )
}