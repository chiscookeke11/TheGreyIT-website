import CohortCoursePageClient from "@/components/cohort-course-page/CohortCoursePageClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cohort 2026 | TheGreyIT",
    description: "Join TheGreyIT cohort-based courses and learn with structured guidance, mentorship, and hands-on projects in software development, cybersecurity, AI, data analysis, and more.",
    keywords: [
        "TheGreyIT cohort 2026",
        "cohort-based learning",
        "IT training cohort",
        "software development cohort",
        "cybersecurity cohort",
        "AI bootcamp",
        "data analysis training",
        "guided tech learning",
        "mentorship programs",
        "hands-on IT courses"
    ],
    authors: [{ name: "TheGreyIT" }],
    openGraph: {
        title: "Cohort 2026 | TheGreyIT",
        description: "Join TheGreyIT cohort-based courses and learn with structured guidance, mentorship, and hands-on projects in software development, cybersecurity, AI, data analysis, and more.",
        url: "https://www.thegreyit.org/cohort-courses",
        siteName: "TheGreyIT",
        type: "website",
        images: [
            {
                url: "https://www.thegreyit.org/cohort-courses/hero-img.webp",
                width: 1200,
                height: 630,
                alt: "TheGreyIT Cohort Courses"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "Cohort Courses | TheGreyIT",
        description: "Join TheGreyIT cohort-based courses and learn with structured guidance, mentorship, and hands-on projects in software development, cybersecurity, AI, data analysis, and more.",
        images: ["https://www.thegreyit.org/cohort-courses/hero-img.webp"]
    },
    icons: {
        icon: "./favicon.ico",
        shortcut: "./favicon.ico",
        apple: "./favicon.ico",
    },
};

export default function Page() {
    return <CohortCoursePageClient />;
}