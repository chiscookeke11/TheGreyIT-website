import ContactCard from "@/components/UI/ContactCard";
import ContactForm from "@/components/UI/ContactForm";
import { Metadata } from "next";



export const metadata: Metadata = {
    title: "Contact Us | TheGreyIT",
    description:
        "Get in touch with TheGreyIT for IT services, training, partnerships, or general inquiries. Our team is ready to support your technology needs.",
    keywords: [
        "Contact TheGreyIT",
        "TheGreyIT contact",
        "IT support contact",
        "technology consulting contact",
        "IT services inquiry",
        "software development contact",
        "cybersecurity services contact"
    ],
    authors: [{ name: "TheGreyIT" }],
    openGraph: {
        title: "Contact Us | TheGreyIT",
        description:
            "Get in touch with TheGreyIT for IT services, training, partnerships, or general inquiries. Our team is ready to support your technology needs.",
        url: "https://www.thegreyit.org/contact-us",
        siteName: "TheGreyIT",
        type: "website"
    },
    twitter: {
        card: "summary",
        title: "Contact Us | TheGreyIT",
        description:
            "Get in touch with TheGreyIT for IT services, training, partnerships, or general inquiries."
    }
};



export default function Page() {
    return (
        <section className=" flex items-center justify-center flex-col gap-10 py-20 lg:py-40 px-[2%] md:px-[4%]  font-poppins bg-white" id="contactUs" >


            <div className=" w-full max-w-7xl bg-[#f2f5fc] md:h-[90vh] p-4 md:py-16 flex flex-col md:flex-row items-stretch justify-center rounded-2xl gap-10 " >
                <ContactCard />
                <ContactForm />
            </div>



        </section>
    )
}