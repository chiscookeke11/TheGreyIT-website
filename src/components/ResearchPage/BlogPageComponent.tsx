"use client"


import { supabase } from "@/lib/supabaseClient";
import { ResearchBlogType } from "@/types/types"
import { useEffect, useState } from "react";
import { Spinner } from "../UI/Spinner";


interface BlogPageComponentProps {
    slug: string
}



export default function BlogPageComponent({ slug }: BlogPageComponentProps) {
    const [currentBlog, setCurrentBlog] = useState<ResearchBlogType | null>(null)
    const [loading, setLoading] = useState(true);



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
        return <div className="p-10 text-center font-poppins h-[50vh] flex items-center justify-center "> <Spinner /> </div>;
    }

    if (!currentBlog) {
        return (
            <div className="p-10 text-center font-poppins h-[50vh] flex items-center justify-center ">
                <h1 className="text-2xl font-bold">Blog not found</h1>
            </div>
        );
    }



    const structuredData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": currentBlog.title,
        "description": currentBlog.content || currentBlog.title,
        "image": currentBlog.image,
        "author": {
            "@type": "Person",
            "name": currentBlog.author
        },
        "publisher": {
            "@type": "Organization",
            "name": "TheGreyIT",
            "logo": {
                "@type": "ImageObject",
                "url": "https://www.thegreyit.com/logo.png"
            }
        },
        "datePublished": currentBlog.createdAt,
        "dateModified": currentBlog.createdAt,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://www.thegreyit.com/blog/${currentBlog.slug}`
        }
    };



    return (
        <article className="bg-white text-black font-poppins ">
            <section
                className="w-full h-screen relative"
                style={{
                    backgroundImage: `url(${currentBlog.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-black/50" />

                <div className="absolute bottom-6 px-[3%] text-white z-10 w-full flex flex-col md:flex-row justify-between">
                    <h1 className="text-3xl font-bold">{currentBlog.title}</h1>

                    <div className="text-sm text-right">
                        <p>By {currentBlog.author}</p>
                        <p>
                            Published on{" "}
                            {new Date(currentBlog.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            </section>

            <div
                className="px-[7%] lg:px-[15%] py-16 bg-[#f2f5fc]"
                dangerouslySetInnerHTML={{ __html: currentBlog.content }}
            />
        </article>
    )
}