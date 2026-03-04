"use client"

import { Spinner } from "@/components/UI/Spinner";
import { supabase } from "@/lib/supabaseClient";
import { ResearchBlogType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";



export default function Page() {
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
        <div className="w-full h-fit  py-36 px-6 flex flex-col items-start justify-start gap-10 font-poppins bg-white " >
            <h1 className=" font-syne font-semibold text-2xl   ">Blog Control Panel</h1>

            <Link href={"/blog-control/add-blog"} className="bg-gray-700 text-white rounded-lg border border-gray-700 py-2 px-5 text-xs md:text-sm ml-auto hover:rounded-[100px] transition-all duration-200 ease-in-out  " >Add Blog</Link>



            {!blogs || loading ? (
                <div className=" w-full h-[80vh] flex items-center justify-center " >
                    <Spinner />
                </div>
            )
                :
                <div className="w-full h-fit grid grid-cols-1 md:grid-cols-3  lg:grid-cols-4  gap-14 place-items-start justify-items-start">

                    {blogs.map((blog, i) => (
                        <AdminBlogCard key={i} blog={blog} />
                    ))}

                </div>
            }



        </div>
    )
}




interface AdminBlogCardProps {
    blog: ResearchBlogType
}


const AdminBlogCard = ({ blog }: AdminBlogCardProps) => {
    return (
        <Link href={`/research-blog/${encodeURIComponent(blog.slug)}`} target="_blank" referrerPolicy="no-referrer" className=" py-3 px-1 w-full h-full flex flex-col items-center justify-start gap-3 " >
            <div className="w-full h-[200px] flex items-center justify-center overflow-hidden relative bg-gray-200 " >
                <Image src={blog.image} fill alt="image" className=" object-center object-cover " />

            </div>

            <div className=" w-full flex flex-col items-start gap-2 " >

                <h1 className="text-gray-700 font-medium text-sm " > {blog.title} </h1>
                <div className="text-xs font-normal text-gray-600 " dangerouslySetInnerHTML={{ __html: blog.content.trim().slice(0, 50) + "..." }} />
                <div className="text-xs font-normal text-gray-600 "><b>Author:</b> {blog.author} </div>
                <div className="text-xs font-normal text-gray-600 ">Published on:  {new Date(blog.publicationDate).toDateString()} </div>
            </div>

        </Link>
    )
}