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
      robots: { index: false },
    };
  }

  return {
    title: `${data.title} | TheGreyIT`,
    description: data.excerpt,
    alternates: {
      canonical: `https://www.thegreyit.org/research-blog/${data.slug}`,
    },
    openGraph: {
      title: data.title,
      description: data.excerpt,
      images: [{ url: data.image }],
      type: "article",
    },
  };
}


export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return (
    <BlogPageComponent slug={slug} />
  );
}
