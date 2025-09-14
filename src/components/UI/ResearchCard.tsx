import { BlogDataType } from "@/types/types"
import Link from "next/link"





interface ResearchCardProps{
    blog: BlogDataType
}

export default function ResearchCard({blog}: ResearchCardProps) {
    return (
      <Link href={`/research-blog/${blog.id}`} >
        <div className=" w-full min-w-sm relative flex flex-col items-start h-[400px] bg-green-600 rounded-md overflow-hidden  " >
            <div className="h-full basis-1/2 bg-red-600 w-full " >{blog.label} </div>
            <div className="h-full basis-1/2 bg-red-300 w-full " > Research text</div>

        </div>
      </Link>
    )
}