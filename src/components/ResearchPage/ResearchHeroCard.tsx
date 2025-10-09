import { ResearchBlogType } from "@/types/types"
import Image from "next/image"
import Link from "next/link"



interface HeroCardProps {
    data: ResearchBlogType
}



export const HeroCard = ({ data }: HeroCardProps) => {


    return (
        <Link href={`/research-blog/${data.id}`} className=" w-full h-full min-h-[300px]  text-gray-700 font-poppins flex flex-col items-start gap-6 overflow-hidden " >
            <div className=" relative flex-1 w-full " >
                <Image src={data.image} alt={`${data.title}-image`} fill className="object-cover object-center " />
                <div className=" absolute inset-0 bg-black/10 " />
            </div>


            <div className=" w-full flex flex-col items-start gap-1 h-fit py-1 text-left   " >

                <h1 className="font-syne font-bold text-xl md:text-2xl  " >{data.title} </h1>
                <div className="flex items-center gap-2 text-sm md:text-base font-normal " ><p>By {data.author}</p> <span className="bg-gray-300 block h-5 w-[1px] mx-2 " />
                    <p>{new Date(data.publicationDate).toLocaleDateString()} </p></div>
            </div>
        </Link>
    )
}
