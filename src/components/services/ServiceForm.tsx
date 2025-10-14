import React, { SetStateAction } from "react";
import ContactForm from "../UI/ContactForm";



interface ServiceFormProps {
    showForm:  boolean
    setShowForm: React.Dispatch<SetStateAction<boolean>>,
    subject: string
}


export default function ServiceForm({showForm, setShowForm, subject}: ServiceFormProps) {
    return (
        <section className=" fixed inset-0 w-full h-screen flex items-center justify-center bg-black/50 z-50 px-[2%] py-1 font-poppins " >



            <div className=" w-full max-w-2xl bg-[#f2f5fc] h-fit rounded-xl px-2 py-2 flex flex-col items-center justify-center gap-4  " >
                <ContactForm showForm={showForm} setShowForm={setShowForm} subject={subject} />
            </div>




        </section>
    )
}