"use client"




import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
import { CourseData } from "@/data/CourseData";
import CourseCard from './CourseCard';





const TestimonialSlider = () => {
    return (
        <>
            <Swiper
                slidesPerView={1}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                }}
                spaceBetween={20}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                loop={true}
                modules={[Autoplay]}
                className="w-full h-full"
            >
                {CourseData.map((data, index) => (
                    <SwiperSlide key={index}>
                        <CourseCard data={data} />
                    </SwiperSlide>
                ))}
            </Swiper>


        </>
    );
}





export default function CourseSlider() {
    return (
        <section className="w-full h-full bg-amber-800  flex flex-col items-start justify-center   " >
            <TestimonialSlider />


        </section>
    )
}