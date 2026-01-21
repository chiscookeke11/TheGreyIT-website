
import UserLayoutClient from "@/components/user/UserLayoutClient";
import { ReactNode } from "react";


import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard | TheGreyIT",
    description:
        "Access your TheGreyIT user dashboard to manage courses, certificates, transactions, and account settings securely.",
    robots: {
        index: true,
        follow: true,
    },
};


export default async function UserDashboardLayout({
    children,
}: {
    children: ReactNode;
}) {



    return (
        <UserLayoutClient >
            {children}
        </UserLayoutClient>
    );
}
