import { ResearchBlogType } from "@/types/types"
import Image from "next/image"




interface RecentBlogCardProps {
    data: ResearchBlogType
}

export default function RecentBlogCard({ data }: RecentBlogCardProps) {
    return (
        <div className="w-full h-full min-h-[300px] flex flex-col items-center justify-between font-poppins " >


            <div className=" w-full bg-amber-400 h-full " >
                <Image src={"/basketball.png"} alt="image" height={500} width={500} className="object-cover object-center h-full w-full " />
            </div>


            <div className=" w-full flex flex-col items-center gap-1   py-2 text-center  " >

                <span className="block text-red-500  px-3 py-1 text-sm mb-1 font-poppins " >{data.category} </span>

                <h1 className="font-syne font-semibold text-xl " >{data.title} </h1>
                <div className="flex items-center gap-1 text-xs font-normal " ><p>By {data.author}</p> <span className="bg-gray-300 block h-5 w-[1px] mx-2 " /> <p>{data.date} </p></div>
            </div>
        </div>
    )
}