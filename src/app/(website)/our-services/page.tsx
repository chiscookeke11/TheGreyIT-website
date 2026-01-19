import ServiceComponent from "@/components/services/ServicesComponent";
import { Metadata } from "next";



export const metadata: Metadata = {
    title: "Services | TheGreyIT",
    description: "Explore the range of professional IT services offered by TheGreyIT",
    keywords: ["Web Experience", "software development", "cybersecurity services", "cloud infrastructure services", "hardware repairs", "data recovery", "networking", "smart connectivity"],
}


export default function Page() {
    return (
        <ServiceComponent />
    )
}