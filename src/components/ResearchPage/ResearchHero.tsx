"use client"

import { HeroCard } from "./ResearchHeroCard";
import { ResearchBlogType } from "@/types/types";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import ResearchHeroSkeleton from "./ResearchHeroSkeleton";





export default function ResearchHero() {
    const [trendingBlog, setTrendingBlog] = useState<null | ResearchBlogType>(null)



    useEffect(() => {

        const fetchRecentBlogs = async () => {

            const { data, error } = await supabase
            .from("blog")
            .select("*")
            .eq("status", "published")
            .order("createdAt", { ascending: false }).limit(1)

            if (error) {
                console.error("Error fetching recent blogs:", error)
            }
            else if (data) {
                setTrendingBlog(data[0])
            }

        }

        fetchRecentBlogs()
    }, [])

    return (
        <section className="w-full  flex items-start justify-center flex-col gap-10 md:gap-6  px-[2%] py-1  " >
            <h1 className="font-bold text-xl lg:text-[30px] leading-[100%] text-[#000] max-w-md font-syne" >Trending Blog</h1>
            <div className="w-full h-[55vh] flex items-center justify-center" >

                {!trendingBlog ? (<ResearchHeroSkeleton />) :
                    <HeroCard data={trendingBlog} />
                }
            </div>
        </section>
    )
}