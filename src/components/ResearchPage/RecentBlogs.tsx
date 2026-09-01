

import RecentBlogCard from "./RecentBlogCard";
import { getRecentBlogs } from "@/lib/blogs";



export default async function RecentBlogs() {

    const recentBlogsData = await getRecentBlogs()

    return (
        <section className="w-full h-fit flex items-center justify-center flex-col gap-10 md:gap-16  py-4" >
            {recentBlogsData.length < 1 ? (<p className="text-sm  md:text-2xl font-semibold mx-auto font-poppins opacity-75 " > No recent blog found </p>) :
                (
                    <div className="w-full grid  grid-cols-1  min-h-[65vh] gap-5  place-items-center justify-items-center " >
                        {
                            recentBlogsData.map((blog, index) => (
                                <RecentBlogCard key={index} data={blog} />
                            ))
                        }
                    </div>
                )
            }
        </section>
    )
}