import { BlogPreview } from "@/types/types"
import CustomLink from "./CustomLink"
import { useAppContext } from "@/context/AppContext"
import Image from "next/image"
import Button from "./Button"
import { formatReadableDate } from "@/lib/utils"



interface ResearchCardProps {
  blog: BlogPreview
}

export default function ResearchCard({ blog }: ResearchCardProps) {


  return (
    <>
      <div className=" w-full h-full min-w-xs flex flex-col items-start    bg-white rounded-md overflow-hidden relative shadow-lg " >
        <div className="  w-full h-[250px] " >
          <Image src={blog.image ?? "/placeholder.jpg"} alt={`${blog.title}-image `} width={500} height={500} className="h-full w-full object-cover object-center " />
        </div>
        <div className="h-full w-full py-4 px-3 flex flex-col items-start gap-2  " >
          <h3 className="text-sm" >By: {blog.author} <span className="ml-4 text-gray-500 " > {formatReadableDate(new Date(blog.publicationDate))} </span></h3>

          <h1 className="text-xl font-semibold " >{blog.title} </h1>

          <div className="text-base font-medium " dangerouslySetInnerHTML={{ __html: blog.tagline?.trim().slice(0, 77) + "..." }} />
          <CustomLink href={`/research-blog/${encodeURIComponent(blog.slug)}`} >
            <Button variant="default" className="!text-sm !px-4 !py-3 mt-2"  >
              Read more
            </Button>
          </CustomLink>
        </div>
      </div >
    </>

  )
}