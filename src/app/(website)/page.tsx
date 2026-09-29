import ErrorBoundary from "@/components/ErrorBoundary";
import ContactUsSection from "@/components/Home/ContactUsSection";
import GetSkilled from "@/components/Home/GetSkilled";
import Hero from "@/components/Home/Hero";
import OurLabs from "@/components/Home/OurLabs";
import Profile from "@/components/Home/Profile";
// import ResearchSection from "@/components/Home/ResearchSection";
import WhyUs from "@/components/Home/WhyUs";
import NewsletterSection from "@/components/UI/NewsletterSection";
// import { getRecentBlogs } from "@/lib/blogs";




export default async function Home() {

  // const recentBlogs = await getRecentBlogs();


  return (
    <>

      <Hero />
      <WhyUs />
      <OurLabs />
      <GetSkilled />
      <Profile />
      {/* <ErrorBoundary>
        <ResearchSection recentBlogsData={recentBlogs} />
      </ErrorBoundary> */}
      <ContactUsSection />
      <NewsletterSection />
    </>
  );
}
