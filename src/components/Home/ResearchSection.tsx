"use client"


import { useRef } from "react";
import ResearchCard from "../UI/ResearchCard";
import { useScroll, useTransform, motion } from "framer-motion";
import { BlogData } from "@/data/BlogData";




export default function ResearchSection() {

    const targetRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: targetRef
    })

    const x = useTransform(scrollYProgress, [0, 1], ["10%", "-90%"])




    return (

        <section className="w-full h-fit flex items-center justify-center gap-10 flex-col py-20 bg-white " >


            <h5 className="text-black text-2xl lg:text-3xl font-extrabold font-poppins" >Research Section </h5>



            <div ref={targetRef} className="relative w-full h-[300vh] " >



                <div className="sticky h-[70vh]   top-[10%] flex items-center overflow-hidden " >
                    <motion.div className="flex gap-4   " style={{ x }} >


                        {
                            BlogData.map((blog, index) => (
                                <ResearchCard blog={blog} key={index}  />
                            ))
                        }



                    </motion.div>
                </div>
            </div>
        </section>





    )
}