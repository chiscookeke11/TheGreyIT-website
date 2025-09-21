import { researchBlogData } from "@/data/ResearchBlogData";
import { HeroCard } from "./ResearchHeroCard";
import RecentBlogCard from "./RecentBlogCard";



export default function RecentBlogs() {
    return (
        <section className="w-full flex items-center justify-center flex-col gap-10 md:gap-16  py-20 " >
            <h5 className="text-black text-2xl lg:text-3xl font-extrabold font-poppins" >Recent Blogs </h5>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 min-h-[65vh] gap-10 px-[4%] " >
                {
                    researchBlogData.slice(0, 4).map((blog, index) => (
                        <RecentBlogCard key={index} data={blog} />
                    ))
                }
            </div>
        </section>
    )
}