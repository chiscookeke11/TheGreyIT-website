"use client"

import { BlogData } from "@/data/BlogData"
import { BlogDataType } from "@/types/types"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"



export default function Page() {

    const { id } = useParams()
    const blogs = BlogData
    const [currentBlog, setCurrentBlog] = useState<BlogDataType | null>(null)

    useEffect(() => {
        if (blogs && id && blogs.length > 0) {
            const blog = blogs.find((b) => b.id === id)
            setCurrentBlog(blog || null)
        }
    }, [id, blogs])


    if (!currentBlog) {
        return (
            <div className="text-white" >
              loading
            </div>
        )
    }

    else if (blogs.length < 0) {
        return (
            <div>
                blog not foun
            </div>
        )
    }



    return (
        <div className="bg-black w-full flex items-center justify-center h-screen text-white" >
            dynamic blog page
            {currentBlog.label}
        </div>
    )
}