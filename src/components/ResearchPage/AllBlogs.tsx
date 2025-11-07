"use client"

import RecentBlogCard from "./RecentBlogCard"
import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"
import { ResearchBlogType } from "@/types/types"
import Spinner from "../UI/Spinner"
import { supabase } from "@/lib/supabaseClient"

export default function AllBlogs() {
  const ref = useRef(null)
  const isInView = useInView(ref)
  const [blogs, setBlogs] = useState<ResearchBlogType[]>([])
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  // Fetch 8 blogs at a time
  const fetchBlogs = async () => {
    setLoading(true)
    const limit = 8
    const from = page * limit
    const to = from + limit - 1 // Supabase range is inclusive

    const { data, error } = await supabase
      .from("blog")
      .select("*")
      .order("publicationDate", { ascending: false })
      .range(from, to)

    if (error) {
      console.error("Failed to fetch blogs", error)
    } else {
      if (data.length === 0) {
        setHasMore(false)
      } else {
        setBlogs(prev => [...prev, ...data])
      }
    }
    setLoading(false)
  }

  // Load more when the ref div is in view
  useEffect(() => {
    if (isInView && hasMore && !loading) {
      setPage(prev => prev + 1)
    }
  }, [isInView])

  // Fetch blogs whenever page changes
  useEffect(() => {
    fetchBlogs()
  }, [page])

  return (
    <section className="bg-[#f2f5fc] w-full py-20 px-[4%] text-black flex flex-col items-center justify-center gap-16 relative">
      <h5 className="text-black text-2xl lg:text-3xl font-extrabold font-poppins">
        All Blogs
      </h5>

      {blogs.length === 0 && loading ? (
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

      {loading && <Spinner />}

      <div ref={ref} className="w-10 h-10 absolute right-0 bottom-0" />
    </section>
  )
}
