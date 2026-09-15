"use client"

import ConfirmDelete from "@/components/UI/ConfirmDelete";
import Loading from "@/components/UI/Loading";
import { Spinner } from "@/components/UI/Spinner";
import UpdateBlog from "@/components/UI/UpdateBlog";
import { ResearchBlogType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { SetStateAction, useCallback, useEffect, useRef, useState } from "react";


export default function Page() {
    const [blogs, setBlogs] = useState<ResearchBlogType[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    const loaderRef = useRef<HTMLDivElement | null>(null);

    const RANGE = 16;

    // Fetch blogs whenever page changes
    const fetchBlogs = useCallback(async (pageNumber: number) => {
        if (isFetchingMore || !hasMore) return;

        setIsFetchingMore(true);

        try {
            const response = await fetch(
                `/api/admin/blogs?page=${pageNumber}&range=${RANGE}`
            );

            if (!response.ok) {
                throw new Error("Failed to fetch blogs");
            }

            const result = await response.json();

            setBlogs((prev) => [...prev, ...result.data]);

            // If fewer than 16 were returned,
            // we've reached the end.
            if (result.data.length < RANGE) {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error fetching blogs:", error);
        } finally {
            setLoading(false);
            setIsFetchingMore(false);
        }
    }, [isFetchingMore, hasMore]);

    useEffect(() => {
        fetchBlogs(page);
    }, [page]);

    // Hide scroll when delete modal is open
    useEffect(() => {
        document.body.style.overflowY = showDeleteModal ? "hidden" : "auto"

        return () => {
            document.body.style.overflowY = "auto"
        }
    }, [showDeleteModal])


    // this  function updates the delete function on the UI
    const removeBlogFromUI = (id: string) => {
        setBlogs(prev => (prev.filter(blog => String(blog.id) !== id)))
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





    //  Intersection observer for fetching more
    useEffect(() => {
        const loaderElement = loaderRef.current;

        if (!loaderElement || !hasMore || isFetchingMore) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0]?.isIntersecting) {
                    setPage((prev) => prev + 1);
                }
            },
            {
                threshold: 0.1,
            }
        );

        observer.observe(loaderElement);

        return () => {
            observer.unobserve(loaderElement);
        };
    }, [hasMore, isFetchingMore]);



    return (
        <div className="relative w-full h-fit  flex flex-col items-start justify-start gap-10 font-poppins bg-white " >

            <Link href={"/blog-control/add-blog"} className="bg-gray-700 text-white
             rounded-lg border border-gray-700 py-2 px-5 text-xs md:text-sm ml-auto
             hover:rounded-[100px] transition-all duration-200 ease-in-out  " >Add Blog</Link>



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


            {hasMore && (
                <div ref={loaderRef} className="w-full flex justify-center py-6">
                    {isFetchingMore && <Loading />}
                </div>
            )}

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
        <div className="py-3 px-1 w-full h-full flex flex-col items-center justify-start gap-3 relative ">

            {blog.status === "scheduled" ? (
                <span className="w-fit z-10 flex items-center justify-center text-center
                text-xs absolute top-0 right-5 py-1.5 px-3 bg-blue-100 text-blue-600  " >
                    Scheduled
                </span>
            )
                : (
                    <span className="w-fit z-10 flex items-center justify-center text-center
                text-xs absolute top-0 right-5 py-1.5 px-3 text-green-700 bg-green-100 " >
                        Published
                    </span>
                )

            }

            {/* Only this part should navigate */}
            <Link
                href={`/research-blog/${encodeURIComponent(blog.slug)}`}
                target="_blank"
                className="w-full"
            >
                <div className="w-full h-[200px] relative bg-gray-200">
                    <Image
                        src={blog.image || "/placeholder.jpg"}
                        fill
                        alt="image"
                        className="object-center object-cover absolute inset-0 "
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