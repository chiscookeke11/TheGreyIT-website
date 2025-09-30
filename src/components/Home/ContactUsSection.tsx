import ContactCard from "../UI/ContactCard";
import ContactForm from "../UI/ContactForm";



export default function ContactUsSection() {
    return (
        <section className=" flex items-center justify-center flex-col gap-10 py-20 lg:py-40 px-[2%] md:px-[4%]  font-poppins bg-white" id="contactUs" >


            <div className=" w-full max-w-7xl bg-[#f2f5fc] md:h-[90vh] p-4 md:py-16 flex flex-col md:flex-row items-stretch justify-center rounded-2xl gap-10 " >
                <ContactCard />
                <ContactForm/>
            </div>



        </section>
    )
}