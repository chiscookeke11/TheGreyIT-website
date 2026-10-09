import { formatReadableDate } from "@/lib/utils"
import { BlogPreview } from "@/types/types"
import Image from "next/image"
import Link from "next/link"



interface HeroCardProps {
    data: BlogPreview
}



export const HeroCard = ({ data }: HeroCardProps) => {


    return (
        <Link href={`/research-blog/${data.slug}`} className=" w-full h-fit  text-gray-700 font-poppins flex flex-col items-start gap-4 overflow-hidden " >

            <div className="relative w-full h-[300px] md:h-[500px] rounded-xs overflow-hidden">
                <Image
                    src={data.image || "/placeholder.jpg"}
                    alt={`${data.title}-image`}
                    fill
                    className="object-cover object-center"
                    unoptimized
                />
                <div className="absolute inset-0 bg-black/10" />
            </div>


            <div className=" w-full flex flex-col items-start gap-1 h-fit text-left   " >

                <h1 className="font-syne font-bold text-lg md:text-xl  " >{data.title} </h1>
                <div className="flex items-center gap-2 text-xs md:text-sm font-normal " ><p>By {data.author}</p> <span className="bg-gray-300 block h-5 w-[1px] mx-2 " />
                    <p>{formatReadableDate(new Date(data.publicationDate))} </p></div>
            </div>
        </Link>
    )
}
