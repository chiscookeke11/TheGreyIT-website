import AboutHero from "@/components/about-us/AboutUsHero";
import JoinUs from "@/components/about-us/JoinUsSection";
import Leadership from "@/components/about-us/Leadership";
import OurMission from "@/components/about-us/OurMission";
import OurStory from "@/components/about-us/OurStrory";
import WhoWeAreSection from "@/components/about-us/WhoWeAreSection";
import { Metadata } from "next";



export const metadata: Metadata = {
  title: "About Us | TheGreyIT",
  description: "Discover TheGreyIT's story, mission, leadership, and career opportunities. Learn how we deliver innovative IT solutions that empower businesses.",
  keywords: [
    "TheGreyIT",
    "About TheGreyIT",
    "IT solutions",
    "technology company",
    "leadership team",
    "mission and vision",
    "careers at TheGreyIT"
  ],
  authors: [{ name: "TheGreyIT" }],
  openGraph: {
    title: "About Us | TheGreyIT",
    description: "Discover TheGreyIT's story, mission, leadership, and career opportunities. Learn how we deliver innovative IT solutions that empower businesses.",
    url: "https://www.thegreyit.org/about-us",
    siteName: "TheGreyIT",
    type: "website",
    images: [
      {
        url: "https://www.thegreyit.org/about-us/about-us-hero.avif",
        width: 1200,
        height: 630,
        alt: "About TheGreyIT"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | TheGreyIT",
    description: "Discover TheGreyIT's story, mission, leadership, and career opportunities. Learn how we deliver innovative IT solutions that empower businesses.",
    images: ["https://www.thegreyit.org/about-us/about-us-hero.avif"]
  }
};



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
