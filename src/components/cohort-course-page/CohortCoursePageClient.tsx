"use client"

import CohortCourseCard from "@/components/UI/CohortCourseCard";
import { supabase } from "@/lib/supabaseClient";
import { CohortCourseTypes } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Spinner } from "../UI/Spinner";

type QuickIntroClass = {
    title: string
    subtitle: string
    about: string
    covers: string[]
    whoShouldCome: string[]
    format: string
}

const quickIntroClasses: QuickIntroClass[] = [
    {
        title: "Junior Data Analyst — Quick Intro",
        subtitle: "₦10,000 — Single Session",
        about: "Not sure if data analysis is for you? This intro class gives you a real taste of what the full course covers. In one focused session, you'll handle actual data, build a simple chart, and walk away knowing whether this is the direction you want to take. No experience needed. No pressure.",
        covers: [
            "What data analysts actually do day-to-day in real jobs",
            "How to open, read, and make sense of a basic dataset in Excel",
            "Creating your first chart from raw numbers",
            "What tools you'll use in the full course and why they matter",
            "The kinds of jobs and opportunities available in data",
        ],
        whoShouldCome: [
            "Anyone curious about data but not sure where to start",
            "Students or job seekers exploring tech career options",
            "Business owners who want to understand what data analysis could do for them",
        ],
        format: "One live session — online or in-person. Bring your curiosity, leave with clarity.",
    },
    {
        title: "Web Development (Junior) — Quick Intro",
        subtitle: "₦10,000 — Single Session",
        about: "This intro class breaks down how websites work and what it actually feels like to build one. You'll write real HTML and CSS in the session — not just watch it happen — and by the end you'll have made something visible in a browser with your own hands. It's the fastest way to know if coding is for you.",
        covers: [
            "How websites are actually structured and what the browser does with your code",
            "Writing your first HTML — headings, text, images, and links",
            "Adding basic styling with CSS to change colours, fonts, and layout",
            "What the full course covers and where it can take you",
            "Common myths about coding and what learning to code is really like",
        ],
        whoShouldCome: [
            "Complete beginners who've always been curious about coding",
            "People who've tried online tutorials but wanted a real human to guide them",
            "Anyone considering the full Junior Web Developer course",
        ],
        format: "One live session — online or in-person. You'll actually write code, not just watch.",
    },
    {
        title: "A.I Engineering (Entry-Level) — Quick Intro",
        subtitle: "₦10,000 — Single Session",
        about: "Everyone is talking about AI, but very few people understand what's actually happening under the hood. This class demystifies it. You'll see how AI tools are built, get a feel for working with an AI API, and understand the difference between using AI and engineering with it. Perfect for anyone trying to figure out if AI engineering is the direction they want to go.",
        covers: [
            "What AI actually is versus what most people think it is",
            "The difference between machine learning, LLMs, and general AI",
            "How developers actually build things using AI tools and APIs",
            "A hands-on demo: making an AI API do something useful",
            "What the entry-level AI Engineering course covers and what it prepares you for",
        ],
        whoShouldCome: [
            "Curious beginners who want to understand AI beyond headlines and hype",
            "Students and professionals exploring tech career options",
            "Anyone thinking about the full A.I Engineering course",
        ],
        format: "One live session — online or in-person. Expect a demo, a discussion, and a hands-on activity.",
    },
    {
        title: "Mobile Developer (Junior) — Quick Intro",
        subtitle: "₦10,000 — Single Session",
        about: "You'll actually build something in this class — a very simple app — using beginner-friendly tools. By the end of the session you'll understand how mobile apps are made, what the development process looks like, and whether the full Junior Mobile Developer course is the right next step for you.",
        covers: [
            "How mobile apps work and what happens when you tap a button on your phone",
            "The difference between no-code tools and real coding for mobile",
            "Hands-on: building a basic app screen in Thunkable",
            "What platforms (Android vs iOS) mean for developers",
            "What the full Junior Mobile Developer course covers and where it leads",
        ],
        whoShouldCome: [
            "Anyone who's ever thought 'I wish I could build an app'",
            "Students and creatives looking for a tech direction to pursue",
            "People who have an app idea and want to know if they can make it themselves",
        ],
        format: "One live session — online or in-person. You will build something you can open on a phone.",
    },
    {
        title: "Brand Designer — Quick Intro",
        subtitle: "₦10,000 — Single Session",
        about: "Think design is just for naturally creative people? Think again. This intro class teaches you the core principles behind good design — and then puts them straight into practice. You'll create a real piece of graphic content in the session and leave with a clearer idea of whether the Brand Designer course is right for you.",
        covers: [
            "The four design principles every good graphic designer understands",
            "How colour and typography actually work together (and why it matters)",
            "What makes a logo good versus bad — and why",
            "Hands-on: creating a simple branded graphic using Canva or Photoshop",
            "What the full Brand Designer course covers and the freelance opportunities it unlocks",
        ],
        whoShouldCome: [
            "Beginners who've always been drawn to design but didn't know where to start",
            "Business owners who want to create their own brand graphics",
            "Anyone curious about design as a career or side income",
        ],
        format: "One live session — online or in-person. You will create something real by the end.",
    },
    {
        title: "Certified Digital Marketer — Quick Intro",
        subtitle: "₦10,000 — Single Session",
        about: "This class pulls back the curtain on digital marketing. You'll learn how social media algorithms actually work, what makes an ad effective, and what separates random posting from a real content strategy. Practical and fast-paced, it's designed to give you enough real knowledge to decide whether the full Digital Marketer course is your next move.",
        covers: [
            "How social media platforms decide what content to show people (and how to use that)",
            "The difference between organic content and paid advertising",
            "What makes a good caption, ad headline, or call to action",
            "A live look inside the Meta Ads Manager",
            "What the full Digital Marketer course covers and the career paths it opens",
        ],
        whoShouldCome: [
            "Small business owners who want to stop guessing and start marketing with intention",
            "Content creators who want to understand the business side of social media",
            "Anyone thinking about a career in digital marketing or brand management",
        ],
        format: "One live session — online or in-person. Fast, practical, no fluff.",
    },
    {
        title: "Cybersecurity Basics — Quick Intro",
        subtitle: "₦10,000 — Single Session",
        about: "Most people know cybersecurity is important. Very few actually understand how attacks work. This intro class changes that. You'll see real examples of how hackers think and operate, run through a basic security assessment, and learn the first things every person working online should have in place. It's practical from the first minute.",
        covers: [
            "How the most common attacks — phishing, malware, social engineering — actually work",
            "Why strong passwords and two-factor authentication matter more than people realise",
            "A basic personal security audit: how exposed are you right now?",
            "What cybersecurity professionals actually do in their jobs",
            "What the full Cybersecurity Basics course covers and the roles it prepares you for",
        ],
        whoShouldCome: [
            "Anyone who wants to be safer online at home or at work",
            "Students and job seekers exploring cybersecurity as a career path",
            "Business owners worried about protecting their data and systems",
        ],
        format: "One live session — online or in-person. Eye-opening and practical from the start.",
    },
]

