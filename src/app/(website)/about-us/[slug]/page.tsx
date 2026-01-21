import TeamMemberPage from "@/components/about-us/TeamMemberPage";
import { teams } from "@/data/LeadershipData";
import { Metadata } from "next";


interface PageProps {
    params: Promise<{ slug: string }>;
}



export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;

    // Find the member
    const member = teams.find((p) => String(p.slug) === slug);

    if (!member) {
        return {
            title: "Profile not found",
            robots: "noindex",
        };
    }

    return {
        title: `${member.name} | TheGreyIT`,
        description: ` About ${member.name}`,
        alternates: {
            canonical: `https://www.thegreyit.org/about-us/${slug}`,
        },
        icons: {
            icon: "./favicon.ico",
            shortcut: "./favicon.ico",
            apple: "./favicon.ico",
        },
    };
}




export default function Page() {
    return (
        <TeamMemberPage />
    )
}