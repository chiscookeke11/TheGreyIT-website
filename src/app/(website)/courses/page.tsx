import CoursePageComponent from "@/components/courses-page/CoursePageComponent";




import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Courses | TheGreyIT",
    description: "Browse TheGreyIT's professional IT courses, from software development, cybersecurity, AI, data analysis, digital marketing, UI/UX, and mobile app development to academic skills. Advance your career today.",
    keywords: [
        "TheGreyIT courses",
        "IT courses",
        "software development",
        "cybersecurity training",
        "AI courses",
        "data analysis course",
        "digital marketing course",
        "UI/UX design course",
        "mobile app development",
        "academic writing skills",
        "full-stack development",
        "ethical hacking",
        "IT certification",
        "technology training"
    ],
    authors: [{ name: "TheGreyIT" }],
    openGraph: {
        title: "Courses | TheGreyIT",
        description: "Browse TheGreyIT's professional IT courses, from software development, cybersecurity, AI, data analysis, digital marketing, UI/UX, and mobile app development to academic skills. Advance your career today.",
        url: "https://www.thegreyit.org/courses",
        siteName: "TheGreyIT",
        type: "website",
        images: [
            {
                url: "https://www.thegreyit.org/courses-page/hero-img-2.webp",
                width: 1200,
                height: 630,
                alt: "TheGreyIT Courses"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "Courses | TheGreyIT",
        description: "Browse TheGreyIT's professional IT courses, from software development, cybersecurity, AI, data analysis, digital marketing, UI/UX, and mobile app development to academic skills. Advance your career today.",
        images: ["https://www.thegreyit.org/courses-page/hero-img-2.webp"]
    }
};



export default function Page() {


    return (
        <CoursePageComponent />
    )
}