export default function CohortCoursePageClient() {
    const [courses, setCourses] = useState<CohortCourseTypes[] | null>(null)
    const [loading, setLoading] = useState(true)
    const [selectedQuickIntro, setSelectedQuickIntro] = useState<QuickIntroClass | null>(null)

    // This function fetches data from the cohort course table
    const fetchCourses = async () => {
        setLoading(true)

        const { data, error } = await supabase.from("cohort_2026_courses").select("*")

        if (error) {
            console.log("Error fetching courses", error)
            toast.error("Failed to load courses! Please reload page")
            setLoading(false)
            return;
        }

        if (!data) {
            toast.error("No courses found");
            setLoading(false)
            return;
        }

        setCourses(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchCourses()
    }, [])

    return (
        <div className="w-full min-h-screen  flex flex-col items-start gap-8  pt-24 md:pt-40 pb-16 px-[2%] lg:px-[4%]  bg-[#f2f5fc] ">
            <div className=" flex flex-col gap-1 font-poppins items-start  ">
                <h1 className="  text-2xl   md:text-3xl font-semibold text-gray-900 ">Cohort 2026 </h1>
                <p className="text-gray-600 font-medium text-sm md:text-lg   ">Available courses for this cohort</p>
            </div>

            <section className=" w-full h-full flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 gap-y-10 place-items-start justify-items-start  py-4 px-3 ">
                {loading ? (
                    <div className="w-full h-full min-h-36 flex items-center justify-center md:col-span-3 lg:col-span-5">
                        <Spinner/>
                    </div>
                ) : (
                    courses?.map((course, index) => (
                        <Link key={index} href={`/cohort2026/${course.slug}`} className=" w-full h-full max-w-[350px] ">
                            <CohortCourseCard data={course} />
                        </Link>
                    ))
                )}
            </section>

            <section className="w-full flex flex-col gap-4 pt-6">
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">Quick Intro Classes — ₦10,000 Each</h2>
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
        </div>
    )
}
