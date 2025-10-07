import Image from "next/image";
import Button from "../UI/Button";
import Link from "next/link";


export default function WhyUs() {
    return (
        <section className="bg-white px-[4%] py-14 flex flex-col md:flex-row items-center justify-center w-full gap-8 lg:gap-17  " >



            <div className=" basis-[1/2]  w-full flex items-center gap-6 h-full  justify-center " >
                <div className="flex items-center justify-center rounded-xl overflow-hidden h-[300px] w-[230px] lg:w-[300px] "  >
                    <Image src={"/basketball.png"} width={500} height={500} alt="image-1" className="object-center object-cover h-full w-full " />
                </div>

                <div className="flex items-center justify-center rounded-xl overflow-hidden h-[300px] w-[230px] lg:w-[300px] lg:mt-28 "  >
                    <Image src={"/basketball.png"} width={500} height={500} alt="image-1" className="object-center object-cover h-full w-full " />
                </div>
            </div>



            <div className=" basis-[1/2]  w-full flex flex-col items-start gap-5 p-2 " >
                <h1 className="text-black text-2xl lg:text-3xl font-extrabold font-poppins"  >Why Us?</h1>
                <h1 className=" font-bold text-3xl lg:text-[45px] leading-[100%] text-[#000] max-w-md font-syne " >Because we make learning practical, simple and real</h1>

                <ul className="flex flex-col gap-1 list-none my-2 font-poppins " >
                    <li className="flex items-center gap-2 font-normal text-base lg:text-lg " > <span className="h-2 w-2  rounded-full bg-gray-700 block" ></span>  Expert Guidance</li>
                    <li className="flex items-center gap-2 font-normal text-base lg:text-lg"><span className="h-2 w-2 rounded-full bg-gray-700 block" ></span>Hands-On Projects</li>
                    <li className="flex items-center gap-2 font-normal text-base lg:text-lg"><span className="h-2 w-2 rounded-full bg-gray-700 block" ></span>Global-Ready Skills</li>
                </ul>


                <div className="flex gap-4" >
                    <Link href={"/courses"} >   <Button variant="default" className="font-syne " >Courses</Button></Link>
                    <Link href={"/community"} >   <Button variant="default" className="font-syne " >Community</Button></Link>
                </div>
            </div>

        </section>
    )
}