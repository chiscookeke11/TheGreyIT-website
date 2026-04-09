import RegisterPageClient from "@/components/cohort-course-page/RegisterPageClient";
import { supabase } from "@/lib/supabaseClient";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const INTRO_FEE = 15000;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const { data } = await supabase
    .from("cohort_2026_courses")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!data) {
    return {
      title: "Intro Registration | TheGreyIT",
      description: "Quick intro registration page",
      robots: { index: false },
    };
  }

  return {
    title: `Register for ${data.title} Intro | TheGreyIT`,
    description: `Pay ₦${INTRO_FEE.toLocaleString()} to join the quick intro for ${data.title}.`,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  return (
    <RegisterPageClient
      slug={slug}
      fixedFee={INTRO_FEE}
      pageSubtitle="QUICK INTRO REGISTRATION"
      pageTitle="Join this quick intro class"
    />
  );
}
