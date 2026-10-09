import { formatReadableDate } from "@/lib/utils"
import { BlogPreview } from "@/types/types"
import Image from "next/image"
import Link from "next/link"



interface RecentBlogCardProps {
    data: BlogPreview
}

export default function RecentBlogCard({ data }: RecentBlogCardProps) {
    return (
        <Link href={`/research-blog/${encodeURIComponent(data.slug)}`} className="w-full h-full  flex  items-center  font-poppins px-1 gap-4 pb-3 border-b border-gray-700 hover:scale-105 transition-all duration-200 ease-in-out " >


            <div className="  bg-gray-300 size-[100px] shrink-0 rounded-xs overflow-hidden" >
                <Image
                    src={data.image || "/placeholder.jpg"}
                    alt="image"
                    height={500} width={500}
                    className="object-cover object-center h-full w-full "
                    unoptimized
                />
            </div>

            <div className=" w-full flex flex-col items-start gap-1   py-2 text-start" >

                <h1 className="font-syne font-semibold text-[11px] md:text-sm " >{data.title} </h1>
                <div dangerouslySetInnerHTML={{ __html: data.tagline?.trim().slice(0, 60) + "..." }} className="flex items-center gap-1 text-[10px] md:text-sm font-normal " />
                <div className="flex items-center gap-1 text-[8px] md:text-[10px] font-normal " ><p>By {data.author}</p> <span className="bg-gray-300 block h-5 w-[1px] mx-2 " /> <p>{formatReadableDate(new Date(data.publicationDate))} </p></div>
            </div>
        </Link>
    )
}