"use client"


import Spinner from "@/components/UI/Spinner"
import { supabase } from "@/lib/supabaseClient"
import { ResearchBlogType } from "@/types/types"
import { Fullscreen, Trash } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"







const ConfirmationModal = () => {
    return (
        <div className="w-full fixed inset-0 h-screen bg-black/25 backdrop-blur-2xl flex items-center justify-center px-[4%] py-7  " >
<div className="bg-white rounded-sm " >

</div>
        </div>
    )
}



export default function Page() {
    const ref = useRef(null)
    const [blogs, setBlogs] = useState<ResearchBlogType[]>([])
    const [loading, setLoading] = useState(false)
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false)



    const fetchBlogs = async () => {

        setLoading(true)
        const { data, error } = await supabase.from("blog").select("*")

        if (error) {
            toast.error("Error fetching blog, please refresh your page")
            setLoading(false)
        }
        else if (data) {
            setBlogs(data)
            setLoading(false)
        }
    }



    // Fetch blogs whenever page changes
    useEffect(() => {
        fetchBlogs()
    }, [])



    // function to delete blog
    const deleteBlog = async (blogId: number) => {
        const { error } = await supabase.from("blog").delete().eq('id', blogId)

        if (error) {
            toast.error("Failed tp delete blog")
        }

        else {
            setBlogs(prev => (prev ? prev.filter(blog => blog.id !== blogId) : []))
            toast.success("Blog deleted successfully")
        }
    }


    useEffect(() => {
        document.body.style.overflowY = openConfirmationModal ? "hidden" : "auto"

    }, [openConfirmationModal])






    return (
        <div className="w-full min-h-screen flex items-center justify-center py-10 bg-white  " >



            <section className=" w-full  px-[4%] text-black flex flex-col items-center justify-center gap-16 relative">

                {blogs.length === 0 && loading ? (
                    <Spinner />
                ) : blogs.length < 1 ? (
                    "No blogs available"
                ) : (
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 min-h-[65vh] gap-14 px-[4%] place-items-center justify-items-center pb-20 ">
                        {blogs.map((blog, index) => (



                            <div key={index} className="w-full bg-gray-200 flex flex-col items-start gap-4 group  " >
                                <Image src={blog.image} alt={`${blog.title}-img`} height={500} width={500} className="flex-1 object-center object-cover  " />
                                <div className="w-full flex flex-col items-center justify-center gap-4 text-center py-5 px-3 " >
                                    <h4 className="font-syne font-semibold text-xl "> {blog.title} </h4>
                                    <div dangerouslySetInnerHTML={{ __html: blog.content.trim().slice(0, 60) + "..." }} className="flex items-center gap-1 text-sm font-normal " />
                                    <div className="flex items-center gap-1 text-xs font-normal " ><p>By {blog.author}</p> <span className="bg-gray-300 block h-5 w-[1px] mx-2 " /> <p>{new Date(blog.publicationDate).toLocaleDateString()} </p></div>
                                </div>

                                <div className="h-0 overflow-hidden  bg-white w-full px-4  flex items-center justify-center gap-3 group-hover:h-fit group-hover:py-4 transition-all duration-300 ease-in-out " >
                                    <button onClick={() => setOpenConfirmationModal(true)} className=" bg-gray-400 hover:bg-gray-700 hover:text-gray-200 transition-all ease-in-out duration-300 p-2 cursor-pointer rounded-sm text-white " ><Trash /></button>
                                    <Link href={`/admin/blog/${blog.id}`}  className=" bg-gray-400 hover:bg-gray-700 hover:text-gray-200 transition-all ease-in-out duration-300 p-2 cursor-pointer rounded-sm text-white " ><Fullscreen /> </Link>
                                </div>
                            </div>

                        ))}
                    </div>
                )}

                {openConfirmationModal && <ConfirmationModal/>}


                <div ref={ref} className="w-10 h-10 absolute right-0 bottom-0" />
            </section>
        </div>
    )
}