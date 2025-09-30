"use client"

import { HeroCard } from "./ResearchHeroCard";
import { ResearchBlogType } from "@/types/types";
import { useEffect, useState } from "react";
import Spinner from "../UI/Spinner";









export default function ResearchHero() {
    const [trendingBlog, setTrendingBlog] = useState<null | ResearchBlogType[]>(null)


    useEffect(() => {
        fetch("/api/blogs")
            .then((res) => res.json())
            .then((data) => setTrendingBlog(data))
    }, [])

    return (
        <section className="w-full flex items-center justify-center flex-col gap-10   mx-auto mt-10 md:gap-5  px-[4%] py-10 bg-[#f2f5fc] " >
            <h1 className="font-bold text-3xl lg:text-[45px] leading-[100%] text-[#000] max-w-md font-syne" >Trending</h1>
            <div className="w-full   md:h-[50vh] lg:h-[80vh] flex flex-col md:flex-row items-center justify-center gap-10  md:gap-5 lg:gap-10 " >
                {
                    !trendingBlog ? (<Spinner/>) :
                        trendingBlog.length < 0 ? "No blogs found" :
                            (
                                trendingBlog.slice(0, 3).map((blog, index) => (
                                    <HeroCard data={blog} key={index} />
                                ))
                            )
                }
            </div>
        </section>
    )
}