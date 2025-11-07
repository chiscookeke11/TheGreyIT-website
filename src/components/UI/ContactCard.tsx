import { socialsData } from "@/data/SocialsData";
import { Mail, MapPin, PhoneCall } from "lucide-react";
import Link from "next/link";


export default function ContactCard() {
    return (
        <div className=" w-full max-w-xl bg-gray-700 flex flex-col items-start justify-between gap-12 py-5 px-4 md:px-8 min-h-[400px] rounded-xl rounded-br-none shadow-2xl overflow-hidden " >
            <div className="space-y-2" >
                <h4 className=" text-2xl lg:text-3xl font-extrabold font-syne text-white ">Contact Us</h4>
                <p className="font-normal text-base text-white w-[90%] " >Any question or remarks? Just write us a message!</p>
            </div>


            <ul className="w-full flex max-w-sm flex-col items-start gap-7 md:gap-9 text-white" >
                <li className="flex items-center gap-4 text-base font-semibold cursor-pointer" >
                    <PhoneCall size={20} />
                    <span>09066895390</span>
                </li>

                <li className="flex items-center gap-4 text-base font-semibold">
                    <Mail size={20} />
                    <a href="mailto:thegreyltd@gmail.com" target="_blank" >contact@thegreyit.org</a>
                </li>

                <li className="flex items-center gap-4 text-base font-semibold">
                    <MapPin size={20} />
                    <span>Gill Mall Plot 109 Coal City Garden Extension G.R.A Enugu, Nigeria.</span>
                </li>
            </ul>



            <ul className={`w-fit flex items-start gap-4  `} >
                {socialsData.map((socialLink, index) => (
                    <li key={index} className=" text-sm  text-white hover:text-gray-700 transition-all duration-250 transform hover:scale-125 h-10 w-10 rounded-full hover:bg-white flex items-center justify-center " ><Link href={socialLink.url}  > {socialLink.icon}</Link> </li>
                ))}
            </ul>


        </div>
    )
}