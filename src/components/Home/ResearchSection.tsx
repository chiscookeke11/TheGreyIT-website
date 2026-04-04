"use client"


import { useEffect, useRef, useState } from "react";
import ResearchCard from "../UI/ResearchCard";
import { useScroll, useTransform, motion } from "framer-motion";
import { ResearchBlogType } from "@/types/types";
import { Spinner } from "../UI/Spinner";
import { supabase } from "@/lib/supabaseClient";





export default function ResearchSection() {
    const [recentBlogsData, setRecentBlogsData] = useState<null | ResearchBlogType[]>(null)

    const targetRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: targetRef
    })

    const x = useTransform(scrollYProgress, [0, 1], ["10%", "-50%"])



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

        <>
            <section className="w-full h-fit hidden lg:flex items-center justify-center gap-10 flex-col py-20 bg-[#f2f5fc] font-poppins  " >


                <h5 className="text-black text-2xl lg:text-3xl font-extrabold font-poppins" >Blogs </h5>



                <div ref={targetRef} className="relative w-full h-[300vh] " >



                    <div className="sticky h-fit   top-[10%] flex items-center overflow-hidden " >
                        {!recentBlogsData ? <div className="w-full flex items-center justify-center" > <Spinner /> </div>
                            : recentBlogsData.length < 1 ? <div className=" w-full flex items-center justify-center " > <p className="text-gray-700 text-xl font-semibold " >No blogs found</p> </div>
                                : <motion.div className="grid grid-cols-4 gap-5 place-items-center justify-center justify-items-center h-full   " style={{ x }} >
                                    {
                                        recentBlogsData?.slice(0, 4).map((blog, index) => (
                                            <ResearchCard blog={blog} key={index} />
                                        ))
                                    }


                                </motion.div>
                        }
                    </div>
                </div>
            </section>



            {/* Research Section for mobile view  */}
            <section className="w-full h-fit flex lg:hidden items-center justify-center gap-10 flex-col py-10 bg-[#f2f5fc] font-poppins" >
                <h5 className="text-black text-2xl lg:text-3xl font-extrabold font-poppins" >Blogs </h5>

                <div className="w-full overflow-x-auto flex items-center" >

                    {
                        !recentBlogsData ? <div className="w-full  flex items-center justify-center py-32" ><Spinner /></div>
                            :
                            recentBlogsData.length < 1 ? <div className="w-full  flex items-center justify-center py-32" >No blogs found</div>
                                :
                                recentBlogsData?.slice(0, 3).map((blog, index) => (
                                    <div key={index} className=" w-fit flex items-center justify-center gap-10 px-6 py-3 " >
                                        <ResearchCard blog={blog} />
                                    </div>
                                ))
                    }
                </div>

            </section>
        </>





    )
}