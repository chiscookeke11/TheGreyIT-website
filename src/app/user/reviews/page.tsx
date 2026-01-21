import { Metadata } from "next";
import ReviewsPageComponent from "@/components/user/ReviewsPageComponent";

export const metadata: Metadata = {
  title: "Course Reviews | TheGreyIT Dashboard",
  description:
    "View all course reviews securely in your TheGreyIT dashboard.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    noarchive: true,
    nosnippet: true,
  },
  referrer: "no-referrer",
  applicationName: "TheGreyIT",
  creator: "TheGreyIT",
  publisher: "TheGreyIT",
  category: "user-dashboard",
};

export default function Page() {
  return <ReviewsPageComponent />;
}
