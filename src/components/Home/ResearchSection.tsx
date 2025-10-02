"use client"


import { useEffect, useRef, useState } from "react";
import ResearchCard from "../UI/ResearchCard";
import { useScroll, useTransform, motion } from "framer-motion";
import { ResearchBlogType } from "@/types/types";




export default function ResearchSection() {
      const [recentBlogsData, setRecentBlogsData] = useState<null | ResearchBlogType[]>(null)

    const targetRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: targetRef
    })

    const x = useTransform(scrollYProgress, [0, 1], ["10%", "-90%"])

       useEffect(() => {
            fetch("/api/blogs")
                .then((res) => res.json())
                .then((data) => setRecentBlogsData(data))
        }, [])




    return (

        <>
            <section className="w-full h-fit hidden lg:flex items-center justify-center gap-10 flex-col py-20 bg-[#f2f5fc] font-poppins  " >


                <h5 className="text-black text-2xl lg:text-3xl font-extrabold font-poppins" >Research Section </h5>



                <div ref={targetRef} className="relative w-full h-[300vh] " >



                    <div className="sticky h-[80vh]   top-[10%] flex items-center overflow-hidden " >
                        <motion.div className="flex gap-4   " style={{ x }} >


                            {
                                recentBlogsData?.map((blog, index) => (
                                    <ResearchCard blog={blog} key={index} />
                                ))
                            }



                        </motion.div>
                    </div>
                </div>
            </section>



            <section className="w-full h-fit flex lg:hidden items-center justify-center gap-10 flex-col py-10 bg-[#f2f5fc] font-poppins" >
                <h5 className="text-black text-2xl lg:text-3xl font-extrabold font-poppins" >Research Section </h5>

                <div className="w-full overflow-x-scroll flex items-center" >
                    <div className=" w-fit flex items-center justify-center gap-10 px-6 py-3 " >
                        {
                            recentBlogsData?.slice(0, 3).map((blog, index) => (
                                <ResearchCard blog={blog} key={index} />
                            ))
                        }
                    </div>
                </div>

            </section>
        </>





    )
}