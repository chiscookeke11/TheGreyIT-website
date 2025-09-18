import { researchBlogData } from "@/data/ResearchBlogData";
import { HeroCard } from "./ResearchHeroCard";









export default function ResearchHero() {
    return (
        <section className="w-full  h-[120vh] md:h-[50vh] lg:h-[85vh] flex flex-col md:flex-row items-center justify-center mx-auto  bg-white gap-10 md:gap-5 lg:gap-10 px-4 py-5 " >
            {
                researchBlogData.slice(0, 3).map((blog, index) => (
                    <HeroCard data={blog} key={index} />
                ) )
            }
        </section>
    )
}