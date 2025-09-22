"use client"

import RecentBlogCard from "./RecentBlogCard";
import { useEffect, useState } from "react";
import { ResearchBlogType } from "@/types/types";
import Spinner from "../UI/Spinner";



export default function RecentBlogs() {
    const [recentBlogsData, setRecentBlogsData] = useState<null | ResearchBlogType[]>(null)

    useEffect(() => {
        fetch("/api/blogs")
            .then((res) => res.json())
            .then((data) => setRecentBlogsData(data))
    }, [])



    return (
        <section className="w-full flex items-center justify-center flex-col gap-10 md:gap-16 px-[4%]  py-20 " >
            <h5 className="text-black text-2xl lg:text-3xl font-extrabold font-poppins" >Recent Blogs </h5>
            <div className="ml-auto" >Sleector</div>
            {
                !recentBlogsData ? (<Spinner/>) :
                    recentBlogsData.length < 1 ? (<p className="mx-auto" > No blog found </p>) :
                        (
                            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 min-h-[65vh] gap-14 px-[4%] place-items-center justify-items-center " >
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