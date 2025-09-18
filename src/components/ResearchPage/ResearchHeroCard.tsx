import { ResearchBlogType } from "@/types/types"
import Image from "next/image"



interface HeroCardProps{
    data: ResearchBlogType
}



export const HeroCard = ({data}: HeroCardProps) => {


    return (
        <div className=" w-full h-[90%] bg-gray-300 max-w-md relative text-white font-poppins " >
            <Image src={"/basketball.png"} alt="image" fill className="object-cover object-center" />
            <div className=" absolute inset-0 bg-black/15 " />


            <div className=" w-full flex flex-col items-center gap-1  absolute bottom-4 left-[50%] translate-x-[-50%]  py-1 text-center  " >

                <span className="block bg-red-500  px-3 py-1 text-xs mb-1 " >{data.category} </span>

                <h1 className="font-syne font-semibold text-xl " >{data.title} </h1>
                <div className="flex items-center gap-1 text-xs font-normal " ><p>By {data.author}</p> <span className="bg-gray-300 block h-5 w-[1px] mx-2 " /> <p>{data.date} </p></div>
            </div>
        </div>
    )
}
