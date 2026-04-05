"use client"

import RecentBlogCard from "./RecentBlogCard";
import { useEffect, useState } from "react";
import { ResearchBlogType } from "@/types/types";
import { supabase } from "@/lib/supabaseClient";
import RecentBlogCardSkeleton from "./RecentBlogCardSkeleton";



export default function RecentBlogs() {
    const [recentBlogsData, setRecentBlogsData] = useState<null | ResearchBlogType[]>(null)




    useEffect(() => {

        const fetchRecentBlogs = async () => {

            const { data, error } = await supabase.from("blog").select("*").order("createdAt", { ascending: false }).limit(4)

            if (error) {
                console.error("Error fetching recent blogs:", error)
                setRecentBlogsData([])
            }
            else if (data) {
                setRecentBlogsData(data)
            }
        }

        fetchRecentBlogs()

    }, [])



    return (
        <section className="w-full h-fit flex items-center justify-center flex-col gap-10 md:gap-16  py-4" >
            {
                !recentBlogsData ? (
                   Array.from({length: 3}).map((_, index) => (
                    <RecentBlogCardSkeleton key={index} />
                   ))
                ) :
                    recentBlogsData.length < 1 ? (<p className="mx-auto" > No recent blog found </p>) :
                        (
                            <div className="w-full grid grid-cols-${}  min-h-[65vh] gap-5  place-items-center justify-items-center " >
                                {
                                    recentBlogsData.slice(0, 4).map((blog, index) => (
                                        <RecentBlogCard key={index} data={blog} />
                                    ))
                                }
                            </div>
                        )
            }
        </section>
    )
}