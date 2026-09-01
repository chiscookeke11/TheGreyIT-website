import { CircleCheck } from "lucide-react";
import CourseSlider from "../UI/CourseSlider";




export default function GetSkilled() {
    return (
        <div className=" bg-[#f2f5fc] lg:pl-[2%] px-2 py-20 flex flex-col lg:flex-row items-center justify-between w-full  gap-7 h-[120vh] md:h-[95vh] lg:h-[95vh] " >

            <div className="flex flex-col items-start gap-5 w-full  flex-1  md:min-w-sm max-w-3xl px-3  lg:mr-0  " >
                <h5 className="text-black text-xl lg:text-3xl font-extrabold font-poppins" >Get Skilled </h5>
                <h2 className=" font-bold text-2xl md:text-3xl  leading-[140%] text-[#000]  font-syne  " >Turn ambition into ability with hands-on, project-based learning.</h2>
                <p className="flex flex-col gap-1 list-none font-poppins " >At TheGreyIT, you don’t just learn,  </p>
                <ul className="flex flex-col gap-1 list-none font-poppins " >
                    <li className="flex items-center gap-2 font-normal text-base  "><CircleCheck size={20} /> you build</li>
                    <li className="flex items-center gap-2 font-normal text-base  "><CircleCheck size={20} /> practice</li>
                    <li className="flex items-center gap-2 font-normal text-base "><CircleCheck size={20} /> and advance with skills that open real opportunities.</li>
                </ul>
            </div>



            <div className="mx-auto w-full bg-black-700 h-full overflow-hidden " >
                <CourseSlider />
            </div>


        </div>
    )
}