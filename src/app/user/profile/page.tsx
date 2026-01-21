import { Metadata } from "next";
import ProfilePageComponent from "@/components/user/ProfilePageComponent";

export const metadata: Metadata = {
    title: "My Profile | TheGreyIT Dashboard",
    description:
        "View and manage your personal profile, account settings, and preferences securely in your TheGreyIT dashboard.",
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
    return <ProfilePageComponent />;
}
