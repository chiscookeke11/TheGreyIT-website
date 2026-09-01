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
  },
  icons: {
    icon: "./favicon.ico",
    shortcut: "./favicon.ico",
    apple: "./favicon.ico",
  },
};


export default function Page() {
  return (
    <div className=" w-full h-full  bg-white text-[var(--background)] py-20 md:py-32 px-[3%] md:px-[5%] flex flex-row justify-between items-start gap-6  " >



      {/* The main news section  */}
      <div className=" w-full lg:basis-4/6  h-full flex flex-col gap-7 lg:gap-16 py-4 " >
        <ErrorBoundary>
          <ResearchHero />
        </ErrorBoundary>


        <hr className="w-[95%] mx-auto hidden md:block border-[0.5px] border-gray-700 " />

        {/* All blogs  */}
        <ErrorBoundary>
          <AllBlogs />
        </ErrorBoundary>
      </div>





      {/* The recent section  */}
      <div className="hidden lg:block w-full basis-1/4  h-[80vh] overflow-y-auto scrollbar-hide px-2 " >
        <ErrorBoundary>
          <RecentBlogs />
        </ErrorBoundary>
      </div>




    </div>
  )
}