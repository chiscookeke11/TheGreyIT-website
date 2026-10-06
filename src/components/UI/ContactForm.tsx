"use client"

import React, { SetStateAction, useEffect, useRef, useState } from "react";
import Button from "./Button";
import toast from "react-hot-toast";
import emailjs from "emailjs-com";
import { XIcon } from "lucide-react";



interface ContactFormProps {
    showForm?: boolean
    setShowForm?: React.Dispatch<SetStateAction<boolean>>
    subject?: string
}



export default function ContactForm({ showForm, setShowForm, subject }: ContactFormProps) {
    const formRef = useRef<HTMLFormElement | null>(null)
    const [loading, setLoading] = useState(false)
    const [formValues, setFormValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        title: subject || "",
        message: ""
    })


    useEffect(() => {
        if (subject) {
            setFormValues((prev) => ({ ...prev, title: subject }))
        }
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        if (name === "phoneNumber") {
            if (isNaN(Number(value))) return

            setFormValues((prev) => ({
                ...prev,
                phoneNumber: value
            }))
        }



        setFormValues((prev) => ({
            ...prev,
            [name]: value
        }))
    }


    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target
        setFormValues((prev) => ({
            ...prev,
            message: value
        }))
    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()


        if (!formRef.current) return

        if (!formValues.email || !formValues.firstName || !formValues.lastName || !formValues.message || !formValues.phoneNumber) {
            toast.error("Please fill in all required fields")
            return
        }

        setLoading(true)


        emailjs.sendForm(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
            formRef?.current,
            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
        )
            .then(
                (result) => {
                    toast.success("Message sent successfully!")
                    setLoading(false)
                    setFormValues({
                        firstName: "",
                        lastName: "",
                        email: "",
                        message: "",
                        phoneNumber: "",
                        title: "",
                    })
                    setShowForm?.(false)
                },
                (error) => {
                    toast.error(error.text)
                    setLoading(false)
                }
            )

    }




    return (
        <form ref={formRef} onSubmit={handleSubmit} className="w-full max-w-4xl bg-[#f2f5fc] py-6 px-4 flex flex-col items-start gap-10 ">
            {showForm && (<button onClick={() => setShowForm?.(false)} className=" ml-auto cursor-pointer " type="button"  > <XIcon size={35} /> </button>)}


            <div className="w-full grid grid-cols-2 gap-5 md:gap-10   " >

                <label htmlFor="firstName" className=" flex flex-col gap-1 items-start font-medium text-sm text-[#8D8D8D]  " >
                    <span>First Name</span>
                    <input name="firstName" id="firstName" onChange={handleChange} value={formValues.firstName} placeholder="" type="text" className=" w-full py-2 px-3 border-b-2 border-b-gray-600 text-base font-medium text-black focus:outline-none" />
                </label>


                <label htmlFor="lastName" className=" flex flex-col gap-1 items-start font-medium text-sm text-black ">
                    <span>Last Name</span>
                    <input name="lastName" id="lastName" value={formValues.lastName} onChange={handleChange} placeholder="" type="text" className=" w-full py-2 px-3 border-b-2 border-b-gray-600 text-base font-medium text-black focus:outline-none" />
                </label>




                <label htmlFor="email" className=" flex flex-col gap-1 items-start font-medium text-sm text-[#8D8D8D]">
                    <span>Email</span>
                    <input name="email" id="email" value={formValues.email} onChange={handleChange} placeholder="" type="email" className=" w-full py-2 px-3 border-b-2 border-b-gray-600 text-base font-medium text-black focus:outline-none" />
                </label>



                <label htmlFor="phoneNumber" className=" flex flex-col gap-1 items-start font-medium text-sm text-black">
                    <span>Phone Number</span>
                    <input name="phoneNumber" id="phoneNumber" value={formValues.phoneNumber} onChange={handleChange} placeholder="" className=" w-full py-2 px-3 border-b-2 border-b-gray-600 text-base font-medium text-black focus:outline-none " />
                </label>
            </div>


            <label htmlFor="title" className=" w-full flex flex-col gap-1 items-start font-medium text-sm text-[#8D8D8D]  " >
                <span>Subject</span>
                <input name="title" id="title" onChange={handleChange} value={formValues.title} type="text" className=" w-full py-2 px-3 border-b-2 border-b-gray-600 text-base font-medium text-black focus:outline-none" />
            </label>

            <label htmlFor="phoneNumber" className=" flex flex-col gap-1 items-start font-medium text-sm text-black w-full">
                <span>Write your message</span>
                <textarea name="message" id="message" value={formValues.message} onChange={handleTextareaChange} placeholder="Your Message" rows={1} className=" w-full py-2 px-3 border-b-2 border-b-gray-600 text-base font-medium text-black  outline-none " ></textarea>
            </label>





            <Button
                variant="default"
                className="text-sm md:text-base font-syne !bg-gray-700 !text-white ml-auto" >
                {loading ? "Loading.." : "Send Message"}
            </Button>
        </form>
    )
}