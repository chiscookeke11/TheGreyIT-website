import ErrorBoundary from "@/components/ErrorBoundary";
import ContactUsSection from "@/components/Home/ContactUsSection";
import GetSkilled from "@/components/Home/GetSkilled";
import Hero from "@/components/Home/Hero";
import OurLabs from "@/components/Home/OurLabs";
import ResearchSection from "@/components/Home/ResearchSection";
import WhyUs from "@/components/Home/WhyUs";




export default function Home() {
  return (
    <>

      <Hero />
      <WhyUs />
      <OurLabs />
      <GetSkilled />
      <ErrorBoundary>
        <ResearchSection />
      </ErrorBoundary>
      <ContactUsSection />
    </>
  );
}
