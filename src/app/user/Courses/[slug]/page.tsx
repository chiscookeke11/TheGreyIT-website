import DynamicBlogPage from "@/components/user/DynamicBlogPage";
import { supabase } from "@/lib/supabaseClient";
import { Metadata } from "next";


interface PageProps {
    params: Promise<{ slug: string }>;
}


export async function generateMetadata({ params }: PageProps): Promise<Metadata> {

    const {slug} = await params;

    const { data } = await supabase
        .from("course")
        .select("*")
        .eq("slug", slug)
        .single()

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
            canonical: `https://www.thegreyit.org/user/Courses/${(await params).slug}`,
        },
        openGraph: {
            title: data.title,
            description: data.content,
            images: [{ url: data.imageUrl }],
            type: "website",
        },
        robots: {
            index: true,
            follow: true,
            nocache: false,
            googleBot: {
                index: true,
                follow: true
            }
        }
    }
}


export default async function Page({params}: PageProps) {

    const {slug} = await params;

    return (
        <DynamicBlogPage  slug={slug} />
    )
}