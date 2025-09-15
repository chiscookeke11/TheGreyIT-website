import { BlogDataType } from "@/types/types"
import CustomLink from "./CustomLink"
import { useAppContext } from "@/context/AppContext"
import Image from "next/image"
import Button from "./Button"





interface ResearchCardProps {
  blog: BlogDataType
}

export default function ResearchCard({ blog }: ResearchCardProps) {
  const { setActiveNav } = useAppContext()


  return (
    <CustomLink href={`/research-blog/${blog.id}`} >
      <div onClick={() => setActiveNav(5)} className=" w-full min-w-xs flex flex-col items-start h-[400px] bg-white rounded-md overflow-hidden relative shadow-lg~ " >
        <div className="  w-full h-[48%] " >
          <Image src={"/basketball.png"} alt={`${blog.title}-image `} width={500} height={500} className="h-full w-full object-cover object-center " />
        </div>
        <div className="h-full w-full py-4 px-3 flex flex-col items-start gap-2  " >
          <h3 className="text-xs" >By: Admin <span>January, 2022</span></h3>

          <h1 className="text-base font-semibold " >We are the best IT solution company</h1>

          <p className="text-sm font-medium " >World best organization for 19 years and running</p>

          <Button variant="default" className="!text-sm !px-3 !py-2 mt-2"  >
            Read more
          </Button>


        </div>


        <div className="absolute top-0 py-1 px-4 left-[10%] rounded-b-sm bg-gray-600 text-sm font-semibold text-white " >
          Business
        </div>
      </div>
    </CustomLink>
  )
}