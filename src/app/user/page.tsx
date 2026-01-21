import { Metadata } from "next";
import DashboardPage from "@/components/user/DashboardPage";

export const metadata: Metadata = {
    title: "Dashboard | TheGreyIT",
    description:
        "Access your TheGreyIT dashboard to manage your courses, certificates, transactions, and account settings.",
    robots: {
        index: false,
        follow: false,
    },
};

export default function Page() {
    return <DashboardPage />;
}
