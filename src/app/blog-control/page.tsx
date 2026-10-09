"use client";

import ConfirmDelete from "@/components/UI/ConfirmDelete";
import Loading from "@/components/UI/Loading";
import { Spinner } from "@/components/UI/Spinner";
import UpdateBlog from "@/components/UI/UpdateBlog";
import { ResearchBlogType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { SetStateAction, useCallback, useEffect, useRef, useState } from "react";

type AdminBlogPreview = Pick<ResearchBlogType, "id" | "image" | "title" | "slug" | "status">;

const RANGE = 16;

export default function Page() {
    const [blogs, setBlogs] = useState<AdminBlogPreview[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const loaderRef = useRef<HTMLDivElement | null>(null);
    const nextPageRef = useRef(1);
    const isFetchingRef = useRef(false);
    const hasMoreRef = useRef(true);

    const fetchBlogs = useCallback(async () => {
        if (isFetchingRef.current || !hasMoreRef.current) return;

        setIsFetchingMore(true);
        setError(null);
        isFetchingRef.current = true;

        try {
            const response = await fetch(
                `/api/admin/blogs?page=${nextPageRef.current}&range=${RANGE}`,
                { cache: "no-store" }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch blogs");
            }

            const result = await response.json();
            const fetchedBlogs = result.data as AdminBlogPreview[];

            setBlogs((previousBlogs) => [...previousBlogs, ...fetchedBlogs]);
            nextPageRef.current += 1;

            // A short page means there are no more records to request.
            if (fetchedBlogs.length < RANGE) {
                hasMoreRef.current = false;
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error fetching blogs:", error);
            setError("Unable to load blogs. Please try again.");
            hasMoreRef.current = false;
            setHasMore(false);
        } finally {
            setLoading(false);
            setIsFetchingMore(false);
            isFetchingRef.current = false;
        }
    }, []);

    useEffect(() => {
        fetchBlogs();
    }, [fetchBlogs]);

    useEffect(() => {
        document.body.style.overflowY = showDeleteModal ? "hidden" : "auto";

        return () => {
            document.body.style.overflowY = "auto";
        };
    }, [showDeleteModal]);

    const removeBlogFromUI = (id: number) => {
        setBlogs((previousBlogs) => previousBlogs.filter((blog) => blog.id !== id));
    };

    const updateBlogInUI = (updatedBlog: ResearchBlogType) => {
        setBlogs((previousBlogs) =>
            previousBlogs.map((blog) =>
                blog.id === updatedBlog.id ? updatedBlog : blog
            )
        );
    };

    useEffect(() => {
        const loaderElement = loaderRef.current;

        if (!loaderElement || !hasMore || isFetchingMore) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0]?.isIntersecting) {
                    fetchBlogs();
                }
            },
            {
                threshold: 0.1,
                rootMargin: "400px 0px",
            }
        );

        observer.observe(loaderElement);

        return () => {
            observer.unobserve(loaderElement);
        };
    }, [fetchBlogs, hasMore, isFetchingMore]);

    const retryFetch = () => {
        hasMoreRef.current = true;
        setHasMore(true);
        fetchBlogs();
    };

    return (
        <div className="relative flex h-fit w-full flex-col items-start justify-start gap-10 bg-white font-poppins">
            <Link href="/blog-control/add-blog" className="ml-auto rounded-lg border border-gray-700 bg-gray-700 px-5 py-2 text-xs text-white transition-all duration-200 ease-in-out hover:rounded-[100px] md:text-sm">
                Add Blog
            </Link>

            {loading ? (
                <div className="flex h-[80vh] w-full items-center justify-center">
                    <Spinner />
                </div>
            ) : (
                <div className="grid h-fit w-full grid-cols-1 place-items-start justify-items-start gap-14 md:grid-cols-2 lg:grid-cols-4">
                    {blogs.map((blog) => (
                        <AdminBlogCard
                            key={blog.id}
                            setShowEditModal={setShowEditModal}
                            setSelectedIndex={setSelectedIndex}
                            setShowDeleteModal={setShowDeleteModal}
                            blog={blog}
                        />
                    ))}
                </div>
            )}

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
            />}

            {hasMore && (
                <div ref={loaderRef} className="flex w-full justify-center py-6">
                    {isFetchingMore && <Loading />}
                </div>
            )}

            {error && (
                <div className="flex w-full flex-col items-center gap-3 py-6 text-sm text-red-600">
                    <p>{error}</p>
                    <button
                        className="rounded-lg bg-gray-700 px-5 py-2 text-xs text-white"
                        onClick={retryFetch}
                    >
                        Retry
                    </button>
                </div>
            )}
        </div>
    );
}

interface AdminBlogCardProps {
    blog: AdminBlogPreview;
    setShowDeleteModal: React.Dispatch<SetStateAction<boolean>>;
    setSelectedIndex: React.Dispatch<SetStateAction<number | null>>;
    setShowEditModal: React.Dispatch<SetStateAction<boolean>>;
}

const AdminBlogCard = ({ blog, setShowDeleteModal, setSelectedIndex, setShowEditModal }: AdminBlogCardProps) => {
    return (
        <div className="relative flex h-full w-full flex-col items-center justify-start gap-3 px-1 py-3">
            {blog.status === "scheduled" ? (
                <span className="absolute right-5 top-0 z-10 flex w-fit items-center justify-center bg-blue-100 px-3 py-1.5 text-center text-xs text-blue-600">
                    Scheduled
                </span>
            ) : (
                <span className="absolute right-5 top-0 z-10 flex w-fit items-center justify-center bg-green-100 px-3 py-1.5 text-center text-xs text-green-700">
                    Published
                </span>
            )}

            <Link href={`/research-blog/${encodeURIComponent(blog.slug)}`} target="_blank" className="w-full">
                <div className="relative h-[200px] w-full bg-gray-200">
                    <Image
                        src={blog.image || "/placeholder.jpg"}
                        fill
                        alt=""
                        className="absolute inset-0 object-cover object-center"
                    />
                </div>

                <div className="mt-3 flex w-full flex-col items-start gap-2">
                    <h1 className="text-sm font-medium text-gray-700">{blog.title}</h1>
                </div>
            </Link>

            <div className="mt-4 flex w-full items-center gap-4">
                <button
                    onClick={() => {
                        setShowDeleteModal(true);
                        setSelectedIndex(blog.id);
                    }}
                    className="cursor-pointer rounded-lg bg-red-600 px-5 py-2 text-[8px] text-white transition-all duration-300 ease-in-out hover:rounded-[100px] md:text-xs"
                >
                    Delete
                </button>

                <button
                    onClick={() => {
                        setShowEditModal(true);
                        setSelectedIndex(blog.id);
                    }}
                    className="cursor-pointer rounded-lg bg-gray-700 px-5 py-2 text-[8px] text-white transition-all duration-300 ease-in-out hover:rounded-[100px] md:text-xs"
                >
                    Update
                </button>
            </div>
        </div>
    );
};
