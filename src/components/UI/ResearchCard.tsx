import { BlogDataType } from "@/types/types"
import CustomLink from "./CustomLink"
import { useAppContext } from "@/context/AppContext"





interface ResearchCardProps{
    blog: BlogDataType
}

export default function ResearchCard({blog}: ResearchCardProps) {
const {setActiveNav} = useAppContext()


    return (
      <CustomLink href={`/research-blog/${blog.id}`} >
        <div onClick={() => setActiveNav(5)} className=" w-full min-w-sm relative flex flex-col items-start h-[400px] bg-green-600 rounded-md overflow-hidden  " >
            <div className="h-full basis-1/2 bg-red-600 w-full " >{blog.label} </div>
            <div className="h-full basis-1/2 bg-red-300 w-full " > {blog.label}</div>

        </div>
      </CustomLink>
    )
}