import DynamicCertificatesPage from "@/components/user/DynamicCertificatesPage";
import { Metadata } from "next";



export const metadata: Metadata = {
    title: "Certificates | TheGreyIt",
    description: `View your certificates on TheGreyIT. Securely access your achievements and download your certificate.`,
    alternates: {
        canonical: `https://www.thegreyit.org/user/certificates/certificates`,
    },
    robots: {
        index: false,
        follow: false,
    },
}

export default function Page() {
    return (
        <DynamicCertificatesPage />
    )
}