import RegisterIntro from "@/components/cohort-course-page/Register-Intro";
import { quickIntroClasses } from "@/data/IntroCourse_data";
import { Metadata } from "next";

interface PageProps {
  params: { slug: string };
}

const INTRO_FEE = 10000;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const data = quickIntroClasses.find((course) => course.slug === slug)

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
    <RegisterIntro
      slug={slug}
      fixedFee={INTRO_FEE}
      pageSubtitle="QUICK INTRO REGISTRATION"
      pageTitle="Join this quick intro class"
    />
  );
}
