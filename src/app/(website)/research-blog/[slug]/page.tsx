import type { Metadata } from "next";
import { supabase } from "@/lib/supabaseClient";
import BlogPageComponent from "@/components/ResearchPage/BlogPageComponent";

interface PageProps {
  params: Promise<{ slug: string }>;
}


export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {

  const { slug } = await params;

  const { data } = await supabase
    .from("blog")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!data) {
    return {
      title: "Not found | TheGreyIT",
      description: "Blog not found",
      robots: { index: false },
    };
  }

  return {
    title: `${data.title} | TheGreyIT`,
    description: data.excerpt,
    keywords: [data.title],
    alternates: {
      canonical: `https://www.thegreyit.org/research-blog/${(await params).slug}`,
    },
    openGraph: {
      title: data.title,
      description: data.content,
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
    }
  };
}


export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return (
    <BlogPageComponent slug={slug} />
  );
}
