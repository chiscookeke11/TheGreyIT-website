"use client"


import { CustomCheckBox } from "@/components/UI/CustomCheckbox";
import { supabase } from "@/lib/supabaseClient";
import emailjs from "emailjs-com";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Page() {
    const [sending, setSending] = useState(false)
    const [emailsList, setEmailsList] = useState<string[] | null>(null)
    const [emailOptions, setEmailOptions] = useState<string[]>([])
    const [recipients, setRecipients] = useState<string[]>([])
    const [selectAll, setSelectAll] = useState(false)
    const [formValues, setFormValues] = useState({
        subject: "",
        message: ""
    })



    // function to fetch all emails
    const fetchAllEmails = async () => {
        const { data, error } = await supabase.from("user_data").select("email").eq("is_ambassador", true).order("created_at", { ascending: true })

        if (error) {
            console.error("Error fetching emails:", error)
        }

        const emails = data?.map((row: { email: string }) => row.email) || []

        setEmailsList(emails)
        setEmailOptions(emails)
        console.log(emails)
    }



    useEffect(() => {
        fetchAllEmails()
    }, [])




    // Function to send email to all recipients
    async function sendEmailToAll() {
        if (!formValues.subject || !formValues.message) {
            toast.error("Please fill in subject and message")
            return
        }

        if (recipients.length === 0) {
            toast.error("Please select at least one recipient")
            return
        }

        try {
            setSending(true)

            await Promise.all(
                recipients.map((email) =>
                    emailjs.send(
                        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_BULK_EMAIL!,
                        {
                            to_email: email,
                            subject: formValues.subject,
                            message: formValues.message,
                        },
                        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
                    )
                )
            )

            toast.success("Emails sent successfully!")
            setFormValues({
                message: "",
                subject: ""
            })
        } catch (error) {
            console.error("Error sending emails:", error)
            toast.error("Something went wrong while sending emails.")
        } finally {
            setSending(false)
        }
    }

    const handleCheckboxChange = (email: string) => {
        setRecipients((prev) => {
            if (prev.includes(email)) {
                // remove email
                return prev.filter((e) => e !== email)
            } else {
                // add email
                return [...prev, email]
            }
        })
    }


    const handleSelectAll = () => {
        if (selectAll) {
            // unselect all
            setRecipients([])
            setSelectAll(false)
        }
        else {
            // select all
            setRecipients(emailOptions)
            setSelectAll(true)
        }
    }


    useEffect(() => {
        if (recipients.length === emailOptions.length && emailOptions.length > 0) {
            setSelectAll(true)
        } else {
            setSelectAll(false)
        }
    }, [recipients, emailOptions])


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormValues((prev) => ({
            ...prev,
            [name]: value
        }))
    }



    return (
        <div className="w-full h-fit  py-7 px-6 flex flex-col items-start justify-start gap-10 font-poppins" >
            <h1 className=" font-syne font-semibold text-2xl   ">Send Newsletter</h1>


            <div className=" w-full flex flex-col items-start gap-7 " >
                <CustomCheckBox
                    checked={selectAll}
                    label="Select all"
                    id="select-all"
                    onCheckedChange={handleSelectAll}
                    labelSize="text-xs"
                />

                <div className=" w-full  grid grid-cols-4 place-items-start justify-items-start gap-5 justify-center " >
                    {
                        emailOptions?.map((option, i) => {
                            const isChecked = recipients.includes(option)

                            return (
                                <CustomCheckBox
                                    key={i}
                                    checked={isChecked}
                                    label={option}
                                    id={option.toLowerCase()}
                                    onCheckedChange={() => handleCheckboxChange(option)}
                                    labelSize="text-[11px] "
                                />
                            )
                        })
                    }
                </div>
            </div>


            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    sendEmailToAll()
                }}
                className="w-full flex flex-col gap-6"
            >
                {/* Subject */}
                <div className="flex flex-col gap-1 w-full">
                    <label className="text-xs font-medium">
                        Subject *
                    </label>
                    <input
                        type="text"
                        name="subject"
                        value={formValues.subject}
                        onChange={handleInputChange}
                        className="w-full py-2 px-3 border border-gray-700 outline-none text-sm rounded-sm"
                        placeholder="Enter newsletter subject"
                    />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1 w-full">
                    <label className="text-xs font-medium">
                        Message *
                    </label>

                    <textarea
                        name="message"
                        value={formValues.message}
                        onChange={(e) =>
                            setFormValues((prev) => ({
                                ...prev,
                                message: e.target.value,
                            }))
                        }
                        rows={8}
                        className="w-full py-2 px-3 border border-gray-700 outline-none text-sm rounded-sm resize-none"
                        placeholder="Write your newsletter message..."
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={sending}
                    className="bg-gray-900 text-white px-4 py-2 text-sm rounded-sm disabled:opacity-50 cursor-pointer "
                >
                    {sending ? "Sending..." : "Send Newsletter"}
                </button>
            </form>




        </div>
    )
}