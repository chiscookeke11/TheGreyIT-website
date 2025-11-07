import AboutHero from "@/components/about-us/AboutUsHero";
import JoinUs from "@/components/about-us/JoinUsSection";
import Leadership from "@/components/about-us/Leadership";
import OurMission from "@/components/about-us/OurMission";
import OurStory from "@/components/about-us/OurStrory";
import WhoWeAreSection from "@/components/about-us/WhoWeAreSection";



export default function Page() {
  return (
    <>
      <AboutHero />
      <WhoWeAreSection/>
      <OurMission />
      <OurStory />
      <Leadership />
      <JoinUs/>
    </>
  );
}
