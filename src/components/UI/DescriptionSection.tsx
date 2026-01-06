import { CourseDataTypes } from "@/types/types"
import { Dot, Languages } from "lucide-react"
import Image from "next/image"




interface DescriptionSectionProps {
    currentCourse: CourseDataTypes | null
}

export default function DescriptionSection({ currentCourse }: DescriptionSectionProps) {
    return (
        <>
            {/* What you will learn section  */}
            <div className="space-y-5" >
                <h4 className=" text-lg md:text-xl font-semibold  " >What you will learn</h4>

                <ul className=" grid grid-cols-1 md:grid-cols-2 justify-end justify-items-start place-items-center gap-6 gap-x-10 " >
                    {currentCourse?.what_you_will_learn?.map((data, index) => (
                        <li key={index} className="flex items-start gap-4 text-sm  " >
                            <Dot size={20} />
                            {data}
                        </li>
                    ))}
                </ul>
            </div>



            {/* skills you will gain section  */}
            <div className="space-y-5" >
                <h4 className=" text-lg md:text-xl font-semibold  " >Skills you&apos;ll gain</h4>

                <ul className=" flex items-center flex-wrap gap-4 w-full max-w-3xl   " >
                    {currentCourse?.skills?.map((skill, index) => (
                        <li key={index} className="flex items-center justify-center bg-[#f2f5fc] px-3 py-2 text-xs  font-medium rounded-4xl text-gray-900 " >  {skill}</li>
                    ))}
                </ul>
            </div>



            {/* Details to know section  */}
            <div className="space-y-5" >
                <h4 className=" text-lg md:text-xl font-semibold  " >Details to know</h4>

                <div className="w-fit flex items-center gap-12 " >

                    <div className="flex items-start flex-col gap-1 " >
                        <Image src={"/logos/linkedin.png"} height={1000} width={1000} alt="LinkedIn logo" className=" w-6 h-6 " />
                        <h5 className=" text-sm  font-semibold mt-4" >Shareable certificate</h5>
                        <p className="text-gray-500 text-xs " >Add to your LinkedIn profile</p>

                    </div>



                    <div className="flex items-start flex-col gap-1 " >
                        <Languages size={27} />
                        <h5 className="text-sm  font-semibold  mt-4">Taught in English</h5>
                    </div>



                </div>
            </div>
        </>
    )
}