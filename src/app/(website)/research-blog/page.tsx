import ErrorBoundary from "@/components/ErrorBoundary";
import AllBlogs from "@/components/ResearchPage/AllBlogs";
import RecentBlogs from "@/components/ResearchPage/RecentBlogs";
import ResearchHero from "@/components/ResearchPage/ResearchHero";




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