import { Metadata } from "next";
import DashboardPage from "@/components/user/DashboardPage";

export const metadata: Metadata = {
    title: "Portal | TheGreyIT",
    description:
        "Access your TheGreyIT dashboard to manage your courses, certificates, transactions, and account settings.",
    robots: {
        index: false,
        follow: false,
    },
    icons: {
        icon: "./favicon.ico",
        shortcut: "./favicon.ico",
        apple: "./favicon.ico",
    },
};

export default function Page() {
    return <DashboardPage />;
}
