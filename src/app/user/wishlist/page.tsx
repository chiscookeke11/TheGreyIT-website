import { Metadata } from "next";
import WishlistPageComponent from "@/components/user/WishlistPageComponent";

export const metadata: Metadata = {
  title: "My Wishlist | TheGreyIT Dashboard",
  description:
    "View and manage all your bookmarked courses securely in your TheGreyIT dashboard.",
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
  return <WishlistPageComponent />;
}
