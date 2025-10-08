import { ResearchBlogType } from "@/types/types"
import Image from "next/image"
import Link from "next/link"




interface RecentBlogCardProps {
    data: ResearchBlogType
}

export default function RecentBlogCard({ data }: RecentBlogCardProps) {
    return (
        <Link href={`/research-blog/${data.id}`} className="w-full h-full max-w-xs  md:max-w-none min-h-[300px] flex flex-col items-center justify-between font-poppins " >


            <div className=" w-full bg-gray-300 h-full " >
                <Image src={data.image} alt="image" height={500} width={500} className="object-cover object-center h-full w-full " />
            </div>


            <div className=" w-full flex flex-col items-center gap-3   py-2 text-justify  " >

                <h1 className="font-syne font-semibold text-xl " >{data.title} </h1>
                <p className="flex items-center gap-1 text-sm font-normal ">{data.content.trim().slice(0, 60)}... </p>
                <div className="flex items-center gap-1 text-xs font-normal " ><p>By {data.author}</p> <span className="bg-gray-300 block h-5 w-[1px] mx-2 " /> <p>{new Date(data.createdAt).toLocaleDateString()} </p></div>
            </div>
        </Link>
    )
}