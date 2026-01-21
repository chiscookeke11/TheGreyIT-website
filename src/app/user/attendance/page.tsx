import { Metadata } from "next";
import AttendancePageComponent from "@/components/user/AttendancePageComponent";

export const metadata: Metadata = {
    title: "My Attendance | TheGreyIT Dashboard",
    description:
        "Track and manage your course attendance securely in your TheGreyIT dashboard.",
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
    return <AttendancePageComponent />;
}
