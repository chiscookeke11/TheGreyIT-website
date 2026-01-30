"use client";



import Image from "next/image";
import Button from "../UI/Button";
import React, { useEffect, useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import { VolunteerFormDataType } from "@/types/types";
import toast from "react-hot-toast";
import { supabase } from "@/lib/supabaseClient";



// loading spinner
const Spinner = () => {
    return (
        <div className="h-10 w-10 mx-auto rounded-full border-4 border-gray-800 border-t-transparent animate-spin duration-150 ease-in-out transition-all group-hover:border-gray-700 group-hover:border-t-transparent " />
    )
}


// local storage key
const FORM_STORAGE_KEY = "ambassador_application_form";


export default function VolunteerPageComponent() {
    const [currentStep, setCurrentStep] = useState(1)
    const [loading, setLoading] = useState(false)
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
        interests: [],
        preferredRole: "",
        howCanYouHelp: "",
        availability: "",
        startOptions: "",
        benefits: [],
        otherBenefit: "",
        motivation: "",
        consent: ""
    })




    // Load saved form on mount
    useEffect(() => {
        const saved = localStorage.getItem(FORM_STORAGE_KEY);

        if (!saved) return;

        try {
            const parsed = JSON.parse(saved);

            if (parsed.formValues) {
                setFormValues(parsed.formValues);
            }

            if (typeof parsed.currentStep === "number") {
                setCurrentStep(parsed.currentStep);
            }
        } catch {
            console.error("Invalid saved form data");
        }
    }, []);



    // Auto-save form changes
    useEffect(() => {
        const payload = {
            formValues,
            currentStep
        };

        localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(payload));
    }, [formValues, currentStep]);




    // function to go to the next step of the form
    const handleNext = () => {
        if (currentStep === 4) return;


        // first step validation
        if (currentStep === 1 &&
            (!formValues.firstName ||
                !formValues.lastName ||
                !formValues.email ||
                !formValues.phoneNumber ||
                !formValues.school ||
                !formValues.city ||
                !formValues.state ||
                !formValues.department ||
                !formValues.levelOfStudy)) {

            return toast.error("Please fill in the required fields")
        }

        // second step validation
        if (currentStep === 2 &&
            (!formValues.educationStatus ||
                !formValues.preferredRole ||
                !formValues.interests ||
                !formValues.howCanYouHelp)) {

            return toast.error("Please fill in the required fields")
        }

        // third step validation
        if (currentStep === 3 &&
            (!formValues.availability ||
                !formValues.startOptions ||
                !formValues.benefits)) {
            return toast.error("Please fill in the required fields")
        }



        setCurrentStep((prev) => prev + 1)
    }



    // function to go to the prev step of the form
    const handlePrev = () => {
        if (currentStep === 1) return;

        setCurrentStep((prev) => prev - 1)
    }



    // required fields
    const requiredFields: (keyof VolunteerFormDataType)[] = [
        "firstName",
        "lastName",
        "phoneNumber",
        "email",
        "city",
        "state",
        "school",
        "levelOfStudy",
        "educationStatus",
        "preferredRole",
        "howCanYouHelp",
        "availability",
        "startOptions",
        "motivation",
        "consent"
    ];




    // testing if a field is complete
    const isComplete = (data: VolunteerFormDataType) => {
        return requiredFields.every((key) => {
            const value = data[key]


            // empty string
            if (typeof value === "string") {
                return value.trim() !== ""
            }


            // arrays
            if (Array.isArray(value)) {
                return value.length > 0 && value.some(v => v.trim() !== "")
            }

            return true
        })
    }


    // The function to process submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!isComplete(formValues)) {
            return toast.error("Please fill in all required fields")
        }


        setLoading(true)

        const { data, error } = await supabase.from("ambassadors_application").insert({
            ...formValues
        })

        if (error?.code === "23505") {
            setLoading(false)
            return toast.error(`You've already submitted an application with this email`)

        }

        // clear local storage
        localStorage.removeItem(FORM_STORAGE_KEY);
        setCurrentStep(1);
        //  reset form + step
        setFormValues({
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
            interests: [],
            preferredRole: "",
            howCanYouHelp: "",
            availability: "",
            startOptions: "",
            benefits: [],
            otherBenefit: "",
            motivation: "",
            consent: ""
        })
        setLoading(false)
        return toast.success("Form submitted successfully!")
    }




    return (
        <div className="w-full h-full flex items-center justify-center px-[3%] pb-18 pt-32 " >


            <div className="w-full max-w-2xl lg:max-w-7xl h-full flex items-stretch gap-0 font-poppins bg-white shadow-xs overflow-hidden rounded-3xl " >


                {/* The left side  */}
                <div className="w-full lg:w-1/2 h-full  flex items-center justify-center px-[3%] py-12 relative " >
                    <form onSubmit={handleSubmit} className="w-full px-1  flex flex-col items-start gap-9 " >
                        <div>
                            <h1 className="text-gray-500 font-bold text-xl md:text-3xl  mb-3  " >Turn Your Tech Interest into <span className="text-gray-800">Opportunity volunteer!</span></h1>
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

                        {
                            loading ? (<Spinner />)
                                :
                                <>
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


                                        <Button
                                            type={isComplete(formValues) ? "submit" : "button"}
                                            ariaLabel={isComplete(formValues) ? "submit" : "next"}
                                            variant="default"
                                            className="w-full py-2! text-base! "
                                            disabled={loading}
                                            onClick={handleNext}
                                        >{isComplete(formValues) ? "Join TheGreyIT" : "Next"}</Button>


                                    </div>

                                </>
                        }

                    </form>



                    {/* progress bar  */}
                    <div
                        className="h-1.5  transition-all ease-in-out duration-200 absolute bottom-0 left-0 bg-green-500 "
                        style={{
                            width: `${(currentStep / 4) * 100}%`
                        }}
                    />
                </div>









                {/* The right side  */}

                <div className="w-1/2 h-auto  hidden lg:block bg-grey-300 overflow-hidden relative " >

                    <Image src={"/about-us/about-us-hero.avif"} alt="image" fill className="w-full h-full object-center object-cover" />


                    <div className=" w-full text-white absolute z-10 h-full px-7 py-12 flex flex-col items-start justify-end gap-3 bg-black/25 " >
                        <h2 className="text-xl font-bold md:text-3xl tracking-wider" >TheGreyIT</h2>
                        <div className="flex flex-col md:flex-row items-center gap-2 tracking-wider text-sm md:text-base font-bold " >
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

