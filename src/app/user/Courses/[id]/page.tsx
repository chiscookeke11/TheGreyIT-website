import Button from "@/components/UI/Button";
import Image from "next/image";



export default function Page() {
    return (
        <div className="w-full h-full bg-[#f2f5fc] pt-16   rounded-xl space-y-48  " >


            <section className="w-full  flex flex-col md:flex-row items-end gap-16 justify-between px-7 " >

                <div className="flex flex-col  items-start gap-4 flex-1" >
                    <Image
                        src="/about-us/THEGREYIT-LOGO-2-2048x359.png"
                        alt="Riskified team collaborating"
                        width={1500}
                        height={1500}
                        className="w-[200px] h-full object-cover object-center rounded-sm mb-4 "
                        priority
                    />

                    <h1 className=" text-xl md:text-3xl font-semibold text-gray-700 "  >AI Agent Developer Specialization</h1>
                    <p className=" w-[75%] text-sm md:text-base text-gray-600 " >Master Skills of an AI Agent Software Developer. Learn to design, build, and refine intelligent software agents using Python, generative AI, and agentic architectures for real-world applications.</p>

                    <div className=" text-sm md:text-sm" > instructor: Abel Chidera Emmanuel   </div>


                    <Button variant="default" className="font-syne  px-10 my-1 mt-5 " >Enroll</Button>
                    <p className="text-sm" ><span className="font-bold">26,684</span> already enrolled</p>
                </div>



                {/* right side  */}
                <div className="w-full max-w-xs bg-amber-500  " >
                    The right side
                </div>

            </section>




            {/* section two  */}
<section className="w-full bg-white" >
    section two
</section>


        </div>
    )
}