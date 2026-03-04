"use client"

import { supabase } from "@/lib/supabaseClient";
import emailjs from "emailjs-com";
import { useEffect, useState } from "react";

export default function Page() {
    const [sending, setSending] = useState(false)
    const [emailsList, setEmailsList] = useState<string[] | null>(null)



    // function to fetch all emails
    const fetchAllEmails = async () => {
        const {data, error} = await supabase.from("newsletter").select("email")

        if (error) {
            console.error("Error fetching emails:",  error)
        }

        const emails = data?.map((row: {email: string}) => row.email) || []

        setEmailsList(emails)
    }



    useEffect(() => {
        fetchAllEmails()
    }, [])




    // Function to send email to all recipients
    function sendEmailToAll(subject: string, message: string) {
        setSending(true)

        emailsList?.forEach((email) => {
            emailjs.send(
                "service_47ew3kc",      // e.g., "service_xxx"
                "template_x36zt28",     // e.g., "template_xxx"
                {
                    to_email: email,      // pass the current recipient
                    subject: subject,     // your email subject
                    message: message,     // your email message
                },
                "-AXyifNYWMRF-f1jt"       // EmailJS public key
            )
                .then((response) => {
                    console.log(`Email sent to ${email}:`, response.status, response.text);
                })
                .catch((err) => {
                    console.error(`Failed to send to ${email}:`, err);
                });
        });
        setSending(false)
    }






    return (
      <div className="w-full h-fit  py-7 px-6 flex flex-col items-start justify-start gap-10 font-poppins" >
            <h1 className=" font-syne font-semibold text-2xl   ">Send Newsletter</h1>


            {/* <button
                onClick={() => sendEmailToAll(
                    "Hello from My Project",
                    "TUpgraded test"
                )}
            >{sending ? "Send Email" : "send"}</button> */}


<form action=""></form>

        </div>
    )
}