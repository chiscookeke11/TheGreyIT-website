"use client"

import Button from "@/components/UI/Button";
import { Check, Languages } from "lucide-react";
import Image from "next/image";
import { useState } from "react";




const Requirementsection = () => {
    return (
        <div className="space-y-5" >
            <h4 className=" text-lg md:text-2xl font-semibold  " >Requirements</h4>

            <ul className=" flex items-center flex-col gap-3 w-full max-w-3xl pl-5 list-disc  " >
                <li className="text-sm font-medium  text-gray-900 " > Basic programming experience (Python or JavaScript preferred)</li>
                <li className="text-sm font-medium  text-gray-900 " > Basic programming experience (Python or JavaScript preferred)</li>
                <li className="text-sm font-medium  text-gray-900 " > Basic programming experience (Python or JavaScript preferred)</li>
            </ul>

        </div>
    )
}




const CourseContentSection = () => {
    return (
        <div className="space-y-5" >
            <h4 className=" text-lg md:text-2xl font-semibold  " >Course content</h4>
            <Button variant="default" >Click to download course content</Button>


        </div>
    )
}




const DescriptionSection = () => {
    return (
        <>
            {/* What you will learn section  */}
            <div className="space-y-5" >
                <h4 className=" text-lg md:text-2xl font-semibold  " >What you will learn</h4>

                <ul className=" grid grid-cols-1 md:grid-cols-2 place-items-center gap-6 " >
                    <li className="flex items-start gap-4" > <Check size={35} /> How to build and deploy intelligent AI agents using Python, tools, memory, and reasoning.</li>
                    <li className="flex items-start gap-4"> <Check size={35} /> How to design trustworthy, responsible AI systems aligned with best practices.</li>
                    <li className="flex items-start gap-4"> <Check size={35} /> How to create custom GPTs and apply prompt engineering techniques for real-world tasks.</li>
                </ul>
            </div>



            {/* skills you will gain section  */}
            <div className="space-y-5" >
                <h4 className=" text-lg md:text-2xl font-semibold  " >Skills you&apos;ll gain</h4>

                <ul className=" flex items-center flex-wrap gap-4 w-full max-w-3xl   " >
                    <li className="flex items-center justify-center bg-[#f2f5fc] px-3 py-2 text-sm font-medium rounded-4xl text-gray-900 " > Artificial Intelligence</li>
                    <li className="flex items-center justify-center bg-[#f2f5fc] px-3 py-2 text-sm font-medium rounded-4xl " > Artificial Intelligence</li>
                    <li className="flex items-center justify-center bg-[#f2f5fc] px-3 py-2 text-sm font-medium rounded-4xl " > Artificial Intelligence</li>
                    <li className="flex items-center justify-center bg-[#f2f5fc] px-3 py-2 text-sm font-medium rounded-4xl " > Artificial Intelligence</li>
                    <li className="flex items-center justify-center bg-[#f2f5fc] px-3 py-2 text-sm font-medium rounded-4xl " > Artificial Intelligence</li>
                    <li className="flex items-center justify-center bg-[#f2f5fc] px-3 py-2 text-sm font-medium rounded-4xl " > Artificial Intelligence</li>
                </ul>
            </div>



            {/* Details to know section  */}
            <div className="space-y-5" >
                <h4 className=" text-lg md:text-2xl font-semibold  " >Details to know</h4>

                <div className="w-fit flex items-center gap-12 " >

                    <div className="flex items-start flex-col gap-1 " >
                        <Image src={"/logos/linkedin.png"} height={1000} width={1000} alt="LinkedIn logo" className=" w-8 h-8 " />
                        <h5 className="text-base font-semibold mt-4" >Shareable certificate</h5>
                        <p className="text-gray-500 text-sm" >Add to your LinkedIn profile</p>

                    </div>



                    <div className="flex items-start flex-col gap-1 " >
                        <Languages size={35} />
                        <h5 className="text-base font-semibold  mt-4">Taught in English</h5>
                        <p className="text-gray-500 text-sm">26 languages available</p>

                    </div>



                </div>
            </div>
        </>
    )
}






export default function Page() {
    const [currentTab, setCurrentTab] = useState("description")



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
                    <p className=" lg:w-[75%] text-sm md:text-base text-gray-600 " >Master Skills of an AI Agent Software Developer. Learn to design, build, and refine intelligent software agents using Python, generative AI, and agentic architectures for real-world applications.</p>

                    <div className=" text-sm md:text-sm" > Instructor: Abel Chidera Emmanuel   </div>


                    <Button variant="default" className="font-syne  px-10 my-1 mt-5 rounded-[100px]! " >Enroll</Button>
                    <p className="text-sm" ><span className="font-bold">26,684</span> already enrolled</p>
                </div>



                {/* right side  */}
                <div className="w-full max-w-xs bg-amber-500 h-[420px] hidden lg:block  " >
                    Image here
                </div>




            </section>







            {/* section two  */}
            <section className="w-full bg-white flex flex-col items-start gap-12 py-16 px-4 md:px-7 " >


                {/* info belt  */}
                <div
                    className="
                w-[98%] mx-auto
  grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5
  items-center
  justify-between                     /* USE THIS */
  gap-6
  shadow-xl rounded-xl py-8 px-2.5 md:px-5
  bg-white
  mt-[-35%] sm:mt-[-27%] lg:mt-[-12%]
  text-sm
                " >
                    <div className="flex w-fit flex-col items-start gap-0.5" >
                        <h6 className="font-semibold text-base" >Skill Level</h6>
                        <p className="text-gray-600" >intermediate</p>
                    </div>

                    <div className="flex w-fit flex-col items-start gap-0.5">
                        <h6 className="font-semibold text-base">Duration</h6>
                        <p className="text-gray-600" > 8 Weeks</p>
                    </div>

                    <div className="flex w-fit flex-col items-start gap-0.5">
                        <h6 className="font-semibold text-base"> Learning Mode</h6>
                        <p className="text-gray-600" >Online</p>
                    </div>

                    <div className="flex w-fit flex-col items-start gap-0.5">
                        <h6 className="font-semibold text-base">Hours</h6>
                        <p className="text-gray-600" >15 hours per week</p>
                    </div>

                    <div className="flex w-fit flex-col items-start gap-0.5">
                        <h6 className="font-semibold text-base">Certificate</h6>
                        <p className="text-gray-600" >Yes</p>
                    </div>

                </div>









                {/* the section tab  */}
                <div className="w-full flex items-center gap-4 md:gap-10 flex-wrap " >
                    <button
                        onClick={() => setCurrentTab("description")}
                        className={`text-lg font-semibold py-2 cursor-pointer ${currentTab === "description" ? "border-b-2 border-b-gray-700" : ""
                            }`}
                    >
                        Description
                    </button>

                    <button
                        onClick={() => setCurrentTab("requirements")}
                        className={`text-lg font-semibold py-2 cursor-pointer ${currentTab === "requirements" ? "border-b-2 border-b-gray-700" : ""
                            }`}
                    >
                        Requirements
                    </button>

                    <button
                        onClick={() => setCurrentTab("content")}
                        className={`text-lg font-semibold py-2 cursor-pointer ${currentTab === "content" ? "border-b-2 border-b-gray-700" : ""
                            }`}
                    >
                        Course Content
                    </button>

                </div>


                {currentTab === "description" && <DescriptionSection />}
                {currentTab === "requirements" && <Requirementsection />}
                {currentTab === "content" && <CourseContentSection />}


            </section>


        </div>
    )
}