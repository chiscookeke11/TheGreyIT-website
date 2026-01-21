import CoursesPageComponent from "@/components/user/CoursesPage";
import { Metadata } from "next";



export const metadata: Metadata = {
    title: "Courses |  TheGreyIT Dashboard",
    description:
        "View and manage your active, enrolled, and completed courses securely in your TheGreyIT dashboard.",
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
    return (
        <CoursesPageComponent />
    )
}