
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { supabase } from "@/lib/supabaseClient";

interface PageProps {
  params: { slug: string };
}

/* 🔹 SEO METADATA */
export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {

  const { data } = await supabase
    .from("blog")
    .select("title, excerpt, image, slug")
    .eq("slug", params.slug)
    .single();

  if (!data) {
    return {
      title: "TheGreyIT",
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
  const { data: currentBlog } = await supabase
    .from("blog")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!currentBlog) return notFound();

  return (
    <div className="bg-white text-black font-poppins ">
      <section
        className="w-full h-screen relative"
        style={{
          backgroundImage: `url(${currentBlog.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute bottom-6 px-[3%] text-white z-10 w-full flex flex-col md:flex-row justify-between">
          <h1 className="text-3xl font-bold">{currentBlog.title}</h1>

          <div className="text-sm text-right">
            <p>By {currentBlog.author}</p>
            <p>
              Published on{" "}
              {new Date(currentBlog.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </section>

      <div
        className="px-[7%] lg:px-[15%] py-16 bg-[#f2f5fc]"
        dangerouslySetInnerHTML={{ __html: currentBlog.content }}
      />
    </div>
  );
}
