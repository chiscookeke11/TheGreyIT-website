
import UserLayoutClient from "@/components/user/UserLayoutClient";
import { ReactNode } from "react";


import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Portal | TheGreyIT",
    description:
        "Access your TheGreyIT user dashboard to manage courses, certificates, transactions, and account settings securely.",
    robots: {
        index: true,
        follow: true,
    },
    icons: {
        icon: "./favicon.ico",
        shortcut: "./favicon.ico",
        apple: "./favicon.ico",
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
