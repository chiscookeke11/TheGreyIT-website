import DynamicCoursePageClient from "@/components/cohort-course-page/DynamicCoursePageClient";
import { supabase } from "@/lib/supabaseClient";
import { Metadata } from "next";


interface PageProps {
    params: Promise<{ slug: string }>;
}


export async function generateMetadata(
    { params }: PageProps
): Promise<Metadata> {

    const { slug } = await params;

    const { data } = await supabase
        .from("cohort_2026_courses")
        .select("*")
        .eq("slug", slug)
        .single();

    if (!data) {
        return {
            title: "Not found | TheGreyIT",
            description: "Course not found",
            robots: { index: false },
        };
    }

    return {
        title: `${data.title} | TheGreyIT`,
        description: data.excerpt,
        keywords: [data.title],
        alternates: {
            canonical: `https://www.thegreyit.org/cohort2026/${slug}}`,
        },
        openGraph: {
            title: data.title,
            description: data.description,
            images: [{ url: data.image }],
            type: "article",
        },
        robots: {
            index: true,
            follow: true,
            nocache: false,
            googleBot: {
                index: true,
                follow: true
            }
        },
        icons: {
            icon: "./favicon.ico",
            shortcut: "./favicon.ico",
            apple: "./favicon.ico",
        },
    };
}


export default async function Page({ params }: PageProps) {
    const { slug } = await params
    return (
        <DynamicCoursePageClient slug={slug} />
    )
}