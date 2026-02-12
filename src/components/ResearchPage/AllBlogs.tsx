"use client"

import RecentBlogCard from "./RecentBlogCard"
import { useEffect, useRef, useState } from "react"
import { ResearchBlogType } from "@/types/types"
import { Spinner } from "../UI/Spinner"
import { supabase } from "@/lib/supabaseClient"
import RecentBlogCardSkeleton from "./RecentBlogCardSkeleton"

export default function AllBlogs() {
  const ref = useRef(null)
  // const isInView = useInView(ref)
  const [blogs, setBlogs] = useState<ResearchBlogType[] | null>(null)
  const [loading, setLoading] = useState(false)




  // Fetch blogs whenever page changes
  useEffect(() => {

    const fetchBlogs = async () => {

      const { data, error } = await supabase.from("blog").select("*")

      if (error) {
        setLoading(false)
        console.error("Error fetching all blogs:", error)
      }
      else if (data) {
        setBlogs(data)
      }
    }



    fetchBlogs()
  }, [])



  return (
    <section className=" w-full py-4 px-[1%] text-black flex flex-col items-start justify-center gap-4 relative ">
      <h5 className="text-black text-base lg:text-[24px] font-semibold font-poppins">
        All Blogs
      </h5>

      {!blogs ? (
        <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2   gap-14 place-items-center justify-items-center  " >
          {Array.from({ length: 4 }).map((_, index) => (
            <RecentBlogCardSkeleton key={index} />
          ))}

        </div>
      ) : blogs.length < 1 ? (
        "No blogs available"
      ) : (
        <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2   gap-14 place-items-center justify-items-center">
          {blogs.map((blog, index) => (
            <RecentBlogCard key={index} data={blog} />
          ))}
        </div>
      )}


      <div ref={ref} className="w-10 h-10 absolute right-0 bottom-0" />
    </section>
  )
}
