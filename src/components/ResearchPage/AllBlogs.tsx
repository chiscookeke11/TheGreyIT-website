"use client"

import RecentBlogCard from "./RecentBlogCard"
import { useEffect, useState } from "react"
import { ResearchBlogType } from "@/types/types"
import { supabase } from "@/lib/supabaseClient"
import RecentBlogCardSkeleton from "./RecentBlogCardSkeleton"
import toast from "react-hot-toast"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function AllBlogs() {
  const [blogs, setBlogs] = useState<ResearchBlogType[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [range, setRange] = useState(6)
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const totalPages = Math.max(1, Math.ceil(totalCount / range))

  const [searchValue, setSearchValue] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")

  //  Pagination logic (smart buttons)
  const getPageNumbers = () => {
    const pages: number[] = []
    const maxVisible = 5

    let start = Math.max(1, page - Math.floor(maxVisible / 2))
    let end = Math.min(totalPages, start + maxVisible - 1)

    if (end === totalPages) {
      start = Math.max(1, end - maxVisible + 1)
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    return pages
  }

  //  Fetch blogs
  const fetchBlogs = async () => {
    setLoading(true)

    const from = (page - 1) * range
    const to = from + range - 1

    let query = supabase
      .from("blog") //  ensure this matches your DB table
      .select("*", { count: "exact" })
      .order("publicationDate", { ascending: false })

    if (debouncedSearch.trim() !== "") {
      query = query.or(
        `title.ilike.%${debouncedSearch}%,content.ilike.%${debouncedSearch}%,tagline.ilike.%${debouncedSearch}%`
      )
    }

    const { data, error, count } = await query.range(from, to)

    if (error) {
      toast.error("Failed to fetch blog!")
      console.error(error)
      setLoading(false)
      return
    }

    setBlogs(data)
    setTotalCount(count || 0)
    setLoading(false)
  }

  // Fetch trigger
  useEffect(() => {
    fetchBlogs()
  }, [range, page, debouncedSearch])

  //  Debounce search
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(searchValue)
      setPage(1)
    }, 500)

    return () => clearTimeout(timeout)
  }, [searchValue])

  return (
    <section className="w-full py-4 px-[1%] text-black flex flex-col gap-4">
      <h5 className="text-base lg:text-[24px] font-semibold font-poppins">
        All Blogs
      </h5>

      {/* Search */}
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search Blogs"
        className="ml-auto hidden md:block bg-[#e8e8e8] border border-[#6c7293] text-xs outline-none placeholder:text-[#6c7293] py-1.5 px-4 rounded-sm"
      />

      {/* Blog List */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 place-items-center">
          {Array.from({ length: 4 }).map((_, i) => (
            <RecentBlogCardSkeleton key={i} />
          ))}
        </div>
      ) : blogs && blogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 place-items-center">
          {blogs.map((blog, i) => (
            <RecentBlogCard key={i} data={blog} />
          ))}
        </div>
      ) : (
        <p className="text-2xl font-semibold  " >No blogs available</p>
      )}

      {/* Pagination */}
      <div className="w-full flex items-center justify-between mt-3">

        {/* Mobile Prev */}
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="block md:hidden text-[#d97706] disabled:opacity-30"
        >
          <ChevronLeft size={23} />
        </button>

        {/* Range */}
        <div className="flex items-center gap-2 text-sm">
          <select
            value={range}
            onChange={(e) => {
              setRange(Number(e.target.value))
              setPage(1)
            }}
            className="py-1.5 px-3 border rounded-sm"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <span>per page</span>
        </div>

        {/* Mobile Next */}
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="block md:hidden text-[#d97706] disabled:opacity-30"
        >
          <ChevronRight size={23} />
        </button>

        {/* Desktop Pagination */}
        <div className="hidden md:flex gap-1">

          {/* First */}
          {page > 3 && (
            <>
              <button
                onClick={() => setPage(1)}
                className="px-2 border border-gray-700 rounded text-gray-700 cursor-pointer"
              >
                1
              </button>
              <span>...</span>
            </>
          )}

          {/* Middle pages */}
          {getPageNumbers().map((num) => (
            <button
              key={num}
              onClick={() => setPage(num)}
              className={`size-8 border-2 rounded-md cursor-pointer
                ${page === num
                  ? "bg-gray-700 text-white border-gray-700"
                  : "text-gray-700 border-gray-700"
                }`}
            >
              {num}
            </button>
          ))}

          {/* Last */}
          {page < totalPages - 2 && (
            <>
              <span>...</span>
              <button
                onClick={() => setPage(totalPages)}
                className="cursor-pointer px-2 border border-gray-700 rounded text-gray-700"
              >
                {totalPages}
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  )
}