import Image from "next/image";
import Button from "../UI/Button";
import Link from "next/link";


export default function WhyUs() {
    return (
        <section className="bg-white px-[4%] py-14 flex flex-col md:flex-row items-center justify-center w-full gap-8 lg:gap-17  " >


            <div className=" basis-2/5 w-full flex flex-col items-start gap-5 p-2 " >
                <h1 className="text-black text-2xl lg:text-3xl font-extrabold font-poppins"  >Why Us?</h1>
                <h1 className=" font-bold text-3xl lg:text-[45px] leading-[100%] text-[#000] max-w-md font-syne " >Because we make learning practical, simple and real</h1>

                <ul className="flex flex-col gap-1 list-none my-2 font-poppins " >
                    <li className="flex items-center gap-2 font-normal text-base lg:text-lg " > <span className="h-2 w-2  rounded-full bg-gray-700 block" ></span>  Expert Guidance</li>
                    <li className="flex items-center gap-2 font-normal text-base lg:text-lg"><span className="h-2 w-2 rounded-full bg-gray-700 block" ></span>Hands-On Projects</li>
                    <li className="flex items-center gap-2 font-normal text-base lg:text-lg"><span className="h-2 w-2 rounded-full bg-gray-700 block" ></span>Global-Ready Skills</li>
                </ul>


                <div className="hidden md:flex gap-4  " >
                    <Link href={"/courses"} >
                     <button  className="font-syne bg-gray-700 text-white hover:bg-transparent hover:text-gray-700   px-6 py-3  flex items-center justify-center font-medium  focus:outline-none cursor-pointer text-base md:text-lg  border-[1px]  transition-all duration-300 ease-in-out border-gray-700 rounded-sm  " >Courses</button></Link>
                    <Link href={"/our-services"} >   <Button variant="default" className="font-syne " >Community</Button></Link>
                </div>
            </div>


            <div className=" basis-3/5  w-full flex items-center gap-6 h-full  justify-center " >
                <div className="flex items-center justify-center rounded-lg overflow-hidden h-[350px] md:h-[470px] w-full "  >
                    <Image src={"/happy-lady.jpg"} width={1000} height={1000} alt="image-1" className="object-center object-cover h-full w-full " />
                </div>
            </div>

            <div className="flex md:hidden gap-4   " >
                <Link href={"/courses"} >   <Button variant="default" className="font-syne !bg-gray-700 text-white " >Courses</Button></Link>
                <Link href={"/our-services"} >   <Button variant="default" className="font-syne " >Our Services</Button></Link>
            </div>





        </section>
    )
}