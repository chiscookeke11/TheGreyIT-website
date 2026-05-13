import { ResearchBlogType } from "@/types/types"
import React, { SetStateAction, useState } from "react";
import Button from "./Button";
import { X } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";
import Loading from "./Loading";



interface PostSchedulerProps {
    data: ResearchBlogType;
    setShowSchedulerForm: React.Dispatch<SetStateAction<boolean>>;
    showSchedulerForm: boolean;
    imageUrl: () => Promise<string | undefined>;
    setFormValues: React.Dispatch<SetStateAction<ResearchBlogType>>
}


export default function PostScheduler({ data, setShowSchedulerForm, showSchedulerForm, imageUrl, setFormValues }: PostSchedulerProps) {
    const [loading, setLoading] = useState(false)
    const [scheduleFormValues, setScheduleFormValue] = useState({
        time: "",
        date: ""
    })



    // This function handles input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;

        setScheduleFormValue((prev) => ({
            ...prev,
            [name]: value
        }))
    }



    const submitSchedule = async () => {
        if (!scheduleFormValues.date || !scheduleFormValues.time) {
            toast.error("Please select both date and time")
            return
        }

        setLoading(true)

        // Create valid datetime
        const scheduledDateTime = new Date(
            `${scheduleFormValues.date}T${scheduleFormValues.time}:00`
        )

        // Extra validation
        if (isNaN(scheduledDateTime.getTime())) {
            toast.error("Invalid date or time")
            setLoading(false)
            return
        }

        const url = await imageUrl()

        if (!url) {
            toast.error("Image upload failed")
            setLoading(false)
            return
        }

        const { error } = await supabase
            .from("blog")
            .insert({
                title: data.title,
                tagline: data.tagline,
                author: data.author,
                content: data.content,
                image: url,
                publicationDate: data.publicationDate,
                slug: data.title
                    .toLowerCase()
                    .replace(/\s+/g, '-')
                    .replace(/[^\w-]/g, ''),
                status: "scheduled",

                // store full timestamp
                scheduled_time: scheduledDateTime.toISOString(),
            })

        if (error) {
            toast.error("Failed to schedule post!")
            setLoading(false)
            return
        }

        toast.success("Post scheduled successfully!")

        setScheduleFormValue({
            date: "",
            time: ""
        })

        setShowSchedulerForm(false)

        setLoading(false)
    }



    return (
        <div className={`w-full h-screen bg-black/40 fixed top-0 left-0
        flex items-center justify-center transition-all ease-in-out duration-300
${showSchedulerForm ? "flex" : "hidden"}
        `} >


            <div className={`w-full max-w-md rounded-sm bg-white h-fit px-3 py-5
             flex flex-col items-center gap-8 font-sans shadow-xl
${showSchedulerForm ? "scale-100" : "scale-0"}
             `} >

                <button
                    onClick={() => setShowSchedulerForm(false)}
                    type="button"
                    className="ml-auto cursor-pointer " >
                    <X size={19} color="red" />
                </button>

                <h3 className="font-semibold text-xl to-gray-700   " >Schedule Post</h3>


                <div className="w-[85%] flex flex-col items-start gap-6 " >

                    <label htmlFor="tagline" className="w-full flex flex-col items-start gap-1">
                        <span className="text-base"  >Select Date</span>
                        <input
                            value={scheduleFormValues.date}
                            type="date"
                            id="date"
                            name="date"
                            onChange={handleInputChange}
                            className="w-full py-2 px-5 border border-gray-300 bg-[#e8e8e8] outline-none text-sm rounded-sm"
                        />
                    </label>


                    <label htmlFor="tagline" className="w-full flex flex-col items-start gap-1">
                        <span className="text-base"  >Select Time</span>
                        <input
                            value={scheduleFormValues.time}
                            type="time"
                            id="time"
                            name="time"
                            onChange={handleInputChange}
                            className="w-full py-2 px-5 border border-gray-300 bg-[#e8e8e8] outline-none text-sm rounded-sm"
                        />
                    </label>

                </div>

                <Button
                    type="button"
                    onClick={submitSchedule}
                    variant="default"
                    className="py-2! text-base!"
                    disabled={loading}
                >
                    {loading ? <Loading /> : "Submit"}
                </Button>

                <div>

                </div>

            </div>

        </div>
    )
}