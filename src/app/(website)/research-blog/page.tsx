import ErrorBoundary from "@/components/ErrorBoundary";
import AllBlogs from "@/components/ResearchPage/AllBlogs";
import RecentBlogs from "@/components/ResearchPage/RecentBlogs";
import ResearchHero from "@/components/ResearchPage/ResearchHero";
import { Metadata } from "next";



export const metadata: Metadata = {
  title: "Research Blog | TheGreyIT",
  description:
    "Explore TheGreyIT’s research blog featuring insights on technology, cybersecurity, software development, AI, data analysis, and digital innovation.",
  keywords: [
    "TheGreyIT research blog",
    "technology research",
    "IT insights",
    "cybersecurity articles",
    "software development blog",
    "AI research",
    "data analysis insights",
    "tech trends",
    "digital innovation"
  ],
  authors: [{ name: "TheGreyIT" }],
  openGraph: {
    title: "Research Blog | TheGreyIT",
    description:
      "Explore TheGreyIT’s research blog featuring insights on technology, cybersecurity, software development, AI, data analysis, and digital innovation.",
    url: "https://www.thegreyit.org/research-blog",
    siteName: "TheGreyIT",
    type: "website",
    images: [
      {
        url: "https://www.thegreyit.org/HomeHeroSection/HeroBg.png",
        width: 1200,
        height: 630,
        alt: "TheGreyIT Research Blog"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Research Blog | TheGreyIT",
    description:
      "Explore TheGreyIT’s research blog featuring insights on technology, cybersecurity, software development, AI, data analysis, and digital innovation.",
    images: ["https://www.thegreyit.org/HomeHeroSection/HeroBg.png"]
  }
};


export default function Page() {
  return (
    <div className=" w-full h-full  bg-white text-[var(--background)]  pt-20  " >
      <ErrorBoundary>
        <ResearchHero />
      </ErrorBoundary>


      <ErrorBoundary>
        <RecentBlogs />
      </ErrorBoundary>


      <ErrorBoundary>
        <AllBlogs />
      </ErrorBoundary>
    </div>
  )
}