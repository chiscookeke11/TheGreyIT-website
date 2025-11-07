import AboutHero from "@/components/about-us/AboutUsHero";
import JoinUs from "@/components/about-us/JoinUsSection";
import Leadership from "@/components/about-us/Leadership";
import OurMission from "@/components/about-us/OurMission";
import OurStory from "@/components/about-us/OurStrory";



export default function Page() {
  return (
    <>
      <AboutHero />
      <OurMission />
      <OurStory />
      <Leadership />
      <JoinUs/>
    </>
  );
}
