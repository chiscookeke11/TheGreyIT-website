import { Metadata } from "next";
import UserAuthModal from "@/components/user/UserAuthModal";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Sign In | TheGreyIT",
    description:
        "Sign in to your TheGreyIT account to access courses, certificates, transactions, and dashboard features securely.",
    keywords: [
        "TheGreyIT login",
        "user sign in",
        "online courses dashboard",
        "manage certificates",
        "course enrollment",
        "account settings"
    ],
    robots: {
        index: true,
        follow: true,
    },
    applicationName: "TheGreyIT",
    creator: "TheGreyIT",
    publisher: "TheGreyIT",
    referrer: "strict-origin-when-cross-origin",
    category: "authentication",
    alternates: {
        canonical: "https://www.thegreyit.org/user/sign-in",
    },
    openGraph: {
        title: "Sign In | TheGreyIT",
        description:
            "Sign in to your TheGreyIT account to access courses, certificates, transactions, and dashboard features securely.",
        url: "https://www.thegreyit.org/user/sign-in",
        siteName: "TheGreyIT",
        type: "website",
        images: [
            {
                url: "/user/auth-image.jpg",
                width: 1200,
                height: 630,
                alt: "TheGreyIT Sign In",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Sign In | TheGreyIT",
        description:
            "Sign in to your TheGreyIT account to access courses, certificates, transactions, and dashboard features securely.",
        images: ["/user/auth-image.jpg"],
    },
    icons: {
        icon: "./favicon.ico",
        shortcut: "./favicon.ico",
        apple: "./favicon.ico",
    },
};

export default function Page() {
    return (
        <main className="w-full h-screen flex items-center flex-col md:flex-row justify-center bg-[#f2f5fc]">
            <Image
                src="/user/auth-image.jpg"
                alt="Auth"
                height={1000}
                width={1000}
                className="w-full h-full max-h-[200px] md:max-h-none object-cover md:max-w-[450px] lg:max-w-none lg:flex-1"
            />
            <UserAuthModal />
        </main>
    );
}
