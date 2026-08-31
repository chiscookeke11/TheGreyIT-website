"use client"


import { supabase } from "@/lib/supabaseClient";
import { ResearchBlogType } from "@/types/types"
import { useEffect, useState } from "react";
import { Spinner } from "../UI/Spinner";
import Link from "next/link";
import Image from "next/image";
import RecentBlogCard from "./RecentBlogCard";
import RecentBlogCardSkeleton from "./RecentBlogCardSkeleton";
import { estimateReadTime, formatReadableDate } from "@/lib/utils";
import PortableTextRenderer from '@/components/UI/PortableTextRenderer'


interface BlogPageComponentProps {
    slug: string
}

export default function BlogPageComponent({ slug }: BlogPageComponentProps) {
    const [currentBlog, setCurrentBlog] = useState<ResearchBlogType | null>(null)
    const [loading, setLoading] = useState(true);
    const [recentBlogsData, setRecentBlogsData] = useState<null | ResearchBlogType[]>(null)


    useEffect(() => {

        const fetchRecentBlogs = async () => {

            const { data, error } = await supabase.from("blog").select("*").order("publicationDate", { ascending: false }).limit(4)

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



    const fetchCurrentBlog = async () => {
        const { data, error } = await supabase
            .from("blog")
            .select("*")
            .eq("slug", slug)


        if (error || !data) {
            setCurrentBlog(null);
            setLoading(false);
            return;
        }
        setCurrentBlog(data[0]);
        setLoading(false);
    };



    useEffect(() => {
        fetchCurrentBlog()
    }, [slug])


    if (loading) {
        return <div className="p-10 text-center font-poppins h-[90vh] flex items-center justify-center "> <Spinner /> </div>;
    }

    if (!currentBlog) {
        return (
            <div className="p-10 text-center font-poppins h-[50vh] flex items-center justify-center ">
                <h1 className="text-2xl font-bold">Blog not found</h1>
            </div>
        );
    }


    return (
        <article className="bg-white text-black font-poppins flex flex-col items-center  gap-9 ">
            <div className="w-full  flex flex-col items-center gap-3 pt-24 md:pt-36 pb-16 px-[3%]  bg-[#f2f5fc]" >
                <div className="w-full max-w-2xl lg:max-w-4xl flex flex-col items-start gap-3 ">
                    <p className="text-xs flex items-center gap-4 " > {formatReadableDate(new Date(currentBlog.publicationDate))}
                        <span>| </span>
                        <span>{estimateReadTime(currentBlog.content)}</span></p>
                    <h1 className=" text-xl md:text-3xl font-bold font-sans">{currentBlog.title}</h1>
                    <p className="text-base font-medium font-lora ">{currentBlog.tagline} </p>
                    <p className="text-sm font-lora " >BY <Link href={"https://www.linkedin.com/company/thegreyit/"} target="_blank" className="text-gray-600 " >{currentBlog.author.toUpperCase()}</Link></p>
                </div>


                <div className="w-full max-w-5xl h-[40vh] md:h-[65vh] bg-black p-4 flex items-center justify-center mt-5 "  >

                    <div className="w-full h-full  bg-gray-300 flex items-center justify-center overflow-hidden relative border-[40px] border-white " >
                        <Image src={currentBlog.image} alt={`${currentBlog.title}-image`} fill className="object-center object-cover  " />

                    </div>
                </div>


            </div>

            <div className="w-full px-[5%] lg:px-[15%] py-16 bg-white">
                <div className="w-full max-w-4xl mx-auto blog-content">
                    <PortableTextRenderer value={currentBlog.content} />
                </div>
            </div>


            {/* The recent section  */}
            <div className="bg-[#f2f5fc] w-full  flex items-center justify-center py-10 px-3 " >
                <div className=" w-full max-w-7xl  overflow-y-auto scrollbar-hide my-10 " >
                    <h5 className="text-black text-base lg:text-[24px] font-semibold font-poppins mb-4">
                        Recent Blogs
                    </h5>
                    <section className="w-full h-fit flex items-center justify-center flex-col gap-10 md:gap-16  py-4" >
                        {
                            !recentBlogsData ? (
                                Array.from({ length: 3 }).map((_, index) => (
                                    <RecentBlogCardSkeleton key={index} />
                                ))
                            ) :
                                recentBlogsData.length < 1 ? (<p className="mx-auto" > No blog found </p>) :
                                    (
                                        <div className="w-full grid grid-cols-1 md:grid-cols-2  gap-16  place-items-center justify-items-center " >
                                            {
                                                recentBlogsData.slice(0, 4).map((blog, index) => (
                                                    <RecentBlogCard key={index} data={blog} />
                                                ))
                                            }
                                        </div>
                                    )
                        }
                    </section>
                </div>
            </div>
        </article>
    )
}
