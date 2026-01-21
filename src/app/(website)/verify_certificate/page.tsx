

import VerifyCertificatePage from "@/components/verify-certificate/VerifyCertificatePage";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Verify Certificate | TheGreyIT",
    description:
        "Verify TheGreyIT certificates instantly. Confirm the authenticity of professional training and certification records issued by TheGreyIT.",
    keywords: [
        "TheGreyIT certificate verification",
        "verify certificate",
        "certificate validation",
        "IT certification verification",
        "TheGreyIT certificates",
        "training certificate check",
        "digital certificate verification"
    ],
    authors: [{ name: "TheGreyIT" }],
    openGraph: {
        title: "Verify Certificate | TheGreyIT",
        description:
            "Verify TheGreyIT certificates instantly. Confirm the authenticity of professional training and certification records issued by TheGreyIT.",
        url: "https://www.thegreyit.org/verify_certificate",
        siteName: "TheGreyIT",
        type: "website"
    },
    twitter: {
        card: "summary",
        title: "Verify Certificate | TheGreyIT",
        description:
            "Verify TheGreyIT certificates instantly and confirm their authenticity."
    }
};





export default function Page() {
    return (
        <VerifyCertificatePage />

    );
}
