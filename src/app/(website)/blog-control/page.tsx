"use client"

import ConfirmDelete from "@/components/UI/ConfirmDelete";
import { Spinner } from "@/components/UI/Spinner";
import UpdateBlog from "@/components/UI/UpdateBlog";
import { supabase } from "@/lib/supabaseClient";
import { ResearchBlogType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { SetStateAction, useEffect, useState } from "react";



export default function Page() {
    const [blogs, setBlogs] = useState<ResearchBlogType[] | null>(null)
    const [loading, setLoading] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState<string>("")
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)



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



    // this  function updates the delete function on the UI
    const removeBlogFromUI = (id: string) => {
        setBlogs(prev => (prev ? prev.filter(blog => String(blog.id) !== id) : null))
    }


    const updateBlogInUI = (updatedBlog: ResearchBlogType) => {
        if (!updatedBlog) return;


        setBlogs((prevBlogs) =>
            prevBlogs ?
                prevBlogs.map((blog) =>
                    blog.id === updatedBlog.id ? updatedBlog : blog
                )
                : [updatedBlog]
        )

    }



    return (
        <div className="relative w-full h-fit  py-36 px-6 flex flex-col items-start justify-start gap-10 font-poppins bg-white " >
            <h1 className=" font-syne font-semibold text-2xl   ">Blog Control Panel</h1>

            <Link href={"/blog-control/add-blog"} className="bg-gray-700 text-white rounded-lg border border-gray-700 py-2 px-5 text-xs md:text-sm ml-auto hover:rounded-[100px] transition-all duration-200 ease-in-out  " >Add Blog</Link>



            {!blogs || loading ? (
                <div className=" w-full h-[80vh] flex items-center justify-center " >
                    <Spinner />
                </div>
            )
                :
                <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-14 place-items-start justify-items-start">

                    {blogs.map((blog, i) => (
                        <AdminBlogCard
                            setShowEditModal={setShowEditModal}
                            setSelectedIndex={setSelectedIndex}
                            setShowDeleteModal={setShowDeleteModal}
                            key={i}
                            blog={blog} />
                    ))}

                </div>
            }


            {showDeleteModal && <ConfirmDelete
                selectedIndex={selectedIndex}
                collectionName="blog"
                onDelete={removeBlogFromUI}
                setConfirmDeleteModal={setShowDeleteModal}
            />}


            {showEditModal && <UpdateBlog
                selectedIndex={selectedIndex}
                showEditModal={showEditModal}
                setShowEditModal={setShowEditModal}
                updateBlogInUI={updateBlogInUI}
            />
            }

        </div>
    )
}




interface AdminBlogCardProps {
    blog: ResearchBlogType;
    setShowDeleteModal: React.Dispatch<SetStateAction<boolean>>
    setSelectedIndex: React.Dispatch<SetStateAction<string>>
    setShowEditModal: React.Dispatch<SetStateAction<boolean>>
}


const AdminBlogCard = ({ blog, setShowDeleteModal, setSelectedIndex, setShowEditModal }: AdminBlogCardProps) => {
    return (
        <div className="py-3 px-1 w-full h-full flex flex-col items-center justify-start gap-3">

            {/* Only this part should navigate */}
            <Link
                href={`/research-blog/${encodeURIComponent(blog.slug)}`}
                target="_blank"
                className="w-full"
            >
                <div className="w-full h-[200px] relative bg-gray-200">
                    <Image
                        src={blog.image}
                        fill
                        alt="image"
                        className="object-center object-cover"
                    />
                </div>

                <div className="w-full flex flex-col items-start gap-2 mt-3">
                    <h1 className="text-gray-700 font-medium text-sm">
                        {blog.title}
                    </h1>
                </div>
            </Link>

            {/* Buttons OUTSIDE Link */}
            <div className="w-full flex items-center gap-4 mt-4">
                <button
                    onClick={() => {
                        setShowDeleteModal(true)
                        setSelectedIndex(String(blog.id))
                    }}
                    className="bg-red-600 text-white rounded-lg py-2 px-5 text-[8px] md:text-xs cursor-pointer hover:rounded-[100px] transition-all duration-300 ease-in-out ">
                    Delete
                </button>

                <button
                    onClick={() => {
                        setShowEditModal(true)
                        setSelectedIndex(String(blog.id))
                    }}
                    className="bg-gray-700 text-white rounded-lg py-2 px-5 text-[8px] md:text-xs cursor-pointer hover:rounded-[100px] transition-all duration-300 ease-in-out">
                    Update
                </button>
            </div>
        </div>
    )
}