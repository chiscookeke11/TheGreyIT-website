import { researchBlogData } from "@/data/ResearchBlogData";
import { HeroCard } from "./ResearchHeroCard";









export default function ResearchHero() {
    return (
       <section className="w-full flex items-center justify-center flex-col gap-10   mx-auto mt-10 md:gap-5  px-[4%] py-10 bg-[#f2f5fc] " >
        <h1 className="font-bold text-3xl lg:text-[45px] leading-[100%] text-[#000] max-w-md font-syne" >Trending</h1>
         <div className="w-full  h-[120vh] md:h-[50vh] lg:h-[85vh] flex flex-col md:flex-row items-center justify-center gap-10  md:gap-5 lg:gap-10 " >
            {
                researchBlogData.slice(0, 3).map((blog, index) => (
                    <HeroCard data={blog} key={index} />
                ) )
            }
        </div>
       </section>
    )
}