import { supabase } from "@/lib/supabaseClient";
import { Metadata } from "next";
import RegisterPageClient from "@/components/cohort-course-page/RegisterPageClient";

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
      title: "Register | TheGreyIT",
      description: "Course registration page",
      robots: { index: false },
    };
  }

  return {
    title: `Register for ${data.title} | TheGreyIT`,

    description: `Enroll in ${data.title} at TheGreyIT. ${data.excerpt}`,

    keywords: [
      data.title,
      `${data.title} registration`,
      "TheGreyIT courses",
      "IT training Nigeria",
      "tech cohort 2026",
      "learn programming Nigeria",
      "cybersecurity training",
      "AI training",
      "data analysis course"
    ],

    alternates: {
      canonical: `https://www.thegreyit.org/cohort2026/${slug}/register`,
    },

    openGraph: {
      title: `Register for ${data.title}`,
      description: data.description,
      url: `https://www.thegreyit.org/cohort2026/${slug}/register`,
      type: "website",
      images: [
        {
          url: data.image,
          width: 1200,
          height: 630,
          alt: data.title,
        }
      ]
    },

    twitter: {
      card: "summary_large_image",
      title: `Register for ${data.title}`,
      description: data.description,
      images: [data.image],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  return <RegisterPageClient slug={slug} />;
}