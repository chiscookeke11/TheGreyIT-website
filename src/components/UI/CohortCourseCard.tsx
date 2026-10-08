import { CohortCoursePreview, CohortCourseTypes } from "@/types/types"
import { Clock, Radio } from "lucide-react"
import Image from "next/image"


interface CohortCourseCardProps {
    data: CohortCoursePreview
}



export default function CohortCourseCard({ data }: CohortCourseCardProps) {
    return (
        <div className="w-full  h-full flex flex-col items-start justify-start gap-4
         overflow-hidden font-lora text-gray-700 bg-white
          hover:scale-105 duration-200 ease-in-out transition-all rounded-xl
          shadow-sm
          "  >
            <Image src={data.imageUrl} alt="the image " height={1500} width={1500} className=" w-full h-[260px] object-center object-cover " />



            <div className=" w-full flex flex-col items-start gap-3 px-2 py-7  "    >


                <div className="w-full flex items-center justify-between text-sm  " >
                    <small className=" flex items-center gap-2 text-red-600 " ><Radio size={20} /> Live</small>


                    <small className=" flex shrink-0 items-center justify-end gap-2 text-gray-600"><Clock size={18} />
                        <p> {data.duration}  </p>
                    </small>
                </div>

                <h3 className="text-base font-semibold  " >{data.title} </h3>


                <div className="flex flex-col items-start gap-2" >
                    {
                        !data.online_fee || data.online_fee < 0 ?
                            null :
                            (
                                <h4 className=" text-xs font-medium text-red-600  " ><span className="text-black" >Online(Live):</span> &#8358; {data.online_fee.toLocaleString()} </h4>
                            )
                    }


                    {
                        data.inhouse_fee && (
                            <h4 className=" text-xs font-medium text-red-600  " > <span className="text-black" >In-House(Classroom):</span> &#8358; {data.inhouse_fee.toLocaleString()} </h4>
                        )
                    }

                </div>

            </div>
        </div>
    )
}