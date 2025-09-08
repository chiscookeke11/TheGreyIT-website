import { CircleCheck } from "lucide-react";
import CourseSlider from "../UI/CourseSlider";




export default function GetSkilled() {
    return (
        <div className=" bg-white lg:pl-[5%] px-2 py-20 flex flex-col lg:flex-row items-center justify-between w-full gap-10 h-screen md:h-[70vh] " >

            <div className="flex flex-col items-start gap-3 w-full  max-w-xl px-3 mr-auto lg:mr-0  " >
                <h5 className="text-black text-2xl lg:text-3xl font-extrabold font-poppins" >Get Skilled </h5>
                <h2 className=" font-bold text-3xl lg:text-[45px] leading-[100%] text-[#000]  font-syne " >Turn ambition into ability with hands-on, project-based learning.</h2>
                <p className="flex flex-col gap-1 list-none font-poppins " >At TheGreyIT, you don’t just learn,  </p>
                <ul className="flex flex-col gap-1 list-none font-poppins " >
                    <li className="flex items-center gap-2 font-normal text-base lg:text-lg "><CircleCheck size={20} /> you build</li>
                    <li className="flex items-center gap-2 font-normal text-base lg:text-lg "><CircleCheck size={20}/> practice</li>
                    <li className="flex items-center gap-2 font-normal text-base lg:text-lg "><CircleCheck size={20}/> and advance with skills that open real opportunities.</li>
                </ul>
            </div>



            <div className="mx-auto w-full bg-black-700 h-full overflow-hidden " >
                <CourseSlider/>
            </div>


        </div>
    )
}