import { quickIntroClasses } from "@/data/IntroCourse_data"
import { QuickIntroClass } from "@/types/types"
import { useState } from "react"




export default function IntroCoursesSection() {
    const [selectedQuickIntro, setSelectedQuickIntro] = useState<QuickIntroClass | null>(null)


    return (
        <>

            <section className="w-full flex flex-col gap-4 pt-6">
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">Quick Intro Classes - ₦10,000 Each</h2>
                    <p className="text-sm md:text-base text-gray-600 max-w-4xl">
                        These are standalone taster sessions, separate from the full courses. Anyone can book a Quick Intro class for ₦10,000
                        and attend one live session before deciding whether to enrol in the full programme.
                    </p>
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {quickIntroClasses.map((introClass) => (
                        <article
                            key={introClass.title}
                            className="w-full h-full rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <h3 className="text-lg font-semibold text-gray-900">{introClass.title}</h3>
                            <p className="text-sm text-blue-700 font-semibold mt-1">{introClass.subtitle}</p>
                            <p className="text-sm text-gray-600 mt-3 line-clamp-4">{introClass.about}</p>
                            <button
                                type="button"
                                onClick={() => setSelectedQuickIntro(introClass)}
                                className="mt-5 w-fit rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                            >
                                View details
                            </button>
                        </article>
                    ))}
                </div>
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
                                <p className="text-sm md:text-base text-blue-700 font-semibold mt-1">{selectedQuickIntro.subtitle}</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setSelectedQuickIntro(null)}
                                className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
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

                        <a
                            href="https://thegreyit.org/courses"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex mt-6 rounded-md bg-[#19376d] px-4 py-2 text-sm font-medium text-white hover:bg-[#15305d]"
                        >
                            Register at thegreyit.org/courses
                        </a>
                    </div>
                </div>
            )}
        </>
    )
}