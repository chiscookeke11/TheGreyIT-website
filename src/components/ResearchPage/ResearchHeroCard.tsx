import { formatReadableDate } from "@/lib/utils"
import { ResearchBlogType } from "@/types/types"
import Image from "next/image"
import Link from "next/link"



interface HeroCardProps {
    data: ResearchBlogType
}



export const HeroCard = ({ data }: HeroCardProps) => {


    return (
        <Link href={`/research-blog/${data.slug}`} className=" w-full h-full min-h-[300px]  text-gray-700 font-poppins flex flex-col items-start gap-4 overflow-hidden " >
            <div className=" relative flex-1 w-full rounded-xs overflow-hidden " >
                <Image src={data.image} alt={`${data.title}-image`} fill className="object-cover object-center " />
                <div className=" absolute inset-0 bg-black/10 " />
            </div>


            <div className=" w-full flex flex-col items-start gap-1 h-fit text-left   " >

                <h1 className="font-syne font-bold text-lg md:text-xl  " >{data.title} </h1>
                <div className="flex items-center gap-2 text-xs md:text-sm font-normal " ><p>By {data.author}</p> <span className="bg-gray-300 block h-5 w-[1px] mx-2 " />
                    <p>{formatReadableDate(new Date(data.publicationDate))} </p></div>
            </div>
        </Link>
    )
}
