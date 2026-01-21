import ServiceComponent from "@/components/services/ServicesComponent";
import { Metadata } from "next";



export const metadata: Metadata = {
    title: "Services | TheGreyIT",
    description: "Discover TheGreyIT's professional IT services, including software development, cybersecurity, cloud infrastructure, networking, hardware repair, and data recovery.",
    keywords: [
        "TheGreyIT",
        "IT services",
        "software development",
        "cybersecurity services",
        "cloud infrastructure",
        "hardware repairs",
        "data recovery",
        "networking",
        "smart connectivity"
    ],
    authors: [{ name: "TheGreyIT" }],
    openGraph: {
        title: "Services | TheGreyIT",
        description: "Discover TheGreyIT's professional IT services, including software development, cybersecurity, cloud infrastructure, networking, hardware repair, and data recovery.",
        url: "https://www.thegreyit.org/our-services",
        siteName: "TheGreyIT",
        type: "website",
        images: [
            {
                url: "https://www.thegreyit.org/services-images/service-hero.jpg",
                width: 1200,
                height: 630,
                alt: "TheGreyIT Services"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "Services | TheGreyIT",
        description: "Discover TheGreyIT's professional IT services, including software development, cybersecurity, cloud infrastructure, networking, hardware repair, and data recovery.",
        images: ["https://www.thegreyit.org/services-images/service-hero.jpg"]
    },
    icons: {
        icon: "./favicon.ico",
        shortcut: "./favicon.ico",
        apple: "./favicon.ico",
    },
};



export default function Page() {
    return (
        <ServiceComponent />
    )
}