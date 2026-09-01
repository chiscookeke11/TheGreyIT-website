

import { HeroCard } from "./ResearchHeroCard";
import ResearchHeroSkeleton from "./ResearchHeroSkeleton";
import { getRecentBlogs } from "@/lib/blogs";





export default async function ResearchHero() {
    const trendingBlog = await getRecentBlogs()

    return (
        <section className="w-full  flex items-start justify-center flex-col gap-5 md:gap-4  px-[2%] py-1  " >
            <h1 className="font-bold text-xl lg:text-[30px] leading-[100%] text-[#000] max-w-md font-syne" >Trending Blog</h1>
            <div className="w-full h-[65vh] flex items-center justify-center " >

                {!trendingBlog ? (<ResearchHeroSkeleton />) :
                    <HeroCard data={trendingBlog[0]} />
                }
            </div>
        </section>
    )
}