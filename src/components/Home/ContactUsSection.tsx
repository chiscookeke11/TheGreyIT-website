import ContactCard from "../UI/ContactCard";
import ContactForm from "../UI/ContactForm";



export default function ContactUsSection() {
    return (
        <section className=" flex items-center justify-center flex-col gap-10 py-20 px-[2%] md:px-[4%]  font-poppins bg-white" >


            <div className=" w-full bg-[#f2f5fc] md:h-[83vh] p-4 flex flex-col md:flex-row items-stretch justify-center rounded-2xl gap-10 " >
                <ContactCard />
                <ContactForm/>
            </div>



        </section>
    )
}