"use client"

import { QuickIntroClass } from "@/types/types";
import { quickIntroClasses } from "@/data/IntroCourse_data";
import { useEffect, useState } from "react";
import Link from "next/link";


const INTRO_FEE = 10000;

export default function IntroCoursePageClient() {
    const [selectedQuickIntro, setSelectedQuickIntro] = useState<QuickIntroClass | null>(null)

    useEffect(() => {
        document.body.style.overflow = selectedQuickIntro ? "hidden" : "auto"

        return () => {
            document.body.style.overflow = "auto"
        }
    }, [selectedQuickIntro])

    return (
        <div className="w-full min-h-screen flex flex-col items-start gap-14 pb-16  bg-[#f2f5fc] font-poppins">

            {/* hero section  */}
            <div className="w-full h-[95vh] flex items-center justify-center relative bg-no-repeat bg-cover bg-center text-white font-poppins  " style={{ backgroundImage: 'url("/courses-page/hero-img-2.webp")' }}  >
                <div className="w-full h-full absolute inset-0 bg-gradient-to-b from-[rgba(4,9,30,0.5)] to-[rgba(4,9,30,0.5)] z-10 " />

                <div className=" w-full h-full absolute inset-0 flex items-center justify-center flex-col gap-5 z-20 text-center p-4 " >
                    <div className="w-full max-w-5xl text-center space-y-6 " >
                        <h1 className="text-2xl md:text-4xl font-bold" >Quick Intro Courses</h1>
                        <p className="text-lg text-center font-medium text-white " >Pick any course for a quick-start intro session. Every intro class costs just ₦15,000.</p>
                    </div>
                </div>
            </div>

            <section className="px-[2%] md:px-[6%] flex flex-col items-start gap-8  " >

                <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {
                        quickIntroClasses?.map((course) => (
                            <article key={course.slug} className="w-full bg-white rounded-xl border border-gray-200 px-5 py-5 shadow-sm flex flex-col gap-4">
                                <h2 className="text-lg md:text-xl font-semibold text-gray-900">{course.title}</h2>
                                <p className="text-sm text-gray-700 line-clamp-3">{course.about || "Quick intro class for this course."}</p>

                                <div className="mt-auto flex items-center justify-between gap-3">
                                    <p className="text-base font-semibold text-gray-900">₦{INTRO_FEE.toLocaleString()}</p>
                                    <button
                                        onClick={() => setSelectedQuickIntro(course)}
                                        className="inline-flex items-center cursor-pointer justify-center rounded-lg bg-gray-700 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600 transition"
                                    >
                                        Register
                                    </button>
                                </div>
                            </article>
                        ))
                    }
                </section>
            </section>


            {selectedQuickIntro && (
                <div
                    role="dialog"
                    aria-modal="true"
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
                    onClick={() => setSelectedQuickIntro(null)}
                >
                    <div
                        className="w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl bg-white p-5 md:p-7"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <h3 className="text-xl md:text-2xl font-semibold text-gray-900">{selectedQuickIntro.title}</h3>
                                <p className="text-sm md:text-base text-gray-500 font-semibold mt-1">{selectedQuickIntro.subtitle}</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setSelectedQuickIntro(null)}
                                className="rounded-md border cursor-pointer border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
                            >
                                Close
                            </button>
                        </div>

                        <div className="mt-5 space-y-5 text-gray-700">
                            <section>
                                <h4 className="font-semibold text-gray-900 mb-2">About</h4>
                                <p className="text-sm md:text-base leading-relaxed">{selectedQuickIntro.about}</p>
                            </section>

                            <section>
                                <h4 className="font-semibold text-gray-900 mb-2">What You&apos;ll Cover</h4>
                                <ul className="list-disc pl-5 space-y-1.5 text-sm md:text-base">
                                    {selectedQuickIntro.covers.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </section>

                            <section>
                                <h4 className="font-semibold text-gray-900 mb-2">Who Should Come</h4>
                                <ul className="list-disc pl-5 space-y-1.5 text-sm md:text-base">
                                    {selectedQuickIntro.whoShouldCome.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </section>

                            <section>
                                <h4 className="font-semibold text-gray-900 mb-2">Format</h4>
                                <p className="text-sm md:text-base">{selectedQuickIntro.format}</p>
                            </section>
                        </div>

                        <Link
                            href={`/intro/${selectedQuickIntro.slug}/register`}
                            className="inline-flex mt-6 rounded-md bg-[#19376d] px-4 py-2 text-sm font-medium text-white hover:bg-[#15305d]"
                        >
                            Register
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}
