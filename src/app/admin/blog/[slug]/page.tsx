



"use client"

import Spinner from "@/components/UI/Spinner"
import { ResearchBlogType } from "@/types/types"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"



export default function Page() {

    const { slug } = useParams()
    const [currentBlog, setCurrentBlog] = useState<ResearchBlogType | null>(null)





    useEffect(() => {
        if (!slug) return;


        const fetchBlog = async () => {
            try {
                const res = await fetch(`/api/blogs/${slug}`);
                if (!res.ok) throw new Error("Failed to fetch blog")

                const data = await res.json();
                setCurrentBlog(data)

            } catch (error) {
                console.error(error)
            }
        }
        fetchBlog()
    }, [slug])




    return (
        <div className="bg-white w-full h-fit text-black" >

            {!currentBlog ? <div className="w-full h-screen flex items-center justify-center" > <Spinner /> </div>
                :
                (
                    <>
                        <section className="w-full h-screen relative  " style={{ backgroundImage: `url(${currentBlog.image})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }} >
                            <div className="w-full h-full absolute inset-0 bg-gradient-to-b from-[rgba(4,9,30,0.5)] to-[rgba(4,9,30,0.5)] z-10 " />


                            <div className="absolute bottom-3 left-0  py-10 text-white z-10 px-[3%] w-full flex flex-col md:flex-row items-start md:items-center md:justify-between gap-7  " >
                                <div className="w-full basis-2/4 max-w-6xl flex flex-col items-start gap-4 " >
                                    <h1 className=" font-syne text-3xl font-bold " >{currentBlog.title} </h1>
                                </div>


                                <div className="basis-1/4  flex flex-col items-start md:items-end font-poppins gap-3 " >
                                    <h4>By {currentBlog.author} </h4>
                                    <h5>Published on: {new Date(currentBlog.createdAt).toLocaleDateString()} </h5>
                                </div>
                            </div>
                        </section>


                        <div className="w-full py-16 px-[5%]  font-poppins font-medium text-lg bg-[#f2f5fc]  " dangerouslySetInnerHTML={{ __html: currentBlog.content }} />



                    </>
                )
            }
        </div>
    )
}