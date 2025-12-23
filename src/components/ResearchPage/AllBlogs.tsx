"use client"

import RecentBlogCard from "./RecentBlogCard"
import { useEffect, useRef, useState } from "react"
// import { useInView } from "framer-motion"
import { ResearchBlogType } from "@/types/types"
import Spinner from "../UI/Spinner"
import { supabase } from "@/lib/supabaseClient"

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
        console.log(data)
      }
    }



    fetchBlogs()
  }, [])



  return (
    <section className="bg-[#f2f5fc] w-full py-20 px-[4%] text-black flex flex-col items-center justify-center gap-16 relative">
      <h5 className="text-black text-2xl lg:text-3xl font-extrabold font-poppins">
        All Blogs
      </h5>

      {!blogs ? (
        <Spinner />
      ) : blogs.length < 1 ? (
        "No blogs available"
      ) : (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 min-h-[65vh] gap-14 px-[4%] place-items-center justify-items-center">
          {blogs.map((blog, index) => (
            <RecentBlogCard key={index} data={blog} />
          ))}
        </div>
      )}


      <div ref={ref} className="w-10 h-10 absolute right-0 bottom-0" />
    </section>
  )
}
