"use client"

import { HeroCard } from "./ResearchHeroCard";
import { ResearchBlogType } from "@/types/types";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
import Spinner from "../UI/Spinner";









export default function ResearchHero() {
    const [trendingBlog, setTrendingBlog] = useState<null | ResearchBlogType[]>(null)


    useEffect(() => {
        fetch("/api/blogs")
            .then((res) => res.json())
            .then((data) => setTrendingBlog(data))
    }, [])

    return (
        <section className="w-full flex items-center justify-center flex-col gap-10   mx-auto mt-7 md:mt-5 md:gap-5  px-[4%] py-10 bg-[#f2f5fc] " >
            <h1 className="font-bold text-3xl lg:text-[40px] leading-[100%] text-[#000] max-w-md font-syne" >Trending</h1>
            <div className="w-full h-fit flex items-center justify-center py-2" >

                {!trendingBlog ? ( <div><Spinner /></div> )
                    :
                    trendingBlog.length < 1 ? "No blogs found"
                        :
                        (
                            <Swiper
                                slidesPerView={1}
                                breakpoints={{
                                    640: {
                                        slidesPerView: 1,
                                    },
                                    768: {
                                        slidesPerView: 1,
                                    },
                                    1024: {
                                        slidesPerView: 1,
                                    },
                                }}
                                spaceBetween={20}
                                autoplay={{
                                    delay: 2500,
                                    disableOnInteraction: false,
                                }}

                                loop={true}
                                modules={[Autoplay]}
                                className="w-full h-[80vh]  "
                            >
                                {trendingBlog?.slice(0, 3).map((data, index) => (
                                    <SwiperSlide key={index}>
                                        <HeroCard data={data} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )
                }

            </div>
        </section>
    )
}