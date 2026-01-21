import { Metadata } from "next";
import CertificatesPageComponent from "@/components/user/CertificatesPageComponent";

export const metadata: Metadata = {
    title: "My Certificates | TheGreyIT Dashboard",
    description:
        "View and manage all your earned certificates securely in your TheGreyIT dashboard.",
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
    return <CertificatesPageComponent />;
}
