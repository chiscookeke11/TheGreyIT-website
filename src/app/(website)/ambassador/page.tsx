import VolunteerPageComponent from "@/components/volunteer/VolunteerPageComponent"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Ambassador | TheGreyIT",
    description: "Join TheGreyIT as a Student or Graduate Ambassador — learn, grow, and earn through tech promotion and community impact.",
    keywords: [
        "TheGreyIT Ambassador",
        "Student Ambassador Program",
        "Graduate Ambassador",
        "Tech community",
        "Tech promotion",
        "Career growth",
        "Student opportunities",
        "Technology engagement",
        "Community impact",
        "TheGreyIT"
    ],
    openGraph: {
        title: "Ambassador | TheGreyIT",
        description: "Join TheGreyIT as a Student or Graduate Ambassador — learn, grow, and earn through tech promotion and community impact.",
        url: "https://www.thegreyit.org/ambassador",
        siteName: "TheGreyIT",
        images: [
            {
                url: "/about-us/about-us-hero.avif",
                width: 1200,
                height: 630,
                alt: "TheGreyIT Ambassador Program"
            }
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Ambassador | TheGreyIT",
        description: "Join TheGreyIT as a Student or Graduate Ambassador — learn, grow, and earn through tech promotion and community impact.",
        images: ["/about-us/about-us-hero.avif"],
        site: "@thegreyit",
        creator: "@thegreyit",
    }
}

export default function Page() {
    return (
        <div>
            <VolunteerPageComponent />
        </div>
    )
}
