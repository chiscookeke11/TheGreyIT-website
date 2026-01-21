import ReviewDynamicPage from "@/components/user/DynamicReviewPage";
import { Metadata } from "next";



interface PageProps {
    params: { id: string };
}


export const metadata: Metadata = {
    title: "Reviews | TheGreyIT"
}



export default async function Page({ params }: PageProps) {


    return (
        <ReviewDynamicPage id={params.id} />
    )
}