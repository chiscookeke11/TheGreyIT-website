"use client"


import Spinner from "@/components/UI/Spinner"
import { supabase } from "@/lib/supabaseClient"
import { ResearchBlogType } from "@/types/types"
import { Fullscreen, LogOut, Trash, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { SetStateAction, useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"



interface ConfirmationModalProps {
    deleteBlog: (blogId: number) => void;
    setOpenConfirmationModal: React.Dispatch<SetStateAction<boolean>>
    currentId: number | null
}



const ConfirmationModal = ({ deleteBlog, setOpenConfirmationModal, currentId }: ConfirmationModalProps) => {
    return (
        <div className="w-full fixed inset-0 h-screen bg-black/25 backdrop-blur-2xl flex items-center justify-center px-[4%] py-7  " >
            <div className="bg-white rounded-sm w-full max-w-md py-7 px-5 flex flex-col items-center justify-center gap-4 " >
                <button
                    className="ml-auto cursor-pointer text-red-700  mb-3 "
                    onClick={() => setOpenConfirmationModal(false)}
                ><X size={24} /></button>

                <h1 className="text-center font-semibold text-lg md:text-xl " >Are you sure you want to delete this blog?</h1>

                <div className="flex w-fit items-center gap-32 justify-between mt-5 " >
                    <button onClick={() => {
                        if (currentId) {
                            deleteBlog(currentId)
                            setOpenConfirmationModal(false)
                        }
                        else return
                    }}
                        className="w-full bg-red-700 text-white py-2 px-4 rounded-sm flex items-center gap-1 cursor-pointer " > <Trash size={15} /> Yes</button>
                    <button
                        onClick={() => setOpenConfirmationModal(false)}
                        className="w-full bg-green-700 text-white py-2 px-4 rounded-sm flex items-center gap-1 cursor-pointer"><LogOut size={15} />No</button>

                </div>

            </div>
        </div>
    )
}



export default function Page() {
    const ref = useRef(null)
    const [blogs, setBlogs] = useState<ResearchBlogType[]>([])
    const [loading, setLoading] = useState(false)
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false)
    const [currentId, setCurrentId] = useState<number | null>(null)



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



                            <div key={index} className="w-full h-full  bg-gray-200 flex flex-col items-start gap-3 group  " >
                                <Image src={blog.image} alt={`${blog.title}-img`} height={500} width={500} className=" object-center object-cover h-[250px]  " />
                                <div className="w-full flex flex-col items-center justify-center gap-4 text-center py-5 px-3 " >
                                    <h4 className="font-syne font-semibold text-base "> {blog.title} </h4>
                                    <p className="text-xs text-gray-600">Slug: {blog.slug ?? "—"}</p>
                                    <div dangerouslySetInnerHTML={{ __html: blog.content.trim().slice(0, 60) + "..." }} className="flex items-center gap-1 text-sm font-normal " />
                                    <div className="flex items-center gap-1 text-xs font-normal " ><p>By {blog.author}</p> <span className="bg-gray-300 block h-5 w-[1px] mx-2 " /> <p>{new Date(blog.publicationDate).toLocaleDateString()} </p></div>
                                </div>

                                <div className=" w-full px-4  flex items-center justify-center gap-3  mt-auto mb-4 " >
                                    <button onClick={() => {
                                        setOpenConfirmationModal(true)
                                        setCurrentId(blog.id)
                                    }}
                                        className=" bg-gray-400 hover:bg-gray-700 hover:text-gray-200 transition-all ease-in-out duration-300 p-2 cursor-pointer rounded-sm text-white " ><Trash /></button>

                                    <Link href={`/admin/blog/${encodeURIComponent(blog.slug)}`} className=" bg-gray-400 hover:bg-gray-700 hover:text-gray-200 transition-all ease-in-out duration-300 p-2 cursor-pointer rounded-sm text-white " ><Fullscreen /> </Link>
                                </div>
                            </div>

                        ))}
                    </div>
                )}

                {openConfirmationModal && <ConfirmationModal
                    deleteBlog={deleteBlog}
                    setOpenConfirmationModal={setOpenConfirmationModal}
                    currentId={currentId}
                />}


                <div ref={ref} className="w-10 h-10 absolute right-0 bottom-0" />
            </section>
        </div>
    )
}